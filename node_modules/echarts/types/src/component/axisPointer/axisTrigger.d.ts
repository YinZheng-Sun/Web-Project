import GlobalModel from '../../model/Global';
import ExtensionAPI from '../../core/ExtensionAPI';
import { Payload, CommonAxisPointerOption } from '../../util/types';
import { AxisPointerOption } from './AxisPointerModel';
declare type AxisValue = CommonAxisPointerOption['value'];
interface DataIndex {
    seriesIndex: number;
    dataIndex: number;
    dataIndexInside: number;
}
export interface DataByAxis {
    value: string | number;
    axisIndex: number;
    axisDim: string;
    axisType: string;
    axisId: string;
    seriesDataIndices: DataIndex[];
    valueLabelOpt: {
        precision: AxisPointerOption['label']['precision'];
        formatter: AxisPointerOption['label']['formatter'];
    };
}
export interface DataByCoordSys {
    coordSysId: string;
    coordSysIndex: number;
    coordSysType: string;
    coordSysMainType: string;
    dataByAxis: DataByAxis[];
}
interface AxisTriggerPayload extends Payload {
    currTrigger?: 'click' | 'mousemove' | 'leave';
    x?: number;
    y?: number;
    seriesIndex?: number;
    dataIndex: number;
    axesInfo?: {
        axisDim?: string;
        axisIndex?: number;
        value?: AxisValue;
    }[];
    dispatchAction: ExtensionAPI['dispatchAction'];
}
export default function axisTrigger(payload: AxisTriggerPayload, ecModel: GlobalModel, api: ExtensionAPI): AxisTriggerPayload;
export {};
