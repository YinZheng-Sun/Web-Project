
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

var LegendVisualProvider = function () {
  function LegendVisualProvider(getDataWithEncodedVisual, getRawData) {
    this._getDataWithEncodedVisual = getDataWithEncodedVisual;
    this._getRawData = getRawData;
  }

  LegendVisualProvider.prototype.getAllNames = function () {
    var rawData = this._getRawData();

    return rawData.mapArray(rawData.getName);
  };

  LegendVisualProvider.prototype.containName = function (name) {
    var rawData = this._getRawData();

    return rawData.indexOfName(name) >= 0;
  };

  LegendVisualProvider.prototype.indexOfName = function (name) {
    var dataWithEncodedVisual = this._getDataWithEncodedVisual();

    return dataWithEncodedVisual.indexOfName(name);
  };

  LegendVisualProvider.prototype.getItemVisual = function (dataIndex, key) {
    var dataWithEncodedVisual = this._getDataWithEncodedVisual();

    return dataWithEncodedVisual.getItemVisual(dataIndex, key);
  };

  return LegendVisualProvider;
}();

export default LegendVisualProvider;