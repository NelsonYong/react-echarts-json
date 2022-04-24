import { useBoolean } from 'ahooks'
import { Col, Row, Switch } from 'antd'
import ReactJson from 'react-json-view'
import { EChartsOption } from 'echarts/types/dist/echarts'

import type { InteractionProps } from 'react-json-view'

import useEventEmitter from '@/packages/hooks/useChartEventEmitter'
import useEchartsTool from '@/packages/hooks/useInjection'
import { ControlType } from '@/packages/hooks/useInjection/charts'
import { useMemo } from 'react'
import useLogs from '@/packages/hooks/useLogs'

const OptionView = ({
	id,
	title,
	chart,
	option,
	darkMode,
}: ControlType & { darkMode?: boolean }) => {
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
			chart?.setOption(updated_src as EChartsOption)
			tool?.add({
				id: id,
				chart,
				option: updated_src as EChartsOption,
				title,
			})
			logs.updata({
				id,
				name: title,
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
						checkedChildren="展开配置"
						unCheckedChildren="折叠配置"
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

export default OptionView
