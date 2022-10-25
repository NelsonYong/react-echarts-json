import React, { lazy, Suspense } from 'react'
import { ChartType, EChartsOption } from '@/packages/hooks/useInjection'

const View = lazy<
	React.ComponentType<{
		chart: ChartType
		option: EChartsOption
		id: string
		name: string
		renderFlag?: boolean
	}>
>(() => {
	return new Promise((resolve) => {
		import('../InjectViewComponent').then(({ default: DefaultComponent }) => {
			resolve({ default: DefaultComponent })
		})
	})
})

const InjectView: React.FC<{
	chart: ChartType
	option: EChartsOption
	id: string
	name: string
	renderFlag?: boolean
}> = ({ chart, option, id, name, renderFlag = false }) => {
	return renderFlag ? (
		<Suspense fallback={<></>}>
			<View
				chart={chart}
				option={option}
				id={id}
				name={name}
				renderFlag={renderFlag}
			/>
		</Suspense>
	) : null
}

export default InjectView
