
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
import * as modelUtil from '../../util/model';
import { deprecateLog, deprecateReplaceLog } from '../../util/log';
var each = zrUtil.each;
var isObject = zrUtil.isObject;
var POSSIBLE_STYLES = ['areaStyle', 'lineStyle', 'nodeStyle', 'linkStyle', 'chordStyle', 'label', 'labelLine'];

function compatEC2ItemStyle(opt) {
  var itemStyleOpt = opt && opt.itemStyle;

  if (!itemStyleOpt) {
    return;
  }

  for (var i = 0, len = POSSIBLE_STYLES.length; i < len; i++) {
    var styleName = POSSIBLE_STYLES[i];
    var normalItemStyleOpt = itemStyleOpt.normal;
    var emphasisItemStyleOpt = itemStyleOpt.emphasis;

    if (normalItemStyleOpt && normalItemStyleOpt[styleName]) {
      if (process.env.NODE_ENV !== 'production') {
        deprecateReplaceLog("itemStyle.normal." + styleName, styleName);
      }

      opt[styleName] = opt[styleName] || {};

      if (!opt[styleName].normal) {
        opt[styleName].normal = normalItemStyleOpt[styleName];
      } else {
        zrUtil.merge(opt[styleName].normal, normalItemStyleOpt[styleName]);
      }

      normalItemStyleOpt[styleName] = null;
    }

    if (emphasisItemStyleOpt && emphasisItemStyleOpt[styleName]) {
      if (process.env.NODE_ENV !== 'production') {
        deprecateReplaceLog("itemStyle.emphasis." + styleName, "emphasis." + styleName);
      }

      opt[styleName] = opt[styleName] || {};

      if (!opt[styleName].emphasis) {
        opt[styleName].emphasis = emphasisItemStyleOpt[styleName];
      } else {
        zrUtil.merge(opt[styleName].emphasis, emphasisItemStyleOpt[styleName]);
      }

      emphasisItemStyleOpt[styleName] = null;
    }
  }
}

function convertNormalEmphasis(opt, optType, useExtend) {
  if (opt && opt[optType] && (opt[optType].normal || opt[optType].emphasis)) {
    var normalOpt = opt[optType].normal;
    var emphasisOpt = opt[optType].emphasis;

    if (normalOpt) {
      if (process.env.NODE_ENV !== 'production') {
        deprecateLog("'normal' hierarchy in " + optType + " has been removed since 4.0. All style properties are configured in " + optType + " directly now.");
      }

      if (useExtend) {
        opt[optType].normal = opt[optType].emphasis = null;
        zrUtil.defaults(opt[optType], normalOpt);
      } else {
        opt[optType] = normalOpt;
      }
    }

    if (emphasisOpt) {
      if (process.env.NODE_ENV !== 'production') {
        deprecateLog(optType + ".emphasis has been changed to emphasis." + optType + " since 4.0");
      }

      opt.emphasis = opt.emphasis || {};
      opt.emphasis[optType] = emphasisOpt;

      if (emphasisOpt.focus) {
        opt.emphasis.focus = emphasisOpt.focus;
      }

      if (emphasisOpt.blurScope) {
        opt.emphasis.blurScope = emphasisOpt.blurScope;
      }
    }
  }
}

function removeEC3NormalStatus(opt) {
  convertNormalEmphasis(opt, 'itemStyle');
  convertNormalEmphasis(opt, 'lineStyle');
  convertNormalEmphasis(opt, 'areaStyle');
  convertNormalEmphasis(opt, 'label');
  convertNormalEmphasis(opt, 'labelLine');
  convertNormalEmphasis(opt, 'upperLabel');
  convertNormalEmphasis(opt, 'edgeLabel');
}

function compatTextStyle(opt, propName) {
  var labelOptSingle = isObject(opt) && opt[propName];
  var textStyle = isObject(labelOptSingle) && labelOptSingle.textStyle;

  if (textStyle) {
    if (process.env.NODE_ENV !== 'production') {
      deprecateLog("textStyle hierarchy in " + propName + " has been removed since 4.0. All textStyle properties are configured in " + propName + " directly now.");
    }

    for (var i = 0, len = modelUtil.TEXT_STYLE_OPTIONS.length; i < len; i++) {
      var textPropName = modelUtil.TEXT_STYLE_OPTIONS[i];

      if (textStyle.hasOwnProperty(textPropName)) {
        labelOptSingle[textPropName] = textStyle[textPropName];
      }
    }
  }
}

function compatEC3CommonStyles(opt) {
  if (opt) {
    removeEC3NormalStatus(opt);
    compatTextStyle(opt, 'label');
    opt.emphasis && compatTextStyle(opt.emphasis, 'label');
  }
}

