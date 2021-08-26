
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

import { SERIES_LAYOUT_BY_COLUMN, SOURCE_FORMAT_OBJECT_ROWS, SOURCE_FORMAT_ARRAY_ROWS } from '../../util/types';
import { normalizeToArray } from '../../util/model';
import { createHashMap, bind, each, hasOwn, map, clone, isObject, isArrayLike, extend, isArray } from 'zrender/esm/core/util';
import { getRawSourceItemGetter, getRawSourceDataCounter, getRawSourceValueGetter } from './dataProvider';
import { parseDataValue } from './dataValueHelper';
import { inheritSourceMetaRawOption } from './sourceHelper';
import { consoleLog, makePrintable, throwError } from '../../util/log';
import { createSource } from '../Source';

var ExternalSource = function () {
  function ExternalSource() {}

  ExternalSource.prototype.getRawData = function () {
    throw new Error('not supported');
  };

  ExternalSource.prototype.getRawDataItem = function (dataIndex) {
    throw new Error('not supported');
  };

  ExternalSource.prototype.cloneRawData = function () {
    return;
  };

  ExternalSource.prototype.getDimensionInfo = function (dim) {
    return;
  };

  ExternalSource.prototype.cloneAllDimensionInfo = function () {
    return;
  };

  ExternalSource.prototype.count = function () {
    return;
  };

  ExternalSource.prototype.retrieveValue = function (dataIndex, dimIndex) {
    return;
  };

  ExternalSource.prototype.retrieveValueFromItem = function (dataItem, dimIndex) {
    return;
  };

  ExternalSource.prototype.convertValue = function (rawVal, dimInfo) {
    return parseDataValue(rawVal, dimInfo);
  };

  return ExternalSource;
}();

export { ExternalSource };

function createExternalSource(internalSource, externalTransform) {
  var extSource = new ExternalSource();
  var data = internalSource.data;
  var sourceFormat = extSource.sourceFormat = internalSource.sourceFormat;
  var sourceHeaderCount = internalSource.startIndex;
  var dimensions = [];
  var dimsByName = {};
  var dimsDef = internalSource.dimensionsDefine;

  if (dimsDef) {
    each(dimsDef, function (dimDef, idx) {
      var name = dimDef.name;
      var dimDefExt = {
        index: idx,
        name: name,
        displayName: dimDef.displayName
      };
      dimensions.push(dimDefExt);

      if (name != null) {
        var errMsg = '';

        if (hasOwn(dimsByName, name)) {
          if (process.env.NODE_ENV !== 'production') {
            errMsg = 'dimension name "' + name + '" duplicated.';
          }

          throwError(errMsg);
        }

        dimsByName[name] = dimDefExt;
      }
    });
  } else {
    for (var i = 0; i < internalSource.dimensionsDetectedCount || 0; i++) {
      dimensions.push({
        index: i
      });
    }
  }

  var rawItemGetter = getRawSourceItemGetter(sourceFormat, SERIES_LAYOUT_BY_COLUMN);

  if (externalTransform.__isBuiltIn) {
    extSource.getRawDataItem = function (dataIndex) {
      return rawItemGetter(data, sourceHeaderCount, dimensions, dataIndex);
    };

    extSource.getRawData = bind(getRawData, null, internalSource);
  }

  extSource.cloneRawData = bind(cloneRawData, null, internalSource);
  var rawCounter = getRawSourceDataCounter(sourceFormat, SERIES_LAYOUT_BY_COLUMN);
  extSource.count = bind(rawCounter, null, data, sourceHeaderCount, dimensions);
  var rawValueGetter = getRawSourceValueGetter(sourceFormat);

  extSource.retrieveValue = function (dataIndex, dimIndex) {
    var rawItem = rawItemGetter(data, sourceHeaderCount, dimensions, dataIndex);
    return retrieveValueFromItem(rawItem, dimIndex);
  };

  var retrieveValueFromItem = extSource.retrieveValueFromItem = function (dataItem, dimIndex) {
    if (dataItem == null) {
      return;
    }

    var dimDef = dimensions[dimIndex];

    if (dimDef) {
      return rawValueGetter(dataItem, dimIndex, dimDef.name);
    }
  };

  extSource.getDimensionInfo = bind(getDimensionInfo, null, dimensions, dimsByName);
  extSource.cloneAllDimensionInfo = bind(cloneAllDimensionInfo, null, dimensions);
  return extSource;
}

function getRawData(upstream) {
  var sourceFormat = upstream.sourceFormat;
  var data = upstream.data;

  if (sourceFormat === SOURCE_FORMAT_ARRAY_ROWS || sourceFormat === SOURCE_FORMAT_OBJECT_ROWS || !data || isArray(data) && !data.length) {
    return upstream.data;
  }

  var errMsg = '';

  if (process.env.NODE_ENV !== 'production') {
    errMsg = '`getRawData` is not supported in source format ' + sourceFormat;
  }

  throwError(errMsg);
}

