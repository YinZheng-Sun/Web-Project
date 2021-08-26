
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
import * as zrender from 'zrender/esm/zrender';
import * as zrUtil from 'zrender/esm/core/util';
import * as colorTool from 'zrender/esm/tool/color';
import env from 'zrender/esm/core/env';
import timsort from 'zrender/esm/core/timsort';
import Eventful from 'zrender/esm/core/Eventful';
import GlobalModel from './model/Global';
import ExtensionAPI from './ExtensionAPI';
import CoordinateSystemManager from './CoordinateSystem';
import OptionManager from './model/OptionManager';
import backwardCompat from './preprocessor/backwardCompat';
import dataStack from './processor/dataStack';
import ComponentModel from './model/Component';
import SeriesModel from './model/Series';
import ComponentView from './view/Component';
import ChartView from './view/Chart';
import * as graphic from './util/graphic';
import { getECData } from './util/innerStore';
import { enterEmphasisWhenMouseOver, leaveEmphasisWhenMouseOut, isHighDownDispatcher, HOVER_STATE_EMPHASIS, HOVER_STATE_BLUR, toggleSeriesBlurState, toggleSeriesBlurStateFromPayload, toggleSelectionFromPayload, updateSeriesElementSelection, getAllSelectedIndices, isSelectChangePayload, isHighDownPayload, HIGHLIGHT_ACTION_TYPE, DOWNPLAY_ACTION_TYPE, SELECT_ACTION_TYPE, UNSELECT_ACTION_TYPE, TOGGLE_SELECT_ACTION_TYPE, savePathStates, enterEmphasis, leaveEmphasis, leaveBlur, enterSelect, leaveSelect, enterBlur } from './util/states';
import * as modelUtil from './util/model';
import { throttle } from './util/throttle';
import { seriesStyleTask, dataStyleTask, dataColorPaletteTask } from './visual/style';
import loadingDefault from './loading/default';
import Scheduler from './stream/Scheduler';
import lightTheme from './theme/light';
import darkTheme from './theme/dark';
import './component/dataset';
import mapDataStorage from './coord/geo/mapDataStorage';
import { parseClassType } from './util/clazz';
import { ECEventProcessor } from './util/ECEventProcessor';
import { seriesSymbolTask, dataSymbolTask } from './visual/symbol';
import { getVisualFromData, getItemVisualFromData } from './visual/helper';
import LabelManager from './label/LabelManager';
import { deprecateLog, throwError } from './util/log';
import { handleLegacySelectEvents } from './legacy/dataSelectAction';
import 'zrender/esm/canvas/canvas';
import { registerExternalTransform } from './data/helper/transform';
import { createLocaleObject, SYSTEM_LANG } from './locale';
import { findEventDispatcher } from './util/event';
import decal from './visual/decal';
var assert = zrUtil.assert;
var each = zrUtil.each;
var isFunction = zrUtil.isFunction;
var isObject = zrUtil.isObject;
export var version = '5.0.0';
export var dependencies = {
  zrender: '5.0.1'
};
var TEST_FRAME_REMAIN_TIME = 1;
var PRIORITY_PROCESSOR_SERIES_FILTER = 800;
var PRIORITY_PROCESSOR_DATASTACK = 900;
var PRIORITY_PROCESSOR_FILTER = 1000;
var PRIORITY_PROCESSOR_DEFAULT = 2000;
var PRIORITY_PROCESSOR_STATISTIC = 5000;
var PRIORITY_VISUAL_LAYOUT = 1000;
var PRIORITY_VISUAL_PROGRESSIVE_LAYOUT = 1100;
var PRIORITY_VISUAL_GLOBAL = 2000;
var PRIORITY_VISUAL_CHART = 3000;
var PRIORITY_VISUAL_COMPONENT = 4000;
var PRIORITY_VISUAL_CHART_DATA_CUSTOM = 4500;
var PRIORITY_VISUAL_POST_CHART_LAYOUT = 4600;
var PRIORITY_VISUAL_BRUSH = 5000;
var PRIORITY_VISUAL_ARIA = 6000;
var PRIORITY_VISUAL_DECAL = 7000;
export var PRIORITY = {
  PROCESSOR: {
    FILTER: PRIORITY_PROCESSOR_FILTER,
    SERIES_FILTER: PRIORITY_PROCESSOR_SERIES_FILTER,
    STATISTIC: PRIORITY_PROCESSOR_STATISTIC
  },
  VISUAL: {
    LAYOUT: PRIORITY_VISUAL_LAYOUT,
    PROGRESSIVE_LAYOUT: PRIORITY_VISUAL_PROGRESSIVE_LAYOUT,
    GLOBAL: PRIORITY_VISUAL_GLOBAL,
    CHART: PRIORITY_VISUAL_CHART,
    POST_CHART_LAYOUT: PRIORITY_VISUAL_POST_CHART_LAYOUT,
    COMPONENT: PRIORITY_VISUAL_COMPONENT,
    BRUSH: PRIORITY_VISUAL_BRUSH,
    CHART_ITEM: PRIORITY_VISUAL_CHART_DATA_CUSTOM,
    ARIA: PRIORITY_VISUAL_ARIA,
    DECAL: PRIORITY_VISUAL_DECAL
  }
};
var IN_MAIN_PROCESS_KEY = '__flagInMainProcess';
var OPTION_UPDATED_KEY = '__optionUpdated';
var STATUS_NEEDS_UPDATE_KEY = '__needsUpdateStatus';
var ACTION_REG = /^[a-zA-Z0-9_]+$/;
var CONNECT_STATUS_KEY = '__connectUpdateStatus';
var CONNECT_STATUS_PENDING = 0;
var CONNECT_STATUS_UPDATING = 1;
var CONNECT_STATUS_UPDATED = 2;
;

function createRegisterEventWithLowercaseECharts(method) {
  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (this.isDisposed()) {
      disposedWarning(this.id);
      return;
    }

    return toLowercaseNameAndCallEventful(this, method, args);
  };
}

function createRegisterEventWithLowercaseMessageCenter(method) {
  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    return toLowercaseNameAndCallEventful(this, method, args);
  };
}

function toLowercaseNameAndCallEventful(host, method, args) {
  args[0] = args[0] && args[0].toLowerCase();
  return Eventful.prototype[method].apply(host, args);
}

var MessageCenter = function (_super) {
  __extends(MessageCenter, _super);

  function MessageCenter() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return MessageCenter;
}(Eventful);

var messageCenterProto = MessageCenter.prototype;
messageCenterProto.on = createRegisterEventWithLowercaseMessageCenter('on');
messageCenterProto.off = createRegisterEventWithLowercaseMessageCenter('off');
var prepare;
var prepareView;
var updateDirectly;
var updateMethods;
var doConvertPixel;
var updateStreamModes;
var doDispatchAction;
var flushPendingActions;
var triggerUpdatedEvent;
var bindRenderedEvent;
var bindMouseEvent;
var clearColorPalette;
var render;
var renderComponents;
var renderSeries;
var performPostUpdateFuncs;
var createExtensionAPI;
var enableConnect;
var setTransitionOpt;
var markStatusToUpdate;
var applyChangedStates;

