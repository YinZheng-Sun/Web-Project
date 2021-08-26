
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
import Path from 'zrender/esm/graphic/Path';
import Group from 'zrender/esm/graphic/Group';
import { extend, map, defaults, each } from 'zrender/esm/core/util';
import { Rect, Sector, updateProps, initProps, removeElementWithFadeOut } from '../../util/graphic';
import { getECData } from '../../util/innerStore';
import { enableHoverEmphasis, setStatesStylesFromModel } from '../../util/states';
import { setLabelStyle, getLabelStatesModels, setLabelValueAnimation } from '../../label/labelStyle';
import { throttle } from '../../util/throttle';
import { createClipPath } from '../helper/createClipPathFromCoordSys';
import Sausage from '../../util/shape/sausage';
import ChartView from '../../view/Chart';
import { isCoordinateSystemType } from '../../coord/CoordinateSystem';
import { getDefaultLabel, getDefaultInterpolatedLabel } from '../helper/labelHelper';
var BAR_BORDER_WIDTH_QUERY = ['itemStyle', 'borderWidth'];
var BAR_BORDER_RADIUS_QUERY = ['itemStyle', 'borderRadius'];
var _eventPos = [0, 0];
var mathMax = Math.max;
var mathMin = Math.min;

function getClipArea(coord, data) {
  var coordSysClipArea = coord.getArea && coord.getArea();

  if (isCoordinateSystemType(coord, 'cartesian2d')) {
    var baseAxis = coord.getBaseAxis();

    if (baseAxis.type !== 'category' || !baseAxis.onBand) {
      var expandWidth = data.getLayout('bandWidth');

      if (baseAxis.isHorizontal()) {
        coordSysClipArea.x -= expandWidth;
        coordSysClipArea.width += expandWidth * 2;
      } else {
        coordSysClipArea.y -= expandWidth;
        coordSysClipArea.height += expandWidth * 2;
      }
    }
  }

  return coordSysClipArea;
}

