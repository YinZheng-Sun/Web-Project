
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

import { retrieve, defaults, extend, each, isObject } from 'zrender/esm/core/util';
import * as graphic from '../../util/graphic';
import { getECData } from '../../util/innerStore';
import { createTextStyle } from '../../label/labelStyle';
import Model from '../../model/Model';
import { isRadianAroundZero, remRadian } from '../../util/number';
import { createSymbol } from '../../util/symbol';
import * as matrixUtil from 'zrender/esm/core/matrix';
import { applyTransform as v2ApplyTransform } from 'zrender/esm/core/vector';
import { shouldShowAllLabels } from '../../coord/axisHelper';
var PI = Math.PI;

var AxisBuilder = function () {
  function AxisBuilder(axisModel, opt) {
    this.group = new graphic.Group();
    this.opt = opt;
    this.axisModel = axisModel;
    defaults(opt, {
      labelOffset: 0,
      nameDirection: 1,
      tickDirection: 1,
      labelDirection: 1,
      silent: true,
      handleAutoShown: function () {
        return true;
      }
    });
    var transformGroup = new graphic.Group({
      x: opt.position[0],
      y: opt.position[1],
      rotation: opt.rotation
    });
    transformGroup.updateTransform();
    this._transformGroup = transformGroup;
  }

  AxisBuilder.prototype.hasBuilder = function (name) {
    return !!builders[name];
  };

  AxisBuilder.prototype.add = function (name) {
    builders[name](this.opt, this.axisModel, this.group, this._transformGroup);
  };

  AxisBuilder.prototype.getGroup = function () {
    return this.group;
  };

  AxisBuilder.innerTextLayout = function (axisRotation, textRotation, direction) {
    var rotationDiff = remRadian(textRotation - axisRotation);
    var textAlign;
    var textVerticalAlign;

    if (isRadianAroundZero(rotationDiff)) {
      textVerticalAlign = direction > 0 ? 'top' : 'bottom';
      textAlign = 'center';
    } else if (isRadianAroundZero(rotationDiff - PI)) {
      textVerticalAlign = direction > 0 ? 'bottom' : 'top';
      textAlign = 'center';
    } else {
      textVerticalAlign = 'middle';

      if (rotationDiff > 0 && rotationDiff < PI) {
        textAlign = direction > 0 ? 'right' : 'left';
      } else {
        textAlign = direction > 0 ? 'left' : 'right';
      }
    }

    return {
      rotation: rotationDiff,
      textAlign: textAlign,
      textVerticalAlign: textVerticalAlign
    };
  };

  AxisBuilder.makeAxisEventDataBase = function (axisModel) {
    var eventData = {
      componentType: axisModel.mainType,
      componentIndex: axisModel.componentIndex
    };
    eventData[axisModel.mainType + 'Index'] = axisModel.componentIndex;
    return eventData;
  };

  AxisBuilder.isLabelSilent = function (axisModel) {
    var tooltipOpt = axisModel.get('tooltip');
    return axisModel.get('silent') || !(axisModel.get('triggerEvent') || tooltipOpt && tooltipOpt.show);
  };

  return AxisBuilder;
}();

