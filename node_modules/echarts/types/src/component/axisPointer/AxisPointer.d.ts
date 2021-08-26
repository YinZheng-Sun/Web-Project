import { AxisBaseModel } from '../../coord/AxisBaseModel';
import ExtensionAPI from '../../core/ExtensionAPI';
import { CommonAxisPointerOption } from '../../util/types';
import Model from '../../model/Model';
export interface AxisPointer {
    render(axisModel: AxisBaseModel, axisPointerModel: Model<CommonAxisPointerOption>, api: ExtensionAPI, forceRender?: boolean): void;
    remove(api: ExtensionAPI): void;
    dispose(api: ExtensionAPI): void;
}
