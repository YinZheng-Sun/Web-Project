
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
import * as visualSolution from '../../visual/visualSolution';
import Model from '../../model/Model';
import ComponentModel from '../../model/Component';
var DEFAULT_OUT_OF_BRUSH_COLOR = '#ddd';

var BrushModel = function (_super) {
  __extends(BrushModel, _super);

  function BrushModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = BrushModel.type;
    _this.areas = [];
    _this.brushOption = {};
    return _this;
  }

  BrushModel.prototype.optionUpdated = function (newOption, isInit) {
    var thisOption = this.option;
    !isInit && visualSolution.replaceVisualOption(thisOption, newOption, ['inBrush', 'outOfBrush']);
    var inBrush = thisOption.inBrush = thisOption.inBrush || {};
    thisOption.outOfBrush = thisOption.outOfBrush || {
      color: DEFAULT_OUT_OF_BRUSH_COLOR
    };

    if (!inBrush.hasOwnProperty('liftZ')) {
      inBrush.liftZ = 5;
    }
  };

  BrushModel.prototype.setAreas = function (areas) {
    if (process.env.NODE_ENV !== 'production') {
      zrUtil.assert(zrUtil.isArray(areas));
      zrUtil.each(areas, function (area) {
        zrUtil.assert(area.brushType, 'Illegal areas');
      });
    }

    if (!areas) {
      return;
    }

    this.areas = zrUtil.map(areas, function (area) {
      return generateBrushOption(this.option, area);
    }, this);
  };

  BrushModel.prototype.setBrushOption = function (brushOption) {
    this.brushOption = generateBrushOption(this.option, brushOption);
    this.brushType = this.brushOption.brushType;
  };

  BrushModel.type = 'brush';
  BrushModel.dependencies = ['geo', 'grid', 'xAxis', 'yAxis', 'parallel', 'series'];
  BrushModel.defaultOption = {
    seriesIndex: 'all',
    brushType: 'rect',
    brushMode: 'single',
    transformable: true,
    brushStyle: {
      borderWidth: 1,
      color: 'rgba(210,219,238,0.3)',
      borderColor: '#D2DBEE'
    },
    throttleType: 'fixRate',
    throttleDelay: 0,
    removeOnClick: true,
    z: 10000
  };
  return BrushModel;
}(ComponentModel);

ComponentModel.registerClass(BrushModel);

function generateBrushOption(option, brushOption) {
  return zrUtil.merge({
    brushType: option.brushType,
    brushMode: option.brushMode,
    transformable: option.transformable,
    brushStyle: new Model(option.brushStyle).getItemStyle(),
    removeOnClick: option.removeOnClick,
    z: option.z
  }, brushOption, true);
}

export default BrushModel;