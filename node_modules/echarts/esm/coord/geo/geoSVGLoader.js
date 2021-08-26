
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

import { parseSVG, makeViewBoxTransform } from 'zrender/esm/tool/parseSVG';
import Group from 'zrender/esm/graphic/Group';
import Rect from 'zrender/esm/graphic/shape/Rect';
import { assert, createHashMap } from 'zrender/esm/core/util';
import BoundingRect from 'zrender/esm/core/BoundingRect';
import { makeInner } from '../../util/model';
var inner = makeInner();
export default {
  load: function (mapName, mapRecord) {
    var originRoot = inner(mapRecord).originRoot;

    if (originRoot) {
      return {
        root: originRoot,
        boundingRect: inner(mapRecord).boundingRect
      };
    }

    var graphic = buildGraphic(mapRecord);
    inner(mapRecord).originRoot = graphic.root;
    inner(mapRecord).boundingRect = graphic.boundingRect;
    return graphic;
  },
  makeGraphic: function (mapName, mapRecord, hostKey) {
    var field = inner(mapRecord);
    var rootMap = field.rootMap || (field.rootMap = createHashMap());
    var root = rootMap.get(hostKey);

    if (root) {
      return root;
    }

    var originRoot = field.originRoot;
    var boundingRect = field.boundingRect;

    if (!field.originRootHostKey) {
      field.originRootHostKey = hostKey;
      root = originRoot;
    } else {
      root = buildGraphic(mapRecord, boundingRect).root;
    }

    return rootMap.set(hostKey, root);
  },
  removeGraphic: function (mapName, mapRecord, hostKey) {
    var field = inner(mapRecord);
    var rootMap = field.rootMap;
    rootMap && rootMap.removeKey(hostKey);

    if (hostKey === field.originRootHostKey) {
      field.originRootHostKey = null;
    }
  }
};

function buildGraphic(mapRecord, boundingRect) {
  var svgXML = mapRecord.svgXML;
  var result;
  var root;

  try {
    result = svgXML && parseSVG(svgXML, {
      ignoreViewBox: true,
      ignoreRootClip: true
    }) || {};
    root = result.root;
    assert(root != null);
  } catch (e) {
    throw new Error('Invalid svg format\n' + e.message);
  }

  var svgWidth = result.width;
  var svgHeight = result.height;
  var viewBoxRect = result.viewBoxRect;

  if (!boundingRect) {
    boundingRect = svgWidth == null || svgHeight == null ? root.getBoundingRect() : new BoundingRect(0, 0, 0, 0);

    if (svgWidth != null) {
      boundingRect.width = svgWidth;
    }

    if (svgHeight != null) {
      boundingRect.height = svgHeight;
    }
  }

  if (viewBoxRect) {
    var viewBoxTransform = makeViewBoxTransform(viewBoxRect, boundingRect.width, boundingRect.height);
    var elRoot = root;
    root = new Group();
    root.add(elRoot);
    elRoot.scaleX = elRoot.scaleY = viewBoxTransform.scale;
    elRoot.x = viewBoxTransform.x;
    elRoot.y = viewBoxTransform.y;
  }

  root.setClipPath(new Rect({
    shape: boundingRect.plain()
  }));
  return {
    root: root,
    boundingRect: boundingRect
  };
}