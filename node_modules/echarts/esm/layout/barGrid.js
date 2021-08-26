
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
import { parsePercent } from '../util/number';
import { isDimensionStacked } from '../data/helper/dataStackHelper';
import createRenderPlanner from '../chart/helper/createRenderPlanner';
var STACK_PREFIX = '__ec_stack_';
var LARGE_BAR_MIN_WIDTH = 0.5;
var LargeArr = typeof Float32Array !== 'undefined' ? Float32Array : Array;

function getSeriesStackId(seriesModel) {
  return seriesModel.get('stack') || STACK_PREFIX + seriesModel.seriesIndex;
}

function getAxisKey(axis) {
  return axis.dim + axis.index;
}

export function getLayoutOnAxis(opt) {
  var params = [];
  var baseAxis = opt.axis;
  var axisKey = 'axis0';

  if (baseAxis.type !== 'category') {
    return;
  }

  var bandWidth = baseAxis.getBandWidth();

  for (var i = 0; i < opt.count || 0; i++) {
    params.push(zrUtil.defaults({
      bandWidth: bandWidth,
      axisKey: axisKey,
      stackId: STACK_PREFIX + i
    }, opt));
  }

  var widthAndOffsets = doCalBarWidthAndOffset(params);
  var result = [];

  for (var i = 0; i < opt.count; i++) {
    var item = widthAndOffsets[axisKey][STACK_PREFIX + i];
    item.offsetCenter = item.offset + item.width / 2;
    result.push(item);
  }

  return result;
}
export function prepareLayoutBarSeries(seriesType, ecModel) {
  var seriesModels = [];
  ecModel.eachSeriesByType(seriesType, function (seriesModel) {
    if (isOnCartesian(seriesModel) && !isInLargeMode(seriesModel)) {
      seriesModels.push(seriesModel);
    }
  });
  return seriesModels;
}

function getValueAxesMinGaps(barSeries) {
  var axisValues = {};
  zrUtil.each(barSeries, function (seriesModel) {
    var cartesian = seriesModel.coordinateSystem;
    var baseAxis = cartesian.getBaseAxis();

    if (baseAxis.type !== 'time' && baseAxis.type !== 'value') {
      return;
    }

    var data = seriesModel.getData();
    var key = baseAxis.dim + '_' + baseAxis.index;
    var dim = data.mapDimension(baseAxis.dim);

    for (var i = 0, cnt = data.count(); i < cnt; ++i) {
      var value = data.get(dim, i);

      if (!axisValues[key]) {
        axisValues[key] = [value];
      } else {
        axisValues[key].push(value);
      }
    }
  });
  var axisMinGaps = {};

  for (var key in axisValues) {
    if (axisValues.hasOwnProperty(key)) {
      var valuesInAxis = axisValues[key];

      if (valuesInAxis) {
        valuesInAxis.sort(function (a, b) {
          return a - b;
        });
        var min = null;

        for (var j = 1; j < valuesInAxis.length; ++j) {
          var delta = valuesInAxis[j] - valuesInAxis[j - 1];

          if (delta > 0) {
            min = min === null ? delta : Math.min(min, delta);
          }
        }

        axisMinGaps[key] = min;
      }
    }
  }

  return axisMinGaps;
}

