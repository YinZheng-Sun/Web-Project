
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

import Model from '../../model/Model';
import { each, curry, clone, defaults, isArray, indexOf } from 'zrender/esm/core/util';
export function collect(ecModel, api) {
  var result = {
    axesInfo: {},
    seriesInvolved: false,
    coordSysAxesInfo: {},
    coordSysMap: {}
  };
  collectAxesInfo(result, ecModel, api);
  result.seriesInvolved && collectSeriesInfo(result, ecModel);
  return result;
}

function collectAxesInfo(result, ecModel, api) {
  var globalTooltipModel = ecModel.getComponent('tooltip');
  var globalAxisPointerModel = ecModel.getComponent('axisPointer');
  var linksOption = globalAxisPointerModel.get('link', true) || [];
  var linkGroups = [];
  each(api.getCoordinateSystems(), function (coordSys) {
    if (!coordSys.axisPointerEnabled) {
      return;
    }

    var coordSysKey = makeKey(coordSys.model);
    var axesInfoInCoordSys = result.coordSysAxesInfo[coordSysKey] = {};
    result.coordSysMap[coordSysKey] = coordSys;
    var coordSysModel = coordSys.model;
    var baseTooltipModel = coordSysModel.getModel('tooltip', globalTooltipModel);
    each(coordSys.getAxes(), curry(saveTooltipAxisInfo, false, null));

    if (coordSys.getTooltipAxes && globalTooltipModel && baseTooltipModel.get('show')) {
      var triggerAxis = baseTooltipModel.get('trigger') === 'axis';
      var cross = baseTooltipModel.get(['axisPointer', 'type']) === 'cross';
      var tooltipAxes = coordSys.getTooltipAxes(baseTooltipModel.get(['axisPointer', 'axis']));

      if (triggerAxis || cross) {
        each(tooltipAxes.baseAxes, curry(saveTooltipAxisInfo, cross ? 'cross' : true, triggerAxis));
      }

      if (cross) {
        each(tooltipAxes.otherAxes, curry(saveTooltipAxisInfo, 'cross', false));
      }
    }

    function saveTooltipAxisInfo(fromTooltip, triggerTooltip, axis) {
      var axisPointerModel = axis.model.getModel('axisPointer', globalAxisPointerModel);
      var axisPointerShow = axisPointerModel.get('show');

      if (!axisPointerShow || axisPointerShow === 'auto' && !fromTooltip && !isHandleTrigger(axisPointerModel)) {
        return;
      }

      if (triggerTooltip == null) {
        triggerTooltip = axisPointerModel.get('triggerTooltip');
      }

      axisPointerModel = fromTooltip ? makeAxisPointerModel(axis, baseTooltipModel, globalAxisPointerModel, ecModel, fromTooltip, triggerTooltip) : axisPointerModel;
      var snap = axisPointerModel.get('snap');
      var axisKey = makeKey(axis.model);
      var involveSeries = triggerTooltip || snap || axis.type === 'category';
      var axisInfo = result.axesInfo[axisKey] = {
        key: axisKey,
        axis: axis,
        coordSys: coordSys,
        axisPointerModel: axisPointerModel,
        triggerTooltip: triggerTooltip,
        involveSeries: involveSeries,
        snap: snap,
        useHandle: isHandleTrigger(axisPointerModel),
        seriesModels: [],
        linkGroup: null
      };
      axesInfoInCoordSys[axisKey] = axisInfo;
      result.seriesInvolved = result.seriesInvolved || involveSeries;
      var groupIndex = getLinkGroupIndex(linksOption, axis);

      if (groupIndex != null) {
        var linkGroup = linkGroups[groupIndex] || (linkGroups[groupIndex] = {
          axesInfo: {}
        });
        linkGroup.axesInfo[axisKey] = axisInfo;
        linkGroup.mapper = linksOption[groupIndex].mapper;
        axisInfo.linkGroup = linkGroup;
      }
    }
  });
}

