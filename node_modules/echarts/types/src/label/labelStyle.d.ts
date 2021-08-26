import ZRText, { TextStyleProps } from 'zrender/lib/graphic/Text';
import Element, { ElementTextConfig } from 'zrender/lib/Element';
import Model from '../model/Model';
import { LabelOption, DisplayState, TextCommonOption, StatesOptionMixin, DisplayStateNonNormal, ColorString, ZRStyleProps, AnimationOptionMixin, InterpolatableValue } from '../util/types';
import GlobalModel from '../model/Global';
import List from '../data/List';
declare type TextCommonParams = {
    disableBox?: boolean;
    inheritColor?: ColorString;
    defaultOpacity?: number;
    defaultOutsidePosition?: LabelOption['position'];
    textStyle?: ZRStyleProps;
};
interface SetLabelStyleOpt<TLabelDataIndex> extends TextCommonParams {
    defaultText?: string | ((labelDataIndex: TLabelDataIndex, opt: SetLabelStyleOpt<TLabelDataIndex>, interpolatedValue?: InterpolatableValue) => string);
    labelFetcher?: {
        getFormattedLabel: (labelDataIndex: TLabelDataIndex, status: DisplayState, dataType?: string, labelDimIndex?: number, formatter?: string | ((params: object) => string), extendParams?: {
            interpolatedValue: InterpolatableValue;
        }) => string;
    };
    labelDataIndex?: TLabelDataIndex;
    labelDimIndex?: number;
    enableTextSetter?: boolean;
}
declare type LabelModel = Model<LabelOption & {
    formatter?: string | ((params: any) => string);
    showDuringLabel?: boolean;
}>;
declare type LabelModelForText = Model<Omit<LabelOption, 'position' | 'rotate'> & {
    formatter?: string | ((params: any) => string);
}>;
declare type LabelStatesModels<LabelModel> = Partial<Record<DisplayStateNonNormal, LabelModel>> & {
    normal: LabelModel;
};
export declare function setLabelText(label: ZRText, labelTexts: Record<DisplayState, string>): void;
declare function setLabelStyle<TLabelDataIndex>(targetEl: ZRText, labelStatesModels: LabelStatesModels<LabelModelForText>, opt?: SetLabelStyleOpt<TLabelDataIndex>, stateSpecified?: Partial<Record<DisplayState, TextStyleProps>>): void;
declare function setLabelStyle<TLabelDataIndex>(targetEl: Element, labelStatesModels: LabelStatesModels<LabelModel>, opt?: SetLabelStyleOpt<TLabelDataIndex>, stateSpecified?: Partial<Record<DisplayState, TextStyleProps>>): void;
export { setLabelStyle };
export declare function getLabelStatesModels<LabelName extends string = 'label'>(itemModel: Model<StatesOptionMixin<any> & Partial<Record<LabelName, any>>>, labelName?: LabelName): Record<DisplayState, LabelModel>;
export declare function createTextStyle(textStyleModel: Model, specifiedTextStyle?: TextStyleProps, opt?: Pick<TextCommonParams, 'inheritColor' | 'disableBox'>, isNotNormal?: boolean, isAttached?: boolean): TextStyleProps;
export declare function createTextConfig(textStyleModel: Model, opt?: Pick<TextCommonParams, 'defaultOutsidePosition' | 'inheritColor'>, isNotNormal?: boolean): ElementTextConfig;
export declare function getFont(opt: Pick<TextCommonOption, 'fontStyle' | 'fontWeight' | 'fontSize' | 'fontFamily'>, ecModel: GlobalModel): string;
export declare const labelInner: (hostObj: ZRText) => {
    prevValue?: InterpolatableValue;
    value?: InterpolatableValue;
    interpolatedValue?: InterpolatableValue;
    valueAnimation?: boolean;
    precision?: number | 'auto';
    statesModels?: LabelStatesModels<LabelModelForText>;
    defaultInterpolatedText?: (value: InterpolatableValue) => string;
    setLabelText?: (interpolatedValue?: InterpolatableValue) => void;
};
export declare function setLabelValueAnimation(label: ZRText, labelStatesModels: LabelStatesModels<LabelModelForText>, value: InterpolatableValue, getDefaultText: (value: InterpolatableValue) => string): void;
export declare function animateLabelValue(textEl: ZRText, dataIndex: number, data: List, animatableModel: Model<AnimationOptionMixin>, labelFetcher: SetLabelStyleOpt<number>['labelFetcher']): void;
