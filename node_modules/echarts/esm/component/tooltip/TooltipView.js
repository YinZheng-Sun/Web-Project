
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
import * as zrUtil from 'zrender/esm/core/util';
import env from 'zrender/esm/core/env';
import TooltipHTMLContent from './TooltipHTMLContent';
import TooltipRichContent from './TooltipRichContent';
import * as formatUtil from '../../util/format';
import * as numberUtil from '../../util/number';
import * as graphic from '../../util/graphic';
import findPointFromSeries from '../axisPointer/findPointFromSeries';
import * as layoutUtil from '../../util/layout';
import Model from '../../model/Model';
import * as globalListener from '../axisPointer/globalListener';
import * as axisHelper from '../../coord/axisHelper';
import * as axisPointerViewHelper from '../axisPointer/viewHelper';
import { getTooltipRenderMode } from '../../util/model';
import ComponentView from '../../view/Component';
import { format as timeFormat } from '../../util/time';
import { getECData } from '../../util/innerStore';
import { shouldTooltipConfine } from './helper';
import { normalizeTooltipFormatResult } from '../../model/mixin/dataFormat';
import { createTooltipMarkup, buildTooltipMarkup, TooltipMarkupStyleCreator } from './tooltipMarkup';
import { findEventDispatcher } from '../../util/event';
var bind = zrUtil.bind;
var each = zrUtil.each;
var parsePercent = numberUtil.parsePercent;
var proxyRect = new graphic.Rect({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
});

