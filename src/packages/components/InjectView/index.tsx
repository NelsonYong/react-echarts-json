import React, { lazy, Suspense } from 'react'
import {
	ChartType,
	ContainerType,
	EChartsOption,
} from '@/packages/hooks/useInjection'

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
	container?: ContainerType
	renderFlag?: boolean
}> = ({ renderFlag = false, ...rest }) => {
	return renderFlag ? (
		<Suspense fallback={<></>}>
			<View {...rest} renderFlag={renderFlag} />
		</Suspense>
	) : null
}

export default InjectView
