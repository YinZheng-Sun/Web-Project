import SeriesModel from '../../model/Series';
import List from '../../data/List';
import * as zrUtil from 'zrender/lib/core/util';
import { SeriesOption, SeriesOnSingleOptionMixin, OptionDataValueDate, OptionDataValueNumeric, ItemStyleOption, BoxLayoutOptionMixin, ZRColor, SeriesLabelOption } from '../../util/types';
import SingleAxis from '../../coord/single/SingleAxis';
import GlobalModel from '../../model/Global';
import Single from '../../coord/single/Single';
interface ThemeRiverSeriesLabelOption extends SeriesLabelOption {
    margin?: number;
}
declare type ThemerRiverDataItem = [OptionDataValueDate, OptionDataValueNumeric, string];
export interface ThemeRiverStateOption {
    label?: ThemeRiverSeriesLabelOption;
    itemStyle?: ItemStyleOption;
}
export interface ThemeRiverSeriesOption extends SeriesOption<ThemeRiverStateOption>, ThemeRiverStateOption, SeriesOnSingleOptionMixin, BoxLayoutOptionMixin {
    type?: 'themeRiver';
    color?: ZRColor[];
    coordinateSystem?: 'singleAxis';
    boundaryGap?: (string | number)[];
    data?: ThemerRiverDataItem[];
}
declare class ThemeRiverSeriesModel extends SeriesModel<ThemeRiverSeriesOption> {
    static readonly type = "series.themeRiver";
    readonly type = "series.themeRiver";
    static readonly dependencies: string[];
    nameMap: zrUtil.HashMap<number, string>;
    coordinateSystem: Single;
    useColorPaletteOnData: boolean;
    init(option: ThemeRiverSeriesOption): void;
    fixData(data: ThemeRiverSeriesOption['data']): ThemerRiverDataItem[];
    getInitialData(option: ThemeRiverSeriesOption, ecModel: GlobalModel): List;
    getLayerSeries(): {
        name: string;
        indices: number[];
    }[];
    getAxisTooltipData(dim: string | string[], value: number, baseAxis: SingleAxis): {
        dataIndices: number[];
        nestestValue: number;
    };
    formatTooltip(dataIndex: number, multipleSeries: boolean, dataType: string): import("../../component/tooltip/tooltipMarkup").TooltipMarkupNameValueBlock;
    static defaultOption: ThemeRiverSeriesOption;
}
export default ThemeRiverSeriesModel;
