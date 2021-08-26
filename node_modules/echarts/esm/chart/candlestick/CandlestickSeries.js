
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
import * as zrUtil from 'zrender/esm/core/util';
import SeriesModel from '../../model/Series';
import { WhiskerBoxCommonMixin } from '../helper/whiskerBoxCommon';

var CandlestickSeriesModel = function (_super) {
  __extends(CandlestickSeriesModel, _super);

  function CandlestickSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = CandlestickSeriesModel.type;
    _this.defaultValueDimensions = [{
      name: 'open',
      defaultTooltip: true
    }, {
      name: 'close',
      defaultTooltip: true
    }, {
      name: 'lowest',
      defaultTooltip: true
    }, {
      name: 'highest',
      defaultTooltip: true
    }];
    return _this;
  }

  CandlestickSeriesModel.prototype.getShadowDim = function () {
    return 'open';
  };

  CandlestickSeriesModel.prototype.brushSelector = function (dataIndex, data, selectors) {
    var itemLayout = data.getItemLayout(dataIndex);
    return itemLayout && selectors.rect(itemLayout.brushRect);
  };

  CandlestickSeriesModel.type = 'series.candlestick';
  CandlestickSeriesModel.dependencies = ['xAxis', 'yAxis', 'grid'];
  CandlestickSeriesModel.defaultOption = {
    zlevel: 0,
    z: 2,
    coordinateSystem: 'cartesian2d',
    legendHoverLink: true,
    layout: null,
    clip: true,
    itemStyle: {
      color: '#c23531',
      color0: '#314656',
      borderWidth: 1,
      borderColor: '#c23531',
      borderColor0: '#314656'
    },
    emphasis: {
      scale: true,
      itemStyle: {
        borderWidth: 2
      }
    },
    barMaxWidth: null,
    barMinWidth: null,
    barWidth: null,
    large: true,
    largeThreshold: 600,
    progressive: 3e3,
    progressiveThreshold: 1e4,
    progressiveChunkMode: 'mod',
    animationEasing: 'linear',
    animationDuration: 300
  };
  return CandlestickSeriesModel;
}(SeriesModel);

zrUtil.mixin(CandlestickSeriesModel, WhiskerBoxCommonMixin, true);
SeriesModel.registerClass(CandlestickSeriesModel);
export default CandlestickSeriesModel;