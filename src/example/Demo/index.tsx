import { graphic } from 'echarts'
import { useEffect } from 'react'
import { useEcharts, InjectView } from '../../packages'

const Demo = () => {
	const { container: salesDemoContainer, chart } = useEcharts()
	const colorList = ['#9E87FF', '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']

	const style = {
		height: '233px',
		width: '430px',
	}

	const option: any = {
		backgroundColor: 'transparent',
		title: {
			text: '',
			textStyle: {
				fontSize: 12,
				fontWeight: 400,
			},
			left: 'center',
			top: '5%',
		},
		grid: {
			top: '15%',
			bottom: 32,
			left: '15%',
			right: '15%',
		},
		legend: {
			icon: 'circle',
			top: '5%',
			right: '5%',
			itemWidth: 6,
			itemGap: 20,
			textStyle: {
				color: '#556677',
			},
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					show: true,
					backgroundColor: '#fff',
					color: '#556677',
					borderColor: 'rgba(0,0,0,0)',
					shadowColor: 'rgba(0,0,0,0)',
					shadowOffsetY: 0,
				},
				lineStyle: {
					width: 0,
				},
			},
			backgroundColor: '#fff',
			textStyle: {
				color: '#5c6c7c',
			},
			padding: [10, 10],
			extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)',
		},
		xAxis: [
			{
				type: 'category',
				data: ['beijin', 'shanghai', 'gz', 'sz', 'hk', 'aomen', 'taiwan'],
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},

				axisLabel: {
					interval: 0,
					textStyle: {
						color: '#7d838b',
					},
					// 默认x轴字体大小
					fontSize: 12,
					// margin:文字到x轴的距离
					margin: 15,
				},
				axisPointer: {
					label: {
						// padding: [11, 5, 7],
						padding: [0, 0, 10, 0],
						margin: 15,
						// 移入时的字体大小
						fontSize: 12,
						backgroundColor: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [
								{
									offset: 0,
									color: '#fff', // 0% 处的颜色
								},
								{
									// offset: 0.9,
									offset: 0.86,
									/*
0.86 = （文字 + 文字距下边线的距离）/（文字 + 文字距下边线的距离 + 下边线的宽度）
                        
                        */
									color: '#fff', // 0% 处的颜色
								},
								{
									offset: 0.86,
									color: '#33c0cd', // 0% 处的颜色
								},
								{
									offset: 1,
									color: '#33c0cd', // 100% 处的颜色
								},
							],
							global: false, // 缺省为 false
						},
					},
				},
				boundaryGap: false,
			},
		],
		yAxis: [
			{
				type: 'value',
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				axisLabel: {
					textStyle: {
						color: '#556677',
					},
				},
				splitLine: {
					show: false,
				},
			},
			{
				type: 'value',
				position: 'right',
				axisTick: {
					show: false,
				},
				axisLabel: {
					textStyle: {
						color: '#556677',
					},
					formatter: '{value}',
				},
				axisLine: {
					show: false,
				},
				splitLine: {
					show: false,
				},
			},
		],
		series: [
			{
				name: 'Adidas',
				type: 'line',
				data: [10, 10, 30, 12, 15, 3, 7],
				symbolSize: 1,
				symbol: 'circle',
				smooth: true,
				yAxisIndex: 0,
				showSymbol: false,
				lineStyle: {
					width: 5,
					color: new graphic.LinearGradient(0, 1, 0, 0, [
						{
							offset: 0,
							color: '#9effff',
						},
						{
							offset: 1,
							color: '#9E87FF',
						},
					]),
				},
				itemStyle: {
					normal: {
						color: colorList[0],
						borderColor: colorList[0],
					},
				},
			},
			{
				name: 'Nike',
				type: 'line',
				data: [5, 12, 11, 14, 25, 16, 10],
				symbolSize: 1,
				symbol: 'circle',
				smooth: true,
				yAxisIndex: 0,
				showSymbol: false,
				lineStyle: {
					width: 5,
					color: new graphic.LinearGradient(1, 1, 0, 0, [
						{
							offset: 0,
							color: '#73DD39',
						},
						{
							offset: 1,
							color: '#73DDFF',
						},
					]),
				},
				itemStyle: {
					normal: {
						color: colorList[1],
						borderColor: colorList[1],
					},
				},
			},
			{
				name: 'beijin',
				type: 'line',
				data: [150, 120, 170, 140, 500, 160, 110],
				symbolSize: 1,
				yAxisIndex: 1,
				symbol: 'circle',
				smooth: true,
				showSymbol: false,
				lineStyle: {
					width: 5,
					color: new graphic.LinearGradient(0, 0, 1, 0, [
						{
							offset: 0,
							color: '#fe9a',
						},
						{
							offset: 1,
							color: '#fe9a8b',
						},
					]),
				},
				itemStyle: {
					normal: {
						color: colorList[2],
						borderColor: colorList[2],
					},
				},
			},
		],
	}

	useEffect(() => {
		if (chart.current) {
			chart.current?.setOption(option)
		}
	}, [option])

	return (
		<>
			<InjectView
				chart={chart}
				option={option}
				id="demo"
				name="示例0"
				renderFlag={true}
				container={salesDemoContainer}
			/>
			<div ref={salesDemoContainer} style={style} />
		</>
	)
}

export default Demo
