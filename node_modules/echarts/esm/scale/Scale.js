
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

import * as clazzUtil from '../util/clazz';

var Scale = function () {
  function Scale(setting) {
    this._setting = setting || {};
    this._extent = [Infinity, -Infinity];
  }

  Scale.prototype.getSetting = function (name) {
    return this._setting[name];
  };

  Scale.prototype.unionExtent = function (other) {
    var extent = this._extent;
    other[0] < extent[0] && (extent[0] = other[0]);
    other[1] > extent[1] && (extent[1] = other[1]);
  };

  Scale.prototype.unionExtentFromData = function (data, dim) {
    this.unionExtent(data.getApproximateExtent(dim));
  };

  Scale.prototype.getExtent = function () {
    return this._extent.slice();
  };

  Scale.prototype.setExtent = function (start, end) {
    var thisExtent = this._extent;

    if (!isNaN(start)) {
      thisExtent[0] = start;
    }

    if (!isNaN(end)) {
      thisExtent[1] = end;
    }
  };

  Scale.prototype.isInExtentRange = function (value) {
    return this._extent[0] <= value && this._extent[1] >= value;
  };

  Scale.prototype.isBlank = function () {
    return this._isBlank;
  };

  Scale.prototype.setBlank = function (isBlank) {
    this._isBlank = isBlank;
  };

  return Scale;
}();

clazzUtil.enableClassManagement(Scale, {
  registerWhenExtend: true
});
export default Scale;