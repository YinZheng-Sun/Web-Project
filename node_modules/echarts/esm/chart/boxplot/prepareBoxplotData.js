
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

import { quantile, asc } from '../../util/number';
import { isFunction, isString } from 'zrender/esm/core/util';
export default function prepareBoxplotData(rawData, opt) {
  opt = opt || {};
  var boxData = [];
  var outliers = [];
  var boundIQR = opt.boundIQR;
  var useExtreme = boundIQR === 'none' || boundIQR === 0;

  for (var i = 0; i < rawData.length; i++) {
    var ascList = asc(rawData[i].slice());
    var Q1 = quantile(ascList, 0.25);
    var Q2 = quantile(ascList, 0.5);
    var Q3 = quantile(ascList, 0.75);
    var min = ascList[0];
    var max = ascList[ascList.length - 1];
    var bound = (boundIQR == null ? 1.5 : boundIQR) * (Q3 - Q1);
    var low = useExtreme ? min : Math.max(min, Q1 - bound);
    var high = useExtreme ? max : Math.min(max, Q3 + bound);
    var itemNameFormatter = opt.itemNameFormatter;
    var itemName = isFunction(itemNameFormatter) ? itemNameFormatter({
      value: i
    }) : isString(itemNameFormatter) ? itemNameFormatter.replace('{value}', i + '') : i + '';
    boxData.push([itemName, low, Q1, Q2, Q3, high]);

    for (var j = 0; j < ascList.length; j++) {
      var dataItem = ascList[j];

      if (dataItem < low || dataItem > high) {
        var outlier = [itemName, dataItem];
        outliers.push(outlier);
      }
    }
  }

  return {
    boxData: boxData,
    outliers: outliers
  };
}