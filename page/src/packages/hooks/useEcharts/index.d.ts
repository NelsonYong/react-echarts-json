/// <reference types="react" />
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
/**
 * 调用 echarts hook
 */
declare function useEcharts(options?: {
    defaultOptions?: EChartsOption;
}): {
    chart: React.MutableRefObject<echarts.ECharts | undefined>;
    container: React.RefObject<HTMLDivElement>;
};
export default useEcharts;
