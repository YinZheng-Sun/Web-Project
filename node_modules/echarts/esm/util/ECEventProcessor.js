
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
import { parseClassType } from './clazz';

var ECEventProcessor = function () {
  function ECEventProcessor() {}

  ECEventProcessor.prototype.normalizeQuery = function (query) {
    var cptQuery = {};
    var dataQuery = {};
    var otherQuery = {};

    if (zrUtil.isString(query)) {
      var condCptType = parseClassType(query);
      cptQuery.mainType = condCptType.main || null;
      cptQuery.subType = condCptType.sub || null;
    } else {
      var suffixes_1 = ['Index', 'Name', 'Id'];
      var dataKeys_1 = {
        name: 1,
        dataIndex: 1,
        dataType: 1
      };
      zrUtil.each(query, function (val, key) {
        var reserved = false;

        for (var i = 0; i < suffixes_1.length; i++) {
          var propSuffix = suffixes_1[i];
          var suffixPos = key.lastIndexOf(propSuffix);

          if (suffixPos > 0 && suffixPos === key.length - propSuffix.length) {
            var mainType = key.slice(0, suffixPos);

            if (mainType !== 'data') {
              cptQuery.mainType = mainType;
              cptQuery[propSuffix.toLowerCase()] = val;
              reserved = true;
            }
          }
        }

        if (dataKeys_1.hasOwnProperty(key)) {
          dataQuery[key] = val;
          reserved = true;
        }

        if (!reserved) {
          otherQuery[key] = val;
        }
      });
    }

    return {
      cptQuery: cptQuery,
      dataQuery: dataQuery,
      otherQuery: otherQuery
    };
  };

  ECEventProcessor.prototype.filter = function (eventType, query) {
    var eventInfo = this.eventInfo;

    if (!eventInfo) {
      return true;
    }

    var targetEl = eventInfo.targetEl;
    var packedEvent = eventInfo.packedEvent;
    var model = eventInfo.model;
    var view = eventInfo.view;

    if (!model || !view) {
      return true;
    }

    var cptQuery = query.cptQuery;
    var dataQuery = query.dataQuery;
    return check(cptQuery, model, 'mainType') && check(cptQuery, model, 'subType') && check(cptQuery, model, 'index', 'componentIndex') && check(cptQuery, model, 'name') && check(cptQuery, model, 'id') && check(dataQuery, packedEvent, 'name') && check(dataQuery, packedEvent, 'dataIndex') && check(dataQuery, packedEvent, 'dataType') && (!view.filterForExposedEvent || view.filterForExposedEvent(eventType, query.otherQuery, targetEl, packedEvent));

    function check(query, host, prop, propOnHost) {
      return query[prop] == null || host[propOnHost || prop] === query[prop];
    }
  };

  ECEventProcessor.prototype.afterTrigger = function () {
    this.eventInfo = null;
  };

  return ECEventProcessor;
}();

export { ECEventProcessor };
;