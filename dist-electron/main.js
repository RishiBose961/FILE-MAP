var lh = Object.defineProperty;
var hh = (e, t, r) => t in e ? lh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ge = (e, t, r) => hh(e, typeof t != "symbol" ? t + "" : t, r);
import { app as tn, BrowserWindow as Gn, ipcMain as Lr, shell as uh, dialog as Jt, Tray as xh, nativeImage as dh, Menu as gh } from "electron";
import Pr from "node:fs/promises";
import Fr from "node:path";
import { fileURLToPath as ph } from "node:url";
import { existsSync as Dt } from "node:fs";
import mh from "node:http";
import vh from "node:os";
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var yi = {};
yi.version = "0.18.5";
var uc = 1252, wh = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], Rs = {
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
}, Ls = function(e) {
  wh.indexOf(e) != -1 && (uc = Rs[0] = e);
};
function _h() {
  Ls(1252);
}
var vt = function(e) {
  Ls(e);
};
function Ps() {
  vt(1200), _h();
}
function L0(e) {
  for (var t = [], r = 0, n = e.length; r < n; ++r) t[r] = e.charCodeAt(r);
  return t;
}
function Eh(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r) t[r] = String.fromCharCode(e.charCodeAt(2 * r) + (e.charCodeAt(2 * r + 1) << 8));
  return t.join("");
}
function xc(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r) t[r] = String.fromCharCode(e.charCodeAt(2 * r + 1) + (e.charCodeAt(2 * r) << 8));
  return t.join("");
}
var Ea = function(e) {
  var t = e.charCodeAt(0), r = e.charCodeAt(1);
  return t == 255 && r == 254 ? Eh(e.slice(2)) : t == 254 && r == 255 ? xc(e.slice(2)) : t == 65279 ? e.slice(1) : e;
}, ci = function(t) {
  return String.fromCharCode(t);
}, P0 = function(t) {
  return String.fromCharCode(t);
}, Da, Qt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function Ra(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, c = 0, o = 0; o < e.length; )
    r = e.charCodeAt(o++), i = r >> 2, n = e.charCodeAt(o++), s = (r & 3) << 4 | n >> 4, a = e.charCodeAt(o++), f = (n & 15) << 2 | a >> 6, c = a & 63, isNaN(n) ? f = c = 64 : isNaN(a) && (c = 64), t += Qt.charAt(i) + Qt.charAt(s) + Qt.charAt(f) + Qt.charAt(c);
  return t;
}
function Zr(e) {
  var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, c = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var o = 0; o < e.length; )
    i = Qt.indexOf(e.charAt(o++)), s = Qt.indexOf(e.charAt(o++)), r = i << 2 | s >> 4, t += String.fromCharCode(r), f = Qt.indexOf(e.charAt(o++)), n = (s & 15) << 4 | f >> 2, f !== 64 && (t += String.fromCharCode(n)), c = Qt.indexOf(e.charAt(o++)), a = (f & 3) << 6 | c, c !== 64 && (t += String.fromCharCode(a));
  return t;
}
var Ce = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), Gt = /* @__PURE__ */ function() {
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
function nn(e) {
  return Ce ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function M0(e) {
  return Ce ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var Jr = function(t) {
  return Ce ? Gt(t, "binary") : t.split("").map(function(r) {
    return r.charCodeAt(0) & 255;
  });
};
function Mi(e) {
  if (typeof ArrayBuffer > "u") return Jr(e);
  for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), n = 0; n != e.length; ++n) r[n] = e.charCodeAt(n) & 255;
  return t;
}
function ln(e) {
  if (Array.isArray(e)) return e.map(function(n) {
    return String.fromCharCode(n);
  }).join("");
  for (var t = [], r = 0; r < e.length; ++r) t[r] = String.fromCharCode(e[r]);
  return t.join("");
}
function yh(e) {
  if (typeof Uint8Array > "u") throw new Error("Unsupported");
  return new Uint8Array(e);
}
function Ms(e) {
  if (typeof ArrayBuffer > "u") throw new Error("Unsupported");
  if (e instanceof ArrayBuffer) return Ms(new Uint8Array(e));
  for (var t = new Array(e.length), r = 0; r < e.length; ++r) t[r] = e[r];
  return t;
}
var vr = Ce ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : Gt(t);
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
function Th(e) {
  for (var t = [], r = 0, n = e.length + 250, a = nn(e.length + 255), i = 0; i < e.length; ++i) {
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
    r > n && (t.push(a.slice(0, r)), r = 0, a = nn(65535), n = 65530);
  }
  return t.push(a.slice(0, r)), vr(t);
}
var Hr = /\u0000/g, ya = /[\u0001-\u0006]/g;
function Kn(e) {
  for (var t = "", r = e.length - 1; r >= 0; ) t += e.charAt(r--);
  return t;
}
function wt(e, t) {
  var r = "" + e;
  return r.length >= t ? r : tr("0", t - r.length) + r;
}
function Us(e, t) {
  var r = "" + e;
  return r.length >= t ? r : tr(" ", t - r.length) + r;
}
function Ti(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + tr(" ", t - r.length);
}
function Sh(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : tr("0", t - r.length) + r;
}
function kh(e, t) {
  var r = "" + e;
  return r.length >= t ? r : tr("0", t - r.length) + r;
}
var U0 = /* @__PURE__ */ Math.pow(2, 32);
function Pn(e, t) {
  if (e > U0 || e < -U0) return Sh(e, t);
  var r = Math.round(e);
  return kh(r, t);
}
function Si(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var W0 = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], es = [
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
function Ah(e) {
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
}, H0 = {
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
}, Fh = {
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
function ki(e, t, r) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, f = 0, c = 1, o = 0, l = 0, h = Math.floor(a); o < t && (h = Math.floor(a), f = h * s + i, l = h * o + c, !(a - h < 5e-8)); )
    a = 1 / (a - h), i = s, s = f, c = o, o = l;
  if (l > t && (o > t ? (l = c, f = i) : (l = o, f = s)), !r) return [0, n * f, l];
  var u = Math.floor(n * f / l);
  return [u, n * f - u * l, l];
}
function vn(e, t, r) {
  if (e > 2958465 || e < 0) return null;
  var n = e | 0, a = Math.floor(86400 * (e - n)), i = 0, s = [], f = { D: n, T: a, u: 86400 * (e - n) - a, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(f.u) < 1e-6 && (f.u = 0), t && t.date1904 && (n += 1462), f.u > 0.9999 && (f.u = 0, ++a == 86400 && (f.T = a = 0, ++n, ++f.D)), n === 60)
    s = r ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (n === 0)
    s = r ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    n > 60 && --n;
    var c = new Date(1900, 0, 1);
    c.setDate(c.getDate() + n - 1), s = [c.getFullYear(), c.getMonth() + 1, c.getDate()], i = c.getDay(), n < 60 && (i = (i + 6) % 7), r && (i = Bh(c, s));
  }
  return f.y = s[0], f.m = s[1], f.d = s[2], f.S = a % 60, a = Math.floor(a / 60), f.M = a % 60, a = Math.floor(a / 60), f.H = a, f.q = i, f;
}
var dc = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), bh = /* @__PURE__ */ dc.getTime(), Ch = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function gc(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  return t ? r -= 1461 * 24 * 60 * 60 * 1e3 : e >= Ch && (r += 24 * 60 * 60 * 1e3), (r - (bh + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ dc.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function Ws(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function Oh(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function Ih(e) {
  var t = e < 0 ? 12 : 11, r = Ws(e.toFixed(12));
  return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5);
}
function Nh(e) {
  var t = Ws(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function La(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), r;
  return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = Ih(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = Nh(e), Ws(Oh(r.toUpperCase()));
}
function Sn(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : La(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return ut(14, gc(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function Bh(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return e < 60 && (r = (r + 6) % 7), r;
}
function Dh(e, t, r, n) {
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
          return es[r.m - 1][1];
        case 5:
          return es[r.m - 1][0];
        default:
          return es[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          c = r.d, o = t.length;
          break;
        case 3:
          return W0[r.q][0];
        default:
          return W0[r.q][1];
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
      return r.u === 0 && (t == "s" || t == "ss") ? wt(r.S, t.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, i = Math.round(s * (r.S + r.u)), i >= 60 * s && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / s : (a = wt(i, 2 + n), t === "ss" ? a.substr(0, 2) : "." + a.substr(2, t.length - 1)));
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
  var l = o > 0 ? wt(c, o) : "";
  return l;
}
function en(e) {
  var t = 3;
  if (e.length <= t) return e;
  for (var r = e.length % t, n = e.substr(0, r); r != e.length; r += t) n += (n.length > 0 ? "," : "") + e.substr(r, t);
  return n;
}
var pc = /%/g;
function Rh(e, t, r) {
  var n = t.replace(pc, ""), a = t.length - n.length;
  return Ut(e, n, r * Math.pow(10, 2 * a)) + tr("%", a);
}
function Lh(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; ) --n;
  return Ut(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function mc(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + mc(e, -t);
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
var vc = /# (\?+)( ?)\/( ?)(\d+)/;
function Ph(e, t, r) {
  var n = parseInt(e[4], 10), a = Math.round(t * n), i = Math.floor(a / n), s = a - i * n, f = n;
  return r + (i === 0 ? "" : "" + i) + " " + (s === 0 ? tr(" ", e[1].length + 1 + e[4].length) : Us(s, e[1].length) + e[2] + "/" + e[3] + wt(f, e[4].length));
}
function Mh(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + tr(" ", e[1].length + 2 + e[4].length);
}
var wc = /^#*0*\.([0#]+)/, _c = /\).*[0#]/, Ec = /\(###\) ###\\?-####/;
function Ur(e) {
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
function V0(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function $0(e, t) {
  var r = e - Math.floor(e), n = Math.pow(10, t);
  return t < ("" + Math.round(r * n)).length ? 0 : Math.round(r * n);
}
function Uh(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function Wh(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function at(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(_c)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? at("n", n, r) : "(" + at("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return Lh(e, t, r);
  if (t.indexOf("%") !== -1) return Rh(e, t, r);
  if (t.indexOf("E") !== -1) return mc(t, r);
  if (t.charCodeAt(0) === 36) return "$" + at(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, c = Math.abs(r), o = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return o + Pn(c, t.length);
  if (t.match(/^[#?]+$/))
    return a = Pn(r, 0), a === "0" && (a = ""), a.length > t.length ? a : Ur(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(vc)) return Ph(i, c, o);
  if (t.match(/^#+0+$/)) return o + Pn(c, t.length - t.indexOf("0"));
  if (i = t.match(wc))
    return a = V0(r, i[1].length).replace(/^([^\.]+)$/, "$1." + Ur(i[1])).replace(/\.$/, "." + Ur(i[1])).replace(/\.(\d*)$/, function(g, d) {
      return "." + d + tr("0", Ur(
        /*::(*/
        i[1]
      ).length - d.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return o + V0(c, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return o + en(Pn(c, 0));
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + at(e, t, -r) : en("" + (Math.floor(r) + Uh(r, i[1].length))) + "." + wt($0(r, i[1].length), i[1].length);
  if (i = t.match(/^#,#*,#0/)) return at(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = Kn(at(e, t.replace(/[\\-]/g, ""), r)), s = 0, Kn(Kn(t.replace(/\\/g, "")).replace(/[0#]/g, function(g) {
      return s < a.length ? a.charAt(s++) : g === "0" ? "0" : "";
    }));
  if (t.match(Ec))
    return a = at(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var l = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = ki(c, Math.pow(10, s) - 1, !1), a = "" + o, l = Ut(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), l.charAt(l.length - 1) == " " && (l = l.substr(0, l.length - 1) + "0"), a += l + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], l = Ti(f[2], s), l.length < i[4].length && (l = Ur(i[4].substr(i[4].length - l.length)) + l), a += l, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = ki(c, Math.pow(10, s) - 1, !0), o + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? Us(f[1], s) + i[2] + "/" + i[3] + Ti(f[2], s) : tr(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = Pn(r, 0), t.length <= a.length ? a : Ur(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var h = t.indexOf(".") - s, u = t.length - a.length - h;
    return Ur(t.substr(0, h) + a + t.substr(t.length - u));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return s = $0(r, i[1].length), r < 0 ? "-" + at(e, t, -r) : en(Wh(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(g) {
      return "00," + (g.length < 3 ? wt(0, 3 - g.length) : "") + g;
    }) + "." + wt(s, i[1].length);
  switch (t) {
    case "###,##0.00":
      return at(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var x = en(Pn(c, 0));
      return x !== "0" ? o + x : "";
    case "###,###.00":
      return at(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return at(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function Hh(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; ) --n;
  return Ut(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function Vh(e, t, r) {
  var n = t.replace(pc, ""), a = t.length - n.length;
  return Ut(e, n, r * Math.pow(10, 2 * a)) + tr("%", a);
}
function yc(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + yc(e, -t);
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
function At(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(_c)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? At("n", n, r) : "(" + At("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return Hh(e, t, r);
  if (t.indexOf("%") !== -1) return Vh(e, t, r);
  if (t.indexOf("E") !== -1) return yc(t, r);
  if (t.charCodeAt(0) === 36) return "$" + At(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, c = Math.abs(r), o = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return o + wt(c, t.length);
  if (t.match(/^[#?]+$/))
    return a = "" + r, r === 0 && (a = ""), a.length > t.length ? a : Ur(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(vc)) return Mh(i, c, o);
  if (t.match(/^#+0+$/)) return o + wt(c, t.length - t.indexOf("0"));
  if (i = t.match(wc))
    return a = ("" + r).replace(/^([^\.]+)$/, "$1." + Ur(i[1])).replace(/\.$/, "." + Ur(i[1])), a = a.replace(/\.(\d*)$/, function(g, d) {
      return "." + d + tr("0", Ur(i[1]).length - d.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return o + ("" + c).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return o + en("" + c);
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + At(e, t, -r) : en("" + r) + "." + tr("0", i[1].length);
  if (i = t.match(/^#,#*,#0/)) return At(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = Kn(At(e, t.replace(/[\\-]/g, ""), r)), s = 0, Kn(Kn(t.replace(/\\/g, "")).replace(/[0#]/g, function(g) {
      return s < a.length ? a.charAt(s++) : g === "0" ? "0" : "";
    }));
  if (t.match(Ec))
    return a = At(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var l = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = ki(c, Math.pow(10, s) - 1, !1), a = "" + o, l = Ut(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), l.charAt(l.length - 1) == " " && (l = l.substr(0, l.length - 1) + "0"), a += l + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], l = Ti(f[2], s), l.length < i[4].length && (l = Ur(i[4].substr(i[4].length - l.length)) + l), a += l, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = ki(c, Math.pow(10, s) - 1, !0), o + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? Us(f[1], s) + i[2] + "/" + i[3] + Ti(f[2], s) : tr(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = "" + r, t.length <= a.length ? a : Ur(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var h = t.indexOf(".") - s, u = t.length - a.length - h;
    return Ur(t.substr(0, h) + a + t.substr(t.length - u));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return r < 0 ? "-" + At(e, t, -r) : en("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(g) {
      return "00," + (g.length < 3 ? wt(0, 3 - g.length) : "") + g;
    }) + "." + wt(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var x = en("" + c);
      return x !== "0" ? o + x : "";
    default:
      if (t.match(/\.[0#?]*$/)) return At(e, t.slice(0, t.lastIndexOf(".")), r) + Ur(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function Ut(e, t, r) {
  return (r | 0) === r ? At(e, t, r) : at(e, t, r);
}
function $h(e) {
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
var Tc = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function aa(e) {
  for (var t = 0, r = "", n = ""; t < e.length; )
    switch (r = e.charAt(t)) {
      case "G":
        Si(e, t) && (t += 6), t++;
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
        if (n.match(Tc)) return !0;
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
function zh(e, t, r, n) {
  for (var a = [], i = "", s = 0, f = "", c = "t", o, l, h, u = "H"; s < e.length; )
    switch (f = e.charAt(s)) {
      case "G":
        if (!Si(e, s)) throw new Error("unrecognized character " + f + " in " + e);
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
          if (o == null && (o = vn(t, r, e.charAt(s + 1) === "2"), o == null))
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
        if (t < 0 || o == null && (o = vn(t, r), o == null))
          return "";
        for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f; ) i += f;
        f === "m" && c.toLowerCase() === "h" && (f = "M"), f === "h" && (f = u), a[a.length] = { t: f, v: i }, c = f;
        break;
      case "A":
      case "a":
      case "上":
        var d = { t: f, v: f };
        if (o == null && (o = vn(t, r)), e.substr(s, 3).toUpperCase() === "A/P" ? (o != null && (d.v = o.H >= 12 ? "P" : "A"), d.t = "T", u = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (o != null && (d.v = o.H >= 12 ? "PM" : "AM"), d.t = "T", s += 5, u = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (o != null && (d.v = o.H >= 12 ? "下午" : "上午"), d.t = "T", s += 5, u = "h") : (d.t = "t", ++s), o == null && d.t === "T") return "";
        a[a.length] = d, c = f;
        break;
      case "[":
        for (i = f; e.charAt(s++) !== "]" && s < e.length; ) i += e.charAt(s);
        if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
        if (i.match(Tc)) {
          if (o == null && (o = vn(t, r), o == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, c = i.charAt(1);
        } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", aa(e) || (a[a.length] = { t: "t", v: i }));
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
  var p = 0, w = 0, y;
  for (s = a.length - 1, c = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = u, c = "h", p < 1 && (p = 1);
        break;
      case "s":
        (y = a[s].v.match(/\.0+$/)) && (w = Math.max(w, y[0].length - 1)), p < 3 && (p = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        c = a[s].t;
        break;
      case "m":
        c === "s" && (a[s].t = "M", p < 2 && (p = 2));
        break;
      case "X":
        break;
      case "Z":
        p < 1 && a[s].v.match(/[Hh]/) && (p = 1), p < 2 && a[s].v.match(/[Mm]/) && (p = 2), p < 3 && a[s].v.match(/[Ss]/) && (p = 3);
    }
  switch (p) {
    case 0:
      break;
    case 1:
      o.u >= 0.5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M), o.M >= 60 && (o.M = 0, ++o.H);
      break;
    case 2:
      o.u >= 0.5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M);
      break;
  }
  var v = "", N;
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
        a[s].v = Dh(a[s].t.charCodeAt(0), a[s].v, o, w), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (N = s + 1; a[N] != null && ((f = a[N].t) === "?" || f === "D" || (f === " " || f === "t") && a[N + 1] != null && (a[N + 1].t === "?" || a[N + 1].t === "t" && a[N + 1].v === "/") || a[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (a[N].v === "/" || a[N].v === " " && a[N + 1] != null && a[N + 1].t == "?")); )
          a[s].v += a[N].v, a[N] = { v: "", t: ";" }, ++N;
        v += a[s].v, s = N - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = Sn(t, r);
        break;
    }
  var T = "", I, k;
  if (v.length > 0) {
    v.charCodeAt(0) == 40 ? (I = t < 0 && v.charCodeAt(0) === 45 ? -t : t, k = Ut("n", v, I)) : (I = t < 0 && n > 1 ? -t : t, k = Ut("n", v, I), I < 0 && a[0] && a[0].t == "t" && (k = k.substr(1), a[0].v = "-" + a[0].v)), N = k.length - 1;
    var U = a.length;
    for (s = 0; s < a.length; ++s) if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
      U = s;
      break;
    }
    var C = a.length;
    if (U === a.length && k.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null || "n?".indexOf(a[s].t) === -1 || (N >= a[s].v.length - 1 ? (N -= a[s].v.length, a[s].v = k.substr(N + 1, a[s].v.length)) : N < 0 ? a[s].v = "" : (a[s].v = k.substr(0, N + 1), N = -1), a[s].t = "t", C = s);
      N >= 0 && C < a.length && (a[C].v = k.substr(0, N + 1) + a[C].v);
    } else if (U !== a.length && k.indexOf("E") === -1) {
      for (N = k.indexOf(".") - 1, s = U; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (l = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, T = a[s].v.substr(l + 1); l >= 0; --l)
            N >= 0 && (a[s].v.charAt(l) === "0" || a[s].v.charAt(l) === "#") && (T = k.charAt(N--) + T);
          a[s].v = T, a[s].t = "t", C = s;
        }
      for (N >= 0 && C < a.length && (a[C].v = k.substr(0, N + 1) + a[C].v), N = k.indexOf(".") + 1, s = U; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== U)) {
          for (l = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") + 1 : 0, T = a[s].v.substr(0, l); l < a[s].v.length; ++l)
            N < k.length && (T += k.charAt(N++));
          a[s].v = T, a[s].t = "t", C = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s) a[s] != null && "n?".indexOf(a[s].t) > -1 && (I = n > 1 && t < 0 && s > 0 && a[s - 1].v === "-" ? -t : t, a[s].v = Ut(a[s].t, a[s].v, I), a[s].t = "t");
  var D = "";
  for (s = 0; s !== a.length; ++s) a[s] != null && (D += a[s].v);
  return D;
}
var z0 = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function G0(e, t) {
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
function Gh(e, t) {
  var r = $h(e), n = r.length, a = r[n - 1].indexOf("@");
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
    var s = r[0].match(z0), f = r[1].match(z0);
    return G0(t, s) ? [n, r[0]] : G0(t, f) ? [n, r[1]] : [n, r[s != null && f != null ? 2 : 1]];
  }
  return [n, i];
}
function ut(e, t, r) {
  r == null && (r = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? n = r.dateNF : n = e;
      break;
    case "number":
      e == 14 && r.dateNF ? n = r.dateNF : n = (r.table != null ? r.table : Ee)[e], n == null && (n = r.table && r.table[H0[e]] || Ee[H0[e]]), n == null && (n = Fh[e] || "General");
      break;
  }
  if (Si(n, 0)) return Sn(t, r);
  t instanceof Date && (t = gc(t, r.date1904));
  var a = Gh(n, t);
  if (Si(a[1])) return Sn(t, r);
  if (t === !0) t = "TRUE";
  else if (t === !1) t = "FALSE";
  else if (t === "" || t == null) return "";
  return zh(a[1], t, r, a[0]);
}
function Wt(e, t) {
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
function Ui(e) {
  for (var t = 0; t != 392; ++t)
    e[t] !== void 0 && Wt(e[t], t);
}
function ia() {
  Ee = Ah();
}
var jh = {
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
}, Sc = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function Xh(e) {
  var t = typeof e == "number" ? Ee[e] : e;
  return t = t.replace(Sc, "(\\d+)"), new RegExp("^" + t + "$");
}
function Yh(e, t, r) {
  var n = -1, a = -1, i = -1, s = -1, f = -1, c = -1;
  (t.match(Sc) || []).forEach(function(h, u) {
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
var Kh = /* @__PURE__ */ function() {
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
  var a = n(r), i = a[0], s = a[1], f = a[2], c = a[3], o = a[4], l = a[5], h = a[6], u = a[7], x = a[8], g = a[9], d = a[10], p = a[11], w = a[12], y = a[13], v = a[14];
  function N(k, U) {
    for (var C = U ^ -1, D = 0, M = k.length; D < M; ) C = C >>> 8 ^ r[(C ^ k.charCodeAt(D++)) & 255];
    return ~C;
  }
  function T(k, U) {
    for (var C = U ^ -1, D = k.length - 15, M = 0; M < D; ) C = v[k[M++] ^ C & 255] ^ y[k[M++] ^ C >> 8 & 255] ^ w[k[M++] ^ C >> 16 & 255] ^ p[k[M++] ^ C >>> 24] ^ d[k[M++]] ^ g[k[M++]] ^ x[k[M++]] ^ u[k[M++]] ^ h[k[M++]] ^ l[k[M++]] ^ o[k[M++]] ^ c[k[M++]] ^ f[k[M++]] ^ s[k[M++]] ^ i[k[M++]] ^ r[k[M++]];
    for (D += 15; M < D; ) C = C >>> 8 ^ r[(C ^ k[M++]) & 255];
    return ~C;
  }
  function I(k, U) {
    for (var C = U ^ -1, D = 0, M = k.length, B = 0, Y = 0; D < M; )
      B = k.charCodeAt(D++), B < 128 ? C = C >>> 8 ^ r[(C ^ B) & 255] : B < 2048 ? (C = C >>> 8 ^ r[(C ^ (192 | B >> 6 & 31)) & 255], C = C >>> 8 ^ r[(C ^ (128 | B & 63)) & 255]) : B >= 55296 && B < 57344 ? (B = (B & 1023) + 64, Y = k.charCodeAt(D++) & 1023, C = C >>> 8 ^ r[(C ^ (240 | B >> 8 & 7)) & 255], C = C >>> 8 ^ r[(C ^ (128 | B >> 2 & 63)) & 255], C = C >>> 8 ^ r[(C ^ (128 | Y >> 6 & 15 | (B & 3) << 4)) & 255], C = C >>> 8 ^ r[(C ^ (128 | Y & 63)) & 255]) : (C = C >>> 8 ^ r[(C ^ (224 | B >> 12 & 15)) & 255], C = C >>> 8 ^ r[(C ^ (128 | B >> 6 & 63)) & 255], C = C >>> 8 ^ r[(C ^ (128 | B & 63)) & 255]);
    return ~C;
  }
  return e.table = r, e.bstr = N, e.buf = T, e.str = I, e;
}(), ve = /* @__PURE__ */ function() {
  var t = {};
  t.version = "1.2.1";
  function r(m, S) {
    for (var _ = m.split("/"), E = S.split("/"), A = 0, F = 0, z = Math.min(_.length, E.length); A < z; ++A) {
      if (F = _[A].length - E[A].length) return F;
      if (_[A] != E[A]) return _[A] < E[A] ? -1 : 1;
    }
    return _.length - E.length;
  }
  function n(m) {
    if (m.charAt(m.length - 1) == "/") return m.slice(0, -1).indexOf("/") === -1 ? m : n(m.slice(0, -1));
    var S = m.lastIndexOf("/");
    return S === -1 ? m : m.slice(0, S + 1);
  }
  function a(m) {
    if (m.charAt(m.length - 1) == "/") return a(m.slice(0, -1));
    var S = m.lastIndexOf("/");
    return S === -1 ? m : m.slice(S + 1);
  }
  function i(m, S) {
    typeof S == "string" && (S = new Date(S));
    var _ = S.getHours();
    _ = _ << 6 | S.getMinutes(), _ = _ << 5 | S.getSeconds() >>> 1, m.write_shift(2, _);
    var E = S.getFullYear() - 1980;
    E = E << 4 | S.getMonth() + 1, E = E << 5 | S.getDate(), m.write_shift(2, E);
  }
  function s(m) {
    var S = m.read_shift(2) & 65535, _ = m.read_shift(2) & 65535, E = /* @__PURE__ */ new Date(), A = _ & 31;
    _ >>>= 5;
    var F = _ & 15;
    _ >>>= 4, E.setMilliseconds(0), E.setFullYear(_ + 1980), E.setMonth(F - 1), E.setDate(A);
    var z = S & 31;
    S >>>= 5;
    var Z = S & 63;
    return S >>>= 6, E.setHours(S), E.setMinutes(Z), E.setSeconds(z << 1), E;
  }
  function f(m) {
    Er(m, 0);
    for (var S = (
      /*::(*/
      {}
    ), _ = 0; m.l <= m.length - 4; ) {
      var E = m.read_shift(2), A = m.read_shift(2), F = m.l + A, z = {};
      switch (E) {
        case 21589:
          _ = m.read_shift(1), _ & 1 && (z.mtime = m.read_shift(4)), A > 5 && (_ & 2 && (z.atime = m.read_shift(4)), _ & 4 && (z.ctime = m.read_shift(4))), z.mtime && (z.mt = new Date(z.mtime * 1e3));
          break;
      }
      m.l = F, S[E] = z;
    }
    return S;
  }
  var c;
  function o() {
    return c || (c = {});
  }
  function l(m, S) {
    if (m[0] == 80 && m[1] == 75) return R0(m, S);
    if ((m[0] | 32) == 109 && (m[1] | 32) == 105) return ah(m, S);
    if (m.length < 512) throw new Error("CFB file size " + m.length + " < 512");
    var _ = 3, E = 512, A = 0, F = 0, z = 0, Z = 0, V = 0, G = [], j = (
      /*::(*/
      m.slice(0, 512)
    );
    Er(j, 0);
    var ae = h(j);
    switch (_ = ae[0], _) {
      case 3:
        E = 512;
        break;
      case 4:
        E = 4096;
        break;
      case 0:
        if (ae[1] == 0) return R0(m, S);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + _);
    }
    E !== 512 && (j = /*::(*/
    m.slice(0, E), Er(
      j,
      28
      /* blob.l */
    ));
    var ue = m.slice(0, E);
    u(j, _);
    var pe = j.read_shift(4, "i");
    if (_ === 3 && pe !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + pe);
    j.l += 4, z = j.read_shift(4, "i"), j.l += 4, j.chk("00100000", "Mini Stream Cutoff Size: "), Z = j.read_shift(4, "i"), A = j.read_shift(4, "i"), V = j.read_shift(4, "i"), F = j.read_shift(4, "i");
    for (var se = -1, de = 0; de < 109 && (se = j.read_shift(4, "i"), !(se < 0)); ++de)
      G[de] = se;
    var ke = x(m, E);
    p(V, F, ke, E, G);
    var qe = y(ke, z, G, E);
    qe[z].name = "!Directory", A > 0 && Z !== Y && (qe[Z].name = "!MiniFAT"), qe[G[0]].name = "!FAT", qe.fat_addrs = G, qe.ssz = E;
    var Ze = {}, Tr = [], ga = [], pa = [];
    v(z, qe, ke, Tr, A, Ze, ga, Z), g(ga, pa, Tr), Tr.shift();
    var ma = {
      FileIndex: ga,
      FullPaths: pa
    };
    return S && S.raw && (ma.raw = { header: ue, sectors: ke }), ma;
  }
  function h(m) {
    if (m[m.l] == 80 && m[m.l + 1] == 75) return [0, 0];
    m.chk(he, "Header Signature: "), m.l += 16;
    var S = m.read_shift(2, "u");
    return [m.read_shift(2, "u"), S];
  }
  function u(m, S) {
    var _ = 9;
    switch (m.l += 2, _ = m.read_shift(2)) {
      case 9:
        if (S != 3) throw new Error("Sector Shift: Expected 9 saw " + _);
        break;
      case 12:
        if (S != 4) throw new Error("Sector Shift: Expected 12 saw " + _);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + _);
    }
    m.chk("0600", "Mini Sector Shift: "), m.chk("000000000000", "Reserved: ");
  }
  function x(m, S) {
    for (var _ = Math.ceil(m.length / S) - 1, E = [], A = 1; A < _; ++A) E[A - 1] = m.slice(A * S, (A + 1) * S);
    return E[_ - 1] = m.slice(_ * S), E;
  }
  function g(m, S, _) {
    for (var E = 0, A = 0, F = 0, z = 0, Z = 0, V = _.length, G = [], j = []; E < V; ++E)
      G[E] = j[E] = E, S[E] = _[E];
    for (; Z < j.length; ++Z)
      E = j[Z], A = m[E].L, F = m[E].R, z = m[E].C, G[E] === E && (A !== -1 && G[A] !== A && (G[E] = G[A]), F !== -1 && G[F] !== F && (G[E] = G[F])), z !== -1 && (G[z] = E), A !== -1 && E != G[E] && (G[A] = G[E], j.lastIndexOf(A) < Z && j.push(A)), F !== -1 && E != G[E] && (G[F] = G[E], j.lastIndexOf(F) < Z && j.push(F));
    for (E = 1; E < V; ++E) G[E] === E && (F !== -1 && G[F] !== F ? G[E] = G[F] : A !== -1 && G[A] !== A && (G[E] = G[A]));
    for (E = 1; E < V; ++E)
      if (m[E].type !== 0) {
        if (Z = E, Z != G[Z]) do
          Z = G[Z], S[E] = S[Z] + "/" + S[E];
        while (Z !== 0 && G[Z] !== -1 && Z != G[Z]);
        G[E] = -1;
      }
    for (S[0] += "/", E = 1; E < V; ++E)
      m[E].type !== 2 && (S[E] += "/");
  }
  function d(m, S, _) {
    for (var E = m.start, A = m.size, F = [], z = E; _ && A > 0 && z >= 0; )
      F.push(S.slice(z * B, z * B + B)), A -= B, z = pn(_, z * 4);
    return F.length === 0 ? q(0) : vr(F).slice(0, m.size);
  }
  function p(m, S, _, E, A) {
    var F = Y;
    if (m === Y) {
      if (S !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (m !== -1) {
      var z = _[m], Z = (E >>> 2) - 1;
      if (!z) return;
      for (var V = 0; V < Z && (F = pn(z, V * 4)) !== Y; ++V)
        A.push(F);
      p(pn(z, E - 4), S - 1, _, E, A);
    }
  }
  function w(m, S, _, E, A) {
    var F = [], z = [];
    A || (A = []);
    var Z = E - 1, V = 0, G = 0;
    for (V = S; V >= 0; ) {
      A[V] = !0, F[F.length] = V, z.push(m[V]);
      var j = _[Math.floor(V * 4 / E)];
      if (G = V * 4 & Z, E < 4 + G) throw new Error("FAT boundary crossed: " + V + " 4 " + E);
      if (!m[j]) break;
      V = pn(m[j], G);
    }
    return { nodes: F, data: nf([z]) };
  }
  function y(m, S, _, E) {
    var A = m.length, F = [], z = [], Z = [], V = [], G = E - 1, j = 0, ae = 0, ue = 0, pe = 0;
    for (j = 0; j < A; ++j)
      if (Z = [], ue = j + S, ue >= A && (ue -= A), !z[ue]) {
        V = [];
        var se = [];
        for (ae = ue; ae >= 0; ) {
          se[ae] = !0, z[ae] = !0, Z[Z.length] = ae, V.push(m[ae]);
          var de = _[Math.floor(ae * 4 / E)];
          if (pe = ae * 4 & G, E < 4 + pe) throw new Error("FAT boundary crossed: " + ae + " 4 " + E);
          if (!m[de] || (ae = pn(m[de], pe), se[ae])) break;
        }
        F[ue] = { nodes: Z, data: nf([V]) };
      }
    return F;
  }
  function v(m, S, _, E, A, F, z, Z) {
    for (var V = 0, G = E.length ? 2 : 0, j = S[m].data, ae = 0, ue = 0, pe; ae < j.length; ae += 128) {
      var se = (
        /*::(*/
        j.slice(ae, ae + 128)
      );
      Er(se, 64), ue = se.read_shift(2), pe = Xs(se, 0, ue - G), E.push(pe);
      var de = {
        name: pe,
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
      ke !== 0 && (de.ct = N(se, se.l - 8));
      var qe = se.read_shift(2) + se.read_shift(2) + se.read_shift(2) + se.read_shift(2);
      qe !== 0 && (de.mt = N(se, se.l - 8)), de.start = se.read_shift(4, "i"), de.size = se.read_shift(4, "i"), de.size < 0 && de.start < 0 && (de.size = de.type = 0, de.start = Y, de.name = ""), de.type === 5 ? (V = de.start, A > 0 && V !== Y && (S[V].name = "!StreamData")) : de.size >= 4096 ? (de.storage = "fat", S[de.start] === void 0 && (S[de.start] = w(_, de.start, S.fat_addrs, S.ssz)), S[de.start].name = de.name, de.content = S[de.start].data.slice(0, de.size)) : (de.storage = "minifat", de.size < 0 ? de.size = 0 : V !== Y && de.start !== Y && S[V] && (de.content = d(de, S[V].data, (S[Z] || {}).data))), de.content && Er(de.content, 0), F[pe] = de, z.push(de);
    }
  }
  function N(m, S) {
    return new Date((Kr(m, S + 4) / 1e7 * Math.pow(2, 32) + Kr(m, S) / 1e7 - 11644473600) * 1e3);
  }
  function T(m, S) {
    return o(), l(c.readFileSync(m), S);
  }
  function I(m, S) {
    var _ = S && S.type;
    switch (_ || Ce && Buffer.isBuffer(m) && (_ = "buffer"), _ || "base64") {
      case "file":
        return T(m, S);
      case "base64":
        return l(Jr(Zr(m)), S);
      case "binary":
        return l(Jr(m), S);
    }
    return l(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      m,
      S
    );
  }
  function k(m, S) {
    var _ = S || {}, E = _.root || "Root Entry";
    if (m.FullPaths || (m.FullPaths = []), m.FileIndex || (m.FileIndex = []), m.FullPaths.length !== m.FileIndex.length) throw new Error("inconsistent CFB structure");
    m.FullPaths.length === 0 && (m.FullPaths[0] = E + "/", m.FileIndex[0] = { name: E, type: 5 }), _.CLSID && (m.FileIndex[0].clsid = _.CLSID), U(m);
  }
  function U(m) {
    var S = "Sh33tJ5";
    if (!ve.find(m, "/" + S)) {
      var _ = q(4);
      _[0] = 55, _[1] = _[3] = 50, _[2] = 54, m.FileIndex.push({ name: S, type: 2, content: _, size: 4, L: 69, R: 69, C: 69 }), m.FullPaths.push(m.FullPaths[0] + S), C(m);
    }
  }
  function C(m, S) {
    k(m);
    for (var _ = !1, E = !1, A = m.FullPaths.length - 1; A >= 0; --A) {
      var F = m.FileIndex[A];
      switch (F.type) {
        case 0:
          E ? _ = !0 : (m.FileIndex.pop(), m.FullPaths.pop());
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
      for (A = 0; A < m.FullPaths.length; ++A)
        V[m.FullPaths[A]] = !0, m.FileIndex[A].type !== 0 && G.push([m.FullPaths[A], m.FileIndex[A]]);
      for (A = 0; A < G.length; ++A) {
        var j = n(G[A][0]);
        E = V[j], E || (G.push([j, {
          name: a(j).replace("/", ""),
          type: 1,
          clsid: ee,
          ct: z,
          mt: z,
          content: null
        }]), V[j] = !0);
      }
      for (G.sort(function(pe, se) {
        return r(pe[0], se[0]);
      }), m.FullPaths = [], m.FileIndex = [], A = 0; A < G.length; ++A)
        m.FullPaths[A] = G[A][0], m.FileIndex[A] = G[A][1];
      for (A = 0; A < G.length; ++A) {
        var ae = m.FileIndex[A], ue = m.FullPaths[A];
        if (ae.name = a(ue).replace("/", ""), ae.L = ae.R = ae.C = -(ae.color = 1), ae.size = ae.content ? ae.content.length : 0, ae.start = 0, ae.clsid = ae.clsid || ee, A === 0)
          ae.C = G.length > 1 ? 1 : -1, ae.size = 0, ae.type = 5;
        else if (ue.slice(-1) == "/") {
          for (Z = A + 1; Z < G.length && n(m.FullPaths[Z]) != ue; ++Z) ;
          for (ae.C = Z >= G.length ? -1 : Z, Z = A + 1; Z < G.length && n(m.FullPaths[Z]) != n(ue); ++Z) ;
          ae.R = Z >= G.length ? -1 : Z, ae.type = 1;
        } else
          n(m.FullPaths[A + 1] || "") == n(ue) && (ae.R = A + 1), ae.type = 2;
      }
    }
  }
  function D(m, S) {
    var _ = S || {};
    if (_.fileType == "mad") return ih(m, _);
    switch (C(m), _.fileType) {
      case "zip":
        return Zl(m, _);
    }
    var E = function(pe) {
      for (var se = 0, de = 0, ke = 0; ke < pe.FileIndex.length; ++ke) {
        var qe = pe.FileIndex[ke];
        if (qe.content) {
          var Ze = qe.content.length;
          Ze > 0 && (Ze < 4096 ? se += Ze + 63 >> 6 : de += Ze + 511 >> 9);
        }
      }
      for (var Tr = pe.FullPaths.length + 3 >> 2, ga = se + 7 >> 3, pa = se + 127 >> 7, ma = ga + de + Tr + pa, dn = ma + 127 >> 7, Qi = dn <= 109 ? 0 : Math.ceil((dn - 109) / 127); ma + dn + Qi + 127 >> 7 > dn; ) Qi = ++dn <= 109 ? 0 : Math.ceil((dn - 109) / 127);
      var Bt = [1, Qi, dn, pa, Tr, de, se, 0];
      return pe.FileIndex[0].size = se << 6, Bt[7] = (pe.FileIndex[0].start = Bt[0] + Bt[1] + Bt[2] + Bt[3] + Bt[4] + Bt[5]) + (Bt[6] + 7 >> 3), Bt;
    }(m), A = q(E[7] << 9), F = 0, z = 0;
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
    var Z = function(pe) {
      for (z += pe; F < z - 1; ++F) A.write_shift(-4, F + 1);
      pe && (++F, A.write_shift(-4, Y));
    };
    for (z = F = 0, z += E[1]; F < z; ++F) A.write_shift(-4, ne.DIFSECT);
    for (z += E[2]; F < z; ++F) A.write_shift(-4, ne.FATSECT);
    Z(E[3]), Z(E[4]);
    for (var V = 0, G = 0, j = m.FileIndex[0]; V < m.FileIndex.length; ++V)
      j = m.FileIndex[V], j.content && (G = j.content.length, !(G < 4096) && (j.start = z, Z(G + 511 >> 9)));
    for (Z(E[6] + 7 >> 3); A.l & 511; ) A.write_shift(-4, ne.ENDOFCHAIN);
    for (z = F = 0, V = 0; V < m.FileIndex.length; ++V)
      j = m.FileIndex[V], j.content && (G = j.content.length, !(!G || G >= 4096) && (j.start = z, Z(G + 63 >> 6)));
    for (; A.l & 511; ) A.write_shift(-4, ne.ENDOFCHAIN);
    for (F = 0; F < E[4] << 2; ++F) {
      var ae = m.FullPaths[F];
      if (!ae || ae.length === 0) {
        for (V = 0; V < 17; ++V) A.write_shift(4, 0);
        for (V = 0; V < 3; ++V) A.write_shift(4, -1);
        for (V = 0; V < 12; ++V) A.write_shift(4, 0);
        continue;
      }
      j = m.FileIndex[F], F === 0 && (j.start = j.size ? j.start - 1 : Y);
      var ue = F === 0 && _.root || j.name;
      if (G = 2 * (ue.length + 1), A.write_shift(64, ue, "utf16le"), A.write_shift(2, G), A.write_shift(1, j.type), A.write_shift(1, j.color), A.write_shift(-4, j.L), A.write_shift(-4, j.R), A.write_shift(-4, j.C), j.clsid) A.write_shift(16, j.clsid, "hex");
      else for (V = 0; V < 4; ++V) A.write_shift(4, 0);
      A.write_shift(4, j.state || 0), A.write_shift(4, 0), A.write_shift(4, 0), A.write_shift(4, 0), A.write_shift(4, 0), A.write_shift(4, j.start), A.write_shift(4, j.size), A.write_shift(4, 0);
    }
    for (F = 1; F < m.FileIndex.length; ++F)
      if (j = m.FileIndex[F], j.size >= 4096)
        if (A.l = j.start + 1 << 9, Ce && Buffer.isBuffer(j.content))
          j.content.copy(A, A.l, 0, j.size), A.l += j.size + 511 & -512;
        else {
          for (V = 0; V < j.size; ++V) A.write_shift(1, j.content[V]);
          for (; V & 511; ++V) A.write_shift(1, 0);
        }
    for (F = 1; F < m.FileIndex.length; ++F)
      if (j = m.FileIndex[F], j.size > 0 && j.size < 4096)
        if (Ce && Buffer.isBuffer(j.content))
          j.content.copy(A, A.l, 0, j.size), A.l += j.size + 63 & -64;
        else {
          for (V = 0; V < j.size; ++V) A.write_shift(1, j.content[V]);
          for (; V & 63; ++V) A.write_shift(1, 0);
        }
    if (Ce)
      A.l = A.length;
    else
      for (; A.l < A.length; ) A.write_shift(1, 0);
    return A;
  }
  function M(m, S) {
    var _ = m.FullPaths.map(function(V) {
      return V.toUpperCase();
    }), E = _.map(function(V) {
      var G = V.split("/");
      return G[G.length - (V.slice(-1) == "/" ? 2 : 1)];
    }), A = !1;
    S.charCodeAt(0) === 47 ? (A = !0, S = _[0].slice(0, -1) + S) : A = S.indexOf("/") !== -1;
    var F = S.toUpperCase(), z = A === !0 ? _.indexOf(F) : E.indexOf(F);
    if (z !== -1) return m.FileIndex[z];
    var Z = !F.match(ya);
    for (F = F.replace(Hr, ""), Z && (F = F.replace(ya, "!")), z = 0; z < _.length; ++z)
      if ((Z ? _[z].replace(ya, "!") : _[z]).replace(Hr, "") == F || (Z ? E[z].replace(ya, "!") : E[z]).replace(Hr, "") == F) return m.FileIndex[z];
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
  function De(m, S, _) {
    o();
    var E = D(m, _);
    c.writeFileSync(S, E);
  }
  function H(m) {
    for (var S = new Array(m.length), _ = 0; _ < m.length; ++_) S[_] = String.fromCharCode(m[_]);
    return S.join("");
  }
  function _e(m, S) {
    var _ = D(m, S);
    switch (S && S.type || "buffer") {
      case "file":
        return o(), c.writeFileSync(S.filename, _), _;
      case "binary":
        return typeof _ == "string" ? _ : H(_);
      case "base64":
        return Ra(typeof _ == "string" ? _ : H(_));
      case "buffer":
        if (Ce) return Buffer.isBuffer(_) ? _ : Gt(_);
      case "array":
        return typeof _ == "string" ? Jr(_) : _;
    }
    return _;
  }
  var Se;
  function O(m) {
    try {
      var S = m.InflateRaw, _ = new S();
      if (_._processChunk(new Uint8Array([3, 0]), _._finishFlushFlag), _.bytesRead) Se = m;
      else throw new Error("zlib does not expose bytesRead");
    } catch (E) {
      console.error("cannot use native zlib: " + (E.message || E));
    }
  }
  function P(m, S) {
    if (!Se) return B0(m, S);
    var _ = Se.InflateRaw, E = new _(), A = E._processChunk(m.slice(m.l), E._finishFlushFlag);
    return m.l += E.bytesRead, A;
  }
  function R(m) {
    return Se ? Se.deflateRawSync(m) : Oe(m);
  }
  var L = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], Q = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], fe = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function ce(m) {
    var S = (m << 1 | m << 11) & 139536 | (m << 5 | m << 15) & 558144;
    return (S >> 16 | S >> 8 | S) & 255;
  }
  for (var ie = typeof Uint8Array < "u", te = ie ? new Uint8Array(256) : [], be = 0; be < 256; ++be) te[be] = ce(be);
  function b(m, S) {
    var _ = te[m & 255];
    return S <= 8 ? _ >>> 8 - S : (_ = _ << 8 | te[m >> 8 & 255], S <= 16 ? _ >>> 16 - S : (_ = _ << 8 | te[m >> 16 & 255], _ >>> 24 - S));
  }
  function Xe(m, S) {
    var _ = S & 7, E = S >>> 3;
    return (m[E] | (_ <= 6 ? 0 : m[E + 1] << 8)) >>> _ & 3;
  }
  function Re(m, S) {
    var _ = S & 7, E = S >>> 3;
    return (m[E] | (_ <= 5 ? 0 : m[E + 1] << 8)) >>> _ & 7;
  }
  function je(m, S) {
    var _ = S & 7, E = S >>> 3;
    return (m[E] | (_ <= 4 ? 0 : m[E + 1] << 8)) >>> _ & 15;
  }
  function Be(m, S) {
    var _ = S & 7, E = S >>> 3;
    return (m[E] | (_ <= 3 ? 0 : m[E + 1] << 8)) >>> _ & 31;
  }
  function xe(m, S) {
    var _ = S & 7, E = S >>> 3;
    return (m[E] | (_ <= 1 ? 0 : m[E + 1] << 8)) >>> _ & 127;
  }
  function ir(m, S, _) {
    var E = S & 7, A = S >>> 3, F = (1 << _) - 1, z = m[A] >>> E;
    return _ < 8 - E || (z |= m[A + 1] << 8 - E, _ < 16 - E) || (z |= m[A + 2] << 16 - E, _ < 24 - E) || (z |= m[A + 3] << 24 - E), z & F;
  }
  function rt(m, S, _) {
    var E = S & 7, A = S >>> 3;
    return E <= 5 ? m[A] |= (_ & 7) << E : (m[A] |= _ << E & 255, m[A + 1] = (_ & 7) >> 8 - E), S + 3;
  }
  function Tt(m, S, _) {
    var E = S & 7, A = S >>> 3;
    return _ = (_ & 1) << E, m[A] |= _, S + 1;
  }
  function It(m, S, _) {
    var E = S & 7, A = S >>> 3;
    return _ <<= E, m[A] |= _ & 255, _ >>>= 8, m[A + 1] = _, S + 8;
  }
  function xa(m, S, _) {
    var E = S & 7, A = S >>> 3;
    return _ <<= E, m[A] |= _ & 255, _ >>>= 8, m[A + 1] = _ & 255, m[A + 2] = _ >>> 8, S + 16;
  }
  function Yt(m, S) {
    var _ = m.length, E = 2 * _ > S ? 2 * _ : S + 5, A = 0;
    if (_ >= S) return m;
    if (Ce) {
      var F = M0(E);
      if (m.copy) m.copy(F);
      else for (; A < m.length; ++A) F[A] = m[A];
      return F;
    } else if (ie) {
      var z = new Uint8Array(E);
      if (z.set) z.set(m);
      else for (; A < _; ++A) z[A] = m[A];
      return z;
    }
    return m.length = E, m;
  }
  function jr(m) {
    for (var S = new Array(m), _ = 0; _ < m; ++_) S[_] = 0;
    return S;
  }
  function Nt(m, S, _) {
    var E = 1, A = 0, F = 0, z = 0, Z = 0, V = m.length, G = ie ? new Uint16Array(32) : jr(32);
    for (F = 0; F < 32; ++F) G[F] = 0;
    for (F = V; F < _; ++F) m[F] = 0;
    V = m.length;
    var j = ie ? new Uint16Array(V) : jr(V);
    for (F = 0; F < V; ++F)
      G[A = m[F]]++, E < A && (E = A), j[F] = 0;
    for (G[0] = 0, F = 1; F <= E; ++F) G[F + 16] = Z = Z + G[F - 1] << 1;
    for (F = 0; F < V; ++F)
      Z = m[F], Z != 0 && (j[F] = G[Z + 16]++);
    var ae = 0;
    for (F = 0; F < V; ++F)
      if (ae = m[F], ae != 0)
        for (Z = b(j[F], E) >> E - ae, z = (1 << E + 4 - ae) - 1; z >= 0; --z)
          S[Z | z << ae] = ae & 15 | F << 4;
    return E;
  }
  var Kt = ie ? new Uint16Array(512) : jr(512), da = ie ? new Uint16Array(32) : jr(32);
  if (!ie) {
    for (var Rr = 0; Rr < 512; ++Rr) Kt[Rr] = 0;
    for (Rr = 0; Rr < 32; ++Rr) da[Rr] = 0;
  }
  (function() {
    for (var m = [], S = 0; S < 32; S++) m.push(5);
    Nt(m, da, 32);
    var _ = [];
    for (S = 0; S <= 143; S++) _.push(8);
    for (; S <= 255; S++) _.push(9);
    for (; S <= 279; S++) _.push(7);
    for (; S <= 287; S++) _.push(8);
    Nt(_, Kt, 288);
  })();
  var St = /* @__PURE__ */ function() {
    for (var S = ie ? new Uint8Array(32768) : [], _ = 0, E = 0; _ < fe.length - 1; ++_)
      for (; E < fe[_ + 1]; ++E) S[E] = _;
    for (; E < 32768; ++E) S[E] = 29;
    var A = ie ? new Uint8Array(259) : [];
    for (_ = 0, E = 0; _ < Q.length - 1; ++_)
      for (; E < Q[_ + 1]; ++E) A[E] = _;
    function F(Z, V) {
      for (var G = 0; G < Z.length; ) {
        var j = Math.min(65535, Z.length - G), ae = G + j == Z.length;
        for (V.write_shift(1, +ae), V.write_shift(2, j), V.write_shift(2, ~j & 65535); j-- > 0; ) V[V.l++] = Z[G++];
      }
      return V.l;
    }
    function z(Z, V) {
      for (var G = 0, j = 0, ae = ie ? new Uint16Array(32768) : []; j < Z.length; ) {
        var ue = (
          /* data.length - boff; */
          Math.min(65535, Z.length - j)
        );
        if (ue < 10) {
          for (G = rt(V, G, +(j + ue == Z.length)), G & 7 && (G += 8 - (G & 7)), V.l = G / 8 | 0, V.write_shift(2, ue), V.write_shift(2, ~ue & 65535); ue-- > 0; ) V[V.l++] = Z[j++];
          G = V.l * 8;
          continue;
        }
        G = rt(V, G, +(j + ue == Z.length) + 2);
        for (var pe = 0; ue-- > 0; ) {
          var se = Z[j];
          pe = (pe << 5 ^ se) & 32767;
          var de = -1, ke = 0;
          if ((de = ae[pe]) && (de |= j & -32768, de > j && (de -= 32768), de < j))
            for (; Z[de + ke] == Z[j + ke] && ke < 250; ) ++ke;
          if (ke > 2) {
            se = A[ke], se <= 22 ? G = It(V, G, te[se + 1] >> 1) - 1 : (It(V, G, 3), G += 5, It(V, G, te[se - 23] >> 5), G += 3);
            var qe = se < 8 ? 0 : se - 4 >> 2;
            qe > 0 && (xa(V, G, ke - Q[se]), G += qe), se = S[j - de], G = It(V, G, te[se] >> 3), G -= 3;
            var Ze = se < 4 ? 0 : se - 2 >> 1;
            Ze > 0 && (xa(V, G, j - de - fe[se]), G += Ze);
            for (var Tr = 0; Tr < ke; ++Tr)
              ae[pe] = j & 32767, pe = (pe << 5 ^ Z[j]) & 32767, ++j;
            ue -= ke - 1;
          } else
            se <= 143 ? se = se + 48 : G = Tt(V, G, 1), G = It(V, G, te[se]), ae[pe] = j & 32767, ++j;
        }
        G = It(V, G, 0) - 1;
      }
      return V.l = (G + 7) / 8 | 0, V.l;
    }
    return function(V, G) {
      return V.length < 8 ? F(V, G) : z(V, G);
    };
  }();
  function Oe(m) {
    var S = q(50 + Math.floor(m.length * 1.1)), _ = St(m, S);
    return S.slice(0, _);
  }
  var sr = ie ? new Uint16Array(32768) : jr(32768), tt = ie ? new Uint16Array(32768) : jr(32768), dr = ie ? new Uint16Array(128) : jr(128), xn = 1, N0 = 1;
  function Kl(m, S) {
    var _ = Be(m, S) + 257;
    S += 5;
    var E = Be(m, S) + 1;
    S += 5;
    var A = je(m, S) + 4;
    S += 4;
    for (var F = 0, z = ie ? new Uint8Array(19) : jr(19), Z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], V = 1, G = ie ? new Uint8Array(8) : jr(8), j = ie ? new Uint8Array(8) : jr(8), ae = z.length, ue = 0; ue < A; ++ue)
      z[L[ue]] = F = Re(m, S), V < F && (V = F), G[F]++, S += 3;
    var pe = 0;
    for (G[0] = 0, ue = 1; ue <= V; ++ue) j[ue] = pe = pe + G[ue - 1] << 1;
    for (ue = 0; ue < ae; ++ue) (pe = z[ue]) != 0 && (Z[ue] = j[pe]++);
    var se = 0;
    for (ue = 0; ue < ae; ++ue)
      if (se = z[ue], se != 0) {
        pe = te[Z[ue]] >> 8 - se;
        for (var de = (1 << 7 - se) - 1; de >= 0; --de) dr[pe | de << se] = se & 7 | ue << 3;
      }
    var ke = [];
    for (V = 1; ke.length < _ + E; )
      switch (pe = dr[xe(m, S)], S += pe & 7, pe >>>= 3) {
        case 16:
          for (F = 3 + Xe(m, S), S += 2, pe = ke[ke.length - 1]; F-- > 0; ) ke.push(pe);
          break;
        case 17:
          for (F = 3 + Re(m, S), S += 3; F-- > 0; ) ke.push(0);
          break;
        case 18:
          for (F = 11 + xe(m, S), S += 7; F-- > 0; ) ke.push(0);
          break;
        default:
          ke.push(pe), V < pe && (V = pe);
          break;
      }
    var qe = ke.slice(0, _), Ze = ke.slice(_);
    for (ue = _; ue < 286; ++ue) qe[ue] = 0;
    for (ue = E; ue < 30; ++ue) Ze[ue] = 0;
    return xn = Nt(qe, sr, 286), N0 = Nt(Ze, tt, 30), S;
  }
  function Jl(m, S) {
    if (m[0] == 3 && !(m[1] & 3))
      return [nn(S), 2];
    for (var _ = 0, E = 0, A = M0(S || 1 << 18), F = 0, z = A.length >>> 0, Z = 0, V = 0; !(E & 1); ) {
      if (E = Re(m, _), _ += 3, E >>> 1)
        E >> 1 == 1 ? (Z = 9, V = 5) : (_ = Kl(m, _), Z = xn, V = N0);
      else {
        _ & 7 && (_ += 8 - (_ & 7));
        var G = m[_ >>> 3] | m[(_ >>> 3) + 1] << 8;
        if (_ += 32, G > 0)
          for (!S && z < F + G && (A = Yt(A, F + G), z = A.length); G-- > 0; )
            A[F++] = m[_ >>> 3], _ += 8;
        continue;
      }
      for (; ; ) {
        !S && z < F + 32767 && (A = Yt(A, F + 32767), z = A.length);
        var j = ir(m, _, Z), ae = E >>> 1 == 1 ? Kt[j] : sr[j];
        if (_ += ae & 15, ae >>>= 4, !(ae >>> 8 & 255)) A[F++] = ae;
        else {
          if (ae == 256) break;
          ae -= 257;
          var ue = ae < 8 ? 0 : ae - 4 >> 2;
          ue > 5 && (ue = 0);
          var pe = F + Q[ae];
          ue > 0 && (pe += ir(m, _, ue), _ += ue), j = ir(m, _, V), ae = E >>> 1 == 1 ? da[j] : tt[j], _ += ae & 15, ae >>>= 4;
          var se = ae < 4 ? 0 : ae - 2 >> 1, de = fe[ae];
          for (se > 0 && (de += ir(m, _, se), _ += se), !S && z < pe && (A = Yt(A, pe + 100), z = A.length); F < pe; )
            A[F] = A[F - de], ++F;
        }
      }
    }
    return S ? [A, _ + 7 >>> 3] : [A.slice(0, F), _ + 7 >>> 3];
  }
  function B0(m, S) {
    var _ = m.slice(m.l || 0), E = Jl(_, S);
    return m.l += E[1], E[0];
  }
  function D0(m, S) {
    if (m)
      typeof console < "u" && console.error(S);
    else throw new Error(S);
  }
  function R0(m, S) {
    var _ = (
      /*::(*/
      m
    );
    Er(_, 0);
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
      var G = _.read_shift(4), j = _.read_shift(4), ae = _.read_shift(2), ue = _.read_shift(2), pe = _.read_shift(2);
      _.l += 8;
      var se = _.read_shift(4), de = f(
        /*::(*/
        _.slice(_.l + ae, _.l + ae + ue)
        /*:: :any)*/
      );
      _.l += ae + ue + pe;
      var ke = _.l;
      _.l = se + 4, ql(_, G, j, F, de), _.l = ke;
    }
    return F;
  }
  function ql(m, S, _, E, A) {
    m.l += 2;
    var F = m.read_shift(2), z = m.read_shift(2), Z = s(m);
    if (F & 8257) throw new Error("Unsupported ZIP encryption");
    for (var V = m.read_shift(4), G = m.read_shift(4), j = m.read_shift(4), ae = m.read_shift(2), ue = m.read_shift(2), pe = "", se = 0; se < ae; ++se) pe += String.fromCharCode(m[m.l++]);
    if (ue) {
      var de = f(
        /*::(*/
        m.slice(m.l, m.l + ue)
        /*:: :any)*/
      );
      (de[21589] || {}).mt && (Z = de[21589].mt), ((A || {})[21589] || {}).mt && (Z = A[21589].mt);
    }
    m.l += ue;
    var ke = m.slice(m.l, m.l + G);
    switch (z) {
      case 8:
        ke = P(m, j);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + z);
    }
    var qe = !1;
    F & 8 && (V = m.read_shift(4), V == 134695760 && (V = m.read_shift(4), qe = !0), G = m.read_shift(4), j = m.read_shift(4)), G != S && D0(qe, "Bad compressed size: " + S + " != " + G), j != _ && D0(qe, "Bad uncompressed size: " + _ + " != " + j), Zi(E, pe, ke, { unsafe: !0, mt: Z });
  }
  function Zl(m, S) {
    var _ = S || {}, E = [], A = [], F = q(1), z = _.compression ? 8 : 0, Z = 0, V = 0, G = 0, j = 0, ae = 0, ue = m.FullPaths[0], pe = ue, se = m.FileIndex[0], de = [], ke = 0;
    for (V = 1; V < m.FullPaths.length; ++V)
      if (pe = m.FullPaths[V].slice(ue.length), se = m.FileIndex[V], !(!se.size || !se.content || pe == "Sh33tJ5")) {
        var qe = j, Ze = q(pe.length);
        for (G = 0; G < pe.length; ++G) Ze.write_shift(1, pe.charCodeAt(G) & 127);
        Ze = Ze.slice(0, Ze.l), de[ae] = Kh.buf(
          /*::((*/
          se.content,
          0
        );
        var Tr = se.content;
        z == 8 && (Tr = R(Tr)), F = q(30), F.write_shift(4, 67324752), F.write_shift(2, 20), F.write_shift(2, Z), F.write_shift(2, z), se.mt ? i(F, se.mt) : F.write_shift(4, 0), F.write_shift(-4, de[ae]), F.write_shift(4, Tr.length), F.write_shift(
          4,
          /*::(*/
          se.content.length
        ), F.write_shift(2, Ze.length), F.write_shift(2, 0), j += F.length, E.push(F), j += Ze.length, E.push(Ze), j += Tr.length, E.push(Tr), F = q(46), F.write_shift(4, 33639248), F.write_shift(2, 0), F.write_shift(2, 20), F.write_shift(2, Z), F.write_shift(2, z), F.write_shift(4, 0), F.write_shift(-4, de[ae]), F.write_shift(4, Tr.length), F.write_shift(
          4,
          /*::(*/
          se.content.length
        ), F.write_shift(2, Ze.length), F.write_shift(2, 0), F.write_shift(2, 0), F.write_shift(2, 0), F.write_shift(2, 0), F.write_shift(4, 0), F.write_shift(4, qe), ke += F.l, A.push(F), ke += Ze.length, A.push(Ze), ++ae;
      }
    return F = q(22), F.write_shift(4, 101010256), F.write_shift(2, 0), F.write_shift(2, 0), F.write_shift(2, ae), F.write_shift(2, ae), F.write_shift(4, ke), F.write_shift(4, j), F.write_shift(2, 0), vr([vr(E), vr(A), F]);
  }
  var fi = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function Ql(m, S) {
    if (m.ctype) return m.ctype;
    var _ = m.name || "", E = _.match(/\.([^\.]+)$/);
    return E && fi[E[1]] || S && (E = (_ = S).match(/[\.\\]([^\.\\])+$/), E && fi[E[1]]) ? fi[E[1]] : "application/octet-stream";
  }
  function eh(m) {
    for (var S = Ra(m), _ = [], E = 0; E < S.length; E += 76) _.push(S.slice(E, E + 76));
    return _.join(`\r
`) + `\r
`;
  }
  function rh(m) {
    var S = m.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(G) {
      var j = G.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (j.length == 1 ? "0" + j : j);
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
  function th(m) {
    for (var S = [], _ = 0; _ < m.length; ++_) {
      for (var E = m[_]; _ <= m.length && E.charAt(E.length - 1) == "="; ) E = E.slice(0, E.length - 1) + m[++_];
      S.push(E);
    }
    for (var A = 0; A < S.length; ++A) S[A] = S[A].replace(/[=][0-9A-Fa-f]{2}/g, function(F) {
      return String.fromCharCode(parseInt(F.slice(1), 16));
    });
    return Jr(S.join(`\r
`));
  }
  function nh(m, S, _) {
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
        z = Jr(Zr(S.slice(Z).join("")));
        break;
      case "quoted-printable":
        z = th(S.slice(Z));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + A);
    }
    var j = Zi(m, E.slice(_.length), z, { unsafe: !0 });
    F && (j.ctype = F);
  }
  function ah(m, S) {
    if (H(m.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var _ = S && S.root || "", E = (Ce && Buffer.isBuffer(m) ? m.toString("binary") : H(m)).split(`\r
`), A = 0, F = "";
    for (A = 0; A < E.length; ++A)
      if (F = E[A], !!/^Content-Location:/i.test(F) && (F = F.slice(F.indexOf("file")), _ || (_ = F.slice(0, F.lastIndexOf("/") + 1)), F.slice(0, _.length) != _))
        for (; _.length > 0 && (_ = _.slice(0, _.length - 1), _ = _.slice(0, _.lastIndexOf("/") + 1), F.slice(0, _.length) != _); )
          ;
    var z = (E[1] || "").match(/boundary="(.*?)"/);
    if (!z) throw new Error("MAD cannot find boundary");
    var Z = "--" + (z[1] || ""), V = [], G = [], j = {
      FileIndex: V,
      FullPaths: G
    };
    k(j);
    var ae, ue = 0;
    for (A = 0; A < E.length; ++A) {
      var pe = E[A];
      pe !== Z && pe !== Z + "--" || (ue++ && nh(j, E.slice(ae, A), _), ae = A);
    }
    return j;
  }
  function ih(m, S) {
    var _ = S || {}, E = _.boundary || "SheetJS";
    E = "------=" + E;
    for (var A = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + E.slice(2) + '"',
      "",
      "",
      ""
    ], F = m.FullPaths[0], z = F, Z = m.FileIndex[0], V = 1; V < m.FullPaths.length; ++V)
      if (z = m.FullPaths[V].slice(F.length), Z = m.FileIndex[V], !(!Z.size || !Z.content || z == "Sh33tJ5")) {
        z = z.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(ke) {
          return "_x" + ke.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(ke) {
          return "_u" + ke.charCodeAt(0).toString(16) + "_";
        });
        for (var G = Z.content, j = Ce && Buffer.isBuffer(G) ? G.toString("binary") : H(G), ae = 0, ue = Math.min(1024, j.length), pe = 0, se = 0; se <= ue; ++se) (pe = j.charCodeAt(se)) >= 32 && pe < 128 && ++ae;
        var de = ae >= ue * 4 / 5;
        A.push(E), A.push("Content-Location: " + (_.root || "file:///C:/SheetJS/") + z), A.push("Content-Transfer-Encoding: " + (de ? "quoted-printable" : "base64")), A.push("Content-Type: " + Ql(Z, z)), A.push(""), A.push(de ? rh(j) : eh(j));
      }
    return A.push(E + `--\r
`), A.join(`\r
`);
  }
  function sh(m) {
    var S = {};
    return k(S, m), S;
  }
  function Zi(m, S, _, E) {
    var A = E && E.unsafe;
    A || k(m);
    var F = !A && ve.find(m, S);
    if (!F) {
      var z = m.FullPaths[0];
      S.slice(0, z.length) == z ? z = S : (z.slice(-1) != "/" && (z += "/"), z = (z + S).replace("//", "/")), F = { name: a(S), type: 2 }, m.FileIndex.push(F), m.FullPaths.push(z), A || ve.utils.cfb_gc(m);
    }
    return F.content = _, F.size = _ ? _.length : 0, E && (E.CLSID && (F.clsid = E.CLSID), E.mt && (F.mt = E.mt), E.ct && (F.ct = E.ct)), F;
  }
  function fh(m, S) {
    k(m);
    var _ = ve.find(m, S);
    if (_) {
      for (var E = 0; E < m.FileIndex.length; ++E) if (m.FileIndex[E] == _)
        return m.FileIndex.splice(E, 1), m.FullPaths.splice(E, 1), !0;
    }
    return !1;
  }
  function ch(m, S, _) {
    k(m);
    var E = ve.find(m, S);
    if (E) {
      for (var A = 0; A < m.FileIndex.length; ++A) if (m.FileIndex[A] == E)
        return m.FileIndex[A].name = a(_), m.FullPaths[A] = _, !0;
    }
    return !1;
  }
  function oh(m) {
    C(m, !0);
  }
  return t.find = M, t.read = I, t.parse = l, t.write = _e, t.writeFile = De, t.utils = {
    cfb_new: sh,
    cfb_add: Zi,
    cfb_del: fh,
    cfb_mov: ch,
    cfb_gc: oh,
    ReadShift: ka,
    CheckField: jc,
    prep_blob: Er,
    bconcat: vr,
    use_zlib: O,
    _deflateRaw: Oe,
    _inflateRaw: B0,
    consts: ne
  }, t;
}();
function Jh(e) {
  return typeof e == "string" ? Mi(e) : Array.isArray(e) ? yh(e) : e;
}
function Ka(e, t, r) {
  if (typeof Deno < "u") {
    if (r && typeof t == "string") switch (r) {
      case "utf8":
        t = new TextEncoder(r).encode(t);
        break;
      case "binary":
        t = Mi(t);
        break;
      default:
        throw new Error("Unsupported encoding " + r);
    }
    return Deno.writeFileSync(e, t);
  }
  var n = r == "utf8" ? bt(t) : t;
  if (typeof IE_SaveFile < "u") return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([Jh(n)], { type: "application/octet-stream" });
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
    return f.open("w"), f.encoding = "binary", Array.isArray(t) && (t = ln(t)), f.write(t), f.close(), t;
  } catch (c) {
    if (!c.message || !c.message.match(/onstruct/)) throw c;
  }
  throw new Error("cannot save file " + e);
}
function qh(e) {
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
function ar(e) {
  for (var t = Object.keys(e), r = [], n = 0; n < t.length; ++n) Object.prototype.hasOwnProperty.call(e, t[n]) && r.push(t[n]);
  return r;
}
function j0(e, t) {
  for (var r = [], n = ar(e), a = 0; a !== n.length; ++a) r[e[n[a]][t]] == null && (r[e[n[a]][t]] = n[a]);
  return r;
}
function Wi(e) {
  for (var t = [], r = ar(e), n = 0; n !== r.length; ++n) t[e[r[n]]] = r[n];
  return t;
}
function Hi(e) {
  for (var t = [], r = ar(e), n = 0; n !== r.length; ++n) t[e[r[n]]] = parseInt(r[n], 10);
  return t;
}
function Zh(e) {
  for (var t = [], r = ar(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] == null && (t[e[r[n]]] = []), t[e[r[n]]].push(r[n]);
  return t;
}
var Ai = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function pr(e, t) {
  var r = /* @__PURE__ */ e.getTime(), n = /* @__PURE__ */ Ai.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Ai.getTimezoneOffset()) * 6e4;
  return (r - n) / (24 * 60 * 60 * 1e3);
}
var kc = /* @__PURE__ */ new Date(), Qh = /* @__PURE__ */ Ai.getTime() + (/* @__PURE__ */ kc.getTimezoneOffset() - /* @__PURE__ */ Ai.getTimezoneOffset()) * 6e4, X0 = /* @__PURE__ */ kc.getTimezoneOffset();
function Vi(e) {
  var t = /* @__PURE__ */ new Date();
  return t.setTime(e * 24 * 60 * 60 * 1e3 + Qh), t.getTimezoneOffset() !== X0 && t.setTime(t.getTime() + (t.getTimezoneOffset() - X0) * 6e4), t;
}
function eu(e) {
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
var Y0 = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), Ac = /* @__PURE__ */ isNaN(/* @__PURE__ */ Y0.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : Y0, ru = /* @__PURE__ */ Ac.getFullYear() == 2017;
function Ke(e, t) {
  var r = new Date(e);
  if (ru)
    return t > 0 ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3) : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3), r;
  if (e instanceof Date) return e;
  if (Ac.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
    var n = r.getFullYear();
    return e.indexOf("" + n) > -1 || r.setFullYear(r.getFullYear() + 100), r;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function kn(e, t) {
  if (Ce && Buffer.isBuffer(e)) {
    if (t) {
      if (e[0] == 255 && e[1] == 254) return bt(e.slice(2).toString("utf16le"));
      if (e[1] == 254 && e[2] == 255) return bt(xc(e.slice(2).toString("binary")));
    }
    return e.toString("binary");
  }
  if (typeof TextDecoder < "u") try {
    if (t) {
      if (e[0] == 255 && e[1] == 254) return bt(new TextDecoder("utf-16le").decode(e.slice(2)));
      if (e[0] == 254 && e[1] == 255) return bt(new TextDecoder("utf-16be").decode(e.slice(2)));
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
function Je(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var t = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = Je(e[r]));
  return t;
}
function tr(e, t) {
  for (var r = ""; r.length < t; ) r += e;
  return r;
}
function Et(e) {
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
var tu = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function Qn(e) {
  var t = new Date(e), r = /* @__PURE__ */ new Date(NaN), n = t.getYear(), a = t.getMonth(), i = t.getDate();
  if (isNaN(i)) return r;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && tu.indexOf(s) == -1) return r;
  } else if (s.match(/[a-z]/)) return r;
  return n < 0 || n > 8099 ? r : (a > 0 || i > 1) && n != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? r : t;
}
var nu = /* @__PURE__ */ function() {
  var e = "abacaba".split(/(:?b)/i).length == 5;
  return function(r, n, a) {
    if (e || typeof n == "string") return r.split(n);
    for (var i = r.split(n), s = [i[0]], f = 1; f < i.length; ++f)
      s.push(a), s.push(i[f]);
    return s;
  };
}();
function Fc(e) {
  return e ? e.content && e.type ? kn(e.content, !0) : e.data ? Ea(e.data) : e.asNodeBuffer && Ce ? Ea(e.asNodeBuffer().toString("binary")) : e.asBinary ? Ea(e.asBinary()) : e._data && e._data.getContent ? Ea(kn(Array.prototype.slice.call(e._data.getContent(), 0))) : null : null;
}
function bc(e) {
  if (!e) return null;
  if (e.data) return L0(e.data);
  if (e.asNodeBuffer && Ce) return e.asNodeBuffer();
  if (e._data && e._data.getContent) {
    var t = e._data.getContent();
    return typeof t == "string" ? L0(t) : Array.prototype.slice.call(t);
  }
  return e.content && e.type ? e.content : null;
}
function au(e) {
  return e && e.name.slice(-4) === ".bin" ? bc(e) : Fc(e);
}
function ct(e, t) {
  for (var r = e.FullPaths || ar(e.files), n = t.toLowerCase().replace(/[\/]/g, "\\"), a = n.replace(/\\/g, "/"), i = 0; i < r.length; ++i) {
    var s = r[i].replace(/^Root Entry[\/]/, "").toLowerCase();
    if (n == s || a == s) return e.files ? e.files[r[i]] : e.FileIndex[i];
  }
  return null;
}
function Hs(e, t) {
  var r = ct(e, t);
  if (r == null) throw new Error("Cannot find file " + t + " in zip");
  return r;
}
function ur(e, t, r) {
  if (!r) return au(Hs(e, t));
  if (!t) return null;
  try {
    return ur(e, t);
  } catch {
    return null;
  }
}
function qr(e, t, r) {
  if (!r) return Fc(Hs(e, t));
  if (!t) return null;
  try {
    return qr(e, t);
  } catch {
    return null;
  }
}
function iu(e, t, r) {
  return bc(Hs(e, t));
}
function K0(e) {
  for (var t = e.FullPaths || ar(e.files), r = [], n = 0; n < t.length; ++n) t[n].slice(-1) != "/" && r.push(t[n].replace(/^Root Entry[\/]/, ""));
  return r.sort();
}
function Fe(e, t, r) {
  if (e.FullPaths) {
    if (typeof r == "string") {
      var n;
      return Ce ? n = Gt(r) : n = Th(r), ve.utils.cfb_add(e, t, n);
    }
    ve.utils.cfb_add(e, t, r);
  } else e.file(t, r);
}
function Vs() {
  return ve.utils.cfb_new();
}
function Cc(e, t) {
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
function Ta(e, t) {
  if (e.charAt(0) == "/") return e.slice(1);
  var r = t.split("/");
  t.slice(-1) != "/" && r.pop();
  for (var n = e.split("/"); n.length !== 0; ) {
    var a = n.shift();
    a === ".." ? r.pop() : a !== "." && r.push(a);
  }
  return r.join("/");
}
var lr = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, su = /([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g, J0 = /<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s*[\/\?]?>/mg, fu = /<[^>]*>/g, Dr = /* @__PURE__ */ lr.match(J0) ? J0 : fu, cu = /<\w*:/, ou = /<(\/?)\w+:/;
function Te(e, t, r) {
  for (var n = {}, a = 0, i = 0; a !== e.length && !((i = e.charCodeAt(a)) === 32 || i === 10 || i === 13); ++a) ;
  if (t || (n[0] = e.slice(0, a)), a === e.length) return n;
  var s = e.match(su), f = 0, c = "", o = 0, l = "", h = "", u = 1;
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
function Ct(e) {
  return e.replace(ou, "<$1");
}
var Oc = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, $s = /* @__PURE__ */ Wi(Oc), Pe = /* @__PURE__ */ function() {
  var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/ig, t = /_x([\da-fA-F]{4})_/ig;
  return function r(n) {
    var a = n + "", i = a.indexOf("<![CDATA[");
    if (i == -1) return a.replace(e, function(f, c) {
      return Oc[f] || String.fromCharCode(parseInt(c, f.indexOf("x") > -1 ? 16 : 10)) || f;
    }).replace(t, function(f, c) {
      return String.fromCharCode(parseInt(c, 16));
    });
    var s = a.indexOf("]]>");
    return r(a.slice(0, i)) + a.slice(i + 9, s) + r(a.slice(s + 3));
  };
}(), zs = /[&<>'"]/g, lu = /[\u0000-\u0008\u000b-\u001f]/g;
function ze(e) {
  var t = e + "";
  return t.replace(zs, function(r) {
    return $s[r];
  }).replace(lu, function(r) {
    return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function q0(e) {
  return ze(e).replace(/ /g, "_x0020_");
}
var Ic = /[\u0000-\u001f]/g;
function Gs(e) {
  var t = e + "";
  return t.replace(zs, function(r) {
    return $s[r];
  }).replace(/\n/g, "<br/>").replace(Ic, function(r) {
    return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function hu(e) {
  var t = e + "";
  return t.replace(zs, function(r) {
    return $s[r];
  }).replace(Ic, function(r) {
    return "&#x" + r.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
var Z0 = /* @__PURE__ */ function() {
  var e = /&#(\d+);/g;
  function t(r, n) {
    return String.fromCharCode(parseInt(n, 10));
  }
  return function(n) {
    return n.replace(e, t);
  };
}();
function uu(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function Ye(e) {
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
function rs(e) {
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
function Q0(e) {
  var t = nn(2 * e.length), r, n, a = 1, i = 0, s = 0, f;
  for (n = 0; n < e.length; n += a)
    a = 1, (f = e.charCodeAt(n)) < 128 ? r = f : f < 224 ? (r = (f & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : f < 240 ? (r = (f & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, r = (f & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), r -= 65536, s = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), s !== 0 && (t[i++] = s & 255, t[i++] = s >>> 8, s = 0), t[i++] = r % 256, t[i++] = r >>> 8;
  return t.slice(0, i).toString("ucs2");
}
function ef(e) {
  return Gt(e, "binary").toString("utf8");
}
var oi = "foo bar bazâð£", Ge = Ce && (/* @__PURE__ */ ef(oi) == /* @__PURE__ */ rs(oi) && ef || /* @__PURE__ */ Q0(oi) == /* @__PURE__ */ rs(oi) && Q0) || rs, bt = Ce ? function(e) {
  return Gt(e, "utf8").toString("binary");
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
}, Pa = /* @__PURE__ */ function() {
  var e = {};
  return function(r, n) {
    var a = r + "|" + (n || "");
    return e[a] ? e[a] : e[a] = new RegExp("<(?:\\w+:)?" + r + '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + r + ">", n || "");
  };
}(), Nc = /* @__PURE__ */ function() {
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
}(), xu = /* @__PURE__ */ function() {
  var e = {};
  return function(r) {
    return e[r] !== void 0 ? e[r] : e[r] = new RegExp("<(?:vt:)?" + r + ">([\\s\\S]*?)</(?:vt:)?" + r + ">", "g");
  };
}(), du = /<\/?(?:vt:)?variant>/g, gu = /<(?:vt:)([^>]*)>([\s\S]*)</;
function rf(e, t) {
  var r = Te(e), n = e.match(xu(r.baseType)) || [], a = [];
  if (n.length != r.size) {
    if (t.WTF) throw new Error("unexpected vector length " + n.length + " != " + r.size);
    return a;
  }
  return n.forEach(function(i) {
    var s = i.replace(du, "").match(gu);
    s && a.push({ v: Ge(s[2]), t: s[1] });
  }), a;
}
var Bc = /(^\s|\s$|\n)/;
function yr(e, t) {
  return "<" + e + (t.match(Bc) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}
function Ma(e) {
  return ar(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function oe(e, t, r) {
  return "<" + e + (r != null ? Ma(r) : "") + (t != null ? (t.match(Bc) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function Es(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (r) {
    if (t) throw r;
  }
  return "";
}
function pu(e, t) {
  switch (typeof e) {
    case "string":
      var r = oe("vt:lpwstr", ze(e));
      return r = r.replace(/&quot;/g, "_x0022_"), r;
    case "number":
      return oe((e | 0) == e ? "vt:i4" : "vt:r8", ze(String(e)));
    case "boolean":
      return oe("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return oe("vt:filetime", Es(e));
  throw new Error("Unable to serialize " + e);
}
function js(e) {
  if (Ce && /*::typeof Buffer !== "undefined" && d != null && d instanceof Buffer &&*/
  Buffer.isBuffer(e)) return e.toString("utf8");
  if (typeof e == "string") return e;
  if (typeof Uint8Array < "u" && e instanceof Uint8Array) return Ge(ln(Ms(e)));
  throw new Error("Bad input format: expected Buffer or string");
}
var Ua = /<(\/?)([^\s?><!\/:]*:|)([^\s?<>:\/]+)(?:[\s?:\/][^>]*)?>/mg, gr = {
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
}, In = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], Yr = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function mu(e, t) {
  for (var r = 1 - 2 * (e[t + 7] >>> 7), n = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), a = e[t + 6] & 15, i = 5; i >= 0; --i) a = a * 256 + e[t + i];
  return n == 2047 ? a == 0 ? r * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, a += Math.pow(2, 52)), r * Math.pow(2, n - 52) * a);
}
function vu(e, t, r) {
  var n = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7, a = 0, i = 0, s = n ? -t : t;
  isFinite(s) ? s == 0 ? a = i = 0 : (a = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(t) ? 26985 : 0);
  for (var f = 0; f <= 5; ++f, i /= 256) e[r + f] = i & 255;
  e[r + 6] = (a & 15) << 4 | i & 15, e[r + 7] = a >> 4 | n;
}
var tf = function(e) {
  for (var t = [], r = 10240, n = 0; n < e[0].length; ++n) if (e[0][n]) for (var a = 0, i = e[0][n].length; a < i; a += r) t.push.apply(t, e[0][n].slice(a, a + r));
  return t;
}, nf = Ce ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : Gt(t);
  })) : tf(e);
} : tf, af = function(e, t, r) {
  for (var n = [], a = t; a < r; a += 2) n.push(String.fromCharCode(Mt(e, a)));
  return n.join("").replace(Hr, "");
}, Xs = Ce ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", t, r).replace(Hr, "") : af(e, t, r);
} : af, sf = function(e, t, r) {
  for (var n = [], a = t; a < t + r; ++a) n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, Dc = Ce ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : sf(e, t, r);
} : sf, ff = function(e, t, r) {
  for (var n = [], a = t; a < r; a++) n.push(String.fromCharCode(zn(e, a)));
  return n.join("");
}, Ja = Ce ? function(t, r, n) {
  return Buffer.isBuffer(t) ? t.toString("utf8", r, n) : ff(t, r, n);
} : ff, Rc = function(e, t) {
  var r = Kr(e, t);
  return r > 0 ? Ja(e, t + 4, t + 4 + r - 1) : "";
}, Lc = Rc, Pc = function(e, t) {
  var r = Kr(e, t);
  return r > 0 ? Ja(e, t + 4, t + 4 + r - 1) : "";
}, Mc = Pc, Uc = function(e, t) {
  var r = 2 * Kr(e, t);
  return r > 0 ? Ja(e, t + 4, t + 4 + r - 1) : "";
}, Wc = Uc, Hc = function(t, r) {
  var n = Kr(t, r);
  return n > 0 ? Xs(t, r + 4, r + 4 + n) : "";
}, Vc = Hc, $c = function(e, t) {
  var r = Kr(e, t);
  return r > 0 ? Ja(e, t + 4, t + 4 + r) : "";
}, zc = $c, Gc = function(e, t) {
  return mu(e, t);
}, Fi = Gc, Ys = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
Ce && (Lc = function(t, r) {
  if (!Buffer.isBuffer(t)) return Rc(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, Mc = function(t, r) {
  if (!Buffer.isBuffer(t)) return Pc(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, Wc = function(t, r) {
  if (!Buffer.isBuffer(t)) return Uc(t, r);
  var n = 2 * t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n - 1);
}, Vc = function(t, r) {
  if (!Buffer.isBuffer(t)) return Hc(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n);
}, zc = function(t, r) {
  if (!Buffer.isBuffer(t)) return $c(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf8", r + 4, r + 4 + n);
}, Fi = function(t, r) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(r) : Gc(t, r);
}, Ys = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var zn = function(e, t) {
  return e[t];
}, Mt = function(e, t) {
  return e[t + 1] * 256 + e[t];
}, wu = function(e, t) {
  var r = e[t + 1] * 256 + e[t];
  return r < 32768 ? r : (65535 - r + 1) * -1;
}, Kr = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, pn = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, _u = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function ka(e, t) {
  var r = "", n, a, i = [], s, f, c, o;
  switch (t) {
    case "dbcs":
      if (o = this.l, Ce && Buffer.isBuffer(this)) r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (c = 0; c < e; ++c)
        r += String.fromCharCode(Mt(this, o)), o += 2;
      e *= 2;
      break;
    case "utf8":
      r = Ja(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, r = Xs(this, this.l, this.l + e);
      break;
    case "wstr":
      return ka.call(this, e, "dbcs");
    case "lpstr-ansi":
      r = Lc(this, this.l), e = 4 + Kr(this, this.l);
      break;
    case "lpstr-cp":
      r = Mc(this, this.l), e = 4 + Kr(this, this.l);
      break;
    case "lpwstr":
      r = Wc(this, this.l), e = 4 + 2 * Kr(this, this.l);
      break;
    case "lpp4":
      e = 4 + Kr(this, this.l), r = Vc(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + Kr(this, this.l), r = zc(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, r = ""; (s = zn(this, this.l + e++)) !== 0; ) i.push(ci(s));
      r = i.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (s = Mt(this, this.l + e)) !== 0; )
        i.push(ci(s)), e += 2;
      e += 2, r = i.join("");
      break;
    case "dbcs-cont":
      for (r = "", o = this.l, c = 0; c < e; ++c) {
        if (this.lens && this.lens.indexOf(o) !== -1)
          return s = zn(this, o), this.l = o + 1, f = ka.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(ci(Mt(this, o))), o += 2;
      }
      r = i.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (r = "", o = this.l, c = 0; c != e; ++c) {
        if (this.lens && this.lens.indexOf(o) !== -1)
          return s = zn(this, o), this.l = o + 1, f = ka.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(ci(zn(this, o))), o += 1;
      }
      r = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = zn(this, this.l), this.l++, n;
        case 2:
          return n = (t === "i" ? wu : Mt)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return t === "i" || !(this[this.l + 3] & 128) ? (n = (e > 0 ? pn : _u)(this, this.l), this.l += 4, n) : (a = Kr(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? a = Fi(this, this.l) : a = Fi([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        case 16:
          r = Dc(this, this.l, e);
          break;
      }
  }
  return this.l += e, r;
}
var Eu = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
}, yu = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >> 8 & 255, e[r + 2] = t >> 16 & 255, e[r + 3] = t >> 24 & 255;
}, Tu = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255;
};
function Su(e, t, r) {
  var n = 0, a = 0;
  if (r === "dbcs") {
    for (a = 0; a != t.length; ++a) Tu(this, t.charCodeAt(a), this.l + 2 * a);
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
      n = 4, Eu(this, t, this.l);
      break;
    case 8:
      if (n = 8, r === "f") {
        vu(this, t, this.l);
        break;
      }
    case 16:
      break;
    case -4:
      n = 4, yu(this, t, this.l);
      break;
  }
  return this.l += n, this;
}
function jc(e, t) {
  var r = Dc(this, this.l, e.length >> 1);
  if (r !== e) throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function Er(e, t) {
  e.l = t, e.read_shift = /*::(*/
  ka, e.chk = jc, e.write_shift = Su;
}
function Br(e, t) {
  e.l += t;
}
function q(e) {
  var t = nn(e);
  return Er(t, 0), t;
}
function jt(e, t, r) {
  if (e) {
    var n, a, i;
    Er(e, e.l || 0);
    for (var s = e.length, f = 0, c = 0; e.l < s; ) {
      f = e.read_shift(1), f & 128 && (f = (f & 127) + ((e.read_shift(1) & 127) << 7));
      var o = Ga[f] || Ga[65535];
      for (n = e.read_shift(1), i = n & 127, a = 1; a < 4 && n & 128; ++a) i += ((n = e.read_shift(1)) & 127) << 7 * a;
      c = e.l + i;
      var l = o.f && o.f(e, i, r);
      if (e.l = c, t(l, o, f)) return;
    }
  }
}
function zr() {
  var e = [], t = Ce ? 256 : 2048, r = function(o) {
    var l = q(o);
    return Er(l, 0), l;
  }, n = r(t), a = function() {
    n && (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, i = function(o) {
    return n && o < n.length - n.l ? n : (a(), n = r(Math.max(o + 1, t)));
  }, s = function() {
    return a(), vr(e);
  }, f = function(o) {
    a(), n = o, n.l == null && (n.l = n.length), i(t);
  };
  return { next: i, push: f, end: s, _bufs: e };
}
function re(e, t, r, n) {
  var a = +t, i;
  if (!isNaN(a)) {
    n || (n = Ga[a].p || (r || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, n >= 128 && ++i, n >= 16384 && ++i, n >= 2097152 && ++i;
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
    n > 0 && Ys(r) && e.push(r);
  }
}
function Aa(e, t, r) {
  var n = Je(e);
  if (t.s ? (n.cRel && (n.c += t.s.c), n.rRel && (n.r += t.s.r)) : (n.cRel && (n.c += t.c), n.rRel && (n.r += t.r)), !r || r.biff < 12) {
    for (; n.c >= 256; ) n.c -= 256;
    for (; n.r >= 65536; ) n.r -= 65536;
  }
  return n;
}
function cf(e, t, r) {
  var n = Je(e);
  return n.s = Aa(n.s, t.s, r), n.e = Aa(n.e, t.s, r), n;
}
function Fa(e, t) {
  if (e.cRel && e.c < 0)
    for (e = Je(e); e.c < 0; ) e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = Je(e); e.r < 0; ) e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = ye(e);
  return !e.cRel && e.cRel != null && (r = Fu(r)), !e.rRel && e.rRel != null && (r = ku(r)), r;
}
function ts(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + er(e.s.c) + ":" + (e.e.cRel ? "" : "$") + er(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + or(e.s.r) + ":" + (e.e.rRel ? "" : "$") + or(e.e.r) : Fa(e.s, t.biff) + ":" + Fa(e.e, t.biff);
}
function Ks(e) {
  return parseInt(Au(e), 10) - 1;
}
function or(e) {
  return "" + (e + 1);
}
function ku(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function Au(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function Js(e) {
  for (var t = bu(e), r = 0, n = 0; n !== t.length; ++n) r = 26 * r + t.charCodeAt(n) - 64;
  return r - 1;
}
function er(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) t = String.fromCharCode((e - 1) % 26 + 65) + t;
  return t;
}
function Fu(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function bu(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function Cu(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function rr(e) {
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
function Gr(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: rr(e), e: rr(e) } : { s: rr(e.slice(0, t)), e: rr(e.slice(t + 1)) };
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
function of(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null) try {
    return e.w = ut(e.z, r ? pr(t) : t);
  } catch {
  }
  try {
    return e.w = ut((e.XF || {}).numFmtId || (r ? 14 : 0), r ? pr(t) : t);
  } catch {
    return "" + t;
  }
}
function $t(e, t, r) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? Xt[e.v] || e.v : t == null ? of(e, e.v) : of(e, t));
}
function hn(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1", n = {};
  return n[r] = e, { SheetNames: [r], Sheets: n };
}
function Xc(e, t, r) {
  var n = r || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, f = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number") s = n.origin;
    else {
      var c = typeof n.origin == "string" ? rr(n.origin) : n.origin;
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
          else typeof x.v == "number" ? x.t = "n" : typeof x.v == "boolean" ? x.t = "b" : x.v instanceof Date ? (x.z = n.dateNF || Ee[14], n.cellDates ? (x.t = "d", x.w = ut(x.z, pr(x.v))) : (x.t = "n", x.v = pr(x.v), x.w = ut(x.z, x.v))) : x.t = "s";
          if (a)
            i[g] || (i[g] = []), i[g][d] && i[g][d].z && (x.z = i[g][d].z), i[g][d] = x;
          else {
            var p = ye({ c: d, r: g });
            i[p] && i[p].z && (x.z = i[p].z), i[p] = x;
          }
        }
    }
  return o.s.c < 1e7 && (i["!ref"] = Ae(o)), i;
}
function sa(e, t) {
  return Xc(null, e, t);
}
function Ou(e) {
  return e.read_shift(4, "i");
}
function yt(e, t) {
  return t || (t = q(4)), t.write_shift(4, e), t;
}
function Nr(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function wr(e, t) {
  var r = !1;
  return t == null && (r = !0, t = q(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
function Iu(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function Nu(e, t) {
  return t || (t = q(4)), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function qs(e, t) {
  var r = e.l, n = e.read_shift(1), a = Nr(e), i = [], s = { t: a, h: a };
  if (n & 1) {
    for (var f = e.read_shift(4), c = 0; c != f; ++c) i.push(Iu(e));
    s.r = i;
  } else s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = r + t, s;
}
function Bu(e, t) {
  var r = !1;
  return t == null && (r = !0, t = q(15 + 4 * e.t.length)), t.write_shift(1, 0), wr(e.t, t), r ? t.slice(0, t.l) : t;
}
var Du = qs;
function Ru(e, t) {
  var r = !1;
  return t == null && (r = !0, t = q(23 + 4 * e.t.length)), t.write_shift(1, 1), wr(e.t, t), t.write_shift(4, 1), Nu({}, t), r ? t.slice(0, t.l) : t;
}
function xt(e) {
  var t = e.read_shift(4), r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: r };
}
function Nn(e, t) {
  return t == null && (t = q(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
function Bn(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
function Dn(e, t) {
  return t == null && (t = q(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
var Lu = Nr, Yc = wr;
function Zs(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function bi(e, t) {
  var r = !1;
  return t == null && (r = !0, t = q(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
var Pu = Nr, ys = Zs, Qs = bi;
function e0(e) {
  var t = e.slice(e.l, e.l + 4), r = t[0] & 1, n = t[0] & 2;
  e.l += 4;
  var a = n === 0 ? Fi([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : pn(t, 0) >> 2;
  return r ? a / 100 : a;
}
function Kc(e, t) {
  t == null && (t = q(4));
  var r = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -536870912 && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -536870912 && a < 1 << 29 && (n = 1, r = 1), n) t.write_shift(-4, ((r ? a : e) << 2) + (r + 2));
  else throw new Error("unsupported RkNumber " + e);
}
function Jc(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
function Mu(e, t) {
  return t || (t = q(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}
var Rn = Jc, fa = Mu;
function Ir(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function An(e, t) {
  return (t || q(8)).write_shift(8, e, "f");
}
function Uu(e) {
  var t = {}, r = e.read_shift(1), n = r >>> 1, a = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), f = e.read_shift(1), c = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = a;
      var o = _n[a];
      o && (t.rgb = Ha(o));
      break;
    case 2:
      t.rgb = Ha([s, f, c]);
      break;
    case 3:
      t.theme = a;
      break;
  }
  return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}
function Ci(e, t) {
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
function Wu(e) {
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
function Hu(e, t) {
  t || (t = q(2));
  var r = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return t.write_shift(1, r), t.write_shift(1, 0), t;
}
function qc(e, t) {
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
function Vu(e) {
  return qc(e, 1);
}
function $u(e) {
  return qc(e, 2);
}
var r0 = 2, $r = 3, li = 11, lf = 12, Oi = 19, hi = 64, zu = 65, Gu = 71, ju = 4108, Xu = 4126, mr = 80, Zc = 81, Yu = [mr, Zc], Ts = {
  /*::[*/
  1: { n: "CodePage", t: r0 },
  /*::[*/
  2: { n: "Category", t: mr },
  /*::[*/
  3: { n: "PresentationFormat", t: mr },
  /*::[*/
  4: { n: "ByteCount", t: $r },
  /*::[*/
  5: { n: "LineCount", t: $r },
  /*::[*/
  6: { n: "ParagraphCount", t: $r },
  /*::[*/
  7: { n: "SlideCount", t: $r },
  /*::[*/
  8: { n: "NoteCount", t: $r },
  /*::[*/
  9: { n: "HiddenCount", t: $r },
  /*::[*/
  10: { n: "MultimediaClipCount", t: $r },
  /*::[*/
  11: { n: "ScaleCrop", t: li },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: ju
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: Xu
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: mr },
  /*::[*/
  15: { n: "Company", t: mr },
  /*::[*/
  16: { n: "LinksUpToDate", t: li },
  /*::[*/
  17: { n: "CharacterCount", t: $r },
  /*::[*/
  19: { n: "SharedDoc", t: li },
  /*::[*/
  22: { n: "HyperlinksChanged", t: li },
  /*::[*/
  23: { n: "AppVersion", t: $r, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: zu },
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
  2147483648: { n: "Locale", t: Oi },
  /*::[*/
  2147483651: { n: "Behavior", t: Oi },
  /*::[*/
  1919054434: {}
}, Ss = {
  /*::[*/
  1: { n: "CodePage", t: r0 },
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
  10: { n: "EditTime", t: hi },
  /*::[*/
  11: { n: "LastPrinted", t: hi },
  /*::[*/
  12: { n: "CreatedDate", t: hi },
  /*::[*/
  13: { n: "ModifiedDate", t: hi },
  /*::[*/
  14: { n: "PageCount", t: $r },
  /*::[*/
  15: { n: "WordCount", t: $r },
  /*::[*/
  16: { n: "CharCount", t: $r },
  /*::[*/
  17: { n: "Thumbnail", t: Gu },
  /*::[*/
  18: { n: "Application", t: mr },
  /*::[*/
  19: { n: "DocSecurity", t: $r },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: Oi },
  /*::[*/
  2147483651: { n: "Behavior", t: Oi },
  /*::[*/
  1919054434: {}
}, hf = {
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
}, Ku = [
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
function Ju(e) {
  return e.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}
var qu = /* @__PURE__ */ Ju([
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
]), _n = /* @__PURE__ */ Je(qu), Xt = {
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
}, Qc = {
  "#NULL!": 0,
  "#DIV/0!": 7,
  "#VALUE!": 15,
  "#REF!": 23,
  "#NAME?": 29,
  "#NUM!": 36,
  "#N/A": 42,
  "#GETTING_DATA": 43,
  "#WTF?": 255
}, ks = {
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
}, ui = {
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
function t0() {
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
function Zu(e) {
  var t = t0();
  if (!e || !e.match) return t;
  var r = {};
  if ((e.match(Dr) || []).forEach(function(n) {
    var a = Te(n);
    switch (a[0].replace(cu, "<")) {
      case "<?xml":
        break;
      case "<Types":
        t.xmlns = a["xmlns" + (a[0].match(/<(\w+):/) || ["", ""])[1]];
        break;
      case "<Default":
        r[a.Extension] = a.ContentType;
        break;
      case "<Override":
        t[ks[a.ContentType]] !== void 0 && t[ks[a.ContentType]].push(a.PartName);
        break;
    }
  }), t.xmlns !== gr.CT) throw new Error("Unknown Namespace: " + t.xmlns);
  return t.calcchain = t.calcchains.length > 0 ? t.calcchains[0] : "", t.sst = t.strs.length > 0 ? t.strs[0] : "", t.style = t.styles.length > 0 ? t.styles[0] : "", t.defaults = r, delete t.calcchains, t;
}
function eo(e, t) {
  var r = Zh(ks), n = [], a;
  n[n.length] = lr, n[n.length] = oe("Types", null, {
    xmlns: gr.CT,
    "xmlns:xsd": gr.xsd,
    "xmlns:xsi": gr.xsi
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
      ContentType: ui[c][t.bookType] || ui[c].xlsx
    }));
  }, s = function(c) {
    (e[c] || []).forEach(function(o) {
      n[n.length] = oe("Override", null, {
        PartName: (o[0] == "/" ? "" : "/") + o,
        ContentType: ui[c][t.bookType] || ui[c].xlsx
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
var Ne = {
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
function Wa(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function ba(e, t) {
  var r = { "!id": {} };
  if (!e) return r;
  t.charAt(0) !== "/" && (t = "/" + t);
  var n = {};
  return (e.match(Dr) || []).forEach(function(a) {
    var i = Te(a);
    if (i[0] === "<Relationship") {
      var s = {};
      s.Type = i.Type, s.Target = i.Target, s.Id = i.Id, i.TargetMode && (s.TargetMode = i.TargetMode);
      var f = i.TargetMode === "External" ? i.Target : Ta(i.Target, t);
      r[f] = s, n[i.Id] = s;
    }
  }), r["!id"] = n, r;
}
function Jn(e) {
  var t = [lr, oe("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: gr.RELS
  })];
  return ar(e["!id"]).forEach(function(r) {
    t[t.length] = oe("Relationship", null, e["!id"][r]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function $e(e, t, r, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0) for (t = e["!idx"]; e["!id"]["rId" + t]; ++t)
    ;
  if (e["!idx"] = t + 1, a.Id = "rId" + t, a.Type = n, a.Target = r, [Ne.HLINK, Ne.XPATH, Ne.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id]) throw new Error("Cannot rewrite rId " + t);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, t;
}
var Qu = "application/vnd.oasis.opendocument.spreadsheet";
function e1(e, t) {
  for (var r = js(e), n, a; n = Ua.exec(r); ) switch (n[3]) {
    case "manifest":
      break;
    case "file-entry":
      if (a = Te(n[0], !1), a.path == "/" && a.type !== Qu) throw new Error("This OpenDocument is not a spreadsheet");
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
function r1(e) {
  var t = [lr];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var r = 0; r < e.length; ++r) t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}
function uf(e, t, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (r || "odf") + "#" + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function t1(e, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function n1(e) {
  var t = [lr];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var r = 0; r != e.length; ++r)
    t.push(uf(e[r][0], e[r][1])), t.push(t1("", e[r][0]));
  return t.push(uf("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}
function ro() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + yi.version + "</meta:generator></office:meta></office:document-meta>";
}
var ht = [
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
], a1 = /* @__PURE__ */ function() {
  for (var e = new Array(ht.length), t = 0; t < ht.length; ++t) {
    var r = ht[t], n = "(?:" + r[0].slice(0, r[0].indexOf(":")) + ":)" + r[0].slice(r[0].indexOf(":") + 1);
    e[t] = new RegExp("<" + n + "[^>]*>([\\s\\S]*?)</" + n + ">");
  }
  return e;
}();
function to(e) {
  var t = {};
  e = Ge(e);
  for (var r = 0; r < ht.length; ++r) {
    var n = ht[r], a = e.match(a1[r]);
    a != null && a.length > 0 && (t[n[1]] = Pe(a[1])), n[2] === "date" && t[n[1]] && (t[n[1]] = Ke(t[n[1]]));
  }
  return t;
}
function ns(e, t, r, n, a) {
  a[e] != null || t == null || t === "" || (a[e] = t, t = ze(t), n[n.length] = r ? oe(e, t, r) : yr(e, t));
}
function no(e, t) {
  var r = t || {}, n = [lr, oe("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": gr.CORE_PROPS,
    "xmlns:dc": gr.dc,
    "xmlns:dcterms": gr.dcterms,
    "xmlns:dcmitype": gr.dcmitype,
    "xmlns:xsi": gr.xsi
  })], a = {};
  if (!e && !r.Props) return n.join("");
  e && (e.CreatedDate != null && ns("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : Es(e.CreatedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && ns("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : Es(e.ModifiedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != ht.length; ++i) {
    var s = ht[i], f = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
    f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && ns(s[0], f, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var En = [
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
], ao = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function io(e, t, r, n) {
  var a = [];
  if (typeof e == "string") a = rf(e, n);
  else for (var i = 0; i < e.length; ++i) a = a.concat(e[i].map(function(l) {
    return { v: l };
  }));
  var s = typeof t == "string" ? rf(t, n).map(function(l) {
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
function i1(e, t, r) {
  var n = {};
  return t || (t = {}), e = Ge(e), En.forEach(function(a) {
    var i = (e.match(Pa(a[0])) || [])[1];
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
  }), n.HeadingPairs && n.TitlesOfParts && io(n.HeadingPairs, n.TitlesOfParts, t, r), t;
}
function so(e) {
  var t = [], r = oe;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = lr, t[t.length] = oe("Properties", null, {
    xmlns: gr.EXT_PROPS,
    "xmlns:vt": gr.vt
  }), En.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = ze(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (t[t.length] = r(n[0], a));
    }
  }), t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + ze(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var s1 = /<[^>]+>[^<]*/g;
function f1(e, t) {
  var r = {}, n = "", a = e.match(s1);
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
              r[n] = Ye(l);
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
              r[n] = Ke(l);
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
function fo(e) {
  var t = [lr, oe("Properties", null, {
    xmlns: gr.CUST_PROPS,
    "xmlns:vt": gr.vt
  })];
  if (!e) return t.join("");
  var r = 1;
  return ar(e).forEach(function(a) {
    ++r, t[t.length] = oe("property", pu(e[a]), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: r,
      name: ze(a)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var As = {
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
}, as;
function c1(e, t, r) {
  as || (as = Wi(As)), t = as[t] || t, e[t] = r;
}
function o1(e, t) {
  var r = [];
  return ar(As).map(function(n) {
    for (var a = 0; a < ht.length; ++a) if (ht[a][1] == n) return ht[a];
    for (a = 0; a < En.length; ++a) if (En[a][1] == n) return En[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = t && t.Props && t.Props[n[1]] != null ? t.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), r.push(yr(As[n[1]] || n[1], a));
    }
  }), oe("DocumentProperties", r.join(""), { xmlns: Yr.o });
}
function l1(e, t) {
  var r = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && ar(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < ht.length; ++s) if (i == ht[s][1]) return;
      for (s = 0; s < En.length; ++s) if (i == En[s][1]) return;
      for (s = 0; s < r.length; ++s) if (i == r[s]) return;
      var f = e[i], c = "string";
      typeof f == "number" ? (c = "float", f = String(f)) : f === !0 || f === !1 ? (c = "boolean", f = f ? "1" : "0") : f = String(f), a.push(oe(q0(i), f, { "dt:dt": c }));
    }
  }), t && ar(t).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = t[i], f = "string";
      typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(oe(q0(i), s, { "dt:dt": f }));
    }
  }), "<" + n + ' xmlns="' + Yr.o + '">' + a.join("") + "</" + n + ">";
}
function n0(e) {
  var t = e.read_shift(4), r = e.read_shift(4);
  return new Date((r / 1e7 * Math.pow(2, 32) + t / 1e7 - 11644473600) * 1e3).toISOString().replace(/\.000/, "");
}
function h1(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e, r = t.getTime() / 1e3 + 11644473600, n = r % Math.pow(2, 32), a = (r - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = q(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function co(e, t, r) {
  var n = e.l, a = e.read_shift(0, "lpstr-cp");
  if (r) for (; e.l - n & 3; ) ++e.l;
  return a;
}
function oo(e, t, r) {
  var n = e.read_shift(0, "lpwstr");
  return n;
}
function lo(e, t, r) {
  return t === 31 ? oo(e) : co(e, t, r);
}
function Fs(e, t, r) {
  return lo(e, t, r === !1 ? 0 : 4);
}
function u1(e, t) {
  if (!t) throw new Error("VtUnalignedString must have positive length");
  return lo(e, t, 0);
}
function x1(e) {
  for (var t = e.read_shift(4), r = [], n = 0; n != t; ++n) {
    var a = e.l;
    r[n] = e.read_shift(0, "lpwstr").replace(Hr, ""), e.l - a & 2 && (e.l += 2);
  }
  return r;
}
function d1(e) {
  for (var t = e.read_shift(4), r = [], n = 0; n != t; ++n) r[n] = e.read_shift(0, "lpstr-cp").replace(Hr, "");
  return r;
}
function g1(e) {
  var t = e.l, r = Ii(e, Zc);
  e[e.l] == 0 && e[e.l + 1] == 0 && e.l - t & 2 && (e.l += 2);
  var n = Ii(e, $r);
  return [r, n];
}
function p1(e) {
  for (var t = e.read_shift(4), r = [], n = 0; n < t / 2; ++n) r.push(g1(e));
  return r;
}
function xf(e, t) {
  for (var r = e.read_shift(4), n = {}, a = 0; a != r; ++a) {
    var i = e.read_shift(4), s = e.read_shift(4);
    n[i] = e.read_shift(s, t === 1200 ? "utf16le" : "utf8").replace(Hr, "").replace(ya, "!"), t === 1200 && s % 2 && (e.l += 2);
  }
  return e.l & 3 && (e.l = e.l >> 3 << 2), n;
}
function ho(e) {
  var t = e.read_shift(4), r = e.slice(e.l, e.l + t);
  return e.l += t, (t & 3) > 0 && (e.l += 4 - (t & 3) & 3), r;
}
function m1(e) {
  var t = {};
  return t.Size = e.read_shift(4), e.l += t.Size + 3 - (t.Size - 1) % 4, t;
}
function Ii(e, t, r) {
  var n = e.read_shift(2), a, i = r || {};
  if (e.l += 2, t !== lf && n !== t && Yu.indexOf(t) === -1 && !((t & 65534) == 4126 && (n & 65534) == 4126))
    throw new Error("Expected type " + t + " saw " + n);
  switch (t === lf ? n : t) {
    case 2:
      return a = e.read_shift(2, "i"), i.raw || (e.l += 2), a;
    case 3:
      return a = e.read_shift(4, "i"), a;
    case 11:
      return e.read_shift(4) !== 0;
    case 19:
      return a = e.read_shift(4), a;
    case 30:
      return co(e, n, 4).replace(Hr, "");
    case 31:
      return oo(e);
    case 64:
      return n0(e);
    case 65:
      return ho(e);
    case 71:
      return m1(e);
    case 80:
      return Fs(e, n, !i.raw).replace(Hr, "");
    case 81:
      return u1(
        e,
        n
        /*, 4*/
      ).replace(Hr, "");
    case 4108:
      return p1(e);
    case 4126:
    case 4127:
      return n == 4127 ? x1(e) : d1(e);
    default:
      throw new Error("TypedPropertyValue unrecognized type " + t + " " + n);
  }
}
function df(e, t) {
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
      n = h1(t);
      break;
    case 31:
    case 80:
      for (n = q(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), n.write_shift(4, t.length + 1), n.write_shift(0, t, "dbcs"); n.l != n.length; ) n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return vr([r, n]);
}
function gf(e, t) {
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
      if (u[g.n] = Ii(e, g.t, { raw: !0 }), g.p === "version" && (u[g.n] = String(u[g.n] >> 16) + "." + ("0000" + String(u[g.n] & 65535)).slice(-4)), g.n == "CodePage") switch (u[g.n]) {
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
          vt(f = u[g.n] >>> 0 & 65535);
          break;
        default:
          throw new Error("Unsupported CodePage: " + u[g.n]);
      }
    } else if (i[s][0] === 1) {
      if (f = u.CodePage = Ii(e, r0), vt(f), c !== -1) {
        var d = e.l;
        e.l = i[c][1], o = xf(e, f), e.l = d;
      }
    } else if (i[s][0] === 0) {
      if (f === 0) {
        c = s, e.l = i[s + 1][1];
        continue;
      }
      o = xf(e, f);
    } else {
      var p = o[i[s][0]], w;
      switch (e[e.l]) {
        case 65:
          e.l += 4, w = ho(e);
          break;
        case 30:
          e.l += 4, w = Fs(e, e[e.l - 4]).replace(/\u0000+$/, "");
          break;
        case 31:
          e.l += 4, w = Fs(e, e[e.l - 4]).replace(/\u0000+$/, "");
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
          e.l += 4, w = fr(e, 4);
          break;
        case 64:
          e.l += 4, w = Ke(n0(e));
          break;
        default:
          throw new Error("unparsed value: " + e[e.l]);
      }
      u[p] = w;
    }
  }
  return e.l = r + n, u;
}
var uo = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function v1(e) {
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
function pf(e, t, r) {
  var n = q(8), a = [], i = [], s = 8, f = 0, c = q(8), o = q(8);
  if (c.write_shift(4, 2), c.write_shift(4, 1200), o.write_shift(4, 1), i.push(c), a.push(o), s += 8 + c.length, !t) {
    o = q(8), o.write_shift(4, 0), a.unshift(o);
    var l = [q(4)];
    for (l[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
      var h = e[f][0];
      for (c = q(8 + 2 * (h.length + 1) + (h.length % 2 ? 0 : 2)), c.write_shift(4, f + 2), c.write_shift(4, h.length + 1), c.write_shift(0, h, "dbcs"); c.l != c.length; ) c.write_shift(1, 0);
      l.push(c);
    }
    c = vr(l), i.unshift(c), s += 8 + c.length;
  }
  for (f = 0; f < e.length; ++f)
    if (!(t && !t[e[f][0]]) && !(uo.indexOf(e[f][0]) > -1 || ao.indexOf(e[f][0]) > -1) && e[f][1] != null) {
      var u = e[f][1], x = 0;
      if (t) {
        x = +t[e[f][0]];
        var g = r[x];
        if (g.p == "version" && typeof u == "string") {
          var d = u.split(".");
          u = (+d[0] << 16) + (+d[1] || 0);
        }
        c = df(g.t, u);
      } else {
        var p = v1(u);
        p == -1 && (p = 31, u = String(u)), c = df(p, u);
      }
      i.push(c), o = q(8), o.write_shift(4, t ? x : 2 + f), a.push(o), s += 8 + c.length;
    }
  var w = 8 * (i.length + 1);
  for (f = 0; f < i.length; ++f)
    a[f].write_shift(4, w), w += i[f].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), vr([n].concat(a).concat(i));
}
function mf(e, t, r) {
  var n = e.content;
  if (!n) return {};
  Er(n, 0);
  var a, i, s, f, c = 0;
  n.chk("feff", "Byte Order: "), n.read_shift(2);
  var o = n.read_shift(4), l = n.read_shift(16);
  if (l !== ve.utils.consts.HEADER_CLSID && l !== r) throw new Error("Bad PropertySet CLSID " + l);
  if (a = n.read_shift(4), a !== 1 && a !== 2) throw new Error("Unrecognized #Sets: " + a);
  if (i = n.read_shift(16), f = n.read_shift(4), a === 1 && f !== n.l) throw new Error("Length mismatch: " + f + " !== " + n.l);
  a === 2 && (s = n.read_shift(16), c = n.read_shift(4));
  var h = gf(n, t), u = { SystemIdentifier: o };
  for (var x in h) u[x] = h[x];
  if (u.FMTID = i, a === 1) return u;
  if (c - n.l == 2 && (n.l += 2), n.l !== c) throw new Error("Length mismatch 2: " + n.l + " !== " + c);
  var g;
  try {
    g = gf(n, null);
  } catch {
  }
  for (x in g) u[x] = g[x];
  return u.FMTID = [i, s], u;
}
function vf(e, t, r, n, a, i) {
  var s = q(a ? 68 : 48), f = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, ve.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, t, "hex"), s.write_shift(4, a ? 68 : 48);
  var c = pf(e, r, n);
  if (f.push(c), a) {
    var o = pf(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + c.length), f.push(o);
  }
  return vr(f);
}
function qt(e, t) {
  return e.read_shift(t), null;
}
function w1(e, t) {
  t || (t = q(e));
  for (var r = 0; r < e; ++r) t.write_shift(1, 0);
  return t;
}
function _1(e, t, r) {
  for (var n = [], a = e.l + t; e.l < a; ) n.push(r(e, a - e.l));
  if (a !== e.l) throw new Error("Slurp error");
  return n;
}
function fr(e, t) {
  return e.read_shift(t) === 1;
}
function Wr(e, t) {
  return t || (t = q(2)), t.write_shift(2, +!!e), t;
}
function xr(e) {
  return e.read_shift(2, "u");
}
function lt(e, t) {
  return t || (t = q(2)), t.write_shift(2, e), t;
}
function xo(e, t) {
  return _1(e, t, xr);
}
function E1(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return r === 1 ? t : t === 1;
}
function go(e, t, r) {
  return r || (r = q(2)), r.write_shift(1, t == "e" ? +e : +!!e), r.write_shift(1, t == "e" ? 1 : 0), r;
}
function qa(e, t, r) {
  var n = e.read_shift(r && r.biff >= 12 ? 2 : 1), a = "sbcs-cont";
  if (r && r.biff >= 8, !r || r.biff == 8) {
    var i = e.read_shift(1);
    i && (a = "dbcs-cont");
  } else r.biff == 12 && (a = "wstr");
  r.biff >= 2 && r.biff <= 5 && (a = "cpstr");
  var s = n ? e.read_shift(n, a) : "";
  return s;
}
function y1(e) {
  var t = e.read_shift(2), r = e.read_shift(1), n = r & 4, a = r & 8, i = 1 + (r & 1), s = 0, f, c = {};
  a && (s = e.read_shift(2)), n && (f = e.read_shift(4));
  var o = i == 2 ? "dbcs-cont" : "sbcs-cont", l = t === 0 ? "" : e.read_shift(t, o);
  return a && (e.l += 4 * s), n && (e.l += f), c.t = l, a || (c.raw = "<t>" + c.t + "</t>", c.r = c.t), c;
}
function T1(e) {
  var t = e.t || "", r = q(3);
  r.write_shift(2, t.length), r.write_shift(1, 1);
  var n = q(2 * t.length);
  n.write_shift(2 * t.length, t, "utf16le");
  var a = [r, n];
  return vr(a);
}
function Fn(e, t, r) {
  var n;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return e.read_shift(t, "cpstr");
    if (r.biff >= 12) return e.read_shift(t, "dbcs-cont");
  }
  var a = e.read_shift(1);
  return a === 0 ? n = e.read_shift(t, "sbcs-cont") : n = e.read_shift(t, "dbcs-cont"), n;
}
function Za(e, t, r) {
  var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : Fn(e, n, r);
}
function Ln(e, t, r) {
  if (r.biff > 5) return Za(e, t, r);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function po(e, t, r) {
  return r || (r = q(3 + 2 * e.length)), r.write_shift(2, e.length), r.write_shift(1, 1), r.write_shift(31, e, "utf16le"), r;
}
function S1(e) {
  var t = e.read_shift(1);
  e.l++;
  var r = e.read_shift(2);
  return e.l += 2, [t, r];
}
function k1(e) {
  var t = e.read_shift(4), r = e.l, n = !1;
  t > 24 && (e.l += t - 24, e.read_shift(16) === "795881f43b1d7f48af2c825dc4852763" && (n = !0), e.l = r);
  var a = e.read_shift((n ? t - 24 : t) >> 1, "utf16le").replace(Hr, "");
  return n && (e.l += 24), a;
}
function A1(e) {
  for (var t = e.read_shift(2), r = ""; t-- > 0; ) r += "../";
  var n = e.read_shift(0, "lpstr-ansi");
  if (e.l += 2, e.read_shift(2) != 57005) throw new Error("Bad FileMoniker");
  var a = e.read_shift(4);
  if (a === 0) return r + n.replace(/\\/g, "/");
  var i = e.read_shift(4);
  if (e.read_shift(2) != 3) throw new Error("Bad FileMoniker");
  var s = e.read_shift(i >> 1, "utf16le").replace(Hr, "");
  return r + s;
}
function F1(e, t) {
  var r = e.read_shift(16);
  switch (r) {
    case "e0c9ea79f9bace118c8200aa004ba90b":
      return k1(e);
    case "0303000000000000c000000000000046":
      return A1(e);
    default:
      throw new Error("Unsupported Moniker " + r);
  }
}
function xi(e) {
  var t = e.read_shift(4), r = t > 0 ? e.read_shift(t, "utf16le").replace(Hr, "") : "";
  return r;
}
function wf(e, t) {
  t || (t = q(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
  for (var r = 0; r < e.length; ++r) t.write_shift(2, e.charCodeAt(r));
  return t.write_shift(2, 0), t;
}
function b1(e, t) {
  var r = e.l + t, n = e.read_shift(4);
  if (n !== 2) throw new Error("Unrecognized streamVersion: " + n);
  var a = e.read_shift(2);
  e.l += 2;
  var i, s, f, c, o = "", l, h;
  a & 16 && (i = xi(e, r - e.l)), a & 128 && (s = xi(e, r - e.l)), (a & 257) === 257 && (f = xi(e, r - e.l)), (a & 257) === 1 && (c = F1(e, r - e.l)), a & 8 && (o = xi(e, r - e.l)), a & 32 && (l = e.read_shift(16)), a & 64 && (h = n0(
    e
    /*, 8*/
  )), e.l = r;
  var u = s || f || c || "";
  u && o && (u += "#" + o), u || (u = "#" + o), a & 2 && u.charAt(0) == "/" && u.charAt(1) != "/" && (u = "file://" + u);
  var x = { Target: u };
  return l && (x.guid = l), h && (x.time = h), i && (x.Tooltip = i), x;
}
function C1(e) {
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
    n = n.slice(1), wf(n, t);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    var f = a > -1 ? n.slice(0, a) : n;
    for (t.write_shift(4, 2 * (f.length + 1)), r = 0; r < f.length; ++r) t.write_shift(2, f.charCodeAt(r));
    t.write_shift(2, 0), i & 8 && wf(a > -1 ? n.slice(a + 1) : "", t);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    for (var c = 0; n.slice(c * 3, c * 3 + 3) == "../" || n.slice(c * 3, c * 3 + 3) == "..\\"; ) ++c;
    for (t.write_shift(2, c), t.write_shift(4, n.length - 3 * c + 1), r = 0; r < n.length - 3 * c; ++r) t.write_shift(1, n.charCodeAt(r + 3 * c) & 255);
    for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), r = 0; r < 6; ++r) t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}
function mo(e) {
  var t = e.read_shift(1), r = e.read_shift(1), n = e.read_shift(1), a = e.read_shift(1);
  return [t, r, n, a];
}
function vo(e, t) {
  var r = mo(e);
  return r[3] = 0, r;
}
function Ot(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2);
  return { r: t, c: r, ixfe: n };
}
function bn(e, t, r, n) {
  return n || (n = q(6)), n.write_shift(2, e), n.write_shift(2, t), n.write_shift(2, r || 0), n;
}
function O1(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return e.l += 8, { type: t, flags: r };
}
function I1(e, t, r) {
  return t === 0 ? "" : Ln(e, t, r);
}
function N1(e, t, r) {
  var n = r.biff > 8 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [a, i, s];
}
function wo(e) {
  var t = e.read_shift(2), r = e0(e);
  return [t, r];
}
function B1(e, t, r) {
  e.l += 4, t -= 4;
  var n = e.l + t, a = qa(e, t, r), i = e.read_shift(2);
  if (n -= e.l, i !== n) throw new Error("Malformed AddinUdf: padding = " + n + " != " + i);
  return e.l += i, a;
}
function $i(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2);
  return { s: { c: n, r: t }, e: { c: a, r } };
}
function _o(e, t) {
  return t || (t = q(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}
function Eo(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { c: n, r: t }, e: { c: a, r } };
}
var D1 = Eo;
function yo(e) {
  e.l += 4;
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2);
  return e.l += 12, [r, t, n];
}
function R1(e) {
  var t = {};
  return e.l += 4, e.l += 16, t.fSharedNote = e.read_shift(2), e.l += 4, t;
}
function L1(e) {
  var t = {};
  return e.l += 4, e.cf = e.read_shift(2), t;
}
function Sr(e) {
  e.l += 2, e.l += e.read_shift(2);
}
var P1 = {
  /*::[*/
  0: Sr,
  /* FtEnd */
  /*::[*/
  4: Sr,
  /* FtMacro */
  /*::[*/
  5: Sr,
  /* FtButton */
  /*::[*/
  6: Sr,
  /* FtGmo */
  /*::[*/
  7: L1,
  /* FtCf */
  /*::[*/
  8: Sr,
  /* FtPioGrbit */
  /*::[*/
  9: Sr,
  /* FtPictFmla */
  /*::[*/
  10: Sr,
  /* FtCbls */
  /*::[*/
  11: Sr,
  /* FtRbo */
  /*::[*/
  12: Sr,
  /* FtSbs */
  /*::[*/
  13: R1,
  /* FtNts */
  /*::[*/
  14: Sr,
  /* FtSbsFmla */
  /*::[*/
  15: Sr,
  /* FtGboData */
  /*::[*/
  16: Sr,
  /* FtEdoData */
  /*::[*/
  17: Sr,
  /* FtRboData */
  /*::[*/
  18: Sr,
  /* FtCblsData */
  /*::[*/
  19: Sr,
  /* FtLbsData */
  /*::[*/
  20: Sr,
  /* FtCblsFmla */
  /*::[*/
  21: yo
};
function M1(e, t) {
  for (var r = e.l + t, n = []; e.l < r; ) {
    var a = e.read_shift(2);
    e.l -= 2;
    try {
      n.push(P1[a](e, r - e.l));
    } catch {
      return e.l = r, n;
    }
  }
  return e.l != r && (e.l = r), n;
}
function di(e, t) {
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
function a0(e, t, r) {
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
function U1(e, t) {
  return t === 0 || e.read_shift(2), 1200;
}
function W1(e, t, r) {
  if (r.enc)
    return e.l += t, "";
  var n = e.l, a = Ln(e, 0, r);
  return e.read_shift(t + n - e.l), a;
}
function H1(e, t) {
  var r = !t || t.biff == 8, n = q(r ? 112 : 54);
  for (n.write_shift(t.biff == 8 ? 2 : 1, 7), r && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (r ? 0 : 536870912)); n.l < n.length; ) n.write_shift(1, r ? 0 : 32);
  return n;
}
function V1(e, t, r) {
  var n = r && r.biff == 8 || t == 2 ? e.read_shift(2) : (e.l += t, 0);
  return { fDialog: n & 16, fBelow: n & 64, fRight: n & 128 };
}
function $1(e, t, r) {
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
  var s = qa(e, 0, r);
  return s.length === 0 && (s = "Sheet1"), { pos: n, hs: a, dt: i, name: s };
}
function z1(e, t) {
  var r = !t || t.biff >= 8 ? 2 : 1, n = q(8 + r * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), t.biff >= 8 && n.write_shift(1, 1), n.write_shift(r * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
  var a = n.slice(0, n.l);
  return a.l = n.l, a;
}
function G1(e, t) {
  for (var r = e.l + t, n = e.read_shift(4), a = e.read_shift(4), i = [], s = 0; s != a && e.l < r; ++s)
    i.push(y1(e));
  return i.Count = n, i.Unique = a, i;
}
function j1(e, t) {
  var r = q(8);
  r.write_shift(4, e.Count), r.write_shift(4, e.Unique);
  for (var n = [], a = 0; a < e.length; ++a) n[a] = T1(e[a]);
  var i = vr([r].concat(n));
  return i.parts = [r.length].concat(n.map(function(s) {
    return s.length;
  })), i;
}
function X1(e, t) {
  var r = {};
  return r.dsst = e.read_shift(2), e.l += t - 2, r;
}
function Y1(e) {
  var t = {};
  t.r = e.read_shift(2), t.c = e.read_shift(2), t.cnt = e.read_shift(2) - t.c;
  var r = e.read_shift(2);
  e.l += 4;
  var n = e.read_shift(1);
  return e.l += 3, n & 7 && (t.level = n & 7), n & 32 && (t.hidden = !0), n & 64 && (t.hpt = r / 20), t;
}
function K1(e) {
  var t = O1(e);
  if (t.type != 2211) throw new Error("Invalid Future Record " + t.type);
  var r = e.read_shift(4);
  return r !== 0;
}
function J1(e) {
  return e.read_shift(2), e.read_shift(4);
}
function _f(e, t, r) {
  var n = 0;
  r && r.biff == 2 || (n = e.read_shift(2));
  var a = e.read_shift(2);
  r && r.biff == 2 && (n = 1 - (a >> 15), a &= 32767);
  var i = { Unsynced: n & 1, DyZero: (n & 2) >> 1, ExAsc: (n & 4) >> 2, ExDsc: (n & 8) >> 3 };
  return [i, a];
}
function q1(e) {
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
function Z1() {
  var e = q(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function Q1(e, t, r) {
  if (r && r.biff >= 2 && r.biff < 5) return {};
  var n = e.read_shift(2);
  return { RTL: n & 64 };
}
function ex(e) {
  var t = q(18), r = 1718;
  return e && e.RTL && (r |= 64), t.write_shift(2, r), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
function rx() {
}
function tx(e, t, r) {
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
  return n.name = qa(e, 0, r), n;
}
function nx(e, t) {
  var r = e.name || "Arial", n = t && t.biff == 5, a = n ? 15 + r.length : 16 + 2 * r.length, i = q(a);
  return i.write_shift(2, e.sz * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, r.length), n || i.write_shift(1, 1), i.write_shift((n ? 1 : 2) * r.length, r, n ? "sbcs" : "utf16le"), i;
}
function ax(e) {
  var t = Ot(e);
  return t.isst = e.read_shift(4), t;
}
function ix(e, t, r, n) {
  var a = q(10);
  return bn(e, t, n, a), a.write_shift(4, r), a;
}
function sx(e, t, r) {
  r.biffguess && r.biff == 2 && (r.biff = 5);
  var n = e.l + t, a = Ot(e);
  r.biff == 2 && e.l++;
  var i = Za(e, n - e.l, r);
  return a.val = i, a;
}
function fx(e, t, r, n, a) {
  var i = !a || a.biff == 8, s = q(8 + +i + (1 + i) * r.length);
  return bn(e, t, n, s), s.write_shift(2, r.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"), s;
}
function cx(e, t, r) {
  var n = e.read_shift(2), a = Ln(e, 0, r);
  return [n, a];
}
function ox(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = q(a ? 3 + t.length : 5 + 2 * t.length)), n.write_shift(2, e), n.write_shift(a ? 1 : 2, t.length), a || n.write_shift(1, 1), n.write_shift((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le");
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return i.l == null && (i.l = i.length), i;
}
var lx = Ln;
function Ef(e, t, r) {
  var n = e.l + t, a = r.biff == 8 || !r.biff ? 4 : 2, i = e.read_shift(a), s = e.read_shift(a), f = e.read_shift(2), c = e.read_shift(2);
  return e.l = n, { s: { r: i, c: f }, e: { r: s, c } };
}
function hx(e, t) {
  var r = t.biff == 8 || !t.biff ? 4 : 2, n = q(2 * r + 6);
  return n.write_shift(r, e.s.r), n.write_shift(r, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function ux(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = wo(e);
  return { r: t, c: r, ixfe: n[0], rknum: n[1] };
}
function xx(e, t) {
  for (var r = e.l + t - 2, n = e.read_shift(2), a = e.read_shift(2), i = []; e.l < r; ) i.push(wo(e));
  if (e.l !== r) throw new Error("MulRK read error");
  var s = e.read_shift(2);
  if (i.length != s - a + 1) throw new Error("MulRK length mismatch");
  return { r: n, c: a, C: s, rkrec: i };
}
function dx(e, t) {
  for (var r = e.l + t - 2, n = e.read_shift(2), a = e.read_shift(2), i = []; e.l < r; ) i.push(e.read_shift(2));
  if (e.l !== r) throw new Error("MulBlank read error");
  var s = e.read_shift(2);
  if (i.length != s - a + 1) throw new Error("MulBlank length mismatch");
  return { r: n, c: a, C: s, ixfe: i };
}
function gx(e, t, r, n) {
  var a = {}, i = e.read_shift(4), s = e.read_shift(4), f = e.read_shift(4), c = e.read_shift(2);
  return a.patternType = Ku[f >> 26], n.cellStyles && (a.alc = i & 7, a.fWrap = i >> 3 & 1, a.alcV = i >> 4 & 7, a.fJustLast = i >> 7 & 1, a.trot = i >> 8 & 255, a.cIndent = i >> 16 & 15, a.fShrinkToFit = i >> 20 & 1, a.iReadOrder = i >> 22 & 2, a.fAtrNum = i >> 26 & 1, a.fAtrFnt = i >> 27 & 1, a.fAtrAlc = i >> 28 & 1, a.fAtrBdr = i >> 29 & 1, a.fAtrPat = i >> 30 & 1, a.fAtrProt = i >> 31 & 1, a.dgLeft = s & 15, a.dgRight = s >> 4 & 15, a.dgTop = s >> 8 & 15, a.dgBottom = s >> 12 & 15, a.icvLeft = s >> 16 & 127, a.icvRight = s >> 23 & 127, a.grbitDiag = s >> 30 & 3, a.icvTop = f & 127, a.icvBottom = f >> 7 & 127, a.icvDiag = f >> 14 & 127, a.dgDiag = f >> 21 & 15, a.icvFore = c & 127, a.icvBack = c >> 7 & 127, a.fsxButton = c >> 14 & 1), a;
}
function px(e, t, r) {
  var n = {};
  return n.ifnt = e.read_shift(2), n.numFmtId = e.read_shift(2), n.flags = e.read_shift(2), n.fStyle = n.flags >> 2 & 1, t -= 6, n.data = gx(e, t, n.fStyle, r), n;
}
function yf(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = q(a ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, t << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), n.write_shift(4, i), n.write_shift(4, 0), a || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function mx(e) {
  e.l += 4;
  var t = [e.read_shift(2), e.read_shift(2)];
  if (t[0] !== 0 && t[0]--, t[1] !== 0 && t[1]--, t[0] > 7 || t[1] > 7) throw new Error("Bad Gutters: " + t.join("|"));
  return t;
}
function vx(e) {
  var t = q(8);
  return t.write_shift(4, 0), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function Tf(e, t, r) {
  var n = Ot(e);
  (r.biff == 2 || t == 9) && ++e.l;
  var a = E1(e);
  return n.val = a, n.t = a === !0 || a === !1 ? "b" : "e", n;
}
function wx(e, t, r, n, a, i) {
  var s = q(8);
  return bn(e, t, n, s), go(r, i, s), s;
}
function _x(e, t, r) {
  r.biffguess && r.biff == 2 && (r.biff = 5);
  var n = Ot(e), a = Ir(e);
  return n.val = a, n;
}
function Ex(e, t, r, n) {
  var a = q(14);
  return bn(e, t, n, a), An(r, a), a;
}
var Sf = I1;
function yx(e, t, r) {
  var n = e.l + t, a = e.read_shift(2), i = e.read_shift(2);
  if (r.sbcch = i, i == 1025 || i == 14849) return [i, a];
  if (i < 1 || i > 255) throw new Error("Unexpected SupBook type: " + i);
  for (var s = Fn(e, i), f = []; n > e.l; ) f.push(Za(e));
  return [i, a, s, f];
}
function kf(e, t, r) {
  var n = e.read_shift(2), a, i = {
    fBuiltIn: n & 1,
    fWantAdvise: n >>> 1 & 1,
    fWantPict: n >>> 2 & 1,
    fOle: n >>> 3 & 1,
    fOleLink: n >>> 4 & 1,
    cf: n >>> 5 & 1023,
    fIcon: n >>> 15 & 1
  };
  return r.sbcch === 14849 && (a = B1(e, t - 2, r)), i.body = a || e.read_shift(t - 2), typeof a == "string" && (i.Name = a), i;
}
var Tx = [
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
function Af(e, t, r) {
  var n = e.l + t, a = e.read_shift(2), i = e.read_shift(1), s = e.read_shift(1), f = e.read_shift(r && r.biff == 2 ? 1 : 2), c = 0;
  (!r || r.biff >= 5) && (r.biff != 5 && (e.l += 2), c = e.read_shift(2), r.biff == 5 && (e.l += 2), e.l += 4);
  var o = Fn(e, s, r);
  a & 32 && (o = Tx[o.charCodeAt(0)]);
  var l = n - e.l;
  r && r.biff == 2 && --l;
  var h = n == e.l || f === 0 || !(l > 0) ? [] : Mm(e, l, r, f);
  return {
    chKey: i,
    Name: o,
    itab: c,
    rgce: h
  };
}
function To(e, t, r) {
  if (r.biff < 8) return Sx(e, t, r);
  for (var n = [], a = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2); i-- !== 0; ) n.push(N1(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != a) throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function Sx(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = qa(e, t, r);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function kx(e, t, r) {
  if (r.biff < 8) {
    e.l += t;
    return;
  }
  var n = e.read_shift(2), a = e.read_shift(2), i = Fn(e, n, r), s = Fn(e, a, r);
  return [i, s];
}
function Ax(e, t, r) {
  var n = Eo(e);
  e.l++;
  var a = e.read_shift(1);
  return t -= 8, [Um(e, t, r), a, n];
}
function Ff(e, t, r) {
  var n = D1(e);
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
  return [n, Lm(e, t, r)];
}
function Fx(e) {
  var t = e.read_shift(4) !== 0, r = e.read_shift(4) !== 0, n = e.read_shift(4);
  return [t, r, n];
}
function bx(e, t, r) {
  if (!(r.biff < 8)) {
    var n = e.read_shift(2), a = e.read_shift(2), i = e.read_shift(2), s = e.read_shift(2), f = Ln(e, 0, r);
    return r.biff < 8 && e.read_shift(1), [{ r: n, c: a }, f, s, i];
  }
}
function Cx(e, t, r) {
  return bx(e, t, r);
}
function Ox(e, t) {
  for (var r = [], n = e.read_shift(2); n--; ) r.push($i(e));
  return r;
}
function Ix(e) {
  var t = q(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var r = 0; r < e.length; ++r) _o(e[r], t);
  return t;
}
function Nx(e, t, r) {
  if (r && r.biff < 8) return Dx(e, t, r);
  var n = yo(e), a = M1(e, t - 22, n[1]);
  return { cmo: n, ft: a };
}
var Bx = {
  8: function(e, t) {
    var r = e.l + t;
    e.l += 10;
    var n = e.read_shift(2);
    e.l += 4, e.l += 2, e.l += 2, e.l += 2, e.l += 4;
    var a = e.read_shift(1);
    return e.l += a, e.l = r, { fmt: n };
  }
};
function Dx(e, t, r) {
  e.l += 4;
  var n = e.read_shift(2), a = e.read_shift(2), i = e.read_shift(2);
  e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 6, t -= 36;
  var s = [];
  return s.push((Bx[n] || Br)(e, t, r)), { cmo: [a, n, i], ft: s };
}
function Rx(e, t, r) {
  var n = e.l, a = "";
  try {
    e.l += 4;
    var i = (r.lastobj || { cmo: [0, 0] }).cmo[1], s;
    [0, 5, 7, 11, 12, 14].indexOf(i) == -1 ? e.l += 6 : s = S1(e, 6, r);
    var f = e.read_shift(2);
    e.read_shift(2), xr(e, 2);
    var c = e.read_shift(2);
    e.l += c;
    for (var o = 1; o < e.lens.length - 1; ++o) {
      if (e.l - n != e.lens[o]) throw new Error("TxO: bad continue record");
      var l = e[e.l], h = Fn(e, e.lens[o + 1] - e.lens[o] - 1);
      if (a += h, a.length >= (l ? f : 2 * f)) break;
    }
    if (a.length !== f && a.length !== f * 2)
      throw new Error("cchText: " + f + " != " + a.length);
    return e.l = n + t, { t: a };
  } catch {
    return e.l = n + t, { t: a };
  }
}
function Lx(e, t) {
  var r = $i(e);
  e.l += 16;
  var n = b1(e, t - 24);
  return [r, n];
}
function Px(e) {
  var t = q(24), r = rr(e[0]);
  t.write_shift(2, r.r), t.write_shift(2, r.r), t.write_shift(2, r.c), t.write_shift(2, r.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a) t.write_shift(1, parseInt(n[a], 16));
  return vr([t, C1(e[1])]);
}
function Mx(e, t) {
  e.read_shift(2);
  var r = $i(e), n = e.read_shift((t - 10) / 2, "dbcs-cont");
  return n = n.replace(Hr, ""), [r, n];
}
function Ux(e) {
  var t = e[1].Tooltip, r = q(10 + 2 * (t.length + 1));
  r.write_shift(2, 2048);
  var n = rr(e[0]);
  r.write_shift(2, n.r), r.write_shift(2, n.r), r.write_shift(2, n.c), r.write_shift(2, n.c);
  for (var a = 0; a < t.length; ++a) r.write_shift(2, t.charCodeAt(a));
  return r.write_shift(2, 0), r;
}
function Wx(e) {
  var t = [0, 0], r;
  return r = e.read_shift(2), t[0] = hf[r] || r, r = e.read_shift(2), t[1] = hf[r] || r, t;
}
function Hx(e) {
  return e || (e = q(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function Vx(e) {
  for (var t = e.read_shift(2), r = []; t-- > 0; ) r.push(vo(e));
  return r;
}
function $x(e) {
  for (var t = e.read_shift(2), r = []; t-- > 0; ) r.push(vo(e));
  return r;
}
function zx(e) {
  e.l += 2;
  var t = { cxfs: 0, crc: 0 };
  return t.cxfs = e.read_shift(2), t.crc = e.read_shift(4), t;
}
function So(e, t, r) {
  if (!r.cellStyles) return Br(e, t);
  var n = r && r.biff >= 12 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n), s = e.read_shift(n), f = e.read_shift(n), c = e.read_shift(2);
  n == 2 && (e.l += 2);
  var o = { s: a, e: i, w: s, ixfe: f, flags: c };
  return (r.biff >= 5 || !r.biff) && (o.level = c >> 8 & 7), o;
}
function Gx(e, t) {
  var r = q(12);
  r.write_shift(2, t), r.write_shift(2, t), r.write_shift(2, e.width * 256), r.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), r.write_shift(1, n), n = e.level || 0, r.write_shift(1, n), r.write_shift(2, 0), r;
}
function jx(e, t) {
  var r = {};
  return t < 32 || (e.l += 16, r.header = Ir(e), r.footer = Ir(e), e.l += 2), r;
}
function Xx(e, t, r) {
  var n = { area: !1 };
  if (r.biff != 5)
    return e.l += t, n;
  var a = e.read_shift(1);
  return e.l += 3, a & 16 && (n.area = !0), n;
}
function Yx(e) {
  for (var t = q(2 * e), r = 0; r < e; ++r) t.write_shift(2, r + 1);
  return t;
}
var Kx = Ot, Jx = xo, qx = Za;
function Zx(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(4), a = { fmt: t, env: r, len: n, data: e.slice(e.l, e.l + n) };
  return e.l += n, a;
}
function Qx(e, t, r) {
  r.biffguess && r.biff == 5 && (r.biff = 2);
  var n = Ot(e);
  ++e.l;
  var a = Ln(e, t - 7, r);
  return n.t = "str", n.val = a, n;
}
function ed(e) {
  var t = Ot(e);
  ++e.l;
  var r = Ir(e);
  return t.t = "n", t.val = r, t;
}
function rd(e, t, r) {
  var n = q(15);
  return ti(n, e, t), n.write_shift(8, r, "f"), n;
}
function td(e) {
  var t = Ot(e);
  ++e.l;
  var r = e.read_shift(2);
  return t.t = "n", t.val = r, t;
}
function nd(e, t, r) {
  var n = q(9);
  return ti(n, e, t), n.write_shift(2, r), n;
}
function ad(e) {
  var t = e.read_shift(1);
  return t === 0 ? (e.l++, "") : e.read_shift(t, "sbcs-cont");
}
function id(e, t) {
  e.l += 6, e.l += 2, e.l += 1, e.l += 3, e.l += 1, e.l += t - 13;
}
function sd(e, t, r) {
  var n = e.l + t, a = Ot(e), i = e.read_shift(2), s = Fn(e, i, r);
  return e.l = n, a.t = "str", a.val = s, a;
}
var fd = [2, 3, 48, 49, 131, 139, 140, 245], bs = /* @__PURE__ */ function() {
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
  }, t = Wi({
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
    var o = [], l = nn(1);
    switch (c.type) {
      case "base64":
        l = Jr(Zr(f));
        break;
      case "binary":
        l = Jr(f);
        break;
      case "buffer":
      case "array":
        l = f;
        break;
    }
    Er(l, 0);
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
    var d = 0, p = 521;
    h == 2 && (d = l.read_shift(2)), l.l += 3, h != 2 && (d = l.read_shift(4)), d > 1048576 && (d = 1e6), h != 2 && (p = l.read_shift(2));
    var w = l.read_shift(2), y = c.codepage || 1252;
    h != 2 && (l.l += 16, l.read_shift(1), l[l.l] !== 0 && (y = e[l[l.l]]), l.l += 1, l.l += 2), g && (l.l += 36);
    for (var v = [], N = {}, T = Math.min(l.length, h == 2 ? 521 : p - 10 - (x ? 264 : 0)), I = g ? 32 : 11; l.l < T && l[l.l] != 13; )
      switch (N = {}, N.name = Da.utils.decode(y, l.slice(l.l, l.l + I)).replace(/[\u0000\r\n].*$/g, ""), l.l += I, N.type = String.fromCharCode(l.read_shift(1)), h != 2 && !g && (N.offset = l.read_shift(4)), N.len = l.read_shift(1), h == 2 && (N.offset = l.read_shift(2)), N.dec = l.read_shift(1), N.name.length && v.push(N), h != 2 && (l.l += g ? 13 : 14), N.type) {
        case "B":
          (!x || N.len != 8) && c.WTF && console.log("Skipping " + N.name + ":" + N.type);
          break;
        case "G":
        case "P":
          c.WTF && console.log("Skipping " + N.name + ":" + N.type);
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
          throw new Error("Unknown Field Type: " + N.type);
      }
    if (l[l.l] !== 13 && (l.l = p - 1), l.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + l.l + " " + l[l.l]);
    l.l = p;
    var k = 0, U = 0;
    for (o[0] = [], U = 0; U != v.length; ++U) o[0][U] = v[U].name;
    for (; d-- > 0; ) {
      if (l[l.l] === 42) {
        l.l += w;
        continue;
      }
      for (++l.l, o[++k] = [], U = 0, U = 0; U != v.length; ++U) {
        var C = l.slice(l.l, l.l + v[U].len);
        l.l += v[U].len, Er(C, 0);
        var D = Da.utils.decode(y, C);
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
    var l = sa(r(f, o), o);
    return l["!cols"] = o.DBF.map(function(h) {
      return {
        wch: h.len,
        DBF: h
      };
    }), delete o.DBF, l;
  }
  function a(f, c) {
    try {
      return hn(n(f, c), c);
    } catch (o) {
      if (c && c.WTF) throw o;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(f, c) {
    var o = c || {};
    if (+o.codepage >= 0 && vt(+o.codepage), o.type == "string") throw new Error("Cannot write DBF to JS string");
    var l = zr(), h = Di(f, { header: 1, raw: !0, cellDates: !0 }), u = h[0], x = h.slice(1), g = f["!cols"] || [], d = 0, p = 0, w = 0, y = 1;
    for (d = 0; d < u.length; ++d) {
      if (((g[d] || {}).DBF || {}).name) {
        u[d] = g[d].DBF.name, ++w;
        continue;
      }
      if (u[d] != null) {
        if (++w, typeof u[d] == "number" && (u[d] = u[d].toString(10)), typeof u[d] != "string") throw new Error("DBF Invalid column name " + u[d] + " |" + typeof u[d] + "|");
        if (u.indexOf(u[d]) !== d) {
          for (p = 0; p < 1024; ++p)
            if (u.indexOf(u[d] + "_" + p) == -1) {
              u[d] += "_" + p;
              break;
            }
        }
      }
    }
    var v = Me(f["!ref"]), N = [], T = [], I = [];
    for (d = 0; d <= v.e.c - v.s.c; ++d) {
      var k = "", U = "", C = 0, D = [];
      for (p = 0; p < x.length; ++p)
        x[p][d] != null && D.push(x[p][d]);
      if (D.length == 0 || u[d] == null) {
        N[d] = "?";
        continue;
      }
      for (p = 0; p < D.length; ++p) {
        switch (typeof D[p]) {
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
            U = D[p] instanceof Date ? "D" : "C";
            break;
          default:
            U = "C";
        }
        C = Math.max(C, String(D[p]).length), k = k && k != U ? "C" : U;
      }
      C > 250 && (C = 250), U = ((g[d] || {}).DBF || {}).type, U == "C" && g[d].DBF.len > C && (C = g[d].DBF.len), k == "B" && U == "N" && (k = "N", I[d] = g[d].DBF.dec, C = g[d].DBF.len), T[d] = k == "C" || U == "N" ? C : i[k] || 0, y += T[d], N[d] = k;
    }
    var M = l.next(32);
    for (M.write_shift(4, 318902576), M.write_shift(4, x.length), M.write_shift(2, 296 + 32 * w), M.write_shift(2, y), d = 0; d < 4; ++d) M.write_shift(4, 0);
    for (M.write_shift(4, 0 | (+t[
      /*::String(*/
      uc
      /*::)*/
    ] || 3) << 8), d = 0, p = 0; d < u.length; ++d)
      if (u[d] != null) {
        var B = l.next(32), Y = (u[d].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        B.write_shift(1, Y, "sbcs"), B.write_shift(1, N[d] == "?" ? "C" : N[d], "sbcs"), B.write_shift(4, p), B.write_shift(1, T[d] || i[N[d]] || 0), B.write_shift(1, I[d] || 0), B.write_shift(1, 2), B.write_shift(4, 0), B.write_shift(1, 0), B.write_shift(4, 0), B.write_shift(4, 0), p += T[d] || i[N[d]] || 0;
      }
    var he = l.next(264);
    for (he.write_shift(4, 13), d = 0; d < 65; ++d) he.write_shift(4, 0);
    for (d = 0; d < x.length; ++d) {
      var W = l.next(y);
      for (W.write_shift(1, 0), p = 0; p < u.length; ++p)
        if (u[p] != null)
          switch (N[p]) {
            case "L":
              W.write_shift(1, x[d][p] == null ? 63 : x[d][p] ? 84 : 70);
              break;
            case "B":
              W.write_shift(8, x[d][p] || 0, "f");
              break;
            case "N":
              var ee = "0";
              for (typeof x[d][p] == "number" && (ee = x[d][p].toFixed(I[p] || 0)), w = 0; w < T[p] - ee.length; ++w) W.write_shift(1, 32);
              W.write_shift(1, ee, "sbcs");
              break;
            case "D":
              x[d][p] ? (W.write_shift(4, ("0000" + x[d][p].getFullYear()).slice(-4), "sbcs"), W.write_shift(2, ("00" + (x[d][p].getMonth() + 1)).slice(-2), "sbcs"), W.write_shift(2, ("00" + x[d][p].getDate()).slice(-2), "sbcs")) : W.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var ne = String(x[d][p] != null ? x[d][p] : "").slice(0, T[p]);
              for (W.write_shift(1, ne, "sbcs"), w = 0; w < T[p] - ne.length; ++w) W.write_shift(1, 32);
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
}(), ko = /* @__PURE__ */ function() {
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
  }, t = new RegExp("\x1BN(" + ar(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), r = function(u, x) {
    var g = e[x];
    return typeof g == "number" ? P0(g) : g;
  }, n = function(u, x, g) {
    var d = x.charCodeAt(0) - 32 << 4 | g.charCodeAt(0) - 48;
    return d == 59 ? u : P0(d);
  };
  e["|"] = 254;
  function a(u, x) {
    switch (x.type) {
      case "base64":
        return i(Zr(u), x);
      case "binary":
        return i(u, x);
      case "buffer":
        return i(Ce && Buffer.isBuffer(u) ? u.toString("binary") : ln(u), x);
      case "array":
        return i(kn(u), x);
    }
    throw new Error("Unrecognized type " + x.type);
  }
  function i(u, x) {
    var g = u.split(/[\n\r]+/), d = -1, p = -1, w = 0, y = 0, v = [], N = [], T = null, I = {}, k = [], U = [], C = [], D = 0, M;
    for (+x.codepage >= 0 && vt(+x.codepage); w !== g.length; ++w) {
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
          Y[1].charAt(0) == "P" && N.push(B.slice(3).replace(/;;/g, ";"));
          break;
        case "C":
          var ee = !1, ne = !1, De = !1, H = !1, _e = -1, Se = -1;
          for (y = 1; y < Y.length; ++y) switch (Y[y].charAt(0)) {
            case "A":
              break;
            case "X":
              p = parseInt(Y[y].slice(1)) - 1, ne = !0;
              break;
            case "Y":
              for (d = parseInt(Y[y].slice(1)) - 1, ne || (p = 0), M = v.length; M <= d; ++M) v[M] = [];
              break;
            case "K":
              W = Y[y].slice(1), W.charAt(0) === '"' ? W = W.slice(1, W.length - 1) : W === "TRUE" ? W = !0 : W === "FALSE" ? W = !1 : isNaN(Et(W)) ? isNaN(Qn(W).getDate()) || (W = Ke(W)) : (W = Et(W), T !== null && aa(T) && (W = Vi(W))), ee = !0;
              break;
            case "E":
              H = !0;
              var O = qn(Y[y].slice(1), { r: d, c: p });
              v[d][p] = [v[d][p], O];
              break;
            case "S":
              De = !0, v[d][p] = [v[d][p], "S5S"];
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
          if (ee && (v[d][p] && v[d][p].length == 2 ? v[d][p][0] = W : v[d][p] = W, T = null), De) {
            if (H) throw new Error("SYLK shared formula cannot have own formula");
            var P = _e > -1 && v[_e][Se];
            if (!P || !P[1]) throw new Error("SYLK shared formula cannot find base");
            v[d][p][1] = $o(P[1], { r: d - _e, c: p - Se });
          }
          break;
        case "F":
          var R = 0;
          for (y = 1; y < Y.length; ++y) switch (Y[y].charAt(0)) {
            case "X":
              p = parseInt(Y[y].slice(1)) - 1, ++R;
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
              T = N[parseInt(Y[y].slice(1))];
              break;
            case "S":
              break;
            case "D":
              break;
            case "N":
              break;
            case "W":
              for (C = Y[y].slice(1).split(" "), M = parseInt(C[0], 10); M <= parseInt(C[1], 10); ++M)
                D = parseInt(C[2], 10), U[M - 1] = D === 0 ? { hidden: !0 } : { wch: D }, an(U[M - 1]);
              break;
            case "C":
              p = parseInt(Y[y].slice(1)) - 1, U[p] || (U[p] = {});
              break;
            case "R":
              d = parseInt(Y[y].slice(1)) - 1, k[d] || (k[d] = {}), D > 0 ? (k[d].hpt = D, k[d].hpx = ra(D)) : D === 0 && (k[d].hidden = !0);
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
    return k.length > 0 && (I["!rows"] = k), U.length > 0 && (I["!cols"] = U), x && x.sheetRows && (v = v.slice(0, x.sheetRows)), [v, I];
  }
  function s(u, x) {
    var g = a(u, x), d = g[0], p = g[1], w = sa(d, x);
    return ar(p).forEach(function(y) {
      w[y] = p[y];
    }), w;
  }
  function f(u, x) {
    return hn(s(u, x), x);
  }
  function c(u, x, g, d) {
    var p = "C;Y" + (g + 1) + ";X" + (d + 1) + ";K";
    switch (u.t) {
      case "n":
        p += u.v || 0, u.f && !u.F && (p += ";E" + l0(u.f, { r: g, c: d }));
        break;
      case "b":
        p += u.v ? "TRUE" : "FALSE";
        break;
      case "e":
        p += u.w || u.v;
        break;
      case "d":
        p += '"' + (u.w || u.v) + '"';
        break;
      case "s":
        p += '"' + u.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return p;
  }
  function o(u, x) {
    x.forEach(function(g, d) {
      var p = "F;W" + (d + 1) + " " + (d + 1) + " ";
      g.hidden ? p += "0" : (typeof g.width == "number" && !g.wpx && (g.wpx = Va(g.width)), typeof g.wpx == "number" && !g.wch && (g.wch = $a(g.wpx)), typeof g.wch == "number" && (p += Math.round(g.wch))), p.charAt(p.length - 1) != " " && u.push(p);
    });
  }
  function l(u, x) {
    x.forEach(function(g, d) {
      var p = "F;";
      g.hidden ? p += "M0;" : g.hpt ? p += "M" + 20 * g.hpt + ";" : g.hpx && (p += "M" + 20 * za(g.hpx) + ";"), p.length > 2 && u.push(p + "R" + (d + 1));
    });
  }
  function h(u, x) {
    var g = ["ID;PWXL;N;E"], d = [], p = Me(u["!ref"]), w, y = Array.isArray(u), v = `\r
`;
    g.push("P;PGeneral"), g.push("F;P0;DG0G8;M255"), u["!cols"] && o(g, u["!cols"]), u["!rows"] && l(g, u["!rows"]), g.push("B;Y" + (p.e.r - p.s.r + 1) + ";X" + (p.e.c - p.s.c + 1) + ";D" + [p.s.c, p.s.r, p.e.c, p.e.r].join(" "));
    for (var N = p.s.r; N <= p.e.r; ++N)
      for (var T = p.s.c; T <= p.e.c; ++T) {
        var I = ye({ r: N, c: T });
        w = y ? (u[N] || [])[T] : u[I], !(!w || w.v == null && (!w.f || w.F)) && d.push(c(w, u, N, T));
      }
    return g.join(v) + v + d.join(v) + v + "E" + v;
  }
  return {
    to_workbook: f,
    to_sheet: s,
    from_sheet: h
  };
}(), Ao = /* @__PURE__ */ function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return t(Zr(i), s);
      case "binary":
        return t(i, s);
      case "buffer":
        return t(Ce && Buffer.isBuffer(i) ? i.toString("binary") : ln(i), s);
      case "array":
        return t(kn(i), s);
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
            d === "TRUE" ? h[c][o] = !0 : d === "FALSE" ? h[c][o] = !1 : isNaN(Et(g)) ? isNaN(Qn(g).getDate()) ? h[c][o] = g : h[c][o] = Ke(g) : h[c][o] = Et(g), ++o;
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
    return sa(e(i, s), s);
  }
  function n(i, s) {
    return hn(r(i, s), s);
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
              var p = h.w;
              !p && h.v != null && (p = h.v), p == null ? h.f && !h.F ? s(o, 1, 0, "=" + h.f) : s(o, 1, 0, "") : s(o, 0, p, "V");
              break;
            case "b":
              s(o, 0, h.v ? 1 : 0, h.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(o, 1, 0, isNaN(h.v) ? h.v : '="' + h.v + '"');
              break;
            case "d":
              h.w || (h.w = ut(h.z || Ee[14], pr(Ke(h.v)))), s(o, 0, h.w, "V");
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
}(), Fo = /* @__PURE__ */ function() {
  function e(h) {
    return h.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(h) {
    return h.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function r(h, u) {
    for (var x = h.split(`
`), g = -1, d = -1, p = 0, w = []; p !== x.length; ++p) {
      var y = x[p].trim().split(":");
      if (y[0] === "cell") {
        var v = rr(y[1]);
        if (w.length <= v.r) for (g = w.length; g <= v.r; ++g) w[g] || (w[g] = []);
        switch (g = v.r, d = v.c, y[2]) {
          case "t":
            w[g][d] = e(y[3]);
            break;
          case "v":
            w[g][d] = +y[3];
            break;
          case "vtf":
            var N = y[y.length - 1];
          case "vtc":
            switch (y[3]) {
              case "nl":
                w[g][d] = !!+y[4];
                break;
              default:
                w[g][d] = +y[4];
                break;
            }
            y[2] == "vtf" && (w[g][d] = [w[g][d], N]);
        }
      }
    }
    return u && u.sheetRows && (w = w.slice(0, u.sheetRows)), w;
  }
  function n(h, u) {
    return sa(r(h, u), u);
  }
  function a(h, u) {
    return hn(n(h, u), u);
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
    for (var u = [], x = [], g, d = "", p = Gr(h["!ref"]), w = Array.isArray(h), y = p.s.r; y <= p.e.r; ++y)
      for (var v = p.s.c; v <= p.e.c; ++v)
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
              var N = pr(Ke(g.v));
              x[2] = "vtc", x[3] = "nd", x[4] = "" + N, x[5] = g.w || ut(g.z || Ee[14], N);
              break;
            case "e":
              continue;
          }
          u.push(x.join(":"));
        }
    return u.push("sheet:c:" + (p.e.c - p.s.c + 1) + ":r:" + (p.e.r - p.s.r + 1) + ":tvf:1"), u.push("valueformat:1:text-wiki"), u.join(`
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
}(), ea = /* @__PURE__ */ function() {
  function e(l, h, u, x, g) {
    g.raw ? h[u][x] = l : l === "" || (l === "TRUE" ? h[u][x] = !0 : l === "FALSE" ? h[u][x] = !1 : isNaN(Et(l)) ? isNaN(Qn(l).getDate()) ? h[u][x] = l : h[u][x] = Ke(l) : h[u][x] = Et(l));
  }
  function t(l, h) {
    var u = h || {}, x = [];
    if (!l || l.length === 0) return x;
    for (var g = l.split(/[\r\n]/), d = g.length - 1; d >= 0 && g[d].length === 0; ) --d;
    for (var p = 10, w = 0, y = 0; y <= d; ++y)
      w = g[y].indexOf(" "), w == -1 ? w = g[y].length : w++, p = Math.max(p, w);
    for (y = 0; y <= d; ++y) {
      x[y] = [];
      var v = 0;
      for (e(g[y].slice(0, p).trim(), x, y, v, u), v = 1; v <= (g[y].length - p) / 10 + 1; ++v)
        e(g[y].slice(p + (v - 1) * 10, p + v * 10).trim(), x, y, v, u);
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
    return g.sort(function(d, p) {
      return d[0] - p[0] || n[d[1]] - n[p[1]];
    }), r[g.pop()[1]] || 44;
  }
  function i(l, h) {
    var u = h || {}, x = "", g = u.dense ? [] : {}, d = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    l.slice(0, 4) == "sep=" ? l.charCodeAt(5) == 13 && l.charCodeAt(6) == 10 ? (x = l.charAt(4), l = l.slice(7)) : l.charCodeAt(5) == 13 || l.charCodeAt(5) == 10 ? (x = l.charAt(4), l = l.slice(6)) : x = a(l.slice(0, 1024)) : u && u.FS ? x = u.FS : x = a(l.slice(0, 1024));
    var p = 0, w = 0, y = 0, v = 0, N = 0, T = x.charCodeAt(0), I = !1, k = 0, U = l.charCodeAt(0);
    l = l.replace(/\r\n/mg, `
`);
    var C = u.dateNF != null ? Xh(u.dateNF) : null;
    function D() {
      var M = l.slice(v, N), B = {};
      if (M.charAt(0) == '"' && M.charAt(M.length - 1) == '"' && (M = M.slice(1, -1).replace(/""/g, '"')), M.length === 0) B.t = "z";
      else if (u.raw)
        B.t = "s", B.v = M;
      else if (M.trim().length === 0)
        B.t = "s", B.v = M;
      else if (M.charCodeAt(0) == 61)
        M.charCodeAt(1) == 34 && M.charCodeAt(M.length - 1) == 34 ? (B.t = "s", B.v = M.slice(2, -1).replace(/""/g, '"')) : yp(M) ? (B.t = "n", B.f = M.slice(1)) : (B.t = "s", B.v = M);
      else if (M == "TRUE")
        B.t = "b", B.v = !0;
      else if (M == "FALSE")
        B.t = "b", B.v = !1;
      else if (!isNaN(y = Et(M)))
        B.t = "n", u.cellText !== !1 && (B.w = M), B.v = y;
      else if (!isNaN(Qn(M).getDate()) || C && M.match(C)) {
        B.z = u.dateNF || Ee[14];
        var Y = 0;
        C && M.match(C) && (M = Yh(M, u.dateNF, M.match(C) || []), Y = 1), u.cellDates ? (B.t = "d", B.v = Ke(M, Y)) : (B.t = "n", B.v = pr(Ke(M, Y))), u.cellText !== !1 && (B.w = ut(B.z, B.v instanceof Date ? pr(B.v) : B.v)), u.cellNF || delete B.z;
      } else
        B.t = "s", B.v = M;
      if (B.t == "z" || (u.dense ? (g[p] || (g[p] = []), g[p][w] = B) : g[ye({ c: w, r: p })] = B), v = N + 1, U = l.charCodeAt(v), d.e.c < w && (d.e.c = w), d.e.r < p && (d.e.r = p), k == T) ++w;
      else if (w = 0, ++p, u.sheetRows && u.sheetRows <= p) return !0;
    }
    e: for (; N < l.length; ++N) switch (k = l.charCodeAt(N)) {
      case 34:
        U === 34 && (I = !I);
        break;
      case T:
      case 10:
      case 13:
        if (!I && D()) break e;
        break;
    }
    return N - v > 0 && D(), g["!ref"] = Ae(d), g;
  }
  function s(l, h) {
    return !(h && h.PRN) || h.FS || l.slice(0, 4) == "sep=" || l.indexOf("	") >= 0 || l.indexOf(",") >= 0 || l.indexOf(";") >= 0 ? i(l, h) : sa(t(l, h), h);
  }
  function f(l, h) {
    var u = "", x = h.type == "string" ? [0, 0, 0, 0] : v0(l, h);
    switch (h.type) {
      case "base64":
        u = Zr(l);
        break;
      case "binary":
        u = l;
        break;
      case "buffer":
        h.codepage == 65001 ? u = l.toString("utf8") : h.codepage && typeof Da < "u" || (u = Ce && Buffer.isBuffer(l) ? l.toString("binary") : ln(l));
        break;
      case "array":
        u = kn(l);
        break;
      case "string":
        u = l;
        break;
      default:
        throw new Error("Unrecognized type " + h.type);
    }
    return x[0] == 239 && x[1] == 187 && x[2] == 191 ? u = Ge(u.slice(3)) : h.type != "string" && h.type != "buffer" && h.codepage == 65001 ? u = Ge(u) : h.type == "binary" && typeof Da < "u", u.slice(0, 19) == "socialcalc:version:" ? Fo.to_sheet(h.type == "string" ? u : Ge(u), h) : s(u, h);
  }
  function c(l, h) {
    return hn(f(l, h), h);
  }
  function o(l) {
    for (var h = [], u = Me(l["!ref"]), x, g = Array.isArray(l), d = u.s.r; d <= u.e.r; ++d) {
      for (var p = [], w = u.s.c; w <= u.e.c; ++w) {
        var y = ye({ r: d, c: w });
        if (x = g ? (l[d] || [])[w] : l[y], !x || x.v == null) {
          p.push("          ");
          continue;
        }
        for (var v = (x.w || ($t(x), x.w) || "").slice(0, 10); v.length < 10; ) v += " ";
        p.push(v + (w === 0 ? " " : ""));
      }
      h.push(p.join(""));
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
function cd(e, t) {
  var r = t || {}, n = !!r.WTF;
  r.WTF = !0;
  try {
    var a = ko.to_workbook(e, r);
    return r.WTF = n, a;
  } catch (i) {
    if (r.WTF = n, !i.message.match(/SYLK bad record ID/) && n) throw i;
    return ea.to_workbook(e, t);
  }
}
var yn = /* @__PURE__ */ function() {
  function e(O, P, R) {
    if (O) {
      Er(O, O.l || 0);
      for (var L = R.Enum || _e; O.l < O.length; ) {
        var Q = O.read_shift(2), fe = L[Q] || L[65535], ce = O.read_shift(2), ie = O.l + ce, te = fe.f && fe.f(O, ce, R);
        if (O.l = ie, P(te, fe, Q)) return;
      }
    }
  }
  function t(O, P) {
    switch (P.type) {
      case "base64":
        return r(Jr(Zr(O)), P);
      case "binary":
        return r(Jr(O), P);
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
      R.Enum = _e, e(O, function(xe, ir, rt) {
        switch (rt) {
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
            rt == 14 && (xe[2] & 112) == 112 && (xe[2] & 15) > 1 && (xe[2] & 15) < 15 && (xe[1].z = R.dateNF || Ee[14], R.cellDates && (xe[1].t = "d", xe[1].v = Vi(xe[1].v))), R.qpro && xe[3] > ce && (L["!ref"] = Ae(b), ie[Q] = L, te.push(Q), L = R.dense ? [] : {}, b = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, ce = xe[3], Q = fe || "Sheet" + (ce + 1), fe = "");
            var Tt = R.dense ? (L[xe[0].r] || [])[xe[0].c] : L[ye(xe[0])];
            if (Tt) {
              Tt.t = xe[1].t, Tt.v = xe[1].v, xe[1].z != null && (Tt.z = xe[1].z), xe[1].f != null && (Tt.f = xe[1].f);
              break;
            }
            R.dense ? (L[xe[0].r] || (L[xe[0].r] = []), L[xe[0].r][xe[0].c] = xe[1]) : L[ye(xe[0])] = xe[1];
            break;
        }
      }, R);
    else if (O[2] == 26 || O[2] == 14)
      R.Enum = Se, O[2] == 14 && (R.qpro = !0, O.l = 0), e(O, function(xe, ir, rt) {
        switch (rt) {
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
    for (var Re = {}, je = [], Be = 0; Be < be.length; ++Be) ie[te[Be]] ? (je.push(be[Be] || te[Be]), Re[be[Be]] = ie[be[Be]] || ie[te[Be]]) : (je.push(be[Be]), Re[be[Be]] = { "!ref": "A1" });
    return { SheetNames: je, Sheets: Re };
  }
  function n(O, P) {
    var R = P || {};
    if (+R.codepage >= 0 && vt(+R.codepage), R.type == "string") throw new Error("Cannot write WK1 to JS string");
    var L = zr(), Q = Me(O["!ref"]), fe = Array.isArray(O), ce = [];
    le(L, 0, i(1030)), le(L, 6, c(Q));
    for (var ie = Math.min(Q.e.r, 8191), te = Q.s.r; te <= ie; ++te)
      for (var be = or(te), b = Q.s.c; b <= Q.e.c; ++b) {
        te === Q.s.r && (ce[b] = er(b));
        var Xe = ce[b] + be, Re = fe ? (O[te] || [])[b] : O[Xe];
        if (!(!Re || Re.t == "z"))
          if (Re.t == "n")
            (Re.v | 0) == Re.v && Re.v >= -32768 && Re.v <= 32767 ? le(L, 13, x(te, b, Re.v)) : le(L, 14, d(te, b, Re.v));
          else {
            var je = $t(Re);
            le(L, 15, h(te, b, je.slice(0, 239)));
          }
      }
    return le(L, 1), L.end();
  }
  function a(O, P) {
    var R = P || {};
    if (+R.codepage >= 0 && vt(+R.codepage), R.type == "string") throw new Error("Cannot write WK3 to JS string");
    var L = zr();
    le(L, 0, s(O));
    for (var Q = 0, fe = 0; Q < O.SheetNames.length; ++Q) (O.Sheets[O.SheetNames[Q]] || {})["!ref"] && le(L, 27, H(O.SheetNames[Q], fe++));
    var ce = 0;
    for (Q = 0; Q < O.SheetNames.length; ++Q) {
      var ie = O.Sheets[O.SheetNames[Q]];
      if (!(!ie || !ie["!ref"])) {
        for (var te = Me(ie["!ref"]), be = Array.isArray(ie), b = [], Xe = Math.min(te.e.r, 8191), Re = te.s.r; Re <= Xe; ++Re)
          for (var je = or(Re), Be = te.s.c; Be <= te.e.c; ++Be) {
            Re === te.s.r && (b[Be] = er(Be));
            var xe = b[Be] + je, ir = be ? (ie[Re] || [])[Be] : ie[xe];
            if (!(!ir || ir.t == "z"))
              if (ir.t == "n")
                le(L, 23, D(Re, Be, ce, ir.v));
              else {
                var rt = $t(ir);
                le(L, 22, k(Re, Be, ce, rt.slice(0, 239)));
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
        var te = Gr(ie["!ref"]);
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
  function p(O, P, R) {
    var L = O.l + P, Q = o(O, P, R);
    if (Q[1].v = O.read_shift(8, "f"), R.qpro) O.l = L;
    else {
      var fe = O.read_shift(2);
      N(O.slice(O.l, O.l + fe), Q), O.l += fe;
    }
    return Q;
  }
  function w(O, P, R) {
    var L = P & 32768;
    return P &= -32769, P = (L ? O : 0) + (P >= 8192 ? P - 16384 : P), (L ? "" : "$") + (R ? er(P) : or(P));
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
  function N(O, P) {
    Er(O, 0);
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
  function I(O, P) {
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
    0: { n: "BOF", f: xr },
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
    16: { n: "FORMULA", f: p },
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
    22: { n: "LABEL16", f: I },
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
function od(e) {
  var t = {}, r = e.match(Dr), n = 0, a = !1;
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
        t.cp = Rs[parseInt(i.val, 10)];
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
var ld = /* @__PURE__ */ function() {
  var e = Pa("t"), t = Pa("rPr");
  function r(i) {
    var s = i.match(e);
    if (!s) return { t: "s", v: "" };
    var f = { t: "s", v: Pe(s[1]) }, c = i.match(t);
    return c && (f.s = od(c[1])), f;
  }
  var n = /<(?:\w+:)?r>/g, a = /<\/(?:\w+:)?r>/;
  return function(s) {
    return s.replace(n, "").split(a).map(r).filter(function(f) {
      return f.v;
    });
  };
}(), hd = /* @__PURE__ */ function() {
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
}(), ud = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g, xd = /<(?:\w+:)?r>/, dd = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;
function i0(e, t) {
  var r = t ? t.cellHTML : !0, n = {};
  return e ? (e.match(/^\s*<(?:\w+:)?t[^>]*>/) ? (n.t = Pe(Ge(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || "")), n.r = Ge(e), r && (n.h = Gs(n.t))) : (
    /*y = */
    e.match(xd) && (n.r = Ge(e), n.t = Pe(Ge((e.replace(dd, "").match(ud) || []).join("").replace(Dr, ""))), r && (n.h = hd(ld(n.r))))
  ), n) : { t: "" };
}
var gd = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/, pd = /<(?:\w+:)?(?:si|sstItem)>/g, md = /<\/(?:\w+:)?(?:si|sstItem)>/;
function vd(e, t) {
  var r = [], n = "";
  if (!e) return r;
  var a = e.match(gd);
  if (a) {
    n = a[2].replace(pd, "").split(md);
    for (var i = 0; i != n.length; ++i) {
      var s = i0(n[i].trim(), t);
      s != null && (r[r.length] = s);
    }
    a = Te(a[1]), r.Count = a.count, r.Unique = a.uniqueCount;
  }
  return r;
}
var wd = /^\s|\s$|[\t\n\r]/;
function bo(e, t) {
  if (!t.bookSST) return "";
  var r = [lr];
  r[r.length] = oe("sst", null, {
    xmlns: In[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match(wd) && (i += ' xml:space="preserve"'), i += ">" + ze(a.t) + "</t>"), i += "</si>", r[r.length] = i;
    }
  return r.length > 2 && (r[r.length] = "</sst>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function _d(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function Ed(e, t) {
  var r = [], n = !1;
  return jt(e, function(i, s, f) {
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
function yd(e, t) {
  return t || (t = q(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}
var Td = Bu;
function Sd(e) {
  var t = zr();
  re(t, 159, yd(e));
  for (var r = 0; r < e.length; ++r) re(t, 19, Td(e[r]));
  return re(
    t,
    160
    /* BrtEndSst */
  ), t.end();
}
function Co(e) {
  for (var t = [], r = e.split(""), n = 0; n < r.length; ++n) t[n] = r[n].charCodeAt(0);
  return t;
}
function Ht(e, t) {
  var r = {};
  return r.Major = e.read_shift(2), r.Minor = e.read_shift(2), t >= 4 && (e.l += t - 4), r;
}
function kd(e) {
  var t = {};
  return t.id = e.read_shift(0, "lpp4"), t.R = Ht(e, 4), t.U = Ht(e, 4), t.W = Ht(e, 4), t;
}
function Ad(e) {
  for (var t = e.read_shift(4), r = e.l + t - 4, n = {}, a = e.read_shift(4), i = []; a-- > 0; ) i.push({ t: e.read_shift(4), v: e.read_shift(0, "lpp4") });
  if (n.name = e.read_shift(0, "lpp4"), n.comps = i, e.l != r) throw new Error("Bad DataSpaceMapEntry: " + e.l + " != " + r);
  return n;
}
function Fd(e) {
  var t = [];
  e.l += 4;
  for (var r = e.read_shift(4); r-- > 0; ) t.push(Ad(e));
  return t;
}
function bd(e) {
  var t = [];
  e.l += 4;
  for (var r = e.read_shift(4); r-- > 0; ) t.push(e.read_shift(0, "lpp4"));
  return t;
}
function Cd(e) {
  var t = {};
  return e.read_shift(4), e.l += 4, t.id = e.read_shift(0, "lpp4"), t.name = e.read_shift(0, "lpp4"), t.R = Ht(e, 4), t.U = Ht(e, 4), t.W = Ht(e, 4), t;
}
function Od(e) {
  var t = Cd(e);
  if (t.ename = e.read_shift(0, "8lpp4"), t.blksz = e.read_shift(4), t.cmode = e.read_shift(4), e.read_shift(4) != 4) throw new Error("Bad !Primary record");
  return t;
}
function Oo(e, t) {
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
function Io(e, t) {
  var r = {}, n = e.l + t;
  return e.l += 4, r.Salt = e.slice(e.l, e.l + 16), e.l += 16, r.Verifier = e.slice(e.l, e.l + 16), e.l += 16, e.read_shift(4), r.VerifierHash = e.slice(e.l, n), e.l = n, r;
}
function Id(e) {
  var t = Ht(e);
  switch (t.Minor) {
    case 2:
      return [t.Minor, Nd(e)];
    case 3:
      return [t.Minor, Bd()];
    case 4:
      return [t.Minor, Dd(e)];
  }
  throw new Error("ECMA-376 Encrypted file unrecognized Version: " + t.Minor);
}
function Nd(e) {
  var t = e.read_shift(4);
  if ((t & 63) != 36) throw new Error("EncryptionInfo mismatch");
  var r = e.read_shift(4), n = Oo(e, r), a = Io(e, e.length - e.l);
  return { t: "Std", h: n, v: a };
}
function Bd() {
  throw new Error("File is password-protected: ECMA-376 Extensible");
}
function Dd(e) {
  var t = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm", "saltValue"];
  e.l += 4;
  var r = e.read_shift(e.length - e.l, "utf8"), n = {};
  return r.replace(Dr, function(i) {
    var s = Te(i);
    switch (Ct(s[0])) {
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
function Rd(e, t) {
  var r = {}, n = r.EncryptionVersionInfo = Ht(e, 4);
  if (t -= 4, n.Minor != 2) throw new Error("unrecognized minor version code: " + n.Minor);
  if (n.Major > 4 || n.Major < 2) throw new Error("unrecognized major version code: " + n.Major);
  r.Flags = e.read_shift(4), t -= 4;
  var a = e.read_shift(4);
  return t -= 4, r.EncryptionHeader = Oo(e, a), t -= a, r.EncryptionVerifier = Io(e, t), r;
}
function Ld(e) {
  var t = {}, r = t.EncryptionVersionInfo = Ht(e, 4);
  if (r.Major != 1 || r.Minor != 1) throw "unrecognized version code " + r.Major + " : " + r.Minor;
  return t.Salt = e.read_shift(16), t.EncryptedVerifier = e.read_shift(16), t.EncryptedVerifierHash = e.read_shift(16), t;
}
function s0(e) {
  var t = 0, r, n = Co(e), a = n.length + 1, i, s, f, c, o;
  for (r = nn(a), r[0] = n.length, i = 1; i != a; ++i) r[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = r[i], f = t & 16384 ? 1 : 0, c = t << 1 & 32767, o = f | c, t = o ^ s;
  return t ^ 52811;
}
var No = /* @__PURE__ */ function() {
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
    for (var f = Co(s), c = i(f), o = f.length, l = nn(16), h = 0; h != 16; ++h) l[h] = 0;
    var u, x, g;
    for ((o & 1) === 1 && (u = c >> 8, l[o] = a(e[0], u), --o, u = c & 255, x = f[f.length - 1], l[o] = a(x, u)); o > 0; )
      --o, u = c >> 8, l[o] = a(f[o], u), --o, u = c & 255, l[o] = a(f[o], u);
    for (o = 15, g = 15 - f.length; g > 0; )
      u = c >> 8, l[o] = a(e[g], u), --o, --g, u = c & 255, l[o] = a(f[o], u), --o, --g;
    return l;
  };
}(), Pd = function(e, t, r, n, a) {
  a || (a = t), n || (n = No(e));
  var i, s;
  for (i = 0; i != t.length; ++i)
    s = t[i], s ^= n[r], s = (s >> 5 | s << 3) & 255, a[i] = s, ++r;
  return [a, r, n];
}, Md = function(e) {
  var t = 0, r = No(e);
  return function(n) {
    var a = Pd("", n, t, r);
    return t = a[1], a[0];
  };
};
function Ud(e, t, r, n) {
  var a = { key: xr(e), verificationBytes: xr(e) };
  return r.password && (a.verifier = s0(r.password)), n.valid = a.verificationBytes === a.verifier, n.valid && (n.insitu = Md(r.password)), a;
}
function Wd(e, t, r) {
  var n = r || {};
  return n.Info = e.read_shift(2), e.l -= 2, n.Info === 1 ? n.Data = Ld(e) : n.Data = Rd(e, t), n;
}
function Hd(e, t, r) {
  var n = { Type: r.biff >= 8 ? e.read_shift(2) : 0 };
  return n.Type ? Wd(e, t - 2, n) : Ud(e, r.biff >= 8 ? t : t - 2, r, n), n;
}
var Bo = /* @__PURE__ */ function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return t(Zr(a), i);
      case "binary":
        return t(a, i);
      case "buffer":
        return t(Ce && Buffer.isBuffer(a) ? a.toString("binary") : ln(a), i);
      case "array":
        return t(kn(a), i);
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
            var p = l.slice(x, u.lastIndex - g[0].length);
            if (p[0] == " " && (p = p.slice(1)), ++d, p.length) {
              var w = { v: p, t: "s" };
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
    return hn(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = Me(a["!ref"]), f, c = Array.isArray(a), o = s.s.r; o <= s.e.r; ++o) {
      i.push("\\trowd\\trautofit1");
      for (var l = s.s.c; l <= s.e.c; ++l) i.push("\\cellx" + (l + 1));
      for (i.push("\\pard\\intbl"), l = s.s.c; l <= s.e.c; ++l) {
        var h = ye({ r: o, c: l });
        f = c ? (a[o] || [])[l] : a[h], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || ($t(f), f.w))), i.push("\\cell"));
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
function Vd(e) {
  var t = e.slice(e[0] === "#" ? 1 : 0).slice(0, 6);
  return [parseInt(t.slice(0, 2), 16), parseInt(t.slice(2, 4), 16), parseInt(t.slice(4, 6), 16)];
}
function Ha(e) {
  for (var t = 0, r = 1; t != 3; ++t) r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
function $d(e) {
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
function zd(e) {
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
function Ni(e, t) {
  if (t === 0) return e;
  var r = $d(Vd(e));
  return t < 0 ? r[2] = r[2] * (1 + t) : r[2] = 1 - (1 - r[2]) * (1 - t), Ha(zd(r));
}
var Do = 6, Gd = 15, jd = 1, Cr = Do;
function Va(e) {
  return Math.floor((e + Math.round(128 / Cr) / 256) * Cr);
}
function $a(e) {
  return Math.floor((e - 5) / Cr * 100 + 0.5) / 100;
}
function Bi(e) {
  return Math.round((e * Cr + 5) / Cr * 256) / 256;
}
function is(e) {
  return Bi($a(Va(e)));
}
function f0(e) {
  var t = Math.abs(e - is(e)), r = Cr;
  if (t > 5e-3) for (Cr = jd; Cr < Gd; ++Cr) Math.abs(e - is(e)) <= t && (t = Math.abs(e - is(e)), r = Cr);
  Cr = r;
}
function an(e) {
  e.width ? (e.wpx = Va(e.width), e.wch = $a(e.wpx), e.MDW = Cr) : e.wpx ? (e.wch = $a(e.wpx), e.width = Bi(e.wch), e.MDW = Cr) : typeof e.wch == "number" && (e.width = Bi(e.wch), e.wpx = Va(e.width), e.MDW = Cr), e.customWidth && delete e.customWidth;
}
var Xd = 96, Ro = Xd;
function za(e) {
  return e * 96 / Ro;
}
function ra(e) {
  return e * Ro / 96;
}
var Yd = {
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
function Kd(e, t, r, n) {
  t.Borders = [];
  var a = {}, i = !1;
  (e[0].match(Dr) || []).forEach(function(s) {
    var f = Te(s);
    switch (Ct(f[0])) {
      case "<borders":
      case "<borders>":
      case "</borders>":
        break;
      case "<border":
      case "<border>":
      case "<border/>":
        a = /*::(*/
        {}, f.diagonalUp && (a.diagonalUp = Ye(f.diagonalUp)), f.diagonalDown && (a.diagonalDown = Ye(f.diagonalDown)), t.Borders.push(a);
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
function Jd(e, t, r, n) {
  t.Fills = [];
  var a = {}, i = !1;
  (e[0].match(Dr) || []).forEach(function(s) {
    var f = Te(s);
    switch (Ct(f[0])) {
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
function qd(e, t, r, n) {
  t.Fonts = [];
  var a = {}, i = !1;
  (e[0].match(Dr) || []).forEach(function(s) {
    var f = Te(s);
    switch (Ct(f[0])) {
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
        f.val && (a.name = Ge(f.val));
        break;
      case "<name/>":
      case "</name>":
        break;
      case "<b":
        a.bold = f.val ? Ye(f.val) : 1;
        break;
      case "<b/>":
        a.bold = 1;
        break;
      case "<i":
        a.italic = f.val ? Ye(f.val) : 1;
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
        a.strike = f.val ? Ye(f.val) : 1;
        break;
      case "<strike/>":
        a.strike = 1;
        break;
      case "<outline":
        a.outline = f.val ? Ye(f.val) : 1;
        break;
      case "<outline/>":
        a.outline = 1;
        break;
      case "<shadow":
        a.shadow = f.val ? Ye(f.val) : 1;
        break;
      case "<shadow/>":
        a.shadow = 1;
        break;
      case "<condense":
        a.condense = f.val ? Ye(f.val) : 1;
        break;
      case "<condense/>":
        a.condense = 1;
        break;
      case "<extend":
        a.extend = f.val ? Ye(f.val) : 1;
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
        f.codepage = Rs[parseInt(f.val, 10)];
        break;
      case "<color":
        if (a.color || (a.color = {}), f.auto && (a.color.auto = Ye(f.auto)), f.rgb) a.color.rgb = f.rgb.slice(-6);
        else if (f.indexed) {
          a.color.index = parseInt(f.indexed, 10);
          var c = _n[a.color.index];
          a.color.index == 81 && (c = _n[1]), c || (c = _n[1]), a.color.rgb = c[0].toString(16) + c[1].toString(16) + c[2].toString(16);
        } else f.theme && (a.color.theme = parseInt(f.theme, 10), f.tint && (a.color.tint = parseFloat(f.tint)), f.theme && r.themeElements && r.themeElements.clrScheme && (a.color.rgb = Ni(r.themeElements.clrScheme[a.color.theme].rgb, a.color.tint || 0)));
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
function Zd(e, t, r) {
  t.NumberFmt = [];
  for (var n = ar(Ee), a = 0; a < n.length; ++a) t.NumberFmt[n[a]] = Ee[n[a]];
  var i = e[0].match(Dr);
  if (i)
    for (a = 0; a < i.length; ++a) {
      var s = Te(i[a]);
      switch (Ct(s[0])) {
        case "<numFmts":
        case "</numFmts>":
        case "<numFmts/>":
        case "<numFmts>":
          break;
        case "<numFmt":
          {
            var f = Pe(Ge(s.formatCode)), c = parseInt(s.numFmtId, 10);
            if (t.NumberFmt[c] = f, c > 0) {
              if (c > 392) {
                for (c = 392; c > 60 && t.NumberFmt[c] != null; --c) ;
                t.NumberFmt[c] = f;
              }
              Wt(f, c);
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
function Qd(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(r) {
    for (var n = r[0]; n <= r[1]; ++n) e[n] != null && (t[t.length] = oe("numFmt", null, { numFmtId: n, formatCode: ze(e[n]) }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = oe("numFmts", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
var gi = ["numFmtId", "fillId", "fontId", "borderId", "xfId"], pi = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];
function eg(e, t, r) {
  t.CellXf = [];
  var n, a = !1;
  (e[0].match(Dr) || []).forEach(function(i) {
    var s = Te(i), f = 0;
    switch (Ct(s[0])) {
      case "<cellXfs":
      case "<cellXfs>":
      case "<cellXfs/>":
      case "</cellXfs>":
        break;
      case "<xf":
      case "<xf/>":
        for (n = s, delete n[0], f = 0; f < gi.length; ++f) n[gi[f]] && (n[gi[f]] = parseInt(n[gi[f]], 10));
        for (f = 0; f < pi.length; ++f) n[pi[f]] && (n[pi[f]] = Ye(n[pi[f]]));
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
        s.vertical && (c.vertical = s.vertical), s.horizontal && (c.horizontal = s.horizontal), s.textRotation != null && (c.textRotation = s.textRotation), s.indent && (c.indent = s.indent), s.wrapText && (c.wrapText = Ye(s.wrapText)), n.alignment = c;
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
function rg(e) {
  var t = [];
  return t[t.length] = oe("cellXfs", null), e.forEach(function(r) {
    t[t.length] = oe("xf", null, r);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = oe("cellXfs", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
var tg = /* @__PURE__ */ function() {
  var t = /<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/, r = /<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/, n = /<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/, a = /<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/, i = /<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;
  return function(f, c, o) {
    var l = {};
    if (!f) return l;
    f = f.replace(/<!--([\s\S]*?)-->/mg, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
    var h;
    return (h = f.match(t)) && Zd(h, l, o), (h = f.match(a)) && qd(h, l, c, o), (h = f.match(n)) && Jd(h, l, c, o), (h = f.match(i)) && Kd(h, l, c, o), (h = f.match(r)) && eg(h, l, o), l;
  };
}();
function Lo(e, t) {
  var r = [lr, oe("styleSheet", null, {
    xmlns: In[0],
    "xmlns:vt": gr.vt
  })], n;
  return e.SSF && (n = Qd(e.SSF)) != null && (r[r.length] = n), r[r.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', r[r.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', r[r.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', r[r.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = rg(t.cellXfs)) && (r[r.length] = n), r[r.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', r[r.length] = '<dxfs count="0"/>', r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', r.length > 2 && (r[r.length] = "</styleSheet>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function ng(e, t) {
  var r = e.read_shift(2), n = Nr(e);
  return [r, n];
}
function ag(e, t, r) {
  r || (r = q(6 + 4 * t.length)), r.write_shift(2, e), wr(t, r);
  var n = r.length > r.l ? r.slice(0, r.l) : r;
  return r.l == null && (r.l = r.length), n;
}
function ig(e, t, r) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = Wu(e);
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
  switch (c > 0 && (n.charset = c), e.l++, n.color = Uu(e), e.read_shift(1)) {
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return n.name = Nr(e), n;
}
function sg(e, t) {
  t || (t = q(25 + 4 * 32)), t.write_shift(2, e.sz * 20), Hu(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var r = 0;
  e.vertAlign == "superscript" ? r = 1 : e.vertAlign == "subscript" && (r = 2), t.write_shift(2, r), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), Ci(e.color, t);
  var n = 0;
  return n = 2, t.write_shift(1, n), wr(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
}
var fg = [
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
], ss, cg = Br;
function bf(e, t) {
  t || (t = q(4 * 3 + 8 * 7 + 16 * 1)), ss || (ss = Wi(fg));
  var r = ss[e.patternType];
  r == null && (r = 40), t.write_shift(4, r);
  var n = 0;
  if (r != 40)
    for (Ci({ auto: 1 }, t), Ci({ auto: 1 }, t); n < 12; ++n) t.write_shift(4, 0);
  else {
    for (; n < 4; ++n) t.write_shift(4, 0);
    for (; n < 12; ++n) t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}
function og(e, t) {
  var r = e.l + t, n = e.read_shift(2), a = e.read_shift(2);
  return e.l = r, { ixfe: n, numFmtId: a };
}
function Po(e, t, r) {
  r || (r = q(16)), r.write_shift(2, t || 0), r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  var n = 0;
  return r.write_shift(1, n), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(1, 0), r;
}
function va(e, t) {
  return t || (t = q(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var lg = Br;
function hg(e, t) {
  return t || (t = q(51)), t.write_shift(1, 0), va(null, t), va(null, t), va(null, t), va(null, t), va(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function ug(e, t) {
  return t || (t = q(12 + 4 * 10)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, 0), t.write_shift(1, 0), bi(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function xg(e, t, r) {
  var n = q(2052);
  return n.write_shift(4, e), bi(t, n), bi(r, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function dg(e, t, r) {
  var n = {};
  n.NumberFmt = [];
  for (var a in Ee) n.NumberFmt[a] = Ee[a];
  n.CellXf = [], n.Fonts = [];
  var i = [], s = !1;
  return jt(e, function(c, o, l) {
    switch (l) {
      case 44:
        n.NumberFmt[c[0]] = c[1], Wt(c[1], c[0]);
        break;
      case 43:
        n.Fonts.push(c), c.color.theme != null && t && t.themeElements && t.themeElements.clrScheme && (c.color.rgb = Ni(t.themeElements.clrScheme[c.color.theme].rgb, c.color.tint || 0));
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
function gg(e, t) {
  if (t) {
    var r = 0;
    [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) t[a] != null && ++r;
    }), r != 0 && (re(e, 615, yt(r)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) t[a] != null && re(e, 44, ag(a, t[a]));
    }), re(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function pg(e) {
  var t = 1;
  re(e, 611, yt(t)), re(e, 43, sg({
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
function mg(e) {
  var t = 2;
  re(e, 603, yt(t)), re(e, 45, bf({ patternType: "none" })), re(e, 45, bf({ patternType: "gray125" })), re(
    e,
    604
    /* BrtEndFills */
  );
}
function vg(e) {
  var t = 1;
  re(e, 613, yt(t)), re(e, 46, hg()), re(
    e,
    614
    /* BrtEndBorders */
  );
}
function wg(e) {
  var t = 1;
  re(e, 626, yt(t)), re(e, 47, Po({
    numFmtId: 0
  }, 65535)), re(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function _g(e, t) {
  re(e, 617, yt(t.length)), t.forEach(function(r) {
    re(e, 47, Po(r, 0));
  }), re(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function Eg(e) {
  var t = 1;
  re(e, 619, yt(t)), re(e, 48, ug({
    xfId: 0,
    name: "Normal"
  })), re(
    e,
    620
    /* BrtEndStyles */
  );
}
function yg(e) {
  var t = 0;
  re(e, 505, yt(t)), re(
    e,
    506
    /* BrtEndDXFs */
  );
}
function Tg(e) {
  var t = 0;
  re(e, 508, xg(t, "TableStyleMedium9", "PivotStyleMedium4")), re(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function Sg(e, t) {
  var r = zr();
  return re(
    r,
    278
    /* BrtBeginStyleSheet */
  ), gg(r, e.SSF), pg(r), mg(r), vg(r), wg(r), _g(r, t.cellXfs), Eg(r), yg(r), Tg(r), re(
    r,
    279
    /* BrtEndStyleSheet */
  ), r.end();
}
var kg = [
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
function Ag(e, t, r) {
  t.themeElements.clrScheme = [];
  var n = {};
  (e[0].match(Dr) || []).forEach(function(a) {
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
        i[0].charAt(1) === "/" ? (t.themeElements.clrScheme[kg.indexOf(i[0])] = n, n = {}) : n.name = i[0].slice(3, i[0].length - 1);
        break;
      default:
        if (r && r.WTF) throw new Error("Unrecognized " + i[0] + " in clrScheme");
    }
  });
}
function Fg() {
}
function bg() {
}
var Cg = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/, Og = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/, Ig = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;
function Ng(e, t, r) {
  t.themeElements = {};
  var n;
  [
    /* clrScheme CT_ColorScheme */
    ["clrScheme", Cg, Ag],
    /* fontScheme CT_FontScheme */
    ["fontScheme", Og, Fg],
    /* fmtScheme CT_StyleMatrix */
    ["fmtScheme", Ig, bg]
  ].forEach(function(a) {
    if (!(n = e.match(a[1]))) throw new Error(a[0] + " not found in themeElements");
    a[2](n, t, r);
  });
}
var Bg = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;
function Mo(e, t) {
  (!e || e.length === 0) && (e = c0());
  var r, n = {};
  if (!(r = e.match(Bg))) throw new Error("themeElements not found in theme");
  return Ng(r[0], n, t), n.raw = e, n;
}
function c0(e, t) {
  if (t && t.themeXLSX) return t.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var r = [lr];
  return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("");
}
function Dg(e, t, r) {
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
      s = Cc(i, { type: "array" });
    } catch {
      return;
    }
    var f = qr(s, "theme/theme/theme1.xml", !0);
    if (f)
      return Mo(f, r);
  }
}
function Rg(e) {
  return e.read_shift(4);
}
function Lg(e) {
  var t = {};
  switch (t.xclrType = e.read_shift(2), t.nTintShade = e.read_shift(2), t.xclrType) {
    case 0:
      e.l += 4;
      break;
    case 1:
      t.xclrValue = Pg(e, 4);
      break;
    case 2:
      t.xclrValue = mo(e);
      break;
    case 3:
      t.xclrValue = Rg(e);
      break;
    case 4:
      e.l += 4;
      break;
  }
  return e.l += 8, t;
}
function Pg(e, t) {
  return Br(e, t);
}
function Mg(e, t) {
  return Br(e, t);
}
function Ug(e) {
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
      n[1] = Lg(e);
      break;
    case 6:
      n[1] = Mg(e, r);
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
function Wg(e, t) {
  var r = e.l + t;
  e.l += 2;
  var n = e.read_shift(2);
  e.l += 2;
  for (var a = e.read_shift(2), i = []; a-- > 0; ) i.push(Ug(e, r - e.l));
  return { ixfe: n, ext: i };
}
function Hg(e, t) {
  t.forEach(function(r) {
    switch (r[0]) {
    }
  });
}
function Vg(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: Nr(e)
  };
}
function $g(e) {
  var t = q(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), wr(e.name, t), t.slice(0, t.l);
}
function zg(e) {
  for (var t = [], r = e.read_shift(4); r-- > 0; )
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function Gg(e) {
  var t = q(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(4, e[r][0]), t.write_shift(4, e[r][1]);
  return t;
}
function jg(e, t) {
  var r = q(8 + 2 * t.length);
  return r.write_shift(4, e), wr(t, r), r.slice(0, r.l);
}
function Xg(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function Yg(e, t) {
  var r = q(8);
  return r.write_shift(4, e), r.write_shift(4, 1), r;
}
function Kg(e, t, r) {
  var n = { Types: [], Cell: [], Value: [] }, a = r || {}, i = [], s = !1, f = 2;
  return jt(e, function(c, o, l) {
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
function Jg() {
  var e = zr();
  return re(e, 332), re(e, 334, yt(1)), re(e, 335, $g({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), re(e, 336), re(e, 339, jg(1, "XLDAPR")), re(e, 52), re(e, 35, yt(514)), re(e, 4096, yt(0)), re(e, 4097, lt(1)), re(e, 36), re(e, 53), re(e, 340), re(e, 337, Yg(1)), re(e, 51, Gg([[1, 0]])), re(e, 338), re(e, 333), e.end();
}
function qg(e, t, r) {
  var n = { Types: [], Cell: [], Value: [] };
  if (!e)
    return n;
  var a = !1, i = 2, s;
  return e.replace(Dr, function(f) {
    var c = Te(f);
    switch (Ct(c[0])) {
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
function Uo() {
  var e = [lr];
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
function Zg(e) {
  var t = [];
  if (!e) return t;
  var r = 1;
  return (e.match(Dr) || []).forEach(function(n) {
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
function Qg(e) {
  var t = {};
  t.i = e.read_shift(4);
  var r = {};
  r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = ye(r);
  var n = e.read_shift(1);
  return n & 2 && (t.l = "1"), n & 8 && (t.a = "1"), t;
}
function ep(e, t, r) {
  var n = [];
  return jt(e, function(i, s, f) {
    switch (f) {
      case 63:
        n.push(i);
        break;
      default:
        if (!s.T) throw new Error("Unexpected record 0x" + f.toString(16));
    }
  }), n;
}
function rp(e, t, r, n) {
  if (!e) return e;
  var a = n || {}, i = !1;
  jt(e, function(f, c, o) {
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
function tp(e, t) {
  if (!e) return "??";
  var r = (e.match(/<c:chart [^>]*r:id="([^"]*)"/) || ["", ""])[1];
  return t["!id"][r].Target;
}
var jn = 1024;
function Wo(e, t) {
  for (var r = [21600, 21600], n = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","), a = [
    oe("xml", null, { "xmlns:v": Yr.v, "xmlns:o": Yr.o, "xmlns:x": Yr.x, "xmlns:mv": Yr.mv }).replace(/\/>/, ">"),
    oe("o:shapelayout", oe("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    oe("v:shapetype", [
      oe("v:stroke", null, { joinstyle: "miter" }),
      oe("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: r.join(","), path: n })
  ]; jn < e * 1e3; ) jn += 1e3;
  return t.forEach(function(i) {
    var s = rr(i[0]), f = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    f.type == "gradient" && (f.angle = "-180");
    var c = f.type == "gradient" ? oe("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, o = oe("v:fill", c, f), l = { on: "t", obscured: "t" };
    ++jn, a = a.concat([
      "<v:shape" + Ma({
        id: "_x0000_s" + jn,
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
      yr("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      yr("x:AutoFill", "False"),
      yr("x:Row", String(s.r)),
      yr("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), a.push("</xml>"), a.join("");
}
function Cf(e, t, r, n) {
  var a = Array.isArray(e), i;
  t.forEach(function(s) {
    var f = rr(s.ref);
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
function np(e, t) {
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
        var c = Te(f[0]), o = { author: c.authorId && r[c.authorId] || "sheetjsghost", ref: c.ref, guid: c.guid }, l = rr(c.ref);
        if (!(t.sheetRows && t.sheetRows <= l.r)) {
          var h = s.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/), u = !!h && !!h[1] && i0(h[1]) || { r: "", t: "", h: "" };
          o.r = u.r, u.r == "<t></t>" && (u.t = u.h = ""), o.t = (u.t || "").replace(/\r\n/g, `
`).replace(/\r/g, `
`), t.cellHTML && (o.h = u.h), n.push(o);
        }
      }
    }
  }), n;
}
function Ho(e) {
  var t = [lr, oe("comments", null, { xmlns: In[0] })], r = [];
  return t.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = ze(a.a);
      r.indexOf(i) == -1 && (r.push(i), t.push("<author>" + i + "</author>")), a.T && a.ID && r.indexOf("tc=" + a.ID) == -1 && (r.push("tc=" + a.ID), t.push("<author>tc=" + a.ID + "</author>"));
    });
  }), r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = r.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(c) {
      c.a && (a = r.indexOf(ze(c.a))), i.push(c.t || "");
    }), t.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1) t.push(yr("t", ze(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f) s += `Reply:
    ` + i[f] + `
`;
      t.push(yr("t", ze(s)));
    }
    t.push("</text></comment>");
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function ap(e, t) {
  var r = [], n = !1, a = {}, i = 0;
  return e.replace(Dr, function(f, c) {
    var o = Te(f);
    switch (Ct(o[0])) {
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
function ip(e, t, r) {
  var n = [lr, oe("ThreadedComments", null, { xmlns: gr.TCMNT }).replace(/[\/]>/, ">")];
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
      f == 0 ? i = c.id : c.parentId = i, s.ID = c.id, s.a && (c.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(s.a)).slice(-12) + "}"), n.push(oe("threadedComment", yr("text", s.t || ""), c));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function sp(e, t) {
  var r = [], n = !1;
  return e.replace(Dr, function(i) {
    var s = Te(i);
    switch (Ct(s[0])) {
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
function fp(e) {
  var t = [lr, oe("personList", null, {
    xmlns: gr.TCMNT,
    "xmlns:x": In[0]
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
function cp(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var r = Rn(e);
  return t.rfx = r.s, t.ref = ye(r.s), e.l += 16, t;
}
function op(e, t) {
  return t == null && (t = q(36)), t.write_shift(4, e[1].iauthor), fa(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var lp = Nr;
function hp(e) {
  return wr(e.slice(0, 54));
}
function up(e, t) {
  var r = [], n = [], a = {}, i = !1;
  return jt(e, function(f, c, o) {
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
function xp(e) {
  var t = zr(), r = [];
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
      r.indexOf(a.a) > -1 || (r.push(a.a.slice(0, 54)), re(t, 632, hp(a.a)));
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
      var i = { s: rr(n[0]), e: rr(n[0]) };
      re(t, 635, op([i, a])), a.t && a.t.length > 0 && re(t, 637, Ru(a)), re(
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
var dp = "application/vnd.ms-office.vbaProject";
function gp(e) {
  var t = ve.utils.cfb_new({ root: "R" });
  return e.FullPaths.forEach(function(r, n) {
    if (!(r.slice(-1) === "/" || !r.match(/_VBA_PROJECT_CUR/))) {
      var a = r.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
      ve.utils.cfb_add(t, a, e.FileIndex[n].content);
    }
  }), ve.write(t);
}
function pp(e, t) {
  t.FullPaths.forEach(function(r, n) {
    if (n != 0) {
      var a = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && ve.utils.cfb_add(e, a, t.FileIndex[n].content);
    }
  });
}
var Vo = ["xlsb", "xlsm", "xlam", "biff8", "xla"];
function mp() {
  return { "!type": "dialog" };
}
function vp() {
  return { "!type": "dialog" };
}
function wp() {
  return { "!type": "macro" };
}
function _p() {
  return { "!type": "macro" };
}
var qn = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function r(n, a, i, s) {
    var f = !1, c = !1;
    i.length == 0 ? c = !0 : i.charAt(0) == "[" && (c = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
    var o = i.length > 0 ? parseInt(i, 10) | 0 : 0, l = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return f ? l += t.c : --l, c ? o += t.r : --o, a + (f ? "" : "$") + er(l) + (c ? "" : "$") + or(o);
  }
  return function(a, i) {
    return t = i, a.replace(e, r);
  };
}(), o0 = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, l0 = /* @__PURE__ */ function() {
  return function(t, r) {
    return t.replace(o0, function(n, a, i, s, f, c) {
      var o = Js(s) - (i ? 0 : r.c), l = Ks(c) - (f ? 0 : r.r), h = l == 0 ? "" : f ? l + 1 : "[" + l + "]", u = o == 0 ? "" : i ? o + 1 : "[" + o + "]";
      return a + "R" + h + "C" + u;
    });
  };
}();
function $o(e, t) {
  return e.replace(o0, function(r, n, a, i, s, f) {
    return n + (a == "$" ? a + i : er(Js(i) + t.c)) + (s == "$" ? s + f : or(Ks(f) + t.r));
  });
}
function Ep(e, t, r) {
  var n = Gr(t), a = n.s, i = rr(r), s = { r: i.r - a.r, c: i.c - a.c };
  return $o(e, s);
}
function yp(e) {
  return e.length != 1;
}
function Of(e) {
  return e.replace(/_xlfn\./g, "");
}
function hr(e) {
  e.l += 1;
}
function sn(e, t) {
  var r = e.read_shift(2);
  return [r & 16383, r >> 14 & 1, r >> 15 & 1];
}
function zo(e, t, r) {
  var n = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return Go(e);
    r.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = sn(e), f = sn(e);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: f[0], cRel: f[1], rRel: f[2] } };
}
function Go(e) {
  var t = sn(e), r = sn(e), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: t[0], c: n, cRel: t[1], rRel: t[2] }, e: { r: r[0], c: a, cRel: r[1], rRel: r[2] } };
}
function Tp(e, t, r) {
  if (r.biff < 8) return Go(e);
  var n = e.read_shift(r.biff == 12 ? 4 : 2), a = e.read_shift(r.biff == 12 ? 4 : 2), i = sn(e), s = sn(e);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function jo(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5) return Sp(e);
  var n = e.read_shift(r && r.biff == 12 ? 4 : 2), a = sn(e);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function Sp(e) {
  var t = sn(e), r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function kp(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return { r: t, c: r & 255, fQuoted: !!(r & 16384), cRel: r >> 15, rRel: r >> 15 };
}
function Ap(e, t, r) {
  var n = r && r.biff ? r.biff : 8;
  if (n >= 2 && n <= 5) return Fp(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, f = (i & 32768) >> 15;
  if (i &= 16383, f == 1) for (; a > 524287; ) a -= 1048576;
  if (s == 1) for (; i > 8191; ) i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: f };
}
function Fp(e) {
  var t = e.read_shift(2), r = e.read_shift(1), n = (t & 32768) >> 15, a = (t & 16384) >> 14;
  return t &= 16383, n == 1 && t >= 8192 && (t = t - 16384), a == 1 && r >= 128 && (r = r - 256), { r: t, c: r, cRel: a, rRel: n };
}
function bp(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = zo(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
  return [n, a];
}
function Cp(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2, "i"), i = 8;
  if (r) switch (r.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  var s = zo(e, i, r);
  return [n, a, s];
}
function Op(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8, [n];
}
function Ip(e, t, r) {
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
function Np(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = Tp(e, t - 1, r);
  return [n, a];
}
function Bp(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7, [n];
}
function If(e) {
  var t = e[e.l + 1] & 1, r = 1;
  return e.l += 4, [t, r];
}
function Dp(e, t, r) {
  e.l += 2;
  for (var n = e.read_shift(r && r.biff == 2 ? 1 : 2), a = [], i = 0; i <= n; ++i) a.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
  return a;
}
function Rp(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Lp(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Pp(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}
function Mp(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += r && r.biff == 2 ? 3 : 4, [n];
}
function Xo(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return [t, r];
}
function Up(e) {
  return e.read_shift(2), Xo(e);
}
function Wp(e) {
  return e.read_shift(2), Xo(e);
}
function Hp(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = jo(e, 0, r);
  return [n, a];
}
function Vp(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Ap(e, 0, r);
  return [n, a];
}
function $p(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var i = jo(e, 0, r);
  return [n, a, i];
}
function zp(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [Xm[a], Jo[a], n];
}
function Gp(e, t, r) {
  var n = e[e.l++], a = e.read_shift(1), i = r && r.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : jp(e);
  return [a, (i[0] === 0 ? Jo : jm)[i[1]]];
}
function jp(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function Xp(e, t, r) {
  e.l += r && r.biff == 2 ? 3 : 4;
}
function Yp(e, t, r) {
  if (e.l++, r && r.biff == 12) return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function Kp(e) {
  return e.l++, Xt[e.read_shift(1)];
}
function Jp(e) {
  return e.l++, e.read_shift(2);
}
function qp(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function Zp(e) {
  return e.l++, Ir(e);
}
function Qp(e, t, r) {
  return e.l++, qa(e, t - 1, r);
}
function em(e, t) {
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
      r[1] = fr(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      r[1] = Xt[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = Ir(e);
      break;
    case 2:
      r[1] = Ln(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + r[0]);
  }
  return r;
}
function rm(e, t, r) {
  for (var n = e.read_shift(r.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i) a.push((r.biff == 12 ? Rn : $i)(e));
  return a;
}
function tm(e, t, r) {
  var n = 0, a = 0;
  r.biff == 12 ? (n = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), r.biff >= 2 && r.biff < 8 && (--n, --a == 0 && (a = 256));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var f = 0; f != a; ++f) s[i][f] = em(e, r.biff);
  return s;
}
function nm(e, t, r) {
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
function am(e, t, r) {
  if (r.biff == 5) return im(e);
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(2), i = e.read_shift(4);
  return [n, a, i];
}
function im(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [t, r, n];
}
function sm(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += r && r.biff == 2 ? 3 : 4;
  var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function fm(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function cm(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [n];
}
function om(e, t, r) {
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
var lm = Br, hm = Br, um = Br;
function Qa(e, t, r) {
  return e.l += 2, [kp(e)];
}
function h0(e) {
  return e.l += 6, [];
}
var xm = Qa, dm = h0, gm = h0, pm = Qa;
function Yo(e) {
  return e.l += 2, [xr(e), e.read_shift(2) & 1];
}
var mm = Qa, vm = Yo, wm = h0, _m = Qa, Em = Qa, ym = [
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
function Tm(e) {
  e.l += 2;
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(4), a = e.read_shift(2), i = e.read_shift(2), s = ym[r >> 2 & 31];
  return { ixti: t, coltype: r & 3, rt: s, idx: n, c: a, C: i };
}
function Sm(e) {
  return e.l += 2, [e.read_shift(4)];
}
function km(e, t, r) {
  return e.l += 5, e.l += 2, e.l += r.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function Am(e, t, r) {
  return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function Fm(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function bm(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function Cm(e) {
  return e.l += 4, [0, 0];
}
var Nf = {
  /*::[*/
  1: { n: "PtgExp", f: Yp },
  /*::[*/
  2: { n: "PtgTbl", f: um },
  /*::[*/
  3: { n: "PtgAdd", f: hr },
  /*::[*/
  4: { n: "PtgSub", f: hr },
  /*::[*/
  5: { n: "PtgMul", f: hr },
  /*::[*/
  6: { n: "PtgDiv", f: hr },
  /*::[*/
  7: { n: "PtgPower", f: hr },
  /*::[*/
  8: { n: "PtgConcat", f: hr },
  /*::[*/
  9: { n: "PtgLt", f: hr },
  /*::[*/
  10: { n: "PtgLe", f: hr },
  /*::[*/
  11: { n: "PtgEq", f: hr },
  /*::[*/
  12: { n: "PtgGe", f: hr },
  /*::[*/
  13: { n: "PtgGt", f: hr },
  /*::[*/
  14: { n: "PtgNe", f: hr },
  /*::[*/
  15: { n: "PtgIsect", f: hr },
  /*::[*/
  16: { n: "PtgUnion", f: hr },
  /*::[*/
  17: { n: "PtgRange", f: hr },
  /*::[*/
  18: { n: "PtgUplus", f: hr },
  /*::[*/
  19: { n: "PtgUminus", f: hr },
  /*::[*/
  20: { n: "PtgPercent", f: hr },
  /*::[*/
  21: { n: "PtgParen", f: hr },
  /*::[*/
  22: { n: "PtgMissArg", f: hr },
  /*::[*/
  23: { n: "PtgStr", f: Qp },
  /*::[*/
  26: { n: "PtgSheet", f: km },
  /*::[*/
  27: { n: "PtgEndSheet", f: Am },
  /*::[*/
  28: { n: "PtgErr", f: Kp },
  /*::[*/
  29: { n: "PtgBool", f: qp },
  /*::[*/
  30: { n: "PtgInt", f: Jp },
  /*::[*/
  31: { n: "PtgNum", f: Zp },
  /*::[*/
  32: { n: "PtgArray", f: Bp },
  /*::[*/
  33: { n: "PtgFunc", f: zp },
  /*::[*/
  34: { n: "PtgFuncVar", f: Gp },
  /*::[*/
  35: { n: "PtgName", f: nm },
  /*::[*/
  36: { n: "PtgRef", f: Hp },
  /*::[*/
  37: { n: "PtgArea", f: bp },
  /*::[*/
  38: { n: "PtgMemArea", f: sm },
  /*::[*/
  39: { n: "PtgMemErr", f: lm },
  /*::[*/
  40: { n: "PtgMemNoMem", f: hm },
  /*::[*/
  41: { n: "PtgMemFunc", f: fm },
  /*::[*/
  42: { n: "PtgRefErr", f: cm },
  /*::[*/
  43: { n: "PtgAreaErr", f: Op },
  /*::[*/
  44: { n: "PtgRefN", f: Vp },
  /*::[*/
  45: { n: "PtgAreaN", f: Np },
  /*::[*/
  46: { n: "PtgMemAreaN", f: Fm },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: bm },
  /*::[*/
  57: { n: "PtgNameX", f: am },
  /*::[*/
  58: { n: "PtgRef3d", f: $p },
  /*::[*/
  59: { n: "PtgArea3d", f: Cp },
  /*::[*/
  60: { n: "PtgRefErr3d", f: om },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: Ip },
  /*::[*/
  255: {}
}, Om = {
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
}, Im = {
  /*::[*/
  1: { n: "PtgElfLel", f: Yo },
  /*::[*/
  2: { n: "PtgElfRw", f: _m },
  /*::[*/
  3: { n: "PtgElfCol", f: xm },
  /*::[*/
  6: { n: "PtgElfRwV", f: Em },
  /*::[*/
  7: { n: "PtgElfColV", f: pm },
  /*::[*/
  10: { n: "PtgElfRadical", f: mm },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: wm },
  /*::[*/
  13: { n: "PtgElfColS", f: dm },
  /*::[*/
  15: { n: "PtgElfColSV", f: gm },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: vm },
  /*::[*/
  25: { n: "PtgList", f: Tm },
  /*::[*/
  29: { n: "PtgSxName", f: Sm },
  /*::[*/
  255: {}
}, Nm = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: Cm },
  /*::[*/
  1: { n: "PtgAttrSemi", f: Mp },
  /*::[*/
  2: { n: "PtgAttrIf", f: Lp },
  /*::[*/
  4: { n: "PtgAttrChoose", f: Dp },
  /*::[*/
  8: { n: "PtgAttrGoto", f: Rp },
  /*::[*/
  16: { n: "PtgAttrSum", f: Xp },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: If },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: If },
  /*::[*/
  64: { n: "PtgAttrSpace", f: Up },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: Wp },
  /*::[*/
  128: { n: "PtgAttrIfError", f: Pp },
  /*::[*/
  255: {}
};
function ei(e, t, r, n) {
  if (n.biff < 8) return Br(e, t);
  for (var a = e.l + t, i = [], s = 0; s !== r.length; ++s)
    switch (r[s][0]) {
      case "PtgArray":
        r[s][1] = tm(e, 0, n), i.push(r[s][1]);
        break;
      case "PtgMemArea":
        r[s][2] = rm(e, r[s][1], n), i.push(r[s][2]);
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
  return t = a - e.l, t !== 0 && i.push(Br(e, t)), i;
}
function ri(e, t, r) {
  for (var n = e.l + t, a, i, s = []; n != e.l; )
    t = n - e.l, i = e[e.l], a = Nf[i] || Nf[Om[i]], (i === 24 || i === 25) && (a = (i === 24 ? Im : Nm)[e[e.l + 1]]), !a || !a.f ? Br(e, t) : s.push([a.n, a.f(e, t, r)]);
  return s;
}
function Bm(e) {
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
var Dm = {
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
function Rm(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function Ko(e, t, r) {
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
function Bf(e, t, r) {
  var n = Ko(e, t, r);
  return n == "#REF" ? n : Rm(n, r);
}
function br(e, t, r, n, a) {
  var i = a && a.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 } }
  ), f = [], c, o, l, h = 0, u = 0, x, g = "";
  if (!e[0] || !e[0][0]) return "";
  for (var d = -1, p = "", w = 0, y = e[0].length; w < y; ++w) {
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
              p = tr(" ", e[0][d][1][1]);
              break;
            case 1:
              p = tr("\r", e[0][d][1][1]);
              break;
            default:
              if (p = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][d][1][0]);
          }
          o = o + p, d = -1;
        }
        f.push(o + Dm[v[0]] + c);
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
        l = Aa(v[1][1], s, a), f.push(Fa(l, i));
        break;
      case "PtgRefN":
        l = r ? Aa(v[1][1], r, a) : v[1][1], f.push(Fa(l, i));
        break;
      case "PtgRef3d":
        h = /*::Number(*/
        v[1][1], l = Aa(v[1][2], s, a), g = Bf(n, h, a), f.push(g + "!" + Fa(l, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var N = v[1][0], T = v[1][1];
        N || (N = 0), N &= 127;
        var I = N == 0 ? [] : f.slice(-N);
        f.length -= N, T === "User" && (T = I.shift()), f.push(T + "(" + I.join(",") + ")");
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
        x = cf(v[1][1], r ? { s: r } : s, a), f.push(ts(x, a));
        break;
      case "PtgArea":
        x = cf(v[1][1], s, a), f.push(ts(x, a));
        break;
      case "PtgArea3d":
        h = /*::Number(*/
        v[1][1], x = v[1][2], g = Bf(n, h, a), f.push(g + "!" + ts(x, a));
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
            var B = (Ko(n, C, a) || "").split(";;");
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
          switch (p = "", e[0][d][1][0]) {
            case 2:
              Y = tr(" ", e[0][d][1][1]) + Y;
              break;
            case 3:
              Y = tr("\r", e[0][d][1][1]) + Y;
              break;
            case 4:
              he = tr(" ", e[0][d][1][1]) + he;
              break;
            case 5:
              he = tr("\r", e[0][d][1][1]) + he;
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
          f.push(br(ee, s, W, n, a));
        } else {
          var ne = !1;
          for (c = 0; c != n.arrayf.length; ++c)
            if (o = n.arrayf[c], !(l.c < o[0].s.c || l.c > o[0].e.c) && !(l.r < o[0].s.r || l.r > o[0].e.r)) {
              f.push(br(o[1], s, W, n, a)), ne = !0;
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
        f.push("{" + Bm(
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
          p = tr(" ", v[1][1]);
          break;
        case 5:
          H = !1;
        case 1:
          p = tr("\r", v[1][1]);
          break;
        default:
          if (p = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + v[1][0]);
      }
      f.push((H ? p : "") + f.pop() + (H ? "" : p)), d = -1;
    }
  }
  if (f.length > 1 && a.WTF) throw new Error("bad formula stack");
  return f[0];
}
function Lm(e, t, r) {
  var n = e.l + t, a = r.biff == 2 ? 1 : 2, i, s = e.read_shift(a);
  if (s == 65535) return [[], Br(e, t - 2)];
  var f = ri(e, s, r);
  return t !== s + a && (i = ei(e, t - s - a, f, r)), e.l = n, [f, i];
}
function Pm(e, t, r) {
  var n = e.l + t, a = r.biff == 2 ? 1 : 2, i, s = e.read_shift(a);
  if (s == 65535) return [[], Br(e, t - 2)];
  var f = ri(e, s, r);
  return t !== s + a && (i = ei(e, t - s - a, f, r)), e.l = n, [f, i];
}
function Mm(e, t, r, n) {
  var a = e.l + t, i = ri(e, n, r), s;
  return a !== e.l && (s = ei(e, a - e.l, i, r)), [i, s];
}
function Um(e, t, r) {
  var n = e.l + t, a, i = e.read_shift(2), s = ri(e, i, r);
  return i == 65535 ? [[], Br(e, t - 2)] : (t !== i + 2 && (a = ei(e, n - i - 2, s, r)), [s, a]);
}
function Wm(e) {
  var t;
  if (Mt(e, e.l + 6) !== 65535) return [Ir(e), "n"];
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
function Hm(e) {
  if (e == null) {
    var t = q(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number") return An(e);
  return An(0);
}
function fs(e, t, r) {
  var n = e.l + t, a = Ot(e);
  r.biff == 2 && ++e.l;
  var i = Wm(e), s = e.read_shift(1);
  r.biff != 2 && (e.read_shift(1), r.biff >= 5 && e.read_shift(4));
  var f = Pm(e, n - e.l, r);
  return { cell: a, val: i[0], formula: f, shared: s >> 3 & 1, tt: i[1] };
}
function Vm(e, t, r, n, a) {
  var i = bn(t, r, a), s = Hm(e.v), f = q(6), c = 33;
  f.write_shift(2, c), f.write_shift(4, 0);
  for (var o = q(e.bf.length), l = 0; l < e.bf.length; ++l) o[l] = e.bf[l];
  var h = vr([i, s, f, o]);
  return h;
}
function zi(e, t, r) {
  var n = e.read_shift(4), a = ri(e, n, r), i = e.read_shift(4), s = i > 0 ? ei(e, i, a, r) : null;
  return [a, s];
}
var $m = zi, Gi = zi, zm = zi, Gm = zi, jm = {
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
}, Jo = {
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
}, Xm = {
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
function Df(e) {
  return e.slice(0, 3) == "of:" && (e = e.slice(3)), e.charCodeAt(0) == 61 && (e = e.slice(1), e.charCodeAt(0) == 61 && (e = e.slice(1))), e = e.replace(/COM\.MICROSOFT\./g, ""), e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function(t, r) {
    return r.replace(/\./g, "");
  }), e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1"), e.replace(/[;~]/g, ",").replace(/\|/g, ";");
}
function Ym(e) {
  var t = "of:=" + e.replace(o0, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function cs(e) {
  var t = e.split(":"), r = t[0].split(".")[0];
  return [r, t[0].split(".")[1] + (t.length > 1 ? ":" + (t[1].split(".")[1] || t[1].split(".")[0]) : "")];
}
function Km(e) {
  return e.replace(/\./, "!");
}
var Ca = {}, Zn = {}, Oa = typeof Map < "u";
function u0(e, t, r) {
  var n = 0, a = e.length;
  if (r) {
    if (Oa ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
      for (var i = Oa ? r.get(t) : r[t]; n < i.length; ++n)
        if (e[i[n]].t === t)
          return e.Count++, i[n];
    }
  } else for (; n < a; ++n)
    if (e[n].t === t)
      return e.Count++, n;
  return e[a] = { t }, e.Count++, e.Unique++, r && (Oa ? (r.has(t) || r.set(t, []), r.get(t).push(a)) : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []), r[t].push(a))), a;
}
function ji(e, t) {
  var r = { min: e + 1, max: e + 1 }, n = -1;
  return t.MDW && (Cr = t.MDW), t.width != null ? r.customWidth = 1 : t.wpx != null ? n = $a(t.wpx) : t.wch != null && (n = t.wch), n > -1 ? (r.width = Bi(n), r.customWidth = 1) : t.width != null && (r.width = t.width), t.hidden && (r.hidden = !0), t.level != null && (r.outlineLevel = r.level = t.level), r;
}
function Tn(e, t) {
  if (e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    t == "xlml" && (r = [1, 1, 1, 1, 0.5, 0.5]), e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5]);
  }
}
function un(e, t, r) {
  var n = r.revssf[t.z != null ? t.z : "General"], a = 60, i = e.length;
  if (n == null && r.ssf) {
    for (; a < 392; ++a) if (r.ssf[a] == null) {
      Wt(t.z, a), r.ssf[a] = t.z, r.revssf[t.z] = n = a;
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
function qo(e, t, r, n, a, i) {
  try {
    n.cellNF && (e.z = Ee[t]);
  } catch (f) {
    if (n.WTF) throw f;
  }
  if (!(e.t === "z" && !n.cellStyles)) {
    if (e.t === "d" && typeof e.v == "string" && (e.v = Ke(e.v)), (!n || n.cellText !== !1) && e.t !== "z") try {
      if (Ee[t] == null && Wt(jh[t] || "General", t), e.t === "e") e.w = e.w || Xt[e.v];
      else if (t === 0)
        if (e.t === "n")
          (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = La(e.v);
        else if (e.t === "d") {
          var s = pr(e.v);
          (s | 0) === s ? e.w = s.toString(10) : e.w = La(s);
        } else {
          if (e.v === void 0) return "";
          e.w = Sn(e.v, Zn);
        }
      else e.t === "d" ? e.w = ut(t, pr(e.v), Zn) : e.w = ut(t, e.v, Zn);
    } catch (f) {
      if (n.WTF) throw f;
    }
    if (n.cellStyles && r != null)
      try {
        e.s = i.Fills[r], e.s.fgColor && e.s.fgColor.theme && !e.s.fgColor.rgb && (e.s.fgColor.rgb = Ni(a.themeElements.clrScheme[e.s.fgColor.theme].rgb, e.s.fgColor.tint || 0), n.WTF && (e.s.fgColor.raw_rgb = a.themeElements.clrScheme[e.s.fgColor.theme].rgb)), e.s.bgColor && e.s.bgColor.theme && (e.s.bgColor.rgb = Ni(a.themeElements.clrScheme[e.s.bgColor.theme].rgb, e.s.bgColor.tint || 0), n.WTF && (e.s.bgColor.raw_rgb = a.themeElements.clrScheme[e.s.bgColor.theme].rgb));
      } catch (f) {
        if (n.WTF && i.Fills) throw f;
      }
  }
}
function Jm(e, t, r) {
  if (e && e["!ref"]) {
    var n = Me(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r) throw new Error("Bad range (" + r + "): " + e["!ref"]);
  }
}
function qm(e, t) {
  var r = Me(t);
  r.s.r <= r.e.r && r.s.c <= r.e.c && r.s.r >= 0 && r.s.c >= 0 && (e["!ref"] = Ae(r));
}
var Zm = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g, Qm = /<(?:\w+:)?sheetData[^>]*>([\s\S]*)<\/(?:\w+:)?sheetData>/, e2 = /<(?:\w:)?hyperlink [^>]*>/mg, r2 = /"(\w*:\w*)"/, t2 = /<(?:\w:)?col\b[^>]*[\/]?>/g, n2 = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g, a2 = /<(?:\w:)?pageMargins[^>]*\/>/g, Zo = /<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/, i2 = /<(?:\w:)?sheetPr[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetPr)>/, s2 = /<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;
function f2(e, t, r, n, a, i, s) {
  if (!e) return e;
  n || (n = { "!id": {} });
  var f = t.dense ? [] : {}, c = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, o = "", l = "", h = e.match(Qm);
  h ? (o = e.slice(0, h.index), l = e.slice(h.index + h[0].length)) : o = l = e;
  var u = o.match(Zo);
  u ? x0(u[0], f, a, r) : (u = o.match(i2)) && o2(u[0], u[1] || "", f, a, r);
  var x = (o.match(/<(?:\w*:)?dimension/) || { index: -1 }).index;
  if (x > 0) {
    var g = o.slice(x, x + 50).match(r2);
    g && qm(f, g[1]);
  }
  var d = o.match(s2);
  d && d[1] && y2(d[1], a);
  var p = [];
  if (t.cellStyles) {
    var w = o.match(t2);
    w && m2(p, w);
  }
  h && k2(h[1], f, t, c, i, s);
  var y = l.match(n2);
  y && (f["!autofilter"] = w2(y[0]));
  var v = [], N = l.match(Zm);
  if (N) for (x = 0; x != N.length; ++x)
    v[x] = Me(N[x].slice(N[x].indexOf('"') + 1));
  var T = l.match(e2);
  T && d2(f, T, n);
  var I = l.match(a2);
  if (I && (f["!margins"] = g2(Te(I[0]))), !f["!ref"] && c.e.c >= c.s.c && c.e.r >= c.s.r && (f["!ref"] = Ae(c)), t.sheetRows > 0 && f["!ref"]) {
    var k = Me(f["!ref"]);
    t.sheetRows <= +k.e.r && (k.e.r = t.sheetRows - 1, k.e.r > c.e.r && (k.e.r = c.e.r), k.e.r < k.s.r && (k.s.r = k.e.r), k.e.c > c.e.c && (k.e.c = c.e.c), k.e.c < k.s.c && (k.s.c = k.e.c), f["!fullref"] = f["!ref"], f["!ref"] = Ae(k));
  }
  return p.length > 0 && (f["!cols"] = p), v.length > 0 && (f["!merges"] = v), f;
}
function c2(e) {
  if (e.length === 0) return "";
  for (var t = '<mergeCells count="' + e.length + '">', r = 0; r != e.length; ++r) t += '<mergeCell ref="' + Ae(e[r]) + '"/>';
  return t + "</mergeCells>";
}
function x0(e, t, r, n) {
  var a = Te(e);
  r.Sheets[n] || (r.Sheets[n] = {}), a.codeName && (r.Sheets[n].CodeName = Pe(Ge(a.codeName)));
}
function o2(e, t, r, n, a) {
  x0(e.slice(0, e.indexOf(">")), r, n, a);
}
function l2(e, t, r, n, a) {
  var i = !1, s = {}, f = null;
  if (n.bookType !== "xlsx" && t.vbaraw) {
    var c = t.SheetNames[r];
    try {
      t.Workbook && (c = t.Workbook.Sheets[r].CodeName || c);
    } catch {
    }
    i = !0, s.codeName = bt(ze(c));
  }
  if (e && e["!outline"]) {
    var o = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (o.summaryBelow = 0), e["!outline"].left && (o.summaryRight = 0), f = (f || "") + oe("outlinePr", null, o);
  }
  !i && !f || (a[a.length] = oe("sheetPr", f, s));
}
var h2 = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], u2 = [
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
function x2(e) {
  var t = { sheet: 1 };
  return h2.forEach(function(r) {
    e[r] != null && e[r] && (t[r] = "1");
  }), u2.forEach(function(r) {
    e[r] != null && !e[r] && (t[r] = "0");
  }), e.password && (t.password = s0(e.password).toString(16).toUpperCase()), oe("sheetProtection", null, t);
}
function d2(e, t, r) {
  for (var n = Array.isArray(e), a = 0; a != t.length; ++a) {
    var i = Te(Ge(t[a]), !0);
    if (!i.ref) return;
    var s = ((r || {})["!id"] || [])[i.id];
    s ? (i.Target = s.Target, i.location && (i.Target += "#" + Pe(i.location))) : (i.Target = "#" + Pe(i.location), s = { Target: i.Target, TargetMode: "Internal" }), i.Rel = s, i.tooltip && (i.Tooltip = i.tooltip, delete i.tooltip);
    for (var f = Me(i.ref), c = f.s.r; c <= f.e.r; ++c) for (var o = f.s.c; o <= f.e.c; ++o) {
      var l = ye({ c: o, r: c });
      n ? (e[c] || (e[c] = []), e[c][o] || (e[c][o] = { t: "z", v: void 0 }), e[c][o].l = i) : (e[l] || (e[l] = { t: "z", v: void 0 }), e[l].l = i);
    }
  }
}
function g2(e) {
  var t = {};
  return ["left", "right", "top", "bottom", "header", "footer"].forEach(function(r) {
    e[r] && (t[r] = parseFloat(e[r]));
  }), t;
}
function p2(e) {
  return Tn(e), oe("pageMargins", null, e);
}
function m2(e, t) {
  for (var r = !1, n = 0; n != t.length; ++n) {
    var a = Te(t[n], !0);
    a.hidden && (a.hidden = Ye(a.hidden));
    var i = parseInt(a.min, 10) - 1, s = parseInt(a.max, 10) - 1;
    for (a.outlineLevel && (a.level = +a.outlineLevel || 0), delete a.min, delete a.max, a.width = +a.width, !r && a.width && (r = !0, f0(a.width)), an(a); i <= s; ) e[i++] = Je(a);
  }
}
function v2(e, t) {
  for (var r = ["<cols>"], n, a = 0; a != t.length; ++a)
    (n = t[a]) && (r[r.length] = oe("col", null, ji(a, n)));
  return r[r.length] = "</cols>", r.join("");
}
function w2(e) {
  var t = { ref: (e.match(/ref="([^"]*)"/) || [])[1] };
  return t;
}
function _2(e, t, r, n) {
  var a = typeof e.ref == "string" ? e.ref : Ae(e.ref);
  r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
  var i = r.Workbook.Names, s = Gr(a);
  s.s.r == s.e.r && (s.e.r = Gr(t["!ref"]).e.r, a = Ae(s));
  for (var f = 0; f < i.length; ++f) {
    var c = i[f];
    if (c.Name == "_xlnm._FilterDatabase" && c.Sheet == n) {
      c.Ref = "'" + r.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return f == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + a }), oe("autoFilter", null, { ref: a });
}
var E2 = /<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/;
function y2(e, t) {
  t.Views || (t.Views = [{}]), (e.match(E2) || []).forEach(function(r, n) {
    var a = Te(r);
    t.Views[n] || (t.Views[n] = {}), +a.zoomScale && (t.Views[n].zoom = +a.zoomScale), Ye(a.rightToLeft) && (t.Views[n].RTL = !0);
  });
}
function T2(e, t, r, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), oe("sheetViews", oe("sheetView", null, a), {});
}
function S2(e, t, r, n) {
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
      a = Xt[e.v];
      break;
    case "d":
      n && n.cellDates ? a = Ke(e.v, -1).toISOString() : (e = Je(e), e.t = "n", a = "" + (e.v = pr(Ke(e.v)))), typeof e.z > "u" && (e.z = Ee[14]);
      break;
    default:
      a = e.v;
      break;
  }
  var f = yr("v", ze(a)), c = { r: t }, o = un(n.cellXfs, e, n);
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
        f = yr("v", "" + u0(n.Strings, e.v, n.revStrings)), c.t = "s";
        break;
      }
      c.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var l = e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    f = oe("f", ze(e.f), l) + (e.v != null ? f : "");
  }
  return e.l && r["!links"].push([t, e.l]), e.D && (c.cm = 1), oe("c", f, c);
}
var k2 = /* @__PURE__ */ function() {
  var e = /<(?:\w+:)?c[ \/>]/, t = /<\/(?:\w+:)?row>/, r = /r=["']([^"']*)["']/, n = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/, a = /ref=["']([^"']*)["']/, i = Pa("v"), s = Pa("f");
  return function(c, o, l, h, u, x) {
    for (var g = 0, d = "", p = [], w = [], y = 0, v = 0, N = 0, T = "", I, k, U = 0, C = 0, D, M, B = 0, Y = 0, he = Array.isArray(x.CellXf), W, ee = [], ne = [], De = Array.isArray(o), H = [], _e = {}, Se = !1, O = !!l.sheetStubs, P = c.split(t), R = 0, L = P.length; R != L; ++R) {
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
              _e = {}, Se = !1, k.ht && (Se = !0, _e.hpt = parseFloat(k.ht), _e.hpx = ra(_e.hpt)), k.hidden == "1" && (Se = !0, _e.hidden = !0), k.outlineLevel != null && (Se = !0, _e.level = +k.outlineLevel), Se && (H[U - 1] = _e);
            }
            break;
          case "<":
            fe = g;
            break;
        }
        if (fe >= g) break;
        if (k = Te(d.slice(fe, g), !0), U = k.r != null ? parseInt(k.r, 10) : U + 1, C = -1, !(l.sheetRows && l.sheetRows < U)) {
          h.s.r > U - 1 && (h.s.r = U - 1), h.e.r < U - 1 && (h.e.r = U - 1), l && l.cellStyles && (_e = {}, Se = !1, k.ht && (Se = !0, _e.hpt = parseFloat(k.ht), _e.hpx = ra(_e.hpt)), k.hidden == "1" && (Se = !0, _e.hidden = !0), k.outlineLevel != null && (Se = !0, _e.level = +k.outlineLevel), Se && (H[U - 1] = _e)), p = d.slice(g).split(e);
          for (var ce = 0; ce != p.length && p[ce].trim().charAt(0) == "<"; ++ce) ;
          for (p = p.slice(ce), g = 0; g != p.length; ++g)
            if (d = p[g].trim(), d.length !== 0) {
              if (w = d.match(r), y = g, v = 0, N = 0, d = "<c " + (d.slice(0, 1) == "<" ? ">" : "") + d, w != null && w.length === 2) {
                for (y = 0, T = w[1], v = 0; v != T.length && !((N = T.charCodeAt(v) - 64) < 1 || N > 26); ++v)
                  y = 26 * y + N;
                --y, C = y;
              } else ++C;
              for (v = 0; v != d.length && d.charCodeAt(v) !== 62; ++v) ;
              if (++v, k = Te(d.slice(0, v), !0), k.r || (k.r = ye({ r: U - 1, c: C })), T = d.slice(v), I = { t: "" }, (w = T.match(i)) != null && /*::cref != null && */
              w[1] !== "" && (I.v = Pe(w[1])), l.cellFormula) {
                if ((w = T.match(s)) != null && /*::cref != null && */
                w[1] !== "") {
                  if (I.f = Pe(Ge(w[1])).replace(/\r\n/g, `
`), l.xlfn || (I.f = Of(I.f)), /*::cref != null && cref[0] != null && */
                  w[0].indexOf('t="array"') > -1)
                    I.F = (T.match(a) || [])[1], I.F.indexOf(":") > -1 && ee.push([Me(I.F), I.F]);
                  else if (
                    /*::cref != null && cref[0] != null && */
                    w[0].indexOf('t="shared"') > -1
                  ) {
                    M = Te(w[0]);
                    var ie = Pe(Ge(w[1]));
                    l.xlfn || (ie = Of(ie)), ne[parseInt(M.si, 10)] = [M, ie, k.r];
                  }
                } else (w = T.match(/<f[^>]*\/>/)) && (M = Te(w[0]), ne[M.si] && (I.f = Ep(ne[M.si][1], ne[M.si][2], k.r)));
                var te = rr(k.r);
                for (v = 0; v < ee.length; ++v)
                  te.r >= ee[v][0].s.r && te.r <= ee[v][0].e.r && te.c >= ee[v][0].s.c && te.c <= ee[v][0].e.c && (I.F = ee[v][1]);
              }
              if (k.t == null && I.v === void 0)
                if (I.f || I.F)
                  I.v = 0, I.t = "n";
                else if (O) I.t = "z";
                else continue;
              else I.t = k.t || "n";
              switch (h.s.c > C && (h.s.c = C), h.e.c < C && (h.e.c = C), I.t) {
                case "n":
                  if (I.v == "" || I.v == null) {
                    if (!O) continue;
                    I.t = "z";
                  } else I.v = parseFloat(I.v);
                  break;
                case "s":
                  if (typeof I.v > "u") {
                    if (!O) continue;
                    I.t = "z";
                  } else
                    D = Ca[parseInt(I.v, 10)], I.v = D.t, I.r = D.r, l.cellHTML && (I.h = D.h);
                  break;
                case "str":
                  I.t = "s", I.v = I.v != null ? Ge(I.v) : "", l.cellHTML && (I.h = Gs(I.v));
                  break;
                case "inlineStr":
                  w = T.match(n), I.t = "s", w != null && (D = i0(w[1])) ? (I.v = D.t, l.cellHTML && (I.h = D.h)) : I.v = "";
                  break;
                case "b":
                  I.v = Ye(I.v);
                  break;
                case "d":
                  l.cellDates ? I.v = Ke(I.v, 1) : (I.v = pr(Ke(I.v, 1)), I.t = "n");
                  break;
                case "e":
                  (!l || l.cellText !== !1) && (I.w = I.v), I.v = Qc[I.v];
                  break;
              }
              if (B = Y = 0, W = null, he && k.s !== void 0 && (W = x.CellXf[k.s], W != null && (W.numFmtId != null && (B = W.numFmtId), l.cellStyles && W.fillId != null && (Y = W.fillId))), qo(I, B, Y, l, u, x), l.cellDates && he && I.t == "n" && aa(Ee[B]) && (I.t = "d", I.v = Vi(I.v)), k.cm && l.xlmeta) {
                var be = (l.xlmeta.Cell || [])[+k.cm - 1];
                be && be.type == "XLDAPR" && (I.D = !0);
              }
              if (De) {
                var b = rr(k.r);
                o[b.r] || (o[b.r] = []), o[b.r][b.c] = I;
              } else o[k.r] = I;
            }
        }
      }
    }
    H.length > 0 && (o["!rows"] = H);
  };
}();
function A2(e, t, r, n) {
  var a = [], i = [], s = Me(e["!ref"]), f = "", c, o = "", l = [], h = 0, u = 0, x = e["!rows"], g = Array.isArray(e), d = { r: o }, p, w = -1;
  for (u = s.s.c; u <= s.e.c; ++u) l[u] = er(u);
  for (h = s.s.r; h <= s.e.r; ++h) {
    for (i = [], o = or(h), u = s.s.c; u <= s.e.c; ++u) {
      c = l[u] + o;
      var y = g ? (e[h] || [])[u] : e[c];
      y !== void 0 && (f = S2(y, c, e, t)) != null && i.push(f);
    }
    (i.length > 0 || x && x[h]) && (d = { r: o }, x && x[h] && (p = x[h], p.hidden && (d.hidden = 1), w = -1, p.hpx ? w = za(p.hpx) : p.hpt && (w = p.hpt), w > -1 && (d.ht = w, d.customHeight = 1), p.level && (d.outlineLevel = p.level)), a[a.length] = oe("row", i.join(""), d));
  }
  if (x) for (; h < x.length; ++h)
    x && x[h] && (d = { r: h + 1 }, p = x[h], p.hidden && (d.hidden = 1), w = -1, p.hpx ? w = za(p.hpx) : p.hpt && (w = p.hpt), w > -1 && (d.ht = w, d.customHeight = 1), p.level && (d.outlineLevel = p.level), a[a.length] = oe("row", "", d));
  return a.join("");
}
function Qo(e, t, r, n) {
  var a = [lr, oe("worksheet", null, {
    xmlns: In[0],
    "xmlns:r": gr.r
  })], i = r.SheetNames[e], s = 0, f = "", c = r.Sheets[i];
  c == null && (c = {});
  var o = c["!ref"] || "A1", l = Me(o);
  if (l.e.c > 16383 || l.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + o + " exceeds format limit A1:XFD1048576");
    l.e.c = Math.min(l.e.c, 16383), l.e.r = Math.min(l.e.c, 1048575), o = Ae(l);
  }
  n || (n = {}), c["!comments"] = [];
  var h = [];
  l2(c, r, e, t, a), a[a.length] = oe("dimension", null, { ref: o }), a[a.length] = T2(c, t, e, r), t.sheetFormat && (a[a.length] = oe("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), c["!cols"] != null && c["!cols"].length > 0 && (a[a.length] = v2(c, c["!cols"])), a[s = a.length] = "<sheetData/>", c["!links"] = [], c["!ref"] != null && (f = A2(c, t), f.length > 0 && (a[a.length] = f)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), c["!protect"] && (a[a.length] = x2(c["!protect"])), c["!autofilter"] != null && (a[a.length] = _2(c["!autofilter"], c, r, e)), c["!merges"] != null && c["!merges"].length > 0 && (a[a.length] = c2(c["!merges"]));
  var u = -1, x, g = -1;
  return (
    /*::(*/
    c["!links"].length > 0 && (a[a.length] = "<hyperlinks>", c["!links"].forEach(function(d) {
      d[1].Target && (x = { ref: d[0] }, d[1].Target.charAt(0) != "#" && (g = $e(n, -1, ze(d[1].Target).replace(/#.*$/, ""), Ne.HLINK), x["r:id"] = "rId" + g), (u = d[1].Target.indexOf("#")) > -1 && (x.location = ze(d[1].Target.slice(u + 1))), d[1].Tooltip && (x.tooltip = ze(d[1].Tooltip)), a[a.length] = oe("hyperlink", null, x));
    }), a[a.length] = "</hyperlinks>"), delete c["!links"], c["!margins"] != null && (a[a.length] = p2(c["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (a[a.length] = yr("ignoredErrors", oe("ignoredError", null, { numberStoredAsText: 1, sqref: o }))), h.length > 0 && (g = $e(n, -1, "../drawings/drawing" + (e + 1) + ".xml", Ne.DRAW), a[a.length] = oe("drawing", null, { "r:id": "rId" + g }), c["!drawing"] = h), c["!comments"].length > 0 && (g = $e(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", Ne.VML), a[a.length] = oe("legacyDrawing", null, { "r:id": "rId" + g }), c["!legacy"] = g), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("")
  );
}
function F2(e, t) {
  var r = {}, n = e.l + t;
  r.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (r.level = i & 7), i & 16 && (r.hidden = !0), i & 32 && (r.hpt = a / 20), r;
}
function b2(e, t, r) {
  var n = q(145), a = (r["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = za(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
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
function C2(e, t, r, n) {
  var a = b2(n, r, t);
  (a.length > 17 || (t["!rows"] || [])[n]) && re(e, 0, a);
}
var O2 = Rn, I2 = fa;
function N2() {
}
function B2(e, t) {
  var r = {}, n = e[e.l];
  return ++e.l, r.above = !(n & 64), r.left = !(n & 128), e.l += 18, r.name = Lu(e), r;
}
function D2(e, t, r) {
  r == null && (r = q(84 + 4 * e.length));
  var n = 192;
  t && (t.above && (n &= -65), t.left && (n &= -129)), r.write_shift(1, n);
  for (var a = 1; a < 3; ++a) r.write_shift(1, 0);
  return Ci({ auto: 1 }, r), r.write_shift(-4, -1), r.write_shift(-4, -1), Yc(e, r), r.slice(0, r.l);
}
function R2(e) {
  var t = xt(e);
  return [t];
}
function L2(e, t, r) {
  return r == null && (r = q(8)), Nn(t, r);
}
function P2(e) {
  var t = Bn(e);
  return [t];
}
function M2(e, t, r) {
  return r == null && (r = q(4)), Dn(t, r);
}
function U2(e) {
  var t = xt(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function W2(e, t, r) {
  return r == null && (r = q(9)), Nn(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function H2(e) {
  var t = Bn(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function V2(e, t, r) {
  return r == null && (r = q(5)), Dn(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function $2(e) {
  var t = xt(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function z2(e, t, r) {
  return r == null && (r = q(9)), Nn(t, r), r.write_shift(1, e.v), r;
}
function G2(e) {
  var t = Bn(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function j2(e, t, r) {
  return r == null && (r = q(8)), Dn(t, r), r.write_shift(1, e.v), r.write_shift(2, 0), r.write_shift(1, 0), r;
}
function X2(e) {
  var t = xt(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function Y2(e, t, r) {
  return r == null && (r = q(12)), Nn(t, r), r.write_shift(4, t.v), r;
}
function K2(e) {
  var t = Bn(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function J2(e, t, r) {
  return r == null && (r = q(8)), Dn(t, r), r.write_shift(4, t.v), r;
}
function q2(e) {
  var t = xt(e), r = Ir(e);
  return [t, r, "n"];
}
function Z2(e, t, r) {
  return r == null && (r = q(16)), Nn(t, r), An(e.v, r), r;
}
function el(e) {
  var t = Bn(e), r = Ir(e);
  return [t, r, "n"];
}
function Q2(e, t, r) {
  return r == null && (r = q(12)), Dn(t, r), An(e.v, r), r;
}
function ev(e) {
  var t = xt(e), r = e0(e);
  return [t, r, "n"];
}
function rv(e, t, r) {
  return r == null && (r = q(12)), Nn(t, r), Kc(e.v, r), r;
}
function tv(e) {
  var t = Bn(e), r = e0(e);
  return [t, r, "n"];
}
function nv(e, t, r) {
  return r == null && (r = q(8)), Dn(t, r), Kc(e.v, r), r;
}
function av(e) {
  var t = xt(e), r = qs(e);
  return [t, r, "is"];
}
function iv(e) {
  var t = xt(e), r = Nr(e);
  return [t, r, "str"];
}
function sv(e, t, r) {
  return r == null && (r = q(12 + 4 * e.v.length)), Nn(t, r), wr(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function fv(e) {
  var t = Bn(e), r = Nr(e);
  return [t, r, "str"];
}
function cv(e, t, r) {
  return r == null && (r = q(8 + 4 * e.v.length)), Dn(t, r), wr(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function ov(e, t, r) {
  var n = e.l + t, a = xt(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Gi(e, n - e.l, r);
    s[3] = br(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function lv(e, t, r) {
  var n = e.l + t, a = xt(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Gi(e, n - e.l, r);
    s[3] = br(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function hv(e, t, r) {
  var n = e.l + t, a = xt(e);
  a.r = r["!row"];
  var i = Ir(e), s = [a, i, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Gi(e, n - e.l, r);
    s[3] = br(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function uv(e, t, r) {
  var n = e.l + t, a = xt(e);
  a.r = r["!row"];
  var i = Nr(e), s = [a, i, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var f = Gi(e, n - e.l, r);
    s[3] = br(f, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
var xv = Rn, dv = fa;
function gv(e, t) {
  return t == null && (t = q(4)), t.write_shift(4, e), t;
}
function pv(e, t) {
  var r = e.l + t, n = Rn(e), a = Zs(e), i = Nr(e), s = Nr(e), f = Nr(e);
  e.l = r;
  var c = { rfx: n, relId: a, loc: i, display: f };
  return s && (c.Tooltip = s), c;
}
function mv(e, t) {
  var r = q(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  fa({ s: rr(e[0]), e: rr(e[0]) }, r), Qs("rId" + t, r);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return wr(a || "", r), wr(e[1].Tooltip || "", r), wr("", r), r.slice(0, r.l);
}
function vv() {
}
function wv(e, t, r) {
  var n = e.l + t, a = Jc(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, r.cellFormula) {
    var f = $m(e, n - e.l, r);
    s[1] = f;
  } else e.l = n;
  return s;
}
function _v(e, t, r) {
  var n = e.l + t, a = Rn(e), i = [a];
  if (r.cellFormula) {
    var s = Gm(e, n - e.l, r);
    i[1] = s, e.l = n;
  } else e.l = n;
  return i;
}
function Ev(e, t, r) {
  r == null && (r = q(18));
  var n = ji(e, t);
  r.write_shift(-4, e), r.write_shift(-4, e), r.write_shift(4, (n.width || 10) * 256), r.write_shift(
    4,
    0
    /*ixfe*/
  );
  var a = 0;
  return t.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), t.level && (a |= t.level << 8), r.write_shift(2, a), r;
}
var rl = ["left", "right", "top", "bottom", "header", "footer"];
function yv(e) {
  var t = {};
  return rl.forEach(function(r) {
    t[r] = Ir(e);
  }), t;
}
function Tv(e, t) {
  return t == null && (t = q(6 * 8)), Tn(e), rl.forEach(function(r) {
    An(e[r], t);
  }), t;
}
function Sv(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function kv(e, t, r) {
  r == null && (r = q(30));
  var n = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (n |= 32), r.write_shift(2, n), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 100), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r;
}
function Av(e) {
  var t = q(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), fa(e, t), t;
}
function Fv(e, t) {
  return t == null && (t = q(16 * 4 + 2)), t.write_shift(2, e.password ? s0(e.password) : 0), t.write_shift(4, 1), [
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
function bv() {
}
function Cv() {
}
function Ov(e, t, r, n, a, i, s) {
  if (!e) return e;
  var f = t || {};
  n || (n = { "!id": {} });
  var c = f.dense ? [] : {}, o, l = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, h = !1, u = !1, x, g, d, p, w, y, v, N, T, I = [];
  f.biff = 12, f["!row"] = 0;
  var k = 0, U = !1, C = [], D = {}, M = f.supbooks || /*::(*/
  a.supbooks || [[]];
  if (M.sharedf = D, M.arrayf = C, M.SheetNames = a.SheetNames || a.Sheets.map(function(De) {
    return De.name;
  }), !f.supbooks && (f.supbooks = M, a.Names))
    for (var B = 0; B < a.Names.length; ++B) M[0][B + 1] = a.Names[B];
  var Y = [], he = [], W = !1;
  Ga[16] = { n: "BrtShortReal", f: el };
  var ee;
  if (jt(e, function(H, _e, Se) {
    if (!u)
      switch (Se) {
        case 148:
          o = H;
          break;
        case 0:
          x = H, f.sheetRows && f.sheetRows <= x.r && (u = !0), N = or(p = x.r), f["!row"] = x.r, (H.hidden || H.hpt || H.level != null) && (H.hpt && (H.hpx = ra(H.hpt)), he[H.r] = H);
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
              v = Ca[H[1]], g.v = v.t, g.r = v.r;
              break;
            case "b":
              g.v = !!H[1];
              break;
            case "e":
              g.v = H[1], f.cellText !== !1 && (g.w = Xt[g.v]);
              break;
            case "str":
              g.t = "s", g.v = H[1];
              break;
            case "is":
              g.t = "s", g.v = H[1].t;
              break;
          }
          if ((d = s.CellXf[H[0].iStyleRef]) && qo(g, d.numFmtId, null, f, i, s), w = H[0].c == -1 ? w + 1 : H[0].c, f.dense ? (c[p] || (c[p] = []), c[p][w] = g) : c[er(w) + N] = g, f.cellFormula) {
            for (U = !1, k = 0; k < C.length; ++k) {
              var O = C[k];
              x.r >= O[0].s.r && x.r <= O[0].e.r && w >= O[0].s.c && w <= O[0].e.c && (g.F = Ae(O[0]), U = !0);
            }
            !U && H.length > 3 && (g.f = H[3]);
          }
          if (l.s.r > x.r && (l.s.r = x.r), l.s.c > w && (l.s.c = w), l.e.r < x.r && (l.e.r = x.r), l.e.c < w && (l.e.c = w), f.cellDates && d && g.t == "n" && aa(Ee[d.numFmtId])) {
            var P = vn(g.v);
            P && (g.t = "d", g.v = new Date(P.y, P.m - 1, P.d, P.H, P.M, P.S, P.u));
          }
          ee && (ee.type == "XLDAPR" && (g.D = !0), ee = void 0);
          break;
        case 1:
        case 12:
          if (!f.sheetStubs || h) break;
          g = { t: "z", v: void 0 }, w = H[0].c == -1 ? w + 1 : H[0].c, f.dense ? (c[p] || (c[p] = []), c[p][w] = g) : c[er(w) + N] = g, l.s.r > x.r && (l.s.r = x.r), l.s.c > w && (l.s.c = w), l.e.r < x.r && (l.e.r = x.r), l.e.c < w && (l.e.c = w), ee && (ee.type == "XLDAPR" && (g.D = !0), ee = void 0);
          break;
        case 176:
          I.push(H);
          break;
        case 49:
          ee = ((f.xlmeta || {}).Cell || [])[H - 1];
          break;
        case 494:
          var R = n["!id"][H.relId];
          for (R ? (H.Target = R.Target, H.loc && (H.Target += "#" + H.loc), H.Rel = R) : H.relId == "" && (H.Target = "#" + H.loc), p = H.rfx.s.r; p <= H.rfx.e.r; ++p) for (w = H.rfx.s.c; w <= H.rfx.e.c; ++w)
            f.dense ? (c[p] || (c[p] = []), c[p][w] || (c[p][w] = { t: "z", v: void 0 }), c[p][w].l = H) : (y = ye({ c: w, r: p }), c[y] || (c[y] = { t: "z", v: void 0 }), c[y].l = H);
          break;
        case 426:
          if (!f.cellFormula) break;
          C.push(H), T = f.dense ? c[p][w] : c[er(w) + N], T.f = br(H[1], l, { r: x.r, c: w }, M, f), T.F = Ae(H[0]);
          break;
        case 427:
          if (!f.cellFormula) break;
          D[ye(H[0].s)] = H[1], T = f.dense ? c[p][w] : c[er(w) + N], T.f = br(H[1], l, { r: x.r, c: w }, M, f);
          break;
        case 60:
          if (!f.cellStyles) break;
          for (; H.e >= H.s; )
            Y[H.e--] = { width: H.w / 256, hidden: !!(H.flags & 1), level: H.level }, W || (W = !0, f0(H.w / 256)), an(Y[H.e + 1]);
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
  return I.length > 0 && (c["!merges"] = I), Y.length > 0 && (c["!cols"] = Y), he.length > 0 && (c["!rows"] = he), c;
}
function Iv(e, t, r, n, a, i, s) {
  if (t.v === void 0) return !1;
  var f = "";
  switch (t.t) {
    case "b":
      f = t.v ? "1" : "0";
      break;
    case "d":
      t = Je(t), t.z = t.z || Ee[14], t.v = pr(Ke(t.v)), t.t = "n";
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
  switch (c.s = un(a.cellXfs, t, a), t.l && i["!links"].push([ye(c), t.l]), t.c && i["!comments"].push([ye(c), t.c]), t.t) {
    case "s":
    case "str":
      return a.bookSST ? (f = u0(a.Strings, t.v, a.revStrings), c.t = "s", c.v = f, s ? re(e, 18, J2(t, c)) : re(e, 7, Y2(t, c))) : (c.t = "str", s ? re(e, 17, cv(t, c)) : re(e, 6, sv(t, c))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? s ? re(e, 13, nv(t, c)) : re(e, 2, rv(t, c)) : s ? re(e, 16, Q2(t, c)) : re(e, 5, Z2(t, c)), !0;
    case "b":
      return c.t = "b", s ? re(e, 15, V2(t, c)) : re(e, 4, W2(t, c)), !0;
    case "e":
      return c.t = "e", s ? re(e, 14, j2(t, c)) : re(e, 3, z2(t, c)), !0;
  }
  return s ? re(e, 12, M2(t, c)) : re(e, 1, L2(t, c)), !0;
}
function Nv(e, t, r, n) {
  var a = Me(t["!ref"] || "A1"), i, s = "", f = [];
  re(
    e,
    145
    /* BrtBeginSheetData */
  );
  var c = Array.isArray(t), o = a.e.r;
  t["!rows"] && (o = Math.max(a.e.r, t["!rows"].length - 1));
  for (var l = a.s.r; l <= o; ++l) {
    s = or(l), C2(e, t, a, l);
    var h = !1;
    if (l <= a.e.r) for (var u = a.s.c; u <= a.e.c; ++u) {
      l === a.s.r && (f[u] = er(u)), i = f[u] + s;
      var x = c ? (t[l] || [])[u] : t[i];
      if (!x) {
        h = !1;
        continue;
      }
      h = Iv(e, x, l, u, n, t, h);
    }
  }
  re(
    e,
    146
    /* BrtEndSheetData */
  );
}
function Bv(e, t) {
  !t || !t["!merges"] || (re(e, 177, gv(t["!merges"].length)), t["!merges"].forEach(function(r) {
    re(e, 176, dv(r));
  }), re(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function Dv(e, t) {
  !t || !t["!cols"] || (re(
    e,
    390
    /* BrtBeginColInfos */
  ), t["!cols"].forEach(function(r, n) {
    r && re(e, 60, Ev(n, r));
  }), re(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function Rv(e, t) {
  !t || !t["!ref"] || (re(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), re(e, 649, Av(Me(t["!ref"]))), re(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function Lv(e, t, r) {
  t["!links"].forEach(function(n) {
    if (n[1].Target) {
      var a = $e(r, -1, n[1].Target.replace(/#.*$/, ""), Ne.HLINK);
      re(e, 494, mv(n, a));
    }
  }), delete t["!links"];
}
function Pv(e, t, r, n) {
  if (t["!comments"].length > 0) {
    var a = $e(n, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", Ne.VML);
    re(e, 551, Qs("rId" + a)), t["!legacy"] = a;
  }
}
function Mv(e, t, r, n) {
  if (t["!autofilter"]) {
    var a = t["!autofilter"], i = typeof a.ref == "string" ? a.ref : Ae(a.ref);
    r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
    var s = r.Workbook.Names, f = Gr(i);
    f.s.r == f.e.r && (f.e.r = Gr(t["!ref"]).e.r, i = Ae(f));
    for (var c = 0; c < s.length; ++c) {
      var o = s[c];
      if (o.Name == "_xlnm._FilterDatabase" && o.Sheet == n) {
        o.Ref = "'" + r.SheetNames[n] + "'!" + i;
        break;
      }
    }
    c == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + i }), re(e, 161, fa(Me(i))), re(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function Uv(e, t, r) {
  re(
    e,
    133
    /* BrtBeginWsViews */
  ), re(e, 137, kv(t, r)), re(
    e,
    138
    /* BrtEndWsView */
  ), re(
    e,
    134
    /* BrtEndWsViews */
  );
}
function Wv(e, t) {
  t["!protect"] && re(e, 535, Fv(t["!protect"]));
}
function Hv(e, t, r, n) {
  var a = zr(), i = r.SheetNames[e], s = r.Sheets[i] || {}, f = i;
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
  ), (r.vbaraw || s["!outline"]) && re(a, 147, D2(f, s["!outline"])), re(a, 148, I2(c)), Uv(a, s, r.Workbook), Dv(a, s), Nv(a, s, e, t), Wv(a, s), Mv(a, s, r, e), Bv(a, s), Lv(a, s, n), s["!margins"] && re(a, 476, Tv(s["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && Rv(a, s), Pv(a, s, e, n), re(
    a,
    130
    /* BrtEndSheet */
  ), a.end();
}
function Vv(e) {
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
function $v(e, t, r, n, a, i) {
  var s = i || { "!type": "chart" };
  if (!e) return i;
  var f = 0, c = 0, o = "A", l = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } };
  return (e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm) || []).forEach(function(h) {
    var u = Vv(h);
    l.s.r = l.s.c = 0, l.e.c = f, o = er(f), u[0].forEach(function(x, g) {
      s[o + or(g)] = { t: "n", v: x, z: u[1] }, c = g;
    }), l.e.r < c && (l.e.r = c), ++f;
  }), f > 0 && (s["!ref"] = Ae(l)), s;
}
function zv(e, t, r, n, a) {
  if (!e) return e;
  n || (n = { "!id": {} });
  var i = { "!type": "chart", "!drawel": null, "!rel": "" }, s, f = e.match(Zo);
  return f && x0(f[0], i, a, r), (s = e.match(/drawing r:id="(.*?)"/)) && (i["!rel"] = s[1]), n["!id"][i["!rel"]] && (i["!drawel"] = n["!id"][i["!rel"]]), i;
}
function Gv(e, t) {
  e.l += 10;
  var r = Nr(e);
  return { name: r };
}
function jv(e, t, r, n, a) {
  if (!e) return e;
  n || (n = { "!id": {} });
  var i = { "!type": "chart", "!drawel": null, "!rel": "" }, s = !1;
  return jt(e, function(c, o, l) {
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
var d0 = [
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
], Xv = [
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
], Yv = [
  //['state', 'visible']
], Kv = [
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
function Rf(e, t) {
  for (var r = 0; r != e.length; ++r)
    for (var n = e[r], a = 0; a != t.length; ++a) {
      var i = t[a];
      if (n[i[0]] == null) n[i[0]] = i[1];
      else switch (i[2]) {
        case "bool":
          typeof n[i[0]] == "string" && (n[i[0]] = Ye(n[i[0]]));
          break;
        case "int":
          typeof n[i[0]] == "string" && (n[i[0]] = parseInt(n[i[0]], 10));
          break;
      }
    }
}
function Lf(e, t) {
  for (var r = 0; r != t.length; ++r) {
    var n = t[r];
    if (e[n[0]] == null) e[n[0]] = n[1];
    else switch (n[2]) {
      case "bool":
        typeof e[n[0]] == "string" && (e[n[0]] = Ye(e[n[0]]));
        break;
      case "int":
        typeof e[n[0]] == "string" && (e[n[0]] = parseInt(e[n[0]], 10));
        break;
    }
  }
}
function tl(e) {
  Lf(e.WBProps, d0), Lf(e.CalcPr, Kv), Rf(e.WBView, Xv), Rf(e.Sheets, Yv), Zn.date1904 = Ye(e.WBProps.date1904);
}
function Jv(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : Ye(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var qv = /* @__PURE__ */ "][*?/\\".split("");
function nl(e, t) {
  if (e.length > 31)
    throw new Error("Sheet names cannot exceed 31 chars");
  var r = !0;
  return qv.forEach(function(n) {
    if (e.indexOf(n) != -1)
      throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
  }), r;
}
function Zv(e, t, r) {
  e.forEach(function(n, a) {
    nl(n);
    for (var i = 0; i < a; ++i) if (n == e[i]) throw new Error("Duplicate Sheet Name: " + n);
    if (r) {
      var s = t && t[a] && t[a].CodeName || n;
      if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function Qv(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  Zv(e.SheetNames, t, !!e.vbaraw);
  for (var r = 0; r < e.SheetNames.length; ++r) Jm(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r);
}
var ew = /<\w+:workbook/;
function rw(e, t) {
  if (!e) throw new Error("Could not find file");
  var r = (
    /*::(*/
    { AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, Names: [], xmlns: "" }
  ), n = !1, a = "xmlns", i = {}, s = 0;
  if (e.replace(Dr, function(c, o) {
    var l = Te(c);
    switch (Ct(l[0])) {
      case "<?xml":
        break;
      case "<workbook":
        c.match(ew) && (a = "xmlns" + c.match(/<(\w+):/)[1]), r.xmlns = l[a];
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
        d0.forEach(function(h) {
          if (l[h[0]] != null)
            switch (h[2]) {
              case "bool":
                r.WBProps[h[0]] = Ye(l[h[0]]);
                break;
              case "int":
                r.WBProps[h[0]] = parseInt(l[h[0]], 10);
                break;
              default:
                r.WBProps[h[0]] = l[h[0]];
            }
        }), l.codeName && (r.WBProps.CodeName = Ge(l.codeName));
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
        delete l.state, l.name = Pe(Ge(l.name)), delete l[0], r.Sheets.push(l);
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
        i = {}, i.Name = Ge(l.name), l.comment && (i.Comment = l.comment), l.localSheetId && (i.Sheet = +l.localSheetId), Ye(l.hidden || "0") && (i.Hidden = !0), s = o + c.length;
        break;
      case "</definedName>":
        i.Ref = Pe(Ge(e.slice(s, o))), r.Names.push(i);
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
  }), In.indexOf(r.xmlns) === -1) throw new Error("Unknown Namespace: " + r.xmlns);
  return tl(r), r;
}
function al(e) {
  var t = [lr];
  t[t.length] = oe("workbook", null, {
    xmlns: In[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": gr.r
  });
  var r = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (d0.forEach(function(f) {
    e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (n[f[0]] = e.Workbook.WBProps[f[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), t[t.length] = oe("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: ze(e.SheetNames[i].slice(0, 31)) };
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
    f.Comment && (c.comment = f.Comment), f.Sheet != null && (c.localSheetId = "" + f.Sheet), f.Hidden && (c.hidden = "1"), f.Ref && (t[t.length] = oe("definedName", ze(f.Ref), c));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function tw(e, t) {
  var r = {};
  return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = ys(e), r.name = Nr(e), r;
}
function nw(e, t) {
  return t || (t = q(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), Qs(e.strRelID, t), wr(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}
function aw(e, t) {
  var r = {}, n = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var a = t > 8 ? Nr(e) : "";
  return a.length > 0 && (r.CodeName = a), r.autoCompressPictures = !!(n & 65536), r.backupFile = !!(n & 64), r.checkCompatibility = !!(n & 4096), r.date1904 = !!(n & 1), r.filterPrivacy = !!(n & 8), r.hidePivotFieldList = !!(n & 1024), r.promptedSolutions = !!(n & 16), r.publishItems = !!(n & 2048), r.refreshAllConnections = !!(n & 262144), r.saveExternalLinkValues = !!(n & 128), r.showBorderUnselectedTables = !!(n & 4), r.showInkAnnotation = !!(n & 32), r.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], r.showPivotChartFilter = !!(n & 32768), r.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], r;
}
function iw(e, t) {
  t || (t = q(72));
  var r = 0;
  return e && e.filterPrivacy && (r |= 8), t.write_shift(4, r), t.write_shift(4, 0), Yc(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}
function sw(e, t) {
  var r = {};
  return e.read_shift(4), r.ArchID = e.read_shift(4), e.l += t - 8, r;
}
function fw(e, t, r) {
  var n = e.l + t;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = Pu(e), s = zm(e, 0, r), f = Zs(e);
  e.l = n;
  var c = { Name: i, Ptg: s };
  return a < 268435455 && (c.Sheet = a), f && (c.Comment = f), c;
}
function cw(e, t) {
  var r = { AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, xmlns: "" }, n = [], a = !1;
  t || (t = {}), t.biff = 12;
  var i = [], s = [[]];
  return s.SheetNames = [], s.XTI = [], Ga[16] = { n: "BrtFRTArchID$", f: sw }, jt(e, function(c, o, l) {
    switch (l) {
      case 156:
        s.SheetNames.push(c.name), r.Sheets.push(c);
        break;
      case 153:
        r.WBProps = c;
        break;
      case 39:
        c.Sheet != null && (t.SID = c.Sheet), c.Ref = br(c.Ptg, null, null, s, t), delete t.SID, delete c.Ptg, i.push(c);
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
  }, t), tl(r), r.Names = i, r.supbooks = s, r;
}
function ow(e, t) {
  re(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var r = 0; r != t.SheetNames.length; ++r) {
    var n = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[r] && t.Workbook.Sheets[r].Hidden || 0, a = { Hidden: n, iTabID: r + 1, strRelID: "rId" + (r + 1), name: t.SheetNames[r] };
    re(e, 156, nw(a));
  }
  re(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function lw(e, t) {
  t || (t = q(127));
  for (var r = 0; r != 4; ++r) t.write_shift(4, 0);
  return wr("SheetJS", t), wr(yi.version, t), wr(yi.version, t), wr("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function hw(e, t) {
  t || (t = q(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var r = 120;
  return t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t;
}
function uw(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var r = t.Workbook.Sheets, n = 0, a = -1, i = -1; n < r.length; ++n)
      !r[n] || !r[n].Hidden && a == -1 ? a = n : r[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (re(
      e,
      135
      /* BrtBeginBookViews */
    ), re(e, 158, hw(a)), re(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function xw(e, t) {
  var r = zr();
  return re(
    r,
    131
    /* BrtBeginBook */
  ), re(r, 128, lw()), re(r, 153, iw(e.Workbook && e.Workbook.WBProps || null)), uw(r, e), ow(r, e), re(
    r,
    132
    /* BrtEndBook */
  ), r.end();
}
function dw(e, t, r) {
  return t.slice(-4) === ".bin" ? cw(e, r) : rw(e, r);
}
function gw(e, t, r, n, a, i, s, f) {
  return t.slice(-4) === ".bin" ? Ov(e, n, r, a, i, s, f) : f2(e, n, r, a, i, s, f);
}
function pw(e, t, r, n, a, i, s, f) {
  return t.slice(-4) === ".bin" ? jv(e, n, r, a, i) : zv(e, n, r, a, i);
}
function mw(e, t, r, n, a, i, s, f) {
  return t.slice(-4) === ".bin" ? wp() : _p();
}
function vw(e, t, r, n, a, i, s, f) {
  return t.slice(-4) === ".bin" ? mp() : vp();
}
function ww(e, t, r, n) {
  return t.slice(-4) === ".bin" ? dg(e, r, n) : tg(e, r, n);
}
function _w(e, t, r) {
  return Mo(e, r);
}
function Ew(e, t, r) {
  return t.slice(-4) === ".bin" ? Ed(e, r) : vd(e, r);
}
function yw(e, t, r) {
  return t.slice(-4) === ".bin" ? up(e, r) : np(e, r);
}
function Tw(e, t, r) {
  return t.slice(-4) === ".bin" ? ep(e) : Zg(e);
}
function Sw(e, t, r, n) {
  return r.slice(-4) === ".bin" ? rp(e, t, r, n) : void 0;
}
function kw(e, t, r) {
  return t.slice(-4) === ".bin" ? Kg(e, t, r) : qg(e, t, r);
}
function Aw(e, t, r) {
  return (t.slice(-4) === ".bin" ? xw : al)(e);
}
function Fw(e, t, r, n, a) {
  return (t.slice(-4) === ".bin" ? Hv : Qo)(e, r, n, a);
}
function bw(e, t, r) {
  return (t.slice(-4) === ".bin" ? Sg : Lo)(e, r);
}
function Cw(e, t, r) {
  return (t.slice(-4) === ".bin" ? Sd : bo)(e, r);
}
function Ow(e, t, r) {
  return (t.slice(-4) === ".bin" ? xp : Ho)(e);
}
function Iw(e) {
  return (e.slice(-4) === ".bin" ? Jg : Uo)();
}
var il = /([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g, sl = /([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;
function dt(e, t) {
  var r = e.split(/\s+/), n = [];
  if (n[0] = r[0], r.length === 1) return n;
  var a = e.match(il), i, s, f, c;
  if (a) for (c = 0; c != a.length; ++c)
    i = a[c].match(sl), (s = i[1].indexOf(":")) === -1 ? n[i[1]] = i[2].slice(1, i[2].length - 1) : (i[1].slice(0, 6) === "xmlns:" ? f = "xmlns" + i[1].slice(6) : f = i[1].slice(s + 1), n[f] = i[2].slice(1, i[2].length - 1));
  return n;
}
function Nw(e) {
  var t = e.split(/\s+/), r = {};
  if (t.length === 1) return r;
  var n = e.match(il), a, i, s, f;
  if (n) for (f = 0; f != n.length; ++f)
    a = n[f].match(sl), (i = a[1].indexOf(":")) === -1 ? r[a[1]] = a[2].slice(1, a[2].length - 1) : (a[1].slice(0, 6) === "xmlns:" ? s = "xmlns" + a[1].slice(6) : s = a[1].slice(i + 1), r[s] = a[2].slice(1, a[2].length - 1));
  return r;
}
var Ia;
function Bw(e, t) {
  var r = Ia[e] || Pe(e);
  return r === "General" ? Sn(t) : ut(r, t);
}
function Dw(e, t, r, n) {
  var a = n;
  switch ((r[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
    case "boolean":
      a = Ye(n);
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
      a = Ke(n);
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
function Rw(e, t, r) {
  if (e.t !== "z") {
    if (!r || r.cellText !== !1) try {
      e.t === "e" ? e.w = e.w || Xt[e.v] : t === "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = La(e.v) : e.w = Sn(e.v) : e.w = Bw(t || "General", e.v);
    } catch (i) {
      if (r.WTF) throw i;
    }
    try {
      var n = Ia[t] || t || "General";
      if (r.cellNF && (e.z = n), r.cellDates && e.t == "n" && aa(n)) {
        var a = vn(e.v);
        a && (e.t = "d", e.v = new Date(a.y, a.m - 1, a.d, a.H, a.M, a.S, a.u));
      }
    } catch (i) {
      if (r.WTF) throw i;
    }
  }
}
function Lw(e, t, r) {
  if (r.cellStyles && t.Interior) {
    var n = t.Interior;
    n.Pattern && (n.patternType = Yd[n.Pattern] || n.Pattern);
  }
  e[t.ID] = t;
}
function Pw(e, t, r, n, a, i, s, f, c, o) {
  var l = "General", h = n.StyleID, u = {};
  o = o || {};
  var x = [], g = 0;
  for (h === void 0 && f && (h = f.StyleID), h === void 0 && s && (h = s.StyleID); i[h] !== void 0 && (i[h].nf && (l = i[h].nf), i[h].Interior && x.push(i[h].Interior), !!i[h].Parent); )
    h = i[h].Parent;
  switch (r.Type) {
    case "Boolean":
      n.t = "b", n.v = Ye(e);
      break;
    case "String":
      n.t = "s", n.r = Z0(Pe(e)), n.v = e.indexOf("<") > -1 ? Pe(t || e).replace(/<.*?>/g, "") : n.r;
      break;
    case "DateTime":
      e.slice(-1) != "Z" && (e += "Z"), n.v = (Ke(e) - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1e3), n.v !== n.v ? n.v = Pe(e) : n.v < 60 && (n.v = n.v - 1), (!l || l == "General") && (l = "yyyy-mm-dd");
    case "Number":
      n.v === void 0 && (n.v = +e), n.t || (n.t = "n");
      break;
    case "Error":
      n.t = "e", n.v = Qc[e], o.cellText !== !1 && (n.w = e);
      break;
    default:
      e == "" && t == "" ? n.t = "z" : (n.t = "s", n.v = Z0(t || e));
      break;
  }
  if (Rw(n, l, o), o.cellFormula !== !1)
    if (n.Formula) {
      var d = Pe(n.Formula);
      d.charCodeAt(0) == 61 && (d = d.slice(1)), n.f = qn(d, a), delete n.Formula, n.ArrayRange == "RC" ? n.F = qn("RC:RC", a) : n.ArrayRange && (n.F = qn(n.ArrayRange, a), c.push([Me(n.F), n.F]));
    } else
      for (g = 0; g < c.length; ++g)
        a.r >= c[g][0].s.r && a.r <= c[g][0].e.r && a.c >= c[g][0].s.c && a.c <= c[g][0].e.c && (n.F = c[g][1]);
  o.cellStyles && (x.forEach(function(p) {
    !u.patternType && p.patternType && (u.patternType = p.patternType);
  }), n.s = u), n.StyleID !== void 0 && (n.ixfe = n.StyleID);
}
function Mw(e) {
  e.t = e.v || "", e.t = e.t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), e.v = e.w = e.ixfe = void 0;
}
function os(e, t) {
  var r = t || {};
  ia();
  var n = Ea(js(e));
  (r.type == "binary" || r.type == "array" || r.type == "base64") && (n = Ge(n));
  var a = n.slice(0, 1024).toLowerCase(), i = !1;
  if (a = a.replace(/".*?"/g, ""), (a.indexOf(">") & 1023) > Math.min(a.indexOf(",") & 1023, a.indexOf(";") & 1023)) {
    var s = Je(r);
    return s.type = "string", ea.to_workbook(n, s);
  }
  if (a.indexOf("<?xml") == -1 && ["html", "table", "head", "meta", "script", "style", "div"].forEach(function(ir) {
    a.indexOf("<" + ir) >= 0 && (i = !0);
  }), i) return T_(n, r);
  Ia = {
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
  var f, c = [], o, l = {}, h = [], u = r.dense ? [] : {}, x = "", g = {}, d = {}, p = dt('<Data ss:Type="String">'), w = 0, y = 0, v = 0, N = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, T = {}, I = {}, k = "", U = 0, C = [], D = {}, M = {}, B = 0, Y = [], he = [], W = {}, ee = [], ne, De = !1, H = [], _e = [], Se = {}, O = 0, P = 0, R = { Sheets: [], WBProps: { date1904: !1 } }, L = {};
  Ua.lastIndex = 0, n = n.replace(/<!--([\s\S]*?)-->/mg, "");
  for (var Q = ""; f = Ua.exec(n); ) switch (f[3] = (Q = f[3]).toLowerCase()) {
    case "data":
      if (Q == "data") {
        if (f[1] === "/") {
          if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"));
        } else f[0].charAt(f[0].length - 2) !== "/" && c.push([f[3], !0]);
        break;
      }
      if (c[c.length - 1][1]) break;
      f[1] === "/" ? Pw(n.slice(w, f.index), k, p, c[c.length - 1][0] == /*"Comment"*/
      "comment" ? W : g, { c: y, r: v }, T, ee[y], d, H, r) : (k = "", p = dt(f[0]), w = f.index + f[0].length);
      break;
    case "cell":
      if (f[1] === "/")
        if (he.length > 0 && (g.c = he), (!r.sheetRows || r.sheetRows > v) && g.v !== void 0 && (r.dense ? (u[v] || (u[v] = []), u[v][y] = g) : u[er(y) + or(v)] = g), g.HRef && (g.l = { Target: Pe(g.HRef) }, g.HRefScreenTip && (g.l.Tooltip = g.HRefScreenTip), delete g.HRef, delete g.HRefScreenTip), (g.MergeAcross || g.MergeDown) && (O = y + (parseInt(g.MergeAcross, 10) | 0), P = v + (parseInt(g.MergeDown, 10) | 0), C.push({ s: { c: y, r: v }, e: { c: O, r: P } })), !r.sheetStubs)
          g.MergeAcross ? y = O + 1 : ++y;
        else if (g.MergeAcross || g.MergeDown) {
          for (var fe = y; fe <= O; ++fe)
            for (var ce = v; ce <= P; ++ce)
              (fe > y || ce > v) && (r.dense ? (u[ce] || (u[ce] = []), u[ce][fe] = { t: "z" }) : u[er(fe) + or(ce)] = { t: "z" });
          y = O + 1;
        } else ++y;
      else
        g = Nw(f[0]), g.Index && (y = +g.Index - 1), y < N.s.c && (N.s.c = y), y > N.e.c && (N.e.c = y), f[0].slice(-2) === "/>" && ++y, he = [];
      break;
    case "row":
      f[1] === "/" || f[0].slice(-2) === "/>" ? (v < N.s.r && (N.s.r = v), v > N.e.r && (N.e.r = v), f[0].slice(-2) === "/>" && (d = dt(f[0]), d.Index && (v = +d.Index - 1)), y = 0, ++v) : (d = dt(f[0]), d.Index && (v = +d.Index - 1), Se = {}, (d.AutoFitHeight == "0" || d.Height) && (Se.hpx = parseInt(d.Height, 10), Se.hpt = za(Se.hpx), _e[v] = Se), d.Hidden == "1" && (Se.hidden = !0, _e[v] = Se));
      break;
    case "worksheet":
      if (f[1] === "/") {
        if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"));
        h.push(x), N.s.r <= N.e.r && N.s.c <= N.e.c && (u["!ref"] = Ae(N), r.sheetRows && r.sheetRows <= N.e.r && (u["!fullref"] = u["!ref"], N.e.r = r.sheetRows - 1, u["!ref"] = Ae(N))), C.length && (u["!merges"] = C), ee.length > 0 && (u["!cols"] = ee), _e.length > 0 && (u["!rows"] = _e), l[x] = u;
      } else
        N = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, v = y = 0, c.push([f[3], !1]), o = dt(f[0]), x = Pe(o.Name), u = r.dense ? [] : {}, C = [], H = [], _e = [], L = { name: x, Hidden: 0 }, R.Sheets.push(L);
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
      f[1] === "/" ? Lw(T, I, r) : I = dt(f[0]);
      break;
    case "numberformat":
      I.nf = Pe(dt(f[0]).Format || "General"), Ia[I.nf] && (I.nf = Ia[I.nf]);
      for (var ie = 0; ie != 392 && Ee[ie] != I.nf; ++ie) ;
      if (ie == 392) {
        for (ie = 57; ie != 392; ++ie) if (Ee[ie] == null) {
          Wt(I.nf, ie);
          break;
        }
      }
      break;
    case "column":
      if (c[c.length - 1][0] !== /*'Table'*/
      "table") break;
      if (ne = dt(f[0]), ne.Hidden && (ne.hidden = !0, delete ne.Hidden), ne.Width && (ne.wpx = parseInt(ne.Width, 10)), !De && ne.wpx > 10) {
        De = !0, Cr = Do;
        for (var te = 0; te < ee.length; ++te) ee[te] && an(ee[te]);
      }
      De && an(ne), ee[ne.Index - 1 || ee.length] = ne;
      for (var be = 0; be < +ne.Span; ++be) ee[ee.length] = Je(ne);
      break;
    case "namedrange":
      if (f[1] === "/") break;
      R.Names || (R.Names = []);
      var b = Te(f[0]), Xe = {
        Name: b.Name,
        Ref: qn(b.RefersTo.slice(1), { r: 0, c: 0 })
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
      I.Interior = dt(f[0]);
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
      f[1] === "/" ? c1(D, Q, n.slice(B, f.index)) : B = f.index + f[0].length;
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
        Mw(W), he.push(W);
      } else
        c.push([f[3], !1]), o = dt(f[0]), W = { a: o.Author };
      break;
    case "autofilter":
      if (f[1] === "/") {
        if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"));
      } else if (f[0].charAt(f[0].length - 2) !== "/") {
        var Re = dt(f[0]);
        u["!autofilter"] = { ref: qn(Re.Range).replace(/\$/g, "") }, c.push([f[3], !0]);
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
      if (c.length == 0 && f[3] == "document" || c.length == 0 && f[3] == "uof") return Hf(n, r);
      var je = !0;
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
              je = !1;
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
              je = !1;
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
              je = !1;
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
              je = !1;
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
              u["!margins"] || Tn(u["!margins"] = {}, "xlml"), isNaN(+Te(f[0]).Margin) || (u["!margins"].header = +Te(f[0]).Margin);
              break;
            case "footer":
              u["!margins"] || Tn(u["!margins"] = {}, "xlml"), isNaN(+Te(f[0]).Margin) || (u["!margins"].footer = +Te(f[0]).Margin);
              break;
            case "pagemargins":
              var Be = Te(f[0]);
              u["!margins"] || Tn(u["!margins"] = {}, "xlml"), isNaN(+Be.Top) || (u["!margins"].top = +Be.Top), isNaN(+Be.Left) || (u["!margins"].left = +Be.Left), isNaN(+Be.Right) || (u["!margins"].right = +Be.Right), isNaN(+Be.Bottom) || (u["!margins"].bottom = +Be.Bottom);
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
              je = !1;
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
              je = !1;
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
              je = !1;
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
              je = !1;
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
              je = !1;
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
              je = !1;
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
              je = !1;
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
              je = !1;
          }
          break;
        case "smarttags":
          break;
        default:
          je = !1;
          break;
      }
      if (je || f[3].match(/!\[CDATA/)) break;
      if (!c[c.length - 1][1]) throw "Unrecognized tag: " + f[3] + "|" + c.join("|");
      if (c[c.length - 1][0] === /*'CustomDocumentProperties'*/
      "customdocumentproperties") {
        if (f[0].slice(-2) === "/>") break;
        f[1] === "/" ? Dw(M, Q, Y, n.slice(B, f.index)) : (Y = f, B = f.index + f[0].length);
        break;
      }
      if (r.WTF) throw "Unrecognized tag: " + f[3] + "|" + c.join("|");
  }
  var xe = {};
  return !r.bookSheets && !r.bookProps && (xe.Sheets = l), xe.SheetNames = h, xe.Workbook = R, xe.SSF = Je(Ee), xe.Props = D, xe.Custprops = M, xe;
}
function Cs(e, t) {
  switch (p0(t = t || {}), t.type || "base64") {
    case "base64":
      return os(Zr(e), t);
    case "binary":
    case "buffer":
    case "file":
      return os(e, t);
    case "array":
      return os(ln(e), t);
  }
}
function Uw(e, t) {
  var r = [];
  return e.Props && r.push(o1(e.Props, t)), e.Custprops && r.push(l1(e.Props, e.Custprops)), r.join("");
}
function Ww() {
  return "";
}
function Hw(e, t) {
  var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(oe("NumberFormat", null, { "ss:Format": ze(Ee[n.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + a) }
    );
    r.push(oe("Style", i.join(""), s));
  }), oe("Styles", r.join(""));
}
function fl(e) {
  return oe("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + l0(e.Ref, { r: 0, c: 0 }) });
}
function Vw(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var t = e.Workbook.Names, r = [], n = 0; n < t.length; ++n) {
    var a = t[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || r.push(fl(a)));
  }
  return oe("Names", r.join(""));
}
function $w(e, t, r, n) {
  if (!e || !((n || {}).Workbook || {}).Names) return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var f = a[s];
    f.Sheet == r && (f.Name.match(/^_xlfn\./) || i.push(fl(f)));
  }
  return i.join("");
}
function zw(e, t, r, n) {
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
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(yr("ProtectContents", "True")), e["!protect"].objects && a.push(yr("ProtectObjects", "True")), e["!protect"].scenarios && a.push(yr("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(yr("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(yr("EnableSelection", "UnlockedCells")), [
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
  })), a.length == 0 ? "" : oe("WorksheetOptions", a.join(""), { xmlns: Yr.x });
}
function Gw(e) {
  return e.map(function(t) {
    var r = uu(t.t || ""), n = oe("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return oe("Comment", n, { "ss:Author": t.a });
  }).join("");
}
function jw(e, t, r, n, a, i, s) {
  if (!e || e.v == null && e.f == null) return "";
  var f = {};
  if (e.f && (f["ss:Formula"] = "=" + ze(l0(e.f, s))), e.F && e.F.slice(0, t.length) == t) {
    var c = rr(e.F.slice(t.length + 1));
    f["ss:ArrayRange"] = "RC:R" + (c.r == s.r ? "" : "[" + (c.r - s.r) + "]") + "C" + (c.c == s.c ? "" : "[" + (c.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (f["ss:HRef"] = ze(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = ze(e.l.Tooltip))), r["!merges"])
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
      h = "Error", u = Xt[e.v];
      break;
    case "d":
      h = "DateTime", u = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Ee[14]);
      break;
    case "s":
      h = "String", u = hu(e.v || "");
      break;
  }
  var x = un(n.cellXfs, e, n);
  f["ss:StyleID"] = "s" + (21 + x), f["ss:Index"] = s.c + 1;
  var g = e.v != null ? u : "", d = e.t == "z" ? "" : '<Data ss:Type="' + h + '">' + g + "</Data>";
  return (e.c || []).length > 0 && (d += Gw(e.c)), oe("Cell", d, f);
}
function Xw(e, t) {
  var r = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = ra(t.hpt)), t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (r += ' ss:Hidden="1"')), r + ">";
}
function Yw(e, t, r, n) {
  if (!e["!ref"]) return "";
  var a = Me(e["!ref"]), i = e["!merges"] || [], s = 0, f = [];
  e["!cols"] && e["!cols"].forEach(function(p, w) {
    an(p);
    var y = !!p.width, v = ji(w, p), N = { "ss:Index": w + 1 };
    y && (N["ss:Width"] = Va(v.width)), p.hidden && (N["ss:Hidden"] = "1"), f.push(oe("Column", null, N));
  });
  for (var c = Array.isArray(e), o = a.s.r; o <= a.e.r; ++o) {
    for (var l = [Xw(o, (e["!rows"] || [])[o])], h = a.s.c; h <= a.e.c; ++h) {
      var u = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > h) && !(i[s].s.r > o) && !(i[s].e.c < h) && !(i[s].e.r < o)) {
          (i[s].s.c != h || i[s].s.r != o) && (u = !0);
          break;
        }
      if (!u) {
        var x = { r: o, c: h }, g = ye(x), d = c ? (e[o] || [])[h] : e[g];
        l.push(jw(d, g, e, t, r, n, x));
      }
    }
    l.push("</Row>"), l.length > 2 && f.push(l.join(""));
  }
  return f.join("");
}
function Kw(e, t, r) {
  var n = [], a = r.SheetNames[e], i = r.Sheets[a], s = i ? $w(i, t, e, r) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? Yw(i, t, e, r) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(zw(i, t, e, r)), n.join("");
}
function Jw(e, t) {
  t || (t = {}), e.SSF || (e.SSF = Je(Ee)), e.SSF && (ia(), Ui(e.SSF), t.revssf = Hi(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], un(t.cellXfs, {}, { revssf: { General: 0 } }));
  var r = [];
  r.push(Uw(e, t)), r.push(Ww()), r.push(""), r.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    r.push(oe("Worksheet", Kw(n, t, e), { "ss:Name": ze(e.SheetNames[n]) }));
  return r[2] = Hw(e, t), r[3] = Vw(e), lr + oe("Workbook", r.join(""), {
    xmlns: Yr.ss,
    "xmlns:o": Yr.o,
    "xmlns:x": Yr.x,
    "xmlns:ss": Yr.ss,
    "xmlns:dt": Yr.dt,
    "xmlns:html": Yr.html
  });
}
function qw(e) {
  var t = {}, r = e.content;
  if (r.l = 28, t.AnsiUserType = r.read_shift(0, "lpstr-ansi"), t.AnsiClipboardFormat = Vu(r), r.length - r.l <= 4) return t;
  var n = r.read_shift(4);
  if (n == 0 || n > 40 || (r.l -= 4, t.Reserved1 = r.read_shift(0, "lpstr-ansi"), r.length - r.l <= 4) || (n = r.read_shift(4), n !== 1907505652) || (t.UnicodeClipboardFormat = $u(r), n = r.read_shift(4), n == 0 || n > 40)) return t;
  r.l -= 4, t.Reserved2 = r.read_shift(0, "lpwstr");
}
var Zw = [60, 1084, 2066, 2165, 2175];
function Qw(e, t, r, n, a) {
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
  for (var c = Mt(r, r.l), o = Os[c], l = 0; o != null && Zw.indexOf(c) > -1; )
    i = Mt(r, r.l + 2), l = r.l + 4, c == 2066 ? l += 4 : (c == 2165 || c == 2175) && (l += 12), f = r.slice(l, r.l + 4 + i), s.push(f), r.l += 4 + i, o = Os[c = Mt(r, r.l)];
  var h = vr(s);
  Er(h, 0);
  var u = 0;
  h.lens = [];
  for (var x = 0; x < s.length; ++x)
    h.lens.push(u), u += s[x].length;
  if (h.length < n) throw "XLS Record 0x" + e.toString(16) + " Truncated: " + h.length + " < " + n;
  return t.f(h, h.length, a);
}
function kt(e, t, r) {
  if (e.t !== "z" && e.XF) {
    var n = 0;
    try {
      n = e.z || e.XF.numFmtId || 0, t.cellNF && (e.z = Ee[n]);
    } catch (i) {
      if (t.WTF) throw i;
    }
    if (!t || t.cellText !== !1) try {
      e.t === "e" ? e.w = e.w || Xt[e.v] : n === 0 || n == "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = La(e.v) : e.w = Sn(e.v) : e.w = ut(n, e.v, { date1904: !!r, dateNF: t && t.dateNF });
    } catch (i) {
      if (t.WTF) throw i;
    }
    if (t.cellDates && n && e.t == "n" && aa(Ee[n] || String(n))) {
      var a = vn(e.v);
      a && (e.t = "d", e.v = new Date(a.y, a.m - 1, a.d, a.H, a.M, a.S, a.u));
    }
  }
}
function mi(e, t, r) {
  return { v: e, ixfe: t, t: r };
}
function e_(e, t) {
  var r = { opts: {} }, n = {}, a = t.dense ? [] : {}, i = {}, s = {}, f = null, c = [], o = "", l = {}, h, u = "", x, g, d, p, w = {}, y = [], v, N, T = [], I = [], k = { Sheets: [], WBProps: { date1904: !1 }, Views: [{}] }, U = {}, C = function(Oe) {
    return Oe < 8 ? _n[Oe] : Oe < 64 && I[Oe - 8] || _n[Oe];
  }, D = function(Oe, sr, tt) {
    var dr = sr.XF.data;
    if (!(!dr || !dr.patternType || !tt || !tt.cellStyles)) {
      sr.s = {}, sr.s.patternType = dr.patternType;
      var xn;
      (xn = Ha(C(dr.icvFore))) && (sr.s.fgColor = { rgb: xn }), (xn = Ha(C(dr.icvBack))) && (sr.s.bgColor = { rgb: xn });
    }
  }, M = function(Oe, sr, tt) {
    if (!(Se > 1) && !(tt.sheetRows && Oe.r >= tt.sheetRows)) {
      if (tt.cellStyles && sr.XF && sr.XF.data && D(Oe, sr, tt), delete sr.ixfe, delete sr.XF, h = Oe, u = ye(Oe), (!s || !s.s || !s.e) && (s = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }), Oe.r < s.s.r && (s.s.r = Oe.r), Oe.c < s.s.c && (s.s.c = Oe.c), Oe.r + 1 > s.e.r && (s.e.r = Oe.r + 1), Oe.c + 1 > s.e.c && (s.e.c = Oe.c + 1), tt.cellFormula && sr.f) {
        for (var dr = 0; dr < y.length; ++dr)
          if (!(y[dr][0].s.c > Oe.c || y[dr][0].s.r > Oe.r) && !(y[dr][0].e.c < Oe.c || y[dr][0].e.r < Oe.r)) {
            sr.F = Ae(y[dr][0]), (y[dr][0].s.c != Oe.c || y[dr][0].s.r != Oe.r) && delete sr.f, sr.f && (sr.f = "" + br(y[dr][1], s, Oe, H, B));
            break;
          }
      }
      tt.dense ? (a[Oe.r] || (a[Oe.r] = []), a[Oe.r][Oe.c] = sr) : a[u] = sr;
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
  B.codepage = 1200, vt(1200);
  for (var Q = !1; e.l < e.length - 1; ) {
    var fe = e.l, ce = e.read_shift(2);
    if (ce === 0 && _e === 10) break;
    var ie = e.l === e.length ? 0 : e.read_shift(2), te = Os[ce];
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
      Qw(ce, te, e, ie, B), Se == 0 && [9, 521, 1033, 2057].indexOf(_e) === -1) continue;
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
          vt(B.codepage = Xe), Q = !0;
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
            Ref: br(b.rgce, s, null, H, B)
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
            }[b.BIFFVer] || 8), B.biffguess = b.BIFFVer == 0, b.BIFFVer == 0 && b.dt == 4096 && (B.biff = 5, Q = !0, vt(B.codepage = 28591)), B.biff == 8 && b.BIFFVer == 0 && b.dt == 16 && (B.biff = 2), Se++) break;
            if (a = t.dense ? [] : {}, B.biff < 8 && !Q && (Q = !0, vt(B.codepage = t.codepage || 1252)), B.biff < 5 || b.BIFFVer == 0 && b.dt == 4096) {
              o === "" && (o = "Sheet1"), s = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
              var je = { pos: e.l - ie, name: o };
              i[je.pos] = je, B.snames.push(o);
            } else o = (i[fe] || { name: "" }).name;
            b.dt == 32 && (a["!type"] = "chart"), b.dt == 64 && (a["!type"] = "macro"), he = [], W = [], B.arrayf = y = [], ee = [], ne = [], De = !1, U = { Hidden: (i[fe] || { hs: 0 }).hs, name: o };
          }
          break;
        case 515:
        case 3:
        case 2:
          a["!type"] == "chart" && (t.dense ? (a[b.r] || [])[b.c] : a[ye({ c: b.c, r: b.r })]) && ++b.c, v = { ixfe: b.ixfe, XF: T[b.ixfe] || {}, v: b.val, t: "n" }, O > 0 && (v.z = P[v.ixfe >> 8 & 63]), kt(v, t, r.opts.Date1904), M({ c: b.c, r: b.r }, v, t);
          break;
        case 5:
        case 517:
          v = { ixfe: b.ixfe, XF: T[b.ixfe], v: b.val, t: b.t }, O > 0 && (v.z = P[v.ixfe >> 8 & 63]), kt(v, t, r.opts.Date1904), M({ c: b.c, r: b.r }, v, t);
          break;
        case 638:
          v = { ixfe: b.ixfe, XF: T[b.ixfe], v: b.rknum, t: "n" }, O > 0 && (v.z = P[v.ixfe >> 8 & 63]), kt(v, t, r.opts.Date1904), M({ c: b.c, r: b.r }, v, t);
          break;
        case 189:
          for (var Be = b.c; Be <= b.C; ++Be) {
            var xe = b.rkrec[Be - b.c][0];
            v = { ixfe: xe, XF: T[xe], v: b.rkrec[Be - b.c][1], t: "n" }, O > 0 && (v.z = P[v.ixfe >> 8 & 63]), kt(v, t, r.opts.Date1904), M({ c: Be, r: b.r }, v, t);
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
            if (v = mi(b.val, b.cell.ixfe, b.tt), v.XF = T[v.ixfe], t.cellFormula) {
              var ir = b.formula;
              if (ir && ir[0] && ir[0][0] && ir[0][0][0] == "PtgExp") {
                var rt = ir[0][0][1][0], Tt = ir[0][0][1][1], It = ye({ r: rt, c: Tt });
                w[It] ? v.f = "" + br(b.formula, s, b.cell, H, B) : v.F = ((t.dense ? (a[rt] || [])[Tt] : a[It]) || {}).F;
              } else v.f = "" + br(b.formula, s, b.cell, H, B);
            }
            O > 0 && (v.z = P[v.ixfe >> 8 & 63]), kt(v, t, r.opts.Date1904), M(b.cell, v, t), f = b;
          }
          break;
        case 7:
        case 519:
          if (f)
            f.val = b, v = mi(b, f.cell.ixfe, "s"), v.XF = T[v.ixfe], t.cellFormula && (v.f = "" + br(f.formula, s, f.cell, H, B)), O > 0 && (v.z = P[v.ixfe >> 8 & 63]), kt(v, t, r.opts.Date1904), M(f.cell, v, t), f = null;
          else throw new Error("String record expects Formula");
          break;
        case 33:
        case 545:
          {
            y.push(b);
            var xa = ye(b[0].s);
            if (x = t.dense ? (a[b[0].s.r] || [])[b[0].s.c] : a[xa], t.cellFormula && x) {
              if (!f || !xa || !x) break;
              x.f = "" + br(b[1], s, b[0], H, B), x.F = Ae(b[0]);
            }
          }
          break;
        case 1212:
          {
            if (!t.cellFormula) break;
            if (u) {
              if (!f) break;
              w[ye(f.cell)] = b[0], x = t.dense ? (a[f.cell.r] || [])[f.cell.c] : a[ye(f.cell)], (x || {}).f = "" + br(b[0], s, h, H, B);
            }
          }
          break;
        case 253:
          v = mi(c[b.isst].t, b.ixfe, "s"), c[b.isst].h && (v.h = c[b.isst].h), v.XF = T[v.ixfe], O > 0 && (v.z = P[v.ixfe >> 8 & 63]), kt(v, t, r.opts.Date1904), M({ c: b.c, r: b.r }, v, t);
          break;
        case 513:
          t.sheetStubs && (v = { ixfe: b.ixfe, XF: T[b.ixfe], t: "z" }, O > 0 && (v.z = P[v.ixfe >> 8 & 63]), kt(v, t, r.opts.Date1904), M({ c: b.c, r: b.r }, v, t));
          break;
        case 190:
          if (t.sheetStubs)
            for (var Yt = b.c; Yt <= b.C; ++Yt) {
              var jr = b.ixfe[Yt - b.c];
              v = { ixfe: jr, XF: T[jr], t: "z" }, O > 0 && (v.z = P[v.ixfe >> 8 & 63]), kt(v, t, r.opts.Date1904), M({ c: Yt, r: b.r }, v, t);
            }
          break;
        case 214:
        case 516:
        case 4:
          v = mi(b.val, b.ixfe, "s"), v.XF = T[v.ixfe], O > 0 && (v.z = P[v.ixfe >> 8 & 63]), kt(v, t, r.opts.Date1904), M({ c: b.c, r: b.r }, v, t);
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
            for (var Nt = 0; Nt < O + 163 && Ee[Nt] != b[1]; ++Nt) ;
            Nt >= 163 && Wt(b[1], O + 163);
          } else Wt(b[1], b[0]);
          break;
        case 30:
          {
            P[O++] = b;
            for (var Kt = 0; Kt < O + 163 && Ee[Kt] != b; ++Kt) ;
            Kt >= 163 && Wt(b, O + 163);
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
          for (p = b[0].s.r; p <= b[0].e.r; ++p)
            for (d = b[0].s.c; d <= b[0].e.c; ++d)
              x = t.dense ? (a[p] || [])[d] : a[ye({ c: d, r: p })], x && (x.l = b[1]);
          break;
        case 2048:
          for (p = b[0].s.r; p <= b[0].e.r; ++p)
            for (d = b[0].s.c; d <= b[0].e.c; ++d)
              x = t.dense ? (a[p] || [])[d] : a[ye({ c: d, r: p })], x && x.l && (x.l.Tooltip = b[1]);
          break;
        case 28:
          {
            if (B.biff <= 5 && B.biff >= 2) break;
            x = t.dense ? (a[b[0].r] || [])[b[0].c] : a[ye(b[0])];
            var da = W[b[2]];
            x || (t.dense ? (a[b[0].r] || (a[b[0].r] = []), x = a[b[0].r][b[0].c] = { t: "z" }) : x = a[ye(b[0])] = { t: "z" }, s.e.r = Math.max(s.e.r, b[0].r), s.s.r = Math.min(s.s.r, b[0].r), s.e.c = Math.max(s.e.c, b[0].c), s.s.c = Math.min(s.s.c, b[0].c)), x.c || (x.c = []), g = { a: b[1], t: da.TxO.t }, x.c.push(g);
          }
          break;
        case 2173:
          Hg(T[b.ixfe], b.ext);
          break;
        case 125:
          {
            if (!B.cellStyles) break;
            for (; b.e >= b.s; )
              ee[b.e--] = { width: b.w / 256, level: b.level || 0, hidden: !!(b.flags & 1) }, De || (De = !0, f0(b.w / 256)), an(ee[b.e + 1]);
          }
          break;
        case 520:
          {
            var Rr = {};
            b.level != null && (ne[b.r] = Rr, Rr.level = b.level), b.hidden && (ne[b.r] = Rr, Rr.hidden = !0), b.hpt && (ne[b.r] = Rr, Rr.hpt = b.hpt, Rr.hpx = ra(b.hpt));
          }
          break;
        case 38:
        case 39:
        case 40:
        case 41:
          a["!margins"] || Tn(a["!margins"] = {}), a["!margins"][{ 38: "left", 39: "right", 40: "top", 41: "bottom" }[ce]] = b;
          break;
        case 161:
          a["!margins"] || Tn(a["!margins"] = {}), a["!margins"].header = b.header, a["!margins"].footer = b.footer;
          break;
        case 574:
          b.RTL && (k.Views[0].RTL = !0);
          break;
        case 146:
          I = b;
          break;
        case 2198:
          Y = b;
          break;
        case 140:
          N = b;
          break;
        case 442:
          o ? U.CodeName = b || U.name : k.WBProps.CodeName = b || "ThisWorkbook";
          break;
      }
    } else
      te || console.error("Missing Info for XLS Record 0x" + ce.toString(16)), e.l += ie;
  }
  return r.SheetNames = ar(i).sort(function(St, Oe) {
    return Number(St) - Number(Oe);
  }).map(function(St) {
    return i[St].name;
  }), t.bookSheets || (r.Sheets = n), !r.SheetNames.length && l["!ref"] ? (r.SheetNames.push("Sheet1"), r.Sheets && (r.Sheets.Sheet1 = l)) : r.Preamble = l, r.Sheets && R.forEach(function(St, Oe) {
    r.Sheets[r.SheetNames[Oe]]["!autofilter"] = St;
  }), r.Strings = c, r.SSF = Je(Ee), B.enc && (r.Encryption = B.enc), Y && (r.Themes = Y), r.Metadata = {}, N !== void 0 && (r.Metadata.Country = N), H.names.length > 0 && (k.Names = H.names), r.Workbook = k, r;
}
var Na = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function r_(e, t, r) {
  var n = ve.find(e, "/!DocumentSummaryInformation");
  if (n && n.size > 0) try {
    var a = mf(n, Ts, Na.DSI);
    for (var i in a) t[i] = a[i];
  } catch (o) {
    if (r.WTF) throw o;
  }
  var s = ve.find(e, "/!SummaryInformation");
  if (s && s.size > 0) try {
    var f = mf(s, Ss, Na.SI);
    for (var c in f) t[c] == null && (t[c] = f[c]);
  } catch (o) {
    if (r.WTF) throw o;
  }
  t.HeadingPairs && t.TitlesOfParts && (io(t.HeadingPairs, t.TitlesOfParts, t, r), delete t.HeadingPairs, delete t.TitlesOfParts);
}
function t_(e, t) {
  var r = [], n = [], a = [], i = 0, s, f = j0(Ts, "n"), c = j0(Ss, "n");
  if (e.Props)
    for (s = ar(e.Props), i = 0; i < s.length; ++i) (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(c, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = ar(e.Custprops), i = 0; i < s.length; ++i) Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(c, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var o = [];
  for (i = 0; i < a.length; ++i)
    uo.indexOf(a[i][0]) > -1 || ao.indexOf(a[i][0]) > -1 || a[i][1] != null && o.push(a[i]);
  n.length && ve.utils.cfb_add(t, "/SummaryInformation", vf(n, Na.SI, c, Ss)), (r.length || o.length) && ve.utils.cfb_add(t, "/DocumentSummaryInformation", vf(r, Na.DSI, f, Ts, o.length ? o : null, Na.UDI));
}
function cl(e, t) {
  t || (t = {}), p0(t), Ps(), t.codepage && Ls(t.codepage);
  var r, n;
  if (e.FullPaths) {
    if (ve.find(e, "/encryption")) throw new Error("File is password-protected");
    r = ve.find(e, "!CompObj"), n = ve.find(e, "/Workbook") || ve.find(e, "/Book");
  } else {
    switch (t.type) {
      case "base64":
        e = Jr(Zr(e));
        break;
      case "binary":
        e = Jr(e);
        break;
      case "buffer":
        break;
      case "array":
        Array.isArray(e) || (e = Array.prototype.slice.call(e));
        break;
    }
    Er(e, 0), n = { content: e };
  }
  var a, i;
  if (r && qw(r), t.bookProps && !t.bookSheets) a = {};
  else {
    var s = Ce ? "buffer" : "array";
    if (n && n.content) a = e_(n.content, t);
    else if ((i = ve.find(e, "PerfectOffice_MAIN")) && i.content) a = yn.to_workbook(i.content, (t.type = s, t));
    else if ((i = ve.find(e, "NativeContent_MAIN")) && i.content) a = yn.to_workbook(i.content, (t.type = s, t));
    else throw (i = ve.find(e, "MN0")) && i.content ? new Error("Unsupported Works 4 for Mac file") : new Error("Cannot find Workbook stream");
    t.bookVBA && e.FullPaths && ve.find(e, "/_VBA_PROJECT_CUR/VBA/dir") && (a.vbaraw = gp(e));
  }
  var f = {};
  return e.FullPaths && r_(
    /*::((*/
    e,
    f,
    t
  ), a.Props = a.Custprops = f, t.bookFiles && (a.cfb = e), a;
}
function n_(e, t) {
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
  return ve.utils.cfb_add(n, a, ol(e, r)), r.biff == 8 && (e.Props || e.Custprops) && t_(e, n), r.biff == 8 && e.vbaraw && pp(n, ve.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var Ga = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: F2
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: R2
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: ev
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: $2
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: U2
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: q2
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: iv
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: X2
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: uv
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: hv
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: ov
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: lv
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: P2
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: tv
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: G2
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: H2
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: el
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: fv
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: K2
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: qs
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
    f: fw
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
    f: ig
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: ng
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: cg
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: lg
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: og
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: Ou
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: zg
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
    f: So
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: av
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: Qg
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: bv
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
    f: Br,
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
    f: Sv
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
    f: B2
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: O2,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: vv
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: aw
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
    f: tw
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
    f: _d
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
    f: Rn
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
    f: xv
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
    f: Vg
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: Xg,
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
    f: ys
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
    f: To
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
    f: wv
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: _v
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
    f: yv
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
    f: N2
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
    f: pv
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
    f: ys
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
    f: lp
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
    f: cp
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: Du
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
    f: Gv
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
    f: Cv
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
}, Os = {
  /* [MS-XLS] 2.3 Record Enumeration 2021-08-17 */
  /*::[*/
  6: {
    /* n:"Formula", */
    f: fs
  },
  /*::[*/
  10: {
    /* n:"EOF", */
    f: qt
  },
  /*::[*/
  12: {
    /* n:"CalcCount", */
    f: xr
  },
  //
  /*::[*/
  13: {
    /* n:"CalcMode", */
    f: xr
  },
  //
  /*::[*/
  14: {
    /* n:"CalcPrecision", */
    f: fr
  },
  //
  /*::[*/
  15: {
    /* n:"CalcRefMode", */
    f: fr
  },
  //
  /*::[*/
  16: {
    /* n:"CalcDelta", */
    f: Ir
  },
  //
  /*::[*/
  17: {
    /* n:"CalcIter", */
    f: fr
  },
  //
  /*::[*/
  18: {
    /* n:"Protect", */
    f: fr
  },
  /*::[*/
  19: {
    /* n:"Password", */
    f: xr
  },
  /*::[*/
  20: {
    /* n:"Header", */
    f: Sf
  },
  /*::[*/
  21: {
    /* n:"Footer", */
    f: Sf
  },
  /*::[*/
  23: {
    /* n:"ExternSheet", */
    f: To
  },
  /*::[*/
  24: {
    /* n:"Lbl", */
    f: Af
  },
  /*::[*/
  25: {
    /* n:"WinProtect", */
    f: fr
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
    f: Cx
  },
  /*::[*/
  29: {
    /* n:"Selection", */
  },
  /*::[*/
  34: {
    /* n:"Date1904", */
    f: fr
  },
  /*::[*/
  35: {
    /* n:"ExternName", */
    f: kf
  },
  /*::[*/
  38: {
    /* n:"LeftMargin", */
    f: Ir
  },
  // *
  /*::[*/
  39: {
    /* n:"RightMargin", */
    f: Ir
  },
  // *
  /*::[*/
  40: {
    /* n:"TopMargin", */
    f: Ir
  },
  // *
  /*::[*/
  41: {
    /* n:"BottomMargin", */
    f: Ir
  },
  // *
  /*::[*/
  42: {
    /* n:"PrintRowCol", */
    f: fr
  },
  /*::[*/
  43: {
    /* n:"PrintGrid", */
    f: fr
  },
  /*::[*/
  47: {
    /* n:"FilePass", */
    f: Hd
  },
  /*::[*/
  49: {
    /* n:"Font", */
    f: tx
  },
  /*::[*/
  51: {
    /* n:"PrintSize", */
    f: xr
  },
  /*::[*/
  60: {
    /* n:"Continue", */
  },
  /*::[*/
  61: {
    /* n:"Window1", */
    f: q1
  },
  /*::[*/
  64: {
    /* n:"Backup", */
    f: fr
  },
  /*::[*/
  65: {
    /* n:"Pane", */
    f: rx
  },
  /*::[*/
  66: {
    /* n:"CodePage", */
    f: xr
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
    f: xr
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
    f: W1
  },
  /*::[*/
  93: {
    /* n:"Obj", */
    f: Nx
  },
  /*::[*/
  94: {
    /* n:"Uncalced", */
  },
  /*::[*/
  95: {
    /* n:"CalcSaveRecalc", */
    f: fr
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
    f: fr
  },
  /*::[*/
  125: {
    /* n:"ColInfo", */
    f: So
  },
  /*::[*/
  128: {
    /* n:"Guts", */
    f: mx
  },
  /*::[*/
  129: {
    /* n:"WsBool", */
    f: V1
  },
  /*::[*/
  130: {
    /* n:"GridSet", */
    f: xr
  },
  /*::[*/
  131: {
    /* n:"HCenter", */
    f: fr
  },
  /*::[*/
  132: {
    /* n:"VCenter", */
    f: fr
  },
  /*::[*/
  133: {
    /* n:"BoundSheet8", */
    f: $1
  },
  /*::[*/
  134: {
    /* n:"WriteProtect", */
  },
  /*::[*/
  140: {
    /* n:"Country", */
    f: Wx
  },
  /*::[*/
  141: {
    /* n:"HideObj", */
    f: xr
  },
  /*::[*/
  144: {
    /* n:"Sort", */
  },
  /*::[*/
  146: {
    /* n:"Palette", */
    f: $x
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
    f: xr
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
    f: Jx
  },
  /*::[*/
  161: {
    /* n:"Setup", */
    f: jx
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
    f: xx
  },
  /*::[*/
  190: {
    /* n:"MulBlank", */
    f: dx
  },
  /*::[*/
  193: {
    /* n:"Mms", */
    f: qt
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
    f: fr
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
    f: xr
  },
  /*::[*/
  220: {
    /* n:"DbOrParamQry", */
  },
  /*::[*/
  221: {
    /* n:"ScenarioProtect", */
    f: fr
  },
  /*::[*/
  222: {
    /* n:"OleObjectSize", */
  },
  /*::[*/
  224: {
    /* n:"XF", */
    f: px
  },
  /*::[*/
  225: {
    /* n:"InterfaceHdr", */
    f: U1
  },
  /*::[*/
  226: {
    /* n:"InterfaceEnd", */
    f: qt
  },
  /*::[*/
  227: {
    /* n:"SXVS", */
  },
  /*::[*/
  229: {
    /* n:"MergeCells", */
    f: Ox
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
    f: G1
  },
  /*::[*/
  253: {
    /* n:"LabelSst", */
    f: ax
  },
  /*::[*/
  255: {
    /* n:"ExtSST", */
    f: X1
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
    f: xo
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
    f: fr
  },
  /*::[*/
  353: {
    /* n:"DSF", */
    f: qt
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
    f: yx
  },
  /*::[*/
  431: {
    /* n:"Prot4Rev", */
    f: fr
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
    f: Rx
  },
  /*::[*/
  439: {
    /* n:"RefreshAll", */
    f: fr
  },
  //
  /*::[*/
  440: {
    /* n:"HLink", */
    f: Lx
  },
  /*::[*/
  441: {
    /* n:"Lel", */
  },
  /*::[*/
  442: {
    /* n:"CodeName", */
    f: Za
  },
  /*::[*/
  443: {
    /* n:"SXFDBType", */
  },
  /*::[*/
  444: {
    /* n:"Prot4RevPass", */
    f: xr
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
    f: qt
  },
  /*::[*/
  449: {
    /* n:"RecalcId", */
    f: J1,
    r: 2
  },
  /*::[*/
  450: {
    /* n:"EntExU2", */
    f: qt
  },
  /*::[*/
  512: {
    /* n:"Dimensions", */
    f: Ef
  },
  /*::[*/
  513: {
    /* n:"Blank", */
    f: Kx
  },
  /*::[*/
  515: {
    /* n:"Number", */
    f: _x
  },
  /*::[*/
  516: {
    /* n:"Label", */
    f: sx
  },
  /*::[*/
  517: {
    /* n:"BoolErr", */
    f: Tf
  },
  /*::[*/
  519: {
    /* n:"String", */
    f: qx
  },
  /*::[*/
  520: {
    /* n:"Row", */
    f: Y1
  },
  /*::[*/
  523: {
    /* n:"Index", */
  },
  /*::[*/
  545: {
    /* n:"Array", */
    f: Ff
  },
  /*::[*/
  549: {
    /* n:"DefaultRowHeight", */
    f: _f
  },
  /*::[*/
  566: {
    /* n:"Table", */
  },
  /*::[*/
  574: {
    /* n:"Window2", */
    f: Q1
  },
  /*::[*/
  638: {
    /* n:"RK", */
    f: ux
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
    f: cx
  },
  /*::[*/
  1084: {
    /* n:"ContinueBigName", */
  },
  /*::[*/
  1212: {
    /* n:"ShrFmla", */
    f: Ax
  },
  /*::[*/
  2048: {
    /* n:"HLinkTooltip", */
    f: Mx
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
    f: di
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
    f: qt
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
    f: zx,
    r: 12
  },
  /*::[*/
  2173: {
    /* n:"XFExt", */
    f: Wg,
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
    f: fr,
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
    f: kx,
    r: 12
  },
  /*::[*/
  2197: {
    /* n:"SortData", */
  },
  /*::[*/
  2198: {
    /* n:"Theme", */
    f: Dg,
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
    f: Fx,
    r: 12
  },
  /*::[*/
  2203: {
    /* n:"CompressPictures", */
    f: qt
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
    f: K1
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
    f: xr
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
    f: Xx
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
    f: Vx
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
    f: Ef
  },
  /*::[*/
  1: {
    /* n:"BIFF2BLANK", */
  },
  /*::[*/
  2: {
    /* n:"BIFF2INT", */
    f: td
  },
  /*::[*/
  3: {
    /* n:"BIFF2NUM", */
    f: ed
  },
  /*::[*/
  4: {
    /* n:"BIFF2STR", */
    f: Qx
  },
  /*::[*/
  5: {
    /* n:"BoolErr", */
    f: Tf
  },
  /*::[*/
  7: {
    /* n:"String", */
    f: ad
  },
  /*::[*/
  8: {
    /* n:"BIFF2ROW", */
  },
  /*::[*/
  9: {
    /* n:"BOF", */
    f: di
  },
  /*::[*/
  11: {
    /* n:"Index", */
  },
  /*::[*/
  22: {
    /* n:"ExternCount", */
    f: xr
  },
  /*::[*/
  30: {
    /* n:"BIFF2FORMAT", */
    f: lx
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
    f: Ff
  },
  /*::[*/
  36: {
    /* n:"COLWIDTH", */
  },
  /*::[*/
  37: {
    /* n:"DefaultRowHeight", */
    f: _f
  },
  // 0x2c ??
  // 0x2d ??
  // 0x2e ??
  // 0x30 FONTCOUNT: number of fonts
  /*::[*/
  50: {
    /* n:"BIFF2FONTXTRA", */
    f: id
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
    f: xr
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
    f: Zx
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
    f: sd
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
    f: fs
  },
  /*::[*/
  521: {
    /* n:"BOF", */
    f: di
  },
  /*::[*/
  536: {
    /* n:"Lbl", */
    f: Af
  },
  /*::[*/
  547: {
    /* n:"ExternName", */
    f: kf
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
    f: fs
  },
  /*::[*/
  1033: {
    /* n:"BOF", */
    f: di
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
    i > 0 && Ys(r) && e.push(r);
  }
}
function a_(e, t, r, n) {
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
function ti(e, t, r) {
  return e || (e = q(7)), e.write_shift(2, t), e.write_shift(2, r), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function i_(e, t, r, n) {
  var a = q(9);
  return ti(a, e, t), go(r, n || "b", a), a;
}
function s_(e, t, r) {
  var n = q(8 + 2 * r.length);
  return ti(n, e, t), n.write_shift(1, r.length), n.write_shift(r.length, r, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function f_(e, t, r, n) {
  if (t.v != null) switch (t.t) {
    case "d":
    case "n":
      var a = t.t == "d" ? pr(Ke(t.v)) : t.v;
      a == (a | 0) && a >= 0 && a < 65536 ? le(e, 2, nd(r, n, a)) : le(e, 3, rd(r, n, a));
      return;
    case "b":
    case "e":
      le(e, 5, i_(r, n, t.v, t.t));
      return;
    case "s":
    case "str":
      le(e, 4, s_(r, n, (t.v || "").slice(0, 255)));
      return;
  }
  le(e, 1, ti(null, r, n));
}
function c_(e, t, r, n) {
  var a = Array.isArray(t), i = Me(t["!ref"] || "A1"), s, f = "", c = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF) throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = Ae(i);
  }
  for (var o = i.s.r; o <= i.e.r; ++o) {
    f = or(o);
    for (var l = i.s.c; l <= i.e.c; ++l) {
      o === i.s.r && (c[l] = er(l)), s = c[l] + f;
      var h = a ? (t[o] || [])[l] : t[s];
      h && f_(e, h, o, l);
    }
  }
}
function o_(e, t) {
  for (var r = t || {}, n = zr(), a = 0, i = 0; i < e.SheetNames.length; ++i) e.SheetNames[i] == r.sheet && (a = i);
  if (a == 0 && r.sheet && e.SheetNames[0] != r.sheet) throw new Error("Sheet not found: " + r.sheet);
  return le(n, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, a0(e, 16, r)), c_(n, e.Sheets[e.SheetNames[a]], a, r), le(n, 10), n.end();
}
function l_(e, t, r) {
  le(e, 49, nx({
    sz: 12,
    name: "Arial"
  }, r));
}
function h_(e, t, r) {
  t && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(n) {
    for (var a = n[0]; a <= n[1]; ++a) t[a] != null && le(e, 1054, ox(a, t[a], r));
  });
}
function u_(e, t) {
  var r = q(19);
  r.write_shift(4, 2151), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 1), r.write_shift(4, 0), le(e, 2151, r), r = q(39), r.write_shift(4, 2152), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(2, 1), r.write_shift(4, 4), r.write_shift(2, 0), _o(Me(t["!ref"] || "A1"), r), r.write_shift(4, 4), le(e, 2152, r);
}
function x_(e, t) {
  for (var r = 0; r < 16; ++r) le(e, 224, yf({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function(n) {
    le(e, 224, yf(n, 0, t));
  });
}
function d_(e, t) {
  for (var r = 0; r < t["!links"].length; ++r) {
    var n = t["!links"][r];
    le(e, 440, Px(n)), n[1].Tooltip && le(e, 2048, Ux(n));
  }
  delete t["!links"];
}
function g_(e, t) {
  if (t) {
    var r = 0;
    t.forEach(function(n, a) {
      ++r <= 256 && n && le(e, 125, Gx(ji(a, n), a));
    });
  }
}
function p_(e, t, r, n, a) {
  var i = 16 + un(a.cellXfs, t, a);
  if (t.v == null && !t.bf) {
    le(e, 513, bn(r, n, i));
    return;
  }
  if (t.bf) le(e, 6, Vm(t, r, n, a, i));
  else switch (t.t) {
    case "d":
    case "n":
      var s = t.t == "d" ? pr(Ke(t.v)) : t.v;
      le(e, 515, Ex(r, n, s, i));
      break;
    case "b":
    case "e":
      le(e, 517, wx(r, n, t.v, i, a, t.t));
      break;
    case "s":
    case "str":
      if (a.bookSST) {
        var f = u0(a.Strings, t.v, a.revStrings);
        le(e, 253, ix(r, n, f, i));
      } else le(e, 516, fx(r, n, (t.v || "").slice(0, 255), i, a));
      break;
    default:
      le(e, 513, bn(r, n, i));
  }
}
function m_(e, t, r) {
  var n = zr(), a = r.SheetNames[e], i = r.Sheets[a] || {}, s = (r || {}).Workbook || {}, f = (s.Sheets || [])[e] || {}, c = Array.isArray(i), o = t.biff == 8, l, h = "", u = [], x = Me(i["!ref"] || "A1"), g = o ? 65536 : 16384;
  if (x.e.c > 255 || x.e.r >= g) {
    if (t.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    x.e.c = Math.min(x.e.c, 255), x.e.r = Math.min(x.e.c, g - 1);
  }
  le(n, 2057, a0(r, 16, t)), le(n, 13, lt(1)), le(n, 12, lt(100)), le(n, 15, Wr(!0)), le(n, 17, Wr(!1)), le(n, 16, An(1e-3)), le(n, 95, Wr(!0)), le(n, 42, Wr(!1)), le(n, 43, Wr(!1)), le(n, 130, lt(1)), le(n, 128, vx()), le(n, 131, Wr(!1)), le(n, 132, Wr(!1)), o && g_(n, i["!cols"]), le(n, 512, hx(x, t)), o && (i["!links"] = []);
  for (var d = x.s.r; d <= x.e.r; ++d) {
    h = or(d);
    for (var p = x.s.c; p <= x.e.c; ++p) {
      d === x.s.r && (u[p] = er(p)), l = u[p] + h;
      var w = c ? (i[d] || [])[p] : i[l];
      w && (p_(n, w, d, p, t), o && w.l && i["!links"].push([l, w.l]));
    }
  }
  var y = f.CodeName || f.name || a;
  return o && le(n, 574, ex((s.Views || [])[0])), o && (i["!merges"] || []).length && le(n, 229, Ix(i["!merges"])), o && d_(n, i), le(n, 442, po(y)), o && u_(n, i), le(
    n,
    10
    /* EOF */
  ), n.end();
}
function v_(e, t, r) {
  var n = zr(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = (
    /*::((*/
    a.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), f = r.biff == 8, c = r.biff == 5;
  if (le(n, 2057, a0(e, 5, r)), r.bookType == "xla" && le(
    n,
    135
    /* Addin */
  ), le(n, 225, f ? lt(1200) : null), le(n, 193, w1(2)), c && le(
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
  ), le(n, 92, H1("SheetJS", r)), le(n, 66, lt(f ? 1200 : 1252)), f && le(n, 353, lt(0)), f && le(
    n,
    448
    /* Excel9File */
  ), le(n, 317, Yx(e.SheetNames.length)), f && e.vbaraw && le(
    n,
    211
    /* ObProj */
  ), f && e.vbaraw) {
    var o = s.CodeName || "ThisWorkbook";
    le(n, 442, po(o));
  }
  le(n, 156, lt(17)), le(n, 25, Wr(!1)), le(n, 18, Wr(!1)), le(n, 19, lt(0)), f && le(n, 431, Wr(!1)), f && le(n, 444, lt(0)), le(n, 61, Z1()), le(n, 64, Wr(!1)), le(n, 141, lt(0)), le(n, 34, Wr(Jv(e) == "true")), le(n, 14, Wr(!0)), f && le(n, 439, Wr(!1)), le(n, 218, lt(0)), l_(n, e, r), h_(n, e.SSF, r), x_(n, r), f && le(n, 352, Wr(!1));
  var l = n.end(), h = zr();
  f && le(h, 140, Hx()), f && r.Strings && a_(h, 252, j1(r.Strings)), le(
    h,
    10
    /* EOF */
  );
  var u = h.end(), x = zr(), g = 0, d = 0;
  for (d = 0; d < e.SheetNames.length; ++d) g += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[d].length;
  var p = l.length + g + u.length;
  for (d = 0; d < e.SheetNames.length; ++d) {
    var w = i[d] || {};
    le(x, 133, z1({ pos: p, hs: w.Hidden || 0, dt: 0, name: e.SheetNames[d] }, r)), p += t[d].length;
  }
  var y = x.end();
  if (g != y.length) throw new Error("BS8 " + g + " != " + y.length);
  var v = [];
  return l.length && v.push(l), y.length && v.push(y), u.length && v.push(u), vr(v);
}
function w_(e, t) {
  var r = t || {}, n = [];
  e && !e.SSF && (e.SSF = Je(Ee)), e && e.SSF && (ia(), Ui(e.SSF), r.revssf = Hi(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, m0(r), r.cellXfs = [], un(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a) n[n.length] = m_(a, r, e);
  return n.unshift(v_(e, n, r)), vr(n);
}
function ol(e, t) {
  for (var r = 0; r <= e.SheetNames.length; ++r) {
    var n = e.Sheets[e.SheetNames[r]];
    if (!(!n || !n["!ref"])) {
      var a = Gr(n["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[r] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = t || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return w_(e, t);
    case 4:
    case 3:
    case 2:
      return o_(e, t);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function Pf(e, t) {
  var r = t || {}, n = r.dense ? [] : {};
  e = e.replace(/<!--.*?-->/g, "");
  var a = e.match(/<table/i);
  if (!a) throw new Error("Invalid HTML: could not find <table>");
  var i = e.match(/<\/table/i), s = a.index, f = i && i.index || e.length, c = nu(e.slice(s, f), /(:?<tr[^>]*>)/i, "<tr>"), o = -1, l = 0, h = 0, u = 0, x = { s: { r: 1e7, c: 1e7 }, e: { r: 0, c: 0 } }, g = [];
  for (s = 0; s < c.length; ++s) {
    var d = c[s].trim(), p = d.slice(0, 3).toLowerCase();
    if (p == "<tr") {
      if (++o, r.sheetRows && r.sheetRows <= o) {
        --o;
        break;
      }
      l = 0;
      continue;
    }
    if (!(p != "<td" && p != "<th")) {
      var w = d.split(/<\/t[dh]>/i);
      for (f = 0; f < w.length; ++f) {
        var y = w[f].trim();
        if (y.match(/<t[dh]/i)) {
          for (var v = y, N = 0; v.charAt(0) == "<" && (N = v.indexOf(">")) > -1; ) v = v.slice(N + 1);
          for (var T = 0; T < g.length; ++T) {
            var I = g[T];
            I.s.c == l && I.s.r < o && o <= I.e.r && (l = I.e.c + 1, T = -1);
          }
          var k = Te(y.slice(0, y.indexOf(">")));
          u = k.colspan ? +k.colspan : 1, ((h = +k.rowspan) > 1 || u > 1) && g.push({ s: { r: o, c: l }, e: { r: o + (h || 1) - 1, c: l + u - 1 } });
          var U = k.t || k["data-t"] || "";
          if (!v.length) {
            l += u;
            continue;
          }
          if (v = Nc(v), x.s.r > o && (x.s.r = o), x.e.r < o && (x.e.r = o), x.s.c > l && (x.s.c = l), x.e.c < l && (x.e.c = l), !v.length) {
            l += u;
            continue;
          }
          var C = { t: "s", v };
          r.raw || !v.trim().length || U == "s" || (v === "TRUE" ? C = { t: "b", v: !0 } : v === "FALSE" ? C = { t: "b", v: !1 } : isNaN(Et(v)) ? isNaN(Qn(v).getDate()) || (C = { t: "d", v: Ke(v) }, r.cellDates || (C = { t: "n", v: pr(C.v) }), C.z = r.dateNF || Ee[14]) : C = { t: "n", v: Et(v) }), r.dense ? (n[o] || (n[o] = []), n[o][l] = C) : n[ye({ r: o, c: l })] = C, l += u;
        }
      }
    }
  }
  return n["!ref"] = Ae(x), g.length && (n["!merges"] = g), n;
}
function __(e, t, r, n) {
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
      var l = ye({ r, c: s }), h = n.dense ? (e[r] || [])[s] : e[l], u = h && h.v != null && (h.h || Gs(h.w || ($t(h), h.w) || "")) || "", x = {};
      f > 1 && (x.rowspan = f), c > 1 && (x.colspan = c), n.editable ? u = '<span contenteditable="true">' + u + "</span>" : h && (x["data-t"] = h && h.t || "z", h.v != null && (x["data-v"] = h.v), h.z != null && (x["data-z"] = h.z), h.l && (h.l.Target || "#").charAt(0) != "#" && (u = '<a href="' + h.l.Target + '">' + u + "</a>")), x.id = (n.id || "sjs") + "-" + l, i.push(oe("td", u, x));
    }
  }
  var g = "<tr>";
  return g + i.join("") + "</tr>";
}
var E_ = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', y_ = "</body></html>";
function T_(e, t) {
  var r = e.match(/<table[\s\S]*?>[\s\S]*?<\/table>/gi);
  if (!r || r.length == 0) throw new Error("Invalid HTML: could not find <table>");
  if (r.length == 1) return hn(Pf(r[0], t), t);
  var n = _0();
  return r.forEach(function(a, i) {
    E0(n, Pf(a, t), "Sheet" + (i + 1));
  }), n;
}
function S_(e, t, r) {
  var n = [];
  return n.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">";
}
function ll(e, t) {
  var r = t || {}, n = r.header != null ? r.header : E_, a = r.footer != null ? r.footer : y_, i = [n], s = Gr(e["!ref"]);
  r.dense = Array.isArray(e), i.push(S_(e, s, r));
  for (var f = s.s.r; f <= s.e.r; ++f) i.push(__(e, s, f, r));
  return i.push("</table>" + a), i.join("");
}
function hl(e, t, r) {
  var n = r || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number") a = n.origin;
    else {
      var s = typeof n.origin == "string" ? rr(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var f = t.getElementsByTagName("tr"), c = Math.min(n.sheetRows || 1e7, f.length), o = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var l = Gr(e["!ref"]);
    o.s.r = Math.min(o.s.r, l.s.r), o.s.c = Math.min(o.s.c, l.s.c), o.e.r = Math.max(o.e.r, l.e.r), o.e.c = Math.max(o.e.c, l.e.c), a == -1 && (o.e.r = a = l.e.r + 1);
  }
  var h = [], u = 0, x = e["!rows"] || (e["!rows"] = []), g = 0, d = 0, p = 0, w = 0, y = 0, v = 0;
  for (e["!cols"] || (e["!cols"] = []); g < f.length && d < c; ++g) {
    var N = f[g];
    if (Mf(N)) {
      if (n.display) continue;
      x[d] = { hidden: !0 };
    }
    var T = N.children;
    for (p = w = 0; p < T.length; ++p) {
      var I = T[p];
      if (!(n.display && Mf(I))) {
        var k = I.hasAttribute("data-v") ? I.getAttribute("data-v") : I.hasAttribute("v") ? I.getAttribute("v") : Nc(I.innerHTML), U = I.getAttribute("data-z") || I.getAttribute("z");
        for (u = 0; u < h.length; ++u) {
          var C = h[u];
          C.s.c == w + i && C.s.r < d + a && d + a <= C.e.r && (w = C.e.c + 1 - i, u = -1);
        }
        v = +I.getAttribute("colspan") || 1, ((y = +I.getAttribute("rowspan") || 1) > 1 || v > 1) && h.push({ s: { r: d + a, c: w + i }, e: { r: d + a + (y || 1) - 1, c: w + i + (v || 1) - 1 } });
        var D = { t: "s", v: k }, M = I.getAttribute("data-t") || I.getAttribute("t") || "";
        k != null && (k.length == 0 ? D.t = M || "z" : n.raw || k.trim().length == 0 || M == "s" || (k === "TRUE" ? D = { t: "b", v: !0 } : k === "FALSE" ? D = { t: "b", v: !1 } : isNaN(Et(k)) ? isNaN(Qn(k).getDate()) || (D = { t: "d", v: Ke(k) }, n.cellDates || (D = { t: "n", v: pr(D.v) }), D.z = n.dateNF || Ee[14]) : D = { t: "n", v: Et(k) })), D.z === void 0 && U != null && (D.z = U);
        var B = "", Y = I.getElementsByTagName("A");
        if (Y && Y.length) for (var he = 0; he < Y.length && !(Y[he].hasAttribute("href") && (B = Y[he].getAttribute("href"), B.charAt(0) != "#")); ++he) ;
        B && B.charAt(0) != "#" && (D.l = { Target: B }), n.dense ? (e[d + a] || (e[d + a] = []), e[d + a][w + i] = D) : e[ye({ c: w + i, r: d + a })] = D, o.e.c < w + i && (o.e.c = w + i), w += v;
      }
    }
    ++d;
  }
  return h.length && (e["!merges"] = (e["!merges"] || []).concat(h)), o.e.r = Math.max(o.e.r, d - 1 + a), e["!ref"] = Ae(o), d >= c && (e["!fullref"] = Ae((o.e.r = f.length - g + d - 1 + a, o))), e;
}
function ul(e, t) {
  var r = t || {}, n = r.dense ? [] : {};
  return hl(n, e, t);
}
function k_(e, t) {
  return hn(ul(e, t), t);
}
function Mf(e) {
  var t = "", r = A_(e);
  return r && (t = r(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}
function A_(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
function F_(e) {
  var t = e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g, function(n, a) {
    return Array(parseInt(a, 10) + 1).join(" ");
  }).replace(/<text:tab[^>]*\/>/g, "	").replace(/<text:line-break\/>/g, `
`), r = Pe(t.replace(/<[^>]*>/g, ""));
  return [r];
}
var Uf = {
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
function xl(e, t) {
  var r = t || {}, n = js(e), a = [], i, s, f = { name: "" }, c = "", o = 0, l, h, u = {}, x = [], g = r.dense ? [] : {}, d, p, w = { value: "" }, y = "", v = 0, N = [], T = -1, I = -1, k = { s: { r: 1e6, c: 1e7 }, e: { r: 0, c: 0 } }, U = 0, C = {}, D = [], M = {}, B = 0, Y = 0, he = [], W = 1, ee = 1, ne = [], De = { Names: [] }, H = {}, _e = ["", ""], Se = [], O = {}, P = "", R = 0, L = !1, Q = !1, fe = 0;
  for (Ua.lastIndex = 0, n = n.replace(/<!--([\s\S]*?)-->/mg, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, ""); d = Ua.exec(n); ) switch (d[3] = d[3].replace(/_.*$/, "")) {
    case "table":
    case "工作表":
      d[1] === "/" ? (k.e.c >= k.s.c && k.e.r >= k.s.r ? g["!ref"] = Ae(k) : g["!ref"] = "A1:A1", r.sheetRows > 0 && r.sheetRows <= k.e.r && (g["!fullref"] = g["!ref"], k.e.r = r.sheetRows - 1, g["!ref"] = Ae(k)), D.length && (g["!merges"] = D), he.length && (g["!rows"] = he), l.name = l.名称 || l.name, typeof JSON < "u" && JSON.stringify(l), x.push(l.name), u[l.name] = g, Q = !1) : d[0].charAt(d[0].length - 2) !== "/" && (l = Te(d[0], !1), T = I = -1, k.s.r = k.s.c = 1e7, k.e.r = k.e.c = 0, g = r.dense ? [] : {}, D = [], he = [], Q = !0);
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
      I = -1;
      break;
    case "covered-table-cell":
      d[1] !== "/" && ++I, r.sheetStubs && (r.dense ? (g[T] || (g[T] = []), g[T][I] = { t: "z" }) : g[ye({ r: T, c: I })] = { t: "z" }), y = "", N = [];
      break;
    case "table-cell":
    case "数据":
      if (d[0].charAt(d[0].length - 2) === "/")
        ++I, w = Te(d[0], !1), ee = parseInt(w["number-columns-repeated"] || "1", 10), p = {
          t: "z",
          v: null
          /*:: , z:null, w:"",c:[]*/
        }, w.formula && r.cellFormula != !1 && (p.f = Df(Pe(w.formula))), (w.数据类型 || w["value-type"]) == "string" && (p.t = "s", p.v = Pe(w["string-value"] || ""), r.dense ? (g[T] || (g[T] = []), g[T][I] = p) : g[ye({ r: T, c: I })] = p), I += ee - 1;
      else if (d[1] !== "/") {
        ++I, y = "", v = 0, N = [], ee = 1;
        var ce = W ? T + W - 1 : T;
        if (I > k.e.c && (k.e.c = I), I < k.s.c && (k.s.c = I), T < k.s.r && (k.s.r = T), ce > k.e.r && (k.e.r = ce), w = Te(d[0], !1), Se = [], O = {}, p = {
          t: w.数据类型 || w["value-type"],
          v: null
          /*:: , z:null, w:"",c:[]*/
        }, r.cellFormula)
          if (w.formula && (w.formula = Pe(w.formula)), w["number-matrix-columns-spanned"] && w["number-matrix-rows-spanned"] && (B = parseInt(w["number-matrix-rows-spanned"], 10) || 0, Y = parseInt(w["number-matrix-columns-spanned"], 10) || 0, M = { s: { r: T, c: I }, e: { r: T + B - 1, c: I + Y - 1 } }, p.F = Ae(M), ne.push([M, p.F])), w.formula) p.f = Df(w.formula);
          else for (fe = 0; fe < ne.length; ++fe)
            T >= ne[fe][0].s.r && T <= ne[fe][0].e.r && I >= ne[fe][0].s.c && I <= ne[fe][0].e.c && (p.F = ne[fe][1]);
        switch ((w["number-columns-spanned"] || w["number-rows-spanned"]) && (B = parseInt(w["number-rows-spanned"], 10) || 0, Y = parseInt(w["number-columns-spanned"], 10) || 0, M = { s: { r: T, c: I }, e: { r: T + B - 1, c: I + Y - 1 } }, D.push(M)), w["number-columns-repeated"] && (ee = parseInt(w["number-columns-repeated"], 10)), p.t) {
          case "boolean":
            p.t = "b", p.v = Ye(w["boolean-value"]);
            break;
          case "float":
            p.t = "n", p.v = parseFloat(w.value);
            break;
          case "percentage":
            p.t = "n", p.v = parseFloat(w.value);
            break;
          case "currency":
            p.t = "n", p.v = parseFloat(w.value);
            break;
          case "date":
            p.t = "d", p.v = Ke(w["date-value"]), r.cellDates || (p.t = "n", p.v = pr(p.v)), p.z = "m/d/yy";
            break;
          case "time":
            p.t = "n", p.v = eu(w["time-value"]) / 86400, r.cellDates && (p.t = "d", p.v = Vi(p.v)), p.z = "HH:MM:SS";
            break;
          case "number":
            p.t = "n", p.v = parseFloat(w.数据数值);
            break;
          default:
            if (p.t === "string" || p.t === "text" || !p.t)
              p.t = "s", w["string-value"] != null && (y = Pe(w["string-value"]), N = []);
            else throw new Error("Unsupported value type " + p.t);
        }
      } else {
        if (L = !1, p.t === "s" && (p.v = y || "", N.length && (p.R = N), L = v == 0), H.Target && (p.l = H), Se.length > 0 && (p.c = Se, Se = []), y && r.cellText !== !1 && (p.w = y), L && (p.t = "z", delete p.v), (!L || r.sheetStubs) && !(r.sheetRows && r.sheetRows <= T))
          for (var ie = 0; ie < W; ++ie) {
            if (ee = parseInt(w["number-columns-repeated"] || "1", 10), r.dense)
              for (g[T + ie] || (g[T + ie] = []), g[T + ie][I] = ie == 0 ? p : Je(p); --ee > 0; ) g[T + ie][I + ee] = Je(p);
            else
              for (g[ye({ r: T + ie, c: I })] = p; --ee > 0; ) g[ye({ r: T + ie, c: I + ee })] = Je(p);
            k.e.c <= I && (k.e.c = I);
          }
        ee = parseInt(w["number-columns-repeated"] || "1", 10), I += ee - 1, ee = 0, p = {
          /*:: t:"", v:null, z:null, w:"",c:[]*/
        }, y = "", N = [];
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
        O.t = y, N.length && (O.R = N), O.a = P, Se.push(O);
      } else d[0].charAt(d[0].length - 2) !== "/" && a.push([d[3], !1]);
      P = "", R = 0, y = "", v = 0, N = [];
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
      y = "", v = 0, N = [];
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
          s = Te(d[0], !1), c += Uf[d[3]][s.style === "long" ? 1 : 0];
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
          s = Te(d[0], !1), c += Uf[d[3]][s.style === "long" ? 1 : 0];
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
      s = Te(d[0], !1), _e = cs(s["cell-range-address"]);
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
        var be = F_(n.slice(v, d.index));
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
        _e = cs(Te(d[0])["target-range-address"]), u[_e[0]]["!autofilter"] = { ref: _e[1] };
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
        H.Target = Pe(H.href), delete H.href, H.Target.charAt(0) == "#" && H.Target.indexOf(".") > -1 ? (_e = cs(H.Target.slice(1)), H.Target = "#" + _e[0] + "!" + _e[1]) : H.Target.match(/^\.\.[\\\/]/) && (H.Target = H.Target.slice(3));
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
function Wf(e, t) {
  t = t || {}, ct(e, "META-INF/manifest.xml") && e1(ur(e, "META-INF/manifest.xml"), t);
  var r = qr(e, "content.xml");
  if (!r) throw new Error("Missing content.xml in ODS / UOF file");
  var n = xl(Ge(r), t);
  return ct(e, "meta.xml") && (n.Props = to(ur(e, "meta.xml"))), n;
}
function Hf(e, t) {
  return xl(e, t);
}
var b_ = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), t = "<office:document-styles " + Ma({
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
    return lr + t;
  };
}(), Vf = /* @__PURE__ */ function() {
  var e = function(i) {
    return ze(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, t = `          <table:table-cell />
`, r = `          <table:covered-table-cell/>
`, n = function(i, s, f) {
    var c = [];
    c.push('      <table:table table:name="' + ze(s.SheetNames[f]) + `" table:style-name="ta1">
`);
    var o = 0, l = 0, h = Gr(i["!ref"] || "A1"), u = i["!merges"] || [], x = 0, g = Array.isArray(i);
    if (i["!cols"])
      for (l = 0; l <= h.e.c; ++l) c.push("        <table:table-column" + (i["!cols"][l] ? ' table:style-name="co' + i["!cols"][l].ods + '"' : "") + `></table:table-column>
`);
    var d = "", p = i["!rows"] || [];
    for (o = 0; o < h.s.r; ++o)
      d = p[o] ? ' table:style-name="ro' + p[o].ods + '"' : "", c.push("        <table:table-row" + d + `></table:table-row>
`);
    for (; o <= h.e.r; ++o) {
      for (d = p[o] ? ' table:style-name="ro' + p[o].ods + '"' : "", c.push("        <table:table-row" + d + `>
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
        var N = ye({ r: o, c: l }), T = g ? (i[o] || [])[l] : i[N];
        if (T && T.f && (y["table:formula"] = ze(Ym(T.f)), T.F && T.F.slice(0, N.length) == N)) {
          var I = Gr(T.F);
          y["table:number-matrix-columns-spanned"] = I.e.c - I.s.c + 1, y["table:number-matrix-rows-spanned"] = I.e.r - I.s.r + 1;
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
            v = T.w || Ke(T.v).toISOString(), y["office:value-type"] = "date", y["office:date-value"] = Ke(T.v).toISOString(), y["table:style-name"] = "ce1";
            break;
          default:
            c.push(t);
            continue;
        }
        var k = e(v);
        if (T.l && T.l.Target) {
          var U = T.l.Target;
          U = U.charAt(0) == "#" ? "#" + Km(U.slice(1)) : U, U.charAt(0) != "#" && !U.match(/^\w+:/) && (U = "../" + U), k = oe("text:a", k, { "xlink:href": U.replace(/&/g, "&amp;") });
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
          an(h), h.ods = f;
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
    var c = [lr], o = Ma({
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
    }), l = Ma({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    f.bookType == "fods" ? (c.push("<office:document" + o + l + `>
`), c.push(ro().replace(/office:document-meta/g, "office:meta"))) : c.push("<office:document-content" + o + `>
`), a(c, s), c.push(`  <office:body>
`), c.push(`    <office:spreadsheet>
`);
    for (var h = 0; h != s.SheetNames.length; ++h) c.push(n(s.Sheets[s.SheetNames[h]], s, h));
    return c.push(`    </office:spreadsheet>
`), c.push(`  </office:body>
`), f.bookType == "fods" ? c.push("</office:document>") : c.push("</office:document-content>"), c.join("");
  };
}();
function dl(e, t) {
  if (t.bookType == "fods") return Vf(e, t);
  var r = Vs(), n = "", a = [], i = [];
  return n = "mimetype", Fe(r, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", Fe(r, n, Vf(e, t)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", Fe(r, n, b_()), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", Fe(r, n, lr + ro(
    /*::wb, opts*/
  )), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", Fe(r, n, n1(
    i
    /*, opts*/
  )), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", Fe(r, n, r1(
    a
    /*, opts*/
  )), r;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function Cn(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function Is(e) {
  return typeof TextDecoder < "u" ? new TextDecoder().decode(e) : Ge(ln(e));
}
function C_(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : Jr(bt(e));
}
function O_(e, t) {
  e:
    for (var r = 0; r <= e.length - t.length; ++r) {
      for (var n = 0; n < t.length; ++n)
        if (e[r + n] != t[n])
          continue e;
      return !0;
    }
  return !1;
}
function fn(e) {
  var t = e.reduce(function(a, i) {
    return a + i.length;
  }, 0), r = new Uint8Array(t), n = 0;
  return e.forEach(function(a) {
    r.set(a, n), n += a.length;
  }), r;
}
function $f(e) {
  return e -= e >> 1 & 1431655765, e = (e & 858993459) + (e >> 2 & 858993459), (e + (e >> 4) & 252645135) * 16843009 >>> 24;
}
function I_(e, t) {
  for (var r = (e[t + 15] & 127) << 7 | e[t + 14] >> 1, n = e[t + 14] & 1, a = t + 13; a >= t; --a)
    n = n * 256 + e[a];
  return (e[t + 15] & 128 ? -n : n) * Math.pow(10, r - 6176);
}
function N_(e, t, r) {
  var n = Math.floor(r == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(r))) + 6176 - 20, a = r / Math.pow(10, n - 6176);
  e[t + 15] |= n >> 7, e[t + 14] |= (n & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256)
    e[t + i] = a & 255;
  e[t + 15] |= r >= 0 ? 0 : 128;
}
function ja(e, t) {
  var r = t ? t[0] : 0, n = e[r] & 127;
  e:
    if (e[r++] >= 128 && (n |= (e[r] & 127) << 7, e[r++] < 128 || (n |= (e[r] & 127) << 14, e[r++] < 128) || (n |= (e[r] & 127) << 21, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 28), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 35), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 42), ++r, e[r++] < 128)))
      break e;
  return t && (t[0] = r), n;
}
function Ve(e) {
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
function nr(e) {
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
    var n = r[0], a = ja(e, r), i = a & 7;
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
        s = ja(e, r), f = e.slice(r[0], r[0] + s), r[0] += s;
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
function _r(e) {
  var t = [];
  return e.forEach(function(r, n) {
    r.forEach(function(a) {
      a.data && (t.push(Ve(n * 8 + a.type)), a.type == 2 && t.push(Ve(a.data.length)), t.push(a.data));
    });
  }), fn(t);
}
function g0(e, t) {
  return (e == null ? void 0 : e.map(function(r) {
    return t(r.data);
  })) || [];
}
function it(e) {
  for (var t, r = [], n = [0]; n[0] < e.length; ) {
    var a = ja(e, n), i = We(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: nr(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(f) {
      var c = We(f.data), o = nr(c[3][0].data);
      s.messages.push({
        meta: c,
        data: e.slice(n[0], n[0] + o)
      }), n[0] += o;
    }), (t = i[3]) != null && t[0] && (s.merge = nr(i[3][0].data) >>> 0 > 0), r.push(s);
  }
  return r;
}
function Mn(e) {
  var t = [];
  return e.forEach(function(r) {
    var n = [];
    n[1] = [{ data: Ve(r.id), type: 0 }], n[2] = [], r.merge != null && (n[3] = [{ data: Ve(+!!r.merge), type: 0 }]);
    var a = [];
    r.messages.forEach(function(s) {
      a.push(s.data), s.meta[3] = [{ type: 0, data: Ve(s.data.length) }], n[2].push({ data: _r(s.meta), type: 2 });
    });
    var i = _r(n);
    t.push(Ve(i.length)), t.push(i), a.forEach(function(s) {
      return t.push(s);
    });
  }), fn(t);
}
function B_(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = [0], n = ja(t, r), a = []; r[0] < t.length; ) {
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
      if (i == 1 ? (o = (t[r[0]] >> 2 & 7) + 4, c = (t[r[0]++] & 224) << 3, c |= t[r[0]++]) : (o = (t[r[0]++] >> 2) + 1, i == 2 ? (c = t[r[0]] | t[r[0] + 1] << 8, r[0] += 2) : (c = (t[r[0]] | t[r[0] + 1] << 8 | t[r[0] + 2] << 16 | t[r[0] + 3] << 24) >>> 0, r[0] += 4)), a = [fn(a)], c == 0)
        throw new Error("Invalid offset 0");
      if (c > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (o >= c)
        for (a.push(a[0].slice(-c)), o -= c; o >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), o -= a[a.length - 1].length;
      a.push(a[0].slice(-c, -c + o));
    }
  }
  var l = fn(a);
  if (l.length != n)
    throw new Error("Unexpected length: ".concat(l.length, " != ").concat(n));
  return l;
}
function st(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = e[r++], a = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
    r += 3, t.push(B_(n, e.slice(r, r + a))), r += a;
  }
  if (r !== e.length)
    throw new Error("data is not a valid framed stream!");
  return fn(t);
}
function Un(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = Math.min(e.length - r, 268435455), a = new Uint8Array(4);
    t.push(a);
    var i = Ve(n), s = i.length;
    t.push(i), n <= 60 ? (s++, t.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, t.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, t.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, t.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, t.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), t.push(e.slice(r, r + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, r += n;
  }
  return fn(t);
}
function D_(e, t, r, n) {
  var a = Cn(e), i = a.getUint32(4, !0), s = (n > 1 ? 12 : 8) + $f(i & (n > 1 ? 3470 : 398)) * 4, f = -1, c = -1, o = NaN, l = new Date(2001, 0, 1);
  i & 512 && (f = a.getUint32(s, !0), s += 4), s += $f(i & (n > 1 ? 12288 : 4096)) * 4, i & 16 && (c = a.getUint32(s, !0), s += 4), i & 32 && (o = a.getFloat64(s, !0), s += 8), i & 64 && (l.setTime(l.getTime() + a.getFloat64(s, !0) * 1e3), s += 8);
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
function R_(e, t, r) {
  var n = Cn(e), a = n.getUint32(8, !0), i = 12, s = -1, f = -1, c = NaN, o = NaN, l = new Date(2001, 0, 1);
  a & 1 && (c = I_(e, i), i += 16), a & 2 && (o = n.getFloat64(i, !0), i += 8), a & 4 && (l.setTime(l.getTime() + n.getFloat64(i, !0) * 1e3), i += 8), a & 8 && (f = n.getUint32(i, !0), i += 4), a & 16 && (s = n.getUint32(i, !0), i += 4);
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
function ls(e, t) {
  var r = new Uint8Array(32), n = Cn(r), a = 12, i = 0;
  switch (r[0] = 5, e.t) {
    case "n":
      r[1] = 2, N_(r, a, e.v), i |= 1, a += 16;
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
function hs(e, t) {
  var r = new Uint8Array(32), n = Cn(r), a = 12, i = 0;
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
function L_(e, t, r) {
  switch (e[0]) {
    case 0:
    case 1:
    case 2:
    case 3:
      return D_(e, t, r, e[0]);
    case 5:
      return R_(e, t, r);
    default:
      throw new Error("Unsupported payload version ".concat(e[0]));
  }
}
function Ar(e) {
  var t = We(e);
  return ja(t[1][0].data);
}
function zf(e, t) {
  var r = We(t.data), n = nr(r[1][0].data), a = r[3], i = [];
  return (a || []).forEach(function(s) {
    var f = We(s.data), c = nr(f[1][0].data) >>> 0;
    switch (n) {
      case 1:
        i[c] = Is(f[3][0].data);
        break;
      case 8:
        {
          var o = e[Ar(f[9][0].data)][0], l = We(o.data), h = e[Ar(l[1][0].data)][0], u = nr(h.meta[1][0].data);
          if (u != 2001)
            throw new Error("2000 unexpected reference to ".concat(u));
          var x = We(h.data);
          i[c] = x[3].map(function(g) {
            return Is(g.data);
          }).join("");
        }
        break;
    }
  }), i;
}
function P_(e, t) {
  var r, n, a, i, s, f, c, o, l, h, u, x, g, d, p = We(e), w = nr(p[1][0].data) >>> 0, y = nr(p[2][0].data) >>> 0, v = ((n = (r = p[8]) == null ? void 0 : r[0]) == null ? void 0 : n.data) && nr(p[8][0].data) > 0 || !1, N, T;
  if ((i = (a = p[7]) == null ? void 0 : a[0]) != null && i.data && t != 0)
    N = (f = (s = p[7]) == null ? void 0 : s[0]) == null ? void 0 : f.data, T = (o = (c = p[6]) == null ? void 0 : c[0]) == null ? void 0 : o.data;
  else if ((h = (l = p[4]) == null ? void 0 : l[0]) != null && h.data && t != 1)
    N = (x = (u = p[4]) == null ? void 0 : u[0]) == null ? void 0 : x.data, T = (d = (g = p[3]) == null ? void 0 : g[0]) == null ? void 0 : d.data;
  else
    throw "NUMBERS Tile missing ".concat(t, " cell storage");
  for (var I = v ? 4 : 1, k = Cn(N), U = [], C = 0; C < N.length / 2; ++C) {
    var D = k.getUint16(C * 2, !0);
    D < 65535 && U.push([C, D]);
  }
  if (U.length != y)
    throw "Expected ".concat(y, " cells, found ").concat(U.length);
  var M = [];
  for (C = 0; C < U.length - 1; ++C)
    M[U[C][0]] = T.subarray(U[C][1] * I, U[C + 1][1] * I);
  return U.length >= 1 && (M[U[U.length - 1][0]] = T.subarray(U[U.length - 1][1] * I)), { R: w, cells: M };
}
function M_(e, t) {
  var r, n = We(t.data), a = (r = n == null ? void 0 : n[7]) != null && r[0] ? nr(n[7][0].data) >>> 0 > 0 ? 1 : 0 : -1, i = g0(n[5], function(s) {
    return P_(s, a);
  });
  return {
    nrows: nr(n[4][0].data) >>> 0,
    data: i.reduce(function(s, f) {
      return s[f.R] || (s[f.R] = []), f.cells.forEach(function(c, o) {
        if (s[f.R][o])
          throw new Error("Duplicate cell r=".concat(f.R, " c=").concat(o));
        s[f.R][o] = c;
      }), s;
    }, [])
  };
}
function U_(e, t, r) {
  var n, a = We(t.data), i = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
  if (i.e.r = (nr(a[6][0].data) >>> 0) - 1, i.e.r < 0)
    throw new Error("Invalid row varint ".concat(a[6][0].data));
  if (i.e.c = (nr(a[7][0].data) >>> 0) - 1, i.e.c < 0)
    throw new Error("Invalid col varint ".concat(a[7][0].data));
  r["!ref"] = Ae(i);
  var s = We(a[4][0].data), f = zf(e, e[Ar(s[4][0].data)][0]), c = (n = s[17]) != null && n[0] ? zf(e, e[Ar(s[17][0].data)][0]) : [], o = We(s[3][0].data), l = 0;
  o[1].forEach(function(h) {
    var u = We(h.data), x = e[Ar(u[2][0].data)][0], g = nr(x.meta[1][0].data);
    if (g != 6002)
      throw new Error("6001 unexpected reference to ".concat(g));
    var d = M_(e, x);
    d.data.forEach(function(p, w) {
      p.forEach(function(y, v) {
        var N = ye({ r: l + w, c: v }), T = L_(y, f, c);
        T && (r[N] = T);
      });
    }), l += d.nrows;
  });
}
function W_(e, t) {
  var r = We(t.data), n = { "!ref": "A1" }, a = e[Ar(r[2][0].data)], i = nr(a[0].meta[1][0].data);
  if (i != 6001)
    throw new Error("6000 unexpected reference to ".concat(i));
  return U_(e, a[0], n), n;
}
function H_(e, t) {
  var r, n = We(t.data), a = {
    name: (r = n[1]) != null && r[0] ? Is(n[1][0].data) : "",
    sheets: []
  }, i = g0(n[2], Ar);
  return i.forEach(function(s) {
    e[s].forEach(function(f) {
      var c = nr(f.meta[1][0].data);
      c == 6e3 && a.sheets.push(W_(e, f));
    });
  }), a;
}
function V_(e, t) {
  var r = _0(), n = We(t.data), a = g0(n[1], Ar);
  if (a.forEach(function(i) {
    e[i].forEach(function(s) {
      var f = nr(s.meta[1][0].data);
      if (f == 2) {
        var c = H_(e, s);
        c.sheets.forEach(function(o, l) {
          E0(r, o, l == 0 ? c.name : c.name + "_" + l, !0);
        });
      }
    });
  }), r.SheetNames.length == 0)
    throw new Error("Empty NUMBERS file");
  return r;
}
function us(e) {
  var t, r, n, a, i = {}, s = [];
  if (e.FullPaths.forEach(function(c) {
    if (c.match(/\.iwpv2/))
      throw new Error("Unsupported password protection");
  }), e.FileIndex.forEach(function(c) {
    if (c.name.match(/\.iwa$/)) {
      var o;
      try {
        o = st(c.content);
      } catch (h) {
        return console.log("?? " + c.content.length + " " + (h.message || h));
      }
      var l;
      try {
        l = it(o);
      } catch (h) {
        return console.log("## " + (h.message || h));
      }
      l.forEach(function(h) {
        i[h.id] = h.messages, s.push(h.id);
      });
    }
  }), !s.length)
    throw new Error("File has no messages");
  var f = ((a = (n = (r = (t = i == null ? void 0 : i[1]) == null ? void 0 : t[0]) == null ? void 0 : r.meta) == null ? void 0 : n[1]) == null ? void 0 : a[0].data) && nr(i[1][0].meta[1][0].data) == 1 && i[1][0];
  if (f || s.forEach(function(c) {
    i[c].forEach(function(o) {
      var l = nr(o.meta[1][0].data) >>> 0;
      if (l == 1)
        if (!f)
          f = o;
        else
          throw new Error("Document has multiple roots");
    });
  }), !f)
    throw new Error("Cannot find Document root");
  return V_(i, f);
}
function $_(e, t, r) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && nr(e[8][0].data) > 0 || !1;
  if (f)
    throw "Math only works with normal offsets";
  for (var c = 0, o = Cn(e[7][0].data), l = 0, h = [], u = Cn(e[4][0].data), x = 0, g = [], d = 0; d < t.length; ++d) {
    if (t[d] == null) {
      o.setUint16(d * 2, 65535, !0), u.setUint16(d * 2, 65535);
      continue;
    }
    o.setUint16(d * 2, l, !0), u.setUint16(d * 2, x, !0);
    var p, w;
    switch (typeof t[d]) {
      case "string":
        p = ls({ t: "s", v: t[d] }, r), w = hs({ t: "s", v: t[d] }, r);
        break;
      case "number":
        p = ls({ t: "n", v: t[d] }, r), w = hs({ t: "n", v: t[d] }, r);
        break;
      case "boolean":
        p = ls({ t: "b", v: t[d] }, r), w = hs({ t: "b", v: t[d] }, r);
        break;
      default:
        throw new Error("Unsupported value " + t[d]);
    }
    h.push(p), l += p.length, g.push(w), x += w.length, ++c;
  }
  for (e[2][0].data = Ve(c); d < e[7][0].data.length / 2; ++d)
    o.setUint16(d * 2, 65535, !0), u.setUint16(d * 2, 65535, !0);
  return e[6][0].data = fn(h), e[3][0].data = fn(g), c;
}
function z_(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var r = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = Gr(r["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat(Ae(n)));
  var i = Di(r, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
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
      var Q = R.content, fe = st(Q), ce = it(fe);
      ce.forEach(function(ie) {
        c.push(ie.id), f[ie.id] = { deps: [], location: L, type: nr(ie.messages[0].meta[1][0].data) };
      });
    }
  }), c.sort(function(P, R) {
    return P - R;
  });
  var l = c.filter(function(P) {
    return P > 1;
  }).map(function(P) {
    return [P, Ve(P)];
  });
  o.FileIndex.map(function(P, R) {
    return [P, o.FullPaths[R]];
  }).forEach(function(P) {
    var R = P[0];
    if (P[1], !!R.name.match(/\.iwa/)) {
      var L = it(st(R.content));
      L.forEach(function(Q) {
        Q.messages.forEach(function(fe) {
          l.forEach(function(ce) {
            Q.messages.some(function(ie) {
              return nr(ie.meta[1][0].data) != 11006 && O_(ie.data, ce[1]);
            }) && f[ce[0]].deps.push(Q.id);
          });
        });
      });
    }
  });
  for (var h = ve.find(o, f[1].location), u = it(st(h.content)), x, g = 0; g < u.length; ++g) {
    var d = u[g];
    d.id == 1 && (x = d);
  }
  var p = Ar(We(x.messages[0].data)[1][0].data);
  for (h = ve.find(o, f[p].location), u = it(st(h.content)), g = 0; g < u.length; ++g)
    d = u[g], d.id == p && (x = d);
  for (p = Ar(We(x.messages[0].data)[2][0].data), h = ve.find(o, f[p].location), u = it(st(h.content)), g = 0; g < u.length; ++g)
    d = u[g], d.id == p && (x = d);
  for (p = Ar(We(x.messages[0].data)[2][0].data), h = ve.find(o, f[p].location), u = it(st(h.content)), g = 0; g < u.length; ++g)
    d = u[g], d.id == p && (x = d);
  var w = We(x.messages[0].data);
  {
    w[6][0].data = Ve(n.e.r + 1), w[7][0].data = Ve(n.e.c + 1);
    var y = Ar(w[46][0].data), v = ve.find(o, f[y].location), N = it(st(v.content));
    {
      for (var T = 0; T < N.length && N[T].id != y; ++T)
        ;
      if (N[T].id != y)
        throw "Bad ColumnRowUIDMapArchive";
      var I = We(N[T].messages[0].data);
      I[1] = [], I[2] = [], I[3] = [];
      for (var k = 0; k <= n.e.c; ++k) {
        var U = [];
        U[1] = U[2] = [{ type: 0, data: Ve(k + 420690) }], I[1].push({ type: 2, data: _r(U) }), I[2].push({ type: 0, data: Ve(k) }), I[3].push({ type: 0, data: Ve(k) });
      }
      I[4] = [], I[5] = [], I[6] = [];
      for (var C = 0; C <= n.e.r; ++C)
        U = [], U[1] = U[2] = [{ type: 0, data: Ve(C + 726270) }], I[4].push({ type: 2, data: _r(U) }), I[5].push({ type: 0, data: Ve(C) }), I[6].push({ type: 0, data: Ve(C) });
      N[T].messages[0].data = _r(I);
    }
    v.content = Un(Mn(N)), v.size = v.content.length, delete w[46];
    var D = We(w[4][0].data);
    {
      D[7][0].data = Ve(n.e.r + 1);
      var M = We(D[1][0].data), B = Ar(M[2][0].data);
      v = ve.find(o, f[B].location), N = it(st(v.content));
      {
        if (N[0].id != B)
          throw "Bad HeaderStorageBucket";
        var Y = We(N[0].messages[0].data);
        for (C = 0; C < i.length; ++C) {
          var he = We(Y[2][0].data);
          he[1][0].data = Ve(C), he[4][0].data = Ve(i[C].length), Y[2][C] = { type: Y[2][0].type, data: _r(he) };
        }
        N[0].messages[0].data = _r(Y);
      }
      v.content = Un(Mn(N)), v.size = v.content.length;
      var W = Ar(D[2][0].data);
      v = ve.find(o, f[W].location), N = it(st(v.content));
      {
        if (N[0].id != W)
          throw "Bad HeaderStorageBucket";
        for (Y = We(N[0].messages[0].data), k = 0; k <= n.e.c; ++k)
          he = We(Y[2][0].data), he[1][0].data = Ve(k), he[4][0].data = Ve(n.e.r + 1), Y[2][k] = { type: Y[2][0].type, data: _r(he) };
        N[0].messages[0].data = _r(Y);
      }
      v.content = Un(Mn(N)), v.size = v.content.length;
      var ee = Ar(D[4][0].data);
      (function() {
        for (var P = ve.find(o, f[ee].location), R = it(st(P.content)), L, Q = 0; Q < R.length; ++Q) {
          var fe = R[Q];
          fe.id == ee && (L = fe);
        }
        var ce = We(L.messages[0].data);
        {
          ce[3] = [];
          var ie = [];
          s.forEach(function(b, Xe) {
            ie[1] = [{ type: 0, data: Ve(Xe) }], ie[2] = [{ type: 0, data: Ve(1) }], ie[3] = [{ type: 2, data: C_(b) }], ce[3].push({ type: 2, data: _r(ie) });
          });
        }
        L.messages[0].data = _r(ce);
        var te = Mn(R), be = Un(te);
        P.content = be, P.size = P.content.length;
      })();
      var ne = We(D[3][0].data);
      {
        var De = ne[1][0];
        delete ne[2];
        var H = We(De.data);
        {
          var _e = Ar(H[2][0].data);
          (function() {
            for (var P = ve.find(o, f[_e].location), R = it(st(P.content)), L, Q = 0; Q < R.length; ++Q) {
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
                te += $_(b, i[be], s), b[1][0].data = Ve(be), ce[5].push({ data: _r(b), type: 2 });
              }
              ce[1] = [{ type: 0, data: Ve(n.e.c + 1) }], ce[2] = [{ type: 0, data: Ve(n.e.r + 1) }], ce[3] = [{ type: 0, data: Ve(te) }], ce[4] = [{ type: 0, data: Ve(n.e.r + 1) }];
            }
            L.messages[0].data = _r(ce);
            var Xe = Mn(R), Re = Un(Xe);
            P.content = Re, P.size = P.content.length;
          })();
        }
        De.data = _r(H);
      }
      D[3][0].data = _r(ne);
    }
    w[4][0].data = _r(D);
  }
  x.messages[0].data = _r(w);
  var Se = Mn(u), O = Un(Se);
  return h.content = O, h.size = h.content.length, o;
}
function gl(e) {
  return function(r) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      r[a[0]] === void 0 && (r[a[0]] = a[1]), a[2] === "n" && (r[a[0]] = Number(r[a[0]]));
    }
  };
}
function p0(e) {
  gl([
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
function m0(e) {
  gl([
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
function G_(e) {
  return Ne.WS.indexOf(e) > -1 ? "sheet" : e == Ne.CS ? "chart" : e == Ne.DS ? "dialog" : e == Ne.MS ? "macro" : e && e.length ? e : "sheet";
}
function j_(e, t) {
  if (!e) return 0;
  try {
    e = t.map(function(n) {
      return n.id || (n.id = n.strRelID), [n.name, e["!id"][n.id].Target, G_(e["!id"][n.id].Type)];
    });
  } catch {
    return null;
  }
  return !e || e.length === 0 ? null : e;
}
function X_(e, t, r, n, a, i, s, f, c, o, l, h) {
  try {
    i[n] = ba(qr(e, r, !0), t);
    var u = ur(e, t), x;
    switch (f) {
      case "sheet":
        x = gw(u, t, a, c, i[n], o, l, h);
        break;
      case "chart":
        if (x = pw(u, t, a, c, i[n], o, l, h), !x || !x["!drawel"]) break;
        var g = Ta(x["!drawel"].Target, t), d = Wa(g), p = tp(qr(e, g, !0), ba(qr(e, d, !0), g)), w = Ta(p, g), y = Wa(w);
        x = $v(qr(e, w, !0), w, c, ba(qr(e, y, !0), w), o, x);
        break;
      case "macro":
        x = mw(u, t, a, c, i[n], o, l, h);
        break;
      case "dialog":
        x = vw(u, t, a, c, i[n], o, l, h);
        break;
      default:
        throw new Error("Unrecognized sheet type " + f);
    }
    s[n] = x;
    var v = [];
    i && i[n] && ar(i[n]).forEach(function(N) {
      var T = "";
      if (i[n][N].Type == Ne.CMNT) {
        T = Ta(i[n][N].Target, t);
        var I = yw(ur(e, T, !0), T, c);
        if (!I || !I.length) return;
        Cf(x, I, !1);
      }
      i[n][N].Type == Ne.TCMNT && (T = Ta(i[n][N].Target, t), v = v.concat(ap(ur(e, T, !0), c)));
    }), v && v.length && Cf(x, v, !0, c.people || []);
  } catch (N) {
    if (c.WTF) throw N;
  }
}
function nt(e) {
  return e.charAt(0) == "/" ? e.slice(1) : e;
}
function Y_(e, t) {
  if (ia(), t = t || {}, p0(t), ct(e, "META-INF/manifest.xml") || ct(e, "objectdata.xml")) return Wf(e, t);
  if (ct(e, "Index/Document.iwa")) {
    if (typeof Uint8Array > "u") throw new Error("NUMBERS file parsing requires Uint8Array support");
    if (typeof us < "u") {
      if (e.FileIndex) return us(e);
      var r = ve.utils.cfb_new();
      return K0(e).forEach(function(he) {
        Fe(r, he, iu(e, he));
      }), us(r);
    }
    throw new Error("Unsupported NUMBERS file");
  }
  if (!ct(e, "[Content_Types].xml"))
    throw ct(e, "index.xml.gz") ? new Error("Unsupported NUMBERS 08 file") : ct(e, "index.xml") ? new Error("Unsupported NUMBERS 09 file") : new Error("Unsupported ZIP file");
  var n = K0(e), a = Zu(qr(e, "[Content_Types].xml")), i = !1, s, f;
  if (a.workbooks.length === 0 && (f = "xl/workbook.xml", ur(e, f, !0) && a.workbooks.push(f)), a.workbooks.length === 0) {
    if (f = "xl/workbook.bin", !ur(e, f, !0)) throw new Error("Could not find workbook");
    a.workbooks.push(f), i = !0;
  }
  a.workbooks[0].slice(-3) == "bin" && (i = !0);
  var c = {}, o = {};
  if (!t.bookSheets && !t.bookProps) {
    if (Ca = [], a.sst) try {
      Ca = Ew(ur(e, nt(a.sst)), a.sst, t);
    } catch (he) {
      if (t.WTF) throw he;
    }
    t.cellStyles && a.themes.length && (c = _w(qr(e, a.themes[0].replace(/^\//, ""), !0) || "", a.themes[0], t)), a.style && (o = ww(ur(e, nt(a.style)), a.style, c, t));
  }
  a.links.map(function(he) {
    try {
      var W = ba(qr(e, Wa(nt(he))), he);
      return Sw(ur(e, nt(he)), W, he, t);
    } catch {
    }
  });
  var l = dw(ur(e, nt(a.workbooks[0])), a.workbooks[0], t), h = {}, u = "";
  a.coreprops.length && (u = ur(e, nt(a.coreprops[0]), !0), u && (h = to(u)), a.extprops.length !== 0 && (u = ur(e, nt(a.extprops[0]), !0), u && i1(u, h, t)));
  var x = {};
  (!t.bookSheets || t.bookProps) && a.custprops.length !== 0 && (u = qr(e, nt(a.custprops[0]), !0), u && (x = f1(u, t)));
  var g = {};
  if ((t.bookSheets || t.bookProps) && (l.Sheets ? s = l.Sheets.map(function(W) {
    return W.name;
  }) : h.Worksheets && h.SheetNames.length > 0 && (s = h.SheetNames), t.bookProps && (g.Props = h, g.Custprops = x), t.bookSheets && typeof s < "u" && (g.SheetNames = s), t.bookSheets ? g.SheetNames : t.bookProps))
    return g;
  s = {};
  var d = {};
  t.bookDeps && a.calcchain && (d = Tw(ur(e, nt(a.calcchain)), a.calcchain));
  var p = 0, w = {}, y, v;
  {
    var N = l.Sheets;
    h.Worksheets = N.length, h.SheetNames = [];
    for (var T = 0; T != N.length; ++T)
      h.SheetNames[T] = N[T].name;
  }
  var I = i ? "bin" : "xml", k = a.workbooks[0].lastIndexOf("/"), U = (a.workbooks[0].slice(0, k + 1) + "_rels/" + a.workbooks[0].slice(k + 1) + ".rels").replace(/^\//, "");
  ct(e, U) || (U = "xl/_rels/workbook." + I + ".rels");
  var C = ba(qr(e, U, !0), U.replace(/_rels.*/, "s5s"));
  (a.metadata || []).length >= 1 && (t.xlmeta = kw(ur(e, nt(a.metadata[0])), a.metadata[0], t)), (a.people || []).length >= 1 && (t.people = sp(ur(e, nt(a.people[0])), t)), C && (C = j_(C, l.Sheets));
  var D = ur(e, "xl/worksheets/sheet.xml", !0) ? 1 : 0;
  e: for (p = 0; p != h.Worksheets; ++p) {
    var M = "sheet";
    if (C && C[p] ? (y = "xl/" + C[p][1].replace(/[\/]?xl\//, ""), ct(e, y) || (y = C[p][1]), ct(e, y) || (y = U.replace(/_rels\/.*$/, "") + C[p][1]), M = C[p][2]) : (y = "xl/worksheets/sheet" + (p + 1 - D) + "." + I, y = y.replace(/sheet0\./, "sheet.")), v = y.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels"), t && t.sheets != null) switch (typeof t.sheets) {
      case "number":
        if (p != t.sheets) continue e;
        break;
      case "string":
        if (h.SheetNames[p].toLowerCase() != t.sheets.toLowerCase()) continue e;
        break;
      default:
        if (Array.isArray && Array.isArray(t.sheets)) {
          for (var B = !1, Y = 0; Y != t.sheets.length; ++Y)
            typeof t.sheets[Y] == "number" && t.sheets[Y] == p && (B = 1), typeof t.sheets[Y] == "string" && t.sheets[Y].toLowerCase() == h.SheetNames[p].toLowerCase() && (B = 1);
          if (!B) continue e;
        }
    }
    X_(e, y, v, h.SheetNames[p], p, w, s, M, t, l, c, o);
  }
  return g = {
    Directory: a,
    Workbook: l,
    Props: h,
    Custprops: x,
    Deps: d,
    Sheets: s,
    SheetNames: h.SheetNames,
    Strings: Ca,
    Styles: o,
    Themes: c,
    SSF: Je(Ee)
  }, t && t.bookFiles && (e.files ? (g.keys = n, g.files = e.files) : (g.keys = [], g.files = {}, e.FullPaths.forEach(function(he, W) {
    he = he.replace(/^Root Entry[\/]/, ""), g.keys.push(he), g.files[he] = e.FileIndex[W];
  }))), t && t.bookVBA && (a.vba.length > 0 ? g.vbaraw = ur(e, nt(a.vba[0]), !0) : a.defaults && a.defaults.bin === dp && (g.vbaraw = ur(e, "xl/vbaProject.bin", !0))), g;
}
function K_(e, t) {
  var r = t || {}, n = "Workbook", a = ve.find(e, n);
  try {
    if (n = "/!DataSpaces/Version", a = ve.find(e, n), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
    if (kd(a.content), n = "/!DataSpaces/DataSpaceMap", a = ve.find(e, n), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
    var i = Fd(a.content);
    if (i.length !== 1 || i[0].comps.length !== 1 || i[0].comps[0].t !== 0 || i[0].name !== "StrongEncryptionDataSpace" || i[0].comps[0].v !== "EncryptedPackage")
      throw new Error("ECMA-376 Encrypted file bad " + n);
    if (n = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace", a = ve.find(e, n), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
    var s = bd(a.content);
    if (s.length != 1 || s[0] != "StrongEncryptionTransform")
      throw new Error("ECMA-376 Encrypted file bad " + n);
    if (n = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary", a = ve.find(e, n), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
    Od(a.content);
  } catch {
  }
  if (n = "/EncryptionInfo", a = ve.find(e, n), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
  var f = Id(a.content);
  if (n = "/EncryptedPackage", a = ve.find(e, n), !a || !a.content) throw new Error("ECMA-376 Encrypted file missing " + n);
  if (f[0] == 4 && typeof decrypt_agile < "u") return decrypt_agile(f[1], a.content, r.password || "", r);
  if (f[0] == 2 && typeof decrypt_std76 < "u") return decrypt_std76(f[1], a.content, r.password || "", r);
  throw new Error("File is password-protected");
}
function J_(e, t) {
  return t.bookType == "ods" ? dl(e, t) : t.bookType == "numbers" ? z_(e, t) : t.bookType == "xlsb" ? q_(e, t) : Z_(e, t);
}
function q_(e, t) {
  jn = 1024, e && !e.SSF && (e.SSF = Je(Ee)), e && e.SSF && (ia(), Ui(e.SSF), t.revssf = Hi(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Oa ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = t.bookType == "xlsb" ? "bin" : "xml", n = Vo.indexOf(t.bookType) > -1, a = t0();
  m0(t = t || {});
  var i = Vs(), s = "", f = 0;
  if (t.cellXfs = [], un(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", Fe(i, s, no(e.Props, t)), a.coreprops.push(s), $e(t.rels, 2, s, Ne.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var c = [], o = 0; o < e.SheetNames.length; ++o)
      (e.Workbook.Sheets[o] || {}).Hidden != 2 && c.push(e.SheetNames[o]);
    e.Props.SheetNames = c;
  }
  for (e.Props.Worksheets = e.Props.SheetNames.length, Fe(i, s, so(e.Props)), a.extprops.push(s), $e(t.rels, 3, s, Ne.EXT_PROPS), e.Custprops !== e.Props && ar(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", Fe(i, s, fo(e.Custprops)), a.custprops.push(s), $e(t.rels, 4, s, Ne.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
    var l = { "!id": {} }, h = e.Sheets[e.SheetNames[f - 1]], u = (h || {})["!type"] || "sheet";
    switch (u) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, Fe(i, s, Fw(f - 1, s, t, e, l)), a.sheets.push(s), $e(t.wbrels, -1, "worksheets/sheet" + f + "." + r, Ne.WS[0]);
    }
    if (h) {
      var x = h["!comments"], g = !1, d = "";
      x && x.length > 0 && (d = "xl/comments" + f + "." + r, Fe(i, d, Ow(x, d)), a.comments.push(d), $e(l, -1, "../comments" + f + "." + r, Ne.CMNT), g = !0), h["!legacy"] && g && Fe(i, "xl/drawings/vmlDrawing" + f + ".vml", Wo(f, h["!comments"])), delete h["!comments"], delete h["!legacy"];
    }
    l["!id"].rId1 && Fe(i, Wa(s), Jn(l));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, Fe(i, s, Cw(t.Strings, s, t)), a.strs.push(s), $e(t.wbrels, -1, "sharedStrings." + r, Ne.SST)), s = "xl/workbook." + r, Fe(i, s, Aw(e, s)), a.workbooks.push(s), $e(t.rels, 1, s, Ne.WB), s = "xl/theme/theme1.xml", Fe(i, s, c0(e.Themes, t)), a.themes.push(s), $e(t.wbrels, -1, "theme/theme1.xml", Ne.THEME), s = "xl/styles." + r, Fe(i, s, bw(e, s, t)), a.styles.push(s), $e(t.wbrels, -1, "styles." + r, Ne.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", Fe(i, s, e.vbaraw), a.vba.push(s), $e(t.wbrels, -1, "vbaProject.bin", Ne.VBA)), s = "xl/metadata." + r, Fe(i, s, Iw(s)), a.metadata.push(s), $e(t.wbrels, -1, "metadata." + r, Ne.XLMETA), Fe(i, "[Content_Types].xml", eo(a, t)), Fe(i, "_rels/.rels", Jn(t.rels)), Fe(i, "xl/_rels/workbook." + r + ".rels", Jn(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function Z_(e, t) {
  jn = 1024, e && !e.SSF && (e.SSF = Je(Ee)), e && e.SSF && (ia(), Ui(e.SSF), t.revssf = Hi(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Oa ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = "xml", n = Vo.indexOf(t.bookType) > -1, a = t0();
  m0(t = t || {});
  var i = Vs(), s = "", f = 0;
  if (t.cellXfs = [], un(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", Fe(i, s, no(e.Props, t)), a.coreprops.push(s), $e(t.rels, 2, s, Ne.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var c = [], o = 0; o < e.SheetNames.length; ++o)
      (e.Workbook.Sheets[o] || {}).Hidden != 2 && c.push(e.SheetNames[o]);
    e.Props.SheetNames = c;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, Fe(i, s, so(e.Props)), a.extprops.push(s), $e(t.rels, 3, s, Ne.EXT_PROPS), e.Custprops !== e.Props && ar(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", Fe(i, s, fo(e.Custprops)), a.custprops.push(s), $e(t.rels, 4, s, Ne.CUST_PROPS));
  var l = ["SheetJ5"];
  for (t.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
    var h = { "!id": {} }, u = e.Sheets[e.SheetNames[f - 1]], x = (u || {})["!type"] || "sheet";
    switch (x) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, Fe(i, s, Qo(f - 1, t, e, h)), a.sheets.push(s), $e(t.wbrels, -1, "worksheets/sheet" + f + "." + r, Ne.WS[0]);
    }
    if (u) {
      var g = u["!comments"], d = !1, p = "";
      if (g && g.length > 0) {
        var w = !1;
        g.forEach(function(y) {
          y[1].forEach(function(v) {
            v.T == !0 && (w = !0);
          });
        }), w && (p = "xl/threadedComments/threadedComment" + f + "." + r, Fe(i, p, ip(g, l, t)), a.threadedcomments.push(p), $e(h, -1, "../threadedComments/threadedComment" + f + "." + r, Ne.TCMNT)), p = "xl/comments" + f + "." + r, Fe(i, p, Ho(g)), a.comments.push(p), $e(h, -1, "../comments" + f + "." + r, Ne.CMNT), d = !0;
      }
      u["!legacy"] && d && Fe(i, "xl/drawings/vmlDrawing" + f + ".vml", Wo(f, u["!comments"])), delete u["!comments"], delete u["!legacy"];
    }
    h["!id"].rId1 && Fe(i, Wa(s), Jn(h));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, Fe(i, s, bo(t.Strings, t)), a.strs.push(s), $e(t.wbrels, -1, "sharedStrings." + r, Ne.SST)), s = "xl/workbook." + r, Fe(i, s, al(e)), a.workbooks.push(s), $e(t.rels, 1, s, Ne.WB), s = "xl/theme/theme1.xml", Fe(i, s, c0(e.Themes, t)), a.themes.push(s), $e(t.wbrels, -1, "theme/theme1.xml", Ne.THEME), s = "xl/styles." + r, Fe(i, s, Lo(e, t)), a.styles.push(s), $e(t.wbrels, -1, "styles." + r, Ne.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", Fe(i, s, e.vbaraw), a.vba.push(s), $e(t.wbrels, -1, "vbaProject.bin", Ne.VBA)), s = "xl/metadata." + r, Fe(i, s, Uo()), a.metadata.push(s), $e(t.wbrels, -1, "metadata." + r, Ne.XLMETA), l.length > 1 && (s = "xl/persons/person.xml", Fe(i, s, fp(l)), a.people.push(s), $e(t.wbrels, -1, "persons/person.xml", Ne.PEOPLE)), Fe(i, "[Content_Types].xml", eo(a, t)), Fe(i, "_rels/.rels", Jn(t.rels)), Fe(i, "xl/_rels/workbook." + r + ".rels", Jn(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function v0(e, t) {
  var r = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      r = Zr(e.slice(0, 12));
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
function Q_(e, t) {
  return ve.find(e, "EncryptedPackage") ? K_(e, t) : cl(e, t);
}
function eE(e, t) {
  var r, n = e, a = t || {};
  return a.type || (a.type = Ce && Buffer.isBuffer(e) ? "buffer" : "base64"), r = Cc(n, a), Y_(r, a);
}
function pl(e, t) {
  var r = 0;
  e: for (; r < e.length; ) switch (e.charCodeAt(r)) {
    case 10:
    case 13:
    case 32:
      ++r;
      break;
    case 60:
      return Cs(e.slice(r), t);
    default:
      break e;
  }
  return ea.to_workbook(e, t);
}
function rE(e, t) {
  var r = "", n = v0(e, t);
  switch (t.type) {
    case "base64":
      r = Zr(e);
      break;
    case "binary":
      r = e;
      break;
    case "buffer":
      r = e.toString("binary");
      break;
    case "array":
      r = kn(e);
      break;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return n[0] == 239 && n[1] == 187 && n[2] == 191 && (r = Ge(r)), t.type = "binary", pl(r, t);
}
function tE(e, t) {
  var r = e;
  return t.type == "base64" && (r = Zr(r)), r = Da.utils.decode(1200, r.slice(2), "str"), t.type = "binary", pl(r, t);
}
function nE(e) {
  return e.match(/[^\x00-\x7F]/) ? bt(e) : e;
}
function xs(e, t, r, n) {
  return n ? (r.type = "string", ea.to_workbook(e, r)) : ea.to_workbook(t, r);
}
function Ns(e, t) {
  Ps();
  var r = t || {};
  if (typeof ArrayBuffer < "u" && e instanceof ArrayBuffer) return Ns(new Uint8Array(e), (r = Je(r), r.type = "array", r));
  typeof Uint8Array < "u" && e instanceof Uint8Array && !r.type && (r.type = typeof Deno < "u" ? "buffer" : "array");
  var n = e, a = [0, 0, 0, 0], i = !1;
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), Zn = {}, r.dateNF && (Zn.dateNF = r.dateNF), r.type || (r.type = Ce && Buffer.isBuffer(e) ? "buffer" : "base64"), r.type == "file" && (r.type = Ce ? "buffer" : "binary", n = qh(e), typeof Uint8Array < "u" && !Ce && (r.type = "array")), r.type == "string" && (i = !0, r.type = "binary", r.codepage = 65001, n = nE(e)), r.type == "array" && typeof Uint8Array < "u" && e instanceof Uint8Array && typeof ArrayBuffer < "u") {
    var s = new ArrayBuffer(3), f = new Uint8Array(s);
    if (f.foo = "bar", !f.foo)
      return r = Je(r), r.type = "array", Ns(Ms(n), r);
  }
  switch ((a = v0(n, r))[0]) {
    case 208:
      if (a[1] === 207 && a[2] === 17 && a[3] === 224 && a[4] === 161 && a[5] === 177 && a[6] === 26 && a[7] === 225) return Q_(ve.read(n, r), r);
      break;
    case 9:
      if (a[1] <= 8) return cl(n, r);
      break;
    case 60:
      return Cs(n, r);
    case 73:
      if (a[1] === 73 && a[2] === 42 && a[3] === 0) throw new Error("TIFF Image File is not a spreadsheet");
      if (a[1] === 68) return cd(n, r);
      break;
    case 84:
      if (a[1] === 65 && a[2] === 66 && a[3] === 76) return Ao.to_workbook(n, r);
      break;
    case 80:
      return a[1] === 75 && a[2] < 9 && a[3] < 9 ? eE(n, r) : xs(e, n, r, i);
    case 239:
      return a[3] === 60 ? Cs(n, r) : xs(e, n, r, i);
    case 255:
      if (a[1] === 254)
        return tE(n, r);
      if (a[1] === 0 && a[2] === 2 && a[3] === 0) return yn.to_workbook(n, r);
      break;
    case 0:
      if (a[1] === 0 && (a[2] >= 2 && a[3] === 0 || a[2] === 0 && (a[3] === 8 || a[3] === 9)))
        return yn.to_workbook(n, r);
      break;
    case 3:
    case 131:
    case 139:
    case 140:
      return bs.to_workbook(n, r);
    case 123:
      if (a[1] === 92 && a[2] === 114 && a[3] === 116) return Bo.to_workbook(n, r);
      break;
    case 10:
    case 13:
    case 32:
      return rE(n, r);
    case 137:
      if (a[1] === 80 && a[2] === 78 && a[3] === 71) throw new Error("PNG Image File is not a spreadsheet");
      break;
  }
  return fd.indexOf(a[0]) > -1 && a[2] <= 12 && a[3] <= 31 ? bs.to_workbook(n, r) : xs(e, n, r, i);
}
function ml(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return Ka(t.file, ve.write(e, { type: Ce ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return ve.write(e, t);
}
function aE(e, t) {
  var r = Je(t || {}), n = J_(e, r);
  return iE(n, r);
}
function iE(e, t) {
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
    a = new Uint8Array(Mi(a));
  }
  return t.password && typeof encrypt_agile < "u" ? ml(encrypt_agile(a, t.password), t) : t.type === "file" ? Ka(t.file, a) : t.type == "string" ? Ge(
    /*::(*/
    a
    /*:: :any)*/
  ) : a;
}
function sE(e, t) {
  var r = t || {}, n = n_(e, r);
  return ml(n, r);
}
function Ft(e, t, r) {
  r || (r = "");
  var n = r + e;
  switch (t.type) {
    case "base64":
      return Ra(bt(n));
    case "binary":
      return bt(n);
    case "string":
      return e;
    case "file":
      return Ka(t.file, n, "utf8");
    case "buffer":
      return Ce ? Gt(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : Ft(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function fE(e, t) {
  switch (t.type) {
    case "base64":
      return Ra(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return Ka(t.file, e, "binary");
    case "buffer":
      return Ce ? Gt(e, "binary") : e.split("").map(function(r) {
        return r.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function vi(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var r = "", n = 0; n < e.length; ++n) r += String.fromCharCode(e[n]);
      return t.type == "base64" ? Ra(r) : t.type == "string" ? Ge(r) : r;
    case "file":
      return Ka(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function vl(e, t) {
  Ps(), Qv(e);
  var r = Je(t || {});
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), r.type == "array") {
    r.type = "binary";
    var n = vl(e, r);
    return r.type = "array", Mi(n);
  }
  var a = 0;
  if (r.sheet && (typeof r.sheet == "number" ? a = r.sheet : a = e.SheetNames.indexOf(r.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
  switch (r.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return Ft(Jw(e, r), r);
    case "slk":
    case "sylk":
      return Ft(ko.from_sheet(e.Sheets[e.SheetNames[a]]), r);
    case "htm":
    case "html":
      return Ft(ll(e.Sheets[e.SheetNames[a]], r), r);
    case "txt":
      return fE(wl(e.Sheets[e.SheetNames[a]], r), r);
    case "csv":
      return Ft(w0(e.Sheets[e.SheetNames[a]], r), r, "\uFEFF");
    case "dif":
      return Ft(Ao.from_sheet(e.Sheets[e.SheetNames[a]]), r);
    case "dbf":
      return vi(bs.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "prn":
      return Ft(ea.from_sheet(e.Sheets[e.SheetNames[a]]), r);
    case "rtf":
      return Ft(Bo.from_sheet(e.Sheets[e.SheetNames[a]]), r);
    case "eth":
      return Ft(Fo.from_sheet(e.Sheets[e.SheetNames[a]]), r);
    case "fods":
      return Ft(dl(e, r), r);
    case "wk1":
      return vi(yn.sheet_to_wk1(e.Sheets[e.SheetNames[a]], r), r);
    case "wk3":
      return vi(yn.book_to_wk3(e, r), r);
    case "biff2":
      r.biff || (r.biff = 2);
    case "biff3":
      r.biff || (r.biff = 3);
    case "biff4":
      return r.biff || (r.biff = 4), vi(ol(e, r), r);
    case "biff5":
      r.biff || (r.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return r.biff || (r.biff = 8), sE(e, r);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return aE(e, r);
    default:
      throw new Error("Unrecognized bookType |" + r.bookType + "|");
  }
}
function cE(e, t, r, n, a, i, s, f) {
  var c = or(r), o = f.defval, l = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"), h = !0, u = a === 1 ? [] : {};
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
        u[i[x]] = l && (g.t !== "n" || g.t === "n" && f.rawNumbers !== !1) ? d : $t(g, d, f);
      d != null && (h = !1);
    }
  }
  return { row: u, isempty: h };
}
function Di(e, t) {
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
  var h = or(c.s.r), u = [], x = [], g = 0, d = 0, p = Array.isArray(e), w = c.s.r, y = 0, v = {};
  p && !e[w] && (e[w] = []);
  var N = o.skipHidden && e["!cols"] || [], T = o.skipHidden && e["!rows"] || [];
  for (y = c.s.c; y <= c.e.c; ++y)
    if (!(N[y] || {}).hidden)
      switch (u[y] = er(y), r = p ? e[w][y] : e[u[y] + h], n) {
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
          if (r == null && (r = { w: "__EMPTY", t: "s" }), f = s = $t(r, null, o), d = v[s] || 0, !d) v[s] = 1;
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
      var I = cE(e, c, w, u, n, i, p, o);
      (I.isempty === !1 || (n === 1 ? o.blankrows !== !1 : o.blankrows)) && (x[g++] = I.row);
    }
  return x.length = g, x;
}
var Gf = /"/g;
function oE(e, t, r, n, a, i, s, f) {
  for (var c = !0, o = [], l = "", h = or(r), u = t.s.c; u <= t.e.c; ++u)
    if (n[u]) {
      var x = f.dense ? (e[r] || [])[u] : e[n[u] + h];
      if (x == null) l = "";
      else if (x.v != null) {
        c = !1, l = "" + (f.rawNumbers && x.t == "n" ? x.v : $t(x, null, f));
        for (var g = 0, d = 0; g !== l.length; ++g) if ((d = l.charCodeAt(g)) === a || d === i || d === 34 || f.forceQuotes) {
          l = '"' + l.replace(Gf, '""') + '"';
          break;
        }
        l == "ID" && (l = '"ID"');
      } else x.f != null && !x.F ? (c = !1, l = "=" + x.f, l.indexOf(",") >= 0 && (l = '"' + l.replace(Gf, '""') + '"')) : l = "";
      o.push(l);
    }
  return f.blankrows === !1 && c ? null : o.join(s);
}
function w0(e, t) {
  var r = [], n = t ?? {};
  if (e == null || e["!ref"] == null) return "";
  var a = Me(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), f = n.RS !== void 0 ? n.RS : `
`, c = f.charCodeAt(0), o = new RegExp((i == "|" ? "\\|" : i) + "+$"), l = "", h = [];
  n.dense = Array.isArray(e);
  for (var u = n.skipHidden && e["!cols"] || [], x = n.skipHidden && e["!rows"] || [], g = a.s.c; g <= a.e.c; ++g) (u[g] || {}).hidden || (h[g] = er(g));
  for (var d = 0, p = a.s.r; p <= a.e.r; ++p)
    (x[p] || {}).hidden || (l = oE(e, a, p, h, s, c, i, n), l != null && (n.strip && (l = l.replace(o, "")), (l || n.blankrows !== !1) && r.push((d++ ? f : "") + l)));
  return delete n.dense, r.join("");
}
function wl(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var r = w0(e, t);
  return r;
}
function lE(e) {
  var t = "", r, n = "";
  if (e == null || e["!ref"] == null) return [];
  var a = Me(e["!ref"]), i = "", s = [], f, c = [], o = Array.isArray(e);
  for (f = a.s.c; f <= a.e.c; ++f) s[f] = er(f);
  for (var l = a.s.r; l <= a.e.r; ++l)
    for (i = or(l), f = a.s.c; f <= a.e.c; ++f)
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
function _l(e, t, r) {
  var n = r || {}, a = +!n.skipHeader, i = e || {}, s = 0, f = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number") s = n.origin;
    else {
      var c = typeof n.origin == "string" ? rr(n.origin) : n.origin;
      s = c.r, f = c.c;
    }
  var o, l = { s: { c: 0, r: 0 }, e: { c: f, r: s + t.length - 1 + a } };
  if (i["!ref"]) {
    var h = Me(i["!ref"]);
    l.e.c = Math.max(l.e.c, h.e.c), l.e.r = Math.max(l.e.r, h.e.r), s == -1 && (s = h.e.r + 1, l.e.r = s + t.length - 1 + a);
  } else
    s == -1 && (s = 0, l.e.r = t.length - 1 + a);
  var u = n.header || [], x = 0;
  t.forEach(function(d, p) {
    ar(d).forEach(function(w) {
      (x = u.indexOf(w)) == -1 && (u[x = u.length] = w);
      var y = d[w], v = "z", N = "", T = ye({ c: f + x, r: s + p + a });
      o = Xa(i, T), y && typeof y == "object" && !(y instanceof Date) ? i[T] = y : (typeof y == "number" ? v = "n" : typeof y == "boolean" ? v = "b" : typeof y == "string" ? v = "s" : y instanceof Date ? (v = "d", n.cellDates || (v = "n", y = pr(y)), N = n.dateNF || Ee[14]) : y === null && n.nullError && (v = "e", y = 0), o ? (o.t = v, o.v = y, delete o.w, delete o.R, N && (o.z = N)) : i[T] = o = { t: v, v: y }, N && (o.z = N));
    });
  }), l.e.c = Math.max(l.e.c, f + u.length - 1);
  var g = or(s);
  if (a) for (x = 0; x < u.length; ++x) i[er(x + f) + g] = { t: "s", v: u[x] };
  return i["!ref"] = Ae(l), i;
}
function hE(e, t) {
  return _l(null, e, t);
}
function Xa(e, t, r) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var n = rr(t);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? Xa(e, ye(t)) : Xa(e, ye({ r: t, c: r || 0 }));
}
function uE(e, t) {
  if (typeof t == "number") {
    if (t >= 0 && e.SheetNames.length > t) return t;
    throw new Error("Cannot find sheet # " + t);
  } else if (typeof t == "string") {
    var r = e.SheetNames.indexOf(t);
    if (r > -1) return r;
    throw new Error("Cannot find sheet name |" + t + "|");
  } else throw new Error("Cannot find sheet |" + t + "|");
}
function _0() {
  return { SheetNames: [], Sheets: {} };
}
function E0(e, t, r, n) {
  var a = 1;
  if (!r) for (; a <= 65535 && e.SheetNames.indexOf(r = "Sheet" + a) != -1; ++a, r = void 0) ;
  if (!r || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (n && e.SheetNames.indexOf(r) >= 0) {
    var i = r.match(/(^.*?)(\d+)$/);
    a = i && +i[2] || 0;
    var s = i && i[1] || r;
    for (++a; a <= 65535 && e.SheetNames.indexOf(r = s + a) != -1; ++a) ;
  }
  if (nl(r), e.SheetNames.indexOf(r) >= 0) throw new Error("Worksheet with name |" + r + "| already exists!");
  return e.SheetNames.push(r), e.Sheets[r] = t, r;
}
function xE(e, t, r) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = uE(e, t);
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
function dE(e, t) {
  return e.z = t, e;
}
function El(e, t, r) {
  return t ? (e.l = { Target: t }, r && (e.l.Tooltip = r)) : delete e.l, e;
}
function gE(e, t, r) {
  return El(e, "#" + t, r);
}
function pE(e, t, r) {
  e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" });
}
function mE(e, t, r, n) {
  for (var a = typeof t != "string" ? t : Me(t), i = typeof t == "string" ? t : Ae(t), s = a.s.r; s <= a.e.r; ++s) for (var f = a.s.c; f <= a.e.c; ++f) {
    var c = Xa(e, s, f);
    c.t = "n", c.F = i, delete c.v, s == a.s.r && f == a.s.c && (c.f = r, n && (c.D = !0));
  }
  return e;
}
var wi = {
  encode_col: er,
  encode_row: or,
  encode_cell: ye,
  encode_range: Ae,
  decode_col: Js,
  decode_row: Ks,
  split_cell: Cu,
  decode_cell: rr,
  decode_range: Gr,
  format_cell: $t,
  sheet_add_aoa: Xc,
  sheet_add_json: _l,
  sheet_add_dom: hl,
  aoa_to_sheet: sa,
  json_to_sheet: hE,
  table_to_sheet: ul,
  table_to_book: k_,
  sheet_to_csv: w0,
  sheet_to_txt: wl,
  sheet_to_json: Di,
  sheet_to_html: ll,
  sheet_to_formulae: lE,
  sheet_to_row_object_array: Di,
  sheet_get_cell: Xa,
  book_new: _0,
  book_append_sheet: E0,
  book_set_sheet_visibility: xE,
  cell_set_number_format: dE,
  cell_set_hyperlink: El,
  cell_set_internal_link: gE,
  cell_add_comment: pE,
  sheet_set_array_formula: mE,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
const vE = (() => {
  const e = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Uint8Array.prototype), Symbol.toStringTag).get;
  return (t) => e.call(t);
})();
function ta(e) {
  return vE(e) === "Uint8Array";
}
function y0(e) {
  return typeof e == "object" && e != null && Symbol.toStringTag in e && (e[Symbol.toStringTag] === "ArrayBuffer" || e[Symbol.toStringTag] === "SharedArrayBuffer");
}
function Ri(e) {
  return e instanceof RegExp || Object.prototype.toString.call(e) === "[object RegExp]";
}
function Xi(e) {
  return typeof e == "object" && e != null && Symbol.toStringTag in e && e[Symbol.toStringTag] === "Map";
}
function Li(e) {
  return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
}
function Qr(e, t) {
  return JSON.stringify(e, (r, n) => typeof n == "bigint" ? { $numberLong: `${n}` } : Xi(n) ? Object.fromEntries(n) : n);
}
function wE(e) {
  if (e != null && typeof e == "object" && "stylize" in e && typeof e.stylize == "function")
    return e.stylize;
}
const ni = 7, Yi = Symbol.for("@@mdb.bson.version"), ai = 2147483647, ii = -2147483648, yl = Math.pow(2, 63) - 1, Tl = -Math.pow(2, 63), Sl = Math.pow(2, 53), kl = -Math.pow(2, 53), T0 = 1, Al = 2, Ba = 3, Sa = 4, S0 = 5, _E = 6, Fl = 7, bl = 8, Cl = 9, k0 = 10, Pi = 11, EE = 12, A0 = 13, Ol = 14, Ei = 15, Ya = 16, Il = 17, F0 = 18, Nl = 19, Bl = 255, Dl = 127, yE = 0, b0 = 4, TE = Object.freeze({
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
class Ki extends J {
  get name() {
    return "BSONVersionError";
  }
  constructor() {
    super(`Unsupported BSON version, bson types must be from bson ${ni}.x.x`);
  }
}
class Bs extends J {
  get name() {
    return "BSONRuntimeError";
  }
  constructor(t) {
    super(t);
  }
}
class Lt extends J {
  constructor(r, n, a) {
    super(`${r}. offset: ${n}`, a);
    ge(this, "offset");
    this.offset = n;
  }
  get name() {
    return "BSONOffsetError";
  }
}
let jf, Xf;
function Rl(e, t, r, n) {
  if (n) {
    jf ?? (jf = new TextDecoder("utf8", { fatal: !0 }));
    try {
      return jf.decode(e.subarray(t, r));
    } catch (a) {
      throw new J("Invalid UTF-8 string in BSON document", { cause: a });
    }
  }
  return Xf ?? (Xf = new TextDecoder("utf8", { fatal: !1 })), Xf.decode(e.subarray(t, r));
}
function Ll(e, t, r) {
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
function SE(e, t, r) {
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
function kE(e) {
  return ot.fromNumberArray(Array.from({ length: e }, () => Math.floor(Math.random() * 256)));
}
function AE(e) {
  return crypto.getRandomValues(ot.allocate(e));
}
const FE = (() => {
  const { crypto: e } = globalThis;
  return e != null && typeof e.getRandomValues == "function" ? AE : kE;
})(), ot = {
  isUint8Array: ta,
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
    return ot.toLocalBufferType(e).compare(t);
  },
  concat(e) {
    return Buffer.concat(e);
  },
  copy(e, t, r, n, a) {
    return ot.toLocalBufferType(e).copy(t, r ?? 0, n ?? 0, a ?? e.length);
  },
  equals(e, t) {
    return ot.toLocalBufferType(e).equals(t);
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
    return ot.toLocalBufferType(e).toString("base64");
  },
  fromISO88591(e) {
    return Buffer.from(e, "binary");
  },
  toISO88591(e) {
    return ot.toLocalBufferType(e).toString("binary");
  },
  fromHex(e) {
    return Buffer.from(e, "hex");
  },
  toHex(e) {
    return ot.toLocalBufferType(e).toString("hex");
  },
  toUTF8(e, t, r, n) {
    const a = r - t <= 20 ? Ll(e, t, r) : null;
    if (a != null)
      return a;
    const i = ot.toLocalBufferType(e).toString("utf8", t, r);
    if (n) {
      for (let s = 0; s < i.length; s++)
        if (i.charCodeAt(s) === 65533) {
          Rl(e, t, r, !0);
          break;
        }
    }
    return i;
  },
  utf8ByteLength(e) {
    return Buffer.byteLength(e, "utf8");
  },
  encodeUTF8Into(e, t, r) {
    const n = SE(e, t, r);
    return n ?? ot.toLocalBufferType(e).write(t, r, void 0, "utf8");
  },
  randomBytes: FE,
  swap32(e) {
    return ot.toLocalBufferType(e).swap32();
  }
};
function bE() {
  const { navigator: e } = globalThis;
  return typeof e == "object" && e.product === "ReactNative";
}
function CE(e) {
  if (e < 0)
    throw new RangeError(`The argument 'byteLength' is invalid. Received ${e}`);
  return wn.fromNumberArray(Array.from({ length: e }, () => Math.floor(Math.random() * 256)));
}
const OE = (() => {
  var t;
  const { crypto: e } = globalThis;
  if (e != null && typeof e.getRandomValues == "function")
    return (r) => e.getRandomValues(wn.allocate(r));
  if (bE()) {
    const { console: r } = globalThis;
    (t = r == null ? void 0 : r.warn) == null || t.call(r, "BSON: For React Native please polyfill crypto.getRandomValues, e.g. using: https://www.npmjs.com/package/react-native-get-random-values.");
  }
  return CE;
})(), Yf = /(\d|[a-f])/i, wn = {
  isUint8Array: ta,
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
    return wn.allocate(e);
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
      return wn.allocate(0);
    let t = 0;
    for (const a of e)
      t += a.length;
    const r = wn.allocate(t);
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
    return btoa(wn.toISO88591(e));
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
      if (!Yf.test(a) || !Yf.test(i))
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
    const a = r - t <= 20 ? Ll(e, t, r) : null;
    return a ?? Rl(e, t, r, n);
  },
  utf8ByteLength(e) {
    return new TextEncoder().encode(e).byteLength;
  },
  encodeUTF8Into(e, t, r) {
    const n = new TextEncoder().encode(t);
    return e.set(n, r), n.byteLength;
  },
  randomBytes: OE,
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
var hc;
const IE = typeof Buffer == "function" && ((hc = Buffer.prototype) == null ? void 0 : hc._isBuffer) !== !0, X = IE ? ot : wn, ca = Symbol.for("@@mdb.bson.type");
class et {
  get [ca]() {
    return this._bsontype;
  }
  get [Yi]() {
    return ni;
  }
  [Symbol.for("nodejs.util.inspect.custom")](t, r, n) {
    return this.inspect(t, r, n);
  }
}
const Xn = new Float64Array(1), Le = new Uint8Array(Xn.buffer, 0, 8);
Xn[0] = -1;
const ds = Le[7] === 0, we = {
  isBigEndian: ds,
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
  getFloat64LE: ds ? (e, t) => (Le[7] = e[t], Le[6] = e[t + 1], Le[5] = e[t + 2], Le[4] = e[t + 3], Le[3] = e[t + 4], Le[2] = e[t + 5], Le[1] = e[t + 6], Le[0] = e[t + 7], Xn[0]) : (e, t) => (Le[0] = e[t], Le[1] = e[t + 1], Le[2] = e[t + 2], Le[3] = e[t + 3], Le[4] = e[t + 4], Le[5] = e[t + 5], Le[6] = e[t + 6], Le[7] = e[t + 7], Xn[0]),
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
  setFloat64LE: ds ? (e, t, r) => (Xn[0] = r, e[t] = Le[7], e[t + 1] = Le[6], e[t + 2] = Le[5], e[t + 3] = Le[4], e[t + 4] = Le[3], e[t + 5] = Le[2], e[t + 6] = Le[1], e[t + 7] = Le[0], 8) : (e, t, r) => (Xn[0] = r, e[t] = Le[0], e[t + 1] = Le[1], e[t + 2] = Le[2], e[t + 3] = Le[3], e[t + 4] = Le[4], e[t + 5] = Le[5], e[t + 6] = Le[6], e[t + 7] = Le[7], 8)
}, Ie = class Ie extends et {
  constructor(r, n) {
    super();
    ge(this, "buffer");
    ge(this, "sub_type");
    ge(this, "position");
    if (r != null && typeof r == "string" && !ArrayBuffer.isView(r) && !y0(r) && !Array.isArray(r))
      throw new J("Binary can only be constructed from Uint8Array or number[]");
    this.sub_type = (n ?? Ie.BSON_BINARY_SUBTYPE_DEFAULT) & 255, r == null ? (this.buffer = X.allocate(Ie.BUFFER_SIZE), this.position = 0) : (this.buffer = Array.isArray(r) ? X.fromNumberArray(r) : X.toLocalBufferType(r), this.position = this.buffer.byteLength);
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
      const a = X.allocate(Ie.BUFFER_SIZE + this.buffer.length);
      a.set(this.buffer, 0), this.buffer = a, this.buffer[this.position++] = n;
    }
  }
  write(r, n) {
    if (n = typeof n == "number" ? n : this.position, this.buffer.byteLength < n + r.length) {
      const a = X.allocate(this.buffer.byteLength + r.length);
      a.set(this.buffer, 0), this.buffer = a;
    }
    if (ArrayBuffer.isView(r))
      this.buffer.set(X.toLocalBufferType(r), n), this.position = n + r.byteLength > this.position ? n + r.length : this.position;
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
    return X.toBase64(this.buffer.subarray(0, this.position));
  }
  toString(r) {
    return r === "hex" ? X.toHex(this.buffer.subarray(0, this.position)) : r === "base64" ? X.toBase64(this.buffer.subarray(0, this.position)) : r === "utf8" || r === "utf-8" ? X.toUTF8(this.buffer, 0, this.position, !1) : X.toUTF8(this.buffer, 0, this.position, !1);
  }
  toExtendedJSON(r) {
    r = r || {}, this.sub_type === Ie.SUBTYPE_VECTOR && Rt(this);
    const n = X.toBase64(this.buffer), a = Number(this.sub_type).toString(16);
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
    if (this.sub_type === Ie.SUBTYPE_UUID)
      return new kr(this.buffer.subarray(0, this.position));
    throw new J(`Binary sub_type "${this.sub_type}" (${typeof this.sub_type}) is not supported for converting to UUID. Only 0x${Ie.SUBTYPE_UUID.toString(16).padStart(2, "0")} is currently supported.`);
  }
  static createFromHexString(r, n) {
    return new Ie(X.fromHex(r), n);
  }
  static createFromBase64(r, n) {
    return new Ie(X.fromBase64(r), n);
  }
  static fromExtendedJSON(r, n) {
    n = n || {};
    let a, i;
    if ("$binary" in r ? n.legacy && typeof r.$binary == "string" && "$type" in r ? (i = r.$type ? parseInt(r.$type, 16) : 0, a = X.fromBase64(r.$binary)) : typeof r.$binary != "string" && (i = r.$binary.subType ? parseInt(r.$binary.subType, 16) : 0, a = X.fromBase64(r.$binary.base64)) : "$uuid" in r && (i = 4, a = kr.bytesFromString(r.$uuid)), !a)
      throw new J(`Unexpected Binary Extended JSON format ${JSON.stringify(r)}`);
    return i === b0 ? new kr(a) : new Ie(a, i);
  }
  inspect(r, n, a) {
    a ?? (a = Qr);
    const i = X.toBase64(this.buffer.subarray(0, this.position)), s = a(i, n), f = a(this.sub_type, n);
    return `Binary.createFromBase64(${s}, ${f})`;
  }
  toInt8Array() {
    if (this.sub_type !== Ie.SUBTYPE_VECTOR)
      throw new J("Binary sub_type is not Vector");
    if (this.buffer[0] !== Ie.VECTOR_TYPE.Int8)
      throw new J("Binary datatype field is not Int8");
    return Rt(this), new Int8Array(this.buffer.buffer.slice(this.buffer.byteOffset + 2, this.buffer.byteOffset + this.position));
  }
  toFloat32Array() {
    if (this.sub_type !== Ie.SUBTYPE_VECTOR)
      throw new J("Binary sub_type is not Vector");
    if (this.buffer[0] !== Ie.VECTOR_TYPE.Float32)
      throw new J("Binary datatype field is not Float32");
    Rt(this);
    const r = new Uint8Array(this.buffer.buffer.slice(this.buffer.byteOffset + 2, this.buffer.byteOffset + this.position));
    return we.isBigEndian && X.swap32(r), new Float32Array(r.buffer);
  }
  toPackedBits() {
    if (this.sub_type !== Ie.SUBTYPE_VECTOR)
      throw new J("Binary sub_type is not Vector");
    if (this.buffer[0] !== Ie.VECTOR_TYPE.PackedBit)
      throw new J("Binary datatype field is not packed bit");
    return Rt(this), new Uint8Array(this.buffer.buffer.slice(this.buffer.byteOffset + 2, this.buffer.byteOffset + this.position));
  }
  toBits() {
    if (this.sub_type !== Ie.SUBTYPE_VECTOR)
      throw new J("Binary sub_type is not Vector");
    if (this.buffer[0] !== Ie.VECTOR_TYPE.PackedBit)
      throw new J("Binary datatype field is not packed bit");
    Rt(this);
    const n = (this.length() - 2) * 8 - this.buffer[1], a = new Int8Array(n);
    for (let i = 0; i < a.length; i++) {
      const s = i / 8 | 0, f = this.buffer[s + 2], c = 7 - i % 8, o = f >> c & 1;
      a[i] = o;
    }
    return a;
  }
  static fromInt8Array(r) {
    const n = X.allocate(r.byteLength + 2);
    n[0] = Ie.VECTOR_TYPE.Int8, n[1] = 0;
    const a = new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    n.set(a, 2);
    const i = new this(n, this.SUBTYPE_VECTOR);
    return Rt(i), i;
  }
  static fromFloat32Array(r) {
    const n = X.allocate(r.byteLength + 2);
    n[0] = Ie.VECTOR_TYPE.Float32, n[1] = 0;
    const a = new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    n.set(a, 2), we.isBigEndian && X.swap32(new Uint8Array(n.buffer, 2));
    const i = new this(n, this.SUBTYPE_VECTOR);
    return Rt(i), i;
  }
  static fromPackedBits(r, n = 0) {
    const a = X.allocate(r.byteLength + 2);
    a[0] = Ie.VECTOR_TYPE.PackedBit, a[1] = n, a.set(r, 2);
    const i = new this(a, this.SUBTYPE_VECTOR);
    return Rt(i), i;
  }
  static fromBits(r) {
    const n = r.length + 7 >>> 3, a = new Uint8Array(n + 2);
    a[0] = Ie.VECTOR_TYPE.PackedBit;
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
    return new this(a, Ie.SUBTYPE_VECTOR);
  }
};
ge(Ie, "BSON_BINARY_SUBTYPE_DEFAULT", 0), ge(Ie, "BUFFER_SIZE", 256), ge(Ie, "SUBTYPE_DEFAULT", 0), ge(Ie, "SUBTYPE_FUNCTION", 1), ge(Ie, "SUBTYPE_BYTE_ARRAY", 2), ge(Ie, "SUBTYPE_UUID_OLD", 3), ge(Ie, "SUBTYPE_UUID", 4), ge(Ie, "SUBTYPE_MD5", 5), ge(Ie, "SUBTYPE_ENCRYPTED", 6), ge(Ie, "SUBTYPE_COLUMN", 7), ge(Ie, "SUBTYPE_SENSITIVE", 8), ge(Ie, "SUBTYPE_VECTOR", 9), ge(Ie, "SUBTYPE_USER_DEFINED", 128), ge(Ie, "VECTOR_TYPE", Object.freeze({
  Int8: 3,
  Float32: 39,
  PackedBit: 16
}));
let cr = Ie;
function Rt(e) {
  if (e.sub_type !== cr.SUBTYPE_VECTOR)
    return;
  const t = e.position, r = e.buffer[0], n = e.buffer[1];
  if ((r === cr.VECTOR_TYPE.Float32 || r === cr.VECTOR_TYPE.Int8) && n !== 0)
    throw new J("Invalid Vector: padding must be zero for int8 and float32 vectors");
  if (r === cr.VECTOR_TYPE.Float32 && t !== 0 && t - 2 !== 0 && (t - 2) % 4 !== 0)
    throw new J("Invalid Vector: Float32 vector must contain a multiple of 4 bytes");
  if (r === cr.VECTOR_TYPE.PackedBit && n !== 0 && t === 2)
    throw new J("Invalid Vector: padding must be zero for packed bit vectors that are empty");
  if (r === cr.VECTOR_TYPE.PackedBit && n > 7)
    throw new J(`Invalid Vector: padding must be a value between 0 and 7. found: ${n}`);
}
const gs = 16, NE = /^[0-9A-F]{32}$/i, BE = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
class kr extends cr {
  constructor(t) {
    let r;
    if (t == null)
      r = kr.generate();
    else if (t instanceof kr)
      r = X.toLocalBufferType(new Uint8Array(t.buffer));
    else if (ArrayBuffer.isView(t) && t.byteLength === gs)
      r = X.toLocalBufferType(t);
    else if (typeof t == "string")
      r = kr.bytesFromString(t);
    else
      throw new J("Argument passed in UUID constructor must be a UUID, a 16 byte Buffer or a 32/36 character hex string (dashes excluded/included, format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).");
    super(r, b0);
  }
  get id() {
    return this.buffer;
  }
  set id(t) {
    this.buffer = t;
  }
  toHexString(t = !0) {
    return t ? [
      X.toHex(this.buffer.subarray(0, 4)),
      X.toHex(this.buffer.subarray(4, 6)),
      X.toHex(this.buffer.subarray(6, 8)),
      X.toHex(this.buffer.subarray(8, 10)),
      X.toHex(this.buffer.subarray(10, 16))
    ].join("-") : X.toHex(this.buffer);
  }
  toString(t) {
    return t === "hex" ? X.toHex(this.id) : t === "base64" ? X.toBase64(this.id) : this.toHexString();
  }
  toJSON() {
    return this.toHexString();
  }
  equals(t) {
    if (!t)
      return !1;
    if (t instanceof kr)
      return X.equals(t.id, this.id);
    try {
      return X.equals(new kr(t).id, this.id);
    } catch {
      return !1;
    }
  }
  toBinary() {
    return new cr(this.id, cr.SUBTYPE_UUID);
  }
  static generate() {
    const t = X.randomBytes(gs);
    return t[6] = t[6] & 15 | 64, t[8] = t[8] & 63 | 128, t;
  }
  static isValid(t) {
    return t ? typeof t == "string" ? kr.isValidUUIDString(t) : ta(t) ? t.byteLength === gs : t._bsontype === "Binary" && t.sub_type === this.SUBTYPE_UUID && t.buffer.byteLength === 16 : !1;
  }
  static createFromHexString(t) {
    const r = kr.bytesFromString(t);
    return new kr(r);
  }
  static createFromBase64(t) {
    return new kr(X.fromBase64(t));
  }
  static bytesFromString(t) {
    if (!kr.isValidUUIDString(t))
      throw new J("UUID string representation must be 32 hex digits or canonical hyphenated representation");
    return X.fromHex(t.replace(/-/g, ""));
  }
  static isValidUUIDString(t) {
    return NE.test(t) || BE.test(t);
  }
  inspect(t, r, n) {
    return n ?? (n = Qr), `new UUID(${n(this.toHexString(), r)})`;
  }
}
class cn extends et {
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
    return new cn(r.$code, r.$scope);
  }
  inspect(r, n, a) {
    a ?? (a = Qr);
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
function Pl(e) {
  return e != null && typeof e == "object" && "$id" in e && e.$id != null && "$ref" in e && typeof e.$ref == "string" && (!("$db" in e) || "$db" in e && typeof e.$db == "string");
}
class zt extends et {
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
    return delete n.$ref, delete n.$id, delete n.$db, new zt(r.$ref, r.$id, r.$db, n);
  }
  inspect(r, n, a) {
    a ?? (a = Qr);
    const i = [
      a(this.namespace, n),
      a(this.oid, n),
      ...this.db ? [a(this.db, n)] : [],
      ...Object.keys(this.fields).length > 0 ? [a(this.fields, n)] : []
    ];
    return i[1] = a === Qr ? `new ObjectId(${i[1]})` : i[1], `new DBRef(${i.join(", ")})`;
  }
}
function Ml(e) {
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
function DE(e, t) {
  t = t ?? 10;
  const r = "0123456789abcdefghijklmnopqrstuvwxyz".slice(0, t);
  return new RegExp(`[^-+${r}]`, "i").test(e) ? !1 : e;
}
let ft;
try {
  ft = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
} catch {
}
const Kf = 65536, RE = 1 << 24, Yn = Kf * Kf, Ul = Yn * Yn, Jf = Ul / 2, qf = {}, Zf = {}, LE = 20, PE = /^(\+?0|(\+|-)?[1-9][0-9]*)$/, K = class K extends et {
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
    return n ? (r >>>= 0, (s = 0 <= r && r < 256) && (i = Zf[r], i) ? i : (a = K.fromBits(r, (r | 0) < 0 ? -1 : 0, !0), s && (Zf[r] = a), a)) : (r |= 0, (s = -128 <= r && r < 128) && (i = qf[r], i) ? i : (a = K.fromBits(r, r < 0 ? -1 : 0, !1), s && (qf[r] = a), a));
  }
  static fromNumber(r, n) {
    if (isNaN(r))
      return n ? K.UZERO : K.ZERO;
    if (n) {
      if (r < 0)
        return K.UZERO;
      if (r >= Ul)
        return K.MAX_UNSIGNED_VALUE;
    } else {
      if (r <= -Jf)
        return K.MIN_VALUE;
      if (r + 1 >= Jf)
        return K.MAX_VALUE;
    }
    return r < 0 ? K.fromNumber(-r, n).neg() : K.fromBits(r % Yn | 0, r / Yn | 0, n);
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
    if (!DE(r, a))
      throw new J(`Input: '${r}' contains invalid characters for radix: ${a}`);
    const s = Ml(r), f = K._fromString(s, i, a);
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
    if (ft) {
      if (!this.unsigned && this.high === -2147483648 && r.low === -1 && r.high === -1)
        return this;
      const s = (this.unsigned ? ft.div_u : ft.div_s)(this.low, this.high, r.low, r.high);
      return K.fromBits(s, ft.get_high(), this.unsigned);
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
    if (K.isLong(r) || (r = K.fromValue(r)), ft) {
      const n = (this.unsigned ? ft.rem_u : ft.rem_s)(this.low, this.high, r.low, r.high);
      return K.fromBits(n, ft.get_high(), this.unsigned);
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
    if (K.isLong(r) || (r = K.fromValue(r)), ft) {
      const d = ft.mul(this.low, this.high, r.low, r.high);
      return K.fromBits(d, ft.get_high(), this.unsigned);
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
    return this.unsigned ? (this.high >>> 0) * Yn + (this.low >>> 0) : this.high * Yn + (this.low >>> 0);
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
    if (r.$numberLong.length > LE)
      throw new J("$numberLong string is too long");
    if (!PE.test(r.$numberLong))
      throw new J(`$numberLong string "${r.$numberLong}" is in an invalid format`);
    if (a) {
      const f = BigInt(r.$numberLong);
      return BigInt.asIntN(64, f);
    }
    const s = K.fromString(r.$numberLong);
    return i ? s.toNumber() : s;
  }
  inspect(r, n, a) {
    a ?? (a = Qr);
    const i = a(this.toString(), n), s = this.unsigned ? `, ${a(this.unsigned, n)}` : "";
    return `new Long(${i}${s})`;
  }
};
ge(K, "TWO_PWR_24", K.fromInt(RE)), ge(K, "MAX_UNSIGNED_VALUE", K.fromBits(-1, -1, !0)), ge(K, "ZERO", K.fromInt(0)), ge(K, "UZERO", K.fromInt(0, !0)), ge(K, "ONE", K.fromInt(1)), ge(K, "UONE", K.fromInt(1, !0)), ge(K, "NEG_ONE", K.fromInt(-1)), ge(K, "MAX_VALUE", K.fromBits(-1, 2147483647, !1)), ge(K, "MIN_VALUE", K.fromBits(0, -2147483648, !1));
let me = K;
const ME = /^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/, UE = /^(\+|-)?(Infinity|inf)$/i, WE = /^(\+|-)?NaN$/i, Wn = 6111, wa = -6176, Qf = 6176, ec = 34, ps = X.fromNumberArray([
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
].reverse()), rc = X.fromNumberArray([
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
].reverse()), tc = X.fromNumberArray([
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
].reverse()), HE = /^([-+])?(\d+)?$/, VE = 31, nc = 16383, $E = 30, zE = 31;
function ac(e) {
  return !isNaN(parseInt(e, 10));
}
function GE(e) {
  const t = me.fromNumber(1e9);
  let r = me.fromNumber(0);
  if (!e.parts[0] && !e.parts[1] && !e.parts[2] && !e.parts[3])
    return { quotient: e, rem: r };
  for (let n = 0; n <= 3; n++)
    r = r.shiftLeft(32), r = r.add(new me(e.parts[n], 0)), e.parts[n] = r.div(t).low, r = r.modulo(t);
  return { quotient: e, rem: r };
}
function jE(e, t) {
  if (!e && !t)
    return { high: me.fromNumber(0), low: me.fromNumber(0) };
  const r = e.shiftRightUnsigned(32), n = new me(e.getLowBits(), 0), a = t.shiftRightUnsigned(32), i = new me(t.getLowBits(), 0);
  let s = r.multiply(a), f = r.multiply(i);
  const c = n.multiply(a);
  let o = n.multiply(i);
  return s = s.add(f.shiftRightUnsigned(32)), f = new me(f.getLowBits(), 0).add(c).add(o.shiftRightUnsigned(32)), s = s.add(f.shiftRightUnsigned(32)), o = f.shiftLeft(32).add(new me(o.getLowBits(), 0)), { high: s, low: o };
}
function XE(e, t) {
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
function gt(e, t) {
  throw new J(`"${e}" is not a valid Decimal128 string - ${t}`);
}
class Mr extends et {
  constructor(r) {
    super();
    ge(this, "bytes");
    if (typeof r == "string")
      this.bytes = Mr.fromString(r).bytes;
    else if (r instanceof Uint8Array || ta(r)) {
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
    return Mr._fromString(r, { allowRounding: !1 });
  }
  static fromStringWithRounding(r) {
    return Mr._fromString(r, { allowRounding: !0 });
  }
  static _fromString(r, n) {
    let a = !1, i = !1, s = !1, f = !1, c = 0, o = 0, l = 0, h = 0, u = 0;
    const x = [0];
    let g = 0, d = 0, p = 0, w = 0, y = new me(0, 0), v = new me(0, 0), N = 0, T = 0;
    if (r.length >= 7e3)
      throw new J("" + r + " not a valid Decimal128 string");
    const I = r.match(ME), k = r.match(UE), U = r.match(WE);
    if (!I && !k && !U || r.length === 0)
      throw new J("" + r + " not a valid Decimal128 string");
    if (I) {
      const B = I[2], Y = I[4], he = I[5], W = I[6];
      Y && W === void 0 && gt(r, "missing exponent power"), Y && B === void 0 && gt(r, "missing exponent base"), Y === void 0 && (he || W) && gt(r, "missing e before exponent");
    }
    if ((r[T] === "+" || r[T] === "-") && (i = !0, a = r[T++] === "-"), !ac(r[T]) && r[T] !== ".") {
      if (r[T] === "i" || r[T] === "I")
        return new Mr(a ? rc : tc);
      if (r[T] === "N")
        return new Mr(ps);
    }
    for (; ac(r[T]) || r[T] === "."; ) {
      if (r[T] === ".") {
        s && gt(r, "contains multiple periods"), s = !0, T = T + 1;
        continue;
      }
      g < ec && (r[T] !== "0" || f) && (f || (u = o), f = !0, x[d++] = parseInt(r[T], 10), g = g + 1), f && (l = l + 1), s && (h = h + 1), o = o + 1, T = T + 1;
    }
    if (s && !o)
      throw new J("" + r + " not a valid Decimal128 string");
    if (r[T] === "e" || r[T] === "E") {
      const B = r.substr(++T).match(HE);
      if (!B || !B[2])
        return new Mr(ps);
      w = parseInt(B[0], 10), T = T + B[0].length;
    }
    if (r[T])
      return new Mr(ps);
    if (!g)
      x[0] = 0, l = 1, g = 1, c = 0;
    else if (p = g - 1, c = l, c !== 1)
      for (; r[u + c - 1 + Number(i) + Number(s)] === "0"; )
        c = c - 1;
    for (w <= h && h > w + 16384 ? w = wa : w = w - h; w > Wn; ) {
      if (p = p + 1, p >= ec) {
        if (c === 0) {
          w = Wn;
          break;
        }
        gt(r, "overflow");
      }
      w = w - 1;
    }
    if (n.allowRounding) {
      for (; w < wa || g < l; ) {
        if (p === 0 && c < g) {
          w = wa, c = 0;
          break;
        }
        if (g < l ? l = l - 1 : p = p - 1, w < Wn)
          w = w + 1;
        else {
          if (x.join("").match(/^0+$/)) {
            w = Wn;
            break;
          }
          gt(r, "overflow");
        }
      }
      if (p + 1 < c) {
        let B = o;
        s && (u = u + 1, B = B + 1), i && (u = u + 1, B = B + 1);
        const Y = parseInt(r[u + p + 1], 10);
        let he = 0;
        if (Y >= 5 && (he = 1, Y === 5)) {
          he = x[p] % 2 === 1 ? 1 : 0;
          for (let W = u + p + 2; W < B; W++)
            if (parseInt(r[W], 10)) {
              he = 1;
              break;
            }
        }
        if (he) {
          let W = p;
          for (; W >= 0 && ++x[W] > 9; W--)
            if (x[W] = 0, W === 0)
              if (w < Wn)
                w = w + 1, x[W] = 1;
              else
                return new Mr(a ? rc : tc);
        }
      }
    } else {
      for (; w < wa || g < l; ) {
        if (p === 0) {
          if (c === 0) {
            w = wa;
            break;
          }
          gt(r, "exponent underflow");
        }
        g < l ? (r[l - 1 + Number(i) + Number(s)] !== "0" && c !== 0 && gt(r, "inexact rounding"), l = l - 1) : (x[p] !== 0 && gt(r, "inexact rounding"), p = p - 1), w < Wn ? w = w + 1 : gt(r, "overflow");
      }
      p + 1 < c && (s && (u = u + 1), i && (u = u + 1), parseInt(r[u + p + 1], 10) !== 0 && gt(r, "inexact rounding"));
    }
    if (y = me.fromNumber(0), v = me.fromNumber(0), c === 0)
      y = me.fromNumber(0), v = me.fromNumber(0);
    else if (p < 17) {
      let B = 0;
      for (v = me.fromNumber(x[B++]), y = new me(0, 0); B <= p; B++)
        v = v.multiply(me.fromNumber(10)), v = v.add(me.fromNumber(x[B]));
    } else {
      let B = 0;
      for (y = me.fromNumber(x[B++]); B <= p - 17; B++)
        y = y.multiply(me.fromNumber(10)), y = y.add(me.fromNumber(x[B]));
      for (v = me.fromNumber(x[B++]); B <= p; B++)
        v = v.multiply(me.fromNumber(10)), v = v.add(me.fromNumber(x[B]));
    }
    const C = jE(y, me.fromString("100000000000000000"));
    C.low = C.low.add(v), XE(C.low, v) && (C.high = C.high.add(me.fromNumber(1))), N = w + Qf;
    const D = { low: me.fromNumber(0), high: me.fromNumber(0) };
    C.high.shiftRightUnsigned(49).and(me.fromNumber(1)).equals(me.fromNumber(1)) ? (D.high = D.high.or(me.fromNumber(3).shiftLeft(61)), D.high = D.high.or(me.fromNumber(N).and(me.fromNumber(16383).shiftLeft(47))), D.high = D.high.or(C.high.and(me.fromNumber(140737488355327)))) : (D.high = D.high.or(me.fromNumber(N & 16383).shiftLeft(49)), D.high = D.high.or(C.high.and(me.fromNumber(562949953421311)))), D.low = C.low, a && (D.high = D.high.or(me.fromString("9223372036854775808")));
    const M = X.allocateUnsafe(16);
    return T = 0, M[T++] = D.low.low & 255, M[T++] = D.low.low >> 8 & 255, M[T++] = D.low.low >> 16 & 255, M[T++] = D.low.low >> 24 & 255, M[T++] = D.low.high & 255, M[T++] = D.low.high >> 8 & 255, M[T++] = D.low.high >> 16 & 255, M[T++] = D.low.high >> 24 & 255, M[T++] = D.high.low & 255, M[T++] = D.high.low >> 8 & 255, M[T++] = D.high.low >> 16 & 255, M[T++] = D.high.low >> 24 & 255, M[T++] = D.high.high & 255, M[T++] = D.high.high >> 8 & 255, M[T++] = D.high.high >> 16 & 255, M[T++] = D.high.high >> 24 & 255, new Mr(M);
  }
  toString() {
    let r, n = 0;
    const a = new Array(36);
    for (let T = 0; T < a.length; T++)
      a[T] = 0;
    let i = 0, s = !1, f, c = { parts: [0, 0, 0, 0] }, o, l;
    const h = [];
    i = 0;
    const u = this.bytes, x = u[i++] | u[i++] << 8 | u[i++] << 16 | u[i++] << 24, g = u[i++] | u[i++] << 8 | u[i++] << 16 | u[i++] << 24, d = u[i++] | u[i++] << 8 | u[i++] << 16 | u[i++] << 24, p = u[i++] | u[i++] << 8 | u[i++] << 16 | u[i++] << 24;
    i = 0, {
      low: new me(x, g),
      high: new me(d, p)
    }.high.lessThan(me.ZERO) && h.push("-");
    const y = p >> 26 & VE;
    if (y >> 3 === 3) {
      if (y === $E)
        return h.join("") + "Infinity";
      if (y === zE)
        return "NaN";
      r = p >> 15 & nc, f = 8 + (p >> 14 & 1);
    } else
      f = p >> 14 & 7, r = p >> 17 & nc;
    const v = r - Qf;
    if (c.parts[0] = (p & 16383) + ((f & 15) << 14), c.parts[1] = d, c.parts[2] = g, c.parts[3] = x, c.parts[0] === 0 && c.parts[1] === 0 && c.parts[2] === 0 && c.parts[3] === 0)
      s = !0;
    else
      for (l = 3; l >= 0; l--) {
        let T = 0;
        const I = GE(c);
        if (c = I.quotient, T = I.rem.low, !!T)
          for (o = 8; o >= 0; o--)
            a[l * 9 + o] = T % 10, T = Math.floor(T / 10);
      }
    if (s)
      n = 1, a[i] = 0;
    else
      for (n = 36; !a[i]; )
        n = n - 1, i = i + 1;
    const N = n - 1 + v;
    if (N >= 34 || N <= -7 || v > 0) {
      if (n > 34)
        return h.push("0"), v > 0 ? h.push(`E+${v}`) : v < 0 && h.push(`E${v}`), h.join("");
      h.push(`${a[i++]}`), n = n - 1, n && h.push(".");
      for (let T = 0; T < n; T++)
        h.push(`${a[i++]}`);
      h.push("E"), N > 0 ? h.push(`+${N}`) : h.push(`${N}`);
    } else if (v >= 0)
      for (let T = 0; T < n; T++)
        h.push(`${a[i++]}`);
    else {
      let T = n + v;
      if (T > 0)
        for (let I = 0; I < T; I++)
          h.push(`${a[i++]}`);
      else
        h.push("0");
      for (h.push("."); T++ < 0; )
        h.push("0");
      for (let I = 0; I < n - Math.max(T - 1, 0); I++)
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
    return Mr.fromString(r.$numberDecimal);
  }
  inspect(r, n, a) {
    return a ?? (a = Qr), `new Decimal128(${a(this.toString(), n)})`;
  }
}
class mt extends et {
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
      return new mt(NaN);
    if (r === "Infinity")
      return new mt(1 / 0);
    if (r === "-Infinity")
      return new mt(-1 / 0);
    if (!Number.isFinite(n))
      throw new J(`Input: ${r} is not representable as a Double`);
    if (r.trim() !== r)
      throw new J(`Input: '${r}' contains whitespace`);
    if (r === "")
      throw new J("Input is an empty string");
    if (/[^-0-9.+eE]/.test(r))
      throw new J(`Input: '${r}' is not in decimal or exponential notation`);
    return new mt(n);
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
    return n && n.relaxed ? a : new mt(a);
  }
  inspect(r, n, a) {
    return a ?? (a = Qr), `new Double(${a(this.value, n)})`;
  }
}
class on extends et {
  constructor(r) {
    super();
    ge(this, "value");
    r instanceof Number && (r = r.valueOf()), this.value = +r | 0;
  }
  get _bsontype() {
    return "Int32";
  }
  static fromString(r) {
    const n = Ml(r), a = Number(r);
    if (ai < a)
      throw new J(`Input: '${r}' is larger than the maximum value for Int32`);
    if (ii > a)
      throw new J(`Input: '${r}' is smaller than the minimum value for Int32`);
    if (Number.isSafeInteger(a)) {
      if (a.toString() !== n)
        throw new J(`Input: '${r}' is not a valid Int32 string`);
    } else throw new J(`Input: '${r}' is not a safe integer`);
    return new on(a);
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
    return n && n.relaxed ? parseInt(r.$numberInt, 10) : new on(r.$numberInt);
  }
  inspect(r, n, a) {
    return a ?? (a = Qr), `new Int32(${a(this.value, n)})`;
  }
}
class oa extends et {
  get _bsontype() {
    return "MaxKey";
  }
  toExtendedJSON() {
    return { $maxKey: 1 };
  }
  static fromExtendedJSON() {
    return new oa();
  }
  inspect() {
    return "new MaxKey()";
  }
}
class la extends et {
  get _bsontype() {
    return "MinKey";
  }
  toExtendedJSON() {
    return { $minKey: 1 };
  }
  static fromExtendedJSON() {
    return new la();
  }
  inspect() {
    return "new MinKey()";
  }
}
const _a = /* @__PURE__ */ new WeakMap(), Xr = [];
for (let e = 0; e < 256; e++)
  Xr.push(e.toString(16).padStart(2, "0"));
const Ji = new Int8Array(103);
for (let e = 48; e <= 57; e++)
  Ji[e] = e - 48;
for (let e = 65; e <= 70; e++)
  Ji[e] = e - 55;
for (let e = 97; e <= 102; e++)
  Ji[e] = e - 87;
var i, s, f, c;
const Ue = class Ue extends et {
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
      "toHexString" in r && typeof r.toHexString == "function" ? a = X.fromHex(r.toHexString()) : a = r.id;
    } else
      a = r;
    if (a == null) {
      const i = Math.floor(Date.now() / 1e3), s = Ue.getInc(), f = Ue.PROCESS_UNIQUE ?? (Ue.PROCESS_UNIQUE = X.randomBytes(5));
      this.i0 = i >>> 8 & 16777215, this.i1 = (i & 255) << 16 | f[0] << 8 | f[1], this.i2 = f[2] << 16 | f[3] << 8 | f[4], this.i3 = s & 16777215;
    } else if (ArrayBuffer.isView(a) && a.byteLength === 12)
      this.setFromBytes(a instanceof Uint8Array ? a : X.toLocalBufferType(a));
    else if (typeof a == "string")
      if (Ue.validateHexString(a))
        this.setFromHex(a), Ue.cacheHexString && _a.set(this, a);
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
    const n = Ji;
    this.i0 = n[r.charCodeAt(0)] << 20 | n[r.charCodeAt(1)] << 16 | n[r.charCodeAt(2)] << 12 | n[r.charCodeAt(3)] << 8 | n[r.charCodeAt(4)] << 4 | n[r.charCodeAt(5)], this.i1 = n[r.charCodeAt(6)] << 20 | n[r.charCodeAt(7)] << 16 | n[r.charCodeAt(8)] << 12 | n[r.charCodeAt(9)] << 8 | n[r.charCodeAt(10)] << 4 | n[r.charCodeAt(11)], this.i2 = n[r.charCodeAt(12)] << 20 | n[r.charCodeAt(13)] << 16 | n[r.charCodeAt(14)] << 12 | n[r.charCodeAt(15)] << 8 | n[r.charCodeAt(16)] << 4 | n[r.charCodeAt(17)], this.i3 = n[r.charCodeAt(18)] << 20 | n[r.charCodeAt(19)] << 16 | n[r.charCodeAt(20)] << 12 | n[r.charCodeAt(21)] << 8 | n[r.charCodeAt(22)] << 4 | n[r.charCodeAt(23)];
  }
  get id() {
    const r = X.allocateUnsafe(12);
    return r[0] = this.i0 >>> 16 & 255, r[1] = this.i0 >>> 8 & 255, r[2] = this.i0 & 255, r[3] = this.i1 >>> 16 & 255, r[4] = this.i1 >>> 8 & 255, r[5] = this.i1 & 255, r[6] = this.i2 >>> 16 & 255, r[7] = this.i2 >>> 8 & 255, r[8] = this.i2 & 255, r[9] = this.i3 >>> 16 & 255, r[10] = this.i3 >>> 8 & 255, r[11] = this.i3 & 255, r;
  }
  set id(r) {
    const n = r instanceof Uint8Array ? r : X.toLocalBufferType(r);
    this.setFromBytes(n), Ue.cacheHexString && _a.set(this, X.toHex(n));
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
      const f = _a.get(this);
      if (f)
        return f;
    }
    const r = this.i0, n = this.i1, a = this.i2, i = this.i3, s = Xr[r >>> 16 & 255] + Xr[r >>> 8 & 255] + Xr[r & 255] + Xr[n >>> 16 & 255] + Xr[n >>> 8 & 255] + Xr[n & 255] + Xr[a >>> 16 & 255] + Xr[a >>> 8 & 255] + Xr[a & 255] + Xr[i >>> 16 & 255] + Xr[i >>> 8 & 255] + Xr[i & 255];
    return Ue.cacheHexString && _a.set(this, s), s;
  }
  static getInc() {
    return Ue.index = (Ue.index + 1) % 16777216;
  }
  static generate(r) {
    typeof r != "number" && (r = Math.floor(Date.now() / 1e3));
    const n = Ue.getInc(), a = X.allocateUnsafe(12);
    we.setInt32BE(a, 0, r);
    const i = this.PROCESS_UNIQUE ?? (this.PROCESS_UNIQUE = X.randomBytes(5));
    return a[4] = i[0], a[5] = i[1], a[6] = i[2], a[7] = i[3], a[8] = i[4], a[11] = n & 255, a[10] = n >>> 8 & 255, a[9] = n >>> 16 & 255, a;
  }
  toString(r) {
    return r === "base64" ? X.toBase64(this.id) : r === "hex" ? this.toHexString() : this.toHexString();
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
    const n = X.allocate(12);
    for (let a = 11; a >= 4; a--)
      n[a] = 0;
    return we.setInt32BE(n, 0, r), new Ue(n);
  }
  static createFromHexString(r) {
    if ((r == null ? void 0 : r.length) !== 24)
      throw new J("hex string must be 24 characters");
    return new Ue(X.fromHex(r));
  }
  static createFromBase64(r) {
    if ((r == null ? void 0 : r.length) !== 16)
      throw new J("base64 string must be 16 characters");
    return new Ue(X.fromBase64(r));
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
    return Ue.cacheHexString && _a.has(this);
  }
  inspect(r, n, a) {
    return a ?? (a = Qr), `new ObjectId(${a(this.toHexString(), n)})`;
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
let On = Ue;
function YE(e, t, r) {
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
    const o = Array.isArray(f), l = !o && (f instanceof Map || Xi(f));
    let h = f;
    if (!o && !l && typeof (f == null ? void 0 : f.toBSON) == "function" && (h = f.toBSON()), o) {
      const u = h;
      for (let x = 0; x < u.length; x++)
        i += ms(x.toString(), u[x], t, !0, c, n, a);
    } else if (l)
      for (const [u, x] of h)
        i += ms(u, x, t, !1, c, n, a);
    else
      for (const u of Object.keys(h))
        i += ms(u, h[u], t, !1, c, n, a);
  }
  return i;
}
function ms(e, t, r = !1, n = !1, a = !1, i, s) {
  switch (typeof (t == null ? void 0 : t.toBSON) == "function" && (t = t.toBSON()), typeof t) {
    case "string":
      return 1 + X.utf8ByteLength(e) + 1 + 4 + X.utf8ByteLength(t) + 1;
    case "number":
      return Math.floor(t) === t && t >= kl && t <= Sl && !Object.is(t, -0) && t >= ii && t <= ai ? X.utf8ByteLength(e) + 1 + 5 : X.utf8ByteLength(e) + 1 + 9;
    case "undefined":
      return n || !a ? X.utf8ByteLength(e) + 1 + 1 : 0;
    case "boolean":
      return X.utf8ByteLength(e) + 1 + 2;
    case "object":
      if (t != null && typeof t._bsontype == "string" && t[Yi] !== ni)
        throw new Ki();
      if (t == null || t._bsontype === "MinKey" || t._bsontype === "MaxKey")
        return X.utf8ByteLength(e) + 1 + 1;
      if (t._bsontype === "ObjectId")
        return X.utf8ByteLength(e) + 1 + 13;
      if (t instanceof Date || Li(t))
        return X.utf8ByteLength(e) + 1 + 9;
      if (ArrayBuffer.isView(t) || t instanceof ArrayBuffer || y0(t))
        return X.utf8ByteLength(e) + 1 + 6 + t.byteLength;
      if (t._bsontype === "Long" || t._bsontype === "Double" || t._bsontype === "Timestamp")
        return X.utf8ByteLength(e) + 1 + 9;
      if (t._bsontype === "Decimal128")
        return X.utf8ByteLength(e) + 1 + 17;
      if (t._bsontype === "Int32")
        return X.utf8ByteLength(e) + 1 + 5;
      if (t._bsontype === "Code")
        if (t.scope != null && typeof t.scope == "object") {
          if (s.has(t.scope))
            throw new J("Cannot convert circular structure to BSON");
          return i.push({ object: t.scope, ignoreUndefined: a, exit: !1 }), X.utf8ByteLength(e) + 1 + 1 + 4 + 4 + X.utf8ByteLength(t.code.toString()) + 1;
        } else
          return X.utf8ByteLength(e) + 1 + 1 + 4 + X.utf8ByteLength(t.code.toString()) + 1;
      else if (t._bsontype === "Binary") {
        const f = t;
        return f.sub_type === cr.SUBTYPE_BYTE_ARRAY ? X.utf8ByteLength(e) + 1 + (f.position + 1 + 4 + 1 + 4) : X.utf8ByteLength(e) + 1 + (f.position + 1 + 4 + 1);
      } else {
        if (t._bsontype === "BSONSymbol")
          return X.utf8ByteLength(e) + 1 + X.utf8ByteLength(t.value) + 4 + 1 + 1;
        if (t._bsontype === "DBRef") {
          const f = Object.assign({
            $ref: t.collection,
            $id: t.oid
          }, t.fields);
          return t.db != null && (f.$db = t.db), i.push({ object: f, ignoreUndefined: !0, exit: !1 }), X.utf8ByteLength(e) + 1 + 1;
        } else {
          if (t instanceof RegExp || Ri(t))
            return X.utf8ByteLength(e) + 1 + 1 + X.utf8ByteLength(t.source) + 1 + (t.global ? 1 : 0) + (t.ignoreCase ? 1 : 0) + (t.multiline ? 1 : 0) + 1;
          if (t._bsontype === "BSONRegExp")
            return X.utf8ByteLength(e) + 1 + 1 + X.utf8ByteLength(t.pattern) + 1 + X.utf8ByteLength(t.options) + 1;
          if (s.has(t))
            throw new J("Cannot convert circular structure to BSON");
          return i.push({ object: t, ignoreUndefined: a, exit: !1 }), X.utf8ByteLength(e) + 1 + 1;
        }
      }
    case "function":
      return r ? X.utf8ByteLength(e) + 1 + 1 + 4 + X.utf8ByteLength(t.toString()) + 1 : 0;
    case "bigint":
      return X.utf8ByteLength(e) + 1 + 9;
    case "symbol":
      return 0;
    default:
      throw new J(`Unrecognized JS type: ${typeof t}`);
  }
}
function KE(e) {
  return e.split("").sort().join("");
}
class _t extends et {
  constructor(r, n) {
    super();
    ge(this, "pattern");
    ge(this, "options");
    if (this.pattern = r, this.options = KE(n ?? ""), this.pattern.indexOf("\0") !== -1)
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
        return new _t(r.$regex, _t.parseOptions(r.$options));
    if ("$regularExpression" in r)
      return new _t(r.$regularExpression.pattern, _t.parseOptions(r.$regularExpression.options));
    throw new J(`Unexpected BSONRegExp EJSON object form: ${JSON.stringify(r)}`);
  }
  inspect(r, n, a) {
    const i = wE(n) ?? ((c) => c);
    a ?? (a = Qr);
    const s = i(a(this.pattern), "regexp"), f = i(a(this.options), "regexp");
    return `new BSONRegExp(${s}, ${f})`;
  }
}
class ha extends et {
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
    return new ha(r.$symbol);
  }
  inspect(r, n, a) {
    return a ?? (a = Qr), `new BSONSymbol(${a(this.value, n)})`;
  }
}
const JE = me, Zt = class Zt extends JE {
  get _bsontype() {
    return "Timestamp";
  }
  get [ca]() {
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
    else if (me.isLong(t))
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
    return new Zt(me.fromInt(t, !0));
  }
  static fromNumber(t) {
    return new Zt(me.fromNumber(t, !0));
  }
  static fromBits(t, r) {
    return new Zt({ i: t, t: r });
  }
  static fromString(t, r) {
    return new Zt(me.fromString(t, !0, r));
  }
  toExtendedJSON() {
    return { $timestamp: { t: this.t, i: this.i } };
  }
  static fromExtendedJSON(t) {
    const r = me.isLong(t.$timestamp.i) ? t.$timestamp.i.getLowBitsUnsigned() : t.$timestamp.i, n = me.isLong(t.$timestamp.t) ? t.$timestamp.t.getLowBitsUnsigned() : t.$timestamp.t;
    return new Zt({ t: n, i: r });
  }
  inspect(t, r, n) {
    n ?? (n = Qr);
    const a = n(this.t, r), i = n(this.i, r);
    return `new Timestamp({ t: ${a}, i: ${i} })`;
  }
};
ge(Zt, "MAX_VALUE", me.MAX_UNSIGNED_VALUE);
let na = Zt;
const qE = me.fromNumber(Sl), ZE = me.fromNumber(kl);
function Wl(e, t, r) {
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
  return QE(e, n, t, r);
}
const ic = /^\$ref$|^\$id$|^\$db$/;
function sc(e, t, r) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    value: r,
    writable: !0,
    enumerable: !0,
    configurable: !0
  }) : e[t] = r;
}
function fc(e) {
  if (Pl(e)) {
    const { $ref: t, $id: r, $db: n, ...a } = e;
    return new zt(t, r, n, a);
  }
  return e;
}
function QE(e, t, r, n = !1) {
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
  const p = t;
  if (e.length < 5)
    throw new J("corrupt bson message < 5 bytes long");
  const w = we.getInt32LE(e, t);
  if (t += 4, w < 5 || w > e.length)
    throw new J("corrupt bson message");
  const y = n ? [] : {};
  let v = 0, N = n ? !1 : null, T = null, I = y, k = n;
  for (; ; ) {
    const C = e[t++];
    if (C === 0)
      if (T)
        if (t === T.lastIndex) {
          const W = T;
          T = W.prev, T === null ? (I = y, k = n) : (I = T.holdingDocument, k = T.isArray);
          let ee = W.holdingDocument;
          switch (W.elementType) {
            case Ba:
              W.isPossibleDBRef && (ee = fc(ee));
              break;
            case Sa:
              break;
            case Ei:
              ee = new cn(W.functionString, W.holdingDocument);
              break;
            default:
              throw new J("Unexpected element type in frame stack");
          }
          sc(I, W.propertyName, ee);
          continue;
        } else
          throw T.elementType === Sa ? new J("corrupted array bson") : new J("Bad BSON Document: object not properly terminated");
      else
        break;
    let D = t;
    for (; e[D] !== 0 && D < e.length; )
      D++;
    if (D >= e.byteLength)
      throw new J("Bad BSON Document: illegal CString");
    const M = k ? T !== null ? T.arrayIndex++ : v++ : X.toUTF8(e, t, D, !1);
    let B;
    T !== null ? B = T.validationSetting : u || g != null && g.has(M) ? B = x : B = !x, T !== null ? T.isPossibleDBRef !== !1 && typeof M == "string" && M[0] === "$" && (T.isPossibleDBRef = ic.test(M)) : N !== !1 && M[0] === "$" && (N = ic.test(M));
    let Y, he = !1;
    if (t = D + 1, C === Al) {
      const W = we.getInt32LE(e, t);
      if (t += 4, W <= 0 || W > e.length - t || e[t + W - 1] !== 0)
        throw new J("bad string length in bson");
      Y = X.toUTF8(e, t, t + W - 1, B), t = t + W;
    } else if (C === Fl)
      Y = new On(e, t), t = t + 12;
    else if (C === Ya && o === !1)
      Y = new on(we.getInt32LE(e, t)), t += 4;
    else if (C === Ya)
      Y = we.getInt32LE(e, t), t += 4;
    else if (C === T0)
      Y = we.getFloat64LE(e, t), t += 8, o === !1 && (Y = new mt(Y));
    else if (C === Cl) {
      const W = we.getInt32LE(e, t), ee = we.getInt32LE(e, t + 4);
      t += 8, Y = new Date(new me(W, ee).toNumber());
    } else if (C === bl) {
      if (e[t] !== 0 && e[t] !== 1)
        throw new J("illegal boolean type value");
      Y = e[t++] === 1;
    } else if (C === Ba) {
      const W = we.getInt32LE(e, t);
      if (W < 5 || W > e.length - t)
        throw new J("bad embedded document length in bson");
      if (i || ((T == null ? void 0 : T.raw) ?? !1))
        Y = e.subarray(t, t + W), t = t + W;
      else {
        he = !0;
        const ee = {
          holdingDocument: {},
          elementType: Ba,
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
        T = ee, I = ee.holdingDocument, k = !1, t = t + 4;
      }
    } else if (C === Sa) {
      const W = we.getInt32LE(e, t);
      if (W < 5 || W > e.length - t)
        throw new J("bad embedded array length in bson");
      const ee = t + W, ne = !!(a && a[M]) || ((T == null ? void 0 : T.raw) ?? !1);
      he = !0;
      const De = {
        holdingDocument: [],
        elementType: Sa,
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
      T = De, I = De.holdingDocument, k = !0, t = t + 4;
    } else if (C === _E)
      Y = void 0;
    else if (C === k0)
      Y = null;
    else if (C === F0)
      if (l)
        Y = we.getBigInt64LE(e, t), t += 8;
      else {
        const W = we.getInt32LE(e, t), ee = we.getInt32LE(e, t + 4);
        t += 8;
        const ne = new me(W, ee);
        c && o === !0 ? Y = ne.lessThanOrEqual(qE) && ne.greaterThanOrEqual(ZE) ? ne.toNumber() : ne : Y = ne;
      }
    else if (C === Nl) {
      const W = X.allocateUnsafe(16);
      for (let ee = 0; ee < 16; ee++)
        W[ee] = e[t + ee];
      t = t + 16, Y = new Mr(W);
    } else if (C === S0) {
      let W = we.getInt32LE(e, t);
      t += 4;
      const ee = W, ne = e[t++];
      if (W < 0)
        throw new J("Negative binary type element size found");
      if (W > e.byteLength)
        throw new J("Binary type size larger than document size");
      if (ne === cr.SUBTYPE_BYTE_ARRAY) {
        if (W = we.getInt32LE(e, t), t += 4, W < 0)
          throw new J("Negative binary type element size found for subtype 0x02");
        if (W > ee - 4)
          throw new J("Binary type with subtype 0x02 contains too long binary size");
        if (W < ee - 4)
          throw new J("Binary type with subtype 0x02 contains too short binary size");
      }
      f && o ? Y = X.toLocalBufferType(e.subarray(t, t + W)) : (Y = new cr(e.subarray(t, t + W), ne), ne === b0 && kr.isValid(Y) && (Y = Y.toUUID())), t = t + W;
    } else if (C === Pi && s === !1) {
      for (D = t; e[D] !== 0 && D < e.length; )
        D++;
      if (D >= e.length)
        throw new J("Bad BSON Document: illegal CString");
      const W = X.toUTF8(e, t, D, !1);
      for (t = D + 1, D = t; e[D] !== 0 && D < e.length; )
        D++;
      if (D >= e.length)
        throw new J("Bad BSON Document: illegal CString");
      const ee = X.toUTF8(e, t, D, !1);
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
    } else if (C === Pi && s === !0) {
      for (D = t; e[D] !== 0 && D < e.length; )
        D++;
      if (D >= e.length)
        throw new J("Bad BSON Document: illegal CString");
      const W = X.toUTF8(e, t, D, !1);
      for (t = D + 1, D = t; e[D] !== 0 && D < e.length; )
        D++;
      if (D >= e.length)
        throw new J("Bad BSON Document: illegal CString");
      const ee = X.toUTF8(e, t, D, !1);
      t = D + 1, Y = new _t(W, ee);
    } else if (C === Ol) {
      const W = we.getInt32LE(e, t);
      if (t += 4, W <= 0 || W > e.length - t || e[t + W - 1] !== 0)
        throw new J("bad string length in bson");
      const ee = X.toUTF8(e, t, t + W - 1, B);
      Y = o ? ee : new ha(ee), t = t + W;
    } else if (C === Il)
      Y = new na({
        i: we.getUint32LE(e, t),
        t: we.getUint32LE(e, t + 4)
      }), t += 8;
    else if (C === Bl)
      Y = new la();
    else if (C === Dl)
      Y = new oa();
    else if (C === A0) {
      const W = we.getInt32LE(e, t);
      if (t += 4, W <= 0 || W > e.length - t || e[t + W - 1] !== 0)
        throw new J("bad string length in bson");
      const ee = X.toUTF8(e, t, t + W - 1, B);
      Y = new cn(ee), t = t + W;
    } else if (C === Ei) {
      const W = we.getInt32LE(e, t);
      if (t += 4, W < 13)
        throw new J("code_w_scope total size shorter minimum expected length");
      const ee = we.getInt32LE(e, t);
      if (t += 4, ee <= 0 || ee > e.length - t || e[t + ee - 1] !== 0)
        throw new J("bad string length in bson");
      const ne = X.toUTF8(e, t, t + ee - 1, B);
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
        elementType: Ei,
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
      T = _e, I = _e.holdingDocument, k = !1, t = t + 4;
    } else if (C === EE) {
      const W = we.getInt32LE(e, t);
      if (t += 4, W <= 0 || W > e.length - t || e[t + W - 1] !== 0)
        throw new J("bad string length in bson");
      const ee = X.toUTF8(e, t, t + W - 1, B);
      t = t + W;
      const ne = X.allocateUnsafe(12);
      for (let H = 0; H < 12; H++)
        ne[H] = e[t + H];
      const De = new On(ne);
      t = t + 12, Y = new zt(ee, De);
    } else
      throw new J(`Detected unknown BSON type ${C.toString(16)} for fieldname "${M}"`);
    he || sc(I, M, Y);
  }
  if (T !== null)
    throw new J("corrupted bson, more objects expected based on the current document size");
  const U = y;
  if (w !== t - p)
    throw n ? new J("corrupt array bson") : new J("corrupt object bson");
  return N ? fc(U) : U;
}
const C0 = /\x00/, ey = /* @__PURE__ */ new Set(["$db", "$ref", "$id", "$clusterTime"]);
function ry(e, t, r, n) {
  e[n++] = Al;
  const a = X.encodeUTF8Into(e, t, n);
  n = n + a + 1, e[n - 1] = 0;
  const i = X.encodeUTF8Into(e, r, n + 4);
  return we.setInt32LE(e, n, i + 1), n = n + 4 + i, e[n++] = 0, n;
}
function ty(e, t, r, n) {
  const i = !Object.is(r, -0) && Number.isSafeInteger(r) && r <= ai && r >= ii ? Ya : T0;
  e[n++] = i;
  const s = X.encodeUTF8Into(e, t, n);
  return n = n + s, e[n++] = 0, i === Ya ? n += we.setInt32LE(e, n, r) : n += we.setFloat64LE(e, n, r), n;
}
function ny(e, t, r, n) {
  e[n++] = F0;
  const a = X.encodeUTF8Into(e, t, n);
  return n += a, e[n++] = 0, n += we.setBigInt64LE(e, n, r), n;
}
function cc(e, t, r, n) {
  e[n++] = k0;
  const a = X.encodeUTF8Into(e, t, n);
  return n = n + a, e[n++] = 0, n;
}
function ay(e, t, r, n) {
  e[n++] = bl;
  const a = X.encodeUTF8Into(e, t, n);
  return n = n + a, e[n++] = 0, e[n++] = r ? 1 : 0, n;
}
function iy(e, t, r, n) {
  e[n++] = Cl;
  const a = X.encodeUTF8Into(e, t, n);
  n = n + a, e[n++] = 0;
  const i = me.fromNumber(r.getTime()), s = i.getLowBits(), f = i.getHighBits();
  return n += we.setInt32LE(e, n, s), n += we.setInt32LE(e, n, f), n;
}
function sy(e, t, r, n) {
  e[n++] = Pi;
  const a = X.encodeUTF8Into(e, t, n);
  if (n = n + a, e[n++] = 0, r.source && r.source.match(C0) != null)
    throw new J("value " + r.source + " must not contain null bytes");
  return n = n + X.encodeUTF8Into(e, r.source, n), e[n++] = 0, r.ignoreCase && (e[n++] = 105), r.global && (e[n++] = 115), r.multiline && (e[n++] = 109), e[n++] = 0, n;
}
function fy(e, t, r, n) {
  e[n++] = Pi;
  const a = X.encodeUTF8Into(e, t, n);
  if (n = n + a, e[n++] = 0, r.pattern.match(C0) != null)
    throw new J("pattern " + r.pattern + " must not contain null bytes");
  n = n + X.encodeUTF8Into(e, r.pattern, n), e[n++] = 0;
  const i = r.options.split("").sort().join("");
  return n = n + X.encodeUTF8Into(e, i, n), e[n++] = 0, n;
}
function cy(e, t, r, n) {
  r === null ? e[n++] = k0 : r[ca] === "MinKey" ? e[n++] = Bl : e[n++] = Dl;
  const a = X.encodeUTF8Into(e, t, n);
  return n = n + a, e[n++] = 0, n;
}
function oy(e, t, r, n) {
  e[n++] = Fl;
  const a = X.encodeUTF8Into(e, t, n);
  return n = n + a, e[n++] = 0, n += r.serializeInto(e, n), n;
}
function ly(e, t, r, n) {
  e[n++] = S0;
  const a = X.encodeUTF8Into(e, t, n);
  n = n + a, e[n++] = 0;
  const i = r.length;
  if (n += we.setInt32LE(e, n, i), e[n++] = yE, i <= 16)
    for (let s = 0; s < i; s++)
      e[n + s] = r[s];
  else
    e.set(r, n);
  return n = n + i, n;
}
function hy(e, t, r, n) {
  e[n++] = Nl;
  const a = X.encodeUTF8Into(e, t, n);
  n = n + a, e[n++] = 0;
  for (let i = 0; i < 16; i++)
    e[n + i] = r.bytes[i];
  return n + 16;
}
function uy(e, t, r, n) {
  e[n++] = r[ca] === "Long" ? F0 : Il;
  const a = X.encodeUTF8Into(e, t, n);
  n = n + a, e[n++] = 0;
  const i = r.getLowBits(), s = r.getHighBits();
  return n += we.setInt32LE(e, n, i), n += we.setInt32LE(e, n, s), n;
}
function xy(e, t, r, n) {
  r = r.valueOf(), e[n++] = Ya;
  const a = X.encodeUTF8Into(e, t, n);
  return n = n + a, e[n++] = 0, n += we.setInt32LE(e, n, r), n;
}
function dy(e, t, r, n) {
  e[n++] = T0;
  const a = X.encodeUTF8Into(e, t, n);
  return n = n + a, e[n++] = 0, n += we.setFloat64LE(e, n, r.value), n;
}
function gy(e, t, r, n) {
  e[n++] = A0;
  const a = X.encodeUTF8Into(e, t, n);
  n = n + a, e[n++] = 0;
  const i = r.toString(), s = X.encodeUTF8Into(e, i, n + 4) + 1;
  return we.setInt32LE(e, n, s), n = n + 4 + s - 1, e[n++] = 0, n;
}
function py(e, t, r, n) {
  e[n++] = S0;
  const a = X.encodeUTF8Into(e, t, n);
  n = n + a, e[n++] = 0;
  const i = r.buffer;
  let s = r.position;
  if (r.sub_type === cr.SUBTYPE_BYTE_ARRAY && (s = s + 4), n += we.setInt32LE(e, n, s), e[n++] = r.sub_type, r.sub_type === cr.SUBTYPE_BYTE_ARRAY && (s = s - 4, n += we.setInt32LE(e, n, s)), r.sub_type === cr.SUBTYPE_VECTOR && Rt(r), s <= 16)
    for (let f = 0; f < s; f++)
      e[n + f] = i[f];
  else
    e.set(i, n);
  return n = n + r.position, n;
}
function my(e, t, r, n) {
  e[n++] = Ol;
  const a = X.encodeUTF8Into(e, t, n);
  n = n + a, e[n++] = 0;
  const i = X.encodeUTF8Into(e, r.value, n + 4) + 1;
  return we.setInt32LE(e, n, i), n = n + 4 + i - 1, e[n++] = 0, n;
}
function _i(e, t, r, n, a, i) {
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
  if (e instanceof Map || Xi(e))
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
function Hl(e, t, r, n, a, i, s) {
  if (s == null) {
    if (t == null)
      return e[0] = 5, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, 5;
    if (Array.isArray(t))
      throw new J("serialize does not support an array as the root input");
    if (typeof t != "object")
      throw new J("serialize does not support non-object as the root input");
    if ("_bsontype" in t && typeof t._bsontype == "string")
      throw new J("BSON types cannot be serialized as a document");
    if (Li(t) || Ri(t) || ta(t) || y0(t))
      throw new J("date, regexp, typedarray, and arraybuffer cannot be BSON documents");
    s = /* @__PURE__ */ new Set();
  }
  s.add(t);
  let f = _i(t, n, null, null, r, i), c = n + 4;
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
    if (typeof (h == null ? void 0 : h.toBSON) == "function" && (h = h.toBSON()), !o.isArray && typeof l == "string" && !(l[0] === "$" && ey.has(l))) {
      if (C0.test(l))
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
      (o.isArray || o.ignoreUndefined === !1) && (c = cc(e, l, h, c));
    else if (h === null)
      c = cc(e, l, h, c);
    else if (u === "string")
      c = ry(e, l, h, c);
    else if (u === "number")
      c = ty(e, l, h, c);
    else if (u === "bigint")
      c = ny(e, l, h, c);
    else if (u === "boolean")
      c = ay(e, l, h, c);
    else if (u === "object" && h._bsontype == null)
      if (h instanceof Date || Li(h))
        c = iy(e, l, h, c);
      else if (h instanceof Uint8Array || ta(h))
        c = ly(e, l, h, c);
      else if (h instanceof RegExp || Ri(h))
        c = sy(e, l, h, c);
      else {
        if (s.has(h))
          throw new J("Cannot convert circular structure to BSON");
        const x = Array.isArray(h);
        e[c++] = x ? Sa : Ba, c += X.encodeUTF8Into(e, l, c), e[c++] = 0;
        const g = c;
        s.add(h), f = _i(h, g, null, o, o.checkKeys, o.ignoreUndefined), c += 4;
      }
    else if (u === "object") {
      if (h[Yi] !== ni)
        throw new Ki();
      const x = h[ca];
      if (x === "ObjectId")
        c = oy(e, l, h, c);
      else if (x === "Decimal128")
        c = hy(e, l, h, c);
      else if (x === "Long" || x === "Timestamp")
        c = uy(e, l, h, c);
      else if (x === "Double")
        c = dy(e, l, h, c);
      else if (x === "Code") {
        const g = h;
        if (g.scope && typeof g.scope == "object") {
          e[c++] = Ei, c += X.encodeUTF8Into(e, l, c), e[c++] = 0;
          const d = c;
          c += 4;
          const p = g.code, w = X.encodeUTF8Into(e, p, c + 4) + 1;
          we.setInt32LE(e, c, w), e[c + 4 + w - 1] = 0, c = c + w + 4;
          const y = g.scope;
          if (s.has(y))
            throw new J("Cannot convert circular structure to BSON");
          s.add(y), f = _i(y, c, d, o, o.checkKeys, o.ignoreUndefined), c += 4;
        } else {
          e[c++] = A0, c += X.encodeUTF8Into(e, l, c), e[c++] = 0;
          const d = g.code.toString(), p = X.encodeUTF8Into(e, d, c + 4) + 1;
          we.setInt32LE(e, c, p), c = c + 4 + p - 1, e[c++] = 0;
        }
      } else if (x === "Binary")
        c = py(e, l, h, c);
      else if (x === "BSONSymbol")
        c = my(e, l, h, c);
      else if (x === "DBRef") {
        const g = h, d = Object.assign({ $ref: g.collection, $id: g.oid }, g.db != null ? { $db: g.db } : null, g.fields);
        e[c++] = Ba, c += X.encodeUTF8Into(e, l, c), e[c++] = 0, s.add(d), f = _i(d, c, null, o, !1, !0), c += 4;
      } else if (x === "BSONRegExp")
        c = fy(e, l, h, c);
      else if (x === "Int32")
        c = xy(e, l, h, c);
      else if (x === "MinKey" || x === "MaxKey")
        c = cy(e, l, h, c);
      else if (typeof h._bsontype < "u")
        throw new J(`Unrecognized or invalid _bsontype: ${String(h._bsontype)}`);
    } else u === "function" && a && (c = gy(e, l, h, c));
  }
  return c;
}
function vy(e) {
  return e != null && typeof e == "object" && "_bsontype" in e && typeof e._bsontype == "string";
}
const wy = {
  $oid: On,
  $binary: cr,
  $uuid: cr,
  $symbol: ha,
  $numberInt: on,
  $numberDecimal: Mr,
  $numberDouble: mt,
  $numberLong: me,
  $minKey: la,
  $maxKey: oa,
  $regex: _t,
  $regularExpression: _t,
  $timestamp: na
};
function Vl(e, t = {}) {
  if (typeof e == "number") {
    const n = e <= ai && e >= ii, a = e <= yl && e >= Tl;
    if (t.relaxed || t.legacy)
      return e;
    if (Number.isInteger(e) && !Object.is(e, -0)) {
      if (n)
        return new on(e);
      if (a)
        return t.useBigInt64 ? BigInt(e) : me.fromNumber(e);
    }
    return new mt(e);
  }
  if (e == null || typeof e != "object")
    return e;
  if (e.$undefined)
    return null;
  const r = Object.keys(e).filter((n) => n.startsWith("$") && e[n] != null);
  for (let n = 0; n < r.length; n++) {
    const a = wy[r[n]];
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
        throw new Bs(`Unrecognized type for EJSON date: ${typeof n}`);
    else if (typeof n == "string")
      a.setTime(Date.parse(n));
    else if (me.isLong(n))
      a.setTime(n.toNumber());
    else if (typeof n == "number" && t.relaxed)
      a.setTime(n);
    else if (typeof n == "bigint")
      a.setTime(Number(n));
    else
      throw new Bs(`Unrecognized type for EJSON date: ${typeof n}`);
    return a;
  }
  if (e.$code != null) {
    const n = Object.assign({}, e);
    return e.$scope && (n.$scope = Vl(e.$scope)), cn.fromExtendedJSON(e);
  }
  if (Pl(e) || e.$dbPointer) {
    const n = e.$ref ? e : e.$dbPointer;
    if (n instanceof zt)
      return n;
    const a = Object.keys(n).filter((s) => s.startsWith("$"));
    let i = !0;
    if (a.forEach((s) => {
      ["$ref", "$id", "$db"].indexOf(s) === -1 && (i = !1);
    }), i)
      return zt.fromExtendedJSON(n);
  }
  return e;
}
function _y(e, t) {
  return e.map((r, n) => {
    t.seenObjects.push({ propertyName: `index ${n}`, obj: null });
    try {
      return Pt(r, t);
    } finally {
      t.seenObjects.pop();
    }
  });
}
function oc(e) {
  const t = e.toISOString();
  return e.getUTCMilliseconds() !== 0 ? t : t.slice(0, -5) + "Z";
}
function Pt(e, t) {
  if (e instanceof Map || Xi(e)) {
    const r = /* @__PURE__ */ Object.create(null);
    for (const [n, a] of e) {
      if (typeof n != "string")
        throw new J("Can only serialize maps with string keys");
      r[n] = a;
    }
    return Pt(r, t);
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
    return _y(e, t);
  if (e === void 0)
    return t.ignoreUndefined ? void 0 : null;
  if (e instanceof Date || Li(e)) {
    const r = e.getTime(), n = r > -1 && r < 2534023008e5;
    return t.legacy ? t.relaxed && n ? { $date: e.getTime() } : { $date: oc(e) } : t.relaxed && n ? { $date: oc(e) } : { $date: { $numberLong: e.getTime().toString() } };
  }
  if (typeof e == "number" && (!t.relaxed || !isFinite(e))) {
    if (Number.isInteger(e) && !Object.is(e, -0)) {
      if (e >= ii && e <= ai)
        return { $numberInt: e.toString() };
      if (e >= Tl && e <= yl)
        return { $numberLong: e.toString() };
    }
    return { $numberDouble: Object.is(e, -0) ? "-0.0" : e.toString() };
  }
  if (typeof e == "bigint")
    return t.relaxed ? Number(BigInt.asIntN(64, e)) : { $numberLong: BigInt.asIntN(64, e).toString() };
  if (e instanceof RegExp || Ri(e)) {
    let r = e.flags;
    if (r === void 0) {
      const a = e.toString().match(/[gimuy]*$/);
      a && (r = a[0]);
    }
    return new _t(e.source, r).toExtendedJSON(t);
  }
  return e != null && typeof e == "object" ? yy(e, t) : e;
}
const Ey = {
  Binary: (e) => new cr(e.value(), e.sub_type),
  Code: (e) => new cn(e.code, e.scope),
  DBRef: (e) => new zt(e.collection || e.namespace, e.oid, e.db, e.fields),
  Decimal128: (e) => new Mr(e.bytes),
  Double: (e) => new mt(e.value),
  Int32: (e) => new on(e.value),
  Long: (e) => me.fromBits(e.low != null ? e.low : e.low_, e.low != null ? e.high : e.high_, e.low != null ? e.unsigned : e.unsigned_),
  MaxKey: () => new oa(),
  MinKey: () => new la(),
  ObjectId: (e) => new On(e),
  BSONRegExp: (e) => new _t(e.pattern, e.options),
  BSONSymbol: (e) => new ha(e.value),
  Timestamp: (e) => na.fromBits(e.low, e.high)
};
function yy(e, t) {
  if (e == null || typeof e != "object")
    throw new J("not an object instance");
  const r = e._bsontype;
  if (typeof r > "u") {
    const n = {};
    for (const a of Object.keys(e)) {
      t.seenObjects.push({ propertyName: a, obj: null });
      try {
        const i = Pt(e[a], t);
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
    if (e != null && typeof e == "object" && typeof e._bsontype == "string" && e[Yi] !== ni)
      throw new Ki();
    if (vy(e)) {
      let n = e;
      if (typeof n.toExtendedJSON != "function") {
        const a = Ey[e._bsontype];
        if (!a)
          throw new J("Unrecognized or invalid _bsontype: " + e._bsontype);
        n = a(n);
      }
      return r === "Code" && n.scope ? n = new cn(n.code, Pt(n.scope, t)) : r === "DBRef" && n.oid && (n = new zt(Pt(n.collection, t), Pt(n.oid, t), Pt(n.db, t), Pt(n.fields, t))), n.toExtendedJSON(t);
    } else
      throw new J("_bsontype must be a string, but was: " + typeof r);
  }
}
function $l(e, t) {
  const r = {
    useBigInt64: (t == null ? void 0 : t.useBigInt64) ?? !1,
    relaxed: (t == null ? void 0 : t.relaxed) ?? !0,
    legacy: (t == null ? void 0 : t.legacy) ?? !1
  };
  return JSON.parse(e, (n, a) => {
    if (n.indexOf("\0") !== -1)
      throw new J(`BSON Document field names cannot contain null bytes, found: ${JSON.stringify(n)}`);
    return Vl(a, r);
  });
}
function zl(e, t, r, n) {
  r != null && typeof r == "object" && (n = r, r = void 0), t != null && typeof t == "object" && !Array.isArray(t) && (n = t, t = void 0);
  const a = Object.assign({ relaxed: !0, legacy: !1 }, n, {
    seenObjects: [{ propertyName: "(root)", obj: null }]
  }), i = Pt(e, a);
  return JSON.stringify(i, t, r);
}
function Ty(e, t) {
  return t = t || {}, JSON.parse(zl(e, t));
}
function Sy(e, t) {
  return t = t || {}, $l(JSON.stringify(e), t);
}
const ua = /* @__PURE__ */ Object.create(null);
ua.parse = $l;
ua.stringify = zl;
ua.serialize = Ty;
ua.deserialize = Sy;
Object.freeze(ua);
const Qe = {
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
function vs(e, t) {
  try {
    return we.getNonnegativeInt32LE(e, t);
  } catch (r) {
    throw new Lt("BSON size cannot be negative", t, { cause: r });
  }
}
function ws(e, t) {
  let r = t;
  for (; e[r]; r++)
    ;
  if (r >= e.length - 1)
    throw new Lt("Null terminator not found", t);
  return r;
}
function ky(e, t = 0) {
  if (t ?? (t = 0), e.length < 5)
    throw new Lt(`Input must be at least 5 bytes, got ${e.length} bytes`, t);
  const r = vs(e, t);
  if (r > e.length - t)
    throw new Lt(`Parsed documentSize (${r} bytes) does not match input length (${e.length} bytes)`, t);
  if (e[t + r - 1] !== 0)
    throw new Lt("BSON documents must end in 0x00", t + r);
  const n = [];
  let a = t + 4;
  for (; a <= r + t; ) {
    const i = e[a];
    if (a += 1, i === 0) {
      if (a - t !== r)
        throw new Lt("Invalid 0x00 type byte", a);
      break;
    }
    const s = a, f = ws(e, a) - s;
    a += f + 1;
    let c;
    if (i === Qe.double || i === Qe.long || i === Qe.date || i === Qe.timestamp)
      c = 8;
    else if (i === Qe.int)
      c = 4;
    else if (i === Qe.objectId)
      c = 12;
    else if (i === Qe.decimal)
      c = 16;
    else if (i === Qe.bool)
      c = 1;
    else if (i === Qe.null || i === Qe.undefined || i === Qe.maxKey || i === Qe.minKey)
      c = 0;
    else if (i === Qe.regex)
      c = ws(e, ws(e, a) + 1) + 1 - a;
    else if (i === Qe.object || i === Qe.array || i === Qe.javascriptWithScope)
      c = vs(e, a);
    else if (i === Qe.string || i === Qe.binData || i === Qe.dbPointer || i === Qe.javascript || i === Qe.symbol)
      c = vs(e, a) + 4, i === Qe.binData && (c += 1), i === Qe.dbPointer && (c += 12);
    else
      throw new Lt(`Invalid 0x${i.toString(16).padStart(2, "0")} type byte`, a);
    if (a + c > t + r - 1)
      throw new Lt("value reports length larger than document", a);
    n.push([i, s, f, a, c]), a += c;
  }
  return n;
}
const si = /* @__PURE__ */ Object.create(null);
si.parseToElements = ky;
si.ByteUtils = X;
si.NumberUtils = we;
Object.freeze(si);
const Gl = 1024 * 1024 * 17;
let rn = X.allocate(Gl);
function Ay(e) {
  rn.length < e && (rn = X.allocate(e));
}
function Fy(e, t = {}) {
  const r = typeof t.checkKeys == "boolean" ? t.checkKeys : !1, n = typeof t.serializeFunctions == "boolean" ? t.serializeFunctions : !1, a = typeof t.ignoreUndefined == "boolean" ? t.ignoreUndefined : !0, i = typeof t.minInternalBufferSize == "number" ? t.minInternalBufferSize : Gl;
  rn.length < i && (rn = X.allocate(i));
  const s = Hl(rn, e, r, 0, n, a, null), f = X.allocateUnsafe(s);
  return f.set(rn.subarray(0, s), 0), f;
}
function by(e, t, r = {}) {
  const n = typeof r.checkKeys == "boolean" ? r.checkKeys : !1, a = typeof r.serializeFunctions == "boolean" ? r.serializeFunctions : !1, i = typeof r.ignoreUndefined == "boolean" ? r.ignoreUndefined : !0, s = typeof r.index == "number" ? r.index : 0, f = Hl(rn, e, n, 0, a, i, null);
  return t.set(rn.subarray(0, f), s), s + f - 1;
}
function Cy(e, t = {}) {
  return Wl(X.toLocalBufferType(e), t);
}
function Oy(e, t = {}) {
  t = t || {};
  const r = typeof t.serializeFunctions == "boolean" ? t.serializeFunctions : !1, n = typeof t.ignoreUndefined == "boolean" ? t.ignoreUndefined : !0;
  return YE(e, r, n);
}
function Iy(e, t, r, n, a, i) {
  const s = Object.assign({ allowObjectSmallerThanBufferSize: !0, index: 0 }, i), f = X.toLocalBufferType(e);
  let c = t;
  for (let o = 0; o < r; o++) {
    const l = we.getInt32LE(f, c);
    s.index = c, n[a + o] = Wl(f, s), c = c + l;
  }
  return c;
}
var Vr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BSONError: J,
  BSONOffsetError: Lt,
  BSONRegExp: _t,
  BSONRuntimeError: Bs,
  BSONSymbol: ha,
  BSONType: TE,
  BSONValue: et,
  BSONVersionError: Ki,
  Binary: cr,
  ByteUtils: X,
  Code: cn,
  DBRef: zt,
  Decimal128: Mr,
  Double: mt,
  EJSON: ua,
  Int32: on,
  Long: me,
  MaxKey: oa,
  MinKey: la,
  NumberUtils: we,
  ObjectId: On,
  Timestamp: na,
  UUID: kr,
  bsonType: ca,
  calculateObjectSize: Oy,
  deserialize: Cy,
  deserializeStream: Iy,
  onDemand: si,
  serialize: Fy,
  serializeWithBufferAndIndex: by,
  setInternalBufferSize: Ay
});
const Hn = 1;
function Vn(e) {
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
function $n(e) {
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
class Ny {
  constructor(t) {
    ge(this, "dataDir");
    ge(this, "blueprintPath");
    ge(this, "filesPath");
    ge(this, "legacyPath");
    ge(this, "queuePath");
    ge(this, "syncConfigPath");
    ge(this, "appSettingsPath");
    this.dataDir = t, this.blueprintPath = Fr.join(t, "blueprint.bson"), this.filesPath = Fr.join(t, "files.bson"), this.legacyPath = Fr.join(t, "filemap-data.bson"), this.queuePath = Fr.join(t, "sync-queue.bson"), this.syncConfigPath = Fr.join(t, "sync-config.bson"), this.appSettingsPath = Fr.join(t, "app-settings.bson");
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
    if (!Dt(t))
      return {
        filePath: t,
        sizeBytes: 0,
        exists: !1,
        lastModified: null
      };
    const r = await Pr.stat(t);
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
    await Pr.mkdir(Fr.dirname(t), { recursive: !0 });
    const n = Vr.serialize(r), a = `${t}.tmp`;
    await Pr.writeFile(a, n), await Pr.rename(a, t);
  }
  async migrateLegacyIfNeeded() {
    if (Dt(this.legacyPath) && !Dt(this.blueprintPath) && !Dt(this.filesPath))
      try {
        const t = await Pr.readFile(this.legacyPath);
        if (t.byteLength > 0) {
          const r = Vr.deserialize(t), n = Array.isArray(r.locations) ? r.locations.map(Vn).filter((i) => i.id) : [], a = Array.isArray(r.files) ? r.files.map($n).filter((i) => i.id) : [];
          await this.saveBlueprint(n), await this.saveFiles(a);
        }
      } catch (t) {
        console.error("Legacy BSON migration skipped:", t);
      }
  }
  async load() {
    await this.migrateLegacyIfNeeded();
    let t = [];
    if (Dt(this.blueprintPath)) {
      const n = await Pr.readFile(this.blueprintPath);
      if (n.byteLength > 0) {
        const a = Vr.deserialize(n);
        Array.isArray(a.locations) && (t = a.locations.map(Vn).filter((i) => i.id));
      }
    } else
      await this.saveBlueprint([]);
    let r = [];
    if (Dt(this.filesPath)) {
      const n = await Pr.readFile(this.filesPath);
      if (n.byteLength > 0) {
        const a = Vr.deserialize(n);
        Array.isArray(a.files) && (r = a.files.map($n).filter((i) => i.id));
      }
    } else
      await this.saveFiles([]);
    return {
      version: Hn,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      locations: t,
      files: r
    };
  }
  async saveBlueprint(t) {
    const r = {
      version: Hn,
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
      version: Hn,
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
      version: Hn,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      locations: n.locations
    } : {
      version: Hn,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      files: n.files
    }, i = Vr.serialize(a);
    await Pr.writeFile(r, i);
  }
  async importFromFile(t, r) {
    const n = await Pr.readFile(r), a = Vr.deserialize(n);
    if (t === "blueprint") {
      const s = Array.isArray(a.locations) ? a.locations.map(Vn).filter((f) => f.id) : [];
      return await this.saveBlueprint(s), { locations: s };
    }
    const i = Array.isArray(a.files) ? a.files.map($n).filter((s) => s.id) : [];
    return await this.saveFiles(i), { files: i };
  }
  async readRawBson(t) {
    await this.load();
    const r = t === "blueprint" ? this.blueprintPath : this.filesPath;
    return Pr.readFile(r);
  }
  async writeRawBson(t, r) {
    const n = Vr.deserialize(r);
    if (t === "blueprint") {
      const i = Array.isArray(n.locations) ? n.locations.map(Vn).filter((s) => s.id) : [];
      await this.saveBlueprint(i);
      return;
    }
    const a = Array.isArray(n.files) ? n.files.map($n).filter((i) => i.id) : [];
    await this.saveFiles(a);
  }
  async loadSyncConfig() {
    if (!Dt(this.syncConfigPath))
      return { role: "standalone", adminIp: "", port: 4747 };
    try {
      const t = await Pr.readFile(this.syncConfigPath), r = Vr.deserialize(t);
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
  async loadAppSettings() {
    if (!Dt(this.appSettingsPath))
      return { autoStartOnBoot: !1, runInBackground: !0 };
    try {
      const t = await Pr.readFile(this.appSettingsPath), r = Vr.deserialize(t);
      return {
        autoStartOnBoot: !!r.autoStartOnBoot,
        runInBackground: r.runInBackground !== !1
      };
    } catch {
      return { autoStartOnBoot: !1, runInBackground: !0 };
    }
  }
  async saveAppSettings(t) {
    await this.writeAtomicBson(
      this.appSettingsPath,
      t
    );
  }
  async loadSyncQueue() {
    if (!Dt(this.queuePath)) return [];
    try {
      const t = await Pr.readFile(this.queuePath);
      if (t.byteLength === 0) return [];
      const r = Vr.deserialize(t);
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
        const c = $n(f.file), o = a.findIndex((l) => l.id === c.id);
        o >= 0 ? a[o] = c : a.unshift(c), s = !0;
      } else if (f.type === "delete_file")
        a = a.filter((c) => c.id !== f.fileId), s = !0;
      else if (f.type === "replace_files")
        a = f.files.map($n).filter((c) => c.id), s = !0;
      else if (f.type === "upsert_location") {
        const c = Vn(f.location), o = n.findIndex((l) => l.id === c.id);
        o >= 0 ? n[o] = c : n.push(c), i = !0;
      } else f.type === "delete_location" ? (n = n.filter((c) => c.id !== f.locationId), i = !0) : f.type === "replace_blueprint" && (n = f.locations.map(Vn).filter((c) => c.id), i = !0);
    return i && await this.saveBlueprint(n), s && await this.saveFiles(a), {
      version: Hn,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      locations: n,
      files: a
    };
  }
}
function By() {
  const e = vh.networkInterfaces(), t = [];
  for (const r of Object.keys(e))
    for (const n of e[r] ?? [])
      n.family === "IPv4" && !n.internal && t.push(n.address);
  return t;
}
function lc(e, t) {
  const r = e.trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "");
  return r ? r.includes(":") ? `http://${r}` : `http://${r}:${t}` : "";
}
class Dy {
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
      localIps: By(),
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
    const t = mh.createServer(async (r, n) => {
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
          const s = Buffer.concat(i), f = Vr.deserialize(s), c = Array.isArray(f.ops) ? f.ops : [], o = await this.store.applySyncOperations(c);
          this.lastSyncedAt = (/* @__PURE__ */ new Date()).toISOString(), this.onDataUpdated(o), this.emitStatus();
          const l = Vr.serialize({ ok: !0, data: o });
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
    const t = lc(this.config.adminIp, this.config.port);
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
    const t = lc(this.config.adminIp, this.config.port);
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
      const n = Vr.serialize({ ops: r }), a = await fetch(`${t}/api/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: new Uint8Array(n),
        signal: AbortSignal.timeout(6e3)
      });
      if (!a.ok)
        throw new Error(`Sync failed (${a.status})`);
      const i = Buffer.from(await a.arrayBuffer()), s = Vr.deserialize(i);
      return await this.store.saveSyncQueue([]), s.data && (await this.store.saveBlueprint(s.data.locations), await this.store.saveFiles(s.data.files), this.onDataUpdated(s.data)), this.adminOnline = !0, this.lastSyncedAt = (/* @__PURE__ */ new Date()).toISOString(), this.lastError = null, await this.emitStatus(), { ok: !0, syncedCount: r.length, data: s.data };
    } catch (r) {
      const n = r instanceof Error ? r.message : "Admin offline";
      return this.adminOnline = !1, this.lastError = n, await this.emitStatus(), { ok: !1, syncedCount: 0, error: n };
    } finally {
      this.syncing = !1;
    }
  }
}
const jl = Fr.dirname(ph(import.meta.url));
process.env.APP_ROOT = Fr.join(jl, "..");
const Ds = process.env.VITE_DEV_SERVER_URL, jy = Fr.join(process.env.APP_ROOT, "dist-electron"), Xl = Fr.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Ds ? Fr.join(process.env.APP_ROOT, "public") : Xl;
let He = null, mn = null, _s = null, Vt = null, Or = { autoStartOnBoot: !1, runInBackground: !0 }, O0 = !1;
function pt() {
  return _s || (_s = new Ny(tn.getPath("userData"))), _s;
}
function gn() {
  return Vt || (Vt = new Dy(pt(), {
    onDataUpdated: (e) => {
      He == null || He.webContents.send("filemap:data-updated", e);
    },
    onStatusChanged: (e) => {
      He == null || He.webContents.send("filemap:sync-status-changed", e);
    }
  })), Vt;
}
function Ry() {
  Lr.handle("filemap:load", async () => pt().load()), Lr.handle("filemap:save-blueprint", async (e, t) => {
    const r = await pt().saveBlueprint(t);
    return await gn().enqueueOperation({
      id: `op_${Date.now().toString(36)}`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      type: "replace_blueprint",
      locations: t
    }), r;
  }), Lr.handle("filemap:save-files", async (e, t) => {
    const r = await pt().saveFiles(t);
    return await gn().enqueueOperation({
      id: `op_${Date.now().toString(36)}`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      type: "replace_files",
      files: t
    }), r;
  }), Lr.handle("filemap:sync-status", async () => gn().getStatus()), Lr.handle("filemap:set-sync-config", async (e, t) => gn().setConfig(t)), Lr.handle("filemap:download-from-admin", async () => gn().downloadFromAdmin()), Lr.handle("filemap:sync-now", async () => gn().syncNow()), Lr.handle("filemap:get-app-settings", async () => Or), Lr.handle("filemap:set-app-settings", async (e, t) => (Or = {
    autoStartOnBoot: !!t.autoStartOnBoot,
    runInBackground: !!t.runInBackground
  }, await pt().saveAppSettings(Or), I0(Or.autoStartOnBoot), Yl(), Or)), Lr.handle("filemap:storage-info", async () => pt().getStorageInfo()), Lr.handle("filemap:open-data-folder", async () => {
    const e = pt().getFilesPath();
    uh.showItemInFolder(e);
  }), Lr.handle("filemap:export-bson", async (e, t) => {
    const r = He ?? Gn.getFocusedWindow(), a = {
      title: `Export ${t === "blueprint" ? "Blueprint" : "Files"} as BSON`,
      defaultPath: `${t === "blueprint" ? "blueprint" : "files"}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.bson`,
      filters: [{ name: "BSON Database", extensions: ["bson"] }]
    }, i = r ? await Jt.showSaveDialog(r, a) : await Jt.showSaveDialog(a);
    return i.canceled || !i.filePath ? { canceled: !0 } : (await pt().exportToFile(t, i.filePath), { canceled: !1, target: t, filePath: i.filePath });
  }), Lr.handle("filemap:import-bson", async (e, t) => {
    const r = He ?? Gn.getFocusedWindow(), n = {
      title: `Import ${t === "blueprint" ? "Blueprint" : "Files"} BSON`,
      properties: ["openFile"],
      filters: [{ name: "BSON Database", extensions: ["bson"] }]
    }, a = r ? await Jt.showOpenDialog(r, n) : await Jt.showOpenDialog(n);
    if (a.canceled || a.filePaths.length === 0)
      return { canceled: !0 };
    const i = await pt().importFromFile(t, a.filePaths[0]);
    return {
      canceled: !1,
      target: t,
      filePath: a.filePaths[0],
      locations: i.locations,
      files: i.files
    };
  }), Lr.handle("filemap:download-sample-excel", async () => {
    const e = He ?? Gn.getFocusedWindow(), t = {
      title: "Save Sample Excel Template",
      defaultPath: "filemap-sample.xlsx",
      filters: [{ name: "Excel Workbook", extensions: ["xlsx"] }]
    }, r = e ? await Jt.showSaveDialog(e, t) : await Jt.showSaveDialog(t);
    if (r.canceled || !r.filePath)
      return { canceled: !0 };
    const n = [
      { sno: 1, filename: "GST Returns FY 2025-26", "file number": "FIN-014" },
      { sno: 2, filename: "Vendor Invoices Q3", "file number": "VND-089" },
      { sno: 3, filename: "Employee Offer Letters & NDAs", "file number": "HR-021" }
    ], a = wi.json_to_sheet(n);
    a["!cols"] = [{ wch: 8 }, { wch: 36 }, { wch: 16 }];
    const i = wi.book_new();
    wi.book_append_sheet(i, a, "Files");
    const s = vl(i, { type: "buffer", bookType: "xlsx" });
    return await Pr.writeFile(r.filePath, s), { canceled: !1, filePath: r.filePath };
  }), Lr.handle("filemap:import-excel", async () => {
    const e = He ?? Gn.getFocusedWindow(), t = {
      title: "Upload Excel / CSV File List",
      properties: ["openFile"],
      filters: [
        { name: "Excel & CSV Files", extensions: ["xlsx", "xls", "csv"] }
      ]
    }, r = e ? await Jt.showOpenDialog(e, t) : await Jt.showOpenDialog(t);
    if (r.canceled || r.filePaths.length === 0)
      return { canceled: !0 };
    const n = r.filePaths[0];
    try {
      const a = await Pr.readFile(n), i = Ns(a, { type: "buffer" }), s = i.SheetNames[0];
      if (!s)
        return { canceled: !1, filePath: n, error: "Excel file has no sheets." };
      const f = i.Sheets[s], c = wi.sheet_to_json(f, {
        defval: ""
      }), o = (h) => h.toLowerCase().replace(/[\s._-]+/g, ""), l = [];
      for (const h of c) {
        const u = Object.entries(h);
        let x = "", g = "", d = "";
        for (const [p, w] of u) {
          const y = o(p), v = String(w ?? "").trim();
          !x && ["sno", "slno", "srno", "serial", "serialno", "serialnumber"].includes(y) ? x = v : !d && ["filenumber", "fileno", "filecode", "filenum", "fnum", "fno", "docno", "number", "code", "ref", "refno"].includes(y) ? d = v : !g && ["filename", "name", "title", "particulars", "subject", "description", "details", "document", "documentname", "file"].includes(y) && (g = v);
        }
        if (!g && u.length >= 2) {
          const p = u.map(([, w]) => String(w ?? "").trim()).filter((w) => w !== x && w !== d);
          !x && !d && u.length >= 3 ? (x = p[0] ?? "", g = p[1] ?? "", d = p[2] ?? "") : p.length > 0 && (g = p[0], !d && p.length > 1 && (d = p[1]));
        }
        (g || d) && l.push({
          sno: x,
          title: g || `File ${d}`,
          fileCode: d.toUpperCase()
        });
      }
      return {
        canceled: !1,
        filePath: n,
        fileName: Fr.basename(n),
        rows: l
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
function I0(e) {
  try {
    tn.setLoginItemSettings({
      openAtLogin: e,
      path: process.execPath,
      args: e ? ["--hidden"] : []
    });
  } catch (t) {
    console.error("Failed to update login item settings:", t);
  }
}
function Ly() {
  const t = Buffer.alloc(1024);
  for (let r = 0; r < 16; r++)
    for (let n = 0; n < 16; n++) {
      const a = (r * 16 + n) * 4, i = n === 0 || r === 0 || n === 15 || r === 15, s = n >= 5 && n <= 10 && r >= 5 && r <= 10;
      i ? (t[a] = 55, t[a + 1] = 48, t[a + 2] = 163, t[a + 3] = 255) : s ? (t[a] = 255, t[a + 1] = 255, t[a + 2] = 255, t[a + 3] = 255) : (t[a] = 79, t[a + 1] = 70, t[a + 2] = 229, t[a + 3] = 255);
    }
  return dh.createFromBitmap(t, { width: 16, height: 16 });
}
function Yl() {
  if (!mn) return;
  const e = () => {
    He ? (He.show(), He.focus()) : qi(!1);
  }, t = gh.buildFromTemplate([
    { label: "Open FileMap", click: e },
    {
      label: "Start on System Boot",
      type: "checkbox",
      checked: Or.autoStartOnBoot,
      click: async (r) => {
        Or = { ...Or, autoStartOnBoot: r.checked }, await pt().saveAppSettings(Or), I0(Or.autoStartOnBoot), He == null || He.webContents.send("filemap:app-settings-changed", Or);
      }
    },
    { type: "separator" },
    {
      label: "Quit FileMap",
      click: () => {
        O0 = !0, Vt == null || Vt.dispose(), tn.quit();
      }
    }
  ]);
  mn.setContextMenu(t);
}
function Py() {
  if (mn) return;
  const e = Ly();
  mn = new xh(e), mn.setToolTip("FileMap — Office File Locator");
  const t = () => {
    He ? (He.show(), He.focus()) : qi(!1);
  };
  Yl(), mn.on("click", t), mn.on("double-click", t);
}
function qi(e = !1) {
  He = new Gn({
    title: "FileMap — Office File Locator",
    width: 1240,
    height: 800,
    minWidth: 940,
    minHeight: 620,
    show: !e,
    backgroundColor: "#f8fafc",
    icon: Fr.join(process.env.VITE_PUBLIC, "logomain.png"),
    webPreferences: {
      preload: Fr.join(jl, "preload.mjs")
    }
  }), He.setMenuBarVisibility(!1), He.on("close", (t) => {
    !O0 && Or.runInBackground && (t.preventDefault(), He == null || He.hide());
  }), Ds ? He.loadURL(Ds) : He.loadFile(Fr.join(Xl, "index.html"));
}
tn.on("before-quit", () => {
  O0 = !0;
});
tn.on("window-all-closed", () => {
  process.platform !== "darwin" && !Or.runInBackground && (Vt == null || Vt.dispose(), tn.quit(), He = null);
});
tn.on("activate", () => {
  Gn.getAllWindows().length === 0 ? qi(!1) : He == null || He.show();
});
tn.whenReady().then(async () => {
  Ry(), Or = await pt().loadAppSettings(), I0(Or.autoStartOnBoot), await gn().init(), Py();
  const e = process.argv.includes("--hidden") && Or.runInBackground;
  qi(e);
});
export {
  jy as MAIN_DIST,
  Xl as RENDERER_DIST,
  Ds as VITE_DEV_SERVER_URL
};
