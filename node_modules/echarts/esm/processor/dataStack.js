
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

import { createHashMap, each } from 'zrender/esm/core/util';
export default function dataStack(ecModel) {
  var stackInfoMap = createHashMap();
  ecModel.eachSeries(function (seriesModel) {
    var stack = seriesModel.get('stack');

    if (stack) {
      var stackInfoList = stackInfoMap.get(stack) || stackInfoMap.set(stack, []);
      var data = seriesModel.getData();
      var stackInfo = {
        stackResultDimension: data.getCalculationInfo('stackResultDimension'),
        stackedOverDimension: data.getCalculationInfo('stackedOverDimension'),
        stackedDimension: data.getCalculationInfo('stackedDimension'),
        stackedByDimension: data.getCalculationInfo('stackedByDimension'),
        isStackedByIndex: data.getCalculationInfo('isStackedByIndex'),
        data: data,
        seriesModel: seriesModel
      };

      if (!stackInfo.stackedDimension || !(stackInfo.isStackedByIndex || stackInfo.stackedByDimension)) {
        return;
      }

      stackInfoList.length && data.setCalculationInfo('stackedOnSeries', stackInfoList[stackInfoList.length - 1].seriesModel);
      stackInfoList.push(stackInfo);
    }
  });
  stackInfoMap.each(calculateStack);
}

function calculateStack(stackInfoList) {
  each(stackInfoList, function (targetStackInfo, idxInStack) {
    var resultVal = [];
    var resultNaN = [NaN, NaN];
    var dims = [targetStackInfo.stackResultDimension, targetStackInfo.stackedOverDimension];
    var targetData = targetStackInfo.data;
    var isStackedByIndex = targetStackInfo.isStackedByIndex;
    var newData = targetData.map(dims, function (v0, v1, dataIndex) {
      var sum = targetData.get(targetStackInfo.stackedDimension, dataIndex);

      if (isNaN(sum)) {
        return resultNaN;
      }

      var byValue;
      var stackedDataRawIndex;

      if (isStackedByIndex) {
        stackedDataRawIndex = targetData.getRawIndex(dataIndex);
      } else {
        byValue = targetData.get(targetStackInfo.stackedByDimension, dataIndex);
      }

      var stackedOver = NaN;

      for (var j = idxInStack - 1; j >= 0; j--) {
        var stackInfo = stackInfoList[j];

        if (!isStackedByIndex) {
          stackedDataRawIndex = stackInfo.data.rawIndexOf(stackInfo.stackedByDimension, byValue);
        }

        if (stackedDataRawIndex >= 0) {
          var val = stackInfo.data.getByRawIndex(stackInfo.stackResultDimension, stackedDataRawIndex);

          if (sum >= 0 && val > 0 || sum <= 0 && val < 0) {
            sum += val;
            stackedOver = val;
            break;
          }
        }
      }

      resultVal[0] = sum;
      resultVal[1] = stackedOver;
      return resultVal;
    });
    targetData.hostModel.setData(newData);
    targetStackInfo.data = newData;
  });
}