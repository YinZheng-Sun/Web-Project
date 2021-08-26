
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
import axisDefault from './axisDefault';
import ComponentModel from '../model/Component';
import { getLayoutParams, mergeLayoutParam, fetchLayoutMode } from '../util/layout';
import OrdinalMeta from '../data/OrdinalMeta';
import { AXIS_TYPES } from './axisCommonTypes';
export default function axisModelCreator(axisName, BaseAxisModelClass, extraDefaultOption) {
  zrUtil.each(AXIS_TYPES, function (v, axisType) {
    var defaultOption = zrUtil.merge(zrUtil.merge({}, axisDefault[axisType], true), extraDefaultOption, true);

    var AxisModel = function (_super) {
      __extends(AxisModel, _super);

      function AxisModel() {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        var _this = _super.apply(this, args) || this;

        _this.type = axisName + 'Axis.' + axisType;
        return _this;
      }

      AxisModel.prototype.mergeDefaultAndTheme = function (option, ecModel) {
        var layoutMode = fetchLayoutMode(this);
        var inputPositionParams = layoutMode ? getLayoutParams(option) : {};
        var themeModel = ecModel.getTheme();
        zrUtil.merge(option, themeModel.get(axisType + 'Axis'));
        zrUtil.merge(option, this.getDefaultOption());
        option.type = getAxisType(option);

        if (layoutMode) {
          mergeLayoutParam(option, inputPositionParams, layoutMode);
        }
      };

      AxisModel.prototype.optionUpdated = function () {
        var thisOption = this.option;

        if (thisOption.type === 'category') {
          this.__ordinalMeta = OrdinalMeta.createByAxisModel(this);
        }
      };

      AxisModel.prototype.getCategories = function (rawData) {
        var option = this.option;

        if (option.type === 'category') {
          if (rawData) {
            return option.data;
          }

          return this.__ordinalMeta.categories;
        }
      };

      AxisModel.prototype.getOrdinalMeta = function () {
        return this.__ordinalMeta;
      };

      AxisModel.type = axisName + 'Axis.' + axisType;
      AxisModel.defaultOption = defaultOption;
      return AxisModel;
    }(BaseAxisModelClass);

    ComponentModel.registerClass(AxisModel);
  });
  ComponentModel.registerSubTypeDefaulter(axisName + 'Axis', getAxisType);
}

function getAxisType(option) {
  return option.type || (option.data ? 'category' : 'value');
}