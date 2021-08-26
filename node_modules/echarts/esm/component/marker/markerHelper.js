
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/



/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

import * as numberUtil from '../../util/number';
import { isDimensionStacked } from '../../data/helper/dataStackHelper';
import { indexOf, curry, clone, isArray } from 'zrender/esm/core/util';

function hasXOrY(item) {
  return !(isNaN(parseFloat(item.x)) && isNaN(parseFloat(item.y)));
}

function hasXAndY(item) {
  return !isNaN(parseFloat(item.x)) && !isNaN(parseFloat(item.y));
}

function markerTypeCalculatorWithExtent(markerType, data, otherDataDim, targetDataDim, otherCoordIndex, targetCoordIndex) {
  var coordArr = [];
  var stacked = isDimensionStacked(data, targetDataDim);
  var calcDataDim = stacked ? data.getCalculationInfo('stackResultDimension') : targetDataDim;
  var value = numCalculate(data, calcDataDim, markerType);
  var dataIndex = data.indicesOfNearest(calcDataDim, value)[0];
  coordArr[otherCoordIndex] = data.get(otherDataDim, dataIndex);
  coordArr[targetCoordIndex] = data.get(calcDataDim, dataIndex);
  var coordArrValue = data.get(targetDataDim, dataIndex);
  var precision = numberUtil.getPrecision(data.get(targetDataDim, dataIndex));
  precision = Math.min(precision, 20);

  if (precision >= 0) {
    coordArr[targetCoordIndex] = +coordArr[targetCoordIndex].toFixed(precision);
  }

  return [coordArr, coordArrValue];
}

var markerTypeCalculator = {
  min: curry(markerTypeCalculatorWithExtent, 'min'),
  max: curry(markerTypeCalculatorWithExtent, 'max'),
  average: curry(markerTypeCalculatorWithExtent, 'average'),
  median: curry(markerTypeCalculatorWithExtent, 'median')
};
export function dataTransform(seriesModel, item) {
  var data = seriesModel.getData();
  var coordSys = seriesModel.coordinateSystem;

  if (item && !hasXAndY(item) && !isArray(item.coord) && coordSys) {
    var dims = coordSys.dimensions;
    var axisInfo = getAxisInfo(item, data, coordSys, seriesModel);
    item = clone(item);

    if (item.type && markerTypeCalculator[item.type] && axisInfo.baseAxis && axisInfo.valueAxis) {
      var otherCoordIndex = indexOf(dims, axisInfo.baseAxis.dim);
      var targetCoordIndex = indexOf(dims, axisInfo.valueAxis.dim);
      var coordInfo = markerTypeCalculator[item.type](data, axisInfo.baseDataDim, axisInfo.valueDataDim, otherCoordIndex, targetCoordIndex);
      item.coord = coordInfo[0];
      item.value = coordInfo[1];
    } else {
      var coord = [item.xAxis != null ? item.xAxis : item.radiusAxis, item.yAxis != null ? item.yAxis : item.angleAxis];

      for (var i = 0; i < 2; i++) {
        if (markerTypeCalculator[coord[i]]) {
          coord[i] = numCalculate(data, data.mapDimension(dims[i]), coord[i]);
        }
      }

      item.coord = coord;
    }
  }

  return item;
}
export function getAxisInfo(item, data, coordSys, seriesModel) {
  var ret = {};

  if (item.valueIndex != null || item.valueDim != null) {
    ret.valueDataDim = item.valueIndex != null ? data.getDimension(item.valueIndex) : item.valueDim;
    ret.valueAxis = coordSys.getAxis(dataDimToCoordDim(seriesModel, ret.valueDataDim));
    ret.baseAxis = coordSys.getOtherAxis(ret.valueAxis);
    ret.baseDataDim = data.mapDimension(ret.baseAxis.dim);
  } else {
    ret.baseAxis = seriesModel.getBaseAxis();
    ret.valueAxis = coordSys.getOtherAxis(ret.baseAxis);
    ret.baseDataDim = data.mapDimension(ret.baseAxis.dim);
    ret.valueDataDim = data.mapDimension(ret.valueAxis.dim);
  }

  return ret;
}

function dataDimToCoordDim(seriesModel, dataDim) {
  var data = seriesModel.getData();
  var dimensions = data.dimensions;
  dataDim = data.getDimension(dataDim);

  for (var i = 0; i < dimensions.length; i++) {
    var dimItem = data.getDimensionInfo(dimensions[i]);

    if (dimItem.name === dataDim) {
      return dimItem.coordDim;
    }
  }
}

export function dataFilter(coordSys, item) {
  return coordSys && coordSys.containData && item.coord && !hasXOrY(item) ? coordSys.containData(item.coord) : true;
}
export function dimValueGetter(item, dimName, dataIndex, dimIndex) {
  if (dimIndex < 2) {
    return item.coord && item.coord[dimIndex];
  }

  return item.value;
}
export function numCalculate(data, valueDataDim, type) {
  if (type === 'average') {
    var sum_1 = 0;
    var count_1 = 0;
    data.each(valueDataDim, function (val, idx) {
      if (!isNaN(val)) {
        sum_1 += val;
        count_1++;
      }
    });
    return sum_1 / count_1;
  } else if (type === 'median') {
    return data.getMedian(valueDataDim);
  } else {
    return data.getDataExtent(valueDataDim)[type === 'max' ? 1 : 0];
  }
}