var BarView = function (_super) {
  __extends(BarView, _super);

  function BarView() {
    var _this = _super.call(this) || this;

    _this.type = BarView.type;
    _this._isFirstFrame = true;
    return _this;
  }

  BarView.prototype.render = function (seriesModel, ecModel, api, payload) {
    this._model = seriesModel;
    this.removeOnRenderedListener(api);

    this._updateDrawMode(seriesModel);

    var coordinateSystemType = seriesModel.get('coordinateSystem');

    if (coordinateSystemType === 'cartesian2d' || coordinateSystemType === 'polar') {
      this._isLargeDraw ? this._renderLarge(seriesModel, ecModel, api) : this._renderNormal(seriesModel, ecModel, api, payload);
    } else if (process.env.NODE_ENV !== 'production') {
      console.warn('Only cartesian2d and polar supported for bar.');
    }
  };

  BarView.prototype.incrementalPrepareRender = function (seriesModel) {
    this._clear();

    this._updateDrawMode(seriesModel);

    this._updateLargeClip(seriesModel);
  };

  BarView.prototype.incrementalRender = function (params, seriesModel) {
    this._incrementalRenderLarge(params, seriesModel);
  };

  BarView.prototype._updateDrawMode = function (seriesModel) {
    var isLargeDraw = seriesModel.pipelineContext.large;

    if (this._isLargeDraw == null || isLargeDraw !== this._isLargeDraw) {
      this._isLargeDraw = isLargeDraw;

      this._clear();
    }
  };

  BarView.prototype._renderNormal = function (seriesModel, ecModel, api, payload) {
    var _this = this;

    var group = this.group;
    var data = seriesModel.getData();
    var oldData = this._data;
    var coord = seriesModel.coordinateSystem;
    var baseAxis = coord.getBaseAxis();
    var isHorizontalOrRadial;

    if (coord.type === 'cartesian2d') {
      isHorizontalOrRadial = baseAxis.isHorizontal();
    } else if (coord.type === 'polar') {
      isHorizontalOrRadial = baseAxis.dim === 'angle';
    }

    var animationModel = seriesModel.isAnimationEnabled() ? seriesModel : null;
    var axis2DModel = baseAxis.model;
    var realtimeSort = seriesModel.get('realtimeSort');

    if (realtimeSort && data.count()) {
      if (this._isFirstFrame) {
        this._initSort(data, isHorizontalOrRadial, baseAxis, api);

        this._isFirstFrame = false;
        return;
      } else {
        this._onRendered = function () {
          var orderMap = function (idx) {
            var el = data.getItemGraphicEl(idx);

            if (el) {
              var shape = el.shape;
              return (isHorizontalOrRadial ? shape.y + shape.height : shape.x + shape.width) || 0;
            } else {
              return 0;
            }
          };

          _this._updateSort(data, orderMap, baseAxis, api);
        };

        api.getZr().on('rendered', this._onRendered);
      }
    }

    var needsClip = seriesModel.get('clip', true) || realtimeSort;
    var coordSysClipArea = getClipArea(coord, data);
    group.removeClipPath();
    var roundCap = seriesModel.get('roundCap', true);
    var drawBackground = seriesModel.get('showBackground', true);
    var backgroundModel = seriesModel.getModel('backgroundStyle');
    var barBorderRadius = backgroundModel.get('borderRadius') || 0;
    var bgEls = [];
    var oldBgEls = this._backgroundEls;
    var isInitSort = payload && payload.isInitSort;
    var isChangeOrder = payload && payload.type === 'changeAxisOrder';

    function createBackground(dataIndex) {
      var bgLayout = getLayout[coord.type](data, dataIndex);
      var bgEl = createBackgroundEl(coord, isHorizontalOrRadial, bgLayout);
      bgEl.useStyle(backgroundModel.getItemStyle());

      if (coord.type === 'cartesian2d') {
        bgEl.setShape('r', barBorderRadius);
      }

      bgEls[dataIndex] = bgEl;
      return bgEl;
    }

    ;
    data.diff(oldData).add(function (dataIndex) {
      var itemModel = data.getItemModel(dataIndex);
      var layout = getLayout[coord.type](data, dataIndex, itemModel);

      if (drawBackground) {
        createBackground(dataIndex);
      }

      if (!data.hasValue(dataIndex)) {
        return;
      }

      var isClipped = false;

      if (needsClip) {
        isClipped = clip[coord.type](coordSysClipArea, layout);
      }

      var el = elementCreator[coord.type](seriesModel, data, dataIndex, layout, isHorizontalOrRadial, animationModel, baseAxis.model, false, roundCap);
      updateStyle(el, data, dataIndex, itemModel, layout, seriesModel, isHorizontalOrRadial, coord.type === 'polar');

      if (isInitSort) {
        el.attr({
          shape: layout
        });
      } else if (realtimeSort) {
        updateRealtimeAnimation(seriesModel, axis2DModel, animationModel, el, layout, dataIndex, isHorizontalOrRadial, false, false);
      } else {
        initProps(el, {
          shape: layout
        }, seriesModel, dataIndex);
      }

      data.setItemGraphicEl(dataIndex, el);
      group.add(el);
      el.ignore = isClipped;
    }).update(function (newIndex, oldIndex) {
      var itemModel = data.getItemModel(newIndex);
      var layout = getLayout[coord.type](data, newIndex, itemModel);

      if (drawBackground) {
        var bgEl = void 0;

        if (oldBgEls.length === 0) {
          bgEl = createBackground(oldIndex);
        } else {
          bgEl = oldBgEls[oldIndex];
          bgEl.useStyle(backgroundModel.getItemStyle());

          if (coord.type === 'cartesian2d') {
            bgEl.setShape('r', barBorderRadius);
          }

          bgEls[newIndex] = bgEl;
        }

        var bgLayout = getLayout[coord.type](data, newIndex);
        var shape = createBackgroundShape(isHorizontalOrRadial, bgLayout, coord);
        updateProps(bgEl, {
          shape: shape
        }, animationModel, newIndex);
      }

      var el = oldData.getItemGraphicEl(oldIndex);

      if (!data.hasValue(newIndex)) {
        group.remove(el);
        el = null;
        return;
      }

      var isClipped = false;

      if (needsClip) {
        isClipped = clip[coord.type](coordSysClipArea, layout);

        if (isClipped) {
          group.remove(el);
        }
      }

      if (!el) {
        el = elementCreator[coord.type](seriesModel, data, newIndex, layout, isHorizontalOrRadial, animationModel, baseAxis.model, !!el, roundCap);
      }

      if (!isChangeOrder) {
        updateStyle(el, data, newIndex, itemModel, layout, seriesModel, isHorizontalOrRadial, coord.type === 'polar');
      }

      if (isInitSort) {
        el.attr({
          shape: layout
        });
      } else if (realtimeSort) {
        updateRealtimeAnimation(seriesModel, axis2DModel, animationModel, el, layout, newIndex, isHorizontalOrRadial, true, isChangeOrder);
      } else {
        updateProps(el, {
          shape: layout
        }, seriesModel, newIndex, null);
      }

      data.setItemGraphicEl(newIndex, el);
      el.ignore = isClipped;
      group.add(el);
    }).remove(function (dataIndex) {
      var el = oldData.getItemGraphicEl(dataIndex);
      el && removeElementWithFadeOut(el, seriesModel, dataIndex);
    }).execute();
    var bgGroup = this._backgroundGroup || (this._backgroundGroup = new Group());
    bgGroup.removeAll();

    for (var i = 0; i < bgEls.length; ++i) {
      bgGroup.add(bgEls[i]);
    }

    group.add(bgGroup);
    this._backgroundEls = bgEls;
    this._data = data;
  };

  BarView.prototype._renderLarge = function (seriesModel, ecModel, api) {
    this._clear();

    createLarge(seriesModel, this.group);

    this._updateLargeClip(seriesModel);
  };

  BarView.prototype._incrementalRenderLarge = function (params, seriesModel) {
    this._removeBackground();

    createLarge(seriesModel, this.group, true);
  };

  BarView.prototype._updateLargeClip = function (seriesModel) {
    var clipPath = seriesModel.get('clip', true) ? createClipPath(seriesModel.coordinateSystem, false, seriesModel) : null;

    if (clipPath) {
      this.group.setClipPath(clipPath);
    } else {
      this.group.removeClipPath();
    }
  };

  BarView.prototype._dataSort = function (data, idxMap) {
    var info = [];
    data.each(function (idx) {
      info.push({
        mappedValue: idxMap(idx),
        ordinalNumber: idx,
        beforeSortIndex: null
      });
    });
    info.sort(function (a, b) {
      return b.mappedValue - a.mappedValue;
    });

    for (var i = 0; i < info.length; ++i) {
      info[info[i].ordinalNumber].beforeSortIndex = i;
    }

    return map(info, function (item) {
      return {
        ordinalNumber: item.ordinalNumber,
        beforeSortIndex: item.beforeSortIndex
      };
    });
  };

  BarView.prototype._isDataOrderChanged = function (data, orderMap, oldOrder) {
    var oldCount = oldOrder ? oldOrder.length : 0;

    if (oldCount !== data.count()) {
      return true;
    }

    var lastValue = Number.MAX_VALUE;

    for (var i = 0; i < oldOrder.length; ++i) {
      var value = orderMap(oldOrder[i].ordinalNumber);

      if (value > lastValue) {
        return true;
      }

      lastValue = value;
    }

    return false;
  };

  BarView.prototype._updateSort = function (data, orderMap, baseAxis, api) {
    var oldOrder = baseAxis.scale.getCategorySortInfo();

    var isOrderChanged = this._isDataOrderChanged(data, orderMap, oldOrder);

    if (isOrderChanged) {
      var newOrder = this._dataSort(data, orderMap);

      var extent = baseAxis.scale.getExtent();

      for (var i = extent[0]; i < extent[1]; ++i) {
        if (!oldOrder[i] || oldOrder[i].ordinalNumber !== newOrder[i].ordinalNumber) {
          this.removeOnRenderedListener(api);
          var action = {
            type: 'changeAxisOrder',
            componentType: baseAxis.dim + 'Axis',
            axisId: baseAxis.index,
            sortInfo: newOrder
          };
          api.dispatchAction(action);
          break;
        }
      }
    }
  };

  BarView.prototype._initSort = function (data, isHorizontal, baseAxis, api) {
    var action = {
      type: 'changeAxisOrder',
      componentType: baseAxis.dim + 'Axis',
      isInitSort: true,
      axisId: baseAxis.index,
      sortInfo: this._dataSort(data, function (idx) {
        return parseFloat(data.get(isHorizontal ? 'y' : 'x', idx)) || 0;
      })
    };
    api.dispatchAction(action);
  };

  BarView.prototype.remove = function (ecModel, api) {
    this._clear(this._model);

    this.removeOnRenderedListener(api);
  };

  BarView.prototype.dispose = function (ecModel, api) {
    this.removeOnRenderedListener(api);
  };

  BarView.prototype.removeOnRenderedListener = function (api) {
    if (this._onRendered) {
      api.getZr().off('rendered', this._onRendered);
      this._onRendered = null;
    }
  };

  BarView.prototype._clear = function (model) {
    var group = this.group;
    var data = this._data;

    if (model && model.isAnimationEnabled() && data && !this._isLargeDraw) {
      this._removeBackground();

      this._backgroundEls = [];
      data.eachItemGraphicEl(function (el) {
        removeElementWithFadeOut(el, model, getECData(el).dataIndex);
      });
    } else {
      group.removeAll();
    }

    this._data = null;
    this._isFirstFrame = true;
  };

  BarView.prototype._removeBackground = function () {
    this.group.remove(this._backgroundGroup);
    this._backgroundGroup = null;
  };

  BarView.type = 'bar';
  return BarView;
}(ChartView);

