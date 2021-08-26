
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

import { __extends, __spreadArrays } from "tslib";
import * as zrUtil from 'zrender/esm/core/util';
import env from 'zrender/esm/core/env';
import * as modelUtil from '../util/model';
import ComponentModel from './Component';
import { PaletteMixin } from './mixin/palette';
import { DataFormatMixin } from '../model/mixin/dataFormat';
import { getLayoutParams, mergeLayoutParam, fetchLayoutMode } from '../util/layout';
import { createTask } from '../stream/task';
import { mountExtend } from '../util/clazz';
import { SourceManager } from '../data/helper/sourceManager';
import { defaultSeriesFormatTooltip } from '../component/tooltip/seriesFormatTooltip';
var inner = modelUtil.makeInner();

function getSelectionKey(data, dataIndex) {
  return data.getName(dataIndex) || data.getId(dataIndex);
}

var SeriesModel = function (_super) {
  __extends(SeriesModel, _super);

  function SeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._selectedDataIndicesMap = {};
    return _this;
  }

  SeriesModel.prototype.init = function (option, parentModel, ecModel) {
    this.seriesIndex = this.componentIndex;
    this.dataTask = createTask({
      count: dataTaskCount,
      reset: dataTaskReset
    });
    this.dataTask.context = {
      model: this
    };
    this.mergeDefaultAndTheme(option, ecModel);
    var sourceManager = inner(this).sourceManager = new SourceManager(this);
    sourceManager.prepareSource();
    var data = this.getInitialData(option, ecModel);
    wrapData(data, this);
    this.dataTask.context.data = data;

    if (process.env.NODE_ENV !== 'production') {
      zrUtil.assert(data, 'getInitialData returned invalid data.');
    }

    inner(this).dataBeforeProcessed = data;
    autoSeriesName(this);

    this._initSelectedMapFromData(data);
  };

  SeriesModel.prototype.mergeDefaultAndTheme = function (option, ecModel) {
    var layoutMode = fetchLayoutMode(this);
    var inputPositionParams = layoutMode ? getLayoutParams(option) : {};
    var themeSubType = this.subType;

    if (ComponentModel.hasClass(themeSubType)) {
      themeSubType += 'Series';
    }

    zrUtil.merge(option, ecModel.getTheme().get(this.subType));
    zrUtil.merge(option, this.getDefaultOption());
    modelUtil.defaultEmphasis(option, 'label', ['show']);
    this.fillDataTextStyle(option.data);

    if (layoutMode) {
      mergeLayoutParam(option, inputPositionParams, layoutMode);
    }
  };

  SeriesModel.prototype.mergeOption = function (newSeriesOption, ecModel) {
    newSeriesOption = zrUtil.merge(this.option, newSeriesOption, true);
    this.fillDataTextStyle(newSeriesOption.data);
    var layoutMode = fetchLayoutMode(this);

    if (layoutMode) {
      mergeLayoutParam(this.option, newSeriesOption, layoutMode);
    }

    var sourceManager = inner(this).sourceManager;
    sourceManager.dirty();
    sourceManager.prepareSource();
    var data = this.getInitialData(newSeriesOption, ecModel);
    wrapData(data, this);
    this.dataTask.dirty();
    this.dataTask.context.data = data;
    inner(this).dataBeforeProcessed = data;
    autoSeriesName(this);

    this._initSelectedMapFromData(data);
  };

  SeriesModel.prototype.fillDataTextStyle = function (data) {
    if (data && !zrUtil.isTypedArray(data)) {
      var props = ['show'];

      for (var i = 0; i < data.length; i++) {
        if (data[i] && data[i].label) {
          modelUtil.defaultEmphasis(data[i], 'label', props);
        }
      }
    }
  };

  SeriesModel.prototype.getInitialData = function (option, ecModel) {
    return;
  };

  SeriesModel.prototype.appendData = function (params) {
    var data = this.getRawData();
    data.appendData(params.data);
  };

  SeriesModel.prototype.getData = function (dataType) {
    var task = getCurrentTask(this);

    if (task) {
      var data = task.context.data;
      return dataType == null ? data : data.getLinkedData(dataType);
    } else {
      return inner(this).data;
    }
  };

  SeriesModel.prototype.getAllData = function () {
    var mainData = this.getData();
    return mainData && mainData.getLinkedDataAll ? mainData.getLinkedDataAll() : [{
      data: mainData
    }];
  };

  SeriesModel.prototype.setData = function (data) {
    var task = getCurrentTask(this);

    if (task) {
      var context = task.context;
      context.outputData = data;

      if (task !== this.dataTask) {
        context.data = data;
      }
    }

    inner(this).data = data;
  };

  SeriesModel.prototype.getSource = function () {
    return inner(this).sourceManager.getSource();
  };

  SeriesModel.prototype.getRawData = function () {
    return inner(this).dataBeforeProcessed;
  };

  SeriesModel.prototype.getBaseAxis = function () {
    var coordSys = this.coordinateSystem;
    return coordSys && coordSys.getBaseAxis && coordSys.getBaseAxis();
  };

  SeriesModel.prototype.formatTooltip = function (dataIndex, multipleSeries, dataType) {
    return defaultSeriesFormatTooltip({
      series: this,
      dataIndex: dataIndex,
      multipleSeries: multipleSeries
    });
  };

  SeriesModel.prototype.isAnimationEnabled = function () {
    if (env.node) {
      return false;
    }

    var animationEnabled = this.getShallow('animation');

    if (animationEnabled) {
      if (this.getData().count() > this.getShallow('animationThreshold')) {
        animationEnabled = false;
      }
    }

    return !!animationEnabled;
  };

  SeriesModel.prototype.restoreData = function () {
    this.dataTask.dirty();
  };

  SeriesModel.prototype.getColorFromPalette = function (name, scope, requestColorNum) {
    var ecModel = this.ecModel;
    var color = PaletteMixin.prototype.getColorFromPalette.call(this, name, scope, requestColorNum);

    if (!color) {
      color = ecModel.getColorFromPalette(name, scope, requestColorNum);
    }

    return color;
  };

  SeriesModel.prototype.coordDimToDataDim = function (coordDim) {
    return this.getRawData().mapDimensionsAll(coordDim);
  };

  SeriesModel.prototype.getProgressive = function () {
    return this.get('progressive');
  };

  SeriesModel.prototype.getProgressiveThreshold = function () {
    return this.get('progressiveThreshold');
  };

  SeriesModel.prototype.select = function (innerDataIndices, dataType) {
    this._innerSelect(this.getData(dataType), innerDataIndices);
  };

  SeriesModel.prototype.unselect = function (innerDataIndices, dataType) {
    var selectedMap = this.option.selectedMap;

    if (!selectedMap) {
      return;
    }

    var data = this.getData(dataType);

    for (var i = 0; i < innerDataIndices.length; i++) {
      var dataIndex = innerDataIndices[i];
      var nameOrId = getSelectionKey(data, dataIndex);
      selectedMap[nameOrId] = false;
      this._selectedDataIndicesMap[nameOrId] = -1;
    }
  };

  SeriesModel.prototype.toggleSelect = function (innerDataIndices, dataType) {
    var tmpArr = [];

    for (var i = 0; i < innerDataIndices.length; i++) {
      tmpArr[0] = innerDataIndices[i];
      this.isSelected(innerDataIndices[i], dataType) ? this.unselect(tmpArr, dataType) : this.select(tmpArr, dataType);
    }
  };

  SeriesModel.prototype.getSelectedDataIndices = function () {
    var selectedDataIndicesMap = this._selectedDataIndicesMap;
    var nameOrIds = zrUtil.keys(selectedDataIndicesMap);
    var dataIndices = [];

    for (var i = 0; i < nameOrIds.length; i++) {
      var dataIndex = selectedDataIndicesMap[nameOrIds[i]];

      if (dataIndex >= 0) {
        dataIndices.push(dataIndex);
      }
    }

    return dataIndices;
  };

  SeriesModel.prototype.isSelected = function (dataIndex, dataType) {
    var selectedMap = this.option.selectedMap;

    if (!selectedMap) {
      return false;
    }

    var data = this.getData(dataType);
    var nameOrId = getSelectionKey(data, dataIndex);
    return selectedMap[nameOrId] || false;
  };

  SeriesModel.prototype._innerSelect = function (data, innerDataIndices) {
    var _a, _b;

    var selectedMode = this.option.selectedMode;
    var len = innerDataIndices.length;

    if (!selectedMode || !len) {
      return;
    }

    if (selectedMode === 'multiple') {
      var selectedMap = this.option.selectedMap || (this.option.selectedMap = {});

      for (var i = 0; i < len; i++) {
        var dataIndex = innerDataIndices[i];
        var nameOrId = getSelectionKey(data, dataIndex);
        selectedMap[nameOrId] = true;
        this._selectedDataIndicesMap[nameOrId] = data.getRawIndex(dataIndex);
      }
    } else if (selectedMode === 'single' || selectedMode === true) {
      var lastDataIndex = innerDataIndices[len - 1];
      var nameOrId = getSelectionKey(data, lastDataIndex);
      this.option.selectedMap = (_a = {}, _a[nameOrId] = true, _a);
      this._selectedDataIndicesMap = (_b = {}, _b[nameOrId] = data.getRawIndex(lastDataIndex), _b);
    }
  };

  SeriesModel.prototype._initSelectedMapFromData = function (data) {
    if (this.option.selectedMap) {
      return;
    }

    var dataIndices = [];

    if (data.hasItemOption) {
      data.each(function (idx) {
        var rawItem = data.getRawDataItem(idx);

        if (typeof rawItem === 'object' && rawItem.selected) {
          dataIndices.push(idx);
        }
      });
    }

    if (dataIndices.length > 0) {
      this._innerSelect(data, dataIndices);
    }
  };

  SeriesModel.registerClass = function (clz) {
    return ComponentModel.registerClass(clz);
  };

  SeriesModel.protoInitialize = function () {
    var proto = SeriesModel.prototype;
    proto.type = 'series.__base__';
    proto.seriesIndex = 0;
    proto.useColorPaletteOnData = false;
    proto.ignoreStyleOnData = false;
    proto.hasSymbolVisual = false;
    proto.defaultSymbol = 'circle';
    proto.visualStyleAccessPath = 'itemStyle';
    proto.visualDrawType = 'fill';
  }();

  return SeriesModel;
}(ComponentModel);

