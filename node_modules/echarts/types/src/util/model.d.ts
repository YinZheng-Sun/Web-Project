import { HashMap } from 'zrender/lib/core/util';
import GlobalModel from '../model/Global';
import ComponentModel, { ComponentModelConstructor } from '../model/Component';
import List from '../data/List';
import { ComponentOption, ComponentMainType, ComponentSubType, DisplayStateHostOption, OptionDataItem, OptionDataValue, TooltipRenderMode, Payload, OptionId, InterpolatableValue } from './types';
import SeriesModel from '../model/Series';
import CartesianAxisModel from '../coord/cartesian/AxisModel';
import GridModel from '../coord/cartesian/GridModel';
export declare function normalizeToArray<T>(value?: T | T[]): T[];
export declare function defaultEmphasis(opt: DisplayStateHostOption, key: string, subOpts: string[]): void;
export declare const TEXT_STYLE_OPTIONS: readonly ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
export declare function getDataItemValue(dataItem: OptionDataItem): OptionDataValue | OptionDataValue[];
export declare function isDataItemOption(dataItem: OptionDataItem): boolean;
export interface MappingExistingItem {
    id?: OptionId;
    name?: string;
}
declare type MappingResult<T> = MappingResultItem<T>[];
interface MappingResultItem<T extends MappingExistingItem = MappingExistingItem> {
    existing: T;
    newOption: ComponentOption;
    brandNew: boolean;
    keyInfo: {
        name: string;
        id: string;
        mainType: ComponentMainType;
        subType: ComponentSubType;
    };
}
declare type MappingToExistsMode = 'normalMerge' | 'replaceMerge' | 'replaceAll';
export declare function mappingToExists<T extends MappingExistingItem>(existings: T[], newCmptOptions: ComponentOption[], mode: MappingToExistsMode): MappingResult<T>;
export declare function convertOptionIdName(idOrName: unknown, defaultValue: string): string;
export declare function isNameSpecified(componentModel: ComponentModel): boolean;
export declare function isComponentIdInternal(cmptOption: {
    id?: MappingExistingItem['id'];
}): boolean;
export declare function makeInternalComponentId(idSuffix: string): string;
export declare function setComponentTypeToKeyInfo(mappingResult: MappingResult<MappingExistingItem & {
    subType?: ComponentSubType;
}>, mainType: ComponentMainType, componentModelCtor: ComponentModelConstructor): void;
declare type BatchItem = {
    seriesId: OptionId;
    dataIndex: number | number[];
};
export declare function compressBatches(batchA: BatchItem[], batchB: BatchItem[]): [BatchItem[], BatchItem[]];
export declare function queryDataIndex(data: List, payload: Payload & {
    dataIndexInside?: number | number[];
    dataIndex?: number | number[];
    name?: string | string[];
}): number | number[];
export declare function makeInner<T, Host extends object>(): (hostObj: Host) => T;
export declare type ModelFinderIndexQuery = number | number[] | 'all' | 'none' | false;
export declare type ModelFinderIdQuery = OptionId | OptionId[];
export declare type ModelFinderNameQuery = OptionId | OptionId[];
export declare type ModelFinder = string | ModelFinderObject;
export declare type ModelFinderObject = {
    seriesIndex?: ModelFinderIndexQuery;
    seriesId?: ModelFinderIdQuery;
    seriesName?: ModelFinderNameQuery;
    geoIndex?: ModelFinderIndexQuery;
    geoId?: ModelFinderIdQuery;
    geoName?: ModelFinderNameQuery;
    bmapIndex?: ModelFinderIndexQuery;
    bmapId?: ModelFinderIdQuery;
    bmapName?: ModelFinderNameQuery;
    xAxisIndex?: ModelFinderIndexQuery;
    xAxisId?: ModelFinderIdQuery;
    xAxisName?: ModelFinderNameQuery;
    yAxisIndex?: ModelFinderIndexQuery;
    yAxisId?: ModelFinderIdQuery;
    yAxisName?: ModelFinderNameQuery;
    gridIndex?: ModelFinderIndexQuery;
    gridId?: ModelFinderIdQuery;
    gridName?: ModelFinderNameQuery;
    [key: string]: unknown;
};
export declare type ParsedModelFinder = {
    [key: string]: ComponentModel | ComponentModel[] | undefined;
};
export declare type ParsedModelFinderKnown = ParsedModelFinder & {
    seriesModels?: SeriesModel[];
    seriesModel?: SeriesModel;
    xAxisModels?: CartesianAxisModel[];
    xAxisModel?: CartesianAxisModel;
    yAxisModels?: CartesianAxisModel[];
    yAxisModel?: CartesianAxisModel;
    gridModels?: GridModel[];
    gridModel?: GridModel;
    dataIndex?: number;
    dataIndexInside?: number;
};
export declare function parseFinder(ecModel: GlobalModel, finderInput: ModelFinder, opt?: {
    defaultMainType?: ComponentMainType;
    includeMainTypes?: ComponentMainType[];
    enableAll?: boolean;
    enableNone?: boolean;
}): ParsedModelFinder;
export declare type QueryReferringUserOption = {
    index?: ModelFinderIndexQuery;
    id?: ModelFinderIdQuery;
    name?: ModelFinderNameQuery;
};
export declare const SINGLE_REFERRING: QueryReferringOpt;
export declare const MULTIPLE_REFERRING: QueryReferringOpt;
export declare type QueryReferringOpt = {
    useDefault?: boolean;
    enableAll?: boolean;
    enableNone?: boolean;
};
export declare function queryReferringComponents(ecModel: GlobalModel, mainType: ComponentMainType, userOption: QueryReferringUserOption, opt?: QueryReferringOpt): {
    models: ComponentModel[];
    specified: boolean;
};
export declare function setAttribute(dom: HTMLElement, key: string, value: any): void;
export declare function getAttribute(dom: HTMLElement, key: string): any;
export declare function getTooltipRenderMode(renderModeOption: TooltipRenderMode | 'auto'): TooltipRenderMode;
export declare function groupData<T, R extends string | number>(array: T[], getKey: (item: T) => R): {
    keys: R[];
    buckets: HashMap<T[], R>;
};
export declare function interpolateRawValues(data: List, precision: number | 'auto', sourceValue: InterpolatableValue, targetValue: InterpolatableValue, percent: number): InterpolatableValue;
export {};
