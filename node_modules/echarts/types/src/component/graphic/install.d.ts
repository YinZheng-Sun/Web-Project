import { ComponentOption, BoxLayoutOptionMixin, Dictionary, ZRStyleProps, OptionId } from '../../util/types';
import Element, { ElementTextConfig } from 'zrender/lib/Element';
import Displayable from 'zrender/lib/graphic/Displayable';
import { PathProps } from 'zrender/lib/graphic/Path';
import { ImageStyleProps } from 'zrender/lib/graphic/Image';
import { TextStyleProps } from 'zrender/lib/graphic/Text';
import { EChartsExtensionInstallRegisters } from '../../extension';
declare const TRANSFORM_PROPS: {
    readonly x: 1;
    readonly y: 1;
    readonly scaleX: 1;
    readonly scaleY: 1;
    readonly originX: 1;
    readonly originY: 1;
    readonly rotation: 1;
};
declare type TransformProp = keyof typeof TRANSFORM_PROPS;
interface GraphicComponentBaseElementOption extends Partial<Pick<Element, TransformProp | 'silent' | 'ignore' | 'draggable' | 'textConfig' | 'onclick' | 'ondblclick' | 'onmouseover' | 'onmouseout' | 'onmousemove' | 'onmousewheel' | 'onmousedown' | 'onmouseup' | 'oncontextmenu' | 'ondrag' | 'ondragstart' | 'ondragend' | 'ondragenter' | 'ondragleave' | 'ondragover' | 'ondrop'>>, Partial<Pick<BoxLayoutOptionMixin, 'left' | 'right' | 'top' | 'bottom'>> {
    type?: string;
    id?: OptionId;
    name?: string;
    parentId?: OptionId;
    parentOption?: GraphicComponentElementOption;
    children?: GraphicComponentElementOption[];
    hv?: [boolean, boolean];
    bounding?: 'raw' | 'all';
    info?: GraphicExtraElementInfo;
    textContent?: GraphicComponentTextOption;
    textConfig?: ElementTextConfig;
    $action?: 'merge' | 'replace' | 'remove';
}
interface GraphicComponentDisplayableOption extends GraphicComponentBaseElementOption, Partial<Pick<Displayable, 'zlevel' | 'z' | 'z2' | 'invisible' | 'cursor'>> {
    style?: ZRStyleProps;
}
interface GraphicComponentGroupOption extends GraphicComponentBaseElementOption {
    type?: 'group';
    width?: number;
    height?: number;
    children: GraphicComponentElementOption[];
}
export interface GraphicComponentZRPathOption extends GraphicComponentDisplayableOption {
    shape?: PathProps['shape'];
}
export interface GraphicComponentImageOption extends GraphicComponentDisplayableOption {
    type?: 'image';
    style?: ImageStyleProps;
}
interface GraphicComponentTextOption extends Omit<GraphicComponentDisplayableOption, 'textContent' | 'textConfig'> {
    type?: 'text';
    style?: TextStyleProps;
}
declare type GraphicComponentElementOption = GraphicComponentGroupOption | GraphicComponentZRPathOption | GraphicComponentImageOption | GraphicComponentTextOption;
declare type GraphicExtraElementInfo = Dictionary<unknown>;
export declare type GraphicComponentLooseOption = (GraphicComponentOption | GraphicComponentElementOption) & {
    mainType?: 'graphic';
};
export interface GraphicComponentOption extends ComponentOption {
    elements?: GraphicComponentElementOption[];
}
export declare function install(registers: EChartsExtensionInstallRegisters): void;
export {};
