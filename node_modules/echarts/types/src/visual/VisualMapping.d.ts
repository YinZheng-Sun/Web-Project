import * as zrUtil from 'zrender/lib/core/util';
import { AllPropTypes, Dictionary } from 'zrender/lib/core/types';
import { ColorString, BuiltinVisualProperty, VisualOptionPiecewise, VisualOptionCategory, VisualOptionLinear, VisualOptionUnit, ParsedValue } from '../util/types';
declare type RawValue = ParsedValue;
declare type VisualValue = AllPropTypes<VisualOptionUnit>;
declare type NormalizedValue = number;
declare type MappingMethod = 'linear' | 'piecewise' | 'category' | 'fixed';
interface Normalizer {
    (this: VisualMapping, value?: RawValue): NormalizedValue;
}
interface ColorMapper {
    (this: VisualMapping, value: RawValue | NormalizedValue, isNormalized?: boolean, out?: number[]): ColorString | number[];
}
interface DoMap {
    (this: VisualMapping, normalzied?: NormalizedValue, value?: RawValue): VisualValue;
}
interface VisualValueGetter {
    (key: string): VisualValue;
}
interface VisualValueSetter {
    (key: string, value: VisualValue): void;
}
interface VisualHandler {
    applyVisual(this: VisualMapping, value: RawValue, getter: VisualValueGetter, setter: VisualValueSetter): void;
    _normalizedToVisual: {
        linear(this: VisualMapping, normalized: NormalizedValue): VisualValue;
        category(this: VisualMapping, normalized: NormalizedValue): VisualValue;
        piecewise(this: VisualMapping, normalzied: NormalizedValue, value: RawValue): VisualValue;
        fixed(this: VisualMapping): VisualValue;
    };
    getColorMapper?: (this: VisualMapping) => ColorMapper;
}
interface VisualMappingPiece {
    index?: number;
    value?: number | string;
    interval?: [number, number];
    close?: [0 | 1, 0 | 1];
    text?: string;
    visual?: VisualOptionPiecewise;
}
export interface VisualMappingOption {
    type?: BuiltinVisualProperty;
    mappingMethod?: MappingMethod;
    dataExtent?: [number, number];
    pieceList?: VisualMappingPiece[];
    categories?: (string | number)[];
    loop?: boolean;
    visual?: VisualValue[] | Dictionary<VisualValue> | VisualValue;
}
interface VisualMappingInnerPiece extends VisualMappingPiece {
    originIndex: number;
}
interface VisualMappingInnerOption extends VisualMappingOption {
    hasSpecialVisual: boolean;
    pieceList: VisualMappingInnerPiece[];
    categoryMap: Dictionary<number>;
    parsedVisual: number[][];
    visual?: VisualValue[] | Dictionary<VisualValue>;
}
declare class VisualMapping<VisualOption extends VisualOptionPiecewise | VisualOptionCategory | VisualOptionUnit | VisualOptionLinear = {}> {
    option: VisualMappingInnerOption;
    type: BuiltinVisualProperty;
    mappingMethod: MappingMethod;
    applyVisual: VisualHandler['applyVisual'];
    getColorMapper: VisualHandler['getColorMapper'];
    _normalizeData: Normalizer;
    _normalizedToVisual: DoMap;
    constructor(option: VisualMappingOption);
    mapValueToVisual(value: RawValue): VisualValue;
    getNormalizer(): zrUtil.Bind1<Normalizer, this>;
    static visualHandlers: {
        [key in BuiltinVisualProperty]: VisualHandler;
    };
    static listVisualTypes(): ("symbol" | "decal" | "opacity" | "color" | "symbolSize" | "liftZ" | "colorAlpha" | "colorLightness" | "colorSaturation" | "colorHue")[];
    static isValidType(visualType: string): boolean;
    static eachVisual<Ctx, T>(visual: T | T[] | Dictionary<T>, callback: (visual: T, key?: string | number) => void, context?: Ctx): void;
    static mapVisual<Ctx, T>(visual: T, callback: (visual: T, key?: string | number) => T, context?: Ctx): T;
    static mapVisual<Ctx, T>(visual: T[], callback: (visual: T, key?: string | number) => T[], context?: Ctx): T[];
    static mapVisual<Ctx, T>(visual: Dictionary<T>, callback: (visual: T, key?: string | number) => Dictionary<T>, context?: Ctx): Dictionary<T>;
    static retrieveVisuals(obj: Dictionary<any>): VisualOptionPiecewise;
    static prepareVisualTypes(visualTypes: {
        [key in BuiltinVisualProperty]?: any;
    } | BuiltinVisualProperty[]): ("symbol" | "decal" | "opacity" | "color" | "symbolSize" | "liftZ" | "colorAlpha" | "colorLightness" | "colorSaturation" | "colorHue")[];
    static dependsOn(visualType1: BuiltinVisualProperty, visualType2: BuiltinVisualProperty): boolean;
    static findPieceIndex(value: number, pieceList: VisualMappingPiece[], findClosestWhenOutside?: boolean): number;
}
export default VisualMapping;
