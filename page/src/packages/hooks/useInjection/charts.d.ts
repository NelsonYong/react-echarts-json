/**
 * 图表类
 */
import { EChartsOption, EChartsType } from 'echarts/types/dist/echarts';
export declare type ControlType = {
    id?: string;
    chart?: EChartsType;
    option?: EChartsOption;
    title?: string;
    container?: HTMLDivElement | null;
};
export declare class Charts {
    private chartsEmitters;
    add: ({ id, chart, option, title, container }: ControlType) => void;
    get: (id: string) => {
        chart: EChartsType;
        option: EChartsOption;
        title?: string | undefined;
        container?: HTMLDivElement | null | undefined;
    } | undefined;
    clear: () => void;
    delete: (id: string) => void;
    list: () => {
        chart?: EChartsType | undefined;
        option?: EChartsOption | undefined;
        title?: string | undefined;
        container?: HTMLDivElement | null | undefined;
        id: string;
    }[];
}
declare const _Charts: Charts;
export default _Charts;
