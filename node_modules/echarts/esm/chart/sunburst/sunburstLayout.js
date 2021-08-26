
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

import { parsePercent } from '../../util/number';
import * as zrUtil from 'zrender/esm/core/util';
var RADIAN = Math.PI / 180;
export default function sunburstLayout(seriesType, ecModel, api) {
  ecModel.eachSeriesByType(seriesType, function (seriesModel) {
    var center = seriesModel.get('center');
    var radius = seriesModel.get('radius');

    if (!zrUtil.isArray(radius)) {
      radius = [0, radius];
    }

    if (!zrUtil.isArray(center)) {
      center = [center, center];
    }

    var width = api.getWidth();
    var height = api.getHeight();
    var size = Math.min(width, height);
    var cx = parsePercent(center[0], width);
    var cy = parsePercent(center[1], height);
    var r0 = parsePercent(radius[0], size / 2);
    var r = parsePercent(radius[1], size / 2);
    var startAngle = -seriesModel.get('startAngle') * RADIAN;
    var minAngle = seriesModel.get('minAngle') * RADIAN;
    var virtualRoot = seriesModel.getData().tree.root;
    var treeRoot = seriesModel.getViewRoot();
    var rootDepth = treeRoot.depth;
    var sort = seriesModel.get('sort');

    if (sort != null) {
      initChildren(treeRoot, sort);
    }

    var validDataCount = 0;
    zrUtil.each(treeRoot.children, function (child) {
      !isNaN(child.getValue()) && validDataCount++;
    });
    var sum = treeRoot.getValue();
    var unitRadian = Math.PI / (sum || validDataCount) * 2;
    var renderRollupNode = treeRoot.depth > 0;
    var levels = treeRoot.height - (renderRollupNode ? -1 : 1);
    var rPerLevel = (r - r0) / (levels || 1);
    var clockwise = seriesModel.get('clockwise');
    var stillShowZeroSum = seriesModel.get('stillShowZeroSum');
    var dir = clockwise ? 1 : -1;

    var renderNode = function (node, startAngle) {
      if (!node) {
        return;
      }

      var endAngle = startAngle;

      if (node !== virtualRoot) {
        var value = node.getValue();
        var angle = sum === 0 && stillShowZeroSum ? unitRadian : value * unitRadian;

        if (angle < minAngle) {
          angle = minAngle;
        }

        endAngle = startAngle + dir * angle;
        var depth = node.depth - rootDepth - (renderRollupNode ? -1 : 1);
        var rStart = r0 + rPerLevel * depth;
        var rEnd = r0 + rPerLevel * (depth + 1);
        var itemModel = node.getModel();

        if (itemModel.get('r0') != null) {
          rStart = parsePercent(itemModel.get('r0'), size / 2);
        }

        if (itemModel.get('r') != null) {
          rEnd = parsePercent(itemModel.get('r'), size / 2);
        }

        node.setLayout({
          angle: angle,
          startAngle: startAngle,
          endAngle: endAngle,
          clockwise: clockwise,
          cx: cx,
          cy: cy,
          r0: rStart,
          r: rEnd
        });
      }

      if (node.children && node.children.length) {
        var siblingAngle_1 = 0;
        zrUtil.each(node.children, function (node) {
          siblingAngle_1 += renderNode(node, startAngle + siblingAngle_1);
        });
      }

      return endAngle - startAngle;
    };

    if (renderRollupNode) {
      var rStart = r0;
      var rEnd = r0 + rPerLevel;
      var angle = Math.PI * 2;
      virtualRoot.setLayout({
        angle: angle,
        startAngle: startAngle,
        endAngle: startAngle + angle,
        clockwise: clockwise,
        cx: cx,
        cy: cy,
        r0: rStart,
        r: rEnd
      });
    }

    renderNode(treeRoot, startAngle);
  });
}

function initChildren(node, sortOrder) {
  var children = node.children || [];
  node.children = sort(children, sortOrder);

  if (children.length) {
    zrUtil.each(node.children, function (child) {
      initChildren(child, sortOrder);
    });
  }
}

function sort(children, sortOrder) {
  if (typeof sortOrder === 'function') {
    var sortTargets = zrUtil.map(children, function (child, idx) {
      var value = child.getValue();
      return {
        params: {
          depth: child.depth,
          height: child.height,
          dataIndex: child.dataIndex,
          getValue: function () {
            return value;
          }
        },
        index: idx
      };
    });
    sortTargets.sort(function (a, b) {
      return sortOrder(a.params, b.params);
    });
    return zrUtil.map(sortTargets, function (target) {
      return children[target.index];
    });
  } else {
    var isAsc_1 = sortOrder === 'asc';
    return children.sort(function (a, b) {
      var diff = (a.getValue() - b.getValue()) * (isAsc_1 ? 1 : -1);
      return diff === 0 ? (a.dataIndex - b.dataIndex) * (isAsc_1 ? -1 : 1) : diff;
    });
  }
}