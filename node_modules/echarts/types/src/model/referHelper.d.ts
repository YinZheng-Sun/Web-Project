import { HashMap } from 'zrender/lib/core/util';
import SeriesModel from './Series';
import type { AxisBaseModel } from '../coord/AxisBaseModel';
declare class CoordSysInfo {
    coordSysName: string;
    coordSysDims: string[];
    axisMap: HashMap<AxisBaseModel<import("../coord/axisCommonTypes").AxisBaseOption>, string | number>;
    categoryAxisMap: HashMap<AxisBaseModel<import("../coord/axisCommonTypes").AxisBaseOption>, string | number>;
    firstCategoryDimIndex: number;
    constructor(coordSysName: string);
}
export declare function getCoordSysInfoBySeries(seriesModel: SeriesModel): CoordSysInfo;
export {};
