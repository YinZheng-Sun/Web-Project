
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

import { each, isString } from 'zrender/esm/core/util';
export function enableDataStack(seriesModel, dimensionInfoList, opt) {
  opt = opt || {};
  var byIndex = opt.byIndex;
  var stackedCoordDimension = opt.stackedCoordDimension;
  var mayStack = !!(seriesModel && seriesModel.get('stack'));
  var stackedByDimInfo;
  var stackedDimInfo;
  var stackResultDimension;
  var stackedOverDimension;
  each(dimensionInfoList, function (dimensionInfo, index) {
    if (isString(dimensionInfo)) {
      dimensionInfoList[index] = dimensionInfo = {
        name: dimensionInfo
      };
    }

    if (mayStack && !dimensionInfo.isExtraCoord) {
      if (!byIndex && !stackedByDimInfo && dimensionInfo.ordinalMeta) {
        stackedByDimInfo = dimensionInfo;
      }

      if (!stackedDimInfo && dimensionInfo.type !== 'ordinal' && dimensionInfo.type !== 'time' && (!stackedCoordDimension || stackedCoordDimension === dimensionInfo.coordDim)) {
        stackedDimInfo = dimensionInfo;
      }
    }
  });

  if (stackedDimInfo && !byIndex && !stackedByDimInfo) {
    byIndex = true;
  }

  if (stackedDimInfo) {
    stackResultDimension = '__\0ecstackresult';
    stackedOverDimension = '__\0ecstackedover';

    if (stackedByDimInfo) {
      stackedByDimInfo.createInvertedIndices = true;
    }

    var stackedDimCoordDim_1 = stackedDimInfo.coordDim;
    var stackedDimType = stackedDimInfo.type;
    var stackedDimCoordIndex_1 = 0;
    each(dimensionInfoList, function (dimensionInfo) {
      if (dimensionInfo.coordDim === stackedDimCoordDim_1) {
        stackedDimCoordIndex_1++;
      }
    });
    dimensionInfoList.push({
      name: stackResultDimension,
      coordDim: stackedDimCoordDim_1,
      coordDimIndex: stackedDimCoordIndex_1,
      type: stackedDimType,
      isExtraCoord: true,
      isCalculationCoord: true
    });
    stackedDimCoordIndex_1++;
    dimensionInfoList.push({
      name: stackedOverDimension,
      coordDim: stackedOverDimension,
      coordDimIndex: stackedDimCoordIndex_1,
      type: stackedDimType,
      isExtraCoord: true,
      isCalculationCoord: true
    });
  }

  return {
    stackedDimension: stackedDimInfo && stackedDimInfo.name,
    stackedByDimension: stackedByDimInfo && stackedByDimInfo.name,
    isStackedByIndex: byIndex,
    stackedOverDimension: stackedOverDimension,
    stackResultDimension: stackResultDimension
  };
}
export function isDimensionStacked(data, stackedDim) {
  return !!stackedDim && stackedDim === data.getCalculationInfo('stackedDimension');
}
export function getStackedDimension(data, targetDim) {
  return isDimensionStacked(data, targetDim) ? data.getCalculationInfo('stackResultDimension') : targetDim;
}