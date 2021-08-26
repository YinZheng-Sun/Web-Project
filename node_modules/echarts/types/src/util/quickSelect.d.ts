declare type CompareFunc<T> = (a: T, b: T) => number;
declare function quickSelect<T>(arr: T[], nth: number, compareFunc: CompareFunc<T>): number;
declare function quickSelect<T>(arr: T[], nth: number, left: number, right: number, compareFunc: CompareFunc<T>): number;
export default quickSelect;
