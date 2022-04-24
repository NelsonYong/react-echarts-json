import { useEffect, useRef, useState } from 'react'

import { useLocalStorageState } from 'ahooks'
import useMedia from '../useMedia'

export default function useDarkMode() {
	const [enabledState, setEnabledState] =
		useLocalStorageState('dark-mode-enabled')

	const prefersDarkMode = usePrefersDarkMode()

	const enabled =
		typeof enabledState !== 'undefined' ? enabledState : prefersDarkMode
	useEffect(() => {
		const className = 'dark-mode'
		const element = window.document.body
		if (enabled) {
			element.classList.add(className)
		} else {
			element.classList.remove(className)
		}
	}, [enabled])
	return [enabled, setEnabledState]
}

function usePrefersDarkMode() {
	return useMedia(['(prefers-color-scheme: dark)'], [true], false)
}
