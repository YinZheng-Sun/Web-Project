import { ClassManager } from './clazz';
import { ComponentOption, ComponentMainType, ComponentSubType } from './types';
export declare function getUID(type: string): string;
export interface SubTypeDefaulter {
    (option: ComponentOption): ComponentSubType;
}
export interface SubTypeDefaulterManager {
    registerSubTypeDefaulter: (componentType: string, defaulter: SubTypeDefaulter) => void;
    determineSubType: (componentType: string, option: ComponentOption) => string;
}
export declare function enableSubTypeDefaulter(target: SubTypeDefaulterManager & ClassManager): void;
export interface TopologicalTravelable<T> {
    topologicalTravel: (targetNameList: ComponentMainType[], fullNameList: ComponentMainType[], callback: (this: T, mainType: string, dependencies: string[]) => void, context?: T) => void;
}
export declare function enableTopologicalTravel<T>(entity: TopologicalTravelable<T>, dependencyGetter: (name: ComponentMainType) => ComponentMainType[]): void;
export declare function inheritDefaultOption<T, K>(superOption: T, subOption: K): K;
