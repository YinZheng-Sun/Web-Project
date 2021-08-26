
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

import { __assign, __extends } from "tslib";
import { extend, retrieve3 } from 'zrender/esm/core/util';
import * as graphic from '../../util/graphic';
import { setStatesStylesFromModel, enableHoverEmphasis } from '../../util/states';
import ChartView from '../../view/Chart';
import labelLayout from './labelLayout';
import { setLabelLineStyle, getLabelLineStatesModels } from '../../label/labelGuideHelper';
import { setLabelStyle, getLabelStatesModels } from '../../label/labelStyle';
import { getSectorCornerRadius } from '../helper/pieHelper';

var PiePiece = function (_super) {
  __extends(PiePiece, _super);

  function PiePiece(data, idx, startAngle) {
    var _this = _super.call(this) || this;

    _this.z2 = 2;
    var polyline = new graphic.Polyline();
    var text = new graphic.Text();

    _this.setTextGuideLine(polyline);

    _this.setTextContent(text);

    _this.updateData(data, idx, startAngle, true);

    return _this;
  }

  PiePiece.prototype.updateData = function (data, idx, startAngle, firstCreate) {
    var sector = this;
    var seriesModel = data.hostModel;
    var itemModel = data.getItemModel(idx);
    var emphasisModel = itemModel.getModel('emphasis');
    var layout = data.getItemLayout(idx);
    var sectorShape = extend(getSectorCornerRadius(itemModel.getModel('itemStyle'), layout) || {}, layout);

    if (firstCreate) {
      sector.setShape(sectorShape);
      var animationType = seriesModel.getShallow('animationType');

      if (animationType === 'scale') {
        sector.shape.r = layout.r0;
        graphic.initProps(sector, {
          shape: {
            r: layout.r
          }
        }, seriesModel, idx);
      } else {
        if (startAngle != null) {
          sector.setShape({
            startAngle: startAngle,
            endAngle: startAngle
          });
          graphic.initProps(sector, {
            shape: {
              startAngle: layout.startAngle,
              endAngle: layout.endAngle
            }
          }, seriesModel, idx);
        } else {
          sector.shape.endAngle = layout.startAngle;
          graphic.updateProps(sector, {
            shape: {
              endAngle: layout.endAngle
            }
          }, seriesModel, idx);
        }
      }
    } else {
      graphic.updateProps(sector, {
        shape: sectorShape
      }, seriesModel, idx);
    }

    sector.useStyle(data.getItemVisual(idx, 'style'));
    setStatesStylesFromModel(sector, itemModel);
    var midAngle = (layout.startAngle + layout.endAngle) / 2;
    var offset = seriesModel.get('selectedOffset');
    var dx = Math.cos(midAngle) * offset;
    var dy = Math.sin(midAngle) * offset;
    var cursorStyle = itemModel.getShallow('cursor');
    cursorStyle && sector.attr('cursor', cursorStyle);

    this._updateLabel(seriesModel, data, idx);

    sector.ensureState('emphasis').shape = __assign({
      r: layout.r + (emphasisModel.get('scale') ? emphasisModel.get('scaleSize') || 0 : 0)
    }, getSectorCornerRadius(emphasisModel.getModel('itemStyle'), layout));
    extend(sector.ensureState('select'), {
      x: dx,
      y: dy,
      shape: getSectorCornerRadius(itemModel.getModel(['select', 'itemStyle']), layout)
    });
    extend(sector.ensureState('blur'), {
      shape: getSectorCornerRadius(itemModel.getModel(['blur', 'itemStyle']), layout)
    });
    var labelLine = sector.getTextGuideLine();
    var labelText = sector.getTextContent();
    extend(labelLine.ensureState('select'), {
      x: dx,
      y: dy
    });
    extend(labelText.ensureState('select'), {
      x: dx,
      y: dy
    });
    enableHoverEmphasis(this, emphasisModel.get('focus'), emphasisModel.get('blurScope'));
  };

  PiePiece.prototype._updateLabel = function (seriesModel, data, idx) {
    var sector = this;
    var itemModel = data.getItemModel(idx);
    var labelLineModel = itemModel.getModel('labelLine');
    var style = data.getItemVisual(idx, 'style');
    var visualColor = style && style.fill;
    var visualOpacity = style && style.opacity;
    setLabelStyle(sector, getLabelStatesModels(itemModel), {
      labelFetcher: data.hostModel,
      labelDataIndex: idx,
      inheritColor: visualColor,
      defaultOpacity: visualOpacity,
      defaultText: seriesModel.getFormattedLabel(idx, 'normal') || data.getName(idx)
    });
    var labelText = sector.getTextContent();
    sector.setTextConfig({
      position: null,
      rotation: null
    });
    labelText.attr({
      z2: 10
    });
    setLabelLineStyle(this, getLabelLineStatesModels(itemModel), {
      stroke: visualColor,
      opacity: retrieve3(labelLineModel.get(['lineStyle', 'opacity']), visualOpacity, 1)
    });
  };

  return PiePiece;
}(graphic.Sector);

var PieView = function (_super) {
  __extends(PieView, _super);

  function PieView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.ignoreLabelLineUpdate = true;
    return _this;
  }

  PieView.prototype.init = function () {
    var sectorGroup = new graphic.Group();
    this._sectorGroup = sectorGroup;
  };

  PieView.prototype.render = function (seriesModel, ecModel, api, payload) {
    var data = seriesModel.getData();
    var oldData = this._data;
    var group = this.group;
    var startAngle;

    if (!oldData && data.count() > 0) {
      var shape = data.getItemLayout(0);

      for (var s = 1; isNaN(shape && shape.startAngle) && s < data.count(); ++s) {
        shape = data.getItemLayout(s);
      }

      if (shape) {
        startAngle = shape.startAngle;
      }
    }

    data.diff(oldData).add(function (idx) {
      var piePiece = new PiePiece(data, idx, startAngle);
      data.setItemGraphicEl(idx, piePiece);
      group.add(piePiece);
    }).update(function (newIdx, oldIdx) {
      var piePiece = oldData.getItemGraphicEl(oldIdx);
      piePiece.updateData(data, newIdx, startAngle);
      piePiece.off('click');
      group.add(piePiece);
      data.setItemGraphicEl(newIdx, piePiece);
    }).remove(function (idx) {
      var piePiece = oldData.getItemGraphicEl(idx);
      graphic.removeElementWithFadeOut(piePiece, seriesModel, idx);
    }).execute();
    labelLayout(seriesModel);

    if (seriesModel.get('animationTypeUpdate') !== 'expansion') {
      this._data = data;
    }
  };

  PieView.prototype.dispose = function () {};

  PieView.prototype.containPoint = function (point, seriesModel) {
    var data = seriesModel.getData();
    var itemLayout = data.getItemLayout(0);

    if (itemLayout) {
      var dx = point[0] - itemLayout.cx;
      var dy = point[1] - itemLayout.cy;
      var radius = Math.sqrt(dx * dx + dy * dy);
      return radius <= itemLayout.r && radius >= itemLayout.r0;
    }
  };

  PieView.type = 'pie';
  return PieView;
}(ChartView);

ChartView.registerClass(PieView);
export default PieView;