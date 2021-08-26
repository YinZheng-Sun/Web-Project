
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

import { indexOf, createHashMap, assert } from 'zrender/esm/core/util';
export var DATA_ZOOM_AXIS_DIMENSIONS = ['x', 'y', 'radius', 'angle', 'single'];
var SERIES_COORDS = ['cartesian2d', 'polar', 'singleAxis'];
export function isCoordSupported(seriesModel) {
  var coordType = seriesModel.get('coordinateSystem');
  return indexOf(SERIES_COORDS, coordType) >= 0;
}
export function getAxisMainType(axisDim) {
  if (process.env.NODE_ENV !== 'production') {
    assert(axisDim);
  }

  return axisDim + 'Axis';
}
export function getAxisIndexPropName(axisDim) {
  if (process.env.NODE_ENV !== 'production') {
    assert(axisDim);
  }

  return axisDim + 'AxisIndex';
}
export function getAxisIdPropName(axisDim) {
  if (process.env.NODE_ENV !== 'production') {
    assert(axisDim);
  }

  return axisDim + 'AxisId';
}
export function findEffectedDataZooms(ecModel, payload) {
  var axisRecords = createHashMap();
  var effectedModels = [];
  var effectedModelMap = createHashMap();
  ecModel.eachComponent({
    mainType: 'dataZoom',
    query: payload
  }, function (dataZoomModel) {
    if (!effectedModelMap.get(dataZoomModel.uid)) {
      addToEffected(dataZoomModel);
    }
  });
  var foundNewLink;

  do {
    foundNewLink = false;
    ecModel.eachComponent('dataZoom', processSingle);
  } while (foundNewLink);

  function processSingle(dataZoomModel) {
    if (!effectedModelMap.get(dataZoomModel.uid) && isLinked(dataZoomModel)) {
      addToEffected(dataZoomModel);
      foundNewLink = true;
    }
  }

  function addToEffected(dataZoom) {
    effectedModelMap.set(dataZoom.uid, true);
    effectedModels.push(dataZoom);
    markAxisControlled(dataZoom);
  }

  function isLinked(dataZoomModel) {
    var isLink = false;
    dataZoomModel.eachTargetAxis(function (axisDim, axisIndex) {
      var axisIdxArr = axisRecords.get(axisDim);

      if (axisIdxArr && axisIdxArr[axisIndex]) {
        isLink = true;
      }
    });
    return isLink;
  }

  function markAxisControlled(dataZoomModel) {
    dataZoomModel.eachTargetAxis(function (axisDim, axisIndex) {
      (axisRecords.get(axisDim) || axisRecords.set(axisDim, []))[axisIndex] = true;
    });
  }

  return effectedModels;
}
export function collectReferCoordSysModelInfo(dataZoomModel) {
  var ecModel = dataZoomModel.ecModel;
  var coordSysInfoWrap = {
    infoList: [],
    infoMap: createHashMap()
  };
  dataZoomModel.eachTargetAxis(function (axisDim, axisIndex) {
    var axisModel = ecModel.getComponent(getAxisMainType(axisDim), axisIndex);

    if (!axisModel) {
      return;
    }

    var coordSysModel = axisModel.getCoordSysModel();

    if (!coordSysModel) {
      return;
    }

    var coordSysUid = coordSysModel.uid;
    var coordSysInfo = coordSysInfoWrap.infoMap.get(coordSysUid);

    if (!coordSysInfo) {
      coordSysInfo = {
        model: coordSysModel,
        axisModels: []
      };
      coordSysInfoWrap.infoList.push(coordSysInfo);
      coordSysInfoWrap.infoMap.set(coordSysUid, coordSysInfo);
    }

    coordSysInfo.axisModels.push(axisModel);
  });
  return coordSysInfoWrap;
}