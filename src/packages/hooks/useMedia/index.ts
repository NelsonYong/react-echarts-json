import { useEffect, useState } from 'react'

export default function useMedia(
	queries: any[],
	values: { [x: string]: any },
	defaultValue: any
) {
	const mediaQueryLists = queries.map((q: string) => window.matchMedia(q))
	const getValue = () => {
		const index = mediaQueryLists.findIndex(
			(mql: { matches: any }) => mql.matches
		)
		return typeof values[index] !== 'undefined' ? values[index] : defaultValue
	}
	const [value, setValue] = useState(getValue)
	useEffect(() => {
		const handler = () => setValue(getValue)
		mediaQueryLists.forEach((mql: { addListener: (arg0: () => void) => any }) =>
			mql.addListener(handler)
		)
		return () =>
			mediaQueryLists.forEach(
				(mql: { removeListener: (arg0: () => void) => any }) =>
					mql.removeListener(handler)
			)
	}, [])
	return value
}
