import Scale from '../scale/Scale';
import { AxisBaseModel } from './AxisBaseModel';
import { ScaleDataValue } from '../util/types';
export interface ScaleRawExtentResult {
    readonly min: number;
    readonly max: number;
    readonly minFixed: boolean;
    readonly maxFixed: boolean;
    readonly isBlank: boolean;
}
export declare class ScaleRawExtentInfo {
    private _needCrossZero;
    private _isOrdinal;
    private _axisDataLen;
    private _boundaryGapInner;
    private _modelMinRaw;
    private _modelMaxRaw;
    private _modelMinNum;
    private _modelMaxNum;
    private _dataMin;
    private _dataMax;
    private _determinedMin;
    private _determinedMax;
    readonly frozen: boolean;
    constructor(scale: Scale, model: AxisBaseModel, originalExtent: number[]);
    private _prepareParams;
    calculate(): ScaleRawExtentResult;
    modifyDataMinMax(minMaxName: 'min' | 'max', val: number): void;
    setDeterminedMinMax(minMaxName: 'min' | 'max', val: number): void;
    freeze(): void;
}
export declare function ensureScaleRawExtentInfo(scale: Scale, model: AxisBaseModel, originalExtent: number[]): ScaleRawExtentInfo;
export declare function parseAxisModelMinMax(scale: Scale, minMax: ScaleDataValue): number;
