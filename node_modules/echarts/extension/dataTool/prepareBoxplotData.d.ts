export default function (rawData: number[][], opt: {
    boundIQR?: number | 'none';
    layout?: 'horizontal' | 'vertical';
}): {
    boxData: number[][];
    outliers: number[][];
    axisData: string[];
};