var clip = {
  cartesian2d: function (coordSysBoundingRect, layout) {
    var signWidth = layout.width < 0 ? -1 : 1;
    var signHeight = layout.height < 0 ? -1 : 1;

    if (signWidth < 0) {
      layout.x += layout.width;
      layout.width = -layout.width;
    }

    if (signHeight < 0) {
      layout.y += layout.height;
      layout.height = -layout.height;
    }

    var x = mathMax(layout.x, coordSysBoundingRect.x);
    var x2 = mathMin(layout.x + layout.width, coordSysBoundingRect.x + coordSysBoundingRect.width);
    var y = mathMax(layout.y, coordSysBoundingRect.y);
    var y2 = mathMin(layout.y + layout.height, coordSysBoundingRect.y + coordSysBoundingRect.height);
    layout.x = x;
    layout.y = y;
    layout.width = x2 - x;
    layout.height = y2 - y;
    var clipped = layout.width < 0 || layout.height < 0;

    if (signWidth < 0) {
      layout.x += layout.width;
      layout.width = -layout.width;
    }

    if (signHeight < 0) {
      layout.y += layout.height;
      layout.height = -layout.height;
    }

    return clipped;
  },
  polar: function (coordSysClipArea, layout) {
    var signR = layout.r0 <= layout.r ? 1 : -1;

    if (signR < 0) {
      var tmp = layout.r;
      layout.r = layout.r0;
      layout.r0 = tmp;
    }

    var r = mathMin(layout.r, coordSysClipArea.r);
    var r0 = mathMax(layout.r0, coordSysClipArea.r0);
    layout.r = r;
    layout.r0 = r0;
    var clipped = r - r0 < 0;

    if (signR < 0) {
      var tmp = layout.r;
      layout.r = layout.r0;
      layout.r0 = tmp;
    }

    return clipped;
  }
};
var elementCreator = {
  cartesian2d: function (seriesModel, data, newIndex, layout, isHorizontal, animationModel, axisModel, isUpdate, roundCap) {
    var rect = new Rect({
      shape: extend({}, layout),
      z2: 1
    });
    rect.__dataIndex = newIndex;
    rect.name = 'item';

    if (animationModel) {
      var rectShape = rect.shape;
      var animateProperty = isHorizontal ? 'height' : 'width';
      rectShape[animateProperty] = 0;
    }

    return rect;
  },
  polar: function (seriesModel, data, newIndex, layout, isRadial, animationModel, axisModel, isUpdate, roundCap) {
    var clockwise = layout.startAngle < layout.endAngle;
    var ShapeClass = !isRadial && roundCap ? Sausage : Sector;
    var sector = new ShapeClass({
      shape: defaults({
        clockwise: clockwise
      }, layout),
      z2: 1
    });
    sector.name = 'item';

    if (animationModel) {
      var sectorShape = sector.shape;
      var animateProperty = isRadial ? 'r' : 'endAngle';
      var animateTarget = {};
      sectorShape[animateProperty] = isRadial ? 0 : layout.startAngle;
      animateTarget[animateProperty] = layout[animateProperty];
      (isUpdate ? updateProps : initProps)(sector, {
        shape: animateTarget
      }, animationModel);
    }

    return sector;
  }
};

