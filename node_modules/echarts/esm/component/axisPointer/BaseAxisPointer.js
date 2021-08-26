
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
import * as graphic from '../../util/graphic';
import * as axisPointerModelHelper from './modelHelper';
import * as eventTool from 'zrender/esm/core/event';
import * as throttleUtil from '../../util/throttle';
import { makeInner } from '../../util/model';
var inner = makeInner();
var clone = zrUtil.clone;
var bind = zrUtil.bind;

var BaseAxisPointer = function () {
  function BaseAxisPointer() {
    this._dragging = false;
    this.animationThreshold = 15;
  }

  BaseAxisPointer.prototype.render = function (axisModel, axisPointerModel, api, forceRender) {
    var value = axisPointerModel.get('value');
    var status = axisPointerModel.get('status');
    this._axisModel = axisModel;
    this._axisPointerModel = axisPointerModel;
    this._api = api;

    if (!forceRender && this._lastValue === value && this._lastStatus === status) {
      return;
    }

    this._lastValue = value;
    this._lastStatus = status;
    var group = this._group;
    var handle = this._handle;

    if (!status || status === 'hide') {
      group && group.hide();
      handle && handle.hide();
      return;
    }

    group && group.show();
    handle && handle.show();
    var elOption = {};
    this.makeElOption(elOption, value, axisModel, axisPointerModel, api);
    var graphicKey = elOption.graphicKey;

    if (graphicKey !== this._lastGraphicKey) {
      this.clear(api);
    }

    this._lastGraphicKey = graphicKey;
    var moveAnimation = this._moveAnimation = this.determineAnimation(axisModel, axisPointerModel);

    if (!group) {
      group = this._group = new graphic.Group();
      this.createPointerEl(group, elOption, axisModel, axisPointerModel);
      this.createLabelEl(group, elOption, axisModel, axisPointerModel);
      api.getZr().add(group);
    } else {
      var doUpdateProps = zrUtil.curry(updateProps, axisPointerModel, moveAnimation);
      this.updatePointerEl(group, elOption, doUpdateProps);
      this.updateLabelEl(group, elOption, doUpdateProps, axisPointerModel);
    }

    updateMandatoryProps(group, axisPointerModel, true);

    this._renderHandle(value);
  };

  BaseAxisPointer.prototype.remove = function (api) {
    this.clear(api);
  };

  BaseAxisPointer.prototype.dispose = function (api) {
    this.clear(api);
  };

  BaseAxisPointer.prototype.determineAnimation = function (axisModel, axisPointerModel) {
    var animation = axisPointerModel.get('animation');
    var axis = axisModel.axis;
    var isCategoryAxis = axis.type === 'category';
    var useSnap = axisPointerModel.get('snap');

    if (!useSnap && !isCategoryAxis) {
      return false;
    }

    if (animation === 'auto' || animation == null) {
      var animationThreshold = this.animationThreshold;

      if (isCategoryAxis && axis.getBandWidth() > animationThreshold) {
        return true;
      }

      if (useSnap) {
        var seriesDataCount = axisPointerModelHelper.getAxisInfo(axisModel).seriesDataCount;
        var axisExtent = axis.getExtent();
        return Math.abs(axisExtent[0] - axisExtent[1]) / seriesDataCount > animationThreshold;
      }

      return false;
    }

    return animation === true;
  };

  BaseAxisPointer.prototype.makeElOption = function (elOption, value, axisModel, axisPointerModel, api) {};

  BaseAxisPointer.prototype.createPointerEl = function (group, elOption, axisModel, axisPointerModel) {
    var pointerOption = elOption.pointer;

    if (pointerOption) {
      var pointerEl = inner(group).pointerEl = new graphic[pointerOption.type](clone(elOption.pointer));
      group.add(pointerEl);
    }
  };

  BaseAxisPointer.prototype.createLabelEl = function (group, elOption, axisModel, axisPointerModel) {
    if (elOption.label) {
      var labelEl = inner(group).labelEl = new graphic.Text(clone(elOption.label));
      group.add(labelEl);
      updateLabelShowHide(labelEl, axisPointerModel);
    }
  };

  BaseAxisPointer.prototype.updatePointerEl = function (group, elOption, updateProps) {
    var pointerEl = inner(group).pointerEl;

    if (pointerEl && elOption.pointer) {
      pointerEl.setStyle(elOption.pointer.style);
      updateProps(pointerEl, {
        shape: elOption.pointer.shape
      });
    }
  };

  BaseAxisPointer.prototype.updateLabelEl = function (group, elOption, updateProps, axisPointerModel) {
    var labelEl = inner(group).labelEl;

    if (labelEl) {
      labelEl.setStyle(elOption.label.style);
      updateProps(labelEl, {
        x: elOption.label.x,
        y: elOption.label.y
      });
      updateLabelShowHide(labelEl, axisPointerModel);
    }
  };

  BaseAxisPointer.prototype._renderHandle = function (value) {
    if (this._dragging || !this.updateHandleTransform) {
      return;
    }

    var axisPointerModel = this._axisPointerModel;

    var zr = this._api.getZr();

    var handle = this._handle;
    var handleModel = axisPointerModel.getModel('handle');
    var status = axisPointerModel.get('status');

    if (!handleModel.get('show') || !status || status === 'hide') {
      handle && zr.remove(handle);
      this._handle = null;
      return;
    }

    var isInit;

    if (!this._handle) {
      isInit = true;
      handle = this._handle = graphic.createIcon(handleModel.get('icon'), {
        cursor: 'move',
        draggable: true,
        onmousemove: function (e) {
          eventTool.stop(e.event);
        },
        onmousedown: bind(this._onHandleDragMove, this, 0, 0),
        drift: bind(this._onHandleDragMove, this),
        ondragend: bind(this._onHandleDragEnd, this)
      });
      zr.add(handle);
    }

    updateMandatoryProps(handle, axisPointerModel, false);
    handle.setStyle(handleModel.getItemStyle(null, ['color', 'borderColor', 'borderWidth', 'opacity', 'shadowColor', 'shadowBlur', 'shadowOffsetX', 'shadowOffsetY']));
    var handleSize = handleModel.get('size');

    if (!zrUtil.isArray(handleSize)) {
      handleSize = [handleSize, handleSize];
    }

    handle.scaleX = handleSize[0] / 2;
    handle.scaleY = handleSize[1] / 2;
    throttleUtil.createOrUpdate(this, '_doDispatchAxisPointer', handleModel.get('throttle') || 0, 'fixRate');

    this._moveHandleToValue(value, isInit);
  };

  BaseAxisPointer.prototype._moveHandleToValue = function (value, isInit) {
    updateProps(this._axisPointerModel, !isInit && this._moveAnimation, this._handle, getHandleTransProps(this.getHandleTransform(value, this._axisModel, this._axisPointerModel)));
  };

  BaseAxisPointer.prototype._onHandleDragMove = function (dx, dy) {
    var handle = this._handle;

    if (!handle) {
      return;
    }

    this._dragging = true;
    var trans = this.updateHandleTransform(getHandleTransProps(handle), [dx, dy], this._axisModel, this._axisPointerModel);
    this._payloadInfo = trans;
    handle.stopAnimation();
    handle.attr(getHandleTransProps(trans));
    inner(handle).lastProp = null;

    this._doDispatchAxisPointer();
  };

  BaseAxisPointer.prototype._doDispatchAxisPointer = function () {
    var handle = this._handle;

    if (!handle) {
      return;
    }

    var payloadInfo = this._payloadInfo;
    var axisModel = this._axisModel;

    this._api.dispatchAction({
      type: 'updateAxisPointer',
      x: payloadInfo.cursorPoint[0],
      y: payloadInfo.cursorPoint[1],
      tooltipOption: payloadInfo.tooltipOption,
      axesInfo: [{
        axisDim: axisModel.axis.dim,
        axisIndex: axisModel.componentIndex
      }]
    });
  };

  BaseAxisPointer.prototype._onHandleDragEnd = function () {
    this._dragging = false;
    var handle = this._handle;

    if (!handle) {
      return;
    }

    var value = this._axisPointerModel.get('value');

    this._moveHandleToValue(value);

    this._api.dispatchAction({
      type: 'hideTip'
    });
  };

  BaseAxisPointer.prototype.clear = function (api) {
    this._lastValue = null;
    this._lastStatus = null;
    var zr = api.getZr();
    var group = this._group;
    var handle = this._handle;

    if (zr && group) {
      this._lastGraphicKey = null;
      group && zr.remove(group);
      handle && zr.remove(handle);
      this._group = null;
      this._handle = null;
      this._payloadInfo = null;
    }
  };

  BaseAxisPointer.prototype.doClear = function () {};

  BaseAxisPointer.prototype.buildLabel = function (xy, wh, xDimIndex) {
    xDimIndex = xDimIndex || 0;
    return {
      x: xy[xDimIndex],
      y: xy[1 - xDimIndex],
      width: wh[xDimIndex],
      height: wh[1 - xDimIndex]
    };
  };

  return BaseAxisPointer;
}();

