/**
 * 图表类
 */
import { EChartsOption, EChartsType } from 'echarts/types/dist/echarts';
export declare type ControlType = {
    id?: string;
    chart?: EChartsType;
    option?: EChartsOption;
    name?: string;
    container?: HTMLDivElement | null;
};
export declare class Charts {
    private chartsEmitters;
    add: ({ id, chart, option, name, container }: ControlType) => void;
    get: (id: string) => {
        chart: EChartsType;
        option: EChartsOption & Record<string, any>;
        name?: string | undefined;
        container?: HTMLDivElement | null | undefined;
    } | undefined;
    clear: () => void;
    delete: (id: string) => void;
    select: ({ id, normal, active, }: {
        id: string;
        normal?: string | undefined;
        active?: string | undefined;
    }) => void;
    list: () => {
        chart?: EChartsType | undefined;
        option?: (EChartsOption & Record<string, any>) | undefined;
        name?: string | undefined;
        container?: HTMLDivElement | null | undefined;
        id: string;
    }[];
}
declare const _Charts: Charts;
export default _Charts;
