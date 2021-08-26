import { LayoutRect } from '../../util/layout';
import Cartesian2D from './Cartesian2D';
import Axis2D from './Axis2D';
import { ParsedModelFinder } from '../../util/model';
import GridModel from './GridModel';
import GlobalModel from '../../model/Global';
import ExtensionAPI from '../../core/ExtensionAPI';
import { CoordinateSystemMaster } from '../CoordinateSystem';
import { ScaleDataValue } from '../../util/types';
declare type Cartesian2DDimensionName = 'x' | 'y';
declare type FinderAxisIndex = {
    xAxisIndex?: number;
    yAxisIndex?: number;
};
declare class Grid implements CoordinateSystemMaster {
    readonly type: string;
    private _coordsMap;
    private _coordsList;
    private _axesMap;
    private _axesList;
    private _rect;
    readonly model: GridModel;
    readonly axisPointerEnabled = true;
    name: string;
    static dimensions: string[];
    readonly dimensions: string[];
    constructor(gridModel: GridModel, ecModel: GlobalModel, api: ExtensionAPI);
    getRect(): LayoutRect;
    update(ecModel: GlobalModel, api: ExtensionAPI): void;
    resize(gridModel: GridModel, api: ExtensionAPI, ignoreContainLabel?: boolean): void;
    getAxis(dim: Cartesian2DDimensionName, axisIndex?: number): Axis2D;
    getAxes(): Axis2D[];
    getCartesian(finder: FinderAxisIndex): Cartesian2D;
    getCartesian(xAxisIndex?: number, yAxisIndex?: number): Cartesian2D;
    getCartesians(): Cartesian2D[];
    convertToPixel(ecModel: GlobalModel, finder: ParsedModelFinder, value: ScaleDataValue | ScaleDataValue[]): number | number[];
    convertFromPixel(ecModel: GlobalModel, finder: ParsedModelFinder, value: number | number[]): number | number[];
    private _findConvertTarget;
    containPoint(point: number[]): boolean;
    private _initCartesian;
    private _updateScale;
    getTooltipAxes(dim: Cartesian2DDimensionName | 'auto'): {
        baseAxes: Axis2D[];
        otherAxes: Axis2D[];
    };
    static create(ecModel: GlobalModel, api: ExtensionAPI): Grid[];
}
export default Grid;
