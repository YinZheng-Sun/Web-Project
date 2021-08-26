declare type ColorFunc = (grad: number, fastMode: boolean, output: number[]) => void;
declare type ColorState = 'inRange' | 'outOfRange';
declare class HeatmapLayer {
    canvas: HTMLCanvasElement;
    blurSize: number;
    pointSize: number;
    maxOpacity: number;
    minOpacity: number;
    private _brushCanvas;
    private _gradientPixels;
    constructor();
    update(data: number[][], width: number, height: number, normalize: (value: number) => number, colorFunc: Record<ColorState, ColorFunc>, isInRange?: (grad?: number) => boolean): HTMLCanvasElement;
    _getBrush(): HTMLCanvasElement;
    _getGradient(colorFunc: Record<ColorState, ColorFunc>, state: ColorState): Uint8ClampedArray;
}
export default HeatmapLayer;
