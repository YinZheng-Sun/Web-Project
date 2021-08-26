
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

import { makeInner, getDataItemValue, queryReferringComponents, SINGLE_REFERRING } from '../../util/model';
import { createHashMap, each, isArray, isString, isObject, isTypedArray, retrieve2 } from 'zrender/esm/core/util';
import { SOURCE_FORMAT_ORIGINAL, SOURCE_FORMAT_ARRAY_ROWS, SOURCE_FORMAT_OBJECT_ROWS, SERIES_LAYOUT_BY_ROW, SOURCE_FORMAT_KEYED_COLUMNS } from '../../util/types';
export var BE_ORDINAL = {
  Must: 1,
  Might: 2,
  Not: 3
};
var innerGlobalModel = makeInner();
export function resetSourceDefaulter(ecModel) {
  innerGlobalModel(ecModel).datasetMap = createHashMap();
}
export function inheritSourceMetaRawOption(upstream, newMetaRawOption) {
  var parentMetaRawOption = upstream ? upstream.metaRawOption : null;
  var seriesLayoutBy = retrieve2(newMetaRawOption.seriesLayoutBy, parentMetaRawOption ? parentMetaRawOption.seriesLayoutBy : null);
  var sourceHeader = retrieve2(newMetaRawOption.sourceHeader, upstream ? upstream.startIndex : null);
  var dimensions = retrieve2(newMetaRawOption.dimensions, upstream ? upstream.dimensionsDefine : null);
  return {
    seriesLayoutBy: seriesLayoutBy,
    sourceHeader: sourceHeader,
    dimensions: dimensions
  };
}
export function makeSeriesEncodeForAxisCoordSys(coordDimensions, seriesModel, source) {
  var encode = {};
  var datasetModel = querySeriesUpstreamDatasetModel(seriesModel);

  if (!datasetModel || !coordDimensions) {
    return encode;
  }

  var encodeItemName = [];
  var encodeSeriesName = [];
  var ecModel = seriesModel.ecModel;
  var datasetMap = innerGlobalModel(ecModel).datasetMap;
  var key = datasetModel.uid + '_' + source.seriesLayoutBy;
  var baseCategoryDimIndex;
  var categoryWayValueDimStart;
  coordDimensions = coordDimensions.slice();
  each(coordDimensions, function (coordDimInfoLoose, coordDimIdx) {
    var coordDimInfo = isObject(coordDimInfoLoose) ? coordDimInfoLoose : coordDimensions[coordDimIdx] = {
      name: coordDimInfoLoose
    };

    if (coordDimInfo.type === 'ordinal' && baseCategoryDimIndex == null) {
      baseCategoryDimIndex = coordDimIdx;
      categoryWayValueDimStart = getDataDimCountOnCoordDim(coordDimInfo);
    }

    encode[coordDimInfo.name] = [];
  });
  var datasetRecord = datasetMap.get(key) || datasetMap.set(key, {
    categoryWayDim: categoryWayValueDimStart,
    valueWayDim: 0
  });
  each(coordDimensions, function (coordDimInfo, coordDimIdx) {
    var coordDimName = coordDimInfo.name;
    var count = getDataDimCountOnCoordDim(coordDimInfo);

    if (baseCategoryDimIndex == null) {
      var start = datasetRecord.valueWayDim;
      pushDim(encode[coordDimName], start, count);
      pushDim(encodeSeriesName, start, count);
      datasetRecord.valueWayDim += count;
    } else if (baseCategoryDimIndex === coordDimIdx) {
      pushDim(encode[coordDimName], 0, count);
      pushDim(encodeItemName, 0, count);
    } else {
      var start = datasetRecord.categoryWayDim;
      pushDim(encode[coordDimName], start, count);
      pushDim(encodeSeriesName, start, count);
      datasetRecord.categoryWayDim += count;
    }
  });

  function pushDim(dimIdxArr, idxFrom, idxCount) {
    for (var i = 0; i < idxCount; i++) {
      dimIdxArr.push(idxFrom + i);
    }
  }

  function getDataDimCountOnCoordDim(coordDimInfo) {
    var dimsDef = coordDimInfo.dimsDef;
    return dimsDef ? dimsDef.length : 1;
  }

  encodeItemName.length && (encode.itemName = encodeItemName);
  encodeSeriesName.length && (encode.seriesName = encodeSeriesName);
  return encode;
}
export function makeSeriesEncodeForNameBased(seriesModel, source, dimCount) {
  var encode = {};
  var datasetModel = querySeriesUpstreamDatasetModel(seriesModel);

  if (!datasetModel) {
    return encode;
  }

  var sourceFormat = source.sourceFormat;
  var dimensionsDefine = source.dimensionsDefine;
  var potentialNameDimIndex;

  if (sourceFormat === SOURCE_FORMAT_OBJECT_ROWS || sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS) {
    each(dimensionsDefine, function (dim, idx) {
      if ((isObject(dim) ? dim.name : dim) === 'name') {
        potentialNameDimIndex = idx;
      }
    });
  }

  var idxResult = function () {
    var idxRes0 = {};
    var idxRes1 = {};
    var guessRecords = [];

    for (var i = 0, len = Math.min(5, dimCount); i < len; i++) {
      var guessResult = doGuessOrdinal(source.data, sourceFormat, source.seriesLayoutBy, dimensionsDefine, source.startIndex, i);
      guessRecords.push(guessResult);
      var isPureNumber = guessResult === BE_ORDINAL.Not;

      if (isPureNumber && idxRes0.v == null && i !== potentialNameDimIndex) {
        idxRes0.v = i;
      }

      if (idxRes0.n == null || idxRes0.n === idxRes0.v || !isPureNumber && guessRecords[idxRes0.n] === BE_ORDINAL.Not) {
        idxRes0.n = i;
      }

      if (fulfilled(idxRes0) && guessRecords[idxRes0.n] !== BE_ORDINAL.Not) {
        return idxRes0;
      }

      if (!isPureNumber) {
        if (guessResult === BE_ORDINAL.Might && idxRes1.v == null && i !== potentialNameDimIndex) {
          idxRes1.v = i;
        }

        if (idxRes1.n == null || idxRes1.n === idxRes1.v) {
          idxRes1.n = i;
        }
      }
    }

    function fulfilled(idxResult) {
      return idxResult.v != null && idxResult.n != null;
    }

    return fulfilled(idxRes0) ? idxRes0 : fulfilled(idxRes1) ? idxRes1 : null;
  }();

  if (idxResult) {
    encode.value = [idxResult.v];
    var nameDimIndex = potentialNameDimIndex != null ? potentialNameDimIndex : idxResult.n;
    encode.itemName = [nameDimIndex];
    encode.seriesName = [nameDimIndex];
  }

  return encode;
}
export function querySeriesUpstreamDatasetModel(seriesModel) {
  var thisData = seriesModel.get('data', true);

  if (!thisData) {
    return queryReferringComponents(seriesModel.ecModel, 'dataset', {
      index: seriesModel.get('datasetIndex', true),
      id: seriesModel.get('datasetId', true)
    }, SINGLE_REFERRING).models[0];
  }
}
export function queryDatasetUpstreamDatasetModels(datasetModel) {
  if (!datasetModel.get('transform', true) && !datasetModel.get('fromTransformResult', true)) {
    return [];
  }

  return queryReferringComponents(datasetModel.ecModel, 'dataset', {
    index: datasetModel.get('fromDatasetIndex', true),
    id: datasetModel.get('fromDatasetId', true)
  }, SINGLE_REFERRING).models;
}
export function guessOrdinal(source, dimIndex) {
  return doGuessOrdinal(source.data, source.sourceFormat, source.seriesLayoutBy, source.dimensionsDefine, source.startIndex, dimIndex);
}

