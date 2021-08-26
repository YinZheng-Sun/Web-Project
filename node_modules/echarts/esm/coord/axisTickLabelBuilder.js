
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

import * as zrUtil from 'zrender/esm/core/util';
import * as textContain from 'zrender/esm/contain/text';
import { makeInner } from '../util/model';
import { makeLabelFormatter, getOptionCategoryInterval, shouldShowAllLabels } from './axisHelper';
var inner = makeInner();
export function createAxisLabels(axis) {
  return axis.type === 'category' ? makeCategoryLabels(axis) : makeRealNumberLabels(axis);
}
export function createAxisTicks(axis, tickModel) {
  return axis.type === 'category' ? makeCategoryTicks(axis, tickModel) : {
    ticks: zrUtil.map(axis.scale.getTicks(), function (tick) {
      return tick.value;
    })
  };
}

function makeCategoryLabels(axis) {
  var labelModel = axis.getLabelModel();
  var result = makeCategoryLabelsActually(axis, labelModel);
  return !labelModel.get('show') || axis.scale.isBlank() ? {
    labels: [],
    labelCategoryInterval: result.labelCategoryInterval
  } : result;
}

function makeCategoryLabelsActually(axis, labelModel) {
  var labelsCache = getListCache(axis, 'labels');
  var optionLabelInterval = getOptionCategoryInterval(labelModel);
  var result = listCacheGet(labelsCache, optionLabelInterval);

  if (result) {
    return result;
  }

  var labels;
  var numericLabelInterval;

  if (zrUtil.isFunction(optionLabelInterval)) {
    labels = makeLabelsByCustomizedCategoryInterval(axis, optionLabelInterval);
  } else {
    numericLabelInterval = optionLabelInterval === 'auto' ? makeAutoCategoryInterval(axis) : optionLabelInterval;
    labels = makeLabelsByNumericCategoryInterval(axis, numericLabelInterval);
  }

  return listCacheSet(labelsCache, optionLabelInterval, {
    labels: labels,
    labelCategoryInterval: numericLabelInterval
  });
}

function makeCategoryTicks(axis, tickModel) {
  var ticksCache = getListCache(axis, 'ticks');
  var optionTickInterval = getOptionCategoryInterval(tickModel);
  var result = listCacheGet(ticksCache, optionTickInterval);

  if (result) {
    return result;
  }

  var ticks;
  var tickCategoryInterval;

  if (!tickModel.get('show') || axis.scale.isBlank()) {
    ticks = [];
  }

  if (zrUtil.isFunction(optionTickInterval)) {
    ticks = makeLabelsByCustomizedCategoryInterval(axis, optionTickInterval, true);
  } else if (optionTickInterval === 'auto') {
    var labelsResult = makeCategoryLabelsActually(axis, axis.getLabelModel());
    tickCategoryInterval = labelsResult.labelCategoryInterval;
    ticks = zrUtil.map(labelsResult.labels, function (labelItem) {
      return labelItem.tickValue;
    });
  } else {
    tickCategoryInterval = optionTickInterval;
    ticks = makeLabelsByNumericCategoryInterval(axis, tickCategoryInterval, true);
  }

  return listCacheSet(ticksCache, optionTickInterval, {
    ticks: ticks,
    tickCategoryInterval: tickCategoryInterval
  });
}

function makeRealNumberLabels(axis) {
  var ticks = axis.scale.getTicks();
  var labelFormatter = makeLabelFormatter(axis);
  return {
    labels: zrUtil.map(ticks, function (tick, idx) {
      return {
        formattedLabel: labelFormatter(tick, idx),
        rawLabel: axis.scale.getLabel(tick),
        tickValue: tick.value
      };
    })
  };
}

function getListCache(axis, prop) {
  return inner(axis)[prop] || (inner(axis)[prop] = []);
}

function listCacheGet(cache, key) {
  for (var i = 0; i < cache.length; i++) {
    if (cache[i].key === key) {
      return cache[i].value;
    }
  }
}

function listCacheSet(cache, key, value) {
  cache.push({
    key: key,
    value: value
  });
  return value;
}

function makeAutoCategoryInterval(axis) {
  var result = inner(axis).autoInterval;
  return result != null ? result : inner(axis).autoInterval = axis.calculateCategoryInterval();
}