var TooltipView = function (_super) {
  __extends(TooltipView, _super);

  function TooltipView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = TooltipView.type;
    return _this;
  }

  TooltipView.prototype.init = function (ecModel, api) {
    if (env.node) {
      return;
    }

    var tooltipModel = ecModel.getComponent('tooltip');
    var renderMode = tooltipModel.get('renderMode');
    this._renderMode = getTooltipRenderMode(renderMode);
    this._tooltipContent = this._renderMode === 'richText' ? new TooltipRichContent(api) : new TooltipHTMLContent(api.getDom(), api, {
      appendToBody: tooltipModel.get('appendToBody', true)
    });
  };

  TooltipView.prototype.render = function (tooltipModel, ecModel, api) {
    if (env.node) {
      return;
    }

    this.group.removeAll();
    this._tooltipModel = tooltipModel;
    this._ecModel = ecModel;
    this._api = api;
    this._alwaysShowContent = tooltipModel.get('alwaysShowContent');
    var tooltipContent = this._tooltipContent;
    tooltipContent.update(tooltipModel);
    tooltipContent.setEnterable(tooltipModel.get('enterable'));

    this._initGlobalListener();

    this._keepShow();
  };

  TooltipView.prototype._initGlobalListener = function () {
    var tooltipModel = this._tooltipModel;
    var triggerOn = tooltipModel.get('triggerOn');
    globalListener.register('itemTooltip', this._api, bind(function (currTrigger, e, dispatchAction) {
      if (triggerOn !== 'none') {
        if (triggerOn.indexOf(currTrigger) >= 0) {
          this._tryShow(e, dispatchAction);
        } else if (currTrigger === 'leave') {
          this._hide(dispatchAction);
        }
      }
    }, this));
  };

  TooltipView.prototype._keepShow = function () {
    var tooltipModel = this._tooltipModel;
    var ecModel = this._ecModel;
    var api = this._api;

    if (this._lastX != null && this._lastY != null && tooltipModel.get('triggerOn') !== 'none') {
      var self_1 = this;
      clearTimeout(this._refreshUpdateTimeout);
      this._refreshUpdateTimeout = setTimeout(function () {
        !api.isDisposed() && self_1.manuallyShowTip(tooltipModel, ecModel, api, {
          x: self_1._lastX,
          y: self_1._lastY,
          dataByCoordSys: self_1._lastDataByCoordSys
        });
      });
    }
  };

  TooltipView.prototype.manuallyShowTip = function (tooltipModel, ecModel, api, payload) {
    if (payload.from === this.uid || env.node) {
      return;
    }

    var dispatchAction = makeDispatchAction(payload, api);
    this._ticket = '';
    var dataByCoordSys = payload.dataByCoordSys;

    if (payload.tooltip && payload.x != null && payload.y != null) {
      var el = proxyRect;
      el.x = payload.x;
      el.y = payload.y;
      el.update();
      el.tooltip = payload.tooltip;

      this._tryShow({
        offsetX: payload.x,
        offsetY: payload.y,
        target: el
      }, dispatchAction);
    } else if (dataByCoordSys) {
      this._tryShow({
        offsetX: payload.x,
        offsetY: payload.y,
        position: payload.position,
        dataByCoordSys: dataByCoordSys,
        tooltipOption: payload.tooltipOption
      }, dispatchAction);
    } else if (payload.seriesIndex != null) {
      if (this._manuallyAxisShowTip(tooltipModel, ecModel, api, payload)) {
        return;
      }

      var pointInfo = findPointFromSeries(payload, ecModel);
      var cx = pointInfo.point[0];
      var cy = pointInfo.point[1];

      if (cx != null && cy != null) {
        this._tryShow({
          offsetX: cx,
          offsetY: cy,
          position: payload.position,
          target: pointInfo.el
        }, dispatchAction);
      }
    } else if (payload.x != null && payload.y != null) {
      api.dispatchAction({
        type: 'updateAxisPointer',
        x: payload.x,
        y: payload.y
      });

      this._tryShow({
        offsetX: payload.x,
        offsetY: payload.y,
        position: payload.position,
        target: api.getZr().findHover(payload.x, payload.y).target
      }, dispatchAction);
    }
  };

  TooltipView.prototype.manuallyHideTip = function (tooltipModel, ecModel, api, payload) {
    var tooltipContent = this._tooltipContent;

    if (!this._alwaysShowContent && this._tooltipModel) {
      tooltipContent.hideLater(this._tooltipModel.get('hideDelay'));
    }

    this._lastX = this._lastY = this._lastDataByCoordSys = null;

    if (payload.from !== this.uid) {
      this._hide(makeDispatchAction(payload, api));
    }
  };

  TooltipView.prototype._manuallyAxisShowTip = function (tooltipModel, ecModel, api, payload) {
    var seriesIndex = payload.seriesIndex;
    var dataIndex = payload.dataIndex;
    var coordSysAxesInfo = ecModel.getComponent('axisPointer').coordSysAxesInfo;

    if (seriesIndex == null || dataIndex == null || coordSysAxesInfo == null) {
      return;
    }

    var seriesModel = ecModel.getSeriesByIndex(seriesIndex);

    if (!seriesModel) {
      return;
    }

    var data = seriesModel.getData();
    var tooltipCascadedModel = buildTooltipModel([data.getItemModel(dataIndex), seriesModel, (seriesModel.coordinateSystem || {}).model, tooltipModel]);

    if (tooltipCascadedModel.get('trigger') !== 'axis') {
      return;
    }

    api.dispatchAction({
      type: 'updateAxisPointer',
      seriesIndex: seriesIndex,
      dataIndex: dataIndex,
      position: payload.position
    });
    return true;
  };

  TooltipView.prototype._tryShow = function (e, dispatchAction) {
    var el = e.target;
    var tooltipModel = this._tooltipModel;

    if (!tooltipModel) {
      return;
    }

    this._lastX = e.offsetX;
    this._lastY = e.offsetY;
    var dataByCoordSys = e.dataByCoordSys;

    if (dataByCoordSys && dataByCoordSys.length) {
      this._showAxisTooltip(dataByCoordSys, e);
    } else if (el && findEventDispatcher(el, function (target) {
      return getECData(target).dataIndex != null;
    })) {
      this._lastDataByCoordSys = null;

      this._showSeriesItemTooltip(e, el, dispatchAction);
    } else if (el && el.tooltip) {
      this._lastDataByCoordSys = null;

      this._showComponentItemTooltip(e, el, dispatchAction);
    } else {
      this._lastDataByCoordSys = null;

      this._hide(dispatchAction);
    }
  };

  TooltipView.prototype._showOrMove = function (tooltipModel, cb) {
    var delay = tooltipModel.get('showDelay');
    cb = zrUtil.bind(cb, this);
    clearTimeout(this._showTimout);
    delay > 0 ? this._showTimout = setTimeout(cb, delay) : cb();
  };

  TooltipView.prototype._showAxisTooltip = function (dataByCoordSys, e) {
    var ecModel = this._ecModel;
    var globalTooltipModel = this._tooltipModel;
    var point = [e.offsetX, e.offsetY];
    var singleTooltipModel = buildTooltipModel([e.tooltipOption, globalTooltipModel]);
    var renderMode = this._renderMode;
    var cbParamsList = [];
    var articleMarkup = createTooltipMarkup('section', {
      blocks: [],
      noHeader: true
    });
    var markupTextArrLegacy = [];
    var markupStyleCreator = new TooltipMarkupStyleCreator();
    each(dataByCoordSys, function (itemCoordSys) {
      each(itemCoordSys.dataByAxis, function (axisItem) {
        var axisModel = ecModel.getComponent(axisItem.axisDim + 'Axis', axisItem.axisIndex);
        var axisValue = axisItem.value;

        if (!axisModel || axisValue == null) {
          return;
        }

        var axisValueLabel = axisPointerViewHelper.getValueLabel(axisValue, axisModel.axis, ecModel, axisItem.seriesDataIndices, axisItem.valueLabelOpt);
        var axisSectionMarkup = createTooltipMarkup('section', {
          header: axisValueLabel,
          noHeader: !zrUtil.trim(axisValueLabel),
          sortBlocks: true,
          blocks: []
        });
        articleMarkup.blocks.push(axisSectionMarkup);
        zrUtil.each(axisItem.seriesDataIndices, function (idxItem) {
          var series = ecModel.getSeriesByIndex(idxItem.seriesIndex);
          var dataIndex = idxItem.dataIndexInside;
          var cbParams = series.getDataParams(dataIndex);
          cbParams.axisDim = axisItem.axisDim;
          cbParams.axisIndex = axisItem.axisIndex;
          cbParams.axisType = axisItem.axisType;
          cbParams.axisId = axisItem.axisId;
          cbParams.axisValue = axisHelper.getAxisRawValue(axisModel.axis, {
            value: axisValue
          });
          cbParams.axisValueLabel = axisValueLabel;
          cbParams.marker = markupStyleCreator.makeTooltipMarker('item', formatUtil.convertToColorString(cbParams.color), renderMode);
          var seriesTooltipResult = normalizeTooltipFormatResult(series.formatTooltip(dataIndex, true, null));

          if (seriesTooltipResult.markupFragment) {
            axisSectionMarkup.blocks.push(seriesTooltipResult.markupFragment);
          }

          if (seriesTooltipResult.markupText) {
            markupTextArrLegacy.push(seriesTooltipResult.markupText);
          }

          cbParamsList.push(cbParams);
        });
      });
    });
    articleMarkup.blocks.reverse();
    markupTextArrLegacy.reverse();
    var positionExpr = e.position;
    var orderMode = singleTooltipModel.get('order');
    var builtMarkupText = buildTooltipMarkup(articleMarkup, markupStyleCreator, renderMode, orderMode, ecModel.get('useUTC'));
    builtMarkupText && markupTextArrLegacy.unshift(builtMarkupText);
    var blockBreak = renderMode === 'richText' ? '\n\n' : '<br/>';
    var allMarkupText = markupTextArrLegacy.join(blockBreak);

    this._showOrMove(singleTooltipModel, function () {
      if (this._updateContentNotChangedOnAxis(dataByCoordSys)) {
        this._updatePosition(singleTooltipModel, positionExpr, point[0], point[1], this._tooltipContent, cbParamsList);
      } else {
        this._showTooltipContent(singleTooltipModel, allMarkupText, cbParamsList, Math.random() + '', point[0], point[1], positionExpr, null, markupStyleCreator);
      }
    });
  };

  TooltipView.prototype._showSeriesItemTooltip = function (e, el, dispatchAction) {
    var dispatcher = findEventDispatcher(el, function (target) {
      return getECData(target).dataIndex != null;
    });
    var ecModel = this._ecModel;
    var ecData = getECData(dispatcher);
    var seriesIndex = ecData.seriesIndex;
    var seriesModel = ecModel.getSeriesByIndex(seriesIndex);
    var dataModel = ecData.dataModel || seriesModel;
    var dataIndex = ecData.dataIndex;
    var dataType = ecData.dataType;
    var data = dataModel.getData(dataType);
    var renderMode = this._renderMode;
    var tooltipModel = buildTooltipModel([data.getItemModel(dataIndex), dataModel, seriesModel && (seriesModel.coordinateSystem || {}).model, this._tooltipModel]);
    var tooltipTrigger = tooltipModel.get('trigger');

    if (tooltipTrigger != null && tooltipTrigger !== 'item') {
      return;
    }

    var params = dataModel.getDataParams(dataIndex, dataType);
    var markupStyleCreator = new TooltipMarkupStyleCreator();
    params.marker = markupStyleCreator.makeTooltipMarker('item', formatUtil.convertToColorString(params.color), renderMode);
    var seriesTooltipResult = normalizeTooltipFormatResult(dataModel.formatTooltip(dataIndex, false, dataType));
    var orderMode = tooltipModel.get('order');
    var markupText = seriesTooltipResult.markupFragment ? buildTooltipMarkup(seriesTooltipResult.markupFragment, markupStyleCreator, renderMode, orderMode, ecModel.get('useUTC')) : seriesTooltipResult.markupText;
    var asyncTicket = 'item_' + dataModel.name + '_' + dataIndex;

    this._showOrMove(tooltipModel, function () {
      this._showTooltipContent(tooltipModel, markupText, params, asyncTicket, e.offsetX, e.offsetY, e.position, e.target, markupStyleCreator);
    });

    dispatchAction({
      type: 'showTip',
      dataIndexInside: dataIndex,
      dataIndex: data.getRawIndex(dataIndex),
      seriesIndex: seriesIndex,
      from: this.uid
    });
  };

  TooltipView.prototype._showComponentItemTooltip = function (e, el, dispatchAction) {
    var tooltipOpt = el.tooltip;

    if (zrUtil.isString(tooltipOpt)) {
      var content = tooltipOpt;
      tooltipOpt = {
        content: content,
        formatter: content
      };
    }

    var subTooltipModel = new Model(tooltipOpt, this._tooltipModel, this._ecModel);
    var defaultHtml = subTooltipModel.get('content');
    var asyncTicket = Math.random() + '';
    var markupStyleCreator = new TooltipMarkupStyleCreator();

    this._showOrMove(subTooltipModel, function () {
      this._showTooltipContent(subTooltipModel, defaultHtml, subTooltipModel.get('formatterParams') || {}, asyncTicket, e.offsetX, e.offsetY, e.position, el, markupStyleCreator);
    });

    dispatchAction({
      type: 'showTip',
      from: this.uid
    });
  };

  TooltipView.prototype._showTooltipContent = function (tooltipModel, defaultHtml, params, asyncTicket, x, y, positionExpr, el, markupStyleCreator) {
    this._ticket = '';

    if (!tooltipModel.get('showContent') || !tooltipModel.get('show')) {
      return;
    }

    var tooltipContent = this._tooltipContent;
    var formatter = tooltipModel.get('formatter');
    positionExpr = positionExpr || tooltipModel.get('position');
    var html = defaultHtml;

    var nearPoint = this._getNearestPoint([x, y], params, tooltipModel.get('trigger'));

    if (formatter && zrUtil.isString(formatter)) {
      var useUTC = tooltipModel.ecModel.get('useUTC');
      var params0 = zrUtil.isArray(params) ? params[0] : params;
      var isTimeAxis = params0 && params0.axisType && params0.axisType.indexOf('time') >= 0;
      html = formatter;

      if (isTimeAxis) {
        html = timeFormat(params0.axisValue, html, useUTC);
      }

      html = formatUtil.formatTpl(html, params, true);
    } else if (zrUtil.isFunction(formatter)) {
      var callback = bind(function (cbTicket, html) {
        if (cbTicket === this._ticket) {
          tooltipContent.setContent(html, markupStyleCreator, tooltipModel, nearPoint.color, positionExpr);

          this._updatePosition(tooltipModel, positionExpr, x, y, tooltipContent, params, el);
        }
      }, this);
      this._ticket = asyncTicket;
      html = formatter(params, asyncTicket, callback);
    }

    tooltipContent.setContent(html, markupStyleCreator, tooltipModel, nearPoint.color, positionExpr);
    tooltipContent.show(tooltipModel, nearPoint.color);

    this._updatePosition(tooltipModel, positionExpr, x, y, tooltipContent, params, el);
  };

  TooltipView.prototype._getNearestPoint = function (point, tooltipDataParams, trigger) {
    if (trigger === 'axis' || zrUtil.isArray(tooltipDataParams)) {
      return {
        color: this._renderMode === 'html' ? '#fff' : 'none'
      };
    }

    if (!zrUtil.isArray(tooltipDataParams)) {
      return {
        color: tooltipDataParams.color || tooltipDataParams.borderColor
      };
    }
  };

  TooltipView.prototype._updatePosition = function (tooltipModel, positionExpr, x, y, content, params, el) {
    var viewWidth = this._api.getWidth();

    var viewHeight = this._api.getHeight();

    positionExpr = positionExpr || tooltipModel.get('position');
    var contentSize = content.getSize();
    var align = tooltipModel.get('align');
    var vAlign = tooltipModel.get('verticalAlign');
    var rect = el && el.getBoundingRect().clone();
    el && rect.applyTransform(el.transform);

    if (zrUtil.isFunction(positionExpr)) {
      positionExpr = positionExpr([x, y], params, content.el, rect, {
        viewSize: [viewWidth, viewHeight],
        contentSize: contentSize.slice()
      });
    }

    if (zrUtil.isArray(positionExpr)) {
      x = parsePercent(positionExpr[0], viewWidth);
      y = parsePercent(positionExpr[1], viewHeight);
    } else if (zrUtil.isObject(positionExpr)) {
      var boxLayoutPosition = positionExpr;
      boxLayoutPosition.width = contentSize[0];
      boxLayoutPosition.height = contentSize[1];
      var layoutRect = layoutUtil.getLayoutRect(boxLayoutPosition, {
        width: viewWidth,
        height: viewHeight
      });
      x = layoutRect.x;
      y = layoutRect.y;
      align = null;
      vAlign = null;
    } else if (zrUtil.isString(positionExpr) && el) {
      var pos = calcTooltipPosition(positionExpr, rect, contentSize);
      x = pos[0];
      y = pos[1];
    } else {
      var pos = refixTooltipPosition(x, y, content, viewWidth, viewHeight, align ? null : 20, vAlign ? null : 20);
      x = pos[0];
      y = pos[1];
    }

    align && (x -= isCenterAlign(align) ? contentSize[0] / 2 : align === 'right' ? contentSize[0] : 0);
    vAlign && (y -= isCenterAlign(vAlign) ? contentSize[1] / 2 : vAlign === 'bottom' ? contentSize[1] : 0);

    if (shouldTooltipConfine(tooltipModel)) {
      var pos = confineTooltipPosition(x, y, content, viewWidth, viewHeight);
      x = pos[0];
      y = pos[1];
    }

    content.moveTo(x, y);
  };

  TooltipView.prototype._updateContentNotChangedOnAxis = function (dataByCoordSys) {
    var lastCoordSys = this._lastDataByCoordSys;
    var contentNotChanged = !!lastCoordSys && lastCoordSys.length === dataByCoordSys.length;
    contentNotChanged && each(lastCoordSys, function (lastItemCoordSys, indexCoordSys) {
      var lastDataByAxis = lastItemCoordSys.dataByAxis || [];
      var thisItemCoordSys = dataByCoordSys[indexCoordSys] || {};
      var thisDataByAxis = thisItemCoordSys.dataByAxis || [];
      contentNotChanged = contentNotChanged && lastDataByAxis.length === thisDataByAxis.length;
      contentNotChanged && each(lastDataByAxis, function (lastItem, indexAxis) {
        var thisItem = thisDataByAxis[indexAxis] || {};
        var lastIndices = lastItem.seriesDataIndices || [];
        var newIndices = thisItem.seriesDataIndices || [];
        contentNotChanged = contentNotChanged && lastItem.value === thisItem.value && lastItem.axisType === thisItem.axisType && lastItem.axisId === thisItem.axisId && lastIndices.length === newIndices.length;
        contentNotChanged && each(lastIndices, function (lastIdxItem, j) {
          var newIdxItem = newIndices[j];
          contentNotChanged = contentNotChanged && lastIdxItem.seriesIndex === newIdxItem.seriesIndex && lastIdxItem.dataIndex === newIdxItem.dataIndex;
        });
      });
    });
    this._lastDataByCoordSys = dataByCoordSys;
    return !!contentNotChanged;
  };

  TooltipView.prototype._hide = function (dispatchAction) {
    this._lastDataByCoordSys = null;
    dispatchAction({
      type: 'hideTip',
      from: this.uid
    });
  };

  TooltipView.prototype.dispose = function (ecModel, api) {
    if (env.node) {
      return;
    }

    this._tooltipContent.dispose();

    globalListener.unregister('itemTooltip', api);
  };

  TooltipView.type = 'tooltip';
  return TooltipView;
}(ComponentView);

