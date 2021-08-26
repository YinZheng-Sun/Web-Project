import Model from '../../model/Model';
import { getLayoutRect } from '../../util/layout';
import { enableDataStack, isDimensionStacked, getStackedDimension } from '../../data/helper/dataStackHelper';
import SeriesModel from '../../model/Series';
import { AxisBaseModel } from '../../coord/AxisBaseModel';
import { getECData } from '../../util/innerStore';
import { DisplayState, TextCommonOption } from '../../util/types';
export declare function createList(seriesModel: SeriesModel): import("../../data/List").default<Model<any>, import("../../data/List").DefaultDataVisual>;
export { getLayoutRect };
export { default as createDimensions } from '../../data/helper/createDimensions';
export declare const dataStack: {
    isDimensionStacked: typeof isDimensionStacked;
    enableDataStack: typeof enableDataStack;
    getStackedDimension: typeof getStackedDimension;
};
export { createSymbol } from '../../util/symbol';
export declare function createScale(dataExtent: number[], option: object | AxisBaseModel): import("../../scale/Scale").default<import("zrender/lib/core/types").Dictionary<unknown>>;
export declare function mixinAxisModelCommonMethods(Model: Model): void;
export { getECData };
export { enableHoverEmphasis } from '../../util/states';
export declare function createTextStyle(textStyleModel: Model<TextCommonOption>, opts?: {
    state?: DisplayState;
}): import("zrender/lib/graphic/Text").TextStyleProps;
