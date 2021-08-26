import { Dictionary, TooltipRenderMode, ColorString, TooltipOrderMode, DimensionType } from '../../util/types';
import { TooltipMarkerType } from '../../util/format';
import SeriesModel from '../../model/Series';
import Model from '../../model/Model';
import { TooltipOption } from './TooltipModel';
export declare type TooltipMarkupBlockFragment = TooltipMarkupSection | TooltipMarkupNameValueBlock;
interface TooltipMarkupBlock {
    sortParam?: unknown;
    __gapLevelBetweenSubBlocks?: number;
}
export interface TooltipMarkupSection extends TooltipMarkupBlock {
    type: 'section';
    header?: unknown;
    noHeader?: boolean;
    blocks?: TooltipMarkupBlockFragment[];
    sortBlocks?: boolean;
}
export interface TooltipMarkupNameValueBlock extends TooltipMarkupBlock {
    type: 'nameValue';
    markerType?: TooltipMarkerType;
    markerColor?: ColorString;
    name?: string;
    value?: unknown | unknown[];
    valueType?: DimensionType | DimensionType[];
    noName?: boolean;
    noValue?: boolean;
}
export declare function createTooltipMarkup(type: 'section', option: Omit<TooltipMarkupSection, 'type'>): TooltipMarkupSection;
export declare function createTooltipMarkup(type: 'nameValue', option: Omit<TooltipMarkupNameValueBlock, 'type'>): TooltipMarkupNameValueBlock;
declare type MarkupText = string;
export declare function buildTooltipMarkup(fragment: TooltipMarkupBlockFragment, markupStyleCreator: TooltipMarkupStyleCreator, renderMode: TooltipRenderMode, orderMode: TooltipOrderMode, useUTC: boolean, toolTipTextStyle: TooltipOption['textStyle']): MarkupText;
export declare function retrieveVisualColorForTooltipMarker(series: SeriesModel, dataIndex: number): ColorString;
export declare function getPaddingFromTooltipModel(model: Model<TooltipOption>, renderMode: TooltipRenderMode): number | number[];
export declare class TooltipMarkupStyleCreator {
    readonly richTextStyles: Dictionary<Dictionary<unknown>>;
    private _nextStyleNameId;
    private _generateStyleName;
    makeTooltipMarker(markerType: TooltipMarkerType, colorStr: ColorString, renderMode: TooltipRenderMode): string;
    wrapRichTextStyle(text: string, styles: Dictionary<unknown> | Dictionary<unknown>[]): string;
}
export {};
