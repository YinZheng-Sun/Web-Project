
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
import { hasOwn, assert, isString, retrieve2, retrieve3, defaults, each, keys, isArrayLike, bind, isFunction, eqNaN, indexOf, clone } from 'zrender/esm/core/util';
import * as graphicUtil from '../util/graphic';
import { setDefaultStateProxy, enableHoverEmphasis } from '../util/states';
import * as labelStyleHelper from '../label/labelStyle';
import { getDefaultLabel } from './helper/labelHelper';
import createListFromArray from './helper/createListFromArray';
import { getLayoutOnAxis } from '../layout/barGrid';
import DataDiffer from '../data/DataDiffer';
import SeriesModel from '../model/Series';
import ChartView from '../view/Chart';
import { createClipPath } from './helper/createClipPathFromCoordSys';
import prepareCartesian2d from '../coord/cartesian/prepareCustom';
import prepareGeo from '../coord/geo/prepareCustom';
import prepareSingleAxis from '../coord/single/prepareCustom';
import preparePolar from '../coord/polar/prepareCustom';
import prepareCalendar from '../coord/calendar/prepareCustom';
import ComponentModel from '../model/Component';
import { makeInner, normalizeToArray } from '../util/model';
import { convertToEC4StyleForCustomSerise, isEC4CompatibleStyle, convertFromEC4CompatibleStyle, warnDeprecated } from '../util/styleCompat';
import Transformable from 'zrender/esm/core/Transformable';
import { cloneValue } from 'zrender/esm/animation/Animator';
import { warn, throwError } from '../util/log';
import { combine, isInAnyMorphing, morphPath, isCombiningPath, separate } from 'zrender/esm/tool/morphPath';
import * as matrix from 'zrender/esm/core/matrix';
import { createOrUpdatePatternFromDecal } from '../util/decal';
var inner = makeInner();
var TRANSFORM_PROPS = {
  x: 1,
  y: 1,
  scaleX: 1,
  scaleY: 1,
  originX: 1,
  originY: 1,
  rotation: 1
};
var transformPropNamesStr = keys(TRANSFORM_PROPS).join(', ');
;
var STYLE_VISUAL_TYPE = {
  color: 'fill',
  borderColor: 'stroke'
};
var NON_STYLE_VISUAL_PROPS = {
  symbol: 1,
  symbolSize: 1,
  symbolKeepAspect: 1,
  legendSymbol: 1,
  visualMeta: 1,
  liftZ: 1,
  decal: 1
};
var EMPHASIS = 'emphasis';
var NORMAL = 'normal';
var BLUR = 'blur';
var SELECT = 'select';
var STATES = [NORMAL, EMPHASIS, BLUR, SELECT];
var PATH_ITEM_STYLE = {
  normal: ['itemStyle'],
  emphasis: [EMPHASIS, 'itemStyle'],
  blur: [BLUR, 'itemStyle'],
  select: [SELECT, 'itemStyle']
};
var PATH_LABEL = {
  normal: ['label'],
  emphasis: [EMPHASIS, 'label'],
  blur: [BLUR, 'label'],
  select: [SELECT, 'label']
};
var GROUP_DIFF_PREFIX = 'e\0\0';
var attachedTxInfoTmp = {
  normal: {},
  emphasis: {},
  blur: {},
  select: {}
};
var LEGACY_TRANSFORM_PROPS = {
  position: ['x', 'y'],
  scale: ['scaleX', 'scaleY'],
  origin: ['originX', 'originY']
};
var tmpTransformable = new Transformable();
var prepareCustoms = {
  cartesian2d: prepareCartesian2d,
  geo: prepareGeo,
  singleAxis: prepareSingleAxis,
  polar: preparePolar,
  calendar: prepareCalendar
};

var CustomSeriesModel = function (_super) {
  __extends(CustomSeriesModel, _super);

  function CustomSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = CustomSeriesModel.type;
    return _this;
  }

  CustomSeriesModel.prototype.optionUpdated = function () {
    this.currentZLevel = this.get('zlevel', true);
    this.currentZ = this.get('z', true);
  };

  CustomSeriesModel.prototype.getInitialData = function (option, ecModel) {
    return createListFromArray(this.getSource(), this);
  };

  CustomSeriesModel.prototype.getDataParams = function (dataIndex, dataType, el) {
    var params = _super.prototype.getDataParams.call(this, dataIndex, dataType);

    el && (params.info = inner(el).info);
    return params;
  };

  CustomSeriesModel.type = 'series.custom';
  CustomSeriesModel.dependencies = ['grid', 'polar', 'geo', 'singleAxis', 'calendar'];
  CustomSeriesModel.defaultOption = {
    coordinateSystem: 'cartesian2d',
    zlevel: 0,
    z: 2,
    legendHoverLink: true,
    clip: false
  };
  return CustomSeriesModel;
}(SeriesModel);

ComponentModel.registerClass(CustomSeriesModel);

var CustomSeriesView = function (_super) {
  __extends(CustomSeriesView, _super);

  function CustomSeriesView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = CustomSeriesView.type;
    return _this;
  }

  CustomSeriesView.prototype.render = function (customSeries, ecModel, api, payload) {
    var oldData = this._data;
    var data = customSeries.getData();
    var group = this.group;
    var renderItem = makeRenderItem(customSeries, data, ecModel, api);
    var transOpt = customSeries.__transientTransitionOpt;

    if (transOpt && (transOpt.from == null || transOpt.to == null)) {
      oldData && oldData.each(function (oldIdx) {
        doRemoveEl(oldData.getItemGraphicEl(oldIdx), customSeries, group);
      });
      data.each(function (newIdx) {
        createOrUpdateItem(api, null, newIdx, renderItem(newIdx, payload), customSeries, group, data, null);
      });
    } else {
      var morphPreparation_1 = new MorphPreparation(customSeries, transOpt);
      var diffMode = transOpt ? 'multiple' : 'oneToOne';
      new DataDiffer(oldData ? oldData.getIndices() : [], data.getIndices(), createGetKey(oldData, diffMode, transOpt && transOpt.from), createGetKey(data, diffMode, transOpt && transOpt.to), null, diffMode).add(function (newIdx) {
        createOrUpdateItem(api, null, newIdx, renderItem(newIdx, payload), customSeries, group, data, null);
      }).remove(function (oldIdx) {
        doRemoveEl(oldData.getItemGraphicEl(oldIdx), customSeries, group);
      }).update(function (newIdx, oldIdx) {
        morphPreparation_1.reset('oneToOne');
        var oldEl = oldData.getItemGraphicEl(oldIdx);
        morphPreparation_1.findAndAddFrom(oldEl);

        if (morphPreparation_1.hasFrom()) {
          removeElementDirectly(oldEl, group);
          oldEl = null;
        }

        createOrUpdateItem(api, oldEl, newIdx, renderItem(newIdx, payload), customSeries, group, data, morphPreparation_1);
        morphPreparation_1.applyMorphing();
      }).updateManyToOne(function (newIdx, oldIndices) {
        morphPreparation_1.reset('manyToOne');

        for (var i = 0; i < oldIndices.length; i++) {
          var oldEl = oldData.getItemGraphicEl(oldIndices[i]);
          morphPreparation_1.findAndAddFrom(oldEl);
          removeElementDirectly(oldEl, group);
        }

        createOrUpdateItem(api, null, newIdx, renderItem(newIdx, payload), customSeries, group, data, morphPreparation_1);
        morphPreparation_1.applyMorphing();
      }).updateOneToMany(function (newIndices, oldIdx) {
        morphPreparation_1.reset('oneToMany');
        var newLen = newIndices.length;
        var oldEl = oldData.getItemGraphicEl(oldIdx);
        morphPreparation_1.findAndAddFrom(oldEl);
        removeElementDirectly(oldEl, group);

        for (var i = 0; i < newLen; i++) {
          createOrUpdateItem(api, null, newIndices[i], renderItem(newIndices[i], payload), customSeries, group, data, morphPreparation_1);
        }

        morphPreparation_1.applyMorphing();
      }).execute();
    }

    var clipPath = customSeries.get('clip', true) ? createClipPath(customSeries.coordinateSystem, false, customSeries) : null;

    if (clipPath) {
      group.setClipPath(clipPath);
    } else {
      group.removeClipPath();
    }

    this._data = data;
  };

  CustomSeriesView.prototype.incrementalPrepareRender = function (customSeries, ecModel, api) {
    this.group.removeAll();
    this._data = null;
  };

  CustomSeriesView.prototype.incrementalRender = function (params, customSeries, ecModel, api, payload) {
    var data = customSeries.getData();
    var renderItem = makeRenderItem(customSeries, data, ecModel, api);

    function setIncrementalAndHoverLayer(el) {
      if (!el.isGroup) {
        el.incremental = true;
        el.ensureState('emphasis').hoverLayer = true;
      }
    }

    for (var idx = params.start; idx < params.end; idx++) {
      var el = createOrUpdateItem(null, null, idx, renderItem(idx, payload), customSeries, this.group, data, null);
      el.traverse(setIncrementalAndHoverLayer);
    }
  };

  CustomSeriesView.prototype.filterForExposedEvent = function (eventType, query, targetEl, packedEvent) {
    var elementName = query.element;

    if (elementName == null || targetEl.name === elementName) {
      return true;
    }

    while ((targetEl = targetEl.__hostTarget || targetEl.parent) && targetEl !== this.group) {
      if (targetEl.name === elementName) {
        return true;
      }
    }

    return false;
  };

  CustomSeriesView.type = 'custom';
  return CustomSeriesView;
}(ChartView);

