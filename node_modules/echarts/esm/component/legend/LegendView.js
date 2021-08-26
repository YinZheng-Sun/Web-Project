
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
import { createSymbol } from '../../util/symbol';
import * as graphic from '../../util/graphic';
import { enableHoverEmphasis } from '../../util/states';
import { setLabelStyle, createTextStyle } from '../../label/labelStyle';
import { makeBackground } from '../helper/listComponent';
import * as layoutUtil from '../../util/layout';
import ComponentView from '../../view/Component';
import { parse, stringify } from 'zrender/esm/tool/color';
var curry = zrUtil.curry;
var each = zrUtil.each;
var Group = graphic.Group;

var LegendView = function (_super) {
  __extends(LegendView, _super);

  function LegendView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = LegendView.type;
    _this.newlineDisabled = false;
    return _this;
  }

  LegendView.prototype.init = function () {
    this.group.add(this._contentGroup = new Group());
    this.group.add(this._selectorGroup = new Group());
    this._isFirstRender = true;
  };

  LegendView.prototype.getContentGroup = function () {
    return this._contentGroup;
  };

  LegendView.prototype.getSelectorGroup = function () {
    return this._selectorGroup;
  };

  LegendView.prototype.render = function (legendModel, ecModel, api) {
    var isFirstRender = this._isFirstRender;
    this._isFirstRender = false;
    this.resetInner();

    if (!legendModel.get('show', true)) {
      return;
    }

    var itemAlign = legendModel.get('align');
    var orient = legendModel.get('orient');

    if (!itemAlign || itemAlign === 'auto') {
      itemAlign = legendModel.get('left') === 'right' && orient === 'vertical' ? 'right' : 'left';
    }

    var selector = legendModel.get('selector', true);
    var selectorPosition = legendModel.get('selectorPosition', true);

    if (selector && (!selectorPosition || selectorPosition === 'auto')) {
      selectorPosition = orient === 'horizontal' ? 'end' : 'start';
    }

    this.renderInner(itemAlign, legendModel, ecModel, api, selector, orient, selectorPosition);
    var positionInfo = legendModel.getBoxLayoutParams();
    var viewportSize = {
      width: api.getWidth(),
      height: api.getHeight()
    };
    var padding = legendModel.get('padding');
    var maxSize = layoutUtil.getLayoutRect(positionInfo, viewportSize, padding);
    var mainRect = this.layoutInner(legendModel, itemAlign, maxSize, isFirstRender, selector, selectorPosition);
    var layoutRect = layoutUtil.getLayoutRect(zrUtil.defaults({
      width: mainRect.width,
      height: mainRect.height
    }, positionInfo), viewportSize, padding);
    this.group.x = layoutRect.x - mainRect.x;
    this.group.y = layoutRect.y - mainRect.y;
    this.group.markRedraw();
    this.group.add(this._backgroundEl = makeBackground(mainRect, legendModel));
  };

  LegendView.prototype.resetInner = function () {
    this.getContentGroup().removeAll();
    this._backgroundEl && this.group.remove(this._backgroundEl);
    this.getSelectorGroup().removeAll();
  };

  LegendView.prototype.renderInner = function (itemAlign, legendModel, ecModel, api, selector, orient, selectorPosition) {
    var contentGroup = this.getContentGroup();
    var legendDrawnMap = zrUtil.createHashMap();
    var selectMode = legendModel.get('selectedMode');
    var excludeSeriesId = [];
    ecModel.eachRawSeries(function (seriesModel) {
      !seriesModel.get('legendHoverLink') && excludeSeriesId.push(seriesModel.id);
    });
    each(legendModel.getData(), function (itemModel, dataIndex) {
      var name = itemModel.get('name');

      if (!this.newlineDisabled && (name === '' || name === '\n')) {
        var g = new Group();
        g.newline = true;
        contentGroup.add(g);
        return;
      }

      var seriesModel = ecModel.getSeriesByName(name)[0];

      if (legendDrawnMap.get(name)) {
        return;
      }

      if (seriesModel) {
        var data = seriesModel.getData();
        var style = data.getVisual('style');
        var color = style[data.getVisual('drawType')] || style.fill;
        var borderColor = style.stroke;
        var decal = style.decal;
        var legendSymbolType = data.getVisual('legendSymbol') || 'roundRect';
        var symbolType = data.getVisual('symbol');

        var itemGroup = this._createItem(name, dataIndex, itemModel, legendModel, legendSymbolType, symbolType, itemAlign, color, borderColor, decal, selectMode);

        itemGroup.on('click', curry(dispatchSelectAction, name, null, api, excludeSeriesId)).on('mouseover', curry(dispatchHighlightAction, seriesModel.name, null, api, excludeSeriesId)).on('mouseout', curry(dispatchDownplayAction, seriesModel.name, null, api, excludeSeriesId));
        legendDrawnMap.set(name, true);
      } else {
        ecModel.eachRawSeries(function (seriesModel) {
          if (legendDrawnMap.get(name)) {
            return;
          }

          if (seriesModel.legendVisualProvider) {
            var provider = seriesModel.legendVisualProvider;

            if (!provider.containName(name)) {
              return;
            }

            var idx = provider.indexOfName(name);
            var style = provider.getItemVisual(idx, 'style');
            var borderColor = style.stroke;
            var decal = style.decal;
            var color = style.fill;
            var colorArr = parse(style.fill);

            if (colorArr && colorArr[3] === 0) {
              colorArr[3] = 0.2;
              color = stringify(colorArr, 'rgba');
            }

            var legendSymbolType = 'roundRect';

            var itemGroup = this._createItem(name, dataIndex, itemModel, legendModel, legendSymbolType, null, itemAlign, color, borderColor, decal, selectMode);

            itemGroup.on('click', curry(dispatchSelectAction, null, name, api, excludeSeriesId)).on('mouseover', curry(dispatchHighlightAction, null, name, api, excludeSeriesId)).on('mouseout', curry(dispatchDownplayAction, null, name, api, excludeSeriesId));
            legendDrawnMap.set(name, true);
          }
        }, this);
      }

      if (process.env.NODE_ENV !== 'production') {
        if (!legendDrawnMap.get(name)) {
          console.warn(name + ' series not exists. Legend data should be same with series name or data name.');
        }
      }
    }, this);

    if (selector) {
      this._createSelector(selector, legendModel, api, orient, selectorPosition);
    }
  };

  LegendView.prototype._createSelector = function (selector, legendModel, api, orient, selectorPosition) {
    var selectorGroup = this.getSelectorGroup();
    each(selector, function createSelectorButton(selectorItem) {
      var type = selectorItem.type;
      var labelText = new graphic.Text({
        style: {
          x: 0,
          y: 0,
          align: 'center',
          verticalAlign: 'middle'
        },
        onclick: function () {
          api.dispatchAction({
            type: type === 'all' ? 'legendAllSelect' : 'legendInverseSelect'
          });
        }
      });
      selectorGroup.add(labelText);
      var labelModel = legendModel.getModel('selectorLabel');
      var emphasisLabelModel = legendModel.getModel(['emphasis', 'selectorLabel']);
      setLabelStyle(labelText, {
        normal: labelModel,
        emphasis: emphasisLabelModel
      }, {
        defaultText: selectorItem.title
      });
      enableHoverEmphasis(labelText);
    });
  };

  LegendView.prototype._createItem = function (name, dataIndex, itemModel, legendModel, legendSymbolType, symbolType, itemAlign, color, borderColor, decal, selectMode) {
    var itemWidth = legendModel.get('itemWidth');
    var itemHeight = legendModel.get('itemHeight');
    var inactiveColor = legendModel.get('inactiveColor');
    var inactiveBorderColor = legendModel.get('inactiveBorderColor');
    var symbolKeepAspect = legendModel.get('symbolKeepAspect');
    var legendModelItemStyle = legendModel.getModel('itemStyle');
    var isSelected = legendModel.isSelected(name);
    var itemGroup = new Group();
    var textStyleModel = itemModel.getModel('textStyle');
    var itemIcon = itemModel.get('icon');
    var tooltipModel = itemModel.getModel('tooltip');
    var legendGlobalTooltipModel = tooltipModel.parentModel;
    legendSymbolType = itemIcon || legendSymbolType;
    var legendSymbol = createSymbol(legendSymbolType, 0, 0, itemWidth, itemHeight, isSelected ? color : inactiveColor, symbolKeepAspect == null ? true : symbolKeepAspect);
    itemGroup.add(setSymbolStyle(legendSymbol, legendSymbolType, legendModelItemStyle, borderColor, inactiveBorderColor, decal, isSelected));

    if (!itemIcon && symbolType && (symbolType !== legendSymbolType || symbolType === 'none')) {
      var size = itemHeight * 0.8;

      if (symbolType === 'none') {
        symbolType = 'circle';
      }

      var legendSymbolCenter = createSymbol(symbolType, (itemWidth - size) / 2, (itemHeight - size) / 2, size, size, isSelected ? color : inactiveColor, symbolKeepAspect == null ? true : symbolKeepAspect);
      itemGroup.add(setSymbolStyle(legendSymbolCenter, symbolType, legendModelItemStyle, borderColor, inactiveBorderColor, decal, isSelected));
    }

    var textX = itemAlign === 'left' ? itemWidth + 5 : -5;
    var textAlign = itemAlign;
    var formatter = legendModel.get('formatter');
    var content = name;

    if (typeof formatter === 'string' && formatter) {
      content = formatter.replace('{name}', name != null ? name : '');
    } else if (typeof formatter === 'function') {
      content = formatter(name);
    }

    itemGroup.add(new graphic.Text({
      style: createTextStyle(textStyleModel, {
        text: content,
        x: textX,
        y: itemHeight / 2,
        fill: isSelected ? textStyleModel.getTextColor() : inactiveColor,
        align: textAlign,
        verticalAlign: 'middle'
      })
    }));
    var hitRect = new graphic.Rect({
      shape: itemGroup.getBoundingRect(),
      invisible: true
    });

    if (tooltipModel.get('show')) {
      var formatterParams = {
        componentType: 'legend',
        legendIndex: legendModel.componentIndex,
        name: name,
        $vars: ['name']
      };
      hitRect.tooltip = zrUtil.extend({
        content: name,
        formatter: legendGlobalTooltipModel.get('formatter', true) || function (params) {
          return params.name;
        },
        formatterParams: formatterParams
      }, tooltipModel.option);
    }

    itemGroup.add(hitRect);
    itemGroup.eachChild(function (child) {
      child.silent = true;
    });
    hitRect.silent = !selectMode;
    this.getContentGroup().add(itemGroup);
    enableHoverEmphasis(itemGroup);
    itemGroup.__legendDataIndex = dataIndex;
    return itemGroup;
  };

  LegendView.prototype.layoutInner = function (legendModel, itemAlign, maxSize, isFirstRender, selector, selectorPosition) {
    var contentGroup = this.getContentGroup();
    var selectorGroup = this.getSelectorGroup();
    layoutUtil.box(legendModel.get('orient'), contentGroup, legendModel.get('itemGap'), maxSize.width, maxSize.height);
    var contentRect = contentGroup.getBoundingRect();
    var contentPos = [-contentRect.x, -contentRect.y];
    selectorGroup.markRedraw();
    contentGroup.markRedraw();

    if (selector) {
      layoutUtil.box('horizontal', selectorGroup, legendModel.get('selectorItemGap', true));
      var selectorRect = selectorGroup.getBoundingRect();
      var selectorPos = [-selectorRect.x, -selectorRect.y];
      var selectorButtonGap = legendModel.get('selectorButtonGap', true);
      var orientIdx = legendModel.getOrient().index;
      var wh = orientIdx === 0 ? 'width' : 'height';
      var hw = orientIdx === 0 ? 'height' : 'width';
      var yx = orientIdx === 0 ? 'y' : 'x';

      if (selectorPosition === 'end') {
        selectorPos[orientIdx] += contentRect[wh] + selectorButtonGap;
      } else {
        contentPos[orientIdx] += selectorRect[wh] + selectorButtonGap;
      }

      selectorPos[1 - orientIdx] += contentRect[hw] / 2 - selectorRect[hw] / 2;
      selectorGroup.x = selectorPos[0];
      selectorGroup.y = selectorPos[1];
      contentGroup.x = contentPos[0];
      contentGroup.y = contentPos[1];
      var mainRect = {
        x: 0,
        y: 0
      };
      mainRect[wh] = contentRect[wh] + selectorButtonGap + selectorRect[wh];
      mainRect[hw] = Math.max(contentRect[hw], selectorRect[hw]);
      mainRect[yx] = Math.min(0, selectorRect[yx] + selectorPos[1 - orientIdx]);
      return mainRect;
    } else {
      contentGroup.x = contentPos[0];
      contentGroup.y = contentPos[1];
      return this.group.getBoundingRect();
    }
  };

  LegendView.prototype.remove = function () {
    this.getContentGroup().removeAll();
    this._isFirstRender = true;
  };

  LegendView.type = 'legend.plain';
  return LegendView;
}(ComponentView);

