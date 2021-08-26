
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
import SymbolDraw from '../helper/SymbolDraw';
import SymbolClz from '../helper/Symbol';
import lineAnimationDiff from './lineAnimationDiff';
import * as graphic from '../../util/graphic';
import * as modelUtil from '../../util/model';
import { ECPolyline, ECPolygon } from './poly';
import ChartView from '../../view/Chart';
import { prepareDataCoordInfo, getStackedOnPoint } from './helper';
import { createGridClipPath, createPolarClipPath } from '../helper/createClipPathFromCoordSys';
import { isCoordinateSystemType } from '../../coord/CoordinateSystem';
import { setStatesStylesFromModel, setStatesFlag, enableHoverEmphasis } from '../../util/states';
import { setLabelStyle, getLabelStatesModels, labelInner } from '../../label/labelStyle';
import { getDefaultLabel, getDefaultInterpolatedLabel } from '../helper/labelHelper';
import { getECData } from '../../util/innerStore';
import { createFloat32Array } from '../../util/vendor';

function isPointsSame(points1, points2) {
  if (points1.length !== points2.length) {
    return;
  }

  for (var i = 0; i < points1.length; i++) {
    if (points1[i] !== points2[i]) {
      return;
    }
  }

  return true;
}

function bboxFromPoints(points) {
  var minX = Infinity;
  var minY = Infinity;
  var maxX = -Infinity;
  var maxY = -Infinity;

  for (var i = 0; i < points.length;) {
    var x = points[i++];
    var y = points[i++];

    if (!isNaN(x)) {
      minX = Math.min(x, minX);
      maxX = Math.max(x, maxX);
    }

    if (!isNaN(y)) {
      minY = Math.min(y, minY);
      maxY = Math.max(y, maxY);
    }
  }

  return [[minX, minY], [maxX, maxY]];
}

function getBoundingDiff(points1, points2) {
  var _a = bboxFromPoints(points1),
      min1 = _a[0],
      max1 = _a[1];

  var _b = bboxFromPoints(points2),
      min2 = _b[0],
      max2 = _b[1];

  return Math.max(Math.abs(min1[0] - min2[0]), Math.abs(min1[1] - min2[1]), Math.abs(max1[0] - max2[0]), Math.abs(max1[1] - max2[1]));
}

function getSmooth(smooth) {
  return typeof smooth === 'number' ? smooth : smooth ? 0.5 : 0;
}

function getStackedOnPoints(coordSys, data, dataCoordInfo) {
  if (!dataCoordInfo.valueDim) {
    return [];
  }

  var len = data.count();
  var points = createFloat32Array(len * 2);

  for (var idx = 0; idx < len; idx++) {
    var pt = getStackedOnPoint(dataCoordInfo, coordSys, data, idx);
    points[idx * 2] = pt[0];
    points[idx * 2 + 1] = pt[1];
  }

  return points;
}

function turnPointsIntoStep(points, coordSys, stepTurnAt) {
  var baseAxis = coordSys.getBaseAxis();
  var baseIndex = baseAxis.dim === 'x' || baseAxis.dim === 'radius' ? 0 : 1;
  var stepPoints = [];
  var i = 0;
  var stepPt = [];
  var pt = [];
  var nextPt = [];

  for (; i < points.length - 2; i += 2) {
    nextPt[0] = points[i + 2];
    nextPt[1] = points[i + 3];
    pt[0] = points[i];
    pt[1] = points[i + 1];
    stepPoints.push(pt[0], pt[1]);

    switch (stepTurnAt) {
      case 'end':
        stepPt[baseIndex] = nextPt[baseIndex];
        stepPt[1 - baseIndex] = pt[1 - baseIndex];
        stepPoints.push(stepPt[0], stepPt[1]);
        break;

      case 'middle':
        var middle = (pt[baseIndex] + nextPt[baseIndex]) / 2;
        var stepPt2 = [];
        stepPt[baseIndex] = stepPt2[baseIndex] = middle;
        stepPt[1 - baseIndex] = pt[1 - baseIndex];
        stepPt2[1 - baseIndex] = nextPt[1 - baseIndex];
        stepPoints.push(stepPt[0], stepPt[1]);
        stepPoints.push(stepPt2[0], stepPt2[1]);
        break;

      default:
        stepPt[baseIndex] = pt[baseIndex];
        stepPt[1 - baseIndex] = nextPt[1 - baseIndex];
        stepPoints.push(stepPt[0], stepPt[1]);
    }
  }

  stepPoints.push(points[i++], points[i++]);
  return stepPoints;
}