ChartView.registerClass(CustomSeriesView);

function createGetKey(data, diffMode, dimension) {
  if (!data) {
    return;
  }

  if (diffMode === 'oneToOne') {
    return function (rawIdx, dataIndex) {
      return data.getId(dataIndex);
    };
  }

  var diffByDimName = data.getDimension(dimension);
  var dimInfo = data.getDimensionInfo(diffByDimName);

  if (!dimInfo) {
    var errMsg = '';

    if (process.env.NODE_ENV !== 'production') {
      errMsg = dimension + " is not a valid dimension.";
    }

    throwError(errMsg);
  }

  var ordinalMeta = dimInfo.ordinalMeta;
  return function (rawIdx, dataIndex) {
    var key = data.get(diffByDimName, dataIndex);

    if (ordinalMeta) {
      key = ordinalMeta.categories[key];
    }

    return key == null || eqNaN(key) ? rawIdx + '' : '_ec_' + key;
  };
}

function createEl(elOption) {
  var graphicType = elOption.type;
  var el;

  if (graphicType === 'path') {
    var shape = elOption.shape;
    var pathRect = shape.width != null && shape.height != null ? {
      x: shape.x || 0,
      y: shape.y || 0,
      width: shape.width,
      height: shape.height
    } : null;
    var pathData = getPathData(shape);
    el = graphicUtil.makePath(pathData, null, pathRect, shape.layout || 'center');
    inner(el).customPathData = pathData;
  } else if (graphicType === 'image') {
    el = new graphicUtil.Image({});
    inner(el).customImagePath = elOption.style.image;
  } else if (graphicType === 'text') {
    el = new graphicUtil.Text({});
  } else if (graphicType === 'group') {
    el = new graphicUtil.Group();
  } else if (graphicType === 'compoundPath') {
    throw new Error('"compoundPath" is not supported yet.');
  } else {
    var Clz = graphicUtil.getShapeClass(graphicType);

    if (!Clz) {
      var errMsg = '';

      if (process.env.NODE_ENV !== 'production') {
        errMsg = 'graphic type "' + graphicType + '" can not be found.';
      }

      throwError(errMsg);
    }

    el = new Clz();
  }

  inner(el).customGraphicType = graphicType;
  el.name = elOption.name;
  el.z2EmphasisLift = 1;
  el.z2SelectLift = 1;
  return el;
}

function updateElNormal(api, el, isMorphTo, dataIndex, elOption, styleOpt, attachedTxInfo, seriesModel, isInit, isTextContent) {
  var transFromProps = {};
  var allPropsFinal = {};
  var elDisplayable = el.isGroup ? null : el;
  !isMorphTo && prepareShapeOrExtraTransitionFrom('shape', el, null, elOption, transFromProps, isInit);
  prepareShapeOrExtraAllPropsFinal('shape', elOption, allPropsFinal);
  !isMorphTo && prepareShapeOrExtraTransitionFrom('extra', el, null, elOption, transFromProps, isInit);
  prepareShapeOrExtraAllPropsFinal('extra', elOption, allPropsFinal);
  !isMorphTo && prepareTransformTransitionFrom(el, null, elOption, transFromProps, isInit);
  prepareTransformAllPropsFinal(elOption, allPropsFinal);
  var txCfgOpt = attachedTxInfo && attachedTxInfo.normal.cfg;

  if (txCfgOpt) {
    el.setTextConfig(txCfgOpt);
  }

  if (el.type === 'text' && styleOpt) {
    var textOptionStyle = styleOpt;
    hasOwn(textOptionStyle, 'textFill') && (textOptionStyle.fill = textOptionStyle.textFill);
    hasOwn(textOptionStyle, 'textStroke') && (textOptionStyle.stroke = textOptionStyle.textStroke);
  }

  if (styleOpt) {
    var decalPattern = void 0;
    var decalObj = isPath(el) ? styleOpt.decal : null;

    if (api && decalObj) {
      decalObj.dirty = true;
      decalPattern = createOrUpdatePatternFromDecal(decalObj, api);
    }

    styleOpt.__decalPattern = decalPattern;
  }

  !isMorphTo && prepareStyleTransitionFrom(el, null, elOption, styleOpt, transFromProps, isInit);

  if (elDisplayable) {
    hasOwn(elOption, 'invisible') && (elDisplayable.invisible = elOption.invisible);
  }

  if (!isMorphTo) {
    applyPropsFinal(el, allPropsFinal, styleOpt);
    applyTransitionFrom(el, dataIndex, elOption, seriesModel, transFromProps, isInit);
  }

  hasOwn(elOption, 'silent') && (el.silent = elOption.silent);
  hasOwn(elOption, 'ignore') && (el.ignore = elOption.ignore);

  if (!isTextContent) {
    hasOwn(elOption, 'info') && (inner(el).info = elOption.info);
  }

  styleOpt ? el.dirty() : el.markRedraw();
  return isMorphTo ? allPropsFinal : null;
}

function applyPropsFinal(el, allPropsFinal, styleOpt) {
  var elDisplayable = el.isGroup ? null : el;

  if (elDisplayable && styleOpt) {
    var decalPattern = styleOpt.__decalPattern;
    var originalDecalObj = void 0;

    if (decalPattern) {
      originalDecalObj = styleOpt.decal;
      styleOpt.decal = decalPattern;
    }

    elDisplayable.useStyle(styleOpt);

    if (decalPattern) {
      styleOpt.decal = originalDecalObj;
    }

    var animators = elDisplayable.animators;

    for (var i = 0; i < animators.length; i++) {
      var animator = animators[i];

      if (animator.targetName === 'style') {
        animator.changeTarget(elDisplayable.style);
      }
    }
  }

  allPropsFinal && el.attr(allPropsFinal);
}

