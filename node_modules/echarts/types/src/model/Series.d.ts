import type { MorphDividingMethod } from 'zrender/lib/tool/morphPath';
import { DataHost, DimensionName, SeriesOption, ZRColor, ScaleDataValue, SeriesDataType, DimensionLoose } from '../util/types';
import ComponentModel from './Component';
import { PaletteMixin } from './mixin/palette';
import { DataFormatMixin } from '../model/mixin/dataFormat';
import Model from '../model/Model';
import GlobalModel from './Global';
import { CoordinateSystem } from '../coord/CoordinateSystem';
import { ExtendableConstructor, Constructor } from '../util/clazz';
import { PipelineContext, SeriesTask } from '../core/Scheduler';
import LegendVisualProvider from '../visual/LegendVisualProvider';
import List from '../data/List';
import Axis from '../coord/Axis';
import type { BrushCommonSelectorsForSeries, BrushSelectableArea } from '../component/brush/selector';
import makeStyleMapper from './mixin/makeStyleMapper';
import { Source } from '../data/Source';
interface SeriesModel {
    preventIncremental(): boolean;
    getTooltipPosition(dataIndex: number): number[];
    getAxisTooltipData(dim: DimensionName[], value: ScaleDataValue, baseAxis: Axis): {
        dataIndices: number[];
        nestestValue: any;
    };
    getMarkerPosition(value: ScaleDataValue[]): number[];
    brushSelector(dataIndex: number, data: List, selectors: BrushCommonSelectorsForSeries, area: BrushSelectableArea): boolean;
    enableAriaDecal(): void;
}
declare class SeriesModel<Opt extends SeriesOption = SeriesOption> extends ComponentModel<Opt> {
    type: string;
    defaultOption: SeriesOption;
    seriesIndex: number;
    coordinateSystem: CoordinateSystem;
    dataTask: SeriesTask;
    pipelineContext: PipelineContext;
    __transientTransitionOpt: {
        from: DimensionLoose;
        to: DimensionLoose;
        dividingMethod: MorphDividingMethod;
    };
    legendVisualProvider: LegendVisualProvider;
    visualStyleAccessPath: string;
    visualDrawType: 'fill' | 'stroke';
    visualStyleMapper: ReturnType<typeof makeStyleMapper>;
    ignoreStyleOnData: boolean;
    useColorPaletteOnData: boolean;
    hasSymbolVisual: boolean;
    defaultSymbol: string;
    legendSymbol: string;
    private _selectedDataIndicesMap;
    readonly preventUsingHoverLayer: boolean;
    static protoInitialize: void;
    init(option: Opt, parentModel: Model, ecModel: GlobalModel): void;
    mergeDefaultAndTheme(option: Opt, ecModel: GlobalModel): void;
    mergeOption(newSeriesOption: Opt, ecModel: GlobalModel): void;
    fillDataTextStyle(data: ArrayLike<any>): void;
    getInitialData(option: Opt, ecModel: GlobalModel): List;
    appendData(params: {
        data: ArrayLike<any>;
    }): void;
    getData(dataType?: SeriesDataType): List<this>;
    getAllData(): ({
        data: List;
        type?: SeriesDataType;
    })[];
    setData(data: List): void;
    getSource(): Source;
    getRawData(): List;
    getBaseAxis(): Axis;
    formatTooltip(dataIndex: number, multipleSeries?: boolean, dataType?: SeriesDataType): ReturnType<DataFormatMixin['formatTooltip']>;
    isAnimationEnabled(): boolean;
    restoreData(): void;
    getColorFromPalette(name: string, scope: any, requestColorNum?: number): ZRColor;
    coordDimToDataDim(coordDim: DimensionName): DimensionName[];
    getProgressive(): number | false;
    getProgressiveThreshold(): number;
    select(innerDataIndices: number[], dataType?: SeriesDataType): void;
    unselect(innerDataIndices: number[], dataType?: SeriesDataType): void;
    toggleSelect(innerDataIndices: number[], dataType?: SeriesDataType): void;
    getSelectedDataIndices(): number[];
    isSelected(dataIndex: number, dataType?: SeriesDataType): boolean;
    private _innerSelect;
    private _initSelectedMapFromData;
    static registerClass(clz: Constructor): Constructor;
}
interface SeriesModel<Opt extends SeriesOption = SeriesOption> extends DataFormatMixin, PaletteMixin<Opt>, DataHost {
    getShadowDim?(): string;
}
export declare type SeriesModelConstructor = typeof SeriesModel & ExtendableConstructor;
export default SeriesModel;
