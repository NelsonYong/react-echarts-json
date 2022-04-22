/**
 * 图表类
 */

import { EChartsOption, EChartsType } from 'echarts/types/dist/echarts'

export class Charts {
	private chartsEmitters = new Map<
		string,
		{
			chart: EChartsType
			option: EChartsOption
			title?: string
		}
	>()

	add = (
		id: string,
		chart?: EChartsType,
		option?: EChartsOption,
		title?: string
	) => {
		if (chart && option) {
			// 添加图表
			this.chartsEmitters.set(id, {
				chart,
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
				chart: this.chartsEmitters.get(key)?.chart,
				option: this.chartsEmitters.get(key)?.option,
				title: this.chartsEmitters.get(key)?.title,
			})
		}
		return list
	}
}

const _Charts = new Charts()

export default _Charts
