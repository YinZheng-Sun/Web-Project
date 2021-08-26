import BoundingRect from 'zrender/lib/core/BoundingRect';
import { BoxLayoutOptionMixin, ComponentLayoutMode } from './types';
import Group from 'zrender/lib/graphic/Group';
import Element from 'zrender/lib/Element';
export interface LayoutRect extends BoundingRect {
    margin: number[];
}
export interface NewlineElement extends Element {
    newline: boolean;
}
export declare const LOCATION_PARAMS: readonly ["left", "right", "top", "bottom", "width", "height"];
export declare const HV_NAMES: readonly [readonly ["width", "left", "right"], readonly ["height", "top", "bottom"]];
declare function boxLayout(orient: 'horizontal' | 'vertical', group: Group, gap: number, maxWidth?: number, maxHeight?: number): void;
export declare const box: typeof boxLayout;
export declare const vbox: (group: Group, gap: number, maxWidth?: number, maxHeight?: number) => void;
export declare const hbox: (group: Group, gap: number, maxWidth?: number, maxHeight?: number) => void;
export declare function getAvailableSize(positionInfo: {
    left?: number | string;
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
}, containerRect: {
    width: number;
    height: number;
}, margin?: number[] | number): {
    width: number;
    height: number;
};
export declare function getLayoutRect(positionInfo: BoxLayoutOptionMixin & {
    aspect?: number;
}, containerRect: {
    width: number;
    height: number;
}, margin?: number | number[]): LayoutRect;
export declare function positionElement(el: Element, positionInfo: BoxLayoutOptionMixin, containerRect: {
    width: number;
    height: number;
}, margin?: number[] | number, opt?: {
    hv: [1 | 0 | boolean, 1 | 0 | boolean];
    boundingMode: 'all' | 'raw';
}): void;
export declare function sizeCalculable(option: BoxLayoutOptionMixin, hvIdx: number): boolean;
export declare function fetchLayoutMode(ins: any): ComponentLayoutMode;
export declare function mergeLayoutParam<T extends BoxLayoutOptionMixin>(targetOption: T, newOption: T, opt?: ComponentLayoutMode): void;
export declare function getLayoutParams(source: BoxLayoutOptionMixin): BoxLayoutOptionMixin;
export declare function copyLayoutParams(target: BoxLayoutOptionMixin, source: BoxLayoutOptionMixin): BoxLayoutOptionMixin;
export {};
