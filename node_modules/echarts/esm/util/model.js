
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

import { each, isObject, isArray, createHashMap, map, assert, isString, indexOf, isStringSafe } from 'zrender/esm/core/util';
import env from 'zrender/esm/core/env';
import { isNumeric, getRandomIdBase, getPrecisionSafe, round } from './number';
import { interpolateNumber } from 'zrender/esm/animation/Animator';
import { warn } from './log';
var DUMMY_COMPONENT_NAME_PREFIX = 'series\0';
var INTERNAL_COMPONENT_ID_PREFIX = '\0_ec_\0';
export function normalizeToArray(value) {
  return value instanceof Array ? value : value == null ? [] : [value];
}
export function defaultEmphasis(opt, key, subOpts) {
  if (opt) {
    opt[key] = opt[key] || {};
    opt.emphasis = opt.emphasis || {};
    opt.emphasis[key] = opt.emphasis[key] || {};

    for (var i = 0, len = subOpts.length; i < len; i++) {
      var subOptName = subOpts[i];

      if (!opt.emphasis[key].hasOwnProperty(subOptName) && opt[key].hasOwnProperty(subOptName)) {
        opt.emphasis[key][subOptName] = opt[key][subOptName];
      }
    }
  }
}
export var TEXT_STYLE_OPTIONS = ['fontStyle', 'fontWeight', 'fontSize', 'fontFamily', 'rich', 'tag', 'color', 'textBorderColor', 'textBorderWidth', 'width', 'height', 'lineHeight', 'align', 'verticalAlign', 'baseline', 'shadowColor', 'shadowBlur', 'shadowOffsetX', 'shadowOffsetY', 'textShadowColor', 'textShadowBlur', 'textShadowOffsetX', 'textShadowOffsetY', 'backgroundColor', 'borderColor', 'borderWidth', 'borderRadius', 'padding'];
export function getDataItemValue(dataItem) {
  return isObject(dataItem) && !isArray(dataItem) && !(dataItem instanceof Date) ? dataItem.value : dataItem;
}
export function isDataItemOption(dataItem) {
  return isObject(dataItem) && !(dataItem instanceof Array);
}
;
export function mappingToExists(existings, newCmptOptions, mode) {
  var isNormalMergeMode = mode === 'normalMerge';
  var isReplaceMergeMode = mode === 'replaceMerge';
  var isReplaceAllMode = mode === 'replaceAll';
  existings = existings || [];
  newCmptOptions = (newCmptOptions || []).slice();
  var existingIdIdxMap = createHashMap();
  each(newCmptOptions, function (cmptOption, index) {
    if (!isObject(cmptOption)) {
      newCmptOptions[index] = null;
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (cmptOption.id != null && !isValidIdOrName(cmptOption.id)) {
        warnInvalidateIdOrName(cmptOption.id);
      }

      if (cmptOption.name != null && !isValidIdOrName(cmptOption.name)) {
        warnInvalidateIdOrName(cmptOption.name);
      }
    }
  });
  var result = prepareResult(existings, existingIdIdxMap, mode);

  if (isNormalMergeMode || isReplaceMergeMode) {
    mappingById(result, existings, existingIdIdxMap, newCmptOptions);
  }

  if (isNormalMergeMode) {
    mappingByName(result, newCmptOptions);
  }

  if (isNormalMergeMode || isReplaceMergeMode) {
    mappingByIndex(result, newCmptOptions, isReplaceMergeMode);
  } else if (isReplaceAllMode) {
    mappingInReplaceAllMode(result, newCmptOptions);
  }

  makeIdAndName(result);
  return result;
}