export function makeColumnLayout(barSeries) {
  var axisMinGaps = getValueAxesMinGaps(barSeries);
  var seriesInfoList = [];
  zrUtil.each(barSeries, function (seriesModel) {
    var cartesian = seriesModel.coordinateSystem;
    var baseAxis = cartesian.getBaseAxis();
    var axisExtent = baseAxis.getExtent();
    var bandWidth;

    if (baseAxis.type === 'category') {
      bandWidth = baseAxis.getBandWidth();
    } else if (baseAxis.type === 'value' || baseAxis.type === 'time') {
      var key = baseAxis.dim + '_' + baseAxis.index;
      var minGap = axisMinGaps[key];
      var extentSpan = Math.abs(axisExtent[1] - axisExtent[0]);
      var scale = baseAxis.scale.getExtent();
      var scaleSpan = Math.abs(scale[1] - scale[0]);
      bandWidth = minGap ? extentSpan / scaleSpan * minGap : extentSpan;
    } else {
      var data = seriesModel.getData();
      bandWidth = Math.abs(axisExtent[1] - axisExtent[0]) / data.count();
    }

    var barWidth = parsePercent(seriesModel.get('barWidth'), bandWidth);
    var barMaxWidth = parsePercent(seriesModel.get('barMaxWidth'), bandWidth);
    var barMinWidth = parsePercent(seriesModel.get('barMinWidth') || 1, bandWidth);
    var barGap = seriesModel.get('barGap');
    var barCategoryGap = seriesModel.get('barCategoryGap');
    seriesInfoList.push({
      bandWidth: bandWidth,
      barWidth: barWidth,
      barMaxWidth: barMaxWidth,
      barMinWidth: barMinWidth,
      barGap: barGap,
      barCategoryGap: barCategoryGap,
      axisKey: getAxisKey(baseAxis),
      stackId: getSeriesStackId(seriesModel)
    });
  });
  return doCalBarWidthAndOffset(seriesInfoList);
}

function doCalBarWidthAndOffset(seriesInfoList) {
  var columnsMap = {};
  zrUtil.each(seriesInfoList, function (seriesInfo, idx) {
    var axisKey = seriesInfo.axisKey;
    var bandWidth = seriesInfo.bandWidth;
    var columnsOnAxis = columnsMap[axisKey] || {
      bandWidth: bandWidth,
      remainedWidth: bandWidth,
      autoWidthCount: 0,
      categoryGap: null,
      gap: '20%',
      stacks: {}
    };
    var stacks = columnsOnAxis.stacks;
    columnsMap[axisKey] = columnsOnAxis;
    var stackId = seriesInfo.stackId;

    if (!stacks[stackId]) {
      columnsOnAxis.autoWidthCount++;
    }

    stacks[stackId] = stacks[stackId] || {
      width: 0,
      maxWidth: 0
    };
    var barWidth = seriesInfo.barWidth;

    if (barWidth && !stacks[stackId].width) {
      stacks[stackId].width = barWidth;
      barWidth = Math.min(columnsOnAxis.remainedWidth, barWidth);
      columnsOnAxis.remainedWidth -= barWidth;
    }

    var barMaxWidth = seriesInfo.barMaxWidth;
    barMaxWidth && (stacks[stackId].maxWidth = barMaxWidth);
    var barMinWidth = seriesInfo.barMinWidth;
    barMinWidth && (stacks[stackId].minWidth = barMinWidth);
    var barGap = seriesInfo.barGap;
    barGap != null && (columnsOnAxis.gap = barGap);
    var barCategoryGap = seriesInfo.barCategoryGap;
    barCategoryGap != null && (columnsOnAxis.categoryGap = barCategoryGap);
  });
  var result = {};
  zrUtil.each(columnsMap, function (columnsOnAxis, coordSysName) {
    result[coordSysName] = {};
    var stacks = columnsOnAxis.stacks;
    var bandWidth = columnsOnAxis.bandWidth;
    var categoryGapPercent = columnsOnAxis.categoryGap;

    if (categoryGapPercent == null) {
      var columnCount = zrUtil.keys(stacks).length;
      categoryGapPercent = Math.max(35 - columnCount * 4, 15) + '%';
    }

    var categoryGap = parsePercent(categoryGapPercent, bandWidth);
    var barGapPercent = parsePercent(columnsOnAxis.gap, 1);
    var remainedWidth = columnsOnAxis.remainedWidth;
    var autoWidthCount = columnsOnAxis.autoWidthCount;
    var autoWidth = (remainedWidth - categoryGap) / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
    autoWidth = Math.max(autoWidth, 0);
    zrUtil.each(stacks, function (column) {
      var maxWidth = column.maxWidth;
      var minWidth = column.minWidth;

      if (!column.width) {
        var finalWidth = autoWidth;

        if (maxWidth && maxWidth < finalWidth) {
          finalWidth = Math.min(maxWidth, remainedWidth);
        }

        if (minWidth && minWidth > finalWidth) {
          finalWidth = minWidth;
        }

        if (finalWidth !== autoWidth) {
          column.width = finalWidth;
          remainedWidth -= finalWidth + barGapPercent * finalWidth;
          autoWidthCount--;
        }
      } else {
        var finalWidth = column.width;

        if (maxWidth) {
          finalWidth = Math.min(finalWidth, maxWidth);
        }

        if (minWidth) {
          finalWidth = Math.max(finalWidth, minWidth);
        }

        column.width = finalWidth;
        remainedWidth -= finalWidth + barGapPercent * finalWidth;
        autoWidthCount--;
      }
    });
    autoWidth = (remainedWidth - categoryGap) / (autoWidthCount + (autoWidthCount - 1) * barGapPercent);
    autoWidth = Math.max(autoWidth, 0);
    var widthSum = 0;
    var lastColumn;
    zrUtil.each(stacks, function (column, idx) {
      if (!column.width) {
        column.width = autoWidth;
      }

      lastColumn = column;
      widthSum += column.width * (1 + barGapPercent);
    });

    if (lastColumn) {
      widthSum -= lastColumn.width * barGapPercent;
    }

    var offset = -widthSum / 2;
    zrUtil.each(stacks, function (column, stackId) {
      result[coordSysName][stackId] = result[coordSysName][stackId] || {
        bandWidth: bandWidth,
        offset: offset,
        width: column.width
      };
      offset += column.width * (1 + barGapPercent);
    });
  });
  return result;
}

