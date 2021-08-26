
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

import { getLayoutRect, box as layoutBox, positionElement } from '../../util/layout';
import * as formatUtil from '../../util/format';
import * as graphic from '../../util/graphic';
export function layout(group, componentModel, api) {
  var boxLayoutParams = componentModel.getBoxLayoutParams();
  var padding = componentModel.get('padding');
  var viewportSize = {
    width: api.getWidth(),
    height: api.getHeight()
  };
  var rect = getLayoutRect(boxLayoutParams, viewportSize, padding);
  layoutBox(componentModel.get('orient'), group, componentModel.get('itemGap'), rect.width, rect.height);
  positionElement(group, boxLayoutParams, viewportSize, padding);
}
export function makeBackground(rect, componentModel) {
  var padding = formatUtil.normalizeCssArray(componentModel.get('padding'));
  var style = componentModel.getItemStyle(['color', 'opacity']);
  style.fill = componentModel.get('backgroundColor');
  rect = new graphic.Rect({
    shape: {
      x: rect.x - padding[3],
      y: rect.y - padding[0],
      width: rect.width + padding[1] + padding[3],
      height: rect.height + padding[0] + padding[2],
      r: componentModel.get('borderRadius')
    },
    style: style,
    silent: true,
    z2: -1
  });
  return rect;
}