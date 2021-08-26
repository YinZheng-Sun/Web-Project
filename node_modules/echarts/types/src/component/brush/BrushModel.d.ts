import { ComponentOption, ZRColor, VisualOptionFixed } from '../../util/types';
import ComponentModel from '../../model/Component';
import BrushTargetManager from '../helper/BrushTargetManager';
import { BrushCoverCreatorConfig, BrushMode, BrushCoverConfig, BrushDimensionMinMax, BrushAreaRange, BrushTypeUncertain, BrushType } from '../helper/BrushController';
import { ModelFinderObject } from '../../util/model';
export interface BrushAreaParam extends ModelFinderObject {
    brushType: BrushCoverConfig['brushType'];
    id?: BrushCoverConfig['id'];
    range?: BrushCoverConfig['range'];
    panelId?: BrushCoverConfig['panelId'];
    coordRange?: BrushAreaRange;
    coordRanges?: BrushAreaRange[];
}
export interface BrushAreaParamInternal extends BrushAreaParam {
    brushMode: BrushMode;
    brushStyle: BrushCoverConfig['brushStyle'];
    transformable: BrushCoverConfig['transformable'];
    removeOnClick: BrushCoverConfig['removeOnClick'];
    z: BrushCoverConfig['z'];
    __rangeOffset?: {
        offset: BrushDimensionMinMax | BrushDimensionMinMax[];
        xyMinMax: BrushDimensionMinMax[];
    };
}
export declare type BrushToolboxIconType = BrushType | 'keep' | 'clear';
export interface BrushOption extends ComponentOption, ModelFinderObject {
    mainType?: 'brush';
    toolbox?: BrushToolboxIconType[];
    brushLink?: number[] | 'all' | 'none';
    throttleType?: 'fixRate' | 'debounce';
    throttleDelay?: number;
    inBrush?: VisualOptionFixed;
    outOfBrush?: VisualOptionFixed;
    brushType?: BrushTypeUncertain;
    brushStyle?: {
        borderWidth?: number;
        color?: ZRColor;
        borderColor?: ZRColor;
    };
    transformable?: boolean;
    brushMode?: BrushMode;
    removeOnClick?: boolean;
}
declare class BrushModel extends ComponentModel<BrushOption> {
    static type: "brush";
    type: "brush";
    static dependencies: string[];
    static defaultOption: BrushOption;
    areas: BrushAreaParamInternal[];
    brushType: BrushTypeUncertain;
    brushOption: BrushCoverCreatorConfig;
    brushTargetManager: BrushTargetManager;
    optionUpdated(newOption: BrushOption, isInit: boolean): void;
    setAreas(areas?: BrushAreaParam[]): void;
    setBrushOption(brushOption: BrushCoverCreatorConfig): void;
}
export default BrushModel;
