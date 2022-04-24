import { useCreation } from 'ahooks'
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

	const event = useCreation(() => {
		if (!ref.current) {
			ref.current = eventEmitterOptions.global
				? (ref.current = eventEmitterOverall)
				: (ref.current = new EventEmitter())
		}
		return ref.current
	}, [eventEmitterOptions])

	useEffect(() => {
		return () => event?.clear()
	}, [event])

	return event
}
