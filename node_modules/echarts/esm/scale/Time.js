
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

import { __extends } from "tslib";
import * as numberUtil from '../util/number';
import { ONE_SECOND, ONE_MINUTE, ONE_HOUR, ONE_DAY, ONE_YEAR, format, leveledFormat, getUnitValue, timeUnits, fullLeveledFormatter, getPrimaryTimeUnit, isPrimaryTimeUnit, getDefaultFormatPrecisionOfInterval, fullYearGetterName, monthSetterName, fullYearSetterName, dateSetterName, hoursGetterName, hoursSetterName, minutesSetterName, secondsSetterName, millisecondsSetterName, monthGetterName, dateGetterName, minutesGetterName, secondsGetterName, millisecondsGetterName } from '../util/time';
import * as scaleHelper from './helper';
import IntervalScale from './Interval';
import Scale from './Scale';
import { warn } from '../util/log';
import { filter, map } from 'zrender/esm/core/util';

var bisect = function (a, x, lo, hi) {
  while (lo < hi) {
    var mid = lo + hi >>> 1;

    if (a[mid][1] < x) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  return lo;
};

var TimeScale = function (_super) {
  __extends(TimeScale, _super);

  function TimeScale(settings) {
    var _this = _super.call(this, settings) || this;

    _this.type = 'time';
    return _this;
  }

  TimeScale.prototype.getLabel = function (tick) {
    var useUTC = this.getSetting('useUTC');
    return format(tick.value, fullLeveledFormatter[getDefaultFormatPrecisionOfInterval(getPrimaryTimeUnit(this._minLevelUnit))] || fullLeveledFormatter.second, useUTC, this.getSetting('locale'));
  };

  TimeScale.prototype.getFormattedLabel = function (tick, idx, labelFormatter) {
    var isUTC = this.getSetting('useUTC');
    var lang = this.getSetting('locale');
    return leveledFormat(tick, idx, labelFormatter, lang, isUTC);
  };

  TimeScale.prototype.getTicks = function (expandToNicedExtent) {
    var interval = this._interval;
    var extent = this._extent;
    var ticks = [];

    if (!interval) {
      return ticks;
    }

    ticks.push({
      value: extent[0],
      level: 0
    });
    var useUTC = this.getSetting('useUTC');
    var innerTicks = getIntervalTicks(this._minLevelUnit, this._approxInterval, useUTC, extent);
    ticks = ticks.concat(innerTicks);
    ticks.push({
      value: extent[1],
      level: 0
    });
    return ticks;
  };

  TimeScale.prototype.niceExtent = function (opt) {
    var extent = this._extent;

    if (extent[0] === extent[1]) {
      extent[0] -= ONE_DAY;
      extent[1] += ONE_DAY;
    }

    if (extent[1] === -Infinity && extent[0] === Infinity) {
      var d = new Date();
      extent[1] = +new Date(d.getFullYear(), d.getMonth(), d.getDate());
      extent[0] = extent[1] - ONE_DAY;
    }

    this.niceTicks(opt.splitNumber, opt.minInterval, opt.maxInterval);
  };

  TimeScale.prototype.niceTicks = function (approxTickNum, minInterval, maxInterval) {
    approxTickNum = approxTickNum || 10;
    var extent = this._extent;
    var span = extent[1] - extent[0];
    this._approxInterval = span / approxTickNum;

    if (minInterval != null && this._approxInterval < minInterval) {
      this._approxInterval = minInterval;
    }

    if (maxInterval != null && this._approxInterval > maxInterval) {
      this._approxInterval = maxInterval;
    }

    var scaleIntervalsLen = scaleIntervals.length;
    var idx = Math.min(bisect(scaleIntervals, this._approxInterval, 0, scaleIntervalsLen), scaleIntervalsLen - 1);
    this._interval = scaleIntervals[idx][1];
    this._minLevelUnit = scaleIntervals[Math.max(idx - 1, 0)][0];
  };

  TimeScale.prototype.parse = function (val) {
    return typeof val === 'number' ? val : +numberUtil.parseDate(val);
  };

  TimeScale.prototype.contain = function (val) {
    return scaleHelper.contain(this.parse(val), this._extent);
  };

  TimeScale.prototype.normalize = function (val) {
    return scaleHelper.normalize(this.parse(val), this._extent);
  };

  TimeScale.prototype.scale = function (val) {
    return scaleHelper.scale(val, this._extent);
  };

  TimeScale.type = 'time';
  return TimeScale;
}(IntervalScale);

var scaleIntervals = [['second', ONE_SECOND], ['minute', ONE_MINUTE], ['hour', ONE_HOUR], ['quarter-day', ONE_HOUR * 6], ['half-day', ONE_HOUR * 12], ['day', ONE_DAY * 1.2], ['half-week', ONE_DAY * 3.5], ['week', ONE_DAY * 7], ['month', ONE_DAY * 31], ['quarter', ONE_DAY * 95], ['half-year', ONE_YEAR / 2], ['year', ONE_YEAR]];

function isUnitValueSame(unit, valueA, valueB, isUTC) {
  var dateA = numberUtil.parseDate(valueA);
  var dateB = numberUtil.parseDate(valueB);

  var isSame = function (unit) {
    return getUnitValue(dateA, unit, isUTC) === getUnitValue(dateB, unit, isUTC);
  };

  var isSameYear = function () {
    return isSame('year');
  };

  var isSameMonth = function () {
    return isSameYear() && isSame('month');
  };

  var isSameDay = function () {
    return isSameMonth() && isSame('day');
  };

  var isSameHour = function () {
    return isSameDay() && isSame('hour');
  };

  var isSameMinute = function () {
    return isSameHour() && isSame('minute');
  };

  var isSameSecond = function () {
    return isSameMinute() && isSame('second');
  };

  var isSameMilliSecond = function () {
    return isSameSecond() && isSame('millisecond');
  };

  switch (unit) {
    case 'year':
      return isSameYear();

    case 'month':
      return isSameMonth();

    case 'day':
      return isSameDay();

    case 'hour':
      return isSameHour();

    case 'minute':
      return isSameMinute();

    case 'second':
      return isSameSecond();

    case 'millisecond':
      return isSameMilliSecond();
  }
}

function getDateInterval(approxInterval, daysInMonth) {
  approxInterval /= ONE_DAY;
  return approxInterval > 16 ? 16 : approxInterval > 7.5 ? 7 : approxInterval > 3.5 ? 4 : approxInterval > 1.5 ? 2 : 1;
}

function getMonthInterval(approxInterval) {
  var APPROX_ONE_MONTH = 30 * ONE_DAY;
  approxInterval /= APPROX_ONE_MONTH;
  return approxInterval > 6 ? 6 : approxInterval > 3 ? 3 : approxInterval > 2 ? 2 : 1;
}

function getHourInterval(approxInterval) {
  approxInterval /= ONE_HOUR;
  return approxInterval > 12 ? 12 : approxInterval > 6 ? 6 : approxInterval > 3.5 ? 4 : approxInterval > 2 ? 2 : 1;
}

function getMinutesAndSecondsInterval(approxInterval, isMinutes) {
  approxInterval /= isMinutes ? ONE_MINUTE : ONE_SECOND;
  return approxInterval > 30 ? 30 : approxInterval > 20 ? 20 : approxInterval > 15 ? 15 : approxInterval > 10 ? 10 : approxInterval > 5 ? 5 : approxInterval > 2 ? 2 : 1;
}

function getMillisecondsInterval(approxInterval) {
  return numberUtil.nice(approxInterval, true);
}

function getFirstTimestampOfUnit(date, unitName, isUTC) {
  var outDate = new Date(date);

  switch (getPrimaryTimeUnit(unitName)) {
    case 'year':
    case 'month':
      outDate[monthSetterName(isUTC)](0);

    case 'day':
      outDate[dateSetterName(isUTC)](1);

    case 'hour':
      outDate[hoursSetterName(isUTC)](0);

    case 'minute':
      outDate[minutesSetterName(isUTC)](0);

    case 'second':
      outDate[secondsSetterName(isUTC)](0);
      outDate[millisecondsSetterName(isUTC)](0);
  }

  return outDate.getTime();
}

function getIntervalTicks(bottomUnitName, approxInterval, isUTC, extent) {
  var safeLimit = 10000;
  var unitNames = timeUnits;
  var iter = 0;

  function addTicksInSpan(interval, minTimestamp, maxTimestamp, getMethodName, setMethodName, isDate, out) {
    var date = new Date(minTimestamp);
    var dateTime = minTimestamp;
    var d = date[getMethodName]();

    while (dateTime < maxTimestamp && dateTime <= extent[1]) {
      out.push({
        value: dateTime
      });
      d += interval;
      date[setMethodName](d);
      dateTime = date.getTime();
    }

    out.push({
      value: dateTime,
      notAdd: true
    });
  }

  function addLevelTicks(unitName, lastLevelTicks, levelTicks) {
    var newAddedTicks = [];
    var isFirstLevel = !lastLevelTicks.length;

    if (isUnitValueSame(getPrimaryTimeUnit(unitName), extent[0], extent[1], isUTC)) {
      return;
    }

    if (isFirstLevel) {
      lastLevelTicks = [{
        value: getFirstTimestampOfUnit(new Date(extent[0]), unitName, isUTC)
      }, {
        value: extent[1]
      }];
    }

    for (var i = 0; i < lastLevelTicks.length - 1; i++) {
      var startTick = lastLevelTicks[i].value;
      var endTick = lastLevelTicks[i + 1].value;

      if (startTick === endTick) {
        continue;
      }

      var interval = void 0;
      var getterName = void 0;
      var setterName = void 0;
      var isDate = false;

      switch (unitName) {
        case 'year':
          interval = Math.max(1, Math.round(approxInterval / ONE_DAY / 365));
          getterName = fullYearGetterName(isUTC);
          setterName = fullYearSetterName(isUTC);
          break;

        case 'half-year':
        case 'quarter':
        case 'month':
          interval = getMonthInterval(approxInterval);
          getterName = monthGetterName(isUTC);
          setterName = monthSetterName(isUTC);
          break;

        case 'week':
        case 'half-week':
        case 'day':
          interval = getDateInterval(approxInterval, 31);
          getterName = dateGetterName(isUTC);
          setterName = dateSetterName(isUTC);
          isDate = true;
          break;

        case 'half-day':
        case 'quarter-day':
        case 'hour':
          interval = getHourInterval(approxInterval);
          getterName = hoursGetterName(isUTC);
          setterName = hoursSetterName(isUTC);
          break;

        case 'minute':
          interval = getMinutesAndSecondsInterval(approxInterval, true);
          getterName = minutesGetterName(isUTC);
          setterName = minutesSetterName(isUTC);
          break;

        case 'second':
          interval = getMinutesAndSecondsInterval(approxInterval, false);
          getterName = secondsGetterName(isUTC);
          setterName = secondsSetterName(isUTC);
          break;

        case 'millisecond':
          interval = getMillisecondsInterval(approxInterval);
          getterName = millisecondsGetterName(isUTC);
          setterName = millisecondsSetterName(isUTC);
          break;
      }

      addTicksInSpan(interval, startTick, endTick, getterName, setterName, isDate, newAddedTicks);

      if (unitName === 'year' && levelTicks.length > 1 && i === 0) {
        levelTicks.unshift({
          value: levelTicks[0].value - interval
        });
      }
    }

    for (var i = 0; i < newAddedTicks.length; i++) {
      levelTicks.push(newAddedTicks[i]);
    }

    return newAddedTicks;
  }

  var levelsTicks = [];
  var currentLevelTicks = [];
  var tickCount = 0;
  var lastLevelTickCount = 0;

  for (var i = 0; i < unitNames.length && iter++ < safeLimit; ++i) {
    var primaryTimeUnit = getPrimaryTimeUnit(unitNames[i]);

    if (!isPrimaryTimeUnit(unitNames[i])) {
      continue;
    }

    addLevelTicks(unitNames[i], levelsTicks[levelsTicks.length - 1] || [], currentLevelTicks);
    var nextPrimaryTimeUnit = unitNames[i + 1] ? getPrimaryTimeUnit(unitNames[i + 1]) : null;

    if (primaryTimeUnit !== nextPrimaryTimeUnit) {
      if (currentLevelTicks.length) {
        lastLevelTickCount = tickCount;
        currentLevelTicks.sort(function (a, b) {
          return a.value - b.value;
        });
        var levelTicksRemoveDuplicated = [];

        for (var i_1 = 0; i_1 < currentLevelTicks.length; ++i_1) {
          var tickValue = currentLevelTicks[i_1].value;

          if (i_1 === 0 || currentLevelTicks[i_1 - 1].value !== tickValue) {
            levelTicksRemoveDuplicated.push(currentLevelTicks[i_1]);

            if (tickValue >= extent[0] && tickValue <= extent[1]) {
              tickCount++;
            }
          }
        }

        var targetTickNum = (extent[1] - extent[0]) / approxInterval;

        if (tickCount > targetTickNum * 1.5 && lastLevelTickCount > targetTickNum / 1.5) {
          break;
        }

        levelsTicks.push(levelTicksRemoveDuplicated);

        if (tickCount > targetTickNum || bottomUnitName === unitNames[i]) {
          break;
        }
      }

      currentLevelTicks = [];
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    if (iter >= safeLimit) {
      warn('Exceed safe limit.');
    }
  }

  var levelsTicksInExtent = filter(map(levelsTicks, function (levelTicks) {
    return filter(levelTicks, function (tick) {
      return tick.value >= extent[0] && tick.value <= extent[1] && !tick.notAdd;
    });
  }), function (levelTicks) {
    return levelTicks.length > 0;
  });
  var ticks = [];
  var maxLevel = levelsTicksInExtent.length - 1;

  for (var i = 0; i < levelsTicksInExtent.length; ++i) {
    var levelTicks = levelsTicksInExtent[i];

    for (var k = 0; k < levelTicks.length; ++k) {
      ticks.push({
        value: levelTicks[k].value,
        level: maxLevel - i
      });
    }
  }

  ticks.sort(function (a, b) {
    return a.value - b.value;
  });
  var result = [];

  for (var i = 0; i < ticks.length; ++i) {
    if (i === 0 || ticks[i].value !== ticks[i - 1].value) {
      result.push(ticks[i]);
    }
  }

  return result;
}

Scale.registerClass(TimeScale);
export default TimeScale;