function applyTransitionFrom(el, dataIndex, elOption, seriesModel, transFromProps, isInit) {
  if (transFromProps) {
    var userDuring = elOption.during;
    inner(el).userDuring = userDuring;
    var cfgDuringCall = userDuring ? bind(duringCall, {
      el: el,
      userDuring: userDuring
    }) : null;
    var cfg = {
      dataIndex: dataIndex,
      isFrom: true,
      during: cfgDuringCall
    };
    isInit ? graphicUtil.initProps(el, transFromProps, seriesModel, cfg) : graphicUtil.updateProps(el, transFromProps, seriesModel, cfg);
  }
}

function prepareShapeOrExtraTransitionFrom(mainAttr, el, morphFromEl, elOption, transFromProps, isInit) {
  var attrOpt = elOption[mainAttr];

  if (!attrOpt) {
    return;
  }

  var elPropsInAttr = el[mainAttr];
  var transFromPropsInAttr;
  var enterFrom = attrOpt.enterFrom;

  if (isInit && enterFrom) {
    !transFromPropsInAttr && (transFromPropsInAttr = transFromProps[mainAttr] = {});
    var enterFromKeys = keys(enterFrom);

    for (var i = 0; i < enterFromKeys.length; i++) {
      var key = enterFromKeys[i];
      transFromPropsInAttr[key] = enterFrom[key];
    }
  }

  if (!isInit && elPropsInAttr && !(morphFromEl != null && mainAttr === 'shape')) {
    if (attrOpt.transition) {
      !transFromPropsInAttr && (transFromPropsInAttr = transFromProps[mainAttr] = {});
      var transitionKeys = normalizeToArray(attrOpt.transition);

      for (var i = 0; i < transitionKeys.length; i++) {
        var key = transitionKeys[i];
        var elVal = elPropsInAttr[key];

        if (process.env.NODE_ENV !== 'production') {
          checkNonStyleTansitionRefer(key, attrOpt[key], elVal);
        }

        transFromPropsInAttr[key] = elVal;
      }
    } else if (indexOf(elOption.transition, mainAttr) >= 0) {
      !transFromPropsInAttr && (transFromPropsInAttr = transFromProps[mainAttr] = {});
      var elPropsInAttrKeys = keys(elPropsInAttr);

      for (var i = 0; i < elPropsInAttrKeys.length; i++) {
        var key = elPropsInAttrKeys[i];
        var elVal = elPropsInAttr[key];

        if (isNonStyleTransitionEnabled(attrOpt[key], elVal)) {
          transFromPropsInAttr[key] = elVal;
        }
      }
    }
  }

  var leaveTo = attrOpt.leaveTo;

  if (leaveTo) {
    var leaveToProps = getOrCreateLeaveToPropsFromEl(el);
    var leaveToPropsInAttr = leaveToProps[mainAttr] || (leaveToProps[mainAttr] = {});
    var leaveToKeys = keys(leaveTo);

    for (var i = 0; i < leaveToKeys.length; i++) {
      var key = leaveToKeys[i];
      leaveToPropsInAttr[key] = leaveTo[key];
    }
  }
}

function prepareShapeOrExtraAllPropsFinal(mainAttr, elOption, allProps) {
  var attrOpt = elOption[mainAttr];

  if (!attrOpt) {
    return;
  }

  var allPropsInAttr = allProps[mainAttr] = {};
  var keysInAttr = keys(attrOpt);

  for (var i = 0; i < keysInAttr.length; i++) {
    var key = keysInAttr[i];
    allPropsInAttr[key] = cloneValue(attrOpt[key]);
  }
}

function prepareTransformTransitionFrom(el, morphFromEl, elOption, transFromProps, isInit) {
  var enterFrom = elOption.enterFrom;

  if (isInit && enterFrom) {
    var enterFromKeys = keys(enterFrom);

    for (var i = 0; i < enterFromKeys.length; i++) {
      var key = enterFromKeys[i];

      if (process.env.NODE_ENV !== 'production') {
        checkTransformPropRefer(key, 'el.enterFrom');
      }

      transFromProps[key] = enterFrom[key];
    }
  }

  if (!isInit) {
    if (morphFromEl) {
      var fromTransformable = calcOldElLocalTransformBasedOnNewElParent(morphFromEl, el);
      setTransformPropToTransitionFrom(transFromProps, 'x', fromTransformable);
      setTransformPropToTransitionFrom(transFromProps, 'y', fromTransformable);
      setTransformPropToTransitionFrom(transFromProps, 'scaleX', fromTransformable);
      setTransformPropToTransitionFrom(transFromProps, 'scaleY', fromTransformable);
      setTransformPropToTransitionFrom(transFromProps, 'originX', fromTransformable);
      setTransformPropToTransitionFrom(transFromProps, 'originY', fromTransformable);
      setTransformPropToTransitionFrom(transFromProps, 'rotation', fromTransformable);
    } else if (elOption.transition) {
      var transitionKeys = normalizeToArray(elOption.transition);

      for (var i = 0; i < transitionKeys.length; i++) {
        var key = transitionKeys[i];

        if (key === 'style' || key === 'shape' || key === 'extra') {
          continue;
        }

        var elVal = el[key];

        if (process.env.NODE_ENV !== 'production') {
          checkTransformPropRefer(key, 'el.transition');
          checkNonStyleTansitionRefer(key, elOption[key], elVal);
        }

        transFromProps[key] = elVal;
      }
    } else {
      setTransformPropToTransitionFrom(transFromProps, 'x', el);
      setTransformPropToTransitionFrom(transFromProps, 'y', el);
    }
  }

  var leaveTo = elOption.leaveTo;

  if (leaveTo) {
    var leaveToProps = getOrCreateLeaveToPropsFromEl(el);
    var leaveToKeys = keys(leaveTo);

    for (var i = 0; i < leaveToKeys.length; i++) {
      var key = leaveToKeys[i];

      if (process.env.NODE_ENV !== 'production') {
        checkTransformPropRefer(key, 'el.leaveTo');
      }

      leaveToProps[key] = leaveTo[key];
    }
  }
}

function prepareTransformAllPropsFinal(elOption, allProps) {
  setLagecyTransformProp(elOption, allProps, 'position');
  setLagecyTransformProp(elOption, allProps, 'scale');
  setLagecyTransformProp(elOption, allProps, 'origin');
  setTransformProp(elOption, allProps, 'x');
  setTransformProp(elOption, allProps, 'y');
  setTransformProp(elOption, allProps, 'scaleX');
  setTransformProp(elOption, allProps, 'scaleY');
  setTransformProp(elOption, allProps, 'originX');
  setTransformProp(elOption, allProps, 'originY');
  setTransformProp(elOption, allProps, 'rotation');
}

