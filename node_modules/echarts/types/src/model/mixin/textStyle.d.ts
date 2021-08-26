import * as graphicUtil from '../../util/graphic';
import Model from '../Model';
import { LabelOption, ColorString } from '../../util/types';
export declare type LabelFontOption = Pick<LabelOption, 'fontStyle' | 'fontWeight' | 'fontSize' | 'fontFamily'>;
declare type LabelRectRelatedOption = Pick<LabelOption, 'align' | 'verticalAlign' | 'padding' | 'lineHeight' | 'baseline' | 'rich'> & LabelFontOption;
declare class TextStyleMixin {
    getTextColor(this: Model, isEmphasis?: boolean): ColorString;
    getFont(this: Model<LabelFontOption>): string;
    getTextRect(this: Model<LabelRectRelatedOption> & TextStyleMixin, text: string): graphicUtil.BoundingRect;
}
export default TextStyleMixin;
