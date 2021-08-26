declare type intervalScaleNiceTicksResult = {
    interval: number;
    intervalPrecision: number;
    niceTickExtent: [number, number];
};
export declare function intervalScaleNiceTicks(extent: [number, number], splitNumber: number, minInterval?: number, maxInterval?: number): intervalScaleNiceTicksResult;
export declare function getIntervalPrecision(interval: number): number;
export declare function fixExtent(niceTickExtent: [number, number], extent: [number, number]): void;
export declare function contain(val: number, extent: [number, number]): boolean;
export declare function normalize(val: number, extent: [number, number]): number;
export declare function scale(val: number, extent: [number, number]): number;
export {};
