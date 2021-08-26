import Axis from '../../coord/Axis';
import Scale from '../../scale/Scale';
import TimelineModel from './TimelineModel';
import { LabelOption } from '../../util/types';
import Model from '../../model/Model';
declare class TimelineAxis extends Axis {
    type: 'category' | 'time' | 'value';
    model: TimelineModel;
    constructor(dim: string, scale: Scale, coordExtent: [number, number], axisType: 'category' | 'time' | 'value');
    getLabelModel(): Model<LabelOption>;
    isHorizontal(): boolean;
}
export default TimelineAxis;
