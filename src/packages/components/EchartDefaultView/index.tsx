import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Space, Button, Drawer, Radio, Row, Divider, Tabs, Switch } from 'antd'
import {
	CloseOutlined,
	DownOutlined,
	GithubOutlined,
	LeftOutlined,
	RightOutlined,
	UpOutlined,
} from '@ant-design/icons'

import type { DrawerProps } from 'antd'
import type { EChartsOption, EChartsType } from 'echarts'

import useInjection from '../../hooks/useInjection'
import useChartEventEmitter from '../../hooks/useChartEventEmitter'
import useDarkMode from '../../hooks/useDarkMode'
import useChartSelect from '../../hooks/useChartSelect'

import ReactEchartsJson from '../ReactEchartsJson'
import Editor from '../Editor'

import type { ControlType } from '../../hooks/useInjection/charts'

import styles from './index.module.less'
import { light, dark } from './style'

import SunIcon from './icons/SunIcon'
import DarkIcon from './icons/DarkIcon'
import LogView from '../LogView'

const { TabPane } = Tabs

const EchartDefaultView: React.FC<{ github?: boolean }> = ({
	github = false,
}) => {
	const event = useChartEventEmitter({ global: true })
	const { tool } = useInjection({})
	const { runSelect } = useChartSelect({})
	const [darkMode, setDarkMode] = useDarkMode()

	const currentIndex = useRef(0)
	const [visible, setVisible] = useState(false)
	const [placement, setPlacement] = useState<DrawerProps['placement']>('right')
	const [chartList, setChartList] = useState<
		{
			id?: string
			option?: EChartsOption
			chart?: EChartsType
			name?: string
		}[]
	>([])
	const [currentChart, setCurrentChart] = useState<ControlType>()

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

	useEffect(() => {
		if (currentChart?.id)
			runSelect({
				id: currentChart?.id,
			})
	}, [currentChart])

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
						title="Chart View"
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
							<Space size={16}>
								{github && (
									<span>
										<GithubOutlined
											style={{
												fontSize: 24,
											}}
											onClick={() => {
												window.open(
													'https://github.com/NelsonYong/react-echarts-json',
													'react-echarts-json'
												)
											}}
										/>
										<span
											style={{
												fontSize: 16,
												marginLeft: 6,
												fontWeight: 600,
											}}
										>
											star
										</span>
									</span>
								)}

								<Switch
									checkedChildren={<DarkIcon />}
									unCheckedChildren={<SunIcon />}
									defaultChecked={darkMode}
									onChange={(e: boolean) => {
										setDarkMode(e)
									}}
								/>
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
										{item.name}（{item.id}）
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
								tab={
									<span style={{ fontSize: 16 }}>
										<span>⚙️</span>
										<span style={{ marginLeft: 8 }}>Option</span>
									</span>
								}
								key="view"
							>
								<ReactEchartsJson {...currentChart} darkMode={darkMode} />
							</TabPane>
							<TabPane
								tab={
									<span style={{ fontSize: 16 }}>
										<span>✍︎</span>
										<span style={{ marginLeft: 8 }}>Code</span>
									</span>
								}
								key="editor"
							>
								<Editor activeId={currentChart?.id} />
							</TabPane>
							<TabPane
								tab={
									<span style={{ fontSize: 16 }}>
										<span>📄</span>
										<span style={{ marginLeft: 8 }}>Log</span>
									</span>
								}
								key="log"
							>
								<LogView darkMode={darkMode} id={currentChart?.id} />
							</TabPane>
						</Tabs>
					</Drawer>
				</div>
			}
		</div>
	)
}

export default EchartDefaultView
