import Scale from './Scale';
import OrdinalMeta from '../data/OrdinalMeta';
import List from '../data/List';
import { OrdinalRawValue, OrdinalNumber, DimensionLoose, OrdinalSortInfo, OrdinalScaleTick, ScaleTick } from '../util/types';
import { AxisBaseOption } from '../coord/axisCommonTypes';
declare type OrdinalScaleSetting = {
    ordinalMeta?: OrdinalMeta | AxisBaseOption['data'];
    extent?: [number, number];
};
declare class OrdinalScale extends Scale<OrdinalScaleSetting> {
    static type: string;
    readonly type = "ordinal";
    private _ordinalMeta;
    private _ordinalNumbersByTick;
    private _ticksByOrdinalNumber;
    constructor(setting?: OrdinalScaleSetting);
    parse(val: OrdinalRawValue | OrdinalNumber): OrdinalNumber;
    contain(rank: OrdinalRawValue | OrdinalNumber): boolean;
    normalize(val: OrdinalRawValue | OrdinalNumber): number;
    scale(val: number): OrdinalNumber;
    getTicks(): OrdinalScaleTick[];
    getMinorTicks(splitNumber: number): number[][];
    setSortInfo(info: OrdinalSortInfo): void;
    private _getTickNumber;
    getRawOrdinalNumber(tickNumber: number): OrdinalNumber;
    getLabel(tick: ScaleTick): string;
    count(): number;
    unionExtentFromData(data: List, dim: DimensionLoose): void;
    isInExtentRange(value: OrdinalNumber): boolean;
    getOrdinalMeta(): OrdinalMeta;
    niceTicks(): void;
    niceExtent(): void;
}
export default OrdinalScale;
