import { useCreation } from 'ahooks'
import { useEffect, useRef } from 'react'

import type React from 'react'
import type { Charts } from './charts'
import type { EChartsOption, EChartsType } from 'echarts/types/dist/echarts'

import _Charts from './charts'
import Log from '../useLogs/log'
import type { Logs } from '../useLogs/log'

import useChartEventEmitter from '../useChartEventEmitter'

const useInjection = (
	{
		id,
		title,
		chart,
		option,
		container,
	}: {
		id?: string
		title?: string
		option?: EChartsOption
		chart?: React.MutableRefObject<EChartsType | undefined>
		container?: React.RefObject<HTMLDivElement>
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
				title,
				container: container?.current,
			})
			logs.depsUpdata({
				id,
				name: title,
				namespace: [`${id}'s- deps update`],
				currentValue: currentValue.current,
				previewValue: previewValue.current,
			})
			previewValue.current = currentValue.current
			event.emit('list')
		}
	}, deps ?? [])
	return { tool: ref }
}

export default useInjection
