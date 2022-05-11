import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { parse } from 'acorn'
import { generate as generateJs } from 'escodegen'
import { transform as babelTransform } from '@babel/standalone'
import useInjection from '../../hooks/useInjection'
import useChartEventEmitter from '../../hooks/useChartEventEmitter'

// 动态创建方法
export function useCreateEditor({
	domElement,
	activeId,
	moduleResolver = (moduleName?: any) => null,
}: {
	domElement: HTMLDivElement | null
	activeId?: string
	moduleResolver?: (moduleName?: any) => null
}) {
	const [currentChart, setCurrentChart] = useState<any>()
	const chartListRef = useRef<any[]>()
	const codeTemp = useRef<string>()
	const { tool } = useInjection({})
	const event = useChartEventEmitter({ global: true })

	const render = (
		node: React.DOMElement<React.DOMAttributes<Element>, Element>
	) => {
		if (domElement) ReactDOM.render(node, domElement)
	}
	const require = (moduleName: any) => {
		return moduleResolver(moduleName)
	}

	// 核心
	const getWrapperFunction = (code: string) => {
		try {
			const esCode = babelTransform(code, { presets: ['es2015', 'react'] }).code
			const ast = parse(esCode, {
				sourceType: 'module',
				ecmaVersion: 3,
			})

			return new Function(
				'React',
				'render',
				'require',
				'instance',
				generateJs(ast)
			)
		} catch ({ message }) {
			throw new Error(`${message}`)
		}
	}

	const compile = (code: string) => {
		return getWrapperFunction(code)
	}

	const run = (code: any) => {
		compile?.(code)?.(React, render, require, currentChart)
		codeTemp.current = code
	}

	const getCompiledCode = (code: string) => {
		return getWrapperFunction?.(code)?.toString()
	}

	useEffect(() => {
		if (chartListRef.current?.length)
			setCurrentChart(
				chartListRef.current?.find((item) => item.id === activeId)
			)
	}, [activeId])

	event.useSubscription('list', () => {
		if (tool?.list().length) {
			chartListRef.current = tool?.list()
			setCurrentChart(
				chartListRef.current?.find((item) => item.id === activeId)
			)
			if (codeTemp.current)
				compile?.(codeTemp.current)?.(React, render, require, currentChart)
		}
	})

	return {
		compile,
		run,
		getCompiledCode,
	}
}

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isArray = Array.isArray

export const isObject = (val: unknown): val is Record<any, any> =>
	val !== null && typeof val === 'object'
