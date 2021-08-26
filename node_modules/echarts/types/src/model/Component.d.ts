import Model from './Model';
import * as componentUtil from '../util/component';
import { ExtendableConstructor, ClassManager } from '../util/clazz';
import { QueryReferringOpt } from '../util/model';
import GlobalModel from './Global';
import { ComponentOption, ComponentMainType, ComponentSubType, ComponentFullType, ComponentLayoutMode } from '../util/types';
declare class ComponentModel<Opt extends ComponentOption = ComponentOption> extends Model<Opt> {
    type: ComponentFullType;
    id: string;
    name: string;
    mainType: ComponentMainType;
    subType: ComponentSubType;
    componentIndex: number;
    protected defaultOption: ComponentOption;
    ecModel: GlobalModel;
    static dependencies: string[];
    readonly uid: string;
    static layoutMode: ComponentLayoutMode | ComponentLayoutMode['type'];
    preventAutoZ: boolean;
    __viewId: string;
    __requireNewView: boolean;
    static protoInitialize: void;
    constructor(option: Opt, parentModel: Model, ecModel: GlobalModel);
    init(option: Opt, parentModel: Model, ecModel: GlobalModel): void;
    mergeDefaultAndTheme(option: Opt, ecModel: GlobalModel): void;
    mergeOption(option: Opt, ecModel: GlobalModel): void;
    optionUpdated(newCptOption: Opt, isInit: boolean): void;
    getDefaultOption(): Opt;
    getReferringComponents(mainType: ComponentMainType, opt: QueryReferringOpt): {
        models: ComponentModel[];
        specified: boolean;
    };
    getBoxLayoutParams(): {
        left: string | number;
        top: string | number;
        right: string | number;
        bottom: string | number;
        width: string | number;
        height: string | number;
    };
    static registerClass: ClassManager['registerClass'];
    static hasClass: ClassManager['hasClass'];
    static registerSubTypeDefaulter: componentUtil.SubTypeDefaulterManager['registerSubTypeDefaulter'];
}
export declare type ComponentModelConstructor = typeof ComponentModel & ClassManager & componentUtil.SubTypeDefaulterManager & ExtendableConstructor & componentUtil.TopologicalTravelable<object>;
export default ComponentModel;