function updateRealtimeAnimation(seriesModel, axisModel, animationModel, el, layout, newIndex, isHorizontal, isUpdate, isChangeOrder) {
  if (animationModel || axisModel) {
    var seriesTarget = void 0;
    var axisTarget = void 0;

    if (isHorizontal) {
      axisTarget = {
        x: layout.x,
        width: layout.width
      };
      seriesTarget = {
        y: layout.y,
        height: layout.height
      };
    } else {
      axisTarget = {
        y: layout.y,
        height: layout.height
      };
      seriesTarget = {
        x: layout.x,
        width: layout.width
      };
    }

    if (!isChangeOrder) {
      (isUpdate ? updateProps : initProps)(el, {
        shape: seriesTarget
      }, seriesModel, newIndex, null);
    }

    (isUpdate ? updateProps : initProps)(el, {
      shape: axisTarget
    }, axisModel, newIndex);
  }
}

var getLayout = {
  cartesian2d: function (data, dataIndex, itemModel) {
    var layout = data.getItemLayout(dataIndex);
    var fixedLineWidth = itemModel ? getLineWidth(itemModel, layout) : 0;
    var signX = layout.width > 0 ? 1 : -1;
    var signY = layout.height > 0 ? 1 : -1;
    return {
      x: layout.x + signX * fixedLineWidth / 2,
      y: layout.y + signY * fixedLineWidth / 2,
      width: layout.width - signX * fixedLineWidth,
      height: layout.height - signY * fixedLineWidth
    };
  },
  polar: function (data, dataIndex, itemModel) {
    var layout = data.getItemLayout(dataIndex);
    return {
      cx: layout.cx,
      cy: layout.cy,
      r0: layout.r0,
      r: layout.r,
      startAngle: layout.startAngle,
      endAngle: layout.endAngle
    };
  }
};

