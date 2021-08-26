import ExtensionAPI from '../../core/ExtensionAPI';
import { TooltipOption } from './TooltipModel';
import Model from '../../model/Model';
import { ZRColor } from '../../util/types';
interface TooltipContentOption {
    appendToBody: boolean;
}
declare class TooltipHTMLContent {
    el: HTMLDivElement;
    private _container;
    private _show;
    private _styleCoord;
    private _appendToBody;
    private _enterable;
    private _zr;
    private _hideTimeout;
    private _hideDelay;
    private _inContent;
    private _firstShow;
    private _longHide;
    private _longHideTimeout;
    constructor(container: HTMLElement, api: ExtensionAPI, opt: TooltipContentOption);
    update(tooltipModel: Model<TooltipOption>): void;
    show(tooltipModel: Model<TooltipOption>, nearPointColor: ZRColor): void;
    setContent(content: string | HTMLElement[], markers: unknown, tooltipModel: Model<TooltipOption>, borderColor?: ZRColor, arrowPosition?: TooltipOption['position']): void;
    setEnterable(enterable: boolean): void;
    getSize(): number[];
    moveTo(zrX: number, zrY: number): void;
    _moveIfResized(): void;
    hide(): void;
    hideLater(time?: number): void;
    isShow(): boolean;
    dispose(): void;
    getOuterSize(): {
        width: number;
        height: number;
    };
}
export default TooltipHTMLContent;
