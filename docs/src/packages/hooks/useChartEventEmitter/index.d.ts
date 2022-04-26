import { EventEmitter } from './event';
export default function useChartEventEmitter<T = void>(options?: {
    global?: boolean;
}): EventEmitter<T> | EventEmitter<unknown>;
