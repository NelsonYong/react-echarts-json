export default function useChartSelect({ normal, active, }: {
    normal?: string;
    active?: string;
}): {
    runSelect: ({ id }: {
        [x: string]: any;
        id: string;
    }) => void;
};