function isZeroOnPolar(layout) {
  return layout.startAngle != null && layout.endAngle != null && layout.startAngle === layout.endAngle;
}

function updateStyle(el, data, dataIndex, itemModel, layout, seriesModel, isHorizontal, isPolar) {
  var style = data.getItemVisual(dataIndex, 'style');

  if (!isPolar) {
    el.setShape('r', itemModel.get(BAR_BORDER_RADIUS_QUERY) || 0);
  }

  el.useStyle(style);
  var cursorStyle = itemModel.getShallow('cursor');
  cursorStyle && el.attr('cursor', cursorStyle);

  if (!isPolar) {
    var labelPositionOutside = isHorizontal ? layout.height > 0 ? 'bottom' : 'top' : layout.width > 0 ? 'left' : 'right';
    var labelStatesModels = getLabelStatesModels(itemModel);
    setLabelStyle(el, labelStatesModels, {
      labelFetcher: seriesModel,
      labelDataIndex: dataIndex,
      defaultText: getDefaultLabel(seriesModel.getData(), dataIndex),
      inheritColor: style.fill,
      defaultOpacity: style.opacity,
      defaultOutsidePosition: labelPositionOutside
    });
    var label = el.getTextContent();
    setLabelValueAnimation(label, labelStatesModels, seriesModel.getRawValue(dataIndex), function (value) {
      return getDefaultInterpolatedLabel(data, value);
    });
  }

  var emphasisModel = itemModel.getModel(['emphasis']);
  enableHoverEmphasis(el, emphasisModel.get('focus'), emphasisModel.get('blurScope'));
  setStatesStylesFromModel(el, itemModel);

  if (isZeroOnPolar(layout)) {
    el.style.fill = 'none';
    el.style.stroke = 'none';
    each(el.states, function (state) {
      if (state.style) {
        state.style.fill = state.style.stroke = 'none';
      }
    });
  }
}

