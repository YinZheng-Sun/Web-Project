
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

import { __extends } from "tslib";
import * as echarts from '../echarts';
import * as zrUtil from 'zrender/esm/core/util';
import * as modelUtil from '../util/model';
import * as graphicUtil from '../util/graphic';
import * as layoutUtil from '../util/layout';
import { parsePercent } from '../util/number';
import ComponentModel from '../model/Component';
import ComponentView from '../view/Component';
import { getECData } from '../util/innerStore';
import { isEC4CompatibleStyle, convertFromEC4CompatibleStyle } from '../util/styleCompat';
var TRANSFORM_PROPS = {
  x: 1,
  y: 1,
  scaleX: 1,
  scaleY: 1,
  originX: 1,
  originY: 1,
  rotation: 1
};
;
var inner = modelUtil.makeInner();
var _nonShapeGraphicElements = {
  path: null,
  compoundPath: null,
  group: graphicUtil.Group,
  image: graphicUtil.Image,
  text: graphicUtil.Text
};
echarts.registerPreprocessor(function (option) {
  var graphicOption = option.graphic;

  if (zrUtil.isArray(graphicOption)) {
    if (!graphicOption[0] || !graphicOption[0].elements) {
      option.graphic = [{
        elements: graphicOption
      }];
    } else {
      option.graphic = [option.graphic[0]];
    }
  } else if (graphicOption && !graphicOption.elements) {
    option.graphic = [{
      elements: [graphicOption]
    }];
  }
});
;

var GraphicComponentModel = function (_super) {
  __extends(GraphicComponentModel, _super);

  function GraphicComponentModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = GraphicComponentModel.type;
    return _this;
  }

  GraphicComponentModel.prototype.mergeOption = function (option, ecModel) {
    var elements = this.option.elements;
    this.option.elements = null;

    _super.prototype.mergeOption.call(this, option, ecModel);

    this.option.elements = elements;
  };

  GraphicComponentModel.prototype.optionUpdated = function (newOption, isInit) {
    var thisOption = this.option;
    var newList = (isInit ? thisOption : newOption).elements;
    var existList = thisOption.elements = isInit ? [] : thisOption.elements;
    var flattenedList = [];

    this._flatten(newList, flattenedList, null);

    var mappingResult = modelUtil.mappingToExists(existList, flattenedList, 'normalMerge');
    var elOptionsToUpdate = this._elOptionsToUpdate = [];
    zrUtil.each(mappingResult, function (resultItem, index) {
      var newElOption = resultItem.newOption;

      if (process.env.NODE_ENV !== 'production') {
        zrUtil.assert(zrUtil.isObject(newElOption) || resultItem.existing, 'Empty graphic option definition');
      }

      if (!newElOption) {
        return;
      }

      elOptionsToUpdate.push(newElOption);
      setKeyInfoToNewElOption(resultItem, newElOption);
      mergeNewElOptionToExist(existList, index, newElOption);
      setLayoutInfoToExist(existList[index], newElOption);
    }, this);

    for (var i = existList.length - 1; i >= 0; i--) {
      if (existList[i] == null) {
        existList.splice(i, 1);
      } else {
        delete existList[i].$action;
      }
    }
  };

  GraphicComponentModel.prototype._flatten = function (optionList, result, parentOption) {
    zrUtil.each(optionList, function (option) {
      if (!option) {
        return;
      }

      if (parentOption) {
        option.parentOption = parentOption;
      }

      result.push(option);
      var children = option.children;

      if (option.type === 'group' && children) {
        this._flatten(children, result, option);
      }

      delete option.children;
    }, this);
  };

  GraphicComponentModel.prototype.useElOptionsToUpdate = function () {
    var els = this._elOptionsToUpdate;
    this._elOptionsToUpdate = null;
    return els;
  };

  GraphicComponentModel.type = 'graphic';
  GraphicComponentModel.defaultOption = {
    elements: []
  };
  return GraphicComponentModel;
}(ComponentModel);

ComponentModel.registerClass(GraphicComponentModel);

