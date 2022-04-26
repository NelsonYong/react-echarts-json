type Log = {
	id?: string
	name?: string
	type?: 'add' | 'updata' | 'delete'
}
type ControllableUpdate = {
	previewValue?: any
	currentValue?: any
	depsViewId?: string
	depsViewName?: string
	namespace?: (string | null)[]
}

type UncontrollableDepsUpdata = {
	previewValue?: any
	currentValue?: any
	namespace?: (string | null)[]
}

export type LogType = Partial<Log> &
	Partial<ControllableUpdate> &
	Partial<UncontrollableDepsUpdata> &
	Record<string | number, any>

export class Logs {
	private logs = new Set<LogType>()
	updata(
		params: Pick<Log, 'id' | 'name'> & ControllableUpdate & Record<string, any>
	) {
		this.logs.add({
			...params,
		})
	}
	depsUpdata(params: Pick<Log, 'id' | 'name'> & UncontrollableDepsUpdata) {
		this.logs.add({
			...params,
		})
	}

	getList(id?: string) {
		if (id) return Array.from(this.logs)?.filter((i) => i.id === id)
		return Array.from(this.logs)
	}
}

const LogsInstance = new Logs()

export default LogsInstance
