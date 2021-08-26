
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

import WeakMap from 'zrender/esm/core/WeakMap';
import LRU from 'zrender/esm/core/LRU';
import { defaults, createCanvas, map, isArray } from 'zrender/esm/core/util';
import { getLeastCommonMultiple } from './number';
import { createSymbol } from './symbol';
import { brushSingle } from 'zrender/esm/canvas/graphic';
var decalMap = new WeakMap();
var decalCache = new LRU(100);
var decalKeys = ['symbol', 'symbolSize', 'symbolKeepAspect', 'color', 'backgroundColor', 'dashArrayX', 'dashArrayY', 'dashLineOffset', 'maxTileWidth', 'maxTileHeight'];
export function createOrUpdatePatternFromDecal(decalObject, api) {
  if (decalObject === 'none') {
    return null;
  }

  var dpr = api.getDevicePixelRatio();
  var zr = api.getZr();
  var isSVG = zr.painter.type === 'svg';

  if (decalObject.dirty) {
    decalMap["delete"](decalObject);
  }

  var oldPattern = decalMap.get(decalObject);

  if (oldPattern) {
    return oldPattern;
  }

  var decalOpt = defaults(decalObject, {
    symbol: 'rect',
    symbolSize: 1,
    symbolKeepAspect: true,
    color: 'rgba(0, 0, 0, 0.2)',
    backgroundColor: null,
    dashArrayX: 5,
    dashArrayY: 5,
    dashLineOffset: 0,
    rotation: 0,
    maxTileWidth: 512,
    maxTileHeight: 512
  });

  if (decalOpt.backgroundColor === 'none') {
    decalOpt.backgroundColor = null;
  }

  var pattern = {
    repeat: 'repeat'
  };
  setPatternnSource(pattern);
  pattern.rotation = decalOpt.rotation;
  pattern.scaleX = pattern.scaleY = isSVG ? 1 : 1 / dpr;
  decalMap.set(decalObject, pattern);
  decalObject.dirty = false;
  return pattern;

  function setPatternnSource(pattern) {
    var keys = [dpr];
    var isValidKey = true;

    for (var i = 0; i < decalKeys.length; ++i) {
      var value = decalOpt[decalKeys[i]];
      var valueType = typeof value;

      if (value != null && !isArray(value) && valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') {
        isValidKey = false;
        break;
      }

      keys.push(value);
    }

    var cacheKey;

    if (isValidKey) {
      cacheKey = keys.join(',') + (isSVG ? '-svg' : '');
      var cache = decalCache.get(cacheKey);

      if (cache) {
        isSVG ? pattern.svgElement = cache : pattern.image = cache;
      }
    }

    var dashArrayX = normalizeDashArrayX(decalOpt.dashArrayX);
    var dashArrayY = normalizeDashArrayY(decalOpt.dashArrayY);
    var symbolArray = normalizeSymbolArray(decalOpt.symbol);
    var lineBlockLengthsX = getLineBlockLengthX(dashArrayX);
    var lineBlockLengthY = getLineBlockLengthY(dashArrayY);
    var canvas = !isSVG && createCanvas();
    var svgRoot = isSVG && zr.painter.createSVGElement('g');
    var pSize = getPatternSize();
    var ctx;

    if (canvas) {
      canvas.width = pSize.width * dpr;
      canvas.height = pSize.height * dpr;
      ctx = canvas.getContext('2d');
    }

    brushDecal();

    if (isValidKey) {
      decalCache.put(cacheKey, canvas || svgRoot);
    }

    pattern.image = canvas;
    pattern.svgElement = svgRoot;
    pattern.svgWidth = pSize.width;
    pattern.svgHeight = pSize.height;

    function getPatternSize() {
      var width = 1;

      for (var i = 0, xlen = lineBlockLengthsX.length; i < xlen; ++i) {
        width = getLeastCommonMultiple(width, lineBlockLengthsX[i]);
      }

      var symbolRepeats = 1;

      for (var i = 0, xlen = symbolArray.length; i < xlen; ++i) {
        symbolRepeats = getLeastCommonMultiple(symbolRepeats, symbolArray[i].length);
      }

      width *= symbolRepeats;
      var height = lineBlockLengthY * lineBlockLengthsX.length * symbolArray.length;

      if (process.env.NODE_ENV !== 'production') {
        var warn = function (attrName) {
          console.warn("Calculated decal size is greater than " + attrName + " due to decal option settings so " + attrName + " is used for the decal size. Please consider changing the decal option to make a smaller decal or set " + attrName + " to be larger to avoid incontinuity.");
        };

        if (width > decalOpt.maxTileWidth) {
          warn('maxTileWidth');
        }

        if (height > decalOpt.maxTileHeight) {
          warn('maxTileHeight');
        }
      }

      return {
        width: Math.max(1, Math.min(width, decalOpt.maxTileWidth)),
        height: Math.max(1, Math.min(height, decalOpt.maxTileHeight))
      };
    }

    function brushDecal() {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (decalOpt.backgroundColor) {
          ctx.fillStyle = decalOpt.backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }

      var ySum = 0;

      for (var i = 0; i < dashArrayY.length; ++i) {
        ySum += dashArrayY[i];
      }

      if (ySum <= 0) {
        return;
      }

      var y = -lineBlockLengthY;
      var yId = 0;
      var yIdTotal = 0;
      var xId0 = 0;

      while (y < pSize.height) {
        if (yId % 2 === 0) {
          var symbolYId = yIdTotal / 2 % symbolArray.length;
          var x = 0;
          var xId1 = 0;
          var xId1Total = 0;

          while (x < pSize.width * 2) {
            var xSum = 0;

            for (var i = 0; i < dashArrayX[xId0].length; ++i) {
              xSum += dashArrayX[xId0][i];
            }

            if (xSum <= 0) {
              break;
            }

            if (xId1 % 2 === 0) {
              var size = (1 - decalOpt.symbolSize) * 0.5;
              var left = x + dashArrayX[xId0][xId1] * size;
              var top_1 = y + dashArrayY[yId] * size;
              var width = dashArrayX[xId0][xId1] * decalOpt.symbolSize;
              var height = dashArrayY[yId] * decalOpt.symbolSize;
              var symbolXId = xId1Total / 2 % symbolArray[symbolYId].length;
              brushSymbol(left, top_1, width, height, symbolArray[symbolYId][symbolXId]);
            }

            x += dashArrayX[xId0][xId1];
            ++xId1Total;
            ++xId1;

            if (xId1 === dashArrayX[xId0].length) {
              xId1 = 0;
            }
          }

          ++xId0;

          if (xId0 === dashArrayX.length) {
            xId0 = 0;
          }
        }

        y += dashArrayY[yId];
        ++yIdTotal;
        ++yId;

        if (yId === dashArrayY.length) {
          yId = 0;
        }
      }

      function brushSymbol(x, y, width, height, symbolType) {
        var scale = isSVG ? 1 : dpr;
        var symbol = createSymbol(symbolType, x * scale, y * scale, width * scale, height * scale, decalOpt.color, decalOpt.symbolKeepAspect);

        if (isSVG) {
          svgRoot.appendChild(zr.painter.paintOne(symbol));
        } else {
          brushSingle(ctx, symbol);
        }
      }
    }
  }
}

