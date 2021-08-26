import * as graphic from '../../util/graphic';
import { AxisBaseModel } from '../../coord/AxisBaseModel';
declare type AxisIndexKey = 'xAxisIndex' | 'yAxisIndex' | 'radiusAxisIndex' | 'angleAxisIndex' | 'singleAxisIndex';
declare type AxisEventData = {
    componentType: string;
    componentIndex: number;
    targetType: 'axisName' | 'axisLabel';
    name?: string;
    value?: string | number;
} & {
    [key in AxisIndexKey]?: number;
};
export interface AxisBuilderCfg {
    position?: number[];
    rotation?: number;
    nameDirection?: number;
    tickDirection?: number;
    labelDirection?: number;
    labelOffset?: number;
    axisLabelShow?: boolean;
    axisName?: string;
    axisNameAvailableWidth?: number;
    labelRotate?: number;
    strokeContainThreshold?: number;
    nameTruncateMaxWidth?: number;
    silent?: boolean;
    handleAutoShown?(elementType: 'axisLine' | 'axisTick'): boolean;
}
declare class AxisBuilder {
    axisModel: AxisBaseModel;
    opt: AxisBuilderCfg;
    readonly group: graphic.Group;
    private _transformGroup;
    constructor(axisModel: AxisBaseModel, opt?: AxisBuilderCfg);
    hasBuilder(name: keyof typeof builders): boolean;
    add(name: keyof typeof builders): void;
    getGroup(): graphic.Group;
    static innerTextLayout(axisRotation: number, textRotation: number, direction: number): {
        rotation: number;
        textAlign: import("zrender/lib/core/types").TextAlign;
        textVerticalAlign: import("zrender/lib/core/types").TextVerticalAlign;
    };
    static makeAxisEventDataBase(axisModel: AxisBaseModel): AxisEventData;
    static isLabelSilent(axisModel: AxisBaseModel): boolean;
}
interface AxisElementsBuilder {
    (opt: AxisBuilderCfg, axisModel: AxisBaseModel, group: graphic.Group, transformGroup: graphic.Group): void;
}
declare const builders: Record<'axisLine' | 'axisTickLabel' | 'axisName', AxisElementsBuilder>;
export default AxisBuilder;