function getLineWidth(itemModel, rawLayout) {
  var lineWidth = itemModel.get(BAR_BORDER_WIDTH_QUERY) || 0;
  var width = isNaN(rawLayout.width) ? Number.MAX_VALUE : Math.abs(rawLayout.width);
  var height = isNaN(rawLayout.height) ? Number.MAX_VALUE : Math.abs(rawLayout.height);
  return Math.min(lineWidth, width, height);
}

var LagePathShape = function () {
  function LagePathShape() {}

  return LagePathShape;
}();

var LargePath = function (_super) {
  __extends(LargePath, _super);

  function LargePath(opts) {
    var _this = _super.call(this, opts) || this;

    _this.type = 'largeBar';
    return _this;
  }

  ;

  LargePath.prototype.getDefaultShape = function () {
    return new LagePathShape();
  };

  LargePath.prototype.buildPath = function (ctx, shape) {
    var points = shape.points;
    var startPoint = this.__startPoint;
    var baseDimIdx = this.__baseDimIdx;

    for (var i = 0; i < points.length; i += 2) {
      startPoint[baseDimIdx] = points[i + baseDimIdx];
      ctx.moveTo(startPoint[0], startPoint[1]);
      ctx.lineTo(points[i], points[i + 1]);
    }
  };

  return LargePath;
}(Path);

function createLarge(seriesModel, group, incremental) {
  var data = seriesModel.getData();
  var startPoint = [];
  var baseDimIdx = data.getLayout('valueAxisHorizontal') ? 1 : 0;
  startPoint[1 - baseDimIdx] = data.getLayout('valueAxisStart');
  var largeDataIndices = data.getLayout('largeDataIndices');
  var barWidth = data.getLayout('barWidth');
  var backgroundModel = seriesModel.getModel('backgroundStyle');
  var drawBackground = seriesModel.get('showBackground', true);

  if (drawBackground) {
    var points = data.getLayout('largeBackgroundPoints');
    var backgroundStartPoint = [];
    backgroundStartPoint[1 - baseDimIdx] = data.getLayout('backgroundStart');
    var bgEl = new LargePath({
      shape: {
        points: points
      },
      incremental: !!incremental,
      silent: true,
      z2: 0
    });
    bgEl.__startPoint = backgroundStartPoint;
    bgEl.__baseDimIdx = baseDimIdx;
    bgEl.__largeDataIndices = largeDataIndices;
    bgEl.__barWidth = barWidth;
    setLargeBackgroundStyle(bgEl, backgroundModel, data);
    group.add(bgEl);
  }

  var el = new LargePath({
    shape: {
      points: data.getLayout('largePoints')
    },
    incremental: !!incremental
  });
  el.__startPoint = startPoint;
  el.__baseDimIdx = baseDimIdx;
  el.__largeDataIndices = largeDataIndices;
  el.__barWidth = barWidth;
  group.add(el);
  setLargeStyle(el, seriesModel, data);
  getECData(el).seriesIndex = seriesModel.seriesIndex;

  if (!seriesModel.get('silent')) {
    el.on('mousedown', largePathUpdateDataIndex);
    el.on('mousemove', largePathUpdateDataIndex);
  }
}

