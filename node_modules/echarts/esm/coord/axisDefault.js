
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
var defaultOption = {
  show: true,
  zlevel: 0,
  z: 0,
  inverse: false,
  name: '',
  nameLocation: 'end',
  nameRotate: null,
  nameTruncate: {
    maxWidth: null,
    ellipsis: '...',
    placeholder: '.'
  },
  nameTextStyle: {},
  nameGap: 15,
  silent: false,
  triggerEvent: false,
  tooltip: {
    show: false
  },
  axisPointer: {},
  axisLine: {
    show: true,
    onZero: true,
    onZeroAxisIndex: null,
    lineStyle: {
      color: '#6E7079',
      width: 1,
      type: 'solid'
    },
    symbol: ['none', 'none'],
    symbolSize: [10, 15]
  },
  axisTick: {
    show: true,
    inside: false,
    length: 5,
    lineStyle: {
      width: 1
    }
  },
  axisLabel: {
    show: true,
    inside: false,
    rotate: 0,
    showMinLabel: null,
    showMaxLabel: null,
    margin: 8,
    fontSize: 12
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: ['#E0E6F1'],
      width: 1,
      type: 'solid'
    }
  },
  splitArea: {
    show: false,
    areaStyle: {
      color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
    }
  }
};
var categoryAxis = zrUtil.merge({
  boundaryGap: true,
  deduplication: null,
  splitLine: {
    show: false
  },
  axisTick: {
    alignWithLabel: false,
    interval: 'auto'
  },
  axisLabel: {
    interval: 'auto'
  }
}, defaultOption);
var valueAxis = zrUtil.merge({
  boundaryGap: [0, 0],
  axisLine: {
    show: 'auto'
  },
  axisTick: {
    show: 'auto'
  },
  splitNumber: 5,
  minorTick: {
    show: false,
    splitNumber: 5,
    length: 3,
    lineStyle: {}
  },
  minorSplitLine: {
    show: false,
    lineStyle: {
      color: '#F4F7FD',
      width: 1
    }
  }
}, defaultOption);
var timeAxis = zrUtil.merge({
  scale: true,
  splitNumber: 6,
  axisLabel: {
    showMinLabel: false,
    showMaxLabel: false,
    rich: {
      primary: {
        fontWeight: 'bold'
      }
    }
  },
  splitLine: {
    show: false
  }
}, valueAxis);
var logAxis = zrUtil.defaults({
  scale: true,
  logBase: 10
}, valueAxis);
export default {
  category: categoryAxis,
  value: valueAxis,
  time: timeAxis,
  log: logAxis
};