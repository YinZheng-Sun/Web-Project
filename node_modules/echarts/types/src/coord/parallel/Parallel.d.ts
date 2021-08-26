import * as matrix from 'zrender/lib/core/matrix';
import ParallelAxis from './ParallelAxis';
import * as graphic from '../../util/graphic';
import ParallelModel from './ParallelModel';
import GlobalModel from '../../model/Global';
import ExtensionAPI from '../../core/ExtensionAPI';
import { DimensionName, ScaleDataValue } from '../../util/types';
import { CoordinateSystem, CoordinateSystemMaster } from '../CoordinateSystem';
import { ParallelActiveState } from './AxisModel';
import List from '../../data/List';
export interface ParallelAxisLayoutInfo {
    position: number[];
    rotation: number;
    transform: matrix.MatrixArray;
    axisNameAvailableWidth: number;
    axisLabelShow: boolean;
    nameTruncateMaxWidth: number;
    tickDirection: -1 | 1;
    labelDirection: -1 | 1;
}
declare type SlidedAxisExpandBehavior = 'none' | 'slide' | 'jump';
declare class Parallel implements CoordinateSystemMaster, CoordinateSystem {
    readonly type = "parallel";
    private _axesMap;
    private _axesLayout;
    readonly dimensions: ParallelModel['dimensions'];
    private _rect;
    private _model;
    name: string;
    model: ParallelModel;
    constructor(parallelModel: ParallelModel, ecModel: GlobalModel, api: ExtensionAPI);
    private _init;
    update(ecModel: GlobalModel, api: ExtensionAPI): void;
    containPoint(point: number[]): boolean;
    getModel(): ParallelModel;
    private _updateAxesFromSeries;
    resize(parallelModel: ParallelModel, api: ExtensionAPI): void;
    getRect(): graphic.BoundingRect;
    private _makeLayoutInfo;
    private _layoutAxes;
    getAxis(dim: DimensionName): ParallelAxis;
    dataToPoint(value: ScaleDataValue, dim: DimensionName): number[];
    eachActiveState(data: List, callback: (activeState: ParallelActiveState, dataIndex: number) => void, start?: number, end?: number): void;
    hasAxisBrushed(): boolean;
    axisCoordToPoint(coord: number, dim: DimensionName): number[];
    getAxisLayout(dim: DimensionName): ParallelAxisLayoutInfo;
    getSlidedAxisExpandWindow(point: number[]): {
        axisExpandWindow: number[];
        behavior: SlidedAxisExpandBehavior;
    };
}
export default Parallel;
