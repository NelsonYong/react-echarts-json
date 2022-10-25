import { useEffect } from 'react'
import { graphic } from 'echarts'
import { useInjection, useEcharts, InjectView } from '../../packages'
let mockData = [
	{ time: '1-23', num: 0 },
	{ time: '1-24', num: 1 },
	{ time: '1-25', num: 2 },
	{ time: '1-26', num: 2 },
	{ time: '1-27', num: 6 },
	{ time: '1-28', num: 9 },
	{ time: '1-29', num: 14 },
	{ time: '1-30', num: 16 },
	{ time: '1-31', num: 22 },
	{ time: '2-01', num: 23 },
	{ time: '2-02', num: 32 },
	{ time: '2-04', num: 40 },
	{ time: '2-05', num: 43 },
	{ time: '2-06', num: 45 },
	{ time: '2-07', num: 51 },
	{ time: '2-08', num: 52 },
	{ time: '2-09', num: 55 },
	{ time: '2-10', num: 54 },
	{ time: '2-11', num: 59 },
	{ time: '2-12', num: 61 },
	{ time: '2-13', num: 61 },
	{ time: '2-14', num: 69 },
	{ time: '2-15', num: 68 },
	{ time: '2-16', num: 61 },
	{ time: '2-17', num: 75 },
	{ time: '2-18', num: 72 },
	{ time: '2-19', num: 70 },
	{ time: '2-20', num: 66 },
	{ time: '2-21', num: 65 },
	{ time: '2-22', num: 65 },
	{ time: '2-23', num: 61 },
	{ time: '2-24', num: 62 },
	{ time: '2-25', num: 59 },
	{ time: '2-26', num: 56 },
	{ time: '2-27', num: 53 },
	{ time: '2-28', num: 50 },
	{ time: '2-29', num: 42 },
	{ time: '3-01', num: 35 },
	{ time: '3-02', num: 32 },
	{ time: '3-03', num: 24 },
	{ time: '3-04', num: 16 },
	{ time: '3-05', num: 0 },
	{ time: '3-06', num: 0 },
]
let xData = mockData.map((item) => item.time)
let yData = mockData.map((item) => item.num)

const Demo4 = () => {
	const { container: salesDemoContainer, chart } = useEcharts()

	const style = {
		height: '233px',
		width: '430px',
	}

	const option: any = {
		backgroundColor: 'transparent',
		grid: {
			top: '15%',
			bottom: 32,
			left: '15%',
			right: '15%',
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985',
					fontSize: 12,
				},
			},
			textStyle: { fontSize: '100%' },
			formatter: (v: { value: any }[]) => {
				return `
              <div class='u-p-2'>
                <div class='fz-10'>date${
									// @ts-ignore
									v[0]?.axisValue
								}</div>
                <div class='fz-10 u-mt-2'>num${v[0].value}</div>
              </div>
            `
			},
		},
		xAxis: {
			type: 'category',
			boundaryGap: false, // 两边留白
			axisLabel: { textStyle: { color: '#fff', fontSize: 14 } },
			data: xData,
			axisLine: { lineStyle: { color: '#000', width: 1 } },
			splitLine: {
				lineStyle: { type: 'dashed', color: 'rgba(255,255,255,.2)', width: 1 },
				show: true,
			},
		},
		yAxis: {
			name: '人',
			type: 'value',
			scale: true,
			nameTextStyle: {
				color: 'rgba(255,255,255,.5)',
				align: 'right',
				padding: [0, 10, 0, 0],
				fontSize: '100%',
			},
			axisLabel: { textStyle: { color: '#fff', fontSize: '100%' }, margin: 8 },
			axisLine: { lineStyle: { color: '#000', width: 1 } },
			splitLine: {
				lineStyle: { type: 'solid', color: 'rgba(255,255,255,.2)', width: 1 },
				show: true,
			},
		},
		series: {
			name: '',
			type: 'line',
			stack: '',
			// 修改的是线下区域的颜色
			areaStyle: {
				color: new graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 0,
						color: 'rgba(236, 99, 123, .5)',
					},
					{
						offset: 1,
						color: 'rgba(102, 212, 250,.0)',
					},
				]),
			},
			// 修改的是线的颜色
			lineStyle: {
				color: {
					type: 'linear',
					x: 0,
					y: 1,
					x2: 0,
					y2: 0,
					// 0% 处的颜色                           // 100% 处的颜色
					colorStops: [
						{ offset: 0, color: '#3a76f6' },
						{ offset: 0.25, color: '#66d4fa' },
						{ offset: 0.75, color: '#f8d470' },
						{ offset: 1, color: '#ec637b' },
					],
					global: false, // 缺省为 false
				},
				width: 2,
			},
			//图例样式，默认空心圆，设为none是实心，还有'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
			symbol: 'none',
			data: yData,
			markLine: {
				symbol: 'none',
				data: [
					{
						name: 'top',
						xAxis: '2-17',
						lineStyle: {
							color: '#eb6272',
							type: 'dashed',
							width: 0,
						},
						label: {
							show: true,
							formatter: '2.17日\n top-number\n{a|}',
							align: 'center',
							distance: [0, -60],
							fontSize: 14,
							rich: {
								// a:{ backgroundColor: { image: bg1 }, width: 20, height: 20 }
							},
						},
					},
					{
						name: 'zone',
						xAxis: '3-05',
						// symbol: 'image://' + bg2,
						symbol: 'circle',
						symbolSize: 10,
						lineStyle: {
							color: '#66cfef',
							type: 'dashed',
							width: 1,
						},
						label: {
							show: true,
							formatter: '3.5日\n zone',
							fontSize: 14,
							align: 'center',
						},
					},
				],
			},
		},
	}
	useInjection(
		{
			chart: chart,
			option,
			id: 'demo5',
			name: 'Demo5',
			container: salesDemoContainer,
		},
		[]
	)

	useEffect(() => {
		if (chart.current) {
			chart.current?.setOption(option)
		}
	}, [])

	return (
		<>
			<InjectView
				chart={chart}
				option={option}
				id="demo5"
				name="示例5"
				renderFlag={true}
			/>
			<div ref={salesDemoContainer} style={style} />
		</>
	)
}

export default Demo4
