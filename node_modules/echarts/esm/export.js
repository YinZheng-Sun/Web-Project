
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

import * as zrender from 'zrender/esm/zrender';
import * as matrix from 'zrender/esm/core/matrix';
import * as vector from 'zrender/esm/core/vector';
import * as zrUtil from 'zrender/esm/core/util';
import * as colorTool from 'zrender/esm/tool/color';
import * as graphicUtil from './util/graphic';
import * as numberUtil from './util/number';
import * as formatUtil from './util/format';
import * as timeUtil from './util/time';
import { throttle } from './util/throttle';
import * as ecHelper from './helper';
import parseGeoJSON from './coord/geo/parseGeoJson';
export { brushSingle as innerDrawElementOnCanvas } from 'zrender/esm/canvas/graphic';
export { zrender };
export { default as List } from './data/List';
export { default as Model } from './model/Model';
export { default as Axis } from './coord/Axis';
export { throttle };
export { ecHelper as helper };
export { matrix };
export { vector };
export { colorTool as color };
export { default as env } from 'zrender/esm/core/env';
export { parseGeoJSON };
export var parseGeoJson = parseGeoJSON;
export var number = {};
zrUtil.each(['linearMap', 'round', 'asc', 'getPrecision', 'getPrecisionSafe', 'getPixelPrecision', 'getPercentWithPrecision', 'MAX_SAFE_INTEGER', 'remRadian', 'isRadianAroundZero', 'parseDate', 'quantity', 'quantityExponent', 'nice', 'quantile', 'reformIntervals', 'isNumeric', 'numericToNumber'], function (name) {
  number[name] = numberUtil[name];
});
export var format = {};
zrUtil.each(['addCommas', 'toCamelCase', 'normalizeCssArray', 'encodeHTML', 'formatTpl', 'getTooltipMarker', 'formatTime', 'capitalFirst', 'truncateText', 'getTextRect'], function (name) {
  format[name] = formatUtil[name];
});
export var time = {
  parse: numberUtil.parseDate,
  format: timeUtil.format
};
var ecUtil = {};
zrUtil.each(['map', 'each', 'filter', 'indexOf', 'inherits', 'reduce', 'filter', 'bind', 'curry', 'isArray', 'isString', 'isObject', 'isFunction', 'extend', 'defaults', 'clone', 'merge'], function (name) {
  ecUtil[name] = zrUtil[name];
});
export { ecUtil as util };
var GRAPHIC_KEYS = ['extendShape', 'extendPath', 'makePath', 'makeImage', 'mergePath', 'resizePath', 'createIcon', 'updateProps', 'initProps', 'getTransform', 'clipPointsByRect', 'clipRectByRect', 'registerShape', 'getShapeClass', 'Group', 'Image', 'Text', 'Circle', 'Ellipse', 'Sector', 'Ring', 'Polygon', 'Polyline', 'Rect', 'Line', 'BezierCurve', 'Arc', 'IncrementalDisplayable', 'CompoundPath', 'LinearGradient', 'RadialGradient', 'BoundingRect'];
export var graphic = {};
zrUtil.each(GRAPHIC_KEYS, function (name) {
  graphic[name] = graphicUtil[name];
});