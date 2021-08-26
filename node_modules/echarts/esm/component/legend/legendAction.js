
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
import * as zrUtil from 'zrender/esm/core/util';

function legendSelectActionHandler(methodName, payload, ecModel) {
  var selectedMap = {};
  var isToggleSelect = methodName === 'toggleSelected';
  var isSelected;
  ecModel.eachComponent('legend', function (legendModel) {
    if (isToggleSelect && isSelected != null) {
      legendModel[isSelected ? 'select' : 'unSelect'](payload.name);
    } else if (methodName === 'allSelect' || methodName === 'inverseSelect') {
      legendModel[methodName]();
    } else {
      legendModel[methodName](payload.name);
      isSelected = legendModel.isSelected(payload.name);
    }

    var legendData = legendModel.getData();
    zrUtil.each(legendData, function (model) {
      var name = model.get('name');

      if (name === '\n' || name === '') {
        return;
      }

      var isItemSelected = legendModel.isSelected(name);

      if (selectedMap.hasOwnProperty(name)) {
        selectedMap[name] = selectedMap[name] && isItemSelected;
      } else {
        selectedMap[name] = isItemSelected;
      }
    });
  });
  return methodName === 'allSelect' || methodName === 'inverseSelect' ? {
    selected: selectedMap
  } : {
    name: payload.name,
    selected: selectedMap
  };
}

echarts.registerAction('legendToggleSelect', 'legendselectchanged', zrUtil.curry(legendSelectActionHandler, 'toggleSelected'));
echarts.registerAction('legendAllSelect', 'legendselectall', zrUtil.curry(legendSelectActionHandler, 'allSelect'));
echarts.registerAction('legendInverseSelect', 'legendinverseselect', zrUtil.curry(legendSelectActionHandler, 'inverseSelect'));
echarts.registerAction('legendSelect', 'legendselected', zrUtil.curry(legendSelectActionHandler, 'select'));
echarts.registerAction('legendUnSelect', 'legendunselected', zrUtil.curry(legendSelectActionHandler, 'unSelect'));