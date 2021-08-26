import * as clazzUtil from '../util/clazz';
import { Dictionary } from 'zrender/lib/core/types';
import List from '../data/List';
import { DimensionName, ScaleDataValue, OptionDataValue, DimensionLoose, ScaleTick } from '../util/types';
import { ScaleRawExtentInfo } from '../coord/scaleRawExtentInfo';
declare abstract class Scale<SETTING extends Dictionary<unknown> = Dictionary<unknown>> {
    type: string;
    private _setting;
    protected _extent: [number, number];
    private _isBlank;
    readonly rawExtentInfo: ScaleRawExtentInfo;
    constructor(setting?: SETTING);
    getSetting<KEY extends keyof SETTING>(name: KEY): SETTING[KEY];
    abstract parse(val: OptionDataValue): number;
    abstract contain(val: ScaleDataValue): boolean;
    abstract normalize(val: ScaleDataValue): number;
    abstract scale(val: number): number;
    unionExtent(other: [number, number]): void;
    unionExtentFromData(data: List, dim: DimensionName | DimensionLoose): void;
    getExtent(): [number, number];
    setExtent(start: number, end: number): void;
    isInExtentRange(value: number): boolean;
    isBlank(): boolean;
    setBlank(isBlank: boolean): void;
    abstract niceTicks(splitNumber?: number, minInterval?: number, maxInterval?: number): void;
    abstract niceExtent(opt?: {
        splitNumber?: number;
        fixMin?: boolean;
        fixMax?: boolean;
        minInterval?: number;
        maxInterval?: number;
    }): void;
    abstract getLabel(tick: ScaleTick): string;
    abstract getTicks(expandToNicedExtent?: boolean): ScaleTick[];
    abstract getMinorTicks(splitNumber: number): number[][];
    static registerClass: clazzUtil.ClassManager['registerClass'];
    static getClass: clazzUtil.ClassManager['getClass'];
}
export default Scale;
