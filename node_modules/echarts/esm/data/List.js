
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
import Model from '../model/Model';
import DataDiffer from './DataDiffer';
import { DefaultDataProvider } from './helper/dataProvider';
import { summarizeDimensions } from './helper/dimensionHelper';
import DataDimensionInfo from './DataDimensionInfo';
import { SOURCE_FORMAT_TYPED_ARRAY, SOURCE_FORMAT_ORIGINAL } from '../util/types';
import { isDataItemOption, convertOptionIdName } from '../util/model';
import { getECData } from '../util/innerStore';
import { parseDataValue } from './helper/dataValueHelper';
import { isSourceInstance } from './Source';
var mathFloor = Math.floor;
var isObject = zrUtil.isObject;
var map = zrUtil.map;
var UNDEFINED = 'undefined';
var INDEX_NOT_FOUND = -1;
var ID_PREFIX = 'e\0\0';
var dataCtors = {
  'float': typeof Float64Array === UNDEFINED ? Array : Float64Array,
  'int': typeof Int32Array === UNDEFINED ? Array : Int32Array,
  'ordinal': Array,
  'number': Array,
  'time': Array
};
var CtorUint32Array = typeof Uint32Array === UNDEFINED ? Array : Uint32Array;
var CtorInt32Array = typeof Int32Array === UNDEFINED ? Array : Int32Array;
var CtorUint16Array = typeof Uint16Array === UNDEFINED ? Array : Uint16Array;
var TRANSFERABLE_PROPERTIES = ['hasItemOption', '_nameList', '_idList', '_invertedIndicesMap', '_rawData', '_dimValueGetter', '_count', '_rawCount', '_nameDimIdx', '_idDimIdx', '_nameRepeatCount'];
var CLONE_PROPERTIES = ['_extent', '_approximateExtent', '_rawExtent'];
var defaultDimValueGetters;
var prepareInvertedIndex;
var getIndicesCtor;
var prepareStorage;
var getRawIndexWithoutIndices;
var getRawIndexWithIndices;
var getId;
var getIdNameFromStore;
var makeIdFromName;
var normalizeDimensions;
var validateDimensions;
var cloneListForMapAndSample;
var getInitialExtent;
var setItemDataAndSeriesIndex;
var transferProperties;

