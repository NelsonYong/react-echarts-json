import { useEffect, useRef } from 'react'
import { InjectView } from '../../packages'
import * as echarts from 'echarts'

import { chinaMap, chinaMapOutline } from './map'

const chinaGeoCoordMap = {
	黑龙江: [127.9688, 45.368],
	内蒙古: [110.3467, 41.4899],
	吉林: [125.8154, 44.2584],
	北京市: [116.4551, 40.2539],
	辽宁: [123.1238, 42.1216],
	河北: [114.4995, 38.1006],
	天津: [117.4219, 39.4189],
	山西: [112.3352, 37.9413],
	陕西: [109.1162, 34.2004],
	甘肃: [103.5901, 36.3043],
	宁夏: [106.3586, 38.1775],
	青海: [101.4038, 36.8207],
	新疆: [87.9236, 43.5883],
	西藏: [91.11, 29.97],
	四川: [103.9526, 30.7617],
	重庆: [108.384366, 30.439702],
	山东: [117.1582, 36.8701],
	河南: [113.4668, 34.6234],
	江苏: [118.8062, 31.9208],
	安徽: [117.29, 32.0581],
	湖北: [114.3896, 30.6628],
	浙江: [119.5313, 29.8773],
	福建: [119.4543, 25.9222],
	江西: [116.0046, 28.6633],
	湖南: [113.0823, 28.2568],
	贵州: [106.6992, 26.7682],
	云南: [102.9199, 25.4663],
	广东: [113.12244, 23.009505],
	广西: [108.479, 23.1152],
	海南: [110.3893, 19.8516],
	上海: [121.4648, 31.2891],
}
const chinaDatas = [
	[
		{
			name: '黑龙江',
			value: 0,
		},
	],
	[
		{
			name: '内蒙古',
			value: 0,
		},
	],
	[
		{
			name: '吉林',
			value: 0,
		},
	],
	[
		{
			name: '辽宁',
			value: 0,
		},
	],
	[
		{
			name: '河北',
			value: 0,
		},
	],
	[
		{
			name: '天津',
			value: 0,
		},
	],
	[
		{
			name: '山西',
			value: 0,
		},
	],
	[
		{
			name: '陕西',
			value: 0,
		},
	],
	[
		{
			name: '甘肃',
			value: 0,
		},
	],
	[
		{
			name: '宁夏',
			value: 0,
		},
	],
	[
		{
			name: '青海',
			value: 0,
		},
	],
	[
		{
			name: '新疆',
			value: 0,
		},
	],
	[
		{
			name: '西藏',
			value: 0,
		},
	],
	[
		{
			name: '四川',
			value: 0,
		},
	],
	[
		{
			name: '重庆',
			value: 0,
		},
	],
	[
		{
			name: '山东',
			value: 0,
		},
	],
	[
		{
			name: '河南',
			value: 0,
		},
	],
	[
		{
			name: '江苏',
			value: 0,
		},
	],
	[
		{
			name: '安徽',
			value: 0,
		},
	],
	[
		{
			name: '湖北',
			value: 0,
		},
	],
	[
		{
			name: '浙江',
			value: 0,
		},
	],
	[
		{
			name: '福建',
			value: 0,
		},
	],
	[
		{
			name: '江西',
			value: 0,
		},
	],
	[
		{
			name: '湖南',
			value: 0,
		},
	],
	[
		{
			name: '贵州',
			value: 0,
		},
	],
	[
		{
			name: '广西',
			value: 0,
		},
	],
	[
		{
			name: '海南',
			value: 0,
		},
	],
	[
		{
			name: '北京市',
			value: 1,
		},
	],
]

