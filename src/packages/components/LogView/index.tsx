import React, { useEffect, useMemo, useState } from 'react'
import ReactJson from 'react-json-view'

import useChartEventEmitter from '../../hooks/useChartEventEmitter'
import useLogs from '../../hooks/useLogs'

import { LogType } from '../../hooks/useLogs/log'

import { dark, light } from '../EchartDefaultView/style'
import { Col, Divider, Row } from 'antd'

const colors = [
	'#3896FF',
	'#C50D0D',
	'#FA6400',
	'#E9A647',
	'#A01EAA',
	'#01C1D5',
	'#5C1CF0',
]

const LogView: React.FC<{ darkMode?: boolean; id?: string }> = ({
	id,
	darkMode,
}) => {
	const event = useChartEventEmitter({ global: true })
	const logs = useLogs()

	const [logList, setLogList] = useState<LogType[]>()

	const styleMode = useMemo(() => {
		return darkMode ? dark : light
	}, [darkMode])

	event.useSubscription('list', () => {
		setLogList(logs.getList(id))
	})

	useEffect(() => {
		setLogList(logs.getList(id))
	}, [id])

	return (
		<div
			style={{
				color: styleMode.color,
			}}
		>
			{logList?.map((log, index) => {
				return (
					<div key={`${log.id}${index}`}>
						<Row>
							<Col span={4}>{'id'}</Col>
							<Col span={20}>
								<div>{log.id}</div>
							</Col>
						</Row>
						<Row>
							<Col span={4}>{'name'}</Col>
							<Col span={20}>
								<div>{log.name}</div>
							</Col>
						</Row>
						{log.namespace?.length && (
							<Row>
								<Col span={4}>{'namespace'}</Col>
								<Col span={20}>
									{log.namespace?.map((s, index) => {
										return (
											<span
												style={{
													color:
														index < 7
															? colors[index]
															: darkMode
															? '#191919'
															: '#fff',
												}}
											>
												{`${s}`}
												{log.namespace?.length &&
													log.namespace?.length != 1 &&
													index !== log.namespace?.length - 1 && (
														<span
															style={{
																color: darkMode ? '#fff' : '#191919',
															}}
														>
															{'-->'}
														</span>
													)}
											</span>
										)
									})}
								</Col>
							</Row>
						)}
						<Row>
							<Col span={4}>{'form'}</Col>
							<Col span={20}>
								<ReactJson
									src={log.previewValue ?? {}}
									collapsed={true}
									theme={darkMode ? 'pop' : 'rjv-default'}
								/>
							</Col>
						</Row>
						<Row>
							<Col span={4}>{'to'}</Col>
							<Col span={20}>
								<ReactJson
									src={log.currentValue ?? {}}
									collapsed={true}
									theme={darkMode ? 'pop' : 'rjv-default'}
								/>
							</Col>
						</Row>
						{log?.['existing_value'] && (
							<Row>
								<Col span={4}>{'existing_value'}</Col>
								<Col span={20}>{log?.['existing_value']}</Col>
							</Row>
						)}
						{log?.['new_value'] && (
							<Row>
								<Col span={4}>{'new_value'}</Col>
								<Col span={20}>{log?.['new_value']}</Col>
							</Row>
						)}
						<Divider
							style={{
								color: darkMode ? '#191919' : '#fff',
							}}
						/>
					</div>
				)
			})}
		</div>
	)
}

export default LogView
