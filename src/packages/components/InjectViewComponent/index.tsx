import useInjection, {
	ChartType,
	EChartsOption,
} from '@/packages/hooks/useInjection'
import { useUpdate, useUpdateLayoutEffect } from 'ahooks'

const InjectViewComponent: React.FC<{
	chart: ChartType
	option: EChartsOption
	id: string
	name: string
	renderFlag?: boolean
}> = ({ chart, option, id, name, renderFlag = true }) => {
	useInjection({ chart, option, id, name }, [option])

	const update = useUpdate()
	useUpdateLayoutEffect(() => {
		if (renderFlag) {
			update()
		}
	}, [renderFlag])

	return null
}

export default InjectViewComponent
