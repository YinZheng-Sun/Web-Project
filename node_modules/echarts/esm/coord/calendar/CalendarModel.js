
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
import * as zrUtil from 'zrender/esm/core/util';
import ComponentModel from '../../model/Component';
import { getLayoutParams, sizeCalculable, mergeLayoutParam } from '../../util/layout';

var CalendarModel = function (_super) {
  __extends(CalendarModel, _super);

  function CalendarModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = CalendarModel.type;
    return _this;
  }

  CalendarModel.prototype.init = function (option, parentModel, ecModel) {
    var inputPositionParams = getLayoutParams(option);

    _super.prototype.init.apply(this, arguments);

    mergeAndNormalizeLayoutParams(option, inputPositionParams);
  };

  CalendarModel.prototype.mergeOption = function (option) {
    _super.prototype.mergeOption.apply(this, arguments);

    mergeAndNormalizeLayoutParams(this.option, option);
  };

  CalendarModel.prototype.getCellSize = function () {
    return this.option.cellSize;
  };

  CalendarModel.type = 'calendar';
  CalendarModel.defaultOption = {
    zlevel: 0,
    z: 2,
    left: 80,
    top: 60,
    cellSize: 20,
    orient: 'horizontal',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#000',
        width: 1,
        type: 'solid'
      }
    },
    itemStyle: {
      color: '#fff',
      borderWidth: 1,
      borderColor: '#ccc'
    },
    dayLabel: {
      show: true,
      firstDay: 0,
      position: 'start',
      margin: '50%',
      nameMap: 'en',
      color: '#000'
    },
    monthLabel: {
      show: true,
      position: 'start',
      margin: 5,
      align: 'center',
      nameMap: 'en',
      formatter: null,
      color: '#000'
    },
    yearLabel: {
      show: true,
      position: null,
      margin: 30,
      formatter: null,
      color: '#ccc',
      fontFamily: 'sans-serif',
      fontWeight: 'bolder',
      fontSize: 20
    }
  };
  return CalendarModel;
}(ComponentModel);

function mergeAndNormalizeLayoutParams(target, raw) {
  var cellSize = target.cellSize;
  var cellSizeArr;

  if (!zrUtil.isArray(cellSize)) {
    cellSizeArr = target.cellSize = [cellSize, cellSize];
  } else {
    cellSizeArr = cellSize;
  }

  if (cellSizeArr.length === 1) {
    cellSizeArr[1] = cellSizeArr[0];
  }

  var ignoreSize = zrUtil.map([0, 1], function (hvIdx) {
    if (sizeCalculable(raw, hvIdx)) {
      cellSizeArr[hvIdx] = 'auto';
    }

    return cellSizeArr[hvIdx] != null && cellSizeArr[hvIdx] !== 'auto';
  });
  mergeLayoutParam(target, raw, {
    type: 'box',
    ignoreSize: ignoreSize
  });
}

ComponentModel.registerClass(CalendarModel);
export default CalendarModel;