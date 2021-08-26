import * as graphic from './graphic';
import { Dictionary } from 'zrender/lib/core/types';
import { ZRColor } from './types';
declare type ECSymbol = graphic.Path & {
    __isEmptyBrush?: boolean;
    setColor: (color: ZRColor, innerColor?: string) => void;
    getColor: () => ZRColor;
};
export declare const symbolBuildProxies: Dictionary<ECSymbol>;
export declare function createSymbol(symbolType: string, x: number, y: number, w: number, h: number, color?: ZRColor, keepAspect?: boolean): ECSymbol;
export {};
