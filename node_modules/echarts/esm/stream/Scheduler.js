
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

import { each, map, isFunction, createHashMap, noop, assert } from 'zrender/esm/core/util';
import { createTask } from './task';
import { getUID } from '../util/component';
import GlobalModel from '../model/Global';
import ExtensionAPI from '../ExtensionAPI';
import { normalizeToArray } from '../util/model';
;

var Scheduler = function () {
  function Scheduler(ecInstance, api, dataProcessorHandlers, visualHandlers) {
    this._stageTaskMap = createHashMap();
    this.ecInstance = ecInstance;
    this.api = api;
    dataProcessorHandlers = this._dataProcessorHandlers = dataProcessorHandlers.slice();
    visualHandlers = this._visualHandlers = visualHandlers.slice();
    this._allHandlers = dataProcessorHandlers.concat(visualHandlers);
  }

  Scheduler.prototype.restoreData = function (ecModel, payload) {
    ecModel.restoreData(payload);

    this._stageTaskMap.each(function (taskRecord) {
      var overallTask = taskRecord.overallTask;
      overallTask && overallTask.dirty();
    });
  };

  Scheduler.prototype.getPerformArgs = function (task, isBlock) {
    if (!task.__pipeline) {
      return;
    }

    var pipeline = this._pipelineMap.get(task.__pipeline.id);

    var pCtx = pipeline.context;
    var incremental = !isBlock && pipeline.progressiveEnabled && (!pCtx || pCtx.progressiveRender) && task.__idxInPipeline > pipeline.blockIndex;
    var step = incremental ? pipeline.step : null;
    var modDataCount = pCtx && pCtx.modDataCount;
    var modBy = modDataCount != null ? Math.ceil(modDataCount / step) : null;
    return {
      step: step,
      modBy: modBy,
      modDataCount: modDataCount
    };
  };

  Scheduler.prototype.getPipeline = function (pipelineId) {
    return this._pipelineMap.get(pipelineId);
  };

  Scheduler.prototype.updateStreamModes = function (seriesModel, view) {
    var pipeline = this._pipelineMap.get(seriesModel.uid);

    var data = seriesModel.getData();
    var dataLen = data.count();
    var progressiveRender = pipeline.progressiveEnabled && view.incrementalPrepareRender && dataLen >= pipeline.threshold;
    var large = seriesModel.get('large') && dataLen >= seriesModel.get('largeThreshold');
    var modDataCount = seriesModel.get('progressiveChunkMode') === 'mod' ? dataLen : null;
    seriesModel.pipelineContext = pipeline.context = {
      progressiveRender: progressiveRender,
      modDataCount: modDataCount,
      large: large
    };
  };

  Scheduler.prototype.restorePipelines = function (ecModel) {
    var scheduler = this;
    var pipelineMap = scheduler._pipelineMap = createHashMap();
    ecModel.eachSeries(function (seriesModel) {
      var progressive = seriesModel.getProgressive();
      var pipelineId = seriesModel.uid;
      pipelineMap.set(pipelineId, {
        id: pipelineId,
        head: null,
        tail: null,
        threshold: seriesModel.getProgressiveThreshold(),
        progressiveEnabled: progressive && !(seriesModel.preventIncremental && seriesModel.preventIncremental()),
        blockIndex: -1,
        step: Math.round(progressive || 700),
        count: 0
      });

      scheduler._pipe(seriesModel, seriesModel.dataTask);
    });
  };

  Scheduler.prototype.prepareStageTasks = function () {
    var stageTaskMap = this._stageTaskMap;
    var ecModel = this.api.getModel();
    var api = this.api;
    each(this._allHandlers, function (handler) {
      var record = stageTaskMap.get(handler.uid) || stageTaskMap.set(handler.uid, {});
      var errMsg = '';

      if (process.env.NODE_ENV !== 'production') {
        errMsg = '"reset" and "overallReset" must not be both specified.';
      }

      assert(!(handler.reset && handler.overallReset), errMsg);
      handler.reset && this._createSeriesStageTask(handler, record, ecModel, api);
      handler.overallReset && this._createOverallStageTask(handler, record, ecModel, api);
    }, this);
  };

  Scheduler.prototype.prepareView = function (view, model, ecModel, api) {
    var renderTask = view.renderTask;
    var context = renderTask.context;
    context.model = model;
    context.ecModel = ecModel;
    context.api = api;
    renderTask.__block = !view.incrementalPrepareRender;

    this._pipe(model, renderTask);
  };

  Scheduler.prototype.performDataProcessorTasks = function (ecModel, payload) {
    this._performStageTasks(this._dataProcessorHandlers, ecModel, payload, {
      block: true
    });
  };

  Scheduler.prototype.performVisualTasks = function (ecModel, payload, opt) {
    this._performStageTasks(this._visualHandlers, ecModel, payload, opt);
  };

  Scheduler.prototype._performStageTasks = function (stageHandlers, ecModel, payload, opt) {
    opt = opt || {};
    var unfinished = false;
    var scheduler = this;
    each(stageHandlers, function (stageHandler, idx) {
      if (opt.visualType && opt.visualType !== stageHandler.visualType) {
        return;
      }

      var stageHandlerRecord = scheduler._stageTaskMap.get(stageHandler.uid);

      var seriesTaskMap = stageHandlerRecord.seriesTaskMap;
      var overallTask = stageHandlerRecord.overallTask;

      if (overallTask) {
        var overallNeedDirty_1;
        var agentStubMap = overallTask.agentStubMap;
        agentStubMap.each(function (stub) {
          if (needSetDirty(opt, stub)) {
            stub.dirty();
            overallNeedDirty_1 = true;
          }
        });
        overallNeedDirty_1 && overallTask.dirty();
        scheduler.updatePayload(overallTask, payload);
        var performArgs_1 = scheduler.getPerformArgs(overallTask, opt.block);
        agentStubMap.each(function (stub) {
          stub.perform(performArgs_1);
        });

        if (overallTask.perform(performArgs_1)) {
          unfinished = true;
        }
      } else if (seriesTaskMap) {
        seriesTaskMap.each(function (task, pipelineId) {
          if (needSetDirty(opt, task)) {
            task.dirty();
          }

          var performArgs = scheduler.getPerformArgs(task, opt.block);
          performArgs.skip = !stageHandler.performRawSeries && ecModel.isSeriesFiltered(task.context.model);
          scheduler.updatePayload(task, payload);

          if (task.perform(performArgs)) {
            unfinished = true;
          }
        });
      }
    });

    function needSetDirty(opt, task) {
      return opt.setDirty && (!opt.dirtyMap || opt.dirtyMap.get(task.__pipeline.id));
    }

    this.unfinished = unfinished || this.unfinished;
  };

  Scheduler.prototype.performSeriesTasks = function (ecModel) {
    var unfinished;
    ecModel.eachSeries(function (seriesModel) {
      unfinished = seriesModel.dataTask.perform() || unfinished;
    });
    this.unfinished = unfinished || this.unfinished;
  };

  Scheduler.prototype.plan = function () {
    this._pipelineMap.each(function (pipeline) {
      var task = pipeline.tail;

      do {
        if (task.__block) {
          pipeline.blockIndex = task.__idxInPipeline;
          break;
        }

        task = task.getUpstream();
      } while (task);
    });
  };

  Scheduler.prototype.updatePayload = function (task, payload) {
    payload !== 'remain' && (task.context.payload = payload);
  };

  Scheduler.prototype._createSeriesStageTask = function (stageHandler, stageHandlerRecord, ecModel, api) {
    var scheduler = this;
    var oldSeriesTaskMap = stageHandlerRecord.seriesTaskMap;
    var newSeriesTaskMap = stageHandlerRecord.seriesTaskMap = createHashMap();
    var seriesType = stageHandler.seriesType;
    var getTargetSeries = stageHandler.getTargetSeries;

    if (stageHandler.createOnAllSeries) {
      ecModel.eachRawSeries(create);
    } else if (seriesType) {
      ecModel.eachRawSeriesByType(seriesType, create);
    } else if (getTargetSeries) {
      getTargetSeries(ecModel, api).each(create);
    }

    function create(seriesModel) {
      var pipelineId = seriesModel.uid;
      var task = newSeriesTaskMap.set(pipelineId, oldSeriesTaskMap && oldSeriesTaskMap.get(pipelineId) || createTask({
        plan: seriesTaskPlan,
        reset: seriesTaskReset,
        count: seriesTaskCount
      }));
      task.context = {
        model: seriesModel,
        ecModel: ecModel,
        api: api,
        useClearVisual: stageHandler.isVisual && !stageHandler.isLayout,
        plan: stageHandler.plan,
        reset: stageHandler.reset,
        scheduler: scheduler
      };

      scheduler._pipe(seriesModel, task);
    }
  };

  Scheduler.prototype._createOverallStageTask = function (stageHandler, stageHandlerRecord, ecModel, api) {
    var scheduler = this;
    var overallTask = stageHandlerRecord.overallTask = stageHandlerRecord.overallTask || createTask({
      reset: overallTaskReset
    });
    overallTask.context = {
      ecModel: ecModel,
      api: api,
      overallReset: stageHandler.overallReset,
      scheduler: scheduler
    };
    var oldAgentStubMap = overallTask.agentStubMap;
    var newAgentStubMap = overallTask.agentStubMap = createHashMap();
    var seriesType = stageHandler.seriesType;
    var getTargetSeries = stageHandler.getTargetSeries;
    var overallProgress = true;
    var shouldOverallTaskDirty = false;
    var errMsg = '';

    if (process.env.NODE_ENV !== 'production') {
      errMsg = '"createOnAllSeries" do not supported for "overallReset", ' + 'becuase it will block all streams.';
    }

    assert(!stageHandler.createOnAllSeries, errMsg);

    if (seriesType) {
      ecModel.eachRawSeriesByType(seriesType, createStub);
    } else if (getTargetSeries) {
      getTargetSeries(ecModel, api).each(createStub);
    } else {
      overallProgress = false;
      each(ecModel.getSeries(), createStub);
    }

    function createStub(seriesModel) {
      var pipelineId = seriesModel.uid;
      var stub = newAgentStubMap.set(pipelineId, oldAgentStubMap && oldAgentStubMap.get(pipelineId) || (shouldOverallTaskDirty = true, createTask({
        reset: stubReset,
        onDirty: stubOnDirty
      })));
      stub.context = {
        model: seriesModel,
        overallProgress: overallProgress
      };
      stub.agent = overallTask;
      stub.__block = overallProgress;

      scheduler._pipe(seriesModel, stub);
    }

    if (shouldOverallTaskDirty) {
      overallTask.dirty();
    }
  };

  Scheduler.prototype._pipe = function (seriesModel, task) {
    var pipelineId = seriesModel.uid;

    var pipeline = this._pipelineMap.get(pipelineId);

    !pipeline.head && (pipeline.head = task);
    pipeline.tail && pipeline.tail.pipe(task);
    pipeline.tail = task;
    task.__idxInPipeline = pipeline.count++;
    task.__pipeline = pipeline;
  };

  Scheduler.wrapStageHandler = function (stageHandler, visualType) {
    if (isFunction(stageHandler)) {
      stageHandler = {
        overallReset: stageHandler,
        seriesType: detectSeriseType(stageHandler)
      };
    }

    stageHandler.uid = getUID('stageHandler');
    visualType && (stageHandler.visualType = visualType);
    return stageHandler;
  };

  ;
  return Scheduler;
}();

