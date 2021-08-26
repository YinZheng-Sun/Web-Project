import Scale from './Scale';
import { ScaleTick, Dictionary } from '../util/types';
declare class IntervalScale<SETTING extends Dictionary<unknown> = Dictionary<unknown>> extends Scale<SETTING> {
    static type: string;
    type: string;
    protected _interval: number;
    protected _niceExtent: [number, number];
    private _intervalPrecision;
    parse(val: number): number;
    contain(val: number): boolean;
    normalize(val: number): number;
    scale(val: number): number;
    setExtent(start: number | string, end: number | string): void;
    unionExtent(other: [number, number]): void;
    getInterval(): number;
    setInterval(interval: number): void;
    getTicks(expandToNicedExtent?: boolean): ScaleTick[];
    getMinorTicks(splitNumber: number): number[][];
    getLabel(data: ScaleTick, opt?: {
        precision?: 'auto' | number;
        pad?: boolean;
    }): string;
    niceTicks(splitNumber?: number, minInterval?: number, maxInterval?: number): void;
    niceExtent(opt: {
        splitNumber: number;
        fixMin?: boolean;
        fixMax?: boolean;
        minInterval?: number;
        maxInterval?: number;
    }): void;
}
export default IntervalScale;
