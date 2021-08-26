
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

function dataIndexMapValueLength(valNumOrArrLengthMoreThan2) {
  return valNumOrArrLengthMoreThan2 == null ? 0 : valNumOrArrLengthMoreThan2.length || 1;
}

function defaultKeyGetter(item) {
  return item;
}

var DataDiffer = function () {
  function DataDiffer(oldArr, newArr, oldKeyGetter, newKeyGetter, context, diffMode) {
    this._old = oldArr;
    this._new = newArr;
    this._oldKeyGetter = oldKeyGetter || defaultKeyGetter;
    this._newKeyGetter = newKeyGetter || defaultKeyGetter;
    this.context = context;
    this._diffModeMultiple = diffMode === 'multiple';
  }

  DataDiffer.prototype.add = function (func) {
    this._add = func;
    return this;
  };

  DataDiffer.prototype.update = function (func) {
    this._update = func;
    return this;
  };

  DataDiffer.prototype.updateManyToOne = function (func) {
    this._updateManyToOne = func;
    return this;
  };

  DataDiffer.prototype.updateOneToMany = function (func) {
    this._updateOneToMany = func;
    return this;
  };

  DataDiffer.prototype.remove = function (func) {
    this._remove = func;
    return this;
  };

  DataDiffer.prototype.execute = function () {
    this[this._diffModeMultiple ? '_executeMultiple' : '_executeOneToOne']();
  };

  DataDiffer.prototype._executeOneToOne = function () {
    var oldArr = this._old;
    var newArr = this._new;
    var newDataIndexMap = {};
    var oldDataKeyArr = new Array(oldArr.length);
    var newDataKeyArr = new Array(newArr.length);

    this._initIndexMap(oldArr, null, oldDataKeyArr, '_oldKeyGetter');

    this._initIndexMap(newArr, newDataIndexMap, newDataKeyArr, '_newKeyGetter');

    for (var i = 0; i < oldArr.length; i++) {
      var oldKey = oldDataKeyArr[i];
      var newIdxMapVal = newDataIndexMap[oldKey];
      var newIdxMapValLen = dataIndexMapValueLength(newIdxMapVal);

      if (newIdxMapValLen > 1) {
        var newIdx = newIdxMapVal.shift();

        if (newIdxMapVal.length === 1) {
          newDataIndexMap[oldKey] = newIdxMapVal[0];
        }

        this._update && this._update(newIdx, i);
      } else if (newIdxMapValLen === 1) {
        newDataIndexMap[oldKey] = null;
        this._update && this._update(newIdxMapVal, i);
      } else {
        this._remove && this._remove(i);
      }
    }

    this._performRestAdd(newDataKeyArr, newDataIndexMap);
  };

  DataDiffer.prototype._executeMultiple = function () {
    var oldArr = this._old;
    var newArr = this._new;
    var oldDataIndexMap = {};
    var newDataIndexMap = {};
    var oldDataKeyArr = [];
    var newDataKeyArr = [];

    this._initIndexMap(oldArr, oldDataIndexMap, oldDataKeyArr, '_oldKeyGetter');

    this._initIndexMap(newArr, newDataIndexMap, newDataKeyArr, '_newKeyGetter');

    for (var i = 0; i < oldDataKeyArr.length; i++) {
      var oldKey = oldDataKeyArr[i];
      var oldIdxMapVal = oldDataIndexMap[oldKey];
      var newIdxMapVal = newDataIndexMap[oldKey];
      var oldIdxMapValLen = dataIndexMapValueLength(oldIdxMapVal);
      var newIdxMapValLen = dataIndexMapValueLength(newIdxMapVal);

      if (oldIdxMapValLen > 1 && newIdxMapValLen === 1) {
        this._updateManyToOne && this._updateManyToOne(newIdxMapVal, oldIdxMapVal);
        newDataIndexMap[oldKey] = null;
      } else if (oldIdxMapValLen === 1 && newIdxMapValLen > 1) {
        this._updateOneToMany && this._updateOneToMany(newIdxMapVal, oldIdxMapVal);
        newDataIndexMap[oldKey] = null;
      } else if (oldIdxMapValLen === 1 && newIdxMapValLen === 1) {
        this._update && this._update(newIdxMapVal, oldIdxMapVal);
        newDataIndexMap[oldKey] = null;
      } else if (oldIdxMapValLen > 1) {
        for (var i_1 = 0; i_1 < oldIdxMapValLen; i_1++) {
          this._remove && this._remove(oldIdxMapVal[i_1]);
        }
      } else {
        this._remove && this._remove(oldIdxMapVal);
      }
    }

    this._performRestAdd(newDataKeyArr, newDataIndexMap);
  };

  DataDiffer.prototype._performRestAdd = function (newDataKeyArr, newDataIndexMap) {
    for (var i = 0; i < newDataKeyArr.length; i++) {
      var newKey = newDataKeyArr[i];
      var newIdxMapVal = newDataIndexMap[newKey];
      var idxMapValLen = dataIndexMapValueLength(newIdxMapVal);

      if (idxMapValLen > 1) {
        for (var j = 0; j < idxMapValLen; j++) {
          this._add && this._add(newIdxMapVal[j]);
        }
      } else if (idxMapValLen === 1) {
        this._add && this._add(newIdxMapVal);
      }

      newDataIndexMap[newKey] = null;
    }
  };

  DataDiffer.prototype._initIndexMap = function (arr, map, keyArr, keyGetterName) {
    var cbModeMultiple = this._diffModeMultiple;

    for (var i = 0; i < arr.length; i++) {
      var key = '_ec_' + this[keyGetterName](arr[i], i);

      if (!cbModeMultiple) {
        keyArr[i] = key;
      }

      if (!map) {
        continue;
      }

      var idxMapVal = map[key];
      var idxMapValLen = dataIndexMapValueLength(idxMapVal);

      if (idxMapValLen === 0) {
        map[key] = i;

        if (cbModeMultiple) {
          keyArr.push(key);
        }
      } else if (idxMapValLen === 1) {
        map[key] = [idxMapVal, i];
      } else {
        idxMapVal.push(i);
      }
    }
  };

  return DataDiffer;
}();

export default DataDiffer;