var ECharts = function (_super) {
  __extends(ECharts, _super);

  function ECharts(dom, theme, opts) {
    var _this = _super.call(this, new ECEventProcessor()) || this;

    _this._chartsViews = [];
    _this._chartsMap = {};
    _this._componentsViews = [];
    _this._componentsMap = {};
    _this._pendingActions = [];
    opts = opts || {};

    if (typeof theme === 'string') {
      theme = themeStorage[theme];
    }

    _this._dom = dom;
    var root = typeof window === 'undefined' ? global : window;
    var defaultRenderer = 'canvas';
    var defaultUseDirtyRect = false;

    if (process.env.NODE_ENV !== 'production') {
      defaultRenderer = root.__ECHARTS__DEFAULT__RENDERER__ || defaultRenderer;
      var devUseDirtyRect = root.__ECHARTS__DEFAULT__USE_DIRTY_RECT__;
      defaultUseDirtyRect = devUseDirtyRect == null ? defaultUseDirtyRect : devUseDirtyRect;
    }

    var zr = _this._zr = zrender.init(dom, {
      renderer: opts.renderer || defaultRenderer,
      devicePixelRatio: opts.devicePixelRatio,
      width: opts.width,
      height: opts.height,
      useDirtyRect: opts.useDirtyRect == null ? defaultUseDirtyRect : opts.useDirtyRect
    });
    _this._throttledZrFlush = throttle(zrUtil.bind(zr.flush, zr), 17);
    theme = zrUtil.clone(theme);
    theme && backwardCompat(theme, true);
    _this._theme = theme;
    _this._locale = createLocaleObject(opts.locale || SYSTEM_LANG);
    _this._coordSysMgr = new CoordinateSystemManager();
    var api = _this._api = createExtensionAPI(_this);

    function prioritySortFunc(a, b) {
      return a.__prio - b.__prio;
    }

    timsort(visualFuncs, prioritySortFunc);
    timsort(dataProcessorFuncs, prioritySortFunc);
    _this._scheduler = new Scheduler(_this, api, dataProcessorFuncs, visualFuncs);
    _this._messageCenter = new MessageCenter();
    _this._labelManager = new LabelManager();

    _this._initEvents();

    _this.resize = zrUtil.bind(_this.resize, _this);
    zr.animation.on('frame', _this._onframe, _this);
    bindRenderedEvent(zr, _this);
    bindMouseEvent(zr, _this);
    zrUtil.setAsPrimitive(_this);
    return _this;
  }

  ECharts.prototype._onframe = function () {
    if (this._disposed) {
      return;
    }

    applyChangedStates(this);
    var scheduler = this._scheduler;

    if (this[OPTION_UPDATED_KEY]) {
      var silent = this[OPTION_UPDATED_KEY].silent;
      this[IN_MAIN_PROCESS_KEY] = true;
      prepare(this);
      updateMethods.update.call(this);

      this._zr.flush();

      this[IN_MAIN_PROCESS_KEY] = false;
      this[OPTION_UPDATED_KEY] = false;
      flushPendingActions.call(this, silent);
      triggerUpdatedEvent.call(this, silent);
    } else if (scheduler.unfinished) {
      var remainTime = TEST_FRAME_REMAIN_TIME;
      var ecModel = this._model;
      var api = this._api;
      scheduler.unfinished = false;

      do {
        var startTime = +new Date();
        scheduler.performSeriesTasks(ecModel);
        scheduler.performDataProcessorTasks(ecModel);
        updateStreamModes(this, ecModel);
        scheduler.performVisualTasks(ecModel);
        renderSeries(this, this._model, api, 'remain');
        remainTime -= +new Date() - startTime;
      } while (remainTime > 0 && scheduler.unfinished);

      if (!scheduler.unfinished) {
        this._zr.flush();
      }
    }
  };

  ECharts.prototype.getDom = function () {
    return this._dom;
  };

  ECharts.prototype.getId = function () {
    return this.id;
  };

  ECharts.prototype.getZr = function () {
    return this._zr;
  };

  ECharts.prototype.setOption = function (option, notMerge, lazyUpdate) {
    if (process.env.NODE_ENV !== 'production') {
      assert(!this[IN_MAIN_PROCESS_KEY], '`setOption` should not be called during main process.');
    }

    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    var silent;
    var replaceMerge;
    var transitionOpt;

    if (isObject(notMerge)) {
      lazyUpdate = notMerge.lazyUpdate;
      silent = notMerge.silent;
      replaceMerge = notMerge.replaceMerge;
      transitionOpt = notMerge.transition;
      notMerge = notMerge.notMerge;
    }

    this[IN_MAIN_PROCESS_KEY] = true;

    if (!this._model || notMerge) {
      var optionManager = new OptionManager(this._api);
      var theme = this._theme;
      var ecModel = this._model = new GlobalModel();
      ecModel.scheduler = this._scheduler;
      ecModel.init(null, null, null, theme, this._locale, optionManager);
    }

    this._model.setOption(option, {
      replaceMerge: replaceMerge
    }, optionPreprocessorFuncs);

    setTransitionOpt(this, transitionOpt);

    if (lazyUpdate) {
      this[OPTION_UPDATED_KEY] = {
        silent: silent
      };
      this[IN_MAIN_PROCESS_KEY] = false;
      this.getZr().wakeUp();
    } else {
      prepare(this);
      updateMethods.update.call(this);

      this._zr.flush();

      this[OPTION_UPDATED_KEY] = false;
      this[IN_MAIN_PROCESS_KEY] = false;
      flushPendingActions.call(this, silent);
      triggerUpdatedEvent.call(this, silent);
    }
  };

  ECharts.prototype.setTheme = function () {
    console.error('ECharts#setTheme() is DEPRECATED in ECharts 3.0');
  };

  ECharts.prototype.getModel = function () {
    return this._model;
  };

  ECharts.prototype.getOption = function () {
    return this._model && this._model.getOption();
  };

  ECharts.prototype.getWidth = function () {
    return this._zr.getWidth();
  };

  ECharts.prototype.getHeight = function () {
    return this._zr.getHeight();
  };

  ECharts.prototype.getDevicePixelRatio = function () {
    return this._zr.painter.dpr || window.devicePixelRatio || 1;
  };

  ECharts.prototype.getRenderedCanvas = function (opts) {
    if (!env.canvasSupported) {
      return;
    }

    opts = zrUtil.extend({}, opts || {});
    opts.pixelRatio = opts.pixelRatio || 1;
    opts.backgroundColor = opts.backgroundColor || this._model.get('backgroundColor');
    var zr = this._zr;
    return zr.painter.getRenderedCanvas(opts);
  };

  ECharts.prototype.getSvgDataURL = function () {
    if (!env.svgSupported) {
      return;
    }

    var zr = this._zr;
    var list = zr.storage.getDisplayList();
    zrUtil.each(list, function (el) {
      el.stopAnimation(null, true);
    });
    return zr.painter.toDataURL();
  };

  ECharts.prototype.getDataURL = function (opts) {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    opts = opts || {};
    var excludeComponents = opts.excludeComponents;
    var ecModel = this._model;
    var excludesComponentViews = [];
    var self = this;
    each(excludeComponents, function (componentType) {
      ecModel.eachComponent({
        mainType: componentType
      }, function (component) {
        var view = self._componentsMap[component.__viewId];

        if (!view.group.ignore) {
          excludesComponentViews.push(view);
          view.group.ignore = true;
        }
      });
    });
    var url = this._zr.painter.getType() === 'svg' ? this.getSvgDataURL() : this.getRenderedCanvas(opts).toDataURL('image/' + (opts && opts.type || 'png'));
    each(excludesComponentViews, function (view) {
      view.group.ignore = false;
    });
    return url;
  };

  ECharts.prototype.getConnectedDataURL = function (opts) {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    if (!env.canvasSupported) {
      return;
    }

    var isSvg = opts.type === 'svg';
    var groupId = this.group;
    var mathMin = Math.min;
    var mathMax = Math.max;
    var MAX_NUMBER = Infinity;

    if (connectedGroups[groupId]) {
      var left_1 = MAX_NUMBER;
      var top_1 = MAX_NUMBER;
      var right_1 = -MAX_NUMBER;
      var bottom_1 = -MAX_NUMBER;
      var canvasList_1 = [];
      var dpr_1 = opts && opts.pixelRatio || 1;
      zrUtil.each(instances, function (chart, id) {
        if (chart.group === groupId) {
          var canvas = isSvg ? chart.getZr().painter.getSvgDom().innerHTML : chart.getRenderedCanvas(zrUtil.clone(opts));
          var boundingRect = chart.getDom().getBoundingClientRect();
          left_1 = mathMin(boundingRect.left, left_1);
          top_1 = mathMin(boundingRect.top, top_1);
          right_1 = mathMax(boundingRect.right, right_1);
          bottom_1 = mathMax(boundingRect.bottom, bottom_1);
          canvasList_1.push({
            dom: canvas,
            left: boundingRect.left,
            top: boundingRect.top
          });
        }
      });
      left_1 *= dpr_1;
      top_1 *= dpr_1;
      right_1 *= dpr_1;
      bottom_1 *= dpr_1;
      var width = right_1 - left_1;
      var height = bottom_1 - top_1;
      var targetCanvas = zrUtil.createCanvas();
      var zr_1 = zrender.init(targetCanvas, {
        renderer: isSvg ? 'svg' : 'canvas'
      });
      zr_1.resize({
        width: width,
        height: height
      });

      if (isSvg) {
        var content_1 = '';
        each(canvasList_1, function (item) {
          var x = item.left - left_1;
          var y = item.top - top_1;
          content_1 += '<g transform="translate(' + x + ',' + y + ')">' + item.dom + '</g>';
        });
        zr_1.painter.getSvgRoot().innerHTML = content_1;

        if (opts.connectedBackgroundColor) {
          zr_1.painter.setBackgroundColor(opts.connectedBackgroundColor);
        }

        zr_1.refreshImmediately();
        return zr_1.painter.toDataURL();
      } else {
        if (opts.connectedBackgroundColor) {
          zr_1.add(new graphic.Rect({
            shape: {
              x: 0,
              y: 0,
              width: width,
              height: height
            },
            style: {
              fill: opts.connectedBackgroundColor
            }
          }));
        }

        each(canvasList_1, function (item) {
          var img = new graphic.Image({
            style: {
              x: item.left * dpr_1 - left_1,
              y: item.top * dpr_1 - top_1,
              image: item.dom
            }
          });
          zr_1.add(img);
        });
        zr_1.refreshImmediately();
        return targetCanvas.toDataURL('image/' + (opts && opts.type || 'png'));
      }
    } else {
      return this.getDataURL(opts);
    }
  };

  ECharts.prototype.convertToPixel = function (finder, value) {
    return doConvertPixel(this, 'convertToPixel', finder, value);
  };

  ECharts.prototype.convertFromPixel = function (finder, value) {
    return doConvertPixel(this, 'convertFromPixel', finder, value);
  };

  ECharts.prototype.containPixel = function (finder, value) {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    var ecModel = this._model;
    var result;
    var findResult = modelUtil.parseFinder(ecModel, finder);
    zrUtil.each(findResult, function (models, key) {
      key.indexOf('Models') >= 0 && zrUtil.each(models, function (model) {
        var coordSys = model.coordinateSystem;

        if (coordSys && coordSys.containPoint) {
          result = result || !!coordSys.containPoint(value);
        } else if (key === 'seriesModels') {
          var view = this._chartsMap[model.__viewId];

          if (view && view.containPoint) {
            result = result || view.containPoint(value, model);
          } else {
            if (process.env.NODE_ENV !== 'production') {
              console.warn(key + ': ' + (view ? 'The found component do not support containPoint.' : 'No view mapping to the found component.'));
            }
          }
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(key + ': containPoint is not supported');
          }
        }
      }, this);
    }, this);
    return !!result;
  };

  ECharts.prototype.getVisual = function (finder, visualType) {
    var ecModel = this._model;
    var parsedFinder = modelUtil.parseFinder(ecModel, finder, {
      defaultMainType: 'series'
    });
    var seriesModel = parsedFinder.seriesModel;

    if (process.env.NODE_ENV !== 'production') {
      if (!seriesModel) {
        console.warn('There is no specified seires model');
      }
    }

    var data = seriesModel.getData();
    var dataIndexInside = parsedFinder.hasOwnProperty('dataIndexInside') ? parsedFinder.dataIndexInside : parsedFinder.hasOwnProperty('dataIndex') ? data.indexOfRawIndex(parsedFinder.dataIndex) : null;
    return dataIndexInside != null ? getItemVisualFromData(data, dataIndexInside, visualType) : getVisualFromData(data, visualType);
  };

  ECharts.prototype.getViewOfComponentModel = function (componentModel) {
    return this._componentsMap[componentModel.__viewId];
  };

  ECharts.prototype.getViewOfSeriesModel = function (seriesModel) {
    return this._chartsMap[seriesModel.__viewId];
  };

  ECharts.prototype._initEvents = function () {
    var _this = this;

    each(MOUSE_EVENT_NAMES, function (eveName) {
      var handler = function (e) {
        var ecModel = _this.getModel();

        var el = e.target;
        var params;
        var isGlobalOut = eveName === 'globalout';

        if (isGlobalOut) {
          params = {};
        } else {
          el && findEventDispatcher(el, function (parent) {
            var ecData = getECData(parent);

            if (ecData && ecData.dataIndex != null) {
              var dataModel = ecData.dataModel || ecModel.getSeriesByIndex(ecData.seriesIndex);
              params = dataModel && dataModel.getDataParams(ecData.dataIndex, ecData.dataType) || {};
              return true;
            } else if (ecData.eventData) {
              params = zrUtil.extend({}, ecData.eventData);
              return true;
            }
          }, true);
        }

        if (params) {
          var componentType = params.componentType;
          var componentIndex = params.componentIndex;

          if (componentType === 'markLine' || componentType === 'markPoint' || componentType === 'markArea') {
            componentType = 'series';
            componentIndex = params.seriesIndex;
          }

          var model = componentType && componentIndex != null && ecModel.getComponent(componentType, componentIndex);
          var view = model && _this[model.mainType === 'series' ? '_chartsMap' : '_componentsMap'][model.__viewId];

          if (process.env.NODE_ENV !== 'production') {
            if (!isGlobalOut && !(model && view)) {
              console.warn('model or view can not be found by params');
            }
          }

          params.event = e;
          params.type = eveName;
          _this._$eventProcessor.eventInfo = {
            targetEl: el,
            packedEvent: params,
            model: model,
            view: view
          };

          _this.trigger(eveName, params);
        }
      };

      handler.zrEventfulCallAtLast = true;

      _this._zr.on(eveName, handler, _this);
    });
    each(eventActionMap, function (actionType, eventType) {
      _this._messageCenter.on(eventType, function (event) {
        this.trigger(eventType, event);
      }, _this);
    });
    each(['selectchanged'], function (eventType) {
      _this._messageCenter.on(eventType, function (event) {
        this.trigger(eventType, event);
      }, _this);
    });
    handleLegacySelectEvents(this._messageCenter, this, this._model);
  };

  ECharts.prototype.isDisposed = function () {
    return this._disposed;
  };

  ECharts.prototype.clear = function () {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    this.setOption({
      series: []
    }, true);
  };

  ECharts.prototype.dispose = function () {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    this._disposed = true;
    modelUtil.setAttribute(this.getDom(), DOM_ATTRIBUTE_KEY, '');
    var api = this._api;
    var ecModel = this._model;
    each(this._componentsViews, function (component) {
      component.dispose(ecModel, api);
    });
    each(this._chartsViews, function (chart) {
      chart.dispose(ecModel, api);
    });

    this._zr.dispose();

    delete instances[this.id];
  };

  ECharts.prototype.resize = function (opts) {
    if (process.env.NODE_ENV !== 'production') {
      assert(!this[IN_MAIN_PROCESS_KEY], '`resize` should not be called during main process.');
    }

    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    this._zr.resize(opts);

    var ecModel = this._model;
    this._loadingFX && this._loadingFX.resize();

    if (!ecModel) {
      return;
    }

    var optionChanged = ecModel.resetOption('media');
    var silent = opts && opts.silent;
    this[IN_MAIN_PROCESS_KEY] = true;
    optionChanged && prepare(this);
    updateMethods.update.call(this, {
      type: 'resize',
      animation: {
        duration: 0
      }
    });
    this[IN_MAIN_PROCESS_KEY] = false;
    flushPendingActions.call(this, silent);
    triggerUpdatedEvent.call(this, silent);
  };

  ECharts.prototype.showLoading = function (name, cfg) {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    if (isObject(name)) {
      cfg = name;
      name = '';
    }

    name = name || 'default';
    this.hideLoading();

    if (!loadingEffects[name]) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Loading effects ' + name + ' not exists.');
      }

      return;
    }

    var el = loadingEffects[name](this._api, cfg);
    var zr = this._zr;
    this._loadingFX = el;
    zr.add(el);
  };

  ECharts.prototype.hideLoading = function () {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    this._loadingFX && this._zr.remove(this._loadingFX);
    this._loadingFX = null;
  };

  ECharts.prototype.makeActionFromEvent = function (eventObj) {
    var payload = zrUtil.extend({}, eventObj);
    payload.type = eventActionMap[eventObj.type];
    return payload;
  };

  ECharts.prototype.dispatchAction = function (payload, opt) {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    if (!isObject(opt)) {
      opt = {
        silent: !!opt
      };
    }

    if (!actions[payload.type]) {
      return;
    }

    if (!this._model) {
      return;
    }

    if (this[IN_MAIN_PROCESS_KEY]) {
      this._pendingActions.push(payload);

      return;
    }

    var silent = opt.silent;
    doDispatchAction.call(this, payload, silent);
    var flush = opt.flush;

    if (flush) {
      this._zr.flush();
    } else if (flush !== false && env.browser.weChat) {
      this._throttledZrFlush();
    }

    flushPendingActions.call(this, silent);
    triggerUpdatedEvent.call(this, silent);
  };

  ECharts.prototype.updateLabelLayout = function () {
    var labelManager = this._labelManager;
    labelManager.updateLayoutConfig(this._api);
    labelManager.layout(this._api);
    labelManager.processLabelsOverall();
  };

  ECharts.prototype.appendData = function (params) {
    if (this._disposed) {
      disposedWarning(this.id);
      return;
    }

    var seriesIndex = params.seriesIndex;
    var ecModel = this.getModel();
    var seriesModel = ecModel.getSeriesByIndex(seriesIndex);

    if (process.env.NODE_ENV !== 'production') {
      assert(params.data && seriesModel);
    }

    seriesModel.appendData(params);
    this._scheduler.unfinished = true;
    this.getZr().wakeUp();
  };

  ECharts.internalField = function () {
    prepare = function (ecIns) {
      var scheduler = ecIns._scheduler;
      scheduler.restorePipelines(ecIns._model);
      scheduler.prepareStageTasks();
      prepareView(ecIns, true);
      prepareView(ecIns, false);
      scheduler.plan();
    };

    prepareView = function (ecIns, isComponent) {
      var ecModel = ecIns._model;
      var scheduler = ecIns._scheduler;
      var viewList = isComponent ? ecIns._componentsViews : ecIns._chartsViews;
      var viewMap = isComponent ? ecIns._componentsMap : ecIns._chartsMap;
      var zr = ecIns._zr;
      var api = ecIns._api;

      for (var i = 0; i < viewList.length; i++) {
        viewList[i].__alive = false;
      }

      isComponent ? ecModel.eachComponent(function (componentType, model) {
        componentType !== 'series' && doPrepare(model);
      }) : ecModel.eachSeries(doPrepare);

      function doPrepare(model) {
        var requireNewView = model.__requireNewView;
        model.__requireNewView = false;
        var viewId = '_ec_' + model.id + '_' + model.type;
        var view = !requireNewView && viewMap[viewId];

        if (!view) {
          var classType = parseClassType(model.type);
          var Clazz = isComponent ? ComponentView.getClass(classType.main, classType.sub) : ChartView.getClass(classType.sub);

          if (process.env.NODE_ENV !== 'production') {
            assert(Clazz, classType.sub + ' does not exist.');
          }

          view = new Clazz();
          view.init(ecModel, api);
          viewMap[viewId] = view;
          viewList.push(view);
          zr.add(view.group);
        }

        model.__viewId = view.__id = viewId;
        view.__alive = true;
        view.__model = model;
        view.group.__ecComponentInfo = {
          mainType: model.mainType,
          index: model.componentIndex
        };
        !isComponent && scheduler.prepareView(view, model, ecModel, api);
      }

      for (var i = 0; i < viewList.length;) {
        var view = viewList[i];

        if (!view.__alive) {
          !isComponent && view.renderTask.dispose();
          zr.remove(view.group);
          view.dispose(ecModel, api);
          viewList.splice(i, 1);

          if (viewMap[view.__id] === view) {
            delete viewMap[view.__id];
          }

          view.__id = view.group.__ecComponentInfo = null;
        } else {
          i++;
        }
      }
    };

    updateDirectly = function (ecIns, method, payload, mainType, subType) {
      var ecModel = ecIns._model;
      ecModel.setUpdatePayload(payload);

      if (!mainType) {
        each([].concat(ecIns._componentsViews).concat(ecIns._chartsViews), callView);
        return;
      }

      var query = {};
      query[mainType + 'Id'] = payload[mainType + 'Id'];
      query[mainType + 'Index'] = payload[mainType + 'Index'];
      query[mainType + 'Name'] = payload[mainType + 'Name'];
      var condition = {
        mainType: mainType,
        query: query
      };
      subType && (condition.subType = subType);
      var excludeSeriesId = payload.excludeSeriesId;
      var excludeSeriesIdMap;

      if (excludeSeriesId != null) {
        excludeSeriesIdMap = zrUtil.createHashMap();
        each(modelUtil.normalizeToArray(excludeSeriesId), function (id) {
          var modelId = modelUtil.convertOptionIdName(id, null);

          if (modelId != null) {
            excludeSeriesIdMap.set(modelId, true);
          }
        });
      }

      ecModel && ecModel.eachComponent(condition, function (model) {
        if (!excludeSeriesIdMap || excludeSeriesIdMap.get(model.id) == null) {
          if (isHighDownPayload(payload) && !payload.notBlur) {
            if (model instanceof SeriesModel) {
              toggleSeriesBlurStateFromPayload(model, payload, ecIns._api);
            }
          } else if (isSelectChangePayload(payload)) {
            if (model instanceof SeriesModel) {
              toggleSelectionFromPayload(model, payload, ecIns._api);
              updateSeriesElementSelection(model);
              markStatusToUpdate(ecIns);
            }
          }

          callView(ecIns[mainType === 'series' ? '_chartsMap' : '_componentsMap'][model.__viewId]);
        }
      }, ecIns);

      function callView(view) {
        view && view.__alive && view[method] && view[method](view.__model, ecModel, ecIns._api, payload);
      }
    };

    updateMethods = {
      prepareAndUpdate: function (payload) {
        prepare(this);
        updateMethods.update.call(this, payload);
      },
      update: function (payload) {
        var ecModel = this._model;
        var api = this._api;
        var zr = this._zr;
        var coordSysMgr = this._coordSysMgr;
        var scheduler = this._scheduler;

        if (!ecModel) {
          return;
        }

        ecModel.setUpdatePayload(payload);
        scheduler.restoreData(ecModel, payload);
        scheduler.performSeriesTasks(ecModel);
        coordSysMgr.create(ecModel, api);
        scheduler.performDataProcessorTasks(ecModel, payload);
        updateStreamModes(this, ecModel);
        coordSysMgr.update(ecModel, api);
        clearColorPalette(ecModel);
        scheduler.performVisualTasks(ecModel, payload);
        render(this, ecModel, api, payload);
        var backgroundColor = ecModel.get('backgroundColor') || 'transparent';
        var darkMode = ecModel.get('darkMode');

        if (!env.canvasSupported) {
          var colorArr = colorTool.parse(backgroundColor);
          backgroundColor = colorTool.stringify(colorArr, 'rgb');

          if (colorArr[3] === 0) {
            backgroundColor = 'transparent';
          }
        } else {
          zr.setBackgroundColor(backgroundColor);

          if (darkMode != null && darkMode !== 'auto') {
            zr.setDarkMode(darkMode);
          }
        }

        performPostUpdateFuncs(ecModel, api);
      },
      updateTransform: function (payload) {
        var _this = this;

        var ecModel = this._model;
        var api = this._api;

        if (!ecModel) {
          return;
        }

        ecModel.setUpdatePayload(payload);
        var componentDirtyList = [];
        ecModel.eachComponent(function (componentType, componentModel) {
          if (componentType === 'series') {
            return;
          }

          var componentView = _this.getViewOfComponentModel(componentModel);

          if (componentView && componentView.__alive) {
            if (componentView.updateTransform) {
              var result = componentView.updateTransform(componentModel, ecModel, api, payload);
              result && result.update && componentDirtyList.push(componentView);
            } else {
              componentDirtyList.push(componentView);
            }
          }
        });
        var seriesDirtyMap = zrUtil.createHashMap();
        ecModel.eachSeries(function (seriesModel) {
          var chartView = _this._chartsMap[seriesModel.__viewId];

          if (chartView.updateTransform) {
            var result = chartView.updateTransform(seriesModel, ecModel, api, payload);
            result && result.update && seriesDirtyMap.set(seriesModel.uid, 1);
          } else {
            seriesDirtyMap.set(seriesModel.uid, 1);
          }
        });
        clearColorPalette(ecModel);

        this._scheduler.performVisualTasks(ecModel, payload, {
          setDirty: true,
          dirtyMap: seriesDirtyMap
        });

        renderSeries(this, ecModel, api, payload, seriesDirtyMap);
        performPostUpdateFuncs(ecModel, this._api);
      },
      updateView: function (payload) {
        var ecModel = this._model;

        if (!ecModel) {
          return;
        }

        ecModel.setUpdatePayload(payload);
        ChartView.markUpdateMethod(payload, 'updateView');
        clearColorPalette(ecModel);

        this._scheduler.performVisualTasks(ecModel, payload, {
          setDirty: true
        });

        render(this, this._model, this._api, payload);
        performPostUpdateFuncs(ecModel, this._api);
      },
      updateVisual: function (payload) {
        var _this = this;

        var ecModel = this._model;

        if (!ecModel) {
          return;
        }

        ecModel.setUpdatePayload(payload);
        ecModel.eachSeries(function (seriesModel) {
          seriesModel.getData().clearAllVisual();
        });
        ChartView.markUpdateMethod(payload, 'updateVisual');
        clearColorPalette(ecModel);

        this._scheduler.performVisualTasks(ecModel, payload, {
          visualType: 'visual',
          setDirty: true
        });

        ecModel.eachComponent(function (componentType, componentModel) {
          if (componentType !== 'series') {
            var componentView = _this.getViewOfComponentModel(componentModel);

            componentView && componentView.__alive && componentView.updateVisual(componentModel, ecModel, _this._api, payload);
          }
        });
        ecModel.eachSeries(function (seriesModel) {
          var chartView = _this._chartsMap[seriesModel.__viewId];
          chartView.updateVisual(seriesModel, ecModel, _this._api, payload);
        });
        performPostUpdateFuncs(ecModel, this._api);
      },
      updateLayout: function (payload) {
        updateMethods.update.call(this, payload);
      }
    };

    doConvertPixel = function (ecIns, methodName, finder, value) {
      if (ecIns._disposed) {
        disposedWarning(ecIns.id);
        return;
      }

      var ecModel = ecIns._model;

      var coordSysList = ecIns._coordSysMgr.getCoordinateSystems();

      var result;
      var parsedFinder = modelUtil.parseFinder(ecModel, finder);

      for (var i = 0; i < coordSysList.length; i++) {
        var coordSys = coordSysList[i];

        if (coordSys[methodName] && (result = coordSys[methodName](ecModel, parsedFinder, value)) != null) {
          return result;
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        console.warn('No coordinate system that supports ' + methodName + ' found by the given finder.');
      }
    };

    updateStreamModes = function (ecIns, ecModel) {
      var chartsMap = ecIns._chartsMap;
      var scheduler = ecIns._scheduler;
      ecModel.eachSeries(function (seriesModel) {
        scheduler.updateStreamModes(seriesModel, chartsMap[seriesModel.__viewId]);
      });
    };

    doDispatchAction = function (payload, silent) {
      var _this = this;

      var ecModel = this.getModel();
      var payloadType = payload.type;
      var escapeConnect = payload.escapeConnect;
      var actionWrap = actions[payloadType];
      var actionInfo = actionWrap.actionInfo;
      var cptTypeTmp = (actionInfo.update || 'update').split(':');
      var updateMethod = cptTypeTmp.pop();
      var cptType = cptTypeTmp[0] != null && parseClassType(cptTypeTmp[0]);
      this[IN_MAIN_PROCESS_KEY] = true;
      var payloads = [payload];
      var batched = false;

      if (payload.batch) {
        batched = true;
        payloads = zrUtil.map(payload.batch, function (item) {
          item = zrUtil.defaults(zrUtil.extend({}, item), payload);
          item.batch = null;
          return item;
        });
      }

      var eventObjBatch = [];
      var eventObj;
      var isSelectChange = isSelectChangePayload(payload);
      var isStatusChange = isHighDownPayload(payload) || isSelectChange;
      each(payloads, function (batchItem) {
        eventObj = actionWrap.action(batchItem, _this._model, _this._api);
        eventObj = eventObj || zrUtil.extend({}, batchItem);
        eventObj.type = actionInfo.event || eventObj.type;
        eventObjBatch.push(eventObj);

        if (isStatusChange) {
          updateDirectly(_this, updateMethod, batchItem, 'series');
          markStatusToUpdate(_this);
        } else if (cptType) {
          updateDirectly(_this, updateMethod, batchItem, cptType.main, cptType.sub);
        }
      });

      if (updateMethod !== 'none' && !isStatusChange && !cptType) {
        if (this[OPTION_UPDATED_KEY]) {
          prepare(this);
          updateMethods.update.call(this, payload);
          this[OPTION_UPDATED_KEY] = false;
        } else {
          updateMethods[updateMethod].call(this, payload);
        }
      }

      if (batched) {
        eventObj = {
          type: actionInfo.event || payloadType,
          escapeConnect: escapeConnect,
          batch: eventObjBatch
        };
      } else {
        eventObj = eventObjBatch[0];
      }

      this[IN_MAIN_PROCESS_KEY] = false;

      if (!silent) {
        var messageCenter = this._messageCenter;
        messageCenter.trigger(eventObj.type, eventObj);

        if (isSelectChange) {
          var newObj = {
            type: 'selectchanged',
            escapeConnect: escapeConnect,
            selected: getAllSelectedIndices(ecModel),
            isFromClick: payload.isFromClick || false,
            fromAction: payload.type,
            fromActionPayload: payload
          };
          messageCenter.trigger(newObj.type, newObj);
        }
      }
    };

    flushPendingActions = function (silent) {
      var pendingActions = this._pendingActions;

      while (pendingActions.length) {
        var payload = pendingActions.shift();
        doDispatchAction.call(this, payload, silent);
      }
    };

    triggerUpdatedEvent = function (silent) {
      !silent && this.trigger('updated');
    };

    bindRenderedEvent = function (zr, ecIns) {
      zr.on('rendered', function (params) {
        ecIns.trigger('rendered', params);

        if (zr.animation.isFinished() && !ecIns[OPTION_UPDATED_KEY] && !ecIns._scheduler.unfinished && !ecIns._pendingActions.length) {
          ecIns.trigger('finished');
        }
      });
    };

    bindMouseEvent = function (zr, ecIns) {
      zr.on('mouseover', function (e) {
        var el = e.target;
        var dispatcher = findEventDispatcher(el, isHighDownDispatcher);

        if (dispatcher) {
          var ecData = getECData(dispatcher);
          toggleSeriesBlurState(ecData.seriesIndex, ecData.focus, ecData.blurScope, ecIns._api, true);
          enterEmphasisWhenMouseOver(dispatcher, e);
          markStatusToUpdate(ecIns);
        }
      }).on('mouseout', function (e) {
        var el = e.target;
        var dispatcher = findEventDispatcher(el, isHighDownDispatcher);

        if (dispatcher) {
          var ecData = getECData(dispatcher);
          toggleSeriesBlurState(ecData.seriesIndex, ecData.focus, ecData.blurScope, ecIns._api, false);
          leaveEmphasisWhenMouseOut(dispatcher, e);
          markStatusToUpdate(ecIns);
        }
      }).on('click', function (e) {
        var el = e.target;
        var dispatcher = findEventDispatcher(el, function (target) {
          return getECData(target).dataIndex != null;
        }, true);

        if (dispatcher) {
          var actionType = dispatcher.selected ? 'unselect' : 'select';
          var ecData = getECData(dispatcher);

          ecIns._api.dispatchAction({
            type: actionType,
            dataType: ecData.dataType,
            dataIndexInside: ecData.dataIndex,
            seriesIndex: ecData.seriesIndex,
            isFromClick: true
          });
        }
      });
    };

    clearColorPalette = function (ecModel) {
      ecModel.clearColorPalette();
      ecModel.eachSeries(function (seriesModel) {
        seriesModel.clearColorPalette();
      });
    };

    render = function (ecIns, ecModel, api, payload) {
      renderComponents(ecIns, ecModel, api, payload);
      each(ecIns._chartsViews, function (chart) {
        chart.__alive = false;
      });
      renderSeries(ecIns, ecModel, api, payload);
      each(ecIns._chartsViews, function (chart) {
        if (!chart.__alive) {
          chart.remove(ecModel, api);
        }
      });
    };

    renderComponents = function (ecIns, ecModel, api, payload, dirtyList) {
      each(dirtyList || ecIns._componentsViews, function (componentView) {
        var componentModel = componentView.__model;
        clearStates(componentModel, componentView);
        componentView.render(componentModel, ecModel, api, payload);
        updateZ(componentModel, componentView);
        updateStates(componentModel, componentView);
      });
    };

    renderSeries = function (ecIns, ecModel, api, payload, dirtyMap) {
      var scheduler = ecIns._scheduler;
      var labelManager = ecIns._labelManager;
      labelManager.clearLabels();
      var unfinished = false;
      ecModel.eachSeries(function (seriesModel) {
        var chartView = ecIns._chartsMap[seriesModel.__viewId];
        chartView.__alive = true;
        var renderTask = chartView.renderTask;
        scheduler.updatePayload(renderTask, payload);
        clearStates(seriesModel, chartView);

        if (dirtyMap && dirtyMap.get(seriesModel.uid)) {
          renderTask.dirty();
        }

        if (renderTask.perform(scheduler.getPerformArgs(renderTask))) {
          unfinished = true;
        }

        seriesModel.__transientTransitionOpt = null;
        chartView.group.silent = !!seriesModel.get('silent');
        updateBlend(seriesModel, chartView);
        updateSeriesElementSelection(seriesModel);
        labelManager.addLabelsOfSeries(chartView);
      });
      scheduler.unfinished = unfinished || scheduler.unfinished;
      labelManager.updateLayoutConfig(api);
      labelManager.layout(api);
      labelManager.processLabelsOverall();
      ecModel.eachSeries(function (seriesModel) {
        var chartView = ecIns._chartsMap[seriesModel.__viewId];
        updateZ(seriesModel, chartView);
        updateStates(seriesModel, chartView);
      });
      updateHoverLayerStatus(ecIns, ecModel);
    };

    performPostUpdateFuncs = function (ecModel, api) {
      each(postUpdateFuncs, function (func) {
        func(ecModel, api);
      });
    };

    markStatusToUpdate = function (ecIns) {
      ecIns[STATUS_NEEDS_UPDATE_KEY] = true;
      ecIns.getZr().wakeUp();
    };

    applyChangedStates = function (ecIns) {
      if (!ecIns[STATUS_NEEDS_UPDATE_KEY]) {
        return;
      }

      ecIns.getZr().storage.traverse(function (el) {
        if (graphic.isElementRemoved(el)) {
          return;
        }

        applyElementStates(el);
      });
      ecIns[STATUS_NEEDS_UPDATE_KEY] = false;
    };

    function applyElementStates(el) {
      var newStates = [];
      var oldStates = el.currentStates;

      for (var i = 0; i < oldStates.length; i++) {
        var stateName = oldStates[i];

        if (!(stateName === 'emphasis' || stateName === 'blur' || stateName === 'select')) {
          newStates.push(stateName);
        }
      }

      if (el.selected && el.states.select) {
        newStates.push('select');
      }

      if (el.hoverState === HOVER_STATE_EMPHASIS && el.states.emphasis) {
        newStates.push('emphasis');
      } else if (el.hoverState === HOVER_STATE_BLUR && el.states.blur) {
        newStates.push('blur');
      }

      el.useStates(newStates);
    }

    function updateHoverLayerStatus(ecIns, ecModel) {
      var zr = ecIns._zr;
      var storage = zr.storage;
      var elCount = 0;
      storage.traverse(function (el) {
        if (!el.isGroup) {
          elCount++;
        }
      });

      if (elCount > ecModel.get('hoverLayerThreshold') && !env.node && !env.worker) {
        ecModel.eachSeries(function (seriesModel) {
          if (seriesModel.preventUsingHoverLayer) {
            return;
          }

          var chartView = ecIns._chartsMap[seriesModel.__viewId];

          if (chartView.__alive) {
            chartView.group.traverse(function (el) {
              if (el.states.emphasis) {
                el.states.emphasis.hoverLayer = true;
              }
            });
          }
        });
      }
    }

    ;

    function updateBlend(seriesModel, chartView) {
      var blendMode = seriesModel.get('blendMode') || null;

      if (process.env.NODE_ENV !== 'production') {
        if (!env.canvasSupported && blendMode && blendMode !== 'source-over') {
          console.warn('Only canvas support blendMode');
        }
      }

      chartView.group.traverse(function (el) {
        if (!el.isGroup) {
          el.style.blend = blendMode;
        }

        if (el.eachPendingDisplayable) {
          el.eachPendingDisplayable(function (displayable) {
            displayable.style.blend = blendMode;
          });
        }
      });
    }

    ;

    function updateZ(model, view) {
      if (model.preventAutoZ) {
        return;
      }

      var z = model.get('z');
      var zlevel = model.get('zlevel');
      view.group.traverse(function (el) {
        if (!el.isGroup) {
          z != null && (el.z = z);
          zlevel != null && (el.zlevel = zlevel);
          var label = el.getTextContent();
          var labelLine = el.getTextGuideLine();

          if (label) {
            label.z = el.z;
            label.zlevel = el.zlevel;
            label.z2 = el.z2 + 2;
          }

          if (labelLine) {
            var showAbove = el.textGuideLineConfig && el.textGuideLineConfig.showAbove;
            labelLine.z = el.z;
            labelLine.zlevel = el.zlevel;
            labelLine.z2 = el.z2 + (showAbove ? 1 : -1);
          }
        }
      });
    }

    ;

    function clearStates(model, view) {
      view.group.traverse(function (el) {
        if (graphic.isElementRemoved(el)) {
          return;
        }

        var textContent = el.getTextContent();
        var textGuide = el.getTextGuideLine();

        if (el.stateTransition) {
          el.stateTransition = null;
        }

        if (textContent && textContent.stateTransition) {
          textContent.stateTransition = null;
        }

        if (textGuide && textGuide.stateTransition) {
          textGuide.stateTransition = null;
        }

        if (el.hasState()) {
          el.prevStates = el.currentStates;
          el.clearStates();
        } else if (el.prevStates) {
          el.prevStates = null;
        }
      });
    }

    function updateStates(model, view) {
      var stateAnimationModel = model.getModel('stateAnimation');
      var enableAnimation = model.isAnimationEnabled();
      var duration = stateAnimationModel.get('duration');
      var stateTransition = duration > 0 ? {
        duration: duration,
        delay: stateAnimationModel.get('delay'),
        easing: stateAnimationModel.get('easing')
      } : null;
      view.group.traverse(function (el) {
        if (el.states && el.states.emphasis) {
          if (graphic.isElementRemoved(el)) {
            return;
          }

          if (el instanceof graphic.Path) {
            savePathStates(el);
          }

          if (el.__dirty) {
            var prevStates = el.prevStates;

            if (prevStates) {
              el.useStates(prevStates);
            }
          }

          if (enableAnimation) {
            el.stateTransition = stateTransition;
            var textContent = el.getTextContent();
            var textGuide = el.getTextGuideLine();

            if (textContent) {
              textContent.stateTransition = stateTransition;
            }

            if (textGuide) {
              textGuide.stateTransition = stateTransition;
            }
          }

          if (el.__dirty) {
            applyElementStates(el);
          }
        }
      });
    }

    ;

    createExtensionAPI = function (ecIns) {
      return new (function (_super) {
        __extends(class_1, _super);

        function class_1() {
          return _super !== null && _super.apply(this, arguments) || this;
        }

        class_1.prototype.getCoordinateSystems = function () {
          return ecIns._coordSysMgr.getCoordinateSystems();
        };

        class_1.prototype.getComponentByElement = function (el) {
          while (el) {
            var modelInfo = el.__ecComponentInfo;

            if (modelInfo != null) {
              return ecIns._model.getComponent(modelInfo.mainType, modelInfo.index);
            }

            el = el.parent;
          }
        };

        class_1.prototype.enterEmphasis = function (el, highlightDigit) {
          enterEmphasis(el, highlightDigit);
          markStatusToUpdate(ecIns);
        };

        class_1.prototype.leaveEmphasis = function (el, highlightDigit) {
          leaveEmphasis(el, highlightDigit);
          markStatusToUpdate(ecIns);
        };

        class_1.prototype.enterBlur = function (el) {
          enterBlur(el);
          markStatusToUpdate(ecIns);
        };

        class_1.prototype.leaveBlur = function (el) {
          leaveBlur(el);
          markStatusToUpdate(ecIns);
        };

        class_1.prototype.enterSelect = function (el) {
          enterSelect(el);
          markStatusToUpdate(ecIns);
        };

        class_1.prototype.leaveSelect = function (el) {
          leaveSelect(el);
          markStatusToUpdate(ecIns);
        };

        class_1.prototype.getModel = function () {
          return ecIns.getModel();
        };

        class_1.prototype.getViewOfComponentModel = function (componentModel) {
          return ecIns.getViewOfComponentModel(componentModel);
        };

        class_1.prototype.getViewOfSeriesModel = function (seriesModel) {
          return ecIns.getViewOfSeriesModel(seriesModel);
        };

        return class_1;
      }(ExtensionAPI))(ecIns);
    };

    enableConnect = function (chart) {
      function updateConnectedChartsStatus(charts, status) {
        for (var i = 0; i < charts.length; i++) {
          var otherChart = charts[i];
          otherChart[CONNECT_STATUS_KEY] = status;
        }
      }

      each(eventActionMap, function (actionType, eventType) {
        chart._messageCenter.on(eventType, function (event) {
          if (connectedGroups[chart.group] && chart[CONNECT_STATUS_KEY] !== CONNECT_STATUS_PENDING) {
            if (event && event.escapeConnect) {
              return;
            }

            var action_1 = chart.makeActionFromEvent(event);
            var otherCharts_1 = [];
            each(instances, function (otherChart) {
              if (otherChart !== chart && otherChart.group === chart.group) {
                otherCharts_1.push(otherChart);
              }
            });
            updateConnectedChartsStatus(otherCharts_1, CONNECT_STATUS_PENDING);
            each(otherCharts_1, function (otherChart) {
              if (otherChart[CONNECT_STATUS_KEY] !== CONNECT_STATUS_UPDATING) {
                otherChart.dispatchAction(action_1);
              }
            });
            updateConnectedChartsStatus(otherCharts_1, CONNECT_STATUS_UPDATED);
          }
        });
      });
    };

    setTransitionOpt = function (chart, transitionOpt) {
      var ecModel = chart._model;
      zrUtil.each(modelUtil.normalizeToArray(transitionOpt), function (transOpt) {
        var errMsg;
        var fromOpt = transOpt.from;
        var toOpt = transOpt.to;

        if (toOpt == null) {
          if (process.env.NODE_ENV !== 'production') {
            errMsg = '`transition.to` must be specified.';
          }

          throwError(errMsg);
        }

        var finderOpt = {
          includeMainTypes: ['series'],
          enableAll: false,
          enableNone: false
        };
        var fromResult = fromOpt ? modelUtil.parseFinder(ecModel, fromOpt, finderOpt) : null;
        var toResult = modelUtil.parseFinder(ecModel, toOpt, finderOpt);
        var toSeries = toResult.seriesModel;

        if (toSeries == null) {
          errMsg = '';

          if (process.env.NODE_ENV !== 'production') {
            errMsg = '`transition` is only supported on series.';
          }
        }

        if (fromResult && fromResult.seriesModel !== toSeries) {
          errMsg = '';

          if (process.env.NODE_ENV !== 'production') {
            errMsg = '`transition.from` and `transition.to` must be specified to the same series.';
          }
        }

        if (errMsg != null) {
          throwError(errMsg);
        }

        toSeries.__transientTransitionOpt = {
          from: fromOpt ? fromOpt.dimension : null,
          to: toOpt.dimension,
          dividingMethod: transOpt.dividingMethod
        };
      });
    };
  }();

  return ECharts;
}(Eventful);

