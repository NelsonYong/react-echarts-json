/**
 * 图表类
 */

import { EChartsOption, EChartsType } from 'echarts/types/dist/echarts'

export type ControlType = {
	id?: string
	chart?: EChartsType
	option?: EChartsOption
	title?: string
	container?: HTMLDivElement | null
}

export class Charts {
	private chartsEmitters = new Map<
		string,
		{
			chart: EChartsType
			option: EChartsOption
			title?: string
			container?: HTMLDivElement | null
		}
	>()

	add = ({ id, chart, option, title, container }: ControlType) => {
		if (chart && option && id) {
			// 添加图表
			this.chartsEmitters.set(id, {
				chart,
				container,
				option,
				title,
			})
		} else {
			console.log('添加失败')
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
