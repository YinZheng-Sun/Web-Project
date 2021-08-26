import BoundingRect, { RectLike } from 'zrender/lib/core/BoundingRect';
import { BrushType } from '../helper/BrushController';
import { BrushAreaParamInternal } from './BrushModel';
export interface BrushSelectableArea extends BrushAreaParamInternal {
    boundingRect: BoundingRect;
    selectors: BrushCommonSelectorsForSeries;
}
interface BrushSelectorOnBrushType {
    point(itemLayout: number[], selectors: BrushCommonSelectorsForSeries, area: BrushSelectableArea): boolean;
    rect(itemLayout: RectLike, selectors: BrushCommonSelectorsForSeries, area: BrushSelectableArea): boolean;
}
export interface BrushCommonSelectorsForSeries {
    point(itemLayout: number[]): boolean;
    rect(itemLayout: RectLike): boolean;
}
export declare function makeBrushCommonSelectorForSeries(area: BrushSelectableArea): BrushCommonSelectorsForSeries;
declare const selector: Record<BrushType, BrushSelectorOnBrushType>;
export default selector;