var List = function () {
  function List(dimensions, hostModel) {
    this.type = 'list';
    this._count = 0;
    this._rawCount = 0;
    this._storage = {};
    this._storageArr = [];
    this._nameList = [];
    this._idList = [];
    this._visual = {};
    this._layout = {};
    this._itemVisuals = [];
    this._itemLayouts = [];
    this._graphicEls = [];
    this._rawExtent = {};
    this._extent = {};
    this._approximateExtent = {};
    this._calculationInfo = {};
    this.hasItemOption = true;
    this.TRANSFERABLE_METHODS = ['cloneShallow', 'downSample', 'lttbDownSample', 'map'];
    this.CHANGABLE_METHODS = ['filterSelf', 'selectRange'];
    this.DOWNSAMPLE_METHODS = ['downSample', 'lttbDownSample'];
    this.getRawIndex = getRawIndexWithoutIndices;
    dimensions = dimensions || ['x', 'y'];
    var dimensionInfos = {};
    var dimensionNames = [];
    var invertedIndicesMap = {};

    for (var i = 0; i < dimensions.length; i++) {
      var dimInfoInput = dimensions[i];
      var dimensionInfo = zrUtil.isString(dimInfoInput) ? new DataDimensionInfo({
        name: dimInfoInput
      }) : !(dimInfoInput instanceof DataDimensionInfo) ? new DataDimensionInfo(dimInfoInput) : dimInfoInput;
      var dimensionName = dimensionInfo.name;
      dimensionInfo.type = dimensionInfo.type || 'float';

      if (!dimensionInfo.coordDim) {
        dimensionInfo.coordDim = dimensionName;
        dimensionInfo.coordDimIndex = 0;
      }

      var otherDims = dimensionInfo.otherDims = dimensionInfo.otherDims || {};
      dimensionNames.push(dimensionName);
      dimensionInfos[dimensionName] = dimensionInfo;
      dimensionInfo.index = i;

      if (dimensionInfo.createInvertedIndices) {
        invertedIndicesMap[dimensionName] = [];
      }

      if (otherDims.itemName === 0) {
        this._nameDimIdx = i;
        this._nameOrdinalMeta = dimensionInfo.ordinalMeta;
      }

      if (otherDims.itemId === 0) {
        this._idDimIdx = i;
        this._idOrdinalMeta = dimensionInfo.ordinalMeta;
      }
    }

    this.dimensions = dimensionNames;
    this._dimensionInfos = dimensionInfos;
    this.hostModel = hostModel;
    this._dimensionsSummary = summarizeDimensions(this);
    this._invertedIndicesMap = invertedIndicesMap;
    this.userOutput = this._dimensionsSummary.userOutput;
  }

  List.prototype.getDimension = function (dim) {
    if (typeof dim === 'number' || !isNaN(dim) && !this._dimensionInfos.hasOwnProperty(dim)) {
      dim = this.dimensions[dim];
    }

    return dim;
  };

  List.prototype.getDimensionInfo = function (dim) {
    return this._dimensionInfos[this.getDimension(dim)];
  };

  List.prototype.getDimensionsOnCoord = function () {
    return this._dimensionsSummary.dataDimsOnCoord.slice();
  };

  List.prototype.mapDimension = function (coordDim, idx) {
    var dimensionsSummary = this._dimensionsSummary;

    if (idx == null) {
      return dimensionsSummary.encodeFirstDimNotExtra[coordDim];
    }

    var dims = dimensionsSummary.encode[coordDim];
    return dims ? dims[idx] : null;
  };

  List.prototype.mapDimensionsAll = function (coordDim) {
    var dimensionsSummary = this._dimensionsSummary;
    var dims = dimensionsSummary.encode[coordDim];
    return (dims || []).slice();
  };

  List.prototype.initData = function (data, nameList, dimValueGetter) {
    var notProvider = isSourceInstance(data) || zrUtil.isArrayLike(data);
    var provider = notProvider ? new DefaultDataProvider(data, this.dimensions.length) : data;

    if (process.env.NODE_ENV !== 'production') {
      zrUtil.assert(notProvider || zrUtil.isFunction(provider.getItem) && zrUtil.isFunction(provider.count), 'Inavlid data provider.');
    }

    this._rawData = provider;
    var sourceFormat = provider.getSource().sourceFormat;
    this._storage = {};
    this._indices = null;
    this._dontMakeIdFromName = this._idDimIdx != null || sourceFormat === SOURCE_FORMAT_TYPED_ARRAY || !!provider.fillStorage;
    this._nameList = (nameList || []).slice();
    this._idList = [];
    this._nameRepeatCount = {};

    if (!dimValueGetter) {
      this.hasItemOption = false;
    }

    this.defaultDimValueGetter = defaultDimValueGetters[sourceFormat];
    this._dimValueGetter = dimValueGetter = dimValueGetter || this.defaultDimValueGetter;
    this._dimValueGetterArrayRows = defaultDimValueGetters.arrayRows;
    this._rawExtent = {};

    this._initDataFromProvider(0, provider.count());

    if (provider.pure) {
      this.hasItemOption = false;
    }
  };

  List.prototype.getProvider = function () {
    return this._rawData;
  };

  List.prototype.appendData = function (data) {
    if (process.env.NODE_ENV !== 'production') {
      zrUtil.assert(!this._indices, 'appendData can only be called on raw data.');
    }

    var rawData = this._rawData;
    var start = this.count();
    rawData.appendData(data);
    var end = rawData.count();

    if (!rawData.persistent) {
      end += start;
    }

    this._initDataFromProvider(start, end, true);
  };

  List.prototype.appendValues = function (values, names) {
    var storage = this._storage;
    var dimensions = this.dimensions;
    var dimLen = dimensions.length;
    var rawExtent = this._rawExtent;
    var start = this.count();
    var end = start + Math.max(values.length, names ? names.length : 0);

    for (var i = 0; i < dimLen; i++) {
      var dim = dimensions[i];

      if (!rawExtent[dim]) {
        rawExtent[dim] = getInitialExtent();
      }

      prepareStorage(storage, this._dimensionInfos[dim], end, true);
    }

    var rawExtentArr = map(dimensions, function (dim) {
      return rawExtent[dim];
    });
    var storageArr = this._storageArr = map(dimensions, function (dim) {
      return storage[dim];
    });
    var emptyDataItem = [];

    for (var idx = start; idx < end; idx++) {
      var sourceIdx = idx - start;

      for (var dimIdx = 0; dimIdx < dimLen; dimIdx++) {
        var dim = dimensions[dimIdx];

        var val = this._dimValueGetterArrayRows(values[sourceIdx] || emptyDataItem, dim, sourceIdx, dimIdx);

        storageArr[dimIdx][idx] = val;
        var dimRawExtent = rawExtentArr[dimIdx];
        val < dimRawExtent[0] && (dimRawExtent[0] = val);
        val > dimRawExtent[1] && (dimRawExtent[1] = val);
      }

      if (names) {
        this._nameList[idx] = names[sourceIdx];

        if (!this._dontMakeIdFromName) {
          makeIdFromName(this, idx);
        }
      }
    }

    this._rawCount = this._count = end;
    this._extent = {};
    prepareInvertedIndex(this);
  };

  List.prototype._initDataFromProvider = function (start, end, append) {
    if (start >= end) {
      return;
    }

    var rawData = this._rawData;
    var storage = this._storage;
    var dimensions = this.dimensions;
    var dimLen = dimensions.length;
    var dimensionInfoMap = this._dimensionInfos;
    var nameList = this._nameList;
    var idList = this._idList;
    var rawExtent = this._rawExtent;
    var sourceFormat = rawData.getSource().sourceFormat;
    var isFormatOriginal = sourceFormat === SOURCE_FORMAT_ORIGINAL;

    for (var i = 0; i < dimLen; i++) {
      var dim = dimensions[i];

      if (!rawExtent[dim]) {
        rawExtent[dim] = getInitialExtent();
      }

      prepareStorage(storage, dimensionInfoMap[dim], end, append);
    }

    var storageArr = this._storageArr = map(dimensions, function (dim) {
      return storage[dim];
    });
    var rawExtentArr = map(dimensions, function (dim) {
      return rawExtent[dim];
    });

    if (rawData.fillStorage) {
      rawData.fillStorage(start, end, storageArr, rawExtentArr);
    } else {
      var dataItem = [];

      for (var idx = start; idx < end; idx++) {
        dataItem = rawData.getItem(idx, dataItem);

        for (var dimIdx = 0; dimIdx < dimLen; dimIdx++) {
          var dim = dimensions[dimIdx];
          var dimStorage = storageArr[dimIdx];

          var val = this._dimValueGetter(dataItem, dim, idx, dimIdx);

          dimStorage[idx] = val;
          var dimRawExtent = rawExtentArr[dimIdx];
          val < dimRawExtent[0] && (dimRawExtent[0] = val);
          val > dimRawExtent[1] && (dimRawExtent[1] = val);
        }

        if (isFormatOriginal && !rawData.pure && dataItem) {
          var itemName = dataItem.name;

          if (nameList[idx] == null && itemName != null) {
            nameList[idx] = convertOptionIdName(itemName, null);
          }

          var itemId = dataItem.id;

          if (idList[idx] == null && itemId != null) {
            idList[idx] = convertOptionIdName(itemId, null);
          }
        }

        if (!this._dontMakeIdFromName) {
          makeIdFromName(this, idx);
        }
      }
    }

    if (!rawData.persistent && rawData.clean) {
      rawData.clean();
    }

    this._rawCount = this._count = end;
    this._extent = {};
    prepareInvertedIndex(this);
  };

  List.prototype.count = function () {
    return this._count;
  };

  List.prototype.getIndices = function () {
    var newIndices;
    var indices = this._indices;

    if (indices) {
      var Ctor = indices.constructor;
      var thisCount = this._count;

      if (Ctor === Array) {
        newIndices = new Ctor(thisCount);

        for (var i = 0; i < thisCount; i++) {
          newIndices[i] = indices[i];
        }
      } else {
        newIndices = new Ctor(indices.buffer, 0, thisCount);
      }
    } else {
      var Ctor = getIndicesCtor(this);
      newIndices = new Ctor(this.count());

      for (var i = 0; i < newIndices.length; i++) {
        newIndices[i] = i;
      }
    }

    return newIndices;
  };

  List.prototype.getByDimIdx = function (dimIdx, idx) {
    if (!(idx >= 0 && idx < this._count)) {
      return NaN;
    }

    var dimStore = this._storageArr[dimIdx];
    return dimStore ? dimStore[this.getRawIndex(idx)] : NaN;
  };

  List.prototype.get = function (dim, idx) {
    if (!(idx >= 0 && idx < this._count)) {
      return NaN;
    }

    var dimStore = this._storage[dim];
    return dimStore ? dimStore[this.getRawIndex(idx)] : NaN;
  };

  List.prototype.getByRawIndex = function (dim, rawIdx) {
    if (!(rawIdx >= 0 && rawIdx < this._rawCount)) {
      return NaN;
    }

    var dimStore = this._storage[dim];
    return dimStore ? dimStore[rawIdx] : NaN;
  };

  List.prototype.getValues = function (dimensions, idx) {
    var values = [];

    if (!zrUtil.isArray(dimensions)) {
      idx = dimensions;
      dimensions = this.dimensions;
    }

    for (var i = 0, len = dimensions.length; i < len; i++) {
      values.push(this.get(dimensions[i], idx));
    }

    return values;
  };

  List.prototype.hasValue = function (idx) {
    var dataDimsOnCoord = this._dimensionsSummary.dataDimsOnCoord;

    for (var i = 0, len = dataDimsOnCoord.length; i < len; i++) {
      if (isNaN(this.get(dataDimsOnCoord[i], idx))) {
        return false;
      }
    }

    return true;
  };

  List.prototype.getDataExtent = function (dim) {
    dim = this.getDimension(dim);
    var dimData = this._storage[dim];
    var initialExtent = getInitialExtent();

    if (!dimData) {
      return initialExtent;
    }

    var currEnd = this.count();
    var useRaw = !this._indices;
    var dimExtent;

    if (useRaw) {
      return this._rawExtent[dim].slice();
    }

    dimExtent = this._extent[dim];

    if (dimExtent) {
      return dimExtent.slice();
    }

    dimExtent = initialExtent;
    var min = dimExtent[0];
    var max = dimExtent[1];

    for (var i = 0; i < currEnd; i++) {
      var rawIdx = this.getRawIndex(i);
      var value = dimData[rawIdx];
      value < min && (min = value);
      value > max && (max = value);
    }

    dimExtent = [min, max];
    this._extent[dim] = dimExtent;
    return dimExtent;
  };

  List.prototype.getApproximateExtent = function (dim) {
    dim = this.getDimension(dim);
    return this._approximateExtent[dim] || this.getDataExtent(dim);
  };

  List.prototype.setApproximateExtent = function (extent, dim) {
    dim = this.getDimension(dim);
    this._approximateExtent[dim] = extent.slice();
  };

  List.prototype.getCalculationInfo = function (key) {
    return this._calculationInfo[key];
  };

  List.prototype.setCalculationInfo = function (key, value) {
    isObject(key) ? zrUtil.extend(this._calculationInfo, key) : this._calculationInfo[key] = value;
  };

  List.prototype.getSum = function (dim) {
    var dimData = this._storage[dim];
    var sum = 0;

    if (dimData) {
      for (var i = 0, len = this.count(); i < len; i++) {
        var value = this.get(dim, i);

        if (!isNaN(value)) {
          sum += value;
        }
      }
    }

    return sum;
  };

  List.prototype.getMedian = function (dim) {
    var dimDataArray = [];
    this.each(dim, function (val) {
      if (!isNaN(val)) {
        dimDataArray.push(val);
      }
    });
    var sortedDimDataArray = dimDataArray.sort(function (a, b) {
      return a - b;
    });
    var len = this.count();
    return len === 0 ? 0 : len % 2 === 1 ? sortedDimDataArray[(len - 1) / 2] : (sortedDimDataArray[len / 2] + sortedDimDataArray[len / 2 - 1]) / 2;
  };

  List.prototype.rawIndexOf = function (dim, value) {
    var invertedIndices = dim && this._invertedIndicesMap[dim];

    if (process.env.NODE_ENV !== 'production') {
      if (!invertedIndices) {
        throw new Error('Do not supported yet');
      }
    }

    var rawIndex = invertedIndices[value];

    if (rawIndex == null || isNaN(rawIndex)) {
      return INDEX_NOT_FOUND;
    }

    return rawIndex;
  };

  List.prototype.indexOfName = function (name) {
    for (var i = 0, len = this.count(); i < len; i++) {
      if (this.getName(i) === name) {
        return i;
      }
    }

    return -1;
  };

  List.prototype.indexOfRawIndex = function (rawIndex) {
    if (rawIndex >= this._rawCount || rawIndex < 0) {
      return -1;
    }

    if (!this._indices) {
      return rawIndex;
    }

    var indices = this._indices;
    var rawDataIndex = indices[rawIndex];

    if (rawDataIndex != null && rawDataIndex < this._count && rawDataIndex === rawIndex) {
      return rawIndex;
    }

    var left = 0;
    var right = this._count - 1;

    while (left <= right) {
      var mid = (left + right) / 2 | 0;

      if (indices[mid] < rawIndex) {
        left = mid + 1;
      } else if (indices[mid] > rawIndex) {
        right = mid - 1;
      } else {
        return mid;
      }
    }

    return -1;
  };

  List.prototype.indicesOfNearest = function (dim, value, maxDistance) {
    var storage = this._storage;
    var dimData = storage[dim];
    var nearestIndices = [];

    if (!dimData) {
      return nearestIndices;
    }

    if (maxDistance == null) {
      maxDistance = Infinity;
    }

    var minDist = Infinity;
    var minDiff = -1;
    var nearestIndicesLen = 0;

    for (var i = 0, len = this.count(); i < len; i++) {
      var dataIndex = this.getRawIndex(i);
      var diff = value - dimData[dataIndex];
      var dist = Math.abs(diff);

      if (dist <= maxDistance) {
        if (dist < minDist || dist === minDist && diff >= 0 && minDiff < 0) {
          minDist = dist;
          minDiff = diff;
          nearestIndicesLen = 0;
        }

        if (diff === minDiff) {
          nearestIndices[nearestIndicesLen++] = i;
        }
      }
    }

    nearestIndices.length = nearestIndicesLen;
    return nearestIndices;
  };

  List.prototype.getRawDataItem = function (idx) {
    if (!this._rawData.persistent) {
      var val = [];

      for (var i = 0; i < this.dimensions.length; i++) {
        var dim = this.dimensions[i];
        val.push(this.get(dim, idx));
      }

      return val;
    } else {
      return this._rawData.getItem(this.getRawIndex(idx));
    }
  };

  List.prototype.getName = function (idx) {
    var rawIndex = this.getRawIndex(idx);
    var name = this._nameList[rawIndex];

    if (name == null && this._nameDimIdx != null) {
      name = getIdNameFromStore(this, this._nameDimIdx, this._nameOrdinalMeta, rawIndex);
    }

    if (name == null) {
      name = '';
    }

    return name;
  };

  List.prototype.getId = function (idx) {
    return getId(this, this.getRawIndex(idx));
  };

  List.prototype.each = function (dims, cb, ctx, ctxCompat) {
    'use strict';

    var _this = this;

    if (!this._count) {
      return;
    }

    if (typeof dims === 'function') {
      ctxCompat = ctx;
      ctx = cb;
      cb = dims;
      dims = [];
    }

    var fCtx = ctx || ctxCompat || this;
    var dimNames = map(normalizeDimensions(dims), this.getDimension, this);

    if (process.env.NODE_ENV !== 'production') {
      validateDimensions(this, dimNames);
    }

    var dimSize = dimNames.length;
    var dimIndices = map(dimNames, function (dimName) {
      return _this._dimensionInfos[dimName].index;
    });
    var storageArr = this._storageArr;

    for (var i = 0, len = this.count(); i < len; i++) {
      var rawIdx = this.getRawIndex(i);

      switch (dimSize) {
        case 0:
          cb.call(fCtx, i);
          break;

        case 1:
          cb.call(fCtx, storageArr[dimIndices[0]][rawIdx], i);
          break;

        case 2:
          cb.call(fCtx, storageArr[dimIndices[0]][rawIdx], storageArr[dimIndices[1]][rawIdx], i);
          break;

        default:
          var k = 0;
          var value = [];

          for (; k < dimSize; k++) {
            value[k] = storageArr[dimIndices[k]][rawIdx];
          }

          value[k] = i;
          cb.apply(fCtx, value);
      }
    }
  };

  List.prototype.filterSelf = function (dims, cb, ctx, ctxCompat) {
    'use strict';

    var _this = this;

    if (!this._count) {
      return;
    }

    if (typeof dims === 'function') {
      ctxCompat = ctx;
      ctx = cb;
      cb = dims;
      dims = [];
    }

    var fCtx = ctx || ctxCompat || this;
    var dimNames = map(normalizeDimensions(dims), this.getDimension, this);

    if (process.env.NODE_ENV !== 'production') {
      validateDimensions(this, dimNames);
    }

    var count = this.count();
    var Ctor = getIndicesCtor(this);
    var newIndices = new Ctor(count);
    var value = [];
    var dimSize = dimNames.length;
    var offset = 0;
    var dimIndices = map(dimNames, function (dimName) {
      return _this._dimensionInfos[dimName].index;
    });
    var dim0 = dimIndices[0];
    var storageArr = this._storageArr;

    for (var i = 0; i < count; i++) {
      var keep = void 0;
      var rawIdx = this.getRawIndex(i);

      if (dimSize === 0) {
        keep = cb.call(fCtx, i);
      } else if (dimSize === 1) {
        var val = storageArr[dim0][rawIdx];
        keep = cb.call(fCtx, val, i);
      } else {
        var k = 0;

        for (; k < dimSize; k++) {
          value[k] = storageArr[dimIndices[k]][rawIdx];
        }

        value[k] = i;
        keep = cb.apply(fCtx, value);
      }

      if (keep) {
        newIndices[offset++] = rawIdx;
      }
    }

    if (offset < count) {
      this._indices = newIndices;
    }

    this._count = offset;
    this._extent = {};
    this.getRawIndex = this._indices ? getRawIndexWithIndices : getRawIndexWithoutIndices;
    return this;
  };

  List.prototype.selectRange = function (range) {
    'use strict';

    var _this = this;

    var len = this._count;

    if (!len) {
      return;
    }

    var dimensions = [];

    for (var dim in range) {
      if (range.hasOwnProperty(dim)) {
        dimensions.push(dim);
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      validateDimensions(this, dimensions);
    }

    var dimSize = dimensions.length;

    if (!dimSize) {
      return;
    }

    var originalCount = this.count();
    var Ctor = getIndicesCtor(this);
    var newIndices = new Ctor(originalCount);
    var offset = 0;
    var dim0 = dimensions[0];
    var dimIndices = map(dimensions, function (dimName) {
      return _this._dimensionInfos[dimName].index;
    });
    var min = range[dim0][0];
    var max = range[dim0][1];
    var storageArr = this._storageArr;
    var quickFinished = false;

    if (!this._indices) {
      var idx = 0;

      if (dimSize === 1) {
        var dimStorage = storageArr[dimIndices[0]];

        for (var i = 0; i < len; i++) {
          var val = dimStorage[i];

          if (val >= min && val <= max || isNaN(val)) {
            newIndices[offset++] = idx;
          }

          idx++;
        }

        quickFinished = true;
      } else if (dimSize === 2) {
        var dimStorage = storageArr[dimIndices[0]];
        var dimStorage2 = storageArr[dimIndices[1]];
        var min2 = range[dimensions[1]][0];
        var max2 = range[dimensions[1]][1];

        for (var i = 0; i < len; i++) {
          var val = dimStorage[i];
          var val2 = dimStorage2[i];

          if ((val >= min && val <= max || isNaN(val)) && (val2 >= min2 && val2 <= max2 || isNaN(val2))) {
            newIndices[offset++] = idx;
          }

          idx++;
        }

        quickFinished = true;
      }
    }

    if (!quickFinished) {
      if (dimSize === 1) {
        for (var i = 0; i < originalCount; i++) {
          var rawIndex = this.getRawIndex(i);
          var val = storageArr[dimIndices[0]][rawIndex];

          if (val >= min && val <= max || isNaN(val)) {
            newIndices[offset++] = rawIndex;
          }
        }
      } else {
        for (var i = 0; i < originalCount; i++) {
          var keep = true;
          var rawIndex = this.getRawIndex(i);

          for (var k = 0; k < dimSize; k++) {
            var dimk = dimensions[k];
            var val = storageArr[dimIndices[k]][rawIndex];

            if (val < range[dimk][0] || val > range[dimk][1]) {
              keep = false;
            }
          }

          if (keep) {
            newIndices[offset++] = this.getRawIndex(i);
          }
        }
      }
    }

    if (offset < originalCount) {
      this._indices = newIndices;
    }

    this._count = offset;
    this._extent = {};
    this.getRawIndex = this._indices ? getRawIndexWithIndices : getRawIndexWithoutIndices;
    return this;
  };

  List.prototype.mapArray = function (dims, cb, ctx, ctxCompat) {
    'use strict';

    if (typeof dims === 'function') {
      ctxCompat = ctx;
      ctx = cb;
      cb = dims;
      dims = [];
    }

    ctx = ctx || ctxCompat || this;
    var result = [];
    this.each(dims, function () {
      result.push(cb && cb.apply(this, arguments));
    }, ctx);
    return result;
  };

  List.prototype.map = function (dims, cb, ctx, ctxCompat) {
    'use strict';

    var fCtx = ctx || ctxCompat || this;
    var dimNames = map(normalizeDimensions(dims), this.getDimension, this);

    if (process.env.NODE_ENV !== 'production') {
      validateDimensions(this, dimNames);
    }

    var list = cloneListForMapAndSample(this, dimNames);
    var storage = list._storage;
    list._indices = this._indices;
    list.getRawIndex = list._indices ? getRawIndexWithIndices : getRawIndexWithoutIndices;
    var tmpRetValue = [];
    var dimSize = dimNames.length;
    var dataCount = this.count();
    var values = [];
    var rawExtent = list._rawExtent;

    for (var dataIndex = 0; dataIndex < dataCount; dataIndex++) {
      for (var dimIndex = 0; dimIndex < dimSize; dimIndex++) {
        values[dimIndex] = this.get(dimNames[dimIndex], dataIndex);
      }

      values[dimSize] = dataIndex;
      var retValue = cb && cb.apply(fCtx, values);

      if (retValue != null) {
        if (typeof retValue !== 'object') {
          tmpRetValue[0] = retValue;
          retValue = tmpRetValue;
        }

        var rawIndex = this.getRawIndex(dataIndex);

        for (var i = 0; i < retValue.length; i++) {
          var dim = dimNames[i];
          var val = retValue[i];
          var rawExtentOnDim = rawExtent[dim];
          var dimStore = storage[dim];

          if (dimStore) {
            dimStore[rawIndex] = val;
          }

          if (val < rawExtentOnDim[0]) {
            rawExtentOnDim[0] = val;
          }

          if (val > rawExtentOnDim[1]) {
            rawExtentOnDim[1] = val;
          }
        }
      }
    }

    return list;
  };

  List.prototype.downSample = function (dimension, rate, sampleValue, sampleIndex) {
    var list = cloneListForMapAndSample(this, [dimension]);
    var targetStorage = list._storage;
    var frameValues = [];
    var frameSize = mathFloor(1 / rate);
    var dimStore = targetStorage[dimension];
    var len = this.count();
    var rawExtentOnDim = list._rawExtent[dimension];
    var newIndices = new (getIndicesCtor(this))(len);
    var offset = 0;

    for (var i = 0; i < len; i += frameSize) {
      if (frameSize > len - i) {
        frameSize = len - i;
        frameValues.length = frameSize;
      }

      for (var k = 0; k < frameSize; k++) {
        var dataIdx = this.getRawIndex(i + k);
        frameValues[k] = dimStore[dataIdx];
      }

      var value = sampleValue(frameValues);
      var sampleFrameIdx = this.getRawIndex(Math.min(i + sampleIndex(frameValues, value) || 0, len - 1));
      dimStore[sampleFrameIdx] = value;

      if (value < rawExtentOnDim[0]) {
        rawExtentOnDim[0] = value;
      }

      if (value > rawExtentOnDim[1]) {
        rawExtentOnDim[1] = value;
      }

      newIndices[offset++] = sampleFrameIdx;
    }

    list._count = offset;
    list._indices = newIndices;
    list.getRawIndex = getRawIndexWithIndices;
    return list;
  };

  List.prototype.lttbDownSample = function (valueDimension, rate) {
    var list = cloneListForMapAndSample(this, []);
    var targetStorage = list._storage;
    var dimStore = targetStorage[valueDimension];
    var len = this.count();
    var newIndices = new (getIndicesCtor(this))(len);
    var sampledIndex = 0;
    var frameSize = mathFloor(1 / rate);
    var currentRawIndex = this.getRawIndex(0);
    var maxArea;
    var area;
    var nextRawIndex;
    newIndices[sampledIndex++] = currentRawIndex;

    for (var i = 1; i < len - 1; i += frameSize) {
      var nextFrameStart = Math.min(i + frameSize, len - 1);
      var nextFrameEnd = Math.min(i + frameSize * 2, len);
      var avgX = (nextFrameEnd + nextFrameStart) / 2;
      var avgY = 0;

      for (var idx = nextFrameStart; idx < nextFrameEnd; idx++) {
        var rawIndex = this.getRawIndex(idx);
        var y = dimStore[rawIndex];

        if (isNaN(y)) {
          continue;
        }

        avgY += y;
      }

      avgY /= nextFrameEnd - nextFrameStart;
      var frameStart = i;
      var frameEnd = Math.min(i + frameSize, len);
      var pointAX = i - 1;
      var pointAY = dimStore[currentRawIndex];
      maxArea = -1;
      nextRawIndex = frameStart;

      for (var idx = frameStart; idx < frameEnd; idx++) {
        var rawIndex = this.getRawIndex(idx);
        var y = dimStore[rawIndex];

        if (isNaN(y)) {
          continue;
        }

        area = Math.abs((pointAX - avgX) * (y - pointAY) - (pointAX - idx) * (avgY - pointAY));

        if (area > maxArea) {
          maxArea = area;
          nextRawIndex = rawIndex;
        }
      }

      newIndices[sampledIndex++] = nextRawIndex;
      currentRawIndex = nextRawIndex;
    }

    newIndices[sampledIndex++] = this.getRawIndex(len - 1);
    list._count = sampledIndex;
    list._indices = newIndices;
    list.getRawIndex = getRawIndexWithIndices;
    return list;
  };

  List.prototype.getItemModel = function (idx) {
    var hostModel = this.hostModel;
    var dataItem = this.getRawDataItem(idx);
    return new Model(dataItem, hostModel, hostModel && hostModel.ecModel);
  };

  List.prototype.diff = function (otherList) {
    var thisList = this;
    return new DataDiffer(otherList ? otherList.getIndices() : [], this.getIndices(), function (idx) {
      return getId(otherList, idx);
    }, function (idx) {
      return getId(thisList, idx);
    });
  };

  List.prototype.getVisual = function (key) {
    var visual = this._visual;
    return visual && visual[key];
  };

  List.prototype.setVisual = function (kvObj, val) {
    this._visual = this._visual || {};

    if (isObject(kvObj)) {
      zrUtil.extend(this._visual, kvObj);
    } else {
      this._visual[kvObj] = val;
    }
  };

  List.prototype.getItemVisual = function (idx, key) {
    var itemVisual = this._itemVisuals[idx];
    var val = itemVisual && itemVisual[key];

    if (val == null) {
      return this.getVisual(key);
    }

    return val;
  };

  List.prototype.hasItemVisual = function () {
    return this._itemVisuals.length > 0;
  };

  List.prototype.ensureUniqueItemVisual = function (idx, key) {
    var itemVisuals = this._itemVisuals;
    var itemVisual = itemVisuals[idx];

    if (!itemVisual) {
      itemVisual = itemVisuals[idx] = {};
    }

    var val = itemVisual[key];

    if (val == null) {
      val = this.getVisual(key);

      if (zrUtil.isArray(val)) {
        val = val.slice();
      } else if (isObject(val)) {
        val = zrUtil.extend({}, val);
      }

      itemVisual[key] = val;
    }

    return val;
  };

  List.prototype.setItemVisual = function (idx, key, value) {
    var itemVisual = this._itemVisuals[idx] || {};
    this._itemVisuals[idx] = itemVisual;

    if (isObject(key)) {
      zrUtil.extend(itemVisual, key);
    } else {
      itemVisual[key] = value;
    }
  };

  List.prototype.clearAllVisual = function () {
    this._visual = {};
    this._itemVisuals = [];
  };

  List.prototype.setLayout = function (key, val) {
    if (isObject(key)) {
      for (var name_1 in key) {
        if (key.hasOwnProperty(name_1)) {
          this.setLayout(name_1, key[name_1]);
        }
      }

      return;
    }

    this._layout[key] = val;
  };

  List.prototype.getLayout = function (key) {
    return this._layout[key];
  };

  List.prototype.getItemLayout = function (idx) {
    return this._itemLayouts[idx];
  };

  List.prototype.setItemLayout = function (idx, layout, merge) {
    this._itemLayouts[idx] = merge ? zrUtil.extend(this._itemLayouts[idx] || {}, layout) : layout;
  };

  List.prototype.clearItemLayouts = function () {
    this._itemLayouts.length = 0;
  };

  List.prototype.setItemGraphicEl = function (idx, el) {
    var hostModel = this.hostModel;

    if (el) {
      var ecData = getECData(el);
      ecData.dataIndex = idx;
      ecData.dataType = this.dataType;
      ecData.seriesIndex = hostModel && hostModel.seriesIndex;

      if (el.type === 'group') {
        el.traverse(setItemDataAndSeriesIndex, el);
      }
    }

    this._graphicEls[idx] = el;
  };

  List.prototype.getItemGraphicEl = function (idx) {
    return this._graphicEls[idx];
  };

  List.prototype.eachItemGraphicEl = function (cb, context) {
    zrUtil.each(this._graphicEls, function (el, idx) {
      if (el) {
        cb && cb.call(context, el, idx);
      }
    });
  };

  List.prototype.cloneShallow = function (list) {
    if (!list) {
      var dimensionInfoList = map(this.dimensions, this.getDimensionInfo, this);
      list = new List(dimensionInfoList, this.hostModel);
    }

    list._storage = this._storage;
    list._storageArr = this._storageArr;
    transferProperties(list, this);

    if (this._indices) {
      var Ctor = this._indices.constructor;

      if (Ctor === Array) {
        var thisCount = this._indices.length;
        list._indices = new Ctor(thisCount);

        for (var i = 0; i < thisCount; i++) {
          list._indices[i] = this._indices[i];
        }
      } else {
        list._indices = new Ctor(this._indices);
      }
    } else {
      list._indices = null;
    }

    list.getRawIndex = list._indices ? getRawIndexWithIndices : getRawIndexWithoutIndices;
    return list;
  };

  List.prototype.wrapMethod = function (methodName, injectFunction) {
    var originalMethod = this[methodName];

    if (typeof originalMethod !== 'function') {
      return;
    }

    this.__wrappedMethods = this.__wrappedMethods || [];

    this.__wrappedMethods.push(methodName);

    this[methodName] = function () {
      var res = originalMethod.apply(this, arguments);
      return injectFunction.apply(this, [res].concat(zrUtil.slice(arguments)));
    };
  };

  List.internalField = function () {
    defaultDimValueGetters = {
      arrayRows: getDimValueSimply,
      objectRows: function (dataItem, dimName, dataIndex, dimIndex) {
        return parseDataValue(dataItem[dimName], this._dimensionInfos[dimName]);
      },
      keyedColumns: getDimValueSimply,
      original: function (dataItem, dimName, dataIndex, dimIndex) {
        var value = dataItem && (dataItem.value == null ? dataItem : dataItem.value);

        if (!this._rawData.pure && isDataItemOption(dataItem)) {
          this.hasItemOption = true;
        }

        return parseDataValue(value instanceof Array ? value[dimIndex] : value, this._dimensionInfos[dimName]);
      },
      typedArray: function (dataItem, dimName, dataIndex, dimIndex) {
        return dataItem[dimIndex];
      }
    };

    function getDimValueSimply(dataItem, dimName, dataIndex, dimIndex) {
      return parseDataValue(dataItem[dimIndex], this._dimensionInfos[dimName]);
    }

    prepareInvertedIndex = function (list) {
      var invertedIndicesMap = list._invertedIndicesMap;
      zrUtil.each(invertedIndicesMap, function (invertedIndices, dim) {
        var dimInfo = list._dimensionInfos[dim];
        var ordinalMeta = dimInfo.ordinalMeta;

        if (ordinalMeta) {
          invertedIndices = invertedIndicesMap[dim] = new CtorInt32Array(ordinalMeta.categories.length);

          for (var i = 0; i < invertedIndices.length; i++) {
            invertedIndices[i] = INDEX_NOT_FOUND;
          }

          for (var i = 0; i < list._count; i++) {
            invertedIndices[list.get(dim, i)] = i;
          }
        }
      });
    };

    getIdNameFromStore = function (list, dimIdx, ordinalMeta, rawIndex) {
      var val;
      var chunk = list._storageArr[dimIdx];

      if (chunk) {
        val = chunk[rawIndex];

        if (ordinalMeta && ordinalMeta.categories.length) {
          val = ordinalMeta.categories[val];
        }
      }

      return convertOptionIdName(val, null);
    };

    getIndicesCtor = function (list) {
      return list._rawCount > 65535 ? CtorUint32Array : CtorUint16Array;
    };

    prepareStorage = function (storage, dimInfo, end, append) {
      var DataCtor = dataCtors[dimInfo.type];
      var dim = dimInfo.name;

      if (append) {
        var oldStore = storage[dim];
        var oldLen = oldStore && oldStore.length;

        if (!(oldLen === end)) {
          var newStore = new DataCtor(end);

          for (var j = 0; j < oldLen; j++) {
            newStore[j] = oldStore[j];
          }

          storage[dim] = newStore;
        }
      } else {
        storage[dim] = new DataCtor(end);
      }
    };

    getRawIndexWithoutIndices = function (idx) {
      return idx;
    };

    getRawIndexWithIndices = function (idx) {
      if (idx < this._count && idx >= 0) {
        return this._indices[idx];
      }

      return -1;
    };

    getId = function (list, rawIndex) {
      var id = list._idList[rawIndex];

      if (id == null && list._idDimIdx != null) {
        id = getIdNameFromStore(list, list._idDimIdx, list._idOrdinalMeta, rawIndex);
      }

      if (id == null) {
        id = ID_PREFIX + rawIndex;
      }

      return id;
    };

    normalizeDimensions = function (dimensions) {
      if (!zrUtil.isArray(dimensions)) {
        dimensions = dimensions != null ? [dimensions] : [];
      }

      return dimensions;
    };

    validateDimensions = function (list, dims) {
      for (var i = 0; i < dims.length; i++) {
        if (!list._dimensionInfos[dims[i]]) {
          console.error('Unkown dimension ' + dims[i]);
        }
      }
    };

    cloneListForMapAndSample = function (original, excludeDimensions) {
      var allDimensions = original.dimensions;
      var list = new List(map(allDimensions, original.getDimensionInfo, original), original.hostModel);
      transferProperties(list, original);
      var storage = list._storage = {};
      var originalStorage = original._storage;
      var storageArr = list._storageArr = [];

      for (var i = 0; i < allDimensions.length; i++) {
        var dim = allDimensions[i];

        if (originalStorage[dim]) {
          if (zrUtil.indexOf(excludeDimensions, dim) >= 0) {
            storage[dim] = cloneChunk(originalStorage[dim]);
            list._rawExtent[dim] = getInitialExtent();
            list._extent[dim] = null;
          } else {
            storage[dim] = originalStorage[dim];
          }

          storageArr.push(storage[dim]);
        }
      }

      return list;
    };

    function cloneChunk(originalChunk) {
      var Ctor = originalChunk.constructor;
      return Ctor === Array ? originalChunk.slice() : new Ctor(originalChunk);
    }

    getInitialExtent = function () {
      return [Infinity, -Infinity];
    };

    setItemDataAndSeriesIndex = function (child) {
      var childECData = getECData(child);
      var thisECData = getECData(this);
      childECData.seriesIndex = thisECData.seriesIndex;
      childECData.dataIndex = thisECData.dataIndex;
      childECData.dataType = thisECData.dataType;
    };

    transferProperties = function (target, source) {
      zrUtil.each(TRANSFERABLE_PROPERTIES.concat(source.__wrappedMethods || []), function (propName) {
        if (source.hasOwnProperty(propName)) {
          target[propName] = source[propName];
        }
      });
      target.__wrappedMethods = source.__wrappedMethods;
      zrUtil.each(CLONE_PROPERTIES, function (propName) {
        target[propName] = zrUtil.clone(source[propName]);
      });
      target._calculationInfo = zrUtil.extend({}, source._calculationInfo);
    };

    makeIdFromName = function (list, idx) {
      var nameList = list._nameList;
      var idList = list._idList;
      var nameDimIdx = list._nameDimIdx;
      var idDimIdx = list._idDimIdx;
      var name = nameList[idx];
      var id = idList[idx];

      if (name == null && nameDimIdx != null) {
        nameList[idx] = name = getIdNameFromStore(list, nameDimIdx, list._nameOrdinalMeta, idx);
      }

      if (id == null && idDimIdx != null) {
        idList[idx] = id = getIdNameFromStore(list, idDimIdx, list._idOrdinalMeta, idx);
      }

      if (id == null && name != null) {
        var nameRepeatCount = list._nameRepeatCount;
        var nmCnt = nameRepeatCount[name] = (nameRepeatCount[name] || 0) + 1;
        id = name;

        if (nmCnt > 1) {
          id += '__ec__' + nmCnt;
        }

        idList[idx] = id;
      }
    };
  }();

  return List;
}();

export default List;