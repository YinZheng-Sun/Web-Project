
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

import LRU from 'zrender/esm/core/LRU';
import { extend, indexOf, isArrayLike, isObject, keys, isArray, each } from 'zrender/esm/core/util';
import { getECData } from './innerStore';
import * as colorTool from 'zrender/esm/tool/color';
import { queryDataIndex, makeInner } from './model';
import Path from 'zrender/esm/graphic/Path';
var _highlightNextDigit = 1;
var _highlightKeyMap = {};
var getSavedStates = makeInner();
export var HOVER_STATE_NORMAL = 0;
export var HOVER_STATE_BLUR = 1;
export var HOVER_STATE_EMPHASIS = 2;
export var SPECIAL_STATES = ['emphasis', 'blur', 'select'];
export var DISPLAY_STATES = ['normal', 'emphasis', 'blur', 'select'];
export var Z2_EMPHASIS_LIFT = 10;
export var Z2_SELECT_LIFT = 9;
export var HIGHLIGHT_ACTION_TYPE = 'highlight';
export var DOWNPLAY_ACTION_TYPE = 'downplay';
export var SELECT_ACTION_TYPE = 'select';
export var UNSELECT_ACTION_TYPE = 'unselect';
export var TOGGLE_SELECT_ACTION_TYPE = 'toggleSelect';

function hasFillOrStroke(fillOrStroke) {
  return fillOrStroke != null && fillOrStroke !== 'none';
}

var liftedColorCache = new LRU(100);

function liftColor(color) {
  if (typeof color !== 'string') {
    return color;
  }

  var liftedColor = liftedColorCache.get(color);

  if (!liftedColor) {
    liftedColor = colorTool.lift(color, -0.1);
    liftedColorCache.put(color, liftedColor);
  }

  return liftedColor;
}

function doChangeHoverState(el, stateName, hoverStateEnum) {
  if (el.onHoverStateChange && (el.hoverState || 0) !== hoverStateEnum) {
    el.onHoverStateChange(stateName);
  }

  el.hoverState = hoverStateEnum;
}

function singleEnterEmphasis(el) {
  doChangeHoverState(el, 'emphasis', HOVER_STATE_EMPHASIS);
}

function singleLeaveEmphasis(el) {
  if (el.hoverState === HOVER_STATE_EMPHASIS) {
    doChangeHoverState(el, 'normal', HOVER_STATE_NORMAL);
  }
}

function singleEnterBlur(el) {
  doChangeHoverState(el, 'blur', HOVER_STATE_BLUR);
}

function singleLeaveBlur(el) {
  if (el.hoverState === HOVER_STATE_BLUR) {
    doChangeHoverState(el, 'normal', HOVER_STATE_NORMAL);
  }
}

function singleEnterSelect(el) {
  el.selected = true;
}

function singleLeaveSelect(el) {
  el.selected = false;
}

function updateElementState(el, updater, commonParam) {
  updater(el, commonParam);
}

function traverseUpdateState(el, updater, commonParam) {
  updateElementState(el, updater, commonParam);
  el.isGroup && el.traverse(function (child) {
    updateElementState(child, updater, commonParam);
  });
}

export function setStatesFlag(el, stateName) {
  switch (stateName) {
    case 'emphasis':
      el.hoverState = HOVER_STATE_EMPHASIS;
      break;

    case 'normal':
      el.hoverState = HOVER_STATE_NORMAL;
      break;

    case 'blur':
      el.hoverState = HOVER_STATE_BLUR;
      break;

    case 'select':
      el.selected = true;
  }
}
export function clearStates(el) {
  if (el.isGroup) {
    el.traverse(function (child) {
      child.clearStates();
    });
  } else {
    el.clearStates();
  }
}

function getFromStateStyle(el, props, toStateName, defaultValue) {
  var style = el.style;
  var fromState = {};

  for (var i = 0; i < props.length; i++) {
    var propName = props[i];
    var val = style[propName];
    fromState[propName] = val == null ? defaultValue && defaultValue[propName] : val;
  }

  for (var i = 0; i < el.animators.length; i++) {
    var animator = el.animators[i];

    if (animator.__fromStateTransition && animator.__fromStateTransition.indexOf(toStateName) < 0 && animator.targetName === 'style') {
      animator.saveFinalToTarget(fromState, props);
    }
  }

  return fromState;
}

