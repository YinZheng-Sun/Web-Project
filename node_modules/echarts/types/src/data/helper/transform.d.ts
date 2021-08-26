import { DimensionDefinitionLoose, SourceFormat, DimensionDefinition, DimensionIndex, OptionDataValue, DimensionLoose, ParsedValue, OptionSourceDataObjectRows, OptionSourceDataArrayRows } from '../../util/types';
import { Source } from '../Source';
export declare type PipedDataTransformOption = DataTransformOption[];
export declare type DataTransformType = string;
export declare type DataTransformConfig = unknown;
export interface DataTransformOption {
    type: DataTransformType;
    config: DataTransformConfig;
    print?: boolean;
}
export interface ExternalDataTransform<TO extends DataTransformOption = DataTransformOption> {
    type: string;
    __isBuiltIn?: boolean;
    transform: (param: ExternalDataTransformParam<TO>) => ExternalDataTransformResultItem | ExternalDataTransformResultItem[];
}
interface ExternalDataTransformParam<TO extends DataTransformOption = DataTransformOption> {
    upstream: ExternalSource;
    upstreamList: ExternalSource[];
    config: TO['config'];
}
export interface ExternalDataTransformResultItem {
    data: OptionSourceDataArrayRows | OptionSourceDataObjectRows;
    dimensions?: DimensionDefinitionLoose[];
}
export declare type DataTransformDataItem = ExternalDataTransformResultItem['data'][number];
export interface ExternalDimensionDefinition extends Partial<DimensionDefinition> {
    index: DimensionIndex;
}
export declare class ExternalSource {
    sourceFormat: SourceFormat;
    getRawData(): Source['data'];
    getRawDataItem(dataIndex: number): DataTransformDataItem;
    cloneRawData(): Source['data'];
    getDimensionInfo(dim: DimensionLoose): ExternalDimensionDefinition;
    cloneAllDimensionInfo(): ExternalDimensionDefinition[];
    count(): number;
    retrieveValue(dataIndex: number, dimIndex: DimensionIndex): OptionDataValue;
    retrieveValueFromItem(dataItem: DataTransformDataItem, dimIndex: DimensionIndex): OptionDataValue;
    convertValue(rawVal: unknown, dimInfo: ExternalDimensionDefinition): ParsedValue;
}
export declare function registerExternalTransform(externalTransform: ExternalDataTransform): void;
export declare function applyDataTransform(rawTransOption: DataTransformOption | PipedDataTransformOption, sourceList: Source[], infoForPrint: {
    datasetIndex: number;
}): Source[];
export {};
