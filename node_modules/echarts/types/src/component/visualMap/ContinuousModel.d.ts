import VisualMapModel, { VisualMapOption } from './VisualMapModel';
import { ItemStyleOption } from '../../util/types';
declare type VisualState = VisualMapModel['stateList'][number];
export interface ContinousVisualMapOption extends VisualMapOption {
    align?: 'auto' | 'left' | 'right' | 'top' | 'bottom';
    calculable?: boolean;
    range?: number[];
    hoverLink?: boolean;
    hoverLinkDataSize?: number;
    hoverLinkOnHandle?: boolean;
    handleIcon?: string;
    handleSize?: string | number;
    handleStyle?: ItemStyleOption;
    indicatorIcon?: string;
    indicatorSize?: string | number;
    indicatorStyle?: ItemStyleOption;
    emphasis?: {
        handleStyle?: ItemStyleOption;
    };
}
declare class ContinuousModel extends VisualMapModel<ContinousVisualMapOption> {
    static type: "visualMap.continuous";
    type: "visualMap.continuous";
    optionUpdated(newOption: ContinousVisualMapOption, isInit: boolean): void;
    resetItemSize(): void;
    _resetRange(): void;
    completeVisualOption(): void;
    setSelected(selected: number[]): void;
    getSelected(): [number, number];
    getValueState(value: number): VisualState;
    findTargetDataIndices(range: number[]): {
        seriesId: string;
        dataIndex: number[];
    }[];
    getVisualMeta(getColorVisual: (value: number, valueState: VisualState) => string): {
        stops: {
            value: number;
            color: string;
        }[];
        outerColors: string[];
    };
    static defaultOption: ContinousVisualMapOption;
}
export default ContinuousModel;
