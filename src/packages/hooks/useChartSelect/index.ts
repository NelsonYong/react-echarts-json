import useInjection from '../useInjection'

export default function useChartSelect({
	normal,
	active,
}: {
	normal?: string
	active?: string
}) {
	const { tool } = useInjection({})
	const runSelect = ({ id }: { id: string; [x: string]: any }) => {
		tool.select({ id, normal, active })
	}
	return {
		runSelect,
	}
}
