import { createAxisLabels, calculateCategoryInterval } from './axisTickLabelBuilder';
import Scale from '../scale/Scale';
import { DimensionName, ScaleDataValue, ScaleTick } from '../util/types';
import Model from '../model/Model';
import { AxisBaseOption, OptionAxisType } from './axisCommonTypes';
import { AxisBaseModel } from './AxisBaseModel';
interface TickCoord {
    coord: number;
    tickValue?: ScaleTick['value'];
}
declare class Axis {
    type: OptionAxisType;
    readonly dim: DimensionName;
    scale: Scale;
    private _extent;
    model: AxisBaseModel;
    onBand: AxisBaseOption['boundaryGap'];
    inverse: AxisBaseOption['inverse'];
    constructor(dim: DimensionName, scale: Scale, extent: [number, number]);
    contain(coord: number): boolean;
    containData(data: ScaleDataValue): boolean;
    getExtent(): [number, number];
    getPixelPrecision(dataExtent?: [number, number]): number;
    setExtent(start: number, end: number): void;
    dataToCoord(data: ScaleDataValue, clamp?: boolean): number;
    coordToData(coord: number, clamp?: boolean): number;
    pointToData(point: number[], clamp?: boolean): number;
    getTicksCoords(opt?: {
        tickModel?: Model;
        clamp?: boolean;
    }): TickCoord[];
    getMinorTicksCoords(): TickCoord[][];
    getViewLabels(): ReturnType<typeof createAxisLabels>['labels'];
    getLabelModel(): Model<AxisBaseOption['axisLabel']>;
    getTickModel(): Model;
    getBandWidth(): number;
    getRotate: () => number;
    calculateCategoryInterval(): ReturnType<typeof calculateCategoryInterval>;
}
export default Axis;