function createEmphasisDefaultState(el, stateName, targetStates, state) {
  var hasSelect = targetStates && indexOf(targetStates, 'select') >= 0;
  var cloned = false;

  if (el instanceof Path) {
    var store = getSavedStates(el);
    var fromFill = hasSelect ? store.selectFill || store.normalFill : store.normalFill;
    var fromStroke = hasSelect ? store.selectStroke || store.normalStroke : store.normalStroke;

    if (hasFillOrStroke(fromFill) || hasFillOrStroke(fromStroke)) {
      state = state || {};
      var emphasisStyle = state.style || {};

      if (!hasFillOrStroke(emphasisStyle.fill) && hasFillOrStroke(fromFill)) {
        cloned = true;
        state = extend({}, state);
        emphasisStyle = extend({}, emphasisStyle);
        emphasisStyle.fill = liftColor(fromFill);
      } else if (!hasFillOrStroke(emphasisStyle.stroke) && hasFillOrStroke(fromStroke)) {
        if (!cloned) {
          state = extend({}, state);
          emphasisStyle = extend({}, emphasisStyle);
        }

        emphasisStyle.stroke = liftColor(fromStroke);
      }

      state.style = emphasisStyle;
    }
  }

  if (state) {
    if (state.z2 == null) {
      if (!cloned) {
        state = extend({}, state);
      }

      var z2EmphasisLift = el.z2EmphasisLift;
      state.z2 = el.z2 + (z2EmphasisLift != null ? z2EmphasisLift : Z2_EMPHASIS_LIFT);
    }
  }

  return state;
}

function createSelectDefaultState(el, stateName, state) {
  if (state) {
    if (state.z2 == null) {
      state = extend({}, state);
      var z2SelectLift = el.z2SelectLift;
      state.z2 = el.z2 + (z2SelectLift != null ? z2SelectLift : Z2_SELECT_LIFT);
    }
  }

  return state;
}

function createBlurDefaultState(el, stateName, state) {
  var hasBlur = indexOf(el.currentStates, stateName) >= 0;
  var currentOpacity = el.style.opacity;
  var fromState = !hasBlur ? getFromStateStyle(el, ['opacity'], stateName, {
    opacity: 1
  }) : null;
  state = state || {};
  var blurStyle = state.style || {};

  if (blurStyle.opacity == null) {
    state = extend({}, state);
    blurStyle = extend({
      opacity: hasBlur ? currentOpacity : fromState.opacity * 0.1
    }, blurStyle);
    state.style = blurStyle;
  }

  return state;
}

function elementStateProxy(stateName, targetStates) {
  var state = this.states[stateName];

  if (this.style) {
    if (stateName === 'emphasis') {
      return createEmphasisDefaultState(this, stateName, targetStates, state);
    } else if (stateName === 'blur') {
      return createBlurDefaultState(this, stateName, state);
    } else if (stateName === 'select') {
      return createSelectDefaultState(this, stateName, state);
    }
  }

  return state;
}

export function setDefaultStateProxy(el) {
  el.stateProxy = elementStateProxy;
  var textContent = el.getTextContent();
  var textGuide = el.getTextGuideLine();

  if (textContent) {
    textContent.stateProxy = elementStateProxy;
  }

  if (textGuide) {
    textGuide.stateProxy = elementStateProxy;
  }
}
export function enterEmphasisWhenMouseOver(el, e) {
  !shouldSilent(el, e) && !el.__highByOuter && traverseUpdateState(el, singleEnterEmphasis);
}
export function leaveEmphasisWhenMouseOut(el, e) {
  !shouldSilent(el, e) && !el.__highByOuter && traverseUpdateState(el, singleLeaveEmphasis);
}
export function enterEmphasis(el, highlightDigit) {
  el.__highByOuter |= 1 << (highlightDigit || 0);
  traverseUpdateState(el, singleEnterEmphasis);
}
export function leaveEmphasis(el, highlightDigit) {
  !(el.__highByOuter &= ~(1 << (highlightDigit || 0))) && traverseUpdateState(el, singleLeaveEmphasis);
}
export function enterBlur(el) {
  traverseUpdateState(el, singleEnterBlur);
}
export function leaveBlur(el) {
  traverseUpdateState(el, singleLeaveBlur);
}
export function enterSelect(el) {
  traverseUpdateState(el, singleEnterSelect);
}
export function leaveSelect(el) {
  traverseUpdateState(el, singleLeaveSelect);
}

