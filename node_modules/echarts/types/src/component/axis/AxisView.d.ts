import ComponentView from '../../view/Component';
import { AxisBaseModel } from '../../coord/AxisBaseModel';
import GlobalModel from '../../model/Global';
import ExtensionAPI from '../../core/ExtensionAPI';
import { Payload } from '../../util/types';
import type BaseAxisPointer from '../axisPointer/BaseAxisPointer';
interface AxisPointerConstructor {
    new (): BaseAxisPointer;
}
declare class AxisView extends ComponentView {
    static type: string;
    type: string;
    private _axisPointer;
    axisPointerClass: string;
    render(axisModel: AxisBaseModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    updateAxisPointer(axisModel: AxisBaseModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    remove(ecModel: GlobalModel, api: ExtensionAPI): void;
    dispose(ecModel: GlobalModel, api: ExtensionAPI): void;
    private _doUpdateAxisPointerClass;
    private _disposeAxisPointer;
    static registerAxisPointerClass(type: string, clazz: AxisPointerConstructor): void;
    static getAxisPointerClass(type: string): AxisPointerConstructor;
}
export default AxisView;