var echartsProto = ECharts.prototype;
echartsProto.on = createRegisterEventWithLowercaseECharts('on');
echartsProto.off = createRegisterEventWithLowercaseECharts('off');

echartsProto.one = function (eventName, cb, ctx) {
  var self = this;
  deprecateLog('ECharts#one is deprecated.');

  function wrapped() {
    var args2 = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }

    cb && cb.apply && cb.apply(this, args2);
    self.off(eventName, wrapped);
  }

  ;
  this.on.call(this, eventName, wrapped, ctx);
};

var MOUSE_EVENT_NAMES = ['click', 'dblclick', 'mouseover', 'mouseout', 'mousemove', 'mousedown', 'mouseup', 'globalout', 'contextmenu'];

function disposedWarning(id) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Instance ' + id + ' has been disposed');
  }
}

var actions = {};
var eventActionMap = {};
var dataProcessorFuncs = [];
var optionPreprocessorFuncs = [];
var postInitFuncs = [];
var postUpdateFuncs = [];
var visualFuncs = [];
var themeStorage = {};
var loadingEffects = {};
var instances = {};
var connectedGroups = {};
var idBase = +new Date() - 0;
var groupIdBase = +new Date() - 0;
var DOM_ATTRIBUTE_KEY = '_echarts_instance_';
export function init(dom, theme, opts) {
  if (process.env.NODE_ENV !== 'production') {
    if (!dom) {
      throw new Error('Initialize failed: invalid dom.');
    }
  }

  var existInstance = getInstanceByDom(dom);

  if (existInstance) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('There is a chart instance already initialized on the dom.');
    }

    return existInstance;
  }

  if (process.env.NODE_ENV !== 'production') {
    if (zrUtil.isDom(dom) && dom.nodeName.toUpperCase() !== 'CANVAS' && (!dom.clientWidth && (!opts || opts.width == null) || !dom.clientHeight && (!opts || opts.height == null))) {
      console.warn('Can\'t get DOM width or height. Please check ' + 'dom.clientWidth and dom.clientHeight. They should not be 0.' + 'For example, you may need to call this in the callback ' + 'of window.onload.');
    }
  }

  var chart = new ECharts(dom, theme, opts);
  chart.id = 'ec_' + idBase++;
  instances[chart.id] = chart;
  modelUtil.setAttribute(dom, DOM_ATTRIBUTE_KEY, chart.id);
  enableConnect(chart);
  each(postInitFuncs, function (postInitFunc) {
    postInitFunc(chart);
  });
  return chart;
}
export function connect(groupId) {
  if (zrUtil.isArray(groupId)) {
    var charts = groupId;
    groupId = null;
    each(charts, function (chart) {
      if (chart.group != null) {
        groupId = chart.group;
      }
    });
    groupId = groupId || 'g_' + groupIdBase++;
    each(charts, function (chart) {
      chart.group = groupId;
    });
  }

  connectedGroups[groupId] = true;
  return groupId;
}
export function disConnect(groupId) {
  connectedGroups[groupId] = false;
}
export var disconnect = disConnect;
export function dispose(chart) {
  if (typeof chart === 'string') {
    chart = instances[chart];
  } else if (!(chart instanceof ECharts)) {
    chart = getInstanceByDom(chart);
  }

  if (chart instanceof ECharts && !chart.isDisposed()) {
    chart.dispose();
  }
}
export function getInstanceByDom(dom) {
  return instances[modelUtil.getAttribute(dom, DOM_ATTRIBUTE_KEY)];
}
export function getInstanceById(key) {
  return instances[key];
}
export function registerTheme(name, theme) {
  themeStorage[name] = theme;
}
export function registerPreprocessor(preprocessorFunc) {
  optionPreprocessorFuncs.push(preprocessorFunc);
}
export function registerProcessor(priority, processor) {
  normalizeRegister(dataProcessorFuncs, priority, processor, PRIORITY_PROCESSOR_DEFAULT);
}
export function registerPostInit(postInitFunc) {
  postInitFunc && postInitFuncs.push(postInitFunc);
}
export function registerPostUpdate(postUpdateFunc) {
  postUpdateFunc && postUpdateFuncs.push(postUpdateFunc);
}
export function registerAction(actionInfo, eventName, action) {
  if (typeof eventName === 'function') {
    action = eventName;
    eventName = '';
  }

  var actionType = isObject(actionInfo) ? actionInfo.type : [actionInfo, actionInfo = {
    event: eventName
  }][0];
  actionInfo.event = (actionInfo.event || actionType).toLowerCase();
  eventName = actionInfo.event;
  assert(ACTION_REG.test(actionType) && ACTION_REG.test(eventName));

  if (!actions[actionType]) {
    actions[actionType] = {
      action: action,
      actionInfo: actionInfo
    };
  }

  eventActionMap[eventName] = actionType;
}
export function registerCoordinateSystem(type, coordSysCreator) {
  CoordinateSystemManager.register(type, coordSysCreator);
}
export function getCoordinateSystemDimensions(type) {
  var coordSysCreator = CoordinateSystemManager.get(type);

  if (coordSysCreator) {
    return coordSysCreator.getDimensionsInfo ? coordSysCreator.getDimensionsInfo() : coordSysCreator.dimensions.slice();
  }
}
export { registerLocale } from './locale';

