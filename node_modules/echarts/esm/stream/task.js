
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

import { assert, isArray } from 'zrender/esm/core/util';
;
export function createTask(define) {
  return new Task(define);
}

var Task = function () {
  function Task(define) {
    define = define || {};
    this._reset = define.reset;
    this._plan = define.plan;
    this._count = define.count;
    this._onDirty = define.onDirty;
    this._dirty = true;
  }

  Task.prototype.perform = function (performArgs) {
    var upTask = this._upstream;
    var skip = performArgs && performArgs.skip;

    if (this._dirty && upTask) {
      var context = this.context;
      context.data = context.outputData = upTask.context.outputData;
    }

    if (this.__pipeline) {
      this.__pipeline.currentTask = this;
    }

    var planResult;

    if (this._plan && !skip) {
      planResult = this._plan(this.context);
    }

    var lastModBy = normalizeModBy(this._modBy);
    var lastModDataCount = this._modDataCount || 0;
    var modBy = normalizeModBy(performArgs && performArgs.modBy);
    var modDataCount = performArgs && performArgs.modDataCount || 0;

    if (lastModBy !== modBy || lastModDataCount !== modDataCount) {
      planResult = 'reset';
    }

    function normalizeModBy(val) {
      !(val >= 1) && (val = 1);
      return val;
    }

    var forceFirstProgress;

    if (this._dirty || planResult === 'reset') {
      this._dirty = false;
      forceFirstProgress = this._doReset(skip);
    }

    this._modBy = modBy;
    this._modDataCount = modDataCount;
    var step = performArgs && performArgs.step;

    if (upTask) {
      if (process.env.NODE_ENV !== 'production') {
        assert(upTask._outputDueEnd != null);
      }

      this._dueEnd = upTask._outputDueEnd;
    } else {
      if (process.env.NODE_ENV !== 'production') {
        assert(!this._progress || this._count);
      }

      this._dueEnd = this._count ? this._count(this.context) : Infinity;
    }

    if (this._progress) {
      var start = this._dueIndex;
      var end = Math.min(step != null ? this._dueIndex + step : Infinity, this._dueEnd);

      if (!skip && (forceFirstProgress || start < end)) {
        var progress = this._progress;

        if (isArray(progress)) {
          for (var i = 0; i < progress.length; i++) {
            this._doProgress(progress[i], start, end, modBy, modDataCount);
          }
        } else {
          this._doProgress(progress, start, end, modBy, modDataCount);
        }
      }

      this._dueIndex = end;
      var outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : end;

      if (process.env.NODE_ENV !== 'production') {
        assert(outputDueEnd >= this._outputDueEnd);
      }

      this._outputDueEnd = outputDueEnd;
    } else {
      this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
    }

    return this.unfinished();
  };

  Task.prototype.dirty = function () {
    this._dirty = true;
    this._onDirty && this._onDirty(this.context);
  };

  Task.prototype._doProgress = function (progress, start, end, modBy, modDataCount) {
    iterator.reset(start, end, modBy, modDataCount);
    this._callingProgress = progress;

    this._callingProgress({
      start: start,
      end: end,
      count: end - start,
      next: iterator.next
    }, this.context);
  };

  Task.prototype._doReset = function (skip) {
    this._dueIndex = this._outputDueEnd = this._dueEnd = 0;
    this._settedOutputEnd = null;
    var progress;
    var forceFirstProgress;

    if (!skip && this._reset) {
      progress = this._reset(this.context);

      if (progress && progress.progress) {
        forceFirstProgress = progress.forceFirstProgress;
        progress = progress.progress;
      }

      if (isArray(progress) && !progress.length) {
        progress = null;
      }
    }

    this._progress = progress;
    this._modBy = this._modDataCount = null;
    var downstream = this._downstream;
    downstream && downstream.dirty();
    return forceFirstProgress;
  };

  Task.prototype.unfinished = function () {
    return this._progress && this._dueIndex < this._dueEnd;
  };

  Task.prototype.pipe = function (downTask) {
    if (process.env.NODE_ENV !== 'production') {
      assert(downTask && !downTask._disposed && downTask !== this);
    }

    if (this._downstream !== downTask || this._dirty) {
      this._downstream = downTask;
      downTask._upstream = this;
      downTask.dirty();
    }
  };

  Task.prototype.dispose = function () {
    if (this._disposed) {
      return;
    }

    this._upstream && (this._upstream._downstream = null);
    this._downstream && (this._downstream._upstream = null);
    this._dirty = false;
    this._disposed = true;
  };

  Task.prototype.getUpstream = function () {
    return this._upstream;
  };

  Task.prototype.getDownstream = function () {
    return this._downstream;
  };

  Task.prototype.setOutputEnd = function (end) {
    this._outputDueEnd = this._settedOutputEnd = end;
  };

  return Task;
}();

export { Task };

var iterator = function () {
  var end;
  var current;
  var modBy;
  var modDataCount;
  var winCount;
  var it = {
    reset: function (s, e, sStep, sCount) {
      current = s;
      end = e;
      modBy = sStep;
      modDataCount = sCount;
      winCount = Math.ceil(modDataCount / modBy);
      it.next = modBy > 1 && modDataCount > 0 ? modNext : sequentialNext;
    }
  };
  return it;

  function sequentialNext() {
    return current < end ? current++ : null;
  }

  function modNext() {
    var dataIndex = current % winCount * modBy + Math.ceil(current / winCount);
    var result = current >= end ? null : dataIndex < modDataCount ? dataIndex : current;
    current++;
    return result;
  }
}();