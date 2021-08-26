
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
import * as graphic from '../util/graphic';
import * as textContain from 'zrender/esm/contain/text';
var PI = Math.PI;
export default function defaultLoading(api, opts) {
  opts = opts || {};
  zrUtil.defaults(opts, {
    text: 'loading',
    textColor: '#000',
    fontSize: '12px',
    maskColor: 'rgba(255, 255, 255, 0.8)',
    showSpinner: true,
    color: '#5470c6',
    spinnerRadius: 10,
    lineWidth: 5,
    zlevel: 0
  });
  var group = new graphic.Group();
  var mask = new graphic.Rect({
    style: {
      fill: opts.maskColor
    },
    zlevel: opts.zlevel,
    z: 10000
  });
  group.add(mask);
  var font = opts.fontSize + ' sans-serif';
  var labelRect = new graphic.Rect({
    style: {
      fill: 'none'
    },
    textContent: new graphic.Text({
      style: {
        text: opts.text,
        fill: opts.textColor,
        font: font
      }
    }),
    textConfig: {
      position: 'right',
      distance: 10
    },
    zlevel: opts.zlevel,
    z: 10001
  });
  group.add(labelRect);
  var arc;

  if (opts.showSpinner) {
    arc = new graphic.Arc({
      shape: {
        startAngle: -PI / 2,
        endAngle: -PI / 2 + 0.1,
        r: opts.spinnerRadius
      },
      style: {
        stroke: opts.color,
        lineCap: 'round',
        lineWidth: opts.lineWidth
      },
      zlevel: opts.zlevel,
      z: 10001
    });
    arc.animateShape(true).when(1000, {
      endAngle: PI * 3 / 2
    }).start('circularInOut');
    arc.animateShape(true).when(1000, {
      startAngle: PI * 3 / 2
    }).delay(300).start('circularInOut');
    group.add(arc);
  }

  group.resize = function () {
    var textWidth = textContain.getWidth(opts.text, font);
    var r = opts.showSpinner ? opts.spinnerRadius : 0;
    var cx = (api.getWidth() - r * 2 - (opts.showSpinner && textWidth ? 10 : 0) - textWidth) / 2 - (opts.showSpinner ? 0 : textWidth / 2);
    var cy = api.getHeight() / 2;
    opts.showSpinner && arc.setShape({
      cx: cx,
      cy: cy
    });
    labelRect.setShape({
      x: cx - r,
      y: cy - r,
      width: r * 2,
      height: r * 2
    });
    mask.setShape({
      x: 0,
      y: 0,
      width: api.getWidth(),
      height: api.getHeight()
    });
  };

  group.resize();
  return group;
}