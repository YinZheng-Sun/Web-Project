import Group from 'zrender/lib/graphic/Group';
import Element, { ElementEvent, ElementTextConfig } from 'zrender/lib/Element';
import { DataFormatMixin } from '../model/mixin/dataFormat';
import GlobalModel from '../model/Global';
import ExtensionAPI from '../core/ExtensionAPI';
import SeriesModel from '../model/Series';
import { HashMap } from 'zrender/lib/core/util';
import { TaskPlanCallbackReturn, TaskProgressParams } from '../core/task';
import List, { ListDimensionType } from '../data/List';
import { Dictionary, ImageLike, TextAlign, TextVerticalAlign } from 'zrender/lib/core/types';
import { PatternObject } from 'zrender/lib/graphic/Pattern';
import { TooltipMarker } from './format';
import { AnimationEasing } from 'zrender/lib/animation/easing';
import { LinearGradientObject } from 'zrender/lib/graphic/LinearGradient';
import { RadialGradientObject } from 'zrender/lib/graphic/RadialGradient';
import { RectLike } from 'zrender/lib/core/BoundingRect';
import { TSpanStyleProps } from 'zrender/lib/graphic/TSpan';
import { PathStyleProps } from 'zrender/lib/graphic/Path';
import { ImageStyleProps } from 'zrender/lib/graphic/Image';
import ZRText, { TextStyleProps } from 'zrender/lib/graphic/Text';
import { Source } from '../data/Source';
export { Dictionary };
export declare type RendererType = 'canvas' | 'svg';
export declare type LayoutOrient = 'vertical' | 'horizontal';
export declare type HorizontalAlign = 'left' | 'center' | 'right';
export declare type VerticalAlign = 'top' | 'middle' | 'bottom';
export declare type ColorString = string;
export declare type ZRColor = ColorString | LinearGradientObject | RadialGradientObject | PatternObject;
export declare type ZRLineType = 'solid' | 'dotted' | 'dashed' | number | number[];
export declare type ZRFontStyle = 'normal' | 'italic' | 'oblique';
export declare type ZRFontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | number;
export declare type ZREasing = AnimationEasing;
export declare type ZRTextAlign = TextAlign;
export declare type ZRTextVerticalAlign = TextVerticalAlign;
export declare type ZRElementEvent = ElementEvent;
export declare type ZRRectLike = RectLike;
export declare type ZRStyleProps = PathStyleProps | ImageStyleProps | TSpanStyleProps | TextStyleProps;
export declare type ComponentFullType = string;
export declare type ComponentMainType = keyof ECUnitOption & string;
export declare type ComponentSubType = Exclude<ComponentOption['type'], undefined>;
export interface ComponentTypeInfo {
    main: ComponentMainType;
    sub: ComponentSubType;
}
export interface ECElement extends Element {
    tooltip?: CommonTooltipOption<unknown> & {
        content?: string;
        formatterParams?: unknown;
    };
    highDownSilentOnTouch?: boolean;
    onHoverStateChange?: (toState: DisplayState) => void;
    hoverState?: 0 | 1 | 2;
    selected?: boolean;
    z2EmphasisLift?: number;
    z2SelectLift?: number;
    disableLabelAnimation?: boolean;
    disableLabelLayout?: boolean;
}
export interface DataHost {
    getData(dataType?: SeriesDataType): List;
}
export interface DataModel extends DataHost, DataFormatMixin {
}
interface PayloadItem {
    excludeSeriesId?: OptionId | OptionId[];
    animation?: PayloadAnimationPart;
    [other: string]: any;
}
export interface Payload extends PayloadItem {
    type: string;
    escapeConnect?: boolean;
    batch?: PayloadItem[];
}
export interface HighlightPayload extends Payload {
    type: 'highlight';
    notBlur?: boolean;
}
export interface DownplayPayload extends Payload {
    type: 'downplay';
    notBlur?: boolean;
}
export interface PayloadAnimationPart {
    duration?: number;
    easing?: AnimationEasing;
    delay?: number;
}
export interface SelectChangedPayload extends Payload {
    type: 'selectchanged';
    escapeConnect: boolean;
    isFromClick: boolean;
    fromAction: 'select' | 'unselect' | 'toggleSelected';
    fromActionPayload: Payload;
    selected: {
        seriesIndex: number;
        dataType?: SeriesDataType;
        dataIndex: number[];
    }[];
}
export interface ViewRootGroup extends Group {
    __ecComponentInfo?: {
        mainType: string;
        index: number;
    };
}
export interface ECEvent extends ECEventData {
    type: string;
    componentType?: string;
    componentIndex?: number;
    seriesIndex?: number;
    escapeConnect?: boolean;
    event?: ElementEvent;
    batch?: ECEventData;
}
export interface ECEventData {
    [key: string]: any;
}
export interface EventQueryItem {
    [key: string]: any;
}
export interface NormalizedEventQuery {
    cptQuery: EventQueryItem;
    dataQuery: EventQueryItem;
    otherQuery: EventQueryItem;
}
export interface ActionInfo {
    type: string;
    event?: string;
    update?: string;
}
export interface ActionHandler {
    (payload: Payload, ecModel: GlobalModel, api: ExtensionAPI): void | ECEventData;
}
export interface OptionPreprocessor {
    (option: ECUnitOption, isTheme: boolean): void;
}
export interface PostUpdater {
    (ecModel: GlobalModel, api: ExtensionAPI): void;
}
export interface StageHandlerReset {
    (seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload?: Payload): StageHandlerProgressExecutor | StageHandlerProgressExecutor[] | void;
}
export interface StageHandlerOverallReset {
    (ecModel: GlobalModel, api: ExtensionAPI, payload?: Payload): void;
}
export interface StageHandler {
    createOnAllSeries?: boolean;
    seriesType?: string;
    getTargetSeries?: (ecModel: GlobalModel, api: ExtensionAPI) => HashMap<SeriesModel>;
    performRawSeries?: boolean;
    plan?: StageHandlerPlan;
    overallReset?: StageHandlerOverallReset;
    reset?: StageHandlerReset;
}
export interface StageHandlerInternal extends StageHandler {
    uid: string;
    visualType?: 'layout' | 'visual';
    __prio: number;
    __raw: StageHandler | StageHandlerOverallReset;
    isVisual?: boolean;
    isLayout?: boolean;
}
export declare type StageHandlerProgressParams = TaskProgressParams;
export interface StageHandlerProgressExecutor {
    dataEach?: (data: List, idx: number) => void;
    progress?: (params: StageHandlerProgressParams, data: List) => void;
}
export declare type StageHandlerPlanReturn = TaskPlanCallbackReturn;
export interface StageHandlerPlan {
    (seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload?: Payload): StageHandlerPlanReturn;
}
export interface LoadingEffectCreator {
    (api: ExtensionAPI, cfg: object): LoadingEffect;
}
export interface LoadingEffect extends Element {
    resize: () => void;
}
export declare type TooltipRenderMode = 'html' | 'richText';
export declare type TooltipOrderMode = 'valueAsc' | 'valueDesc' | 'seriesAsc' | 'seriesDesc';
export declare type OrdinalRawValue = string | number;
export declare type OrdinalNumber = number;
export declare type OrdinalSortInfo = {
    ordinalNumbers: OrdinalNumber[];
};
export declare type ParsedValue = ParsedValueNumeric | OrdinalRawValue;
export declare type ParsedValueNumeric = number | OrdinalNumber;
export declare type ScaleDataValue = ParsedValueNumeric | OrdinalRawValue | Date;
export interface ScaleTick {
    value: number;
}
export interface TimeScaleTick extends ScaleTick {
    level?: number;
}
export interface OrdinalScaleTick extends ScaleTick {
    value: number;
}
export declare type DimensionIndex = number;
export declare type DimensionIndexLoose = DimensionIndex | string;
export declare type DimensionName = string;
export declare type DimensionLoose = DimensionName | DimensionIndexLoose;
export declare type DimensionType = ListDimensionType;
export declare const VISUAL_DIMENSIONS: HashMap<number, "label" | "tooltip" | "itemName" | "itemId" | "seriesName">;
export interface DataVisualDimensions {
    tooltip?: DimensionIndex | false;
    label?: DimensionIndex;
    itemName?: DimensionIndex;
    itemId?: DimensionIndex;
    seriesName?: DimensionIndex;
}
export declare type DimensionDefinition = {
    type?: ListDimensionType;
    name?: DimensionName;
    displayName?: string;
};
export declare type DimensionDefinitionLoose = DimensionDefinition['name'] | DimensionDefinition;
export declare const SOURCE_FORMAT_ORIGINAL: "original";
export declare const SOURCE_FORMAT_ARRAY_ROWS: "arrayRows";
export declare const SOURCE_FORMAT_OBJECT_ROWS: "objectRows";
export declare const SOURCE_FORMAT_KEYED_COLUMNS: "keyedColumns";
export declare const SOURCE_FORMAT_TYPED_ARRAY: "typedArray";
export declare const SOURCE_FORMAT_UNKNOWN: "unknown";
export declare type SourceFormat = typeof SOURCE_FORMAT_ORIGINAL | typeof SOURCE_FORMAT_ARRAY_ROWS | typeof SOURCE_FORMAT_OBJECT_ROWS | typeof SOURCE_FORMAT_KEYED_COLUMNS | typeof SOURCE_FORMAT_TYPED_ARRAY | typeof SOURCE_FORMAT_UNKNOWN;
export declare const SERIES_LAYOUT_BY_COLUMN: "column";
export declare const SERIES_LAYOUT_BY_ROW: "row";
export declare type SeriesLayoutBy = typeof SERIES_LAYOUT_BY_COLUMN | typeof SERIES_LAYOUT_BY_ROW;
export declare type OptionSourceHeader = boolean | 'auto' | number;
export declare type SeriesDataType = 'main' | 'node' | 'edge';
export declare type ECUnitOption = {
    baseOption?: unknown;
    options?: unknown;
    media?: unknown;
    timeline?: ComponentOption | ComponentOption[];
    backgroundColor?: ZRColor;
    darkMode?: boolean | 'auto';
    textStyle?: Pick<LabelOption, 'color' | 'fontStyle' | 'fontWeight' | 'fontSize' | 'fontFamily'>;
    useUTC?: boolean;
    [key: string]: ComponentOption | ComponentOption[] | Dictionary<unknown> | unknown;
    stateAnimation?: AnimationOption;
} & AnimationOptionMixin & ColorPaletteOptionMixin;
export interface ECBasicOption extends ECUnitOption {
    baseOption?: ECUnitOption;
    timeline?: ComponentOption | ComponentOption[];
    options?: ECUnitOption[];
    media?: MediaUnit[];
}
export declare type OptionSourceData<VAL extends OptionDataValue = OptionDataValue, ORIITEM extends OptionDataItemOriginal<VAL> = OptionDataItemOriginal<VAL>> = OptionSourceDataOriginal<VAL, ORIITEM> | OptionSourceDataObjectRows<VAL> | OptionSourceDataArrayRows<VAL> | OptionSourceDataKeyedColumns<VAL> | OptionSourceDataTypedArray;
export declare type OptionDataItemOriginal<VAL extends OptionDataValue = OptionDataValue> = VAL | VAL[] | OptionDataItemObject<VAL>;
export declare type OptionSourceDataOriginal<VAL extends OptionDataValue = OptionDataValue, ORIITEM extends OptionDataItemOriginal<VAL> = OptionDataItemOriginal<VAL>> = ArrayLike<ORIITEM>;
export declare type OptionSourceDataObjectRows<VAL extends OptionDataValue = OptionDataValue> = Array<Dictionary<VAL>>;
export declare type OptionSourceDataArrayRows<VAL extends OptionDataValue = OptionDataValue> = Array<Array<VAL>>;
export declare type OptionSourceDataKeyedColumns<VAL extends OptionDataValue = OptionDataValue> = Dictionary<ArrayLike<VAL>>;
export declare type OptionSourceDataTypedArray = ArrayLike<number>;
export declare type OptionDataItem = OptionDataValue | Dictionary<OptionDataValue> | OptionDataValue[] | OptionDataItemObject<OptionDataValue>;
export declare type OptionDataItemObject<T> = {
    id?: OptionId;
    name?: OptionName;
    value?: T[] | T;
    selected?: boolean;
};
export declare type OptionId = string | number;
export declare type OptionName = string | number;
export interface GraphEdgeItemObject<VAL extends OptionDataValue> extends OptionDataItemObject<VAL> {
    source?: string | number;
    target?: string | number;
}
export declare type OptionDataValue = string | number | Date;
export declare type OptionDataValueNumeric = number | '-';
export declare type OptionDataValueCategory = string;
export declare type OptionDataValueDate = Date | string | number;
export declare type ModelOption = any;
export declare type ThemeOption = Dictionary<any>;
export declare type DisplayState = 'normal' | 'emphasis' | 'blur' | 'select';
export declare type DisplayStateNonNormal = Exclude<DisplayState, 'normal'>;
export declare type DisplayStateHostOption = {
    emphasis?: Dictionary<any>;
    [key: string]: any;
};
export interface OptionEncodeVisualDimensions {
    tooltip?: OptionEncodeValue;
    label?: OptionEncodeValue;
    itemName?: OptionEncodeValue;
    itemId?: OptionEncodeValue;
    seriesName?: OptionEncodeValue;
}
export interface OptionEncode extends OptionEncodeVisualDimensions {
    [coordDim: string]: OptionEncodeValue | undefined;
}
export declare type OptionEncodeValue = DimensionLoose | DimensionLoose[];
export declare type EncodeDefaulter = (source: Source, dimCount: number) => OptionEncode;
export interface CallbackDataParams {
    componentType: string;
    componentSubType: string;
    componentIndex: number;
    seriesType?: string;
    seriesIndex?: number;
    seriesId?: string;
    seriesName?: string;
    name: string;
    dataIndex: number;
    data: OptionDataItem;
    dataType?: SeriesDataType;
    value: OptionDataItem | OptionDataValue;
    color?: ZRColor;
    borderColor?: string;
    dimensionNames?: DimensionName[];
    encode?: DimensionUserOuputEncode;
    marker?: TooltipMarker;
    status?: DisplayState;
    dimensionIndex?: number;
    percent?: number;
    $vars: string[];
}
export declare type InterpolatableValue = ParsedValue | ParsedValue[];
export declare type DimensionUserOuputEncode = {
    [coordOrVisualDimName: string]: DimensionIndex[];
};
export declare type DimensionUserOuput = {
    dimensionNames: DimensionName[];
    encode: DimensionUserOuputEncode;
};
export declare type DecalDashArrayX = number | (number | number[])[];
export declare type DecalDashArrayY = number | number[];
export interface DecalObject {
    symbol?: string | string[];
    symbolSize?: number;
    symbolKeepAspect?: boolean;
    color?: string;
    backgroundColor?: string;
    dashArrayX?: DecalDashArrayX;
    dashArrayY?: DecalDashArrayY;
    rotation?: number;
    maxTileWidth?: number;
    maxTileHeight?: number;
}
export interface InnerDecalObject extends DecalObject {
    dirty?: boolean;
}
export interface MediaQuery {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    minAspectRatio?: number;
    maxAspectRatio?: number;
}
export declare type MediaUnit = {
    query?: MediaQuery;
    option: ECUnitOption;
};
export declare type ComponentLayoutMode = {
    type?: 'box';
    ignoreSize?: boolean | boolean[];
};
export declare type PaletteOptionMixin = ColorPaletteOptionMixin;
export interface ColorPaletteOptionMixin {
    color?: ZRColor | ZRColor[];
    colorLayer?: ZRColor[][];
}
export interface AriaLabelOption {
    enabled?: boolean;
    description?: string;
    general?: {
        withTitle?: string;
        withoutTitle?: string;
    };
    series?: {
        maxCount?: number;
        single?: {
            prefix?: string;
            withName?: string;
            withoutName?: string;
        };
        multiple?: {
            prefix?: string;
            withName?: string;
            withoutName?: string;
            separator?: {
                middle?: string;
                end?: string;
            };
        };
    };
    data?: {
        maxCount?: number;
        allData?: string;
        partialData?: string;
        withName?: string;
        withoutName?: string;
        separator?: {
            middle?: string;
            end?: string;
        };
    };
}
export interface AriaOption extends AriaLabelOption {
    mainType?: 'aria';
    enabled?: boolean;
    label?: AriaLabelOption;
    decal?: {
        show?: boolean;
        decals?: DecalObject | DecalObject[];
    };
}
export interface AriaOptionMixin {
    aria?: AriaOption;
}
export interface BoxLayoutOptionMixin {
    width?: number | string;
    height?: number | string;
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
}
export interface CircleLayoutOptionMixin {
    center?: (number | string)[];
    radius?: (number | string)[] | number | string;
}
export interface ShadowOptionMixin {
    shadowBlur?: number;
    shadowColor?: ColorString;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
}
export interface BorderOptionMixin {
    borderColor?: string;
    borderWidth?: number;
    borderType?: ZRLineType;
    borderCap?: CanvasLineCap;
    borderJoin?: CanvasLineJoin;
    borderDashOffset?: number;
    borderMiterLimit?: number;
}
export declare type AnimationDelayCallbackParam = {
    count: number;
    index: number;
};
export declare type AnimationDurationCallback = (idx: number) => number;
export declare type AnimationDelayCallback = (idx: number, params?: AnimationDelayCallbackParam) => number;
export interface AnimationOption {
    duration?: number;
    easing?: AnimationEasing;
    delay?: number;
}
export interface AnimationOptionMixin {
    animation?: boolean;
    animationThreshold?: number;
    animationDuration?: number | AnimationDurationCallback;
    animationEasing?: AnimationEasing;
    animationDelay?: number | AnimationDelayCallback;
    animationDurationUpdate?: number | AnimationDurationCallback;
    animationEasingUpdate?: AnimationEasing;
    animationDelayUpdate?: number | AnimationDelayCallback;
}
export interface RoamOptionMixin {
    roam?: boolean | 'pan' | 'move' | 'zoom' | 'scale';
    center?: number[];
    zoom?: number;
    scaleLimit?: {
        min?: number;
        max?: number;
    };
}
export declare type SymbolSizeCallback<T> = (rawValue: any, params: T) => number | number[];
export declare type SymbolCallback<T> = (rawValue: any, params: T) => string;
export declare type SymbolRotateCallback<T> = (rawValue: any, params: T) => number;
export interface SymbolOptionMixin<T = unknown> {
    symbol?: string | (unknown extends T ? never : SymbolCallback<T>);
    symbolSize?: number | number[] | (unknown extends T ? never : SymbolSizeCallback<T>);
    symbolRotate?: number | (unknown extends T ? never : SymbolRotateCallback<T>);
    symbolKeepAspect?: boolean;
    symbolOffset?: (string | number)[];
}
export interface ItemStyleOption extends ShadowOptionMixin, BorderOptionMixin {
    color?: ZRColor;
    opacity?: number;
    decal?: DecalObject | 'none';
}
export interface LineStyleOption<Clr = ZRColor> extends ShadowOptionMixin {
    width?: number;
    color?: Clr;
    opacity?: number;
    type?: ZRLineType;
    cap?: CanvasLineCap;
    join?: CanvasLineJoin;
    dashOffset?: number;
    miterLimit?: number;
}
export interface AreaStyleOption<Clr = ZRColor> extends ShadowOptionMixin {
    color?: Clr;
    opacity?: number;
}
declare type Arrayable<T extends Dictionary<any>> = {
    [key in keyof T]: T[key] | T[key][];
};
declare type Dictionaryable<T extends Dictionary<any>> = {
    [key in keyof T]: T[key] | Dictionary<T[key]>;
};
export interface VisualOptionUnit {
    symbol?: string;
    symbolSize?: number;
    color?: ColorString;
    colorAlpha?: number;
    opacity?: number;
    colorLightness?: number;
    colorSaturation?: number;
    colorHue?: number;
    decal?: DecalObject;
    liftZ?: number;
}
export declare type VisualOptionFixed = VisualOptionUnit;
export declare type VisualOptionPiecewise = VisualOptionUnit;
export declare type VisualOptionLinear = Arrayable<VisualOptionUnit>;
export declare type VisualOptionCategory = Arrayable<VisualOptionUnit> | Dictionaryable<VisualOptionUnit>;
export declare type BuiltinVisualProperty = keyof VisualOptionUnit;
export interface TextCommonOption extends ShadowOptionMixin {
    color?: string;
    fontStyle?: ZRFontStyle;
    fontWeight?: ZRFontWeight;
    fontFamily?: string;
    fontSize?: number | string;
    align?: HorizontalAlign;
    verticalAlign?: VerticalAlign;
    baseline?: VerticalAlign;
    opacity?: number;
    lineHeight?: number;
    backgroundColor?: ColorString | {
        image: ImageLike | string;
    };
    borderColor?: string;
    borderWidth?: number;
    borderType?: ZRLineType;
    borderDashOffset?: number;
    borderRadius?: number | number[];
    padding?: number | number[];
    width?: number | string;
    height?: number;
    textBorderColor?: string;
    textBorderWidth?: number;
    textBorderType?: ZRLineType;
    textBorderDashOffset?: number;
    textShadowBlur?: number;
    textShadowColor?: string;
    textShadowOffsetX?: number;
    textShadowOffsetY?: number;
    tag?: string;
}
export interface LabelFormatterCallback<T = CallbackDataParams> {
    (params: T): string;
}
export interface LabelOption extends TextCommonOption {
    show?: boolean;
    position?: ElementTextConfig['position'];
    distance?: number;
    rotate?: number;
    offset?: number[];
    minMargin?: number;
    overflow?: TextStyleProps['overflow'];
    silent?: boolean;
    precision?: number | 'auto';
    valueAnimation?: boolean;
    rich?: Dictionary<TextCommonOption>;
}
export interface SeriesLabelOption extends LabelOption {
    formatter?: string | LabelFormatterCallback<CallbackDataParams>;
}
export interface LineLabelOption extends Omit<LabelOption, 'distance' | 'position'> {
    position?: 'start' | 'middle' | 'end' | 'insideStart' | 'insideStartTop' | 'insideStartBottom' | 'insideMiddle' | 'insideMiddleTop' | 'insideMiddleBottom' | 'insideEnd' | 'insideEndTop' | 'insideEndBottom' | 'insideMiddleBottom';
    distance?: number | number[];
}
export interface LabelLineOption {
    show?: boolean;
    showAbove?: boolean;
    length?: number;
    length2?: number;
    smooth?: boolean | number;
    minTurnAngle?: number;
    lineStyle?: LineStyleOption;
}
export interface SeriesLineLabelOption extends LineLabelOption {
    formatter?: string | LabelFormatterCallback<CallbackDataParams>;
}
export interface LabelLayoutOptionCallbackParams {
    dataIndex?: number;
    dataType?: SeriesDataType;
    seriesIndex: number;
    text: string;
    align: ZRTextAlign;
    verticalAlign: ZRTextVerticalAlign;
    rect: RectLike;
    labelRect: RectLike;
    labelLinePoints?: number[][];
}
export interface LabelLayoutOption {
    moveOverlap?: 'shiftX' | 'shiftY' | 'shuffleX' | 'shuffleY';
    hideOverlap?: boolean;
    draggable?: boolean;
    x?: number | string;
    y?: number | string;
    dx?: number;
    dy?: number;
    rotate?: number;
    align?: ZRTextAlign;
    verticalAlign?: ZRTextVerticalAlign;
    width?: number;
    height?: number;
    fontSize?: number;
    labelLinePoints?: number[][];
}
export declare type LabelLayoutOptionCallback = (params: LabelLayoutOptionCallbackParams) => LabelLayoutOption;
interface TooltipFormatterCallback<T> {
    (params: T, asyncTicket: string): string | HTMLElement[];
    (params: T, asyncTicket: string, callback: (cbTicket: string, htmlOrDomNodes: string | HTMLElement[]) => void): string | HTMLElement[];
}
declare type TooltipBuiltinPosition = 'inside' | 'top' | 'left' | 'right' | 'bottom';
declare type TooltipBoxLayoutOption = Pick<BoxLayoutOptionMixin, 'top' | 'left' | 'right' | 'bottom'>;
interface PositionCallback {
    (point: [number, number], params: CallbackDataParams | CallbackDataParams[], el: HTMLDivElement | ZRText | null, rect: RectLike | null, size: {
        contentSize: [number, number];
        viewSize: [number, number];
    }): number[] | string[] | TooltipBuiltinPosition | TooltipBoxLayoutOption;
}
export interface CommonTooltipOption<FormatterParams> {
    show?: boolean;
    triggerOn?: 'mousemove' | 'click' | 'none' | 'mousemove|click';
    alwaysShowContent?: boolean;
    formatter?: string | TooltipFormatterCallback<FormatterParams>;
    position?: (number | string)[] | TooltipBuiltinPosition | PositionCallback | TooltipBoxLayoutOption;
    confine?: boolean;
    align?: HorizontalAlign;
    verticalAlign?: VerticalAlign;
    showDelay?: number;
    hideDelay?: number;
    transitionDuration?: number;
    enterable?: boolean;
    backgroundColor?: ColorString;
    borderColor?: ColorString;
    borderRadius?: number;
    borderWidth?: number;
    shadowBlur?: number;
    shadowColor?: string;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    padding?: number | number[];
    extraCssText?: string;
    textStyle?: Pick<LabelOption, 'color' | 'fontStyle' | 'fontWeight' | 'fontFamily' | 'fontSize' | 'lineHeight' | 'width' | 'height' | 'textBorderColor' | 'textBorderWidth' | 'textShadowColor' | 'textShadowBlur' | 'textShadowOffsetX' | 'textShadowOffsetY' | 'align'> & {
        decoration?: string;
    };
}
export declare type SeriesTooltipOption = CommonTooltipOption<CallbackDataParams> & {
    trigger?: 'item' | 'axis' | boolean | 'none';
};
declare type LabelFormatterParams = {
    value: ScaleDataValue;
    axisDimension: string;
    axisIndex: number;
    seriesData: CallbackDataParams[];
};
export interface CommonAxisPointerOption {
    show?: boolean | 'auto';
    z?: number;
    zlevel?: number;
    triggerOn?: 'click' | 'mousemove' | 'none' | 'mousemove|click';
    type?: 'line' | 'shadow' | 'none';
    snap?: boolean;
    triggerTooltip?: boolean;
    value?: ScaleDataValue;
    status?: 'show' | 'hide';
    label?: LabelOption & {
        precision?: 'auto' | number;
        margin?: number;
        formatter?: string | ((params: LabelFormatterParams) => string);
    };
    animation?: boolean | 'auto';
    animationDurationUpdate?: number;
    animationEasingUpdate?: ZREasing;
    lineStyle?: LineStyleOption;
    shadowStyle?: AreaStyleOption;
    handle?: {
        show?: boolean;
        icon?: string;
        size?: number | number[];
        margin?: number;
        color?: ColorString;
        throttle?: number;
    } & ShadowOptionMixin;
    seriesDataIndices?: {
        seriesIndex: number;
        dataIndex: number;
        dataIndexInside: number;
    }[];
}
export interface ComponentOption {
    mainType?: string;
    type?: string;
    id?: OptionId;
    name?: OptionName;
    z?: number;
    zlevel?: number;
}
export declare type BlurScope = 'coordinateSystem' | 'series' | 'global';
export declare type InnerFocus = string | ArrayLike<number> | Dictionary<ArrayLike<number>>;
export interface DefaultExtraStateOpts {
    emphasis: any;
    select: any;
    blur: any;
}
export declare type DefaultEmphasisFocus = 'none' | 'self' | 'series';
export interface DefaultExtraEmpasisState {
    focus?: DefaultEmphasisFocus;
}
interface ExtraStateOptsBase {
    emphasis?: {
        focus?: string;
    };
    select?: any;
    blur?: any;
}
export interface StatesOptionMixin<StateOption, ExtraStateOpts extends ExtraStateOptsBase = DefaultExtraStateOpts> {
    emphasis?: StateOption & ExtraStateOpts['emphasis'] & {
        blurScope?: BlurScope;
    };
    select?: StateOption & ExtraStateOpts['select'];
    blur?: StateOption & ExtraStateOpts['blur'];
}
export interface SeriesOption<StateOption = any, ExtraStateOpts extends ExtraStateOptsBase = DefaultExtraStateOpts> extends ComponentOption, AnimationOptionMixin, ColorPaletteOptionMixin, StatesOptionMixin<StateOption, ExtraStateOpts> {
    mainType?: 'series';
    silent?: boolean;
    blendMode?: string;
    cursor?: string;
    data?: unknown;
    legendHoverLink?: boolean;
    progressive?: number | false;
    progressiveThreshold?: number;
    progressiveChunkMode?: 'mod';
    coordinateSystem?: string;
    hoverLayerThreshold?: number;
    seriesLayoutBy?: 'column' | 'row';
    labelLine?: LabelLineOption;
    labelLayout?: LabelLayoutOption | LabelLayoutOptionCallback;
    stateAnimation?: AnimationOption;
    selectedMap?: Dictionary<boolean>;
    selectedMode?: 'single' | 'multiple' | boolean;
}
export interface SeriesOnCartesianOptionMixin {
    xAxisIndex?: number;
    yAxisIndex?: number;
    xAxisId?: string;
    yAxisId?: string;
}
export interface SeriesOnPolarOptionMixin {
    radiusAxisIndex?: number;
    angleAxisIndex?: number;
    radiusAxisId?: string;
    angleAxisId?: string;
}
export interface SeriesOnSingleOptionMixin {
    singleAxisIndex?: number;
    singleAxisId?: string;
}
export interface SeriesOnGeoOptionMixin {
    geoIndex?: number;
    geoId?: string;
}
export interface SeriesOnCalendarOptionMixin {
    calendarIndex?: number;
    calendarId?: string;
}
export interface SeriesLargeOptionMixin {
    large?: boolean;
    largeThreshold?: number;
}
export interface SeriesStackOptionMixin {
    stack?: string;
}
declare type SamplingFunc = (frame: ArrayLike<number>) => number;
export interface SeriesSamplingOptionMixin {
    sampling?: 'none' | 'average' | 'min' | 'max' | 'sum' | 'lttb' | SamplingFunc;
}
export interface SeriesEncodeOptionMixin {
    datasetIndex?: number;
    datasetId?: string | number;
    seriesLayoutBy?: SeriesLayoutBy;
    sourceHeader?: OptionSourceHeader;
    dimensions?: DimensionDefinitionLoose[];
    encode?: OptionEncode;
}
export declare type SeriesEncodableModel = SeriesModel<SeriesOption & SeriesEncodeOptionMixin>;
