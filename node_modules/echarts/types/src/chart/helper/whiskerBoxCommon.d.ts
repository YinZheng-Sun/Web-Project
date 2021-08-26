import type { SeriesOption, SeriesOnCartesianOptionMixin, LayoutOrient } from '../../util/types';
import type GlobalModel from '../../model/Global';
import type SeriesModel from '../../model/Series';
import type List from '../../data/List';
import type Axis2D from '../../coord/cartesian/Axis2D';
import { CoordDimensionDefinition } from '../../data/helper/createDimensions';
interface CommonOption extends SeriesOption, SeriesOnCartesianOptionMixin {
    layout?: LayoutOrient;
}
interface WhiskerBoxCommonMixin<Opts extends CommonOption> extends SeriesModel<Opts> {
}
declare class WhiskerBoxCommonMixin<Opts extends CommonOption> {
    _baseAxisDim: string;
    defaultValueDimensions: CoordDimensionDefinition['dimsDef'];
    getInitialData(option: Opts, ecModel: GlobalModel): List;
    getBaseAxis(): Axis2D;
}
export { WhiskerBoxCommonMixin };