function processSeries(seriesOpt) {
  if (!isObject(seriesOpt)) {
    return;
  }

  compatEC2ItemStyle(seriesOpt);
  removeEC3NormalStatus(seriesOpt);
  compatTextStyle(seriesOpt, 'label');
  compatTextStyle(seriesOpt, 'upperLabel');
  compatTextStyle(seriesOpt, 'edgeLabel');

  if (seriesOpt.emphasis) {
    compatTextStyle(seriesOpt.emphasis, 'label');
    compatTextStyle(seriesOpt.emphasis, 'upperLabel');
    compatTextStyle(seriesOpt.emphasis, 'edgeLabel');
  }

  var markPoint = seriesOpt.markPoint;

  if (markPoint) {
    compatEC2ItemStyle(markPoint);
    compatEC3CommonStyles(markPoint);
  }

  var markLine = seriesOpt.markLine;

  if (markLine) {
    compatEC2ItemStyle(markLine);
    compatEC3CommonStyles(markLine);
  }

  var markArea = seriesOpt.markArea;

  if (markArea) {
    compatEC3CommonStyles(markArea);
  }

  var data = seriesOpt.data;

  if (seriesOpt.type === 'graph') {
    data = data || seriesOpt.nodes;
    var edgeData = seriesOpt.links || seriesOpt.edges;

    if (edgeData && !zrUtil.isTypedArray(edgeData)) {
      for (var i = 0; i < edgeData.length; i++) {
        compatEC3CommonStyles(edgeData[i]);
      }
    }

    zrUtil.each(seriesOpt.categories, function (opt) {
      removeEC3NormalStatus(opt);
    });
  }

  if (data && !zrUtil.isTypedArray(data)) {
    for (var i = 0; i < data.length; i++) {
      compatEC3CommonStyles(data[i]);
    }
  }

  markPoint = seriesOpt.markPoint;

  if (markPoint && markPoint.data) {
    var mpData = markPoint.data;

    for (var i = 0; i < mpData.length; i++) {
      compatEC3CommonStyles(mpData[i]);
    }
  }

  markLine = seriesOpt.markLine;

  if (markLine && markLine.data) {
    var mlData = markLine.data;

    for (var i = 0; i < mlData.length; i++) {
      if (zrUtil.isArray(mlData[i])) {
        compatEC3CommonStyles(mlData[i][0]);
        compatEC3CommonStyles(mlData[i][1]);
      } else {
        compatEC3CommonStyles(mlData[i]);
      }
    }
  }

  if (seriesOpt.type === 'gauge') {
    compatTextStyle(seriesOpt, 'axisLabel');
    compatTextStyle(seriesOpt, 'title');
    compatTextStyle(seriesOpt, 'detail');
  } else if (seriesOpt.type === 'treemap') {
    convertNormalEmphasis(seriesOpt.breadcrumb, 'itemStyle');
    zrUtil.each(seriesOpt.levels, function (opt) {
      removeEC3NormalStatus(opt);
    });
  } else if (seriesOpt.type === 'tree') {
    removeEC3NormalStatus(seriesOpt.leaves);
  }
}

function toArr(o) {
  return zrUtil.isArray(o) ? o : o ? [o] : [];
}

function toObj(o) {
  return (zrUtil.isArray(o) ? o[0] : o) || {};
}

export default function globalCompatStyle(option, isTheme) {
  each(toArr(option.series), function (seriesOpt) {
    isObject(seriesOpt) && processSeries(seriesOpt);
  });
  var axes = ['xAxis', 'yAxis', 'radiusAxis', 'angleAxis', 'singleAxis', 'parallelAxis', 'radar'];
  isTheme && axes.push('valueAxis', 'categoryAxis', 'logAxis', 'timeAxis');
  each(axes, function (axisName) {
    each(toArr(option[axisName]), function (axisOpt) {
      if (axisOpt) {
        compatTextStyle(axisOpt, 'axisLabel');
        compatTextStyle(axisOpt.axisPointer, 'label');
      }
    });
  });
  each(toArr(option.parallel), function (parallelOpt) {
    var parallelAxisDefault = parallelOpt && parallelOpt.parallelAxisDefault;
    compatTextStyle(parallelAxisDefault, 'axisLabel');
    compatTextStyle(parallelAxisDefault && parallelAxisDefault.axisPointer, 'label');
  });
  each(toArr(option.calendar), function (calendarOpt) {
    convertNormalEmphasis(calendarOpt, 'itemStyle');
    compatTextStyle(calendarOpt, 'dayLabel');
    compatTextStyle(calendarOpt, 'monthLabel');
    compatTextStyle(calendarOpt, 'yearLabel');
  });
  each(toArr(option.radar), function (radarOpt) {
    compatTextStyle(radarOpt, 'name');

    if (radarOpt.name && radarOpt.axisName == null) {
      radarOpt.axisName = radarOpt.name;
      delete radarOpt.name;

      if (process.env.NODE_ENV !== 'production') {
        deprecateLog('name property in radar component has been changed to axisName');
      }
    }

    if (radarOpt.nameGap != null && radarOpt.axisNameGap == null) {
      radarOpt.axisNameGap = radarOpt.nameGap;
      delete radarOpt.nameGap;

      if (process.env.NODE_ENV !== 'production') {
        deprecateLog('nameGap property in radar component has been changed to axisNameGap');
      }
    }
  });
  each(toArr(option.geo), function (geoOpt) {
    if (isObject(geoOpt)) {
      compatEC3CommonStyles(geoOpt);
      each(toArr(geoOpt.regions), function (regionObj) {
        compatEC3CommonStyles(regionObj);
      });
    }
  });
  each(toArr(option.timeline), function (timelineOpt) {
    compatEC3CommonStyles(timelineOpt);
    convertNormalEmphasis(timelineOpt, 'label');
    convertNormalEmphasis(timelineOpt, 'itemStyle');
    convertNormalEmphasis(timelineOpt, 'controlStyle', true);
    var data = timelineOpt.data;
    zrUtil.isArray(data) && zrUtil.each(data, function (item) {
      if (zrUtil.isObject(item)) {
        convertNormalEmphasis(item, 'label');
        convertNormalEmphasis(item, 'itemStyle');
      }
    });
  });
  each(toArr(option.toolbox), function (toolboxOpt) {
    convertNormalEmphasis(toolboxOpt, 'iconStyle');
    each(toolboxOpt.feature, function (featureOpt) {
      convertNormalEmphasis(featureOpt, 'iconStyle');
    });
  });
  compatTextStyle(toObj(option.axisPointer), 'label');
  compatTextStyle(toObj(option.tooltip).axisPointer, 'label');
}