function getVisualGradient(data, coordSys) {
  var visualMetaList = data.getVisual('visualMeta');

  if (!visualMetaList || !visualMetaList.length || !data.count()) {
    return;
  }

  if (coordSys.type !== 'cartesian2d') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Visual map on line style is only supported on cartesian2d.');
    }

    return;
  }

  var coordDim;
  var visualMeta;

  for (var i = visualMetaList.length - 1; i >= 0; i--) {
    var dimIndex = visualMetaList[i].dimension;
    var dimName = data.dimensions[dimIndex];
    var dimInfo = data.getDimensionInfo(dimName);
    coordDim = dimInfo && dimInfo.coordDim;

    if (coordDim === 'x' || coordDim === 'y') {
      visualMeta = visualMetaList[i];
      break;
    }
  }

  if (!visualMeta) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Visual map on line style only support x or y dimension.');
    }

    return;
  }

  var axis = coordSys.getAxis(coordDim);
  var colorStops = zrUtil.map(visualMeta.stops, function (stop) {
    return {
      offset: 0,
      coord: axis.toGlobalCoord(axis.dataToCoord(stop.value)),
      color: stop.color
    };
  });
  var stopLen = colorStops.length;
  var outerColors = visualMeta.outerColors.slice();

  if (stopLen && colorStops[0].coord > colorStops[stopLen - 1].coord) {
    colorStops.reverse();
    outerColors.reverse();
  }

  var tinyExtent = 10;
  var minCoord = colorStops[0].coord - tinyExtent;
  var maxCoord = colorStops[stopLen - 1].coord + tinyExtent;
  var coordSpan = maxCoord - minCoord;

  if (coordSpan < 1e-3) {
    return 'transparent';
  }

  zrUtil.each(colorStops, function (stop) {
    stop.offset = (stop.coord - minCoord) / coordSpan;
  });
  colorStops.push({
    offset: stopLen ? colorStops[stopLen - 1].offset : 0.5,
    color: outerColors[1] || 'transparent'
  });
  colorStops.unshift({
    offset: stopLen ? colorStops[0].offset : 0.5,
    color: outerColors[0] || 'transparent'
  });
  var gradient = new graphic.LinearGradient(0, 0, 0, 0, colorStops, true);
  gradient[coordDim] = minCoord;
  gradient[coordDim + '2'] = maxCoord;
  return gradient;
}

function getIsIgnoreFunc(seriesModel, data, coordSys) {
  var showAllSymbol = seriesModel.get('showAllSymbol');
  var isAuto = showAllSymbol === 'auto';

  if (showAllSymbol && !isAuto) {
    return;
  }

  var categoryAxis = coordSys.getAxesByScale('ordinal')[0];

  if (!categoryAxis) {
    return;
  }

  if (isAuto && canShowAllSymbolForCategory(categoryAxis, data)) {
    return;
  }

  var categoryDataDim = data.mapDimension(categoryAxis.dim);
  var labelMap = {};
  zrUtil.each(categoryAxis.getViewLabels(), function (labelItem) {
    labelMap[labelItem.tickValue] = 1;
  });
  return function (dataIndex) {
    return !labelMap.hasOwnProperty(data.get(categoryDataDim, dataIndex));
  };
}

function canShowAllSymbolForCategory(categoryAxis, data) {
  var axisExtent = categoryAxis.getExtent();
  var availSize = Math.abs(axisExtent[1] - axisExtent[0]) / categoryAxis.scale.count();
  isNaN(availSize) && (availSize = 0);
  var dataLen = data.count();
  var step = Math.max(1, Math.round(dataLen / 5));

  for (var dataIndex = 0; dataIndex < dataLen; dataIndex += step) {
    if (SymbolClz.getSymbolSize(data, dataIndex)[categoryAxis.isHorizontal() ? 1 : 0] * 1.5 > availSize) {
      return false;
    }
  }

  return true;
}

