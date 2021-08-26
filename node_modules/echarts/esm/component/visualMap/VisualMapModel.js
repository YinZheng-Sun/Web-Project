
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
import env from 'zrender/esm/core/env';
import visualDefault from '../../visual/visualDefault';
import VisualMapping from '../../visual/VisualMapping';
import * as visualSolution from '../../visual/visualSolution';
import * as modelUtil from '../../util/model';
import * as numberUtil from '../../util/number';
import ComponentModel from '../../model/Component';
var mapVisual = VisualMapping.mapVisual;
var eachVisual = VisualMapping.eachVisual;
var isArray = zrUtil.isArray;
var each = zrUtil.each;
var asc = numberUtil.asc;
var linearMap = numberUtil.linearMap;

var VisualMapModel = function (_super) {
  __extends(VisualMapModel, _super);

  function VisualMapModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = VisualMapModel.type;
    _this.stateList = ['inRange', 'outOfRange'];
    _this.replacableOptionKeys = ['inRange', 'outOfRange', 'target', 'controller', 'color'];
    _this.layoutMode = {
      type: 'box',
      ignoreSize: true
    };
    _this.dataBound = [-Infinity, Infinity];
    _this.targetVisuals = {};
    _this.controllerVisuals = {};
    return _this;
  }

  VisualMapModel.prototype.init = function (option, parentModel, ecModel) {
    this.mergeDefaultAndTheme(option, ecModel);
  };

  VisualMapModel.prototype.optionUpdated = function (newOption, isInit) {
    var thisOption = this.option;

    if (!env.canvasSupported) {
      thisOption.realtime = false;
    }

    !isInit && visualSolution.replaceVisualOption(thisOption, newOption, this.replacableOptionKeys);
    this.textStyleModel = this.getModel('textStyle');
    this.resetItemSize();
    this.completeVisualOption();
  };

  VisualMapModel.prototype.resetVisual = function (supplementVisualOption) {
    var stateList = this.stateList;
    supplementVisualOption = zrUtil.bind(supplementVisualOption, this);
    this.controllerVisuals = visualSolution.createVisualMappings(this.option.controller, stateList, supplementVisualOption);
    this.targetVisuals = visualSolution.createVisualMappings(this.option.target, stateList, supplementVisualOption);
  };

  VisualMapModel.prototype.getTargetSeriesIndices = function () {
    var optionSeriesIndex = this.option.seriesIndex;
    var seriesIndices = [];

    if (optionSeriesIndex == null || optionSeriesIndex === 'all') {
      this.ecModel.eachSeries(function (seriesModel, index) {
        seriesIndices.push(index);
      });
    } else {
      seriesIndices = modelUtil.normalizeToArray(optionSeriesIndex);
    }

    return seriesIndices;
  };

  VisualMapModel.prototype.eachTargetSeries = function (callback, context) {
    zrUtil.each(this.getTargetSeriesIndices(), function (seriesIndex) {
      var seriesModel = this.ecModel.getSeriesByIndex(seriesIndex);

      if (seriesModel) {
        callback.call(context, seriesModel);
      }
    }, this);
  };

  VisualMapModel.prototype.isTargetSeries = function (seriesModel) {
    var is = false;
    this.eachTargetSeries(function (model) {
      model === seriesModel && (is = true);
    });
    return is;
  };

  VisualMapModel.prototype.formatValueText = function (value, isCategory, edgeSymbols) {
    var option = this.option;
    var precision = option.precision;
    var dataBound = this.dataBound;
    var formatter = option.formatter;
    var isMinMax;
    edgeSymbols = edgeSymbols || ['<', '>'];

    if (zrUtil.isArray(value)) {
      value = value.slice();
      isMinMax = true;
    }

    var textValue = isCategory ? value : isMinMax ? [toFixed(value[0]), toFixed(value[1])] : toFixed(value);

    if (zrUtil.isString(formatter)) {
      return formatter.replace('{value}', isMinMax ? textValue[0] : textValue).replace('{value2}', isMinMax ? textValue[1] : textValue);
    } else if (zrUtil.isFunction(formatter)) {
      return isMinMax ? formatter(value[0], value[1]) : formatter(value);
    }

    if (isMinMax) {
      if (value[0] === dataBound[0]) {
        return edgeSymbols[0] + ' ' + textValue[1];
      } else if (value[1] === dataBound[1]) {
        return edgeSymbols[1] + ' ' + textValue[0];
      } else {
        return textValue[0] + ' - ' + textValue[1];
      }
    } else {
      return textValue;
    }

    function toFixed(val) {
      return val === dataBound[0] ? 'min' : val === dataBound[1] ? 'max' : (+val).toFixed(Math.min(precision, 20));
    }
  };

  VisualMapModel.prototype.resetExtent = function () {
    var thisOption = this.option;
    var extent = asc([thisOption.min, thisOption.max]);
    this._dataExtent = extent;
  };

  VisualMapModel.prototype.getDataDimension = function (list) {
    var optDim = this.option.dimension;
    var listDimensions = list.dimensions;

    if (optDim == null && !listDimensions.length) {
      return;
    }

    if (optDim != null) {
      return list.getDimension(optDim);
    }

    var dimNames = list.dimensions;

    for (var i = dimNames.length - 1; i >= 0; i--) {
      var dimName = dimNames[i];
      var dimInfo = list.getDimensionInfo(dimName);

      if (!dimInfo.isCalculationCoord) {
        return dimName;
      }
    }
  };

  VisualMapModel.prototype.getExtent = function () {
    return this._dataExtent.slice();
  };

  VisualMapModel.prototype.completeVisualOption = function () {
    var ecModel = this.ecModel;
    var thisOption = this.option;
    var base = {
      inRange: thisOption.inRange,
      outOfRange: thisOption.outOfRange
    };
    var target = thisOption.target || (thisOption.target = {});
    var controller = thisOption.controller || (thisOption.controller = {});
    zrUtil.merge(target, base);
    zrUtil.merge(controller, base);
    var isCategory = this.isCategory();
    completeSingle.call(this, target);
    completeSingle.call(this, controller);
    completeInactive.call(this, target, 'inRange', 'outOfRange');
    completeController.call(this, controller);

    function completeSingle(base) {
      if (isArray(thisOption.color) && !base.inRange) {
        base.inRange = {
          color: thisOption.color.slice().reverse()
        };
      }

      base.inRange = base.inRange || {
        color: ecModel.get('gradientColor')
      };
    }

    function completeInactive(base, stateExist, stateAbsent) {
      var optExist = base[stateExist];
      var optAbsent = base[stateAbsent];

      if (optExist && !optAbsent) {
        optAbsent = base[stateAbsent] = {};
        each(optExist, function (visualData, visualType) {
          if (!VisualMapping.isValidType(visualType)) {
            return;
          }

          var defa = visualDefault.get(visualType, 'inactive', isCategory);

          if (defa != null) {
            optAbsent[visualType] = defa;

            if (visualType === 'color' && !optAbsent.hasOwnProperty('opacity') && !optAbsent.hasOwnProperty('colorAlpha')) {
              optAbsent.opacity = [0, 0];
            }
          }
        });
      }
    }

    function completeController(controller) {
      var symbolExists = (controller.inRange || {}).symbol || (controller.outOfRange || {}).symbol;
      var symbolSizeExists = (controller.inRange || {}).symbolSize || (controller.outOfRange || {}).symbolSize;
      var inactiveColor = this.get('inactiveColor');
      each(this.stateList, function (state) {
        var itemSize = this.itemSize;
        var visuals = controller[state];

        if (!visuals) {
          visuals = controller[state] = {
            color: isCategory ? inactiveColor : [inactiveColor]
          };
        }

        if (visuals.symbol == null) {
          visuals.symbol = symbolExists && zrUtil.clone(symbolExists) || (isCategory ? 'roundRect' : ['roundRect']);
        }

        if (visuals.symbolSize == null) {
          visuals.symbolSize = symbolSizeExists && zrUtil.clone(symbolSizeExists) || (isCategory ? itemSize[0] : [itemSize[0], itemSize[0]]);
        }

        visuals.symbol = mapVisual(visuals.symbol, function (symbol) {
          return symbol === 'none' || symbol === 'square' ? 'roundRect' : symbol;
        });
        var symbolSize = visuals.symbolSize;

        if (symbolSize != null) {
          var max_1 = -Infinity;
          eachVisual(symbolSize, function (value) {
            value > max_1 && (max_1 = value);
          });
          visuals.symbolSize = mapVisual(symbolSize, function (value) {
            return linearMap(value, [0, max_1], [0, itemSize[0]], true);
          });
        }
      }, this);
    }
  };

  VisualMapModel.prototype.resetItemSize = function () {
    this.itemSize = [parseFloat(this.get('itemWidth')), parseFloat(this.get('itemHeight'))];
  };

  VisualMapModel.prototype.isCategory = function () {
    return !!this.option.categories;
  };

  VisualMapModel.prototype.setSelected = function (selected) {};

  VisualMapModel.prototype.getSelected = function () {
    return null;
  };

  VisualMapModel.prototype.getValueState = function (value) {
    return null;
  };

  VisualMapModel.prototype.getVisualMeta = function (getColorVisual) {
    return null;
  };

  VisualMapModel.type = 'visualMap';
  VisualMapModel.dependencies = ['series'];
  VisualMapModel.defaultOption = {
    show: true,
    zlevel: 0,
    z: 4,
    seriesIndex: 'all',
    min: 0,
    max: 200,
    left: 0,
    right: null,
    top: null,
    bottom: 0,
    itemWidth: null,
    itemHeight: null,
    inverse: false,
    orient: 'vertical',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#ccc',
    contentColor: '#5793f3',
    inactiveColor: '#aaa',
    borderWidth: 0,
    padding: 5,
    textGap: 10,
    precision: 0,
    textStyle: {
      color: '#333'
    }
  };
  return VisualMapModel;
}(ComponentModel);

export default VisualMapModel;