function cloneRawData(upstream) {
  var sourceFormat = upstream.sourceFormat;
  var data = upstream.data;

  if (!data) {
    return data;
  } else if (isArray(data) && !data.length) {
    return [];
  } else if (sourceFormat === SOURCE_FORMAT_ARRAY_ROWS) {
    var result = [];

    for (var i = 0, len = data.length; i < len; i++) {
      result.push(data[i].slice());
    }

    return result;
  } else if (sourceFormat === SOURCE_FORMAT_OBJECT_ROWS) {
    var result = [];

    for (var i = 0, len = data.length; i < len; i++) {
      result.push(extend({}, data[i]));
    }

    return result;
  }
}

function getDimensionInfo(dimensions, dimsByName, dim) {
  if (dim == null) {
    return;
  }

  if (typeof dim === 'number' || !isNaN(dim) && !hasOwn(dimsByName, dim)) {
    return dimensions[dim];
  } else if (hasOwn(dimsByName, dim)) {
    return dimsByName[dim];
  }
}

function cloneAllDimensionInfo(dimensions) {
  return clone(dimensions);
}

var externalTransformMap = createHashMap();
export function registerExternalTransform(externalTransform) {
  externalTransform = clone(externalTransform);
  var type = externalTransform.type;
  var errMsg = '';

  if (!type) {
    if (process.env.NODE_ENV !== 'production') {
      errMsg = 'Must have a `type` when `registerTransform`.';
    }

    throwError(errMsg);
  }

  var typeParsed = type.split(':');

  if (typeParsed.length !== 2) {
    if (process.env.NODE_ENV !== 'production') {
      errMsg = 'Name must include namespace like "ns:regression".';
    }

    throwError(errMsg);
  }

  var isBuiltIn = false;

  if (typeParsed[0] === 'echarts') {
    type = typeParsed[1];
    isBuiltIn = true;
  }

  externalTransform.__isBuiltIn = isBuiltIn;
  externalTransformMap.set(type, externalTransform);
}
export function applyDataTransform(rawTransOption, sourceList, infoForPrint) {
  var pipedTransOption = normalizeToArray(rawTransOption);
  var pipeLen = pipedTransOption.length;
  var errMsg = '';

  if (!pipeLen) {
    if (process.env.NODE_ENV !== 'production') {
      errMsg = 'If `transform` declared, it should at least contain one transform.';
    }

    throwError(errMsg);
  }

  for (var i = 0, len = pipeLen; i < len; i++) {
    var transOption = pipedTransOption[i];
    sourceList = applySingleDataTransform(transOption, sourceList, infoForPrint, pipeLen === 1 ? null : i);

    if (i !== len - 1) {
      sourceList.length = Math.max(sourceList.length, 1);
    }
  }

  return sourceList;
}

function applySingleDataTransform(transOption, upSourceList, infoForPrint, pipeIndex) {
  var errMsg = '';

  if (!upSourceList.length) {
    if (process.env.NODE_ENV !== 'production') {
      errMsg = 'Must have at least one upstream dataset.';
    }

    throwError(errMsg);
  }

  if (!isObject(transOption)) {
    if (process.env.NODE_ENV !== 'production') {
      errMsg = 'transform declaration must be an object rather than ' + typeof transOption + '.';
    }

    throwError(errMsg);
  }

  var transType = transOption.type;
  var externalTransform = externalTransformMap.get(transType);

  if (!externalTransform) {
    if (process.env.NODE_ENV !== 'production') {
      errMsg = 'Can not find transform on type "' + transType + '".';
    }

    throwError(errMsg);
  }

  var extUpSourceList = map(upSourceList, function (upSource) {
    return createExternalSource(upSource, externalTransform);
  });
  var resultList = normalizeToArray(externalTransform.transform({
    upstream: extUpSourceList[0],
    upstreamList: extUpSourceList,
    config: clone(transOption.config)
  }));

  if (process.env.NODE_ENV !== 'production') {
    if (transOption.print) {
      var printStrArr = map(resultList, function (extSource) {
        var pipeIndexStr = pipeIndex != null ? ' === pipe index: ' + pipeIndex : '';
        return ['=== dataset index: ' + infoForPrint.datasetIndex + pipeIndexStr + ' ===', '- transform result data:', makePrintable(extSource.data), '- transform result dimensions:', makePrintable(extSource.dimensions)].join('\n');
      }).join('\n');
      consoleLog(printStrArr);
    }
  }

  return map(resultList, function (result) {
    var errMsg = '';

    if (!isObject(result)) {
      if (process.env.NODE_ENV !== 'production') {
        errMsg = 'A transform should not return some empty results.';
      }

      throwError(errMsg);
    }

    var resultData = result.data;

    if (resultData != null) {
      if (!isObject(resultData) && !isArrayLike(resultData)) {
        if (process.env.NODE_ENV !== 'production') {
          errMsg = 'Result data should be object or array in data transform.';
        }

        throwError(errMsg);
      }
    } else {
      resultData = upSourceList[0].data;
    }

    var resultMetaRawOption = inheritSourceMetaRawOption(upSourceList[0], {
      seriesLayoutBy: SERIES_LAYOUT_BY_COLUMN,
      sourceHeader: 0,
      dimensions: result.dimensions
    });
    return createSource(resultData, resultMetaRawOption, null, null);
  });
}