declare type ThrottleFunction = (this: unknown, ...args: unknown[]) => void;
export declare type ThrottleType = 'fixRate' | 'debounce';
export interface ThrottleController {
    clear(): void;
    debounceNextCall(debounceDelay: number): void;
}
export declare function throttle<T extends ThrottleFunction>(fn: T, delay?: number, debounce?: boolean): T & ThrottleController;
export declare function createOrUpdate<T, S extends keyof T, P = T[S]>(obj: T, fnAttr: S, rate: number, throttleType: ThrottleType): P extends ThrottleFunction ? P & ThrottleController : never;
export declare function clear<T, S extends keyof T>(obj: T, fnAttr: S): void;
export {};
