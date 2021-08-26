import BoundingRect from 'zrender/lib/core/BoundingRect';
import Cartesian from './Cartesian';
import { ScaleDataValue } from '../../util/types';
import Axis2D from './Axis2D';
import { CoordinateSystem } from '../CoordinateSystem';
import GridModel from './GridModel';
import Grid from './Grid';
export declare const cartesian2DDimensions: string[];
declare class Cartesian2D extends Cartesian<Axis2D> implements CoordinateSystem {
    readonly type = "cartesian2d";
    readonly dimensions: string[];
    model: GridModel;
    master: Grid;
    private _transform;
    private _invTransform;
    calcAffineTransform(): void;
    getBaseAxis(): Axis2D;
    containPoint(point: number[]): boolean;
    containData(data: ScaleDataValue[]): boolean;
    dataToPoint(data: ScaleDataValue[], reserved?: unknown, out?: number[]): number[];
    clampData(data: ScaleDataValue[], out?: number[]): number[];
    pointToData(point: number[], out?: number[]): number[];
    getOtherAxis(axis: Axis2D): Axis2D;
    getArea(): Cartesian2DArea;
}
interface Cartesian2DArea extends BoundingRect {
}
export default Cartesian2D;
