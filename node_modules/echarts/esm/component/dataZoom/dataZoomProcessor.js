
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

import * as echarts from '../../echarts';
import { createHashMap, each } from 'zrender/esm/core/util';
import { getAxisMainType } from './helper';
import AxisProxy from './AxisProxy';
echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.FILTER, {
  getTargetSeries: function (ecModel) {
    function eachAxisModel(cb) {
      ecModel.eachComponent('dataZoom', function (dataZoomModel) {
        dataZoomModel.eachTargetAxis(function (axisDim, axisIndex) {
          var axisModel = ecModel.getComponent(getAxisMainType(axisDim), axisIndex);
          cb(axisDim, axisIndex, axisModel, dataZoomModel);
        });
      });
    }

    eachAxisModel(function (axisDim, axisIndex, axisModel, dataZoomModel) {
      axisModel.__dzAxisProxy = null;
    });
    var proxyList = [];
    eachAxisModel(function (axisDim, axisIndex, axisModel, dataZoomModel) {
      if (!axisModel.__dzAxisProxy) {
        axisModel.__dzAxisProxy = new AxisProxy(axisDim, axisIndex, dataZoomModel, ecModel);
        proxyList.push(axisModel.__dzAxisProxy);
      }
    });
    var seriesModelMap = createHashMap();
    each(proxyList, function (axisProxy) {
      each(axisProxy.getTargetSeriesModels(), function (seriesModel) {
        seriesModelMap.set(seriesModel.uid, seriesModel);
      });
    });
    return seriesModelMap;
  },
  overallReset: function (ecModel, api) {
    ecModel.eachComponent('dataZoom', function (dataZoomModel) {
      dataZoomModel.eachTargetAxis(function (axisDim, axisIndex) {
        dataZoomModel.getAxisProxy(axisDim, axisIndex).reset(dataZoomModel);
      });
      dataZoomModel.eachTargetAxis(function (axisDim, axisIndex) {
        dataZoomModel.getAxisProxy(axisDim, axisIndex).filterData(dataZoomModel, api);
      });
    });
    ecModel.eachComponent('dataZoom', function (dataZoomModel) {
      var axisProxy = dataZoomModel.findRepresentativeAxisProxy();

      if (axisProxy) {
        var percentRange = axisProxy.getDataPercentWindow();
        var valueRange = axisProxy.getDataValueWindow();
        dataZoomModel.setCalculatedRange({
          start: percentRange[0],
          end: percentRange[1],
          startValue: valueRange[0],
          endValue: valueRange[1]
        });
      }
    });
  }
});