function overallTaskReset(context) {
  context.overallReset(context.ecModel, context.api, context.payload);
}

function stubReset(context) {
  return context.overallProgress && stubProgress;
}

function stubProgress() {
  this.agent.dirty();
  this.getDownstream().dirty();
}

function stubOnDirty() {
  this.agent && this.agent.dirty();
}

function seriesTaskPlan(context) {
  return context.plan ? context.plan(context.model, context.ecModel, context.api, context.payload) : null;
}

function seriesTaskReset(context) {
  if (context.useClearVisual) {
    context.data.clearAllVisual();
  }

  var resetDefines = context.resetDefines = normalizeToArray(context.reset(context.model, context.ecModel, context.api, context.payload));
  return resetDefines.length > 1 ? map(resetDefines, function (v, idx) {
    return makeSeriesTaskProgress(idx);
  }) : singleSeriesTaskProgress;
}

var singleSeriesTaskProgress = makeSeriesTaskProgress(0);

function makeSeriesTaskProgress(resetDefineIdx) {
  return function (params, context) {
    var data = context.data;
    var resetDefine = context.resetDefines[resetDefineIdx];

    if (resetDefine && resetDefine.dataEach) {
      for (var i = params.start; i < params.end; i++) {
        resetDefine.dataEach(data, i);
      }
    } else if (resetDefine && resetDefine.progress) {
      resetDefine.progress(params, data);
    }
  };
}

function seriesTaskCount(context) {
  return context.data.count();
}

function detectSeriseType(legacyFunc) {
  seriesType = null;

  try {
    legacyFunc(ecModelMock, apiMock);
  } catch (e) {}

  return seriesType;
}

var ecModelMock = {};
var apiMock = {};
var seriesType;
mockMethods(ecModelMock, GlobalModel);
mockMethods(apiMock, ExtensionAPI);

ecModelMock.eachSeriesByType = ecModelMock.eachRawSeriesByType = function (type) {
  seriesType = type;
};

ecModelMock.eachComponent = function (cond) {
  if (cond.mainType === 'series' && cond.subType) {
    seriesType = cond.subType;
  }
};

function mockMethods(target, Clz) {
  for (var name_1 in Clz.prototype) {
    target[name_1] = noop;
  }
}

export default Scheduler;