;
var builders = {
  axisLine: function (opt, axisModel, group, transformGroup) {
    var shown = axisModel.get(['axisLine', 'show']);

    if (shown === 'auto' && opt.handleAutoShown) {
      shown = opt.handleAutoShown('axisLine');
    }

    if (!shown) {
      return;
    }

    var extent = axisModel.axis.getExtent();
    var matrix = transformGroup.transform;
    var pt1 = [extent[0], 0];
    var pt2 = [extent[1], 0];

    if (matrix) {
      v2ApplyTransform(pt1, pt1, matrix);
      v2ApplyTransform(pt2, pt2, matrix);
    }

    var lineStyle = extend({
      lineCap: 'round'
    }, axisModel.getModel(['axisLine', 'lineStyle']).getLineStyle());
    var line = new graphic.Line({
      subPixelOptimize: true,
      shape: {
        x1: pt1[0],
        y1: pt1[1],
        x2: pt2[0],
        y2: pt2[1]
      },
      style: lineStyle,
      strokeContainThreshold: opt.strokeContainThreshold || 5,
      silent: true,
      z2: 1
    });
    line.anid = 'line';
    group.add(line);
    var arrows = axisModel.get(['axisLine', 'symbol']);
    var arrowSize = axisModel.get(['axisLine', 'symbolSize']);
    var arrowOffset = axisModel.get(['axisLine', 'symbolOffset']) || 0;

    if (typeof arrowOffset === 'number') {
      arrowOffset = [arrowOffset, arrowOffset];
    }

    if (arrows != null) {
      if (typeof arrows === 'string') {
        arrows = [arrows, arrows];
      }

      if (typeof arrowSize === 'string' || typeof arrowSize === 'number') {
        arrowSize = [arrowSize, arrowSize];
      }

      var symbolWidth_1 = arrowSize[0];
      var symbolHeight_1 = arrowSize[1];
      each([{
        rotate: opt.rotation + Math.PI / 2,
        offset: arrowOffset[0],
        r: 0
      }, {
        rotate: opt.rotation - Math.PI / 2,
        offset: arrowOffset[1],
        r: Math.sqrt((pt1[0] - pt2[0]) * (pt1[0] - pt2[0]) + (pt1[1] - pt2[1]) * (pt1[1] - pt2[1]))
      }], function (point, index) {
        if (arrows[index] !== 'none' && arrows[index] != null) {
          var symbol = createSymbol(arrows[index], -symbolWidth_1 / 2, -symbolHeight_1 / 2, symbolWidth_1, symbolHeight_1, lineStyle.stroke, true);
          var r = point.r + point.offset;
          symbol.attr({
            rotation: point.rotate,
            x: pt1[0] + r * Math.cos(opt.rotation),
            y: pt1[1] - r * Math.sin(opt.rotation),
            silent: true,
            z2: 11
          });
          group.add(symbol);
        }
      });
    }
  },
  axisTickLabel: function (opt, axisModel, group, transformGroup) {
    var ticksEls = buildAxisMajorTicks(group, transformGroup, axisModel, opt);
    var labelEls = buildAxisLabel(group, transformGroup, axisModel, opt);
    fixMinMaxLabelShow(axisModel, labelEls, ticksEls);
    buildAxisMinorTicks(group, transformGroup, axisModel, opt.tickDirection);
  },
  axisName: function (opt, axisModel, group, transformGroup) {
    var name = retrieve(opt.axisName, axisModel.get('name'));

    if (!name) {
      return;
    }

    var nameLocation = axisModel.get('nameLocation');
    var nameDirection = opt.nameDirection;
    var textStyleModel = axisModel.getModel('nameTextStyle');
    var gap = axisModel.get('nameGap') || 0;
    var extent = axisModel.axis.getExtent();
    var gapSignal = extent[0] > extent[1] ? -1 : 1;
    var pos = [nameLocation === 'start' ? extent[0] - gapSignal * gap : nameLocation === 'end' ? extent[1] + gapSignal * gap : (extent[0] + extent[1]) / 2, isNameLocationCenter(nameLocation) ? opt.labelOffset + nameDirection * gap : 0];
    var labelLayout;
    var nameRotation = axisModel.get('nameRotate');

    if (nameRotation != null) {
      nameRotation = nameRotation * PI / 180;
    }

    var axisNameAvailableWidth;

    if (isNameLocationCenter(nameLocation)) {
      labelLayout = AxisBuilder.innerTextLayout(opt.rotation, nameRotation != null ? nameRotation : opt.rotation, nameDirection);
    } else {
      labelLayout = endTextLayout(opt.rotation, nameLocation, nameRotation || 0, extent);
      axisNameAvailableWidth = opt.axisNameAvailableWidth;

      if (axisNameAvailableWidth != null) {
        axisNameAvailableWidth = Math.abs(axisNameAvailableWidth / Math.sin(labelLayout.rotation));
        !isFinite(axisNameAvailableWidth) && (axisNameAvailableWidth = null);
      }
    }

    var textFont = textStyleModel.getFont();
    var truncateOpt = axisModel.get('nameTruncate', true) || {};
    var ellipsis = truncateOpt.ellipsis;
    var maxWidth = retrieve(opt.nameTruncateMaxWidth, truncateOpt.maxWidth, axisNameAvailableWidth);
    var tooltipOpt = axisModel.get('tooltip', true);
    var mainType = axisModel.mainType;
    var formatterParams = {
      componentType: mainType,
      name: name,
      $vars: ['name']
    };
    formatterParams[mainType + 'Index'] = axisModel.componentIndex;
    var textEl = new graphic.Text({
      x: pos[0],
      y: pos[1],
      rotation: labelLayout.rotation,
      silent: AxisBuilder.isLabelSilent(axisModel),
      style: createTextStyle(textStyleModel, {
        text: name,
        font: textFont,
        overflow: 'truncate',
        width: maxWidth,
        ellipsis: ellipsis,
        fill: textStyleModel.getTextColor() || axisModel.get(['axisLine', 'lineStyle', 'color']),
        align: textStyleModel.get('align') || labelLayout.textAlign,
        verticalAlign: textStyleModel.get('verticalAlign') || labelLayout.textVerticalAlign
      }),
      z2: 1
    });
    textEl.tooltip = tooltipOpt && tooltipOpt.show ? extend({
      content: name,
      formatter: function () {
        return name;
      },
      formatterParams: formatterParams
    }, tooltipOpt) : null;
    textEl.__fullText = name;
    textEl.anid = 'name';

    if (axisModel.get('triggerEvent')) {
      var eventData = AxisBuilder.makeAxisEventDataBase(axisModel);
      eventData.targetType = 'axisName';
      eventData.name = name;
      getECData(textEl).eventData = eventData;
    }

    transformGroup.add(textEl);
    textEl.updateTransform();
    group.add(textEl);
    textEl.decomposeTransform();
  }
};