function retrieveColumnLayout(barWidthAndOffset, axis, seriesModel) {
  if (barWidthAndOffset && axis) {
    var result = barWidthAndOffset[getAxisKey(axis)];

    if (result != null && seriesModel != null) {
      return result[getSeriesStackId(seriesModel)];
    }

    return result;
  }
}

export { retrieveColumnLayout };
export function layout(seriesType, ecModel) {
  var seriesModels = prepareLayoutBarSeries(seriesType, ecModel);
  var barWidthAndOffset = makeColumnLayout(seriesModels);
  var lastStackCoords = {};
  zrUtil.each(seriesModels, function (seriesModel) {
    var data = seriesModel.getData();
    var cartesian = seriesModel.coordinateSystem;
    var baseAxis = cartesian.getBaseAxis();
    var stackId = getSeriesStackId(seriesModel);
    var columnLayoutInfo = barWidthAndOffset[getAxisKey(baseAxis)][stackId];
    var columnOffset = columnLayoutInfo.offset;
    var columnWidth = columnLayoutInfo.width;
    var valueAxis = cartesian.getOtherAxis(baseAxis);
    var barMinHeight = seriesModel.get('barMinHeight') || 0;
    lastStackCoords[stackId] = lastStackCoords[stackId] || [];
    data.setLayout({
      bandWidth: columnLayoutInfo.bandWidth,
      offset: columnOffset,
      size: columnWidth
    });
    var valueDim = data.mapDimension(valueAxis.dim);
    var baseDim = data.mapDimension(baseAxis.dim);
    var stacked = isDimensionStacked(data, valueDim);
    var isValueAxisH = valueAxis.isHorizontal();
    var valueAxisStart = getValueAxisStart(baseAxis, valueAxis, stacked);

    for (var idx = 0, len = data.count(); idx < len; idx++) {
      var value = data.get(valueDim, idx);
      var baseValue = data.get(baseDim, idx);
      var sign = value >= 0 ? 'p' : 'n';
      var baseCoord = valueAxisStart;

      if (stacked) {
        if (!lastStackCoords[stackId][baseValue]) {
          lastStackCoords[stackId][baseValue] = {
            p: valueAxisStart,
            n: valueAxisStart
          };
        }

        baseCoord = lastStackCoords[stackId][baseValue][sign];
      }

      var x = void 0;
      var y = void 0;
      var width = void 0;
      var height = void 0;

      if (isValueAxisH) {
        var coord = cartesian.dataToPoint([value, baseValue]);
        x = baseCoord;
        y = coord[1] + columnOffset;
        width = coord[0] - valueAxisStart;
        height = columnWidth;

        if (Math.abs(width) < barMinHeight) {
          width = (width < 0 ? -1 : 1) * barMinHeight;
        }

        if (!isNaN(width)) {
          stacked && (lastStackCoords[stackId][baseValue][sign] += width);
        }
      } else {
        var coord = cartesian.dataToPoint([baseValue, value]);
        x = coord[0] + columnOffset;
        y = baseCoord;
        width = columnWidth;
        height = coord[1] - valueAxisStart;

        if (Math.abs(height) < barMinHeight) {
          height = (height <= 0 ? -1 : 1) * barMinHeight;
        }

        if (!isNaN(height)) {
          stacked && (lastStackCoords[stackId][baseValue][sign] += height);
        }
      }

      data.setItemLayout(idx, {
        x: x,
        y: y,
        width: width,
        height: height
      });
    }
  });
}
export var largeLayout = {
  seriesType: 'bar',
  plan: createRenderPlanner(),
  reset: function (seriesModel) {
    if (!isOnCartesian(seriesModel) || !isInLargeMode(seriesModel)) {
      return;
    }

    var data = seriesModel.getData();
    var cartesian = seriesModel.coordinateSystem;
    var coordLayout = cartesian.master.getRect();
    var baseAxis = cartesian.getBaseAxis();
    var valueAxis = cartesian.getOtherAxis(baseAxis);
    var valueDim = data.mapDimension(valueAxis.dim);
    var baseDim = data.mapDimension(baseAxis.dim);
    var valueAxisHorizontal = valueAxis.isHorizontal();
    var valueDimIdx = valueAxisHorizontal ? 0 : 1;
    var barWidth = retrieveColumnLayout(makeColumnLayout([seriesModel]), baseAxis, seriesModel).width;

    if (!(barWidth > LARGE_BAR_MIN_WIDTH)) {
      barWidth = LARGE_BAR_MIN_WIDTH;
    }

    return {
      progress: function (params, data) {
        var count = params.count;
        var largePoints = new LargeArr(count * 2);
        var largeBackgroundPoints = new LargeArr(count * 2);
        var largeDataIndices = new LargeArr(count);
        var dataIndex;
        var coord = [];
        var valuePair = [];
        var pointsOffset = 0;
        var idxOffset = 0;

        while ((dataIndex = params.next()) != null) {
          valuePair[valueDimIdx] = data.get(valueDim, dataIndex);
          valuePair[1 - valueDimIdx] = data.get(baseDim, dataIndex);
          coord = cartesian.dataToPoint(valuePair, null, coord);
          largeBackgroundPoints[pointsOffset] = valueAxisHorizontal ? coordLayout.x + coordLayout.width : coord[0];
          largePoints[pointsOffset++] = coord[0];
          largeBackgroundPoints[pointsOffset] = valueAxisHorizontal ? coord[1] : coordLayout.y + coordLayout.height;
          largePoints[pointsOffset++] = coord[1];
          largeDataIndices[idxOffset++] = dataIndex;
        }

        data.setLayout({
          largePoints: largePoints,
          largeDataIndices: largeDataIndices,
          largeBackgroundPoints: largeBackgroundPoints,
          barWidth: barWidth,
          valueAxisStart: getValueAxisStart(baseAxis, valueAxis, false),
          backgroundStart: valueAxisHorizontal ? coordLayout.x : coordLayout.y,
          valueAxisHorizontal: valueAxisHorizontal
        });
      }
    };
  }
};

function isOnCartesian(seriesModel) {
  return seriesModel.coordinateSystem && seriesModel.coordinateSystem.type === 'cartesian2d';
}

function isInLargeMode(seriesModel) {
  return seriesModel.pipelineContext && seriesModel.pipelineContext.large;
}

function getValueAxisStart(baseAxis, valueAxis, stacked) {
  return valueAxis.toGlobalCoord(valueAxis.dataToCoord(valueAxis.type === 'log' ? 1 : 0));
}