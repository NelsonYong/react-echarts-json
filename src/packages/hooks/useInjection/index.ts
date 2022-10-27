import { useCreation } from 'ahooks'
import { useEffect, useRef } from 'react'

import type React from 'react'
import type { Charts } from './charts'
import type {
	EChartsOption as _EChartsOption,
	EChartsType,
} from 'echarts/types/dist/echarts'

import _Charts from './charts'
import Log from '../useLogs/log'
import type { Logs } from '../useLogs/log'

import useChartEventEmitter from '../useChartEventEmitter'

export type ChartType = React.MutableRefObject<EChartsType | undefined>

export type ContainerType = React.RefObject<HTMLDivElement>

export type EChartsOption = _EChartsOption

const useInjection = (
	{
		id,
		name,
		chart,
		option,
		container,
	}: {
		id?: string
		name?: string
		option?: EChartsOption
		chart?: ChartType
		container?: ContainerType
	},
	deps?: React.DependencyList | undefined
) => {
	const ref = useCreation<Charts>(() => _Charts, [])
	const logs = useCreation<Logs>(() => Log, [])
	const event = useChartEventEmitter({ global: true })

	const previewValue = useRef<EChartsOption>()
	const currentValue = useRef<EChartsOption>()

	useEffect(() => {
		if (ref && chart?.current && id && option) {
			currentValue.current = option
			ref.add({
				id,
				chart: chart?.current,
				option,
				name,
				container: container?.current,
			})
			logs.depsUpdata({
				id,
				name,
				namespace: [`deps-update`],
				currentValue: currentValue.current,
				previewValue: previewValue.current,
			})
			previewValue.current = currentValue.current
			event.emit('list')
		}
	}, [...(deps ?? [])])
	return { tool: ref }
}

export default useInjection