function endTextLayout(rotation, textPosition, textRotate, extent) {
  var rotationDiff = remRadian(textRotate - rotation);
  var textAlign;
  var textVerticalAlign;
  var inverse = extent[0] > extent[1];
  var onLeft = textPosition === 'start' && !inverse || textPosition !== 'start' && inverse;

  if (isRadianAroundZero(rotationDiff - PI / 2)) {
    textVerticalAlign = onLeft ? 'bottom' : 'top';
    textAlign = 'center';
  } else if (isRadianAroundZero(rotationDiff - PI * 1.5)) {
    textVerticalAlign = onLeft ? 'top' : 'bottom';
    textAlign = 'center';
  } else {
    textVerticalAlign = 'middle';

    if (rotationDiff < PI * 1.5 && rotationDiff > PI / 2) {
      textAlign = onLeft ? 'left' : 'right';
    } else {
      textAlign = onLeft ? 'right' : 'left';
    }
  }

  return {
    rotation: rotationDiff,
    textAlign: textAlign,
    textVerticalAlign: textVerticalAlign
  };
}

function fixMinMaxLabelShow(axisModel, labelEls, tickEls) {
  if (shouldShowAllLabels(axisModel.axis)) {
    return;
  }

  var showMinLabel = axisModel.get(['axisLabel', 'showMinLabel']);
  var showMaxLabel = axisModel.get(['axisLabel', 'showMaxLabel']);
  labelEls = labelEls || [];
  tickEls = tickEls || [];
  var firstLabel = labelEls[0];
  var nextLabel = labelEls[1];
  var lastLabel = labelEls[labelEls.length - 1];
  var prevLabel = labelEls[labelEls.length - 2];
  var firstTick = tickEls[0];
  var nextTick = tickEls[1];
  var lastTick = tickEls[tickEls.length - 1];
  var prevTick = tickEls[tickEls.length - 2];

  if (showMinLabel === false) {
    ignoreEl(firstLabel);
    ignoreEl(firstTick);
  } else if (isTwoLabelOverlapped(firstLabel, nextLabel)) {
    if (showMinLabel) {
      ignoreEl(nextLabel);
      ignoreEl(nextTick);
    } else {
      ignoreEl(firstLabel);
      ignoreEl(firstTick);
    }
  }

  if (showMaxLabel === false) {
    ignoreEl(lastLabel);
    ignoreEl(lastTick);
  } else if (isTwoLabelOverlapped(prevLabel, lastLabel)) {
    if (showMaxLabel) {
      ignoreEl(prevLabel);
      ignoreEl(prevTick);
    } else {
      ignoreEl(lastLabel);
      ignoreEl(lastTick);
    }
  }
}

