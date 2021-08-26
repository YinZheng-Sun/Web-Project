import Axis from './Axis';
import { AxisBaseModel } from './AxisBaseModel';
export declare function createAxisLabels(axis: Axis): {
    labels: {
        formattedLabel: string;
        rawLabel: string;
        tickValue: number;
    }[];
    labelCategoryInterval?: number;
};
export declare function createAxisTicks(axis: Axis, tickModel: AxisBaseModel): {
    ticks: number[];
    tickCategoryInterval?: number;
};
export declare function calculateCategoryInterval(axis: Axis): number;
