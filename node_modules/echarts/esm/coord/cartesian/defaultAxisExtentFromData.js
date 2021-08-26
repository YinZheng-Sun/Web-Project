
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

import * as echarts from '../../echarts';
import { createHashMap, each, hasOwn, keys, map } from 'zrender/esm/core/util';
import { isCartesian2DSeries, findAxisModels } from './cartesianAxisHelper';
import { getDataDimensionsOnAxis, unionAxisExtentFromData } from '../axisHelper';
import { ensureScaleRawExtentInfo } from '../scaleRawExtentInfo';
echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.FILTER + 10, {
  getTargetSeries: function (ecModel) {
    var seriesModelMap = createHashMap();
    ecModel.eachSeries(function (seriesModel) {
      isCartesian2DSeries(seriesModel) && seriesModelMap.set(seriesModel.uid, seriesModel);
    });
    return seriesModelMap;
  },
  overallReset: function (ecModel, api) {
    var seriesRecords = [];
    var axisRecordMap = createHashMap();
    prepareDataExtentOnAxis(ecModel, axisRecordMap, seriesRecords);
    calculateFilteredExtent(axisRecordMap, seriesRecords);
    shrinkAxisExtent(axisRecordMap);
  }
});

function prepareDataExtentOnAxis(ecModel, axisRecordMap, seriesRecords) {
  ecModel.eachSeries(function (seriesModel) {
    if (!isCartesian2DSeries(seriesModel)) {
      return;
    }

    var axesModelMap = findAxisModels(seriesModel);
    var xAxisModel = axesModelMap.xAxisModel;
    var yAxisModel = axesModelMap.yAxisModel;
    var xAxis = xAxisModel.axis;
    var yAxis = yAxisModel.axis;
    var xRawExtentInfo = xAxis.scale.rawExtentInfo;
    var yRawExtentInfo = yAxis.scale.rawExtentInfo;
    var data = seriesModel.getData();

    if (xRawExtentInfo && xRawExtentInfo.frozen || yRawExtentInfo && yRawExtentInfo.frozen) {
      return;
    }

    seriesRecords.push({
      seriesModel: seriesModel,
      xAxisModel: xAxisModel,
      yAxisModel: yAxisModel
    });
    unionAxisExtentFromData(prepareAxisRecord(axisRecordMap, xAxisModel).condExtent, data, xAxis.dim);
    unionAxisExtentFromData(prepareAxisRecord(axisRecordMap, yAxisModel).condExtent, data, yAxis.dim);
  });
}

