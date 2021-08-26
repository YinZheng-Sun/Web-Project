
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

import * as layout from '../../util/layout';
import * as zrUtil from 'zrender/esm/core/util';
import { groupData } from '../../util/model';
export default function sankeyLayout(ecModel, api) {
  ecModel.eachSeriesByType('sankey', function (seriesModel) {
    var nodeWidth = seriesModel.get('nodeWidth');
    var nodeGap = seriesModel.get('nodeGap');
    var layoutInfo = getViewRect(seriesModel, api);
    seriesModel.layoutInfo = layoutInfo;
    var width = layoutInfo.width;
    var height = layoutInfo.height;
    var graph = seriesModel.getGraph();
    var nodes = graph.nodes;
    var edges = graph.edges;
    computeNodeValues(nodes);
    var filteredNodes = zrUtil.filter(nodes, function (node) {
      return node.getLayout().value === 0;
    });
    var iterations = filteredNodes.length !== 0 ? 0 : seriesModel.get('layoutIterations');
    var orient = seriesModel.get('orient');
    var nodeAlign = seriesModel.get('nodeAlign');
    layoutSankey(nodes, edges, nodeWidth, nodeGap, width, height, iterations, orient, nodeAlign);
  });
}

function getViewRect(seriesModel, api) {
  return layout.getLayoutRect(seriesModel.getBoxLayoutParams(), {
    width: api.getWidth(),
    height: api.getHeight()
  });
}

function layoutSankey(nodes, edges, nodeWidth, nodeGap, width, height, iterations, orient, nodeAlign) {
  computeNodeBreadths(nodes, edges, nodeWidth, width, height, orient, nodeAlign);
  computeNodeDepths(nodes, edges, height, width, nodeGap, iterations, orient);
  computeEdgeDepths(nodes, orient);
}

function computeNodeValues(nodes) {
  zrUtil.each(nodes, function (node) {
    var value1 = sum(node.outEdges, getEdgeValue);
    var value2 = sum(node.inEdges, getEdgeValue);
    var nodeRawValue = node.getValue() || 0;
    var value = Math.max(value1, value2, nodeRawValue);
    node.setLayout({
      value: value
    }, true);
  });
}

function computeNodeBreadths(nodes, edges, nodeWidth, width, height, orient, nodeAlign) {
  var remainEdges = [];
  var indegreeArr = [];
  var zeroIndegrees = [];
  var nextTargetNode = [];
  var x = 0;

  for (var i = 0; i < edges.length; i++) {
    remainEdges[i] = 1;
  }

  for (var i = 0; i < nodes.length; i++) {
    indegreeArr[i] = nodes[i].inEdges.length;

    if (indegreeArr[i] === 0) {
      zeroIndegrees.push(nodes[i]);
    }
  }

  var maxNodeDepth = -1;

  while (zeroIndegrees.length) {
    for (var idx = 0; idx < zeroIndegrees.length; idx++) {
      var node = zeroIndegrees[idx];
      var item = node.hostGraph.data.getRawDataItem(node.dataIndex);
      var isItemDepth = item.depth != null && item.depth >= 0;

      if (isItemDepth && item.depth > maxNodeDepth) {
        maxNodeDepth = item.depth;
      }

      node.setLayout({
        depth: isItemDepth ? item.depth : x
      }, true);
      orient === 'vertical' ? node.setLayout({
        dy: nodeWidth
      }, true) : node.setLayout({
        dx: nodeWidth
      }, true);

      for (var edgeIdx = 0; edgeIdx < node.outEdges.length; edgeIdx++) {
        var edge = node.outEdges[edgeIdx];
        var indexEdge = edges.indexOf(edge);
        remainEdges[indexEdge] = 0;
        var targetNode = edge.node2;
        var nodeIndex = nodes.indexOf(targetNode);

        if (--indegreeArr[nodeIndex] === 0 && nextTargetNode.indexOf(targetNode) < 0) {
          nextTargetNode.push(targetNode);
        }
      }
    }

    ++x;
    zeroIndegrees = nextTargetNode;
    nextTargetNode = [];
  }

  for (var i = 0; i < remainEdges.length; i++) {
    if (remainEdges[i] === 1) {
      throw new Error('Sankey is a DAG, the original data has cycle!');
    }
  }

  var maxDepth = maxNodeDepth > x - 1 ? maxNodeDepth : x - 1;

  if (nodeAlign && nodeAlign !== 'left') {
    adjustNodeWithNodeAlign(nodes, nodeAlign, orient, maxDepth);
  }

  var kx = orient === 'vertical' ? (height - nodeWidth) / maxDepth : (width - nodeWidth) / maxDepth;
  scaleNodeBreadths(nodes, kx, orient);
}

function isNodeDepth(node) {
  var item = node.hostGraph.data.getRawDataItem(node.dataIndex);
  return item.depth != null && item.depth >= 0;
}

