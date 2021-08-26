import { HashMap } from 'zrender/lib/core/util';
import { Source } from '../Source';
import { DimensionDefinitionLoose, OptionSourceData, EncodeDefaulter, OptionEncodeValue, OptionEncode, DimensionName } from '../../util/types';
import DataDimensionInfo from '../DataDimensionInfo';
import List from '../List';
import { CoordDimensionDefinitionLoose } from './createDimensions';
declare function completeDimensions(sysDims: CoordDimensionDefinitionLoose[], source: Source | List | OptionSourceData, opt: {
    dimsDef?: DimensionDefinitionLoose[];
    encodeDef?: HashMap<OptionEncodeValue, DimensionName> | OptionEncode;
    dimCount?: number;
    encodeDefaulter?: EncodeDefaulter;
    generateCoord?: string;
    generateCoordCount?: number;
}): DataDimensionInfo[];
export default completeDimensions;
