import VisualMapModel, { VisualMapOption, VisualMeta } from './VisualMapModel';
import { VisualMappingOption } from '../../visual/VisualMapping';
import { VisualOptionPiecewise } from '../../util/types';
import { Dictionary } from 'zrender/lib/core/types';
interface VisualPiece extends VisualOptionPiecewise {
    min?: number;
    max?: number;
    lt?: number;
    gt?: number;
    lte?: number;
    gte?: number;
    value?: number;
    label?: string;
}
declare type VisualState = VisualMapModel['stateList'][number];
declare type InnerVisualPiece = VisualMappingOption['pieceList'][number];
export interface PiecewiseVisualMapOption extends VisualMapOption {
    align?: 'auto' | 'left' | 'right';
    minOpen?: boolean;
    maxOpen?: boolean;
    itemWidth?: number;
    itemHeight?: number;
    itemSymbol?: string;
    pieces?: VisualPiece[];
    categories?: string[];
    splitNumber?: number;
    selected?: Dictionary<boolean>;
    selectedMode?: 'multiple' | 'single';
    showLabel?: boolean;
    itemGap?: number;
    hoverLink?: boolean;
}
declare class PiecewiseModel extends VisualMapModel<PiecewiseVisualMapOption> {
    static type: "visualMap.piecewise";
    type: "visualMap.piecewise";
    private _pieceList;
    private _mode;
    optionUpdated(newOption: PiecewiseVisualMapOption, isInit?: boolean): void;
    completeVisualOption(): void;
    private _resetSelected;
    getSelectedMapKey(piece: InnerVisualPiece): string;
    getPieceList(): InnerVisualPiece[];
    private _determineMode;
    setSelected(selected: this['option']['selected']): void;
    getValueState(value: number): VisualState;
    findTargetDataIndices(pieceIndex: number): {
        seriesId: string;
        dataIndex: number[];
    }[];
    getRepresentValue(piece: InnerVisualPiece): string | number;
    getVisualMeta(getColorVisual: (value: number, valueState: VisualState) => string): VisualMeta;
    static defaultOption: PiecewiseVisualMapOption;
}
export default PiecewiseModel;
