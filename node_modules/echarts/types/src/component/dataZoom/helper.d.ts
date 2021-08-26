import { Payload } from '../../util/types';
import GlobalModel from '../../model/Global';
import DataZoomModel from './DataZoomModel';
import { HashMap } from 'zrender/lib/core/util';
import SeriesModel from '../../model/Series';
import { CoordinateSystemHostModel } from '../../coord/CoordinateSystem';
import { AxisBaseModel } from '../../coord/AxisBaseModel';
export interface DataZoomPayloadBatchItem {
    dataZoomId: string;
    start?: number;
    end?: number;
    startValue?: number;
    endValue?: number;
}
export interface DataZoomReferCoordSysInfo {
    model: CoordinateSystemHostModel;
    axisModels: AxisBaseModel[];
}
export declare const DATA_ZOOM_AXIS_DIMENSIONS: readonly ["x", "y", "radius", "angle", "single"];
export declare type DataZoomAxisDimension = 'x' | 'y' | 'radius' | 'angle' | 'single';
declare type DataZoomAxisMainType = 'xAxis' | 'yAxis' | 'radiusAxis' | 'angleAxis' | 'singleAxis';
declare type DataZoomAxisIndexPropName = 'xAxisIndex' | 'yAxisIndex' | 'radiusAxisIndex' | 'angleAxisIndex' | 'singleAxisIndex';
declare type DataZoomAxisIdPropName = 'xAxisId' | 'yAxisId' | 'radiusAxisId' | 'angleAxisId' | 'singleAxisId';
export declare type DataZoomCoordSysMainType = 'polar' | 'grid' | 'singleAxis';
export declare function isCoordSupported(seriesModel: SeriesModel): boolean;
export declare function getAxisMainType(axisDim: DataZoomAxisDimension): DataZoomAxisMainType;
export declare function getAxisIndexPropName(axisDim: DataZoomAxisDimension): DataZoomAxisIndexPropName;
export declare function getAxisIdPropName(axisDim: DataZoomAxisDimension): DataZoomAxisIdPropName;
export declare function findEffectedDataZooms(ecModel: GlobalModel, payload: Payload): DataZoomModel[];
export declare function collectReferCoordSysModelInfo(dataZoomModel: DataZoomModel): {
    infoList: DataZoomReferCoordSysInfo[];
    infoMap: HashMap<DataZoomReferCoordSysInfo, string>;
};
export {};
