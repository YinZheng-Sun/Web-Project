
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
export function init(inRoot) {
  var root = inRoot;
  root.hierNode = {
    defaultAncestor: null,
    ancestor: root,
    prelim: 0,
    modifier: 0,
    change: 0,
    shift: 0,
    i: 0,
    thread: null
  };
  var nodes = [root];
  var node;
  var children;

  while (node = nodes.pop()) {
    children = node.children;

    if (node.isExpand && children.length) {
      var n = children.length;

      for (var i = n - 1; i >= 0; i--) {
        var child = children[i];
        child.hierNode = {
          defaultAncestor: null,
          ancestor: child,
          prelim: 0,
          modifier: 0,
          change: 0,
          shift: 0,
          i: i,
          thread: null
        };
        nodes.push(child);
      }
    }
  }
}
export function firstWalk(node, separation) {
  var children = node.isExpand ? node.children : [];
  var siblings = node.parentNode.children;
  var subtreeW = node.hierNode.i ? siblings[node.hierNode.i - 1] : null;

  if (children.length) {
    executeShifts(node);
    var midPoint = (children[0].hierNode.prelim + children[children.length - 1].hierNode.prelim) / 2;

    if (subtreeW) {
      node.hierNode.prelim = subtreeW.hierNode.prelim + separation(node, subtreeW);
      node.hierNode.modifier = node.hierNode.prelim - midPoint;
    } else {
      node.hierNode.prelim = midPoint;
    }
  } else if (subtreeW) {
    node.hierNode.prelim = subtreeW.hierNode.prelim + separation(node, subtreeW);
  }

  node.parentNode.hierNode.defaultAncestor = apportion(node, subtreeW, node.parentNode.hierNode.defaultAncestor || siblings[0], separation);
}
export function secondWalk(node) {
  var nodeX = node.hierNode.prelim + node.parentNode.hierNode.modifier;
  node.setLayout({
    x: nodeX
  }, true);
  node.hierNode.modifier += node.parentNode.hierNode.modifier;
}
export function separation(cb) {
  return arguments.length ? cb : defaultSeparation;
}
export function radialCoordinate(rad, r) {
  rad -= Math.PI / 2;
  return {
    x: r * Math.cos(rad),
    y: r * Math.sin(rad)
  };
}
export function getViewRect(seriesModel, api) {
  return layout.getLayoutRect(seriesModel.getBoxLayoutParams(), {
    width: api.getWidth(),
    height: api.getHeight()
  });
}

function executeShifts(node) {
  var children = node.children;
  var n = children.length;
  var shift = 0;
  var change = 0;

  while (--n >= 0) {
    var child = children[n];
    child.hierNode.prelim += shift;
    child.hierNode.modifier += shift;
    change += child.hierNode.change;
    shift += child.hierNode.shift + change;
  }
}

function apportion(subtreeV, subtreeW, ancestor, separation) {
  if (subtreeW) {
    var nodeOutRight = subtreeV;
    var nodeInRight = subtreeV;
    var nodeOutLeft = nodeInRight.parentNode.children[0];
    var nodeInLeft = subtreeW;
    var sumOutRight = nodeOutRight.hierNode.modifier;
    var sumInRight = nodeInRight.hierNode.modifier;
    var sumOutLeft = nodeOutLeft.hierNode.modifier;
    var sumInLeft = nodeInLeft.hierNode.modifier;

    while (nodeInLeft = nextRight(nodeInLeft), nodeInRight = nextLeft(nodeInRight), nodeInLeft && nodeInRight) {
      nodeOutRight = nextRight(nodeOutRight);
      nodeOutLeft = nextLeft(nodeOutLeft);
      nodeOutRight.hierNode.ancestor = subtreeV;
      var shift = nodeInLeft.hierNode.prelim + sumInLeft - nodeInRight.hierNode.prelim - sumInRight + separation(nodeInLeft, nodeInRight);

      if (shift > 0) {
        moveSubtree(nextAncestor(nodeInLeft, subtreeV, ancestor), subtreeV, shift);
        sumInRight += shift;
        sumOutRight += shift;
      }

      sumInLeft += nodeInLeft.hierNode.modifier;
      sumInRight += nodeInRight.hierNode.modifier;
      sumOutRight += nodeOutRight.hierNode.modifier;
      sumOutLeft += nodeOutLeft.hierNode.modifier;
    }

    if (nodeInLeft && !nextRight(nodeOutRight)) {
      nodeOutRight.hierNode.thread = nodeInLeft;
      nodeOutRight.hierNode.modifier += sumInLeft - sumOutRight;
    }

    if (nodeInRight && !nextLeft(nodeOutLeft)) {
      nodeOutLeft.hierNode.thread = nodeInRight;
      nodeOutLeft.hierNode.modifier += sumInRight - sumOutLeft;
      ancestor = subtreeV;
    }
  }

  return ancestor;
}

function nextRight(node) {
  var children = node.children;
  return children.length && node.isExpand ? children[children.length - 1] : node.hierNode.thread;
}

function nextLeft(node) {
  var children = node.children;
  return children.length && node.isExpand ? children[0] : node.hierNode.thread;
}

function nextAncestor(nodeInLeft, node, ancestor) {
  return nodeInLeft.hierNode.ancestor.parentNode === node.parentNode ? nodeInLeft.hierNode.ancestor : ancestor;
}

function moveSubtree(wl, wr, shift) {
  var change = shift / (wr.hierNode.i - wl.hierNode.i);
  wr.hierNode.change -= change;
  wr.hierNode.shift += shift;
  wr.hierNode.modifier += shift;
  wr.hierNode.prelim += shift;
  wl.hierNode.change += change;
}

function defaultSeparation(node1, node2) {
  return node1.parentNode === node2.parentNode ? 1 : 2;
}