function buildTooltipModel(modelCascade) {
  var resultModel = modelCascade.pop();

  while (modelCascade.length) {
    var tooltipOpt = modelCascade.pop();

    if (tooltipOpt) {
      if (tooltipOpt instanceof Model) {
        tooltipOpt = tooltipOpt.get('tooltip', true);
      }

      if (zrUtil.isString(tooltipOpt)) {
        tooltipOpt = {
          formatter: tooltipOpt
        };
      }

      resultModel = new Model(tooltipOpt, resultModel, resultModel.ecModel);
    }
  }

  return resultModel;
}

function makeDispatchAction(payload, api) {
  return payload.dispatchAction || zrUtil.bind(api.dispatchAction, api);
}

function refixTooltipPosition(x, y, content, viewWidth, viewHeight, gapH, gapV) {
  var size = content.getOuterSize();
  var width = size.width;
  var height = size.height;

  if (gapH != null) {
    if (x + width + gapH + 2 > viewWidth) {
      x -= width + gapH;
    } else {
      x += gapH;
    }
  }

  if (gapV != null) {
    if (y + height + gapV > viewHeight) {
      y -= height + gapV;
    } else {
      y += gapV;
    }
  }

  return [x, y];
}

function confineTooltipPosition(x, y, content, viewWidth, viewHeight) {
  var size = content.getOuterSize();
  var width = size.width;
  var height = size.height;
  x = Math.min(x + width, viewWidth) - width;
  y = Math.min(y + height, viewHeight) - height;
  x = Math.max(x, 0);
  y = Math.max(y, 0);
  return [x, y];
}

function calcTooltipPosition(position, rect, contentSize) {
  var domWidth = contentSize[0];
  var domHeight = contentSize[1];
  var gap = 10;
  var offset = 5;
  var x = 0;
  var y = 0;
  var rectWidth = rect.width;
  var rectHeight = rect.height;

  switch (position) {
    case 'inside':
      x = rect.x + rectWidth / 2 - domWidth / 2;
      y = rect.y + rectHeight / 2 - domHeight / 2;
      break;

    case 'top':
      x = rect.x + rectWidth / 2 - domWidth / 2;
      y = rect.y - domHeight - gap;
      break;

    case 'bottom':
      x = rect.x + rectWidth / 2 - domWidth / 2;
      y = rect.y + rectHeight + gap;
      break;

    case 'left':
      x = rect.x - domWidth - gap - offset;
      y = rect.y + rectHeight / 2 - domHeight / 2;
      break;

    case 'right':
      x = rect.x + rectWidth + gap + offset;
      y = rect.y + rectHeight / 2 - domHeight / 2;
  }

  return [x, y];
}

function isCenterAlign(align) {
  return align === 'center' || align === 'middle';
}

ComponentView.registerClass(TooltipView);