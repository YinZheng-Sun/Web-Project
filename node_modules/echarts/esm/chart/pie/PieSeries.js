
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
import createListSimply from '../helper/createListSimply';
import * as zrUtil from 'zrender/esm/core/util';
import * as modelUtil from '../../util/model';
import { getPercentWithPrecision } from '../../util/number';
import { makeSeriesEncodeForNameBased } from '../../data/helper/sourceHelper';
import LegendVisualProvider from '../../visual/LegendVisualProvider';
import SeriesModel from '../../model/Series';

var PieSeriesModel = function (_super) {
  __extends(PieSeriesModel, _super);

  function PieSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.useColorPaletteOnData = true;
    return _this;
  }

  PieSeriesModel.prototype.init = function (option) {
    _super.prototype.init.apply(this, arguments);

    this.legendVisualProvider = new LegendVisualProvider(zrUtil.bind(this.getData, this), zrUtil.bind(this.getRawData, this));

    this._defaultLabelLine(option);
  };

  PieSeriesModel.prototype.mergeOption = function () {
    _super.prototype.mergeOption.apply(this, arguments);
  };

  PieSeriesModel.prototype.getInitialData = function () {
    return createListSimply(this, {
      coordDimensions: ['value'],
      encodeDefaulter: zrUtil.curry(makeSeriesEncodeForNameBased, this)
    });
  };

  PieSeriesModel.prototype.getDataParams = function (dataIndex) {
    var data = this.getData();

    var params = _super.prototype.getDataParams.call(this, dataIndex);

    var valueList = [];
    data.each(data.mapDimension('value'), function (value) {
      valueList.push(value);
    });
    params.percent = getPercentWithPrecision(valueList, dataIndex, data.hostModel.get('percentPrecision'));
    params.$vars.push('percent');
    return params;
  };

  PieSeriesModel.prototype._defaultLabelLine = function (option) {
    modelUtil.defaultEmphasis(option, 'labelLine', ['show']);
    var labelLineNormalOpt = option.labelLine;
    var labelLineEmphasisOpt = option.emphasis.labelLine;
    labelLineNormalOpt.show = labelLineNormalOpt.show && option.label.show;
    labelLineEmphasisOpt.show = labelLineEmphasisOpt.show && option.emphasis.label.show;
  };

  PieSeriesModel.type = 'series.pie';
  PieSeriesModel.defaultOption = {
    zlevel: 0,
    z: 2,
    legendHoverLink: true,
    center: ['50%', '50%'],
    radius: [0, '75%'],
    clockwise: true,
    startAngle: 90,
    minAngle: 0,
    minShowLabelAngle: 0,
    selectedOffset: 10,
    percentPrecision: 2,
    stillShowZeroSum: true,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: null,
    height: null,
    label: {
      rotate: 0,
      show: true,
      overflow: 'truncate',
      position: 'outer',
      alignTo: 'none',
      edgeDistance: '25%',
      bleedMargin: 10,
      distanceToLabelLine: 5
    },
    labelLine: {
      show: true,
      length: 15,
      length2: 15,
      smooth: false,
      minTurnAngle: 90,
      maxSurfaceAngle: 90,
      lineStyle: {
        width: 1,
        type: 'solid'
      }
    },
    itemStyle: {
      borderWidth: 1
    },
    labelLayout: {
      hideOverlap: true
    },
    emphasis: {
      scale: true,
      scaleSize: 5
    },
    avoidLabelOverlap: true,
    animationType: 'expansion',
    animationDuration: 1000,
    animationTypeUpdate: 'transition',
    animationEasingUpdate: 'cubicInOut',
    animationDurationUpdate: 500,
    animationEasing: 'cubicInOut'
  };
  return PieSeriesModel;
}(SeriesModel);

SeriesModel.registerClass(PieSeriesModel);
export default PieSeriesModel;