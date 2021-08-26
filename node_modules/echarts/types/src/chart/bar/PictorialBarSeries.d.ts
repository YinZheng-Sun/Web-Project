import BaseBarSeriesModel, { BaseBarSeriesOption } from './BaseBarSeries';
import { OptionDataValue, ItemStyleOption, SeriesLabelOption, AnimationOptionMixin, SeriesStackOptionMixin, StatesOptionMixin, OptionDataItemObject, DefaultEmphasisFocus } from '../../util/types';
import type Cartesian2D from '../../coord/cartesian/Cartesian2D';
export interface PictorialBarStateOption {
    itemStyle?: ItemStyleOption;
    label?: SeriesLabelOption;
}
interface PictorialBarSeriesSymbolOption {
    symbol?: string;
    symbolSize?: (number | string)[] | number | string;
    symbolRotate?: number;
    symbolPosition?: 'start' | 'end' | 'center';
    symbolOffset?: (number | string)[] | number | string;
    symbolMargin?: (number | string)[] | number | string;
    symbolRepeat?: boolean | number | 'fixed';
    symbolRepeatDirection?: 'start' | 'end';
    symbolClip?: boolean;
    symbolBoundingData?: number | number[];
    symbolPatternSize?: number;
}
interface ExtraStateOption {
    emphasis?: {
        focus?: DefaultEmphasisFocus;
        scale?: boolean;
    };
}
export interface PictorialBarDataItemOption extends PictorialBarSeriesSymbolOption, AnimationOptionMixin, PictorialBarStateOption, StatesOptionMixin<PictorialBarStateOption, ExtraStateOption>, OptionDataItemObject<OptionDataValue> {
    z?: number;
    cursor?: string;
}
export interface PictorialBarSeriesOption extends BaseBarSeriesOption<PictorialBarStateOption, ExtraStateOption>, PictorialBarStateOption, PictorialBarSeriesSymbolOption, SeriesStackOptionMixin {
    type?: 'pictorialBar';
    coordinateSystem?: 'cartesian2d';
    data?: (PictorialBarDataItemOption | OptionDataValue | OptionDataValue[])[];
}
declare class PictorialBarSeriesModel extends BaseBarSeriesModel<PictorialBarSeriesOption> {
    static type: string;
    type: string;
    static dependencies: string[];
    coordinateSystem: Cartesian2D;
    hasSymbolVisual: boolean;
    defaultSymbol: string;
    static defaultOption: PictorialBarSeriesOption;
    getInitialData(option: PictorialBarSeriesOption): import("../../data/List").default<import("../../model/Model").default<any>, import("../../data/List").DefaultDataVisual>;
}
export default PictorialBarSeriesModel;