var GraphicComponentView = function (_super) {
  __extends(GraphicComponentView, _super);

  function GraphicComponentView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = GraphicComponentView.type;
    return _this;
  }

  GraphicComponentView.prototype.init = function () {
    this._elMap = zrUtil.createHashMap();
  };

  GraphicComponentView.prototype.render = function (graphicModel, ecModel, api) {
    if (graphicModel !== this._lastGraphicModel) {
      this._clear();
    }

    this._lastGraphicModel = graphicModel;

    this._updateElements(graphicModel);

    this._relocate(graphicModel, api);
  };

  GraphicComponentView.prototype._updateElements = function (graphicModel) {
    var elOptionsToUpdate = graphicModel.useElOptionsToUpdate();

    if (!elOptionsToUpdate) {
      return;
    }

    var elMap = this._elMap;
    var rootGroup = this.group;
    zrUtil.each(elOptionsToUpdate, function (elOption) {
      var id = modelUtil.convertOptionIdName(elOption.id, null);
      var elExisting = id != null ? elMap.get(id) : null;
      var parentId = modelUtil.convertOptionIdName(elOption.parentId, null);
      var targetElParent = parentId != null ? elMap.get(parentId) : rootGroup;
      var elType = elOption.type;
      var elOptionStyle = elOption.style;

      if (elType === 'text' && elOptionStyle) {
        if (elOption.hv && elOption.hv[1]) {
          elOptionStyle.textVerticalAlign = elOptionStyle.textBaseline = elOptionStyle.verticalAlign = elOptionStyle.align = null;
        }
      }

      var textContentOption = elOption.textContent;
      var textConfig = elOption.textConfig;

      if (elOptionStyle && isEC4CompatibleStyle(elOptionStyle, elType, !!textConfig, !!textContentOption)) {
        var convertResult = convertFromEC4CompatibleStyle(elOptionStyle, elType, true);

        if (!textConfig && convertResult.textConfig) {
          textConfig = elOption.textConfig = convertResult.textConfig;
        }

        if (!textContentOption && convertResult.textContent) {
          textContentOption = convertResult.textContent;
        }
      }

      var elOptionCleaned = getCleanedElOption(elOption);

      if (process.env.NODE_ENV !== 'production') {
        elExisting && zrUtil.assert(targetElParent === elExisting.parent, 'Changing parent is not supported.');
      }

      var $action = elOption.$action || 'merge';

      if ($action === 'merge') {
        elExisting ? elExisting.attr(elOptionCleaned) : createEl(id, targetElParent, elOptionCleaned, elMap);
      } else if ($action === 'replace') {
        removeEl(elExisting, elMap);
        createEl(id, targetElParent, elOptionCleaned, elMap);
      } else if ($action === 'remove') {
        removeEl(elExisting, elMap);
      }

      var el = elMap.get(id);

      if (el && textContentOption) {
        if ($action === 'merge') {
          var textContentExisting = el.getTextContent();
          textContentExisting ? textContentExisting.attr(textContentOption) : el.setTextContent(new graphicUtil.Text(textContentOption));
        } else if ($action === 'replace') {
          el.setTextContent(new graphicUtil.Text(textContentOption));
        }
      }

      if (el) {
        var elInner = inner(el);
        elInner.__ecGraphicWidthOption = elOption.width;
        elInner.__ecGraphicHeightOption = elOption.height;
        setEventData(el, graphicModel, elOption);
      }
    });
  };

  GraphicComponentView.prototype._relocate = function (graphicModel, api) {
    var elOptions = graphicModel.option.elements;
    var rootGroup = this.group;
    var elMap = this._elMap;
    var apiWidth = api.getWidth();
    var apiHeight = api.getHeight();

    for (var i = 0; i < elOptions.length; i++) {
      var elOption = elOptions[i];
      var id = modelUtil.convertOptionIdName(elOption.id, null);
      var el = id != null ? elMap.get(id) : null;

      if (!el || !el.isGroup) {
        continue;
      }

      var parentEl = el.parent;
      var isParentRoot = parentEl === rootGroup;
      var elInner = inner(el);
      var parentElInner = inner(parentEl);
      elInner.__ecGraphicWidth = parsePercent(elInner.__ecGraphicWidthOption, isParentRoot ? apiWidth : parentElInner.__ecGraphicWidth) || 0;
      elInner.__ecGraphicHeight = parsePercent(elInner.__ecGraphicHeightOption, isParentRoot ? apiHeight : parentElInner.__ecGraphicHeight) || 0;
    }

    for (var i = elOptions.length - 1; i >= 0; i--) {
      var elOption = elOptions[i];
      var id = modelUtil.convertOptionIdName(elOption.id, null);
      var el = id != null ? elMap.get(id) : null;

      if (!el) {
        continue;
      }

      var parentEl = el.parent;
      var parentElInner = inner(parentEl);
      var containerInfo = parentEl === rootGroup ? {
        width: apiWidth,
        height: apiHeight
      } : {
        width: parentElInner.__ecGraphicWidth,
        height: parentElInner.__ecGraphicHeight
      };
      layoutUtil.positionElement(el, elOption, containerInfo, null, {
        hv: elOption.hv,
        boundingMode: elOption.bounding
      });
    }
  };

  GraphicComponentView.prototype._clear = function () {
    var elMap = this._elMap;
    elMap.each(function (el) {
      removeEl(el, elMap);
    });
    this._elMap = zrUtil.createHashMap();
  };

  GraphicComponentView.prototype.dispose = function () {
    this._clear();
  };

  GraphicComponentView.type = 'graphic';
  return GraphicComponentView;
}(ComponentView);

