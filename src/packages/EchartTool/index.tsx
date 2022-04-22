import { useRef, useState } from 'react'
import { Space, Button, Drawer, Radio, Row, Divider, Tabs } from 'antd'
import {
	DownOutlined,
	LeftOutlined,
	RightOutlined,
	UpOutlined,
} from '@ant-design/icons'

import type { DrawerProps } from 'antd'
import type { EChartsOption, EChartsType } from 'echarts'

import useEchartsTool from '../hooks/useEchartsTool'
import useEventEmitter from '../hooks/useChartEventEmitter'

import ReactEchartsJson from '../ReactEchartsJson'

import styles from './index.module.less'

const { TabPane } = Tabs

const EchartTool = () => {
	const event = useEventEmitter({ global: true })
	const currentIndex = useRef(0)

	const { tool } = useEchartsTool({})

	const [visible, setVisible] = useState(false)
	const [placement, setPlacement] = useState<DrawerProps['placement']>('right')
	const [chartList, setChartList] = useState<
		{
			id?: string
			option?: EChartsOption
			chart?: EChartsType
			title?: string
		}[]
	>([])
	const [currentChart, setCurrentChart] = useState<{
		id?: string
		option?: EChartsOption
		chart?: EChartsType
		title?: string
	}>()

	event.useSubscription('list', () => {
		if (tool?.list().length) {
			setCurrentChart(tool?.list()?.[currentIndex.current])
			setChartList(tool?.list())
		}
	})

	const showDrawer = () => {
		setVisible(true)
	}
	const onChange = (value: 'top' | 'right' | 'bottom' | 'left' | undefined) => {
		if (value) {
			setPlacement(value)
			showDrawer()
		}
	}
	const RadioOnChang = (e: any) => {
		currentIndex.current = chartList.findIndex((v) => v.id === e.target.value)
		setCurrentChart(chartList?.[currentIndex.current])
	}
	const onClose = () => {
		setVisible(false)
	}

	return (
		<div className={styles.container}>
			{
				<div>
					<div className={styles.function}>
						<Space direction="horizontal" size={16}>
							<div
								onClick={() => {
									onChange('top')
								}}
							>
								<UpOutlined />
							</div>
							<div
								onClick={() => {
									onChange('bottom')
								}}
							>
								<DownOutlined />
							</div>
							<div
								onClick={() => {
									onChange('left')
								}}
							>
								<LeftOutlined />
							</div>
							<div
								onClick={() => {
									onChange('right')
								}}
							>
								<RightOutlined />
							</div>
						</Space>
					</div>

					<Drawer
						title="图表配置"
						placement={placement}
						width={700}
						height={400}
						mask={false}
						closable={false}
						onClose={onClose}
						visible={visible}
						extra={
							<Space>
								<Button onClick={onClose}>关闭</Button>
								<Button type="primary" onClick={onClose}>
									数据源
								</Button>
							</Space>
						}
					>
						<Row>
							<Radio.Group
								onChange={RadioOnChang}
								defaultValue={chartList?.[0]?.id}
								value={currentChart?.id}
							>
								{chartList?.map((item) => (
									<Radio style={{ height: 48 }} value={item.id}>
										{item.title}（{item.id}）
									</Radio>
								))}
							</Radio.Group>
						</Row>
						<Divider />
						<Tabs defaultActiveKey="2">
							<TabPane
								tab={<span style={{ fontSize: 16 }}>配置项视图</span>}
								key="view"
							>
								<ReactEchartsJson
									{...currentChart}
									// option={{
									// 	...(currentChart?.chart?.getOption() ?? {}),
									// }}
								/>
							</TabPane>
						</Tabs>
					</Drawer>
				</div>
			}
		</div>
	)
}

export default EchartTool
