var ih = Object.defineProperty;
var sh = (e, t, r) => t in e ? ih(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ge = (e, t, r) => sh(e, typeof t != "symbol" ? t + "" : t, r);
import { app as Na, BrowserWindow as Hn, ipcMain as $r, shell as fh, dialog as Xt } from "electron";
import Lr from "node:path";
import { fileURLToPath as ch } from "node:url";
import rt from "node:fs/promises";
import { existsSync as jt } from "node:fs";
import oh from "node:http";
import lh from "node:os";
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var _i = {};
_i.version = "0.18.5";
var fc = 1252, hh = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], Is = {
  /*::[*/
  0: 1252,
  /* ANSI */
  /*::[*/
  1: 65001,
  /* DEFAULT */
  /*::[*/
  2: 65001,
  /* SYMBOL */
  /*::[*/
  77: 1e4,
  /* MAC */
  /*::[*/
  128: 932,
  /* SHIFTJIS */
  /*::[*/
  129: 949,
  /* HANGUL */
  /*::[*/
  130: 1361,
  /* JOHAB */
  /*::[*/
  134: 936,
  /* GB2312 */
  /*::[*/
  136: 950,
  /* CHINESEBIG5 */
  /*::[*/
  161: 1253,
  /* GREEK */
  /*::[*/
  162: 1254,
  /* TURKISH */
  /*::[*/
  163: 1258,
  /* VIETNAMESE */
  /*::[*/
  177: 1255,
  /* HEBREW */
  /*::[*/
  178: 1256,
  /* ARABIC */
  /*::[*/
  186: 1257,
  /* BALTIC */
  /*::[*/
  204: 1251,
  /* RUSSIAN */
  /*::[*/
  222: 874,
  /* THAI */
  /*::[*/
  238: 1250,
  /* EASTEUROPE */
  /*::[*/
  255: 1252,
  /* OEM */
  /*::[*/
  69: 6969
  /* MISC */
}, Bs = function(e) {
  hh.indexOf(e) != -1 && (fc = Is[0] = e);
};
function uh() {
  Bs(1252);
}
var mt = function(e) {
  Bs(e);
};
function Ds() {
  mt(1200), uh();
}
function N0(e) {
  for (var t = [], r = 0, n = e.length; r < n; ++r) t[r] = e.charCodeAt(r);
  return t;
}
function xh(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r) t[r] = String.fromCharCode(e.charCodeAt(2 * r) + (e.charCodeAt(2 * r + 1) << 8));
  return t.join("");
}
function cc(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r) t[r] = String.fromCharCode(e.charCodeAt(2 * r + 1) + (e.charCodeAt(2 * r) << 8));
  return t.join("");
}
var va = function(e) {
  var t = e.charCodeAt(0), r = e.charCodeAt(1);
  return t == 255 && r == 254 ? xh(e.slice(2)) : t == 254 && r == 255 ? cc(e.slice(2)) : t == 65279 ? e.slice(1) : e;
}, si = function(t) {
  return String.fromCharCode(t);
}, I0 = function(t) {
  return String.fromCharCode(t);
}, Ia, qt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function Ba(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, c = 0, o = 0; o < e.length; )
    r = e.charCodeAt(o++), i = r >> 2, n = e.charCodeAt(o++), s = (r & 3) << 4 | n >> 4, a = e.charCodeAt(o++), f = (n & 15) << 2 | a >> 6, c = a & 63, isNaN(n) ? f = c = 64 : isNaN(a) && (c = 64), t += qt.charAt(i) + qt.charAt(s) + qt.charAt(f) + qt.charAt(c);
  return t;
}
function Jr(e) {
  var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, c = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var o = 0; o < e.length; )
    i = qt.indexOf(e.charAt(o++)), s = qt.indexOf(e.charAt(o++)), r = i << 2 | s >> 4, t += String.fromCharCode(r), f = qt.indexOf(e.charAt(o++)), n = (s & 15) << 4 | f >> 2, f !== 64 && (t += String.fromCharCode(n)), c = qt.indexOf(e.charAt(o++)), a = (f & 3) << 6 | c, c !== 64 && (t += String.fromCharCode(a));
  return t;
}
var Ce = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), Ht = /* @__PURE__ */ function() {
  if (typeof Buffer < "u") {
    var e = !Buffer.from;
    if (!e) try {
      Buffer.from("foo", "utf8");
    } catch {
      e = !0;
    }
    return e ? function(t, r) {
      return r ? new Buffer(t, r) : new Buffer(t);
    } : Buffer.from.bind(Buffer);
  }
  return function() {
  };
}();
function en(e) {
  return Ce ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function B0(e) {
  return Ce ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var Yr = function(t) {
  return Ce ? Ht(t, "binary") : t.split("").map(function(r) {
    return r.charCodeAt(0) & 255;
  });
};
function Li(e) {
  if (typeof ArrayBuffer > "u") return Yr(e);
  for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), n = 0; n != e.length; ++n) r[n] = e.charCodeAt(n) & 255;
  return t;
}
function fn(e) {
  if (Array.isArray(e)) return e.map(function(n) {
    return String.fromCharCode(n);
  }).join("");
  for (var t = [], r = 0; r < e.length; ++r) t[r] = String.fromCharCode(e[r]);
  return t.join("");
}
function dh(e) {
  if (typeof Uint8Array > "u") throw new Error("Unsupported");
  return new Uint8Array(e);
}
function Rs(e) {
  if (typeof ArrayBuffer > "u") throw new Error("Unsupported");
  if (e instanceof ArrayBuffer) return Rs(new Uint8Array(e));
  for (var t = new Array(e.length), r = 0; r < e.length; ++r) t[r] = e[r];
  return t;
}
var pr = Ce ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : Ht(t);
  }));
} : function(e) {
  if (typeof Uint8Array < "u") {
    var t = 0, r = 0;
    for (t = 0; t < e.length; ++t) r += e[t].length;
    var n = new Uint8Array(r), a = 0;
    for (t = 0, r = 0; t < e.length; r += a, ++t)
      if (a = e[t].length, e[t] instanceof Uint8Array) n.set(e[t], r);
      else {
        if (typeof e[t] == "string")
          throw "wtf";
        n.set(new Uint8Array(e[t]), r);
      }
    return n;
  }
  return [].concat.apply([], e.map(function(i) {
    return Array.isArray(i) ? i : [].slice.call(i);
  }));
};
function gh(e) {
  for (var t = [], r = 0, n = e.length + 250, a = en(e.length + 255), i = 0; i < e.length; ++i) {
    var s = e.charCodeAt(i);
    if (s < 128) a[r++] = s;
    else if (s < 2048)
      a[r++] = 192 | s >> 6 & 31, a[r++] = 128 | s & 63;
    else if (s >= 55296 && s < 57344) {
      s = (s & 1023) + 64;
      var f = e.charCodeAt(++i) & 1023;
      a[r++] = 240 | s >> 8 & 7, a[r++] = 128 | s >> 2 & 63, a[r++] = 128 | f >> 6 & 15 | (s & 3) << 4, a[r++] = 128 | f & 63;
    } else
      a[r++] = 224 | s >> 12 & 15, a[r++] = 128 | s >> 6 & 63, a[r++] = 128 | s & 63;
    r > n && (t.push(a.slice(0, r)), r = 0, a = en(65535), n = 65530);
  }
  return t.push(a.slice(0, r)), pr(t);
}
var Mr = /\u0000/g, wa = /[\u0001-\u0006]/g;
function Gn(e) {
  for (var t = "", r = e.length - 1; r >= 0; ) t += e.charAt(r--);
  return t;
}
function pt(e, t) {
  var r = "" + e;
  return r.length >= t ? r : rr("0", t - r.length) + r;
}
function Ls(e, t) {
  var r = "" + e;
  return r.length >= t ? r : rr(" ", t - r.length) + r;
}
function Ei(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + rr(" ", t - r.length);
}
function mh(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : rr("0", t - r.length) + r;
}
function ph(e, t) {
  var r = "" + e;
  return r.length >= t ? r : rr("0", t - r.length) + r;
}
var D0 = /* @__PURE__ */ Math.pow(2, 32);
function Bn(e, t) {
  if (e > D0 || e < -D0) return mh(e, t);
  var r = Math.round(e);
  return ph(r, t);
}
function yi(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var R0 = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], qi = [
  ["J", "Jan", "January"],
  ["F", "Feb", "February"],
  ["M", "Mar", "March"],
  ["A", "Apr", "April"],
  ["M", "May", "May"],
  ["J", "Jun", "June"],
  ["J", "Jul", "July"],
  ["A", "Aug", "August"],
  ["S", "Sep", "September"],
  ["O", "Oct", "October"],
  ["N", "Nov", "November"],
  ["D", "Dec", "December"]
];
function vh(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var Ee = {
  0: "General",
  1: "0",
  2: "0.00",
  3: "#,##0",
  4: "#,##0.00",
  9: "0%",
  10: "0.00%",
  11: "0.00E+00",
  12: "# ?/?",
  13: "# ??/??",
  14: "m/d/yy",
  15: "d-mmm-yy",
  16: "d-mmm",
  17: "mmm-yy",
  18: "h:mm AM/PM",
  19: "h:mm:ss AM/PM",
  20: "h:mm",
  21: "h:mm:ss",
  22: "m/d/yy h:mm",
  37: "#,##0 ;(#,##0)",
  38: "#,##0 ;[Red](#,##0)",
  39: "#,##0.00;(#,##0.00)",
  40: "#,##0.00;[Red](#,##0.00)",
  45: "mm:ss",
  46: "[h]:mm:ss",
  47: "mmss.0",
  48: "##0.0E+0",
  49: "@",
  56: '"上午/下午 "hh"時"mm"分"ss"秒 "'
}, L0 = {
  5: 37,
  6: 38,
  7: 39,
  8: 40,
  //  5 -> 37 ...  8 -> 40
  23: 0,
  24: 0,
  25: 0,
  26: 0,
  // 23 ->  0 ... 26 ->  0
  27: 14,
  28: 14,
  29: 14,
  30: 14,
  31: 14,
  // 27 -> 14 ... 31 -> 14
  50: 14,
  51: 14,
  52: 14,
  53: 14,
  54: 14,
  // 50 -> 14 ... 58 -> 14
  55: 14,
  56: 14,
  57: 14,
  58: 14,
  59: 1,
  60: 2,
  61: 3,
  62: 4,
  // 59 ->  1 ... 62 ->  4
  67: 9,
  68: 10,
  // 67 ->  9 ... 68 -> 10
  69: 12,
  70: 13,
  71: 14,
  // 69 -> 12 ... 71 -> 14
  72: 14,
  73: 15,
  74: 16,
  75: 17,
  // 72 -> 14 ... 75 -> 17
  76: 20,
  77: 21,
  78: 22,
  // 76 -> 20 ... 78 -> 22
  79: 45,
  80: 46,
  81: 47,
  // 79 -> 45 ... 81 -> 47
  82: 0
  // 82 ->  0 ... 65536 -> 0 (omitted)
}, wh = {
  //  5 -- Currency,   0 decimal, black negative
  5: '"$"#,##0_);\\("$"#,##0\\)',
  63: '"$"#,##0_);\\("$"#,##0\\)',
  //  6 -- Currency,   0 decimal, red   negative
  6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  //  7 -- Currency,   2 decimal, black negative
  7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  //  8 -- Currency,   2 decimal, red   negative
  8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  // 41 -- Accounting, 0 decimal, No Symbol
  41: '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',
  // 42 -- Accounting, 0 decimal, $  Symbol
  42: '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',
  // 43 -- Accounting, 2 decimal, No Symbol
  43: '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',
  // 44 -- Accounting, 2 decimal, $  Symbol
  44: '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)'
};
function Ti(e, t, r) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, f = 0, c = 1, o = 0, l = 0, h = Math.floor(a); o < t && (h = Math.floor(a), f = h * s + i, l = h * o + c, !(a - h < 5e-8)); )
    a = 1 / (a - h), i = s, s = f, c = o, o = l;
  if (l > t && (o > t ? (l = c, f = i) : (l = o, f = s)), !r) return [0, n * f, l];
  var u = Math.floor(n * f / l);
  return [u, n * f - u * l, l];
}
function dn(e, t, r) {
  if (e > 2958465 || e < 0) return null;
  var n = e | 0, a = Math.floor(86400 * (e - n)), i = 0, s = [], f = { D: n, T: a, u: 86400 * (e - n) - a, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(f.u) < 1e-6 && (f.u = 0), t && t.date1904 && (n += 1462), f.u > 0.9999 && (f.u = 0, ++a == 86400 && (f.T = a = 0, ++n, ++f.D)), n === 60)
    s = r ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (n === 0)
    s = r ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    n > 60 && --n;
    var c = new Date(1900, 0, 1);
    c.setDate(c.getDate() + n - 1), s = [c.getFullYear(), c.getMonth() + 1, c.getDate()], i = c.getDay(), n < 60 && (i = (i + 6) % 7), r && (i = kh(c, s));
  }
  return f.y = s[0], f.m = s[1], f.d = s[2], f.S = a % 60, a = Math.floor(a / 60), f.M = a % 60, a = Math.floor(a / 60), f.H = a, f.q = i, f;
}
var oc = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), _h = /* @__PURE__ */ oc.getTime(), Eh = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function lc(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  return t ? r -= 1461 * 24 * 60 * 60 * 1e3 : e >= Eh && (r += 24 * 60 * 60 * 1e3), (r - (_h + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ oc.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function Ps(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function yh(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function Th(e) {
  var t = e < 0 ? 12 : 11, r = Ps(e.toFixed(12));
  return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5);
}
function Sh(e) {
  var t = Ps(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function Da(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), r;
  return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = Th(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = Sh(e), Ps(yh(r.toUpperCase()));
}
function _n(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : Da(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return ht(14, lc(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function kh(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return e < 60 && (r = (r + 6) % 7), r;
}
function Ah(e, t, r, n) {
  var a = "", i = 0, s = 0, f = r.y, c, o = 0;
  switch (e) {
    case 98:
      f = r.y + 543;
    case 121:
      switch (t.length) {
        case 1:
        case 2:
          c = f % 100, o = 2;
          break;
        default:
          c = f % 1e4, o = 4;
          break;
      }
      break;
    case 109:
      switch (t.length) {
        case 1:
        case 2:
          c = r.m, o = t.length;
          break;
        case 3:
          return qi[r.m - 1][1];
        case 5:
          return qi[r.m - 1][0];
        default:
          return qi[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          c = r.d, o = t.length;
          break;
        case 3:
          return R0[r.q][0];
        default:
          return R0[r.q][1];
      }
      break;
    case 104:
      switch (t.length) {
        case 1:
        case 2:
          c = 1 + (r.H + 11) % 12, o = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 72:
      switch (t.length) {
        case 1:
        case 2:
          c = r.H, o = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 77:
      switch (t.length) {
        case 1:
        case 2:
          c = r.M, o = t.length;
          break;
        default:
          throw "bad minute format: " + t;
      }
      break;
    case 115:
      if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000") throw "bad second format: " + t;
      return r.u === 0 && (t == "s" || t == "ss") ? pt(r.S, t.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, i = Math.round(s * (r.S + r.u)), i >= 60 * s && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / s : (a = pt(i, 2 + n), t === "ss" ? a.substr(0, 2) : "." + a.substr(2, t.length - 1)));
    case 90:
      switch (t) {
        case "[h]":
        case "[hh]":
          c = r.D * 24 + r.H;
          break;
        case "[m]":
        case "[mm]":
          c = (r.D * 24 + r.H) * 60 + r.M;
          break;
        case "[s]":
        case "[ss]":
          c = ((r.D * 24 + r.H) * 60 + r.M) * 60 + Math.round(r.S + r.u);
          break;
        default:
          throw "bad abstime format: " + t;
      }
      o = t.length === 3 ? 1 : 2;
      break;
    case 101:
      c = f, o = 1;
      break;
  }
  var l = o > 0 ? pt(c, o) : "";
  return l;
}
function Zt(e) {
  var t = 3;
  if (e.length <= t) return e;
  for (var r = e.length % t, n = e.substr(0, r); r != e.length; r += t) n += (n.length > 0 ? "," : "") + e.substr(r, t);
  return n;
}
var hc = /%/g;
function Fh(e, t, r) {
  var n = t.replace(hc, ""), a = t.length - n.length;
  return Lt(e, n, r * Math.pow(10, 2 * a)) + rr("%", a);
}
function bh(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; ) --n;
  return Lt(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function uc(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + uc(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), r.indexOf("e") === -1) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      for (r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i); r.substr(0, 2) === "0."; )
        r = r.charAt(0) + r.substr(2, a) + "." + r.substr(2 + a), r = r.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, c, o, l) {
      return c + o + l.substr(0, (a + i) % a) + "." + l.substr(i) + "E";
    });
  } else r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
var xc = /# (\?+)( ?)\/( ?)(\d+)/;
function Ch(e, t, r) {
  var n = parseInt(e[4], 10), a = Math.round(t * n), i = Math.floor(a / n), s = a - i * n, f = n;
  return r + (i === 0 ? "" : "" + i) + " " + (s === 0 ? rr(" ", e[1].length + 1 + e[4].length) : Ls(s, e[1].length) + e[2] + "/" + e[3] + pt(f, e[4].length));
}
function Oh(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + rr(" ", e[1].length + 2 + e[4].length);
}
var dc = /^#*0*\.([0#]+)/, gc = /\).*[0#]/, mc = /\(###\) ###\\?-####/;
function Dr(e) {
  for (var t = "", r, n = 0; n != e.length; ++n) switch (r = e.charCodeAt(n)) {
    case 35:
      break;
    case 63:
      t += " ";
      break;
    case 48:
      t += "0";
      break;
    default:
      t += String.fromCharCode(r);
  }
  return t;
}
function P0(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function M0(e, t) {
  var r = e - Math.floor(e), n = Math.pow(10, t);
  return t < ("" + Math.round(r * n)).length ? 0 : Math.round(r * n);
}
function Nh(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function Ih(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function nt(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(gc)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? nt("n", n, r) : "(" + nt("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return bh(e, t, r);
  if (t.indexOf("%") !== -1) return Fh(e, t, r);
  if (t.indexOf("E") !== -1) return uc(t, r);
  if (t.charCodeAt(0) === 36) return "$" + nt(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, c = Math.abs(r), o = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return o + Bn(c, t.length);
  if (t.match(/^[#?]+$/))
    return a = Bn(r, 0), a === "0" && (a = ""), a.length > t.length ? a : Dr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(xc)) return Ch(i, c, o);
  if (t.match(/^#+0+$/)) return o + Bn(c, t.length - t.indexOf("0"));
  if (i = t.match(dc))
    return a = P0(r, i[1].length).replace(/^([^\.]+)$/, "$1." + Dr(i[1])).replace(/\.$/, "." + Dr(i[1])).replace(/\.(\d*)$/, function(g, d) {
      return "." + d + rr("0", Dr(
        /*::(*/
        i[1]
      ).length - d.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return o + P0(c, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return o + Zt(Bn(c, 0));
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + nt(e, t, -r) : Zt("" + (Math.floor(r) + Nh(r, i[1].length))) + "." + pt(M0(r, i[1].length), i[1].length);
  if (i = t.match(/^#,#*,#0/)) return nt(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = Gn(nt(e, t.replace(/[\\-]/g, ""), r)), s = 0, Gn(Gn(t.replace(/\\/g, "")).replace(/[0#]/g, function(g) {
      return s < a.length ? a.charAt(s++) : g === "0" ? "0" : "";
    }));
  if (t.match(mc))
    return a = nt(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var l = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = Ti(c, Math.pow(10, s) - 1, !1), a = "" + o, l = Lt(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), l.charAt(l.length - 1) == " " && (l = l.substr(0, l.length - 1) + "0"), a += l + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], l = Ei(f[2], s), l.length < i[4].length && (l = Dr(i[4].substr(i[4].length - l.length)) + l), a += l, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = Ti(c, Math.pow(10, s) - 1, !0), o + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? Ls(f[1], s) + i[2] + "/" + i[3] + Ei(f[2], s) : rr(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = Bn(r, 0), t.length <= a.length ? a : Dr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var h = t.indexOf(".") - s, u = t.length - a.length - h;
    return Dr(t.substr(0, h) + a + t.substr(t.length - u));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return s = M0(r, i[1].length), r < 0 ? "-" + nt(e, t, -r) : Zt(Ih(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(g) {
      return "00," + (g.length < 3 ? pt(0, 3 - g.length) : "") + g;
    }) + "." + pt(s, i[1].length);
  switch (t) {
    case "###,##0.00":
      return nt(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var x = Zt(Bn(c, 0));
      return x !== "0" ? o + x : "";
    case "###,###.00":
      return nt(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return nt(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function Bh(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; ) --n;
  return Lt(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function Dh(e, t, r) {
  var n = t.replace(hc, ""), a = t.length - n.length;
  return Lt(e, n, r * Math.pow(10, 2 * a)) + rr("%", a);
}
function pc(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + pc(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), !r.match(/[Ee]/)) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i), r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, c, o, l) {
      return c + o + l.substr(0, (a + i) % a) + "." + l.substr(i) + "E";
    });
  } else r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
function St(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(gc)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? St("n", n, r) : "(" + St("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return Bh(e, t, r);
  if (t.indexOf("%") !== -1) return Dh(e, t, r);
  if (t.indexOf("E") !== -1) return pc(t, r);
  if (t.charCodeAt(0) === 36) return "$" + St(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, c = Math.abs(r), o = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return o + pt(c, t.length);
  if (t.match(/^[#?]+$/))
    return a = "" + r, r === 0 && (a = ""), a.length > t.length ? a : Dr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(xc)) return Oh(i, c, o);
  if (t.match(/^#+0+$/)) return o + pt(c, t.length - t.indexOf("0"));
  if (i = t.match(dc))
    return a = ("" + r).replace(/^([^\.]+)$/, "$1." + Dr(i[1])).replace(/\.$/, "." + Dr(i[1])), a = a.replace(/\.(\d*)$/, function(g, d) {
      return "." + d + rr("0", Dr(i[1]).length - d.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return o + ("" + c).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return o + Zt("" + c);
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + St(e, t, -r) : Zt("" + r) + "." + rr("0", i[1].length);
  if (i = t.match(/^#,#*,#0/)) return St(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = Gn(St(e, t.replace(/[\\-]/g, ""), r)), s = 0, Gn(Gn(t.replace(/\\/g, "")).replace(/[0#]/g, function(g) {
      return s < a.length ? a.charAt(s++) : g === "0" ? "0" : "";
    }));
  if (t.match(mc))
    return a = St(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var l = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = Ti(c, Math.pow(10, s) - 1, !1), a = "" + o, l = Lt(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), l.charAt(l.length - 1) == " " && (l = l.substr(0, l.length - 1) + "0"), a += l + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], l = Ei(f[2], s), l.length < i[4].length && (l = Dr(i[4].substr(i[4].length - l.length)) + l), a += l, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = Ti(c, Math.pow(10, s) - 1, !0), o + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? Ls(f[1], s) + i[2] + "/" + i[3] + Ei(f[2], s) : rr(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = "" + r, t.length <= a.length ? a : Dr(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var h = t.indexOf(".") - s, u = t.length - a.length - h;
    return Dr(t.substr(0, h) + a + t.substr(t.length - u));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return r < 0 ? "-" + St(e, t, -r) : Zt("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(g) {
      return "00," + (g.length < 3 ? pt(0, 3 - g.length) : "") + g;
    }) + "." + pt(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var x = Zt("" + c);
      return x !== "0" ? o + x : "";
    default:
      if (t.match(/\.[0#?]*$/)) return St(e, t.slice(0, t.lastIndexOf(".")), r) + Dr(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function Lt(e, t, r) {
  return (r | 0) === r ? St(e, t, r) : nt(e, t, r);
}
function Rh(e) {
  for (var t = [], r = !1, n = 0, a = 0; n < e.length; ++n) switch (
    /*cc=*/
    e.charCodeAt(n)
  ) {
    case 34:
      r = !r;
      break;
    case 95:
    case 42:
    case 92:
      ++n;
      break;
    case 59:
      t[t.length] = e.substr(a, n - a), a = n + 1;
  }
  if (t[t.length] = e.substr(a), r === !0) throw new Error("Format |" + e + "| unterminated string ");
  return t;
}
var vc = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function ra(e) {
  for (var t = 0, r = "", n = ""; t < e.length; )
    switch (r = e.charAt(t)) {
      case "G":
        yi(e, t) && (t += 6), t++;
        break;
      case '"':
        for (
          ;
          /*cc=*/
          e.charCodeAt(++t) !== 34 && t < e.length;
        )
          ;
        ++t;
        break;
      case "\\":
        t += 2;
        break;
      case "_":
        t += 2;
        break;
      case "@":
        ++t;
        break;
      case "B":
      case "b":
        if (e.charAt(t + 1) === "1" || e.charAt(t + 1) === "2") return !0;
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        return !0;
      case "A":
      case "a":
      case "上":
        if (e.substr(t, 3).toUpperCase() === "A/P" || e.substr(t, 5).toUpperCase() === "AM/PM" || e.substr(t, 5).toUpperCase() === "上午/下午") return !0;
        ++t;
        break;
      case "[":
        for (n = r; e.charAt(t++) !== "]" && t < e.length; ) n += e.charAt(t);
        if (n.match(vc)) return !0;
        break;
      case ".":
      case "0":
      case "#":
        for (; t < e.length && ("0#?.,E+-%".indexOf(r = e.charAt(++t)) > -1 || r == "\\" && e.charAt(t + 1) == "-" && "0#".indexOf(e.charAt(t + 2)) > -1); )
          ;
        break;
      case "?":
        for (; e.charAt(++t) === r; )
          ;
        break;
      case "*":
        ++t, (e.charAt(t) == " " || e.charAt(t) == "*") && ++t;
        break;
      case "(":
      case ")":
        ++t;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (; t < e.length && "0123456789".indexOf(e.charAt(++t)) > -1; )
          ;
        break;
      case " ":
        ++t;
        break;
      default:
        ++t;
        break;
    }
  return !1;
}
function Lh(e, t, r, n) {
  for (var a = [], i = "", s = 0, f = "", c = "t", o, l, h, u = "H"; s < e.length; )
    switch (f = e.charAt(s)) {
      case "G":
        if (!yi(e, s)) throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "G", v: "General" }, s += 7;
        break;
      case '"':
        for (i = ""; (h = e.charCodeAt(++s)) !== 34 && s < e.length; ) i += String.fromCharCode(h);
        a[a.length] = { t: "t", v: i }, ++s;
        break;
      case "\\":
        var x = e.charAt(++s), g = x === "(" || x === ")" ? x : "t";
        a[a.length] = { t: g, v: x }, ++s;
        break;
      case "_":
        a[a.length] = { t: "t", v: " " }, s += 2;
        break;
      case "@":
        a[a.length] = { t: "T", v: t }, ++s;
        break;
      case "B":
      case "b":
        if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
          if (o == null && (o = dn(t, r, e.charAt(s + 1) === "2"), o == null))
            return "";
          a[a.length] = { t: "X", v: e.substr(s, 2) }, c = f, s += 2;
          break;
        }
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
        f = f.toLowerCase();
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        if (t < 0 || o == null && (o = dn(t, r), o == null))
          return "";
        for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f; ) i += f;
        f === "m" && c.toLowerCase() === "h" && (f = "M"), f === "h" && (f = u), a[a.length] = { t: f, v: i }, c = f;
        break;
      case "A":
      case "a":
      case "上":
        var d = { t: f, v: f };
        if (o == null && (o = dn(t, r)), e.substr(s, 3).toUpperCase() === "A/P" ? (o != null && (d.v = o.H >= 12 ? "P" : "A"), d.t = "T", u = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (o != null && (d.v = o.H >= 12 ? "PM" : "AM"), d.t = "T", s += 5, u = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (o != null && (d.v = o.H >= 12 ? "下午" : "上午"), d.t = "T", s += 5, u = "h") : (d.t = "t", ++s), o == null && d.t === "T") return "";
        a[a.length] = d, c = f;
        break;
      case "[":
        for (i = f; e.charAt(s++) !== "]" && s < e.length; ) i += e.charAt(s);
        if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
        if (i.match(vc)) {
          if (o == null && (o = dn(t, r), o == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, c = i.charAt(1);
        } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", ra(e) || (a[a.length] = { t: "t", v: i }));
        break;
      case ".":
        if (o != null) {
          for (i = f; ++s < e.length && (f = e.charAt(s)) === "0"; ) i += f;
          a[a.length] = { t: "s", v: i };
          break;
        }
      case "0":
      case "#":
        for (i = f; ++s < e.length && "0#?.,E+-%".indexOf(f = e.charAt(s)) > -1; ) i += f;
        a[a.length] = { t: "n", v: i };
        break;
      case "?":
        for (i = f; e.charAt(++s) === f; ) i += f;
        a[a.length] = { t: f, v: i }, c = f;
        break;
      case "*":
        ++s, (e.charAt(s) == " " || e.charAt(s) == "*") && ++s;
        break;
      case "(":
      case ")":
        a[a.length] = { t: n === 1 ? "t" : f, v: f }, ++s;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (i = f; s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1; ) i += e.charAt(s);
        a[a.length] = { t: "D", v: i };
        break;
      case " ":
        a[a.length] = { t: f, v: f }, ++s;
        break;
      case "$":
        a[a.length] = { t: "t", v: "$" }, ++s;
        break;
      default:
        if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(f) === -1) throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "t", v: f }, ++s;
        break;
    }
  var m = 0, w = 0, y;
  for (s = a.length - 1, c = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = u, c = "h", m < 1 && (m = 1);
        break;
      case "s":
        (y = a[s].v.match(/\.0+$/)) && (w = Math.max(w, y[0].length - 1)), m < 3 && (m = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        c = a[s].t;
        break;
      case "m":
        c === "s" && (a[s].t = "M", m < 2 && (m = 2));
        break;
      case "X":
        break;
      case "Z":
        m < 1 && a[s].v.match(/[Hh]/) && (m = 1), m < 2 && a[s].v.match(/[Mm]/) && (m = 2), m < 3 && a[s].v.match(/[Ss]/) && (m = 3);
    }
  switch (m) {
    case 0:
      break;
    case 1:
      o.u >= 0.5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M), o.M >= 60 && (o.M = 0, ++o.H);
      break;
    case 2:
      o.u >= 0.5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M);
      break;
  }
  var v = "", I;
  for (s = 0; s < a.length; ++s)
    switch (a[s].t) {
      case "t":
      case "T":
      case " ":
      case "D":
        break;
      case "X":
        a[s].v = "", a[s].t = ";";
        break;
      case "d":
      case "m":
      case "y":
      case "h":
      case "H":
      case "M":
      case "s":
      case "e":
      case "b":
      case "Z":
        a[s].v = Ah(a[s].t.charCodeAt(0), a[s].v, o, w), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (I = s + 1; a[I] != null && ((f = a[I].t) === "?" || f === "D" || (f === " " || f === "t") && a[I + 1] != null && (a[I + 1].t === "?" || a[I + 1].t === "t" && a[I + 1].v === "/") || a[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (a[I].v === "/" || a[I].v === " " && a[I + 1] != null && a[I + 1].t == "?")); )
          a[s].v += a[I].v, a[I] = { v: "", t: ";" }, ++I;
        v += a[s].v, s = I - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = _n(t, r);
        break;
    }
  var T = "", N, k;
  if (v.length > 0) {
    v.charCodeAt(0) == 40 ? (N = t < 0 && v.charCodeAt(0) === 45 ? -t : t, k = Lt("n", v, N)) : (N = t < 0 && n > 1 ? -t : t, k = Lt("n", v, N), N < 0 && a[0] && a[0].t == "t" && (k = k.substr(1), a[0].v = "-" + a[0].v)), I = k.length - 1;
    var U = a.length;
    for (s = 0; s < a.length; ++s) if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
      U = s;
      break;
    }
    var C = a.length;
    if (U === a.length && k.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null || "n?".indexOf(a[s].t) === -1 || (I >= a[s].v.length - 1 ? (I -= a[s].v.length, a[s].v = k.substr(I + 1, a[s].v.length)) : I < 0 ? a[s].v = "" : (a[s].v = k.substr(0, I + 1), I = -1), a[s].t = "t", C = s);
      I >= 0 && C < a.length && (a[C].v = k.substr(0, I + 1) + a[C].v);
    } else if (U !== a.length && k.indexOf("E") === -1) {
      for (I = k.indexOf(".") - 1, s = U; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (l = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, T = a[s].v.substr(l + 1); l >= 0; --l)
            I >= 0 && (a[s].v.charAt(l) === "0" || a[s].v.charAt(l) === "#") && (T = k.charAt(I--) + T);
          a[s].v = T, a[s].t = "t", C = s;
        }
      for (I >= 0 && C < a.length && (a[C].v = k.substr(0, I + 1) + a[C].v), I = k.indexOf(".") + 1, s = U; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== U)) {
          for (l = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") + 1 : 0, T = a[s].v.substr(0, l); l < a[s].v.length; ++l)
            I < k.length && (T += k.charAt(I++));
          a[s].v = T, a[s].t = "t", C = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s) a[s] != null && "n?".indexOf(a[s].t) > -1 && (N = n > 1 && t < 0 && s > 0 && a[s - 1].v === "-" ? -t : t, a[s].v = Lt(a[s].t, a[s].v, N), a[s].t = "t");
  var D = "";
  for (s = 0; s !== a.length; ++s) a[s] != null && (D += a[s].v);
  return D;
}
var U0 = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function W0(e, t) {
  if (t == null) return !1;
  var r = parseFloat(t[2]);
  switch (t[1]) {
    case "=":
      if (e == r) return !0;
      break;
    case ">":
      if (e > r) return !0;
      break;
    case "<":
      if (e < r) return !0;
      break;
    case "<>":
      if (e != r) return !0;
      break;
    case ">=":
      if (e >= r) return !0;
      break;
    case "<=":
      if (e <= r) return !0;
      break;
  }
  return !1;
}
function Ph(e, t) {
  var r = Rh(e), n = r.length, a = r[n - 1].indexOf("@");
  if (n < 4 && a > -1 && --n, r.length > 4) throw new Error("cannot find right format for |" + r.join("|") + "|");
  if (typeof t != "number") return [4, r.length === 4 || a > -1 ? r[r.length - 1] : "@"];
  switch (r.length) {
    case 1:
      r = a > -1 ? ["General", "General", "General", r[0]] : [r[0], r[0], r[0], "@"];
      break;
    case 2:
      r = a > -1 ? [r[0], r[0], r[0], r[1]] : [r[0], r[1], r[0], "@"];
      break;
    case 3:
      r = a > -1 ? [r[0], r[1], r[0], r[2]] : [r[0], r[1], r[2], "@"];
      break;
  }
  var i = t > 0 ? r[0] : t < 0 ? r[1] : r[2];
  if (r[0].indexOf("[") === -1 && r[1].indexOf("[") === -1) return [n, i];
  if (r[0].match(/\[[=<>]/) != null || r[1].match(/\[[=<>]/) != null) {
    var s = r[0].match(U0), f = r[1].match(U0);
    return W0(t, s) ? [n, r[0]] : W0(t, f) ? [n, r[1]] : [n, r[s != null && f != null ? 2 : 1]];
  }
  return [n, i];
}
function ht(e, t, r) {
  r == null && (r = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? n = r.dateNF : n = e;
      break;
    case "number":
      e == 14 && r.dateNF ? n = r.dateNF : n = (r.table != null ? r.table : Ee)[e], n == null && (n = r.table && r.table[L0[e]] || Ee[L0[e]]), n == null && (n = wh[e] || "General");
      break;
  }
  if (yi(n, 0)) return _n(t, r);
  t instanceof Date && (t = lc(t, r.date1904));
  var a = Ph(n, t);
  if (yi(a[1])) return _n(t, r);
  if (t === !0) t = "TRUE";
  else if (t === !1) t = "FALSE";
  else if (t === "" || t == null) return "";
  return Lh(a[1], t, r, a[0]);
}
function Pt(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var r = 0; r < 392; ++r) {
      if (Ee[r] == null) {
        t < 0 && (t = r);
        continue;
      }
      if (Ee[r] == e) {
        t = r;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return Ee[t] = e, t;
}
function Pi(e) {
  for (var t = 0; t != 392; ++t)
    e[t] !== void 0 && Pt(e[t], t);
}
function ta() {
  Ee = vh();
}
var Mh = {
  5: '"$"#,##0_);\\("$"#,##0\\)',
  6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  23: "General",
  24: "General",
  25: "General",
  26: "General",
  27: "m/d/yy",
  28: "m/d/yy",
  29: "m/d/yy",
  30: "m/d/yy",
  31: "m/d/yy",
  32: "h:mm:ss",
  33: "h:mm:ss",
  34: "h:mm:ss",
  35: "h:mm:ss",
  36: "m/d/yy",
  41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
  42: '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',
  43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
  44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
  50: "m/d/yy",
  51: "m/d/yy",
  52: "m/d/yy",
  53: "m/d/yy",
  54: "m/d/yy",
  55: "m/d/yy",
  56: "m/d/yy",
  57: "m/d/yy",
  58: "m/d/yy",
  59: "0",
  60: "0.00",
  61: "#,##0",
  62: "#,##0.00",
  63: '"$"#,##0_);\\("$"#,##0\\)',
  64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  67: "0%",
  68: "0.00%",
  69: "# ?/?",
  70: "# ??/??",
  71: "m/d/yy",
  72: "m/d/yy",
  73: "d-mmm-yy",
  74: "d-mmm",
  75: "mmm-yy",
  76: "h:mm",
  77: "h:mm:ss",
  78: "m/d/yy h:mm",
  79: "mm:ss",
  80: "[h]:mm:ss",
  81: "mmss.0"
}, wc = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function Uh(e) {
  var t = typeof e == "number" ? Ee[e] : e;
  return t = t.replace(wc, "(\\d+)"), new RegExp("^" + t + "$");
}
function Wh(e, t, r) {
  var n = -1, a = -1, i = -1, s = -1, f = -1, c = -1;
  (t.match(wc) || []).forEach(function(h, u) {
    var x = parseInt(r[u + 1], 10);
    switch (h.toLowerCase().charAt(0)) {
      case "y":
        n = x;
        break;
      case "d":
        i = x;
        break;
      case "h":
        s = x;
        break;
      case "s":
        c = x;
        break;
      case "m":
        s >= 0 ? f = x : a = x;
        break;
    }
  }), c >= 0 && f == -1 && a >= 0 && (f = a, a = -1);
  var o = ("" + (n >= 0 ? n : (/* @__PURE__ */ new Date()).getFullYear())).slice(-4) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
  o.length == 7 && (o = "0" + o), o.length == 8 && (o = "20" + o);
  var l = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (c >= 0 ? c : 0)).slice(-2);
  return s == -1 && f == -1 && c == -1 ? o : n == -1 && a == -1 && i == -1 ? l : o + "T" + l;
}
var Hh = /* @__PURE__ */ function() {
  var e = {};
  e.version = "1.2.0";
  function t() {
    for (var k = 0, U = new Array(256), C = 0; C != 256; ++C)
      k = C, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, k = k & 1 ? -306674912 ^ k >>> 1 : k >>> 1, U[C] = k;
    return typeof Int32Array < "u" ? new Int32Array(U) : U;
  }
  var r = t();
  function n(k) {
    var U = 0, C = 0, D = 0, M = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (D = 0; D != 256; ++D) M[D] = k[D];
    for (D = 0; D != 256; ++D)
      for (C = k[D], U = 256 + D; U < 4096; U += 256) C = M[U] = C >>> 8 ^ k[C & 255];
    var B = [];
    for (D = 1; D != 16; ++D) B[D - 1] = typeof Int32Array < "u" ? M.subarray(D * 256, D * 256 + 256) : M.slice(D * 256, D * 256 + 256);
    return B;
  }
  var a = n(r), i = a[0], s = a[1], f = a[2], c = a[3], o = a[4], l = a[5], h = a[6], u = a[7], x = a[8], g = a[9], d = a[10], m = a[11], w = a[12], y = a[13], v = a[14];
  function I(k, U) {
    for (var C = U ^ -1, D = 0, M = k.length; D < M; ) C = C >>> 8 ^ r[(C ^ k.charCodeAt(D++)) & 255];
    return ~C;
  }
  function T(k, U) {
    for (var C = U ^ -1, D = k.length - 15, M = 0; M < D; ) C = v[k[M++] ^ C & 255] ^ y[k[M++] ^ C >> 8 & 255] ^ w[k[M++] ^ C >> 16 & 255] ^ m[k[M++] ^ C >>> 24] ^ d[k[M++]] ^ g[k[M++]] ^ x[k[M++]] ^ u[k[M++]] ^ h[k[M++]] ^ l[k[M++]] ^ o[k[M++]] ^ c[k[M++]] ^ f[k[M++]] ^ s[k[M++]] ^ i[k[M++]] ^ r[k[M++]];
    for (D += 15; M < D; ) C = C >>> 8 ^ r[(C ^ k[M++]) & 255];
    return ~C;
  }
  function N(k, U) {
    for (var C = U ^ -1, D = 0, M = k.length, B = 0, Y = 0; D < M; )
      B = k.charCodeAt(D++), B < 128 ? C = C >>> 8 ^ r[(C ^ B) & 255] : B < 2048 ? (C = C >>> 8 ^ r[(C ^ (192 | B >> 6 & 31)) & 255], C = C >>> 8 ^ r[(C ^ (128 | B & 63)) & 255]) : B >= 55296 && B < 57344 ? (B = (B & 1023) + 64, Y = k.charCodeAt(D++) & 1023, C = C >>> 8 ^ r[(C ^ (240 | B >> 8 & 7)) & 255], C = C >>> 8 ^ r[(C ^ (128 | B >> 2 & 63)) & 255], C = C >>> 8 ^ r[(C ^ (128 | Y >> 6 & 15 | (B & 3) << 4)) & 255], C = C >>> 8 ^ r[(C ^ (128 | Y & 63)) & 255]) : (C = C >>> 8 ^ r[(C ^ (224 | B >> 12 & 15)) & 255], C = C >>> 8 ^ r[(C ^ (128 | B >> 6 & 63)) & 255], C = C >>> 8 ^ r[(C ^ (128 | B & 63)) & 255]);
    return ~C;
  }
  return e.table = r, e.bstr = I, e.buf = T, e.str = N, e;
}(), ve = /* @__PURE__ */ function() {
  var t = {};
  t.version = "1.2.1";
  function r(p, S) {
    for (var _ = p.split("/"), E = S.split("/"), A = 0, F = 0, z = Math.min(_.length, E.length); A < z; ++A) {
      if (F = _[A].length - E[A].length) return F;
      if (_[A] != E[A]) return _[A] < E[A] ? -1 : 1;
    }
    return _.length - E.length;
  }
  function n(p) {
    if (p.charAt(p.length - 1) == "/") return p.slice(0, -1).indexOf("/") === -1 ? p : n(p.slice(0, -1));
    var S = p.lastIndexOf("/");
    return S === -1 ? p : p.slice(0, S + 1);
  }
  function a(p) {
    if (p.charAt(p.length - 1) == "/") return a(p.slice(0, -1));
    var S = p.lastIndexOf("/");
    return S === -1 ? p : p.slice(S + 1);
  }
  function i(p, S) {
    typeof S == "string" && (S = new Date(S));
    var _ = S.getHours();
    _ = _ << 6 | S.getMinutes(), _ = _ << 5 | S.getSeconds() >>> 1, p.write_shift(2, _);
    var E = S.getFullYear() - 1980;
    E = E << 4 | S.getMonth() + 1, E = E << 5 | S.getDate(), p.write_shift(2, E);
  }
  function s(p) {
    var S = p.read_shift(2) & 65535, _ = p.read_shift(2) & 65535, E = /* @__PURE__ */ new Date(), A = _ & 31;
    _ >>>= 5;
    var F = _ & 15;
    _ >>>= 4, E.setMilliseconds(0), E.setFullYear(_ + 1980), E.setMonth(F - 1), E.setDate(A);
    var z = S & 31;
    S >>>= 5;
    var Z = S & 63;
    return S >>>= 6, E.setHours(S), E.setMinutes(Z), E.setSeconds(z << 1), E;
  }
  function f(p) {
    _r(p, 0);
    for (var S = (
      /*::(*/
      {}
    ), _ = 0; p.l <= p.length - 4; ) {
      var E = p.read_shift(2), A = p.read_shift(2), F = p.l + A, z = {};
      switch (E) {
        case 21589:
          _ = p.read_shift(1), _ & 1 && (z.mtime = p.read_shift(4)), A > 5 && (_ & 2 && (z.atime = p.read_shift(4)), _ & 4 && (z.ctime = p.read_shift(4))), z.mtime && (z.mt = new Date(z.mtime * 1e3));
          break;
      }
      p.l = F, S[E] = z;
    }
    return S;
  }
  var c;
  function o() {
    return c || (c = {});
  }
  function l(p, S) {
    if (p[0] == 80 && p[1] == 75) return O0(p, S);
    if ((p[0] | 32) == 109 && (p[1] | 32) == 105) return Ql(p, S);
    if (p.length < 512) throw new Error("CFB file size " + p.length + " < 512");
    var _ = 3, E = 512, A = 0, F = 0, z = 0, Z = 0, V = 0, G = [], X = (
      /*::(*/
      p.slice(0, 512)
    );
    _r(X, 0);
    var ae = h(X);
    switch (_ = ae[0], _) {
      case 3:
        E = 512;
        break;
      case 4:
        E = 4096;
        break;
      case 0:
        if (ae[1] == 0) return O0(p, S);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + _);
    }
    E !== 512 && (X = /*::(*/
    p.slice(0, E), _r(
      X,
      28
      /* blob.l */
    ));
    var ue = p.slice(0, E);
    u(X, _);
    var me = X.read_shift(4, "i");
    if (_ === 3 && me !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + me);
    X.l += 4, z = X.read_shift(4, "i"), X.l += 4, X.chk("00100000", "Mini Stream Cutoff Size: "), Z = X.read_shift(4, "i"), A = X.read_shift(4, "i"), V = X.read_shift(4, "i"), F = X.read_shift(4, "i");
    for (var se = -1, de = 0; de < 109 && (se = X.read_shift(4, "i"), !(se < 0)); ++de)
      G[de] = se;
    var ke = x(p, E);
    m(V, F, ke, E, G);
    var Je = y(ke, z, G, E);
    Je[z].name = "!Directory", A > 0 && Z !== Y && (Je[Z].name = "!MiniFAT"), Je[G[0]].name = "!FAT", Je.fat_addrs = G, Je.ssz = E;
    var qe = {}, yr = [], ua = [], xa = [];
    v(z, Je, ke, yr, A, qe, ua, Z), g(ua, xa, yr), yr.shift();
    var da = {
      FileIndex: ua,
      FullPaths: xa
    };
    return S && S.raw && (da.raw = { header: ue, sectors: ke }), da;
  }
  function h(p) {
    if (p[p.l] == 80 && p[p.l + 1] == 75) return [0, 0];
    p.chk(he, "Header Signature: "), p.l += 16;
    var S = p.read_shift(2, "u");
    return [p.read_shift(2, "u"), S];
  }
  function u(p, S) {
    var _ = 9;
    switch (p.l += 2, _ = p.read_shift(2)) {
      case 9:
        if (S != 3) throw new Error("Sector Shift: Expected 9 saw " + _);
        break;
      case 12:
        if (S != 4) throw new Error("Sector Shift: Expected 12 saw " + _);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + _);
    }
    p.chk("0600", "Mini Sector Shift: "), p.chk("000000000000", "Reserved: ");
  }
  function x(p, S) {
    for (var _ = Math.ceil(p.length / S) - 1, E = [], A = 1; A < _; ++A) E[A - 1] = p.slice(A * S, (A + 1) * S);
    return E[_ - 1] = p.slice(_ * S), E;
  }
  function g(p, S, _) {
    for (var E = 0, A = 0, F = 0, z = 0, Z = 0, V = _.length, G = [], X = []; E < V; ++E)
      G[E] = X[E] = E, S[E] = _[E];
    for (; Z < X.length; ++Z)
      E = X[Z], A = p[E].L, F = p[E].R, z = p[E].C, G[E] === E && (A !== -1 && G[A] !== A && (G[E] = G[A]), F !== -1 && G[F] !== F && (G[E] = G[F])), z !== -1 && (G[z] = E), A !== -1 && E != G[E] && (G[A] = G[E], X.lastIndexOf(A) < Z && X.push(A)), F !== -1 && E != G[E] && (G[F] = G[E], X.lastIndexOf(F) < Z && X.push(F));
    for (E = 1; E < V; ++E) G[E] === E && (F !== -1 && G[F] !== F ? G[E] = G[F] : A !== -1 && G[A] !== A && (G[E] = G[A]));
    for (E = 1; E < V; ++E)
      if (p[E].type !== 0) {
        if (Z = E, Z != G[Z]) do
          Z = G[Z], S[E] = S[Z] + "/" + S[E];
        while (Z !== 0 && G[Z] !== -1 && Z != G[Z]);
        G[E] = -1;
      }
    for (S[0] += "/", E = 1; E < V; ++E)
      p[E].type !== 2 && (S[E] += "/");
  }
  function d(p, S, _) {
    for (var E = p.start, A = p.size, F = [], z = E; _ && A > 0 && z >= 0; )
      F.push(S.slice(z * B, z * B + B)), A -= B, z = xn(_, z * 4);
    return F.length === 0 ? q(0) : pr(F).slice(0, p.size);
  }
  function m(p, S, _, E, A) {
    var F = Y;
    if (p === Y) {
      if (S !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (p !== -1) {
      var z = _[p], Z = (E >>> 2) - 1;
      if (!z) return;
      for (var V = 0; V < Z && (F = xn(z, V * 4)) !== Y; ++V)
        A.push(F);
      m(xn(z, E - 4), S - 1, _, E, A);
    }
  }
  function w(p, S, _, E, A) {
    var F = [], z = [];
    A || (A = []);
    var Z = E - 1, V = 0, G = 0;
    for (V = S; V >= 0; ) {
      A[V] = !0, F[F.length] = V, z.push(p[V]);
      var X = _[Math.floor(V * 4 / E)];
      if (G = V * 4 & Z, E < 4 + G) throw new Error("FAT boundary crossed: " + V + " 4 " + E);
      if (!p[X]) break;
      V = xn(p[X], G);
    }
    return { nodes: F, data: Z0([z]) };
  }
  function y(p, S, _, E) {
    var A = p.length, F = [], z = [], Z = [], V = [], G = E - 1, X = 0, ae = 0, ue = 0, me = 0;
    for (X = 0; X < A; ++X)
      if (Z = [], ue = X + S, ue >= A && (ue -= A), !z[ue]) {
        V = [];
        var se = [];
        for (ae = ue; ae >= 0; ) {
          se[ae] = !0, z[ae] = !0, Z[Z.length] = ae, V.push(p[ae]);
          var de = _[Math.floor(ae * 4 / E)];
          if (me = ae * 4 & G, E < 4 + me) throw new Error("FAT boundary crossed: " + ae + " 4 " + E);
          if (!p[de] || (ae = xn(p[de], me), se[ae])) break;
        }
        F[ue] = { nodes: Z, data: Z0([V]) };
      }
    return F;
  }
  function v(p, S, _, E, A, F, z, Z) {
    for (var V = 0, G = E.length ? 2 : 0, X = S[p].data, ae = 0, ue = 0, me; ae < X.length; ae += 128) {
      var se = (
        /*::(*/
        X.slice(ae, ae + 128)
      );
      _r(se, 64), ue = se.read_shift(2), me = zs(se, 0, ue - G), E.push(me);
      var de = {
        name: me,
        type: se.read_shift(1),
        color: se.read_shift(1),
        L: se.read_shift(4, "i"),
        R: se.read_shift(4, "i"),
        C: se.read_shift(4, "i"),
        clsid: se.read_shift(16),
        state: se.read_shift(4, "i"),
        start: 0,
        size: 0
      }, ke = se.read_shift(2) + se.read_shift(2) + se.read_shift(2) + se.read_shift(2);
      ke !== 0 && (de.ct = I(se, se.l - 8));
      var Je = se.read_shift(2) + se.read_shift(2) + se.read_shift(2) + se.read_shift(2);
      Je !== 0 && (de.mt = I(se, se.l - 8)), de.start = se.read_shift(4, "i"), de.size = se.read_shift(4, "i"), de.size < 0 && de.start < 0 && (de.size = de.type = 0, de.start = Y, de.name = ""), de.type === 5 ? (V = de.start, A > 0 && V !== Y && (S[V].name = "!StreamData")) : de.size >= 4096 ? (de.storage = "fat", S[de.start] === void 0 && (S[de.start] = w(_, de.start, S.fat_addrs, S.ssz)), S[de.start].name = de.name, de.content = S[de.start].data.slice(0, de.size)) : (de.storage = "minifat", de.size < 0 ? de.size = 0 : V !== Y && de.start !== Y && S[V] && (de.content = d(de, S[V].data, (S[Z] || {}).data))), de.content && _r(de.content, 0), F[me] = de, z.push(de);
    }
  }
  function I(p, S) {
    return new Date((jr(p, S + 4) / 1e7 * Math.pow(2, 32) + jr(p, S) / 1e7 - 11644473600) * 1e3);
  }
  function T(p, S) {
    return o(), l(c.readFileSync(p), S);
  }
  function N(p, S) {
    var _ = S && S.type;
    switch (_ || Ce && Buffer.isBuffer(p) && (_ = "buffer"), _ || "base64") {
      case "file":
        return T(p, S);
      case "base64":
        return l(Yr(Jr(p)), S);
      case "binary":
        return l(Yr(p), S);
    }
    return l(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      p,
      S
    );
  }
  function k(p, S) {
    var _ = S || {}, E = _.root || "Root Entry";
    if (p.FullPaths || (p.FullPaths = []), p.FileIndex || (p.FileIndex = []), p.FullPaths.length !== p.FileIndex.length) throw new Error("inconsistent CFB structure");
    p.FullPaths.length === 0 && (p.FullPaths[0] = E + "/", p.FileIndex[0] = { name: E, type: 5 }), _.CLSID && (p.FileIndex[0].clsid = _.CLSID), U(p);
  }
  function U(p) {
    var S = "Sh33tJ5";
    if (!ve.find(p, "/" + S)) {
      var _ = q(4);
      _[0] = 55, _[1] = _[3] = 50, _[2] = 54, p.FileIndex.push({ name: S, type: 2, content: _, size: 4, L: 69, R: 69, C: 69 }), p.FullPaths.push(p.FullPaths[0] + S), C(p);
    }
  }
  function C(p, S) {
    k(p);
    for (var _ = !1, E = !1, A = p.FullPaths.length - 1; A >= 0; --A) {
      var F = p.FileIndex[A];
      switch (F.type) {
        case 0:
          E ? _ = !0 : (p.FileIndex.pop(), p.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          E = !0, isNaN(F.R * F.L * F.C) && (_ = !0), F.R > -1 && F.L > -1 && F.R == F.L && (_ = !0);
          break;
        default:
          _ = !0;
          break;
      }
    }
    if (!(!_ && !S)) {
      var z = new Date(1987, 1, 19), Z = 0, V = Object.create ? /* @__PURE__ */ Object.create(null) : {}, G = [];
      for (A = 0; A < p.FullPaths.length; ++A)
        V[p.FullPaths[A]] = !0, p.FileIndex[A].type !== 0 && G.push([p.FullPaths[A], p.FileIndex[A]]);
      for (A = 0; A < G.length; ++A) {
        var X = n(G[A][0]);
        E = V[X], E || (G.push([X, {
          name: a(X).replace("/", ""),
          type: 1,
          clsid: ee,
          ct: z,
          mt: z,
          content: null
        }]), V[X] = !0);
      }
      for (G.sort(function(me, se) {
        return r(me[0], se[0]);
      }), p.FullPaths = [], p.FileIndex = [], A = 0; A < G.length; ++A)
        p.FullPaths[A] = G[A][0], p.FileIndex[A] = G[A][1];
      for (A = 0; A < G.length; ++A) {
        var ae = p.FileIndex[A], ue = p.FullPaths[A];
        if (ae.name = a(ue).replace("/", ""), ae.L = ae.R = ae.C = -(ae.color = 1), ae.size = ae.content ? ae.content.length : 0, ae.start = 0, ae.clsid = ae.clsid || ee, A === 0)
          ae.C = G.length > 1 ? 1 : -1, ae.size = 0, ae.type = 5;
        else if (ue.slice(-1) == "/") {
          for (Z = A + 1; Z < G.length && n(p.FullPaths[Z]) != ue; ++Z) ;
          for (ae.C = Z >= G.length ? -1 : Z, Z = A + 1; Z < G.length && n(p.FullPaths[Z]) != n(ue); ++Z) ;
          ae.R = Z >= G.length ? -1 : Z, ae.type = 1;
        } else
          n(p.FullPaths[A + 1] || "") == n(ue) && (ae.R = A + 1), ae.type = 2;
      }
    }
  }
  function D(p, S) {
    var _ = S || {};
    if (_.fileType == "mad") return eh(p, _);
    switch (C(p), _.fileType) {
      case "zip":
        return jl(p, _);
    }
    var E = function(me) {
      for (var se = 0, de = 0, ke = 0; ke < me.FileIndex.length; ++ke) {
        var Je = me.FileIndex[ke];
        if (Je.content) {
          var qe = Je.content.length;
          qe > 0 && (qe < 4096 ? se += qe + 63 >> 6 : de += qe + 511 >> 9);
        }
      }
      for (var yr = me.FullPaths.length + 3 >> 2, ua = se + 7 >> 3, xa = se + 127 >> 7, da = ua + de + yr + xa, hn = da + 127 >> 7, Ji = hn <= 109 ? 0 : Math.ceil((hn - 109) / 127); da + hn + Ji + 127 >> 7 > hn; ) Ji = ++hn <= 109 ? 0 : Math.ceil((hn - 109) / 127);
      var Nt = [1, Ji, hn, xa, yr, de, se, 0];
      return me.FileIndex[0].size = se << 6, Nt[7] = (me.FileIndex[0].start = Nt[0] + Nt[1] + Nt[2] + Nt[3] + Nt[4] + Nt[5]) + (Nt[6] + 7 >> 3), Nt;
    }(p), A = q(E[7] << 9), F = 0, z = 0;
    {
      for (F = 0; F < 8; ++F) A.write_shift(1, W[F]);
      for (F = 0; F < 8; ++F) A.write_shift(2, 0);
      for (A.write_shift(2, 62), A.write_shift(2, 3), A.write_shift(2, 65534), A.write_shift(2, 9), A.write_shift(2, 6), F = 0; F < 3; ++F) A.write_shift(2, 0);
      for (A.write_shift(4, 0), A.write_shift(4, E[2]), A.write_shift(4, E[0] + E[1] + E[2] + E[3] - 1), A.write_shift(4, 0), A.write_shift(4, 4096), A.write_shift(4, E[3] ? E[0] + E[1] + E[2] - 1 : Y), A.write_shift(4, E[3]), A.write_shift(-4, E[1] ? E[0] - 1 : Y), A.write_shift(4, E[1]), F = 0; F < 109; ++F) A.write_shift(-4, F < E[2] ? E[1] + F : -1);
    }
    if (E[1])
      for (z = 0; z < E[1]; ++z) {
        for (; F < 236 + z * 127; ++F) A.write_shift(-4, F < E[2] ? E[1] + F : -1);
        A.write_shift(-4, z === E[1] - 1 ? Y : z + 1);
      }
    var Z = function(me) {
      for (z += me; F < z - 1; ++F) A.write_shift(-4, F + 1);
      me && (++F, A.write_shift(-4, Y));
    };
    for (z = F = 0, z += E[1]; F < z; ++F) A.write_shift(-4, ne.DIFSECT);
    for (z += E[2]; F < z; ++F) A.write_shift(-4, ne.FATSECT);
    Z(E[3]), Z(E[4]);
    for (var V = 0, G = 0, X = p.FileIndex[0]; V < p.FileIndex.length; ++V)
      X = p.FileIndex[V], X.content && (G = X.content.length, !(G < 4096) && (X.start = z, Z(G + 511 >> 9)));
    for (Z(E[6] + 7 >> 3); A.l & 511; ) A.write_shift(-4, ne.ENDOFCHAIN);
    for (z = F = 0, V = 0; V < p.FileIndex.length; ++V)
      X = p.FileIndex[V], X.content && (G = X.content.length, !(!G || G >= 4096) && (X.start = z, Z(G + 63 >> 6)));
    for (; A.l & 511; ) A.write_shift(-4, ne.ENDOFCHAIN);
    for (F = 0; F < E[4] << 2; ++F) {
      var ae = p.FullPaths[F];
      if (!ae || ae.length === 0) {
        for (V = 0; V < 17; ++V) A.write_shift(4, 0);
        for (V = 0; V < 3; ++V) A.write_shift(4, -1);
        for (V = 0; V < 12; ++V) A.write_shift(4, 0);
        continue;
      }
      X = p.FileIndex[F], F === 0 && (X.start = X.size ? X.start - 1 : Y);
      var ue = F === 0 && _.root || X.name;
      if (G = 2 * (ue.length + 1), A.write_shift(64, ue, "utf16le"), A.write_shift(2, G), A.write_shift(1, X.type), A.write_shift(1, X.color), A.write_shift(-4, X.L), A.write_shift(-4, X.R), A.write_shift(-4, X.C), X.clsid) A.write_shift(16, X.clsid, "hex");
      else for (V = 0; V < 4; ++V) A.write_shift(4, 0);
      A.write_shift(4, X.state || 0), A.write_shift(4, 0), A.write_shift(4, 0), A.write_shift(4, 0), A.write_shift(4, 0), A.write_shift(4, X.start), A.write_shift(4, X.size), A.write_shift(4, 0);
    }
    for (F = 1; F < p.FileIndex.length; ++F)
      if (X = p.FileIndex[F], X.size >= 4096)
        if (A.l = X.start + 1 << 9, Ce && Buffer.isBuffer(X.content))
          X.content.copy(A, A.l, 0, X.size), A.l += X.size + 511 & -512;
        else {
          for (V = 0; V < X.size; ++V) A.write_shift(1, X.content[V]);
          for (; V & 511; ++V) A.write_shift(1, 0);
        }
    for (F = 1; F < p.FileIndex.length; ++F)
      if (X = p.FileIndex[F], X.size > 0 && X.size < 4096)
        if (Ce && Buffer.isBuffer(X.content))
          X.content.copy(A, A.l, 0, X.size), A.l += X.size + 63 & -64;
        else {
          for (V = 0; V < X.size; ++V) A.write_shift(1, X.content[V]);
          for (; V & 63; ++V) A.write_shift(1, 0);
        }
    if (Ce)
      A.l = A.length;
    else
      for (; A.l < A.length; ) A.write_shift(1, 0);
    return A;
  }
  function M(p, S) {
    var _ = p.FullPaths.map(function(V) {
      return V.toUpperCase();
    }), E = _.map(function(V) {
      var G = V.split("/");
      return G[G.length - (V.slice(-1) == "/" ? 2 : 1)];
    }), A = !1;
    S.charCodeAt(0) === 47 ? (A = !0, S = _[0].slice(0, -1) + S) : A = S.indexOf("/") !== -1;
    var F = S.toUpperCase(), z = A === !0 ? _.indexOf(F) : E.indexOf(F);
    if (z !== -1) return p.FileIndex[z];
    var Z = !F.match(wa);
    for (F = F.replace(Mr, ""), Z && (F = F.replace(wa, "!")), z = 0; z < _.length; ++z)
      if ((Z ? _[z].replace(wa, "!") : _[z]).replace(Mr, "") == F || (Z ? E[z].replace(wa, "!") : E[z]).replace(Mr, "") == F) return p.FileIndex[z];
    return null;
  }
  var B = 64, Y = -2, he = "d0cf11e0a1b11ae1", W = [208, 207, 17, 224, 161, 177, 26, 225], ee = "00000000000000000000000000000000", ne = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: Y,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: he,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: ee,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function De(p, S, _) {
    o();
    var E = D(p, _);
    c.writeFileSync(S, E);
  }
  function H(p) {
    for (var S = new Array(p.length), _ = 0; _ < p.length; ++_) S[_] = String.fromCharCode(p[_]);
    return S.join("");
  }
  function _e(p, S) {
    var _ = D(p, S);
    switch (S && S.type || "buffer") {
      case "file":
        return o(), c.writeFileSync(S.filename, _), _;
      case "binary":
        return typeof _ == "string" ? _ : H(_);
      case "base64":
        return Ba(typeof _ == "string" ? _ : H(_));
      case "buffer":
        if (Ce) return Buffer.isBuffer(_) ? _ : Ht(_);
      case "array":
        return typeof _ == "string" ? Yr(_) : _;
    }
    return _;
  }
  var Se;
  function O(p) {
    try {
      var S = p.InflateRaw, _ = new S();
      if (_._processChunk(new Uint8Array([3, 0]), _._finishFlushFlag), _.bytesRead) Se = p;
      else throw new Error("zlib does not expose bytesRead");
    } catch (E) {
      console.error("cannot use native zlib: " + (E.message || E));
    }
  }
  function P(p, S) {
    if (!Se) return b0(p, S);
    var _ = Se.InflateRaw, E = new _(), A = E._processChunk(p.slice(p.l), E._finishFlushFlag);
    return p.l += E.bytesRead, A;
  }
  function R(p) {
    return Se ? Se.deflateRawSync(p) : Oe(p);
  }
  var L = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], Q = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], fe = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function ce(p) {
    var S = (p << 1 | p << 11) & 139536 | (p << 5 | p << 15) & 558144;
    return (S >> 16 | S >> 8 | S) & 255;
  }
  for (var ie = typeof Uint8Array < "u", te = ie ? new Uint8Array(256) : [], be = 0; be < 256; ++be) te[be] = ce(be);
  function b(p, S) {
    var _ = te[p & 255];
    return S <= 8 ? _ >>> 8 - S : (_ = _ << 8 | te[p >> 8 & 255], S <= 16 ? _ >>> 16 - S : (_ = _ << 8 | te[p >> 16 & 255], _ >>> 24 - S));
  }
  function Xe(p, S) {
    var _ = S & 7, E = S >>> 3;
    return (p[E] | (_ <= 6 ? 0 : p[E + 1] << 8)) >>> _ & 3;
  }
  function Re(p, S) {
    var _ = S & 7, E = S >>> 3;
    return (p[E] | (_ <= 5 ? 0 : p[E + 1] << 8)) >>> _ & 7;
  }
  function Ge(p, S) {
    var _ = S & 7, E = S >>> 3;
    return (p[E] | (_ <= 4 ? 0 : p[E + 1] << 8)) >>> _ & 15;
  }
  function Be(p, S) {
    var _ = S & 7, E = S >>> 3;
    return (p[E] | (_ <= 3 ? 0 : p[E + 1] << 8)) >>> _ & 31;
  }
  function xe(p, S) {
    var _ = S & 7, E = S >>> 3;
    return (p[E] | (_ <= 1 ? 0 : p[E + 1] << 8)) >>> _ & 127;
  }
  function ar(p, S, _) {
    var E = S & 7, A = S >>> 3, F = (1 << _) - 1, z = p[A] >>> E;
    return _ < 8 - E || (z |= p[A + 1] << 8 - E, _ < 16 - E) || (z |= p[A + 2] << 16 - E, _ < 24 - E) || (z |= p[A + 3] << 24 - E), z & F;
  }
  function Qr(p, S, _) {
    var E = S & 7, A = S >>> 3;
    return E <= 5 ? p[A] |= (_ & 7) << E : (p[A] |= _ << E & 255, p[A + 1] = (_ & 7) >> 8 - E), S + 3;
  }
  function Et(p, S, _) {
    var E = S & 7, A = S >>> 3;
    return _ = (_ & 1) << E, p[A] |= _, S + 1;
  }
  function Ct(p, S, _) {
    var E = S & 7, A = S >>> 3;
    return _ <<= E, p[A] |= _ & 255, _ >>>= 8, p[A + 1] = _, S + 8;
  }
  function la(p, S, _) {
    var E = S & 7, A = S >>> 3;
    return _ <<= E, p[A] |= _ & 255, _ >>>= 8, p[A + 1] = _ & 255, p[A + 2] = _ >>> 8, S + 16;
  }
  function zt(p, S) {
    var _ = p.length, E = 2 * _ > S ? 2 * _ : S + 5, A = 0;
    if (_ >= S) return p;
    if (Ce) {
      var F = B0(E);
      if (p.copy) p.copy(F);
      else for (; A < p.length; ++A) F[A] = p[A];
      return F;
    } else if (ie) {
      var z = new Uint8Array(E);
      if (z.set) z.set(p);
      else for (; A < _; ++A) z[A] = p[A];
      return z;
    }
    return p.length = E, p;
  }
  function Vr(p) {
    for (var S = new Array(p), _ = 0; _ < p; ++_) S[_] = 0;
    return S;
  }
  function Ot(p, S, _) {
    var E = 1, A = 0, F = 0, z = 0, Z = 0, V = p.length, G = ie ? new Uint16Array(32) : Vr(32);
    for (F = 0; F < 32; ++F) G[F] = 0;
    for (F = V; F < _; ++F) p[F] = 0;
    V = p.length;
    var X = ie ? new Uint16Array(V) : Vr(V);
    for (F = 0; F < V; ++F)
      G[A = p[F]]++, E < A && (E = A), X[F] = 0;
    for (G[0] = 0, F = 1; F <= E; ++F) G[F + 16] = Z = Z + G[F - 1] << 1;
    for (F = 0; F < V; ++F)
      Z = p[F], Z != 0 && (X[F] = G[Z + 16]++);
    var ae = 0;
    for (F = 0; F < V; ++F)
      if (ae = p[F], ae != 0)
        for (Z = b(X[F], E) >> E - ae, z = (1 << E + 4 - ae) - 1; z >= 0; --z)
          S[Z | z << ae] = ae & 15 | F << 4;
    return E;
  }
  var Gt = ie ? new Uint16Array(512) : Vr(512), ha = ie ? new Uint16Array(32) : Vr(32);
  if (!ie) {
    for (var Ir = 0; Ir < 512; ++Ir) Gt[Ir] = 0;
    for (Ir = 0; Ir < 32; ++Ir) ha[Ir] = 0;
  }
  (function() {
    for (var p = [], S = 0; S < 32; S++) p.push(5);
    Ot(p, ha, 32);
    var _ = [];
    for (S = 0; S <= 143; S++) _.push(8);
    for (; S <= 255; S++) _.push(9);
    for (; S <= 279; S++) _.push(7);
    for (; S <= 287; S++) _.push(8);
    Ot(_, Gt, 288);
  })();
  var yt = /* @__PURE__ */ function() {
    for (var S = ie ? new Uint8Array(32768) : [], _ = 0, E = 0; _ < fe.length - 1; ++_)
      for (; E < fe[_ + 1]; ++E) S[E] = _;
    for (; E < 32768; ++E) S[E] = 29;
    var A = ie ? new Uint8Array(259) : [];
    for (_ = 0, E = 0; _ < Q.length - 1; ++_)
      for (; E < Q[_ + 1]; ++E) A[E] = _;
    function F(Z, V) {
      for (var G = 0; G < Z.length; ) {
        var X = Math.min(65535, Z.length - G), ae = G + X == Z.length;
        for (V.write_shift(1, +ae), V.write_shift(2, X), V.write_shift(2, ~X & 65535); X-- > 0; ) V[V.l++] = Z[G++];
      }
      return V.l;
    }
    function z(Z, V) {
      for (var G = 0, X = 0, ae = ie ? new Uint16Array(32768) : []; X < Z.length; ) {
        var ue = (
          /* data.length - boff; */
          Math.min(65535, Z.length - X)
        );
        if (ue < 10) {
          for (G = Qr(V, G, +(X + ue == Z.length)), G & 7 && (G += 8 - (G & 7)), V.l = G / 8 | 0, V.write_shift(2, ue), V.write_shift(2, ~ue & 65535); ue-- > 0; ) V[V.l++] = Z[X++];
          G = V.l * 8;
          continue;
        }
        G = Qr(V, G, +(X + ue == Z.length) + 2);
        for (var me = 0; ue-- > 0; ) {
          var se = Z[X];
          me = (me << 5 ^ se) & 32767;
          var de = -1, ke = 0;
          if ((de = ae[me]) && (de |= X & -32768, de > X && (de -= 32768), de < X))
            for (; Z[de + ke] == Z[X + ke] && ke < 250; ) ++ke;
          if (ke > 2) {
            se = A[ke], se <= 22 ? G = Ct(V, G, te[se + 1] >> 1) - 1 : (Ct(V, G, 3), G += 5, Ct(V, G, te[se - 23] >> 5), G += 3);
            var Je = se < 8 ? 0 : se - 4 >> 2;
            Je > 0 && (la(V, G, ke - Q[se]), G += Je), se = S[X - de], G = Ct(V, G, te[se] >> 3), G -= 3;
            var qe = se < 4 ? 0 : se - 2 >> 1;
            qe > 0 && (la(V, G, X - de - fe[se]), G += qe);
            for (var yr = 0; yr < ke; ++yr)
              ae[me] = X & 32767, me = (me << 5 ^ Z[X]) & 32767, ++X;
            ue -= ke - 1;
          } else
            se <= 143 ? se = se + 48 : G = Et(V, G, 1), G = Ct(V, G, te[se]), ae[me] = X & 32767, ++X;
        }
        G = Ct(V, G, 0) - 1;
      }
      return V.l = (G + 7) / 8 | 0, V.l;
    }
    return function(V, G) {
      return V.length < 8 ? F(V, G) : z(V, G);
    };
  }();
  function Oe(p) {
    var S = q(50 + Math.floor(p.length * 1.1)), _ = yt(p, S);
    return S.slice(0, _);
  }
  var ir = ie ? new Uint16Array(32768) : Vr(32768), et = ie ? new Uint16Array(32768) : Vr(32768), xr = ie ? new Uint16Array(128) : Vr(128), ln = 1, F0 = 1;
  function zl(p, S) {
    var _ = Be(p, S) + 257;
    S += 5;
    var E = Be(p, S) + 1;
    S += 5;
    var A = Ge(p, S) + 4;
    S += 4;
    for (var F = 0, z = ie ? new Uint8Array(19) : Vr(19), Z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], V = 1, G = ie ? new Uint8Array(8) : Vr(8), X = ie ? new Uint8Array(8) : Vr(8), ae = z.length, ue = 0; ue < A; ++ue)
      z[L[ue]] = F = Re(p, S), V < F && (V = F), G[F]++, S += 3;
    var me = 0;
    for (G[0] = 0, ue = 1; ue <= V; ++ue) X[ue] = me = me + G[ue - 1] << 1;
    for (ue = 0; ue < ae; ++ue) (me = z[ue]) != 0 && (Z[ue] = X[me]++);
    var se = 0;
    for (ue = 0; ue < ae; ++ue)
      if (se = z[ue], se != 0) {
        me = te[Z[ue]] >> 8 - se;
        for (var de = (1 << 7 - se) - 1; de >= 0; --de) xr[me | de << se] = se & 7 | ue << 3;
      }
    var ke = [];
    for (V = 1; ke.length < _ + E; )
      switch (me = xr[xe(p, S)], S += me & 7, me >>>= 3) {
        case 16:
          for (F = 3 + Xe(p, S), S += 2, me = ke[ke.length - 1]; F-- > 0; ) ke.push(me);
          break;
        case 17:
          for (F = 3 + Re(p, S), S += 3; F-- > 0; ) ke.push(0);
          break;
        case 18:
          for (F = 11 + xe(p, S), S += 7; F-- > 0; ) ke.push(0);
          break;
        default:
          ke.push(me), V < me && (V = me);
          break;
      }
    var Je = ke.slice(0, _), qe = ke.slice(_);
    for (ue = _; ue < 286; ++ue) Je[ue] = 0;
    for (ue = E; ue < 30; ++ue) qe[ue] = 0;
    return ln = Ot(Je, ir, 286), F0 = Ot(qe, et, 30), S;
  }
  function Gl(p, S) {
    if (p[0] == 3 && !(p[1] & 3))
      return [en(S), 2];
    for (var _ = 0, E = 0, A = B0(S || 1 << 18), F = 0, z = A.length >>> 0, Z = 0, V = 0; !(E & 1); ) {
      if (E = Re(p, _), _ += 3, E >>> 1)
        E >> 1 == 1 ? (Z = 9, V = 5) : (_ = zl(p, _), Z = ln, V = F0);
      else {
        _ & 7 && (_ += 8 - (_ & 7));
        var G = p[_ >>> 3] | p[(_ >>> 3) + 1] << 8;
        if (_ += 32, G > 0)
          for (!S && z < F + G && (A = zt(A, F + G), z = A.length); G-- > 0; )
            A[F++] = p[_ >>> 3], _ += 8;
        continue;
      }
      for (; ; ) {
        !S && z < F + 32767 && (A = zt(A, F + 32767), z = A.length);
        var X = ar(p, _, Z), ae = E >>> 1 == 1 ? Gt[X] : ir[X];
        if (_ += ae & 15, ae >>>= 4, !(ae >>> 8 & 255)) A[F++] = ae;
        else {
          if (ae == 256) break;
          ae -= 257;
          var ue = ae < 8 ? 0 : ae - 4 >> 2;
          ue > 5 && (ue = 0);
          var me = F + Q[ae];
          ue > 0 && (me += ar(p, _, ue), _ += ue), X = ar(p, _, V), ae = E >>> 1 == 1 ? ha[X] : et[X], _ += ae & 15, ae >>>= 4;
          var se = ae < 4 ? 0 : ae - 2 >> 1, de = fe[ae];
          for (se > 0 && (de += ar(p, _, se), _ += se), !S && z < me && (A = zt(A, me + 100), z = A.length); F < me; )
            A[F] = A[F - de], ++F;
        }
      }
    }
    return S ? [A, _ + 7 >>> 3] : [A.slice(0, F), _ + 7 >>> 3];
  }
  function b0(p, S) {
    var _ = p.slice(p.l || 0), E = Gl(_, S);
    return p.l += E[1], E[0];
  }
  function C0(p, S) {
    if (p)
      typeof console < "u" && console.error(S);
    else throw new Error(S);
  }
  function O0(p, S) {
    var _ = (
      /*::(*/
      p
    );
    _r(_, 0);
    var E = [], A = [], F = {
      FileIndex: E,
      FullPaths: A
    };
    k(F, { root: S.root });
    for (var z = _.length - 4; (_[z] != 80 || _[z + 1] != 75 || _[z + 2] != 5 || _[z + 3] != 6) && z >= 0; ) --z;
    _.l = z + 4, _.l += 4;
    var Z = _.read_shift(2);
    _.l += 6;
    var V = _.read_shift(4);
    for (_.l = V, z = 0; z < Z; ++z) {
      _.l += 20;
      var G = _.read_shift(4), X = _.read_shift(4), ae = _.read_shift(2), ue = _.read_shift(2), me = _.read_shift(2);
      _.l += 8;
      var se = _.read_shift(4), de = f(
        /*::(*/
        _.slice(_.l + ae, _.l + ae + ue)
        /*:: :any)*/
      );
      _.l += ae + ue + me;
      var ke = _.l;
      _.l = se + 4, Xl(_, G, X, F, de), _.l = ke;
    }
    return F;
  }
  function Xl(p, S, _, E, A) {
    p.l += 2;
    var F = p.read_shift(2), z = p.read_shift(2), Z = s(p);
    if (F & 8257) throw new Error("Unsupported ZIP encryption");
    for (var V = p.read_shift(4), G = p.read_shift(4), X = p.read_shift(4), ae = p.read_shift(2), ue = p.read_shift(2), me = "", se = 0; se < ae; ++se) me += String.fromCharCode(p[p.l++]);
    if (ue) {
      var de = f(
        /*::(*/
        p.slice(p.l, p.l + ue)
        /*:: :any)*/
      );
      (de[21589] || {}).mt && (Z = de[21589].mt), ((A || {})[21589] || {}).mt && (Z = A[21589].mt);
    }
    p.l += ue;
    var ke = p.slice(p.l, p.l + G);
    switch (z) {
      case 8:
        ke = P(p, X);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + z);
    }
    var Je = !1;
    F & 8 && (V = p.read_shift(4), V == 134695760 && (V = p.read_shift(4), Je = !0), G = p.read_shift(4), X = p.read_shift(4)), G != S && C0(Je, "Bad compressed size: " + S + " != " + G), X != _ && C0(Je, "Bad uncompressed size: " + _ + " != " + X), Ki(E, me, ke, { unsafe: !0, mt: Z });
  }
  function jl(p, S) {
    var _ = S || {}, E = [], A = [], F = q(1), z = _.compression ? 8 : 0, Z = 0, V = 0, G = 0, X = 0, ae = 0, ue = p.FullPaths[0], me = ue, se = p.FileIndex[0], de = [], ke = 0;
    for (V = 1; V < p.FullPaths.length; ++V)
      if (me = p.FullPaths[V].slice(ue.length), se = p.FileIndex[V], !(!se.size || !se.content || me == "Sh33tJ5")) {
        var Je = X, qe = q(me.length);
        for (G = 0; G < me.length; ++G) qe.write_shift(1, me.charCodeAt(G) & 127);
        qe = qe.slice(0, qe.l), de[ae] = Hh.buf(
          /*::((*/
          se.content,
          0
        );
        var yr = se.content;
        z == 8 && (yr = R(yr)), F = q(30), F.write_shift(4, 67324752), F.write_shift(2, 20), F.write_shift(2, Z), F.write_shift(2, z), se.mt ? i(F, se.mt) : F.write_shift(4, 0), F.write_shift(-4, de[ae]), F.write_shift(4, yr.length), F.write_shift(
          4,
          /*::(*/
          se.content.length
        ), F.write_shift(2, qe.length), F.write_shift(2, 0), X += F.length, E.push(F), X += qe.length, E.push(qe), X += yr.length, E.push(yr), F = q(46), F.write_shift(4, 33639248), F.write_shift(2, 0), F.write_shift(2, 20), F.write_shift(2, Z), F.write_shift(2, z), F.write_shift(4, 0), F.write_shift(-4, de[ae]), F.write_shift(4, yr.length), F.write_shift(
          4,
          /*::(*/
          se.content.length
        ), F.write_shift(2, qe.length), F.write_shift(2, 0), F.write_shift(2, 0), F.write_shift(2, 0), F.write_shift(2, 0), F.write_shift(4, 0), F.write_shift(4, Je), ke += F.l, A.push(F), ke += qe.length, A.push(qe), ++ae;
      }
    return F = q(22), F.write_shift(4, 101010256), F.write_shift(2, 0), F.write_shift(2, 0), F.write_shift(2, ae), F.write_shift(2, ae), F.write_shift(4, ke), F.write_shift(4, X), F.write_shift(2, 0), pr([pr(E), pr(A), F]);
  }
  var ii = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function Yl(p, S) {
    if (p.ctype) return p.ctype;
    var _ = p.name || "", E = _.match(/\.([^\.]+)$/);
    return E && ii[E[1]] || S && (E = (_ = S).match(/[\.\\]([^\.\\])+$/), E && ii[E[1]]) ? ii[E[1]] : "application/octet-stream";
  }
  function Kl(p) {
    for (var S = Ba(p), _ = [], E = 0; E < S.length; E += 76) _.push(S.slice(E, E + 76));
    return _.join(`\r
`) + `\r
`;
  }
  function Jl(p) {
    var S = p.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(G) {
      var X = G.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (X.length == 1 ? "0" + X : X);
    });
    S = S.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), S.charAt(0) == `
` && (S = "=0D" + S.slice(1)), S = S.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var _ = [], E = S.split(`\r
`), A = 0; A < E.length; ++A) {
      var F = E[A];
      if (F.length == 0) {
        _.push("");
        continue;
      }
      for (var z = 0; z < F.length; ) {
        var Z = 76, V = F.slice(z, z + Z);
        V.charAt(Z - 1) == "=" ? Z-- : V.charAt(Z - 2) == "=" ? Z -= 2 : V.charAt(Z - 3) == "=" && (Z -= 3), V = F.slice(z, z + Z), z += Z, z < F.length && (V += "="), _.push(V);
      }
    }
    return _.join(`\r
`);
  }
  function ql(p) {
    for (var S = [], _ = 0; _ < p.length; ++_) {
      for (var E = p[_]; _ <= p.length && E.charAt(E.length - 1) == "="; ) E = E.slice(0, E.length - 1) + p[++_];
      S.push(E);
    }
    for (var A = 0; A < S.length; ++A) S[A] = S[A].replace(/[=][0-9A-Fa-f]{2}/g, function(F) {
      return String.fromCharCode(parseInt(F.slice(1), 16));
    });
    return Yr(S.join(`\r
`));
  }
  function Zl(p, S, _) {
    for (var E = "", A = "", F = "", z, Z = 0; Z < 10; ++Z) {
      var V = S[Z];
      if (!V || V.match(/^\s*$/)) break;
      var G = V.match(/^(.*?):\s*([^\s].*)$/);
      if (G) switch (G[1].toLowerCase()) {
        case "content-location":
          E = G[2].trim();
          break;
        case "content-type":
          F = G[2].trim();
          break;
        case "content-transfer-encoding":
          A = G[2].trim();
          break;
      }
    }
    switch (++Z, A.toLowerCase()) {
      case "base64":
        z = Yr(Jr(S.slice(Z).join("")));
        break;
      case "quoted-printable":
        z = ql(S.slice(Z));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + A);
    }
    var X = Ki(p, E.slice(_.length), z, { unsafe: !0 });
    F && (X.ctype = F);
  }
  function Ql(p, S) {
    if (H(p.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var _ = S && S.root || "", E = (Ce && Buffer.isBuffer(p) ? p.toString("binary") : H(p)).split(`\r
`), A = 0, F = "";
    for (A = 0; A < E.length; ++A)
      if (F = E[A], !!/^Content-Location:/i.test(F) && (F = F.slice(F.indexOf("file")), _ || (_ = F.slice(0, F.lastIndexOf("/") + 1)), F.slice(0, _.length) != _))
        for (; _.length > 0 && (_ = _.slice(0, _.length - 1), _ = _.slice(0, _.lastIndexOf("/") + 1), F.slice(0, _.length) != _); )
          ;
    var z = (E[1] || "").match(/boundary="(.*?)"/);
    if (!z) throw new Error("MAD cannot find boundary");
    var Z = "--" + (z[1] || ""), V = [], G = [], X = {
      FileIndex: V,
      FullPaths: G
    };
    k(X);
    var ae, ue = 0;
    for (A = 0; A < E.length; ++A) {
      var me = E[A];
      me !== Z && me !== Z + "--" || (ue++ && Zl(X, E.slice(ae, A), _), ae = A);
    }
    return X;
  }
  function eh(p, S) {
    var _ = S || {}, E = _.boundary || "SheetJS";
    E = "------=" + E;
    for (var A = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + E.slice(2) + '"',
      "",
      "",
      ""
    ], F = p.FullPaths[0], z = F, Z = p.FileIndex[0], V = 1; V < p.FullPaths.length; ++V)
      if (z = p.FullPaths[V].slice(F.length), Z = p.FileIndex[V], !(!Z.size || !Z.content || z == "Sh33tJ5")) {
        z = z.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(ke) {
          return "_x" + ke.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(ke) {
          return "_u" + ke.charCodeAt(0).toString(16) + "_";
        });
        for (var G = Z.content, X = Ce && Buffer.isBuffer(G) ? G.toString("binary") : H(G), ae = 0, ue = Math.min(1024, X.length), me = 0, se = 0; se <= ue; ++se) (me = X.charCodeAt(se)) >= 32 && me < 128 && ++ae;
        var de = ae >= ue * 4 / 5;
        A.push(E), A.push("Content-Location: " + (_.root || "file:///C:/SheetJS/") + z), A.push("Content-Transfer-Encoding: " + (de ? "quoted-printable" : "base64")), A.push("Content-Type: " + Yl(Z, z)), A.push(""), A.push(de ? Jl(X) : Kl(X));
      }
    return A.push(E + `--\r
`), A.join(`\r
`);
  }
  function rh(p) {
    var S = {};
    return k(S, p), S;
  }
  function Ki(p, S, _, E) {
    var A = E && E.unsafe;
    A || k(p);
    var F = !A && ve.find(p, S);
    if (!F) {
      var z = p.FullPaths[0];
      S.slice(0, z.length) == z ? z = S : (z.slice(-1) != "/" && (z += "/"), z = (z + S).replace("//", "/")), F = { name: a(S), type: 2 }, p.FileIndex.push(F), p.FullPaths.push(z), A || ve.utils.cfb_gc(p);
    }
    return F.content = _, F.size = _ ? _.length : 0, E && (E.CLSID && (F.clsid = E.CLSID), E.mt && (F.mt = E.mt), E.ct && (F.ct = E.ct)), F;
  }
  function th(p, S) {
    k(p);
    var _ = ve.find(p, S);
    if (_) {
      for (var E = 0; E < p.FileIndex.length; ++E) if (p.FileIndex[E] == _)
        return p.FileIndex.splice(E, 1), p.FullPaths.splice(E, 1), !0;
    }
    return !1;
  }
  function nh(p, S, _) {
    k(p);
    var E = ve.find(p, S);
    if (E) {
      for (var A = 0; A < p.FileIndex.length; ++A) if (p.FileIndex[A] == E)
        return p.FileIndex[A].name = a(_), p.FullPaths[A] = _, !0;
    }
    return !1;
  }
  function ah(p) {
    C(p, !0);
  }
  return t.find = M, t.read = N, t.parse = l, t.write = _e, t.writeFile = De, t.utils = {
    cfb_new: rh,
    cfb_add: Ki,
    cfb_del: th,
    cfb_mov: nh,
    cfb_gc: ah,
    ReadShift: ya,
    CheckField: Hc,
    prep_blob: _r,
    bconcat: pr,
    use_zlib: O,
    _deflateRaw: Oe,
    _inflateRaw: b0,
    consts: ne
  }, t;
}();
function Vh(e) {
  return typeof e == "string" ? Li(e) : Array.isArray(e) ? dh(e) : e;
}
function ja(e, t, r) {
  if (typeof Deno < "u") {
    if (r && typeof t == "string") switch (r) {
      case "utf8":
        t = new TextEncoder(r).encode(t);
        break;
      case "binary":
        t = Li(t);
        break;
      default:
        throw new Error("Unsupported encoding " + r);
    }
    return Deno.writeFileSync(e, t);
  }
  var n = r == "utf8" ? At(t) : t;
  if (typeof IE_SaveFile < "u") return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([Vh(n)], { type: "application/octet-stream" });
    if (typeof navigator < "u" && navigator.msSaveBlob) return navigator.msSaveBlob(a, e);
    if (typeof saveAs < "u") return saveAs(a, e);
    if (typeof URL < "u" && typeof document < "u" && document.createElement && URL.createObjectURL) {
      var i = URL.createObjectURL(a);
      if (typeof chrome == "object" && typeof (chrome.downloads || {}).download == "function")
        return URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
          URL.revokeObjectURL(i);
        }, 6e4), chrome.downloads.download({ url: i, filename: e, saveAs: !0 });
      var s = document.createElement("a");
      if (s.download != null)
        return s.download = e, s.href = i, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
          URL.revokeObjectURL(i);
        }, 6e4), i;
    }
  }
  if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u") try {
    var f = File(e);
    return f.open("w"), f.encoding = "binary", Array.isArray(t) && (t = fn(t)), f.write(t), f.close(), t;
  } catch (c) {
    if (!c.message || !c.message.match(/onstruct/)) throw c;
  }
  throw new Error("cannot save file " + e);
}
function $h(e) {
  if (typeof Deno < "u") return Deno.readFileSync(e);
  if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u") try {
    var t = File(e);
    t.open("r"), t.encoding = "binary";
    var r = t.read();
    return t.close(), r;
  } catch (n) {
    if (!n.message || !n.message.match(/onstruct/)) throw n;
  }
  throw new Error("Cannot access file " + e);
}
function nr(e) {
  for (var t = Object.keys(e), r = [], n = 0; n < t.length; ++n) Object.prototype.hasOwnProperty.call(e, t[n]) && r.push(t[n]);
  return r;
}
function H0(e, t) {
  for (var r = [], n = nr(e), a = 0; a !== n.length; ++a) r[e[n[a]][t]] == null && (r[e[n[a]][t]] = n[a]);
  return r;
}
function Mi(e) {
  for (var t = [], r = nr(e), n = 0; n !== r.length; ++n) t[e[r[n]]] = r[n];
  return t;
}
function Ui(e) {
  for (var t = [], r = nr(e), n = 0; n !== r.length; ++n) t[e[r[n]]] = parseInt(r[n], 10);
  return t;
}
function zh(e) {
  for (var t = [], r = nr(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] == null && (t[e[r[n]]] = []), t[e[r[n]]].push(r[n]);
  return t;
}
var Si = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function gr(e, t) {
  var r = /* @__PURE__ */ e.getTime(), n = /* @__PURE__ */ Si.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Si.getTimezoneOffset()) * 6e4;
  return (r - n) / (24 * 60 * 60 * 1e3);
}
var _c = /* @__PURE__ */ new Date(), Gh = /* @__PURE__ */ Si.getTime() + (/* @__PURE__ */ _c.getTimezoneOffset() - /* @__PURE__ */ Si.getTimezoneOffset()) * 6e4, V0 = /* @__PURE__ */ _c.getTimezoneOffset();
function Wi(e) {
  var t = /* @__PURE__ */ new Date();
  return t.setTime(e * 24 * 60 * 60 * 1e3 + Gh), t.getTimezoneOffset() !== V0 && t.setTime(t.getTime() + (t.getTimezoneOffset() - V0) * 6e4), t;
}
function Xh(e) {
  var t = 0, r = 0, n = !1, a = e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
  if (!a) throw new Error("|" + e + "| is not an ISO8601 Duration");
  for (var i = 1; i != a.length; ++i)
    if (a[i]) {
      switch (r = 1, i > 3 && (n = !0), a[i].slice(a[i].length - 1)) {
        case "Y":
          throw new Error("Unsupported ISO Duration Field: " + a[i].slice(a[i].length - 1));
        case "D":
          r *= 24;
        case "H":
          r *= 60;
        case "M":
          if (n) r *= 60;
          else throw new Error("Unsupported ISO Duration Field: M");
      }
      t += r * parseInt(a[i], 10);
    }
  return t;
}
var $0 = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), Ec = /* @__PURE__ */ isNaN(/* @__PURE__ */ $0.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : $0, jh = /* @__PURE__ */ Ec.getFullYear() == 2017;
function Ye(e, t) {
  var r = new Date(e);
  if (jh)
    return t > 0 ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3) : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3), r;
  if (e instanceof Date) return e;
  if (Ec.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
    var n = r.getFullYear();
    return e.indexOf("" + n) > -1 || r.setFullYear(r.getFullYear() + 100), r;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function En(e, t) {
  if (Ce && Buffer.isBuffer(e)) {
    if (t) {
      if (e[0] == 255 && e[1] == 254) return At(e.slice(2).toString("utf16le"));
      if (e[1] == 254 && e[2] == 255) return At(cc(e.slice(2).toString("binary")));
    }
    return e.toString("binary");
  }
  if (typeof TextDecoder < "u") try {
    if (t) {
      if (e[0] == 255 && e[1] == 254) return At(new TextDecoder("utf-16le").decode(e.slice(2)));
      if (e[0] == 254 && e[1] == 255) return At(new TextDecoder("utf-16be").decode(e.slice(2)));
    }
    var r = {
      "€": "",
      "‚": "",
      ƒ: "",
      "„": "",
      "…": "",
      "†": "",
      "‡": "",
      "ˆ": "",
      "‰": "",
      Š: "",
      "‹": "",
      Œ: "",
      Ž: "",
      "‘": "",
      "’": "",
      "“": "",
      "”": "",
      "•": "",
      "–": "",
      "—": "",
      "˜": "",
      "™": "",
      š: "",
      "›": "",
      œ: "",
      ž: "",
      Ÿ: ""
    };
    return Array.isArray(e) && (e = new Uint8Array(e)), new TextDecoder("latin1").decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, function(i) {
      return r[i] || i;
    });
  } catch {
  }
  for (var n = [], a = 0; a != e.length; ++a) n.push(String.fromCharCode(e[a]));
  return n.join("");
}
function Ke(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var t = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = Ke(e[r]));
  return t;
}
function rr(e, t) {
  for (var r = ""; r.length < t; ) r += e;
  return r;
}
function wt(e) {
  var t = Number(e);
  if (!isNaN(t)) return isFinite(t) ? t : NaN;
  if (!/\d/.test(e)) return t;
  var r = 1, n = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
    return r *= 100, "";
  });
  return !isNaN(t = Number(n)) || (n = n.replace(/[(](.*)[)]/, function(a, i) {
    return r = -r, i;
  }), !isNaN(t = Number(n))) ? t / r : t;
}
var Yh = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function Jn(e) {
  var t = new Date(e), r = /* @__PURE__ */ new Date(NaN), n = t.getYear(), a = t.getMonth(), i = t.getDate();
  if (isNaN(i)) return r;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && Yh.indexOf(s) == -1) return r;
  } else if (s.match(/[a-z]/)) return r;
  return n < 0 || n > 8099 ? r : (a > 0 || i > 1) && n != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? r : t;
}
var Kh = /* @__PURE__ */ function() {
  var e = "abacaba".split(/(:?b)/i).length == 5;
  return function(r, n, a) {
    if (e || typeof n == "string") return r.split(n);
    for (var i = r.split(n), s = [i[0]], f = 1; f < i.length; ++f)
      s.push(a), s.push(i[f]);
    return s;
  };
}();
function yc(e) {
  return e ? e.content && e.type ? En(e.content, !0) : e.data ? va(e.data) : e.asNodeBuffer && Ce ? va(e.asNodeBuffer().toString("binary")) : e.asBinary ? va(e.asBinary()) : e._data && e._data.getContent ? va(En(Array.prototype.slice.call(e._data.getContent(), 0))) : null : null;
}
function Tc(e) {
  if (!e) return null;
  if (e.data) return N0(e.data);
  if (e.asNodeBuffer && Ce) return e.asNodeBuffer();
  if (e._data && e._data.getContent) {
    var t = e._data.getContent();
    return typeof t == "string" ? N0(t) : Array.prototype.slice.call(t);
  }
  return e.content && e.type ? e.content : null;
}
function Jh(e) {
  return e && e.name.slice(-4) === ".bin" ? Tc(e) : yc(e);
}
function ft(e, t) {
  for (var r = e.FullPaths || nr(e.files), n = t.toLowerCase().replace(/[\/]/g, "\\"), a = n.replace(/\\/g, "/"), i = 0; i < r.length; ++i) {
    var s = r[i].replace(/^Root Entry[\/]/, "").toLowerCase();
    if (n == s || a == s) return e.files ? e.files[r[i]] : e.FileIndex[i];
  }
  return null;
}
function Ms(e, t) {
  var r = ft(e, t);
  if (r == null) throw new Error("Cannot find file " + t + " in zip");
  return r;
}
function hr(e, t, r) {
  if (!r) return Jh(Ms(e, t));
  if (!t) return null;
  try {
    return hr(e, t);
  } catch {
    return null;
  }
}
function Kr(e, t, r) {
  if (!r) return yc(Ms(e, t));
  if (!t) return null;
  try {
    return Kr(e, t);
  } catch {
    return null;
  }
}
function qh(e, t, r) {
  return Tc(Ms(e, t));
}
function z0(e) {
  for (var t = e.FullPaths || nr(e.files), r = [], n = 0; n < t.length; ++n) t[n].slice(-1) != "/" && r.push(t[n].replace(/^Root Entry[\/]/, ""));
  return r.sort();
}
function Fe(e, t, r) {
  if (e.FullPaths) {
    if (typeof r == "string") {
      var n;
      return Ce ? n = Ht(r) : n = gh(r), ve.utils.cfb_add(e, t, n);
    }
    ve.utils.cfb_add(e, t, r);
  } else e.file(t, r);
}
function Us() {
  return ve.utils.cfb_new();
}
function Sc(e, t) {
  switch (t.type) {
    case "base64":
      return ve.read(e, { type: "base64" });
    case "binary":
      return ve.read(e, { type: "binary" });
    case "buffer":
    case "array":
      return ve.read(e, { type: "buffer" });
  }
  throw new Error("Unrecognized type " + t.type);
}
function _a(e, t) {
  if (e.charAt(0) == "/") return e.slice(1);
  var r = t.split("/");
  t.slice(-1) != "/" && r.pop();
  for (var n = e.split("/"); n.length !== 0; ) {
    var a = n.shift();
    a === ".." ? r.pop() : a !== "." && r.push(a);
  }
  return r.join("/");
}
var or = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, Zh = /([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g, G0 = /<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s*[\/\?]?>/mg, Qh = /<[^>]*>/g, Nr = /* @__PURE__ */ or.match(G0) ? G0 : Qh, eu = /<\w*:/, ru = /<(\/?)\w+:/;
function Te(e, t, r) {
  for (var n = {}, a = 0, i = 0; a !== e.length && !((i = e.charCodeAt(a)) === 32 || i === 10 || i === 13); ++a) ;
  if (t || (n[0] = e.slice(0, a)), a === e.length) return n;
  var s = e.match(Zh), f = 0, c = "", o = 0, l = "", h = "", u = 1;
  if (s) for (o = 0; o != s.length; ++o) {
    for (h = s[o], i = 0; i != h.length && h.charCodeAt(i) !== 61; ++i) ;
    for (l = h.slice(0, i).trim(); h.charCodeAt(i + 1) == 32; ) ++i;
    for (u = (a = h.charCodeAt(i + 1)) == 34 || a == 39 ? 1 : 0, c = h.slice(i + 1 + u, h.length - u), f = 0; f != l.length && l.charCodeAt(f) !== 58; ++f) ;
    if (f === l.length)
      l.indexOf("_") > 0 && (l = l.slice(0, l.indexOf("_"))), n[l] = c, n[l.toLowerCase()] = c;
    else {
      var x = (f === 5 && l.slice(0, 5) === "xmlns" ? "xmlns" : "") + l.slice(f + 1);
      if (n[x] && l.slice(f - 3, f) == "ext") continue;
      n[x] = c, n[x.toLowerCase()] = c;
    }
  }
  return n;
}
function Ft(e) {
  return e.replace(ru, "<$1");
}
var kc = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, Ws = /* @__PURE__ */ Mi(kc), Pe = /* @__PURE__ */ function() {
  var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/ig, t = /_x([\da-fA-F]{4})_/ig;
  return function r(n) {
    var a = n + "", i = a.indexOf("<![CDATA[");
    if (i == -1) return a.replace(e, function(f, c) {
      return kc[f] || String.fromCharCode(parseInt(c, f.indexOf("x") > -1 ? 16 : 10)) || f;
    }).replace(t, function(f, c) {
      return String.fromCharCode(parseInt(c, 16));
    });
    var s = a.indexOf("]]>");
    return r(a.slice(0, i)) + a.slice(i + 9, s) + r(a.slice(s + 3));
  };
}(), Hs = /[&<>'"]/g, tu = /[\u0000-\u0008\u000b-\u001f]/g;
function $e(e) {
  var t = e + "";
  return t.replace(Hs, function(r) {
    return Ws[r];
  }).replace(tu, function(r) {
    return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function X0(e) {
  return $e(e).replace(/ /g, "_x0020_");
}
var Ac = /[\u0000-\u001f]/g;
function Vs(e) {
  var t = e + "";
  return t.replace(Hs, function(r) {
    return Ws[r];
  }).replace(/\n/g, "<br/>").replace(Ac, function(r) {
    return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function nu(e) {
  var t = e + "";
  return t.replace(Hs, function(r) {
    return Ws[r];
  }).replace(Ac, function(r) {
    return "&#x" + r.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
var j0 = /* @__PURE__ */ function() {
  var e = /&#(\d+);/g;
  function t(r, n) {
    return String.fromCharCode(parseInt(n, 10));
  }
  return function(n) {
    return n.replace(e, t);
  };
}();
function au(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function je(e) {
  switch (e) {
    case 1:
    case !0:
    case "1":
    case "true":
    case "TRUE":
      return !0;
    default:
      return !1;
  }
}
function Zi(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0; r < e.length; ) {
    if (n = e.charCodeAt(r++), n < 128) {
      t += String.fromCharCode(n);
      continue;
    }
    if (a = e.charCodeAt(r++), n > 191 && n < 224) {
      s = (n & 31) << 6, s |= a & 63, t += String.fromCharCode(s);
      continue;
    }
    if (i = e.charCodeAt(r++), n < 240) {
      t += String.fromCharCode((n & 15) << 12 | (a & 63) << 6 | i & 63);
      continue;
    }
    s = e.charCodeAt(r++), f = ((n & 7) << 18 | (a & 63) << 12 | (i & 63) << 6 | s & 63) - 65536, t += String.fromCharCode(55296 + (f >>> 10 & 1023)), t += String.fromCharCode(56320 + (f & 1023));
  }
  return t;
}
function Y0(e) {
  var t = en(2 * e.length), r, n, a = 1, i = 0, s = 0, f;
  for (n = 0; n < e.length; n += a)
    a = 1, (f = e.charCodeAt(n)) < 128 ? r = f : f < 224 ? (r = (f & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : f < 240 ? (r = (f & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, r = (f & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), r -= 65536, s = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), s !== 0 && (t[i++] = s & 255, t[i++] = s >>> 8, s = 0), t[i++] = r % 256, t[i++] = r >>> 8;
  return t.slice(0, i).toString("ucs2");
}
function K0(e) {
  return Ht(e, "binary").toString("utf8");
}
var fi = "foo bar bazâð£", ze = Ce && (/* @__PURE__ */ K0(fi) == /* @__PURE__ */ Zi(fi) && K0 || /* @__PURE__ */ Y0(fi) == /* @__PURE__ */ Zi(fi) && Y0) || Zi, At = Ce ? function(e) {
  return Ht(e, "utf8").toString("binary");
} : function(e) {
  for (var t = [], r = 0, n = 0, a = 0; r < e.length; )
    switch (n = e.charCodeAt(r++), !0) {
      case n < 128:
        t.push(String.fromCharCode(n));
        break;
      case n < 2048:
        t.push(String.fromCharCode(192 + (n >> 6))), t.push(String.fromCharCode(128 + (n & 63)));
        break;
      case (n >= 55296 && n < 57344):
        n -= 55296, a = e.charCodeAt(r++) - 56320 + (n << 10), t.push(String.fromCharCode(240 + (a >> 18 & 7))), t.push(String.fromCharCode(144 + (a >> 12 & 63))), t.push(String.fromCharCode(128 + (a >> 6 & 63))), t.push(String.fromCharCode(128 + (a & 63)));
        break;
      default:
        t.push(String.fromCharCode(224 + (n >> 12))), t.push(String.fromCharCode(128 + (n >> 6 & 63))), t.push(String.fromCharCode(128 + (n & 63)));
    }
  return t.join("");
}, Ra = /* @__PURE__ */ function() {
  var e = {};
  return function(r, n) {
    var a = r + "|" + (n || "");
    return e[a] ? e[a] : e[a] = new RegExp("<(?:\\w+:)?" + r + '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + r + ">", n || "");
  };
}(), Fc = /* @__PURE__ */ function() {
  var e = [
    ["nbsp", " "],
    ["middot", "·"],
    ["quot", '"'],
    ["apos", "'"],
    ["gt", ">"],
    ["lt", "<"],
    ["amp", "&"]
  ].map(function(t) {
    return [new RegExp("&" + t[0] + ";", "ig"), t[1]];
  });
  return function(r) {
    for (var n = r.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, `
`).replace(/<[^>]*>/g, ""), a = 0; a < e.length; ++a) n = n.replace(e[a][0], e[a][1]);
    return n;
  };
}(), iu = /* @__PURE__ */ function() {
  var e = {};
  return function(r) {
    return e[r] !== void 0 ? e[r] : e[r] = new RegExp("<(?:vt:)?" + r + ">([\\s\\S]*?)</(?:vt:)?" + r + ">", "g");
  };
}(), su = /<\/?(?:vt:)?variant>/g, fu = /<(?:vt:)([^>]*)>([\s\S]*)</;
function J0(e, t) {
  var r = Te(e), n = e.match(iu(r.baseType)) || [], a = [];
  if (n.length != r.size) {
    if (t.WTF) throw new Error("unexpected vector length " + n.length + " != " + r.size);
    return a;
  }
  return n.forEach(function(i) {
    var s = i.replace(su, "").match(fu);
    s && a.push({ v: ze(s[2]), t: s[1] });
  }), a;
}
var bc = /(^\s|\s$|\n)/;
function Er(e, t) {
  return "<" + e + (t.match(bc) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}
function La(e) {
  return nr(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function oe(e, t, r) {
  return "<" + e + (r != null ? La(r) : "") + (t != null ? (t.match(bc) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function vs(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (r) {
    if (t) throw r;
  }
  return "";
}
function cu(e, t) {
  switch (typeof e) {
    case "string":
      var r = oe("vt:lpwstr", $e(e));
      return r = r.replace(/&quot;/g, "_x0022_"), r;
    case "number":
      return oe((e | 0) == e ? "vt:i4" : "vt:r8", $e(String(e)));
    case "boolean":
      return oe("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return oe("vt:filetime", vs(e));
  throw new Error("Unable to serialize " + e);
}
function $s(e) {
  if (Ce && /*::typeof Buffer !== "undefined" && d != null && d instanceof Buffer &&*/
  Buffer.isBuffer(e)) return e.toString("utf8");
  if (typeof e == "string") return e;
  if (typeof Uint8Array < "u" && e instanceof Uint8Array) return ze(fn(Rs(e)));
  throw new Error("Bad input format: expected Buffer or string");
}
var Pa = /<(\/?)([^\s?><!\/:]*:|)([^\s?<>:\/]+)(?:[\s?:\/][^>]*)?>/mg, dr = {
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
  CT: "http://schemas.openxmlformats.org/package/2006/content-types",
  RELS: "http://schemas.openxmlformats.org/package/2006/relationships",
  TCMNT: "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments",
  dc: "http://purl.org/dc/elements/1.1/",
  dcterms: "http://purl.org/dc/terms/",
  dcmitype: "http://purl.org/dc/dcmitype/",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
  xsi: "http://www.w3.org/2001/XMLSchema-instance",
  xsd: "http://www.w3.org/2001/XMLSchema"
}, Fn = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], Xr = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function ou(e, t) {
  for (var r = 1 - 2 * (e[t + 7] >>> 7), n = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), a = e[t + 6] & 15, i = 5; i >= 0; --i) a = a * 256 + e[t + i];
  return n == 2047 ? a == 0 ? r * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, a += Math.pow(2, 52)), r * Math.pow(2, n - 52) * a);
}
function lu(e, t, r) {
  var n = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7, a = 0, i = 0, s = n ? -t : t;
  isFinite(s) ? s == 0 ? a = i = 0 : (a = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(t) ? 26985 : 0);
  for (var f = 0; f <= 5; ++f, i /= 256) e[r + f] = i & 255;
  e[r + 6] = (a & 15) << 4 | i & 15, e[r + 7] = a >> 4 | n;
}
var q0 = function(e) {
  for (var t = [], r = 10240, n = 0; n < e[0].length; ++n) if (e[0][n]) for (var a = 0, i = e[0][n].length; a < i; a += r) t.push.apply(t, e[0][n].slice(a, a + r));
  return t;
}, Z0 = Ce ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : Ht(t);
  })) : q0(e);
} : q0, Q0 = function(e, t, r) {
  for (var n = [], a = t; a < r; a += 2) n.push(String.fromCharCode(Rt(e, a)));
  return n.join("").replace(Mr, "");
}, zs = Ce ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", t, r).replace(Mr, "") : Q0(e, t, r);
} : Q0, ef = function(e, t, r) {
  for (var n = [], a = t; a < t + r; ++a) n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, Cc = Ce ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : ef(e, t, r);
} : ef, rf = function(e, t, r) {
  for (var n = [], a = t; a < r; a++) n.push(String.fromCharCode(Wn(e, a)));
  return n.join("");
}, Ya = Ce ? function(t, r, n) {
  return Buffer.isBuffer(t) ? t.toString("utf8", r, n) : rf(t, r, n);
} : rf, Oc = function(e, t) {
  var r = jr(e, t);
  return r > 0 ? Ya(e, t + 4, t + 4 + r - 1) : "";
}, Nc = Oc, Ic = function(e, t) {
  var r = jr(e, t);
  return r > 0 ? Ya(e, t + 4, t + 4 + r - 1) : "";
}, Bc = Ic, Dc = function(e, t) {
  var r = 2 * jr(e, t);
  return r > 0 ? Ya(e, t + 4, t + 4 + r - 1) : "";
}, Rc = Dc, Lc = function(t, r) {
  var n = jr(t, r);
  return n > 0 ? zs(t, r + 4, r + 4 + n) : "";
}, Pc = Lc, Mc = function(e, t) {
  var r = jr(e, t);
  return r > 0 ? Ya(e, t + 4, t + 4 + r) : "";
}, Uc = Mc, Wc = function(e, t) {
  return ou(e, t);
}, ki = Wc, Gs = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
Ce && (Nc = function(t, r) {
  if (!Buffer.isBuffer(t)) return Oc(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, Bc = function(t, r) {
  if (!Buffer.isBuffer(t)) return Ic(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, Rc = function(t, r) {
  if (!Buffer.isBuffer(t)) return Dc(t, r);
  var n = 2 * t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n - 1);
}, Pc = function(t, r) {
  if (!Buffer.isBuffer(t)) return Lc(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n);
}, Uc = function(t, r) {
  if (!Buffer.isBuffer(t)) return Mc(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf8", r + 4, r + 4 + n);
}, ki = function(t, r) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(r) : Wc(t, r);
}, Gs = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var Wn = function(e, t) {
  return e[t];
}, Rt = function(e, t) {
  return e[t + 1] * 256 + e[t];
}, hu = function(e, t) {
  var r = e[t + 1] * 256 + e[t];
  return r < 32768 ? r : (65535 - r + 1) * -1;
}, jr = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, xn = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, uu = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function ya(e, t) {
  var r = "", n, a, i = [], s, f, c, o;
  switch (t) {
    case "dbcs":
      if (o = this.l, Ce && Buffer.isBuffer(this)) r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (c = 0; c < e; ++c)
        r += String.fromCharCode(Rt(this, o)), o += 2;
      e *= 2;
      break;
    case "utf8":
      r = Ya(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, r = zs(this, this.l, this.l + e);
      break;
    case "wstr":
      return ya.call(this, e, "dbcs");
    case "lpstr-ansi":
      r = Nc(this, this.l), e = 4 + jr(this, this.l);
      break;
    case "lpstr-cp":
      r = Bc(this, this.l), e = 4 + jr(this, this.l);
      break;
    case "lpwstr":
      r = Rc(this, this.l), e = 4 + 2 * jr(this, this.l);
      break;
    case "lpp4":
      e = 4 + jr(this, this.l), r = Pc(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + jr(this, this.l), r = Uc(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, r = ""; (s = Wn(this, this.l + e++)) !== 0; ) i.push(si(s));
      r = i.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (s = Rt(this, this.l + e)) !== 0; )
        i.push(si(s)), e += 2;
      e += 2, r = i.join("");
      break;
    case "dbcs-cont":
      for (r = "", o = this.l, c = 0; c < e; ++c) {
        if (this.lens && this.lens.indexOf(o) !== -1)
          return s = Wn(this, o), this.l = o + 1, f = ya.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(si(Rt(this, o))), o += 2;
      }
      r = i.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (r = "", o = this.l, c = 0; c != e; ++c) {
        if (this.lens && this.lens.indexOf(o) !== -1)
          return s = Wn(this, o), this.l = o + 1, f = ya.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(si(Wn(this, o))), o += 1;
      }
      r = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = Wn(this, this.l), this.l++, n;
        case 2:
          return n = (t === "i" ? hu : Rt)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return t === "i" || !(this[this.l + 3] & 128) ? (n = (e > 0 ? xn : uu)(this, this.l), this.l += 4, n) : (a = jr(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? a = ki(this, this.l) : a = ki([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        case 16:
          r = Cc(this, this.l, e);
          break;
      }
  }
  return this.l += e, r;
}
var xu = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
}, du = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >> 8 & 255, e[r + 2] = t >> 16 & 255, e[r + 3] = t >> 24 & 255;
}, gu = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255;
};
function mu(e, t, r) {
  var n = 0, a = 0;
  if (r === "dbcs") {
    for (a = 0; a != t.length; ++a) gu(this, t.charCodeAt(a), this.l + 2 * a);
    n = 2 * t.length;
  } else if (r === "sbcs") {
    for (t = t.replace(/[^\x00-\x7F]/g, "_"), a = 0; a != t.length; ++a) this[this.l + a] = t.charCodeAt(a) & 255;
    n = t.length;
  } else if (r === "hex") {
    for (; a < e; ++a)
      this[this.l++] = parseInt(t.slice(2 * a, 2 * a + 2), 16) || 0;
    return this;
  } else if (r === "utf16le") {
    var i = Math.min(this.l + e, this.length);
    for (a = 0; a < Math.min(t.length, e); ++a) {
      var s = t.charCodeAt(a);
      this[this.l++] = s & 255, this[this.l++] = s >> 8;
    }
    for (; this.l < i; ) this[this.l++] = 0;
    return this;
  } else switch (e) {
    case 1:
      n = 1, this[this.l] = t & 255;
      break;
    case 2:
      n = 2, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255;
      break;
    case 3:
      n = 3, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255, t >>>= 8, this[this.l + 2] = t & 255;
      break;
    case 4:
      n = 4, xu(this, t, this.l);
      break;
    case 8:
      if (n = 8, r === "f") {
        lu(this, t, this.l);
        break;
      }
    case 16:
      break;
    case -4:
      n = 4, du(this, t, this.l);
      break;
  }
  return this.l += n, this;
}
function Hc(e, t) {
  var r = Cc(this, this.l, e.length >> 1);
  if (r !== e) throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function _r(e, t) {
  e.l = t, e.read_shift = /*::(*/
  ya, e.chk = Hc, e.write_shift = mu;
}
function Or(e, t) {
  e.l += t;
}
function q(e) {
  var t = en(e);
  return _r(t, 0), t;
}
function Vt(e, t, r) {
  if (e) {
    var n, a, i;
    _r(e, e.l || 0);
    for (var s = e.length, f = 0, c = 0; e.l < s; ) {
      f = e.read_shift(1), f & 128 && (f = (f & 127) + ((e.read_shift(1) & 127) << 7));
      var o = $a[f] || $a[65535];
      for (n = e.read_shift(1), i = n & 127, a = 1; a < 4 && n & 128; ++a) i += ((n = e.read_shift(1)) & 127) << 7 * a;
      c = e.l + i;
      var l = o.f && o.f(e, i, r);
      if (e.l = c, t(l, o, f)) return;
    }
  }
}
function Wr() {
  var e = [], t = Ce ? 256 : 2048, r = function(o) {
    var l = q(o);
    return _r(l, 0), l;
  }, n = r(t), a = function() {
    n && (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, i = function(o) {
    return n && o < n.length - n.l ? n : (a(), n = r(Math.max(o + 1, t)));
  }, s = function() {
    return a(), pr(e);
  }, f = function(o) {
    a(), n = o, n.l == null && (n.l = n.length), i(t);
  };
  return { next: i, push: f, end: s, _bufs: e };
}
function re(e, t, r, n) {
  var a = +t, i;
  if (!isNaN(a)) {
    n || (n = $a[a].p || (r || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, n >= 128 && ++i, n >= 16384 && ++i, n >= 2097152 && ++i;
    var s = e.next(i);
    a <= 127 ? s.write_shift(1, a) : (s.write_shift(1, (a & 127) + 128), s.write_shift(1, a >> 7));
    for (var f = 0; f != 4; ++f)
      if (n >= 128)
        s.write_shift(1, (n & 127) + 128), n >>= 7;
      else {
        s.write_shift(1, n);
        break;
      }
    /*:: length != null &&*/
    n > 0 && Gs(r) && e.push(r);
  }
}
function Ta(e, t, r) {
  var n = Ke(e);
  if (t.s ? (n.cRel && (n.c += t.s.c), n.rRel && (n.r += t.s.r)) : (n.cRel && (n.c += t.c), n.rRel && (n.r += t.r)), !r || r.biff < 12) {
    for (; n.c >= 256; ) n.c -= 256;
    for (; n.r >= 65536; ) n.r -= 65536;
  }
  return n;
}
function tf(e, t, r) {
  var n = Ke(e);
  return n.s = Ta(n.s, t.s, r), n.e = Ta(n.e, t.s, r), n;
}
function Sa(e, t) {
  if (e.cRel && e.c < 0)
    for (e = Ke(e); e.c < 0; ) e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = Ke(e); e.r < 0; ) e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = ye(e);
  return !e.cRel && e.cRel != null && (r = wu(r)), !e.rRel && e.rRel != null && (r = pu(r)), r;
}
function Qi(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + Qe(e.s.c) + ":" + (e.e.cRel ? "" : "$") + Qe(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + cr(e.s.r) + ":" + (e.e.rRel ? "" : "$") + cr(e.e.r) : Sa(e.s, t.biff) + ":" + Sa(e.e, t.biff);
}
function Xs(e) {
  return parseInt(vu(e), 10) - 1;
}
function cr(e) {
  return "" + (e + 1);
}
function pu(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function vu(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function js(e) {
  for (var t = _u(e), r = 0, n = 0; n !== t.length; ++n) r = 26 * r + t.charCodeAt(n) - 64;
  return r - 1;
}
function Qe(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) t = String.fromCharCode((e - 1) % 26 + 65) + t;
  return t;
}
function wu(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function _u(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function Eu(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function er(e) {
  for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
    var a = e.charCodeAt(n);
    a >= 48 && a <= 57 ? t = 10 * t + (a - 48) : a >= 65 && a <= 90 && (r = 26 * r + (a - 64));
  }
  return { c: r - 1, r: t - 1 };
}
function ye(e) {
  for (var t = e.c + 1, r = ""; t; t = (t - 1) / 26 | 0) r = String.fromCharCode((t - 1) % 26 + 65) + r;
  return r + (e.r + 1);
}
function Hr(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: er(e), e: er(e) } : { s: er(e.slice(0, t)), e: er(e.slice(t + 1)) };
}
function Ae(e, t) {
  return typeof t > "u" || typeof t == "number" ? Ae(e.s, e.e) : (typeof e != "string" && (e = ye(e)), typeof t != "string" && (t = ye(t)), e == t ? e : e + ":" + t);
}
function Me(e) {
  var t = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, r = 0, n = 0, a = 0, i = e.length;
  for (r = 0; n < i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    r = 26 * r + a;
  for (t.s.c = --r, r = 0; n < i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9); ++n)
    r = 10 * r + a;
  if (t.s.r = --r, n === i || a != 10)
    return t.e.c = t.s.c, t.e.r = t.s.r, t;
  for (++n, r = 0; n != i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    r = 26 * r + a;
  for (t.e.c = --r, r = 0; n != i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9); ++n)
    r = 10 * r + a;
  return t.e.r = --r, t;
}
function nf(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null) try {
    return e.w = ht(e.z, r ? gr(t) : t);
  } catch {
  }
  try {
    return e.w = ht((e.XF || {}).numFmtId || (r ? 14 : 0), r ? gr(t) : t);
  } catch {
    return "" + t;
  }
}
function Ut(e, t, r) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? $t[e.v] || e.v : t == null ? nf(e, e.v) : nf(e, t));
}
function cn(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1", n = {};
  return n[r] = e, { SheetNames: [r], Sheets: n };
}
function Vc(e, t, r) {
  var n = r || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, f = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number") s = n.origin;
    else {
      var c = typeof n.origin == "string" ? er(n.origin) : n.origin;
      s = c.r, f = c.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var o = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var l = Me(i["!ref"]);
    o.s.c = l.s.c, o.s.r = l.s.r, o.e.c = Math.max(o.e.c, l.e.c), o.e.r = Math.max(o.e.r, l.e.r), s == -1 && (o.e.r = s = l.e.r + 1);
  }
  for (var h = 0; h != t.length; ++h)
    if (t[h]) {
      if (!Array.isArray(t[h])) throw new Error("aoa_to_sheet expects an array of arrays");
      for (var u = 0; u != t[h].length; ++u)
        if (!(typeof t[h][u] > "u")) {
          var x = { v: t[h][u] }, g = s + h, d = f + u;
          if (o.s.r > g && (o.s.r = g), o.s.c > d && (o.s.c = d), o.e.r < g && (o.e.r = g), o.e.c < d && (o.e.c = d), t[h][u] && typeof t[h][u] == "object" && !Array.isArray(t[h][u]) && !(t[h][u] instanceof Date)) x = t[h][u];
          else if (Array.isArray(x.v) && (x.f = t[h][u][1], x.v = x.v[0]), x.v === null)
            if (x.f) x.t = "n";
            else if (n.nullError)
              x.t = "e", x.v = 0;
            else if (n.sheetStubs) x.t = "z";
            else continue;
          else typeof x.v == "number" ? x.t = "n" : typeof x.v == "boolean" ? x.t = "b" : x.v instanceof Date ? (x.z = n.dateNF || Ee[14], n.cellDates ? (x.t = "d", x.w = ht(x.z, gr(x.v))) : (x.t = "n", x.v = gr(x.v), x.w = ht(x.z, x.v))) : x.t = "s";
          if (a)
            i[g] || (i[g] = []), i[g][d] && i[g][d].z && (x.z = i[g][d].z), i[g][d] = x;
          else {
            var m = ye({ c: d, r: g });
            i[m] && i[m].z && (x.z = i[m].z), i[m] = x;
          }
        }
    }
  return o.s.c < 1e7 && (i["!ref"] = Ae(o)), i;
}
function na(e, t) {
  return Vc(null, e, t);
}
function yu(e) {
  return e.read_shift(4, "i");
}
function _t(e, t) {
  return t || (t = q(4)), t.write_shift(4, e), t;
}
function Cr(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function vr(e, t) {
  var r = !1;
  return t == null && (r = !0, t = q(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
function Tu(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function Su(e, t) {
  return t || (t = q(4)), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function Ys(e, t) {
  var r = e.l, n = e.read_shift(1), a = Cr(e), i = [], s = { t: a, h: a };
  if (n & 1) {
    for (var f = e.read_shift(4), c = 0; c != f; ++c) i.push(Tu(e));
    s.r = i;
  } else s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = r + t, s;
}
function ku(e, t) {
  var r = !1;
  return t == null && (r = !0, t = q(15 + 4 * e.t.length)), t.write_shift(1, 0), vr(e.t, t), r ? t.slice(0, t.l) : t;
}
var Au = Ys;
function Fu(e, t) {
  var r = !1;
  return t == null && (r = !0, t = q(23 + 4 * e.t.length)), t.write_shift(1, 1), vr(e.t, t), t.write_shift(4, 1), Su({}, t), r ? t.slice(0, t.l) : t;
}
function ut(e) {
  var t = e.read_shift(4), r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: r };
}
function bn(e, t) {
  return t == null && (t = q(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
function Cn(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
function On(e, t) {
  return t == null && (t = q(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
var bu = Cr, $c = vr;
function Ks(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function Ai(e, t) {
  var r = !1;
  return t == null && (r = !0, t = q(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
var Cu = Cr, ws = Ks, Js = Ai;
function qs(e) {
  var t = e.slice(e.l, e.l + 4), r = t[0] & 1, n = t[0] & 2;
  e.l += 4;
  var a = n === 0 ? ki([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : xn(t, 0) >> 2;
  return r ? a / 100 : a;
}
function zc(e, t) {
  t == null && (t = q(4));
  var r = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -536870912 && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -536870912 && a < 1 << 29 && (n = 1, r = 1), n) t.write_shift(-4, ((r ? a : e) << 2) + (r + 2));
  else throw new Error("unsupported RkNumber " + e);
}
function Gc(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
function Ou(e, t) {
  return t || (t = q(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}
var Nn = Gc, aa = Ou;
function br(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function yn(e, t) {
  return (t || q(8)).write_shift(8, e, "f");
}
function Nu(e) {
  var t = {}, r = e.read_shift(1), n = r >>> 1, a = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), f = e.read_shift(1), c = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = a;
      var o = mn[a];
      o && (t.rgb = Ua(o));
      break;
    case 2:
      t.rgb = Ua([s, f, c]);
      break;
    case 3:
      t.theme = a;
      break;
  }
  return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}
function Fi(e, t) {
  if (t || (t = q(8)), !e || e.auto)
    return t.write_shift(4, 0), t.write_shift(4, 0), t;
  e.index != null ? (t.write_shift(1, 2), t.write_shift(1, e.index)) : e.theme != null ? (t.write_shift(1, 6), t.write_shift(1, e.theme)) : (t.write_shift(1, 5), t.write_shift(1, 0));
  var r = e.tint || 0;
  if (r > 0 ? r *= 32767 : r < 0 && (r *= 32768), t.write_shift(2, r), !e.rgb || e.theme != null)
    t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0);
  else {
    var n = e.rgb || "FFFFFF";
    typeof n == "number" && (n = ("000000" + n.toString(16)).slice(-6)), t.write_shift(1, parseInt(n.slice(0, 2), 16)), t.write_shift(1, parseInt(n.slice(2, 4), 16)), t.write_shift(1, parseInt(n.slice(4, 6), 16)), t.write_shift(1, 255);
  }
  return t;
}
function Iu(e) {
  var t = e.read_shift(1);
  e.l++;
  var r = {
    fBold: t & 1,
    fItalic: t & 2,
    fUnderline: t & 4,
    fStrikeout: t & 8,
    fOutline: t & 16,
    fShadow: t & 32,
    fCondense: t & 64,
    fExtend: t & 128
  };
  return r;
}
function Bu(e, t) {
  t || (t = q(2));
  var r = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return t.write_shift(1, r), t.write_shift(1, 0), t;
}
function Xc(e, t) {
  var r = { 2: "BITMAP", 3: "METAFILEPICT", 8: "DIB", 14: "ENHMETAFILE" }, n = e.read_shift(4);
  switch (n) {
    case 0:
      return "";
    case 4294967295:
    case 4294967294:
      return r[e.read_shift(4)] || "";
  }
  if (n > 400) throw new Error("Unsupported Clipboard: " + n.toString(16));
  return e.l -= 4, e.read_shift(0, t == 1 ? "lpstr" : "lpwstr");
}
function Du(e) {
  return Xc(e, 1);
}
function Ru(e) {
  return Xc(e, 2);
}
var Zs = 2, Ur = 3, ci = 11, af = 12, bi = 19, oi = 64, Lu = 65, Pu = 71, Mu = 4108, Uu = 4126, mr = 80, jc = 81, Wu = [mr, jc], _s = {
  /*::[*/
  1: { n: "CodePage", t: Zs },
  /*::[*/
  2: { n: "Category", t: mr },
  /*::[*/
  3: { n: "PresentationFormat", t: mr },
  /*::[*/
  4: { n: "ByteCount", t: Ur },
  /*::[*/
  5: { n: "LineCount", t: Ur },
  /*::[*/
  6: { n: "ParagraphCount", t: Ur },
  /*::[*/
  7: { n: "SlideCount", t: Ur },
  /*::[*/
  8: { n: "NoteCount", t: Ur },
  /*::[*/
  9: { n: "HiddenCount", t: Ur },
  /*::[*/
  10: { n: "MultimediaClipCount", t: Ur },
  /*::[*/
  11: { n: "ScaleCrop", t: ci },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: Mu
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: Uu
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: mr },
  /*::[*/
  15: { n: "Company", t: mr },
  /*::[*/
  16: { n: "LinksUpToDate", t: ci },
  /*::[*/
  17: { n: "CharacterCount", t: Ur },
  /*::[*/
  19: { n: "SharedDoc", t: ci },
  /*::[*/
  22: { n: "HyperlinksChanged", t: ci },
  /*::[*/
  23: { n: "AppVersion", t: Ur, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: Lu },
  /*::[*/
  26: { n: "ContentType", t: mr },
  /*::[*/
  27: { n: "ContentStatus", t: mr },
  /*::[*/
  28: { n: "Language", t: mr },
  /*::[*/
  29: { n: "Version", t: mr },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: bi },
  /*::[*/
  2147483651: { n: "Behavior", t: bi },
  /*::[*/
  1919054434: {}
}, Es = {
  /*::[*/
  1: { n: "CodePage", t: Zs },
  /*::[*/
  2: { n: "Title", t: mr },
  /*::[*/
  3: { n: "Subject", t: mr },
  /*::[*/
  4: { n: "Author", t: mr },
  /*::[*/
  5: { n: "Keywords", t: mr },
  /*::[*/
  6: { n: "Comments", t: mr },
  /*::[*/
  7: { n: "Template", t: mr },
  /*::[*/
  8: { n: "LastAuthor", t: mr },
  /*::[*/
  9: { n: "RevNumber", t: mr },
  /*::[*/
  10: { n: "EditTime", t: oi },
  /*::[*/
  11: { n: "LastPrinted", t: oi },
  /*::[*/
  12: { n: "CreatedDate", t: oi },
  /*::[*/
  13: { n: "ModifiedDate", t: oi },
  /*::[*/
  14: { n: "PageCount", t: Ur },
  /*::[*/
  15: { n: "WordCount", t: Ur },
  /*::[*/
  16: { n: "CharCount", t: Ur },
  /*::[*/
  17: { n: "Thumbnail", t: Pu },
  /*::[*/
  18: { n: "Application", t: mr },
  /*::[*/
  19: { n: "DocSecurity", t: Ur },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: bi },
  /*::[*/
  2147483651: { n: "Behavior", t: bi },
  /*::[*/
  1919054434: {}
}, sf = {
  /*::[*/
  1: "US",
  // United States
  /*::[*/
  2: "CA",
  // Canada
  /*::[*/
  3: "",
  // Latin America (except Brazil)
  /*::[*/
  7: "RU",
  // Russia
  /*::[*/
  20: "EG",
  // Egypt
  /*::[*/
  30: "GR",
  // Greece
  /*::[*/
  31: "NL",
  // Netherlands
  /*::[*/
  32: "BE",
  // Belgium
  /*::[*/
  33: "FR",
  // France
  /*::[*/
  34: "ES",
  // Spain
  /*::[*/
  36: "HU",
  // Hungary
  /*::[*/
  39: "IT",
  // Italy
  /*::[*/
  41: "CH",
  // Switzerland
  /*::[*/
  43: "AT",
  // Austria
  /*::[*/
  44: "GB",
  // United Kingdom
  /*::[*/
  45: "DK",
  // Denmark
  /*::[*/
  46: "SE",
  // Sweden
  /*::[*/
  47: "NO",
  // Norway
  /*::[*/
  48: "PL",
  // Poland
  /*::[*/
  49: "DE",
  // Germany
  /*::[*/
  52: "MX",
  // Mexico
  /*::[*/
  55: "BR",
  // Brazil
  /*::[*/
  61: "AU",
  // Australia
  /*::[*/
  64: "NZ",
  // New Zealand
  /*::[*/
  66: "TH",
  // Thailand
  /*::[*/
  81: "JP",
  // Japan
  /*::[*/
  82: "KR",
  // Korea
  /*::[*/
  84: "VN",
  // Viet Nam
  /*::[*/
  86: "CN",
  // China
  /*::[*/
  90: "TR",
  // Turkey
  /*::[*/
  105: "JS",
  // Ramastan
  /*::[*/
  213: "DZ",
  // Algeria
  /*::[*/
  216: "MA",
  // Morocco
  /*::[*/
  218: "LY",
  // Libya
  /*::[*/
  351: "PT",
  // Portugal
  /*::[*/
  354: "IS",
  // Iceland
  /*::[*/
  358: "FI",
  // Finland
  /*::[*/
  420: "CZ",
  // Czech Republic
  /*::[*/
  886: "TW",
  // Taiwan
  /*::[*/
  961: "LB",
  // Lebanon
  /*::[*/
  962: "JO",
  // Jordan
  /*::[*/
  963: "SY",
  // Syria
  /*::[*/
  964: "IQ",
  // Iraq
  /*::[*/
  965: "KW",
  // Kuwait
  /*::[*/
  966: "SA",
  // Saudi Arabia
  /*::[*/
  971: "AE",
  // United Arab Emirates
  /*::[*/
  972: "IL",
  // Israel
  /*::[*/
  974: "QA",
  // Qatar
  /*::[*/
  981: "IR",
  // Iran
  /*::[*/
  65535: "US"
  // United States
}, Hu = [
  null,
  "solid",
  "mediumGray",
  "darkGray",
  "lightGray",
  "darkHorizontal",
  "darkVertical",
  "darkDown",
  "darkUp",
  "darkGrid",
  "darkTrellis",
  "lightHorizontal",
  "lightVertical",
  "lightDown",
  "lightUp",
  "lightGrid",
  "lightTrellis",
  "gray125",
  "gray0625"
];
function Vu(e) {
  return e.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}
var $u = /* @__PURE__ */ Vu([
  /* Color Constants */
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  /* Overridable Defaults */
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  8388608,
  32768,
  128,
  8421376,
  8388736,
  32896,
  12632256,
  8421504,
  10066431,
  10040166,
  16777164,
  13434879,
  6684774,
  16744576,
  26316,
  13421823,
  128,
  16711935,
  16776960,
  65535,
  8388736,
  8388608,
  32896,
  255,
  52479,
  13434879,
  13434828,
  16777113,
  10079487,
  16751052,
  13408767,
  16764057,
  3368703,
  3394764,
  10079232,
  16763904,
  16750848,
  16737792,
  6710937,
  9868950,
  13158,
  3381606,
  13056,
  3355392,
  10040064,
  10040166,
  3355545,
  3355443,
  /* Other entries to appease BIFF8/12 */
  16777215,
  /* 0x40 icvForeground ?? */
  0,
  /* 0x41 icvBackground ?? */
  0,
  /* 0x42 icvFrame ?? */
  0,
  /* 0x43 icv3D ?? */
  0,
  /* 0x44 icv3DText ?? */
  0,
  /* 0x45 icv3DHilite ?? */
  0,
  /* 0x46 icv3DShadow ?? */
  0,
  /* 0x47 icvHilite ?? */
  0,
  /* 0x48 icvCtlText ?? */
  0,
  /* 0x49 icvCtlScrl ?? */
  0,
  /* 0x4A icvCtlInv ?? */
  0,
  /* 0x4B icvCtlBody ?? */
  0,
  /* 0x4C icvCtlFrame ?? */
  0,
  /* 0x4D icvCtlFore ?? */
  0,
  /* 0x4E icvCtlBack ?? */
  0,
  /* 0x4F icvCtlNeutral */
  0,
  /* 0x50 icvInfoBk ?? */
  0
  /* 0x51 icvInfoText ?? */
]), mn = /* @__PURE__ */ Ke($u), $t = {
  /*::[*/
  0: "#NULL!",
  /*::[*/
  7: "#DIV/0!",
  /*::[*/
  15: "#VALUE!",
  /*::[*/
  23: "#REF!",
  /*::[*/
  29: "#NAME?",
  /*::[*/
  36: "#NUM!",
  /*::[*/
  42: "#N/A",
  /*::[*/
  43: "#GETTING_DATA",
  /*::[*/
  255: "#WTF?"
}, Yc = {
  "#NULL!": 0,
  "#DIV/0!": 7,
  "#VALUE!": 15,
  "#REF!": 23,
  "#NAME?": 29,
  "#NUM!": 36,
  "#N/A": 42,
  "#GETTING_DATA": 43,
  "#WTF?": 255
}, ys = {
  /* Workbook */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
  "application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": "workbooks",
  /* Worksheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": "sheets",
  "application/vnd.ms-excel.worksheet": "sheets",
  "application/vnd.ms-excel.binIndexWs": "TODO",
  /* Binary Index */
  /* Chartsheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": "charts",
  "application/vnd.ms-excel.chartsheet": "charts",
  /* Macrosheet */
  "application/vnd.ms-excel.macrosheet+xml": "macros",
  "application/vnd.ms-excel.macrosheet": "macros",
  "application/vnd.ms-excel.intlmacrosheet": "TODO",
  "application/vnd.ms-excel.binIndexMs": "TODO",
  /* Binary Index */
  /* Dialogsheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": "dialogs",
  "application/vnd.ms-excel.dialogsheet": "dialogs",
  /* Shared Strings */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml": "strs",
  "application/vnd.ms-excel.sharedStrings": "strs",
  /* Styles */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": "styles",
  "application/vnd.ms-excel.styles": "styles",
  /* File Properties */
  "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
  /* Custom Data Properties */
  "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
  /* Comments */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": "comments",
  "application/vnd.ms-excel.comments": "comments",
  "application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
  "application/vnd.ms-excel.person+xml": "people",
  /* Metadata (Stock/Geography and Dynamic Array) */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "metadata",
  "application/vnd.ms-excel.sheetMetadata": "metadata",
  /* PivotTable */
  "application/vnd.ms-excel.pivotTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
  /* Chart Objects */
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
  /* Chart Colors */
  "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
  /* Chart Style */
  "application/vnd.ms-office.chartstyle+xml": "TODO",
  /* Chart Advanced */
  "application/vnd.ms-office.chartex+xml": "TODO",
  /* Calculation Chain */
  "application/vnd.ms-excel.calcChain": "calcchains",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
  /* Printer Settings */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
  /* ActiveX */
  "application/vnd.ms-office.activeX": "TODO",
  "application/vnd.ms-office.activeX+xml": "TODO",
  /* Custom Toolbars */
  "application/vnd.ms-excel.attachedToolbars": "TODO",
  /* External Data Connections */
  "application/vnd.ms-excel.connections": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
  /* External Links */
  "application/vnd.ms-excel.externalLink": "links",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
  /* PivotCache */
  "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
  "application/vnd.ms-excel.pivotCacheRecords": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
  /* Query Table */
  "application/vnd.ms-excel.queryTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
  /* Shared Workbook */
  "application/vnd.ms-excel.userNames": "TODO",
  "application/vnd.ms-excel.revisionHeaders": "TODO",
  "application/vnd.ms-excel.revisionLog": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
  /* Single Cell Table */
  "application/vnd.ms-excel.tableSingleCells": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
  /* Slicer */
  "application/vnd.ms-excel.slicer": "TODO",
  "application/vnd.ms-excel.slicerCache": "TODO",
  "application/vnd.ms-excel.slicer+xml": "TODO",
  "application/vnd.ms-excel.slicerCache+xml": "TODO",
  /* Sort Map */
  "application/vnd.ms-excel.wsSortMap": "TODO",
  /* Table */
  "application/vnd.ms-excel.table": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
  /* Themes */
  "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
  /* Theme Override */
  "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
  /* Timeline */
  "application/vnd.ms-excel.Timeline+xml": "TODO",
  /* verify */
  "application/vnd.ms-excel.TimelineCache+xml": "TODO",
  /* verify */
  /* VBA */
  "application/vnd.ms-office.vbaProject": "vba",
  "application/vnd.ms-office.vbaProjectSignature": "TODO",
  /* Volatile Dependencies */
  "application/vnd.ms-office.volatileDependencies": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
  /* Control Properties */
  "application/vnd.ms-excel.controlproperties+xml": "TODO",
  /* Data Model */
  "application/vnd.openxmlformats-officedocument.model+data": "TODO",
  /* Survey */
  "application/vnd.ms-excel.Survey+xml": "TODO",
  /* Drawing */
  "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
  /* VML */
  "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
  "application/vnd.openxmlformats-package.relationships+xml": "rels",
  "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
  /* Image */
  "image/png": "TODO",
  sheet: "js"
}, li = {
  workbooks: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
    xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
    xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
    xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
  },
  strs: {
    /* Shared Strings */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
    xlsb: "application/vnd.ms-excel.sharedStrings"
  },
  comments: {
    /* Comments */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
    xlsb: "application/vnd.ms-excel.comments"
  },
  sheets: {
    /* Worksheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
    xlsb: "application/vnd.ms-excel.worksheet"
  },
  charts: {
    /* Chartsheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
    xlsb: "application/vnd.ms-excel.chartsheet"
  },
  dialogs: {
    /* Dialogsheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
    xlsb: "application/vnd.ms-excel.dialogsheet"
  },
  macros: {
    /* Macrosheet (Excel 4.0 Macros) */
    xlsx: "application/vnd.ms-excel.macrosheet+xml",
    xlsb: "application/vnd.ms-excel.macrosheet"
  },
  metadata: {
    /* Metadata (Stock/Geography and Dynamic Array) */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml",
    xlsb: "application/vnd.ms-excel.sheetMetadata"
  },
  styles: {
    /* Styles */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
    xlsb: "application/vnd.ms-excel.styles"
  }
};
function Qs() {
  return {
    workbooks: [],
    sheets: [],
    charts: [],
    dialogs: [],
    macros: [],
    rels: [],
    strs: [],
    comments: [],
    threadedcomments: [],
    links: [],
    coreprops: [],
    extprops: [],
    custprops: [],
    themes: [],
    styles: [],
    calcchains: [],
    vba: [],
    drawings: [],
    metadata: [],
    people: [],
    TODO: [],
    xmlns: ""
  };
}
function zu(e) {
  var t = Qs();
  if (!e || !e.match) return t;
  var r = {};
  if ((e.match(Nr) || []).forEach(function(n) {
    var a = Te(n);
    switch (a[0].replace(eu, "<")) {
      case "<?xml":
        break;
      case "<Types":
        t.xmlns = a["xmlns" + (a[0].match(/<(\w+):/) || ["", ""])[1]];
        break;
      case "<Default":
        r[a.Extension] = a.ContentType;
        break;
      case "<Override":
        t[ys[a.ContentType]] !== void 0 && t[ys[a.ContentType]].push(a.PartName);
        break;
    }
  }), t.xmlns !== dr.CT) throw new Error("Unknown Namespace: " + t.xmlns);
  return t.calcchain = t.calcchains.length > 0 ? t.calcchains[0] : "", t.sst = t.strs.length > 0 ? t.strs[0] : "", t.style = t.styles.length > 0 ? t.styles[0] : "", t.defaults = r, delete t.calcchains, t;
}
function Kc(e, t) {
  var r = zh(ys), n = [], a;
  n[n.length] = or, n[n.length] = oe("Types", null, {
    xmlns: dr.CT,
    "xmlns:xsd": dr.xsd,
    "xmlns:xsi": dr.xsi
  }), n = n.concat([
    ["xml", "application/xml"],
    ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"],
    ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"],
    ["data", "application/vnd.openxmlformats-officedocument.model+data"],
    /* from test files */
    ["bmp", "image/bmp"],
    ["png", "image/png"],
    ["gif", "image/gif"],
    ["emf", "image/x-emf"],
    ["wmf", "image/x-wmf"],
    ["jpg", "image/jpeg"],
    ["jpeg", "image/jpeg"],
    ["tif", "image/tiff"],
    ["tiff", "image/tiff"],
    ["pdf", "application/pdf"],
    ["rels", "application/vnd.openxmlformats-package.relationships+xml"]
  ].map(function(c) {
    return oe("Default", null, { Extension: c[0], ContentType: c[1] });
  }));
  var i = function(c) {
    e[c] && e[c].length > 0 && (a = e[c][0], n[n.length] = oe("Override", null, {
      PartName: (a[0] == "/" ? "" : "/") + a,
      ContentType: li[c][t.bookType] || li[c].xlsx
    }));
  }, s = function(c) {
    (e[c] || []).forEach(function(o) {
      n[n.length] = oe("Override", null, {
        PartName: (o[0] == "/" ? "" : "/") + o,
        ContentType: li[c][t.bookType] || li[c].xlsx
      });
    });
  }, f = function(c) {
    (e[c] || []).forEach(function(o) {
      n[n.length] = oe("Override", null, {
        PartName: (o[0] == "/" ? "" : "/") + o,
        ContentType: r[c][0]
      });
    });
  };
  return i("workbooks"), s("sheets"), s("charts"), f("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(f), f("vba"), f("comments"), f("threadedcomments"), f("drawings"), s("metadata"), f("people"), n.length > 2 && (n[n.length] = "</Types>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var Ie = {
  WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
  VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
  XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
  XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
  XLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",
  CXML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",
  CXMLP: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",
  CMNT: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
  SST: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
  STY: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
  THEME: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
  CHART: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
  CHARTEX: "http://schemas.microsoft.com/office/2014/relationships/chartEx",
  CS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet",
  WS: [
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
    "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"
  ],
  DS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet",
  MS: "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet",
  IMG: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
  DRAW: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
  XLMETA: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",
  TCMNT: "http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",
  PEOPLE: "http://schemas.microsoft.com/office/2017/10/relationships/person",
  VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
};
function Ma(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function ka(e, t) {
  var r = { "!id": {} };
  if (!e) return r;
  t.charAt(0) !== "/" && (t = "/" + t);
  var n = {};
  return (e.match(Nr) || []).forEach(function(a) {
    var i = Te(a);
    if (i[0] === "<Relationship") {
      var s = {};
      s.Type = i.Type, s.Target = i.Target, s.Id = i.Id, i.TargetMode && (s.TargetMode = i.TargetMode);
      var f = i.TargetMode === "External" ? i.Target : _a(i.Target, t);
      r[f] = s, n[i.Id] = s;
    }
  }), r["!id"] = n, r;
}
function Xn(e) {
  var t = [or, oe("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: dr.RELS
  })];
  return nr(e["!id"]).forEach(function(r) {
    t[t.length] = oe("Relationship", null, e["!id"][r]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Ve(e, t, r, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0) for (t = e["!idx"]; e["!id"]["rId" + t]; ++t)
    ;
  if (e["!idx"] = t + 1, a.Id = "rId" + t, a.Type = n, a.Target = r, [Ie.HLINK, Ie.XPATH, Ie.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id]) throw new Error("Cannot rewrite rId " + t);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, t;
}
var Gu = "application/vnd.oasis.opendocument.spreadsheet";
function Xu(e, t) {
  for (var r = $s(e), n, a; n = Pa.exec(r); ) switch (n[3]) {
    case "manifest":
      break;
    case "file-entry":
      if (a = Te(n[0], !1), a.path == "/" && a.type !== Gu) throw new Error("This OpenDocument is not a spreadsheet");
      break;
    case "encryption-data":
    case "algorithm":
    case "start-key-generation":
    case "key-derivation":
      throw new Error("Unsupported ODS Encryption");
    default:
      if (t && t.WTF) throw n;
  }
}
function ju(e) {
  var t = [or];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var r = 0; r < e.length; ++r) t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}
function ff(e, t, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (r || "odf") + "#" + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Yu(e, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Ku(e) {
  var t = [or];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var r = 0; r != e.length; ++r)
    t.push(ff(e[r][0], e[r][1])), t.push(Yu("", e[r][0]));
  return t.push(ff("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}
function Jc() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + _i.version + "</meta:generator></office:meta></office:document-meta>";
}
var lt = [
  ["cp:category", "Category"],
  ["cp:contentStatus", "ContentStatus"],
  ["cp:keywords", "Keywords"],
  ["cp:lastModifiedBy", "LastAuthor"],
  ["cp:lastPrinted", "LastPrinted"],
  ["cp:revision", "RevNumber"],
  ["cp:version", "Version"],
  ["dc:creator", "Author"],
  ["dc:description", "Comments"],
  ["dc:identifier", "Identifier"],
  ["dc:language", "Language"],
  ["dc:subject", "Subject"],
  ["dc:title", "Title"],
  ["dcterms:created", "CreatedDate", "date"],
  ["dcterms:modified", "ModifiedDate", "date"]
], Ju = /* @__PURE__ */ function() {
  for (var e = new Array(lt.length), t = 0; t < lt.length; ++t) {
    var r = lt[t], n = "(?:" + r[0].slice(0, r[0].indexOf(":")) + ":)" + r[0].slice(r[0].indexOf(":") + 1);
    e[t] = new RegExp("<" + n + "[^>]*>([\\s\\S]*?)</" + n + ">");
  }
  return e;
}();
function qc(e) {
  var t = {};
  e = ze(e);
  for (var r = 0; r < lt.length; ++r) {
    var n = lt[r], a = e.match(Ju[r]);
    a != null && a.length > 0 && (t[n[1]] = Pe(a[1])), n[2] === "date" && t[n[1]] && (t[n[1]] = Ye(t[n[1]]));
  }
  return t;
}
function es(e, t, r, n, a) {
  a[e] != null || t == null || t === "" || (a[e] = t, t = $e(t), n[n.length] = r ? oe(e, t, r) : Er(e, t));
}
function Zc(e, t) {
  var r = t || {}, n = [or, oe("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": dr.CORE_PROPS,
    "xmlns:dc": dr.dc,
    "xmlns:dcterms": dr.dcterms,
    "xmlns:dcmitype": dr.dcmitype,
    "xmlns:xsi": dr.xsi
  })], a = {};
  if (!e && !r.Props) return n.join("");
  e && (e.CreatedDate != null && es("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : vs(e.CreatedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && es("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : vs(e.ModifiedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != lt.length; ++i) {
    var s = lt[i], f = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
    f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && es(s[0], f, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var pn = [
  ["Application", "Application", "string"],
  ["AppVersion", "AppVersion", "string"],
  ["Company", "Company", "string"],
  ["DocSecurity", "DocSecurity", "string"],
  ["Manager", "Manager", "string"],
  ["HyperlinksChanged", "HyperlinksChanged", "bool"],
  ["SharedDoc", "SharedDoc", "bool"],
  ["LinksUpToDate", "LinksUpToDate", "bool"],
  ["ScaleCrop", "ScaleCrop", "bool"],
  ["HeadingPairs", "HeadingPairs", "raw"],
  ["TitlesOfParts", "TitlesOfParts", "raw"]
], Qc = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function eo(e, t, r, n) {
  var a = [];
  if (typeof e == "string") a = J0(e, n);
  else for (var i = 0; i < e.length; ++i) a = a.concat(e[i].map(function(l) {
    return { v: l };
  }));
  var s = typeof t == "string" ? J0(t, n).map(function(l) {
    return l.v;
  }) : t, f = 0, c = 0;
  if (s.length > 0) for (var o = 0; o !== a.length; o += 2) {
    switch (c = +a[o + 1].v, a[o].v) {
      case "Worksheets":
      case "工作表":
      case "Листы":
      case "أوراق العمل":
      case "ワークシート":
      case "גליונות עבודה":
      case "Arbeitsblätter":
      case "Çalışma Sayfaları":
      case "Feuilles de calcul":
      case "Fogli di lavoro":
      case "Folhas de cálculo":
      case "Planilhas":
      case "Regneark":
      case "Hojas de cálculo":
      case "Werkbladen":
        r.Worksheets = c, r.SheetNames = s.slice(f, f + c);
        break;
      case "Named Ranges":
      case "Rangos con nombre":
      case "名前付き一覧":
      case "Benannte Bereiche":
      case "Navngivne områder":
        r.NamedRanges = c, r.DefinedNames = s.slice(f, f + c);
        break;
      case "Charts":
      case "Diagramme":
        r.Chartsheets = c, r.ChartNames = s.slice(f, f + c);
        break;
    }
    f += c;
  }
}
function qu(e, t, r) {
  var n = {};
  return t || (t = {}), e = ze(e), pn.forEach(function(a) {
    var i = (e.match(Ra(a[0])) || [])[1];
    switch (a[2]) {
      case "string":
        i && (t[a[1]] = Pe(i));
        break;
      case "bool":
        t[a[1]] = i === "true";
        break;
      case "raw":
        var s = e.match(new RegExp("<" + a[0] + "[^>]*>([\\s\\S]*?)</" + a[0] + ">"));
        s && s.length > 0 && (n[a[1]] = s[1]);
        break;
    }
  }), n.HeadingPairs && n.TitlesOfParts && eo(n.HeadingPairs, n.TitlesOfParts, t, r), t;
}
function ro(e) {
  var t = [], r = oe;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = or, t[t.length] = oe("Properties", null, {
    xmlns: dr.EXT_PROPS,
    "xmlns:vt": dr.vt
  }), pn.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = $e(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (t[t.length] = r(n[0], a));
    }
  }), t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + $e(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var Zu = /<[^>]+>[^<]*/g;
function Qu(e, t) {
  var r = {}, n = "", a = e.match(Zu);
  if (a) for (var i = 0; i != a.length; ++i) {
    var s = a[i], f = Te(s);
    switch (f[0]) {
      case "<?xml":
        break;
      case "<Properties":
        break;
      case "<property":
        n = Pe(f.name);
        break;
      case "</property>":
        n = null;
        break;
      default:
        if (s.indexOf("<vt:") === 0) {
          var c = s.split(">"), o = c[0].slice(4), l = c[1];
          switch (o) {
            case "lpstr":
            case "bstr":
            case "lpwstr":
              r[n] = Pe(l);
              break;
            case "bool":
              r[n] = je(l);
              break;
            case "i1":
            case "i2":
            case "i4":
            case "i8":
            case "int":
            case "uint":
              r[n] = parseInt(l, 10);
              break;
            case "r4":
            case "r8":
            case "decimal":
              r[n] = parseFloat(l);
              break;
            case "filetime":
            case "date":
              r[n] = Ye(l);
              break;
            case "cy":
            case "error":
              r[n] = Pe(l);
              break;
            default:
              if (o.slice(-1) == "/") break;
              t.WTF && typeof console < "u" && console.warn("Unexpected", s, o, c);
          }
        } else if (s.slice(0, 2) !== "</") {
          if (t.WTF) throw new Error(s);
        }
    }
  }
  return r;
}
function to(e) {
  var t = [or, oe("Properties", null, {
    xmlns: dr.CUST_PROPS,
    "xmlns:vt": dr.vt
  })];
  if (!e) return t.join("");
  var r = 1;
  return nr(e).forEach(function(a) {
    ++r, t[t.length] = oe("property", cu(e[a]), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: r,
      name: $e(a)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var Ts = {
  Title: "Title",
  Subject: "Subject",
  Author: "Author",
  Keywords: "Keywords",
  Comments: "Description",
  LastAuthor: "LastAuthor",
  RevNumber: "Revision",
  Application: "AppName",
  /* TotalTime: 'TotalTime', */
  LastPrinted: "LastPrinted",
  CreatedDate: "Created",
  ModifiedDate: "LastSaved",
  /* Pages */
  /* Words */
  /* Characters */
  Category: "Category",
  /* PresentationFormat */
  Manager: "Manager",
  Company: "Company",
  /* Guid */
  /* HyperlinkBase */
  /* Bytes */
  /* Lines */
  /* Paragraphs */
  /* CharactersWithSpaces */
  AppVersion: "Version",
  ContentStatus: "ContentStatus",
  /* NOTE: missing from schema */
  Identifier: "Identifier",
  /* NOTE: missing from schema */
  Language: "Language"
  /* NOTE: missing from schema */
}, rs;
function e1(e, t, r) {
  rs || (rs = Mi(Ts)), t = rs[t] || t, e[t] = r;
}
function r1(e, t) {
  var r = [];
  return nr(Ts).map(function(n) {
    for (var a = 0; a < lt.length; ++a) if (lt[a][1] == n) return lt[a];
    for (a = 0; a < pn.length; ++a) if (pn[a][1] == n) return pn[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = t && t.Props && t.Props[n[1]] != null ? t.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), r.push(Er(Ts[n[1]] || n[1], a));
    }
  }), oe("DocumentProperties", r.join(""), { xmlns: Xr.o });
}
function t1(e, t) {
  var r = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && nr(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < lt.length; ++s) if (i == lt[s][1]) return;
      for (s = 0; s < pn.length; ++s) if (i == pn[s][1]) return;
      for (s = 0; s < r.length; ++s) if (i == r[s]) return;
      var f = e[i], c = "string";
      typeof f == "number" ? (c = "float", f = String(f)) : f === !0 || f === !1 ? (c = "boolean", f = f ? "1" : "0") : f = String(f), a.push(oe(X0(i), f, { "dt:dt": c }));
    }
  }), t && nr(t).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = t[i], f = "string";
      typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(oe(X0(i), s, { "dt:dt": f }));
    }
  }), "<" + n + ' xmlns="' + Xr.o + '">' + a.join("") + "</" + n + ">";
}
function e0(e) {
  var t = e.read_shift(4), r = e.read_shift(4);
  return new Date((r / 1e7 * Math.pow(2, 32) + t / 1e7 - 11644473600) * 1e3).toISOString().replace(/\.000/, "");
}
function n1(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e, r = t.getTime() / 1e3 + 11644473600, n = r % Math.pow(2, 32), a = (r - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = q(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function no(e, t, r) {
  var n = e.l, a = e.read_shift(0, "lpstr-cp");
  if (r) for (; e.l - n & 3; ) ++e.l;
  return a;
}
function ao(e, t, r) {
  var n = e.read_shift(0, "lpwstr");
  return n;
}
function io(e, t, r) {
  return t === 31 ? ao(e) : no(e, t, r);
}
function Ss(e, t, r) {
  return io(e, t, r === !1 ? 0 : 4);
}
function a1(e, t) {
  if (!t) throw new Error("VtUnalignedString must have positive length");
  return io(e, t, 0);
}
function i1(e) {
  for (var t = e.read_shift(4), r = [], n = 0; n != t; ++n) {
    var a = e.l;
    r[n] = e.read_shift(0, "lpwstr").replace(Mr, ""), e.l - a & 2 && (e.l += 2);
  }
  return r;
}
function s1(e) {
  for (var t = e.read_shift(4), r = [], n = 0; n != t; ++n) r[n] = e.read_shift(0, "lpstr-cp").replace(Mr, "");
  return r;
}
function f1(e) {
  var t = e.l, r = Ci(e, jc);
  e[e.l] == 0 && e[e.l + 1] == 0 && e.l - t & 2 && (e.l += 2);
  var n = Ci(e, Ur);
  return [r, n];
}
function c1(e) {
  for (var t = e.read_shift(4), r = [], n = 0; n < t / 2; ++n) r.push(f1(e));
  return r;
}
function cf(e, t) {
  for (var r = e.read_shift(4), n = {}, a = 0; a != r; ++a) {
    var i = e.read_shift(4), s = e.read_shift(4);
    n[i] = e.read_shift(s, t === 1200 ? "utf16le" : "utf8").replace(Mr, "").replace(wa, "!"), t === 1200 && s % 2 && (e.l += 2);
  }
  return e.l & 3 && (e.l = e.l >> 3 << 2), n;
}
function so(e) {
  var t = e.read_shift(4), r = e.slice(e.l, e.l + t);
  return e.l += t, (t & 3) > 0 && (e.l += 4 - (t & 3) & 3), r;
}
function o1(e) {
  var t = {};
  return t.Size = e.read_shift(4), e.l += t.Size + 3 - (t.Size - 1) % 4, t;
}
function Ci(e, t, r) {
  var n = e.read_shift(2), a, i = r || {};
  if (e.l += 2, t !== af && n !== t && Wu.indexOf(t) === -1 && !((t & 65534) == 4126 && (n & 65534) == 4126))
    throw new Error("Expected type " + t + " saw " + n);
  switch (t === af ? n : t) {
    case 2:
      return a = e.read_shift(2, "i"), i.raw || (e.l += 2), a;
    case 3:
      return a = e.read_shift(4, "i"), a;
    case 11:
      return e.read_shift(4) !== 0;
    case 19:
      return a = e.read_shift(4), a;
    case 30:
      return no(e, n, 4).replace(Mr, "");
    case 31:
      return ao(e);
    case 64:
      return e0(e);
    case 65:
      return so(e);
    case 71:
      return o1(e);
    case 80:
      return Ss(e, n, !i.raw).replace(Mr, "");
    case 81:
      return a1(
        e,
        n
        /*, 4*/
      ).replace(Mr, "");
    case 4108:
      return c1(e);
    case 4126:
    case 4127:
      return n == 4127 ? i1(e) : s1(e);
    default:
      throw new Error("TypedPropertyValue unrecognized type " + t + " " + n);
  }
}
function of(e, t) {
  var r = q(4), n = q(4);
  switch (r.write_shift(4, e == 80 ? 31 : e), e) {
    case 3:
      n.write_shift(-4, t);
      break;
    case 5:
      n = q(8), n.write_shift(8, t, "f");
      break;
    case 11:
      n.write_shift(4, t ? 1 : 0);
      break;
    case 64:
      n = n1(t);
      break;
    case 31:
    case 80:
      for (n = q(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), n.write_shift(4, t.length + 1), n.write_shift(0, t, "dbcs"); n.l != n.length; ) n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return pr([r, n]);
}
function lf(e, t) {
  var r = e.l, n = e.read_shift(4), a = e.read_shift(4), i = [], s = 0, f = 0, c = -1, o = {};
  for (s = 0; s != a; ++s) {
    var l = e.read_shift(4), h = e.read_shift(4);
    i[s] = [l, h + r];
  }
  i.sort(function(y, v) {
    return y[1] - v[1];
  });
  var u = {};
  for (s = 0; s != a; ++s) {
    if (e.l !== i[s][1]) {
      var x = !0;
      if (s > 0 && t) switch (t[i[s - 1][0]].t) {
        case 2:
          e.l + 2 === i[s][1] && (e.l += 2, x = !1);
          break;
        case 80:
          e.l <= i[s][1] && (e.l = i[s][1], x = !1);
          break;
        case 4108:
          e.l <= i[s][1] && (e.l = i[s][1], x = !1);
          break;
      }
      if ((!t || s == 0) && e.l <= i[s][1] && (x = !1, e.l = i[s][1]), x) throw new Error("Read Error: Expected address " + i[s][1] + " at " + e.l + " :" + s);
    }
    if (t) {
      var g = t[i[s][0]];
      if (u[g.n] = Ci(e, g.t, { raw: !0 }), g.p === "version" && (u[g.n] = String(u[g.n] >> 16) + "." + ("0000" + String(u[g.n] & 65535)).slice(-4)), g.n == "CodePage") switch (u[g.n]) {
        case 0:
          u[g.n] = 1252;
        case 874:
        case 932:
        case 936:
        case 949:
        case 950:
        case 1250:
        case 1251:
        case 1253:
        case 1254:
        case 1255:
        case 1256:
        case 1257:
        case 1258:
        case 1e4:
        case 1200:
        case 1201:
        case 1252:
        case 65e3:
        case -536:
        case 65001:
        case -535:
          mt(f = u[g.n] >>> 0 & 65535);
          break;
        default:
          throw new Error("Unsupported CodePage: " + u[g.n]);
      }
    } else if (i[s][0] === 1) {
      if (f = u.CodePage = Ci(e, Zs), mt(f), c !== -1) {
        var d = e.l;
        e.l = i[c][1], o = cf(e, f), e.l = d;
      }
    } else if (i[s][0] === 0) {
      if (f === 0) {
        c = s, e.l = i[s + 1][1];
        continue;
      }
      o = cf(e, f);
    } else {
      var m = o[i[s][0]], w;
      switch (e[e.l]) {
        case 65:
          e.l += 4, w = so(e);
          break;
        case 30:
          e.l += 4, w = Ss(e, e[e.l - 4]).replace(/\u0000+$/, "");
          break;
        case 31:
          e.l += 4, w = Ss(e, e[e.l - 4]).replace(/\u0000+$/, "");
          break;
        case 3:
          e.l += 4, w = e.read_shift(4, "i");
          break;
        case 19:
          e.l += 4, w = e.read_shift(4);
          break;
        case 5:
          e.l += 4, w = e.read_shift(8, "f");
          break;
        case 11:
          e.l += 4, w = sr(e, 4);
          break;
        case 64:
          e.l += 4, w = Ye(e0(e));
          break;
        default:
          throw new Error("unparsed value: " + e[e.l]);
      }
      u[m] = w;
    }
  }
  return e.l = r + n, u;
}
var fo = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function l1(e) {
  switch (typeof e) {
    case "boolean":
      return 11;
    case "number":
      return (e | 0) == e ? 3 : 5;
    case "string":
      return 31;
    case "object":
      if (e instanceof Date) return 64;
      break;
  }
  return -1;
}
function hf(e, t, r) {
  var n = q(8), a = [], i = [], s = 8, f = 0, c = q(8), o = q(8);
  if (c.write_shift(4, 2), c.write_shift(4, 1200), o.write_shift(4, 1), i.push(c), a.push(o), s += 8 + c.length, !t) {
    o = q(8), o.write_shift(4, 0), a.unshift(o);
    var l = [q(4)];
    for (l[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
      var h = e[f][0];
      for (c = q(8 + 2 * (h.length + 1) + (h.length % 2 ? 0 : 2)), c.write_shift(4, f + 2), c.write_shift(4, h.length + 1), c.write_shift(0, h, "dbcs"); c.l != c.length; ) c.write_shift(1, 0);
      l.push(c);
    }
    c = pr(l), i.unshift(c), s += 8 + c.length;
  }
  for (f = 0; f < e.length; ++f)
    if (!(t && !t[e[f][0]]) && !(fo.indexOf(e[f][0]) > -1 || Qc.indexOf(e[f][0]) > -1) && e[f][1] != null) {
      var u = e[f][1], x = 0;
      if (t) {
        x = +t[e[f][0]];
        var g = r[x];
        if (g.p == "version" && typeof u == "string") {
          var d = u.split(".");
          u = (+d[0] << 16) + (+d[1] || 0);
        }
        c = of(g.t, u);
      } else {
        var m = l1(u);
        m == -1 && (m = 31, u = String(u)), c = of(m, u);
      }
      i.push(c), o = q(8), o.write_shift(4, t ? x : 2 + f), a.push(o), s += 8 + c.length;
    }
  var w = 8 * (i.length + 1);
  for (f = 0; f < i.length; ++f)
    a[f].write_shift(4, w), w += i[f].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), pr([n].concat(a).concat(i));
}
function uf(e, t, r) {
  var n = e.content;
  if (!n) return {};
  _r(n, 0);
  var a, i, s, f, c = 0;
  n.chk("feff", "Byte Order: "), n.read_shift(2);
  var o = n.read_shift(4), l = n.read_shift(16);
  if (l !== ve.utils.consts.HEADER_CLSID && l !== r) throw new Error("Bad PropertySet CLSID " + l);
  if (a = n.read_shift(4), a !== 1 && a !== 2) throw new Error("Unrecognized #Sets: " + a);
  if (i = n.read_shift(16), f = n.read_shift(4), a === 1 && f !== n.l) throw new Error("Length mismatch: " + f + " !== " + n.l);
  a === 2 && (s = n.read_shift(16), c = n.read_shift(4));
  var h = lf(n, t), u = { SystemIdentifier: o };
  for (var x in h) u[x] = h[x];
  if (u.FMTID = i, a === 1) return u;
  if (c - n.l == 2 && (n.l += 2), n.l !== c) throw new Error("Length mismatch 2: " + n.l + " !== " + c);
  var g;
  try {
    g = lf(n, null);
  } catch {
  }
  for (x in g) u[x] = g[x];
  return u.FMTID = [i, s], u;
}
function xf(e, t, r, n, a, i) {
  var s = q(a ? 68 : 48), f = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, ve.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, t, "hex"), s.write_shift(4, a ? 68 : 48);
  var c = hf(e, r, n);
  if (f.push(c), a) {
    var o = hf(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + c.length), f.push(o);
  }
  return pr(f);
}
function Yt(e, t) {
  return e.read_shift(t), null;
}
function h1(e, t) {
  t || (t = q(e));
  for (var r = 0; r < e; ++r) t.write_shift(1, 0);
  return t;
}
function u1(e, t, r) {
  for (var n = [], a = e.l + t; e.l < a; ) n.push(r(e, a - e.l));
  if (a !== e.l) throw new Error("Slurp error");
  return n;
}
function sr(e, t) {
  return e.read_shift(t) === 1;
}
function Rr(e, t) {
  return t || (t = q(2)), t.write_shift(2, +!!e), t;
}
function ur(e) {
  return e.read_shift(2, "u");
}
function ot(e, t) {
  return t || (t = q(2)), t.write_shift(2, e), t;
}
function co(e, t) {
  return u1(e, t, ur);
}
function x1(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return r === 1 ? t : t === 1;
}
function oo(e, t, r) {
  return r || (r = q(2)), r.write_shift(1, t == "e" ? +e : +!!e), r.write_shift(1, t == "e" ? 1 : 0), r;
}
function Ka(e, t, r) {
  var n = e.read_shift(r && r.biff >= 12 ? 2 : 1), a = "sbcs-cont";
  if (r && r.biff >= 8, !r || r.biff == 8) {
    var i = e.read_shift(1);
    i && (a = "dbcs-cont");
  } else r.biff == 12 && (a = "wstr");
  r.biff >= 2 && r.biff <= 5 && (a = "cpstr");
  var s = n ? e.read_shift(n, a) : "";
  return s;
}
function d1(e) {
  var t = e.read_shift(2), r = e.read_shift(1), n = r & 4, a = r & 8, i = 1 + (r & 1), s = 0, f, c = {};
  a && (s = e.read_shift(2)), n && (f = e.read_shift(4));
  var o = i == 2 ? "dbcs-cont" : "sbcs-cont", l = t === 0 ? "" : e.read_shift(t, o);
  return a && (e.l += 4 * s), n && (e.l += f), c.t = l, a || (c.raw = "<t>" + c.t + "</t>", c.r = c.t), c;
}
function g1(e) {
  var t = e.t || "", r = q(3);
  r.write_shift(2, t.length), r.write_shift(1, 1);
  var n = q(2 * t.length);
  n.write_shift(2 * t.length, t, "utf16le");
  var a = [r, n];
  return pr(a);
}
function Tn(e, t, r) {
  var n;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return e.read_shift(t, "cpstr");
    if (r.biff >= 12) return e.read_shift(t, "dbcs-cont");
  }
  var a = e.read_shift(1);
  return a === 0 ? n = e.read_shift(t, "sbcs-cont") : n = e.read_shift(t, "dbcs-cont"), n;
}
function Ja(e, t, r) {
  var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : Tn(e, n, r);
}
function In(e, t, r) {
  if (r.biff > 5) return Ja(e, t, r);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function lo(e, t, r) {
  return r || (r = q(3 + 2 * e.length)), r.write_shift(2, e.length), r.write_shift(1, 1), r.write_shift(31, e, "utf16le"), r;
}
function m1(e) {
  var t = e.read_shift(1);
  e.l++;
  var r = e.read_shift(2);
  return e.l += 2, [t, r];
}
function p1(e) {
  var t = e.read_shift(4), r = e.l, n = !1;
  t > 24 && (e.l += t - 24, e.read_shift(16) === "795881f43b1d7f48af2c825dc4852763" && (n = !0), e.l = r);
  var a = e.read_shift((n ? t - 24 : t) >> 1, "utf16le").replace(Mr, "");
  return n && (e.l += 24), a;
}
function v1(e) {
  for (var t = e.read_shift(2), r = ""; t-- > 0; ) r += "../";
  var n = e.read_shift(0, "lpstr-ansi");
  if (e.l += 2, e.read_shift(2) != 57005) throw new Error("Bad FileMoniker");
  var a = e.read_shift(4);
  if (a === 0) return r + n.replace(/\\/g, "/");
  var i = e.read_shift(4);
  if (e.read_shift(2) != 3) throw new Error("Bad FileMoniker");
  var s = e.read_shift(i >> 1, "utf16le").replace(Mr, "");
  return r + s;
}
function w1(e, t) {
  var r = e.read_shift(16);
  switch (r) {
    case "e0c9ea79f9bace118c8200aa004ba90b":
      return p1(e);
    case "0303000000000000c000000000000046":
      return v1(e);
    default:
      throw new Error("Unsupported Moniker " + r);
  }
}
function hi(e) {
  var t = e.read_shift(4), r = t > 0 ? e.read_shift(t, "utf16le").replace(Mr, "") : "";
  return r;
}
function df(e, t) {
  t || (t = q(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
  for (var r = 0; r < e.length; ++r) t.write_shift(2, e.charCodeAt(r));
  return t.write_shift(2, 0), t;
}
function _1(e, t) {
  var r = e.l + t, n = e.read_shift(4);
  if (n !== 2) throw new Error("Unrecognized streamVersion: " + n);
  var a = e.read_shift(2);
  e.l += 2;
  var i, s, f, c, o = "", l, h;
  a & 16 && (i = hi(e, r - e.l)), a & 128 && (s = hi(e, r - e.l)), (a & 257) === 257 && (f = hi(e, r - e.l)), (a & 257) === 1 && (c = w1(e, r - e.l)), a & 8 && (o = hi(e, r - e.l)), a & 32 && (l = e.read_shift(16)), a & 64 && (h = e0(
    e
    /*, 8*/
  )), e.l = r;
  var u = s || f || c || "";
  u && o && (u += "#" + o), u || (u = "#" + o), a & 2 && u.charAt(0) == "/" && u.charAt(1) != "/" && (u = "file://" + u);
  var x = { Target: u };
  return l && (x.guid = l), h && (x.time = h), i && (x.Tooltip = i), x;
}
function E1(e) {
  var t = q(512), r = 0, n = e.Target;
  n.slice(0, 7) == "file://" && (n = n.slice(7));
  var a = n.indexOf("#"), i = a > -1 ? 31 : 23;
  switch (n.charAt(0)) {
    case "#":
      i = 28;
      break;
    case ".":
      i &= -3;
      break;
  }
  t.write_shift(4, 2), t.write_shift(4, i);
  var s = [8, 6815827, 6619237, 4849780, 83];
  for (r = 0; r < s.length; ++r) t.write_shift(4, s[r]);
  if (i == 28)
    n = n.slice(1), df(n, t);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    var f = a > -1 ? n.slice(0, a) : n;
    for (t.write_shift(4, 2 * (f.length + 1)), r = 0; r < f.length; ++r) t.write_shift(2, f.charCodeAt(r));
    t.write_shift(2, 0), i & 8 && df(a > -1 ? n.slice(a + 1) : "", t);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    for (var c = 0; n.slice(c * 3, c * 3 + 3) == "../" || n.slice(c * 3, c * 3 + 3) == "..\\"; ) ++c;
    for (t.write_shift(2, c), t.write_shift(4, n.length - 3 * c + 1), r = 0; r < n.length - 3 * c; ++r) t.write_shift(1, n.charCodeAt(r + 3 * c) & 255);
    for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), r = 0; r < 6; ++r) t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}
function ho(e) {
  var t = e.read_shift(1), r = e.read_shift(1), n = e.read_shift(1), a = e.read_shift(1);
  return [t, r, n, a];
}
function uo(e, t) {
  var r = ho(e);
  return r[3] = 0, r;
}
function bt(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2);
  return { r: t, c: r, ixfe: n };
}
function Sn(e, t, r, n) {
  return n || (n = q(6)), n.write_shift(2, e), n.write_shift(2, t), n.write_shift(2, r || 0), n;
}
function y1(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return e.l += 8, { type: t, flags: r };
}
function T1(e, t, r) {
  return t === 0 ? "" : In(e, t, r);
}
function S1(e, t, r) {
  var n = r.biff > 8 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [a, i, s];
}
function xo(e) {
  var t = e.read_shift(2), r = qs(e);
  return [t, r];
}
function k1(e, t, r) {
  e.l += 4, t -= 4;
  var n = e.l + t, a = Ka(e, t, r), i = e.read_shift(2);
  if (n -= e.l, i !== n) throw new Error("Malformed AddinUdf: padding = " + n + " != " + i);
  return e.l += i, a;
}
function Hi(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2);
  return { s: { c: n, r: t }, e: { c: a, r } };
}
function go(e, t) {
  return t || (t = q(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}
function mo(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { c: n, r: t }, e: { c: a, r } };
}
var A1 = mo;
function po(e) {
  e.l += 4;
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2);
  return e.l += 12, [r, t, n];
}
function F1(e) {
  var t = {};
  return e.l += 4, e.l += 16, t.fSharedNote = e.read_shift(2), e.l += 4, t;
}
function b1(e) {
  var t = {};
  return e.l += 4, e.cf = e.read_shift(2), t;
}
function Tr(e) {
  e.l += 2, e.l += e.read_shift(2);
}
var C1 = {
  /*::[*/
  0: Tr,
  /* FtEnd */
  /*::[*/
  4: Tr,
  /* FtMacro */
  /*::[*/
  5: Tr,
  /* FtButton */
  /*::[*/
  6: Tr,
  /* FtGmo */
  /*::[*/
  7: b1,
  /* FtCf */
  /*::[*/
  8: Tr,
  /* FtPioGrbit */
  /*::[*/
  9: Tr,
  /* FtPictFmla */
  /*::[*/
  10: Tr,
  /* FtCbls */
  /*::[*/
  11: Tr,
  /* FtRbo */
  /*::[*/
  12: Tr,
  /* FtSbs */
  /*::[*/
  13: F1,
  /* FtNts */
  /*::[*/
  14: Tr,
  /* FtSbsFmla */
  /*::[*/
  15: Tr,
  /* FtGboData */
  /*::[*/
  16: Tr,
  /* FtEdoData */
  /*::[*/
  17: Tr,
  /* FtRboData */
  /*::[*/
  18: Tr,
  /* FtCblsData */
  /*::[*/
  19: Tr,
  /* FtLbsData */
  /*::[*/
  20: Tr,
  /* FtCblsFmla */
  /*::[*/
  21: po
};
function O1(e, t) {
  for (var r = e.l + t, n = []; e.l < r; ) {
    var a = e.read_shift(2);
    e.l -= 2;
    try {
      n.push(C1[a](e, r - e.l));
    } catch {
      return e.l = r, n;
    }
  }
  return e.l != r && (e.l = r), n;
}
function ui(e, t) {
  var r = { BIFFVer: 0, dt: 0 };
  switch (r.BIFFVer = e.read_shift(2), t -= 2, t >= 2 && (r.dt = e.read_shift(2), e.l -= 2), r.BIFFVer) {
    case 1536:
    case 1280:
    case 1024:
    case 768:
    case 512:
    case 2:
    case 7:
      break;
    default:
      if (t > 6) throw new Error("Unexpected BIFF Ver " + r.BIFFVer);
  }
  return e.read_shift(t), r;
}
function r0(e, t, r) {
  var n = 1536, a = 16;
  switch (r.bookType) {
    case "biff8":
      break;
    case "biff5":
      n = 1280, a = 8;
      break;
    case "biff4":
      n = 4, a = 6;
      break;
    case "biff3":
      n = 3, a = 6;
      break;
    case "biff2":
      n = 2, a = 4;
      break;
    case "xla":
      break;
    default:
      throw new Error("unsupported BIFF version");
  }
  var i = q(a);
  return i.write_shift(2, n), i.write_shift(2, t), a > 4 && i.write_shift(2, 29282), a > 6 && i.write_shift(2, 1997), a > 8 && (i.write_shift(2, 49161), i.write_shift(2, 1), i.write_shift(2, 1798), i.write_shift(2, 0)), i;
}
function N1(e, t) {
  return t === 0 || e.read_shift(2), 1200;
}
function I1(e, t, r) {
  if (r.enc)
    return e.l += t, "";
  var n = e.l, a = In(e, 0, r);
  return e.read_shift(t + n - e.l), a;
}
function B1(e, t) {
  var r = !t || t.biff == 8, n = q(r ? 112 : 54);
  for (n.write_shift(t.biff == 8 ? 2 : 1, 7), r && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (r ? 0 : 536870912)); n.l < n.length; ) n.write_shift(1, r ? 0 : 32);
  return n;
}
function D1(e, t, r) {
  var n = r && r.biff == 8 || t == 2 ? e.read_shift(2) : (e.l += t, 0);
  return { fDialog: n & 16, fBelow: n & 64, fRight: n & 128 };
}
function R1(e, t, r) {
  var n = e.read_shift(4), a = e.read_shift(1) & 3, i = e.read_shift(1);
  switch (i) {
    case 0:
      i = "Worksheet";
      break;
    case 1:
      i = "Macrosheet";
      break;
    case 2:
      i = "Chartsheet";
      break;
    case 6:
      i = "VBAModule";
      break;
  }
  var s = Ka(e, 0, r);
  return s.length === 0 && (s = "Sheet1"), { pos: n, hs: a, dt: i, name: s };
}
function L1(e, t) {
  var r = !t || t.biff >= 8 ? 2 : 1, n = q(8 + r * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), t.biff >= 8 && n.write_shift(1, 1), n.write_shift(r * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
  var a = n.slice(0, n.l);
  return a.l = n.l, a;
}
function P1(e, t) {
  for (var r = e.l + t, n = e.read_shift(4), a = e.read_shift(4), i = [], s = 0; s != a && e.l < r; ++s)
    i.push(d1(e));
  return i.Count = n, i.Unique = a, i;
}
function M1(e, t) {
  var r = q(8);
  r.write_shift(4, e.Count), r.write_shift(4, e.Unique);
  for (var n = [], a = 0; a < e.length; ++a) n[a] = g1(e[a]);
  var i = pr([r].concat(n));
  return i.parts = [r.length].concat(n.map(function(s) {
    return s.length;
  })), i;
}
function U1(e, t) {
  var r = {};
  return r.dsst = e.read_shift(2), e.l += t - 2, r;
}
function W1(e) {
  var t = {};
  t.r = e.read_shift(2), t.c = e.read_shift(2), t.cnt = e.read_shift(2) - t.c;
  var r = e.read_shift(2);
  e.l += 4;
  var n = e.read_shift(1);
  return e.l += 3, n & 7 && (t.level = n & 7), n & 32 && (t.hidden = !0), n & 64 && (t.hpt = r / 20), t;
}
function H1(e) {
  var t = y1(e);
  if (t.type != 2211) throw new Error("Invalid Future Record " + t.type);
  var r = e.read_shift(4);
  return r !== 0;
}
function V1(e) {
  return e.read_shift(2), e.read_shift(4);
}
function gf(e, t, r) {
  var n = 0;
  r && r.biff == 2 || (n = e.read_shift(2));
  var a = e.read_shift(2);
  r && r.biff == 2 && (n = 1 - (a >> 15), a &= 32767);
  var i = { Unsynced: n & 1, DyZero: (n & 2) >> 1, ExAsc: (n & 4) >> 2, ExDsc: (n & 8) >> 3 };
  return [i, a];
}
function $1(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2), i = e.read_shift(2), s = e.read_shift(2), f = e.read_shift(2), c = e.read_shift(2), o = e.read_shift(2);
  return {
    Pos: [t, r],
    Dim: [n, a],
    Flags: i,
    CurTab: s,
    FirstTab: f,
    Selected: c,
    TabRatio: o
  };
}
function z1() {
  var e = q(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function G1(e, t, r) {
  if (r && r.biff >= 2 && r.biff < 5) return {};
  var n = e.read_shift(2);
  return { RTL: n & 64 };
}
function X1(e) {
  var t = q(18), r = 1718;
  return e && e.RTL && (r |= 64), t.write_shift(2, r), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
function j1() {
}
function Y1(e, t, r) {
  var n = {
    dyHeight: e.read_shift(2),
    fl: e.read_shift(2)
  };
  switch (r && r.biff || 8) {
    case 2:
      break;
    case 3:
    case 4:
      e.l += 2;
      break;
    default:
      e.l += 10;
      break;
  }
  return n.name = Ka(e, 0, r), n;
}
function K1(e, t) {
  var r = e.name || "Arial", n = t && t.biff == 5, a = n ? 15 + r.length : 16 + 2 * r.length, i = q(a);
  return i.write_shift(2, e.sz * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, r.length), n || i.write_shift(1, 1), i.write_shift((n ? 1 : 2) * r.length, r, n ? "sbcs" : "utf16le"), i;
}
function J1(e) {
  var t = bt(e);
  return t.isst = e.read_shift(4), t;
}
function q1(e, t, r, n) {
  var a = q(10);
  return Sn(e, t, n, a), a.write_shift(4, r), a;
}
function Z1(e, t, r) {
  r.biffguess && r.biff == 2 && (r.biff = 5);
  var n = e.l + t, a = bt(e);
  r.biff == 2 && e.l++;
  var i = Ja(e, n - e.l, r);
  return a.val = i, a;
}
function Q1(e, t, r, n, a) {
  var i = !a || a.biff == 8, s = q(8 + +i + (1 + i) * r.length);
  return Sn(e, t, n, s), s.write_shift(2, r.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"), s;
}
function ex(e, t, r) {
  var n = e.read_shift(2), a = In(e, 0, r);
  return [n, a];
}
function rx(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = q(a ? 3 + t.length : 5 + 2 * t.length)), n.write_shift(2, e), n.write_shift(a ? 1 : 2, t.length), a || n.write_shift(1, 1), n.write_shift((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le");
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return i.l == null && (i.l = i.length), i;
}
var tx = In;
function mf(e, t, r) {
  var n = e.l + t, a = r.biff == 8 || !r.biff ? 4 : 2, i = e.read_shift(a), s = e.read_shift(a), f = e.read_shift(2), c = e.read_shift(2);
  return e.l = n, { s: { r: i, c: f }, e: { r: s, c } };
}
function nx(e, t) {
  var r = t.biff == 8 || !t.biff ? 4 : 2, n = q(2 * r + 6);
  return n.write_shift(r, e.s.r), n.write_shift(r, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function ax(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = xo(e);
  return { r: t, c: r, ixfe: n[0], rknum: n[1] };
}
function ix(e, t) {
  for (var r = e.l + t - 2, n = e.read_shift(2), a = e.read_shift(2), i = []; e.l < r; ) i.push(xo(e));
  if (e.l !== r) throw new Error("MulRK read error");
  var s = e.read_shift(2);
  if (i.length != s - a + 1) throw new Error("MulRK length mismatch");
  return { r: n, c: a, C: s, rkrec: i };
}
function sx(e, t) {
  for (var r = e.l + t - 2, n = e.read_shift(2), a = e.read_shift(2), i = []; e.l < r; ) i.push(e.read_shift(2));
  if (e.l !== r) throw new Error("MulBlank read error");
  var s = e.read_shift(2);
  if (i.length != s - a + 1) throw new Error("MulBlank length mismatch");
  return { r: n, c: a, C: s, ixfe: i };
}
function fx(e, t, r, n) {
  var a = {}, i = e.read_shift(4), s = e.read_shift(4), f = e.read_shift(4), c = e.read_shift(2);
  return a.patternType = Hu[f >> 26], n.cellStyles && (a.alc = i & 7, a.fWrap = i >> 3 & 1, a.alcV = i >> 4 & 7, a.fJustLast = i >> 7 & 1, a.trot = i >> 8 & 255, a.cIndent = i >> 16 & 15, a.fShrinkToFit = i >> 20 & 1, a.iReadOrder = i >> 22 & 2, a.fAtrNum = i >> 26 & 1, a.fAtrFnt = i >> 27 & 1, a.fAtrAlc = i >> 28 & 1, a.fAtrBdr = i >> 29 & 1, a.fAtrPat = i >> 30 & 1, a.fAtrProt = i >> 31 & 1, a.dgLeft = s & 15, a.dgRight = s >> 4 & 15, a.dgTop = s >> 8 & 15, a.dgBottom = s >> 12 & 15, a.icvLeft = s >> 16 & 127, a.icvRight = s >> 23 & 127, a.grbitDiag = s >> 30 & 3, a.icvTop = f & 127, a.icvBottom = f >> 7 & 127, a.icvDiag = f >> 14 & 127, a.dgDiag = f >> 21 & 15, a.icvFore = c & 127, a.icvBack = c >> 7 & 127, a.fsxButton = c >> 14 & 1), a;
}
function cx(e, t, r) {
  var n = {};
  return n.ifnt = e.read_shift(2), n.numFmtId = e.read_shift(2), n.flags = e.read_shift(2), n.fStyle = n.flags >> 2 & 1, t -= 6, n.data = fx(e, t, n.fStyle, r), n;
}
function pf(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = q(a ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, t << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), n.write_shift(4, i), n.write_shift(4, 0), a || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function ox(e) {
  e.l += 4;
  var t = [e.read_shift(2), e.read_shift(2)];
  if (t[0] !== 0 && t[0]--, t[1] !== 0 && t[1]--, t[0] > 7 || t[1] > 7) throw new Error("Bad Gutters: " + t.join("|"));
  return t;
}
function lx(e) {
  var t = q(8);
  return t.write_shift(4, 0), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function vf(e, t, r) {
  var n = bt(e);
  (r.biff == 2 || t == 9) && ++e.l;
  var a = x1(e);
  return n.val = a, n.t = a === !0 || a === !1 ? "b" : "e", n;
}
function hx(e, t, r, n, a, i) {
  var s = q(8);
  return Sn(e, t, n, s), oo(r, i, s), s;
}
function ux(e, t, r) {
  r.biffguess && r.biff == 2 && (r.biff = 5);
  var n = bt(e), a = br(e);
  return n.val = a, n;
}
function xx(e, t, r, n) {
  var a = q(14);
  return Sn(e, t, n, a), yn(r, a), a;
}
var wf = T1;
function dx(e, t, r) {
  var n = e.l + t, a = e.read_shift(2), i = e.read_shift(2);
  if (r.sbcch = i, i == 1025 || i == 14849) return [i, a];
  if (i < 1 || i > 255) throw new Error("Unexpected SupBook type: " + i);
  for (var s = Tn(e, i), f = []; n > e.l; ) f.push(Ja(e));
  return [i, a, s, f];
}
function _f(e, t, r) {
  var n = e.read_shift(2), a, i = {
    fBuiltIn: n & 1,
    fWantAdvise: n >>> 1 & 1,
    fWantPict: n >>> 2 & 1,
    fOle: n >>> 3 & 1,
    fOleLink: n >>> 4 & 1,
    cf: n >>> 5 & 1023,
    fIcon: n >>> 15 & 1
  };
  return r.sbcch === 14849 && (a = k1(e, t - 2, r)), i.body = a || e.read_shift(t - 2), typeof a == "string" && (i.Name = a), i;
}
var gx = [
  "_xlnm.Consolidate_Area",
  "_xlnm.Auto_Open",
  "_xlnm.Auto_Close",
  "_xlnm.Extract",
  "_xlnm.Database",
  "_xlnm.Criteria",
  "_xlnm.Print_Area",
  "_xlnm.Print_Titles",
  "_xlnm.Recorder",
  "_xlnm.Data_Form",
  "_xlnm.Auto_Activate",
  "_xlnm.Auto_Deactivate",
  "_xlnm.Sheet_Title",
  "_xlnm._FilterDatabase"
];
function Ef(e, t, r) {
  var n = e.l + t, a = e.read_shift(2), i = e.read_shift(1), s = e.read_shift(1), f = e.read_shift(r && r.biff == 2 ? 1 : 2), c = 0;
  (!r || r.biff >= 5) && (r.biff != 5 && (e.l += 2), c = e.read_shift(2), r.biff == 5 && (e.l += 2), e.l += 4);
  var o = Tn(e, s, r);
  a & 32 && (o = gx[o.charCodeAt(0)]);
  var l = n - e.l;
  r && r.biff == 2 && --l;
  var h = n == e.l || f === 0 || !(l > 0) ? [] : Op(e, l, r, f);
  return {
    chKey: i,
    Name: o,
    itab: c,
    rgce: h
  };
}
function vo(e, t, r) {
  if (r.biff < 8) return mx(e, t, r);
  for (var n = [], a = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2); i-- !== 0; ) n.push(S1(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != a) throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function mx(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = Ka(e, t, r);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function px(e, t, r) {
  if (r.biff < 8) {
    e.l += t;
    return;
  }
  var n = e.read_shift(2), a = e.read_shift(2), i = Tn(e, n, r), s = Tn(e, a, r);
  return [i, s];
}
function vx(e, t, r) {
  var n = mo(e);
  e.l++;
  var a = e.read_shift(1);
  return t -= 8, [Np(e, t, r), a, n];
}
function yf(e, t, r) {
  var n = A1(e);
  switch (r.biff) {
    case 2:
      e.l++, t -= 7;
      break;
    case 3:
    case 4:
      e.l += 2, t -= 8;
      break;
    default:
      e.l += 6, t -= 12;
  }
  return [n, bp(e, t, r)];
}
function wx(e) {
  var t = e.read_shift(4) !== 0, r = e.read_shift(4) !== 0, n = e.read_shift(4);
  return [t, r, n];
}
function _x(e, t, r) {
  if (!(r.biff < 8)) {
    var n = e.read_shift(2), a = e.read_shift(2), i = e.read_shift(2), s = e.read_shift(2), f = In(e, 0, r);
    return r.biff < 8 && e.read_shift(1), [{ r: n, c: a }, f, s, i];
  }
}
function Ex(e, t, r) {
  return _x(e, t, r);
}
function yx(e, t) {
  for (var r = [], n = e.read_shift(2); n--; ) r.push(Hi(e));
  return r;
}
function Tx(e) {
  var t = q(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var r = 0; r < e.length; ++r) go(e[r], t);
  return t;
}
function Sx(e, t, r) {
  if (r && r.biff < 8) return Ax(e, t, r);
  var n = po(e), a = O1(e, t - 22, n[1]);
  return { cmo: n, ft: a };
}
var kx = {
  8: function(e, t) {
    var r = e.l + t;
    e.l += 10;
    var n = e.read_shift(2);
    e.l += 4, e.l += 2, e.l += 2, e.l += 2, e.l += 4;
    var a = e.read_shift(1);
    return e.l += a, e.l = r, { fmt: n };
  }
};
function Ax(e, t, r) {
  e.l += 4;
  var n = e.read_shift(2), a = e.read_shift(2), i = e.read_shift(2);
  e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 6, t -= 36;
  var s = [];
  return s.push((kx[n] || Or)(e, t, r)), { cmo: [a, n, i], ft: s };
}
function Fx(e, t, r) {
  var n = e.l, a = "";
  try {
    e.l += 4;
    var i = (r.lastobj || { cmo: [0, 0] }).cmo[1], s;
    [0, 5, 7, 11, 12, 14].indexOf(i) == -1 ? e.l += 6 : s = m1(e, 6, r);
    var f = e.read_shift(2);
    e.read_shift(2), ur(e, 2);
    var c = e.read_shift(2);
    e.l += c;
    for (var o = 1; o < e.lens.length - 1; ++o) {
      if (e.l - n != e.lens[o]) throw new Error("TxO: bad continue record");
      var l = e[e.l], h = Tn(e, e.lens[o + 1] - e.lens[o] - 1);
      if (a += h, a.length >= (l ? f : 2 * f)) break;
    }
    if (a.length !== f && a.length !== f * 2)
      throw new Error("cchText: " + f + " != " + a.length);
    return e.l = n + t, { t: a };
  } catch {
    return e.l = n + t, { t: a };
  }
}
function bx(e, t) {
  var r = Hi(e);
  e.l += 16;
  var n = _1(e, t - 24);
  return [r, n];
}
function Cx(e) {
  var t = q(24), r = er(e[0]);
  t.write_shift(2, r.r), t.write_shift(2, r.r), t.write_shift(2, r.c), t.write_shift(2, r.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a) t.write_shift(1, parseInt(n[a], 16));
  return pr([t, E1(e[1])]);
}
function Ox(e, t) {
  e.read_shift(2);
  var r = Hi(e), n = e.read_shift((t - 10) / 2, "dbcs-cont");
  return n = n.replace(Mr, ""), [r, n];
}
function Nx(e) {
  var t = e[1].Tooltip, r = q(10 + 2 * (t.length + 1));
  r.write_shift(2, 2048);
  var n = er(e[0]);
  r.write_shift(2, n.r), r.write_shift(2, n.r), r.write_shift(2, n.c), r.write_shift(2, n.c);
  for (var a = 0; a < t.length; ++a) r.write_shift(2, t.charCodeAt(a));
  return r.write_shift(2, 0), r;
}
function Ix(e) {
  var t = [0, 0], r;
  return r = e.read_shift(2), t[0] = sf[r] || r, r = e.read_shift(2), t[1] = sf[r] || r, t;
}
function Bx(e) {
  return e || (e = q(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function Dx(e) {
  for (var t = e.read_shift(2), r = []; t-- > 0; ) r.push(uo(e));
  return r;
}
function Rx(e) {
  for (var t = e.read_shift(2), r = []; t-- > 0; ) r.push(uo(e));
  return r;
}
function Lx(e) {
  e.l += 2;
  var t = { cxfs: 0, crc: 0 };
  return t.cxfs = e.read_shift(2), t.crc = e.read_shift(4), t;
}
function wo(e, t, r) {
  if (!r.cellStyles) return Or(e, t);
  var n = r && r.biff >= 12 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n), s = e.read_shift(n), f = e.read_shift(n), c = e.read_shift(2);
  n == 2 && (e.l += 2);
  var o = { s: a, e: i, w: s, ixfe: f, flags: c };
  return (r.biff >= 5 || !r.biff) && (o.level = c >> 8 & 7), o;
}
function Px(e, t) {
  var r = q(12);
  r.write_shift(2, t), r.write_shift(2, t), r.write_shift(2, e.width * 256), r.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), r.write_shift(1, n), n = e.level || 0, r.write_shift(1, n), r.write_shift(2, 0), r;
}
function Mx(e, t) {
  var r = {};
  return t < 32 || (e.l += 16, r.header = br(e), r.footer = br(e), e.l += 2), r;
}
function Ux(e, t, r) {
  var n = { area: !1 };
  if (r.biff != 5)
    return e.l += t, n;
  var a = e.read_shift(1);
  return e.l += 3, a & 16 && (n.area = !0), n;
}
function Wx(e) {
  for (var t = q(2 * e), r = 0; r < e; ++r) t.write_shift(2, r + 1);
  return t;
}
var Hx = bt, Vx = co, $x = Ja;
function zx(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(4), a = { fmt: t, env: r, len: n, data: e.slice(e.l, e.l + n) };
  return e.l += n, a;
}
function Gx(e, t, r) {
  r.biffguess && r.biff == 5 && (r.biff = 2);
  var n = bt(e);
  ++e.l;
  var a = In(e, t - 7, r);
  return n.t = "str", n.val = a, n;
}
function Xx(e) {
  var t = bt(e);
  ++e.l;
  var r = br(e);
  return t.t = "n", t.val = r, t;
}
function jx(e, t, r) {
  var n = q(15);
  return ei(n, e, t), n.write_shift(8, r, "f"), n;
}
function Yx(e) {
  var t = bt(e);
  ++e.l;
  var r = e.read_shift(2);
  return t.t = "n", t.val = r, t;
}
function Kx(e, t, r) {
  var n = q(9);
  return ei(n, e, t), n.write_shift(2, r), n;
}
function Jx(e) {
  var t = e.read_shift(1);
  return t === 0 ? (e.l++, "") : e.read_shift(t, "sbcs-cont");
}
function qx(e, t) {
  e.l += 6, e.l += 2, e.l += 1, e.l += 3, e.l += 1, e.l += t - 13;
}
function Zx(e, t, r) {
  var n = e.l + t, a = bt(e), i = e.read_shift(2), s = Tn(e, i, r);
  return e.l = n, a.t = "str", a.val = s, a;
}
var Qx = [2, 3, 48, 49, 131, 139, 140, 245], ks = /* @__PURE__ */ function() {
  var e = {
    /* Code Pages Supported by Visual FoxPro */
    /*::[*/
    1: 437,
    /*::[*/
    2: 850,
    /*::[*/
    3: 1252,
    /*::[*/
    4: 1e4,
    /*::[*/
    100: 852,
    /*::[*/
    101: 866,
    /*::[*/
    102: 865,
    /*::[*/
    103: 861,
    /*::[*/
    104: 895,
    /*::[*/
    105: 620,
    /*::[*/
    106: 737,
    /*::[*/
    107: 857,
    /*::[*/
    120: 950,
    /*::[*/
    121: 949,
    /*::[*/
    122: 936,
    /*::[*/
    123: 932,
    /*::[*/
    124: 874,
    /*::[*/
    125: 1255,
    /*::[*/
    126: 1256,
    /*::[*/
    150: 10007,
    /*::[*/
    151: 10029,
    /*::[*/
    152: 10006,
    /*::[*/
    200: 1250,
    /*::[*/
    201: 1251,
    /*::[*/
    202: 1254,
    /*::[*/
    203: 1253,
    /* shapefile DBF extension */
    /*::[*/
    0: 20127,
    /*::[*/
    8: 865,
    /*::[*/
    9: 437,
    /*::[*/
    10: 850,
    /*::[*/
    11: 437,
    /*::[*/
    13: 437,
    /*::[*/
    14: 850,
    /*::[*/
    15: 437,
    /*::[*/
    16: 850,
    /*::[*/
    17: 437,
    /*::[*/
    18: 850,
    /*::[*/
    19: 932,
    /*::[*/
    20: 850,
    /*::[*/
    21: 437,
    /*::[*/
    22: 850,
    /*::[*/
    23: 865,
    /*::[*/
    24: 437,
    /*::[*/
    25: 437,
    /*::[*/
    26: 850,
    /*::[*/
    27: 437,
    /*::[*/
    28: 863,
    /*::[*/
    29: 850,
    /*::[*/
    31: 852,
    /*::[*/
    34: 852,
    /*::[*/
    35: 852,
    /*::[*/
    36: 860,
    /*::[*/
    37: 850,
    /*::[*/
    38: 866,
    /*::[*/
    55: 850,
    /*::[*/
    64: 852,
    /*::[*/
    77: 936,
    /*::[*/
    78: 949,
    /*::[*/
    79: 950,
    /*::[*/
    80: 874,
    /*::[*/
    87: 1252,
    /*::[*/
    88: 1252,
    /*::[*/
    89: 1252,
    /*::[*/
    108: 863,
    /*::[*/
    134: 737,
    /*::[*/
    135: 852,
    /*::[*/
    136: 857,
    /*::[*/
    204: 1257,
    /*::[*/
    255: 16969
  }, t = Mi({
    /*::[*/
    1: 437,
    /*::[*/
    2: 850,
    /*::[*/
    3: 1252,
    /*::[*/
    4: 1e4,
    /*::[*/
    100: 852,
    /*::[*/
    101: 866,
    /*::[*/
    102: 865,
    /*::[*/
    103: 861,
    /*::[*/
    104: 895,
    /*::[*/
    105: 620,
    /*::[*/
    106: 737,
    /*::[*/
    107: 857,
    /*::[*/
    120: 950,
    /*::[*/
    121: 949,
    /*::[*/
    122: 936,
    /*::[*/
    123: 932,
    /*::[*/
    124: 874,
    /*::[*/
    125: 1255,
    /*::[*/
    126: 1256,
    /*::[*/
    150: 10007,
    /*::[*/
    151: 10029,
    /*::[*/
    152: 10006,
    /*::[*/
    200: 1250,
    /*::[*/
    201: 1251,
    /*::[*/
    202: 1254,
    /*::[*/
    203: 1253,
    /*::[*/
    0: 20127
  });
  function r(f, c) {
    var o = [], l = en(1);
    switch (c.type) {
      case "base64":
        l = Yr(Jr(f));
        break;
      case "binary":
        l = Yr(f);
        break;
      case "buffer":
      case "array":
        l = f;
        break;
    }
    _r(l, 0);
    var h = l.read_shift(1), u = !!(h & 136), x = !1, g = !1;
    switch (h) {
      case 2:
        break;
      case 3:
        break;
      case 48:
        x = !0, u = !0;
        break;
      case 49:
        x = !0, u = !0;
        break;
      case 131:
        break;
      case 139:
        break;
      case 140:
        g = !0;
        break;
      case 245:
        break;
      default:
        throw new Error("DBF Unsupported Version: " + h.toString(16));
    }
    var d = 0, m = 521;
    h == 2 && (d = l.read_shift(2)), l.l += 3, h != 2 && (d = l.read_shift(4)), d > 1048576 && (d = 1e6), h != 2 && (m = l.read_shift(2));
    var w = l.read_shift(2), y = c.codepage || 1252;
    h != 2 && (l.l += 16, l.read_shift(1), l[l.l] !== 0 && (y = e[l[l.l]]), l.l += 1, l.l += 2), g && (l.l += 36);
    for (var v = [], I = {}, T = Math.min(l.length, h == 2 ? 521 : m - 10 - (x ? 264 : 0)), N = g ? 32 : 11; l.l < T && l[l.l] != 13; )
      switch (I = {}, I.name = Ia.utils.decode(y, l.slice(l.l, l.l + N)).replace(/[\u0000\r\n].*$/g, ""), l.l += N, I.type = String.fromCharCode(l.read_shift(1)), h != 2 && !g && (I.offset = l.read_shift(4)), I.len = l.read_shift(1), h == 2 && (I.offset = l.read_shift(2)), I.dec = l.read_shift(1), I.name.length && v.push(I), h != 2 && (l.l += g ? 13 : 14), I.type) {
        case "B":
          (!x || I.len != 8) && c.WTF && console.log("Skipping " + I.name + ":" + I.type);
          break;
        case "G":
        case "P":
          c.WTF && console.log("Skipping " + I.name + ":" + I.type);
          break;
        case "+":
        case "0":
        case "@":
        case "C":
        case "D":
        case "F":
        case "I":
        case "L":
        case "M":
        case "N":
        case "O":
        case "T":
        case "Y":
          break;
        default:
          throw new Error("Unknown Field Type: " + I.type);
      }
    if (l[l.l] !== 13 && (l.l = m - 1), l.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + l.l + " " + l[l.l]);
    l.l = m;
    var k = 0, U = 0;
    for (o[0] = [], U = 0; U != v.length; ++U) o[0][U] = v[U].name;
    for (; d-- > 0; ) {
      if (l[l.l] === 42) {
        l.l += w;
        continue;
      }
      for (++l.l, o[++k] = [], U = 0, U = 0; U != v.length; ++U) {
        var C = l.slice(l.l, l.l + v[U].len);
        l.l += v[U].len, _r(C, 0);
        var D = Ia.utils.decode(y, C);
        switch (v[U].type) {
          case "C":
            D.trim().length && (o[k][U] = D.replace(/\s+$/, ""));
            break;
          case "D":
            D.length === 8 ? o[k][U] = new Date(+D.slice(0, 4), +D.slice(4, 6) - 1, +D.slice(6, 8)) : o[k][U] = D;
            break;
          case "F":
            o[k][U] = parseFloat(D.trim());
            break;
          case "+":
          case "I":
            o[k][U] = g ? C.read_shift(-4, "i") ^ 2147483648 : C.read_shift(4, "i");
            break;
          case "L":
            switch (D.trim().toUpperCase()) {
              case "Y":
              case "T":
                o[k][U] = !0;
                break;
              case "N":
              case "F":
                o[k][U] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + D + "|");
            }
            break;
          case "M":
            if (!u) throw new Error("DBF Unexpected MEMO for type " + h.toString(16));
            o[k][U] = "##MEMO##" + (g ? parseInt(D.trim(), 10) : C.read_shift(4));
            break;
          case "N":
            D = D.replace(/\u0000/g, "").trim(), D && D != "." && (o[k][U] = +D || 0);
            break;
          case "@":
            o[k][U] = new Date(C.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            o[k][U] = new Date((C.read_shift(4) - 2440588) * 864e5 + C.read_shift(4));
            break;
          case "Y":
            o[k][U] = C.read_shift(4, "i") / 1e4 + C.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            o[k][U] = -C.read_shift(-8, "f");
            break;
          case "B":
            if (x && v[U].len == 8) {
              o[k][U] = C.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            C.l += v[U].len;
            break;
          case "0":
            if (v[U].name === "_NullFlags") break;
          default:
            throw new Error("DBF Unsupported data type " + v[U].type);
        }
      }
    }
    if (h != 2 && l.l < l.length && l[l.l++] != 26) throw new Error("DBF EOF Marker missing " + (l.l - 1) + " of " + l.length + " " + l[l.l - 1].toString(16));
    return c && c.sheetRows && (o = o.slice(0, c.sheetRows)), c.DBF = v, o;
  }
  function n(f, c) {
    var o = c || {};
    o.dateNF || (o.dateNF = "yyyymmdd");
    var l = na(r(f, o), o);
    return l["!cols"] = o.DBF.map(function(h) {
      return {
        wch: h.len,
        DBF: h
      };
    }), delete o.DBF, l;
  }
  function a(f, c) {
    try {
      return cn(n(f, c), c);
    } catch (o) {
      if (c && c.WTF) throw o;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(f, c) {
    var o = c || {};
    if (+o.codepage >= 0 && mt(+o.codepage), o.type == "string") throw new Error("Cannot write DBF to JS string");
    var l = Wr(), h = Ii(f, { header: 1, raw: !0, cellDates: !0 }), u = h[0], x = h.slice(1), g = f["!cols"] || [], d = 0, m = 0, w = 0, y = 1;
    for (d = 0; d < u.length; ++d) {
      if (((g[d] || {}).DBF || {}).name) {
        u[d] = g[d].DBF.name, ++w;
        continue;
      }
      if (u[d] != null) {
        if (++w, typeof u[d] == "number" && (u[d] = u[d].toString(10)), typeof u[d] != "string") throw new Error("DBF Invalid column name " + u[d] + " |" + typeof u[d] + "|");
        if (u.indexOf(u[d]) !== d) {
          for (m = 0; m < 1024; ++m)
            if (u.indexOf(u[d] + "_" + m) == -1) {
              u[d] += "_" + m;
              break;
            }
        }
      }
    }
    var v = Me(f["!ref"]), I = [], T = [], N = [];
    for (d = 0; d <= v.e.c - v.s.c; ++d) {
      var k = "", U = "", C = 0, D = [];
      for (m = 0; m < x.length; ++m)
        x[m][d] != null && D.push(x[m][d]);
      if (D.length == 0 || u[d] == null) {
        I[d] = "?";
        continue;
      }
      for (m = 0; m < D.length; ++m) {
        switch (typeof D[m]) {
          case "number":
            U = "B";
            break;
          case "string":
            U = "C";
            break;
          case "boolean":
            U = "L";
            break;
          case "object":
            U = D[m] instanceof Date ? "D" : "C";
            break;
          default:
            U = "C";
        }
        C = Math.max(C, String(D[m]).length), k = k && k != U ? "C" : U;
      }
      C > 250 && (C = 250), U = ((g[d] || {}).DBF || {}).type, U == "C" && g[d].DBF.len > C && (C = g[d].DBF.len), k == "B" && U == "N" && (k = "N", N[d] = g[d].DBF.dec, C = g[d].DBF.len), T[d] = k == "C" || U == "N" ? C : i[k] || 0, y += T[d], I[d] = k;
    }
    var M = l.next(32);
    for (M.write_shift(4, 318902576), M.write_shift(4, x.length), M.write_shift(2, 296 + 32 * w), M.write_shift(2, y), d = 0; d < 4; ++d) M.write_shift(4, 0);
    for (M.write_shift(4, 0 | (+t[
      /*::String(*/
      fc
      /*::)*/
    ] || 3) << 8), d = 0, m = 0; d < u.length; ++d)
      if (u[d] != null) {
        var B = l.next(32), Y = (u[d].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        B.write_shift(1, Y, "sbcs"), B.write_shift(1, I[d] == "?" ? "C" : I[d], "sbcs"), B.write_shift(4, m), B.write_shift(1, T[d] || i[I[d]] || 0), B.write_shift(1, N[d] || 0), B.write_shift(1, 2), B.write_shift(4, 0), B.write_shift(1, 0), B.write_shift(4, 0), B.write_shift(4, 0), m += T[d] || i[I[d]] || 0;
      }
    var he = l.next(264);
    for (he.write_shift(4, 13), d = 0; d < 65; ++d) he.write_shift(4, 0);
    for (d = 0; d < x.length; ++d) {
      var W = l.next(y);
      for (W.write_shift(1, 0), m = 0; m < u.length; ++m)
        if (u[m] != null)
          switch (I[m]) {
            case "L":
              W.write_shift(1, x[d][m] == null ? 63 : x[d][m] ? 84 : 70);
              break;
            case "B":
              W.write_shift(8, x[d][m] || 0, "f");
              break;
            case "N":
              var ee = "0";
              for (typeof x[d][m] == "number" && (ee = x[d][m].toFixed(N[m] || 0)), w = 0; w < T[m] - ee.length; ++w) W.write_shift(1, 32);
              W.write_shift(1, ee, "sbcs");
              break;
            case "D":
              x[d][m] ? (W.write_shift(4, ("0000" + x[d][m].getFullYear()).slice(-4), "sbcs"), W.write_shift(2, ("00" + (x[d][m].getMonth() + 1)).slice(-2), "sbcs"), W.write_shift(2, ("00" + x[d][m].getDate()).slice(-2), "sbcs")) : W.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var ne = String(x[d][m] != null ? x[d][m] : "").slice(0, T[m]);
              for (W.write_shift(1, ne, "sbcs"), w = 0; w < T[m] - ne.length; ++w) W.write_shift(1, 32);
              break;
          }
    }
    return l.next(1).write_shift(1, 26), l.end();
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: s
  };
}(), _o = /* @__PURE__ */ function() {
  var e = {
    AA: "À",
    BA: "Á",
    CA: "Â",
    DA: 195,
    HA: "Ä",
    JA: 197,
    AE: "È",
    BE: "É",
    CE: "Ê",
    HE: "Ë",
    AI: "Ì",
    BI: "Í",
    CI: "Î",
    HI: "Ï",
    AO: "Ò",
    BO: "Ó",
    CO: "Ô",
    DO: 213,
    HO: "Ö",
    AU: "Ù",
    BU: "Ú",
    CU: "Û",
    HU: "Ü",
    Aa: "à",
    Ba: "á",
    Ca: "â",
    Da: 227,
    Ha: "ä",
    Ja: 229,
    Ae: "è",
    Be: "é",
    Ce: "ê",
    He: "ë",
    Ai: "ì",
    Bi: "í",
    Ci: "î",
    Hi: "ï",
    Ao: "ò",
    Bo: "ó",
    Co: "ô",
    Do: 245,
    Ho: "ö",
    Au: "ù",
    Bu: "ú",
    Cu: "û",
    Hu: "ü",
    KC: "Ç",
    Kc: "ç",
    q: "æ",
    z: "œ",
    a: "Æ",
    j: "Œ",
    DN: 209,
    Dn: 241,
    Hy: 255,
    S: 169,
    c: 170,
    R: 174,
    "B ": 180,
    /*::[*/
    0: 176,
    /*::[*/
    1: 177,
    /*::[*/
    2: 178,
    /*::[*/
    3: 179,
    /*::[*/
    5: 181,
    /*::[*/
    6: 182,
    /*::[*/
    7: 183,
    Q: 185,
    k: 186,
    b: 208,
    i: 216,
    l: 222,
    s: 240,
    y: 248,
    "!": 161,
    '"': 162,
    "#": 163,
    "(": 164,
    "%": 165,
    "'": 167,
    "H ": 168,
    "+": 171,
    ";": 187,
    "<": 188,
    "=": 189,
    ">": 190,
    "?": 191,
    "{": 223
  }, t = new RegExp("\x1BN(" + nr(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), r = function(u, x) {
    var g = e[x];
    return typeof g == "number" ? I0(g) : g;
  }, n = function(u, x, g) {
    var d = x.charCodeAt(0) - 32 << 4 | g.charCodeAt(0) - 48;
    return d == 59 ? u : I0(d);
  };
  e["|"] = 254;
  function a(u, x) {
    switch (x.type) {
      case "base64":
        return i(Jr(u), x);
      case "binary":
        return i(u, x);
      case "buffer":
        return i(Ce && Buffer.isBuffer(u) ? u.toString("binary") : fn(u), x);
      case "array":
        return i(En(u), x);
    }
    throw new Error("Unrecognized type " + x.type);
  }
  function i(u, x) {
    var g = u.split(/[\n\r]+/), d = -1, m = -1, w = 0, y = 0, v = [], I = [], T = null, N = {}, k = [], U = [], C = [], D = 0, M;
    for (+x.codepage >= 0 && mt(+x.codepage); w !== g.length; ++w) {
      D = 0;
      var B = g[w].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(t, r), Y = B.replace(/;;/g, "\0").split(";").map(function(L) {
        return L.replace(/\u0000/g, ";");
      }), he = Y[0], W;
      if (B.length > 0) switch (he) {
        case "ID":
          break;
        case "E":
          break;
        case "B":
          break;
        case "O":
          break;
        case "W":
          break;
        case "P":
          Y[1].charAt(0) == "P" && I.push(B.slice(3).replace(/;;/g, ";"));
          break;
        case "C":
          var ee = !1, ne = !1, De = !1, H = !1, _e = -1, Se = -1;
          for (y = 1; y < Y.length; ++y) switch (Y[y].charAt(0)) {
            case "A":
              break;
            case "X":
              m = parseInt(Y[y].slice(1)) - 1, ne = !0;
              break;
            case "Y":
              for (d = parseInt(Y[y].slice(1)) - 1, ne || (m = 0), M = v.length; M <= d; ++M) v[M] = [];
              break;
            case "K":
              W = Y[y].slice(1), W.charAt(0) === '"' ? W = W.slice(1, W.length - 1) : W === "TRUE" ? W = !0 : W === "FALSE" ? W = !1 : isNaN(wt(W)) ? isNaN(Jn(W).getDate()) || (W = Ye(W)) : (W = wt(W), T !== null && ra(T) && (W = Wi(W))), ee = !0;
              break;
            case "E":
              H = !0;
              var O = jn(Y[y].slice(1), { r: d, c: m });
              v[d][m] = [v[d][m], O];
              break;
            case "S":
              De = !0, v[d][m] = [v[d][m], "S5S"];
              break;
            case "G":
              break;
            case "R":
              _e = parseInt(Y[y].slice(1)) - 1;
              break;
            case "C":
              Se = parseInt(Y[y].slice(1)) - 1;
              break;
            default:
              if (x && x.WTF) throw new Error("SYLK bad record " + B);
          }
          if (ee && (v[d][m] && v[d][m].length == 2 ? v[d][m][0] = W : v[d][m] = W, T = null), De) {
            if (H) throw new Error("SYLK shared formula cannot have own formula");
            var P = _e > -1 && v[_e][Se];
            if (!P || !P[1]) throw new Error("SYLK shared formula cannot find base");
            v[d][m][1] = Mo(P[1], { r: d - _e, c: m - Se });
          }
          break;
        case "F":
          var R = 0;
          for (y = 1; y < Y.length; ++y) switch (Y[y].charAt(0)) {
            case "X":
              m = parseInt(Y[y].slice(1)) - 1, ++R;
              break;
            case "Y":
              for (d = parseInt(Y[y].slice(1)) - 1, M = v.length; M <= d; ++M) v[M] = [];
              break;
            case "M":
              D = parseInt(Y[y].slice(1)) / 20;
              break;
            case "F":
              break;
            case "G":
              break;
            case "P":
              T = I[parseInt(Y[y].slice(1))];
              break;
            case "S":
              break;
            case "D":
              break;
            case "N":
              break;
            case "W":
              for (C = Y[y].slice(1).split(" "), M = parseInt(C[0], 10); M <= parseInt(C[1], 10); ++M)
                D = parseInt(C[2], 10), U[M - 1] = D === 0 ? { hidden: !0 } : { wch: D }, rn(U[M - 1]);
              break;
            case "C":
              m = parseInt(Y[y].slice(1)) - 1, U[m] || (U[m] = {});
              break;
            case "R":
              d = parseInt(Y[y].slice(1)) - 1, k[d] || (k[d] = {}), D > 0 ? (k[d].hpt = D, k[d].hpx = Zn(D)) : D === 0 && (k[d].hidden = !0);
              break;
            default:
              if (x && x.WTF) throw new Error("SYLK bad record " + B);
          }
          R < 1 && (T = null);
          break;
        default:
          if (x && x.WTF) throw new Error("SYLK bad record " + B);
      }
    }
    return k.length > 0 && (N["!rows"] = k), U.length > 0 && (N["!cols"] = U), x && x.sheetRows && (v = v.slice(0, x.sheetRows)), [v, N];
  }
  function s(u, x) {
    var g = a(u, x), d = g[0], m = g[1], w = na(d, x);
    return nr(m).forEach(function(y) {
      w[y] = m[y];
    }), w;
  }
  function f(u, x) {
    return cn(s(u, x), x);
  }
  function c(u, x, g, d) {
    var m = "C;Y" + (g + 1) + ";X" + (d + 1) + ";K";
    switch (u.t) {
      case "n":
        m += u.v || 0, u.f && !u.F && (m += ";E" + f0(u.f, { r: g, c: d }));
        break;
      case "b":
        m += u.v ? "TRUE" : "FALSE";
        break;
      case "e":
        m += u.w || u.v;
        break;
      case "d":
        m += '"' + (u.w || u.v) + '"';
        break;
      case "s":
        m += '"' + u.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return m;
  }
  function o(u, x) {
    x.forEach(function(g, d) {
      var m = "F;W" + (d + 1) + " " + (d + 1) + " ";
      g.hidden ? m += "0" : (typeof g.width == "number" && !g.wpx && (g.wpx = Wa(g.width)), typeof g.wpx == "number" && !g.wch && (g.wch = Ha(g.wpx)), typeof g.wch == "number" && (m += Math.round(g.wch))), m.charAt(m.length - 1) != " " && u.push(m);
    });
  }
  function l(u, x) {
    x.forEach(function(g, d) {
      var m = "F;";
      g.hidden ? m += "M0;" : g.hpt ? m += "M" + 20 * g.hpt + ";" : g.hpx && (m += "M" + 20 * Va(g.hpx) + ";"), m.length > 2 && u.push(m + "R" + (d + 1));
    });
  }
  function h(u, x) {
    var g = ["ID;PWXL;N;E"], d = [], m = Me(u["!ref"]), w, y = Array.isArray(u), v = `\r
`;
    g.push("P;PGeneral"), g.push("F;P0;DG0G8;M255"), u["!cols"] && o(g, u["!cols"]), u["!rows"] && l(g, u["!rows"]), g.push("B;Y" + (m.e.r - m.s.r + 1) + ";X" + (m.e.c - m.s.c + 1) + ";D" + [m.s.c, m.s.r, m.e.c, m.e.r].join(" "));
    for (var I = m.s.r; I <= m.e.r; ++I)
      for (var T = m.s.c; T <= m.e.c; ++T) {
        var N = ye({ r: I, c: T });
        w = y ? (u[I] || [])[T] : u[N], !(!w || w.v == null && (!w.f || w.F)) && d.push(c(w, u, I, T));
      }
    return g.join(v) + v + d.join(v) + v + "E" + v;
  }
  return {
    to_workbook: f,
    to_sheet: s,
    from_sheet: h
  };
}(), Eo = /* @__PURE__ */ function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return t(Jr(i), s);
      case "binary":
        return t(i, s);
      case "buffer":
        return t(Ce && Buffer.isBuffer(i) ? i.toString("binary") : fn(i), s);
      case "array":
        return t(En(i), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function t(i, s) {
    for (var f = i.split(`
`), c = -1, o = -1, l = 0, h = []; l !== f.length; ++l) {
      if (f[l].trim() === "BOT") {
        h[++c] = [], o = 0;
        continue;
      }
      if (!(c < 0)) {
        var u = f[l].trim().split(","), x = u[0], g = u[1];
        ++l;
        for (var d = f[l] || ""; (d.match(/["]/g) || []).length & 1 && l < f.length - 1; ) d += `
` + f[++l];
        switch (d = d.trim(), +x) {
          case -1:
            if (d === "BOT") {
              h[++c] = [], o = 0;
              continue;
            } else if (d !== "EOD") throw new Error("Unrecognized DIF special command " + d);
            break;
          case 0:
            d === "TRUE" ? h[c][o] = !0 : d === "FALSE" ? h[c][o] = !1 : isNaN(wt(g)) ? isNaN(Jn(g).getDate()) ? h[c][o] = g : h[c][o] = Ye(g) : h[c][o] = wt(g), ++o;
            break;
          case 1:
            d = d.slice(1, d.length - 1), d = d.replace(/""/g, '"'), d && d.match(/^=".*"$/) && (d = d.slice(2, -1)), h[c][o++] = d !== "" ? d : null;
            break;
        }
        if (d === "EOD") break;
      }
    }
    return s && s.sheetRows && (h = h.slice(0, s.sheetRows)), h;
  }
  function r(i, s) {
    return na(e(i, s), s);
  }
  function n(i, s) {
    return cn(r(i, s), s);
  }
  var a = /* @__PURE__ */ function() {
    var i = function(c, o, l, h, u) {
      c.push(o), c.push(l + "," + h), c.push('"' + u.replace(/"/g, '""') + '"');
    }, s = function(c, o, l, h) {
      c.push(o + "," + l), c.push(o == 1 ? '"' + h.replace(/"/g, '""') + '"' : h);
    };
    return function(c) {
      var o = [], l = Me(c["!ref"]), h, u = Array.isArray(c);
      i(o, "TABLE", 0, 1, "sheetjs"), i(o, "VECTORS", 0, l.e.r - l.s.r + 1, ""), i(o, "TUPLES", 0, l.e.c - l.s.c + 1, ""), i(o, "DATA", 0, 0, "");
      for (var x = l.s.r; x <= l.e.r; ++x) {
        s(o, -1, 0, "BOT");
        for (var g = l.s.c; g <= l.e.c; ++g) {
          var d = ye({ r: x, c: g });
          if (h = u ? (c[x] || [])[g] : c[d], !h) {
            s(o, 1, 0, "");
            continue;
          }
          switch (h.t) {
            case "n":
              var m = h.w;
              !m && h.v != null && (m = h.v), m == null ? h.f && !h.F ? s(o, 1, 0, "=" + h.f) : s(o, 1, 0, "") : s(o, 0, m, "V");
              break;
            case "b":
              s(o, 0, h.v ? 1 : 0, h.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(o, 1, 0, isNaN(h.v) ? h.v : '="' + h.v + '"');
              break;
            case "d":
              h.w || (h.w = ht(h.z || Ee[14], gr(Ye(h.v)))), s(o, 0, h.w, "V");
              break;
            default:
              s(o, 1, 0, "");
          }
        }
      }
      s(o, -1, 0, "EOD");
      var w = `\r
`, y = o.join(w);
      return y;
    };
  }();
  return {
    to_workbook: n,
    to_sheet: r,
    from_sheet: a
  };
}(), yo = /* @__PURE__ */ function() {
  function e(h) {
    return h.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(h) {
    return h.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function r(h, u) {
    for (var x = h.split(`
`), g = -1, d = -1, m = 0, w = []; m !== x.length; ++m) {
      var y = x[m].trim().split(":");
      if (y[0] === "cell") {
        var v = er(y[1]);
        if (w.length <= v.r) for (g = w.length; g <= v.r; ++g) w[g] || (w[g] = []);
        switch (g = v.r, d = v.c, y[2]) {
          case "t":
            w[g][d] = e(y[3]);
            break;
          case "v":
            w[g][d] = +y[3];
            break;
          case "vtf":
            var I = y[y.length - 1];
          case "vtc":
            switch (y[3]) {
              case "nl":
                w[g][d] = !!+y[4];
                break;
              default:
                w[g][d] = +y[4];
                break;
            }
            y[2] == "vtf" && (w[g][d] = [w[g][d], I]);
        }
      }
    }
    return u && u.sheetRows && (w = w.slice(0, u.sheetRows)), w;
  }
  function n(h, u) {
    return na(r(h, u), u);
  }
  function a(h, u) {
    return cn(n(h, u), u);
  }
  var i = [
    "socialcalc:version:1.5",
    "MIME-Version: 1.0",
    "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"
  ].join(`
`), s = [
    "--SocialCalcSpreadsheetControlSave",
    "Content-type: text/plain; charset=UTF-8"
  ].join(`
`) + `
`, f = [
    "# SocialCalc Spreadsheet Control Save",
    "part:sheet"
  ].join(`
`), c = "--SocialCalcSpreadsheetControlSave--";
  function o(h) {
    if (!h || !h["!ref"]) return "";
    for (var u = [], x = [], g, d = "", m = Hr(h["!ref"]), w = Array.isArray(h), y = m.s.r; y <= m.e.r; ++y)
      for (var v = m.s.c; v <= m.e.c; ++v)
        if (d = ye({ r: y, c: v }), g = w ? (h[y] || [])[v] : h[d], !(!g || g.v == null || g.t === "z")) {
          switch (x = ["cell", d, "t"], g.t) {
            case "s":
            case "str":
              x.push(t(g.v));
              break;
            case "n":
              g.f ? (x[2] = "vtf", x[3] = "n", x[4] = g.v, x[5] = t(g.f)) : (x[2] = "v", x[3] = g.v);
              break;
            case "b":
              x[2] = "vt" + (g.f ? "f" : "c"), x[3] = "nl", x[4] = g.v ? "1" : "0", x[5] = t(g.f || (g.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var I = gr(Ye(g.v));
              x[2] = "vtc", x[3] = "nd", x[4] = "" + I, x[5] = g.w || ht(g.z || Ee[14], I);
              break;
            case "e":
              continue;
          }
          u.push(x.join(":"));
        }
    return u.push("sheet:c:" + (m.e.c - m.s.c + 1) + ":r:" + (m.e.r - m.s.r + 1) + ":tvf:1"), u.push("valueformat:1:text-wiki"), u.join(`
`);
  }
  function l(h) {
    return [i, s, f, s, o(h), c].join(`
`);
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: l
  };
}(), qn = /* @__PURE__ */ function() {
  function e(l, h, u, x, g) {
    g.raw ? h[u][x] = l : l === "" || (l === "TRUE" ? h[u][x] = !0 : l === "FALSE" ? h[u][x] = !1 : isNaN(wt(l)) ? isNaN(Jn(l).getDate()) ? h[u][x] = l : h[u][x] = Ye(l) : h[u][x] = wt(l));
  }
  function t(l, h) {
    var u = h || {}, x = [];
    if (!l || l.length === 0) return x;
    for (var g = l.split(/[\r\n]/), d = g.length - 1; d >= 0 && g[d].length === 0; ) --d;
    for (var m = 10, w = 0, y = 0; y <= d; ++y)
      w = g[y].indexOf(" "), w == -1 ? w = g[y].length : w++, m = Math.max(m, w);
    for (y = 0; y <= d; ++y) {
      x[y] = [];
      var v = 0;
      for (e(g[y].slice(0, m).trim(), x, y, v, u), v = 1; v <= (g[y].length - m) / 10 + 1; ++v)
        e(g[y].slice(m + (v - 1) * 10, m + v * 10).trim(), x, y, v, u);
    }
    return u.sheetRows && (x = x.slice(0, u.sheetRows)), x;
  }
  var r = {
    /*::[*/
    44: ",",
    /*::[*/
    9: "	",
    /*::[*/
    59: ";",
    /*::[*/
    124: "|"
  }, n = {
    /*::[*/
    44: 3,
    /*::[*/
    9: 2,
    /*::[*/
    59: 1,
    /*::[*/
    124: 0
  };
  function a(l) {
    for (var h = {}, u = !1, x = 0, g = 0; x < l.length; ++x)
      (g = l.charCodeAt(x)) == 34 ? u = !u : !u && g in r && (h[g] = (h[g] || 0) + 1);
    g = [];
    for (x in h) Object.prototype.hasOwnProperty.call(h, x) && g.push([h[x], x]);
    if (!g.length) {
      h = n;
      for (x in h) Object.prototype.hasOwnProperty.call(h, x) && g.push([h[x], x]);
    }
    return g.sort(function(d, m) {
      return d[0] - m[0] || n[d[1]] - n[m[1]];
    }), r[g.pop()[1]] || 44;
  }
  function i(l, h) {
    var u = h || {}, x = "", g = u.dense ? [] : {}, d = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    l.slice(0, 4) == "sep=" ? l.charCodeAt(5) == 13 && l.charCodeAt(6) == 10 ? (x = l.charAt(4), l = l.slice(7)) : l.charCodeAt(5) == 13 || l.charCodeAt(5) == 10 ? (x = l.charAt(4), l = l.slice(6)) : x = a(l.slice(0, 1024)) : u && u.FS ? x = u.FS : x = a(l.slice(0, 1024));
    var m = 0, w = 0, y = 0, v = 0, I = 0, T = x.charCodeAt(0), N = !1, k = 0, U = l.charCodeAt(0);
    l = l.replace(/\r\n/mg, `
`);
    var C = u.dateNF != null ? Uh(u.dateNF) : null;
    function D() {
      var M = l.slice(v, I), B = {};
      if (M.charAt(0) == '"' && M.charAt(M.length - 1) == '"' && (M = M.slice(1, -1).replace(/""/g, '"')), M.length === 0) B.t = "z";
      else if (u.raw)
        B.t = "s", B.v = M;
      else if (M.trim().length === 0)
        B.t = "s", B.v = M;
      else if (M.charCodeAt(0) == 61)
        M.charCodeAt(1) == 34 && M.charCodeAt(M.length - 1) == 34 ? (B.t = "s", B.v = M.slice(2, -1).replace(/""/g, '"')) : dm(M) ? (B.t = "n", B.f = M.slice(1)) : (B.t = "s", B.v = M);
      else if (M == "TRUE")
        B.t = "b", B.v = !0;
      else if (M == "FALSE")
        B.t = "b", B.v = !1;
      else if (!isNaN(y = wt(M)))
        B.t = "n", u.cellText !== !1 && (B.w = M), B.v = y;
      else if (!isNaN(Jn(M).getDate()) || C && M.match(C)) {
        B.z = u.dateNF || Ee[14];
        var Y = 0;
        C && M.match(C) && (M = Wh(M, u.dateNF, M.match(C) || []), Y = 1), u.cellDates ? (B.t = "d", B.v = Ye(M, Y)) : (B.t = "n", B.v = gr(Ye(M, Y))), u.cellText !== !1 && (B.w = ht(B.z, B.v instanceof Date ? gr(B.v) : B.v)), u.cellNF || delete B.z;
      } else
        B.t = "s", B.v = M;
      if (B.t == "z" || (u.dense ? (g[m] || (g[m] = []), g[m][w] = B) : g[ye({ c: w, r: m })] = B), v = I + 1, U = l.charCodeAt(v), d.e.c < w && (d.e.c = w), d.e.r < m && (d.e.r = m), k == T) ++w;
      else if (w = 0, ++m, u.sheetRows && u.sheetRows <= m) return !0;
    }
    e: for (; I < l.length; ++I) switch (k = l.charCodeAt(I)) {
      case 34:
        U === 34 && (N = !N);
        break;
      case T:
      case 10:
      case 13:
        if (!N && D()) break e;
        break;
    }
    return I - v > 0 && D(), g["!ref"] = Ae(d), g;
  }
  function s(l, h) {
    return !(h && h.PRN) || h.FS || l.slice(0, 4) == "sep=" || l.indexOf("	") >= 0 || l.indexOf(",") >= 0 || l.indexOf(";") >= 0 ? i(l, h) : na(t(l, h), h);
  }
  function f(l, h) {
    var u = "", x = h.type == "string" ? [0, 0, 0, 0] : g0(l, h);
    switch (h.type) {
      case "base64":
        u = Jr(l);
        break;
      case "binary":
        u = l;
        break;
      case "buffer":
        h.codepage == 65001 ? u = l.toString("utf8") : h.codepage && typeof Ia < "u" || (u = Ce && Buffer.isBuffer(l) ? l.toString("binary") : fn(l));
        break;
      case "array":
        u = En(l);
        break;
      case "string":
        u = l;
        break;
      default:
        throw new Error("Unrecognized type " + h.type);
    }
    return x[0] == 239 && x[1] == 187 && x[2] == 191 ? u = ze(u.slice(3)) : h.type != "string" && h.type != "buffer" && h.codepage == 65001 ? u = ze(u) : h.type == "binary" && typeof Ia < "u", u.slice(0, 19) == "socialcalc:version:" ? yo.to_sheet(h.type == "string" ? u : ze(u), h) : s(u, h);
  }
  function c(l, h) {
    return cn(f(l, h), h);
  }
  function o(l) {
    for (var h = [], u = Me(l["!ref"]), x, g = Array.isArray(l), d = u.s.r; d <= u.e.r; ++d) {
      for (var m = [], w = u.s.c; w <= u.e.c; ++w) {
        var y = ye({ r: d, c: w });
        if (x = g ? (l[d] || [])[w] : l[y], !x || x.v == null) {
          m.push("          ");
          continue;
        }
        for (var v = (x.w || (Ut(x), x.w) || "").slice(0, 10); v.length < 10; ) v += " ";
        m.push(v + (w === 0 ? " " : ""));
      }
      h.push(m.join(""));
    }
    return h.join(`
`);
  }
  return {
    to_workbook: c,
    to_sheet: f,
    from_sheet: o
  };
}();
function ed(e, t) {
  var r = t || {}, n = !!r.WTF;
  r.WTF = !0;
  try {
    var a = _o.to_workbook(e, r);
    return r.WTF = n, a;
  } catch (i) {
    if (r.WTF = n, !i.message.match(/SYLK bad record ID/) && n) throw i;
    return qn.to_workbook(e, t);
  }
}
var vn = /* @__PURE__ */ function() {
  function e(O, P, R) {
    if (O) {
      _r(O, O.l || 0);
      for (var L = R.Enum || _e; O.l < O.length; ) {
        var Q = O.read_shift(2), fe = L[Q] || L[65535], ce = O.read_shift(2), ie = O.l + ce, te = fe.f && fe.f(O, ce, R);
        if (O.l = ie, P(te, fe, Q)) return;
      }
    }
  }
  function t(O, P) {
    switch (P.type) {
      case "base64":
        return r(Yr(Jr(O)), P);
      case "binary":
        return r(Yr(O), P);
      case "buffer":
      case "array":
        return r(O, P);
    }
    throw "Unsupported type " + P.type;
  }
  function r(O, P) {
    if (!O) return O;
    var R = P || {}, L = R.dense ? [] : {}, Q = "Sheet1", fe = "", ce = 0, ie = {}, te = [], be = [], b = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, Xe = R.sheetRows || 0;
    if (O[2] == 0 && (O[3] == 8 || O[3] == 9) && O.length >= 16 && O[14] == 5 && O[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (O[2] == 2)
      R.Enum = _e, e(O, function(xe, ar, Qr) {
        switch (Qr) {
          case 0:
            R.vers = xe, xe >= 4096 && (R.qpro = !0);
            break;
          case 6:
            b = xe;
            break;
          case 204:
            xe && (fe = xe);
            break;
          case 222:
            fe = xe;
            break;
          case 15:
          case 51:
            R.qpro || (xe[1].v = xe[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            Qr == 14 && (xe[2] & 112) == 112 && (xe[2] & 15) > 1 && (xe[2] & 15) < 15 && (xe[1].z = R.dateNF || Ee[14], R.cellDates && (xe[1].t = "d", xe[1].v = Wi(xe[1].v))), R.qpro && xe[3] > ce && (L["!ref"] = Ae(b), ie[Q] = L, te.push(Q), L = R.dense ? [] : {}, b = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, ce = xe[3], Q = fe || "Sheet" + (ce + 1), fe = "");
            var Et = R.dense ? (L[xe[0].r] || [])[xe[0].c] : L[ye(xe[0])];
            if (Et) {
              Et.t = xe[1].t, Et.v = xe[1].v, xe[1].z != null && (Et.z = xe[1].z), xe[1].f != null && (Et.f = xe[1].f);
              break;
            }
            R.dense ? (L[xe[0].r] || (L[xe[0].r] = []), L[xe[0].r][xe[0].c] = xe[1]) : L[ye(xe[0])] = xe[1];
            break;
        }
      }, R);
    else if (O[2] == 26 || O[2] == 14)
      R.Enum = Se, O[2] == 14 && (R.qpro = !0, O.l = 0), e(O, function(xe, ar, Qr) {
        switch (Qr) {
          case 204:
            Q = xe;
            break;
          case 22:
            xe[1].v = xe[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (xe[3] > ce && (L["!ref"] = Ae(b), ie[Q] = L, te.push(Q), L = R.dense ? [] : {}, b = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, ce = xe[3], Q = "Sheet" + (ce + 1)), Xe > 0 && xe[0].r >= Xe) break;
            R.dense ? (L[xe[0].r] || (L[xe[0].r] = []), L[xe[0].r][xe[0].c] = xe[1]) : L[ye(xe[0])] = xe[1], b.e.c < xe[0].c && (b.e.c = xe[0].c), b.e.r < xe[0].r && (b.e.r = xe[0].r);
            break;
          case 27:
            xe[14e3] && (be[xe[14e3][0]] = xe[14e3][1]);
            break;
          case 1537:
            be[xe[0]] = xe[1], xe[0] == ce && (Q = xe[1]);
            break;
        }
      }, R);
    else throw new Error("Unrecognized LOTUS BOF " + O[2]);
    if (L["!ref"] = Ae(b), ie[fe || Q] = L, te.push(fe || Q), !be.length) return { SheetNames: te, Sheets: ie };
    for (var Re = {}, Ge = [], Be = 0; Be < be.length; ++Be) ie[te[Be]] ? (Ge.push(be[Be] || te[Be]), Re[be[Be]] = ie[be[Be]] || ie[te[Be]]) : (Ge.push(be[Be]), Re[be[Be]] = { "!ref": "A1" });
    return { SheetNames: Ge, Sheets: Re };
  }
  function n(O, P) {
    var R = P || {};
    if (+R.codepage >= 0 && mt(+R.codepage), R.type == "string") throw new Error("Cannot write WK1 to JS string");
    var L = Wr(), Q = Me(O["!ref"]), fe = Array.isArray(O), ce = [];
    le(L, 0, i(1030)), le(L, 6, c(Q));
    for (var ie = Math.min(Q.e.r, 8191), te = Q.s.r; te <= ie; ++te)
      for (var be = cr(te), b = Q.s.c; b <= Q.e.c; ++b) {
        te === Q.s.r && (ce[b] = Qe(b));
        var Xe = ce[b] + be, Re = fe ? (O[te] || [])[b] : O[Xe];
        if (!(!Re || Re.t == "z"))
          if (Re.t == "n")
            (Re.v | 0) == Re.v && Re.v >= -32768 && Re.v <= 32767 ? le(L, 13, x(te, b, Re.v)) : le(L, 14, d(te, b, Re.v));
          else {
            var Ge = Ut(Re);
            le(L, 15, h(te, b, Ge.slice(0, 239)));
          }
      }
    return le(L, 1), L.end();
  }
  function a(O, P) {
    var R = P || {};
    if (+R.codepage >= 0 && mt(+R.codepage), R.type == "string") throw new Error("Cannot write WK3 to JS string");
    var L = Wr();
    le(L, 0, s(O));
    for (var Q = 0, fe = 0; Q < O.SheetNames.length; ++Q) (O.Sheets[O.SheetNames[Q]] || {})["!ref"] && le(L, 27, H(O.SheetNames[Q], fe++));
    var ce = 0;
    for (Q = 0; Q < O.SheetNames.length; ++Q) {
      var ie = O.Sheets[O.SheetNames[Q]];
      if (!(!ie || !ie["!ref"])) {
        for (var te = Me(ie["!ref"]), be = Array.isArray(ie), b = [], Xe = Math.min(te.e.r, 8191), Re = te.s.r; Re <= Xe; ++Re)
          for (var Ge = cr(Re), Be = te.s.c; Be <= te.e.c; ++Be) {
            Re === te.s.r && (b[Be] = Qe(Be));
            var xe = b[Be] + Ge, ar = be ? (ie[Re] || [])[Be] : ie[xe];
            if (!(!ar || ar.t == "z"))
              if (ar.t == "n")
                le(L, 23, D(Re, Be, ce, ar.v));
              else {
                var Qr = Ut(ar);
                le(L, 22, k(Re, Be, ce, Qr.slice(0, 239)));
              }
          }
        ++ce;
      }
    }
    return le(L, 1), L.end();
  }
  function i(O) {
    var P = q(2);
    return P.write_shift(2, O), P;
  }
  function s(O) {
    var P = q(26);
    P.write_shift(2, 4096), P.write_shift(2, 4), P.write_shift(4, 0);
    for (var R = 0, L = 0, Q = 0, fe = 0; fe < O.SheetNames.length; ++fe) {
      var ce = O.SheetNames[fe], ie = O.Sheets[ce];
      if (!(!ie || !ie["!ref"])) {
        ++Q;
        var te = Hr(ie["!ref"]);
        R < te.e.r && (R = te.e.r), L < te.e.c && (L = te.e.c);
      }
    }
    return R > 8191 && (R = 8191), P.write_shift(2, R), P.write_shift(1, Q), P.write_shift(1, L), P.write_shift(2, 0), P.write_shift(2, 0), P.write_shift(1, 1), P.write_shift(1, 2), P.write_shift(4, 0), P.write_shift(4, 0), P;
  }
  function f(O, P, R) {
    var L = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return P == 8 && R.qpro ? (L.s.c = O.read_shift(1), O.l++, L.s.r = O.read_shift(2), L.e.c = O.read_shift(1), O.l++, L.e.r = O.read_shift(2), L) : (L.s.c = O.read_shift(2), L.s.r = O.read_shift(2), P == 12 && R.qpro && (O.l += 2), L.e.c = O.read_shift(2), L.e.r = O.read_shift(2), P == 12 && R.qpro && (O.l += 2), L.s.c == 65535 && (L.s.c = L.e.c = L.s.r = L.e.r = 0), L);
  }
  function c(O) {
    var P = q(8);
    return P.write_shift(2, O.s.c), P.write_shift(2, O.s.r), P.write_shift(2, O.e.c), P.write_shift(2, O.e.r), P;
  }
  function o(O, P, R) {
    var L = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return R.qpro && R.vers != 20768 ? (L[0].c = O.read_shift(1), L[3] = O.read_shift(1), L[0].r = O.read_shift(2), O.l += 2) : (L[2] = O.read_shift(1), L[0].c = O.read_shift(2), L[0].r = O.read_shift(2)), L;
  }
  function l(O, P, R) {
    var L = O.l + P, Q = o(O, P, R);
    if (Q[1].t = "s", R.vers == 20768) {
      O.l++;
      var fe = O.read_shift(1);
      return Q[1].v = O.read_shift(fe, "utf8"), Q;
    }
    return R.qpro && O.l++, Q[1].v = O.read_shift(L - O.l, "cstr"), Q;
  }
  function h(O, P, R) {
    var L = q(7 + R.length);
    L.write_shift(1, 255), L.write_shift(2, P), L.write_shift(2, O), L.write_shift(1, 39);
    for (var Q = 0; Q < L.length; ++Q) {
      var fe = R.charCodeAt(Q);
      L.write_shift(1, fe >= 128 ? 95 : fe);
    }
    return L.write_shift(1, 0), L;
  }
  function u(O, P, R) {
    var L = o(O, P, R);
    return L[1].v = O.read_shift(2, "i"), L;
  }
  function x(O, P, R) {
    var L = q(7);
    return L.write_shift(1, 255), L.write_shift(2, P), L.write_shift(2, O), L.write_shift(2, R, "i"), L;
  }
  function g(O, P, R) {
    var L = o(O, P, R);
    return L[1].v = O.read_shift(8, "f"), L;
  }
  function d(O, P, R) {
    var L = q(13);
    return L.write_shift(1, 255), L.write_shift(2, P), L.write_shift(2, O), L.write_shift(8, R, "f"), L;
  }
  function m(O, P, R) {
    var L = O.l + P, Q = o(O, P, R);
    if (Q[1].v = O.read_shift(8, "f"), R.qpro) O.l = L;
    else {
      var fe = O.read_shift(2);
      I(O.slice(O.l, O.l + fe), Q), O.l += fe;
    }
    return Q;
  }
  function w(O, P, R) {
    var L = P & 32768;
    return P &= -32769, P = (L ? O : 0) + (P >= 8192 ? P - 16384 : P), (L ? "" : "$") + (R ? Qe(P) : cr(P));
  }
  var y = {
    51: ["FALSE", 0],
    52: ["TRUE", 0],
    70: ["LEN", 1],
    80: ["SUM", 69],
    81: ["AVERAGEA", 69],
    82: ["COUNTA", 69],
    83: ["MINA", 69],
    84: ["MAXA", 69],
    111: ["T", 1]
  }, v = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "",
    "+",
    "-",
    "*",
    "/",
    "^",
    "=",
    "<>",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "<=",
    ">=",
    "<",
    ">",
    "",
    "",
    "",
    "",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "&",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
    // eslint-disable-line no-mixed-spaces-and-tabs
  ];
  function I(O, P) {
    _r(O, 0);
    for (var R = [], L = 0, Q = "", fe = "", ce = "", ie = ""; O.l < O.length; ) {
      var te = O[O.l++];
      switch (te) {
        case 0:
          R.push(O.read_shift(8, "f"));
          break;
        case 1:
          fe = w(P[0].c, O.read_shift(2), !0), Q = w(P[0].r, O.read_shift(2), !1), R.push(fe + Q);
          break;
        case 2:
          {
            var be = w(P[0].c, O.read_shift(2), !0), b = w(P[0].r, O.read_shift(2), !1);
            fe = w(P[0].c, O.read_shift(2), !0), Q = w(P[0].r, O.read_shift(2), !1), R.push(be + b + ":" + fe + Q);
          }
          break;
        case 3:
          if (O.l < O.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          R.push("(" + R.pop() + ")");
          break;
        case 5:
          R.push(O.read_shift(2));
          break;
        case 6:
          {
            for (var Xe = ""; te = O[O.l++]; ) Xe += String.fromCharCode(te);
            R.push('"' + Xe.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          R.push("-" + R.pop());
          break;
        case 23:
          R.push("+" + R.pop());
          break;
        case 22:
          R.push("NOT(" + R.pop() + ")");
          break;
        case 20:
        case 21:
          ie = R.pop(), ce = R.pop(), R.push(["AND", "OR"][te - 20] + "(" + ce + "," + ie + ")");
          break;
        default:
          if (te < 32 && v[te])
            ie = R.pop(), ce = R.pop(), R.push(ce + v[te] + ie);
          else if (y[te]) {
            if (L = y[te][1], L == 69 && (L = O[O.l++]), L > R.length) {
              console.error("WK1 bad formula parse 0x" + te.toString(16) + ":|" + R.join("|") + "|");
              return;
            }
            var Re = R.slice(-L);
            R.length -= L, R.push(y[te][0] + "(" + Re.join(",") + ")");
          } else return te <= 7 ? console.error("WK1 invalid opcode " + te.toString(16)) : te <= 24 ? console.error("WK1 unsupported op " + te.toString(16)) : te <= 30 ? console.error("WK1 invalid opcode " + te.toString(16)) : te <= 115 ? console.error("WK1 unsupported function opcode " + te.toString(16)) : console.error("WK1 unrecognized opcode " + te.toString(16));
      }
    }
    R.length == 1 ? P[1].f = "" + R[0] : console.error("WK1 bad formula parse |" + R.join("|") + "|");
  }
  function T(O) {
    var P = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return P[0].r = O.read_shift(2), P[3] = O[O.l++], P[0].c = O[O.l++], P;
  }
  function N(O, P) {
    var R = T(O);
    return R[1].t = "s", R[1].v = O.read_shift(P - 4, "cstr"), R;
  }
  function k(O, P, R, L) {
    var Q = q(6 + L.length);
    Q.write_shift(2, O), Q.write_shift(1, R), Q.write_shift(1, P), Q.write_shift(1, 39);
    for (var fe = 0; fe < L.length; ++fe) {
      var ce = L.charCodeAt(fe);
      Q.write_shift(1, ce >= 128 ? 95 : ce);
    }
    return Q.write_shift(1, 0), Q;
  }
  function U(O, P) {
    var R = T(O);
    R[1].v = O.read_shift(2);
    var L = R[1].v >> 1;
    if (R[1].v & 1)
      switch (L & 7) {
        case 0:
          L = (L >> 3) * 5e3;
          break;
        case 1:
          L = (L >> 3) * 500;
          break;
        case 2:
          L = (L >> 3) / 20;
          break;
        case 3:
          L = (L >> 3) / 200;
          break;
        case 4:
          L = (L >> 3) / 2e3;
          break;
        case 5:
          L = (L >> 3) / 2e4;
          break;
        case 6:
          L = (L >> 3) / 16;
          break;
        case 7:
          L = (L >> 3) / 64;
          break;
      }
    return R[1].v = L, R;
  }
  function C(O, P) {
    var R = T(O), L = O.read_shift(4), Q = O.read_shift(4), fe = O.read_shift(2);
    if (fe == 65535)
      return L === 0 && Q === 3221225472 ? (R[1].t = "e", R[1].v = 15) : L === 0 && Q === 3489660928 ? (R[1].t = "e", R[1].v = 42) : R[1].v = 0, R;
    var ce = fe & 32768;
    return fe = (fe & 32767) - 16446, R[1].v = (1 - ce * 2) * (Q * Math.pow(2, fe + 32) + L * Math.pow(2, fe)), R;
  }
  function D(O, P, R, L) {
    var Q = q(14);
    if (Q.write_shift(2, O), Q.write_shift(1, R), Q.write_shift(1, P), L == 0)
      return Q.write_shift(4, 0), Q.write_shift(4, 0), Q.write_shift(2, 65535), Q;
    var fe = 0, ce = 0, ie = 0, te = 0;
    return L < 0 && (fe = 1, L = -L), ce = Math.log2(L) | 0, L /= Math.pow(2, ce - 31), te = L >>> 0, te & 2147483648 || (L /= 2, ++ce, te = L >>> 0), L -= te, te |= 2147483648, te >>>= 0, L *= Math.pow(2, 32), ie = L >>> 0, Q.write_shift(4, ie), Q.write_shift(4, te), ce += 16383 + (fe ? 32768 : 0), Q.write_shift(2, ce), Q;
  }
  function M(O, P) {
    var R = C(O);
    return O.l += P - 14, R;
  }
  function B(O, P) {
    var R = T(O), L = O.read_shift(4);
    return R[1].v = L >> 6, R;
  }
  function Y(O, P) {
    var R = T(O), L = O.read_shift(8, "f");
    return R[1].v = L, R;
  }
  function he(O, P) {
    var R = Y(O);
    return O.l += P - 10, R;
  }
  function W(O, P) {
    return O[O.l + P - 1] == 0 ? O.read_shift(P, "cstr") : "";
  }
  function ee(O, P) {
    var R = O[O.l++];
    R > P - 1 && (R = P - 1);
    for (var L = ""; L.length < R; ) L += String.fromCharCode(O[O.l++]);
    return L;
  }
  function ne(O, P, R) {
    if (!(!R.qpro || P < 21)) {
      var L = O.read_shift(1);
      O.l += 17, O.l += 1, O.l += 2;
      var Q = O.read_shift(P - 21, "cstr");
      return [L, Q];
    }
  }
  function De(O, P) {
    for (var R = {}, L = O.l + P; O.l < L; ) {
      var Q = O.read_shift(2);
      if (Q == 14e3) {
        for (R[Q] = [0, ""], R[Q][0] = O.read_shift(2); O[O.l]; )
          R[Q][1] += String.fromCharCode(O[O.l]), O.l++;
        O.l++;
      }
    }
    return R;
  }
  function H(O, P) {
    var R = q(5 + O.length);
    R.write_shift(2, 14e3), R.write_shift(2, P);
    for (var L = 0; L < O.length; ++L) {
      var Q = O.charCodeAt(L);
      R[R.l++] = Q > 127 ? 95 : Q;
    }
    return R[R.l++] = 0, R;
  }
  var _e = {
    /*::[*/
    0: { n: "BOF", f: ur },
    /*::[*/
    1: { n: "EOF" },
    /*::[*/
    2: { n: "CALCMODE" },
    /*::[*/
    3: { n: "CALCORDER" },
    /*::[*/
    4: { n: "SPLIT" },
    /*::[*/
    5: { n: "SYNC" },
    /*::[*/
    6: { n: "RANGE", f },
    /*::[*/
    7: { n: "WINDOW1" },
    /*::[*/
    8: { n: "COLW1" },
    /*::[*/
    9: { n: "WINTWO" },
    /*::[*/
    10: { n: "COLW2" },
    /*::[*/
    11: { n: "NAME" },
    /*::[*/
    12: { n: "BLANK" },
    /*::[*/
    13: { n: "INTEGER", f: u },
    /*::[*/
    14: { n: "NUMBER", f: g },
    /*::[*/
    15: { n: "LABEL", f: l },
    /*::[*/
    16: { n: "FORMULA", f: m },
    /*::[*/
    24: { n: "TABLE" },
    /*::[*/
    25: { n: "ORANGE" },
    /*::[*/
    26: { n: "PRANGE" },
    /*::[*/
    27: { n: "SRANGE" },
    /*::[*/
    28: { n: "FRANGE" },
    /*::[*/
    29: { n: "KRANGE1" },
    /*::[*/
    32: { n: "HRANGE" },
    /*::[*/
    35: { n: "KRANGE2" },
    /*::[*/
    36: { n: "PROTEC" },
    /*::[*/
    37: { n: "FOOTER" },
    /*::[*/
    38: { n: "HEADER" },
    /*::[*/
    39: { n: "SETUP" },
    /*::[*/
    40: { n: "MARGINS" },
    /*::[*/
    41: { n: "LABELFMT" },
    /*::[*/
    42: { n: "TITLES" },
    /*::[*/
    43: { n: "SHEETJS" },
    /*::[*/
    45: { n: "GRAPH" },
    /*::[*/
    46: { n: "NGRAPH" },
    /*::[*/
    47: { n: "CALCCOUNT" },
    /*::[*/
    48: { n: "UNFORMATTED" },
    /*::[*/
    49: { n: "CURSORW12" },
    /*::[*/
    50: { n: "WINDOW" },
    /*::[*/
    51: { n: "STRING", f: l },
    /*::[*/
    55: { n: "PASSWORD" },
    /*::[*/
    56: { n: "LOCKED" },
    /*::[*/
    60: { n: "QUERY" },
    /*::[*/
    61: { n: "QUERYNAME" },
    /*::[*/
    62: { n: "PRINT" },
    /*::[*/
    63: { n: "PRINTNAME" },
    /*::[*/
    64: { n: "GRAPH2" },
    /*::[*/
    65: { n: "GRAPHNAME" },
    /*::[*/
    66: { n: "ZOOM" },
    /*::[*/
    67: { n: "SYMSPLIT" },
    /*::[*/
    68: { n: "NSROWS" },
    /*::[*/
    69: { n: "NSCOLS" },
    /*::[*/
    70: { n: "RULER" },
    /*::[*/
    71: { n: "NNAME" },
    /*::[*/
    72: { n: "ACOMM" },
    /*::[*/
    73: { n: "AMACRO" },
    /*::[*/
    74: { n: "PARSE" },
    /*::[*/
    102: { n: "PRANGES??" },
    /*::[*/
    103: { n: "RRANGES??" },
    /*::[*/
    104: { n: "FNAME??" },
    /*::[*/
    105: { n: "MRANGES??" },
    /*::[*/
    204: { n: "SHEETNAMECS", f: W },
    /*::[*/
    222: { n: "SHEETNAMELP", f: ee },
    /*::[*/
    65535: { n: "" }
  }, Se = {
    /*::[*/
    0: { n: "BOF" },
    /*::[*/
    1: { n: "EOF" },
    /*::[*/
    2: { n: "PASSWORD" },
    /*::[*/
    3: { n: "CALCSET" },
    /*::[*/
    4: { n: "WINDOWSET" },
    /*::[*/
    5: { n: "SHEETCELLPTR" },
    /*::[*/
    6: { n: "SHEETLAYOUT" },
    /*::[*/
    7: { n: "COLUMNWIDTH" },
    /*::[*/
    8: { n: "HIDDENCOLUMN" },
    /*::[*/
    9: { n: "USERRANGE" },
    /*::[*/
    10: { n: "SYSTEMRANGE" },
    /*::[*/
    11: { n: "ZEROFORCE" },
    /*::[*/
    12: { n: "SORTKEYDIR" },
    /*::[*/
    13: { n: "FILESEAL" },
    /*::[*/
    14: { n: "DATAFILLNUMS" },
    /*::[*/
    15: { n: "PRINTMAIN" },
    /*::[*/
    16: { n: "PRINTSTRING" },
    /*::[*/
    17: { n: "GRAPHMAIN" },
    /*::[*/
    18: { n: "GRAPHSTRING" },
    /*::[*/
    19: { n: "??" },
    /*::[*/
    20: { n: "ERRCELL" },
    /*::[*/
    21: { n: "NACELL" },
    /*::[*/
    22: { n: "LABEL16", f: N },
    /*::[*/
    23: { n: "NUMBER17", f: C },
    /*::[*/
    24: { n: "NUMBER18", f: U },
    /*::[*/
    25: { n: "FORMULA19", f: M },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: De },
    /*::[*/
    28: { n: "DTLABELMISC" },
    /*::[*/
    29: { n: "DTLABELCELL" },
    /*::[*/
    30: { n: "GRAPHWINDOW" },
    /*::[*/
    31: { n: "CPA" },
    /*::[*/
    32: { n: "LPLAUTO" },
    /*::[*/
    33: { n: "QUERY" },
    /*::[*/
    34: { n: "HIDDENSHEET" },
    /*::[*/
    35: { n: "??" },
    /*::[*/
    37: { n: "NUMBER25", f: B },
    /*::[*/
    38: { n: "??" },
    /*::[*/
    39: { n: "NUMBER27", f: Y },
    /*::[*/
    40: { n: "FORMULA28", f: he },
    /*::[*/
    142: { n: "??" },
    /*::[*/
    147: { n: "??" },
    /*::[*/
    150: { n: "??" },
    /*::[*/
    151: { n: "??" },
    /*::[*/
    152: { n: "??" },
    /*::[*/
    153: { n: "??" },
    /*::[*/
    154: { n: "??" },
    /*::[*/
    155: { n: "??" },
    /*::[*/
    156: { n: "??" },
    /*::[*/
    163: { n: "??" },
    /*::[*/
    174: { n: "??" },
    /*::[*/
    175: { n: "??" },
    /*::[*/
    176: { n: "??" },
    /*::[*/
    177: { n: "??" },
    /*::[*/
    184: { n: "??" },
    /*::[*/
    185: { n: "??" },
    /*::[*/
    186: { n: "??" },
    /*::[*/
    187: { n: "??" },
    /*::[*/
    188: { n: "??" },
    /*::[*/
    195: { n: "??" },
    /*::[*/
    201: { n: "??" },
    /*::[*/
    204: { n: "SHEETNAMECS", f: W },
    /*::[*/
    205: { n: "??" },
    /*::[*/
    206: { n: "??" },
    /*::[*/
    207: { n: "??" },
    /*::[*/
    208: { n: "??" },
    /*::[*/
    256: { n: "??" },
    /*::[*/
    259: { n: "??" },
    /*::[*/
    260: { n: "??" },
    /*::[*/
    261: { n: "??" },
    /*::[*/
    262: { n: "??" },
    /*::[*/
    263: { n: "??" },
    /*::[*/
    265: { n: "??" },
    /*::[*/
    266: { n: "??" },
    /*::[*/
    267: { n: "??" },
    /*::[*/
    268: { n: "??" },
    /*::[*/
    270: { n: "??" },
    /*::[*/
    271: { n: "??" },
    /*::[*/
    384: { n: "??" },
    /*::[*/
    389: { n: "??" },
    /*::[*/
    390: { n: "??" },
    /*::[*/
    393: { n: "??" },
    /*::[*/
    396: { n: "??" },
    /*::[*/
    512: { n: "??" },
    /*::[*/
    514: { n: "??" },
    /*::[*/
    513: { n: "??" },
    /*::[*/
    516: { n: "??" },
    /*::[*/
    517: { n: "??" },
    /*::[*/
    640: { n: "??" },
    /*::[*/
    641: { n: "??" },
    /*::[*/
    642: { n: "??" },
    /*::[*/
    643: { n: "??" },
    /*::[*/
    644: { n: "??" },
    /*::[*/
    645: { n: "??" },
    /*::[*/
    646: { n: "??" },
    /*::[*/
    647: { n: "??" },
    /*::[*/
    648: { n: "??" },
    /*::[*/
    658: { n: "??" },
    /*::[*/
    659: { n: "??" },
    /*::[*/
    660: { n: "??" },
    /*::[*/
    661: { n: "??" },
    /*::[*/
    662: { n: "??" },
    /*::[*/
    665: { n: "??" },
    /*::[*/
    666: { n: "??" },
    /*::[*/
    768: { n: "??" },
    /*::[*/
    772: { n: "??" },
    /*::[*/
    1537: { n: "SHEETINFOQP", f: ne },
    /*::[*/
    1600: { n: "??" },
    /*::[*/
    1602: { n: "??" },
    /*::[*/
    1793: { n: "??" },
    /*::[*/
    1794: { n: "??" },
    /*::[*/
    1795: { n: "??" },
    /*::[*/
    1796: { n: "??" },
    /*::[*/
    1920: { n: "??" },
    /*::[*/
    2048: { n: "??" },
    /*::[*/
    2049: { n: "??" },
    /*::[*/
    2052: { n: "??" },
    /*::[*/
    2688: { n: "??" },
    /*::[*/
    10998: { n: "??" },
    /*::[*/
    12849: { n: "??" },
    /*::[*/
    28233: { n: "??" },
    /*::[*/
    28484: { n: "??" },
    /*::[*/
    65535: { n: "" }
  };
  return {
    sheet_to_wk1: n,
    book_to_wk3: a,
    to_workbook: t
  };
}();
function rd(e) {
  var t = {}, r = e.match(Nr), n = 0, a = !1;
  if (r) for (; n != r.length; ++n) {
    var i = Te(r[n]);
    switch (i[0].replace(/\w*:/g, "")) {
      case "<condense":
        break;
      case "<extend":
        break;
      case "<shadow":
        if (!i.val) break;
      case "<shadow>":
      case "<shadow/>":
        t.shadow = 1;
        break;
      case "</shadow>":
        break;
      case "<charset":
        if (i.val == "1") break;
        t.cp = Is[parseInt(i.val, 10)];
        break;
      case "<outline":
        if (!i.val) break;
      case "<outline>":
      case "<outline/>":
        t.outline = 1;
        break;
      case "</outline>":
        break;
      case "<rFont":
        t.name = i.val;
        break;
      case "<sz":
        t.sz = i.val;
        break;
      case "<strike":
        if (!i.val) break;
      case "<strike>":
      case "<strike/>":
        t.strike = 1;
        break;
      case "</strike>":
        break;
      case "<u":
        if (!i.val) break;
        switch (i.val) {
          case "double":
            t.uval = "double";
            break;
          case "singleAccounting":
            t.uval = "single-accounting";
            break;
          case "doubleAccounting":
            t.uval = "double-accounting";
            break;
        }
      case "<u>":
      case "<u/>":
        t.u = 1;
        break;
      case "</u>":
        break;
      case "<b":
        if (i.val == "0") break;
      case "<b>":
      case "<b/>":
        t.b = 1;
        break;
      case "</b>":
        break;
      case "<i":
        if (i.val == "0") break;
      case "<i>":
      case "<i/>":
        t.i = 1;
        break;
      case "</i>":
        break;
      case "<color":
        i.rgb && (t.color = i.rgb.slice(2, 8));
        break;
      case "<color>":
      case "<color/>":
      case "</color>":
        break;
      case "<family":
        t.family = i.val;
        break;
      case "<family>":
      case "<family/>":
      case "</family>":
        break;
      case "<vertAlign":
        t.valign = i.val;
        break;
      case "<vertAlign>":
      case "<vertAlign/>":
      case "</vertAlign>":
        break;
      case "<scheme":
        break;
      case "<scheme>":
      case "<scheme/>":
      case "</scheme>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        a = !0;
        break;
      case "</ext>":
        a = !1;
        break;
      default:
        if (i[0].charCodeAt(1) !== 47 && !a) throw new Error("Unrecognized rich format " + i[0]);
    }
  }
  return t;
}
var td = /* @__PURE__ */ function() {
  var e = Ra("t"), t = Ra("rPr");
  function r(i) {
    var s = i.match(e);
    if (!s) return { t: "s", v: "" };
    var f = { t: "s", v: Pe(s[1]) }, c = i.match(t);
    return c && (f.s = rd(c[1])), f;
  }
  var n = /<(?:\w+:)?r>/g, a = /<\/(?:\w+:)?r>/;
  return function(s) {
    return s.replace(n, "").split(a).map(r).filter(function(f) {
      return f.v;
    });
  };
}(), nd = /* @__PURE__ */ function() {
  var t = /(\r\n|\n)/g;
  function r(a, i, s) {
    var f = [];
    a.u && f.push("text-decoration: underline;"), a.uval && f.push("text-underline-style:" + a.uval + ";"), a.sz && f.push("font-size:" + a.sz + "pt;"), a.outline && f.push("text-effect: outline;"), a.shadow && f.push("text-shadow: auto;"), i.push('<span style="' + f.join("") + '">'), a.b && (i.push("<b>"), s.push("</b>")), a.i && (i.push("<i>"), s.push("</i>")), a.strike && (i.push("<s>"), s.push("</s>"));
    var c = a.valign || "";
    return c == "superscript" || c == "super" ? c = "sup" : c == "subscript" && (c = "sub"), c != "" && (i.push("<" + c + ">"), s.push("</" + c + ">")), s.push("</span>"), a;
  }
  function n(a) {
    var i = [[], a.v, []];
    return a.v ? (a.s && r(a.s, i[0], i[2]), i[0].join("") + i[1].replace(t, "<br/>") + i[2].join("")) : "";
  }
  return function(i) {
    return i.map(n).join("");
  };
}(), ad = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g, id = /<(?:\w+:)?r>/, sd = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;
function t0(e, t) {
  var r = t ? t.cellHTML : !0, n = {};
  return e ? (e.match(/^\s*<(?:\w+:)?t[^>]*>/) ? (n.t = Pe(ze(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || "")), n.r = ze(e), r && (n.h = Vs(n.t))) : (
    /*y = */
    e.match(id) && (n.r = ze(e), n.t = Pe(ze((e.replace(sd, "").match(ad) || []).join("").replace(Nr, ""))), r && (n.h = nd(td(n.r))))
  ), n) : { t: "" };
}
var fd = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/, cd = /<(?:\w+:)?(?:si|sstItem)>/g, od = /<\/(?:\w+:)?(?:si|sstItem)>/;
function ld(e, t) {
  var r = [], n = "";
  if (!e) return r;
  var a = e.match(fd);
  if (a) {
    n = a[2].replace(cd, "").split(od);
    for (var i = 0; i != n.length; ++i) {
      var s = t0(n[i].trim(), t);
      s != null && (r[r.length] = s);
    }
    a = Te(a[1]), r.Count = a.count, r.Unique = a.uniqueCount;
  }
  return r;
}
var hd = /^\s|\s$|[\t\n\r]/;
function To(e, t) {
  if (!t.bookSST) return "";
  var r = [or];
  r[r.length] = oe("sst", null, {
    xmlns: Fn[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match(hd) && (i += ' xml:space="preserve"'), i += ">" + $e(a.t) + "</t>"), i += "</si>", r[r.length] = i;
    }
  return r.length > 2 && (r[r.length] = "</sst>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function ud(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function xd(e, t) {
  var r = [], n = !1;
  return Vt(e, function(i, s, f) {
    switch (f) {
      case 159:
        r.Count = i[0], r.Unique = i[1];
        break;
      case 19:
        r.push(i);
        break;
      case 160:
        return !0;
      case 35:
        n = !0;
        break;
      case 36:
        n = !1;
        break;
      default:
        if (s.T, !n || t.WTF) throw new Error("Unexpected record 0x" + f.toString(16));
    }
  }), r;
}
function dd(e, t) {
  return t || (t = q(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}
var gd = ku;
function md(e) {
  var t = Wr();
  re(t, 159, dd(e));
  for (var r = 0; r < e.length; ++r) re(t, 19, gd(e[r]));
  return re(
    t,
    160
    /* BrtEndSst */
  ), t.end();
}
function So(e) {
  for (var t = [], r = e.split(""), n = 0; n < r.length; ++n) t[n] = r[n].charCodeAt(0);
  return t;
}
function Mt(e, t) {
  var r = {};
  return r.Major = e.read_shift(2), r.Minor = e.read_shift(2), t >= 4 && (e.l += t - 4), r;
}
function pd(e) {
  var t = {};
  return t.id = e.read_shift(0, "lpp4"), t.R = Mt(e, 4), t.U = Mt(e, 4), t.W = Mt(e, 4), t;
}
function vd(e) {
  for (var t = e.read_shift(4), r = e.l + t - 4, n = {}, a = e.read_shift(4), i = []; a-- > 0; ) i.push({ t: e.read_shift(4), v: e.read_shift(0, "lpp4") });
  if (n.name = e.read_shift(0, "lpp4"), n.comps = i, e.l != r) throw new Error("Bad DataSpaceMapEntry: " + e.l + " != " + r);
  return n;
}
function wd(e) {
  var t = [];
  e.l += 4;
  for (var r = e.read_shift(4); r-- > 0; ) t.push(vd(e));
  return t;
}
function _d(e) {
  var t = [];
  e.l += 4;
  for (var r = e.read_shift(4); r-- > 0; ) t.push(e.read_shift(0, "lpp4"));
  return t;
}
function Ed(e) {
  var t = {};
  return e.read_shift(4), e.l += 4, t.id = e.read_shift(0, "lpp4"), t.name = e.read_shift(0, "lpp4"), t.R = Mt(e, 4), t.U = Mt(e, 4), t.W = Mt(e, 4), t;
}
function yd(e) {
  var t = Ed(e);
  if (t.ename = e.read_shift(0, "8lpp4"), t.blksz = e.read_shift(4), t.cmode = e.read_shift(4), e.read_shift(4) != 4) throw new Error("Bad !Primary record");
  return t;
}
function ko(e, t) {
  var r = e.l + t, n = {};
  n.Flags = e.read_shift(4) & 63, e.l += 4, n.AlgID = e.read_shift(4);
  var a = !1;
  switch (n.AlgID) {
    case 26126:
    case 26127:
    case 26128:
      a = n.Flags == 36;
      break;
    case 26625:
      a = n.Flags == 4;
      break;
    case 0:
      a = n.Flags == 16 || n.Flags == 4 || n.Flags == 36;
      break;
    default:
      throw "Unrecognized encryption algorithm: " + n.AlgID;
  }
  if (!a) throw new Error("Encryption Flags/AlgID mismatch");
  return n.AlgIDHash = e.read_shift(4), n.KeySize = e.read_shift(4), n.ProviderType = e.read_shift(4), e.l += 8, n.CSPName = e.read_shift(r - e.l >> 1, "utf16le"), e.l = r, n;
}
function Ao(e, t) {
  var r = {}, n = e.l + t;
  return e.l += 4, r.Salt = e.slice(e.l, e.l + 16), e.l += 16, r.Verifier = e.slice(e.l, e.l + 16), e.l += 16, e.read_shift(4), r.VerifierHash = e.slice(e.l, n), e.l = n, r;
}
function Td(e) {
  var t = Mt(e);
  switch (t.Minor) {
    case 2:
      return [t.Minor, Sd(e)];
    case 3:
      return [t.Minor, kd()];
    case 4:
      return [t.Minor, Ad(e)];
  }
  throw new Error("ECMA-376 Encrypted file unrecognized Version: " + t.Minor);
}
function Sd(e) {
  var t = e.read_shift(4);
  if ((t & 63) != 36) throw new Error("EncryptionInfo mismatch");
  var r = e.read_shift(4), n = ko(e, r), a = Ao(e, e.length - e.l);
  return { t: "Std", h: n, v: a };
}
function kd() {
  throw new Error("File is password-protected: ECMA-376 Extensible");
}
function Ad(e) {
  var t = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm", "saltValue"];
  e.l += 4;
  var r = e.read_shift(e.length - e.l, "utf8"), n = {};
  return r.replace(Nr, function(i) {
    var s = Te(i);
    switch (Ft(s[0])) {
      case "<?xml":
        break;
      case "<encryption":
      case "</encryption>":
        break;
      case "<keyData":
        t.forEach(function(f) {
          n[f] = s[f];
        });
        break;
      case "<dataIntegrity":
        n.encryptedHmacKey = s.encryptedHmacKey, n.encryptedHmacValue = s.encryptedHmacValue;
        break;
      case "<keyEncryptors>":
      case "<keyEncryptors":
        n.encs = [];
        break;
      case "</keyEncryptors>":
        break;
      case "<keyEncryptor":
        n.uri = s.uri;
        break;
      case "</keyEncryptor>":
        break;
      case "<encryptedKey":
        n.encs.push(s);
        break;
      default:
        throw s[0];
    }
  }), n;
}
function Fd(e, t) {
  var r = {}, n = r.EncryptionVersionInfo = Mt(e, 4);
  if (t -= 4, n.Minor != 2) throw new Error("unrecognized minor version code: " + n.Minor);
  if (n.Major > 4 || n.Major < 2) throw new Error("unrecognized major version code: " + n.Major);
  r.Flags = e.read_shift(4), t -= 4;
  var a = e.read_shift(4);
  return t -= 4, r.EncryptionHeader = ko(e, a), t -= a, r.EncryptionVerifier = Ao(e, t), r;
}
function bd(e) {
  var t = {}, r = t.EncryptionVersionInfo = Mt(e, 4);
  if (r.Major != 1 || r.Minor != 1) throw "unrecognized version code " + r.Major + " : " + r.Minor;
  return t.Salt = e.read_shift(16), t.EncryptedVerifier = e.read_shift(16), t.EncryptedVerifierHash = e.read_shift(16), t;
}
function n0(e) {
  var t = 0, r, n = So(e), a = n.length + 1, i, s, f, c, o;
  for (r = en(a), r[0] = n.length, i = 1; i != a; ++i) r[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = r[i], f = t & 16384 ? 1 : 0, c = t << 1 & 32767, o = f | c, t = o ^ s;
  return t ^ 52811;
}
var Fo = /* @__PURE__ */ function() {
  var e = [187, 255, 255, 186, 255, 255, 185, 128, 0, 190, 15, 0, 191, 15, 0], t = [57840, 7439, 52380, 33984, 4364, 3600, 61902, 12606, 6258, 57657, 54287, 34041, 10252, 43370, 20163], r = [44796, 19929, 39858, 10053, 20106, 40212, 10761, 31585, 63170, 64933, 60267, 50935, 40399, 11199, 17763, 35526, 1453, 2906, 5812, 11624, 23248, 885, 1770, 3540, 7080, 14160, 28320, 56640, 55369, 41139, 20807, 41614, 21821, 43642, 17621, 28485, 56970, 44341, 19019, 38038, 14605, 29210, 60195, 50791, 40175, 10751, 21502, 43004, 24537, 18387, 36774, 3949, 7898, 15796, 31592, 63184, 47201, 24803, 49606, 37805, 14203, 28406, 56812, 17824, 35648, 1697, 3394, 6788, 13576, 27152, 43601, 17539, 35078, 557, 1114, 2228, 4456, 30388, 60776, 51953, 34243, 7079, 14158, 28316, 14128, 28256, 56512, 43425, 17251, 34502, 7597, 13105, 26210, 52420, 35241, 883, 1766, 3532, 4129, 8258, 16516, 33032, 4657, 9314, 18628], n = function(s) {
    return (s / 2 | s * 128) & 255;
  }, a = function(s, f) {
    return n(s ^ f);
  }, i = function(s) {
    for (var f = t[s.length - 1], c = 104, o = s.length - 1; o >= 0; --o)
      for (var l = s[o], h = 0; h != 7; ++h)
        l & 64 && (f ^= r[c]), l *= 2, --c;
    return f;
  };
  return function(s) {
    for (var f = So(s), c = i(f), o = f.length, l = en(16), h = 0; h != 16; ++h) l[h] = 0;
    var u, x, g;
    for ((o & 1) === 1 && (u = c >> 8, l[o] = a(e[0], u), --o, u = c & 255, x = f[f.length - 1], l[o] = a(x, u)); o > 0; )
      --o, u = c >> 8, l[o] = a(f[o], u), --o, u = c & 255, l[o] = a(f[o], u);
    for (o = 15, g = 15 - f.length; g > 0; )
      u = c >> 8, l[o] = a(e[g], u), --o, --g, u = c & 255, l[o] = a(f[o], u), --o, --g;
    return l;
  };
}(), Cd = function(e, t, r, n, a) {
  a || (a = t), n || (n = Fo(e));
  var i, s;
  for (i = 0; i != t.length; ++i)
    s = t[i], s ^= n[r], s = (s >> 5 | s << 3) & 255, a[i] = s, ++r;
  return [a, r, n];
}, Od = function(e) {
  var t = 0, r = Fo(e);
  return function(n) {
    var a = Cd("", n, t, r);
    return t = a[1], a[0];
  };
};
function Nd(e, t, r, n) {
  var a = { key: ur(e), verificationBytes: ur(e) };
  return r.password && (a.verifier = n0(r.password)), n.valid = a.verificationBytes === a.verifier, n.valid && (n.insitu = Od(r.password)), a;
}
function Id(e, t, r) {
  var n = r || {};
  return n.Info = e.read_shift(2), e.l -= 2, n.Info === 1 ? n.Data = bd(e) : n.Data = Fd(e, t), n;
}
function Bd(e, t, r) {
  var n = { Type: r.biff >= 8 ? e.read_shift(2) : 0 };
  return n.Type ? Id(e, t - 2, n) : Nd(e, r.biff >= 8 ? t : t - 2, r, n), n;
}
var bo = /* @__PURE__ */ function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return t(Jr(a), i);
      case "binary":
        return t(a, i);
      case "buffer":
        return t(Ce && Buffer.isBuffer(a) ? a.toString("binary") : fn(a), i);
      case "array":
        return t(En(a), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function t(a, i) {
    var s = i || {}, f = s.dense ? [] : {}, c = a.match(/\\trowd.*?\\row\b/g);
    if (!c.length) throw new Error("RTF missing table");
    var o = { s: { c: 0, r: 0 }, e: { c: 0, r: c.length - 1 } };
    return c.forEach(function(l, h) {
      Array.isArray(f) && (f[h] = []);
      for (var u = /\\\w+\b/g, x = 0, g, d = -1; g = u.exec(l); ) {
        switch (g[0]) {
          case "\\cell":
            var m = l.slice(x, u.lastIndex - g[0].length);
            if (m[0] == " " && (m = m.slice(1)), ++d, m.length) {
              var w = { v: m, t: "s" };
              Array.isArray(f) ? f[h][d] = w : f[ye({ r: h, c: d })] = w;
            }
            break;
        }
        x = u.lastIndex;
      }
      d > o.e.c && (o.e.c = d);
    }), f["!ref"] = Ae(o), f;
  }
  function r(a, i) {
    return cn(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = Me(a["!ref"]), f, c = Array.isArray(a), o = s.s.r; o <= s.e.r; ++o) {
      i.push("\\trowd\\trautofit1");
      for (var l = s.s.c; l <= s.e.c; ++l) i.push("\\cellx" + (l + 1));
      for (i.push("\\pard\\intbl"), l = s.s.c; l <= s.e.c; ++l) {
        var h = ye({ r: o, c: l });
        f = c ? (a[o] || [])[l] : a[h], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || (Ut(f), f.w))), i.push("\\cell"));
      }
      i.push("\\pard\\intbl\\row");
    }
    return i.join("") + "}";
  }
  return {
    to_workbook: r,
    to_sheet: e,
    from_sheet: n
  };
}();
function Dd(e) {
  var t = e.slice(e[0] === "#" ? 1 : 0).slice(0, 6);
  return [parseInt(t.slice(0, 2), 16), parseInt(t.slice(2, 4), 16), parseInt(t.slice(4, 6), 16)];
}
function Ua(e) {
  for (var t = 0, r = 1; t != 3; ++t) r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
function Rd(e) {
  var t = e[0] / 255, r = e[1] / 255, n = e[2] / 255, a = Math.max(t, r, n), i = Math.min(t, r, n), s = a - i;
  if (s === 0) return [0, 0, t];
  var f = 0, c = 0, o = a + i;
  switch (c = s / (o > 1 ? 2 - o : o), a) {
    case t:
      f = ((r - n) / s + 6) % 6;
      break;
    case r:
      f = (n - t) / s + 2;
      break;
    case n:
      f = (t - r) / s + 4;
      break;
  }
  return [f / 6, c, o / 2];
}
function Ld(e) {
  var t = e[0], r = e[1], n = e[2], a = r * 2 * (n < 0.5 ? n : 1 - n), i = n - a / 2, s = [i, i, i], f = 6 * t, c;
  if (r !== 0) switch (f | 0) {
    case 0:
    case 6:
      c = a * f, s[0] += a, s[1] += c;
      break;
    case 1:
      c = a * (2 - f), s[0] += c, s[1] += a;
      break;
    case 2:
      c = a * (f - 2), s[1] += a, s[2] += c;
      break;
    case 3:
      c = a * (4 - f), s[1] += c, s[2] += a;
      break;
    case 4:
      c = a * (f - 4), s[2] += a, s[0] += c;
      break;
    case 5:
      c = a * (6 - f), s[2] += c, s[0] += a;
      break;
  }
  for (var o = 0; o != 3; ++o) s[o] = Math.round(s[o] * 255);
  return s;
}
function Oi(e, t) {
  if (t === 0) return e;
  var r = Rd(Dd(e));
  return t < 0 ? r[2] = r[2] * (1 + t) : r[2] = 1 - (1 - r[2]) * (1 - t), Ua(Ld(r));
}
var Co = 6, Pd = 15, Md = 1, Fr = Co;
function Wa(e) {
  return Math.floor((e + Math.round(128 / Fr) / 256) * Fr);
}
function Ha(e) {
  return Math.floor((e - 5) / Fr * 100 + 0.5) / 100;
}
function Ni(e) {
  return Math.round((e * Fr + 5) / Fr * 256) / 256;
}
function ts(e) {
  return Ni(Ha(Wa(e)));
}
function a0(e) {
  var t = Math.abs(e - ts(e)), r = Fr;
  if (t > 5e-3) for (Fr = Md; Fr < Pd; ++Fr) Math.abs(e - ts(e)) <= t && (t = Math.abs(e - ts(e)), r = Fr);
  Fr = r;
}
function rn(e) {
  e.width ? (e.wpx = Wa(e.width), e.wch = Ha(e.wpx), e.MDW = Fr) : e.wpx ? (e.wch = Ha(e.wpx), e.width = Ni(e.wch), e.MDW = Fr) : typeof e.wch == "number" && (e.width = Ni(e.wch), e.wpx = Wa(e.width), e.MDW = Fr), e.customWidth && delete e.customWidth;
}
var Ud = 96, Oo = Ud;
function Va(e) {
  return e * 96 / Oo;
}
function Zn(e) {
  return e * Oo / 96;
}
var Wd = {
  None: "none",
  Solid: "solid",
  Gray50: "mediumGray",
  Gray75: "darkGray",
  Gray25: "lightGray",
  HorzStripe: "darkHorizontal",
  VertStripe: "darkVertical",
  ReverseDiagStripe: "darkDown",
  DiagStripe: "darkUp",
  DiagCross: "darkGrid",
  ThickDiagCross: "darkTrellis",
  ThinHorzStripe: "lightHorizontal",
  ThinVertStripe: "lightVertical",
  ThinReverseDiagStripe: "lightDown",
  ThinHorzCross: "lightGrid"
};
function Hd(e, t, r, n) {
  t.Borders = [];
  var a = {}, i = !1;
  (e[0].match(Nr) || []).forEach(function(s) {
    var f = Te(s);
    switch (Ft(f[0])) {
      case "<borders":
      case "<borders>":
      case "</borders>":
        break;
      case "<border":
      case "<border>":
      case "<border/>":
        a = /*::(*/
        {}, f.diagonalUp && (a.diagonalUp = je(f.diagonalUp)), f.diagonalDown && (a.diagonalDown = je(f.diagonalDown)), t.Borders.push(a);
        break;
      case "</border>":
        break;
      case "<left/>":
        break;
      case "<left":
      case "<left>":
        break;
      case "</left>":
        break;
      case "<right/>":
        break;
      case "<right":
      case "<right>":
        break;
      case "</right>":
        break;
      case "<top/>":
        break;
      case "<top":
      case "<top>":
        break;
      case "</top>":
        break;
      case "<bottom/>":
        break;
      case "<bottom":
      case "<bottom>":
        break;
      case "</bottom>":
        break;
      case "<diagonal":
      case "<diagonal>":
      case "<diagonal/>":
        break;
      case "</diagonal>":
        break;
      case "<horizontal":
      case "<horizontal>":
      case "<horizontal/>":
        break;
      case "</horizontal>":
        break;
      case "<vertical":
      case "<vertical>":
      case "<vertical/>":
        break;
      case "</vertical>":
        break;
      case "<start":
      case "<start>":
      case "<start/>":
        break;
      case "</start>":
        break;
      case "<end":
      case "<end>":
      case "<end/>":
        break;
      case "</end>":
        break;
      case "<color":
      case "<color>":
        break;
      case "<color/>":
      case "</color>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        i = !0;
        break;
      case "</ext>":
        i = !1;
        break;
      default:
        if (n && n.WTF && !i)
          throw new Error("unrecognized " + f[0] + " in borders");
    }
  });
}
function Vd(e, t, r, n) {
  t.Fills = [];
  var a = {}, i = !1;
  (e[0].match(Nr) || []).forEach(function(s) {
    var f = Te(s);
    switch (Ft(f[0])) {
      case "<fills":
      case "<fills>":
      case "</fills>":
        break;
      case "<fill>":
      case "<fill":
      case "<fill/>":
        a = {}, t.Fills.push(a);
        break;
      case "</fill>":
        break;
      case "<gradientFill>":
        break;
      case "<gradientFill":
      case "</gradientFill>":
        t.Fills.push(a), a = {};
        break;
      case "<patternFill":
      case "<patternFill>":
        f.patternType && (a.patternType = f.patternType);
        break;
      case "<patternFill/>":
      case "</patternFill>":
        break;
      case "<bgColor":
        a.bgColor || (a.bgColor = {}), f.indexed && (a.bgColor.indexed = parseInt(f.indexed, 10)), f.theme && (a.bgColor.theme = parseInt(f.theme, 10)), f.tint && (a.bgColor.tint = parseFloat(f.tint)), f.rgb && (a.bgColor.rgb = f.rgb.slice(-6));
        break;
      case "<bgColor/>":
      case "</bgColor>":
        break;
      case "<fgColor":
        a.fgColor || (a.fgColor = {}), f.theme && (a.fgColor.theme = parseInt(f.theme, 10)), f.tint && (a.fgColor.tint = parseFloat(f.tint)), f.rgb != null && (a.fgColor.rgb = f.rgb.slice(-6));
        break;
      case "<fgColor/>":
      case "</fgColor>":
        break;
      case "<stop":
      case "<stop/>":
        break;
      case "</stop>":
        break;
      case "<color":
      case "<color/>":
        break;
      case "</color>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        i = !0;
        break;
      case "</ext>":
        i = !1;
        break;
      default:
        if (n && n.WTF && !i)
          throw new Error("unrecognized " + f[0] + " in fills");
    }
  });
}
function $d(e, t, r, n) {
  t.Fonts = [];
  var a = {}, i = !1;
  (e[0].match(Nr) || []).forEach(function(s) {
    var f = Te(s);
    switch (Ft(f[0])) {
      case "<fonts":
      case "<fonts>":
      case "</fonts>":
        break;
      case "<font":
      case "<font>":
        break;
      case "</font>":
      case "<font/>":
        t.Fonts.push(a), a = {};
        break;
      case "<name":
        f.val && (a.name = ze(f.val));
        break;
      case "<name/>":
      case "</name>":
        break;
      case "<b":
        a.bold = f.val ? je(f.val) : 1;
        break;
      case "<b/>":
        a.bold = 1;
        break;
      case "<i":
        a.italic = f.val ? je(f.val) : 1;
        break;
      case "<i/>":
        a.italic = 1;
        break;
      case "<u":
        switch (f.val) {
          case "none":
            a.underline = 0;
            break;
          case "single":
            a.underline = 1;
            break;
          case "double":
            a.underline = 2;
            break;
          case "singleAccounting":
            a.underline = 33;
            break;
          case "doubleAccounting":
            a.underline = 34;
            break;
        }
        break;
      case "<u/>":
        a.underline = 1;
        break;
      case "<strike":
        a.strike = f.val ? je(f.val) : 1;
        break;
      case "<strike/>":
        a.strike = 1;
        break;
      case "<outline":
        a.outline = f.val ? je(f.val) : 1;
        break;
      case "<outline/>":
        a.outline = 1;
        break;
      case "<shadow":
        a.shadow = f.val ? je(f.val) : 1;
        break;
      case "<shadow/>":
        a.shadow = 1;
        break;
      case "<condense":
        a.condense = f.val ? je(f.val) : 1;
        break;
      case "<condense/>":
        a.condense = 1;
        break;
      case "<extend":
        a.extend = f.val ? je(f.val) : 1;
        break;
      case "<extend/>":
        a.extend = 1;
        break;
      case "<sz":
        f.val && (a.sz = +f.val);
        break;
      case "<sz/>":
      case "</sz>":
        break;
      case "<vertAlign":
        f.val && (a.vertAlign = f.val);
        break;
      case "<vertAlign/>":
      case "</vertAlign>":
        break;
      case "<family":
        f.val && (a.family = parseInt(f.val, 10));
        break;
      case "<family/>":
      case "</family>":
        break;
      case "<scheme":
        f.val && (a.scheme = f.val);
        break;
      case "<scheme/>":
      case "</scheme>":
        break;
      case "<charset":
        if (f.val == "1") break;
        f.codepage = Is[parseInt(f.val, 10)];
        break;
      case "<color":
        if (a.color || (a.color = {}), f.auto && (a.color.auto = je(f.auto)), f.rgb) a.color.rgb = f.rgb.slice(-6);
        else if (f.indexed) {
          a.color.index = parseInt(f.indexed, 10);
          var c = mn[a.color.index];
          a.color.index == 81 && (c = mn[1]), c || (c = mn[1]), a.color.rgb = c[0].toString(16) + c[1].toString(16) + c[2].toString(16);
        } else f.theme && (a.color.theme = parseInt(f.theme, 10), f.tint && (a.color.tint = parseFloat(f.tint)), f.theme && r.themeElements && r.themeElements.clrScheme && (a.color.rgb = Oi(r.themeElements.clrScheme[a.color.theme].rgb, a.color.tint || 0)));
        break;
      case "<color/>":
      case "</color>":
        break;
      case "<AlternateContent":
        i = !0;
        break;
      case "</AlternateContent>":
        i = !1;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        i = !0;
        break;
      case "</ext>":
        i = !1;
        break;
      default:
        if (n && n.WTF && !i)
          throw new Error("unrecognized " + f[0] + " in fonts");
    }
  });
}
function zd(e, t, r) {
  t.NumberFmt = [];
  for (var n = nr(Ee), a = 0; a < n.length; ++a) t.NumberFmt[n[a]] = Ee[n[a]];
  var i = e[0].match(Nr);
  if (i)
    for (a = 0; a < i.length; ++a) {
      var s = Te(i[a]);
      switch (Ft(s[0])) {
        case "<numFmts":
        case "</numFmts>":
        case "<numFmts/>":
        case "<numFmts>":
          break;
        case "<numFmt":
          {
            var f = Pe(ze(s.formatCode)), c = parseInt(s.numFmtId, 10);
            if (t.NumberFmt[c] = f, c > 0) {
              if (c > 392) {
                for (c = 392; c > 60 && t.NumberFmt[c] != null; --c) ;
                t.NumberFmt[c] = f;
              }
              Pt(f, c);
            }
          }
          break;
        case "</numFmt>":
          break;
        default:
          if (r.WTF) throw new Error("unrecognized " + s[0] + " in numFmts");
      }
    }
}
function Gd(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(r) {
    for (var n = r[0]; n <= r[1]; ++n) e[n] != null && (t[t.length] = oe("numFmt", null, { numFmtId: n, formatCode: $e(e[n]) }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = oe("numFmts", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
var xi = ["numFmtId", "fillId", "fontId", "borderId", "xfId"], di = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];
function Xd(e, t, r) {
  t.CellXf = [];
  var n, a = !1;
  (e[0].match(Nr) || []).forEach(function(i) {
    var s = Te(i), f = 0;
    switch (Ft(s[0])) {
      case "<cellXfs":
      case "<cellXfs>":
      case "<cellXfs/>":
      case "</cellXfs>":
        break;
      case "<xf":
      case "<xf/>":
        for (n = s, delete n[0], f = 0; f < xi.length; ++f) n[xi[f]] && (n[xi[f]] = parseInt(n[xi[f]], 10));
        for (f = 0; f < di.length; ++f) n[di[f]] && (n[di[f]] = je(n[di[f]]));
        if (t.NumberFmt && n.numFmtId > 392) {
          for (f = 392; f > 60; --f) if (t.NumberFmt[n.numFmtId] == t.NumberFmt[f]) {
            n.numFmtId = f;
            break;
          }
        }
        t.CellXf.push(n);
        break;
      case "</xf>":
        break;
      case "<alignment":
      case "<alignment/>":
        var c = {};
        s.vertical && (c.vertical = s.vertical), s.horizontal && (c.horizontal = s.horizontal), s.textRotation != null && (c.textRotation = s.textRotation), s.indent && (c.indent = s.indent), s.wrapText && (c.wrapText = je(s.wrapText)), n.alignment = c;
        break;
      case "</alignment>":
        break;
      case "<protection":
        break;
      case "</protection>":
      case "<protection/>":
        break;
      case "<AlternateContent":
        a = !0;
        break;
      case "</AlternateContent>":
        a = !1;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        a = !0;
        break;
      case "</ext>":
        a = !1;
        break;
      default:
        if (r && r.WTF && !a)
          throw new Error("unrecognized " + s[0] + " in cellXfs");
    }
  });
}
function jd(e) {
  var t = [];
  return t[t.length] = oe("cellXfs", null), e.forEach(function(r) {
    t[t.length] = oe("xf", null, r);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = oe("cellXfs", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
var Yd = /* @__PURE__ */ function() {
  var t = /<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/, r = /<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/, n = /<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/, a = /<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/, i = /<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;
  return function(f, c, o) {
    var l = {};
    if (!f) return l;
    f = f.replace(/<!--([\s\S]*?)-->/mg, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
    var h;
    return (h = f.match(t)) && zd(h, l, o), (h = f.match(a)) && $d(h, l, c, o), (h = f.match(n)) && Vd(h, l, c, o), (h = f.match(i)) && Hd(h, l, c, o), (h = f.match(r)) && Xd(h, l, o), l;
  };
}();
function No(e, t) {
  var r = [or, oe("styleSheet", null, {
    xmlns: Fn[0],
    "xmlns:vt": dr.vt
  })], n;
  return e.SSF && (n = Gd(e.SSF)) != null && (r[r.length] = n), r[r.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', r[r.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', r[r.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', r[r.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = jd(t.cellXfs)) && (r[r.length] = n), r[r.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', r[r.length] = '<dxfs count="0"/>', r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', r.length > 2 && (r[r.length] = "</styleSheet>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Kd(e, t) {
  var r = e.read_shift(2), n = Cr(e);
  return [r, n];
}
function Jd(e, t, r) {
  r || (r = q(6 + 4 * t.length)), r.write_shift(2, e), vr(t, r);
  var n = r.length > r.l ? r.slice(0, r.l) : r;
  return r.l == null && (r.l = r.length), n;
}
function qd(e, t, r) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = Iu(e);
  a.fItalic && (n.italic = 1), a.fCondense && (n.condense = 1), a.fExtend && (n.extend = 1), a.fShadow && (n.shadow = 1), a.fOutline && (n.outline = 1), a.fStrikeout && (n.strike = 1);
  var i = e.read_shift(2);
  switch (i === 700 && (n.bold = 1), e.read_shift(2)) {
    case 1:
      n.vertAlign = "superscript";
      break;
    case 2:
      n.vertAlign = "subscript";
      break;
  }
  var s = e.read_shift(1);
  s != 0 && (n.underline = s);
  var f = e.read_shift(1);
  f > 0 && (n.family = f);
  var c = e.read_shift(1);
  switch (c > 0 && (n.charset = c), e.l++, n.color = Nu(e), e.read_shift(1)) {
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return n.name = Cr(e), n;
}
function Zd(e, t) {
  t || (t = q(25 + 4 * 32)), t.write_shift(2, e.sz * 20), Bu(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var r = 0;
  e.vertAlign == "superscript" ? r = 1 : e.vertAlign == "subscript" && (r = 2), t.write_shift(2, r), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), Fi(e.color, t);
  var n = 0;
  return n = 2, t.write_shift(1, n), vr(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
}
var Qd = [
  "none",
  "solid",
  "mediumGray",
  "darkGray",
  "lightGray",
  "darkHorizontal",
  "darkVertical",
  "darkDown",
  "darkUp",
  "darkGrid",
  "darkTrellis",
  "lightHorizontal",
  "lightVertical",
  "lightDown",
  "lightUp",
  "lightGrid",
  "lightTrellis",
  "gray125",
  "gray0625"
], ns, eg = Or;
function Tf(e, t) {
  t || (t = q(4 * 3 + 8 * 7 + 16 * 1)), ns || (ns = Mi(Qd));
  var r = ns[e.patternType];
  r == null && (r = 40), t.write_shift(4, r);
  var n = 0;
  if (r != 40)
    for (Fi({ auto: 1 }, t), Fi({ auto: 1 }, t); n < 12; ++n) t.write_shift(4, 0);
  else {
    for (; n < 4; ++n) t.write_shift(4, 0);
    for (; n < 12; ++n) t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}
function rg(e, t) {
  var r = e.l + t, n = e.read_shift(2), a = e.read_shift(2);
  return e.l = r, { ixfe: n, numFmtId: a };
}
function Io(e, t, r) {
  r || (r = q(16)), r.write_shift(2, t || 0), r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  var n = 0;
  return r.write_shift(1, n), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(1, 0), r;
}
function ga(e, t) {
  return t || (t = q(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var tg = Or;
function ng(e, t) {
  return t || (t = q(51)), t.write_shift(1, 0), ga(null, t), ga(null, t), ga(null, t), ga(null, t), ga(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function ag(e, t) {
  return t || (t = q(12 + 4 * 10)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, 0), t.write_shift(1, 0), Ai(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function ig(e, t, r) {
  var n = q(2052);
  return n.write_shift(4, e), Ai(t, n), Ai(r, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function sg(e, t, r) {
  var n = {};
  n.NumberFmt = [];
  for (var a in Ee) n.NumberFmt[a] = Ee[a];
  n.CellXf = [], n.Fonts = [];
  var i = [], s = !1;
  return Vt(e, function(c, o, l) {
    switch (l) {
      case 44:
        n.NumberFmt[c[0]] = c[1], Pt(c[1], c[0]);
        break;
      case 43:
        n.Fonts.push(c), c.color.theme != null && t && t.themeElements && t.themeElements.clrScheme && (c.color.rgb = Oi(t.themeElements.clrScheme[c.color.theme].rgb, c.color.tint || 0));
        break;
      case 1025:
        break;
      case 45:
        break;
      case 46:
        break;
      case 47:
        i[i.length - 1] == 617 && n.CellXf.push(c);
        break;
      case 48:
      case 507:
      case 572:
      case 475:
        break;
      case 1171:
      case 2102:
      case 1130:
      case 512:
      case 2095:
      case 3072:
        break;
      case 35:
        s = !0;
        break;
      case 36:
        s = !1;
        break;
      case 37:
        i.push(l), s = !0;
        break;
      case 38:
        i.pop(), s = !1;
        break;
      default:
        if (o.T > 0) i.push(l);
        else if (o.T < 0) i.pop();
        else if (!s || r.WTF && i[i.length - 1] != 37) throw new Error("Unexpected record 0x" + l.toString(16));
    }
  }), n;
}
function fg(e, t) {
  if (t) {
    var r = 0;
    [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) t[a] != null && ++r;
    }), r != 0 && (re(e, 615, _t(r)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) t[a] != null && re(e, 44, Jd(a, t[a]));
    }), re(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function cg(e) {
  var t = 1;
  re(e, 611, _t(t)), re(e, 43, Zd({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2
  })), re(
    e,
    612
    /* BrtEndFonts */
  );
}
function og(e) {
  var t = 2;
  re(e, 603, _t(t)), re(e, 45, Tf({ patternType: "none" })), re(e, 45, Tf({ patternType: "gray125" })), re(
    e,
    604
    /* BrtEndFills */
  );
}
function lg(e) {
  var t = 1;
  re(e, 613, _t(t)), re(e, 46, ng()), re(
    e,
    614
    /* BrtEndBorders */
  );
}
function hg(e) {
  var t = 1;
  re(e, 626, _t(t)), re(e, 47, Io({
    numFmtId: 0
  }, 65535)), re(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function ug(e, t) {
  re(e, 617, _t(t.length)), t.forEach(function(r) {
    re(e, 47, Io(r, 0));
  }), re(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function xg(e) {
  var t = 1;
  re(e, 619, _t(t)), re(e, 48, ag({
    xfId: 0,
    name: "Normal"
  })), re(
    e,
    620
    /* BrtEndStyles */
  );
}
function dg(e) {
  var t = 0;
  re(e, 505, _t(t)), re(
    e,
    506
    /* BrtEndDXFs */
  );
}
function gg(e) {
  var t = 0;
  re(e, 508, ig(t, "TableStyleMedium9", "PivotStyleMedium4")), re(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function mg(e, t) {
  var r = Wr();
  return re(
    r,
    278
    /* BrtBeginStyleSheet */
  ), fg(r, e.SSF), cg(r), og(r), lg(r), hg(r), ug(r, t.cellXfs), xg(r), dg(r), gg(r), re(
    r,
    279
    /* BrtEndStyleSheet */
  ), r.end();
}
var pg = [
  "</a:lt1>",
  "</a:dk1>",
  "</a:lt2>",
  "</a:dk2>",
  "</a:accent1>",
  "</a:accent2>",
  "</a:accent3>",
  "</a:accent4>",
  "</a:accent5>",
  "</a:accent6>",
  "</a:hlink>",
  "</a:folHlink>"
];
function vg(e, t, r) {
  t.themeElements.clrScheme = [];
  var n = {};
  (e[0].match(Nr) || []).forEach(function(a) {
    var i = Te(a);
    switch (i[0]) {
      case "<a:clrScheme":
      case "</a:clrScheme>":
        break;
      case "<a:srgbClr":
        n.rgb = i.val;
        break;
      case "<a:sysClr":
        n.rgb = i.lastClr;
        break;
      case "<a:dk1>":
      case "</a:dk1>":
      case "<a:lt1>":
      case "</a:lt1>":
      case "<a:dk2>":
      case "</a:dk2>":
      case "<a:lt2>":
      case "</a:lt2>":
      case "<a:accent1>":
      case "</a:accent1>":
      case "<a:accent2>":
      case "</a:accent2>":
      case "<a:accent3>":
      case "</a:accent3>":
      case "<a:accent4>":
      case "</a:accent4>":
      case "<a:accent5>":
      case "</a:accent5>":
      case "<a:accent6>":
      case "</a:accent6>":
      case "<a:hlink>":
      case "</a:hlink>":
      case "<a:folHlink>":
      case "</a:folHlink>":
        i[0].charAt(1) === "/" ? (t.themeElements.clrScheme[pg.indexOf(i[0])] = n, n = {}) : n.name = i[0].slice(3, i[0].length - 1);
        break;
      default:
        if (r && r.WTF) throw new Error("Unrecognized " + i[0] + " in clrScheme");
    }
  });
}
function wg() {
}
function _g() {
}
var Eg = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/, yg = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/, Tg = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;
function Sg(e, t, r) {
  t.themeElements = {};
  var n;
  [
    /* clrScheme CT_ColorScheme */
    ["clrScheme", Eg, vg],
    /* fontScheme CT_FontScheme */
    ["fontScheme", yg, wg],
    /* fmtScheme CT_StyleMatrix */
    ["fmtScheme", Tg, _g]
  ].forEach(function(a) {
    if (!(n = e.match(a[1]))) throw new Error(a[0] + " not found in themeElements");
    a[2](n, t, r);
  });
}
var kg = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;
function Bo(e, t) {
  (!e || e.length === 0) && (e = i0());
  var r, n = {};
  if (!(r = e.match(kg))) throw new Error("themeElements not found in theme");
  return Sg(r[0], n, t), n.raw = e, n;
}
function i0(e, t) {
  if (t && t.themeXLSX) return t.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var r = [or];
  return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("");
}
function Ag(e, t, r) {
  var n = e.l + t, a = e.read_shift(4);
  if (a !== 124226) {
    if (!r.cellStyles) {
      e.l = n;
      return;
    }
    var i = e.slice(e.l);
    e.l = n;
    var s;
    try {
      s = Sc(i, { type: "array" });
    } catch {
      return;
    }
    var f = Kr(s, "theme/theme/theme1.xml", !0);
    if (f)
      return Bo(f, r);
  }
}
function Fg(e) {
  return e.read_shift(4);
}
function bg(e) {
  var t = {};
  switch (t.xclrType = e.read_shift(2), t.nTintShade = e.read_shift(2), t.xclrType) {
    case 0:
      e.l += 4;
      break;
    case 1:
      t.xclrValue = Cg(e, 4);
      break;
    case 2:
      t.xclrValue = ho(e);
      break;
    case 3:
      t.xclrValue = Fg(e);
      break;
    case 4:
      e.l += 4;
      break;
  }
  return e.l += 8, t;
}
function Cg(e, t) {
  return Or(e, t);
}
function Og(e, t) {
  return Or(e, t);
}
function Ng(e) {
  var t = e.read_shift(2), r = e.read_shift(2) - 4, n = [t];
  switch (t) {
    case 4:
    case 5:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 13:
      n[1] = bg(e);
      break;
    case 6:
      n[1] = Og(e, r);
      break;
    case 14:
    case 15:
      n[1] = e.read_shift(r === 1 ? 1 : 2);
      break;
    default:
      throw new Error("Unrecognized ExtProp type: " + t + " " + r);
  }
  return n;
}
function Ig(e, t) {
  var r = e.l + t;
  e.l += 2;
  var n = e.read_shift(2);
  e.l += 2;
  for (var a = e.read_shift(2), i = []; a-- > 0; ) i.push(Ng(e, r - e.l));
  return { ixfe: n, ext: i };
}
function Bg(e, t) {
  t.forEach(function(r) {
    switch (r[0]) {
    }
  });
}
function Dg(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: Cr(e)
  };
}
function Rg(e) {
  var t = q(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), vr(e.name, t), t.slice(0, t.l);
}
function Lg(e) {
  for (var t = [], r = e.read_shift(4); r-- > 0; )
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function Pg(e) {
  var t = q(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(4, e[r][0]), t.write_shift(4, e[r][1]);
  return t;
}
function Mg(e, t) {
  var r = q(8 + 2 * t.length);
  return r.write_shift(4, e), vr(t, r), r.slice(0, r.l);
}
function Ug(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function Wg(e, t) {
  var r = q(8);
  return r.write_shift(4, e), r.write_shift(4, 1), r;
}
function Hg(e, t, r) {
  var n = { Types: [], Cell: [], Value: [] }, a = r || {}, i = [], s = !1, f = 2;
  return Vt(e, function(c, o, l) {
    switch (l) {
      case 335:
        n.Types.push({ name: c.name });
        break;
      case 51:
        c.forEach(function(h) {
          f == 1 ? n.Cell.push({ type: n.Types[h[0] - 1].name, index: h[1] }) : f == 0 && n.Value.push({ type: n.Types[h[0] - 1].name, index: h[1] });
        });
        break;
      case 337:
        f = c ? 1 : 0;
        break;
      case 338:
        f = 2;
        break;
      case 35:
        i.push(l), s = !0;
        break;
      case 36:
        i.pop(), s = !1;
        break;
      default:
        if (!o.T) {
          if (!s || a.WTF && i[i.length - 1] != 35)
            throw new Error("Unexpected record 0x" + l.toString(16));
        }
    }
  }), n;
}
function Vg() {
  var e = Wr();
  return re(e, 332), re(e, 334, _t(1)), re(e, 335, Rg({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), re(e, 336), re(e, 339, Mg(1, "XLDAPR")), re(e, 52), re(e, 35, _t(514)), re(e, 4096, _t(0)), re(e, 4097, ot(1)), re(e, 36), re(e, 53), re(e, 340), re(e, 337, Wg(1)), re(e, 51, Pg([[1, 0]])), re(e, 338), re(e, 333), e.end();
}
function $g(e, t, r) {
  var n = { Types: [], Cell: [], Value: [] };
  if (!e)
    return n;
  var a = !1, i = 2, s;
  return e.replace(Nr, function(f) {
    var c = Te(f);
    switch (Ft(c[0])) {
      case "<?xml":
        break;
      case "<metadata":
      case "</metadata>":
        break;
      case "<metadataTypes":
      case "</metadataTypes>":
        break;
      case "<metadataType":
        n.Types.push({ name: c.name });
        break;
      case "</metadataType>":
        break;
      case "<futureMetadata":
        for (var o = 0; o < n.Types.length; ++o)
          n.Types[o].name == c.name && (s = n.Types[o]);
        break;
      case "</futureMetadata>":
        break;
      case "<bk>":
        break;
      case "</bk>":
        break;
      case "<rc":
        i == 1 ? n.Cell.push({ type: n.Types[c.t - 1].name, index: +c.v }) : i == 0 && n.Value.push({ type: n.Types[c.t - 1].name, index: +c.v });
        break;
      case "</rc>":
        break;
      case "<cellMetadata":
        i = 1;
        break;
      case "</cellMetadata>":
        i = 2;
        break;
      case "<valueMetadata":
        i = 0;
        break;
      case "</valueMetadata>":
        i = 2;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        a = !0;
        break;
      case "</ext>":
        a = !1;
        break;
      case "<rvb":
        if (!s)
          break;
        s.offsets || (s.offsets = []), s.offsets.push(+c.i);
        break;
      default:
        if (!a && r.WTF)
          throw new Error("unrecognized " + c[0] + " in metadata");
    }
    return f;
  }), n;
}
function Do() {
  var e = [or];
  return e.push(`<metadata xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:xlrd="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" xmlns:xda="http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray">
  <metadataTypes count="1">
    <metadataType name="XLDAPR" minSupportedVersion="120000" copy="1" pasteAll="1" pasteValues="1" merge="1" splitFirst="1" rowColShift="1" clearFormats="1" clearComments="1" assign="1" coerce="1" cellMeta="1"/>
  </metadataTypes>
  <futureMetadata name="XLDAPR" count="1">
    <bk>
      <extLst>
        <ext uri="{bdbb8cdc-fa1e-496e-a857-3c3f30c029c3}">
          <xda:dynamicArrayProperties fDynamic="1" fCollapsed="0"/>
        </ext>
      </extLst>
    </bk>
  </futureMetadata>
  <cellMetadata count="1">
    <bk>
      <rc t="1" v="0"/>
    </bk>
  </cellMetadata>
</metadata>`), e.join("");
}
function zg(e) {
  var t = [];
  if (!e) return t;
  var r = 1;
  return (e.match(Nr) || []).forEach(function(n) {
    var a = Te(n);
    switch (a[0]) {
      case "<?xml":
        break;
      case "<calcChain":
      case "<calcChain>":
      case "</calcChain>":
        break;
      case "<c":
        delete a[0], a.i ? r = a.i : a.i = r, t.push(a);
        break;
    }
  }), t;
}
function Gg(e) {
  var t = {};
  t.i = e.read_shift(4);
  var r = {};
  r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = ye(r);
  var n = e.read_shift(1);
  return n & 2 && (t.l = "1"), n & 8 && (t.a = "1"), t;
}
function Xg(e, t, r) {
  var n = [];
  return Vt(e, function(i, s, f) {
    switch (f) {
      case 63:
        n.push(i);
        break;
      default:
        if (!s.T) throw new Error("Unexpected record 0x" + f.toString(16));
    }
  }), n;
}
function jg(e, t, r, n) {
  if (!e) return e;
  var a = n || {}, i = !1;
  Vt(e, function(f, c, o) {
    switch (o) {
      case 359:
      case 363:
      case 364:
      case 366:
      case 367:
      case 368:
      case 369:
      case 370:
      case 371:
      case 472:
      case 577:
      case 578:
      case 579:
      case 580:
      case 581:
      case 582:
      case 583:
      case 584:
      case 585:
      case 586:
      case 587:
        break;
      case 35:
        i = !0;
        break;
      case 36:
        i = !1;
        break;
      default:
        if (!c.T) {
          if (!i || a.WTF) throw new Error("Unexpected record 0x" + o.toString(16));
        }
    }
  }, a);
}
function Yg(e, t) {
  if (!e) return "??";
  var r = (e.match(/<c:chart [^>]*r:id="([^"]*)"/) || ["", ""])[1];
  return t["!id"][r].Target;
}
var Vn = 1024;
function Ro(e, t) {
  for (var r = [21600, 21600], n = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","), a = [
    oe("xml", null, { "xmlns:v": Xr.v, "xmlns:o": Xr.o, "xmlns:x": Xr.x, "xmlns:mv": Xr.mv }).replace(/\/>/, ">"),
    oe("o:shapelayout", oe("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    oe("v:shapetype", [
      oe("v:stroke", null, { joinstyle: "miter" }),
      oe("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: r.join(","), path: n })
  ]; Vn < e * 1e3; ) Vn += 1e3;
  return t.forEach(function(i) {
    var s = er(i[0]), f = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    f.type == "gradient" && (f.angle = "-180");
    var c = f.type == "gradient" ? oe("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, o = oe("v:fill", c, f), l = { on: "t", obscured: "t" };
    ++Vn, a = a.concat([
      "<v:shape" + La({
        id: "_x0000_s" + Vn,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      o,
      oe("v:shadow", null, l),
      oe("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
      Er("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      Er("x:AutoFill", "False"),
      Er("x:Row", String(s.r)),
      Er("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), a.push("</xml>"), a.join("");
}
function Sf(e, t, r, n) {
  var a = Array.isArray(e), i;
  t.forEach(function(s) {
    var f = er(s.ref);
    if (a ? (e[f.r] || (e[f.r] = []), i = e[f.r][f.c]) : i = e[s.ref], !i) {
      i = { t: "z" }, a ? e[f.r][f.c] = i : e[s.ref] = i;
      var c = Me(e["!ref"] || "BDWGO1000001:A1");
      c.s.r > f.r && (c.s.r = f.r), c.e.r < f.r && (c.e.r = f.r), c.s.c > f.c && (c.s.c = f.c), c.e.c < f.c && (c.e.c = f.c);
      var o = Ae(c);
      o !== e["!ref"] && (e["!ref"] = o);
    }
    i.c || (i.c = []);
    var l = { a: s.author, t: s.t, r: s.r, T: r };
    s.h && (l.h = s.h);
    for (var h = i.c.length - 1; h >= 0; --h) {
      if (!r && i.c[h].T) return;
      r && !i.c[h].T && i.c.splice(h, 1);
    }
    if (r && n) {
      for (h = 0; h < n.length; ++h)
        if (l.a == n[h].id) {
          l.a = n[h].name || l.a;
          break;
        }
    }
    i.c.push(l);
  });
}
function Kg(e, t) {
  if (e.match(/<(?:\w+:)?comments *\/>/)) return [];
  var r = [], n = [], a = e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);
  a && a[1] && a[1].split(/<\/\w*:?author>/).forEach(function(s) {
    if (!(s === "" || s.trim() === "")) {
      var f = s.match(/<(?:\w+:)?author[^>]*>(.*)/);
      f && r.push(f[1]);
    }
  });
  var i = e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);
  return i && i[1] && i[1].split(/<\/\w*:?comment>/).forEach(function(s) {
    if (!(s === "" || s.trim() === "")) {
      var f = s.match(/<(?:\w+:)?comment[^>]*>/);
      if (f) {
        var c = Te(f[0]), o = { author: c.authorId && r[c.authorId] || "sheetjsghost", ref: c.ref, guid: c.guid }, l = er(c.ref);
        if (!(t.sheetRows && t.sheetRows <= l.r)) {
          var h = s.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/), u = !!h && !!h[1] && t0(h[1]) || { r: "", t: "", h: "" };
          o.r = u.r, u.r == "<t></t>" && (u.t = u.h = ""), o.t = (u.t || "").replace(/\r\n/g, `
`).replace(/\r/g, `
`), t.cellHTML && (o.h = u.h), n.push(o);
        }
      }
    }
  }), n;
}
function Lo(e) {
  var t = [or, oe("comments", null, { xmlns: Fn[0] })], r = [];
  return t.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = $e(a.a);
      r.indexOf(i) == -1 && (r.push(i), t.push("<author>" + i + "</author>")), a.T && a.ID && r.indexOf("tc=" + a.ID) == -1 && (r.push("tc=" + a.ID), t.push("<author>tc=" + a.ID + "</author>"));
    });
  }), r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = r.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(c) {
      c.a && (a = r.indexOf($e(c.a))), i.push(c.t || "");
    }), t.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1) t.push(Er("t", $e(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f) s += `Reply:
    ` + i[f] + `
`;
      t.push(Er("t", $e(s)));
    }
    t.push("</text></comment>");
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Jg(e, t) {
  var r = [], n = !1, a = {}, i = 0;
  return e.replace(Nr, function(f, c) {
    var o = Te(f);
    switch (Ft(o[0])) {
      case "<?xml":
        break;
      case "<ThreadedComments":
        break;
      case "</ThreadedComments>":
        break;
      case "<threadedComment":
        a = { author: o.personId, guid: o.id, ref: o.ref, T: 1 };
        break;
      case "</threadedComment>":
        a.t != null && r.push(a);
        break;
      case "<text>":
      case "<text":
        i = c + f.length;
        break;
      case "</text>":
        a.t = e.slice(i, c).replace(/\r\n/g, `
`).replace(/\r/g, `
`);
        break;
      case "<mentions":
      case "<mentions>":
        n = !0;
        break;
      case "</mentions>":
        n = !1;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        n = !0;
        break;
      case "</ext>":
        n = !1;
        break;
      default:
        if (!n && t.WTF) throw new Error("unrecognized " + o[0] + " in threaded comments");
    }
    return f;
  }), r;
}
function qg(e, t, r) {
  var n = [or, oe("ThreadedComments", null, { xmlns: dr.TCMNT }).replace(/[\/]>/, ">")];
  return e.forEach(function(a) {
    var i = "";
    (a[1] || []).forEach(function(s, f) {
      if (!s.T) {
        delete s.ID;
        return;
      }
      s.a && t.indexOf(s.a) == -1 && t.push(s.a);
      var c = {
        ref: a[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + r.tcid++).slice(-12) + "}"
      };
      f == 0 ? i = c.id : c.parentId = i, s.ID = c.id, s.a && (c.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(s.a)).slice(-12) + "}"), n.push(oe("threadedComment", Er("text", s.t || ""), c));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function Zg(e, t) {
  var r = [], n = !1;
  return e.replace(Nr, function(i) {
    var s = Te(i);
    switch (Ft(s[0])) {
      case "<?xml":
        break;
      case "<personList":
        break;
      case "</personList>":
        break;
      case "<person":
        r.push({ name: s.displayname, id: s.id });
        break;
      case "</person>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        n = !0;
        break;
      case "</ext>":
        n = !1;
        break;
      default:
        if (!n && t.WTF) throw new Error("unrecognized " + s[0] + " in threaded comments");
    }
    return i;
  }), r;
}
function Qg(e) {
  var t = [or, oe("personList", null, {
    xmlns: dr.TCMNT,
    "xmlns:x": Fn[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(r, n) {
    t.push(oe("person", null, {
      displayName: r,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + n).slice(-12) + "}",
      userId: r,
      providerId: "None"
    }));
  }), t.push("</personList>"), t.join("");
}
function em(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var r = Nn(e);
  return t.rfx = r.s, t.ref = ye(r.s), e.l += 16, t;
}
function rm(e, t) {
  return t == null && (t = q(36)), t.write_shift(4, e[1].iauthor), aa(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var tm = Cr;
function nm(e) {
  return vr(e.slice(0, 54));
}
function am(e, t) {
  var r = [], n = [], a = {}, i = !1;
  return Vt(e, function(f, c, o) {
    switch (o) {
      case 632:
        n.push(f);
        break;
      case 635:
        a = f;
        break;
      case 637:
        a.t = f.t, a.h = f.h, a.r = f.r;
        break;
      case 636:
        if (a.author = n[a.iauthor], delete a.iauthor, t.sheetRows && a.rfx && t.sheetRows <= a.rfx.r) break;
        a.t || (a.t = ""), delete a.rfx, r.push(a);
        break;
      case 3072:
        break;
      case 35:
        i = !0;
        break;
      case 36:
        i = !1;
        break;
      case 37:
        break;
      case 38:
        break;
      default:
        if (!c.T) {
          if (!i || t.WTF) throw new Error("Unexpected record 0x" + o.toString(16));
        }
    }
  }), r;
}
function im(e) {
  var t = Wr(), r = [];
  return re(
    t,
    628
    /* BrtBeginComments */
  ), re(
    t,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      r.indexOf(a.a) > -1 || (r.push(a.a.slice(0, 54)), re(t, 632, nm(a.a)));
    });
  }), re(
    t,
    631
    /* BrtEndCommentAuthors */
  ), re(
    t,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      a.iauthor = r.indexOf(a.a);
      var i = { s: er(n[0]), e: er(n[0]) };
      re(t, 635, rm([i, a])), a.t && a.t.length > 0 && re(t, 637, Fu(a)), re(
        t,
        636
        /* BrtEndComment */
      ), delete a.iauthor;
    });
  }), re(
    t,
    634
    /* BrtEndCommentList */
  ), re(
    t,
    629
    /* BrtEndComments */
  ), t.end();
}
var sm = "application/vnd.ms-office.vbaProject";
function fm(e) {
  var t = ve.utils.cfb_new({ root: "R" });
  return e.FullPaths.forEach(function(r, n) {
    if (!(r.slice(-1) === "/" || !r.match(/_VBA_PROJECT_CUR/))) {
      var a = r.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
      ve.utils.cfb_add(t, a, e.FileIndex[n].content);
    }
  }), ve.write(t);
}
function cm(e, t) {
  t.FullPaths.forEach(function(r, n) {
    if (n != 0) {
      var a = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && ve.utils.cfb_add(e, a, t.FileIndex[n].content);
    }
  });
}
var Po = ["xlsb", "xlsm", "xlam", "biff8", "xla"];
function om() {
  return { "!type": "dialog" };
}
function lm() {
  return { "!type": "dialog" };
}
function hm() {
  return { "!type": "macro" };
}
function um() {
  return { "!type": "macro" };
}
var jn = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function r(n, a, i, s) {
    var f = !1, c = !1;
    i.length == 0 ? c = !0 : i.charAt(0) == "[" && (c = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
    var o = i.length > 0 ? parseInt(i, 10) | 0 : 0, l = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return f ? l += t.c : --l, c ? o += t.r : --o, a + (f ? "" : "$") + Qe(l) + (c ? "" : "$") + cr(o);
  }
  return function(a, i) {
    return t = i, a.replace(e, r);
  };
}(), s0 = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, f0 = /* @__PURE__ */ function() {
  return function(t, r) {
    return t.replace(s0, function(n, a, i, s, f, c) {
      var o = js(s) - (i ? 0 : r.c), l = Xs(c) - (f ? 0 : r.r), h = l == 0 ? "" : f ? l + 1 : "[" + l + "]", u = o == 0 ? "" : i ? o + 1 : "[" + o + "]";
      return a + "R" + h + "C" + u;
    });
  };
}();
function Mo(e, t) {
  return e.replace(s0, function(r, n, a, i, s, f) {
    return n + (a == "$" ? a + i : Qe(js(i) + t.c)) + (s == "$" ? s + f : cr(Xs(f) + t.r));
  });
}
function xm(e, t, r) {
  var n = Hr(t), a = n.s, i = er(r), s = { r: i.r - a.r, c: i.c - a.c };
  return Mo(e, s);
}
function dm(e) {
  return e.length != 1;
}
function kf(e) {
  return e.replace(/_xlfn\./g, "");
}
function lr(e) {
  e.l += 1;
}
function tn(e, t) {
  var r = e.read_shift(2);
  return [r & 16383, r >> 14 & 1, r >> 15 & 1];
}
function Uo(e, t, r) {
  var n = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return Wo(e);
    r.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = tn(e), f = tn(e);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: f[0], cRel: f[1], rRel: f[2] } };
}
function Wo(e) {
  var t = tn(e), r = tn(e), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: t[0], c: n, cRel: t[1], rRel: t[2] }, e: { r: r[0], c: a, cRel: r[1], rRel: r[2] } };
}
function gm(e, t, r) {
  if (r.biff < 8) return Wo(e);
  var n = e.read_shift(r.biff == 12 ? 4 : 2), a = e.read_shift(r.biff == 12 ? 4 : 2), i = tn(e), s = tn(e);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function Ho(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5) return mm(e);
  var n = e.read_shift(r && r.biff == 12 ? 4 : 2), a = tn(e);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function mm(e) {
  var t = tn(e), r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function pm(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return { r: t, c: r & 255, fQuoted: !!(r & 16384), cRel: r >> 15, rRel: r >> 15 };
}
function vm(e, t, r) {
  var n = r && r.biff ? r.biff : 8;
  if (n >= 2 && n <= 5) return wm(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, f = (i & 32768) >> 15;
  if (i &= 16383, f == 1) for (; a > 524287; ) a -= 1048576;
  if (s == 1) for (; i > 8191; ) i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: f };
}
function wm(e) {
  var t = e.read_shift(2), r = e.read_shift(1), n = (t & 32768) >> 15, a = (t & 16384) >> 14;
  return t &= 16383, n == 1 && t >= 8192 && (t = t - 16384), a == 1 && r >= 128 && (r = r - 256), { r: t, c: r, cRel: a, rRel: n };
}
function _m(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = Uo(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
  return [n, a];
}
function Em(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2, "i"), i = 8;
  if (r) switch (r.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  var s = Uo(e, i, r);
  return [n, a, s];
}
function ym(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8, [n];
}
function Tm(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2), i = 8;
  if (r) switch (r.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  return e.l += i, [n, a];
}
function Sm(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = gm(e, t - 1, r);
  return [n, a];
}
function km(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7, [n];
}
function Af(e) {
  var t = e[e.l + 1] & 1, r = 1;
  return e.l += 4, [t, r];
}
function Am(e, t, r) {
  e.l += 2;
  for (var n = e.read_shift(r && r.biff == 2 ? 1 : 2), a = [], i = 0; i <= n; ++i) a.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
  return a;
}
function Fm(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function bm(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Cm(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}
function Om(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += r && r.biff == 2 ? 3 : 4, [n];
}
function Vo(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return [t, r];
}
function Nm(e) {
  return e.read_shift(2), Vo(e);
}
function Im(e) {
  return e.read_shift(2), Vo(e);
}
function Bm(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Ho(e, 0, r);
  return [n, a];
}
function Dm(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = vm(e, 0, r);
  return [n, a];
}
function Rm(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var i = Ho(e, 0, r);
  return [n, a, i];
}
function Lm(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [Up[a], Go[a], n];
}
function Pm(e, t, r) {
  var n = e[e.l++], a = e.read_shift(1), i = r && r.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : Mm(e);
  return [a, (i[0] === 0 ? Go : Mp)[i[1]]];
}
function Mm(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function Um(e, t, r) {
  e.l += r && r.biff == 2 ? 3 : 4;
}
function Wm(e, t, r) {
  if (e.l++, r && r.biff == 12) return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function Hm(e) {
  return e.l++, $t[e.read_shift(1)];
}
function Vm(e) {
  return e.l++, e.read_shift(2);
}
function $m(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function zm(e) {
  return e.l++, br(e);
}
function Gm(e, t, r) {
  return e.l++, Ka(e, t - 1, r);
}
function Xm(e, t) {
  var r = [e.read_shift(1)];
  if (t == 12) switch (r[0]) {
    case 2:
      r[0] = 4;
      break;
    case 4:
      r[0] = 16;
      break;
    case 0:
      r[0] = 1;
      break;
    case 1:
      r[0] = 2;
      break;
  }
  switch (r[0]) {
    case 4:
      r[1] = sr(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      r[1] = $t[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = br(e);
      break;
    case 2:
      r[1] = In(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + r[0]);
  }
  return r;
}
function jm(e, t, r) {
  for (var n = e.read_shift(r.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i) a.push((r.biff == 12 ? Nn : Hi)(e));
  return a;
}
function Ym(e, t, r) {
  var n = 0, a = 0;
  r.biff == 12 ? (n = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), r.biff >= 2 && r.biff < 8 && (--n, --a == 0 && (a = 256));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var f = 0; f != a; ++f) s[i][f] = Xm(e, r.biff);
  return s;
}
function Km(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = !r || r.biff >= 8 ? 4 : 2, i = e.read_shift(a);
  switch (r.biff) {
    case 2:
      e.l += 5;
      break;
    case 3:
    case 4:
      e.l += 8;
      break;
    case 5:
      e.l += 12;
      break;
  }
  return [n, 0, i];
}
function Jm(e, t, r) {
  if (r.biff == 5) return qm(e);
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(2), i = e.read_shift(4);
  return [n, a, i];
}
function qm(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [t, r, n];
}
function Zm(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += r && r.biff == 2 ? 3 : 4;
  var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function Qm(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function ep(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [n];
}
function rp(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2), i = 4;
  if (r) switch (r.biff) {
    case 5:
      i = 15;
      break;
    case 12:
      i = 6;
      break;
  }
  return e.l += i, [n, a];
}
var tp = Or, np = Or, ap = Or;
function qa(e, t, r) {
  return e.l += 2, [pm(e)];
}
function c0(e) {
  return e.l += 6, [];
}
var ip = qa, sp = c0, fp = c0, cp = qa;
function $o(e) {
  return e.l += 2, [ur(e), e.read_shift(2) & 1];
}
var op = qa, lp = $o, hp = c0, up = qa, xp = qa, dp = [
  "Data",
  "All",
  "Headers",
  "??",
  "?Data2",
  "??",
  "?DataHeaders",
  "??",
  "Totals",
  "??",
  "??",
  "??",
  "?DataTotals",
  "??",
  "??",
  "??",
  "?Current"
];
function gp(e) {
  e.l += 2;
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(4), a = e.read_shift(2), i = e.read_shift(2), s = dp[r >> 2 & 31];
  return { ixti: t, coltype: r & 3, rt: s, idx: n, c: a, C: i };
}
function mp(e) {
  return e.l += 2, [e.read_shift(4)];
}
function pp(e, t, r) {
  return e.l += 5, e.l += 2, e.l += r.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function vp(e, t, r) {
  return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function wp(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function _p(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function Ep(e) {
  return e.l += 4, [0, 0];
}
var Ff = {
  /*::[*/
  1: { n: "PtgExp", f: Wm },
  /*::[*/
  2: { n: "PtgTbl", f: ap },
  /*::[*/
  3: { n: "PtgAdd", f: lr },
  /*::[*/
  4: { n: "PtgSub", f: lr },
  /*::[*/
  5: { n: "PtgMul", f: lr },
  /*::[*/
  6: { n: "PtgDiv", f: lr },
  /*::[*/
  7: { n: "PtgPower", f: lr },
  /*::[*/
  8: { n: "PtgConcat", f: lr },
  /*::[*/
  9: { n: "PtgLt", f: lr },
  /*::[*/
  10: { n: "PtgLe", f: lr },
  /*::[*/
  11: { n: "PtgEq", f: lr },
  /*::[*/
  12: { n: "PtgGe", f: lr },
  /*::[*/
  13: { n: "PtgGt", f: lr },
  /*::[*/
  14: { n: "PtgNe", f: lr },
  /*::[*/
  15: { n: "PtgIsect", f: lr },
  /*::[*/
  16: { n: "PtgUnion", f: lr },
  /*::[*/
  17: { n: "PtgRange", f: lr },
  /*::[*/
  18: { n: "PtgUplus", f: lr },
  /*::[*/
  19: { n: "PtgUminus", f: lr },
  /*::[*/
  20: { n: "PtgPercent", f: lr },
  /*::[*/
  21: { n: "PtgParen", f: lr },
  /*::[*/
  22: { n: "PtgMissArg", f: lr },
  /*::[*/
  23: { n: "PtgStr", f: Gm },
  /*::[*/
  26: { n: "PtgSheet", f: pp },
  /*::[*/
  27: { n: "PtgEndSheet", f: vp },
  /*::[*/
  28: { n: "PtgErr", f: Hm },
  /*::[*/
  29: { n: "PtgBool", f: $m },
  /*::[*/
  30: { n: "PtgInt", f: Vm },
  /*::[*/
  31: { n: "PtgNum", f: zm },
  /*::[*/
  32: { n: "PtgArray", f: km },
  /*::[*/
  33: { n: "PtgFunc", f: Lm },
  /*::[*/
  34: { n: "PtgFuncVar", f: Pm },
  /*::[*/
  35: { n: "PtgName", f: Km },
  /*::[*/
  36: { n: "PtgRef", f: Bm },
  /*::[*/
  37: { n: "PtgArea", f: _m },
  /*::[*/
  38: { n: "PtgMemArea", f: Zm },
  /*::[*/
  39: { n: "PtgMemErr", f: tp },
  /*::[*/
  40: { n: "PtgMemNoMem", f: np },
  /*::[*/
  41: { n: "PtgMemFunc", f: Qm },
  /*::[*/
  42: { n: "PtgRefErr", f: ep },
  /*::[*/
  43: { n: "PtgAreaErr", f: ym },
  /*::[*/
  44: { n: "PtgRefN", f: Dm },
  /*::[*/
  45: { n: "PtgAreaN", f: Sm },
  /*::[*/
  46: { n: "PtgMemAreaN", f: wp },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: _p },
  /*::[*/
  57: { n: "PtgNameX", f: Jm },
  /*::[*/
  58: { n: "PtgRef3d", f: Rm },
  /*::[*/
  59: { n: "PtgArea3d", f: Em },
  /*::[*/
  60: { n: "PtgRefErr3d", f: rp },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: Tm },
  /*::[*/
  255: {}
}, yp = {
  /*::[*/
  64: 32,
  /*::[*/
  96: 32,
  /*::[*/
  65: 33,
  /*::[*/
  97: 33,
  /*::[*/
  66: 34,
  /*::[*/
  98: 34,
  /*::[*/
  67: 35,
  /*::[*/
  99: 35,
  /*::[*/
  68: 36,
  /*::[*/
  100: 36,
  /*::[*/
  69: 37,
  /*::[*/
  101: 37,
  /*::[*/
  70: 38,
  /*::[*/
  102: 38,
  /*::[*/
  71: 39,
  /*::[*/
  103: 39,
  /*::[*/
  72: 40,
  /*::[*/
  104: 40,
  /*::[*/
  73: 41,
  /*::[*/
  105: 41,
  /*::[*/
  74: 42,
  /*::[*/
  106: 42,
  /*::[*/
  75: 43,
  /*::[*/
  107: 43,
  /*::[*/
  76: 44,
  /*::[*/
  108: 44,
  /*::[*/
  77: 45,
  /*::[*/
  109: 45,
  /*::[*/
  78: 46,
  /*::[*/
  110: 46,
  /*::[*/
  79: 47,
  /*::[*/
  111: 47,
  /*::[*/
  88: 34,
  /*::[*/
  120: 34,
  /*::[*/
  89: 57,
  /*::[*/
  121: 57,
  /*::[*/
  90: 58,
  /*::[*/
  122: 58,
  /*::[*/
  91: 59,
  /*::[*/
  123: 59,
  /*::[*/
  92: 60,
  /*::[*/
  124: 60,
  /*::[*/
  93: 61,
  /*::[*/
  125: 61
}, Tp = {
  /*::[*/
  1: { n: "PtgElfLel", f: $o },
  /*::[*/
  2: { n: "PtgElfRw", f: up },
  /*::[*/
  3: { n: "PtgElfCol", f: ip },
  /*::[*/
  6: { n: "PtgElfRwV", f: xp },
  /*::[*/
  7: { n: "PtgElfColV", f: cp },
  /*::[*/
  10: { n: "PtgElfRadical", f: op },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: hp },
  /*::[*/
  13: { n: "PtgElfColS", f: sp },
  /*::[*/
  15: { n: "PtgElfColSV", f: fp },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: lp },
  /*::[*/
  25: { n: "PtgList", f: gp },
  /*::[*/
  29: { n: "PtgSxName", f: mp },
  /*::[*/
  255: {}
}, Sp = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: Ep },
  /*::[*/
  1: { n: "PtgAttrSemi", f: Om },
  /*::[*/
  2: { n: "PtgAttrIf", f: bm },
  /*::[*/
  4: { n: "PtgAttrChoose", f: Am },
  /*::[*/
  8: { n: "PtgAttrGoto", f: Fm },
  /*::[*/
  16: { n: "PtgAttrSum", f: Um },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: Af },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: Af },
  /*::[*/
  64: { n: "PtgAttrSpace", f: Nm },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: Im },
  /*::[*/
  128: { n: "PtgAttrIfError", f: Cm },
  /*::[*/
  255: {}
};
function Za(e, t, r, n) {
  if (n.biff < 8) return Or(e, t);
  for (var a = e.l + t, i = [], s = 0; s !== r.length; ++s)
    switch (r[s][0]) {
      case "PtgArray":
        r[s][1] = Ym(e, 0, n), i.push(r[s][1]);
        break;
      case "PtgMemArea":
        r[s][2] = jm(e, r[s][1], n), i.push(r[s][2]);
        break;
      case "PtgExp":
        n && n.biff == 12 && (r[s][1][1] = e.read_shift(4), i.push(r[s][1]));
        break;
      case "PtgList":
      case "PtgElfRadicalS":
      case "PtgElfColS":
      case "PtgElfColSV":
        throw "Unsupported " + r[s][0];
    }
  return t = a - e.l, t !== 0 && i.push(Or(e, t)), i;
}
function Qa(e, t, r) {
  for (var n = e.l + t, a, i, s = []; n != e.l; )
    t = n - e.l, i = e[e.l], a = Ff[i] || Ff[yp[i]], (i === 24 || i === 25) && (a = (i === 24 ? Tp : Sp)[e[e.l + 1]]), !a || !a.f ? Or(e, t) : s.push([a.n, a.f(e, t, r)]);
  return s;
}
function kp(e) {
  for (var t = [], r = 0; r < e.length; ++r) {
    for (var n = e[r], a = [], i = 0; i < n.length; ++i) {
      var s = n[i];
      if (s) switch (s[0]) {
        case 2:
          a.push('"' + s[1].replace(/"/g, '""') + '"');
          break;
        default:
          a.push(s[1]);
      }
      else a.push("");
    }
    t.push(a.join(","));
  }
  return t.join(";");
}
var Ap = {
  PtgAdd: "+",
  PtgConcat: "&",
  PtgDiv: "/",
  PtgEq: "=",
  PtgGe: ">=",
  PtgGt: ">",
  PtgLe: "<=",
  PtgLt: "<",
  PtgMul: "*",
  PtgNe: "<>",
  PtgPower: "^",
  PtgSub: "-"
};
function Fp(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function zo(e, t, r) {
  if (!e) return "SH33TJSERR0";
  if (r.biff > 8 && (!e.XTI || !e.XTI[t])) return e.SheetNames[t];
  if (!e.XTI) return "SH33TJSERR6";
  var n = e.XTI[t];
  if (r.biff < 8)
    return t > 1e4 && (t -= 65536), t < 0 && (t = -t), t == 0 ? "" : e.XTI[t - 1];
  if (!n) return "SH33TJSERR1";
  var a = "";
  if (r.biff > 8) switch (e[n[0]][0]) {
    case 357:
      return a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]], n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]];
    case 358:
      return r.SID != null ? e.SheetNames[r.SID] : "SH33TJSSAME" + e[n[0]][0];
    case 355:
    default:
      return "SH33TJSSRC" + e[n[0]][0];
  }
  switch (e[n[0]][0][0]) {
    case 1025:
      return a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]] || "SH33TJSERR3", n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]];
    case 14849:
      return e[n[0]].slice(1).map(function(i) {
        return i.Name;
      }).join(";;");
    default:
      return e[n[0]][0][3] ? (a = n[1] == -1 ? "#REF" : e[n[0]][0][3][n[1]] || "SH33TJSERR4", n[1] == n[2] ? a : a + ":" + e[n[0]][0][3][n[2]]) : "SH33TJSERR2";
  }
}
function bf(e, t, r) {
  var n = zo(e, t, r);
  return n == "#REF" ? n : Fp(n, r);
}
function Ar(e, t, r, n, a) {
  var i = a && a.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 } }
  ), f = [], c, o, l, h = 0, u = 0, x, g = "";
  if (!e[0] || !e[0][0]) return "";
  for (var d = -1, m = "", w = 0, y = e[0].length; w < y; ++w) {
    var v = e[0][w];
    switch (v[0]) {
      case "PtgUminus":
        f.push("-" + f.pop());
        break;
      case "PtgUplus":
        f.push("+" + f.pop());
        break;
      case "PtgPercent":
        f.push(f.pop() + "%");
        break;
      case "PtgAdd":
      case "PtgConcat":
      case "PtgDiv":
      case "PtgEq":
      case "PtgGe":
      case "PtgGt":
      case "PtgLe":
      case "PtgLt":
      case "PtgMul":
      case "PtgNe":
      case "PtgPower":
      case "PtgSub":
        if (c = f.pop(), o = f.pop(), d >= 0) {
          switch (e[0][d][1][0]) {
            case 0:
              m = rr(" ", e[0][d][1][1]);
              break;
            case 1:
              m = rr("\r", e[0][d][1][1]);
              break;
            default:
              if (m = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][d][1][0]);
          }
          o = o + m, d = -1;
        }
        f.push(o + Ap[v[0]] + c);
        break;
      case "PtgIsect":
        c = f.pop(), o = f.pop(), f.push(o + " " + c);
        break;
      case "PtgUnion":
        c = f.pop(), o = f.pop(), f.push(o + "," + c);
        break;
      case "PtgRange":
        c = f.pop(), o = f.pop(), f.push(o + ":" + c);
        break;
      case "PtgAttrChoose":
        break;
      case "PtgAttrGoto":
        break;
      case "PtgAttrIf":
        break;
      case "PtgAttrIfError":
        break;
      case "PtgRef":
        l = Ta(v[1][1], s, a), f.push(Sa(l, i));
        break;
      case "PtgRefN":
        l = r ? Ta(v[1][1], r, a) : v[1][1], f.push(Sa(l, i));
        break;
      case "PtgRef3d":
        h = /*::Number(*/
        v[1][1], l = Ta(v[1][2], s, a), g = bf(n, h, a), f.push(g + "!" + Sa(l, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var I = v[1][0], T = v[1][1];
        I || (I = 0), I &= 127;
        var N = I == 0 ? [] : f.slice(-I);
        f.length -= I, T === "User" && (T = N.shift()), f.push(T + "(" + N.join(",") + ")");
        break;
      case "PtgBool":
        f.push(v[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        f.push(
          /*::String(*/
          v[1]
          /*::)*/
        );
        break;
      case "PtgNum":
        f.push(String(v[1]));
        break;
      case "PtgStr":
        f.push('"' + v[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        f.push(
          /*::String(*/
          v[1]
          /*::)*/
        );
        break;
      case "PtgAreaN":
        x = tf(v[1][1], r ? { s: r } : s, a), f.push(Qi(x, a));
        break;
      case "PtgArea":
        x = tf(v[1][1], s, a), f.push(Qi(x, a));
        break;
      case "PtgArea3d":
        h = /*::Number(*/
        v[1][1], x = v[1][2], g = bf(n, h, a), f.push(g + "!" + Qi(x, a));
        break;
      case "PtgAttrSum":
        f.push("SUM(" + f.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        u = v[1][2];
        var k = (n.names || [])[u - 1] || (n[0] || [])[u], U = k ? k.Name : "SH33TJSNAME" + String(u);
        U && U.slice(0, 6) == "_xlfn." && !a.xlfn && (U = U.slice(6)), f.push(U);
        break;
      case "PtgNameX":
        var C = v[1][1];
        u = v[1][2];
        var D;
        if (a.biff <= 5)
          C < 0 && (C = -C), n[C] && (D = n[C][u]);
        else {
          var M = "";
          if (((n[C] || [])[0] || [])[0] == 14849 || (((n[C] || [])[0] || [])[0] == 1025 ? n[C][u] && n[C][u].itab > 0 && (M = n.SheetNames[n[C][u].itab - 1] + "!") : M = n.SheetNames[u - 1] + "!"), n[C] && n[C][u]) M += n[C][u].Name;
          else if (n[0] && n[0][u]) M += n[0][u].Name;
          else {
            var B = (zo(n, C, a) || "").split(";;");
            B[u - 1] ? M = B[u - 1] : M += "SH33TJSERRX";
          }
          f.push(M);
          break;
        }
        D || (D = { Name: "SH33TJSERRY" }), f.push(D.Name);
        break;
      case "PtgParen":
        var Y = "(", he = ")";
        if (d >= 0) {
          switch (m = "", e[0][d][1][0]) {
            case 2:
              Y = rr(" ", e[0][d][1][1]) + Y;
              break;
            case 3:
              Y = rr("\r", e[0][d][1][1]) + Y;
              break;
            case 4:
              he = rr(" ", e[0][d][1][1]) + he;
              break;
            case 5:
              he = rr("\r", e[0][d][1][1]) + he;
              break;
            default:
              if (a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][d][1][0]);
          }
          d = -1;
        }
        f.push(Y + f.pop() + he);
        break;
      case "PtgRefErr":
        f.push("#REF!");
        break;
      case "PtgRefErr3d":
        f.push("#REF!");
        break;
      case "PtgExp":
        l = { c: v[1][1], r: v[1][0] };
        var W = { c: r.c, r: r.r };
        if (n.sharedf[ye(l)]) {
          var ee = n.sharedf[ye(l)];
          f.push(Ar(ee, s, W, n, a));
        } else {
          var ne = !1;
          for (c = 0; c != n.arrayf.length; ++c)
            if (o = n.arrayf[c], !(l.c < o[0].s.c || l.c > o[0].e.c) && !(l.r < o[0].s.r || l.r > o[0].e.r)) {
              f.push(Ar(o[1], s, W, n, a)), ne = !0;
              break;
            }
          ne || f.push(
            /*::String(*/
            v[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        f.push("{" + kp(
          /*::(*/
          v[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        d = w;
        break;
      case "PtgTbl":
        break;
      case "PtgMemErr":
        break;
      case "PtgMissArg":
        f.push("");
        break;
      case "PtgAreaErr":
        f.push("#REF!");
        break;
      case "PtgAreaErr3d":
        f.push("#REF!");
        break;
      case "PtgList":
        f.push("Table" + v[1].idx + "[#" + v[1].rt + "]");
        break;
      case "PtgMemAreaN":
      case "PtgMemNoMemN":
      case "PtgAttrNoop":
      case "PtgSheet":
      case "PtgEndSheet":
        break;
      case "PtgMemFunc":
        break;
      case "PtgMemNoMem":
        break;
      case "PtgElfCol":
      case "PtgElfColS":
      case "PtgElfColSV":
      case "PtgElfColV":
      case "PtgElfLel":
      case "PtgElfRadical":
      case "PtgElfRadicalLel":
      case "PtgElfRadicalS":
      case "PtgElfRw":
      case "PtgElfRwV":
        throw new Error("Unsupported ELFs");
      case "PtgSxName":
        throw new Error("Unrecognized Formula Token: " + String(v));
      default:
        throw new Error("Unrecognized Formula Token: " + String(v));
    }
    var De = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && d >= 0 && De.indexOf(e[0][w][0]) == -1) {
      v = e[0][d];
      var H = !0;
      switch (v[1][0]) {
        case 4:
          H = !1;
        case 0:
          m = rr(" ", v[1][1]);
          break;
        case 5:
          H = !1;
        case 1:
          m = rr("\r", v[1][1]);
          break;
        default:
          if (m = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + v[1][0]);
      }
      f.push((H ? m : "") + f.pop() + (H ? "" : m)), d = -1;
    }
  }
  if (f.length > 1 && a.WTF) throw new Error("bad formula stack");
  return f[0];
}
function bp(e, t, r) {
  var n = e.l + t, a = r.biff == 2 ? 1 : 2, i, s = e.read_shift(a);
  if (s == 65535) return [[], Or(e, t - 2)];
  var f = Qa(e, s, r);
  return t !== s + a && (i = Za(e, t - s - a, f, r)), e.l = n, [f, i];
}
function Cp(e, t, r) {
  var n = e.l + t, a = r.biff == 2 ? 1 : 2, i, s = e.read_shift(a);
  if (s == 65535) return [[], Or(e, t - 2)];
  var f = Qa(e, s, r);
  return t !== s + a && (i = Za(e, t - s - a, f, r)), e.l = n, [f, i];
}
function Op(e, t, r, n) {
  var a = e.l + t, i = Qa(e, n, r), s;
  return a !== e.l && (s = Za(e, a - e.l, i, r)), [i, s];
}
function Np(e, t, r) {
  var n = e.l + t, a, i = e.read_shift(2), s = Qa(e, i, r);
  return i == 65535 ? [[], Or(e, t - 2)] : (t !== i + 2 && (a = Za(e, n - i - 2, s, r)), [s, a]);
}
function Ip(e) {
  var t;
  if (Rt(e, e.l + 6) !== 65535) return [br(e), "n"];
  switch (e[e.l]) {
    case 0:
      return e.l += 8, ["String", "s"];
    case 1:
      return t = e[e.l + 2] === 1, e.l += 8, [t, "b"];
    case 2:
      return t = e[e.l + 2], e.l += 8, [t, "e"];
    case 3:
      return e.l += 8, ["", "s"];
  }
  return [];
}
function Bp(e) {
  if (e == null) {
    var t = q(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number") return yn(e);
  return yn(0);
}
function as(e, t, r) {
  var n = e.l + t, a = bt(e);
  r.biff == 2 && ++e.l;
  var i = Ip(e), s = e.read_shift(1);
  r.biff != 2 && (e.read_shift(1), r.biff >= 5 && e.read_shift(4));
  var f = Cp(e, n - e.l, r);
  return { cell: a, val: i[0], formula: f, shared: s >> 3 & 1, tt: i[1] };
}
function Dp(e, t, r, n, a) {
  var i = Sn(t, r, a), s = Bp(e.v), f = q(6), c = 33;
  f.write_shift(2, c), f.write_shift(4, 0);
  for (var o = q(e.bf.length), l = 0; l < e.bf.length; ++l) o[l] = e.bf[l];
  var h = pr([i, s, f, o]);
  return h;
}
function Vi(e, t, r) {
  var n = e.read_shift(4), a = Qa(e, n, r), i = e.read_shift(4), s = i > 0 ? Za(e, i, a, r) : null;
  return [a, s];
}
var Rp = Vi, $i = Vi, Lp = Vi, Pp = Vi, Mp = {
  0: "BEEP",
  1: "OPEN",
  2: "OPEN.LINKS",
  3: "CLOSE.ALL",
  4: "SAVE",
  5: "SAVE.AS",
  6: "FILE.DELETE",
  7: "PAGE.SETUP",
  8: "PRINT",
  9: "PRINTER.SETUP",
  10: "QUIT",
  11: "NEW.WINDOW",
  12: "ARRANGE.ALL",
  13: "WINDOW.SIZE",
  14: "WINDOW.MOVE",
  15: "FULL",
  16: "CLOSE",
  17: "RUN",
  22: "SET.PRINT.AREA",
  23: "SET.PRINT.TITLES",
  24: "SET.PAGE.BREAK",
  25: "REMOVE.PAGE.BREAK",
  26: "FONT",
  27: "DISPLAY",
  28: "PROTECT.DOCUMENT",
  29: "PRECISION",
  30: "A1.R1C1",
  31: "CALCULATE.NOW",
  32: "CALCULATION",
  34: "DATA.FIND",
  35: "EXTRACT",
  36: "DATA.DELETE",
  37: "SET.DATABASE",
  38: "SET.CRITERIA",
  39: "SORT",
  40: "DATA.SERIES",
  41: "TABLE",
  42: "FORMAT.NUMBER",
  43: "ALIGNMENT",
  44: "STYLE",
  45: "BORDER",
  46: "CELL.PROTECTION",
  47: "COLUMN.WIDTH",
  48: "UNDO",
  49: "CUT",
  50: "COPY",
  51: "PASTE",
  52: "CLEAR",
  53: "PASTE.SPECIAL",
  54: "EDIT.DELETE",
  55: "INSERT",
  56: "FILL.RIGHT",
  57: "FILL.DOWN",
  61: "DEFINE.NAME",
  62: "CREATE.NAMES",
  63: "FORMULA.GOTO",
  64: "FORMULA.FIND",
  65: "SELECT.LAST.CELL",
  66: "SHOW.ACTIVE.CELL",
  67: "GALLERY.AREA",
  68: "GALLERY.BAR",
  69: "GALLERY.COLUMN",
  70: "GALLERY.LINE",
  71: "GALLERY.PIE",
  72: "GALLERY.SCATTER",
  73: "COMBINATION",
  74: "PREFERRED",
  75: "ADD.OVERLAY",
  76: "GRIDLINES",
  77: "SET.PREFERRED",
  78: "AXES",
  79: "LEGEND",
  80: "ATTACH.TEXT",
  81: "ADD.ARROW",
  82: "SELECT.CHART",
  83: "SELECT.PLOT.AREA",
  84: "PATTERNS",
  85: "MAIN.CHART",
  86: "OVERLAY",
  87: "SCALE",
  88: "FORMAT.LEGEND",
  89: "FORMAT.TEXT",
  90: "EDIT.REPEAT",
  91: "PARSE",
  92: "JUSTIFY",
  93: "HIDE",
  94: "UNHIDE",
  95: "WORKSPACE",
  96: "FORMULA",
  97: "FORMULA.FILL",
  98: "FORMULA.ARRAY",
  99: "DATA.FIND.NEXT",
  100: "DATA.FIND.PREV",
  101: "FORMULA.FIND.NEXT",
  102: "FORMULA.FIND.PREV",
  103: "ACTIVATE",
  104: "ACTIVATE.NEXT",
  105: "ACTIVATE.PREV",
  106: "UNLOCKED.NEXT",
  107: "UNLOCKED.PREV",
  108: "COPY.PICTURE",
  109: "SELECT",
  110: "DELETE.NAME",
  111: "DELETE.FORMAT",
  112: "VLINE",
  113: "HLINE",
  114: "VPAGE",
  115: "HPAGE",
  116: "VSCROLL",
  117: "HSCROLL",
  118: "ALERT",
  119: "NEW",
  120: "CANCEL.COPY",
  121: "SHOW.CLIPBOARD",
  122: "MESSAGE",
  124: "PASTE.LINK",
  125: "APP.ACTIVATE",
  126: "DELETE.ARROW",
  127: "ROW.HEIGHT",
  128: "FORMAT.MOVE",
  129: "FORMAT.SIZE",
  130: "FORMULA.REPLACE",
  131: "SEND.KEYS",
  132: "SELECT.SPECIAL",
  133: "APPLY.NAMES",
  134: "REPLACE.FONT",
  135: "FREEZE.PANES",
  136: "SHOW.INFO",
  137: "SPLIT",
  138: "ON.WINDOW",
  139: "ON.DATA",
  140: "DISABLE.INPUT",
  142: "OUTLINE",
  143: "LIST.NAMES",
  144: "FILE.CLOSE",
  145: "SAVE.WORKBOOK",
  146: "DATA.FORM",
  147: "COPY.CHART",
  148: "ON.TIME",
  149: "WAIT",
  150: "FORMAT.FONT",
  151: "FILL.UP",
  152: "FILL.LEFT",
  153: "DELETE.OVERLAY",
  155: "SHORT.MENUS",
  159: "SET.UPDATE.STATUS",
  161: "COLOR.PALETTE",
  162: "DELETE.STYLE",
  163: "WINDOW.RESTORE",
  164: "WINDOW.MAXIMIZE",
  166: "CHANGE.LINK",
  167: "CALCULATE.DOCUMENT",
  168: "ON.KEY",
  169: "APP.RESTORE",
  170: "APP.MOVE",
  171: "APP.SIZE",
  172: "APP.MINIMIZE",
  173: "APP.MAXIMIZE",
  174: "BRING.TO.FRONT",
  175: "SEND.TO.BACK",
  185: "MAIN.CHART.TYPE",
  186: "OVERLAY.CHART.TYPE",
  187: "SELECT.END",
  188: "OPEN.MAIL",
  189: "SEND.MAIL",
  190: "STANDARD.FONT",
  191: "CONSOLIDATE",
  192: "SORT.SPECIAL",
  193: "GALLERY.3D.AREA",
  194: "GALLERY.3D.COLUMN",
  195: "GALLERY.3D.LINE",
  196: "GALLERY.3D.PIE",
  197: "VIEW.3D",
  198: "GOAL.SEEK",
  199: "WORKGROUP",
  200: "FILL.GROUP",
  201: "UPDATE.LINK",
  202: "PROMOTE",
  203: "DEMOTE",
  204: "SHOW.DETAIL",
  206: "UNGROUP",
  207: "OBJECT.PROPERTIES",
  208: "SAVE.NEW.OBJECT",
  209: "SHARE",
  210: "SHARE.NAME",
  211: "DUPLICATE",
  212: "APPLY.STYLE",
  213: "ASSIGN.TO.OBJECT",
  214: "OBJECT.PROTECTION",
  215: "HIDE.OBJECT",
  216: "SET.EXTRACT",
  217: "CREATE.PUBLISHER",
  218: "SUBSCRIBE.TO",
  219: "ATTRIBUTES",
  220: "SHOW.TOOLBAR",
  222: "PRINT.PREVIEW",
  223: "EDIT.COLOR",
  224: "SHOW.LEVELS",
  225: "FORMAT.MAIN",
  226: "FORMAT.OVERLAY",
  227: "ON.RECALC",
  228: "EDIT.SERIES",
  229: "DEFINE.STYLE",
  240: "LINE.PRINT",
  243: "ENTER.DATA",
  249: "GALLERY.RADAR",
  250: "MERGE.STYLES",
  251: "EDITION.OPTIONS",
  252: "PASTE.PICTURE",
  253: "PASTE.PICTURE.LINK",
  254: "SPELLING",
  256: "ZOOM",
  259: "INSERT.OBJECT",
  260: "WINDOW.MINIMIZE",
  265: "SOUND.NOTE",
  266: "SOUND.PLAY",
  267: "FORMAT.SHAPE",
  268: "EXTEND.POLYGON",
  269: "FORMAT.AUTO",
  272: "GALLERY.3D.BAR",
  273: "GALLERY.3D.SURFACE",
  274: "FILL.AUTO",
  276: "CUSTOMIZE.TOOLBAR",
  277: "ADD.TOOL",
  278: "EDIT.OBJECT",
  279: "ON.DOUBLECLICK",
  280: "ON.ENTRY",
  281: "WORKBOOK.ADD",
  282: "WORKBOOK.MOVE",
  283: "WORKBOOK.COPY",
  284: "WORKBOOK.OPTIONS",
  285: "SAVE.WORKSPACE",
  288: "CHART.WIZARD",
  289: "DELETE.TOOL",
  290: "MOVE.TOOL",
  291: "WORKBOOK.SELECT",
  292: "WORKBOOK.ACTIVATE",
  293: "ASSIGN.TO.TOOL",
  295: "COPY.TOOL",
  296: "RESET.TOOL",
  297: "CONSTRAIN.NUMERIC",
  298: "PASTE.TOOL",
  302: "WORKBOOK.NEW",
  305: "SCENARIO.CELLS",
  306: "SCENARIO.DELETE",
  307: "SCENARIO.ADD",
  308: "SCENARIO.EDIT",
  309: "SCENARIO.SHOW",
  310: "SCENARIO.SHOW.NEXT",
  311: "SCENARIO.SUMMARY",
  312: "PIVOT.TABLE.WIZARD",
  313: "PIVOT.FIELD.PROPERTIES",
  314: "PIVOT.FIELD",
  315: "PIVOT.ITEM",
  316: "PIVOT.ADD.FIELDS",
  318: "OPTIONS.CALCULATION",
  319: "OPTIONS.EDIT",
  320: "OPTIONS.VIEW",
  321: "ADDIN.MANAGER",
  322: "MENU.EDITOR",
  323: "ATTACH.TOOLBARS",
  324: "VBAActivate",
  325: "OPTIONS.CHART",
  328: "VBA.INSERT.FILE",
  330: "VBA.PROCEDURE.DEFINITION",
  336: "ROUTING.SLIP",
  338: "ROUTE.DOCUMENT",
  339: "MAIL.LOGON",
  342: "INSERT.PICTURE",
  343: "EDIT.TOOL",
  344: "GALLERY.DOUGHNUT",
  350: "CHART.TREND",
  352: "PIVOT.ITEM.PROPERTIES",
  354: "WORKBOOK.INSERT",
  355: "OPTIONS.TRANSITION",
  356: "OPTIONS.GENERAL",
  370: "FILTER.ADVANCED",
  373: "MAIL.ADD.MAILER",
  374: "MAIL.DELETE.MAILER",
  375: "MAIL.REPLY",
  376: "MAIL.REPLY.ALL",
  377: "MAIL.FORWARD",
  378: "MAIL.NEXT.LETTER",
  379: "DATA.LABEL",
  380: "INSERT.TITLE",
  381: "FONT.PROPERTIES",
  382: "MACRO.OPTIONS",
  383: "WORKBOOK.HIDE",
  384: "WORKBOOK.UNHIDE",
  385: "WORKBOOK.DELETE",
  386: "WORKBOOK.NAME",
  388: "GALLERY.CUSTOM",
  390: "ADD.CHART.AUTOFORMAT",
  391: "DELETE.CHART.AUTOFORMAT",
  392: "CHART.ADD.DATA",
  393: "AUTO.OUTLINE",
  394: "TAB.ORDER",
  395: "SHOW.DIALOG",
  396: "SELECT.ALL",
  397: "UNGROUP.SHEETS",
  398: "SUBTOTAL.CREATE",
  399: "SUBTOTAL.REMOVE",
  400: "RENAME.OBJECT",
  412: "WORKBOOK.SCROLL",
  413: "WORKBOOK.NEXT",
  414: "WORKBOOK.PREV",
  415: "WORKBOOK.TAB.SPLIT",
  416: "FULL.SCREEN",
  417: "WORKBOOK.PROTECT",
  420: "SCROLLBAR.PROPERTIES",
  421: "PIVOT.SHOW.PAGES",
  422: "TEXT.TO.COLUMNS",
  423: "FORMAT.CHARTTYPE",
  424: "LINK.FORMAT",
  425: "TRACER.DISPLAY",
  430: "TRACER.NAVIGATE",
  431: "TRACER.CLEAR",
  432: "TRACER.ERROR",
  433: "PIVOT.FIELD.GROUP",
  434: "PIVOT.FIELD.UNGROUP",
  435: "CHECKBOX.PROPERTIES",
  436: "LABEL.PROPERTIES",
  437: "LISTBOX.PROPERTIES",
  438: "EDITBOX.PROPERTIES",
  439: "PIVOT.REFRESH",
  440: "LINK.COMBO",
  441: "OPEN.TEXT",
  442: "HIDE.DIALOG",
  443: "SET.DIALOG.FOCUS",
  444: "ENABLE.OBJECT",
  445: "PUSHBUTTON.PROPERTIES",
  446: "SET.DIALOG.DEFAULT",
  447: "FILTER",
  448: "FILTER.SHOW.ALL",
  449: "CLEAR.OUTLINE",
  450: "FUNCTION.WIZARD",
  451: "ADD.LIST.ITEM",
  452: "SET.LIST.ITEM",
  453: "REMOVE.LIST.ITEM",
  454: "SELECT.LIST.ITEM",
  455: "SET.CONTROL.VALUE",
  456: "SAVE.COPY.AS",
  458: "OPTIONS.LISTS.ADD",
  459: "OPTIONS.LISTS.DELETE",
  460: "SERIES.AXES",
  461: "SERIES.X",
  462: "SERIES.Y",
  463: "ERRORBAR.X",
  464: "ERRORBAR.Y",
  465: "FORMAT.CHART",
  466: "SERIES.ORDER",
  467: "MAIL.LOGOFF",
  468: "CLEAR.ROUTING.SLIP",
  469: "APP.ACTIVATE.MICROSOFT",
  470: "MAIL.EDIT.MAILER",
  471: "ON.SHEET",
  472: "STANDARD.WIDTH",
  473: "SCENARIO.MERGE",
  474: "SUMMARY.INFO",
  475: "FIND.FILE",
  476: "ACTIVE.CELL.FONT",
  477: "ENABLE.TIPWIZARD",
  478: "VBA.MAKE.ADDIN",
  480: "INSERTDATATABLE",
  481: "WORKGROUP.OPTIONS",
  482: "MAIL.SEND.MAILER",
  485: "AUTOCORRECT",
  489: "POST.DOCUMENT",
  491: "PICKLIST",
  493: "VIEW.SHOW",
  494: "VIEW.DEFINE",
  495: "VIEW.DELETE",
  509: "SHEET.BACKGROUND",
  510: "INSERT.MAP.OBJECT",
  511: "OPTIONS.MENONO",
  517: "MSOCHECKS",
  518: "NORMAL",
  519: "LAYOUT",
  520: "RM.PRINT.AREA",
  521: "CLEAR.PRINT.AREA",
  522: "ADD.PRINT.AREA",
  523: "MOVE.BRK",
  545: "HIDECURR.NOTE",
  546: "HIDEALL.NOTES",
  547: "DELETE.NOTE",
  548: "TRAVERSE.NOTES",
  549: "ACTIVATE.NOTES",
  620: "PROTECT.REVISIONS",
  621: "UNPROTECT.REVISIONS",
  647: "OPTIONS.ME",
  653: "WEB.PUBLISH",
  667: "NEWWEBQUERY",
  673: "PIVOT.TABLE.CHART",
  753: "OPTIONS.SAVE",
  755: "OPTIONS.SPELL",
  808: "HIDEALL.INKANNOTS"
}, Go = {
  0: "COUNT",
  1: "IF",
  2: "ISNA",
  3: "ISERROR",
  4: "SUM",
  5: "AVERAGE",
  6: "MIN",
  7: "MAX",
  8: "ROW",
  9: "COLUMN",
  10: "NA",
  11: "NPV",
  12: "STDEV",
  13: "DOLLAR",
  14: "FIXED",
  15: "SIN",
  16: "COS",
  17: "TAN",
  18: "ATAN",
  19: "PI",
  20: "SQRT",
  21: "EXP",
  22: "LN",
  23: "LOG10",
  24: "ABS",
  25: "INT",
  26: "SIGN",
  27: "ROUND",
  28: "LOOKUP",
  29: "INDEX",
  30: "REPT",
  31: "MID",
  32: "LEN",
  33: "VALUE",
  34: "TRUE",
  35: "FALSE",
  36: "AND",
  37: "OR",
  38: "NOT",
  39: "MOD",
  40: "DCOUNT",
  41: "DSUM",
  42: "DAVERAGE",
  43: "DMIN",
  44: "DMAX",
  45: "DSTDEV",
  46: "VAR",
  47: "DVAR",
  48: "TEXT",
  49: "LINEST",
  50: "TREND",
  51: "LOGEST",
  52: "GROWTH",
  53: "GOTO",
  54: "HALT",
  55: "RETURN",
  56: "PV",
  57: "FV",
  58: "NPER",
  59: "PMT",
  60: "RATE",
  61: "MIRR",
  62: "IRR",
  63: "RAND",
  64: "MATCH",
  65: "DATE",
  66: "TIME",
  67: "DAY",
  68: "MONTH",
  69: "YEAR",
  70: "WEEKDAY",
  71: "HOUR",
  72: "MINUTE",
  73: "SECOND",
  74: "NOW",
  75: "AREAS",
  76: "ROWS",
  77: "COLUMNS",
  78: "OFFSET",
  79: "ABSREF",
  80: "RELREF",
  81: "ARGUMENT",
  82: "SEARCH",
  83: "TRANSPOSE",
  84: "ERROR",
  85: "STEP",
  86: "TYPE",
  87: "ECHO",
  88: "SET.NAME",
  89: "CALLER",
  90: "DEREF",
  91: "WINDOWS",
  92: "SERIES",
  93: "DOCUMENTS",
  94: "ACTIVE.CELL",
  95: "SELECTION",
  96: "RESULT",
  97: "ATAN2",
  98: "ASIN",
  99: "ACOS",
  100: "CHOOSE",
  101: "HLOOKUP",
  102: "VLOOKUP",
  103: "LINKS",
  104: "INPUT",
  105: "ISREF",
  106: "GET.FORMULA",
  107: "GET.NAME",
  108: "SET.VALUE",
  109: "LOG",
  110: "EXEC",
  111: "CHAR",
  112: "LOWER",
  113: "UPPER",
  114: "PROPER",
  115: "LEFT",
  116: "RIGHT",
  117: "EXACT",
  118: "TRIM",
  119: "REPLACE",
  120: "SUBSTITUTE",
  121: "CODE",
  122: "NAMES",
  123: "DIRECTORY",
  124: "FIND",
  125: "CELL",
  126: "ISERR",
  127: "ISTEXT",
  128: "ISNUMBER",
  129: "ISBLANK",
  130: "T",
  131: "N",
  132: "FOPEN",
  133: "FCLOSE",
  134: "FSIZE",
  135: "FREADLN",
  136: "FREAD",
  137: "FWRITELN",
  138: "FWRITE",
  139: "FPOS",
  140: "DATEVALUE",
  141: "TIMEVALUE",
  142: "SLN",
  143: "SYD",
  144: "DDB",
  145: "GET.DEF",
  146: "REFTEXT",
  147: "TEXTREF",
  148: "INDIRECT",
  149: "REGISTER",
  150: "CALL",
  151: "ADD.BAR",
  152: "ADD.MENU",
  153: "ADD.COMMAND",
  154: "ENABLE.COMMAND",
  155: "CHECK.COMMAND",
  156: "RENAME.COMMAND",
  157: "SHOW.BAR",
  158: "DELETE.MENU",
  159: "DELETE.COMMAND",
  160: "GET.CHART.ITEM",
  161: "DIALOG.BOX",
  162: "CLEAN",
  163: "MDETERM",
  164: "MINVERSE",
  165: "MMULT",
  166: "FILES",
  167: "IPMT",
  168: "PPMT",
  169: "COUNTA",
  170: "CANCEL.KEY",
  171: "FOR",
  172: "WHILE",
  173: "BREAK",
  174: "NEXT",
  175: "INITIATE",
  176: "REQUEST",
  177: "POKE",
  178: "EXECUTE",
  179: "TERMINATE",
  180: "RESTART",
  181: "HELP",
  182: "GET.BAR",
  183: "PRODUCT",
  184: "FACT",
  185: "GET.CELL",
  186: "GET.WORKSPACE",
  187: "GET.WINDOW",
  188: "GET.DOCUMENT",
  189: "DPRODUCT",
  190: "ISNONTEXT",
  191: "GET.NOTE",
  192: "NOTE",
  193: "STDEVP",
  194: "VARP",
  195: "DSTDEVP",
  196: "DVARP",
  197: "TRUNC",
  198: "ISLOGICAL",
  199: "DCOUNTA",
  200: "DELETE.BAR",
  201: "UNREGISTER",
  204: "USDOLLAR",
  205: "FINDB",
  206: "SEARCHB",
  207: "REPLACEB",
  208: "LEFTB",
  209: "RIGHTB",
  210: "MIDB",
  211: "LENB",
  212: "ROUNDUP",
  213: "ROUNDDOWN",
  214: "ASC",
  215: "DBCS",
  216: "RANK",
  219: "ADDRESS",
  220: "DAYS360",
  221: "TODAY",
  222: "VDB",
  223: "ELSE",
  224: "ELSE.IF",
  225: "END.IF",
  226: "FOR.CELL",
  227: "MEDIAN",
  228: "SUMPRODUCT",
  229: "SINH",
  230: "COSH",
  231: "TANH",
  232: "ASINH",
  233: "ACOSH",
  234: "ATANH",
  235: "DGET",
  236: "CREATE.OBJECT",
  237: "VOLATILE",
  238: "LAST.ERROR",
  239: "CUSTOM.UNDO",
  240: "CUSTOM.REPEAT",
  241: "FORMULA.CONVERT",
  242: "GET.LINK.INFO",
  243: "TEXT.BOX",
  244: "INFO",
  245: "GROUP",
  246: "GET.OBJECT",
  247: "DB",
  248: "PAUSE",
  251: "RESUME",
  252: "FREQUENCY",
  253: "ADD.TOOLBAR",
  254: "DELETE.TOOLBAR",
  255: "User",
  256: "RESET.TOOLBAR",
  257: "EVALUATE",
  258: "GET.TOOLBAR",
  259: "GET.TOOL",
  260: "SPELLING.CHECK",
  261: "ERROR.TYPE",
  262: "APP.TITLE",
  263: "WINDOW.TITLE",
  264: "SAVE.TOOLBAR",
  265: "ENABLE.TOOL",
  266: "PRESS.TOOL",
  267: "REGISTER.ID",
  268: "GET.WORKBOOK",
  269: "AVEDEV",
  270: "BETADIST",
  271: "GAMMALN",
  272: "BETAINV",
  273: "BINOMDIST",
  274: "CHIDIST",
  275: "CHIINV",
  276: "COMBIN",
  277: "CONFIDENCE",
  278: "CRITBINOM",
  279: "EVEN",
  280: "EXPONDIST",
  281: "FDIST",
  282: "FINV",
  283: "FISHER",
  284: "FISHERINV",
  285: "FLOOR",
  286: "GAMMADIST",
  287: "GAMMAINV",
  288: "CEILING",
  289: "HYPGEOMDIST",
  290: "LOGNORMDIST",
  291: "LOGINV",
  292: "NEGBINOMDIST",
  293: "NORMDIST",
  294: "NORMSDIST",
  295: "NORMINV",
  296: "NORMSINV",
  297: "STANDARDIZE",
  298: "ODD",
  299: "PERMUT",
  300: "POISSON",
  301: "TDIST",
  302: "WEIBULL",
  303: "SUMXMY2",
  304: "SUMX2MY2",
  305: "SUMX2PY2",
  306: "CHITEST",
  307: "CORREL",
  308: "COVAR",
  309: "FORECAST",
  310: "FTEST",
  311: "INTERCEPT",
  312: "PEARSON",
  313: "RSQ",
  314: "STEYX",
  315: "SLOPE",
  316: "TTEST",
  317: "PROB",
  318: "DEVSQ",
  319: "GEOMEAN",
  320: "HARMEAN",
  321: "SUMSQ",
  322: "KURT",
  323: "SKEW",
  324: "ZTEST",
  325: "LARGE",
  326: "SMALL",
  327: "QUARTILE",
  328: "PERCENTILE",
  329: "PERCENTRANK",
  330: "MODE",
  331: "TRIMMEAN",
  332: "TINV",
  334: "MOVIE.COMMAND",
  335: "GET.MOVIE",
  336: "CONCATENATE",
  337: "POWER",
  338: "PIVOT.ADD.DATA",
  339: "GET.PIVOT.TABLE",
  340: "GET.PIVOT.FIELD",
  341: "GET.PIVOT.ITEM",
  342: "RADIANS",
  343: "DEGREES",
  344: "SUBTOTAL",
  345: "SUMIF",
  346: "COUNTIF",
  347: "COUNTBLANK",
  348: "SCENARIO.GET",
  349: "OPTIONS.LISTS.GET",
  350: "ISPMT",
  351: "DATEDIF",
  352: "DATESTRING",
  353: "NUMBERSTRING",
  354: "ROMAN",
  355: "OPEN.DIALOG",
  356: "SAVE.DIALOG",
  357: "VIEW.GET",
  358: "GETPIVOTDATA",
  359: "HYPERLINK",
  360: "PHONETIC",
  361: "AVERAGEA",
  362: "MAXA",
  363: "MINA",
  364: "STDEVPA",
  365: "VARPA",
  366: "STDEVA",
  367: "VARA",
  368: "BAHTTEXT",
  369: "THAIDAYOFWEEK",
  370: "THAIDIGIT",
  371: "THAIMONTHOFYEAR",
  372: "THAINUMSOUND",
  373: "THAINUMSTRING",
  374: "THAISTRINGLENGTH",
  375: "ISTHAIDIGIT",
  376: "ROUNDBAHTDOWN",
  377: "ROUNDBAHTUP",
  378: "THAIYEAR",
  379: "RTD",
  380: "CUBEVALUE",
  381: "CUBEMEMBER",
  382: "CUBEMEMBERPROPERTY",
  383: "CUBERANKEDMEMBER",
  384: "HEX2BIN",
  385: "HEX2DEC",
  386: "HEX2OCT",
  387: "DEC2BIN",
  388: "DEC2HEX",
  389: "DEC2OCT",
  390: "OCT2BIN",
  391: "OCT2HEX",
  392: "OCT2DEC",
  393: "BIN2DEC",
  394: "BIN2OCT",
  395: "BIN2HEX",
  396: "IMSUB",
  397: "IMDIV",
  398: "IMPOWER",
  399: "IMABS",
  400: "IMSQRT",
  401: "IMLN",
  402: "IMLOG2",
  403: "IMLOG10",
  404: "IMSIN",
  405: "IMCOS",
  406: "IMEXP",
  407: "IMARGUMENT",
  408: "IMCONJUGATE",
  409: "IMAGINARY",
  410: "IMREAL",
  411: "COMPLEX",
  412: "IMSUM",
  413: "IMPRODUCT",
  414: "SERIESSUM",
  415: "FACTDOUBLE",
  416: "SQRTPI",
  417: "QUOTIENT",
  418: "DELTA",
  419: "GESTEP",
  420: "ISEVEN",
  421: "ISODD",
  422: "MROUND",
  423: "ERF",
  424: "ERFC",
  425: "BESSELJ",
  426: "BESSELK",
  427: "BESSELY",
  428: "BESSELI",
  429: "XIRR",
  430: "XNPV",
  431: "PRICEMAT",
  432: "YIELDMAT",
  433: "INTRATE",
  434: "RECEIVED",
  435: "DISC",
  436: "PRICEDISC",
  437: "YIELDDISC",
  438: "TBILLEQ",
  439: "TBILLPRICE",
  440: "TBILLYIELD",
  441: "PRICE",
  442: "YIELD",
  443: "DOLLARDE",
  444: "DOLLARFR",
  445: "NOMINAL",
  446: "EFFECT",
  447: "CUMPRINC",
  448: "CUMIPMT",
  449: "EDATE",
  450: "EOMONTH",
  451: "YEARFRAC",
  452: "COUPDAYBS",
  453: "COUPDAYS",
  454: "COUPDAYSNC",
  455: "COUPNCD",
  456: "COUPNUM",
  457: "COUPPCD",
  458: "DURATION",
  459: "MDURATION",
  460: "ODDLPRICE",
  461: "ODDLYIELD",
  462: "ODDFPRICE",
  463: "ODDFYIELD",
  464: "RANDBETWEEN",
  465: "WEEKNUM",
  466: "AMORDEGRC",
  467: "AMORLINC",
  468: "CONVERT",
  724: "SHEETJS",
  469: "ACCRINT",
  470: "ACCRINTM",
  471: "WORKDAY",
  472: "NETWORKDAYS",
  473: "GCD",
  474: "MULTINOMIAL",
  475: "LCM",
  476: "FVSCHEDULE",
  477: "CUBEKPIMEMBER",
  478: "CUBESET",
  479: "CUBESETCOUNT",
  480: "IFERROR",
  481: "COUNTIFS",
  482: "SUMIFS",
  483: "AVERAGEIF",
  484: "AVERAGEIFS"
}, Up = {
  2: 1,
  3: 1,
  10: 0,
  15: 1,
  16: 1,
  17: 1,
  18: 1,
  19: 0,
  20: 1,
  21: 1,
  22: 1,
  23: 1,
  24: 1,
  25: 1,
  26: 1,
  27: 2,
  30: 2,
  31: 3,
  32: 1,
  33: 1,
  34: 0,
  35: 0,
  38: 1,
  39: 2,
  40: 3,
  41: 3,
  42: 3,
  43: 3,
  44: 3,
  45: 3,
  47: 3,
  48: 2,
  53: 1,
  61: 3,
  63: 0,
  65: 3,
  66: 3,
  67: 1,
  68: 1,
  69: 1,
  70: 1,
  71: 1,
  72: 1,
  73: 1,
  74: 0,
  75: 1,
  76: 1,
  77: 1,
  79: 2,
  80: 2,
  83: 1,
  85: 0,
  86: 1,
  89: 0,
  90: 1,
  94: 0,
  95: 0,
  97: 2,
  98: 1,
  99: 1,
  101: 3,
  102: 3,
  105: 1,
  106: 1,
  108: 2,
  111: 1,
  112: 1,
  113: 1,
  114: 1,
  117: 2,
  118: 1,
  119: 4,
  121: 1,
  126: 1,
  127: 1,
  128: 1,
  129: 1,
  130: 1,
  131: 1,
  133: 1,
  134: 1,
  135: 1,
  136: 2,
  137: 2,
  138: 2,
  140: 1,
  141: 1,
  142: 3,
  143: 4,
  144: 4,
  161: 1,
  162: 1,
  163: 1,
  164: 1,
  165: 2,
  172: 1,
  175: 2,
  176: 2,
  177: 3,
  178: 2,
  179: 1,
  184: 1,
  186: 1,
  189: 3,
  190: 1,
  195: 3,
  196: 3,
  197: 1,
  198: 1,
  199: 3,
  201: 1,
  207: 4,
  210: 3,
  211: 1,
  212: 2,
  213: 2,
  214: 1,
  215: 1,
  225: 0,
  229: 1,
  230: 1,
  231: 1,
  232: 1,
  233: 1,
  234: 1,
  235: 3,
  244: 1,
  247: 4,
  252: 2,
  257: 1,
  261: 1,
  271: 1,
  273: 4,
  274: 2,
  275: 2,
  276: 2,
  277: 3,
  278: 3,
  279: 1,
  280: 3,
  281: 3,
  282: 3,
  283: 1,
  284: 1,
  285: 2,
  286: 4,
  287: 3,
  288: 2,
  289: 4,
  290: 3,
  291: 3,
  292: 3,
  293: 4,
  294: 1,
  295: 3,
  296: 1,
  297: 3,
  298: 1,
  299: 2,
  300: 3,
  301: 3,
  302: 4,
  303: 2,
  304: 2,
  305: 2,
  306: 2,
  307: 2,
  308: 2,
  309: 3,
  310: 2,
  311: 2,
  312: 2,
  313: 2,
  314: 2,
  315: 2,
  316: 4,
  325: 2,
  326: 2,
  327: 2,
  328: 2,
  331: 2,
  332: 2,
  337: 2,
  342: 1,
  343: 1,
  346: 2,
  347: 1,
  350: 4,
  351: 3,
  352: 1,
  353: 2,
  360: 1,
  368: 1,
  369: 1,
  370: 1,
  371: 1,
  372: 1,
  373: 1,
  374: 1,
  375: 1,
  376: 1,
  377: 1,
  378: 1,
  382: 3,
  385: 1,
  392: 1,
  393: 1,
  396: 2,
  397: 2,
  398: 2,
  399: 1,
  400: 1,
  401: 1,
  402: 1,
  403: 1,
  404: 1,
  405: 1,
  406: 1,
  407: 1,
  408: 1,
  409: 1,
  410: 1,
  414: 4,
  415: 1,
  416: 1,
  417: 2,
  420: 1,
  421: 1,
  422: 2,
  424: 1,
  425: 2,
  426: 2,
  427: 2,
  428: 2,
  430: 3,
  438: 3,
  439: 3,
  440: 3,
  443: 2,
  444: 2,
  445: 2,
  446: 2,
  447: 6,
  448: 6,
  449: 2,
  450: 2,
  464: 2,
  468: 3,
  476: 2,
  479: 1,
  480: 2,
  65535: 0
};
function Cf(e) {
  return e.slice(0, 3) == "of:" && (e = e.slice(3)), e.charCodeAt(0) == 61 && (e = e.slice(1), e.charCodeAt(0) == 61 && (e = e.slice(1))), e = e.replace(/COM\.MICROSOFT\./g, ""), e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function(t, r) {
    return r.replace(/\./g, "");
  }), e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1"), e.replace(/[;~]/g, ",").replace(/\|/g, ";");
}
function Wp(e) {
  var t = "of:=" + e.replace(s0, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function is(e) {
  var t = e.split(":"), r = t[0].split(".")[0];
  return [r, t[0].split(".")[1] + (t.length > 1 ? ":" + (t[1].split(".")[1] || t[1].split(".")[0]) : "")];
}
function Hp(e) {
  return e.replace(/\./, "!");
}
var Aa = {}, Yn = {}, Fa = typeof Map < "u";
function o0(e, t, r) {
  var n = 0, a = e.length;
  if (r) {
    if (Fa ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
      for (var i = Fa ? r.get(t) : r[t]; n < i.length; ++n)
        if (e[i[n]].t === t)
          return e.Count++, i[n];
    }
  } else for (; n < a; ++n)
    if (e[n].t === t)
      return e.Count++, n;
  return e[a] = { t }, e.Count++, e.Unique++, r && (Fa ? (r.has(t) || r.set(t, []), r.get(t).push(a)) : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []), r[t].push(a))), a;
}
function zi(e, t) {
  var r = { min: e + 1, max: e + 1 }, n = -1;
  return t.MDW && (Fr = t.MDW), t.width != null ? r.customWidth = 1 : t.wpx != null ? n = Ha(t.wpx) : t.wch != null && (n = t.wch), n > -1 ? (r.width = Ni(n), r.customWidth = 1) : t.width != null && (r.width = t.width), t.hidden && (r.hidden = !0), t.level != null && (r.outlineLevel = r.level = t.level), r;
}
function wn(e, t) {
  if (e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    t == "xlml" && (r = [1, 1, 1, 1, 0.5, 0.5]), e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5]);
  }
}
function on(e, t, r) {
  var n = r.revssf[t.z != null ? t.z : "General"], a = 60, i = e.length;
  if (n == null && r.ssf) {
    for (; a < 392; ++a) if (r.ssf[a] == null) {
      Pt(t.z, a), r.ssf[a] = t.z, r.revssf[t.z] = n = a;
      break;
    }
  }
  for (a = 0; a != i; ++a) if (e[a].numFmtId === n) return a;
  return e[i] = {
    numFmtId: n,
    fontId: 0,
    fillId: 0,
    borderId: 0,
    xfId: 0,
    applyNumberFormat: 1
  }, i;
}
function Xo(e, t, r, n, a, i) {
  try {
    n.cellNF && (e.z = Ee[t]);
  } catch (f) {
    if (n.WTF) throw f;
  }
  if (!(e.t === "z" && !n.cellStyles)) {
    if (e.t === "d" && typeof e.v == "string" && (e.v = Ye(e.v)), (!n || n.cellText !== !1) && e.t !== "z") try {
      if (Ee[t] == null && Pt(Mh[t] || "General", t), e.t === "e") e.w = e.w || $t[e.v];
      else if (t === 0)
        if (e.t === "n")
          (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = Da(e.v);
        else if (e.t === "d") {
          var s = gr(e.v);
          (s | 0) === s ? e.w = s.toString(10) : e.w = Da(s);
        } else {
          if (e.v === void 0) return "";
          e.w = _n(e.v, Yn);
        }
      else e.t === "d" ? e.w = ht(t, gr(e.v), Yn) : e.w = ht(t, e.v, Yn);
    } catch (f) {
      if (n.WTF) throw f;
    }
    if (n.cellStyles && r != null)
      try {
        e.s = i.Fills[r], e.s.fgColor && e.s.fgColor.theme && !e.s.fgColor.rgb && (e.s.fgColor.rgb = Oi(a.themeElements.clrScheme[e.s.fgColor.theme].rgb, e.s.fgColor.tint || 0), n.WTF && (e.s.fgColor.raw_rgb = a.themeElements.clrScheme[e.s.fgColor.theme].rgb)), e.s.bgColor && e.s.bgColor.theme && (e.s.bgColor.rgb = Oi(a.themeElements.clrScheme[e.s.bgColor.theme].rgb, e.s.bgColor.tint || 0), n.WTF && (e.s.bgColor.raw_rgb = a.themeElements.clrScheme[e.s.bgColor.theme].rgb));
      } catch (f) {
        if (n.WTF && i.Fills) throw f;
      }
  }
}
function Vp(e, t, r) {
  if (e && e["!ref"]) {
    var n = Me(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r) throw new Error("Bad range (" + r + "): " + e["!ref"]);
  }
}
function $p(e, t) {
  var r = Me(t);
  r.s.r <= r.e.r && r.s.c <= r.e.c && r.s.r >= 0 && r.s.c >= 0 && (e["!ref"] = Ae(r));
}
var zp = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g, Gp = /<(?:\w+:)?sheetData[^>]*>([\s\S]*)<\/(?:\w+:)?sheetData>/, Xp = /<(?:\w:)?hyperlink [^>]*>/mg, jp = /"(\w*:\w*)"/, Yp = /<(?:\w:)?col\b[^>]*[\/]?>/g, Kp = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g, Jp = /<(?:\w:)?pageMargins[^>]*\/>/g, jo = /<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/, qp = /<(?:\w:)?sheetPr[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetPr)>/, Zp = /<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;
function Qp(e, t, r, n, a, i, s) {
  if (!e) return e;
  n || (n = { "!id": {} });
  var f = t.dense ? [] : {}, c = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, o = "", l = "", h = e.match(Gp);
  h ? (o = e.slice(0, h.index), l = e.slice(h.index + h[0].length)) : o = l = e;
  var u = o.match(jo);
  u ? l0(u[0], f, a, r) : (u = o.match(qp)) && r2(u[0], u[1] || "", f, a, r);
  var x = (o.match(/<(?:\w*:)?dimension/) || { index: -1 }).index;
  if (x > 0) {
    var g = o.slice(x, x + 50).match(jp);
    g && $p(f, g[1]);
  }
  var d = o.match(Zp);
  d && d[1] && d2(d[1], a);
  var m = [];
  if (t.cellStyles) {
    var w = o.match(Yp);
    w && o2(m, w);
  }
  h && p2(h[1], f, t, c, i, s);
  var y = l.match(Kp);
  y && (f["!autofilter"] = h2(y[0]));
  var v = [], I = l.match(zp);
  if (I) for (x = 0; x != I.length; ++x)
    v[x] = Me(I[x].slice(I[x].indexOf('"') + 1));
  var T = l.match(Xp);
  T && s2(f, T, n);
  var N = l.match(Jp);
  if (N && (f["!margins"] = f2(Te(N[0]))), !f["!ref"] && c.e.c >= c.s.c && c.e.r >= c.s.r && (f["!ref"] = Ae(c)), t.sheetRows > 0 && f["!ref"]) {
    var k = Me(f["!ref"]);
    t.sheetRows <= +k.e.r && (k.e.r = t.sheetRows - 1, k.e.r > c.e.r && (k.e.r = c.e.r), k.e.r < k.s.r && (k.s.r = k.e.r), k.e.c > c.e.c && (k.e.c = c.e.c), k.e.c < k.s.c && (k.s.c = k.e.c), f["!fullref"] = f["!ref"], f["!ref"] = Ae(k));
  }
  return m.length > 0 && (f["!cols"] = m), v.length > 0 && (f["!merges"] = v), f;
}
function e2(e) {
  if (e.length === 0) return "";
  for (var t = '<mergeCells count="' + e.length + '">', r = 0; r != e.length; ++r) t += '<mergeCell ref="' + Ae(e[r]) + '"/>';
  return t + "</mergeCells>";
}
function l0(e, t, r, n) {
  var a = Te(e);
  r.Sheets[n] || (r.Sheets[n] = {}), a.codeName && (r.Sheets[n].CodeName = Pe(ze(a.codeName)));
}
function r2(e, t, r, n, a) {
  l0(e.slice(0, e.indexOf(">")), r, n, a);
}
function t2(e, t, r, n, a) {
  var i = !1, s = {}, f = null;
  if (n.bookType !== "xlsx" && t.vbaraw) {
    var c = t.SheetNames[r];
    try {
      t.Workbook && (c = t.Workbook.Sheets[r].CodeName || c);
    } catch {
    }
    i = !0, s.codeName = At($e(c));
  }
  if (e && e["!outline"]) {
    var o = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (o.summaryBelow = 0), e["!outline"].left && (o.summaryRight = 0), f = (f || "") + oe("outlinePr", null, o);
  }
  !i && !f || (a[a.length] = oe("sheetPr", f, s));
}
var n2 = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], a2 = [
  "formatColumns",
  "formatRows",
  "formatCells",
  "insertColumns",
  "insertRows",
  "insertHyperlinks",
  "deleteColumns",
  "deleteRows",
  "sort",
  "autoFilter",
  "pivotTables"
];
function i2(e) {
  var t = { sheet: 1 };
  return n2.forEach(function(r) {
    e[r] != null && e[r] && (t[r] = "1");
  }), a2.forEach(function(r) {
    e[r] != null && !e[r] && (t[r] = "0");
  }), e.password && (t.password = n0(e.password).toString(16).toUpperCase()), oe("sheetProtection", null, t);
}
function s2(e, t, r) {
  for (var n = Array.isArray(e), a = 0; a != t.length; ++a) {
    var i = Te(ze(t[a]), !0);
    if (!i.ref) return;
    var s = ((r || {})["!id"] || [])[i.id];
    s ? (i.Target = s.Target, i.location && (i.Target += "#" + Pe(i.location))) : (i.Target = "#" + Pe(i.location), s = { Target: i.Target, TargetMode: "Internal" }), i.Rel = s, i.tooltip && (i.Tooltip = i.tooltip, delete i.tooltip);
    for (var f = Me(i.ref), c = f.s.r; c <= f.e.r; ++c) for (var o = f.s.c; o <= f.e.c; ++o) {
      var l = ye({ c: o, r: c });
      n ? (e[c] || (e[c] = []), e[c][o] || (e[c][o] = { t: "z", v: void 0 }), e[c][o].l = i) : (e[l] || (e[l] = { t: "z", v: void 0 }), e[l].l = i);
    }
  }
}
function f2(e) {
  var t = {};
  return ["left", "right", "top", "bottom", "header", "footer"].forEach(function(r) {
    e[r] && (t[r] = parseFloat(e[r]));
  }), t;
}
function c2(e) {
  return wn(e), oe("pageMargins", null, e);
}
function o2(e, t) {
  for (var r = !1, n = 0; n != t.length; ++n) {
    var a = Te(t[n], !0);
    a.hidden && (a.hidden = je(a.hidden));
    var i = parseInt(a.min, 10) - 1, s = parseInt(a.max, 10) - 1;
    for (a.outlineLevel && (a.level = +a.outlineLevel || 0), delete a.min, delete a.max, a.width = +a.width, !r && a.width && (r = !0, a0(a.width)), rn(a); i <= s; ) e[i++] = Ke(a);
  }
}
function l2(e, t) {
  for (var r = ["<cols>"], n, a = 0; a != t.length; ++a)
    (n = t[a]) && (r[r.length] = oe("col", null, zi(a, n)));
  return r[r.length] = "</cols>", r.join("");
}
function h2(e) {
  var t = { ref: (e.match(/ref="([^"]*)"/) || [])[1] };
  return t;
}
function u2(e, t, r, n) {
  var a = typeof e.ref == "string" ? e.ref : Ae(e.ref);
  r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
  var i = r.Workbook.Names, s = Hr(a);
  s.s.r == s.e.r && (s.e.r = Hr(t["!ref"]).e.r, a = Ae(s));
  for (var f = 0; f < i.length; ++f) {
    var c = i[f];
    if (c.Name == "_xlnm._FilterDatabase" && c.Sheet == n) {
      c.Ref = "'" + r.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return f == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + a }), oe("autoFilter", null, { ref: a });
}
var x2 = /<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/;
function d2(e, t) {
  t.Views || (t.Views = [{}]), (e.match(x2) || []).forEach(function(r, n) {
    var a = Te(r);
    t.Views[n] || (t.Views[n] = {}), +a.zoomScale && (t.Views[n].zoom = +a.zoomScale), je(a.rightToLeft) && (t.Views[n].RTL = !0);
  });
}
function g2(e, t, r, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), oe("sheetViews", oe("sheetView", null, a), {});
}
function m2(e, t, r, n) {
  if (e.c && r["!comments"].push([t, e.c]), e.v === void 0 && typeof e.f != "string" || e.t === "z" && !e.f) return "";
  var a = "", i = e.t, s = e.v;
  if (e.t !== "z") switch (e.t) {
    case "b":
      a = e.v ? "1" : "0";
      break;
    case "n":
      a = "" + e.v;
      break;
    case "e":
      a = $t[e.v];
      break;
    case "d":
      n && n.cellDates ? a = Ye(e.v, -1).toISOString() : (e = Ke(e), e.t = "n", a = "" + (e.v = gr(Ye(e.v)))), typeof e.z > "u" && (e.z = Ee[14]);
      break;
    default:
      a = e.v;
      break;
  }
  var f = Er("v", $e(a)), c = { r: t }, o = on(n.cellXfs, e, n);
  switch (o !== 0 && (c.s = o), e.t) {
    case "n":
      break;
    case "d":
      c.t = "d";
      break;
    case "b":
      c.t = "b";
      break;
    case "e":
      c.t = "e";
      break;
    case "z":
      break;
    default:
      if (e.v == null) {
        delete e.t;
        break;
      }
      if (e.v.length > 32767) throw new Error("Text length must not exceed 32767 characters");
      if (n && n.bookSST) {
        f = Er("v", "" + o0(n.Strings, e.v, n.revStrings)), c.t = "s";
        break;
      }
      c.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var l = e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    f = oe("f", $e(e.f), l) + (e.v != null ? f : "");
  }
  return e.l && r["!links"].push([t, e.l]), e.D && (c.cm = 1), oe("c", f, c);
}
var p2 = /* @__PURE__ */ function() {
  var e = /<(?:\w+:)?c[ \/>]/, t = /<\/(?:\w+:)?row>/, r = /r=["']([^"']*)["']/, n = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/, a = /ref=["']([^"']*)["']/, i = Ra("v"), s = Ra("f");
  return function(c, o, l, h, u, x) {
    for (var g = 0, d = "", m = [], w = [], y = 0, v = 0, I = 0, T = "", N, k, U = 0, C = 0, D, M, B = 0, Y = 0, he = Array.isArray(x.CellXf), W, ee = [], ne = [], De = Array.isArray(o), H = [], _e = {}, Se = !1, O = !!l.sheetStubs, P = c.split(t), R = 0, L = P.length; R != L; ++R) {
      d = P[R].trim();
      var Q = d.length;
      if (Q !== 0) {
        var fe = 0;
        e: for (g = 0; g < Q; ++g) switch (
          /*x.charCodeAt(ri)*/
          d[g]
        ) {
          case ">":
            if (
              /*x.charCodeAt(ri-1) != 47*/
              d[g - 1] != "/"
            ) {
              ++g;
              break e;
            }
            if (l && l.cellStyles) {
              if (k = Te(d.slice(fe, g), !0), U = k.r != null ? parseInt(k.r, 10) : U + 1, C = -1, l.sheetRows && l.sheetRows < U) continue;
              _e = {}, Se = !1, k.ht && (Se = !0, _e.hpt = parseFloat(k.ht), _e.hpx = Zn(_e.hpt)), k.hidden == "1" && (Se = !0, _e.hidden = !0), k.outlineLevel != null && (Se = !0, _e.level = +k.outlineLevel), Se && (H[U - 1] = _e);
            }
            break;
          case "<":
            fe = g;
            break;
        }
        if (fe >= g) break;
        if (k = Te(d.slice(fe, g), !0), U = k.r != null ? parseInt(k.r, 10) : U + 1, C = -1, !(l.sheetRows && l.sheetRows < U)) {
          h.s.r > U - 1 && (h.s.r = U - 1), h.e.r < U - 1 && (h.e.r = U - 1), l && l.cellStyles && (_e = {}, Se = !1, k.ht && (Se = !0, _e.hpt = parseFloat(k.ht), _e.hpx = Zn(_e.hpt)), k.hidden == "1" && (Se = !0, _e.hidden = !0), k.outlineLevel != null && (Se = !0, _e.level = +k.outlineLevel), Se && (H[U - 1] = _e)), m = d.slice(g).split(e);
          for (var ce = 0; ce != m.length && m[ce].trim().charAt(0) == "<"; ++ce) ;
          for (m = m.slice(ce), g = 0; g != m.length; ++g)
            if (d = m[g].trim(), d.length !== 0) {
              if (w = d.match(r), y = g, v = 0, I = 0, d = "<c " + (d.slice(0, 1) == "<" ? ">" : "") + d, w != null && w.length === 2) {
                for (y = 0, T = w[1], v = 0; v != T.length && !((I = T.charCodeAt(v) - 64) < 1 || I > 26); ++v)
                  y = 26 * y + I;
                --y, C = y;
              } else ++C;
              for (v = 0; v != d.length && d.charCodeAt(v) !== 62; ++v) ;
              if (++v, k = Te(d.slice(0, v), !0), k.r || (k.r = ye({ r: U - 1, c: C })), T = d.slice(v), N = { t: "" }, (w = T.match(i)) != null && /*::cref != null && */
              w[1] !== "" && (N.v = Pe(w[1])), l.cellFormula) {
                if ((w = T.match(s)) != null && /*::cref != null && */
                w[1] !== "") {
                  if (N.f = Pe(ze(w[1])).replace(/\r\n/g, `
`), l.xlfn || (N.f = kf(N.f)), /*::cref != null && cref[0] != null && */
                  w[0].indexOf('t="array"') > -1)
                    N.F = (T.match(a) || [])[1], N.F.indexOf(":") > -1 && ee.push([Me(N.F), N.F]);
                  else if (
                    /*::cref != null && cref[0] != null && */
                    w[0].indexOf('t="shared"') > -1
                  ) {
                    M = Te(w[0]);
                    var ie = Pe(ze(w[1]));
                    l.xlfn || (ie = kf(ie)), ne[parseInt(M.si, 10)] = [M, ie, k.r];
                  }
                } else (w = T.match(/<f[^>]*\/>/)) && (M = Te(w[0]), ne[M.si] && (N.f = xm(ne[M.si][1], ne[M.si][2], k.r)));
                var te = er(k.r);
                for (v = 0; v < ee.length; ++v)
                  te.r >= ee[v][0].s.r && te.r <= ee[v][0].e.r && te.c >= ee[v][0].s.c && te.c <= ee[v][0].e.c && (N.F = ee[v][1]);
              }
              if (k.t == null && N.v === void 0)
                if (N.f || N.F)
                  N.v = 0, N.t = "n";
                else if (O) N.t = "z";
                else continue;
              else N.t = k.t || "n";
              switch (h.s.c > C && (h.s.c = C), h.e.c < C && (h.e.c = C), N.t) {
                case "n":
                  if (N.v == "" || N.v == null) {
                    if (!O) continue;
                    N.t = "z";
                  } else N.v = parseFloat(N.v);
                  break;
                case "s":
                  if (typeof N.v > "u") {
                    if (!O) continue;
                    N.t = "z";
                  } else
                    D = Aa[parseInt(N.v, 10)], N.v = D.t, N.r = D.r, l.cellHTML && (N.h = D.h);
                  break;
                case "str":
                  N.t = "s", N.v = N.v != null ? ze(N.v) : "", l.cellHTML && (N.h = Vs(N.v));
                  break;
                case "inlineStr":
                  w = T.match(n), N.t = "s", w != null && (D = t0(w[1])) ? (N.v = D.t, l.cellHTML && (N.h = D.h)) : N.v = "";
                  break;
                case "b":
                  N.v = je(N.v);
                  break;
                case "d":
                  l.cellDates ? N.v = Ye(N.v, 1) : (N.v = gr(Ye(N.v, 1)), N.t = "n");
                  break;
                case "e":
                  (!l || l.cellText !== !1) && (N.w = N.v), N.v = Yc[N.v];
                  break;
              }
              if (B = Y = 0, W = null, he && k.s !== void 0 && (W = x.CellXf[k.s], W != null && (W.numFmtId != null && (B = W.numFmtId), l.cellStyles && W.fillId != null && (Y = W.fillId))), Xo(N, B, Y, l, u, x), l.cellDates && he && N.t == "n" && ra(Ee[B]) && (N.t = "d", N.v = Wi(N.v)), k.cm && l.xlmeta) {
                var be = (l.xlmeta.Cell || [])[+k.cm - 1];
                be && be.type == "XLDAPR" && (N.D = !0);
              }
              if (De) {
                var b = er(k.r);
                o[b.r] || (o[b.r] = []), o[b.r][b.c] = N;
              } else o[k.r] = N;
            }
        }
      }
    }
    H.length > 0 && (o["!rows"] = H);
  };
}();
function v2(e, t, r, n) {
  var a = [], i = [], s = Me(e["!ref"]), f = "", c, o = "", l = [], h = 0, u = 0, x = e["!rows"], g = Array.isArray(e), d = { r: o }, m, w = -1;
  for (u = s.s.c; u <= s.e.c; ++u) l[u] = Qe(u);
  for (h = s.s.r; h <= s.e.r; ++h) {
    for (i = [], o = cr(h), u = s.s.c; u <= s.e.c; ++u) {
      c = l[u] + o;
      var y = g ? (e[h] || [])[u] : e[c];
      y !== void 0 && (f = m2(y, c, e, t)) != null && i.push(f);
    }
    (i.length > 0 || x && x[h]) && (d = { r: o }, x && x[h] && (m = x[h], m.hidden && (d.hidden = 1), w = -1, m.hpx ? w = Va(m.hpx) : m.hpt && (w = m.hpt), w > -1 && (d.ht = w, d.customHeight = 1), m.level && (d.outlineLevel = m.level)), a[a.length] = oe("row", i.join(""), d));
  }
  if (x) for (; h < x.length; ++h)
    x && x[h] && (d = { r: h + 1 }, m = x[h], m.hidden && (d.hidden = 1), w = -1, m.hpx ? w = Va(m.hpx) : m.hpt && (w = m.hpt), w > -1 && (d.ht = w, d.customHeight = 1), m.level && (d.outlineLevel = m.level), a[a.length] = oe("row", "", d));
  return a.join("");
}
function Yo(e, t, r, n) {
  var a = [or, oe("worksheet", null, {
    xmlns: Fn[0],
    "xmlns:r": dr.r
  })], i = r.SheetNames[e], s = 0, f = "", c = r.Sheets[i];
  c == null && (c = {});
  var o = c["!ref"] || "A1", l = Me(o);
  if (l.e.c > 16383 || l.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + o + " exceeds format limit A1:XFD1048576");
    l.e.c = Math.min(l.e.c, 16383), l.e.r = Math.min(l.e.c, 1048575), o = Ae(l);
  }
  n || (n = {}), c["!comments"] = [];
  var h = [];
  t2(c, r, e, t, a), a[a.length] = oe("dimension", null, { ref: o }), a[a.length] = g2(c, t, e, r), t.sheetFormat && (a[a.length] = oe("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), c["!cols"] != null && c["!cols"].length > 0 && (a[a.length] = l2(c, c["!cols"])), a[s = a.length] = "<sheetData/>", c["!links"] = [], c["!ref"] != null && (f = v2(c, t), f.length > 0 && (a[a.length] = f)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), c["!protect"] && (a[a.length] = i2(c["!protect"])), c["!autofilter"] != null && (a[a.length] = u2(c["!autofilter"], c, r, e)), c["!merges"] != null && c["!merges"].length > 0 && (a[a.length] = e2(c["!merges"]));
  var u = -1, x, g = -1;
  return (
    /*::(*/
    c["!links"].length > 0 && (a[a.length] = "<hyperlinks>", c["!links"].forEach(function(d) {
      d[1].Target && (x = { ref: d[0] }, d[1].Target.charAt(0) != "#" && (g = Ve(n, -1, $e(d[1].Target).replace(/#.*$/, ""), Ie.HLINK), x["r:id"] = "rId" + g), (u = d[1].Target.indexOf("#")) > -1 && (x.location = $e(d[1].Target.slice(u + 1))), d[1].Tooltip && (x.tooltip = $e(d[1].Tooltip)), a[a.length] = oe("hyperlink", null, x));
    }), a[a.length] = "</hyperlinks>"), delete c["!links"], c["!margins"] != null && (a[a.length] = c2(c["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (a[a.length] = Er("ignoredErrors", oe("ignoredError", null, { numberStoredAsText: 1, sqref: o }))), h.length > 0 && (g = Ve(n, -1, "../drawings/drawing" + (e + 1) + ".xml", Ie.DRAW), a[a.length] = oe("drawing", null, { "r:id": "rId" + g }), c["!drawing"] = h), c["!comments"].length > 0 && (g = Ve(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", Ie.VML), a[a.length] = oe("legacyDrawing", null, { "r:id": "rId" + g }), c["!legacy"] = g), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("")
  );
}
function w2(e, t) {
  var r = {}, n = e.l + t;
  r.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (r.level = i & 7), i & 16 && (r.hidden = !0), i & 32 && (r.hpt = a / 20), r;
}
function _2(e, t, r) {
  var n = q(145), a = (r["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = Va(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
  var s = 0;
  a.level && (s |= a.level), a.hidden && (s |= 16), (a.hpx || a.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var f = 0, c = n.l;
  n.l += 4;
  for (var o = { r: e, c: 0 }, l = 0; l < 16; ++l)
    if (!(t.s.c > l + 1 << 10 || t.e.c < l << 10)) {
      for (var h = -1, u = -1, x = l << 10; x < l + 1 << 10; ++x) {
        o.c = x;
        var g = Array.isArray(r) ? (r[o.r] || [])[o.c] : r[ye(o)];
        g && (h < 0 && (h = x), u = x);
      }
      h < 0 || (++f, n.write_shift(4, h), n.write_shift(4, u));
    }
  var d = n.l;
  return n.l = c, n.write_shift(4, f), n.l = d, n.length > n.l ? n.slice(0, n.l) : n;
}
function E2(e, t, r, n) {
  var a = _2(n, r, t);
  (a.length > 17 || (t["!rows"] || [])[n]) && re(e, 0, a);
}
var y2 = Nn, T2 = aa;
function S2() {
}
function k2(e, t) {
  var r = {}, n = e[e.l];
  return ++e.l, r.above = !(n & 64), r.left = !(n & 128), e.l += 18, r.name = bu(e), r;
}
function A2(e, t, r) {
  r == null && (r = q(84 + 4 * e.length));
  var n = 192;
  t && (t.above && (n &= -65), t.left && (n &= -129)), r.write_shift(1, n);
  for (var a = 1; a < 3; ++a) r.write_shift(1, 0);
  return Fi({ auto: 1 }, r), r.write_shift(-4, -1), r.write_shift(-4, -1), $c(e, r), r.slice(0, r.l);
}
function F2(e) {
  var t = ut(e);
  return [t];
}
function b2(e, t, r) {
  return r == null && (r = q(8)), bn(t, r);
}
function C2(e) {
  var t = Cn(e);
  return [t];
}
function O2(e, t, r) {
  return r == null && (r = q(4)), On(t, r);
}
function N2(e) {
  var t = ut(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function I2(e, t, r) {
  return r == null && (r = q(9)), bn(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function B2(e) {
  var t = Cn(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function D2(e, t, r) {
  return r == null && (r = q(5)), On(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function R2(e) {
  var t = ut(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function L2(e, t, r) {
  return r == null && (r = q(9)), bn(t, r), r.write_shift(1, e.v), r;
}
function P2(e) {
  var t = Cn(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function M2(e, t, r) {
  return r == null && (r = q(8)), On(t, r), r.write_shift(1, e.v), r.write_shift(2, 0), r.write_shift(1, 0), r;
}
function U2(e) {
  var t = ut(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function W2(e, t, r) {
  return r == null && (r = q(12)), bn(t, r), r.write_shift(4, t.v), r;
}
function H2(e) {
  var t = Cn(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function V2(e, t, r) {
  return r == null && (r = q(8)), On(t, r), r.write_shift(4, t.v), r;
}
function $2(e) {
  var t = ut(e), r = br(e);
  return [t, r, "n"];
}
function z2(e, t, r) {
  return r == null && (r = q(16)), bn(t, r), yn(e.v, r), r;
}
function Ko(e) {
  var t = Cn(e), r = br(e);
  return [t, r, "n"];
}
function G2(e, t, r) {
  return r == null && (r = q(12)), On(t, r), yn(e.v, r), r;
}
function X2(e) {
  var t = ut(e), r = qs(e);
  return [t, r, "n"];
}
function j2(e, t, r) {
  return r == null && (r = q(12)), bn(t, r), zc(e.v, r), r;
}
function Y2(e) {
  var t = Cn(e), r = qs(e);
  return [t, r, "n"];
}
function K2(e, t, r) {
  return r == null && (r = q(8)), On(t, r), zc(e.v, r), r;
}
function J2(e) {
  var t = ut(e), r = Ys(e);
  return [t, r, "is"];
}
function q2(e) {
  var t = ut(e), r = Cr(e);
  return [t, r, "str"];
}
function Z2(e, t, r) {
  return r == null && (r = q(12 + 4 * e.v.length)), bn(t, r), vr(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Q2(e) {
  var t = Cn(e), r = Cr(e);
  return [t, r, "str"];
}
function ev(e, t, r) {
  return r == null && (r = q(8 + 4 * e.v.length)), On(t, r), vr(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function rv(e, t, r) {
  var n = e.l + t, a = ut(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var f = $i(e, n - e.l, r);
    s[3] = Ar(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function tv(e, t, r) {
  var n = e.l + t, a = ut(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var f = $i(e, n - e.l, r);
    s[3] = Ar(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function nv(e, t, r) {
  var n = e.l + t, a = ut(e);
  a.r = r["!row"];
  var i = br(e), s = [a, i, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var f = $i(e, n - e.l, r);
    s[3] = Ar(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function av(e, t, r) {
  var n = e.l + t, a = ut(e);
  a.r = r["!row"];
  var i = Cr(e), s = [a, i, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var f = $i(e, n - e.l, r);
    s[3] = Ar(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
var iv = Nn, sv = aa;
function fv(e, t) {
  return t == null && (t = q(4)), t.write_shift(4, e), t;
}
function cv(e, t) {
  var r = e.l + t, n = Nn(e), a = Ks(e), i = Cr(e), s = Cr(e), f = Cr(e);
  e.l = r;
  var c = { rfx: n, relId: a, loc: i, display: f };
  return s && (c.Tooltip = s), c;
}
function ov(e, t) {
  var r = q(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  aa({ s: er(e[0]), e: er(e[0]) }, r), Js("rId" + t, r);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return vr(a || "", r), vr(e[1].Tooltip || "", r), vr("", r), r.slice(0, r.l);
}
function lv() {
}
function hv(e, t, r) {
  var n = e.l + t, a = Gc(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, r.cellFormula) {
    var f = Rp(e, n - e.l, r);
    s[1] = f;
  } else e.l = n;
  return s;
}
function uv(e, t, r) {
  var n = e.l + t, a = Nn(e), i = [a];
  if (r.cellFormula) {
    var s = Pp(e, n - e.l, r);
    i[1] = s, e.l = n;
  } else e.l = n;
  return i;
}
function xv(e, t, r) {
  r == null && (r = q(18));
  var n = zi(e, t);
  r.write_shift(-4, e), r.write_shift(-4, e), r.write_shift(4, (n.width || 10) * 256), r.write_shift(
    4,
    0
    /*ixfe*/
  );
  var a = 0;
  return t.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), t.level && (a |= t.level << 8), r.write_shift(2, a), r;
}
var Jo = ["left", "right", "top", "bottom", "header", "footer"];
function dv(e) {
  var t = {};
  return Jo.forEach(function(r) {
    t[r] = br(e);
  }), t;
}
function gv(e, t) {
  return t == null && (t = q(6 * 8)), wn(e), Jo.forEach(function(r) {
    yn(e[r], t);
  }), t;
}
function mv(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function pv(e, t, r) {
  r == null && (r = q(30));
  var n = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (n |= 32), r.write_shift(2, n), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 100), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r;
}
function vv(e) {
  var t = q(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), aa(e, t), t;
}
function wv(e, t) {
  return t == null && (t = q(16 * 4 + 2)), t.write_shift(2, e.password ? n0(e.password) : 0), t.write_shift(4, 1), [
    ["objects", !1],
    // fObjects
    ["scenarios", !1],
    // fScenarios
    ["formatCells", !0],
    // fFormatCells
    ["formatColumns", !0],
    // fFormatColumns
    ["formatRows", !0],
    // fFormatRows
    ["insertColumns", !0],
    // fInsertColumns
    ["insertRows", !0],
    // fInsertRows
    ["insertHyperlinks", !0],
    // fInsertHyperlinks
    ["deleteColumns", !0],
    // fDeleteColumns
    ["deleteRows", !0],
    // fDeleteRows
    ["selectLockedCells", !1],
    // fSelLockedCells
    ["sort", !0],
    // fSort
    ["autoFilter", !0],
    // fAutoFilter
    ["pivotTables", !0],
    // fPivotTables
    ["selectUnlockedCells", !1]
    // fSelUnlockedCells
  ].forEach(function(r) {
    r[1] ? t.write_shift(4, e[r[0]] != null && !e[r[0]] ? 1 : 0) : t.write_shift(4, e[r[0]] != null && e[r[0]] ? 0 : 1);
  }), t;
}
function _v() {
}
function Ev() {
}
function yv(e, t, r, n, a, i, s) {
  if (!e) return e;
  var f = t || {};
  n || (n = { "!id": {} });
  var c = f.dense ? [] : {}, o, l = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, h = !1, u = !1, x, g, d, m, w, y, v, I, T, N = [];
  f.biff = 12, f["!row"] = 0;
  var k = 0, U = !1, C = [], D = {}, M = f.supbooks || /*::(*/
  a.supbooks || [[]];
  if (M.sharedf = D, M.arrayf = C, M.SheetNames = a.SheetNames || a.Sheets.map(function(De) {
    return De.name;
  }), !f.supbooks && (f.supbooks = M, a.Names))
    for (var B = 0; B < a.Names.length; ++B) M[0][B + 1] = a.Names[B];
  var Y = [], he = [], W = !1;
  $a[16] = { n: "BrtShortReal", f: Ko };
  var ee;
  if (Vt(e, function(H, _e, Se) {
    if (!u)
      switch (Se) {
        case 148:
          o = H;
          break;
        case 0:
          x = H, f.sheetRows && f.sheetRows <= x.r && (u = !0), I = cr(m = x.r), f["!row"] = x.r, (H.hidden || H.hpt || H.level != null) && (H.hpt && (H.hpx = Zn(H.hpt)), he[H.r] = H);
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 62:
          switch (g = { t: H[2] }, H[2]) {
            case "n":
              g.v = H[1];
              break;
            case "s":
              v = Aa[H[1]], g.v = v.t, g.r = v.r;
              break;
            case "b":
              g.v = !!H[1];
              break;
            case "e":
              g.v = H[1], f.cellText !== !1 && (g.w = $t[g.v]);
              break;
            case "str":
              g.t = "s", g.v = H[1];
              break;
            case "is":
              g.t = "s", g.v = H[1].t;
              break;
          }
          if ((d = s.CellXf[H[0].iStyleRef]) && Xo(g, d.numFmtId, null, f, i, s), w = H[0].c == -1 ? w + 1 : H[0].c, f.dense ? (c[m] || (c[m] = []), c[m][w] = g) : c[Qe(w) + I] = g, f.cellFormula) {
            for (U = !1, k = 0; k < C.length; ++k) {
              var O = C[k];
              x.r >= O[0].s.r && x.r <= O[0].e.r && w >= O[0].s.c && w <= O[0].e.c && (g.F = Ae(O[0]), U = !0);
            }
            !U && H.length > 3 && (g.f = H[3]);
          }
          if (l.s.r > x.r && (l.s.r = x.r), l.s.c > w && (l.s.c = w), l.e.r < x.r && (l.e.r = x.r), l.e.c < w && (l.e.c = w), f.cellDates && d && g.t == "n" && ra(Ee[d.numFmtId])) {
            var P = dn(g.v);
            P && (g.t = "d", g.v = new Date(P.y, P.m - 1, P.d, P.H, P.M, P.S, P.u));
          }
          ee && (ee.type == "XLDAPR" && (g.D = !0), ee = void 0);
          break;
        case 1:
        case 12:
          if (!f.sheetStubs || h) break;
          g = { t: "z", v: void 0 }, w = H[0].c == -1 ? w + 1 : H[0].c, f.dense ? (c[m] || (c[m] = []), c[m][w] = g) : c[Qe(w) + I] = g, l.s.r > x.r && (l.s.r = x.r), l.s.c > w && (l.s.c = w), l.e.r < x.r && (l.e.r = x.r), l.e.c < w && (l.e.c = w), ee && (ee.type == "XLDAPR" && (g.D = !0), ee = void 0);
          break;
        case 176:
          N.push(H);
          break;
        case 49:
          ee = ((f.xlmeta || {}).Cell || [])[H - 1];
          break;
        case 494:
          var R = n["!id"][H.relId];
          for (R ? (H.Target = R.Target, H.loc && (H.Target += "#" + H.loc), H.Rel = R) : H.relId == "" && (H.Target = "#" + H.loc), m = H.rfx.s.r; m <= H.rfx.e.r; ++m) for (w = H.rfx.s.c; w <= H.rfx.e.c; ++w)
            f.dense ? (c[m] || (c[m] = []), c[m][w] || (c[m][w] = { t: "z", v: void 0 }), c[m][w].l = H) : (y = ye({ c: w, r: m }), c[y] || (c[y] = { t: "z", v: void 0 }), c[y].l = H);
          break;
        case 426:
          if (!f.cellFormula) break;
          C.push(H), T = f.dense ? c[m][w] : c[Qe(w) + I], T.f = Ar(H[1], l, { r: x.r, c: w }, M, f), T.F = Ae(H[0]);
          break;
        case 427:
          if (!f.cellFormula) break;
          D[ye(H[0].s)] = H[1], T = f.dense ? c[m][w] : c[Qe(w) + I], T.f = Ar(H[1], l, { r: x.r, c: w }, M, f);
          break;
        case 60:
          if (!f.cellStyles) break;
          for (; H.e >= H.s; )
            Y[H.e--] = { width: H.w / 256, hidden: !!(H.flags & 1), level: H.level }, W || (W = !0, a0(H.w / 256)), rn(Y[H.e + 1]);
          break;
        case 161:
          c["!autofilter"] = { ref: Ae(H) };
          break;
        case 476:
          c["!margins"] = H;
          break;
        case 147:
          a.Sheets[r] || (a.Sheets[r] = {}), H.name && (a.Sheets[r].CodeName = H.name), (H.above || H.left) && (c["!outline"] = { above: H.above, left: H.left });
          break;
        case 137:
          a.Views || (a.Views = [{}]), a.Views[0] || (a.Views[0] = {}), H.RTL && (a.Views[0].RTL = !0);
          break;
        case 485:
          break;
        case 64:
        case 1053:
          break;
        case 151:
          break;
        case 152:
        case 175:
        case 644:
        case 625:
        case 562:
        case 396:
        case 1112:
        case 1146:
        case 471:
        case 1050:
        case 649:
        case 1105:
        case 589:
        case 607:
        case 564:
        case 1055:
        case 168:
        case 174:
        case 1180:
        case 499:
        case 507:
        case 550:
        case 171:
        case 167:
        case 1177:
        case 169:
        case 1181:
        case 551:
        case 552:
        case 661:
        case 639:
        case 478:
        case 537:
        case 477:
        case 536:
        case 1103:
        case 680:
        case 1104:
        case 1024:
        case 663:
        case 535:
        case 678:
        case 504:
        case 1043:
        case 428:
        case 170:
        case 3072:
        case 50:
        case 2070:
        case 1045:
          break;
        case 35:
          h = !0;
          break;
        case 36:
          h = !1;
          break;
        case 37:
          h = !0;
          break;
        case 38:
          h = !1;
          break;
        default:
          if (!_e.T) {
            if (!h || f.WTF) throw new Error("Unexpected record 0x" + Se.toString(16));
          }
      }
  }, f), delete f.supbooks, delete f["!row"], !c["!ref"] && (l.s.r < 2e6 || o && (o.e.r > 0 || o.e.c > 0 || o.s.r > 0 || o.s.c > 0)) && (c["!ref"] = Ae(o || l)), f.sheetRows && c["!ref"]) {
    var ne = Me(c["!ref"]);
    f.sheetRows <= +ne.e.r && (ne.e.r = f.sheetRows - 1, ne.e.r > l.e.r && (ne.e.r = l.e.r), ne.e.r < ne.s.r && (ne.s.r = ne.e.r), ne.e.c > l.e.c && (ne.e.c = l.e.c), ne.e.c < ne.s.c && (ne.s.c = ne.e.c), c["!fullref"] = c["!ref"], c["!ref"] = Ae(ne));
  }
  return N.length > 0 && (c["!merges"] = N), Y.length > 0 && (c["!cols"] = Y), he.length > 0 && (c["!rows"] = he), c;
}
function Tv(e, t, r, n, a, i, s) {
  if (t.v === void 0) return !1;
  var f = "";
  switch (t.t) {
    case "b":
      f = t.v ? "1" : "0";
      break;
    case "d":
      t = Ke(t), t.z = t.z || Ee[14], t.v = gr(Ye(t.v)), t.t = "n";
      break;
    case "n":
    case "e":
      f = "" + t.v;
      break;
    default:
      f = t.v;
      break;
  }
  var c = { r, c: n };
  switch (c.s = on(a.cellXfs, t, a), t.l && i["!links"].push([ye(c), t.l]), t.c && i["!comments"].push([ye(c), t.c]), t.t) {
    case "s":
    case "str":
      return a.bookSST ? (f = o0(a.Strings, t.v, a.revStrings), c.t = "s", c.v = f, s ? re(e, 18, V2(t, c)) : re(e, 7, W2(t, c))) : (c.t = "str", s ? re(e, 17, ev(t, c)) : re(e, 6, Z2(t, c))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? s ? re(e, 13, K2(t, c)) : re(e, 2, j2(t, c)) : s ? re(e, 16, G2(t, c)) : re(e, 5, z2(t, c)), !0;
    case "b":
      return c.t = "b", s ? re(e, 15, D2(t, c)) : re(e, 4, I2(t, c)), !0;
    case "e":
      return c.t = "e", s ? re(e, 14, M2(t, c)) : re(e, 3, L2(t, c)), !0;
  }
  return s ? re(e, 12, O2(t, c)) : re(e, 1, b2(t, c)), !0;
}
function Sv(e, t, r, n) {
  var a = Me(t["!ref"] || "A1"), i, s = "", f = [];
  re(
    e,
    145
    /* BrtBeginSheetData */
  );
  var c = Array.isArray(t), o = a.e.r;
  t["!rows"] && (o = Math.max(a.e.r, t["!rows"].length - 1));
  for (var l = a.s.r; l <= o; ++l) {
    s = cr(l), E2(e, t, a, l);
    var h = !1;
    if (l <= a.e.r) for (var u = a.s.c; u <= a.e.c; ++u) {
      l === a.s.r && (f[u] = Qe(u)), i = f[u] + s;
      var x = c ? (t[l] || [])[u] : t[i];
      if (!x) {
        h = !1;
        continue;
      }
      h = Tv(e, x, l, u, n, t, h);
    }
  }
  re(
    e,
    146
    /* BrtEndSheetData */
  );
}
function kv(e, t) {
  !t || !t["!merges"] || (re(e, 177, fv(t["!merges"].length)), t["!merges"].forEach(function(r) {
    re(e, 176, sv(r));
  }), re(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function Av(e, t) {
  !t || !t["!cols"] || (re(
    e,
    390
    /* BrtBeginColInfos */
  ), t["!cols"].forEach(function(r, n) {
    r && re(e, 60, xv(n, r));
  }), re(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function Fv(e, t) {
  !t || !t["!ref"] || (re(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), re(e, 649, vv(Me(t["!ref"]))), re(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function bv(e, t, r) {
  t["!links"].forEach(function(n) {
    if (n[1].Target) {
      var a = Ve(r, -1, n[1].Target.replace(/#.*$/, ""), Ie.HLINK);
      re(e, 494, ov(n, a));
    }
  }), delete t["!links"];
}
function Cv(e, t, r, n) {
  if (t["!comments"].length > 0) {
    var a = Ve(n, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", Ie.VML);
    re(e, 551, Js("rId" + a)), t["!legacy"] = a;
  }
}
function Ov(e, t, r, n) {
  if (t["!autofilter"]) {
    var a = t["!autofilter"], i = typeof a.ref == "string" ? a.ref : Ae(a.ref);
    r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
    var s = r.Workbook.Names, f = Hr(i);
    f.s.r == f.e.r && (f.e.r = Hr(t["!ref"]).e.r, i = Ae(f));
    for (var c = 0; c < s.length; ++c) {
      var o = s[c];
      if (o.Name == "_xlnm._FilterDatabase" && o.Sheet == n) {
        o.Ref = "'" + r.SheetNames[n] + "'!" + i;
        break;
      }
    }
    c == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + i }), re(e, 161, aa(Me(i))), re(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function Nv(e, t, r) {
  re(
    e,
    133
    /* BrtBeginWsViews */
  ), re(e, 137, pv(t, r)), re(
    e,
    138
    /* BrtEndWsView */
  ), re(
    e,
    134
    /* BrtEndWsViews */
  );
}
function Iv(e, t) {
  t["!protect"] && re(e, 535, wv(t["!protect"]));
}
function Bv(e, t, r, n) {
  var a = Wr(), i = r.SheetNames[e], s = r.Sheets[i] || {}, f = i;
  try {
    r && r.Workbook && (f = r.Workbook.Sheets[e].CodeName || f);
  } catch {
  }
  var c = Me(s["!ref"] || "A1");
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], re(
    a,
    129
    /* BrtBeginSheet */
  ), (r.vbaraw || s["!outline"]) && re(a, 147, A2(f, s["!outline"])), re(a, 148, T2(c)), Nv(a, s, r.Workbook), Av(a, s), Sv(a, s, e, t), Iv(a, s), Ov(a, s, r, e), kv(a, s), bv(a, s, n), s["!margins"] && re(a, 476, gv(s["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && Fv(a, s), Cv(a, s, e, n), re(
    a,
    130
    /* BrtEndSheet */
  ), a.end();
}
function Dv(e) {
  var t = [], r = e.match(/^<c:numCache>/), n;
  (e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/mg) || []).forEach(function(i) {
    var s = i.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);
    s && (t[+s[1]] = r ? +s[2] : s[2]);
  });
  var a = Pe((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/) || ["", "General"])[1]);
  return (e.match(/<c:f>(.*?)<\/c:f>/mg) || []).forEach(function(i) {
    n = i.replace(/<.*?>/g, "");
  }), [t, a, n];
}
function Rv(e, t, r, n, a, i) {
  var s = i || { "!type": "chart" };
  if (!e) return i;
  var f = 0, c = 0, o = "A", l = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } };
  return (e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm) || []).forEach(function(h) {
    var u = Dv(h);
    l.s.r = l.s.c = 0, l.e.c = f, o = Qe(f), u[0].forEach(function(x, g) {
      s[o + cr(g)] = { t: "n", v: x, z: u[1] }, c = g;
    }), l.e.r < c && (l.e.r = c), ++f;
  }), f > 0 && (s["!ref"] = Ae(l)), s;
}
function Lv(e, t, r, n, a) {
  if (!e) return e;
  n || (n = { "!id": {} });
  var i = { "!type": "chart", "!drawel": null, "!rel": "" }, s, f = e.match(jo);
  return f && l0(f[0], i, a, r), (s = e.match(/drawing r:id="(.*?)"/)) && (i["!rel"] = s[1]), n["!id"][i["!rel"]] && (i["!drawel"] = n["!id"][i["!rel"]]), i;
}
function Pv(e, t) {
  e.l += 10;
  var r = Cr(e);
  return { name: r };
}
function Mv(e, t, r, n, a) {
  if (!e) return e;
  n || (n = { "!id": {} });
  var i = { "!type": "chart", "!drawel": null, "!rel": "" }, s = !1;
  return Vt(e, function(c, o, l) {
    switch (l) {
      case 550:
        i["!rel"] = c;
        break;
      case 651:
        a.Sheets[r] || (a.Sheets[r] = {}), c.name && (a.Sheets[r].CodeName = c.name);
        break;
      case 562:
      case 652:
      case 669:
      case 679:
      case 551:
      case 552:
      case 476:
      case 3072:
        break;
      case 35:
        s = !0;
        break;
      case 36:
        s = !1;
        break;
      case 37:
        break;
      case 38:
        break;
      default:
        if (!(o.T > 0)) {
          if (!(o.T < 0)) {
            if (!s || t.WTF) throw new Error("Unexpected record 0x" + l.toString(16));
          }
        }
    }
  }, t), n["!id"][i["!rel"]] && (i["!drawel"] = n["!id"][i["!rel"]]), i;
}
var h0 = [
  ["allowRefreshQuery", !1, "bool"],
  ["autoCompressPictures", !0, "bool"],
  ["backupFile", !1, "bool"],
  ["checkCompatibility", !1, "bool"],
  ["CodeName", ""],
  ["date1904", !1, "bool"],
  ["defaultThemeVersion", 0, "int"],
  ["filterPrivacy", !1, "bool"],
  ["hidePivotFieldList", !1, "bool"],
  ["promptedSolutions", !1, "bool"],
  ["publishItems", !1, "bool"],
  ["refreshAllConnections", !1, "bool"],
  ["saveExternalLinkValues", !0, "bool"],
  ["showBorderUnselectedTables", !0, "bool"],
  ["showInkAnnotation", !0, "bool"],
  ["showObjects", "all"],
  ["showPivotChartFilter", !1, "bool"],
  ["updateLinks", "userSet"]
], Uv = [
  ["activeTab", 0, "int"],
  ["autoFilterDateGrouping", !0, "bool"],
  ["firstSheet", 0, "int"],
  ["minimized", !1, "bool"],
  ["showHorizontalScroll", !0, "bool"],
  ["showSheetTabs", !0, "bool"],
  ["showVerticalScroll", !0, "bool"],
  ["tabRatio", 600, "int"],
  ["visibility", "visible"]
  //window{Height,Width}, {x,y}Window
], Wv = [
  //['state', 'visible']
], Hv = [
  ["calcCompleted", "true"],
  ["calcMode", "auto"],
  ["calcOnSave", "true"],
  ["concurrentCalc", "true"],
  ["fullCalcOnLoad", "false"],
  ["fullPrecision", "true"],
  ["iterate", "false"],
  ["iterateCount", "100"],
  ["iterateDelta", "0.001"],
  ["refMode", "A1"]
];
function Of(e, t) {
  for (var r = 0; r != e.length; ++r)
    for (var n = e[r], a = 0; a != t.length; ++a) {
      var i = t[a];
      if (n[i[0]] == null) n[i[0]] = i[1];
      else switch (i[2]) {
        case "bool":
          typeof n[i[0]] == "string" && (n[i[0]] = je(n[i[0]]));
          break;
        case "int":
          typeof n[i[0]] == "string" && (n[i[0]] = parseInt(n[i[0]], 10));
          break;
      }
    }
}
function Nf(e, t) {
  for (var r = 0; r != t.length; ++r) {
    var n = t[r];
    if (e[n[0]] == null) e[n[0]] = n[1];
    else switch (n[2]) {
      case "bool":
        typeof e[n[0]] == "string" && (e[n[0]] = je(e[n[0]]));
        break;
      case "int":
        typeof e[n[0]] == "string" && (e[n[0]] = parseInt(e[n[0]], 10));
        break;
    }
  }
}
function qo(e) {
  Nf(e.WBProps, h0), Nf(e.CalcPr, Hv), Of(e.WBView, Uv), Of(e.Sheets, Wv), Yn.date1904 = je(e.WBProps.date1904);
}
function Vv(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : je(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var $v = /* @__PURE__ */ "][*?/\\".split("");
function Zo(e, t) {
  if (e.length > 31)
    throw new Error("Sheet names cannot exceed 31 chars");
  var r = !0;
  return $v.forEach(function(n) {
    if (e.indexOf(n) != -1)
      throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
  }), r;
}
function zv(e, t, r) {
  e.forEach(function(n, a) {
    Zo(n);
    for (var i = 0; i < a; ++i) if (n == e[i]) throw new Error("Duplicate Sheet Name: " + n);
    if (r) {
      var s = t && t[a] && t[a].CodeName || n;
      if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function Gv(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  zv(e.SheetNames, t, !!e.vbaraw);
  for (var r = 0; r < e.SheetNames.length; ++r) Vp(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r);
}
var Xv = /<\w+:workbook/;
function jv(e, t) {
  if (!e) throw new Error("Could not find file");
  var r = (
    /*::(*/
    { AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, Names: [], xmlns: "" }
  ), n = !1, a = "xmlns", i = {}, s = 0;
  if (e.replace(Nr, function(c, o) {
    var l = Te(c);
    switch (Ft(l[0])) {
      case "<?xml":
        break;
      case "<workbook":
        c.match(Xv) && (a = "xmlns" + c.match(/<(\w+):/)[1]), r.xmlns = l[a];
        break;
      case "</workbook>":
        break;
      case "<fileVersion":
        delete l[0], r.AppVersion = l;
        break;
      case "<fileVersion/>":
      case "</fileVersion>":
        break;
      case "<fileSharing":
        break;
      case "<fileSharing/>":
        break;
      case "<workbookPr":
      case "<workbookPr/>":
        h0.forEach(function(h) {
          if (l[h[0]] != null)
            switch (h[2]) {
              case "bool":
                r.WBProps[h[0]] = je(l[h[0]]);
                break;
              case "int":
                r.WBProps[h[0]] = parseInt(l[h[0]], 10);
                break;
              default:
                r.WBProps[h[0]] = l[h[0]];
            }
        }), l.codeName && (r.WBProps.CodeName = ze(l.codeName));
        break;
      case "</workbookPr>":
        break;
      case "<workbookProtection":
        break;
      case "<workbookProtection/>":
        break;
      case "<bookViews":
      case "<bookViews>":
      case "</bookViews>":
        break;
      case "<workbookView":
      case "<workbookView/>":
        delete l[0], r.WBView.push(l);
        break;
      case "</workbookView>":
        break;
      case "<sheets":
      case "<sheets>":
      case "</sheets>":
        break;
      case "<sheet":
        switch (l.state) {
          case "hidden":
            l.Hidden = 1;
            break;
          case "veryHidden":
            l.Hidden = 2;
            break;
          default:
            l.Hidden = 0;
        }
        delete l.state, l.name = Pe(ze(l.name)), delete l[0], r.Sheets.push(l);
        break;
      case "</sheet>":
        break;
      case "<functionGroups":
      case "<functionGroups/>":
        break;
      case "<functionGroup":
        break;
      case "<externalReferences":
      case "</externalReferences>":
      case "<externalReferences>":
        break;
      case "<externalReference":
        break;
      case "<definedNames/>":
        break;
      case "<definedNames>":
      case "<definedNames":
        n = !0;
        break;
      case "</definedNames>":
        n = !1;
        break;
      case "<definedName":
        i = {}, i.Name = ze(l.name), l.comment && (i.Comment = l.comment), l.localSheetId && (i.Sheet = +l.localSheetId), je(l.hidden || "0") && (i.Hidden = !0), s = o + c.length;
        break;
      case "</definedName>":
        i.Ref = Pe(ze(e.slice(s, o))), r.Names.push(i);
        break;
      case "<definedName/>":
        break;
      case "<calcPr":
        delete l[0], r.CalcPr = l;
        break;
      case "<calcPr/>":
        delete l[0], r.CalcPr = l;
        break;
      case "</calcPr>":
        break;
      case "<oleSize":
        break;
      case "<customWorkbookViews>":
      case "</customWorkbookViews>":
      case "<customWorkbookViews":
        break;
      case "<customWorkbookView":
      case "</customWorkbookView>":
        break;
      case "<pivotCaches>":
      case "</pivotCaches>":
      case "<pivotCaches":
        break;
      case "<pivotCache":
        break;
      case "<smartTagPr":
      case "<smartTagPr/>":
        break;
      case "<smartTagTypes":
      case "<smartTagTypes>":
      case "</smartTagTypes>":
        break;
      case "<smartTagType":
        break;
      case "<webPublishing":
      case "<webPublishing/>":
        break;
      case "<fileRecoveryPr":
      case "<fileRecoveryPr/>":
        break;
      case "<webPublishObjects>":
      case "<webPublishObjects":
      case "</webPublishObjects>":
        break;
      case "<webPublishObject":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        n = !0;
        break;
      case "</ext>":
        n = !1;
        break;
      case "<ArchID":
        break;
      case "<AlternateContent":
      case "<AlternateContent>":
        n = !0;
        break;
      case "</AlternateContent>":
        n = !1;
        break;
      case "<revisionPtr":
        break;
      default:
        if (!n && t.WTF) throw new Error("unrecognized " + l[0] + " in workbook");
    }
    return c;
  }), Fn.indexOf(r.xmlns) === -1) throw new Error("Unknown Namespace: " + r.xmlns);
  return qo(r), r;
}
function Qo(e) {
  var t = [or];
  t[t.length] = oe("workbook", null, {
    xmlns: Fn[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": dr.r
  });
  var r = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (h0.forEach(function(f) {
    e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (n[f[0]] = e.Workbook.WBProps[f[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), t[t.length] = oe("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: $e(e.SheetNames[i].slice(0, 31)) };
    if (s.sheetId = "" + (i + 1), s["r:id"] = "rId" + (i + 1), a[i]) switch (a[i].Hidden) {
      case 1:
        s.state = "hidden";
        break;
      case 2:
        s.state = "veryHidden";
        break;
    }
    t[t.length] = oe("sheet", null, s);
  }
  return t[t.length] = "</sheets>", r && (t[t.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(f) {
    var c = { name: f.Name };
    f.Comment && (c.comment = f.Comment), f.Sheet != null && (c.localSheetId = "" + f.Sheet), f.Hidden && (c.hidden = "1"), f.Ref && (t[t.length] = oe("definedName", $e(f.Ref), c));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Yv(e, t) {
  var r = {};
  return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = ws(e), r.name = Cr(e), r;
}
function Kv(e, t) {
  return t || (t = q(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), Js(e.strRelID, t), vr(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Jv(e, t) {
  var r = {}, n = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var a = t > 8 ? Cr(e) : "";
  return a.length > 0 && (r.CodeName = a), r.autoCompressPictures = !!(n & 65536), r.backupFile = !!(n & 64), r.checkCompatibility = !!(n & 4096), r.date1904 = !!(n & 1), r.filterPrivacy = !!(n & 8), r.hidePivotFieldList = !!(n & 1024), r.promptedSolutions = !!(n & 16), r.publishItems = !!(n & 2048), r.refreshAllConnections = !!(n & 262144), r.saveExternalLinkValues = !!(n & 128), r.showBorderUnselectedTables = !!(n & 4), r.showInkAnnotation = !!(n & 32), r.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], r.showPivotChartFilter = !!(n & 32768), r.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], r;
}
function qv(e, t) {
  t || (t = q(72));
  var r = 0;
  return e && e.filterPrivacy && (r |= 8), t.write_shift(4, r), t.write_shift(4, 0), $c(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}
function Zv(e, t) {
  var r = {};
  return e.read_shift(4), r.ArchID = e.read_shift(4), e.l += t - 8, r;
}
function Qv(e, t, r) {
  var n = e.l + t;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = Cu(e), s = Lp(e, 0, r), f = Ks(e);
  e.l = n;
  var c = { Name: i, Ptg: s };
  return a < 268435455 && (c.Sheet = a), f && (c.Comment = f), c;
}
function ew(e, t) {
  var r = { AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, xmlns: "" }, n = [], a = !1;
  t || (t = {}), t.biff = 12;
  var i = [], s = [[]];
  return s.SheetNames = [], s.XTI = [], $a[16] = { n: "BrtFRTArchID$", f: Zv }, Vt(e, function(c, o, l) {
    switch (l) {
      case 156:
        s.SheetNames.push(c.name), r.Sheets.push(c);
        break;
      case 153:
        r.WBProps = c;
        break;
      case 39:
        c.Sheet != null && (t.SID = c.Sheet), c.Ref = Ar(c.Ptg, null, null, s, t), delete t.SID, delete c.Ptg, i.push(c);
        break;
      case 1036:
        break;
      case 357:
      case 358:
      case 355:
      case 667:
        s[0].length ? s.push([l, c]) : s[0] = [l, c], s[s.length - 1].XTI = [];
        break;
      case 362:
        s.length === 0 && (s[0] = [], s[0].XTI = []), s[s.length - 1].XTI = s[s.length - 1].XTI.concat(c), s.XTI = s.XTI.concat(c);
        break;
      case 361:
        break;
      case 2071:
      case 158:
      case 143:
      case 664:
      case 353:
        break;
      case 3072:
      case 3073:
      case 534:
      case 677:
      case 157:
      case 610:
      case 2050:
      case 155:
      case 548:
      case 676:
      case 128:
      case 665:
      case 2128:
      case 2125:
      case 549:
      case 2053:
      case 596:
      case 2076:
      case 2075:
      case 2082:
      case 397:
      case 154:
      case 1117:
      case 553:
      case 2091:
        break;
      case 35:
        n.push(l), a = !0;
        break;
      case 36:
        n.pop(), a = !1;
        break;
      case 37:
        n.push(l), a = !0;
        break;
      case 38:
        n.pop(), a = !1;
        break;
      case 16:
        break;
      default:
        if (!o.T) {
          if (!a || t.WTF && n[n.length - 1] != 37 && n[n.length - 1] != 35) throw new Error("Unexpected record 0x" + l.toString(16));
        }
    }
  }, t), qo(r), r.Names = i, r.supbooks = s, r;
}
function rw(e, t) {
  re(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var r = 0; r != t.SheetNames.length; ++r) {
    var n = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[r] && t.Workbook.Sheets[r].Hidden || 0, a = { Hidden: n, iTabID: r + 1, strRelID: "rId" + (r + 1), name: t.SheetNames[r] };
    re(e, 156, Kv(a));
  }
  re(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function tw(e, t) {
  t || (t = q(127));
  for (var r = 0; r != 4; ++r) t.write_shift(4, 0);
  return vr("SheetJS", t), vr(_i.version, t), vr(_i.version, t), vr("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function nw(e, t) {
  t || (t = q(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var r = 120;
  return t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t;
}
function aw(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var r = t.Workbook.Sheets, n = 0, a = -1, i = -1; n < r.length; ++n)
      !r[n] || !r[n].Hidden && a == -1 ? a = n : r[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (re(
      e,
      135
      /* BrtBeginBookViews */
    ), re(e, 158, nw(a)), re(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function iw(e, t) {
  var r = Wr();
  return re(
    r,
    131
    /* BrtBeginBook */
  ), re(r, 128, tw()), re(r, 153, qv(e.Workbook && e.Workbook.WBProps || null)), aw(r, e), rw(r, e), re(
    r,
    132
    /* BrtEndBook */
  ), r.end();
}
function sw(e, t, r) {
  return t.slice(-4) === ".bin" ? ew(e, r) : jv(e, r);
}
function fw(e, t, r, n, a, i, s, f) {
  return t.slice(-4) === ".bin" ? yv(e, n, r, a, i, s, f) : Qp(e, n, r, a, i, s, f);
}
function cw(e, t, r, n, a, i, s, f) {
  return t.slice(-4) === ".bin" ? Mv(e, n, r, a, i) : Lv(e, n, r, a, i);
}
function ow(e, t, r, n, a, i, s, f) {
  return t.slice(-4) === ".bin" ? hm() : um();
}
function lw(e, t, r, n, a, i, s, f) {
  return t.slice(-4) === ".bin" ? om() : lm();
}
function hw(e, t, r, n) {
  return t.slice(-4) === ".bin" ? sg(e, r, n) : Yd(e, r, n);
}
function uw(e, t, r) {
  return Bo(e, r);
}
function xw(e, t, r) {
  return t.slice(-4) === ".bin" ? xd(e, r) : ld(e, r);
}
function dw(e, t, r) {
  return t.slice(-4) === ".bin" ? am(e, r) : Kg(e, r);
}
function gw(e, t, r) {
  return t.slice(-4) === ".bin" ? Xg(e) : zg(e);
}
function mw(e, t, r, n) {
  return r.slice(-4) === ".bin" ? jg(e, t, r, n) : void 0;
}
function pw(e, t, r) {
  return t.slice(-4) === ".bin" ? Hg(e, t, r) : $g(e, t, r);
}
function vw(e, t, r) {
  return (t.slice(-4) === ".bin" ? iw : Qo)(e);
}
function ww(e, t, r, n, a) {
  return (t.slice(-4) === ".bin" ? Bv : Yo)(e, r, n, a);
}
function _w(e, t, r) {
  return (t.slice(-4) === ".bin" ? mg : No)(e, r);
}
function Ew(e, t, r) {
  return (t.slice(-4) === ".bin" ? md : To)(e, r);
}
function yw(e, t, r) {
  return (t.slice(-4) === ".bin" ? im : Lo)(e);
}
function Tw(e) {
  return (e.slice(-4) === ".bin" ? Vg : Do)();
}
var el = /([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g, rl = /([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;
function xt(e, t) {
  var r = e.split(/\s+/), n = [];
  if (n[0] = r[0], r.length === 1) return n;
  var a = e.match(el), i, s, f, c;
  if (a) for (c = 0; c != a.length; ++c)
    i = a[c].match(rl), (s = i[1].indexOf(":")) === -1 ? n[i[1]] = i[2].slice(1, i[2].length - 1) : (i[1].slice(0, 6) === "xmlns:" ? f = "xmlns" + i[1].slice(6) : f = i[1].slice(s + 1), n[f] = i[2].slice(1, i[2].length - 1));
  return n;
}
function Sw(e) {
  var t = e.split(/\s+/), r = {};
  if (t.length === 1) return r;
  var n = e.match(el), a, i, s, f;
  if (n) for (f = 0; f != n.length; ++f)
    a = n[f].match(rl), (i = a[1].indexOf(":")) === -1 ? r[a[1]] = a[2].slice(1, a[2].length - 1) : (a[1].slice(0, 6) === "xmlns:" ? s = "xmlns" + a[1].slice(6) : s = a[1].slice(i + 1), r[s] = a[2].slice(1, a[2].length - 1));
  return r;
}
var ba;
function kw(e, t) {
  var r = ba[e] || Pe(e);
  return r === "General" ? _n(t) : ht(r, t);
}
function Aw(e, t, r, n) {
  var a = n;
  switch ((r[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
    case "boolean":
      a = je(n);
      break;
    case "i2":
    case "int":
      a = parseInt(n, 10);
      break;
    case "r4":
    case "float":
      a = parseFloat(n);
      break;
    case "date":
    case "dateTime.tz":
      a = Ye(n);
      break;
    case "i8":
    case "string":
    case "fixed":
    case "uuid":
    case "bin.base64":
      break;
    default:
      throw new Error("bad custprop:" + r[0]);
  }
  e[Pe(t)] = a;
}
function Fw(e, t, r) {
  if (e.t !== "z") {
    if (!r || r.cellText !== !1) try {
      e.t === "e" ? e.w = e.w || $t[e.v] : t === "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = Da(e.v) : e.w = _n(e.v) : e.w = kw(t || "General", e.v);
    } catch (i) {
      if (r.WTF) throw i;
    }
    try {
      var n = ba[t] || t || "General";
      if (r.cellNF && (e.z = n), r.cellDates && e.t == "n" && ra(n)) {
        var a = dn(e.v);
        a && (e.t = "d", e.v = new Date(a.y, a.m - 1, a.d, a.H, a.M, a.S, a.u));
      }
    } catch (i) {
      if (r.WTF) throw i;
    }
  }
}
function bw(e, t, r) {
  if (r.cellStyles && t.Interior) {
    var n = t.Interior;
    n.Pattern && (n.patternType = Wd[n.Pattern] || n.Pattern);
  }
  e[t.ID] = t;
}
function Cw(e, t, r, n, a, i, s, f, c, o) {
  var l = "General", h = n.StyleID, u = {};
  o = o || {};
  var x = [], g = 0;
  for (h === void 0 && f && (h = f.StyleID), h === void 0 && s && (h = s.StyleID); i[h] !== void 0 && (i[h].nf && (l = i[h].nf), i[h].Interior && x.push(i[h].Interior), !!i[h].Parent); )
    h = i[h].Parent;
  switch (r.Type) {
    case "Boolean":
      n.t = "b", n.v = je(e);
      break;
    case "String":
      n.t = "s", n.r = j0(Pe(e)), n.v = e.indexOf("<") > -1 ? Pe(t || e).replace(/<.*?>/g, "") : n.r;
      break;
    case "DateTime":
      e.slice(-1) != "Z" && (e += "Z"), n.v = (Ye(e) - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1e3), n.v !== n.v ? n.v = Pe(e) : n.v < 60 && (n.v = n.v - 1), (!l || l == "General") && (l = "yyyy-mm-dd");
    case "Number":
      n.v === void 0 && (n.v = +e), n.t || (n.t = "n");
      break;
    case "Error":
      n.t = "e", n.v = Yc[e], o.cellText !== !1 && (n.w = e);
      break;
    default:
      e == "" && t == "" ? n.t = "z" : (n.t = "s", n.v = j0(t || e));
      break;
  }
  if (Fw(n, l, o), o.cellFormula !== !1)
    if (n.Formula) {
      var d = Pe(n.Formula);
      d.charCodeAt(0) == 61 && (d = d.slice(1)), n.f = jn(d, a), delete n.Formula, n.ArrayRange == "RC" ? n.F = jn("RC:RC", a) : n.ArrayRange && (n.F = jn(n.ArrayRange, a), c.push([Me(n.F), n.F]));
    } else
      for (g = 0; g < c.length; ++g)
        a.r >= c[g][0].s.r && a.r <= c[g][0].e.r && a.c >= c[g][0].s.c && a.c <= c[g][0].e.c && (n.F = c[g][1]);
  o.cellStyles && (x.forEach(function(m) {
    !u.patternType && m.patternType && (u.patternType = m.patternType);
  }), n.s = u), n.StyleID !== void 0 && (n.ixfe = n.StyleID);
}
function Ow(e) {
  e.t = e.v || "", e.t = e.t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), e.v = e.w = e.ixfe = void 0;
}
function ss(e, t) {
  var r = t || {};
  ta();
  var n = va($s(e));
  (r.type == "binary" || r.type == "array" || r.type == "base64") && (n = ze(n));
  var a = n.slice(0, 1024).toLowerCase(), i = !1;
  if (a = a.replace(/".*?"/g, ""), (a.indexOf(">") & 1023) > Math.min(a.indexOf(",") & 1023, a.indexOf(";") & 1023)) {
    var s = Ke(r);
    return s.type = "string", qn.to_workbook(n, s);
  }
  if (a.indexOf("<?xml") == -1 && ["html", "table", "head", "meta", "script", "style", "div"].forEach(function(ar) {
    a.indexOf("<" + ar) >= 0 && (i = !0);
  }), i) return g_(n, r);
  ba = {
    "General Number": "General",
    "General Date": Ee[22],
    "Long Date": "dddd, mmmm dd, yyyy",
    "Medium Date": Ee[15],
    "Short Date": Ee[14],
    "Long Time": Ee[19],
    "Medium Time": Ee[18],
    "Short Time": Ee[20],
    Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    Fixed: Ee[2],
    Standard: Ee[4],
    Percent: Ee[10],
    Scientific: Ee[11],
    "Yes/No": '"Yes";"Yes";"No";@',
    "True/False": '"True";"True";"False";@',
    "On/Off": '"Yes";"Yes";"No";@'
  };
  var f, c = [], o, l = {}, h = [], u = r.dense ? [] : {}, x = "", g = {}, d = {}, m = xt('<Data ss:Type="String">'), w = 0, y = 0, v = 0, I = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, T = {}, N = {}, k = "", U = 0, C = [], D = {}, M = {}, B = 0, Y = [], he = [], W = {}, ee = [], ne, De = !1, H = [], _e = [], Se = {}, O = 0, P = 0, R = { Sheets: [], WBProps: { date1904: !1 } }, L = {};
  Pa.lastIndex = 0, n = n.replace(/<!--([\s\S]*?)-->/mg, "");
  for (var Q = ""; f = Pa.exec(n); ) switch (f[3] = (Q = f[3]).toLowerCase()) {
    case "data":
      if (Q == "data") {
        if (f[1] === "/") {
          if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"));
        } else f[0].charAt(f[0].length - 2) !== "/" && c.push([f[3], !0]);
        break;
      }
      if (c[c.length - 1][1]) break;
      f[1] === "/" ? Cw(n.slice(w, f.index), k, m, c[c.length - 1][0] == /*"Comment"*/
      "comment" ? W : g, { c: y, r: v }, T, ee[y], d, H, r) : (k = "", m = xt(f[0]), w = f.index + f[0].length);
      break;
    case "cell":
      if (f[1] === "/")
        if (he.length > 0 && (g.c = he), (!r.sheetRows || r.sheetRows > v) && g.v !== void 0 && (r.dense ? (u[v] || (u[v] = []), u[v][y] = g) : u[Qe(y) + cr(v)] = g), g.HRef && (g.l = { Target: Pe(g.HRef) }, g.HRefScreenTip && (g.l.Tooltip = g.HRefScreenTip), delete g.HRef, delete g.HRefScreenTip), (g.MergeAcross || g.MergeDown) && (O = y + (parseInt(g.MergeAcross, 10) | 0), P = v + (parseInt(g.MergeDown, 10) | 0), C.push({ s: { c: y, r: v }, e: { c: O, r: P } })), !r.sheetStubs)
          g.MergeAcross ? y = O + 1 : ++y;
        else if (g.MergeAcross || g.MergeDown) {
          for (var fe = y; fe <= O; ++fe)
            for (var ce = v; ce <= P; ++ce)
              (fe > y || ce > v) && (r.dense ? (u[ce] || (u[ce] = []), u[ce][fe] = { t: "z" }) : u[Qe(fe) + cr(ce)] = { t: "z" });
          y = O + 1;
        } else ++y;
      else
        g = Sw(f[0]), g.Index && (y = +g.Index - 1), y < I.s.c && (I.s.c = y), y > I.e.c && (I.e.c = y), f[0].slice(-2) === "/>" && ++y, he = [];
      break;
    case "row":
      f[1] === "/" || f[0].slice(-2) === "/>" ? (v < I.s.r && (I.s.r = v), v > I.e.r && (I.e.r = v), f[0].slice(-2) === "/>" && (d = xt(f[0]), d.Index && (v = +d.Index - 1)), y = 0, ++v) : (d = xt(f[0]), d.Index && (v = +d.Index - 1), Se = {}, (d.AutoFitHeight == "0" || d.Height) && (Se.hpx = parseInt(d.Height, 10), Se.hpt = Va(Se.hpx), _e[v] = Se), d.Hidden == "1" && (Se.hidden = !0, _e[v] = Se));
      break;
    case "worksheet":
      if (f[1] === "/") {
        if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"));
        h.push(x), I.s.r <= I.e.r && I.s.c <= I.e.c && (u["!ref"] = Ae(I), r.sheetRows && r.sheetRows <= I.e.r && (u["!fullref"] = u["!ref"], I.e.r = r.sheetRows - 1, u["!ref"] = Ae(I))), C.length && (u["!merges"] = C), ee.length > 0 && (u["!cols"] = ee), _e.length > 0 && (u["!rows"] = _e), l[x] = u;
      } else
        I = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, v = y = 0, c.push([f[3], !1]), o = xt(f[0]), x = Pe(o.Name), u = r.dense ? [] : {}, C = [], H = [], _e = [], L = { name: x, Hidden: 0 }, R.Sheets.push(L);
      break;
    case "table":
      if (f[1] === "/") {
        if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"));
      } else {
        if (f[0].slice(-2) == "/>") break;
        c.push([f[3], !1]), ee = [], De = !1;
      }
      break;
    case "style":
      f[1] === "/" ? bw(T, N, r) : N = xt(f[0]);
      break;
    case "numberformat":
      N.nf = Pe(xt(f[0]).Format || "General"), ba[N.nf] && (N.nf = ba[N.nf]);
      for (var ie = 0; ie != 392 && Ee[ie] != N.nf; ++ie) ;
      if (ie == 392) {
        for (ie = 57; ie != 392; ++ie) if (Ee[ie] == null) {
          Pt(N.nf, ie);
          break;
        }
      }
      break;
    case "column":
      if (c[c.length - 1][0] !== /*'Table'*/
      "table") break;
      if (ne = xt(f[0]), ne.Hidden && (ne.hidden = !0, delete ne.Hidden), ne.Width && (ne.wpx = parseInt(ne.Width, 10)), !De && ne.wpx > 10) {
        De = !0, Fr = Co;
        for (var te = 0; te < ee.length; ++te) ee[te] && rn(ee[te]);
      }
      De && rn(ne), ee[ne.Index - 1 || ee.length] = ne;
      for (var be = 0; be < +ne.Span; ++be) ee[ee.length] = Ke(ne);
      break;
    case "namedrange":
      if (f[1] === "/") break;
      R.Names || (R.Names = []);
      var b = Te(f[0]), Xe = {
        Name: b.Name,
        Ref: jn(b.RefersTo.slice(1), { r: 0, c: 0 })
      };
      R.Sheets.length > 0 && (Xe.Sheet = R.Sheets.length - 1), R.Names.push(Xe);
      break;
    case "namedcell":
      break;
    case "b":
      break;
    case "i":
      break;
    case "u":
      break;
    case "s":
      break;
    case "em":
      break;
    case "h2":
      break;
    case "h3":
      break;
    case "sub":
      break;
    case "sup":
      break;
    case "span":
      break;
    case "alignment":
      break;
    case "borders":
      break;
    case "border":
      break;
    case "font":
      if (f[0].slice(-2) === "/>") break;
      f[1] === "/" ? k += n.slice(U, f.index) : U = f.index + f[0].length;
      break;
    case "interior":
      if (!r.cellStyles) break;
      N.Interior = xt(f[0]);
      break;
    case "protection":
      break;
    case "author":
    case "title":
    case "description":
    case "created":
    case "keywords":
    case "subject":
    case "category":
    case "company":
    case "lastauthor":
    case "lastsaved":
    case "lastprinted":
    case "version":
    case "revision":
    case "totaltime":
    case "hyperlinkbase":
    case "manager":
    case "contentstatus":
    case "identifier":
    case "language":
    case "appname":
      if (f[0].slice(-2) === "/>") break;
      f[1] === "/" ? e1(D, Q, n.slice(B, f.index)) : B = f.index + f[0].length;
      break;
    case "paragraphs":
      break;
    case "styles":
    case "workbook":
      if (f[1] === "/") {
        if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"));
      } else c.push([f[3], !1]);
      break;
    case "comment":
      if (f[1] === "/") {
        if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"));
        Ow(W), he.push(W);
      } else
        c.push([f[3], !1]), o = xt(f[0]), W = { a: o.Author };
      break;
    case "autofilter":
      if (f[1] === "/") {
        if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"));
      } else if (f[0].charAt(f[0].length - 2) !== "/") {
        var Re = xt(f[0]);
        u["!autofilter"] = { ref: jn(Re.Range).replace(/\$/g, "") }, c.push([f[3], !0]);
      }
      break;
    case "name":
      break;
    case "datavalidation":
      if (f[1] === "/") {
        if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"));
      } else
        f[0].charAt(f[0].length - 2) !== "/" && c.push([f[3], !0]);
      break;
    case "pixelsperinch":
      break;
    case "componentoptions":
    case "documentproperties":
    case "customdocumentproperties":
    case "officedocumentsettings":
    case "pivottable":
    case "pivotcache":
    case "names":
    case "mapinfo":
    case "pagebreaks":
    case "querytable":
    case "sorting":
    case "schema":
    case "conditionalformatting":
    case "smarttagtype":
    case "smarttags":
    case "excelworkbook":
    case "workbookoptions":
    case "worksheetoptions":
      if (f[1] === "/") {
        if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"));
      } else f[0].charAt(f[0].length - 2) !== "/" && c.push([f[3], !0]);
      break;
    case "null":
      break;
    default:
      if (c.length == 0 && f[3] == "document" || c.length == 0 && f[3] == "uof") return Lf(n, r);
      var Ge = !0;
      switch (c[c.length - 1][0]) {
        case "officedocumentsettings":
          switch (f[3]) {
            case "allowpng":
              break;
            case "removepersonalinformation":
              break;
            case "downloadcomponents":
              break;
            case "locationofcomponents":
              break;
            case "colors":
              break;
            case "color":
              break;
            case "index":
              break;
            case "rgb":
              break;
            case "targetscreensize":
              break;
            case "readonlyrecommended":
              break;
            default:
              Ge = !1;
          }
          break;
        case "componentoptions":
          switch (f[3]) {
            case "toolbar":
              break;
            case "hideofficelogo":
              break;
            case "spreadsheetautofit":
              break;
            case "label":
              break;
            case "caption":
              break;
            case "maxheight":
              break;
            case "maxwidth":
              break;
            case "nextsheetnumber":
              break;
            default:
              Ge = !1;
          }
          break;
        case "excelworkbook":
          switch (f[3]) {
            case "date1904":
              R.WBProps.date1904 = !0;
              break;
            case "windowheight":
              break;
            case "windowwidth":
              break;
            case "windowtopx":
              break;
            case "windowtopy":
              break;
            case "tabratio":
              break;
            case "protectstructure":
              break;
            case "protectwindow":
              break;
            case "protectwindows":
              break;
            case "activesheet":
              break;
            case "displayinknotes":
              break;
            case "firstvisiblesheet":
              break;
            case "supbook":
              break;
            case "sheetname":
              break;
            case "sheetindex":
              break;
            case "sheetindexfirst":
              break;
            case "sheetindexlast":
              break;
            case "dll":
              break;
            case "acceptlabelsinformulas":
              break;
            case "donotsavelinkvalues":
              break;
            case "iteration":
              break;
            case "maxiterations":
              break;
            case "maxchange":
              break;
            case "path":
              break;
            case "xct":
              break;
            case "count":
              break;
            case "selectedsheets":
              break;
            case "calculation":
              break;
            case "uncalced":
              break;
            case "startupprompt":
              break;
            case "crn":
              break;
            case "externname":
              break;
            case "formula":
              break;
            case "colfirst":
              break;
            case "collast":
              break;
            case "wantadvise":
              break;
            case "boolean":
              break;
            case "error":
              break;
            case "text":
              break;
            case "ole":
              break;
            case "noautorecover":
              break;
            case "publishobjects":
              break;
            case "donotcalculatebeforesave":
              break;
            case "number":
              break;
            case "refmoder1c1":
              break;
            case "embedsavesmarttags":
              break;
            default:
              Ge = !1;
          }
          break;
        case "workbookoptions":
          switch (f[3]) {
            case "owcversion":
              break;
            case "height":
              break;
            case "width":
              break;
            default:
              Ge = !1;
          }
          break;
        case "worksheetoptions":
          switch (f[3]) {
            case "visible":
              if (f[0].slice(-2) !== "/>") if (f[1] === "/") switch (n.slice(B, f.index)) {
                case "SheetHidden":
                  L.Hidden = 1;
                  break;
                case "SheetVeryHidden":
                  L.Hidden = 2;
                  break;
              }
              else B = f.index + f[0].length;
              break;
            case "header":
              u["!margins"] || wn(u["!margins"] = {}, "xlml"), isNaN(+Te(f[0]).Margin) || (u["!margins"].header = +Te(f[0]).Margin);
              break;
            case "footer":
              u["!margins"] || wn(u["!margins"] = {}, "xlml"), isNaN(+Te(f[0]).Margin) || (u["!margins"].footer = +Te(f[0]).Margin);
              break;
            case "pagemargins":
              var Be = Te(f[0]);
              u["!margins"] || wn(u["!margins"] = {}, "xlml"), isNaN(+Be.Top) || (u["!margins"].top = +Be.Top), isNaN(+Be.Left) || (u["!margins"].left = +Be.Left), isNaN(+Be.Right) || (u["!margins"].right = +Be.Right), isNaN(+Be.Bottom) || (u["!margins"].bottom = +Be.Bottom);
              break;
            case "displayrighttoleft":
              R.Views || (R.Views = []), R.Views[0] || (R.Views[0] = {}), R.Views[0].RTL = !0;
              break;
            case "freezepanes":
              break;
            case "frozennosplit":
              break;
            case "splithorizontal":
            case "splitvertical":
              break;
            case "donotdisplaygridlines":
              break;
            case "activerow":
              break;
            case "activecol":
              break;
            case "toprowbottompane":
              break;
            case "leftcolumnrightpane":
              break;
            case "unsynced":
              break;
            case "print":
              break;
            case "printerrors":
              break;
            case "panes":
              break;
            case "scale":
              break;
            case "pane":
              break;
            case "number":
              break;
            case "layout":
              break;
            case "pagesetup":
              break;
            case "selected":
              break;
            case "protectobjects":
              break;
            case "enableselection":
              break;
            case "protectscenarios":
              break;
            case "validprinterinfo":
              break;
            case "horizontalresolution":
              break;
            case "verticalresolution":
              break;
            case "numberofcopies":
              break;
            case "activepane":
              break;
            case "toprowvisible":
              break;
            case "leftcolumnvisible":
              break;
            case "fittopage":
              break;
            case "rangeselection":
              break;
            case "papersizeindex":
              break;
            case "pagelayoutzoom":
              break;
            case "pagebreakzoom":
              break;
            case "filteron":
              break;
            case "fitwidth":
              break;
            case "fitheight":
              break;
            case "commentslayout":
              break;
            case "zoom":
              break;
            case "lefttoright":
              break;
            case "gridlines":
              break;
            case "allowsort":
              break;
            case "allowfilter":
              break;
            case "allowinsertrows":
              break;
            case "allowdeleterows":
              break;
            case "allowinsertcols":
              break;
            case "allowdeletecols":
              break;
            case "allowinserthyperlinks":
              break;
            case "allowformatcells":
              break;
            case "allowsizecols":
              break;
            case "allowsizerows":
              break;
            case "nosummaryrowsbelowdetail":
              u["!outline"] || (u["!outline"] = {}), u["!outline"].above = !0;
              break;
            case "tabcolorindex":
              break;
            case "donotdisplayheadings":
              break;
            case "showpagelayoutzoom":
              break;
            case "nosummarycolumnsrightdetail":
              u["!outline"] || (u["!outline"] = {}), u["!outline"].left = !0;
              break;
            case "blackandwhite":
              break;
            case "donotdisplayzeros":
              break;
            case "displaypagebreak":
              break;
            case "rowcolheadings":
              break;
            case "donotdisplayoutline":
              break;
            case "noorientation":
              break;
            case "allowusepivottables":
              break;
            case "zeroheight":
              break;
            case "viewablerange":
              break;
            case "selection":
              break;
            case "protectcontents":
              break;
            default:
              Ge = !1;
          }
          break;
        case "pivottable":
        case "pivotcache":
          switch (f[3]) {
            case "immediateitemsondrop":
              break;
            case "showpagemultipleitemlabel":
              break;
            case "compactrowindent":
              break;
            case "location":
              break;
            case "pivotfield":
              break;
            case "orientation":
              break;
            case "layoutform":
              break;
            case "layoutsubtotallocation":
              break;
            case "layoutcompactrow":
              break;
            case "position":
              break;
            case "pivotitem":
              break;
            case "datatype":
              break;
            case "datafield":
              break;
            case "sourcename":
              break;
            case "parentfield":
              break;
            case "ptlineitems":
              break;
            case "ptlineitem":
              break;
            case "countofsameitems":
              break;
            case "item":
              break;
            case "itemtype":
              break;
            case "ptsource":
              break;
            case "cacheindex":
              break;
            case "consolidationreference":
              break;
            case "filename":
              break;
            case "reference":
              break;
            case "nocolumngrand":
              break;
            case "norowgrand":
              break;
            case "blanklineafteritems":
              break;
            case "hidden":
              break;
            case "subtotal":
              break;
            case "basefield":
              break;
            case "mapchilditems":
              break;
            case "function":
              break;
            case "refreshonfileopen":
              break;
            case "printsettitles":
              break;
            case "mergelabels":
              break;
            case "defaultversion":
              break;
            case "refreshname":
              break;
            case "refreshdate":
              break;
            case "refreshdatecopy":
              break;
            case "versionlastrefresh":
              break;
            case "versionlastupdate":
              break;
            case "versionupdateablemin":
              break;
            case "versionrefreshablemin":
              break;
            case "calculation":
              break;
            default:
              Ge = !1;
          }
          break;
        case "pagebreaks":
          switch (f[3]) {
            case "colbreaks":
              break;
            case "colbreak":
              break;
            case "rowbreaks":
              break;
            case "rowbreak":
              break;
            case "colstart":
              break;
            case "colend":
              break;
            case "rowend":
              break;
            default:
              Ge = !1;
          }
          break;
        case "autofilter":
          switch (f[3]) {
            case "autofiltercolumn":
              break;
            case "autofiltercondition":
              break;
            case "autofilterand":
              break;
            case "autofilteror":
              break;
            default:
              Ge = !1;
          }
          break;
        case "querytable":
          switch (f[3]) {
            case "id":
              break;
            case "autoformatfont":
              break;
            case "autoformatpattern":
              break;
            case "querysource":
              break;
            case "querytype":
              break;
            case "enableredirections":
              break;
            case "refreshedinxl9":
              break;
            case "urlstring":
              break;
            case "htmltables":
              break;
            case "connection":
              break;
            case "commandtext":
              break;
            case "refreshinfo":
              break;
            case "notitles":
              break;
            case "nextid":
              break;
            case "columninfo":
              break;
            case "overwritecells":
              break;
            case "donotpromptforfile":
              break;
            case "textwizardsettings":
              break;
            case "source":
              break;
            case "number":
              break;
            case "decimal":
              break;
            case "thousandseparator":
              break;
            case "trailingminusnumbers":
              break;
            case "formatsettings":
              break;
            case "fieldtype":
              break;
            case "delimiters":
              break;
            case "tab":
              break;
            case "comma":
              break;
            case "autoformatname":
              break;
            case "versionlastedit":
              break;
            case "versionlastrefresh":
              break;
            default:
              Ge = !1;
          }
          break;
        case "datavalidation":
          switch (f[3]) {
            case "range":
              break;
            case "type":
              break;
            case "min":
              break;
            case "max":
              break;
            case "sort":
              break;
            case "descending":
              break;
            case "order":
              break;
            case "casesensitive":
              break;
            case "value":
              break;
            case "errorstyle":
              break;
            case "errormessage":
              break;
            case "errortitle":
              break;
            case "inputmessage":
              break;
            case "inputtitle":
              break;
            case "combohide":
              break;
            case "inputhide":
              break;
            case "condition":
              break;
            case "qualifier":
              break;
            case "useblank":
              break;
            case "value1":
              break;
            case "value2":
              break;
            case "format":
              break;
            case "cellrangelist":
              break;
            default:
              Ge = !1;
          }
          break;
        case "sorting":
        case "conditionalformatting":
          switch (f[3]) {
            case "range":
              break;
            case "type":
              break;
            case "min":
              break;
            case "max":
              break;
            case "sort":
              break;
            case "descending":
              break;
            case "order":
              break;
            case "casesensitive":
              break;
            case "value":
              break;
            case "errorstyle":
              break;
            case "errormessage":
              break;
            case "errortitle":
              break;
            case "cellrangelist":
              break;
            case "inputmessage":
              break;
            case "inputtitle":
              break;
            case "combohide":
              break;
            case "inputhide":
              break;
            case "condition":
              break;
            case "qualifier":
              break;
            case "useblank":
              break;
            case "value1":
              break;
            case "value2":
              break;
            case "format":
              break;
            default:
              Ge = !1;
          }
          break;
        case "mapinfo":
        case "schema":
        case "data":
          switch (f[3]) {
            case "map":
              break;
            case "entry":
              break;
            case "range":
              break;
            case "xpath":
              break;
            case "field":
              break;
            case "xsdtype":
              break;
            case "filteron":
              break;
            case "aggregate":
              break;
            case "elementtype":
              break;
            case "attributetype":
              break;
            case "schema":
            case "element":
            case "complextype":
            case "datatype":
            case "all":
            case "attribute":
            case "extends":
              break;
            case "row":
              break;
            default:
              Ge = !1;
          }
          break;
        case "smarttags":
          break;
        default:
          Ge = !1;
          break;
      }
      if (Ge || f[3].match(/!\[CDATA/)) break;
      if (!c[c.length - 1][1]) throw "Unrecognized tag: " + f[3] + "|" + c.join("|");
      if (c[c.length - 1][0] === /*'CustomDocumentProperties'*/
      "customdocumentproperties") {
        if (f[0].slice(-2) === "/>") break;
        f[1] === "/" ? Aw(M, Q, Y, n.slice(B, f.index)) : (Y = f, B = f.index + f[0].length);
        break;
      }
      if (r.WTF) throw "Unrecognized tag: " + f[3] + "|" + c.join("|");
  }
  var xe = {};
  return !r.bookSheets && !r.bookProps && (xe.Sheets = l), xe.SheetNames = h, xe.Workbook = R, xe.SSF = Ke(Ee), xe.Props = D, xe.Custprops = M, xe;
}
function As(e, t) {
  switch (x0(t = t || {}), t.type || "base64") {
    case "base64":
      return ss(Jr(e), t);
    case "binary":
    case "buffer":
    case "file":
      return ss(e, t);
    case "array":
      return ss(fn(e), t);
  }
}
function Nw(e, t) {
  var r = [];
  return e.Props && r.push(r1(e.Props, t)), e.Custprops && r.push(t1(e.Props, e.Custprops)), r.join("");
}
function Iw() {
  return "";
}
function Bw(e, t) {
  var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(oe("NumberFormat", null, { "ss:Format": $e(Ee[n.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + a) }
    );
    r.push(oe("Style", i.join(""), s));
  }), oe("Styles", r.join(""));
}
function tl(e) {
  return oe("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + f0(e.Ref, { r: 0, c: 0 }) });
}
function Dw(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var t = e.Workbook.Names, r = [], n = 0; n < t.length; ++n) {
    var a = t[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || r.push(tl(a)));
  }
  return oe("Names", r.join(""));
}
function Rw(e, t, r, n) {
  if (!e || !((n || {}).Workbook || {}).Names) return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var f = a[s];
    f.Sheet == r && (f.Name.match(/^_xlfn\./) || i.push(tl(f)));
  }
  return i.join("");
}
function Lw(e, t, r, n) {
  if (!e) return "";
  var a = [];
  if (e["!margins"] && (a.push("<PageSetup>"), e["!margins"].header && a.push(oe("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && a.push(oe("Footer", null, { "x:Margin": e["!margins"].footer })), a.push(oe("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), a.push("</PageSetup>")), n && n.Workbook && n.Workbook.Sheets && n.Workbook.Sheets[r])
    if (n.Workbook.Sheets[r].Hidden) a.push(oe("Visible", n.Workbook.Sheets[r].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var i = 0; i < r && !(n.Workbook.Sheets[i] && !n.Workbook.Sheets[i].Hidden); ++i) ;
      i == r && a.push("<Selected/>");
    }
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(Er("ProtectContents", "True")), e["!protect"].objects && a.push(Er("ProtectObjects", "True")), e["!protect"].scenarios && a.push(Er("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(Er("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(Er("EnableSelection", "UnlockedCells")), [
    ["formatCells", "AllowFormatCells"],
    ["formatColumns", "AllowSizeCols"],
    ["formatRows", "AllowSizeRows"],
    ["insertColumns", "AllowInsertCols"],
    ["insertRows", "AllowInsertRows"],
    ["insertHyperlinks", "AllowInsertHyperlinks"],
    ["deleteColumns", "AllowDeleteCols"],
    ["deleteRows", "AllowDeleteRows"],
    ["sort", "AllowSort"],
    ["autoFilter", "AllowFilter"],
    ["pivotTables", "AllowUsePivotTables"]
  ].forEach(function(s) {
    e["!protect"][s[0]] && a.push("<" + s[1] + "/>");
  })), a.length == 0 ? "" : oe("WorksheetOptions", a.join(""), { xmlns: Xr.x });
}
function Pw(e) {
  return e.map(function(t) {
    var r = au(t.t || ""), n = oe("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return oe("Comment", n, { "ss:Author": t.a });
  }).join("");
}
function Mw(e, t, r, n, a, i, s) {
  if (!e || e.v == null && e.f == null) return "";
  var f = {};
  if (e.f && (f["ss:Formula"] = "=" + $e(f0(e.f, s))), e.F && e.F.slice(0, t.length) == t) {
    var c = er(e.F.slice(t.length + 1));
    f["ss:ArrayRange"] = "RC:R" + (c.r == s.r ? "" : "[" + (c.r - s.r) + "]") + "C" + (c.c == s.c ? "" : "[" + (c.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (f["ss:HRef"] = $e(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = $e(e.l.Tooltip))), r["!merges"])
    for (var o = r["!merges"], l = 0; l != o.length; ++l)
      o[l].s.c != s.c || o[l].s.r != s.r || (o[l].e.c > o[l].s.c && (f["ss:MergeAcross"] = o[l].e.c - o[l].s.c), o[l].e.r > o[l].s.r && (f["ss:MergeDown"] = o[l].e.r - o[l].s.r));
  var h = "", u = "";
  switch (e.t) {
    case "z":
      if (!n.sheetStubs) return "";
      break;
    case "n":
      h = "Number", u = String(e.v);
      break;
    case "b":
      h = "Boolean", u = e.v ? "1" : "0";
      break;
    case "e":
      h = "Error", u = $t[e.v];
      break;
    case "d":
      h = "DateTime", u = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Ee[14]);
      break;
    case "s":
      h = "String", u = nu(e.v || "");
      break;
  }
  var x = on(n.cellXfs, e, n);
  f["ss:StyleID"] = "s" + (21 + x), f["ss:Index"] = s.c + 1;
  var g = e.v != null ? u : "", d = e.t == "z" ? "" : '<Data ss:Type="' + h + '">' + g + "</Data>";
  return (e.c || []).length > 0 && (d += Pw(e.c)), oe("Cell", d, f);
}
function Uw(e, t) {
  var r = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = Zn(t.hpt)), t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (r += ' ss:Hidden="1"')), r + ">";
}
function Ww(e, t, r, n) {
  if (!e["!ref"]) return "";
  var a = Me(e["!ref"]), i = e["!merges"] || [], s = 0, f = [];
  e["!cols"] && e["!cols"].forEach(function(m, w) {
    rn(m);
    var y = !!m.width, v = zi(w, m), I = { "ss:Index": w + 1 };
    y && (I["ss:Width"] = Wa(v.width)), m.hidden && (I["ss:Hidden"] = "1"), f.push(oe("Column", null, I));
  });
  for (var c = Array.isArray(e), o = a.s.r; o <= a.e.r; ++o) {
    for (var l = [Uw(o, (e["!rows"] || [])[o])], h = a.s.c; h <= a.e.c; ++h) {
      var u = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > h) && !(i[s].s.r > o) && !(i[s].e.c < h) && !(i[s].e.r < o)) {
          (i[s].s.c != h || i[s].s.r != o) && (u = !0);
          break;
        }
      if (!u) {
        var x = { r: o, c: h }, g = ye(x), d = c ? (e[o] || [])[h] : e[g];
        l.push(Mw(d, g, e, t, r, n, x));
      }
    }
    l.push("</Row>"), l.length > 2 && f.push(l.join(""));
  }
  return f.join("");
}
function Hw(e, t, r) {
  var n = [], a = r.SheetNames[e], i = r.Sheets[a], s = i ? Rw(i, t, e, r) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? Ww(i, t, e, r) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(Lw(i, t, e, r)), n.join("");
}
function Vw(e, t) {
  t || (t = {}), e.SSF || (e.SSF = Ke(Ee)), e.SSF && (ta(), Pi(e.SSF), t.revssf = Ui(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], on(t.cellXfs, {}, { revssf: { General: 0 } }));
  var r = [];
  r.push(Nw(e, t)), r.push(Iw()), r.push(""), r.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    r.push(oe("Worksheet", Hw(n, t, e), { "ss:Name": $e(e.SheetNames[n]) }));
  return r[2] = Bw(e, t), r[3] = Dw(e), or + oe("Workbook", r.join(""), {
    xmlns: Xr.ss,
    "xmlns:o": Xr.o,
    "xmlns:x": Xr.x,
    "xmlns:ss": Xr.ss,
    "xmlns:dt": Xr.dt,
    "xmlns:html": Xr.html
  });
}
function $w(e) {
  var t = {}, r = e.content;
  if (r.l = 28, t.AnsiUserType = r.read_shift(0, "lpstr-ansi"), t.AnsiClipboardFormat = Du(r), r.length - r.l <= 4) return t;
  var n = r.read_shift(4);
  if (n == 0 || n > 40 || (r.l -= 4, t.Reserved1 = r.read_shift(0, "lpstr-ansi"), r.length - r.l <= 4) || (n = r.read_shift(4), n !== 1907505652) || (t.UnicodeClipboardFormat = Ru(r), n = r.read_shift(4), n == 0 || n > 40)) return t;
  r.l -= 4, t.Reserved2 = r.read_shift(0, "lpwstr");
}
var zw = [60, 1084, 2066, 2165, 2175];
function Gw(e, t, r, n, a) {
  var i = n, s = [], f = r.slice(r.l, r.l + i);
  if (a && a.enc && a.enc.insitu && f.length > 0) switch (e) {
    case 9:
    case 521:
    case 1033:
    case 2057:
    case 47:
    case 405:
    case 225:
    case 406:
    case 312:
    case 404:
    case 10:
      break;
    case 133:
      break;
    default:
      a.enc.insitu(f);
  }
  s.push(f), r.l += i;
  for (var c = Rt(r, r.l), o = Fs[c], l = 0; o != null && zw.indexOf(c) > -1; )
    i = Rt(r, r.l + 2), l = r.l + 4, c == 2066 ? l += 4 : (c == 2165 || c == 2175) && (l += 12), f = r.slice(l, r.l + 4 + i), s.push(f), r.l += 4 + i, o = Fs[c = Rt(r, r.l)];
  var h = pr(s);
  _r(h, 0);
  var u = 0;
  h.lens = [];
  for (var x = 0; x < s.length; ++x)
    h.lens.push(u), u += s[x].length;
  if (h.length < n) throw "XLS Record 0x" + e.toString(16) + " Truncated: " + h.length + " < " + n;
  return t.f(h, h.length, a);
}
function Tt(e, t, r) {
  if (e.t !== "z" && e.XF) {
    var n = 0;
    try {
      n = e.z || e.XF.numFmtId || 0, t.cellNF && (e.z = Ee[n]);
    } catch (i) {
      if (t.WTF) throw i;
    }
    if (!t || t.cellText !== !1) try {
      e.t === "e" ? e.w = e.w || $t[e.v] : n === 0 || n == "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = Da(e.v) : e.w = _n(e.v) : e.w = ht(n, e.v, { date1904: !!r, dateNF: t && t.dateNF });
    } catch (i) {
      if (t.WTF) throw i;
    }
    if (t.cellDates && n && e.t == "n" && ra(Ee[n] || String(n))) {
      var a = dn(e.v);
      a && (e.t = "d", e.v = new Date(a.y, a.m - 1, a.d, a.H, a.M, a.S, a.u));
    }
  }
}
function gi(e, t, r) {
  return { v: e, ixfe: t, t: r };
}
function Xw(e, t) {
  var r = { opts: {} }, n = {}, a = t.dense ? [] : {}, i = {}, s = {}, f = null, c = [], o = "", l = {}, h, u = "", x, g, d, m, w = {}, y = [], v, I, T = [], N = [], k = { Sheets: [], WBProps: { date1904: !1 }, Views: [{}] }, U = {}, C = function(Oe) {
    return Oe < 8 ? mn[Oe] : Oe < 64 && N[Oe - 8] || mn[Oe];
  }, D = function(Oe, ir, et) {
    var xr = ir.XF.data;
    if (!(!xr || !xr.patternType || !et || !et.cellStyles)) {
      ir.s = {}, ir.s.patternType = xr.patternType;
      var ln;
      (ln = Ua(C(xr.icvFore))) && (ir.s.fgColor = { rgb: ln }), (ln = Ua(C(xr.icvBack))) && (ir.s.bgColor = { rgb: ln });
    }
  }, M = function(Oe, ir, et) {
    if (!(Se > 1) && !(et.sheetRows && Oe.r >= et.sheetRows)) {
      if (et.cellStyles && ir.XF && ir.XF.data && D(Oe, ir, et), delete ir.ixfe, delete ir.XF, h = Oe, u = ye(Oe), (!s || !s.s || !s.e) && (s = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }), Oe.r < s.s.r && (s.s.r = Oe.r), Oe.c < s.s.c && (s.s.c = Oe.c), Oe.r + 1 > s.e.r && (s.e.r = Oe.r + 1), Oe.c + 1 > s.e.c && (s.e.c = Oe.c + 1), et.cellFormula && ir.f) {
        for (var xr = 0; xr < y.length; ++xr)
          if (!(y[xr][0].s.c > Oe.c || y[xr][0].s.r > Oe.r) && !(y[xr][0].e.c < Oe.c || y[xr][0].e.r < Oe.r)) {
            ir.F = Ae(y[xr][0]), (y[xr][0].s.c != Oe.c || y[xr][0].s.r != Oe.r) && delete ir.f, ir.f && (ir.f = "" + Ar(y[xr][1], s, Oe, H, B));
            break;
          }
      }
      et.dense ? (a[Oe.r] || (a[Oe.r] = []), a[Oe.r][Oe.c] = ir) : a[u] = ir;
    }
  }, B = {
    enc: !1,
    // encrypted
    sbcch: 0,
    // cch in the preceding SupBook
    snames: [],
    // sheetnames
    sharedf: w,
    // shared formulae by address
    arrayf: y,
    // array formulae array
    rrtabid: [],
    // RRTabId
    lastuser: "",
    // Last User from WriteAccess
    biff: 8,
    // BIFF version
    codepage: 0,
    // CP from CodePage record
    winlocked: 0,
    // fLockWn from WinProtect
    cellStyles: !!t && !!t.cellStyles,
    WTF: !!t && !!t.wtf
  };
  t.password && (B.password = t.password);
  var Y, he = [], W = [], ee = [], ne = [], De = !1, H = [];
  H.SheetNames = B.snames, H.sharedf = B.sharedf, H.arrayf = B.arrayf, H.names = [], H.XTI = [];
  var _e = 0, Se = 0, O = 0, P = [], R = [], L;
  B.codepage = 1200, mt(1200);
  for (var Q = !1; e.l < e.length - 1; ) {
    var fe = e.l, ce = e.read_shift(2);
    if (ce === 0 && _e === 10) break;
    var ie = e.l === e.length ? 0 : e.read_shift(2), te = Fs[ce];
    if (te && te.f) {
      if (t.bookSheets && _e === 133 && ce !== 133)
        break;
      if (_e = ce, te.r === 2 || te.r == 12) {
        var be = e.read_shift(2);
        if (ie -= 2, !B.enc && be !== ce && ((be & 255) << 8 | be >> 8) !== ce) throw new Error("rt mismatch: " + be + "!=" + ce);
        te.r == 12 && (e.l += 10, ie -= 10);
      }
      var b = {};
      if (ce === 10 ? b = /*::(*/
      te.f(e, ie, B) : b = /*::(*/
      Gw(ce, te, e, ie, B), Se == 0 && [9, 521, 1033, 2057].indexOf(_e) === -1) continue;
      switch (ce) {
        case 34:
          r.opts.Date1904 = k.WBProps.date1904 = b;
          break;
        case 134:
          r.opts.WriteProtect = !0;
          break;
        case 47:
          if (B.enc || (e.l = 0), B.enc = b, !t.password) throw new Error("File is password-protected");
          if (b.valid == null) throw new Error("Encryption scheme unsupported");
          if (!b.valid) throw new Error("Password is incorrect");
          break;
        case 92:
          B.lastuser = b;
          break;
        case 66:
          var Xe = Number(b);
          switch (Xe) {
            case 21010:
              Xe = 1200;
              break;
            case 32768:
              Xe = 1e4;
              break;
            case 32769:
              Xe = 1252;
              break;
          }
          mt(B.codepage = Xe), Q = !0;
          break;
        case 317:
          B.rrtabid = b;
          break;
        case 25:
          B.winlocked = b;
          break;
        case 439:
          r.opts.RefreshAll = b;
          break;
        case 12:
          r.opts.CalcCount = b;
          break;
        case 16:
          r.opts.CalcDelta = b;
          break;
        case 17:
          r.opts.CalcIter = b;
          break;
        case 13:
          r.opts.CalcMode = b;
          break;
        case 14:
          r.opts.CalcPrecision = b;
          break;
        case 95:
          r.opts.CalcSaveRecalc = b;
          break;
        case 15:
          B.CalcRefMode = b;
          break;
        case 2211:
          r.opts.FullCalc = b;
          break;
        case 129:
          b.fDialog && (a["!type"] = "dialog"), b.fBelow || ((a["!outline"] || (a["!outline"] = {})).above = !0), b.fRight || ((a["!outline"] || (a["!outline"] = {})).left = !0);
          break;
        case 224:
          T.push(b);
          break;
        case 430:
          H.push([b]), H[H.length - 1].XTI = [];
          break;
        case 35:
        case 547:
          H[H.length - 1].push(b);
          break;
        case 24:
        case 536:
          L = {
            Name: b.Name,
            Ref: Ar(b.rgce, s, null, H, B)
          }, b.itab > 0 && (L.Sheet = b.itab - 1), H.names.push(L), H[0] || (H[0] = [], H[0].XTI = []), H[H.length - 1].push(b), b.Name == "_xlnm._FilterDatabase" && b.itab > 0 && b.rgce && b.rgce[0] && b.rgce[0][0] && b.rgce[0][0][0] == "PtgArea3d" && (R[b.itab - 1] = { ref: Ae(b.rgce[0][0][1][2]) });
          break;
        case 22:
          B.ExternCount = b;
          break;
        case 23:
          H.length == 0 && (H[0] = [], H[0].XTI = []), H[H.length - 1].XTI = H[H.length - 1].XTI.concat(b), H.XTI = H.XTI.concat(b);
          break;
        case 2196:
          if (B.biff < 8) break;
          L != null && (L.Comment = b[1]);
          break;
        case 18:
          a["!protect"] = b;
          break;
        case 19:
          b !== 0 && B.WTF && console.error("Password verifier: " + b);
          break;
        case 133:
          i[b.pos] = b, B.snames.push(b.name);
          break;
        case 10:
          {
            if (--Se) break;
            if (s.e) {
              if (s.e.r > 0 && s.e.c > 0) {
                if (s.e.r--, s.e.c--, a["!ref"] = Ae(s), t.sheetRows && t.sheetRows <= s.e.r) {
                  var Re = s.e.r;
                  s.e.r = t.sheetRows - 1, a["!fullref"] = a["!ref"], a["!ref"] = Ae(s), s.e.r = Re;
                }
                s.e.r++, s.e.c++;
              }
              he.length > 0 && (a["!merges"] = he), W.length > 0 && (a["!objects"] = W), ee.length > 0 && (a["!cols"] = ee), ne.length > 0 && (a["!rows"] = ne), k.Sheets.push(U);
            }
            o === "" ? l = a : n[o] = a, a = t.dense ? [] : {};
          }
          break;
        case 9:
        case 521:
        case 1033:
        case 2057:
          {
            if (B.biff === 8 && (B.biff = {
              /*::[*/
              9: 2,
              /*::[*/
              521: 3,
              /*::[*/
              1033: 4
            }[ce] || {
              /*::[*/
              512: 2,
              /*::[*/
              768: 3,
              /*::[*/
              1024: 4,
              /*::[*/
              1280: 5,
              /*::[*/
              1536: 8,
              /*::[*/
              2: 2,
              /*::[*/
              7: 2
            }[b.BIFFVer] || 8), B.biffguess = b.BIFFVer == 0, b.BIFFVer == 0 && b.dt == 4096 && (B.biff = 5, Q = !0, mt(B.codepage = 28591)), B.biff == 8 && b.BIFFVer == 0 && b.dt == 16 && (B.biff = 2), Se++) break;
            if (a = t.dense ? [] : {}, B.biff < 8 && !Q && (Q = !0, mt(B.codepage = t.codepage || 1252)), B.biff < 5 || b.BIFFVer == 0 && b.dt == 4096) {
              o === "" && (o = "Sheet1"), s = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
              var Ge = { pos: e.l - ie, name: o };
              i[Ge.pos] = Ge, B.snames.push(o);
            } else o = (i[fe] || { name: "" }).name;
            b.dt == 32 && (a["!type"] = "chart"), b.dt == 64 && (a["!type"] = "macro"), he = [], W = [], B.arrayf = y = [], ee = [], ne = [], De = !1, U = { Hidden: (i[fe] || { hs: 0 }).hs, name: o };
          }
          break;
        case 515:
        case 3:
        case 2:
          a["!type"] == "chart" && (t.dense ? (a[b.r] || [])[b.c] : a[ye({ c: b.c, r: b.r })]) && ++b.c, v = { ixfe: b.ixfe, XF: T[b.ixfe] || {}, v: b.val, t: "n" }, O > 0 && (v.z = P[v.ixfe >> 8 & 63]), Tt(v, t, r.opts.Date1904), M({ c: b.c, r: b.r }, v, t);
          break;
        case 5:
        case 517:
          v = { ixfe: b.ixfe, XF: T[b.ixfe], v: b.val, t: b.t }, O > 0 && (v.z = P[v.ixfe >> 8 & 63]), Tt(v, t, r.opts.Date1904), M({ c: b.c, r: b.r }, v, t);
          break;
        case 638:
          v = { ixfe: b.ixfe, XF: T[b.ixfe], v: b.rknum, t: "n" }, O > 0 && (v.z = P[v.ixfe >> 8 & 63]), Tt(v, t, r.opts.Date1904), M({ c: b.c, r: b.r }, v, t);
          break;
        case 189:
          for (var Be = b.c; Be <= b.C; ++Be) {
            var xe = b.rkrec[Be - b.c][0];
            v = { ixfe: xe, XF: T[xe], v: b.rkrec[Be - b.c][1], t: "n" }, O > 0 && (v.z = P[v.ixfe >> 8 & 63]), Tt(v, t, r.opts.Date1904), M({ c: Be, r: b.r }, v, t);
          }
          break;
        case 6:
        case 518:
        case 1030:
          {
            if (b.val == "String") {
              f = b;
              break;
            }
            if (v = gi(b.val, b.cell.ixfe, b.tt), v.XF = T[v.ixfe], t.cellFormula) {
              var ar = b.formula;
              if (ar && ar[0] && ar[0][0] && ar[0][0][0] == "PtgExp") {
                var Qr = ar[0][0][1][0], Et = ar[0][0][1][1], Ct = ye({ r: Qr, c: Et });
                w[Ct] ? v.f = "" + Ar(b.formula, s, b.cell, H, B) : v.F = ((t.dense ? (a[Qr] || [])[Et] : a[Ct]) || {}).F;
              } else v.f = "" + Ar(b.formula, s, b.cell, H, B);
            }
            O > 0 && (v.z = P[v.ixfe >> 8 & 63]), Tt(v, t, r.opts.Date1904), M(b.cell, v, t), f = b;
          }
          break;
        case 7:
        case 519:
          if (f)
            f.val = b, v = gi(b, f.cell.ixfe, "s"), v.XF = T[v.ixfe], t.cellFormula && (v.f = "" + Ar(f.formula, s, f.cell, H, B)), O > 0 && (v.z = P[v.ixfe >> 8 & 63]), Tt(v, t, r.opts.Date1904), M(f.cell, v, t), f = null;
          else throw new Error("String record expects Formula");
          break;
        case 33:
        case 545:
          {
            y.push(b);
            var la = ye(b[0].s);
            if (x = t.dense ? (a[b[0].s.r] || [])[b[0].s.c] : a[la], t.cellFormula && x) {
              if (!f || !la || !x) break;
              x.f = "" + Ar(b[1], s, b[0], H, B), x.F = Ae(b[0]);
            }
          }
          break;
        case 1212:
          {
            if (!t.cellFormula) break;
            if (u) {
              if (!f) break;
              w[ye(f.cell)] = b[0], x = t.dense ? (a[f.cell.r] || [])[f.cell.c] : a[ye(f.cell)], (x || {}).f = "" + Ar(b[0], s, h, H, B);
            }
          }
          break;
        case 253:
          v = gi(c[b.isst].t, b.ixfe, "s"), c[b.isst].h && (v.h = c[b.isst].h), v.XF = T[v.ixfe], O > 0 && (v.z = P[v.ixfe >> 8 & 63]), Tt(v, t, r.opts.Date1904), M({ c: b.c, r: b.r }, v, t);
          break;
        case 513:
          t.sheetStubs && (v = { ixfe: b.ixfe, XF: T[b.ixfe], t: "z" }, O > 0 && (v.z = P[v.ixfe >> 8 & 63]), Tt(v, t, r.opts.Date1904), M({ c: b.c, r: b.r }, v, t));
          break;
        case 190:
          if (t.sheetStubs)
            for (var zt = b.c; zt <= b.C; ++zt) {
              var Vr = b.ixfe[zt - b.c];
              v = { ixfe: Vr, XF: T[Vr], t: "z" }, O > 0 && (v.z = P[v.ixfe >> 8 & 63]), Tt(v, t, r.opts.Date1904), M({ c: zt, r: b.r }, v, t);
            }
          break;
        case 214:
        case 516:
        case 4:
          v = gi(b.val, b.ixfe, "s"), v.XF = T[v.ixfe], O > 0 && (v.z = P[v.ixfe >> 8 & 63]), Tt(v, t, r.opts.Date1904), M({ c: b.c, r: b.r }, v, t);
          break;
        case 0:
        case 512:
          Se === 1 && (s = b);
          break;
        case 252:
          c = b;
          break;
        case 1054:
          if (B.biff == 4) {
            P[O++] = b[1];
            for (var Ot = 0; Ot < O + 163 && Ee[Ot] != b[1]; ++Ot) ;
            Ot >= 163 && Pt(b[1], O + 163);
          } else Pt(b[1], b[0]);
          break;
        case 30:
          {
            P[O++] = b;
            for (var Gt = 0; Gt < O + 163 && Ee[Gt] != b; ++Gt) ;
            Gt >= 163 && Pt(b, O + 163);
          }
          break;
        case 229:
          he = he.concat(b);
          break;
        case 93:
          W[b.cmo[0]] = B.lastobj = b;
          break;
        case 438:
          B.lastobj.TxO = b;
          break;
        case 127:
          B.lastobj.ImData = b;
          break;
        case 440:
          for (m = b[0].s.r; m <= b[0].e.r; ++m)
            for (d = b[0].s.c; d <= b[0].e.c; ++d)
              x = t.dense ? (a[m] || [])[d] : a[ye({ c: d, r: m })], x && (x.l = b[1]);
          break;
        case 2048:
          for (m = b[0].s.r; m <= b[0].e.r; ++m)
            for (d = b[0].s.c; d <= b[0].e.c; ++d)
              x = t.dense ? (a[m] || [])[d] : a[ye({ c: d, r: m })], x && x.l && (x.l.Tooltip = b[1]);
          break;
        case 28:
          {
            if (B.biff <= 5 && B.biff >= 2) break;
            x = t.dense ? (a[b[0].r] || [])[b[0].c] : a[ye(b[0])];
            var ha = W[b[2]];
            x || (t.dense ? (a[b[0].r] || (a[b[0].r] = []), x = a[b[0].r][b[0].c] = { t: "z" }) : x = a[ye(b[0])] = { t: "z" }, s.e.r = Math.max(s.e.r, b[0].r), s.s.r = Math.min(s.s.r, b[0].r), s.e.c = Math.max(s.e.c, b[0].c), s.s.c = Math.min(s.s.c, b[0].c)), x.c || (x.c = []), g = { a: b[1], t: ha.TxO.t }, x.c.push(g);
          }
          break;
        case 2173:
          Bg(T[b.ixfe], b.ext);
          break;
        case 125:
          {
            if (!B.cellStyles) break;
            for (; b.e >= b.s; )
              ee[b.e--] = { width: b.w / 256, level: b.level || 0, hidden: !!(b.flags & 1) }, De || (De = !0, a0(b.w / 256)), rn(ee[b.e + 1]);
          }
          break;
        case 520:
          {
            var Ir = {};
            b.level != null && (ne[b.r] = Ir, Ir.level = b.level), b.hidden && (ne[b.r] = Ir, Ir.hidden = !0), b.hpt && (ne[b.r] = Ir, Ir.hpt = b.hpt, Ir.hpx = Zn(b.hpt));
          }
          break;
        case 38:
        case 39:
        case 40:
        case 41:
          a["!margins"] || wn(a["!margins"] = {}), a["!margins"][{ 38: "left", 39: "right", 40: "top", 41: "bottom" }[ce]] = b;
          break;
        case 161:
          a["!margins"] || wn(a["!margins"] = {}), a["!margins"].header = b.header, a["!margins"].footer = b.footer;
          break;
        case 574:
          b.RTL && (k.Views[0].RTL = !0);
          break;
        case 146:
          N = b;
          break;
        case 2198:
          Y = b;
          break;
        case 140:
          I = b;
          break;
        case 442:
          o ? U.CodeName = b || U.name : k.WBProps.CodeName = b || "ThisWorkbook";
          break;
      }
    } else
      te || console.error("Missing Info for XLS Record 0x" + ce.toString(16)), e.l += ie;
  }
  return r.SheetNames = nr(i).sort(function(yt, Oe) {
    return Number(yt) - Number(Oe);
  }).map(function(yt) {
    return i[yt].name;
  }), t.bookSheets || (r.Sheets = n), !r.SheetNames.length && l["!ref"] ? (r.SheetNames.push("Sheet1"), r.Sheets && (r.Sheets.Sheet1 = l)) : r.Preamble = l, r.Sheets && R.forEach(function(yt, Oe) {
    r.Sheets[r.SheetNames[Oe]]["!autofilter"] = yt;
  }), r.Strings = c, r.SSF = Ke(Ee), B.enc && (r.Encryption = B.enc), Y && (r.Themes = Y), r.Metadata = {}, I !== void 0 && (r.Metadata.Country = I), H.names.length > 0 && (k.Names = H.names), r.Workbook = k, r;
}
var Ca = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function jw(e, t, r) {
  var n = ve.find(e, "/!DocumentSummaryInformation");
  if (n && n.size > 0) try {
    var a = uf(n, _s, Ca.DSI);
    for (var i in a) t[i] = a[i];
  } catch (o) {
    if (r.WTF) throw o;
  }
  var s = ve.find(e, "/!SummaryInformation");
  if (s && s.size > 0) try {
    var f = uf(s, Es, Ca.SI);
    for (var c in f) t[c] == null && (t[c] = f[c]);
  } catch (o) {
    if (r.WTF) throw o;
  }
  t.HeadingPairs && t.TitlesOfParts && (eo(t.HeadingPairs, t.TitlesOfParts, t, r), delete t.HeadingPairs, delete t.TitlesOfParts);
}
function Yw(e, t) {
  var r = [], n = [], a = [], i = 0, s, f = H0(_s, "n"), c = H0(Es, "n");
  if (e.Props)
    for (s = nr(e.Props), i = 0; i < s.length; ++i) (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(c, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = nr(e.Custprops), i = 0; i < s.length; ++i) Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(c, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var o = [];
  for (i = 0; i < a.length; ++i)
    fo.indexOf(a[i][0]) > -1 || Qc.indexOf(a[i][0]) > -1 || a[i][1] != null && o.push(a[i]);
  n.length && ve.utils.cfb_add(t, "/SummaryInformation", xf(n, Ca.SI, c, Es)), (r.length || o.length) && ve.utils.cfb_add(t, "/DocumentSummaryInformation", xf(r, Ca.DSI, f, _s, o.length ? o : null, Ca.UDI));
}
function nl(e, t) {
  t || (t = {}), x0(t), Ds(), t.codepage && Bs(t.codepage);
  var r, n;
  if (e.FullPaths) {
    if (ve.find(e, "/encryption")) throw new Error("File is password-protected");
    r = ve.find(e, "!CompObj"), n = ve.find(e, "/Workbook") || ve.find(e, "/Book");
  } else {
    switch (t.type) {
      case "base64":
        e = Yr(Jr(e));
        break;
      case "binary":
        e = Yr(e);
        break;
      case "buffer":
        break;
      case "array":
        Array.isArray(e) || (e = Array.prototype.slice.call(e));
        break;
    }
    _r(e, 0), n = { content: e };
  }
  var a, i;
  if (r && $w(r), t.bookProps && !t.bookSheets) a = {};
  else {
    var s = Ce ? "buffer" : "array";
    if (n && n.content) a = Xw(n.content, t);
    else if ((i = ve.find(e, "PerfectOffice_MAIN")) && i.content) a = vn.to_workbook(i.content, (t.type = s, t));
    else if ((i = ve.find(e, "NativeContent_MAIN")) && i.content) a = vn.to_workbook(i.content, (t.type = s, t));
    else throw (i = ve.find(e, "MN0")) && i.content ? new Error("Unsupported Works 4 for Mac file") : new Error("Cannot find Workbook stream");
    t.bookVBA && e.FullPaths && ve.find(e, "/_VBA_PROJECT_CUR/VBA/dir") && (a.vbaraw = fm(e));
  }
  var f = {};
  return e.FullPaths && jw(
    /*::((*/
    e,
    f,
    t
  ), a.Props = a.Custprops = f, t.bookFiles && (a.cfb = e), a;
}
function Kw(e, t) {
  var r = t || {}, n = ve.utils.cfb_new({ root: "R" }), a = "/Workbook";
  switch (r.bookType || "xls") {
    case "xls":
      r.bookType = "biff8";
    case "xla":
      r.bookType || (r.bookType = "xla");
    case "biff8":
      a = "/Workbook", r.biff = 8;
      break;
    case "biff5":
      a = "/Book", r.biff = 5;
      break;
    default:
      throw new Error("invalid type " + r.bookType + " for XLS CFB");
  }
  return ve.utils.cfb_add(n, a, al(e, r)), r.biff == 8 && (e.Props || e.Custprops) && Yw(e, n), r.biff == 8 && e.vbaraw && cm(n, ve.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var $a = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: w2
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: F2
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: X2
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: R2
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: N2
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: $2
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: q2
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: U2
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: av
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: nv
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: rv
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: tv
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: C2
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: Y2
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: P2
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: B2
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: Ko
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: Q2
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: H2
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: Ys
  },
  /*::[*/
  20: {
    /* n:"BrtPCDIMissing" */
  },
  /*::[*/
  21: {
    /* n:"BrtPCDINumber" */
  },
  /*::[*/
  22: {
    /* n:"BrtPCDIBoolean" */
  },
  /*::[*/
  23: {
    /* n:"BrtPCDIError" */
  },
  /*::[*/
  24: {
    /* n:"BrtPCDIString" */
  },
  /*::[*/
  25: {
    /* n:"BrtPCDIDatetime" */
  },
  /*::[*/
  26: {
    /* n:"BrtPCDIIndex" */
  },
  /*::[*/
  27: {
    /* n:"BrtPCDIAMissing" */
  },
  /*::[*/
  28: {
    /* n:"BrtPCDIANumber" */
  },
  /*::[*/
  29: {
    /* n:"BrtPCDIABoolean" */
  },
  /*::[*/
  30: {
    /* n:"BrtPCDIAError" */
  },
  /*::[*/
  31: {
    /* n:"BrtPCDIAString" */
  },
  /*::[*/
  32: {
    /* n:"BrtPCDIADatetime" */
  },
  /*::[*/
  33: {
    /* n:"BrtPCRRecord" */
  },
  /*::[*/
  34: {
    /* n:"BrtPCRRecordDt" */
  },
  /*::[*/
  35: {
    /* n:"BrtFRTBegin", */
    T: 1
  },
  /*::[*/
  36: {
    /* n:"BrtFRTEnd", */
    T: -1
  },
  /*::[*/
  37: {
    /* n:"BrtACBegin", */
    T: 1
  },
  /*::[*/
  38: {
    /* n:"BrtACEnd", */
    T: -1
  },
  /*::[*/
  39: {
    /* n:"BrtName", */
    f: Qv
  },
  /*::[*/
  40: {
    /* n:"BrtIndexRowBlock" */
  },
  /*::[*/
  42: {
    /* n:"BrtIndexBlock" */
  },
  /*::[*/
  43: {
    /* n:"BrtFont", */
    f: qd
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: Kd
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: eg
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: tg
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: rg
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: yu
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: Lg
  },
  /*::[*/
  52: {
    /* n:"BrtBeginFmd", */
    T: 1
  },
  /*::[*/
  53: {
    /* n:"BrtEndFmd", */
    T: -1
  },
  /*::[*/
  54: {
    /* n:"BrtBeginMdx", */
    T: 1
  },
  /*::[*/
  55: {
    /* n:"BrtEndMdx", */
    T: -1
  },
  /*::[*/
  56: {
    /* n:"BrtBeginMdxTuple", */
    T: 1
  },
  /*::[*/
  57: {
    /* n:"BrtEndMdxTuple", */
    T: -1
  },
  /*::[*/
  58: {
    /* n:"BrtMdxMbrIstr" */
  },
  /*::[*/
  59: {
    /* n:"BrtStr" */
  },
  /*::[*/
  60: {
    /* n:"BrtColInfo", */
    f: wo
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: J2
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: Gg
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: _v
  },
  /*::[*/
  65: {
    /* n:"BrtSxvcellNum" */
  },
  /*::[*/
  66: {
    /* n:"BrtSxvcellStr" */
  },
  /*::[*/
  67: {
    /* n:"BrtSxvcellBool" */
  },
  /*::[*/
  68: {
    /* n:"BrtSxvcellErr" */
  },
  /*::[*/
  69: {
    /* n:"BrtSxvcellDate" */
  },
  /*::[*/
  70: {
    /* n:"BrtSxvcellNil" */
  },
  /*::[*/
  128: {
    /* n:"BrtFileVersion" */
  },
  /*::[*/
  129: {
    /* n:"BrtBeginSheet", */
    T: 1
  },
  /*::[*/
  130: {
    /* n:"BrtEndSheet", */
    T: -1
  },
  /*::[*/
  131: {
    /* n:"BrtBeginBook", */
    T: 1,
    f: Or,
    p: 0
  },
  /*::[*/
  132: {
    /* n:"BrtEndBook", */
    T: -1
  },
  /*::[*/
  133: {
    /* n:"BrtBeginWsViews", */
    T: 1
  },
  /*::[*/
  134: {
    /* n:"BrtEndWsViews", */
    T: -1
  },
  /*::[*/
  135: {
    /* n:"BrtBeginBookViews", */
    T: 1
  },
  /*::[*/
  136: {
    /* n:"BrtEndBookViews", */
    T: -1
  },
  /*::[*/
  137: {
    /* n:"BrtBeginWsView", */
    T: 1,
    f: mv
  },
  /*::[*/
  138: {
    /* n:"BrtEndWsView", */
    T: -1
  },
  /*::[*/
  139: {
    /* n:"BrtBeginCsViews", */
    T: 1
  },
  /*::[*/
  140: {
    /* n:"BrtEndCsViews", */
    T: -1
  },
  /*::[*/
  141: {
    /* n:"BrtBeginCsView", */
    T: 1
  },
  /*::[*/
  142: {
    /* n:"BrtEndCsView", */
    T: -1
  },
  /*::[*/
  143: {
    /* n:"BrtBeginBundleShs", */
    T: 1
  },
  /*::[*/
  144: {
    /* n:"BrtEndBundleShs", */
    T: -1
  },
  /*::[*/
  145: {
    /* n:"BrtBeginSheetData", */
    T: 1
  },
  /*::[*/
  146: {
    /* n:"BrtEndSheetData", */
    T: -1
  },
  /*::[*/
  147: {
    /* n:"BrtWsProp", */
    f: k2
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: y2,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: lv
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: Jv
  },
  /*::[*/
  154: {
    /* n:"BrtWbFactoid" */
  },
  /*::[*/
  155: {
    /* n:"BrtFileRecover" */
  },
  /*::[*/
  156: {
    /* n:"BrtBundleSh", */
    f: Yv
  },
  /*::[*/
  157: {
    /* n:"BrtCalcProp" */
  },
  /*::[*/
  158: {
    /* n:"BrtBookView" */
  },
  /*::[*/
  159: {
    /* n:"BrtBeginSst", */
    T: 1,
    f: ud
  },
  /*::[*/
  160: {
    /* n:"BrtEndSst", */
    T: -1
  },
  /*::[*/
  161: {
    /* n:"BrtBeginAFilter", */
    T: 1,
    f: Nn
  },
  /*::[*/
  162: {
    /* n:"BrtEndAFilter", */
    T: -1
  },
  /*::[*/
  163: {
    /* n:"BrtBeginFilterColumn", */
    T: 1
  },
  /*::[*/
  164: {
    /* n:"BrtEndFilterColumn", */
    T: -1
  },
  /*::[*/
  165: {
    /* n:"BrtBeginFilters", */
    T: 1
  },
  /*::[*/
  166: {
    /* n:"BrtEndFilters", */
    T: -1
  },
  /*::[*/
  167: {
    /* n:"BrtFilter" */
  },
  /*::[*/
  168: {
    /* n:"BrtColorFilter" */
  },
  /*::[*/
  169: {
    /* n:"BrtIconFilter" */
  },
  /*::[*/
  170: {
    /* n:"BrtTop10Filter" */
  },
  /*::[*/
  171: {
    /* n:"BrtDynamicFilter" */
  },
  /*::[*/
  172: {
    /* n:"BrtBeginCustomFilters", */
    T: 1
  },
  /*::[*/
  173: {
    /* n:"BrtEndCustomFilters", */
    T: -1
  },
  /*::[*/
  174: {
    /* n:"BrtCustomFilter" */
  },
  /*::[*/
  175: {
    /* n:"BrtAFilterDateGroupItem" */
  },
  /*::[*/
  176: {
    /* n:"BrtMergeCell", */
    f: iv
  },
  /*::[*/
  177: {
    /* n:"BrtBeginMergeCells", */
    T: 1
  },
  /*::[*/
  178: {
    /* n:"BrtEndMergeCells", */
    T: -1
  },
  /*::[*/
  179: {
    /* n:"BrtBeginPivotCacheDef", */
    T: 1
  },
  /*::[*/
  180: {
    /* n:"BrtEndPivotCacheDef", */
    T: -1
  },
  /*::[*/
  181: {
    /* n:"BrtBeginPCDFields", */
    T: 1
  },
  /*::[*/
  182: {
    /* n:"BrtEndPCDFields", */
    T: -1
  },
  /*::[*/
  183: {
    /* n:"BrtBeginPCDField", */
    T: 1
  },
  /*::[*/
  184: {
    /* n:"BrtEndPCDField", */
    T: -1
  },
  /*::[*/
  185: {
    /* n:"BrtBeginPCDSource", */
    T: 1
  },
  /*::[*/
  186: {
    /* n:"BrtEndPCDSource", */
    T: -1
  },
  /*::[*/
  187: {
    /* n:"BrtBeginPCDSRange", */
    T: 1
  },
  /*::[*/
  188: {
    /* n:"BrtEndPCDSRange", */
    T: -1
  },
  /*::[*/
  189: {
    /* n:"BrtBeginPCDFAtbl", */
    T: 1
  },
  /*::[*/
  190: {
    /* n:"BrtEndPCDFAtbl", */
    T: -1
  },
  /*::[*/
  191: {
    /* n:"BrtBeginPCDIRun", */
    T: 1
  },
  /*::[*/
  192: {
    /* n:"BrtEndPCDIRun", */
    T: -1
  },
  /*::[*/
  193: {
    /* n:"BrtBeginPivotCacheRecords", */
    T: 1
  },
  /*::[*/
  194: {
    /* n:"BrtEndPivotCacheRecords", */
    T: -1
  },
  /*::[*/
  195: {
    /* n:"BrtBeginPCDHierarchies", */
    T: 1
  },
  /*::[*/
  196: {
    /* n:"BrtEndPCDHierarchies", */
    T: -1
  },
  /*::[*/
  197: {
    /* n:"BrtBeginPCDHierarchy", */
    T: 1
  },
  /*::[*/
  198: {
    /* n:"BrtEndPCDHierarchy", */
    T: -1
  },
  /*::[*/
  199: {
    /* n:"BrtBeginPCDHFieldsUsage", */
    T: 1
  },
  /*::[*/
  200: {
    /* n:"BrtEndPCDHFieldsUsage", */
    T: -1
  },
  /*::[*/
  201: {
    /* n:"BrtBeginExtConnection", */
    T: 1
  },
  /*::[*/
  202: {
    /* n:"BrtEndExtConnection", */
    T: -1
  },
  /*::[*/
  203: {
    /* n:"BrtBeginECDbProps", */
    T: 1
  },
  /*::[*/
  204: {
    /* n:"BrtEndECDbProps", */
    T: -1
  },
  /*::[*/
  205: {
    /* n:"BrtBeginECOlapProps", */
    T: 1
  },
  /*::[*/
  206: {
    /* n:"BrtEndECOlapProps", */
    T: -1
  },
  /*::[*/
  207: {
    /* n:"BrtBeginPCDSConsol", */
    T: 1
  },
  /*::[*/
  208: {
    /* n:"BrtEndPCDSConsol", */
    T: -1
  },
  /*::[*/
  209: {
    /* n:"BrtBeginPCDSCPages", */
    T: 1
  },
  /*::[*/
  210: {
    /* n:"BrtEndPCDSCPages", */
    T: -1
  },
  /*::[*/
  211: {
    /* n:"BrtBeginPCDSCPage", */
    T: 1
  },
  /*::[*/
  212: {
    /* n:"BrtEndPCDSCPage", */
    T: -1
  },
  /*::[*/
  213: {
    /* n:"BrtBeginPCDSCPItem", */
    T: 1
  },
  /*::[*/
  214: {
    /* n:"BrtEndPCDSCPItem", */
    T: -1
  },
  /*::[*/
  215: {
    /* n:"BrtBeginPCDSCSets", */
    T: 1
  },
  /*::[*/
  216: {
    /* n:"BrtEndPCDSCSets", */
    T: -1
  },
  /*::[*/
  217: {
    /* n:"BrtBeginPCDSCSet", */
    T: 1
  },
  /*::[*/
  218: {
    /* n:"BrtEndPCDSCSet", */
    T: -1
  },
  /*::[*/
  219: {
    /* n:"BrtBeginPCDFGroup", */
    T: 1
  },
  /*::[*/
  220: {
    /* n:"BrtEndPCDFGroup", */
    T: -1
  },
  /*::[*/
  221: {
    /* n:"BrtBeginPCDFGItems", */
    T: 1
  },
  /*::[*/
  222: {
    /* n:"BrtEndPCDFGItems", */
    T: -1
  },
  /*::[*/
  223: {
    /* n:"BrtBeginPCDFGRange", */
    T: 1
  },
  /*::[*/
  224: {
    /* n:"BrtEndPCDFGRange", */
    T: -1
  },
  /*::[*/
  225: {
    /* n:"BrtBeginPCDFGDiscrete", */
    T: 1
  },
  /*::[*/
  226: {
    /* n:"BrtEndPCDFGDiscrete", */
    T: -1
  },
  /*::[*/
  227: {
    /* n:"BrtBeginPCDSDTupleCache", */
    T: 1
  },
  /*::[*/
  228: {
    /* n:"BrtEndPCDSDTupleCache", */
    T: -1
  },
  /*::[*/
  229: {
    /* n:"BrtBeginPCDSDTCEntries", */
    T: 1
  },
  /*::[*/
  230: {
    /* n:"BrtEndPCDSDTCEntries", */
    T: -1
  },
  /*::[*/
  231: {
    /* n:"BrtBeginPCDSDTCEMembers", */
    T: 1
  },
  /*::[*/
  232: {
    /* n:"BrtEndPCDSDTCEMembers", */
    T: -1
  },
  /*::[*/
  233: {
    /* n:"BrtBeginPCDSDTCEMember", */
    T: 1
  },
  /*::[*/
  234: {
    /* n:"BrtEndPCDSDTCEMember", */
    T: -1
  },
  /*::[*/
  235: {
    /* n:"BrtBeginPCDSDTCQueries", */
    T: 1
  },
  /*::[*/
  236: {
    /* n:"BrtEndPCDSDTCQueries", */
    T: -1
  },
  /*::[*/
  237: {
    /* n:"BrtBeginPCDSDTCQuery", */
    T: 1
  },
  /*::[*/
  238: {
    /* n:"BrtEndPCDSDTCQuery", */
    T: -1
  },
  /*::[*/
  239: {
    /* n:"BrtBeginPCDSDTCSets", */
    T: 1
  },
  /*::[*/
  240: {
    /* n:"BrtEndPCDSDTCSets", */
    T: -1
  },
  /*::[*/
  241: {
    /* n:"BrtBeginPCDSDTCSet", */
    T: 1
  },
  /*::[*/
  242: {
    /* n:"BrtEndPCDSDTCSet", */
    T: -1
  },
  /*::[*/
  243: {
    /* n:"BrtBeginPCDCalcItems", */
    T: 1
  },
  /*::[*/
  244: {
    /* n:"BrtEndPCDCalcItems", */
    T: -1
  },
  /*::[*/
  245: {
    /* n:"BrtBeginPCDCalcItem", */
    T: 1
  },
  /*::[*/
  246: {
    /* n:"BrtEndPCDCalcItem", */
    T: -1
  },
  /*::[*/
  247: {
    /* n:"BrtBeginPRule", */
    T: 1
  },
  /*::[*/
  248: {
    /* n:"BrtEndPRule", */
    T: -1
  },
  /*::[*/
  249: {
    /* n:"BrtBeginPRFilters", */
    T: 1
  },
  /*::[*/
  250: {
    /* n:"BrtEndPRFilters", */
    T: -1
  },
  /*::[*/
  251: {
    /* n:"BrtBeginPRFilter", */
    T: 1
  },
  /*::[*/
  252: {
    /* n:"BrtEndPRFilter", */
    T: -1
  },
  /*::[*/
  253: {
    /* n:"BrtBeginPNames", */
    T: 1
  },
  /*::[*/
  254: {
    /* n:"BrtEndPNames", */
    T: -1
  },
  /*::[*/
  255: {
    /* n:"BrtBeginPName", */
    T: 1
  },
  /*::[*/
  256: {
    /* n:"BrtEndPName", */
    T: -1
  },
  /*::[*/
  257: {
    /* n:"BrtBeginPNPairs", */
    T: 1
  },
  /*::[*/
  258: {
    /* n:"BrtEndPNPairs", */
    T: -1
  },
  /*::[*/
  259: {
    /* n:"BrtBeginPNPair", */
    T: 1
  },
  /*::[*/
  260: {
    /* n:"BrtEndPNPair", */
    T: -1
  },
  /*::[*/
  261: {
    /* n:"BrtBeginECWebProps", */
    T: 1
  },
  /*::[*/
  262: {
    /* n:"BrtEndECWebProps", */
    T: -1
  },
  /*::[*/
  263: {
    /* n:"BrtBeginEcWpTables", */
    T: 1
  },
  /*::[*/
  264: {
    /* n:"BrtEndECWPTables", */
    T: -1
  },
  /*::[*/
  265: {
    /* n:"BrtBeginECParams", */
    T: 1
  },
  /*::[*/
  266: {
    /* n:"BrtEndECParams", */
    T: -1
  },
  /*::[*/
  267: {
    /* n:"BrtBeginECParam", */
    T: 1
  },
  /*::[*/
  268: {
    /* n:"BrtEndECParam", */
    T: -1
  },
  /*::[*/
  269: {
    /* n:"BrtBeginPCDKPIs", */
    T: 1
  },
  /*::[*/
  270: {
    /* n:"BrtEndPCDKPIs", */
    T: -1
  },
  /*::[*/
  271: {
    /* n:"BrtBeginPCDKPI", */
    T: 1
  },
  /*::[*/
  272: {
    /* n:"BrtEndPCDKPI", */
    T: -1
  },
  /*::[*/
  273: {
    /* n:"BrtBeginDims", */
    T: 1
  },
  /*::[*/
  274: {
    /* n:"BrtEndDims", */
    T: -1
  },
  /*::[*/
  275: {
    /* n:"BrtBeginDim", */
    T: 1
  },
  /*::[*/
  276: {
    /* n:"BrtEndDim", */
    T: -1
  },
  /*::[*/
  277: {
    /* n:"BrtIndexPartEnd" */
  },
  /*::[*/
  278: {
    /* n:"BrtBeginStyleSheet", */
    T: 1
  },
  /*::[*/
  279: {
    /* n:"BrtEndStyleSheet", */
    T: -1
  },
  /*::[*/
  280: {
    /* n:"BrtBeginSXView", */
    T: 1
  },
  /*::[*/
  281: {
    /* n:"BrtEndSXVI", */
    T: -1
  },
  /*::[*/
  282: {
    /* n:"BrtBeginSXVI", */
    T: 1
  },
  /*::[*/
  283: {
    /* n:"BrtBeginSXVIs", */
    T: 1
  },
  /*::[*/
  284: {
    /* n:"BrtEndSXVIs", */
    T: -1
  },
  /*::[*/
  285: {
    /* n:"BrtBeginSXVD", */
    T: 1
  },
  /*::[*/
  286: {
    /* n:"BrtEndSXVD", */
    T: -1
  },
  /*::[*/
  287: {
    /* n:"BrtBeginSXVDs", */
    T: 1
  },
  /*::[*/
  288: {
    /* n:"BrtEndSXVDs", */
    T: -1
  },
  /*::[*/
  289: {
    /* n:"BrtBeginSXPI", */
    T: 1
  },
  /*::[*/
  290: {
    /* n:"BrtEndSXPI", */
    T: -1
  },
  /*::[*/
  291: {
    /* n:"BrtBeginSXPIs", */
    T: 1
  },
  /*::[*/
  292: {
    /* n:"BrtEndSXPIs", */
    T: -1
  },
  /*::[*/
  293: {
    /* n:"BrtBeginSXDI", */
    T: 1
  },
  /*::[*/
  294: {
    /* n:"BrtEndSXDI", */
    T: -1
  },
  /*::[*/
  295: {
    /* n:"BrtBeginSXDIs", */
    T: 1
  },
  /*::[*/
  296: {
    /* n:"BrtEndSXDIs", */
    T: -1
  },
  /*::[*/
  297: {
    /* n:"BrtBeginSXLI", */
    T: 1
  },
  /*::[*/
  298: {
    /* n:"BrtEndSXLI", */
    T: -1
  },
  /*::[*/
  299: {
    /* n:"BrtBeginSXLIRws", */
    T: 1
  },
  /*::[*/
  300: {
    /* n:"BrtEndSXLIRws", */
    T: -1
  },
  /*::[*/
  301: {
    /* n:"BrtBeginSXLICols", */
    T: 1
  },
  /*::[*/
  302: {
    /* n:"BrtEndSXLICols", */
    T: -1
  },
  /*::[*/
  303: {
    /* n:"BrtBeginSXFormat", */
    T: 1
  },
  /*::[*/
  304: {
    /* n:"BrtEndSXFormat", */
    T: -1
  },
  /*::[*/
  305: {
    /* n:"BrtBeginSXFormats", */
    T: 1
  },
  /*::[*/
  306: {
    /* n:"BrtEndSxFormats", */
    T: -1
  },
  /*::[*/
  307: {
    /* n:"BrtBeginSxSelect", */
    T: 1
  },
  /*::[*/
  308: {
    /* n:"BrtEndSxSelect", */
    T: -1
  },
  /*::[*/
  309: {
    /* n:"BrtBeginISXVDRws", */
    T: 1
  },
  /*::[*/
  310: {
    /* n:"BrtEndISXVDRws", */
    T: -1
  },
  /*::[*/
  311: {
    /* n:"BrtBeginISXVDCols", */
    T: 1
  },
  /*::[*/
  312: {
    /* n:"BrtEndISXVDCols", */
    T: -1
  },
  /*::[*/
  313: {
    /* n:"BrtEndSXLocation", */
    T: -1
  },
  /*::[*/
  314: {
    /* n:"BrtBeginSXLocation", */
    T: 1
  },
  /*::[*/
  315: {
    /* n:"BrtEndSXView", */
    T: -1
  },
  /*::[*/
  316: {
    /* n:"BrtBeginSXTHs", */
    T: 1
  },
  /*::[*/
  317: {
    /* n:"BrtEndSXTHs", */
    T: -1
  },
  /*::[*/
  318: {
    /* n:"BrtBeginSXTH", */
    T: 1
  },
  /*::[*/
  319: {
    /* n:"BrtEndSXTH", */
    T: -1
  },
  /*::[*/
  320: {
    /* n:"BrtBeginISXTHRws", */
    T: 1
  },
  /*::[*/
  321: {
    /* n:"BrtEndISXTHRws", */
    T: -1
  },
  /*::[*/
  322: {
    /* n:"BrtBeginISXTHCols", */
    T: 1
  },
  /*::[*/
  323: {
    /* n:"BrtEndISXTHCols", */
    T: -1
  },
  /*::[*/
  324: {
    /* n:"BrtBeginSXTDMPS", */
    T: 1
  },
  /*::[*/
  325: {
    /* n:"BrtEndSXTDMPs", */
    T: -1
  },
  /*::[*/
  326: {
    /* n:"BrtBeginSXTDMP", */
    T: 1
  },
  /*::[*/
  327: {
    /* n:"BrtEndSXTDMP", */
    T: -1
  },
  /*::[*/
  328: {
    /* n:"BrtBeginSXTHItems", */
    T: 1
  },
  /*::[*/
  329: {
    /* n:"BrtEndSXTHItems", */
    T: -1
  },
  /*::[*/
  330: {
    /* n:"BrtBeginSXTHItem", */
    T: 1
  },
  /*::[*/
  331: {
    /* n:"BrtEndSXTHItem", */
    T: -1
  },
  /*::[*/
  332: {
    /* n:"BrtBeginMetadata", */
    T: 1
  },
  /*::[*/
  333: {
    /* n:"BrtEndMetadata", */
    T: -1
  },
  /*::[*/
  334: {
    /* n:"BrtBeginEsmdtinfo", */
    T: 1
  },
  /*::[*/
  335: {
    /* n:"BrtMdtinfo", */
    f: Dg
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: Ug,
    T: 1
  },
  /*::[*/
  338: {
    /* n:"BrtEndEsmdb", */
    T: -1
  },
  /*::[*/
  339: {
    /* n:"BrtBeginEsfmd", */
    T: 1
  },
  /*::[*/
  340: {
    /* n:"BrtEndEsfmd", */
    T: -1
  },
  /*::[*/
  341: {
    /* n:"BrtBeginSingleCells", */
    T: 1
  },
  /*::[*/
  342: {
    /* n:"BrtEndSingleCells", */
    T: -1
  },
  /*::[*/
  343: {
    /* n:"BrtBeginList", */
    T: 1
  },
  /*::[*/
  344: {
    /* n:"BrtEndList", */
    T: -1
  },
  /*::[*/
  345: {
    /* n:"BrtBeginListCols", */
    T: 1
  },
  /*::[*/
  346: {
    /* n:"BrtEndListCols", */
    T: -1
  },
  /*::[*/
  347: {
    /* n:"BrtBeginListCol", */
    T: 1
  },
  /*::[*/
  348: {
    /* n:"BrtEndListCol", */
    T: -1
  },
  /*::[*/
  349: {
    /* n:"BrtBeginListXmlCPr", */
    T: 1
  },
  /*::[*/
  350: {
    /* n:"BrtEndListXmlCPr", */
    T: -1
  },
  /*::[*/
  351: {
    /* n:"BrtListCCFmla" */
  },
  /*::[*/
  352: {
    /* n:"BrtListTrFmla" */
  },
  /*::[*/
  353: {
    /* n:"BrtBeginExternals", */
    T: 1
  },
  /*::[*/
  354: {
    /* n:"BrtEndExternals", */
    T: -1
  },
  /*::[*/
  355: {
    /* n:"BrtSupBookSrc", */
    f: ws
  },
  /*::[*/
  357: {
    /* n:"BrtSupSelf" */
  },
  /*::[*/
  358: {
    /* n:"BrtSupSame" */
  },
  /*::[*/
  359: {
    /* n:"BrtSupTabs" */
  },
  /*::[*/
  360: {
    /* n:"BrtBeginSupBook", */
    T: 1
  },
  /*::[*/
  361: {
    /* n:"BrtPlaceholderName" */
  },
  /*::[*/
  362: {
    /* n:"BrtExternSheet", */
    f: vo
  },
  /*::[*/
  363: {
    /* n:"BrtExternTableStart" */
  },
  /*::[*/
  364: {
    /* n:"BrtExternTableEnd" */
  },
  /*::[*/
  366: {
    /* n:"BrtExternRowHdr" */
  },
  /*::[*/
  367: {
    /* n:"BrtExternCellBlank" */
  },
  /*::[*/
  368: {
    /* n:"BrtExternCellReal" */
  },
  /*::[*/
  369: {
    /* n:"BrtExternCellBool" */
  },
  /*::[*/
  370: {
    /* n:"BrtExternCellError" */
  },
  /*::[*/
  371: {
    /* n:"BrtExternCellString" */
  },
  /*::[*/
  372: {
    /* n:"BrtBeginEsmdx", */
    T: 1
  },
  /*::[*/
  373: {
    /* n:"BrtEndEsmdx", */
    T: -1
  },
  /*::[*/
  374: {
    /* n:"BrtBeginMdxSet", */
    T: 1
  },
  /*::[*/
  375: {
    /* n:"BrtEndMdxSet", */
    T: -1
  },
  /*::[*/
  376: {
    /* n:"BrtBeginMdxMbrProp", */
    T: 1
  },
  /*::[*/
  377: {
    /* n:"BrtEndMdxMbrProp", */
    T: -1
  },
  /*::[*/
  378: {
    /* n:"BrtBeginMdxKPI", */
    T: 1
  },
  /*::[*/
  379: {
    /* n:"BrtEndMdxKPI", */
    T: -1
  },
  /*::[*/
  380: {
    /* n:"BrtBeginEsstr", */
    T: 1
  },
  /*::[*/
  381: {
    /* n:"BrtEndEsstr", */
    T: -1
  },
  /*::[*/
  382: {
    /* n:"BrtBeginPRFItem", */
    T: 1
  },
  /*::[*/
  383: {
    /* n:"BrtEndPRFItem", */
    T: -1
  },
  /*::[*/
  384: {
    /* n:"BrtBeginPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  385: {
    /* n:"BrtEndPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  386: {
    /* n:"BrtBeginPivotCacheID", */
    T: 1
  },
  /*::[*/
  387: {
    /* n:"BrtEndPivotCacheID", */
    T: -1
  },
  /*::[*/
  388: {
    /* n:"BrtBeginISXVIs", */
    T: 1
  },
  /*::[*/
  389: {
    /* n:"BrtEndISXVIs", */
    T: -1
  },
  /*::[*/
  390: {
    /* n:"BrtBeginColInfos", */
    T: 1
  },
  /*::[*/
  391: {
    /* n:"BrtEndColInfos", */
    T: -1
  },
  /*::[*/
  392: {
    /* n:"BrtBeginRwBrk", */
    T: 1
  },
  /*::[*/
  393: {
    /* n:"BrtEndRwBrk", */
    T: -1
  },
  /*::[*/
  394: {
    /* n:"BrtBeginColBrk", */
    T: 1
  },
  /*::[*/
  395: {
    /* n:"BrtEndColBrk", */
    T: -1
  },
  /*::[*/
  396: {
    /* n:"BrtBrk" */
  },
  /*::[*/
  397: {
    /* n:"BrtUserBookView" */
  },
  /*::[*/
  398: {
    /* n:"BrtInfo" */
  },
  /*::[*/
  399: {
    /* n:"BrtCUsr" */
  },
  /*::[*/
  400: {
    /* n:"BrtUsr" */
  },
  /*::[*/
  401: {
    /* n:"BrtBeginUsers", */
    T: 1
  },
  /*::[*/
  403: {
    /* n:"BrtEOF" */
  },
  /*::[*/
  404: {
    /* n:"BrtUCR" */
  },
  /*::[*/
  405: {
    /* n:"BrtRRInsDel" */
  },
  /*::[*/
  406: {
    /* n:"BrtRREndInsDel" */
  },
  /*::[*/
  407: {
    /* n:"BrtRRMove" */
  },
  /*::[*/
  408: {
    /* n:"BrtRREndMove" */
  },
  /*::[*/
  409: {
    /* n:"BrtRRChgCell" */
  },
  /*::[*/
  410: {
    /* n:"BrtRREndChgCell" */
  },
  /*::[*/
  411: {
    /* n:"BrtRRHeader" */
  },
  /*::[*/
  412: {
    /* n:"BrtRRUserView" */
  },
  /*::[*/
  413: {
    /* n:"BrtRRRenSheet" */
  },
  /*::[*/
  414: {
    /* n:"BrtRRInsertSh" */
  },
  /*::[*/
  415: {
    /* n:"BrtRRDefName" */
  },
  /*::[*/
  416: {
    /* n:"BrtRRNote" */
  },
  /*::[*/
  417: {
    /* n:"BrtRRConflict" */
  },
  /*::[*/
  418: {
    /* n:"BrtRRTQSIF" */
  },
  /*::[*/
  419: {
    /* n:"BrtRRFormat" */
  },
  /*::[*/
  420: {
    /* n:"BrtRREndFormat" */
  },
  /*::[*/
  421: {
    /* n:"BrtRRAutoFmt" */
  },
  /*::[*/
  422: {
    /* n:"BrtBeginUserShViews", */
    T: 1
  },
  /*::[*/
  423: {
    /* n:"BrtBeginUserShView", */
    T: 1
  },
  /*::[*/
  424: {
    /* n:"BrtEndUserShView", */
    T: -1
  },
  /*::[*/
  425: {
    /* n:"BrtEndUserShViews", */
    T: -1
  },
  /*::[*/
  426: {
    /* n:"BrtArrFmla", */
    f: hv
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: uv
  },
  /*::[*/
  428: {
    /* n:"BrtTable" */
  },
  /*::[*/
  429: {
    /* n:"BrtBeginExtConnections", */
    T: 1
  },
  /*::[*/
  430: {
    /* n:"BrtEndExtConnections", */
    T: -1
  },
  /*::[*/
  431: {
    /* n:"BrtBeginPCDCalcMems", */
    T: 1
  },
  /*::[*/
  432: {
    /* n:"BrtEndPCDCalcMems", */
    T: -1
  },
  /*::[*/
  433: {
    /* n:"BrtBeginPCDCalcMem", */
    T: 1
  },
  /*::[*/
  434: {
    /* n:"BrtEndPCDCalcMem", */
    T: -1
  },
  /*::[*/
  435: {
    /* n:"BrtBeginPCDHGLevels", */
    T: 1
  },
  /*::[*/
  436: {
    /* n:"BrtEndPCDHGLevels", */
    T: -1
  },
  /*::[*/
  437: {
    /* n:"BrtBeginPCDHGLevel", */
    T: 1
  },
  /*::[*/
  438: {
    /* n:"BrtEndPCDHGLevel", */
    T: -1
  },
  /*::[*/
  439: {
    /* n:"BrtBeginPCDHGLGroups", */
    T: 1
  },
  /*::[*/
  440: {
    /* n:"BrtEndPCDHGLGroups", */
    T: -1
  },
  /*::[*/
  441: {
    /* n:"BrtBeginPCDHGLGroup", */
    T: 1
  },
  /*::[*/
  442: {
    /* n:"BrtEndPCDHGLGroup", */
    T: -1
  },
  /*::[*/
  443: {
    /* n:"BrtBeginPCDHGLGMembers", */
    T: 1
  },
  /*::[*/
  444: {
    /* n:"BrtEndPCDHGLGMembers", */
    T: -1
  },
  /*::[*/
  445: {
    /* n:"BrtBeginPCDHGLGMember", */
    T: 1
  },
  /*::[*/
  446: {
    /* n:"BrtEndPCDHGLGMember", */
    T: -1
  },
  /*::[*/
  447: {
    /* n:"BrtBeginQSI", */
    T: 1
  },
  /*::[*/
  448: {
    /* n:"BrtEndQSI", */
    T: -1
  },
  /*::[*/
  449: {
    /* n:"BrtBeginQSIR", */
    T: 1
  },
  /*::[*/
  450: {
    /* n:"BrtEndQSIR", */
    T: -1
  },
  /*::[*/
  451: {
    /* n:"BrtBeginDeletedNames", */
    T: 1
  },
  /*::[*/
  452: {
    /* n:"BrtEndDeletedNames", */
    T: -1
  },
  /*::[*/
  453: {
    /* n:"BrtBeginDeletedName", */
    T: 1
  },
  /*::[*/
  454: {
    /* n:"BrtEndDeletedName", */
    T: -1
  },
  /*::[*/
  455: {
    /* n:"BrtBeginQSIFs", */
    T: 1
  },
  /*::[*/
  456: {
    /* n:"BrtEndQSIFs", */
    T: -1
  },
  /*::[*/
  457: {
    /* n:"BrtBeginQSIF", */
    T: 1
  },
  /*::[*/
  458: {
    /* n:"BrtEndQSIF", */
    T: -1
  },
  /*::[*/
  459: {
    /* n:"BrtBeginAutoSortScope", */
    T: 1
  },
  /*::[*/
  460: {
    /* n:"BrtEndAutoSortScope", */
    T: -1
  },
  /*::[*/
  461: {
    /* n:"BrtBeginConditionalFormatting", */
    T: 1
  },
  /*::[*/
  462: {
    /* n:"BrtEndConditionalFormatting", */
    T: -1
  },
  /*::[*/
  463: {
    /* n:"BrtBeginCFRule", */
    T: 1
  },
  /*::[*/
  464: {
    /* n:"BrtEndCFRule", */
    T: -1
  },
  /*::[*/
  465: {
    /* n:"BrtBeginIconSet", */
    T: 1
  },
  /*::[*/
  466: {
    /* n:"BrtEndIconSet", */
    T: -1
  },
  /*::[*/
  467: {
    /* n:"BrtBeginDatabar", */
    T: 1
  },
  /*::[*/
  468: {
    /* n:"BrtEndDatabar", */
    T: -1
  },
  /*::[*/
  469: {
    /* n:"BrtBeginColorScale", */
    T: 1
  },
  /*::[*/
  470: {
    /* n:"BrtEndColorScale", */
    T: -1
  },
  /*::[*/
  471: {
    /* n:"BrtCFVO" */
  },
  /*::[*/
  472: {
    /* n:"BrtExternValueMeta" */
  },
  /*::[*/
  473: {
    /* n:"BrtBeginColorPalette", */
    T: 1
  },
  /*::[*/
  474: {
    /* n:"BrtEndColorPalette", */
    T: -1
  },
  /*::[*/
  475: {
    /* n:"BrtIndexedColor" */
  },
  /*::[*/
  476: {
    /* n:"BrtMargins", */
    f: dv
  },
  /*::[*/
  477: {
    /* n:"BrtPrintOptions" */
  },
  /*::[*/
  478: {
    /* n:"BrtPageSetup" */
  },
  /*::[*/
  479: {
    /* n:"BrtBeginHeaderFooter", */
    T: 1
  },
  /*::[*/
  480: {
    /* n:"BrtEndHeaderFooter", */
    T: -1
  },
  /*::[*/
  481: {
    /* n:"BrtBeginSXCrtFormat", */
    T: 1
  },
  /*::[*/
  482: {
    /* n:"BrtEndSXCrtFormat", */
    T: -1
  },
  /*::[*/
  483: {
    /* n:"BrtBeginSXCrtFormats", */
    T: 1
  },
  /*::[*/
  484: {
    /* n:"BrtEndSXCrtFormats", */
    T: -1
  },
  /*::[*/
  485: {
    /* n:"BrtWsFmtInfo", */
    f: S2
  },
  /*::[*/
  486: {
    /* n:"BrtBeginMgs", */
    T: 1
  },
  /*::[*/
  487: {
    /* n:"BrtEndMGs", */
    T: -1
  },
  /*::[*/
  488: {
    /* n:"BrtBeginMGMaps", */
    T: 1
  },
  /*::[*/
  489: {
    /* n:"BrtEndMGMaps", */
    T: -1
  },
  /*::[*/
  490: {
    /* n:"BrtBeginMG", */
    T: 1
  },
  /*::[*/
  491: {
    /* n:"BrtEndMG", */
    T: -1
  },
  /*::[*/
  492: {
    /* n:"BrtBeginMap", */
    T: 1
  },
  /*::[*/
  493: {
    /* n:"BrtEndMap", */
    T: -1
  },
  /*::[*/
  494: {
    /* n:"BrtHLink", */
    f: cv
  },
  /*::[*/
  495: {
    /* n:"BrtBeginDCon", */
    T: 1
  },
  /*::[*/
  496: {
    /* n:"BrtEndDCon", */
    T: -1
  },
  /*::[*/
  497: {
    /* n:"BrtBeginDRefs", */
    T: 1
  },
  /*::[*/
  498: {
    /* n:"BrtEndDRefs", */
    T: -1
  },
  /*::[*/
  499: {
    /* n:"BrtDRef" */
  },
  /*::[*/
  500: {
    /* n:"BrtBeginScenMan", */
    T: 1
  },
  /*::[*/
  501: {
    /* n:"BrtEndScenMan", */
    T: -1
  },
  /*::[*/
  502: {
    /* n:"BrtBeginSct", */
    T: 1
  },
  /*::[*/
  503: {
    /* n:"BrtEndSct", */
    T: -1
  },
  /*::[*/
  504: {
    /* n:"BrtSlc" */
  },
  /*::[*/
  505: {
    /* n:"BrtBeginDXFs", */
    T: 1
  },
  /*::[*/
  506: {
    /* n:"BrtEndDXFs", */
    T: -1
  },
  /*::[*/
  507: {
    /* n:"BrtDXF" */
  },
  /*::[*/
  508: {
    /* n:"BrtBeginTableStyles", */
    T: 1
  },
  /*::[*/
  509: {
    /* n:"BrtEndTableStyles", */
    T: -1
  },
  /*::[*/
  510: {
    /* n:"BrtBeginTableStyle", */
    T: 1
  },
  /*::[*/
  511: {
    /* n:"BrtEndTableStyle", */
    T: -1
  },
  /*::[*/
  512: {
    /* n:"BrtTableStyleElement" */
  },
  /*::[*/
  513: {
    /* n:"BrtTableStyleClient" */
  },
  /*::[*/
  514: {
    /* n:"BrtBeginVolDeps", */
    T: 1
  },
  /*::[*/
  515: {
    /* n:"BrtEndVolDeps", */
    T: -1
  },
  /*::[*/
  516: {
    /* n:"BrtBeginVolType", */
    T: 1
  },
  /*::[*/
  517: {
    /* n:"BrtEndVolType", */
    T: -1
  },
  /*::[*/
  518: {
    /* n:"BrtBeginVolMain", */
    T: 1
  },
  /*::[*/
  519: {
    /* n:"BrtEndVolMain", */
    T: -1
  },
  /*::[*/
  520: {
    /* n:"BrtBeginVolTopic", */
    T: 1
  },
  /*::[*/
  521: {
    /* n:"BrtEndVolTopic", */
    T: -1
  },
  /*::[*/
  522: {
    /* n:"BrtVolSubtopic" */
  },
  /*::[*/
  523: {
    /* n:"BrtVolRef" */
  },
  /*::[*/
  524: {
    /* n:"BrtVolNum" */
  },
  /*::[*/
  525: {
    /* n:"BrtVolErr" */
  },
  /*::[*/
  526: {
    /* n:"BrtVolStr" */
  },
  /*::[*/
  527: {
    /* n:"BrtVolBool" */
  },
  /*::[*/
  528: {
    /* n:"BrtBeginCalcChain$", */
    T: 1
  },
  /*::[*/
  529: {
    /* n:"BrtEndCalcChain$", */
    T: -1
  },
  /*::[*/
  530: {
    /* n:"BrtBeginSortState", */
    T: 1
  },
  /*::[*/
  531: {
    /* n:"BrtEndSortState", */
    T: -1
  },
  /*::[*/
  532: {
    /* n:"BrtBeginSortCond", */
    T: 1
  },
  /*::[*/
  533: {
    /* n:"BrtEndSortCond", */
    T: -1
  },
  /*::[*/
  534: {
    /* n:"BrtBookProtection" */
  },
  /*::[*/
  535: {
    /* n:"BrtSheetProtection" */
  },
  /*::[*/
  536: {
    /* n:"BrtRangeProtection" */
  },
  /*::[*/
  537: {
    /* n:"BrtPhoneticInfo" */
  },
  /*::[*/
  538: {
    /* n:"BrtBeginECTxtWiz", */
    T: 1
  },
  /*::[*/
  539: {
    /* n:"BrtEndECTxtWiz", */
    T: -1
  },
  /*::[*/
  540: {
    /* n:"BrtBeginECTWFldInfoLst", */
    T: 1
  },
  /*::[*/
  541: {
    /* n:"BrtEndECTWFldInfoLst", */
    T: -1
  },
  /*::[*/
  542: {
    /* n:"BrtBeginECTwFldInfo", */
    T: 1
  },
  /*::[*/
  548: {
    /* n:"BrtFileSharing" */
  },
  /*::[*/
  549: {
    /* n:"BrtOleSize" */
  },
  /*::[*/
  550: {
    /* n:"BrtDrawing", */
    f: ws
  },
  /*::[*/
  551: {
    /* n:"BrtLegacyDrawing" */
  },
  /*::[*/
  552: {
    /* n:"BrtLegacyDrawingHF" */
  },
  /*::[*/
  553: {
    /* n:"BrtWebOpt" */
  },
  /*::[*/
  554: {
    /* n:"BrtBeginWebPubItems", */
    T: 1
  },
  /*::[*/
  555: {
    /* n:"BrtEndWebPubItems", */
    T: -1
  },
  /*::[*/
  556: {
    /* n:"BrtBeginWebPubItem", */
    T: 1
  },
  /*::[*/
  557: {
    /* n:"BrtEndWebPubItem", */
    T: -1
  },
  /*::[*/
  558: {
    /* n:"BrtBeginSXCondFmt", */
    T: 1
  },
  /*::[*/
  559: {
    /* n:"BrtEndSXCondFmt", */
    T: -1
  },
  /*::[*/
  560: {
    /* n:"BrtBeginSXCondFmts", */
    T: 1
  },
  /*::[*/
  561: {
    /* n:"BrtEndSXCondFmts", */
    T: -1
  },
  /*::[*/
  562: {
    /* n:"BrtBkHim" */
  },
  /*::[*/
  564: {
    /* n:"BrtColor" */
  },
  /*::[*/
  565: {
    /* n:"BrtBeginIndexedColors", */
    T: 1
  },
  /*::[*/
  566: {
    /* n:"BrtEndIndexedColors", */
    T: -1
  },
  /*::[*/
  569: {
    /* n:"BrtBeginMRUColors", */
    T: 1
  },
  /*::[*/
  570: {
    /* n:"BrtEndMRUColors", */
    T: -1
  },
  /*::[*/
  572: {
    /* n:"BrtMRUColor" */
  },
  /*::[*/
  573: {
    /* n:"BrtBeginDVals", */
    T: 1
  },
  /*::[*/
  574: {
    /* n:"BrtEndDVals", */
    T: -1
  },
  /*::[*/
  577: {
    /* n:"BrtSupNameStart" */
  },
  /*::[*/
  578: {
    /* n:"BrtSupNameValueStart" */
  },
  /*::[*/
  579: {
    /* n:"BrtSupNameValueEnd" */
  },
  /*::[*/
  580: {
    /* n:"BrtSupNameNum" */
  },
  /*::[*/
  581: {
    /* n:"BrtSupNameErr" */
  },
  /*::[*/
  582: {
    /* n:"BrtSupNameSt" */
  },
  /*::[*/
  583: {
    /* n:"BrtSupNameNil" */
  },
  /*::[*/
  584: {
    /* n:"BrtSupNameBool" */
  },
  /*::[*/
  585: {
    /* n:"BrtSupNameFmla" */
  },
  /*::[*/
  586: {
    /* n:"BrtSupNameBits" */
  },
  /*::[*/
  587: {
    /* n:"BrtSupNameEnd" */
  },
  /*::[*/
  588: {
    /* n:"BrtEndSupBook", */
    T: -1
  },
  /*::[*/
  589: {
    /* n:"BrtCellSmartTagProperty" */
  },
  /*::[*/
  590: {
    /* n:"BrtBeginCellSmartTag", */
    T: 1
  },
  /*::[*/
  591: {
    /* n:"BrtEndCellSmartTag", */
    T: -1
  },
  /*::[*/
  592: {
    /* n:"BrtBeginCellSmartTags", */
    T: 1
  },
  /*::[*/
  593: {
    /* n:"BrtEndCellSmartTags", */
    T: -1
  },
  /*::[*/
  594: {
    /* n:"BrtBeginSmartTags", */
    T: 1
  },
  /*::[*/
  595: {
    /* n:"BrtEndSmartTags", */
    T: -1
  },
  /*::[*/
  596: {
    /* n:"BrtSmartTagType" */
  },
  /*::[*/
  597: {
    /* n:"BrtBeginSmartTagTypes", */
    T: 1
  },
  /*::[*/
  598: {
    /* n:"BrtEndSmartTagTypes", */
    T: -1
  },
  /*::[*/
  599: {
    /* n:"BrtBeginSXFilters", */
    T: 1
  },
  /*::[*/
  600: {
    /* n:"BrtEndSXFilters", */
    T: -1
  },
  /*::[*/
  601: {
    /* n:"BrtBeginSXFILTER", */
    T: 1
  },
  /*::[*/
  602: {
    /* n:"BrtEndSXFilter", */
    T: -1
  },
  /*::[*/
  603: {
    /* n:"BrtBeginFills", */
    T: 1
  },
  /*::[*/
  604: {
    /* n:"BrtEndFills", */
    T: -1
  },
  /*::[*/
  605: {
    /* n:"BrtBeginCellWatches", */
    T: 1
  },
  /*::[*/
  606: {
    /* n:"BrtEndCellWatches", */
    T: -1
  },
  /*::[*/
  607: {
    /* n:"BrtCellWatch" */
  },
  /*::[*/
  608: {
    /* n:"BrtBeginCRErrs", */
    T: 1
  },
  /*::[*/
  609: {
    /* n:"BrtEndCRErrs", */
    T: -1
  },
  /*::[*/
  610: {
    /* n:"BrtCrashRecErr" */
  },
  /*::[*/
  611: {
    /* n:"BrtBeginFonts", */
    T: 1
  },
  /*::[*/
  612: {
    /* n:"BrtEndFonts", */
    T: -1
  },
  /*::[*/
  613: {
    /* n:"BrtBeginBorders", */
    T: 1
  },
  /*::[*/
  614: {
    /* n:"BrtEndBorders", */
    T: -1
  },
  /*::[*/
  615: {
    /* n:"BrtBeginFmts", */
    T: 1
  },
  /*::[*/
  616: {
    /* n:"BrtEndFmts", */
    T: -1
  },
  /*::[*/
  617: {
    /* n:"BrtBeginCellXFs", */
    T: 1
  },
  /*::[*/
  618: {
    /* n:"BrtEndCellXFs", */
    T: -1
  },
  /*::[*/
  619: {
    /* n:"BrtBeginStyles", */
    T: 1
  },
  /*::[*/
  620: {
    /* n:"BrtEndStyles", */
    T: -1
  },
  /*::[*/
  625: {
    /* n:"BrtBigName" */
  },
  /*::[*/
  626: {
    /* n:"BrtBeginCellStyleXFs", */
    T: 1
  },
  /*::[*/
  627: {
    /* n:"BrtEndCellStyleXFs", */
    T: -1
  },
  /*::[*/
  628: {
    /* n:"BrtBeginComments", */
    T: 1
  },
  /*::[*/
  629: {
    /* n:"BrtEndComments", */
    T: -1
  },
  /*::[*/
  630: {
    /* n:"BrtBeginCommentAuthors", */
    T: 1
  },
  /*::[*/
  631: {
    /* n:"BrtEndCommentAuthors", */
    T: -1
  },
  /*::[*/
  632: {
    /* n:"BrtCommentAuthor", */
    f: tm
  },
  /*::[*/
  633: {
    /* n:"BrtBeginCommentList", */
    T: 1
  },
  /*::[*/
  634: {
    /* n:"BrtEndCommentList", */
    T: -1
  },
  /*::[*/
  635: {
    /* n:"BrtBeginComment", */
    T: 1,
    f: em
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: Au
  },
  /*::[*/
  638: {
    /* n:"BrtBeginOleObjects", */
    T: 1
  },
  /*::[*/
  639: {
    /* n:"BrtOleObject" */
  },
  /*::[*/
  640: {
    /* n:"BrtEndOleObjects", */
    T: -1
  },
  /*::[*/
  641: {
    /* n:"BrtBeginSxrules", */
    T: 1
  },
  /*::[*/
  642: {
    /* n:"BrtEndSxRules", */
    T: -1
  },
  /*::[*/
  643: {
    /* n:"BrtBeginActiveXControls", */
    T: 1
  },
  /*::[*/
  644: {
    /* n:"BrtActiveX" */
  },
  /*::[*/
  645: {
    /* n:"BrtEndActiveXControls", */
    T: -1
  },
  /*::[*/
  646: {
    /* n:"BrtBeginPCDSDTCEMembersSortBy", */
    T: 1
  },
  /*::[*/
  648: {
    /* n:"BrtBeginCellIgnoreECs", */
    T: 1
  },
  /*::[*/
  649: {
    /* n:"BrtCellIgnoreEC" */
  },
  /*::[*/
  650: {
    /* n:"BrtEndCellIgnoreECs", */
    T: -1
  },
  /*::[*/
  651: {
    /* n:"BrtCsProp", */
    f: Pv
  },
  /*::[*/
  652: {
    /* n:"BrtCsPageSetup" */
  },
  /*::[*/
  653: {
    /* n:"BrtBeginUserCsViews", */
    T: 1
  },
  /*::[*/
  654: {
    /* n:"BrtEndUserCsViews", */
    T: -1
  },
  /*::[*/
  655: {
    /* n:"BrtBeginUserCsView", */
    T: 1
  },
  /*::[*/
  656: {
    /* n:"BrtEndUserCsView", */
    T: -1
  },
  /*::[*/
  657: {
    /* n:"BrtBeginPcdSFCIEntries", */
    T: 1
  },
  /*::[*/
  658: {
    /* n:"BrtEndPCDSFCIEntries", */
    T: -1
  },
  /*::[*/
  659: {
    /* n:"BrtPCDSFCIEntry" */
  },
  /*::[*/
  660: {
    /* n:"BrtBeginListParts", */
    T: 1
  },
  /*::[*/
  661: {
    /* n:"BrtListPart" */
  },
  /*::[*/
  662: {
    /* n:"BrtEndListParts", */
    T: -1
  },
  /*::[*/
  663: {
    /* n:"BrtSheetCalcProp" */
  },
  /*::[*/
  664: {
    /* n:"BrtBeginFnGroup", */
    T: 1
  },
  /*::[*/
  665: {
    /* n:"BrtFnGroup" */
  },
  /*::[*/
  666: {
    /* n:"BrtEndFnGroup", */
    T: -1
  },
  /*::[*/
  667: {
    /* n:"BrtSupAddin" */
  },
  /*::[*/
  668: {
    /* n:"BrtSXTDMPOrder" */
  },
  /*::[*/
  669: {
    /* n:"BrtCsProtection" */
  },
  /*::[*/
  671: {
    /* n:"BrtBeginWsSortMap", */
    T: 1
  },
  /*::[*/
  672: {
    /* n:"BrtEndWsSortMap", */
    T: -1
  },
  /*::[*/
  673: {
    /* n:"BrtBeginRRSort", */
    T: 1
  },
  /*::[*/
  674: {
    /* n:"BrtEndRRSort", */
    T: -1
  },
  /*::[*/
  675: {
    /* n:"BrtRRSortItem" */
  },
  /*::[*/
  676: {
    /* n:"BrtFileSharingIso" */
  },
  /*::[*/
  677: {
    /* n:"BrtBookProtectionIso" */
  },
  /*::[*/
  678: {
    /* n:"BrtSheetProtectionIso" */
  },
  /*::[*/
  679: {
    /* n:"BrtCsProtectionIso" */
  },
  /*::[*/
  680: {
    /* n:"BrtRangeProtectionIso" */
  },
  /*::[*/
  681: {
    /* n:"BrtDValList" */
  },
  /*::[*/
  1024: {
    /* n:"BrtRwDescent" */
  },
  /*::[*/
  1025: {
    /* n:"BrtKnownFonts" */
  },
  /*::[*/
  1026: {
    /* n:"BrtBeginSXTupleSet", */
    T: 1
  },
  /*::[*/
  1027: {
    /* n:"BrtEndSXTupleSet", */
    T: -1
  },
  /*::[*/
  1028: {
    /* n:"BrtBeginSXTupleSetHeader", */
    T: 1
  },
  /*::[*/
  1029: {
    /* n:"BrtEndSXTupleSetHeader", */
    T: -1
  },
  /*::[*/
  1030: {
    /* n:"BrtSXTupleSetHeaderItem" */
  },
  /*::[*/
  1031: {
    /* n:"BrtBeginSXTupleSetData", */
    T: 1
  },
  /*::[*/
  1032: {
    /* n:"BrtEndSXTupleSetData", */
    T: -1
  },
  /*::[*/
  1033: {
    /* n:"BrtBeginSXTupleSetRow", */
    T: 1
  },
  /*::[*/
  1034: {
    /* n:"BrtEndSXTupleSetRow", */
    T: -1
  },
  /*::[*/
  1035: {
    /* n:"BrtSXTupleSetRowItem" */
  },
  /*::[*/
  1036: {
    /* n:"BrtNameExt" */
  },
  /*::[*/
  1037: {
    /* n:"BrtPCDH14" */
  },
  /*::[*/
  1038: {
    /* n:"BrtBeginPCDCalcMem14", */
    T: 1
  },
  /*::[*/
  1039: {
    /* n:"BrtEndPCDCalcMem14", */
    T: -1
  },
  /*::[*/
  1040: {
    /* n:"BrtSXTH14" */
  },
  /*::[*/
  1041: {
    /* n:"BrtBeginSparklineGroup", */
    T: 1
  },
  /*::[*/
  1042: {
    /* n:"BrtEndSparklineGroup", */
    T: -1
  },
  /*::[*/
  1043: {
    /* n:"BrtSparkline" */
  },
  /*::[*/
  1044: {
    /* n:"BrtSXDI14" */
  },
  /*::[*/
  1045: {
    /* n:"BrtWsFmtInfoEx14" */
  },
  /*::[*/
  1046: {
    /* n:"BrtBeginConditionalFormatting14", */
    T: 1
  },
  /*::[*/
  1047: {
    /* n:"BrtEndConditionalFormatting14", */
    T: -1
  },
  /*::[*/
  1048: {
    /* n:"BrtBeginCFRule14", */
    T: 1
  },
  /*::[*/
  1049: {
    /* n:"BrtEndCFRule14", */
    T: -1
  },
  /*::[*/
  1050: {
    /* n:"BrtCFVO14" */
  },
  /*::[*/
  1051: {
    /* n:"BrtBeginDatabar14", */
    T: 1
  },
  /*::[*/
  1052: {
    /* n:"BrtBeginIconSet14", */
    T: 1
  },
  /*::[*/
  1053: {
    /* n:"BrtDVal14", */
    f: Ev
  },
  /*::[*/
  1054: {
    /* n:"BrtBeginDVals14", */
    T: 1
  },
  /*::[*/
  1055: {
    /* n:"BrtColor14" */
  },
  /*::[*/
  1056: {
    /* n:"BrtBeginSparklines", */
    T: 1
  },
  /*::[*/
  1057: {
    /* n:"BrtEndSparklines", */
    T: -1
  },
  /*::[*/
  1058: {
    /* n:"BrtBeginSparklineGroups", */
    T: 1
  },
  /*::[*/
  1059: {
    /* n:"BrtEndSparklineGroups", */
    T: -1
  },
  /*::[*/
  1061: {
    /* n:"BrtSXVD14" */
  },
  /*::[*/
  1062: {
    /* n:"BrtBeginSXView14", */
    T: 1
  },
  /*::[*/
  1063: {
    /* n:"BrtEndSXView14", */
    T: -1
  },
  /*::[*/
  1064: {
    /* n:"BrtBeginSXView16", */
    T: 1
  },
  /*::[*/
  1065: {
    /* n:"BrtEndSXView16", */
    T: -1
  },
  /*::[*/
  1066: {
    /* n:"BrtBeginPCD14", */
    T: 1
  },
  /*::[*/
  1067: {
    /* n:"BrtEndPCD14", */
    T: -1
  },
  /*::[*/
  1068: {
    /* n:"BrtBeginExtConn14", */
    T: 1
  },
  /*::[*/
  1069: {
    /* n:"BrtEndExtConn14", */
    T: -1
  },
  /*::[*/
  1070: {
    /* n:"BrtBeginSlicerCacheIDs", */
    T: 1
  },
  /*::[*/
  1071: {
    /* n:"BrtEndSlicerCacheIDs", */
    T: -1
  },
  /*::[*/
  1072: {
    /* n:"BrtBeginSlicerCacheID", */
    T: 1
  },
  /*::[*/
  1073: {
    /* n:"BrtEndSlicerCacheID", */
    T: -1
  },
  /*::[*/
  1075: {
    /* n:"BrtBeginSlicerCache", */
    T: 1
  },
  /*::[*/
  1076: {
    /* n:"BrtEndSlicerCache", */
    T: -1
  },
  /*::[*/
  1077: {
    /* n:"BrtBeginSlicerCacheDef", */
    T: 1
  },
  /*::[*/
  1078: {
    /* n:"BrtEndSlicerCacheDef", */
    T: -1
  },
  /*::[*/
  1079: {
    /* n:"BrtBeginSlicersEx", */
    T: 1
  },
  /*::[*/
  1080: {
    /* n:"BrtEndSlicersEx", */
    T: -1
  },
  /*::[*/
  1081: {
    /* n:"BrtBeginSlicerEx", */
    T: 1
  },
  /*::[*/
  1082: {
    /* n:"BrtEndSlicerEx", */
    T: -1
  },
  /*::[*/
  1083: {
    /* n:"BrtBeginSlicer", */
    T: 1
  },
  /*::[*/
  1084: {
    /* n:"BrtEndSlicer", */
    T: -1
  },
  /*::[*/
  1085: {
    /* n:"BrtSlicerCachePivotTables" */
  },
  /*::[*/
  1086: {
    /* n:"BrtBeginSlicerCacheOlapImpl", */
    T: 1
  },
  /*::[*/
  1087: {
    /* n:"BrtEndSlicerCacheOlapImpl", */
    T: -1
  },
  /*::[*/
  1088: {
    /* n:"BrtBeginSlicerCacheLevelsData", */
    T: 1
  },
  /*::[*/
  1089: {
    /* n:"BrtEndSlicerCacheLevelsData", */
    T: -1
  },
  /*::[*/
  1090: {
    /* n:"BrtBeginSlicerCacheLevelData", */
    T: 1
  },
  /*::[*/
  1091: {
    /* n:"BrtEndSlicerCacheLevelData", */
    T: -1
  },
  /*::[*/
  1092: {
    /* n:"BrtBeginSlicerCacheSiRanges", */
    T: 1
  },
  /*::[*/
  1093: {
    /* n:"BrtEndSlicerCacheSiRanges", */
    T: -1
  },
  /*::[*/
  1094: {
    /* n:"BrtBeginSlicerCacheSiRange", */
    T: 1
  },
  /*::[*/
  1095: {
    /* n:"BrtEndSlicerCacheSiRange", */
    T: -1
  },
  /*::[*/
  1096: {
    /* n:"BrtSlicerCacheOlapItem" */
  },
  /*::[*/
  1097: {
    /* n:"BrtBeginSlicerCacheSelections", */
    T: 1
  },
  /*::[*/
  1098: {
    /* n:"BrtSlicerCacheSelection" */
  },
  /*::[*/
  1099: {
    /* n:"BrtEndSlicerCacheSelections", */
    T: -1
  },
  /*::[*/
  1100: {
    /* n:"BrtBeginSlicerCacheNative", */
    T: 1
  },
  /*::[*/
  1101: {
    /* n:"BrtEndSlicerCacheNative", */
    T: -1
  },
  /*::[*/
  1102: {
    /* n:"BrtSlicerCacheNativeItem" */
  },
  /*::[*/
  1103: {
    /* n:"BrtRangeProtection14" */
  },
  /*::[*/
  1104: {
    /* n:"BrtRangeProtectionIso14" */
  },
  /*::[*/
  1105: {
    /* n:"BrtCellIgnoreEC14" */
  },
  /*::[*/
  1111: {
    /* n:"BrtList14" */
  },
  /*::[*/
  1112: {
    /* n:"BrtCFIcon" */
  },
  /*::[*/
  1113: {
    /* n:"BrtBeginSlicerCachesPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  1114: {
    /* n:"BrtEndSlicerCachesPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  1115: {
    /* n:"BrtBeginSlicers", */
    T: 1
  },
  /*::[*/
  1116: {
    /* n:"BrtEndSlicers", */
    T: -1
  },
  /*::[*/
  1117: {
    /* n:"BrtWbProp14" */
  },
  /*::[*/
  1118: {
    /* n:"BrtBeginSXEdit", */
    T: 1
  },
  /*::[*/
  1119: {
    /* n:"BrtEndSXEdit", */
    T: -1
  },
  /*::[*/
  1120: {
    /* n:"BrtBeginSXEdits", */
    T: 1
  },
  /*::[*/
  1121: {
    /* n:"BrtEndSXEdits", */
    T: -1
  },
  /*::[*/
  1122: {
    /* n:"BrtBeginSXChange", */
    T: 1
  },
  /*::[*/
  1123: {
    /* n:"BrtEndSXChange", */
    T: -1
  },
  /*::[*/
  1124: {
    /* n:"BrtBeginSXChanges", */
    T: 1
  },
  /*::[*/
  1125: {
    /* n:"BrtEndSXChanges", */
    T: -1
  },
  /*::[*/
  1126: {
    /* n:"BrtSXTupleItems" */
  },
  /*::[*/
  1128: {
    /* n:"BrtBeginSlicerStyle", */
    T: 1
  },
  /*::[*/
  1129: {
    /* n:"BrtEndSlicerStyle", */
    T: -1
  },
  /*::[*/
  1130: {
    /* n:"BrtSlicerStyleElement" */
  },
  /*::[*/
  1131: {
    /* n:"BrtBeginStyleSheetExt14", */
    T: 1
  },
  /*::[*/
  1132: {
    /* n:"BrtEndStyleSheetExt14", */
    T: -1
  },
  /*::[*/
  1133: {
    /* n:"BrtBeginSlicerCachesPivotCacheID", */
    T: 1
  },
  /*::[*/
  1134: {
    /* n:"BrtEndSlicerCachesPivotCacheID", */
    T: -1
  },
  /*::[*/
  1135: {
    /* n:"BrtBeginConditionalFormattings", */
    T: 1
  },
  /*::[*/
  1136: {
    /* n:"BrtEndConditionalFormattings", */
    T: -1
  },
  /*::[*/
  1137: {
    /* n:"BrtBeginPCDCalcMemExt", */
    T: 1
  },
  /*::[*/
  1138: {
    /* n:"BrtEndPCDCalcMemExt", */
    T: -1
  },
  /*::[*/
  1139: {
    /* n:"BrtBeginPCDCalcMemsExt", */
    T: 1
  },
  /*::[*/
  1140: {
    /* n:"BrtEndPCDCalcMemsExt", */
    T: -1
  },
  /*::[*/
  1141: {
    /* n:"BrtPCDField14" */
  },
  /*::[*/
  1142: {
    /* n:"BrtBeginSlicerStyles", */
    T: 1
  },
  /*::[*/
  1143: {
    /* n:"BrtEndSlicerStyles", */
    T: -1
  },
  /*::[*/
  1144: {
    /* n:"BrtBeginSlicerStyleElements", */
    T: 1
  },
  /*::[*/
  1145: {
    /* n:"BrtEndSlicerStyleElements", */
    T: -1
  },
  /*::[*/
  1146: {
    /* n:"BrtCFRuleExt" */
  },
  /*::[*/
  1147: {
    /* n:"BrtBeginSXCondFmt14", */
    T: 1
  },
  /*::[*/
  1148: {
    /* n:"BrtEndSXCondFmt14", */
    T: -1
  },
  /*::[*/
  1149: {
    /* n:"BrtBeginSXCondFmts14", */
    T: 1
  },
  /*::[*/
  1150: {
    /* n:"BrtEndSXCondFmts14", */
    T: -1
  },
  /*::[*/
  1152: {
    /* n:"BrtBeginSortCond14", */
    T: 1
  },
  /*::[*/
  1153: {
    /* n:"BrtEndSortCond14", */
    T: -1
  },
  /*::[*/
  1154: {
    /* n:"BrtEndDVals14", */
    T: -1
  },
  /*::[*/
  1155: {
    /* n:"BrtEndIconSet14", */
    T: -1
  },
  /*::[*/
  1156: {
    /* n:"BrtEndDatabar14", */
    T: -1
  },
  /*::[*/
  1157: {
    /* n:"BrtBeginColorScale14", */
    T: 1
  },
  /*::[*/
  1158: {
    /* n:"BrtEndColorScale14", */
    T: -1
  },
  /*::[*/
  1159: {
    /* n:"BrtBeginSxrules14", */
    T: 1
  },
  /*::[*/
  1160: {
    /* n:"BrtEndSxrules14", */
    T: -1
  },
  /*::[*/
  1161: {
    /* n:"BrtBeginPRule14", */
    T: 1
  },
  /*::[*/
  1162: {
    /* n:"BrtEndPRule14", */
    T: -1
  },
  /*::[*/
  1163: {
    /* n:"BrtBeginPRFilters14", */
    T: 1
  },
  /*::[*/
  1164: {
    /* n:"BrtEndPRFilters14", */
    T: -1
  },
  /*::[*/
  1165: {
    /* n:"BrtBeginPRFilter14", */
    T: 1
  },
  /*::[*/
  1166: {
    /* n:"BrtEndPRFilter14", */
    T: -1
  },
  /*::[*/
  1167: {
    /* n:"BrtBeginPRFItem14", */
    T: 1
  },
  /*::[*/
  1168: {
    /* n:"BrtEndPRFItem14", */
    T: -1
  },
  /*::[*/
  1169: {
    /* n:"BrtBeginCellIgnoreECs14", */
    T: 1
  },
  /*::[*/
  1170: {
    /* n:"BrtEndCellIgnoreECs14", */
    T: -1
  },
  /*::[*/
  1171: {
    /* n:"BrtDxf14" */
  },
  /*::[*/
  1172: {
    /* n:"BrtBeginDxF14s", */
    T: 1
  },
  /*::[*/
  1173: {
    /* n:"BrtEndDxf14s", */
    T: -1
  },
  /*::[*/
  1177: {
    /* n:"BrtFilter14" */
  },
  /*::[*/
  1178: {
    /* n:"BrtBeginCustomFilters14", */
    T: 1
  },
  /*::[*/
  1180: {
    /* n:"BrtCustomFilter14" */
  },
  /*::[*/
  1181: {
    /* n:"BrtIconFilter14" */
  },
  /*::[*/
  1182: {
    /* n:"BrtPivotCacheConnectionName" */
  },
  /*::[*/
  2048: {
    /* n:"BrtBeginDecoupledPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  2049: {
    /* n:"BrtEndDecoupledPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  2050: {
    /* n:"BrtDecoupledPivotCacheID" */
  },
  /*::[*/
  2051: {
    /* n:"BrtBeginPivotTableRefs", */
    T: 1
  },
  /*::[*/
  2052: {
    /* n:"BrtEndPivotTableRefs", */
    T: -1
  },
  /*::[*/
  2053: {
    /* n:"BrtPivotTableRef" */
  },
  /*::[*/
  2054: {
    /* n:"BrtSlicerCacheBookPivotTables" */
  },
  /*::[*/
  2055: {
    /* n:"BrtBeginSxvcells", */
    T: 1
  },
  /*::[*/
  2056: {
    /* n:"BrtEndSxvcells", */
    T: -1
  },
  /*::[*/
  2057: {
    /* n:"BrtBeginSxRow", */
    T: 1
  },
  /*::[*/
  2058: {
    /* n:"BrtEndSxRow", */
    T: -1
  },
  /*::[*/
  2060: {
    /* n:"BrtPcdCalcMem15" */
  },
  /*::[*/
  2067: {
    /* n:"BrtQsi15" */
  },
  /*::[*/
  2068: {
    /* n:"BrtBeginWebExtensions", */
    T: 1
  },
  /*::[*/
  2069: {
    /* n:"BrtEndWebExtensions", */
    T: -1
  },
  /*::[*/
  2070: {
    /* n:"BrtWebExtension" */
  },
  /*::[*/
  2071: {
    /* n:"BrtAbsPath15" */
  },
  /*::[*/
  2072: {
    /* n:"BrtBeginPivotTableUISettings", */
    T: 1
  },
  /*::[*/
  2073: {
    /* n:"BrtEndPivotTableUISettings", */
    T: -1
  },
  /*::[*/
  2075: {
    /* n:"BrtTableSlicerCacheIDs" */
  },
  /*::[*/
  2076: {
    /* n:"BrtTableSlicerCacheID" */
  },
  /*::[*/
  2077: {
    /* n:"BrtBeginTableSlicerCache", */
    T: 1
  },
  /*::[*/
  2078: {
    /* n:"BrtEndTableSlicerCache", */
    T: -1
  },
  /*::[*/
  2079: {
    /* n:"BrtSxFilter15" */
  },
  /*::[*/
  2080: {
    /* n:"BrtBeginTimelineCachePivotCacheIDs", */
    T: 1
  },
  /*::[*/
  2081: {
    /* n:"BrtEndTimelineCachePivotCacheIDs", */
    T: -1
  },
  /*::[*/
  2082: {
    /* n:"BrtTimelineCachePivotCacheID" */
  },
  /*::[*/
  2083: {
    /* n:"BrtBeginTimelineCacheIDs", */
    T: 1
  },
  /*::[*/
  2084: {
    /* n:"BrtEndTimelineCacheIDs", */
    T: -1
  },
  /*::[*/
  2085: {
    /* n:"BrtBeginTimelineCacheID", */
    T: 1
  },
  /*::[*/
  2086: {
    /* n:"BrtEndTimelineCacheID", */
    T: -1
  },
  /*::[*/
  2087: {
    /* n:"BrtBeginTimelinesEx", */
    T: 1
  },
  /*::[*/
  2088: {
    /* n:"BrtEndTimelinesEx", */
    T: -1
  },
  /*::[*/
  2089: {
    /* n:"BrtBeginTimelineEx", */
    T: 1
  },
  /*::[*/
  2090: {
    /* n:"BrtEndTimelineEx", */
    T: -1
  },
  /*::[*/
  2091: {
    /* n:"BrtWorkBookPr15" */
  },
  /*::[*/
  2092: {
    /* n:"BrtPCDH15" */
  },
  /*::[*/
  2093: {
    /* n:"BrtBeginTimelineStyle", */
    T: 1
  },
  /*::[*/
  2094: {
    /* n:"BrtEndTimelineStyle", */
    T: -1
  },
  /*::[*/
  2095: {
    /* n:"BrtTimelineStyleElement" */
  },
  /*::[*/
  2096: {
    /* n:"BrtBeginTimelineStylesheetExt15", */
    T: 1
  },
  /*::[*/
  2097: {
    /* n:"BrtEndTimelineStylesheetExt15", */
    T: -1
  },
  /*::[*/
  2098: {
    /* n:"BrtBeginTimelineStyles", */
    T: 1
  },
  /*::[*/
  2099: {
    /* n:"BrtEndTimelineStyles", */
    T: -1
  },
  /*::[*/
  2100: {
    /* n:"BrtBeginTimelineStyleElements", */
    T: 1
  },
  /*::[*/
  2101: {
    /* n:"BrtEndTimelineStyleElements", */
    T: -1
  },
  /*::[*/
  2102: {
    /* n:"BrtDxf15" */
  },
  /*::[*/
  2103: {
    /* n:"BrtBeginDxfs15", */
    T: 1
  },
  /*::[*/
  2104: {
    /* n:"BrtEndDxfs15", */
    T: -1
  },
  /*::[*/
  2105: {
    /* n:"BrtSlicerCacheHideItemsWithNoData" */
  },
  /*::[*/
  2106: {
    /* n:"BrtBeginItemUniqueNames", */
    T: 1
  },
  /*::[*/
  2107: {
    /* n:"BrtEndItemUniqueNames", */
    T: -1
  },
  /*::[*/
  2108: {
    /* n:"BrtItemUniqueName" */
  },
  /*::[*/
  2109: {
    /* n:"BrtBeginExtConn15", */
    T: 1
  },
  /*::[*/
  2110: {
    /* n:"BrtEndExtConn15", */
    T: -1
  },
  /*::[*/
  2111: {
    /* n:"BrtBeginOledbPr15", */
    T: 1
  },
  /*::[*/
  2112: {
    /* n:"BrtEndOledbPr15", */
    T: -1
  },
  /*::[*/
  2113: {
    /* n:"BrtBeginDataFeedPr15", */
    T: 1
  },
  /*::[*/
  2114: {
    /* n:"BrtEndDataFeedPr15", */
    T: -1
  },
  /*::[*/
  2115: {
    /* n:"BrtTextPr15" */
  },
  /*::[*/
  2116: {
    /* n:"BrtRangePr15" */
  },
  /*::[*/
  2117: {
    /* n:"BrtDbCommand15" */
  },
  /*::[*/
  2118: {
    /* n:"BrtBeginDbTables15", */
    T: 1
  },
  /*::[*/
  2119: {
    /* n:"BrtEndDbTables15", */
    T: -1
  },
  /*::[*/
  2120: {
    /* n:"BrtDbTable15" */
  },
  /*::[*/
  2121: {
    /* n:"BrtBeginDataModel", */
    T: 1
  },
  /*::[*/
  2122: {
    /* n:"BrtEndDataModel", */
    T: -1
  },
  /*::[*/
  2123: {
    /* n:"BrtBeginModelTables", */
    T: 1
  },
  /*::[*/
  2124: {
    /* n:"BrtEndModelTables", */
    T: -1
  },
  /*::[*/
  2125: {
    /* n:"BrtModelTable" */
  },
  /*::[*/
  2126: {
    /* n:"BrtBeginModelRelationships", */
    T: 1
  },
  /*::[*/
  2127: {
    /* n:"BrtEndModelRelationships", */
    T: -1
  },
  /*::[*/
  2128: {
    /* n:"BrtModelRelationship" */
  },
  /*::[*/
  2129: {
    /* n:"BrtBeginECTxtWiz15", */
    T: 1
  },
  /*::[*/
  2130: {
    /* n:"BrtEndECTxtWiz15", */
    T: -1
  },
  /*::[*/
  2131: {
    /* n:"BrtBeginECTWFldInfoLst15", */
    T: 1
  },
  /*::[*/
  2132: {
    /* n:"BrtEndECTWFldInfoLst15", */
    T: -1
  },
  /*::[*/
  2133: {
    /* n:"BrtBeginECTWFldInfo15", */
    T: 1
  },
  /*::[*/
  2134: {
    /* n:"BrtFieldListActiveItem" */
  },
  /*::[*/
  2135: {
    /* n:"BrtPivotCacheIdVersion" */
  },
  /*::[*/
  2136: {
    /* n:"BrtSXDI15" */
  },
  /*::[*/
  2137: {
    /* n:"BrtBeginModelTimeGroupings", */
    T: 1
  },
  /*::[*/
  2138: {
    /* n:"BrtEndModelTimeGroupings", */
    T: -1
  },
  /*::[*/
  2139: {
    /* n:"BrtBeginModelTimeGrouping", */
    T: 1
  },
  /*::[*/
  2140: {
    /* n:"BrtEndModelTimeGrouping", */
    T: -1
  },
  /*::[*/
  2141: {
    /* n:"BrtModelTimeGroupingCalcCol" */
  },
  /*::[*/
  3072: {
    /* n:"BrtUid" */
  },
  /*::[*/
  3073: {
    /* n:"BrtRevisionPtr" */
  },
  /*::[*/
  4096: {
    /* n:"BrtBeginDynamicArrayPr", */
    T: 1
  },
  /*::[*/
  4097: {
    /* n:"BrtEndDynamicArrayPr", */
    T: -1
  },
  /*::[*/
  5002: {
    /* n:"BrtBeginRichValueBlock", */
    T: 1
  },
  /*::[*/
  5003: {
    /* n:"BrtEndRichValueBlock", */
    T: -1
  },
  /*::[*/
  5081: {
    /* n:"BrtBeginRichFilters", */
    T: 1
  },
  /*::[*/
  5082: {
    /* n:"BrtEndRichFilters", */
    T: -1
  },
  /*::[*/
  5083: {
    /* n:"BrtRichFilter" */
  },
  /*::[*/
  5084: {
    /* n:"BrtBeginRichFilterColumn", */
    T: 1
  },
  /*::[*/
  5085: {
    /* n:"BrtEndRichFilterColumn", */
    T: -1
  },
  /*::[*/
  5086: {
    /* n:"BrtBeginCustomRichFilters", */
    T: 1
  },
  /*::[*/
  5087: {
    /* n:"BrtEndCustomRichFilters", */
    T: -1
  },
  /*::[*/
  5088: {
    /* n:"BrtCustomRichFilter" */
  },
  /*::[*/
  5089: {
    /* n:"BrtTop10RichFilter" */
  },
  /*::[*/
  5090: {
    /* n:"BrtDynamicRichFilter" */
  },
  /*::[*/
  5092: {
    /* n:"BrtBeginRichSortCondition", */
    T: 1
  },
  /*::[*/
  5093: {
    /* n:"BrtEndRichSortCondition", */
    T: -1
  },
  /*::[*/
  5094: {
    /* n:"BrtRichFilterDateGroupItem" */
  },
  /*::[*/
  5095: {
    /* n:"BrtBeginCalcFeatures", */
    T: 1
  },
  /*::[*/
  5096: {
    /* n:"BrtEndCalcFeatures", */
    T: -1
  },
  /*::[*/
  5097: {
    /* n:"BrtCalcFeature" */
  },
  /*::[*/
  5099: {
    /* n:"BrtExternalLinksPr" */
  },
  /*::[*/
  65535: { n: "" }
}, Fs = {
  /* [MS-XLS] 2.3 Record Enumeration 2021-08-17 */
  /*::[*/
  6: {
    /* n:"Formula", */
    f: as
  },
  /*::[*/
  10: {
    /* n:"EOF", */
    f: Yt
  },
  /*::[*/
  12: {
    /* n:"CalcCount", */
    f: ur
  },
  //
  /*::[*/
  13: {
    /* n:"CalcMode", */
    f: ur
  },
  //
  /*::[*/
  14: {
    /* n:"CalcPrecision", */
    f: sr
  },
  //
  /*::[*/
  15: {
    /* n:"CalcRefMode", */
    f: sr
  },
  //
  /*::[*/
  16: {
    /* n:"CalcDelta", */
    f: br
  },
  //
  /*::[*/
  17: {
    /* n:"CalcIter", */
    f: sr
  },
  //
  /*::[*/
  18: {
    /* n:"Protect", */
    f: sr
  },
  /*::[*/
  19: {
    /* n:"Password", */
    f: ur
  },
  /*::[*/
  20: {
    /* n:"Header", */
    f: wf
  },
  /*::[*/
  21: {
    /* n:"Footer", */
    f: wf
  },
  /*::[*/
  23: {
    /* n:"ExternSheet", */
    f: vo
  },
  /*::[*/
  24: {
    /* n:"Lbl", */
    f: Ef
  },
  /*::[*/
  25: {
    /* n:"WinProtect", */
    f: sr
  },
  /*::[*/
  26: {
    /* n:"VerticalPageBreaks", */
  },
  /*::[*/
  27: {
    /* n:"HorizontalPageBreaks", */
  },
  /*::[*/
  28: {
    /* n:"Note", */
    f: Ex
  },
  /*::[*/
  29: {
    /* n:"Selection", */
  },
  /*::[*/
  34: {
    /* n:"Date1904", */
    f: sr
  },
  /*::[*/
  35: {
    /* n:"ExternName", */
    f: _f
  },
  /*::[*/
  38: {
    /* n:"LeftMargin", */
    f: br
  },
  // *
  /*::[*/
  39: {
    /* n:"RightMargin", */
    f: br
  },
  // *
  /*::[*/
  40: {
    /* n:"TopMargin", */
    f: br
  },
  // *
  /*::[*/
  41: {
    /* n:"BottomMargin", */
    f: br
  },
  // *
  /*::[*/
  42: {
    /* n:"PrintRowCol", */
    f: sr
  },
  /*::[*/
  43: {
    /* n:"PrintGrid", */
    f: sr
  },
  /*::[*/
  47: {
    /* n:"FilePass", */
    f: Bd
  },
  /*::[*/
  49: {
    /* n:"Font", */
    f: Y1
  },
  /*::[*/
  51: {
    /* n:"PrintSize", */
    f: ur
  },
  /*::[*/
  60: {
    /* n:"Continue", */
  },
  /*::[*/
  61: {
    /* n:"Window1", */
    f: $1
  },
  /*::[*/
  64: {
    /* n:"Backup", */
    f: sr
  },
  /*::[*/
  65: {
    /* n:"Pane", */
    f: j1
  },
  /*::[*/
  66: {
    /* n:"CodePage", */
    f: ur
  },
  /*::[*/
  77: {
    /* n:"Pls", */
  },
  /*::[*/
  80: {
    /* n:"DCon", */
  },
  /*::[*/
  81: {
    /* n:"DConRef", */
  },
  /*::[*/
  82: {
    /* n:"DConName", */
  },
  /*::[*/
  85: {
    /* n:"DefColWidth", */
    f: ur
  },
  /*::[*/
  89: {
    /* n:"XCT", */
  },
  /*::[*/
  90: {
    /* n:"CRN", */
  },
  /*::[*/
  91: {
    /* n:"FileSharing", */
  },
  /*::[*/
  92: {
    /* n:"WriteAccess", */
    f: I1
  },
  /*::[*/
  93: {
    /* n:"Obj", */
    f: Sx
  },
  /*::[*/
  94: {
    /* n:"Uncalced", */
  },
  /*::[*/
  95: {
    /* n:"CalcSaveRecalc", */
    f: sr
  },
  //
  /*::[*/
  96: {
    /* n:"Template", */
  },
  /*::[*/
  97: {
    /* n:"Intl", */
  },
  /*::[*/
  99: {
    /* n:"ObjProtect", */
    f: sr
  },
  /*::[*/
  125: {
    /* n:"ColInfo", */
    f: wo
  },
  /*::[*/
  128: {
    /* n:"Guts", */
    f: ox
  },
  /*::[*/
  129: {
    /* n:"WsBool", */
    f: D1
  },
  /*::[*/
  130: {
    /* n:"GridSet", */
    f: ur
  },
  /*::[*/
  131: {
    /* n:"HCenter", */
    f: sr
  },
  /*::[*/
  132: {
    /* n:"VCenter", */
    f: sr
  },
  /*::[*/
  133: {
    /* n:"BoundSheet8", */
    f: R1
  },
  /*::[*/
  134: {
    /* n:"WriteProtect", */
  },
  /*::[*/
  140: {
    /* n:"Country", */
    f: Ix
  },
  /*::[*/
  141: {
    /* n:"HideObj", */
    f: ur
  },
  /*::[*/
  144: {
    /* n:"Sort", */
  },
  /*::[*/
  146: {
    /* n:"Palette", */
    f: Rx
  },
  /*::[*/
  151: {
    /* n:"Sync", */
  },
  /*::[*/
  152: {
    /* n:"LPr", */
  },
  /*::[*/
  153: {
    /* n:"DxGCol", */
  },
  /*::[*/
  154: {
    /* n:"FnGroupName", */
  },
  /*::[*/
  155: {
    /* n:"FilterMode", */
  },
  /*::[*/
  156: {
    /* n:"BuiltInFnGroupCount", */
    f: ur
  },
  /*::[*/
  157: {
    /* n:"AutoFilterInfo", */
  },
  /*::[*/
  158: {
    /* n:"AutoFilter", */
  },
  /*::[*/
  160: {
    /* n:"Scl", */
    f: Vx
  },
  /*::[*/
  161: {
    /* n:"Setup", */
    f: Mx
  },
  /*::[*/
  174: {
    /* n:"ScenMan", */
  },
  /*::[*/
  175: {
    /* n:"SCENARIO", */
  },
  /*::[*/
  176: {
    /* n:"SxView", */
  },
  /*::[*/
  177: {
    /* n:"Sxvd", */
  },
  /*::[*/
  178: {
    /* n:"SXVI", */
  },
  /*::[*/
  180: {
    /* n:"SxIvd", */
  },
  /*::[*/
  181: {
    /* n:"SXLI", */
  },
  /*::[*/
  182: {
    /* n:"SXPI", */
  },
  /*::[*/
  184: {
    /* n:"DocRoute", */
  },
  /*::[*/
  185: {
    /* n:"RecipName", */
  },
  /*::[*/
  189: {
    /* n:"MulRk", */
    f: ix
  },
  /*::[*/
  190: {
    /* n:"MulBlank", */
    f: sx
  },
  /*::[*/
  193: {
    /* n:"Mms", */
    f: Yt
  },
  /*::[*/
  197: {
    /* n:"SXDI", */
  },
  /*::[*/
  198: {
    /* n:"SXDB", */
  },
  /*::[*/
  199: {
    /* n:"SXFDB", */
  },
  /*::[*/
  200: {
    /* n:"SXDBB", */
  },
  /*::[*/
  201: {
    /* n:"SXNum", */
  },
  /*::[*/
  202: {
    /* n:"SxBool", */
    f: sr
  },
  /*::[*/
  203: {
    /* n:"SxErr", */
  },
  /*::[*/
  204: {
    /* n:"SXInt", */
  },
  /*::[*/
  205: {
    /* n:"SXString", */
  },
  /*::[*/
  206: {
    /* n:"SXDtr", */
  },
  /*::[*/
  207: {
    /* n:"SxNil", */
  },
  /*::[*/
  208: {
    /* n:"SXTbl", */
  },
  /*::[*/
  209: {
    /* n:"SXTBRGIITM", */
  },
  /*::[*/
  210: {
    /* n:"SxTbpg", */
  },
  /*::[*/
  211: {
    /* n:"ObProj", */
  },
  /*::[*/
  213: {
    /* n:"SXStreamID", */
  },
  /*::[*/
  215: {
    /* n:"DBCell", */
  },
  /*::[*/
  216: {
    /* n:"SXRng", */
  },
  /*::[*/
  217: {
    /* n:"SxIsxoper", */
  },
  /*::[*/
  218: {
    /* n:"BookBool", */
    f: ur
  },
  /*::[*/
  220: {
    /* n:"DbOrParamQry", */
  },
  /*::[*/
  221: {
    /* n:"ScenarioProtect", */
    f: sr
  },
  /*::[*/
  222: {
    /* n:"OleObjectSize", */
  },
  /*::[*/
  224: {
    /* n:"XF", */
    f: cx
  },
  /*::[*/
  225: {
    /* n:"InterfaceHdr", */
    f: N1
  },
  /*::[*/
  226: {
    /* n:"InterfaceEnd", */
    f: Yt
  },
  /*::[*/
  227: {
    /* n:"SXVS", */
  },
  /*::[*/
  229: {
    /* n:"MergeCells", */
    f: yx
  },
  /*::[*/
  233: {
    /* n:"BkHim", */
  },
  /*::[*/
  235: {
    /* n:"MsoDrawingGroup", */
  },
  /*::[*/
  236: {
    /* n:"MsoDrawing", */
  },
  /*::[*/
  237: {
    /* n:"MsoDrawingSelection", */
  },
  /*::[*/
  239: {
    /* n:"PhoneticInfo", */
  },
  /*::[*/
  240: {
    /* n:"SxRule", */
  },
  /*::[*/
  241: {
    /* n:"SXEx", */
  },
  /*::[*/
  242: {
    /* n:"SxFilt", */
  },
  /*::[*/
  244: {
    /* n:"SxDXF", */
  },
  /*::[*/
  245: {
    /* n:"SxItm", */
  },
  /*::[*/
  246: {
    /* n:"SxName", */
  },
  /*::[*/
  247: {
    /* n:"SxSelect", */
  },
  /*::[*/
  248: {
    /* n:"SXPair", */
  },
  /*::[*/
  249: {
    /* n:"SxFmla", */
  },
  /*::[*/
  251: {
    /* n:"SxFormat", */
  },
  /*::[*/
  252: {
    /* n:"SST", */
    f: P1
  },
  /*::[*/
  253: {
    /* n:"LabelSst", */
    f: J1
  },
  /*::[*/
  255: {
    /* n:"ExtSST", */
    f: U1
  },
  /*::[*/
  256: {
    /* n:"SXVDEx", */
  },
  /*::[*/
  259: {
    /* n:"SXFormula", */
  },
  /*::[*/
  290: {
    /* n:"SXDBEx", */
  },
  /*::[*/
  311: {
    /* n:"RRDInsDel", */
  },
  /*::[*/
  312: {
    /* n:"RRDHead", */
  },
  /*::[*/
  315: {
    /* n:"RRDChgCell", */
  },
  /*::[*/
  317: {
    /* n:"RRTabId", */
    f: co
  },
  /*::[*/
  318: {
    /* n:"RRDRenSheet", */
  },
  /*::[*/
  319: {
    /* n:"RRSort", */
  },
  /*::[*/
  320: {
    /* n:"RRDMove", */
  },
  /*::[*/
  330: {
    /* n:"RRFormat", */
  },
  /*::[*/
  331: {
    /* n:"RRAutoFmt", */
  },
  /*::[*/
  333: {
    /* n:"RRInsertSh", */
  },
  /*::[*/
  334: {
    /* n:"RRDMoveBegin", */
  },
  /*::[*/
  335: {
    /* n:"RRDMoveEnd", */
  },
  /*::[*/
  336: {
    /* n:"RRDInsDelBegin", */
  },
  /*::[*/
  337: {
    /* n:"RRDInsDelEnd", */
  },
  /*::[*/
  338: {
    /* n:"RRDConflict", */
  },
  /*::[*/
  339: {
    /* n:"RRDDefName", */
  },
  /*::[*/
  340: {
    /* n:"RRDRstEtxp", */
  },
  /*::[*/
  351: {
    /* n:"LRng", */
  },
  /*::[*/
  352: {
    /* n:"UsesELFs", */
    f: sr
  },
  /*::[*/
  353: {
    /* n:"DSF", */
    f: Yt
  },
  /*::[*/
  401: {
    /* n:"CUsr", */
  },
  /*::[*/
  402: {
    /* n:"CbUsr", */
  },
  /*::[*/
  403: {
    /* n:"UsrInfo", */
  },
  /*::[*/
  404: {
    /* n:"UsrExcl", */
  },
  /*::[*/
  405: {
    /* n:"FileLock", */
  },
  /*::[*/
  406: {
    /* n:"RRDInfo", */
  },
  /*::[*/
  407: {
    /* n:"BCUsrs", */
  },
  /*::[*/
  408: {
    /* n:"UsrChk", */
  },
  /*::[*/
  425: {
    /* n:"UserBView", */
  },
  /*::[*/
  426: {
    /* n:"UserSViewBegin", */
  },
  /*::[*/
  427: {
    /* n:"UserSViewEnd", */
  },
  /*::[*/
  428: {
    /* n:"RRDUserView", */
  },
  /*::[*/
  429: {
    /* n:"Qsi", */
  },
  /*::[*/
  430: {
    /* n:"SupBook", */
    f: dx
  },
  /*::[*/
  431: {
    /* n:"Prot4Rev", */
    f: sr
  },
  /*::[*/
  432: {
    /* n:"CondFmt", */
  },
  /*::[*/
  433: {
    /* n:"CF", */
  },
  /*::[*/
  434: {
    /* n:"DVal", */
  },
  /*::[*/
  437: {
    /* n:"DConBin", */
  },
  /*::[*/
  438: {
    /* n:"TxO", */
    f: Fx
  },
  /*::[*/
  439: {
    /* n:"RefreshAll", */
    f: sr
  },
  //
  /*::[*/
  440: {
    /* n:"HLink", */
    f: bx
  },
  /*::[*/
  441: {
    /* n:"Lel", */
  },
  /*::[*/
  442: {
    /* n:"CodeName", */
    f: Ja
  },
  /*::[*/
  443: {
    /* n:"SXFDBType", */
  },
  /*::[*/
  444: {
    /* n:"Prot4RevPass", */
    f: ur
  },
  /*::[*/
  445: {
    /* n:"ObNoMacros", */
  },
  /*::[*/
  446: {
    /* n:"Dv", */
  },
  /*::[*/
  448: {
    /* n:"Excel9File", */
    f: Yt
  },
  /*::[*/
  449: {
    /* n:"RecalcId", */
    f: V1,
    r: 2
  },
  /*::[*/
  450: {
    /* n:"EntExU2", */
    f: Yt
  },
  /*::[*/
  512: {
    /* n:"Dimensions", */
    f: mf
  },
  /*::[*/
  513: {
    /* n:"Blank", */
    f: Hx
  },
  /*::[*/
  515: {
    /* n:"Number", */
    f: ux
  },
  /*::[*/
  516: {
    /* n:"Label", */
    f: Z1
  },
  /*::[*/
  517: {
    /* n:"BoolErr", */
    f: vf
  },
  /*::[*/
  519: {
    /* n:"String", */
    f: $x
  },
  /*::[*/
  520: {
    /* n:"Row", */
    f: W1
  },
  /*::[*/
  523: {
    /* n:"Index", */
  },
  /*::[*/
  545: {
    /* n:"Array", */
    f: yf
  },
  /*::[*/
  549: {
    /* n:"DefaultRowHeight", */
    f: gf
  },
  /*::[*/
  566: {
    /* n:"Table", */
  },
  /*::[*/
  574: {
    /* n:"Window2", */
    f: G1
  },
  /*::[*/
  638: {
    /* n:"RK", */
    f: ax
  },
  /*::[*/
  659: {
    /* n:"Style", */
  },
  /*::[*/
  1048: {
    /* n:"BigName", */
  },
  /*::[*/
  1054: {
    /* n:"Format", */
    f: ex
  },
  /*::[*/
  1084: {
    /* n:"ContinueBigName", */
  },
  /*::[*/
  1212: {
    /* n:"ShrFmla", */
    f: vx
  },
  /*::[*/
  2048: {
    /* n:"HLinkTooltip", */
    f: Ox
  },
  /*::[*/
  2049: {
    /* n:"WebPub", */
  },
  /*::[*/
  2050: {
    /* n:"QsiSXTag", */
  },
  /*::[*/
  2051: {
    /* n:"DBQueryExt", */
  },
  /*::[*/
  2052: {
    /* n:"ExtString", */
  },
  /*::[*/
  2053: {
    /* n:"TxtQry", */
  },
  /*::[*/
  2054: {
    /* n:"Qsir", */
  },
  /*::[*/
  2055: {
    /* n:"Qsif", */
  },
  /*::[*/
  2056: {
    /* n:"RRDTQSIF", */
  },
  /*::[*/
  2057: {
    /* n:"BOF", */
    f: ui
  },
  /*::[*/
  2058: {
    /* n:"OleDbConn", */
  },
  /*::[*/
  2059: {
    /* n:"WOpt", */
  },
  /*::[*/
  2060: {
    /* n:"SXViewEx", */
  },
  /*::[*/
  2061: {
    /* n:"SXTH", */
  },
  /*::[*/
  2062: {
    /* n:"SXPIEx", */
  },
  /*::[*/
  2063: {
    /* n:"SXVDTEx", */
  },
  /*::[*/
  2064: {
    /* n:"SXViewEx9", */
  },
  /*::[*/
  2066: {
    /* n:"ContinueFrt", */
  },
  /*::[*/
  2067: {
    /* n:"RealTimeData", */
  },
  /*::[*/
  2128: {
    /* n:"ChartFrtInfo", */
  },
  /*::[*/
  2129: {
    /* n:"FrtWrapper", */
  },
  /*::[*/
  2130: {
    /* n:"StartBlock", */
  },
  /*::[*/
  2131: {
    /* n:"EndBlock", */
  },
  /*::[*/
  2132: {
    /* n:"StartObject", */
  },
  /*::[*/
  2133: {
    /* n:"EndObject", */
  },
  /*::[*/
  2134: {
    /* n:"CatLab", */
  },
  /*::[*/
  2135: {
    /* n:"YMult", */
  },
  /*::[*/
  2136: {
    /* n:"SXViewLink", */
  },
  /*::[*/
  2137: {
    /* n:"PivotChartBits", */
  },
  /*::[*/
  2138: {
    /* n:"FrtFontList", */
  },
  /*::[*/
  2146: {
    /* n:"SheetExt", */
  },
  /*::[*/
  2147: {
    /* n:"BookExt", */
    r: 12
  },
  /*::[*/
  2148: {
    /* n:"SXAddl", */
  },
  /*::[*/
  2149: {
    /* n:"CrErr", */
  },
  /*::[*/
  2150: {
    /* n:"HFPicture", */
  },
  /*::[*/
  2151: {
    /* n:"FeatHdr", */
    f: Yt
  },
  /*::[*/
  2152: {
    /* n:"Feat", */
  },
  /*::[*/
  2154: {
    /* n:"DataLabExt", */
  },
  /*::[*/
  2155: {
    /* n:"DataLabExtContents", */
  },
  /*::[*/
  2156: {
    /* n:"CellWatch", */
  },
  /*::[*/
  2161: {
    /* n:"FeatHdr11", */
  },
  /*::[*/
  2162: {
    /* n:"Feature11", */
  },
  /*::[*/
  2164: {
    /* n:"DropDownObjIds", */
  },
  /*::[*/
  2165: {
    /* n:"ContinueFrt11", */
  },
  /*::[*/
  2166: {
    /* n:"DConn", */
  },
  /*::[*/
  2167: {
    /* n:"List12", */
  },
  /*::[*/
  2168: {
    /* n:"Feature12", */
  },
  /*::[*/
  2169: {
    /* n:"CondFmt12", */
  },
  /*::[*/
  2170: {
    /* n:"CF12", */
  },
  /*::[*/
  2171: {
    /* n:"CFEx", */
  },
  /*::[*/
  2172: {
    /* n:"XFCRC", */
    f: Lx,
    r: 12
  },
  /*::[*/
  2173: {
    /* n:"XFExt", */
    f: Ig,
    r: 12
  },
  /*::[*/
  2174: {
    /* n:"AutoFilter12", */
  },
  /*::[*/
  2175: {
    /* n:"ContinueFrt12", */
  },
  /*::[*/
  2180: {
    /* n:"MDTInfo", */
  },
  /*::[*/
  2181: {
    /* n:"MDXStr", */
  },
  /*::[*/
  2182: {
    /* n:"MDXTuple", */
  },
  /*::[*/
  2183: {
    /* n:"MDXSet", */
  },
  /*::[*/
  2184: {
    /* n:"MDXProp", */
  },
  /*::[*/
  2185: {
    /* n:"MDXKPI", */
  },
  /*::[*/
  2186: {
    /* n:"MDB", */
  },
  /*::[*/
  2187: {
    /* n:"PLV", */
  },
  /*::[*/
  2188: {
    /* n:"Compat12", */
    f: sr,
    r: 12
  },
  /*::[*/
  2189: {
    /* n:"DXF", */
  },
  /*::[*/
  2190: {
    /* n:"TableStyles", */
    r: 12
  },
  /*::[*/
  2191: {
    /* n:"TableStyle", */
  },
  /*::[*/
  2192: {
    /* n:"TableStyleElement", */
  },
  /*::[*/
  2194: {
    /* n:"StyleExt", */
  },
  /*::[*/
  2195: {
    /* n:"NamePublish", */
  },
  /*::[*/
  2196: {
    /* n:"NameCmt", */
    f: px,
    r: 12
  },
  /*::[*/
  2197: {
    /* n:"SortData", */
  },
  /*::[*/
  2198: {
    /* n:"Theme", */
    f: Ag,
    r: 12
  },
  /*::[*/
  2199: {
    /* n:"GUIDTypeLib", */
  },
  /*::[*/
  2200: {
    /* n:"FnGrp12", */
  },
  /*::[*/
  2201: {
    /* n:"NameFnGrp12", */
  },
  /*::[*/
  2202: {
    /* n:"MTRSettings", */
    f: wx,
    r: 12
  },
  /*::[*/
  2203: {
    /* n:"CompressPictures", */
    f: Yt
  },
  /*::[*/
  2204: {
    /* n:"HeaderFooter", */
  },
  /*::[*/
  2205: {
    /* n:"CrtLayout12", */
  },
  /*::[*/
  2206: {
    /* n:"CrtMlFrt", */
  },
  /*::[*/
  2207: {
    /* n:"CrtMlFrtContinue", */
  },
  /*::[*/
  2211: {
    /* n:"ForceFullCalculation", */
    f: H1
  },
  /*::[*/
  2212: {
    /* n:"ShapePropsStream", */
  },
  /*::[*/
  2213: {
    /* n:"TextPropsStream", */
  },
  /*::[*/
  2214: {
    /* n:"RichTextStream", */
  },
  /*::[*/
  2215: {
    /* n:"CrtLayout12A", */
  },
  /*::[*/
  4097: {
    /* n:"Units", */
  },
  /*::[*/
  4098: {
    /* n:"Chart", */
  },
  /*::[*/
  4099: {
    /* n:"Series", */
  },
  /*::[*/
  4102: {
    /* n:"DataFormat", */
  },
  /*::[*/
  4103: {
    /* n:"LineFormat", */
  },
  /*::[*/
  4105: {
    /* n:"MarkerFormat", */
  },
  /*::[*/
  4106: {
    /* n:"AreaFormat", */
  },
  /*::[*/
  4107: {
    /* n:"PieFormat", */
  },
  /*::[*/
  4108: {
    /* n:"AttachedLabel", */
  },
  /*::[*/
  4109: {
    /* n:"SeriesText", */
  },
  /*::[*/
  4116: {
    /* n:"ChartFormat", */
  },
  /*::[*/
  4117: {
    /* n:"Legend", */
  },
  /*::[*/
  4118: {
    /* n:"SeriesList", */
  },
  /*::[*/
  4119: {
    /* n:"Bar", */
  },
  /*::[*/
  4120: {
    /* n:"Line", */
  },
  /*::[*/
  4121: {
    /* n:"Pie", */
  },
  /*::[*/
  4122: {
    /* n:"Area", */
  },
  /*::[*/
  4123: {
    /* n:"Scatter", */
  },
  /*::[*/
  4124: {
    /* n:"CrtLine", */
  },
  /*::[*/
  4125: {
    /* n:"Axis", */
  },
  /*::[*/
  4126: {
    /* n:"Tick", */
  },
  /*::[*/
  4127: {
    /* n:"ValueRange", */
  },
  /*::[*/
  4128: {
    /* n:"CatSerRange", */
  },
  /*::[*/
  4129: {
    /* n:"AxisLine", */
  },
  /*::[*/
  4130: {
    /* n:"CrtLink", */
  },
  /*::[*/
  4132: {
    /* n:"DefaultText", */
  },
  /*::[*/
  4133: {
    /* n:"Text", */
  },
  /*::[*/
  4134: {
    /* n:"FontX", */
    f: ur
  },
  /*::[*/
  4135: {
    /* n:"ObjectLink", */
  },
  /*::[*/
  4146: {
    /* n:"Frame", */
  },
  /*::[*/
  4147: {
    /* n:"Begin", */
  },
  /*::[*/
  4148: {
    /* n:"End", */
  },
  /*::[*/
  4149: {
    /* n:"PlotArea", */
  },
  /*::[*/
  4154: {
    /* n:"Chart3d", */
  },
  /*::[*/
  4156: {
    /* n:"PicF", */
  },
  /*::[*/
  4157: {
    /* n:"DropBar", */
  },
  /*::[*/
  4158: {
    /* n:"Radar", */
  },
  /*::[*/
  4159: {
    /* n:"Surf", */
  },
  /*::[*/
  4160: {
    /* n:"RadarArea", */
  },
  /*::[*/
  4161: {
    /* n:"AxisParent", */
  },
  /*::[*/
  4163: {
    /* n:"LegendException", */
  },
  /*::[*/
  4164: {
    /* n:"ShtProps", */
    f: Ux
  },
  /*::[*/
  4165: {
    /* n:"SerToCrt", */
  },
  /*::[*/
  4166: {
    /* n:"AxesUsed", */
  },
  /*::[*/
  4168: {
    /* n:"SBaseRef", */
  },
  /*::[*/
  4170: {
    /* n:"SerParent", */
  },
  /*::[*/
  4171: {
    /* n:"SerAuxTrend", */
  },
  /*::[*/
  4174: {
    /* n:"IFmtRecord", */
  },
  /*::[*/
  4175: {
    /* n:"Pos", */
  },
  /*::[*/
  4176: {
    /* n:"AlRuns", */
  },
  /*::[*/
  4177: {
    /* n:"BRAI", */
  },
  /*::[*/
  4187: {
    /* n:"SerAuxErrBar", */
  },
  /*::[*/
  4188: {
    /* n:"ClrtClient", */
    f: Dx
  },
  /*::[*/
  4189: {
    /* n:"SerFmt", */
  },
  /*::[*/
  4191: {
    /* n:"Chart3DBarShape", */
  },
  /*::[*/
  4192: {
    /* n:"Fbi", */
  },
  /*::[*/
  4193: {
    /* n:"BopPop", */
  },
  /*::[*/
  4194: {
    /* n:"AxcExt", */
  },
  /*::[*/
  4195: {
    /* n:"Dat", */
  },
  /*::[*/
  4196: {
    /* n:"PlotGrowth", */
  },
  /*::[*/
  4197: {
    /* n:"SIIndex", */
  },
  /*::[*/
  4198: {
    /* n:"GelFrame", */
  },
  /*::[*/
  4199: {
    /* n:"BopPopCustom", */
  },
  /*::[*/
  4200: {
    /* n:"Fbi2", */
  },
  /*::[*/
  0: {
    /* n:"Dimensions", */
    f: mf
  },
  /*::[*/
  1: {
    /* n:"BIFF2BLANK", */
  },
  /*::[*/
  2: {
    /* n:"BIFF2INT", */
    f: Yx
  },
  /*::[*/
  3: {
    /* n:"BIFF2NUM", */
    f: Xx
  },
  /*::[*/
  4: {
    /* n:"BIFF2STR", */
    f: Gx
  },
  /*::[*/
  5: {
    /* n:"BoolErr", */
    f: vf
  },
  /*::[*/
  7: {
    /* n:"String", */
    f: Jx
  },
  /*::[*/
  8: {
    /* n:"BIFF2ROW", */
  },
  /*::[*/
  9: {
    /* n:"BOF", */
    f: ui
  },
  /*::[*/
  11: {
    /* n:"Index", */
  },
  /*::[*/
  22: {
    /* n:"ExternCount", */
    f: ur
  },
  /*::[*/
  30: {
    /* n:"BIFF2FORMAT", */
    f: tx
  },
  /*::[*/
  31: {
    /* n:"BIFF2FMTCNT", */
  },
  /* 16-bit cnt of BIFF2FORMAT records */
  /*::[*/
  32: {
    /* n:"BIFF2COLINFO", */
  },
  /*::[*/
  33: {
    /* n:"Array", */
    f: yf
  },
  /*::[*/
  36: {
    /* n:"COLWIDTH", */
  },
  /*::[*/
  37: {
    /* n:"DefaultRowHeight", */
    f: gf
  },
  // 0x2c ??
  // 0x2d ??
  // 0x2e ??
  // 0x30 FONTCOUNT: number of fonts
  /*::[*/
  50: {
    /* n:"BIFF2FONTXTRA", */
    f: qx
  },
  // 0x35: INFOOPTS
  // 0x36: TABLE (BIFF2 only)
  // 0x37: TABLE2 (BIFF2 only)
  // 0x38: WNDESK
  // 0x39 ??
  // 0x3a: BEGINPREF
  // 0x3b: ENDPREF
  /*::[*/
  62: {
    /* n:"BIFF2WINDOW2", */
  },
  // 0x3f ??
  // 0x46: SHOWSCROLL
  // 0x47: SHOWFORMULA
  // 0x48: STATUSBAR
  // 0x49: SHORTMENUS
  // 0x4A:
  // 0x4B:
  // 0x4C:
  // 0x4E:
  // 0x4F:
  // 0x58: TOOLBAR (BIFF3)
  /* - - - */
  /*::[*/
  52: {
    /* n:"DDEObjName", */
  },
  /*::[*/
  67: {
    /* n:"BIFF2XF", */
  },
  /*::[*/
  68: {
    /* n:"BIFF2XFINDEX", */
    f: ur
  },
  /*::[*/
  69: {
    /* n:"BIFF2FONTCLR", */
  },
  /*::[*/
  86: {
    /* n:"BIFF4FMTCNT", */
  },
  /* 16-bit cnt, similar to BIFF2 */
  /*::[*/
  126: {
    /* n:"RK", */
  },
  /* Not necessarily same as 0x027e */
  /*::[*/
  127: {
    /* n:"ImData", */
    f: zx
  },
  /*::[*/
  135: {
    /* n:"Addin", */
  },
  /*::[*/
  136: {
    /* n:"Edg", */
  },
  /*::[*/
  137: {
    /* n:"Pub", */
  },
  // 0x8A
  // 0x8B LH: alternate menu key flag (BIFF3/4)
  // 0x8E
  // 0x8F
  /*::[*/
  145: {
    /* n:"Sub", */
  },
  // 0x93 STYLE
  /*::[*/
  148: {
    /* n:"LHRecord", */
  },
  /*::[*/
  149: {
    /* n:"LHNGraph", */
  },
  /*::[*/
  150: {
    /* n:"Sound", */
  },
  // 0xA2 FNPROTO: function prototypes (BIFF4)
  // 0xA3
  // 0xA8
  /*::[*/
  169: {
    /* n:"CoordList", */
  },
  /*::[*/
  171: {
    /* n:"GCW", */
  },
  /*::[*/
  188: {
    /* n:"ShrFmla", */
  },
  /* Not necessarily same as 0x04bc */
  /*::[*/
  191: {
    /* n:"ToolbarHdr", */
  },
  /*::[*/
  192: {
    /* n:"ToolbarEnd", */
  },
  /*::[*/
  194: {
    /* n:"AddMenu", */
  },
  /*::[*/
  195: {
    /* n:"DelMenu", */
  },
  /*::[*/
  214: {
    /* n:"RString", */
    f: Zx
  },
  /*::[*/
  223: {
    /* n:"UDDesc", */
  },
  /*::[*/
  234: {
    /* n:"TabIdConf", */
  },
  /*::[*/
  354: {
    /* n:"XL5Modify", */
  },
  /*::[*/
  421: {
    /* n:"FileSharing2", */
  },
  /*::[*/
  518: {
    /* n:"Formula", */
    f: as
  },
  /*::[*/
  521: {
    /* n:"BOF", */
    f: ui
  },
  /*::[*/
  536: {
    /* n:"Lbl", */
    f: Ef
  },
  /*::[*/
  547: {
    /* n:"ExternName", */
    f: _f
  },
  /*::[*/
  561: {
    /* n:"Font", */
  },
  /*::[*/
  579: {
    /* n:"BIFF3XF", */
  },
  /*::[*/
  1030: {
    /* n:"Formula", */
    f: as
  },
  /*::[*/
  1033: {
    /* n:"BOF", */
    f: ui
  },
  /*::[*/
  1091: {
    /* n:"BIFF4XF", */
  },
  /*::[*/
  2157: {
    /* n:"FeatInfo", */
  },
  /*::[*/
  2163: {
    /* n:"FeatInfo11", */
  },
  /*::[*/
  2177: {
    /* n:"SXAddl12", */
  },
  /*::[*/
  2240: {
    /* n:"AutoWebPub", */
  },
  /*::[*/
  2241: {
    /* n:"ListObj", */
  },
  /*::[*/
  2242: {
    /* n:"ListField", */
  },
  /*::[*/
  2243: {
    /* n:"ListDV", */
  },
  /*::[*/
  2244: {
    /* n:"ListCondFmt", */
  },
  /*::[*/
  2245: {
    /* n:"ListCF", */
  },
  /*::[*/
  2246: {
    /* n:"FMQry", */
  },
  /*::[*/
  2247: {
    /* n:"FMSQry", */
  },
  /*::[*/
  2248: {
    /* n:"PLV", */
  },
  /*::[*/
  2249: {
    /* n:"LnExt", */
  },
  /*::[*/
  2250: {
    /* n:"MkrExt", */
  },
  /*::[*/
  2251: {
    /* n:"CrtCoopt", */
  },
  /*::[*/
  2262: {
    /* n:"FRTArchId$", */
    r: 12
  },
  /*::[*/
  29282: {}
};
function le(e, t, r, n) {
  var a = t;
  if (!isNaN(a)) {
    var i = n || (r || []).length || 0, s = e.next(4);
    s.write_shift(2, a), s.write_shift(2, i), /*:: len != null &&*/
    i > 0 && Gs(r) && e.push(r);
  }
}
function Jw(e, t, r, n) {
  var a = (r || []).length || 0;
  if (a <= 8224) return le(e, t, r, a);
  var i = t;
  if (!isNaN(i)) {
    for (var s = r.parts || [], f = 0, c = 0, o = 0; o + (s[f] || 8224) <= 8224; )
      o += s[f] || 8224, f++;
    var l = e.next(4);
    for (l.write_shift(2, i), l.write_shift(2, o), e.push(r.slice(c, c + o)), c += o; c < a; ) {
      for (l = e.next(4), l.write_shift(2, 60), o = 0; o + (s[f] || 8224) <= 8224; )
        o += s[f] || 8224, f++;
      l.write_shift(2, o), e.push(r.slice(c, c + o)), c += o;
    }
  }
}
function ei(e, t, r) {
  return e || (e = q(7)), e.write_shift(2, t), e.write_shift(2, r), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function qw(e, t, r, n) {
  var a = q(9);
  return ei(a, e, t), oo(r, n || "b", a), a;
}
function Zw(e, t, r) {
  var n = q(8 + 2 * r.length);
  return ei(n, e, t), n.write_shift(1, r.length), n.write_shift(r.length, r, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function Qw(e, t, r, n) {
  if (t.v != null) switch (t.t) {
    case "d":
    case "n":
      var a = t.t == "d" ? gr(Ye(t.v)) : t.v;
      a == (a | 0) && a >= 0 && a < 65536 ? le(e, 2, Kx(r, n, a)) : le(e, 3, jx(r, n, a));
      return;
    case "b":
    case "e":
      le(e, 5, qw(r, n, t.v, t.t));
      return;
    case "s":
    case "str":
      le(e, 4, Zw(r, n, (t.v || "").slice(0, 255)));
      return;
  }
  le(e, 1, ei(null, r, n));
}
function e_(e, t, r, n) {
  var a = Array.isArray(t), i = Me(t["!ref"] || "A1"), s, f = "", c = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF) throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = Ae(i);
  }
  for (var o = i.s.r; o <= i.e.r; ++o) {
    f = cr(o);
    for (var l = i.s.c; l <= i.e.c; ++l) {
      o === i.s.r && (c[l] = Qe(l)), s = c[l] + f;
      var h = a ? (t[o] || [])[l] : t[s];
      h && Qw(e, h, o, l);
    }
  }
}
function r_(e, t) {
  for (var r = t || {}, n = Wr(), a = 0, i = 0; i < e.SheetNames.length; ++i) e.SheetNames[i] == r.sheet && (a = i);
  if (a == 0 && r.sheet && e.SheetNames[0] != r.sheet) throw new Error("Sheet not found: " + r.sheet);
  return le(n, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, r0(e, 16, r)), e_(n, e.Sheets[e.SheetNames[a]], a, r), le(n, 10), n.end();
}
function t_(e, t, r) {
  le(e, 49, K1({
    sz: 12,
    name: "Arial"
  }, r));
}
function n_(e, t, r) {
  t && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(n) {
    for (var a = n[0]; a <= n[1]; ++a) t[a] != null && le(e, 1054, rx(a, t[a], r));
  });
}
function a_(e, t) {
  var r = q(19);
  r.write_shift(4, 2151), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 1), r.write_shift(4, 0), le(e, 2151, r), r = q(39), r.write_shift(4, 2152), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(2, 1), r.write_shift(4, 4), r.write_shift(2, 0), go(Me(t["!ref"] || "A1"), r), r.write_shift(4, 4), le(e, 2152, r);
}
function i_(e, t) {
  for (var r = 0; r < 16; ++r) le(e, 224, pf({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function(n) {
    le(e, 224, pf(n, 0, t));
  });
}
function s_(e, t) {
  for (var r = 0; r < t["!links"].length; ++r) {
    var n = t["!links"][r];
    le(e, 440, Cx(n)), n[1].Tooltip && le(e, 2048, Nx(n));
  }
  delete t["!links"];
}
function f_(e, t) {
  if (t) {
    var r = 0;
    t.forEach(function(n, a) {
      ++r <= 256 && n && le(e, 125, Px(zi(a, n), a));
    });
  }
}
function c_(e, t, r, n, a) {
  var i = 16 + on(a.cellXfs, t, a);
  if (t.v == null && !t.bf) {
    le(e, 513, Sn(r, n, i));
    return;
  }
  if (t.bf) le(e, 6, Dp(t, r, n, a, i));
  else switch (t.t) {
    case "d":
    case "n":
      var s = t.t == "d" ? gr(Ye(t.v)) : t.v;
      le(e, 515, xx(r, n, s, i));
      break;
    case "b":
    case "e":
      le(e, 517, hx(r, n, t.v, i, a, t.t));
      break;
    case "s":
    case "str":
      if (a.bookSST) {
        var f = o0(a.Strings, t.v, a.revStrings);
        le(e, 253, q1(r, n, f, i));
      } else le(e, 516, Q1(r, n, (t.v || "").slice(0, 255), i, a));
      break;
    default:
      le(e, 513, Sn(r, n, i));
  }
}
function o_(e, t, r) {
  var n = Wr(), a = r.SheetNames[e], i = r.Sheets[a] || {}, s = (r || {}).Workbook || {}, f = (s.Sheets || [])[e] || {}, c = Array.isArray(i), o = t.biff == 8, l, h = "", u = [], x = Me(i["!ref"] || "A1"), g = o ? 65536 : 16384;
  if (x.e.c > 255 || x.e.r >= g) {
    if (t.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    x.e.c = Math.min(x.e.c, 255), x.e.r = Math.min(x.e.c, g - 1);
  }
  le(n, 2057, r0(r, 16, t)), le(n, 13, ot(1)), le(n, 12, ot(100)), le(n, 15, Rr(!0)), le(n, 17, Rr(!1)), le(n, 16, yn(1e-3)), le(n, 95, Rr(!0)), le(n, 42, Rr(!1)), le(n, 43, Rr(!1)), le(n, 130, ot(1)), le(n, 128, lx()), le(n, 131, Rr(!1)), le(n, 132, Rr(!1)), o && f_(n, i["!cols"]), le(n, 512, nx(x, t)), o && (i["!links"] = []);
  for (var d = x.s.r; d <= x.e.r; ++d) {
    h = cr(d);
    for (var m = x.s.c; m <= x.e.c; ++m) {
      d === x.s.r && (u[m] = Qe(m)), l = u[m] + h;
      var w = c ? (i[d] || [])[m] : i[l];
      w && (c_(n, w, d, m, t), o && w.l && i["!links"].push([l, w.l]));
    }
  }
  var y = f.CodeName || f.name || a;
  return o && le(n, 574, X1((s.Views || [])[0])), o && (i["!merges"] || []).length && le(n, 229, Tx(i["!merges"])), o && s_(n, i), le(n, 442, lo(y)), o && a_(n, i), le(
    n,
    10
    /* EOF */
  ), n.end();
}
function l_(e, t, r) {
  var n = Wr(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = (
    /*::((*/
    a.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), f = r.biff == 8, c = r.biff == 5;
  if (le(n, 2057, r0(e, 5, r)), r.bookType == "xla" && le(
    n,
    135
    /* Addin */
  ), le(n, 225, f ? ot(1200) : null), le(n, 193, h1(2)), c && le(
    n,
    191
    /* ToolbarHdr */
  ), c && le(
    n,
    192
    /* ToolbarEnd */
  ), le(
    n,
    226
    /* InterfaceEnd */
  ), le(n, 92, B1("SheetJS", r)), le(n, 66, ot(f ? 1200 : 1252)), f && le(n, 353, ot(0)), f && le(
    n,
    448
    /* Excel9File */
  ), le(n, 317, Wx(e.SheetNames.length)), f && e.vbaraw && le(
    n,
    211
    /* ObProj */
  ), f && e.vbaraw) {
    var o = s.CodeName || "ThisWorkbook";
    le(n, 442, lo(o));
  }
  le(n, 156, ot(17)), le(n, 25, Rr(!1)), le(n, 18, Rr(!1)), le(n, 19, ot(0)), f && le(n, 431, Rr(!1)), f && le(n, 444, ot(0)), le(n, 61, z1()), le(n, 64, Rr(!1)), le(n, 141, ot(0)), le(n, 34, Rr(Vv(e) == "true")), le(n, 14, Rr(!0)), f && le(n, 439, Rr(!1)), le(n, 218, ot(0)), t_(n, e, r), n_(n, e.SSF, r), i_(n, r), f && le(n, 352, Rr(!1));
  var l = n.end(), h = Wr();
  f && le(h, 140, Bx()), f && r.Strings && Jw(h, 252, M1(r.Strings)), le(
    h,
    10
    /* EOF */
  );
  var u = h.end(), x = Wr(), g = 0, d = 0;
  for (d = 0; d < e.SheetNames.length; ++d) g += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[d].length;
  var m = l.length + g + u.length;
  for (d = 0; d < e.SheetNames.length; ++d) {
    var w = i[d] || {};
    le(x, 133, L1({ pos: m, hs: w.Hidden || 0, dt: 0, name: e.SheetNames[d] }, r)), m += t[d].length;
  }
  var y = x.end();
  if (g != y.length) throw new Error("BS8 " + g + " != " + y.length);
  var v = [];
  return l.length && v.push(l), y.length && v.push(y), u.length && v.push(u), pr(v);
}
function h_(e, t) {
  var r = t || {}, n = [];
  e && !e.SSF && (e.SSF = Ke(Ee)), e && e.SSF && (ta(), Pi(e.SSF), r.revssf = Ui(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, d0(r), r.cellXfs = [], on(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a) n[n.length] = o_(a, r, e);
  return n.unshift(l_(e, n, r)), pr(n);
}
function al(e, t) {
  for (var r = 0; r <= e.SheetNames.length; ++r) {
    var n = e.Sheets[e.SheetNames[r]];
    if (!(!n || !n["!ref"])) {
      var a = Hr(n["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[r] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = t || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return h_(e, t);
    case 4:
    case 3:
    case 2:
      return r_(e, t);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function If(e, t) {
  var r = t || {}, n = r.dense ? [] : {};
  e = e.replace(/<!--.*?-->/g, "");
  var a = e.match(/<table/i);
  if (!a) throw new Error("Invalid HTML: could not find <table>");
  var i = e.match(/<\/table/i), s = a.index, f = i && i.index || e.length, c = Kh(e.slice(s, f), /(:?<tr[^>]*>)/i, "<tr>"), o = -1, l = 0, h = 0, u = 0, x = { s: { r: 1e7, c: 1e7 }, e: { r: 0, c: 0 } }, g = [];
  for (s = 0; s < c.length; ++s) {
    var d = c[s].trim(), m = d.slice(0, 3).toLowerCase();
    if (m == "<tr") {
      if (++o, r.sheetRows && r.sheetRows <= o) {
        --o;
        break;
      }
      l = 0;
      continue;
    }
    if (!(m != "<td" && m != "<th")) {
      var w = d.split(/<\/t[dh]>/i);
      for (f = 0; f < w.length; ++f) {
        var y = w[f].trim();
        if (y.match(/<t[dh]/i)) {
          for (var v = y, I = 0; v.charAt(0) == "<" && (I = v.indexOf(">")) > -1; ) v = v.slice(I + 1);
          for (var T = 0; T < g.length; ++T) {
            var N = g[T];
            N.s.c == l && N.s.r < o && o <= N.e.r && (l = N.e.c + 1, T = -1);
          }
          var k = Te(y.slice(0, y.indexOf(">")));
          u = k.colspan ? +k.colspan : 1, ((h = +k.rowspan) > 1 || u > 1) && g.push({ s: { r: o, c: l }, e: { r: o + (h || 1) - 1, c: l + u - 1 } });
          var U = k.t || k["data-t"] || "";
          if (!v.length) {
            l += u;
            continue;
          }
          if (v = Fc(v), x.s.r > o && (x.s.r = o), x.e.r < o && (x.e.r = o), x.s.c > l && (x.s.c = l), x.e.c < l && (x.e.c = l), !v.length) {
            l += u;
            continue;
          }
          var C = { t: "s", v };
          r.raw || !v.trim().length || U == "s" || (v === "TRUE" ? C = { t: "b", v: !0 } : v === "FALSE" ? C = { t: "b", v: !1 } : isNaN(wt(v)) ? isNaN(Jn(v).getDate()) || (C = { t: "d", v: Ye(v) }, r.cellDates || (C = { t: "n", v: gr(C.v) }), C.z = r.dateNF || Ee[14]) : C = { t: "n", v: wt(v) }), r.dense ? (n[o] || (n[o] = []), n[o][l] = C) : n[ye({ r: o, c: l })] = C, l += u;
        }
      }
    }
  }
  return n["!ref"] = Ae(x), g.length && (n["!merges"] = g), n;
}
function u_(e, t, r, n) {
  for (var a = e["!merges"] || [], i = [], s = t.s.c; s <= t.e.c; ++s) {
    for (var f = 0, c = 0, o = 0; o < a.length; ++o)
      if (!(a[o].s.r > r || a[o].s.c > s) && !(a[o].e.r < r || a[o].e.c < s)) {
        if (a[o].s.r < r || a[o].s.c < s) {
          f = -1;
          break;
        }
        f = a[o].e.r - a[o].s.r + 1, c = a[o].e.c - a[o].s.c + 1;
        break;
      }
    if (!(f < 0)) {
      var l = ye({ r, c: s }), h = n.dense ? (e[r] || [])[s] : e[l], u = h && h.v != null && (h.h || Vs(h.w || (Ut(h), h.w) || "")) || "", x = {};
      f > 1 && (x.rowspan = f), c > 1 && (x.colspan = c), n.editable ? u = '<span contenteditable="true">' + u + "</span>" : h && (x["data-t"] = h && h.t || "z", h.v != null && (x["data-v"] = h.v), h.z != null && (x["data-z"] = h.z), h.l && (h.l.Target || "#").charAt(0) != "#" && (u = '<a href="' + h.l.Target + '">' + u + "</a>")), x.id = (n.id || "sjs") + "-" + l, i.push(oe("td", u, x));
    }
  }
  var g = "<tr>";
  return g + i.join("") + "</tr>";
}
var x_ = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', d_ = "</body></html>";
function g_(e, t) {
  var r = e.match(/<table[\s\S]*?>[\s\S]*?<\/table>/gi);
  if (!r || r.length == 0) throw new Error("Invalid HTML: could not find <table>");
  if (r.length == 1) return cn(If(r[0], t), t);
  var n = p0();
  return r.forEach(function(a, i) {
    v0(n, If(a, t), "Sheet" + (i + 1));
  }), n;
}
function m_(e, t, r) {
  var n = [];
  return n.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">";
}
function il(e, t) {
  var r = t || {}, n = r.header != null ? r.header : x_, a = r.footer != null ? r.footer : d_, i = [n], s = Hr(e["!ref"]);
  r.dense = Array.isArray(e), i.push(m_(e, s, r));
  for (var f = s.s.r; f <= s.e.r; ++f) i.push(u_(e, s, f, r));
  return i.push("</table>" + a), i.join("");
}
function sl(e, t, r) {
  var n = r || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number") a = n.origin;
    else {
      var s = typeof n.origin == "string" ? er(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var f = t.getElementsByTagName("tr"), c = Math.min(n.sheetRows || 1e7, f.length), o = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var l = Hr(e["!ref"]);
    o.s.r = Math.min(o.s.r, l.s.r), o.s.c = Math.min(o.s.c, l.s.c), o.e.r = Math.max(o.e.r, l.e.r), o.e.c = Math.max(o.e.c, l.e.c), a == -1 && (o.e.r = a = l.e.r + 1);
  }
  var h = [], u = 0, x = e["!rows"] || (e["!rows"] = []), g = 0, d = 0, m = 0, w = 0, y = 0, v = 0;
  for (e["!cols"] || (e["!cols"] = []); g < f.length && d < c; ++g) {
    var I = f[g];
    if (Bf(I)) {
      if (n.display) continue;
      x[d] = { hidden: !0 };
    }
    var T = I.children;
    for (m = w = 0; m < T.length; ++m) {
      var N = T[m];
      if (!(n.display && Bf(N))) {
        var k = N.hasAttribute("data-v") ? N.getAttribute("data-v") : N.hasAttribute("v") ? N.getAttribute("v") : Fc(N.innerHTML), U = N.getAttribute("data-z") || N.getAttribute("z");
        for (u = 0; u < h.length; ++u) {
          var C = h[u];
          C.s.c == w + i && C.s.r < d + a && d + a <= C.e.r && (w = C.e.c + 1 - i, u = -1);
        }
        v = +N.getAttribute("colspan") || 1, ((y = +N.getAttribute("rowspan") || 1) > 1 || v > 1) && h.push({ s: { r: d + a, c: w + i }, e: { r: d + a + (y || 1) - 1, c: w + i + (v || 1) - 1 } });
        var D = { t: "s", v: k }, M = N.getAttribute("data-t") || N.getAttribute("t") || "";
        k != null && (k.length == 0 ? D.t = M || "z" : n.raw || k.trim().length == 0 || M == "s" || (k === "TRUE" ? D = { t: "b", v: !0 } : k === "FALSE" ? D = { t: "b", v: !1 } : isNaN(wt(k)) ? isNaN(Jn(k).getDate()) || (D = { t: "d", v: Ye(k) }, n.cellDates || (D = { t: "n", v: gr(D.v) }), D.z = n.dateNF || Ee[14]) : D = { t: "n", v: wt(k) })), D.z === void 0 && U != null && (D.z = U);
        var B = "", Y = N.getElementsByTagName("A");
        if (Y && Y.length) for (var he = 0; he < Y.length && !(Y[he].hasAttribute("href") && (B = Y[he].getAttribute("href"), B.charAt(0) != "#")); ++he) ;
        B && B.charAt(0) != "#" && (D.l = { Target: B }), n.dense ? (e[d + a] || (e[d + a] = []), e[d + a][w + i] = D) : e[ye({ c: w + i, r: d + a })] = D, o.e.c < w + i && (o.e.c = w + i), w += v;
      }
    }
    ++d;
  }
  return h.length && (e["!merges"] = (e["!merges"] || []).concat(h)), o.e.r = Math.max(o.e.r, d - 1 + a), e["!ref"] = Ae(o), d >= c && (e["!fullref"] = Ae((o.e.r = f.length - g + d - 1 + a, o))), e;
}
function fl(e, t) {
  var r = t || {}, n = r.dense ? [] : {};
  return sl(n, e, t);
}
function p_(e, t) {
  return cn(fl(e, t), t);
}
function Bf(e) {
  var t = "", r = v_(e);
  return r && (t = r(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}
function v_(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
function w_(e) {
  var t = e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g, function(n, a) {
    return Array(parseInt(a, 10) + 1).join(" ");
  }).replace(/<text:tab[^>]*\/>/g, "	").replace(/<text:line-break\/>/g, `
`), r = Pe(t.replace(/<[^>]*>/g, ""));
  return [r];
}
var Df = {
  /* ods name: [short ssf fmt, long ssf fmt] */
  day: ["d", "dd"],
  month: ["m", "mm"],
  year: ["y", "yy"],
  hours: ["h", "hh"],
  minutes: ["m", "mm"],
  seconds: ["s", "ss"],
  "am-pm": ["A/P", "AM/PM"],
  "day-of-week": ["ddd", "dddd"],
  era: ["e", "ee"],
  /* there is no native representation of LO "Q" format */
  quarter: ["\\Qm", 'm\\"th quarter"']
};
function cl(e, t) {
  var r = t || {}, n = $s(e), a = [], i, s, f = { name: "" }, c = "", o = 0, l, h, u = {}, x = [], g = r.dense ? [] : {}, d, m, w = { value: "" }, y = "", v = 0, I = [], T = -1, N = -1, k = { s: { r: 1e6, c: 1e7 }, e: { r: 0, c: 0 } }, U = 0, C = {}, D = [], M = {}, B = 0, Y = 0, he = [], W = 1, ee = 1, ne = [], De = { Names: [] }, H = {}, _e = ["", ""], Se = [], O = {}, P = "", R = 0, L = !1, Q = !1, fe = 0;
  for (Pa.lastIndex = 0, n = n.replace(/<!--([\s\S]*?)-->/mg, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, ""); d = Pa.exec(n); ) switch (d[3] = d[3].replace(/_.*$/, "")) {
    case "table":
    case "工作表":
      d[1] === "/" ? (k.e.c >= k.s.c && k.e.r >= k.s.r ? g["!ref"] = Ae(k) : g["!ref"] = "A1:A1", r.sheetRows > 0 && r.sheetRows <= k.e.r && (g["!fullref"] = g["!ref"], k.e.r = r.sheetRows - 1, g["!ref"] = Ae(k)), D.length && (g["!merges"] = D), he.length && (g["!rows"] = he), l.name = l.名称 || l.name, typeof JSON < "u" && JSON.stringify(l), x.push(l.name), u[l.name] = g, Q = !1) : d[0].charAt(d[0].length - 2) !== "/" && (l = Te(d[0], !1), T = N = -1, k.s.r = k.s.c = 1e7, k.e.r = k.e.c = 0, g = r.dense ? [] : {}, D = [], he = [], Q = !0);
      break;
    case "table-row-group":
      d[1] === "/" ? --U : ++U;
      break;
    case "table-row":
    case "行":
      if (d[1] === "/") {
        T += W, W = 1;
        break;
      }
      if (h = Te(d[0], !1), h.行号 ? T = h.行号 - 1 : T == -1 && (T = 0), W = +h["number-rows-repeated"] || 1, W < 10) for (fe = 0; fe < W; ++fe) U > 0 && (he[T + fe] = { level: U });
      N = -1;
      break;
    case "covered-table-cell":
      d[1] !== "/" && ++N, r.sheetStubs && (r.dense ? (g[T] || (g[T] = []), g[T][N] = { t: "z" }) : g[ye({ r: T, c: N })] = { t: "z" }), y = "", I = [];
      break;
    case "table-cell":
    case "数据":
      if (d[0].charAt(d[0].length - 2) === "/")
        ++N, w = Te(d[0], !1), ee = parseInt(w["number-columns-repeated"] || "1", 10), m = {
          t: "z",
          v: null
          /*:: , z:null, w:"",c:[]*/
        }, w.formula && r.cellFormula != !1 && (m.f = Cf(Pe(w.formula))), (w.数据类型 || w["value-type"]) == "string" && (m.t = "s", m.v = Pe(w["string-value"] || ""), r.dense ? (g[T] || (g[T] = []), g[T][N] = m) : g[ye({ r: T, c: N })] = m), N += ee - 1;
      else if (d[1] !== "/") {
        ++N, y = "", v = 0, I = [], ee = 1;
        var ce = W ? T + W - 1 : T;
        if (N > k.e.c && (k.e.c = N), N < k.s.c && (k.s.c = N), T < k.s.r && (k.s.r = T), ce > k.e.r && (k.e.r = ce), w = Te(d[0], !1), Se = [], O = {}, m = {
          t: w.数据类型 || w["value-type"],
          v: null
          /*:: , z:null, w:"",c:[]*/
        }, r.cellFormula)
          if (w.formula && (w.formula = Pe(w.formula)), w["number-matrix-columns-spanned"] && w["number-matrix-rows-spanned"] && (B = parseInt(w["number-matrix-rows-spanned"], 10) || 0, Y = parseInt(w["number-matrix-columns-spanned"], 10) || 0, M = { s: { r: T, c: N }, e: { r: T + B - 1, c: N + Y - 1 } }, m.F = Ae(M), ne.push([M, m.F])), w.formula) m.f = Cf(w.formula);
          else for (fe = 0; fe < ne.length; ++fe)
            T >= ne[fe][0].s.r && T <= ne[fe][0].e.r && N >= ne[fe][0].s.c && N <= ne[fe][0].e.c && (m.F = ne[fe][1]);
        switch ((w["number-columns-spanned"] || w["number-rows-spanned"]) && (B = parseInt(w["number-rows-spanned"], 10) || 0, Y = parseInt(w["number-columns-spanned"], 10) || 0, M = { s: { r: T, c: N }, e: { r: T + B - 1, c: N + Y - 1 } }, D.push(M)), w["number-columns-repeated"] && (ee = parseInt(w["number-columns-repeated"], 10)), m.t) {
          case "boolean":
            m.t = "b", m.v = je(w["boolean-value"]);
            break;
          case "float":
            m.t = "n", m.v = parseFloat(w.value);
            break;
          case "percentage":
            m.t = "n", m.v = parseFloat(w.value);
            break;
          case "currency":
            m.t = "n", m.v = parseFloat(w.value);
            break;
          case "date":
            m.t = "d", m.v = Ye(w["date-value"]), r.cellDates || (m.t = "n", m.v = gr(m.v)), m.z = "m/d/yy";
            break;
          case "time":
            m.t = "n", m.v = Xh(w["time-value"]) / 86400, r.cellDates && (m.t = "d", m.v = Wi(m.v)), m.z = "HH:MM:SS";
            break;
          case "number":
            m.t = "n", m.v = parseFloat(w.数据数值);
            break;
          default:
            if (m.t === "string" || m.t === "text" || !m.t)
              m.t = "s", w["string-value"] != null && (y = Pe(w["string-value"]), I = []);
            else throw new Error("Unsupported value type " + m.t);
        }
      } else {
        if (L = !1, m.t === "s" && (m.v = y || "", I.length && (m.R = I), L = v == 0), H.Target && (m.l = H), Se.length > 0 && (m.c = Se, Se = []), y && r.cellText !== !1 && (m.w = y), L && (m.t = "z", delete m.v), (!L || r.sheetStubs) && !(r.sheetRows && r.sheetRows <= T))
          for (var ie = 0; ie < W; ++ie) {
            if (ee = parseInt(w["number-columns-repeated"] || "1", 10), r.dense)
              for (g[T + ie] || (g[T + ie] = []), g[T + ie][N] = ie == 0 ? m : Ke(m); --ee > 0; ) g[T + ie][N + ee] = Ke(m);
            else
              for (g[ye({ r: T + ie, c: N })] = m; --ee > 0; ) g[ye({ r: T + ie, c: N + ee })] = Ke(m);
            k.e.c <= N && (k.e.c = N);
          }
        ee = parseInt(w["number-columns-repeated"] || "1", 10), N += ee - 1, ee = 0, m = {
          /*:: t:"", v:null, z:null, w:"",c:[]*/
        }, y = "", I = [];
      }
      H = {};
      break;
    case "document":
    case "document-content":
    case "电子表格文档":
    case "spreadsheet":
    case "主体":
    case "scripts":
    case "styles":
    case "font-face-decls":
    case "master-styles":
      if (d[1] === "/") {
        if ((i = a.pop())[0] !== d[3]) throw "Bad state: " + i;
      } else d[0].charAt(d[0].length - 2) !== "/" && a.push([d[3], !0]);
      break;
    case "annotation":
      if (d[1] === "/") {
        if ((i = a.pop())[0] !== d[3]) throw "Bad state: " + i;
        O.t = y, I.length && (O.R = I), O.a = P, Se.push(O);
      } else d[0].charAt(d[0].length - 2) !== "/" && a.push([d[3], !1]);
      P = "", R = 0, y = "", v = 0, I = [];
      break;
    case "creator":
      d[1] === "/" ? P = n.slice(R, d.index) : R = d.index + d[0].length;
      break;
    case "meta":
    case "元数据":
    case "settings":
    case "config-item-set":
    case "config-item-map-indexed":
    case "config-item-map-entry":
    case "config-item-map-named":
    case "shapes":
    case "frame":
    case "text-box":
    case "image":
    case "data-pilot-tables":
    case "list-style":
    case "form":
    case "dde-links":
    case "event-listeners":
    case "chart":
      if (d[1] === "/") {
        if ((i = a.pop())[0] !== d[3]) throw "Bad state: " + i;
      } else d[0].charAt(d[0].length - 2) !== "/" && a.push([d[3], !1]);
      y = "", v = 0, I = [];
      break;
    case "scientific-number":
      break;
    case "currency-symbol":
      break;
    case "currency-style":
      break;
    case "number-style":
    case "percentage-style":
    case "date-style":
    case "time-style":
      if (d[1] === "/") {
        if (C[f.name] = c, (i = a.pop())[0] !== d[3]) throw "Bad state: " + i;
      } else d[0].charAt(d[0].length - 2) !== "/" && (c = "", f = Te(d[0], !1), a.push([d[3], !0]));
      break;
    case "script":
      break;
    case "libraries":
      break;
    case "automatic-styles":
      break;
    case "default-style":
    case "page-layout":
      break;
    case "style":
      break;
    case "map":
      break;
    case "font-face":
      break;
    case "paragraph-properties":
      break;
    case "table-properties":
      break;
    case "table-column-properties":
      break;
    case "table-row-properties":
      break;
    case "table-cell-properties":
      break;
    case "number":
      switch (a[a.length - 1][0]) {
        case "time-style":
        case "date-style":
          s = Te(d[0], !1), c += Df[d[3]][s.style === "long" ? 1 : 0];
          break;
      }
      break;
    case "fraction":
      break;
    case "day":
    case "month":
    case "year":
    case "era":
    case "day-of-week":
    case "week-of-year":
    case "quarter":
    case "hours":
    case "minutes":
    case "seconds":
    case "am-pm":
      switch (a[a.length - 1][0]) {
        case "time-style":
        case "date-style":
          s = Te(d[0], !1), c += Df[d[3]][s.style === "long" ? 1 : 0];
          break;
      }
      break;
    case "boolean-style":
      break;
    case "boolean":
      break;
    case "text-style":
      break;
    case "text":
      if (d[0].slice(-2) === "/>") break;
      if (d[1] === "/") switch (a[a.length - 1][0]) {
        case "number-style":
        case "date-style":
        case "time-style":
          c += n.slice(o, d.index);
          break;
      }
      else o = d.index + d[0].length;
      break;
    case "named-range":
      s = Te(d[0], !1), _e = is(s["cell-range-address"]);
      var te = { Name: s.name, Ref: _e[0] + "!" + _e[1] };
      Q && (te.Sheet = x.length), De.Names.push(te);
      break;
    case "text-content":
      break;
    case "text-properties":
      break;
    case "embedded-text":
      break;
    case "body":
    case "电子表格":
      break;
    case "forms":
      break;
    case "table-column":
      break;
    case "table-header-rows":
      break;
    case "table-rows":
      break;
    case "table-column-group":
      break;
    case "table-header-columns":
      break;
    case "table-columns":
      break;
    case "null-date":
      break;
    case "graphic-properties":
      break;
    case "calculation-settings":
      break;
    case "named-expressions":
      break;
    case "label-range":
      break;
    case "label-ranges":
      break;
    case "named-expression":
      break;
    case "sort":
      break;
    case "sort-by":
      break;
    case "sort-groups":
      break;
    case "tab":
      break;
    case "line-break":
      break;
    case "span":
      break;
    case "p":
    case "文本串":
      if (["master-styles"].indexOf(a[a.length - 1][0]) > -1) break;
      if (d[1] === "/" && (!w || !w["string-value"])) {
        var be = w_(n.slice(v, d.index));
        y = (y.length > 0 ? y + `
` : "") + be[0];
      } else
        Te(d[0], !1), v = d.index + d[0].length;
      break;
    case "s":
      break;
    case "database-range":
      if (d[1] === "/") break;
      try {
        _e = is(Te(d[0])["target-range-address"]), u[_e[0]]["!autofilter"] = { ref: _e[1] };
      } catch {
      }
      break;
    case "date":
      break;
    case "object":
      break;
    case "title":
    case "标题":
      break;
    case "desc":
      break;
    case "binary-data":
      break;
    case "table-source":
      break;
    case "scenario":
      break;
    case "iteration":
      break;
    case "content-validations":
      break;
    case "content-validation":
      break;
    case "help-message":
      break;
    case "error-message":
      break;
    case "database-ranges":
      break;
    case "filter":
      break;
    case "filter-and":
      break;
    case "filter-or":
      break;
    case "filter-condition":
      break;
    case "list-level-style-bullet":
      break;
    case "list-level-style-number":
      break;
    case "list-level-properties":
      break;
    case "sender-firstname":
    case "sender-lastname":
    case "sender-initials":
    case "sender-title":
    case "sender-position":
    case "sender-email":
    case "sender-phone-private":
    case "sender-fax":
    case "sender-company":
    case "sender-phone-work":
    case "sender-street":
    case "sender-city":
    case "sender-postal-code":
    case "sender-country":
    case "sender-state-or-province":
    case "author-name":
    case "author-initials":
    case "chapter":
    case "file-name":
    case "template-name":
    case "sheet-name":
      break;
    case "event-listener":
      break;
    case "initial-creator":
    case "creation-date":
    case "print-date":
    case "generator":
    case "document-statistic":
    case "user-defined":
    case "editing-duration":
    case "editing-cycles":
      break;
    case "config-item":
      break;
    case "page-number":
      break;
    case "page-count":
      break;
    case "time":
      break;
    case "cell-range-source":
      break;
    case "detective":
      break;
    case "operation":
      break;
    case "highlighted-range":
      break;
    case "data-pilot-table":
    case "source-cell-range":
    case "source-service":
    case "data-pilot-field":
    case "data-pilot-level":
    case "data-pilot-subtotals":
    case "data-pilot-subtotal":
    case "data-pilot-members":
    case "data-pilot-member":
    case "data-pilot-display-info":
    case "data-pilot-sort-info":
    case "data-pilot-layout-info":
    case "data-pilot-field-reference":
    case "data-pilot-groups":
    case "data-pilot-group":
    case "data-pilot-group-member":
      break;
    case "rect":
      break;
    case "dde-connection-decls":
    case "dde-connection-decl":
    case "dde-link":
    case "dde-source":
      break;
    case "properties":
      break;
    case "property":
      break;
    case "a":
      if (d[1] !== "/") {
        if (H = Te(d[0], !1), !H.href) break;
        H.Target = Pe(H.href), delete H.href, H.Target.charAt(0) == "#" && H.Target.indexOf(".") > -1 ? (_e = is(H.Target.slice(1)), H.Target = "#" + _e[0] + "!" + _e[1]) : H.Target.match(/^\.\.[\\\/]/) && (H.Target = H.Target.slice(3));
      }
      break;
    case "table-protection":
      break;
    case "data-pilot-grand-total":
      break;
    case "office-document-common-attrs":
      break;
    default:
      switch (d[2]) {
        case "dc:":
        case "calcext:":
        case "loext:":
        case "ooo:":
        case "chartooo:":
        case "draw:":
        case "style:":
        case "chart:":
        case "form:":
        case "uof:":
        case "表:":
        case "字:":
          break;
        default:
          if (r.WTF) throw new Error(d);
      }
  }
  var b = {
    Sheets: u,
    SheetNames: x,
    Workbook: De
  };
  return r.bookSheets && delete /*::(*/
  b.Sheets, b;
}
function Rf(e, t) {
  t = t || {}, ft(e, "META-INF/manifest.xml") && Xu(hr(e, "META-INF/manifest.xml"), t);
  var r = Kr(e, "content.xml");
  if (!r) throw new Error("Missing content.xml in ODS / UOF file");
  var n = cl(ze(r), t);
  return ft(e, "meta.xml") && (n.Props = qc(hr(e, "meta.xml"))), n;
}
function Lf(e, t) {
  return cl(e, t);
}
var __ = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), t = "<office:document-styles " + La({
    "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
    "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
    "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
    "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
    "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
    "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    "xmlns:dc": "http://purl.org/dc/elements/1.1/",
    "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
    "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
    "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
    "office:version": "1.2"
  }) + ">" + e + "</office:document-styles>";
  return function() {
    return or + t;
  };
}(), Pf = /* @__PURE__ */ function() {
  var e = function(i) {
    return $e(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, t = `          <table:table-cell />
`, r = `          <table:covered-table-cell/>
`, n = function(i, s, f) {
    var c = [];
    c.push('      <table:table table:name="' + $e(s.SheetNames[f]) + `" table:style-name="ta1">
`);
    var o = 0, l = 0, h = Hr(i["!ref"] || "A1"), u = i["!merges"] || [], x = 0, g = Array.isArray(i);
    if (i["!cols"])
      for (l = 0; l <= h.e.c; ++l) c.push("        <table:table-column" + (i["!cols"][l] ? ' table:style-name="co' + i["!cols"][l].ods + '"' : "") + `></table:table-column>
`);
    var d = "", m = i["!rows"] || [];
    for (o = 0; o < h.s.r; ++o)
      d = m[o] ? ' table:style-name="ro' + m[o].ods + '"' : "", c.push("        <table:table-row" + d + `></table:table-row>
`);
    for (; o <= h.e.r; ++o) {
      for (d = m[o] ? ' table:style-name="ro' + m[o].ods + '"' : "", c.push("        <table:table-row" + d + `>
`), l = 0; l < h.s.c; ++l) c.push(t);
      for (; l <= h.e.c; ++l) {
        var w = !1, y = {}, v = "";
        for (x = 0; x != u.length; ++x)
          if (!(u[x].s.c > l) && !(u[x].s.r > o) && !(u[x].e.c < l) && !(u[x].e.r < o)) {
            (u[x].s.c != l || u[x].s.r != o) && (w = !0), y["table:number-columns-spanned"] = u[x].e.c - u[x].s.c + 1, y["table:number-rows-spanned"] = u[x].e.r - u[x].s.r + 1;
            break;
          }
        if (w) {
          c.push(r);
          continue;
        }
        var I = ye({ r: o, c: l }), T = g ? (i[o] || [])[l] : i[I];
        if (T && T.f && (y["table:formula"] = $e(Wp(T.f)), T.F && T.F.slice(0, I.length) == I)) {
          var N = Hr(T.F);
          y["table:number-matrix-columns-spanned"] = N.e.c - N.s.c + 1, y["table:number-matrix-rows-spanned"] = N.e.r - N.s.r + 1;
        }
        if (!T) {
          c.push(t);
          continue;
        }
        switch (T.t) {
          case "b":
            v = T.v ? "TRUE" : "FALSE", y["office:value-type"] = "boolean", y["office:boolean-value"] = T.v ? "true" : "false";
            break;
          case "n":
            v = T.w || String(T.v || 0), y["office:value-type"] = "float", y["office:value"] = T.v || 0;
            break;
          case "s":
          case "str":
            v = T.v == null ? "" : T.v, y["office:value-type"] = "string";
            break;
          case "d":
            v = T.w || Ye(T.v).toISOString(), y["office:value-type"] = "date", y["office:date-value"] = Ye(T.v).toISOString(), y["table:style-name"] = "ce1";
            break;
          default:
            c.push(t);
            continue;
        }
        var k = e(v);
        if (T.l && T.l.Target) {
          var U = T.l.Target;
          U = U.charAt(0) == "#" ? "#" + Hp(U.slice(1)) : U, U.charAt(0) != "#" && !U.match(/^\w+:/) && (U = "../" + U), k = oe("text:a", k, { "xlink:href": U.replace(/&/g, "&amp;") });
        }
        c.push("          " + oe("table:table-cell", oe("text:p", k, {}), y) + `
`);
      }
      c.push(`        </table:table-row>
`);
    }
    return c.push(`      </table:table>
`), c.join("");
  }, a = function(i, s) {
    i.push(` <office:automatic-styles>
`), i.push(`  <number:date-style style:name="N37" number:automatic-order="true">
`), i.push(`   <number:month number:style="long"/>
`), i.push(`   <number:text>/</number:text>
`), i.push(`   <number:day number:style="long"/>
`), i.push(`   <number:text>/</number:text>
`), i.push(`   <number:year/>
`), i.push(`  </number:date-style>
`);
    var f = 0;
    s.SheetNames.map(function(o) {
      return s.Sheets[o];
    }).forEach(function(o) {
      if (o && o["!cols"]) {
        for (var l = 0; l < o["!cols"].length; ++l) if (o["!cols"][l]) {
          var h = o["!cols"][l];
          if (h.width == null && h.wpx == null && h.wch == null) continue;
          rn(h), h.ods = f;
          var u = o["!cols"][l].wpx + "px";
          i.push('  <style:style style:name="co' + f + `" style:family="table-column">
`), i.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + u + `"/>
`), i.push(`  </style:style>
`), ++f;
        }
      }
    });
    var c = 0;
    s.SheetNames.map(function(o) {
      return s.Sheets[o];
    }).forEach(function(o) {
      if (o && o["!rows"]) {
        for (var l = 0; l < o["!rows"].length; ++l) if (o["!rows"][l]) {
          o["!rows"][l].ods = c;
          var h = o["!rows"][l].hpx + "px";
          i.push('  <style:style style:name="ro' + c + `" style:family="table-row">
`), i.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + h + `"/>
`), i.push(`  </style:style>
`), ++c;
        }
      }
    }), i.push(`  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">
`), i.push(`   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>
`), i.push(`  </style:style>
`), i.push(`  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>
`), i.push(` </office:automatic-styles>
`);
  };
  return function(s, f) {
    var c = [or], o = La({
      "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
      "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
      "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
      "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
      "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
      "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "xmlns:dc": "http://purl.org/dc/elements/1.1/",
      "xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
      "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
      "xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
      "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
      "xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
      "xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
      "xmlns:math": "http://www.w3.org/1998/Math/MathML",
      "xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
      "xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
      "xmlns:ooo": "http://openoffice.org/2004/office",
      "xmlns:ooow": "http://openoffice.org/2004/writer",
      "xmlns:oooc": "http://openoffice.org/2004/calc",
      "xmlns:dom": "http://www.w3.org/2001/xml-events",
      "xmlns:xforms": "http://www.w3.org/2002/xforms",
      "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
      "xmlns:rpt": "http://openoffice.org/2005/report",
      "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
      "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
      "xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
      "xmlns:tableooo": "http://openoffice.org/2009/table",
      "xmlns:drawooo": "http://openoffice.org/2010/draw",
      "xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
      "xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
      "xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
      "xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
      "xmlns:css3t": "http://www.w3.org/TR/css3-text/",
      "office:version": "1.2"
    }), l = La({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    f.bookType == "fods" ? (c.push("<office:document" + o + l + `>
`), c.push(Jc().replace(/office:document-meta/g, "office:meta"))) : c.push("<office:document-content" + o + `>
`), a(c, s), c.push(`  <office:body>
`), c.push(`    <office:spreadsheet>
`);
    for (var h = 0; h != s.SheetNames.length; ++h) c.push(n(s.Sheets[s.SheetNames[h]], s, h));
    return c.push(`    </office:spreadsheet>
`), c.push(`  </office:body>
`), f.bookType == "fods" ? c.push("</office:document>") : c.push("</office:document-content>"), c.join("");
  };
}();
function ol(e, t) {
  if (t.bookType == "fods") return Pf(e, t);
  var r = Us(), n = "", a = [], i = [];
  return n = "mimetype", Fe(r, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", Fe(r, n, Pf(e, t)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", Fe(r, n, __()), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", Fe(r, n, or + Jc(
    /*::wb, opts*/
  )), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", Fe(r, n, Ku(
    i
    /*, opts*/
  )), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", Fe(r, n, ju(
    a
    /*, opts*/
  )), r;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function kn(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function bs(e) {
  return typeof TextDecoder < "u" ? new TextDecoder().decode(e) : ze(fn(e));
}
function E_(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : Yr(At(e));
}
function y_(e, t) {
  e:
    for (var r = 0; r <= e.length - t.length; ++r) {
      for (var n = 0; n < t.length; ++n)
        if (e[r + n] != t[n])
          continue e;
      return !0;
    }
  return !1;
}
function nn(e) {
  var t = e.reduce(function(a, i) {
    return a + i.length;
  }, 0), r = new Uint8Array(t), n = 0;
  return e.forEach(function(a) {
    r.set(a, n), n += a.length;
  }), r;
}
function Mf(e) {
  return e -= e >> 1 & 1431655765, e = (e & 858993459) + (e >> 2 & 858993459), (e + (e >> 4) & 252645135) * 16843009 >>> 24;
}
function T_(e, t) {
  for (var r = (e[t + 15] & 127) << 7 | e[t + 14] >> 1, n = e[t + 14] & 1, a = t + 13; a >= t; --a)
    n = n * 256 + e[a];
  return (e[t + 15] & 128 ? -n : n) * Math.pow(10, r - 6176);
}
function S_(e, t, r) {
  var n = Math.floor(r == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(r))) + 6176 - 20, a = r / Math.pow(10, n - 6176);
  e[t + 15] |= n >> 7, e[t + 14] |= (n & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256)
    e[t + i] = a & 255;
  e[t + 15] |= r >= 0 ? 0 : 128;
}
function za(e, t) {
  var r = t ? t[0] : 0, n = e[r] & 127;
  e:
    if (e[r++] >= 128 && (n |= (e[r] & 127) << 7, e[r++] < 128 || (n |= (e[r] & 127) << 14, e[r++] < 128) || (n |= (e[r] & 127) << 21, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 28), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 35), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 42), ++r, e[r++] < 128)))
      break e;
  return t && (t[0] = r), n;
}
function He(e) {
  var t = new Uint8Array(7);
  t[0] = e & 127;
  var r = 1;
  e:
    if (e > 127) {
      if (t[r - 1] |= 128, t[r] = e >> 7 & 127, ++r, e <= 16383 || (t[r - 1] |= 128, t[r] = e >> 14 & 127, ++r, e <= 2097151) || (t[r - 1] |= 128, t[r] = e >> 21 & 127, ++r, e <= 268435455) || (t[r - 1] |= 128, t[r] = e / 256 >>> 21 & 127, ++r, e <= 34359738367) || (t[r - 1] |= 128, t[r] = e / 65536 >>> 21 & 127, ++r, e <= 4398046511103))
        break e;
      t[r - 1] |= 128, t[r] = e / 16777216 >>> 21 & 127, ++r;
    }
  return t.slice(0, r);
}
function tr(e) {
  var t = 0, r = e[t] & 127;
  e:
    if (e[t++] >= 128) {
      if (r |= (e[t] & 127) << 7, e[t++] < 128 || (r |= (e[t] & 127) << 14, e[t++] < 128) || (r |= (e[t] & 127) << 21, e[t++] < 128))
        break e;
      r |= (e[t] & 127) << 28;
    }
  return r;
}
function We(e) {
  for (var t = [], r = [0]; r[0] < e.length; ) {
    var n = r[0], a = za(e, r), i = a & 7;
    a = Math.floor(a / 8);
    var s = 0, f;
    if (a == 0)
      break;
    switch (i) {
      case 0:
        {
          for (var c = r[0]; e[r[0]++] >= 128; )
            ;
          f = e.slice(c, r[0]);
        }
        break;
      case 5:
        s = 4, f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 1:
        s = 8, f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 2:
        s = za(e, r), f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 3:
      case 4:
      default:
        throw new Error("PB Type ".concat(i, " for Field ").concat(a, " at offset ").concat(n));
    }
    var o = { data: f, type: i };
    t[a] == null ? t[a] = [o] : t[a].push(o);
  }
  return t;
}
function wr(e) {
  var t = [];
  return e.forEach(function(r, n) {
    r.forEach(function(a) {
      a.data && (t.push(He(n * 8 + a.type)), a.type == 2 && t.push(He(a.data.length)), t.push(a.data));
    });
  }), nn(t);
}
function u0(e, t) {
  return (e == null ? void 0 : e.map(function(r) {
    return t(r.data);
  })) || [];
}
function at(e) {
  for (var t, r = [], n = [0]; n[0] < e.length; ) {
    var a = za(e, n), i = We(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: tr(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(f) {
      var c = We(f.data), o = tr(c[3][0].data);
      s.messages.push({
        meta: c,
        data: e.slice(n[0], n[0] + o)
      }), n[0] += o;
    }), (t = i[3]) != null && t[0] && (s.merge = tr(i[3][0].data) >>> 0 > 0), r.push(s);
  }
  return r;
}
function Dn(e) {
  var t = [];
  return e.forEach(function(r) {
    var n = [];
    n[1] = [{ data: He(r.id), type: 0 }], n[2] = [], r.merge != null && (n[3] = [{ data: He(+!!r.merge), type: 0 }]);
    var a = [];
    r.messages.forEach(function(s) {
      a.push(s.data), s.meta[3] = [{ type: 0, data: He(s.data.length) }], n[2].push({ data: wr(s.meta), type: 2 });
    });
    var i = wr(n);
    t.push(He(i.length)), t.push(i), a.forEach(function(s) {
      return t.push(s);
    });
  }), nn(t);
}
function k_(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = [0], n = za(t, r), a = []; r[0] < t.length; ) {
    var i = t[r[0]] & 3;
    if (i == 0) {
      var s = t[r[0]++] >> 2;
      if (s < 60)
        ++s;
      else {
        var f = s - 59;
        s = t[r[0]], f > 1 && (s |= t[r[0] + 1] << 8), f > 2 && (s |= t[r[0] + 2] << 16), f > 3 && (s |= t[r[0] + 3] << 24), s >>>= 0, s++, r[0] += f;
      }
      a.push(t.slice(r[0], r[0] + s)), r[0] += s;
      continue;
    } else {
      var c = 0, o = 0;
      if (i == 1 ? (o = (t[r[0]] >> 2 & 7) + 4, c = (t[r[0]++] & 224) << 3, c |= t[r[0]++]) : (o = (t[r[0]++] >> 2) + 1, i == 2 ? (c = t[r[0]] | t[r[0] + 1] << 8, r[0] += 2) : (c = (t[r[0]] | t[r[0] + 1] << 8 | t[r[0] + 2] << 16 | t[r[0] + 3] << 24) >>> 0, r[0] += 4)), a = [nn(a)], c == 0)
        throw new Error("Invalid offset 0");
      if (c > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (o >= c)
        for (a.push(a[0].slice(-c)), o -= c; o >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), o -= a[a.length - 1].length;
      a.push(a[0].slice(-c, -c + o));
    }
  }
  var l = nn(a);
  if (l.length != n)
    throw new Error("Unexpected length: ".concat(l.length, " != ").concat(n));
  return l;
}
function it(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = e[r++], a = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
    r += 3, t.push(k_(n, e.slice(r, r + a))), r += a;
  }
  if (r !== e.length)
    throw new Error("data is not a valid framed stream!");
  return nn(t);
}
function Rn(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = Math.min(e.length - r, 268435455), a = new Uint8Array(4);
    t.push(a);
    var i = He(n), s = i.length;
    t.push(i), n <= 60 ? (s++, t.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, t.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, t.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, t.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, t.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), t.push(e.slice(r, r + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, r += n;
  }
  return nn(t);
}
function A_(e, t, r, n) {
  var a = kn(e), i = a.getUint32(4, !0), s = (n > 1 ? 12 : 8) + Mf(i & (n > 1 ? 3470 : 398)) * 4, f = -1, c = -1, o = NaN, l = new Date(2001, 0, 1);
  i & 512 && (f = a.getUint32(s, !0), s += 4), s += Mf(i & (n > 1 ? 12288 : 4096)) * 4, i & 16 && (c = a.getUint32(s, !0), s += 4), i & 32 && (o = a.getFloat64(s, !0), s += 8), i & 64 && (l.setTime(l.getTime() + a.getFloat64(s, !0) * 1e3), s += 8);
  var h;
  switch (e[2]) {
    case 0:
      break;
    case 2:
      h = { t: "n", v: o };
      break;
    case 3:
      h = { t: "s", v: t[c] };
      break;
    case 5:
      h = { t: "d", v: l };
      break;
    case 6:
      h = { t: "b", v: o > 0 };
      break;
    case 7:
      h = { t: "n", v: o / 86400 };
      break;
    case 8:
      h = { t: "e", v: 0 };
      break;
    case 9:
      if (f > -1)
        h = { t: "s", v: r[f] };
      else if (c > -1)
        h = { t: "s", v: t[c] };
      else if (!isNaN(o))
        h = { t: "n", v: o };
      else
        throw new Error("Unsupported cell type ".concat(e.slice(0, 4)));
      break;
    default:
      throw new Error("Unsupported cell type ".concat(e.slice(0, 4)));
  }
  return h;
}
function F_(e, t, r) {
  var n = kn(e), a = n.getUint32(8, !0), i = 12, s = -1, f = -1, c = NaN, o = NaN, l = new Date(2001, 0, 1);
  a & 1 && (c = T_(e, i), i += 16), a & 2 && (o = n.getFloat64(i, !0), i += 8), a & 4 && (l.setTime(l.getTime() + n.getFloat64(i, !0) * 1e3), i += 8), a & 8 && (f = n.getUint32(i, !0), i += 4), a & 16 && (s = n.getUint32(i, !0), i += 4);
  var h;
  switch (e[1]) {
    case 0:
      break;
    case 2:
      h = { t: "n", v: c };
      break;
    case 3:
      h = { t: "s", v: t[f] };
      break;
    case 5:
      h = { t: "d", v: l };
      break;
    case 6:
      h = { t: "b", v: o > 0 };
      break;
    case 7:
      h = { t: "n", v: o / 86400 };
      break;
    case 8:
      h = { t: "e", v: 0 };
      break;
    case 9:
      if (s > -1)
        h = { t: "s", v: r[s] };
      else
        throw new Error("Unsupported cell type ".concat(e[1], " : ").concat(a & 31, " : ").concat(e.slice(0, 4)));
      break;
    case 10:
      h = { t: "n", v: c };
      break;
    default:
      throw new Error("Unsupported cell type ".concat(e[1], " : ").concat(a & 31, " : ").concat(e.slice(0, 4)));
  }
  return h;
}
function fs(e, t) {
  var r = new Uint8Array(32), n = kn(r), a = 12, i = 0;
  switch (r[0] = 5, e.t) {
    case "n":
      r[1] = 2, S_(r, a, e.v), i |= 1, a += 16;
      break;
    case "b":
      r[1] = 6, n.setFloat64(a, e.v ? 1 : 0, !0), i |= 2, a += 8;
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      r[1] = 3, n.setUint32(a, t.indexOf(e.v), !0), i |= 8, a += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(8, i, !0), r.slice(0, a);
}
function cs(e, t) {
  var r = new Uint8Array(32), n = kn(r), a = 12, i = 0;
  switch (r[0] = 3, e.t) {
    case "n":
      r[2] = 2, n.setFloat64(a, e.v, !0), i |= 32, a += 8;
      break;
    case "b":
      r[2] = 6, n.setFloat64(a, e.v ? 1 : 0, !0), i |= 32, a += 8;
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      r[2] = 3, n.setUint32(a, t.indexOf(e.v), !0), i |= 16, a += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(4, i, !0), r.slice(0, a);
}
function b_(e, t, r) {
  switch (e[0]) {
    case 0:
    case 1:
    case 2:
    case 3:
      return A_(e, t, r, e[0]);
    case 5:
      return F_(e, t, r);
    default:
      throw new Error("Unsupported payload version ".concat(e[0]));
  }
}
function kr(e) {
  var t = We(e);
  return za(t[1][0].data);
}
function Uf(e, t) {
  var r = We(t.data), n = tr(r[1][0].data), a = r[3], i = [];
  return (a || []).forEach(function(s) {
    var f = We(s.data), c = tr(f[1][0].data) >>> 0;
    switch (n) {
      case 1:
        i[c] = bs(f[3][0].data);
        break;
      case 8:
        {
          var o = e[kr(f[9][0].data)][0], l = We(o.data), h = e[kr(l[1][0].data)][0], u = tr(h.meta[1][0].data);
          if (u != 2001)
            throw new Error("2000 unexpected reference to ".concat(u));
          var x = We(h.data);
          i[c] = x[3].map(function(g) {
            return bs(g.data);
          }).join("");
        }
        break;
    }
  }), i;
}
function C_(e, t) {
  var r, n, a, i, s, f, c, o, l, h, u, x, g, d, m = We(e), w = tr(m[1][0].data) >>> 0, y = tr(m[2][0].data) >>> 0, v = ((n = (r = m[8]) == null ? void 0 : r[0]) == null ? void 0 : n.data) && tr(m[8][0].data) > 0 || !1, I, T;
  if ((i = (a = m[7]) == null ? void 0 : a[0]) != null && i.data && t != 0)
    I = (f = (s = m[7]) == null ? void 0 : s[0]) == null ? void 0 : f.data, T = (o = (c = m[6]) == null ? void 0 : c[0]) == null ? void 0 : o.data;
  else if ((h = (l = m[4]) == null ? void 0 : l[0]) != null && h.data && t != 1)
    I = (x = (u = m[4]) == null ? void 0 : u[0]) == null ? void 0 : x.data, T = (d = (g = m[3]) == null ? void 0 : g[0]) == null ? void 0 : d.data;
  else
    throw "NUMBERS Tile missing ".concat(t, " cell storage");
  for (var N = v ? 4 : 1, k = kn(I), U = [], C = 0; C < I.length / 2; ++C) {
    var D = k.getUint16(C * 2, !0);
    D < 65535 && U.push([C, D]);
  }
  if (U.length != y)
    throw "Expected ".concat(y, " cells, found ").concat(U.length);
  var M = [];
  for (C = 0; C < U.length - 1; ++C)
    M[U[C][0]] = T.subarray(U[C][1] * N, U[C + 1][1] * N);
  return U.length >= 1 && (M[U[U.length - 1][0]] = T.subarray(U[U.length - 1][1] * N)), { R: w, cells: M };
}
function O_(e, t) {
  var r, n = We(t.data), a = (r = n == null ? void 0 : n[7]) != null && r[0] ? tr(n[7][0].data) >>> 0 > 0 ? 1 : 0 : -1, i = u0(n[5], function(s) {
    return C_(s, a);
  });
  return {
    nrows: tr(n[4][0].data) >>> 0,
    data: i.reduce(function(s, f) {
      return s[f.R] || (s[f.R] = []), f.cells.forEach(function(c, o) {
        if (s[f.R][o])
          throw new Error("Duplicate cell r=".concat(f.R, " c=").concat(o));
        s[f.R][o] = c;
      }), s;
    }, [])
  };
}
function N_(e, t, r) {
  var n, a = We(t.data), i = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
  if (i.e.r = (tr(a[6][0].data) >>> 0) - 1, i.e.r < 0)
    throw new Error("Invalid row varint ".concat(a[6][0].data));
  if (i.e.c = (tr(a[7][0].data) >>> 0) - 1, i.e.c < 0)
    throw new Error("Invalid col varint ".concat(a[7][0].data));
  r["!ref"] = Ae(i);
  var s = We(a[4][0].data), f = Uf(e, e[kr(s[4][0].data)][0]), c = (n = s[17]) != null && n[0] ? Uf(e, e[kr(s[17][0].data)][0]) : [], o = We(s[3][0].data), l = 0;
  o[1].forEach(function(h) {
    var u = We(h.data), x = e[kr(u[2][0].data)][0], g = tr(x.meta[1][0].data);
    if (g != 6002)
      throw new Error("6001 unexpected reference to ".concat(g));
    var d = O_(e, x);
    d.data.forEach(function(m, w) {
      m.forEach(function(y, v) {
        var I = ye({ r: l + w, c: v }), T = b_(y, f, c);
        T && (r[I] = T);
      });
    }), l += d.nrows;
  });
}
function I_(e, t) {
  var r = We(t.data), n = { "!ref": "A1" }, a = e[kr(r[2][0].data)], i = tr(a[0].meta[1][0].data);
  if (i != 6001)
    throw new Error("6000 unexpected reference to ".concat(i));
  return N_(e, a[0], n), n;
}
function B_(e, t) {
  var r, n = We(t.data), a = {
    name: (r = n[1]) != null && r[0] ? bs(n[1][0].data) : "",
    sheets: []
  }, i = u0(n[2], kr);
  return i.forEach(function(s) {
    e[s].forEach(function(f) {
      var c = tr(f.meta[1][0].data);
      c == 6e3 && a.sheets.push(I_(e, f));
    });
  }), a;
}
function D_(e, t) {
  var r = p0(), n = We(t.data), a = u0(n[1], kr);
  if (a.forEach(function(i) {
    e[i].forEach(function(s) {
      var f = tr(s.meta[1][0].data);
      if (f == 2) {
        var c = B_(e, s);
        c.sheets.forEach(function(o, l) {
          v0(r, o, l == 0 ? c.name : c.name + "_" + l, !0);
        });
      }
    });
  }), r.SheetNames.length == 0)
    throw new Error("Empty NUMBERS file");
  return r;
}
function os(e) {
  var t, r, n, a, i = {}, s = [];
  if (e.FullPaths.forEach(function(c) {
    if (c.match(/\.iwpv2/))
      throw new Error("Unsupported password protection");
  }), e.FileIndex.forEach(function(c) {
    if (c.name.match(/\.iwa$/)) {
      var o;
      try {
        o = it(c.content);
      } catch (h) {
        return console.log("?? " + c.content.length + " " + (h.message || h));
      }
      var l;
      try {
        l = at(o);
      } catch (h) {
        return console.log("## " + (h.message || h));
      }
      l.forEach(function(h) {
        i[h.id] = h.messages, s.push(h.id);
      });
    }
  }), !s.length)
    throw new Error("File has no messages");
  var f = ((a = (n = (r = (t = i == null ? void 0 : i[1]) == null ? void 0 : t[0]) == null ? void 0 : r.meta) == null ? void 0 : n[1]) == null ? void 0 : a[0].data) && tr(i[1][0].meta[1][0].data) == 1 && i[1][0];
  if (f || s.forEach(function(c) {
    i[c].forEach(function(o) {
      var l = tr(o.meta[1][0].data) >>> 0;
      if (l == 1)
        if (!f)
          f = o;
        else
          throw new Error("Document has multiple roots");
    });
  }), !f)
    throw new Error("Cannot find Document root");
  return D_(i, f);
}
function R_(e, t, r) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && tr(e[8][0].data) > 0 || !1;
  if (f)
    throw "Math only works with normal offsets";
  for (var c = 0, o = kn(e[7][0].data), l = 0, h = [], u = kn(e[4][0].data), x = 0, g = [], d = 0; d < t.length; ++d) {
    if (t[d] == null) {
      o.setUint16(d * 2, 65535, !0), u.setUint16(d * 2, 65535);
      continue;
    }
    o.setUint16(d * 2, l, !0), u.setUint16(d * 2, x, !0);
    var m, w;
    switch (typeof t[d]) {
      case "string":
        m = fs({ t: "s", v: t[d] }, r), w = cs({ t: "s", v: t[d] }, r);
        break;
      case "number":
        m = fs({ t: "n", v: t[d] }, r), w = cs({ t: "n", v: t[d] }, r);
        break;
      case "boolean":
        m = fs({ t: "b", v: t[d] }, r), w = cs({ t: "b", v: t[d] }, r);
        break;
      default:
        throw new Error("Unsupported value " + t[d]);
    }
    h.push(m), l += m.length, g.push(w), x += w.length, ++c;
  }
  for (e[2][0].data = He(c); d < e[7][0].data.length / 2; ++d)
    o.setUint16(d * 2, 65535, !0), u.setUint16(d * 2, 65535, !0);
  return e[6][0].data = nn(h), e[3][0].data = nn(g), c;
}
function L_(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var r = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = Hr(r["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat(Ae(n)));
  var i = Ii(r, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(P) {
    return P.forEach(function(R) {
      typeof R == "string" && s.push(R);
    });
  });
  var f = {}, c = [], o = ve.read(t.numbers, { type: "base64" });
  o.FileIndex.map(function(P, R) {
    return [P, o.FullPaths[R]];
  }).forEach(function(P) {
    var R = P[0], L = P[1];
    if (R.type == 2 && R.name.match(/\.iwa/)) {
      var Q = R.content, fe = it(Q), ce = at(fe);
      ce.forEach(function(ie) {
        c.push(ie.id), f[ie.id] = { deps: [], location: L, type: tr(ie.messages[0].meta[1][0].data) };
      });
    }
  }), c.sort(function(P, R) {
    return P - R;
  });
  var l = c.filter(function(P) {
    return P > 1;
  }).map(function(P) {
    return [P, He(P)];
  });
  o.FileIndex.map(function(P, R) {
    return [P, o.FullPaths[R]];
  }).forEach(function(P) {
    var R = P[0];
    if (P[1], !!R.name.match(/\.iwa/)) {
      var L = at(it(R.content));
      L.forEach(function(Q) {
        Q.messages.forEach(function(fe) {
          l.forEach(function(ce) {
            Q.messages.some(function(ie) {
              return tr(ie.meta[1][0].data) != 11006 && y_(ie.data, ce[1]);
            }) && f[ce[0]].deps.push(Q.id);
          });
        });
      });
    }
  });
  for (var h = ve.find(o, f[1].location), u = at(it(h.content)), x, g = 0; g < u.length; ++g) {
    var d = u[g];
    d.id == 1 && (x = d);
  }
  var m = kr(We(x.messages[0].data)[1][0].data);
  for (h = ve.find(o, f[m].location), u = at(it(h.content)), g = 0; g < u.length; ++g)
    d = u[g], d.id == m && (x = d);
  for (m = kr(We(x.messages[0].data)[2][0].data), h = ve.find(o, f[m].location), u = at(it(h.content)), g = 0; g < u.length; ++g)
    d = u[g], d.id == m && (x = d);
  for (m = kr(We(x.messages[0].data)[2][0].data), h = ve.find(o, f[m].location), u = at(it(h.content)), g = 0; g < u.length; ++g)
    d = u[g], d.id == m && (x = d);
  var w = We(x.messages[0].data);
  {
    w[6][0].data = He(n.e.r + 1), w[7][0].data = He(n.e.c + 1);
    var y = kr(w[46][0].data), v = ve.find(o, f[y].location), I = at(it(v.content));
    {
      for (var T = 0; T < I.length && I[T].id != y; ++T)
        ;
      if (I[T].id != y)
        throw "Bad ColumnRowUIDMapArchive";
      var N = We(I[T].messages[0].data);
      N[1] = [], N[2] = [], N[3] = [];
      for (var k = 0; k <= n.e.c; ++k) {
        var U = [];
        U[1] = U[2] = [{ type: 0, data: He(k + 420690) }], N[1].push({ type: 2, data: wr(U) }), N[2].push({ type: 0, data: He(k) }), N[3].push({ type: 0, data: He(k) });
      }
      N[4] = [], N[5] = [], N[6] = [];
      for (var C = 0; C <= n.e.r; ++C)
        U = [], U[1] = U[2] = [{ type: 0, data: He(C + 726270) }], N[4].push({ type: 2, data: wr(U) }), N[5].push({ type: 0, data: He(C) }), N[6].push({ type: 0, data: He(C) });
      I[T].messages[0].data = wr(N);
    }
    v.content = Rn(Dn(I)), v.size = v.content.length, delete w[46];
    var D = We(w[4][0].data);
    {
      D[7][0].data = He(n.e.r + 1);
      var M = We(D[1][0].data), B = kr(M[2][0].data);
      v = ve.find(o, f[B].location), I = at(it(v.content));
      {
        if (I[0].id != B)
          throw "Bad HeaderStorageBucket";
        var Y = We(I[0].messages[0].data);
        for (C = 0; C < i.length; ++C) {
          var he = We(Y[2][0].data);
          he[1][0].data = He(C), he[4][0].data = He(i[C].length), Y[2][C] = { type: Y[2][0].type, data: wr(he) };
        }
        I[0].messages[0].data = wr(Y);
      }
      v.content = Rn(Dn(I)), v.size = v.content.length;
      var W = kr(D[2][0].data);
      v = ve.find(o, f[W].location), I = at(it(v.content));
      {
        if (I[0].id != W)
          throw "Bad HeaderStorageBucket";
        for (Y = We(I[0].messages[0].data), k = 0; k <= n.e.c; ++k)
          he = We(Y[2][0].data), he[1][0].data = He(k), he[4][0].data = He(n.e.r + 1), Y[2][k] = { type: Y[2][0].type, data: wr(he) };
        I[0].messages[0].data = wr(Y);
      }
      v.content = Rn(Dn(I)), v.size = v.content.length;
      var ee = kr(D[4][0].data);
      (function() {
        for (var P = ve.find(o, f[ee].location), R = at(it(P.content)), L, Q = 0; Q < R.length; ++Q) {
          var fe = R[Q];
          fe.id == ee && (L = fe);
        }
        var ce = We(L.messages[0].data);
        {
          ce[3] = [];
          var ie = [];
          s.forEach(function(b, Xe) {
            ie[1] = [{ type: 0, data: He(Xe) }], ie[2] = [{ type: 0, data: He(1) }], ie[3] = [{ type: 2, data: E_(b) }], ce[3].push({ type: 2, data: wr(ie) });
          });
        }
        L.messages[0].data = wr(ce);
        var te = Dn(R), be = Rn(te);
        P.content = be, P.size = P.content.length;
      })();
      var ne = We(D[3][0].data);
      {
        var De = ne[1][0];
        delete ne[2];
        var H = We(De.data);
        {
          var _e = kr(H[2][0].data);
          (function() {
            for (var P = ve.find(o, f[_e].location), R = at(it(P.content)), L, Q = 0; Q < R.length; ++Q) {
              var fe = R[Q];
              fe.id == _e && (L = fe);
            }
            var ce = We(L.messages[0].data);
            {
              delete ce[6], delete ne[7];
              var ie = new Uint8Array(ce[5][0].data);
              ce[5] = [];
              for (var te = 0, be = 0; be <= n.e.r; ++be) {
                var b = We(ie);
                te += R_(b, i[be], s), b[1][0].data = He(be), ce[5].push({ data: wr(b), type: 2 });
              }
              ce[1] = [{ type: 0, data: He(n.e.c + 1) }], ce[2] = [{ type: 0, data: He(n.e.r + 1) }], ce[3] = [{ type: 0, data: He(te) }], ce[4] = [{ type: 0, data: He(n.e.r + 1) }];
            }
            L.messages[0].data = wr(ce);
            var Xe = Dn(R), Re = Rn(Xe);
            P.content = Re, P.size = P.content.length;
          })();
        }
        De.data = wr(H);
      }
      D[3][0].data = wr(ne);
    }
    w[4][0].data = wr(D);
  }
  x.messages[0].data = wr(w);
  var Se = Dn(u), O = Rn(Se);
  return h.content = O, h.size = h.content.length, o;
}
function ll(e) {
  return function(r) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      r[a[0]] === void 0 && (r[a[0]] = a[1]), a[2] === "n" && (r[a[0]] = Number(r[a[0]]));
    }
  };
}
function x0(e) {
  ll([
    ["cellNF", !1],
    /* emit cell number format string as .z */
    ["cellHTML", !0],
    /* emit html string as .h */
    ["cellFormula", !0],
    /* emit formulae as .f */
    ["cellStyles", !1],
    /* emits style/theme as .s */
    ["cellText", !0],
    /* emit formatted text as .w */
    ["cellDates", !1],
    /* emit date cells with type `d` */
    ["sheetStubs", !1],
    /* emit empty cells */
    ["sheetRows", 0, "n"],
    /* read n rows (0 = read all rows) */
    ["bookDeps", !1],
    /* parse calculation chains */
    ["bookSheets", !1],
    /* only try to get sheet names (no Sheets) */
    ["bookProps", !1],
    /* only try to get properties (no Sheets) */
    ["bookFiles", !1],
    /* include raw file structure (keys, files, cfb) */
    ["bookVBA", !1],
    /* include vba raw data (vbaraw) */
    ["password", ""],
    /* password */
    ["WTF", !1]
    /* WTF mode (throws errors) */
  ])(e);
}
function d0(e) {
  ll([
    ["cellDates", !1],
    /* write date cells with type `d` */
    ["bookSST", !1],
    /* Generate Shared String Table */
    ["bookType", "xlsx"],
    /* Type of workbook (xlsx/m/b) */
    ["compression", !1],
    /* Use file compression */
    ["WTF", !1]
    /* WTF mode (throws errors) */
  ])(e);
}
function P_(e) {
  return Ie.WS.indexOf(e) > -1 ? "sheet" : e == Ie.CS ? "chart" : e == Ie.DS ? "dialog" : e == Ie.MS ? "macro" : e && e.length ? e : "sheet";
}
function M_(e, t) {
  if (!e) return 0;
  try {
    e = t.map(function(n) {
      return n.id || (n.id = n.strRelID), [n.name, e["!id"][n.id].Target, P_(e["!id"][n.id].Type)];
    });
  } catch {
    return null;
  }
  return !e || e.length === 0 ? null : e;
}
function U_(e, t, r, n, a, i, s, f, c, o, l, h) {
  try {
    i[n] = ka(Kr(e, r, !0), t);
    var u = hr(e, t), x;
    switch (f) {
      case "sheet":
        x = fw(u, t, a, c, i[n], o, l, h);
        break;
      case "chart":
        if (x = cw(u, t, a, c, i[n], o, l, h), !x || !x["!drawel"]) break;
        var g = _a(x["!drawel"].Target, t), d = Ma(g), m = Yg(Kr(e, g, !0), ka(Kr(e, d, !0), g)), w = _a(m, g), y = Ma(w);
        x = Rv(Kr(e, w, !0), w, c, ka(Kr(e, y, !0), w), o, x);
        break;
      case "macro":
        x = ow(u, t, a, c, i[n], o, l, h);
        break;
      case "dialog":
        x = lw(u, t, a, c, i[n], o, l, h);
        break;
      default:
        throw new Error("Unrecognized sheet type " + f);
    }
    s[n] = x;
    var v = [];
    i && i[n] && nr(i[n]).forEach(function(I) {
      var T = "";
      if (i[n][I].Type == Ie.CMNT) {
        T = _a(i[n][I].Target, t);
        var N = dw(hr(e, T, !0), T, c);
        if (!N || !N.length) return;
        Sf(x, N, !1);
      }
      i[n][I].Type == Ie.TCMNT && (T = _a(i[n][I].Target, t), v = v.concat(Jg(hr(e, T, !0), c)));
    }), v && v.length && Sf(x, v, !0, c.people || []);
  } catch (I) {
    if (c.WTF) throw I;
  }
}
function tt(e) {
  return e.charAt(0) == "/" ? e.slice(1) : e;
}
function W_(e, t) {
  if (ta(), t = t || {}, x0(t), ft(e, "META-INF/manifest.xml") || ft(e, "objectdata.xml")) return Rf(e, t);
  if (ft(e, "Index/Document.iwa")) {
    if (typeof Uint8Array > "u") throw new Error("NUMBERS file parsing requires Uint8Array support");
    if (typeof os < "u") {
      if (e.FileIndex) return os(e);
      var r = ve.utils.cfb_new();
      return z0(e).forEach(function(he) {
        Fe(r, he, qh(e, he));
      }), os(r);
    }
    throw new Error("Unsupported NUMBERS file");
  }
  if (!ft(e, "[Content_Types].xml"))
    throw ft(e, "index.xml.gz") ? new Error("Unsupported NUMBERS 08 file") : ft(e, "index.xml") ? new Error("Unsupported NUMBERS 09 file") : new Error("Unsupported ZIP file");
  var n = z0(e), a = zu(Kr(e, "[Content_Types].xml")), i = !1, s, f;
  if (a.workbooks.length === 0 && (f = "xl/workbook.xml", hr(e, f, !0) && a.workbooks.push(f)), a.workbooks.length === 0) {
    if (f = "xl/workbook.bin", !hr(e, f, !0)) throw new Error("Could not find workbook");
    a.workbooks.push(f), i = !0;
  }
  a.workbooks[0].slice(-3) == "bin" && (i = !0);
  var c = {}, o = {};
  if (!t.bookSheets && !t.bookProps) {
    if (Aa = [], a.sst) try {
      Aa = xw(hr(e, tt(a.sst)), a.sst, t);
    } catch (he) {
      if (t.WTF) throw he;
    }
    t.cellStyles && a.themes.length && (c = uw(Kr(e, a.themes[0].replace(/^\//, ""), !0) || "", a.themes[0], t)), a.style && (o = hw(hr(e, tt(a.style)), a.style, c, t));
  }
  a.links.map(function(he) {
    try {
      var W = ka(Kr(e, Ma(tt(he))), he);
      return mw(hr(e, tt(he)), W, he, t);
    } catch {
    }
  });
  var l = sw(hr(e, tt(a.workbooks[0])), a.workbooks[0], t), h = {}, u = "";
  a.coreprops.length && (u = hr(e, tt(a.coreprops[0]), !0), u && (h = qc(u)), a.extprops.length !== 0 && (u = hr(e, tt(a.extprops[0]), !0), u && qu(u, h, t)));
  var x = {};
  (!t.bookSheets || t.bookProps) && a.custprops.length !== 0 && (u = Kr(e, tt(a.custprops[0]), !0), u && (x = Qu(u, t)));
  var g = {};
  if ((t.bookSheets || t.bookProps) && (l.Sheets ? s = l.Sheets.map(function(W) {
    return W.name;
  }) : h.Worksheets && h.SheetNames.length > 0 && (s = h.SheetNames), t.bookProps && (g.Props = h, g.Custprops = x), t.bookSheets && typeof s < "u" && (g.SheetNames = s), t.bookSheets ? g.SheetNames : t.bookProps))
    return g;
  s = {};
  var d = {};
  t.bookDeps && a.calcchain && (d = gw(hr(e, tt(a.calcchain)), a.calcchain));
  var m = 0, w = {}, y, v;
  {
    var I = l.Sheets;
    h.Worksheets = I.length, h.SheetNames = [];
    for (var T = 0; T != I.length; ++T)
      h.SheetNames[T] = I[T].name;
  }
  var N = i ? "bin" : "xml", k = a.workbooks[0].lastIndexOf("/"), U = (a.workbooks[0].slice(0, k + 1) + "_rels/" + a.workbooks[0].slice(k + 1) + ".rels").replace(/^\//, "");
  ft(e, U) || (U = "xl/_rels/workbook." + N + ".rels");
  var C = ka(Kr(e, U, !0), U.replace(/_rels.*/, "s5s"));
  (a.metadata || []).length >= 1 && (t.xlmeta = pw(hr(e, tt(a.metadata[0])), a.metadata[0], t)), (a.people || []).length >= 1 && (t.people = Zg(hr(e, tt(a.people[0])), t)), C && (C = M_(C, l.Sheets));
  var D = hr(e, "xl/worksheets/sheet.xml", !0) ? 1 : 0;
  e: for (m = 0; m != h.Worksheets; ++m) {
    var M = "sheet";
    if (C && C[m] ? (y = "xl/" + C[m][1].replace(/[\/]?xl\//, ""), ft(e, y) || (y = C[m][1]), ft(e, y) || (y = U.replace(/_rels\/.*$/, "") + C[m][1]), M = C[m][2]) : (y = "xl/worksheets/sheet" + (m + 1 - D) + "." + N, y = y.replace(/sheet0\./, "sheet.")), v = y.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels"), t && t.sheets != null) switch (typeof t.sheets) {
      case "number":
        if (m != t.sheets) continue e;
        break;
      case "string":
        if (h.SheetNames[m].toLowerCase() != t.sheets.toLowerCase()) continue e;
        break;
      default:
        if (Array.isArray && Array.isArray(t.sheets)) {
          for (var B = !1, Y = 0; Y != t.sheets.length; ++Y)
            typeof t.sheets[Y] == "number" && t.sheets[Y] == m && (B = 1), typeof t.sheets[Y] == "string" && t.sheets[Y].toLowerCase() == h.SheetNames[m].toLowerCase() && (B = 1);
          if (!B) continue e;
        }
    }
    U_(e, y, v, h.SheetNames[m], m, w, s, M, t, l, c, o);
  }
  return g = {
    Directory: a,
    Workbook: l,
    Props: h,
    Custprops: x,
    Deps: d,
    Sheets: s,
    SheetNames: h.SheetNames,
    Strings: Aa,
    Styles: o,
    Themes: c,
    SSF: Ke(Ee)
  }, t && t.bookFiles && (e.files ? (g.keys = n, g.files = e.files) : (g.keys = [], g.files = {}, e.FullPaths.forEach(function(he, W) {
    he = he.replace(/^Root Entry[\/]/, ""), g.keys.push(he), g.files[he] = e.FileIndex[W];
  }))), t && t.bookVBA && (a.vba.length > 0 ? g.vbaraw = hr(e, tt(a.vba[0]), !0) : a.defaults && a.defaults.bin === sm && (g.vbaraw = hr(e, "xl/vbaProject.bin", !0))), g;
}
function H_(e, t) {
  var r = t || {}, n = "Workbook", a = ve.find(e, n);
  try {
    if (n = "/!DataSpaces/Version", a = ve.find(e, n), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
    if (pd(a.content), n = "/!DataSpaces/DataSpaceMap", a = ve.find(e, n), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
    var i = wd(a.content);
    if (i.length !== 1 || i[0].comps.length !== 1 || i[0].comps[0].t !== 0 || i[0].name !== "StrongEncryptionDataSpace" || i[0].comps[0].v !== "EncryptedPackage")
      throw new Error("ECMA-376 Encrypted file bad " + n);
    if (n = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace", a = ve.find(e, n), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
    var s = _d(a.content);
    if (s.length != 1 || s[0] != "StrongEncryptionTransform")
      throw new Error("ECMA-376 Encrypted file bad " + n);
    if (n = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary", a = ve.find(e, n), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
    yd(a.content);
  } catch {
  }
  if (n = "/EncryptionInfo", a = ve.find(e, n), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
  var f = Td(a.content);
  if (n = "/EncryptedPackage", a = ve.find(e, n), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
  if (f[0] == 4 && typeof decrypt_agile < "u") return decrypt_agile(f[1], a.content, r.password || "", r);
  if (f[0] == 2 && typeof decrypt_std76 < "u") return decrypt_std76(f[1], a.content, r.password || "", r);
  throw new Error("File is password-protected");
}
function V_(e, t) {
  return t.bookType == "ods" ? ol(e, t) : t.bookType == "numbers" ? L_(e, t) : t.bookType == "xlsb" ? $_(e, t) : z_(e, t);
}
function $_(e, t) {
  Vn = 1024, e && !e.SSF && (e.SSF = Ke(Ee)), e && e.SSF && (ta(), Pi(e.SSF), t.revssf = Ui(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Fa ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = t.bookType == "xlsb" ? "bin" : "xml", n = Po.indexOf(t.bookType) > -1, a = Qs();
  d0(t = t || {});
  var i = Us(), s = "", f = 0;
  if (t.cellXfs = [], on(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", Fe(i, s, Zc(e.Props, t)), a.coreprops.push(s), Ve(t.rels, 2, s, Ie.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var c = [], o = 0; o < e.SheetNames.length; ++o)
      (e.Workbook.Sheets[o] || {}).Hidden != 2 && c.push(e.SheetNames[o]);
    e.Props.SheetNames = c;
  }
  for (e.Props.Worksheets = e.Props.SheetNames.length, Fe(i, s, ro(e.Props)), a.extprops.push(s), Ve(t.rels, 3, s, Ie.EXT_PROPS), e.Custprops !== e.Props && nr(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", Fe(i, s, to(e.Custprops)), a.custprops.push(s), Ve(t.rels, 4, s, Ie.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
    var l = { "!id": {} }, h = e.Sheets[e.SheetNames[f - 1]], u = (h || {})["!type"] || "sheet";
    switch (u) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, Fe(i, s, ww(f - 1, s, t, e, l)), a.sheets.push(s), Ve(t.wbrels, -1, "worksheets/sheet" + f + "." + r, Ie.WS[0]);
    }
    if (h) {
      var x = h["!comments"], g = !1, d = "";
      x && x.length > 0 && (d = "xl/comments" + f + "." + r, Fe(i, d, yw(x, d)), a.comments.push(d), Ve(l, -1, "../comments" + f + "." + r, Ie.CMNT), g = !0), h["!legacy"] && g && Fe(i, "xl/drawings/vmlDrawing" + f + ".vml", Ro(f, h["!comments"])), delete h["!comments"], delete h["!legacy"];
    }
    l["!id"].rId1 && Fe(i, Ma(s), Xn(l));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, Fe(i, s, Ew(t.Strings, s, t)), a.strs.push(s), Ve(t.wbrels, -1, "sharedStrings." + r, Ie.SST)), s = "xl/workbook." + r, Fe(i, s, vw(e, s)), a.workbooks.push(s), Ve(t.rels, 1, s, Ie.WB), s = "xl/theme/theme1.xml", Fe(i, s, i0(e.Themes, t)), a.themes.push(s), Ve(t.wbrels, -1, "theme/theme1.xml", Ie.THEME), s = "xl/styles." + r, Fe(i, s, _w(e, s, t)), a.styles.push(s), Ve(t.wbrels, -1, "styles." + r, Ie.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", Fe(i, s, e.vbaraw), a.vba.push(s), Ve(t.wbrels, -1, "vbaProject.bin", Ie.VBA)), s = "xl/metadata." + r, Fe(i, s, Tw(s)), a.metadata.push(s), Ve(t.wbrels, -1, "metadata." + r, Ie.XLMETA), Fe(i, "[Content_Types].xml", Kc(a, t)), Fe(i, "_rels/.rels", Xn(t.rels)), Fe(i, "xl/_rels/workbook." + r + ".rels", Xn(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function z_(e, t) {
  Vn = 1024, e && !e.SSF && (e.SSF = Ke(Ee)), e && e.SSF && (ta(), Pi(e.SSF), t.revssf = Ui(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Fa ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = "xml", n = Po.indexOf(t.bookType) > -1, a = Qs();
  d0(t = t || {});
  var i = Us(), s = "", f = 0;
  if (t.cellXfs = [], on(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", Fe(i, s, Zc(e.Props, t)), a.coreprops.push(s), Ve(t.rels, 2, s, Ie.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var c = [], o = 0; o < e.SheetNames.length; ++o)
      (e.Workbook.Sheets[o] || {}).Hidden != 2 && c.push(e.SheetNames[o]);
    e.Props.SheetNames = c;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, Fe(i, s, ro(e.Props)), a.extprops.push(s), Ve(t.rels, 3, s, Ie.EXT_PROPS), e.Custprops !== e.Props && nr(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", Fe(i, s, to(e.Custprops)), a.custprops.push(s), Ve(t.rels, 4, s, Ie.CUST_PROPS));
  var l = ["SheetJ5"];
  for (t.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
    var h = { "!id": {} }, u = e.Sheets[e.SheetNames[f - 1]], x = (u || {})["!type"] || "sheet";
    switch (x) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, Fe(i, s, Yo(f - 1, t, e, h)), a.sheets.push(s), Ve(t.wbrels, -1, "worksheets/sheet" + f + "." + r, Ie.WS[0]);
    }
    if (u) {
      var g = u["!comments"], d = !1, m = "";
      if (g && g.length > 0) {
        var w = !1;
        g.forEach(function(y) {
          y[1].forEach(function(v) {
            v.T == !0 && (w = !0);
          });
        }), w && (m = "xl/threadedComments/threadedComment" + f + "." + r, Fe(i, m, qg(g, l, t)), a.threadedcomments.push(m), Ve(h, -1, "../threadedComments/threadedComment" + f + "." + r, Ie.TCMNT)), m = "xl/comments" + f + "." + r, Fe(i, m, Lo(g)), a.comments.push(m), Ve(h, -1, "../comments" + f + "." + r, Ie.CMNT), d = !0;
      }
      u["!legacy"] && d && Fe(i, "xl/drawings/vmlDrawing" + f + ".vml", Ro(f, u["!comments"])), delete u["!comments"], delete u["!legacy"];
    }
    h["!id"].rId1 && Fe(i, Ma(s), Xn(h));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, Fe(i, s, To(t.Strings, t)), a.strs.push(s), Ve(t.wbrels, -1, "sharedStrings." + r, Ie.SST)), s = "xl/workbook." + r, Fe(i, s, Qo(e)), a.workbooks.push(s), Ve(t.rels, 1, s, Ie.WB), s = "xl/theme/theme1.xml", Fe(i, s, i0(e.Themes, t)), a.themes.push(s), Ve(t.wbrels, -1, "theme/theme1.xml", Ie.THEME), s = "xl/styles." + r, Fe(i, s, No(e, t)), a.styles.push(s), Ve(t.wbrels, -1, "styles." + r, Ie.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", Fe(i, s, e.vbaraw), a.vba.push(s), Ve(t.wbrels, -1, "vbaProject.bin", Ie.VBA)), s = "xl/metadata." + r, Fe(i, s, Do()), a.metadata.push(s), Ve(t.wbrels, -1, "metadata." + r, Ie.XLMETA), l.length > 1 && (s = "xl/persons/person.xml", Fe(i, s, Qg(l)), a.people.push(s), Ve(t.wbrels, -1, "persons/person.xml", Ie.PEOPLE)), Fe(i, "[Content_Types].xml", Kc(a, t)), Fe(i, "_rels/.rels", Xn(t.rels)), Fe(i, "xl/_rels/workbook." + r + ".rels", Xn(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function g0(e, t) {
  var r = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      r = Jr(e.slice(0, 12));
      break;
    case "binary":
      r = e;
      break;
    case "array":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    default:
      throw new Error("Unrecognized type " + (t && t.type || "undefined"));
  }
  return [r.charCodeAt(0), r.charCodeAt(1), r.charCodeAt(2), r.charCodeAt(3), r.charCodeAt(4), r.charCodeAt(5), r.charCodeAt(6), r.charCodeAt(7)];
}
function G_(e, t) {
  return ve.find(e, "EncryptedPackage") ? H_(e, t) : nl(e, t);
}
function X_(e, t) {
  var r, n = e, a = t || {};
  return a.type || (a.type = Ce && Buffer.isBuffer(e) ? "buffer" : "base64"), r = Sc(n, a), W_(r, a);
}
function hl(e, t) {
  var r = 0;
  e: for (; r < e.length; ) switch (e.charCodeAt(r)) {
    case 10:
    case 13:
    case 32:
      ++r;
      break;
    case 60:
      return As(e.slice(r), t);
    default:
      break e;
  }
  return qn.to_workbook(e, t);
}
function j_(e, t) {
  var r = "", n = g0(e, t);
  switch (t.type) {
    case "base64":
      r = Jr(e);
      break;
    case "binary":
      r = e;
      break;
    case "buffer":
      r = e.toString("binary");
      break;
    case "array":
      r = En(e);
      break;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return n[0] == 239 && n[1] == 187 && n[2] == 191 && (r = ze(r)), t.type = "binary", hl(r, t);
}
function Y_(e, t) {
  var r = e;
  return t.type == "base64" && (r = Jr(r)), r = Ia.utils.decode(1200, r.slice(2), "str"), t.type = "binary", hl(r, t);
}
function K_(e) {
  return e.match(/[^\x00-\x7F]/) ? At(e) : e;
}
function ls(e, t, r, n) {
  return n ? (r.type = "string", qn.to_workbook(e, r)) : qn.to_workbook(t, r);
}
function Cs(e, t) {
  Ds();
  var r = t || {};
  if (typeof ArrayBuffer < "u" && e instanceof ArrayBuffer) return Cs(new Uint8Array(e), (r = Ke(r), r.type = "array", r));
  typeof Uint8Array < "u" && e instanceof Uint8Array && !r.type && (r.type = typeof Deno < "u" ? "buffer" : "array");
  var n = e, a = [0, 0, 0, 0], i = !1;
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), Yn = {}, r.dateNF && (Yn.dateNF = r.dateNF), r.type || (r.type = Ce && Buffer.isBuffer(e) ? "buffer" : "base64"), r.type == "file" && (r.type = Ce ? "buffer" : "binary", n = $h(e), typeof Uint8Array < "u" && !Ce && (r.type = "array")), r.type == "string" && (i = !0, r.type = "binary", r.codepage = 65001, n = K_(e)), r.type == "array" && typeof Uint8Array < "u" && e instanceof Uint8Array && typeof ArrayBuffer < "u") {
    var s = new ArrayBuffer(3), f = new Uint8Array(s);
    if (f.foo = "bar", !f.foo)
      return r = Ke(r), r.type = "array", Cs(Rs(n), r);
  }
  switch ((a = g0(n, r))[0]) {
    case 208:
      if (a[1] === 207 && a[2] === 17 && a[3] === 224 && a[4] === 161 && a[5] === 177 && a[6] === 26 && a[7] === 225) return G_(ve.read(n, r), r);
      break;
    case 9:
      if (a[1] <= 8) return nl(n, r);
      break;
    case 60:
      return As(n, r);
    case 73:
      if (a[1] === 73 && a[2] === 42 && a[3] === 0) throw new Error("TIFF Image File is not a spreadsheet");
      if (a[1] === 68) return ed(n, r);
      break;
    case 84:
      if (a[1] === 65 && a[2] === 66 && a[3] === 76) return Eo.to_workbook(n, r);
      break;
    case 80:
      return a[1] === 75 && a[2] < 9 && a[3] < 9 ? X_(n, r) : ls(e, n, r, i);
    case 239:
      return a[3] === 60 ? As(n, r) : ls(e, n, r, i);
    case 255:
      if (a[1] === 254)
        return Y_(n, r);
      if (a[1] === 0 && a[2] === 2 && a[3] === 0) return vn.to_workbook(n, r);
      break;
    case 0:
      if (a[1] === 0 && (a[2] >= 2 && a[3] === 0 || a[2] === 0 && (a[3] === 8 || a[3] === 9)))
        return vn.to_workbook(n, r);
      break;
    case 3:
    case 131:
    case 139:
    case 140:
      return ks.to_workbook(n, r);
    case 123:
      if (a[1] === 92 && a[2] === 114 && a[3] === 116) return bo.to_workbook(n, r);
      break;
    case 10:
    case 13:
    case 32:
      return j_(n, r);
    case 137:
      if (a[1] === 80 && a[2] === 78 && a[3] === 71) throw new Error("PNG Image File is not a spreadsheet");
      break;
  }
  return Qx.indexOf(a[0]) > -1 && a[2] <= 12 && a[3] <= 31 ? ks.to_workbook(n, r) : ls(e, n, r, i);
}
function J_(e, t) {
  var r = {};
  return r.type = "file", Cs(e, r);
}
function ul(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return ja(t.file, ve.write(e, { type: Ce ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return ve.write(e, t);
}
function q_(e, t) {
  var r = Ke(t || {}), n = V_(e, r);
  return Z_(n, r);
}
function Z_(e, t) {
  var r = {}, n = Ce ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
  if (t.compression && (r.compression = "DEFLATE"), t.password) r.type = n;
  else switch (t.type) {
    case "base64":
      r.type = "base64";
      break;
    case "binary":
      r.type = "string";
      break;
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    case "buffer":
    case "file":
      r.type = n;
      break;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  var a = e.FullPaths ? ve.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[r.type] || r.type
  ), compression: !!t.compression }) : e.generate(r);
  if (typeof Deno < "u" && typeof a == "string") {
    if (t.type == "binary" || t.type == "base64") return a;
    a = new Uint8Array(Li(a));
  }
  return t.password && typeof encrypt_agile < "u" ? ul(encrypt_agile(a, t.password), t) : t.type === "file" ? ja(t.file, a) : t.type == "string" ? ze(
    /*::(*/
    a
    /*:: :any)*/
  ) : a;
}
function Q_(e, t) {
  var r = t || {}, n = Kw(e, r);
  return ul(n, r);
}
function kt(e, t, r) {
  r || (r = "");
  var n = r + e;
  switch (t.type) {
    case "base64":
      return Ba(At(n));
    case "binary":
      return At(n);
    case "string":
      return e;
    case "file":
      return ja(t.file, n, "utf8");
    case "buffer":
      return Ce ? Ht(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : kt(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function eE(e, t) {
  switch (t.type) {
    case "base64":
      return Ba(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return ja(t.file, e, "binary");
    case "buffer":
      return Ce ? Ht(e, "binary") : e.split("").map(function(r) {
        return r.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function mi(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var r = "", n = 0; n < e.length; ++n) r += String.fromCharCode(e[n]);
      return t.type == "base64" ? Ba(r) : t.type == "string" ? ze(r) : r;
    case "file":
      return ja(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function xl(e, t) {
  Ds(), Gv(e);
  var r = Ke(t || {});
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), r.type == "array") {
    r.type = "binary";
    var n = xl(e, r);
    return r.type = "array", Li(n);
  }
  var a = 0;
  if (r.sheet && (typeof r.sheet == "number" ? a = r.sheet : a = e.SheetNames.indexOf(r.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
  switch (r.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return kt(Vw(e, r), r);
    case "slk":
    case "sylk":
      return kt(_o.from_sheet(e.Sheets[e.SheetNames[a]]), r);
    case "htm":
    case "html":
      return kt(il(e.Sheets[e.SheetNames[a]], r), r);
    case "txt":
      return eE(dl(e.Sheets[e.SheetNames[a]], r), r);
    case "csv":
      return kt(m0(e.Sheets[e.SheetNames[a]], r), r, "\uFEFF");
    case "dif":
      return kt(Eo.from_sheet(e.Sheets[e.SheetNames[a]]), r);
    case "dbf":
      return mi(ks.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "prn":
      return kt(qn.from_sheet(e.Sheets[e.SheetNames[a]]), r);
    case "rtf":
      return kt(bo.from_sheet(e.Sheets[e.SheetNames[a]]), r);
    case "eth":
      return kt(yo.from_sheet(e.Sheets[e.SheetNames[a]]), r);
    case "fods":
      return kt(ol(e, r), r);
    case "wk1":
      return mi(vn.sheet_to_wk1(e.Sheets[e.SheetNames[a]], r), r);
    case "wk3":
      return mi(vn.book_to_wk3(e, r), r);
    case "biff2":
      r.biff || (r.biff = 2);
    case "biff3":
      r.biff || (r.biff = 3);
    case "biff4":
      return r.biff || (r.biff = 4), mi(al(e, r), r);
    case "biff5":
      r.biff || (r.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return r.biff || (r.biff = 8), Q_(e, r);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return q_(e, r);
    default:
      throw new Error("Unrecognized bookType |" + r.bookType + "|");
  }
}
function rE(e) {
  if (!e.bookType) {
    var t = {
      xls: "biff8",
      htm: "html",
      slk: "sylk",
      socialcalc: "eth",
      Sh33tJS: "WTF"
    }, r = e.file.slice(e.file.lastIndexOf(".")).toLowerCase();
    r.match(/^\.[a-z]+$/) && (e.bookType = r.slice(1)), e.bookType = t[e.bookType] || e.bookType;
  }
}
function tE(e, t, r) {
  var n = {};
  return n.type = "file", n.file = t, rE(n), xl(e, n);
}
function nE(e, t, r, n, a, i, s, f) {
  var c = cr(r), o = f.defval, l = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"), h = !0, u = a === 1 ? [] : {};
  if (a !== 1)
    if (Object.defineProperty) try {
      Object.defineProperty(u, "__rowNum__", { value: r, enumerable: !1 });
    } catch {
      u.__rowNum__ = r;
    }
    else u.__rowNum__ = r;
  if (!s || e[r]) for (var x = t.s.c; x <= t.e.c; ++x) {
    var g = s ? e[r][x] : e[n[x] + c];
    if (g === void 0 || g.t === void 0) {
      if (o === void 0) continue;
      i[x] != null && (u[i[x]] = o);
      continue;
    }
    var d = g.v;
    switch (g.t) {
      case "z":
        if (d == null) break;
        continue;
      case "e":
        d = d == 0 ? null : void 0;
        break;
      case "s":
      case "d":
      case "b":
      case "n":
        break;
      default:
        throw new Error("unrecognized type " + g.t);
    }
    if (i[x] != null) {
      if (d == null)
        if (g.t == "e" && d === null) u[i[x]] = null;
        else if (o !== void 0) u[i[x]] = o;
        else if (l && d === null) u[i[x]] = null;
        else continue;
      else
        u[i[x]] = l && (g.t !== "n" || g.t === "n" && f.rawNumbers !== !1) ? d : Ut(g, d, f);
      d != null && (h = !1);
    }
  }
  return { row: u, isempty: h };
}
function Ii(e, t) {
  if (e == null || e["!ref"] == null) return [];
  var r = { t: "n", v: 0 }, n = 0, a = 1, i = [], s = 0, f = "", c = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, o = t || {}, l = o.range != null ? o.range : e["!ref"];
  switch (o.header === 1 ? n = 1 : o.header === "A" ? n = 2 : Array.isArray(o.header) ? n = 3 : o.header == null && (n = 0), typeof l) {
    case "string":
      c = Me(l);
      break;
    case "number":
      c = Me(e["!ref"]), c.s.r = l;
      break;
    default:
      c = l;
  }
  n > 0 && (a = 0);
  var h = cr(c.s.r), u = [], x = [], g = 0, d = 0, m = Array.isArray(e), w = c.s.r, y = 0, v = {};
  m && !e[w] && (e[w] = []);
  var I = o.skipHidden && e["!cols"] || [], T = o.skipHidden && e["!rows"] || [];
  for (y = c.s.c; y <= c.e.c; ++y)
    if (!(I[y] || {}).hidden)
      switch (u[y] = Qe(y), r = m ? e[w][y] : e[u[y] + h], n) {
        case 1:
          i[y] = y - c.s.c;
          break;
        case 2:
          i[y] = u[y];
          break;
        case 3:
          i[y] = o.header[y - c.s.c];
          break;
        default:
          if (r == null && (r = { w: "__EMPTY", t: "s" }), f = s = Ut(r, null, o), d = v[s] || 0, !d) v[s] = 1;
          else {
            do
              f = s + "_" + d++;
            while (v[f]);
            v[s] = d, v[f] = 1;
          }
          i[y] = f;
      }
  for (w = c.s.r + a; w <= c.e.r; ++w)
    if (!(T[w] || {}).hidden) {
      var N = nE(e, c, w, u, n, i, m, o);
      (N.isempty === !1 || (n === 1 ? o.blankrows !== !1 : o.blankrows)) && (x[g++] = N.row);
    }
  return x.length = g, x;
}
var Wf = /"/g;
function aE(e, t, r, n, a, i, s, f) {
  for (var c = !0, o = [], l = "", h = cr(r), u = t.s.c; u <= t.e.c; ++u)
    if (n[u]) {
      var x = f.dense ? (e[r] || [])[u] : e[n[u] + h];
      if (x == null) l = "";
      else if (x.v != null) {
        c = !1, l = "" + (f.rawNumbers && x.t == "n" ? x.v : Ut(x, null, f));
        for (var g = 0, d = 0; g !== l.length; ++g) if ((d = l.charCodeAt(g)) === a || d === i || d === 34 || f.forceQuotes) {
          l = '"' + l.replace(Wf, '""') + '"';
          break;
        }
        l == "ID" && (l = '"ID"');
      } else x.f != null && !x.F ? (c = !1, l = "=" + x.f, l.indexOf(",") >= 0 && (l = '"' + l.replace(Wf, '""') + '"')) : l = "";
      o.push(l);
    }
  return f.blankrows === !1 && c ? null : o.join(s);
}
function m0(e, t) {
  var r = [], n = t ?? {};
  if (e == null || e["!ref"] == null) return "";
  var a = Me(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), f = n.RS !== void 0 ? n.RS : `
`, c = f.charCodeAt(0), o = new RegExp((i == "|" ? "\\|" : i) + "+$"), l = "", h = [];
  n.dense = Array.isArray(e);
  for (var u = n.skipHidden && e["!cols"] || [], x = n.skipHidden && e["!rows"] || [], g = a.s.c; g <= a.e.c; ++g) (u[g] || {}).hidden || (h[g] = Qe(g));
  for (var d = 0, m = a.s.r; m <= a.e.r; ++m)
    (x[m] || {}).hidden || (l = aE(e, a, m, h, s, c, i, n), l != null && (n.strip && (l = l.replace(o, "")), (l || n.blankrows !== !1) && r.push((d++ ? f : "") + l)));
  return delete n.dense, r.join("");
}
function dl(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var r = m0(e, t);
  return r;
}
function iE(e) {
  var t = "", r, n = "";
  if (e == null || e["!ref"] == null) return [];
  var a = Me(e["!ref"]), i = "", s = [], f, c = [], o = Array.isArray(e);
  for (f = a.s.c; f <= a.e.c; ++f) s[f] = Qe(f);
  for (var l = a.s.r; l <= a.e.r; ++l)
    for (i = cr(l), f = a.s.c; f <= a.e.c; ++f)
      if (t = s[f] + i, r = o ? (e[l] || [])[f] : e[t], n = "", r !== void 0) {
        if (r.F != null) {
          if (t = r.F, !r.f) continue;
          n = r.f, t.indexOf(":") == -1 && (t = t + ":" + t);
        }
        if (r.f != null) n = r.f;
        else {
          if (r.t == "z") continue;
          if (r.t == "n" && r.v != null) n = "" + r.v;
          else if (r.t == "b") n = r.v ? "TRUE" : "FALSE";
          else if (r.w !== void 0) n = "'" + r.w;
          else {
            if (r.v === void 0) continue;
            r.t == "s" ? n = "'" + r.v : n = "" + r.v;
          }
        }
        c[c.length] = t + "=" + n;
      }
  return c;
}
function gl(e, t, r) {
  var n = r || {}, a = +!n.skipHeader, i = e || {}, s = 0, f = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number") s = n.origin;
    else {
      var c = typeof n.origin == "string" ? er(n.origin) : n.origin;
      s = c.r, f = c.c;
    }
  var o, l = { s: { c: 0, r: 0 }, e: { c: f, r: s + t.length - 1 + a } };
  if (i["!ref"]) {
    var h = Me(i["!ref"]);
    l.e.c = Math.max(l.e.c, h.e.c), l.e.r = Math.max(l.e.r, h.e.r), s == -1 && (s = h.e.r + 1, l.e.r = s + t.length - 1 + a);
  } else
    s == -1 && (s = 0, l.e.r = t.length - 1 + a);
  var u = n.header || [], x = 0;
  t.forEach(function(d, m) {
    nr(d).forEach(function(w) {
      (x = u.indexOf(w)) == -1 && (u[x = u.length] = w);
      var y = d[w], v = "z", I = "", T = ye({ c: f + x, r: s + m + a });
      o = Ga(i, T), y && typeof y == "object" && !(y instanceof Date) ? i[T] = y : (typeof y == "number" ? v = "n" : typeof y == "boolean" ? v = "b" : typeof y == "string" ? v = "s" : y instanceof Date ? (v = "d", n.cellDates || (v = "n", y = gr(y)), I = n.dateNF || Ee[14]) : y === null && n.nullError && (v = "e", y = 0), o ? (o.t = v, o.v = y, delete o.w, delete o.R, I && (o.z = I)) : i[T] = o = { t: v, v: y }, I && (o.z = I));
    });
  }), l.e.c = Math.max(l.e.c, f + u.length - 1);
  var g = cr(s);
  if (a) for (x = 0; x < u.length; ++x) i[Qe(x + f) + g] = { t: "s", v: u[x] };
  return i["!ref"] = Ae(l), i;
}
function sE(e, t) {
  return gl(null, e, t);
}
function Ga(e, t, r) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var n = er(t);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? Ga(e, ye(t)) : Ga(e, ye({ r: t, c: r || 0 }));
}
function fE(e, t) {
  if (typeof t == "number") {
    if (t >= 0 && e.SheetNames.length > t) return t;
    throw new Error("Cannot find sheet # " + t);
  } else if (typeof t == "string") {
    var r = e.SheetNames.indexOf(t);
    if (r > -1) return r;
    throw new Error("Cannot find sheet name |" + t + "|");
  } else throw new Error("Cannot find sheet |" + t + "|");
}
function p0() {
  return { SheetNames: [], Sheets: {} };
}
function v0(e, t, r, n) {
  var a = 1;
  if (!r) for (; a <= 65535 && e.SheetNames.indexOf(r = "Sheet" + a) != -1; ++a, r = void 0) ;
  if (!r || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (n && e.SheetNames.indexOf(r) >= 0) {
    var i = r.match(/(^.*?)(\d+)$/);
    a = i && +i[2] || 0;
    var s = i && i[1] || r;
    for (++a; a <= 65535 && e.SheetNames.indexOf(r = s + a) != -1; ++a) ;
  }
  if (Zo(r), e.SheetNames.indexOf(r) >= 0) throw new Error("Worksheet with name |" + r + "| already exists!");
  return e.SheetNames.push(r), e.Sheets[r] = t, r;
}
function cE(e, t, r) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = fE(e, t);
  switch (e.Workbook.Sheets[n] || (e.Workbook.Sheets[n] = {}), r) {
    case 0:
    case 1:
    case 2:
      break;
    default:
      throw new Error("Bad sheet visibility setting " + r);
  }
  e.Workbook.Sheets[n].Hidden = r;
}
function oE(e, t) {
  return e.z = t, e;
}
function ml(e, t, r) {
  return t ? (e.l = { Target: t }, r && (e.l.Tooltip = r)) : delete e.l, e;
}
function lE(e, t, r) {
  return ml(e, "#" + t, r);
}
function hE(e, t, r) {
  e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" });
}
function uE(e, t, r, n) {
  for (var a = typeof t != "string" ? t : Me(t), i = typeof t == "string" ? t : Ae(t), s = a.s.r; s <= a.e.r; ++s) for (var f = a.s.c; f <= a.e.c; ++f) {
    var c = Ga(e, s, f);
    c.t = "n", c.F = i, delete c.v, s == a.s.r && f == a.s.c && (c.f = r, n && (c.D = !0));
  }
  return e;
}
var pi = {
  encode_col: Qe,
  encode_row: cr,
  encode_cell: ye,
  encode_range: Ae,
  decode_col: js,
  decode_row: Xs,
  split_cell: Eu,
  decode_cell: er,
  decode_range: Hr,
  format_cell: Ut,
  sheet_add_aoa: Vc,
  sheet_add_json: gl,
  sheet_add_dom: sl,
  aoa_to_sheet: na,
  json_to_sheet: sE,
  table_to_sheet: fl,
  table_to_book: p_,
  sheet_to_csv: m0,
  sheet_to_txt: dl,
  sheet_to_json: Ii,
  sheet_to_html: il,
  sheet_to_formulae: iE,
  sheet_to_row_object_array: Ii,
  sheet_get_cell: Ga,
  book_new: p0,
  book_append_sheet: v0,
  book_set_sheet_visibility: cE,
  cell_set_number_format: oE,
  cell_set_hyperlink: ml,
  cell_set_internal_link: lE,
  cell_add_comment: hE,
  sheet_set_array_formula: uE,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
const xE = (() => {
  const e = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Uint8Array.prototype), Symbol.toStringTag).get;
  return (t) => e.call(t);
})();
function Qn(e) {
  return xE(e) === "Uint8Array";
}
function w0(e) {
  return typeof e == "object" && e != null && Symbol.toStringTag in e && (e[Symbol.toStringTag] === "ArrayBuffer" || e[Symbol.toStringTag] === "SharedArrayBuffer");
}
function Bi(e) {
  return e instanceof RegExp || Object.prototype.toString.call(e) === "[object RegExp]";
}
function Gi(e) {
  return typeof e == "object" && e != null && Symbol.toStringTag in e && e[Symbol.toStringTag] === "Map";
}
function Di(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function qr(e, t) {
  return JSON.stringify(e, (r, n) => typeof n == "bigint" ? { $numberLong: `${n}` } : Gi(n) ? Object.fromEntries(n) : n);
}
function dE(e) {
  if (e != null && typeof e == "object" && "stylize" in e && typeof e.stylize == "function")
    return e.stylize;
}
const ri = 7, Xi = Symbol.for("@@mdb.bson.version"), ti = 2147483647, ni = -2147483648, pl = Math.pow(2, 63) - 1, vl = -Math.pow(2, 63), wl = Math.pow(2, 53), _l = -Math.pow(2, 53), _0 = 1, El = 2, Oa = 3, Ea = 4, E0 = 5, gE = 6, yl = 7, Tl = 8, Sl = 9, y0 = 10, Ri = 11, mE = 12, T0 = 13, kl = 14, wi = 15, Xa = 16, Al = 17, S0 = 18, Fl = 19, bl = 255, Cl = 127, pE = 0, k0 = 4, vE = Object.freeze({
  double: 1,
  string: 2,
  object: 3,
  array: 4,
  binData: 5,
  undefined: 6,
  objectId: 7,
  bool: 8,
  date: 9,
  null: 10,
  regex: 11,
  dbPointer: 12,
  javascript: 13,
  symbol: 14,
  javascriptWithScope: 15,
  int: 16,
  timestamp: 17,
  long: 18,
  decimal: 19,
  minKey: -1,
  maxKey: 127
});
class J extends Error {
  get bsonError() {
    return !0;
  }
  get name() {
    return "BSONError";
  }
  constructor(t, r) {
    super(t, r);
  }
  static isBSONError(t) {
    return t != null && typeof t == "object" && "bsonError" in t && t.bsonError === !0 && "name" in t && "message" in t && "stack" in t;
  }
}
class ji extends J {
  get name() {
    return "BSONVersionError";
  }
  constructor() {
    super(`Unsupported BSON version, bson types must be from bson ${ri}.x.x`);
  }
}
class Os extends J {
  get name() {
    return "BSONRuntimeError";
  }
  constructor(t) {
    super(t);
  }
}
class Bt extends J {
  constructor(r, n, a) {
    super(`${r}. offset: ${n}`, a);
    ge(this, "offset");
    this.offset = n;
  }
  get name() {
    return "BSONOffsetError";
  }
}
let Hf, Vf;
function Ol(e, t, r, n) {
  if (n) {
    Hf ?? (Hf = new TextDecoder("utf8", { fatal: !0 }));
    try {
      return Hf.decode(e.subarray(t, r));
    } catch (a) {
      throw new J("Invalid UTF-8 string in BSON document", { cause: a });
    }
  }
  return Vf ?? (Vf = new TextDecoder("utf8", { fatal: !1 })), Vf.decode(e.subarray(t, r));
}
function Nl(e, t, r) {
  if (e.length === 0)
    return "";
  const n = r - t;
  if (n === 0)
    return "";
  if (n > 20)
    return null;
  if (n === 1 && e[t] < 128)
    return String.fromCharCode(e[t]);
  if (n === 2 && e[t] < 128 && e[t + 1] < 128)
    return String.fromCharCode(e[t]) + String.fromCharCode(e[t + 1]);
  if (n === 3 && e[t] < 128 && e[t + 1] < 128 && e[t + 2] < 128)
    return String.fromCharCode(e[t]) + String.fromCharCode(e[t + 1]) + String.fromCharCode(e[t + 2]);
  const a = [];
  for (let i = t; i < r; i++) {
    const s = e[i];
    if (s > 127)
      return null;
    a.push(s);
  }
  return String.fromCharCode(...a);
}
function wE(e, t, r) {
  if (t.length === 0)
    return 0;
  if (t.length > 25 || e.length - r < t.length)
    return null;
  for (let n = 0, a = r; n < t.length; n++, a++) {
    const i = t.charCodeAt(n);
    if (i > 127)
      return null;
    e[a] = i;
  }
  return t.length;
}
function _E(e) {
  return ct.fromNumberArray(Array.from({ length: e }, () => Math.floor(Math.random() * 256)));
}
function EE(e) {
  return crypto.getRandomValues(ct.allocate(e));
}
const yE = (() => {
  const { crypto: e } = globalThis;
  return e != null && typeof e.getRandomValues == "function" ? EE : _E;
})(), ct = {
  isUint8Array: Qn,
  toLocalBufferType(e) {
    if (Buffer.isBuffer(e))
      return e;
    if (ArrayBuffer.isView(e))
      return Buffer.from(e.buffer, e.byteOffset, e.byteLength);
    const t = (e == null ? void 0 : e[Symbol.toStringTag]) ?? Object.prototype.toString.call(e);
    if (t === "ArrayBuffer" || t === "SharedArrayBuffer" || t === "[object ArrayBuffer]" || t === "[object SharedArrayBuffer]")
      return Buffer.from(e);
    throw new J("Cannot create Buffer from the passed potentialBuffer.");
  },
  allocate(e) {
    return Buffer.alloc(e);
  },
  allocateUnsafe(e) {
    return Buffer.allocUnsafe(e);
  },
  compare(e, t) {
    return ct.toLocalBufferType(e).compare(t);
  },
  concat(e) {
    return Buffer.concat(e);
  },
  copy(e, t, r, n, a) {
    return ct.toLocalBufferType(e).copy(t, r ?? 0, n ?? 0, a ?? e.length);
  },
  equals(e, t) {
    return ct.toLocalBufferType(e).equals(t);
  },
  fromNumberArray(e) {
    return Buffer.from(e);
  },
  fromBase64(e) {
    return Buffer.from(e, "base64");
  },
  fromUTF8(e) {
    return Buffer.from(e, "utf8");
  },
  toBase64(e) {
    return ct.toLocalBufferType(e).toString("base64");
  },
  fromISO88591(e) {
    return Buffer.from(e, "binary");
  },
  toISO88591(e) {
    return ct.toLocalBufferType(e).toString("binary");
  },
  fromHex(e) {
    return Buffer.from(e, "hex");
  },
  toHex(e) {
    return ct.toLocalBufferType(e).toString("hex");
  },
  toUTF8(e, t, r, n) {
    const a = r - t <= 20 ? Nl(e, t, r) : null;
    if (a != null)
      return a;
    const i = ct.toLocalBufferType(e).toString("utf8", t, r);
    if (n) {
      for (let s = 0; s < i.length; s++)
        if (i.charCodeAt(s) === 65533) {
          Ol(e, t, r, !0);
          break;
        }
    }
    return i;
  },
  utf8ByteLength(e) {
    return Buffer.byteLength(e, "utf8");
  },
  encodeUTF8Into(e, t, r) {
    const n = wE(e, t, r);
    return n ?? ct.toLocalBufferType(e).write(t, r, void 0, "utf8");
  },
  randomBytes: yE,
  swap32(e) {
    return ct.toLocalBufferType(e).swap32();
  }
};
function TE() {
  const { navigator: e } = globalThis;
  return typeof e == "object" && e.product === "ReactNative";
}
function SE(e) {
  if (e < 0)
    throw new RangeError(`The argument 'byteLength' is invalid. Received ${e}`);
  return gn.fromNumberArray(Array.from({ length: e }, () => Math.floor(Math.random() * 256)));
}
const kE = (() => {
  var t;
  const { crypto: e } = globalThis;
  if (e != null && typeof e.getRandomValues == "function")
    return (r) => e.getRandomValues(gn.allocate(r));
  if (TE()) {
    const { console: r } = globalThis;
    (t = r == null ? void 0 : r.warn) == null || t.call(r, "BSON: For React Native please polyfill crypto.getRandomValues, e.g. using: https://www.npmjs.com/package/react-native-get-random-values.");
  }
  return SE;
})(), $f = /(\d|[a-f])/i, gn = {
  isUint8Array: Qn,
  toLocalBufferType(e) {
    const t = (e == null ? void 0 : e[Symbol.toStringTag]) ?? Object.prototype.toString.call(e);
    if (t === "Uint8Array")
      return e;
    if (ArrayBuffer.isView(e))
      return new Uint8Array(e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength));
    if (t === "ArrayBuffer" || t === "SharedArrayBuffer" || t === "[object ArrayBuffer]" || t === "[object SharedArrayBuffer]")
      return new Uint8Array(e);
    throw new J("Cannot make a Uint8Array from passed potentialBuffer.");
  },
  allocate(e) {
    if (typeof e != "number")
      throw new TypeError(`The "size" argument must be of type number. Received ${String(e)}`);
    return new Uint8Array(e);
  },
  allocateUnsafe(e) {
    return gn.allocate(e);
  },
  compare(e, t) {
    if (e === t)
      return 0;
    const r = Math.min(e.length, t.length);
    for (let n = 0; n < r; n++) {
      if (e[n] < t[n])
        return -1;
      if (e[n] > t[n])
        return 1;
    }
    return e.length < t.length ? -1 : e.length > t.length ? 1 : 0;
  },
  concat(e) {
    if (e.length === 0)
      return gn.allocate(0);
    let t = 0;
    for (const a of e)
      t += a.length;
    const r = gn.allocate(t);
    let n = 0;
    for (const a of e)
      r.set(a, n), n += a.length;
    return r;
  },
  copy(e, t, r, n, a) {
    if (a !== void 0 && a < 0)
      throw new RangeError(`The value of "sourceEnd" is out of range. It must be >= 0. Received ${a}`);
    if (a = a ?? e.length, n !== void 0 && (n < 0 || n > a))
      throw new RangeError(`The value of "sourceStart" is out of range. It must be >= 0 and <= ${a}. Received ${n}`);
    if (n = n ?? 0, r !== void 0 && r < 0)
      throw new RangeError(`The value of "targetStart" is out of range. It must be >= 0. Received ${r}`);
    r = r ?? 0;
    const i = e.subarray(n, a), s = Math.min(i.length, t.length - r);
    return s <= 0 ? 0 : (t.set(i.subarray(0, s), r), s);
  },
  equals(e, t) {
    if (e.byteLength !== t.byteLength)
      return !1;
    for (let r = 0; r < e.byteLength; r++)
      if (e[r] !== t[r])
        return !1;
    return !0;
  },
  fromNumberArray(e) {
    return Uint8Array.from(e);
  },
  fromBase64(e) {
    return Uint8Array.from(atob(e), (t) => t.charCodeAt(0));
  },
  fromUTF8(e) {
    return new TextEncoder().encode(e);
  },
  toBase64(e) {
    return btoa(gn.toISO88591(e));
  },
  fromISO88591(e) {
    return Uint8Array.from(e, (t) => t.charCodeAt(0) & 255);
  },
  toISO88591(e) {
    return Array.from(Uint16Array.from(e), (t) => String.fromCharCode(t)).join("");
  },
  fromHex(e) {
    const t = e.length % 2 === 0 ? e : e.slice(0, e.length - 1), r = [];
    for (let n = 0; n < t.length; n += 2) {
      const a = t[n], i = t[n + 1];
      if (!$f.test(a) || !$f.test(i))
        break;
      const s = Number.parseInt(`${a}${i}`, 16);
      r.push(s);
    }
    return Uint8Array.from(r);
  },
  toHex(e) {
    return Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
  },
  toUTF8(e, t, r, n) {
    const a = r - t <= 20 ? Nl(e, t, r) : null;
    return a ?? Ol(e, t, r, n);
  },
  utf8ByteLength(e) {
    return new TextEncoder().encode(e).byteLength;
  },
  encodeUTF8Into(e, t, r) {
    const n = new TextEncoder().encode(t);
    return e.set(n, r), n.byteLength;
  },
  randomBytes: kE,
  swap32(e) {
    if (e.length % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let t = 0; t < e.length; t += 4) {
      const r = e[t], n = e[t + 1], a = e[t + 2], i = e[t + 3];
      e[t] = i, e[t + 1] = a, e[t + 2] = n, e[t + 3] = r;
    }
    return e;
  }
};
var sc;
const AE = typeof Buffer == "function" && ((sc = Buffer.prototype) == null ? void 0 : sc._isBuffer) !== !0, j = AE ? ct : gn, ia = Symbol.for("@@mdb.bson.type");
class Zr {
  get [ia]() {
    return this._bsontype;
  }
  get [Xi]() {
    return ri;
  }
  [Symbol.for("nodejs.util.inspect.custom")](t, r, n) {
    return this.inspect(t, r, n);
  }
}
const $n = new Float64Array(1), Le = new Uint8Array($n.buffer, 0, 8);
$n[0] = -1;
const hs = Le[7] === 0, we = {
  isBigEndian: hs,
  getNonnegativeInt32LE(e, t) {
    if (e[t + 3] > 127)
      throw new RangeError(`Size cannot be negative at offset: ${t}`);
    return e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24;
  },
  getInt32LE(e, t) {
    return e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24;
  },
  getUint32LE(e, t) {
    return e[t] + e[t + 1] * 256 + e[t + 2] * 65536 + e[t + 3] * 16777216;
  },
  getUint32BE(e, t) {
    return e[t + 3] + e[t + 2] * 256 + e[t + 1] * 65536 + e[t] * 16777216;
  },
  getBigInt64LE(e, t) {
    const r = BigInt(e[t + 4] + e[t + 5] * 256 + e[t + 6] * 65536 + (e[t + 7] << 24)), n = BigInt(e[t] + e[t + 1] * 256 + e[t + 2] * 65536 + e[t + 3] * 16777216);
    return (r << 32n) + n;
  },
  getFloat64LE: hs ? (e, t) => (Le[7] = e[t], Le[6] = e[t + 1], Le[5] = e[t + 2], Le[4] = e[t + 3], Le[3] = e[t + 4], Le[2] = e[t + 5], Le[1] = e[t + 6], Le[0] = e[t + 7], $n[0]) : (e, t) => (Le[0] = e[t], Le[1] = e[t + 1], Le[2] = e[t + 2], Le[3] = e[t + 3], Le[4] = e[t + 4], Le[5] = e[t + 5], Le[6] = e[t + 6], Le[7] = e[t + 7], $n[0]),
  setInt32BE(e, t, r) {
    return e[t + 3] = r, r >>>= 8, e[t + 2] = r, r >>>= 8, e[t + 1] = r, r >>>= 8, e[t] = r, 4;
  },
  setInt32LE(e, t, r) {
    return e[t] = r, r >>>= 8, e[t + 1] = r, r >>>= 8, e[t + 2] = r, r >>>= 8, e[t + 3] = r, 4;
  },
  setBigInt64LE(e, t, r) {
    const n = 0xffffffffn;
    let a = Number(r & n);
    e[t] = a, a >>= 8, e[t + 1] = a, a >>= 8, e[t + 2] = a, a >>= 8, e[t + 3] = a;
    let i = Number(r >> 32n & n);
    return e[t + 4] = i, i >>= 8, e[t + 5] = i, i >>= 8, e[t + 6] = i, i >>= 8, e[t + 7] = i, 8;
  },
  setFloat64LE: hs ? (e, t, r) => ($n[0] = r, e[t] = Le[7], e[t + 1] = Le[6], e[t + 2] = Le[5], e[t + 3] = Le[4], e[t + 4] = Le[3], e[t + 5] = Le[2], e[t + 6] = Le[1], e[t + 7] = Le[0], 8) : (e, t, r) => ($n[0] = r, e[t] = Le[0], e[t + 1] = Le[1], e[t + 2] = Le[2], e[t + 3] = Le[3], e[t + 4] = Le[4], e[t + 5] = Le[5], e[t + 6] = Le[6], e[t + 7] = Le[7], 8)
}, Ne = class Ne extends Zr {
  constructor(r, n) {
    super();
    ge(this, "buffer");
    ge(this, "sub_type");
    ge(this, "position");
    if (r != null && typeof r == "string" && !ArrayBuffer.isView(r) && !w0(r) && !Array.isArray(r))
      throw new J("Binary can only be constructed from Uint8Array or number[]");
    this.sub_type = (n ?? Ne.BSON_BINARY_SUBTYPE_DEFAULT) & 255, r == null ? (this.buffer = j.allocate(Ne.BUFFER_SIZE), this.position = 0) : (this.buffer = Array.isArray(r) ? j.fromNumberArray(r) : j.toLocalBufferType(r), this.position = this.buffer.byteLength);
  }
  get _bsontype() {
    return "Binary";
  }
  put(r) {
    if (typeof r == "string" && r.length !== 1)
      throw new J("only accepts single character String");
    if (typeof r != "number" && r.length !== 1)
      throw new J("only accepts single character Uint8Array or Array");
    let n;
    if (typeof r == "string" ? n = r.charCodeAt(0) : typeof r == "number" ? n = r : n = r[0], n < 0 || n > 255)
      throw new J("only accepts number in a valid unsigned byte range 0-255");
    if (this.buffer.byteLength > this.position)
      this.buffer[this.position++] = n;
    else {
      const a = j.allocate(Ne.BUFFER_SIZE + this.buffer.length);
      a.set(this.buffer, 0), this.buffer = a, this.buffer[this.position++] = n;
    }
  }
  write(r, n) {
    if (n = typeof n == "number" ? n : this.position, this.buffer.byteLength < n + r.length) {
      const a = j.allocate(this.buffer.byteLength + r.length);
      a.set(this.buffer, 0), this.buffer = a;
    }
    if (ArrayBuffer.isView(r))
      this.buffer.set(j.toLocalBufferType(r), n), this.position = n + r.byteLength > this.position ? n + r.length : this.position;
    else if (typeof r == "string")
      throw new J("input cannot be string");
  }
  read(r, n) {
    n = n && n > 0 ? n : this.position;
    const a = r + n;
    return this.buffer.subarray(r, a > this.position ? this.position : a);
  }
  value() {
    return this.buffer.length === this.position ? this.buffer : this.buffer.subarray(0, this.position);
  }
  length() {
    return this.position;
  }
  toJSON() {
    return j.toBase64(this.buffer.subarray(0, this.position));
  }
  toString(r) {
    return r === "hex" ? j.toHex(this.buffer.subarray(0, this.position)) : r === "base64" ? j.toBase64(this.buffer.subarray(0, this.position)) : r === "utf8" || r === "utf-8" ? j.toUTF8(this.buffer, 0, this.position, !1) : j.toUTF8(this.buffer, 0, this.position, !1);
  }
  toExtendedJSON(r) {
    r = r || {}, this.sub_type === Ne.SUBTYPE_VECTOR && It(this);
    const n = j.toBase64(this.buffer), a = Number(this.sub_type).toString(16);
    return r.legacy ? {
      $binary: n,
      $type: a.length === 1 ? "0" + a : a
    } : {
      $binary: {
        base64: n,
        subType: a.length === 1 ? "0" + a : a
      }
    };
  }
  toUUID() {
    if (this.sub_type === Ne.SUBTYPE_UUID)
      return new Sr(this.buffer.subarray(0, this.position));
    throw new J(`Binary sub_type "${this.sub_type}" (${typeof this.sub_type}) is not supported for converting to UUID. Only 0x${Ne.SUBTYPE_UUID.toString(16).padStart(2, "0")} is currently supported.`);
  }
  static createFromHexString(r, n) {
    return new Ne(j.fromHex(r), n);
  }
  static createFromBase64(r, n) {
    return new Ne(j.fromBase64(r), n);
  }
  static fromExtendedJSON(r, n) {
    n = n || {};
    let a, i;
    if ("$binary" in r ? n.legacy && typeof r.$binary == "string" && "$type" in r ? (i = r.$type ? parseInt(r.$type, 16) : 0, a = j.fromBase64(r.$binary)) : typeof r.$binary != "string" && (i = r.$binary.subType ? parseInt(r.$binary.subType, 16) : 0, a = j.fromBase64(r.$binary.base64)) : "$uuid" in r && (i = 4, a = Sr.bytesFromString(r.$uuid)), !a)
      throw new J(`Unexpected Binary Extended JSON format ${JSON.stringify(r)}`);
    return i === k0 ? new Sr(a) : new Ne(a, i);
  }
  inspect(r, n, a) {
    a ?? (a = qr);
    const i = j.toBase64(this.buffer.subarray(0, this.position)), s = a(i, n), f = a(this.sub_type, n);
    return `Binary.createFromBase64(${s}, ${f})`;
  }
  toInt8Array() {
    if (this.sub_type !== Ne.SUBTYPE_VECTOR)
      throw new J("Binary sub_type is not Vector");
    if (this.buffer[0] !== Ne.VECTOR_TYPE.Int8)
      throw new J("Binary datatype field is not Int8");
    return It(this), new Int8Array(this.buffer.buffer.slice(this.buffer.byteOffset + 2, this.buffer.byteOffset + this.position));
  }
  toFloat32Array() {
    if (this.sub_type !== Ne.SUBTYPE_VECTOR)
      throw new J("Binary sub_type is not Vector");
    if (this.buffer[0] !== Ne.VECTOR_TYPE.Float32)
      throw new J("Binary datatype field is not Float32");
    It(this);
    const r = new Uint8Array(this.buffer.buffer.slice(this.buffer.byteOffset + 2, this.buffer.byteOffset + this.position));
    return we.isBigEndian && j.swap32(r), new Float32Array(r.buffer);
  }
  toPackedBits() {
    if (this.sub_type !== Ne.SUBTYPE_VECTOR)
      throw new J("Binary sub_type is not Vector");
    if (this.buffer[0] !== Ne.VECTOR_TYPE.PackedBit)
      throw new J("Binary datatype field is not packed bit");
    return It(this), new Uint8Array(this.buffer.buffer.slice(this.buffer.byteOffset + 2, this.buffer.byteOffset + this.position));
  }
  toBits() {
    if (this.sub_type !== Ne.SUBTYPE_VECTOR)
      throw new J("Binary sub_type is not Vector");
    if (this.buffer[0] !== Ne.VECTOR_TYPE.PackedBit)
      throw new J("Binary datatype field is not packed bit");
    It(this);
    const n = (this.length() - 2) * 8 - this.buffer[1], a = new Int8Array(n);
    for (let i = 0; i < a.length; i++) {
      const s = i / 8 | 0, f = this.buffer[s + 2], c = 7 - i % 8, o = f >> c & 1;
      a[i] = o;
    }
    return a;
  }
  static fromInt8Array(r) {
    const n = j.allocate(r.byteLength + 2);
    n[0] = Ne.VECTOR_TYPE.Int8, n[1] = 0;
    const a = new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    n.set(a, 2);
    const i = new this(n, this.SUBTYPE_VECTOR);
    return It(i), i;
  }
  static fromFloat32Array(r) {
    const n = j.allocate(r.byteLength + 2);
    n[0] = Ne.VECTOR_TYPE.Float32, n[1] = 0;
    const a = new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    n.set(a, 2), we.isBigEndian && j.swap32(new Uint8Array(n.buffer, 2));
    const i = new this(n, this.SUBTYPE_VECTOR);
    return It(i), i;
  }
  static fromPackedBits(r, n = 0) {
    const a = j.allocate(r.byteLength + 2);
    a[0] = Ne.VECTOR_TYPE.PackedBit, a[1] = n, a.set(r, 2);
    const i = new this(a, this.SUBTYPE_VECTOR);
    return It(i), i;
  }
  static fromBits(r) {
    const n = r.length + 7 >>> 3, a = new Uint8Array(n + 2);
    a[0] = Ne.VECTOR_TYPE.PackedBit;
    const i = r.length % 8;
    a[1] = i === 0 ? 0 : 8 - i;
    for (let s = 0; s < r.length; s++) {
      const f = s >>> 3, c = r[s];
      if (c !== 0 && c !== 1)
        throw new J(`Invalid bit value at ${s}: must be 0 or 1, found ${r[s]}`);
      if (c === 0)
        continue;
      const o = 7 - s % 8;
      a[f + 2] |= c << o;
    }
    return new this(a, Ne.SUBTYPE_VECTOR);
  }
};
ge(Ne, "BSON_BINARY_SUBTYPE_DEFAULT", 0), ge(Ne, "BUFFER_SIZE", 256), ge(Ne, "SUBTYPE_DEFAULT", 0), ge(Ne, "SUBTYPE_FUNCTION", 1), ge(Ne, "SUBTYPE_BYTE_ARRAY", 2), ge(Ne, "SUBTYPE_UUID_OLD", 3), ge(Ne, "SUBTYPE_UUID", 4), ge(Ne, "SUBTYPE_MD5", 5), ge(Ne, "SUBTYPE_ENCRYPTED", 6), ge(Ne, "SUBTYPE_COLUMN", 7), ge(Ne, "SUBTYPE_SENSITIVE", 8), ge(Ne, "SUBTYPE_VECTOR", 9), ge(Ne, "SUBTYPE_USER_DEFINED", 128), ge(Ne, "VECTOR_TYPE", Object.freeze({
  Int8: 3,
  Float32: 39,
  PackedBit: 16
}));
let fr = Ne;
function It(e) {
  if (e.sub_type !== fr.SUBTYPE_VECTOR)
    return;
  const t = e.position, r = e.buffer[0], n = e.buffer[1];
  if ((r === fr.VECTOR_TYPE.Float32 || r === fr.VECTOR_TYPE.Int8) && n !== 0)
    throw new J("Invalid Vector: padding must be zero for int8 and float32 vectors");
  if (r === fr.VECTOR_TYPE.Float32 && t !== 0 && t - 2 !== 0 && (t - 2) % 4 !== 0)
    throw new J("Invalid Vector: Float32 vector must contain a multiple of 4 bytes");
  if (r === fr.VECTOR_TYPE.PackedBit && n !== 0 && t === 2)
    throw new J("Invalid Vector: padding must be zero for packed bit vectors that are empty");
  if (r === fr.VECTOR_TYPE.PackedBit && n > 7)
    throw new J(`Invalid Vector: padding must be a value between 0 and 7. found: ${n}`);
}
const us = 16, FE = /^[0-9A-F]{32}$/i, bE = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
class Sr extends fr {
  constructor(t) {
    let r;
    if (t == null)
      r = Sr.generate();
    else if (t instanceof Sr)
      r = j.toLocalBufferType(new Uint8Array(t.buffer));
    else if (ArrayBuffer.isView(t) && t.byteLength === us)
      r = j.toLocalBufferType(t);
    else if (typeof t == "string")
      r = Sr.bytesFromString(t);
    else
      throw new J("Argument passed in UUID constructor must be a UUID, a 16 byte Buffer or a 32/36 character hex string (dashes excluded/included, format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).");
    super(r, k0);
  }
  get id() {
    return this.buffer;
  }
  set id(t) {
    this.buffer = t;
  }
  toHexString(t = !0) {
    return t ? [
      j.toHex(this.buffer.subarray(0, 4)),
      j.toHex(this.buffer.subarray(4, 6)),
      j.toHex(this.buffer.subarray(6, 8)),
      j.toHex(this.buffer.subarray(8, 10)),
      j.toHex(this.buffer.subarray(10, 16))
    ].join("-") : j.toHex(this.buffer);
  }
  toString(t) {
    return t === "hex" ? j.toHex(this.id) : t === "base64" ? j.toBase64(this.id) : this.toHexString();
  }
  toJSON() {
    return this.toHexString();
  }
  equals(t) {
    if (!t)
      return !1;
    if (t instanceof Sr)
      return j.equals(t.id, this.id);
    try {
      return j.equals(new Sr(t).id, this.id);
    } catch {
      return !1;
    }
  }
  toBinary() {
    return new fr(this.id, fr.SUBTYPE_UUID);
  }
  static generate() {
    const t = j.randomBytes(us);
    return t[6] = t[6] & 15 | 64, t[8] = t[8] & 63 | 128, t;
  }
  static isValid(t) {
    return t ? typeof t == "string" ? Sr.isValidUUIDString(t) : Qn(t) ? t.byteLength === us : t._bsontype === "Binary" && t.sub_type === this.SUBTYPE_UUID && t.buffer.byteLength === 16 : !1;
  }
  static createFromHexString(t) {
    const r = Sr.bytesFromString(t);
    return new Sr(r);
  }
  static createFromBase64(t) {
    return new Sr(j.fromBase64(t));
  }
  static bytesFromString(t) {
    if (!Sr.isValidUUIDString(t))
      throw new J("UUID string representation must be 32 hex digits or canonical hyphenated representation");
    return j.fromHex(t.replace(/-/g, ""));
  }
  static isValidUUIDString(t) {
    return FE.test(t) || bE.test(t);
  }
  inspect(t, r, n) {
    return n ?? (n = qr), `new UUID(${n(this.toHexString(), r)})`;
  }
}
class an extends Zr {
  constructor(r, n) {
    super();
    ge(this, "code");
    ge(this, "scope");
    this.code = r.toString(), this.scope = n ?? null;
  }
  get _bsontype() {
    return "Code";
  }
  toJSON() {
    return this.scope != null ? { code: this.code, scope: this.scope } : { code: this.code };
  }
  toExtendedJSON() {
    return this.scope ? { $code: this.code, $scope: this.scope } : { $code: this.code };
  }
  static fromExtendedJSON(r) {
    return new an(r.$code, r.$scope);
  }
  inspect(r, n, a) {
    a ?? (a = qr);
    let i = a(this.code, n);
    const s = i.includes(`
`);
    this.scope != null && (i += `,${s ? `
` : " "}${a(this.scope, n)}`);
    const f = s && this.scope === null;
    return `new Code(${s ? `
` : ""}${i}${f ? `
` : ""})`;
  }
}
function Il(e) {
  return e != null && typeof e == "object" && "$id" in e && e.$id != null && "$ref" in e && typeof e.$ref == "string" && (!("$db" in e) || "$db" in e && typeof e.$db == "string");
}
class Wt extends Zr {
  constructor(r, n, a, i) {
    super();
    ge(this, "collection");
    ge(this, "oid");
    ge(this, "db");
    ge(this, "fields");
    const s = r.split(".");
    s.length === 2 && (a = s.shift(), r = s.shift()), this.collection = r, this.oid = n, this.db = a, this.fields = i || {};
  }
  get _bsontype() {
    return "DBRef";
  }
  get namespace() {
    return this.collection;
  }
  set namespace(r) {
    this.collection = r;
  }
  toJSON() {
    const r = Object.assign({
      $ref: this.collection,
      $id: this.oid
    }, this.fields);
    return this.db != null && (r.$db = this.db), r;
  }
  toExtendedJSON(r) {
    r = r || {};
    let n = {
      $ref: this.collection,
      $id: this.oid
    };
    return r.legacy || (this.db && (n.$db = this.db), n = Object.assign(n, this.fields)), n;
  }
  static fromExtendedJSON(r) {
    const n = Object.assign({}, r);
    return delete n.$ref, delete n.$id, delete n.$db, new Wt(r.$ref, r.$id, r.$db, n);
  }
  inspect(r, n, a) {
    a ?? (a = qr);
    const i = [
      a(this.namespace, n),
      a(this.oid, n),
      ...this.db ? [a(this.db, n)] : [],
      ...Object.keys(this.fields).length > 0 ? [a(this.fields, n)] : []
    ];
    return i[1] = a === qr ? `new ObjectId(${i[1]})` : i[1], `new DBRef(${i.join(", ")})`;
  }
}
function Bl(e) {
  if (e === "")
    return e;
  let t = 0;
  const r = e[t] === "-", n = e[t] === "+";
  (n || r) && (t += 1);
  let a = !1;
  for (; t < e.length && e[t] === "0"; ++t)
    a = !0;
  return a ? `${r ? "-" : ""}${e.length === t ? "0" : e.slice(t)}` : n ? e.slice(1) : e;
}
function CE(e, t) {
  t = t ?? 10;
  const r = "0123456789abcdefghijklmnopqrstuvwxyz".slice(0, t);
  return new RegExp(`[^-+${r}]`, "i").test(e) ? !1 : e;
}
let st;
try {
  st = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
} catch {
}
const zf = 65536, OE = 1 << 24, zn = zf * zf, Dl = zn * zn, Gf = Dl / 2, Xf = {}, jf = {}, NE = 20, IE = /^(\+?0|(\+|-)?[1-9][0-9]*)$/, K = class K extends Zr {
  constructor(r = 0, n, a) {
    super();
    ge(this, "high");
    ge(this, "low");
    ge(this, "unsigned");
    const i = typeof n == "boolean" ? n : !!a, s = typeof n == "number" ? n : 0, f = typeof r == "string" ? K.fromString(r, i) : typeof r == "bigint" ? K.fromBigInt(r, i) : { low: r | 0, high: s | 0, unsigned: i };
    this.low = f.low, this.high = f.high, this.unsigned = f.unsigned;
  }
  get _bsontype() {
    return "Long";
  }
  get __isLong__() {
    return !0;
  }
  static fromBits(r, n, a) {
    return new K(r, n, a);
  }
  static fromInt(r, n) {
    let a, i, s;
    return n ? (r >>>= 0, (s = 0 <= r && r < 256) && (i = jf[r], i) ? i : (a = K.fromBits(r, (r | 0) < 0 ? -1 : 0, !0), s && (jf[r] = a), a)) : (r |= 0, (s = -128 <= r && r < 128) && (i = Xf[r], i) ? i : (a = K.fromBits(r, r < 0 ? -1 : 0, !1), s && (Xf[r] = a), a));
  }
  static fromNumber(r, n) {
    if (isNaN(r))
      return n ? K.UZERO : K.ZERO;
    if (n) {
      if (r < 0)
        return K.UZERO;
      if (r >= Dl)
        return K.MAX_UNSIGNED_VALUE;
    } else {
      if (r <= -Gf)
        return K.MIN_VALUE;
      if (r + 1 >= Gf)
        return K.MAX_VALUE;
    }
    return r < 0 ? K.fromNumber(-r, n).neg() : K.fromBits(r % zn | 0, r / zn | 0, n);
  }
  static fromBigInt(r, n) {
    const a = 0xffffffffn, i = 32n;
    return new K(Number(r & a), Number(r >> i & a), n);
  }
  static _fromString(r, n, a) {
    if (r.length === 0)
      throw new J("empty string");
    if (a < 2 || 36 < a)
      throw new J("radix");
    let i;
    if ((i = r.indexOf("-")) > 0)
      throw new J("interior hyphen");
    if (i === 0)
      return K._fromString(r.substring(1), n, a).neg();
    const s = K.fromNumber(Math.pow(a, 8));
    let f = K.ZERO;
    for (let c = 0; c < r.length; c += 8) {
      const o = Math.min(8, r.length - c), l = parseInt(r.substring(c, c + o), a);
      if (o < 8) {
        const h = K.fromNumber(Math.pow(a, o));
        f = f.mul(h).add(K.fromNumber(l));
      } else
        f = f.mul(s), f = f.add(K.fromNumber(l));
    }
    return f.unsigned = n, f;
  }
  static fromStringStrict(r, n, a) {
    let i = !1;
    if (typeof n == "number" ? (a = n, n = !1) : i = !!n, a ?? (a = 10), r.trim() !== r)
      throw new J(`Input: '${r}' contains leading and/or trailing whitespace`);
    if (!CE(r, a))
      throw new J(`Input: '${r}' contains invalid characters for radix: ${a}`);
    const s = Bl(r), f = K._fromString(s, i, a);
    if (f.toString(a).toLowerCase() !== s.toLowerCase())
      throw new J(`Input: ${r} is not representable as ${f.unsigned ? "an unsigned" : "a signed"} 64-bit Long ${a != null ? `with radix: ${a}` : ""}`);
    return f;
  }
  static fromString(r, n, a) {
    let i = !1;
    return typeof n == "number" ? (a = n, n = !1) : i = !!n, a ?? (a = 10), r === "NaN" && a < 24 || (r === "Infinity" || r === "+Infinity" || r === "-Infinity") && a < 35 ? K.ZERO : K._fromString(r, i, a);
  }
  static fromBytes(r, n, a) {
    return a ? K.fromBytesLE(r, n) : K.fromBytesBE(r, n);
  }
  static fromBytesLE(r, n) {
    return new K(r[0] | r[1] << 8 | r[2] << 16 | r[3] << 24, r[4] | r[5] << 8 | r[6] << 16 | r[7] << 24, n);
  }
  static fromBytesBE(r, n) {
    return new K(r[4] << 24 | r[5] << 16 | r[6] << 8 | r[7], r[0] << 24 | r[1] << 16 | r[2] << 8 | r[3], n);
  }
  static isLong(r) {
    return r != null && typeof r == "object" && "__isLong__" in r && r.__isLong__ === !0;
  }
  static fromValue(r, n) {
    return typeof r == "number" ? K.fromNumber(r, n) : typeof r == "string" ? K.fromString(r, n) : K.fromBits(r.low, r.high, typeof n == "boolean" ? n : r.unsigned);
  }
  add(r) {
    K.isLong(r) || (r = K.fromValue(r));
    const n = this.high >>> 16, a = this.high & 65535, i = this.low >>> 16, s = this.low & 65535, f = r.high >>> 16, c = r.high & 65535, o = r.low >>> 16, l = r.low & 65535;
    let h = 0, u = 0, x = 0, g = 0;
    return g += s + l, x += g >>> 16, g &= 65535, x += i + o, u += x >>> 16, x &= 65535, u += a + c, h += u >>> 16, u &= 65535, h += n + f, h &= 65535, K.fromBits(x << 16 | g, h << 16 | u, this.unsigned);
  }
  and(r) {
    return K.isLong(r) || (r = K.fromValue(r)), K.fromBits(this.low & r.low, this.high & r.high, this.unsigned);
  }
  compare(r) {
    if (K.isLong(r) || (r = K.fromValue(r)), this.eq(r))
      return 0;
    const n = this.isNegative(), a = r.isNegative();
    return n && !a ? -1 : !n && a ? 1 : this.unsigned ? r.high >>> 0 > this.high >>> 0 || r.high === this.high && r.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(r).isNegative() ? -1 : 1;
  }
  comp(r) {
    return this.compare(r);
  }
  divide(r) {
    if (K.isLong(r) || (r = K.fromValue(r)), r.isZero())
      throw new J("division by zero");
    if (st) {
      if (!this.unsigned && this.high === -2147483648 && r.low === -1 && r.high === -1)
        return this;
      const s = (this.unsigned ? st.div_u : st.div_s)(this.low, this.high, r.low, r.high);
      return K.fromBits(s, st.get_high(), this.unsigned);
    }
    if (this.isZero())
      return this.unsigned ? K.UZERO : K.ZERO;
    let n, a, i;
    if (this.unsigned) {
      if (r.unsigned || (r = r.toUnsigned()), r.gt(this))
        return K.UZERO;
      if (r.gt(this.shru(1)))
        return K.UONE;
      i = K.UZERO;
    } else {
      if (this.eq(K.MIN_VALUE))
        return r.eq(K.ONE) || r.eq(K.NEG_ONE) ? K.MIN_VALUE : r.eq(K.MIN_VALUE) ? K.ONE : (n = this.shr(1).div(r).shl(1), n.eq(K.ZERO) ? r.isNegative() ? K.ONE : K.NEG_ONE : (a = this.sub(r.mul(n)), i = n.add(a.div(r)), i));
      if (r.eq(K.MIN_VALUE))
        return this.unsigned ? K.UZERO : K.ZERO;
      if (this.isNegative())
        return r.isNegative() ? this.neg().div(r.neg()) : this.neg().div(r).neg();
      if (r.isNegative())
        return this.div(r.neg()).neg();
      i = K.ZERO;
    }
    for (a = this; a.gte(r); ) {
      n = Math.max(1, Math.floor(a.toNumber() / r.toNumber()));
      const s = Math.ceil(Math.log(n) / Math.LN2), f = s <= 48 ? 1 : Math.pow(2, s - 48);
      let c = K.fromNumber(n), o = c.mul(r);
      for (; o.isNegative() || o.gt(a); )
        n -= f, c = K.fromNumber(n, this.unsigned), o = c.mul(r);
      c.isZero() && (c = K.ONE), i = i.add(c), a = a.sub(o);
    }
    return i;
  }
  div(r) {
    return this.divide(r);
  }
  equals(r) {
    return K.isLong(r) || (r = K.fromValue(r)), this.unsigned !== r.unsigned && this.high >>> 31 === 1 && r.high >>> 31 === 1 ? !1 : this.high === r.high && this.low === r.low;
  }
  eq(r) {
    return this.equals(r);
  }
  getHighBits() {
    return this.high;
  }
  getHighBitsUnsigned() {
    return this.high >>> 0;
  }
  getLowBits() {
    return this.low;
  }
  getLowBitsUnsigned() {
    return this.low >>> 0;
  }
  getNumBitsAbs() {
    if (this.isNegative())
      return this.eq(K.MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    const r = this.high !== 0 ? this.high : this.low;
    let n;
    for (n = 31; n > 0 && !(r & 1 << n); n--)
      ;
    return this.high !== 0 ? n + 33 : n + 1;
  }
  greaterThan(r) {
    return this.comp(r) > 0;
  }
  gt(r) {
    return this.greaterThan(r);
  }
  greaterThanOrEqual(r) {
    return this.comp(r) >= 0;
  }
  gte(r) {
    return this.greaterThanOrEqual(r);
  }
  ge(r) {
    return this.greaterThanOrEqual(r);
  }
  isEven() {
    return (this.low & 1) === 0;
  }
  isNegative() {
    return !this.unsigned && this.high < 0;
  }
  isOdd() {
    return (this.low & 1) === 1;
  }
  isPositive() {
    return this.unsigned || this.high >= 0;
  }
  isZero() {
    return this.high === 0 && this.low === 0;
  }
  lessThan(r) {
    return this.comp(r) < 0;
  }
  lt(r) {
    return this.lessThan(r);
  }
  lessThanOrEqual(r) {
    return this.comp(r) <= 0;
  }
  lte(r) {
    return this.lessThanOrEqual(r);
  }
  modulo(r) {
    if (K.isLong(r) || (r = K.fromValue(r)), st) {
      const n = (this.unsigned ? st.rem_u : st.rem_s)(this.low, this.high, r.low, r.high);
      return K.fromBits(n, st.get_high(), this.unsigned);
    }
    return this.sub(this.div(r).mul(r));
  }
  mod(r) {
    return this.modulo(r);
  }
  rem(r) {
    return this.modulo(r);
  }
  multiply(r) {
    if (this.isZero())
      return K.ZERO;
    if (K.isLong(r) || (r = K.fromValue(r)), st) {
      const d = st.mul(this.low, this.high, r.low, r.high);
      return K.fromBits(d, st.get_high(), this.unsigned);
    }
    if (r.isZero())
      return K.ZERO;
    if (this.eq(K.MIN_VALUE))
      return r.isOdd() ? K.MIN_VALUE : K.ZERO;
    if (r.eq(K.MIN_VALUE))
      return this.isOdd() ? K.MIN_VALUE : K.ZERO;
    if (this.isNegative())
      return r.isNegative() ? this.neg().mul(r.neg()) : this.neg().mul(r).neg();
    if (r.isNegative())
      return this.mul(r.neg()).neg();
    if (this.lt(K.TWO_PWR_24) && r.lt(K.TWO_PWR_24))
      return K.fromNumber(this.toNumber() * r.toNumber(), this.unsigned);
    const n = this.high >>> 16, a = this.high & 65535, i = this.low >>> 16, s = this.low & 65535, f = r.high >>> 16, c = r.high & 65535, o = r.low >>> 16, l = r.low & 65535;
    let h = 0, u = 0, x = 0, g = 0;
    return g += s * l, x += g >>> 16, g &= 65535, x += i * l, u += x >>> 16, x &= 65535, x += s * o, u += x >>> 16, x &= 65535, u += a * l, h += u >>> 16, u &= 65535, u += i * o, h += u >>> 16, u &= 65535, u += s * c, h += u >>> 16, u &= 65535, h += n * l + a * o + i * c + s * f, h &= 65535, K.fromBits(x << 16 | g, h << 16 | u, this.unsigned);
  }
  mul(r) {
    return this.multiply(r);
  }
  negate() {
    return !this.unsigned && this.eq(K.MIN_VALUE) ? K.MIN_VALUE : this.not().add(K.ONE);
  }
  neg() {
    return this.negate();
  }
  not() {
    return K.fromBits(~this.low, ~this.high, this.unsigned);
  }
  notEquals(r) {
    return !this.equals(r);
  }
  neq(r) {
    return this.notEquals(r);
  }
  ne(r) {
    return this.notEquals(r);
  }
  or(r) {
    return K.isLong(r) || (r = K.fromValue(r)), K.fromBits(this.low | r.low, this.high | r.high, this.unsigned);
  }
  shiftLeft(r) {
    return K.isLong(r) && (r = r.toInt()), (r &= 63) === 0 ? this : r < 32 ? K.fromBits(this.low << r, this.high << r | this.low >>> 32 - r, this.unsigned) : K.fromBits(0, this.low << r - 32, this.unsigned);
  }
  shl(r) {
    return this.shiftLeft(r);
  }
  shiftRight(r) {
    return K.isLong(r) && (r = r.toInt()), (r &= 63) === 0 ? this : r < 32 ? K.fromBits(this.low >>> r | this.high << 32 - r, this.high >> r, this.unsigned) : K.fromBits(this.high >> r - 32, this.high >= 0 ? 0 : -1, this.unsigned);
  }
  shr(r) {
    return this.shiftRight(r);
  }
  shiftRightUnsigned(r) {
    if (K.isLong(r) && (r = r.toInt()), r &= 63, r === 0)
      return this;
    {
      const n = this.high;
      if (r < 32) {
        const a = this.low;
        return K.fromBits(a >>> r | n << 32 - r, n >>> r, this.unsigned);
      } else return r === 32 ? K.fromBits(n, 0, this.unsigned) : K.fromBits(n >>> r - 32, 0, this.unsigned);
    }
  }
  shr_u(r) {
    return this.shiftRightUnsigned(r);
  }
  shru(r) {
    return this.shiftRightUnsigned(r);
  }
  subtract(r) {
    return K.isLong(r) || (r = K.fromValue(r)), this.add(r.neg());
  }
  sub(r) {
    return this.subtract(r);
  }
  toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
  }
  toNumber() {
    return this.unsigned ? (this.high >>> 0) * zn + (this.low >>> 0) : this.high * zn + (this.low >>> 0);
  }
  toBigInt() {
    return BigInt(this.toString());
  }
  toBytes(r) {
    return r ? this.toBytesLE() : this.toBytesBE();
  }
  toBytesLE() {
    const r = this.high, n = this.low;
    return [
      n & 255,
      n >>> 8 & 255,
      n >>> 16 & 255,
      n >>> 24,
      r & 255,
      r >>> 8 & 255,
      r >>> 16 & 255,
      r >>> 24
    ];
  }
  toBytesBE() {
    const r = this.high, n = this.low;
    return [
      r >>> 24,
      r >>> 16 & 255,
      r >>> 8 & 255,
      r & 255,
      n >>> 24,
      n >>> 16 & 255,
      n >>> 8 & 255,
      n & 255
    ];
  }
  toSigned() {
    return this.unsigned ? K.fromBits(this.low, this.high, !1) : this;
  }
  toString(r) {
    if (r = r || 10, r < 2 || 36 < r)
      throw new J("radix");
    if (this.isZero())
      return "0";
    if (this.isNegative())
      if (this.eq(K.MIN_VALUE)) {
        const s = K.fromNumber(r), f = this.div(s), c = f.mul(s).sub(this);
        return f.toString(r) + c.toInt().toString(r);
      } else
        return "-" + this.neg().toString(r);
    const n = K.fromNumber(Math.pow(r, 6), this.unsigned);
    let a = this, i = "";
    for (; ; ) {
      const s = a.div(n);
      let c = (a.sub(s.mul(n)).toInt() >>> 0).toString(r);
      if (a = s, a.isZero())
        return c + i;
      for (; c.length < 6; )
        c = "0" + c;
      i = "" + c + i;
    }
  }
  toUnsigned() {
    return this.unsigned ? this : K.fromBits(this.low, this.high, !0);
  }
  xor(r) {
    return K.isLong(r) || (r = K.fromValue(r)), K.fromBits(this.low ^ r.low, this.high ^ r.high, this.unsigned);
  }
  eqz() {
    return this.isZero();
  }
  le(r) {
    return this.lessThanOrEqual(r);
  }
  toExtendedJSON(r) {
    return r && r.relaxed ? this.toNumber() : { $numberLong: this.toString() };
  }
  static fromExtendedJSON(r, n) {
    const { useBigInt64: a = !1, relaxed: i = !0 } = { ...n };
    if (r.$numberLong.length > NE)
      throw new J("$numberLong string is too long");
    if (!IE.test(r.$numberLong))
      throw new J(`$numberLong string "${r.$numberLong}" is in an invalid format`);
    if (a) {
      const f = BigInt(r.$numberLong);
      return BigInt.asIntN(64, f);
    }
    const s = K.fromString(r.$numberLong);
    return i ? s.toNumber() : s;
  }
  inspect(r, n, a) {
    a ?? (a = qr);
    const i = a(this.toString(), n), s = this.unsigned ? `, ${a(this.unsigned, n)}` : "";
    return `new Long(${i}${s})`;
  }
};
ge(K, "TWO_PWR_24", K.fromInt(OE)), ge(K, "MAX_UNSIGNED_VALUE", K.fromBits(-1, -1, !0)), ge(K, "ZERO", K.fromInt(0)), ge(K, "UZERO", K.fromInt(0, !0)), ge(K, "ONE", K.fromInt(1)), ge(K, "UONE", K.fromInt(1, !0)), ge(K, "NEG_ONE", K.fromInt(-1)), ge(K, "MAX_VALUE", K.fromBits(-1, 2147483647, !1)), ge(K, "MIN_VALUE", K.fromBits(0, -2147483648, !1));
let pe = K;
const BE = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/, DE = /^(\+|-)?(Infinity|inf)$/i, RE = /^(\+|-)?NaN$/i, Ln = 6111, ma = -6176, Yf = 6176, Kf = 34, xs = j.fromNumberArray([
  124,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
].reverse()), Jf = j.fromNumberArray([
  248,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
].reverse()), qf = j.fromNumberArray([
  120,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
].reverse()), LE = /^([-+])?(\d+)?$/, PE = 31, Zf = 16383, ME = 30, UE = 31;
function Qf(e) {
  return !isNaN(parseInt(e, 10));
}
function WE(e) {
  const t = pe.fromNumber(1e9);
  let r = pe.fromNumber(0);
  if (!e.parts[0] && !e.parts[1] && !e.parts[2] && !e.parts[3])
    return { quotient: e, rem: r };
  for (let n = 0; n <= 3; n++)
    r = r.shiftLeft(32), r = r.add(new pe(e.parts[n], 0)), e.parts[n] = r.div(t).low, r = r.modulo(t);
  return { quotient: e, rem: r };
}
function HE(e, t) {
  if (!e && !t)
    return { high: pe.fromNumber(0), low: pe.fromNumber(0) };
  const r = e.shiftRightUnsigned(32), n = new pe(e.getLowBits(), 0), a = t.shiftRightUnsigned(32), i = new pe(t.getLowBits(), 0);
  let s = r.multiply(a), f = r.multiply(i);
  const c = n.multiply(a);
  let o = n.multiply(i);
  return s = s.add(f.shiftRightUnsigned(32)), f = new pe(f.getLowBits(), 0).add(c).add(o.shiftRightUnsigned(32)), s = s.add(f.shiftRightUnsigned(32)), o = f.shiftLeft(32).add(new pe(o.getLowBits(), 0)), { high: s, low: o };
}
function VE(e, t) {
  const r = e.high >>> 0, n = t.high >>> 0;
  if (r < n)
    return !0;
  if (r === n) {
    const a = e.low >>> 0, i = t.low >>> 0;
    if (a < i)
      return !0;
  }
  return !1;
}
function dt(e, t) {
  throw new J(`"${e}" is not a valid Decimal128 string - ${t}`);
}
class Br extends Zr {
  constructor(r) {
    super();
    ge(this, "bytes");
    if (typeof r == "string")
      this.bytes = Br.fromString(r).bytes;
    else if (r instanceof Uint8Array || Qn(r)) {
      if (r.byteLength !== 16)
        throw new J("Decimal128 must take a Buffer of 16 bytes");
      this.bytes = r;
    } else
      throw new J("Decimal128 must take a Buffer or string");
  }
  get _bsontype() {
    return "Decimal128";
  }
  static fromString(r) {
    return Br._fromString(r, { allowRounding: !1 });
  }
  static fromStringWithRounding(r) {
    return Br._fromString(r, { allowRounding: !0 });
  }
  static _fromString(r, n) {
    let a = !1, i = !1, s = !1, f = !1, c = 0, o = 0, l = 0, h = 0, u = 0;
    const x = [0];
    let g = 0, d = 0, m = 0, w = 0, y = new pe(0, 0), v = new pe(0, 0), I = 0, T = 0;
    if (r.length >= 7e3)
      throw new J("" + r + " not a valid Decimal128 string");
    const N = r.match(BE), k = r.match(DE), U = r.match(RE);
    if (!N && !k && !U || r.length === 0)
      throw new J("" + r + " not a valid Decimal128 string");
    if (N) {
      const B = N[2], Y = N[4], he = N[5], W = N[6];
      Y && W === void 0 && dt(r, "missing exponent power"), Y && B === void 0 && dt(r, "missing exponent base"), Y === void 0 && (he || W) && dt(r, "missing e before exponent");
    }
    if ((r[T] === "+" || r[T] === "-") && (i = !0, a = r[T++] === "-"), !Qf(r[T]) && r[T] !== ".") {
      if (r[T] === "i" || r[T] === "I")
        return new Br(a ? Jf : qf);
      if (r[T] === "N")
        return new Br(xs);
    }
    for (; Qf(r[T]) || r[T] === "."; ) {
      if (r[T] === ".") {
        s && dt(r, "contains multiple periods"), s = !0, T = T + 1;
        continue;
      }
      g < Kf && (r[T] !== "0" || f) && (f || (u = o), f = !0, x[d++] = parseInt(r[T], 10), g = g + 1), f && (l = l + 1), s && (h = h + 1), o = o + 1, T = T + 1;
    }
    if (s && !o)
      throw new J("" + r + " not a valid Decimal128 string");
    if (r[T] === "e" || r[T] === "E") {
      const B = r.substr(++T).match(LE);
      if (!B || !B[2])
        return new Br(xs);
      w = parseInt(B[0], 10), T = T + B[0].length;
    }
    if (r[T])
      return new Br(xs);
    if (!g)
      x[0] = 0, l = 1, g = 1, c = 0;
    else if (m = g - 1, c = l, c !== 1)
      for (; r[u + c - 1 + Number(i) + Number(s)] === "0"; )
        c = c - 1;
    for (w <= h && h > w + 16384 ? w = ma : w = w - h; w > Ln; ) {
      if (m = m + 1, m >= Kf) {
        if (c === 0) {
          w = Ln;
          break;
        }
        dt(r, "overflow");
      }
      w = w - 1;
    }
    if (n.allowRounding) {
      for (; w < ma || g < l; ) {
        if (m === 0 && c < g) {
          w = ma, c = 0;
          break;
        }
        if (g < l ? l = l - 1 : m = m - 1, w < Ln)
          w = w + 1;
        else {
          if (x.join("").match(/^0+$/)) {
            w = Ln;
            break;
          }
          dt(r, "overflow");
        }
      }
      if (m + 1 < c) {
        let B = o;
        s && (u = u + 1, B = B + 1), i && (u = u + 1, B = B + 1);
        const Y = parseInt(r[u + m + 1], 10);
        let he = 0;
        if (Y >= 5 && (he = 1, Y === 5)) {
          he = x[m] % 2 === 1 ? 1 : 0;
          for (let W = u + m + 2; W < B; W++)
            if (parseInt(r[W], 10)) {
              he = 1;
              break;
            }
        }
        if (he) {
          let W = m;
          for (; W >= 0 && ++x[W] > 9; W--)
            if (x[W] = 0, W === 0)
              if (w < Ln)
                w = w + 1, x[W] = 1;
              else
                return new Br(a ? Jf : qf);
        }
      }
    } else {
      for (; w < ma || g < l; ) {
        if (m === 0) {
          if (c === 0) {
            w = ma;
            break;
          }
          dt(r, "exponent underflow");
        }
        g < l ? (r[l - 1 + Number(i) + Number(s)] !== "0" && c !== 0 && dt(r, "inexact rounding"), l = l - 1) : (x[m] !== 0 && dt(r, "inexact rounding"), m = m - 1), w < Ln ? w = w + 1 : dt(r, "overflow");
      }
      m + 1 < c && (s && (u = u + 1), i && (u = u + 1), parseInt(r[u + m + 1], 10) !== 0 && dt(r, "inexact rounding"));
    }
    if (y = pe.fromNumber(0), v = pe.fromNumber(0), c === 0)
      y = pe.fromNumber(0), v = pe.fromNumber(0);
    else if (m < 17) {
      let B = 0;
      for (v = pe.fromNumber(x[B++]), y = new pe(0, 0); B <= m; B++)
        v = v.multiply(pe.fromNumber(10)), v = v.add(pe.fromNumber(x[B]));
    } else {
      let B = 0;
      for (y = pe.fromNumber(x[B++]); B <= m - 17; B++)
        y = y.multiply(pe.fromNumber(10)), y = y.add(pe.fromNumber(x[B]));
      for (v = pe.fromNumber(x[B++]); B <= m; B++)
        v = v.multiply(pe.fromNumber(10)), v = v.add(pe.fromNumber(x[B]));
    }
    const C = HE(y, pe.fromString("100000000000000000"));
    C.low = C.low.add(v), VE(C.low, v) && (C.high = C.high.add(pe.fromNumber(1))), I = w + Yf;
    const D = { low: pe.fromNumber(0), high: pe.fromNumber(0) };
    C.high.shiftRightUnsigned(49).and(pe.fromNumber(1)).equals(pe.fromNumber(1)) ? (D.high = D.high.or(pe.fromNumber(3).shiftLeft(61)), D.high = D.high.or(pe.fromNumber(I).and(pe.fromNumber(16383).shiftLeft(47))), D.high = D.high.or(C.high.and(pe.fromNumber(140737488355327)))) : (D.high = D.high.or(pe.fromNumber(I & 16383).shiftLeft(49)), D.high = D.high.or(C.high.and(pe.fromNumber(562949953421311)))), D.low = C.low, a && (D.high = D.high.or(pe.fromString("9223372036854775808")));
    const M = j.allocateUnsafe(16);
    return T = 0, M[T++] = D.low.low & 255, M[T++] = D.low.low >> 8 & 255, M[T++] = D.low.low >> 16 & 255, M[T++] = D.low.low >> 24 & 255, M[T++] = D.low.high & 255, M[T++] = D.low.high >> 8 & 255, M[T++] = D.low.high >> 16 & 255, M[T++] = D.low.high >> 24 & 255, M[T++] = D.high.low & 255, M[T++] = D.high.low >> 8 & 255, M[T++] = D.high.low >> 16 & 255, M[T++] = D.high.low >> 24 & 255, M[T++] = D.high.high & 255, M[T++] = D.high.high >> 8 & 255, M[T++] = D.high.high >> 16 & 255, M[T++] = D.high.high >> 24 & 255, new Br(M);
  }
  toString() {
    let r, n = 0;
    const a = new Array(36);
    for (let T = 0; T < a.length; T++)
      a[T] = 0;
    let i = 0, s = !1, f, c = { parts: [0, 0, 0, 0] }, o, l;
    const h = [];
    i = 0;
    const u = this.bytes, x = u[i++] | u[i++] << 8 | u[i++] << 16 | u[i++] << 24, g = u[i++] | u[i++] << 8 | u[i++] << 16 | u[i++] << 24, d = u[i++] | u[i++] << 8 | u[i++] << 16 | u[i++] << 24, m = u[i++] | u[i++] << 8 | u[i++] << 16 | u[i++] << 24;
    i = 0, {
      low: new pe(x, g),
      high: new pe(d, m)
    }.high.lessThan(pe.ZERO) && h.push("-");
    const y = m >> 26 & PE;
    if (y >> 3 === 3) {
      if (y === ME)
        return h.join("") + "Infinity";
      if (y === UE)
        return "NaN";
      r = m >> 15 & Zf, f = 8 + (m >> 14 & 1);
    } else
      f = m >> 14 & 7, r = m >> 17 & Zf;
    const v = r - Yf;
    if (c.parts[0] = (m & 16383) + ((f & 15) << 14), c.parts[1] = d, c.parts[2] = g, c.parts[3] = x, c.parts[0] === 0 && c.parts[1] === 0 && c.parts[2] === 0 && c.parts[3] === 0)
      s = !0;
    else
      for (l = 3; l >= 0; l--) {
        let T = 0;
        const N = WE(c);
        if (c = N.quotient, T = N.rem.low, !!T)
          for (o = 8; o >= 0; o--)
            a[l * 9 + o] = T % 10, T = Math.floor(T / 10);
      }
    if (s)
      n = 1, a[i] = 0;
    else
      for (n = 36; !a[i]; )
        n = n - 1, i = i + 1;
    const I = n - 1 + v;
    if (I >= 34 || I <= -7 || v > 0) {
      if (n > 34)
        return h.push("0"), v > 0 ? h.push(`E+${v}`) : v < 0 && h.push(`E${v}`), h.join("");
      h.push(`${a[i++]}`), n = n - 1, n && h.push(".");
      for (let T = 0; T < n; T++)
        h.push(`${a[i++]}`);
      h.push("E"), I > 0 ? h.push(`+${I}`) : h.push(`${I}`);
    } else if (v >= 0)
      for (let T = 0; T < n; T++)
        h.push(`${a[i++]}`);
    else {
      let T = n + v;
      if (T > 0)
        for (let N = 0; N < T; N++)
          h.push(`${a[i++]}`);
      else
        h.push("0");
      for (h.push("."); T++ < 0; )
        h.push("0");
      for (let N = 0; N < n - Math.max(T - 1, 0); N++)
        h.push(`${a[i++]}`);
    }
    return h.join("");
  }
  toJSON() {
    return { $numberDecimal: this.toString() };
  }
  toExtendedJSON() {
    return { $numberDecimal: this.toString() };
  }
  static fromExtendedJSON(r) {
    return Br.fromString(r.$numberDecimal);
  }
  inspect(r, n, a) {
    return a ?? (a = qr), `new Decimal128(${a(this.toString(), n)})`;
  }
}
class gt extends Zr {
  constructor(r) {
    super();
    ge(this, "value");
    r instanceof Number && (r = r.valueOf()), this.value = +r;
  }
  get _bsontype() {
    return "Double";
  }
  static fromString(r) {
    const n = Number(r);
    if (r === "NaN")
      return new gt(NaN);
    if (r === "Infinity")
      return new gt(1 / 0);
    if (r === "-Infinity")
      return new gt(-1 / 0);
    if (!Number.isFinite(n))
      throw new J(`Input: ${r} is not representable as a Double`);
    if (r.trim() !== r)
      throw new J(`Input: '${r}' contains whitespace`);
    if (r === "")
      throw new J("Input is an empty string");
    if (/[^-0-9.+eE]/.test(r))
      throw new J(`Input: '${r}' is not in decimal or exponential notation`);
    return new gt(n);
  }
  valueOf() {
    return this.value;
  }
  toJSON() {
    return this.value;
  }
  toString(r) {
    return this.value.toString(r);
  }
  toExtendedJSON(r) {
    return r && (r.legacy || r.relaxed && isFinite(this.value)) ? this.value : Object.is(Math.sign(this.value), -0) ? { $numberDouble: "-0.0" } : {
      $numberDouble: Number.isInteger(this.value) ? this.value.toFixed(1) : this.value.toString()
    };
  }
  static fromExtendedJSON(r, n) {
    const a = parseFloat(r.$numberDouble);
    return n && n.relaxed ? a : new gt(a);
  }
  inspect(r, n, a) {
    return a ?? (a = qr), `new Double(${a(this.value, n)})`;
  }
}
class sn extends Zr {
  constructor(r) {
    super();
    ge(this, "value");
    r instanceof Number && (r = r.valueOf()), this.value = +r | 0;
  }
  get _bsontype() {
    return "Int32";
  }
  static fromString(r) {
    const n = Bl(r), a = Number(r);
    if (ti < a)
      throw new J(`Input: '${r}' is larger than the maximum value for Int32`);
    if (ni > a)
      throw new J(`Input: '${r}' is smaller than the minimum value for Int32`);
    if (Number.isSafeInteger(a)) {
      if (a.toString() !== n)
        throw new J(`Input: '${r}' is not a valid Int32 string`);
    } else throw new J(`Input: '${r}' is not a safe integer`);
    return new sn(a);
  }
  valueOf() {
    return this.value;
  }
  toString(r) {
    return this.value.toString(r);
  }
  toJSON() {
    return this.value;
  }
  toExtendedJSON(r) {
    return r && (r.relaxed || r.legacy) ? this.value : { $numberInt: this.value.toString() };
  }
  static fromExtendedJSON(r, n) {
    return n && n.relaxed ? parseInt(r.$numberInt, 10) : new sn(r.$numberInt);
  }
  inspect(r, n, a) {
    return a ?? (a = qr), `new Int32(${a(this.value, n)})`;
  }
}
class sa extends Zr {
  get _bsontype() {
    return "MaxKey";
  }
  toExtendedJSON() {
    return { $maxKey: 1 };
  }
  static fromExtendedJSON() {
    return new sa();
  }
  inspect() {
    return "new MaxKey()";
  }
}
class fa extends Zr {
  get _bsontype() {
    return "MinKey";
  }
  toExtendedJSON() {
    return { $minKey: 1 };
  }
  static fromExtendedJSON() {
    return new fa();
  }
  inspect() {
    return "new MinKey()";
  }
}
const pa = /* @__PURE__ */ new WeakMap(), zr = [];
for (let e = 0; e < 256; e++)
  zr.push(e.toString(16).padStart(2, "0"));
const Yi = new Int8Array(103);
for (let e = 48; e <= 57; e++)
  Yi[e] = e - 48;
for (let e = 65; e <= 70; e++)
  Yi[e] = e - 55;
for (let e = 97; e <= 102; e++)
  Yi[e] = e - 87;
var i, s, f, c;
const Ue = class Ue extends Zr {
  constructor(r, n) {
    super();
    ge(this, "i0");
    ge(this, "i1");
    ge(this, "i2");
    ge(this, "i3");
    if (typeof n == "number") {
      this.setFromBytes(r, n);
      return;
    }
    let a;
    if (typeof r == "object" && r && "id" in r) {
      if (Ue.is(r) && typeof r.i0 == "number" && typeof r.i1 == "number" && typeof r.i2 == "number" && typeof r.i3 == "number") {
        this.i0 = r.i0, this.i1 = r.i1, this.i2 = r.i2, this.i3 = r.i3;
        return;
      }
      if (typeof r.id != "string" && !ArrayBuffer.isView(r.id))
        throw new J("Argument passed in must have an id that is of type string or Buffer");
      "toHexString" in r && typeof r.toHexString == "function" ? a = j.fromHex(r.toHexString()) : a = r.id;
    } else
      a = r;
    if (a == null) {
      const i = Math.floor(Date.now() / 1e3), s = Ue.getInc(), f = Ue.PROCESS_UNIQUE ?? (Ue.PROCESS_UNIQUE = j.randomBytes(5));
      this.i0 = i >>> 8 & 16777215, this.i1 = (i & 255) << 16 | f[0] << 8 | f[1], this.i2 = f[2] << 16 | f[3] << 8 | f[4], this.i3 = s & 16777215;
    } else if (ArrayBuffer.isView(a) && a.byteLength === 12)
      this.setFromBytes(a instanceof Uint8Array ? a : j.toLocalBufferType(a));
    else if (typeof a == "string")
      if (Ue.validateHexString(a))
        this.setFromHex(a), Ue.cacheHexString && pa.set(this, a);
      else
        throw new J("input must be a 24 character hex string, 12 byte Uint8Array, or an integer");
    else
      throw new J("Argument passed in does not match the accepted types");
  }
  get _bsontype() {
    return "ObjectId";
  }
  setFromBytes(r, n = 0) {
    this.i0 = r[n] << 16 | r[n + 1] << 8 | r[n + 2], this.i1 = r[n + 3] << 16 | r[n + 4] << 8 | r[n + 5], this.i2 = r[n + 6] << 16 | r[n + 7] << 8 | r[n + 8], this.i3 = r[n + 9] << 16 | r[n + 10] << 8 | r[n + 11];
  }
  setFromHex(r) {
    const n = Yi;
    this.i0 = n[r.charCodeAt(0)] << 20 | n[r.charCodeAt(1)] << 16 | n[r.charCodeAt(2)] << 12 | n[r.charCodeAt(3)] << 8 | n[r.charCodeAt(4)] << 4 | n[r.charCodeAt(5)], this.i1 = n[r.charCodeAt(6)] << 20 | n[r.charCodeAt(7)] << 16 | n[r.charCodeAt(8)] << 12 | n[r.charCodeAt(9)] << 8 | n[r.charCodeAt(10)] << 4 | n[r.charCodeAt(11)], this.i2 = n[r.charCodeAt(12)] << 20 | n[r.charCodeAt(13)] << 16 | n[r.charCodeAt(14)] << 12 | n[r.charCodeAt(15)] << 8 | n[r.charCodeAt(16)] << 4 | n[r.charCodeAt(17)], this.i3 = n[r.charCodeAt(18)] << 20 | n[r.charCodeAt(19)] << 16 | n[r.charCodeAt(20)] << 12 | n[r.charCodeAt(21)] << 8 | n[r.charCodeAt(22)] << 4 | n[r.charCodeAt(23)];
  }
  get id() {
    const r = j.allocateUnsafe(12);
    return r[0] = this.i0 >>> 16 & 255, r[1] = this.i0 >>> 8 & 255, r[2] = this.i0 & 255, r[3] = this.i1 >>> 16 & 255, r[4] = this.i1 >>> 8 & 255, r[5] = this.i1 & 255, r[6] = this.i2 >>> 16 & 255, r[7] = this.i2 >>> 8 & 255, r[8] = this.i2 & 255, r[9] = this.i3 >>> 16 & 255, r[10] = this.i3 >>> 8 & 255, r[11] = this.i3 & 255, r;
  }
  set id(r) {
    const n = r instanceof Uint8Array ? r : j.toLocalBufferType(r);
    this.setFromBytes(n), Ue.cacheHexString && pa.set(this, j.toHex(n));
  }
  static validateHexString(r) {
    if ((r == null ? void 0 : r.length) !== 24)
      return !1;
    for (let n = 0; n < 24; n++) {
      const a = r.charCodeAt(n);
      if (!(a >= 48 && a <= 57 || a >= 97 && a <= 102 || a >= 65 && a <= 70))
        return !1;
    }
    return !0;
  }
  toHexString() {
    if (Ue.cacheHexString) {
      const f = pa.get(this);
      if (f)
        return f;
    }
    const r = this.i0, n = this.i1, a = this.i2, i = this.i3, s = zr[r >>> 16 & 255] + zr[r >>> 8 & 255] + zr[r & 255] + zr[n >>> 16 & 255] + zr[n >>> 8 & 255] + zr[n & 255] + zr[a >>> 16 & 255] + zr[a >>> 8 & 255] + zr[a & 255] + zr[i >>> 16 & 255] + zr[i >>> 8 & 255] + zr[i & 255];
    return Ue.cacheHexString && pa.set(this, s), s;
  }
  static getInc() {
    return Ue.index = (Ue.index + 1) % 16777216;
  }
  static generate(r) {
    typeof r != "number" && (r = Math.floor(Date.now() / 1e3));
    const n = Ue.getInc(), a = j.allocateUnsafe(12);
    we.setInt32BE(a, 0, r);
    const i = this.PROCESS_UNIQUE ?? (this.PROCESS_UNIQUE = j.randomBytes(5));
    return a[4] = i[0], a[5] = i[1], a[6] = i[2], a[7] = i[3], a[8] = i[4], a[11] = n & 255, a[10] = n >>> 8 & 255, a[9] = n >>> 16 & 255, a;
  }
  toString(r) {
    return r === "base64" ? j.toBase64(this.id) : r === "hex" ? this.toHexString() : this.toHexString();
  }
  toJSON() {
    return this.toHexString();
  }
  static is(r) {
    return r != null && typeof r == "object" && "_bsontype" in r && r._bsontype === "ObjectId";
  }
  equals(r) {
    if (r == null)
      return !1;
    if (Ue.is(r) && typeof r.i0 == "number" && typeof r.i1 == "number" && typeof r.i2 == "number" && typeof r.i3 == "number")
      return this.i3 === r.i3 && this.i0 === r.i0 && this.i1 === r.i1 && this.i2 === r.i2;
    if (typeof r == "string")
      return r.toLowerCase() === this.toHexString();
    if (typeof r == "object" && typeof r.toHexString == "function") {
      const n = r.toHexString(), a = this.toHexString();
      return typeof n == "string" && n.toLowerCase() === a;
    }
    return !1;
  }
  getTimestamp() {
    const r = /* @__PURE__ */ new Date(), n = this.i0 * 256 + (this.i1 >>> 16);
    return r.setTime(n * 1e3), r;
  }
  static createPk() {
    return new Ue();
  }
  serializeInto(r, n) {
    return r[n] = this.i0 >>> 16 & 255, r[n + 1] = this.i0 >>> 8 & 255, r[n + 2] = this.i0 & 255, r[n + 3] = this.i1 >>> 16 & 255, r[n + 4] = this.i1 >>> 8 & 255, r[n + 5] = this.i1 & 255, r[n + 6] = this.i2 >>> 16 & 255, r[n + 7] = this.i2 >>> 8 & 255, r[n + 8] = this.i2 & 255, r[n + 9] = this.i3 >>> 16 & 255, r[n + 10] = this.i3 >>> 8 & 255, r[n + 11] = this.i3 & 255, 12;
  }
  static createFromTime(r) {
    const n = j.allocate(12);
    for (let a = 11; a >= 4; a--)
      n[a] = 0;
    return we.setInt32BE(n, 0, r), new Ue(n);
  }
  static createFromHexString(r) {
    if ((r == null ? void 0 : r.length) !== 24)
      throw new J("hex string must be 24 characters");
    return new Ue(j.fromHex(r));
  }
  static createFromBase64(r) {
    if ((r == null ? void 0 : r.length) !== 16)
      throw new J("base64 string must be 16 characters");
    return new Ue(j.fromBase64(r));
  }
  static isValid(r) {
    if (r == null)
      return !1;
    if (typeof r == "string")
      return Ue.validateHexString(r);
    try {
      return new Ue(r), !0;
    } catch {
      return !1;
    }
  }
  toExtendedJSON() {
    return this.toHexString ? { $oid: this.toHexString() } : { $oid: this.toString("hex") };
  }
  static fromExtendedJSON(r) {
    return new Ue(r.$oid);
  }
  isCached() {
    return Ue.cacheHexString && pa.has(this);
  }
  inspect(r, n, a) {
    return a ?? (a = qr), `new ObjectId(${a(this.toHexString(), n)})`;
  }
};
ge(Ue, "index", 0), ge(Ue, "PROCESS_UNIQUE", null), ge(Ue, "resetState", () => {
  Ue.index = Math.floor(Math.random() * 16777216), Ue.PROCESS_UNIQUE = null;
}), (() => {
  Ue.resetState();
  let r, n = !1;
  try {
    r = ((s = (i = globalThis == null ? void 0 : globalThis.process) == null ? void 0 : i.getBuiltinModule) == null ? void 0 : s.call(i, "v8")) ?? {};
  } catch {
  }
  const a = r == null ? void 0 : r.startupSnapshot;
  try {
    n = (f = a == null ? void 0 : a.isBuildingSnapshot) == null ? void 0 : f.call(a);
  } catch {
  }
  n && ((c = a == null ? void 0 : a.addDeserializeCallback) == null || c.call(a, Ue.resetState));
})(), ge(Ue, "cacheHexString");
let An = Ue;
function $E(e, t, r) {
  const n = [
    { object: e, ignoreUndefined: r ?? !1, exit: !1 }
  ], a = /* @__PURE__ */ new Set();
  let i = 0;
  for (; n.length > 0; ) {
    const s = n.pop();
    if (s.exit) {
      a.delete(s.object);
      continue;
    }
    const { object: f, ignoreUndefined: c } = s;
    a.add(f), s.exit = !0, n.push(s), i += 5;
    const o = Array.isArray(f), l = !o && (f instanceof Map || Gi(f));
    let h = f;
    if (!o && !l && typeof (f == null ? void 0 : f.toBSON) == "function" && (h = f.toBSON()), o) {
      const u = h;
      for (let x = 0; x < u.length; x++)
        i += ds(x.toString(), u[x], t, !0, c, n, a);
    } else if (l)
      for (const [u, x] of h)
        i += ds(u, x, t, !1, c, n, a);
    else
      for (const u of Object.keys(h))
        i += ds(u, h[u], t, !1, c, n, a);
  }
  return i;
}
function ds(e, t, r = !1, n = !1, a = !1, i, s) {
  switch (typeof (t == null ? void 0 : t.toBSON) == "function" && (t = t.toBSON()), typeof t) {
    case "string":
      return 1 + j.utf8ByteLength(e) + 1 + 4 + j.utf8ByteLength(t) + 1;
    case "number":
      return Math.floor(t) === t && t >= _l && t <= wl && !Object.is(t, -0) && t >= ni && t <= ti ? j.utf8ByteLength(e) + 1 + 5 : j.utf8ByteLength(e) + 1 + 9;
    case "undefined":
      return n || !a ? j.utf8ByteLength(e) + 1 + 1 : 0;
    case "boolean":
      return j.utf8ByteLength(e) + 1 + 2;
    case "object":
      if (t != null && typeof t._bsontype == "string" && t[Xi] !== ri)
        throw new ji();
      if (t == null || t._bsontype === "MinKey" || t._bsontype === "MaxKey")
        return j.utf8ByteLength(e) + 1 + 1;
      if (t._bsontype === "ObjectId")
        return j.utf8ByteLength(e) + 1 + 13;
      if (t instanceof Date || Di(t))
        return j.utf8ByteLength(e) + 1 + 9;
      if (ArrayBuffer.isView(t) || t instanceof ArrayBuffer || w0(t))
        return j.utf8ByteLength(e) + 1 + 6 + t.byteLength;
      if (t._bsontype === "Long" || t._bsontype === "Double" || t._bsontype === "Timestamp")
        return j.utf8ByteLength(e) + 1 + 9;
      if (t._bsontype === "Decimal128")
        return j.utf8ByteLength(e) + 1 + 17;
      if (t._bsontype === "Int32")
        return j.utf8ByteLength(e) + 1 + 5;
      if (t._bsontype === "Code")
        if (t.scope != null && typeof t.scope == "object") {
          if (s.has(t.scope))
            throw new J("Cannot convert circular structure to BSON");
          return i.push({ object: t.scope, ignoreUndefined: a, exit: !1 }), j.utf8ByteLength(e) + 1 + 1 + 4 + 4 + j.utf8ByteLength(t.code.toString()) + 1;
        } else
          return j.utf8ByteLength(e) + 1 + 1 + 4 + j.utf8ByteLength(t.code.toString()) + 1;
      else if (t._bsontype === "Binary") {
        const f = t;
        return f.sub_type === fr.SUBTYPE_BYTE_ARRAY ? j.utf8ByteLength(e) + 1 + (f.position + 1 + 4 + 1 + 4) : j.utf8ByteLength(e) + 1 + (f.position + 1 + 4 + 1);
      } else {
        if (t._bsontype === "BSONSymbol")
          return j.utf8ByteLength(e) + 1 + j.utf8ByteLength(t.value) + 4 + 1 + 1;
        if (t._bsontype === "DBRef") {
          const f = Object.assign({
            $ref: t.collection,
            $id: t.oid
          }, t.fields);
          return t.db != null && (f.$db = t.db), i.push({ object: f, ignoreUndefined: !0, exit: !1 }), j.utf8ByteLength(e) + 1 + 1;
        } else {
          if (t instanceof RegExp || Bi(t))
            return j.utf8ByteLength(e) + 1 + 1 + j.utf8ByteLength(t.source) + 1 + (t.global ? 1 : 0) + (t.ignoreCase ? 1 : 0) + (t.multiline ? 1 : 0) + 1;
          if (t._bsontype === "BSONRegExp")
            return j.utf8ByteLength(e) + 1 + 1 + j.utf8ByteLength(t.pattern) + 1 + j.utf8ByteLength(t.options) + 1;
          if (s.has(t))
            throw new J("Cannot convert circular structure to BSON");
          return i.push({ object: t, ignoreUndefined: a, exit: !1 }), j.utf8ByteLength(e) + 1 + 1;
        }
      }
    case "function":
      return r ? j.utf8ByteLength(e) + 1 + 1 + 4 + j.utf8ByteLength(t.toString()) + 1 : 0;
    case "bigint":
      return j.utf8ByteLength(e) + 1 + 9;
    case "symbol":
      return 0;
    default:
      throw new J(`Unrecognized JS type: ${typeof t}`);
  }
}
function zE(e) {
  return e.split("").sort().join("");
}
class vt extends Zr {
  constructor(r, n) {
    super();
    ge(this, "pattern");
    ge(this, "options");
    if (this.pattern = r, this.options = zE(n ?? ""), this.pattern.indexOf("\0") !== -1)
      throw new J(`BSON Regex patterns cannot contain null bytes, found: ${JSON.stringify(this.pattern)}`);
    if (this.options.indexOf("\0") !== -1)
      throw new J(`BSON Regex options cannot contain null bytes, found: ${JSON.stringify(this.options)}`);
    for (let a = 0; a < this.options.length; a++)
      if (!(this.options[a] === "i" || this.options[a] === "m" || this.options[a] === "x" || this.options[a] === "l" || this.options[a] === "s" || this.options[a] === "u"))
        throw new J(`The regular expression option [${this.options[a]}] is not supported`);
  }
  get _bsontype() {
    return "BSONRegExp";
  }
  static parseOptions(r) {
    return r ? r.split("").sort().join("") : "";
  }
  toExtendedJSON(r) {
    return r = r || {}, r.legacy ? { $regex: this.pattern, $options: this.options } : { $regularExpression: { pattern: this.pattern, options: this.options } };
  }
  static fromExtendedJSON(r) {
    if ("$regex" in r)
      if (typeof r.$regex != "string") {
        if (r.$regex._bsontype === "BSONRegExp")
          return r;
      } else
        return new vt(r.$regex, vt.parseOptions(r.$options));
    if ("$regularExpression" in r)
      return new vt(r.$regularExpression.pattern, vt.parseOptions(r.$regularExpression.options));
    throw new J(`Unexpected BSONRegExp EJSON object form: ${JSON.stringify(r)}`);
  }
  inspect(r, n, a) {
    const i = dE(n) ?? ((c) => c);
    a ?? (a = qr);
    const s = i(a(this.pattern), "regexp"), f = i(a(this.options), "regexp");
    return `new BSONRegExp(${s}, ${f})`;
  }
}
class ca extends Zr {
  constructor(r) {
    super();
    ge(this, "value");
    this.value = r;
  }
  get _bsontype() {
    return "BSONSymbol";
  }
  valueOf() {
    return this.value;
  }
  toString() {
    return this.value;
  }
  toJSON() {
    return this.value;
  }
  toExtendedJSON() {
    return { $symbol: this.value };
  }
  static fromExtendedJSON(r) {
    return new ca(r.$symbol);
  }
  inspect(r, n, a) {
    return a ?? (a = qr), `new BSONSymbol(${a(this.value, n)})`;
  }
}
const GE = pe, Jt = class Jt extends GE {
  get _bsontype() {
    return "Timestamp";
  }
  get [ia]() {
    return "Timestamp";
  }
  get i() {
    return this.low >>> 0;
  }
  get t() {
    return this.high >>> 0;
  }
  constructor(t) {
    if (t == null)
      super(0, 0, !0);
    else if (typeof t == "bigint")
      super(t, !0);
    else if (pe.isLong(t))
      super(t.low, t.high, !0);
    else if (typeof t == "object" && "t" in t && "i" in t) {
      if (typeof t.t != "number" && (typeof t.t != "object" || t.t._bsontype !== "Int32"))
        throw new J("Timestamp constructed from { t, i } must provide t as a number");
      if (typeof t.i != "number" && (typeof t.i != "object" || t.i._bsontype !== "Int32"))
        throw new J("Timestamp constructed from { t, i } must provide i as a number");
      const r = Number(t.t), n = Number(t.i);
      if (r < 0 || Number.isNaN(r))
        throw new J("Timestamp constructed from { t, i } must provide a positive t");
      if (n < 0 || Number.isNaN(n))
        throw new J("Timestamp constructed from { t, i } must provide a positive i");
      if (r > 4294967295)
        throw new J("Timestamp constructed from { t, i } must provide t equal or less than uint32 max");
      if (n > 4294967295)
        throw new J("Timestamp constructed from { t, i } must provide i equal or less than uint32 max");
      super(n, r, !0);
    } else
      throw new J("A Timestamp can only be constructed with: bigint, Long, or { t: number; i: number }");
  }
  toJSON() {
    return {
      $timestamp: this.toString()
    };
  }
  static fromInt(t) {
    return new Jt(pe.fromInt(t, !0));
  }
  static fromNumber(t) {
    return new Jt(pe.fromNumber(t, !0));
  }
  static fromBits(t, r) {
    return new Jt({ i: t, t: r });
  }
  static fromString(t, r) {
    return new Jt(pe.fromString(t, !0, r));
  }
  toExtendedJSON() {
    return { $timestamp: { t: this.t, i: this.i } };
  }
  static fromExtendedJSON(t) {
    const r = pe.isLong(t.$timestamp.i) ? t.$timestamp.i.getLowBitsUnsigned() : t.$timestamp.i, n = pe.isLong(t.$timestamp.t) ? t.$timestamp.t.getLowBitsUnsigned() : t.$timestamp.t;
    return new Jt({ t: n, i: r });
  }
  inspect(t, r, n) {
    n ?? (n = qr);
    const a = n(this.t, r), i = n(this.i, r);
    return `new Timestamp({ t: ${a}, i: ${i} })`;
  }
};
ge(Jt, "MAX_VALUE", pe.MAX_UNSIGNED_VALUE);
let ea = Jt;
const XE = pe.fromNumber(wl), jE = pe.fromNumber(_l);
function Rl(e, t, r) {
  t = t ?? {};
  const n = t && t.index ? t.index : 0, a = we.getInt32LE(e, n);
  if (a < 5)
    throw new J(`bson size must be >= 5, is ${a}`);
  if (t.allowObjectSmallerThanBufferSize && e.length < a)
    throw new J(`buffer length ${e.length} must be >= bson size ${a}`);
  if (!t.allowObjectSmallerThanBufferSize && e.length !== a)
    throw new J(`buffer length ${e.length} must === bson size ${a}`);
  if (a + n > e.byteLength)
    throw new J(`(bson size ${a} + options.index ${n} must be <= buffer length ${e.byteLength})`);
  if (e[n + a - 1] !== 0)
    throw new J("One object, sized correctly, with a spot for an EOO, but the EOO isn't 0x00");
  return YE(e, n, t, r);
}
const ec = /^\$ref$|^\$id$|^\$db$/;
function rc(e, t, r) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    value: r,
    writable: !0,
    enumerable: !0,
    configurable: !0
  }) : e[t] = r;
}
function tc(e) {
  if (Il(e)) {
    const { $ref: t, $id: r, $db: n, ...a } = e;
    return new Wt(t, r, n, a);
  }
  return e;
}
function YE(e, t, r, n = !1) {
  r = { ...r };
  const a = r.fieldsAsRaw == null ? null : r.fieldsAsRaw, i = r.raw == null ? !1 : r.raw, s = typeof r.bsonRegExp == "boolean" ? r.bsonRegExp : !1, f = r.promoteBuffers ?? !1, c = r.promoteLongs ?? !0, o = r.promoteValues ?? !0, l = r.useBigInt64 ?? !1;
  if (l && !o)
    throw new J("Must either request bigint or Long for int64 deserialization");
  if (l && !c)
    throw new J("Must either request bigint or Long for int64 deserialization");
  const h = r.validation == null ? { utf8: !0 } : r.validation;
  let u = !0, x, g;
  const d = h.utf8;
  if (typeof d == "boolean")
    x = d;
  else {
    u = !1;
    const C = Object.keys(d).map(function(D) {
      return d[D];
    });
    if (C.length === 0)
      throw new J("UTF-8 validation setting cannot be empty");
    if (typeof C[0] != "boolean")
      throw new J("Invalid UTF-8 validation option, must specify boolean values");
    if (x = C[0], !C.every((D) => D === x))
      throw new J("Invalid UTF-8 validation option - keys must be all true or all false");
  }
  if (!u) {
    g = /* @__PURE__ */ new Set();
    for (const C of Object.keys(d))
      g.add(C);
  }
  const m = t;
  if (e.length < 5)
    throw new J("corrupt bson message < 5 bytes long");
  const w = we.getInt32LE(e, t);
  if (t += 4, w < 5 || w > e.length)
    throw new J("corrupt bson message");
  const y = n ? [] : {};
  let v = 0, I = n ? !1 : null, T = null, N = y, k = n;
  for (; ; ) {
    const C = e[t++];
    if (C === 0)
      if (T)
        if (t === T.lastIndex) {
          const W = T;
          T = W.prev, T === null ? (N = y, k = n) : (N = T.holdingDocument, k = T.isArray);
          let ee = W.holdingDocument;
          switch (W.elementType) {
            case Oa:
              W.isPossibleDBRef && (ee = tc(ee));
              break;
            case Ea:
              break;
            case wi:
              ee = new an(W.functionString, W.holdingDocument);
              break;
            default:
              throw new J("Unexpected element type in frame stack");
          }
          rc(N, W.propertyName, ee);
          continue;
        } else
          throw T.elementType === Ea ? new J("corrupted array bson") : new J("Bad BSON Document: object not properly terminated");
      else
        break;
    let D = t;
    for (; e[D] !== 0 && D < e.length; )
      D++;
    if (D >= e.byteLength)
      throw new J("Bad BSON Document: illegal CString");
    const M = k ? T !== null ? T.arrayIndex++ : v++ : j.toUTF8(e, t, D, !1);
    let B;
    T !== null ? B = T.validationSetting : u || g != null && g.has(M) ? B = x : B = !x, T !== null ? T.isPossibleDBRef !== !1 && typeof M == "string" && M[0] === "$" && (T.isPossibleDBRef = ec.test(M)) : I !== !1 && M[0] === "$" && (I = ec.test(M));
    let Y, he = !1;
    if (t = D + 1, C === El) {
      const W = we.getInt32LE(e, t);
      if (t += 4, W <= 0 || W > e.length - t || e[t + W - 1] !== 0)
        throw new J("bad string length in bson");
      Y = j.toUTF8(e, t, t + W - 1, B), t = t + W;
    } else if (C === yl)
      Y = new An(e, t), t = t + 12;
    else if (C === Xa && o === !1)
      Y = new sn(we.getInt32LE(e, t)), t += 4;
    else if (C === Xa)
      Y = we.getInt32LE(e, t), t += 4;
    else if (C === _0)
      Y = we.getFloat64LE(e, t), t += 8, o === !1 && (Y = new gt(Y));
    else if (C === Sl) {
      const W = we.getInt32LE(e, t), ee = we.getInt32LE(e, t + 4);
      t += 8, Y = new Date(new pe(W, ee).toNumber());
    } else if (C === Tl) {
      if (e[t] !== 0 && e[t] !== 1)
        throw new J("illegal boolean type value");
      Y = e[t++] === 1;
    } else if (C === Oa) {
      const W = we.getInt32LE(e, t);
      if (W < 5 || W > e.length - t)
        throw new J("bad embedded document length in bson");
      if (i || ((T == null ? void 0 : T.raw) ?? !1))
        Y = e.subarray(t, t + W), t = t + W;
      else {
        he = !0;
        const ee = {
          holdingDocument: {},
          elementType: Oa,
          propertyName: M,
          functionString: null,
          lastIndex: t + W,
          isArray: !1,
          arrayIndex: 0,
          raw: !1,
          isPossibleDBRef: null,
          validationSetting: B,
          prev: T
        };
        T = ee, N = ee.holdingDocument, k = !1, t = t + 4;
      }
    } else if (C === Ea) {
      const W = we.getInt32LE(e, t);
      if (W < 5 || W > e.length - t)
        throw new J("bad embedded array length in bson");
      const ee = t + W, ne = !!(a && a[M]) || ((T == null ? void 0 : T.raw) ?? !1);
      he = !0;
      const De = {
        holdingDocument: [],
        elementType: Ea,
        propertyName: M,
        functionString: null,
        lastIndex: ee,
        isArray: !0,
        arrayIndex: 0,
        raw: ne,
        isPossibleDBRef: !1,
        validationSetting: B,
        prev: T
      };
      T = De, N = De.holdingDocument, k = !0, t = t + 4;
    } else if (C === gE)
      Y = void 0;
    else if (C === y0)
      Y = null;
    else if (C === S0)
      if (l)
        Y = we.getBigInt64LE(e, t), t += 8;
      else {
        const W = we.getInt32LE(e, t), ee = we.getInt32LE(e, t + 4);
        t += 8;
        const ne = new pe(W, ee);
        c && o === !0 ? Y = ne.lessThanOrEqual(XE) && ne.greaterThanOrEqual(jE) ? ne.toNumber() : ne : Y = ne;
      }
    else if (C === Fl) {
      const W = j.allocateUnsafe(16);
      for (let ee = 0; ee < 16; ee++)
        W[ee] = e[t + ee];
      t = t + 16, Y = new Br(W);
    } else if (C === E0) {
      let W = we.getInt32LE(e, t);
      t += 4;
      const ee = W, ne = e[t++];
      if (W < 0)
        throw new J("Negative binary type element size found");
      if (W > e.byteLength)
        throw new J("Binary type size larger than document size");
      if (ne === fr.SUBTYPE_BYTE_ARRAY) {
        if (W = we.getInt32LE(e, t), t += 4, W < 0)
          throw new J("Negative binary type element size found for subtype 0x02");
        if (W > ee - 4)
          throw new J("Binary type with subtype 0x02 contains too long binary size");
        if (W < ee - 4)
          throw new J("Binary type with subtype 0x02 contains too short binary size");
      }
      f && o ? Y = j.toLocalBufferType(e.subarray(t, t + W)) : (Y = new fr(e.subarray(t, t + W), ne), ne === k0 && Sr.isValid(Y) && (Y = Y.toUUID())), t = t + W;
    } else if (C === Ri && s === !1) {
      for (D = t; e[D] !== 0 && D < e.length; )
        D++;
      if (D >= e.length)
        throw new J("Bad BSON Document: illegal CString");
      const W = j.toUTF8(e, t, D, !1);
      for (t = D + 1, D = t; e[D] !== 0 && D < e.length; )
        D++;
      if (D >= e.length)
        throw new J("Bad BSON Document: illegal CString");
      const ee = j.toUTF8(e, t, D, !1);
      t = D + 1;
      const ne = new Array(ee.length);
      for (D = 0; D < ee.length; D++)
        switch (ee[D]) {
          case "m":
            ne[D] = "m";
            break;
          case "s":
            ne[D] = "g";
            break;
          case "i":
            ne[D] = "i";
            break;
        }
      Y = new RegExp(W, ne.join(""));
    } else if (C === Ri && s === !0) {
      for (D = t; e[D] !== 0 && D < e.length; )
        D++;
      if (D >= e.length)
        throw new J("Bad BSON Document: illegal CString");
      const W = j.toUTF8(e, t, D, !1);
      for (t = D + 1, D = t; e[D] !== 0 && D < e.length; )
        D++;
      if (D >= e.length)
        throw new J("Bad BSON Document: illegal CString");
      const ee = j.toUTF8(e, t, D, !1);
      t = D + 1, Y = new vt(W, ee);
    } else if (C === kl) {
      const W = we.getInt32LE(e, t);
      if (t += 4, W <= 0 || W > e.length - t || e[t + W - 1] !== 0)
        throw new J("bad string length in bson");
      const ee = j.toUTF8(e, t, t + W - 1, B);
      Y = o ? ee : new ca(ee), t = t + W;
    } else if (C === Al)
      Y = new ea({
        i: we.getUint32LE(e, t),
        t: we.getUint32LE(e, t + 4)
      }), t += 8;
    else if (C === bl)
      Y = new fa();
    else if (C === Cl)
      Y = new sa();
    else if (C === T0) {
      const W = we.getInt32LE(e, t);
      if (t += 4, W <= 0 || W > e.length - t || e[t + W - 1] !== 0)
        throw new J("bad string length in bson");
      const ee = j.toUTF8(e, t, t + W - 1, B);
      Y = new an(ee), t = t + W;
    } else if (C === wi) {
      const W = we.getInt32LE(e, t);
      if (t += 4, W < 13)
        throw new J("code_w_scope total size shorter minimum expected length");
      const ee = we.getInt32LE(e, t);
      if (t += 4, ee <= 0 || ee > e.length - t || e[t + ee - 1] !== 0)
        throw new J("bad string length in bson");
      const ne = j.toUTF8(e, t, t + ee - 1, B);
      t = t + ee;
      const De = t, H = we.getInt32LE(e, t);
      if (H < 5 || H > e.length - t)
        throw new J("bad scope document size in code_w_scope");
      if (W < 8 + H + ee)
        throw new J("code_w_scope total size is too short, truncating scope");
      if (W > 8 + H + ee)
        throw new J("code_w_scope total size is too long, clips outer document");
      he = !0;
      const _e = {
        holdingDocument: {},
        elementType: wi,
        propertyName: M,
        functionString: ne,
        lastIndex: De + H,
        isArray: !1,
        arrayIndex: 0,
        raw: !1,
        isPossibleDBRef: null,
        validationSetting: B,
        prev: T
      };
      T = _e, N = _e.holdingDocument, k = !1, t = t + 4;
    } else if (C === mE) {
      const W = we.getInt32LE(e, t);
      if (t += 4, W <= 0 || W > e.length - t || e[t + W - 1] !== 0)
        throw new J("bad string length in bson");
      const ee = j.toUTF8(e, t, t + W - 1, B);
      t = t + W;
      const ne = j.allocateUnsafe(12);
      for (let H = 0; H < 12; H++)
        ne[H] = e[t + H];
      const De = new An(ne);
      t = t + 12, Y = new Wt(ee, De);
    } else
      throw new J(`Detected unknown BSON type ${C.toString(16)} for fieldname "${M}"`);
    he || rc(N, M, Y);
  }
  if (T !== null)
    throw new J("corrupted bson, more objects expected based on the current document size");
  const U = y;
  if (w !== t - m)
    throw n ? new J("corrupt array bson") : new J("corrupt object bson");
  return I ? tc(U) : U;
}
const A0 = /\x00/, KE = /* @__PURE__ */ new Set(["$db", "$ref", "$id", "$clusterTime"]);
function JE(e, t, r, n) {
  e[n++] = El;
  const a = j.encodeUTF8Into(e, t, n);
  n = n + a + 1, e[n - 1] = 0;
  const i = j.encodeUTF8Into(e, r, n + 4);
  return we.setInt32LE(e, n, i + 1), n = n + 4 + i, e[n++] = 0, n;
}
function qE(e, t, r, n) {
  const i = !Object.is(r, -0) && Number.isSafeInteger(r) && r <= ti && r >= ni ? Xa : _0;
  e[n++] = i;
  const s = j.encodeUTF8Into(e, t, n);
  return n = n + s, e[n++] = 0, i === Xa ? n += we.setInt32LE(e, n, r) : n += we.setFloat64LE(e, n, r), n;
}
function ZE(e, t, r, n) {
  e[n++] = S0;
  const a = j.encodeUTF8Into(e, t, n);
  return n += a, e[n++] = 0, n += we.setBigInt64LE(e, n, r), n;
}
function nc(e, t, r, n) {
  e[n++] = y0;
  const a = j.encodeUTF8Into(e, t, n);
  return n = n + a, e[n++] = 0, n;
}
function QE(e, t, r, n) {
  e[n++] = Tl;
  const a = j.encodeUTF8Into(e, t, n);
  return n = n + a, e[n++] = 0, e[n++] = r ? 1 : 0, n;
}
function ey(e, t, r, n) {
  e[n++] = Sl;
  const a = j.encodeUTF8Into(e, t, n);
  n = n + a, e[n++] = 0;
  const i = pe.fromNumber(r.getTime()), s = i.getLowBits(), f = i.getHighBits();
  return n += we.setInt32LE(e, n, s), n += we.setInt32LE(e, n, f), n;
}
function ry(e, t, r, n) {
  e[n++] = Ri;
  const a = j.encodeUTF8Into(e, t, n);
  if (n = n + a, e[n++] = 0, r.source && r.source.match(A0) != null)
    throw new J("value " + r.source + " must not contain null bytes");
  return n = n + j.encodeUTF8Into(e, r.source, n), e[n++] = 0, r.ignoreCase && (e[n++] = 105), r.global && (e[n++] = 115), r.multiline && (e[n++] = 109), e[n++] = 0, n;
}
function ty(e, t, r, n) {
  e[n++] = Ri;
  const a = j.encodeUTF8Into(e, t, n);
  if (n = n + a, e[n++] = 0, r.pattern.match(A0) != null)
    throw new J("pattern " + r.pattern + " must not contain null bytes");
  n = n + j.encodeUTF8Into(e, r.pattern, n), e[n++] = 0;
  const i = r.options.split("").sort().join("");
  return n = n + j.encodeUTF8Into(e, i, n), e[n++] = 0, n;
}
function ny(e, t, r, n) {
  r === null ? e[n++] = y0 : r[ia] === "MinKey" ? e[n++] = bl : e[n++] = Cl;
  const a = j.encodeUTF8Into(e, t, n);
  return n = n + a, e[n++] = 0, n;
}
function ay(e, t, r, n) {
  e[n++] = yl;
  const a = j.encodeUTF8Into(e, t, n);
  return n = n + a, e[n++] = 0, n += r.serializeInto(e, n), n;
}
function iy(e, t, r, n) {
  e[n++] = E0;
  const a = j.encodeUTF8Into(e, t, n);
  n = n + a, e[n++] = 0;
  const i = r.length;
  if (n += we.setInt32LE(e, n, i), e[n++] = pE, i <= 16)
    for (let s = 0; s < i; s++)
      e[n + s] = r[s];
  else
    e.set(r, n);
  return n = n + i, n;
}
function sy(e, t, r, n) {
  e[n++] = Fl;
  const a = j.encodeUTF8Into(e, t, n);
  n = n + a, e[n++] = 0;
  for (let i = 0; i < 16; i++)
    e[n + i] = r.bytes[i];
  return n + 16;
}
function fy(e, t, r, n) {
  e[n++] = r[ia] === "Long" ? S0 : Al;
  const a = j.encodeUTF8Into(e, t, n);
  n = n + a, e[n++] = 0;
  const i = r.getLowBits(), s = r.getHighBits();
  return n += we.setInt32LE(e, n, i), n += we.setInt32LE(e, n, s), n;
}
function cy(e, t, r, n) {
  r = r.valueOf(), e[n++] = Xa;
  const a = j.encodeUTF8Into(e, t, n);
  return n = n + a, e[n++] = 0, n += we.setInt32LE(e, n, r), n;
}
function oy(e, t, r, n) {
  e[n++] = _0;
  const a = j.encodeUTF8Into(e, t, n);
  return n = n + a, e[n++] = 0, n += we.setFloat64LE(e, n, r.value), n;
}
function ly(e, t, r, n) {
  e[n++] = T0;
  const a = j.encodeUTF8Into(e, t, n);
  n = n + a, e[n++] = 0;
  const i = r.toString(), s = j.encodeUTF8Into(e, i, n + 4) + 1;
  return we.setInt32LE(e, n, s), n = n + 4 + s - 1, e[n++] = 0, n;
}
function hy(e, t, r, n) {
  e[n++] = E0;
  const a = j.encodeUTF8Into(e, t, n);
  n = n + a, e[n++] = 0;
  const i = r.buffer;
  let s = r.position;
  if (r.sub_type === fr.SUBTYPE_BYTE_ARRAY && (s = s + 4), n += we.setInt32LE(e, n, s), e[n++] = r.sub_type, r.sub_type === fr.SUBTYPE_BYTE_ARRAY && (s = s - 4, n += we.setInt32LE(e, n, s)), r.sub_type === fr.SUBTYPE_VECTOR && It(r), s <= 16)
    for (let f = 0; f < s; f++)
      e[n + f] = i[f];
  else
    e.set(i, n);
  return n = n + r.position, n;
}
function uy(e, t, r, n) {
  e[n++] = kl;
  const a = j.encodeUTF8Into(e, t, n);
  n = n + a, e[n++] = 0;
  const i = j.encodeUTF8Into(e, r.value, n + 4) + 1;
  return we.setInt32LE(e, n, i), n = n + 4 + i - 1, e[n++] = 0, n;
}
function vi(e, t, r, n, a, i) {
  if (Array.isArray(e))
    return {
      sourceObject: e,
      isArray: !0,
      objectSizeIndex: t,
      codeSizeIndex: r,
      iterTarget: e,
      keys: null,
      keyIndex: 0,
      mapIterator: null,
      prev: n,
      checkKeys: a,
      ignoreUndefined: i
    };
  if (e instanceof Map || Gi(e))
    return {
      sourceObject: e,
      isArray: !1,
      objectSizeIndex: t,
      codeSizeIndex: r,
      iterTarget: e,
      keys: null,
      keyIndex: 0,
      mapIterator: e.entries(),
      prev: n,
      checkKeys: a,
      ignoreUndefined: i
    };
  let s = e;
  if (typeof (s == null ? void 0 : s.toBSON) == "function" && (s = s.toBSON(), s != null && typeof s != "object"))
    throw new J("toBSON function did not return an object");
  return {
    sourceObject: e,
    isArray: !1,
    objectSizeIndex: t,
    codeSizeIndex: r,
    iterTarget: s,
    keys: Object.keys(s),
    keyIndex: 0,
    mapIterator: null,
    prev: n,
    checkKeys: a,
    ignoreUndefined: i
  };
}
function Ll(e, t, r, n, a, i, s) {
  if (s == null) {
    if (t == null)
      return e[0] = 5, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, 5;
    if (Array.isArray(t))
      throw new J("serialize does not support an array as the root input");
    if (typeof t != "object")
      throw new J("serialize does not support non-object as the root input");
    if ("_bsontype" in t && typeof t._bsontype == "string")
      throw new J("BSON types cannot be serialized as a document");
    if (Di(t) || Bi(t) || Qn(t) || w0(t))
      throw new J("date, regexp, typedarray, and arraybuffer cannot be BSON documents");
    s = /* @__PURE__ */ new Set();
  }
  s.add(t);
  let f = vi(t, n, null, null, r, i), c = n + 4;
  for (; f !== null; ) {
    const o = f;
    let l, h;
    if (o.mapIterator !== null) {
      const x = o.mapIterator.next();
      if (x.done) {
        e[c++] = 0, we.setInt32LE(e, o.objectSizeIndex, c - o.objectSizeIndex), o.codeSizeIndex !== null && we.setInt32LE(e, o.codeSizeIndex, c - o.codeSizeIndex), s.delete(o.sourceObject), f = o.prev;
        continue;
      }
      l = x.value[0], h = x.value[1];
    } else if (o.keys !== null) {
      if (o.keyIndex >= o.keys.length) {
        e[c++] = 0, we.setInt32LE(e, o.objectSizeIndex, c - o.objectSizeIndex), o.codeSizeIndex !== null && we.setInt32LE(e, o.codeSizeIndex, c - o.codeSizeIndex), s.delete(o.sourceObject), f = o.prev;
        continue;
      }
      l = o.keys[o.keyIndex++], h = o.iterTarget[l];
    } else {
      const x = o.iterTarget;
      if (o.keyIndex >= x.length) {
        e[c++] = 0, we.setInt32LE(e, o.objectSizeIndex, c - o.objectSizeIndex), o.codeSizeIndex !== null && we.setInt32LE(e, o.codeSizeIndex, c - o.codeSizeIndex), s.delete(o.sourceObject), f = o.prev;
        continue;
      }
      const g = o.keyIndex++;
      l = String(g), h = x[g];
    }
    if (typeof (h == null ? void 0 : h.toBSON) == "function" && (h = h.toBSON()), !o.isArray && typeof l == "string" && !(l[0] === "$" && KE.has(l))) {
      if (A0.test(l))
        throw new J("key " + l + " must not contain null bytes");
      if (o.checkKeys) {
        if (l[0] === "$")
          throw new J("key " + l + " must not start with '$'");
        if (l.includes("."))
          throw new J("key " + l + " must not contain '.'");
      }
    }
    const u = typeof h;
    if (h === void 0)
      (o.isArray || o.ignoreUndefined === !1) && (c = nc(e, l, h, c));
    else if (h === null)
      c = nc(e, l, h, c);
    else if (u === "string")
      c = JE(e, l, h, c);
    else if (u === "number")
      c = qE(e, l, h, c);
    else if (u === "bigint")
      c = ZE(e, l, h, c);
    else if (u === "boolean")
      c = QE(e, l, h, c);
    else if (u === "object" && h._bsontype == null)
      if (h instanceof Date || Di(h))
        c = ey(e, l, h, c);
      else if (h instanceof Uint8Array || Qn(h))
        c = iy(e, l, h, c);
      else if (h instanceof RegExp || Bi(h))
        c = ry(e, l, h, c);
      else {
        if (s.has(h))
          throw new J("Cannot convert circular structure to BSON");
        const x = Array.isArray(h);
        e[c++] = x ? Ea : Oa, c += j.encodeUTF8Into(e, l, c), e[c++] = 0;
        const g = c;
        s.add(h), f = vi(h, g, null, o, o.checkKeys, o.ignoreUndefined), c += 4;
      }
    else if (u === "object") {
      if (h[Xi] !== ri)
        throw new ji();
      const x = h[ia];
      if (x === "ObjectId")
        c = ay(e, l, h, c);
      else if (x === "Decimal128")
        c = sy(e, l, h, c);
      else if (x === "Long" || x === "Timestamp")
        c = fy(e, l, h, c);
      else if (x === "Double")
        c = oy(e, l, h, c);
      else if (x === "Code") {
        const g = h;
        if (g.scope && typeof g.scope == "object") {
          e[c++] = wi, c += j.encodeUTF8Into(e, l, c), e[c++] = 0;
          const d = c;
          c += 4;
          const m = g.code, w = j.encodeUTF8Into(e, m, c + 4) + 1;
          we.setInt32LE(e, c, w), e[c + 4 + w - 1] = 0, c = c + w + 4;
          const y = g.scope;
          if (s.has(y))
            throw new J("Cannot convert circular structure to BSON");
          s.add(y), f = vi(y, c, d, o, o.checkKeys, o.ignoreUndefined), c += 4;
        } else {
          e[c++] = T0, c += j.encodeUTF8Into(e, l, c), e[c++] = 0;
          const d = g.code.toString(), m = j.encodeUTF8Into(e, d, c + 4) + 1;
          we.setInt32LE(e, c, m), c = c + 4 + m - 1, e[c++] = 0;
        }
      } else if (x === "Binary")
        c = hy(e, l, h, c);
      else if (x === "BSONSymbol")
        c = uy(e, l, h, c);
      else if (x === "DBRef") {
        const g = h, d = Object.assign({ $ref: g.collection, $id: g.oid }, g.db != null ? { $db: g.db } : null, g.fields);
        e[c++] = Oa, c += j.encodeUTF8Into(e, l, c), e[c++] = 0, s.add(d), f = vi(d, c, null, o, !1, !0), c += 4;
      } else if (x === "BSONRegExp")
        c = ty(e, l, h, c);
      else if (x === "Int32")
        c = cy(e, l, h, c);
      else if (x === "MinKey" || x === "MaxKey")
        c = ny(e, l, h, c);
      else if (typeof h._bsontype < "u")
        throw new J(`Unrecognized or invalid _bsontype: ${String(h._bsontype)}`);
    } else u === "function" && a && (c = ly(e, l, h, c));
  }
  return c;
}
function xy(e) {
  return e != null && typeof e == "object" && "_bsontype" in e && typeof e._bsontype == "string";
}
const dy = {
  $oid: An,
  $binary: fr,
  $uuid: fr,
  $symbol: ca,
  $numberInt: sn,
  $numberDecimal: Br,
  $numberDouble: gt,
  $numberLong: pe,
  $minKey: fa,
  $maxKey: sa,
  $regex: vt,
  $regularExpression: vt,
  $timestamp: ea
};
function Pl(e, t = {}) {
  if (typeof e == "number") {
    const n = e <= ti && e >= ni, a = e <= pl && e >= vl;
    if (t.relaxed || t.legacy)
      return e;
    if (Number.isInteger(e) && !Object.is(e, -0)) {
      if (n)
        return new sn(e);
      if (a)
        return t.useBigInt64 ? BigInt(e) : pe.fromNumber(e);
    }
    return new gt(e);
  }
  if (e == null || typeof e != "object")
    return e;
  if (e.$undefined)
    return null;
  const r = Object.keys(e).filter((n) => n.startsWith("$") && e[n] != null);
  for (let n = 0; n < r.length; n++) {
    const a = dy[r[n]];
    if (a)
      return a.fromExtendedJSON(e, t);
  }
  if (e.$date != null) {
    const n = e.$date, a = /* @__PURE__ */ new Date();
    if (t.legacy)
      if (typeof n == "number")
        a.setTime(n);
      else if (typeof n == "string")
        a.setTime(Date.parse(n));
      else if (typeof n == "bigint")
        a.setTime(Number(n));
      else
        throw new Os(`Unrecognized type for EJSON date: ${typeof n}`);
    else if (typeof n == "string")
      a.setTime(Date.parse(n));
    else if (pe.isLong(n))
      a.setTime(n.toNumber());
    else if (typeof n == "number" && t.relaxed)
      a.setTime(n);
    else if (typeof n == "bigint")
      a.setTime(Number(n));
    else
      throw new Os(`Unrecognized type for EJSON date: ${typeof n}`);
    return a;
  }
  if (e.$code != null) {
    const n = Object.assign({}, e);
    return e.$scope && (n.$scope = Pl(e.$scope)), an.fromExtendedJSON(e);
  }
  if (Il(e) || e.$dbPointer) {
    const n = e.$ref ? e : e.$dbPointer;
    if (n instanceof Wt)
      return n;
    const a = Object.keys(n).filter((s) => s.startsWith("$"));
    let i = !0;
    if (a.forEach((s) => {
      ["$ref", "$id", "$db"].indexOf(s) === -1 && (i = !1);
    }), i)
      return Wt.fromExtendedJSON(n);
  }
  return e;
}
function gy(e, t) {
  return e.map((r, n) => {
    t.seenObjects.push({ propertyName: `index ${n}`, obj: null });
    try {
      return Dt(r, t);
    } finally {
      t.seenObjects.pop();
    }
  });
}
function ac(e) {
  const t = e.toISOString();
  return e.getUTCMilliseconds() !== 0 ? t : t.slice(0, -5) + "Z";
}
function Dt(e, t) {
  if (e instanceof Map || Gi(e)) {
    const r = /* @__PURE__ */ Object.create(null);
    for (const [n, a] of e) {
      if (typeof n != "string")
        throw new J("Can only serialize maps with string keys");
      r[n] = a;
    }
    return Dt(r, t);
  }
  if ((typeof e == "object" || typeof e == "function") && e !== null) {
    const r = t.seenObjects.findIndex((n) => n.obj === e);
    if (r !== -1) {
      const n = t.seenObjects.map((l) => l.propertyName), a = n.slice(0, r).map((l) => `${l} -> `).join(""), i = n[r], s = " -> " + n.slice(r + 1, n.length - 1).map((l) => `${l} -> `).join(""), f = n[n.length - 1], c = " ".repeat(a.length + i.length / 2), o = "-".repeat(s.length + (i.length + f.length) / 2 - 1);
      throw new J(`Converting circular structure to EJSON:
    ${a}${i}${s}${f}
    ${c}\\${o}/`);
    }
    t.seenObjects[t.seenObjects.length - 1].obj = e;
  }
  if (Array.isArray(e))
    return gy(e, t);
  if (e === void 0)
    return t.ignoreUndefined ? void 0 : null;
  if (e instanceof Date || Di(e)) {
    const r = e.getTime(), n = r > -1 && r < 2534023008e5;
    return t.legacy ? t.relaxed && n ? { $date: e.getTime() } : { $date: ac(e) } : t.relaxed && n ? { $date: ac(e) } : { $date: { $numberLong: e.getTime().toString() } };
  }
  if (typeof e == "number" && (!t.relaxed || !isFinite(e))) {
    if (Number.isInteger(e) && !Object.is(e, -0)) {
      if (e >= ni && e <= ti)
        return { $numberInt: e.toString() };
      if (e >= vl && e <= pl)
        return { $numberLong: e.toString() };
    }
    return { $numberDouble: Object.is(e, -0) ? "-0.0" : e.toString() };
  }
  if (typeof e == "bigint")
    return t.relaxed ? Number(BigInt.asIntN(64, e)) : { $numberLong: BigInt.asIntN(64, e).toString() };
  if (e instanceof RegExp || Bi(e)) {
    let r = e.flags;
    if (r === void 0) {
      const a = e.toString().match(/[gimuy]*$/);
      a && (r = a[0]);
    }
    return new vt(e.source, r).toExtendedJSON(t);
  }
  return e != null && typeof e == "object" ? py(e, t) : e;
}
const my = {
  Binary: (e) => new fr(e.value(), e.sub_type),
  Code: (e) => new an(e.code, e.scope),
  DBRef: (e) => new Wt(e.collection || e.namespace, e.oid, e.db, e.fields),
  Decimal128: (e) => new Br(e.bytes),
  Double: (e) => new gt(e.value),
  Int32: (e) => new sn(e.value),
  Long: (e) => pe.fromBits(e.low != null ? e.low : e.low_, e.low != null ? e.high : e.high_, e.low != null ? e.unsigned : e.unsigned_),
  MaxKey: () => new sa(),
  MinKey: () => new fa(),
  ObjectId: (e) => new An(e),
  BSONRegExp: (e) => new vt(e.pattern, e.options),
  BSONSymbol: (e) => new ca(e.value),
  Timestamp: (e) => ea.fromBits(e.low, e.high)
};
function py(e, t) {
  if (e == null || typeof e != "object")
    throw new J("not an object instance");
  const r = e._bsontype;
  if (typeof r > "u") {
    const n = {};
    for (const a of Object.keys(e)) {
      t.seenObjects.push({ propertyName: a, obj: null });
      try {
        const i = Dt(e[a], t);
        a === "__proto__" ? Object.defineProperty(n, a, {
          value: i,
          writable: !0,
          enumerable: !0,
          configurable: !0
        }) : n[a] = i;
      } finally {
        t.seenObjects.pop();
      }
    }
    return n;
  } else {
    if (e != null && typeof e == "object" && typeof e._bsontype == "string" && e[Xi] !== ri)
      throw new ji();
    if (xy(e)) {
      let n = e;
      if (typeof n.toExtendedJSON != "function") {
        const a = my[e._bsontype];
        if (!a)
          throw new J("Unrecognized or invalid _bsontype: " + e._bsontype);
        n = a(n);
      }
      return r === "Code" && n.scope ? n = new an(n.code, Dt(n.scope, t)) : r === "DBRef" && n.oid && (n = new Wt(Dt(n.collection, t), Dt(n.oid, t), Dt(n.db, t), Dt(n.fields, t))), n.toExtendedJSON(t);
    } else
      throw new J("_bsontype must be a string, but was: " + typeof r);
  }
}
function Ml(e, t) {
  const r = {
    useBigInt64: (t == null ? void 0 : t.useBigInt64) ?? !1,
    relaxed: (t == null ? void 0 : t.relaxed) ?? !0,
    legacy: (t == null ? void 0 : t.legacy) ?? !1
  };
  return JSON.parse(e, (n, a) => {
    if (n.indexOf("\0") !== -1)
      throw new J(`BSON Document field names cannot contain null bytes, found: ${JSON.stringify(n)}`);
    return Pl(a, r);
  });
}
function Ul(e, t, r, n) {
  r != null && typeof r == "object" && (n = r, r = void 0), t != null && typeof t == "object" && !Array.isArray(t) && (n = t, t = void 0);
  const a = Object.assign({ relaxed: !0, legacy: !1 }, n, {
    seenObjects: [{ propertyName: "(root)", obj: null }]
  }), i = Dt(e, a);
  return JSON.stringify(i, t, r);
}
function vy(e, t) {
  return t = t || {}, JSON.parse(Ul(e, t));
}
function wy(e, t) {
  return t = t || {}, Ml(JSON.stringify(e), t);
}
const oa = /* @__PURE__ */ Object.create(null);
oa.parse = Ml;
oa.stringify = Ul;
oa.serialize = vy;
oa.deserialize = wy;
Object.freeze(oa);
const Ze = {
  double: 1,
  string: 2,
  object: 3,
  array: 4,
  binData: 5,
  undefined: 6,
  objectId: 7,
  bool: 8,
  date: 9,
  null: 10,
  regex: 11,
  dbPointer: 12,
  javascript: 13,
  symbol: 14,
  javascriptWithScope: 15,
  int: 16,
  timestamp: 17,
  long: 18,
  decimal: 19,
  minKey: 255,
  maxKey: 127
};
function gs(e, t) {
  try {
    return we.getNonnegativeInt32LE(e, t);
  } catch (r) {
    throw new Bt("BSON size cannot be negative", t, { cause: r });
  }
}
function ms(e, t) {
  let r = t;
  for (; e[r]; r++)
    ;
  if (r >= e.length - 1)
    throw new Bt("Null terminator not found", t);
  return r;
}
function _y(e, t = 0) {
  if (t ?? (t = 0), e.length < 5)
    throw new Bt(`Input must be at least 5 bytes, got ${e.length} bytes`, t);
  const r = gs(e, t);
  if (r > e.length - t)
    throw new Bt(`Parsed documentSize (${r} bytes) does not match input length (${e.length} bytes)`, t);
  if (e[t + r - 1] !== 0)
    throw new Bt("BSON documents must end in 0x00", t + r);
  const n = [];
  let a = t + 4;
  for (; a <= r + t; ) {
    const i = e[a];
    if (a += 1, i === 0) {
      if (a - t !== r)
        throw new Bt("Invalid 0x00 type byte", a);
      break;
    }
    const s = a, f = ms(e, a) - s;
    a += f + 1;
    let c;
    if (i === Ze.double || i === Ze.long || i === Ze.date || i === Ze.timestamp)
      c = 8;
    else if (i === Ze.int)
      c = 4;
    else if (i === Ze.objectId)
      c = 12;
    else if (i === Ze.decimal)
      c = 16;
    else if (i === Ze.bool)
      c = 1;
    else if (i === Ze.null || i === Ze.undefined || i === Ze.maxKey || i === Ze.minKey)
      c = 0;
    else if (i === Ze.regex)
      c = ms(e, ms(e, a) + 1) + 1 - a;
    else if (i === Ze.object || i === Ze.array || i === Ze.javascriptWithScope)
      c = gs(e, a);
    else if (i === Ze.string || i === Ze.binData || i === Ze.dbPointer || i === Ze.javascript || i === Ze.symbol)
      c = gs(e, a) + 4, i === Ze.binData && (c += 1), i === Ze.dbPointer && (c += 12);
    else
      throw new Bt(`Invalid 0x${i.toString(16).padStart(2, "0")} type byte`, a);
    if (a + c > t + r - 1)
      throw new Bt("value reports length larger than document", a);
    n.push([i, s, f, a, c]), a += c;
  }
  return n;
}
const ai = /* @__PURE__ */ Object.create(null);
ai.parseToElements = _y;
ai.ByteUtils = j;
ai.NumberUtils = we;
Object.freeze(ai);
const Wl = 1024 * 1024 * 17;
let Qt = j.allocate(Wl);
function Ey(e) {
  Qt.length < e && (Qt = j.allocate(e));
}
function yy(e, t = {}) {
  const r = typeof t.checkKeys == "boolean" ? t.checkKeys : !1, n = typeof t.serializeFunctions == "boolean" ? t.serializeFunctions : !1, a = typeof t.ignoreUndefined == "boolean" ? t.ignoreUndefined : !0, i = typeof t.minInternalBufferSize == "number" ? t.minInternalBufferSize : Wl;
  Qt.length < i && (Qt = j.allocate(i));
  const s = Ll(Qt, e, r, 0, n, a, null), f = j.allocateUnsafe(s);
  return f.set(Qt.subarray(0, s), 0), f;
}
function Ty(e, t, r = {}) {
  const n = typeof r.checkKeys == "boolean" ? r.checkKeys : !1, a = typeof r.serializeFunctions == "boolean" ? r.serializeFunctions : !1, i = typeof r.ignoreUndefined == "boolean" ? r.ignoreUndefined : !0, s = typeof r.index == "number" ? r.index : 0, f = Ll(Qt, e, n, 0, a, i, null);
  return t.set(Qt.subarray(0, f), s), s + f - 1;
}
function Sy(e, t = {}) {
  return Rl(j.toLocalBufferType(e), t);
}
function ky(e, t = {}) {
  t = t || {};
  const r = typeof t.serializeFunctions == "boolean" ? t.serializeFunctions : !1, n = typeof t.ignoreUndefined == "boolean" ? t.ignoreUndefined : !0;
  return $E(e, r, n);
}
function Ay(e, t, r, n, a, i) {
  const s = Object.assign({ allowObjectSmallerThanBufferSize: !0, index: 0 }, i), f = j.toLocalBufferType(e);
  let c = t;
  for (let o = 0; o < r; o++) {
    const l = we.getInt32LE(f, c);
    s.index = c, n[a + o] = Rl(f, s), c = c + l;
  }
  return c;
}
var Gr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BSONError: J,
  BSONOffsetError: Bt,
  BSONRegExp: vt,
  BSONRuntimeError: Os,
  BSONSymbol: ca,
  BSONType: vE,
  BSONValue: Zr,
  BSONVersionError: ji,
  Binary: fr,
  ByteUtils: j,
  Code: an,
  DBRef: Wt,
  Decimal128: Br,
  Double: gt,
  EJSON: oa,
  Int32: sn,
  Long: pe,
  MaxKey: sa,
  MinKey: fa,
  NumberUtils: we,
  ObjectId: An,
  Timestamp: ea,
  UUID: Sr,
  bsonType: ia,
  calculateObjectSize: ky,
  deserialize: Sy,
  deserializeStream: Ay,
  onDemand: ai,
  serialize: yy,
  serializeWithBufferAndIndex: Ty,
  setInternalBufferSize: Ey
});
const Pn = 1;
function Mn(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = e.blueprint, n = r && typeof r.x == "number" && typeof r.y == "number" && typeof r.w == "number" && typeof r.h == "number" ? { x: r.x, y: r.y, w: r.w, h: r.h } : void 0, a = Array.isArray(e.openings) ? e.openings.filter((i) => !!(i && typeof i == "object")).map((i) => ({
    id: String(i.id ?? ""),
    kind: i.kind === "window" ? "window" : "door",
    wall: ["top", "bottom", "left", "right"].includes(String(i.wall)) ? i.wall : "bottom",
    position: typeof i.position == "number" ? Math.min(100, Math.max(0, i.position)) : 50,
    width: typeof i.width == "number" ? i.width : i.kind === "window" ? 54 : 38
  })).filter((i) => i.id) : void 0;
  return {
    id: String(e.id ?? ""),
    name: String(e.name ?? "Unnamed Location"),
    type: e.type ?? "cabinet",
    parentId: e.parentId ? String(e.parentId) : null,
    code: String(e.code ?? ""),
    color: String(e.color ?? "#4f46e5"),
    notes: String(e.notes ?? ""),
    blueprint: n,
    openings: a,
    createdAt: String(e.createdAt ?? t),
    updatedAt: String(e.updatedAt ?? t)
  };
}
function Un(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString();
  return {
    id: String(e.id ?? ""),
    sno: e.sno ? String(e.sno) : void 0,
    title: String(e.title ?? "Untitled File"),
    fileCode: String(e.fileCode ?? ""),
    category: String(e.category ?? "General"),
    locationId: e.locationId ? String(e.locationId) : null,
    positionDetail: String(e.positionDetail ?? ""),
    status: e.status ?? "stored",
    checkedOutTo: String(e.checkedOutTo ?? ""),
    checkedOutAt: e.checkedOutAt ? String(e.checkedOutAt) : null,
    tags: Array.isArray(e.tags) ? e.tags.map(String) : [],
    notes: String(e.notes ?? ""),
    createdAt: String(e.createdAt ?? t),
    updatedAt: String(e.updatedAt ?? t)
  };
}
class Fy {
  constructor(t) {
    ge(this, "dataDir");
    ge(this, "blueprintPath");
    ge(this, "filesPath");
    ge(this, "legacyPath");
    ge(this, "queuePath");
    ge(this, "syncConfigPath");
    this.dataDir = t, this.blueprintPath = Lr.join(t, "blueprint.bson"), this.filesPath = Lr.join(t, "files.bson"), this.legacyPath = Lr.join(t, "filemap-data.bson"), this.queuePath = Lr.join(t, "sync-queue.bson"), this.syncConfigPath = Lr.join(t, "sync-config.bson");
  }
  getFolderPath() {
    return this.dataDir;
  }
  getBlueprintPath() {
    return this.blueprintPath;
  }
  getFilesPath() {
    return this.filesPath;
  }
  async getSingleFileInfo(t) {
    if (!jt(t))
      return {
        filePath: t,
        sizeBytes: 0,
        exists: !1,
        lastModified: null
      };
    const r = await rt.stat(t);
    return {
      filePath: t,
      sizeBytes: r.size,
      exists: !0,
      lastModified: r.mtime.toISOString()
    };
  }
  async getStorageInfo() {
    const [t, r] = await Promise.all([
      this.getSingleFileInfo(this.blueprintPath),
      this.getSingleFileInfo(this.filesPath)
    ]);
    return {
      folderPath: this.dataDir,
      blueprint: t,
      files: r
    };
  }
  async writeAtomicBson(t, r) {
    await rt.mkdir(Lr.dirname(t), { recursive: !0 });
    const n = Gr.serialize(r), a = `${t}.tmp`;
    await rt.writeFile(a, n), await rt.rename(a, t);
  }
  async migrateLegacyIfNeeded() {
    if (jt(this.legacyPath) && !jt(this.blueprintPath) && !jt(this.filesPath))
      try {
        const t = await rt.readFile(this.legacyPath);
        if (t.byteLength > 0) {
          const r = Gr.deserialize(t), n = Array.isArray(r.locations) ? r.locations.map(Mn).filter((i) => i.id) : [], a = Array.isArray(r.files) ? r.files.map(Un).filter((i) => i.id) : [];
          await this.saveBlueprint(n), await this.saveFiles(a);
        }
      } catch (t) {
        console.error("Legacy BSON migration skipped:", t);
      }
  }
  async load() {
    await this.migrateLegacyIfNeeded();
    let t = [];
    if (jt(this.blueprintPath)) {
      const n = await rt.readFile(this.blueprintPath);
      if (n.byteLength > 0) {
        const a = Gr.deserialize(n);
        Array.isArray(a.locations) && (t = a.locations.map(Mn).filter((i) => i.id));
      }
    } else
      await this.saveBlueprint([]);
    let r = [];
    if (jt(this.filesPath)) {
      const n = await rt.readFile(this.filesPath);
      if (n.byteLength > 0) {
        const a = Gr.deserialize(n);
        Array.isArray(a.files) && (r = a.files.map(Un).filter((i) => i.id));
      }
    } else
      await this.saveFiles([]);
    return {
      version: Pn,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      locations: t,
      files: r
    };
  }
  async saveBlueprint(t) {
    const r = {
      version: Pn,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      locations: t
    };
    return await this.writeAtomicBson(
      this.blueprintPath,
      r
    ), this.getStorageInfo();
  }
  async saveFiles(t) {
    const r = {
      version: Pn,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      files: t
    };
    return await this.writeAtomicBson(
      this.filesPath,
      r
    ), this.getStorageInfo();
  }
  async exportToFile(t, r) {
    const n = await this.load(), a = t === "blueprint" ? {
      version: Pn,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      locations: n.locations
    } : {
      version: Pn,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      files: n.files
    }, i = Gr.serialize(a);
    await rt.writeFile(r, i);
  }
  async importFromFile(t, r) {
    const n = await rt.readFile(r), a = Gr.deserialize(n);
    if (t === "blueprint") {
      const s = Array.isArray(a.locations) ? a.locations.map(Mn).filter((f) => f.id) : [];
      return await this.saveBlueprint(s), { locations: s };
    }
    const i = Array.isArray(a.files) ? a.files.map(Un).filter((s) => s.id) : [];
    return await this.saveFiles(i), { files: i };
  }
  async readRawBson(t) {
    await this.load();
    const r = t === "blueprint" ? this.blueprintPath : this.filesPath;
    return rt.readFile(r);
  }
  async writeRawBson(t, r) {
    const n = Gr.deserialize(r);
    if (t === "blueprint") {
      const i = Array.isArray(n.locations) ? n.locations.map(Mn).filter((s) => s.id) : [];
      await this.saveBlueprint(i);
      return;
    }
    const a = Array.isArray(n.files) ? n.files.map(Un).filter((i) => i.id) : [];
    await this.saveFiles(a);
  }
  async loadSyncConfig() {
    if (!jt(this.syncConfigPath))
      return { role: "standalone", adminIp: "", port: 4747 };
    try {
      const t = await rt.readFile(this.syncConfigPath), r = Gr.deserialize(t);
      return {
        role: r.role === "admin" || r.role === "employee" ? r.role : "standalone",
        adminIp: typeof r.adminIp == "string" ? r.adminIp : "",
        port: typeof r.port == "number" && r.port > 0 ? r.port : 4747
      };
    } catch {
      return { role: "standalone", adminIp: "", port: 4747 };
    }
  }
  async saveSyncConfig(t) {
    await this.writeAtomicBson(
      this.syncConfigPath,
      t
    );
  }
  async loadSyncQueue() {
    if (!jt(this.queuePath)) return [];
    try {
      const t = await rt.readFile(this.queuePath);
      if (t.byteLength === 0) return [];
      const r = Gr.deserialize(t);
      return Array.isArray(r.ops) ? r.ops : [];
    } catch {
      return [];
    }
  }
  async saveSyncQueue(t) {
    await this.writeAtomicBson(this.queuePath, { ops: t });
  }
  async applySyncOperations(t) {
    const r = await this.load();
    let n = [...r.locations], a = [...r.files], i = !1, s = !1;
    for (const f of t)
      if (f.type === "upsert_file") {
        const c = Un(f.file), o = a.findIndex((l) => l.id === c.id);
        o >= 0 ? a[o] = c : a.unshift(c), s = !0;
      } else if (f.type === "delete_file")
        a = a.filter((c) => c.id !== f.fileId), s = !0;
      else if (f.type === "replace_files")
        a = f.files.map(Un).filter((c) => c.id), s = !0;
      else if (f.type === "upsert_location") {
        const c = Mn(f.location), o = n.findIndex((l) => l.id === c.id);
        o >= 0 ? n[o] = c : n.push(c), i = !0;
      } else f.type === "delete_location" ? (n = n.filter((c) => c.id !== f.locationId), i = !0) : f.type === "replace_blueprint" && (n = f.locations.map(Mn).filter((c) => c.id), i = !0);
    return i && await this.saveBlueprint(n), s && await this.saveFiles(a), {
      version: Pn,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      locations: n,
      files: a
    };
  }
}
function by() {
  const e = lh.networkInterfaces(), t = [];
  for (const r of Object.keys(e))
    for (const n of e[r] ?? [])
      n.family === "IPv4" && !n.internal && t.push(n.address);
  return t;
}
function ic(e, t) {
  const r = e.trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "");
  return r ? r.includes(":") ? `http://${r}` : `http://${r}:${t}` : "";
}
class Cy {
  constructor(t, r) {
    ge(this, "store");
    ge(this, "onDataUpdated");
    ge(this, "onStatusChanged");
    ge(this, "config", { role: "standalone", adminIp: "", port: 4747 });
    ge(this, "server", null);
    ge(this, "pollTimer", null);
    ge(this, "adminOnline", !1);
    ge(this, "lastSyncedAt", null);
    ge(this, "lastError", null);
    ge(this, "syncing", !1);
    this.store = t, this.onDataUpdated = r.onDataUpdated, this.onStatusChanged = r.onStatusChanged;
  }
  async init() {
    this.config = await this.store.loadSyncConfig(), await this.applyMode();
  }
  async dispose() {
    this.stopPolling(), await this.stopServer();
  }
  async getStatus() {
    var r;
    const t = await this.store.loadSyncQueue();
    return {
      role: this.config.role,
      adminIp: this.config.adminIp,
      port: this.config.port,
      serverRunning: !!((r = this.server) != null && r.listening),
      localIps: by(),
      adminOnline: this.config.role === "admin" ? !0 : this.adminOnline,
      pendingCount: t.length,
      lastSyncedAt: this.lastSyncedAt,
      lastError: this.lastError
    };
  }
  async setConfig(t) {
    this.config = {
      role: t.role,
      adminIp: t.adminIp.trim(),
      port: t.port > 0 ? t.port : 4747
    }, await this.store.saveSyncConfig(this.config), this.lastError = null, await this.applyMode();
    const r = await this.getStatus();
    return this.onStatusChanged(r), r;
  }
  async emitStatus() {
    this.onStatusChanged(await this.getStatus());
  }
  async applyMode() {
    this.stopPolling(), await this.stopServer(), this.adminOnline = !1, this.config.role === "admin" ? await this.startServer() : this.config.role === "employee" && (this.startPolling(), this.syncNow());
  }
  startPolling() {
    this.stopPolling(), this.pollTimer = setInterval(() => {
      this.config.role === "employee" && this.syncNow();
    }, 8e3);
  }
  stopPolling() {
    this.pollTimer && (clearInterval(this.pollTimer), this.pollTimer = null);
  }
  async stopServer() {
    if (!this.server) return;
    const t = this.server;
    this.server = null, await new Promise((r) => {
      t.close(() => r());
    });
  }
  async startServer() {
    const t = oh.createServer(async (r, n) => {
      const a = (r.url ?? "/").split("?")[0];
      try {
        if (r.method === "GET" && a === "/api/ping") {
          n.writeHead(200, { "Content-Type": "application/json" }), n.end(
            JSON.stringify({
              ok: !0,
              role: "admin",
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            })
          );
          return;
        }
        if (r.method === "GET" && a === "/api/bson/blueprint") {
          const i = await this.store.readRawBson("blueprint");
          n.writeHead(200, {
            "Content-Type": "application/octet-stream",
            "Content-Length": i.byteLength
          }), n.end(i);
          return;
        }
        if (r.method === "GET" && a === "/api/bson/files") {
          const i = await this.store.readRawBson("files");
          n.writeHead(200, {
            "Content-Type": "application/octet-stream",
            "Content-Length": i.byteLength
          }), n.end(i);
          return;
        }
        if (r.method === "POST" && a === "/api/sync") {
          const i = [];
          for await (const h of r)
            i.push(Buffer.isBuffer(h) ? h : Buffer.from(h));
          const s = Buffer.concat(i), f = Gr.deserialize(s), c = Array.isArray(f.ops) ? f.ops : [], o = await this.store.applySyncOperations(c);
          this.lastSyncedAt = (/* @__PURE__ */ new Date()).toISOString(), this.onDataUpdated(o), this.emitStatus();
          const l = Gr.serialize({ ok: !0, data: o });
          n.writeHead(200, {
            "Content-Type": "application/octet-stream",
            "Content-Length": l.byteLength
          }), n.end(l);
          return;
        }
        n.writeHead(404, { "Content-Type": "application/json" }), n.end(JSON.stringify({ error: "Not found" }));
      } catch (i) {
        n.writeHead(500, { "Content-Type": "application/json" }), n.end(
          JSON.stringify({
            error: i instanceof Error ? i.message : "Server error"
          })
        );
      }
    });
    await new Promise((r) => {
      t.on("error", (n) => {
        this.lastError = n.message, r();
      }), t.listen(this.config.port, "0.0.0.0", () => {
        this.server = t, this.lastError = null, r();
      });
    });
  }
  async enqueueOperation(t) {
    if (this.config.role !== "employee") return;
    const r = await this.store.loadSyncQueue();
    r.push(t), await this.store.saveSyncQueue(r), await this.emitStatus(), this.syncNow();
  }
  async downloadFromAdmin() {
    const t = ic(this.config.adminIp, this.config.port);
    if (!t)
      return { ok: !1, error: "Please enter the Admin IP address first." };
    try {
      const [r, n] = await Promise.all([
        fetch(`${t}/api/bson/blueprint`, { signal: AbortSignal.timeout(5e3) }),
        fetch(`${t}/api/bson/files`, { signal: AbortSignal.timeout(5e3) })
      ]);
      if (!r.ok || !n.ok)
        throw new Error("Admin server returned an error.");
      const a = Buffer.from(await r.arrayBuffer()), i = Buffer.from(await n.arrayBuffer());
      await this.store.writeRawBson("blueprint", a), await this.store.writeRawBson("files", i);
      const s = await this.store.load();
      return this.adminOnline = !0, this.lastSyncedAt = (/* @__PURE__ */ new Date()).toISOString(), this.lastError = null, this.onDataUpdated(s), await this.emitStatus(), { ok: !0, data: s };
    } catch (r) {
      const n = r instanceof Error ? r.message : "Could not reach Admin server";
      return this.adminOnline = !1, this.lastError = n, await this.emitStatus(), { ok: !1, error: n };
    }
  }
  async syncNow() {
    if (this.config.role !== "employee")
      return { ok: !0, syncedCount: 0 };
    const t = ic(this.config.adminIp, this.config.port);
    if (!t)
      return { ok: !1, syncedCount: 0, error: "Admin IP is not set." };
    if (this.syncing)
      return { ok: !1, syncedCount: 0 };
    this.syncing = !0;
    try {
      const r = await this.store.loadSyncQueue();
      if (r.length === 0) {
        if (!(await fetch(`${t}/api/ping`, {
          signal: AbortSignal.timeout(3500)
        })).ok) throw new Error("Admin server unreachable");
        return this.adminOnline = !0, this.lastError = null, await this.emitStatus(), { ok: !0, syncedCount: 0 };
      }
      const n = Gr.serialize({ ops: r }), a = await fetch(`${t}/api/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: new Uint8Array(n),
        signal: AbortSignal.timeout(6e3)
      });
      if (!a.ok)
        throw new Error(`Sync failed (${a.status})`);
      const i = Buffer.from(await a.arrayBuffer()), s = Gr.deserialize(i);
      return await this.store.saveSyncQueue([]), s.data && (await this.store.saveBlueprint(s.data.locations), await this.store.saveFiles(s.data.files), this.onDataUpdated(s.data)), this.adminOnline = !0, this.lastSyncedAt = (/* @__PURE__ */ new Date()).toISOString(), this.lastError = null, await this.emitStatus(), { ok: !0, syncedCount: r.length, data: s.data };
    } catch (r) {
      const n = r instanceof Error ? r.message : "Admin offline";
      return this.adminOnline = !1, this.lastError = n, await this.emitStatus(), { ok: !1, syncedCount: 0, error: n };
    } finally {
      this.syncing = !1;
    }
  }
}
const Hl = Lr.dirname(ch(import.meta.url));
process.env.APP_ROOT = Lr.join(Hl, "..");
const Ns = process.env.VITE_DEV_SERVER_URL, Uy = Lr.join(process.env.APP_ROOT, "dist-electron"), Vl = Lr.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Ns ? Lr.join(process.env.APP_ROOT, "public") : Vl;
let Pr = null, ps = null, Kn = null;
function Kt() {
  return ps || (ps = new Fy(Na.getPath("userData"))), ps;
}
function un() {
  return Kn || (Kn = new Cy(Kt(), {
    onDataUpdated: (e) => {
      Pr == null || Pr.webContents.send("filemap:data-updated", e);
    },
    onStatusChanged: (e) => {
      Pr == null || Pr.webContents.send("filemap:sync-status-changed", e);
    }
  })), Kn;
}
function Oy() {
  $r.handle("filemap:load", async () => Kt().load()), $r.handle("filemap:save-blueprint", async (e, t) => {
    const r = await Kt().saveBlueprint(t);
    return await un().enqueueOperation({
      id: `op_${Date.now().toString(36)}`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      type: "replace_blueprint",
      locations: t
    }), r;
  }), $r.handle("filemap:save-files", async (e, t) => {
    const r = await Kt().saveFiles(t);
    return await un().enqueueOperation({
      id: `op_${Date.now().toString(36)}`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      type: "replace_files",
      files: t
    }), r;
  }), $r.handle("filemap:sync-status", async () => un().getStatus()), $r.handle("filemap:set-sync-config", async (e, t) => un().setConfig(t)), $r.handle("filemap:download-from-admin", async () => un().downloadFromAdmin()), $r.handle("filemap:sync-now", async () => un().syncNow()), $r.handle("filemap:storage-info", async () => Kt().getStorageInfo()), $r.handle("filemap:open-data-folder", async () => {
    const e = Kt().getFilesPath();
    fh.showItemInFolder(e);
  }), $r.handle("filemap:export-bson", async (e, t) => {
    const r = Pr ?? Hn.getFocusedWindow(), a = {
      title: `Export ${t === "blueprint" ? "Blueprint" : "Files"} as BSON`,
      defaultPath: `${t === "blueprint" ? "blueprint" : "files"}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.bson`,
      filters: [{ name: "BSON Database", extensions: ["bson"] }]
    }, i = r ? await Xt.showSaveDialog(r, a) : await Xt.showSaveDialog(a);
    return i.canceled || !i.filePath ? { canceled: !0 } : (await Kt().exportToFile(t, i.filePath), { canceled: !1, target: t, filePath: i.filePath });
  }), $r.handle("filemap:import-bson", async (e, t) => {
    const r = Pr ?? Hn.getFocusedWindow(), n = {
      title: `Import ${t === "blueprint" ? "Blueprint" : "Files"} BSON`,
      properties: ["openFile"],
      filters: [{ name: "BSON Database", extensions: ["bson"] }]
    }, a = r ? await Xt.showOpenDialog(r, n) : await Xt.showOpenDialog(n);
    if (a.canceled || a.filePaths.length === 0)
      return { canceled: !0 };
    const i = await Kt().importFromFile(t, a.filePaths[0]);
    return {
      canceled: !1,
      target: t,
      filePath: a.filePaths[0],
      locations: i.locations,
      files: i.files
    };
  }), $r.handle("filemap:download-sample-excel", async () => {
    const e = Pr ?? Hn.getFocusedWindow(), t = {
      title: "Save Sample Excel Template",
      defaultPath: "filemap-sample.xlsx",
      filters: [{ name: "Excel Workbook", extensions: ["xlsx"] }]
    }, r = e ? await Xt.showSaveDialog(e, t) : await Xt.showSaveDialog(t);
    if (r.canceled || !r.filePath)
      return { canceled: !0 };
    const n = [
      { sno: 1, filename: "GST Returns FY 2025-26", "file number": "FIN-014" },
      { sno: 2, filename: "Vendor Invoices Q3", "file number": "VND-089" },
      { sno: 3, filename: "Employee Offer Letters & NDAs", "file number": "HR-021" }
    ], a = pi.json_to_sheet(n);
    a["!cols"] = [{ wch: 8 }, { wch: 36 }, { wch: 16 }];
    const i = pi.book_new();
    return pi.book_append_sheet(i, a, "Files"), tE(i, r.filePath), { canceled: !1, filePath: r.filePath };
  }), $r.handle("filemap:import-excel", async () => {
    const e = Pr ?? Hn.getFocusedWindow(), t = {
      title: "Upload Excel / CSV File List",
      properties: ["openFile"],
      filters: [
        { name: "Excel & CSV Files", extensions: ["xlsx", "xls", "csv"] }
      ]
    }, r = e ? await Xt.showOpenDialog(e, t) : await Xt.showOpenDialog(t);
    if (r.canceled || r.filePaths.length === 0)
      return { canceled: !0 };
    const n = r.filePaths[0];
    try {
      const a = J_(n), i = a.SheetNames[0];
      if (!i)
        return { canceled: !1, filePath: n, error: "Excel file has no sheets." };
      const s = a.Sheets[i], f = pi.sheet_to_json(s, {
        defval: ""
      }), c = (l) => l.toLowerCase().replace(/[\s._-]+/g, ""), o = [];
      for (const l of f) {
        const h = Object.entries(l);
        let u = "", x = "", g = "";
        for (const [d, m] of h) {
          const w = c(d), y = String(m ?? "").trim();
          !u && ["sno", "slno", "srno", "serial", "serialno", "serialnumber"].includes(w) ? u = y : !x && ["filename", "name", "title", "file", "document", "documentname"].includes(w) ? x = y : !g && ["filenumber", "fileno", "filecode", "number", "code", "ref", "refno"].includes(w) && (g = y);
        }
        if (!x && h.length >= 2) {
          const d = h.map(([, m]) => String(m ?? "").trim());
          h.length >= 3 ? (u = u || d[0], x = d[1], g = g || d[2]) : (x = d[0], g = g || d[1]);
        }
        (x || g) && o.push({
          sno: u,
          title: x || `File ${g}`,
          fileCode: g.toUpperCase()
        });
      }
      return {
        canceled: !1,
        filePath: n,
        fileName: Lr.basename(n),
        rows: o
      };
    } catch (a) {
      return {
        canceled: !1,
        filePath: n,
        error: a instanceof Error ? a.message : "Failed to read Excel file"
      };
    }
  });
}
function $l() {
  Pr = new Hn({
    title: "FileMap — Office File Locator",
    width: 1240,
    height: 800,
    minWidth: 940,
    minHeight: 620,
    backgroundColor: "#f8fafc",
    icon: Lr.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: Lr.join(Hl, "preload.mjs")
    }
  }), Pr.setMenuBarVisibility(!1), Ns ? Pr.loadURL(Ns) : Pr.loadFile(Lr.join(Vl, "index.html"));
}
Na.on("window-all-closed", () => {
  process.platform !== "darwin" && (Kn == null || Kn.dispose(), Na.quit(), Pr = null);
});
Na.on("activate", () => {
  Hn.getAllWindows().length === 0 && $l();
});
Na.whenReady().then(async () => {
  Oy(), await un().init(), $l();
});
export {
  Uy as MAIN_DIST,
  Vl as RENDERER_DIST,
  Ns as VITE_DEV_SERVER_URL
};