function adjustNodeWithNodeAlign(nodes, nodeAlign, orient, maxDepth) {
  if (nodeAlign === 'right') {
    var nextSourceNode = [];
    var remainNodes = nodes;
    var nodeHeight = 0;

    while (remainNodes.length) {
      for (var i = 0; i < remainNodes.length; i++) {
        var node = remainNodes[i];
        node.setLayout({
          skNodeHeight: nodeHeight
        }, true);

        for (var j = 0; j < node.inEdges.length; j++) {
          var edge = node.inEdges[j];

          if (nextSourceNode.indexOf(edge.node1) < 0) {
            nextSourceNode.push(edge.node1);
          }
        }
      }

      remainNodes = nextSourceNode;
      nextSourceNode = [];
      ++nodeHeight;
    }

    zrUtil.each(nodes, function (node) {
      if (!isNodeDepth(node)) {
        node.setLayout({
          depth: Math.max(0, maxDepth - node.getLayout().skNodeHeight)
        }, true);
      }
    });
  } else if (nodeAlign === 'justify') {
    moveSinksRight(nodes, maxDepth);
  }
}

function moveSinksRight(nodes, maxDepth) {
  zrUtil.each(nodes, function (node) {
    if (!isNodeDepth(node) && !node.outEdges.length) {
      node.setLayout({
        depth: maxDepth
      }, true);
    }
  });
}

function scaleNodeBreadths(nodes, kx, orient) {
  zrUtil.each(nodes, function (node) {
    var nodeDepth = node.getLayout().depth * kx;
    orient === 'vertical' ? node.setLayout({
      y: nodeDepth
    }, true) : node.setLayout({
      x: nodeDepth
    }, true);
  });
}

function computeNodeDepths(nodes, edges, height, width, nodeGap, iterations, orient) {
  var nodesByBreadth = prepareNodesByBreadth(nodes, orient);
  initializeNodeDepth(nodesByBreadth, edges, height, width, nodeGap, orient);
  resolveCollisions(nodesByBreadth, nodeGap, height, width, orient);

  for (var alpha = 1; iterations > 0; iterations--) {
    alpha *= 0.99;
    relaxRightToLeft(nodesByBreadth, alpha, orient);
    resolveCollisions(nodesByBreadth, nodeGap, height, width, orient);
    relaxLeftToRight(nodesByBreadth, alpha, orient);
    resolveCollisions(nodesByBreadth, nodeGap, height, width, orient);
  }
}

function prepareNodesByBreadth(nodes, orient) {
  var nodesByBreadth = [];
  var keyAttr = orient === 'vertical' ? 'y' : 'x';
  var groupResult = groupData(nodes, function (node) {
    return node.getLayout()[keyAttr];
  });
  groupResult.keys.sort(function (a, b) {
    return a - b;
  });
  zrUtil.each(groupResult.keys, function (key) {
    nodesByBreadth.push(groupResult.buckets.get(key));
  });
  return nodesByBreadth;
}

function initializeNodeDepth(nodesByBreadth, edges, height, width, nodeGap, orient) {
  var minKy = Infinity;
  zrUtil.each(nodesByBreadth, function (nodes) {
    var n = nodes.length;
    var sum = 0;
    zrUtil.each(nodes, function (node) {
      sum += node.getLayout().value;
    });
    var ky = orient === 'vertical' ? (width - (n - 1) * nodeGap) / sum : (height - (n - 1) * nodeGap) / sum;

    if (ky < minKy) {
      minKy = ky;
    }
  });
  zrUtil.each(nodesByBreadth, function (nodes) {
    zrUtil.each(nodes, function (node, i) {
      var nodeDy = node.getLayout().value * minKy;

      if (orient === 'vertical') {
        node.setLayout({
          x: i
        }, true);
        node.setLayout({
          dx: nodeDy
        }, true);
      } else {
        node.setLayout({
          y: i
        }, true);
        node.setLayout({
          dy: nodeDy
        }, true);
      }
    });
  });
  zrUtil.each(edges, function (edge) {
    var edgeDy = +edge.getValue() * minKy;
    edge.setLayout({
      dy: edgeDy
    }, true);
  });
}

