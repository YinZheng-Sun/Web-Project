import * as graphic from '../../util/graphic';
import ComponentView from '../../view/Component';
import LegendModel, { LegendOption, LegendSelectorButtonOption } from './LegendModel';
import GlobalModel from '../../model/Global';
import ExtensionAPI from '../../core/ExtensionAPI';
import { ZRRectLike } from '../../util/types';
declare class LegendView extends ComponentView {
    static type: string;
    type: string;
    newlineDisabled: boolean;
    private _contentGroup;
    private _backgroundEl;
    private _selectorGroup;
    private _isFirstRender;
    init(): void;
    getContentGroup(): graphic.Group;
    getSelectorGroup(): graphic.Group;
    render(legendModel: LegendModel, ecModel: GlobalModel, api: ExtensionAPI): void;
    protected resetInner(): void;
    protected renderInner(itemAlign: LegendOption['align'], legendModel: LegendModel, ecModel: GlobalModel, api: ExtensionAPI, selector: LegendSelectorButtonOption[], orient: LegendOption['orient'], selectorPosition: LegendOption['selectorPosition']): void;
    private _createSelector;
    private _createItem;
    protected layoutInner(legendModel: LegendModel, itemAlign: LegendOption['align'], maxSize: {
        width: number;
        height: number;
    }, isFirstRender: boolean, selector: LegendOption['selector'], selectorPosition: LegendOption['selectorPosition']): ZRRectLike;
    remove(): void;
}
export default LegendView;
