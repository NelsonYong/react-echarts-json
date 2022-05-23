import { useEffect, useMemo, useState } from 'react'
import { useInjection, useEcharts } from '../../packages'

type r = 1 | '0'
type p = string

const getNumber = async (): Promise<number[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([4, 6, 36, 6, 8, 6])
		}, 3000)
	})
}

const Demo = () => {
	const { container: salesDemoContainer, chart } = useEcharts()
	const [state, setState] = useState<number[]>([])

	// const data =await
	useEffect(() => {
		getNumber().then((res) => {
			setState(res)
		})
	}, [])
	const style = {
		height: '233px',
		width: '430px',
	}

	const option: any = useMemo(
		() => ({
			backgroundColor: 'transparent',
			color: '#384757',
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					crossStyle: {
						color: '#384757',
					},
				},
			},
			legend: {
				data: [
					{
						name: 'undone',
						icon: 'circle',
						textStyle: {
							color: '#7d838b',
						},
					},
					{
						name: 'resolved',
						icon: 'circle',
						textStyle: {
							color: '#7d838b',
						},
					},
					{
						name: 'complate',
						icon: 'circle',
						textStyle: {
							color: '#7d838b',
						},
					},
				],
				top: '0%',
				textStyle: {
					color: '#fff',
				},
			},
			xAxis: [
				{
					type: 'category',
					data: ['1', '2', '3', '4', '5', '6'],
					axisPointer: {
						type: 'shadow',
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: '#7d838b',
						},
					},
				},
			],
			yAxis: [
				{
					type: 'value',
					name: 'number1',
					nameTextStyle: {
						color: '#7d838b',
					},
					min: 0,
					max: 50,
					interval: 10,
					axisLabel: {
						show: true,
						textStyle: {
							color: '#7d838b',
						},
					},
					axisTick: {
						show: false,
					},
					axisLine: {
						show: false,
					},
					offset: 10,
					splitLine: {
						show: false,
					},
				},
				{
					type: 'value',
					name: 'number2',
					show: true,
					axisTick: {
						show: false,
					},
					axisLine: {
						show: false,
					},
					// offset: 10,
					splitLine: {
						show: false,
					},
				},
			],
			grid: {
				top: '15%',
				bottom: 32,
				left: '15%',
				right: '15%',
			},
			series: [
				{
					name: 'undone',
					type: 'bar',
					data: state ?? [],
					barWidth: 'auto',
					itemStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [
								{
									offset: 0,
									color: 'rgba(255,37,117,0.7)',
								},
								{
									offset: 0.5,
									color: 'rgba(0,133,245,0.7)',
								},
								{
									offset: 1,
									color: 'rgba(0,133,245,0.3)',
								},
							],
							globalCoord: false,
						},
					},
				},
				{
					name: 'resolved',
					type: 'bar',
					data: [4, 2, 36, 6, 8, 6],
					barWidth: 'auto',
					itemStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [
								{
									offset: 0,
									color: 'rgba(255,37,117,0.7)',
								},
								{
									offset: 0.5,
									color: 'rgba(0,255,252,0.7)',
								},
								{
									offset: 1,
									color: 'rgba(0,255,252,0.3)',
								},
							],
							globalCoord: false,
						},
					},
					barGap: '0',
				},
				{
					name: 'complate',
					type: 'line',
					yAxisIndex: 1,
					data: [100, 33, 100, 100, 100, 100],
					itemStyle: {
						color: '#ffaa00',
					},
					smooth: true,
				},
			],
		}),
		[state]
	)

	useInjection(
		{
			chart: chart,
			option,
			id: 'demo1',
			name: 'demo1',
		},
		[option]
	)
	useEffect(() => {
		if (chart.current) {
			chart.current?.setOption(option)
		}
	}, [option])

	return <div ref={salesDemoContainer} style={style} />
}

export default Demo
