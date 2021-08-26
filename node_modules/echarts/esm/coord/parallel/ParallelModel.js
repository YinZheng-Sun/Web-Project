
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
import ComponentModel from '../../model/Component';

var ParallelModel = function (_super) {
  __extends(ParallelModel, _super);

  function ParallelModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = ParallelModel.type;
    return _this;
  }

  ParallelModel.prototype.init = function () {
    _super.prototype.init.apply(this, arguments);

    this.mergeOption({});
  };

  ParallelModel.prototype.mergeOption = function (newOption) {
    var thisOption = this.option;
    newOption && zrUtil.merge(thisOption, newOption, true);

    this._initDimensions();
  };

  ParallelModel.prototype.contains = function (model, ecModel) {
    var parallelIndex = model.get('parallelIndex');
    return parallelIndex != null && ecModel.getComponent('parallel', parallelIndex) === this;
  };

  ParallelModel.prototype.setAxisExpand = function (opt) {
    zrUtil.each(['axisExpandable', 'axisExpandCenter', 'axisExpandCount', 'axisExpandWidth', 'axisExpandWindow'], function (name) {
      if (opt.hasOwnProperty(name)) {
        this.option[name] = opt[name];
      }
    }, this);
  };

  ParallelModel.prototype._initDimensions = function () {
    var dimensions = this.dimensions = [];
    var parallelAxisIndex = this.parallelAxisIndex = [];
    var axisModels = zrUtil.filter(this.ecModel.queryComponents({
      mainType: 'parallelAxis'
    }), function (axisModel) {
      return (axisModel.get('parallelIndex') || 0) === this.componentIndex;
    }, this);
    zrUtil.each(axisModels, function (axisModel) {
      dimensions.push('dim' + axisModel.get('dim'));
      parallelAxisIndex.push(axisModel.componentIndex);
    });
  };

  ParallelModel.type = 'parallel';
  ParallelModel.dependencies = ['parallelAxis'];
  ParallelModel.layoutMode = 'box';
  ParallelModel.defaultOption = {
    zlevel: 0,
    z: 0,
    left: 80,
    top: 60,
    right: 80,
    bottom: 60,
    layout: 'horizontal',
    axisExpandable: false,
    axisExpandCenter: null,
    axisExpandCount: 0,
    axisExpandWidth: 50,
    axisExpandRate: 17,
    axisExpandDebounce: 50,
    axisExpandSlideTriggerArea: [-0.15, 0.05, 0.4],
    axisExpandTriggerOn: 'click',
    parallelAxisDefault: null
  };
  return ParallelModel;
}(ComponentModel);

ComponentModel.registerClass(ParallelModel);
export default ParallelModel;