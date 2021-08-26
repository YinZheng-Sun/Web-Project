import Axis from '../Axis';
import Scale from '../../scale/Scale';
import { OptionAxisType } from '../axisCommonTypes';
import SingleAxisModel, { SingleAxisPosition } from './AxisModel';
import { LayoutOrient } from '../../util/types';
import Single from './Single';
interface SingleAxis {
    toLocalCoord(coord: number): number;
    toGlobalCoord(coord: number): number;
}
declare class SingleAxis extends Axis {
    position: SingleAxisPosition;
    orient: LayoutOrient;
    reverse: boolean;
    coordinateSystem: Single;
    model: SingleAxisModel;
    constructor(dim: string, scale: Scale, coordExtent: [number, number], axisType?: OptionAxisType, position?: SingleAxisPosition);
    isHorizontal(): boolean;
    pointToData(point: number[], clamp?: boolean): number;
}
export default SingleAxis;
