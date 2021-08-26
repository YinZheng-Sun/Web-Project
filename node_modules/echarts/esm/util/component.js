
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
import { makePrintable } from './log';
var base = Math.round(Math.random() * 10);
export function getUID(type) {
  return [type || '', base++].join('_');
}
export function enableSubTypeDefaulter(target) {
  var subTypeDefaulters = {};

  target.registerSubTypeDefaulter = function (componentType, defaulter) {
    var componentTypeInfo = parseClassType(componentType);
    subTypeDefaulters[componentTypeInfo.main] = defaulter;
  };

  target.determineSubType = function (componentType, option) {
    var type = option.type;

    if (!type) {
      var componentTypeMain = parseClassType(componentType).main;

      if (target.hasSubTypes(componentType) && subTypeDefaulters[componentTypeMain]) {
        type = subTypeDefaulters[componentTypeMain](option);
      }
    }

    return type;
  };
}
export function enableTopologicalTravel(entity, dependencyGetter) {
  entity.topologicalTravel = function (targetNameList, fullNameList, callback, context) {
    if (!targetNameList.length) {
      return;
    }

    var result = makeDepndencyGraph(fullNameList);
    var graph = result.graph;
    var noEntryList = result.noEntryList;
    var targetNameSet = {};
    zrUtil.each(targetNameList, function (name) {
      targetNameSet[name] = true;
    });

    while (noEntryList.length) {
      var currComponentType = noEntryList.pop();
      var currVertex = graph[currComponentType];
      var isInTargetNameSet = !!targetNameSet[currComponentType];

      if (isInTargetNameSet) {
        callback.call(context, currComponentType, currVertex.originalDeps.slice());
        delete targetNameSet[currComponentType];
      }

      zrUtil.each(currVertex.successor, isInTargetNameSet ? removeEdgeAndAdd : removeEdge);
    }

    zrUtil.each(targetNameSet, function () {
      var errMsg = '';

      if (process.env.NODE_ENV !== 'production') {
        errMsg = makePrintable('Circle dependency may exists: ', targetNameSet, targetNameList, fullNameList);
      }

      throw new Error(errMsg);
    });

    function removeEdge(succComponentType) {
      graph[succComponentType].entryCount--;

      if (graph[succComponentType].entryCount === 0) {
        noEntryList.push(succComponentType);
      }
    }

    function removeEdgeAndAdd(succComponentType) {
      targetNameSet[succComponentType] = true;
      removeEdge(succComponentType);
    }
  };

  function makeDepndencyGraph(fullNameList) {
    var graph = {};
    var noEntryList = [];
    zrUtil.each(fullNameList, function (name) {
      var thisItem = createDependencyGraphItem(graph, name);
      var originalDeps = thisItem.originalDeps = dependencyGetter(name);
      var availableDeps = getAvailableDependencies(originalDeps, fullNameList);
      thisItem.entryCount = availableDeps.length;

      if (thisItem.entryCount === 0) {
        noEntryList.push(name);
      }

      zrUtil.each(availableDeps, function (dependentName) {
        if (zrUtil.indexOf(thisItem.predecessor, dependentName) < 0) {
          thisItem.predecessor.push(dependentName);
        }

        var thatItem = createDependencyGraphItem(graph, dependentName);

        if (zrUtil.indexOf(thatItem.successor, dependentName) < 0) {
          thatItem.successor.push(name);
        }
      });
    });
    return {
      graph: graph,
      noEntryList: noEntryList
    };
  }

  function createDependencyGraphItem(graph, name) {
    if (!graph[name]) {
      graph[name] = {
        predecessor: [],
        successor: []
      };
    }

    return graph[name];
  }

  function getAvailableDependencies(originalDeps, fullNameList) {
    var availableDeps = [];
    zrUtil.each(originalDeps, function (dep) {
      zrUtil.indexOf(fullNameList, dep) >= 0 && availableDeps.push(dep);
    });
    return availableDeps;
  }
}
export function inheritDefaultOption(superOption, subOption) {
  return zrUtil.merge(zrUtil.merge({}, superOption, true), subOption, true);
}