function calculateFilteredExtent(axisRecordMap, seriesRecords) {
  each(seriesRecords, function (seriesRecord) {
    var xAxisModel = seriesRecord.xAxisModel;
    var yAxisModel = seriesRecord.yAxisModel;
    var xAxis = xAxisModel.axis;
    var yAxis = yAxisModel.axis;
    var xAxisRecord = prepareAxisRecord(axisRecordMap, xAxisModel);
    var yAxisRecord = prepareAxisRecord(axisRecordMap, yAxisModel);
    xAxisRecord.rawExtentInfo = ensureScaleRawExtentInfo(xAxis.scale, xAxisModel, xAxisRecord.condExtent);
    yAxisRecord.rawExtentInfo = ensureScaleRawExtentInfo(yAxis.scale, yAxisModel, yAxisRecord.condExtent);
    xAxisRecord.rawExtentResult = xAxisRecord.rawExtentInfo.calculate();
    yAxisRecord.rawExtentResult = yAxisRecord.rawExtentInfo.calculate();
    var data = seriesRecord.seriesModel.getData();
    var condDimMap = {};
    var tarDimMap = {};
    var condAxis;
    var tarAxisRecord;

    function addCondition(axis, axisRecord) {
      var condExtent = axisRecord.condExtent;
      var rawExtentResult = axisRecord.rawExtentResult;

      if (axis.type === 'category' && (condExtent[0] < rawExtentResult.min || rawExtentResult.max < condExtent[1])) {
        each(getDataDimensionsOnAxis(data, axis.dim), function (dataDim) {
          if (!hasOwn(condDimMap, dataDim)) {
            condDimMap[dataDim] = true;
            condAxis = axis;
          }
        });
      }
    }

    function addTarget(axis, axisRecord) {
      var rawExtentResult = axisRecord.rawExtentResult;

      if (axis.type !== 'category' && (!rawExtentResult.minFixed || !rawExtentResult.maxFixed)) {
        each(getDataDimensionsOnAxis(data, axis.dim), function (dataDim) {
          if (!hasOwn(condDimMap, dataDim) && !hasOwn(tarDimMap, dataDim)) {
            tarDimMap[dataDim] = true;
            tarAxisRecord = axisRecord;
          }
        });
      }
    }

    addCondition(xAxis, xAxisRecord);
    addCondition(yAxis, yAxisRecord);
    addTarget(xAxis, xAxisRecord);
    addTarget(yAxis, yAxisRecord);
    var condDims = keys(condDimMap);
    var tarDims = keys(tarDimMap);
    var tarDimExtents = map(tarDims, function () {
      return initExtent();
    });
    var condDimsLen = condDims.length;
    var tarDimsLen = tarDims.length;

    if (!condDimsLen || !tarDimsLen) {
      return;
    }

    var singleCondDim = condDimsLen === 1 ? condDims[0] : null;
    var singleTarDim = tarDimsLen === 1 ? tarDims[0] : null;
    var dataLen = data.count();

    if (singleCondDim && singleTarDim) {
      for (var dataIdx = 0; dataIdx < dataLen; dataIdx++) {
        var condVal = data.get(singleCondDim, dataIdx);

        if (condAxis.scale.isInExtentRange(condVal)) {
          unionExtent(tarDimExtents[0], data.get(singleTarDim, dataIdx));
        }
      }
    } else {
      for (var dataIdx = 0; dataIdx < dataLen; dataIdx++) {
        for (var j = 0; j < condDimsLen; j++) {
          var condVal = data.get(condDims[j], dataIdx);

          if (condAxis.scale.isInExtentRange(condVal)) {
            for (var k = 0; k < tarDimsLen; k++) {
              unionExtent(tarDimExtents[k], data.get(tarDims[k], dataIdx));
            }

            break;
          }
        }
      }
    }

    each(tarDimExtents, function (tarDimExtent, i) {
      var dim = tarDims[i];
      data.setApproximateExtent(tarDimExtent, dim);
      var tarAxisExtent = tarAxisRecord.tarExtent = tarAxisRecord.tarExtent || initExtent();
      unionExtent(tarAxisExtent, tarDimExtent[0]);
      unionExtent(tarAxisExtent, tarDimExtent[1]);
    });
  });
}

function shrinkAxisExtent(axisRecordMap) {
  axisRecordMap.each(function (axisRecord) {
    var tarAxisExtent = axisRecord.tarExtent;

    if (tarAxisExtent) {
      var rawExtentResult = axisRecord.rawExtentResult;
      var rawExtentInfo = axisRecord.rawExtentInfo;

      if (!rawExtentResult.minFixed && tarAxisExtent[0] > rawExtentResult.min) {
        rawExtentInfo.modifyDataMinMax('min', tarAxisExtent[0]);
      }

      if (!rawExtentResult.maxFixed && tarAxisExtent[1] < rawExtentResult.max) {
        rawExtentInfo.modifyDataMinMax('max', tarAxisExtent[1]);
      }
    }
  });
}

function prepareAxisRecord(axisRecordMap, axisModel) {
  return axisRecordMap.get(axisModel.uid) || axisRecordMap.set(axisModel.uid, {
    condExtent: initExtent()
  });
}

function initExtent() {
  return [Infinity, -Infinity];
}

function unionExtent(extent, val) {
  val < extent[0] && (extent[0] = val);
  val > extent[1] && (extent[1] = val);
}