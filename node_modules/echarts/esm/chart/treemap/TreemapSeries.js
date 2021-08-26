
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
import SeriesModel from '../../model/Series';
import Tree from '../../data/Tree';
import Model from '../../model/Model';
import { wrapTreePathInfo } from '../helper/treeHelper';
import { normalizeToArray } from '../../util/model';
import { createTooltipMarkup } from '../../component/tooltip/tooltipMarkup';
import enableAriaDecalForTree from '../helper/enableAriaDecalForTree';

var TreemapSeriesModel = function (_super) {
  __extends(TreemapSeriesModel, _super);

  function TreemapSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = TreemapSeriesModel.type;
    _this.preventUsingHoverLayer = true;
    return _this;
  }

  TreemapSeriesModel.prototype.getInitialData = function (option, ecModel) {
    var root = {
      name: option.name,
      children: option.data
    };
    completeTreeValue(root);
    var levels = option.levels || [];
    var designatedVisualItemStyle = this.designatedVisualItemStyle = {};
    var designatedVisualModel = new Model({
      itemStyle: designatedVisualItemStyle
    }, this, ecModel);
    levels = option.levels = setDefault(levels, ecModel);
    var levelModels = zrUtil.map(levels || [], function (levelDefine) {
      return new Model(levelDefine, designatedVisualModel, ecModel);
    }, this);
    var tree = Tree.createTree(root, this, beforeLink);

    function beforeLink(nodeData) {
      nodeData.wrapMethod('getItemModel', function (model, idx) {
        var node = tree.getNodeByDataIndex(idx);
        var levelModel = levelModels[node.depth];
        model.parentModel = levelModel || designatedVisualModel;
        return model;
      });
    }

    return tree.data;
  };

  TreemapSeriesModel.prototype.optionUpdated = function () {
    this.resetViewRoot();
  };

  TreemapSeriesModel.prototype.formatTooltip = function (dataIndex, multipleSeries, dataType) {
    var data = this.getData();
    var value = this.getRawValue(dataIndex);
    var name = data.getName(dataIndex);
    return createTooltipMarkup('nameValue', {
      name: name,
      value: value
    });
  };

  TreemapSeriesModel.prototype.getDataParams = function (dataIndex) {
    var params = _super.prototype.getDataParams.apply(this, arguments);

    var node = this.getData().tree.getNodeByDataIndex(dataIndex);
    params.treePathInfo = wrapTreePathInfo(node, this);
    return params;
  };

  TreemapSeriesModel.prototype.setLayoutInfo = function (layoutInfo) {
    this.layoutInfo = this.layoutInfo || {};
    zrUtil.extend(this.layoutInfo, layoutInfo);
  };

  TreemapSeriesModel.prototype.mapIdToIndex = function (id) {
    var idIndexMap = this._idIndexMap;

    if (!idIndexMap) {
      idIndexMap = this._idIndexMap = zrUtil.createHashMap();
      this._idIndexMapCount = 0;
    }

    var index = idIndexMap.get(id);

    if (index == null) {
      idIndexMap.set(id, index = this._idIndexMapCount++);
    }

    return index;
  };

  TreemapSeriesModel.prototype.getViewRoot = function () {
    return this._viewRoot;
  };

  TreemapSeriesModel.prototype.resetViewRoot = function (viewRoot) {
    viewRoot ? this._viewRoot = viewRoot : viewRoot = this._viewRoot;
    var root = this.getRawData().tree.root;

    if (!viewRoot || viewRoot !== root && !root.contains(viewRoot)) {
      this._viewRoot = root;
    }
  };

  TreemapSeriesModel.prototype.enableAriaDecal = function () {
    enableAriaDecalForTree(this);
  };

  TreemapSeriesModel.type = 'series.treemap';
  TreemapSeriesModel.layoutMode = 'box';
  TreemapSeriesModel.defaultOption = {
    progressive: 0,
    left: 'center',
    top: 'middle',
    width: '80%',
    height: '80%',
    sort: true,
    clipWindow: 'origin',
    squareRatio: 0.5 * (1 + Math.sqrt(5)),
    leafDepth: null,
    drillDownIcon: '▶',
    zoomToNodeRatio: 0.32 * 0.32,
    roam: true,
    nodeClick: 'zoomToNode',
    animation: true,
    animationDurationUpdate: 900,
    animationEasing: 'quinticInOut',
    breadcrumb: {
      show: true,
      height: 22,
      left: 'center',
      top: 'bottom',
      emptyItemWidth: 25,
      itemStyle: {
        color: 'rgba(0,0,0,0.7)',
        textStyle: {
          color: '#fff'
        }
      }
    },
    label: {
      show: true,
      distance: 0,
      padding: 5,
      position: 'inside',
      color: '#fff',
      overflow: 'truncate'
    },
    upperLabel: {
      show: false,
      position: [0, '50%'],
      height: 20,
      overflow: 'truncate',
      verticalAlign: 'middle'
    },
    itemStyle: {
      color: null,
      colorAlpha: null,
      colorSaturation: null,
      borderWidth: 0,
      gapWidth: 0,
      borderColor: '#fff',
      borderColorSaturation: null
    },
    emphasis: {
      upperLabel: {
        show: true,
        position: [0, '50%'],
        ellipsis: true,
        verticalAlign: 'middle'
      }
    },
    visualDimension: 0,
    visualMin: null,
    visualMax: null,
    color: [],
    colorAlpha: null,
    colorSaturation: null,
    colorMappingBy: 'index',
    visibleMin: 10,
    childrenVisibleMin: null,
    levels: []
  };
  return TreemapSeriesModel;
}(SeriesModel);

function completeTreeValue(dataNode) {
  var sum = 0;
  zrUtil.each(dataNode.children, function (child) {
    completeTreeValue(child);
    var childValue = child.value;
    zrUtil.isArray(childValue) && (childValue = childValue[0]);
    sum += childValue;
  });
  var thisValue = dataNode.value;

  if (zrUtil.isArray(thisValue)) {
    thisValue = thisValue[0];
  }

  if (thisValue == null || isNaN(thisValue)) {
    thisValue = sum;
  }

  if (thisValue < 0) {
    thisValue = 0;
  }

  zrUtil.isArray(dataNode.value) ? dataNode.value[0] = thisValue : dataNode.value = thisValue;
}

function setDefault(levels, ecModel) {
  var globalColorList = normalizeToArray(ecModel.get('color'));
  var globalDecalList = normalizeToArray(ecModel.get('decals'));

  if (!globalColorList) {
    return;
  }

  levels = levels || [];
  var hasColorDefine;
  var hasDecalDefine;
  zrUtil.each(levels, function (levelDefine) {
    var model = new Model(levelDefine);
    var modelColor = model.get('color');
    var modelDecal = model.get('decal');

    if (model.get(['itemStyle', 'color']) || modelColor && modelColor !== 'none') {
      hasColorDefine = true;
    }

    if (model.get(['itemStyle', 'decal']) || modelDecal && modelDecal !== 'none') {
      hasDecalDefine = true;
    }
  });
  var level0 = levels[0] || (levels[0] = {});

  if (!hasColorDefine) {
    level0.color = globalColorList.slice();
  }

  if (!hasDecalDefine && globalDecalList) {
    level0.decal = globalDecalList.slice();
  }

  return levels;
}

SeriesModel.registerClass(TreemapSeriesModel);
export default TreemapSeriesModel;