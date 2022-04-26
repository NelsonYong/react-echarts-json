import type React from 'react';
import type { Charts } from './charts';
import type { EChartsOption, EChartsType } from 'echarts/types/dist/echarts';
declare const useInjection: ({ id, name, chart, option, container, }: {
    id?: string | undefined;
    name?: string | undefined;
    option?: EChartsOption | undefined;
    chart?: React.MutableRefObject<EChartsType | undefined> | undefined;
    container?: React.RefObject<HTMLDivElement> | undefined;
}, deps?: React.DependencyList | undefined) => {
    tool: Charts;
};
export default useInjection;