export function calculateCategoryInterval(axis) {
  var params = fetchAutoCategoryIntervalCalculationParams(axis);
  var labelFormatter = makeLabelFormatter(axis);
  var rotation = (params.axisRotate - params.labelRotate) / 180 * Math.PI;
  var ordinalScale = axis.scale;
  var ordinalExtent = ordinalScale.getExtent();
  var tickCount = ordinalScale.count();

  if (ordinalExtent[1] - ordinalExtent[0] < 1) {
    return 0;
  }

  var step = 1;

  if (tickCount > 40) {
    step = Math.max(1, Math.floor(tickCount / 40));
  }

  var tickValue = ordinalExtent[0];
  var unitSpan = axis.dataToCoord(tickValue + 1) - axis.dataToCoord(tickValue);
  var unitW = Math.abs(unitSpan * Math.cos(rotation));
  var unitH = Math.abs(unitSpan * Math.sin(rotation));
  var maxW = 0;
  var maxH = 0;

  for (; tickValue <= ordinalExtent[1]; tickValue += step) {
    var width = 0;
    var height = 0;
    var rect = textContain.getBoundingRect(labelFormatter({
      value: tickValue
    }), params.font, 'center', 'top');
    width = rect.width * 1.3;
    height = rect.height * 1.3;
    maxW = Math.max(maxW, width, 7);
    maxH = Math.max(maxH, height, 7);
  }

  var dw = maxW / unitW;
  var dh = maxH / unitH;
  isNaN(dw) && (dw = Infinity);
  isNaN(dh) && (dh = Infinity);
  var interval = Math.max(0, Math.floor(Math.min(dw, dh)));
  var cache = inner(axis.model);
  var axisExtent = axis.getExtent();
  var lastAutoInterval = cache.lastAutoInterval;
  var lastTickCount = cache.lastTickCount;

  if (lastAutoInterval != null && lastTickCount != null && Math.abs(lastAutoInterval - interval) <= 1 && Math.abs(lastTickCount - tickCount) <= 1 && lastAutoInterval > interval && cache.axisExtent0 === axisExtent[0] && cache.axisExtent1 === axisExtent[1]) {
    interval = lastAutoInterval;
  } else {
    cache.lastTickCount = tickCount;
    cache.lastAutoInterval = interval;
    cache.axisExtent0 = axisExtent[0];
    cache.axisExtent1 = axisExtent[1];
  }

  return interval;
}

function fetchAutoCategoryIntervalCalculationParams(axis) {
  var labelModel = axis.getLabelModel();
  return {
    axisRotate: axis.getRotate ? axis.getRotate() : axis.isHorizontal && !axis.isHorizontal() ? 90 : 0,
    labelRotate: labelModel.get('rotate') || 0,
    font: labelModel.getFont()
  };
}

function makeLabelsByNumericCategoryInterval(axis, categoryInterval, onlyTick) {
  var labelFormatter = makeLabelFormatter(axis);
  var ordinalScale = axis.scale;
  var ordinalExtent = ordinalScale.getExtent();
  var labelModel = axis.getLabelModel();
  var result = [];
  var step = Math.max((categoryInterval || 0) + 1, 1);
  var startTick = ordinalExtent[0];
  var tickCount = ordinalScale.count();

  if (startTick !== 0 && step > 1 && tickCount / step > 2) {
    startTick = Math.round(Math.ceil(startTick / step) * step);
  }

  var showAllLabel = shouldShowAllLabels(axis);
  var includeMinLabel = labelModel.get('showMinLabel') || showAllLabel;
  var includeMaxLabel = labelModel.get('showMaxLabel') || showAllLabel;

  if (includeMinLabel && startTick !== ordinalExtent[0]) {
    addItem(ordinalExtent[0]);
  }

  var tickValue = startTick;

  for (; tickValue <= ordinalExtent[1]; tickValue += step) {
    addItem(tickValue);
  }

  if (includeMaxLabel && tickValue - step !== ordinalExtent[1]) {
    addItem(ordinalExtent[1]);
  }

  function addItem(tickValue) {
    var tickObj = {
      value: tickValue
    };
    result.push(onlyTick ? tickValue : {
      formattedLabel: labelFormatter(tickObj),
      rawLabel: ordinalScale.getLabel(tickObj),
      tickValue: tickValue
    });
  }

  return result;
}

function makeLabelsByCustomizedCategoryInterval(axis, categoryInterval, onlyTick) {
  var ordinalScale = axis.scale;
  var labelFormatter = makeLabelFormatter(axis);
  var result = [];
  zrUtil.each(ordinalScale.getTicks(), function (tick) {
    var rawLabel = ordinalScale.getLabel(tick);
    var tickValue = tick.value;

    if (categoryInterval(tick.value, rawLabel)) {
      result.push(onlyTick ? tickValue : {
        formattedLabel: labelFormatter(tick),
        rawLabel: rawLabel,
        tickValue: tickValue
      });
    }
  });
  return result;
}