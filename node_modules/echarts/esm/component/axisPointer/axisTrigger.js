
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

import { makeInner } from '../../util/model';
import * as modelHelper from './modelHelper';
import findPointFromSeries from './findPointFromSeries';
import { each, curry, bind, extend } from 'zrender/esm/core/util';
var inner = makeInner();
export default function axisTrigger(payload, ecModel, api) {
  var currTrigger = payload.currTrigger;
  var point = [payload.x, payload.y];
  var finder = payload;
  var dispatchAction = payload.dispatchAction || bind(api.dispatchAction, api);
  var coordSysAxesInfo = ecModel.getComponent('axisPointer').coordSysAxesInfo;

  if (!coordSysAxesInfo) {
    return;
  }

  if (illegalPoint(point)) {
    point = findPointFromSeries({
      seriesIndex: finder.seriesIndex,
      dataIndex: finder.dataIndex
    }, ecModel).point;
  }

  var isIllegalPoint = illegalPoint(point);
  var inputAxesInfo = finder.axesInfo;
  var axesInfo = coordSysAxesInfo.axesInfo;
  var shouldHide = currTrigger === 'leave' || illegalPoint(point);
  var outputPayload = {};
  var showValueMap = {};
  var dataByCoordSys = {
    list: [],
    map: {}
  };
  var updaters = {
    showPointer: curry(showPointer, showValueMap),
    showTooltip: curry(showTooltip, dataByCoordSys)
  };
  each(coordSysAxesInfo.coordSysMap, function (coordSys, coordSysKey) {
    var coordSysContainsPoint = isIllegalPoint || coordSys.containPoint(point);
    each(coordSysAxesInfo.coordSysAxesInfo[coordSysKey], function (axisInfo, key) {
      var axis = axisInfo.axis;
      var inputAxisInfo = findInputAxisInfo(inputAxesInfo, axisInfo);

      if (!shouldHide && coordSysContainsPoint && (!inputAxesInfo || inputAxisInfo)) {
        var val = inputAxisInfo && inputAxisInfo.value;

        if (val == null && !isIllegalPoint) {
          val = axis.pointToData(point);
        }

        val != null && processOnAxis(axisInfo, val, updaters, false, outputPayload);
      }
    });
  });
  var linkTriggers = {};
  each(axesInfo, function (tarAxisInfo, tarKey) {
    var linkGroup = tarAxisInfo.linkGroup;

    if (linkGroup && !showValueMap[tarKey]) {
      each(linkGroup.axesInfo, function (srcAxisInfo, srcKey) {
        var srcValItem = showValueMap[srcKey];

        if (srcAxisInfo !== tarAxisInfo && srcValItem) {
          var val = srcValItem.value;
          linkGroup.mapper && (val = tarAxisInfo.axis.scale.parse(linkGroup.mapper(val, makeMapperParam(srcAxisInfo), makeMapperParam(tarAxisInfo))));
          linkTriggers[tarAxisInfo.key] = val;
        }
      });
    }
  });
  each(linkTriggers, function (val, tarKey) {
    processOnAxis(axesInfo[tarKey], val, updaters, true, outputPayload);
  });
  updateModelActually(showValueMap, axesInfo, outputPayload);
  dispatchTooltipActually(dataByCoordSys, point, payload, dispatchAction);
  dispatchHighDownActually(axesInfo, dispatchAction, api);
  return outputPayload;
}

function processOnAxis(axisInfo, newValue, updaters, noSnap, outputFinder) {
  var axis = axisInfo.axis;

  if (axis.scale.isBlank() || !axis.containData(newValue)) {
    return;
  }

  if (!axisInfo.involveSeries) {
    updaters.showPointer(axisInfo, newValue);
    return;
  }

  var payloadInfo = buildPayloadsBySeries(newValue, axisInfo);
  var payloadBatch = payloadInfo.payloadBatch;
  var snapToValue = payloadInfo.snapToValue;

  if (payloadBatch[0] && outputFinder.seriesIndex == null) {
    extend(outputFinder, payloadBatch[0]);
  }

  if (!noSnap && axisInfo.snap) {
    if (axis.containData(snapToValue) && snapToValue != null) {
      newValue = snapToValue;
    }
  }

  updaters.showPointer(axisInfo, newValue, payloadBatch);
  updaters.showTooltip(axisInfo, payloadInfo, snapToValue);
}

function buildPayloadsBySeries(value, axisInfo) {
  var axis = axisInfo.axis;
  var dim = axis.dim;
  var snapToValue = value;
  var payloadBatch = [];
  var minDist = Number.MAX_VALUE;
  var minDiff = -1;
  each(axisInfo.seriesModels, function (series, idx) {
    var dataDim = series.getData().mapDimensionsAll(dim);
    var seriesNestestValue;
    var dataIndices;

    if (series.getAxisTooltipData) {
      var result = series.getAxisTooltipData(dataDim, value, axis);
      dataIndices = result.dataIndices;
      seriesNestestValue = result.nestestValue;
    } else {
      dataIndices = series.getData().indicesOfNearest(dataDim[0], value, axis.type === 'category' ? 0.5 : null);

      if (!dataIndices.length) {
        return;
      }

      seriesNestestValue = series.getData().get(dataDim[0], dataIndices[0]);
    }

    if (seriesNestestValue == null || !isFinite(seriesNestestValue)) {
      return;
    }

    var diff = value - seriesNestestValue;
    var dist = Math.abs(diff);

    if (dist <= minDist) {
      if (dist < minDist || diff >= 0 && minDiff < 0) {
        minDist = dist;
        minDiff = diff;
        snapToValue = seriesNestestValue;
        payloadBatch.length = 0;
      }

      each(dataIndices, function (dataIndex) {
        payloadBatch.push({
          seriesIndex: series.seriesIndex,
          dataIndexInside: dataIndex,
          dataIndex: series.getData().getRawIndex(dataIndex)
        });
      });
    }
  });
  return {
    payloadBatch: payloadBatch,
    snapToValue: snapToValue
  };
}