function prepareStyleTransitionFrom(el, morphFromEl, elOption, styleOpt, transFromProps, isInit) {
  if (!styleOpt) {
    return;
  }

  var fromEl = morphFromEl || el;
  var fromElStyle = fromEl.style;
  var transFromStyleProps;
  var enterFrom = styleOpt.enterFrom;

  if (isInit && enterFrom) {
    var enterFromKeys = keys(enterFrom);
    !transFromStyleProps && (transFromStyleProps = transFromProps.style = {});

    for (var i = 0; i < enterFromKeys.length; i++) {
      var key = enterFromKeys[i];
      transFromStyleProps[key] = enterFrom[key];
    }
  }

  if (!isInit && fromElStyle) {
    if (styleOpt.transition) {
      var transitionKeys = normalizeToArray(styleOpt.transition);
      !transFromStyleProps && (transFromStyleProps = transFromProps.style = {});

      for (var i = 0; i < transitionKeys.length; i++) {
        var key = transitionKeys[i];
        var elVal = fromElStyle[key];
        transFromStyleProps[key] = elVal;
      }
    } else if (el.getAnimationStyleProps && indexOf(elOption.transition, 'style') >= 0) {
      var animationProps = el.getAnimationStyleProps();
      var animationStyleProps = animationProps ? animationProps.style : null;

      if (animationStyleProps) {
        !transFromStyleProps && (transFromStyleProps = transFromProps.style = {});
        var styleKeys = keys(styleOpt);

        for (var i = 0; i < styleKeys.length; i++) {
          var key = styleKeys[i];

          if (animationStyleProps[key]) {
            var elVal = fromElStyle[key];
            transFromStyleProps[key] = elVal;
          }
        }
      }
    }
  }

  var leaveTo = styleOpt.leaveTo;

  if (leaveTo) {
    var leaveToKeys = keys(leaveTo);
    var leaveToProps = getOrCreateLeaveToPropsFromEl(el);
    var leaveToStyleProps = leaveToProps.style || (leaveToProps.style = {});

    for (var i = 0; i < leaveToKeys.length; i++) {
      var key = leaveToKeys[i];
      leaveToStyleProps[key] = leaveTo[key];
    }
  }
}

function calcOldElLocalTransformBasedOnNewElParent(oldEl, newEl) {
  if (!oldEl || oldEl === newEl || oldEl.parent === newEl.parent) {
    return oldEl;
  }

  var tmpM = tmpTransformable.transform || (tmpTransformable.transform = matrix.identity([]));
  var oldGlobalTransform = oldEl.getComputedTransform();
  oldGlobalTransform ? matrix.copy(tmpM, oldGlobalTransform) : matrix.identity(tmpM);
  var newParent = newEl.parent;

  if (newParent) {
    newParent.getComputedTransform();
  }

  tmpTransformable.originX = oldEl.originX;
  tmpTransformable.originY = oldEl.originY;
  tmpTransformable.parent = newParent;
  tmpTransformable.decomposeTransform();
  return tmpTransformable;
}

var checkNonStyleTansitionRefer;

if (process.env.NODE_ENV !== 'production') {
  checkNonStyleTansitionRefer = function (propName, optVal, elVal) {
    if (!isArrayLike(optVal)) {
      assert(optVal != null && isFinite(optVal), 'Prop `' + propName + '` must refer to a finite number or ArrayLike for transition.');
    } else {
      assert(optVal !== elVal, 'Prop `' + propName + '` must use different Array object each time for transition.');
    }
  };
}

function isNonStyleTransitionEnabled(optVal, elVal) {
  return !isArrayLike(optVal) ? optVal != null && isFinite(optVal) : optVal !== elVal;
}

var checkTransformPropRefer;

if (process.env.NODE_ENV !== 'production') {
  checkTransformPropRefer = function (key, usedIn) {
    assert(hasOwn(TRANSFORM_PROPS, key), 'Prop `' + key + '` is not a permitted in `' + usedIn + '`. ' + 'Only `' + keys(TRANSFORM_PROPS).join('`, `') + '` are permitted.');
  };
}

function getOrCreateLeaveToPropsFromEl(el) {
  var innerEl = inner(el);
  return innerEl.leaveToProps || (innerEl.leaveToProps = {});
}

var tmpDuringScope = {};
var customDuringAPI = {
  setTransform: function (key, val) {
    if (process.env.NODE_ENV !== 'production') {
      assert(hasOwn(TRANSFORM_PROPS, key), 'Only ' + transformPropNamesStr + ' available in `setTransform`.');
    }

    tmpDuringScope.el[key] = val;
    return this;
  },
  getTransform: function (key) {
    if (process.env.NODE_ENV !== 'production') {
      assert(hasOwn(TRANSFORM_PROPS, key), 'Only ' + transformPropNamesStr + ' available in `getTransform`.');
    }

    return tmpDuringScope.el[key];
  },
  setShape: function (key, val) {
    if (process.env.NODE_ENV !== 'production') {
      assertNotReserved(key);
    }

    var shape = tmpDuringScope.el.shape || (tmpDuringScope.el.shape = {});
    shape[key] = val;
    tmpDuringScope.isShapeDirty = true;
    return this;
  },
  getShape: function (key) {
    if (process.env.NODE_ENV !== 'production') {
      assertNotReserved(key);
    }

    var shape = tmpDuringScope.el.shape;

    if (shape) {
      return shape[key];
    }
  },
  setStyle: function (key, val) {
    if (process.env.NODE_ENV !== 'production') {
      assertNotReserved(key);
    }

    var style = tmpDuringScope.el.style;

    if (style) {
      if (process.env.NODE_ENV !== 'production') {
        if (eqNaN(val)) {
          warn('style.' + key + ' must not be assigned with NaN.');
        }
      }

      style[key] = val;
      tmpDuringScope.isStyleDirty = true;
    }

    return this;
  },
  getStyle: function (key) {
    if (process.env.NODE_ENV !== 'production') {
      assertNotReserved(key);
    }

    var style = tmpDuringScope.el.style;

    if (style) {
      return style[key];
    }
  },
  setExtra: function (key, val) {
    if (process.env.NODE_ENV !== 'production') {
      assertNotReserved(key);
    }

    var extra = tmpDuringScope.el.extra || (tmpDuringScope.el.extra = {});
    extra[key] = val;
    return this;
  },
  getExtra: function (key) {
    if (process.env.NODE_ENV !== 'production') {
      assertNotReserved(key);
    }

    var extra = tmpDuringScope.el.extra;

    if (extra) {
      return extra[key];
    }
  }
};

function assertNotReserved(key) {
  if (process.env.NODE_ENV !== 'production') {
    if (key === 'transition' || key === 'enterFrom' || key === 'leaveTo') {
      throw new Error('key must not be "' + key + '"');
    }
  }
}

function duringCall() {
  var scope = this;
  var el = scope.el;

  if (!el) {
    return;
  }

  var newstUserDuring = inner(el).userDuring;
  var scopeUserDuring = scope.userDuring;

  if (newstUserDuring !== scopeUserDuring) {
    scope.el = scope.userDuring = null;
    return;
  }

  tmpDuringScope.el = el;
  tmpDuringScope.isShapeDirty = false;
  tmpDuringScope.isStyleDirty = false;
  scopeUserDuring(customDuringAPI);

  if (tmpDuringScope.isShapeDirty && el.dirtyShape) {
    el.dirtyShape();
  }

  if (tmpDuringScope.isStyleDirty && el.dirtyStyle) {
    el.dirtyStyle();
  }
}

function updateElOnState(state, el, elStateOpt, styleOpt, attachedTxInfo, isRoot, isTextContent) {
  var elDisplayable = el.isGroup ? null : el;
  var txCfgOpt = attachedTxInfo && attachedTxInfo[state].cfg;

  if (elDisplayable) {
    var stateObj = elDisplayable.ensureState(state);

    if (styleOpt === false) {
      var existingEmphasisState = elDisplayable.getState(state);

      if (existingEmphasisState) {
        existingEmphasisState.style = null;
      }
    } else {
      stateObj.style = styleOpt || null;
    }

    if (txCfgOpt) {
      stateObj.textConfig = txCfgOpt;
    }

    setDefaultStateProxy(elDisplayable);
  }
}

