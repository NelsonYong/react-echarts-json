import { useEffect, useMemo, useRef } from 'react'

import { EventEmitter, eventEmitterOverall } from './event'

export default function useChartEventEmitter<T = void>(options?: {
	global?: boolean
}) {
	const ref = useRef<EventEmitter<T> | typeof eventEmitterOverall>()

	const eventEmitterOptions = useMemo(
		() => options ?? { global: false },
		[options]
	)

	if (!ref.current) {
		ref.current = eventEmitterOptions.global
			? (ref.current = eventEmitterOverall)
			: (ref.current = new EventEmitter())
	}

	useEffect(() => {
		return () => ref.current?.clear()
	}, [])

	return ref.current
}
