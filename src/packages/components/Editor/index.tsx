import { useEffect, useRef, useState } from 'react'
import { Button, Col, Row } from 'antd'
import loader from '@monaco-editor/loader'
import type { editor as MEditor } from 'monaco-editor'

import { useCreateEditor } from './utils'
import {
	Monaco,
	registerApiCompletion,
	registerDatavDarkTheme,
} from './editor-config'

loader.config({
	paths: { vs: 'https://unpkg.com/monaco-editor@0.27.0/min/vs' },
})

const Editor = ({ activeId }: { activeId?: string }) => {
	// const mainRef = useRef<HTMLDivElement>(null)
	const container = useRef<HTMLDivElement>(null)
	const [monaco, setMonaco] = useState<Monaco | null>()
	const editor = useRef<MEditor.IStandaloneCodeEditor>()

	useEffect(() => {
		const loadMonco = async () => {
			const data = await loader.init()
			setMonaco(data)
		}
		loadMonco()
	}, [])

	useEffect(() => {
		if (monaco) {
			registerDatavDarkTheme(monaco)
			registerApiCompletion(monaco, 'javascript', ['react-echarts-json-monaco'])

			const option = {
				value: `/* chartInstance => object 
* chart: echartInstance
* option:chartOption
* container:renderDom
* id:chartId
* name:chartName
*/
const chartInstance = instance
const { useEffect } = React

useEffect(() => {
		console.log('我被创建了')
}, [])
`,
				language: 'javascript',
				theme: 'react-echarts-json-dark-theme',
				tabSize: 2, // tab缩进长度
				cursorStyle: 'line', // 光标样式
				fontSize: 14, // 字体大小
			} as const

			if (container.current)
				editor.current = monaco.editor.create(container.current, option)
		}
	}, [monaco])

	const { run } = useCreateEditor({
		// domElement: mainRef.current,
		activeId,
	})

	const codeRun = () => {
		const code = editor.current?.getValue()
		run(code)
	}

	return (
		<div>
			<Row>
				<Col span={20}></Col>
				<Col
					span={4}
					style={{
						display: 'flex',
						justifyContent: 'end',
					}}
				>
					<Button type="primary" onClick={() => codeRun()}>
						运行
					</Button>
				</Col>
			</Row>
			<div
				ref={container}
				style={{
					height: 800,
					marginTop: 32,
				}}
			></div>
			<div id="node"></div>
		</div>
	)
}

export default Editor