function updateZ(el, elOption, seriesModel, attachedTxInfo) {
  if (el.isGroup) {
    return;
  }

  var elDisplayable = el;
  var currentZ = seriesModel.currentZ;
  var currentZLevel = seriesModel.currentZLevel;
  elDisplayable.z = currentZ;
  elDisplayable.zlevel = currentZLevel;
  var optZ2 = elOption.z2;
  optZ2 != null && (elDisplayable.z2 = optZ2 || 0);

  for (var i = 0; i < STATES.length; i++) {
    updateZForEachState(elDisplayable, elOption, STATES[i]);
  }
}

function updateZForEachState(elDisplayable, elOption, state) {
  var isNormal = state === NORMAL;
  var elStateOpt = isNormal ? elOption : retrieveStateOption(elOption, state);
  var optZ2 = elStateOpt ? elStateOpt.z2 : null;
  var stateObj;

  if (optZ2 != null) {
    stateObj = isNormal ? elDisplayable : elDisplayable.ensureState(state);
    stateObj.z2 = optZ2 || 0;
  }
}

function setLagecyTransformProp(elOption, targetProps, legacyName, fromTransformable) {
  var legacyArr = elOption[legacyName];
  var xyName = LEGACY_TRANSFORM_PROPS[legacyName];

  if (legacyArr) {
    if (fromTransformable) {
      targetProps[xyName[0]] = fromTransformable[xyName[0]];
      targetProps[xyName[1]] = fromTransformable[xyName[1]];
    } else {
      targetProps[xyName[0]] = legacyArr[0];
      targetProps[xyName[1]] = legacyArr[1];
    }
  }
}

function setTransformProp(elOption, allProps, name, fromTransformable) {
  if (elOption[name] != null) {
    allProps[name] = fromTransformable ? fromTransformable[name] : elOption[name];
  }
}

function setTransformPropToTransitionFrom(transitionFrom, name, fromTransformable) {
  if (fromTransformable) {
    transitionFrom[name] = fromTransformable[name];
  }
}

function makeRenderItem(customSeries, data, ecModel, api) {
  var renderItem = customSeries.get('renderItem');
  var coordSys = customSeries.coordinateSystem;
  var prepareResult = {};

  if (coordSys) {
    if (process.env.NODE_ENV !== 'production') {
      assert(renderItem, 'series.render is required.');
      assert(coordSys.prepareCustoms || prepareCustoms[coordSys.type], 'This coordSys does not support custom series.');
    }

    prepareResult = coordSys.prepareCustoms ? coordSys.prepareCustoms(coordSys) : prepareCustoms[coordSys.type](coordSys);
  }

  var userAPI = defaults({
    getWidth: api.getWidth,
    getHeight: api.getHeight,
    getZr: api.getZr,
    getDevicePixelRatio: api.getDevicePixelRatio,
    value: value,
    style: style,
    ordinalRawValue: ordinalRawValue,
    styleEmphasis: styleEmphasis,
    visual: visual,
    barLayout: barLayout,
    currentSeriesIndices: currentSeriesIndices,
    font: font
  }, prepareResult.api || {});
  var userParams = {
    context: {},
    seriesId: customSeries.id,
    seriesName: customSeries.name,
    seriesIndex: customSeries.seriesIndex,
    coordSys: prepareResult.coordSys,
    dataInsideLength: data.count(),
    encode: wrapEncodeDef(customSeries.getData())
  };
  var currDataIndexInside;
  var currItemModel;
  var currItemStyleModels = {};
  var currLabelModels = {};
  var seriesItemStyleModels = {};
  var seriesLabelModels = {};

  for (var i = 0; i < STATES.length; i++) {
    var stateName = STATES[i];
    seriesItemStyleModels[stateName] = customSeries.getModel(PATH_ITEM_STYLE[stateName]);
    seriesLabelModels[stateName] = customSeries.getModel(PATH_LABEL[stateName]);
  }

  function getItemModel(dataIndexInside) {
    return dataIndexInside === currDataIndexInside ? currItemModel || (currItemModel = data.getItemModel(dataIndexInside)) : data.getItemModel(dataIndexInside);
  }

  function getItemStyleModel(dataIndexInside, state) {
    return !data.hasItemOption ? seriesItemStyleModels[state] : dataIndexInside === currDataIndexInside ? currItemStyleModels[state] || (currItemStyleModels[state] = getItemModel(dataIndexInside).getModel(PATH_ITEM_STYLE[state])) : getItemModel(dataIndexInside).getModel(PATH_ITEM_STYLE[state]);
  }

  function getLabelModel(dataIndexInside, state) {
    return !data.hasItemOption ? seriesLabelModels[state] : dataIndexInside === currDataIndexInside ? currLabelModels[state] || (currLabelModels[state] = getItemModel(dataIndexInside).getModel(PATH_LABEL[state])) : getItemModel(dataIndexInside).getModel(PATH_LABEL[state]);
  }

  return function (dataIndexInside, payload) {
    currDataIndexInside = dataIndexInside;
    currItemModel = null;
    currItemStyleModels = {};
    currLabelModels = {};
    return renderItem && renderItem(defaults({
      dataIndexInside: dataIndexInside,
      dataIndex: data.getRawIndex(dataIndexInside),
      actionType: payload ? payload.type : null
    }, userParams), userAPI);
  };

  function value(dim, dataIndexInside) {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    return data.get(data.getDimension(dim || 0), dataIndexInside);
  }

  function ordinalRawValue(dim, dataIndexInside) {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    var dimInfo = data.getDimensionInfo(dim || 0);

    if (!dimInfo) {
      return;
    }

    var val = data.get(dimInfo.name, dataIndexInside);
    var ordinalMeta = dimInfo && dimInfo.ordinalMeta;
    return ordinalMeta ? ordinalMeta.categories[val] : val;
  }

  function style(userProps, dataIndexInside) {
    if (process.env.NODE_ENV !== 'production') {
      warnDeprecated('api.style', 'Please write literal style directly instead.');
    }

    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    var style = data.getItemVisual(dataIndexInside, 'style');
    var visualColor = style && style.fill;
    var opacity = style && style.opacity;
    var itemStyle = getItemStyleModel(dataIndexInside, NORMAL).getItemStyle();
    visualColor != null && (itemStyle.fill = visualColor);
    opacity != null && (itemStyle.opacity = opacity);
    var opt = {
      inheritColor: isString(visualColor) ? visualColor : '#000'
    };
    var labelModel = getLabelModel(dataIndexInside, NORMAL);
    var textStyle = labelStyleHelper.createTextStyle(labelModel, null, opt, false, true);
    textStyle.text = labelModel.getShallow('show') ? retrieve2(customSeries.getFormattedLabel(dataIndexInside, NORMAL), getDefaultLabel(data, dataIndexInside)) : null;
    var textConfig = labelStyleHelper.createTextConfig(labelModel, opt, false);
    preFetchFromExtra(userProps, itemStyle);
    itemStyle = convertToEC4StyleForCustomSerise(itemStyle, textStyle, textConfig);
    userProps && applyUserPropsAfter(itemStyle, userProps);
    itemStyle.legacy = true;
    return itemStyle;
  }

  function styleEmphasis(userProps, dataIndexInside) {
    if (process.env.NODE_ENV !== 'production') {
      warnDeprecated('api.styleEmphasis', 'Please write literal style directly instead.');
    }

    dataIndexInside == null && (dataIndexInside = currDataIndexInside);
    var itemStyle = getItemStyleModel(dataIndexInside, EMPHASIS).getItemStyle();
    var labelModel = getLabelModel(dataIndexInside, EMPHASIS);
    var textStyle = labelStyleHelper.createTextStyle(labelModel, null, null, true, true);
    textStyle.text = labelModel.getShallow('show') ? retrieve3(customSeries.getFormattedLabel(dataIndexInside, EMPHASIS), customSeries.getFormattedLabel(dataIndexInside, NORMAL), getDefaultLabel(data, dataIndexInside)) : null;
    var textConfig = labelStyleHelper.createTextConfig(labelModel, null, true);
    preFetchFromExtra(userProps, itemStyle);
    itemStyle = convertToEC4StyleForCustomSerise(itemStyle, textStyle, textConfig);
    userProps && applyUserPropsAfter(itemStyle, userProps);
    itemStyle.legacy = true;
    return itemStyle;
  }

  function applyUserPropsAfter(itemStyle, extra) {
    for (var key in extra) {
      if (hasOwn(extra, key)) {
        itemStyle[key] = extra[key];
      }
    }
  }

  function preFetchFromExtra(extra, itemStyle) {
    if (extra) {
      extra.textFill && (itemStyle.textFill = extra.textFill);
      extra.textPosition && (itemStyle.textPosition = extra.textPosition);
    }
  }

  function visual(visualType, dataIndexInside) {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside);

    if (hasOwn(STYLE_VISUAL_TYPE, visualType)) {
      var style_1 = data.getItemVisual(dataIndexInside, 'style');
      return style_1 ? style_1[STYLE_VISUAL_TYPE[visualType]] : null;
    }

    if (hasOwn(NON_STYLE_VISUAL_PROPS, visualType)) {
      return data.getItemVisual(dataIndexInside, visualType);
    }
  }

  function barLayout(opt) {
    if (coordSys.type === 'cartesian2d') {
      var baseAxis = coordSys.getBaseAxis();
      return getLayoutOnAxis(defaults({
        axis: baseAxis
      }, opt));
    }
  }

  function currentSeriesIndices() {
    return ecModel.getCurrentSeriesIndices();
  }

  function font(opt) {
    return labelStyleHelper.getFont(opt, ecModel);
  }
}

