
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

import * as echarts from '../echarts';
import * as zrUtil from 'zrender/esm/core/util';
import * as axisPointerModelHelper from './axisPointer/modelHelper';
import axisTrigger from './axisPointer/axisTrigger';
import './axisPointer/AxisPointerView';
import './axisPointer/CartesianAxisPointer';
import AxisPointerModel from './axisPointer/AxisPointerModel';
import ComponentModel from '../model/Component';
ComponentModel.registerClass(AxisPointerModel);
echarts.registerPreprocessor(function (option) {
  if (option) {
    (!option.axisPointer || option.axisPointer.length === 0) && (option.axisPointer = {});
    var link = option.axisPointer.link;

    if (link && !zrUtil.isArray(link)) {
      option.axisPointer.link = [link];
    }
  }
});
echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.STATISTIC, function (ecModel, api) {
  ecModel.getComponent('axisPointer').coordSysAxesInfo = axisPointerModelHelper.collect(ecModel, api);
});
echarts.registerAction({
  type: 'updateAxisPointer',
  event: 'updateAxisPointer',
  update: ':updateAxisPointer'
}, axisTrigger);