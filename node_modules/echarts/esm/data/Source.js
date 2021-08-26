
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

import { isTypedArray, clone, createHashMap, isArray, isObject, isArrayLike, hasOwn, assert, each, map, isNumber, isString } from 'zrender/esm/core/util';
import { SOURCE_FORMAT_ORIGINAL, SERIES_LAYOUT_BY_COLUMN, SOURCE_FORMAT_UNKNOWN, SOURCE_FORMAT_KEYED_COLUMNS, SOURCE_FORMAT_TYPED_ARRAY, SOURCE_FORMAT_ARRAY_ROWS, SOURCE_FORMAT_OBJECT_ROWS, SERIES_LAYOUT_BY_ROW } from '../util/types';
import { getDataItemValue } from '../util/model';
;

var SourceImpl = function () {
  function SourceImpl(fields) {
    this.data = fields.data || (fields.sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS ? {} : []);
    this.sourceFormat = fields.sourceFormat || SOURCE_FORMAT_UNKNOWN;
    this.seriesLayoutBy = fields.seriesLayoutBy || SERIES_LAYOUT_BY_COLUMN;
    this.startIndex = fields.startIndex || 0;
    this.dimensionsDefine = fields.dimensionsDefine;
    this.dimensionsDetectedCount = fields.dimensionsDetectedCount;
    this.encodeDefine = fields.encodeDefine;
    this.metaRawOption = fields.metaRawOption;
  }

  return SourceImpl;
}();

export function isSourceInstance(val) {
  return val instanceof SourceImpl;
}
export function createSource(sourceData, thisMetaRawOption, sourceFormat, encodeDefine) {
  sourceFormat = sourceFormat || detectSourceFormat(sourceData);
  var seriesLayoutBy = thisMetaRawOption.seriesLayoutBy;
  var determined = determineSourceDimensions(sourceData, sourceFormat, seriesLayoutBy, thisMetaRawOption.sourceHeader, thisMetaRawOption.dimensions);
  var source = new SourceImpl({
    data: sourceData,
    sourceFormat: sourceFormat,
    seriesLayoutBy: seriesLayoutBy,
    dimensionsDefine: determined.dimensionsDefine,
    startIndex: determined.startIndex,
    dimensionsDetectedCount: determined.dimensionsDetectedCount,
    encodeDefine: makeEncodeDefine(encodeDefine),
    metaRawOption: clone(thisMetaRawOption)
  });
  return source;
}
export function createSourceFromSeriesDataOption(data) {
  return new SourceImpl({
    data: data,
    sourceFormat: isTypedArray(data) ? SOURCE_FORMAT_TYPED_ARRAY : SOURCE_FORMAT_ORIGINAL
  });
}
export function cloneSourceShallow(source) {
  return new SourceImpl({
    data: source.data,
    sourceFormat: source.sourceFormat,
    seriesLayoutBy: source.seriesLayoutBy,
    dimensionsDefine: clone(source.dimensionsDefine),
    startIndex: source.startIndex,
    dimensionsDetectedCount: source.dimensionsDetectedCount,
    encodeDefine: makeEncodeDefine(source.encodeDefine)
  });
}

function makeEncodeDefine(encodeDefine) {
  return encodeDefine ? createHashMap(encodeDefine) : null;
}

function detectSourceFormat(data) {
  var sourceFormat = SOURCE_FORMAT_UNKNOWN;

  if (isTypedArray(data)) {
    sourceFormat = SOURCE_FORMAT_TYPED_ARRAY;
  } else if (isArray(data)) {
    if (data.length === 0) {
      sourceFormat = SOURCE_FORMAT_ARRAY_ROWS;
    }

    for (var i = 0, len = data.length; i < len; i++) {
      var item = data[i];

      if (item == null) {
        continue;
      } else if (isArray(item)) {
        sourceFormat = SOURCE_FORMAT_ARRAY_ROWS;
        break;
      } else if (isObject(item)) {
        sourceFormat = SOURCE_FORMAT_OBJECT_ROWS;
        break;
      }
    }
  } else if (isObject(data)) {
    for (var key in data) {
      if (hasOwn(data, key) && isArrayLike(data[key])) {
        sourceFormat = SOURCE_FORMAT_KEYED_COLUMNS;
        break;
      }
    }
  } else if (data != null) {
    throw new Error('Invalid data');
  }

  return sourceFormat;
}