function isPointNull(x, y) {
  return isNaN(x) || isNaN(y);
}

function getLastIndexNotNull(points) {
  var len = points.length / 2;

  for (; len > 0; len--) {
    if (!isPointNull(points[len * 2 - 2], points[len * 2 - 1])) {
      break;
    }
  }

  return len - 1;
}

function getPointAtIndex(points, idx) {
  return [points[idx * 2], points[idx * 2 + 1]];
}

function getIndexRange(points, xOrY, dim) {
  var len = points.length / 2;
  var dimIdx = dim === 'x' ? 0 : 1;
  var a;
  var b;
  var prevIndex = 0;
  var nextIndex = -1;

  for (var i = 0; i < len; i++) {
    b = points[i * 2 + dimIdx];

    if (isNaN(b) || isNaN(points[i * 2 + 1 - dimIdx])) {
      continue;
    }

    if (i === 0) {
      a = b;
      continue;
    }

    if (a <= xOrY && b >= xOrY || a >= xOrY && b <= xOrY) {
      nextIndex = i;
      break;
    }

    prevIndex = i;
    a = b;
  }

  return {
    range: [prevIndex, nextIndex],
    t: (xOrY - a) / (b - a)
  };
}

function createLineClipPath(lineView, coordSys, hasAnimation, seriesModel) {
  if (isCoordinateSystemType(coordSys, 'cartesian2d')) {
    var endLabelModel_1 = seriesModel.getModel('endLabel');
    var showEndLabel = endLabelModel_1.get('show');
    var valueAnimation_1 = endLabelModel_1.get('valueAnimation');
    var data_1 = seriesModel.getData();
    var labelAnimationRecord_1 = {
      lastFrameIndex: 0
    };
    var during = showEndLabel ? function (percent, clipRect) {
      lineView._endLabelOnDuring(percent, clipRect, data_1, labelAnimationRecord_1, valueAnimation_1, endLabelModel_1, coordSys);
    } : null;
    var isHorizontal = coordSys.getBaseAxis().isHorizontal();
    var clipPath = createGridClipPath(coordSys, hasAnimation, seriesModel, function () {
      var endLabel = lineView._endLabel;

      if (endLabel && hasAnimation) {
        if (labelAnimationRecord_1.originalX != null) {
          endLabel.attr({
            x: labelAnimationRecord_1.originalX,
            y: labelAnimationRecord_1.originalY
          });
        }
      }
    }, during);

    if (!seriesModel.get('clip', true)) {
      var rectShape = clipPath.shape;
      var expandSize = Math.max(rectShape.width, rectShape.height);

      if (isHorizontal) {
        rectShape.y -= expandSize;
        rectShape.height += expandSize * 2;
      } else {
        rectShape.x -= expandSize;
        rectShape.width += expandSize * 2;
      }
    }

    if (during) {
      during(1, clipPath);
    }

    return clipPath;
  } else {
    if (process.env.NODE_ENV !== 'production') {
      if (seriesModel.get(['endLabel', 'show'])) {
        console.warn('endLabel is not supported for lines in polar systems.');
      }
    }

    return createPolarClipPath(coordSys, hasAnimation, seriesModel);
  }
}

function getEndLabelStateSpecified(endLabelModel, coordSys) {
  var baseAxis = coordSys.getBaseAxis();
  var isHorizontal = baseAxis.isHorizontal();
  var isBaseInversed = baseAxis.inverse;
  var align = isHorizontal ? isBaseInversed ? 'right' : 'left' : 'center';
  var verticalAlign = isHorizontal ? 'middle' : isBaseInversed ? 'top' : 'bottom';
  return {
    normal: {
      align: endLabelModel.get('align') || align,
      verticalAlign: endLabelModel.get('verticalAlign') || verticalAlign,
      padding: endLabelModel.get('distance') || 0
    }
  };
}

