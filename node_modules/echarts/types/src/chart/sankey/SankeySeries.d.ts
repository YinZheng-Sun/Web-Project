import SeriesModel from '../../model/Series';
import Model from '../../model/Model';
import { SeriesOption, BoxLayoutOptionMixin, OptionDataValue, SeriesLabelOption, ItemStyleOption, LineStyleOption, LayoutOrient, ColorString, StatesOptionMixin, OptionDataItemObject, GraphEdgeItemObject, OptionDataValueNumeric, DefaultEmphasisFocus } from '../../util/types';
import GlobalModel from '../../model/Global';
import List from '../../data/List';
import { LayoutRect } from '../../util/layout';
declare type FocusNodeAdjacency = boolean | 'inEdges' | 'outEdges' | 'allEdges';
export interface SankeyNodeStateOption {
    label?: SeriesLabelOption;
    itemStyle?: ItemStyleOption;
}
export interface SankeyEdgeStateOption {
    lineStyle?: SankeyEdgeStyleOption;
}
interface SankeyBothStateOption extends SankeyNodeStateOption, SankeyEdgeStateOption {
}
interface SankeyEdgeStyleOption extends LineStyleOption {
    curveness?: number;
}
interface ExtraStateOption {
    emphasis?: {
        focus?: DefaultEmphasisFocus | 'adjacency';
    };
}
export interface SankeyNodeItemOption extends SankeyNodeStateOption, StatesOptionMixin<SankeyNodeStateOption, ExtraStateOption>, OptionDataItemObject<OptionDataValue> {
    id?: string;
    localX?: number;
    localY?: number;
    depth?: number;
    draggable?: boolean;
    focusNodeAdjacency?: FocusNodeAdjacency;
}
export interface SankeyEdgeItemOption extends SankeyEdgeStateOption, StatesOptionMixin<SankeyEdgeStateOption, ExtraStateOption>, GraphEdgeItemObject<OptionDataValueNumeric> {
    focusNodeAdjacency?: FocusNodeAdjacency;
}
export interface SankeyLevelOption extends SankeyNodeStateOption, SankeyEdgeStateOption {
    depth: number;
}
export interface SankeySeriesOption extends SeriesOption<SankeyBothStateOption, ExtraStateOption>, SankeyBothStateOption, BoxLayoutOptionMixin {
    type?: 'sankey';
    color?: ColorString[];
    coordinateSystem?: 'view';
    orient?: LayoutOrient;
    nodeWidth?: number;
    nodeGap?: number;
    draggable?: boolean;
    focusNodeAdjacency?: FocusNodeAdjacency;
    layoutIterations?: number;
    nodeAlign?: 'justify' | 'left' | 'right';
    data?: SankeyNodeItemOption[];
    nodes?: SankeyNodeItemOption[];
    edges?: SankeyEdgeItemOption[];
    links?: SankeyEdgeItemOption[];
    levels?: SankeyLevelOption[];
}
declare class SankeySeriesModel extends SeriesModel<SankeySeriesOption> {
    static readonly type = "series.sankey";
    readonly type = "series.sankey";
    levelModels: Model<SankeyLevelOption>[];
    layoutInfo: LayoutRect;
    getInitialData(option: SankeySeriesOption, ecModel: GlobalModel): List<Model<any>, import("../../data/List").DefaultDataVisual>;
    setNodePosition(dataIndex: number, localPosition: number[]): void;
    getGraph(): import("../../data/Graph").default;
    getEdgeData(): List<Model<any>, import("../../data/List").DefaultDataVisual>;
    formatTooltip(dataIndex: number, multipleSeries: boolean, dataType: 'node' | 'edge'): import("../../component/tooltip/tooltipMarkup").TooltipMarkupNameValueBlock;
    optionUpdated(): void;
    getDataParams(dataIndex: number, dataType: 'node' | 'edge'): import("../../util/types").CallbackDataParams;
    static defaultOption: SankeySeriesOption;
}
export default SankeySeriesModel;
