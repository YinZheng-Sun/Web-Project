import ExtensionAPI from '../../core/ExtensionAPI';
import { TooltipOption } from './TooltipModel';
import { ZRColor } from '../../util/types';
import Model from '../../model/Model';
import ZRText from 'zrender/lib/graphic/Text';
import { TooltipMarkupStyleCreator } from './tooltipMarkup';
declare class TooltipRichContent {
    private _zr;
    private _show;
    private _styleCoord;
    private _hideTimeout;
    private _enterable;
    private _inContent;
    private _hideDelay;
    el: ZRText;
    constructor(api: ExtensionAPI);
    update(tooltipModel: Model<TooltipOption>): void;
    show(): void;
    setContent(content: string | HTMLElement[], markupStyleCreator: TooltipMarkupStyleCreator, tooltipModel: Model<TooltipOption>, borderColor: ZRColor, arrowPosition: TooltipOption['position']): void;
    setEnterable(enterable?: boolean): void;
    getSize(): number[];
    moveTo(x: number, y: number): void;
    _moveIfResized(): void;
    hide(): void;
    hideLater(time?: number): void;
    isShow(): boolean;
    getOuterSize(): {
        width: number;
        height: number;
    };
    dispose(): void;
}
export default TooltipRichContent;
