import Eventful from 'zrender/lib/core/Eventful';
import * as graphic from '../../util/graphic';
import { Dictionary } from '../../util/types';
import { ZRenderType } from 'zrender/lib/zrender';
import { ElementEvent } from 'zrender/lib/Element';
import * as matrix from 'zrender/lib/core/matrix';
import { PathStyleProps } from 'zrender/lib/graphic/Path';
export declare type BrushType = 'polygon' | 'rect' | 'lineX' | 'lineY';
export declare type BrushTypeUncertain = BrushType | false | 'auto';
export declare type BrushMode = 'single' | 'multiple';
export declare type BrushDimensionMinMax = number[];
export declare type BrushAreaRange = BrushDimensionMinMax | BrushDimensionMinMax[];
export interface BrushCoverConfig {
    brushType: BrushType;
    id?: string;
    range?: BrushAreaRange;
    panelId?: string;
    brushMode?: BrushMode;
    brushStyle?: Pick<PathStyleProps, BrushStyleKey>;
    transformable?: boolean;
    removeOnClick?: boolean;
    z?: number;
}
export interface BrushCoverCreatorConfig extends Pick<BrushCoverConfig, 'brushMode' | 'transformable' | 'removeOnClick' | 'brushStyle' | 'z'> {
    brushType: BrushTypeUncertain;
}
declare type BrushStyleKey = 'fill' | 'stroke' | 'lineWidth' | 'opacity' | 'shadowBlur' | 'shadowOffsetX' | 'shadowOffsetY' | 'shadowColor';
declare const BRUSH_PANEL_GLOBAL: true;
export interface BrushPanelConfig {
    panelId: string;
    clipPath(localPoints: number[][], transform: matrix.MatrixArray): number[][];
    isTargetByCursor(e: ElementEvent, localCursorPoint: number[], transform: matrix.MatrixArray): boolean;
    defaultBrushType?: BrushType;
    getLinearBrushOtherExtent?(xyIndex: number): number[];
}
declare type BrushPanelConfigOrGlobal = BrushPanelConfig | typeof BRUSH_PANEL_GLOBAL;
interface BrushCover extends graphic.Group {
    __brushOption: BrushCoverConfig;
}
export interface BrushControllerEvents {
    brush: {
        areas: {
            brushType: BrushType;
            panelId: string;
            range: BrushAreaRange;
        }[];
        isEnd: boolean;
        removeOnClick: boolean;
    };
}
declare class BrushController extends Eventful<BrushControllerEvents> {
    readonly group: graphic.Group;
    _zr: ZRenderType;
    _brushType: BrushTypeUncertain;
    _brushOption: BrushCoverCreatorConfig;
    _panels: Dictionary<BrushPanelConfig>;
    _track: number[][];
    _dragging: boolean;
    _covers: BrushCover[];
    _creatingCover: BrushCover;
    _creatingPanel: BrushPanelConfigOrGlobal;
    private _enableGlobalPan;
    private _mounted;
    _transform: matrix.MatrixArray;
    private _uid;
    private _handlers;
    constructor(zr: ZRenderType);
    enableBrush(brushOption: Partial<BrushCoverCreatorConfig> | false): BrushController;
    private _doEnableBrush;
    private _doDisableBrush;
    setPanels(panelOpts?: BrushPanelConfig[]): BrushController;
    mount(opt?: {
        enableGlobalPan?: boolean;
        x?: number;
        y?: number;
        rotation?: number;
        scaleX?: number;
        scaleY?: number;
    }): BrushController;
    updateCovers(coverConfigList: BrushCoverConfig[]): this;
    unmount(): this;
    dispose(): void;
}
export default BrushController;
