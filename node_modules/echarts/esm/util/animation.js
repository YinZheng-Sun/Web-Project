
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

var AnimationWrap = function () {
  function AnimationWrap() {
    this._storage = [];
    this._elExistsMap = {};
  }

  AnimationWrap.prototype.add = function (el, target, duration, delay, easing) {
    if (this._elExistsMap[el.id]) {
      return false;
    }

    this._elExistsMap[el.id] = true;

    this._storage.push({
      el: el,
      target: target,
      duration: duration,
      delay: delay,
      easing: easing
    });

    return true;
  };

  AnimationWrap.prototype.finished = function (callback) {
    this._finishedCallback = callback;
    return this;
  };

  AnimationWrap.prototype.start = function () {
    var _this = this;

    var count = this._storage.length;

    var checkTerminate = function () {
      count--;

      if (count <= 0) {
        _this._storage.length = 0;
        _this._elExistsMap = {};
        _this._finishedCallback && _this._finishedCallback();
      }
    };

    for (var i = 0, len = this._storage.length; i < len; i++) {
      var item = this._storage[i];
      item.el.animateTo(item.target, {
        duration: item.duration,
        delay: item.delay,
        easing: item.easing,
        setToFinal: true,
        done: checkTerminate,
        aborted: checkTerminate
      });
    }

    return this;
  };

  return AnimationWrap;
}();

export function createWrap() {
  return new AnimationWrap();
}