import { HashMap } from 'zrender/lib/core/util';
import Model from './Model';
import ComponentModel from './Component';
import SeriesModel from './Series';
import { Payload, OptionPreprocessor, ECBasicOption, ECUnitOption, ComponentMainType, ComponentSubType, OptionId, OptionName } from '../util/types';
import OptionManager from './OptionManager';
import Scheduler from '../core/Scheduler';
import { LocaleOption } from '../core/locale';
import { PaletteMixin } from './mixin/palette';
export interface GlobalModelSetOptionOpts {
    replaceMerge: ComponentMainType | ComponentMainType[];
}
export interface InnerSetOptionOpts {
    replaceMergeMainTypeMap: HashMap<boolean, string>;
}
declare class GlobalModel extends Model<ECUnitOption> {
    option: ECUnitOption;
    private _theme;
    private _locale;
    private _optionManager;
    private _componentsMap;
    private _componentsCount;
    private _seriesIndices;
    private _seriesIndicesMap;
    private _payload;
    scheduler: Scheduler;
    init(option: ECBasicOption, parentModel: Model, ecModel: GlobalModel, theme: object, locale: object, optionManager: OptionManager): void;
    setOption(option: ECBasicOption, opts: GlobalModelSetOptionOpts, optionPreprocessorFuncs: OptionPreprocessor[]): void;
    resetOption(type: 'recreate' | 'timeline' | 'media', opt?: Pick<GlobalModelSetOptionOpts, 'replaceMerge'>): boolean;
    private _resetOption;
    mergeOption(option: ECUnitOption): void;
    private _mergeOption;
    getOption(): ECUnitOption;
    getTheme(): Model;
    getLocaleModel(): Model<LocaleOption>;
    getLocale(localePosition: Parameters<Model<LocaleOption>['get']>[0]): any;
    setUpdatePayload(payload: Payload): void;
    getUpdatePayload(): Payload;
    getComponent(mainType: ComponentMainType, idx?: number): ComponentModel;
    queryComponents(condition: QueryConditionKindB): ComponentModel[];
    findComponents(condition: QueryConditionKindA): ComponentModel[];
    eachComponent<T>(cb: EachComponentAllCallback, context?: T): void;
    eachComponent<T>(mainType: string, cb: EachComponentInMainTypeCallback, context?: T): void;
    eachComponent<T>(mainType: QueryConditionKindA, cb: EachComponentInMainTypeCallback, context?: T): void;
    getSeriesByName(name: OptionName): SeriesModel[];
    getSeriesByIndex(seriesIndex: number): SeriesModel;
    getSeriesByType(subType: ComponentSubType): SeriesModel[];
    getSeries(): SeriesModel[];
    getSeriesCount(): number;
    eachSeries<T>(cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void, context?: T): void;
    eachRawSeries<T>(cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void, context?: T): void;
    eachSeriesByType<T>(subType: ComponentSubType, cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void, context?: T): void;
    eachRawSeriesByType<T>(subType: ComponentSubType, cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void, context?: T): void;
    isSeriesFiltered(seriesModel: SeriesModel): boolean;
    getCurrentSeriesIndices(): number[];
    filterSeries<T>(cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => boolean, context?: T): void;
    restoreData(payload?: Payload): void;
    private static internalField;
}
export interface QueryConditionKindA {
    mainType: ComponentMainType;
    subType?: ComponentSubType;
    query?: {
        [k: string]: number | number[] | string | string[];
    };
    filter?: (cmpt: ComponentModel) => boolean;
}
export interface QueryConditionKindB {
    mainType: ComponentMainType;
    subType?: ComponentSubType;
    index?: number | number[];
    id?: OptionId | OptionId[];
    name?: OptionName | OptionName[];
}
export interface EachComponentAllCallback {
    (mainType: string, model: ComponentModel, componentIndex: number): void;
}
interface EachComponentInMainTypeCallback {
    (model: ComponentModel, componentIndex: number): void;
}
interface GlobalModel extends PaletteMixin<ECUnitOption> {
}
export default GlobalModel;
