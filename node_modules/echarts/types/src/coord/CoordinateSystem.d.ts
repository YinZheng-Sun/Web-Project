import GlobalModel from '../model/Global';
import { ParsedModelFinder } from '../util/model';
import ExtensionAPI from '../core/ExtensionAPI';
import { DimensionDefinitionLoose, ScaleDataValue, DimensionName } from '../util/types';
import Axis from './Axis';
import { BoundingRect } from '../util/graphic';
import { MatrixArray } from 'zrender/lib/core/matrix';
import ComponentModel from '../model/Component';
import { RectLike } from 'zrender/lib/core/BoundingRect';
import type { PrepareCustomInfo } from '../chart/custom/install';
export interface CoordinateSystemCreator {
    create: (ecModel: GlobalModel, api: ExtensionAPI) => CoordinateSystemMaster[];
    dimensions?: DimensionName[];
    getDimensionsInfo?: () => DimensionDefinitionLoose[];
}
export interface CoordinateSystemMaster {
    dimensions: DimensionName[];
    model?: ComponentModel;
    update?: (ecModel: GlobalModel, api: ExtensionAPI) => void;
    convertToPixel?(ecModel: GlobalModel, finder: ParsedModelFinder, value: ScaleDataValue | ScaleDataValue[]): number | number[];
    convertFromPixel?(ecModel: GlobalModel, finder: ParsedModelFinder, pixelValue: number | number[]): number | number[];
    containPoint(point: number[]): boolean;
    getAxes?: () => Axis[];
    axisPointerEnabled?: boolean;
    getTooltipAxes?: (dim: DimensionName | 'auto') => {
        baseAxes: Axis[];
        otherAxes: Axis[];
    };
    getRect?: () => RectLike;
}
export interface CoordinateSystem {
    type: string;
    master?: CoordinateSystemMaster;
    dimensions: DimensionName[];
    model?: ComponentModel;
    dataToPoint(data: ScaleDataValue | ScaleDataValue[], reserved?: any, out?: number[]): number[];
    pointToData?(point: number[], reserved?: any, out?: number[]): number | number[];
    containPoint(point: number[]): boolean;
    getAxis?: (dim?: DimensionName) => Axis;
    getBaseAxis?: () => Axis;
    getOtherAxis?: (baseAxis: Axis) => Axis;
    clampData?: (data: ScaleDataValue[], out?: number[]) => number[];
    getRoamTransform?: () => MatrixArray;
    getArea?: () => CoordinateSystemClipArea;
    getBoundingRect?: () => BoundingRect;
    getAxesByScale?: (scaleType: string) => Axis[];
    prepareCustoms?: PrepareCustomInfo;
}
export interface CoordinateSystemHostModel extends ComponentModel {
    coordinateSystem?: CoordinateSystemMaster;
}
export interface CoordinateSystemClipArea {
    contain(x: number, y: number): boolean;
}
export declare function isCoordinateSystemType<T extends CoordinateSystem, S = T['type']>(coordSys: CoordinateSystem, type: S): coordSys is T;