function resolveCollisions(nodesByBreadth, nodeGap, height, width, orient) {
  var keyAttr = orient === 'vertical' ? 'x' : 'y';
  zrUtil.each(nodesByBreadth, function (nodes) {
    nodes.sort(function (a, b) {
      return a.getLayout()[keyAttr] - b.getLayout()[keyAttr];
    });
    var nodeX;
    var node;
    var dy;
    var y0 = 0;
    var n = nodes.length;
    var nodeDyAttr = orient === 'vertical' ? 'dx' : 'dy';

    for (var i = 0; i < n; i++) {
      node = nodes[i];
      dy = y0 - node.getLayout()[keyAttr];

      if (dy > 0) {
        nodeX = node.getLayout()[keyAttr] + dy;
        orient === 'vertical' ? node.setLayout({
          x: nodeX
        }, true) : node.setLayout({
          y: nodeX
        }, true);
      }

      y0 = node.getLayout()[keyAttr] + node.getLayout()[nodeDyAttr] + nodeGap;
    }

    var viewWidth = orient === 'vertical' ? width : height;
    dy = y0 - nodeGap - viewWidth;

    if (dy > 0) {
      nodeX = node.getLayout()[keyAttr] - dy;
      orient === 'vertical' ? node.setLayout({
        x: nodeX
      }, true) : node.setLayout({
        y: nodeX
      }, true);
      y0 = nodeX;

      for (var i = n - 2; i >= 0; --i) {
        node = nodes[i];
        dy = node.getLayout()[keyAttr] + node.getLayout()[nodeDyAttr] + nodeGap - y0;

        if (dy > 0) {
          nodeX = node.getLayout()[keyAttr] - dy;
          orient === 'vertical' ? node.setLayout({
            x: nodeX
          }, true) : node.setLayout({
            y: nodeX
          }, true);
        }

        y0 = node.getLayout()[keyAttr];
      }
    }
  });
}

function relaxRightToLeft(nodesByBreadth, alpha, orient) {
  zrUtil.each(nodesByBreadth.slice().reverse(), function (nodes) {
    zrUtil.each(nodes, function (node) {
      if (node.outEdges.length) {
        var y = sum(node.outEdges, weightedTarget, orient) / sum(node.outEdges, getEdgeValue);

        if (isNaN(y)) {
          var len = node.outEdges.length;
          y = len ? sum(node.outEdges, centerTarget, orient) / len : 0;
        }

        if (orient === 'vertical') {
          var nodeX = node.getLayout().x + (y - center(node, orient)) * alpha;
          node.setLayout({
            x: nodeX
          }, true);
        } else {
          var nodeY = node.getLayout().y + (y - center(node, orient)) * alpha;
          node.setLayout({
            y: nodeY
          }, true);
        }
      }
    });
  });
}

function weightedTarget(edge, orient) {
  return center(edge.node2, orient) * edge.getValue();
}

function centerTarget(edge, orient) {
  return center(edge.node2, orient);
}

function weightedSource(edge, orient) {
  return center(edge.node1, orient) * edge.getValue();
}

function centerSource(edge, orient) {
  return center(edge.node1, orient);
}

function center(node, orient) {
  return orient === 'vertical' ? node.getLayout().x + node.getLayout().dx / 2 : node.getLayout().y + node.getLayout().dy / 2;
}

function getEdgeValue(edge) {
  return edge.getValue();
}

function sum(array, cb, orient) {
  var sum = 0;
  var len = array.length;
  var i = -1;

  while (++i < len) {
    var value = +cb(array[i], orient);

    if (!isNaN(value)) {
      sum += value;
    }
  }

  return sum;
}

function relaxLeftToRight(nodesByBreadth, alpha, orient) {
  zrUtil.each(nodesByBreadth, function (nodes) {
    zrUtil.each(nodes, function (node) {
      if (node.inEdges.length) {
        var y = sum(node.inEdges, weightedSource, orient) / sum(node.inEdges, getEdgeValue);

        if (isNaN(y)) {
          var len = node.inEdges.length;
          y = len ? sum(node.inEdges, centerSource, orient) / len : 0;
        }

        if (orient === 'vertical') {
          var nodeX = node.getLayout().x + (y - center(node, orient)) * alpha;
          node.setLayout({
            x: nodeX
          }, true);
        } else {
          var nodeY = node.getLayout().y + (y - center(node, orient)) * alpha;
          node.setLayout({
            y: nodeY
          }, true);
        }
      }
    });
  });
}

function computeEdgeDepths(nodes, orient) {
  var keyAttr = orient === 'vertical' ? 'x' : 'y';
  zrUtil.each(nodes, function (node) {
    node.outEdges.sort(function (a, b) {
      return a.node2.getLayout()[keyAttr] - b.node2.getLayout()[keyAttr];
    });
    node.inEdges.sort(function (a, b) {
      return a.node1.getLayout()[keyAttr] - b.node1.getLayout()[keyAttr];
    });
  });
  zrUtil.each(nodes, function (node) {
    var sy = 0;
    var ty = 0;
    zrUtil.each(node.outEdges, function (edge) {
      edge.setLayout({
        sy: sy
      }, true);
      sy += edge.getLayout().dy;
    });
    zrUtil.each(node.inEdges, function (edge) {
      edge.setLayout({
        ty: ty
      }, true);
      ty += edge.getLayout().dy;
    });
  });
}