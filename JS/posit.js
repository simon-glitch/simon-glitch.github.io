

(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../../../node_modules/double-double/node/double-double/binary/dd-diff-dd.js
  function ddDiffDd(x, y) {
    const xl = x[0];
    const xh = x[1];
    const yl = y[0];
    const yh = y[1];
    const sh = xh - yh;
    const _1 = sh - xh;
    const sl = xh - (sh - _1) + (-yh - _1);
    const th = xl - yl;
    const _2 = th - xl;
    const tl = xl - (th - _2) + (-yl - _2);
    const c = sl + th;
    const vh = sh + c;
    const vl = c - (vh - sh);
    const w = tl + vl;
    const zh = vh + w;
    const zl = w - (zh - vh);
    return [zl, zh];
  }
  var init_dd_diff_dd = __esm({
    "../../../node_modules/double-double/node/double-double/binary/dd-diff-dd.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-double/binary/dd-min.js
  function ddMin(a, b) {
    const res = diff(a, b)[1];
    return res > 0 ? b : a;
  }
  var diff;
  var init_dd_min = __esm({
    "../../../node_modules/double-double/node/double-double/binary/dd-min.js"() {
      init_dd_diff_dd();
      diff = ddDiffDd;
    }
  });

  // ../../../node_modules/double-double/node/double-double/binary/dd-max.js
  function ddMax(a, b) {
    const res = diff2(a, b)[1];
    return res > 0 ? a : b;
  }
  var diff2;
  var init_dd_max = __esm({
    "../../../node_modules/double-double/node/double-double/binary/dd-max.js"() {
      init_dd_diff_dd();
      diff2 = ddDiffDd;
    }
  });

  // ../../../node_modules/double-double/node/double-double/unary/dd-sqrt.js
  function ddSqrt(x) {
    const xl = x[0];
    const xh = x[1];
    if (xh === 0) {
      return [0, 0];
    }
    const s = Math.sqrt(xh);
    const th = s * s;
    const c = f * s;
    const ah = c - (c - s);
    const al = s - ah;
    const tl = al * al - (th - ah * ah - 2 * (ah * al));
    const e = (xh - th - tl + xl) * 0.5 / s;
    return [e - (s + e - s), s + e];
  }
  var f;
  var init_dd_sqrt = __esm({
    "../../../node_modules/double-double/node/double-double/unary/dd-sqrt.js"() {
      f = 134217729;
    }
  });

  // ../../../node_modules/double-double/node/double-mixed-double-double/double-sqrt.js
  function doubleSqrt(x) {
    if (x === 0) {
      return [0, 0];
    }
    const s = Math.sqrt(x);
    const th = s * s;
    const c = f2 * s;
    const ah = c - (c - s);
    const al = s - ah;
    const tl = al * al - (th - ah * ah - 2 * (ah * al));
    const e = (x - th - tl) * 0.5 / s;
    x = s + e;
    const xl = e - (x - s);
    return [xl, x];
  }
  var f2;
  var init_double_sqrt = __esm({
    "../../../node_modules/double-double/node/double-mixed-double-double/double-sqrt.js"() {
      f2 = 134217729;
    }
  });

  // ../../../node_modules/double-double/node/double-with-err/sqrt-with-err.js
  function sqrtWithErr(x, x_) {
    if (x - x_ <= 0) {
      const est2 = x > 0 ? Math.sqrt(x) : 0;
      return {
        est: est2,
        err: Math.max(Math.sqrt(x + x_) - est2, est2)
      };
    }
    const est = Math.sqrt(x);
    const minSqrt = Math.sqrt(x - x_);
    const maxSqrt = Math.sqrt(x + x_);
    const err = Math.max(Math.abs(minSqrt - est), Math.abs(maxSqrt - est));
    return { est, err };
  }
  var eps;
  var init_sqrt_with_err = __esm({
    "../../../node_modules/double-double/node/double-with-err/sqrt-with-err.js"() {
      eps = Number.EPSILON;
    }
  });

  // ../../../node_modules/double-double/node/double-double/unary/dd-abs.js
  function ddAbs(f10) {
    const Q = f10[1];
    return Q < 0 ? [-f10[0], -Q] : f10;
  }
  var init_dd_abs = __esm({
    "../../../node_modules/double-double/node/double-double/unary/dd-abs.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-mixed-double-double/dd-add-double.js
  function ddAddDouble(x, y) {
    const xl = x[0];
    const xh = x[1];
    const sh = xh + y;
    const c = sh - xh;
    const sl = xh - (sh - c) + (y - c);
    const v = xl + sl;
    const zh = sh + v;
    const zl = v - (zh - sh);
    return [zl, zh];
  }
  var init_dd_add_double = __esm({
    "../../../node_modules/double-double/node/double-mixed-double-double/dd-add-double.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-double/binary/dd-add-dd.js
  function ddAddDd(x, y) {
    const xl = x[0];
    const xh = x[1];
    const yl = y[0];
    const yh = y[1];
    const sh = xh + yh;
    const _1 = sh - xh;
    const sl = xh - (sh - _1) + (yh - _1);
    const th = xl + yl;
    const _2 = th - xl;
    const tl = xl - (th - _2) + (yl - _2);
    const c = sl + th;
    const vh = sh + c;
    const vl = c - (vh - sh);
    const w = tl + vl;
    const zh = vh + w;
    const zl = w - (zh - vh);
    return [zl, zh];
  }
  var init_dd_add_dd = __esm({
    "../../../node_modules/double-double/node/double-double/binary/dd-add-dd.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-double/binary/dd-mult-dd.js
  function ddMultDd(x, y) {
    const xh = x[1];
    const yh = y[1];
    const ch = xh * yh;
    const c = f3 * xh;
    const ah = c - (c - xh);
    const al = xh - ah;
    const d2 = f3 * yh;
    const bh = d2 - (d2 - yh);
    const bl = yh - bh;
    const cl1 = al * bl - (ch - ah * bh - al * bh - ah * bl);
    const b = cl1 + (xh * y[0] + x[0] * yh);
    const xx = ch + b;
    return [b - (xx - ch), xx];
  }
  var f3;
  var init_dd_mult_dd = __esm({
    "../../../node_modules/double-double/node/double-double/binary/dd-mult-dd.js"() {
      f3 = 2 ** 27 + 1;
    }
  });

  // ../../../node_modules/double-double/node/double-double/multi/dd-product.js
  function ddProduct(qs) {
    let q = qs[0];
    for (let i = 1; i < qs.length; i++) {
      q = ddMultDd(q, qs[i]);
    }
    return q;
  }
  var init_dd_product = __esm({
    "../../../node_modules/double-double/node/double-double/multi/dd-product.js"() {
      init_dd_mult_dd();
    }
  });

  // ../../../node_modules/double-double/node/double-double/multi/dd-sum.js
  function ddSum(qs) {
    let q = qs[0];
    for (let i = 1; i < qs.length; i++) {
      q = ddAddDd(q, qs[i]);
    }
    return q;
  }
  var init_dd_sum = __esm({
    "../../../node_modules/double-double/node/double-double/multi/dd-sum.js"() {
      init_dd_add_dd();
    }
  });

  // ../../../node_modules/double-double/node/double-double/binary/dd-compare.js
  function ddCompare(x, y) {
    const xl = x[0];
    const xh = x[1];
    const yl = y[0];
    const yh = y[1];
    const sh = xh - yh;
    const _1 = sh - xh;
    const sl = xh - (sh - _1) + (-yh - _1);
    const th = xl - yl;
    const _2 = th - xl;
    const tl = xl - (th - _2) + (-yl - _2);
    const c = sl + th;
    const vh = sh + c;
    const vl = c - (vh - sh);
    const w = tl + vl;
    const zh = vh + w;
    return zh;
  }
  var init_dd_compare = __esm({
    "../../../node_modules/double-double/node/double-double/binary/dd-compare.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-mixed-double-double/dd-mult-double.js
  function ddMultDouble1(y, x) {
    const xl = x[0];
    const xh = x[1];
    const ch = xh * y;
    const c = f4 * xh;
    const ah = c - (c - xh);
    const al = xh - ah;
    const d2 = f4 * y;
    const bh = d2 - (d2 - y);
    const bl = y - bh;
    const cl1 = al * bl - (ch - ah * bh - al * bh - ah * bl);
    const cl2 = xl * y;
    const th = ch + cl2;
    const tl1 = cl2 - (th - ch);
    const tl2 = tl1 + cl1;
    const zh = th + tl2;
    const zl = tl2 - (zh - th);
    return [zl, zh];
  }
  function ddMultDouble2(y, x) {
    const xl = x[0];
    const xh = x[1];
    const ch = xh * y;
    const c = f4 * xh;
    const ah = c - (c - xh);
    const al = xh - ah;
    const d2 = f4 * y;
    const bh = d2 - (d2 - y);
    const bl = y - bh;
    const cl1 = al * bl - (ch - ah * bh - al * bh - ah * bl);
    const cl2 = xl * y;
    const cl3 = cl1 + cl2;
    const xx = ch + cl3;
    return [cl3 - (xx - ch), xx];
  }
  var f4;
  var init_dd_mult_double = __esm({
    "../../../node_modules/double-double/node/double-mixed-double-double/dd-mult-double.js"() {
      f4 = 134217729;
    }
  });

  // ../../../node_modules/double-double/node/double-double/unary/dd-mult-by-2.js
  function ddMultBy2(f10) {
    return [2 * f10[0], 2 * f10[1]];
  }
  var init_dd_mult_by_2 = __esm({
    "../../../node_modules/double-double/node/double-double/unary/dd-mult-by-2.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-double/unary/dd-mult-by-4.js
  function ddMultBy4(f10) {
    return [4 * f10[0], 4 * f10[1]];
  }
  var init_dd_mult_by_4 = __esm({
    "../../../node_modules/double-double/node/double-double/unary/dd-mult-by-4.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-double/unary/dd-div-by-2.js
  function ddDivBy2(f10) {
    return [f10[0] / 2, f10[1] / 2];
  }
  var init_dd_div_by_2 = __esm({
    "../../../node_modules/double-double/node/double-double/unary/dd-div-by-2.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-double/unary/dd-mult-by-neg-2.js
  function ddMultByNeg2(f10) {
    return [-2 * f10[0], -2 * f10[1]];
  }
  var init_dd_mult_by_neg_2 = __esm({
    "../../../node_modules/double-double/node/double-double/unary/dd-mult-by-neg-2.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-double/unary/dd-mult-by-neg-4.js
  function ddMultByNeg4(f10) {
    return [-4 * f10[0], -4 * f10[1]];
  }
  var init_dd_mult_by_neg_4 = __esm({
    "../../../node_modules/double-double/node/double-double/unary/dd-mult-by-neg-4.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-mixed-double-double/dd-div-double.js
  function ddDivDouble(x, y) {
    const xl = x[0];
    const xh = x[1];
    const th = xh / y;
    const \u03C0h = th * y;
    const c = f5 * th;
    const ah = c - (c - th);
    const al = th - ah;
    const d2 = f5 * y;
    const bh = d2 - (d2 - y);
    const bl = y - bh;
    const \u03C0l = al * bl - (\u03C0h - ah * bh - al * bh - ah * bl);
    const \u03B4h = xh - \u03C0h;
    const \u03B4t = \u03B4h - \u03C0l;
    const \u03B4 = \u03B4t + xl;
    const tl = \u03B4 / y;
    const rl = th + tl;
    return [tl - (rl - th), rl];
  }
  var f5;
  var init_dd_div_double = __esm({
    "../../../node_modules/double-double/node/double-mixed-double-double/dd-div-double.js"() {
      f5 = 134217729;
    }
  });

  // ../../../node_modules/double-double/node/double-double/binary/dd-div-dd.js
  function ddDivDd(x, y) {
    const xl = x[0];
    const xh = x[1];
    const yl = y[0];
    const yh = y[1];
    const th = xh / yh;
    const ch = yh * th;
    const c = f6 * yh;
    const ah = c - (c - yh);
    const al = yh - ah;
    const d2 = f6 * th;
    const bh = d2 - (d2 - th);
    const bl = th - bh;
    const cl1 = al * bl - (ch - ah * bh - al * bh - ah * bl);
    const cl2 = yl * th;
    const th_ = ch + cl2;
    const tl1 = cl2 - (th_ - ch);
    const tl2 = tl1 + cl1;
    const rh = th_ + tl2;
    const rl = tl2 - (rh - th_);
    const \u03C0h = xh - rh;
    const \u03B4l = xl - rl;
    const \u03B4 = \u03C0h + \u03B4l;
    const tl = \u03B4 / yh;
    const xx = th + tl;
    return [tl - (xx - th), xx];
  }
  var f6;
  var init_dd_div_dd = __esm({
    "../../../node_modules/double-double/node/double-double/binary/dd-div-dd.js"() {
      f6 = 134217729;
    }
  });

  // ../../../node_modules/double-double/node/double-double/unary/dd-negative-of.js
  function ddNegativeOf(f10) {
    return [-f10[0], -f10[1]];
  }
  var init_dd_negative_of = __esm({
    "../../../node_modules/double-double/node/double-double/unary/dd-negative-of.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-double/unary/dd-sign.js
  function ddSign(f10) {
    return f10[1];
  }
  var init_dd_sign = __esm({
    "../../../node_modules/double-double/node/double-double/unary/dd-sign.js"() {
    }
  });

  // ../../../node_modules/double-double/node/basic/fast-two-diff.js
  function fastTwoDiff(a, b) {
    const x = a - b;
    const y = a - x - b;
    return [y, x];
  }
  var init_fast_two_diff = __esm({
    "../../../node_modules/double-double/node/basic/fast-two-diff.js"() {
    }
  });

  // ../../../node_modules/double-double/node/basic/fast-two-sum.js
  function fastTwoSum(a, b) {
    const x = a + b;
    return [b - (x - a), x];
  }
  var init_fast_two_sum = __esm({
    "../../../node_modules/double-double/node/basic/fast-two-sum.js"() {
    }
  });

  // ../../../node_modules/double-double/node/basic/split.js
  function split(a) {
    const c = f7 * a;
    const a_h = c - (c - a);
    const a_l = a - a_h;
    return [a_h, a_l];
  }
  var f7;
  var init_split = __esm({
    "../../../node_modules/double-double/node/basic/split.js"() {
      f7 = 134217729;
    }
  });

  // ../../../node_modules/double-double/node/basic/two-diff.js
  function twoDiff(a, b) {
    const x = a - b;
    const bvirt = a - x;
    const y = a - (x + bvirt) + (bvirt - b);
    return [y, x];
  }
  var init_two_diff = __esm({
    "../../../node_modules/double-double/node/basic/two-diff.js"() {
    }
  });

  // ../../../node_modules/double-double/node/basic/two-product.js
  function twoProduct(a, b) {
    const x = a * b;
    const c = f8 * a;
    const ah = c - (c - a);
    const al = a - ah;
    const d2 = f8 * b;
    const bh = d2 - (d2 - b);
    const bl = b - bh;
    const y = al * bl - (x - ah * bh - al * bh - ah * bl);
    return [y, x];
  }
  var f8;
  var init_two_product = __esm({
    "../../../node_modules/double-double/node/basic/two-product.js"() {
      f8 = 134217729;
    }
  });

  // ../../../node_modules/double-double/node/double-mixed-double-double/double-div-double.js
  function doubleDivDouble(x, y) {
    const th = x / y;
    const \u03C0h = th * y;
    const c = f9 * th;
    const ah = c - (c - th);
    const al = th - ah;
    const d2 = f9 * y;
    const bh = d2 - (d2 - y);
    const bl = y - bh;
    const \u03C0l = al * bl - (\u03C0h - ah * bh - al * bh - ah * bl);
    const \u03B4h = x - \u03C0h;
    const \u03B4t = \u03B4h - \u03C0l;
    const tl = \u03B4t / y;
    const xx = th + tl;
    return [tl - (xx - th), xx];
  }
  var f9;
  var init_double_div_double = __esm({
    "../../../node_modules/double-double/node/double-mixed-double-double/double-div-double.js"() {
      f9 = 134217729;
    }
  });

  // ../../../node_modules/double-double/node/basic/two-sum.js
  function twoSum(a, b) {
    const x = a + b;
    const bv = x - a;
    return [a - (x - bv) + (b - bv), x];
  }
  var init_two_sum = __esm({
    "../../../node_modules/double-double/node/basic/two-sum.js"() {
    }
  });

  // ../../../node_modules/double-double/node/basic/reduce-significand.js
  function reduceSignificand(a, bits) {
    const s = 53 - bits;
    const f10 = 2 ** s + 1;
    const c = f10 * a;
    const r = c - (c - a);
    return r;
  }
  var init_reduce_significand = __esm({
    "../../../node_modules/double-double/node/basic/reduce-significand.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-representation/double-to-octets.js
  function doubleToOctets(number) {
    const buffer = new ArrayBuffer(8);
    new DataView(buffer).setFloat64(0, number, false);
    return Array.from(new Uint8Array(buffer));
  }
  var init_double_to_octets = __esm({
    "../../../node_modules/double-double/node/double-representation/double-to-octets.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-representation/double-to-binary-string.js
  function doubleToBinaryString(number) {
    return octetsToBinaryString(doubleToOctets(number));
  }
  function octetsToBinaryString(octets) {
    return octets.map(int8ToBinaryString).join("");
  }
  function int8ToBinaryString(i) {
    let iStr = i.toString(2);
    for (; iStr.length < 8; iStr = "0" + iStr)
      ;
    return iStr;
  }
  var init_double_to_binary_string = __esm({
    "../../../node_modules/double-double/node/double-representation/double-to-binary-string.js"() {
      init_double_to_octets();
    }
  });

  // ../../../node_modules/double-double/node/double-representation/parse-double.js
  function parseDouble(x) {
    const parts = doubleToOctets(x);
    const p0 = parts[0];
    const p1 = parts[1];
    const sign = p0 >> 7;
    const exponent_ = ((p0 & 127) << 4) + ((p1 & 240) >> 4);
    const hiddenMsb = exponent_ === 0 ? 0 : 16;
    const exponent2 = exponent_ === 0 ? exponent_ - 1022 : exponent_ - 1023;
    const significand2 = parts.slice(1);
    significand2[0] = (p1 & 15) + hiddenMsb;
    return {
      sign,
      exponent: exponent2,
      significand: significand2
    };
  }
  function parseDoubleDetailed(x) {
    const str = doubleToBinaryString(x);
    const [, sign, exponent2, significand2] = str.match(/^(.)(.{11})(.{52})$/);
    const exponent_ = parseInt(exponent2, 2);
    const hidden = exponent_ === 0 ? "0" : "1";
    return {
      full: sign + exponent2 + hidden + significand2,
      sign,
      exponent: exponent2,
      hidden,
      significand: significand2
    };
  }
  var init_parse_double = __esm({
    "../../../node_modules/double-double/node/double-representation/parse-double.js"() {
      init_double_to_binary_string();
      init_double_to_octets();
    }
  });

  // ../../../node_modules/double-double/node/double-representation/significand.js
  function significand(a) {
    return parseDouble(a).significand;
  }
  var init_significand = __esm({
    "../../../node_modules/double-double/node/double-representation/significand.js"() {
      init_parse_double();
    }
  });

  // ../../../node_modules/double-double/node/double-representation/get-max-set-bit.js
  function getLowestSetBit_(a) {
    return Math.log2(a & -a);
  }
  function getLowestSetBit(a) {
    if (a === 0 || !Number.isFinite(a)) {
      return NaN;
    }
    const s = significand(a);
    const len = s.length;
    for (let i = len - 1; i >= 0; i--) {
      if (s[i] === 0) {
        continue;
      }
      const l = getLowestSetBit_(s[i]);
      if (Number.isFinite(l)) {
        return 8 * (len - i - 1) + l;
      }
    }
    return NaN;
  }
  function getHighestSetBit_(a) {
    return a >= 128 ? 7 : a >= 64 ? 6 : a >= 32 ? 5 : a >= 16 ? 4 : a >= 8 ? 3 : a >= 4 ? 2 : a >= 2 ? 1 : a >= 1 ? 0 : NaN;
  }
  function getHighestSetBit(a) {
    if (a === 0 || !Number.isFinite(a)) {
      return NaN;
    }
    const s = significand(a);
    const len = s.length;
    for (let i = 0; i < len; i++) {
      const l = getHighestSetBit_(s[i]);
      if (Number.isFinite(l)) {
        return 8 * (len - i - 1) + l;
      }
    }
    return NaN;
  }
  var init_get_max_set_bit = __esm({
    "../../../node_modules/double-double/node/double-representation/get-max-set-bit.js"() {
      init_significand();
    }
  });

  // ../../../node_modules/double-double/node/double-representation/exponent.js
  function exponent(a) {
    return parseDouble(a).exponent;
  }
  var init_exponent = __esm({
    "../../../node_modules/double-double/node/double-representation/exponent.js"() {
      init_parse_double();
    }
  });

  // ../../../node_modules/double-double/node/double-representation/is-bit-aligned.js
  function isBitAligned(a, maxBitLength, gridSpacingExponent) {
    if (a === 0) {
      return true;
    }
    const e = exponent(a);
    const maxSetBit = getHighestSetBit(a) - 52 + e;
    const minSetBit = getLowestSetBit(a) - 52 + e;
    const minBitBigEnough = minSetBit >= gridSpacingExponent;
    const maxBitSmallEnough = maxSetBit <= maxBitLength - 1 + gridSpacingExponent;
    return minBitBigEnough && maxBitSmallEnough;
  }
  var init_is_bit_aligned = __esm({
    "../../../node_modules/double-double/node/double-representation/is-bit-aligned.js"() {
      init_get_max_set_bit();
      init_exponent();
    }
  });

  // ../../../node_modules/double-double/node/double-representation/msb-exponent.js
  function msbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
      return NaN;
    }
    const e = exponent(a);
    return getHighestSetBit(a) - 52 + e;
  }
  var init_msb_exponent = __esm({
    "../../../node_modules/double-double/node/double-representation/msb-exponent.js"() {
      init_get_max_set_bit();
      init_exponent();
    }
  });

  // ../../../node_modules/double-double/node/double-representation/lsb-exponent.js
  function lsbExponent(a) {
    if (a === 0 || !Number.isFinite(a)) {
      return NaN;
    }
    const e = exponent(a);
    return getLowestSetBit(a) - 52 + e;
  }
  var init_lsb_exponent = __esm({
    "../../../node_modules/double-double/node/double-representation/lsb-exponent.js"() {
      init_get_max_set_bit();
      init_exponent();
    }
  });

  // ../../../node_modules/double-double/node/double-representation/bit-length.js
  function bitLength(a) {
    if (a === 0) {
      return 0;
    }
    return getHighestSetBit(a) - getLowestSetBit(a) + 1;
  }
  var init_bit_length = __esm({
    "../../../node_modules/double-double/node/double-representation/bit-length.js"() {
      init_get_max_set_bit();
    }
  });

  // ../../../node_modules/double-double/node/double-double-with-error/dd-div-dd-with-error.js
  function ddDivDdWithError(numer, denom, nE, dE) {
    const n = numer[0];
    const N = numer[1];
    const d2 = denom[0];
    const D = denom[1];
    const est = div(numer, denom);
    const _n = Math.abs(n + N);
    const _d = Math.abs(d2 + D);
    const \u03B4d = u * _d;
    const minD = _d - \u03B4d - dE;
    if (minD <= 0) {
      return { est, err: Number.POSITIVE_INFINITY };
    }
    const err = (_d * nE + _n * dE) / minD ** 2 + 9 * uu * Math.abs(_n / _d);
    return { est, err };
  }
  var div, eps2, u, uu;
  var init_dd_div_dd_with_error = __esm({
    "../../../node_modules/double-double/node/double-double-with-error/dd-div-dd-with-error.js"() {
      init_dd_div_dd();
      div = ddDivDd;
      eps2 = Number.EPSILON;
      u = eps2 / 2;
      uu = u * u;
    }
  });

  // ../../../node_modules/double-double/node/double-with-err/div-with-err.js
  function divWithErr(n, d2, nE, dE) {
    const est = n / d2;
    const _n = Math.abs(n);
    const _d = Math.abs(d2);
    const minD = _d - dE;
    if (minD <= 0) {
      return { est, err: Number.POSITIVE_INFINITY };
    }
    const err = (_d * nE + _n * dE) / minD ** 2 + u2 * Math.abs(_n / _d);
    return { est, err };
  }
  var u2;
  var init_div_with_err = __esm({
    "../../../node_modules/double-double/node/double-with-err/div-with-err.js"() {
      u2 = Number.EPSILON / 2;
    }
  });

  // ../../../node_modules/double-double/node/str-to-dd/get-zeros-str.js
  function getZerosStr(n) {
    return new Array(n + 1).join("0");
  }
  var init_get_zeros_str = __esm({
    "../../../node_modules/double-double/node/str-to-dd/get-zeros-str.js"() {
    }
  });

  // ../../../node_modules/double-double/node/str-to-dd/mult-str-by-pow-of-10.js
  function multStrByPowOf10(s, pow) {
    if (pow === 0 || Number(s) === 0) {
      return s;
    }
    const negative = s.indexOf("-") !== -1;
    const negativeStr = negative ? "-" : "";
    if (negative) {
      s = s.slice(1);
    }
    if (s.startsWith("+")) {
      s = s.slice(1);
    }
    const idx = s.indexOf(".");
    if (pow > 0) {
      if (idx === -1) {
        const zeros = getZerosStr(pow);
        return negativeStr + s + zeros;
      }
      const [bef2, aft2] = s.split(".");
      if (aft2.length < pow) {
        return negativeStr + bef2 + aft2 + getZerosStr(pow - aft2.length);
      } else {
        const aftP1 = aft2.substring(0, pow);
        const aftP2 = aft2.substring(pow);
        return negativeStr + bef2 + aftP1 + (aftP2 ? "." + aftP2 : "");
      }
    }
    pow = -pow;
    let bef = "";
    let aft = "";
    if (idx === -1) {
      bef = s;
    } else {
      [bef, aft] = s.split(".");
    }
    if (bef.length === pow) {
      return negativeStr + "0." + bef + aft;
    } else if (bef.length > pow) {
      const l = bef.length - pow;
      const befP1 = bef.substring(0, l);
      const befP2 = bef.substring(l);
      return negativeStr + befP1 + "." + befP2 + aft;
    } else {
      const l = pow - bef.length;
      const zeros = getZerosStr(l) || "0";
      return negativeStr + "0." + zeros + bef + aft;
    }
  }
  var init_mult_str_by_pow_of_10 = __esm({
    "../../../node_modules/double-double/node/str-to-dd/mult-str-by-pow-of-10.js"() {
      init_get_zeros_str();
    }
  });

  // ../../../node_modules/double-double/node/dd-to-str/dd-to-str.js
  function ddToStr(dd2) {
    let [l, h] = dd2;
    let negative = false;
    if (h < 0) {
      h = -h;
      l = -l;
      negative = true;
    }
    if (h === 0) {
      return "0";
    }
    const scale2 = max(0, -floor(log2(h)) + 3 * 53);
    if (scale2 === 0) {
      const llb2 = BigInt(round(l));
      const hhb2 = BigInt(round(h));
      const str2 = (llb2 + hhb2).toString();
      return negative ? "-" + str2 : str2;
    }
    const scale2b = BigInt(scale2);
    const scale10 = ceil(scale2 / LOG2_10);
    const scale10b = BigInt(scale10);
    const ll = l * 2 ** scale2;
    const hh = h * 2 ** scale2;
    const llb = BigInt(round(ll));
    const hhb = BigInt(round(hh));
    const b = (llb + hhb) * 10n ** scale10b;
    const bb = b / 2n ** scale2b;
    let bStr = bb.toString();
    let str = multStrByPowOf10(bStr, -scale10);
    str = removeExtraneousZeros(str);
    return negative ? "-" + str : str;
  }
  function removeExtraneousZeros(str) {
    const idx = str.indexOf(".");
    if (idx === -1) {
      return str;
    }
    let i = 0;
    let c = 0;
    while (i < str.length) {
      if (str[str.length - 1 - i] === "0") {
        c++;
      } else {
        break;
      }
      i++;
    }
    if (c > 0) {
      str = str.slice(0, str.length - c);
    }
    if (str.endsWith(".")) {
      str = str.slice(0, str.length - 1);
    }
    return str;
  }
  var floor, max, round, log2, log10, ceil, LOG2_10;
  var init_dd_to_str = __esm({
    "../../../node_modules/double-double/node/dd-to-str/dd-to-str.js"() {
      init_mult_str_by_pow_of_10();
      ({ floor, max, round, log2, log10, ceil } = Math);
      LOG2_10 = log2(1024) / log10(1024);
    }
  });

  // ../../../node_modules/double-double/node/str-to-dd/get-num-leading-zeros-after-point.js
  function getNumLeadingZerosAfterPoint(str) {
    if (!str.startsWith("0.")) {
      return 0;
    }
    if (Number(str) === 0) {
      return 0;
    }
    let numLeadingZeros = 1;
    for (let i = 0; i < str.length; i++) {
      if (str[i + 2] === "0") {
        numLeadingZeros++;
      } else {
        break;
      }
    }
    return numLeadingZeros;
  }
  var init_get_num_leading_zeros_after_point = __esm({
    "../../../node_modules/double-double/node/str-to-dd/get-num-leading-zeros-after-point.js"() {
    }
  });

  // ../../../node_modules/double-double/node/str-to-dd/set-0-from-to.js
  function set0FromTo(str, from, to) {
    const pointAt = str.indexOf(".");
    let i = from + (pointAt !== -1 && pointAt < from ? 1 : 0);
    let j = i;
    to = to || str.length;
    while (i < to) {
      if (str[j] === ".") {
        j++;
        continue;
      }
      str = set0At(str, j);
      i++;
      j++;
    }
    return str;
  }
  function set0At(str, idx) {
    if (idx > str.length - 1) {
      return str;
    }
    ;
    return str.substring(0, idx) + "0" + str.substring(idx + 1);
  }
  var init_set_0_from_to = __esm({
    "../../../node_modules/double-double/node/str-to-dd/set-0-from-to.js"() {
    }
  });

  // ../../../node_modules/double-double/node/str-to-dd/num-significant-digits.js
  var d;
  var init_num_significant_digits = __esm({
    "../../../node_modules/double-double/node/str-to-dd/num-significant-digits.js"() {
      d = 15;
    }
  });

  // ../../../node_modules/double-double/node/str-to-dd/get-parts.js
  function getParts(str) {
    if (str.startsWith("+")) {
      str = str.slice(1);
    }
    let pointAt = str.indexOf(".");
    if (pointAt === -1) {
      str += ".0";
    }
    pointAt = str.indexOf(".");
    const Z = getNumLeadingZerosAfterPoint(str);
    if (str.length < 3 * d + 1) {
      const zeros = new Array(3 * d + 2 - str.length).join("0");
      str += zeros;
    }
    str = str.slice(0, 3 * d + (pointAt >= 3 * d ? 0 : 1) + Z);
    if (pointAt >= 3 * d) {
      const zeros = new Array(pointAt - 3 * d + 1).join("0");
      str += zeros;
    }
    let seH = set0FromTo(str, d + Z);
    let seL = set0FromTo(str, 0, d + Z);
    seL = set0FromTo(seL, 2 * d + Z);
    let seC = set0FromTo(str, 0, 2 * d + Z);
    return { Z, seH, seL, seC };
  }
  var init_get_parts = __esm({
    "../../../node_modules/double-double/node/str-to-dd/get-parts.js"() {
      init_get_num_leading_zeros_after_point();
      init_set_0_from_to();
      init_num_significant_digits();
    }
  });

  // ../../../node_modules/double-double/node/str-to-dd/add-1-ulp.js
  function add1Ulp(n) {
    return n > 0 ? n + n * ups : n - n * ups;
  }
  var eps3, u3, es, ups;
  var init_add_1_ulp = __esm({
    "../../../node_modules/double-double/node/str-to-dd/add-1-ulp.js"() {
      ({ EPSILON: eps3 } = Number);
      u3 = eps3 / 2;
      es = eps3 ** 2 / 2;
      ups = u3 + es;
    }
  });

  // ../../../node_modules/double-double/node/str-to-dd/get-num-leading-zeros.js
  function getNumLeadingZeros(str) {
    if (Number(str) === 0) {
      return 0;
    }
    if (str.startsWith("0.")) {
      return 0;
    }
    let numLeadingZeros = 0;
    let i = 0;
    for (; i < str.length; i++) {
      if (str[i] === "0") {
        numLeadingZeros++;
      } else {
        break;
      }
    }
    if (str[i] === ".") {
      return 0;
    }
    return numLeadingZeros;
  }
  var init_get_num_leading_zeros = __esm({
    "../../../node_modules/double-double/node/str-to-dd/get-num-leading-zeros.js"() {
    }
  });

  // ../../../node_modules/double-double/node/str-to-dd/get-num-leading-zeros-before-point.js
  function getNumLeadingZerosBeforePoint(str) {
    if (str.startsWith("0.")) {
      return 0;
    }
    if (Number(str) === 0) {
      return 0;
    }
    const idx = str.indexOf(".");
    return idx === -1 ? str.length : idx;
  }
  var init_get_num_leading_zeros_before_point = __esm({
    "../../../node_modules/double-double/node/str-to-dd/get-num-leading-zeros-before-point.js"() {
    }
  });

  // ../../../node_modules/double-double/node/str-to-dd/extract-exp.js
  function extractExp(s) {
    const idx = s.indexOf("e");
    let exp = 0;
    if (idx !== -1) {
      exp = Number(s.slice(idx + 1));
      s = s.slice(0, idx);
    }
    return { s, exp };
  }
  var init_extract_exp = __esm({
    "../../../node_modules/double-double/node/str-to-dd/extract-exp.js"() {
    }
  });

  // ../../../node_modules/double-double/node/str-to-dd/normalize-str.js
  function normalizeStr(s) {
    if (Number(s) === 0) {
      return { str: "0", exp: 0, negative: false };
    }
    const negative = s.startsWith("-");
    if (negative) {
      s = s.slice(1);
    }
    let exp = 0;
    ({ s, exp } = extractExp(s));
    let str;
    const z = getNumLeadingZerosAfterPoint(s);
    if (z > 0) {
      s = s.slice(z + 1);
      str = s[0] + "." + s.slice(1);
      exp = exp - z;
    } else {
      const Z = getNumLeadingZerosBeforePoint(s);
      s = s.split("").filter((s2) => s2 !== ".").join("");
      str = s[0] + "." + s.slice(1);
      exp = exp + Z - 1;
    }
    str = str.slice(0, 3 * d + 1);
    if (str.length < 3 * d + 1) {
      const zeros = new Array(3 * d + 1 - str.length).join("0");
      str += zeros;
    }
    return { str, exp, negative };
  }
  var init_normalize_str = __esm({
    "../../../node_modules/double-double/node/str-to-dd/normalize-str.js"() {
      init_get_num_leading_zeros_after_point();
      init_get_num_leading_zeros_before_point();
      init_num_significant_digits();
      init_extract_exp();
    }
  });

  // ../../../node_modules/double-double/node/str-to-dd/get-power-of-10.js
  function ddMultD(a, b) {
    return ddMultDouble1(b, a);
  }
  function getPowerOf10(exp) {
    if (exp < 23)
      return [0, 10 ** exp];
    const m = exp % 23;
    const cp = exp - m;
    const i = cp / 23 - 1;
    let lo = CACHE[i] || (CACHE[i] = Number(10n ** BigInt(cp) - BigInt(10 ** cp)));
    return ddMultD([lo, 10 ** cp], 10 ** m);
  }
  var CACHE;
  var init_get_power_of_10 = __esm({
    "../../../node_modules/double-double/node/str-to-dd/get-power-of-10.js"() {
      init_dd_mult_double();
      CACHE = new Float64Array(13);
    }
  });

  // ../../../node_modules/double-double/node/str-to-dd/str-to-dd.js
  function strToDd(a_str) {
    a_str = ""+a_str;
    const { str, exp, negative } = normalizeStr(a_str);
    if (negative) {
      a_str = a_str.slice(1);
    }
    let { Z, seH: eH, seL: eL, seC: eC } = getParts(str);
    const H = add1Ulp(Number(eH));
    const _sHC = H.toFixed(3 * d);
    const sHC = set0FromTo(_sHC, 0, d + Z);
    let { Z: Z2, seH: seHCH, seL: seHCL } = getParts(sHC);
    const HCH = add1Ulp(Number(seHCH));
    const sHCH = HCH.toFixed(3 * d);
    const sHCL = set0FromTo(sHCH, Z2, d + Z2 + 1);
    let L = add1Ulp(Number(eL));
    const lZ1 = getNumLeadingZeros(eL);
    let sLC = L.toFixed(3 * d);
    sLC = set0FromTo(sLC, d + Z - lZ1, 2 * d + Z + 1 - lZ1);
    const HCL = Number(sHCL);
    const LC = Number(sLC);
    const C = Number(eC);
    const HCHL = Number(seHCL);
    const rL = ddAddDd(twoSum(HCL, -LC), twoSum(C, -HCHL));
    const rHL = ddAddDouble(twoSum(L, -HCH), H);
    let r = ddAddDd(rHL, rL);
    const exp10 = getPowerOf10(abs(exp));
    r = exp === 0 ? r : exp < 0 ? ddDivDd(r, exp10) : ddMultDd(r, exp10);
    const q = add1Ulp(r[1]) - r[1];
    r[0] = r[0] + q / 2 - q / 2;
    r = negative ? r.map((r2) => -r2) : [r[0], r[1]];
    return r;
  }
  var abs;
  var init_str_to_dd = __esm({
    "../../../node_modules/double-double/node/str-to-dd/str-to-dd.js"() {
      init_two_sum();
      init_dd_add_dd();
      init_dd_mult_dd();
      init_dd_div_dd();
      init_dd_add_double();
      init_get_parts();
      init_set_0_from_to();
      init_num_significant_digits();
      init_add_1_ulp();
      init_get_num_leading_zeros();
      init_normalize_str();
      init_get_power_of_10();
      ({ abs } = Math);
    }
  });

  // ../../../node_modules/double-double/node/constants.js
  var PIDd, eDd, ln2Dd, eulerDd;
  var init_constants = __esm({
    "../../../node_modules/double-double/node/constants.js"() {
      PIDd = [12246467991473535e-32, 3.141592653589793];
      eDd = [14456468917292502e-32, 2.718281828459045];
      ln2Dd = [23190468138463e-30, 0.6931471805599453];
      eulerDd = [-4942915152430649e-33, 0.5772156649015329];
    }
  });

  // ../../../node_modules/double-double/node/double-double/binary/dd-gt.js
  function ddGt(x1, x2) {
    if (x1[1] > x2[1]) {
      return true;
    }
    if (x1[1] < x2[1]) {
      return false;
    }
    if (x1[0] > x2[0]) {
      return true;
    }
    return false;
  }
  var init_dd_gt = __esm({
    "../../../node_modules/double-double/node/double-double/binary/dd-gt.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-double/unary/dd-sin.js
  function ddSin(\u03B8) {
    let negate = \u03B8[1] < 0;
    if (negate) {
      \u03B8 = [-\u03B8[0], -\u03B8[1]];
    }
    if (ddGt(\u03B8, PIDd)) {
      const _c = ddDivDd(\u03B8, PIDd2);
      const c = trunc(_c[1] + _c[0]);
      \u03B8 = ddDiffDd(\u03B8, ddMultDouble1(c, PIDd2));
    }
    if (ddGt(\u03B8, PIDd)) {
      \u03B8 = ddDiffDd(\u03B8, PIDd);
      negate = !negate;
    }
    if (ddGt(\u03B8, PIDd_2)) {
      \u03B8 = ddDiffDd(PIDd, \u03B8);
    }
    const x1 = \u03B8;
    const x2 = ddMultDd(\u03B8, \u03B8);
    const r = ddMultDd(x1, ddAddDd(a0, ddMultDd(x2, ddAddDd(a1, ddMultDd(x2, ddAddDd(a2, ddMultDd(x2, ddAddDd(a3, ddMultDd(x2, ddAddDd(a4, ddMultDd(x2, ddAddDd(a5, ddMultDd(x2, ddAddDd(a6, ddMultDd(x2, ddAddDd(a7, ddMultDd(x2, ddAddDd(a8, ddMultDd(x2, ddAddDd(a9, ddMultDd(x2, ddAddDd(aa, ddMultDd(x2, ddAddDd(ab, ddMultDd(x2, ddAddDd(ac, ddMultDd(x2, ddAddDd(ad, ddMultDd(x2, ddDiffDd(ae, ddMultDd(x2, af)))))))))))))))))))))))))))))));
    return negate ? [-r[0], -r[1]] : r;
  }
  var trunc, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, aa, ab, ac, ad, ae, af, PIDd_2, PIDd2;
  var init_dd_sin = __esm({
    "../../../node_modules/double-double/node/double-double/unary/dd-sin.js"() {
      init_dd_mult_dd();
      init_str_to_dd();
      init_dd_add_dd();
      init_dd_diff_dd();
      init_dd_div_dd();
      init_dd_div_double();
      init_constants();
      init_dd_gt();
      init_dd_mult_double();
      ({ trunc } = Math);
      a0 = [0, 1];
      a1 = strToDd("-0.166666666666666666666666666666666667");
      a2 = strToDd("0.00833333333333333333333333333333333069");
      a3 = strToDd("-0.000198412698412698412698412698412671319");
      a4 = strToDd("2.75573192239858906525573192223995808e-6");
      a5 = strToDd("-2.50521083854417187750521077962123682e-8");
      a6 = strToDd("1.60590438368216145993922289621550506e-10");
      a7 = strToDd("-7.64716373181981647587481187300831335e-13");
      a8 = strToDd("2.81145725434552075980975905006999319e-15");
      a9 = strToDd("-8.22063524662432650297086257962703293e-18");
      aa = strToDd("1.95729410633890026175367390152305383e-20");
      ab = strToDd("-3.86817017051340241224838720319634797e-23");
      ac = strToDd("6.44695023999222092772271073593727141e-26");
      ad = strToDd("-9.1836779606017064087088551595474321e-29");
      ae = strToDd("1.13078207057779775850779192271873238e-31");
      af = strToDd("1.19290046424220296937971101373203567e-34");
      PIDd_2 = ddDivDouble(PIDd, 2);
      PIDd2 = ddMultDouble1(2, PIDd);
    }
  });

  // ../../../node_modules/double-double/node/double-double/unary/dd-cos.js
  function ddCos(\u03B8) {
    const x_ = ddAddDd(\u03B8, PIDd_22);
    return ddSin(x_);
  }
  var PIDd_22;
  var init_dd_cos = __esm({
    "../../../node_modules/double-double/node/double-double/unary/dd-cos.js"() {
      init_dd_add_dd();
      init_dd_div_double();
      init_constants();
      init_dd_sin();
      PIDd_22 = ddDivDouble(PIDd, 2);
    }
  });

  // ../../../node_modules/double-double/node/double-double/binary/dd-eq.js
  function ddEq(x1, x2) {
    return x1[0] === x2[0] && x1[1] === x2[1];
  }
  var init_dd_eq = __esm({
    "../../../node_modules/double-double/node/double-double/binary/dd-eq.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-double/binary/dd-gte.js
  function ddGte(x1, x2) {
    if (x1[1] > x2[1]) {
      return true;
    }
    if (x1[1] < x2[1]) {
      return false;
    }
    if (x1[0] >= x2[0]) {
      return true;
    }
    return false;
  }
  var init_dd_gte = __esm({
    "../../../node_modules/double-double/node/double-double/binary/dd-gte.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-double/binary/dd-lt.js
  function ddLt(x1, x2) {
    if (x1[1] < x2[1]) {
      return true;
    }
    if (x1[1] > x2[1]) {
      return false;
    }
    if (x1[0] < x2[0]) {
      return true;
    }
    return false;
  }
  var init_dd_lt = __esm({
    "../../../node_modules/double-double/node/double-double/binary/dd-lt.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-double/binary/dd-lte.js
  function ddLte(x1, x2) {
    if (x1[1] < x2[1]) {
      return true;
    }
    if (x1[1] > x2[1]) {
      return false;
    }
    if (x1[0] <= x2[0]) {
      return true;
    }
    return false;
  }
  var init_dd_lte = __esm({
    "../../../node_modules/double-double/node/double-double/binary/dd-lte.js"() {
    }
  });

  // ../../../node_modules/double-double/node/double-mixed-double-double/dd-diff-double.js
  function ddDiffDouble(x, y) {
    const xl = x[0];
    const xh = x[1];
    const sh = xh - y;
    const _1 = sh - xh;
    const sl = xh - (sh - _1) + (-y - _1);
    const th = xl;
    const _2 = th - xl;
    const tl = xl - (th - _2) - _2;
    const c = sl + th;
    const vh = sh + c;
    const vl = c - (vh - sh);
    const w = tl + vl;
    const zh = vh + w;
    const zl = w - (zh - vh);
    return [zl, zh];
  }
  var init_dd_diff_double = __esm({
    "../../../node_modules/double-double/node/double-mixed-double-double/dd-diff-double.js"() {
    }
  });

  // ../../../node_modules/double-double/node/index.js
  var node_exports = {};
  __export(node_exports, {
    PIDd: () => PIDd,
    bitLength: () => bitLength,
    ddAbs: () => ddAbs,
    ddAddDd: () => ddAddDd,
    ddAddDouble: () => ddAddDouble,
    ddCompare: () => ddCompare,
    ddCos: () => ddCos,
    ddDiffDd: () => ddDiffDd,
    ddDiffDouble: () => ddDiffDouble,
    ddDivBy2: () => ddDivBy2,
    ddDivDd: () => ddDivDd,
    ddDivDdWithError: () => ddDivDdWithError,
    ddDivDouble: () => ddDivDouble,
    ddEq: () => ddEq,
    ddGt: () => ddGt,
    ddGte: () => ddGte,
    ddLt: () => ddLt,
    ddLte: () => ddLte,
    ddMax: () => ddMax,
    ddMin: () => ddMin,
    ddMultBy2: () => ddMultBy2,
    ddMultBy4: () => ddMultBy4,
    ddMultByNeg2: () => ddMultByNeg2,
    ddMultByNeg4: () => ddMultByNeg4,
    ddMultDd: () => ddMultDd,
    ddMultDouble1: () => ddMultDouble1,
    ddMultDouble2: () => ddMultDouble2,
    ddNegativeOf: () => ddNegativeOf,
    ddProduct: () => ddProduct,
    ddSign: () => ddSign,
    ddSin: () => ddSin,
    ddSqrt: () => ddSqrt,
    ddSum: () => ddSum,
    ddToStr: () => ddToStr,
    divWithErr: () => divWithErr,
    doubleDivDouble: () => doubleDivDouble,
    doubleSqrt: () => doubleSqrt,
    doubleToBinaryString: () => doubleToBinaryString,
    doubleToOctets: () => doubleToOctets,
    eDd: () => eDd,
    eulerDd: () => eulerDd,
    exponent: () => exponent,
    fastTwoDiff: () => fastTwoDiff,
    fastTwoSum: () => fastTwoSum,
    getHighestSetBit: () => getHighestSetBit,
    getLowestSetBit: () => getLowestSetBit,
    isBitAligned: () => isBitAligned,
    ln2Dd: () => ln2Dd,
    lsbExponent: () => lsbExponent,
    msbExponent: () => msbExponent,
    parseDouble: () => parseDouble,
    parseDoubleDetailed: () => parseDoubleDetailed,
    reduceSignificand: () => reduceSignificand,
    significand: () => significand,
    split: () => split,
    sqrtWithErr: () => sqrtWithErr,
    strToDd: () => strToDd,
    twoDiff: () => twoDiff,
    twoProduct: () => twoProduct,
    twoSum: () => twoSum
  });
  var init_node = __esm({
    "../../../node_modules/double-double/node/index.js"() {
      init_dd_min();
      init_dd_max();
      init_dd_sqrt();
      init_double_sqrt();
      init_sqrt_with_err();
      init_dd_abs();
      init_dd_add_double();
      init_dd_add_dd();
      init_dd_product();
      init_dd_sum();
      init_dd_compare();
      init_dd_diff_dd();
      init_dd_mult_double();
      init_dd_mult_by_2();
      init_dd_mult_by_4();
      init_dd_div_by_2();
      init_dd_mult_by_neg_2();
      init_dd_mult_by_neg_4();
      init_dd_mult_dd();
      init_dd_div_double();
      init_dd_div_dd();
      init_dd_negative_of();
      init_dd_sign();
      init_fast_two_diff();
      init_fast_two_sum();
      init_split();
      init_two_diff();
      init_two_product();
      init_double_div_double();
      init_two_sum();
      init_reduce_significand();
      init_parse_double();
      init_is_bit_aligned();
      init_msb_exponent();
      init_lsb_exponent();
      init_bit_length();
      init_exponent();
      init_significand();
      init_double_to_binary_string();
      init_double_to_octets();
      init_get_max_set_bit();
      init_dd_div_dd_with_error();
      init_div_with_err();
      init_dd_to_str();
      init_str_to_dd();
      init_dd_sin();
      init_dd_cos();
      init_dd_eq();
      init_dd_gt();
      init_dd_gte();
      init_dd_lt();
      init_dd_lte();
      init_dd_diff_double();
      init_constants();
    }
  });

  // main.js
  var dd = (init_node(), __toCommonJS(node_exports));
  window.dd = dd;
})();





/* previously used Decimal.js:
https://cdnjs.cloudflare.com/ajax/libs/decimal.js/10.6.0/decimal.min.js
*/

// const dd = doubleDouble;

const nd    = dd.strToDd;
const add   = dd.ddAddDd;
const sub   = dd.ddDiffDd;
const mul   = dd.ddMultDd;
const mulf  = mul;
const div   = dd.ddDivDd;
const eq    = dd.ddEq;
const ln    = (x => Math.log  (x[1]));
const log2  = (x => Math.log2 (x[1]));
const floor = (([x,y]) => [Math.floor(x), Math.floor(y)]);
const abs   = (([x,y]) => [Math.abs  (x), Math.abs  (y)]);
const toStr = dd.ddToStr;

const c = document.querySelector("canvas");
const ctx = c.getContext("2d");
let D, d;

function resize(w, h){
    c.width = w;
    c.height = h;
}
/* not sure if i need these :P */
function update_1(){
    D = ctx.getImageData(0, 0, c.width, c.height);
    d = D.data;
}
function update_2(){
    ctx.putImageData(D, 0, 0);
}

resize(9, 9);

const ZERO = nd(0);
const ONE  = nd(1);
const NEG  = nd(-1);
const INF  = [0, Infinity];
const NINF = [0, -Infinity];

/**
 * Test an operation, under a giver number format.
 * x - the first operand;
 * y - the second operand;
 * decimal - decimal.js version of the operation;
 * converter - function to convert the input to the format we're testing; should be Decimal -> Decimal, and should emulate any precision loss in the format; this defines the format;
*/
function test(x, y, decimal, converter){
    let z = decimal(x, y);
    let nx = converter(x);
    let ny = converter(y);
    let c = converter(decimal(nx, ny));
    if(!eq(z, ZERO) && eq(c, ZERO)) return "underflow";
    if(!isFinite(z[1]) && z[1] === c[1]) return "overflow";
    let d = abs(sub(z, c));
    if(eq(d, ZERO)) return "equal";
    return ln(d);
}

// float converters;
function converter_f16(x){
    // if(x[1] > 1e300 || x[1] < 1e-296) return x;
    const ex = Math.floor(log2(abs(x)));
    x = floor(mulf(x, [0, 2 ** (10 - ex)]));
    return mulf(x, [0, 2 ** (ex - 10)]);
};
function converter_f32(x){
    // if(x[1] > 1e300 || x[1] < 1e-296) return x;
    const ex = Math.floor(log2(abs(x)));
    x = floor(mulf(x, [0, 2 ** (23 - ex)]));
    return mulf(x, [0, 2 ** (ex - 23)]);
};
function converter_f64(x){
    // if(x[1] > 1e300 || x[1] < 1e-296) return x;
    const ex = Math.floor(log2(abs(x)));
    x = floor(mulf(x, [0, 2 ** (52 - ex)]));
    return mulf(x, [0, 2 ** (ex - 52)]);
};

/*
for some posit, z, the real value x is:
x = (-1)^s * (1.m) * useed^k * 2^e;
useed = 2^(2^es);

l 0s and a 1 -> k = -l
l 1s and a 0 -> k = l - 1


== some mulling ==

8-bit, es=2
10 -> 4
110 -> 8
1110 -> 12
1110 11 -> 15
11110 11 -> 18

8-bit, es=1
10 -> 2
110 -> 4
1110 -> 6
11110 -> 8
111110 -> 10
111110 1 -> 11
1111110 -> 12

*/
// posit converters;
function converter_p16(x){
    // if(x[1] > 1e300 || x[1] < 1e-296) return x;
    // es = 2;
    // 2^es = 4;
    const ex = Math.floor(log2(abs(x)));
    /*
    e = ex % 4;
    k = (ex - e) / 4;
    */
    const k = (ex - (ex % 4)) / 4;
    const l = k < 0 ? -k : k + 1;
    // numbers of bits for m;
    // mb = 16 - 1 - es - (l + 1);
    const mb = 12 - l;
    x = floor(mulf(x, [0, 2 ** (mb - ex)]));
    return mulf(x, [0, 2 ** (ex - mb)]);
};
function converter_p32(x){
    // if(x[1] > 1e300 || x[1] < 1e-296) return x;
    // es = 3;
    // 2^es = 8;
    const ex = Math.floor(log2(abs(x)));
    const k = (ex - (ex % 8)) / 8;
    const l = k < 0 ? -k : k + 1;
    // numbers of bits for m;
    // mb = 32 - 1 - es - (l + 1);
    const mb = 27 - l;
    x = floor(mulf(x, [0, 2 ** (mb - ex)]));
    return mulf(x, [0, 2 ** (ex - mb)]);
};
function converter_p64(x){
    // if(x[1] > 1e300 || x[1] < 1e-296) return x;
    // es = 4;
    // 2^es = 16;
    const ex = Math.floor(log2(abs(x)));
    const k = (ex - (ex % 16)) / 16;
    const l = k < 0 ? -k : k + 1;
    // numbers of bits for m;
    // mb = 64 - 1 - es - (l + 1);
    const mb = 58 - l;
    x = floor(mulf(x, [0, 2 ** (mb - ex)]));
    return mulf(x, [0, 2 ** (ex - mb)]);
};


const x = nd("10.3");
const y = nd("1.3");
console.log("====");

/*
console.log(
    toStr(converter_f16(x)),
    toStr(converter_f32(x)),
    toStr(converter_f64(x)),
    toStr(converter_p16(x)),
    toStr(converter_p32(x)),
    toStr(converter_p64(x)),
);
*/

/*
console.log(
    test(x, y, add, converter_f16),
    test(x, y, add, converter_f32),
    test(x, y, add, converter_f64),
    test(x, y, add, converter_p16),
    test(x, y, add, converter_p32),
    test(x, y, add, converter_p64),
);
*/

function wait(t){
    let p_res;
    const p = new Promise(a_res => p_res = a_res);
    setTimeout(p_res, t, new Date);
    return p;
}

let scale = 2n**64n;
let off_x = 0n;
let off_y = 0n;
let bright_base = 20;
let bright_mul = 200;
function move(x, y){
    x = BigInt(x);
    const mx = scale - BigInt(c.width);
    if(x > mx) x = mx;
    off_x = x;
    y = BigInt(y);
    const my = scale - BigInt(c.height);
    if(y > my) x = my;
    off_y = y;
}

let format = [64n, 11n];
function g_man(x){
    return Number(x & ((1n << (format[0] - format[1] - 1n)) - 1n));
}
function g_exp(x){
    return Number((x & (((1n << format[1]) - 1n) << (format[0] - format[1] - 1n))) >> (format[0] - format[1] - 1n));
}
function g_sgn(x){
    return [1,-1][x >> (format[0] - 1n)];
}
function g_flt(x){
    const sgn = g_sgn(x);
    const man = g_man(sgn < 0 ? x : ~x);
    const exp = g_exp(sgn < 0 ? x : ~x);
    return (
        sgn *
        (1 + man / 2**Number(format[0] - format[1] - 1n)) *
        2**(exp - (2**Number(format[1] - 1n) - 1))
    );
}

function color(x){
    if(isNaN(x)) return [222, 0, 200];
    if(x === Infinity || x === "overflow") return [233, 0, 0];
    if(x === "underflow") return [0, 180, 230];
    if(x === -Infinity || x === "equal") return [200, 0, 0];
    return [0, (x + bright_base) * bright_mul, 0];
}

/* bounds is Decimal[4]; */
async function paint(decimal, converter){
    update_1();
    let ii = 0;
    let last = new Date;
    window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 1_000_000;
    for(let iy = 0; iy < c.height; iy++){
        for(let ix = 0; ix < c.width; ix++){
            const curr = new Date;
            if(curr - last > 100){
                last = curr;
                update_2();
                await wait(50);
            }
            
            const x = [0, g_flt(BigInt(ix) + off_x)];
            const y = [0, g_flt(BigInt(iy) + off_y)];
            const t = test(
                x, y, decimal, converter,
            );
            const cd = color(t);
            d[ii * 4 + 0] = cd[0];
            d[ii * 4 + 1] = cd[1];
            d[ii * 4 + 2] = cd[2];
            d[ii * 4 + 3] = 255;
            ii++;
        }
    }
    update_2();
}
paint.busy = false;

const key_fs = {
    ArrowLeft:  (() => move(off_x - 10n, off_y +  0n)),
    ArrowUp:    (() => move(off_x +  0n, off_y - 10n)),
    ArrowRight: (() => move(off_x + 10n, off_y +  0n)),
    ArrowDown:  (() => move(off_x +  0n, off_y + 10n)),
};

addEventListener("keydown", function(e){
    key_fs[e.key]?.();
});

let converter_chosen = converter_f64;

function do_16(){
    scale = 2n**16n;
    format = [16n, 5n];
    move(scale / 2n, scale / 2n);
    bright_base = 20000;
    bright_mul = 400000;
}
function do_32(){
    scale = 2n**32n;
    format = [32n, 8n];
    move(scale / 2n, scale / 2n);
    bright_base = 20;
    bright_mul = 400;
}
function do_64(){
    scale = 2n**64n;
    format = [64n, 11n];
    move(scale / 2n, scale / 2n);
    bright_base = 20;
    bright_mul = 400;
}
function do_f16(){
    do_16();
    converter_chosen = converter_f16;
}
function do_f32(){
    do_32();
    converter_chosen = converter_f32;
}
function do_f64(){
    do_64();
    converter_chosen = converter_f64;
}
function do_p16(){
    do_16();
    converter_chosen = converter_p16;
}
function do_p32(){
    do_32();
    converter_chosen = converter_p32;
}
function do_p64(){
    do_64();
    converter_chosen = converter_p64;
}

do_p16();

paint.id = -1;
paint.start = function(){
    if(paint.id > -1) return;
    paint.id = setInterval(function(){
        if(paint.busy) return;
        paint.busy = true;
        paint(
            add, converter_chosen,
        ).finally(() => paint.busy = false);
    }, 100);
}
paint.stop = function(){
    if(paint.id === -1) return;
    clearInterval(paint.id);
    paint.id = -1;
}

key_fs.s = (()=>(
    paint.id === -1 ?
    paint.start() : paint.stop()
));


