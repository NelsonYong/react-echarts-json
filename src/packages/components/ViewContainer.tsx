import React, { lazy, Suspense, useMemo } from 'react'

const ViewContainer: React.FC<{
	renderable: boolean
	view?: React.ReactNode
	rest?: Record<string, any>
}> = ({ renderable = false, view, ...rest }): JSX.Element => {
	const View = useMemo(() => {
		return lazy(() => {
			return new Promise((resolve) => {
				if (!view) {
					import('./EchartDefaultView')
						.then(({ default: DefaultComponent }) => {
							// @ts-ignore
							resolve({ default: DefaultComponent })
						})
						.catch((error) => {
							console.error(error)
						})
					// @ts-ignore
				} else resolve({ default: <></> })
			})
		})
	}, [])

	// 异步加载组件
	return renderable ? (
		view ? (
			(view as JSX.Element)
		) : (
			<Suspense fallback={<></>}>
				<View {...rest} />
			</Suspense>
		)
	) : (
		<></>
	)
}

export default ViewContainer
