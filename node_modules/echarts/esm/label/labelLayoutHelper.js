
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

import { BoundingRect, OrientedBoundingRect } from '../util/graphic';
export function prepareLayoutList(input) {
  var list = [];

  for (var i = 0; i < input.length; i++) {
    var rawItem = input[i];

    if (rawItem.defaultAttr.ignore) {
      continue;
    }

    var label = rawItem.label;
    var transform = label.getComputedTransform();
    var localRect = label.getBoundingRect();
    var isAxisAligned = !transform || transform[1] < 1e-5 && transform[2] < 1e-5;
    var minMargin = label.style.margin || 0;
    var globalRect = localRect.clone();
    globalRect.applyTransform(transform);
    globalRect.x -= minMargin / 2;
    globalRect.y -= minMargin / 2;
    globalRect.width += minMargin;
    globalRect.height += minMargin;
    var obb = isAxisAligned ? new OrientedBoundingRect(localRect, transform) : null;
    list.push({
      label: label,
      labelLine: rawItem.labelLine,
      rect: globalRect,
      localRect: localRect,
      obb: obb,
      priority: rawItem.priority,
      defaultAttr: rawItem.defaultAttr,
      layoutOption: rawItem.computedLayoutOption,
      axisAligned: isAxisAligned,
      transform: transform
    });
  }

  return list;
}

function shiftLayout(list, xyDim, sizeDim, minBound, maxBound, balanceShift) {
  var len = list.length;

  if (len < 2) {
    return;
  }

  list.sort(function (a, b) {
    return a.rect[xyDim] - b.rect[xyDim];
  });
  var lastPos = 0;
  var delta;
  var adjusted = false;
  var shifts = [];
  var totalShifts = 0;

  for (var i = 0; i < len; i++) {
    var item = list[i];
    var rect = item.rect;
    delta = rect[xyDim] - lastPos;

    if (delta < 0) {
      rect[xyDim] -= delta;
      item.label[xyDim] -= delta;
      adjusted = true;
    }

    var shift = Math.max(-delta, 0);
    shifts.push(shift);
    totalShifts += shift;
    lastPos = rect[xyDim] + rect[sizeDim];
  }

  if (totalShifts > 0 && balanceShift) {
    shiftList(-totalShifts / len, 0, len);
  }

  var first = list[0];
  var last = list[len - 1];
  var minGap;
  var maxGap;
  updateMinMaxGap();
  minGap < 0 && squeezeGaps(-minGap, 0.8);
  maxGap < 0 && squeezeGaps(maxGap, 0.8);
  updateMinMaxGap();
  takeBoundsGap(minGap, maxGap, 1);
  takeBoundsGap(maxGap, minGap, -1);
  updateMinMaxGap();

  if (minGap < 0) {
    squeezeWhenBailout(-minGap);
  }

  if (maxGap < 0) {
    squeezeWhenBailout(maxGap);
  }

  function updateMinMaxGap() {
    minGap = first.rect[xyDim] - minBound;
    maxGap = maxBound - last.rect[xyDim] - last.rect[sizeDim];
  }

  function takeBoundsGap(gapThisBound, gapOtherBound, moveDir) {
    if (gapThisBound < 0) {
      var moveFromMaxGap = Math.min(gapOtherBound, -gapThisBound);

      if (moveFromMaxGap > 0) {
        shiftList(moveFromMaxGap * moveDir, 0, len);
        var remained = moveFromMaxGap + gapThisBound;

        if (remained < 0) {
          squeezeGaps(-remained * moveDir, 1);
        }
      } else {
        squeezeGaps(-gapThisBound * moveDir, 1);
      }
    }
  }

  function shiftList(delta, start, end) {
    if (delta !== 0) {
      adjusted = true;
    }

    for (var i = start; i < end; i++) {
      var item = list[i];
      var rect = item.rect;
      rect[xyDim] += delta;
      item.label[xyDim] += delta;
    }
  }

  function squeezeGaps(delta, maxSqeezePercent) {
    var gaps = [];
    var totalGaps = 0;

    for (var i = 1; i < len; i++) {
      var prevItemRect = list[i - 1].rect;
      var gap = Math.max(list[i].rect[xyDim] - prevItemRect[xyDim] - prevItemRect[sizeDim], 0);
      gaps.push(gap);
      totalGaps += gap;
    }

    if (!totalGaps) {
      return;
    }

    var squeezePercent = Math.min(Math.abs(delta) / totalGaps, maxSqeezePercent);

    if (delta > 0) {
      for (var i = 0; i < len - 1; i++) {
        var movement = gaps[i] * squeezePercent;
        shiftList(movement, 0, i + 1);
      }
    } else {
      for (var i = len - 1; i > 0; i--) {
        var movement = gaps[i - 1] * squeezePercent;
        shiftList(-movement, i, len);
      }
    }
  }

  function squeezeWhenBailout(delta) {
    var dir = delta < 0 ? -1 : 1;
    delta = Math.abs(delta);
    var moveForEachLabel = Math.ceil(delta / (len - 1));

    for (var i = 0; i < len - 1; i++) {
      if (dir > 0) {
        shiftList(moveForEachLabel, 0, i + 1);
      } else {
        shiftList(-moveForEachLabel, len - i - 1, len);
      }

      delta -= moveForEachLabel;

      if (delta <= 0) {
        return;
      }
    }
  }

  return adjusted;
}

