
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
import IndicatorAxis from './IndicatorAxis';
import IntervalScale from '../../scale/Interval';
import * as numberUtil from '../../util/number';
import { getScaleExtent, niceScaleExtent } from '../axisHelper';
import CoordinateSystemManager from '../../CoordinateSystem';
import { parseAxisModelMinMax } from '../scaleRawExtentInfo';

var Radar = function () {
  function Radar(radarModel, ecModel, api) {
    this.dimensions = [];
    this._model = radarModel;
    this._indicatorAxes = zrUtil.map(radarModel.getIndicatorModels(), function (indicatorModel, idx) {
      var dim = 'indicator_' + idx;
      var indicatorAxis = new IndicatorAxis(dim, new IntervalScale());
      indicatorAxis.name = indicatorModel.get('name');
      indicatorAxis.model = indicatorModel;
      indicatorModel.axis = indicatorAxis;
      this.dimensions.push(dim);
      return indicatorAxis;
    }, this);
    this.resize(radarModel, api);
  }

  Radar.prototype.getIndicatorAxes = function () {
    return this._indicatorAxes;
  };

  Radar.prototype.dataToPoint = function (value, indicatorIndex) {
    var indicatorAxis = this._indicatorAxes[indicatorIndex];
    return this.coordToPoint(indicatorAxis.dataToCoord(value), indicatorIndex);
  };

  Radar.prototype.coordToPoint = function (coord, indicatorIndex) {
    var indicatorAxis = this._indicatorAxes[indicatorIndex];
    var angle = indicatorAxis.angle;
    var x = this.cx + coord * Math.cos(angle);
    var y = this.cy - coord * Math.sin(angle);
    return [x, y];
  };

  Radar.prototype.pointToData = function (pt) {
    var dx = pt[0] - this.cx;
    var dy = pt[1] - this.cy;
    var radius = Math.sqrt(dx * dx + dy * dy);
    dx /= radius;
    dy /= radius;
    var radian = Math.atan2(-dy, dx);
    var minRadianDiff = Infinity;
    var closestAxis;
    var closestAxisIdx = -1;

    for (var i = 0; i < this._indicatorAxes.length; i++) {
      var indicatorAxis = this._indicatorAxes[i];
      var diff = Math.abs(radian - indicatorAxis.angle);

      if (diff < minRadianDiff) {
        closestAxis = indicatorAxis;
        closestAxisIdx = i;
        minRadianDiff = diff;
      }
    }

    return [closestAxisIdx, +(closestAxis && closestAxis.coordToData(radius))];
  };

  Radar.prototype.resize = function (radarModel, api) {
    var center = radarModel.get('center');
    var viewWidth = api.getWidth();
    var viewHeight = api.getHeight();
    var viewSize = Math.min(viewWidth, viewHeight) / 2;
    this.cx = numberUtil.parsePercent(center[0], viewWidth);
    this.cy = numberUtil.parsePercent(center[1], viewHeight);
    this.startAngle = radarModel.get('startAngle') * Math.PI / 180;
    var radius = radarModel.get('radius');

    if (typeof radius === 'string' || typeof radius === 'number') {
      radius = [0, radius];
    }

    this.r0 = numberUtil.parsePercent(radius[0], viewSize);
    this.r = numberUtil.parsePercent(radius[1], viewSize);
    zrUtil.each(this._indicatorAxes, function (indicatorAxis, idx) {
      indicatorAxis.setExtent(this.r0, this.r);
      var angle = this.startAngle + idx * Math.PI * 2 / this._indicatorAxes.length;
      angle = Math.atan2(Math.sin(angle), Math.cos(angle));
      indicatorAxis.angle = angle;
    }, this);
  };

  Radar.prototype.update = function (ecModel, api) {
    var indicatorAxes = this._indicatorAxes;
    var radarModel = this._model;
    zrUtil.each(indicatorAxes, function (indicatorAxis) {
      indicatorAxis.scale.setExtent(Infinity, -Infinity);
    });
    ecModel.eachSeriesByType('radar', function (radarSeries, idx) {
      if (radarSeries.get('coordinateSystem') !== 'radar' || ecModel.getComponent('radar', radarSeries.get('radarIndex')) !== radarModel) {
        return;
      }

      var data = radarSeries.getData();
      zrUtil.each(indicatorAxes, function (indicatorAxis) {
        indicatorAxis.scale.unionExtentFromData(data, data.mapDimension(indicatorAxis.dim));
      });
    }, this);
    var splitNumber = radarModel.get('splitNumber');

    function increaseInterval(interval) {
      var exp10 = Math.pow(10, Math.floor(Math.log(interval) / Math.LN10));
      var f = interval / exp10;

      if (f === 2) {
        f = 5;
      } else {
        f *= 2;
      }

      return f * exp10;
    }

    zrUtil.each(indicatorAxes, function (indicatorAxis, idx) {
      var rawExtent = getScaleExtent(indicatorAxis.scale, indicatorAxis.model).extent;
      niceScaleExtent(indicatorAxis.scale, indicatorAxis.model);
      var axisModel = indicatorAxis.model;
      var scale = indicatorAxis.scale;
      var fixedMin = parseAxisModelMinMax(scale, axisModel.get('min', true));
      var fixedMax = parseAxisModelMinMax(scale, axisModel.get('max', true));
      var interval = scale.getInterval();

      if (fixedMin != null && fixedMax != null) {
        scale.setExtent(+fixedMin, +fixedMax);
        scale.setInterval((fixedMax - fixedMin) / splitNumber);
      } else if (fixedMin != null) {
        var max = void 0;

        do {
          max = fixedMin + interval * splitNumber;
          scale.setExtent(+fixedMin, max);
          scale.setInterval(interval);
          interval = increaseInterval(interval);
        } while (max < rawExtent[1] && isFinite(max) && isFinite(rawExtent[1]));
      } else if (fixedMax != null) {
        var min = void 0;

        do {
          min = fixedMax - interval * splitNumber;
          scale.setExtent(min, +fixedMax);
          scale.setInterval(interval);
          interval = increaseInterval(interval);
        } while (min > rawExtent[0] && isFinite(min) && isFinite(rawExtent[0]));
      } else {
        var nicedSplitNumber = scale.getTicks().length - 1;

        if (nicedSplitNumber > splitNumber) {
          interval = increaseInterval(interval);
        }

        var max = Math.ceil(rawExtent[1] / interval) * interval;
        var min = numberUtil.round(max - interval * splitNumber);
        scale.setExtent(min, max);
        scale.setInterval(interval);
      }
    });
  };

  Radar.prototype.convertToPixel = function (ecModel, finder, value) {
    console.warn('Not implemented.');
    return null;
  };

  Radar.prototype.convertFromPixel = function (ecModel, finder, pixel) {
    console.warn('Not implemented.');
    return null;
  };

  Radar.prototype.containPoint = function (point) {
    console.warn('Not implemented.');
    return false;
  };

  Radar.create = function (ecModel, api) {
    var radarList = [];
    ecModel.eachComponent('radar', function (radarModel) {
      var radar = new Radar(radarModel, ecModel, api);
      radarList.push(radar);
      radarModel.coordinateSystem = radar;
    });
    ecModel.eachSeriesByType('radar', function (radarSeries) {
      if (radarSeries.get('coordinateSystem') === 'radar') {
        radarSeries.coordinateSystem = radarList[radarSeries.get('radarIndex') || 0];
      }
    });
    return radarList;
  };

  Radar.dimensions = [];
  return Radar;
}();

CoordinateSystemManager.register('radar', Radar);
export default Radar;