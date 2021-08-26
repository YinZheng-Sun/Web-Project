import DataZoomModel, { DataZoomOption } from './DataZoomModel';
import { BoxLayoutOptionMixin, ZRColor, LineStyleOption, AreaStyleOption, ItemStyleOption, LabelOption } from '../../util/types';
export interface SliderDataZoomOption extends DataZoomOption, BoxLayoutOptionMixin {
    show?: boolean;
    backgroundColor?: ZRColor;
    borderColor?: ZRColor;
    borderRadius?: number | number[];
    dataBackground?: {
        lineStyle?: LineStyleOption;
        areaStyle?: AreaStyleOption;
    };
    selectedDataBackground?: {
        lineStyle?: LineStyleOption;
        areaStyle?: AreaStyleOption;
    };
    fillerColor?: ZRColor;
    handleIcon?: string;
    handleSize?: string | number;
    handleStyle?: ItemStyleOption;
    moveHandleIcon?: string;
    moveHandleStyle?: ItemStyleOption;
    moveHandleSize?: number;
    labelPrecision?: number | 'auto';
    labelFormatter?: string | ((value: number, valueStr: string) => string);
    showDetail?: boolean;
    showDataShadow?: 'auto' | boolean;
    zoomLock?: boolean;
    textStyle?: LabelOption;
    brushSelect?: boolean;
    brushStyle?: ItemStyleOption;
    emphasis?: {
        handleStyle?: ItemStyleOption;
        moveHandleStyle?: ItemStyleOption;
    };
}
declare class SliderZoomModel extends DataZoomModel<SliderDataZoomOption> {
    static readonly type = "dataZoom.slider";
    type: string;
    static readonly layoutMode = "box";
    static defaultOption: SliderDataZoomOption;
}
export default SliderZoomModel;
