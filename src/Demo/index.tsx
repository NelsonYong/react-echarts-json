import { useEffect } from 'react'
import { useInjection, useEcharts } from '../packages'

const Demo = () => {
	const { container: salesDemoContainer, chart } = useEcharts()

	const style = {
		height: '233px',
		width: '430px',
	}

	const option: any = {
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
					name: '待处理',
					icon: 'circle',
					textStyle: {
						color: '#7d838b',
					},
				},
				{
					name: '已处理',
					icon: 'circle',
					textStyle: {
						color: '#7d838b',
					},
				},
				{
					name: '完成率',
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
				name: '数值1',
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
				name: '数值2',
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
			right: '5%',
		},
		series: [
			{
				name: '待处理',
				type: 'bar',
				data: [4, 6, 36, 6, 8, 6],
				barWidth: 'auto',
				itemStyle: {
					normal: {
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
			},
			{
				name: '已处理',
				type: 'bar',
				data: [4, 2, 36, 6, 8, 6],
				barWidth: 'auto',
				itemStyle: {
					normal: {
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
				},
				barGap: '0',
			},
			{
				name: '完成率',
				type: 'line',
				yAxisIndex: 1,
				data: [10, 3, 10, 10, 10, 10],
				itemStyle: {
					normal: {
						color: '#ffaa00',
					},
				},
				smooth: true,
			},
		],
	}

	useInjection(
		{
			chart: chart,
			option,
			id: 'demo',
			title: '测试demo',
		},
		[]
	)

	useEffect(() => {
		if (chart.current) {
			chart.current?.setOption(option)
		}
	}, [])

	return <div ref={salesDemoContainer} style={style} />
}

export default Demo
