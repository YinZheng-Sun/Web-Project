import { ToolboxFeature, ToolboxFeatureOption } from '../featureManager';
import { SeriesOption } from '../../../util/types';
import GlobalModel from '../../../model/Global';
import ExtensionAPI from '../../../core/ExtensionAPI';
declare const ICON_TYPES: readonly ["line", "bar", "stack"];
declare const TITLE_TYPES: readonly ["line", "bar", "stack", "tiled"];
declare type IconType = typeof ICON_TYPES[number];
declare type TitleType = typeof TITLE_TYPES[number];
export interface ToolboxMagicTypeFeatureOption extends ToolboxFeatureOption {
    type?: IconType[];
    icon?: {
        [key in IconType]?: string;
    };
    title?: {
        [key in TitleType]?: string;
    };
    option?: {
        [key in IconType]?: SeriesOption;
    };
    seriesIndex?: {
        line?: number;
        bar?: number;
    };
}
declare class MagicType extends ToolboxFeature<ToolboxMagicTypeFeatureOption> {
    getIcons(): {
        line?: string;
        stack?: string;
        bar?: string;
    };
    static getDefaultOption(ecModel: GlobalModel): ToolboxMagicTypeFeatureOption;
    onclick(ecModel: GlobalModel, api: ExtensionAPI, type: IconType): void;
}
export default MagicType;