zrUtil.mixin(SeriesModel, DataFormatMixin);
zrUtil.mixin(SeriesModel, PaletteMixin);
mountExtend(SeriesModel, ComponentModel);

function autoSeriesName(seriesModel) {
  var name = seriesModel.name;

  if (!modelUtil.isNameSpecified(seriesModel)) {
    seriesModel.name = getSeriesAutoName(seriesModel) || name;
  }
}

function getSeriesAutoName(seriesModel) {
  var data = seriesModel.getRawData();
  var dataDims = data.mapDimensionsAll('seriesName');
  var nameArr = [];
  zrUtil.each(dataDims, function (dataDim) {
    var dimInfo = data.getDimensionInfo(dataDim);
    dimInfo.displayName && nameArr.push(dimInfo.displayName);
  });
  return nameArr.join(' ');
}

function dataTaskCount(context) {
  return context.model.getRawData().count();
}

function dataTaskReset(context) {
  var seriesModel = context.model;
  seriesModel.setData(seriesModel.getRawData().cloneShallow());
  return dataTaskProgress;
}

function dataTaskProgress(param, context) {
  if (context.outputData && param.end > context.outputData.count()) {
    context.model.getRawData().cloneShallow(context.outputData);
  }
}

function wrapData(data, seriesModel) {
  zrUtil.each(__spreadArrays(data.CHANGABLE_METHODS, data.DOWNSAMPLE_METHODS), function (methodName) {
    data.wrapMethod(methodName, zrUtil.curry(onDataChange, seriesModel));
  });
}

function onDataChange(seriesModel, newList) {
  var task = getCurrentTask(seriesModel);

  if (task) {
    task.setOutputEnd((newList || this).count());
  }

  return newList;
}

function getCurrentTask(seriesModel) {
  var scheduler = (seriesModel.ecModel || {}).scheduler;
  var pipeline = scheduler && scheduler.getPipeline(seriesModel.uid);

  if (pipeline) {
    var task = pipeline.currentTask;

    if (task) {
      var agentStubMap = task.agentStubMap;

      if (agentStubMap) {
        task = agentStubMap.get(seriesModel.uid);
      }
    }

    return task;
  }
}

export default SeriesModel;