function wrapEncodeDef(data) {
  var encodeDef = {};
  each(data.dimensions, function (dimName, dataDimIndex) {
    var dimInfo = data.getDimensionInfo(dimName);

    if (!dimInfo.isExtraCoord) {
      var coordDim = dimInfo.coordDim;
      var dataDims = encodeDef[coordDim] = encodeDef[coordDim] || [];
      dataDims[dimInfo.coordDimIndex] = dataDimIndex;
    }
  });
  return encodeDef;
}

function createOrUpdateItem(api, el, dataIndex, elOption, seriesModel, group, data, morphPreparation) {
  if (!elOption) {
    removeElementDirectly(el, group);
    return;
  }

  el = doCreateOrUpdateEl(api, el, dataIndex, elOption, seriesModel, group, true, morphPreparation);
  el && data.setItemGraphicEl(dataIndex, el);
  enableHoverEmphasis(el, elOption.focus, elOption.blurScope);
  return el;
}

function doCreateOrUpdateEl(api, el, dataIndex, elOption, seriesModel, group, isRoot, morphPreparation) {
  if (process.env.NODE_ENV !== 'production') {
    assert(elOption, 'should not have an null/undefined element setting');
  }

  var toBeReplacedIdx = -1;

  if (el && doesElNeedRecreate(el, elOption)) {
    toBeReplacedIdx = group.childrenRef().indexOf(el);
    el = null;
  }

  var elIsNewCreated = !el;

  if (!el) {
    el = createEl(elOption);
  } else {
    el.clearStates();
  }

  var canMorph = inner(el).canMorph = elOption.morph && isPath(el);
  var thisElIsMorphTo = canMorph && morphPreparation && morphPreparation.hasFrom();
  var isInit = elIsNewCreated && !thisElIsMorphTo;
  attachedTxInfoTmp.normal.cfg = attachedTxInfoTmp.normal.conOpt = attachedTxInfoTmp.emphasis.cfg = attachedTxInfoTmp.emphasis.conOpt = attachedTxInfoTmp.blur.cfg = attachedTxInfoTmp.blur.conOpt = attachedTxInfoTmp.select.cfg = attachedTxInfoTmp.select.conOpt = null;
  attachedTxInfoTmp.isLegacy = false;
  doCreateOrUpdateAttachedTx(el, dataIndex, elOption, seriesModel, isInit, attachedTxInfoTmp);
  doCreateOrUpdateClipPath(el, dataIndex, elOption, seriesModel, isInit);
  var pendingAllPropsFinal = updateElNormal(api, el, thisElIsMorphTo, dataIndex, elOption, elOption.style, attachedTxInfoTmp, seriesModel, isInit, false);

  if (thisElIsMorphTo) {
    morphPreparation.addTo(el, elOption, dataIndex, pendingAllPropsFinal);
  }

  for (var i = 0; i < STATES.length; i++) {
    var stateName = STATES[i];

    if (stateName !== NORMAL) {
      var otherStateOpt = retrieveStateOption(elOption, stateName);
      var otherStyleOpt = retrieveStyleOptionOnState(elOption, otherStateOpt, stateName);
      updateElOnState(stateName, el, otherStateOpt, otherStyleOpt, attachedTxInfoTmp, isRoot, false);
    }
  }

  updateZ(el, elOption, seriesModel, attachedTxInfoTmp);

  if (elOption.type === 'group') {
    mergeChildren(api, el, dataIndex, elOption, seriesModel, morphPreparation);
  }

  if (toBeReplacedIdx >= 0) {
    group.replaceAt(el, toBeReplacedIdx);
  } else {
    group.add(el);
  }

  return el;
}

function doesElNeedRecreate(el, elOption) {
  var elInner = inner(el);
  var elOptionType = elOption.type;
  var elOptionShape = elOption.shape;
  var elOptionStyle = elOption.style;
  return elOptionType != null && elOptionType !== elInner.customGraphicType || elOptionType === 'path' && hasOwnPathData(elOptionShape) && getPathData(elOptionShape) !== elInner.customPathData || elOptionType === 'image' && hasOwn(elOptionStyle, 'image') && elOptionStyle.image !== elInner.customImagePath;
}

function doCreateOrUpdateClipPath(el, dataIndex, elOption, seriesModel, isInit) {
  var clipPathOpt = elOption.clipPath;

  if (clipPathOpt === false) {
    if (el && el.getClipPath()) {
      el.removeClipPath();
    }
  } else if (clipPathOpt) {
    var clipPath = el.getClipPath();

    if (clipPath && doesElNeedRecreate(clipPath, clipPathOpt)) {
      clipPath = null;
    }

    if (!clipPath) {
      clipPath = createEl(clipPathOpt);

      if (process.env.NODE_ENV !== 'production') {
        assert(clipPath instanceof graphicUtil.Path, 'Only any type of `path` can be used in `clipPath`, rather than ' + clipPath.type + '.');
      }

      el.setClipPath(clipPath);
    }

    updateElNormal(null, clipPath, null, dataIndex, clipPathOpt, null, null, seriesModel, isInit, false);
  }
}

