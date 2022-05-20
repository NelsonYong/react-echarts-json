/**
 * 图表类
 */

import { EChartsOption, EChartsType } from 'echarts/types/dist/echarts'

export type ControlType = {
	id?: string
	chart?: EChartsType
	option?: EChartsOption
	name?: string
	container?: HTMLDivElement | null
}

export class Charts {
	private chartsEmitters = new Map<
		string,
		{
			chart: EChartsType
			option: EChartsOption & Record<string, any>
			name?: string
			container?: HTMLDivElement | null
		}
	>()

	add = ({ id, chart, option, name, container }: ControlType) => {
		if (chart && option && id) {
			// 添加图表
			this.chartsEmitters.set(id, {
				chart,
				container,
				option,
				name,
			})
		} else {
			console.error('add error')
		}
	}

	get = (id: string) => {
		return this.chartsEmitters.get(id)
	}

	clear = () => {
		this.chartsEmitters.clear()
	}

	delete = (id: string) => {
		this.chartsEmitters.delete(id)
	}

	select = ({
		id,
		normal = 'transparent',
		active = 'rgba(37,168,246,.15)',
	}: {
		id: string
		normal?: string
		active?: string
	}) => {
		if (id) {
			for (const key of this.chartsEmitters.keys()) {
				this.chartsEmitters.get(key)?.chart.setOption?.({
					backgroundColor: id === key ? active : normal,
				})
			}
		}
	}

	list = () => {
		const list = []
		for (const key of this.chartsEmitters.keys()) {
			list.push({
				id: key,
				...this.chartsEmitters.get(key),
			})
		}
		return list
	}
}

const _Charts = new Charts()

export default _Charts
