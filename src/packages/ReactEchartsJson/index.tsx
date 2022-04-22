import { useBoolean } from 'ahooks'
import { Col, Row, Switch } from 'antd'
import ReactJson from 'react-json-view'
import { EChartsOption, EChartsType } from 'echarts/types/dist/echarts'

import type { InteractionProps } from 'react-json-view'

import useEventEmitter from '../hooks/useChartEventEmitter'
import useEchartsTool from '../hooks/useEchartsTool'

const OptionView = ({
	id,
	title,
	chart,
	option,
}: {
	id?: string
	title?: string
	option?: any
	chart?: EChartsType
}) => {
	const { tool } = useEchartsTool({})
	const event = useEventEmitter({ global: true })
	const [collapsed, { set: toggleCollapsed }] = useBoolean(true)
	const optionChange = (ctrl: InteractionProps) => {
		const { updated_src } = ctrl
		chart?.setOption(updated_src as EChartsOption)
		tool?.add(id!, chart, updated_src as EChartsOption, title)
		event.emit('list')
	}

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
			{option && (
				// @ts-ignore
				<ReactJson
					// @ts-ignore
					src={option}
					theme={'pop'}
					displayObjectSize={false}
					displayDataTypes={false}
					collapsed={collapsed}
					iconStyle="triangle"
					enableClipboard={true}
					onEdit={optionChange}
					onAdd={optionChange}
					onDelete={optionChange}
				/>
			)}
		</div>
	)
}

export default OptionView
