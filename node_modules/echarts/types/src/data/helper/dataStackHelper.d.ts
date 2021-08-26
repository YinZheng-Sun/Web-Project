import DataDimensionInfo from '../DataDimensionInfo';
import SeriesModel from '../../model/Series';
import List, { DataCalculationInfo } from '../List';
import type { SeriesOption, SeriesStackOptionMixin, DimensionName } from '../../util/types';
export declare function enableDataStack(seriesModel: SeriesModel<SeriesOption & SeriesStackOptionMixin>, dimensionInfoList: (DataDimensionInfo | string)[], opt?: {
    stackedCoordDimension?: string;
    byIndex?: boolean;
}): Pick<DataCalculationInfo<unknown>, 'stackedDimension' | 'stackedByDimension' | 'isStackedByIndex' | 'stackedOverDimension' | 'stackResultDimension'>;
export declare function isDimensionStacked(data: List, stackedDim: string): boolean;
export declare function getStackedDimension(data: List, targetDim: string): DimensionName;
