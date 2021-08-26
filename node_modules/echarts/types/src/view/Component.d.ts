import * as clazzUtil from '../util/clazz';
import ComponentModel from '../model/Component';
import GlobalModel from '../model/Global';
import ExtensionAPI from '../core/ExtensionAPI';
import { Payload, ViewRootGroup, ECEvent, EventQueryItem } from '../util/types';
import Element from 'zrender/lib/Element';
import SeriesModel from '../model/Series';
interface ComponentView {
    updateTransform?(seriesModel: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void | {
        update: true;
    };
    filterForExposedEvent(eventType: string, query: EventQueryItem, targetEl: Element, packedEvent: ECEvent): boolean;
}
declare class ComponentView {
    readonly group: ViewRootGroup;
    readonly uid: string;
    __model: ComponentModel;
    __alive: boolean;
    __id: string;
    constructor();
    init(ecModel: GlobalModel, api: ExtensionAPI): void;
    render(model: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    dispose(ecModel: GlobalModel, api: ExtensionAPI): void;
    updateView(model: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    updateLayout(model: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    updateVisual(model: ComponentModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    blurSeries(seriesModels: SeriesModel[], ecModel: GlobalModel): void;
    static registerClass: clazzUtil.ClassManager['registerClass'];
}
export declare type ComponentViewConstructor = typeof ComponentView & clazzUtil.ExtendableConstructor & clazzUtil.ClassManager;
export default ComponentView;
