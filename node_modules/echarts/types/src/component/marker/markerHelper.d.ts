import SeriesModel from '../../model/Series';
import List from '../../data/List';
import { MarkerStatisticType, MarkerPositionOption } from './MarkerModel';
import Axis from '../../coord/Axis';
import { CoordinateSystem } from '../../coord/CoordinateSystem';
import { ScaleDataValue } from '../../util/types';
interface MarkerAxisInfo {
    valueDataDim: string;
    valueAxis: Axis;
    baseAxis: Axis;
    baseDataDim: string;
}
export declare function dataTransform(seriesModel: SeriesModel, item: MarkerPositionOption): MarkerPositionOption;
export declare function getAxisInfo(item: MarkerPositionOption, data: List, coordSys: CoordinateSystem, seriesModel: SeriesModel): MarkerAxisInfo;
export declare function dataFilter(coordSys: CoordinateSystem & {
    containData?(data: ScaleDataValue[]): boolean;
}, item: MarkerPositionOption): boolean;
export declare function dimValueGetter(item: MarkerPositionOption, dimName: string, dataIndex: number, dimIndex: number): string | number;
export declare function numCalculate(data: List, valueDataDim: string, type: MarkerStatisticType): number;
export {};
