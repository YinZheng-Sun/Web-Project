import * as clazzUtil from '../util/clazz';
import SeriesModel from '../model/Series';
import GlobalModel from '../model/Global';
import ExtensionAPI from '../core/ExtensionAPI';
import Element from 'zrender/lib/Element';
import { Payload, ViewRootGroup, ECEvent, EventQueryItem, StageHandlerProgressParams } from '../util/types';
import { SeriesTask } from '../core/Scheduler';
interface ChartView {
    incrementalPrepareRender(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    incrementalRender(params: StageHandlerProgressParams, seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    updateTransform(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void | {
        update: true;
    };
    containPoint(point: number[], seriesModel: SeriesModel): boolean;
    filterForExposedEvent(eventType: string, query: EventQueryItem, targetEl: Element, packedEvent: ECEvent): boolean;
}
declare class ChartView {
    type: string;
    readonly group: ViewRootGroup;
    readonly uid: string;
    readonly renderTask: SeriesTask;
    ignoreLabelLineUpdate: boolean;
    __alive: boolean;
    __model: SeriesModel;
    __id: string;
    static protoInitialize: void;
    constructor();
    init(ecModel: GlobalModel, api: ExtensionAPI): void;
    render(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    highlight(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    downplay(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    remove(ecModel: GlobalModel, api: ExtensionAPI): void;
    dispose(ecModel: GlobalModel, api: ExtensionAPI): void;
    updateView(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    updateLayout(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    updateVisual(seriesModel: SeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    static markUpdateMethod(payload: Payload, methodName: keyof ChartView): void;
    static registerClass: clazzUtil.ClassManager['registerClass'];
}
export declare type ChartViewConstructor = typeof ChartView & clazzUtil.ExtendableConstructor & clazzUtil.ClassManager;
export default ChartView;
