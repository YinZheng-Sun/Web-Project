
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
import * as numberUtil from '../../util/number';
import sliderMove from '../helper/sliderMove';
import { unionAxisExtentFromData } from '../../coord/axisHelper';
import { ensureScaleRawExtentInfo } from '../../coord/scaleRawExtentInfo';
import { getAxisMainType, isCoordSupported } from './helper';
import { SINGLE_REFERRING } from '../../util/model';
var each = zrUtil.each;
var asc = numberUtil.asc;

var AxisProxy = function () {
  function AxisProxy(dimName, axisIndex, dataZoomModel, ecModel) {
    this._dimName = dimName;
    this._axisIndex = axisIndex;
    this.ecModel = ecModel;
    this._dataZoomModel = dataZoomModel;
  }

  AxisProxy.prototype.hostedBy = function (dataZoomModel) {
    return this._dataZoomModel === dataZoomModel;
  };

  AxisProxy.prototype.getDataValueWindow = function () {
    return this._valueWindow.slice();
  };

  AxisProxy.prototype.getDataPercentWindow = function () {
    return this._percentWindow.slice();
  };

  AxisProxy.prototype.getTargetSeriesModels = function () {
    var seriesModels = [];
    this.ecModel.eachSeries(function (seriesModel) {
      if (isCoordSupported(seriesModel)) {
        var axisMainType = getAxisMainType(this._dimName);
        var axisModel = seriesModel.getReferringComponents(axisMainType, SINGLE_REFERRING).models[0];

        if (axisModel && this._axisIndex === axisModel.componentIndex) {
          seriesModels.push(seriesModel);
        }
      }
    }, this);
    return seriesModels;
  };

  AxisProxy.prototype.getAxisModel = function () {
    return this.ecModel.getComponent(this._dimName + 'Axis', this._axisIndex);
  };

  AxisProxy.prototype.getMinMaxSpan = function () {
    return zrUtil.clone(this._minMaxSpan);
  };

  AxisProxy.prototype.calculateDataWindow = function (opt) {
    var dataExtent = this._dataExtent;
    var axisModel = this.getAxisModel();
    var scale = axisModel.axis.scale;

    var rangePropMode = this._dataZoomModel.getRangePropMode();

    var percentExtent = [0, 100];
    var percentWindow = [];
    var valueWindow = [];
    var hasPropModeValue;
    each(['start', 'end'], function (prop, idx) {
      var boundPercent = opt[prop];
      var boundValue = opt[prop + 'Value'];

      if (rangePropMode[idx] === 'percent') {
        boundPercent == null && (boundPercent = percentExtent[idx]);
        boundValue = scale.parse(numberUtil.linearMap(boundPercent, percentExtent, dataExtent));
      } else {
        hasPropModeValue = true;
        boundValue = boundValue == null ? dataExtent[idx] : scale.parse(boundValue);
        boundPercent = numberUtil.linearMap(boundValue, dataExtent, percentExtent);
      }

      valueWindow[idx] = boundValue;
      percentWindow[idx] = boundPercent;
    });
    asc(valueWindow);
    asc(percentWindow);
    var spans = this._minMaxSpan;
    hasPropModeValue ? restrictSet(valueWindow, percentWindow, dataExtent, percentExtent, false) : restrictSet(percentWindow, valueWindow, percentExtent, dataExtent, true);

    function restrictSet(fromWindow, toWindow, fromExtent, toExtent, toValue) {
      var suffix = toValue ? 'Span' : 'ValueSpan';
      sliderMove(0, fromWindow, fromExtent, 'all', spans['min' + suffix], spans['max' + suffix]);

      for (var i = 0; i < 2; i++) {
        toWindow[i] = numberUtil.linearMap(fromWindow[i], fromExtent, toExtent, true);
        toValue && (toWindow[i] = scale.parse(toWindow[i]));
      }
    }

    return {
      valueWindow: valueWindow,
      percentWindow: percentWindow
    };
  };

  AxisProxy.prototype.reset = function (dataZoomModel) {
    if (dataZoomModel !== this._dataZoomModel) {
      return;
    }

    var targetSeries = this.getTargetSeriesModels();
    this._dataExtent = calculateDataExtent(this, this._dimName, targetSeries);

    this._updateMinMaxSpan();

    var dataWindow = this.calculateDataWindow(dataZoomModel.settledOption);
    this._valueWindow = dataWindow.valueWindow;
    this._percentWindow = dataWindow.percentWindow;

    this._setAxisModel();
  };

  AxisProxy.prototype.filterData = function (dataZoomModel, api) {
    if (dataZoomModel !== this._dataZoomModel) {
      return;
    }

    var axisDim = this._dimName;
    var seriesModels = this.getTargetSeriesModels();
    var filterMode = dataZoomModel.get('filterMode');
    var valueWindow = this._valueWindow;

    if (filterMode === 'none') {
      return;
    }

    each(seriesModels, function (seriesModel) {
      var seriesData = seriesModel.getData();
      var dataDims = seriesData.mapDimensionsAll(axisDim);

      if (!dataDims.length) {
        return;
      }

      if (filterMode === 'weakFilter') {
        seriesData.filterSelf(function (dataIndex) {
          var leftOut;
          var rightOut;
          var hasValue;

          for (var i = 0; i < dataDims.length; i++) {
            var value = seriesData.get(dataDims[i], dataIndex);
            var thisHasValue = !isNaN(value);
            var thisLeftOut = value < valueWindow[0];
            var thisRightOut = value > valueWindow[1];

            if (thisHasValue && !thisLeftOut && !thisRightOut) {
              return true;
            }

            thisHasValue && (hasValue = true);
            thisLeftOut && (leftOut = true);
            thisRightOut && (rightOut = true);
          }

          return hasValue && leftOut && rightOut;
        });
      } else {
        each(dataDims, function (dim) {
          if (filterMode === 'empty') {
            seriesModel.setData(seriesData = seriesData.map(dim, function (value) {
              return !isInWindow(value) ? NaN : value;
            }));
          } else {
            var range = {};
            range[dim] = valueWindow;
            seriesData.selectRange(range);
          }
        });
      }

      each(dataDims, function (dim) {
        seriesData.setApproximateExtent(valueWindow, dim);
      });
    });

    function isInWindow(value) {
      return value >= valueWindow[0] && value <= valueWindow[1];
    }
  };

  AxisProxy.prototype._updateMinMaxSpan = function () {
    var minMaxSpan = this._minMaxSpan = {};
    var dataZoomModel = this._dataZoomModel;
    var dataExtent = this._dataExtent;
    each(['min', 'max'], function (minMax) {
      var percentSpan = dataZoomModel.get(minMax + 'Span');
      var valueSpan = dataZoomModel.get(minMax + 'ValueSpan');
      valueSpan != null && (valueSpan = this.getAxisModel().axis.scale.parse(valueSpan));

      if (valueSpan != null) {
        percentSpan = numberUtil.linearMap(dataExtent[0] + valueSpan, dataExtent, [0, 100], true);
      } else if (percentSpan != null) {
        valueSpan = numberUtil.linearMap(percentSpan, [0, 100], dataExtent, true) - dataExtent[0];
      }

      minMaxSpan[minMax + 'Span'] = percentSpan;
      minMaxSpan[minMax + 'ValueSpan'] = valueSpan;
    }, this);
  };

  AxisProxy.prototype._setAxisModel = function () {
    var axisModel = this.getAxisModel();
    var percentWindow = this._percentWindow;
    var valueWindow = this._valueWindow;

    if (!percentWindow) {
      return;
    }

    var precision = numberUtil.getPixelPrecision(valueWindow, [0, 500]);
    precision = Math.min(precision, 20);
    var rawExtentInfo = axisModel.axis.scale.rawExtentInfo;

    if (percentWindow[0] !== 0) {
      rawExtentInfo.setDeterminedMinMax('min', +valueWindow[0].toFixed(precision));
    }

    if (percentWindow[1] !== 100) {
      rawExtentInfo.setDeterminedMinMax('max', +valueWindow[1].toFixed(precision));
    }

    rawExtentInfo.freeze();
  };

  return AxisProxy;
}();

function calculateDataExtent(axisProxy, axisDim, seriesModels) {
  var dataExtent = [Infinity, -Infinity];
  each(seriesModels, function (seriesModel) {
    unionAxisExtentFromData(dataExtent, seriesModel.getData(), axisDim);
  });
  var axisModel = axisProxy.getAxisModel();
  var rawExtentResult = ensureScaleRawExtentInfo(axisModel.axis.scale, axisModel, dataExtent).calculate();
  return [rawExtentResult.min, rawExtentResult.max];
}

export default AxisProxy;