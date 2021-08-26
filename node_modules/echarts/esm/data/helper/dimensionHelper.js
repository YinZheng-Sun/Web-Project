
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

import { each, createHashMap, assert } from 'zrender/esm/core/util';
import { VISUAL_DIMENSIONS } from '../../util/types';
export function summarizeDimensions(data) {
  var summary = {};
  var encode = summary.encode = {};
  var notExtraCoordDimMap = createHashMap();
  var defaultedLabel = [];
  var defaultedTooltip = [];
  var userOutput = summary.userOutput = {
    dimensionNames: data.dimensions.slice(),
    encode: {}
  };
  each(data.dimensions, function (dimName) {
    var dimItem = data.getDimensionInfo(dimName);
    var coordDim = dimItem.coordDim;

    if (coordDim) {
      if (process.env.NODE_ENV !== 'production') {
        assert(VISUAL_DIMENSIONS.get(coordDim) == null);
      }

      var coordDimIndex = dimItem.coordDimIndex;
      getOrCreateEncodeArr(encode, coordDim)[coordDimIndex] = dimName;

      if (!dimItem.isExtraCoord) {
        notExtraCoordDimMap.set(coordDim, 1);

        if (mayLabelDimType(dimItem.type)) {
          defaultedLabel[0] = dimName;
        }

        getOrCreateEncodeArr(userOutput.encode, coordDim)[coordDimIndex] = dimItem.index;
      }

      if (dimItem.defaultTooltip) {
        defaultedTooltip.push(dimName);
      }
    }

    VISUAL_DIMENSIONS.each(function (v, otherDim) {
      var encodeArr = getOrCreateEncodeArr(encode, otherDim);
      var dimIndex = dimItem.otherDims[otherDim];

      if (dimIndex != null && dimIndex !== false) {
        encodeArr[dimIndex] = dimItem.name;
      }
    });
  });
  var dataDimsOnCoord = [];
  var encodeFirstDimNotExtra = {};
  notExtraCoordDimMap.each(function (v, coordDim) {
    var dimArr = encode[coordDim];
    encodeFirstDimNotExtra[coordDim] = dimArr[0];
    dataDimsOnCoord = dataDimsOnCoord.concat(dimArr);
  });
  summary.dataDimsOnCoord = dataDimsOnCoord;
  summary.encodeFirstDimNotExtra = encodeFirstDimNotExtra;
  var encodeLabel = encode.label;

  if (encodeLabel && encodeLabel.length) {
    defaultedLabel = encodeLabel.slice();
  }

  var encodeTooltip = encode.tooltip;

  if (encodeTooltip && encodeTooltip.length) {
    defaultedTooltip = encodeTooltip.slice();
  } else if (!defaultedTooltip.length) {
    defaultedTooltip = defaultedLabel.slice();
  }

  encode.defaultedLabel = defaultedLabel;
  encode.defaultedTooltip = defaultedTooltip;
  return summary;
}

function getOrCreateEncodeArr(encode, dim) {
  if (!encode.hasOwnProperty(dim)) {
    encode[dim] = [];
  }

  return encode[dim];
}

export function getDimensionTypeByAxis(axisType) {
  return axisType === 'category' ? 'ordinal' : axisType === 'time' ? 'time' : 'float';
}

function mayLabelDimType(dimType) {
  return !(dimType === 'ordinal' || dimType === 'time');
}