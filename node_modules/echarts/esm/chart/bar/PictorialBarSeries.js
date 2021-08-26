
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
import BaseBarSeriesModel from './BaseBarSeries';
import SeriesModel from '../../model/Series';
import { inheritDefaultOption } from '../../util/component';

var PictorialBarSeriesModel = function (_super) {
  __extends(PictorialBarSeriesModel, _super);

  function PictorialBarSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = PictorialBarSeriesModel.type;
    _this.hasSymbolVisual = true;
    _this.defaultSymbol = 'roundRect';
    return _this;
  }

  PictorialBarSeriesModel.prototype.getInitialData = function (option) {
    option.stack = null;
    return _super.prototype.getInitialData.apply(this, arguments);
  };

  PictorialBarSeriesModel.type = 'series.pictorialBar';
  PictorialBarSeriesModel.dependencies = ['grid'];
  PictorialBarSeriesModel.defaultOption = inheritDefaultOption(BaseBarSeriesModel.defaultOption, {
    symbol: 'circle',
    symbolSize: null,
    symbolRotate: null,
    symbolPosition: null,
    symbolOffset: null,
    symbolMargin: null,
    symbolRepeat: false,
    symbolRepeatDirection: 'end',
    symbolClip: false,
    symbolBoundingData: null,
    symbolPatternSize: 400,
    barGap: '-100%',
    progressive: 0,
    emphasis: {
      scale: false
    },
    select: {
      itemStyle: {
        borderColor: '#212121'
      }
    }
  });
  return PictorialBarSeriesModel;
}(BaseBarSeriesModel);

SeriesModel.registerClass(PictorialBarSeriesModel);
export default PictorialBarSeriesModel;