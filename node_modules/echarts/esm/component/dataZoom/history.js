
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
import { makeInner } from '../../util/model';
var each = zrUtil.each;
var inner = makeInner();
export function push(ecModel, newSnapshot) {
  var storedSnapshots = getStoreSnapshots(ecModel);
  each(newSnapshot, function (batchItem, dataZoomId) {
    var i = storedSnapshots.length - 1;

    for (; i >= 0; i--) {
      var snapshot = storedSnapshots[i];

      if (snapshot[dataZoomId]) {
        break;
      }
    }

    if (i < 0) {
      var dataZoomModel = ecModel.queryComponents({
        mainType: 'dataZoom',
        subType: 'select',
        id: dataZoomId
      })[0];

      if (dataZoomModel) {
        var percentRange = dataZoomModel.getPercentRange();
        storedSnapshots[0][dataZoomId] = {
          dataZoomId: dataZoomId,
          start: percentRange[0],
          end: percentRange[1]
        };
      }
    }
  });
  storedSnapshots.push(newSnapshot);
}
export function pop(ecModel) {
  var storedSnapshots = getStoreSnapshots(ecModel);
  var head = storedSnapshots[storedSnapshots.length - 1];
  storedSnapshots.length > 1 && storedSnapshots.pop();
  var snapshot = {};
  each(head, function (batchItem, dataZoomId) {
    for (var i = storedSnapshots.length - 1; i >= 0; i--) {
      batchItem = storedSnapshots[i][dataZoomId];

      if (batchItem) {
        snapshot[dataZoomId] = batchItem;
        break;
      }
    }
  });
  return snapshot;
}
export function clear(ecModel) {
  inner(ecModel).snapshots = null;
}
export function count(ecModel) {
  return getStoreSnapshots(ecModel).length;
}

function getStoreSnapshots(ecModel) {
  var store = inner(ecModel);

  if (!store.snapshots) {
    store.snapshots = [{}];
  }

  return store.snapshots;
}