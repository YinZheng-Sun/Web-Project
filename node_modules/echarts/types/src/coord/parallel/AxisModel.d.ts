import ComponentModel from '../../model/Component';
import { AxisModelExtendedInCreator } from '../axisModelCreator';
import { AxisModelCommonMixin } from '../axisModelCommonMixin';
import ParallelAxis from './ParallelAxis';
import { ZRColor, ParsedValue } from '../../util/types';
import { AxisBaseOption } from '../axisCommonTypes';
import Parallel from './Parallel';
import { PathStyleProps } from 'zrender/lib/graphic/Path';
export declare type ParallelActiveState = 'normal' | 'active' | 'inactive';
export declare type ParallelAxisInterval = number[];
declare type ParallelAreaSelectStyleKey = 'fill' | 'lineWidth' | 'stroke' | 'opacity';
export declare type ParallelAreaSelectStyleProps = Pick<PathStyleProps, ParallelAreaSelectStyleKey> & {
    width: number;
};
export interface ParallelAxisOption extends AxisBaseOption {
    dim?: number | number[];
    parallelIndex?: number;
    areaSelectStyle?: {
        width?: number;
        borderWidth?: number;
        borderColor?: ZRColor;
        color?: ZRColor;
        opacity?: number;
    };
    realtime?: boolean;
}
declare class ParallelAxisModel extends ComponentModel<ParallelAxisOption> {
    static type: 'baseParallelAxis';
    readonly type: "baseParallelAxis";
    axis: ParallelAxis;
    coordinateSystem: Parallel;
    activeIntervals: ParallelAxisInterval[];
    getAreaSelectStyle(): ParallelAreaSelectStyleProps;
    setActiveIntervals(intervals: ParallelAxisInterval[]): void;
    getActiveState(value?: ParsedValue): ParallelActiveState;
}
interface ParallelAxisModel extends AxisModelCommonMixin<ParallelAxisOption>, AxisModelExtendedInCreator<ParallelAxisOption> {
}
export default ParallelAxisModel;
