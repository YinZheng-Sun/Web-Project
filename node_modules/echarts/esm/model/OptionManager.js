
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

import { normalizeToArray } from '../util/model';
import { each, clone, map, isTypedArray, setAsPrimitive, isArray, isObject } from 'zrender/esm/core/util';
import { error } from '../util/log';
var QUERY_REG = /^(min|max)?(.+)$/;

var OptionManager = function () {
  function OptionManager(api) {
    this._timelineOptions = [];
    this._mediaList = [];
    this._currentMediaIndices = [];
    this._api = api;
  }

  OptionManager.prototype.setOption = function (rawOption, optionPreprocessorFuncs, opt) {
    if (rawOption) {
      each(normalizeToArray(rawOption.series), function (series) {
        series && series.data && isTypedArray(series.data) && setAsPrimitive(series.data);
      });
      each(normalizeToArray(rawOption.dataset), function (dataset) {
        dataset && dataset.source && isTypedArray(dataset.source) && setAsPrimitive(dataset.source);
      });
    }

    rawOption = clone(rawOption);
    var optionBackup = this._optionBackup;
    var newParsedOption = parseRawOption(rawOption, optionPreprocessorFuncs, !optionBackup);
    this._newBaseOption = newParsedOption.baseOption;

    if (optionBackup) {
      if (newParsedOption.timelineOptions.length) {
        optionBackup.timelineOptions = newParsedOption.timelineOptions;
      }

      if (newParsedOption.mediaList.length) {
        optionBackup.mediaList = newParsedOption.mediaList;
      }

      if (newParsedOption.mediaDefault) {
        optionBackup.mediaDefault = newParsedOption.mediaDefault;
      }
    } else {
      this._optionBackup = newParsedOption;
    }
  };

  OptionManager.prototype.mountOption = function (isRecreate) {
    var optionBackup = this._optionBackup;
    this._timelineOptions = optionBackup.timelineOptions;
    this._mediaList = optionBackup.mediaList;
    this._mediaDefault = optionBackup.mediaDefault;
    this._currentMediaIndices = [];
    return clone(isRecreate ? optionBackup.baseOption : this._newBaseOption);
  };

  OptionManager.prototype.getTimelineOption = function (ecModel) {
    var option;
    var timelineOptions = this._timelineOptions;

    if (timelineOptions.length) {
      var timelineModel = ecModel.getComponent('timeline');

      if (timelineModel) {
        option = clone(timelineOptions[timelineModel.getCurrentIndex()]);
      }
    }

    return option;
  };

  OptionManager.prototype.getMediaOption = function (ecModel) {
    var ecWidth = this._api.getWidth();

    var ecHeight = this._api.getHeight();

    var mediaList = this._mediaList;
    var mediaDefault = this._mediaDefault;
    var indices = [];
    var result = [];

    if (!mediaList.length && !mediaDefault) {
      return result;
    }

    for (var i = 0, len = mediaList.length; i < len; i++) {
      if (applyMediaQuery(mediaList[i].query, ecWidth, ecHeight)) {
        indices.push(i);
      }
    }

    if (!indices.length && mediaDefault) {
      indices = [-1];
    }

    if (indices.length && !indicesEquals(indices, this._currentMediaIndices)) {
      result = map(indices, function (index) {
        return clone(index === -1 ? mediaDefault.option : mediaList[index].option);
      });
    }

    this._currentMediaIndices = indices;
    return result;
  };

  return OptionManager;
}();

function parseRawOption(rawOption, optionPreprocessorFuncs, isNew) {
  var mediaList = [];
  var mediaDefault;
  var baseOption;
  var declaredBaseOption = rawOption.baseOption;
  var timelineOnRoot = rawOption.timeline;
  var timelineOptionsOnRoot = rawOption.options;
  var mediaOnRoot = rawOption.media;
  var hasMedia = !!rawOption.media;
  var hasTimeline = !!(timelineOptionsOnRoot || timelineOnRoot || declaredBaseOption && declaredBaseOption.timeline);

  if (declaredBaseOption) {
    baseOption = declaredBaseOption;

    if (!baseOption.timeline) {
      baseOption.timeline = timelineOnRoot;
    }
  } else {
    if (hasTimeline || hasMedia) {
      rawOption.options = rawOption.media = null;
    }

    baseOption = rawOption;
  }

  if (hasMedia) {
    if (isArray(mediaOnRoot)) {
      each(mediaOnRoot, function (singleMedia) {
        if (process.env.NODE_ENV !== 'production') {
          if (singleMedia && !singleMedia.option && isObject(singleMedia.query) && isObject(singleMedia.query.option)) {
            error('Illegal media option. Must be like { media: [ { query: {}, option: {} } ] }');
          }
        }

        if (singleMedia && singleMedia.option) {
          if (singleMedia.query) {
            mediaList.push(singleMedia);
          } else if (!mediaDefault) {
            mediaDefault = singleMedia;
          }
        }
      });
    } else {
      if (process.env.NODE_ENV !== 'production') {
        error('Illegal media option. Must be an array. Like { media: [ {...}, {...} ] }');
      }
    }
  }

  doPreprocess(baseOption);
  each(timelineOptionsOnRoot, function (option) {
    return doPreprocess(option);
  });
  each(mediaList, function (media) {
    return doPreprocess(media.option);
  });

  function doPreprocess(option) {
    each(optionPreprocessorFuncs, function (preProcess) {
      preProcess(option, isNew);
    });
  }

  return {
    baseOption: baseOption,
    timelineOptions: timelineOptionsOnRoot || [],
    mediaDefault: mediaDefault,
    mediaList: mediaList
  };
}

function applyMediaQuery(query, ecWidth, ecHeight) {
  var realMap = {
    width: ecWidth,
    height: ecHeight,
    aspectratio: ecWidth / ecHeight
  };
  var applicatable = true;
  each(query, function (value, attr) {
    var matched = attr.match(QUERY_REG);

    if (!matched || !matched[1] || !matched[2]) {
      return;
    }

    var operator = matched[1];
    var realAttr = matched[2].toLowerCase();

    if (!compare(realMap[realAttr], value, operator)) {
      applicatable = false;
    }
  });
  return applicatable;
}

function compare(real, expect, operator) {
  if (operator === 'min') {
    return real >= expect;
  } else if (operator === 'max') {
    return real <= expect;
  } else {
    return real === expect;
  }
}

function indicesEquals(indices1, indices2) {
  return indices1.join(',') === indices2.join(',');
}

export default OptionManager;