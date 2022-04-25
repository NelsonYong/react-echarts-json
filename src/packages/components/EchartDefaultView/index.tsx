import { useMemo, useRef, useState } from 'react'
import { Space, Button, Drawer, Radio, Row, Divider, Tabs, Switch } from 'antd'
import {
	CloseOutlined,
	DownOutlined,
	LeftOutlined,
	RightOutlined,
	UpOutlined,
} from '@ant-design/icons'

import type { DrawerProps } from 'antd'
import type { EChartsOption, EChartsType } from 'echarts'

import useEchartsTool from '../../hooks/useInjection'
import useChartEventEmitter from '../../hooks/useChartEventEmitter'
import useDarkMode from '../../hooks/useDarkMode'

import ReactEchartsJson from '../ReactEchartsJson'

import type { ControlType } from '../../hooks/useInjection/charts'

import styles from './index.module.less'
import { light, dark } from './style'

import SunIcon from './icons/SunIcon'
import DarkIcon from './icons/DarkIcon'
import LogView from '../LogView'

const { TabPane } = Tabs

const EchartDefaultView = () => {
	const event = useChartEventEmitter({ global: true })
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
	const [currentChart, setCurrentChart] = useState<ControlType>()

	const [darkMode, setDarkMode] = useDarkMode()

	const styleMode = useMemo(() => {
		return darkMode ? dark : light
	}, [darkMode])

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
						className={darkMode ? styles['drawer-dark'] : ''}
						placement={placement}
						width={700}
						height={400}
						mask={false}
						closable={false}
						onClose={onClose}
						visible={visible}
						bodyStyle={styleMode.drawerStyle}
						headerStyle={{
							...styleMode.drawerStyle,
							borderBottomColor: darkMode ? '#191919' : '#fff',
						}}
						footerStyle={styleMode.drawerStyle}
						extra={
							<Space>
								<Switch
									checkedChildren={<DarkIcon />}
									unCheckedChildren={<SunIcon />}
									defaultChecked={darkMode}
									onChange={(e: boolean) => {
										setDarkMode(e)
									}}
								/>
								{/* <Button type="primary" onClick={onClose}>
									数据源
								</Button> */}
								<Button
									size="small"
									shape="circle"
									icon={<CloseOutlined />}
									onClick={onClose}
								></Button>
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
									<Radio
										style={{ height: 48, color: styleMode.color }}
										value={item.id}
										key={item.id}
									>
										{item.title}（{item.id}）
									</Radio>
								))}
							</Radio.Group>
						</Row>
						<Divider />
						<Tabs
							defaultActiveKey="view"
							className={darkMode ? styles['tab-dark'] : ''}
						>
							<TabPane
								tab={<span style={{ fontSize: 16 }}>配置项视图</span>}
								key="view"
							>
								<ReactEchartsJson {...currentChart} darkMode={darkMode} />
							</TabPane>
							<TabPane
								tab={<span style={{ fontSize: 16 }}>日志视图</span>}
								key="log"
							>
								<LogView darkMode={darkMode} />
							</TabPane>
						</Tabs>
					</Drawer>
				</div>
			}
		</div>
	)
}

export default EchartDefaultView
