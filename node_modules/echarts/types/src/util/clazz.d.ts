import { ComponentFullType, ComponentTypeInfo, ComponentMainType, ComponentSubType } from './types';
declare const IS_EXTENDED_CLASS: "___EC__EXTENDED_CLASS___";
export declare function parseClassType(componentType: ComponentFullType): ComponentTypeInfo;
export declare function isExtendedClass(clz: any): boolean;
export interface ExtendableConstructor {
    new (...args: any): any;
    $constructor?: new (...args: any) => any;
    extend: (proto: {
        [name: string]: any;
    }) => ExtendableConstructor;
    superCall: (context: any, methodName: string, ...args: any) => any;
    superApply: (context: any, methodName: string, args: []) => any;
    superClass?: ExtendableConstructor;
    [IS_EXTENDED_CLASS]?: boolean;
}
export declare function enableClassExtend(rootClz: ExtendableConstructor, mandatoryMethods?: string[]): void;
export declare function mountExtend(SubClz: any, SupperClz: any): void;
export interface CheckableConstructor {
    new (...args: any): any;
    isInstance: (ins: any) => boolean;
}
export declare function enableClassCheck(target: CheckableConstructor): void;
export declare type Constructor = new (...args: any) => any;
export interface ClassManager {
    registerClass: (clz: Constructor) => Constructor;
    getClass: (componentMainType: ComponentMainType, subType?: ComponentSubType, throwWhenNotFound?: boolean) => Constructor;
    getClassesByMainType: (componentType: ComponentMainType) => Constructor[];
    hasClass: (componentType: ComponentFullType) => boolean;
    getAllClassMainTypes: () => ComponentMainType[];
    hasSubTypes: (componentType: ComponentFullType) => boolean;
}
export declare function enableClassManagement(target: ClassManager): void;
export {};
