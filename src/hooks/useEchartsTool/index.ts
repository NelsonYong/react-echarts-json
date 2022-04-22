import { useCreation, useDebounceEffect } from 'ahooks'

import { EChartsOption, EChartsType } from 'echarts/types/dist/echarts'

import type React from 'react'
import type { Charts } from './charts'

import _Charts from './charts'

import useChartEventEmitter from '../useChartEventEmitter'

const useEchartsTool = (
	{
		id,
		title,
		chart,
		option,
	}: {
		id?: string
		title?: string
		option?: EChartsOption
		chart?: React.MutableRefObject<EChartsType | undefined>
	},
	deps?: React.DependencyList | undefined
) => {
	const ref = useCreation<Charts>(() => _Charts, [])
	const event = useChartEventEmitter({ global: true })

	useDebounceEffect(
		() => {
			if (ref && chart?.current && id && option) {
				ref.add(id, chart?.current, option, title)
				event.emit('list')
			}
		},
		deps ?? [],
		{
			wait: 100,
		}
	)
	return { tool: ref }
}

export default useEchartsTool
