
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
import Eventful from 'zrender/esm/core/Eventful';
import * as eventTool from 'zrender/esm/core/event';
import * as interactionMutex from './interactionMutex';
import { isString, bind, defaults, clone } from 'zrender/esm/core/util';

var RoamController = function (_super) {
  __extends(RoamController, _super);

  function RoamController(zr) {
    var _this = _super.call(this) || this;

    _this._zr = zr;
    var mousedownHandler = bind(_this._mousedownHandler, _this);
    var mousemoveHandler = bind(_this._mousemoveHandler, _this);
    var mouseupHandler = bind(_this._mouseupHandler, _this);
    var mousewheelHandler = bind(_this._mousewheelHandler, _this);
    var pinchHandler = bind(_this._pinchHandler, _this);

    _this.enable = function (controlType, opt) {
      this.disable();
      this._opt = defaults(clone(opt) || {}, {
        zoomOnMouseWheel: true,
        moveOnMouseMove: true,
        moveOnMouseWheel: false,
        preventDefaultMouseMove: true
      });

      if (controlType == null) {
        controlType = true;
      }

      if (controlType === true || controlType === 'move' || controlType === 'pan') {
        zr.on('mousedown', mousedownHandler);
        zr.on('mousemove', mousemoveHandler);
        zr.on('mouseup', mouseupHandler);
      }

      if (controlType === true || controlType === 'scale' || controlType === 'zoom') {
        zr.on('mousewheel', mousewheelHandler);
        zr.on('pinch', pinchHandler);
      }
    };

    _this.disable = function () {
      zr.off('mousedown', mousedownHandler);
      zr.off('mousemove', mousemoveHandler);
      zr.off('mouseup', mouseupHandler);
      zr.off('mousewheel', mousewheelHandler);
      zr.off('pinch', pinchHandler);
    };

    return _this;
  }

  RoamController.prototype.isDragging = function () {
    return this._dragging;
  };

  RoamController.prototype.isPinching = function () {
    return this._pinching;
  };

  RoamController.prototype.setPointerChecker = function (pointerChecker) {
    this.pointerChecker = pointerChecker;
  };

  RoamController.prototype.dispose = function () {
    this.disable();
  };

  RoamController.prototype._mousedownHandler = function (e) {
    if (eventTool.isMiddleOrRightButtonOnMouseUpDown(e) || e.target && e.target.draggable) {
      return;
    }

    var x = e.offsetX;
    var y = e.offsetY;

    if (this.pointerChecker && this.pointerChecker(e, x, y)) {
      this._x = x;
      this._y = y;
      this._dragging = true;
    }
  };

  RoamController.prototype._mousemoveHandler = function (e) {
    if (!this._dragging || !isAvailableBehavior('moveOnMouseMove', e, this._opt) || e.gestureEvent === 'pinch' || interactionMutex.isTaken(this._zr, 'globalPan')) {
      return;
    }

    var x = e.offsetX;
    var y = e.offsetY;
    var oldX = this._x;
    var oldY = this._y;
    var dx = x - oldX;
    var dy = y - oldY;
    this._x = x;
    this._y = y;
    this._opt.preventDefaultMouseMove && eventTool.stop(e.event);
    trigger(this, 'pan', 'moveOnMouseMove', e, {
      dx: dx,
      dy: dy,
      oldX: oldX,
      oldY: oldY,
      newX: x,
      newY: y,
      isAvailableBehavior: null
    });
  };

  RoamController.prototype._mouseupHandler = function (e) {
    if (!eventTool.isMiddleOrRightButtonOnMouseUpDown(e)) {
      this._dragging = false;
    }
  };

  RoamController.prototype._mousewheelHandler = function (e) {
    var shouldZoom = isAvailableBehavior('zoomOnMouseWheel', e, this._opt);
    var shouldMove = isAvailableBehavior('moveOnMouseWheel', e, this._opt);
    var wheelDelta = e.wheelDelta;
    var absWheelDeltaDelta = Math.abs(wheelDelta);
    var originX = e.offsetX;
    var originY = e.offsetY;

    if (wheelDelta === 0 || !shouldZoom && !shouldMove) {
      return;
    }

    if (shouldZoom) {
      var factor = absWheelDeltaDelta > 3 ? 1.4 : absWheelDeltaDelta > 1 ? 1.2 : 1.1;
      var scale = wheelDelta > 0 ? factor : 1 / factor;
      checkPointerAndTrigger(this, 'zoom', 'zoomOnMouseWheel', e, {
        scale: scale,
        originX: originX,
        originY: originY,
        isAvailableBehavior: null
      });
    }

    if (shouldMove) {
      var absDelta = Math.abs(wheelDelta);
      var scrollDelta = (wheelDelta > 0 ? 1 : -1) * (absDelta > 3 ? 0.4 : absDelta > 1 ? 0.15 : 0.05);
      checkPointerAndTrigger(this, 'scrollMove', 'moveOnMouseWheel', e, {
        scrollDelta: scrollDelta,
        originX: originX,
        originY: originY,
        isAvailableBehavior: null
      });
    }
  };

  RoamController.prototype._pinchHandler = function (e) {
    if (interactionMutex.isTaken(this._zr, 'globalPan')) {
      return;
    }

    var scale = e.pinchScale > 1 ? 1.1 : 1 / 1.1;
    checkPointerAndTrigger(this, 'zoom', null, e, {
      scale: scale,
      originX: e.pinchX,
      originY: e.pinchY,
      isAvailableBehavior: null
    });
  };

  return RoamController;
}(Eventful);

function checkPointerAndTrigger(controller, eventName, behaviorToCheck, e, contollerEvent) {
  if (controller.pointerChecker && controller.pointerChecker(e, contollerEvent.originX, contollerEvent.originY)) {
    eventTool.stop(e.event);
    trigger(controller, eventName, behaviorToCheck, e, contollerEvent);
  }
}

function trigger(controller, eventName, behaviorToCheck, e, contollerEvent) {
  contollerEvent.isAvailableBehavior = bind(isAvailableBehavior, null, behaviorToCheck, e);
  controller.trigger(eventName, contollerEvent);
}

function isAvailableBehavior(behaviorToCheck, e, settings) {
  var setting = settings[behaviorToCheck];
  return !behaviorToCheck || setting && (!isString(setting) || e.event[setting + 'Key']);
}

export default RoamController;