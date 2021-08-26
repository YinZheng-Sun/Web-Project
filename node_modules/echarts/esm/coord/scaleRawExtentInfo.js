
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

import { assert, isArray, eqNaN, isFunction } from 'zrender/esm/core/util';
import { parsePercent } from 'zrender/esm/contain/text';

var ScaleRawExtentInfo = function () {
  function ScaleRawExtentInfo(scale, model, originalExtent) {
    this._prepareParams(scale, model, originalExtent);
  }

  ScaleRawExtentInfo.prototype._prepareParams = function (scale, model, dataExtent) {
    if (dataExtent[1] < dataExtent[0]) {
      dataExtent = [NaN, NaN];
    }

    this._dataMin = dataExtent[0];
    this._dataMax = dataExtent[1];
    var isOrdinal = this._isOrdinal = scale.type === 'ordinal';
    this._needCrossZero = model.getNeedCrossZero && model.getNeedCrossZero();
    var modelMinRaw = this._modelMinRaw = model.get('min', true);

    if (isFunction(modelMinRaw)) {
      this._modelMinNum = parseAxisModelMinMax(scale, modelMinRaw({
        min: dataExtent[0],
        max: dataExtent[1]
      }));
    } else if (modelMinRaw !== 'dataMin') {
      this._modelMinNum = parseAxisModelMinMax(scale, modelMinRaw);
    }

    var modelMaxRaw = this._modelMaxRaw = model.get('max', true);

    if (isFunction(modelMaxRaw)) {
      this._modelMaxNum = parseAxisModelMinMax(scale, modelMaxRaw({
        min: dataExtent[0],
        max: dataExtent[1]
      }));
    } else if (modelMaxRaw !== 'dataMax') {
      this._modelMaxNum = parseAxisModelMinMax(scale, modelMaxRaw);
    }

    if (isOrdinal) {
      this._axisDataLen = model.getCategories().length;
    } else {
      var boundaryGap = model.get('boundaryGap');
      var boundaryGapArr = isArray(boundaryGap) ? boundaryGap : [boundaryGap || 0, boundaryGap || 0];

      if (typeof boundaryGapArr[0] === 'boolean' || typeof boundaryGapArr[1] === 'boolean') {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Boolean type for boundaryGap is only ' + 'allowed for ordinal axis. Please use string in ' + 'percentage instead, e.g., "20%". Currently, ' + 'boundaryGap is set to be 0.');
        }

        this._boundaryGapInner = [0, 0];
      } else {
        this._boundaryGapInner = [parsePercent(boundaryGapArr[0], 1), parsePercent(boundaryGapArr[1], 1)];
      }
    }
  };

  ScaleRawExtentInfo.prototype.calculate = function () {
    var isOrdinal = this._isOrdinal;
    var dataMin = this._dataMin;
    var dataMax = this._dataMax;
    var axisDataLen = this._axisDataLen;
    var boundaryGapInner = this._boundaryGapInner;
    var span = !isOrdinal ? dataMax - dataMin || Math.abs(dataMin) : null;
    var min = this._modelMinRaw === 'dataMin' ? dataMin : this._modelMinNum;
    var max = this._modelMaxRaw === 'dataMax' ? dataMax : this._modelMaxNum;
    var minFixed = min != null;
    var maxFixed = max != null;

    if (min == null) {
      min = isOrdinal ? axisDataLen ? 0 : NaN : dataMin - boundaryGapInner[0] * span;
    }

    if (max == null) {
      max = isOrdinal ? axisDataLen ? axisDataLen - 1 : NaN : dataMax + boundaryGapInner[1] * span;
    }

    (min == null || !isFinite(min)) && (min = NaN);
    (max == null || !isFinite(max)) && (max = NaN);

    if (min > max) {
      min = NaN;
      max = NaN;
    }

    var isBlank = eqNaN(min) || eqNaN(max) || isOrdinal && !axisDataLen;

    if (this._needCrossZero) {
      if (min > 0 && max > 0 && !minFixed) {
        min = 0;
      }

      if (min < 0 && max < 0 && !maxFixed) {
        max = 0;
      }
    }

    var determinedMin = this._determinedMin;
    var determinedMax = this._determinedMax;

    if (determinedMin != null) {
      min = determinedMin;
      minFixed = true;
    }

    if (determinedMax != null) {
      max = determinedMax;
      maxFixed = true;
    }

    return {
      min: min,
      max: max,
      minFixed: minFixed,
      maxFixed: maxFixed,
      isBlank: isBlank
    };
  };

  ScaleRawExtentInfo.prototype.modifyDataMinMax = function (minMaxName, val) {
    if (process.env.NODE_ENV !== 'production') {
      assert(!this.frozen);
    }

    this[DATA_MIN_MAX_ATTR[minMaxName]] = val;
  };

  ScaleRawExtentInfo.prototype.setDeterminedMinMax = function (minMaxName, val) {
    var attr = DETERMINED_MIN_MAX_ATTR[minMaxName];

    if (process.env.NODE_ENV !== 'production') {
      assert(!this.frozen && this[attr] == null);
    }

    this[attr] = val;
  };

  ScaleRawExtentInfo.prototype.freeze = function () {
    this.frozen = true;
  };

  return ScaleRawExtentInfo;
}();

export { ScaleRawExtentInfo };
var DETERMINED_MIN_MAX_ATTR = {
  min: '_determinedMin',
  max: '_determinedMax'
};
var DATA_MIN_MAX_ATTR = {
  min: '_dataMin',
  max: '_dataMax'
};
export function ensureScaleRawExtentInfo(scale, model, originalExtent) {
  var rawExtentInfo = scale.rawExtentInfo;

  if (rawExtentInfo) {
    return rawExtentInfo;
  }

  rawExtentInfo = new ScaleRawExtentInfo(scale, model, originalExtent);
  scale.rawExtentInfo = rawExtentInfo;
  return rawExtentInfo;
}
export function parseAxisModelMinMax(scale, minMax) {
  return minMax == null ? null : eqNaN(minMax) ? NaN : scale.parse(minMax);
}