function normalizeSymbolArray(symbol) {
  if (!symbol || symbol.length === 0) {
    return [['rect']];
  }

  if (typeof symbol === 'string') {
    return [[symbol]];
  }

  var isAllString = true;

  for (var i = 0; i < symbol.length; ++i) {
    if (typeof symbol[i] !== 'string') {
      isAllString = false;
      break;
    }
  }

  if (isAllString) {
    return normalizeSymbolArray([symbol]);
  }

  var result = [];

  for (var i = 0; i < symbol.length; ++i) {
    if (typeof symbol[i] === 'string') {
      result.push([symbol[i]]);
    } else {
      result.push(symbol[i]);
    }
  }

  return result;
}

function normalizeDashArrayX(dash) {
  if (!dash || dash.length === 0) {
    return [[0, 0]];
  }

  if (typeof dash === 'number') {
    var dashValue = Math.ceil(dash);
    return [[dashValue, dashValue]];
  }

  var isAllNumber = true;

  for (var i = 0; i < dash.length; ++i) {
    if (typeof dash[i] !== 'number') {
      isAllNumber = false;
      break;
    }
  }

  if (isAllNumber) {
    return normalizeDashArrayX([dash]);
  }

  var result = [];

  for (var i = 0; i < dash.length; ++i) {
    if (typeof dash[i] === 'number') {
      var dashValue = Math.ceil(dash[i]);
      result.push([dashValue, dashValue]);
    } else {
      var dashValue = map(dash[i], function (n) {
        return Math.ceil(n);
      });

      if (dashValue.length % 2 === 1) {
        result.push(dashValue.concat(dashValue));
      } else {
        result.push(dashValue);
      }
    }
  }

  return result;
}

function normalizeDashArrayY(dash) {
  if (!dash || typeof dash === 'object' && dash.length === 0) {
    return [0, 0];
  }

  if (typeof dash === 'number') {
    var dashValue_1 = Math.ceil(dash);
    return [dashValue_1, dashValue_1];
  }

  var dashValue = map(dash, function (n) {
    return Math.ceil(n);
  });
  return dash.length % 2 ? dashValue.concat(dashValue) : dashValue;
}

function getLineBlockLengthX(dash) {
  return map(dash, function (line) {
    return getLineBlockLengthY(line);
  });
}

function getLineBlockLengthY(dash) {
  var blockLength = 0;

  for (var i = 0; i < dash.length; ++i) {
    blockLength += dash[i];
  }

  if (dash.length % 2 === 1) {
    return blockLength * 2;
  }

  return blockLength;
}