ComponentView.registerClass(GraphicComponentView);

function createEl(id, targetElParent, elOption, elMap) {
  var graphicType = elOption.type;

  if (process.env.NODE_ENV !== 'production') {
    zrUtil.assert(graphicType, 'graphic type MUST be set');
  }

  var Clz = zrUtil.hasOwn(_nonShapeGraphicElements, graphicType) ? _nonShapeGraphicElements[graphicType] : graphicUtil.getShapeClass(graphicType);

  if (process.env.NODE_ENV !== 'production') {
    zrUtil.assert(Clz, 'graphic type can not be found');
  }

  var el = new Clz(elOption);
  targetElParent.add(el);
  elMap.set(id, el);
  inner(el).__ecGraphicId = id;
}

function removeEl(elExisting, elMap) {
  var existElParent = elExisting && elExisting.parent;

  if (existElParent) {
    elExisting.type === 'group' && elExisting.traverse(function (el) {
      removeEl(el, elMap);
    });
    elMap.removeKey(inner(elExisting).__ecGraphicId);
    existElParent.remove(elExisting);
  }
}

function getCleanedElOption(elOption) {
  elOption = zrUtil.extend({}, elOption);
  zrUtil.each(['id', 'parentId', '$action', 'hv', 'bounding', 'textContent'].concat(layoutUtil.LOCATION_PARAMS), function (name) {
    delete elOption[name];
  });
  return elOption;
}

function isSetLoc(obj, props) {
  var isSet;
  zrUtil.each(props, function (prop) {
    obj[prop] != null && obj[prop] !== 'auto' && (isSet = true);
  });
  return isSet;
}

function setKeyInfoToNewElOption(resultItem, newElOption) {
  var existElOption = resultItem.existing;
  newElOption.id = resultItem.keyInfo.id;
  !newElOption.type && existElOption && (newElOption.type = existElOption.type);

  if (newElOption.parentId == null) {
    var newElParentOption = newElOption.parentOption;

    if (newElParentOption) {
      newElOption.parentId = newElParentOption.id;
    } else if (existElOption) {
      newElOption.parentId = existElOption.parentId;
    }
  }

  newElOption.parentOption = null;
}

function mergeNewElOptionToExist(existList, index, newElOption) {
  var newElOptCopy = zrUtil.extend({}, newElOption);
  var existElOption = existList[index];
  var $action = newElOption.$action || 'merge';

  if ($action === 'merge') {
    if (existElOption) {
      if (process.env.NODE_ENV !== 'production') {
        var newType = newElOption.type;
        zrUtil.assert(!newType || existElOption.type === newType, 'Please set $action: "replace" to change `type`');
      }

      zrUtil.merge(existElOption, newElOptCopy, true);
      layoutUtil.mergeLayoutParam(existElOption, newElOptCopy, {
        ignoreSize: true
      });
      layoutUtil.copyLayoutParams(newElOption, existElOption);
    } else {
      existList[index] = newElOptCopy;
    }
  } else if ($action === 'replace') {
    existList[index] = newElOptCopy;
  } else if ($action === 'remove') {
    existElOption && (existList[index] = null);
  }
}

function setLayoutInfoToExist(existItem, newElOption) {
  if (!existItem) {
    return;
  }

  existItem.hv = newElOption.hv = [isSetLoc(newElOption, ['left', 'right']), isSetLoc(newElOption, ['top', 'bottom'])];

  if (existItem.type === 'group') {
    var existingGroupOpt = existItem;
    var newGroupOpt = newElOption;
    existingGroupOpt.width == null && (existingGroupOpt.width = newGroupOpt.width = 0);
    existingGroupOpt.height == null && (existingGroupOpt.height = newGroupOpt.height = 0);
  }
}

function setEventData(el, graphicModel, elOption) {
  var eventData = getECData(el).eventData;

  if (!el.silent && !el.ignore && !eventData) {
    eventData = getECData(el).eventData = {
      componentType: 'graphic',
      componentIndex: graphicModel.componentIndex,
      name: el.name
    };
  }

  if (eventData) {
    eventData.info = elOption.info;
  }
}