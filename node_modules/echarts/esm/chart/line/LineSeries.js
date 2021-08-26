
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
import createListFromArray from '../helper/createListFromArray';
import SeriesModel from '../../model/Series';

var LineSeriesModel = function (_super) {
  __extends(LineSeriesModel, _super);

  function LineSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = LineSeriesModel.type;
    _this.hasSymbolVisual = true;
    _this.legendSymbol = 'line';
    return _this;
  }

  LineSeriesModel.prototype.getInitialData = function (option) {
    if (process.env.NODE_ENV !== 'production') {
      var coordSys = option.coordinateSystem;

      if (coordSys !== 'polar' && coordSys !== 'cartesian2d') {
        throw new Error('Line not support coordinateSystem besides cartesian and polar');
      }
    }

    return createListFromArray(this.getSource(), this, {
      useEncodeDefaulter: true
    });
  };

  LineSeriesModel.type = 'series.line';
  LineSeriesModel.dependencies = ['grid', 'polar'];
  LineSeriesModel.defaultOption = {
    zlevel: 0,
    z: 3,
    coordinateSystem: 'cartesian2d',
    legendHoverLink: true,
    clip: true,
    label: {
      position: 'top'
    },
    endLabel: {
      show: false,
      valueAnimation: true,
      distance: 8
    },
    lineStyle: {
      width: 2,
      type: 'solid'
    },
    emphasis: {
      scale: true,
      lineStyle: {
        width: 'bolder'
      }
    },
    step: false,
    smooth: false,
    smoothMonotone: null,
    symbol: 'emptyCircle',
    symbolSize: 4,
    symbolRotate: null,
    showSymbol: true,
    showAllSymbol: 'auto',
    connectNulls: false,
    sampling: 'none',
    animationEasing: 'linear',
    progressive: 0,
    hoverLayerThreshold: Infinity
  };
  return LineSeriesModel;
}(SeriesModel);

SeriesModel.registerClass(LineSeriesModel);
export default LineSeriesModel;