
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

var ORIGIN_METHOD = '\0__throttleOriginMethod';
var RATE = '\0__throttleRate';
var THROTTLE_TYPE = '\0__throttleType';
;
export function throttle(fn, delay, debounce) {
  var currCall;
  var lastCall = 0;
  var lastExec = 0;
  var timer = null;
  var diff;
  var scope;
  var args;
  var debounceNextCall;
  delay = delay || 0;

  function exec() {
    lastExec = new Date().getTime();
    timer = null;
    fn.apply(scope, args || []);
  }

  var cb = function () {
    var cbArgs = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      cbArgs[_i] = arguments[_i];
    }

    currCall = new Date().getTime();
    scope = this;
    args = cbArgs;
    var thisDelay = debounceNextCall || delay;
    var thisDebounce = debounceNextCall || debounce;
    debounceNextCall = null;
    diff = currCall - (thisDebounce ? lastCall : lastExec) - thisDelay;
    clearTimeout(timer);

    if (thisDebounce) {
      timer = setTimeout(exec, thisDelay);
    } else {
      if (diff >= 0) {
        exec();
      } else {
        timer = setTimeout(exec, -diff);
      }
    }

    lastCall = currCall;
  };

  cb.clear = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  cb.debounceNextCall = function (debounceDelay) {
    debounceNextCall = debounceDelay;
  };

  return cb;
}
export function createOrUpdate(obj, fnAttr, rate, throttleType) {
  var fn = obj[fnAttr];

  if (!fn) {
    return;
  }

  var originFn = fn[ORIGIN_METHOD] || fn;
  var lastThrottleType = fn[THROTTLE_TYPE];
  var lastRate = fn[RATE];

  if (lastRate !== rate || lastThrottleType !== throttleType) {
    if (rate == null || !throttleType) {
      return obj[fnAttr] = originFn;
    }

    fn = obj[fnAttr] = throttle(originFn, rate, throttleType === 'debounce');
    fn[ORIGIN_METHOD] = originFn;
    fn[THROTTLE_TYPE] = throttleType;
    fn[RATE] = rate;
  }

  return fn;
}
export function clear(obj, fnAttr) {
  var fn = obj[fnAttr];

  if (fn && fn[ORIGIN_METHOD]) {
    obj[fnAttr] = fn[ORIGIN_METHOD];
  }
}