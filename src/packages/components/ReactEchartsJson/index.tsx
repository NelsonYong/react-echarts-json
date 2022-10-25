import React, { useMemo } from 'react'
import { useBoolean } from 'ahooks'
import { Col, Row, Switch } from 'antd'
import ReactJson from 'react-json-view'
import { EChartsOption } from 'echarts/types/dist/echarts'

import type { InteractionProps } from 'react-json-view'

import useEventEmitter from '../../hooks/useChartEventEmitter'
import useEchartsTool from '../../hooks/useInjection'
import { ControlType } from '../../hooks/useInjection/charts'
import useLogs from '../../hooks/useLogs'

const ReactEchartsJson: React.FC<ControlType & { darkMode?: boolean }> = ({
	id,
	name,
	chart,
	option,
	darkMode,
}) => {
	const { tool } = useEchartsTool({})
	const logs = useLogs()
	const event = useEventEmitter({ global: true })
	const [collapsed, { set: toggleCollapsed }] = useBoolean(true)
	const optionChange = (ctrl: InteractionProps) => {
		if (id) {
			const {
				updated_src,
				namespace,
				existing_src,
				existing_value,
				new_value,
			} = ctrl

			chart?.clear()
			chart?.setOption(updated_src as EChartsOption)
			tool?.add({
				id: id,
				name,
				chart,
				option: updated_src as EChartsOption,
			})
			logs.updata({
				id,
				name,
				namespace: namespace,
				currentValue: updated_src,
				previewValue: existing_src,
				existing_value,
				new_value,
			})
			event.emit('list')
		}
	}

	const JsonView = useMemo(() => {
		return (
			<ReactJson
				src={option ?? {}}
				theme={darkMode ? 'pop' : 'rjv-default'}
				displayObjectSize={false}
				displayDataTypes={false}
				collapsed={collapsed}
				iconStyle="triangle"
				enableClipboard={true}
				onEdit={optionChange}
				onAdd={optionChange}
				onDelete={optionChange}
			/>
		)
	}, [darkMode, option, collapsed])

	return (
		<div>
			<Row>
				<Col>
					<Switch
						checkedChildren="Expand"
						unCheckedChildren="Collapsed"
						defaultChecked={false}
						onChange={(e: boolean) => {
							toggleCollapsed(!e)
						}}
					/>
				</Col>
			</Row>
			<br />
			{JsonView}
		</div>
	)
}

export default ReactEchartsJson
