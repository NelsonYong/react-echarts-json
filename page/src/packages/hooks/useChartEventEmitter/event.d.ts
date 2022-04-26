declare type SubscriptionParams<T = any> = {
    params: T;
    event: string | number;
};
declare type Subscription<T> = ({ params, event }: SubscriptionParams<T>) => void;
declare class EventEmitter<T> {
    private subscriptions;
    private emitEffectCache;
    constructor();
    useSubscription: (event: string, listener?: Subscription<T> | undefined) => void;
    emit: (event: string | number, ...args: T extends any[] ? any[] : any) => void;
    emitEffect: (event: string | number) => void;
    removeListener: (event: string) => void;
    clear: () => void;
}
declare const eventEmitterOverall: EventEmitter<unknown>;
export { EventEmitter, eventEmitterOverall };