function ignoreEl(el) {
  el && (el.ignore = true);
}

function isTwoLabelOverlapped(current, next) {
  var firstRect = current && current.getBoundingRect().clone();
  var nextRect = next && next.getBoundingRect().clone();

  if (!firstRect || !nextRect) {
    return;
  }

  var mRotationBack = matrixUtil.identity([]);
  matrixUtil.rotate(mRotationBack, mRotationBack, -current.rotation);
  firstRect.applyTransform(matrixUtil.mul([], mRotationBack, current.getLocalTransform()));
  nextRect.applyTransform(matrixUtil.mul([], mRotationBack, next.getLocalTransform()));
  return firstRect.intersect(nextRect);
}

function isNameLocationCenter(nameLocation) {
  return nameLocation === 'middle' || nameLocation === 'center';
}

function createTicks(ticksCoords, tickTransform, tickEndCoord, tickLineStyle, anidPrefix) {
  var tickEls = [];
  var pt1 = [];
  var pt2 = [];

  for (var i = 0; i < ticksCoords.length; i++) {
    var tickCoord = ticksCoords[i].coord;
    pt1[0] = tickCoord;
    pt1[1] = 0;
    pt2[0] = tickCoord;
    pt2[1] = tickEndCoord;

    if (tickTransform) {
      v2ApplyTransform(pt1, pt1, tickTransform);
      v2ApplyTransform(pt2, pt2, tickTransform);
    }

    var tickEl = new graphic.Line({
      subPixelOptimize: true,
      shape: {
        x1: pt1[0],
        y1: pt1[1],
        x2: pt2[0],
        y2: pt2[1]
      },
      style: tickLineStyle,
      z2: 2,
      autoBatch: true,
      silent: true
    });
    tickEl.anid = anidPrefix + '_' + ticksCoords[i].tickValue;
    tickEls.push(tickEl);
  }

  return tickEls;
}

function buildAxisMajorTicks(group, transformGroup, axisModel, opt) {
  var axis = axisModel.axis;
  var tickModel = axisModel.getModel('axisTick');
  var shown = tickModel.get('show');

  if (shown === 'auto' && opt.handleAutoShown) {
    shown = opt.handleAutoShown('axisTick');
  }

  if (!shown || axis.scale.isBlank()) {
    return;
  }

  var lineStyleModel = tickModel.getModel('lineStyle');
  var tickEndCoord = opt.tickDirection * tickModel.get('length');
  var ticksCoords = axis.getTicksCoords();
  var ticksEls = createTicks(ticksCoords, transformGroup.transform, tickEndCoord, defaults(lineStyleModel.getLineStyle(), {
    stroke: axisModel.get(['axisLine', 'lineStyle', 'color'])
  }), 'ticks');

  for (var i = 0; i < ticksEls.length; i++) {
    group.add(ticksEls[i]);
  }

  return ticksEls;
}