function shouldSilent(el, e) {
  return el.__highDownSilentOnTouch && e.zrByTouch;
}

function allLeaveBlur(api) {
  var model = api.getModel();
  model.eachComponent(function (componentType, componentModel) {
    var view = componentType === 'series' ? api.getViewOfSeriesModel(componentModel) : api.getViewOfComponentModel(componentModel);
    view.group.traverse(function (child) {
      singleLeaveBlur(child);
    });
  });
}

export function toggleSeriesBlurState(targetSeriesIndex, focus, blurScope, api, isBlur) {
  var ecModel = api.getModel();
  blurScope = blurScope || 'coordinateSystem';

  function leaveBlurOfIndices(data, dataIndices) {
    for (var i = 0; i < dataIndices.length; i++) {
      var itemEl = data.getItemGraphicEl(dataIndices[i]);
      itemEl && leaveBlur(itemEl);
    }
  }

  if (!isBlur) {
    allLeaveBlur(api);
    return;
  }

  if (targetSeriesIndex == null) {
    return;
  }

  if (!focus || focus === 'none') {
    return;
  }

  var targetSeriesModel = ecModel.getSeriesByIndex(targetSeriesIndex);
  var targetCoordSys = targetSeriesModel.coordinateSystem;

  if (targetCoordSys && targetCoordSys.master) {
    targetCoordSys = targetCoordSys.master;
  }

  var blurredSeries = [];
  ecModel.eachSeries(function (seriesModel) {
    var sameSeries = targetSeriesModel === seriesModel;
    var coordSys = seriesModel.coordinateSystem;

    if (coordSys && coordSys.master) {
      coordSys = coordSys.master;
    }

    var sameCoordSys = coordSys && targetCoordSys ? coordSys === targetCoordSys : sameSeries;

    if (!(blurScope === 'series' && !sameSeries || blurScope === 'coordinateSystem' && !sameCoordSys || focus === 'series' && sameSeries)) {
      var view = api.getViewOfSeriesModel(seriesModel);
      view.group.traverse(function (child) {
        singleEnterBlur(child);
      });

      if (isArrayLike(focus)) {
        leaveBlurOfIndices(seriesModel.getData(), focus);
      } else if (isObject(focus)) {
        var dataTypes = keys(focus);

        for (var d = 0; d < dataTypes.length; d++) {
          leaveBlurOfIndices(seriesModel.getData(dataTypes[d]), focus[dataTypes[d]]);
        }
      }

      blurredSeries.push(seriesModel);
    }
  });
  ecModel.eachComponent(function (componentType, componentModel) {
    if (componentType === 'series') {
      return;
    }

    var view = api.getViewOfComponentModel(componentModel);

    if (view && view.blurSeries) {
      view.blurSeries(blurredSeries, ecModel);
    }
  });
}
export function toggleSeriesBlurStateFromPayload(seriesModel, payload, api) {
  if (!isHighDownPayload(payload)) {
    return;
  }

  var isHighlight = payload.type === HIGHLIGHT_ACTION_TYPE;
  var seriesIndex = seriesModel.seriesIndex;
  var data = seriesModel.getData(payload.dataType);
  var dataIndex = queryDataIndex(data, payload);
  dataIndex = (isArray(dataIndex) ? dataIndex[0] : dataIndex) || 0;
  var el = data.getItemGraphicEl(dataIndex);

  if (!el) {
    var count = data.count();
    var current = 0;

    while (!el && current < count) {
      el = data.getItemGraphicEl(current++);
    }
  }

  if (el) {
    var ecData = getECData(el);
    toggleSeriesBlurState(seriesIndex, ecData.focus, ecData.blurScope, api, isHighlight);
  } else {
    var focus_1 = seriesModel.get(['emphasis', 'focus']);
    var blurScope = seriesModel.get(['emphasis', 'blurScope']);

    if (focus_1 != null) {
      toggleSeriesBlurState(seriesIndex, focus_1, blurScope, api, isHighlight);
    }
  }
}
export function toggleSelectionFromPayload(seriesModel, payload, api) {
  if (!isSelectChangePayload(payload)) {
    return;
  }

  var dataType = payload.dataType;
  var data = seriesModel.getData(dataType);
  var dataIndex = queryDataIndex(data, payload);

  if (!isArray(dataIndex)) {
    dataIndex = [dataIndex];
  }

  seriesModel[payload.type === TOGGLE_SELECT_ACTION_TYPE ? 'toggleSelect' : payload.type === SELECT_ACTION_TYPE ? 'select' : 'unselect'](dataIndex, dataType);
}
export function updateSeriesElementSelection(seriesModel) {
  var allData = seriesModel.getAllData();
  each(allData, function (_a) {
    var data = _a.data,
        type = _a.type;
    data.eachItemGraphicEl(function (el, idx) {
      seriesModel.isSelected(idx, type) ? enterSelect(el) : leaveSelect(el);
    });
  });
}
export function getAllSelectedIndices(ecModel) {
  var ret = [];
  ecModel.eachSeries(function (seriesModel) {
    var allData = seriesModel.getAllData();
    each(allData, function (_a) {
      var data = _a.data,
          type = _a.type;
      var dataIndices = seriesModel.getSelectedDataIndices();

      if (dataIndices.length > 0) {
        var item = {
          dataIndex: dataIndices,
          seriesIndex: seriesModel.seriesIndex
        };

        if (type != null) {
          item.dataType = type;
        }

        ret.push(item);
      }
    });
  });
  return ret;
}
export function enableHoverEmphasis(el, focus, blurScope) {
  setAsHighDownDispatcher(el, true);
  traverseUpdateState(el, setDefaultStateProxy);
  enableHoverFocus(el, focus, blurScope);
}
export function enableHoverFocus(el, focus, blurScope) {
  var ecData = getECData(el);

  if (focus != null) {
    ecData.focus = focus;
    ecData.blurScope = blurScope;
  } else if (ecData.focus) {
    ecData.focus = null;
  }
}
var OTHER_STATES = ['emphasis', 'blur', 'select'];
var defaultStyleGetterMap = {
  itemStyle: 'getItemStyle',
  lineStyle: 'getLineStyle',
  areaStyle: 'getAreaStyle'
};
export function setStatesStylesFromModel(el, itemModel, styleType, getter) {
  styleType = styleType || 'itemStyle';

  for (var i = 0; i < OTHER_STATES.length; i++) {
    var stateName = OTHER_STATES[i];
    var model = itemModel.getModel([stateName, styleType]);
    var state = el.ensureState(stateName);
    state.style = getter ? getter(model) : model[defaultStyleGetterMap[styleType]]();
  }
}
export function setAsHighDownDispatcher(el, asDispatcher) {
  var disable = asDispatcher === false;
  var extendedEl = el;

  if (el.highDownSilentOnTouch) {
    extendedEl.__highDownSilentOnTouch = el.highDownSilentOnTouch;
  }

  if (!disable || extendedEl.__highDownDispatcher) {
    extendedEl.__highByOuter = extendedEl.__highByOuter || 0;
    extendedEl.__highDownDispatcher = !disable;
  }
}
export function isHighDownDispatcher(el) {
  return !!(el && el.__highDownDispatcher);
}
export function getHighlightDigit(highlightKey) {
  var highlightDigit = _highlightKeyMap[highlightKey];

  if (highlightDigit == null && _highlightNextDigit <= 32) {
    highlightDigit = _highlightKeyMap[highlightKey] = _highlightNextDigit++;
  }

  return highlightDigit;
}
export function isSelectChangePayload(payload) {
  var payloadType = payload.type;
  return payloadType === SELECT_ACTION_TYPE || payloadType === UNSELECT_ACTION_TYPE || payloadType === TOGGLE_SELECT_ACTION_TYPE;
}
export function isHighDownPayload(payload) {
  var payloadType = payload.type;
  return payloadType === HIGHLIGHT_ACTION_TYPE || payloadType === DOWNPLAY_ACTION_TYPE;
}
export function savePathStates(el) {
  var store = getSavedStates(el);
  store.normalFill = el.style.fill;
  store.normalStroke = el.style.stroke;
  var selectState = el.states.select || {};
  store.selectFill = selectState.style && selectState.style.fill || null;
  store.selectStroke = selectState.style && selectState.style.stroke || null;
}