var largePathUpdateDataIndex = throttle(function (event) {
  var largePath = this;
  var dataIndex = largePathFindDataIndex(largePath, event.offsetX, event.offsetY);
  getECData(largePath).dataIndex = dataIndex >= 0 ? dataIndex : null;
}, 30, false);

function largePathFindDataIndex(largePath, x, y) {
  var baseDimIdx = largePath.__baseDimIdx;
  var valueDimIdx = 1 - baseDimIdx;
  var points = largePath.shape.points;
  var largeDataIndices = largePath.__largeDataIndices;
  var barWidthHalf = Math.abs(largePath.__barWidth / 2);
  var startValueVal = largePath.__startPoint[valueDimIdx];
  _eventPos[0] = x;
  _eventPos[1] = y;
  var pointerBaseVal = _eventPos[baseDimIdx];
  var pointerValueVal = _eventPos[1 - baseDimIdx];
  var baseLowerBound = pointerBaseVal - barWidthHalf;
  var baseUpperBound = pointerBaseVal + barWidthHalf;

  for (var i = 0, len = points.length / 2; i < len; i++) {
    var ii = i * 2;
    var barBaseVal = points[ii + baseDimIdx];
    var barValueVal = points[ii + valueDimIdx];

    if (barBaseVal >= baseLowerBound && barBaseVal <= baseUpperBound && (startValueVal <= barValueVal ? pointerValueVal >= startValueVal && pointerValueVal <= barValueVal : pointerValueVal >= barValueVal && pointerValueVal <= startValueVal)) {
      return largeDataIndices[i];
    }
  }

  return -1;
}

function setLargeStyle(el, seriesModel, data) {
  var globalStyle = data.getVisual('style');
  el.useStyle(extend({}, globalStyle));
  el.style.fill = null;
  el.style.stroke = globalStyle.fill;
  el.style.lineWidth = data.getLayout('barWidth');
}

function setLargeBackgroundStyle(el, backgroundModel, data) {
  var borderColor = backgroundModel.get('borderColor') || backgroundModel.get('color');
  var itemStyle = backgroundModel.getItemStyle();
  el.useStyle(itemStyle);
  el.style.fill = null;
  el.style.stroke = borderColor;
  el.style.lineWidth = data.getLayout('barWidth');
}

function createBackgroundShape(isHorizontalOrRadial, layout, coord) {
  if (isCoordinateSystemType(coord, 'cartesian2d')) {
    var rectShape = layout;
    var coordLayout = coord.getArea();
    return {
      x: isHorizontalOrRadial ? rectShape.x : coordLayout.x,
      y: isHorizontalOrRadial ? coordLayout.y : rectShape.y,
      width: isHorizontalOrRadial ? rectShape.width : coordLayout.width,
      height: isHorizontalOrRadial ? coordLayout.height : rectShape.height
    };
  } else {
    var coordLayout = coord.getArea();
    var sectorShape = layout;
    return {
      cx: coordLayout.cx,
      cy: coordLayout.cy,
      r0: isHorizontalOrRadial ? coordLayout.r0 : sectorShape.r0,
      r: isHorizontalOrRadial ? coordLayout.r : sectorShape.r,
      startAngle: isHorizontalOrRadial ? sectorShape.startAngle : 0,
      endAngle: isHorizontalOrRadial ? sectorShape.endAngle : Math.PI * 2
    };
  }
}

function createBackgroundEl(coord, isHorizontalOrRadial, layout) {
  var ElementClz = coord.type === 'polar' ? Sector : Rect;
  return new ElementClz({
    shape: createBackgroundShape(isHorizontalOrRadial, layout, coord),
    silent: true,
    z2: 0
  });
}

ChartView.registerClass(BarView);
export default BarView;