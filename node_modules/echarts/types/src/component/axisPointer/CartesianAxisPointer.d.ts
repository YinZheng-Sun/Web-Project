import BaseAxisPointer, { AxisPointerElementOptions } from './BaseAxisPointer';
import CartesianAxisModel from '../../coord/cartesian/AxisModel';
import ExtensionAPI from '../../core/ExtensionAPI';
import { ScaleDataValue, VerticalAlign, HorizontalAlign, CommonAxisPointerOption } from '../../util/types';
import Model from '../../model/Model';
declare type AxisPointerModel = Model<CommonAxisPointerOption>;
declare class CartesianAxisPointer extends BaseAxisPointer {
    makeElOption(elOption: AxisPointerElementOptions, value: ScaleDataValue, axisModel: CartesianAxisModel, axisPointerModel: AxisPointerModel, api: ExtensionAPI): void;
    getHandleTransform(value: ScaleDataValue, axisModel: CartesianAxisModel, axisPointerModel: AxisPointerModel): {
        x: number;
        y: number;
        rotation: number;
    };
    updateHandleTransform(transform: {
        x: number;
        y: number;
        rotation: number;
    }, delta: number[], axisModel: CartesianAxisModel, axisPointerModel: AxisPointerModel): {
        x: number;
        y: number;
        rotation: number;
        cursorPoint: number[];
        tooltipOption: {
            verticalAlign?: VerticalAlign;
            align?: HorizontalAlign;
        };
    };
}
export default CartesianAxisPointer;