const convertData = function (data: string | any[]) {
	let res = []
	for (let i = 0; i < data.length; i++) {
		let dataItem = data[i]
		// @ts-ignore
		let fromCoord = chinaGeoCoordMap[dataItem[0].name]
		var toCoord = [121.4648, 31.2891]
		if (fromCoord && toCoord) {
			res.push([
				{
					coord: toCoord,
				},
				{
					coord: fromCoord,
					value: dataItem[0].value,
				},
			])
		}
	}
	return res
}
const series = [
	{
		map: 'chinaMap',
		type: 'map',
		zoom: 1.2,
		label: {
			normal: {
				show: false,
				textStyle: {
					color: '#fff',
				},
			},
			emphasis: {
				textStyle: {
					color: '#fff',
				},
			},
		},
		top: '16%',
		tooltip: {
			show: false,
		},
		roam: false,
		itemStyle: {
			normal: {
				areaColor: 'transparent',
				borderColor: 'rgba(0,255,255,.1)',
				borderWidth: 1,
			},
			emphasis: {
				areaColor: 'rgba(0,255,255,.1)',
				textStyle: {
					color: 'red',
				},
			},
		},
	},
]
;[['上海', chinaDatas]].forEach(function (item, i) {
	series.push(
		{
			type: 'lines',
			// @ts-ignore
			zlevel: 2,
			effect: {
				show: true,
				period: 4, //箭头指向速度，值越小速度越快
				trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
				symbol: 'arrow', //箭头图标
				symbolSize: 5, //图标大小
			},
			lineStyle: {
				normal: {
					width: 1, //尾迹线条宽度
					opacity: 1, //尾迹线条透明度
					curveness: 0.3, //尾迹线条曲直度
				},
			},
			data: convertData(item[1]),
		},
		{
			type: 'scatter',
			coordinateSystem: 'geo',
			zlevel: 2,
			rippleEffect: {
				//涟漪特效
				period: 4, //动画时间，值越小速度越快
				brushType: 'stroke', //波纹绘制方式 stroke, fill
				scale: 4, //波纹圆环最大限制，值越大波纹越大
			},
			label: {
				normal: {
					show: false,
					position: 'right', //显示位置
					offset: [5, 0], //偏移设置
					formatter: function (params: { data: { name: any } }) {
						//圆环显示文字
						return params.data.name
					},
					fontSize: 13,
				},
				emphasis: {
					show: true,
				},
			},
			symbol: 'circle',
			symbolSize: function (val: number[]) {
				return 5 + val[2] * 5 //圆环大小
			},
			itemStyle: {
				normal: {
					show: false,
					color: '#34c6bb',
				},
			},
			// @ts-ignore
			data: item[1].map(function (dataItem) {
				return {
					name: dataItem[0].name,
					// @ts-ignore
					value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
				}
			}),
		}
	)
})

const Map = () => {
	const chart = useRef<any>()
	const containerRef = useRef<HTMLDivElement>(null)
	const style = {
		height: '800px',
		width: '100%',
	}

	const option: any = {
		backgroundColor: 'transparent',
		tooltip: {
			trigger: 'item',
		},
		color: ['#34c6bb'],
		geo: {
			silent: true,
			map: 'chinaMapOutline',
			zoom: 0.8,
			top: '0%',
			label: {
				normal: {
					show: false,
					textStyle: {
						color: '#fff',
					},
				},
				emphasis: {
					textStyle: {
						color: '#fff',
					},
				},
			},

			roam: false,
			itemStyle: {
				normal: {
					areaColor: 'rgba(0,255,255,.02)',
					borderColor: '#00ffff',
					borderWidth: 1.5,
					shadowColor: '#00ffff',
					shadowOffsetX: 0,
					shadowOffsetY: 4,
					shadowBlur: 10,
				},
				emphasis: {
					areaColor: 'transparent', //悬浮背景
					textStyle: {
						color: '#fff',
					},
				},
			},
		},
		series: series,
	}

	useEffect(() => {
		if (containerRef.current) {
			chart.current = echarts.init(containerRef.current)
			// @ts-ignore
			echarts.registerMap('chinaMap', chinaMap)
			// @ts-ignore
			echarts.registerMap('chinaMapOutline', chinaMapOutline)

			chart.current.setOption(option)
		}
	}, [])

	return (
		<>
			<InjectView
				chart={chart}
				option={option}
				id="map"
				name="中国地图"
				renderFlag={true}
			/>
			<div ref={containerRef} style={style} />
		</>
	)
}

export default Map
