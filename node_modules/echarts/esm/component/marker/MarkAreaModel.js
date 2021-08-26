
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
import MarkerModel from './MarkerModel';
import ComponentModel from '../../model/Component';

var MarkAreaModel = function (_super) {
  __extends(MarkAreaModel, _super);

  function MarkAreaModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = MarkAreaModel.type;
    return _this;
  }

  MarkAreaModel.prototype.createMarkerModelFromSeries = function (markerOpt, masterMarkerModel, ecModel) {
    return new MarkAreaModel(markerOpt, masterMarkerModel, ecModel);
  };

  MarkAreaModel.type = 'markArea';
  MarkAreaModel.defaultOption = {
    zlevel: 0,
    z: 1,
    tooltip: {
      trigger: 'item'
    },
    animation: false,
    label: {
      show: true,
      position: 'top'
    },
    itemStyle: {
      borderWidth: 0
    },
    emphasis: {
      label: {
        show: true,
        position: 'top'
      }
    }
  };
  return MarkAreaModel;
}(MarkerModel);

ComponentModel.registerClass(MarkAreaModel);
export default MarkAreaModel;