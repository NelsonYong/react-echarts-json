declare type Log = {
    id?: string;
    name?: string;
    type?: 'add' | 'updata' | 'delete';
};
declare type ControllableUpdate = {
    previewValue?: any;
    currentValue?: any;
    depsViewId?: string;
    depsViewName?: string;
    namespace?: (string | null)[];
};
declare type UncontrollableDepsUpdata = {
    previewValue?: any;
    currentValue?: any;
    namespace?: (string | null)[];
};
export declare type LogType = Partial<Log> & Partial<ControllableUpdate> & Partial<UncontrollableDepsUpdata> & Record<string | number, any>;
export declare class Logs {
    private logs;
    updata(params: Pick<Log, 'id' | 'name'> & ControllableUpdate & Record<string, any>): void;
    depsUpdata(params: Pick<Log, 'id' | 'name'> & UncontrollableDepsUpdata): void;
    getList(): LogType[];
}
declare const LogsInstance: Logs;
export default LogsInstance;