function makeAxisPointerModel(axis, baseTooltipModel, globalAxisPointerModel, ecModel, fromTooltip, triggerTooltip) {
  var tooltipAxisPointerModel = baseTooltipModel.getModel('axisPointer');
  var fields = ['type', 'snap', 'lineStyle', 'shadowStyle', 'label', 'animation', 'animationDurationUpdate', 'animationEasingUpdate', 'z'];
  var volatileOption = {};
  each(fields, function (field) {
    volatileOption[field] = clone(tooltipAxisPointerModel.get(field));
  });
  volatileOption.snap = axis.type !== 'category' && !!triggerTooltip;

  if (tooltipAxisPointerModel.get('type') === 'cross') {
    volatileOption.type = 'line';
  }

  var labelOption = volatileOption.label || (volatileOption.label = {});
  labelOption.show == null && (labelOption.show = false);

  if (fromTooltip === 'cross') {
    var tooltipAxisPointerLabelShow = tooltipAxisPointerModel.get(['label', 'show']);
    labelOption.show = tooltipAxisPointerLabelShow != null ? tooltipAxisPointerLabelShow : true;

    if (!triggerTooltip) {
      var crossStyle = volatileOption.lineStyle = tooltipAxisPointerModel.get('crossStyle');
      crossStyle && defaults(labelOption, crossStyle.textStyle);
    }
  }

  return axis.model.getModel('axisPointer', new Model(volatileOption, globalAxisPointerModel, ecModel));
}

function collectSeriesInfo(result, ecModel) {
  ecModel.eachSeries(function (seriesModel) {
    var coordSys = seriesModel.coordinateSystem;
    var seriesTooltipTrigger = seriesModel.get(['tooltip', 'trigger'], true);
    var seriesTooltipShow = seriesModel.get(['tooltip', 'show'], true);

    if (!coordSys || seriesTooltipTrigger === 'none' || seriesTooltipTrigger === false || seriesTooltipTrigger === 'item' || seriesTooltipShow === false || seriesModel.get(['axisPointer', 'show'], true) === false) {
      return;
    }

    each(result.coordSysAxesInfo[makeKey(coordSys.model)], function (axisInfo) {
      var axis = axisInfo.axis;

      if (coordSys.getAxis(axis.dim) === axis) {
        axisInfo.seriesModels.push(seriesModel);
        axisInfo.seriesDataCount == null && (axisInfo.seriesDataCount = 0);
        axisInfo.seriesDataCount += seriesModel.getData().count();
      }
    });
  });
}

function getLinkGroupIndex(linksOption, axis) {
  var axisModel = axis.model;
  var dim = axis.dim;

  for (var i = 0; i < linksOption.length; i++) {
    var linkOption = linksOption[i] || {};

    if (checkPropInLink(linkOption[dim + 'AxisId'], axisModel.id) || checkPropInLink(linkOption[dim + 'AxisIndex'], axisModel.componentIndex) || checkPropInLink(linkOption[dim + 'AxisName'], axisModel.name)) {
      return i;
    }
  }
}

function checkPropInLink(linkPropValue, axisPropValue) {
  return linkPropValue === 'all' || isArray(linkPropValue) && indexOf(linkPropValue, axisPropValue) >= 0 || linkPropValue === axisPropValue;
}

export function fixValue(axisModel) {
  var axisInfo = getAxisInfo(axisModel);

  if (!axisInfo) {
    return;
  }

  var axisPointerModel = axisInfo.axisPointerModel;
  var scale = axisInfo.axis.scale;
  var option = axisPointerModel.option;
  var status = axisPointerModel.get('status');
  var value = axisPointerModel.get('value');

  if (value != null) {
    value = scale.parse(value);
  }

  var useHandle = isHandleTrigger(axisPointerModel);

  if (status == null) {
    option.status = useHandle ? 'show' : 'hide';
  }

  var extent = scale.getExtent().slice();
  extent[0] > extent[1] && extent.reverse();

  if (value == null || value > extent[1]) {
    value = extent[1];
  }

  if (value < extent[0]) {
    value = extent[0];
  }

  option.value = value;

  if (useHandle) {
    option.status = axisInfo.axis.scale.isBlank() ? 'hide' : 'show';
  }
}
export function getAxisInfo(axisModel) {
  var coordSysAxesInfo = (axisModel.ecModel.getComponent('axisPointer') || {}).coordSysAxesInfo;
  return coordSysAxesInfo && coordSysAxesInfo.axesInfo[makeKey(axisModel)];
}
export function getAxisPointerModel(axisModel) {
  var axisInfo = getAxisInfo(axisModel);
  return axisInfo && axisInfo.axisPointerModel;
}

function isHandleTrigger(axisPointerModel) {
  return !!axisPointerModel.get(['handle', 'show']);
}

export function makeKey(model) {
  return model.type + '||' + model.id;
}