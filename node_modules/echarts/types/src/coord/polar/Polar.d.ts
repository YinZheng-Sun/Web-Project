import RadiusAxis from './RadiusAxis';
import AngleAxis from './AngleAxis';
import PolarModel from './PolarModel';
import { CoordinateSystem, CoordinateSystemMaster, CoordinateSystemClipArea } from '../CoordinateSystem';
import GlobalModel from '../../model/Global';
import { ParsedModelFinder } from '../../util/model';
import { ScaleDataValue } from '../../util/types';
import ExtensionAPI from '../../core/ExtensionAPI';
interface Polar {
    update(ecModel: GlobalModel, api: ExtensionAPI): void;
}
declare class Polar implements CoordinateSystem, CoordinateSystemMaster {
    readonly name: string;
    readonly dimensions: string[];
    readonly type = "polar";
    cx: number;
    cy: number;
    private _radiusAxis;
    private _angleAxis;
    axisPointerEnabled: boolean;
    model: PolarModel;
    constructor(name: string);
    containPoint(point: number[]): boolean;
    containData(data: number[]): boolean;
    getAxis(dim: 'radius' | 'angle'): AngleAxis | RadiusAxis;
    getAxes(): (AngleAxis | RadiusAxis)[];
    getAxesByScale(scaleType: 'ordinal' | 'interval' | 'time' | 'log'): (AngleAxis | RadiusAxis)[];
    getAngleAxis(): AngleAxis;
    getRadiusAxis(): RadiusAxis;
    getOtherAxis(axis: AngleAxis | RadiusAxis): AngleAxis | RadiusAxis;
    getBaseAxis(): AngleAxis | RadiusAxis;
    getTooltipAxes(dim: 'radius' | 'angle' | 'auto'): {
        baseAxes: (AngleAxis | RadiusAxis)[];
        otherAxes: (AngleAxis | RadiusAxis)[];
    };
    dataToPoint(data: ScaleDataValue[], clamp?: boolean): number[];
    pointToData(point: number[], clamp?: boolean): number[];
    pointToCoord(point: number[]): number[];
    coordToPoint(coord: number[]): number[];
    getArea(): PolarArea;
    convertToPixel(ecModel: GlobalModel, finder: ParsedModelFinder, value: ScaleDataValue[]): number[];
    convertFromPixel(ecModel: GlobalModel, finder: ParsedModelFinder, pixel: number[]): number[];
}
interface PolarArea extends CoordinateSystemClipArea {
    cx: number;
    cy: number;
    r0: number;
    r: number;
    startAngle: number;
    endAngle: number;
    clockwise: boolean;
}
export default Polar;
