import Axis from '../Axis';
import { DimensionName, OrdinalSortInfo } from '../../util/types';
import Scale from '../../scale/Scale';
import CartesianAxisModel, { CartesianAxisPosition } from './AxisModel';
import Grid from './Grid';
import { OptionAxisType } from '../axisCommonTypes';
interface Axis2D {
    toLocalCoord(coord: number): number;
    toGlobalCoord(coord: number): number;
}
declare class Axis2D extends Axis {
    readonly position: CartesianAxisPosition;
    index: number;
    model: CartesianAxisModel;
    grid: Grid;
    constructor(dim: DimensionName, scale: Scale, coordExtent: [number, number], axisType?: OptionAxisType, position?: CartesianAxisPosition);
    getAxesOnZeroOf: () => Axis2D[];
    isHorizontal(): boolean;
    getGlobalExtent(asc?: boolean): [number, number];
    pointToData(point: number[], clamp?: boolean): number;
    setCategorySortInfo(info: OrdinalSortInfo): boolean;
}
export default Axis2D;
