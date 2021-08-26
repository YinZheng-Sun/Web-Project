import SeriesModel from '../../model/Series';
import { TreeNode } from '../../data/Tree';
import Model from '../../model/Model';
import { SeriesOption, BoxLayoutOptionMixin, ItemStyleOption, LabelOption, RoamOptionMixin, CallbackDataParams, ColorString, StatesOptionMixin, OptionId, OptionName, DecalObject, SeriesLabelOption, DefaultEmphasisFocus } from '../../util/types';
import GlobalModel from '../../model/Global';
import { LayoutRect } from '../../util/layout';
import List from '../../data/List';
declare type TreemapSeriesDataValue = number | number[];
interface BreadcrumbItemStyleOption extends ItemStyleOption {
    textStyle?: LabelOption;
}
interface TreemapSeriesLabelOption extends SeriesLabelOption {
    ellipsis?: boolean;
    formatter?: string | ((params: CallbackDataParams) => string);
}
interface TreemapSeriesItemStyleOption extends ItemStyleOption {
    borderRadius?: number | number[];
    colorAlpha?: number;
    colorSaturation?: number;
    borderColorSaturation?: number;
    gapWidth?: number;
}
interface TreePathInfo {
    name: string;
    dataIndex: number;
    value: TreemapSeriesDataValue;
}
interface TreemapSeriesCallbackDataParams extends CallbackDataParams {
    treePathInfo?: TreePathInfo[];
}
interface ExtraStateOption {
    emphasis?: {
        focus?: DefaultEmphasisFocus | 'descendant' | 'ancestor';
    };
}
export interface TreemapStateOption {
    itemStyle?: TreemapSeriesItemStyleOption;
    label?: TreemapSeriesLabelOption;
    upperLabel?: TreemapSeriesLabelOption;
}
export interface TreemapSeriesVisualOption {
    visualDimension?: number | string;
    colorMappingBy?: 'value' | 'index' | 'id';
    visualMin?: number;
    visualMax?: number;
    colorAlpha?: number[] | 'none';
    colorSaturation?: number[] | 'none';
    visibleMin?: number;
    childrenVisibleMin?: number;
}
export interface TreemapSeriesLevelOption extends TreemapSeriesVisualOption, TreemapStateOption, StatesOptionMixin<TreemapStateOption, ExtraStateOption> {
    color?: ColorString[] | 'none';
    decal?: DecalObject[] | 'none';
}
export interface TreemapSeriesNodeItemOption extends TreemapSeriesVisualOption, TreemapStateOption, StatesOptionMixin<TreemapStateOption, ExtraStateOption> {
    id?: OptionId;
    name?: OptionName;
    value?: TreemapSeriesDataValue;
    children?: TreemapSeriesNodeItemOption[];
    color?: ColorString[] | 'none';
    decal?: DecalObject[] | 'none';
}
export interface TreemapSeriesOption extends SeriesOption<TreemapStateOption, ExtraStateOption>, TreemapStateOption, BoxLayoutOptionMixin, RoamOptionMixin, TreemapSeriesVisualOption {
    type?: 'treemap';
    size?: (number | string)[];
    sort?: boolean | 'asc' | 'desc';
    clipWindow?: 'origin' | 'fullscreen';
    squareRatio?: number;
    leafDepth?: number;
    drillDownIcon?: string;
    zoomToNodeRatio?: number;
    nodeClick?: 'zoomToNode' | 'link';
    breadcrumb?: BoxLayoutOptionMixin & {
        show?: boolean;
        height?: number;
        emptyItemWidth: number;
        itemStyle?: BreadcrumbItemStyleOption;
        emphasis?: {
            itemStyle?: BreadcrumbItemStyleOption;
        };
    };
    levels?: TreemapSeriesLevelOption[];
    data?: TreemapSeriesNodeItemOption[];
}
declare class TreemapSeriesModel extends SeriesModel<TreemapSeriesOption> {
    static type: string;
    type: string;
    static layoutMode: "box";
    preventUsingHoverLayer: boolean;
    layoutInfo: LayoutRect;
    designatedVisualItemStyle: TreemapSeriesItemStyleOption;
    private _viewRoot;
    private _idIndexMap;
    private _idIndexMapCount;
    static defaultOption: TreemapSeriesOption;
    getInitialData(option: TreemapSeriesOption, ecModel: GlobalModel): List<Model<any>, import("../../data/List").DefaultDataVisual>;
    optionUpdated(): void;
    formatTooltip(dataIndex: number, multipleSeries: boolean, dataType: string): import("../../component/tooltip/tooltipMarkup").TooltipMarkupNameValueBlock;
    getDataParams(dataIndex: number): TreemapSeriesCallbackDataParams;
    setLayoutInfo(layoutInfo: LayoutRect): void;
    mapIdToIndex(id: string): number;
    getViewRoot(): TreeNode;
    resetViewRoot(viewRoot?: TreeNode): void;
    enableAriaDecal(): void;
}
export default TreemapSeriesModel;
