import { Source } from '../Source';
import { DimensionName, OptionEncode, DimensionIndex, SeriesEncodableModel } from '../../util/types';
import { DatasetModel } from '../../component/dataset/install';
import SeriesModel from '../../model/Series';
import GlobalModel from '../../model/Global';
import { CoordDimensionDefinition } from './createDimensions';
export declare const BE_ORDINAL: {
    Must: number;
    Might: number;
    Not: number;
};
declare type BeOrdinalValue = (typeof BE_ORDINAL)[keyof typeof BE_ORDINAL];
declare type SeriesEncodeInternal = {
    [key in keyof OptionEncode]: DimensionIndex[];
};
export declare function resetSourceDefaulter(ecModel: GlobalModel): void;
export declare function makeSeriesEncodeForAxisCoordSys(coordDimensions: (DimensionName | CoordDimensionDefinition)[], seriesModel: SeriesModel, source: Source): SeriesEncodeInternal;
export declare function makeSeriesEncodeForNameBased(seriesModel: SeriesModel, source: Source, dimCount: number): SeriesEncodeInternal;
export declare function querySeriesUpstreamDatasetModel(seriesModel: SeriesEncodableModel): DatasetModel;
export declare function queryDatasetUpstreamDatasetModels(datasetModel: DatasetModel): DatasetModel[];
export declare function guessOrdinal(source: Source, dimIndex: DimensionIndex): BeOrdinalValue;
export {};
