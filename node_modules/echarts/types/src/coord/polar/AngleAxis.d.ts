import Axis from '../Axis';
import Scale from '../../scale/Scale';
import Polar from './Polar';
import { AngleAxisModel } from './AxisModel';
interface AngleAxis {
    dataToAngle: Axis['dataToCoord'];
    angleToData: Axis['coordToData'];
}
declare class AngleAxis extends Axis {
    polar: Polar;
    model: AngleAxisModel;
    constructor(scale?: Scale, angleExtent?: [number, number]);
    pointToData(point: number[], clamp?: boolean): number;
    calculateCategoryInterval(): number;
}
export default AngleAxis;
