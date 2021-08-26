
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
import * as echarts from '../echarts';
import * as zrUtil from 'zrender/esm/core/util';
import * as graphic from '../util/graphic';
import './axis';
import '../coord/cartesian/defaultAxisExtentFromData';
import ComponentView from '../view/Component';
import GridModel from '../coord/cartesian/GridModel';
import ComponentModel from '../model/Component';

var GridView = function (_super) {
  __extends(GridView, _super);

  function GridView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = 'grid';
    return _this;
  }

  GridView.prototype.render = function (gridModel, ecModel) {
    this.group.removeAll();

    if (gridModel.get('show')) {
      this.group.add(new graphic.Rect({
        shape: gridModel.coordinateSystem.getRect(),
        style: zrUtil.defaults({
          fill: gridModel.get('backgroundColor')
        }, gridModel.getItemStyle()),
        silent: true,
        z2: -1
      }));
    }
  };

  GridView.type = 'grid';
  return GridView;
}(ComponentView);

ComponentView.registerClass(GridView);
ComponentModel.registerClass(GridModel);
echarts.registerPreprocessor(function (option) {
  if (option.xAxis && option.yAxis && !option.grid) {
    option.grid = {};
  }
});