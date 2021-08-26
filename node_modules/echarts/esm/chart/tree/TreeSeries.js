
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
import SeriesModel from '../../model/Series';
import Tree from '../../data/Tree';
import Model from '../../model/Model';
import { createTooltipMarkup } from '../../component/tooltip/tooltipMarkup';

var TreeSeriesModel = function (_super) {
  __extends(TreeSeriesModel, _super);

  function TreeSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.hasSymbolVisual = true;
    _this.ignoreStyleOnData = true;
    return _this;
  }

  TreeSeriesModel.prototype.getInitialData = function (option) {
    var root = {
      name: option.name,
      children: option.data
    };
    var leaves = option.leaves || {};
    var leavesModel = new Model(leaves, this, this.ecModel);
    var tree = Tree.createTree(root, this, beforeLink);

    function beforeLink(nodeData) {
      nodeData.wrapMethod('getItemModel', function (model, idx) {
        var node = tree.getNodeByDataIndex(idx);

        if (!node.children.length || !node.isExpand) {
          model.parentModel = leavesModel;
        }

        return model;
      });
    }

    var treeDepth = 0;
    tree.eachNode('preorder', function (node) {
      if (node.depth > treeDepth) {
        treeDepth = node.depth;
      }
    });
    var expandAndCollapse = option.expandAndCollapse;
    var expandTreeDepth = expandAndCollapse && option.initialTreeDepth >= 0 ? option.initialTreeDepth : treeDepth;
    tree.root.eachNode('preorder', function (node) {
      var item = node.hostTree.data.getRawDataItem(node.dataIndex);
      node.isExpand = item && item.collapsed != null ? !item.collapsed : node.depth <= expandTreeDepth;
    });
    return tree.data;
  };

  TreeSeriesModel.prototype.getOrient = function () {
    var orient = this.get('orient');

    if (orient === 'horizontal') {
      orient = 'LR';
    } else if (orient === 'vertical') {
      orient = 'TB';
    }

    return orient;
  };

  TreeSeriesModel.prototype.setZoom = function (zoom) {
    this.option.zoom = zoom;
  };

  TreeSeriesModel.prototype.setCenter = function (center) {
    this.option.center = center;
  };

  TreeSeriesModel.prototype.formatTooltip = function (dataIndex, multipleSeries, dataType) {
    var tree = this.getData().tree;
    var realRoot = tree.root.children[0];
    var node = tree.getNodeByDataIndex(dataIndex);
    var value = node.getValue();
    var name = node.name;

    while (node && node !== realRoot) {
      name = node.parentNode.name + '.' + name;
      node = node.parentNode;
    }

    return createTooltipMarkup('nameValue', {
      name: name,
      value: value,
      noValue: isNaN(value) || value == null
    });
  };

  TreeSeriesModel.type = 'series.tree';
  TreeSeriesModel.layoutMode = 'box';
  TreeSeriesModel.defaultOption = {
    zlevel: 0,
    z: 2,
    coordinateSystem: 'view',
    left: '12%',
    top: '12%',
    right: '12%',
    bottom: '12%',
    layout: 'orthogonal',
    edgeShape: 'curve',
    edgeForkPosition: '50%',
    roam: false,
    nodeScaleRatio: 0.4,
    center: null,
    zoom: 1,
    orient: 'LR',
    symbol: 'emptyCircle',
    symbolSize: 7,
    expandAndCollapse: true,
    initialTreeDepth: 2,
    lineStyle: {
      color: '#ccc',
      width: 1.5,
      curveness: 0.5
    },
    itemStyle: {
      color: 'lightsteelblue',
      borderColor: '#c23531',
      borderWidth: 1.5
    },
    label: {
      show: true
    },
    animationEasing: 'linear',
    animationDuration: 700,
    animationDurationUpdate: 500
  };
  return TreeSeriesModel;
}(SeriesModel);

SeriesModel.registerClass(TreeSeriesModel);
export default TreeSeriesModel;