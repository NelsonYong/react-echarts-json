import { useEffect } from 'react'
import { useInjection, useEcharts } from '../../packages'

let data = [
	{
		name: 'user1',
		value: 10,
		sum: 10,
	},
	{
		name: 'user2',
		value: 20,
		sum: 10,
	},
	{
		name: 'user3',
		value: 23,
		sum: 50,
	},
	{
		name: 'user4',
		value: 44,
		sum: 60,
	},
	{
		name: 'user1',
		value: 10,
		sum: 10,
	},
	{
		name: 'user2',
		value: 20,
		sum: 10,
	},
	{
		name: 'user3',
		value: 53,
		sum: 50,
	},
	{
		name: 'user4',
		value: 24,
		sum: 60,
	},
	{
		name: 'user1',
		value: 10,
		sum: 10,
	},
	{
		name: 'user2',
		value: 20,
		sum: 10,
	},
]
const getArrByKey = (data: any[], k: string) => {
	let key = k || 'value'
	let res: any[] = []
	if (data) {
		data.forEach(function (t) {
			res.push(t[key])
		})
	}
	return res
}
const getSymbolData = (data: string | any[]) => {
	let arr = []
	for (var i = 0; i < data.length; i++) {
		arr.push({
			value: data[i].value,
			symbolPosition: 'end',
		})
	}
	return arr
}

data = data.sort((a, b) => {
	return b.value - a.value
})
const Demo3 = () => {
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
		xAxis: {
			show: false,
		},
		yAxis: [
			{
				show: false,
				triggerEvent: true,
				inverse: true,
				data: getArrByKey(data, 'name'),
				axisLine: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				label: {
					show: false,
				},
			},
			{
				triggerEvent: true,
				show: false,
				inverse: true,
				data: getArrByKey(data, 'name'),
				axisLine: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				label: {
					show: false,
				},
			},
		],
		series: [
			{
				name: 'XXX',
				type: 'pictorialBar',
				symbol:
					'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAZlBMVEUAAABe3uVe3+Vf3uVf3+Zf3uVg3+Zg3+Zf3+Vi4OZh4OZg3+Z86/Bh3+Zi4Odj4Odi4OZ86/B76/B86/Bj4ed56+9x5+xn4umB7/N87PB36e+A7/N+7fF/7vJ/7vJ+7fGA7/OB7/PReX+lAAAAIXRSTlMABQkVDREmIhk3MR10LEFFPHh7cUprXE35h2XnqMLAp+mHAG9cAAAB5ElEQVRIx83WjU7CMBQFYIoiKMqU/XUboHv/l/Tce7t2XamDNSacETEmX86tlK2rx4py150o+MstMBLwWRfHKo6JCVxLnvmFGBjFQ58oF1//sUZhGy/ClSTWObgnL4O+bkeN4nY2okfNMbkRt9/vtxz8InoTsWplJSCzFxPmO8+GpSIByX3YQAuGDWtRKhKjCnxDXhF6Z4yxnZ20Wgko7BMRDmxtSGVaI4kdTIgb+zTYoJQlIMlDlmUFgrcDWWC201qSayqlTkiCddWWeV62VU0YlnpRi9VOKaSUsiyq/N0krwq2Ugt7lVpZl5BfHNiytjagMi+XYp0kCR45hMlivVQrE/uU5pXSrCB5bM6d1t2lOZItMqmliT3q5uVxqxzyW/ccfYLNKx7ZTeykMvNyac2yt2Fbc61MHLSC0rwoxbiNdlQ3GBm1NLHQsHUrtEXppR/ljNpW6DbSCoqlFiVoN6YdaFlgsSFVPs1BdT8OaB5QyQzVcaqWDows/zepxR8ObLglTrdtCRVuRNj4Rrxh+//0ke2f8KVL+Kon3GCSbmsJN9OUW3j6g0Ns+LgCij2u0h+Sghc8mlMPBMgdx5DFh59VmOVHrvmDnoNxCz3J7MFWsMuaLyR089xz/xhlfijvwutR8gv3zk6BLUUeCgAAAABJRU5ErkJggg==',
				symbolSize: [30, 30],
				symbolOffset: [10, 0],
				z: 12,
				itemStyle: {
					color: '#14b1eb',
				},
				label: {
					show: false,
				},
				data: getSymbolData(data),
			},
			{
				name: '条',
				type: 'bar',
				showBackground: true,
				barBorderRadius: 30,
				yAxisIndex: 0,
				data: data,
				barWidth: 10,
				// align: left,
				itemStyle: {
					color: '#A71A2B',
					// color: '#A71A2B',
					barBorderRadius: 4,
				},
				label: {
					show: false,
				},
			},
		],
	}
	useInjection(
		{
			chart: chart,
			option,
			id: 'demo3',
			name: '排名',
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

export default Demo3
