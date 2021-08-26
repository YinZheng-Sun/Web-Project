
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
import VisualMapModel from './VisualMapModel';
import VisualMapping from '../../visual/VisualMapping';
import visualDefault from '../../visual/visualDefault';
import { reformIntervals } from '../../util/number';
import ComponentModel from '../../model/Component';
import { inheritDefaultOption } from '../../util/component';

var PiecewiseModel = function (_super) {
  __extends(PiecewiseModel, _super);

  function PiecewiseModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = PiecewiseModel.type;
    _this._pieceList = [];
    return _this;
  }

  PiecewiseModel.prototype.optionUpdated = function (newOption, isInit) {
    _super.prototype.optionUpdated.apply(this, arguments);

    this.resetExtent();

    var mode = this._mode = this._determineMode();

    this._pieceList = [];

    resetMethods[this._mode].call(this, this._pieceList);

    this._resetSelected(newOption, isInit);

    var categories = this.option.categories;
    this.resetVisual(function (mappingOption, state) {
      if (mode === 'categories') {
        mappingOption.mappingMethod = 'category';
        mappingOption.categories = zrUtil.clone(categories);
      } else {
        mappingOption.dataExtent = this.getExtent();
        mappingOption.mappingMethod = 'piecewise';
        mappingOption.pieceList = zrUtil.map(this._pieceList, function (piece) {
          piece = zrUtil.clone(piece);

          if (state !== 'inRange') {
            piece.visual = null;
          }

          return piece;
        });
      }
    });
  };

  PiecewiseModel.prototype.completeVisualOption = function () {
    var option = this.option;
    var visualTypesInPieces = {};
    var visualTypes = VisualMapping.listVisualTypes();
    var isCategory = this.isCategory();
    zrUtil.each(option.pieces, function (piece) {
      zrUtil.each(visualTypes, function (visualType) {
        if (piece.hasOwnProperty(visualType)) {
          visualTypesInPieces[visualType] = 1;
        }
      });
    });
    zrUtil.each(visualTypesInPieces, function (v, visualType) {
      var exists = false;
      zrUtil.each(this.stateList, function (state) {
        exists = exists || has(option, state, visualType) || has(option.target, state, visualType);
      }, this);
      !exists && zrUtil.each(this.stateList, function (state) {
        (option[state] || (option[state] = {}))[visualType] = visualDefault.get(visualType, state === 'inRange' ? 'active' : 'inactive', isCategory);
      });
    }, this);

    function has(obj, state, visualType) {
      return obj && obj[state] && obj[state].hasOwnProperty(visualType);
    }

    _super.prototype.completeVisualOption.apply(this, arguments);
  };

  PiecewiseModel.prototype._resetSelected = function (newOption, isInit) {
    var thisOption = this.option;
    var pieceList = this._pieceList;
    var selected = (isInit ? thisOption : newOption).selected || {};
    thisOption.selected = selected;
    zrUtil.each(pieceList, function (piece, index) {
      var key = this.getSelectedMapKey(piece);

      if (!selected.hasOwnProperty(key)) {
        selected[key] = true;
      }
    }, this);

    if (thisOption.selectedMode === 'single') {
      var hasSel_1 = false;
      zrUtil.each(pieceList, function (piece, index) {
        var key = this.getSelectedMapKey(piece);

        if (selected[key]) {
          hasSel_1 ? selected[key] = false : hasSel_1 = true;
        }
      }, this);
    }
  };

  PiecewiseModel.prototype.getSelectedMapKey = function (piece) {
    return this._mode === 'categories' ? piece.value + '' : piece.index + '';
  };

  PiecewiseModel.prototype.getPieceList = function () {
    return this._pieceList;
  };

  PiecewiseModel.prototype._determineMode = function () {
    var option = this.option;
    return option.pieces && option.pieces.length > 0 ? 'pieces' : this.option.categories ? 'categories' : 'splitNumber';
  };

  PiecewiseModel.prototype.setSelected = function (selected) {
    this.option.selected = zrUtil.clone(selected);
  };

  PiecewiseModel.prototype.getValueState = function (value) {
    var index = VisualMapping.findPieceIndex(value, this._pieceList);
    return index != null ? this.option.selected[this.getSelectedMapKey(this._pieceList[index])] ? 'inRange' : 'outOfRange' : 'outOfRange';
  };

  PiecewiseModel.prototype.findTargetDataIndices = function (pieceIndex) {
    var result = [];
    var pieceList = this._pieceList;
    this.eachTargetSeries(function (seriesModel) {
      var dataIndices = [];
      var data = seriesModel.getData();
      data.each(this.getDataDimension(data), function (value, dataIndex) {
        var pIdx = VisualMapping.findPieceIndex(value, pieceList);
        pIdx === pieceIndex && dataIndices.push(dataIndex);
      }, this);
      result.push({
        seriesId: seriesModel.id,
        dataIndex: dataIndices
      });
    }, this);
    return result;
  };

  PiecewiseModel.prototype.getRepresentValue = function (piece) {
    var representValue;

    if (this.isCategory()) {
      representValue = piece.value;
    } else {
      if (piece.value != null) {
        representValue = piece.value;
      } else {
        var pieceInterval = piece.interval || [];
        representValue = pieceInterval[0] === -Infinity && pieceInterval[1] === Infinity ? 0 : (pieceInterval[0] + pieceInterval[1]) / 2;
      }
    }

    return representValue;
  };

  PiecewiseModel.prototype.getVisualMeta = function (getColorVisual) {
    if (this.isCategory()) {
      return;
    }

    var stops = [];
    var outerColors = ['', ''];
    var visualMapModel = this;

    function setStop(interval, valueState) {
      var representValue = visualMapModel.getRepresentValue({
        interval: interval
      });

      if (!valueState) {
        valueState = visualMapModel.getValueState(representValue);
      }

      var color = getColorVisual(representValue, valueState);

      if (interval[0] === -Infinity) {
        outerColors[0] = color;
      } else if (interval[1] === Infinity) {
        outerColors[1] = color;
      } else {
        stops.push({
          value: interval[0],
          color: color
        }, {
          value: interval[1],
          color: color
        });
      }
    }

    var pieceList = this._pieceList.slice();

    if (!pieceList.length) {
      pieceList.push({
        interval: [-Infinity, Infinity]
      });
    } else {
      var edge = pieceList[0].interval[0];
      edge !== -Infinity && pieceList.unshift({
        interval: [-Infinity, edge]
      });
      edge = pieceList[pieceList.length - 1].interval[1];
      edge !== Infinity && pieceList.push({
        interval: [edge, Infinity]
      });
    }

    var curr = -Infinity;
    zrUtil.each(pieceList, function (piece) {
      var interval = piece.interval;

      if (interval) {
        interval[0] > curr && setStop([curr, interval[0]], 'outOfRange');
        setStop(interval.slice());
        curr = interval[1];
      }
    }, this);
    return {
      stops: stops,
      outerColors: outerColors
    };
  };

  PiecewiseModel.type = 'visualMap.piecewise';
  PiecewiseModel.defaultOption = inheritDefaultOption(VisualMapModel.defaultOption, {
    selected: null,
    minOpen: false,
    maxOpen: false,
    align: 'auto',
    itemWidth: 20,
    itemHeight: 14,
    itemSymbol: 'roundRect',
    pieces: null,
    categories: null,
    splitNumber: 5,
    selectedMode: 'multiple',
    itemGap: 10,
    hoverLink: true
  });
  return PiecewiseModel;
}(VisualMapModel);

