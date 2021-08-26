import { ZRStyleProps } from './types';
import { ElementTextConfig } from 'zrender/lib/Element';
import { TextStyleProps, TextProps } from 'zrender/lib/graphic/Text';
import { ItemStyleProps } from '../model/mixin/itemStyle';
export interface LegacyStyleProps {
    legacy?: boolean;
}
export declare function isEC4CompatibleStyle(style: ZRStyleProps & LegacyStyleProps, elType: string, hasOwnTextContentOption: boolean, hasOwnTextConfig: boolean): boolean;
export declare function convertFromEC4CompatibleStyle(hostStyle: ZRStyleProps, elType: string, isNormal: boolean): {
    textContent: TextProps & {
        type: string;
    };
    textConfig: ElementTextConfig;
};
export declare function convertToEC4StyleForCustomSerise(itemStl: ItemStyleProps, txStl: TextStyleProps, txCfg: ElementTextConfig): ZRStyleProps;
export declare function warnDeprecated(deprecated: string, insteadApproach: string): void;
