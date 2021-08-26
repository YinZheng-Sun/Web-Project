import GlobalModel from '../../model/Global';
import SeriesModel from '../../model/Series';
import ExtensionAPI from '../../core/ExtensionAPI';
import DataZoomModel from './DataZoomModel';
import { AxisBaseModel } from '../../coord/AxisBaseModel';
import { DataZoomAxisDimension } from './helper';
interface MinMaxSpan {
    minSpan: number;
    maxSpan: number;
    minValueSpan: number;
    maxValueSpan: number;
}
declare class AxisProxy {
    ecModel: GlobalModel;
    private _dimName;
    private _axisIndex;
    private _valueWindow;
    private _percentWindow;
    private _dataExtent;
    private _minMaxSpan;
    private _dataZoomModel;
    constructor(dimName: DataZoomAxisDimension, axisIndex: number, dataZoomModel: DataZoomModel, ecModel: GlobalModel);
    hostedBy(dataZoomModel: DataZoomModel): boolean;
    getDataValueWindow(): [number, number];
    getDataPercentWindow(): [number, number];
    getTargetSeriesModels(): SeriesModel<import("../../util/types").SeriesOption<any, import("../../util/types").DefaultExtraStateOpts>>[];
    getAxisModel(): AxisBaseModel;
    getMinMaxSpan(): MinMaxSpan;
    calculateDataWindow(opt?: {
        start?: number;
        end?: number;
        startValue?: number;
        endValue?: number;
    }): {
        valueWindow: [number, number];
        percentWindow: [number, number];
    };
    reset(dataZoomModel: DataZoomModel): void;
    filterData(dataZoomModel: DataZoomModel, api: ExtensionAPI): void;
    private _updateMinMaxSpan;
    private _setAxisModel;
}
export default AxisProxy;
