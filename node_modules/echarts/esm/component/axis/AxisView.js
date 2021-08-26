
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
import * as axisPointerModelHelper from '../axisPointer/modelHelper';
import ComponentView from '../../view/Component';
var axisPointerClazz = {};

var AxisView = function (_super) {
  __extends(AxisView, _super);

  function AxisView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = AxisView.type;
    return _this;
  }

  AxisView.prototype.render = function (axisModel, ecModel, api, payload) {
    this.axisPointerClass && axisPointerModelHelper.fixValue(axisModel);

    _super.prototype.render.apply(this, arguments);

    this._doUpdateAxisPointerClass(axisModel, api, true);
  };

  AxisView.prototype.updateAxisPointer = function (axisModel, ecModel, api, payload) {
    this._doUpdateAxisPointerClass(axisModel, api, false);
  };

  AxisView.prototype.remove = function (ecModel, api) {
    var axisPointer = this._axisPointer;
    axisPointer && axisPointer.remove(api);
  };

  AxisView.prototype.dispose = function (ecModel, api) {
    this._disposeAxisPointer(api);

    _super.prototype.dispose.apply(this, arguments);
  };

  AxisView.prototype._doUpdateAxisPointerClass = function (axisModel, api, forceRender) {
    var Clazz = AxisView.getAxisPointerClass(this.axisPointerClass);

    if (!Clazz) {
      return;
    }

    var axisPointerModel = axisPointerModelHelper.getAxisPointerModel(axisModel);
    axisPointerModel ? (this._axisPointer || (this._axisPointer = new Clazz())).render(axisModel, axisPointerModel, api, forceRender) : this._disposeAxisPointer(api);
  };

  AxisView.prototype._disposeAxisPointer = function (api) {
    this._axisPointer && this._axisPointer.dispose(api);
    this._axisPointer = null;
  };

  AxisView.registerAxisPointerClass = function (type, clazz) {
    if (process.env.NODE_ENV !== 'production') {
      if (axisPointerClazz[type]) {
        throw new Error('axisPointer ' + type + ' exists');
      }
    }

    axisPointerClazz[type] = clazz;
  };

  ;

  AxisView.getAxisPointerClass = function (type) {
    return type && axisPointerClazz[type];
  };

  ;
  AxisView.type = 'axis';
  return AxisView;
}(ComponentView);

export default AxisView;