function prepareResult(existings, existingIdIdxMap, mode) {
  var result = [];

  if (mode === 'replaceAll') {
    return result;
  }

  for (var index = 0; index < existings.length; index++) {
    var existing = existings[index];

    if (existing && existing.id != null) {
      existingIdIdxMap.set(existing.id, index);
    }

    result.push({
      existing: mode === 'replaceMerge' || isComponentIdInternal(existing) ? null : existing,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }

  return result;
}

function mappingById(result, existings, existingIdIdxMap, newCmptOptions) {
  each(newCmptOptions, function (cmptOption, index) {
    if (!cmptOption || cmptOption.id == null) {
      return;
    }

    var optionId = makeComparableKey(cmptOption.id);
    var existingIdx = existingIdIdxMap.get(optionId);

    if (existingIdx != null) {
      var resultItem = result[existingIdx];
      assert(!resultItem.newOption, 'Duplicated option on id "' + optionId + '".');
      resultItem.newOption = cmptOption;
      resultItem.existing = existings[existingIdx];
      newCmptOptions[index] = null;
    }
  });
}

function mappingByName(result, newCmptOptions) {
  each(newCmptOptions, function (cmptOption, index) {
    if (!cmptOption || cmptOption.name == null) {
      return;
    }

    for (var i = 0; i < result.length; i++) {
      var existing = result[i].existing;

      if (!result[i].newOption && existing && (existing.id == null || cmptOption.id == null) && !isComponentIdInternal(cmptOption) && !isComponentIdInternal(existing) && keyExistAndEqual('name', existing, cmptOption)) {
        result[i].newOption = cmptOption;
        newCmptOptions[index] = null;
        return;
      }
    }
  });
}

function mappingByIndex(result, newCmptOptions, brandNew) {
  each(newCmptOptions, function (cmptOption) {
    if (!cmptOption) {
      return;
    }

    var resultItem;
    var nextIdx = 0;

    while ((resultItem = result[nextIdx]) && (resultItem.newOption || isComponentIdInternal(resultItem.existing) || resultItem.existing && cmptOption.id != null && !keyExistAndEqual('id', cmptOption, resultItem.existing))) {
      nextIdx++;
    }

    if (resultItem) {
      resultItem.newOption = cmptOption;
      resultItem.brandNew = brandNew;
    } else {
      result.push({
        newOption: cmptOption,
        brandNew: brandNew,
        existing: null,
        keyInfo: null
      });
    }

    nextIdx++;
  });
}

function mappingInReplaceAllMode(result, newCmptOptions) {
  each(newCmptOptions, function (cmptOption) {
    result.push({
      newOption: cmptOption,
      brandNew: true,
      existing: null,
      keyInfo: null
    });
  });
}

function makeIdAndName(mapResult) {
  var idMap = createHashMap();
  each(mapResult, function (item) {
    var existing = item.existing;
    existing && idMap.set(existing.id, item);
  });
  each(mapResult, function (item) {
    var opt = item.newOption;
    assert(!opt || opt.id == null || !idMap.get(opt.id) || idMap.get(opt.id) === item, 'id duplicates: ' + (opt && opt.id));
    opt && opt.id != null && idMap.set(opt.id, item);
    !item.keyInfo && (item.keyInfo = {});
  });
  each(mapResult, function (item, index) {
    var existing = item.existing;
    var opt = item.newOption;
    var keyInfo = item.keyInfo;

    if (!isObject(opt)) {
      return;
    }

    keyInfo.name = opt.name != null ? makeComparableKey(opt.name) : existing ? existing.name : DUMMY_COMPONENT_NAME_PREFIX + index;

    if (existing) {
      keyInfo.id = makeComparableKey(existing.id);
    } else if (opt.id != null) {
      keyInfo.id = makeComparableKey(opt.id);
    } else {
      var idNum = 0;

      do {
        keyInfo.id = '\0' + keyInfo.name + '\0' + idNum++;
      } while (idMap.get(keyInfo.id));
    }

    idMap.set(keyInfo.id, item);
  });
}

function keyExistAndEqual(attr, obj1, obj2) {
  var key1 = convertOptionIdName(obj1[attr], null);
  var key2 = convertOptionIdName(obj2[attr], null);
  return key1 != null && key2 != null && key1 === key2;
}

function makeComparableKey(val) {
  if (process.env.NODE_ENV !== 'production') {
    if (val == null) {
      throw new Error();
    }
  }

  return convertOptionIdName(val, '');
}

export function convertOptionIdName(idOrName, defaultValue) {
  if (idOrName == null) {
    return defaultValue;
  }

  var type = typeof idOrName;
  return type === 'string' ? idOrName : type === 'number' || isStringSafe(idOrName) ? idOrName + '' : defaultValue;
}

function warnInvalidateIdOrName(idOrName) {
  if (process.env.NODE_ENV !== 'production') {
    warn('`' + idOrName + '` is invalid id or name. Must be a string or number.');
  }
}

function isValidIdOrName(idOrName) {
  return isStringSafe(idOrName) || isNumeric(idOrName);
}

export function isNameSpecified(componentModel) {
  var name = componentModel.name;
  return !!(name && name.indexOf(DUMMY_COMPONENT_NAME_PREFIX));
}
export function isComponentIdInternal(cmptOption) {
  return cmptOption && cmptOption.id != null && makeComparableKey(cmptOption.id).indexOf(INTERNAL_COMPONENT_ID_PREFIX) === 0;
}
export function makeInternalComponentId(idSuffix) {
  return INTERNAL_COMPONENT_ID_PREFIX + idSuffix;
}
export function setComponentTypeToKeyInfo(mappingResult, mainType, componentModelCtor) {
  each(mappingResult, function (item) {
    var newOption = item.newOption;

    if (isObject(newOption)) {
      item.keyInfo.mainType = mainType;
      item.keyInfo.subType = determineSubType(mainType, newOption, item.existing, componentModelCtor);
    }
  });
}

function determineSubType(mainType, newCmptOption, existComponent, componentModelCtor) {
  var subType = newCmptOption.type ? newCmptOption.type : existComponent ? existComponent.subType : componentModelCtor.determineSubType(mainType, newCmptOption);
  return subType;
}

export function compressBatches(batchA, batchB) {
  var mapA = {};
  var mapB = {};
  makeMap(batchA || [], mapA);
  makeMap(batchB || [], mapB, mapA);
  return [mapToArray(mapA), mapToArray(mapB)];

  function makeMap(sourceBatch, map, otherMap) {
    for (var i = 0, len = sourceBatch.length; i < len; i++) {
      var seriesId = convertOptionIdName(sourceBatch[i].seriesId, null);

      if (seriesId == null) {
        return;
      }

      var dataIndices = normalizeToArray(sourceBatch[i].dataIndex);
      var otherDataIndices = otherMap && otherMap[seriesId];

      for (var j = 0, lenj = dataIndices.length; j < lenj; j++) {
        var dataIndex = dataIndices[j];

        if (otherDataIndices && otherDataIndices[dataIndex]) {
          otherDataIndices[dataIndex] = null;
        } else {
          (map[seriesId] || (map[seriesId] = {}))[dataIndex] = 1;
        }
      }
    }
  }

  function mapToArray(map, isData) {
    var result = [];

    for (var i in map) {
      if (map.hasOwnProperty(i) && map[i] != null) {
        if (isData) {
          result.push(+i);
        } else {
          var dataIndices = mapToArray(map[i], true);
          dataIndices.length && result.push({
            seriesId: i,
            dataIndex: dataIndices
          });
        }
      }
    }

    return result;
  }
}
export function queryDataIndex(data, payload) {
  if (payload.dataIndexInside != null) {
    return payload.dataIndexInside;
  } else if (payload.dataIndex != null) {
    return isArray(payload.dataIndex) ? map(payload.dataIndex, function (value) {
      return data.indexOfRawIndex(value);
    }) : data.indexOfRawIndex(payload.dataIndex);
  } else if (payload.name != null) {
    return isArray(payload.name) ? map(payload.name, function (value) {
      return data.indexOfName(value);
    }) : data.indexOfName(payload.name);
  }
}
export function makeInner() {
  var key = '__ec_inner_' + innerUniqueIndex++;
  return function (hostObj) {
    return hostObj[key] || (hostObj[key] = {});
  };
}
var innerUniqueIndex = getRandomIdBase();
export function parseFinder(ecModel, finderInput, opt) {
  var finder;

  if (isString(finderInput)) {
    var obj = {};
    obj[finderInput + 'Index'] = 0;
    finder = obj;
  } else {
    finder = finderInput;
  }

  var queryOptionMap = createHashMap();
  var result = {};
  var mainTypeSpecified = false;
  each(finder, function (value, key) {
    if (key === 'dataIndex' || key === 'dataIndexInside') {
      result[key] = value;
      return;
    }

    var parsedKey = key.match(/^(\w+)(Index|Id|Name)$/) || [];
    var mainType = parsedKey[1];
    var queryType = (parsedKey[2] || '').toLowerCase();

    if (!mainType || !queryType || opt && opt.includeMainTypes && indexOf(opt.includeMainTypes, mainType) < 0) {
      return;
    }

    mainTypeSpecified = mainTypeSpecified || !!mainType;
    var queryOption = queryOptionMap.get(mainType) || queryOptionMap.set(mainType, {});
    queryOption[queryType] = value;
  });
  var defaultMainType = opt ? opt.defaultMainType : null;

  if (!mainTypeSpecified && defaultMainType) {
    queryOptionMap.set(defaultMainType, {});
  }

  queryOptionMap.each(function (queryOption, mainType) {
    var queryResult = queryReferringComponents(ecModel, mainType, queryOption, {
      useDefault: defaultMainType === mainType,
      enableAll: opt && opt.enableAll != null ? opt.enableAll : true,
      enableNone: opt && opt.enableNone != null ? opt.enableNone : true
    });
    result[mainType + 'Models'] = queryResult.models;
    result[mainType + 'Model'] = queryResult.models[0];
  });
  return result;
}
export var SINGLE_REFERRING = {
  useDefault: true,
  enableAll: false,
  enableNone: false
};
export var MULTIPLE_REFERRING = {
  useDefault: false,
  enableAll: true,
  enableNone: true
};
export function queryReferringComponents(ecModel, mainType, userOption, opt) {
  opt = opt || SINGLE_REFERRING;
  var indexOption = userOption.index;
  var idOption = userOption.id;
  var nameOption = userOption.name;
  var result = {
    models: null,
    specified: indexOption != null || idOption != null || nameOption != null
  };

  if (!result.specified) {
    var firstCmpt = void 0;
    result.models = opt.useDefault && (firstCmpt = ecModel.getComponent(mainType)) ? [firstCmpt] : [];
    return result;
  }

  if (indexOption === 'none' || indexOption === false) {
    assert(opt.enableNone, '`"none"` or `false` is not a valid value on index option.');
    result.models = [];
    return result;
  }

  if (indexOption === 'all') {
    assert(opt.enableAll, '`"all"` is not a valid value on index option.');
    indexOption = idOption = nameOption = null;
  }

  result.models = ecModel.queryComponents({
    mainType: mainType,
    index: indexOption,
    id: idOption,
    name: nameOption
  });
  return result;
}
export function setAttribute(dom, key, value) {
  dom.setAttribute ? dom.setAttribute(key, value) : dom[key] = value;
}
export function getAttribute(dom, key) {
  return dom.getAttribute ? dom.getAttribute(key) : dom[key];
}
export function getTooltipRenderMode(renderModeOption) {
  if (renderModeOption === 'auto') {
    return env.domSupported ? 'html' : 'richText';
  } else {
    return renderModeOption || 'html';
  }
}
export function groupData(array, getKey) {
  var buckets = createHashMap();
  var keys = [];
  each(array, function (item) {
    var key = getKey(item);
    (buckets.get(key) || (keys.push(key), buckets.set(key, []))).push(item);
  });
  return {
    keys: keys,
    buckets: buckets
  };
}
export function interpolateRawValues(data, precision, sourceValue, targetValue, percent) {
  var isAutoPrecision = precision == null || precision === 'auto';

  if (targetValue == null) {
    return targetValue;
  }

  if (typeof targetValue === 'number') {
    var value = interpolateNumber(sourceValue || 0, targetValue, percent);
    return round(value, isAutoPrecision ? Math.max(getPrecisionSafe(sourceValue || 0), getPrecisionSafe(targetValue)) : precision);
  } else if (typeof targetValue === 'string') {
    return percent < 1 ? sourceValue : targetValue;
  } else {
    var interpolated = [];
    var leftArr = sourceValue || [];
    var rightArr = targetValue;
    var length_1 = Math.max(leftArr.length, rightArr.length);

    for (var i = 0; i < length_1; ++i) {
      var info = data.getDimensionInfo(i);

      if (info.type === 'ordinal') {
        interpolated[i] = (percent < 1 ? leftArr : rightArr)[i];
      } else {
        var leftVal = leftArr && leftArr[i] ? leftArr[i] : 0;
        var rightVal = rightArr[i];
        var value = leftArr == null ? targetValue[i] : interpolateNumber(leftVal, rightVal, percent);
        interpolated[i] = round(value, isAutoPrecision ? Math.max(getPrecisionSafe(leftVal), getPrecisionSafe(rightVal)) : precision);
      }
    }

    return interpolated;
  }
}