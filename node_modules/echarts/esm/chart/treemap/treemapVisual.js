
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

import VisualMapping from '../../visual/VisualMapping';
import { each, extend, isArray } from 'zrender/esm/core/util';
import { modifyHSL, modifyAlpha } from 'zrender/esm/tool/color';
import { makeInner } from '../../util/model';
var ITEM_STYLE_NORMAL = 'itemStyle';
var inner = makeInner();
export default {
  seriesType: 'treemap',
  reset: function (seriesModel) {
    var tree = seriesModel.getData().tree;
    var root = tree.root;

    if (root.isRemoved()) {
      return;
    }

    travelTree(root, {}, seriesModel.getViewRoot().getAncestors(), seriesModel);
  }
};

function travelTree(node, designatedVisual, viewRootAncestors, seriesModel) {
  var nodeModel = node.getModel();
  var nodeLayout = node.getLayout();
  var data = node.hostTree.data;

  if (!nodeLayout || nodeLayout.invisible || !nodeLayout.isInView) {
    return;
  }

  var nodeItemStyleModel = nodeModel.getModel(ITEM_STYLE_NORMAL);
  var visuals = buildVisuals(nodeItemStyleModel, designatedVisual, seriesModel);
  var existsStyle = data.ensureUniqueItemVisual(node.dataIndex, 'style');
  var borderColor = nodeItemStyleModel.get('borderColor');
  var borderColorSaturation = nodeItemStyleModel.get('borderColorSaturation');
  var thisNodeColor;

  if (borderColorSaturation != null) {
    thisNodeColor = calculateColor(visuals);
    borderColor = calculateBorderColor(borderColorSaturation, thisNodeColor);
  }

  existsStyle.stroke = borderColor;
  var viewChildren = node.viewChildren;

  if (!viewChildren || !viewChildren.length) {
    thisNodeColor = calculateColor(visuals);
    existsStyle.fill = thisNodeColor;
  } else {
    var mapping_1 = buildVisualMapping(node, nodeModel, nodeLayout, nodeItemStyleModel, visuals, viewChildren);
    each(viewChildren, function (child, index) {
      if (child.depth >= viewRootAncestors.length || child === viewRootAncestors[child.depth]) {
        var childVisual = mapVisual(nodeModel, visuals, child, index, mapping_1, seriesModel);
        travelTree(child, childVisual, viewRootAncestors, seriesModel);
      }
    });
  }
}

function buildVisuals(nodeItemStyleModel, designatedVisual, seriesModel) {
  var visuals = extend({}, designatedVisual);
  var designatedVisualItemStyle = seriesModel.designatedVisualItemStyle;
  each(['color', 'colorAlpha', 'colorSaturation'], function (visualName) {
    designatedVisualItemStyle[visualName] = designatedVisual[visualName];
    var val = nodeItemStyleModel.get(visualName);
    designatedVisualItemStyle[visualName] = null;
    val != null && (visuals[visualName] = val);
  });
  return visuals;
}

function calculateColor(visuals) {
  var color = getValueVisualDefine(visuals, 'color');

  if (color) {
    var colorAlpha = getValueVisualDefine(visuals, 'colorAlpha');
    var colorSaturation = getValueVisualDefine(visuals, 'colorSaturation');

    if (colorSaturation) {
      color = modifyHSL(color, null, null, colorSaturation);
    }

    if (colorAlpha) {
      color = modifyAlpha(color, colorAlpha);
    }

    return color;
  }
}

function calculateBorderColor(borderColorSaturation, thisNodeColor) {
  return thisNodeColor != null ? modifyHSL(thisNodeColor, null, null, borderColorSaturation) : null;
}

function getValueVisualDefine(visuals, name) {
  var value = visuals[name];

  if (value != null && value !== 'none') {
    return value;
  }
}

function buildVisualMapping(node, nodeModel, nodeLayout, nodeItemStyleModel, visuals, viewChildren) {
  if (!viewChildren || !viewChildren.length) {
    return;
  }

  var rangeVisual = getRangeVisual(nodeModel, 'color') || visuals.color != null && visuals.color !== 'none' && (getRangeVisual(nodeModel, 'colorAlpha') || getRangeVisual(nodeModel, 'colorSaturation'));

  if (!rangeVisual) {
    return;
  }

  var visualMin = nodeModel.get('visualMin');
  var visualMax = nodeModel.get('visualMax');
  var dataExtent = nodeLayout.dataExtent.slice();
  visualMin != null && visualMin < dataExtent[0] && (dataExtent[0] = visualMin);
  visualMax != null && visualMax > dataExtent[1] && (dataExtent[1] = visualMax);
  var colorMappingBy = nodeModel.get('colorMappingBy');
  var opt = {
    type: rangeVisual.name,
    dataExtent: dataExtent,
    visual: rangeVisual.range
  };

  if (opt.type === 'color' && (colorMappingBy === 'index' || colorMappingBy === 'id')) {
    opt.mappingMethod = 'category';
    opt.loop = true;
  } else {
    opt.mappingMethod = 'linear';
  }

  var mapping = new VisualMapping(opt);
  inner(mapping).drColorMappingBy = colorMappingBy;
  return mapping;
}

function getRangeVisual(nodeModel, name) {
  var range = nodeModel.get(name);
  return isArray(range) && range.length ? {
    name: name,
    range: range
  } : null;
}

function mapVisual(nodeModel, visuals, child, index, mapping, seriesModel) {
  var childVisuals = extend({}, visuals);

  if (mapping) {
    var mappingType = mapping.type;
    var colorMappingBy = mappingType === 'color' && inner(mapping).drColorMappingBy;
    var value = colorMappingBy === 'index' ? index : colorMappingBy === 'id' ? seriesModel.mapIdToIndex(child.getId()) : child.getValue(nodeModel.get('visualDimension'));
    childVisuals[mappingType] = mapping.mapValueToVisual(value);
  }

  return childVisuals;
}