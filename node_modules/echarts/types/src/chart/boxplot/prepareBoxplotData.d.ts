export interface PrepareBoxplotDataOpt {
    boundIQR?: number | 'none';
    itemNameFormatter?: string | ((params: {
        value: number;
    }) => string);
}
export default function prepareBoxplotData(rawData: number[][], opt: PrepareBoxplotDataOpt): {
    boxData: (number | string)[][];
    outliers: (number | string)[][];
};