function setSymbolStyle(symbol, symbolType, legendModelItemStyle, borderColor, inactiveBorderColor, decal, isSelected) {
  var itemStyle;

  if (symbolType !== 'line' && symbolType.indexOf('empty') < 0) {
    itemStyle = legendModelItemStyle.getItemStyle();
    symbol.style.stroke = borderColor;
    symbol.style.decal = decal;

    if (!isSelected) {
      itemStyle.stroke = inactiveBorderColor;
    }
  } else {
    itemStyle = legendModelItemStyle.getItemStyle(['borderWidth', 'borderColor']);
  }

  symbol.setStyle(itemStyle);
  return symbol;
}

function dispatchSelectAction(seriesName, dataName, api, excludeSeriesId) {
  dispatchDownplayAction(seriesName, dataName, api, excludeSeriesId);
  api.dispatchAction({
    type: 'legendToggleSelect',
    name: seriesName != null ? seriesName : dataName
  });
  dispatchHighlightAction(seriesName, dataName, api, excludeSeriesId);
}

function isUseHoverLayer(api) {
  var list = api.getZr().storage.getDisplayList();
  var emphasisState;
  var i = 0;
  var len = list.length;

  while (i < len && !(emphasisState = list[i].states.emphasis)) {
    i++;
  }

  return emphasisState && emphasisState.hoverLayer;
}

function dispatchHighlightAction(seriesName, dataName, api, excludeSeriesId) {
  if (!isUseHoverLayer(api)) {
    api.dispatchAction({
      type: 'highlight',
      seriesName: seriesName,
      name: dataName,
      excludeSeriesId: excludeSeriesId
    });
  }
}

function dispatchDownplayAction(seriesName, dataName, api, excludeSeriesId) {
  if (!isUseHoverLayer(api)) {
    api.dispatchAction({
      type: 'downplay',
      seriesName: seriesName,
      name: dataName,
      excludeSeriesId: excludeSeriesId
    });
  }
}

ComponentView.registerClass(LegendView);
export default LegendView;