function determineSourceDimensions(data, sourceFormat, seriesLayoutBy, sourceHeader, dimensionsDefine) {
  var dimensionsDetectedCount;
  var startIndex;

  if (!data) {
    return {
      dimensionsDefine: normalizeDimensionsOption(dimensionsDefine),
      startIndex: startIndex,
      dimensionsDetectedCount: dimensionsDetectedCount
    };
  }

  if (sourceFormat === SOURCE_FORMAT_ARRAY_ROWS) {
    var dataArrayRows = data;

    if (sourceHeader === 'auto' || sourceHeader == null) {
      arrayRowsTravelFirst(function (val) {
        if (val != null && val !== '-') {
          if (isString(val)) {
            startIndex == null && (startIndex = 1);
          } else {
            startIndex = 0;
          }
        }
      }, seriesLayoutBy, dataArrayRows, 10);
    } else {
      startIndex = isNumber(sourceHeader) ? sourceHeader : sourceHeader ? 1 : 0;
    }

    if (!dimensionsDefine && startIndex === 1) {
      dimensionsDefine = [];
      arrayRowsTravelFirst(function (val, index) {
        dimensionsDefine[index] = val != null ? val + '' : '';
      }, seriesLayoutBy, dataArrayRows, Infinity);
    }

    dimensionsDetectedCount = dimensionsDefine ? dimensionsDefine.length : seriesLayoutBy === SERIES_LAYOUT_BY_ROW ? dataArrayRows.length : dataArrayRows[0] ? dataArrayRows[0].length : null;
  } else if (sourceFormat === SOURCE_FORMAT_OBJECT_ROWS) {
    if (!dimensionsDefine) {
      dimensionsDefine = objectRowsCollectDimensions(data);
    }
  } else if (sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS) {
    if (!dimensionsDefine) {
      dimensionsDefine = [];
      each(data, function (colArr, key) {
        dimensionsDefine.push(key);
      });
    }
  } else if (sourceFormat === SOURCE_FORMAT_ORIGINAL) {
    var value0 = getDataItemValue(data[0]);
    dimensionsDetectedCount = isArray(value0) && value0.length || 1;
  } else if (sourceFormat === SOURCE_FORMAT_TYPED_ARRAY) {
    if (process.env.NODE_ENV !== 'production') {
      assert(!!dimensionsDefine, 'dimensions must be given if data is TypedArray.');
    }
  }

  return {
    startIndex: startIndex,
    dimensionsDefine: normalizeDimensionsOption(dimensionsDefine),
    dimensionsDetectedCount: dimensionsDetectedCount
  };
}

function objectRowsCollectDimensions(data) {
  var firstIndex = 0;
  var obj;

  while (firstIndex < data.length && !(obj = data[firstIndex++])) {}

  if (obj) {
    var dimensions_1 = [];
    each(obj, function (value, key) {
      dimensions_1.push(key);
    });
    return dimensions_1;
  }
}

function normalizeDimensionsOption(dimensionsDefine) {
  if (!dimensionsDefine) {
    return;
  }

  var nameMap = createHashMap();
  return map(dimensionsDefine, function (rawItem, index) {
    rawItem = isObject(rawItem) ? rawItem : {
      name: rawItem
    };
    var item = {
      name: rawItem.name,
      displayName: rawItem.displayName,
      type: rawItem.type
    };

    if (name == null) {
      return item;
    }

    item.name += '';

    if (item.displayName == null) {
      item.displayName = item.name;
    }

    var exist = nameMap.get(item.name);

    if (!exist) {
      nameMap.set(item.name, {
        count: 1
      });
    } else {
      item.name += '-' + exist.count++;
    }

    return item;
  });
}

function arrayRowsTravelFirst(cb, seriesLayoutBy, data, maxLoop) {
  if (seriesLayoutBy === SERIES_LAYOUT_BY_ROW) {
    for (var i = 0; i < data.length && i < maxLoop; i++) {
      cb(data[i] ? data[i][0] : null, i);
    }
  } else {
    var value0 = data[0] || [];

    for (var i = 0; i < value0.length && i < maxLoop; i++) {
      cb(value0[i], i);
    }
  }
}