import * as graphic from '../../util/graphic';
import List from '../../data/List';
import { AnimationOption } from '../../util/types';
import { PathProps } from 'zrender/lib/graphic/Path';
import { SymbolDrawSeriesScope } from './SymbolDraw';
interface SymbolOpts {
    disableAnimation?: boolean;
    useNameLabel?: boolean;
    symbolInnerColor?: string;
}
declare class Symbol extends graphic.Group {
    private _seriesModel;
    private _symbolType;
    private _sizeX;
    private _sizeY;
    private _z2;
    constructor(data: List, idx: number, seriesScope?: SymbolDrawSeriesScope, opts?: SymbolOpts);
    _createSymbol(symbolType: string, data: List, idx: number, symbolSize: number[], keepAspect: boolean): void;
    stopSymbolAnimation(toLastFrame: boolean): void;
    getSymbolPath(): graphic.Path<PathProps> & {
        __isEmptyBrush?: boolean;
        setColor: (color: string | import("zrender/lib/graphic/Pattern").PatternObject | import("zrender/lib/graphic/LinearGradient").LinearGradientObject | import("zrender/lib/graphic/RadialGradient").RadialGradientObject, innerColor?: string) => void;
        getColor: () => string | import("zrender/lib/graphic/Pattern").PatternObject | import("zrender/lib/graphic/LinearGradient").LinearGradientObject | import("zrender/lib/graphic/RadialGradient").RadialGradientObject;
    };
    highlight(): void;
    downplay(): void;
    setZ(zlevel: number, z: number): void;
    setDraggable(draggable: boolean): void;
    updateData(data: List, idx: number, seriesScope?: SymbolDrawSeriesScope, opts?: SymbolOpts): void;
    _updateCommon(data: List, idx: number, symbolSize: number[], seriesScope?: SymbolDrawSeriesScope, opts?: SymbolOpts): void;
    setSymbolScale(scale: number): void;
    fadeOut(cb: () => void, opt?: {
        fadeLabel: boolean;
        animation?: AnimationOption;
    }): void;
    static getSymbolSize(data: List, idx: number): number[];
}
export default Symbol;