;
var resetMethods = {
  splitNumber: function (outPieceList) {
    var thisOption = this.option;
    var precision = Math.min(thisOption.precision, 20);
    var dataExtent = this.getExtent();
    var splitNumber = thisOption.splitNumber;
    splitNumber = Math.max(parseInt(splitNumber, 10), 1);
    thisOption.splitNumber = splitNumber;
    var splitStep = (dataExtent[1] - dataExtent[0]) / splitNumber;

    while (+splitStep.toFixed(precision) !== splitStep && precision < 5) {
      precision++;
    }

    thisOption.precision = precision;
    splitStep = +splitStep.toFixed(precision);

    if (thisOption.minOpen) {
      outPieceList.push({
        interval: [-Infinity, dataExtent[0]],
        close: [0, 0]
      });
    }

    for (var index = 0, curr = dataExtent[0]; index < splitNumber; curr += splitStep, index++) {
      var max = index === splitNumber - 1 ? dataExtent[1] : curr + splitStep;
      outPieceList.push({
        interval: [curr, max],
        close: [1, 1]
      });
    }

    if (thisOption.maxOpen) {
      outPieceList.push({
        interval: [dataExtent[1], Infinity],
        close: [0, 0]
      });
    }

    reformIntervals(outPieceList);
    zrUtil.each(outPieceList, function (piece, index) {
      piece.index = index;
      piece.text = this.formatValueText(piece.interval);
    }, this);
  },
  categories: function (outPieceList) {
    var thisOption = this.option;
    zrUtil.each(thisOption.categories, function (cate) {
      outPieceList.push({
        text: this.formatValueText(cate, true),
        value: cate
      });
    }, this);
    normalizeReverse(thisOption, outPieceList);
  },
  pieces: function (outPieceList) {
    var thisOption = this.option;
    zrUtil.each(thisOption.pieces, function (pieceListItem, index) {
      if (!zrUtil.isObject(pieceListItem)) {
        pieceListItem = {
          value: pieceListItem
        };
      }

      var item = {
        text: '',
        index: index
      };

      if (pieceListItem.label != null) {
        item.text = pieceListItem.label;
      }

      if (pieceListItem.hasOwnProperty('value')) {
        var value = item.value = pieceListItem.value;
        item.interval = [value, value];
        item.close = [1, 1];
      } else {
        var interval = item.interval = [];
        var close_1 = item.close = [0, 0];
        var closeList = [1, 0, 1];
        var infinityList = [-Infinity, Infinity];
        var useMinMax = [];

        for (var lg = 0; lg < 2; lg++) {
          var names = [['gte', 'gt', 'min'], ['lte', 'lt', 'max']][lg];

          for (var i = 0; i < 3 && interval[lg] == null; i++) {
            interval[lg] = pieceListItem[names[i]];
            close_1[lg] = closeList[i];
            useMinMax[lg] = i === 2;
          }

          interval[lg] == null && (interval[lg] = infinityList[lg]);
        }

        useMinMax[0] && interval[1] === Infinity && (close_1[0] = 0);
        useMinMax[1] && interval[0] === -Infinity && (close_1[1] = 0);

        if (process.env.NODE_ENV !== 'production') {
          if (interval[0] > interval[1]) {
            console.warn('Piece ' + index + 'is illegal: ' + interval + ' lower bound should not greater then uppper bound.');
          }
        }

        if (interval[0] === interval[1] && close_1[0] && close_1[1]) {
          item.value = interval[0];
        }
      }

      item.visual = VisualMapping.retrieveVisuals(pieceListItem);
      outPieceList.push(item);
    }, this);
    normalizeReverse(thisOption, outPieceList);
    reformIntervals(outPieceList);
    zrUtil.each(outPieceList, function (piece) {
      var close = piece.close;
      var edgeSymbols = [['<', '≤'][close[1]], ['>', '≥'][close[0]]];
      piece.text = piece.text || this.formatValueText(piece.value != null ? piece.value : piece.interval, false, edgeSymbols);
    }, this);
  }
};

function normalizeReverse(thisOption, pieceList) {
  var inverse = thisOption.inverse;

  if (thisOption.orient === 'vertical' ? !inverse : inverse) {
    pieceList.reverse();
  }
}

ComponentModel.registerClass(PiecewiseModel);
export default PiecewiseModel;