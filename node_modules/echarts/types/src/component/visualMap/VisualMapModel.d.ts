import VisualMapping, { VisualMappingOption } from '../../visual/VisualMapping';
import { ComponentOption, BoxLayoutOptionMixin, LabelOption, ColorString, ZRColor, BorderOptionMixin, OptionDataValue, BuiltinVisualProperty } from '../../util/types';
import ComponentModel from '../../model/Component';
import Model from '../../model/Model';
import GlobalModel from '../../model/Global';
import SeriesModel from '../../model/Series';
import List from '../../data/List';
declare type VisualOptionBase = {
    [key in BuiltinVisualProperty]?: any;
};
declare type LabelFormatter = (min: OptionDataValue, max?: OptionDataValue) => string;
declare type VisualState = VisualMapModel['stateList'][number];
export interface VisualMapOption<T extends VisualOptionBase = VisualOptionBase> extends ComponentOption, BoxLayoutOptionMixin, BorderOptionMixin {
    mainType?: 'visualMap';
    show?: boolean;
    align?: string;
    realtime?: boolean;
    seriesIndex?: 'all' | number[] | number;
    min?: number;
    max?: number;
    dimension?: number;
    inRange?: T;
    outOfRange?: T;
    controller?: {
        inRange?: T;
        outOfRange?: T;
    };
    target?: {
        inRange?: T;
        outOfRange?: T;
    };
    itemWidth?: number;
    itemHeight?: number;
    inverse?: boolean;
    orient?: 'horizontal' | 'vertical';
    backgroundColor?: ZRColor;
    contentColor?: ZRColor;
    inactiveColor?: ZRColor;
    padding?: number[] | number;
    textGap?: number;
    precision?: number;
    color?: ColorString[];
    formatter?: string | LabelFormatter;
    text?: string[];
    textStyle?: LabelOption;
    categories?: unknown;
}
export interface VisualMeta {
    stops: {
        value: number;
        color: ColorString;
    }[];
    outerColors: ColorString[];
    dimension?: number;
}
declare class VisualMapModel<Opts extends VisualMapOption = VisualMapOption> extends ComponentModel<Opts> {
    static type: string;
    type: string;
    static readonly dependencies: string[];
    readonly stateList: readonly ["inRange", "outOfRange"];
    readonly replacableOptionKeys: readonly ["inRange", "outOfRange", "target", "controller", "color"];
    readonly layoutMode: {
        readonly type: "box";
        readonly ignoreSize: true;
    };
    dataBound: number[];
    protected _dataExtent: [number, number];
    targetVisuals: {
        [x: string]: {
            symbol?: VisualMapping<{}>;
            decal?: VisualMapping<{}>;
            opacity?: VisualMapping<{}>;
            color?: VisualMapping<{}>;
            symbolSize?: VisualMapping<{}>;
            liftZ?: VisualMapping<{}>;
            colorAlpha?: VisualMapping<{}>;
            colorLightness?: VisualMapping<{}>;
            colorSaturation?: VisualMapping<{}>;
            colorHue?: VisualMapping<{}>;
        } & {
            __alphaForOpacity?: VisualMapping<{}>;
        };
    };
    controllerVisuals: {
        [x: string]: {
            symbol?: VisualMapping<{}>;
            decal?: VisualMapping<{}>;
            opacity?: VisualMapping<{}>;
            color?: VisualMapping<{}>;
            symbolSize?: VisualMapping<{}>;
            liftZ?: VisualMapping<{}>;
            colorAlpha?: VisualMapping<{}>;
            colorLightness?: VisualMapping<{}>;
            colorSaturation?: VisualMapping<{}>;
            colorHue?: VisualMapping<{}>;
        } & {
            __alphaForOpacity?: VisualMapping<{}>;
        };
    };
    textStyleModel: Model<LabelOption>;
    itemSize: number[];
    init(option: Opts, parentModel: Model, ecModel: GlobalModel): void;
    optionUpdated(newOption: Opts, isInit?: boolean): void;
    resetVisual(supplementVisualOption: (this: this, mappingOption: VisualMappingOption, state: string) => void): void;
    getTargetSeriesIndices(): number[];
    eachTargetSeries<Ctx>(callback: (this: Ctx, series: SeriesModel) => void, context?: Ctx): void;
    isTargetSeries(seriesModel: SeriesModel): boolean;
    formatValueText(value: number | string | number[], isCategory?: boolean, edgeSymbols?: string[]): string;
    resetExtent(): void;
    getDataDimension(list: List): string;
    getExtent(): [number, number];
    completeVisualOption(): void;
    resetItemSize(): void;
    isCategory(): boolean;
    setSelected(selected?: any): void;
    getSelected(): any;
    getValueState(value: any): VisualMapModel['stateList'][number];
    getVisualMeta(getColorVisual: (value: number, valueState: VisualState) => string): VisualMeta;
    static defaultOption: VisualMapOption;
}
export default VisualMapModel;
