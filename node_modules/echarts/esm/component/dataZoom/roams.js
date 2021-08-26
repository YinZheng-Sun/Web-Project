
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

import * as echarts from '../../echarts';
import RoamController from '../../component/helper/RoamController';
import * as throttleUtil from '../../util/throttle';
import { makeInner } from '../../util/model';
import { each, curry, createHashMap } from 'zrender/esm/core/util';
import { collectReferCoordSysModelInfo } from './helper';
var inner = makeInner();
echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.FILTER, function (ecModel, api) {
  var apiInner = inner(api);
  var coordSysRecordMap = apiInner.coordSysRecordMap || (apiInner.coordSysRecordMap = createHashMap());
  coordSysRecordMap.each(function (coordSysRecord) {
    coordSysRecord.dataZoomInfoMap = null;
  });
  ecModel.eachComponent({
    mainType: 'dataZoom',
    subType: 'inside'
  }, function (dataZoomModel) {
    var dzReferCoordSysWrap = collectReferCoordSysModelInfo(dataZoomModel);
    each(dzReferCoordSysWrap.infoList, function (dzCoordSysInfo) {
      var coordSysUid = dzCoordSysInfo.model.uid;
      var coordSysRecord = coordSysRecordMap.get(coordSysUid) || coordSysRecordMap.set(coordSysUid, createCoordSysRecord(api, dzCoordSysInfo.model));
      var dataZoomInfoMap = coordSysRecord.dataZoomInfoMap || (coordSysRecord.dataZoomInfoMap = createHashMap());
      dataZoomInfoMap.set(dataZoomModel.uid, {
        dzReferCoordSysInfo: dzCoordSysInfo,
        model: dataZoomModel,
        getRange: null
      });
    });
  });
  coordSysRecordMap.each(function (coordSysRecord) {
    var controller = coordSysRecord.controller;
    var firstDzInfo;
    var dataZoomInfoMap = coordSysRecord.dataZoomInfoMap;

    if (dataZoomInfoMap) {
      var firstDzKey = dataZoomInfoMap.keys()[0];

      if (firstDzKey != null) {
        firstDzInfo = dataZoomInfoMap.get(firstDzKey);
      }
    }

    if (!firstDzInfo) {
      disposeCoordSysRecord(coordSysRecordMap, coordSysRecord);
      return;
    }

    var controllerParams = mergeControllerParams(dataZoomInfoMap);
    controller.enable(controllerParams.controlType, controllerParams.opt);
    controller.setPointerChecker(coordSysRecord.containsPoint);
    throttleUtil.createOrUpdate(coordSysRecord, 'dispatchAction', firstDzInfo.model.get('throttle', true), 'fixRate');
  });
});
export function setViewInfoToCoordSysRecord(api, dataZoomModel, getRange) {
  inner(api).coordSysRecordMap.each(function (coordSysRecord) {
    var dzInfo = coordSysRecord.dataZoomInfoMap.get(dataZoomModel.uid);

    if (dzInfo) {
      dzInfo.getRange = getRange;
    }
  });
}
export function disposeCoordSysRecordIfNeeded(api, dataZoomModel) {
  var coordSysRecordMap = inner(api).coordSysRecordMap;
  var coordSysKeyArr = coordSysRecordMap.keys();

  for (var i = 0; i < coordSysKeyArr.length; i++) {
    var coordSysKey = coordSysKeyArr[i];
    var coordSysRecord = coordSysRecordMap.get(coordSysKey);
    var dataZoomInfoMap = coordSysRecord.dataZoomInfoMap;

    if (dataZoomInfoMap) {
      var dzUid = dataZoomModel.uid;
      var dzInfo = dataZoomInfoMap.get(dzUid);

      if (dzInfo) {
        dataZoomInfoMap.removeKey(dzUid);

        if (!dataZoomInfoMap.keys().length) {
          disposeCoordSysRecord(coordSysRecordMap, coordSysRecord);
        }
      }
    }
  }
}

function disposeCoordSysRecord(coordSysRecordMap, coordSysRecord) {
  if (coordSysRecord) {
    coordSysRecordMap.removeKey(coordSysRecord.model.uid);
    var controller = coordSysRecord.controller;
    controller && controller.dispose();
  }
}

function createCoordSysRecord(api, coordSysModel) {
  var coordSysRecord = {
    model: coordSysModel,
    containsPoint: curry(containsPoint, coordSysModel),
    dispatchAction: curry(dispatchAction, api),
    dataZoomInfoMap: null,
    controller: null
  };
  var controller = coordSysRecord.controller = new RoamController(api.getZr());
  each(['pan', 'zoom', 'scrollMove'], function (eventName) {
    controller.on(eventName, function (event) {
      var batch = [];
      coordSysRecord.dataZoomInfoMap.each(function (dzInfo) {
        if (!event.isAvailableBehavior(dzInfo.model.option)) {
          return;
        }

        var method = (dzInfo.getRange || {})[eventName];
        var range = method && method(dzInfo.dzReferCoordSysInfo, coordSysRecord.model.mainType, coordSysRecord.controller, event);
        !dzInfo.model.get('disabled', true) && range && batch.push({
          dataZoomId: dzInfo.model.id,
          start: range[0],
          end: range[1]
        });
      });
      batch.length && coordSysRecord.dispatchAction(batch);
    });
  });
  return coordSysRecord;
}

function dispatchAction(api, batch) {
  api.dispatchAction({
    type: 'dataZoom',
    animation: {
      easing: 'cubicOut',
      duration: 100
    },
    batch: batch
  });
}

function containsPoint(coordSysModel, e, x, y) {
  return coordSysModel.coordinateSystem.containPoint([x, y]);
}

function mergeControllerParams(dataZoomInfoMap) {
  var controlType;
  var prefix = 'type_';
  var typePriority = {
    'type_true': 2,
    'type_move': 1,
    'type_false': 0,
    'type_undefined': -1
  };
  var preventDefaultMouseMove = true;
  dataZoomInfoMap.each(function (dataZoomInfo) {
    var dataZoomModel = dataZoomInfo.model;
    var oneType = dataZoomModel.get('disabled', true) ? false : dataZoomModel.get('zoomLock', true) ? 'move' : true;

    if (typePriority[prefix + oneType] > typePriority[prefix + controlType]) {
      controlType = oneType;
    }

    preventDefaultMouseMove = preventDefaultMouseMove && dataZoomModel.get('preventDefaultMouseMove', true);
  });
  return {
    controlType: controlType,
    opt: {
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
      moveOnMouseWheel: true,
      preventDefaultMouseMove: !!preventDefaultMouseMove
    }
  };
}