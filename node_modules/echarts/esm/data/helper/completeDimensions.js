
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

import { createHashMap, each, isString, defaults, extend, isObject, clone } from 'zrender/esm/core/util';
import { normalizeToArray } from '../../util/model';
import { guessOrdinal, BE_ORDINAL } from './sourceHelper';
import { createSourceFromSeriesDataOption, isSourceInstance } from '../Source';
import { VISUAL_DIMENSIONS } from '../../util/types';
import DataDimensionInfo from '../DataDimensionInfo';

function completeDimensions(sysDims, source, opt) {
  if (!isSourceInstance(source)) {
    source = createSourceFromSeriesDataOption(source);
  }

  opt = opt || {};
  sysDims = (sysDims || []).slice();
  var dimsDef = (opt.dimsDef || []).slice();
  var dataDimNameMap = createHashMap();
  var coordDimNameMap = createHashMap();
  var result = [];
  var dimCount = getDimCount(source, sysDims, dimsDef, opt.dimCount);

  for (var i = 0; i < dimCount; i++) {
    var dimDefItemRaw = dimsDef[i];
    var dimDefItem = dimsDef[i] = extend({}, isObject(dimDefItemRaw) ? dimDefItemRaw : {
      name: dimDefItemRaw
    });
    var userDimName = dimDefItem.name;
    var resultItem = result[i] = new DataDimensionInfo();

    if (userDimName != null && dataDimNameMap.get(userDimName) == null) {
      resultItem.name = resultItem.displayName = userDimName;
      dataDimNameMap.set(userDimName, i);
    }

    dimDefItem.type != null && (resultItem.type = dimDefItem.type);
    dimDefItem.displayName != null && (resultItem.displayName = dimDefItem.displayName);
  }

  var encodeDef = opt.encodeDef;

  if (!encodeDef && opt.encodeDefaulter) {
    encodeDef = opt.encodeDefaulter(source, dimCount);
  }

  var encodeDefMap = createHashMap(encodeDef);
  encodeDefMap.each(function (dataDimsRaw, coordDim) {
    var dataDims = normalizeToArray(dataDimsRaw).slice();

    if (dataDims.length === 1 && !isString(dataDims[0]) && dataDims[0] < 0) {
      encodeDefMap.set(coordDim, false);
      return;
    }

    var validDataDims = encodeDefMap.set(coordDim, []);
    each(dataDims, function (resultDimIdxOrName, idx) {
      var resultDimIdx = isString(resultDimIdxOrName) ? dataDimNameMap.get(resultDimIdxOrName) : resultDimIdxOrName;

      if (resultDimIdx != null && resultDimIdx < dimCount) {
        validDataDims[idx] = resultDimIdx;
        applyDim(result[resultDimIdx], coordDim, idx);
      }
    });
  });
  var availDimIdx = 0;
  each(sysDims, function (sysDimItemRaw) {
    var coordDim;
    var sysDimItemDimsDef;
    var sysDimItemOtherDims;
    var sysDimItem;

    if (isString(sysDimItemRaw)) {
      coordDim = sysDimItemRaw;
      sysDimItem = {};
    } else {
      sysDimItem = sysDimItemRaw;
      coordDim = sysDimItem.name;
      var ordinalMeta = sysDimItem.ordinalMeta;
      sysDimItem.ordinalMeta = null;
      sysDimItem = clone(sysDimItem);
      sysDimItem.ordinalMeta = ordinalMeta;
      sysDimItemDimsDef = sysDimItem.dimsDef;
      sysDimItemOtherDims = sysDimItem.otherDims;
      sysDimItem.name = sysDimItem.coordDim = sysDimItem.coordDimIndex = sysDimItem.dimsDef = sysDimItem.otherDims = null;
    }

    var dataDims = encodeDefMap.get(coordDim);

    if (dataDims === false) {
      return;
    }

    dataDims = normalizeToArray(dataDims);

    if (!dataDims.length) {
      for (var i = 0; i < (sysDimItemDimsDef && sysDimItemDimsDef.length || 1); i++) {
        while (availDimIdx < result.length && result[availDimIdx].coordDim != null) {
          availDimIdx++;
        }

        availDimIdx < result.length && dataDims.push(availDimIdx++);
      }
    }

    each(dataDims, function (resultDimIdx, coordDimIndex) {
      var resultItem = result[resultDimIdx];
      applyDim(defaults(resultItem, sysDimItem), coordDim, coordDimIndex);

      if (resultItem.name == null && sysDimItemDimsDef) {
        var sysDimItemDimsDefItem = sysDimItemDimsDef[coordDimIndex];
        !isObject(sysDimItemDimsDefItem) && (sysDimItemDimsDefItem = {
          name: sysDimItemDimsDefItem
        });
        resultItem.name = resultItem.displayName = sysDimItemDimsDefItem.name;
        resultItem.defaultTooltip = sysDimItemDimsDefItem.defaultTooltip;
      }

      sysDimItemOtherDims && defaults(resultItem.otherDims, sysDimItemOtherDims);
    });
  });

  function applyDim(resultItem, coordDim, coordDimIndex) {
    if (VISUAL_DIMENSIONS.get(coordDim) != null) {
      resultItem.otherDims[coordDim] = coordDimIndex;
    } else {
      resultItem.coordDim = coordDim;
      resultItem.coordDimIndex = coordDimIndex;
      coordDimNameMap.set(coordDim, true);
    }
  }

  var generateCoord = opt.generateCoord;
  var generateCoordCount = opt.generateCoordCount;
  var fromZero = generateCoordCount != null;
  generateCoordCount = generateCoord ? generateCoordCount || 1 : 0;
  var extra = generateCoord || 'value';

  for (var resultDimIdx = 0; resultDimIdx < dimCount; resultDimIdx++) {
    var resultItem = result[resultDimIdx] = result[resultDimIdx] || new DataDimensionInfo();
    var coordDim = resultItem.coordDim;

    if (coordDim == null) {
      resultItem.coordDim = genName(extra, coordDimNameMap, fromZero);
      resultItem.coordDimIndex = 0;

      if (!generateCoord || generateCoordCount <= 0) {
        resultItem.isExtraCoord = true;
      }

      generateCoordCount--;
    }

    resultItem.name == null && (resultItem.name = genName(resultItem.coordDim, dataDimNameMap, false));

    if (resultItem.type == null && (guessOrdinal(source, resultDimIdx) === BE_ORDINAL.Must || resultItem.isExtraCoord && (resultItem.otherDims.itemName != null || resultItem.otherDims.seriesName != null))) {
      resultItem.type = 'ordinal';
    }
  }

  return result;
}

function getDimCount(source, sysDims, dimsDef, optDimCount) {
  var dimCount = Math.max(source.dimensionsDetectedCount || 1, sysDims.length, dimsDef.length, optDimCount || 0);
  each(sysDims, function (sysDimItem) {
    var sysDimItemDimsDef;

    if (isObject(sysDimItem) && (sysDimItemDimsDef = sysDimItem.dimsDef)) {
      dimCount = Math.max(dimCount, sysDimItemDimsDef.length);
    }
  });
  return dimCount;
}

function genName(name, map, fromZero) {
  if (fromZero || map.get(name) != null) {
    var i = 0;

    while (map.get(name + i) != null) {
      i++;
    }

    name += i;
  }

  map.set(name, true);
  return name;
}

export default completeDimensions;