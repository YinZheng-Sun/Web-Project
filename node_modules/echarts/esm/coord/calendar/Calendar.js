
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
import * as layout from '../../util/layout';
import * as numberUtil from '../../util/number';
import CoordinateSystemManager from '../../CoordinateSystem';
var PROXIMATE_ONE_DAY = 86400000;

var Calendar = function () {
  function Calendar(calendarModel, ecModel, api) {
    this.type = 'calendar';
    this.dimensions = Calendar.dimensions;
    this.getDimensionsInfo = Calendar.getDimensionsInfo;
    this._model = calendarModel;
  }

  Calendar.getDimensionsInfo = function () {
    return [{
      name: 'time',
      type: 'time'
    }, 'value'];
  };

  Calendar.prototype.getRangeInfo = function () {
    return this._rangeInfo;
  };

  Calendar.prototype.getModel = function () {
    return this._model;
  };

  Calendar.prototype.getRect = function () {
    return this._rect;
  };

  Calendar.prototype.getCellWidth = function () {
    return this._sw;
  };

  Calendar.prototype.getCellHeight = function () {
    return this._sh;
  };

  Calendar.prototype.getOrient = function () {
    return this._orient;
  };

  Calendar.prototype.getFirstDayOfWeek = function () {
    return this._firstDayOfWeek;
  };

  Calendar.prototype.getDateInfo = function (date) {
    date = numberUtil.parseDate(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var mStr = m < 10 ? '0' + m : '' + m;
    var d = date.getDate();
    var dStr = d < 10 ? '0' + d : '' + d;
    var day = date.getDay();
    day = Math.abs((day + 7 - this.getFirstDayOfWeek()) % 7);
    return {
      y: y + '',
      m: mStr,
      d: dStr,
      day: day,
      time: date.getTime(),
      formatedDate: y + '-' + mStr + '-' + dStr,
      date: date
    };
  };

  Calendar.prototype.getNextNDay = function (date, n) {
    n = n || 0;

    if (n === 0) {
      return this.getDateInfo(date);
    }

    date = new Date(this.getDateInfo(date).time);
    date.setDate(date.getDate() + n);
    return this.getDateInfo(date);
  };

  Calendar.prototype.update = function (ecModel, api) {
    this._firstDayOfWeek = +this._model.getModel('dayLabel').get('firstDay');
    this._orient = this._model.get('orient');
    this._lineWidth = this._model.getModel('itemStyle').getItemStyle().lineWidth || 0;
    this._rangeInfo = this._getRangeInfo(this._initRangeOption());
    var weeks = this._rangeInfo.weeks || 1;
    var whNames = ['width', 'height'];

    var cellSize = this._model.getCellSize().slice();

    var layoutParams = this._model.getBoxLayoutParams();

    var cellNumbers = this._orient === 'horizontal' ? [weeks, 7] : [7, weeks];
    zrUtil.each([0, 1], function (idx) {
      if (cellSizeSpecified(cellSize, idx)) {
        layoutParams[whNames[idx]] = cellSize[idx] * cellNumbers[idx];
      }
    });
    var whGlobal = {
      width: api.getWidth(),
      height: api.getHeight()
    };
    var calendarRect = this._rect = layout.getLayoutRect(layoutParams, whGlobal);
    zrUtil.each([0, 1], function (idx) {
      if (!cellSizeSpecified(cellSize, idx)) {
        cellSize[idx] = calendarRect[whNames[idx]] / cellNumbers[idx];
      }
    });

    function cellSizeSpecified(cellSize, idx) {
      return cellSize[idx] != null && cellSize[idx] !== 'auto';
    }

    this._sw = cellSize[0];
    this._sh = cellSize[1];
  };

  Calendar.prototype.dataToPoint = function (data, clamp) {
    zrUtil.isArray(data) && (data = data[0]);
    clamp == null && (clamp = true);
    var dayInfo = this.getDateInfo(data);
    var range = this._rangeInfo;
    var date = dayInfo.formatedDate;

    if (clamp && !(dayInfo.time >= range.start.time && dayInfo.time < range.end.time + PROXIMATE_ONE_DAY)) {
      return [NaN, NaN];
    }

    var week = dayInfo.day;

    var nthWeek = this._getRangeInfo([range.start.time, date]).nthWeek;

    if (this._orient === 'vertical') {
      return [this._rect.x + week * this._sw + this._sw / 2, this._rect.y + nthWeek * this._sh + this._sh / 2];
    }

    return [this._rect.x + nthWeek * this._sw + this._sw / 2, this._rect.y + week * this._sh + this._sh / 2];
  };

  Calendar.prototype.pointToData = function (point) {
    var date = this.pointToDate(point);
    return date && date.time;
  };

  Calendar.prototype.dataToRect = function (data, clamp) {
    var point = this.dataToPoint(data, clamp);
    return {
      contentShape: {
        x: point[0] - (this._sw - this._lineWidth) / 2,
        y: point[1] - (this._sh - this._lineWidth) / 2,
        width: this._sw - this._lineWidth,
        height: this._sh - this._lineWidth
      },
      center: point,
      tl: [point[0] - this._sw / 2, point[1] - this._sh / 2],
      tr: [point[0] + this._sw / 2, point[1] - this._sh / 2],
      br: [point[0] + this._sw / 2, point[1] + this._sh / 2],
      bl: [point[0] - this._sw / 2, point[1] + this._sh / 2]
    };
  };

  Calendar.prototype.pointToDate = function (point) {
    var nthX = Math.floor((point[0] - this._rect.x) / this._sw) + 1;
    var nthY = Math.floor((point[1] - this._rect.y) / this._sh) + 1;
    var range = this._rangeInfo.range;

    if (this._orient === 'vertical') {
      return this._getDateByWeeksAndDay(nthY, nthX - 1, range);
    }

    return this._getDateByWeeksAndDay(nthX, nthY - 1, range);
  };

  Calendar.prototype.convertToPixel = function (ecModel, finder, value) {
    var coordSys = getCoordSys(finder);
    return coordSys === this ? coordSys.dataToPoint(value) : null;
  };

  Calendar.prototype.convertFromPixel = function (ecModel, finder, pixel) {
    var coordSys = getCoordSys(finder);
    return coordSys === this ? coordSys.pointToData(pixel) : null;
  };

  Calendar.prototype.containPoint = function (point) {
    console.warn('Not implemented.');
    return false;
  };

  Calendar.prototype._initRangeOption = function () {
    var range = this._model.get('range');

    var normalizedRange;

    if (zrUtil.isArray(range) && range.length === 1) {
      range = range[0];
    }

    if (!zrUtil.isArray(range)) {
      var rangeStr = range.toString();

      if (/^\d{4}$/.test(rangeStr)) {
        normalizedRange = [rangeStr + '-01-01', rangeStr + '-12-31'];
      }

      if (/^\d{4}[\/|-]\d{1,2}$/.test(rangeStr)) {
        var start = this.getDateInfo(rangeStr);
        var firstDay = start.date;
        firstDay.setMonth(firstDay.getMonth() + 1);
        var end = this.getNextNDay(firstDay, -1);
        normalizedRange = [start.formatedDate, end.formatedDate];
      }

      if (/^\d{4}[\/|-]\d{1,2}[\/|-]\d{1,2}$/.test(rangeStr)) {
        normalizedRange = [rangeStr, rangeStr];
      }
    } else {
      normalizedRange = range;
    }

    if (!normalizedRange) {
      if (process.env.NODE_ENV !== 'production') {
        zrUtil.logError('Invalid date range.');
      }

      return range;
    }

    var tmp = this._getRangeInfo(normalizedRange);

    if (tmp.start.time > tmp.end.time) {
      normalizedRange.reverse();
    }

    return normalizedRange;
  };

  Calendar.prototype._getRangeInfo = function (range) {
    var parsedRange = [this.getDateInfo(range[0]), this.getDateInfo(range[1])];
    var reversed;

    if (parsedRange[0].time > parsedRange[1].time) {
      reversed = true;
      parsedRange.reverse();
    }

    var allDay = Math.floor(parsedRange[1].time / PROXIMATE_ONE_DAY) - Math.floor(parsedRange[0].time / PROXIMATE_ONE_DAY) + 1;
    var date = new Date(parsedRange[0].time);
    var startDateNum = date.getDate();
    var endDateNum = parsedRange[1].date.getDate();
    date.setDate(startDateNum + allDay - 1);
    var dateNum = date.getDate();

    if (dateNum !== endDateNum) {
      var sign = date.getTime() - parsedRange[1].time > 0 ? 1 : -1;

      while ((dateNum = date.getDate()) !== endDateNum && (date.getTime() - parsedRange[1].time) * sign > 0) {
        allDay -= sign;
        date.setDate(dateNum - sign);
      }
    }

    var weeks = Math.floor((allDay + parsedRange[0].day + 6) / 7);
    var nthWeek = reversed ? -weeks + 1 : weeks - 1;
    reversed && parsedRange.reverse();
    return {
      range: [parsedRange[0].formatedDate, parsedRange[1].formatedDate],
      start: parsedRange[0],
      end: parsedRange[1],
      allDay: allDay,
      weeks: weeks,
      nthWeek: nthWeek,
      fweek: parsedRange[0].day,
      lweek: parsedRange[1].day
    };
  };

  Calendar.prototype._getDateByWeeksAndDay = function (nthWeek, day, range) {
    var rangeInfo = this._getRangeInfo(range);

    if (nthWeek > rangeInfo.weeks || nthWeek === 0 && day < rangeInfo.fweek || nthWeek === rangeInfo.weeks && day > rangeInfo.lweek) {
      return null;
    }

    var nthDay = (nthWeek - 1) * 7 - rangeInfo.fweek + day;
    var date = new Date(rangeInfo.start.time);
    date.setDate(+rangeInfo.start.d + nthDay);
    return this.getDateInfo(date);
  };

  Calendar.create = function (ecModel, api) {
    var calendarList = [];
    ecModel.eachComponent('calendar', function (calendarModel) {
      var calendar = new Calendar(calendarModel, ecModel, api);
      calendarList.push(calendar);
      calendarModel.coordinateSystem = calendar;
    });
    ecModel.eachSeries(function (calendarSeries) {
      if (calendarSeries.get('coordinateSystem') === 'calendar') {
        calendarSeries.coordinateSystem = calendarList[calendarSeries.get('calendarIndex') || 0];
      }
    });
    return calendarList;
  };

  Calendar.dimensions = ['time', 'value'];
  return Calendar;
}();

function getCoordSys(finder) {
  var calendarModel = finder.calendarModel;
  var seriesModel = finder.seriesModel;
  var coordSys = calendarModel ? calendarModel.coordinateSystem : seriesModel ? seriesModel.coordinateSystem : null;
  return coordSys;
}

CoordinateSystemManager.register('calendar', Calendar);
export default Calendar;