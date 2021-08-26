
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

import { __extends } from "tslib";
import * as numberUtil from '../util/number';
import * as formatUtil from '../util/format';
import Scale from './Scale';
import * as helper from './helper';
var roundNumber = numberUtil.round;

var IntervalScale = function (_super) {
  __extends(IntervalScale, _super);

  function IntervalScale() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = 'interval';
    _this._interval = 0;
    _this._intervalPrecision = 2;
    return _this;
  }

  IntervalScale.prototype.parse = function (val) {
    return val;
  };

  IntervalScale.prototype.contain = function (val) {
    return helper.contain(val, this._extent);
  };

  IntervalScale.prototype.normalize = function (val) {
    return helper.normalize(val, this._extent);
  };

  IntervalScale.prototype.scale = function (val) {
    return helper.scale(val, this._extent);
  };

  IntervalScale.prototype.setExtent = function (start, end) {
    var thisExtent = this._extent;

    if (!isNaN(start)) {
      thisExtent[0] = parseFloat(start);
    }

    if (!isNaN(end)) {
      thisExtent[1] = parseFloat(end);
    }
  };

  IntervalScale.prototype.unionExtent = function (other) {
    var extent = this._extent;
    other[0] < extent[0] && (extent[0] = other[0]);
    other[1] > extent[1] && (extent[1] = other[1]);
    this.setExtent(extent[0], extent[1]);
  };

  IntervalScale.prototype.getInterval = function () {
    return this._interval;
  };

  IntervalScale.prototype.setInterval = function (interval) {
    this._interval = interval;
    this._niceExtent = this._extent.slice();
    this._intervalPrecision = helper.getIntervalPrecision(interval);
  };

  IntervalScale.prototype.getTicks = function (expandToNicedExtent) {
    var interval = this._interval;
    var extent = this._extent;
    var niceTickExtent = this._niceExtent;
    var intervalPrecision = this._intervalPrecision;
    var ticks = [];

    if (!interval) {
      return ticks;
    }

    var safeLimit = 10000;

    if (extent[0] < niceTickExtent[0]) {
      if (expandToNicedExtent) {
        ticks.push({
          value: roundNumber(niceTickExtent[0] - interval, intervalPrecision)
        });
      } else {
        ticks.push({
          value: extent[0]
        });
      }
    }

    var tick = niceTickExtent[0];

    while (tick <= niceTickExtent[1]) {
      ticks.push({
        value: tick
      });
      tick = roundNumber(tick + interval, intervalPrecision);

      if (tick === ticks[ticks.length - 1].value) {
        break;
      }

      if (ticks.length > safeLimit) {
        return [];
      }
    }

    var lastNiceTick = ticks.length ? ticks[ticks.length - 1].value : niceTickExtent[1];

    if (extent[1] > lastNiceTick) {
      if (expandToNicedExtent) {
        ticks.push({
          value: roundNumber(lastNiceTick + interval, intervalPrecision)
        });
      } else {
        ticks.push({
          value: extent[1]
        });
      }
    }

    return ticks;
  };

  IntervalScale.prototype.getMinorTicks = function (splitNumber) {
    var ticks = this.getTicks(true);
    var minorTicks = [];
    var extent = this.getExtent();

    for (var i = 1; i < ticks.length; i++) {
      var nextTick = ticks[i];
      var prevTick = ticks[i - 1];
      var count = 0;
      var minorTicksGroup = [];
      var interval = nextTick.value - prevTick.value;
      var minorInterval = interval / splitNumber;

      while (count < splitNumber - 1) {
        var minorTick = roundNumber(prevTick.value + (count + 1) * minorInterval);

        if (minorTick > extent[0] && minorTick < extent[1]) {
          minorTicksGroup.push(minorTick);
        }

        count++;
      }

      minorTicks.push(minorTicksGroup);
    }

    return minorTicks;
  };

  IntervalScale.prototype.getLabel = function (data, opt) {
    if (data == null) {
      return '';
    }

    var precision = opt && opt.precision;

    if (precision == null) {
      precision = numberUtil.getPrecisionSafe(data.value) || 0;
    } else if (precision === 'auto') {
      precision = this._intervalPrecision;
    }

    var dataNum = roundNumber(data.value, precision, true);
    return formatUtil.addCommas(dataNum);
  };

  IntervalScale.prototype.niceTicks = function (splitNumber, minInterval, maxInterval) {
    splitNumber = splitNumber || 5;
    var extent = this._extent;
    var span = extent[1] - extent[0];

    if (!isFinite(span)) {
      return;
    }

    if (span < 0) {
      span = -span;
      extent.reverse();
    }

    var result = helper.intervalScaleNiceTicks(extent, splitNumber, minInterval, maxInterval);
    this._intervalPrecision = result.intervalPrecision;
    this._interval = result.interval;
    this._niceExtent = result.niceTickExtent;
  };

  IntervalScale.prototype.niceExtent = function (opt) {
    var extent = this._extent;

    if (extent[0] === extent[1]) {
      if (extent[0] !== 0) {
        var expandSize = extent[0];

        if (!opt.fixMax) {
          extent[1] += expandSize / 2;
          extent[0] -= expandSize / 2;
        } else {
          extent[0] -= expandSize / 2;
        }
      } else {
        extent[1] = 1;
      }
    }

    var span = extent[1] - extent[0];

    if (!isFinite(span)) {
      extent[0] = 0;
      extent[1] = 1;
    }

    this.niceTicks(opt.splitNumber, opt.minInterval, opt.maxInterval);
    var interval = this._interval;

    if (!opt.fixMin) {
      extent[0] = roundNumber(Math.floor(extent[0] / interval) * interval);
    }

    if (!opt.fixMax) {
      extent[1] = roundNumber(Math.ceil(extent[1] / interval) * interval);
    }
  };

  IntervalScale.type = 'interval';
  return IntervalScale;
}(Scale);

Scale.registerClass(IntervalScale);
export default IntervalScale;