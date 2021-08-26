export declare function log(str: string): void;
export declare function warn(str: string): void;
export declare function error(str: string): void;
export declare function deprecateLog(str: string): void;
export declare function deprecateReplaceLog(oldOpt: string, newOpt: string, scope?: string): void;
export declare function consoleLog(...args: unknown[]): void;
export declare function makePrintable(...hintInfo: unknown[]): string;
export declare function throwError(msg?: string): void;
