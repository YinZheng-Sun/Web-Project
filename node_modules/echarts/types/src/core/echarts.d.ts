import * as zrender from 'zrender/lib/zrender';
import Eventful from 'zrender/lib/core/Eventful';
import { GlobalModelSetOptionOpts } from '../model/Global';
import * as modelUtil from '../util/model';
import mapDataStorage from '../coord/geo/mapDataStorage';
import { CoordinateSystemCreator } from '../coord/CoordinateSystem';
import { Payload, RendererType, ECEvent, ActionHandler, ActionInfo, OptionPreprocessor, PostUpdater, LoadingEffectCreator, StageHandlerOverallReset, StageHandler, DimensionDefinitionLoose, ThemeOption, ECBasicOption, ZRColor, ComponentMainType, DimensionLoose, ScaleDataValue } from '../util/types';
import { registerExternalTransform } from '../data/helper/transform';
import { LocaleOption } from './locale';
import type { MorphDividingMethod } from 'zrender/lib/tool/morphPath';
declare type ModelFinder = modelUtil.ModelFinder;
export declare const version = "5.0.1";
export declare const dependencies: {
    zrender: string;
};
export declare const PRIORITY: {
    PROCESSOR: {
        FILTER: number;
        SERIES_FILTER: number;
        STATISTIC: number;
    };
    VISUAL: {
        LAYOUT: number;
        PROGRESSIVE_LAYOUT: number;
        GLOBAL: number;
        CHART: number;
        POST_CHART_LAYOUT: number;
        COMPONENT: number;
        BRUSH: number;
        CHART_ITEM: number;
        ARIA: number;
        DECAL: number;
    };
};
declare const IN_MAIN_PROCESS_KEY: "__flagInMainProcess";
declare const OPTION_UPDATED_KEY: "__optionUpdated";
declare const STATUS_NEEDS_UPDATE_KEY: "__needsUpdateStatus";
declare const CONNECT_STATUS_KEY: "__connectUpdateStatus";
interface SetOptionOpts {
    notMerge?: boolean;
    lazyUpdate?: boolean;
    silent?: boolean;
    replaceMerge?: GlobalModelSetOptionOpts['replaceMerge'];
    transition?: SetOptionTransitionOpt;
}
export interface SetOptionTransitionOptItem {
    from?: SetOptionTransitionOptFinder;
    to: SetOptionTransitionOptFinder;
    dividingMethod: MorphDividingMethod;
}
interface SetOptionTransitionOptFinder extends modelUtil.ModelFinderObject {
    dimension: DimensionLoose;
}
declare type SetOptionTransitionOpt = SetOptionTransitionOptItem | SetOptionTransitionOptItem[];
interface PostIniter {
    (chart: EChartsType): void;
}
declare class ECharts extends Eventful {
    id: string;
    group: string;
    private _zr;
    private _dom;
    private _model;
    private _throttledZrFlush;
    private _theme;
    private _locale;
    private _chartsViews;
    private _chartsMap;
    private _componentsViews;
    private _componentsMap;
    private _coordSysMgr;
    private _api;
    private _scheduler;
    private _messageCenter;
    private _pendingActions;
    protected _$eventProcessor: never;
    private _disposed;
    private _loadingFX;
    private _labelManager;
    private [OPTION_UPDATED_KEY];
    private [IN_MAIN_PROCESS_KEY];
    private [CONNECT_STATUS_KEY];
    private [STATUS_NEEDS_UPDATE_KEY];
    constructor(dom: HTMLElement, theme?: string | ThemeOption, opts?: {
        locale?: string | LocaleOption;
        renderer?: RendererType;
        devicePixelRatio?: number;
        useDirtyRect?: boolean;
        width?: number;
        height?: number;
    });
    private _onframe;
    getDom(): HTMLElement;
    getId(): string;
    getZr(): zrender.ZRenderType;
    setOption<Opt extends ECBasicOption>(option: Opt, notMerge?: boolean, lazyUpdate?: boolean): void;
    setOption<Opt extends ECBasicOption>(option: Opt, opts?: SetOptionOpts): void;
    private setTheme;
    private getModel;
    getOption(): ECBasicOption;
    getWidth(): number;
    getHeight(): number;
    getDevicePixelRatio(): number;
    getRenderedCanvas(opts?: {
        backgroundColor?: ZRColor;
        pixelRatio?: number;
    }): HTMLCanvasElement;
    getSvgDataURL(): string;
    getDataURL(opts?: {
        type?: 'png' | 'jpg' | 'svg';
        pixelRatio?: number;
        backgroundColor?: ZRColor;
        excludeComponents?: ComponentMainType[];
    }): string;
    getConnectedDataURL(opts?: {
        type?: 'png' | 'jpg' | 'svg';
        pixelRatio?: number;
        backgroundColor?: ZRColor;
        connectedBackgroundColor?: ZRColor;
        excludeComponents?: string[];
    }): string;
    convertToPixel(finder: ModelFinder, value: ScaleDataValue): number;
    convertToPixel(finder: ModelFinder, value: ScaleDataValue[]): number[];
    convertFromPixel(finder: ModelFinder, value: number): number;
    convertFromPixel(finder: ModelFinder, value: number[]): number[];
    containPixel(finder: ModelFinder, value: number[]): boolean;
    getVisual(finder: ModelFinder, visualType: string): string | number | number[] | import("zrender/lib/graphic/Pattern").PatternObject | import("zrender/lib/graphic/LinearGradient").LinearGradientObject | import("zrender/lib/graphic/RadialGradient").RadialGradientObject;
    private getViewOfComponentModel;
    private getViewOfSeriesModel;
    private _initEvents;
    isDisposed(): boolean;
    clear(): void;
    dispose(): void;
    resize(opts?: {
        width?: number | 'auto';
        height?: number | 'auto';
        silent?: boolean;
    }): void;
    showLoading(cfg?: object): void;
    showLoading(name?: string, cfg?: object): void;
    hideLoading(): void;
    makeActionFromEvent(eventObj: ECEvent): Payload;
    dispatchAction(payload: Payload, opt?: boolean | {
        silent?: boolean;
        flush?: boolean | undefined;
    }): void;
    updateLabelLayout(): void;
    appendData(params: {
        seriesIndex: number;
        data: any;
    }): void;
    private static internalField;
}
export declare function init(dom: HTMLElement, theme?: string | object, opts?: {
    renderer?: RendererType;
    devicePixelRatio?: number;
    width?: number;
    height?: number;
    locale?: string | LocaleOption;
}): EChartsType;
export declare function connect(groupId: string | EChartsType[]): string;
export declare function disConnect(groupId: string): void;
export declare const disconnect: typeof disConnect;
export declare function dispose(chart: EChartsType | HTMLElement | string): void;
export declare function getInstanceByDom(dom: HTMLElement): EChartsType;
export declare function getInstanceById(key: string): EChartsType;
export declare function registerTheme(name: string, theme: ThemeOption): void;
export declare function registerPreprocessor(preprocessorFunc: OptionPreprocessor): void;
export declare function registerProcessor(priority: number | StageHandler | StageHandlerOverallReset, processor?: StageHandler | StageHandlerOverallReset): void;
export declare function registerPostInit(postInitFunc: PostIniter): void;
export declare function registerPostUpdate(postUpdateFunc: PostUpdater): void;
export declare function registerAction(type: string, eventName: string, action: ActionHandler): void;
export declare function registerAction(type: string, action: ActionHandler): void;
export declare function registerAction(actionInfo: ActionInfo, action: ActionHandler): void;
export declare function registerCoordinateSystem(type: string, coordSysCreator: CoordinateSystemCreator): void;
export declare function getCoordinateSystemDimensions(type: string): DimensionDefinitionLoose[];
export { registerLocale } from './locale';
declare function registerLayout(priority: number, layoutTask: StageHandler | StageHandlerOverallReset): void;
declare function registerLayout(layoutTask: StageHandler | StageHandlerOverallReset): void;
declare function registerVisual(priority: number, layoutTask: StageHandler | StageHandlerOverallReset): void;
declare function registerVisual(layoutTask: StageHandler | StageHandlerOverallReset): void;
export { registerLayout, registerVisual };
export declare function registerLoading(name: string, loadingFx: LoadingEffectCreator): void;
export declare function setCanvasCreator(creator: () => HTMLCanvasElement): void;
export declare function registerMap(mapName: Parameters<typeof mapDataStorage.registerMap>[0], geoJson: Parameters<typeof mapDataStorage.registerMap>[1], specialAreas?: Parameters<typeof mapDataStorage.registerMap>[2]): void;
export declare function getMap(mapName: string): {
    geoJson: any;
    specialAreas: import("../coord/geo/geoTypes").GeoSpecialAreas;
};
export declare const registerTransform: typeof registerExternalTransform;
export declare const dataTool: {};
export interface EChartsType extends ECharts {
}