function showPointer(showValueMap, axisInfo, value, payloadBatch) {
  showValueMap[axisInfo.key] = {
    value: value,
    payloadBatch: payloadBatch
  };
}

function showTooltip(dataByCoordSys, axisInfo, payloadInfo, value) {
  var payloadBatch = payloadInfo.payloadBatch;
  var axis = axisInfo.axis;
  var axisModel = axis.model;
  var axisPointerModel = axisInfo.axisPointerModel;

  if (!axisInfo.triggerTooltip || !payloadBatch.length) {
    return;
  }

  var coordSysModel = axisInfo.coordSys.model;
  var coordSysKey = modelHelper.makeKey(coordSysModel);
  var coordSysItem = dataByCoordSys.map[coordSysKey];

  if (!coordSysItem) {
    coordSysItem = dataByCoordSys.map[coordSysKey] = {
      coordSysId: coordSysModel.id,
      coordSysIndex: coordSysModel.componentIndex,
      coordSysType: coordSysModel.type,
      coordSysMainType: coordSysModel.mainType,
      dataByAxis: []
    };
    dataByCoordSys.list.push(coordSysItem);
  }

  coordSysItem.dataByAxis.push({
    axisDim: axis.dim,
    axisIndex: axisModel.componentIndex,
    axisType: axisModel.type,
    axisId: axisModel.id,
    value: value,
    valueLabelOpt: {
      precision: axisPointerModel.get(['label', 'precision']),
      formatter: axisPointerModel.get(['label', 'formatter'])
    },
    seriesDataIndices: payloadBatch.slice()
  });
}

function updateModelActually(showValueMap, axesInfo, outputPayload) {
  var outputAxesInfo = outputPayload.axesInfo = [];
  each(axesInfo, function (axisInfo, key) {
    var option = axisInfo.axisPointerModel.option;
    var valItem = showValueMap[key];

    if (valItem) {
      !axisInfo.useHandle && (option.status = 'show');
      option.value = valItem.value;
      option.seriesDataIndices = (valItem.payloadBatch || []).slice();
    } else {
      !axisInfo.useHandle && (option.status = 'hide');
    }

    option.status === 'show' && outputAxesInfo.push({
      axisDim: axisInfo.axis.dim,
      axisIndex: axisInfo.axis.model.componentIndex,
      value: option.value
    });
  });
}

function dispatchTooltipActually(dataByCoordSys, point, payload, dispatchAction) {
  if (illegalPoint(point) || !dataByCoordSys.list.length) {
    dispatchAction({
      type: 'hideTip'
    });
    return;
  }

  var sampleItem = ((dataByCoordSys.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
  dispatchAction({
    type: 'showTip',
    escapeConnect: true,
    x: point[0],
    y: point[1],
    tooltipOption: payload.tooltipOption,
    position: payload.position,
    dataIndexInside: sampleItem.dataIndexInside,
    dataIndex: sampleItem.dataIndex,
    seriesIndex: sampleItem.seriesIndex,
    dataByCoordSys: dataByCoordSys.list
  });
}

function dispatchHighDownActually(axesInfo, dispatchAction, api) {
  var zr = api.getZr();
  var highDownKey = 'axisPointerLastHighlights';
  var lastHighlights = inner(zr)[highDownKey] || {};
  var newHighlights = inner(zr)[highDownKey] = {};
  each(axesInfo, function (axisInfo, key) {
    var option = axisInfo.axisPointerModel.option;
    option.status === 'show' && each(option.seriesDataIndices, function (batchItem) {
      var key = batchItem.seriesIndex + ' | ' + batchItem.dataIndex;
      newHighlights[key] = batchItem;
    });
  });
  var toHighlight = [];
  var toDownplay = [];
  each(lastHighlights, function (batchItem, key) {
    !newHighlights[key] && toDownplay.push(batchItem);
  });
  each(newHighlights, function (batchItem, key) {
    !lastHighlights[key] && toHighlight.push(batchItem);
  });
  toDownplay.length && api.dispatchAction({
    type: 'downplay',
    escapeConnect: true,
    notBlur: true,
    batch: toDownplay
  });
  toHighlight.length && api.dispatchAction({
    type: 'highlight',
    escapeConnect: true,
    notBlur: true,
    batch: toHighlight
  });
}

function findInputAxisInfo(inputAxesInfo, axisInfo) {
  for (var i = 0; i < (inputAxesInfo || []).length; i++) {
    var inputAxisInfo = inputAxesInfo[i];

    if (axisInfo.axis.dim === inputAxisInfo.axisDim && axisInfo.axis.model.componentIndex === inputAxisInfo.axisIndex) {
      return inputAxisInfo;
    }
  }
}

function makeMapperParam(axisInfo) {
  var axisModel = axisInfo.axis.model;
  var item = {};
  var dim = item.axisDim = axisInfo.axis.dim;
  item.axisIndex = item[dim + 'AxisIndex'] = axisModel.componentIndex;
  item.axisName = item[dim + 'AxisName'] = axisModel.name;
  item.axisId = item[dim + 'AxisId'] = axisModel.id;
  return item;
}

function illegalPoint(point) {
  return !point || point[0] == null || isNaN(point[0]) || point[1] == null || isNaN(point[1]);
}