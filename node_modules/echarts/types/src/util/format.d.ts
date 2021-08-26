import * as zrUtil from 'zrender/lib/core/util';
import { TooltipRenderMode, ColorString, ZRColor, DimensionType } from './types';
import { Dictionary } from 'zrender/lib/core/types';
export declare function addCommas(x: string | number): string;
export declare function toCamelCase(str: string, upperCaseFirst?: boolean): string;
export declare const normalizeCssArray: typeof zrUtil.normalizeCssArray;
export declare function encodeHTML(source: string): string;
export declare function makeValueReadable(value: unknown, valueType: DimensionType, useUTC: boolean): string;
export interface TplFormatterParam extends Dictionary<any> {
    $vars: string[];
}
export declare function formatTpl(tpl: string, paramsList: TplFormatterParam | TplFormatterParam[], encode?: boolean): string;
export declare function formatTplSimple(tpl: string, param: Dictionary<any>, encode?: boolean): string;
interface RichTextTooltipMarker {
    renderMode: TooltipRenderMode;
    content: string;
    style: Dictionary<unknown>;
}
export declare type TooltipMarker = string | RichTextTooltipMarker;
export declare type TooltipMarkerType = 'item' | 'subItem';
interface GetTooltipMarkerOpt {
    color?: ColorString;
    extraCssText?: string;
    type?: TooltipMarkerType;
    renderMode?: TooltipRenderMode;
    markerId?: string;
}
export declare function getTooltipMarker(color: ColorString, extraCssText?: string): TooltipMarker;
export declare function getTooltipMarker(opt: GetTooltipMarkerOpt): TooltipMarker;
export declare function formatTime(tpl: string, value: unknown, isUTC: boolean): string;
export declare function capitalFirst(str: string): string;
export declare function convertToColorString(color: ZRColor, defaultColor?: ColorString): ColorString;
export { truncateText } from 'zrender/lib/graphic/helper/parseText';
export declare function windowOpen(link: string, target: string): void;
export { getTextRect } from '../legacy/getTextRect';
