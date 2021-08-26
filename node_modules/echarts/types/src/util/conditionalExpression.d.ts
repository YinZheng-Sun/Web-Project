import { OptionDataValue, DimensionLoose, Dictionary } from './types';
import { HashMap } from 'zrender/lib/core/util';
import { RawValueParserType, RelationalOperator } from '../data/helper/dataValueHelper';
interface RelationalExpressionOptionByOp extends Record<RelationalOperator, OptionDataValue> {
    reg?: RegExp | string;
}
declare const RELATIONAL_EXPRESSION_OP_ALIAS_MAP: {
    readonly value: "eq";
    readonly '<': "lt";
    readonly '<=': "lte";
    readonly '>': "gt";
    readonly '>=': "gte";
    readonly '=': "eq";
    readonly '!=': "ne";
    readonly '<>': "ne";
};
declare type RelationalExpressionOptionByOpAlias = Record<keyof typeof RELATIONAL_EXPRESSION_OP_ALIAS_MAP, OptionDataValue>;
interface RelationalExpressionOption extends RelationalExpressionOptionByOp, RelationalExpressionOptionByOpAlias {
    dimension?: DimensionLoose;
    parser?: RawValueParserType;
}
interface LogicalExpressionOption {
    and?: LogicalExpressionSubOption[];
    or?: LogicalExpressionSubOption[];
    not?: LogicalExpressionSubOption;
}
declare type LogicalExpressionSubOption = LogicalExpressionOption | RelationalExpressionOption | TrueFalseExpressionOption;
export declare type TrueExpressionOption = true;
export declare type FalseExpressionOption = false;
export declare type TrueFalseExpressionOption = TrueExpressionOption | FalseExpressionOption;
export declare type ConditionalExpressionOption = LogicalExpressionOption | RelationalExpressionOption | TrueFalseExpressionOption;
declare type ValueGetterParam = Dictionary<unknown>;
export interface ConditionalExpressionValueGetterParamGetter<VGP extends ValueGetterParam = ValueGetterParam> {
    (relExpOption: RelationalExpressionOption): VGP;
}
export interface ConditionalExpressionValueGetter<VGP extends ValueGetterParam = ValueGetterParam> {
    (param: VGP): OptionDataValue;
}
declare class ConditionalExpressionParsed {
    private _cond;
    constructor(exprOption: ConditionalExpressionOption, getters: ConditionalGetters);
    evaluate(): boolean;
}
interface ConditionalGetters<VGP extends ValueGetterParam = ValueGetterParam> {
    prepareGetValue: ConditionalExpressionValueGetterParamGetter<VGP>;
    getValue: ConditionalExpressionValueGetter<VGP>;
    valueGetterAttrMap: HashMap<boolean, string>;
}
export declare function parseConditionalExpression<VGP extends ValueGetterParam = ValueGetterParam>(exprOption: ConditionalExpressionOption, getters: ConditionalGetters<VGP>): ConditionalExpressionParsed;
export {};
