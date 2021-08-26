import OrdinalMeta from './OrdinalMeta';
import { DataVisualDimensions, DimensionType } from '../util/types';
declare class DataDimensionInfo {
    type?: DimensionType;
    name: string;
    displayName?: string;
    tooltip?: boolean;
    coordDim?: string;
    coordDimIndex?: number;
    index?: number;
    otherDims?: DataVisualDimensions;
    isExtraCoord?: boolean;
    isCalculationCoord?: boolean;
    defaultTooltip?: boolean;
    ordinalMeta?: OrdinalMeta;
    createInvertedIndices?: boolean;
    constructor(opt?: object | DataDimensionInfo);
}
export default DataDimensionInfo;