var LineView = function (_super) {
  __extends(LineView, _super);

  function LineView() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  LineView.prototype.init = function () {
    var lineGroup = new graphic.Group();
    var symbolDraw = new SymbolDraw();
    this.group.add(symbolDraw.group);
    this._symbolDraw = symbolDraw;
    this._lineGroup = lineGroup;
  };

  LineView.prototype.render = function (seriesModel, ecModel, api) {
    var _this = this;

    var coordSys = seriesModel.coordinateSystem;
    var group = this.group;
    var data = seriesModel.getData();
    var lineStyleModel = seriesModel.getModel('lineStyle');
    var areaStyleModel = seriesModel.getModel('areaStyle');
    var points = data.getLayout('points') || [];
    var isCoordSysPolar = coordSys.type === 'polar';
    var prevCoordSys = this._coordSys;
    var symbolDraw = this._symbolDraw;
    var polyline = this._polyline;
    var polygon = this._polygon;
    var lineGroup = this._lineGroup;
    var hasAnimation = seriesModel.get('animation');
    var isAreaChart = !areaStyleModel.isEmpty();
    var valueOrigin = areaStyleModel.get('origin');
    var dataCoordInfo = prepareDataCoordInfo(coordSys, data, valueOrigin);
    var stackedOnPoints = isAreaChart && getStackedOnPoints(coordSys, data, dataCoordInfo);
    var showSymbol = seriesModel.get('showSymbol');
    var isIgnoreFunc = showSymbol && !isCoordSysPolar && getIsIgnoreFunc(seriesModel, data, coordSys);
    var oldData = this._data;
    oldData && oldData.eachItemGraphicEl(function (el, idx) {
      if (el.__temp) {
        group.remove(el);
        oldData.setItemGraphicEl(idx, null);
      }
    });

    if (!showSymbol) {
      symbolDraw.remove();
    }

    group.add(lineGroup);
    var step = !isCoordSysPolar ? seriesModel.get('step') : false;
    var clipShapeForSymbol;

    if (coordSys && coordSys.getArea && seriesModel.get('clip', true)) {
      clipShapeForSymbol = coordSys.getArea();

      if (clipShapeForSymbol.width != null) {
        clipShapeForSymbol.x -= 0.1;
        clipShapeForSymbol.y -= 0.1;
        clipShapeForSymbol.width += 0.2;
        clipShapeForSymbol.height += 0.2;
      } else if (clipShapeForSymbol.r0) {
        clipShapeForSymbol.r0 -= 0.5;
        clipShapeForSymbol.r += 0.5;
      }
    }

    this._clipShapeForSymbol = clipShapeForSymbol;

    if (!(polyline && prevCoordSys.type === coordSys.type && step === this._step)) {
      showSymbol && symbolDraw.updateData(data, {
        isIgnore: isIgnoreFunc,
        clipShape: clipShapeForSymbol,
        disableAnimation: true,
        getSymbolPoint: function (idx) {
          return [points[idx * 2], points[idx * 2 + 1]];
        }
      });
      hasAnimation && this._initSymbolLabelAnimation(data, coordSys, clipShapeForSymbol);

      if (step) {
        points = turnPointsIntoStep(points, coordSys, step);

        if (stackedOnPoints) {
          stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step);
        }
      }

      polyline = this._newPolyline(points);

      if (isAreaChart) {
        polygon = this._newPolygon(points, stackedOnPoints);
      }

      if (!isCoordSysPolar) {
        this._initOrUpdateEndLabel(seriesModel, coordSys);
      }

      lineGroup.setClipPath(createLineClipPath(this, coordSys, true, seriesModel));
    } else {
      if (isAreaChart && !polygon) {
        polygon = this._newPolygon(points, stackedOnPoints);
      } else if (polygon && !isAreaChart) {
        lineGroup.remove(polygon);
        polygon = this._polygon = null;
      }

      if (!isCoordSysPolar) {
        this._initOrUpdateEndLabel(seriesModel, coordSys);
      }

      lineGroup.setClipPath(createLineClipPath(this, coordSys, false, seriesModel));
      showSymbol && symbolDraw.updateData(data, {
        isIgnore: isIgnoreFunc,
        clipShape: clipShapeForSymbol,
        disableAnimation: true,
        getSymbolPoint: function (idx) {
          return [points[idx * 2], points[idx * 2 + 1]];
        }
      });

      if (!isPointsSame(this._stackedOnPoints, stackedOnPoints) || !isPointsSame(this._points, points)) {
        if (hasAnimation) {
          this._doUpdateAnimation(data, stackedOnPoints, coordSys, api, step, valueOrigin);
        } else {
          if (step) {
            points = turnPointsIntoStep(points, coordSys, step);

            if (stackedOnPoints) {
              stackedOnPoints = turnPointsIntoStep(stackedOnPoints, coordSys, step);
            }
          }

          polyline.setShape({
            points: points
          });
          polygon && polygon.setShape({
            points: points,
            stackedOnPoints: stackedOnPoints
          });
        }
      }
    }

    var visualColor = getVisualGradient(data, coordSys) || data.getVisual('style')[data.getVisual('drawType')];
    var focus = seriesModel.get(['emphasis', 'focus']);
    var blurScope = seriesModel.get(['emphasis', 'blurScope']);
    polyline.useStyle(zrUtil.defaults(lineStyleModel.getLineStyle(), {
      fill: 'none',
      stroke: visualColor,
      lineJoin: 'bevel'
    }));
    setStatesStylesFromModel(polyline, seriesModel, 'lineStyle');

    if (polyline.style.lineWidth > 0 && seriesModel.get(['emphasis', 'lineStyle', 'width']) === 'bolder') {
      var emphasisLineStyle = polyline.getState('emphasis').style;
      emphasisLineStyle.lineWidth = polyline.style.lineWidth + 1;
    }

    getECData(polyline).seriesIndex = seriesModel.seriesIndex;
    enableHoverEmphasis(polyline, focus, blurScope);
    var smooth = getSmooth(seriesModel.get('smooth'));
    var smoothMonotone = seriesModel.get('smoothMonotone');
    var connectNulls = seriesModel.get('connectNulls');
    polyline.setShape({
      smooth: smooth,
      smoothMonotone: smoothMonotone,
      connectNulls: connectNulls
    });

    if (polygon) {
      var stackedOnSeries = data.getCalculationInfo('stackedOnSeries');
      var stackedOnSmooth = 0;
      polygon.useStyle(zrUtil.defaults(areaStyleModel.getAreaStyle(), {
        fill: visualColor,
        opacity: 0.7,
        lineJoin: 'bevel',
        decal: data.getVisual('style').decal
      }));

      if (stackedOnSeries) {
        stackedOnSmooth = getSmooth(stackedOnSeries.get('smooth'));
      }

      polygon.setShape({
        smooth: smooth,
        stackedOnSmooth: stackedOnSmooth,
        smoothMonotone: smoothMonotone,
        connectNulls: connectNulls
      });
      setStatesStylesFromModel(polygon, seriesModel, 'areaStyle');
      getECData(polygon).seriesIndex = seriesModel.seriesIndex;
      enableHoverEmphasis(polygon, focus, blurScope);
    }

    var changePolyState = function (toState) {
      _this._changePolyState(toState);
    };

    data.eachItemGraphicEl(function (el) {
      el && (el.onHoverStateChange = changePolyState);
    });
    this._polyline.onHoverStateChange = changePolyState;
    this._data = data;
    this._coordSys = coordSys;
    this._stackedOnPoints = stackedOnPoints;
    this._points = points;
    this._step = step;
    this._valueOrigin = valueOrigin;
  };

  LineView.prototype.dispose = function () {};

  LineView.prototype.highlight = function (seriesModel, ecModel, api, payload) {
    var data = seriesModel.getData();
    var dataIndex = modelUtil.queryDataIndex(data, payload);

    this._changePolyState('emphasis');

    if (!(dataIndex instanceof Array) && dataIndex != null && dataIndex >= 0) {
      var points = data.getLayout('points');
      var symbol = data.getItemGraphicEl(dataIndex);

      if (!symbol) {
        var x = points[dataIndex * 2];
        var y = points[dataIndex * 2 + 1];

        if (isNaN(x) || isNaN(y)) {
          return;
        }

        if (this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(x, y)) {
          return;
        }

        symbol = new SymbolClz(data, dataIndex);
        symbol.x = x;
        symbol.y = y;
        symbol.setZ(seriesModel.get('zlevel'), seriesModel.get('z'));
        symbol.__temp = true;
        data.setItemGraphicEl(dataIndex, symbol);
        symbol.stopSymbolAnimation(true);
        this.group.add(symbol);
      }

      symbol.highlight();
    } else {
      ChartView.prototype.highlight.call(this, seriesModel, ecModel, api, payload);
    }
  };

  LineView.prototype.downplay = function (seriesModel, ecModel, api, payload) {
    var data = seriesModel.getData();
    var dataIndex = modelUtil.queryDataIndex(data, payload);

    this._changePolyState('normal');

    if (dataIndex != null && dataIndex >= 0) {
      var symbol = data.getItemGraphicEl(dataIndex);

      if (symbol) {
        if (symbol.__temp) {
          data.setItemGraphicEl(dataIndex, null);
          this.group.remove(symbol);
        } else {
          symbol.downplay();
        }
      }
    } else {
      ChartView.prototype.downplay.call(this, seriesModel, ecModel, api, payload);
    }
  };

  LineView.prototype._changePolyState = function (toState) {
    var polygon = this._polygon;
    setStatesFlag(this._polyline, toState);
    polygon && setStatesFlag(polygon, toState);
  };

  LineView.prototype._newPolyline = function (points) {
    var polyline = this._polyline;

    if (polyline) {
      this._lineGroup.remove(polyline);
    }

    polyline = new ECPolyline({
      shape: {
        points: points
      },
      segmentIgnoreThreshold: 2,
      z2: 10
    });

    this._lineGroup.add(polyline);

    this._polyline = polyline;
    return polyline;
  };

  LineView.prototype._newPolygon = function (points, stackedOnPoints) {
    var polygon = this._polygon;

    if (polygon) {
      this._lineGroup.remove(polygon);
    }

    polygon = new ECPolygon({
      shape: {
        points: points,
        stackedOnPoints: stackedOnPoints
      },
      segmentIgnoreThreshold: 2
    });

    this._lineGroup.add(polygon);

    this._polygon = polygon;
    return polygon;
  };

  LineView.prototype._initSymbolLabelAnimation = function (data, coordSys, clipShape) {
    var isHorizontalOrRadial;
    var isCoordSysPolar;
    var baseAxis = coordSys.getBaseAxis();
    var isAxisInverse = baseAxis.inverse;

    if (coordSys.type === 'cartesian2d') {
      isHorizontalOrRadial = baseAxis.isHorizontal();
      isCoordSysPolar = false;
    } else if (coordSys.type === 'polar') {
      isHorizontalOrRadial = baseAxis.dim === 'angle';
      isCoordSysPolar = true;
    }

    var seriesModel = data.hostModel;
    var seriesDuration = seriesModel.get('animationDuration');

    if (typeof seriesDuration === 'function') {
      seriesDuration = seriesDuration(null);
    }

    var seriesDalay = seriesModel.get('animationDelay') || 0;
    var seriesDalayValue = typeof seriesDalay === 'function' ? seriesDalay(null) : seriesDalay;
    data.eachItemGraphicEl(function (symbol, idx) {
      var el = symbol;

      if (el) {
        var point = [symbol.x, symbol.y];
        var start = void 0;
        var end = void 0;
        var current = void 0;

        if (isCoordSysPolar) {
          var polarClip = clipShape;
          var coord = coordSys.pointToCoord(point);

          if (isHorizontalOrRadial) {
            start = polarClip.startAngle;
            end = polarClip.endAngle;
            current = -coord[1] / 180 * Math.PI;
          } else {
            start = polarClip.r0;
            end = polarClip.r;
            current = coord[0];
          }
        } else {
          var gridClip = clipShape;

          if (isHorizontalOrRadial) {
            start = gridClip.x;
            end = gridClip.x + gridClip.width;
            current = symbol.x;
          } else {
            start = gridClip.y + gridClip.height;
            end = gridClip.y;
            current = symbol.y;
          }
        }

        var ratio = end === start ? 0 : (current - start) / (end - start);

        if (isAxisInverse) {
          ratio = 1 - ratio;
        }

        var delay = typeof seriesDalay === 'function' ? seriesDalay(idx) : seriesDuration * ratio + seriesDalayValue;
        var symbolPath = el.getSymbolPath();
        var text = symbolPath.getTextContent();
        el.attr({
          scaleX: 0,
          scaleY: 0
        });
        el.animateTo({
          scaleX: 1,
          scaleY: 1
        }, {
          duration: 200,
          delay: delay
        });

        if (text) {
          text.animateFrom({
            style: {
              opacity: 0
            }
          }, {
            duration: 300,
            delay: delay
          });
        }

        symbolPath.disableLabelAnimation = true;
      }
    });
  };

  LineView.prototype._initOrUpdateEndLabel = function (seriesModel, coordSys) {
    var endLabelModel = seriesModel.getModel('endLabel');

    if (endLabelModel.get('show')) {
      var data_2 = seriesModel.getData();
      var polyline = this._polyline;
      var endLabel = this._endLabel;

      if (!endLabel) {
        endLabel = this._endLabel = new graphic.Text({
          z2: 200
        });
        endLabel.ignoreClip = true;
        polyline.setTextContent(this._endLabel);
        polyline.disableLabelAnimation = true;
      }

      var dataIndex = getLastIndexNotNull(data_2.getLayout('points'));

      if (dataIndex >= 0) {
        setLabelStyle(endLabel, getLabelStatesModels(seriesModel, 'endLabel'), {
          labelFetcher: seriesModel,
          labelDataIndex: dataIndex,
          defaultText: function (dataIndex, opt, overrideValue) {
            return overrideValue ? getDefaultInterpolatedLabel(data_2, overrideValue) : getDefaultLabel(data_2, dataIndex);
          },
          enableTextSetter: true
        }, getEndLabelStateSpecified(endLabelModel, coordSys));
      }
    } else if (this._endLabel) {
      this._polyline.removeTextContent();

      this._endLabel = null;
    }
  };

  LineView.prototype._endLabelOnDuring = function (percent, clipRect, data, animationRecord, valueAnimation, endLabelModel, coordSys) {
    var endLabel = this._endLabel;
    var polyline = this._polyline;

    if (endLabel) {
      if (percent < 1 && animationRecord.originalX == null) {
        animationRecord.originalX = endLabel.x;
        animationRecord.originalY = endLabel.y;
      }

      var points = data.getLayout('points');
      var seriesModel = data.hostModel;
      var connectNulls = seriesModel.get('connectNulls');
      var precision = endLabelModel.get('precision');
      var baseAxis = coordSys.getBaseAxis();
      var isHorizontal = baseAxis.isHorizontal();
      var isBaseInversed = baseAxis.inverse;
      var clipShape = clipRect.shape;
      var xOrY = isBaseInversed ? isHorizontal ? clipShape.x : clipShape.y + clipShape.height : isHorizontal ? clipShape.x + clipShape.width : clipShape.y;
      var dim = isHorizontal ? 'x' : 'y';
      var dataIndexRange = getIndexRange(points, xOrY, dim);
      var indices = dataIndexRange.range;
      var diff = indices[1] - indices[0];
      var value = void 0;

      if (diff >= 1) {
        if (diff > 1 && !connectNulls) {
          var pt = getPointAtIndex(points, indices[0]);
          endLabel.attr({
            x: pt[0],
            y: pt[1]
          });
          valueAnimation && (value = seriesModel.getRawValue(indices[0]));
        } else {
          var pt = polyline.getPointOn(xOrY, dim);
          pt && endLabel.attr({
            x: pt[0],
            y: pt[1]
          });
          var startValue = seriesModel.getRawValue(indices[0]);
          var endValue = seriesModel.getRawValue(indices[1]);
          valueAnimation && (value = modelUtil.interpolateRawValues(data, precision, startValue, endValue, dataIndexRange.t));
        }

        animationRecord.lastFrameIndex = indices[0];
      } else {
        var idx = percent === 1 || animationRecord.lastFrameIndex > 0 ? indices[0] : 0;
        var pt = getPointAtIndex(points, idx);
        valueAnimation && (value = seriesModel.getRawValue(idx));
        endLabel.attr({
          x: pt[0],
          y: pt[1]
        });
      }

      if (valueAnimation) {
        labelInner(endLabel).setLabelText(value);
      }
    }
  };

  LineView.prototype._doUpdateAnimation = function (data, stackedOnPoints, coordSys, api, step, valueOrigin) {
    var polyline = this._polyline;
    var polygon = this._polygon;
    var seriesModel = data.hostModel;
    var diff = lineAnimationDiff(this._data, data, this._stackedOnPoints, stackedOnPoints, this._coordSys, coordSys, this._valueOrigin, valueOrigin);
    var current = diff.current;
    var stackedOnCurrent = diff.stackedOnCurrent;
    var next = diff.next;
    var stackedOnNext = diff.stackedOnNext;

    if (step) {
      current = turnPointsIntoStep(diff.current, coordSys, step);
      stackedOnCurrent = turnPointsIntoStep(diff.stackedOnCurrent, coordSys, step);
      next = turnPointsIntoStep(diff.next, coordSys, step);
      stackedOnNext = turnPointsIntoStep(diff.stackedOnNext, coordSys, step);
    }

    if (getBoundingDiff(current, next) > 3000 || polygon && getBoundingDiff(stackedOnCurrent, stackedOnNext) > 3000) {
      polyline.setShape({
        points: next
      });

      if (polygon) {
        polygon.setShape({
          points: next,
          stackedOnPoints: stackedOnNext
        });
      }

      return;
    }

    polyline.shape.__points = diff.current;
    polyline.shape.points = current;
    var target = {
      shape: {
        points: next
      }
    };

    if (diff.current !== current) {
      target.shape.__points = diff.next;
    }

    polyline.stopAnimation();
    graphic.updateProps(polyline, target, seriesModel);

    if (polygon) {
      polygon.setShape({
        points: current,
        stackedOnPoints: stackedOnCurrent
      });
      polygon.stopAnimation();
      graphic.updateProps(polygon, {
        shape: {
          stackedOnPoints: stackedOnNext
        }
      }, seriesModel);

      if (polyline.shape.points !== polygon.shape.points) {
        polygon.shape.points = polyline.shape.points;
      }
    }

    var updatedDataInfo = [];
    var diffStatus = diff.status;

    for (var i = 0; i < diffStatus.length; i++) {
      var cmd = diffStatus[i].cmd;

      if (cmd === '=') {
        var el = data.getItemGraphicEl(diffStatus[i].idx1);

        if (el) {
          updatedDataInfo.push({
            el: el,
            ptIdx: i
          });
        }
      }
    }

    if (polyline.animators && polyline.animators.length) {
      polyline.animators[0].during(function () {
        polygon && polygon.dirtyShape();
        var points = polyline.shape.__points;

        for (var i = 0; i < updatedDataInfo.length; i++) {
          var el = updatedDataInfo[i].el;
          var offset = updatedDataInfo[i].ptIdx * 2;
          el.x = points[offset];
          el.y = points[offset + 1];
          el.markRedraw();
        }
      });
    }
  };

  LineView.prototype.remove = function (ecModel) {
    var group = this.group;
    var oldData = this._data;

    this._lineGroup.removeAll();

    this._symbolDraw.remove(true);

    oldData && oldData.eachItemGraphicEl(function (el, idx) {
      if (el.__temp) {
        group.remove(el);
        oldData.setItemGraphicEl(idx, null);
      }
    });
    this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null;
  };

  LineView.type = 'line';
  return LineView;
}(ChartView);

ChartView.registerClass(LineView);
export default ChartView;