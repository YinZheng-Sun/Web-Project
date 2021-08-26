
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

import { isFunction } from 'zrender/esm/core/util';
var seriesSymbolTask = {
  createOnAllSeries: true,
  performRawSeries: true,
  reset: function (seriesModel, ecModel) {
    var data = seriesModel.getData();

    if (seriesModel.legendSymbol) {
      data.setVisual('legendSymbol', seriesModel.legendSymbol);
    }

    if (!seriesModel.hasSymbolVisual) {
      return;
    }

    var symbolType = seriesModel.get('symbol');
    var symbolSize = seriesModel.get('symbolSize');
    var keepAspect = seriesModel.get('symbolKeepAspect');
    var symbolRotate = seriesModel.get('symbolRotate');
    var hasSymbolTypeCallback = isFunction(symbolType);
    var hasSymbolSizeCallback = isFunction(symbolSize);
    var hasSymbolRotateCallback = isFunction(symbolRotate);
    var hasCallback = hasSymbolTypeCallback || hasSymbolSizeCallback || hasSymbolRotateCallback;
    var seriesSymbol = !hasSymbolTypeCallback && symbolType ? symbolType : seriesModel.defaultSymbol;
    var seriesSymbolSize = !hasSymbolSizeCallback ? symbolSize : null;
    var seriesSymbolRotate = !hasSymbolRotateCallback ? symbolRotate : null;
    data.setVisual({
      legendSymbol: seriesModel.legendSymbol || seriesSymbol,
      symbol: seriesSymbol,
      symbolSize: seriesSymbolSize,
      symbolKeepAspect: keepAspect,
      symbolRotate: seriesSymbolRotate
    });

    if (ecModel.isSeriesFiltered(seriesModel)) {
      return;
    }

    function dataEach(data, idx) {
      var rawValue = seriesModel.getRawValue(idx);
      var params = seriesModel.getDataParams(idx);
      hasSymbolTypeCallback && data.setItemVisual(idx, 'symbol', symbolType(rawValue, params));
      hasSymbolSizeCallback && data.setItemVisual(idx, 'symbolSize', symbolSize(rawValue, params));
      hasSymbolRotateCallback && data.setItemVisual(idx, 'symbolRotate', symbolRotate(rawValue, params));
    }

    return {
      dataEach: hasCallback ? dataEach : null
    };
  }
};
var dataSymbolTask = {
  createOnAllSeries: true,
  performRawSeries: true,
  reset: function (seriesModel, ecModel) {
    if (!seriesModel.hasSymbolVisual) {
      return;
    }

    if (ecModel.isSeriesFiltered(seriesModel)) {
      return;
    }

    var data = seriesModel.getData();

    function dataEach(data, idx) {
      var itemModel = data.getItemModel(idx);
      var itemSymbolType = itemModel.getShallow('symbol', true);
      var itemSymbolSize = itemModel.getShallow('symbolSize', true);
      var itemSymbolRotate = itemModel.getShallow('symbolRotate', true);
      var itemSymbolKeepAspect = itemModel.getShallow('symbolKeepAspect', true);

      if (itemSymbolType != null) {
        data.setItemVisual(idx, 'symbol', itemSymbolType);
      }

      if (itemSymbolSize != null) {
        data.setItemVisual(idx, 'symbolSize', itemSymbolSize);
      }

      if (itemSymbolRotate != null) {
        data.setItemVisual(idx, 'symbolRotate', itemSymbolRotate);
      }

      if (itemSymbolKeepAspect != null) {
        data.setItemVisual(idx, 'symbolKeepAspect', itemSymbolKeepAspect);
      }
    }

    return {
      dataEach: data.hasItemOption ? dataEach : null
    };
  }
};
export { seriesSymbolTask, dataSymbolTask };