import SeriesModel from '../../model/Series';
import { StageHandlerPlanReturn } from '../../util/types';
export default function createRenderPlanner(): (seriesModel: SeriesModel) => StageHandlerPlanReturn;
