/// <reference types="react" />
import { ControlType } from '../../hooks/useInjection/charts';
declare const OptionView: ({ id, name, chart, option, darkMode, }: ControlType & {
    darkMode?: boolean | undefined;
}) => JSX.Element;
export default OptionView;