export function shiftLayoutOnX(list, leftBound, rightBound, balanceShift) {
  return shiftLayout(list, 'x', 'width', leftBound, rightBound, balanceShift);
}
export function shiftLayoutOnY(list, topBound, bottomBound, balanceShift) {
  return shiftLayout(list, 'y', 'height', topBound, bottomBound, balanceShift);
}
export function hideOverlap(labelList) {
  var displayedLabels = [];
  labelList.sort(function (a, b) {
    return b.priority - a.priority;
  });
  var globalRect = new BoundingRect(0, 0, 0, 0);

  function hideEl(el) {
    if (!el.ignore) {
      var emphasisState = el.ensureState('emphasis');

      if (emphasisState.ignore == null) {
        emphasisState.ignore = false;
      }
    }

    el.ignore = true;
  }

  for (var i = 0; i < labelList.length; i++) {
    var labelItem = labelList[i];
    var isAxisAligned = labelItem.axisAligned;
    var localRect = labelItem.localRect;
    var transform = labelItem.transform;
    var label = labelItem.label;
    var labelLine = labelItem.labelLine;
    globalRect.copy(labelItem.rect);
    globalRect.width -= 0.1;
    globalRect.height -= 0.1;
    globalRect.x += 0.05;
    globalRect.y += 0.05;
    var obb = labelItem.obb;
    var overlapped = false;

    for (var j = 0; j < displayedLabels.length; j++) {
      var existsTextCfg = displayedLabels[j];

      if (!globalRect.intersect(existsTextCfg.rect)) {
        continue;
      }

      if (isAxisAligned && existsTextCfg.axisAligned) {
        overlapped = true;
        break;
      }

      if (!existsTextCfg.obb) {
        existsTextCfg.obb = new OrientedBoundingRect(existsTextCfg.localRect, existsTextCfg.transform);
      }

      if (!obb) {
        obb = new OrientedBoundingRect(localRect, transform);
      }

      if (obb.intersect(existsTextCfg.obb)) {
        overlapped = true;
        break;
      }
    }

    if (overlapped) {
      hideEl(label);
      labelLine && hideEl(labelLine);
    } else {
      label.attr('ignore', labelItem.defaultAttr.ignore);
      labelLine && labelLine.attr('ignore', labelItem.defaultAttr.labelGuideIgnore);
      displayedLabels.push(labelItem);
    }
  }
}