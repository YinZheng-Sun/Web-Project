
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
import createListFromArray from './chart/helper/createListFromArray';
import * as axisHelper from './coord/axisHelper';
import { AxisModelCommonMixin } from './coord/axisModelCommonMixin';
import Model from './model/Model';
import { getLayoutRect } from './util/layout';
import { enableDataStack, isDimensionStacked, getStackedDimension } from './data/helper/dataStackHelper';
import { getECData } from './util/innerStore';
export function createList(seriesModel) {
  return createListFromArray(seriesModel.getSource(), seriesModel);
}
export { getLayoutRect };
export { default as createDimensions } from './data/helper/createDimensions';
export var dataStack = {
  isDimensionStacked: isDimensionStacked,
  enableDataStack: enableDataStack,
  getStackedDimension: getStackedDimension
};
export { createSymbol } from './util/symbol';
export function createScale(dataExtent, option) {
  var axisModel = option;

  if (!(option instanceof Model)) {
    axisModel = new Model(option);
  }

  var scale = axisHelper.createScaleByModel(axisModel);
  scale.setExtent(dataExtent[0], dataExtent[1]);
  axisHelper.niceScaleExtent(scale, axisModel);
  return scale;
}
export function mixinAxisModelCommonMethods(Model) {
  zrUtil.mixin(Model, AxisModelCommonMixin);
}
export { getECData };