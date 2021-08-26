
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

import * as echarts from '../echarts';
import * as zrUtil from 'zrender/esm/core/util';
import { updateCenterAndZoom } from './roamHelper';
echarts.registerAction({
  type: 'geoRoam',
  event: 'geoRoam',
  update: 'updateTransform'
}, function (payload, ecModel) {
  var componentType = payload.componentType || 'series';
  ecModel.eachComponent({
    mainType: componentType,
    query: payload
  }, function (componentModel) {
    var geo = componentModel.coordinateSystem;

    if (geo.type !== 'geo') {
      return;
    }

    var res = updateCenterAndZoom(geo, payload, componentModel.get('scaleLimit'));
    componentModel.setCenter && componentModel.setCenter(res.center);
    componentModel.setZoom && componentModel.setZoom(res.zoom);

    if (componentType === 'series') {
      zrUtil.each(componentModel.seriesGroup, function (seriesModel) {
        seriesModel.setCenter(res.center);
        seriesModel.setZoom(res.zoom);
      });
    }
  });
});