function doCreateOrUpdateAttachedTx(el, dataIndex, elOption, seriesModel, isInit, attachedTxInfo) {
  if (el.isGroup) {
    return;
  }

  processTxInfo(elOption, null, attachedTxInfo);
  processTxInfo(elOption, EMPHASIS, attachedTxInfo);
  var txConOptNormal = attachedTxInfo.normal.conOpt;
  var txConOptEmphasis = attachedTxInfo.emphasis.conOpt;
  var txConOptBlur = attachedTxInfo.blur.conOpt;
  var txConOptSelect = attachedTxInfo.select.conOpt;

  if (txConOptNormal != null || txConOptEmphasis != null || txConOptSelect != null || txConOptBlur != null) {
    var textContent = el.getTextContent();

    if (txConOptNormal === false) {
      textContent && el.removeTextContent();
    } else {
      txConOptNormal = attachedTxInfo.normal.conOpt = txConOptNormal || {
        type: 'text'
      };

      if (!textContent) {
        textContent = createEl(txConOptNormal);
        el.setTextContent(textContent);
      } else {
        textContent.clearStates();
      }

      var txConStlOptNormal = txConOptNormal && txConOptNormal.style;
      updateElNormal(null, textContent, null, dataIndex, txConOptNormal, txConStlOptNormal, null, seriesModel, isInit, true);

      for (var i = 0; i < STATES.length; i++) {
        var stateName = STATES[i];

        if (stateName !== NORMAL) {
          var txConOptOtherState = attachedTxInfo[stateName].conOpt;
          updateElOnState(stateName, textContent, txConOptOtherState, retrieveStyleOptionOnState(txConOptNormal, txConOptOtherState, stateName), null, false, true);
        }
      }

      txConStlOptNormal ? textContent.dirty() : textContent.markRedraw();
    }
  }
}

function processTxInfo(elOption, state, attachedTxInfo) {
  var stateOpt = !state ? elOption : retrieveStateOption(elOption, state);
  var styleOpt = !state ? elOption.style : retrieveStyleOptionOnState(elOption, stateOpt, EMPHASIS);
  var elType = elOption.type;
  var txCfg = stateOpt ? stateOpt.textConfig : null;
  var txConOptNormal = elOption.textContent;
  var txConOpt = !txConOptNormal ? null : !state ? txConOptNormal : retrieveStateOption(txConOptNormal, state);

  if (styleOpt && (attachedTxInfo.isLegacy || isEC4CompatibleStyle(styleOpt, elType, !!txCfg, !!txConOpt))) {
    attachedTxInfo.isLegacy = true;
    var convertResult = convertFromEC4CompatibleStyle(styleOpt, elType, !state);

    if (!txCfg && convertResult.textConfig) {
      txCfg = convertResult.textConfig;
    }

    if (!txConOpt && convertResult.textContent) {
      txConOpt = convertResult.textContent;
    }
  }

  if (!state && txConOpt) {
    var txConOptNormal_1 = txConOpt;
    !txConOptNormal_1.type && (txConOptNormal_1.type = 'text');

    if (process.env.NODE_ENV !== 'production') {
      txConOptNormal_1.type !== 'text' && assert(txConOptNormal_1.type === 'text', 'textContent.type must be "text"');
    }
  }

  var info = !state ? attachedTxInfo.normal : attachedTxInfo[state];
  info.cfg = txCfg;
  info.conOpt = txConOpt;
}

function retrieveStateOption(elOption, state) {
  return !state ? elOption : elOption ? elOption[state] : null;
}

function retrieveStyleOptionOnState(stateOptionNormal, stateOption, state) {
  var style = stateOption && stateOption.style;

  if (style == null && state === EMPHASIS && stateOptionNormal) {
    style = stateOptionNormal.styleEmphasis;
  }

  return style;
}

function mergeChildren(api, el, dataIndex, elOption, seriesModel, morphPreparation) {
  var newChildren = elOption.children;
  var newLen = newChildren ? newChildren.length : 0;
  var mergeChildren = elOption.$mergeChildren;
  var byName = mergeChildren === 'byName' || elOption.diffChildrenByName;
  var notMerge = mergeChildren === false;

  if (!newLen && !byName && !notMerge) {
    return;
  }

  if (byName) {
    diffGroupChildren({
      api: api,
      oldChildren: el.children() || [],
      newChildren: newChildren || [],
      dataIndex: dataIndex,
      seriesModel: seriesModel,
      group: el,
      morphPreparation: morphPreparation
    });
    return;
  }

  notMerge && el.removeAll();
  var index = 0;

  for (; index < newLen; index++) {
    newChildren[index] && doCreateOrUpdateEl(api, el.childAt(index), dataIndex, newChildren[index], seriesModel, el, false, morphPreparation);
  }

  for (var i = el.childCount() - 1; i >= index; i--) {
    doRemoveEl(el.childAt(i), seriesModel, el);
  }
}

function diffGroupChildren(context) {
  new DataDiffer(context.oldChildren, context.newChildren, getKey, getKey, context).add(processAddUpdate).update(processAddUpdate).remove(processRemove).execute();
}

function getKey(item, idx) {
  var name = item && item.name;
  return name != null ? name : GROUP_DIFF_PREFIX + idx;
}

function processAddUpdate(newIndex, oldIndex) {
  var context = this.context;
  var childOption = newIndex != null ? context.newChildren[newIndex] : null;
  var child = oldIndex != null ? context.oldChildren[oldIndex] : null;
  doCreateOrUpdateEl(context.api, child, context.dataIndex, childOption, context.seriesModel, context.group, false, context.morphPreparation);
}

function processRemove(oldIndex) {
  var context = this.context;
  var child = context.oldChildren[oldIndex];
  doRemoveEl(child, context.seriesModel, context.group);
}

function doRemoveEl(el, seriesModel, group) {
  if (el) {
    var leaveToProps = inner(el).leaveToProps;
    leaveToProps ? graphicUtil.updateProps(el, leaveToProps, seriesModel, {
      cb: function () {
        group.remove(el);
      }
    }) : group.remove(el);
  }
}

function getPathData(shape) {
  return shape && (shape.pathData || shape.d);
}

function hasOwnPathData(shape) {
  return shape && (hasOwn(shape, 'pathData') || hasOwn(shape, 'd'));
}

function isPath(el) {
  return el && el instanceof graphicUtil.Path;
}

function removeElementDirectly(el, group) {
  el && group.remove(el);
}

