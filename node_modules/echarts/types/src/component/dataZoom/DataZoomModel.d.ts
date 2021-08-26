import { HashMap } from 'zrender/lib/core/util';
import AxisProxy from './AxisProxy';
import ComponentModel from '../../model/Component';
import { LayoutOrient, ComponentOption, LabelOption } from '../../util/types';
import Model from '../../model/Model';
import GlobalModel from '../../model/Global';
import { AxisBaseModel } from '../../coord/AxisBaseModel';
import { DataZoomAxisDimension } from './helper';
export interface DataZoomOption extends ComponentOption {
    mainType?: 'dataZoom';
    orient?: LayoutOrient;
    xAxisIndex?: number | number[];
    xAxisId?: string | string[];
    yAxisIndex?: number | number[];
    yAxisId?: string | string[];
    radiusAxisIndex?: number | number[];
    radiusAxisId?: string | string[];
    angleAxisIndex?: number | number[];
    angleAxisId?: string | string[];
    singleAxisIndex?: number | number[];
    singleAxisId?: string | string[];
    filterMode?: 'filter' | 'weakFilter' | 'empty' | 'none';
    throttle?: number | null | undefined;
    start?: number;
    end?: number;
    startValue?: number;
    endValue?: number;
    minSpan?: number;
    maxSpan?: number;
    minValueSpan?: number;
    maxValueSpan?: number;
    rangeMode?: ['value' | 'percent', 'value' | 'percent'];
    realtime?: boolean;
    textStyle?: LabelOption;
}
declare type RangeOption = Pick<DataZoomOption, 'start' | 'end' | 'startValue' | 'endValue'>;
export declare type DataZoomExtendedAxisBaseModel = AxisBaseModel & {
    __dzAxisProxy: AxisProxy;
};
declare class DataZoomAxisInfo {
    indexList: number[];
    indexMap: boolean[];
    add(axisCmptIdx: number): void;
}
export declare type DataZoomTargetAxisInfoMap = HashMap<DataZoomAxisInfo, DataZoomAxisDimension>;
declare class DataZoomModel<Opts extends DataZoomOption = DataZoomOption> extends ComponentModel<Opts> {
    static type: string;
    type: string;
    static dependencies: string[];
    static defaultOption: DataZoomOption;
    private _autoThrottle;
    private _orient;
    private _targetAxisInfoMap;
    private _noTarget;
    private _rangePropMode;
    settledOption: Opts;
    init(option: Opts, parentModel: Model, ecModel: GlobalModel): void;
    mergeOption(newOption: Opts): void;
    private _doInit;
    private _resetTarget;
    private _fillSpecifiedTargetAxis;
    private _fillAutoTargetAxisByOrient;
    private _makeAutoOrientByTargetAxis;
    private _setDefaultThrottle;
    private _updateRangeUse;
    noTarget(): boolean;
    getFirstTargetAxisModel(): AxisBaseModel;
    eachTargetAxis<Ctx>(callback: (this: Ctx, axisDim: DataZoomAxisDimension, axisIndex: number) => void, context?: Ctx): void;
    getAxisProxy(axisDim: DataZoomAxisDimension, axisIndex: number): AxisProxy;
    getAxisModel(axisDim: DataZoomAxisDimension, axisIndex: number): AxisBaseModel;
    setRawRange(opt: RangeOption): void;
    setCalculatedRange(opt: RangeOption): void;
    getPercentRange(): number[];
    getValueRange(axisDim: DataZoomAxisDimension, axisIndex: number): number[];
    findRepresentativeAxisProxy(axisModel?: AxisBaseModel): AxisProxy;
    getRangePropMode(): DataZoomModel['_rangePropMode'];
    getOrient(): LayoutOrient;
}
export default DataZoomModel;
