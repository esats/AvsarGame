﻿! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Uppy = e()
    }
}(function() {
    var define, module, exports, createModuleFactory = function(e) {
            var t;
            return function(r) {
                return t || e(t = {
                    exports: {},
                    parent: r
                }, t.exports), t.exports
            }
        },
        _$lib_58 = createModuleFactory(function(e, t) {
            var r = _$browser_64("socket.io-client");
            e.exports = t = o;
            var n = t.managers = {};

            function o(e, t) {
                "object" == typeof e && (t = e, e = void 0), t = t || {};
                var o, i = _$url_62(e),
                    s = i.source,
                    a = i.id,
                    l = i.path,
                    u = n[a] && l in n[a].nsps;
                return t.forceNew || t["force new connection"] || !1 === t.multiplex || u ? (r("ignoring socket cache for %s", s), o = _$manager_59(s, t)) : (n[a] || (r("new io instance for %s", s), n[a] = _$manager_59(s, t)), o = n[a]), i.query && !t.query && (t.query = i.query), o.socket(i.path, t)
            }
            t.protocol = _$socketIoParser_68.protocol, t.connect = o, t.Manager = _$manager_59, t.Socket = _$socket_61
        }),
        _$empty_7 = createModuleFactory(function(e, t) {}),
        _$buffer_8 = createModuleFactory(function(e, t) {
            (function(e) {
                "use strict";
                t.Buffer = e, t.INSPECT_MAX_BYTES = 50;
                var r = 2147483647;

                function n(t) {
                    if (t > r) throw new RangeError('The value "' + t + '" is invalid for option "size"');
                    var n = new Uint8Array(t);
                    return n.__proto__ = e.prototype, n
                }

                function e(e, t, r) {
                    if ("number" == typeof e) {
                        if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                        return s(e)
                    }
                    return o(e, t, r)
                }

                function o(t, r, o) {
                    if ("string" == typeof t) return function(t, r) {
                        if ("string" == typeof r && "" !== r || (r = "utf8"), !e.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
                        var o = 0 | u(t, r),
                            i = n(o),
                            s = i.write(t, r);
                        return s !== o && (i = i.slice(0, s)), i
                    }(t, r);
                    if (ArrayBuffer.isView(t)) return a(t);
                    if (null == t) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
                    if (U(t, ArrayBuffer) || t && U(t.buffer, ArrayBuffer)) return function(t, r, n) {
                        if (r < 0 || t.byteLength < r) throw new RangeError('"offset" is outside of buffer bounds');
                        if (t.byteLength < r + (n || 0)) throw new RangeError('"length" is outside of buffer bounds');
                        var o;
                        return (o = void 0 === r && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, r) : new Uint8Array(t, r, n)).__proto__ = e.prototype, o
                    }(t, r, o);
                    if ("number" == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
                    var i = t.valueOf && t.valueOf();
                    if (null != i && i !== t) return e.from(i, r, o);
                    var s = function(t) {
                        if (e.isBuffer(t)) {
                            var r = 0 | l(t.length),
                                o = n(r);
                            return 0 === o.length ? o : (t.copy(o, 0, 0, r), o)
                        }
                        return void 0 !== t.length ? "number" != typeof t.length || D(t.length) ? n(0) : a(t) : "Buffer" === t.type && Array.isArray(t.data) ? a(t.data) : void 0
                    }(t);
                    if (s) return s;
                    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return e.from(t[Symbol.toPrimitive]("string"), r, o);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
                }

                function i(e) {
                    if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
                    if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
                }

                function s(e) {
                    return i(e), n(e < 0 ? 0 : 0 | l(e))
                }

                function a(e) {
                    for (var t = e.length < 0 ? 0 : 0 | l(e.length), r = n(t), o = 0; o < t; o += 1) r[o] = 255 & e[o];
                    return r
                }

                function l(e) {
                    if (e >= r) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + r.toString(16) + " bytes");
                    return 0 | e
                }

                function u(t, r) {
                    if (e.isBuffer(t)) return t.length;
                    if (ArrayBuffer.isView(t) || U(t, ArrayBuffer)) return t.byteLength;
                    if ("string" != typeof t) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
                    var n = t.length,
                        o = arguments.length > 2 && !0 === arguments[2];
                    if (!o && 0 === n) return 0;
                    for (var i = !1;;) switch (r) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return n;
                        case "utf8":
                        case "utf-8":
                            return O(t).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * n;
                        case "hex":
                            return n >>> 1;
                        case "base64":
                            return R(t).length;
                        default:
                            if (i) return o ? -1 : O(t).length;
                            r = ("" + r).toLowerCase(), i = !0
                    }
                }

                function c(e, t, r) {
                    var n = e[t];
                    e[t] = e[r], e[r] = n
                }

                function p(t, r, n, o, i) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof n ? (o = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), D(n = +n) && (n = i ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                        if (i) return -1;
                        n = t.length - 1
                    } else if (n < 0) {
                        if (!i) return -1;
                        n = 0
                    }
                    if ("string" == typeof r && (r = e.from(r, o)), e.isBuffer(r)) return 0 === r.length ? -1 : d(t, r, n, o, i);
                    if ("number" == typeof r) return r &= 255, "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, r, n) : Uint8Array.prototype.lastIndexOf.call(t, r, n) : d(t, [r], n, o, i);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function d(e, t, r, n, o) {
                    var i, s = 1,
                        a = e.length,
                        l = t.length;
                    if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                        if (e.length < 2 || t.length < 2) return -1;
                        s = 2, a /= 2, l /= 2, r /= 2
                    }

                    function u(e, t) {
                        return 1 === s ? e[t] : e.readUInt16BE(t * s)
                    }
                    if (o) {
                        var c = -1;
                        for (i = r; i < a; i++)
                            if (u(e, i) === u(t, -1 === c ? 0 : i - c)) {
                                if (-1 === c && (c = i), i - c + 1 === l) return c * s
                            } else -1 !== c && (i -= i - c), c = -1
                    } else
                        for (r + l > a && (r = a - l), i = r; i >= 0; i--) {
                            for (var p = !0, d = 0; d < l; d++)
                                if (u(e, i + d) !== u(t, d)) {
                                    p = !1;
                                    break
                                } if (p) return i
                        }
                    return -1
                }

                function _(e, t, r, n) {
                    r = Number(r) || 0;
                    var o = e.length - r;
                    n ? (n = Number(n)) > o && (n = o) : n = o;
                    var i = t.length;
                    n > i / 2 && (n = i / 2);
                    for (var s = 0; s < n; ++s) {
                        var a = parseInt(t.substr(2 * s, 2), 16);
                        if (D(a)) return s;
                        e[r + s] = a
                    }
                    return s
                }

                function h(e, t, r, n) {
                    return I(O(t, e.length - r), e, r, n)
                }

                function f(e, t, r, n) {
                    return I(function(e) {
                        for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                        return t
                    }(t), e, r, n)
                }

                function g(e, t, r, n) {
                    return f(e, t, r, n)
                }

                function m(e, t, r, n) {
                    return I(R(t), e, r, n)
                }

                function y(e, t, r, n) {
                    return I(function(e, t) {
                        for (var r, n, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) n = (r = e.charCodeAt(s)) >> 8, o = r % 256, i.push(o), i.push(n);
                        return i
                    }(t, e.length - r), e, r, n)
                }

                function v(e, t, r) {
                    return 0 === t && r === e.length ? _$base64Js_5.fromByteArray(e) : _$base64Js_5.fromByteArray(e.slice(t, r))
                }

                function b(e, t, r) {
                    r = Math.min(e.length, r);
                    for (var n = [], o = t; o < r;) {
                        var i, s, a, l, u = e[o],
                            c = null,
                            p = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                        if (o + p <= r) switch (p) {
                            case 1:
                                u < 128 && (c = u);
                                break;
                            case 2:
                                128 == (192 & (i = e[o + 1])) && (l = (31 & u) << 6 | 63 & i) > 127 && (c = l);
                                break;
                            case 3:
                                i = e[o + 1], s = e[o + 2], 128 == (192 & i) && 128 == (192 & s) && (l = (15 & u) << 12 | (63 & i) << 6 | 63 & s) > 2047 && (l < 55296 || l > 57343) && (c = l);
                                break;
                            case 4:
                                i = e[o + 1], s = e[o + 2], a = e[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & a) && (l = (15 & u) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & a) > 65535 && l < 1114112 && (c = l)
                        }
                        null === c ? (c = 65533, p = 1) : c > 65535 && (c -= 65536, n.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), n.push(c), o += p
                    }
                    return function(e) {
                        var t = e.length;
                        if (t <= w) return String.fromCharCode.apply(String, e);
                        for (var r = "", n = 0; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += w));
                        return r
                    }(n)
                }
                e.TYPED_ARRAY_SUPPORT = function() {
                    try {
                        var e = new Uint8Array(1);
                        return e.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function() {
                                return 42
                            }
                        }, 42 === e.foo()
                    } catch (t) {
                        return !1
                    }
                }(), e.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(e.prototype, "parent", {
                    enumerable: !0,
                    get: function() {
                        if (e.isBuffer(this)) return this.buffer
                    }
                }), Object.defineProperty(e.prototype, "offset", {
                    enumerable: !0,
                    get: function() {
                        if (e.isBuffer(this)) return this.byteOffset
                    }
                }), "undefined" != typeof Symbol && null != Symbol.species && e[Symbol.species] === e && Object.defineProperty(e, Symbol.species, {
                    value: null,
                    configurable: !0,
                    enumerable: !1,
                    writable: !1
                }), e.poolSize = 8192, e.from = function(e, t, r) {
                    return o(e, t, r)
                }, e.prototype.__proto__ = Uint8Array.prototype, e.__proto__ = Uint8Array, e.alloc = function(e, t, r) {
                    return function(e, t, r) {
                        return i(e), e <= 0 ? n(e) : void 0 !== t ? "string" == typeof r ? n(e).fill(t, r) : n(e).fill(t) : n(e)
                    }(e, t, r)
                }, e.allocUnsafe = function(e) {
                    return s(e)
                }, e.allocUnsafeSlow = function(e) {
                    return s(e)
                }, e.isBuffer = function(t) {
                    return null != t && !0 === t._isBuffer && t !== e.prototype
                }, e.compare = function(t, r) {
                    if (U(t, Uint8Array) && (t = e.from(t, t.offset, t.byteLength)), U(r, Uint8Array) && (r = e.from(r, r.offset, r.byteLength)), !e.isBuffer(t) || !e.isBuffer(r)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (t === r) return 0;
                    for (var n = t.length, o = r.length, i = 0, s = Math.min(n, o); i < s; ++i)
                        if (t[i] !== r[i]) {
                            n = t[i], o = r[i];
                            break
                        } return n < o ? -1 : o < n ? 1 : 0
                }, e.isEncoding = function(e) {
                    switch (String(e).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, e.concat = function(t, r) {
                    if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return e.alloc(0);
                    var n;
                    if (void 0 === r)
                        for (r = 0, n = 0; n < t.length; ++n) r += t[n].length;
                    var o = e.allocUnsafe(r),
                        i = 0;
                    for (n = 0; n < t.length; ++n) {
                        var s = t[n];
                        if (U(s, Uint8Array) && (s = e.from(s)), !e.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                        s.copy(o, i), i += s.length
                    }
                    return o
                }, e.byteLength = u, e.prototype._isBuffer = !0, e.prototype.swap16 = function() {
                    var e = this.length;
                    if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var t = 0; t < e; t += 2) c(this, t, t + 1);
                    return this
                }, e.prototype.swap32 = function() {
                    var e = this.length;
                    if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var t = 0; t < e; t += 4) c(this, t, t + 3), c(this, t + 1, t + 2);
                    return this
                }, e.prototype.swap64 = function() {
                    var e = this.length;
                    if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var t = 0; t < e; t += 8) c(this, t, t + 7), c(this, t + 1, t + 6), c(this, t + 2, t + 5), c(this, t + 3, t + 4);
                    return this
                }, e.prototype.toString = function() {
                    var e = this.length;
                    return 0 === e ? "" : 0 === arguments.length ? b(this, 0, e) : function(e, t, r) {
                        var n = !1;
                        if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                        if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                        if ((r >>>= 0) <= (t >>>= 0)) return "";
                        for (e || (e = "utf8");;) switch (e) {
                            case "hex":
                                return E(this, t, r);
                            case "utf8":
                            case "utf-8":
                                return b(this, t, r);
                            case "ascii":
                                return S(this, t, r);
                            case "latin1":
                            case "binary":
                                return P(this, t, r);
                            case "base64":
                                return v(this, t, r);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return C(this, t, r);
                            default:
                                if (n) throw new TypeError("Unknown encoding: " + e);
                                e = (e + "").toLowerCase(), n = !0
                        }
                    }.apply(this, arguments)
                }, e.prototype.toLocaleString = e.prototype.toString, e.prototype.equals = function(t) {
                    if (!e.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === e.compare(this, t)
                }, e.prototype.inspect = function() {
                    var e = "",
                        r = t.INSPECT_MAX_BYTES;
                    return e = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (e += " ... "), "<Buffer " + e + ">"
                }, e.prototype.compare = function(t, r, n, o, i) {
                    if (U(t, Uint8Array) && (t = e.from(t, t.offset, t.byteLength)), !e.isBuffer(t)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
                    if (void 0 === r && (r = 0), void 0 === n && (n = t ? t.length : 0), void 0 === o && (o = 0), void 0 === i && (i = this.length), r < 0 || n > t.length || o < 0 || i > this.length) throw new RangeError("out of range index");
                    if (o >= i && r >= n) return 0;
                    if (o >= i) return -1;
                    if (r >= n) return 1;
                    if (this === t) return 0;
                    for (var s = (i >>>= 0) - (o >>>= 0), a = (n >>>= 0) - (r >>>= 0), l = Math.min(s, a), u = this.slice(o, i), c = t.slice(r, n), p = 0; p < l; ++p)
                        if (u[p] !== c[p]) {
                            s = u[p], a = c[p];
                            break
                        } return s < a ? -1 : a < s ? 1 : 0
                }, e.prototype.includes = function(e, t, r) {
                    return -1 !== this.indexOf(e, t, r)
                }, e.prototype.indexOf = function(e, t, r) {
                    return p(this, e, t, r, !0)
                }, e.prototype.lastIndexOf = function(e, t, r) {
                    return p(this, e, t, r, !1)
                }, e.prototype.write = function(e, t, r, n) {
                    if (void 0 === t) n = "utf8", r = this.length, t = 0;
                    else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;
                    else {
                        if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        t >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                    }
                    var o = this.length - t;
                    if ((void 0 === r || r > o) && (r = o), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    n || (n = "utf8");
                    for (var i = !1;;) switch (n) {
                        case "hex":
                            return _(this, e, t, r);
                        case "utf8":
                        case "utf-8":
                            return h(this, e, t, r);
                        case "ascii":
                            return f(this, e, t, r);
                        case "latin1":
                        case "binary":
                            return g(this, e, t, r);
                        case "base64":
                            return m(this, e, t, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return y(this, e, t, r);
                        default:
                            if (i) throw new TypeError("Unknown encoding: " + n);
                            n = ("" + n).toLowerCase(), i = !0
                    }
                }, e.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                var w = 4096;

                function S(e, t, r) {
                    var n = "";
                    r = Math.min(e.length, r);
                    for (var o = t; o < r; ++o) n += String.fromCharCode(127 & e[o]);
                    return n
                }

                function P(e, t, r) {
                    var n = "";
                    r = Math.min(e.length, r);
                    for (var o = t; o < r; ++o) n += String.fromCharCode(e[o]);
                    return n
                }

                function E(e, t, r) {
                    var n, o = e.length;
                    (!t || t < 0) && (t = 0), (!r || r < 0 || r > o) && (r = o);
                    for (var i = "", s = t; s < r; ++s) i += (n = e[s]) < 16 ? "0" + n.toString(16) : n.toString(16);
                    return i
                }

                function C(e, t, r) {
                    for (var n = e.slice(t, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
                    return o
                }

                function T(e, t, r) {
                    if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                    if (e + t > r) throw new RangeError("Trying to access beyond buffer length")
                }

                function $(t, r, n, o, i, s) {
                    if (!e.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (r > i || r < s) throw new RangeError('"value" argument is out of bounds');
                    if (n + o > t.length) throw new RangeError("Index out of range")
                }

                function k(e, t, r, n, o, i) {
                    if (r + n > e.length) throw new RangeError("Index out of range");
                    if (r < 0) throw new RangeError("Index out of range")
                }

                function F(e, t, r, n, o) {
                    return t = +t, r >>>= 0, o || k(e, 0, r, 4), _$ieee754_41.write(e, t, r, n, 23, 4), r + 4
                }

                function A(e, t, r, n, o) {
                    return t = +t, r >>>= 0, o || k(e, 0, r, 8), _$ieee754_41.write(e, t, r, n, 52, 8), r + 8
                }
                e.prototype.slice = function(t, r) {
                    var n = this.length;
                    (t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (r = void 0 === r ? n : ~~r) < 0 ? (r += n) < 0 && (r = 0) : r > n && (r = n), r < t && (r = t);
                    var o = this.subarray(t, r);
                    return o.__proto__ = e.prototype, o
                }, e.prototype.readUIntLE = function(e, t, r) {
                    e >>>= 0, t >>>= 0, r || T(e, t, this.length);
                    for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
                    return n
                }, e.prototype.readUIntBE = function(e, t, r) {
                    e >>>= 0, t >>>= 0, r || T(e, t, this.length);
                    for (var n = this[e + --t], o = 1; t > 0 && (o *= 256);) n += this[e + --t] * o;
                    return n
                }, e.prototype.readUInt8 = function(e, t) {
                    return e >>>= 0, t || T(e, 1, this.length), this[e]
                }, e.prototype.readUInt16LE = function(e, t) {
                    return e >>>= 0, t || T(e, 2, this.length), this[e] | this[e + 1] << 8
                }, e.prototype.readUInt16BE = function(e, t) {
                    return e >>>= 0, t || T(e, 2, this.length), this[e] << 8 | this[e + 1]
                }, e.prototype.readUInt32LE = function(e, t) {
                    return e >>>= 0, t || T(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
                }, e.prototype.readUInt32BE = function(e, t) {
                    return e >>>= 0, t || T(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
                }, e.prototype.readIntLE = function(e, t, r) {
                    e >>>= 0, t >>>= 0, r || T(e, t, this.length);
                    for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256);) n += this[e + i] * o;
                    return n >= (o *= 128) && (n -= Math.pow(2, 8 * t)), n
                }, e.prototype.readIntBE = function(e, t, r) {
                    e >>>= 0, t >>>= 0, r || T(e, t, this.length);
                    for (var n = t, o = 1, i = this[e + --n]; n > 0 && (o *= 256);) i += this[e + --n] * o;
                    return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i
                }, e.prototype.readInt8 = function(e, t) {
                    return e >>>= 0, t || T(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                }, e.prototype.readInt16LE = function(e, t) {
                    e >>>= 0, t || T(e, 2, this.length);
                    var r = this[e] | this[e + 1] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, e.prototype.readInt16BE = function(e, t) {
                    e >>>= 0, t || T(e, 2, this.length);
                    var r = this[e + 1] | this[e] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }, e.prototype.readInt32LE = function(e, t) {
                    return e >>>= 0, t || T(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
                }, e.prototype.readInt32BE = function(e, t) {
                    return e >>>= 0, t || T(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
                }, e.prototype.readFloatLE = function(e, t) {
                    return e >>>= 0, t || T(e, 4, this.length), _$ieee754_41.read(this, e, !0, 23, 4)
                }, e.prototype.readFloatBE = function(e, t) {
                    return e >>>= 0, t || T(e, 4, this.length), _$ieee754_41.read(this, e, !1, 23, 4)
                }, e.prototype.readDoubleLE = function(e, t) {
                    return e >>>= 0, t || T(e, 8, this.length), _$ieee754_41.read(this, e, !0, 52, 8)
                }, e.prototype.readDoubleBE = function(e, t) {
                    return e >>>= 0, t || T(e, 8, this.length), _$ieee754_41.read(this, e, !1, 52, 8)
                }, e.prototype.writeUIntLE = function(e, t, r, n) {
                    e = +e, t >>>= 0, r >>>= 0, n || $(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                    var o = 1,
                        i = 0;
                    for (this[t] = 255 & e; ++i < r && (o *= 256);) this[t + i] = e / o & 255;
                    return t + r
                }, e.prototype.writeUIntBE = function(e, t, r, n) {
                    e = +e, t >>>= 0, r >>>= 0, n || $(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                    var o = r - 1,
                        i = 1;
                    for (this[t + o] = 255 & e; --o >= 0 && (i *= 256);) this[t + o] = e / i & 255;
                    return t + r
                }, e.prototype.writeUInt8 = function(e, t, r) {
                    return e = +e, t >>>= 0, r || $(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
                }, e.prototype.writeUInt16LE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || $(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                }, e.prototype.writeUInt16BE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || $(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                }, e.prototype.writeUInt32LE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || $(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
                }, e.prototype.writeUInt32BE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || $(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                }, e.prototype.writeIntLE = function(e, t, r, n) {
                    if (e = +e, t >>>= 0, !n) {
                        var o = Math.pow(2, 8 * r - 1);
                        $(this, e, t, r, o - 1, -o)
                    }
                    var i = 0,
                        s = 1,
                        a = 0;
                    for (this[t] = 255 & e; ++i < r && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1), this[t + i] = (e / s >> 0) - a & 255;
                    return t + r
                }, e.prototype.writeIntBE = function(e, t, r, n) {
                    if (e = +e, t >>>= 0, !n) {
                        var o = Math.pow(2, 8 * r - 1);
                        $(this, e, t, r, o - 1, -o)
                    }
                    var i = r - 1,
                        s = 1,
                        a = 0;
                    for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1), this[t + i] = (e / s >> 0) - a & 255;
                    return t + r
                }, e.prototype.writeInt8 = function(e, t, r) {
                    return e = +e, t >>>= 0, r || $(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
                }, e.prototype.writeInt16LE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || $(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                }, e.prototype.writeInt16BE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || $(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                }, e.prototype.writeInt32LE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || $(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
                }, e.prototype.writeInt32BE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || $(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                }, e.prototype.writeFloatLE = function(e, t, r) {
                    return F(this, e, t, !0, r)
                }, e.prototype.writeFloatBE = function(e, t, r) {
                    return F(this, e, t, !1, r)
                }, e.prototype.writeDoubleLE = function(e, t, r) {
                    return A(this, e, t, !0, r)
                }, e.prototype.writeDoubleBE = function(e, t, r) {
                    return A(this, e, t, !1, r)
                }, e.prototype.copy = function(t, r, n, o) {
                    if (!e.isBuffer(t)) throw new TypeError("argument should be a Buffer");
                    if (n || (n = 0), o || 0 === o || (o = this.length), r >= t.length && (r = t.length), r || (r = 0), o > 0 && o < n && (o = n), o === n) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (r < 0) throw new RangeError("targetStart out of bounds");
                    if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
                    if (o < 0) throw new RangeError("sourceEnd out of bounds");
                    o > this.length && (o = this.length), t.length - r < o - n && (o = t.length - r + n);
                    var i = o - n;
                    if (this === t && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(r, n, o);
                    else if (this === t && n < r && r < o)
                        for (var s = i - 1; s >= 0; --s) t[s + r] = this[s + n];
                    else Uint8Array.prototype.set.call(t, this.subarray(n, o), r);
                    return i
                }, e.prototype.fill = function(t, r, n, o) {
                    if ("string" == typeof t) {
                        if ("string" == typeof r ? (o = r, r = 0, n = this.length) : "string" == typeof n && (o = n, n = this.length), void 0 !== o && "string" != typeof o) throw new TypeError("encoding must be a string");
                        if ("string" == typeof o && !e.isEncoding(o)) throw new TypeError("Unknown encoding: " + o);
                        if (1 === t.length) {
                            var i = t.charCodeAt(0);
                            ("utf8" === o && i < 128 || "latin1" === o) && (t = i)
                        }
                    } else "number" == typeof t && (t &= 255);
                    if (r < 0 || this.length < r || this.length < n) throw new RangeError("Out of range index");
                    if (n <= r) return this;
                    var s;
                    if (r >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t)
                        for (s = r; s < n; ++s) this[s] = t;
                    else {
                        var a = e.isBuffer(t) ? t : e.from(t, o),
                            l = a.length;
                        if (0 === l) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                        for (s = 0; s < n - r; ++s) this[s + r] = a[s % l]
                    }
                    return this
                };
                var x = /[^+\/0-9A-Za-z-_]/g;

                function O(e, t) {
                    var r;
                    t = t || 1 / 0;
                    for (var n = e.length, o = null, i = [], s = 0; s < n; ++s) {
                        if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
                            if (!o) {
                                if (r > 56319) {
                                    (t -= 3) > -1 && i.push(239, 191, 189);
                                    continue
                                }
                                if (s + 1 === n) {
                                    (t -= 3) > -1 && i.push(239, 191, 189);
                                    continue
                                }
                                o = r;
                                continue
                            }
                            if (r < 56320) {
                                (t -= 3) > -1 && i.push(239, 191, 189), o = r;
                                continue
                            }
                            r = 65536 + (o - 55296 << 10 | r - 56320)
                        } else o && (t -= 3) > -1 && i.push(239, 191, 189);
                        if (o = null, r < 128) {
                            if ((t -= 1) < 0) break;
                            i.push(r)
                        } else if (r < 2048) {
                            if ((t -= 2) < 0) break;
                            i.push(r >> 6 | 192, 63 & r | 128)
                        } else if (r < 65536) {
                            if ((t -= 3) < 0) break;
                            i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                        } else {
                            if (!(r < 1114112)) throw new Error("Invalid code point");
                            if ((t -= 4) < 0) break;
                            i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                        }
                    }
                    return i
                }

                function R(e) {
                    return _$base64Js_5.toByteArray(function(e) {
                        if ((e = (e = e.split("=")[0]).trim().replace(x, "")).length < 2) return "";
                        for (; e.length % 4 != 0;) e += "=";
                        return e
                    }(e))
                }

                function I(e, t, r, n) {
                    for (var o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o) t[o + r] = e[o];
                    return o
                }

                function U(e, t) {
                    return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
                }

                function D(e) {
                    return e != e
                }
            }).call(this, _$buffer_8({}).Buffer)
        }),
        _$browser_54 = {},
        cachedSetTimeout, cachedClearTimeout, process = _$browser_54 = {};

    function defaultSetTimout() {
        throw new Error("setTimeout has not been defined")
    }

    function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined")
    }

    function runTimeout(e) {
        if (cachedSetTimeout === setTimeout) return setTimeout(e, 0);
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, setTimeout(e, 0);
        try {
            return cachedSetTimeout(e, 0)
        } catch (t) {
            try {
                return cachedSetTimeout.call(null, e, 0)
            } catch (t) {
                return cachedSetTimeout.call(this, e, 0)
            }
        }
    }! function() {
        try {
            cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout
        } catch (e) {
            cachedSetTimeout = defaultSetTimout
        }
        try {
            cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout
        }
    }();
    var currentQueue, queue = [],
        draining = !1,
        queueIndex = -1;

    function cleanUpNextTick() {
        draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue())
    }

    function drainQueue() {
        if (!draining) {
            var e = runTimeout(cleanUpNextTick);
            draining = !0;
            for (var t = queue.length; t;) {
                for (currentQueue = queue, queue = []; ++queueIndex < t;) currentQueue && currentQueue[queueIndex].run();
                queueIndex = -1, t = queue.length
            }
            currentQueue = null, draining = !1,
                function(e) {
                    if (cachedClearTimeout === clearTimeout) return clearTimeout(e);
                    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, clearTimeout(e);
                    try {
                        cachedClearTimeout(e)
                    } catch (t) {
                        try {
                            return cachedClearTimeout.call(null, e)
                        } catch (t) {
                            return cachedClearTimeout.call(this, e)
                        }
                    }
                }(e)
        }
    }

    function Item(e, t) {
        this.fun = e, this.array = t
    }

    function noop() {}
    process.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        queue.push(new Item(e, t)), 1 !== queue.length || draining || runTimeout(drainQueue)
    }, Item.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, process.emit = noop, process.prependListener = noop, process.prependOnceListener = noop, process.listeners = function(e) {
        return []
    }, process.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, process.cwd = function() {
        return "/"
    }, process.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, process.umask = function() {
        return 0
    };
    var _$es6Promise_34 = {
        exports: {}
    };
    (function(e, t) {
        ! function(e, t) {
            "object" == typeof _$es6Promise_34.exports ? _$es6Promise_34.exports = t() : "function" == typeof define && define.amd ? define(t) : e.ES6Promise = t()
        }(this, function() {
            "use strict";

            function r(e) {
                return "function" == typeof e
            }
            var n = Array.isArray ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                o = 0,
                i = void 0,
                s = void 0,
                a = function(e, t) {
                    h[o] = e, h[o + 1] = t, 2 === (o += 2) && (s ? s(f) : b())
                },
                l = "undefined" != typeof window ? window : void 0,
                u = l || {},
                c = u.MutationObserver || u.WebKitMutationObserver,
                p = "undefined" == typeof self && void 0 !== e && "[object process]" === {}.toString.call(e),
                d = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

            function _() {
                var e = setTimeout;
                return function() {
                    return e(f, 1)
                }
            }
            var h = new Array(1e3);

            function f() {
                for (var e = 0; e < o; e += 2)(0, h[e])(h[e + 1]), h[e] = void 0, h[e + 1] = void 0;
                o = 0
            }
            var g, m, y, v, b = void 0;

            function w(e, t) {
                var r = this,
                    n = new this.constructor(E);
                void 0 === n[P] && M(n);
                var o = r._state;
                if (o) {
                    var i = arguments[o - 1];
                    a(function() {
                        return B(o, n, i, r._result)
                    })
                } else U(r, n, e, t);
                return n
            }

            function S(e) {
                if (e && "object" == typeof e && e.constructor === this) return e;
                var t = new this(E);
                return x(t, e), t
            }
            p ? b = function() {
                return e.nextTick(f)
            } : c ? (m = 0, y = new c(f), v = document.createTextNode(""), y.observe(v, {
                characterData: !0
            }), b = function() {
                v.data = m = ++m % 2
            }) : d ? ((g = new MessageChannel).port1.onmessage = f, b = function() {
                return g.port2.postMessage(0)
            }) : b = void 0 === l ? function() {
                try {
                    var e = Function("return this")().require("vertx");
                    return void 0 !== (i = e.runOnLoop || e.runOnContext) ? function() {
                        i(f)
                    } : _()
                } catch (t) {
                    return _()
                }
            }() : _();
            var P = Math.random().toString(36).substring(2);

            function E() {}
            var C = void 0,
                T = 1,
                $ = 2,
                k = {
                    error: null
                };

            function F(e) {
                try {
                    return e.then
                } catch (error) {
                    return k.error = error, k
                }
            }

            function A(e, t, n) {
                t.constructor === e.constructor && n === w && t.constructor.resolve === S ? function(e, t) {
                    t._state === T ? R(e, t._result) : t._state === $ ? I(e, t._result) : U(t, void 0, function(t) {
                        return x(e, t)
                    }, function(t) {
                        return I(e, t)
                    })
                }(e, t) : n === k ? (I(e, k.error), k.error = null) : void 0 === n ? R(e, t) : r(n) ? function(e, t, r) {
                    a(function(e) {
                        var n = !1,
                            o = function(r, o, i, s) {
                                try {
                                    r.call(o, function(r) {
                                        n || (n = !0, t !== r ? x(e, r) : R(e, r))
                                    }, function(t) {
                                        n || (n = !0, I(e, t))
                                    })
                                } catch (a) {
                                    return a
                                }
                            }(r, t, 0, 0, e._label);
                        !n && o && (n = !0, I(e, o))
                    }, e)
                }(e, t, n) : R(e, t)
            }

            function x(e, t) {
                var r, n;
                e === t ? I(e, new TypeError("You cannot resolve a promise with itself")) : (n = typeof(r = t), null === r || "object" !== n && "function" !== n ? R(e, t) : A(e, t, F(t)))
            }

            function O(e) {
                e._onerror && e._onerror(e._result), D(e)
            }

            function R(e, t) {
                e._state === C && (e._result = t, e._state = T, 0 !== e._subscribers.length && a(D, e))
            }

            function I(e, t) {
                e._state === C && (e._state = $, e._result = t, a(O, e))
            }

            function U(e, t, r, n) {
                var o = e._subscribers,
                    i = o.length;
                e._onerror = null, o[i] = t, o[i + T] = r, o[i + $] = n, 0 === i && e._state && a(D, e)
            }

            function D(e) {
                var t = e._subscribers,
                    r = e._state;
                if (0 !== t.length) {
                    for (var n = void 0, o = void 0, i = e._result, s = 0; s < t.length; s += 3) n = t[s], o = t[s + r], n ? B(r, n, o, i) : o(i);
                    e._subscribers.length = 0
                }
            }

            function B(e, t, n, o) {
                var i = r(n),
                    s = void 0,
                    a = void 0,
                    l = void 0,
                    u = void 0;
                if (i) {
                    if ((s = function(e, t) {
                            try {
                                return e(t)
                            } catch (r) {
                                return k.error = r, k
                            }
                        }(n, o)) === k ? (u = !0, a = s.error, s.error = null) : l = !0, t === s) return void I(t, new TypeError("A promises callback cannot return that same promise."))
                } else s = o, l = !0;
                t._state !== C || (i && l ? x(t, s) : u ? I(t, a) : e === T ? R(t, s) : e === $ && I(t, s))
            }
            var L = 0;

            function M(e) {
                e[P] = L++, e._state = void 0, e._result = void 0, e._subscribers = []
            }
            var N = function() {
                    function e(e, t) {
                        this._instanceConstructor = e, this.promise = new e(E), this.promise[P] || M(this.promise), n(t) ? (this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? R(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(t), 0 === this._remaining && R(this.promise, this._result))) : I(this.promise, new Error("Array Methods must be provided an Array"))
                    }
                    return e.prototype._enumerate = function(e) {
                        for (var t = 0; this._state === C && t < e.length; t++) this._eachEntry(e[t], t)
                    }, e.prototype._eachEntry = function(e, t) {
                        var r = this._instanceConstructor,
                            n = r.resolve;
                        if (n === S) {
                            var o = F(e);
                            if (o === w && e._state !== C) this._settledAt(e._state, t, e._result);
                            else if ("function" != typeof o) this._remaining--, this._result[t] = e;
                            else if (r === j) {
                                var i = new r(E);
                                A(i, e, o), this._willSettleAt(i, t)
                            } else this._willSettleAt(new r(function(t) {
                                return t(e)
                            }), t)
                        } else this._willSettleAt(n(e), t)
                    }, e.prototype._settledAt = function(e, t, r) {
                        var n = this.promise;
                        n._state === C && (this._remaining--, e === $ ? I(n, r) : this._result[t] = r), 0 === this._remaining && R(n, this._result)
                    }, e.prototype._willSettleAt = function(e, t) {
                        var r = this;
                        U(e, void 0, function(e) {
                            return r._settledAt(T, t, e)
                        }, function(e) {
                            return r._settledAt($, t, e)
                        })
                    }, e
                }(),
                j = function() {
                    function e(t) {
                        this[P] = L++, this._result = this._state = void 0, this._subscribers = [], E !== t && ("function" != typeof t && function() {
                            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                        }(), this instanceof e ? function(e, t) {
                            try {
                                t(function(t) {
                                    x(e, t)
                                }, function(t) {
                                    I(e, t)
                                })
                            } catch (r) {
                                I(e, r)
                            }
                        }(this, t) : function() {
                            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                        }())
                    }
                    return e.prototype.catch = function(e) {
                        return this.then(null, e)
                    }, e.prototype.finally = function(e) {
                        var t = this.constructor;
                        return r(e) ? this.then(function(r) {
                            return t.resolve(e()).then(function() {
                                return r
                            })
                        }, function(r) {
                            return t.resolve(e()).then(function() {
                                throw r
                            })
                        }) : this.then(e, e)
                    }, e
                }();
            return j.prototype.then = w, j.all = function(e) {
                return new N(this, e).promise
            }, j.race = function(e) {
                var t = this;
                return n(e) ? new t(function(r, n) {
                    for (var o = e.length, i = 0; i < o; i++) t.resolve(e[i]).then(r, n)
                }) : new t(function(e, t) {
                    return t(new TypeError("You must pass an array to race."))
                })
            }, j.resolve = S, j.reject = function(e) {
                var t = new this(E);
                return I(t, e), t
            }, j._setScheduler = function(e) {
                s = e
            }, j._setAsap = function(e) {
                a = e
            }, j._asap = a, j.polyfill = function() {
                var e = void 0;
                if (void 0 !== t) e = t;
                else if ("undefined" != typeof self) e = self;
                else try {
                    e = Function("return this")()
                } catch (o) {
                    throw new Error("polyfill failed because global object is unavailable in this environment")
                }
                var r = e.Promise;
                if (r) {
                    var n = null;
                    try {
                        n = Object.prototype.toString.call(r.resolve())
                    } catch (o) {}
                    if ("[object Promise]" === n && !r.cast) return
                }
                e.Promise = j
            }, j.Promise = j, j
        })
    }).call(this, _$browser_54, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}), _$es6Promise_34 = _$es6Promise_34.exports;
    var _$auto_33 = _$es6Promise_34.polyfill(),
        _$fetchUmd_77 = {
            exports: {}
        },
        __global_77, factory;
    __global_77 = this, factory = function(e) {
        "use strict";
        var t = {
            searchParams: "URLSearchParams" in self,
            iterable: "Symbol" in self && "iterator" in Symbol,
            blob: "FileReader" in self && "Blob" in self && function() {
                try {
                    return new Blob, !0
                } catch (e) {
                    return !1
                }
            }(),
            formData: "FormData" in self,
            arrayBuffer: "ArrayBuffer" in self
        };
        if (t.arrayBuffer) var r = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
            n = ArrayBuffer.isView || function(e) {
                return e && r.indexOf(Object.prototype.toString.call(e)) > -1
            };

        function o(e) {
            if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
            return e.toLowerCase()
        }

        function i(e) {
            return "string" != typeof e && (e = String(e)), e
        }

        function s(e) {
            var r = {
                next: function() {
                    var t = e.shift();
                    return {
                        done: void 0 === t,
                        value: t
                    }
                }
            };
            return t.iterable && (r[Symbol.iterator] = function() {
                return r
            }), r
        }

        function a(e) {
            this.map = {}, e instanceof a ? e.forEach(function(e, t) {
                this.append(t, e)
            }, this) : Array.isArray(e) ? e.forEach(function(e) {
                this.append(e[0], e[1])
            }, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
                this.append(t, e[t])
            }, this)
        }

        function l(e) {
            if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
            e.bodyUsed = !0
        }

        function u(e) {
            return new Promise(function(t, r) {
                e.onload = function() {
                    t(e.result)
                }, e.onerror = function() {
                    r(e.error)
                }
            })
        }

        function c(e) {
            var t = new FileReader,
                r = u(t);
            return t.readAsArrayBuffer(e), r
        }

        function p(e) {
            if (e.slice) return e.slice(0);
            var t = new Uint8Array(e.byteLength);
            return t.set(new Uint8Array(e)), t.buffer
        }

        function d() {
            return this.bodyUsed = !1, this._initBody = function(e) {
                var r;
                this._bodyInit = e, e ? "string" == typeof e ? this._bodyText = e : t.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : t.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : t.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : t.arrayBuffer && t.blob && (r = e) && DataView.prototype.isPrototypeOf(r) ? (this._bodyArrayBuffer = p(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : t.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || n(e)) ? this._bodyArrayBuffer = p(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : t.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }, t.blob && (this.blob = function() {
                var e = l(this);
                if (e) return e;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }, this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? l(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(c)
            }), this.text = function() {
                var e, t, r, n = l(this);
                if (n) return n;
                if (this._bodyBlob) return e = this._bodyBlob, r = u(t = new FileReader), t.readAsText(e), r;
                if (this._bodyArrayBuffer) return Promise.resolve(function(e) {
                    for (var t = new Uint8Array(e), r = new Array(t.length), n = 0; n < t.length; n++) r[n] = String.fromCharCode(t[n]);
                    return r.join("")
                }(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }, t.formData && (this.formData = function() {
                return this.text().then(f)
            }), this.json = function() {
                return this.text().then(JSON.parse)
            }, this
        }
        a.prototype.append = function(e, t) {
            e = o(e), t = i(t);
            var r = this.map[e];
            this.map[e] = r ? r + ", " + t : t
        }, a.prototype.delete = function(e) {
            delete this.map[o(e)]
        }, a.prototype.get = function(e) {
            return e = o(e), this.has(e) ? this.map[e] : null
        }, a.prototype.has = function(e) {
            return this.map.hasOwnProperty(o(e))
        }, a.prototype.set = function(e, t) {
            this.map[o(e)] = i(t)
        }, a.prototype.forEach = function(e, t) {
            for (var r in this.map) this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this)
        }, a.prototype.keys = function() {
            var e = [];
            return this.forEach(function(t, r) {
                e.push(r)
            }), s(e)
        }, a.prototype.values = function() {
            var e = [];
            return this.forEach(function(t) {
                e.push(t)
            }), s(e)
        }, a.prototype.entries = function() {
            var e = [];
            return this.forEach(function(t, r) {
                e.push([r, t])
            }), s(e)
        }, t.iterable && (a.prototype[Symbol.iterator] = a.prototype.entries);
        var _ = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

        function h(e, t) {
            var r, n, o = (t = t || {}).body;
            if (e instanceof h) {
                if (e.bodyUsed) throw new TypeError("Already read");
                this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new a(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, o || null == e._bodyInit || (o = e._bodyInit, e.bodyUsed = !0)
            } else this.url = String(e);
            if (this.credentials = t.credentials || this.credentials || "same-origin", !t.headers && this.headers || (this.headers = new a(t.headers)), this.method = (n = (r = t.method || this.method || "GET").toUpperCase(), _.indexOf(n) > -1 ? n : r), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && o) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(o)
        }

        function f(e) {
            var t = new FormData;
            return e.trim().split("&").forEach(function(e) {
                if (e) {
                    var r = e.split("="),
                        n = r.shift().replace(/\+/g, " "),
                        o = r.join("=").replace(/\+/g, " ");
                    t.append(decodeURIComponent(n), decodeURIComponent(o))
                }
            }), t
        }

        function g(e, t) {
            t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new a(t.headers), this.url = t.url || "", this._initBody(e)
        }
        h.prototype.clone = function() {
            return new h(this, {
                body: this._bodyInit
            })
        }, d.call(h.prototype), d.call(g.prototype), g.prototype.clone = function() {
            return new g(this._bodyInit, {
                status: this.status,
                statusText: this.statusText,
                headers: new a(this.headers),
                url: this.url
            })
        }, g.error = function() {
            var e = new g(null, {
                status: 0,
                statusText: ""
            });
            return e.type = "error", e
        };
        var m = [301, 302, 303, 307, 308];
        g.redirect = function(e, t) {
            if (-1 === m.indexOf(t)) throw new RangeError("Invalid status code");
            return new g(null, {
                status: t,
                headers: {
                    location: e
                }
            })
        }, e.DOMException = self.DOMException;
        try {
            new e.DOMException
        } catch (err) {
            e.DOMException = function(e, t) {
                this.message = e, this.name = t;
                var r = Error(e);
                this.stack = r.stack
            }, e.DOMException.prototype = Object.create(Error.prototype), e.DOMException.prototype.constructor = e.DOMException
        }

        function y(r, n) {
            return new Promise(function(o, i) {
                var s = new h(r, n);
                if (s.signal && s.signal.aborted) return i(new e.DOMException("Aborted", "AbortError"));
                var l = new XMLHttpRequest;

                function u() {
                    l.abort()
                }
                l.onload = function() {
                    var e, t, r = {
                        status: l.status,
                        statusText: l.statusText,
                        headers: (e = l.getAllResponseHeaders() || "", t = new a, e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(e) {
                            var r = e.split(":"),
                                n = r.shift().trim();
                            if (n) {
                                var o = r.join(":").trim();
                                t.append(n, o)
                            }
                        }), t)
                    };
                    r.url = "responseURL" in l ? l.responseURL : r.headers.get("X-Request-URL");
                    var n = "response" in l ? l.response : l.responseText;
                    o(new g(n, r))
                }, l.onerror = function() {
                    i(new TypeError("Network request failed"))
                }, l.ontimeout = function() {
                    i(new TypeError("Network request failed"))
                }, l.onabort = function() {
                    i(new e.DOMException("Aborted", "AbortError"))
                }, l.open(s.method, s.url, !0), "include" === s.credentials ? l.withCredentials = !0 : "omit" === s.credentials && (l.withCredentials = !1), "responseType" in l && t.blob && (l.responseType = "blob"), s.headers.forEach(function(e, t) {
                    l.setRequestHeader(t, e)
                }), s.signal && (s.signal.addEventListener("abort", u), l.onreadystatechange = function() {
                    4 === l.readyState && s.signal.removeEventListener("abort", u)
                }), l.send(void 0 === s._bodyInit ? null : s._bodyInit)
            })
        }
        y.polyfill = !0, self.fetch || (self.fetch = y, self.Headers = a, self.Request = h, self.Response = g), e.Headers = a, e.Request = h, e.Response = g, e.fetch = y, Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, "object" == typeof _$fetchUmd_77.exports ? factory(_$fetchUmd_77.exports) : "function" == typeof define && define.amd ? define(["exports"], factory) : factory(__global_77.WHATWGFetch = {}), _$fetchUmd_77 = _$fetchUmd_77.exports;
    var _$hasProperty_218 = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    };

    function _extends() {
        return (_extends = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var _$Translator_199 = function() {
            function e(e) {
                var t = this;
                this.locale = {
                    strings: {},
                    pluralize: function(e) {
                        return 1 === e ? 0 : 1
                    }
                }, Array.isArray(e) ? e.forEach(function(e) {
                    return t._apply(e)
                }) : this._apply(e)
            }
            var t = e.prototype;
            return t._apply = function(e) {
                if (e && e.strings) {
                    var t = this.locale;
                    this.locale = _extends({}, t, {
                        strings: _extends({}, t.strings, e.strings)
                    }), this.locale.pluralize = e.pluralize || t.pluralize
                }
            }, t.interpolate = function(e, t) {
                var r = String.prototype,
                    n = r.split,
                    o = r.replace,
                    i = /\$/g,
                    s = [e];
                for (var a in t)
                    if ("_" !== a && _$hasProperty_218(t, a)) {
                        var l = t[a];
                        "string" == typeof l && (l = o.call(t[a], i, "$$$$")), s = u(s, new RegExp("%\\{" + a + "\\}", "g"), l)
                    } return s;

                function u(e, t, r) {
                    var o = [];
                    return e.forEach(function(e) {
                        n.call(e, t).forEach(function(e, t, n) {
                            "" !== e && o.push(e), t < n.length - 1 && o.push(r)
                        })
                    }), o
                }
            }, t.translate = function(e, t) {
                return this.translateArray(e, t).join("")
            }, t.translateArray = function(e, t) {
                if (t && void 0 !== t.smart_count) {
                    var r = this.locale.pluralize(t.smart_count);
                    return this.interpolate(this.locale.strings[e][r], t)
                }
                return this.interpolate(this.locale.strings[e], t)
            }, e
        }(),
        _$namespaceEmitter_49 = function() {
            var e = {},
                t = e._fns = {};
            return e.emit = function(e, r, n, o, i, s, a) {
                var l = function(e) {
                    for (var r = t[e] ? t[e] : [], n = e.indexOf(":"), o = -1 === n ? [e] : [e.substring(0, n), e.substring(n + 1)], i = Object.keys(t), s = 0, a = i.length; s < a; s++) {
                        var l = i[s];
                        if ("*" === l && (r = r.concat(t[l])), 2 === o.length && o[0] === l) {
                            r = r.concat(t[l]);
                            break
                        }
                    }
                    return r
                }(e);
                l.length && function(e, t, r) {
                    for (var n = 0, o = t.length; n < o && t[n]; n++) t[n].event = e, t[n].apply(t[n], r)
                }(e, l, [r, n, o, i, s, a])
            }, e.on = function(e, r) {
                t[e] || (t[e] = []), t[e].push(r)
            }, e.once = function(t, r) {
                this.on(t, function n() {
                    r.apply(this, arguments), e.off(t, n)
                })
            }, e.off = function(e, t) {
                var r = [];
                if (e && t)
                    for (var n = this._fns[e], o = 0, i = n ? n.length : 0; o < i; o++) n[o] !== t && r.push(n[o]);
                r.length ? this._fns[e] = r : delete this._fns[e]
            }, e
        },
        _$pad_16 = function(e, t) {
            var r = "000000000" + e;
            return r.substr(r.length - t)
        },
        env = "object" == typeof window ? window : self,
        globalCount = Object.keys(env).length,
        clientId = _$pad_16(((navigator.mimeTypes ? navigator.mimeTypes.length : 0) + navigator.userAgent.length).toString(36) + globalCount.toString(36), 4),
        _$fingerprintBrowser_14 = function() {
            return clientId
        },
        getRandomValue, crypto = window.crypto || window.msCrypto;
    if (crypto) {
        var lim = Math.pow(2, 32) - 1;
        getRandomValue = function() {
            return Math.abs(crypto.getRandomValues(new Uint32Array(1))[0] / lim)
        }
    } else getRandomValue = Math.random;
    var _$getRandomValue_15 = getRandomValue,
        _$cuid_13 = {},
        c = 0,
        blockSize = 4,
        base = 36,
        discreteValues = Math.pow(base, blockSize);

    function randomBlock() {
        return _$pad_16((_$getRandomValue_15() * discreteValues << 0).toString(base), blockSize)
    }

    function safeCounter() {
        return c = c < discreteValues ? c : 0, ++c - 1
    }

    function cuid() {
        return "c" + (new Date).getTime().toString(base) + _$pad_16(safeCounter().toString(base), blockSize) + _$fingerprintBrowser_14() + (randomBlock() + randomBlock())
    }
    cuid.slug = function() {
        var e = (new Date).getTime().toString(36),
            t = safeCounter().toString(36).slice(-4),
            r = _$fingerprintBrowser_14().slice(0, 1) + _$fingerprintBrowser_14().slice(-1),
            n = randomBlock().slice(-2);
        return e.slice(-2) + t + r + n
    }, cuid.isCuid = function(e) {
        return "string" == typeof e && !!e.startsWith("c")
    }, cuid.isSlug = function(e) {
        if ("string" != typeof e) return !1;
        var t = e.length;
        return t >= 7 && t <= 10
    }, cuid.fingerprint = _$fingerprintBrowser_14, _$cuid_13 = cuid;
    var _$lodashThrottle_46 = {};
    (function(e) {
        var t = "Expected a function",
            r = NaN,
            n = "[object Symbol]",
            o = /^\s+|\s+$/g,
            i = /^[-+]0x[0-9a-f]+$/i,
            s = /^0b[01]+$/i,
            a = /^0o[0-7]+$/i,
            l = parseInt,
            u = "object" == typeof e && e && e.Object === Object && e,
            c = "object" == typeof self && self && self.Object === Object && self,
            p = u || c || Function("return this")(),
            d = Object.prototype.toString,
            _ = Math.max,
            h = Math.min,
            f = function() {
                return p.Date.now()
            };

        function g(e) {
            var t = typeof e;
            return !!e && ("object" == t || "function" == t)
        }

        function m(e) {
            if ("number" == typeof e) return e;
            if (function(e) {
                    return "symbol" == typeof e || function(e) {
                        return !!e && "object" == typeof e
                    }(e) && d.call(e) == n
                }(e)) return r;
            if (g(e)) {
                var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                e = g(t) ? t + "" : t
            }
            if ("string" != typeof e) return 0 === e ? e : +e;
            e = e.replace(o, "");
            var u = s.test(e);
            return u || a.test(e) ? l(e.slice(2), u ? 2 : 8) : i.test(e) ? r : +e
        }
        _$lodashThrottle_46 = function(e, r, n) {
            var o = !0,
                i = !0;
            if ("function" != typeof e) throw new TypeError(t);
            return g(n) && (o = "leading" in n ? !!n.leading : o, i = "trailing" in n ? !!n.trailing : i),
                function(e, r, n) {
                    var o, i, s, a, l, u, c = 0,
                        p = !1,
                        d = !1,
                        y = !0;
                    if ("function" != typeof e) throw new TypeError(t);

                    function v(t) {
                        var r = o,
                            n = i;
                        return o = i = void 0, c = t, a = e.apply(n, r)
                    }

                    function b(e) {
                        var t = e - u;
                        return void 0 === u || t >= r || t < 0 || d && e - c >= s
                    }

                    function w() {
                        var e = f();
                        if (b(e)) return S(e);
                        l = setTimeout(w, function(e) {
                            var t = r - (e - u);
                            return d ? h(t, s - (e - c)) : t
                        }(e))
                    }

                    function S(e) {
                        return l = void 0, y && o ? v(e) : (o = i = void 0, a)
                    }

                    function P() {
                        var e = f(),
                            t = b(e);
                        if (o = arguments, i = this, u = e, t) {
                            if (void 0 === l) return function(e) {
                                return c = e, l = setTimeout(w, r), p ? v(e) : a
                            }(u);
                            if (d) return l = setTimeout(w, r), v(u)
                        }
                        return void 0 === l && (l = setTimeout(w, r)), a
                    }
                    return r = m(r) || 0, g(n) && (p = !!n.leading, s = (d = "maxWait" in n) ? _(m(n.maxWait) || 0, r) : s, y = "trailing" in n ? !!n.trailing : y), P.cancel = function() {
                        void 0 !== l && clearTimeout(l), c = 0, o = u = i = l = void 0
                    }, P.flush = function() {
                        return void 0 === l ? a : S(f())
                    }, P
                }(e, r, {
                    leading: o,
                    maxWait: r,
                    trailing: i
                })
        }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var _$prettyBytes_225 = function(e) {
            if ("number" != typeof e || isNaN(e)) throw new TypeError("Expected a number, got " + typeof e);
            var t = e < 0,
                r = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
            if (t && (e = -e), e < 1) return (t ? "-" : "") + e + " B";
            var n = Math.min(Math.floor(Math.log(e) / Math.log(1024)), r.length - 1);
            e = Number(e / Math.pow(1024, n));
            var o = r[n];
            return e >= 10 || e % 1 == 0 ? (t ? "-" : "") + e.toFixed(0) + " " + o : (t ? "-" : "") + e.toFixed(1) + " " + o
        },
        _$wildcard_78 = {};

    function WildcardMatcher(e, t) {
        this.text = e = e || "", this.hasWild = ~e.indexOf("*"), this.separator = t, this.parts = e.split(t)
    }
    WildcardMatcher.prototype.match = function(e) {
        var t, r, n = !0,
            o = this.parts,
            i = o.length;
        if ("string" == typeof e || e instanceof String)
            if (this.hasWild || this.text == e) {
                for (r = (e || "").split(this.separator), t = 0; n && t < i; t++) "*" !== o[t] && (n = t < r.length && o[t] === r[t]);
                n = n && r
            } else n = !1;
        else if ("function" == typeof e.splice)
            for (n = [], t = e.length; t--;) this.match(e[t]) && (n[n.length] = e[t]);
        else if ("object" == typeof e)
            for (var s in n = {}, e) this.match(s) && (n[s] = e[s]);
        return n
    }, _$wildcard_78 = function(e, t, r) {
        var n = new WildcardMatcher(e, r || /[\/\.]/);
        return void 0 !== t ? n.match(t) : n
    };
    var reMimePartSplit = /[\/\+\.]/,
        _$mimeMatch_48 = function(e, t) {
            function r(t) {
                var r = _$wildcard_78(t, e, reMimePartSplit);
                return r && r.length >= 2
            }
            return t ? r(t.split(";")[0]) : r
        },
        _$package_164 = {
            version: "1.2.0"
        },
        _$lib_163 = {};

    function ___extends_163() {
        return (___extends_163 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var DefaultStore = function() {
        function e() {
            this.state = {}, this.callbacks = []
        }
        var t = e.prototype;
        return t.getState = function() {
            return this.state
        }, t.setState = function(e) {
            var t = ___extends_163({}, this.state),
                r = ___extends_163({}, this.state, e);
            this.state = r, this._publish(t, r, e)
        }, t.subscribe = function(e) {
            var t = this;
            return this.callbacks.push(e),
                function() {
                    t.callbacks.splice(t.callbacks.indexOf(e), 1)
                }
        }, t._publish = function() {
            for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
            this.callbacks.forEach(function(e) {
                e.apply(void 0, t)
            })
        }, e
    }();
    DefaultStore.VERSION = _$package_164.version, _$lib_163 = function() {
        return new DefaultStore
    };
    var _$getFileNameAndExtension_212 = function(e) {
            var t = /(?:\.([^.]+))?$/.exec(e)[1];
            return {
                name: e.replace("." + t, ""),
                extension: t
            }
        },
        _$mimeTypes_224 = {
            md: "text/markdown",
            markdown: "text/markdown",
            mp4: "video/mp4",
            mp3: "audio/mp3",
            svg: "image/svg+xml",
            jpg: "image/jpeg",
            png: "image/png",
            gif: "image/gif",
            heic: "image/heic",
            heif: "image/heif",
            yaml: "text/yaml",
            yml: "text/yaml",
            csv: "text/csv",
            avi: "video/x-msvideo",
            mks: "video/x-matroska",
            mkv: "video/x-matroska",
            mov: "video/quicktime",
            doc: "application/msword",
            docm: "application/vnd.ms-word.document.macroenabled.12",
            docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            dot: "application/msword",
            dotm: "application/vnd.ms-word.template.macroenabled.12",
            dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
            xla: "application/vnd.ms-excel",
            xlam: "application/vnd.ms-excel.addin.macroenabled.12",
            xlc: "application/vnd.ms-excel",
            xlf: "application/x-xliff+xml",
            xlm: "application/vnd.ms-excel",
            xls: "application/vnd.ms-excel",
            xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
            xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            xlt: "application/vnd.ms-excel",
            xltm: "application/vnd.ms-excel.template.macroenabled.12",
            xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
            xlw: "application/vnd.ms-excel",
            txt: "text/plain",
            text: "text/plain",
            conf: "text/plain",
            log: "text/plain",
            pdf: "application/pdf"
        },
        _$getFileType_213 = function(e) {
            var t = e.name ? _$getFileNameAndExtension_212(e.name).extension : null;
            return t = t ? t.toLowerCase() : null, e.type ? e.type : t && _$mimeTypes_224[t] ? _$mimeTypes_224[t] : "application/octet-stream"
        };

    function encodeFilename(e) {
        var t = "";
        return e.replace(/[^A-Z0-9]/gi, function(e) {
            return t += "-" + function(e) {
                return e.charCodeAt(0).toString(32)
            }(e), "/"
        }) + t
    }
    var _$generateFileID_205 = function(e) {
            return ["uppy", e.name ? encodeFilename(e.name.toLowerCase()) : "", e.type, e.meta && e.meta.relativePath ? encodeFilename(e.meta.relativePath.toLowerCase()) : "", e.data.size, e.data.lastModified].filter(function(e) {
                return e
            }).join("-")
        },
        _$supportsUploadProgress_95 = function(e) {
            if (null == e && (e = "undefined" != typeof navigator ? navigator.userAgent : null), !e) return !0;
            var t = /Edge\/(\d+\.\d+)/.exec(e);
            if (!t) return !0;
            var r = t[1].split("."),
                n = r[0],
                o = r[1];
            return n = parseInt(n, 10), o = parseInt(o, 10), n < 15 || 15 === n && o < 15063 || n > 18 || 18 === n && o >= 18218
        };

    function __pad_217(e) {
        return 2 !== e.length ? 0 + e : e
    }
    var _$getTimeStamp_217 = function() {
            var e = new Date;
            return __pad_217(e.getHours().toString()) + ":" + __pad_217(e.getMinutes().toString()) + ":" + __pad_217(e.getSeconds().toString())
        },
        debugLogger = {
            debug: function() {
                for (var e = console.debug || console.log, t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                e.call.apply(e, [console, "[Uppy] [" + _$getTimeStamp_217() + "]"].concat(r))
            },
            warn: function() {
                for (var e, t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return (e = console).warn.apply(e, ["[Uppy] [" + _$getTimeStamp_217() + "]"].concat(r))
            },
            error: function() {
                for (var e, t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
                return (e = console).error.apply(e, ["[Uppy] [" + _$getTimeStamp_217() + "]"].concat(r))
            }
        },
        _$loggers_94 = {
            nullLogger: {
                debug: function() {},
                warn: function() {},
                error: function() {}
            },
            debugLogger: debugLogger
        },
        _$preact_53 = {
            exports: {}
        };
    ! function() {
        "use strict";

        function e() {}

        function t(t, r) {
            var n, o, i, s, a = S;
            for (s = arguments.length; s-- > 2;) w.push(arguments[s]);
            for (r && null != r.children && (w.length || w.push(r.children), delete r.children); w.length;)
                if ((o = w.pop()) && void 0 !== o.pop)
                    for (s = o.length; s--;) w.push(o[s]);
                else "boolean" == typeof o && (o = null), (i = "function" != typeof t) && (null == o ? o = "" : "number" == typeof o ? o = String(o) : "string" != typeof o && (i = !1)), i && n ? a[a.length - 1] += o : a === S ? a = [o] : a.push(o), n = i;
            var l = new e;
            return l.nodeName = t, l.children = a, l.attributes = null == r ? void 0 : r, l.key = null == r ? void 0 : r.key, void 0 !== b.vnode && b.vnode(l), l
        }

        function r(e, t) {
            for (var r in t) e[r] = t[r];
            return e
        }

        function n(e) {
            !e.__d && (e.__d = !0) && 1 == C.push(e) && (b.debounceRendering || P)(o)
        }

        function o() {
            var e, t = C;
            for (C = []; e = t.pop();) e.__d && m(e)
        }

        function i(e, t) {
            return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase()
        }

        function s(e) {
            var t = r({}, e.attributes);
            t.children = e.children;
            var n = e.nodeName.defaultProps;
            if (void 0 !== n)
                for (var o in n) void 0 === t[o] && (t[o] = n[o]);
            return t
        }

        function a(e) {
            var t = e.parentNode;
            t && t.removeChild(e)
        }

        function l(e, t, r, n, o) {
            if ("className" === t && (t = "class"), "key" === t);
            else if ("ref" === t) r && r(null), n && n(e);
            else if ("class" !== t || o)
                if ("style" === t) {
                    if (n && "string" != typeof n && "string" != typeof r || (e.style.cssText = n || ""), n && "object" == typeof n) {
                        if ("string" != typeof r)
                            for (var i in r) i in n || (e.style[i] = "");
                        for (var i in n) e.style[i] = "number" == typeof n[i] && !1 === E.test(i) ? n[i] + "px" : n[i]
                    }
                } else if ("dangerouslySetInnerHTML" === t) n && (e.innerHTML = n.__html || "");
            else if ("o" == t[0] && "n" == t[1]) {
                var s = t !== (t = t.replace(/Capture$/, ""));
                t = t.toLowerCase().substring(2), n ? r || e.addEventListener(t, u, s) : e.removeEventListener(t, u, s), (e.__l || (e.__l = {}))[t] = n
            } else if ("list" !== t && "type" !== t && !o && t in e) ! function(e, t, r) {
                try {
                    e[t] = r
                } catch (n) {}
            }(e, t, null == n ? "" : n), null != n && !1 !== n || e.removeAttribute(t);
            else {
                var a = o && t !== (t = t.replace(/^xlink:?/, ""));
                null == n || !1 === n ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof n && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), n) : e.setAttribute(t, n))
            } else e.className = n || ""
        }

        function u(e) {
            return this.__l[e.type](b.event && b.event(e) || e)
        }

        function c() {
            for (var e; e = T.pop();) b.afterMount && b.afterMount(e), e.componentDidMount && e.componentDidMount()
        }

        function p(e, t, r, n, o, u) {
            $++ || (k = null != o && void 0 !== o.ownerSVGElement, F = null != e && !("__preactattr_" in e));
            var p = function e(t, r, n, o, u) {
                var c = t,
                    p = k;
                if (null != r && "boolean" != typeof r || (r = ""), "string" == typeof r || "number" == typeof r) return t && void 0 !== t.splitText && t.parentNode && (!t._component || u) ? t.nodeValue != r && (t.nodeValue = r) : (c = document.createTextNode(r), t && (t.parentNode && t.parentNode.replaceChild(c, t), d(t, !0))), c.__preactattr_ = !0, c;
                var _, f, m = r.nodeName;
                if ("function" == typeof m) return function(e, t, r, n) {
                    for (var o = e && e._component, i = o, a = e, l = o && e._componentConstructor === t.nodeName, u = l, c = s(t); o && !u && (o = o.__u);) u = o.constructor === t.nodeName;
                    return o && u && (!n || o._component) ? (g(o, c, 3, r, n), e = o.base) : (i && !l && (y(i), e = a = null), o = h(t.nodeName, c, r), e && !o.__b && (o.__b = e, a = null), g(o, c, 1, r, n), e = o.base, a && e !== a && (a._component = null, d(a, !1))), e
                }(t, r, n, o);
                if (k = "svg" === m || "foreignObject" !== m && k, m = String(m), (!t || !i(t, m)) && (_ = m, (f = k ? document.createElementNS("http://www.w3.org/2000/svg", _) : document.createElement(_)).__n = _, c = f, t)) {
                    for (; t.firstChild;) c.appendChild(t.firstChild);
                    t.parentNode && t.parentNode.replaceChild(c, t), d(t, !0)
                }
                var v = c.firstChild,
                    b = c.__preactattr_,
                    w = r.children;
                if (null == b) {
                    b = c.__preactattr_ = {};
                    for (var S = c.attributes, P = S.length; P--;) b[S[P].name] = S[P].value
                }
                return !F && w && 1 === w.length && "string" == typeof w[0] && null != v && void 0 !== v.splitText && null == v.nextSibling ? v.nodeValue != w[0] && (v.nodeValue = w[0]) : (w && w.length || null != v) && function(t, r, n, o, s) {
                        var l, u, c, p, _, h, f, g, m = t.childNodes,
                            y = [],
                            v = {},
                            b = 0,
                            w = 0,
                            S = m.length,
                            P = 0,
                            E = r ? r.length : 0;
                        if (0 !== S)
                            for (var C = 0; C < S; C++) {
                                var T = m[C],
                                    $ = T.__preactattr_,
                                    k = E && $ ? T._component ? T._component.__k : $.key : null;
                                null != k ? (b++, v[k] = T) : ($ || (void 0 !== T.splitText ? !s || T.nodeValue.trim() : s)) && (y[P++] = T)
                            }
                        if (0 !== E)
                            for (var C = 0; C < E; C++) {
                                p = r[C], _ = null;
                                var k = p.key;
                                if (null != k) b && void 0 !== v[k] && (_ = v[k], v[k] = void 0, b--);
                                else if (!_ && w < P)
                                    for (l = w; l < P; l++)
                                        if (void 0 !== y[l] && (h = u = y[l], g = s, "string" == typeof(f = p) || "number" == typeof f ? void 0 !== h.splitText : "string" == typeof f.nodeName ? !h._componentConstructor && i(h, f.nodeName) : g || h._componentConstructor === f.nodeName)) {
                                            _ = u, y[l] = void 0, l === P - 1 && P--, l === w && w++;
                                            break
                                        } _ = e(_, p, n, o), c = m[C], _ && _ !== t && _ !== c && (null == c ? t.appendChild(_) : _ === c.nextSibling ? a(c) : t.insertBefore(_, c))
                            }
                        if (b)
                            for (var C in v) void 0 !== v[C] && d(v[C], !1);
                        for (; w <= P;) void 0 !== (_ = y[P--]) && d(_, !1)
                    }(c, w, n, o, F || null != b.dangerouslySetInnerHTML),
                    function(e, t, r) {
                        var n;
                        for (n in r) t && null != t[n] || null == r[n] || l(e, n, r[n], r[n] = void 0, k);
                        for (n in t) "children" === n || "innerHTML" === n || n in r && t[n] === ("value" === n || "checked" === n ? e[n] : r[n]) || l(e, n, r[n], r[n] = t[n], k)
                    }(c, r.attributes, b), k = p, c
            }(e, t, r, n, u);
            return o && p.parentNode !== o && o.appendChild(p), --$ || (F = !1, u || c()), p
        }

        function d(e, t) {
            var r = e._component;
            r ? y(r) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || a(e), _(e))
        }

        function _(e) {
            for (e = e.lastChild; e;) {
                var t = e.previousSibling;
                d(e, !0), e = t
            }
        }

        function h(e, t, r) {
            var n, o = A[e.name];
            if (e.prototype && e.prototype.render ? (n = new e(t, r), v.call(n, t, r)) : ((n = new v(t, r)).constructor = e, n.render = f), o)
                for (var i = o.length; i--;)
                    if (o[i].constructor === e) {
                        n.__b = o[i].__b, o.splice(i, 1);
                        break
                    } return n
        }

        function f(e, t, r) {
            return this.constructor(e, r)
        }

        function g(e, t, r, o, i) {
            e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== r && (1 !== r && !1 === b.syncComponentUpdates && e.base ? n(e) : m(e, 1, i)), e.__r && e.__r(e))
        }

        function m(e, t, n, o) {
            if (!e.__x) {
                var i, a, l, u = e.props,
                    _ = e.state,
                    f = e.context,
                    v = e.__p || u,
                    w = e.__s || _,
                    S = e.__c || f,
                    P = e.base,
                    E = e.__b,
                    C = P || E,
                    k = e._component,
                    F = !1;
                if (P && (e.props = v, e.state = w, e.context = S, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(u, _, f) ? F = !0 : e.componentWillUpdate && e.componentWillUpdate(u, _, f), e.props = u, e.state = _, e.context = f), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !F) {
                    i = e.render(u, _, f), e.getChildContext && (f = r(r({}, f), e.getChildContext()));
                    var A, x, O = i && i.nodeName;
                    if ("function" == typeof O) {
                        var R = s(i);
                        (a = k) && a.constructor === O && R.key == a.__k ? g(a, R, 1, f, !1) : (A = a, e._component = a = h(O, R, f), a.__b = a.__b || E, a.__u = e, g(a, R, 0, f, !1), m(a, 1, n, !0)), x = a.base
                    } else l = C, (A = k) && (l = e._component = null), (C || 1 === t) && (l && (l._component = null), x = p(l, i, f, n || !P, C && C.parentNode, !0));
                    if (C && x !== C && a !== k) {
                        var I = C.parentNode;
                        I && x !== I && (I.replaceChild(x, C), A || (C._component = null, d(C, !1)))
                    }
                    if (A && y(A), e.base = x, x && !o) {
                        for (var U = e, D = e; D = D.__u;)(U = D).base = x;
                        x._component = U, x._componentConstructor = U.constructor
                    }
                }
                if (!P || n ? T.unshift(e) : F || (e.componentDidUpdate && e.componentDidUpdate(v, w, S), b.afterUpdate && b.afterUpdate(e)), null != e.__h)
                    for (; e.__h.length;) e.__h.pop().call(e);
                $ || o || c()
            }
        }

        function y(e) {
            b.beforeUnmount && b.beforeUnmount(e);
            var t = e.base;
            e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;
            var r = e._component;
            r ? y(r) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, a(t), function(e) {
                var t = e.constructor.name;
                (A[t] || (A[t] = [])).push(e)
            }(e), _(t)), e.__r && e.__r(null)
        }

        function v(e, t) {
            this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}
        }
        var b = {},
            w = [],
            S = [],
            P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
            E = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
            C = [],
            T = [],
            $ = 0,
            k = !1,
            F = !1,
            A = {};
        r(v.prototype, {
            setState: function(e, t) {
                var o = this.state;
                this.__s || (this.__s = r({}, o)), r(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), n(this)
            },
            forceUpdate: function(e) {
                e && (this.__h = this.__h || []).push(e), m(this, 2)
            },
            render: function() {}
        });
        var x = {
            h: t,
            createElement: t,
            cloneElement: function(e, n) {
                return t(e.nodeName, r(r({}, e.attributes), n), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children)
            },
            Component: v,
            render: function(e, t, r) {
                return p(r, e, {}, !1, t, !1)
            },
            rerender: o,
            options: b
        };
        _$preact_53.exports = x
    }(), _$preact_53 = _$preact_53.exports;
    var _$isDOMElement_219 = function(e) {
            return e && "object" == typeof e && e.nodeType === Node.ELEMENT_NODE
        },
        _$findDOMElement_204 = function(e, t) {
            return void 0 === t && (t = document), "string" == typeof e ? t.querySelector(e) : "object" == typeof e && _$isDOMElement_219(e) ? e : void 0
        };

    function ___extends_92() {
        return (___extends_92 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var _$Plugin_92 = function() {
            function e(e, t) {
                this.uppy = e, this.opts = t || {}, this.update = this.update.bind(this), this.mount = this.mount.bind(this), this.install = this.install.bind(this), this.uninstall = this.uninstall.bind(this)
            }
            var t = e.prototype;
            return t.getPluginState = function() {
                return this.uppy.getState().plugins[this.id] || {}
            }, t.setPluginState = function(e) {
                var t, r = this.uppy.getState().plugins;
                this.uppy.setState({
                    plugins: ___extends_92({}, r, (t = {}, t[this.id] = ___extends_92({}, r[this.id], {}, e), t))
                })
            }, t.setOptions = function(e) {
                this.opts = ___extends_92({}, this.opts, {}, e), this.setPluginState()
            }, t.update = function(e) {
                void 0 !== this.el && this._updateUI && this._updateUI(e)
            }, t.afterUpdate = function() {}, t.onMount = function() {}, t.mount = function(t, r) {
                var n, o, i, s, a = this,
                    l = r.id,
                    u = _$findDOMElement_204(t);
                if (u) return this.isTargetDOMEl = !0, this.rerender = function(e) {
                    a.uppy.getPlugin(a.id) && (a.el = _$preact_53.render(a.render(e), u, a.el), a.afterUpdate())
                }, this._updateUI = (n = this.rerender, o = null, i = null, function() {
                    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                    return i = t, o || (o = Promise.resolve().then(function() {
                        return o = null, n.apply(void 0, i)
                    })), o
                }), this.uppy.log("Installing " + l + " to a DOM element '" + t + "'"), this.opts.replaceTargetContent && (u.innerHTML = ""), this.el = _$preact_53.render(this.render(this.uppy.getState()), u), this.onMount(), this.el;
                if ("object" == typeof t && t instanceof e) s = t;
                else if ("function" == typeof t) {
                    var c = t;
                    this.uppy.iteratePlugins(function(e) {
                        if (e instanceof c) return s = e, !1
                    })
                }
                if (s) return this.uppy.log("Installing " + l + " to " + s.id), this.parent = s, this.el = s.addTarget(r), this.onMount(), this.el;
                throw this.uppy.log("Not installing " + l), new Error("Invalid target option given to " + l + ". Please make sure that the element\n      exists on the page, or that the plugin you are targeting has been installed. Check that the <script> tag initializing Uppy\n      comes at the bottom of the page, before the closing </body> tag (see https://github.com/transloadit/uppy/issues/1042).")
            }, t.render = function(e) {
                throw new Error("Extend the render method to add your plugin to a DOM element")
            }, t.addTarget = function(e) {
                throw new Error("Extend the addTarget method to add your plugin to another plugin's target")
            }, t.unmount = function() {
                this.isTargetDOMEl && this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el)
            }, t.install = function() {}, t.uninstall = function() {
                this.unmount()
            }, e
        }(),
        _$package_96 = {
            version: "1.6.0"
        },
        _$lib_93 = {};

    function ___extends_93() {
        return (___extends_93 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function _defineProperties(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function _wrapNativeSuper(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return (_wrapNativeSuper = function(e) {
            if (null === e || (r = e, -1 === Function.toString.call(r).indexOf("[native code]"))) return e;
            var r;
            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, n)
            }

            function n() {
                return _construct(e, arguments, _getPrototypeOf(this).constructor)
            }
            return n.prototype = Object.create(e.prototype, {
                constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), _setPrototypeOf(n, e)
        })(e)
    }

    function _construct(e, t, r) {
        return (_construct = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
            } catch (e) {
                return !1
            }
        }() ? Reflect.construct : function(e, t, r) {
            var n = [null];
            n.push.apply(n, t);
            var o = new(Function.bind.apply(e, n));
            return r && _setPrototypeOf(o, r.prototype), o
        }).apply(null, arguments)
    }

    function _setPrototypeOf(e, t) {
        return (_setPrototypeOf = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function _getPrototypeOf(e) {
        return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }
    var nullLogger = _$loggers_94.nullLogger,
        __debugLogger_93 = _$loggers_94.debugLogger,
        RestrictionError = function(e) {
            var t, r;

            function n() {
                for (var t, r = arguments.length, n = new Array(r), o = 0; o < r; o++) n[o] = arguments[o];
                return (t = e.call.apply(e, [this].concat(n)) || this).isRestriction = !0, t
            }
            return r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r, n
        }(_wrapNativeSuper(Error)),
        Uppy = function() {
            function e(e) {
                var t = this;
                this.defaultLocale = {
                    strings: {
                        youCanOnlyUploadX: {
                            '0': 'Sadece %{smart_count} dosya yükleyebilirsiniz',
                            '1': 'Sadece %{smart_count} dosya yükleyebilirsiniz',
                            '2': 'Sadece %{smart_count} dosya yükleyebilirsiniz'
                        },
                        youHaveToAtLeastSelectX: {
                             '0': 'En az %{smart_count} dosya seçmelisin',
                             '1': 'En az %{smart_count} dosya seçmelisin',
                             '2': 'En az %{smart_count} dosya seçmelisin'
                        },
                        exceedsSize: 'Bu dosya izin verilen maksimum boyutu aşıyor',
                        youCanOnlyUploadFileTypes: 'Sadece %{types} yükleyebilirsiniz',
                        companionError: 'Bağlantı başarısız',
                        companionAuthError: "Authorization required",
                        companionUnauthorizeHint: "To unauthorize to your %{provider} account, please go to %{url}",
                        failedToUpload: '%{file} dosyası yüklenemedi',
                        noInternetConnection: 'İnternet bağlantınız yok',
                        connectedToInternet: 'İnternete bağlanıldı',
                        noFilesFound: 'Dosya veya klasör bulunamadı',
                        selectX: {
                        '0': '%{smart_count} seç',
                        '1': '%{smart_count} seç',
                        '2': '%{smart_count} seç'
                        },
                        selectAllFilesFromFolderNamed: 'Klasördeki tüm dosyaları seç %{name}',
                        unselectAllFilesFromFolderNamed: 'Klasördeki tüm dosyaların seçimini kaldır %{name}',
                        selectFileNamed: 'Dosya Seç %{name}',
                        unselectFileNamed: 'Dosya seçimini kaldır %{name}',
                        openFolderNamed: 'Açık dosya %{name}',
                        cancel: "Vazgeç",
                        logOut: "Çıkış",
                        filter: "Filtre",
                        resetFilter: "Sıfırla",
                        loading: "Yükleniyor...",
                        authenticateWith: '%{pluginName} ile bağlan',
                        authenticateWithTitle: 'Lütfen dosyaları seçmek için %{pluginName} ile bağlanın',
                        emptyFolderAdded: 'Klasör boş',                        
                        folderAdded: {
                           '0': '%{folder} klasöründen %{smart_count} dosya eklendi',
                           '1': '%{folder} klasöründen %{smart_count} dosya eklendi',
                           '2': '%{folder} klasöründen %{smart_count} dosya eklendi'
                        }
                    }
                };
                var r = {
                    id: "uppy",
                    autoProceed: !1,
                    allowMultipleUploads: !0,
                    debug: !1,
                    restrictions: {
                        maxFileSize: null,
                        maxNumberOfFiles: null,
                        minNumberOfFiles: null,
                        allowedFileTypes: null
                    },
                    meta: {},
                    onBeforeFileAdded: function(e, t) {
                        return e
                    },
                    onBeforeUpload: function(e) {
                        return e
                    },
                    store: _$lib_163(),
                    logger: nullLogger
                };
                if (this.opts = ___extends_93({}, r, {}, e, {
                        restrictions: ___extends_93({}, r.restrictions, {}, e && e.restrictions)
                    }), e && e.logger && e.debug ? this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning") : e && e.debug && (this.opts.logger = __debugLogger_93), this.log("Using Core v" + this.constructor.VERSION), this.opts.restrictions.allowedFileTypes && null !== this.opts.restrictions.allowedFileTypes && !Array.isArray(this.opts.restrictions.allowedFileTypes)) throw new TypeError("`restrictions.allowedFileTypes` must be an array");
                this.i18nInit(), this.plugins = {}, this.getState = this.getState.bind(this), this.getPlugin = this.getPlugin.bind(this), this.setFileMeta = this.setFileMeta.bind(this), this.setFileState = this.setFileState.bind(this), this.log = this.log.bind(this), this.info = this.info.bind(this), this.hideInfo = this.hideInfo.bind(this), this.addFile = this.addFile.bind(this), this.removeFile = this.removeFile.bind(this), this.pauseResume = this.pauseResume.bind(this), this._calculateProgress = _$lodashThrottle_46(this._calculateProgress.bind(this), 500, {
                    leading: !0,
                    trailing: !0
                }), this.updateOnlineStatus = this.updateOnlineStatus.bind(this), this.resetProgress = this.resetProgress.bind(this), this.pauseAll = this.pauseAll.bind(this), this.resumeAll = this.resumeAll.bind(this), this.retryAll = this.retryAll.bind(this), this.cancelAll = this.cancelAll.bind(this), this.retryUpload = this.retryUpload.bind(this), this.upload = this.upload.bind(this), this.emitter = _$namespaceEmitter_49(), this.on = this.on.bind(this), this.off = this.off.bind(this), this.once = this.emitter.once.bind(this.emitter), this.emit = this.emitter.emit.bind(this.emitter), this.preProcessors = [], this.uploaders = [], this.postProcessors = [], this.store = this.opts.store, this.setState({
                    plugins: {},
                    files: {},
                    currentUploads: {},
                    allowNewUpload: !0,
                    capabilities: {
                        uploadProgress: _$supportsUploadProgress_95(),
                        individualCancellation: !0,
                        resumableUploads: !1
                    },
                    totalProgress: 0,
                    meta: ___extends_93({}, this.opts.meta),
                    info: {
                        isHidden: !0,
                        type: "info",
                        message: ""
                    }
                }), this._storeUnsubscribe = this.store.subscribe(function(e, r, n) {
                    t.emit("state-update", e, r, n), t.updateAll(r)
                }), this.opts.debug && "undefined" != typeof window && (window[this.opts.id] = this), this._addListeners()
            }
            var t, r, n = e.prototype;
            return n.on = function(e, t) {
                return this.emitter.on(e, t), this
            }, n.off = function(e, t) {
                return this.emitter.off(e, t), this
            }, n.updateAll = function(e) {
                this.iteratePlugins(function(t) {
                    t.update(e)
                })
            }, n.setState = function(e) {
                this.store.setState(e)
            }, n.getState = function() {
                return this.store.getState()
            }, n.setFileState = function(e, t) {
                var r;
                if (!this.getState().files[e]) throw new Error("Can\u2019t set state for " + e + " (the file could have been removed)");
                this.setState({
                    files: ___extends_93({}, this.getState().files, (r = {}, r[e] = ___extends_93({}, this.getState().files[e], t), r))
                })
            }, n.i18nInit = function() {
                this.translator = new _$Translator_199([this.defaultLocale, this.opts.locale]), this.locale = this.translator.locale, this.i18n = this.translator.translate.bind(this.translator), this.i18nArray = this.translator.translateArray.bind(this.translator)
            }, n.setOptions = function(e) {
                this.opts = ___extends_93({}, this.opts, {}, e, {
                    restrictions: ___extends_93({}, this.opts.restrictions, {}, e && e.restrictions)
                }), e.meta && this.setMeta(e.meta), this.i18nInit(), e.locale && this.iteratePlugins(function(e) {
                    e.setOptions()
                }), this.setState()
            }, n.resetProgress = function() {
                var e = {
                        percentage: 0,
                        bytesUploaded: 0,
                        uploadComplete: !1,
                        uploadStarted: null
                    },
                    t = ___extends_93({}, this.getState().files),
                    r = {};
                Object.keys(t).forEach(function(n) {
                    var o = ___extends_93({}, t[n]);
                    o.progress = ___extends_93({}, o.progress, e), r[n] = o
                }), this.setState({
                    files: r,
                    totalProgress: 0
                }), this.emit("reset-progress")
            }, n.addPreProcessor = function(e) {
                this.preProcessors.push(e)
            }, n.removePreProcessor = function(e) {
                var t = this.preProcessors.indexOf(e); - 1 !== t && this.preProcessors.splice(t, 1)
            }, n.addPostProcessor = function(e) {
                this.postProcessors.push(e)
            }, n.removePostProcessor = function(e) {
                var t = this.postProcessors.indexOf(e); - 1 !== t && this.postProcessors.splice(t, 1)
            }, n.addUploader = function(e) {
                this.uploaders.push(e)
            }, n.removeUploader = function(e) {
                var t = this.uploaders.indexOf(e); - 1 !== t && this.uploaders.splice(t, 1)
            }, n.setMeta = function(e) {
                var t = ___extends_93({}, this.getState().meta, e),
                    r = ___extends_93({}, this.getState().files);
                Object.keys(r).forEach(function(t) {
                    r[t] = ___extends_93({}, r[t], {
                        meta: ___extends_93({}, r[t].meta, e)
                    })
                }), this.log("Adding metadata:"), this.log(e), this.setState({
                    meta: t,
                    files: r
                })
            }, n.setFileMeta = function(e, t) {
                var r = ___extends_93({}, this.getState().files);
                if (r[e]) {
                    var n = ___extends_93({}, r[e].meta, t);
                    r[e] = ___extends_93({}, r[e], {
                        meta: n
                    }), this.setState({
                        files: r
                    })
                } else this.log("Was trying to set metadata for a file that has been removed: ", e)
            }, n.getFile = function(e) {
                return this.getState().files[e]
            }, n.getFiles = function() {
                var e = this.getState().files;
                return Object.keys(e).map(function(t) {
                    return e[t]
                })
            }, n._checkMinNumberOfFiles = function(e) {
                var t = this.opts.restrictions.minNumberOfFiles;
                if (Object.keys(e).length < t) throw new RestrictionError("" + this.i18n("youHaveToAtLeastSelectX", {
                    smart_count: t
                }))
            }, n._checkRestrictions = function(e) {
                var t = this.opts.restrictions,
                    r = t.maxFileSize,
                    n = t.maxNumberOfFiles,
                    o = t.allowedFileTypes;
                if (n && Object.keys(this.getState().files).length + 1 > n) throw new RestrictionError("" + this.i18n("youCanOnlyUploadX", {
                    smart_count: n
                }));
                if (o && !o.some(function(t) {
                        return t.indexOf("/") > -1 ? !!e.type && _$mimeMatch_48(e.type, t) : "." === t[0] && e.extension.toLowerCase() === t.substr(1).toLowerCase()
                    })) {
                    var i = o.join(", ");
                    throw new RestrictionError(this.i18n("youCanOnlyUploadFileTypes", {
                        types: i
                    }))
                }
                if (r && null != e.data.size && e.data.size > r) throw new RestrictionError(this.i18n("exceedsSize") + " " + _$prettyBytes_225(r))
            }, n._showOrLogErrorAndThrow = function(e, t) {
                var r = void 0 === t ? {} : t,
                    n = r.showInformer,
                    o = void 0 === n || n,
                    i = r.file,
                    s = void 0 === i ? null : i,
                    a = "object" == typeof e ? e.message : e,
                    l = "object" == typeof e && e.details ? e.details : "";
                throw e.isRestriction ? (this.log(a + " " + l), this.emit("restriction-failed", s, e)) : this.log(a + " " + l, "error"), o && this.info({
                    message: a,
                    details: l
                }, "error", 5e3), "object" == typeof e ? e : new Error(e)
            }, n.addFile = function(e) {
                var t, r = this,
                    n = this.getState(),
                    o = n.files;
                !1 === n.allowNewUpload && this._showOrLogErrorAndThrow(new RestrictionError("Cannot add new files: already uploading."), {
                    file: e
                });
                var i = _$getFileType_213(e);
                e.type = i;
                var s, a = this.opts.onBeforeFileAdded(e, o);
                !1 === a && this._showOrLogErrorAndThrow(new RestrictionError("Cannot add the file because onBeforeFileAdded returned false."), {
                    showInformer: !1,
                    file: e
                }), "object" == typeof a && a && (e = a), s = e.name ? e.name : "image" === i.split("/")[0] ? i.split("/")[0] + "." + i.split("/")[1] : "noname";
                var l = _$getFileNameAndExtension_212(s).extension,
                    u = e.isRemote || !1,
                    c = _$generateFileID_205(e);
                o[c] && this._showOrLogErrorAndThrow(new RestrictionError("Eklediğiniz dosya zaten var '" + s + "'"), {
                    file: e
                });
                var p = e.meta || {};
                p.name = s, p.type = i;
                var d = isFinite(e.data.size) ? e.data.size : null,
                    _ = {
                        source: e.source || "",
                        id: c,
                        name: s,
                        extension: l || "",
                        meta: ___extends_93({}, this.getState().meta, p),
                        type: i,
                        data: e.data,
                        progress: {
                            percentage: 0,
                            bytesUploaded: 0,
                            bytesTotal: d,
                            uploadComplete: !1,
                            uploadStarted: null
                        },
                        size: d,
                        isRemote: u,
                        remote: e.remote || "",
                        preview: e.preview
                    };
                try {
                    this._checkRestrictions(_)
                } catch (err) {
                    this._showOrLogErrorAndThrow(err, {
                        file: _
                    })
                }
                return this.setState({
                    files: ___extends_93({}, o, (t = {}, t[c] = _, t))
                }), this.emit("file-added", _), this.log("Added file: " + s + ", " + c + ", mime type: " + i), this.opts.autoProceed && !this.scheduledAutoProceed && (this.scheduledAutoProceed = setTimeout(function() {
                    r.scheduledAutoProceed = null, r.upload().catch(function(e) {
                        e.isRestriction || r.log(e.stack || e.message || e)
                    })
                }, 4)), c
            }, n.removeFile = function(e) {
                var t = this,
                    r = this.getState(),
                    n = r.files,
                    o = r.currentUploads,
                    i = ___extends_93({}, n),
                    s = i[e];
                delete i[e];
                var a = ___extends_93({}, o),
                    l = [];
                Object.keys(a).forEach(function(t) {
                    var r = o[t].fileIDs.filter(function(t) {
                        return t !== e
                    });
                    0 !== r.length ? a[t] = ___extends_93({}, o[t], {
                        fileIDs: r
                    }) : l.push(t)
                }), this.setState(___extends_93({
                    currentUploads: a,
                    files: i
                }, 0 === Object.keys(i).length && {
                    allowNewUpload: !0
                })), l.forEach(function(e) {
                    t._removeUpload(e)
                }), this._calculateTotalProgress(), this.emit("file-removed", s), this.log("File removed: " + s.id)
            }, n.pauseResume = function(e) {
                if (this.getState().capabilities.resumableUploads && !this.getFile(e).uploadComplete) {
                    var t = !this.getFile(e).isPaused;
                    return this.setFileState(e, {
                        isPaused: t
                    }), this.emit("upload-pause", e, t), t
                }
            }, n.pauseAll = function() {
                var e = ___extends_93({}, this.getState().files);
                Object.keys(e).filter(function(t) {
                    return !e[t].progress.uploadComplete && e[t].progress.uploadStarted
                }).forEach(function(t) {
                    var r = ___extends_93({}, e[t], {
                        isPaused: !0
                    });
                    e[t] = r
                }), this.setState({
                    files: e
                }), this.emit("pause-all")
            }, n.resumeAll = function() {
                var e = ___extends_93({}, this.getState().files);
                Object.keys(e).filter(function(t) {
                    return !e[t].progress.uploadComplete && e[t].progress.uploadStarted
                }).forEach(function(t) {
                    var r = ___extends_93({}, e[t], {
                        isPaused: !1,
                        error: null
                    });
                    e[t] = r
                }), this.setState({
                    files: e
                }), this.emit("resume-all")
            }, n.retryAll = function() {
                var e = ___extends_93({}, this.getState().files),
                    t = Object.keys(e).filter(function(t) {
                        return e[t].error
                    });
                t.forEach(function(t) {
                    var r = ___extends_93({}, e[t], {
                        isPaused: !1,
                        error: null
                    });
                    e[t] = r
                }), this.setState({
                    files: e,
                    error: null
                }), this.emit("retry-all", t);
                var r = this._createUpload(t);
                return this._runUpload(r)
            }, n.cancelAll = function() {
                var e = this;
                this.emit("cancel-all"), Object.keys(this.getState().files).forEach(function(t) {
                    e.removeFile(t)
                }), this.setState({
                    totalProgress: 0,
                    error: null
                })
            }, n.retryUpload = function(e) {
                this.setFileState(e, {
                    error: null,
                    isPaused: !1
                }), this.emit("upload-retry", e);
                var t = this._createUpload([e]);
                return this._runUpload(t)
            }, n.reset = function() {
                this.cancelAll()
            }, n._calculateProgress = function(e, t) {
                if (this.getFile(e.id)) {
                    var r = isFinite(t.bytesTotal) && t.bytesTotal > 0;
                    this.setFileState(e.id, {
                        progress: ___extends_93({}, this.getFile(e.id).progress, {
                            bytesUploaded: t.bytesUploaded,
                            bytesTotal: t.bytesTotal,
                            percentage: r ? Math.round(t.bytesUploaded / t.bytesTotal * 100) : 0
                        })
                    }), this._calculateTotalProgress()
                } else this.log("Not setting progress for a file that has been removed: " + e.id)
            }, n._calculateTotalProgress = function() {
                var e = this.getFiles().filter(function(e) {
                    return e.progress.uploadStarted
                });
                if (0 === e.length) return this.emit("progress", 0), void this.setState({
                    totalProgress: 0
                });
                var t = e.filter(function(e) {
                        return null != e.progress.bytesTotal
                    }),
                    r = e.filter(function(e) {
                        return null == e.progress.bytesTotal
                    });
                if (0 !== t.length) {
                    var n = t.reduce(function(e, t) {
                            return e + t.progress.bytesTotal
                        }, 0),
                        o = n / t.length;
                    n += o * r.length;
                    var i = 0;
                    t.forEach(function(e) {
                        i += e.progress.bytesUploaded
                    }), r.forEach(function(e) {
                        i += o * (e.progress.percentage || 0) / 100
                    });
                    var s = 0 === n ? 0 : Math.round(i / n * 100);
                    s > 100 && (s = 100), this.setState({
                        totalProgress: s
                    }), this.emit("progress", s)
                } else {
                    var a = 100 * e.length,
                        l = r.reduce(function(e, t) {
                            return e + t.progress.percentage
                        }, 0),
                        u = Math.round(l / a * 100);
                    this.setState({
                        totalProgress: u
                    })
                }
            }, n._addListeners = function() {
                var e = this;
                this.on("error", function(t) {
                    e.setState({
                        error: t.message || "Unknown error"
                    })
                }), this.on("upload-error", function(t, r, n) {
                    e.setFileState(t.id, {
                        error: r.message || "Unknown error",
                        response: n
                    }), e.setState({
                        error: r.message
                    });
                    var o = e.i18n("failedToUpload", {
                        file: t.name
                    });
                    "object" == typeof r && r.message && (o = {
                        message: o,
                        details: r.message
                    }), e.info(o, "error", 5e3)
                }), this.on("upload", function() {
                    e.setState({
                        error: null
                    })
                }), this.on("upload-started", function(t, r) {
                    e.getFile(t.id) ? e.setFileState(t.id, {
                        progress: {
                            uploadStarted: Date.now(),
                            uploadComplete: !1,
                            percentage: 0,
                            bytesUploaded: 0,
                            bytesTotal: t.size
                        }
                    }) : e.log("Not setting progress for a file that has been removed: " + t.id)
                }), this.on("upload-progress", this._calculateProgress), this.on("upload-success", function(t, r) {
                    if (e.getFile(t.id)) {
                        var n = e.getFile(t.id).progress;
                        e.setFileState(t.id, {
                            progress: ___extends_93({}, n, {
                                uploadComplete: !0,
                                percentage: 100,
                                bytesUploaded: n.bytesTotal
                            }),
                            response: r,
                            uploadURL: r.uploadURL,
                            isPaused: !1
                        }), e._calculateTotalProgress()
                    } else e.log("Not setting progress for a file that has been removed: " + t.id)
                }), this.on("preprocess-progress", function(t, r) {
                    e.getFile(t.id) ? e.setFileState(t.id, {
                        progress: ___extends_93({}, e.getFile(t.id).progress, {
                            preprocess: r
                        })
                    }) : e.log("Not setting progress for a file that has been removed: " + t.id)
                }), this.on("preprocess-complete", function(t) {
                    if (e.getFile(t.id)) {
                        var r = ___extends_93({}, e.getState().files);
                        r[t.id] = ___extends_93({}, r[t.id], {
                            progress: ___extends_93({}, r[t.id].progress)
                        }), delete r[t.id].progress.preprocess, e.setState({
                            files: r
                        })
                    } else e.log("Not setting progress for a file that has been removed: " + t.id)
                }), this.on("postprocess-progress", function(t, r) {
                    e.getFile(t.id) ? e.setFileState(t.id, {
                        progress: ___extends_93({}, e.getState().files[t.id].progress, {
                            postprocess: r
                        })
                    }) : e.log("Not setting progress for a file that has been removed: " + t.id)
                }), this.on("postprocess-complete", function(t) {
                    if (e.getFile(t.id)) {
                        var r = ___extends_93({}, e.getState().files);
                        r[t.id] = ___extends_93({}, r[t.id], {
                            progress: ___extends_93({}, r[t.id].progress)
                        }), delete r[t.id].progress.postprocess, e.setState({
                            files: r
                        })
                    } else e.log("Not setting progress for a file that has been removed: " + t.id)
                }), this.on("restored", function() {
                    e._calculateTotalProgress()
                }), "undefined" != typeof window && window.addEventListener && (window.addEventListener("online", function() {
                    return e.updateOnlineStatus()
                }), window.addEventListener("offline", function() {
                    return e.updateOnlineStatus()
                }), setTimeout(function() {
                    return e.updateOnlineStatus()
                }, 3e3))
            }, n.updateOnlineStatus = function() {
                void 0 === window.navigator.onLine || window.navigator.onLine ? (this.emit("is-online"), this.wasOffline && (this.emit("back-online"), this.info(this.i18n("connectedToInternet"), "success", 3e3), this.wasOffline = !1)) : (this.emit("is-offline"), this.info(this.i18n("noInternetConnection"), "error", 0), this.wasOffline = !0)
            }, n.getID = function() {
                return this.opts.id
            }, n.use = function(e, t) {
                if ("function" != typeof e) throw new TypeError("Expected a plugin class, but got " + (null === e ? "null" : typeof e) + ". Please verify that the plugin was imported and spelled correctly.");
                var r = new e(this, t),
                    n = r.id;
                if (this.plugins[r.type] = this.plugins[r.type] || [], !n) throw new Error("Your plugin must have an id");
                if (!r.type) throw new Error("Your plugin must have a type");
                var o = this.getPlugin(n);
                if (o) {
                    var i = "Already found a plugin named '" + o.id + "'. Tried to use: '" + n + "'.\nUppy plugins must have unique `id` options. See https://uppy.io/docs/plugins/#id.";
                    throw new Error(i)
                }
                return e.VERSION && this.log("Using " + n + " v" + e.VERSION), this.plugins[r.type].push(r), r.install(), this
            }, n.getPlugin = function(e) {
                var t = null;
                return this.iteratePlugins(function(r) {
                    if (r.id === e) return t = r, !1
                }), t
            }, n.iteratePlugins = function(e) {
                var t = this;
                Object.keys(this.plugins).forEach(function(r) {
                    t.plugins[r].forEach(e)
                })
            }, n.removePlugin = function(e) {
                this.log("Removing plugin " + e.id), this.emit("plugin-remove", e), e.uninstall && e.uninstall();
                var t = this.plugins[e.type].slice(),
                    r = t.indexOf(e); - 1 !== r && (t.splice(r, 1), this.plugins[e.type] = t);
                var n = this.getState();
                delete n.plugins[e.id], this.setState(n)
            }, n.close = function() {
                var e = this;
                this.log("Closing Uppy instance " + this.opts.id + ": removing all files and uninstalling plugins"), this.reset(), this._storeUnsubscribe(), this.iteratePlugins(function(t) {
                    e.removePlugin(t)
                })
            }, n.info = function(e, t, r) {
                void 0 === t && (t = "info"), void 0 === r && (r = 3e3);
                var n = "object" == typeof e;
                this.setState({
                    info: {
                        isHidden: !1,
                        type: t,
                        message: n ? e.message : e,
                        details: n ? e.details : null
                    }
                }), this.emit("info-visible"), clearTimeout(this.infoTimeoutID), this.infoTimeoutID = 0 !== r ? setTimeout(this.hideInfo, r) : void 0
            }, n.hideInfo = function() {
                var e = ___extends_93({}, this.getState().info, {
                    isHidden: !0
                });
                this.setState({
                    info: e
                }), this.emit("info-hidden")
            }, n.log = function(e, t) {
                var r = this.opts.logger;
                switch (t) {
                    case "error":
                        r.error(e);
                        break;
                    case "warning":
                        r.warn(e);
                        break;
                    default:
                        r.debug(e)
                }
            }, n.run = function() {
                return this.log("Calling run() is no longer necessary.", "warning"), this
            }, n.restore = function(e) {
                return this.log('Core: attempting to restore upload "' + e + '"'), this.getState().currentUploads[e] ? this._runUpload(e) : (this._removeUpload(e), Promise.reject(new Error("Nonexistent upload")))
            }, n._createUpload = function(e) {
                var t, r = this.getState(),
                    n = r.allowNewUpload,
                    o = r.currentUploads;
                if (!n) throw new Error("Cannot create a new upload: already uploading.");
                var i = _$cuid_13();
                return this.emit("upload", {
                    id: i,
                    fileIDs: e
                }), this.setState({
                    allowNewUpload: !1 !== this.opts.allowMultipleUploads,
                    currentUploads: ___extends_93({}, o, (t = {}, t[i] = {
                        fileIDs: e,
                        step: 0,
                        result: {}
                    }, t))
                }), i
            }, n._getUpload = function(e) {
                return this.getState().currentUploads[e]
            }, n.addResultData = function(e, t) {
                var r;
                if (this._getUpload(e)) {
                    var n = this.getState().currentUploads,
                        o = ___extends_93({}, n[e], {
                            result: ___extends_93({}, n[e].result, t)
                        });
                    this.setState({
                        currentUploads: ___extends_93({}, n, (r = {}, r[e] = o, r))
                    })
                } else this.log("Not setting result for an upload that has been removed: " + e)
            }, n._removeUpload = function(e) {
                var t = ___extends_93({}, this.getState().currentUploads);
                delete t[e], this.setState({
                    currentUploads: t
                })
            }, n._runUpload = function(e) {
                var t = this,
                    r = this.getState().currentUploads[e].step,
                    n = [].concat(this.preProcessors, this.uploaders, this.postProcessors),
                    o = Promise.resolve();
                return n.forEach(function(n, i) {
                    i < r || (o = o.then(function() {
                        var r, o = t.getState().currentUploads,
                            s = o[e];
                        if (s) {
                            var a = ___extends_93({}, s, {
                                step: i
                            });
                            return t.setState({
                                currentUploads: ___extends_93({}, o, (r = {}, r[e] = a, r))
                            }), n(a.fileIDs, e)
                        }
                    }).then(function(e) {
                        return null
                    }))
                }), o.catch(function(r) {
                    t.emit("error", r, e), t._removeUpload(e)
                }), o.then(function() {
                    var r = t.getState().currentUploads[e];
                    if (r) {
                        var n = r.fileIDs.map(function(e) {
                                return t.getFile(e)
                            }),
                            o = n.filter(function(e) {
                                return !e.error
                            }),
                            i = n.filter(function(e) {
                                return e.error
                            });
                        t.addResultData(e, {
                            successful: o,
                            failed: i,
                            uploadID: e
                        })
                    }
                }).then(function() {
                    var r = t.getState().currentUploads;
                    if (r[e]) {
                        var n = r[e].result;
                        return t.emit("complete", n), t._removeUpload(e), n
                    }
                }).then(function(r) {
                    return null == r && t.log("Not setting result for an upload that has been removed: " + e), r
                })
            }, n.upload = function() {
                var e = this;
                this.plugins.uploader || this.log("No uploader type plugins are used", "warning");
                var t = this.getState().files,
                    r = this.opts.onBeforeUpload(t);
                return !1 === r ? Promise.reject(new Error("Not starting the upload because onBeforeUpload returned false")) : (r && "object" == typeof r && (t = r), Promise.resolve().then(function() {
                    return e._checkMinNumberOfFiles(t)
                }).then(function() {
                    var r = e.getState().currentUploads,
                        n = Object.keys(r).reduce(function(e, t) {
                            return e.concat(r[t].fileIDs)
                        }, []),
                        o = [];
                    Object.keys(t).forEach(function(t) {
                        var r = e.getFile(t);
                        r.progress.uploadStarted || -1 !== n.indexOf(t) || o.push(r.id)
                    });
                    var i = e._createUpload(o);
                    return e._runUpload(i)
                }).catch(function(t) {
                    e._showOrLogErrorAndThrow(t)
                }))
            }, t = e, (r = [{
                key: "state",
                get: function() {
                    return this.getState()
                }
            }]) && _defineProperties(t.prototype, r), e
        }();

    function ___wrapNativeSuper_85(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return (___wrapNativeSuper_85 = function(e) {
            if (null === e || (r = e, -1 === Function.toString.call(r).indexOf("[native code]"))) return e;
            var r;
            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, n)
            }

            function n() {
                return ___construct_85(e, arguments, ___getPrototypeOf_85(this).constructor)
            }
            return n.prototype = Object.create(e.prototype, {
                constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), ___setPrototypeOf_85(n, e)
        })(e)
    }

    function ___construct_85(e, t, r) {
        return (___construct_85 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
            } catch (e) {
                return !1
            }
        }() ? Reflect.construct : function(e, t, r) {
            var n = [null];
            n.push.apply(n, t);
            var o = new(Function.bind.apply(e, n));
            return r && ___setPrototypeOf_85(o, r.prototype), o
        }).apply(null, arguments)
    }

    function ___setPrototypeOf_85(e, t) {
        return (___setPrototypeOf_85 = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function ___getPrototypeOf_85(e) {
        return (___getPrototypeOf_85 = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }
    Uppy.VERSION = _$package_96.version, _$lib_93 = function(e) {
        return new Uppy(e)
    }, _$lib_93.Uppy = Uppy, _$lib_93.Plugin = _$Plugin_92, _$lib_93.debugLogger = __debugLogger_93;
    var AuthError = function(e) {
            var t, r;

            function n() {
                var t;
                return (t = e.call(this, "Authorization required") || this).name = "AuthError", t.isAuthError = !0, t
            }
            return r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r, n
        }(___wrapNativeSuper_85(Error)),
        _$AuthError_85 = AuthError,
        _$package_91 = {
            version: "1.4.1"
        },
        _class, _temp;

    function ___extends_87() {
        return (___extends_87 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ___defineProperties_87(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    var _$RequestClient_87 = (_temp = _class = function() {
            function e(e, t) {
                this.uppy = e, this.opts = t, this.onReceiveResponse = this.onReceiveResponse.bind(this), this.allowedHeaders = ["accept", "content-type", "uppy-auth-token"], this.preflightDone = !1
            }
            var t, r, n = e.prototype;
            return n.headers = function() {
                var e = this.opts.companionHeaders || this.opts.serverHeaders || {};
                return Promise.resolve(___extends_87({}, this.defaultHeaders, {}, e))
            }, n._getPostResponseFunc = function(e) {
                var t = this;
                return function(r) {
                    return e ? r : t.onReceiveResponse(r)
                }
            }, n.onReceiveResponse = function(e) {
                var t, r = this.uppy.getState().companion || {},
                    n = this.opts.companionUrl,
                    o = e.headers;
                return o.has("i-am") && o.get("i-am") !== r[n] && this.uppy.setState({
                    companion: ___extends_87({}, r, (t = {}, t[n] = o.get("i-am"), t))
                }), e
            }, n._getUrl = function(e) {
                return /^(https?:|)\/\//.test(e) ? e : this.hostname + "/" + e
            }, n._json = function(e) {
                if (401 === e.status) throw new _$AuthError_85;
                if (e.status < 200 || e.status > 300) {
                    var t = "Failed request with status: " + e.status + ". " + e.statusText;
                    return e.json().then(function(e) {
                        throw t = e.message ? t + " message: " + e.message : t, t = e.requestId ? t + " request-Id: " + e.requestId : t, new Error(t)
                    }).catch(function() {
                        throw new Error(t)
                    })
                }
                return e.json()
            }, n.preflight = function(e) {
                var t = this;
                return new Promise(function(r, n) {
                    if (t.preflightDone) return r(t.allowedHeaders.slice());
                    fetch(t._getUrl(e), {
                        method: "OPTIONS"
                    }).then(function(e) {
                        e.headers.has("access-control-allow-headers") && (t.allowedHeaders = e.headers.get("access-control-allow-headers").split(",").map(function(e) {
                            return e.trim().toLowerCase()
                        })), t.preflightDone = !0, r(t.allowedHeaders.slice())
                    }).catch(function(e) {
                        t.uppy.log("[CompanionClient] unable to make preflight request " + e, "warning"), t.preflightDone = !0, r(t.allowedHeaders.slice())
                    })
                })
            }, n.preflightAndHeaders = function(e) {
                var t = this;
                return Promise.all([this.preflight(e), this.headers()]).then(function(e) {
                    var r = e[0],
                        n = e[1];
                    return Object.keys(n).forEach(function(e) {
                        -1 === r.indexOf(e.toLowerCase()) && (t.uppy.log("[CompanionClient] excluding unallowed header " + e), delete n[e])
                    }), n
                })
            }, n.get = function(e, t) {
                var r = this;
                return new Promise(function(n, o) {
                    r.preflightAndHeaders(e).then(function(i) {
                        fetch(r._getUrl(e), {
                            method: "get",
                            headers: i,
                            credentials: "same-origin"
                        }).then(r._getPostResponseFunc(t)).then(function(e) {
                            return r._json(e).then(n)
                        }).catch(function(t) {
                            t = t.isAuthError ? t : new Error("Could not get " + r._getUrl(e) + ". " + t), o(t)
                        })
                    }).catch(o)
                })
            }, n.post = function(e, t, r) {
                var n = this;
                return new Promise(function(o, i) {
                    n.preflightAndHeaders(e).then(function(s) {
                        fetch(n._getUrl(e), {
                            method: "post",
                            headers: s,
                            credentials: "same-origin",
                            body: JSON.stringify(t)
                        }).then(n._getPostResponseFunc(r)).then(function(e) {
                            return n._json(e).then(o)
                        }).catch(function(t) {
                            t = t.isAuthError ? t : new Error("Could not post " + n._getUrl(e) + ". " + t), i(t)
                        })
                    }).catch(i)
                })
            }, n.delete = function(e, t, r) {
                var n = this;
                return new Promise(function(o, i) {
                    n.preflightAndHeaders(e).then(function(s) {
                        fetch(n.hostname + "/" + e, {
                            method: "delete",
                            headers: s,
                            credentials: "same-origin",
                            body: t ? JSON.stringify(t) : null
                        }).then(n._getPostResponseFunc(r)).then(function(e) {
                            return n._json(e).then(o)
                        }).catch(function(t) {
                            t = t.isAuthError ? t : new Error("Could not delete " + n._getUrl(e) + ". " + t), i(t)
                        })
                    }).catch(i)
                })
            }, t = e, (r = [{
                key: "hostname",
                get: function() {
                    var e = this.uppy.getState().companion,
                        t = this.opts.companionUrl;
                    return (e && e[t] ? e[t] : t).replace(/\/$/, "")
                }
            }, {
                key: "defaultHeaders",
                get: function() {
                    return {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Uppy-Versions": "@uppy/companion-client=" + e.VERSION
                    }
                }
            }]) && ___defineProperties_87(t.prototype, r), e
        }(), _class.VERSION = _$package_91.version, _temp),
        _$tokenStorage_90 = {};

    function ___extends_86() {
        return (___extends_86 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    _$tokenStorage_90.setItem = function(e, t) {
        return new Promise(function(r) {
            localStorage.setItem(e, t), r()
        })
    }, _$tokenStorage_90.getItem = function(e) {
        return Promise.resolve(localStorage.getItem(e))
    }, _$tokenStorage_90.removeItem = function(e) {
        return new Promise(function(t) {
            localStorage.removeItem(e), t()
        })
    };
    var _getName = function(e) {
            return e.split("-").map(function(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            }).join(" ")
        },
        _$Provider_86 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).provider = r.provider, n.id = n.provider, n.authProvider = r.authProvider || n.provider, n.name = n.opts.name || _getName(n.id), n.pluginId = n.opts.pluginId, n.tokenKey = "companion-" + n.pluginId + "-auth-token", n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.headers = function() {
                var t = this;
                return new Promise(function(r, n) {
                    e.prototype.headers.call(t).then(function(e) {
                        t.getAuthToken().then(function(t) {
                            r(___extends_86({}, e, {
                                "uppy-auth-token": t
                            }))
                        })
                    }).catch(n)
                })
            }, o.onReceiveResponse = function(t) {
                t = e.prototype.onReceiveResponse.call(this, t);
                var r = this.uppy.getPlugin(this.pluginId),
                    n = r.getPluginState().authenticated ? 401 !== t.status : t.status < 400;
                return r.setPluginState({
                    authenticated: n
                }), t
            }, o.setAuthToken = function(e) {
                return this.uppy.getPlugin(this.pluginId).storage.setItem(this.tokenKey, e)
            }, o.getAuthToken = function() {
                return this.uppy.getPlugin(this.pluginId).storage.getItem(this.tokenKey)
            }, o.authUrl = function() {
                return this.hostname + "/" + this.id + "/connect"
            }, o.fileUrl = function(e) {
                return this.hostname + "/" + this.id + "/get/" + e
            }, o.list = function(e) {
                return this.get(this.id + "/list/" + (e || ""))
            }, o.logout = function() {
                var e = this;
                return new Promise(function(t, r) {
                    e.get(e.id + "/logout").then(function(n) {
                        e.uppy.getPlugin(e.pluginId).storage.removeItem(e.tokenKey).then(function() {
                            return t(n)
                        }).catch(r)
                    }).catch(r)
                })
            }, n.initPlugin = function(e, t, r) {
                if (e.type = "acquirer", e.files = [], r && (e.opts = ___extends_86({}, r, t)), t.serverUrl || t.serverPattern) throw new Error("`serverUrl` and `serverPattern` have been renamed to `companionUrl` and `companionAllowedHosts` respectively in the 0.30.5 release. Please consult the docs (for example, https://uppy.io/docs/instagram/ for the Instagram plugin) and use the updated options.`");
                if (t.companionAllowedHosts) {
                    var n = t.companionAllowedHosts;
                    if (!("string" == typeof n || Array.isArray(n) || n instanceof RegExp)) throw new TypeError(e.id + ': the option "companionAllowedHosts" must be one of string, Array, RegExp');
                    e.opts.companionAllowedHosts = n
                } else /^(?!https?:\/\/).*$/i.test(t.companionUrl) ? e.opts.companionAllowedHosts = "https://" + t.companionUrl.replace(/^\/\//, "") : e.opts.companionAllowedHosts = t.companionUrl;
                e.storage = e.opts.storage || _$tokenStorage_90
            }, n
        }(_$RequestClient_87),
        _$Socket_88 = function() {
            function e(e) {
                this.opts = e, this._queued = [], this.isOpen = !1, this.emitter = _$namespaceEmitter_49(), this._handleMessage = this._handleMessage.bind(this), this.close = this.close.bind(this), this.emit = this.emit.bind(this), this.on = this.on.bind(this), this.once = this.once.bind(this), this.send = this.send.bind(this), e && !1 === e.autoOpen || this.open()
            }
            var t = e.prototype;
            return t.open = function() {
                var e = this;
                this.socket = new WebSocket(this.opts.target), this.socket.onopen = function(t) {
                    for (e.isOpen = !0; e._queued.length > 0 && e.isOpen;) {
                        var r = e._queued[0];
                        e.send(r.action, r.payload), e._queued = e._queued.slice(1)
                    }
                }, this.socket.onclose = function(t) {
                    e.isOpen = !1
                }, this.socket.onmessage = this._handleMessage
            }, t.close = function() {
                this.socket && this.socket.close()
            }, t.send = function(e, t) {
                this.isOpen ? this.socket.send(JSON.stringify({
                    action: e,
                    payload: t
                })) : this._queued.push({
                    action: e,
                    payload: t
                })
            }, t.on = function(e, t) {
                this.emitter.on(e, t)
            }, t.emit = function(e, t) {
                this.emitter.emit(e, t)
            }, t.once = function(e, t) {
                this.emitter.once(e, t)
            }, t._handleMessage = function(e) {
                try {
                    var t = JSON.parse(e.data);
                    this.emit(t.action, t.payload)
                } catch (err) {
                    console.log(err)
                }
            }, e
        }(),
        _$lib_89 = {
            RequestClient: _$RequestClient_87,
            Provider: _$Provider_86,
            Socket: _$Socket_88
        },
        h = _$preact_53.h,
        AuthView = function(e) {
            var t, r;

            function n() {
                return e.apply(this, arguments) || this
            }
            return r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r, n.prototype.render = function() {
                var e = h("span", {
                    class: "uppy-Provider-authTitleName"
                }, this.props.pluginName, h("br", null));
                return h("div", {
                    class: "uppy-Provider-auth"
                }, h("div", {
                    class: "uppy-Provider-authIcon"
                }, this.props.pluginIcon()), h("div", {
                    class: "uppy-Provider-authTitle"
                }, this.props.i18nArray("authenticateWithTitle", {
                    pluginName: e
                })), h("button", {
                    type: "button",
                    class: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn",
                    onclick: this.props.handleAuth,
                    "data-uppy-super-focusable": !0
                }, this.props.i18nArray("authenticateWith", {
                    pluginName: this.props.pluginName
                })))
            }, n
        }(_$preact_53.Component),
        _$AuthView_144 = AuthView,
        _$classnames_9 = {
            exports: {}
        };
    ! function() {
        "use strict";
        var e = {}.hasOwnProperty;

        function t() {
            for (var r = [], n = 0; n < arguments.length; n++) {
                var o = arguments[n];
                if (o) {
                    var i = typeof o;
                    if ("string" === i || "number" === i) r.push(o);
                    else if (Array.isArray(o) && o.length) {
                        var s = t.apply(null, o);
                        s && r.push(s)
                    } else if ("object" === i)
                        for (var a in o) e.call(o, a) && o[a] && r.push(a)
                }
            }
            return r.join(" ")
        }
        _$classnames_9.exports ? (t.default = t, _$classnames_9.exports = t) : "function" == typeof define && "object" == typeof define.amd && define.amd ? define("classnames", [], function() {
            return t
        }) : window.classNames = t
    }(), _$classnames_9 = _$classnames_9.exports;
    var __h_145 = _$preact_53.h,
        Breadcrumb = function(e) {
            return __h_145("span", null, __h_145("button", {
                type: "button",
                class: "uppy-u-reset",
                onclick: e.getFolder
            }, e.title), e.isLast ? "" : " / ")
        },
        _$Breadcrumbs_145 = function(e) {
            return __h_145("div", {
                class: "uppy-Provider-breadcrumbs"
            }, __h_145("div", {
                class: "uppy-Provider-breadcrumbsIcon"
            }, e.breadcrumbsIcon), e.directories.map(function(t, r) {
                return __h_145(Breadcrumb, {
                    key: t.id,
                    getFolder: function() {
                        return e.getFolder(t.id)
                    },
                    title: 0 === r ? e.title : t.title,
                    isLast: r + 1 === e.directories.length
                })
            }))
        },
        __h_147 = _$preact_53.h,
        Component = _$preact_53.Component,
        _$Filter_147 = function(e) {
            var t, r;

            function n(t) {
                var r;
                return (r = e.call(this, t) || this).preventEnterPress = r.preventEnterPress.bind(function(e) {
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(r)), r
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.preventEnterPress = function(e) {
                13 === e.keyCode && (e.stopPropagation(), e.preventDefault())
            }, o.render = function() {
                var e = this;
                return __h_147("div", {
                    class: "uppy-ProviderBrowser-search"
                }, __h_147("input", {
                    class: "uppy-u-reset uppy-ProviderBrowser-searchInput",
                    type: "text",
                    placeholder: this.props.i18n("filter"),
                    "aria-label": this.props.i18n("filter"),
                    onkeyup: this.preventEnterPress,
                    onkeydown: this.preventEnterPress,
                    onkeypress: this.preventEnterPress,
                    oninput: function(t) {
                        return e.props.filterQuery(t)
                    },
                    value: this.props.filterInput
                }), __h_147("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "UppyIcon uppy-ProviderBrowser-searchIcon",
                    width: "12",
                    height: "12",
                    viewBox: "0 0 12 12"
                }, __h_147("path", {
                    d: "M8.638 7.99l3.172 3.172a.492.492 0 1 1-.697.697L7.91 8.656a4.977 4.977 0 0 1-2.983.983C2.206 9.639 0 7.481 0 4.819 0 2.158 2.206 0 4.927 0c2.721 0 4.927 2.158 4.927 4.82a4.74 4.74 0 0 1-1.216 3.17zm-3.71.685c2.176 0 3.94-1.726 3.94-3.856 0-2.129-1.764-3.855-3.94-3.855C2.75.964.984 2.69.984 4.819c0 2.13 1.765 3.856 3.942 3.856z"
                })), this.props.filterInput && __h_147("button", {
                    class: "uppy-u-reset uppy-ProviderBrowser-searchClose",
                    type: "button",
                    "aria-label": this.props.i18n("resetFilter"),
                    title: this.props.i18n("resetFilter"),
                    onclick: this.props.filterQuery
                }, __h_147("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "UppyIcon",
                    viewBox: "0 0 19 19"
                }, __h_147("path", {
                    d: "M17.318 17.232L9.94 9.854 9.586 9.5l-.354.354-7.378 7.378h.707l-.62-.62v.706L9.318 9.94l.354-.354-.354-.354L1.94 1.854v.707l.62-.62h-.706l7.378 7.378.354.354.354-.354 7.378-7.378h-.707l.622.62v-.706L9.854 9.232l-.354.354.354.354 7.378 7.378.708-.707-7.38-7.378v.708l7.38-7.38.353-.353-.353-.353-.622-.622-.353-.353-.354.352-7.378 7.38h.708L2.56 1.23 2.208.88l-.353.353-.622.62-.353.355.352.353 7.38 7.38v-.708l-7.38 7.38-.353.353.352.353.622.622.353.353.354-.353 7.38-7.38h-.708l7.38 7.38z"
                }))))
            }, n
        }(Component),
        __h_150 = _$preact_53.h;

    function FileIcon() {
        return __h_150("svg", {
            "aria-hidden": "true",
            focusable: "false",
            class: "UppyIcon",
            width: 11,
            height: 14.5,
            viewBox: "0 0 44 58"
        }, __h_150("path", {
            d: "M27.437.517a1 1 0 0 0-.094.03H4.25C2.037.548.217 2.368.217 4.58v48.405c0 2.212 1.82 4.03 4.03 4.03H39.03c2.21 0 4.03-1.818 4.03-4.03V15.61a1 1 0 0 0-.03-.28 1 1 0 0 0 0-.093 1 1 0 0 0-.03-.032 1 1 0 0 0 0-.03 1 1 0 0 0-.032-.063 1 1 0 0 0-.03-.063 1 1 0 0 0-.032 0 1 1 0 0 0-.03-.063 1 1 0 0 0-.032-.03 1 1 0 0 0-.03-.063 1 1 0 0 0-.063-.062l-14.593-14a1 1 0 0 0-.062-.062A1 1 0 0 0 28 .708a1 1 0 0 0-.374-.157 1 1 0 0 0-.156 0 1 1 0 0 0-.03-.03l-.003-.003zM4.25 2.547h22.218v9.97c0 2.21 1.82 4.03 4.03 4.03h10.564v36.438a2.02 2.02 0 0 1-2.032 2.032H4.25c-1.13 0-2.032-.9-2.032-2.032V4.58c0-1.13.902-2.032 2.03-2.032zm24.218 1.345l10.375 9.937.75.718H30.5c-1.13 0-2.032-.9-2.032-2.03V3.89z"
        }))
    }

    function FolderIcon() {
        return __h_150("svg", {
            "aria-hidden": "true",
            focusable: "false",
            class: "UppyIcon",
            style: {
                width: 16,
                marginRight: 3
            },
            viewBox: "0 0 276.157 276.157"
        }, __h_150("path", {
            d: "M273.08 101.378c-3.3-4.65-8.86-7.32-15.254-7.32h-24.34V67.59c0-10.2-8.3-18.5-18.5-18.5h-85.322c-3.63 0-9.295-2.875-11.436-5.805l-6.386-8.735c-4.982-6.814-15.104-11.954-23.546-11.954H58.73c-9.292 0-18.638 6.608-21.737 15.372l-2.033 5.752c-.958 2.71-4.72 5.37-7.596 5.37H18.5C8.3 49.09 0 57.39 0 67.59v167.07c0 .886.16 1.73.443 2.52.152 3.306 1.18 6.424 3.053 9.064 3.3 4.652 8.86 7.32 15.255 7.32h188.487c11.395 0 23.27-8.425 27.035-19.18l40.677-116.188c2.11-6.035 1.43-12.164-1.87-16.816zM18.5 64.088h8.864c9.295 0 18.64-6.607 21.738-15.37l2.032-5.75c.96-2.712 4.722-5.373 7.597-5.373h29.565c3.63 0 9.295 2.876 11.437 5.806l6.386 8.735c4.982 6.815 15.104 11.954 23.546 11.954h85.322c1.898 0 3.5 1.602 3.5 3.5v26.47H69.34c-11.395 0-23.27 8.423-27.035 19.178L15 191.23V67.59c0-1.898 1.603-3.5 3.5-3.5zm242.29 49.15l-40.676 116.188c-1.674 4.78-7.812 9.135-12.877 9.135H18.75c-1.447 0-2.576-.372-3.02-.997-.442-.625-.422-1.814.057-3.18l40.677-116.19c1.674-4.78 7.812-9.134 12.877-9.134h188.487c1.448 0 2.577.372 3.02.997.443.625.423 1.814-.056 3.18z"
        }))
    }

    function VideoIcon() {
        return __h_150("svg", {
            "aria-hidden": "true",
            focusable: "false",
            viewBox: "0 0 58 58"
        }, __h_150("path", {
            d: "M36.537 28.156l-11-7a1.005 1.005 0 0 0-1.02-.033C24.2 21.3 24 21.635 24 22v14a1 1 0 0 0 1.537.844l11-7a1.002 1.002 0 0 0 0-1.688zM26 34.18V23.82L34.137 29 26 34.18z"
        }), __h_150("path", {
            d: "M57 6H1a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM10 28H2v-9h8v9zm-8 2h8v9H2v-9zm10 10V8h34v42H12V40zm44-12h-8v-9h8v9zm-8 2h8v9h-8v-9zm8-22v9h-8V8h8zM2 8h8v9H2V8zm0 42v-9h8v9H2zm54 0h-8v-9h8v9z"
        }))
    }
    var _$ItemIcon_150 = function(e) {
            if (null !== e.itemIconString) switch (e.itemIconString) {
                case "file":
                    return __h_150(FileIcon, null);
                case "folder":
                    return __h_150(FolderIcon, null);
                case "video":
                    return __h_150(VideoIcon, null);
                default:
                    return __h_150("img", {
                        src: e.itemIconString
                    })
            }
        },
        __h_149 = _$preact_53.h,
        _$GridLi_149 = function(e) {
            return __h_149("li", {
                class: e.className
            }, __h_149("div", {
                "aria-hidden": !0,
                class: "uppy-ProviderBrowserItem-fakeCheckbox " + (e.isChecked ? "uppy-ProviderBrowserItem-fakeCheckbox--is-checked" : "")
            }), __h_149("button", {
                type: "button",
                class: "uppy-u-reset uppy-ProviderBrowserItem-inner",
                onclick: e.toggleCheckbox,
                role: "option",
                "aria-label": e.isChecked ? e.i18n("unselectFileNamed", {
                    name: e.title
                }) : e.i18n("selectFileNamed", {
                    name: e.title
                }),
                "aria-selected": e.isChecked,
                "aria-disabled": e.isDisabled,
                "data-uppy-super-focusable": !0
            }, e.itemIconEl, e.showTitles && e.title))
        },
        __h_151 = _$preact_53.h,
        getAriaLabelOfCheckbox = function(e) {
            return "folder" === e.type ? e.isChecked ? e.i18n("unselectAllFilesFromFolderNamed", {
                name: e.title
            }) : e.i18n("selectAllFilesFromFolderNamed", {
                name: e.title
            }) : e.isChecked ? e.i18n("unselectFileNamed", {
                name: e.title
            }) : e.i18n("selectFileNamed", {
                name: e.title
            })
        },
        _$ListLi_151 = function(e) {
            return __h_151("li", {
                class: e.className
            }, __h_151("button", {
                type: "button",
                class: "uppy-u-reset uppy-ProviderBrowserItem-fakeCheckbox " + (e.isChecked ? "uppy-ProviderBrowserItem-fakeCheckbox--is-checked" : ""),
                onClick: e.toggleCheckbox,
                id: e.id,
                role: "option",
                "aria-label": getAriaLabelOfCheckbox(e),
                "aria-selected": e.isChecked,
                "aria-disabled": e.isDisabled,
                "data-uppy-super-focusable": !0
            }), "file" === e.type ? __h_151("label", {
                for: e.id,
                className: "uppy-u-reset uppy-ProviderBrowserItem-inner"
            }, e.itemIconEl, e.showTitles && e.title) : __h_151("button", {
                type: "button",
                class: "uppy-u-reset uppy-ProviderBrowserItem-inner",
                onclick: e.handleFolderClick,
                "aria-label": e.i18n("openFolderNamed", {
                    name: e.title
                })
            }, e.itemIconEl, e.showTitles && e.title))
        };

    function ___extends_152() {
        return (___extends_152 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var __h_152 = _$preact_53.h,
        _$Item_152 = function(e) {
            var t = e.getItemIcon(),
                r = _$classnames_9("uppy-ProviderBrowserItem", {
                    "uppy-ProviderBrowserItem--selected": e.isChecked
                }, {
                    "uppy-ProviderBrowserItem--noPreview": "video" === t
                }),
                n = __h_152(_$ItemIcon_150, {
                    itemIconString: t
                });
            switch (e.viewType) {
                case "grid":
                    return __h_152(_$GridLi_149, ___extends_152({}, e, {
                        className: r,
                        itemIconEl: n
                    }));
                case "list":
                    return __h_152(_$ListLi_151, ___extends_152({}, e, {
                        className: r,
                        itemIconEl: n
                    }));
                default:
                    throw new Error("There is no such type " + e.viewType)
            }
        };

    function ___extends_153() {
        return (___extends_153 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var __h_153 = _$preact_53.h,
        getSharedProps = function(e, t) {
            return {
                id: e.id,
                title: e.name,
                getItemIcon: function() {
                    return e.icon
                },
                isChecked: t.isChecked(e),
                toggleCheckbox: function(r) {
                    return t.toggleCheckbox(r, e)
                },
                columns: t.columns,
                showTitles: t.showTitles,
                viewType: t.viewType,
                i18n: t.i18n
            }
        },
        _$ItemList_153 = function(e) {
            return e.folders.length || e.files.length ? __h_153("div", {
                class: "uppy-ProviderBrowser-body"
            }, __h_153("ul", {
                class: "uppy-ProviderBrowser-list",
                onscroll: e.handleScroll,
                role: "listbox",
                tabindex: "-1"
            }, e.folders.map(function(t) {
                return _$Item_152(___extends_153({}, getSharedProps(t, e), {
                    type: "folder",
                    isDisabled: !!e.isChecked(t) && e.isChecked(t).loading,
                    handleFolderClick: function() {
                        return e.handleFolderClick(t)
                    }
                }))
            }), e.files.map(function(t) {
                return _$Item_152(___extends_153({}, getSharedProps(t, e), {
                    type: "file",
                    isDisabled: !1
                }))
            }))) : __h_153("div", {
                class: "uppy-Provider-empty"
            }, e.i18n("noFilesFound"))
        },
        __h_148 = _$preact_53.h,
        _$FooterActions_148 = function(e) {
            return __h_148("div", {
                class: "uppy-ProviderBrowser-footer"
            }, __h_148("button", {
                class: "uppy-u-reset uppy-c-btn uppy-c-btn-primary",
                onclick: e.done
            }, e.i18n("selectX", {
                smart_count: e.selected
            })), __h_148("button", {
                class: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
                onclick: e.cancel
            }, e.i18n("cancel")))
        };

    function ___extends_146() {
        return (___extends_146 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var __h_146 = _$preact_53.h,
        _$Browser_146 = function(e) {
            var t = e.folders,
                r = e.files;
            "" !== e.filterInput && (t = e.filterItems(e.folders), r = e.filterItems(e.files));
            var n = e.currentSelection.length;
            return __h_146("div", {
                class: _$classnames_9("uppy-ProviderBrowser", "uppy-ProviderBrowser-viewType--" + e.viewType)
            }, __h_146("div", {
                class: "uppy-ProviderBrowser-header"
            }, __h_146("div", {
                class: _$classnames_9("uppy-ProviderBrowser-headerBar", !e.showBreadcrumbs && "uppy-ProviderBrowser-headerBar--simple")
            }, e.showBreadcrumbs && _$Breadcrumbs_145({
                getFolder: e.getFolder,
                directories: e.directories,
                breadcrumbsIcon: e.pluginIcon && e.pluginIcon(),
                title: e.title
            }), __h_146("span", {
                class: "uppy-ProviderBrowser-user"
            }, e.username), __h_146("button", {
                type: "button",
                onclick: e.logout,
                class: "uppy-u-reset uppy-ProviderBrowser-userLogout"
            }, e.i18n("logOut")))), e.showFilter && __h_146(_$Filter_147, e), __h_146(_$ItemList_153, {
                columns: [{
                    name: "Name",
                    key: "title"
                }],
                folders: t,
                files: r,
                activeRow: e.isActiveRow,
                sortByTitle: e.sortByTitle,
                sortByDate: e.sortByDate,
                isChecked: e.isChecked,
                handleFolderClick: e.getNextFolder,
                toggleCheckbox: e.toggleCheckbox,
                handleScroll: e.handleScroll,
                title: e.title,
                showTitles: e.showTitles,
                i18n: e.i18n,
                viewType: e.viewType
            }), n > 0 && __h_146(_$FooterActions_148, ___extends_146({
                selected: n
            }, e)))
        },
        __h_154 = _$preact_53.h,
        _$Loader_154 = function(e) {
            return __h_154("div", {
                class: "uppy-Provider-loading"
            }, __h_154("span", null, e.i18n("loading")))
        },
        _$isPreviewSupported_222 = function(e) {
            if (!e) return !1;
            var t = e.split("/")[1];
            return !!/^(jpe?g|gif|png|svg|svg\+xml|bmp)$/.test(t)
        },
        _$package_156 = {
            version: "1.5.0"
        },
        ___class_155, ___temp_155;

    function ___extends_155() {
        return (___extends_155 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var __h_155 = _$preact_53.h,
        __Component_155 = _$preact_53.Component,
        CloseWrapper = function(e) {
            var t, r;

            function n() {
                return e.apply(this, arguments) || this
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.componentWillUnmount = function() {
                this.props.onUnmount()
            }, o.render = function() {
                return this.props.children[0]
            }, n
        }(__Component_155),
        _$lib_155 = (___temp_155 = ___class_155 = function() {
            function e(e, t) {
                this.plugin = e, this.provider = t.provider, this.opts = ___extends_155({}, {
                    viewType: "list",
                    showTitles: !0,
                    showFilter: !0,
                    showBreadcrumbs: !0
                }, {}, t), this.addFile = this.addFile.bind(this), this.filterItems = this.filterItems.bind(this), this.filterQuery = this.filterQuery.bind(this), this.toggleSearch = this.toggleSearch.bind(this), this.getFolder = this.getFolder.bind(this), this.getNextFolder = this.getNextFolder.bind(this), this.logout = this.logout.bind(this), this.preFirstRender = this.preFirstRender.bind(this), this.handleAuth = this.handleAuth.bind(this), this.sortByTitle = this.sortByTitle.bind(this), this.sortByDate = this.sortByDate.bind(this), this.isActiveRow = this.isActiveRow.bind(this), this.isChecked = this.isChecked.bind(this), this.toggleCheckbox = this.toggleCheckbox.bind(this), this.handleError = this.handleError.bind(this), this.handleScroll = this.handleScroll.bind(this), this.listAllFiles = this.listAllFiles.bind(this), this.donePicking = this.donePicking.bind(this), this.cancelPicking = this.cancelPicking.bind(this), this.clearSelection = this.clearSelection.bind(this), this.render = this.render.bind(this), this.clearSelection()
            }
            var t = e.prototype;
            return t.tearDown = function() {}, t._updateFilesAndFolders = function(e, t, r) {
                this.nextPagePath = e.nextPagePath, e.items.forEach(function(e) {
                    e.isFolder ? r.push(e) : t.push(e)
                }), this.plugin.setPluginState({
                    folders: r,
                    files: t
                })
            }, t.preFirstRender = function() {
                this.plugin.setPluginState({
                    didFirstRender: !0
                }), this.plugin.onFirstRender()
            }, t.getFolder = function(e, t) {
                var r = this;
                return this._loaderWrapper(this.provider.list(e), function(n) {
                    var o, i = r.plugin.getPluginState(),
                        s = function(t, r) {
                            for (var n = 0; n < t.length; n++)
                                if (o = t[n], e === o.id) return n;
                            var o;
                            return -1
                        }(i.directories);
                    o = -1 !== s ? i.directories.slice(0, s + 1) : i.directories.concat([{
                        id: e,
                        title: t
                    }]), r.username = r.username ? r.username : n.username, r._updateFilesAndFolders(n, [], []), r.plugin.setPluginState({
                        directories: o
                    })
                }, this.handleError)
            }, t.getNextFolder = function(e) {
                this.getFolder(e.requestPath, e.name), this.lastCheckbox = void 0
            }, t.addFile = function(e) {
                var t = {
                        id: this.providerFileToId(e),
                        source: this.plugin.id,
                        data: e,
                        name: e.name || e.id,
                        type: e.mimeType,
                        isRemote: !0,
                        body: {
                            fileId: e.id
                        },
                        remote: {
                            companionUrl: this.plugin.opts.companionUrl,
                            url: "" + this.provider.fileUrl(e.requestPath),
                            body: {
                                fileId: e.id
                            },
                            providerOptions: this.provider.opts
                        }
                    },
                    r = _$getFileType_213(t);
                r && _$isPreviewSupported_222(r) && (t.preview = e.thumbnail), this.plugin.uppy.log("Adding remote file");
                try {
                    this.plugin.uppy.addFile(t)
                } catch (err) {
                    err.isRestriction || this.plugin.uppy.log(err)
                }
            }, t.removeFile = function(e) {
                var t = this.plugin.getPluginState().currentSelection;
                this.plugin.setPluginState({
                    currentSelection: t.filter(function(t) {
                        return t.id !== e
                    })
                })
            }, t.logout = function() {
                var e = this;
                this.provider.logout().then(function(t) {
                    if (t.ok) {
                        if (!t.revoked) {
                            var r = e.plugin.uppy.i18n("companionUnauthorizeHint", {
                                provider: e.plugin.title,
                                url: t.manual_revoke_url
                            });
                            e.plugin.uppy.info(r, "info", 7e3)
                        }
                        e.plugin.setPluginState({
                            authenticated: !1,
                            files: [],
                            folders: [],
                            directories: []
                        })
                    }
                }).catch(this.handleError)
            }, t.filterQuery = function(e) {
                var t = this.plugin.getPluginState();
                this.plugin.setPluginState(___extends_155({}, t, {
                    filterInput: e ? e.target.value : ""
                }))
            }, t.toggleSearch = function(e) {
                var t = this.plugin.getPluginState();
                this.plugin.setPluginState({
                    isSearchVisible: !t.isSearchVisible,
                    filterInput: ""
                })
            }, t.filterItems = function(e) {
                var t = this.plugin.getPluginState();
                return t.filterInput && "" !== t.filterInput ? e.filter(function(e) {
                    return -1 !== e.name.toLowerCase().indexOf(t.filterInput.toLowerCase())
                }) : e
            }, t.sortByTitle = function() {
                var e = ___extends_155({}, this.plugin.getPluginState()),
                    t = e.files,
                    r = e.folders,
                    n = e.sorting,
                    o = t.sort(function(e, t) {
                        return "titleDescending" === n ? t.name.localeCompare(e.name) : e.name.localeCompare(t.name)
                    }),
                    i = r.sort(function(e, t) {
                        return "titleDescending" === n ? t.name.localeCompare(e.name) : e.name.localeCompare(t.name)
                    });
                this.plugin.setPluginState(___extends_155({}, e, {
                    files: o,
                    folders: i,
                    sorting: "titleDescending" === n ? "titleAscending" : "titleDescending"
                }))
            }, t.sortByDate = function() {
                var e = ___extends_155({}, this.plugin.getPluginState()),
                    t = e.files,
                    r = e.folders,
                    n = e.sorting,
                    o = t.sort(function(e, t) {
                        var r = new Date(e.modifiedDate),
                            o = new Date(t.modifiedDate);
                        return "dateDescending" === n ? r > o ? -1 : r < o ? 1 : 0 : r > o ? 1 : r < o ? -1 : 0
                    }),
                    i = r.sort(function(e, t) {
                        var r = new Date(e.modifiedDate),
                            o = new Date(t.modifiedDate);
                        return "dateDescending" === n ? r > o ? -1 : r < o ? 1 : 0 : r > o ? 1 : r < o ? -1 : 0
                    });
                this.plugin.setPluginState(___extends_155({}, e, {
                    files: o,
                    folders: i,
                    sorting: "dateDescending" === n ? "dateAscending" : "dateDescending"
                }))
            }, t.sortBySize = function() {
                var e = ___extends_155({}, this.plugin.getPluginState()),
                    t = e.files,
                    r = e.sorting;
                if (t.length && this.plugin.getItemData(t[0]).size) {
                    var n = t.sort(function(e, t) {
                        var n = e.size,
                            o = t.size;
                        return "sizeDescending" === r ? n > o ? -1 : n < o ? 1 : 0 : n > o ? 1 : n < o ? -1 : 0
                    });
                    this.plugin.setPluginState(___extends_155({}, e, {
                        files: n,
                        sorting: "sizeDescending" === r ? "sizeAscending" : "sizeDescending"
                    }))
                }
            }, t.isActiveRow = function(e) {
                return this.plugin.getPluginState().activeRow === this.plugin.getItemId(e)
            }, t.isChecked = function(e) {
                return this.plugin.getPluginState().currentSelection.some(function(t) {
                    return t.id === e.id
                })
            }, t.addFolder = function(e) {
                var t = this,
                    r = this.providerFileToId(e),
                    n = this.plugin.getPluginState(),
                    o = n.selectedFolders || {};
                if (!(r in o && o[r].loading)) return o[r] = {
                    loading: !0,
                    files: []
                }, this.plugin.setPluginState({
                    selectedFolders: o
                }), this.listAllFiles(e.requestPath).then(function(i) {
                    i.forEach(function(e) {
                        t.addFile(e)
                    });
                    var s, a = i.map(t.providerFileToId);
                    (n = t.plugin.getPluginState()).selectedFolders[r] = {
                        loading: !1,
                        files: a
                    }, t.plugin.setPluginState({
                        selectedFolders: o
                    }), s = i.length ? t.plugin.uppy.i18n("folderAdded", {
                        smart_count: i.length,
                        folder: e.name
                    }) : t.plugin.uppy.i18n("emptyFolderAdded"), t.plugin.uppy.info(s)
                }).catch(function(e) {
                    delete(n = t.plugin.getPluginState()).selectedFolders[r], t.plugin.setPluginState({
                        selectedFolders: n.selectedFolders
                    }), t.handleError(e)
                })
            }, t.toggleCheckbox = function(e, t) {
                e.stopPropagation(), e.preventDefault(), e.currentTarget.focus();
                var r = this.plugin.getPluginState(),
                    n = r.folders,
                    o = r.files,
                    i = this.filterItems(n.concat(o));
                if (this.lastCheckbox && e.shiftKey) {
                    var s, a = i.indexOf(this.lastCheckbox),
                        l = i.indexOf(t);
                    return s = a < l ? i.slice(a, l + 1) : i.slice(l, a + 1), void this.plugin.setPluginState({
                        currentSelection: s
                    })
                }
                this.lastCheckbox = t;
                var u = this.plugin.getPluginState().currentSelection;
                this.isChecked(t) ? this.plugin.setPluginState({
                    currentSelection: u.filter(function(e) {
                        return e.id !== t.id
                    })
                }) : this.plugin.setPluginState({
                    currentSelection: u.concat([t])
                })
            }, t.providerFileToId = function(e) {
                return _$generateFileID_205({
                    data: e,
                    name: e.name || e.id,
                    type: e.mimeType
                })
            }, t.handleAuth = function() {
                var t = this,
                    r = btoa(JSON.stringify({
                        origin: "origin" in location ? location.origin : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "")
                    })),
                    n = encodeURIComponent("@uppy/provider-views=" + e.VERSION),
                    o = this.provider.authUrl() + "?state=" + r + "&uppyVersions=" + n,
                    i = window.open(o, "_blank");
                window.addEventListener("message", function e(r) {
                    if (t._isOriginAllowed(r.origin, t.plugin.opts.companionAllowedHosts) && r.source === i) {
                        var n = "string" == typeof r.data ? JSON.parse(r.data) : r.data;
                        n.token ? (i.close(), window.removeEventListener("message", e), t.provider.setAuthToken(n.token), t.preFirstRender()) : t.plugin.uppy.log("did not receive token from auth window")
                    } else t.plugin.uppy.log("rejecting event from " + r.origin + " vs allowed pattern " + t.plugin.opts.companionAllowedHosts)
                })
            }, t._isOriginAllowed = function(e, t) {
                var r = function(e) {
                    return "string" == typeof e ? new RegExp("^" + e + "$") : e instanceof RegExp ? e : void 0
                };
                return (Array.isArray(t) ? t.map(r) : [r(t)]).filter(function(e) {
                    return null != e
                }).some(function(t) {
                    return t.test(e) || t.test(e + "/")
                })
            }, t.handleError = function(e) {
                var t = this.plugin.uppy;
                if (t.log(e.toString()), !e.isAuthError) {
                    var r = t.i18n("companionError");
                    t.info({
                        message: r,
                        details: e.toString()
                    }, "error", 5e3)
                }
            }, t.handleScroll = function(e) {
                var t = this,
                    r = e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight),
                    n = this.nextPagePath || null;
                r < 50 && n && !this._isHandlingScroll && (this.provider.list(n).then(function(e) {
                    var r = t.plugin.getPluginState(),
                        n = r.files,
                        o = r.folders;
                    t._updateFilesAndFolders(e, n, o)
                }).catch(this.handleError).then(function() {
                    t._isHandlingScroll = !1
                }), this._isHandlingScroll = !0)
            }, t.listAllFiles = function(e, t) {
                var r = this;
                return void 0 === t && (t = null), t = t || [], new Promise(function(n, o) {
                    r.provider.list(e).then(function(e) {
                        e.items.forEach(function(e) {
                            e.isFolder || t.push(e)
                        });
                        var i = e.nextPagePath || null;
                        return i ? r.listAllFiles(i, t).then(function(e) {
                            return n(e)
                        }).catch(function(e) {
                            return o(e)
                        }) : n(t)
                    }).catch(function(e) {
                        return o(e)
                    })
                })
            }, t.donePicking = function() {
                var e = this,
                    t = this.plugin.getPluginState().currentSelection.map(function(t) {
                        return t.isFolder ? e.addFolder(t) : e.addFile(t)
                    });
                this._loaderWrapper(Promise.all(t), function() {
                    e.clearSelection()
                }, function() {})
            }, t.cancelPicking = function() {
                this.clearSelection();
                var e = this.plugin.uppy.getPlugin("Dashboard");
                e && e.hideAllPanels()
            }, t.clearSelection = function() {
                this.plugin.setPluginState({
                    currentSelection: []
                })
            }, t._loaderWrapper = function(e, t, r) {
                var n = this;
                e.then(function(e) {
                    n.plugin.setPluginState({
                        loading: !1
                    }), t(e)
                }).catch(function(e) {
                    n.plugin.setPluginState({
                        loading: !1
                    }), r(e)
                }), this.plugin.setPluginState({
                    loading: !0
                })
            }, t.render = function(e, t) {
                void 0 === t && (t = {});
                var r = this.plugin.getPluginState(),
                    n = r.authenticated;
                if (r.didFirstRender || this.preFirstRender(), this.plugin.getPluginState().loading) return __h_155(CloseWrapper, {
                    onUnmount: this.clearSelection
                }, __h_155(_$Loader_154, {
                    i18n: this.plugin.uppy.i18n
                }));
                if (!n) return __h_155(CloseWrapper, {
                    onUnmount: this.clearSelection
                }, __h_155(_$AuthView_144, {
                    pluginName: this.plugin.title,
                    pluginIcon: this.plugin.icon,
                    handleAuth: this.handleAuth,
                    i18n: this.plugin.uppy.i18n,
                    i18nArray: this.plugin.uppy.i18nArray
                }));
                var o = ___extends_155({}, this.opts, {}, t),
                    i = ___extends_155({}, this.plugin.getPluginState(), {
                        username: this.username,
                        getNextFolder: this.getNextFolder,
                        getFolder: this.getFolder,
                        filterItems: this.filterItems,
                        filterQuery: this.filterQuery,
                        toggleSearch: this.toggleSearch,
                        sortByTitle: this.sortByTitle,
                        sortByDate: this.sortByDate,
                        logout: this.logout,
                        isActiveRow: this.isActiveRow,
                        isChecked: this.isChecked,
                        toggleCheckbox: this.toggleCheckbox,
                        handleScroll: this.handleScroll,
                        listAllFiles: this.listAllFiles,
                        done: this.donePicking,
                        cancel: this.cancelPicking,
                        title: this.plugin.title,
                        viewType: o.viewType,
                        showTitles: o.showTitles,
                        showFilter: o.showFilter,
                        showBreadcrumbs: o.showBreadcrumbs,
                        pluginIcon: this.plugin.icon,
                        i18n: this.plugin.uppy.i18n
                    });
                return __h_155(CloseWrapper, {
                    onUnmount: this.clearSelection
                }, __h_155(_$Browser_146, i))
            }, e
        }(), ___class_155.VERSION = _$package_156.version, ___temp_155),
        _$package_166 = {
            version: "1.2.0"
        },
        _$lib_165 = {};

    function ___extends_165() {
        return (___extends_165 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var STATE_UPDATE = "uppy/STATE_UPDATE",
        defaultSelector = function(e) {
            return function(t) {
                return t.uppy[e]
            }
        },
        ReduxStore = function() {
            function e(e) {
                this._store = e.store, this._id = e.id || _$cuid_13(), this._selector = e.selector || defaultSelector(this._id), this.setState({})
            }
            var t = e.prototype;
            return t.setState = function(e) {
                this._store.dispatch({
                    type: STATE_UPDATE,
                    id: this._id,
                    payload: e
                })
            }, t.getState = function() {
                return this._selector(this._store.getState())
            }, t.subscribe = function(e) {
                var t = this,
                    r = this.getState();
                return this._store.subscribe(function() {
                    var n = t.getState();
                    if (r !== n) {
                        var o = function(e, t) {
                            var r = Object.keys(t),
                                n = {};
                            return r.forEach(function(r) {
                                e[r] !== t[r] && (n[r] = t[r])
                            }), n
                        }(r, n);
                        e(r, n, o), r = n
                    }
                })
            }, e
        }();
    ReduxStore.VERSION = _$package_166.version, _$lib_165 = function(e) {
        return new ReduxStore(e)
    }, _$lib_165.STATE_UPDATE = STATE_UPDATE, _$lib_165.reducer = function(e, t) {
        if (void 0 === e && (e = {}), t.type === STATE_UPDATE) {
            var r, n = ___extends_165({}, e[t.id], t.payload);
            return ___extends_165({}, e, ((r = {})[t.id] = n, r))
        }
        return e
    }, _$lib_165.middleware = function() {
        return function() {
            return function(e) {
                return function(t) {
                    e(t)
                }
            }
        }
    };
    var _$isShallowEqual_43 = function(e, t) {
        if (e === t) return !0;
        for (var r in e)
            if (!(r in t)) return !1;
        for (var r in t)
            if (e[r] !== t[r]) return !1;
        return !0
    };

    function ___extends_118() {
        return (___extends_118 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var __h_118 = _$preact_53.h,
        __Component_118 = _$preact_53.Component,
        _$pure_118 = function(e) {
            return function(t) {
                var r, n;

                function o() {
                    return t.apply(this, arguments) || this
                }
                n = t, (r = o).prototype = Object.create(n.prototype), r.prototype.constructor = r, r.__proto__ = n;
                var i = o.prototype;
                return i.shouldComponentUpdate = function(e) {
                    return !_$isShallowEqual_43(this.props, e)
                }, i.render = function() {
                    var t = ___extends_118({}, this.props);
                    return __h_118(e, t)
                }, o
            }(__Component_118)
        },
        __h_111 = _$preact_53.h,
        _$icons_111 = {
            defaultPickerIcon: function() {
                return __h_111("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    width: "30",
                    height: "30",
                    viewBox: "0 0 30 30"
                }, __h_111("path", {
                    d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z"
                }))
            },
            iconRetry: function() {
                return __h_111("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "UppyIcon retry",
                    width: "28",
                    height: "31",
                    viewBox: "0 0 16 19"
                }, __h_111("path", {
                    d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z"
                }), __h_111("path", {
                    d: "M7.9 3H10v2H7.9z"
                }), __h_111("path", {
                    d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z"
                }), __h_111("path", {
                    d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z"
                }))
            },
            localIcon: function() {
                return __h_111("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    fill: "#607d8b",
                    width: "27",
                    height: "25",
                    viewBox: "0 0 27 25"
                }, __h_111("path", {
                    d: "M5.586 9.288a.313.313 0 0 0 .282.176h4.84v3.922c0 1.514 1.25 2.24 2.792 2.24 1.54 0 2.79-.726 2.79-2.24V9.464h4.84c.122 0 .23-.068.284-.176a.304.304 0 0 0-.046-.324L13.735.106a.316.316 0 0 0-.472 0l-7.63 8.857a.302.302 0 0 0-.047.325z"
                }), __h_111("path", {
                    d: "M24.3 5.093c-.218-.76-.54-1.187-1.208-1.187h-4.856l1.018 1.18h3.948l2.043 11.038h-7.193v2.728H9.114v-2.725h-7.36l2.66-11.04h3.33l1.018-1.18H3.907c-.668 0-1.06.46-1.21 1.186L0 16.456v7.062C0 24.338.676 25 1.51 25h23.98c.833 0 1.51-.663 1.51-1.482v-7.062L24.3 5.093z"
                }))
            },
            iconAudio: function() {
                return __h_111("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "UppyIcon",
                    width: "25",
                    height: "25",
                    viewBox: "0 0 25 25"
                }, __h_111("path", {
                    d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z",
                    fill: "#049BCF",
                    "fill-rule": "nonzero"
                }))
            },
            iconVideo: function() {
                return __h_111("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "UppyIcon",
                    width: "25",
                    height: "25",
                    viewBox: "0 0 25 25"
                }, __h_111("path", {
                    d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z",
                    fill: "#19AF67",
                    "fill-rule": "nonzero"
                }))
            },
            iconPDF: function() {
                return __h_111("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "UppyIcon",
                    width: "25",
                    height: "25",
                    viewBox: "0 0 25 25"
                }, __h_111("path", {
                    d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z",
                    fill: "#E2514A",
                    "fill-rule": "nonzero"
                }))
            },
            iconFile: function() {
                return __h_111("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "UppyIcon",
                    width: "25",
                    height: "25",
                    viewBox: "0 0 25 25"
                }, __h_111("g", {
                    fill: "#A7AFB7",
                    "fill-rule": "nonzero"
                }, __h_111("path", {
                    d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z"
                }), __h_111("path", {
                    d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z"
                })))
            },
            iconText: function() {
                return __h_111("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "UppyIcon",
                    width: "25",
                    height: "25",
                    viewBox: "0 0 25 25"
                }, __h_111("path", {
                    d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z",
                    fill: "#5A5E69",
                    "fill-rule": "nonzero"
                }))
            },
            iconCopyLink: function() {
                return __h_111("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "UppyIcon",
                    width: "14",
                    height: "14",
                    viewBox: "0 0 14 12"
                }, __h_111("path", {
                    d: "M7.94 7.703a2.613 2.613 0 0 1-.626 2.681l-.852.851a2.597 2.597 0 0 1-1.849.766A2.616 2.616 0 0 1 2.764 7.54l.852-.852a2.596 2.596 0 0 1 2.69-.625L5.267 7.099a1.44 1.44 0 0 0-.833.407l-.852.851a1.458 1.458 0 0 0 1.03 2.486c.39 0 .755-.152 1.03-.426l.852-.852c.231-.231.363-.522.406-.824l1.04-1.038zm4.295-5.937A2.596 2.596 0 0 0 10.387 1c-.698 0-1.355.272-1.849.766l-.852.851a2.614 2.614 0 0 0-.624 2.688l1.036-1.036c.041-.304.173-.6.407-.833l.852-.852c.275-.275.64-.426 1.03-.426a1.458 1.458 0 0 1 1.03 2.486l-.852.851a1.442 1.442 0 0 1-.824.406l-1.04 1.04a2.596 2.596 0 0 0 2.683-.628l.851-.85a2.616 2.616 0 0 0 0-3.697zm-6.88 6.883a.577.577 0 0 0 .82 0l3.474-3.474a.579.579 0 1 0-.819-.82L5.355 7.83a.579.579 0 0 0 0 .819z"
                }))
            },
            iconPencil: function() {
                return __h_111("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "UppyIcon",
                    width: "14",
                    height: "14",
                    viewBox: "0 0 14 14"
                }, __h_111("g", {
                    "fill-rule": "evenodd"
                }, __h_111("path", {
                    d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z",
                    "fill-rule": "nonzero"
                }), __h_111("rect", {
                    x: "1",
                    y: "12.293",
                    width: "11",
                    height: "1",
                    rx: ".5"
                }), __h_111("path", {
                    "fill-rule": "nonzero",
                    d: "M6.793 2.5L9.5 5.207l.707-.707L7.5 1.793z"
                })))
            },
            iconCross: function() {
                return __h_111("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "UppyIcon",
                    width: "18",
                    height: "18",
                    viewBox: "0 0 18 18"
                }, __h_111("path", {
                    d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z"
                }), __h_111("path", {
                    fill: "#FFF",
                    d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z"
                }))
            },
            iconPlus: function() {
                return __h_111("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "UppyIcon",
                    width: "15",
                    height: "15",
                    viewBox: "0 0 15 15"
                }, __h_111("path", {
                    d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z"
                }))
            }
        },
        iconFile = _$icons_111.iconFile,
        iconText = _$icons_111.iconText,
        iconAudio = _$icons_111.iconAudio,
        iconVideo = _$icons_111.iconVideo,
        iconPDF = _$icons_111.iconPDF,
        _$getFileTypeIcon_116 = function(e) {
            var t = {
                color: "#838999",
                icon: iconFile()
            };
            if (!e) return t;
            var r = e.split("/")[0],
                n = e.split("/")[1];
            return "text" === r ? {
                color: "#5a5e69",
                icon: iconText()
            } : "audio" === r ? {
                color: "#068dbb",
                icon: iconAudio()
            } : "video" === r ? {
                color: "#19af67",
                icon: iconVideo()
            } : "application" === r && "pdf" === n ? {
                color: "#e25149",
                icon: iconPDF()
            } : "image" === r ? {
                color: "#f2f2f2",
                icon: ""
            } : t
        },
        __h_108 = _$preact_53.h,
        _$FilePreview_108 = function(e) {
            var t = e.file;
            if (t.preview) return __h_108("img", {
                class: "uppy-DashboardItem-previewImg",
                alt: t.name,
                src: t.preview
            });
            var r = _$getFileTypeIcon_116(t.type),
                n = r.color,
                o = r.icon;
            return __h_108("div", {
                class: "uppy-DashboardItem-previewIconWrap"
            }, __h_108("span", {
                class: "uppy-DashboardItem-previewIcon",
                style: {
                    color: n
                }
            }, o), __h_108("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "uppy-DashboardItem-previewIconBg",
                width: "58",
                height: "76",
                viewBox: "0 0 58 76"
            }, __h_108("rect", {
                fill: "#FFF",
                width: "58",
                height: "76",
                rx: "3",
                "fill-rule": "evenodd"
            })))
        },
        __h_103 = _$preact_53.h,
        _$FilePreviewAndLink_103 = function(e) {
            return __h_103("div", {
                class: "uppy-DashboardItem-previewInnerWrap",
                style: {
                    backgroundColor: _$getFileTypeIcon_116(e.file.type).color
                }
            }, e.showLinkToFileUploadResult && e.file.uploadURL && __h_103("a", {
                class: "uppy-DashboardItem-previewLink",
                href: e.file.uploadURL,
                rel: "noreferrer noopener",
                target: "_blank",
                "aria-label": e.file.meta.name
            }), __h_103(_$FilePreview_108, {
                file: e.file
            }))
        },
        __h_104 = _$preact_53.h,
        circleLength = 2 * Math.PI * 15,
        _$PauseResumeCancelIcon_104 = function(e) {
            return __h_104("svg", {
                "aria-hidden": "true",
                focusable: "false",
                width: "70",
                height: "70",
                viewBox: "0 0 36 36",
                class: "UppyIcon UppyIcon-progressCircle"
            }, __h_104("g", {
                class: "progress-group"
            }, __h_104("circle", {
                class: "bg",
                r: "15",
                cx: "18",
                cy: "18",
                "stroke-width": "2",
                fill: "none"
            }), __h_104("circle", {
                class: "progress",
                r: "15",
                cx: "18",
                cy: "18",
                transform: "rotate(-90, 18, 18)",
                "stroke-width": "2",
                fill: "none",
                "stroke-dasharray": circleLength,
                "stroke-dashoffset": circleLength - circleLength / 100 * e.progress
            })), !e.hidePauseResumeCancelButtons && __h_104("g", null, __h_104("polygon", {
                class: "play",
                transform: "translate(3, 3)",
                points: "12 20 12 10 20 15"
            }), __h_104("g", {
                class: "pause",
                transform: "translate(14.5, 13)"
            }, __h_104("rect", {
                x: "0",
                y: "0",
                width: "2",
                height: "10",
                rx: "0"
            }), __h_104("rect", {
                x: "5",
                y: "0",
                width: "2",
                height: "10",
                rx: "0"
            })), __h_104("polygon", {
                class: "cancel",
                transform: "translate(2, 2)",
                points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
            })), __h_104("polygon", {
                class: "check",
                transform: "translate(2, 3)",
                points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634"
            }))
        },
        __h_105 = _$preact_53.h,
        iconRetry = _$icons_111.iconRetry;

    function progressIndicatorTitle(e) {
        return e.isUploaded ? e.i18n("uploadComplete") : e.error ? e.i18n("retryUpload") : e.resumableUploads ? e.file.isPaused ? e.i18n("resumeUpload") : e.i18n("pauseUpload") : e.individualCancellation ? e.i18n("cancelUpload") : ""
    }
    var _$FileProgress_105 = function(e) {
            return e.hideRetryButton && e.error ? __h_105("div", {
                class: "uppy-DashboardItem-progress"
            }) : e.isUploaded || e.hidePauseResumeCancelButtons && !e.error ? __h_105("div", {
                class: "uppy-DashboardItem-progress"
            }, __h_105("div", {
                class: "uppy-DashboardItem-progressIndicator"
            }, __h_105(_$PauseResumeCancelIcon_104, {
                progress: e.file.progress.percentage,
                hidePauseResumeCancelButtons: e.hidePauseResumeCancelButtons
            }))) : __h_105("div", {
                class: "uppy-DashboardItem-progress"
            }, __h_105("button", {
                class: "uppy-u-reset uppy-DashboardItem-progressIndicator",
                type: "button",
                "aria-label": progressIndicatorTitle(e),
                title: progressIndicatorTitle(e),
                onclick: function() {
                    return function(e) {
                        e.isUploaded || (!e.error || e.hideRetryButton ? e.hidePauseResumeCancelButtons || (e.resumableUploads ? e.pauseUpload(e.file.id) : e.individualCancellation && e.cancelUpload(e.file.id)) : e.retryUpload(e.file.id))
                    }(e)
                }
            }, e.error ? e.hideRetryButton ? null : iconRetry() : __h_105(_$PauseResumeCancelIcon_104, {
                progress: e.file.progress.percentage,
                hidePauseResumeCancelButtons: e.hidePauseResumeCancelButtons
            })))
        },
        _$truncateString_120 = function(e, t) {
            if (e.length <= t) return e;
            if (t <= "...".length) return e.substr(0, t);
            var r = t - "...".length,
                n = Math.ceil(r / 2),
                o = Math.floor(r / 2);
            return e.substr(0, n) + "..." + e.substr(e.length - o)
        },
        __h_102 = _$preact_53.h,
        renderFileSource = function(e) {
            return e.file.source && e.file.source !== e.id && __h_102("div", {
                class: "uppy-DashboardItem-sourceIcon"
            }, e.acquirers.map(function(t) {
                if (t.id === e.file.source) return function(e, t) {
                    return __h_102("span", {
                        title: t.i18n("fileSource", {
                            name: e.name
                        })
                    }, e.icon())
                }(t, e)
            }))
        },
        _$FileInfo_102 = function(e) {
            return __h_102("div", {
                class: "uppy-DashboardItem-fileInfo",
                "data-uppy-file-source": e.file.source
            }, function(e) {
                var t;
                return t = e.containerWidth <= 352 ? 35 : e.containerWidth <= 576 ? 60 : 30, __h_102("div", {
                    class: "uppy-DashboardItem-name",
                    title: e.file.meta.name
                }, _$truncateString_120(e.file.meta.name, t))
            }(e), __h_102("div", {
                class: "uppy-DashboardItem-status"
            }, function(e) {
                return e.file.data.size && __h_102("div", {
                    class: "uppy-DashboardItem-statusSize"
                }, _$prettyBytes_225(e.file.data.size))
            }(e), renderFileSource(e)))
        },
        _$copyToClipboard_113 = function(e, t) {
            return t = t || "Copy the URL below", new Promise(function(r) {
                var n = document.createElement("textarea");
                n.setAttribute("style", {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "2em",
                    height: "2em",
                    padding: 0,
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    background: "transparent"
                }), n.value = e, document.body.appendChild(n), n.select();
                var o = function() {
                    document.body.removeChild(n), window.prompt(t, e), r()
                };
                try {
                    return document.execCommand("copy") ? (document.body.removeChild(n), r()) : o()
                } catch (err) {
                    return document.body.removeChild(n), o()
                }
            })
        },
        __h_101 = _$preact_53.h,
        iconPencil = _$icons_111.iconPencil,
        iconCross = _$icons_111.iconCross,
        iconCopyLink = _$icons_111.iconCopyLink,
        renderCopyLinkButton = function(e) {
            return e.showLinkToFileUploadResult && e.file.uploadURL && __h_101("button", {
                class: "uppy-u-reset uppy-DashboardItem-action uppy-DashboardItem-action--copyLink",
                type: "button",
                "aria-label": e.i18n("copyLink"),
                title: e.i18n("copyLink"),
                onclick: function(t) {
                    return function(e, t) {
                        return _$copyToClipboard_113(t.file.uploadURL, t.i18n("copyLinkToClipboardFallback")).then(function() {
                            t.log("Link copied to clipboard."), t.info(t.i18n("copyLinkToClipboardSuccess"), "info", 3e3)
                        }).catch(t.log).then(function() {
                            return e.target.focus({
                                preventScroll: !0
                            })
                        })
                    }(t, e)
                }
            }, iconCopyLink())
        },
        _$Buttons_101 = function(e) {
            return __h_101("div", {
                className: "uppy-DashboardItem-actionWrapper"
            }, function(e) {
                return !e.uploadInProgressOrComplete && e.metaFields && e.metaFields.length > 0 && __h_101("button", {
                    class: "uppy-u-reset uppy-DashboardItem-action uppy-DashboardItem-action--edit",
                    type: "button",
                    "aria-label": e.i18n("editFile") + " " + e.file.meta.name,
                    title: e.i18n("editFile"),
                    onclick: function(t) {
                        return e.toggleFileCard(e.file.id)
                    }
                }, iconPencil())
            }(e), renderCopyLinkButton(e), function(e) {
                return e.showRemoveButton && __h_101("button", {
                    class: "uppy-u-reset uppy-DashboardItem-action uppy-DashboardItem-action--remove",
                    type: "button",
                    "aria-label": e.i18n("removeFile"),
                    title: e.i18n("removeFile"),
                    onclick: function() {
                        return e.removeFile(e.file.id)
                    }
                }, iconCross())
            }(e))
        };

    function ___extends_106() {
        return (___extends_106 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var __h_106 = _$preact_53.h,
        _$FileItem_106 = _$pure_118(function(e) {
            var t = e.file,
                r = t.progress.preprocess || t.progress.postprocess,
                n = t.progress.uploadComplete && !r && !t.error,
                o = t.progress.uploadStarted || r,
                i = t.progress.uploadStarted && !t.progress.uploadComplete || r,
                s = t.isPaused || !1,
                a = t.error || !1,
                l = e.individualCancellation ? !n : !i && !n,
                u = _$classnames_9("uppy-u-reset", "uppy-DashboardItem", {
                    "is-inprogress": i
                }, {
                    "is-processing": r
                }, {
                    "is-complete": n
                }, {
                    "is-paused": s
                }, {
                    "is-error": !!a
                }, {
                    "is-resumable": e.resumableUploads
                }, {
                    "is-noIndividualCancellation": !e.individualCancellation
                });
            return __h_106("li", {
                class: u,
                id: "uppy_" + t.id
            }, __h_106("div", {
                class: "uppy-DashboardItem-preview"
            }, __h_106(_$FilePreviewAndLink_103, {
                file: t,
                showLinkToFileUploadResult: e.showLinkToFileUploadResult
            }), __h_106(_$FileProgress_105, ___extends_106({}, e, {
                file: t,
                error: a,
                isUploaded: n
            }))), __h_106("div", {
                class: "uppy-DashboardItem-fileInfoAndButtons"
            }, __h_106(_$FileInfo_102, {
                file: t,
                id: e.id,
                acquirers: e.acquirers,
                containerWidth: e.containerWidth,
                i18n: e.i18n
            }), __h_106(_$Buttons_101, {
                file: t,
                metaFields: e.metaFields,
                showLinkToFileUploadResult: e.showLinkToFileUploadResult,
                showRemoveButton: l,
                uploadInProgressOrComplete: o,
                removeFile: e.removeFile,
                toggleFileCard: e.toggleFileCard,
                i18n: e.i18n,
                log: e.log,
                info: e.info
            })))
        });

    function ___extends_107() {
        return (___extends_107 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var __h_107 = _$preact_53.h,
        _$FileList_107 = function(e) {
            var t = 0 === e.totalFileCount,
                r = _$classnames_9("uppy-Dashboard-files", {
                    "uppy-Dashboard-files--noFiles": t
                }),
                n = {
                    id: e.id,
                    error: e.error,
                    i18n: e.i18n,
                    log: e.log,
                    info: e.info,
                    acquirers: e.acquirers,
                    resumableUploads: e.resumableUploads,
                    individualCancellation: e.individualCancellation,
                    hideRetryButton: e.hideRetryButton,
                    hidePauseResumeCancelButtons: e.hidePauseResumeCancelButtons,
                    showLinkToFileUploadResult: e.showLinkToFileUploadResult,
                    isWide: e.isWide,
                    metaFields: e.metaFields,
                    retryUpload: e.retryUpload,
                    pauseUpload: e.pauseUpload,
                    cancelUpload: e.cancelUpload,
                    toggleFileCard: e.toggleFileCard,
                    removeFile: e.removeFile
                };
            return __h_107("ul", {
                class: r,
                tabindex: "-1"
            }, Object.keys(e.files).map(function(t) {
                return __h_107(_$FileItem_106, ___extends_107({
                    key: t
                }, n, {
                    file: e.files[t]
                }))
            }))
        };

    function _assertThisInitialized(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var localIcon = _$icons_111.localIcon,
        __h_97 = _$preact_53.h,
        AddFiles = function(e) {
            var t, r;

            function n(t) {
                var r;
                return (r = e.call(this, t) || this).triggerFileInputClick = r.triggerFileInputClick.bind(_assertThisInitialized(r)), r.handleFileInputChange = r.handleFileInputChange.bind(_assertThisInitialized(r)), r.renderPoweredByUppy = r.renderPoweredByUppy.bind(_assertThisInitialized(r)), r.renderHiddenFileInput = r.renderHiddenFileInput.bind(_assertThisInitialized(r)), r.renderDropPasteBrowseTagline = r.renderDropPasteBrowseTagline.bind(_assertThisInitialized(r)), r.renderMyDeviceAcquirer = r.renderMyDeviceAcquirer.bind(_assertThisInitialized(r)), r.renderAcquirer = r.renderAcquirer.bind(_assertThisInitialized(r)), r
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.triggerFileInputClick = function() {
                this.fileInput.click()
            }, o.handleFileInputChange = function(e) {
                this.props.handleInputChange(e), e.target.value = null
            }, o.renderPoweredByUppy = function() {
                return __h_97("a", {
                    tabindex: "-1",
                    href: "https://uppy.io",
                    rel: "noreferrer noopener",
                    target: "_blank",
                    class: "uppy-Dashboard-poweredBy"
                }, this.props.i18n("poweredBy") + " ", __h_97("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "UppyIcon uppy-Dashboard-poweredByIcon",
                    width: "11",
                    height: "11",
                    viewBox: "0 0 11 11"
                }, __h_97("path", {
                    d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
                    "fill-rule": "evenodd"
                })), __h_97("span", {
                    class: "uppy-Dashboard-poweredByUppy"
                }, "Uppy"))
            }, o.renderHiddenFileInput = function() {
                var e = this;
                return __h_97("input", {
                    class: "uppy-Dashboard-input",
                    hidden: !0,
                    "aria-hidden": "true",
                    tabindex: -1,
                    type: "file",
                    name: "files[]",
                    multiple: 1 !== this.props.maxNumberOfFiles,
                    onchange: this.handleFileInputChange,
                    accept: this.props.allowedFileTypes,
                    ref: function(t) {
                        e.fileInput = t
                    }
                })
            }, o.renderDropPasteBrowseTagline = function() {
                var e = __h_97("button", {
                    type: "button",
                    class: "uppy-u-reset uppy-Dashboard-browse",
                    onclick: this.triggerFileInputClick
                }, this.props.i18n("browse"));
                return __h_97("div", {
                    class: "uppy-Dashboard-dropFilesTitle"
                }, 0 === this.props.acquirers.length ? this.props.i18nArray("dropPaste", {
                    browse: e
                }) : this.props.i18nArray("dropPasteImport", {
                    browse: e
                }))
            }, o.renderMyDeviceAcquirer = function() {
                return __h_97("div", {
                    class: "uppy-DashboardTab",
                    role: "presentation"
                }, __h_97("button", {
                    type: "button",
                    class: "uppy-DashboardTab-btn",
                    role: "tab",
                    tabindex: 0,
                    "data-uppy-super-focusable": !0,
                    onclick: this.triggerFileInputClick
                }, localIcon(), __h_97("div", {
                    class: "uppy-DashboardTab-name"
                }, this.props.i18n("myDevice"))))
            }, o.renderAcquirer = function(e) {
                var t = this;
                return __h_97("div", {
                    class: "uppy-DashboardTab",
                    role: "presentation"
                }, __h_97("button", {
                    type: "button",
                    class: "uppy-DashboardTab-btn",
                    role: "tab",
                    tabindex: 0,
                    "aria-controls": "uppy-DashboardContent-panel--" + e.id,
                    "aria-selected": this.props.activePickerPanel.id === e.id,
                    "data-uppy-super-focusable": !0,
                    onclick: function() {
                        return t.props.showPanel(e.id)
                    }
                }, e.icon(), __h_97("div", {
                    class: "uppy-DashboardTab-name"
                }, e.name)))
            }, o.render = function() {
                var e = this;
                return __h_97("div", {
                    class: "uppy-DashboardAddFiles"
                }, this.renderHiddenFileInput(), __h_97("div", {
                    class: "uppy-DashboardTabs"
                }, this.renderDropPasteBrowseTagline(), this.props.acquirers.length > 0 && __h_97("div", {
                    class: "uppy-DashboardTabs-list",
                    role: "tablist"
                }, this.renderMyDeviceAcquirer(), this.props.acquirers.map(function(t) {
                    return e.renderAcquirer(t)
                }))), __h_97("div", {
                    class: "uppy-DashboardAddFiles-info"
                }, this.props.note && __h_97("div", {
                    class: "uppy-Dashboard-note"
                }, this.props.note), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy(this.props)))
            }, n
        }(_$preact_53.Component),
        _$AddFiles_97 = AddFiles,
        __h_98 = _$preact_53.h,
        _$AddFilesPanel_98 = function(e) {
            return __h_98("div", {
                class: "uppy-Dashboard-AddFilesPanel",
                "data-uppy-panelType": "AddFiles",
                "aria-hidden": e.showAddFilesPanel
            }, __h_98("div", {
                class: "uppy-DashboardContent-bar"
            }, __h_98("div", {
                class: "uppy-DashboardContent-title",
                role: "heading",
                "aria-level": "h1"
            }, e.i18n("addingMoreFiles")), __h_98("button", {
                class: "uppy-DashboardContent-back",
                type: "button",
                onclick: function(t) {
                    return e.toggleAddFilesPanel(!1)
                }
            }, e.i18n("back"))), __h_98(_$AddFiles_97, e))
        },
        _$ignoreEvent_117 = function(e) {
            var t = e.target.tagName;
            "INPUT" !== t && "TEXTAREA" !== t ? (e.preventDefault(), e.stopPropagation()) : e.stopPropagation()
        },
        __h_109 = _$preact_53.h,
        _$PickerPanelContent_109 = function(e) {
            return __h_109("div", {
                class: "uppy-DashboardContent-panel",
                role: "tabpanel",
                "data-uppy-panelType": "PickerPanel",
                id: "uppy-DashboardContent-panel--" + e.activePickerPanel.id,
                onDragOver: _$ignoreEvent_117,
                onDragLeave: _$ignoreEvent_117,
                onDrop: _$ignoreEvent_117,
                onPaste: _$ignoreEvent_117
            }, __h_109("div", {
                class: "uppy-DashboardContent-bar"
            }, __h_109("div", {
                class: "uppy-DashboardContent-title",
                role: "heading",
                "aria-level": "h1"
            }, e.i18n("importFrom", {
                name: e.activePickerPanel.name
            })), __h_109("button", {
                class: "uppy-DashboardContent-back",
                type: "button",
                onclick: e.hideAllPanels
            }, e.i18n("done"))), __h_109("div", {
                class: "uppy-DashboardContent-panelBody"
            }, e.getPlugin(e.activePickerPanel.id).render(e.state)))
        },
        __h_110 = _$preact_53.h,
        iconPlus = _$icons_111.iconPlus,
        uploadStates = {
            STATE_ERROR: "error",
            STATE_WAITING: "waiting",
            STATE_PREPROCESSING: "preprocessing",
            STATE_UPLOADING: "uploading",
            STATE_POSTPROCESSING: "postprocessing",
            STATE_COMPLETE: "complete",
            STATE_PAUSED: "paused"
        };

    function UploadStatus(e) {
        switch (function(e, t, r, n) {
            if (void 0 === n && (n = {}), e) return uploadStates.STATE_ERROR;
            if (t) return uploadStates.STATE_COMPLETE;
            if (r) return uploadStates.STATE_PAUSED;
            for (var o = uploadStates.STATE_WAITING, i = Object.keys(n), s = 0; s < i.length; s++) {
                var a = n[i[s]].progress;
                if (a.uploadStarted && !a.uploadComplete) return uploadStates.STATE_UPLOADING;
                a.preprocess && o !== uploadStates.STATE_UPLOADING && (o = uploadStates.STATE_PREPROCESSING), a.postprocess && o !== uploadStates.STATE_UPLOADING && o !== uploadStates.STATE_PREPROCESSING && (o = uploadStates.STATE_POSTPROCESSING)
            }
            return o
        }(e.isAllErrored, e.isAllComplete, e.isAllPaused, e.files)) {
            case "uploading":
                return e.i18n("uploadingXFiles", {
                    smart_count: e.inProgressNotPausedFiles.length
                });
            case "preprocessing":
            case "postprocessing":
                return e.i18n("processingXFiles", {
                    smart_count: e.processingFiles.length
                });
            case "paused":
                return e.i18n("uploadPaused");
            case "waiting":
                return e.i18n("xFilesSelected", {
                    smart_count: e.newFiles.length
                });
            case "complete":
                return e.i18n("uploadComplete")
        }
    }
    var _$PickerPanelTopBar_110 = function(e) {
        var t = e.allowNewUpload;
        return t && e.maxNumberOfFiles && (t = e.totalFileCount < e.maxNumberOfFiles), __h_110("div", {
            class: "uppy-DashboardContent-bar"
        }, e.isAllComplete ? __h_110("div", null) : __h_110("button", {
            class: "uppy-DashboardContent-back",
            type: "button",
            onclick: e.cancelAll
        }, e.i18n("cancel")), __h_110("div", {
            class: "uppy-DashboardContent-title",
            role: "heading",
            "aria-level": "h1"
        }, __h_110(UploadStatus, e)), t ? __h_110("button", {
            class: "uppy-DashboardContent-addMore",
            type: "button",
            "aria-label": e.i18n("addMoreFiles"),
            title: e.i18n("addMoreFiles"),
            onclick: function() {
                return e.toggleAddFilesPanel(!0)
            }
        }, iconPlus(), __h_110("span", {
            class: "uppy-DashboardContent-addMoreCaption"
        }, e.i18n("addMore"))) : __h_110("div", null))
    };

    function ___extends_100() {
        return (___extends_100 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var __h_100 = _$preact_53.h,
        __Component_100 = _$preact_53.Component,
        FileCard = function(e) {
            var t, r;

            function n(t) {
                var r;
                (r = e.call(this, t) || this).saveOnEnter = function(e) {
                    if (13 === e.keyCode) {
                        e.stopPropagation(), e.preventDefault();
                        var t = r.props.files[r.props.fileCardFor];
                        r.props.saveFileCard(r.state.formState, t.id)
                    }
                }, r.tempStoreMeta = function(e, t) {
                    var n;
                    r.setState({
                        formState: ___extends_100({}, r.state.formState, (n = {}, n[t] = e.target.value, n))
                    })
                }, r.handleSave = function() {
                    var e = r.props.fileCardFor;
                    r.props.saveFileCard(r.state.formState, e)
                }, r.handleCancel = function() {
                    r.props.toggleFileCard()
                }, r.renderMetaFields = function() {
                    return (r.props.metaFields || []).map(function(e) {
                        var t = "uppy-Dashboard-FileCard-input-" + e.id;
                        return __h_100("fieldset", {
                            key: e.id,
                            class: "uppy-Dashboard-FileCard-fieldset"
                        }, __h_100("label", {
                            class: "uppy-Dashboard-FileCard-label",
                            for: t
                        }, e.name), __h_100("input", {
                            class: "uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input",
                            id: t,
                            type: "text",
                            value: r.state.formState[e.id],
                            placeholder: e.placeholder,
                            onkeyup: r.saveOnEnter,
                            onkeydown: r.saveOnEnter,
                            onkeypress: r.saveOnEnter,
                            oninput: function(t) {
                                return r.tempStoreMeta(t, e.id)
                            },
                            "data-uppy-super-focusable": !0
                        }))
                    })
                };
                var n = r.props.files[r.props.fileCardFor],
                    o = r.props.metaFields || [],
                    i = {};
                return o.forEach(function(e) {
                    i[e.id] = n.meta[e.id] || ""
                }), r.state = {
                    formState: i
                }, r
            }
            return r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r, n.prototype.render = function() {
                var e = this.props.files[this.props.fileCardFor];
                return __h_100("div", {
                    class: "uppy-Dashboard-FileCard",
                    "data-uppy-panelType": "FileCard",
                    onDragOver: _$ignoreEvent_117,
                    onDragLeave: _$ignoreEvent_117,
                    onDrop: _$ignoreEvent_117,
                    onPaste: _$ignoreEvent_117
                }, __h_100("div", {
                    class: "uppy-DashboardContent-bar"
                }, __h_100("div", {
                    class: "uppy-DashboardContent-title",
                    role: "heading",
                    "aria-level": "h1"
                }, this.props.i18nArray("editing", {
                    file: __h_100("span", {
                        class: "uppy-DashboardContent-titleFile"
                    }, e.meta ? e.meta.name : e.name)
                })), __h_100("button", {
                    class: "uppy-DashboardContent-back",
                    type: "button",
                    title: this.props.i18n("finishEditingFile"),
                    onclick: this.handleSave
                }, this.props.i18n("done"))), __h_100("div", {
                    class: "uppy-Dashboard-FileCard-inner"
                }, __h_100("div", {
                    class: "uppy-Dashboard-FileCard-preview",
                    style: {
                        backgroundColor: _$getFileTypeIcon_116(e.type).color
                    }
                }, __h_100(_$FilePreview_108, {
                    file: e
                })), __h_100("div", {
                    class: "uppy-Dashboard-FileCard-info"
                }, this.renderMetaFields()), __h_100("div", {
                    class: "uppy-Dashboard-FileCard-actions"
                }, __h_100("button", {
                    class: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn",
                    type: "button",
                    onclick: this.handleSave
                }, this.props.i18n("saveChanges")), __h_100("button", {
                    class: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn",
                    type: "button",
                    onclick: this.handleCancel
                }, this.props.i18n("cancel")))))
            }, n
        }(__Component_100),
        _$FileCard_100 = FileCard,
        _$isTouchDevice_223 = function() {
            return "ontouchstart" in window || !!navigator.maxTouchPoints
        },
        _$preactCssTransitionGroup_52 = {
            exports: {}
        },
        __global_52, __factory_52;

    function ___extends_99() {
        return (___extends_99 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    __global_52 = this, __factory_52 = function(e) {
        "use strict";

        function t(e) {
            return e.attributes && e.attributes.key
        }

        function r(e) {
            return e.base
        }

        function n(e) {
            return e && e.filter(function(e) {
                return null !== e
            })
        }

        function o(e, t) {
            for (var r = e.length; r--;)
                if (t(e[r])) return !0;
            return !1
        }

        function i(e, r) {
            return o(e, function(e) {
                return t(e) === r
            })
        }

        function s(e, r) {
            return i(e, t(r))
        }

        function a(e, r, n) {
            return o(e, function(e) {
                return t(e) === r && e.props[n]
            })
        }

        function l(e, r, n) {
            return a(e, t(r), n)
        }
        var u = " ",
            c = /[\n\t\r]+/g,
            p = function(e) {
                return (u + e + u).replace(c, u)
            };

        function d(e, t) {
            var r;
            e.classList ? (r = e.classList).add.apply(r, t.split(" ")) : e.className += " " + t
        }

        function _(e, t) {
            if (t = t.trim(), e.classList) {
                var r;
                (r = e.classList).remove.apply(r, t.split(" "))
            } else {
                var n = e.className.trim(),
                    o = p(n);
                for (t = u + t + u; o.indexOf(t) >= 0;) o = o.replace(t, u);
                e.className = o.trim()
            }
        }
        var h = {
                transitionend: {
                    transition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "mozTransitionEnd",
                    OTransition: "oTransitionEnd",
                    msTransition: "MSTransitionEnd"
                },
                animationend: {
                    animation: "animationend",
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "mozAnimationEnd",
                    OAnimation: "oAnimationEnd",
                    msAnimation: "MSAnimationEnd"
                }
            },
            f = [];
        "undefined" != typeof window && function() {
            var e = document.createElement("div").style;
            for (var t in "AnimationEvent" in window || delete h.animationend.animation, "TransitionEvent" in window || delete h.transitionend.transition, h) {
                var r = h[t];
                for (var n in r)
                    if (n in e) {
                        f.push(r[n]);
                        break
                    }
            }
        }();
        var g = function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            },
            m = function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            },
            y = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            },
            v = function(e) {
                function t() {
                    var n, o;
                    g(this, t);
                    for (var i = arguments.length, s = Array(i), a = 0; a < i; a++) s[a] = arguments[a];
                    return n = o = y(this, e.call.apply(e, [this].concat(s))), o.flushClassNameQueue = function() {
                        r(o) && d(r(o), o.classNameQueue.join(" ")), o.classNameQueue.length = 0, o.timeout = null
                    }, y(o, n)
                }
                return m(t, e), t.prototype.transition = function(e, t, n) {
                    var o = this,
                        i = r(this),
                        s = this.props.name[e] || this.props.name + "-" + e,
                        a = this.props.name[e + "Active"] || s + "-active",
                        l = null;
                    this.endListener && this.endListener(), this.endListener = function(e) {
                        e && e.target !== i || (clearTimeout(l), _(i, s), _(i, a), function(e, t) {
                            f.length && f.forEach(function(r) {
                                e.removeEventListener(r, t, !1)
                            })
                        }(i, o.endListener), o.endListener = null, t && t())
                    }, n ? (l = setTimeout(this.endListener, n), this.transitionTimeouts.push(l)) : function(e, t) {
                        if (!f.length) return window.setTimeout(t, 0);
                        f.forEach(function(r) {
                            e.addEventListener(r, t, !1)
                        })
                    }(i, this.endListener), d(i, s), this.queueClass(a)
                }, t.prototype.queueClass = function(e) {
                    this.classNameQueue.push(e), this.timeout || (this.timeout = setTimeout(this.flushClassNameQueue, 17))
                }, t.prototype.stop = function() {
                    this.timeout && (clearTimeout(this.timeout), this.classNameQueue.length = 0, this.timeout = null), this.endListener && this.endListener()
                }, t.prototype.componentWillMount = function() {
                    this.classNameQueue = [], this.transitionTimeouts = []
                }, t.prototype.componentWillUnmount = function() {
                    this.timeout && clearTimeout(this.timeout), this.transitionTimeouts.forEach(function(e) {
                        clearTimeout(e)
                    })
                }, t.prototype.componentWillEnter = function(e) {
                    this.props.enter ? this.transition("enter", e, this.props.enterTimeout) : e()
                }, t.prototype.componentWillLeave = function(e) {
                    this.props.leave ? this.transition("leave", e, this.props.leaveTimeout) : e()
                }, t.prototype.render = function() {
                    return (e = this.props.children) && e[0];
                    var e
                }, t
            }(e.Component),
            b = function(r) {
                function o(n) {
                    g(this, o);
                    var i = y(this, r.call(this));
                    return i.renderChild = function(r) {
                        var n = i.props,
                            o = n.transitionName,
                            s = n.transitionEnter,
                            a = n.transitionLeave,
                            l = n.transitionEnterTimeout,
                            u = n.transitionLeaveTimeout,
                            c = t(r);
                        return e.h(v, {
                            key: c,
                            ref: function(e) {
                                (i.refs[c] = e) || (r = null)
                            },
                            name: o,
                            enter: s,
                            leave: a,
                            enterTimeout: l,
                            leaveTimeout: u
                        }, r)
                    }, i.refs = {}, i.state = {
                        children: (n.children || []).slice()
                    }, i
                }
                return m(o, r), o.prototype.shouldComponentUpdate = function(e, t) {
                    return t.children !== this.state.children
                }, o.prototype.componentWillMount = function() {
                    this.currentlyTransitioningKeys = {}, this.keysToEnter = [], this.keysToLeave = []
                }, o.prototype.componentWillReceiveProps = function(r) {
                    var o, a, u, c, p = this,
                        d = r.children,
                        _ = r.exclusive,
                        h = r.showProp,
                        f = n(d || []).slice(),
                        g = n(_ ? this.props.children : this.state.children),
                        m = (o = f, a = [], u = {}, c = [], g.forEach(function(e) {
                            var r = t(e);
                            i(o, r) ? c.length && (u[r] = c, c = []) : c.push(e)
                        }), o.forEach(function(e) {
                            var r = t(e);
                            u.hasOwnProperty(r) && (a = a.concat(u[r])), a.push(e)
                        }), a.concat(c));
                    h && (m = m.map(function(t) {
                        var r;
                        return !t.props[h] && l(g, t, h) && (t = e.cloneElement(t, ((r = {})[h] = !0, r))), t
                    })), _ && m.forEach(function(e) {
                        return p.stop(t(e))
                    }), this.setState({
                        children: m
                    }), this.forceUpdate(), f.forEach(function(e) {
                        var t = e.key,
                            r = g && s(g, e);
                        if (h) {
                            if (r) {
                                var n = l(g, e, h),
                                    o = e.props[h];
                                n || !o || p.currentlyTransitioningKeys[t] || p.keysToEnter.push(t)
                            }
                        } else r || p.currentlyTransitioningKeys[t] || p.keysToEnter.push(t)
                    }), g.forEach(function(e) {
                        var t = e.key,
                            r = f && s(f, e);
                        if (h) {
                            if (r) {
                                var n = l(f, e, h),
                                    o = e.props[h];
                                n || !o || p.currentlyTransitioningKeys[t] || p.keysToLeave.push(t)
                            }
                        } else r || p.currentlyTransitioningKeys[t] || p.keysToLeave.push(t)
                    })
                }, o.prototype.performEnter = function(e) {
                    var t = this;
                    this.currentlyTransitioningKeys[e] = !0;
                    var r = this.refs[e];
                    r.componentWillEnter ? r.componentWillEnter(function() {
                        return t._handleDoneEntering(e)
                    }) : this._handleDoneEntering(e)
                }, o.prototype._handleDoneEntering = function(e) {
                    delete this.currentlyTransitioningKeys[e];
                    var t = n(this.props.children),
                        r = this.props.showProp;
                    !t || !r && !i(t, e) || r && !a(t, e, r) ? this.performLeave(e) : this.setState({
                        children: t
                    })
                }, o.prototype.stop = function(e) {
                    delete this.currentlyTransitioningKeys[e];
                    var t = this.refs[e];
                    t && t.stop()
                }, o.prototype.performLeave = function(e) {
                    var t = this;
                    this.currentlyTransitioningKeys[e] = !0;
                    var r = this.refs[e];
                    r && r.componentWillLeave ? r.componentWillLeave(function() {
                        return t._handleDoneLeaving(e)
                    }) : this._handleDoneLeaving(e)
                }, o.prototype._handleDoneLeaving = function(e) {
                    delete this.currentlyTransitioningKeys[e];
                    var t = this.props.showProp,
                        r = n(this.props.children);
                    t && r && a(r, e, t) ? this.performEnter(e) : !t && r && i(r, e) ? this.performEnter(e) : this.setState({
                        children: r
                    })
                }, o.prototype.componentDidUpdate = function() {
                    var e = this,
                        t = this.keysToEnter,
                        r = this.keysToLeave;
                    this.keysToEnter = [], t.forEach(function(t) {
                        return e.performEnter(t)
                    }), this.keysToLeave = [], r.forEach(function(t) {
                        return e.performLeave(t)
                    })
                }, o.prototype.render = function(t, r) {
                    var o = t.component,
                        i = (t.transitionName, t.transitionEnter, t.transitionLeave, t.transitionEnterTimeout, t.transitionLeaveTimeout, t.children, function(e, t) {
                            var r = {};
                            for (var n in e) t.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
                            return r
                        }(t, ["component", "transitionName", "transitionEnter", "transitionLeave", "transitionEnterTimeout", "transitionLeaveTimeout", "children"])),
                        s = r.children;
                    return e.h(o, i, n(s).map(this.renderChild))
                }, o
            }(e.Component);
        return b.defaultProps = {
            component: "span",
            transitionEnter: !0,
            transitionLeave: !0
        }, b
    }, "object" == typeof _$preactCssTransitionGroup_52.exports ? _$preactCssTransitionGroup_52.exports = __factory_52(_$preact_53) : "function" == typeof define && define.amd ? define(["preact"], __factory_52) : __global_52.PreactCSSTransitionGroup = __factory_52(__global_52.preact), _$preactCssTransitionGroup_52 = _$preactCssTransitionGroup_52.exports;
    var __h_99 = _$preact_53.h;

    function TransitionWrapper(e) {
        return __h_99(_$preactCssTransitionGroup_52, {
            transitionName: "uppy-transition-slideDownUp",
            transitionEnterTimeout: 250,
            transitionLeaveTimeout: 250
        }, e.children)
    }
    var _$Dashboard_99 = function(e) {
            var t = 0 === e.totalFileCount,
                r = _$classnames_9({
                    "uppy-Root": e.isTargetDOMEl
                }, "uppy-Dashboard", {
                    "Uppy--isTouchDevice": _$isTouchDevice_223()
                }, {
                    "uppy-Dashboard--animateOpenClose": e.animateOpenClose
                }, {
                    "uppy-Dashboard--isClosing": e.isClosing
                }, {
                    "uppy-Dashboard--isDraggingOver": e.isDraggingOver
                }, {
                    "uppy-Dashboard--modal": !e.inline
                }, {
                    "uppy-size--md": e.containerWidth > 576
                }, {
                    "uppy-size--lg": e.containerWidth > 700
                }, {
                    "uppy-size--xl": e.containerWidth > 900
                }, {
                    "uppy-Dashboard--isAddFilesPanelVisible": e.showAddFilesPanel
                }, {
                    "uppy-Dashboard--isInnerWrapVisible": e.areInsidesReadyToBeVisible
                });
            return __h_99("div", {
                class: r,
                "aria-hidden": e.inline ? "false" : e.isHidden,
                "aria-label": e.inline ? e.i18n("dashboardTitle") : e.i18n("dashboardWindowTitle"),
                onpaste: e.handlePaste,
                onDragOver: e.handleDragOver,
                onDragLeave: e.handleDragLeave,
                onDrop: e.handleDrop
            }, __h_99("div", {
                class: "uppy-Dashboard-overlay",
                tabindex: -1,
                onclick: e.handleClickOutside
            }), __h_99("div", {
                class: "uppy-Dashboard-inner",
                "aria-modal": !e.inline && "true",
                role: !e.inline && "dialog",
                style: {
                    width: e.inline && e.width ? e.width : "",
                    height: e.inline && e.height ? e.height : ""
                }
            }, e.inline ? null : __h_99("button", {
                class: "uppy-u-reset uppy-Dashboard-close",
                type: "button",
                "aria-label": e.i18n("closeModal"),
                title: e.i18n("closeModal"),
                onclick: e.closeModal
            }, __h_99("span", {
                "aria-hidden": "true"
            }, "\xd7")), __h_99("div", {
                class: "uppy-Dashboard-innerWrap"
            }, __h_99("div", {
                class: "uppy-Dashboard-dropFilesHereHint"
            }, e.i18n("dropHint")), !t && e.showSelectedFiles && __h_99(_$PickerPanelTopBar_110, e), e.showSelectedFiles ? __h_99(t ? _$AddFiles_97 : _$FileList_107, e) : __h_99(_$AddFiles_97, e), __h_99(TransitionWrapper, null, e.showAddFilesPanel ? __h_99(_$AddFilesPanel_98, ___extends_99({
                key: "AddFilesPanel"
            }, e)) : null), __h_99(TransitionWrapper, null, e.fileCardFor ? __h_99(_$FileCard_100, ___extends_99({
                key: "FileCard"
            }, e)) : null), __h_99(TransitionWrapper, null, e.activePickerPanel ? __h_99(_$PickerPanelContent_109, ___extends_99({
                key: "PickerPanelContent"
            }, e)) : null), __h_99("div", {
                class: "uppy-Dashboard-progressindicators"
            }, e.progressindicators.map(function(t) {
                return e.getPlugin(t.id).render(e.state)
            })))))
        },
        _$StatusBarStates_160 = {
            STATE_ERROR: "error",
            STATE_WAITING: "waiting",
            STATE_PREPROCESSING: "preprocessing",
            STATE_UPLOADING: "uploading",
            STATE_POSTPROCESSING: "postprocessing",
            STATE_COMPLETE: "complete"
        },
        _$secondsToTime_227 = function(e) {
            return {
                hours: Math.floor(e / 3600) % 24,
                minutes: Math.floor(e / 60) % 60,
                seconds: Math.floor(e % 60)
            }
        },
        _$prettyETA_226 = function(e) {
            var t = _$secondsToTime_227(e),
                r = t.hours ? t.hours + "h " : "",
                n = t.hours ? ("0" + t.minutes).substr(-2) : t.minutes,
                o = n ? n + "m" : "",
                i = n ? ("0" + t.seconds).substr(-2) : t.seconds;
            return "" + r + o + (t.hours ? "" : n ? " " + i + "s" : i + "s")
        };

    function ___extends_159() {
        return (___extends_159 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var __h_159 = _$preact_53.h,
        _$StatusBar_159 = function(e) {
            var t, r, n = e = e || {},
                o = n.newFiles,
                i = n.allowNewUpload,
                s = n.isUploadInProgress,
                a = n.isAllPaused,
                l = n.resumableUploads,
                u = n.error,
                c = n.hideUploadButton,
                p = n.hidePauseResumeButton,
                d = n.hideCancelButton,
                _ = n.hideRetryButton,
                h = e.uploadState,
                f = e.totalProgress;
            if (h === _$StatusBarStates_160.STATE_PREPROCESSING || h === _$StatusBarStates_160.STATE_POSTPROCESSING) {
                var g = function(e) {
                    var t = [];
                    Object.keys(e).forEach(function(r) {
                        var n = e[r].progress;
                        n.preprocess && t.push(n.preprocess), n.postprocess && t.push(n.postprocess)
                    });
                    var r = t[0];
                    return {
                        mode: r.mode,
                        message: r.message,
                        value: t.filter(function(e) {
                            return "determinate" === e.mode
                        }).reduce(function(e, t, r, n) {
                            return e + t.value / n.length
                        }, 0)
                    }
                }(e.files);
                "determinate" === (t = g.mode) && (f = 100 * g.value), r = ProgressBarProcessing(g)
            } else h === _$StatusBarStates_160.STATE_COMPLETE ? r = ProgressBarComplete(e) : h === _$StatusBarStates_160.STATE_UPLOADING ? (e.supportsUploadProgress || (t = "indeterminate", f = null), r = ProgressBarUploading(e)) : h === _$StatusBarStates_160.STATE_ERROR && (f = void 0, r = ProgressBarError(e));
            var m = "number" == typeof f ? f : 100,
                y = h === _$StatusBarStates_160.STATE_WAITING && e.hideUploadButton || h === _$StatusBarStates_160.STATE_WAITING && !e.newFiles > 0 || h === _$StatusBarStates_160.STATE_COMPLETE && e.hideAfterFinish,
                v = !u && o && !s && !a && i && !c,
                b = !d && h !== _$StatusBarStates_160.STATE_WAITING && h !== _$StatusBarStates_160.STATE_COMPLETE,
                w = l && !p && h !== _$StatusBarStates_160.STATE_WAITING && h !== _$StatusBarStates_160.STATE_PREPROCESSING && h !== _$StatusBarStates_160.STATE_POSTPROCESSING && h !== _$StatusBarStates_160.STATE_COMPLETE,
                S = u && !_,
                P = "uppy-StatusBar-progress\n                           " + (t ? "is-" + t : ""),
                E = _$classnames_9({
                    "uppy-Root": e.isTargetDOMEl
                }, "uppy-StatusBar", "is-" + h);
            return __h_159("div", {
                class: E,
                "aria-hidden": y
            }, __h_159("div", {
                class: P,
                style: {
                    width: m + "%"
                },
                role: "progressbar",
                "aria-valuemin": "0",
                "aria-valuemax": "100",
                "aria-valuenow": f
            }), r, __h_159("div", {
                class: "uppy-StatusBar-actions"
            }, v ? __h_159(UploadBtn, ___extends_159({}, e, {
                uploadState: h
            })) : null, S ? __h_159(RetryBtn, e) : null, w ? __h_159(PauseResumeButton, e) : null, b ? __h_159(CancelBtn, e) : null))
        },
        UploadBtn = function(e) {
            var t = _$classnames_9("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", {
                "uppy-c-btn-primary": e.uploadState === _$StatusBarStates_160.STATE_WAITING
            });
            return __h_159("button", {
                type: "button",
                class: t,
                "aria-label": e.i18n("uploadXFiles", {
                    smart_count: e.newFiles
                }),
                onclick: e.startUpload,
                "data-uppy-super-focusable": !0
            }, e.newFiles && e.isUploadStarted ? e.i18n("uploadXNewFiles", {
                smart_count: e.newFiles
            }) : e.i18n("uploadXFiles", {
                smart_count: e.newFiles
            }))
        },
        RetryBtn = function(e) {
            return __h_159("button", {
                type: "button",
                class: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
                "aria-label": e.i18n("retryUpload"),
                onclick: e.retryAll,
                "data-uppy-super-focusable": !0
            }, __h_159("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "UppyIcon",
                width: "8",
                height: "10",
                viewBox: "0 0 8 10"
            }, __h_159("path", {
                d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z"
            })), e.i18n("retry"))
        },
        CancelBtn = function(e) {
            return __h_159("button", {
                type: "button",
                class: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
                title: e.i18n("cancel"),
                "aria-label": e.i18n("cancel"),
                onclick: e.cancelAll,
                "data-uppy-super-focusable": !0
            }, __h_159("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "UppyIcon",
                width: "16",
                height: "16",
                viewBox: "0 0 16 16"
            }, __h_159("g", {
                fill: "none",
                "fill-rule": "evenodd"
            }, __h_159("circle", {
                fill: "#888",
                cx: "8",
                cy: "8",
                r: "8"
            }), __h_159("path", {
                fill: "#FFF",
                d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z"
            }))))
        },
        PauseResumeButton = function(e) {
            var t = e.isAllPaused,
                r = (0, e.i18n)(t ? "resume" : "pause");
            return __h_159("button", {
                title: r,
                "aria-label": r,
                class: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
                type: "button",
                onclick: function() {
                    return function(e) {
                        if (!e.isAllComplete) return e.resumableUploads ? e.isAllPaused ? e.resumeAll() : e.pauseAll() : e.cancelAll()
                    }(e)
                },
                "data-uppy-super-focusable": !0
            }, __h_159("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "UppyIcon",
                width: "16",
                height: "16",
                viewBox: "0 0 16 16"
            }, __h_159("g", {
                fill: "none",
                "fill-rule": "evenodd"
            }, __h_159("circle", {
                fill: "#888",
                cx: "8",
                cy: "8",
                r: "8"
            }), __h_159("path", t ? {
                fill: "#FFF",
                d: "M6 4.25L11.5 8 6 11.75z"
            } : {
                d: "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z",
                fill: "#FFF"
            }))))
        },
        LoadingSpinner = function() {
            return __h_159("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "uppy-StatusBar-spinner",
                width: "14",
                height: "14"
            }, __h_159("path", {
                d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0",
                "fill-rule": "evenodd"
            }))
        },
        ProgressBarProcessing = function(e) {
            var t = Math.round(100 * e.value);
            return __h_159("div", {
                class: "uppy-StatusBar-content"
            }, __h_159(LoadingSpinner, null), "determinate" === e.mode ? t + "% \xb7 " : "", e.message)
        },
        UnknownProgressDetails = function(e) {
            return __h_159("div", {
                class: "uppy-StatusBar-statusSecondary"
            }, e.i18n("filesUploadedOfTotal", {
                complete: e.complete,
                smart_count: e.numUploads
            }))
        },
        UploadNewlyAddedFiles = function(e) {
            var t = _$classnames_9("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
            return __h_159("div", {
                class: "uppy-StatusBar-statusSecondary"
            }, __h_159("div", {
                class: "uppy-StatusBar-statusSecondaryHint"
            }, e.i18n("xMoreFilesAdded", {
                smart_count: e.newFiles
            })), __h_159("button", {
                type: "button",
                class: t,
                "aria-label": e.i18n("uploadXFiles", {
                    smart_count: e.newFiles
                }),
                onclick: e.startUpload
            }, e.i18n("upload")))
        },
        ThrottledProgressDetails = _$lodashThrottle_46(function(e) {
            var t = e.numUploads > 1;
            return __h_159("div", {
                class: "uppy-StatusBar-statusSecondary"
            }, t && e.i18n("filesUploadedOfTotal", {
                complete: e.complete,
                smart_count: e.numUploads
            }), __h_159("span", {
                class: "uppy-StatusBar-additionalInfo"
            }, t && " \xb7 ", e.i18n("dataUploadedOfTotal", {
                complete: _$prettyBytes_225(e.totalUploadedSize),
                total: _$prettyBytes_225(e.totalSize)
            }), " \xb7 ", e.i18n("xTimeLeft", {
                time: _$prettyETA_226(e.totalETA)
            })))
        }, 500, {
            leading: !0,
            trailing: !0
        }),
        ProgressBarUploading = function(e) {
            if (!e.isUploadStarted || e.isAllComplete) return null;
            var t = e.isAllPaused ? e.i18n("paused") : e.i18n("uploading"),
                r = e.newFiles && e.isUploadStarted;
            return __h_159("div", {
                class: "uppy-StatusBar-content",
                "aria-label": t,
                title: t
            }, e.isAllPaused ? null : __h_159(LoadingSpinner, null), __h_159("div", {
                class: "uppy-StatusBar-status"
            }, __h_159("div", {
                class: "uppy-StatusBar-statusPrimary"
            }, e.supportsUploadProgress ? t + ": " + e.totalProgress + "%" : t), e.isAllPaused || r || !e.showProgressDetails ? null : e.supportsUploadProgress ? __h_159(ThrottledProgressDetails, e) : __h_159(UnknownProgressDetails, e), r ? __h_159(UploadNewlyAddedFiles, e) : null))
        },
        ProgressBarComplete = function(e) {
            e.totalProgress;
            var t = e.i18n;
            return __h_159("div", {
                class: "uppy-StatusBar-content",
                role: "status",
                title: t("complete")
            }, __h_159("div", {
                class: "uppy-StatusBar-status"
            }, __h_159("div", {
                class: "uppy-StatusBar-statusPrimary"
            }, __h_159("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "uppy-StatusBar-statusIndicator UppyIcon",
                width: "15",
                height: "11",
                viewBox: "0 0 15 11"
            }, __h_159("path", {
                d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z"
            })), t("complete"))))
        },
        ProgressBarError = function(e) {
            var t = e.error,
                r = (e.retryAll, e.hideRetryButton, e.i18n);
            return __h_159("div", {
                class: "uppy-StatusBar-content",
                role: "alert",
                title: r("uploadFailed")
            }, __h_159("div", {
                class: "uppy-StatusBar-status"
            }, __h_159("div", {
                class: "uppy-StatusBar-statusPrimary"
            }, __h_159("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "uppy-StatusBar-statusIndicator UppyIcon",
                width: "11",
                height: "11",
                viewBox: "0 0 11 11"
            }, __h_159("path", {
                d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z"
            })), r("uploadFailed"))), __h_159("span", {
                class: "uppy-StatusBar-details",
                "aria-label": t,
                "data-microtip-position": "top-right",
                "data-microtip-size": "medium",
                role: "tooltip"
            }, "?"))
        },
        _$getSpeed_216 = function(e) {
            if (!e.bytesUploaded) return 0;
            var t = new Date - e.uploadStarted;
            return e.bytesUploaded / (t / 1e3)
        },
        _$getBytesRemaining_206 = function(e) {
            return e.bytesTotal - e.bytesUploaded
        },
        _$package_162 = {
            version: "1.4.0"
        },
        ___class_161, ___temp_161;

    function ___extends_161() {
        return (___extends_161 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ___assertThisInitialized_161(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __Plugin_161 = _$lib_93.Plugin,
        _$lib_161 = (___temp_161 = ___class_161 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).startUpload = function() {
                    return n.uppy.upload().catch(function(e) {
                        e.isRestriction || n.uppy.log(e.stack || e.message || e)
                    })
                }, n.id = n.opts.id || "StatusBar", n.title = "StatusBar", n.type = "progressindicator", n.defaultLocale = {
                    strings: {
                        uploading: 'Yükleniyor',
                        upload: 'Yükle',
                        complete: 'Yüklendi',
                        uploadFailed: 'Yükleme başarısız',
                        paused: 'Durdu',
                        retry: "Tekrar",
                        cancel: "Vazgeç",
                        pause: "Durdur",
                        resume: "Devam",
                        filesUploadedOfTotal: {
                            '0': '%{complete} / %{smart_count} dosya yüklendi',
                            '1': '%{complete} / %{smart_count} dosya yüklendi',
                            '2': '%{complete} / %{smart_count} dosya yüklendi'
                        },
                        dataUploadedOfTotal: '%{complete} / %{total}',
                        xTimeLeft: 'kalan süre %{time}',
                        uploadXFiles: {
                             '0': '%{smart_count} dosya',
                             '1': '%{smart_count} dosya',
                             '2': '%{smart_count} dosya'
                        },
                       uploadXNewFiles: {
                            '0': '+%{smart_count} dosya',
                            '1': '+%{smart_count} dosya',
                            '2': '+%{smart_count} dosya'
                        },
                        xMoreFilesAdded: {
                            '0': '%{smart_count} dosya daha eklendi',
                            '1': '%{smart_count} dosya daha eklendi',
                            '2': '%{smart_count} dosya daha eklendi'
                        }
                    }
                }, n.opts = ___extends_161({}, {
                    target: "body",
                    hideUploadButton: !1,
                    hideRetryButton: !1,
                    hidePauseResumeButton: !1,
                    hideCancelButton: !1,
                    showProgressDetails: !1,
                    hideAfterFinish: !0
                }, {}, r), n.i18nInit(), n.render = n.render.bind(___assertThisInitialized_161(n)), n.install = n.install.bind(___assertThisInitialized_161(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.setOptions = function(t) {
                e.prototype.setOptions.call(this, t), this.i18nInit()
            }, o.i18nInit = function() {
                this.translator = new _$Translator_199([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.setPluginState()
            }, o.getTotalSpeed = function(e) {
                var t = 0;
                return e.forEach(function(e) {
                    t += _$getSpeed_216(e.progress)
                }), t
            }, o.getTotalETA = function(e) {
                var t = this.getTotalSpeed(e);
                if (0 === t) return 0;
                var r = e.reduce(function(e, t) {
                    return e + _$getBytesRemaining_206(t.progress)
                }, 0);
                return Math.round(r / t * 10) / 10
            }, o.getUploadingState = function(e, t, r) {
                if (e) return _$StatusBarStates_160.STATE_ERROR;
                if (t) return _$StatusBarStates_160.STATE_COMPLETE;
                for (var n = _$StatusBarStates_160.STATE_WAITING, o = Object.keys(r), i = 0; i < o.length; i++) {
                    var s = r[o[i]].progress;
                    if (s.uploadStarted && !s.uploadComplete) return _$StatusBarStates_160.STATE_UPLOADING;
                    s.preprocess && n !== _$StatusBarStates_160.STATE_UPLOADING && (n = _$StatusBarStates_160.STATE_PREPROCESSING), s.postprocess && n !== _$StatusBarStates_160.STATE_UPLOADING && n !== _$StatusBarStates_160.STATE_PREPROCESSING && (n = _$StatusBarStates_160.STATE_POSTPROCESSING)
                }
                return n
            }, o.render = function(e) {
                var t = e.capabilities,
                    r = e.files,
                    n = e.allowNewUpload,
                    o = e.totalProgress,
                    i = e.error,
                    s = Object.keys(r).map(function(e) {
                        return r[e]
                    }),
                    a = s.filter(function(e) {
                        return !e.progress.uploadStarted && !e.progress.preprocess && !e.progress.postprocess
                    }),
                    l = s.filter(function(e) {
                        return e.progress.uploadStarted
                    }),
                    u = l.filter(function(e) {
                        return e.isPaused
                    }),
                    c = s.filter(function(e) {
                        return e.progress.uploadComplete
                    }),
                    p = s.filter(function(e) {
                        return e.error
                    }),
                    d = s.filter(function(e) {
                        return !e.progress.uploadComplete && e.progress.uploadStarted
                    }),
                    _ = d.filter(function(e) {
                        return !e.isPaused
                    }),
                    h = s.filter(function(e) {
                        return e.progress.uploadStarted || e.progress.preprocess || e.progress.postprocess
                    }),
                    f = s.filter(function(e) {
                        return e.progress.preprocess || e.progress.postprocess
                    }),
                    g = this.getTotalETA(_),
                    m = 0,
                    y = 0;
                l.forEach(function(e) {
                    m += e.progress.bytesTotal || 0, y += e.progress.bytesUploaded || 0
                });
                var v = l.length > 0,
                    b = 100 === o && c.length === Object.keys(r).length && 0 === f.length,
                    w = v && p.length === l.length,
                    S = 0 !== d.length && u.length === d.length,
                    P = d.length > 0,
                    E = t.resumableUploads || !1,
                    C = !1 !== t.uploadProgress;
                return _$StatusBar_159({
                    error: i,
                    uploadState: this.getUploadingState(w, b, e.files || {}),
                    allowNewUpload: n,
                    totalProgress: o,
                    totalSize: m,
                    totalUploadedSize: y,
                    isAllComplete: b,
                    isAllPaused: S,
                    isAllErrored: w,
                    isUploadStarted: v,
                    isUploadInProgress: P,
                    complete: c.length,
                    newFiles: a.length,
                    numUploads: h.length,
                    totalETA: g,
                    files: r,
                    i18n: this.i18n,
                    pauseAll: this.uppy.pauseAll,
                    resumeAll: this.uppy.resumeAll,
                    retryAll: this.uppy.retryAll,
                    cancelAll: this.uppy.cancelAll,
                    startUpload: this.startUpload,
                    resumableUploads: E,
                    supportsUploadProgress: C,
                    showProgressDetails: this.opts.showProgressDetails,
                    hideUploadButton: this.opts.hideUploadButton,
                    hideRetryButton: this.opts.hideRetryButton,
                    hidePauseResumeButton: this.opts.hidePauseResumeButton,
                    hideCancelButton: this.opts.hideCancelButton,
                    hideAfterFinish: this.opts.hideAfterFinish,
                    isTargetDOMEl: this.isTargetDOMEl
                })
            }, o.install = function() {
                var e = this.opts.target;
                e && this.mount(e, this)
            }, o.uninstall = function() {
                this.unmount()
            }, n
        }(__Plugin_161), ___class_161.VERSION = _$package_162.version, ___temp_161),
        _$package_139 = {
            version: "1.3.2"
        },
        ___class_138, ___temp_138;

    function ___extends_138() {
        return (___extends_138 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var __Plugin_138 = _$lib_93.Plugin,
        __h_138 = _$preact_53.h,
        _$lib_138 = (___temp_138 = ___class_138 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).type = "progressindicator", n.id = n.opts.id || "Informer", n.title = "Informer", n.opts = ___extends_138({}, {}, r), n.render = n.render.bind(function(e) {
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.render = function(e) {
                var t = e.info,
                    r = t.isHidden,
                    n = t.message,
                    o = t.details;
                return __h_138("div", {
                    class: "uppy uppy-Informer",
                    "aria-hidden": r
                }, __h_138("p", {
                    role: "alert"
                }, n, " ", o && __h_138("span", {
                    "aria-label": o,
                    "data-microtip-position": "top-left",
                    "data-microtip-size": "medium",
                    role: "tooltip"
                }, "?")))
            }, o.install = function() {
                var e = this.opts.target;
                e && this.mount(e, this)
            }, n
        }(__Plugin_138), ___class_138.VERSION = _$package_139.version, ___temp_138),
        _$exif_35 = {
            exports: {}
        };
    (function() {
        var e = !1,
            t = function(e) {
                return e instanceof t ? e : this instanceof t ? void(this.EXIFwrapped = e) : new t(e)
            };
        void 0 !== _$exif_35.exports ? (_$exif_35.exports && (_$exif_35.exports = _$exif_35.exports = t), _$exif_35.exports.EXIF = t) : this.EXIF = t;
        var r = t.Tags = {
                36864: "ExifVersion",
                40960: "FlashpixVersion",
                40961: "ColorSpace",
                40962: "PixelXDimension",
                40963: "PixelYDimension",
                37121: "ComponentsConfiguration",
                37122: "CompressedBitsPerPixel",
                37500: "MakerNote",
                37510: "UserComment",
                40964: "RelatedSoundFile",
                36867: "DateTimeOriginal",
                36868: "DateTimeDigitized",
                37520: "SubsecTime",
                37521: "SubsecTimeOriginal",
                37522: "SubsecTimeDigitized",
                33434: "ExposureTime",
                33437: "FNumber",
                34850: "ExposureProgram",
                34852: "SpectralSensitivity",
                34855: "ISOSpeedRatings",
                34856: "OECF",
                37377: "ShutterSpeedValue",
                37378: "ApertureValue",
                37379: "BrightnessValue",
                37380: "ExposureBias",
                37381: "MaxApertureValue",
                37382: "SubjectDistance",
                37383: "MeteringMode",
                37384: "LightSource",
                37385: "Flash",
                37396: "SubjectArea",
                37386: "FocalLength",
                41483: "FlashEnergy",
                41484: "SpatialFrequencyResponse",
                41486: "FocalPlaneXResolution",
                41487: "FocalPlaneYResolution",
                41488: "FocalPlaneResolutionUnit",
                41492: "SubjectLocation",
                41493: "ExposureIndex",
                41495: "SensingMethod",
                41728: "FileSource",
                41729: "SceneType",
                41730: "CFAPattern",
                41985: "CustomRendered",
                41986: "ExposureMode",
                41987: "WhiteBalance",
                41988: "DigitalZoomRation",
                41989: "FocalLengthIn35mmFilm",
                41990: "SceneCaptureType",
                41991: "GainControl",
                41992: "Contrast",
                41993: "Saturation",
                41994: "Sharpness",
                41995: "DeviceSettingDescription",
                41996: "SubjectDistanceRange",
                40965: "InteroperabilityIFDPointer",
                42016: "ImageUniqueID"
            },
            o = t.TiffTags = {
                256: "ImageWidth",
                257: "ImageHeight",
                34665: "ExifIFDPointer",
                34853: "GPSInfoIFDPointer",
                40965: "InteroperabilityIFDPointer",
                258: "BitsPerSample",
                259: "Compression",
                262: "PhotometricInterpretation",
                274: "Orientation",
                277: "SamplesPerPixel",
                284: "PlanarConfiguration",
                530: "YCbCrSubSampling",
                531: "YCbCrPositioning",
                282: "XResolution",
                283: "YResolution",
                296: "ResolutionUnit",
                273: "StripOffsets",
                278: "RowsPerStrip",
                279: "StripByteCounts",
                513: "JPEGInterchangeFormat",
                514: "JPEGInterchangeFormatLength",
                301: "TransferFunction",
                318: "WhitePoint",
                319: "PrimaryChromaticities",
                529: "YCbCrCoefficients",
                532: "ReferenceBlackWhite",
                306: "DateTime",
                270: "ImageDescription",
                271: "Make",
                272: "Model",
                305: "Software",
                315: "Artist",
                33432: "Copyright"
            },
            i = t.GPSTags = {
                0: "GPSVersionID",
                1: "GPSLatitudeRef",
                2: "GPSLatitude",
                3: "GPSLongitudeRef",
                4: "GPSLongitude",
                5: "GPSAltitudeRef",
                6: "GPSAltitude",
                7: "GPSTimeStamp",
                8: "GPSSatellites",
                9: "GPSStatus",
                10: "GPSMeasureMode",
                11: "GPSDOP",
                12: "GPSSpeedRef",
                13: "GPSSpeed",
                14: "GPSTrackRef",
                15: "GPSTrack",
                16: "GPSImgDirectionRef",
                17: "GPSImgDirection",
                18: "GPSMapDatum",
                19: "GPSDestLatitudeRef",
                20: "GPSDestLatitude",
                21: "GPSDestLongitudeRef",
                22: "GPSDestLongitude",
                23: "GPSDestBearingRef",
                24: "GPSDestBearing",
                25: "GPSDestDistanceRef",
                26: "GPSDestDistance",
                27: "GPSProcessingMethod",
                28: "GPSAreaInformation",
                29: "GPSDateStamp",
                30: "GPSDifferential"
            },
            s = t.IFD1Tags = {
                256: "ImageWidth",
                257: "ImageHeight",
                258: "BitsPerSample",
                259: "Compression",
                262: "PhotometricInterpretation",
                273: "StripOffsets",
                274: "Orientation",
                277: "SamplesPerPixel",
                278: "RowsPerStrip",
                279: "StripByteCounts",
                282: "XResolution",
                283: "YResolution",
                284: "PlanarConfiguration",
                296: "ResolutionUnit",
                513: "JpegIFOffset",
                514: "JpegIFByteCount",
                529: "YCbCrCoefficients",
                530: "YCbCrSubSampling",
                531: "YCbCrPositioning",
                532: "ReferenceBlackWhite"
            },
            a = t.StringValues = {
                ExposureProgram: {
                    0: "Not defined",
                    1: "Manual",
                    2: "Normal program",
                    3: "Aperture priority",
                    4: "Shutter priority",
                    5: "Creative program",
                    6: "Action program",
                    7: "Portrait mode",
                    8: "Landscape mode"
                },
                MeteringMode: {
                    0: "Unknown",
                    1: "Average",
                    2: "CenterWeightedAverage",
                    3: "Spot",
                    4: "MultiSpot",
                    5: "Pattern",
                    6: "Partial",
                    255: "Other"
                },
                LightSource: {
                    0: "Unknown",
                    1: "Daylight",
                    2: "Fluorescent",
                    3: "Tungsten (incandescent light)",
                    4: "Flash",
                    9: "Fine weather",
                    10: "Cloudy weather",
                    11: "Shade",
                    12: "Daylight fluorescent (D 5700 - 7100K)",
                    13: "Day white fluorescent (N 4600 - 5400K)",
                    14: "Cool white fluorescent (W 3900 - 4500K)",
                    15: "White fluorescent (WW 3200 - 3700K)",
                    17: "Standard light A",
                    18: "Standard light B",
                    19: "Standard light C",
                    20: "D55",
                    21: "D65",
                    22: "D75",
                    23: "D50",
                    24: "ISO studio tungsten",
                    255: "Other"
                },
                Flash: {
                    0: "Flash did not fire",
                    1: "Flash fired",
                    5: "Strobe return light not detected",
                    7: "Strobe return light detected",
                    9: "Flash fired, compulsory flash mode",
                    13: "Flash fired, compulsory flash mode, return light not detected",
                    15: "Flash fired, compulsory flash mode, return light detected",
                    16: "Flash did not fire, compulsory flash mode",
                    24: "Flash did not fire, auto mode",
                    25: "Flash fired, auto mode",
                    29: "Flash fired, auto mode, return light not detected",
                    31: "Flash fired, auto mode, return light detected",
                    32: "No flash function",
                    65: "Flash fired, red-eye reduction mode",
                    69: "Flash fired, red-eye reduction mode, return light not detected",
                    71: "Flash fired, red-eye reduction mode, return light detected",
                    73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                    77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                    79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                    89: "Flash fired, auto mode, red-eye reduction mode",
                    93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                    95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
                },
                SensingMethod: {
                    1: "Not defined",
                    2: "One-chip color area sensor",
                    3: "Two-chip color area sensor",
                    4: "Three-chip color area sensor",
                    5: "Color sequential area sensor",
                    7: "Trilinear sensor",
                    8: "Color sequential linear sensor"
                },
                SceneCaptureType: {
                    0: "Standard",
                    1: "Landscape",
                    2: "Portrait",
                    3: "Night scene"
                },
                SceneType: {
                    1: "Directly photographed"
                },
                CustomRendered: {
                    0: "Normal process",
                    1: "Custom process"
                },
                WhiteBalance: {
                    0: "Auto white balance",
                    1: "Manual white balance"
                },
                GainControl: {
                    0: "None",
                    1: "Low gain up",
                    2: "High gain up",
                    3: "Low gain down",
                    4: "High gain down"
                },
                Contrast: {
                    0: "Normal",
                    1: "Soft",
                    2: "Hard"
                },
                Saturation: {
                    0: "Normal",
                    1: "Low saturation",
                    2: "High saturation"
                },
                Sharpness: {
                    0: "Normal",
                    1: "Soft",
                    2: "Hard"
                },
                SubjectDistanceRange: {
                    0: "Unknown",
                    1: "Macro",
                    2: "Close view",
                    3: "Distant view"
                },
                FileSource: {
                    3: "DSC"
                },
                Components: {
                    0: "",
                    1: "Y",
                    2: "Cb",
                    3: "Cr",
                    4: "R",
                    5: "G",
                    6: "B"
                }
            };

        function l(e) {
            return !!e.exifdata
        }

        function u(r, n) {
            function o(o) {
                var i = c(o);
                r.exifdata = i || {};
                var s = function(t) {
                    var r = new DataView(t);
                    if (e && console.log("Got file of length " + t.byteLength), 255 != r.getUint8(0) || 216 != r.getUint8(1)) return e && console.log("Not a valid JPEG"), !1;
                    for (var n = 2, o = t.byteLength, i = function(e, t) {
                            return 56 === e.getUint8(t) && 66 === e.getUint8(t + 1) && 73 === e.getUint8(t + 2) && 77 === e.getUint8(t + 3) && 4 === e.getUint8(t + 4) && 4 === e.getUint8(t + 5)
                        }; n < o;) {
                        if (i(r, n)) {
                            var s = r.getUint8(n + 7);
                            return s % 2 != 0 && (s += 1), 0 === s && (s = 4), d(t, n + 8 + s, r.getUint16(n + 6 + s))
                        }
                        n++
                    }
                }(o);
                if (r.iptcdata = s || {}, t.isXmpEnabled) {
                    var a = function(t) {
                        if ("DOMParser" in self) {
                            var r = new DataView(t);
                            if (e && console.log("Got file of length " + t.byteLength), 255 != r.getUint8(0) || 216 != r.getUint8(1)) return e && console.log("Not a valid JPEG"), !1;
                            for (var n = 2, o = t.byteLength, i = new DOMParser; n < o - 4;) {
                                if ("http" == f(r, n, 4)) {
                                    var s = n - 1,
                                        a = r.getUint16(n - 2) - 1,
                                        l = f(r, s, a),
                                        u = l.indexOf("xmpmeta>") + 8,
                                        c = (l = l.substring(l.indexOf("<x:xmpmeta"), u)).indexOf("x:xmpmeta") + 10;
                                    return l = l.slice(0, c) + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tiff="http://ns.adobe.com/tiff/1.0/" xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" xmlns:exif="http://ns.adobe.com/exif/1.0/" xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" ' + l.slice(c), y(i.parseFromString(l, "text/xml"))
                                }
                                n++
                            }
                        }
                    }(o);
                    r.xmpdata = a || {}
                }
                n && n.call(r)
            }
            if (r.src)
                if (/^data\:/i.test(r.src)) o(function(e, t) {
                    t = t || e.match(/^data\:([^\;]+)\;base64,/im)[1] || "", e = e.replace(/^data\:([^\;]+)\;base64,/gim, "");
                    for (var r = atob(e), n = r.length, o = new ArrayBuffer(n), i = new Uint8Array(o), s = 0; s < n; s++) i[s] = r.charCodeAt(s);
                    return o
                }(r.src));
                else if (/^blob\:/i.test(r.src))(s = new FileReader).onload = function(e) {
                    o(e.target.result)
                },
                function(e, t) {
                    var r = new XMLHttpRequest;
                    r.open("GET", e, !0), r.responseType = "blob", r.onload = function(e) {
                        var t;
                        200 != this.status && 0 !== this.status || (t = this.response, s.readAsArrayBuffer(t))
                    }, r.send()
                }(r.src);
            else {
                var i = new XMLHttpRequest;
                i.onload = function() {
                    if (200 != this.status && 0 !== this.status) throw "Could not load image";
                    o(i.response), i = null
                }, i.open("GET", r.src, !0), i.responseType = "arraybuffer", i.send(null)
            } else if (self.FileReader && (r instanceof self.Blob || r instanceof self.File)) {
                var s;
                (s = new FileReader).onload = function(t) {
                    e && console.log("Got file of length " + t.target.result.byteLength), o(t.target.result)
                }, s.readAsArrayBuffer(r)
            }
        }

        function c(t) {
            var r = new DataView(t);
            if (e && console.log("Got file of length " + t.byteLength), 255 != r.getUint8(0) || 216 != r.getUint8(1)) return e && console.log("Not a valid JPEG"), !1;
            for (var n, o = 2, i = t.byteLength; o < i;) {
                if (255 != r.getUint8(o)) return e && console.log("Not a valid marker at offset " + o + ", found: " + r.getUint8(o)), !1;
                if (n = r.getUint8(o + 1), e && console.log(n), 225 == n) return e && console.log("Found 0xFFE1 marker"), g(r, o + 4, r.getUint16(o + 2));
                o += 2 + r.getUint16(o + 2)
            }
        }
        var p = {
            120: "caption",
            110: "credit",
            25: "keywords",
            55: "dateCreated",
            80: "byline",
            85: "bylineTitle",
            122: "captionWriter",
            105: "headline",
            116: "copyright",
            15: "category"
        };

        function d(e, t, r) {
            for (var n, o, i, s, a = new DataView(e), l = {}, u = t; u < t + r;) 28 === a.getUint8(u) && 2 === a.getUint8(u + 1) && (s = a.getUint8(u + 2)) in p && (i = a.getInt16(u + 3), o = p[s], n = f(a, u + 5, i), l.hasOwnProperty(o) ? l[o] instanceof Array ? l[o].push(n) : l[o] = [l[o], n] : l[o] = n), u++;
            return l
        }

        function _(t, r, n, o, i) {
            var s, a, l, u = t.getUint16(n, !i),
                c = {};
            for (l = 0; l < u; l++) s = n + 12 * l + 2, !(a = o[t.getUint16(s, !i)]) && e && console.log("Unknown tag: " + t.getUint16(s, !i)), c[a] = h(t, s, r, n, i);
            return c
        }

        function h(e, t, r, n, o) {
            var i, s, a, l, u, c, p = e.getUint16(t + 2, !o),
                d = e.getUint32(t + 4, !o),
                _ = e.getUint32(t + 8, !o) + r;
            switch (p) {
                case 1:
                case 7:
                    if (1 == d) return e.getUint8(t + 8, !o);
                    for (i = d > 4 ? _ : t + 8, s = [], l = 0; l < d; l++) s[l] = e.getUint8(i + l);
                    return s;
                case 2:
                    return f(e, i = d > 4 ? _ : t + 8, d - 1);
                case 3:
                    if (1 == d) return e.getUint16(t + 8, !o);
                    for (i = d > 2 ? _ : t + 8, s = [], l = 0; l < d; l++) s[l] = e.getUint16(i + 2 * l, !o);
                    return s;
                case 4:
                    if (1 == d) return e.getUint32(t + 8, !o);
                    for (s = [], l = 0; l < d; l++) s[l] = e.getUint32(_ + 4 * l, !o);
                    return s;
                case 5:
                    if (1 == d) return u = e.getUint32(_, !o), c = e.getUint32(_ + 4, !o), (a = new Number(u / c)).numerator = u, a.denominator = c, a;
                    for (s = [], l = 0; l < d; l++) u = e.getUint32(_ + 8 * l, !o), c = e.getUint32(_ + 4 + 8 * l, !o), s[l] = new Number(u / c), s[l].numerator = u, s[l].denominator = c;
                    return s;
                case 9:
                    if (1 == d) return e.getInt32(t + 8, !o);
                    for (s = [], l = 0; l < d; l++) s[l] = e.getInt32(_ + 4 * l, !o);
                    return s;
                case 10:
                    if (1 == d) return e.getInt32(_, !o) / e.getInt32(_ + 4, !o);
                    for (s = [], l = 0; l < d; l++) s[l] = e.getInt32(_ + 8 * l, !o) / e.getInt32(_ + 4 + 8 * l, !o);
                    return s
            }
        }

        function f(e, t, r) {
            var o = "";
            for (n = t; n < t + r; n++) o += String.fromCharCode(e.getUint8(n));
            return o
        }

        function g(t, n) {
            if ("Exif" != f(t, n, 4)) return e && console.log("Not valid EXIF data! " + f(t, n, 4)), !1;
            var l, u, c, p, d, h = n + 6;
            if (18761 == t.getUint16(h)) l = !1;
            else {
                if (19789 != t.getUint16(h)) return e && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"), !1;
                l = !0
            }
            if (42 != t.getUint16(h + 2, !l)) return e && console.log("Not valid TIFF data! (no 0x002A)"), !1;
            var g = t.getUint32(h + 4, !l);
            if (g < 8) return e && console.log("Not valid TIFF data! (First offset less than 8)", t.getUint32(h + 4, !l)), !1;
            if ((u = _(t, h, h + g, o, l)).ExifIFDPointer)
                for (c in p = _(t, h, h + u.ExifIFDPointer, r, l)) {
                    switch (c) {
                        case "LightSource":
                        case "Flash":
                        case "MeteringMode":
                        case "ExposureProgram":
                        case "SensingMethod":
                        case "SceneCaptureType":
                        case "SceneType":
                        case "CustomRendered":
                        case "WhiteBalance":
                        case "GainControl":
                        case "Contrast":
                        case "Saturation":
                        case "Sharpness":
                        case "SubjectDistanceRange":
                        case "FileSource":
                            p[c] = a[c][p[c]];
                            break;
                        case "ExifVersion":
                        case "FlashpixVersion":
                            p[c] = String.fromCharCode(p[c][0], p[c][1], p[c][2], p[c][3]);
                            break;
                        case "ComponentsConfiguration":
                            p[c] = a.Components[p[c][0]] + a.Components[p[c][1]] + a.Components[p[c][2]] + a.Components[p[c][3]]
                    }
                    u[c] = p[c]
                }
            if (u.GPSInfoIFDPointer)
                for (c in d = _(t, h, h + u.GPSInfoIFDPointer, i, l)) {
                    switch (c) {
                        case "GPSVersionID":
                            d[c] = d[c][0] + "." + d[c][1] + "." + d[c][2] + "." + d[c][3]
                    }
                    u[c] = d[c]
                }
            return u.thumbnail = function(e, t, r, n) {
                var o = function(e, t, r) {
                    var n = e.getUint16(t, !r);
                    return e.getUint32(t + 2 + 12 * n, !r)
                }(e, t + r, n);
                if (!o) return {};
                if (o > e.byteLength) return {};
                var i = _(e, t, t + o, s, n);
                if (i.Compression) switch (i.Compression) {
                    case 6:
                        if (i.JpegIFOffset && i.JpegIFByteCount) {
                            var a = t + i.JpegIFOffset,
                                l = i.JpegIFByteCount;
                            i.blob = new Blob([new Uint8Array(e.buffer, a, l)], {
                                type: "image/jpeg"
                            })
                        }
                        break;
                    case 1:
                        console.log("Thumbnail image format is TIFF, which is not implemented.");
                        break;
                    default:
                        console.log("Unknown thumbnail image format '%s'", i.Compression)
                } else 2 == i.PhotometricInterpretation && console.log("Thumbnail image format is RGB, which is not implemented.");
                return i
            }(t, h, g, l), u
        }

        function m(e) {
            var t = {};
            if (1 == e.nodeType) {
                if (e.attributes.length > 0) {
                    t["@attributes"] = {};
                    for (var r = 0; r < e.attributes.length; r++) {
                        var n = e.attributes.item(r);
                        t["@attributes"][n.nodeName] = n.nodeValue
                    }
                }
            } else if (3 == e.nodeType) return e.nodeValue;
            if (e.hasChildNodes())
                for (var o = 0; o < e.childNodes.length; o++) {
                    var i = e.childNodes.item(o),
                        s = i.nodeName;
                    if (null == t[s]) t[s] = m(i);
                    else {
                        if (null == t[s].push) {
                            var a = t[s];
                            t[s] = [], t[s].push(a)
                        }
                        t[s].push(m(i))
                    }
                }
            return t
        }

        function y(e) {
            try {
                var t = {};
                if (e.children.length > 0)
                    for (var r = 0; r < e.children.length; r++) {
                        var n = e.children.item(r),
                            o = n.attributes;
                        for (var i in o) {
                            var s = o[i],
                                a = s.nodeName,
                                l = s.nodeValue;
                            void 0 !== a && (t[a] = l)
                        }
                        var u = n.nodeName;
                        if (void 0 === t[u]) t[u] = m(n);
                        else {
                            if (void 0 === t[u].push) {
                                var c = t[u];
                                t[u] = [], t[u].push(c)
                            }
                            t[u].push(m(n))
                        }
                    } else t = e.textContent;
                return t
            } catch (p) {
                console.log(p.message)
            }
        }
        t.enableXmp = function() {
            t.isXmpEnabled = !0
        }, t.disableXmp = function() {
            t.isXmpEnabled = !1
        }, t.getData = function(e, t) {
            return !((self.Image && e instanceof self.Image || self.HTMLImageElement && e instanceof self.HTMLImageElement) && !e.complete || (l(e) ? t && t.call(e) : u(e, t), 0))
        }, t.getTag = function(e, t) {
            if (l(e)) return e.exifdata[t]
        }, t.getIptcTag = function(e, t) {
            if (l(e)) return e.iptcdata[t]
        }, t.getAllTags = function(e) {
            if (!l(e)) return {};
            var t, r = e.exifdata,
                n = {};
            for (t in r) r.hasOwnProperty(t) && (n[t] = r[t]);
            return n
        }, t.getAllIptcTags = function(e) {
            if (!l(e)) return {};
            var t, r = e.iptcdata,
                n = {};
            for (t in r) r.hasOwnProperty(t) && (n[t] = r[t]);
            return n
        }, t.pretty = function(e) {
            if (!l(e)) return "";
            var t, r = e.exifdata,
                n = "";
            for (t in r) r.hasOwnProperty(t) && ("object" == typeof r[t] ? r[t] instanceof Number ? n += t + " : " + r[t] + " [" + r[t].numerator + "/" + r[t].denominator + "]\r\n" : n += t + " : [" + r[t].length + " values]\r\n" : n += t + " : " + r[t] + "\r\n");
            return n
        }, t.readFromBinaryFile = function(e) {
            return c(e)
        }, "function" == typeof define && define.amd && define("exif-js", [], function() {
            return t
        })
    }).call(this), _$exif_35 = _$exif_35.exports;
    var _$dataURItoBlob_201 = function(e, t, r) {
            var n = e.split(",")[1],
                o = t.mimeType || e.split(",")[0].split(":")[1].split(";")[0];
            null == o && (o = "plain/text");
            for (var i, s = atob(n), a = [], l = 0; l < s.length; l++) a.push(s.charCodeAt(l));
            try {
                i = new Uint8Array(a)
            } catch (err) {
                return null
            }
            return r ? new File([i], t.name || "", {
                type: o
            }) : new Blob([i], {
                type: o
            })
        },
        _$isObjectURL_221 = function(e) {
            return 0 === e.indexOf("blob:")
        },
        _$imageOrientations_167 = {
            1: {
                rotation: 0,
                xScale: 1,
                yScale: 1
            },
            2: {
                rotation: 0,
                xScale: -1,
                yScale: 1
            },
            3: {
                rotation: 180,
                xScale: 1,
                yScale: 1
            },
            4: {
                rotation: 180,
                xScale: -1,
                yScale: 1
            },
            5: {
                rotation: 90,
                xScale: 1,
                yScale: -1
            },
            6: {
                rotation: 90,
                xScale: 1,
                yScale: 1
            },
            7: {
                rotation: 270,
                xScale: 1,
                yScale: -1
            },
            8: {
                rotation: 270,
                xScale: 1,
                yScale: 1
            }
        },
        _$package_169 = {
            version: "1.5.0"
        },
        ___class_168, ___temp_168;

    function ___extends_168() {
        return (___extends_168 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var __Plugin_168 = _$lib_93.Plugin,
        _$lib_168 = (___temp_168 = ___class_168 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).onFileAdded = function(e) {
                    e.preview || n.addToQueue(e)
                }, n.onFileRemoved = function(e) {
                    var t = n.queue.indexOf(e); - 1 !== t && n.queue.splice(t, 1), e.preview && _$isObjectURL_221(e.preview) && URL.revokeObjectURL(e.preview)
                }, n.onRestored = function() {
                    var e = n.uppy.getState().files;
                    Object.keys(e).forEach(function(e) {
                        var t = n.uppy.getFile(e);
                        t.isRestored && (t.preview && !_$isObjectURL_221(t.preview) || n.addToQueue(t))
                    })
                }, n.waitUntilAllProcessed = function(e) {
                    return e.forEach(function(e) {
                        var t = n.uppy.getFile(e);
                        n.uppy.emit("preprocess-progress", t, {
                            mode: "indeterminate",
                            message: n.i18n("generatingThumbnails")
                        })
                    }), new Promise(function(e, t) {
                        n.queueProcessing ? n.uppy.once("thumbnail:all-generated", function() {
                            e()
                        }) : e()
                    })
                }, n.type = "modifier", n.id = n.opts.id || "ThumbnailGenerator", n.title = "Thumbnail Generator", n.queue = [], n.queueProcessing = !1, n.defaultThumbnailDimension = 200, n.defaultLocale = {
                    strings: {
                        generatingThumbnails: "thumbnails Oluşturuluyor"
                    }
                }, n.opts = ___extends_168({}, {
                    thumbnailWidth: null,
                    thumbnailHeight: null,
                    waitForThumbnailsBeforeUpload: !1
                }, {}, r), n.i18nInit(), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.setOptions = function(t) {
                e.prototype.setOptions.call(this, t), this.i18nInit()
            }, o.i18nInit = function() {
                this.translator = new _$Translator_199([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.setPluginState()
            }, o.createThumbnail = function(e, t, r) {
                var n = this,
                    o = URL.createObjectURL(e.data),
                    i = new Promise(function(e, t) {
                        var r = new Image;
                        r.src = o, r.addEventListener("load", function() {
                            URL.revokeObjectURL(o), e(r)
                        }), r.addEventListener("error", function(e) {
                            URL.revokeObjectURL(o), t(e.error || new Error("Could not create thumbnail"))
                        })
                    });
                return Promise.all([i, this.getOrientation(e)]).then(function(e) {
                    var o = e[0],
                        i = e[1],
                        s = n.getProportionalDimensions(o, t, r, i.rotation),
                        a = n.rotateImage(o, i),
                        l = n.resizeImage(a, s.width, s.height);
                    return n.canvasToBlob(l, "image/png")
                }).then(function(e) {
                    return URL.createObjectURL(e)
                })
            }, o.getProportionalDimensions = function(e, t, r, n) {
                var o = e.width / e.height;
                return 90 !== n && 270 !== n || (o = e.height / e.width), null != t ? {
                    width: t,
                    height: Math.round(t / o)
                } : null != r ? {
                    width: Math.round(r * o),
                    height: r
                } : {
                    width: this.defaultThumbnailDimension,
                    height: Math.round(this.defaultThumbnailDimension / o)
                }
            }, o.getOrientation = function(e) {
                var t = this;
                return new Promise(function(r) {
                    var n = t.uppy;
                    _$exif_35.getData(e.data, function() {
                        var t = _$exif_35.getAllTags(this);
                        delete t.thumbnail, n.setFileMeta(e.id, {
                            exifdata: t
                        });
                        var o = _$exif_35.getTag(this, "Orientation") || 1;
                        r(_$imageOrientations_167[o])
                    })
                })
            }, o.protect = function(e) {
                var t = e.width / e.height,
                    r = Math.floor(Math.sqrt(5e6 * t)),
                    n = Math.floor(5e6 / Math.sqrt(5e6 * t));
                if (r > 4096 && (r = 4096, n = Math.round(r / t)), n > 4096 && (n = 4096, r = Math.round(t * n)), e.width > r) {
                    var o = document.createElement("canvas");
                    o.width = r, o.height = n, o.getContext("2d").drawImage(e, 0, 0, r, n), e = o
                }
                return e
            }, o.resizeImage = function(e, t, r) {
                e = this.protect(e);
                var n = Math.ceil(Math.log(e.width / t) * Math.LOG2E);
                n < 1 && (n = 1);
                for (var o = t * Math.pow(2, n - 1), i = r * Math.pow(2, n - 1); n--;) {
                    var s = document.createElement("canvas");
                    s.width = o, s.height = i, s.getContext("2d").drawImage(e, 0, 0, o, i), e = s, o = Math.round(o / 2), i = Math.round(i / 2)
                }
                return e
            }, o.rotateImage = function(e, t) {
                var r = e.width,
                    n = e.height;
                90 !== t.rotation && 270 !== t.rotation || (r = e.height, n = e.width);
                var o = document.createElement("canvas");
                o.width = r, o.height = n;
                var i = o.getContext("2d");
                return i.translate(r / 2, n / 2), i.rotate(t.rotation * Math.PI / 180), i.scale(t.xScale, t.yScale), i.drawImage(e, -e.width / 2, -e.height / 2, e.width, e.height), o
            }, o.canvasToBlob = function(e, t, r) {
                try {
                    e.getContext("2d").getImageData(0, 0, 1, 1)
                } catch (err) {
                    if (18 === err.code) return Promise.reject(new Error("cannot read image, probably an svg with external resources"))
                }
                return e.toBlob ? new Promise(function(n) {
                    e.toBlob(n, t, r)
                }).then(function(e) {
                    if (null === e) throw new Error("cannot read image, probably an svg with external resources");
                    return e
                }) : Promise.resolve().then(function() {
                    return _$dataURItoBlob_201(e.toDataURL(t, r), {})
                }).then(function(e) {
                    if (null === e) throw new Error("could not extract blob, probably an old browser");
                    return e
                })
            }, o.setPreviewURL = function(e, t) {
                this.uppy.setFileState(e, {
                    preview: t
                })
            }, o.addToQueue = function(e) {
                this.queue.push(e), !1 === this.queueProcessing && this.processQueue()
            }, o.processQueue = function() {
                var e = this;
                if (this.queueProcessing = !0, this.queue.length > 0) {
                    var t = this.queue.shift();
                    return this.requestThumbnail(t).catch(function(e) {}).then(function() {
                        return e.processQueue()
                    })
                }
                this.queueProcessing = !1, this.uppy.log("[ThumbnailGenerator] Emptied thumbnail queue"), this.uppy.emit("thumbnail:all-generated")
            }, o.requestThumbnail = function(e) {
                var t = this;
                return _$isPreviewSupported_222(e.type) && !e.isRemote ? this.createThumbnail(e, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then(function(r) {
                    t.setPreviewURL(e.id, r), t.uppy.log("[ThumbnailGenerator] Generated thumbnail for " + e.id), t.uppy.emit("thumbnail:generated", t.uppy.getFile(e.id), r)
                }).catch(function(r) {
                    t.uppy.log("[ThumbnailGenerator] Failed thumbnail for " + e.id + ":", "warning"), t.uppy.log(r, "warning"), t.uppy.emit("thumbnail:error", t.uppy.getFile(e.id), r)
                }) : Promise.resolve()
            }, o.install = function() {
                this.uppy.on("file-added", this.onFileAdded), this.uppy.on("file-removed", this.onFileRemoved), this.uppy.on("restored", this.onRestored), this.opts.waitForThumbnailsBeforeUpload && this.uppy.addPreProcessor(this.waitUntilAllProcessed)
            }, o.uninstall = function() {
                this.uppy.off("file-added", this.onFileAdded), this.uppy.off("file-removed", this.onFileRemoved), this.uppy.off("restored", this.onRestored), this.opts.waitForThumbnailsBeforeUpload && this.uppy.removePreProcessor(this.waitUntilAllProcessed)
            }, n
        }(__Plugin_168), ___class_168.VERSION = _$package_169.version, ___temp_168),
        _$findAllDOMElements_203 = function(e) {
            if ("string" == typeof e) {
                var t = [].slice.call(document.querySelectorAll(e));
                return t.length > 0 ? t : null
            }
            if ("object" == typeof e && _$isDOMElement_219(e)) return [e]
        },
        _$toArray_229 = function(e) {
            return Array.prototype.slice.call(e || [], 0)
        },
        _$getRelativePath_210 = function(e) {
            return e.fullPath && e.fullPath !== "/" + e.name ? e.fullPath : null
        },
        _$getFilesAndDirectoriesFromDirectory_209 = function e(t, r, n, o) {
            var i = o.onSuccess;
            t.readEntries(function(o) {
                var s = [].concat(r, o);
                o.length ? setTimeout(function() {
                    e(t, s, n, {
                        onSuccess: i
                    })
                }, 0) : i(s)
            }, function(e) {
                n(e), i(r)
            })
        },
        _$webkitGetAsEntryApi_211 = function(e, t) {
            var r = [],
                n = [];
            return _$toArray_229(e.items).forEach(function(e) {
                var o = e.webkitGetAsEntry();
                o && n.push(function e(n) {
                    return new Promise(function(o) {
                        if (n.isFile) n.file(function(e) {
                            e.relativePath = _$getRelativePath_210(n), r.push(e), o()
                        }, function(e) {
                            t(e), o()
                        });
                        else if (n.isDirectory) {
                            var i = n.createReader();
                            _$getFilesAndDirectoriesFromDirectory_209(i, [], t, {
                                onSuccess: function(t) {
                                    var r = t.map(function(t) {
                                        return e(t)
                                    });
                                    Promise.all(r).then(function() {
                                        return o()
                                    })
                                }
                            })
                        }
                    })
                }(o))
            }), Promise.all(n).then(function() {
                return r
            })
        },
        _$fallbackApi_208 = function(e) {
            var t = _$toArray_229(e.files);
            return Promise.resolve(t)
        },
        _$getDroppedFiles_207 = function(e, t) {
            var r = (void 0 === t ? {} : t).logDropError,
                n = void 0 === r ? function() {} : r;
            return e.items && e.items[0] && "webkitGetAsEntry" in e.items[0] ? _$webkitGetAsEntryApi_211(e, n) : _$fallbackApi_208(e)
        },
        _$getActiveOverlayEl_115 = function(e, t) {
            if (t) {
                var r = e.querySelector('[data-uppy-paneltype="' + t + '"]');
                if (r) return r
            }
            return e
        },
        _$FOCUSABLE_ELEMENTS_196 = ['a[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'area[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', "input:not([disabled]):not([inert]):not([aria-hidden])", "select:not([disabled]):not([inert]):not([aria-hidden])", "textarea:not([disabled]):not([inert]):not([aria-hidden])", "button:not([disabled]):not([inert]):not([aria-hidden])", 'iframe:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'object:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'embed:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[contenteditable]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[tabindex]:not([tabindex^="-"]):not([inert]):not([aria-hidden])'];

    function focusOnFirstNode(e, t) {
        var r = t[0];
        r && (r.focus(), e.preventDefault())
    }

    function trapFocus(e, t, r) {
        var n = _$getActiveOverlayEl_115(r, t),
            o = _$toArray_229(n.querySelectorAll(_$FOCUSABLE_ELEMENTS_196)),
            i = o.indexOf(document.activeElement);
        ! function(e) {
            return e.contains(document.activeElement)
        }(n) ? focusOnFirstNode(e, o): e.shiftKey && 0 === i ? function(e, t) {
            var r = o[o.length - 1];
            r && (r.focus(), e.preventDefault())
        }(e) : e.shiftKey || i !== o.length - 1 || focusOnFirstNode(e, o)
    }
    var _$trapFocus_119 = {
            forModal: function(e, t, r) {
                trapFocus(e, t, r)
            },
            forInline: function(e, t, r) {
                null === t || trapFocus(e, t, r)
            }
        },
        _$ResizeObserver_57 = {
            exports: {}
        };
    (function(e) {
        ! function(e, t) {
            "object" == typeof _$ResizeObserver_57.exports ? _$ResizeObserver_57.exports = t() : "function" == typeof define && define.amd ? define(t) : e.ResizeObserver = t()
        }(this, function() {
            "use strict";
            var t = function() {
                    if ("undefined" != typeof Map) return Map;

                    function e(e, t) {
                        var r = -1;
                        return e.some(function(e, n) {
                            return e[0] === t && (r = n, !0)
                        }), r
                    }
                    return function() {
                        function t() {
                            this.__entries__ = []
                        }
                        return Object.defineProperty(t.prototype, "size", {
                            get: function() {
                                return this.__entries__.length
                            },
                            enumerable: !0,
                            configurable: !0
                        }), t.prototype.get = function(t) {
                            var r = e(this.__entries__, t),
                                n = this.__entries__[r];
                            return n && n[1]
                        }, t.prototype.set = function(t, r) {
                            var n = e(this.__entries__, t);
                            ~n ? this.__entries__[n][1] = r : this.__entries__.push([t, r])
                        }, t.prototype.delete = function(t) {
                            var r = this.__entries__,
                                n = e(r, t);
                            ~n && r.splice(n, 1)
                        }, t.prototype.has = function(t) {
                            return !!~e(this.__entries__, t)
                        }, t.prototype.clear = function() {
                            this.__entries__.splice(0)
                        }, t.prototype.forEach = function(e, t) {
                            void 0 === t && (t = null);
                            for (var r = 0, n = this.__entries__; r < n.length; r++) {
                                var o = n[r];
                                e.call(t, o[1], o[0])
                            }
                        }, t
                    }()
                }(),
                r = "undefined" != typeof window && "undefined" != typeof document && window.document === document,
                n = void 0 !== e && e.Math === Math ? e : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")(),
                o = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(n) : function(e) {
                    return setTimeout(function() {
                        return e(Date.now())
                    }, 1e3 / 60)
                },
                i = 2,
                s = 20,
                a = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],
                l = "undefined" != typeof MutationObserver,
                u = function() {
                    function e() {
                        this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = function(e, t) {
                            var r = !1,
                                n = !1,
                                s = 0;

                            function a() {
                                r && (r = !1, e()), n && u()
                            }

                            function l() {
                                o(a)
                            }

                            function u() {
                                var e = Date.now();
                                if (r) {
                                    if (e - s < i) return;
                                    n = !0
                                } else r = !0, n = !1, setTimeout(l, t);
                                s = e
                            }
                            return u
                        }(this.refresh.bind(this), s)
                    }
                    return e.prototype.addObserver = function(e) {
                        ~this.observers_.indexOf(e) || this.observers_.push(e), this.connected_ || this.connect_()
                    }, e.prototype.removeObserver = function(e) {
                        var t = this.observers_,
                            r = t.indexOf(e);
                        ~r && t.splice(r, 1), !t.length && this.connected_ && this.disconnect_()
                    }, e.prototype.refresh = function() {
                        this.updateObservers_() && this.refresh()
                    }, e.prototype.updateObservers_ = function() {
                        var e = this.observers_.filter(function(e) {
                            return e.gatherActive(), e.hasActive()
                        });
                        return e.forEach(function(e) {
                            return e.broadcastActive()
                        }), e.length > 0
                    }, e.prototype.connect_ = function() {
                        r && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), l ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
                            attributes: !0,
                            childList: !0,
                            characterData: !0,
                            subtree: !0
                        })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0)
                    }, e.prototype.disconnect_ = function() {
                        r && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1)
                    }, e.prototype.onTransitionEnd_ = function(e) {
                        var t = e.propertyName,
                            r = void 0 === t ? "" : t;
                        a.some(function(e) {
                            return !!~r.indexOf(e)
                        }) && this.refresh()
                    }, e.getInstance = function() {
                        return this.instance_ || (this.instance_ = new e), this.instance_
                    }, e.instance_ = null, e
                }(),
                c = function(e, t) {
                    for (var r = 0, n = Object.keys(t); r < n.length; r++) {
                        var o = n[r];
                        Object.defineProperty(e, o, {
                            value: t[o],
                            enumerable: !1,
                            writable: !1,
                            configurable: !0
                        })
                    }
                    return e
                },
                p = function(e) {
                    return e && e.ownerDocument && e.ownerDocument.defaultView || n
                },
                d = m(0, 0, 0, 0);

            function _(e) {
                return parseFloat(e) || 0
            }

            function h(e) {
                for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                return t.reduce(function(t, r) {
                    return t + _(e["border-" + r + "-width"])
                }, 0)
            }
            var f = "undefined" != typeof SVGGraphicsElement ? function(e) {
                return e instanceof p(e).SVGGraphicsElement
            } : function(e) {
                return e instanceof p(e).SVGElement && "function" == typeof e.getBBox
            };

            function g(e) {
                return r ? f(e) ? function(e) {
                    var t = e.getBBox();
                    return m(0, 0, t.width, t.height)
                }(e) : function(e) {
                    var t = e.clientWidth,
                        r = e.clientHeight;
                    if (!t && !r) return d;
                    var n = p(e).getComputedStyle(e),
                        o = function(e) {
                            for (var t = {}, r = 0, n = ["top", "right", "bottom", "left"]; r < n.length; r++) {
                                var o = n[r],
                                    i = e["padding-" + o];
                                t[o] = _(i)
                            }
                            return t
                        }(n),
                        i = o.left + o.right,
                        s = o.top + o.bottom,
                        a = _(n.width),
                        l = _(n.height);
                    if ("border-box" === n.boxSizing && (Math.round(a + i) !== t && (a -= h(n, "left", "right") + i), Math.round(l + s) !== r && (l -= h(n, "top", "bottom") + s)), ! function(e) {
                            return e === p(e).document.documentElement
                        }(e)) {
                        var u = Math.round(a + i) - t,
                            c = Math.round(l + s) - r;
                        1 !== Math.abs(u) && (a -= u), 1 !== Math.abs(c) && (l -= c)
                    }
                    return m(o.left, o.top, a, l)
                }(e) : d
            }

            function m(e, t, r, n) {
                return {
                    x: e,
                    y: t,
                    width: r,
                    height: n
                }
            }
            var y = function() {
                    function e(e) {
                        this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = m(0, 0, 0, 0), this.target = e
                    }
                    return e.prototype.isActive = function() {
                        var e = g(this.target);
                        return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight
                    }, e.prototype.broadcastRect = function() {
                        var e = this.contentRect_;
                        return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e
                    }, e
                }(),
                v = function(e, t) {
                    var r, n, o, i, s, a, l, u = (n = (r = t).x, o = r.y, i = r.width, s = r.height, a = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object, l = Object.create(a.prototype), c(l, {
                        x: n,
                        y: o,
                        width: i,
                        height: s,
                        top: o,
                        right: n + i,
                        bottom: s + o,
                        left: n
                    }), l);
                    c(this, {
                        target: e,
                        contentRect: u
                    })
                },
                b = function() {
                    function e(e, r, n) {
                        if (this.activeObservations_ = [], this.observations_ = new t, "function" != typeof e) throw new TypeError("The callback provided as parameter 1 is not a function.");
                        this.callback_ = e, this.controller_ = r, this.callbackCtx_ = n
                    }
                    return e.prototype.observe = function(e) {
                        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                        if ("undefined" != typeof Element && Element instanceof Object) {
                            if (!(e instanceof p(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                            var t = this.observations_;
                            t.has(e) || (t.set(e, new y(e)), this.controller_.addObserver(this), this.controller_.refresh())
                        }
                    }, e.prototype.unobserve = function(e) {
                        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                        if ("undefined" != typeof Element && Element instanceof Object) {
                            if (!(e instanceof p(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                            var t = this.observations_;
                            t.has(e) && (t.delete(e), t.size || this.controller_.removeObserver(this))
                        }
                    }, e.prototype.disconnect = function() {
                        this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this)
                    }, e.prototype.gatherActive = function() {
                        var e = this;
                        this.clearActive(), this.observations_.forEach(function(t) {
                            t.isActive() && e.activeObservations_.push(t)
                        })
                    }, e.prototype.broadcastActive = function() {
                        if (this.hasActive()) {
                            var e = this.callbackCtx_,
                                t = this.activeObservations_.map(function(e) {
                                    return new v(e.target, e.broadcastRect())
                                });
                            this.callback_.call(e, t, e), this.clearActive()
                        }
                    }, e.prototype.clearActive = function() {
                        this.activeObservations_.splice(0)
                    }, e.prototype.hasActive = function() {
                        return this.activeObservations_.length > 0
                    }, e
                }(),
                w = "undefined" != typeof WeakMap ? new WeakMap : new t,
                S = function e(t) {
                    if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function.");
                    if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                    var r = u.getInstance(),
                        n = new b(t, r, this);
                    w.set(this, n)
                };
            return ["observe", "unobserve", "disconnect"].forEach(function(e) {
                S.prototype[e] = function() {
                    var t;
                    return (t = w.get(this))[e].apply(t, arguments)
                }
            }), void 0 !== n.ResizeObserver ? n.ResizeObserver : S
        })
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}), _$ResizeObserver_57 = _$ResizeObserver_57.exports;
    var _$lodashDebounce_45 = {};
    (function(e) {
        var t = NaN,
            r = "[object Symbol]",
            n = /^\s+|\s+$/g,
            o = /^[-+]0x[0-9a-f]+$/i,
            i = /^0b[01]+$/i,
            s = /^0o[0-7]+$/i,
            a = parseInt,
            l = "object" == typeof e && e && e.Object === Object && e,
            u = "object" == typeof self && self && self.Object === Object && self,
            c = l || u || Function("return this")(),
            p = Object.prototype.toString,
            d = Math.max,
            _ = Math.min,
            h = function() {
                return c.Date.now()
            };

        function f(e) {
            var t = typeof e;
            return !!e && ("object" == t || "function" == t)
        }

        function g(e) {
            if ("number" == typeof e) return e;
            if (function(e) {
                    return "symbol" == typeof e || function(e) {
                        return !!e && "object" == typeof e
                    }(e) && p.call(e) == r
                }(e)) return t;
            if (f(e)) {
                var l = "function" == typeof e.valueOf ? e.valueOf() : e;
                e = f(l) ? l + "" : l
            }
            if ("string" != typeof e) return 0 === e ? e : +e;
            e = e.replace(n, "");
            var u = i.test(e);
            return u || s.test(e) ? a(e.slice(2), u ? 2 : 8) : o.test(e) ? t : +e
        }
        _$lodashDebounce_45 = function(e, t, r) {
            var n, o, i, s, a, l, u = 0,
                c = !1,
                p = !1,
                m = !0;
            if ("function" != typeof e) throw new TypeError("Expected a function");

            function y(t) {
                var r = n,
                    i = o;
                return n = o = void 0, u = t, s = e.apply(i, r)
            }

            function v(e) {
                var r = e - l;
                return void 0 === l || r >= t || r < 0 || p && e - u >= i
            }

            function b() {
                var e = h();
                if (v(e)) return w(e);
                a = setTimeout(b, function(e) {
                    var r = t - (e - l);
                    return p ? _(r, i - (e - u)) : r
                }(e))
            }

            function w(e) {
                return a = void 0, m && n ? y(e) : (n = o = void 0, s)
            }

            function S() {
                var e = h(),
                    r = v(e);
                if (n = arguments, o = this, l = e, r) {
                    if (void 0 === a) return function(e) {
                        return u = e, a = setTimeout(b, t), c ? y(e) : s
                    }(l);
                    if (p) return a = setTimeout(b, t), y(l)
                }
                return void 0 === a && (a = setTimeout(b, t)), s
            }
            return t = g(t) || 0, f(r) && (c = !!r.leading, i = (p = "maxWait" in r) ? d(g(r.maxWait) || 0, t) : i, m = "trailing" in r ? !!r.trailing : m), S.cancel = function() {
                void 0 !== a && clearTimeout(a), u = 0, n = l = o = a = void 0
            }, S.flush = function() {
                return void 0 === a ? s : w(h())
            }, S
        }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var _$createSuperFocus_114 = function() {
        var e = !1;
        return _$lodashDebounce_45(function(t, r) {
            var n = _$getActiveOverlayEl_115(t, r),
                o = n.contains(document.activeElement);
            if (!o || !e) {
                var i = n.querySelector("[data-uppy-super-focusable]");
                if (!o || i)
                    if (i) i.focus({
                        preventScroll: !0
                    }), e = !0;
                    else {
                        var s = n.querySelector(_$FOCUSABLE_ELEMENTS_196);
                        s && s.focus({
                            preventScroll: !0
                        }), e = !1
                    }
            }
        }, 260)
    };

    function areInputsEqual(e, t) {
        if (e.length !== t.length) return !1;
        for (var r = 0; r < e.length; r++)
            if (e[r] !== t[r]) return !1;
        return !0
    }
    var _$memoizeOneCjs_47 = function(e, t) {
            var r;
            void 0 === t && (t = areInputsEqual);
            var n, o = [],
                i = !1;
            return function() {
                for (var s = arguments.length, a = new Array(s), l = 0; l < s; l++) a[l] = arguments[l];
                return i && r === this && t(a, o) ? n : (n = e.apply(this, a), i = !0, r = this, o = a, n)
            }
        },
        _$package_121 = {
            version: "1.5.0"
        },
        ___class_112, ___temp_112;

    function ___extends_112() {
        return (___extends_112 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ___assertThisInitialized_112(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __Plugin_112 = _$lib_93.Plugin,
        ResizeObserver = _$ResizeObserver_57.default || _$ResizeObserver_57,
        defaultPickerIcon = _$icons_111.defaultPickerIcon,
        memoize = _$memoizeOneCjs_47.default || _$memoizeOneCjs_47;

    function createPromise() {
        var e = {};
        return e.promise = new Promise(function(t, r) {
            e.resolve = t, e.reject = r
        }), e
    }
    var _$lib_112 = (___temp_112 = ___class_112 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                (n = e.call(this, t, r) || this).cancelUpload = function(e) {
                    n.uppy.removeFile(e)
                }, n.saveFileCard = function(e, t) {
                    n.uppy.setFileMeta(t, e), n.toggleFileCard()
                }, n._attachRenderFunctionToTarget = function(e) {
                    var t = n.uppy.getPlugin(e.id);
                    return ___extends_112({}, e, {
                        icon: t.icon || n.opts.defaultPickerIcon,
                        render: t.render
                    })
                }, n._isTargetSupported = function(e) {
                    var t = n.uppy.getPlugin(e.id);
                    return "function" != typeof t.isSupported || t.isSupported()
                }, n._getAcquirers = memoize(function(e) {
                    return e.filter(function(e) {
                        return "acquirer" === e.type && n._isTargetSupported(e)
                    }).map(n._attachRenderFunctionToTarget)
                }), n._getProgressIndicators = memoize(function(e) {
                    return e.filter(function(e) {
                        return "progressindicator" === e.type
                    }).map(n._attachRenderFunctionToTarget)
                }), n.id = n.opts.id || "Dashboard", n.title = "Dashboard", n.type = "orchestrator", n.modalName = "uppy-Dashboard-" + _$cuid_13(), n.defaultLocale = {
                    strings: {
                        closeModal: "Kapat",
                        importFrom: '%{name} Ekle',
                        addingMoreFiles: 'Daha fazla dosya ekleniyor',
                        addMoreFiles: 'Daha fazla dosya ekle',
                        dashboardWindowTitle: 'Dosya Yükle (Kapatmak için Esc)',
                        dashboardTitle: 'Dosya Yükle',
                        copyLinkToClipboardFallback: 'Aşağıdaki linki kopyala',
                        copyLinkToClipboardSuccess: 'Link panoya kopyalandı',
                        copyLink: "Linki kopyala",
                        link: "Link",
                        fileSource: 'Dosya kaynağı: %{name}',
                        done: "Bitti",
                        back: "Geri",
                        addMore: 'Daha ekle',
                        removeFile: 'Dosyayı kaldır',
                        editFile: 'Dosyayı düzenle',
                        editing: '%{file} düzenleniyor',
                        edit: "Edit",
                        finishEditingFile: "Finish editing file",
                        saveChanges: "Save changes",
                        cancel: "Vazgeç",
                        myDevice: 'Dosyalarım',
                        dropPasteImport: 'Sürükleyip bırak, yapıştır, %{browse} veya içeri aktar',
                        dropHint: 'Buraya sürükleyip bırakın',
                        dropPaste: 'Sürükleyip bırak, yapıştır veya %{browse}',
                        browse: 'gözat',
                        uploadComplete: 'Yükleme tamamlandı',
                        uploadPaused: 'Yükleme durduruldu',
                        resumeUpload: 'Yüklemeye devam et',
                        pauseUpload: 'Yükleme Durdu',
                        retryUpload: 'Tekrar yükle',
                        cancelUpload: 'Yüklemeyi İptal Et',
                        xFilesSelected: {
                            '0': '%{smart_count} dosya seçildi',
                            '1': '%{smart_count} dosya seçildi',
                            '2': '%{smart_count} dosya seçildi'
                        },
                        uploadingXFiles: {
                            '0': '%{smart_count} dosya yükleniyor',
                            '1': '%{smart_count} dosya yükleniyor',
                            '2': '%{smart_count} dosya yükleniyor'
                        },
                        processingXFiles: {
                            '0': '%{smart_count} dosya işleniyor',
                            '1': '%{smart_count} dosya işleniyor',
                            '2': '%{smart_count} dosya işleniyor'
                        },
                        poweredBy: "Powered by"
                    }
                };
                var o = {
                    target: "body",
                    metaFields: [],
                    trigger: "#uppy-select-files",
                    inline: !1,
                    width: 750,
                    height: 550,
                    thumbnailWidth: 280,
                    waitForThumbnailsBeforeUpload: !1,
                    defaultPickerIcon: defaultPickerIcon,
                    showLinkToFileUploadResult: !0,
                    showProgressDetails: !1,
                    hideUploadButton: !1,
                    hideRetryButton: !1,
                    hidePauseResumeCancelButtons: !1,
                    hideProgressAfterFinish: !1,
                    note: null,
                    closeModalOnClickOutside: !1,
                    closeAfterFinish: !1,
                    disableStatusBar: !1,
                    disableInformer: !1,
                    disableThumbnailGenerator: !1,
                    disablePageScrollWhenModalOpen: !0,
                    animateOpenClose: !0,
                    proudlyDisplayPoweredByUppy: !0,
                    onRequestCloseModal: function() {
                        return n.closeModal()
                    },
                    showSelectedFiles: !0,
                    browserBackButtonClose: !1
                };
                return n.opts = ___extends_112({}, o, {}, r), n.i18nInit(), n.openModal = n.openModal.bind(___assertThisInitialized_112(n)), n.closeModal = n.closeModal.bind(___assertThisInitialized_112(n)), n.requestCloseModal = n.requestCloseModal.bind(___assertThisInitialized_112(n)), n.isModalOpen = n.isModalOpen.bind(___assertThisInitialized_112(n)), n.addTarget = n.addTarget.bind(___assertThisInitialized_112(n)), n.removeTarget = n.removeTarget.bind(___assertThisInitialized_112(n)), n.hideAllPanels = n.hideAllPanels.bind(___assertThisInitialized_112(n)), n.showPanel = n.showPanel.bind(___assertThisInitialized_112(n)), n.toggleFileCard = n.toggleFileCard.bind(___assertThisInitialized_112(n)), n.toggleAddFilesPanel = n.toggleAddFilesPanel.bind(___assertThisInitialized_112(n)), n.initEvents = n.initEvents.bind(___assertThisInitialized_112(n)), n.handlePopState = n.handlePopState.bind(___assertThisInitialized_112(n)), n.handleKeyDownInModal = n.handleKeyDownInModal.bind(___assertThisInitialized_112(n)), n.handleKeyDownInInline = n.handleKeyDownInInline.bind(___assertThisInitialized_112(n)), n.handleComplete = n.handleComplete.bind(___assertThisInitialized_112(n)), n.handleClickOutside = n.handleClickOutside.bind(___assertThisInitialized_112(n)), n.handlePaste = n.handlePaste.bind(___assertThisInitialized_112(n)), n.handlePasteOnBody = n.handlePasteOnBody.bind(___assertThisInitialized_112(n)), n.handleInputChange = n.handleInputChange.bind(___assertThisInitialized_112(n)), n.handleDragOver = n.handleDragOver.bind(___assertThisInitialized_112(n)), n.handleDragLeave = n.handleDragLeave.bind(___assertThisInitialized_112(n)), n.handleDrop = n.handleDrop.bind(___assertThisInitialized_112(n)), n.superFocusOnEachUpdate = n.superFocusOnEachUpdate.bind(___assertThisInitialized_112(n)), n.recordIfFocusedOnUppyRecently = n.recordIfFocusedOnUppyRecently.bind(___assertThisInitialized_112(n)), n.render = n.render.bind(___assertThisInitialized_112(n)), n.install = n.install.bind(___assertThisInitialized_112(n)), n.superFocus = _$createSuperFocus_114(), n.ifFocusedOnUppyRecently = !1, n.makeDashboardInsidesVisibleAnywayTimeout = null, n.removeDragOverClassTimeout = null, n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.setOptions = function(t) {
                e.prototype.setOptions.call(this, t), this.i18nInit()
            }, o.i18nInit = function() {
                this.translator = new _$Translator_199([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.i18nArray = this.translator.translateArray.bind(this.translator), this.setPluginState()
            }, o.removeTarget = function(e) {
                var t = this.getPluginState().targets.filter(function(t) {
                    return t.id !== e.id
                });
                this.setPluginState({
                    targets: t
                })
            }, o.addTarget = function(e) {
                var t = e.id || e.constructor.name,
                    r = e.title || t,
                    n = e.type;
                if ("acquirer" === n || "progressindicator" === n || "presenter" === n) {
                    var o = {
                            id: t,
                            name: r,
                            type: n
                        },
                        i = this.getPluginState().targets.slice();
                    return i.push(o), this.setPluginState({
                        targets: i
                    }), this.el
                }
                this.uppy.log("Dashboard: Modal can only be used by plugins of types: acquirer, progressindicator, presenter", "error")
            }, o.hideAllPanels = function() {
                this.setPluginState({
                    activePickerPanel: !1,
                    showAddFilesPanel: !1,
                    activeOverlayType: null
                })
            }, o.showPanel = function(e) {
                var t = this.getPluginState().targets.filter(function(t) {
                    return "acquirer" === t.type && t.id === e
                })[0];
                this.setPluginState({
                    activePickerPanel: t,
                    activeOverlayType: "PickerPanel"
                })
            }, o.openModal = function() {
                var e = this,
                    t = createPromise(),
                    r = t.promise,
                    n = t.resolve;
                return this.savedScrollPosition = window.pageYOffset, this.savedActiveElement = document.activeElement, this.opts.disablePageScrollWhenModalOpen && document.body.classList.add("uppy-Dashboard-isFixed"), this.opts.animateOpenClose && this.getPluginState().isClosing ? this.el.addEventListener("animationend", function t() {
                    e.setPluginState({
                        isHidden: !1
                    }), e.el.removeEventListener("animationend", t, !1), n()
                }, !1) : (this.setPluginState({
                    isHidden: !1
                }), n()), this.opts.browserBackButtonClose && this.updateBrowserHistory(), document.addEventListener("keydown", this.handleKeyDownInModal), this.uppy.emit("dashboard:modal-open"), r
            }, o.closeModal = function(e) {
                var t = this;
                void 0 === e && (e = {});
                var r = e.manualClose,
                    n = void 0 === r || r,
                    o = this.getPluginState(),
                    i = o.isHidden,
                    s = o.isClosing;
                if (!i && !s) {
                    var a = createPromise(),
                        l = a.promise,
                        u = a.resolve;
                    return this.opts.disablePageScrollWhenModalOpen && document.body.classList.remove("uppy-Dashboard-isFixed"), this.opts.animateOpenClose ? (this.setPluginState({
                        isClosing: !0
                    }), this.el.addEventListener("animationend", function e() {
                        t.setPluginState({
                            isHidden: !0,
                            isClosing: !1
                        }), t.superFocus.cancel(), t.savedActiveElement.focus(), t.el.removeEventListener("animationend", e, !1), u()
                    }, !1)) : (this.setPluginState({
                        isHidden: !0
                    }), this.superFocus.cancel(), this.savedActiveElement.focus(), u()), document.removeEventListener("keydown", this.handleKeyDownInModal), n && this.opts.browserBackButtonClose && history.state && history.state[this.modalName] && history.go(-1), this.uppy.emit("dashboard:modal-closed"), l
                }
            }, o.isModalOpen = function() {
                return !this.getPluginState().isHidden || !1
            }, o.requestCloseModal = function() {
                return this.opts.onRequestCloseModal ? this.opts.onRequestCloseModal() : this.closeModal()
            }, o.toggleFileCard = function(e) {
                e ? this.uppy.emit("dashboard:file-edit-start") : this.uppy.emit("dashboard:file-edit-complete"), this.setPluginState({
                    fileCardFor: e || null,
                    activeOverlayType: e ? "FileCard" : null
                })
            }, o.toggleAddFilesPanel = function(e) {
                this.setPluginState({
                    showAddFilesPanel: e,
                    activeOverlayType: e ? "AddFiles" : null
                })
            }, o.addFile = function(e) {
                try {
                    this.uppy.addFile({
                        source: this.id,
                        name: e.name,
                        type: e.type,
                        data: e,
                        meta: {
                            relativePath: e.relativePath || null
                        }
                    })
                } catch (err) {
                    err.isRestriction || this.uppy.log(err)
                }
            }, o.startListeningToResize = function() {
                var e = this;
                this.resizeObserver = new ResizeObserver(function(t, r) {
                    var n = t[0].contentRect,
                        o = n.width,
                        i = n.height;
                    e.uppy.log("[Dashboard] resized: " + o + " / " + i, "debug"), e.setPluginState({
                        containerWidth: o,
                        containerHeight: i,
                        areInsidesReadyToBeVisible: !0
                    })
                }), this.resizeObserver.observe(this.el.querySelector(".uppy-Dashboard-inner")), this.makeDashboardInsidesVisibleAnywayTimeout = setTimeout(function() {
                    var t = e.getPluginState(),
                        r = !e.opts.inline && t.isHidden;
                    t.areInsidesReadyToBeVisible || r || (e.uppy.log("[Dashboard] resize event didn't fire on time: defaulted to mobile layout", "debug"), e.setPluginState({
                        areInsidesReadyToBeVisible: !0
                    }))
                }, 1e3)
            }, o.stopListeningToResize = function() {
                this.resizeObserver.disconnect(), clearTimeout(this.makeDashboardInsidesVisibleAnywayTimeout)
            }, o.recordIfFocusedOnUppyRecently = function(e) {
                this.el.contains(e.target) ? this.ifFocusedOnUppyRecently = !0 : (this.ifFocusedOnUppyRecently = !1, this.superFocus.cancel())
            }, o.updateBrowserHistory = function() {
                var e;
                history.state && history.state[this.modalName] || history.pushState(___extends_112({}, history.state, ((e = {})[this.modalName] = !0, e)), ""), window.addEventListener("popstate", this.handlePopState, !1)
            }, o.handlePopState = function(e) {
                !this.isModalOpen() || e.state && e.state[this.modalName] || this.closeModal({
                    manualClose: !1
                }), !this.isModalOpen() && e.state && e.state[this.modalName] && history.go(-1)
            }, o.handleKeyDownInModal = function(e) {
                27 === e.keyCode && this.requestCloseModal(e), 9 === e.keyCode && _$trapFocus_119.forModal(e, this.getPluginState().activeOverlayType, this.el)
            }, o.handleClickOutside = function() {
                this.opts.closeModalOnClickOutside && this.requestCloseModal()
            }, o.handlePaste = function(e) {
                var t = this;
                this.uppy.iteratePlugins(function(t) {
                    "acquirer" === t.type && t.handleRootPaste && t.handleRootPaste(e)
                }), _$toArray_229(e.clipboardData.files).forEach(function(e) {
                    t.uppy.log("[Dashboard] File pasted"), t.addFile(e)
                })
            }, o.handleInputChange = function(e) {
                var t = this;
                e.preventDefault(), _$toArray_229(e.target.files).forEach(function(e) {
                    return t.addFile(e)
                })
            }, o.handleDragOver = function(e) {
                e.preventDefault(), e.stopPropagation(), clearTimeout(this.removeDragOverClassTimeout), this.setPluginState({
                    isDraggingOver: !0
                })
            }, o.handleDragLeave = function(e) {
                var t = this;
                e.preventDefault(), e.stopPropagation(), clearTimeout(this.removeDragOverClassTimeout), this.removeDragOverClassTimeout = setTimeout(function() {
                    t.setPluginState({
                        isDraggingOver: !1
                    })
                }, 50)
            }, o.handleDrop = function(e, t) {
                var r = this;
                e.preventDefault(), e.stopPropagation(), clearTimeout(this.removeDragOverClassTimeout), e.dataTransfer.dropEffect = "copy", this.setPluginState({
                    isDraggingOver: !1
                }), this.uppy.iteratePlugins(function(t) {
                    "acquirer" === t.type && t.handleRootDrop && t.handleRootDrop(e)
                });
                var n = !1;
                _$getDroppedFiles_207(e.dataTransfer, {
                    logDropError: function(e) {
                        r.uppy.log(e, "error"), n || (r.uppy.info(e.message, "error"), n = !0)
                    }
                }).then(function(e) {
                    e.length > 0 && (r.uppy.log("[Dashboard] Files were dropped"), e.forEach(function(e) {
                        return r.addFile(e)
                    }))
                })
            }, o.handleKeyDownInInline = function(e) {
                9 === e.keyCode && _$trapFocus_119.forInline(e, this.getPluginState().activeOverlayType, this.el)
            }, o.handlePasteOnBody = function(e) {
                this.el.contains(document.activeElement) && this.handlePaste(e)
            }, o.handleComplete = function(e) {
                var t = e.failed;
                e.uploadID, this.opts.closeAfterFinish && 0 === t.length && this.requestCloseModal()
            }, o.initEvents = function() {
                var e = this,
                    t = _$findAllDOMElements_203(this.opts.trigger);
                !this.opts.inline && t && t.forEach(function(t) {
                    return t.addEventListener("click", e.openModal)
                }), this.opts.inline || t || this.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options unless you are planning to call openModal() method yourself", "error"), this.startListeningToResize(), document.addEventListener("paste", this.handlePasteOnBody), this.uppy.on("plugin-remove", this.removeTarget), this.uppy.on("file-added", this.hideAllPanels), this.uppy.on("dashboard:modal-closed", this.hideAllPanels), this.uppy.on("complete", this.handleComplete), document.addEventListener("focus", this.recordIfFocusedOnUppyRecently, !0), document.addEventListener("click", this.recordIfFocusedOnUppyRecently, !0), this.opts.inline && this.el.addEventListener("keydown", this.handleKeyDownInInline)
            }, o.removeEvents = function() {
                var e = this,
                    t = _$findAllDOMElements_203(this.opts.trigger);
                !this.opts.inline && t && t.forEach(function(t) {
                    return t.removeEventListener("click", e.openModal)
                }), this.stopListeningToResize(), document.removeEventListener("paste", this.handlePasteOnBody), window.removeEventListener("popstate", this.handlePopState, !1), this.uppy.off("plugin-remove", this.removeTarget), this.uppy.off("file-added", this.hideAllPanels), this.uppy.off("dashboard:modal-closed", this.hideAllPanels), this.uppy.off("complete", this.handleComplete), document.removeEventListener("focus", this.recordIfFocusedOnUppyRecently), document.removeEventListener("click", this.recordIfFocusedOnUppyRecently), this.opts.inline && this.el.removeEventListener("keydown", this.handleKeyDownInInline)
            }, o.superFocusOnEachUpdate = function() {
                var e = this.el.contains(document.activeElement),
                    t = document.activeElement === document.querySelector("body") || null === document.activeElement,
                    r = this.uppy.getState().info.isHidden,
                    n = !this.opts.inline;
                r && (n || e || t && this.ifFocusedOnUppyRecently) ? this.superFocus(this.el, this.getPluginState().activeOverlayType) : this.superFocus.cancel()
            }, o.afterUpdate = function() {
                this.superFocusOnEachUpdate()
            }, o.render = function(e) {
                var t = this.getPluginState(),
                    r = e.files,
                    n = e.capabilities,
                    o = e.allowNewUpload,
                    i = Object.keys(r).filter(function(e) {
                        return !r[e].progress.uploadStarted
                    }),
                    s = Object.keys(r).filter(function(e) {
                        return r[e].progress.uploadStarted
                    }),
                    a = Object.keys(r).filter(function(e) {
                        return r[e].isPaused
                    }),
                    l = Object.keys(r).filter(function(e) {
                        return r[e].progress.uploadComplete
                    }),
                    u = Object.keys(r).filter(function(e) {
                        return r[e].error
                    }),
                    c = Object.keys(r).filter(function(e) {
                        return !r[e].progress.uploadComplete && r[e].progress.uploadStarted
                    }),
                    p = c.filter(function(e) {
                        return !r[e].isPaused
                    }),
                    d = Object.keys(r).filter(function(e) {
                        return r[e].progress.preprocess || r[e].progress.postprocess
                    }),
                    _ = s.length > 0,
                    h = 100 === e.totalProgress && l.length === Object.keys(r).length && 0 === d.length,
                    f = _ && u.length === s.length,
                    g = 0 !== c.length && a.length === c.length,
                    m = this._getAcquirers(t.targets),
                    y = this._getProgressIndicators(t.targets);
                return _$Dashboard_99({
                    state: e,
                    isHidden: t.isHidden,
                    files: r,
                    newFiles: i,
                    uploadStartedFiles: s,
                    completeFiles: l,
                    erroredFiles: u,
                    inProgressFiles: c,
                    inProgressNotPausedFiles: p,
                    processingFiles: d,
                    isUploadStarted: _,
                    isAllComplete: h,
                    isAllErrored: f,
                    isAllPaused: g,
                    totalFileCount: Object.keys(r).length,
                    totalProgress: e.totalProgress,
                    allowNewUpload: o,
                    acquirers: m,
                    activePickerPanel: t.activePickerPanel,
                    animateOpenClose: this.opts.animateOpenClose,
                    isClosing: t.isClosing,
                    getPlugin: this.uppy.getPlugin,
                    progressindicators: y,
                    autoProceed: this.uppy.opts.autoProceed,
                    id: this.id,
                    closeModal: this.requestCloseModal,
                    handleClickOutside: this.handleClickOutside,
                    handleInputChange: this.handleInputChange,
                    handlePaste: this.handlePaste,
                    inline: this.opts.inline,
                    showPanel: this.showPanel,
                    hideAllPanels: this.hideAllPanels,
                    log: this.uppy.log,
                    i18n: this.i18n,
                    i18nArray: this.i18nArray,
                    addFile: this.uppy.addFile,
                    removeFile: this.uppy.removeFile,
                    info: this.uppy.info,
                    note: this.opts.note,
                    metaFields: t.metaFields,
                    resumableUploads: n.resumableUploads || !1,
                    individualCancellation: n.individualCancellation,
                    pauseUpload: this.uppy.pauseResume,
                    retryUpload: this.uppy.retryUpload,
                    cancelUpload: this.cancelUpload,
                    cancelAll: this.uppy.cancelAll,
                    fileCardFor: t.fileCardFor,
                    toggleFileCard: this.toggleFileCard,
                    toggleAddFilesPanel: this.toggleAddFilesPanel,
                    showAddFilesPanel: t.showAddFilesPanel,
                    saveFileCard: this.saveFileCard,
                    width: this.opts.width,
                    height: this.opts.height,
                    showLinkToFileUploadResult: this.opts.showLinkToFileUploadResult,
                    proudlyDisplayPoweredByUppy: this.opts.proudlyDisplayPoweredByUppy,
                    containerWidth: t.containerWidth,
                    areInsidesReadyToBeVisible: t.areInsidesReadyToBeVisible,
                    isTargetDOMEl: this.isTargetDOMEl,
                    parentElement: this.el,
                    allowedFileTypes: this.uppy.opts.restrictions.allowedFileTypes,
                    maxNumberOfFiles: this.uppy.opts.restrictions.maxNumberOfFiles,
                    showSelectedFiles: this.opts.showSelectedFiles,
                    isDraggingOver: t.isDraggingOver,
                    handleDragOver: this.handleDragOver,
                    handleDragLeave: this.handleDragLeave,
                    handleDrop: this.handleDrop
                })
            }, o.discoverProviderPlugins = function() {
                var e = this;
                this.uppy.iteratePlugins(function(t) {
                    t && !t.target && t.opts && t.opts.target === e.constructor && e.addTarget(t)
                })
            }, o.install = function() {
                var e = this;
                this.setPluginState({
                    isHidden: !0,
                    fileCardFor: null,
                    activeOverlayType: null,
                    showAddFilesPanel: !1,
                    activePickerPanel: !1,
                    metaFields: this.opts.metaFields,
                    targets: [],
                    areInsidesReadyToBeVisible: !1,
                    isDraggingOver: !1
                });
                var t = this.opts,
                    r = t.inline,
                    n = t.closeAfterFinish;
                if (r && n) throw new Error("[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.");
                this.uppy.opts.allowMultipleUploads && n && this.uppy.log("[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploads` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true", "warning");
                var o = this.opts.target;
                o && this.mount(o, this), (this.opts.plugins || []).forEach(function(t) {
                    var r = e.uppy.getPlugin(t);
                    r && r.mount(e, r)
                }), this.opts.disableStatusBar || this.uppy.use(_$lib_161, {
                    id: this.id + ":StatusBar",
                    target: this,
                    hideUploadButton: this.opts.hideUploadButton,
                    hideRetryButton: this.opts.hideRetryButton,
                    hidePauseResumeButton: this.opts.hidePauseResumeButton,
                    hideCancelButton: this.opts.hideCancelButton,
                    showProgressDetails: this.opts.showProgressDetails,
                    hideAfterFinish: this.opts.hideProgressAfterFinish,
                    locale: this.opts.locale
                }), this.opts.disableInformer || this.uppy.use(_$lib_138, {
                    id: this.id + ":Informer",
                    target: this
                }), this.opts.disableThumbnailGenerator || this.uppy.use(_$lib_168, {
                    id: this.id + ":ThumbnailGenerator",
                    thumbnailWidth: this.opts.thumbnailWidth,
                    waitForThumbnailsBeforeUpload: this.opts.waitForThumbnailsBeforeUpload
                }), this.discoverProviderPlugins(), this.initEvents()
            }, o.uninstall = function() {
                var e = this;
                if (!this.opts.disableInformer) {
                    var t = this.uppy.getPlugin(this.id + ":Informer");
                    t && this.uppy.removePlugin(t)
                }
                if (!this.opts.disableStatusBar) {
                    var r = this.uppy.getPlugin(this.id + ":StatusBar");
                    r && this.uppy.removePlugin(r)
                }
                if (!this.opts.disableThumbnailGenerator) {
                    var n = this.uppy.getPlugin(this.id + ":ThumbnailGenerator");
                    n && this.uppy.removePlugin(n)
                }(this.opts.plugins || []).forEach(function(t) {
                    var r = e.uppy.getPlugin(t);
                    r && r.unmount()
                }), this.unmount(), this.removeEvents()
            }, n
        }(__Plugin_112), ___class_112.VERSION = _$package_121.version, ___temp_112),
        _$isDragDropSupported_220 = function() {
            var e = document.createElement("div");
            return "draggable" in e && "ondragstart" in e && "ondrop" in e && "FormData" in window && "FileReader" in window
        },
        _$package_123 = {
            version: "1.4.0"
        },
        ___class_122, ___temp_122;

    function ___extends_122() {
        return (___extends_122 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ___assertThisInitialized_122(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __Plugin_122 = _$lib_93.Plugin,
        __h_122 = _$preact_53.h,
        _$lib_122 = (___temp_122 = ___class_122 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).type = "acquirer", n.id = n.opts.id || "DragDrop", n.title = "Drag & Drop", n.defaultLocale = {
                    strings: {
                        dropHereOr: 'Sürükleyip bırak veya %{browse}',
                        browse: "gözat"
                    }
                }, n.opts = ___extends_122({}, {
                    target: null,
                    inputName: "files[]",
                    width: "100%",
                    height: "100%",
                    note: null
                }, {}, r), n.isDragDropSupported = _$isDragDropSupported_220(), n.removeDragOverClassTimeout = null, n.i18nInit(), n.handleInputChange = n.handleInputChange.bind(___assertThisInitialized_122(n)), n.handleDragOver = n.handleDragOver.bind(___assertThisInitialized_122(n)), n.handleDragLeave = n.handleDragLeave.bind(___assertThisInitialized_122(n)), n.handleDrop = n.handleDrop.bind(___assertThisInitialized_122(n)), n.addFile = n.addFile.bind(___assertThisInitialized_122(n)), n.render = n.render.bind(___assertThisInitialized_122(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.setOptions = function(t) {
                e.prototype.setOptions.call(this, t), this.i18nInit()
            }, o.i18nInit = function() {
                this.translator = new _$Translator_199([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.i18nArray = this.translator.translateArray.bind(this.translator), this.setPluginState()
            }, o.addFile = function(e) {
                try {
                    this.uppy.addFile({
                        source: this.id,
                        name: e.name,
                        type: e.type,
                        data: e,
                        meta: {
                            relativePath: e.relativePath || null
                        }
                    })
                } catch (err) {
                    err.isRestriction || this.uppy.log(err)
                }
            }, o.handleInputChange = function(e) {
                this.uppy.log("[DragDrop] Files selected through input"), _$toArray_229(e.target.files).forEach(this.addFile), e.target.value = null
            }, o.handleDrop = function(e, t) {
                var r = this;
                e.preventDefault(), e.stopPropagation(), clearTimeout(this.removeDragOverClassTimeout), e.dataTransfer.dropEffect = "copy", this.setPluginState({
                    isDraggingOver: !1
                }), this.uppy.log("[DragDrop] Files were dropped"), _$getDroppedFiles_207(e.dataTransfer, {
                    logDropError: function(e) {
                        r.uppy.log(e, "error")
                    }
                }).then(function(e) {
                    e.forEach(r.addFile)
                })
            }, o.handleDragOver = function(e) {
                e.preventDefault(), e.stopPropagation(), clearTimeout(this.removeDragOverClassTimeout), this.setPluginState({
                    isDraggingOver: !0
                })
            }, o.handleDragLeave = function(e) {
                var t = this;
                e.preventDefault(), e.stopPropagation(), clearTimeout(this.removeDragOverClassTimeout), this.removeDragOverClassTimeout = setTimeout(function() {
                    t.setPluginState({
                        isDraggingOver: !1
                    })
                }, 50)
            }, o.renderHiddenFileInput = function() {
                var e = this,
                    t = this.uppy.opts.restrictions;
                return __h_122("input", {
                    class: "uppy-DragDrop-input",
                    type: "file",
                    tabindex: -1,
                    focusable: "false",
                    ref: function(t) {
                        e.fileInputRef = t
                    },
                    name: this.opts.inputName,
                    multiple: 1 !== t.maxNumberOfFiles,
                    accept: t.allowedFileTypes,
                    onchange: this.handleInputChange
                })
            }, o.renderArrowSvg = function() {
                return __h_122("svg", {
                    "aria-hidden": "true",
                    focusable: "false",
                    class: "UppyIcon uppy-DragDrop-arrow",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 16 16"
                }, __h_122("path", {
                    d: "M11 10V0H5v10H2l6 6 6-6h-3zm0 0",
                    "fill-rule": "evenodd"
                }))
            }, o.renderLabel = function() {
                return __h_122("div", {
                    class: "uppy-DragDrop-label"
                }, this.i18nArray("dropHereOr", {
                    browse: __h_122("span", {
                        class: "uppy-DragDrop-browse"
                    }, this.i18n("browse"))
                }))
            }, o.renderNote = function() {
                return __h_122("span", {
                    class: "uppy-DragDrop-note"
                }, this.opts.note)
            }, o.render = function(e) {
                var t = this,
                    r = "\n      uppy-Root\n      uppy-u-reset\n      uppy-DragDrop-container\n      " + (this.isDragDropSupported ? "uppy-DragDrop--is-dragdrop-supported" : "") + "\n      " + (this.getPluginState().isDraggingOver ? "uppy-DragDrop--isDraggingOver" : "") + "\n    ",
                    n = {
                        width: this.opts.width,
                        height: this.opts.height
                    };
                return __h_122("button", {
                    type: "button",
                    class: r,
                    style: n,
                    onClick: function() {
                        return t.fileInputRef.click()
                    },
                    onDragOver: this.handleDragOver,
                    onDragLeave: this.handleDragLeave,
                    onDrop: this.handleDrop
                }, this.renderHiddenFileInput(), __h_122("div", {
                    class: "uppy-DragDrop-inner"
                }, this.renderArrowSvg(), this.renderLabel(), this.renderNote()))
            }, o.install = function() {
                this.setPluginState({
                    isDraggingOver: !1
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, o.uninstall = function() {
                this.unmount()
            }, n
        }(__Plugin_122), ___class_122.VERSION = _$package_123.version, ___temp_122),
        _$package_127 = {
            version: "1.4.0"
        },
        ___class_126, ___temp_126;

    function ___extends_126() {
        return (___extends_126 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ___assertThisInitialized_126(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __Plugin_126 = _$lib_93.Plugin,
        __h_126 = _$preact_53.h,
        _$lib_126 = (___temp_126 = ___class_126 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).id = n.opts.id || "FileInput", n.title = "File Input", n.type = "acquirer", n.defaultLocale = {
                    strings: {
                        chooseFiles: 'Dosyaları seç',
                    }
                }, n.opts = ___extends_126({}, {
                    target: null,
                    pretty: !0,
                    inputName: "files[]"
                }, {}, r), n.i18nInit(), n.render = n.render.bind(___assertThisInitialized_126(n)), n.handleInputChange = n.handleInputChange.bind(___assertThisInitialized_126(n)), n.handleClick = n.handleClick.bind(___assertThisInitialized_126(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.setOptions = function(t) {
                e.prototype.setOptions.call(this, t), this.i18nInit()
            }, o.i18nInit = function() {
                this.translator = new _$Translator_199([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.i18nArray = this.translator.translateArray.bind(this.translator), this.setPluginState()
            }, o.handleInputChange = function(e) {
                var t = this;
                this.uppy.log("[FileInput] Something selected through input..."), _$toArray_229(e.target.files).forEach(function(e) {
                    try {
                        t.uppy.addFile({
                            source: t.id,
                            name: e.name,
                            type: e.type,
                            data: e
                        })
                    } catch (err) {
                        err.isRestriction || t.uppy.log(err)
                    }
                }), e.target.value = null
            }, o.handleClick = function(e) {
                this.input.click()
            }, o.render = function(e) {
                var t = this,
                    r = this.uppy.opts.restrictions,
                    n = r.allowedFileTypes ? r.allowedFileTypes.join(",") : null;
                return __h_126("div", {
                    class: "uppy-Root uppy-FileInput-container"
                }, __h_126("input", {
                    class: "uppy-FileInput-input",
                    style: this.opts.pretty && {
                        width: "0.1px",
                        height: "0.1px",
                        opacity: 0,
                        overflow: "hidden",
                        position: "absolute",
                        zIndex: -1
                    },
                    type: "file",
                    name: this.opts.inputName,
                    onchange: this.handleInputChange,
                    multiple: 1 !== r.maxNumberOfFiles,
                    accept: n,
                    ref: function(e) {
                        t.input = e
                    }
                }), this.opts.pretty && __h_126("button", {
                    class: "uppy-FileInput-btn",
                    type: "button",
                    onclick: this.handleClick
                }, this.i18n("chooseFiles")))
            }, o.install = function() {
                var e = this.opts.target;
                e && this.mount(e, this)
            }, o.uninstall = function() {
                this.unmount()
            }, n
        }(__Plugin_126), ___class_126.VERSION = _$package_127.version, ___temp_126),
        _$package_143 = {
            version: "1.3.2"
        },
        ___class_142, ___temp_142;

    function ___extends_142() {
        return (___extends_142 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var __Plugin_142 = _$lib_93.Plugin,
        __h_142 = _$preact_53.h,
        _$lib_142 = (___temp_142 = ___class_142 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).id = n.opts.id || "ProgressBar", n.title = "Progress Bar", n.type = "progressindicator", n.opts = ___extends_142({}, {
                    target: "body",
                    replaceTargetContent: !1,
                    fixed: !1,
                    hideAfterFinish: !0
                }, r), n.render = n.render.bind(function(e) {
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.render = function(e) {
                var t = e.totalProgress || 0,
                    r = 100 === t && this.opts.hideAfterFinish;
                return __h_142("div", {
                    class: "uppy uppy-ProgressBar",
                    style: {
                        position: this.opts.fixed ? "fixed" : "initial"
                    },
                    "aria-hidden": r
                }, __h_142("div", {
                    class: "uppy-ProgressBar-inner",
                    style: {
                        width: t + "%"
                    }
                }), __h_142("div", {
                    class: "uppy-ProgressBar-percentage"
                }, t))
            }, o.install = function() {
                var e = this.opts.target;
                e && this.mount(e, this)
            }, o.uninstall = function() {
                this.unmount()
            }, n
        }(__Plugin_142), ___class_142.VERSION = _$package_143.version, ___temp_142),
        _$package_125 = {
            version: "1.3.3"
        },
        ___class_124, ___temp_124;

    function ___assertThisInitialized_124(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __Plugin_124 = _$lib_93.Plugin,
        __Provider_124 = _$lib_89.Provider,
        __h_124 = _$preact_53.h,
        _$lib_124 = (___temp_124 = ___class_124 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).id = n.opts.id || "Dropbox", __Provider_124.initPlugin(___assertThisInitialized_124(n), r), n.title = n.opts.title || "Dropbox", n.icon = function() {
                    return __h_124("svg", {
                        "aria-hidden": "true",
                        focusable: "false",
                        width: "128",
                        height: "128",
                        viewBox: "0 0 128 128"
                    }, __h_124("path", {
                        d: "M31.997 11L64 31.825 31.997 52.651 0 31.825 31.997 11zM96 11l32 20.825-32 20.826-32-20.826L96 11zM0 73.476l31.997-20.825L64 73.476 31.997 94.302 0 73.476zm96-20.825l32 20.825-32 20.826-32-20.826 32-20.825zm-64.508 48.254l32.003-20.826 31.997 20.826-31.997 20.825-32.003-20.825z",
                        fill: "#0260FF",
                        "fill-rule": "nonzero"
                    }))
                }, n.provider = new __Provider_124(t, {
                    companionUrl: n.opts.companionUrl,
                    companionHeaders: n.opts.companionHeaders || n.opts.serverHeaders,
                    storage: n.opts.storage,
                    provider: "dropbox",
                    pluginId: n.id
                }), n.onFirstRender = n.onFirstRender.bind(___assertThisInitialized_124(n)), n.render = n.render.bind(___assertThisInitialized_124(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.install = function() {
                this.view = new _$lib_155(this, {
                    provider: this.provider
                }), this.setPluginState({
                    authenticated: !1,
                    files: [],
                    folders: [],
                    directories: [],
                    activeRow: -1,
                    filterInput: "",
                    isSearchVisible: !1
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, o.uninstall = function() {
                this.view.tearDown(), this.unmount()
            }, o.onFirstRender = function() {
                return this.view.getFolder()
            }, o.render = function(e) {
                return this.view.render(e)
            }, n
        }(__Plugin_124), ___class_124.VERSION = _$package_125.version, ___temp_124),
        _$DriveProviderViews_135 = function(e) {
            var t, r;

            function n() {
                return e.apply(this, arguments) || this
            }
            return r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r, n.prototype.toggleCheckbox = function(t, r) {
                t.stopPropagation(), t.preventDefault(), r.custom.isTeamDrive || r.custom.isSharedDrive || e.prototype.toggleCheckbox.call(this, t, r)
            }, n
        }(_$lib_155),
        _$package_137 = {
            version: "1.3.3"
        },
        ___class_136, ___temp_136;

    function ___assertThisInitialized_136(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __Plugin_136 = _$lib_93.Plugin,
        __Provider_136 = _$lib_89.Provider,
        __h_136 = _$preact_53.h,
        _$lib_136 = (___temp_136 = ___class_136 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).id = n.opts.id || "GoogleDrive", n.title = n.opts.title || "Google Drive", __Provider_136.initPlugin(___assertThisInitialized_136(n), r), n.title = n.opts.title || "Google Drive", n.icon = function() {
                    return __h_136("svg", {
                        "aria-hidden": "true",
                        focusable: "false",
                        width: "18px",
                        height: "16px",
                        viewBox: "0 0 18 16",
                        version: "1.1"
                    }, __h_136("g", {
                        "fill-rule": "evenodd"
                    }, __h_136("polygon", {
                        fill: "#3089FC",
                        points: "6.32475 10.2 18 10.2 14.999625 15.3 3.324375 15.3"
                    }), __h_136("polygon", {
                        fill: "#00A85D",
                        points: "3.000375 15.3 0 10.2 5.83875 0.275974026 8.838 5.37597403 5.999625 10.2"
                    }), __h_136("polygon", {
                        fill: "#FFD024",
                        points: "11.838375 9.92402597 5.999625 0 12.000375 0 17.839125 9.92402597"
                    })))
                }, n.provider = new __Provider_136(t, {
                    companionUrl: n.opts.companionUrl,
                    companionHeaders: n.opts.companionHeaders || n.opts.serverHeaders,
                    storage: n.opts.storage,
                    provider: "drive",
                    authProvider: "google",
                    pluginId: n.id
                }), n.onFirstRender = n.onFirstRender.bind(___assertThisInitialized_136(n)), n.render = n.render.bind(___assertThisInitialized_136(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.install = function() {
                this.view = new _$DriveProviderViews_135(this, {
                    provider: this.provider
                }), this.setPluginState({
                    authenticated: !1,
                    files: [],
                    folders: [],
                    directories: [],
                    activeRow: -1,
                    filterInput: "",
                    isSearchVisible: !1,
                    hasTeamDrives: !1,
                    teamDrives: [],
                    teamDriveId: ""
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, o.uninstall = function() {
                this.view.tearDown(), this.unmount()
            }, o.onFirstRender = function() {
                return this.view.getFolder("root", "/")
            }, o.render = function(e) {
                return this.view.render(e)
            }, n
        }(__Plugin_136), ___class_136.VERSION = _$package_137.version, ___temp_136),
        _$package_141 = {
            version: "1.3.3"
        },
        ___class_140, ___temp_140;

    function ___assertThisInitialized_140(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __Plugin_140 = _$lib_93.Plugin,
        __Provider_140 = _$lib_89.Provider,
        __h_140 = _$preact_53.h,
        _$lib_140 = (___temp_140 = ___class_140 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).id = n.opts.id || "Instagram", __Provider_140.initPlugin(___assertThisInitialized_140(n), r), n.title = n.opts.title || "Instagram", n.icon = function() {
                    return __h_140("svg", {
                        "aria-hidden": "true",
                        focusable: "false",
                        fill: "#DE3573",
                        width: "28",
                        height: "28",
                        viewBox: "0 0 512 512"
                    }, __h_140("path", {
                        d: "M256,49.471c67.266,0,75.233.257,101.8,1.469,24.562,1.121,37.9,5.224,46.778,8.674a78.052,78.052,0,0,1,28.966,18.845,78.052,78.052,0,0,1,18.845,28.966c3.45,8.877,7.554,22.216,8.674,46.778,1.212,26.565,1.469,34.532,1.469,101.8s-0.257,75.233-1.469,101.8c-1.121,24.562-5.225,37.9-8.674,46.778a83.427,83.427,0,0,1-47.811,47.811c-8.877,3.45-22.216,7.554-46.778,8.674-26.56,1.212-34.527,1.469-101.8,1.469s-75.237-.257-101.8-1.469c-24.562-1.121-37.9-5.225-46.778-8.674a78.051,78.051,0,0,1-28.966-18.845,78.053,78.053,0,0,1-18.845-28.966c-3.45-8.877-7.554-22.216-8.674-46.778-1.212-26.564-1.469-34.532-1.469-101.8s0.257-75.233,1.469-101.8c1.121-24.562,5.224-37.9,8.674-46.778A78.052,78.052,0,0,1,78.458,78.458a78.053,78.053,0,0,1,28.966-18.845c8.877-3.45,22.216-7.554,46.778-8.674,26.565-1.212,34.532-1.469,101.8-1.469m0-45.391c-68.418,0-77,.29-103.866,1.516-26.815,1.224-45.127,5.482-61.151,11.71a123.488,123.488,0,0,0-44.62,29.057A123.488,123.488,0,0,0,17.3,90.982C11.077,107.007,6.819,125.319,5.6,152.134,4.369,179,4.079,187.582,4.079,256S4.369,333,5.6,359.866c1.224,26.815,5.482,45.127,11.71,61.151a123.489,123.489,0,0,0,29.057,44.62,123.486,123.486,0,0,0,44.62,29.057c16.025,6.228,34.337,10.486,61.151,11.71,26.87,1.226,35.449,1.516,103.866,1.516s77-.29,103.866-1.516c26.815-1.224,45.127-5.482,61.151-11.71a128.817,128.817,0,0,0,73.677-73.677c6.228-16.025,10.486-34.337,11.71-61.151,1.226-26.87,1.516-35.449,1.516-103.866s-0.29-77-1.516-103.866c-1.224-26.815-5.482-45.127-11.71-61.151a123.486,123.486,0,0,0-29.057-44.62A123.487,123.487,0,0,0,421.018,17.3C404.993,11.077,386.681,6.819,359.866,5.6,333,4.369,324.418,4.079,256,4.079h0Z"
                    }), __h_140("path", {
                        d: "M256,126.635A129.365,129.365,0,1,0,385.365,256,129.365,129.365,0,0,0,256,126.635Zm0,213.338A83.973,83.973,0,1,1,339.974,256,83.974,83.974,0,0,1,256,339.973Z"
                    }), __h_140("circle", {
                        cx: "390.476",
                        cy: "121.524",
                        r: "30.23"
                    }))
                }, n.provider = new __Provider_140(t, {
                    companionUrl: n.opts.companionUrl,
                    companionHeaders: n.opts.companionHeaders || n.opts.serverHeaders,
                    storage: n.opts.storage,
                    provider: "instagram",
                    authProvider: "instagram",
                    pluginId: n.id
                }), n.onFirstRender = n.onFirstRender.bind(___assertThisInitialized_140(n)), n.render = n.render.bind(___assertThisInitialized_140(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.install = function() {
                this.view = new _$lib_155(this, {
                    provider: this.provider,
                    viewType: "grid",
                    showTitles: !1,
                    showFilter: !1,
                    showBreadcrumbs: !1
                }), this.setPluginState({
                    authenticated: !1,
                    files: [],
                    folders: [],
                    directories: [],
                    activeRow: -1,
                    filterInput: "",
                    isSearchVisible: !1
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, o.uninstall = function() {
                this.view.tearDown(), this.unmount()
            }, o.onFirstRender = function() {
                this.view.getFolder("recent")
            }, o.render = function(e) {
                return this.view.render(e)
            }, n
        }(__Plugin_140), ___class_140.VERSION = _$package_141.version, ___temp_140);

    function ___assertThisInitialized_191(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __h_191 = _$preact_53.h,
        UrlUI = function(e) {
            var t, r;

            function n(t) {
                var r;
                return (r = e.call(this, t) || this).handleKeyPress = r.handleKeyPress.bind(___assertThisInitialized_191(r)), r.handleClick = r.handleClick.bind(___assertThisInitialized_191(r)), r
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.componentDidMount = function() {
                this.input.value = ""
            }, o.handleKeyPress = function(e) {
                13 === e.keyCode && this.props.addFile(this.input.value)
            }, o.handleClick = function() {
                this.props.addFile(this.input.value)
            }, o.render = function() {
                var e = this;
                return __h_191("div", {
                    class: "uppy-Url"
                }, __h_191("input", {
                    class: "uppy-u-reset uppy-c-textInput uppy-Url-input",
                    type: "text",
                    "aria-label": this.props.i18n("enterUrlToImport"),
                    placeholder: this.props.i18n("enterUrlToImport"),
                    onkeyup: this.handleKeyPress,
                    ref: function(t) {
                        e.input = t
                    },
                    "data-uppy-super-focusable": !0
                }), __h_191("button", {
                    class: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Url-importButton",
                    type: "button",
                    onclick: this.handleClick
                }, this.props.i18n("import")))
            }, n
        }(_$preact_53.Component),
        _$UrlUI_191 = UrlUI,
        _$forEachDroppedOrPastedUrl_193 = function(e, t, r) {
            var n, o = _$toArray_229(e.items);
            switch (t) {
                case "paste":
                    if (o.some(function(e) {
                            return "file" === e.kind
                        })) return;
                    n = o.filter(function(e) {
                        return "string" === e.kind && "text/plain" === e.type
                    });
                    break;
                case "drop":
                    n = o.filter(function(e) {
                        return "string" === e.kind && "text/uri-list" === e.type
                    });
                    break;
                default:
                    throw new Error("isDropOrPaste must be either 'drop' or 'paste', but it's " + t)
            }
            n.forEach(function(e) {
                e.getAsString(function(e) {
                    return r(e)
                })
            })
        },
        _$package_194 = {
            version: "1.4.0"
        },
        ___class_192, ___temp_192;

    function ___extends_192() {
        return (___extends_192 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ___assertThisInitialized_192(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __Plugin_192 = _$lib_93.Plugin,
        __h_192 = _$preact_53.h,
        __RequestClient_192 = _$lib_89.RequestClient;

    function UrlIcon() {
        return __h_192("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "23",
            height: "23",
            viewBox: "0 0 23 23"
        }, __h_192("path", {
            d: "M20.485 11.236l-2.748 2.737c-.184.182-.367.365-.642.547-1.007.73-2.107 1.095-3.298 1.095-1.65 0-3.298-.73-4.398-2.19-.275-.365-.183-1.003.183-1.277.367-.273 1.008-.182 1.283.183 1.191 1.642 3.482 1.915 5.13.73a.714.714 0 0 0 .367-.365l2.75-2.737c1.373-1.46 1.373-3.74-.093-5.108a3.72 3.72 0 0 0-5.13 0L12.33 6.4a.888.888 0 0 1-1.283 0 .88.88 0 0 1 0-1.277l1.558-1.55a5.38 5.38 0 0 1 7.605 0c2.29 2.006 2.382 5.564.274 7.662zm-8.979 6.294L9.95 19.081a3.72 3.72 0 0 1-5.13 0c-1.467-1.368-1.467-3.74-.093-5.108l2.75-2.737.366-.365c.824-.547 1.74-.82 2.748-.73 1.008.183 1.833.639 2.382 1.46.275.365.917.456 1.283.182.367-.273.458-.912.183-1.277-.916-1.186-2.199-1.915-3.573-2.098-1.374-.273-2.84.091-4.031 1.004l-.55.547-2.749 2.737c-2.107 2.189-2.015 5.655.092 7.753C4.727 21.453 6.101 22 7.475 22c1.374 0 2.749-.547 3.848-1.55l1.558-1.551a.88.88 0 0 0 0-1.278c-.367-.364-1.008-.456-1.375-.09z",
            fill: "#FF814F",
            "fill-rule": "nonzero"
        }))
    }
    var _$lib_192 = (___temp_192 = ___class_192 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                if ((n = e.call(this, t, r) || this).id = n.opts.id || "Url", n.title = n.opts.title || "Link", n.type = "acquirer", n.icon = function() {
                        return __h_192(UrlIcon, null)
                    }, n.defaultLocale = {
                        strings: {
                            import: 'Ekle',
                            enterUrlToImport: 'Dosya URL’sini buraya yapıştırın',
                            failedToFetch: 'Bu URL’den alınamadı, lütfen doğru olduğundan emin olun',
                            enterCorrectUrl: 'Hatalı URL: Lütfen bir dosyaya doğrudan bağlantı girdiğinizden emin olun.'
                        }
                    }, n.opts = ___extends_192({}, {}, {}, r), n.i18nInit(), n.hostname = n.opts.companionUrl, !n.hostname) throw new Error("Companion hostname is required, please consult https://uppy.io/docs/companion");
                return n.getMeta = n.getMeta.bind(___assertThisInitialized_192(n)), n.addFile = n.addFile.bind(___assertThisInitialized_192(n)), n.handleRootDrop = n.handleRootDrop.bind(___assertThisInitialized_192(n)), n.handleRootPaste = n.handleRootPaste.bind(___assertThisInitialized_192(n)), n.client = new __RequestClient_192(t, {
                    companionUrl: n.opts.companionUrl,
                    companionHeaders: n.opts.companionHeaders || n.opts.serverHeaders
                }), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.setOptions = function(t) {
                e.prototype.setOptions.call(this, t), this.i18nInit()
            }, o.i18nInit = function() {
                this.translator = new _$Translator_199([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.i18nArray = this.translator.translateArray.bind(this.translator), this.setPluginState()
            }, o.getFileNameFromUrl = function(e) {
                return e.substring(e.lastIndexOf("/") + 1)
            }, o.checkIfCorrectURL = function(e) {
                if (!e) return !1;
                var t = e.match(/^([a-z0-9]+):\/\//)[1];
                return "http" === t || "https" === t
            }, o.addProtocolToURL = function(e) {
                return /^[a-z0-9]+:\/\//.test(e) ? e : "http://" + e
            }, o.getMeta = function(e) {
                var t = this;
                return this.client.post("url/meta", {
                    url: e
                }).then(function(e) {
                    if (e.error) throw t.uppy.log("[URL] Error:"), t.uppy.log(e.error), new Error("Failed to fetch the file");
                    return e
                })
            }, o.addFile = function(e) {
                var t = this;
                return e = this.addProtocolToURL(e), this.checkIfCorrectURL(e) ? this.getMeta(e).then(function(r) {
                    return {
                        source: t.id,
                        name: t.getFileNameFromUrl(e),
                        type: r.type,
                        data: {
                            size: r.size
                        },
                        isRemote: !0,
                        body: {
                            url: e
                        },
                        remote: {
                            companionUrl: t.opts.companionUrl,
                            url: t.hostname + "/url/get",
                            body: {
                                fileId: e,
                                url: e
                            },
                            providerOptions: t.client.opts
                        }
                    }
                }).then(function(e) {
                    t.uppy.log("[Url] Adding remote file");
                    try {
                        t.uppy.addFile(e)
                    } catch (err) {
                        err.isRestriction || t.uppy.log(err)
                    }
                }).catch(function(e) {
                    t.uppy.log(e), t.uppy.info({
                        message: t.i18n("failedToFetch"),
                        details: e
                    }, "error", 4e3)
                }) : (this.uppy.log("[URL] Incorrect URL entered: " + e), void this.uppy.info(this.i18n("enterCorrectUrl"), "error", 4e3))
            }, o.handleRootDrop = function(e) {
                var t = this;
                _$forEachDroppedOrPastedUrl_193(e.dataTransfer, "drop", function(e) {
                    t.uppy.log("[URL] Adding file from dropped url: " + e), t.addFile(e)
                })
            }, o.handleRootPaste = function(e) {
                var t = this;
                _$forEachDroppedOrPastedUrl_193(e.clipboardData, "paste", function(e) {
                    t.uppy.log("[URL] Adding file from pasted url: " + e), t.addFile(e)
                })
            }, o.render = function(e) {
                return __h_192(_$UrlUI_191, {
                    i18n: this.i18n,
                    addFile: this.addFile
                })
            }, o.install = function() {
                var e = this.opts.target;
                e && this.mount(e, this)
            }, o.uninstall = function() {
                this.unmount()
            }, n
        }(__Plugin_192), ___class_192.VERSION = _$package_194.version, ___temp_192),
        mimeToExtensions = {
            "video/ogg": "ogv",
            "audio/ogg": "ogg",
            "video/webm": "webm",
            "audio/webm": "webm",
            "video/x-matroska": "mkv",
            "video/mp4": "mp4",
            "audio/mp3": "mp3"
        },
        _$getFileTypeExtension_214 = function(e) {
            return e = e.replace(/;.*$/, ""), mimeToExtensions[e] || null
        },
        _$canvasToBlob_200 = function(e, t, r) {
            return e.toBlob ? new Promise(function(n) {
                e.toBlob(n, t, r)
            }) : Promise.resolve().then(function() {
                return _$dataURItoBlob_201(e.toDataURL(t, r), {})
            })
        },
        _$supportsMediaRecorder_236 = function() {
            return "function" == typeof MediaRecorder && !!MediaRecorder.prototype && "function" == typeof MediaRecorder.prototype.start
        },
        __h_230 = _$preact_53.h,
        _$CameraIcon_230 = function(e) {
            return __h_230("svg", {
                "aria-hidden": "true",
                focusable: "false",
                fill: "#0097DC",
                width: "66",
                height: "55",
                viewBox: "0 0 66 55"
            }, __h_230("path", {
                d: "M57.3 8.433c4.59 0 8.1 3.51 8.1 8.1v29.7c0 4.59-3.51 8.1-8.1 8.1H8.7c-4.59 0-8.1-3.51-8.1-8.1v-29.7c0-4.59 3.51-8.1 8.1-8.1h9.45l4.59-7.02c.54-.54 1.35-1.08 2.16-1.08h16.2c.81 0 1.62.54 2.16 1.08l4.59 7.02h9.45zM33 14.64c-8.62 0-15.393 6.773-15.393 15.393 0 8.62 6.773 15.393 15.393 15.393 8.62 0 15.393-6.773 15.393-15.393 0-8.62-6.773-15.393-15.393-15.393zM33 40c-5.648 0-9.966-4.319-9.966-9.967 0-5.647 4.318-9.966 9.966-9.966s9.966 4.319 9.966 9.966C42.966 35.681 38.648 40 33 40z",
                "fill-rule": "evenodd"
            }))
        },
        __h_234 = _$preact_53.h,
        _$SnapshotButton_234 = function(e) {
            var t = e.onSnapshot,
                r = e.i18n;
            return __h_234("button", {
                class: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--picture",
                type: "button",
                title: r("takePicture"),
                "aria-label": r("takePicture"),
                onclick: t,
                "data-uppy-super-focusable": !0
            }, _$CameraIcon_230())
        },
        __h_233 = _$preact_53.h,
        _$RecordButton_233 = function(e) {
            var t = e.recording,
                r = e.onStartRecording,
                n = e.onStopRecording,
                o = e.i18n;
            return t ? __h_233("button", {
                class: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--video",
                type: "button",
                title: o("stopRecording"),
                "aria-label": o("stopRecording"),
                onclick: n,
                "data-uppy-super-focusable": !0
            }, __h_233("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "UppyIcon",
                width: "100",
                height: "100",
                viewBox: "0 0 100 100"
            }, __h_233("rect", {
                x: "15",
                y: "15",
                width: "70",
                height: "70"
            }))) : __h_233("button", {
                class: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--video",
                type: "button",
                title: o("startRecording"),
                "aria-label": o("startRecording"),
                onclick: r,
                "data-uppy-super-focusable": !0
            }, __h_233("svg", {
                "aria-hidden": "true",
                focusable: "false",
                class: "UppyIcon",
                width: "100",
                height: "100",
                viewBox: "0 0 100 100"
            }, __h_233("circle", {
                cx: "50",
                cy: "50",
                r: "40"
            })))
        },
        __h_231 = _$preact_53.h,
        __Component_231 = _$preact_53.Component;

    function isModeAvailable(e, t) {
        return -1 !== e.indexOf(t)
    }
    var CameraScreen = function(e) {
            var t, r;

            function n() {
                return e.apply(this, arguments) || this
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.componentDidMount = function() {
                this.props.onFocus()
            }, o.componentWillUnmount = function() {
                this.props.onStop()
            }, o.render = function() {
                var e = this.props.supportsRecording && (isModeAvailable(this.props.modes, "video-only") || isModeAvailable(this.props.modes, "audio-only") || isModeAvailable(this.props.modes, "video-audio")),
                    t = isModeAvailable(this.props.modes, "picture");
                return __h_231("div", {
                    class: "uppy uppy-Webcam-container"
                }, __h_231("div", {
                    class: "uppy-Webcam-videoContainer"
                }, __h_231("video", {
                    class: "uppy-Webcam-video  " + (this.props.mirror ? "uppy-Webcam-video--mirrored" : ""),
                    autoplay: !0,
                    muted: !0,
                    playsinline: !0,
                    srcObject: this.props.src || ""
                })), __h_231("div", {
                    class: "uppy-Webcam-buttonContainer"
                }, t ? _$SnapshotButton_234(this.props) : null, " ", e ? _$RecordButton_233(this.props) : null))
            }, n
        }(__Component_231),
        _$CameraScreen_231 = CameraScreen,
        __h_232 = _$preact_53.h,
        _$PermissionsScreen_232 = function(e) {
            return __h_232("div", {
                class: "uppy-Webcam-permissons"
            }, __h_232("div", {
                class: "uppy-Webcam-permissonsIcon"
            }, e.icon()), __h_232("h1", {
                class: "uppy-Webcam-title"
            }, e.i18n("allowAccessTitle")), __h_232("p", null, e.i18n("allowAccessDescription")))
        },
        _$package_237 = {
            version: "1.4.0"
        },
        ___class_235, ___temp_235;

    function ___extends_235() {
        return (___extends_235 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ___assertThisInitialized_235(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __h_235 = _$preact_53.h,
        __Plugin_235 = _$lib_93.Plugin,
        _$lib_235 = (___temp_235 = ___class_235 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                (n = e.call(this, t, r) || this).mediaDevices = function() {
                    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) return navigator.mediaDevices;
                    var e = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
                    return e ? {
                        getUserMedia: function(t) {
                            return new Promise(function(r, n) {
                                e.call(navigator, t, r, n)
                            })
                        }
                    } : null
                }(), n.supportsUserMedia = !!n.mediaDevices, n.protocol = location.protocol.match(/https/i) ? "https" : "http", n.id = n.opts.id || "Webcam", n.title = n.opts.title || "Camera", n.type = "acquirer", n.icon = _$CameraIcon_230, n.defaultLocale = {
                    strings: {
                        smile: 'Gülümse!',
                        startRecording: 'Video kaydına başla',
                        stopRecording: 'Video kaydını durdur',
                        takePicture: 'Fotoğraf çek',
                        allowAccessTitle: 'Lütfen kameranıza erişim izni verin',
                        allowAccessDescription: 'Kameranızla fotoğraf çekmek veya video kaydetmek için lütfen erişim izni verin.'   
                    }
                };
                var o = {
                    onBeforeSnapshot: function() {
                        return Promise.resolve()
                    },
                    countdown: !1,
                    modes: ["video-audio", "video-only", "audio-only", "picture"],
                    mirror: !0,
                    facingMode: "user",
                    preferredVideoMimeType: null
                };
                return n.opts = ___extends_235({}, o, {}, r), n.i18nInit(), n.install = n.install.bind(___assertThisInitialized_235(n)), n.setPluginState = n.setPluginState.bind(___assertThisInitialized_235(n)), n.render = n.render.bind(___assertThisInitialized_235(n)), n.start = n.start.bind(___assertThisInitialized_235(n)), n.stop = n.stop.bind(___assertThisInitialized_235(n)), n.takeSnapshot = n.takeSnapshot.bind(___assertThisInitialized_235(n)), n.startRecording = n.startRecording.bind(___assertThisInitialized_235(n)), n.stopRecording = n.stopRecording.bind(___assertThisInitialized_235(n)), n.oneTwoThreeSmile = n.oneTwoThreeSmile.bind(___assertThisInitialized_235(n)), n.focus = n.focus.bind(___assertThisInitialized_235(n)), n.webcamActive = !1, n.opts.countdown && (n.opts.onBeforeSnapshot = n.oneTwoThreeSmile), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.setOptions = function(t) {
                e.prototype.setOptions.call(this, t), this.i18nInit()
            }, o.i18nInit = function() {
                this.translator = new _$Translator_199([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.i18nArray = this.translator.translateArray.bind(this.translator), this.setPluginState()
            }, o.isSupported = function() {
                return !!this.mediaDevices
            }, o.getConstraints = function() {
                return {
                    audio: -1 !== this.opts.modes.indexOf("video-audio") || -1 !== this.opts.modes.indexOf("audio-only"),
                    video: !(-1 === this.opts.modes.indexOf("video-audio") && -1 === this.opts.modes.indexOf("video-only") && -1 === this.opts.modes.indexOf("picture")) && {
                        facingMode: this.opts.facingMode
                    }
                }
            }, o.start = function() {
                var e = this;
                if (!this.isSupported()) return Promise.reject(new Error("Webcam access not supported"));
                this.webcamActive = !0;
                var t = this.getConstraints();
                return this.mediaDevices.getUserMedia(t).then(function(t) {
                    e.stream = t, e.setPluginState({
                        cameraReady: !0
                    })
                }).catch(function(t) {
                    e.setPluginState({
                        cameraError: t
                    })
                })
            }, o.startRecording = function() {
                var e = this,
                    t = {},
                    r = this.opts.preferredVideoMimeType;
                r && MediaRecorder.isTypeSupported(r) && _$getFileTypeExtension_214(r) && (t.mimeType = r), this.recorder = new MediaRecorder(this.stream, t), this.recordingChunks = [], this.recorder.addEventListener("dataavailable", function(t) {
                    e.recordingChunks.push(t.data)
                }), this.recorder.start(), this.setPluginState({
                    isRecording: !0
                })
            }, o.stopRecording = function() {
                var e = this;
                return new Promise(function(t, r) {
                    e.recorder.addEventListener("stop", function() {
                        t()
                    }), e.recorder.stop()
                }).then(function() {
                    return e.setPluginState({
                        isRecording: !1
                    }), e.getVideo()
                }).then(function(t) {
                    try {
                        e.uppy.addFile(t)
                    } catch (err) {
                        err.isRestriction || e.uppy.log(err)
                    }
                }).then(function() {
                    e.recordingChunks = null, e.recorder = null
                }, function(t) {
                    throw e.recordingChunks = null, e.recorder = null, t
                })
            }, o.stop = function() {
                this.stream.getAudioTracks().forEach(function(e) {
                    e.stop()
                }), this.stream.getVideoTracks().forEach(function(e) {
                    e.stop()
                }), this.webcamActive = !1, this.stream = null
            }, o.getVideoElement = function() {
                return this.el.querySelector(".uppy-Webcam-video")
            }, o.oneTwoThreeSmile = function() {
                var e = this;
                return new Promise(function(t, r) {
                    var n = e.opts.countdown,
                        o = setInterval(function() {
                            if (!e.webcamActive) return clearInterval(o), e.captureInProgress = !1, r(new Error("Webcam is not active"));
                            n > 0 ? (e.uppy.info(n + "...", "warning", 800), n--) : (clearInterval(o), e.uppy.info(e.i18n("smile"), "success", 1500), setTimeout(function() {
                                return t()
                            }, 1500))
                        }, 1e3)
                })
            }, o.takeSnapshot = function() {
                var e = this;
                this.captureInProgress || (this.captureInProgress = !0, this.opts.onBeforeSnapshot().catch(function(t) {
                    var r = "object" == typeof t ? t.message : t;
                    return e.uppy.info(r, "error", 5e3), Promise.reject(new Error("onBeforeSnapshot: " + r))
                }).then(function() {
                    return e.getImage()
                }).then(function(t) {
                    e.captureInProgress = !1;
                    try {
                        e.uppy.addFile(t)
                    } catch (err) {
                        err.isRestriction || e.uppy.log(err)
                    }
                }, function(t) {
                    throw e.captureInProgress = !1, t
                }))
            }, o.getImage = function() {
                var e = this,
                    t = this.getVideoElement();
                if (!t) return Promise.reject(new Error("No video element found, likely due to the Webcam tab being closed."));
                var r = "cam-" + Date.now() + ".jpg",
                    n = t.videoWidth,
                    o = t.videoHeight,
                    i = document.createElement("canvas");
                return i.width = n, i.height = o, i.getContext("2d").drawImage(t, 0, 0), _$canvasToBlob_200(i, "image/jpeg").then(function(t) {
                    return {
                        source: e.id,
                        name: r,
                        data: new Blob([t], {
                            type: "image/jpeg"
                        }),
                        type: "image/jpeg"
                    }
                })
            }, o.getVideo = function() {
                var e = this.recordingChunks[0].type,
                    t = _$getFileTypeExtension_214(e);
                if (!t) return Promise.reject(new Error('Could not retrieve recording: Unsupported media type "' + e + '"'));
                var r = "webcam-" + Date.now() + "." + t,
                    n = new Blob(this.recordingChunks, {
                        type: e
                    }),
                    o = {
                        source: this.id,
                        name: r,
                        data: new Blob([n], {
                            type: e
                        }),
                        type: e
                    };
                return Promise.resolve(o)
            }, o.focus = function() {
                var e = this;
                this.opts.countdown && setTimeout(function() {
                    e.uppy.info(e.i18n("smile"), "success", 1500)
                }, 1e3)
            }, o.render = function(e) {
                this.webcamActive || this.start();
                var t = this.getPluginState();
                return t.cameraReady ? __h_235(_$CameraScreen_231, ___extends_235({}, t, {
                    onSnapshot: this.takeSnapshot,
                    onStartRecording: this.startRecording,
                    onStopRecording: this.stopRecording,
                    onFocus: this.focus,
                    onStop: this.stop,
                    i18n: this.i18n,
                    modes: this.opts.modes,
                    supportsRecording: _$supportsMediaRecorder_236(),
                    recording: t.isRecording,
                    mirror: this.opts.mirror,
                    src: this.stream
                })) : __h_235(_$PermissionsScreen_232, {
                    icon: _$CameraIcon_230,
                    i18n: this.i18n
                })
            }, o.install = function() {
                this.setPluginState({
                    cameraReady: !1
                });
                var e = this.opts.target;
                e && this.mount(e, this)
            }, o.uninstall = function() {
                this.stream && this.stop(), this.unmount()
            }, n
        }(__Plugin_235), ___class_235.VERSION = _$package_237.version, ___temp_235),
        _$requiresPort_56 = function(e, t) {
            if (t = t.split(":")[0], !(e = +e)) return !1;
            switch (t) {
                case "http":
                case "ws":
                    return 80 !== e;
                case "https":
                case "wss":
                    return 443 !== e;
                case "ftp":
                    return 21 !== e;
                case "gopher":
                    return 70 !== e;
                case "file":
                    return !1
            }
            return 0 !== e
        },
        _$querystringify_55 = {},
        undef, __has_55 = Object.prototype.hasOwnProperty;

    function decode(e) {
        try {
            return decodeURIComponent(e.replace(/\+/g, " "))
        } catch (t) {
            return null
        }
    }
    _$querystringify_55.stringify = function(e, t) {
        t = t || "";
        var r, n, o = [];
        for (n in "string" != typeof t && (t = "?"), e)
            if (__has_55.call(e, n)) {
                if ((r = e[n]) || null !== r && r !== undef && !isNaN(r) || (r = ""), n = encodeURIComponent(n), r = encodeURIComponent(r), null === n || null === r) continue;
                o.push(n + "=" + r)
            } return o.length ? t + o.join("&") : ""
    }, _$querystringify_55.parse = function(e) {
        for (var t, r = /([^=?&]+)=?([^&]*)/g, n = {}; t = r.exec(e);) {
            var o = decode(t[1]),
                i = decode(t[2]);
            null === o || null === i || o in n || (n[o] = i)
        }
        return n
    };
    var _$urlParse_76 = {};
    (function(e) {
        "use strict";
        var t = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
            r = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
            n = new RegExp("^[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+");

        function o(e) {
            return (e || "").toString().replace(n, "")
        }
        var i = [
                ["#", "hash"],
                ["?", "query"],
                function(e) {
                    return e.replace("\\", "/")
                },
                ["/", "pathname"],
                ["@", "auth", 1],
                [NaN, "host", void 0, 1, 1],
                [/:(\d+)$/, "port", void 0, 1],
                [NaN, "hostname", void 0, 1, 1]
            ],
            s = {
                hash: 1,
                query: 1
            };

        function a(r) {
            var n, o = ("undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {}).location || {},
                i = {},
                a = typeof(r = r || o);
            if ("blob:" === r.protocol) i = new u(unescape(r.pathname), {});
            else if ("string" === a)
                for (n in i = new u(r, {}), s) delete i[n];
            else if ("object" === a) {
                for (n in r) n in s || (i[n] = r[n]);
                void 0 === i.slashes && (i.slashes = t.test(r.href))
            }
            return i
        }

        function l(e) {
            e = o(e);
            var t = r.exec(e);
            return {
                protocol: t[1] ? t[1].toLowerCase() : "",
                slashes: !!t[2],
                rest: t[3]
            }
        }

        function u(e, t, r) {
            if (e = o(e), !(this instanceof u)) return new u(e, t, r);
            var n, s, c, p, d, _, h = i.slice(),
                f = typeof t,
                g = this,
                m = 0;
            for ("object" !== f && "string" !== f && (r = t, t = null), r && "function" != typeof r && (r = _$querystringify_55.parse), t = a(t), n = !(s = l(e || "")).protocol && !s.slashes, g.slashes = s.slashes || n && t.slashes, g.protocol = s.protocol || t.protocol || "", e = s.rest, s.slashes || (h[3] = [/(.*)/, "pathname"]); m < h.length; m++) "function" != typeof(p = h[m]) ? (c = p[0], _ = p[1], c != c ? g[_] = e : "string" == typeof c ? ~(d = e.indexOf(c)) && ("number" == typeof p[2] ? (g[_] = e.slice(0, d), e = e.slice(d + p[2])) : (g[_] = e.slice(d), e = e.slice(0, d))) : (d = c.exec(e)) && (g[_] = d[1], e = e.slice(0, d.index)), g[_] = g[_] || n && p[3] && t[_] || "", p[4] && (g[_] = g[_].toLowerCase())) : e = p(e);
            r && (g.query = r(g.query)), n && t.slashes && "/" !== g.pathname.charAt(0) && ("" !== g.pathname || "" !== t.pathname) && (g.pathname = function(e, t) {
                if ("" === e) return t;
                for (var r = (t || "/").split("/").slice(0, -1).concat(e.split("/")), n = r.length, o = r[n - 1], i = !1, s = 0; n--;) "." === r[n] ? r.splice(n, 1) : ".." === r[n] ? (r.splice(n, 1), s++) : s && (0 === n && (i = !0), r.splice(n, 1), s--);
                return i && r.unshift(""), "." !== o && ".." !== o || r.push(""), r.join("/")
            }(g.pathname, t.pathname)), _$requiresPort_56(g.port, g.protocol) || (g.host = g.hostname, g.port = ""), g.username = g.password = "", g.auth && (p = g.auth.split(":"), g.username = p[0] || "", g.password = p[1] || ""), g.origin = g.protocol && g.host && "file:" !== g.protocol ? g.protocol + "//" + g.host : "null", g.href = g.toString()
        }
        u.prototype = {
            set: function(e, t, r) {
                var n = this;
                switch (e) {
                    case "query":
                        "string" == typeof t && t.length && (t = (r || _$querystringify_55.parse)(t)), n[e] = t;
                        break;
                    case "port":
                        n[e] = t, _$requiresPort_56(t, n.protocol) ? t && (n.host = n.hostname + ":" + t) : (n.host = n.hostname, n[e] = "");
                        break;
                    case "hostname":
                        n[e] = t, n.port && (t += ":" + n.port), n.host = t;
                        break;
                    case "host":
                        n[e] = t, /:\d+$/.test(t) ? (t = t.split(":"), n.port = t.pop(), n.hostname = t.join(":")) : (n.hostname = t, n.port = "");
                        break;
                    case "protocol":
                        n.protocol = t.toLowerCase(), n.slashes = !r;
                        break;
                    case "pathname":
                    case "hash":
                        if (t) {
                            var o = "pathname" === e ? "/" : "#";
                            n[e] = t.charAt(0) !== o ? o + t : t
                        } else n[e] = t;
                        break;
                    default:
                        n[e] = t
                }
                for (var s = 0; s < i.length; s++) {
                    var a = i[s];
                    a[4] && (n[a[1]] = n[a[1]].toLowerCase())
                }
                return n.origin = n.protocol && n.host && "file:" !== n.protocol ? n.protocol + "//" + n.host : "null", n.href = n.toString(), n
            },
            toString: function(e) {
                e && "function" == typeof e || (e = _$querystringify_55.stringify);
                var t, r = this,
                    n = r.protocol;
                n && ":" !== n.charAt(n.length - 1) && (n += ":");
                var o = n + (r.slashes ? "//" : "");
                return r.username && (o += r.username, r.password && (o += ":" + r.password), o += "@"), o += r.host + r.pathname, (t = "object" == typeof r.query ? e(r.query) : r.query) && (o += "?" !== t.charAt(0) ? "?" + t : t), r.hash && (o += r.hash), o
            }
        }, u.extractProtocol = l, u.location = a, u.trimLeft = o, u.qs = _$querystringify_55, _$urlParse_76 = u
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var _$RateLimitedQueue_198 = function() {
            function e(e) {
                this.limit = "number" != typeof e || 0 === e ? 1 / 0 : e, this.activeRequests = 0, this.queuedHandlers = []
            }
            var t = e.prototype;
            return t._call = function(e) {
                var t = this;
                this.activeRequests += 1;
                var r, n = !1;
                try {
                    r = e()
                } catch (err) {
                    throw this.activeRequests -= 1, err
                }
                return {
                    abort: function() {
                        n || (n = !0, t.activeRequests -= 1, r(), t._queueNext())
                    },
                    done: function() {
                        n || (n = !0, t.activeRequests -= 1, t._queueNext())
                    }
                }
            }, t._queueNext = function() {
                var e = this;
                Promise.resolve().then(function() {
                    e._next()
                })
            }, t._next = function() {
                if (!(this.activeRequests >= this.limit) && 0 !== this.queuedHandlers.length) {
                    var e = this.queuedHandlers.shift(),
                        t = this._call(e.fn);
                    e.abort = t.abort, e.done = t.done
                }
            }, t._queue = function(e) {
                var t = this,
                    r = {
                        fn: e,
                        abort: function() {
                            t._dequeue(r)
                        },
                        done: function() {
                            throw new Error("Cannot mark a queued request as done: this indicates a bug")
                        }
                    };
                return this.queuedHandlers.push(r), r
            }, t._dequeue = function(e) {
                var t = this.queuedHandlers.indexOf(e); - 1 !== t && this.queuedHandlers.splice(t, 1)
            }, t.run = function(e) {
                return this.activeRequests < this.limit ? this._call(e) : this._queue(e)
            }, t.wrapPromiseFunction = function(e) {
                var t = this;
                return function() {
                    for (var r = arguments.length, n = new Array(r), o = 0; o < r; o++) n[o] = arguments[o];
                    return new Promise(function(r, o) {
                        var i = t.run(function() {
                            var t, s;
                            try {
                                s = Promise.resolve(e.apply(void 0, n))
                            } catch (err) {
                                s = Promise.reject(err)
                            }
                            return s.then(function(e) {
                                    t ? o(t) : (i.done(), r(e))
                                }, function(e) {
                                    t ? o(t) : (i.done(), o(e))
                                }),
                                function() {
                                    t = new Error("Cancelled")
                                }
                        })
                    })
                }
            }, e
        }(),
        _$emitSocketProgress_202 = _$lodashThrottle_46(function(e, t, r) {
            var n = t.progress,
                o = t.bytesUploaded,
                i = t.bytesTotal;
            n && (e.uppy.log("Upload progress: " + n), e.uppy.emit("upload-progress", r, {
                uploader: e,
                bytesUploaded: o,
                bytesTotal: i
            }))
        }, 300, {
            leading: !0,
            trailing: !0
        }),
        _$getSocketHost_215 = function(e) {
            var t = /^(?:https?:\/\/|\/\/)?(?:[^@\n]+@)?(?:www\.)?([^\n]+)/i.exec(e)[1];
            return (/^http:\/\//i.test(e) ? "ws" : "wss") + "://" + t
        },
        _$settle_228 = function(e) {
            var t = [],
                r = [];

            function n(e) {
                t.push(e)
            }

            function o(e) {
                r.push(e)
            }
            return Promise.all(e.map(function(e) {
                return e.then(n, o)
            })).then(function() {
                return {
                    successful: t,
                    failed: r
                }
            })
        },
        _$EventTracker_195 = function() {
            function e(e) {
                this._events = [], this._emitter = e
            }
            var t = e.prototype;
            return t.on = function(e, t) {
                return this._events.push([e, t]), this._emitter.on(e, t)
            }, t.remove = function() {
                var e = this;
                this._events.forEach(function(t) {
                    var r = t[0],
                        n = t[1];
                    e._emitter.off(r, n)
                })
            }, e
        }(),
        ProgressTimeout = function() {
            function e(e, t) {
                this._timeout = e, this._onTimedOut = t, this._isDone = !1, this._aliveTimer = null, this._onTimedOut = this._onTimedOut.bind(this)
            }
            var t = e.prototype;
            return t.progress = function() {
                this._isDone || this._timeout > 0 && (this._aliveTimer && clearTimeout(this._aliveTimer), this._aliveTimer = setTimeout(this._onTimedOut, this._timeout))
            }, t.done = function() {
                this._aliveTimer && (clearTimeout(this._aliveTimer), this._aliveTimer = null), this._isDone = !0
            }, e
        }(),
        _$ProgressTimeout_197 = ProgressTimeout,
        _$package_239 = {
            version: "1.4.0"
        },
        ___class_238, ___temp_238;

    function ___extends_238() {
        return (___extends_238 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var __Plugin_238 = _$lib_93.Plugin,
        __Provider_238 = _$lib_89.Provider,
        __RequestClient_238 = _$lib_89.RequestClient,
        __Socket_238 = _$lib_89.Socket;

    function buildResponseError(e, t) {
        return t || (t = new Error("Upload error")), "string" == typeof t && (t = new Error(t)), t instanceof Error || (t = ___extends_238(new Error("Upload error"), {
            data: t
        })), t.request = e, t
    }

    function setTypeInBlob(e) {
        return e.data.slice(0, e.data.size, e.meta.type)
    }
    var _$lib_238 = (___temp_238 = ___class_238 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                (n = e.call(this, t, r) || this).type = "uploader", n.id = n.opts.id || "XHRUpload", n.title = "XHRUpload", n.defaultLocale = {
                    strings: {
                        timedOut: 'Yükleme işlemi %{seconds} saniyeden fazla sürdüğü için iptal edildi.'
                    }
                };
                var o = {
                    formData: !0,
                    fieldName: "files[]",
                    method: "post",
                    metaFields: null,
                    responseUrlFieldName: "url",
                    bundle: !1,
                    headers: {},
                    timeout: 3e4,
                    limit: 0,
                    withCredentials: !1,
                    responseType: "",
                    getResponseData: function(e, t) {
                        var r = {};
                        try {
                            r = JSON.parse(e)
                        } catch (err) {
                            console.log(err)
                        }
                        return r
                    },
                    getResponseError: function(e, t) {
                        return new Error("Upload error")
                    },
                    validateStatus: function(e, t, r) {
                        return e >= 200 && e < 300
                    }
                };
                if (n.opts = ___extends_238({}, o, {}, r), n.i18nInit(), n.handleUpload = n.handleUpload.bind(function(e) {
                        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return e
                    }(n)), n.opts.__queue instanceof _$RateLimitedQueue_198 ? n.requests = n.opts.__queue : n.requests = new _$RateLimitedQueue_198(n.opts.limit), n.opts.bundle && !n.opts.formData) throw new Error("`opts.formData` must be true when `opts.bundle` is enabled.");
                return n.uploaderEvents = Object.create(null), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.setOptions = function(t) {
                e.prototype.setOptions.call(this, t), this.i18nInit()
            }, o.i18nInit = function() {
                this.translator = new _$Translator_199([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.setPluginState()
            }, o.getOptions = function(e) {
                var t = this.uppy.getState().xhrUpload,
                    r = ___extends_238({}, this.opts, {}, t || {}, {}, e.xhrUpload || {}, {
                        headers: {}
                    });
                return ___extends_238(r.headers, this.opts.headers), t && ___extends_238(r.headers, t.headers), e.xhrUpload && ___extends_238(r.headers, e.xhrUpload.headers), r
            }, o.addMetadata = function(e, t, r) {
                (Array.isArray(r.metaFields) ? r.metaFields : Object.keys(t)).forEach(function(r) {
                    e.append(r, t[r])
                })
            }, o.createFormDataUpload = function(e, t) {
                var r = new FormData;
                this.addMetadata(r, e.meta, t);
                var n = setTypeInBlob(e);
                return e.name ? r.append(t.fieldName, n, e.meta.name) : r.append(t.fieldName, n), r
            }, o.createBundledUpload = function(e, t) {
                var r = this,
                    n = new FormData,
                    o = this.uppy.getState().meta;
                return this.addMetadata(n, o, t), e.forEach(function(e) {
                    var t = r.getOptions(e),
                        o = setTypeInBlob(e);
                    e.name ? n.append(t.fieldName, o, e.name) : n.append(t.fieldName, o)
                }), n
            }, o.createBareUpload = function(e, t) {
                return e.data
            }, o.upload = function(e, t, r) {
                var n = this,
                    o = this.getOptions(e);
                return this.uppy.log("uploading " + t + " of " + r), new Promise(function(t, r) {
                    n.uppy.emit("upload-started", e);
                    var i = o.formData ? n.createFormDataUpload(e, o) : n.createBareUpload(e, o),
                        s = new _$ProgressTimeout_197(o.timeout, function() {
                            a.abort();
                            var t = new Error(n.i18n("timedOut", {
                                seconds: Math.ceil(o.timeout / 1e3)
                            }));
                            n.uppy.emit("upload-error", e, t), r(t)
                        }),
                        a = new XMLHttpRequest;
                    n.uploaderEvents[e.id] = new _$EventTracker_195(n.uppy);
                    var l = _$cuid_13();
                    a.upload.addEventListener("loadstart", function(e) {
                        n.uppy.log("[XHRUpload] " + l + " started")
                    }), a.upload.addEventListener("progress", function(t) {
                        n.uppy.log("[XHRUpload] " + l + " progress: " + t.loaded + " / " + t.total), s.progress(), t.lengthComputable && n.uppy.emit("upload-progress", e, {
                            uploader: n,
                            bytesUploaded: t.loaded,
                            bytesTotal: t.total
                        })
                    }), a.addEventListener("load", function(i) {
                        if (n.uppy.log("[XHRUpload] " + l + " finished"), s.done(), u.done(), n.uploaderEvents[e.id] && (n.uploaderEvents[e.id].remove(), n.uploaderEvents[e.id] = null), o.validateStatus(i.target.status, a.responseText, a)) {
                            var c = o.getResponseData(a.responseText, a),
                                p = c[o.responseUrlFieldName],
                                d = {
                                    status: i.target.status,
                                    body: c,
                                    uploadURL: p
                                };
                            return n.uppy.emit("upload-success", e, d), p && n.uppy.log("Download " + e.name + " from " + p), t(e)
                        }
                        var _ = o.getResponseData(a.responseText, a),
                            h = buildResponseError(a, o.getResponseError(a.responseText, a)),
                            f = {
                                status: i.target.status,
                                body: _
                            };
                        return n.uppy.emit("upload-error", e, h, f), r(h)
                    }), a.addEventListener("error", function(t) {
                        n.uppy.log("[XHRUpload] " + l + " errored"), s.done(), u.done(), n.uploaderEvents[e.id] && (n.uploaderEvents[e.id].remove(), n.uploaderEvents[e.id] = null);
                        var i = buildResponseError(a, o.getResponseError(a.responseText, a));
                        return n.uppy.emit("upload-error", e, i), r(i)
                    }), a.open(o.method.toUpperCase(), o.endpoint, !0), a.withCredentials = o.withCredentials, "" !== o.responseType && (a.responseType = o.responseType), Object.keys(o.headers).forEach(function(e) {
                        a.setRequestHeader(e, o.headers[e])
                    });
                    var u = n.requests.run(function() {
                        return a.send(i),
                            function() {
                                s.done(), a.abort()
                            }
                    });
                    n.onFileRemove(e.id, function() {
                        u.abort(), r(new Error("File removed"))
                    }), n.onCancelAll(e.id, function() {
                        u.abort(), r(new Error("Upload cancelled"))
                    })
                })
            }, o.uploadRemote = function(e, t, r) {
                var n = this,
                    o = this.getOptions(e);
                return new Promise(function(t, r) {
                    n.uppy.emit("upload-started", e);
                    var i = {};
                    (Array.isArray(o.metaFields) ? o.metaFields : Object.keys(e.meta)).forEach(function(t) {
                        i[t] = e.meta[t]
                    }), new(e.remote.providerOptions.provider ? __Provider_238 : __RequestClient_238)(n.uppy, e.remote.providerOptions).post(e.remote.url, ___extends_238({}, e.remote.body, {
                        endpoint: o.endpoint,
                        size: e.data.size,
                        fieldname: o.fieldName,
                        metadata: i,
                        headers: o.headers
                    })).then(function(i) {
                        var s = i.token,
                            a = _$getSocketHost_215(e.remote.companionUrl),
                            l = new __Socket_238({
                                target: a + "/api/" + s,
                                autoOpen: !1
                            });
                        n.uploaderEvents[e.id] = new _$EventTracker_195(n.uppy), n.onFileRemove(e.id, function() {
                            l.send("pause", {}), u.abort(), t("upload " + e.id + " was removed")
                        }), n.onCancelAll(e.id, function() {
                            l.send("pause", {}), u.abort(), t("upload " + e.id + " was canceled")
                        }), n.onRetry(e.id, function() {
                            l.send("pause", {}), l.send("resume", {})
                        }), n.onRetryAll(e.id, function() {
                            l.send("pause", {}), l.send("resume", {})
                        }), l.on("progress", function(t) {
                            return _$emitSocketProgress_202(n, t, e)
                        }), l.on("success", function(r) {
                            var i = o.getResponseData(r.response.responseText, r.response),
                                s = i[o.responseUrlFieldName],
                                a = {
                                    status: r.response.status,
                                    body: i,
                                    uploadURL: s
                                };
                            return n.uppy.emit("upload-success", e, a), u.done(), n.uploaderEvents[e.id] && (n.uploaderEvents[e.id].remove(), n.uploaderEvents[e.id] = null), t()
                        }), l.on("error", function(t) {
                            var i = t.response,
                                s = i ? o.getResponseError(i.responseText, i) : ___extends_238(new Error(t.error.message), {
                                    cause: t.error
                                });
                            n.uppy.emit("upload-error", e, s), u.done(), n.uploaderEvents[e.id] && (n.uploaderEvents[e.id].remove(), n.uploaderEvents[e.id] = null), r(s)
                        });
                        var u = n.requests.run(function() {
                            return l.open(), e.isPaused && l.send("pause", {}),
                                function() {
                                    return l.close()
                                }
                        })
                    })
                })
            }, o.uploadBundle = function(e) {
                var t = this;
                return new Promise(function(r, n) {
                    var o = t.opts.endpoint,
                        i = t.opts.method,
                        s = t.uppy.getState().xhrUpload,
                        a = t.createBundledUpload(e, ___extends_238({}, t.opts, {}, s || {})),
                        l = new XMLHttpRequest,
                        u = new _$ProgressTimeout_197(t.opts.timeout, function() {
                            l.abort();
                            var e = new Error(t.i18n("timedOut", {
                                seconds: Math.ceil(t.opts.timeout / 1e3)
                            }));
                            c(e), n(e)
                        }),
                        c = function(r) {
                            e.forEach(function(e) {
                                t.uppy.emit("upload-error", e, r)
                            })
                        };
                    l.upload.addEventListener("loadstart", function(e) {
                        t.uppy.log("[XHRUpload] started uploading bundle"), u.progress()
                    }), l.upload.addEventListener("progress", function(r) {
                        u.progress(), r.lengthComputable && e.forEach(function(e) {
                            t.uppy.emit("upload-progress", e, {
                                uploader: t,
                                bytesUploaded: r.loaded / r.total * e.size,
                                bytesTotal: e.size
                            })
                        })
                    }), l.addEventListener("load", function(o) {
                        if (u.done(), t.opts.validateStatus(o.target.status, l.responseText, l)) {
                            var i = t.opts.getResponseData(l.responseText, l),
                                s = {
                                    status: o.target.status,
                                    body: i
                                };
                            return e.forEach(function(e) {
                                t.uppy.emit("upload-success", e, s)
                            }), r()
                        }
                        var a = t.opts.getResponseError(l.responseText, l) || new Error("Upload error");
                        return a.request = l, c(a), n(a)
                    }), l.addEventListener("error", function(e) {
                        u.done();
                        var r = t.opts.getResponseError(l.responseText, l) || new Error("Upload error");
                        return c(r), n(r)
                    }), t.uppy.on("cancel-all", function() {
                        u.done(), l.abort()
                    }), l.open(i.toUpperCase(), o, !0), l.withCredentials = t.opts.withCredentials, "" !== t.opts.responseType && (l.responseType = t.opts.responseType), Object.keys(t.opts.headers).forEach(function(e) {
                        l.setRequestHeader(e, t.opts.headers[e])
                    }), l.send(a), e.forEach(function(e) {
                        t.uppy.emit("upload-started", e)
                    })
                })
            }, o.uploadFiles = function(e) {
                var t = this,
                    r = e.map(function(r, n) {
                        var o = parseInt(n, 10) + 1,
                            i = e.length;
                        return r.error ? Promise.reject(new Error(r.error)) : r.isRemote ? t.uploadRemote(r, o, i) : t.upload(r, o, i)
                    });
                return _$settle_228(r)
            }, o.onFileRemove = function(e, t) {
                this.uploaderEvents[e].on("file-removed", function(r) {
                    e === r.id && t(r.id)
                })
            }, o.onRetry = function(e, t) {
                this.uploaderEvents[e].on("upload-retry", function(r) {
                    e === r && t()
                })
            }, o.onRetryAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("retry-all", function(n) {
                    r.uppy.getFile(e) && t()
                })
            }, o.onCancelAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("cancel-all", function() {
                    r.uppy.getFile(e) && t()
                })
            }, o.handleUpload = function(e) {
                var t = this;
                if (0 === e.length) return this.uppy.log("[XHRUpload] No files to upload!"), Promise.resolve();
                0 === this.opts.limit && this.uppy.log("[XHRUpload] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/xhr-upload/#limit-0", "warning"), this.uppy.log("[XHRUpload] Uploading...");
                var r = e.map(function(e) {
                    return t.uppy.getFile(e)
                });
                if (this.opts.bundle) {
                    if (r.some(function(e) {
                            return e.isRemote
                        })) throw new Error("Can\u2019t upload remote files when bundle: true option is set");
                    return this.uploadBundle(r)
                }
                return this.uploadFiles(r).then(function() {
                    return null
                })
            }, o.install = function() {
                if (this.opts.bundle) {
                    var e = this.uppy.getState().capabilities;
                    this.uppy.setState({
                        capabilities: ___extends_238({}, e, {
                            individualCancellation: !1
                        })
                    })
                }
                this.uppy.addUploader(this.handleUpload)
            }, o.uninstall = function() {
                if (this.opts.bundle) {
                    var e = this.uppy.getState().capabilities;
                    this.uppy.setState({
                        capabilities: ___extends_238({}, e, {
                            individualCancellation: !0
                        })
                    })
                }
                this.uppy.removeUploader(this.handleUpload)
            }, n
        }(__Plugin_238), ___class_238.VERSION = _$package_239.version, ___temp_238),
        _$package_84 = {
            version: "1.3.3"
        },
        ___class_83, ___temp_83;

    function ___assertThisInitialized_83(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function ___extends_83() {
        return (___extends_83 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var URL_ = "function" == typeof URL ? URL : _$urlParse_76,
        __Plugin_83 = _$lib_93.Plugin,
        __RequestClient_83 = _$lib_89.RequestClient;

    function isXml(e) {
        var t = e.headers ? e.headers["content-type"] : e.getResponseHeader("Content-Type");
        return "string" == typeof t && "application/xml" === t.toLowerCase()
    }

    function getXmlValue(e, t) {
        var r = e.indexOf("<" + t + ">"),
            n = e.indexOf("</" + t + ">", r);
        return -1 !== r && -1 !== n ? e.slice(r + t.length + 2, n) : ""
    }

    function assertServerError(e) {
        if (e && e.error) {
            var t = new Error(e.message);
            throw ___extends_83(t, e.error), t
        }
        return e
    }
    var _$lib_83 = (___temp_83 = ___class_83 = function(e) {
        var t, r;

        function n(t, r) {
            var n;
            (n = e.call(this, t, r) || this).type = "uploader", n.id = n.opts.id || "AwsS3", n.title = "AWS S3", n.defaultLocale = {
                strings: {
                    preparingUpload: "Yüklemeye hazırlanıyor..."
                }
            };
            var o = {
                timeout: 3e4,
                limit: 0,
                getUploadParameters: n.getUploadParameters.bind(___assertThisInitialized_83(n))
            };
            return n.opts = ___extends_83({}, o, {}, r), n.i18nInit(), n.client = new __RequestClient_83(t, r), n.prepareUpload = n.prepareUpload.bind(___assertThisInitialized_83(n)), n.requests = new _$RateLimitedQueue_198(n.opts.limit), n
        }
        r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
        var o = n.prototype;
        return o.setOptions = function(t) {
            e.prototype.setOptions.call(this, t), this.i18nInit()
        }, o.i18nInit = function() {
            this.translator = new _$Translator_199([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.setPluginState()
        }, o.getUploadParameters = function(e) {
            if (!this.opts.companionUrl) throw new Error("Expected a `companionUrl` option containing a Companion address.");
            var t = encodeURIComponent(e.meta.name),
                r = encodeURIComponent(e.meta.type);
            return this.client.get("s3/params?filename=" + t + "&type=" + r).then(assertServerError)
        }, o.validateParameters = function(e, t) {
            if ("object" != typeof t || !t || "string" != typeof t.url || "object" != typeof t.fields && null != t.fields || null != t.method && !/^(put|post)$/i.test(t.method)) {
                var r = new TypeError("AwsS3: got incorrect result from 'getUploadParameters()' for file '" + e.name + "', expected an object '{ url, method, fields, headers }'.\nSee https://uppy.io/docs/aws-s3/#getUploadParameters-file for more on the expected format.");
                throw console.error(r), r
            }
            return t
        }, o.prepareUpload = function(e) {
            var t = this;
            e.forEach(function(e) {
                var r = t.uppy.getFile(e);
                t.uppy.emit("preprocess-progress", r, {
                    mode: "determinate",
                    message: t.i18n("preparingUpload"),
                    value: 0
                })
            });
            var r = this.requests.wrapPromiseFunction(function(e) {
                return t.opts.getUploadParameters(e)
            });
            return Promise.all(e.map(function(e) {
                var n = t.uppy.getFile(e);
                return r(n).then(function(e) {
                    return t.validateParameters(n, e)
                }).then(function(e) {
                    return t.uppy.emit("preprocess-progress", n, {
                        mode: "determinate",
                        message: t.i18n("preparingUpload"),
                        value: 1
                    }), e
                }).catch(function(e) {
                    t.uppy.emit("upload-error", n, e)
                })
            })).then(function(r) {
                var n = {};
                e.forEach(function(e, o) {
                    var i = t.uppy.getFile(e);
                    if (i && !i.error) {
                        var s = r[o],
                            a = s.method,
                            l = void 0 === a ? "post" : a,
                            u = s.url,
                            c = s.fields,
                            p = s.headers,
                            d = {
                                method: l,
                                formData: "post" === l.toLowerCase(),
                                endpoint: u,
                                metaFields: c ? Object.keys(c) : []
                            };
                        p && (d.headers = p);
                        var _ = ___extends_83({}, i, {
                            meta: ___extends_83({}, i.meta, {}, c),
                            xhrUpload: d
                        });
                        n[e] = _
                    }
                });
                var o = t.uppy.getState().files;
                t.uppy.setState({
                    files: ___extends_83({}, o, {}, n)
                }), e.forEach(function(e) {
                    var r = t.uppy.getFile(e);
                    t.uppy.emit("preprocess-complete", r)
                })
            })
        }, o.install = function() {
            var e = this.uppy.log;
            this.uppy.addPreProcessor(this.prepareUpload);
            var t = !1,
                r = {
                    fieldName: "file",
                    responseUrlFieldName: "location",
                    timeout: this.opts.timeout,
                    __queue: this.requests,
                    responseType: "text",
                    getResponseData: function(r, n) {
                        var o, i;
                        return isXml(n) ? {
                            location: (o = n.responseURL, i = getXmlValue(r, "Location"), new URL_(i, o).toString()),
                            bucket: getXmlValue(r, "Bucket"),
                            key: getXmlValue(r, "Key"),
                            etag: getXmlValue(r, "ETag")
                        } : "POST" === this.method.toUpperCase() ? (t || (e("[AwsS3] No response data found, make sure to set the success_action_status AWS SDK option to 201. See https://uppy.io/docs/aws-s3/#POST-Uploads", "warning"), t = !0), {
                            location: null
                        }) : n.responseURL ? {
                            location: n.responseURL.replace(/\?.*$/, "")
                        } : {
                            location: null
                        }
                    },
                    getResponseError: function(e, t) {
                        if (isXml(t)) {
                            var r = getXmlValue(e, "Message");
                            return new Error(r)
                        }
                    }
                };
            this.opts.getResponseData && (r.getResponseData = this.opts.getResponseData), this.uppy.use(_$lib_238, r)
        }, o.uninstall = function() {
            var e = this.uppy.getPlugin("XHRUpload");
            this.uppy.removePlugin(e), this.uppy.removePreProcessor(this.prepareUpload)
        }, n
    }(__Plugin_83), ___class_83.VERSION = _$package_84.version, ___temp_83);

    function ___extends_80() {
        return (___extends_80 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var defaultOptions = {
        limit: 1,
        onStart: function() {},
        onProgress: function() {},
        onPartComplete: function() {},
        onSuccess: function() {},
        onError: function(e) {
            throw e
        }
    };

    function remove(e, t) {
        var r = e.indexOf(t); - 1 !== r && e.splice(r, 1)
    }
    var MultipartUploader = function() {
            function e(e, t) {
                this.options = ___extends_80({}, defaultOptions, {}, t), this.file = e, this.key = this.options.key || null, this.uploadId = this.options.uploadId || null, this.parts = this.options.parts || [], this.createdPromise = Promise.reject(), this.isPaused = !1, this.chunks = null, this.chunkState = null, this.uploading = [], this._initChunks(), this.createdPromise.catch(function() {})
            }
            var t = e.prototype;
            return t._initChunks = function() {
                for (var e = [], t = Math.max(Math.ceil(this.file.size / 1e4), 5242880), r = 0; r < this.file.size; r += t) {
                    var n = Math.min(this.file.size, r + t);
                    e.push(this.file.slice(r, n))
                }
                this.chunks = e, this.chunkState = e.map(function() {
                    return {
                        uploaded: 0,
                        busy: !1,
                        done: !1
                    }
                })
            }, t._createUpload = function() {
                var e = this;
                return this.createdPromise = Promise.resolve().then(function() {
                    return e.options.createMultipartUpload()
                }), this.createdPromise.then(function(t) {
                    if ("object" != typeof t || !t || "string" != typeof t.uploadId || "string" != typeof t.key) throw new TypeError("AwsS3/Multipart: Got incorrect result from `createMultipartUpload()`, expected an object `{ uploadId, key }`.");
                    e.key = t.key, e.uploadId = t.uploadId, e.options.onStart(t), e._uploadParts()
                }).catch(function(t) {
                    e._onError(t)
                })
            }, t._resumeUpload = function() {
                var e = this;
                return Promise.resolve().then(function() {
                    return e.options.listParts({
                        uploadId: e.uploadId,
                        key: e.key
                    })
                }).then(function(t) {
                    t.forEach(function(t) {
                        var r = t.PartNumber - 1;
                        e.chunkState[r] = {
                            uploaded: t.Size,
                            etag: t.ETag,
                            done: !0
                        }, e.parts.some(function(e) {
                            return e.PartNumber === t.PartNumber
                        }) || e.parts.push({
                            PartNumber: t.PartNumber,
                            ETag: t.ETag
                        })
                    }), e._uploadParts()
                }).catch(function(t) {
                    e._onError(t)
                })
            }, t._uploadParts = function() {
                var e = this;
                if (!this.isPaused) {
                    var t = this.options.limit - this.uploading.length;
                    if (0 !== t)
                        if (this.chunkState.every(function(e) {
                                return e.done
                            })) this._completeUpload();
                        else {
                            for (var r = [], n = 0; n < this.chunkState.length; n++) {
                                var o = this.chunkState[n];
                                if (!o.done && !o.busy && (r.push(n), r.length >= t)) break
                            }
                            r.forEach(function(t) {
                                e._uploadPart(t)
                            })
                        }
                }
            }, t._uploadPart = function(e) {
                var t = this,
                    r = this.chunks[e];
                return this.chunkState[e].busy = !0, Promise.resolve().then(function() {
                    return t.options.prepareUploadPart({
                        key: t.key,
                        uploadId: t.uploadId,
                        body: r,
                        number: e + 1
                    })
                }).then(function(e) {
                    if ("object" != typeof e || !e || "string" != typeof e.url) throw new TypeError("AwsS3/Multipart: Got incorrect result from `prepareUploadPart()`, expected an object `{ url }`.");
                    return e
                }).then(function(r) {
                    var n = r.url;
                    t._uploadPartBytes(e, n)
                }, function(e) {
                    t._onError(e)
                })
            }, t._onPartProgress = function(e, t, r) {
                this.chunkState[e].uploaded = t;
                var n = this.chunkState.reduce(function(e, t) {
                    return e + t.uploaded
                }, 0);
                this.options.onProgress(n, this.file.size)
            }, t._onPartComplete = function(e, t) {
                this.chunkState[e].etag = t, this.chunkState[e].done = !0;
                var r = {
                    PartNumber: e + 1,
                    ETag: t
                };
                this.parts.push(r), this.options.onPartComplete(r), this._uploadParts()
            }, t._uploadPartBytes = function(e, t) {
                var r = this,
                    n = this.chunks[e],
                    o = new XMLHttpRequest;
                o.open("PUT", t, !0), o.responseType = "text", this.uploading.push(o), o.upload.addEventListener("progress", function(t) {
                    t.lengthComputable && r._onPartProgress(e, t.loaded, t.total)
                }), o.addEventListener("abort", function(t) {
                    remove(r.uploading, t.target), r.chunkState[e].busy = !1
                }), o.addEventListener("load", function(t) {
                    if (remove(r.uploading, t.target), r.chunkState[e].busy = !1, t.target.status < 200 || t.target.status >= 300) r._onError(new Error("Non 2xx"));
                    else {
                        r._onPartProgress(e, n.size, n.size);
                        var o = t.target.getResponseHeader("ETag");
                        null !== o ? r._onPartComplete(e, o) : r._onError(new Error("AwsS3/Multipart: Could not read the ETag header. This likely means CORS is not configured correctly on the S3 Bucket. Seee https://uppy.io/docs/aws-s3-multipart#S3-Bucket-Configuration for instructions."))
                    }
                }), o.addEventListener("error", function(t) {
                    remove(r.uploading, t.target), r.chunkState[e].busy = !1;
                    var n = new Error("Unknown error");
                    n.source = t.target, r._onError(n)
                }), o.send(n)
            }, t._completeUpload = function() {
                var e = this;
                return this.parts.sort(function(e, t) {
                    return e.PartNumber - t.PartNumber
                }), Promise.resolve().then(function() {
                    return e.options.completeMultipartUpload({
                        key: e.key,
                        uploadId: e.uploadId,
                        parts: e.parts
                    })
                }).then(function(t) {
                    e.options.onSuccess(t)
                }, function(t) {
                    e._onError(t)
                })
            }, t._abortUpload = function() {
                var e = this;
                this.uploading.slice().forEach(function(e) {
                    e.abort()
                }), this.createdPromise.then(function() {
                    e.options.abortMultipartUpload({
                        key: e.key,
                        uploadId: e.uploadId
                    })
                }, function() {}), this.uploading = []
            }, t._onError = function(e) {
                this.options.onError(e)
            }, t.start = function() {
                this.isPaused = !1, this.uploadId ? this._resumeUpload() : this._createUpload()
            }, t.pause = function() {
                this.uploading.slice().forEach(function(e) {
                    e.abort()
                }), this.isPaused = !0
            }, t.abort = function(e) {
                if (void 0 === e && (e = {}), !e.really) return this.pause();
                this._abortUpload()
            }, e
        }(),
        _$MultipartUploader_80 = MultipartUploader,
        _$package_82 = {
            version: "1.3.4"
        },
        ___class_81, ___temp_81;

    function ___assertThisInitialized_81(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function ___extends_81() {
        return (___extends_81 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var __Plugin_81 = _$lib_93.Plugin,
        __Socket_81 = _$lib_89.Socket,
        __Provider_81 = _$lib_89.Provider,
        __RequestClient_81 = _$lib_89.RequestClient;

    function __assertServerError_81(e) {
        if (e && e.error) {
            var t = new Error(e.message);
            throw ___extends_81(t, e.error), t
        }
        return e
    }
    var _$lib_81 = (___temp_81 = ___class_81 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                (n = e.call(this, t, r) || this).type = "uploader", n.id = n.opts.id || "AwsS3Multipart", n.title = "AWS S3 Multipart", n.client = new __RequestClient_81(t, r);
                var o = {
                    timeout: 3e4,
                    limit: 0,
                    createMultipartUpload: n.createMultipartUpload.bind(___assertThisInitialized_81(n)),
                    listParts: n.listParts.bind(___assertThisInitialized_81(n)),
                    prepareUploadPart: n.prepareUploadPart.bind(___assertThisInitialized_81(n)),
                    abortMultipartUpload: n.abortMultipartUpload.bind(___assertThisInitialized_81(n)),
                    completeMultipartUpload: n.completeMultipartUpload.bind(___assertThisInitialized_81(n))
                };
                return n.opts = ___extends_81({}, o, {}, r), n.upload = n.upload.bind(___assertThisInitialized_81(n)), n.requests = new _$RateLimitedQueue_198(n.opts.limit), n.uploaders = Object.create(null), n.uploaderEvents = Object.create(null), n.uploaderSockets = Object.create(null), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.resetUploaderReferences = function(e, t) {
                void 0 === t && (t = {}), this.uploaders[e] && (this.uploaders[e].abort({
                    really: t.abort || !1
                }), this.uploaders[e] = null), this.uploaderEvents[e] && (this.uploaderEvents[e].remove(), this.uploaderEvents[e] = null), this.uploaderSockets[e] && (this.uploaderSockets[e].close(), this.uploaderSockets[e] = null)
            }, o.assertHost = function() {
                if (!this.opts.companionUrl) throw new Error("Expected a `companionUrl` option containing a Companion address.")
            }, o.createMultipartUpload = function(e) {
                this.assertHost();
                var t = {};
                return Object.keys(e.meta).map(function(r) {
                    null != e.meta[r] && (t[r] = e.meta[r].toString())
                }), this.client.post("s3/multipart", {
                    filename: e.name,
                    type: e.type,
                    metadata: t
                }).then(__assertServerError_81)
            }, o.listParts = function(e, t) {
                var r = t.key,
                    n = t.uploadId;
                this.assertHost();
                var o = encodeURIComponent(r);
                return this.client.get("s3/multipart/" + n + "?key=" + o).then(__assertServerError_81)
            }, o.prepareUploadPart = function(e, t) {
                var r = t.key,
                    n = t.uploadId,
                    o = t.number;
                this.assertHost();
                var i = encodeURIComponent(r);
                return this.client.get("s3/multipart/" + n + "/" + o + "?key=" + i).then(__assertServerError_81)
            }, o.completeMultipartUpload = function(e, t) {
                var r = t.key,
                    n = t.uploadId,
                    o = t.parts;
                this.assertHost();
                var i = encodeURIComponent(r),
                    s = encodeURIComponent(n);
                return this.client.post("s3/multipart/" + s + "/complete?key=" + i, {
                    parts: o
                }).then(__assertServerError_81)
            }, o.abortMultipartUpload = function(e, t) {
                var r = t.key,
                    n = t.uploadId;
                this.assertHost();
                var o = encodeURIComponent(r),
                    i = encodeURIComponent(n);
                return this.client.delete("s3/multipart/" + i + "?key=" + o).then(__assertServerError_81)
            }, o.uploadFile = function(e) {
                var t = this;
                return new Promise(function(r, n) {
                    var o = new _$MultipartUploader_80(e.data, ___extends_81({
                        createMultipartUpload: t.opts.createMultipartUpload.bind(t, e),
                        listParts: t.opts.listParts.bind(t, e),
                        prepareUploadPart: t.opts.prepareUploadPart.bind(t, e),
                        completeMultipartUpload: t.opts.completeMultipartUpload.bind(t, e),
                        abortMultipartUpload: t.opts.abortMultipartUpload.bind(t, e),
                        onStart: function(r) {
                            var n = t.uppy.getFile(e.id);
                            t.uppy.setFileState(e.id, {
                                s3Multipart: ___extends_81({}, n.s3Multipart, {
                                    key: r.key,
                                    uploadId: r.uploadId,
                                    parts: []
                                })
                            })
                        },
                        onProgress: function(r, n) {
                            t.uppy.emit("upload-progress", e, {
                                uploader: t,
                                bytesUploaded: r,
                                bytesTotal: n
                            })
                        },
                        onError: function(r) {
                            t.uppy.log(r), t.uppy.emit("upload-error", e, r), r.message = "Failed because: " + r.message, i.done(), t.resetUploaderReferences(e.id), n(r)
                        },
                        onSuccess: function(n) {
                            var s = {
                                uploadURL: n.location
                            };
                            i.done(), t.resetUploaderReferences(e.id), t.uppy.emit("upload-success", e, s), n.location && t.uppy.log("Download " + o.file.name + " from " + n.location), r(o)
                        },
                        onPartComplete: function(r) {
                            var n = t.uppy.getFile(e.id);
                            n && (t.uppy.setFileState(e.id, {
                                s3Multipart: ___extends_81({}, n.s3Multipart, {
                                    parts: [].concat(n.s3Multipart.parts, [r])
                                })
                            }), t.uppy.emit("s3-multipart:part-uploaded", n, r))
                        },
                        limit: t.opts.limit || 5
                    }, e.s3Multipart));
                    t.uploaders[e.id] = o, t.uploaderEvents[e.id] = new _$EventTracker_195(t.uppy);
                    var i = t.requests.run(function() {
                        return e.isPaused || o.start(),
                            function() {}
                    });
                    t.onFileRemove(e.id, function(n) {
                        i.abort(), t.resetUploaderReferences(e.id, {
                            abort: !0
                        }), r("upload " + n.id + " was removed")
                    }), t.onCancelAll(e.id, function() {
                        i.abort(), t.resetUploaderReferences(e.id, {
                            abort: !0
                        }), r("upload " + e.id + " was canceled")
                    }), t.onFilePause(e.id, function(e) {
                        e ? (i.abort(), o.pause()) : (i.abort(), i = t.requests.run(function() {
                            return o.start(),
                                function() {}
                        }))
                    }), t.onPauseAll(e.id, function() {
                        i.abort(), o.pause()
                    }), t.onResumeAll(e.id, function() {
                        i.abort(), e.error && o.abort(), i = t.requests.run(function() {
                            return o.start(),
                                function() {}
                        })
                    }), e.isRestored || t.uppy.emit("upload-started", e, o)
                })
            }, o.uploadRemote = function(e) {
                var t = this;
                return this.resetUploaderReferences(e.id), this.uppy.emit("upload-started", e), e.serverToken ? this.connectToServerSocket(e) : new Promise(function(r, n) {
                    new(e.remote.providerOptions.provider ? __Provider_81 : __RequestClient_81)(t.uppy, e.remote.providerOptions).post(e.remote.url, ___extends_81({}, e.remote.body, {
                        protocol: "s3-multipart",
                        size: e.data.size,
                        metadata: e.meta
                    })).then(function(r) {
                        return t.uppy.setFileState(e.id, {
                            serverToken: r.token
                        }), e = t.uppy.getFile(e.id)
                    }).then(function(e) {
                        return t.connectToServerSocket(e)
                    }).then(function() {
                        r()
                    }).catch(function(e) {
                        n(new Error(e))
                    })
                })
            }, o.connectToServerSocket = function(e) {
                var t = this;
                return new Promise(function(r, n) {
                    var o = e.serverToken,
                        i = _$getSocketHost_215(e.remote.companionUrl),
                        s = new __Socket_81({
                            target: i + "/api/" + o,
                            autoOpen: !1
                        });
                    t.uploaderSockets[e.id] = s, t.uploaderEvents[e.id] = new _$EventTracker_195(t.uppy), t.onFileRemove(e.id, function(n) {
                        a.abort(), s.send("pause", {}), t.resetUploaderReferences(e.id, {
                            abort: !0
                        }), r("upload " + e.id + " was removed")
                    }), t.onFilePause(e.id, function(e) {
                        e ? (a.abort(), s.send("pause", {})) : (a.abort(), a = t.requests.run(function() {
                            return s.send("resume", {}),
                                function() {}
                        }))
                    }), t.onPauseAll(e.id, function() {
                        a.abort(), s.send("pause", {})
                    }), t.onCancelAll(e.id, function() {
                        a.abort(), s.send("pause", {}), t.resetUploaderReferences(e.id), r("upload " + e.id + " was canceled")
                    }), t.onResumeAll(e.id, function() {
                        a.abort(), e.error && s.send("pause", {}), a = t.requests.run(function() {
                            s.send("resume", {})
                        })
                    }), t.onRetry(e.id, function() {
                        s.isOpen && (s.send("pause", {}), s.send("resume", {}))
                    }), t.onRetryAll(e.id, function() {
                        s.isOpen && (s.send("pause", {}), s.send("resume", {}))
                    }), s.on("progress", function(r) {
                        return _$emitSocketProgress_202(t, r, e)
                    }), s.on("error", function(r) {
                        t.uppy.emit("upload-error", e, new Error(r.error)), t.resetUploaderReferences(e.id), a.done(), n(new Error(r.error))
                    }), s.on("success", function(n) {
                        var o = {
                            uploadURL: n.url
                        };
                        t.uppy.emit("upload-success", e, o), t.resetUploaderReferences(e.id), a.done(), r()
                    });
                    var a = t.requests.run(function() {
                        return s.open(), e.isPaused && s.send("pause", {}),
                            function() {}
                    })
                })
            }, o.upload = function(e) {
                var t = this;
                if (0 === e.length) return Promise.resolve();
                var r = e.map(function(e) {
                    var r = t.uppy.getFile(e);
                    return r.isRemote ? t.uploadRemote(r) : t.uploadFile(r)
                });
                return Promise.all(r)
            }, o.onFileRemove = function(e, t) {
                this.uploaderEvents[e].on("file-removed", function(r) {
                    e === r.id && t(r.id)
                })
            }, o.onFilePause = function(e, t) {
                this.uploaderEvents[e].on("upload-pause", function(r, n) {
                    e === r && t(n)
                })
            }, o.onRetry = function(e, t) {
                this.uploaderEvents[e].on("upload-retry", function(r) {
                    e === r && t()
                })
            }, o.onRetryAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("retry-all", function(n) {
                    r.uppy.getFile(e) && t()
                })
            }, o.onPauseAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("pause-all", function() {
                    r.uppy.getFile(e) && t()
                })
            }, o.onCancelAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("cancel-all", function() {
                    r.uppy.getFile(e) && t()
                })
            }, o.onResumeAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("resume-all", function() {
                    r.uppy.getFile(e) && t()
                })
            }, o.install = function() {
                var e = this.uppy.getState().capabilities;
                this.uppy.setState({
                    capabilities: ___extends_81({}, e, {
                        resumableUploads: !0
                    })
                }), this.uppy.addUploader(this.upload)
            }, o.uninstall = function() {
                var e = this.uppy.getState().capabilities;
                this.uppy.setState({
                    capabilities: ___extends_81({}, e, {
                        resumableUploads: !1
                    })
                }), this.uppy.removeUploader(this.upload)
            }, n
        }(__Plugin_81), ___class_81.VERSION = _$package_82.version, ___temp_81),
        _$error_187 = {};
    Object.defineProperty(_$error_187, "__esModule", {
        value: !0
    });
    var DetailedError = function(e) {
        function t(e) {
            var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            ! function(e, r) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this);
            var o = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e.message));
            o.originalRequest = n, o.causingError = r;
            var i = e.message;
            return null != r && (i += ", caused by " + r.toString()), null != n && (i += ", originated from request (response code: " + n.status + ", response text: " + n.responseText + ")"), o.message = i, o
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, Error), t
    }();
    _$error_187.default = DetailedError;
    var hasOwn = Object.prototype.hasOwnProperty,
        toStr = Object.prototype.toString,
        defineProperty = Object.defineProperty,
        gOPD = Object.getOwnPropertyDescriptor,
        isArray = function(e) {
            return "function" == typeof Array.isArray ? Array.isArray(e) : "[object Array]" === toStr.call(e)
        },
        isPlainObject = function(e) {
            if (!e || "[object Object]" !== toStr.call(e)) return !1;
            var t, r = hasOwn.call(e, "constructor"),
                n = e.constructor && e.constructor.prototype && hasOwn.call(e.constructor.prototype, "isPrototypeOf");
            if (e.constructor && !r && !n) return !1;
            for (t in e);
            return void 0 === t || hasOwn.call(e, t)
        },
        setProperty = function(e, t) {
            defineProperty && "__proto__" === t.name ? defineProperty(e, t.name, {
                enumerable: !0,
                configurable: !0,
                value: t.newValue,
                writable: !0
            }) : e[t.name] = t.newValue
        },
        getProperty = function(e, t) {
            if ("__proto__" === t) {
                if (!hasOwn.call(e, t)) return;
                if (gOPD) return gOPD(e, t).value
            }
            return e[t]
        },
        _$extend_36 = function e() {
            var t, r, n, o, i, s, a = arguments[0],
                l = 1,
                u = arguments.length,
                c = !1;
            for ("boolean" == typeof a && (c = a, a = arguments[1] || {}, l = 2), (null == a || "object" != typeof a && "function" != typeof a) && (a = {}); l < u; ++l)
                if (null != (t = arguments[l]))
                    for (r in t) n = getProperty(a, r), a !== (o = getProperty(t, r)) && (c && o && (isPlainObject(o) || (i = isArray(o))) ? (i ? (i = !1, s = n && isArray(n) ? n : []) : s = n && isPlainObject(n) ? n : {}, setProperty(a, {
                        name: r,
                        newValue: e(c, s, o)
                    })) : void 0 !== o && setProperty(a, {
                        name: r,
                        newValue: o
                    }));
            return a
        },
        _$base64_44 = {
            exports: {}
        };
    (function(global) {
        ! function(e, t) {
            "object" == typeof _$base64_44.exports ? _$base64_44.exports = t(e) : "function" == typeof define && define.amd ? define(t) : t(e)
        }("undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== global ? global : this, function(global) {
            "use strict";
            global = global || {};
            var _Base64 = global.Base64,
                version = "2.5.1",
                buffer;
            if (_$base64_44.exports) try {
                buffer = eval("require('buffer').Buffer")
            } catch (err) {
                buffer = void 0
            }
            var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                b64tab = function(e) {
                    for (var t = {}, r = 0, n = e.length; r < n; r++) t[e.charAt(r)] = r;
                    return t
                }(b64chars),
                fromCharCode = String.fromCharCode,
                cb_utob = function(e) {
                    if (e.length < 2) return (t = e.charCodeAt(0)) < 128 ? e : t < 2048 ? fromCharCode(192 | t >>> 6) + fromCharCode(128 | 63 & t) : fromCharCode(224 | t >>> 12 & 15) + fromCharCode(128 | t >>> 6 & 63) + fromCharCode(128 | 63 & t);
                    var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
                    return fromCharCode(240 | t >>> 18 & 7) + fromCharCode(128 | t >>> 12 & 63) + fromCharCode(128 | t >>> 6 & 63) + fromCharCode(128 | 63 & t)
                },
                re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
                utob = function(e) {
                    return e.replace(re_utob, cb_utob)
                },
                cb_encode = function(e) {
                    var t = [0, 2, 1][e.length % 3],
                        r = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
                    return [b64chars.charAt(r >>> 18), b64chars.charAt(r >>> 12 & 63), t >= 2 ? "=" : b64chars.charAt(r >>> 6 & 63), t >= 1 ? "=" : b64chars.charAt(63 & r)].join("")
                },
                btoa = global.btoa ? function(e) {
                    return global.btoa(e)
                } : function(e) {
                    return e.replace(/[\s\S]{1,3}/g, cb_encode)
                },
                _encode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function(e) {
                    return (e.constructor === buffer.constructor ? e : buffer.from(e)).toString("base64")
                } : function(e) {
                    return (e.constructor === buffer.constructor ? e : new buffer(e)).toString("base64")
                } : function(e) {
                    return btoa(utob(e))
                },
                encode = function(e, t) {
                    return t ? _encode(String(e)).replace(/[+\/]/g, function(e) {
                        return "+" == e ? "-" : "_"
                    }).replace(/=/g, "") : _encode(String(e))
                },
                encodeURI = function(e) {
                    return encode(e, !0)
                },
                re_btou = new RegExp(["[\xc0-\xdf][\x80-\xbf]", "[\xe0-\xef][\x80-\xbf]{2}", "[\xf0-\xf7][\x80-\xbf]{3}"].join("|"), "g"),
                cb_btou = function(e) {
                    switch (e.length) {
                        case 4:
                            var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
                            return fromCharCode(55296 + (t >>> 10)) + fromCharCode(56320 + (1023 & t));
                        case 3:
                            return fromCharCode((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
                        default:
                            return fromCharCode((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
                    }
                },
                btou = function(e) {
                    return e.replace(re_btou, cb_btou)
                },
                cb_decode = function(e) {
                    var t = e.length,
                        r = t % 4,
                        n = (t > 0 ? b64tab[e.charAt(0)] << 18 : 0) | (t > 1 ? b64tab[e.charAt(1)] << 12 : 0) | (t > 2 ? b64tab[e.charAt(2)] << 6 : 0) | (t > 3 ? b64tab[e.charAt(3)] : 0),
                        o = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 255), fromCharCode(255 & n)];
                    return o.length -= [0, 0, 2, 1][r], o.join("")
                },
                _atob = global.atob ? function(e) {
                    return global.atob(e)
                } : function(e) {
                    return e.replace(/\S{1,4}/g, cb_decode)
                },
                atob = function(e) {
                    return _atob(String(e).replace(/[^A-Za-z0-9\+\/]/g, ""))
                },
                _decode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function(e) {
                    return (e.constructor === buffer.constructor ? e : buffer.from(e, "base64")).toString()
                } : function(e) {
                    return (e.constructor === buffer.constructor ? e : new buffer(e, "base64")).toString()
                } : function(e) {
                    return btou(_atob(e))
                },
                decode = function(e) {
                    return _decode(String(e).replace(/[-_]/g, function(e) {
                        return "-" == e ? "+" : "/"
                    }).replace(/[^A-Za-z0-9\+\/]/g, ""))
                },
                noConflict = function() {
                    var e = global.Base64;
                    return global.Base64 = _Base64, e
                };
            if (global.Base64 = {
                    VERSION: version,
                    atob: atob,
                    btoa: btoa,
                    fromBase64: decode,
                    toBase64: encode,
                    utob: utob,
                    encode: encode,
                    encodeURI: encodeURI,
                    btou: btou,
                    decode: decode,
                    noConflict: noConflict,
                    __buffer__: buffer
                }, "function" == typeof Object.defineProperty) {
                var noEnum = function(e) {
                    return {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                };
                global.Base64.extendString = function() {
                    Object.defineProperty(String.prototype, "fromBase64", noEnum(function() {
                        return decode(this)
                    })), Object.defineProperty(String.prototype, "toBase64", noEnum(function(e) {
                        return encode(this, e)
                    })), Object.defineProperty(String.prototype, "toBase64URI", noEnum(function() {
                        return encode(this, !0)
                    }))
                }
            }
            return global.Meteor && (Base64 = global.Base64), _$base64_44.exports ? _$base64_44.exports.Base64 = global.Base64 : "function" == typeof define && define.amd && define([], function() {
                return global.Base64
            }), {
                Base64: global.Base64
            }
        })
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}), _$base64_44 = _$base64_44.exports;
    var _$request_183 = {};
    Object.defineProperty(_$request_183, "__esModule", {
        value: !0
    }), _$request_183.newRequest = function() {
        return new window.XMLHttpRequest
    }, _$request_183.resolveUrl = function(e, t) {
        return new _urlParse2.default(t, e).toString()
    };
    var obj, _urlParse2 = (obj = _$urlParse_76) && obj.__esModule ? obj : {
            default: obj
        },
        _$isReactNative_181 = {};
    Object.defineProperty(_$isReactNative_181, "__esModule", {
        value: !0
    }), _$isReactNative_181.default = function() {
        return "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase()
    };
    var _$uriToBlob_186 = {};
    Object.defineProperty(_$uriToBlob_186, "__esModule", {
        value: !0
    }), _$uriToBlob_186.default = function(e, t) {
        var r = new XMLHttpRequest;
        r.responseType = "blob", r.onload = function() {
            var e = r.response;
            t(null, e)
        }, r.onerror = function(e) {
            t(e)
        }, r.open("GET", e), r.send()
    };
    var _$isCordova_180 = {};
    Object.defineProperty(_$isCordova_180, "__esModule", {
        value: !0
    }), _$isCordova_180.default = function() {
        return "undefined" != typeof window && (void 0 !== window.PhoneGap || void 0 !== window.Cordova || void 0 !== window.cordova)
    };
    var _$readAsByteArray_182 = {};
    Object.defineProperty(_$readAsByteArray_182, "__esModule", {
        value: !0
    }), _$readAsByteArray_182.default = function(e, t) {
        var r = new FileReader;
        r.onload = function() {
            t(null, new Uint8Array(r.result))
        }, r.onerror = function(e) {
            t(e)
        }, r.readAsArrayBuffer(e)
    };
    var _$source_184 = {};
    Object.defineProperty(_$source_184, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t
        }
    }();
    _$source_184.getSource = function(e, t, r) {
        if ((0, _isReactNative2.default)() && e && void 0 !== e.uri)(0, _uriToBlob2.default)(e.uri, function(e, t) {
            if (e) return r(new Error("tus: cannot fetch `file.uri` as Blob, make sure the uri is correct and accessible. " + e));
            r(null, new FileSource(t))
        });
        else {
            if ("function" != typeof e.slice || void 0 === e.size) return "function" == typeof e.read ? (t = +t, isFinite(t) ? void r(null, new StreamSource(e, t)) : void r(new Error("cannot create source for stream without a finite value for the `chunkSize` option"))) : void r(new Error("source object may only be an instance of File, Blob, or Reader in this environment"));
            r(null, new FileSource(e))
        }
    };
    var _isReactNative2 = _interopRequireDefault(_$isReactNative_181),
        _uriToBlob2 = _interopRequireDefault(_$uriToBlob_186),
        _isCordova2 = _interopRequireDefault(_$isCordova_180),
        _readAsByteArray2 = _interopRequireDefault(_$readAsByteArray_182);

    function _interopRequireDefault(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function _classCallCheck(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var FileSource = function() {
            function e(t) {
                _classCallCheck(this, e), this._file = t, this.size = t.size
            }
            return _createClass(e, [{
                key: "slice",
                value: function(e, t, r) {
                    (0, _isCordova2.default)() ? (0, _readAsByteArray2.default)(this._file.slice(e, t), function(e, t) {
                        if (e) return r(e);
                        r(null, t)
                    }) : r(null, this._file.slice(e, t))
                }
            }, {
                key: "close",
                value: function() {}
            }]), e
        }(),
        StreamSource = function() {
            function e(t, r) {
                _classCallCheck(this, e), this._chunkSize = r, this._buffer = void 0, this._bufferOffset = 0, this._reader = t, this._done = !1
            }
            return _createClass(e, [{
                key: "slice",
                value: function(e, t, r) {
                    if (!(e < this._bufferOffset)) return this._readUntilEnoughDataOrDone(e, t, r);
                    r(new Error("Requested data is before the reader's current offset"))
                }
            }, {
                key: "_readUntilEnoughDataOrDone",
                value: function(e, t, r) {
                    var n = this,
                        o = t <= this._bufferOffset + len(this._buffer);
                    if (this._done || o) {
                        var i = this._getDataFromBuffer(e, t);
                        r(null, i, null == i && this._done)
                    } else this._reader.read().then(function(o) {
                        var i = o.value;
                        o.done ? n._done = !0 : void 0 === n._buffer ? n._buffer = i : n._buffer = function(e, t) {
                            if (e.concat) return e.concat(t);
                            if (e instanceof Blob) return new Blob([e, t], {
                                type: e.type
                            });
                            if (e.set) {
                                var r = new e.constructor(e.length + t.length);
                                return r.set(e), r.set(t, e.length), r
                            }
                            throw new Error("Unknown data type")
                        }(n._buffer, i), n._readUntilEnoughDataOrDone(e, t, r)
                    }).catch(function(e) {
                        r(new Error("Error during read: " + e))
                    })
                }
            }, {
                key: "_getDataFromBuffer",
                value: function(e, t) {
                    e > this._bufferOffset && (this._buffer = this._buffer.slice(e - this._bufferOffset), this._bufferOffset = e);
                    var r = 0 === len(this._buffer);
                    return this._done && r ? null : this._buffer.slice(0, t - e)
                }
            }, {
                key: "close",
                value: function() {
                    this._reader.cancel && this._reader.cancel()
                }
            }]), e
        }();

    function len(e) {
        return void 0 === e ? 0 : void 0 !== e.size ? e.size : e.length
    }
    var _$storage_185 = {};
    Object.defineProperty(_$storage_185, "__esModule", {
        value: !0
    });
    var ___createClass_185 = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, r, n) {
            return r && e(t.prototype, r), n && e(t, n), t
        }
    }();
    _$storage_185.getStorage = function() {
        return hasStorage ? new LocalStorage : null
    };
    var hasStorage = !1;
    try {
        hasStorage = "localStorage" in window;
        var key = "tusSupport";
        localStorage.setItem(key, localStorage.getItem(key))
    } catch (e) {
        if (e.code !== e.SECURITY_ERR && e.code !== e.QUOTA_EXCEEDED_ERR) throw e;
        hasStorage = !1
    }
    _$storage_185.canStoreURLs = hasStorage;
    var LocalStorage = function() {
            function e() {
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this)
            }
            return ___createClass_185(e, [{
                key: "setItem",
                value: function(e, t, r) {
                    r(null, localStorage.setItem(e, t))
                }
            }, {
                key: "getItem",
                value: function(e, t) {
                    t(null, localStorage.getItem(e))
                }
            }, {
                key: "removeItem",
                value: function(e, t) {
                    t(null, localStorage.removeItem(e))
                }
            }]), e
        }(),
        _$fingerprint_179 = {};
    Object.defineProperty(_$fingerprint_179, "__esModule", {
        value: !0
    }), _$fingerprint_179.default = function(e, t, r) {
        return (0, ___isCordova2_179.default)() ? r(new Error("Fingerprint cannot be computed for file input type")) : (0, ___isReactNative2_179.default)() ? r(null, function(e, t) {
            var r = e.exif ? function(e) {
                var t = 0;
                if (0 === e.length) return t;
                for (var r = 0; r < e.length; r++) {
                    t = (t << 5) - t + e.charCodeAt(r), t &= t
                }
                return t
            }(JSON.stringify(e.exif)) : "noexif";
            return ["tus-rn", e.name || "noname", e.size || "nosize", r, t.endpoint].join("/")
        }(e, t)) : r(null, ["tus-br", e.name, e.type, e.size, e.lastModified, t.endpoint].join("-"))
    };
    var ___isReactNative2_179 = ___interopRequireDefault_179(_$isReactNative_181),
        ___isCordova2_179 = ___interopRequireDefault_179(_$isCordova_180);

    function ___interopRequireDefault_179(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var _$upload_189 = {};
    Object.defineProperty(_$upload_189, "__esModule", {
        value: !0
    });
    var ___createClass_189 = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                return r && e(t.prototype, r), n && e(t, n), t
            }
        }(),
        _error2 = ___interopRequireDefault_189(_$error_187),
        _extend2 = ___interopRequireDefault_189(_$extend_36);

    function ___interopRequireDefault_189(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var __defaultOptions_189 = {
            endpoint: null,
            fingerprint: ___interopRequireDefault_189(_$fingerprint_179).default,
            resume: !0,
            onProgress: null,
            onChunkComplete: null,
            onSuccess: null,
            onError: null,
            headers: {},
            chunkSize: 1 / 0,
            withCredentials: !1,
            uploadUrl: null,
            uploadSize: null,
            overridePatchMethod: !1,
            retryDelays: null,
            removeFingerprintOnSuccess: !1,
            uploadLengthDeferred: !1,
            urlStorage: null,
            fileReader: null
        },
        Upload = function() {
            function e(t, r) {
                ! function(t, r) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this), this.options = (0, _extend2.default)(!0, {}, __defaultOptions_189, r), this._storage = this.options.urlStorage, this.file = t, this.url = null, this._xhr = null, this._fingerprint = null, this._offset = null, this._aborted = !1, this._size = null, this._source = null, this._retryAttempt = 0, this._retryTimeout = null, this._offsetBeforeRetry = 0
            }
            return ___createClass_189(e, [{
                key: "start",
                value: function() {
                    var e = this,
                        t = this.file;
                    t ? this.options.endpoint || this.options.uploadUrl ? (this.options.resume && null == this._storage && (this._storage = (0, _$storage_185.getStorage)()), this._source ? this._start(this._source) : (this.options.fileReader || _$source_184.getSource)(t, this.options.chunkSize, function(t, r) {
                        t ? e._emitError(t) : (e._source = r, e._start(r))
                    })) : this._emitError(new Error("tus: neither an endpoint or an upload URL is provided")) : this._emitError(new Error("tus: no file or stream to upload provided"))
                }
            }, {
                key: "_start",
                value: function(e) {
                    var t = this,
                        r = this.file;
                    if (this.options.uploadLengthDeferred) this._size = null;
                    else if (null != this.options.uploadSize) {
                        if (this._size = +this.options.uploadSize, isNaN(this._size)) return void this._emitError(new Error("tus: cannot convert `uploadSize` option into a number"))
                    } else if (this._size = e.size, null == this._size) return void this._emitError(new Error("tus: cannot automatically derive upload's size from input and must be specified manually using the `uploadSize` option"));
                    var n = this.options.retryDelays;
                    if (null != n) {
                        if ("[object Array]" !== Object.prototype.toString.call(n)) return void this._emitError(new Error("tus: the `retryDelays` option must either be an array or null"));
                        var o = this.options.onError;
                        this.options.onError = function(e) {
                            t.options.onError = o, null != t._offset && t._offset > t._offsetBeforeRetry && (t._retryAttempt = 0);
                            var r = !0;
                            "undefined" != typeof window && "navigator" in window && !1 === window.navigator.onLine && (r = !1);
                            var i = e.originalRequest ? e.originalRequest.status : 0,
                                s = !inStatusCategory(i, 400) || 409 === i || 423 === i;
                            if (t._retryAttempt < n.length && null != e.originalRequest && s && r) {
                                var a = n[t._retryAttempt++];
                                t._offsetBeforeRetry = t._offset, t.options.uploadUrl = t.url, t._retryTimeout = setTimeout(function() {
                                    t.start()
                                }, a)
                            } else t._emitError(e)
                        }
                    }
                    if (this._aborted = !1, null == this.url) return null != this.options.uploadUrl ? (this.url = this.options.uploadUrl, void this._resumeUpload()) : void(this._hasStorage() ? this.options.fingerprint(r, this.options, function(e, r) {
                        e ? t._emitError(e) : (t._fingerprint = r, t._storage.getItem(t._fingerprint, function(e, r) {
                            e ? t._emitError(e) : null != r ? (t.url = r, t._resumeUpload()) : t._createUpload()
                        }))
                    }) : this._createUpload());
                    this._resumeUpload()
                }
            }, {
                key: "abort",
                value: function(t, r) {
                    var n = this;
                    null !== this._xhr && (this._xhr.abort(), this._source.close()), this._aborted = !0, null != this._retryTimeout && (clearTimeout(this._retryTimeout), this._retryTimeout = null), r = r || function() {}, t ? e.terminate(this.url, this.options, function(e, t) {
                        if (e) return r(e, t);
                        n._hasStorage() ? n._storage.removeItem(n._fingerprint, r) : r()
                    }) : r()
                }
            }, {
                key: "_hasStorage",
                value: function() {
                    return this.options.resume && this._storage
                }
            }, {
                key: "_emitXhrError",
                value: function(e, t, r) {
                    this._emitError(new _error2.default(t, r, e))
                }
            }, {
                key: "_emitError",
                value: function(e) {
                    if ("function" != typeof this.options.onError) throw e;
                    this.options.onError(e)
                }
            }, {
                key: "_emitSuccess",
                value: function() {
                    "function" == typeof this.options.onSuccess && this.options.onSuccess()
                }
            }, {
                key: "_emitProgress",
                value: function(e, t) {
                    "function" == typeof this.options.onProgress && this.options.onProgress(e, t)
                }
            }, {
                key: "_emitChunkComplete",
                value: function(e, t, r) {
                    "function" == typeof this.options.onChunkComplete && this.options.onChunkComplete(e, t, r)
                }
            }, {
                key: "_setupXHR",
                value: function(e) {
                    this._xhr = e, setupXHR(e, this.options)
                }
            }, {
                key: "_createUpload",
                value: function() {
                    var e = this;
                    if (this.options.endpoint) {
                        var t = (0, _$request_183.newRequest)();
                        t.open("POST", this.options.endpoint, !0), t.onload = function() {
                            if (inStatusCategory(t.status, 200)) {
                                var r = t.getResponseHeader("Location");
                                if (null != r) {
                                    if (e.url = (0, _$request_183.resolveUrl)(e.options.endpoint, r), 0 === e._size) return e._emitSuccess(), void e._source.close();
                                    e._hasStorage() && e._storage.setItem(e._fingerprint, e.url, function(t) {
                                        t && e._emitError(t)
                                    }), e._offset = 0, e._startUpload()
                                } else e._emitXhrError(t, new Error("tus: invalid or missing Location header"))
                            } else e._emitXhrError(t, new Error("tus: unexpected response while creating upload"))
                        }, t.onerror = function(r) {
                            e._emitXhrError(t, new Error("tus: failed to create upload"), r)
                        }, this._setupXHR(t), this.options.uploadLengthDeferred ? t.setRequestHeader("Upload-Defer-Length", 1) : t.setRequestHeader("Upload-Length", this._size);
                        var r = function(e) {
                            var t = [];
                            for (var r in e) t.push(r + " " + _$base64_44.Base64.encode(e[r]));
                            return t.join(",")
                        }(this.options.metadata);
                        "" !== r && t.setRequestHeader("Upload-Metadata", r), t.send(null)
                    } else this._emitError(new Error("tus: unable to create upload because no endpoint is provided"))
                }
            }, {
                key: "_resumeUpload",
                value: function() {
                    var e = this,
                        t = (0, _$request_183.newRequest)();
                    t.open("HEAD", this.url, !0), t.onload = function() {
                        if (!inStatusCategory(t.status, 200)) return e._hasStorage() && inStatusCategory(t.status, 400) && e._storage.removeItem(e._fingerprint, function(t) {
                            t && e._emitError(t)
                        }), 423 === t.status ? void e._emitXhrError(t, new Error("tus: upload is currently locked; retry later")) : e.options.endpoint ? (e.url = null, void e._createUpload()) : void e._emitXhrError(t, new Error("tus: unable to resume upload (new upload cannot be created without an endpoint)"));
                        var r = parseInt(t.getResponseHeader("Upload-Offset"), 10);
                        if (isNaN(r)) e._emitXhrError(t, new Error("tus: invalid or missing offset value"));
                        else {
                            var n = parseInt(t.getResponseHeader("Upload-Length"), 10);
                            if (!isNaN(n) || e.options.uploadLengthDeferred) {
                                if (r === n) return e._emitProgress(n, n), void e._emitSuccess();
                                e._offset = r, e._startUpload()
                            } else e._emitXhrError(t, new Error("tus: invalid or missing length value"))
                        }
                    }, t.onerror = function(r) {
                        e._emitXhrError(t, new Error("tus: failed to resume upload"), r)
                    }, this._setupXHR(t), t.send(null)
                }
            }, {
                key: "_startUpload",
                value: function() {
                    var e = this;
                    if (!this._aborted) {
                        var t = (0, _$request_183.newRequest)();
                        this.options.overridePatchMethod ? (t.open("POST", this.url, !0), t.setRequestHeader("X-HTTP-Method-Override", "PATCH")) : t.open("PATCH", this.url, !0), t.onload = function() {
                            if (inStatusCategory(t.status, 200)) {
                                var r = parseInt(t.getResponseHeader("Upload-Offset"), 10);
                                if (isNaN(r)) e._emitXhrError(t, new Error("tus: invalid or missing offset value"));
                                else {
                                    if (e._emitProgress(r, e._size), e._emitChunkComplete(r - e._offset, r, e._size), e._offset = r, r == e._size) return e.options.removeFingerprintOnSuccess && e.options.resume && e._storage.removeItem(e._fingerprint, function(t) {
                                        t && e._emitError(t)
                                    }), e._emitSuccess(), void e._source.close();
                                    e._startUpload()
                                }
                            } else e._emitXhrError(t, new Error("tus: unexpected response while uploading chunk"))
                        }, t.onerror = function(r) {
                            e._aborted || e._emitXhrError(t, new Error("tus: failed to upload chunk at offset " + e._offset), r)
                        }, "upload" in t && (t.upload.onprogress = function(t) {
                            t.lengthComputable && e._emitProgress(r + t.loaded, e._size)
                        }), this._setupXHR(t), t.setRequestHeader("Upload-Offset", this._offset), t.setRequestHeader("Content-Type", "application/offset+octet-stream");
                        var r = this._offset,
                            n = this._offset + this.options.chunkSize;
                        (n === 1 / 0 || n > this._size) && !this.options.uploadLengthDeferred && (n = this._size), this._source.slice(r, n, function(r, n, o) {
                            r ? e._emitError(r) : (e.options.uploadLengthDeferred && o && (e._size = e._offset + (n && n.size ? n.size : 0), t.setRequestHeader("Upload-Length", e._size)), null === n ? t.send() : (t.send(n), e._emitProgress(e._offset, e._size)))
                        })
                    }
                }
            }], [{
                key: "terminate",
                value: function(e, t, r) {
                    if ("function" != typeof t && "function" != typeof r) throw new Error("tus: a callback function must be specified");
                    "function" == typeof t && (r = t, t = {});
                    var n = (0, _$request_183.newRequest)();
                    n.open("DELETE", e, !0), n.onload = function() {
                        204 === n.status ? r() : r(new _error2.default(new Error("tus: unexpected response while terminating upload"), null, n))
                    }, n.onerror = function(e) {
                        r(new _error2.default(e, new Error("tus: failed to terminate upload"), n))
                    }, setupXHR(n, t), n.send(null)
                }
            }]), e
        }();

    function inStatusCategory(e, t) {
        return e >= t && e < t + 100
    }

    function setupXHR(e, t) {
        e.setRequestHeader("Tus-Resumable", "1.0.0");
        var r = t.headers || {};
        for (var n in r) e.setRequestHeader(n, r[n]);
        e.withCredentials = t.withCredentials
    }
    Upload.defaultOptions = __defaultOptions_189, _$upload_189.default = Upload;
    var __obj_188, _upload2 = (__obj_188 = _$upload_189) && __obj_188.__esModule ? __obj_188 : {
            default: __obj_188
        },
        storage = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t.default = e, t
        }(_$storage_185),
        __defaultOptions_188 = _upload2.default.defaultOptions,
        moduleExport = {
            Upload: _upload2.default,
            canStoreURLs: storage.canStoreURLs,
            defaultOptions: __defaultOptions_188
        };
    if ("undefined" != typeof window) {
        var _window = window,
            __XMLHttpRequest_188 = _window.XMLHttpRequest,
            __Blob_188 = _window.Blob;
        moduleExport.isSupported = __XMLHttpRequest_188 && __Blob_188 && "function" == typeof __Blob_188.prototype.slice
    } else moduleExport.isSupported = !0, moduleExport.FileStorage = storage.FileStorage;
    var _$moduleExport_188 = moduleExport,
        _$getFingerprint_177 = function(e) {
            return function(t, r, n) {
                return "undefined" != typeof window && (void 0 !== window.PhoneGap || void 0 !== window.Cordova || void 0 !== window.cordova) || "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase() ? _$moduleExport_188.Upload.defaultOptions.fingerprint(t, r, n) : n(null, ["tus", e.id, r.endpoint].join("-"))
            }
        },
        _$package_190 = {
            version: "1.5.0"
        },
        ___class_178, ___temp_178;

    function ___extends_178() {
        return (___extends_178 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ___assertThisInitialized_178(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __Plugin_178 = _$lib_93.Plugin,
        __Provider_178 = _$lib_89.Provider,
        __RequestClient_178 = _$lib_89.RequestClient,
        __Socket_178 = _$lib_89.Socket,
        tusDefaultOptions = {
            endpoint: "",
            resume: !0,
            onProgress: null,
            onChunkComplete: null,
            onSuccess: null,
            onError: null,
            headers: {},
            chunkSize: 1 / 0,
            withCredentials: !1,
            uploadUrl: null,
            uploadSize: null,
            overridePatchMethod: !1,
            retryDelays: null
        },
        _$lib_178 = (___temp_178 = ___class_178 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).type = "uploader", n.id = n.opts.id || "Tus", n.title = "Tus", n.opts = ___extends_178({}, {
                    resume: !0,
                    autoRetry: !0,
                    useFastRemoteRetry: !0,
                    limit: 0,
                    retryDelays: [0, 1e3, 3e3, 5e3]
                }, r), n.requests = new _$RateLimitedQueue_198(n.opts.limit), n.uploaders = Object.create(null), n.uploaderEvents = Object.create(null), n.uploaderSockets = Object.create(null), n.handleResetProgress = n.handleResetProgress.bind(___assertThisInitialized_178(n)), n.handleUpload = n.handleUpload.bind(___assertThisInitialized_178(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.handleResetProgress = function() {
                var e = ___extends_178({}, this.uppy.getState().files);
                Object.keys(e).forEach(function(t) {
                    if (e[t].tus && e[t].tus.uploadUrl) {
                        var r = ___extends_178({}, e[t].tus);
                        delete r.uploadUrl, e[t] = ___extends_178({}, e[t], {
                            tus: r
                        })
                    }
                }), this.uppy.setState({
                    files: e
                })
            }, o.resetUploaderReferences = function(e, t) {
                if (void 0 === t && (t = {}), this.uploaders[e]) {
                    var r = this.uploaders[e];
                    r.abort(), t.abort && setTimeout(function() {
                        return r.abort(!0)
                    }, 1e3), this.uploaders[e] = null
                }
                this.uploaderEvents[e] && (this.uploaderEvents[e].remove(), this.uploaderEvents[e] = null), this.uploaderSockets[e] && (this.uploaderSockets[e].close(), this.uploaderSockets[e] = null)
            }, o.upload = function(e, t, r) {
                var n = this;
                return this.resetUploaderReferences(e.id), new Promise(function(t, r) {
                    n.uppy.emit("upload-started", e);
                    var o = ___extends_178({}, tusDefaultOptions, n.opts, e.tus || {});
                    o.fingerprint = _$getFingerprint_177(e), o.onError = function(t) {
                        n.uppy.log(t), n.uppy.emit("upload-error", e, t), t.message = "Failed because: " + t.message, n.resetUploaderReferences(e.id), l.done(), r(t)
                    }, o.onProgress = function(t, r) {
                        n.onReceiveUploadUrl(e, a.url), n.uppy.emit("upload-progress", e, {
                            uploader: n,
                            bytesUploaded: t,
                            bytesTotal: r
                        })
                    }, o.onSuccess = function() {
                        var r = {
                            uploadURL: a.url
                        };
                        n.uppy.emit("upload-success", e, r), a.url && n.uppy.log("Download " + a.file.name + " from " + a.url), n.resetUploaderReferences(e.id), l.done(), t(a)
                    };
                    var i = function(e, t, r) {
                            Object.prototype.hasOwnProperty.call(e, t) && !Object.prototype.hasOwnProperty.call(e, r) && (e[r] = e[t])
                        },
                        s = {};
                    (Array.isArray(o.metaFields) ? o.metaFields : Object.keys(e.meta)).forEach(function(t) {
                        s[t] = e.meta[t]
                    }), i(s, "type", "filetype"), i(s, "name", "filename"), o.metadata = s;
                    var a = new _$moduleExport_188.Upload(e.data, o);
                    n.uploaders[e.id] = a, n.uploaderEvents[e.id] = new _$EventTracker_195(n.uppy);
                    var l = n.requests.run(function() {
                        return e.isPaused || a.start(),
                            function() {}
                    });
                    n.onFileRemove(e.id, function(r) {
                        l.abort(), n.resetUploaderReferences(e.id, {
                            abort: !!a.url
                        }), t("upload " + r + " was removed")
                    }), n.onPause(e.id, function(e) {
                        e ? (l.abort(), a.abort()) : (l.abort(), l = n.requests.run(function() {
                            return a.start(),
                                function() {}
                        }))
                    }), n.onPauseAll(e.id, function() {
                        l.abort(), a.abort()
                    }), n.onCancelAll(e.id, function() {
                        l.abort(), n.resetUploaderReferences(e.id, {
                            abort: !!a.url
                        }), t("upload " + e.id + " was canceled")
                    }), n.onResumeAll(e.id, function() {
                        l.abort(), e.error && a.abort(), l = n.requests.run(function() {
                            return a.start(),
                                function() {}
                        })
                    })
                }).catch(function(t) {
                    throw n.uppy.emit("upload-error", e, t), t
                })
            }, o.uploadRemote = function(e, t, r) {
                var n = this;
                this.resetUploaderReferences(e.id);
                var o = ___extends_178({}, this.opts);
                return e.tus && ___extends_178(o, e.tus), this.uppy.emit("upload-started", e), this.uppy.log(e.remote.url), e.serverToken ? this.connectToServerSocket(e) : new Promise(function(t, r) {
                    new(e.remote.providerOptions.provider ? __Provider_178 : __RequestClient_178)(n.uppy, e.remote.providerOptions).post(e.remote.url, ___extends_178({}, e.remote.body, {
                        endpoint: o.endpoint,
                        uploadUrl: o.uploadUrl,
                        protocol: "tus",
                        size: e.data.size,
                        metadata: e.meta
                    })).then(function(t) {
                        return n.uppy.setFileState(e.id, {
                            serverToken: t.token
                        }), e = n.uppy.getFile(e.id), n.connectToServerSocket(e)
                    }).then(function() {
                        t()
                    }).catch(function(e) {
                        r(new Error(e))
                    })
                })
            }, o.connectToServerSocket = function(e) {
                var t = this;
                return new Promise(function(r, n) {
                    var o = e.serverToken,
                        i = _$getSocketHost_215(e.remote.companionUrl),
                        s = new __Socket_178({
                            target: i + "/api/" + o,
                            autoOpen: !1
                        });
                    t.uploaderSockets[e.id] = s, t.uploaderEvents[e.id] = new _$EventTracker_195(t.uppy), t.onFileRemove(e.id, function() {
                        a.abort(), s.send("pause", {}), s.send("cancel", {}), t.resetUploaderReferences(e.id), r("upload " + e.id + " was removed")
                    }), t.onPause(e.id, function(e) {
                        e ? (a.abort(), s.send("pause", {})) : (a.abort(), a = t.requests.run(function() {
                            return s.send("resume", {}),
                                function() {}
                        }))
                    }), t.onPauseAll(e.id, function() {
                        a.abort(), s.send("pause", {})
                    }), t.onCancelAll(e.id, function() {
                        a.abort(), s.send("pause", {}), s.send("cancel", {}), t.resetUploaderReferences(e.id), r("upload " + e.id + " was canceled")
                    }), t.onResumeAll(e.id, function() {
                        a.abort(), e.error && s.send("pause", {}), a = t.requests.run(function() {
                            return s.send("resume", {}),
                                function() {}
                        })
                    }), t.onRetry(e.id, function() {
                        s.isOpen && (s.send("pause", {}), s.send("resume", {}))
                    }), t.onRetryAll(e.id, function() {
                        s.isOpen && (s.send("pause", {}), s.send("resume", {}))
                    }), s.on("progress", function(r) {
                        return _$emitSocketProgress_202(t, r, e)
                    }), s.on("error", function(r) {
                        var o = r.error.message,
                            i = ___extends_178(new Error(o), {
                                cause: r.error
                            });
                        t.opts.useFastRemoteRetry ? s.close() : (t.resetUploaderReferences(e.id), t.uppy.setFileState(e.id, {
                            serverToken: null
                        })), t.uppy.emit("upload-error", e, i), a.done(), n(i)
                    }), s.on("success", function(n) {
                        var o = {
                            uploadURL: n.url
                        };
                        t.uppy.emit("upload-success", e, o), t.resetUploaderReferences(e.id), a.done(), r()
                    });
                    var a = t.requests.run(function() {
                        return s.open(), e.isPaused && s.send("pause", {}),
                            function() {}
                    })
                })
            }, o.onReceiveUploadUrl = function(e, t) {
                var r = this.uppy.getFile(e.id);
                r && (r.tus && r.tus.uploadUrl === t || (this.uppy.log("[Tus] Storing upload url"), this.uppy.setFileState(r.id, {
                    tus: ___extends_178({}, r.tus, {
                        uploadUrl: t
                    })
                })))
            }, o.onFileRemove = function(e, t) {
                this.uploaderEvents[e].on("file-removed", function(r) {
                    e === r.id && t(r.id)
                })
            }, o.onPause = function(e, t) {
                this.uploaderEvents[e].on("upload-pause", function(r, n) {
                    e === r && t(n)
                })
            }, o.onRetry = function(e, t) {
                this.uploaderEvents[e].on("upload-retry", function(r) {
                    e === r && t()
                })
            }, o.onRetryAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("retry-all", function(n) {
                    r.uppy.getFile(e) && t()
                })
            }, o.onPauseAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("pause-all", function() {
                    r.uppy.getFile(e) && t()
                })
            }, o.onCancelAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("cancel-all", function() {
                    r.uppy.getFile(e) && t()
                })
            }, o.onResumeAll = function(e, t) {
                var r = this;
                this.uploaderEvents[e].on("resume-all", function() {
                    r.uppy.getFile(e) && t()
                })
            }, o.uploadFiles = function(e) {
                var t = this,
                    r = e.map(function(r, n) {
                        var o = n + 1,
                            i = e.length;
                        return "error" in r && r.error ? Promise.reject(new Error(r.error)) : r.isRemote ? t.uploadRemote(r, o, i) : t.upload(r, o, i)
                    });
                return _$settle_228(r)
            }, o.handleUpload = function(e) {
                var t = this;
                if (0 === e.length) return this.uppy.log("[Tus] No files to upload"), Promise.resolve();
                0 === this.opts.limit && this.uppy.log("[Tus] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/tus/#limit-0", "warning"), this.uppy.log("[Tus] Uploading...");
                var r = e.map(function(e) {
                    return t.uppy.getFile(e)
                });
                return this.uploadFiles(r).then(function() {
                    return null
                })
            }, o.install = function() {
                this.uppy.setState({
                    capabilities: ___extends_178({}, this.uppy.getState().capabilities, {
                        resumableUploads: !0
                    })
                }), this.uppy.addUploader(this.handleUpload), this.uppy.on("reset-progress", this.handleResetProgress), this.opts.autoRetry && this.uppy.on("back-online", this.uppy.retryAll)
            }, o.uninstall = function() {
                this.uppy.setState({
                    capabilities: ___extends_178({}, this.uppy.getState().capabilities, {
                        resumableUploads: !1
                    })
                }), this.uppy.removeUploader(this.handleUpload), this.opts.autoRetry && this.uppy.off("back-online", this.uppy.retryAll)
            }, n
        }(__Plugin_178), ___class_178.VERSION = _$package_190.version, ___temp_178),
        re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        parts = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
        _$parseuri_51 = function(e) {
            var t = e,
                r = e.indexOf("["),
                n = e.indexOf("]"); - 1 != r && -1 != n && (e = e.substring(0, r) + e.substring(r, n).replace(/:/g, ";") + e.substring(n, e.length));
            for (var o = re.exec(e || ""), i = {}, s = 14; s--;) i[parts[s]] = o[s] || "";
            return -1 != r && -1 != n && (i.source = t, i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"), i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), i.ipv6uri = !0), i
        },
        s = 1e3,
        m = 60 * s,
        __h_66 = 60 * m,
        d = 24 * __h_66,
        y = 365.25 * d;

    function plural(e, t, r) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r + "s"
    }
    var _$ms_66 = function(e, t) {
            t = t || {};
            var r, n = typeof e;
            if ("string" === n && e.length > 0) return function(e) {
                if (!((e = String(e)).length > 100)) {
                    var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                    if (t) {
                        var r = parseFloat(t[1]);
                        switch ((t[2] || "ms").toLowerCase()) {
                            case "years":
                            case "year":
                            case "yrs":
                            case "yr":
                            case "y":
                                return r * y;
                            case "days":
                            case "day":
                            case "d":
                                return r * d;
                            case "hours":
                            case "hour":
                            case "hrs":
                            case "hr":
                            case "h":
                                return r * __h_66;
                            case "minutes":
                            case "minute":
                            case "mins":
                            case "min":
                            case "m":
                                return r * m;
                            case "seconds":
                            case "second":
                            case "secs":
                            case "sec":
                            case "s":
                                return r * s;
                            case "milliseconds":
                            case "millisecond":
                            case "msecs":
                            case "msec":
                            case "ms":
                                return r;
                            default:
                                return
                        }
                    }
                }
            }(e);
            if ("number" === n && !1 === isNaN(e)) return t.long ? plural(r = e, d, "day") || plural(r, __h_66, "hour") || plural(r, m, "minute") || plural(r, s, "second") || r + " ms" : function(e) {
                return e >= d ? Math.round(e / d) + "d" : e >= __h_66 ? Math.round(e / __h_66) + "h" : e >= m ? Math.round(e / m) + "m" : e >= s ? Math.round(e / s) + "s" : e + "ms"
            }(e);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
        },
        _$debug_65 = {};

    function createDebug(e) {
        var t;

        function r() {
            if (r.enabled) {
                var e = r,
                    n = +new Date,
                    o = n - (t || n);
                e.diff = o, e.prev = t, e.curr = n, t = n;
                for (var i = new Array(arguments.length), s = 0; s < i.length; s++) i[s] = arguments[s];
                i[0] = _$debug_65.coerce(i[0]), "string" != typeof i[0] && i.unshift("%O");
                var a = 0;
                i[0] = i[0].replace(/%([a-zA-Z%])/g, function(t, r) {
                    if ("%%" === t) return t;
                    a++;
                    var n = _$debug_65.formatters[r];
                    if ("function" == typeof n) {
                        var o = i[a];
                        t = n.call(e, o), i.splice(a, 1), a--
                    }
                    return t
                }), _$debug_65.formatArgs.call(e, i), (r.log || _$debug_65.log || console.log.bind(console)).apply(e, i)
            }
        }
        return r.namespace = e, r.enabled = _$debug_65.enabled(e), r.useColors = _$debug_65.useColors(), r.color = function(e) {
            var t, r = 0;
            for (t in e) r = (r << 5) - r + e.charCodeAt(t), r |= 0;
            return _$debug_65.colors[Math.abs(r) % _$debug_65.colors.length]
        }(e), r.destroy = destroy, "function" == typeof _$debug_65.init && _$debug_65.init(r), _$debug_65.instances.push(r), r
    }

    function destroy() {
        var e = _$debug_65.instances.indexOf(this);
        return -1 !== e && (_$debug_65.instances.splice(e, 1), !0)
    }
    _$debug_65 = _$debug_65 = createDebug.debug = createDebug.default = createDebug, _$debug_65.coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e
    }, _$debug_65.disable = function() {
        _$debug_65.enable("")
    }, _$debug_65.enable = function(e) {
        var t;
        _$debug_65.save(e), _$debug_65.names = [], _$debug_65.skips = [];
        var r = ("string" == typeof e ? e : "").split(/[\s,]+/),
            n = r.length;
        for (t = 0; t < n; t++) r[t] && ("-" === (e = r[t].replace(/\*/g, ".*?"))[0] ? _$debug_65.skips.push(new RegExp("^" + e.substr(1) + "$")) : _$debug_65.names.push(new RegExp("^" + e + "$")));
        for (t = 0; t < _$debug_65.instances.length; t++) {
            var o = _$debug_65.instances[t];
            o.enabled = _$debug_65.enabled(o.namespace)
        }
    }, _$debug_65.enabled = function(e) {
        if ("*" === e[e.length - 1]) return !0;
        var t, r;
        for (t = 0, r = _$debug_65.skips.length; t < r; t++)
            if (_$debug_65.skips[t].test(e)) return !1;
        for (t = 0, r = _$debug_65.names.length; t < r; t++)
            if (_$debug_65.names[t].test(e)) return !0;
        return !1
    }, _$debug_65.humanize = _$ms_66, _$debug_65.instances = [], _$debug_65.names = [], _$debug_65.skips = [], _$debug_65.formatters = {};
    var _$browser_64 = {};
    (function(t) {
        function r() {
            var r;
            try {
                r = _$browser_64.storage.debug
            } catch (e) {}
            return !r && void 0 !== t && "env" in t && (r = t.env.DEBUG), r
        }(_$browser_64 = _$browser_64 = _$debug_65).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }, _$browser_64.formatArgs = function(e) {
            var t = this.useColors;
            if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + _$browser_64.humanize(this.diff), t) {
                var r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                var n = 0,
                    o = 0;
                e[0].replace(/%[a-zA-Z%]/g, function(e) {
                    "%%" !== e && (n++, "%c" === e && (o = n))
                }), e.splice(o, 0, r)
            }
        }, _$browser_64.save = function(t) {
            try {
                null == t ? _$browser_64.storage.removeItem("debug") : _$browser_64.storage.debug = t
            } catch (e) {}
        }, _$browser_64.load = r, _$browser_64.useColors = function() {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        }, _$browser_64.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (e) {}
        }(), _$browser_64.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], _$browser_64.formatters.j = function(e) {
            try {
                return JSON.stringify(e)
            } catch (err) {
                return "[UnexpectedJSONParseError]: " + err.message
            }
        }, _$browser_64.enable(r())
    }).call(this, _$browser_54);
    var debug = _$browser_64("socket.io-client:url"),
        _$url_62 = function(e, t) {
            var r = e;
            t = t || "undefined" != typeof location && location, null == e && (e = t.protocol + "//" + t.host), "string" == typeof e && ("/" === e.charAt(0) && (e = "/" === e.charAt(1) ? t.protocol + e : t.host + e), /^(https?|wss?):\/\//.test(e) || (debug("protocol-less url %s", e), e = void 0 !== t ? t.protocol + "//" + e : "https://" + e), debug("parse %s", e), r = _$parseuri_51(e)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/";
            var n = -1 !== r.host.indexOf(":") ? "[" + r.host + "]" : r.host;
            return r.id = r.protocol + "://" + n + ":" + r.port, r.href = r.protocol + "://" + n + (t && t.port === r.port ? "" : ":" + r.port), r
        },
        __s_74 = 1e3,
        __m_74 = 60 * __s_74,
        __h_74 = 60 * __m_74,
        __d_74 = 24 * __h_74,
        __y_74 = 365.25 * __d_74;

    function __plural_74(e, t, r) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r + "s"
    }
    var _$ms_74 = function(e, t) {
            t = t || {};
            var r, n = typeof e;
            if ("string" === n && e.length > 0) return function(e) {
                if (!((e = String(e)).length > 100)) {
                    var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                    if (t) {
                        var r = parseFloat(t[1]);
                        switch ((t[2] || "ms").toLowerCase()) {
                            case "years":
                            case "year":
                            case "yrs":
                            case "yr":
                            case "y":
                                return r * __y_74;
                            case "days":
                            case "day":
                            case "d":
                                return r * __d_74;
                            case "hours":
                            case "hour":
                            case "hrs":
                            case "hr":
                            case "h":
                                return r * __h_74;
                            case "minutes":
                            case "minute":
                            case "mins":
                            case "min":
                            case "m":
                                return r * __m_74;
                            case "seconds":
                            case "second":
                            case "secs":
                            case "sec":
                            case "s":
                                return r * __s_74;
                            case "milliseconds":
                            case "millisecond":
                            case "msecs":
                            case "msec":
                            case "ms":
                                return r;
                            default:
                                return
                        }
                    }
                }
            }(e);
            if ("number" === n && !1 === isNaN(e)) return t.long ? __plural_74(r = e, __d_74, "day") || __plural_74(r, __h_74, "hour") || __plural_74(r, __m_74, "minute") || __plural_74(r, __s_74, "second") || r + " ms" : function(e) {
                return e >= __d_74 ? Math.round(e / __d_74) + "d" : e >= __h_74 ? Math.round(e / __h_74) + "h" : e >= __m_74 ? Math.round(e / __m_74) + "m" : e >= __s_74 ? Math.round(e / __s_74) + "s" : e + "ms"
            }(e);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
        },
        _$debug_72 = {};

    function __createDebug_72(e) {
        var t;

        function r() {
            if (r.enabled) {
                var e = r,
                    n = +new Date,
                    o = n - (t || n);
                e.diff = o, e.prev = t, e.curr = n, t = n;
                for (var i = new Array(arguments.length), s = 0; s < i.length; s++) i[s] = arguments[s];
                i[0] = _$debug_72.coerce(i[0]), "string" != typeof i[0] && i.unshift("%O");
                var a = 0;
                i[0] = i[0].replace(/%([a-zA-Z%])/g, function(t, r) {
                    if ("%%" === t) return t;
                    a++;
                    var n = _$debug_72.formatters[r];
                    if ("function" == typeof n) {
                        var o = i[a];
                        t = n.call(e, o), i.splice(a, 1), a--
                    }
                    return t
                }), _$debug_72.formatArgs.call(e, i), (r.log || _$debug_72.log || console.log.bind(console)).apply(e, i)
            }
        }
        return r.namespace = e, r.enabled = _$debug_72.enabled(e), r.useColors = _$debug_72.useColors(), r.color = function(e) {
            var t, r = 0;
            for (t in e) r = (r << 5) - r + e.charCodeAt(t), r |= 0;
            return _$debug_72.colors[Math.abs(r) % _$debug_72.colors.length]
        }(e), r.destroy = __destroy_72, "function" == typeof _$debug_72.init && _$debug_72.init(r), _$debug_72.instances.push(r), r
    }

    function __destroy_72() {
        var e = _$debug_72.instances.indexOf(this);
        return -1 !== e && (_$debug_72.instances.splice(e, 1), !0)
    }
    _$debug_72 = _$debug_72 = __createDebug_72.debug = __createDebug_72.default = __createDebug_72, _$debug_72.coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e
    }, _$debug_72.disable = function() {
        _$debug_72.enable("")
    }, _$debug_72.enable = function(e) {
        var t;
        _$debug_72.save(e), _$debug_72.names = [], _$debug_72.skips = [];
        var r = ("string" == typeof e ? e : "").split(/[\s,]+/),
            n = r.length;
        for (t = 0; t < n; t++) r[t] && ("-" === (e = r[t].replace(/\*/g, ".*?"))[0] ? _$debug_72.skips.push(new RegExp("^" + e.substr(1) + "$")) : _$debug_72.names.push(new RegExp("^" + e + "$")));
        for (t = 0; t < _$debug_72.instances.length; t++) {
            var o = _$debug_72.instances[t];
            o.enabled = _$debug_72.enabled(o.namespace)
        }
    }, _$debug_72.enabled = function(e) {
        if ("*" === e[e.length - 1]) return !0;
        var t, r;
        for (t = 0, r = _$debug_72.skips.length; t < r; t++)
            if (_$debug_72.skips[t].test(e)) return !1;
        for (t = 0, r = _$debug_72.names.length; t < r; t++)
            if (_$debug_72.names[t].test(e)) return !0;
        return !1
    }, _$debug_72.humanize = _$ms_74, _$debug_72.instances = [], _$debug_72.names = [], _$debug_72.skips = [], _$debug_72.formatters = {};
    var _$browser_71 = {};
    (function(t) {
        function r() {
            var r;
            try {
                r = _$browser_71.storage.debug
            } catch (e) {}
            return !r && void 0 !== t && "env" in t && (r = t.env.DEBUG), r
        }(_$browser_71 = _$browser_71 = _$debug_72).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }, _$browser_71.formatArgs = function(e) {
            var t = this.useColors;
            if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + _$browser_71.humanize(this.diff), t) {
                var r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                var n = 0,
                    o = 0;
                e[0].replace(/%[a-zA-Z%]/g, function(e) {
                    "%%" !== e && (n++, "%c" === e && (o = n))
                }), e.splice(o, 0, r)
            }
        }, _$browser_71.save = function(t) {
            try {
                null == t ? _$browser_71.storage.removeItem("debug") : _$browser_71.storage.debug = t
            } catch (e) {}
        }, _$browser_71.load = r, _$browser_71.useColors = function() {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        }, _$browser_71.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (e) {}
        }(), _$browser_71.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], _$browser_71.formatters.j = function(e) {
            try {
                return JSON.stringify(e)
            } catch (err) {
                return "[UnexpectedJSONParseError]: " + err.message
            }
        }, _$browser_71.enable(r())
    }).call(this, _$browser_54);
    var _$componentEmitter_70 = {
        exports: {}
    };

    function Emitter(e) {
        if (e) return function(e) {
            for (var t in Emitter.prototype) e[t] = Emitter.prototype[t];
            return e
        }(e)
    }
    _$componentEmitter_70.exports = Emitter, Emitter.prototype.on = Emitter.prototype.addEventListener = function(e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
    }, Emitter.prototype.once = function(e, t) {
        function r() {
            this.off(e, r), t.apply(this, arguments)
        }
        return r.fn = t, this.on(e, r), this
    }, Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var r, n = this._callbacks["$" + e];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + e], this;
        for (var o = 0; o < n.length; o++)
            if ((r = n[o]) === t || r.fn === t) {
                n.splice(o, 1);
                break
            } return this
    }, Emitter.prototype.emit = function(e) {
        this._callbacks = this._callbacks || {};
        var t = [].slice.call(arguments, 1),
            r = this._callbacks["$" + e];
        if (r)
            for (var n = 0, o = (r = r.slice(0)).length; n < o; ++n) r[n].apply(this, t);
        return this
    }, Emitter.prototype.listeners = function(e) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
    }, Emitter.prototype.hasListeners = function(e) {
        return !!this.listeners(e).length
    }, _$componentEmitter_70 = _$componentEmitter_70.exports;
    for (var toString = {}.toString, _$isarray_73 = Array.isArray || function(e) {
            return "[object Array]" == toString.call(e)
        }, _$base64Js_5 = {
            toByteArray: function(e) {
                for (var t, r = getLens(e), n = r[0], o = r[1], i = new Arr(function(e, t, r) {
                        return 3 * (t + r) / 4 - r
                    }(0, n, o)), s = 0, a = o > 0 ? n - 4 : n, l = 0; l < a; l += 4) t = revLookup[e.charCodeAt(l)] << 18 | revLookup[e.charCodeAt(l + 1)] << 12 | revLookup[e.charCodeAt(l + 2)] << 6 | revLookup[e.charCodeAt(l + 3)], i[s++] = t >> 16 & 255, i[s++] = t >> 8 & 255, i[s++] = 255 & t;
                return 2 === o && (t = revLookup[e.charCodeAt(l)] << 2 | revLookup[e.charCodeAt(l + 1)] >> 4, i[s++] = 255 & t), 1 === o && (t = revLookup[e.charCodeAt(l)] << 10 | revLookup[e.charCodeAt(l + 1)] << 4 | revLookup[e.charCodeAt(l + 2)] >> 2, i[s++] = t >> 8 & 255, i[s++] = 255 & t), i
            },
            fromByteArray: function(e) {
                for (var t, r = e.length, n = r % 3, o = [], i = 0, s = r - n; i < s; i += 16383) o.push(encodeChunk(e, i, i + 16383 > s ? s : i + 16383));
                return 1 === n ? (t = e[r - 1], o.push(lookup[t >> 2] + lookup[t << 4 & 63] + "==")) : 2 === n && (t = (e[r - 2] << 8) + e[r - 1], o.push(lookup[t >> 10] + lookup[t >> 4 & 63] + lookup[t << 2 & 63] + "=")), o.join("")
            }
        }, lookup = [], revLookup = [], Arr = "undefined" != typeof Uint8Array ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, __len_5 = code.length; i < __len_5; ++i) lookup[i] = code[i], revLookup[code.charCodeAt(i)] = i;

    function getLens(e) {
        var t = e.length;
        if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var r = e.indexOf("=");
        return -1 === r && (r = t), [r, r === t ? 0 : 4 - r % 4]
    }

    function encodeChunk(e, t, r) {
        for (var n, o, i = [], s = t; s < r; s += 3) n = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]), i.push(lookup[(o = n) >> 18 & 63] + lookup[o >> 12 & 63] + lookup[o >> 6 & 63] + lookup[63 & o]);
        return i.join("")
    }
    revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63;
    var _$ieee754_41 = {
            read: function(e, t, r, n, o) {
                var i, s, a = 8 * o - n - 1,
                    l = (1 << a) - 1,
                    u = l >> 1,
                    c = -7,
                    p = r ? o - 1 : 0,
                    d = r ? -1 : 1,
                    _ = e[t + p];
                for (p += d, i = _ & (1 << -c) - 1, _ >>= -c, c += a; c > 0; i = 256 * i + e[t + p], p += d, c -= 8);
                for (s = i & (1 << -c) - 1, i >>= -c, c += n; c > 0; s = 256 * s + e[t + p], p += d, c -= 8);
                if (0 === i) i = 1 - u;
                else {
                    if (i === l) return s ? NaN : 1 / 0 * (_ ? -1 : 1);
                    s += Math.pow(2, n), i -= u
                }
                return (_ ? -1 : 1) * s * Math.pow(2, i - n)
            },
            write: function(e, t, r, n, o, i) {
                var s, a, l, u = 8 * i - o - 1,
                    c = (1 << u) - 1,
                    p = c >> 1,
                    d = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    _ = n ? 0 : i - 1,
                    h = n ? 1 : -1,
                    f = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, s = c) : (s = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -s)) < 1 && (s--, l *= 2), (t += s + p >= 1 ? d / l : d * Math.pow(2, 1 - p)) * l >= 2 && (s++, l /= 2), s + p >= c ? (a = 0, s = c) : s + p >= 1 ? (a = (t * l - 1) * Math.pow(2, o), s += p) : (a = t * Math.pow(2, p - 1) * Math.pow(2, o), s = 0)); o >= 8; e[r + _] = 255 & a, _ += h, a /= 256, o -= 8);
                for (s = s << o | a, u += o; u > 0; e[r + _] = 255 & s, _ += h, s /= 256, u -= 8);
                e[r + _ - h] |= 128 * f
            }
        },
        _$isBuffer_69 = {};
    (function(e) {
        _$isBuffer_69 = function(o) {
            return t && e.isBuffer(o) || r && (o instanceof ArrayBuffer || n(o))
        };
        var t = "function" == typeof e && "function" == typeof e.isBuffer,
            r = "function" == typeof ArrayBuffer,
            n = function(e) {
                return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer
            }
    }).call(this, _$buffer_8({}).Buffer);
    var _$binary_67 = {},
        __toString_67 = Object.prototype.toString,
        withNativeBlob = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === __toString_67.call(Blob),
        withNativeFile = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === __toString_67.call(File);
    _$binary_67.deconstructPacket = function(e) {
        var t = [],
            r = e.data,
            n = e;
        return n.data = function e(t, r) {
            if (!t) return t;
            if (_$isBuffer_69(t)) {
                var n = {
                    _placeholder: !0,
                    num: r.length
                };
                return r.push(t), n
            }
            if (_$isarray_73(t)) {
                for (var o = new Array(t.length), i = 0; i < t.length; i++) o[i] = e(t[i], r);
                return o
            }
            if ("object" == typeof t && !(t instanceof Date)) {
                o = {};
                for (var s in t) o[s] = e(t[s], r);
                return o
            }
            return t
        }(r, t), n.attachments = t.length, {
            packet: n,
            buffers: t
        }
    }, _$binary_67.reconstructPacket = function(e, t) {
        return e.data = function e(t, r) {
            if (!t) return t;
            if (t && t._placeholder) return r[t.num];
            if (_$isarray_73(t))
                for (var n = 0; n < t.length; n++) t[n] = e(t[n], r);
            else if ("object" == typeof t)
                for (var o in t) t[o] = e(t[o], r);
            return t
        }(e.data, t), e.attachments = void 0, e
    }, _$binary_67.removeBlobs = function(e, t) {
        var r = 0,
            n = e;
        ! function e(o, i, s) {
            if (!o) return o;
            if (withNativeBlob && o instanceof Blob || withNativeFile && o instanceof File) {
                r++;
                var a = new FileReader;
                a.onload = function() {
                    s ? s[i] = this.result : n = this.result, --r || t(n)
                }, a.readAsArrayBuffer(o)
            } else if (_$isarray_73(o))
                for (var l = 0; l < o.length; l++) e(o[l], l, o);
            else if ("object" == typeof o && !_$isBuffer_69(o))
                for (var u in o) e(o[u], u, o)
        }(n), r || t(n)
    };
    var _$socketIoParser_68 = {},
        __debug_68 = _$browser_71("socket.io-parser");

    function Encoder() {}
    _$socketIoParser_68.protocol = 4, _$socketIoParser_68.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], _$socketIoParser_68.CONNECT = 0, _$socketIoParser_68.DISCONNECT = 1, _$socketIoParser_68.EVENT = 2, _$socketIoParser_68.ACK = 3, _$socketIoParser_68.ERROR = 4, _$socketIoParser_68.BINARY_EVENT = 5, _$socketIoParser_68.BINARY_ACK = 6, _$socketIoParser_68.Encoder = Encoder, _$socketIoParser_68.Decoder = Decoder;
    var ERROR_PACKET = _$socketIoParser_68.ERROR + '"encode error"';

    function encodeAsString(t) {
        var r = "" + t.type;
        if (_$socketIoParser_68.BINARY_EVENT !== t.type && _$socketIoParser_68.BINARY_ACK !== t.type || (r += t.attachments + "-"), t.nsp && "/" !== t.nsp && (r += t.nsp + ","), null != t.id && (r += t.id), null != t.data) {
            var n = function(t) {
                try {
                    return JSON.stringify(t)
                } catch (e) {
                    return !1
                }
            }(t.data);
            if (!1 === n) return ERROR_PACKET;
            r += n
        }
        return __debug_68("encoded %j as %s", t, r), r
    }

    function Decoder() {
        this.reconstructor = null
    }

    function BinaryReconstructor(e) {
        this.reconPack = e, this.buffers = []
    }

    function error(e) {
        return {
            type: _$socketIoParser_68.ERROR,
            data: "parser error: " + e
        }
    }
    Encoder.prototype.encode = function(e, t) {
        __debug_68("encoding packet %j", e), _$socketIoParser_68.BINARY_EVENT === e.type || _$socketIoParser_68.BINARY_ACK === e.type ? function(e, t) {
            _$binary_67.removeBlobs(e, function(e) {
                var r = _$binary_67.deconstructPacket(e),
                    n = encodeAsString(r.packet),
                    o = r.buffers;
                o.unshift(n), t(o)
            })
        }(e, t) : t([encodeAsString(e)])
    }, _$componentEmitter_70(Decoder.prototype), Decoder.prototype.add = function(t) {
        var r;
        if ("string" == typeof t) r = function(t) {
            var r = 0,
                n = {
                    type: Number(t.charAt(0))
                };
            if (null == _$socketIoParser_68.types[n.type]) return error("unknown packet type " + n.type);
            if (_$socketIoParser_68.BINARY_EVENT === n.type || _$socketIoParser_68.BINARY_ACK === n.type) {
                for (var o = "";
                    "-" !== t.charAt(++r) && (o += t.charAt(r), r != t.length););
                if (o != Number(o) || "-" !== t.charAt(r)) throw new Error("Illegal attachments");
                n.attachments = Number(o)
            }
            if ("/" === t.charAt(r + 1))
                for (n.nsp = ""; ++r;) {
                    if ("," === (s = t.charAt(r))) break;
                    if (n.nsp += s, r === t.length) break
                } else n.nsp = "/";
            var i = t.charAt(r + 1);
            if ("" !== i && Number(i) == i) {
                for (n.id = ""; ++r;) {
                    var s;
                    if (null == (s = t.charAt(r)) || Number(s) != s) {
                        --r;
                        break
                    }
                    if (n.id += t.charAt(r), r === t.length) break
                }
                n.id = Number(n.id)
            }
            if (t.charAt(++r)) {
                var a = function(t) {
                    try {
                        return JSON.parse(t)
                    } catch (e) {
                        return !1
                    }
                }(t.substr(r));
                if (!(!1 !== a && (n.type === _$socketIoParser_68.ERROR || _$isarray_73(a)))) return error("invalid payload");
                n.data = a
            }
            return __debug_68("decoded %s as %j", t, n), n
        }(t), _$socketIoParser_68.BINARY_EVENT === r.type || _$socketIoParser_68.BINARY_ACK === r.type ? (this.reconstructor = new BinaryReconstructor(r), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", r)) : this.emit("decoded", r);
        else {
            if (!_$isBuffer_69(t) && !t.base64) throw new Error("Unknown type: " + t);
            if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
            (r = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null, this.emit("decoded", r))
        }
    }, Decoder.prototype.destroy = function() {
        this.reconstructor && this.reconstructor.finishedReconstruction()
    }, BinaryReconstructor.prototype.takeBinaryData = function(e) {
        if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {
            var t = _$binary_67.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), t
        }
        return null
    }, BinaryReconstructor.prototype.finishedReconstruction = function() {
        this.reconPack = null, this.buffers = []
    };
    var _$componentEmitter_26 = {
        exports: {}
    };

    function __Emitter_26(e) {
        if (e) return function(e) {
            for (var t in __Emitter_26.prototype) e[t] = __Emitter_26.prototype[t];
            return e
        }(e)
    }
    _$componentEmitter_26.exports = __Emitter_26, __Emitter_26.prototype.on = __Emitter_26.prototype.addEventListener = function(e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
    }, __Emitter_26.prototype.once = function(e, t) {
        function r() {
            this.off(e, r), t.apply(this, arguments)
        }
        return r.fn = t, this.on(e, r), this
    }, __Emitter_26.prototype.off = __Emitter_26.prototype.removeListener = __Emitter_26.prototype.removeAllListeners = __Emitter_26.prototype.removeEventListener = function(e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var r, n = this._callbacks["$" + e];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + e], this;
        for (var o = 0; o < n.length; o++)
            if ((r = n[o]) === t || r.fn === t) {
                n.splice(o, 1);
                break
            } return this
    }, __Emitter_26.prototype.emit = function(e) {
        this._callbacks = this._callbacks || {};
        var t = [].slice.call(arguments, 1),
            r = this._callbacks["$" + e];
        if (r)
            for (var n = 0, o = (r = r.slice(0)).length; n < o; ++n) r[n].apply(this, t);
        return this
    }, __Emitter_26.prototype.listeners = function(e) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
    }, __Emitter_26.prototype.hasListeners = function(e) {
        return !!this.listeners(e).length
    }, _$componentEmitter_26 = _$componentEmitter_26.exports;
    var __s_29 = 1e3,
        __m_29 = 60 * __s_29,
        __h_29 = 60 * __m_29,
        __d_29 = 24 * __h_29,
        __y_29 = 365.25 * __d_29;

    function __plural_29(e, t, r) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r + "s"
    }
    var _$ms_29 = function(e, t) {
            t = t || {};
            var r, n = typeof e;
            if ("string" === n && e.length > 0) return function(e) {
                if (!((e = String(e)).length > 100)) {
                    var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                    if (t) {
                        var r = parseFloat(t[1]);
                        switch ((t[2] || "ms").toLowerCase()) {
                            case "years":
                            case "year":
                            case "yrs":
                            case "yr":
                            case "y":
                                return r * __y_29;
                            case "days":
                            case "day":
                            case "d":
                                return r * __d_29;
                            case "hours":
                            case "hour":
                            case "hrs":
                            case "hr":
                            case "h":
                                return r * __h_29;
                            case "minutes":
                            case "minute":
                            case "mins":
                            case "min":
                            case "m":
                                return r * __m_29;
                            case "seconds":
                            case "second":
                            case "secs":
                            case "sec":
                            case "s":
                                return r * __s_29;
                            case "milliseconds":
                            case "millisecond":
                            case "msecs":
                            case "msec":
                            case "ms":
                                return r;
                            default:
                                return
                        }
                    }
                }
            }(e);
            if ("number" === n && !1 === isNaN(e)) return t.long ? __plural_29(r = e, __d_29, "day") || __plural_29(r, __h_29, "hour") || __plural_29(r, __m_29, "minute") || __plural_29(r, __s_29, "second") || r + " ms" : function(e) {
                return e >= __d_29 ? Math.round(e / __d_29) + "d" : e >= __h_29 ? Math.round(e / __h_29) + "h" : e >= __m_29 ? Math.round(e / __m_29) + "m" : e >= __s_29 ? Math.round(e / __s_29) + "s" : e + "ms"
            }(e);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
        },
        _$debug_28 = {};

    function __createDebug_28(e) {
        var t;

        function r() {
            if (r.enabled) {
                var e = r,
                    n = +new Date,
                    o = n - (t || n);
                e.diff = o, e.prev = t, e.curr = n, t = n;
                for (var i = new Array(arguments.length), s = 0; s < i.length; s++) i[s] = arguments[s];
                i[0] = _$debug_28.coerce(i[0]), "string" != typeof i[0] && i.unshift("%O");
                var a = 0;
                i[0] = i[0].replace(/%([a-zA-Z%])/g, function(t, r) {
                    if ("%%" === t) return t;
                    a++;
                    var n = _$debug_28.formatters[r];
                    if ("function" == typeof n) {
                        var o = i[a];
                        t = n.call(e, o), i.splice(a, 1), a--
                    }
                    return t
                }), _$debug_28.formatArgs.call(e, i), (r.log || _$debug_28.log || console.log.bind(console)).apply(e, i)
            }
        }
        return r.namespace = e, r.enabled = _$debug_28.enabled(e), r.useColors = _$debug_28.useColors(), r.color = function(e) {
            var t, r = 0;
            for (t in e) r = (r << 5) - r + e.charCodeAt(t), r |= 0;
            return _$debug_28.colors[Math.abs(r) % _$debug_28.colors.length]
        }(e), r.destroy = __destroy_28, "function" == typeof _$debug_28.init && _$debug_28.init(r), _$debug_28.instances.push(r), r
    }

    function __destroy_28() {
        var e = _$debug_28.instances.indexOf(this);
        return -1 !== e && (_$debug_28.instances.splice(e, 1), !0)
    }
    _$debug_28 = _$debug_28 = __createDebug_28.debug = __createDebug_28.default = __createDebug_28, _$debug_28.coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e
    }, _$debug_28.disable = function() {
        _$debug_28.enable("")
    }, _$debug_28.enable = function(e) {
        var t;
        _$debug_28.save(e), _$debug_28.names = [], _$debug_28.skips = [];
        var r = ("string" == typeof e ? e : "").split(/[\s,]+/),
            n = r.length;
        for (t = 0; t < n; t++) r[t] && ("-" === (e = r[t].replace(/\*/g, ".*?"))[0] ? _$debug_28.skips.push(new RegExp("^" + e.substr(1) + "$")) : _$debug_28.names.push(new RegExp("^" + e + "$")));
        for (t = 0; t < _$debug_28.instances.length; t++) {
            var o = _$debug_28.instances[t];
            o.enabled = _$debug_28.enabled(o.namespace)
        }
    }, _$debug_28.enabled = function(e) {
        if ("*" === e[e.length - 1]) return !0;
        var t, r;
        for (t = 0, r = _$debug_28.skips.length; t < r; t++)
            if (_$debug_28.skips[t].test(e)) return !1;
        for (t = 0, r = _$debug_28.names.length; t < r; t++)
            if (_$debug_28.names[t].test(e)) return !0;
        return !1
    }, _$debug_28.humanize = _$ms_29, _$debug_28.instances = [], _$debug_28.names = [], _$debug_28.skips = [], _$debug_28.formatters = {};
    var _$browser_27 = {};
    (function(t) {
        function r() {
            var r;
            try {
                r = _$browser_27.storage.debug
            } catch (e) {}
            return !r && void 0 !== t && "env" in t && (r = t.env.DEBUG), r
        }(_$browser_27 = _$browser_27 = _$debug_28).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }, _$browser_27.formatArgs = function(e) {
            var t = this.useColors;
            if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + _$browser_27.humanize(this.diff), t) {
                var r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                var n = 0,
                    o = 0;
                e[0].replace(/%[a-zA-Z%]/g, function(e) {
                    "%%" !== e && (n++, "%c" === e && (o = n))
                }), e.splice(o, 0, r)
            }
        }, _$browser_27.save = function(t) {
            try {
                null == t ? _$browser_27.storage.removeItem("debug") : _$browser_27.storage.debug = t
            } catch (e) {}
        }, _$browser_27.load = r, _$browser_27.useColors = function() {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        }, _$browser_27.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (e) {}
        }(), _$browser_27.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], _$browser_27.formatters.j = function(e) {
            try {
                return JSON.stringify(e)
            } catch (err) {
                return "[UnexpectedJSONParseError]: " + err.message
            }
        }, _$browser_27.enable(r())
    }).call(this, _$browser_54);
    var indexOf = [].indexOf,
        _$indexof_42 = function(e, t) {
            if (indexOf) return e.indexOf(t);
            for (var r = 0; r < e.length; ++r)
                if (e[r] === t) return r;
            return -1
        },
        _$parseqs_50 = {
            encode: function(e) {
                var t = "";
                for (var r in e) e.hasOwnProperty(r) && (t.length && (t += "&"), t += encodeURIComponent(r) + "=" + encodeURIComponent(e[r]));
                return t
            },
            decode: function(e) {
                for (var t = {}, r = e.split("&"), n = 0, o = r.length; n < o; n++) {
                    var i = r[n].split("=");
                    t[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
                }
                return t
            }
        },
        _$keys_31 = Object.keys || function(e) {
            var t = [],
                r = Object.prototype.hasOwnProperty;
            for (var n in e) r.call(e, n) && t.push(n);
            return t
        },
        __toString_39 = {}.toString,
        _$isarray_39 = Array.isArray || function(e) {
            return "[object Array]" == __toString_39.call(e)
        },
        _$hasBinary_38 = {};
    (function(e) {
        var t = Object.prototype.toString,
            r = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === t.call(Blob),
            n = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === t.call(File);
        _$hasBinary_38 = function t(o) {
            if (!o || "object" != typeof o) return !1;
            if (_$isarray_39(o)) {
                for (var i = 0, s = o.length; i < s; i++)
                    if (t(o[i])) return !0;
                return !1
            }
            if ("function" == typeof e && e.isBuffer && e.isBuffer(o) || "function" == typeof ArrayBuffer && o instanceof ArrayBuffer || r && o instanceof Blob || n && o instanceof File) return !0;
            if (o.toJSON && "function" == typeof o.toJSON && 1 === arguments.length) return t(o.toJSON(), !0);
            for (var a in o)
                if (Object.prototype.hasOwnProperty.call(o, a) && t(o[a])) return !0;
            return !1
        }
    }).call(this, _$buffer_8({}).Buffer);
    var _$arraybufferSlice_2 = function(e, t, r) {
        var n = e.byteLength;
        if (t = t || 0, r = r || n, e.slice) return e.slice(t, r);
        if (t < 0 && (t += n), r < 0 && (r += n), r > n && (r = n), t >= n || t >= r || 0 === n) return new ArrayBuffer(0);
        for (var o = new Uint8Array(e), i = new Uint8Array(r - t), s = t, a = 0; s < r; s++, a++) i[a] = o[s];
        return i.buffer
    };

    function __noop_1() {}
    var _$after_1 = function(e, t, r) {
            var n = !1;
            return r = r || __noop_1, o.count = e, 0 === e ? t() : o;

            function o(e, i) {
                if (o.count <= 0) throw new Error("after called too many times");
                --o.count, e ? (n = !0, t(e), t = r) : 0 !== o.count || n || t(null, i)
            }
        },
        byteArray, byteCount, byteIndex, stringFromCharCode = String.fromCharCode;

    function ucs2decode(e) {
        for (var t, r, n = [], o = 0, i = e.length; o < i;)(t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i ? 56320 == (64512 & (r = e.charCodeAt(o++))) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), o--) : n.push(t);
        return n
    }

    function checkScalarValue(e, t) {
        if (e >= 55296 && e <= 57343) {
            if (t) throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value");
            return !1
        }
        return !0
    }

    function createByte(e, t) {
        return stringFromCharCode(e >> t & 63 | 128)
    }

    function encodeCodePoint(e, t) {
        if (0 == (4294967168 & e)) return stringFromCharCode(e);
        var r = "";
        return 0 == (4294965248 & e) ? r = stringFromCharCode(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (checkScalarValue(e, t) || (e = 65533), r = stringFromCharCode(e >> 12 & 15 | 224), r += createByte(e, 6)) : 0 == (4292870144 & e) && (r = stringFromCharCode(e >> 18 & 7 | 240), r += createByte(e, 12), r += createByte(e, 6)), r + stringFromCharCode(63 & e | 128)
    }

    function readContinuationByte() {
        if (byteIndex >= byteCount) throw Error("Invalid byte index");
        var e = 255 & byteArray[byteIndex];
        if (byteIndex++, 128 == (192 & e)) return 63 & e;
        throw Error("Invalid continuation byte")
    }

    function decodeSymbol(e) {
        var t, r;
        if (byteIndex > byteCount) throw Error("Invalid byte index");
        if (byteIndex == byteCount) return !1;
        if (t = 255 & byteArray[byteIndex], byteIndex++, 0 == (128 & t)) return t;
        if (192 == (224 & t)) {
            if ((r = (31 & t) << 6 | readContinuationByte()) >= 128) return r;
            throw Error("Invalid continuation byte")
        }
        if (224 == (240 & t)) {
            if ((r = (15 & t) << 12 | readContinuationByte() << 6 | readContinuationByte()) >= 2048) return checkScalarValue(r, e) ? r : 65533;
            throw Error("Invalid continuation byte")
        }
        if (240 == (248 & t) && (r = (7 & t) << 18 | readContinuationByte() << 12 | readContinuationByte() << 6 | readContinuationByte()) >= 65536 && r <= 1114111) return r;
        throw Error("Invalid UTF-8 detected")
    }
    var _$utf8_32 = {
            encode: function(e, t) {
                for (var r = !1 !== (t = t || {}).strict, n = ucs2decode(e), o = n.length, i = -1, s = ""; ++i < o;) s += encodeCodePoint(n[i], r);
                return s
            },
            decode: function(e, t) {
                var r = !1 !== (t = t || {}).strict;
                byteArray = ucs2decode(e), byteCount = byteArray.length, byteIndex = 0;
                for (var n, o = []; !1 !== (n = decodeSymbol(r));) o.push(n);
                return function(e) {
                    for (var t, r = e.length, n = -1, o = ""; ++n < r;)(t = e[n]) > 65535 && (o += stringFromCharCode((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), o += stringFromCharCode(t);
                    return o
                }(o)
            }
        },
        _$base64Arraybuffer_4 = {};
    ! function() {
        "use strict";
        for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = new Uint8Array(256), r = 0; r < e.length; r++) t[e.charCodeAt(r)] = r;
        _$base64Arraybuffer_4.encode = function(t) {
            var r, n = new Uint8Array(t),
                o = n.length,
                i = "";
            for (r = 0; r < o; r += 3) i += e[n[r] >> 2], i += e[(3 & n[r]) << 4 | n[r + 1] >> 4], i += e[(15 & n[r + 1]) << 2 | n[r + 2] >> 6], i += e[63 & n[r + 2]];
            return o % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="), i
        }, _$base64Arraybuffer_4.decode = function(e) {
            var r, n, o, i, s, a = .75 * e.length,
                l = e.length,
                u = 0;
            "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
            var c = new ArrayBuffer(a),
                p = new Uint8Array(c);
            for (r = 0; r < l; r += 4) n = t[e.charCodeAt(r)], o = t[e.charCodeAt(r + 1)], i = t[e.charCodeAt(r + 2)], s = t[e.charCodeAt(r + 3)], p[u++] = n << 2 | o >> 4, p[u++] = (15 & o) << 4 | i >> 2, p[u++] = (3 & i) << 6 | 63 & s;
            return c
        }
    }();
    var _$blob_6 = {},
        BlobBuilder = void 0 !== BlobBuilder ? BlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder,
        blobSupported = function() {
            try {
                return 2 === new Blob(["hi"]).size
            } catch (e) {
                return !1
            }
        }(),
        blobSupportsArrayBufferView = blobSupported && function() {
            try {
                return 2 === new Blob([new Uint8Array([1, 2])]).size
            } catch (e) {
                return !1
            }
        }(),
        blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;

    function mapArrayBufferViews(e) {
        return e.map(function(e) {
            if (e.buffer instanceof ArrayBuffer) {
                var t = e.buffer;
                if (e.byteLength !== t.byteLength) {
                    var r = new Uint8Array(e.byteLength);
                    r.set(new Uint8Array(t, e.byteOffset, e.byteLength)), t = r.buffer
                }
                return t
            }
            return e
        })
    }

    function BlobBuilderConstructor(e, t) {
        t = t || {};
        var r = new BlobBuilder;
        return mapArrayBufferViews(e).forEach(function(e) {
            r.append(e)
        }), t.type ? r.getBlob(t.type) : r.getBlob()
    }

    function BlobConstructor(e, t) {
        return new Blob(mapArrayBufferViews(e), t || {})
    }
    "undefined" != typeof Blob && (BlobBuilderConstructor.prototype = Blob.prototype, BlobConstructor.prototype = Blob.prototype), _$blob_6 = blobSupported ? blobSupportsArrayBufferView ? Blob : BlobConstructor : blobBuilderSupported ? BlobBuilderConstructor : void 0;
    var _$browser_30 = {},
        base64encoder;
    "undefined" != typeof ArrayBuffer && (base64encoder = _$base64Arraybuffer_4);
    var isAndroid = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
        isPhantomJS = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
        dontSendBlobs = isAndroid || isPhantomJS;
    _$browser_30.protocol = 3;
    var packets = _$browser_30.packets = {
            open: 0,
            close: 1,
            ping: 2,
            pong: 3,
            message: 4,
            upgrade: 5,
            noop: 6
        },
        packetslist = _$keys_31(packets),
        err = {
            type: "error",
            data: "parser error"
        };

    function map(e, t, r) {
        for (var n = new Array(e.length), o = _$after_1(e.length, r), i = function(e, r, o) {
                t(r, function(t, r) {
                    n[e] = r, o(t, n)
                })
            }, s = 0; s < e.length; s++) i(s, e[s], o)
    }
    _$browser_30.encodePacket = function(e, t, r, n) {
        "function" == typeof t && (n = t, t = !1), "function" == typeof r && (n = r, r = null);
        var o = void 0 === e.data ? void 0 : e.data.buffer || e.data;
        if ("undefined" != typeof ArrayBuffer && o instanceof ArrayBuffer) return function(e, t, r) {
            if (!t) return _$browser_30.encodeBase64Packet(e, r);
            var n = e.data,
                o = new Uint8Array(n),
                i = new Uint8Array(1 + n.byteLength);
            i[0] = packets[e.type];
            for (var s = 0; s < o.length; s++) i[s + 1] = o[s];
            return r(i.buffer)
        }(e, t, n);
        if (void 0 !== _$blob_6 && o instanceof _$blob_6) return function(e, t, r) {
            if (!t) return _$browser_30.encodeBase64Packet(e, r);
            if (dontSendBlobs) return function(e, t, r) {
                if (!t) return _$browser_30.encodeBase64Packet(e, r);
                var n = new FileReader;
                return n.onload = function() {
                    _$browser_30.encodePacket({
                        type: e.type,
                        data: n.result
                    }, t, !0, r)
                }, n.readAsArrayBuffer(e.data)
            }(e, t, r);
            var n = new Uint8Array(1);
            return n[0] = packets[e.type], r(new _$blob_6([n.buffer, e.data]))
        }(e, t, n);
        if (o && o.base64) return function(e, t) {
            return t("b" + _$browser_30.packets[e.type] + e.data.data)
        }(e, n);
        var i = packets[e.type];
        return void 0 !== e.data && (i += r ? _$utf8_32.encode(String(e.data), {
            strict: !1
        }) : String(e.data)), n("" + i)
    }, _$browser_30.encodeBase64Packet = function(t, r) {
        var n, o = "b" + _$browser_30.packets[t.type];
        if (void 0 !== _$blob_6 && t.data instanceof _$blob_6) {
            var i = new FileReader;
            return i.onload = function() {
                var e = i.result.split(",")[1];
                r(o + e)
            }, i.readAsDataURL(t.data)
        }
        try {
            n = String.fromCharCode.apply(null, new Uint8Array(t.data))
        } catch (e) {
            for (var s = new Uint8Array(t.data), a = new Array(s.length), l = 0; l < s.length; l++) a[l] = s[l];
            n = String.fromCharCode.apply(null, a)
        }
        return o += btoa(n), r(o)
    }, _$browser_30.decodePacket = function(t, r, n) {
        if (void 0 === t) return err;
        if ("string" == typeof t) {
            if ("b" === t.charAt(0)) return _$browser_30.decodeBase64Packet(t.substr(1), r);
            if (n && !1 === (t = function(t) {
                    try {
                        t = _$utf8_32.decode(t, {
                            strict: !1
                        })
                    } catch (e) {
                        return !1
                    }
                    return t
                }(t))) return err;
            var o = t.charAt(0);
            return Number(o) == o && packetslist[o] ? t.length > 1 ? {
                type: packetslist[o],
                data: t.substring(1)
            } : {
                type: packetslist[o]
            } : err
        }
        o = new Uint8Array(t)[0];
        var i = _$arraybufferSlice_2(t, 1);
        return _$blob_6 && "blob" === r && (i = new _$blob_6([i])), {
            type: packetslist[o],
            data: i
        }
    }, _$browser_30.decodeBase64Packet = function(e, t) {
        var r = packetslist[e.charAt(0)];
        if (!base64encoder) return {
            type: r,
            data: {
                base64: !0,
                data: e.substr(1)
            }
        };
        var n = base64encoder.decode(e.substr(1));
        return "blob" === t && _$blob_6 && (n = new _$blob_6([n])), {
            type: r,
            data: n
        }
    }, _$browser_30.encodePayload = function(e, t, r) {
        "function" == typeof t && (r = t, t = null);
        var n = _$hasBinary_38(e);
        return t && n ? _$blob_6 && !dontSendBlobs ? _$browser_30.encodePayloadAsBlob(e, r) : _$browser_30.encodePayloadAsArrayBuffer(e, r) : e.length ? void map(e, function(e, r) {
            _$browser_30.encodePacket(e, !!n && t, !1, function(e) {
                r(null, function(e) {
                    return e.length + ":" + e
                }(e))
            })
        }, function(e, t) {
            return r(t.join(""))
        }) : r("0:")
    }, _$browser_30.decodePayload = function(e, t, r) {
        if ("string" != typeof e) return _$browser_30.decodePayloadAsBinary(e, t, r);
        var n;
        if ("function" == typeof t && (r = t, t = null), "" === e) return r(err, 0, 1);
        for (var o, i, s = "", a = 0, l = e.length; a < l; a++) {
            var u = e.charAt(a);
            if (":" === u) {
                if ("" === s || s != (o = Number(s))) return r(err, 0, 1);
                if (s != (i = e.substr(a + 1, o)).length) return r(err, 0, 1);
                if (i.length) {
                    if (n = _$browser_30.decodePacket(i, t, !1), err.type === n.type && err.data === n.data) return r(err, 0, 1);
                    if (!1 === r(n, a + o, l)) return
                }
                a += o, s = ""
            } else s += u
        }
        return "" !== s ? r(err, 0, 1) : void 0
    }, _$browser_30.encodePayloadAsArrayBuffer = function(e, t) {
        if (!e.length) return t(new ArrayBuffer(0));
        map(e, function(e, t) {
            _$browser_30.encodePacket(e, !0, !0, function(e) {
                return t(null, e)
            })
        }, function(e, r) {
            var n = r.reduce(function(e, t) {
                    var r;
                    return e + (r = "string" == typeof t ? t.length : t.byteLength).toString().length + r + 2
                }, 0),
                o = new Uint8Array(n),
                i = 0;
            return r.forEach(function(e) {
                var t = "string" == typeof e,
                    r = e;
                if (t) {
                    for (var n = new Uint8Array(e.length), s = 0; s < e.length; s++) n[s] = e.charCodeAt(s);
                    r = n.buffer
                }
                o[i++] = t ? 0 : 1;
                var a = r.byteLength.toString();
                for (s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
                for (o[i++] = 255, n = new Uint8Array(r), s = 0; s < n.length; s++) o[i++] = n[s]
            }), t(o.buffer)
        })
    }, _$browser_30.encodePayloadAsBlob = function(e, t) {
        map(e, function(e, t) {
            _$browser_30.encodePacket(e, !0, !0, function(e) {
                var r = new Uint8Array(1);
                if (r[0] = 1, "string" == typeof e) {
                    for (var n = new Uint8Array(e.length), o = 0; o < e.length; o++) n[o] = e.charCodeAt(o);
                    e = n.buffer, r[0] = 0
                }
                var i = (e instanceof ArrayBuffer ? e.byteLength : e.size).toString(),
                    s = new Uint8Array(i.length + 1);
                for (o = 0; o < i.length; o++) s[o] = parseInt(i[o]);
                if (s[i.length] = 255, _$blob_6) {
                    var a = new _$blob_6([r.buffer, s.buffer, e]);
                    t(null, a)
                }
            })
        }, function(e, r) {
            return t(new _$blob_6(r))
        })
    }, _$browser_30.decodePayloadAsBinary = function(t, r, n) {
        "function" == typeof r && (n = r, r = null);
        for (var o = t, i = []; o.byteLength > 0;) {
            for (var s = new Uint8Array(o), a = 0 === s[0], l = "", u = 1; 255 !== s[u]; u++) {
                if (l.length > 310) return n(err, 0, 1);
                l += s[u]
            }
            o = _$arraybufferSlice_2(o, 2 + l.length), l = parseInt(l);
            var c = _$arraybufferSlice_2(o, 0, l);
            if (a) try {
                c = String.fromCharCode.apply(null, new Uint8Array(c))
            } catch (e) {
                var p = new Uint8Array(c);
                for (c = "", u = 0; u < p.length; u++) c += String.fromCharCode(p[u])
            }
            i.push(c), o = _$arraybufferSlice_2(o, l)
        }
        var d = i.length;
        i.forEach(function(e, t) {
            n(_$browser_30.decodePacket(e, r, !0), t, d)
        })
    };
    var _$transport_19 = {};

    function Transport(e) {
        this.path = e.path, this.hostname = e.hostname, this.port = e.port, this.secure = e.secure, this.query = e.query, this.timestampParam = e.timestampParam, this.timestampRequests = e.timestampRequests, this.readyState = "", this.agent = e.agent || !1, this.socket = e.socket, this.enablesXDR = e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.forceNode = e.forceNode, this.isReactNative = e.isReactNative, this.extraHeaders = e.extraHeaders, this.localAddress = e.localAddress
    }
    _$transport_19 = Transport, _$componentEmitter_26(Transport.prototype), Transport.prototype.onError = function(e, t) {
        var r = new Error(e);
        return r.type = "TransportError", r.description = t, this.emit("error", r), this
    }, Transport.prototype.open = function() {
        return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this
    }, Transport.prototype.close = function() {
        return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
    }, Transport.prototype.send = function(e) {
        if ("open" !== this.readyState) throw new Error("Transport not open");
        this.write(e)
    }, Transport.prototype.onOpen = function() {
        this.readyState = "open", this.writable = !0, this.emit("open")
    }, Transport.prototype.onData = function(e) {
        var t = _$browser_30.decodePacket(e, this.socket.binaryType);
        this.onPacket(t)
    }, Transport.prototype.onPacket = function(e) {
        this.emit("packet", e)
    }, Transport.prototype.onClose = function() {
        this.readyState = "closed", this.emit("close")
    };
    var _$hasCors_40 = {};
    try {
        _$hasCors_40 = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
    } catch (err) {
        _$hasCors_40 = !1
    }
    var _$xmlhttprequest_25 = function(t) {
            var r = t.xdomain,
                n = t.xscheme,
                o = t.enablesXDR;
            try {
                if ("undefined" != typeof XMLHttpRequest && (!r || _$hasCors_40)) return new XMLHttpRequest
            } catch (e) {}
            try {
                if ("undefined" != typeof XDomainRequest && !n && o) return new XDomainRequest
            } catch (e) {}
            if (!r) try {
                return new(self[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
            } catch (e) {}
        },
        _$componentInherit_12 = function(e, t) {
            var r = function() {};
            r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
        },
        _$yeast_79 = {},
        prev, alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
        length = 64,
        __map_79 = {},
        seed = 0,
        __i_79 = 0;

    function encode(e) {
        var t = "";
        do {
            t = alphabet[e % length] + t, e = Math.floor(e / length)
        } while (e > 0);
        return t
    }

    function yeast() {
        var e = encode(+new Date);
        return e !== prev ? (seed = 0, prev = e) : e + "." + encode(seed++)
    }
    for (; __i_79 < length; __i_79++) __map_79[alphabet[__i_79]] = __i_79;
    yeast.encode = encode, yeast.decode = function(e) {
        var t = 0;
        for (__i_79 = 0; __i_79 < e.length; __i_79++) t = t * length + __map_79[e.charAt(__i_79)];
        return t
    }, _$yeast_79 = yeast;
    var __debug_23 = _$browser_27("engine.io-client:polling"),
        _$Polling_23 = Polling,
        hasXHR2 = null != new _$xmlhttprequest_25({
            xdomain: !1
        }).responseType;

    function Polling(e) {
        var t = e && e.forceBase64;
        hasXHR2 && !t || (this.supportsBinary = !1), _$transport_19.call(this, e)
    }
    _$componentInherit_12(Polling, _$transport_19), Polling.prototype.name = "polling", Polling.prototype.doOpen = function() {
        this.poll()
    }, Polling.prototype.pause = function(e) {
        var t = this;

        function r() {
            __debug_23("paused"), t.readyState = "paused", e()
        }
        if (this.readyState = "pausing", this.polling || !this.writable) {
            var n = 0;
            this.polling && (__debug_23("we are currently polling - waiting to pause"), n++, this.once("pollComplete", function() {
                __debug_23("pre-pause polling complete"), --n || r()
            })), this.writable || (__debug_23("we are currently writing - waiting to pause"), n++, this.once("drain", function() {
                __debug_23("pre-pause writing complete"), --n || r()
            }))
        } else r()
    }, Polling.prototype.poll = function() {
        __debug_23("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
    }, Polling.prototype.onData = function(e) {
        var t = this;
        __debug_23("polling got data %s", e), _$browser_30.decodePayload(e, this.socket.binaryType, function(e, r, n) {
            if ("opening" === t.readyState && t.onOpen(), "close" === e.type) return t.onClose(), !1;
            t.onPacket(e)
        }), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState ? this.poll() : __debug_23('ignoring poll - transport state "%s"', this.readyState))
    }, Polling.prototype.doClose = function() {
        var e = this;

        function t() {
            __debug_23("writing close packet"), e.write([{
                type: "close"
            }])
        }
        "open" === this.readyState ? (__debug_23("transport open - closing"), t()) : (__debug_23("transport not open - deferring close"), this.once("open", t))
    }, Polling.prototype.write = function(e) {
        var t = this;
        this.writable = !1;
        var r = function() {
            t.writable = !0, t.emit("drain")
        };
        _$browser_30.encodePayload(e, this.supportsBinary, function(e) {
            t.doWrite(e, r)
        })
    }, Polling.prototype.uri = function() {
        var e = this.query || {},
            t = this.secure ? "https" : "http",
            r = "";
        return !1 !== this.timestampRequests && (e[this.timestampParam] = _$yeast_79()), this.supportsBinary || e.sid || (e.b64 = 1), e = _$parseqs_50.encode(e), this.port && ("https" === t && 443 !== Number(this.port) || "http" === t && 80 !== Number(this.port)) && (r = ":" + this.port), e.length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e
    };
    var _$pollingXhr_22 = {},
        __debug_22 = _$browser_27("engine.io-client:polling-xhr");

    function empty() {}

    function XHR(e) {
        if (_$Polling_23.call(this, e), this.requestTimeout = e.requestTimeout, this.extraHeaders = e.extraHeaders, "undefined" != typeof location) {
            var t = "https:" === location.protocol,
                r = location.port;
            r || (r = t ? 443 : 80), this.xd = "undefined" != typeof location && e.hostname !== location.hostname || r !== e.port, this.xs = e.secure !== t
        }
    }

    function Request(e) {
        this.method = e.method || "GET", this.uri = e.uri, this.xd = !!e.xd, this.xs = !!e.xs, this.async = !1 !== e.async, this.data = void 0 !== e.data ? e.data : null, this.agent = e.agent, this.isBinary = e.isBinary, this.supportsBinary = e.supportsBinary, this.enablesXDR = e.enablesXDR, this.requestTimeout = e.requestTimeout, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.extraHeaders = e.extraHeaders, this.create()
    }
    if (_$pollingXhr_22 = XHR, _$pollingXhr_22.Request = Request, _$componentInherit_12(XHR, _$Polling_23), XHR.prototype.supportsBinary = !0, XHR.prototype.request = function(e) {
            return (e = e || {}).uri = this.uri(), e.xd = this.xd, e.xs = this.xs, e.agent = this.agent || !1, e.supportsBinary = this.supportsBinary, e.enablesXDR = this.enablesXDR, e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, e.requestTimeout = this.requestTimeout, e.extraHeaders = this.extraHeaders, new Request(e)
        }, XHR.prototype.doWrite = function(e, t) {
            var r = "string" != typeof e && void 0 !== e,
                n = this.request({
                    method: "POST",
                    data: e,
                    isBinary: r
                }),
                o = this;
            n.on("success", t), n.on("error", function(e) {
                o.onError("xhr post error", e)
            }), this.sendXhr = n
        }, XHR.prototype.doPoll = function() {
            __debug_22("xhr poll");
            var e = this.request(),
                t = this;
            e.on("data", function(e) {
                t.onData(e)
            }), e.on("error", function(e) {
                t.onError("xhr poll error", e)
            }), this.pollXhr = e
        }, _$componentEmitter_26(Request.prototype), Request.prototype.create = function() {
            var t = {
                agent: this.agent,
                xdomain: this.xd,
                xscheme: this.xs,
                enablesXDR: this.enablesXDR
            };
            t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized;
            var r = this.xhr = new _$xmlhttprequest_25(t),
                n = this;
            try {
                __debug_22("xhr open %s: %s", this.method, this.uri), r.open(this.method, this.uri, this.async);
                try {
                    if (this.extraHeaders)
                        for (var o in r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0), this.extraHeaders) this.extraHeaders.hasOwnProperty(o) && r.setRequestHeader(o, this.extraHeaders[o])
                } catch (e) {}
                if ("POST" === this.method) try {
                    this.isBinary ? r.setRequestHeader("Content-type", "application/octet-stream") : r.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                } catch (e) {}
                try {
                    r.setRequestHeader("Accept", "*/*")
                } catch (e) {}
                "withCredentials" in r && (r.withCredentials = !0), this.requestTimeout && (r.timeout = this.requestTimeout), this.hasXDR() ? (r.onload = function() {
                    n.onLoad()
                }, r.onerror = function() {
                    n.onError(r.responseText)
                }) : r.onreadystatechange = function() {
                    if (2 === r.readyState) try {
                        var t = r.getResponseHeader("Content-Type");
                        n.supportsBinary && "application/octet-stream" === t && (r.responseType = "arraybuffer")
                    } catch (e) {}
                    4 === r.readyState && (200 === r.status || 1223 === r.status ? n.onLoad() : setTimeout(function() {
                        n.onError(r.status)
                    }, 0))
                }, __debug_22("xhr data %s", this.data), r.send(this.data)
            } catch (e) {
                return void setTimeout(function() {
                    n.onError(e)
                }, 0)
            }
            "undefined" != typeof document && (this.index = Request.requestsCount++, Request.requests[this.index] = this)
        }, Request.prototype.onSuccess = function() {
            this.emit("success"), this.cleanup()
        }, Request.prototype.onData = function(e) {
            this.emit("data", e), this.onSuccess()
        }, Request.prototype.onError = function(e) {
            this.emit("error", e), this.cleanup(!0)
        }, Request.prototype.cleanup = function(t) {
            if (void 0 !== this.xhr && null !== this.xhr) {
                if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = empty : this.xhr.onreadystatechange = empty, t) try {
                    this.xhr.abort()
                } catch (e) {}
                "undefined" != typeof document && delete Request.requests[this.index], this.xhr = null
            }
        }, Request.prototype.onLoad = function() {
            var t;
            try {
                var r;
                try {
                    r = this.xhr.getResponseHeader("Content-Type")
                } catch (e) {}
                t = "application/octet-stream" === r && this.xhr.response || this.xhr.responseText
            } catch (e) {
                this.onError(e)
            }
            null != t && this.onData(t)
        }, Request.prototype.hasXDR = function() {
            return "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR
        }, Request.prototype.abort = function() {
            this.cleanup()
        }, Request.requestsCount = 0, Request.requests = {}, "undefined" != typeof document)
        if ("function" == typeof attachEvent) attachEvent("onunload", unloadHandler);
        else if ("function" == typeof addEventListener) {
        var terminationEvent = "onpagehide" in self ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, !1)
    }

    function unloadHandler() {
        for (var e in Request.requests) Request.requests.hasOwnProperty(e) && Request.requests[e].abort()
    }
    var _$JSONPPolling_21 = {};
    (function(t) {
        _$JSONPPolling_21 = a;
        var r, n = /\n/g,
            o = /\\n/g;

        function i() {}

        function s() {
            return "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== t ? t : {}
        }

        function a(e) {
            if (_$Polling_23.call(this, e), this.query = this.query || {}, !r) {
                var t = s();
                r = t.___eio = t.___eio || []
            }
            this.index = r.length;
            var n = this;
            r.push(function(e) {
                n.onData(e)
            }), this.query.j = this.index, "function" == typeof addEventListener && addEventListener("beforeunload", function() {
                n.script && (n.script.onerror = i)
            }, !1)
        }
        _$componentInherit_12(a, _$Polling_23), a.prototype.supportsBinary = !1, a.prototype.doClose = function() {
            this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), _$Polling_23.prototype.doClose.call(this)
        }, a.prototype.doPoll = function() {
            var e = this,
                t = document.createElement("script");
            this.script && (this.script.parentNode.removeChild(this.script), this.script = null), t.async = !0, t.src = this.uri(), t.onerror = function(t) {
                e.onError("jsonp poll error", t)
            };
            var r = document.getElementsByTagName("script")[0];
            r ? r.parentNode.insertBefore(t, r) : (document.head || document.body).appendChild(t), this.script = t, "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
                var e = document.createElement("iframe");
                document.body.appendChild(e), document.body.removeChild(e)
            }, 100)
        }, a.prototype.doWrite = function(t, r) {
            var i = this;
            if (!this.form) {
                var s, a = document.createElement("form"),
                    l = document.createElement("textarea"),
                    u = this.iframeId = "eio_iframe_" + this.index;
                a.className = "socketio", a.style.position = "absolute", a.style.top = "-1000px", a.style.left = "-1000px", a.target = u, a.method = "POST", a.setAttribute("accept-charset", "utf-8"), l.name = "d", a.appendChild(l), document.body.appendChild(a), this.form = a, this.area = l
            }

            function c() {
                p(), r()
            }

            function p() {
                if (i.iframe) try {
                    i.form.removeChild(i.iframe)
                } catch (e) {
                    i.onError("jsonp polling iframe removal error", e)
                }
                try {
                    var t = '<iframe src="javascript:0" name="' + i.iframeId + '">';
                    s = document.createElement(t)
                } catch (e) {
                    (s = document.createElement("iframe")).name = i.iframeId, s.src = "javascript:0"
                }
                s.id = i.iframeId, i.form.appendChild(s), i.iframe = s
            }
            this.form.action = this.uri(), p(), t = t.replace(o, "\\\n"), this.area.value = t.replace(n, "\\n");
            try {
                this.form.submit()
            } catch (e) {}
            this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                "complete" === i.iframe.readyState && c()
            } : this.iframe.onload = c
        }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    var _$websocket_24 = {};
    (function(t) {
        var r, n, o = _$browser_27("engine.io-client:websocket");
        if ("undefined" != typeof WebSocket) r = WebSocket;
        else if ("undefined" != typeof self) r = self.WebSocket || self.MozWebSocket;
        else try {
            n = _$empty_7({})
        } catch (e) {}
        var i = r || n;

        function s(e) {
            e && e.forceBase64 && (this.supportsBinary = !1), this.perMessageDeflate = e.perMessageDeflate, this.usingBrowserWebSocket = r && !e.forceNode, this.protocols = e.protocols, this.usingBrowserWebSocket || (i = n), _$transport_19.call(this, e)
        }
        _$websocket_24 = s, _$componentInherit_12(s, _$transport_19), s.prototype.name = "websocket", s.prototype.supportsBinary = !0, s.prototype.doOpen = function() {
            if (this.check()) {
                var e = this.uri(),
                    t = this.protocols,
                    r = {
                        agent: this.agent,
                        perMessageDeflate: this.perMessageDeflate
                    };
                r.pfx = this.pfx, r.key = this.key, r.passphrase = this.passphrase, r.cert = this.cert, r.ca = this.ca, r.ciphers = this.ciphers, r.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (r.headers = this.extraHeaders), this.localAddress && (r.localAddress = this.localAddress);
                try {
                    this.ws = this.usingBrowserWebSocket && !this.isReactNative ? t ? new i(e, t) : new i(e) : new i(e, t, r)
                } catch (err) {
                    return this.emit("error", err)
                }
                void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners()
            }
        }, s.prototype.addEventListeners = function() {
            var e = this;
            this.ws.onopen = function() {
                e.onOpen()
            }, this.ws.onclose = function() {
                e.onClose()
            }, this.ws.onmessage = function(t) {
                e.onData(t.data)
            }, this.ws.onerror = function(t) {
                e.onError("websocket error", t)
            }
        }, s.prototype.write = function(r) {
            var n = this;
            this.writable = !1;
            for (var i = r.length, s = 0, a = i; s < a; s++) ! function(r) {
                _$browser_30.encodePacket(r, n.supportsBinary, function(s) {
                    if (!n.usingBrowserWebSocket) {
                        var a = {};
                        r.options && (a.compress = r.options.compress), n.perMessageDeflate && ("string" == typeof s ? t.byteLength(s) : s.length) < n.perMessageDeflate.threshold && (a.compress = !1)
                    }
                    try {
                        n.usingBrowserWebSocket ? n.ws.send(s) : n.ws.send(s, a)
                    } catch (e) {
                        o("websocket closed before onclose event")
                    }--i || (n.emit("flush"), setTimeout(function() {
                        n.writable = !0, n.emit("drain")
                    }, 0))
                })
            }(r[s])
        }, s.prototype.onClose = function() {
            _$transport_19.prototype.onClose.call(this)
        }, s.prototype.doClose = function() {
            void 0 !== this.ws && this.ws.close()
        }, s.prototype.uri = function() {
            var e = this.query || {},
                t = this.secure ? "wss" : "ws",
                r = "";
            return this.port && ("wss" === t && 443 !== Number(this.port) || "ws" === t && 80 !== Number(this.port)) && (r = ":" + this.port), this.timestampRequests && (e[this.timestampParam] = _$yeast_79()), this.supportsBinary || (e.b64 = 1), (e = _$parseqs_50.encode(e)).length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e
        }, s.prototype.check = function() {
            return !(!i || "__initialize" in i && this.name === s.prototype.name)
        }
    }).call(this, _$buffer_8({}).Buffer);
    var _$transports_20 = {
        polling: function(e) {
            var t = !1,
                r = !1,
                n = !1 !== e.jsonp;
            if ("undefined" != typeof location) {
                var o = "https:" === location.protocol,
                    i = location.port;
                i || (i = o ? 443 : 80), t = e.hostname !== location.hostname || i !== e.port, r = e.secure !== o
            }
            if (e.xdomain = t, e.xscheme = r, "open" in new _$xmlhttprequest_25(e) && !e.forceJSONP) return new _$pollingXhr_22(e);
            if (!n) throw new Error("JSONP disabled");
            return new _$JSONPPolling_21(e)
        }
    };
    _$transports_20.websocket = _$websocket_24;
    var _$socket_18 = {},
        __debug_18 = _$browser_27("engine.io-client:socket");

    function __Socket_18(e, t) {
        if (!(this instanceof __Socket_18)) return new __Socket_18(e, t);
        t = t || {}, e && "object" == typeof e && (t = e, e = null), e ? (e = _$parseuri_51(e), t.hostname = e.host, t.secure = "https" === e.protocol || "wss" === e.protocol, t.port = e.port, e.query && (t.query = e.query)) : t.host && (t.hostname = _$parseuri_51(t.host).host), this.secure = null != t.secure ? t.secure : "undefined" != typeof location && "https:" === location.protocol, t.hostname && !t.port && (t.port = this.secure ? "443" : "80"), this.agent = t.agent || !1, this.hostname = t.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), this.port = t.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80), this.query = t.query || {}, "string" == typeof this.query && (this.query = _$parseqs_50.decode(this.query)), this.upgrade = !1 !== t.upgrade, this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!t.forceJSONP, this.jsonp = !1 !== t.jsonp, this.forceBase64 = !!t.forceBase64, this.enablesXDR = !!t.enablesXDR, this.timestampParam = t.timestampParam || "t", this.timestampRequests = t.timestampRequests, this.transports = t.transports || ["polling", "websocket"], this.transportOptions = t.transportOptions || {}, this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = t.policyPort || 843, this.rememberUpgrade = t.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = t.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== t.perMessageDeflate && (t.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = t.pfx || null, this.key = t.key || null, this.passphrase = t.passphrase || null, this.cert = t.cert || null, this.ca = t.ca || null, this.ciphers = t.ciphers || null, this.rejectUnauthorized = void 0 === t.rejectUnauthorized || t.rejectUnauthorized, this.forceNode = !!t.forceNode, this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(), ("undefined" == typeof self || this.isReactNative) && (t.extraHeaders && Object.keys(t.extraHeaders).length > 0 && (this.extraHeaders = t.extraHeaders), t.localAddress && (this.localAddress = t.localAddress)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, this.open()
    }
    _$socket_18 = __Socket_18, __Socket_18.priorWebsocketSuccess = !1, _$componentEmitter_26(__Socket_18.prototype), __Socket_18.protocol = _$browser_30.protocol, __Socket_18.Socket = __Socket_18, __Socket_18.Transport = _$transport_19, __Socket_18.transports = _$transports_20, __Socket_18.parser = _$browser_30, __Socket_18.prototype.createTransport = function(e) {
        __debug_18('creating transport "%s"', e);
        var t = function(e) {
            var t = {};
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
            return t
        }(this.query);
        t.EIO = _$browser_30.protocol, t.transport = e;
        var r = this.transportOptions[e] || {};
        return this.id && (t.sid = this.id), new _$transports_20[e]({
            query: t,
            socket: this,
            agent: r.agent || this.agent,
            hostname: r.hostname || this.hostname,
            port: r.port || this.port,
            secure: r.secure || this.secure,
            path: r.path || this.path,
            forceJSONP: r.forceJSONP || this.forceJSONP,
            jsonp: r.jsonp || this.jsonp,
            forceBase64: r.forceBase64 || this.forceBase64,
            enablesXDR: r.enablesXDR || this.enablesXDR,
            timestampRequests: r.timestampRequests || this.timestampRequests,
            timestampParam: r.timestampParam || this.timestampParam,
            policyPort: r.policyPort || this.policyPort,
            pfx: r.pfx || this.pfx,
            key: r.key || this.key,
            passphrase: r.passphrase || this.passphrase,
            cert: r.cert || this.cert,
            ca: r.ca || this.ca,
            ciphers: r.ciphers || this.ciphers,
            rejectUnauthorized: r.rejectUnauthorized || this.rejectUnauthorized,
            perMessageDeflate: r.perMessageDeflate || this.perMessageDeflate,
            extraHeaders: r.extraHeaders || this.extraHeaders,
            forceNode: r.forceNode || this.forceNode,
            localAddress: r.localAddress || this.localAddress,
            requestTimeout: r.requestTimeout || this.requestTimeout,
            protocols: r.protocols || void 0,
            isReactNative: this.isReactNative
        })
    }, __Socket_18.prototype.open = function() {
        var t;
        if (this.rememberUpgrade && __Socket_18.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t = "websocket";
        else {
            if (0 === this.transports.length) {
                var r = this;
                return void setTimeout(function() {
                    r.emit("error", "No transports available")
                }, 0)
            }
            t = this.transports[0]
        }
        this.readyState = "opening";
        try {
            t = this.createTransport(t)
        } catch (e) {
            return this.transports.shift(), void this.open()
        }
        t.open(), this.setTransport(t)
    }, __Socket_18.prototype.setTransport = function(e) {
        __debug_18("setting transport %s", e.name);
        var t = this;
        this.transport && (__debug_18("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = e, e.on("drain", function() {
            t.onDrain()
        }).on("packet", function(e) {
            t.onPacket(e)
        }).on("error", function(e) {
            t.onError(e)
        }).on("close", function() {
            t.onClose("transport close")
        })
    }, __Socket_18.prototype.probe = function(e) {
        __debug_18('probing transport "%s"', e);
        var t = this.createTransport(e, {
                probe: 1
            }),
            r = !1,
            n = this;

        function o() {
            if (n.onlyBinaryUpgrades) {
                var o = !this.supportsBinary && n.transport.supportsBinary;
                r = r || o
            }
            r || (__debug_18('probe transport "%s" opened', e), t.send([{
                type: "ping",
                data: "probe"
            }]), t.once("packet", function(o) {
                if (!r)
                    if ("pong" === o.type && "probe" === o.data) {
                        if (__debug_18('probe transport "%s" pong', e), n.upgrading = !0, n.emit("upgrading", t), !t) return;
                        __Socket_18.priorWebsocketSuccess = "websocket" === t.name, __debug_18('pausing current transport "%s"', n.transport.name), n.transport.pause(function() {
                            r || "closed" !== n.readyState && (__debug_18("changing transport and sending upgrade packet"), c(), n.setTransport(t), t.send([{
                                type: "upgrade"
                            }]), n.emit("upgrade", t), t = null, n.upgrading = !1, n.flush())
                        })
                    } else {
                        __debug_18('probe transport "%s" failed', e);
                        var i = new Error("probe error");
                        i.transport = t.name, n.emit("upgradeError", i)
                    }
            }))
        }

        function i() {
            r || (r = !0, c(), t.close(), t = null)
        }

        function s(r) {
            var o = new Error("probe error: " + r);
            o.transport = t.name, i(), __debug_18('probe transport "%s" failed because of error: %s', e, r), n.emit("upgradeError", o)
        }

        function a() {
            s("transport closed")
        }

        function l() {
            s("socket closed")
        }

        function u(e) {
            t && e.name !== t.name && (__debug_18('"%s" works - aborting "%s"', e.name, t.name), i())
        }

        function c() {
            t.removeListener("open", o), t.removeListener("error", s), t.removeListener("close", a), n.removeListener("close", l), n.removeListener("upgrading", u)
        }
        __Socket_18.priorWebsocketSuccess = !1, t.once("open", o), t.once("error", s), t.once("close", a), this.once("close", l), this.once("upgrading", u), t.open()
    }, __Socket_18.prototype.onOpen = function() {
        if (__debug_18("socket open"), this.readyState = "open", __Socket_18.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
            __debug_18("starting upgrade probes");
            for (var e = 0, t = this.upgrades.length; e < t; e++) this.probe(this.upgrades[e])
        }
    }, __Socket_18.prototype.onPacket = function(e) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (__debug_18('socket receive: type "%s", data "%s"', e.type, e.data), this.emit("packet", e), this.emit("heartbeat"), e.type) {
            case "open":
                this.onHandshake(JSON.parse(e.data));
                break;
            case "pong":
                this.setPing(), this.emit("pong");
                break;
            case "error":
                var t = new Error("server error");
                t.code = e.data, this.onError(t);
                break;
            case "message":
                this.emit("data", e.data), this.emit("message", e.data)
        } else __debug_18('packet received with socket readyState "%s"', this.readyState)
    }, __Socket_18.prototype.onHandshake = function(e) {
        this.emit("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
    }, __Socket_18.prototype.onHeartbeat = function(e) {
        clearTimeout(this.pingTimeoutTimer);
        var t = this;
        t.pingTimeoutTimer = setTimeout(function() {
            "closed" !== t.readyState && t.onClose("ping timeout")
        }, e || t.pingInterval + t.pingTimeout)
    }, __Socket_18.prototype.setPing = function() {
        var e = this;
        clearTimeout(e.pingIntervalTimer), e.pingIntervalTimer = setTimeout(function() {
            __debug_18("writing ping packet - expecting pong within %sms", e.pingTimeout), e.ping(), e.onHeartbeat(e.pingTimeout)
        }, e.pingInterval)
    }, __Socket_18.prototype.ping = function() {
        var e = this;
        this.sendPacket("ping", function() {
            e.emit("ping")
        })
    }, __Socket_18.prototype.onDrain = function() {
        this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
    }, __Socket_18.prototype.flush = function() {
        "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (__debug_18("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
    }, __Socket_18.prototype.write = __Socket_18.prototype.send = function(e, t, r) {
        return this.sendPacket("message", e, t, r), this
    }, __Socket_18.prototype.sendPacket = function(e, t, r, n) {
        if ("function" == typeof t && (n = t, t = void 0), "function" == typeof r && (n = r, r = null), "closing" !== this.readyState && "closed" !== this.readyState) {
            (r = r || {}).compress = !1 !== r.compress;
            var o = {
                type: e,
                data: t,
                options: r
            };
            this.emit("packetCreate", o), this.writeBuffer.push(o), n && this.once("flush", n), this.flush()
        }
    }, __Socket_18.prototype.close = function() {
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            var e = this;
            this.writeBuffer.length ? this.once("drain", function() {
                this.upgrading ? n() : t()
            }) : this.upgrading ? n() : t()
        }

        function t() {
            e.onClose("forced close"), __debug_18("socket closing - telling transport to close"), e.transport.close()
        }

        function r() {
            e.removeListener("upgrade", r), e.removeListener("upgradeError", r), t()
        }

        function n() {
            e.once("upgrade", r), e.once("upgradeError", r)
        }
        return this
    }, __Socket_18.prototype.onError = function(e) {
        __debug_18("socket error %j", e), __Socket_18.priorWebsocketSuccess = !1, this.emit("error", e), this.onClose("transport error", e)
    }, __Socket_18.prototype.onClose = function(e, t) {
        "opening" !== this.readyState && "open" !== this.readyState && "closing" !== this.readyState || (__debug_18('socket close with reason: "%s"', e), clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", e, t), this.writeBuffer = [], this.prevBufferLen = 0)
    }, __Socket_18.prototype.filterUpgrades = function(e) {
        for (var t = [], r = 0, n = e.length; r < n; r++) ~_$indexof_42(this.transports, e[r]) && t.push(e[r]);
        return t
    };
    var _$lib_17 = {};
    _$lib_17 = _$socket_18, _$lib_17.parser = _$browser_30;
    var _$componentEmitter_63 = {
        exports: {}
    };

    function __Emitter_63(e) {
        if (e) return function(e) {
            for (var t in __Emitter_63.prototype) e[t] = __Emitter_63.prototype[t];
            return e
        }(e)
    }
    _$componentEmitter_63.exports = __Emitter_63, __Emitter_63.prototype.on = __Emitter_63.prototype.addEventListener = function(e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
    }, __Emitter_63.prototype.once = function(e, t) {
        function r() {
            this.off(e, r), t.apply(this, arguments)
        }
        return r.fn = t, this.on(e, r), this
    }, __Emitter_63.prototype.off = __Emitter_63.prototype.removeListener = __Emitter_63.prototype.removeAllListeners = __Emitter_63.prototype.removeEventListener = function(e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var r, n = this._callbacks["$" + e];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + e], this;
        for (var o = 0; o < n.length; o++)
            if ((r = n[o]) === t || r.fn === t) {
                n.splice(o, 1);
                break
            } return this
    }, __Emitter_63.prototype.emit = function(e) {
        this._callbacks = this._callbacks || {};
        var t = [].slice.call(arguments, 1),
            r = this._callbacks["$" + e];
        if (r)
            for (var n = 0, o = (r = r.slice(0)).length; n < o; ++n) r[n].apply(this, t);
        return this
    }, __Emitter_63.prototype.listeners = function(e) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
    }, __Emitter_63.prototype.hasListeners = function(e) {
        return !!this.listeners(e).length
    }, _$componentEmitter_63 = _$componentEmitter_63.exports;
    var _$toArray_75 = function(e, t) {
            for (var r = [], n = (t = t || 0) || 0; n < e.length; n++) r[n - t] = e[n];
            return r
        },
        _$on_60 = function(e, t, r) {
            return e.on(t, r), {
                destroy: function() {
                    e.removeListener(t, r)
                }
            }
        },
        slice = [].slice,
        _$componentBind_10 = function(e, t) {
            if ("string" == typeof t && (t = e[t]), "function" != typeof t) throw new Error("bind() requires a function");
            var r = slice.call(arguments, 2);
            return function() {
                return t.apply(e, r.concat(slice.call(arguments)))
            }
        },
        _$socket_61 = {},
        __debug_61 = _$browser_64("socket.io-client:socket");
    _$socket_61 = _$socket_61 = __Socket_61;
    var events = {
            connect: 1,
            connect_error: 1,
            connect_timeout: 1,
            connecting: 1,
            disconnect: 1,
            error: 1,
            reconnect: 1,
            reconnect_attempt: 1,
            reconnect_failed: 1,
            reconnect_error: 1,
            reconnecting: 1,
            ping: 1,
            pong: 1
        },
        emit = _$componentEmitter_63.prototype.emit;

    function __Socket_61(e, t, r) {
        this.io = e, this.nsp = t, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.flags = {}, r && r.query && (this.query = r.query), this.io.autoConnect && this.open()
    }
    _$componentEmitter_63(__Socket_61.prototype), __Socket_61.prototype.subEvents = function() {
        if (!this.subs) {
            var e = this.io;
            this.subs = [_$on_60(e, "open", _$componentBind_10(this, "onopen")), _$on_60(e, "packet", _$componentBind_10(this, "onpacket")), _$on_60(e, "close", _$componentBind_10(this, "onclose"))]
        }
    }, __Socket_61.prototype.open = __Socket_61.prototype.connect = function() {
        return this.connected ? this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), this.emit("connecting"), this)
    }, __Socket_61.prototype.send = function() {
        var e = _$toArray_75(arguments);
        return e.unshift("message"), this.emit.apply(this, e), this
    }, __Socket_61.prototype.emit = function(e) {
        if (events.hasOwnProperty(e)) return emit.apply(this, arguments), this;
        var t = _$toArray_75(arguments),
            r = {
                type: (void 0 !== this.flags.binary ? this.flags.binary : _$hasBinary_38(t)) ? _$socketIoParser_68.BINARY_EVENT : _$socketIoParser_68.EVENT,
                data: t,
                options: {}
            };
        return r.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof t[t.length - 1] && (__debug_61("emitting packet with ack id %d", this.ids), this.acks[this.ids] = t.pop(), r.id = this.ids++), this.connected ? this.packet(r) : this.sendBuffer.push(r), this.flags = {}, this
    }, __Socket_61.prototype.packet = function(e) {
        e.nsp = this.nsp, this.io.packet(e)
    }, __Socket_61.prototype.onopen = function() {
        if (__debug_61("transport is open - connecting"), "/" !== this.nsp)
            if (this.query) {
                var e = "object" == typeof this.query ? _$parseqs_50.encode(this.query) : this.query;
                __debug_61("sending connect packet with query %s", e), this.packet({
                    type: _$socketIoParser_68.CONNECT,
                    query: e
                })
            } else this.packet({
                type: _$socketIoParser_68.CONNECT
            })
    }, __Socket_61.prototype.onclose = function(e) {
        __debug_61("close (%s)", e), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", e)
    }, __Socket_61.prototype.onpacket = function(e) {
        var t = e.nsp === this.nsp,
            r = e.type === _$socketIoParser_68.ERROR && "/" === e.nsp;
        if (t || r) switch (e.type) {
            case _$socketIoParser_68.CONNECT:
                this.onconnect();
                break;
            case _$socketIoParser_68.EVENT:
            case _$socketIoParser_68.BINARY_EVENT:
                this.onevent(e);
                break;
            case _$socketIoParser_68.ACK:
            case _$socketIoParser_68.BINARY_ACK:
                this.onack(e);
                break;
            case _$socketIoParser_68.DISCONNECT:
                this.ondisconnect();
                break;
            case _$socketIoParser_68.ERROR:
                this.emit("error", e.data)
        }
    }, __Socket_61.prototype.onevent = function(e) {
        var t = e.data || [];
        __debug_61("emitting event %j", t), null != e.id && (__debug_61("attaching ack callback to event"), t.push(this.ack(e.id))), this.connected ? emit.apply(this, t) : this.receiveBuffer.push(t)
    }, __Socket_61.prototype.ack = function(e) {
        var t = this,
            r = !1;
        return function() {
            if (!r) {
                r = !0;
                var n = _$toArray_75(arguments);
                __debug_61("sending ack %j", n), t.packet({
                    type: _$hasBinary_38(n) ? _$socketIoParser_68.BINARY_ACK : _$socketIoParser_68.ACK,
                    id: e,
                    data: n
                })
            }
        }
    }, __Socket_61.prototype.onack = function(e) {
        var t = this.acks[e.id];
        "function" == typeof t ? (__debug_61("calling ack %s with %j", e.id, e.data), t.apply(this, e.data), delete this.acks[e.id]) : __debug_61("bad ack %s", e.id)
    }, __Socket_61.prototype.onconnect = function() {
        this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
    }, __Socket_61.prototype.emitBuffered = function() {
        var e;
        for (e = 0; e < this.receiveBuffer.length; e++) emit.apply(this, this.receiveBuffer[e]);
        for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++) this.packet(this.sendBuffer[e]);
        this.sendBuffer = []
    }, __Socket_61.prototype.ondisconnect = function() {
        __debug_61("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
    }, __Socket_61.prototype.destroy = function() {
        if (this.subs) {
            for (var e = 0; e < this.subs.length; e++) this.subs[e].destroy();
            this.subs = null
        }
        this.io.destroy(this)
    }, __Socket_61.prototype.close = __Socket_61.prototype.disconnect = function() {
        return this.connected && (__debug_61("performing disconnect (%s)", this.nsp), this.packet({
            type: _$socketIoParser_68.DISCONNECT
        })), this.destroy(), this.connected && this.onclose("io client disconnect"), this
    }, __Socket_61.prototype.compress = function(e) {
        return this.flags.compress = e, this
    }, __Socket_61.prototype.binary = function(e) {
        return this.flags.binary = e, this
    };
    var _$backo2_3 = {};

    function Backoff(e) {
        e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0
    }
    _$backo2_3 = Backoff, Backoff.prototype.duration = function() {
        var e = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
            var t = Math.random(),
                r = Math.floor(t * this.jitter * e);
            e = 0 == (1 & Math.floor(10 * t)) ? e - r : e + r
        }
        return 0 | Math.min(e, this.max)
    }, Backoff.prototype.reset = function() {
        this.attempts = 0
    }, Backoff.prototype.setMin = function(e) {
        this.ms = e
    }, Backoff.prototype.setMax = function(e) {
        this.max = e
    }, Backoff.prototype.setJitter = function(e) {
        this.jitter = e
    };
    var _$manager_59 = {},
        __debug_59 = _$browser_64("socket.io-client:manager"),
        __has_59 = Object.prototype.hasOwnProperty;

    function Manager(e, t) {
        if (!(this instanceof Manager)) return new Manager(e, t);
        e && "object" == typeof e && (t = e, e = void 0), (t = t || {}).path = t.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = t, this.reconnection(!1 !== t.reconnection), this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor(t.randomizationFactor || .5), this.backoff = new _$backo2_3({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        }), this.timeout(null == t.timeout ? 2e4 : t.timeout), this.readyState = "closed", this.uri = e, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [];
        var r = t.parser || _$socketIoParser_68;
        this.encoder = new r.Encoder, this.decoder = new r.Decoder, this.autoConnect = !1 !== t.autoConnect, this.autoConnect && this.open()
    }
    _$manager_59 = Manager, Manager.prototype.emitAll = function() {
        for (var e in this.emit.apply(this, arguments), this.nsps) __has_59.call(this.nsps, e) && this.nsps[e].emit.apply(this.nsps[e], arguments)
    }, Manager.prototype.updateSocketIds = function() {
        for (var e in this.nsps) __has_59.call(this.nsps, e) && (this.nsps[e].id = this.generateId(e))
    }, Manager.prototype.generateId = function(e) {
        return ("/" === e ? "" : e + "#") + this.engine.id
    }, _$componentEmitter_63(Manager.prototype), Manager.prototype.reconnection = function(e) {
        return arguments.length ? (this._reconnection = !!e, this) : this._reconnection
    }, Manager.prototype.reconnectionAttempts = function(e) {
        return arguments.length ? (this._reconnectionAttempts = e, this) : this._reconnectionAttempts
    }, Manager.prototype.reconnectionDelay = function(e) {
        return arguments.length ? (this._reconnectionDelay = e, this.backoff && this.backoff.setMin(e), this) : this._reconnectionDelay
    }, Manager.prototype.randomizationFactor = function(e) {
        return arguments.length ? (this._randomizationFactor = e, this.backoff && this.backoff.setJitter(e), this) : this._randomizationFactor
    }, Manager.prototype.reconnectionDelayMax = function(e) {
        return arguments.length ? (this._reconnectionDelayMax = e, this.backoff && this.backoff.setMax(e), this) : this._reconnectionDelayMax
    }, Manager.prototype.timeout = function(e) {
        return arguments.length ? (this._timeout = e, this) : this._timeout
    }, Manager.prototype.maybeReconnectOnOpen = function() {
        !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
    }, Manager.prototype.open = Manager.prototype.connect = function(e, t) {
        if (__debug_59("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
        __debug_59("opening %s", this.uri), this.engine = _$lib_17(this.uri, this.opts);
        var r = this.engine,
            n = this;
        this.readyState = "opening", this.skipReconnect = !1;
        var o = _$on_60(r, "open", function() {
                n.onopen(), e && e()
            }),
            i = _$on_60(r, "error", function(t) {
                if (__debug_59("connect_error"), n.cleanup(), n.readyState = "closed", n.emitAll("connect_error", t), e) {
                    var r = new Error("Connection error");
                    r.data = t, e(r)
                } else n.maybeReconnectOnOpen()
            });
        if (!1 !== this._timeout) {
            var s = this._timeout;
            __debug_59("connect attempt will timeout after %d", s);
            var a = setTimeout(function() {
                __debug_59("connect attempt timed out after %d", s), o.destroy(), r.close(), r.emit("error", "timeout"), n.emitAll("connect_timeout", s)
            }, s);
            this.subs.push({
                destroy: function() {
                    clearTimeout(a)
                }
            })
        }
        return this.subs.push(o), this.subs.push(i), this
    }, Manager.prototype.onopen = function() {
        __debug_59("open"), this.cleanup(), this.readyState = "open", this.emit("open");
        var e = this.engine;
        this.subs.push(_$on_60(e, "data", _$componentBind_10(this, "ondata"))), this.subs.push(_$on_60(e, "ping", _$componentBind_10(this, "onping"))), this.subs.push(_$on_60(e, "pong", _$componentBind_10(this, "onpong"))), this.subs.push(_$on_60(e, "error", _$componentBind_10(this, "onerror"))), this.subs.push(_$on_60(e, "close", _$componentBind_10(this, "onclose"))), this.subs.push(_$on_60(this.decoder, "decoded", _$componentBind_10(this, "ondecoded")))
    }, Manager.prototype.onping = function() {
        this.lastPing = new Date, this.emitAll("ping")
    }, Manager.prototype.onpong = function() {
        this.emitAll("pong", new Date - this.lastPing)
    }, Manager.prototype.ondata = function(e) {
        this.decoder.add(e)
    }, Manager.prototype.ondecoded = function(e) {
        this.emit("packet", e)
    }, Manager.prototype.onerror = function(e) {
        __debug_59("error", e), this.emitAll("error", e)
    }, Manager.prototype.socket = function(e, t) {
        var r = this.nsps[e];
        if (!r) {
            r = new _$socket_61(this, e, t), this.nsps[e] = r;
            var n = this;
            r.on("connecting", o), r.on("connect", function() {
                r.id = n.generateId(e)
            }), this.autoConnect && o()
        }

        function o() {
            ~_$indexof_42(n.connecting, r) || n.connecting.push(r)
        }
        return r
    }, Manager.prototype.destroy = function(e) {
        var t = _$indexof_42(this.connecting, e);
        ~t && this.connecting.splice(t, 1), this.connecting.length || this.close()
    }, Manager.prototype.packet = function(e) {
        __debug_59("writing packet %j", e);
        var t = this;
        e.query && 0 === e.type && (e.nsp += "?" + e.query), t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0, this.encoder.encode(e, function(r) {
            for (var n = 0; n < r.length; n++) t.engine.write(r[n], e.options);
            t.encoding = !1, t.processPacketQueue()
        }))
    }, Manager.prototype.processPacketQueue = function() {
        if (this.packetBuffer.length > 0 && !this.encoding) {
            var e = this.packetBuffer.shift();
            this.packet(e)
        }
    }, Manager.prototype.cleanup = function() {
        __debug_59("cleanup");
        for (var e = this.subs.length, t = 0; t < e; t++) this.subs.shift().destroy();
        this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy()
    }, Manager.prototype.close = Manager.prototype.disconnect = function() {
        __debug_59("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
    }, Manager.prototype.onclose = function(e) {
        __debug_59("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", e), this._reconnection && !this.skipReconnect && this.reconnect()
    }, Manager.prototype.reconnect = function() {
        if (this.reconnecting || this.skipReconnect) return this;
        var e = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) __debug_59("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;
        else {
            var t = this.backoff.duration();
            __debug_59("will wait %dms before reconnect attempt", t), this.reconnecting = !0;
            var r = setTimeout(function() {
                e.skipReconnect || (__debug_59("attempting reconnect"), e.emitAll("reconnect_attempt", e.backoff.attempts), e.emitAll("reconnecting", e.backoff.attempts), e.skipReconnect || e.open(function(t) {
                    t ? (__debug_59("reconnect attempt error"), e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", t.data)) : (__debug_59("reconnect success"), e.onreconnect())
                }))
            }, t);
            this.subs.push({
                destroy: function() {
                    clearTimeout(r)
                }
            })
        }
    }, Manager.prototype.onreconnect = function() {
        var e = this.backoff.attempts;
        this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", e)
    };
    var _$componentEmitter_11 = {
        exports: {}
    };

    function __Emitter_11(e) {
        if (e) return function(e) {
            for (var t in __Emitter_11.prototype) e[t] = __Emitter_11.prototype[t];
            return e
        }(e)
    }
    _$componentEmitter_11.exports = __Emitter_11, __Emitter_11.prototype.on = __Emitter_11.prototype.addEventListener = function(e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
    }, __Emitter_11.prototype.once = function(e, t) {
        function r() {
            this.off(e, r), t.apply(this, arguments)
        }
        return r.fn = t, this.on(e, r), this
    }, __Emitter_11.prototype.off = __Emitter_11.prototype.removeListener = __Emitter_11.prototype.removeAllListeners = __Emitter_11.prototype.removeEventListener = function(e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var r, n = this._callbacks["$" + e];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + e], this;
        for (var o = 0; o < n.length; o++)
            if ((r = n[o]) === t || r.fn === t) {
                n.splice(o, 1);
                break
            } return 0 === n.length && delete this._callbacks["$" + e], this
    }, __Emitter_11.prototype.emit = function(e) {
        this._callbacks = this._callbacks || {};
        for (var t = new Array(arguments.length - 1), r = this._callbacks["$" + e], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        if (r) {
            n = 0;
            for (var o = (r = r.slice(0)).length; n < o; ++n) r[n].apply(this, t)
        }
        return this
    }, __Emitter_11.prototype.listeners = function(e) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
    }, __Emitter_11.prototype.hasListeners = function(e) {
        return !!this.listeners(e).length
    }, _$componentEmitter_11 = _$componentEmitter_11.exports;
    var _$parseUrl_175 = function(e) {
        var t = /^\w+:\/\//.exec(e),
            r = 0;
        t && (r = t[0].length + 1);
        var n = e.indexOf("/", r);
        return -1 === n ? {
            origin: e,
            pathname: "/"
        } : {
            origin: e.slice(0, n),
            pathname: e.slice(n)
        }
    };

    function ___extends_170() {
        return (___extends_170 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var socketIo, io = function() {
            return socketIo || (socketIo = _$lib_58({})), socketIo
        },
        statusOrder = ["ASSEMBLY_UPLOADING", "ASSEMBLY_EXECUTING", "ASSEMBLY_COMPLETED"];

    function isStatus(e, t) {
        return statusOrder.indexOf(e) >= statusOrder.indexOf(t)
    }
    var TransloaditAssembly = function(e) {
            var t, r;

            function n(t) {
                var r;
                return (r = e.call(this) || this).status = t, r.socket = null, r.pollInterval = null, r.closed = !1, r
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.connect = function() {
                this._connectSocket(), this._beginPolling()
            }, o._onFinished = function() {
                this.emit("finished"), this.close()
            }, o._connectSocket = function() {
                var e = this,
                    t = _$parseUrl_175(this.status.websocket_url),
                    r = io().connect(t.origin, {
                        transports: ["websocket"],
                        path: t.pathname
                    });
                r.on("connect", function() {
                    r.emit("assembly_connect", {
                        id: e.status.assembly_id
                    }), e.emit("connect")
                }), r.on("error", function() {
                    r.disconnect(), e.socket = null
                }), r.on("assembly_finished", function() {
                    e._onFinished()
                }), r.on("assembly_upload_finished", function(t) {
                    e.emit("upload", t), e.status.uploads.push(t)
                }), r.on("assembly_uploading_finished", function() {
                    e.emit("executing")
                }), r.on("assembly_upload_meta_data_extracted", function() {
                    e.emit("metadata"), e._fetchStatus({
                        diff: !1
                    })
                }), r.on("assembly_result_finished", function(t, r) {
                    e.emit("result", t, r), e.status.results[t] || (e.status.results[t] = []), e.status.results[t].push(r)
                }), r.on("assembly_error", function(t) {
                    e._onError(t), e._fetchStatus({
                        diff: !1
                    })
                }), this.socket = r
            }, o._onError = function(e) {
                this.emit("error", ___extends_170(new Error(e.message), e))
            }, o._beginPolling = function() {
                var e = this;
                this.pollInterval = setInterval(function() {
                    e.socket && e.socket.connected || e._fetchStatus()
                }, 2e3)
            }, o._fetchStatus = function(e) {
                var t = this,
                    r = (void 0 === e ? {} : e).diff,
                    n = void 0 === r || r;
                return fetch(this.status.assembly_ssl_url).then(function(e) {
                    return e.json()
                }).then(function(e) {
                    t.closed || (t.emit("status", e), n ? t.updateStatus(e) : t.status = e)
                })
            }, o.update = function() {
                return this._fetchStatus({
                    diff: !0
                })
            }, o.updateStatus = function(e) {
                this._diffStatus(this.status, e), this.status = e
            }, o._diffStatus = function(e, t) {
                var r = this,
                    n = e.ok,
                    o = t.ok;
                if (t.error && !e.error) return this._onError(t);
                var i = isStatus(o, "ASSEMBLY_EXECUTING") && !isStatus(n, "ASSEMBLY_EXECUTING");
                i && this.emit("executing"), Object.keys(t.uploads).filter(function(t) {
                    return !_$hasProperty_218(e.uploads, t)
                }).map(function(e) {
                    return t.uploads[e]
                }).forEach(function(e) {
                    r.emit("upload", e)
                }), i && this.emit("metadata"), Object.keys(t.results).forEach(function(n) {
                    var o = t.results[n],
                        i = e.results[n];
                    o.filter(function(e) {
                        return !i || !i.some(function(t) {
                            return t.id === e.id
                        })
                    }).forEach(function(e) {
                        r.emit("result", n, e)
                    })
                }), isStatus(o, "ASSEMBLY_COMPLETED") && !isStatus(n, "ASSEMBLY_COMPLETED") && this.emit("finished")
            }, o.close = function() {
                this.closed = !0, this.socket && (this.socket.disconnect(), this.socket = null), clearInterval(this.pollInterval)
            }, n
        }(_$componentEmitter_11),
        _$TransloaditAssembly_170 = TransloaditAssembly,
        _$Client_173 = function() {
            function e(e) {
                void 0 === e && (e = {}), this.opts = e, this._reportError = this._reportError.bind(this), this._headers = {
                    "Transloadit-Client": this.opts.client
                }
            }
            var t = e.prototype;
            return t.createAssembly = function(e) {
                var t = this,
                    r = (e.templateId, e.params),
                    n = e.fields,
                    o = e.signature,
                    i = e.expectedFiles,
                    s = new FormData;
                s.append("params", "string" == typeof r ? r : JSON.stringify(r)), o && s.append("signature", o), Object.keys(n).forEach(function(e) {
                    s.append(e, n[e])
                }), s.append("num_expected_upload_files", i);
                var a = this.opts.service + "/assemblies";
                return fetch(a, {
                    method: "post",
                    headers: this._headers,
                    body: s
                }).then(function(e) {
                    return e.json()
                }).then(function(e) {
                    if (e.error) {
                        var t = new Error(e.error);
                        throw t.message = e.error, t.details = e.reason, t
                    }
                    return e
                }).catch(function(e) {
                    return t._reportError(e, {
                        url: a,
                        type: "API_ERROR"
                    })
                })
            }, t.reserveFile = function(e, t) {
                var r = this,
                    n = encodeURIComponent(t.size),
                    o = e.assembly_ssl_url + "/reserve_file?size=" + n;
                return fetch(o, {
                    method: "post",
                    headers: this._headers
                }).then(function(e) {
                    return e.json()
                }).catch(function(n) {
                    return r._reportError(n, {
                        assembly: e,
                        file: t,
                        url: o,
                        type: "API_ERROR"
                    })
                })
            }, t.addFile = function(e, t) {
                var r = this;
                if (!t.uploadURL) return Promise.reject(new Error("File does not have an `uploadURL`."));
                var n = encodeURIComponent(t.size),
                    o = encodeURIComponent(t.uploadURL),
                    i = "size=" + n + "&filename=" + encodeURIComponent(t.name) + "&fieldname=file&s3Url=" + o,
                    s = e.assembly_ssl_url + "/add_file?" + i;
                return fetch(s, {
                    method: "post",
                    headers: this._headers
                }).then(function(e) {
                    return e.json()
                }).catch(function(n) {
                    return r._reportError(n, {
                        assembly: e,
                        file: t,
                        url: s,
                        type: "API_ERROR"
                    })
                })
            }, t.cancelAssembly = function(e) {
                var t = this,
                    r = e.assembly_ssl_url;
                return fetch(r, {
                    method: "delete",
                    headers: this._headers
                }).then(function(e) {
                    return e.json()
                }).catch(function(e) {
                    return t._reportError(e, {
                        url: r,
                        type: "API_ERROR"
                    })
                })
            }, t.getAssemblyStatus = function(e) {
                var t = this;
                return fetch(e, {
                    headers: this._headers
                }).then(function(e) {
                    return e.json()
                }).catch(function(r) {
                    return t._reportError(r, {
                        url: e,
                        type: "STATUS_ERROR"
                    })
                })
            }, t.submitError = function(e, t) {
                var r = t.endpoint,
                    n = t.instance,
                    o = t.assembly,
                    i = e.details ? e.message + " (" + e.details + ")" : e.message;
                return fetch("https://status.transloadit.com/client_error", {
                    method: "post",
                    body: JSON.stringify({
                        endpoint: r,
                        instance: n,
                        assembly_id: o,
                        agent: "undefined" != typeof navigator ? navigator.userAgent : "",
                        client: this.opts.client,
                        error: i
                    })
                }).then(function(e) {
                    return e.json()
                })
            }, t._reportError = function(e, t) {
                if (!1 === this.opts.errorReporting) throw e;
                var r = {
                    type: t.type
                };
                throw t.assembly && (r.assembly = t.assembly.assembly_id, r.instance = t.assembly.instance), t.url && (r.endpoint = t.url), this.submitError(e, r).catch(function(e) {}), e
            }, e
        }(),
        _$AssemblyOptions_171 = {};

    function validateParams(e) {
        if (!e) throw new Error("Transloadit: The `params` option is required.");
        if ("string" == typeof e) try {
            e = JSON.parse(e)
        } catch (err) {
            throw err.message = "Transloadit: The `params` option is a malformed JSON string: " + err.message, err
        }
        if (!e.auth || !e.auth.key) throw new Error("Transloadit: The `params.auth.key` option is required. You can find your Transloadit API key at https://transloadit.com/account/api-settings.")
    }
    var AssemblyOptions = function() {
        function e(e, t) {
            this.files = e, this.opts = t
        }
        var t = e.prototype;
        return t._normalizeAssemblyOptions = function(e, t) {
            if (Array.isArray(t.fields)) {
                var r = t.fields;
                t.fields = {}, r.forEach(function(r) {
                    t.fields[r] = e.meta[r]
                })
            }
            return t.fields || (t.fields = {}), t
        }, t._getAssemblyOptions = function(e) {
            var t = this,
                r = this.opts;
            return Promise.resolve().then(function() {
                return r.getAssemblyOptions(e, r)
            }).then(function(r) {
                return t._normalizeAssemblyOptions(e, r)
            }).then(function(t) {
                return validateParams(t.params), {
                    fileIDs: [e.id],
                    options: t
                }
            })
        }, t._dedupe = function(e) {
            var t = Object.create(null);
            return e.forEach(function(e) {
                var r, n = e.fileIDs,
                    o = e.options,
                    i = JSON.stringify(o);
                t[i] ? (r = t[i].fileIDs).push.apply(r, n) : t[i] = {
                    options: o,
                    fileIDs: [].concat(n)
                }
            }), Object.keys(t).map(function(e) {
                return t[e]
            })
        }, t.build = function() {
            var e = this,
                t = this.opts;
            return this.files.length > 0 ? Promise.all(this.files.map(function(t) {
                return e._getAssemblyOptions(t)
            })).then(function(t) {
                return e._dedupe(t)
            }) : t.alwaysRunAssembly ? Promise.resolve(t.getAssemblyOptions(null, t)).then(function(t) {
                return validateParams(t.params), [{
                    fileIDs: e.files.map(function(e) {
                        return e.id
                    }),
                    options: t
                }]
            }) : Promise.resolve([])
        }, e
    }();

    function ___assertThisInitialized_172(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    _$AssemblyOptions_171 = AssemblyOptions, _$AssemblyOptions_171.validateParams = validateParams;
    var TransloaditAssemblyWatcher = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this) || this)._uppy = t, n._assemblyIDs = r, n._remaining = r.length, n.promise = new Promise(function(e, t) {
                    n._resolve = e, n._reject = t
                }), n._onAssemblyComplete = n._onAssemblyComplete.bind(___assertThisInitialized_172(n)), n._onAssemblyCancel = n._onAssemblyCancel.bind(___assertThisInitialized_172(n)), n._onAssemblyError = n._onAssemblyError.bind(___assertThisInitialized_172(n)), n._onImportError = n._onImportError.bind(___assertThisInitialized_172(n)), n._addListeners(), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o._watching = function(e) {
                return -1 !== this._assemblyIDs.indexOf(e)
            }, o._onAssemblyComplete = function(e) {
                this._watching(e.assembly_id) && (this._uppy.log("[Transloadit] AssemblyWatcher: Got Assembly finish " + e.assembly_id), this.emit("assembly-complete", e.assembly_id), this._checkAllComplete())
            }, o._onAssemblyCancel = function(e) {
                this._watching(e.assembly_id) && this._checkAllComplete()
            }, o._onAssemblyError = function(e, t) {
                this._watching(e.assembly_id) && (this._uppy.log("[Transloadit] AssemblyWatcher: Got Assembly error " + e.assembly_id), this._uppy.log(t), this.emit("assembly-error", e.assembly_id, t), this._checkAllComplete())
            }, o._onImportError = function(e, t, r) {
                this._watching(e.assembly_id) && this._onAssemblyError(e, r)
            }, o._checkAllComplete = function() {
                this._remaining -= 1, 0 === this._remaining && (this._removeListeners(), this._resolve())
            }, o._removeListeners = function() {
                this._uppy.off("transloadit:complete", this._onAssemblyComplete), this._uppy.off("transloadit:assembly-cancel", this._onAssemblyCancel), this._uppy.off("transloadit:assembly-error", this._onAssemblyError), this._uppy.off("transloadit:import-error", this._onImportError)
            }, o._addListeners = function() {
                this._uppy.on("transloadit:complete", this._onAssemblyComplete), this._uppy.on("transloadit:assembly-cancel", this._onAssemblyCancel), this._uppy.on("transloadit:assembly-error", this._onAssemblyError), this._uppy.on("transloadit:import-error", this._onImportError)
            }, n
        }(_$componentEmitter_11),
        _$TransloaditAssemblyWatcher_172 = TransloaditAssemblyWatcher,
        _$package_176 = {
            version: "1.4.0"
        },
        _$lib_174 = {},
        ___class_174, ___temp_174;

    function ___extends_174() {
        return (___extends_174 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ___assertThisInitialized_174(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __Plugin_174 = _$lib_93.Plugin;

    function defaultGetAssemblyOptions(e, t) {
        return {
            params: t.params,
            signature: t.signature,
            fields: t.fields
        }
    }
    var COMPANION = "https://api2.transloadit.com/companion",
        TL_COMPANION = /https?:\/\/api2(?:-\w+)?\.transloadit\.com\/companion/,
        TL_UPPY_SERVER = /https?:\/\/api2(?:-\w+)?\.transloadit\.com\/uppy-server/;
    ___temp_174 = ___class_174 = function(e) {
        var t, r;

        function n(t, r) {
            var n;
            (n = e.call(this, t, r) || this).type = "uploader", n.id = n.opts.id || "Transloadit", n.title = "Transloadit", n.defaultLocale = {
                strings: {
                    creatingAssembly: 'Yüklemeye hazırlanıyor...',
                    creatingAssemblyFailed: 'Transloadit: Yükleme oluşturulamadı',
                    encoding: "Encoding..."
                }
            };
            var o = {
                service: "https://api2.transloadit.com",
                errorReporting: !0,
                waitForEncoding: !1,
                waitForMetadata: !1,
                alwaysRunAssembly: !1,
                importFromUploadURLs: !1,
                signature: null,
                params: null,
                fields: {},
                getAssemblyOptions: defaultGetAssemblyOptions,
                limit: 0
            };
            n.opts = ___extends_174({}, o, {}, r), n.i18nInit(), n._prepareUpload = n._prepareUpload.bind(___assertThisInitialized_174(n)), n._afterUpload = n._afterUpload.bind(___assertThisInitialized_174(n)), n._onError = n._onError.bind(___assertThisInitialized_174(n)), n._onTusError = n._onTusError.bind(___assertThisInitialized_174(n)), n._onCancelAll = n._onCancelAll.bind(___assertThisInitialized_174(n)), n._onFileUploadURLAvailable = n._onFileUploadURLAvailable.bind(___assertThisInitialized_174(n)), n._onRestored = n._onRestored.bind(___assertThisInitialized_174(n)), n._getPersistentData = n._getPersistentData.bind(___assertThisInitialized_174(n));
            var i = n.opts.getAssemblyOptions !== o.getAssemblyOptions;
            return n.opts.params ? _$AssemblyOptions_171.validateParams(n.opts.params) : i || _$AssemblyOptions_171.validateParams(null), n.client = new _$Client_173({
                service: n.opts.service,
                client: n._getClientVersion(),
                errorReporting: n.opts.errorReporting
            }), n.activeAssemblies = {}, n
        }
        r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
        var o = n.prototype;
        return o.setOptions = function(t) {
            e.prototype.setOptions.call(this, t), this.i18nInit()
        }, o.i18nInit = function() {
            this.translator = new _$Translator_199([this.defaultLocale, this.uppy.locale, this.opts.locale]), this.i18n = this.translator.translate.bind(this.translator), this.i18nArray = this.translator.translateArray.bind(this.translator), this.setPluginState()
        }, o._getClientVersion = function() {
            var e = this,
                t = ["uppy-core:" + this.uppy.constructor.VERSION, "uppy-transloadit:" + this.constructor.VERSION, "uppy-tus:" + _$lib_178.VERSION],
                r = function(r, n) {
                    var o = e.uppy.getPlugin(r);
                    o && t.push(n + ":" + o.constructor.VERSION)
                };
            return this.opts.importFromUploadURLs && (r("XHRUpload", "uppy-xhr-upload"), r("AwsS3", "uppy-aws-s3"), r("AwsS3Multipart", "uppy-aws-s3-multipart")), r("Dropbox", "uppy-dropbox"), r("Facebook", "uppy-facebook"), r("GoogleDrive", "uppy-google-drive"), r("Instagram", "uppy-instagram"), r("OneDrive", "uppy-onedrive"), r("Url", "uppy-url"), t.join(",")
        }, o._attachAssemblyMetadata = function(e, t) {
            var r = ___extends_174({}, e.meta, {
                    assembly_url: t.assembly_url,
                    filename: e.name,
                    fieldname: "file"
                }),
                n = ___extends_174({}, e.tus, {
                    endpoint: t.tus_url
                }),
                o = e.remote;
            if (e.remote && TL_UPPY_SERVER.test(e.remote.companionUrl)) {
                var i = new Error("The https://api2.transloadit.com/uppy-server endpoint was renamed to https://api2.transloadit.com/companion, please update your `companionUrl` options accordingly.");
                throw this.uppy.log(i), i
            }
            if (e.remote && TL_COMPANION.test(e.remote.companionUrl)) {
                var s = t.companion_url.replace(/\/$/, ""),
                    a = e.remote.url.replace(e.remote.companionUrl, "").replace(/^\//, "");
                o = ___extends_174({}, e.remote, {
                    companionUrl: s,
                    url: s + "/" + a
                })
            }
            var l = ___extends_174({}, e, {
                transloadit: {
                    assembly: t.assembly_id
                }
            });
            return this.opts.importFromUploadURLs || ___extends_174(l, {
                meta: r,
                tus: n,
                remote: o
            }), l
        }, o._createAssembly = function(e, t, r) {
            var n = this;
            return this.uppy.log("[Transloadit] create Assembly"), this.client.createAssembly({
                params: r.params,
                fields: r.fields,
                expectedFiles: e.length,
                signature: r.signature
            }).then(function(r) {
                var o, i, s = new _$TransloaditAssembly_170(r),
                    a = s.status,
                    l = n.getPluginState(),
                    u = l.assemblies,
                    c = l.uploadsAssemblies;
                n.setPluginState({
                    assemblies: ___extends_174({}, u, (o = {}, o[a.assembly_id] = a, o)),
                    uploadsAssemblies: ___extends_174({}, c, (i = {}, i[t] = [].concat(c[t], [a.assembly_id]), i))
                });
                var p = n.uppy.getState().files,
                    d = {};
                return e.forEach(function(e) {
                    d[e] = n._attachAssemblyMetadata(n.uppy.getFile(e), a)
                }), n.uppy.setState({
                    files: ___extends_174({}, p, {}, d)
                }), n.uppy.emit("transloadit:assembly-created", a, e), n._connectAssembly(s), n.uppy.log("[Transloadit] Created Assembly " + a.assembly_id), s
            }).catch(function(e) {
                throw e.message = n.i18n("creatingAssemblyFailed") + ": " + e.message, e
            })
        }, o._shouldWaitAfterUpload = function() {
            return this.opts.waitForEncoding || this.opts.waitForMetadata
        }, o._reserveFiles = function(e, t) {
            var r = this;
            return Promise.all(t.map(function(t) {
                var n = r.uppy.getFile(t);
                return r.client.reserveFile(e, n)
            }))
        }, o._onFileUploadURLAvailable = function(e) {
            var t = this;
            if (e && e.transloadit && e.transloadit.assembly) {
                var r = this.getPluginState().assemblies[e.transloadit.assembly];
                this.client.addFile(r, e).catch(function(n) {
                    t.uppy.log(n), t.uppy.emit("transloadit:import-error", r, e.id, n)
                })
            }
        }, o._findFile = function(e) {
            for (var t = this.uppy.getFiles(), r = 0; r < t.length; r++) {
                var n = t[r];
                if (n.uploadURL === e.tus_upload_url) return n;
                if (n.tus && n.tus.uploadUrl === e.tus_upload_url) return n;
                if (!e.is_tus_file && n.name === e.name && n.size === e.size) return n
            }
        }, o._onFileUploadComplete = function(e, t) {
            var r, n = this.getPluginState(),
                o = this._findFile(t);
            o ? (this.setPluginState({
                files: ___extends_174({}, n.files, (r = {}, r[t.id] = {
                    assembly: e,
                    id: o.id,
                    uploadedFile: t
                }, r))
            }), this.uppy.emit("transloadit:upload", t, this.getAssembly(e))) : this.uppy.log("[Transloadit] Couldn\u2019t file the file, it was likely removed in the process")
        }, o._onResult = function(e, t, r) {
            var n = this.getPluginState(),
                o = n.files[r.original_id];
            r.localId = o ? o.id : null;
            var i = {
                result: r,
                stepName: t,
                id: r.id,
                assembly: e
            };
            this.setPluginState({
                results: [].concat(n.results, [i])
            }), this.uppy.emit("transloadit:result", t, r, this.getAssembly(e))
        }, o._onAssemblyFinished = function(e) {
            var t = this,
                r = e.assembly_ssl_url;
            this.client.getAssemblyStatus(r).then(function(e) {
                var r, n = t.getPluginState();
                t.setPluginState({
                    assemblies: ___extends_174({}, n.assemblies, (r = {}, r[e.assembly_id] = e, r))
                }), t.uppy.emit("transloadit:complete", e)
            })
        }, o._cancelAssembly = function(e) {
            var t = this;
            return this.client.cancelAssembly(e).then(function() {
                t.uppy.emit("transloadit:assembly-cancelled", e)
            })
        }, o._onCancelAll = function() {
            var e = this,
                t = this.getPluginState().assemblies,
                r = Object.keys(t).map(function(t) {
                    var r = e.getAssembly(t);
                    return e._cancelAssembly(r)
                });
            Promise.all(r).catch(function(t) {
                e.uppy.log(t)
            })
        }, o._getPersistentData = function(e) {
            var t, r = this.getPluginState(),
                n = r.assemblies,
                o = r.uploadsAssemblies;
            e(((t = {})[this.id] = {
                assemblies: n,
                uploadsAssemblies: o
            }, t))
        }, o._onRestored = function(e) {
            var t = this,
                r = e && e[this.id] ? e[this.id] : {},
                n = r.assemblies || {},
                o = r.uploadsAssemblies || {};
            0 !== Object.keys(o).length && (this.restored = Promise.resolve().then(function() {
                var e, r, i;
                return e = n, r = {}, i = [], Object.keys(e).forEach(function(n) {
                        var o = e[n];
                        o.uploads.forEach(function(e) {
                            var o = t._findFile(e);
                            r[e.id] = {
                                id: o.id,
                                assembly: n,
                                uploadedFile: e
                            }
                        });
                        var s = t.getPluginState();
                        Object.keys(o.results).forEach(function(e) {
                            o.results[e].forEach(function(t) {
                                var r = s.files[t.original_id];
                                t.localId = r ? r.id : null, i.push({
                                    id: t.id,
                                    result: t,
                                    stepName: e,
                                    assembly: n
                                })
                            })
                        })
                    }), t.setPluginState({
                        assemblies: e,
                        files: r,
                        results: i,
                        uploadsAssemblies: o
                    }),
                    function() {
                        var e = t.getPluginState().assemblies;
                        Object.keys(e).forEach(function(r) {
                            var n = new _$TransloaditAssembly_170(e[r]);
                            t._connectAssembly(n)
                        })
                    }(),
                    function() {
                        var e = t.getPluginState().assemblies;
                        return Promise.all(Object.keys(e).map(function(e) {
                            return t.activeAssemblies[e].update()
                        }))
                    }()
            }), this.restored.then(function() {
                t.restored = null
            }))
        }, o._connectAssembly = function(e) {
            var t = this,
                r = e.status.assembly_id;
            return this.activeAssemblies[r] = e, e.on("status", function(e) {
                var n, o = t.getPluginState().assemblies;
                t.setPluginState({
                    assemblies: ___extends_174({}, o, (n = {}, n[r] = e, n))
                })
            }), e.on("upload", function(e) {
                t._onFileUploadComplete(r, e)
            }), e.on("error", function(r) {
                r.assembly = e.status, t.uppy.emit("transloadit:assembly-error", e.status, r)
            }), e.on("executing", function() {
                t.uppy.emit("transloadit:assembly-executing", e.status)
            }), this.opts.waitForEncoding && e.on("result", function(e, n) {
                t._onResult(r, e, n)
            }), this.opts.waitForEncoding ? e.on("finished", function() {
                t._onAssemblyFinished(e.status)
            }) : this.opts.waitForMetadata && e.on("metadata", function() {
                t._onAssemblyFinished(e.status)
            }), "ASSEMBLY_COMPLETE" === e.ok ? e : (new Promise(function(t, r) {
                e.once("connect", t), e.once("status", t), e.once("error", r)
            }).then(function() {
                t.uppy.log("[Transloadit] Socket is ready")
            }), e.connect(), e)
        }, o._prepareUpload = function(e, t) {
            var r, n = this;
            (e = e.filter(function(e) {
                return !e.error
            })).forEach(function(e) {
                var t = n.uppy.getFile(e);
                n.uppy.emit("preprocess-progress", t, {
                    mode: "indeterminate",
                    message: n.i18n("creatingAssembly")
                })
            });
            var o = function(e) {
                    var r = e.fileIDs,
                        o = e.options;
                    return n._createAssembly(r, t, o).then(function(e) {
                        if (n.opts.importFromUploadURLs) return n._reserveFiles(e, r)
                    }).then(function() {
                        r.forEach(function(e) {
                            var t = n.uppy.getFile(e);
                            n.uppy.emit("preprocess-complete", t)
                        })
                    }).catch(function(e) {
                        throw r.forEach(function(t) {
                            var r = n.uppy.getFile(t);
                            n.uppy.emit("preprocess-complete", r), n.uppy.emit("upload-error", r, e)
                        }), e
                    })
                },
                i = this.getPluginState().uploadsAssemblies;
            this.setPluginState({
                uploadsAssemblies: ___extends_174({}, i, (r = {}, r[t] = [], r))
            });
            var s = e.map(function(e) {
                return n.uppy.getFile(e)
            });
            return new _$AssemblyOptions_171(s, this.opts).build().then(function(e) {
                return Promise.all(e.map(o))
            }, function(t) {
                throw e.forEach(function(e) {
                    var r = n.uppy.getFile(e);
                    n.uppy.emit("preprocess-complete", r), n.uppy.emit("upload-error", r, t)
                }), t
            })
        }, o._afterUpload = function(e, t) {
            var r = this;
            e = e.filter(function(e) {
                return !e.error
            });
            var n = this.getPluginState();
            if (this.restored) return this.restored.then(function() {
                return r._afterUpload(e, t)
            });
            var o = n.uploadsAssemblies[t];
            if (!this._shouldWaitAfterUpload()) {
                o.forEach(function(e) {
                    r.activeAssemblies[e].close(), delete r.activeAssemblies[e]
                });
                var i = o.map(function(e) {
                    return r.getAssembly(e)
                });
                return this.uppy.addResultData(t, {
                    transloadit: i
                }), Promise.resolve()
            }
            if (0 === o.length) return this.uppy.addResultData(t, {
                transloadit: []
            }), Promise.resolve();
            var s = new _$TransloaditAssemblyWatcher_172(this.uppy, o);
            return e.forEach(function(e) {
                var t = r.uppy.getFile(e);
                r.uppy.emit("postprocess-progress", t, {
                    mode: "indeterminate",
                    message: r.i18n("encoding")
                })
            }), s.on("assembly-complete", function(e) {
                r.getAssemblyFiles(e).forEach(function(e) {
                    r.uppy.emit("postprocess-complete", e)
                })
            }), s.on("assembly-error", function(e, t) {
                r.getAssemblyFiles(e).forEach(function(e) {
                    r.uppy.emit("upload-error", e, t), r.uppy.emit("postprocess-complete", e)
                })
            }), s.promise.then(function() {
                var e = o.map(function(e) {
                        return r.getAssembly(e)
                    }),
                    n = ___extends_174({}, r.getPluginState().uploadsAssemblies);
                delete n[t], r.setPluginState({
                    uploadsAssemblies: n
                }), r.uppy.addResultData(t, {
                    transloadit: e
                })
            })
        }, o._onError = function(e, t) {
            var r = this;
            this.uppy.log("[Transloadit] _onError in upload " + t), this.uppy.log(e), this.getPluginState().uploadsAssemblies[t].forEach(function(e) {
                r.activeAssemblies[e] && r.activeAssemblies[e].close()
            })
        }, o._onTusError = function(e) {
            if (e && /^tus: /.test(e.message)) {
                var t = e.originalRequest && e.originalRequest.responseURL ? e.originalRequest.responseURL : null;
                this.client.submitError(e, {
                    url: t,
                    type: "TUS_ERROR"
                }).then(function(e) {})
            }
        }, o.install = function() {
            this.uppy.addPreProcessor(this._prepareUpload), this.uppy.addPostProcessor(this._afterUpload), this.uppy.on("error", this._onError), this.uppy.on("cancel-all", this._onCancelAll), this.uppy.on("upload-error", this._onTusError), this.opts.importFromUploadURLs ? this.uppy.on("upload-success", this._onFileUploadURLAvailable) : this.uppy.use(_$lib_178, {
                resume: !1,
                useFastRemoteRetry: !1,
                metaFields: ["assembly_url", "filename", "fieldname"],
                limit: this.opts.limit
            }), this.uppy.on("restore:get-data", this._getPersistentData), this.uppy.on("restored", this._onRestored), this.setPluginState({
                assemblies: {},
                uploadsAssemblies: {},
                files: {},
                results: []
            });
            var e = this.uppy.getState().capabilities;
            this.uppy.setState({
                capabilities: ___extends_174({}, e, {
                    individualCancellation: !1
                })
            })
        }, o.uninstall = function() {
            this.uppy.removePreProcessor(this._prepareUpload), this.uppy.removePostProcessor(this._afterUpload), this.uppy.off("error", this._onError), this.opts.importFromUploadURLs && this.uppy.off("upload-success", this._onFileUploadURLAvailable);
            var e = this.uppy.getState().capabilities;
            this.uppy.setState({
                capabilities: ___extends_174({}, e, {
                    individualCancellation: !0
                })
            })
        }, o.getAssembly = function(e) {
            return this.getPluginState().assemblies[e]
        }, o.getAssemblyFiles = function(e) {
            return this.uppy.getFiles().filter(function(t) {
                return t && t.transloadit && t.transloadit.assembly === e
            })
        }, n
    }(__Plugin_174), ___class_174.VERSION = _$package_176.version, _$lib_174 = ___temp_174, _$lib_174.COMPANION = COMPANION, _$lib_174.UPPY_SERVER = COMPANION, _$lib_174.COMPANION_PATTERN = /\.transloadit\.com$/;
    var _$lib_37 = {
        __esModule: !0
    };
    _$lib_37.default = getFormData, _$lib_37.getFieldData = getFieldData;
    var NODE_LIST_CLASSES = {
            "[object HTMLCollection]": !0,
            "[object NodeList]": !0,
            "[object RadioNodeList]": !0
        },
        IGNORED_ELEMENT_TYPES = {
            button: !0,
            fieldset: !0,
            reset: !0,
            submit: !0
        },
        CHECKED_INPUT_TYPES = {
            checkbox: !0,
            radio: !0
        },
        TRIM_RE = /^\s+|\s+$/g,
        __slice_37 = Array.prototype.slice,
        __toString_37 = Object.prototype.toString;

    function getFormData(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
            trim: !1
        };
        if (!e) throw new Error("A form is required by getFormData, was given form=" + e);
        for (var r = {}, n = void 0, o = [], i = {}, s = 0, a = e.elements.length; s < a; s++) {
            var l = e.elements[s];
            IGNORED_ELEMENT_TYPES[l.type] || l.disabled || (n = l.name || l.id) && !i[n] && (o.push(n), i[n] = !0)
        }
        for (var u = 0, c = o.length; u < c; u++) {
            var p = getFieldData(e, n = o[u], t);
            null != p && (r[n] = p)
        }
        return r
    }

    function getFieldData(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
            trim: !1
        };
        if (!e) throw new Error("A form is required by getFieldData, was given form=" + e);
        if (!t && "[object String]" !== __toString_37.call(t)) throw new Error("A field name is required by getFieldData, was given fieldName=" + t);
        var n = e.elements[t];
        if (!n || n.disabled) return null;
        if (!NODE_LIST_CLASSES[__toString_37.call(n)]) return getFormElementValue(n, r.trim);
        for (var o = [], i = !0, s = 0, a = n.length; s < a; s++)
            if (!n[s].disabled) {
                i && "radio" !== n[s].type && (i = !1);
                var l = getFormElementValue(n[s], r.trim);
                null != l && (o = o.concat(l))
            } return i && 1 === o.length ? o[0] : o.length > 0 ? o : null
    }

    function getFormElementValue(e, t) {
        var r = null,
            n = e.type;
        if ("select-one" === n) return e.options.length && (r = e.options[e.selectedIndex].value), r;
        if ("select-multiple" === n) {
            r = [];
            for (var o = 0, i = e.options.length; o < i; o++) e.options[o].selected && r.push(e.options[o].value);
            return 0 === r.length && (r = null), r
        }
        return "file" === n && "files" in e ? (e.multiple ? 0 === (r = __slice_37.call(e.files)).length && (r = null) : r = e.files[0], r) : (CHECKED_INPUT_TYPES[n] ? e.checked && (r = e.value) : r = t ? e.value.replace(TRIM_RE, "") : e.value, r)
    }
    getFormData.getFieldData = getFieldData;
    var _$package_129 = {
            version: "1.3.3"
        },
        ___class_128, ___temp_128;

    function ___extends_128() {
        return (___extends_128 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ___assertThisInitialized_128(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __Plugin_128 = _$lib_93.Plugin,
        __getFormData_128 = _$lib_37.default || _$lib_37,
        _$lib_128 = (___temp_128 = ___class_128 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).type = "acquirer", n.id = n.opts.id || "Form", n.title = "Form", n.opts = ___extends_128({}, {
                    target: null,
                    resultName: "uppyResult",
                    getMetaFromForm: !0,
                    addResultToForm: !0,
                    multipleResults: !1,
                    submitOnSuccess: !1,
                    triggerUploadOnSubmit: !1
                }, r), n.handleFormSubmit = n.handleFormSubmit.bind(___assertThisInitialized_128(n)), n.handleUploadStart = n.handleUploadStart.bind(___assertThisInitialized_128(n)), n.handleSuccess = n.handleSuccess.bind(___assertThisInitialized_128(n)), n.addResultToForm = n.addResultToForm.bind(___assertThisInitialized_128(n)), n.getMetaFromForm = n.getMetaFromForm.bind(___assertThisInitialized_128(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.handleUploadStart = function() {
                this.opts.getMetaFromForm && this.getMetaFromForm()
            }, o.handleSuccess = function(e) {
                this.opts.addResultToForm && this.addResultToForm(e), this.opts.submitOnSuccess && this.form.submit()
            }, o.handleFormSubmit = function(e) {
                var t = this;
                if (this.opts.triggerUploadOnSubmit) {
                    e.preventDefault();
                    var r = _$toArray_229(e.target.elements),
                        n = [];
                    r.forEach(function(e) {
                        ("BUTTON" === e.tagName || "INPUT" === e.tagName && "submit" === e.type) && !e.disabled && (e.disabled = !0, n.push(e))
                    }), this.uppy.upload().then(function() {
                        n.forEach(function(e) {
                            e.disabled = !1
                        })
                    }, function(e) {
                        return n.forEach(function(e) {
                            e.disabled = !1
                        }), Promise.reject(e)
                    }).catch(function(e) {
                        t.uppy.log(e.stack || e.message || e)
                    })
                }
            }, o.addResultToForm = function(e) {
                this.uppy.log("[Form] Adding result to the original form:"), this.uppy.log(e);
                var t = this.form.querySelector('[name="' + this.opts.resultName + '"]');
                if (t)
                    if (this.opts.multipleResults) {
                        var r;
                        try {
                            r = JSON.parse(t.value)
                        } catch (err) {}
                        Array.isArray(r) || (r = []), r.push(e), t.value = JSON.stringify(r)
                    } else t.value = JSON.stringify(e);
                else(t = document.createElement("input")).name = this.opts.resultName, t.type = "hidden", this.opts.multipleResults ? t.value = JSON.stringify([e]) : t.value = JSON.stringify(e), this.form.appendChild(t)
            }, o.getMetaFromForm = function() {
                var e = __getFormData_128(this.form);
                delete e[this.opts.resultName], this.uppy.setMeta(e)
            }, o.install = function() {
                this.form = _$findDOMElement_204(this.opts.target), this.form && "FORM" === this.form.nodeName ? (this.form.addEventListener("submit", this.handleFormSubmit), this.uppy.on("upload", this.handleUploadStart), this.uppy.on("complete", this.handleSuccess)) : this.uppy.log("Form plugin requires a <form> target element passed in options to operate, none was found", "error")
            }, o.uninstall = function() {
                this.form.removeEventListener("submit", this.handleFormSubmit), this.uppy.off("upload", this.handleUploadStart), this.uppy.off("complete", this.handleSuccess)
            }, n
        }(__Plugin_128), ___class_128.VERSION = _$package_129.version, ___temp_128),
        _$ServiceWorkerStore_132 = {},
        isSupported = "undefined" != typeof navigator && "serviceWorker" in navigator,
        ServiceWorkerStore = function() {
            function e(e) {
                this.ready = new Promise(function(e, t) {
                    isSupported ? navigator.serviceWorker.controller ? e() : navigator.serviceWorker.addEventListener("controllerchange", function() {
                        e()
                    }) : t(new Error("Unsupported"))
                }), this.name = e.storeName
            }
            var t = e.prototype;
            return t.list = function() {
                var e = this,
                    t = {},
                    r = new Promise(function(e, r) {
                        t.resolve = e, t.reject = r
                    });
                console.log("Loading stored blobs from Service Worker");
                var n = function r(n) {
                    if (n.data.store === e.name) switch (n.data.type) {
                        case "uppy/ALL_FILES":
                            t.resolve(n.data.files), navigator.serviceWorker.removeEventListener("message", r)
                    }
                };
                return this.ready.then(function() {
                    navigator.serviceWorker.addEventListener("message", n), navigator.serviceWorker.controller.postMessage({
                        type: "uppy/GET_FILES",
                        store: e.name
                    })
                }), r
            }, t.put = function(e) {
                var t = this;
                return this.ready.then(function() {
                    navigator.serviceWorker.controller.postMessage({
                        type: "uppy/ADD_FILE",
                        store: t.name,
                        file: e
                    })
                })
            }, t.delete = function(e) {
                var t = this;
                return this.ready.then(function() {
                    navigator.serviceWorker.controller.postMessage({
                        type: "uppy/REMOVE_FILE",
                        store: t.name,
                        fileID: e
                    })
                })
            }, e
        }();
    ServiceWorkerStore.isSupported = isSupported, _$ServiceWorkerStore_132 = ServiceWorkerStore;
    var _$IndexedDBStore_130 = {};

    function ___extends_130() {
        return (___extends_130 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }
    var indexedDB = "undefined" != typeof window && (window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB),
        __isSupported_130 = !!indexedDB,
        DB_NAME = "uppy-blobs",
        STORE_NAME = "files",
        DEFAULT_EXPIRY = 864e5,
        DB_VERSION = 3;

    function connect(e) {
        var t = indexedDB.open(e, DB_VERSION);
        return new Promise(function(e, r) {
            t.onupgradeneeded = function(t) {
                var r = t.target.result,
                    n = t.currentTarget.transaction;
                if (t.oldVersion < 2 && r.createObjectStore(STORE_NAME, {
                        keyPath: "id"
                    }).createIndex("store", "store", {
                        unique: !1
                    }), t.oldVersion < 3) {
                    var o = n.objectStore(STORE_NAME);
                    o.createIndex("expires", "expires", {
                        unique: !1
                    }), o.openCursor().onsuccess = function(e) {
                        var t = e.target.result;
                        if (t) {
                            var r = t.value;
                            r.expires = Date.now() + DEFAULT_EXPIRY, t.update(r)
                        }
                    }
                }
                n.oncomplete = function() {
                    e(r)
                }
            }, t.onsuccess = function(t) {
                e(t.target.result)
            }, t.onerror = r
        })
    }

    function waitForRequest(e) {
        return new Promise(function(t, r) {
            e.onsuccess = function(e) {
                t(e.target.result)
            }, e.onerror = r
        })
    }
    var cleanedUp = !1,
        IndexedDBStore = function() {
            function e(t) {
                var r = this;
                this.opts = ___extends_130({
                    dbName: DB_NAME,
                    storeName: "default",
                    expires: DEFAULT_EXPIRY,
                    maxFileSize: 10485760,
                    maxTotalSize: 314572800
                }, t), this.name = this.opts.storeName;
                var n = function() {
                    return connect(r.opts.dbName)
                };
                cleanedUp ? this.ready = n() : (cleanedUp = !0, this.ready = e.cleanup().then(n, n))
            }
            var t = e.prototype;
            return t.key = function(e) {
                return this.name + "!" + e
            }, t.list = function() {
                var e = this;
                return this.ready.then(function(t) {
                    return waitForRequest(t.transaction([STORE_NAME], "readonly").objectStore(STORE_NAME).index("store").getAll(IDBKeyRange.only(e.name)))
                }).then(function(e) {
                    var t = {};
                    return e.forEach(function(e) {
                        t[e.fileID] = e.data
                    }), t
                })
            }, t.get = function(e) {
                var t = this;
                return this.ready.then(function(r) {
                    return waitForRequest(r.transaction([STORE_NAME], "readonly").objectStore(STORE_NAME).get(t.key(e)))
                }).then(function(e) {
                    return {
                        id: e.data.fileID,
                        data: e.data.data
                    }
                })
            }, t.getSize = function() {
                var e = this;
                return this.ready.then(function(t) {
                    var r = t.transaction([STORE_NAME], "readonly").objectStore(STORE_NAME).index("store").openCursor(IDBKeyRange.only(e.name));
                    return new Promise(function(e, t) {
                        var n = 0;
                        r.onsuccess = function(t) {
                            var r = t.target.result;
                            r ? (n += r.value.data.size, r.continue()) : e(n)
                        }, r.onerror = function() {
                            t(new Error("Could not retrieve stored blobs size"))
                        }
                    })
                })
            }, t.put = function(e) {
                var t = this;
                return e.data.size > this.opts.maxFileSize ? Promise.reject(new Error("File is too big to store.")) : this.getSize().then(function(e) {
                    return e > t.opts.maxTotalSize ? Promise.reject(new Error("No space left")) : t.ready
                }).then(function(r) {
                    return waitForRequest(r.transaction([STORE_NAME], "readwrite").objectStore(STORE_NAME).add({
                        id: t.key(e.id),
                        fileID: e.id,
                        store: t.name,
                        expires: Date.now() + t.opts.expires,
                        data: e.data
                    }))
                })
            }, t.delete = function(e) {
                var t = this;
                return this.ready.then(function(r) {
                    return waitForRequest(r.transaction([STORE_NAME], "readwrite").objectStore(STORE_NAME).delete(t.key(e)))
                })
            }, e.cleanup = function() {
                return connect(DB_NAME).then(function(e) {
                    var t = e.transaction([STORE_NAME], "readwrite").objectStore(STORE_NAME).index("expires").openCursor(IDBKeyRange.upperBound(Date.now()));
                    return new Promise(function(r, n) {
                        t.onsuccess = function(t) {
                            var n = t.target.result;
                            if (n) {
                                var o = n.value;
                                console.log("[IndexedDBStore] Deleting record", o.fileID, "of size", _$prettyBytes_225(o.data.size), "- expired on", new Date(o.expires)), n.delete(), n.continue()
                            } else r(e)
                        }, t.onerror = n
                    })
                }).then(function(e) {
                    e.close()
                })
            }, e
        }();

    function ___extends_131() {
        return (___extends_131 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function maybeParse(e) {
        try {
            return JSON.parse(e)
        } catch (err) {
            return null
        }
    }
    IndexedDBStore.isSupported = __isSupported_130, _$IndexedDBStore_130 = IndexedDBStore;
    var __cleanedUp_131 = !1,
        _$MetaDataStore_131 = function() {
            function e(t) {
                this.opts = ___extends_131({
                    expires: 864e5
                }, t), this.name = "uppyState:" + t.storeName, __cleanedUp_131 || (__cleanedUp_131 = !0, e.cleanup())
            }
            var t = e.prototype;
            return t.load = function() {
                var e = localStorage.getItem(this.name);
                if (!e) return null;
                var t = maybeParse(e);
                return t ? t.metadata ? t.metadata : (this.save(t), t) : null
            }, t.save = function(e) {
                var t = Date.now() + this.opts.expires,
                    r = JSON.stringify({
                        metadata: e,
                        expires: t
                    });
                localStorage.setItem(this.name, r)
            }, e.cleanup = function() {
                var e = function() {
                        for (var e = [], t = 0; t < localStorage.length; t++) {
                            var r = localStorage.key(t);
                            /^uppyState:/.test(r) && e.push(r.slice("uppyState:".length))
                        }
                        return e
                    }(),
                    t = Date.now();
                e.forEach(function(e) {
                    var r = localStorage.getItem("uppyState:" + e);
                    if (!r) return null;
                    var n = maybeParse(r);
                    if (!n) return null;
                    n.expires && n.expires < t && localStorage.removeItem("uppyState:" + e)
                })
            }, e
        }(),
        _$package_134 = {
            version: "1.3.2"
        },
        ___class_133, ___temp_133;

    function ___extends_133() {
        return (___extends_133 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ___assertThisInitialized_133(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __Plugin_133 = _$lib_93.Plugin,
        _$lib_133 = (___temp_133 = ___class_133 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).type = "debugger", n.id = n.opts.id || "GoldenRetriever", n.title = "Golden Retriever", n.opts = ___extends_133({}, {
                    expires: 864e5,
                    serviceWorker: !1
                }, r), n.MetaDataStore = new _$MetaDataStore_131({
                    expires: n.opts.expires,
                    storeName: t.getID()
                }), n.ServiceWorkerStore = null, n.opts.serviceWorker && (n.ServiceWorkerStore = new _$ServiceWorkerStore_132({
                    storeName: t.getID()
                })), n.IndexedDBStore = new _$IndexedDBStore_130(___extends_133({
                    expires: n.opts.expires
                }, n.opts.indexedDB || {}, {
                    storeName: t.getID()
                })), n.saveFilesStateToLocalStorage = n.saveFilesStateToLocalStorage.bind(___assertThisInitialized_133(n)), n.loadFilesStateFromLocalStorage = n.loadFilesStateFromLocalStorage.bind(___assertThisInitialized_133(n)), n.loadFileBlobsFromServiceWorker = n.loadFileBlobsFromServiceWorker.bind(___assertThisInitialized_133(n)), n.loadFileBlobsFromIndexedDB = n.loadFileBlobsFromIndexedDB.bind(___assertThisInitialized_133(n)), n.onBlobsLoaded = n.onBlobsLoaded.bind(___assertThisInitialized_133(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.loadFilesStateFromLocalStorage = function() {
                var e = this.MetaDataStore.load();
                e && (this.uppy.log("[GoldenRetriever] Recovered some state from Local Storage"), this.uppy.setState({
                    currentUploads: e.currentUploads || {},
                    files: e.files || {}
                }), this.savedPluginData = e.pluginData)
            }, o.getWaitingFiles = function() {
                var e = {};
                return this.uppy.getFiles().forEach(function(t) {
                    t.progress && t.progress.uploadStarted || (e[t.id] = t)
                }), e
            }, o.getUploadingFiles = function() {
                var e = this,
                    t = {},
                    r = this.uppy.getState().currentUploads;
                return r && Object.keys(r).forEach(function(n) {
                    r[n].fileIDs.forEach(function(r) {
                        t[r] = e.uppy.getFile(r)
                    })
                }), t
            }, o.saveFilesStateToLocalStorage = function() {
                var e = ___extends_133(this.getWaitingFiles(), this.getUploadingFiles()),
                    t = {};
                this.uppy.emit("restore:get-data", function(e) {
                    ___extends_133(t, e)
                });
                var r = this.uppy.getState().currentUploads;
                this.MetaDataStore.save({
                    currentUploads: r,
                    files: e,
                    pluginData: t
                })
            }, o.loadFileBlobsFromServiceWorker = function() {
                var e = this;
                this.ServiceWorkerStore.list().then(function(t) {
                    var r = Object.keys(t).length;
                    return r === e.uppy.getFiles().length ? (e.uppy.log("[GoldenRetriever] Successfully recovered " + r + " blobs from Service Worker!"), e.uppy.info("Successfully recovered " + r + " files", "success", 3e3), e.onBlobsLoaded(t)) : (e.uppy.log("[GoldenRetriever] No blobs found in Service Worker, trying IndexedDB now..."), e.loadFileBlobsFromIndexedDB())
                }).catch(function(t) {
                    e.uppy.log("[GoldenRetriever] Failed to recover blobs from Service Worker", "warning"), e.uppy.log(t)
                })
            }, o.loadFileBlobsFromIndexedDB = function() {
                var e = this;
                this.IndexedDBStore.list().then(function(t) {
                    var r = Object.keys(t).length;
                    if (r > 0) return e.uppy.log("[GoldenRetriever] Successfully recovered " + r + " blobs from IndexedDB!"), e.uppy.info("Successfully recovered " + r + " files", "success", 3e3), e.onBlobsLoaded(t);
                    e.uppy.log("[GoldenRetriever] No blobs found in IndexedDB")
                }).catch(function(t) {
                    e.uppy.log("[GoldenRetriever] Failed to recover blobs from IndexedDB", "warning"), e.uppy.log(t)
                })
            }, o.onBlobsLoaded = function(e) {
                var t = this,
                    r = [],
                    n = ___extends_133({}, this.uppy.getState().files);
                Object.keys(e).forEach(function(o) {
                    var i = t.uppy.getFile(o);
                    if (i) {
                        var s = ___extends_133({}, i, {
                            data: e[o],
                            isRestored: !0
                        });
                        n[o] = s
                    } else r.push(o)
                }), this.uppy.setState({
                    files: n
                }), this.uppy.emit("restored", this.savedPluginData), r.length && this.deleteBlobs(r).then(function() {
                    t.uppy.log("[GoldenRetriever] Cleaned up " + r.length + " old files")
                }).catch(function(e) {
                    t.uppy.log("[GoldenRetriever] Could not clean up " + r.length + " old files", "warning"), t.uppy.log(e)
                })
            }, o.deleteBlobs = function(e) {
                var t = this,
                    r = [];
                return e.forEach(function(e) {
                    t.ServiceWorkerStore && r.push(t.ServiceWorkerStore.delete(e)), t.IndexedDBStore && r.push(t.IndexedDBStore.delete(e))
                }), Promise.all(r)
            }, o.install = function() {
                var e = this;
                this.loadFilesStateFromLocalStorage(), this.uppy.getFiles().length > 0 ? this.ServiceWorkerStore ? (this.uppy.log("[GoldenRetriever] Attempting to load files from Service Worker..."), this.loadFileBlobsFromServiceWorker()) : (this.uppy.log("[GoldenRetriever] Attempting to load files from Indexed DB..."), this.loadFileBlobsFromIndexedDB()) : (this.uppy.log("[GoldenRetriever] No files need to be loaded, only restoring processing state..."), this.onBlobsLoaded([])), this.uppy.on("file-added", function(t) {
                    t.isRemote || (e.ServiceWorkerStore && e.ServiceWorkerStore.put(t).catch(function(t) {
                        e.uppy.log("[GoldenRetriever] Could not store file", "warning"), e.uppy.log(t)
                    }), e.IndexedDBStore.put(t).catch(function(t) {
                        e.uppy.log("[GoldenRetriever] Could not store file", "warning"), e.uppy.log(t)
                    }))
                }), this.uppy.on("file-removed", function(t) {
                    e.ServiceWorkerStore && e.ServiceWorkerStore.delete(t.id).catch(function(t) {
                        e.uppy.log("[GoldenRetriever] Failed to remove file", "warning"), e.uppy.log(t)
                    }), e.IndexedDBStore.delete(t.id).catch(function(t) {
                        e.uppy.log("[GoldenRetriever] Failed to remove file", "warning"), e.uppy.log(t)
                    })
                }), this.uppy.on("complete", function(t) {
                    var r = t.successful,
                        n = r.map(function(e) {
                            return e.id
                        });
                    e.deleteBlobs(n).then(function() {
                        e.uppy.log("[GoldenRetriever] Removed " + r.length + " files that finished uploading")
                    }).catch(function(t) {
                        e.uppy.log("[GoldenRetriever] Could not remove " + r.length + " files that finished uploading", "warning"), e.uppy.log(t)
                    })
                }), this.uppy.on("state-update", this.saveFilesStateToLocalStorage), this.uppy.on("restored", function() {
                    var t = e.uppy.getState().currentUploads;
                    t && Object.keys(t).forEach(function(r) {
                        e.uppy.restore(r, t[r])
                    })
                })
            }, n
        }(__Plugin_133), ___class_133.VERSION = _$package_134.version, ___temp_133),
        _$package_158 = {
            version: "1.3.1"
        },
        ___class_157, ___temp_157;

    function ___extends_157() {
        return (___extends_157 = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function ___assertThisInitialized_157(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var __Plugin_157 = _$lib_93.Plugin,
        _$lib_157 = (___temp_157 = ___class_157 = function(e) {
            var t, r;

            function n(t, r) {
                var n;
                return (n = e.call(this, t, r) || this).type = "debugger", n.id = n.opts.id || "ReduxDevTools", n.title = "Redux DevTools", n.opts = ___extends_157({}, {}, r), n.handleStateChange = n.handleStateChange.bind(___assertThisInitialized_157(n)), n.initDevTools = n.initDevTools.bind(___assertThisInitialized_157(n)), n
            }
            r = e, (t = n).prototype = Object.create(r.prototype), t.prototype.constructor = t, t.__proto__ = r;
            var o = n.prototype;
            return o.handleStateChange = function(e, t, r) {
                this.devTools.send("UPPY_STATE_UPDATE", t)
            }, o.initDevTools = function() {
                var e = this;
                this.devTools = window.devToolsExtension.connect(), this.devToolsUnsubscribe = this.devTools.subscribe(function(t) {
                    if ("DISPATCH" === t.type) switch (console.log(t.payload.type), t.payload.type) {
                        case "RESET":
                            return void e.uppy.reset();
                        case "IMPORT_STATE":
                            var r = t.payload.nextLiftedState.computedStates;
                            return e.uppy.store.state = ___extends_157({}, e.uppy.getState(), r[r.length - 1].state), void e.uppy.updateAll(e.uppy.getState());
                        case "JUMP_TO_STATE":
                        case "JUMP_TO_ACTION":
                            e.uppy.store.state = ___extends_157({}, e.uppy.getState(), JSON.parse(t.state)), e.uppy.updateAll(e.uppy.getState())
                    }
                })
            }, o.install = function() {
                this.withDevTools = "undefined" != typeof window && window.__REDUX_DEVTOOLS_EXTENSION__, this.withDevTools && (this.initDevTools(), this.uppy.on("state-update", this.handleStateChange))
            }, o.uninstall = function() {
                this.withDevTools && (this.devToolsUnsubscribe(), this.uppy.off("state-update", this.handleStateUpdate))
            }, n
        }(__Plugin_157), ___class_157.VERSION = _$package_158.version, ___temp_157),
        _$uppy_241 = {};
    _$uppy_241.Core = _$lib_93, _$uppy_241.debugLogger = _$uppy_241.Core.debugLogger, _$uppy_241.server = _$lib_89, _$uppy_241.views = {
        ProviderView: _$lib_155
    }, _$uppy_241.DefaultStore = _$lib_163, _$uppy_241.ReduxStore = _$lib_165, _$uppy_241.Dashboard = _$lib_112, _$uppy_241.DragDrop = _$lib_122, _$uppy_241.FileInput = _$lib_126, _$uppy_241.Informer = _$lib_138, _$uppy_241.ProgressBar = _$lib_142, _$uppy_241.StatusBar = _$lib_161, _$uppy_241.Dropbox = _$lib_124, _$uppy_241.GoogleDrive = _$lib_136, _$uppy_241.Instagram = _$lib_140, _$uppy_241.Url = _$lib_192, _$uppy_241.Webcam = _$lib_235, _$uppy_241.AwsS3 = _$lib_83, _$uppy_241.AwsS3Multipart = _$lib_81, _$uppy_241.Transloadit = _$lib_174, _$uppy_241.Tus = _$lib_178, _$uppy_241.XHRUpload = _$lib_238, _$uppy_241.Form = _$lib_128, _$uppy_241.GoldenRetriever = _$lib_133, _$uppy_241.ReduxDevTools = _$lib_157, _$uppy_241.ThumbnailGenerator = _$lib_168, _$uppy_241.locales = {};
    var _$bundle_240 = {};
    return _$bundle_240 = _$uppy_241, _$bundle_240
});
//# sourceMappingURL=uppy.min.js.map