var MorphPreparation = function () {
  function MorphPreparation(seriesModel, transOpt) {
    this._fromList = [];
    this._toList = [];
    this._toElOptionList = [];
    this._allPropsFinalList = [];
    this._toDataIndices = [];
    this._morphConfigList = [];
    this._seriesModel = seriesModel;
    this._transOpt = transOpt;
  }

  MorphPreparation.prototype.hasFrom = function () {
    return !!this._fromList.length;
  };

  MorphPreparation.prototype.findAndAddFrom = function (el) {
    if (!el) {
      return;
    }

    if (inner(el).canMorph) {
      this._fromList.push(el);
    }

    if (el.isGroup) {
      var children = el.childrenRef();

      for (var i = 0; i < children.length; i++) {
        this.findAndAddFrom(children[i]);
      }
    }
  };

  MorphPreparation.prototype.addTo = function (path, elOption, dataIndex, allPropsFinal) {
    if (path) {
      this._toList.push(path);

      this._toElOptionList.push(elOption);

      this._toDataIndices.push(dataIndex);

      this._allPropsFinalList.push(allPropsFinal);
    }
  };

  MorphPreparation.prototype.applyMorphing = function () {
    var type = this._type;
    var fromList = this._fromList;
    var toList = this._toList;
    var toListLen = toList.length;
    var fromListLen = fromList.length;

    if (!fromListLen || !toListLen) {
      return;
    }

    if (type === 'oneToOne') {
      for (var toIdx = 0; toIdx < toListLen; toIdx++) {
        this._oneToOneForSingleTo(toIdx, toIdx);
      }
    } else if (type === 'manyToOne') {
      var fromSingleSegLen = Math.max(1, Math.floor(fromListLen / toListLen));

      for (var toIdx = 0, fromIdxStart = 0; toIdx < toListLen; toIdx++, fromIdxStart += fromSingleSegLen) {
        var fromCount = toIdx + 1 >= toListLen ? fromListLen - fromIdxStart : fromSingleSegLen;

        this._manyToOneForSingleTo(toIdx, fromIdxStart >= fromListLen ? null : fromIdxStart, fromCount);
      }
    } else if (type === 'oneToMany') {
      var toSingleSegLen = Math.max(1, Math.floor(toListLen / fromListLen));

      for (var toIdxStart = 0, fromIdx = 0; toIdxStart < toListLen; toIdxStart += toSingleSegLen, fromIdx++) {
        var toCount = toIdxStart + toSingleSegLen >= toListLen ? toListLen - toIdxStart : toSingleSegLen;

        this._oneToManyForSingleFrom(toIdxStart, toCount, fromIdx >= fromListLen ? null : fromIdx);
      }
    }
  };

  MorphPreparation.prototype._oneToOneForSingleTo = function (toIdx, fromIdx) {
    var to = this._toList[toIdx];
    var toElOption = this._toElOptionList[toIdx];
    var toDataIndex = this._toDataIndices[toIdx];
    var allPropsFinal = this._allPropsFinalList[toIdx];
    var from = this._fromList[fromIdx];

    var elAnimationConfig = this._getOrCreateMorphConfig(toDataIndex);

    var morphDuration = elAnimationConfig.duration;

    if (from && isCombiningPath(from)) {
      applyPropsFinal(to, allPropsFinal, toElOption.style);

      if (morphDuration) {
        var combineResult = combine([from], to, elAnimationConfig, copyPropsWhenDivided);

        this._processResultIndividuals(combineResult, toIdx, null);
      }
    } else {
      var morphFrom = morphDuration && from && (from !== to || isInAnyMorphing(from)) ? from : null;
      var transFromProps = {};
      prepareShapeOrExtraTransitionFrom('shape', to, morphFrom, toElOption, transFromProps, false);
      prepareShapeOrExtraTransitionFrom('extra', to, morphFrom, toElOption, transFromProps, false);
      prepareTransformTransitionFrom(to, morphFrom, toElOption, transFromProps, false);
      prepareStyleTransitionFrom(to, morphFrom, toElOption, toElOption.style, transFromProps, false);
      applyPropsFinal(to, allPropsFinal, toElOption.style);

      if (morphFrom) {
        morphPath(morphFrom, to, elAnimationConfig);
      }

      applyTransitionFrom(to, toDataIndex, toElOption, this._seriesModel, transFromProps, false);
    }
  };

  MorphPreparation.prototype._manyToOneForSingleTo = function (toIdx, fromIdxStart, fromCount) {
    var to = this._toList[toIdx];
    var toElOption = this._toElOptionList[toIdx];
    var allPropsFinal = this._allPropsFinalList[toIdx];
    applyPropsFinal(to, allPropsFinal, toElOption.style);

    var elAnimationConfig = this._getOrCreateMorphConfig(this._toDataIndices[toIdx]);

    if (elAnimationConfig.duration && fromIdxStart != null) {
      var combineFromList = [];

      for (var fromIdx = fromIdxStart; fromIdx < fromCount; fromIdx++) {
        combineFromList.push(this._fromList[fromIdx]);
      }

      var combineResult = combine(combineFromList, to, elAnimationConfig, copyPropsWhenDivided);

      this._processResultIndividuals(combineResult, toIdx, null);
    }
  };

  MorphPreparation.prototype._oneToManyForSingleFrom = function (toIdxStart, toCount, fromIdx) {
    var from = fromIdx == null ? null : this._fromList[fromIdx];
    var toList = this._toList;
    var separateToList = [];

    for (var toIdx = toIdxStart; toIdx < toCount; toIdx++) {
      var to = toList[toIdx];
      applyPropsFinal(to, this._allPropsFinalList[toIdx], this._toElOptionList[toIdx].style);
      separateToList.push(to);
    }

    var elAnimationConfig = this._getOrCreateMorphConfig(this._toDataIndices[toIdxStart]);

    if (elAnimationConfig.duration && from) {
      var separateResult = separate(from, separateToList, elAnimationConfig, copyPropsWhenDivided);

      this._processResultIndividuals(separateResult, toIdxStart, toCount);
    }
  };

  MorphPreparation.prototype._processResultIndividuals = function (combineSeparateResult, toIdxStart, toCount) {
    var isSeparate = toCount != null;

    for (var i = 0; i < combineSeparateResult.count; i++) {
      var fromIndividual = combineSeparateResult.fromIndividuals[i];
      var toIndividual = combineSeparateResult.toIndividuals[i];
      var toIdx = toIdxStart + (isSeparate ? i : 0);
      var toElOption = this._toElOptionList[toIdx];
      var dataIndex = this._toDataIndices[toIdx];
      var transFromProps = {};
      prepareTransformTransitionFrom(toIndividual, fromIndividual, toElOption, transFromProps, false);
      prepareStyleTransitionFrom(toIndividual, fromIndividual, toElOption, toElOption.style, transFromProps, false);
      applyTransitionFrom(toIndividual, dataIndex, toElOption, this._seriesModel, transFromProps, false);
    }
  };

  MorphPreparation.prototype._getOrCreateMorphConfig = function (dataIndex) {
    var morphConfigList = this._morphConfigList;
    var config = morphConfigList[dataIndex];

    if (config) {
      return config;
    }

    var duration;
    var easing;
    var delay;
    var seriesModel = this._seriesModel;
    var transOpt = this._transOpt;

    if (seriesModel.isAnimationEnabled()) {
      var animationPayload = void 0;

      if (seriesModel && seriesModel.ecModel) {
        var updatePayload = seriesModel.ecModel.getUpdatePayload();
        animationPayload = updatePayload && updatePayload.animation;
      }

      if (animationPayload) {
        duration = animationPayload.duration || 0;
        easing = animationPayload.easing || 'cubicOut';
        delay = animationPayload.delay || 0;
      } else {
        easing = seriesModel.get('animationEasingUpdate');
        var delayOption = seriesModel.get('animationDelayUpdate');
        delay = isFunction(delayOption) ? delayOption(dataIndex) : delayOption;
        var durationOption = seriesModel.get('animationDurationUpdate');
        duration = isFunction(durationOption) ? durationOption(dataIndex) : durationOption;
      }
    }

    config = {
      duration: duration || 0,
      delay: delay,
      easing: easing,
      dividingMethod: transOpt ? transOpt.dividingMethod : null
    };
    morphConfigList[dataIndex] = config;
    return config;
  };

  MorphPreparation.prototype.reset = function (type) {
    this._type = type;
    this._fromList.length = this._toList.length = this._toElOptionList.length = this._allPropsFinalList.length = this._toDataIndices.length = 0;
  };

  return MorphPreparation;
}();

function copyPropsWhenDivided(srcPath, tarPath, willClone) {
  tarPath.style = willClone ? clone(srcPath.style) : srcPath.style;
  tarPath.zlevel = srcPath.zlevel;
  tarPath.z = srcPath.z;
  tarPath.z2 = srcPath.z2;
}