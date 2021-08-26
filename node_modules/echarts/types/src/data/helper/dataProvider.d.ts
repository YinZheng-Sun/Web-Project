import { Source } from '../Source';
import { ArrayLike } from 'zrender/lib/core/types';
import { DimensionName, DimensionIndex, OptionSourceData, DimensionIndexLoose, OptionDataItem, OptionDataValue, SourceFormat, SeriesLayoutBy, ParsedValue } from '../../util/types';
import List from '../List';
export interface DataProvider {
    pure?: boolean;
    persistent?: boolean;
    getSource(): Source;
    count(): number;
    getItem(idx: number, out?: OptionDataItem): OptionDataItem;
    fillStorage?(start: number, end: number, out: ArrayLike<ParsedValue>[], extent: number[][]): void;
    appendData?(newData: ArrayLike<OptionDataItem>): void;
    clean?(): void;
}
export interface DefaultDataProvider {
    fillStorage?(start: number, end: number, out: ArrayLike<ParsedValue>[], extent: number[][]): void;
}
export declare class DefaultDataProvider implements DataProvider {
    private _source;
    private _data;
    private _offset;
    private _dimSize;
    pure: boolean;
    persistent: boolean;
    static protoInitialize: void;
    constructor(sourceParam: Source | OptionSourceData, dimSize?: number);
    getSource(): Source;
    count(): number;
    getItem(idx: number, out?: ArrayLike<number>): OptionDataItem;
    appendData(newData: OptionSourceData): void;
    clean(): void;
    private static internalField;
}
declare type RawSourceItemGetter = (rawData: OptionSourceData, startIndex: number, dimsDef: {
    name?: DimensionName;
}[], idx: number) => OptionDataItem;
export declare function getRawSourceItemGetter(sourceFormat: SourceFormat, seriesLayoutBy: SeriesLayoutBy): RawSourceItemGetter;
declare type RawSourceDataCounter = (rawData: OptionSourceData, startIndex: number, dimsDef: {
    name?: DimensionName;
}[]) => number;
export declare function getRawSourceDataCounter(sourceFormat: SourceFormat, seriesLayoutBy: SeriesLayoutBy): RawSourceDataCounter;
declare type RawSourceValueGetter = (dataItem: OptionDataItem, dimIndex: DimensionIndex, dimName: DimensionName) => OptionDataValue | OptionDataItem;
export declare function getRawSourceValueGetter(sourceFormat: SourceFormat): RawSourceValueGetter;
export declare function retrieveRawValue(data: List, dataIndex: number, dim?: DimensionName | DimensionIndexLoose): OptionDataValue | OptionDataItem;
export declare function retrieveRawAttr(data: List, dataIndex: number, attr: string): any;
export {};