function buildAxisMinorTicks(group, transformGroup, axisModel, tickDirection) {
  var axis = axisModel.axis;
  var minorTickModel = axisModel.getModel('minorTick');

  if (!minorTickModel.get('show') || axis.scale.isBlank()) {
    return;
  }

  var minorTicksCoords = axis.getMinorTicksCoords();

  if (!minorTicksCoords.length) {
    return;
  }

  var lineStyleModel = minorTickModel.getModel('lineStyle');
  var tickEndCoord = tickDirection * minorTickModel.get('length');
  var minorTickLineStyle = defaults(lineStyleModel.getLineStyle(), defaults(axisModel.getModel('axisTick').getLineStyle(), {
    stroke: axisModel.get(['axisLine', 'lineStyle', 'color'])
  }));

  for (var i = 0; i < minorTicksCoords.length; i++) {
    var minorTicksEls = createTicks(minorTicksCoords[i], transformGroup.transform, tickEndCoord, minorTickLineStyle, 'minorticks_' + i);

    for (var k = 0; k < minorTicksEls.length; k++) {
      group.add(minorTicksEls[k]);
    }
  }
}

function buildAxisLabel(group, transformGroup, axisModel, opt) {
  var axis = axisModel.axis;
  var show = retrieve(opt.axisLabelShow, axisModel.get(['axisLabel', 'show']));

  if (!show || axis.scale.isBlank()) {
    return;
  }

  var labelModel = axisModel.getModel('axisLabel');
  var labelMargin = labelModel.get('margin');
  var labels = axis.getViewLabels();
  var labelRotation = (retrieve(opt.labelRotate, labelModel.get('rotate')) || 0) * PI / 180;
  var labelLayout = AxisBuilder.innerTextLayout(opt.rotation, labelRotation, opt.labelDirection);
  var rawCategoryData = axisModel.getCategories && axisModel.getCategories(true);
  var labelEls = [];
  var silent = AxisBuilder.isLabelSilent(axisModel);
  var triggerEvent = axisModel.get('triggerEvent');
  each(labels, function (labelItem, index) {
    var tickValue = axis.scale.type === 'ordinal' ? axis.scale.getRawIndex(labelItem.tickValue) : labelItem.tickValue;
    var formattedLabel = labelItem.formattedLabel;
    var rawLabel = labelItem.rawLabel;
    var itemLabelModel = labelModel;

    if (rawCategoryData && rawCategoryData[tickValue]) {
      var rawCategoryItem = rawCategoryData[tickValue];

      if (isObject(rawCategoryItem) && rawCategoryItem.textStyle) {
        itemLabelModel = new Model(rawCategoryItem.textStyle, labelModel, axisModel.ecModel);
      }
    }

    var textColor = itemLabelModel.getTextColor() || axisModel.get(['axisLine', 'lineStyle', 'color']);
    var tickCoord = axis.dataToCoord(tickValue);
    var textEl = new graphic.Text({
      x: tickCoord,
      y: opt.labelOffset + opt.labelDirection * labelMargin,
      rotation: labelLayout.rotation,
      silent: silent,
      z2: 10,
      style: createTextStyle(itemLabelModel, {
        text: formattedLabel,
        align: itemLabelModel.getShallow('align', true) || labelLayout.textAlign,
        verticalAlign: itemLabelModel.getShallow('verticalAlign', true) || itemLabelModel.getShallow('baseline', true) || labelLayout.textVerticalAlign,
        fill: typeof textColor === 'function' ? textColor(axis.type === 'category' ? rawLabel : axis.type === 'value' ? tickValue + '' : tickValue, index) : textColor
      })
    });
    textEl.anid = 'label_' + tickValue;

    if (triggerEvent) {
      var eventData = AxisBuilder.makeAxisEventDataBase(axisModel);
      eventData.targetType = 'axisLabel';
      eventData.value = rawLabel;
      getECData(textEl).eventData = eventData;
    }

    transformGroup.add(textEl);
    textEl.updateTransform();
    labelEls.push(textEl);
    group.add(textEl);
    textEl.decomposeTransform();
  });
  return labelEls;
}

export default AxisBuilder;