function registerLayout(priority, layoutTask) {
  normalizeRegister(visualFuncs, priority, layoutTask, PRIORITY_VISUAL_LAYOUT, 'layout');
}

function registerVisual(priority, visualTask) {
  normalizeRegister(visualFuncs, priority, visualTask, PRIORITY_VISUAL_CHART, 'visual');
}

export { registerLayout, registerVisual };

function normalizeRegister(targetList, priority, fn, defaultPriority, visualType) {
  if (isFunction(priority) || isObject(priority)) {
    fn = priority;
    priority = defaultPriority;
  }

  if (process.env.NODE_ENV !== 'production') {
    if (isNaN(priority) || priority == null) {
      throw new Error('Illegal priority');
    }

    each(targetList, function (wrap) {
      assert(wrap.__raw !== fn);
    });
  }

  var stageHandler = Scheduler.wrapStageHandler(fn, visualType);
  stageHandler.__prio = priority;
  stageHandler.__raw = fn;
  targetList.push(stageHandler);
}

export function registerLoading(name, loadingFx) {
  loadingEffects[name] = loadingFx;
}
export function extendComponentModel(proto) {
  return ComponentModel.extend(proto);
}
export function extendComponentView(proto) {
  return ComponentView.extend(proto);
}
export function extendSeriesModel(proto) {
  return SeriesModel.extend(proto);
}
export function extendChartView(proto) {
  return ChartView.extend(proto);
}
export function setCanvasCreator(creator) {
  zrUtil.$override('createCanvas', creator);
}
export function registerMap(mapName, geoJson, specialAreas) {
  mapDataStorage.registerMap(mapName, geoJson, specialAreas);
}
export function getMap(mapName) {
  var records = mapDataStorage.retrieveMap(mapName);
  return records && records[0] && {
    geoJson: records[0].geoJSON,
    specialAreas: records[0].specialAreas
  };
}
export var registerTransform = registerExternalTransform;
registerVisual(PRIORITY_VISUAL_GLOBAL, seriesStyleTask);
registerVisual(PRIORITY_VISUAL_CHART_DATA_CUSTOM, dataStyleTask);
registerVisual(PRIORITY_VISUAL_CHART_DATA_CUSTOM, dataColorPaletteTask);
registerVisual(PRIORITY_VISUAL_GLOBAL, seriesSymbolTask);
registerVisual(PRIORITY_VISUAL_CHART_DATA_CUSTOM, dataSymbolTask);
registerVisual(PRIORITY_VISUAL_DECAL, decal);
registerPreprocessor(backwardCompat);
registerProcessor(PRIORITY_PROCESSOR_DATASTACK, dataStack);
registerLoading('default', loadingDefault);
registerAction({
  type: HIGHLIGHT_ACTION_TYPE,
  event: HIGHLIGHT_ACTION_TYPE,
  update: HIGHLIGHT_ACTION_TYPE
}, zrUtil.noop);
registerAction({
  type: DOWNPLAY_ACTION_TYPE,
  event: DOWNPLAY_ACTION_TYPE,
  update: DOWNPLAY_ACTION_TYPE
}, zrUtil.noop);
registerAction({
  type: SELECT_ACTION_TYPE,
  event: SELECT_ACTION_TYPE,
  update: SELECT_ACTION_TYPE
}, zrUtil.noop);
registerAction({
  type: UNSELECT_ACTION_TYPE,
  event: UNSELECT_ACTION_TYPE,
  update: UNSELECT_ACTION_TYPE
}, zrUtil.noop);
registerAction({
  type: TOGGLE_SELECT_ACTION_TYPE,
  event: TOGGLE_SELECT_ACTION_TYPE,
  update: TOGGLE_SELECT_ACTION_TYPE
}, zrUtil.noop);
registerTheme('light', lightTheme);
registerTheme('dark', darkTheme);
export var dataTool = {};