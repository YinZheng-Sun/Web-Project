import { ParsedValue, DimensionType } from '../../util/types';
import OrdinalMeta from '../OrdinalMeta';
export declare function parseDataValue(value: any, opt: {
    type?: DimensionType;
    ordinalMeta?: OrdinalMeta;
}): ParsedValue;
export declare type RawValueParserType = 'number' | 'time' | 'trim';
declare type RawValueParser = (val: unknown) => unknown;
export declare function getRawValueParser(type: RawValueParserType): RawValueParser;
export interface FilterComparator {
    evaluate(val: unknown): boolean;
}
export declare class SortOrderComparator {
    private _incomparable;
    private _resultLT;
    constructor(order: 'asc' | 'desc', incomparable: 'min' | 'max');
    evaluate(lval: unknown, rval: unknown): -1 | 0 | 1;
}
declare type OrderRelationOperator = 'lt' | 'lte' | 'gt' | 'gte';
export declare type RelationalOperator = OrderRelationOperator | 'eq' | 'ne';
export declare function createFilterComparator(op: string, rval?: unknown): FilterComparator;
export {};
