
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
import VisualMapping from './VisualMapping';
import { getItemVisualFromData, setItemVisualFromData } from './helper';
var each = zrUtil.each;

function hasKeys(obj) {
  if (obj) {
    for (var name_1 in obj) {
      if (obj.hasOwnProperty(name_1)) {
        return true;
      }
    }
  }
}

export function createVisualMappings(option, stateList, supplementVisualOption) {
  var visualMappings = {};
  each(stateList, function (state) {
    var mappings = visualMappings[state] = createMappings();
    each(option[state], function (visualData, visualType) {
      if (!VisualMapping.isValidType(visualType)) {
        return;
      }

      var mappingOption = {
        type: visualType,
        visual: visualData
      };
      supplementVisualOption && supplementVisualOption(mappingOption, state);
      mappings[visualType] = new VisualMapping(mappingOption);

      if (visualType === 'opacity') {
        mappingOption = zrUtil.clone(mappingOption);
        mappingOption.type = 'colorAlpha';
        mappings.__hidden.__alphaForOpacity = new VisualMapping(mappingOption);
      }
    });
  });
  return visualMappings;

  function createMappings() {
    var Creater = function () {};

    Creater.prototype.__hidden = Creater.prototype;
    var obj = new Creater();
    return obj;
  }
}
export function replaceVisualOption(thisOption, newOption, keys) {
  var has;
  zrUtil.each(keys, function (key) {
    if (newOption.hasOwnProperty(key) && hasKeys(newOption[key])) {
      has = true;
    }
  });
  has && zrUtil.each(keys, function (key) {
    if (newOption.hasOwnProperty(key) && hasKeys(newOption[key])) {
      thisOption[key] = zrUtil.clone(newOption[key]);
    } else {
      delete thisOption[key];
    }
  });
}
export function applyVisual(stateList, visualMappings, data, getValueState, scope, dimension) {
  var visualTypesMap = {};
  zrUtil.each(stateList, function (state) {
    var visualTypes = VisualMapping.prepareVisualTypes(visualMappings[state]);
    visualTypesMap[state] = visualTypes;
  });
  var dataIndex;

  function getVisual(key) {
    return getItemVisualFromData(data, dataIndex, key);
  }

  function setVisual(key, value) {
    setItemVisualFromData(data, dataIndex, key, value);
  }

  if (dimension == null) {
    data.each(eachItem);
  } else {
    data.each([dimension], eachItem);
  }

  function eachItem(valueOrIndex, index) {
    dataIndex = dimension == null ? valueOrIndex : index;
    var rawDataItem = data.getRawDataItem(dataIndex);

    if (rawDataItem && rawDataItem.visualMap === false) {
      return;
    }

    var valueState = getValueState.call(scope, valueOrIndex);
    var mappings = visualMappings[valueState];
    var visualTypes = visualTypesMap[valueState];

    for (var i = 0, len = visualTypes.length; i < len; i++) {
      var type = visualTypes[i];
      mappings[type] && mappings[type].applyVisual(valueOrIndex, getVisual, setVisual);
    }
  }
}
export function incrementalApplyVisual(stateList, visualMappings, getValueState, dim) {
  var visualTypesMap = {};
  zrUtil.each(stateList, function (state) {
    var visualTypes = VisualMapping.prepareVisualTypes(visualMappings[state]);
    visualTypesMap[state] = visualTypes;
  });
  return {
    progress: function progress(params, data) {
      var dimName;

      if (dim != null) {
        dimName = data.getDimension(dim);
      }

      function getVisual(key) {
        return getItemVisualFromData(data, dataIndex, key);
      }

      function setVisual(key, value) {
        setItemVisualFromData(data, dataIndex, key, value);
      }

      var dataIndex;

      while ((dataIndex = params.next()) != null) {
        var rawDataItem = data.getRawDataItem(dataIndex);

        if (rawDataItem && rawDataItem.visualMap === false) {
          continue;
        }

        var value = dim != null ? data.get(dimName, dataIndex) : dataIndex;
        var valueState = getValueState(value);
        var mappings = visualMappings[valueState];
        var visualTypes = visualTypesMap[valueState];

        for (var i = 0, len = visualTypes.length; i < len; i++) {
          var type = visualTypes[i];
          mappings[type] && mappings[type].applyVisual(value, getVisual, setVisual);
        }
      }
    }
  };
}