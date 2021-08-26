import SeriesModel from '../../model/Series';
import { SeriesOption, SeriesOnCartesianOptionMixin, SeriesOnPolarOptionMixin, ScaleDataValue, DefaultExtraStateOpts } from '../../util/types';
import GlobalModel from '../../model/Global';
import List from '../../data/List';
export interface BaseBarSeriesOption<StateOption, ExtraStateOption = DefaultExtraStateOpts> extends SeriesOption<StateOption, ExtraStateOption>, SeriesOnCartesianOptionMixin, SeriesOnPolarOptionMixin {
    barMinHeight?: number;
    barMinAngle?: number;
    barMaxWidth?: number;
    barMinWidth?: number;
    barWidth?: number | string;
    barGap?: string | number;
    barCategoryGap?: string | number;
    large?: boolean;
    largeThreshold?: number;
}
declare class BaseBarSeriesModel<Opts extends BaseBarSeriesOption<unknown> = BaseBarSeriesOption<unknown>> extends SeriesModel<Opts> {
    static type: string;
    type: string;
    getInitialData(option: Opts, ecModel: GlobalModel): List;
    getMarkerPosition(value: ScaleDataValue[]): number[];
    static defaultOption: BaseBarSeriesOption<unknown, unknown>;
}
export default BaseBarSeriesModel;
