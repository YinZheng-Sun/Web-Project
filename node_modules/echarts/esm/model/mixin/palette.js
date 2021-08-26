
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

import { makeInner, normalizeToArray } from '../../util/model';
var innerColor = makeInner();
var innerDecal = makeInner();

var PaletteMixin = function () {
  function PaletteMixin() {}

  PaletteMixin.prototype.getColorFromPalette = function (name, scope, requestNum) {
    var defaultPalette = normalizeToArray(this.get('color', true));
    var layeredPalette = this.get('colorLayer', true);
    return getFromPalette(this, innerColor, defaultPalette, layeredPalette, name, scope, requestNum);
  };

  PaletteMixin.prototype.clearColorPalette = function () {
    clearPalette(this, innerColor);
  };

  return PaletteMixin;
}();

export function getDecalFromPalette(ecModel, name, scope, requestNum) {
  var defaultDecals = normalizeToArray(ecModel.get(['aria', 'decal', 'decals']));
  return getFromPalette(ecModel, innerDecal, defaultDecals, null, name, scope, requestNum);
}

function getNearestPalette(palettes, requestColorNum) {
  var paletteNum = palettes.length;

  for (var i = 0; i < paletteNum; i++) {
    if (palettes[i].length > requestColorNum) {
      return palettes[i];
    }
  }

  return palettes[paletteNum - 1];
}

function getFromPalette(that, inner, defaultPalette, layeredPalette, name, scope, requestNum) {
  scope = scope || that;
  var scopeFields = inner(scope);
  var paletteIdx = scopeFields.paletteIdx || 0;
  var paletteNameMap = scopeFields.paletteNameMap = scopeFields.paletteNameMap || {};

  if (paletteNameMap.hasOwnProperty(name)) {
    return paletteNameMap[name];
  }

  var palette = requestNum == null || !layeredPalette ? defaultPalette : getNearestPalette(layeredPalette, requestNum);
  palette = palette || defaultPalette;

  if (!palette || !palette.length) {
    return;
  }

  var pickedPaletteItem = palette[paletteIdx];

  if (name) {
    paletteNameMap[name] = pickedPaletteItem;
  }

  scopeFields.paletteIdx = (paletteIdx + 1) % palette.length;
  return pickedPaletteItem;
}

function clearPalette(that, inner) {
  inner(that).paletteIdx = 0;
  inner(that).paletteNameMap = {};
}

export { PaletteMixin };