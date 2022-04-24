import { Logs } from './log'

import LogsInstance from './log'
import { useCreation } from 'ahooks'

export default function useLogs() {
	const logs = useCreation<Logs>(() => LogsInstance, [])
	return logs
}