function doGuessOrdinal(data, sourceFormat, seriesLayoutBy, dimensionsDefine, startIndex, dimIndex) {
  var result;
  var maxLoop = 5;

  if (isTypedArray(data)) {
    return BE_ORDINAL.Not;
  }

  var dimName;
  var dimType;

  if (dimensionsDefine) {
    var dimDefItem = dimensionsDefine[dimIndex];

    if (isObject(dimDefItem)) {
      dimName = dimDefItem.name;
      dimType = dimDefItem.type;
    } else if (isString(dimDefItem)) {
      dimName = dimDefItem;
    }
  }

  if (dimType != null) {
    return dimType === 'ordinal' ? BE_ORDINAL.Must : BE_ORDINAL.Not;
  }

  if (sourceFormat === SOURCE_FORMAT_ARRAY_ROWS) {
    var dataArrayRows = data;

    if (seriesLayoutBy === SERIES_LAYOUT_BY_ROW) {
      var sample = dataArrayRows[dimIndex];

      for (var i = 0; i < (sample || []).length && i < maxLoop; i++) {
        if ((result = detectValue(sample[startIndex + i])) != null) {
          return result;
        }
      }
    } else {
      for (var i = 0; i < dataArrayRows.length && i < maxLoop; i++) {
        var row = dataArrayRows[startIndex + i];

        if (row && (result = detectValue(row[dimIndex])) != null) {
          return result;
        }
      }
    }
  } else if (sourceFormat === SOURCE_FORMAT_OBJECT_ROWS) {
    var dataObjectRows = data;

    if (!dimName) {
      return BE_ORDINAL.Not;
    }

    for (var i = 0; i < dataObjectRows.length && i < maxLoop; i++) {
      var item = dataObjectRows[i];

      if (item && (result = detectValue(item[dimName])) != null) {
        return result;
      }
    }
  } else if (sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS) {
    var dataKeyedColumns = data;

    if (!dimName) {
      return BE_ORDINAL.Not;
    }

    var sample = dataKeyedColumns[dimName];

    if (!sample || isTypedArray(sample)) {
      return BE_ORDINAL.Not;
    }

    for (var i = 0; i < sample.length && i < maxLoop; i++) {
      if ((result = detectValue(sample[i])) != null) {
        return result;
      }
    }
  } else if (sourceFormat === SOURCE_FORMAT_ORIGINAL) {
    var dataOriginal = data;

    for (var i = 0; i < dataOriginal.length && i < maxLoop; i++) {
      var item = dataOriginal[i];
      var val = getDataItemValue(item);

      if (!isArray(val)) {
        return BE_ORDINAL.Not;
      }

      if ((result = detectValue(val[dimIndex])) != null) {
        return result;
      }
    }
  }

  function detectValue(val) {
    var beStr = isString(val);

    if (val != null && isFinite(val) && val !== '') {
      return beStr ? BE_ORDINAL.Might : BE_ORDINAL.Not;
    } else if (beStr && val !== '-') {
      return BE_ORDINAL.Must;
    }
  }

  return BE_ORDINAL.Not;
}