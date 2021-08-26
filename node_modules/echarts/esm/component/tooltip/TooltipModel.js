
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
import ComponentModel from '../../model/Component';

var TooltipModel = function (_super) {
  __extends(TooltipModel, _super);

  function TooltipModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = TooltipModel.type;
    return _this;
  }

  TooltipModel.type = 'tooltip';
  TooltipModel.dependencies = ['axisPointer'];
  TooltipModel.defaultOption = {
    zlevel: 0,
    z: 60,
    show: true,
    showContent: true,
    trigger: 'item',
    triggerOn: 'mousemove|click',
    alwaysShowContent: false,
    displayMode: 'single',
    renderMode: 'auto',
    confine: null,
    showDelay: 0,
    hideDelay: 100,
    transitionDuration: 0.4,
    enterable: false,
    backgroundColor: '#fff',
    shadowBlur: 10,
    shadowColor: 'rgba(0, 0, 0, .2)',
    shadowOffsetX: 1,
    shadowOffsetY: 2,
    borderColor: '#333',
    borderRadius: 4,
    borderWidth: 1,
    padding: null,
    extraCssText: '',
    axisPointer: {
      type: 'line',
      axis: 'auto',
      animation: 'auto',
      animationDurationUpdate: 200,
      animationEasingUpdate: 'exponentialOut',
      crossStyle: {
        color: '#999',
        width: 1,
        type: 'dashed',
        textStyle: {}
      }
    },
    textStyle: {
      color: '#666',
      fontSize: 14
    }
  };
  return TooltipModel;
}(ComponentModel);

ComponentModel.registerClass(TooltipModel);
export default TooltipModel;