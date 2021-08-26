import ComponentModel from '../../model/Component';
import { ComponentOption, LabelOption, LineStyleOption, CommonTooltipOption, TooltipRenderMode, CallbackDataParams, TooltipOrderMode } from '../../util/types';
import { AxisPointerOption } from '../axisPointer/AxisPointerModel';
declare type TopLevelFormatterParams = CallbackDataParams | CallbackDataParams[];
export interface TooltipOption extends CommonTooltipOption<TopLevelFormatterParams>, ComponentOption {
    mainType?: 'tooltip';
    axisPointer?: AxisPointerOption & {
        axis?: 'auto' | 'x' | 'y' | 'angle' | 'radius';
        crossStyle?: LineStyleOption & {
            textStyle?: LabelOption;
        };
    };
    showContent?: boolean;
    trigger?: 'item' | 'axis' | 'none';
    displayMode?: 'single' | 'multipleByCoordSys';
    renderMode?: 'auto' | TooltipRenderMode;
    appendToBody?: boolean;
    className?: string;
    order?: TooltipOrderMode;
}
declare class TooltipModel extends ComponentModel<TooltipOption> {
    static type: "tooltip";
    type: "tooltip";
    static dependencies: string[];
    static defaultOption: TooltipOption;
}
export default TooltipModel;
