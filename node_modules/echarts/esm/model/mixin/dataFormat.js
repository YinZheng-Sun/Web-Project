
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

import * as zrUtil from 'zrender/esm/core/util';
import { retrieveRawValue } from '../../data/helper/dataProvider';
import { formatTpl } from '../../util/format';
import { makePrintable } from '../../util/log';
var DIMENSION_LABEL_REG = /\{@(.+?)\}/g;

var DataFormatMixin = function () {
  function DataFormatMixin() {}

  DataFormatMixin.prototype.getDataParams = function (dataIndex, dataType) {
    var data = this.getData(dataType);
    var rawValue = this.getRawValue(dataIndex, dataType);
    var rawDataIndex = data.getRawIndex(dataIndex);
    var name = data.getName(dataIndex);
    var itemOpt = data.getRawDataItem(dataIndex);
    var style = data.getItemVisual(dataIndex, 'style');
    var color = style && style[data.getItemVisual(dataIndex, 'drawType') || 'fill'];
    var borderColor = style && style.stroke;
    var mainType = this.mainType;
    var isSeries = mainType === 'series';
    var userOutput = data.userOutput;
    return {
      componentType: mainType,
      componentSubType: this.subType,
      componentIndex: this.componentIndex,
      seriesType: isSeries ? this.subType : null,
      seriesIndex: this.seriesIndex,
      seriesId: isSeries ? this.id : null,
      seriesName: isSeries ? this.name : null,
      name: name,
      dataIndex: rawDataIndex,
      data: itemOpt,
      dataType: dataType,
      value: rawValue,
      color: color,
      borderColor: borderColor,
      dimensionNames: userOutput ? userOutput.dimensionNames : null,
      encode: userOutput ? userOutput.encode : null,
      $vars: ['seriesName', 'name', 'value']
    };
  };

  DataFormatMixin.prototype.getFormattedLabel = function (dataIndex, status, dataType, labelDimIndex, formatter, extendParams) {
    status = status || 'normal';
    var data = this.getData(dataType);
    var params = this.getDataParams(dataIndex, dataType);

    if (extendParams) {
      zrUtil.extend(params, extendParams);
    }

    if (labelDimIndex != null && params.value instanceof Array) {
      params.value = params.value[labelDimIndex];
    }

    if (!formatter) {
      var itemModel = data.getItemModel(dataIndex);
      formatter = itemModel.get(status === 'normal' ? ['label', 'formatter'] : [status, 'label', 'formatter']);
    }

    if (typeof formatter === 'function') {
      params.status = status;
      params.dimensionIndex = labelDimIndex;
      return formatter(params);
    } else if (typeof formatter === 'string') {
      var str = formatTpl(formatter, params);
      return str.replace(DIMENSION_LABEL_REG, function (origin, dim) {
        var len = dim.length;

        if (dim.charAt(0) === '[' && dim.charAt(len - 1) === ']') {
          dim = +dim.slice(1, len - 1);
        }

        return retrieveRawValue(data, dataIndex, dim);
      });
    }
  };

  DataFormatMixin.prototype.getRawValue = function (idx, dataType) {
    return retrieveRawValue(this.getData(dataType), idx);
  };

  DataFormatMixin.prototype.formatTooltip = function (dataIndex, multipleSeries, dataType) {
    return;
  };

  return DataFormatMixin;
}();

export { DataFormatMixin };
;
export function normalizeTooltipFormatResult(result) {
  var markupText;
  var markupFragment;

  if (zrUtil.isObject(result)) {
    if (result.type) {
      markupFragment = result;
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('The return type of `formatTooltip` is not supported: ' + makePrintable(result));
      }
    }
  } else {
    markupText = result;
  }

  return {
    markupText: markupText,
    markupFragment: markupFragment
  };
}