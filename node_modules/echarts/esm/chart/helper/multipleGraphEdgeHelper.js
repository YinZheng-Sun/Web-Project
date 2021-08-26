
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

import * as zrUtil from 'zrender/esm/core/util';
var KEY_DELIMITER = '-->';

var getAutoCurvenessParams = function (seriesModel) {
  return seriesModel.get('autoCurveness') || null;
};

var createCurveness = function (seriesModel, appendLength) {
  var autoCurvenessParmas = getAutoCurvenessParams(seriesModel);
  var length = 20;
  var curvenessList = [];

  if (typeof autoCurvenessParmas === 'number') {
    length = autoCurvenessParmas;
  } else if (zrUtil.isArray(autoCurvenessParmas)) {
    seriesModel.__curvenessList = autoCurvenessParmas;
    return;
  }

  if (appendLength > length) {
    length = appendLength;
  }

  var len = length % 2 ? length + 2 : length + 3;
  curvenessList = [];

  for (var i = 0; i < len; i++) {
    curvenessList.push((i % 2 ? i + 1 : i) / 10 * (i % 2 ? -1 : 1));
  }

  seriesModel.__curvenessList = curvenessList;
};

var getKeyOfEdges = function (n1, n2, seriesModel) {
  var source = [n1.id, n1.dataIndex].join('.');
  var target = [n2.id, n2.dataIndex].join('.');
  return [seriesModel.uid, source, target].join(KEY_DELIMITER);
};

var getOppositeKey = function (key) {
  var keys = key.split(KEY_DELIMITER);
  return [keys[0], keys[2], keys[1]].join(KEY_DELIMITER);
};

var getEdgeFromMap = function (edge, seriesModel) {
  var key = getKeyOfEdges(edge.node1, edge.node2, seriesModel);
  return seriesModel.__edgeMap[key];
};

var getTotalLengthBetweenNodes = function (edge, seriesModel) {
  var len = getEdgeMapLengthWithKey(getKeyOfEdges(edge.node1, edge.node2, seriesModel), seriesModel);
  var lenV = getEdgeMapLengthWithKey(getKeyOfEdges(edge.node2, edge.node1, seriesModel), seriesModel);
  return len + lenV;
};

var getEdgeMapLengthWithKey = function (key, seriesModel) {
  var edgeMap = seriesModel.__edgeMap;
  return edgeMap[key] ? edgeMap[key].length : 0;
};

export function initCurvenessList(seriesModel) {
  if (!getAutoCurvenessParams(seriesModel)) {
    return;
  }

  seriesModel.__curvenessList = [];
  seriesModel.__edgeMap = {};
  createCurveness(seriesModel);
}
export function createEdgeMapForCurveness(n1, n2, seriesModel, index) {
  if (!getAutoCurvenessParams(seriesModel)) {
    return;
  }

  var key = getKeyOfEdges(n1, n2, seriesModel);
  var edgeMap = seriesModel.__edgeMap;
  var oppositeEdges = edgeMap[getOppositeKey(key)];

  if (edgeMap[key] && !oppositeEdges) {
    edgeMap[key].isForward = true;
  } else if (oppositeEdges && edgeMap[key]) {
    oppositeEdges.isForward = true;
    edgeMap[key].isForward = false;
  }

  edgeMap[key] = edgeMap[key] || [];
  edgeMap[key].push(index);
}
export function getCurvenessForEdge(edge, seriesModel, index, needReverse) {
  var autoCurvenessParams = getAutoCurvenessParams(seriesModel);
  var isArrayParam = zrUtil.isArray(autoCurvenessParams);

  if (!autoCurvenessParams) {
    return null;
  }

  var edgeArray = getEdgeFromMap(edge, seriesModel);

  if (!edgeArray) {
    return null;
  }

  var edgeIndex = -1;

  for (var i = 0; i < edgeArray.length; i++) {
    if (edgeArray[i] === index) {
      edgeIndex = i;
      break;
    }
  }

  var totalLen = getTotalLengthBetweenNodes(edge, seriesModel);
  createCurveness(seriesModel, totalLen);
  edge.lineStyle = edge.lineStyle || {};
  var curKey = getKeyOfEdges(edge.node1, edge.node2, seriesModel);
  var curvenessList = seriesModel.__curvenessList;
  var parityCorrection = isArrayParam ? 0 : totalLen % 2 ? 0 : 1;

  if (!edgeArray.isForward) {
    var oppositeKey = getOppositeKey(curKey);
    var len = getEdgeMapLengthWithKey(oppositeKey, seriesModel);
    var resValue = curvenessList[edgeIndex + len + parityCorrection];

    if (needReverse) {
      if (isArrayParam) {
        if (autoCurvenessParams && autoCurvenessParams[0] === 0) {
          return (len + parityCorrection) % 2 ? resValue : -resValue;
        } else {
          return ((len % 2 ? 0 : 1) + parityCorrection) % 2 ? resValue : -resValue;
        }
      } else {
        return (len + parityCorrection) % 2 ? resValue : -resValue;
      }
    } else {
      return curvenessList[edgeIndex + len + parityCorrection];
    }
  } else {
    return curvenessList[parityCorrection + edgeIndex];
  }
}