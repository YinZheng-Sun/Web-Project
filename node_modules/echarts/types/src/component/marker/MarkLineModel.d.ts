import MarkerModel, { MarkerOption, MarkerStatisticType, MarkerPositionOption } from './MarkerModel';
import GlobalModel from '../../model/Global';
import { LineStyleOption, SeriesLineLabelOption, SymbolOptionMixin, ItemStyleOption, StatesOptionMixin } from '../../util/types';
interface MarkLineStateOption {
    lineStyle?: LineStyleOption;
    itemStyle?: ItemStyleOption;
    label?: SeriesLineLabelOption;
}
interface MarkLineDataItemOptionBase extends MarkLineStateOption, StatesOptionMixin<MarkLineStateOption> {
    name?: string;
}
export interface MarkLine1DDataItemOption extends MarkLineDataItemOptionBase {
    xAxis?: number;
    yAxis?: number;
    type?: MarkerStatisticType;
    valueIndex?: number;
    valueDim?: string;
    symbol?: string[] | string;
    symbolSize?: number[] | number;
}
interface MarkLine2DDataItemDimOption extends MarkLineDataItemOptionBase, SymbolOptionMixin, MarkerPositionOption {
}
export declare type MarkLine2DDataItemOption = [
    MarkLine2DDataItemDimOption,
    MarkLine2DDataItemDimOption
];
export interface MarkLineOption extends MarkerOption, MarkLineStateOption, StatesOptionMixin<MarkLineStateOption> {
    mainType?: 'markLine';
    symbol?: string[] | string;
    symbolSize?: number[] | number;
    precision?: number;
    data?: (MarkLine1DDataItemOption | MarkLine2DDataItemOption)[];
}
declare class MarkLineModel extends MarkerModel<MarkLineOption> {
    static type: string;
    type: string;
    createMarkerModelFromSeries(markerOpt: MarkLineOption, masterMarkerModel: MarkLineModel, ecModel: GlobalModel): MarkLineModel;
    static defaultOption: MarkLineOption;
}
export default MarkLineModel;
