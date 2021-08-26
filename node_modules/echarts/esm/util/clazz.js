
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

import { __spreadArrays } from "tslib";
import * as zrUtil from 'zrender/esm/core/util';
var TYPE_DELIMITER = '.';
var IS_CONTAINER = '___EC__COMPONENT__CONTAINER___';
var IS_EXTENDED_CLASS = '___EC__EXTENDED_CLASS___';
export function parseClassType(componentType) {
  var ret = {
    main: '',
    sub: ''
  };

  if (componentType) {
    var typeArr = componentType.split(TYPE_DELIMITER);
    ret.main = typeArr[0] || '';
    ret.sub = typeArr[1] || '';
  }

  return ret;
}

function checkClassType(componentType) {
  zrUtil.assert(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(componentType), 'componentType "' + componentType + '" illegal');
}

export function isExtendedClass(clz) {
  return !!(clz && clz[IS_EXTENDED_CLASS]);
}
export function enableClassExtend(rootClz, mandatoryMethods) {
  rootClz.$constructor = rootClz;

  rootClz.extend = function (proto) {
    if (process.env.NODE_ENV !== 'production') {
      zrUtil.each(mandatoryMethods, function (method) {
        if (!proto[method]) {
          console.warn('Method `' + method + '` should be implemented' + (proto.type ? ' in ' + proto.type : '') + '.');
        }
      });
    }

    var superClass = this;

    function ExtendedClass() {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      if (!proto.$constructor) {
        if (!isESClass(superClass)) {
          superClass.apply(this, arguments);
        } else {
          var ins = zrUtil.createObject(ExtendedClass.prototype, new (superClass.bind.apply(superClass, __spreadArrays([void 0], args)))());
          return ins;
        }
      } else {
        proto.$constructor.apply(this, arguments);
      }
    }

    ExtendedClass[IS_EXTENDED_CLASS] = true;
    zrUtil.extend(ExtendedClass.prototype, proto);
    ExtendedClass.extend = this.extend;
    ExtendedClass.superCall = superCall;
    ExtendedClass.superApply = superApply;
    zrUtil.inherits(ExtendedClass, this);
    ExtendedClass.superClass = superClass;
    return ExtendedClass;
  };
}

function isESClass(fn) {
  return typeof fn === 'function' && /^class\s/.test(Function.prototype.toString.call(fn));
}

export function mountExtend(SubClz, SupperClz) {
  SubClz.extend = SupperClz.extend;
}
var classBase = Math.round(Math.random() * 10);
export function enableClassCheck(target) {
  var classAttr = ['__\0is_clz', classBase++].join('_');
  target.prototype[classAttr] = true;

  if (process.env.NODE_ENV !== 'production') {
    zrUtil.assert(!target.isInstance, 'The method "is" can not be defined.');
  }

  target.isInstance = function (obj) {
    return !!(obj && obj[classAttr]);
  };
}

function superCall(context, methodName) {
  var args = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }

  return this.superClass.prototype[methodName].apply(context, args);
}

function superApply(context, methodName, args) {
  return this.superClass.prototype[methodName].apply(context, args);
}

export function enableClassManagement(target, options) {
  options = options || {};
  var storage = {};

  target.registerClass = function (clz) {
    var componentFullType = clz.type || clz.prototype.type;

    if (componentFullType) {
      checkClassType(componentFullType);
      clz.prototype.type = componentFullType;
      var componentTypeInfo = parseClassType(componentFullType);

      if (!componentTypeInfo.sub) {
        if (process.env.NODE_ENV !== 'production') {
          if (storage[componentTypeInfo.main]) {
            console.warn(componentTypeInfo.main + ' exists.');
          }
        }

        storage[componentTypeInfo.main] = clz;
      } else if (componentTypeInfo.sub !== IS_CONTAINER) {
        var container = makeContainer(componentTypeInfo);
        container[componentTypeInfo.sub] = clz;
      }
    }

    return clz;
  };

  target.getClass = function (mainType, subType, throwWhenNotFound) {
    var clz = storage[mainType];

    if (clz && clz[IS_CONTAINER]) {
      clz = subType ? clz[subType] : null;
    }

    if (throwWhenNotFound && !clz) {
      throw new Error(!subType ? mainType + '.' + 'type should be specified.' : 'Component ' + mainType + '.' + (subType || '') + ' not exists. Load it first.');
    }

    return clz;
  };

  target.getClassesByMainType = function (componentType) {
    var componentTypeInfo = parseClassType(componentType);
    var result = [];
    var obj = storage[componentTypeInfo.main];

    if (obj && obj[IS_CONTAINER]) {
      zrUtil.each(obj, function (o, type) {
        type !== IS_CONTAINER && result.push(o);
      });
    } else {
      result.push(obj);
    }

    return result;
  };

  target.hasClass = function (componentType) {
    var componentTypeInfo = parseClassType(componentType);
    return !!storage[componentTypeInfo.main];
  };

  target.getAllClassMainTypes = function () {
    var types = [];
    zrUtil.each(storage, function (obj, type) {
      types.push(type);
    });
    return types;
  };

  target.hasSubTypes = function (componentType) {
    var componentTypeInfo = parseClassType(componentType);
    var obj = storage[componentTypeInfo.main];
    return obj && obj[IS_CONTAINER];
  };

  function makeContainer(componentTypeInfo) {
    var container = storage[componentTypeInfo.main];

    if (!container || !container[IS_CONTAINER]) {
      container = storage[componentTypeInfo.main] = {};
      container[IS_CONTAINER] = true;
    }

    return container;
  }

  if (options.registerWhenExtend) {
    var originalExtend_1 = target.extend;

    if (originalExtend_1) {
      target.extend = function (proto) {
        var ExtendedClass = originalExtend_1.call(this, proto);
        return target.registerClass(ExtendedClass);
      };
    }
  }
}