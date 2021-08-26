import { ComponentOption, BoxLayoutOptionMixin, ZRTextAlign, ZRTextVerticalAlign, ZRColor, BorderOptionMixin, LabelOption } from '../../util/types';
import { EChartsExtensionInstallRegisters } from '../../extension';
export interface TitleOption extends ComponentOption, BoxLayoutOptionMixin, BorderOptionMixin {
    mainType?: 'title';
    show?: boolean;
    text?: string;
    link?: string;
    target?: 'self' | 'blank';
    subtext?: string;
    sublink?: string;
    subtarget?: 'self' | 'blank';
    textAlign?: ZRTextAlign;
    textVerticalAlign?: ZRTextVerticalAlign;
    textBaseline?: ZRTextVerticalAlign;
    backgroundColor?: ZRColor;
    padding?: number | number[];
    itemGap?: number;
    textStyle?: LabelOption;
    subtextStyle?: LabelOption;
    triggerEvent?: boolean;
    borderRadius?: number | number[];
}
export declare function install(registers: EChartsExtensionInstallRegisters): void;