function updateProps(animationModel, moveAnimation, el, props) {
  if (!propsEqual(inner(el).lastProp, props)) {
    inner(el).lastProp = props;
    moveAnimation ? graphic.updateProps(el, props, animationModel) : (el.stopAnimation(), el.attr(props));
  }
}

function propsEqual(lastProps, newProps) {
  if (zrUtil.isObject(lastProps) && zrUtil.isObject(newProps)) {
    var equals_1 = true;
    zrUtil.each(newProps, function (item, key) {
      equals_1 = equals_1 && propsEqual(lastProps[key], item);
    });
    return !!equals_1;
  } else {
    return lastProps === newProps;
  }
}

function updateLabelShowHide(labelEl, axisPointerModel) {
  labelEl[axisPointerModel.get(['label', 'show']) ? 'show' : 'hide']();
}

function getHandleTransProps(trans) {
  return {
    x: trans.x || 0,
    y: trans.y || 0,
    rotation: trans.rotation || 0
  };
}

function updateMandatoryProps(group, axisPointerModel, silent) {
  var z = axisPointerModel.get('z');
  var zlevel = axisPointerModel.get('zlevel');
  group && group.traverse(function (el) {
    if (el.type !== 'group') {
      z != null && (el.z = z);
      zlevel != null && (el.zlevel = zlevel);
      el.silent = silent;
    }
  });
}

export default BaseAxisPointer;