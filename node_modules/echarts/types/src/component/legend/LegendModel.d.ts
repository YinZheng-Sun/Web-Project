import Model from '../../model/Model';
import ComponentModel from '../../model/Component';
import { ComponentOption, BoxLayoutOptionMixin, BorderOptionMixin, ColorString, ItemStyleOption, LabelOption, LayoutOrient, CommonTooltipOption } from '../../util/types';
import { Dictionary } from 'zrender/lib/core/types';
import GlobalModel from '../../model/Global';
declare type SelectorType = 'all' | 'inverse';
export interface LegendSelectorButtonOption {
    type?: SelectorType;
    title?: string;
}
interface DataItem {
    name?: string;
    icon?: string;
    textStyle?: LabelOption;
    tooltip?: unknown;
}
export interface LegendTooltipFormatterParams {
    componentType: 'legend';
    legendIndex: number;
    name: string;
    $vars: ['name'];
}
export interface LegendOption extends ComponentOption, BoxLayoutOptionMixin, BorderOptionMixin {
    mainType?: 'legend';
    show?: boolean;
    orient?: LayoutOrient;
    align?: 'auto' | 'left' | 'right';
    backgroundColor?: ColorString;
    borderRadius?: number | number[];
    padding?: number | number[];
    itemGap?: number;
    itemWidth?: number;
    itemHeight?: number;
    inactiveColor?: ColorString;
    inactiveBorderColor?: ColorString;
    itemStyle?: ItemStyleOption;
    formatter?: string | ((name: string) => string);
    textStyle?: LabelOption;
    selectedMode?: boolean | 'single' | 'multiple';
    selected?: Dictionary<boolean>;
    selector?: (LegendSelectorButtonOption | SelectorType)[] | boolean;
    selectorLabel?: LabelOption;
    emphasis?: {
        selectorLabel?: LabelOption;
    };
    selectorPosition?: 'auto' | 'start' | 'end';
    selectorItemGap?: number;
    selectorButtonGap?: number;
    data?: (string | DataItem)[];
    symbolKeepAspect?: boolean;
    tooltip?: CommonTooltipOption<LegendTooltipFormatterParams>;
}
declare class LegendModel<Ops extends LegendOption = LegendOption> extends ComponentModel<Ops> {
    static type: string;
    type: string;
    static readonly dependencies: string[];
    readonly layoutMode: {
        readonly type: "box";
        readonly ignoreSize: true;
    };
    private _data;
    private _availableNames;
    init(option: Ops, parentModel: Model, ecModel: GlobalModel): void;
    mergeOption(option: Ops, ecModel: GlobalModel): void;
    _updateSelector(option: Ops): void;
    optionUpdated(): void;
    _updateData(ecModel: GlobalModel): void;
    getData(): Model<DataItem>[];
    select(name: string): void;
    unSelect(name: string): void;
    toggleSelected(name: string): void;
    allSelect(): void;
    inverseSelect(): void;
    isSelected(name: string): boolean;
    getOrient(): {
        index: 0;
        name: 'horizontal';
    };
    getOrient(): {
        index: 1;
        name: 'vertical';
    };
    static defaultOption: LegendOption;
}
export default LegendModel;
