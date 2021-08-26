import * as graphic from '../../util/graphic';
import { AxisPointer } from './AxisPointer';
import { AxisBaseModel } from '../../coord/AxisBaseModel';
import ExtensionAPI from '../../core/ExtensionAPI';
import Element from 'zrender/lib/Element';
import { VerticalAlign, HorizontalAlign, CommonAxisPointerOption } from '../../util/types';
import { PathProps } from 'zrender/lib/graphic/Path';
import Model from '../../model/Model';
import { TextProps } from 'zrender/lib/graphic/Text';
interface Transform {
    x: number;
    y: number;
    rotation: number;
}
declare type AxisValue = CommonAxisPointerOption['value'];
declare type AxisPointerModel = Model<CommonAxisPointerOption>;
interface BaseAxisPointer {
    getHandleTransform(value: AxisValue, axisModel: AxisBaseModel, axisPointerModel: AxisPointerModel): Transform;
    updateHandleTransform(transform: Transform, delta: number[], axisModel: AxisBaseModel, axisPointerModel: AxisPointerModel): Transform & {
        cursorPoint: number[];
        tooltipOption?: {
            verticalAlign?: VerticalAlign;
            align?: HorizontalAlign;
        };
    };
}
export interface AxisPointerElementOptions {
    graphicKey: string;
    pointer: PathProps & {
        type: 'Line' | 'Rect' | 'Circle' | 'Sector';
    };
    label: TextProps;
}
declare class BaseAxisPointer implements AxisPointer {
    private _group;
    private _lastGraphicKey;
    private _handle;
    private _dragging;
    private _lastValue;
    private _lastStatus;
    private _payloadInfo;
    private _moveAnimation;
    private _axisModel;
    private _axisPointerModel;
    private _api;
    protected animationThreshold: number;
    render(axisModel: AxisBaseModel, axisPointerModel: AxisPointerModel, api: ExtensionAPI, forceRender?: boolean): void;
    remove(api: ExtensionAPI): void;
    dispose(api: ExtensionAPI): void;
    determineAnimation(axisModel: AxisBaseModel, axisPointerModel: AxisPointerModel): boolean;
    makeElOption(elOption: AxisPointerElementOptions, value: AxisValue, axisModel: AxisBaseModel, axisPointerModel: AxisPointerModel, api: ExtensionAPI): void;
    createPointerEl(group: graphic.Group, elOption: AxisPointerElementOptions, axisModel: AxisBaseModel, axisPointerModel: AxisPointerModel): void;
    createLabelEl(group: graphic.Group, elOption: AxisPointerElementOptions, axisModel: AxisBaseModel, axisPointerModel: AxisPointerModel): void;
    updatePointerEl(group: graphic.Group, elOption: AxisPointerElementOptions, updateProps: (el: Element, props: PathProps) => void): void;
    updateLabelEl(group: graphic.Group, elOption: AxisPointerElementOptions, updateProps: (el: Element, props: PathProps) => void, axisPointerModel: AxisPointerModel): void;
    _renderHandle(value: AxisValue): void;
    private _moveHandleToValue;
    private _onHandleDragMove;
    _doDispatchAxisPointer(): void;
    private _onHandleDragEnd;
    clear(api: ExtensionAPI): void;
    doClear(): void;
    buildLabel(xy: number[], wh: number[], xDimIndex: 0 | 1): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
export default BaseAxisPointer;
