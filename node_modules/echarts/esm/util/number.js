
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
var RADIAN_EPSILON = 1e-4;

function _trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}

export function linearMap(val, domain, range, clamp) {
  var subDomain = domain[1] - domain[0];
  var subRange = range[1] - range[0];

  if (subDomain === 0) {
    return subRange === 0 ? range[0] : (range[0] + range[1]) / 2;
  }

  if (clamp) {
    if (subDomain > 0) {
      if (val <= domain[0]) {
        return range[0];
      } else if (val >= domain[1]) {
        return range[1];
      }
    } else {
      if (val >= domain[0]) {
        return range[0];
      } else if (val <= domain[1]) {
        return range[1];
      }
    }
  } else {
    if (val === domain[0]) {
      return range[0];
    }

    if (val === domain[1]) {
      return range[1];
    }
  }

  return (val - domain[0]) / subDomain * subRange + range[0];
}
export function parsePercent(percent, all) {
  switch (percent) {
    case 'center':
    case 'middle':
      percent = '50%';
      break;

    case 'left':
    case 'top':
      percent = '0%';
      break;

    case 'right':
    case 'bottom':
      percent = '100%';
      break;
  }

  if (typeof percent === 'string') {
    if (_trim(percent).match(/%$/)) {
      return parseFloat(percent) / 100 * all;
    }

    return parseFloat(percent);
  }

  return percent == null ? NaN : +percent;
}
export function round(x, precision, returnStr) {
  if (precision == null) {
    precision = 10;
  }

  precision = Math.min(Math.max(0, precision), 20);
  x = (+x).toFixed(precision);
  return returnStr ? x : +x;
}
export function asc(arr) {
  arr.sort(function (a, b) {
    return a - b;
  });
  return arr;
}
export function getPrecision(val) {
  val = +val;

  if (isNaN(val)) {
    return 0;
  }

  var e = 1;
  var count = 0;

  while (Math.round(val * e) / e !== val) {
    e *= 10;
    count++;
  }

  return count;
}
export function getPrecisionSafe(val) {
  var str = val.toString();
  var eIndex = str.indexOf('e');

  if (eIndex > 0) {
    var precision = +str.slice(eIndex + 1);
    return precision < 0 ? -precision : 0;
  } else {
    var dotIndex = str.indexOf('.');
    return dotIndex < 0 ? 0 : str.length - 1 - dotIndex;
  }
}
export function getPixelPrecision(dataExtent, pixelExtent) {
  var log = Math.log;
  var LN10 = Math.LN10;
  var dataQuantity = Math.floor(log(dataExtent[1] - dataExtent[0]) / LN10);
  var sizeQuantity = Math.round(log(Math.abs(pixelExtent[1] - pixelExtent[0])) / LN10);
  var precision = Math.min(Math.max(-dataQuantity + sizeQuantity, 0), 20);
  return !isFinite(precision) ? 20 : precision;
}
export function getPercentWithPrecision(valueList, idx, precision) {
  if (!valueList[idx]) {
    return 0;
  }

  var sum = zrUtil.reduce(valueList, function (acc, val) {
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  if (sum === 0) {
    return 0;
  }

  var digits = Math.pow(10, precision);
  var votesPerQuota = zrUtil.map(valueList, function (val) {
    return (isNaN(val) ? 0 : val) / sum * digits * 100;
  });
  var targetSeats = digits * 100;
  var seats = zrUtil.map(votesPerQuota, function (votes) {
    return Math.floor(votes);
  });
  var currentSum = zrUtil.reduce(seats, function (acc, val) {
    return acc + val;
  }, 0);
  var remainder = zrUtil.map(votesPerQuota, function (votes, idx) {
    return votes - seats[idx];
  });

  while (currentSum < targetSeats) {
    var max = Number.NEGATIVE_INFINITY;
    var maxId = null;

    for (var i = 0, len = remainder.length; i < len; ++i) {
      if (remainder[i] > max) {
        max = remainder[i];
        maxId = i;
      }
    }

    ++seats[maxId];
    remainder[maxId] = 0;
    ++currentSum;
  }

  return seats[idx] / digits;
}
export var MAX_SAFE_INTEGER = 9007199254740991;
export function remRadian(radian) {
  var pi2 = Math.PI * 2;
  return (radian % pi2 + pi2) % pi2;
}
export function isRadianAroundZero(val) {
  return val > -RADIAN_EPSILON && val < RADIAN_EPSILON;
}
var TIME_REG = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
export function parseDate(value) {
  if (value instanceof Date) {
    return value;
  } else if (typeof value === 'string') {
    var match = TIME_REG.exec(value);

    if (!match) {
      return new Date(NaN);
    }

    if (!match[8]) {
      return new Date(+match[1], +(match[2] || 1) - 1, +match[3] || 1, +match[4] || 0, +(match[5] || 0), +match[6] || 0, +match[7] || 0);
    } else {
      var hour = +match[4] || 0;

      if (match[8].toUpperCase() !== 'Z') {
        hour -= +match[8].slice(0, 3);
      }

      return new Date(Date.UTC(+match[1], +(match[2] || 1) - 1, +match[3] || 1, hour, +(match[5] || 0), +match[6] || 0, +match[7] || 0));
    }
  } else if (value == null) {
    return new Date(NaN);
  }

  return new Date(Math.round(value));
}
export function quantity(val) {
  return Math.pow(10, quantityExponent(val));
}
export function quantityExponent(val) {
  if (val === 0) {
    return 0;
  }

  var exp = Math.floor(Math.log(val) / Math.LN10);

  if (val / Math.pow(10, exp) >= 10) {
    exp++;
  }

  return exp;
}
export function nice(val, round) {
  var exponent = quantityExponent(val);
  var exp10 = Math.pow(10, exponent);
  var f = val / exp10;
  var nf;

  if (round) {
    if (f < 1.5) {
      nf = 1;
    } else if (f < 2.5) {
      nf = 2;
    } else if (f < 4) {
      nf = 3;
    } else if (f < 7) {
      nf = 5;
    } else {
      nf = 10;
    }
  } else {
    if (f < 1) {
      nf = 1;
    } else if (f < 2) {
      nf = 2;
    } else if (f < 3) {
      nf = 3;
    } else if (f < 5) {
      nf = 5;
    } else {
      nf = 10;
    }
  }

  val = nf * exp10;
  return exponent >= -20 ? +val.toFixed(exponent < 0 ? -exponent : 0) : val;
}
export function quantile(ascArr, p) {
  var H = (ascArr.length - 1) * p + 1;
  var h = Math.floor(H);
  var v = +ascArr[h - 1];
  var e = H - h;
  return e ? v + e * (ascArr[h] - v) : v;
}
export function reformIntervals(list) {
  list.sort(function (a, b) {
    return littleThan(a, b, 0) ? -1 : 1;
  });
  var curr = -Infinity;
  var currClose = 1;

  for (var i = 0; i < list.length;) {
    var interval = list[i].interval;
    var close_1 = list[i].close;

    for (var lg = 0; lg < 2; lg++) {
      if (interval[lg] <= curr) {
        interval[lg] = curr;
        close_1[lg] = !lg ? 1 - currClose : 1;
      }

      curr = interval[lg];
      currClose = close_1[lg];
    }

    if (interval[0] === interval[1] && close_1[0] * close_1[1] !== 1) {
      list.splice(i, 1);
    } else {
      i++;
    }
  }

  return list;

  function littleThan(a, b, lg) {
    return a.interval[lg] < b.interval[lg] || a.interval[lg] === b.interval[lg] && (a.close[lg] - b.close[lg] === (!lg ? 1 : -1) || !lg && littleThan(a, b, 1));
  }
}
export function numericToNumber(val) {
  var valFloat = parseFloat(val);
  return valFloat == val && (valFloat !== 0 || typeof val !== 'string' || val.indexOf('x') <= 0) ? valFloat : NaN;
}
export function isNumeric(val) {
  return !isNaN(numericToNumber(val));
}
export function getRandomIdBase() {
  return Math.round(Math.random() * 9);
}
export function getGreatestCommonDividor(a, b) {
  if (b === 0) {
    return a;
  }

  return getGreatestCommonDividor(b, a % b);
}
export function getLeastCommonMultiple(a, b) {
  if (a == null) {
    return b;
  }

  if (b == null) {
    return a;
  }

  return a * b / getGreatestCommonDividor(a, b);
}