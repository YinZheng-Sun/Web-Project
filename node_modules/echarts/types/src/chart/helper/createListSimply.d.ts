import { CreateDimensionsParams } from '../../data/helper/createDimensions';
import List from '../../data/List';
import SeriesModel from '../../model/Series';
export default function createListSimply(seriesModel: SeriesModel, opt: CreateDimensionsParams | CreateDimensionsParams['coordDimensions'], nameList?: string[]): List;
