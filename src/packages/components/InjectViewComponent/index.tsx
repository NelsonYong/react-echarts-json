import useInjection, {
	ChartType,
	ContainerType,
	EChartsOption,
} from '@/packages/hooks/useInjection'
import { useUpdate, useUpdateLayoutEffect } from 'ahooks'

const InjectViewComponent: React.FC<{
	chart: ChartType
	option: EChartsOption
	id: string
	name: string
	container?: ContainerType
	renderFlag?: boolean
}> = ({ renderFlag = true, ...rest }) => {
	useInjection(rest, [rest.option])

	const update = useUpdate()
	useUpdateLayoutEffect(() => {
		if (renderFlag) {
			update()
		}
	}, [renderFlag])

	return null
}

export default InjectViewComponent
