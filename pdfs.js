var pako = require("pako");
var xmldom = require("xmldom");
require("text-encoding");
!(function(t) {
	if ("object" == typeof exports && "undefined" != typeof module)
		module.exports = t();
	else if ("function" == typeof define && define.amd) define([], t);
	else {
		("undefined" != typeof window
			? window
			: "undefined" != typeof global
			? global
			: "undefined" != typeof self
			? self
			: this
		).pako = t();
	}
})(function() {
	return (function t(e, a, i) {
		function n(s, o) {
			if (!a[s]) {
				if (!e[s]) {
					var l = "function" == typeof require && require;
					if (!o && l) return l(s, !0);
					if (r) return r(s, !0);
					var h = new Error("Cannot find module '" + s + "'");
					throw ((h.code = "MODULE_NOT_FOUND"), h);
				}
				var d = (a[s] = { exports: {} });
				e[s][0].call(
					d.exports,
					function(t) {
						var a = e[s][1][t];
						return n(a || t);
					},
					d,
					d.exports,
					t,
					e,
					a,
					i
				);
			}
			return a[s].exports;
		}
		for (
			var r = "function" == typeof require && require, s = 0;
			s < i.length;
			s++
		)
			n(i[s]);
		return n;
	})(
		{
			1: [
				function(t, e, a) {
					"use strict";
					function i(t) {
						if (!(this instanceof i)) return new i(t);
						this.options = s.assign(
							{
								level: _,
								method: c,
								chunkSize: 16384,
								windowBits: 15,
								memLevel: 8,
								strategy: u,
								to: ""
							},
							t || {}
						);
						var e = this.options;
						e.raw && e.windowBits > 0
							? (e.windowBits = -e.windowBits)
							: e.gzip &&
							  e.windowBits > 0 &&
							  e.windowBits < 16 &&
							  (e.windowBits += 16),
							(this.err = 0),
							(this.msg = ""),
							(this.ended = !1),
							(this.chunks = []),
							(this.strm = new h()),
							(this.strm.avail_out = 0);
						var a = r.deflateInit2(
							this.strm,
							e.level,
							e.method,
							e.windowBits,
							e.memLevel,
							e.strategy
						);
						if (a !== f) throw new Error(l[a]);
						if (
							(e.header &&
								r.deflateSetHeader(this.strm, e.header),
							e.dictionary)
						) {
							var n;
							if (
								((n =
									"string" == typeof e.dictionary
										? o.string2buf(e.dictionary)
										: "[object ArrayBuffer]" ===
										  d.call(e.dictionary)
										? new Uint8Array(e.dictionary)
										: e.dictionary),
								(a = r.deflateSetDictionary(this.strm, n)) !==
									f)
							)
								throw new Error(l[a]);
							this._dict_set = !0;
						}
					}
					function n(t, e) {
						var a = new i(e);
						if ((a.push(t, !0), a.err)) throw a.msg || l[a.err];
						return a.result;
					}
					var r = t("./zlib/deflate"),
						s = t("./utils/common"),
						o = t("./utils/strings"),
						l = t("./zlib/messages"),
						h = t("./zlib/zstream"),
						d = Object.prototype.toString,
						f = 0,
						_ = -1,
						u = 0,
						c = 8;
					(i.prototype.push = function(t, e) {
						var a,
							i,
							n = this.strm,
							l = this.options.chunkSize;
						if (this.ended) return !1;
						(i = e === ~~e ? e : !0 === e ? 4 : 0),
							"string" == typeof t
								? (n.input = o.string2buf(t))
								: "[object ArrayBuffer]" === d.call(t)
								? (n.input = new Uint8Array(t))
								: (n.input = t),
							(n.next_in = 0),
							(n.avail_in = n.input.length);
						do {
							if (
								(0 === n.avail_out &&
									((n.output = new s.Buf8(l)),
									(n.next_out = 0),
									(n.avail_out = l)),
								1 !== (a = r.deflate(n, i)) && a !== f)
							)
								return this.onEnd(a), (this.ended = !0), !1;
							(0 !== n.avail_out &&
								(0 !== n.avail_in || (4 !== i && 2 !== i))) ||
								("string" === this.options.to
									? this.onData(
											o.buf2binstring(
												s.shrinkBuf(
													n.output,
													n.next_out
												)
											)
									  )
									: this.onData(
											s.shrinkBuf(n.output, n.next_out)
									  ));
						} while (
							(n.avail_in > 0 || 0 === n.avail_out) &&
							1 !== a
						);
						return 4 === i
							? ((a = r.deflateEnd(this.strm)),
							  this.onEnd(a),
							  (this.ended = !0),
							  a === f)
							: 2 !== i || (this.onEnd(f), (n.avail_out = 0), !0);
					}),
						(i.prototype.onData = function(t) {
							this.chunks.push(t);
						}),
						(i.prototype.onEnd = function(t) {
							t === f &&
								("string" === this.options.to
									? (this.result = this.chunks.join(""))
									: (this.result = s.flattenChunks(
											this.chunks
									  ))),
								(this.chunks = []),
								(this.err = t),
								(this.msg = this.strm.msg);
						}),
						(a.Deflate = i),
						(a.deflate = n),
						(a.deflateRaw = function(t, e) {
							return (e = e || {}), (e.raw = !0), n(t, e);
						}),
						(a.gzip = function(t, e) {
							return (e = e || {}), (e.gzip = !0), n(t, e);
						});
				},
				{
					"./utils/common": 3,
					"./utils/strings": 4,
					"./zlib/deflate": 8,
					"./zlib/messages": 13,
					"./zlib/zstream": 15
				}
			],
			2: [
				function(t, e, a) {
					"use strict";
					function i(t) {
						if (!(this instanceof i)) return new i(t);
						this.options = s.assign(
							{ chunkSize: 16384, windowBits: 0, to: "" },
							t || {}
						);
						var e = this.options;
						e.raw &&
							e.windowBits >= 0 &&
							e.windowBits < 16 &&
							((e.windowBits = -e.windowBits),
							0 === e.windowBits && (e.windowBits = -15)),
							!(e.windowBits >= 0 && e.windowBits < 16) ||
								(t && t.windowBits) ||
								(e.windowBits += 32),
							e.windowBits > 15 &&
								e.windowBits < 48 &&
								0 == (15 & e.windowBits) &&
								(e.windowBits |= 15),
							(this.err = 0),
							(this.msg = ""),
							(this.ended = !1),
							(this.chunks = []),
							(this.strm = new d()),
							(this.strm.avail_out = 0);
						var a = r.inflateInit2(this.strm, e.windowBits);
						if (a !== l.Z_OK) throw new Error(h[a]);
						(this.header = new f()),
							r.inflateGetHeader(this.strm, this.header);
					}
					function n(t, e) {
						var a = new i(e);
						if ((a.push(t, !0), a.err)) throw a.msg || h[a.err];
						return a.result;
					}
					var r = t("./zlib/inflate"),
						s = t("./utils/common"),
						o = t("./utils/strings"),
						l = t("./zlib/constants"),
						h = t("./zlib/messages"),
						d = t("./zlib/zstream"),
						f = t("./zlib/gzheader"),
						_ = Object.prototype.toString;
					(i.prototype.push = function(t, e) {
						var a,
							i,
							n,
							h,
							d,
							f,
							u = this.strm,
							c = this.options.chunkSize,
							b = this.options.dictionary,
							g = !1;
						if (this.ended) return !1;
						(i =
							e === ~~e
								? e
								: !0 === e
								? l.Z_FINISH
								: l.Z_NO_FLUSH),
							"string" == typeof t
								? (u.input = o.binstring2buf(t))
								: "[object ArrayBuffer]" === _.call(t)
								? (u.input = new Uint8Array(t))
								: (u.input = t),
							(u.next_in = 0),
							(u.avail_in = u.input.length);
						do {
							if (
								(0 === u.avail_out &&
									((u.output = new s.Buf8(c)),
									(u.next_out = 0),
									(u.avail_out = c)),
								(a = r.inflate(u, l.Z_NO_FLUSH)) ===
									l.Z_NEED_DICT &&
									b &&
									((f =
										"string" == typeof b
											? o.string2buf(b)
											: "[object ArrayBuffer]" ===
											  _.call(b)
											? new Uint8Array(b)
											: b),
									(a = r.inflateSetDictionary(this.strm, f))),
								a === l.Z_BUF_ERROR &&
									!0 === g &&
									((a = l.Z_OK), (g = !1)),
								a !== l.Z_STREAM_END && a !== l.Z_OK)
							)
								return this.onEnd(a), (this.ended = !0), !1;
							u.next_out &&
								((0 !== u.avail_out &&
									a !== l.Z_STREAM_END &&
									(0 !== u.avail_in ||
										(i !== l.Z_FINISH &&
											i !== l.Z_SYNC_FLUSH))) ||
									("string" === this.options.to
										? ((n = o.utf8border(
												u.output,
												u.next_out
										  )),
										  (h = u.next_out - n),
										  (d = o.buf2string(u.output, n)),
										  (u.next_out = h),
										  (u.avail_out = c - h),
										  h &&
												s.arraySet(
													u.output,
													u.output,
													n,
													h,
													0
												),
										  this.onData(d))
										: this.onData(
												s.shrinkBuf(
													u.output,
													u.next_out
												)
										  ))),
								0 === u.avail_in &&
									0 === u.avail_out &&
									(g = !0);
						} while (
							(u.avail_in > 0 || 0 === u.avail_out) &&
							a !== l.Z_STREAM_END
						);
						return (
							a === l.Z_STREAM_END && (i = l.Z_FINISH),
							i === l.Z_FINISH
								? ((a = r.inflateEnd(this.strm)),
								  this.onEnd(a),
								  (this.ended = !0),
								  a === l.Z_OK)
								: i !== l.Z_SYNC_FLUSH ||
								  (this.onEnd(l.Z_OK), (u.avail_out = 0), !0)
						);
					}),
						(i.prototype.onData = function(t) {
							this.chunks.push(t);
						}),
						(i.prototype.onEnd = function(t) {
							t === l.Z_OK &&
								("string" === this.options.to
									? (this.result = this.chunks.join(""))
									: (this.result = s.flattenChunks(
											this.chunks
									  ))),
								(this.chunks = []),
								(this.err = t),
								(this.msg = this.strm.msg);
						}),
						(a.Inflate = i),
						(a.inflate = n),
						(a.inflateRaw = function(t, e) {
							return (e = e || {}), (e.raw = !0), n(t, e);
						}),
						(a.ungzip = n);
				},
				{
					"./utils/common": 3,
					"./utils/strings": 4,
					"./zlib/constants": 6,
					"./zlib/gzheader": 9,
					"./zlib/inflate": 11,
					"./zlib/messages": 13,
					"./zlib/zstream": 15
				}
			],
			3: [
				function(t, e, a) {
					"use strict";
					function i(t, e) {
						return Object.prototype.hasOwnProperty.call(t, e);
					}
					var n =
						"undefined" != typeof Uint8Array &&
						"undefined" != typeof Uint16Array &&
						"undefined" != typeof Int32Array;
					(a.assign = function(t) {
						for (
							var e = Array.prototype.slice.call(arguments, 1);
							e.length;

						) {
							var a = e.shift();
							if (a) {
								if ("object" != typeof a)
									throw new TypeError(
										a + "must be non-object"
									);
								for (var n in a) i(a, n) && (t[n] = a[n]);
							}
						}
						return t;
					}),
						(a.shrinkBuf = function(t, e) {
							return t.length === e
								? t
								: t.subarray
								? t.subarray(0, e)
								: ((t.length = e), t);
						});
					var r = {
							arraySet: function(t, e, a, i, n) {
								if (e.subarray && t.subarray)
									t.set(e.subarray(a, a + i), n);
								else
									for (var r = 0; r < i; r++)
										t[n + r] = e[a + r];
							},
							flattenChunks: function(t) {
								var e, a, i, n, r, s;
								for (i = 0, e = 0, a = t.length; e < a; e++)
									i += t[e].length;
								for (
									s = new Uint8Array(i),
										n = 0,
										e = 0,
										a = t.length;
									e < a;
									e++
								)
									(r = t[e]), s.set(r, n), (n += r.length);
								return s;
							}
						},
						s = {
							arraySet: function(t, e, a, i, n) {
								for (var r = 0; r < i; r++) t[n + r] = e[a + r];
							},
							flattenChunks: function(t) {
								return [].concat.apply([], t);
							}
						};
					(a.setTyped = function(t) {
						t
							? ((a.Buf8 = Uint8Array),
							  (a.Buf16 = Uint16Array),
							  (a.Buf32 = Int32Array),
							  a.assign(a, r))
							: ((a.Buf8 = Array),
							  (a.Buf16 = Array),
							  (a.Buf32 = Array),
							  a.assign(a, s));
					}),
						a.setTyped(n);
				},
				{}
			],
			4: [
				function(t, e, a) {
					"use strict";
					function i(t, e) {
						if (
							e < 65537 &&
							((t.subarray && s) || (!t.subarray && r))
						)
							return String.fromCharCode.apply(
								null,
								n.shrinkBuf(t, e)
							);
						for (var a = "", i = 0; i < e; i++)
							a += String.fromCharCode(t[i]);
						return a;
					}
					var n = t("./common"),
						r = !0,
						s = !0;
					try {
						String.fromCharCode.apply(null, [0]);
					} catch (t) {
						r = !1;
					}
					try {
						String.fromCharCode.apply(null, new Uint8Array(1));
					} catch (t) {
						s = !1;
					}
					for (var o = new n.Buf8(256), l = 0; l < 256; l++)
						o[l] =
							l >= 252
								? 6
								: l >= 248
								? 5
								: l >= 240
								? 4
								: l >= 224
								? 3
								: l >= 192
								? 2
								: 1;
					(o[254] = o[254] = 1),
						(a.string2buf = function(t) {
							var e,
								a,
								i,
								r,
								s,
								o = t.length,
								l = 0;
							for (r = 0; r < o; r++)
								55296 == (64512 & (a = t.charCodeAt(r))) &&
									r + 1 < o &&
									56320 ==
										(64512 & (i = t.charCodeAt(r + 1))) &&
									((a =
										65536 +
										((a - 55296) << 10) +
										(i - 56320)),
									r++),
									(l +=
										a < 128
											? 1
											: a < 2048
											? 2
											: a < 65536
											? 3
											: 4);
							for (e = new n.Buf8(l), s = 0, r = 0; s < l; r++)
								55296 == (64512 & (a = t.charCodeAt(r))) &&
									r + 1 < o &&
									56320 ==
										(64512 & (i = t.charCodeAt(r + 1))) &&
									((a =
										65536 +
										((a - 55296) << 10) +
										(i - 56320)),
									r++),
									a < 128
										? (e[s++] = a)
										: a < 2048
										? ((e[s++] = 192 | (a >>> 6)),
										  (e[s++] = 128 | (63 & a)))
										: a < 65536
										? ((e[s++] = 224 | (a >>> 12)),
										  (e[s++] = 128 | ((a >>> 6) & 63)),
										  (e[s++] = 128 | (63 & a)))
										: ((e[s++] = 240 | (a >>> 18)),
										  (e[s++] = 128 | ((a >>> 12) & 63)),
										  (e[s++] = 128 | ((a >>> 6) & 63)),
										  (e[s++] = 128 | (63 & a)));
							return e;
						}),
						(a.buf2binstring = function(t) {
							return i(t, t.length);
						}),
						(a.binstring2buf = function(t) {
							for (
								var e = new n.Buf8(t.length),
									a = 0,
									i = e.length;
								a < i;
								a++
							)
								e[a] = t.charCodeAt(a);
							return e;
						}),
						(a.buf2string = function(t, e) {
							var a,
								n,
								r,
								s,
								l = e || t.length,
								h = new Array(2 * l);
							for (n = 0, a = 0; a < l; )
								if ((r = t[a++]) < 128) h[n++] = r;
								else if ((s = o[r]) > 4)
									(h[n++] = 65533), (a += s - 1);
								else {
									for (
										r &= 2 === s ? 31 : 3 === s ? 15 : 7;
										s > 1 && a < l;

									)
										(r = (r << 6) | (63 & t[a++])), s--;
									s > 1
										? (h[n++] = 65533)
										: r < 65536
										? (h[n++] = r)
										: ((r -= 65536),
										  (h[n++] = 55296 | ((r >> 10) & 1023)),
										  (h[n++] = 56320 | (1023 & r)));
								}
							return i(h, n);
						}),
						(a.utf8border = function(t, e) {
							var a;
							for (
								(e = e || t.length) > t.length &&
									(e = t.length),
									a = e - 1;
								a >= 0 && 128 == (192 & t[a]);

							)
								a--;
							return a < 0
								? e
								: 0 === a
								? e
								: a + o[t[a]] > e
								? a
								: e;
						});
				},
				{ "./common": 3 }
			],
			5: [
				function(t, e, a) {
					"use strict";
					e.exports = function(t, e, a, i) {
						for (
							var n = (65535 & t) | 0,
								r = ((t >>> 16) & 65535) | 0,
								s = 0;
							0 !== a;

						) {
							a -= s = a > 2e3 ? 2e3 : a;
							do {
								r = (r + (n = (n + e[i++]) | 0)) | 0;
							} while (--s);
							(n %= 65521), (r %= 65521);
						}
						return n | (r << 16) | 0;
					};
				},
				{}
			],
			6: [
				function(t, e, a) {
					"use strict";
					e.exports = {
						Z_NO_FLUSH: 0,
						Z_PARTIAL_FLUSH: 1,
						Z_SYNC_FLUSH: 2,
						Z_FULL_FLUSH: 3,
						Z_FINISH: 4,
						Z_BLOCK: 5,
						Z_TREES: 6,
						Z_OK: 0,
						Z_STREAM_END: 1,
						Z_NEED_DICT: 2,
						Z_ERRNO: -1,
						Z_STREAM_ERROR: -2,
						Z_DATA_ERROR: -3,
						Z_BUF_ERROR: -5,
						Z_NO_COMPRESSION: 0,
						Z_BEST_SPEED: 1,
						Z_BEST_COMPRESSION: 9,
						Z_DEFAULT_COMPRESSION: -1,
						Z_FILTERED: 1,
						Z_HUFFMAN_ONLY: 2,
						Z_RLE: 3,
						Z_FIXED: 4,
						Z_DEFAULT_STRATEGY: 0,
						Z_BINARY: 0,
						Z_TEXT: 1,
						Z_UNKNOWN: 2,
						Z_DEFLATED: 8
					};
				},
				{}
			],
			7: [
				function(t, e, a) {
					"use strict";
					var i = (function() {
						for (var t, e = [], a = 0; a < 256; a++) {
							t = a;
							for (var i = 0; i < 8; i++)
								t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1;
							e[a] = t;
						}
						return e;
					})();
					e.exports = function(t, e, a, n) {
						var r = i,
							s = n + a;
						t ^= -1;
						for (var o = n; o < s; o++)
							t = (t >>> 8) ^ r[255 & (t ^ e[o])];
						return -1 ^ t;
					};
				},
				{}
			],
			8: [
				function(t, e, a) {
					"use strict";
					function i(t, e) {
						return (t.msg = A[e]), e;
					}
					function n(t) {
						return (t << 1) - (t > 4 ? 9 : 0);
					}
					function r(t) {
						for (var e = t.length; --e >= 0; ) t[e] = 0;
					}
					function s(t) {
						var e = t.state,
							a = e.pending;
						a > t.avail_out && (a = t.avail_out),
							0 !== a &&
								(z.arraySet(
									t.output,
									e.pending_buf,
									e.pending_out,
									a,
									t.next_out
								),
								(t.next_out += a),
								(e.pending_out += a),
								(t.total_out += a),
								(t.avail_out -= a),
								(e.pending -= a),
								0 === e.pending && (e.pending_out = 0));
					}
					function o(t, e) {
						B._tr_flush_block(
							t,
							t.block_start >= 0 ? t.block_start : -1,
							t.strstart - t.block_start,
							e
						),
							(t.block_start = t.strstart),
							s(t.strm);
					}
					function l(t, e) {
						t.pending_buf[t.pending++] = e;
					}
					function h(t, e) {
						(t.pending_buf[t.pending++] = (e >>> 8) & 255),
							(t.pending_buf[t.pending++] = 255 & e);
					}
					function d(t, e, a, i) {
						var n = t.avail_in;
						return (
							n > i && (n = i),
							0 === n
								? 0
								: ((t.avail_in -= n),
								  z.arraySet(e, t.input, t.next_in, n, a),
								  1 === t.state.wrap
										? (t.adler = S(t.adler, e, n, a))
										: 2 === t.state.wrap &&
										  (t.adler = E(t.adler, e, n, a)),
								  (t.next_in += n),
								  (t.total_in += n),
								  n)
						);
					}
					function f(t, e) {
						var a,
							i,
							n = t.max_chain_length,
							r = t.strstart,
							s = t.prev_length,
							o = t.nice_match,
							l =
								t.strstart > t.w_size - it
									? t.strstart - (t.w_size - it)
									: 0,
							h = t.window,
							d = t.w_mask,
							f = t.prev,
							_ = t.strstart + at,
							u = h[r + s - 1],
							c = h[r + s];
						t.prev_length >= t.good_match && (n >>= 2),
							o > t.lookahead && (o = t.lookahead);
						do {
							if (
								((a = e),
								h[a + s] === c &&
									h[a + s - 1] === u &&
									h[a] === h[r] &&
									h[++a] === h[r + 1])
							) {
								(r += 2), a++;
								do {} while (
									h[++r] === h[++a] &&
									h[++r] === h[++a] &&
									h[++r] === h[++a] &&
									h[++r] === h[++a] &&
									h[++r] === h[++a] &&
									h[++r] === h[++a] &&
									h[++r] === h[++a] &&
									h[++r] === h[++a] &&
									r < _
								);
								if (((i = at - (_ - r)), (r = _ - at), i > s)) {
									if (((t.match_start = e), (s = i), i >= o))
										break;
									(u = h[r + s - 1]), (c = h[r + s]);
								}
							}
						} while ((e = f[e & d]) > l && 0 != --n);
						return s <= t.lookahead ? s : t.lookahead;
					}
					function _(t) {
						var e,
							a,
							i,
							n,
							r,
							s = t.w_size;
						do {
							if (
								((n = t.window_size - t.lookahead - t.strstart),
								t.strstart >= s + (s - it))
							) {
								z.arraySet(t.window, t.window, s, s, 0),
									(t.match_start -= s),
									(t.strstart -= s),
									(t.block_start -= s),
									(e = a = t.hash_size);
								do {
									(i = t.head[--e]),
										(t.head[e] = i >= s ? i - s : 0);
								} while (--a);
								e = a = s;
								do {
									(i = t.prev[--e]),
										(t.prev[e] = i >= s ? i - s : 0);
								} while (--a);
								n += s;
							}
							if (0 === t.strm.avail_in) break;
							if (
								((a = d(
									t.strm,
									t.window,
									t.strstart + t.lookahead,
									n
								)),
								(t.lookahead += a),
								t.lookahead + t.insert >= et)
							)
								for (
									r = t.strstart - t.insert,
										t.ins_h = t.window[r],
										t.ins_h =
											((t.ins_h << t.hash_shift) ^
												t.window[r + 1]) &
											t.hash_mask;
									t.insert &&
									((t.ins_h =
										((t.ins_h << t.hash_shift) ^
											t.window[r + et - 1]) &
										t.hash_mask),
									(t.prev[r & t.w_mask] = t.head[t.ins_h]),
									(t.head[t.ins_h] = r),
									r++,
									t.insert--,
									!(t.lookahead + t.insert < et));

								);
						} while (t.lookahead < it && 0 !== t.strm.avail_in);
					}
					function u(t, e) {
						for (var a, i; ; ) {
							if (t.lookahead < it) {
								if ((_(t), t.lookahead < it && e === Z))
									return _t;
								if (0 === t.lookahead) break;
							}
							if (
								((a = 0),
								t.lookahead >= et &&
									((t.ins_h =
										((t.ins_h << t.hash_shift) ^
											t.window[t.strstart + et - 1]) &
										t.hash_mask),
									(a = t.prev[t.strstart & t.w_mask] =
										t.head[t.ins_h]),
									(t.head[t.ins_h] = t.strstart)),
								0 !== a &&
									t.strstart - a <= t.w_size - it &&
									(t.match_length = f(t, a)),
								t.match_length >= et)
							)
								if (
									((i = B._tr_tally(
										t,
										t.strstart - t.match_start,
										t.match_length - et
									)),
									(t.lookahead -= t.match_length),
									t.match_length <= t.max_lazy_match &&
										t.lookahead >= et)
								) {
									t.match_length--;
									do {
										t.strstart++,
											(t.ins_h =
												((t.ins_h << t.hash_shift) ^
													t.window[
														t.strstart + et - 1
													]) &
												t.hash_mask),
											(a = t.prev[t.strstart & t.w_mask] =
												t.head[t.ins_h]),
											(t.head[t.ins_h] = t.strstart);
									} while (0 != --t.match_length);
									t.strstart++;
								} else
									(t.strstart += t.match_length),
										(t.match_length = 0),
										(t.ins_h = t.window[t.strstart]),
										(t.ins_h =
											((t.ins_h << t.hash_shift) ^
												t.window[t.strstart + 1]) &
											t.hash_mask);
							else
								(i = B._tr_tally(t, 0, t.window[t.strstart])),
									t.lookahead--,
									t.strstart++;
							if (i && (o(t, !1), 0 === t.strm.avail_out))
								return _t;
						}
						return (
							(t.insert =
								t.strstart < et - 1 ? t.strstart : et - 1),
							e === N
								? (o(t, !0), 0 === t.strm.avail_out ? ct : bt)
								: t.last_lit &&
								  (o(t, !1), 0 === t.strm.avail_out)
								? _t
								: ut
						);
					}
					function c(t, e) {
						for (var a, i, n; ; ) {
							if (t.lookahead < it) {
								if ((_(t), t.lookahead < it && e === Z))
									return _t;
								if (0 === t.lookahead) break;
							}
							if (
								((a = 0),
								t.lookahead >= et &&
									((t.ins_h =
										((t.ins_h << t.hash_shift) ^
											t.window[t.strstart + et - 1]) &
										t.hash_mask),
									(a = t.prev[t.strstart & t.w_mask] =
										t.head[t.ins_h]),
									(t.head[t.ins_h] = t.strstart)),
								(t.prev_length = t.match_length),
								(t.prev_match = t.match_start),
								(t.match_length = et - 1),
								0 !== a &&
									t.prev_length < t.max_lazy_match &&
									t.strstart - a <= t.w_size - it &&
									((t.match_length = f(t, a)),
									t.match_length <= 5 &&
										(t.strategy === H ||
											(t.match_length === et &&
												t.strstart - t.match_start >
													4096)) &&
										(t.match_length = et - 1)),
								t.prev_length >= et &&
									t.match_length <= t.prev_length)
							) {
								(n = t.strstart + t.lookahead - et),
									(i = B._tr_tally(
										t,
										t.strstart - 1 - t.prev_match,
										t.prev_length - et
									)),
									(t.lookahead -= t.prev_length - 1),
									(t.prev_length -= 2);
								do {
									++t.strstart <= n &&
										((t.ins_h =
											((t.ins_h << t.hash_shift) ^
												t.window[t.strstart + et - 1]) &
											t.hash_mask),
										(a = t.prev[t.strstart & t.w_mask] =
											t.head[t.ins_h]),
										(t.head[t.ins_h] = t.strstart));
								} while (0 != --t.prev_length);
								if (
									((t.match_available = 0),
									(t.match_length = et - 1),
									t.strstart++,
									i && (o(t, !1), 0 === t.strm.avail_out))
								)
									return _t;
							} else if (t.match_available) {
								if (
									((i = B._tr_tally(
										t,
										0,
										t.window[t.strstart - 1]
									)) && o(t, !1),
									t.strstart++,
									t.lookahead--,
									0 === t.strm.avail_out)
								)
									return _t;
							} else
								(t.match_available = 1),
									t.strstart++,
									t.lookahead--;
						}
						return (
							t.match_available &&
								((i = B._tr_tally(
									t,
									0,
									t.window[t.strstart - 1]
								)),
								(t.match_available = 0)),
							(t.insert =
								t.strstart < et - 1 ? t.strstart : et - 1),
							e === N
								? (o(t, !0), 0 === t.strm.avail_out ? ct : bt)
								: t.last_lit &&
								  (o(t, !1), 0 === t.strm.avail_out)
								? _t
								: ut
						);
					}
					function b(t, e) {
						for (var a, i, n, r, s = t.window; ; ) {
							if (t.lookahead <= at) {
								if ((_(t), t.lookahead <= at && e === Z))
									return _t;
								if (0 === t.lookahead) break;
							}
							if (
								((t.match_length = 0),
								t.lookahead >= et &&
									t.strstart > 0 &&
									((n = t.strstart - 1),
									(i = s[n]) === s[++n] &&
										i === s[++n] &&
										i === s[++n]))
							) {
								r = t.strstart + at;
								do {} while (
									i === s[++n] &&
									i === s[++n] &&
									i === s[++n] &&
									i === s[++n] &&
									i === s[++n] &&
									i === s[++n] &&
									i === s[++n] &&
									i === s[++n] &&
									n < r
								);
								(t.match_length = at - (r - n)),
									t.match_length > t.lookahead &&
										(t.match_length = t.lookahead);
							}
							if (
								(t.match_length >= et
									? ((a = B._tr_tally(
											t,
											1,
											t.match_length - et
									  )),
									  (t.lookahead -= t.match_length),
									  (t.strstart += t.match_length),
									  (t.match_length = 0))
									: ((a = B._tr_tally(
											t,
											0,
											t.window[t.strstart]
									  )),
									  t.lookahead--,
									  t.strstart++),
								a && (o(t, !1), 0 === t.strm.avail_out))
							)
								return _t;
						}
						return (
							(t.insert = 0),
							e === N
								? (o(t, !0), 0 === t.strm.avail_out ? ct : bt)
								: t.last_lit &&
								  (o(t, !1), 0 === t.strm.avail_out)
								? _t
								: ut
						);
					}
					function g(t, e) {
						for (var a; ; ) {
							if (
								0 === t.lookahead &&
								(_(t), 0 === t.lookahead)
							) {
								if (e === Z) return _t;
								break;
							}
							if (
								((t.match_length = 0),
								(a = B._tr_tally(t, 0, t.window[t.strstart])),
								t.lookahead--,
								t.strstart++,
								a && (o(t, !1), 0 === t.strm.avail_out))
							)
								return _t;
						}
						return (
							(t.insert = 0),
							e === N
								? (o(t, !0), 0 === t.strm.avail_out ? ct : bt)
								: t.last_lit &&
								  (o(t, !1), 0 === t.strm.avail_out)
								? _t
								: ut
						);
					}
					function m(t, e, a, i, n) {
						(this.good_length = t),
							(this.max_lazy = e),
							(this.nice_length = a),
							(this.max_chain = i),
							(this.func = n);
					}
					function w(t) {
						(t.window_size = 2 * t.w_size),
							r(t.head),
							(t.max_lazy_match = x[t.level].max_lazy),
							(t.good_match = x[t.level].good_length),
							(t.nice_match = x[t.level].nice_length),
							(t.max_chain_length = x[t.level].max_chain),
							(t.strstart = 0),
							(t.block_start = 0),
							(t.lookahead = 0),
							(t.insert = 0),
							(t.match_length = t.prev_length = et - 1),
							(t.match_available = 0),
							(t.ins_h = 0);
					}
					function p() {
						(this.strm = null),
							(this.status = 0),
							(this.pending_buf = null),
							(this.pending_buf_size = 0),
							(this.pending_out = 0),
							(this.pending = 0),
							(this.wrap = 0),
							(this.gzhead = null),
							(this.gzindex = 0),
							(this.method = q),
							(this.last_flush = -1),
							(this.w_size = 0),
							(this.w_bits = 0),
							(this.w_mask = 0),
							(this.window = null),
							(this.window_size = 0),
							(this.prev = null),
							(this.head = null),
							(this.ins_h = 0),
							(this.hash_size = 0),
							(this.hash_bits = 0),
							(this.hash_mask = 0),
							(this.hash_shift = 0),
							(this.block_start = 0),
							(this.match_length = 0),
							(this.prev_match = 0),
							(this.match_available = 0),
							(this.strstart = 0),
							(this.match_start = 0),
							(this.lookahead = 0),
							(this.prev_length = 0),
							(this.max_chain_length = 0),
							(this.max_lazy_match = 0),
							(this.level = 0),
							(this.strategy = 0),
							(this.good_match = 0),
							(this.nice_match = 0),
							(this.dyn_ltree = new z.Buf16(2 * $)),
							(this.dyn_dtree = new z.Buf16(2 * (2 * Q + 1))),
							(this.bl_tree = new z.Buf16(2 * (2 * V + 1))),
							r(this.dyn_ltree),
							r(this.dyn_dtree),
							r(this.bl_tree),
							(this.l_desc = null),
							(this.d_desc = null),
							(this.bl_desc = null),
							(this.bl_count = new z.Buf16(tt + 1)),
							(this.heap = new z.Buf16(2 * J + 1)),
							r(this.heap),
							(this.heap_len = 0),
							(this.heap_max = 0),
							(this.depth = new z.Buf16(2 * J + 1)),
							r(this.depth),
							(this.l_buf = 0),
							(this.lit_bufsize = 0),
							(this.last_lit = 0),
							(this.d_buf = 0),
							(this.opt_len = 0),
							(this.static_len = 0),
							(this.matches = 0),
							(this.insert = 0),
							(this.bi_buf = 0),
							(this.bi_valid = 0);
					}
					function v(t) {
						var e;
						return t && t.state
							? ((t.total_in = t.total_out = 0),
							  (t.data_type = Y),
							  (e = t.state),
							  (e.pending = 0),
							  (e.pending_out = 0),
							  e.wrap < 0 && (e.wrap = -e.wrap),
							  (e.status = e.wrap ? rt : dt),
							  (t.adler = 2 === e.wrap ? 0 : 1),
							  (e.last_flush = Z),
							  B._tr_init(e),
							  D)
							: i(t, U);
					}
					function k(t) {
						var e = v(t);
						return e === D && w(t.state), e;
					}
					function y(t, e, a, n, r, s) {
						if (!t) return U;
						var o = 1;
						if (
							(e === L && (e = 6),
							n < 0
								? ((o = 0), (n = -n))
								: n > 15 && ((o = 2), (n -= 16)),
							r < 1 ||
								r > G ||
								a !== q ||
								n < 8 ||
								n > 15 ||
								e < 0 ||
								e > 9 ||
								s < 0 ||
								s > M)
						)
							return i(t, U);
						8 === n && (n = 9);
						var l = new p();
						return (
							(t.state = l),
							(l.strm = t),
							(l.wrap = o),
							(l.gzhead = null),
							(l.w_bits = n),
							(l.w_size = 1 << l.w_bits),
							(l.w_mask = l.w_size - 1),
							(l.hash_bits = r + 7),
							(l.hash_size = 1 << l.hash_bits),
							(l.hash_mask = l.hash_size - 1),
							(l.hash_shift = ~~((l.hash_bits + et - 1) / et)),
							(l.window = new z.Buf8(2 * l.w_size)),
							(l.head = new z.Buf16(l.hash_size)),
							(l.prev = new z.Buf16(l.w_size)),
							(l.lit_bufsize = 1 << (r + 6)),
							(l.pending_buf_size = 4 * l.lit_bufsize),
							(l.pending_buf = new z.Buf8(l.pending_buf_size)),
							(l.d_buf = 1 * l.lit_bufsize),
							(l.l_buf = 3 * l.lit_bufsize),
							(l.level = e),
							(l.strategy = s),
							(l.method = a),
							k(t)
						);
					}
					var x,
						z = t("../utils/common"),
						B = t("./trees"),
						S = t("./adler32"),
						E = t("./crc32"),
						A = t("./messages"),
						Z = 0,
						R = 1,
						C = 3,
						N = 4,
						O = 5,
						D = 0,
						I = 1,
						U = -2,
						T = -3,
						F = -5,
						L = -1,
						H = 1,
						j = 2,
						K = 3,
						M = 4,
						P = 0,
						Y = 2,
						q = 8,
						G = 9,
						X = 15,
						W = 8,
						J = 286,
						Q = 30,
						V = 19,
						$ = 2 * J + 1,
						tt = 15,
						et = 3,
						at = 258,
						it = at + et + 1,
						nt = 32,
						rt = 42,
						st = 69,
						ot = 73,
						lt = 91,
						ht = 103,
						dt = 113,
						ft = 666,
						_t = 1,
						ut = 2,
						ct = 3,
						bt = 4,
						gt = 3;
					(x = [
						new m(0, 0, 0, 0, function(t, e) {
							var a = 65535;
							for (
								a > t.pending_buf_size - 5 &&
								(a = t.pending_buf_size - 5);
								;

							) {
								if (t.lookahead <= 1) {
									if ((_(t), 0 === t.lookahead && e === Z))
										return _t;
									if (0 === t.lookahead) break;
								}
								(t.strstart += t.lookahead), (t.lookahead = 0);
								var i = t.block_start + a;
								if (
									(0 === t.strstart || t.strstart >= i) &&
									((t.lookahead = t.strstart - i),
									(t.strstart = i),
									o(t, !1),
									0 === t.strm.avail_out)
								)
									return _t;
								if (
									t.strstart - t.block_start >=
										t.w_size - it &&
									(o(t, !1), 0 === t.strm.avail_out)
								)
									return _t;
							}
							return (
								(t.insert = 0),
								e === N
									? (o(t, !0),
									  0 === t.strm.avail_out ? ct : bt)
									: (t.strstart > t.block_start &&
											(o(t, !1), t.strm.avail_out),
									  _t)
							);
						}),
						new m(4, 4, 8, 4, u),
						new m(4, 5, 16, 8, u),
						new m(4, 6, 32, 32, u),
						new m(4, 4, 16, 16, c),
						new m(8, 16, 32, 32, c),
						new m(8, 16, 128, 128, c),
						new m(8, 32, 128, 256, c),
						new m(32, 128, 258, 1024, c),
						new m(32, 258, 258, 4096, c)
					]),
						(a.deflateInit = function(t, e) {
							return y(t, e, q, X, W, P);
						}),
						(a.deflateInit2 = y),
						(a.deflateReset = k),
						(a.deflateResetKeep = v),
						(a.deflateSetHeader = function(t, e) {
							return t && t.state
								? 2 !== t.state.wrap
									? U
									: ((t.state.gzhead = e), D)
								: U;
						}),
						(a.deflate = function(t, e) {
							var a, o, d, f;
							if (!t || !t.state || e > O || e < 0)
								return t ? i(t, U) : U;
							if (
								((o = t.state),
								!t.output ||
									(!t.input && 0 !== t.avail_in) ||
									(o.status === ft && e !== N))
							)
								return i(t, 0 === t.avail_out ? F : U);
							if (
								((o.strm = t),
								(a = o.last_flush),
								(o.last_flush = e),
								o.status === rt)
							)
								if (2 === o.wrap)
									(t.adler = 0),
										l(o, 31),
										l(o, 139),
										l(o, 8),
										o.gzhead
											? (l(
													o,
													(o.gzhead.text ? 1 : 0) +
														(o.gzhead.hcrc
															? 2
															: 0) +
														(o.gzhead.extra
															? 4
															: 0) +
														(o.gzhead.name
															? 8
															: 0) +
														(o.gzhead.comment
															? 16
															: 0)
											  ),
											  l(o, 255 & o.gzhead.time),
											  l(o, (o.gzhead.time >> 8) & 255),
											  l(o, (o.gzhead.time >> 16) & 255),
											  l(o, (o.gzhead.time >> 24) & 255),
											  l(
													o,
													9 === o.level
														? 2
														: o.strategy >= j ||
														  o.level < 2
														? 4
														: 0
											  ),
											  l(o, 255 & o.gzhead.os),
											  o.gzhead.extra &&
													o.gzhead.extra.length &&
													(l(
														o,
														255 &
															o.gzhead.extra
																.length
													),
													l(
														o,
														(o.gzhead.extra
															.length >>
															8) &
															255
													)),
											  o.gzhead.hcrc &&
													(t.adler = E(
														t.adler,
														o.pending_buf,
														o.pending,
														0
													)),
											  (o.gzindex = 0),
											  (o.status = st))
											: (l(o, 0),
											  l(o, 0),
											  l(o, 0),
											  l(o, 0),
											  l(o, 0),
											  l(
													o,
													9 === o.level
														? 2
														: o.strategy >= j ||
														  o.level < 2
														? 4
														: 0
											  ),
											  l(o, gt),
											  (o.status = dt));
								else {
									var _ = (q + ((o.w_bits - 8) << 4)) << 8;
									(_ |=
										(o.strategy >= j || o.level < 2
											? 0
											: o.level < 6
											? 1
											: 6 === o.level
											? 2
											: 3) << 6),
										0 !== o.strstart && (_ |= nt),
										(_ += 31 - (_ % 31)),
										(o.status = dt),
										h(o, _),
										0 !== o.strstart &&
											(h(o, t.adler >>> 16),
											h(o, 65535 & t.adler)),
										(t.adler = 1);
								}
							if (o.status === st)
								if (o.gzhead.extra) {
									for (
										d = o.pending;
										o.gzindex <
											(65535 & o.gzhead.extra.length) &&
										(o.pending !== o.pending_buf_size ||
											(o.gzhead.hcrc &&
												o.pending > d &&
												(t.adler = E(
													t.adler,
													o.pending_buf,
													o.pending - d,
													d
												)),
											s(t),
											(d = o.pending),
											o.pending !== o.pending_buf_size));

									)
										l(o, 255 & o.gzhead.extra[o.gzindex]),
											o.gzindex++;
									o.gzhead.hcrc &&
										o.pending > d &&
										(t.adler = E(
											t.adler,
											o.pending_buf,
											o.pending - d,
											d
										)),
										o.gzindex === o.gzhead.extra.length &&
											((o.gzindex = 0), (o.status = ot));
								} else o.status = ot;
							if (o.status === ot)
								if (o.gzhead.name) {
									d = o.pending;
									do {
										if (
											o.pending === o.pending_buf_size &&
											(o.gzhead.hcrc &&
												o.pending > d &&
												(t.adler = E(
													t.adler,
													o.pending_buf,
													o.pending - d,
													d
												)),
											s(t),
											(d = o.pending),
											o.pending === o.pending_buf_size)
										) {
											f = 1;
											break;
										}
										(f =
											o.gzindex < o.gzhead.name.length
												? 255 &
												  o.gzhead.name.charCodeAt(
														o.gzindex++
												  )
												: 0),
											l(o, f);
									} while (0 !== f);
									o.gzhead.hcrc &&
										o.pending > d &&
										(t.adler = E(
											t.adler,
											o.pending_buf,
											o.pending - d,
											d
										)),
										0 === f &&
											((o.gzindex = 0), (o.status = lt));
								} else o.status = lt;
							if (o.status === lt)
								if (o.gzhead.comment) {
									d = o.pending;
									do {
										if (
											o.pending === o.pending_buf_size &&
											(o.gzhead.hcrc &&
												o.pending > d &&
												(t.adler = E(
													t.adler,
													o.pending_buf,
													o.pending - d,
													d
												)),
											s(t),
											(d = o.pending),
											o.pending === o.pending_buf_size)
										) {
											f = 1;
											break;
										}
										(f =
											o.gzindex < o.gzhead.comment.length
												? 255 &
												  o.gzhead.comment.charCodeAt(
														o.gzindex++
												  )
												: 0),
											l(o, f);
									} while (0 !== f);
									o.gzhead.hcrc &&
										o.pending > d &&
										(t.adler = E(
											t.adler,
											o.pending_buf,
											o.pending - d,
											d
										)),
										0 === f && (o.status = ht);
								} else o.status = ht;
							if (
								(o.status === ht &&
									(o.gzhead.hcrc
										? (o.pending + 2 > o.pending_buf_size &&
												s(t),
										  o.pending + 2 <= o.pending_buf_size &&
												(l(o, 255 & t.adler),
												l(o, (t.adler >> 8) & 255),
												(t.adler = 0),
												(o.status = dt)))
										: (o.status = dt)),
								0 !== o.pending)
							) {
								if ((s(t), 0 === t.avail_out))
									return (o.last_flush = -1), D;
							} else if (
								0 === t.avail_in &&
								n(e) <= n(a) &&
								e !== N
							)
								return i(t, F);
							if (o.status === ft && 0 !== t.avail_in)
								return i(t, F);
							if (
								0 !== t.avail_in ||
								0 !== o.lookahead ||
								(e !== Z && o.status !== ft)
							) {
								var u =
									o.strategy === j
										? g(o, e)
										: o.strategy === K
										? b(o, e)
										: x[o.level].func(o, e);
								if (
									((u !== ct && u !== bt) || (o.status = ft),
									u === _t || u === ct)
								)
									return (
										0 === t.avail_out &&
											(o.last_flush = -1),
										D
									);
								if (
									u === ut &&
									(e === R
										? B._tr_align(o)
										: e !== O &&
										  (B._tr_stored_block(o, 0, 0, !1),
										  e === C &&
												(r(o.head),
												0 === o.lookahead &&
													((o.strstart = 0),
													(o.block_start = 0),
													(o.insert = 0)))),
									s(t),
									0 === t.avail_out)
								)
									return (o.last_flush = -1), D;
							}
							return e !== N
								? D
								: o.wrap <= 0
								? I
								: (2 === o.wrap
										? (l(o, 255 & t.adler),
										  l(o, (t.adler >> 8) & 255),
										  l(o, (t.adler >> 16) & 255),
										  l(o, (t.adler >> 24) & 255),
										  l(o, 255 & t.total_in),
										  l(o, (t.total_in >> 8) & 255),
										  l(o, (t.total_in >> 16) & 255),
										  l(o, (t.total_in >> 24) & 255))
										: (h(o, t.adler >>> 16),
										  h(o, 65535 & t.adler)),
								  s(t),
								  o.wrap > 0 && (o.wrap = -o.wrap),
								  0 !== o.pending ? D : I);
						}),
						(a.deflateEnd = function(t) {
							var e;
							return t && t.state
								? (e = t.state.status) !== rt &&
								  e !== st &&
								  e !== ot &&
								  e !== lt &&
								  e !== ht &&
								  e !== dt &&
								  e !== ft
									? i(t, U)
									: ((t.state = null), e === dt ? i(t, T) : D)
								: U;
						}),
						(a.deflateSetDictionary = function(t, e) {
							var a,
								i,
								n,
								s,
								o,
								l,
								h,
								d,
								f = e.length;
							if (!t || !t.state) return U;
							if (
								((a = t.state),
								2 === (s = a.wrap) ||
									(1 === s && a.status !== rt) ||
									a.lookahead)
							)
								return U;
							for (
								1 === s && (t.adler = S(t.adler, e, f, 0)),
									a.wrap = 0,
									f >= a.w_size &&
										(0 === s &&
											(r(a.head),
											(a.strstart = 0),
											(a.block_start = 0),
											(a.insert = 0)),
										(d = new z.Buf8(a.w_size)),
										z.arraySet(
											d,
											e,
											f - a.w_size,
											a.w_size,
											0
										),
										(e = d),
										(f = a.w_size)),
									o = t.avail_in,
									l = t.next_in,
									h = t.input,
									t.avail_in = f,
									t.next_in = 0,
									t.input = e,
									_(a);
								a.lookahead >= et;

							) {
								(i = a.strstart), (n = a.lookahead - (et - 1));
								do {
									(a.ins_h =
										((a.ins_h << a.hash_shift) ^
											a.window[i + et - 1]) &
										a.hash_mask),
										(a.prev[i & a.w_mask] =
											a.head[a.ins_h]),
										(a.head[a.ins_h] = i),
										i++;
								} while (--n);
								(a.strstart = i), (a.lookahead = et - 1), _(a);
							}
							return (
								(a.strstart += a.lookahead),
								(a.block_start = a.strstart),
								(a.insert = a.lookahead),
								(a.lookahead = 0),
								(a.match_length = a.prev_length = et - 1),
								(a.match_available = 0),
								(t.next_in = l),
								(t.input = h),
								(t.avail_in = o),
								(a.wrap = s),
								D
							);
						}),
						(a.deflateInfo = "pako deflate (from Nodeca project)");
				},
				{
					"../utils/common": 3,
					"./adler32": 5,
					"./crc32": 7,
					"./messages": 13,
					"./trees": 14
				}
			],
			9: [
				function(t, e, a) {
					"use strict";
					e.exports = function() {
						(this.text = 0),
							(this.time = 0),
							(this.xflags = 0),
							(this.os = 0),
							(this.extra = null),
							(this.extra_len = 0),
							(this.name = ""),
							(this.comment = ""),
							(this.hcrc = 0),
							(this.done = !1);
					};
				},
				{}
			],
			10: [
				function(t, e, a) {
					"use strict";
					e.exports = function(t, e) {
						var a,
							i,
							n,
							r,
							s,
							o,
							l,
							h,
							d,
							f,
							_,
							u,
							c,
							b,
							g,
							m,
							w,
							p,
							v,
							k,
							y,
							x,
							z,
							B,
							S;
						(a = t.state),
							(i = t.next_in),
							(B = t.input),
							(n = i + (t.avail_in - 5)),
							(r = t.next_out),
							(S = t.output),
							(s = r - (e - t.avail_out)),
							(o = r + (t.avail_out - 257)),
							(l = a.dmax),
							(h = a.wsize),
							(d = a.whave),
							(f = a.wnext),
							(_ = a.window),
							(u = a.hold),
							(c = a.bits),
							(b = a.lencode),
							(g = a.distcode),
							(m = (1 << a.lenbits) - 1),
							(w = (1 << a.distbits) - 1);
						t: do {
							c < 15 &&
								((u += B[i++] << c),
								(c += 8),
								(u += B[i++] << c),
								(c += 8)),
								(p = b[u & m]);
							e: for (;;) {
								if (
									((v = p >>> 24),
									(u >>>= v),
									(c -= v),
									0 === (v = (p >>> 16) & 255))
								)
									S[r++] = 65535 & p;
								else {
									if (!(16 & v)) {
										if (0 == (64 & v)) {
											p =
												b[
													(65535 & p) +
														(u & ((1 << v) - 1))
												];
											continue e;
										}
										if (32 & v) {
											a.mode = 12;
											break t;
										}
										(t.msg = "invalid literal/length code"),
											(a.mode = 30);
										break t;
									}
									(k = 65535 & p),
										(v &= 15) &&
											(c < v &&
												((u += B[i++] << c), (c += 8)),
											(k += u & ((1 << v) - 1)),
											(u >>>= v),
											(c -= v)),
										c < 15 &&
											((u += B[i++] << c),
											(c += 8),
											(u += B[i++] << c),
											(c += 8)),
										(p = g[u & w]);
									a: for (;;) {
										if (
											((v = p >>> 24),
											(u >>>= v),
											(c -= v),
											!(16 & (v = (p >>> 16) & 255)))
										) {
											if (0 == (64 & v)) {
												p =
													g[
														(65535 & p) +
															(u & ((1 << v) - 1))
													];
												continue a;
											}
											(t.msg = "invalid distance code"),
												(a.mode = 30);
											break t;
										}
										if (
											((y = 65535 & p),
											(v &= 15),
											c < v &&
												((u += B[i++] << c),
												(c += 8) < v &&
													((u += B[i++] << c),
													(c += 8))),
											(y += u & ((1 << v) - 1)) > l)
										) {
											(t.msg =
												"invalid distance too far back"),
												(a.mode = 30);
											break t;
										}
										if (
											((u >>>= v),
											(c -= v),
											(v = r - s),
											y > v)
										) {
											if ((v = y - v) > d && a.sane) {
												(t.msg =
													"invalid distance too far back"),
													(a.mode = 30);
												break t;
											}
											if (((x = 0), (z = _), 0 === f)) {
												if (((x += h - v), v < k)) {
													k -= v;
													do {
														S[r++] = _[x++];
													} while (--v);
													(x = r - y), (z = S);
												}
											} else if (f < v) {
												if (
													((x += h + f - v),
													(v -= f) < k)
												) {
													k -= v;
													do {
														S[r++] = _[x++];
													} while (--v);
													if (((x = 0), f < k)) {
														k -= v = f;
														do {
															S[r++] = _[x++];
														} while (--v);
														(x = r - y), (z = S);
													}
												}
											} else if (((x += f - v), v < k)) {
												k -= v;
												do {
													S[r++] = _[x++];
												} while (--v);
												(x = r - y), (z = S);
											}
											for (; k > 2; )
												(S[r++] = z[x++]),
													(S[r++] = z[x++]),
													(S[r++] = z[x++]),
													(k -= 3);
											k &&
												((S[r++] = z[x++]),
												k > 1 && (S[r++] = z[x++]));
										} else {
											x = r - y;
											do {
												(S[r++] = S[x++]),
													(S[r++] = S[x++]),
													(S[r++] = S[x++]),
													(k -= 3);
											} while (k > 2);
											k &&
												((S[r++] = S[x++]),
												k > 1 && (S[r++] = S[x++]));
										}
										break;
									}
								}
								break;
							}
						} while (i < n && r < o);
						(i -= k = c >> 3),
							(u &= (1 << (c -= k << 3)) - 1),
							(t.next_in = i),
							(t.next_out = r),
							(t.avail_in = i < n ? n - i + 5 : 5 - (i - n)),
							(t.avail_out = r < o ? o - r + 257 : 257 - (r - o)),
							(a.hold = u),
							(a.bits = c);
					};
				},
				{}
			],
			11: [
				function(t, e, a) {
					"use strict";
					function i(t) {
						return (
							((t >>> 24) & 255) +
							((t >>> 8) & 65280) +
							((65280 & t) << 8) +
							((255 & t) << 24)
						);
					}
					function n() {
						(this.mode = 0),
							(this.last = !1),
							(this.wrap = 0),
							(this.havedict = !1),
							(this.flags = 0),
							(this.dmax = 0),
							(this.check = 0),
							(this.total = 0),
							(this.head = null),
							(this.wbits = 0),
							(this.wsize = 0),
							(this.whave = 0),
							(this.wnext = 0),
							(this.window = null),
							(this.hold = 0),
							(this.bits = 0),
							(this.length = 0),
							(this.offset = 0),
							(this.extra = 0),
							(this.lencode = null),
							(this.distcode = null),
							(this.lenbits = 0),
							(this.distbits = 0),
							(this.ncode = 0),
							(this.nlen = 0),
							(this.ndist = 0),
							(this.have = 0),
							(this.next = null),
							(this.lens = new u.Buf16(320)),
							(this.work = new u.Buf16(288)),
							(this.lendyn = null),
							(this.distdyn = null),
							(this.sane = 0),
							(this.back = 0),
							(this.was = 0);
					}
					function r(t) {
						var e;
						return t && t.state
							? ((e = t.state),
							  (t.total_in = t.total_out = e.total = 0),
							  (t.msg = ""),
							  e.wrap && (t.adler = 1 & e.wrap),
							  (e.mode = N),
							  (e.last = 0),
							  (e.havedict = 0),
							  (e.dmax = 32768),
							  (e.head = null),
							  (e.hold = 0),
							  (e.bits = 0),
							  (e.lencode = e.lendyn = new u.Buf32(dt)),
							  (e.distcode = e.distdyn = new u.Buf32(ft)),
							  (e.sane = 1),
							  (e.back = -1),
							  z)
							: E;
					}
					function s(t) {
						var e;
						return t && t.state
							? ((e = t.state),
							  (e.wsize = 0),
							  (e.whave = 0),
							  (e.wnext = 0),
							  r(t))
							: E;
					}
					function o(t, e) {
						var a, i;
						return t && t.state
							? ((i = t.state),
							  e < 0
									? ((a = 0), (e = -e))
									: ((a = 1 + (e >> 4)), e < 48 && (e &= 15)),
							  e && (e < 8 || e > 15)
									? E
									: (null !== i.window &&
											i.wbits !== e &&
											(i.window = null),
									  (i.wrap = a),
									  (i.wbits = e),
									  s(t)))
							: E;
					}
					function l(t, e) {
						var a, i;
						return t
							? ((i = new n()),
							  (t.state = i),
							  (i.window = null),
							  (a = o(t, e)) !== z && (t.state = null),
							  a)
							: E;
					}
					function h(t) {
						if (ut) {
							var e;
							for (
								f = new u.Buf32(512),
									_ = new u.Buf32(32),
									e = 0;
								e < 144;

							)
								t.lens[e++] = 8;
							for (; e < 256; ) t.lens[e++] = 9;
							for (; e < 280; ) t.lens[e++] = 7;
							for (; e < 288; ) t.lens[e++] = 8;
							for (
								m(p, t.lens, 0, 288, f, 0, t.work, { bits: 9 }),
									e = 0;
								e < 32;

							)
								t.lens[e++] = 5;
							m(v, t.lens, 0, 32, _, 0, t.work, { bits: 5 }),
								(ut = !1);
						}
						(t.lencode = f),
							(t.lenbits = 9),
							(t.distcode = _),
							(t.distbits = 5);
					}
					function d(t, e, a, i) {
						var n,
							r = t.state;
						return (
							null === r.window &&
								((r.wsize = 1 << r.wbits),
								(r.wnext = 0),
								(r.whave = 0),
								(r.window = new u.Buf8(r.wsize))),
							i >= r.wsize
								? (u.arraySet(
										r.window,
										e,
										a - r.wsize,
										r.wsize,
										0
								  ),
								  (r.wnext = 0),
								  (r.whave = r.wsize))
								: ((n = r.wsize - r.wnext) > i && (n = i),
								  u.arraySet(r.window, e, a - i, n, r.wnext),
								  (i -= n)
										? (u.arraySet(r.window, e, a - i, i, 0),
										  (r.wnext = i),
										  (r.whave = r.wsize))
										: ((r.wnext += n),
										  r.wnext === r.wsize && (r.wnext = 0),
										  r.whave < r.wsize && (r.whave += n))),
							0
						);
					}
					var f,
						_,
						u = t("../utils/common"),
						c = t("./adler32"),
						b = t("./crc32"),
						g = t("./inffast"),
						m = t("./inftrees"),
						w = 0,
						p = 1,
						v = 2,
						k = 4,
						y = 5,
						x = 6,
						z = 0,
						B = 1,
						S = 2,
						E = -2,
						A = -3,
						Z = -4,
						R = -5,
						C = 8,
						N = 1,
						O = 2,
						D = 3,
						I = 4,
						U = 5,
						T = 6,
						F = 7,
						L = 8,
						H = 9,
						j = 10,
						K = 11,
						M = 12,
						P = 13,
						Y = 14,
						q = 15,
						G = 16,
						X = 17,
						W = 18,
						J = 19,
						Q = 20,
						V = 21,
						$ = 22,
						tt = 23,
						et = 24,
						at = 25,
						it = 26,
						nt = 27,
						rt = 28,
						st = 29,
						ot = 30,
						lt = 31,
						ht = 32,
						dt = 852,
						ft = 592,
						_t = 15,
						ut = !0;
					(a.inflateReset = s),
						(a.inflateReset2 = o),
						(a.inflateResetKeep = r),
						(a.inflateInit = function(t) {
							return l(t, _t);
						}),
						(a.inflateInit2 = l),
						(a.inflate = function(t, e) {
							var a,
								n,
								r,
								s,
								o,
								l,
								f,
								_,
								dt,
								ft,
								_t,
								ut,
								ct,
								bt,
								gt,
								mt,
								wt,
								pt,
								vt,
								kt,
								yt,
								xt,
								zt,
								Bt,
								St = 0,
								Et = new u.Buf8(4),
								At = [
									16,
									17,
									18,
									0,
									8,
									7,
									9,
									6,
									10,
									5,
									11,
									4,
									12,
									3,
									13,
									2,
									14,
									1,
									15
								];
							if (
								!t ||
								!t.state ||
								!t.output ||
								(!t.input && 0 !== t.avail_in)
							)
								return E;
							(a = t.state).mode === M && (a.mode = P),
								(o = t.next_out),
								(r = t.output),
								(f = t.avail_out),
								(s = t.next_in),
								(n = t.input),
								(l = t.avail_in),
								(_ = a.hold),
								(dt = a.bits),
								(ft = l),
								(_t = f),
								(xt = z);
							t: for (;;)
								switch (a.mode) {
									case N:
										if (0 === a.wrap) {
											a.mode = P;
											break;
										}
										for (; dt < 16; ) {
											if (0 === l) break t;
											l--, (_ += n[s++] << dt), (dt += 8);
										}
										if (2 & a.wrap && 35615 === _) {
											(a.check = 0),
												(Et[0] = 255 & _),
												(Et[1] = (_ >>> 8) & 255),
												(a.check = b(
													a.check,
													Et,
													2,
													0
												)),
												(_ = 0),
												(dt = 0),
												(a.mode = O);
											break;
										}
										if (
											((a.flags = 0),
											a.head && (a.head.done = !1),
											!(1 & a.wrap) ||
												(((255 & _) << 8) + (_ >> 8)) %
													31)
										) {
											(t.msg = "incorrect header check"),
												(a.mode = ot);
											break;
										}
										if ((15 & _) !== C) {
											(t.msg =
												"unknown compression method"),
												(a.mode = ot);
											break;
										}
										if (
											((_ >>>= 4),
											(dt -= 4),
											(yt = 8 + (15 & _)),
											0 === a.wbits)
										)
											a.wbits = yt;
										else if (yt > a.wbits) {
											(t.msg = "invalid window size"),
												(a.mode = ot);
											break;
										}
										(a.dmax = 1 << yt),
											(t.adler = a.check = 1),
											(a.mode = 512 & _ ? j : M),
											(_ = 0),
											(dt = 0);
										break;
									case O:
										for (; dt < 16; ) {
											if (0 === l) break t;
											l--, (_ += n[s++] << dt), (dt += 8);
										}
										if (
											((a.flags = _),
											(255 & a.flags) !== C)
										) {
											(t.msg =
												"unknown compression method"),
												(a.mode = ot);
											break;
										}
										if (57344 & a.flags) {
											(t.msg =
												"unknown header flags set"),
												(a.mode = ot);
											break;
										}
										a.head && (a.head.text = (_ >> 8) & 1),
											512 & a.flags &&
												((Et[0] = 255 & _),
												(Et[1] = (_ >>> 8) & 255),
												(a.check = b(
													a.check,
													Et,
													2,
													0
												))),
											(_ = 0),
											(dt = 0),
											(a.mode = D);
									case D:
										for (; dt < 32; ) {
											if (0 === l) break t;
											l--, (_ += n[s++] << dt), (dt += 8);
										}
										a.head && (a.head.time = _),
											512 & a.flags &&
												((Et[0] = 255 & _),
												(Et[1] = (_ >>> 8) & 255),
												(Et[2] = (_ >>> 16) & 255),
												(Et[3] = (_ >>> 24) & 255),
												(a.check = b(
													a.check,
													Et,
													4,
													0
												))),
											(_ = 0),
											(dt = 0),
											(a.mode = I);
									case I:
										for (; dt < 16; ) {
											if (0 === l) break t;
											l--, (_ += n[s++] << dt), (dt += 8);
										}
										a.head &&
											((a.head.xflags = 255 & _),
											(a.head.os = _ >> 8)),
											512 & a.flags &&
												((Et[0] = 255 & _),
												(Et[1] = (_ >>> 8) & 255),
												(a.check = b(
													a.check,
													Et,
													2,
													0
												))),
											(_ = 0),
											(dt = 0),
											(a.mode = U);
									case U:
										if (1024 & a.flags) {
											for (; dt < 16; ) {
												if (0 === l) break t;
												l--,
													(_ += n[s++] << dt),
													(dt += 8);
											}
											(a.length = _),
												a.head &&
													(a.head.extra_len = _),
												512 & a.flags &&
													((Et[0] = 255 & _),
													(Et[1] = (_ >>> 8) & 255),
													(a.check = b(
														a.check,
														Et,
														2,
														0
													))),
												(_ = 0),
												(dt = 0);
										} else a.head && (a.head.extra = null);
										a.mode = T;
									case T:
										if (
											1024 & a.flags &&
											((ut = a.length) > l && (ut = l),
											ut &&
												(a.head &&
													((yt =
														a.head.extra_len -
														a.length),
													a.head.extra ||
														(a.head.extra = new Array(
															a.head.extra_len
														)),
													u.arraySet(
														a.head.extra,
														n,
														s,
														ut,
														yt
													)),
												512 & a.flags &&
													(a.check = b(
														a.check,
														n,
														ut,
														s
													)),
												(l -= ut),
												(s += ut),
												(a.length -= ut)),
											a.length)
										)
											break t;
										(a.length = 0), (a.mode = F);
									case F:
										if (2048 & a.flags) {
											if (0 === l) break t;
											ut = 0;
											do {
												(yt = n[s + ut++]),
													a.head &&
														yt &&
														a.length < 65536 &&
														(a.head.name += String.fromCharCode(
															yt
														));
											} while (yt && ut < l);
											if (
												(512 & a.flags &&
													(a.check = b(
														a.check,
														n,
														ut,
														s
													)),
												(l -= ut),
												(s += ut),
												yt)
											)
												break t;
										} else a.head && (a.head.name = null);
										(a.length = 0), (a.mode = L);
									case L:
										if (4096 & a.flags) {
											if (0 === l) break t;
											ut = 0;
											do {
												(yt = n[s + ut++]),
													a.head &&
														yt &&
														a.length < 65536 &&
														(a.head.comment += String.fromCharCode(
															yt
														));
											} while (yt && ut < l);
											if (
												(512 & a.flags &&
													(a.check = b(
														a.check,
														n,
														ut,
														s
													)),
												(l -= ut),
												(s += ut),
												yt)
											)
												break t;
										} else
											a.head && (a.head.comment = null);
										a.mode = H;
									case H:
										if (512 & a.flags) {
											for (; dt < 16; ) {
												if (0 === l) break t;
												l--,
													(_ += n[s++] << dt),
													(dt += 8);
											}
											if (_ !== (65535 & a.check)) {
												(t.msg = "header crc mismatch"),
													(a.mode = ot);
												break;
											}
											(_ = 0), (dt = 0);
										}
										a.head &&
											((a.head.hcrc = (a.flags >> 9) & 1),
											(a.head.done = !0)),
											(t.adler = a.check = 0),
											(a.mode = M);
										break;
									case j:
										for (; dt < 32; ) {
											if (0 === l) break t;
											l--, (_ += n[s++] << dt), (dt += 8);
										}
										(t.adler = a.check = i(_)),
											(_ = 0),
											(dt = 0),
											(a.mode = K);
									case K:
										if (0 === a.havedict)
											return (
												(t.next_out = o),
												(t.avail_out = f),
												(t.next_in = s),
												(t.avail_in = l),
												(a.hold = _),
												(a.bits = dt),
												S
											);
										(t.adler = a.check = 1), (a.mode = M);
									case M:
										if (e === y || e === x) break t;
									case P:
										if (a.last) {
											(_ >>>= 7 & dt),
												(dt -= 7 & dt),
												(a.mode = nt);
											break;
										}
										for (; dt < 3; ) {
											if (0 === l) break t;
											l--, (_ += n[s++] << dt), (dt += 8);
										}
										switch (
											((a.last = 1 & _),
											(_ >>>= 1),
											(dt -= 1),
											3 & _)
										) {
											case 0:
												a.mode = Y;
												break;
											case 1:
												if (
													(h(a),
													(a.mode = Q),
													e === x)
												) {
													(_ >>>= 2), (dt -= 2);
													break t;
												}
												break;
											case 2:
												a.mode = X;
												break;
											case 3:
												(t.msg = "invalid block type"),
													(a.mode = ot);
										}
										(_ >>>= 2), (dt -= 2);
										break;
									case Y:
										for (
											_ >>>= 7 & dt, dt -= 7 & dt;
											dt < 32;

										) {
											if (0 === l) break t;
											l--, (_ += n[s++] << dt), (dt += 8);
										}
										if (
											(65535 & _) !=
											((_ >>> 16) ^ 65535)
										) {
											(t.msg =
												"invalid stored block lengths"),
												(a.mode = ot);
											break;
										}
										if (
											((a.length = 65535 & _),
											(_ = 0),
											(dt = 0),
											(a.mode = q),
											e === x)
										)
											break t;
									case q:
										a.mode = G;
									case G:
										if ((ut = a.length)) {
											if (
												(ut > l && (ut = l),
												ut > f && (ut = f),
												0 === ut)
											)
												break t;
											u.arraySet(r, n, s, ut, o),
												(l -= ut),
												(s += ut),
												(f -= ut),
												(o += ut),
												(a.length -= ut);
											break;
										}
										a.mode = M;
										break;
									case X:
										for (; dt < 14; ) {
											if (0 === l) break t;
											l--, (_ += n[s++] << dt), (dt += 8);
										}
										if (
											((a.nlen = 257 + (31 & _)),
											(_ >>>= 5),
											(dt -= 5),
											(a.ndist = 1 + (31 & _)),
											(_ >>>= 5),
											(dt -= 5),
											(a.ncode = 4 + (15 & _)),
											(_ >>>= 4),
											(dt -= 4),
											a.nlen > 286 || a.ndist > 30)
										) {
											(t.msg =
												"too many length or distance symbols"),
												(a.mode = ot);
											break;
										}
										(a.have = 0), (a.mode = W);
									case W:
										for (; a.have < a.ncode; ) {
											for (; dt < 3; ) {
												if (0 === l) break t;
												l--,
													(_ += n[s++] << dt),
													(dt += 8);
											}
											(a.lens[At[a.have++]] = 7 & _),
												(_ >>>= 3),
												(dt -= 3);
										}
										for (; a.have < 19; )
											a.lens[At[a.have++]] = 0;
										if (
											((a.lencode = a.lendyn),
											(a.lenbits = 7),
											(zt = { bits: a.lenbits }),
											(xt = m(
												w,
												a.lens,
												0,
												19,
												a.lencode,
												0,
												a.work,
												zt
											)),
											(a.lenbits = zt.bits),
											xt)
										) {
											(t.msg =
												"invalid code lengths set"),
												(a.mode = ot);
											break;
										}
										(a.have = 0), (a.mode = J);
									case J:
										for (; a.have < a.nlen + a.ndist; ) {
											for (
												;
												(St =
													a.lencode[
														_ &
															((1 << a.lenbits) -
																1)
													]),
													(gt = St >>> 24),
													(mt = (St >>> 16) & 255),
													(wt = 65535 & St),
													!(gt <= dt);

											) {
												if (0 === l) break t;
												l--,
													(_ += n[s++] << dt),
													(dt += 8);
											}
											if (wt < 16)
												(_ >>>= gt),
													(dt -= gt),
													(a.lens[a.have++] = wt);
											else {
												if (16 === wt) {
													for (
														Bt = gt + 2;
														dt < Bt;

													) {
														if (0 === l) break t;
														l--,
															(_ += n[s++] << dt),
															(dt += 8);
													}
													if (
														((_ >>>= gt),
														(dt -= gt),
														0 === a.have)
													) {
														(t.msg =
															"invalid bit length repeat"),
															(a.mode = ot);
														break;
													}
													(yt = a.lens[a.have - 1]),
														(ut = 3 + (3 & _)),
														(_ >>>= 2),
														(dt -= 2);
												} else if (17 === wt) {
													for (
														Bt = gt + 3;
														dt < Bt;

													) {
														if (0 === l) break t;
														l--,
															(_ += n[s++] << dt),
															(dt += 8);
													}
													(dt -= gt),
														(yt = 0),
														(ut =
															3 +
															(7 & (_ >>>= gt))),
														(_ >>>= 3),
														(dt -= 3);
												} else {
													for (
														Bt = gt + 7;
														dt < Bt;

													) {
														if (0 === l) break t;
														l--,
															(_ += n[s++] << dt),
															(dt += 8);
													}
													(dt -= gt),
														(yt = 0),
														(ut =
															11 +
															(127 &
																(_ >>>= gt))),
														(_ >>>= 7),
														(dt -= 7);
												}
												if (
													a.have + ut >
													a.nlen + a.ndist
												) {
													(t.msg =
														"invalid bit length repeat"),
														(a.mode = ot);
													break;
												}
												for (; ut--; )
													a.lens[a.have++] = yt;
											}
										}
										if (a.mode === ot) break;
										if (0 === a.lens[256]) {
											(t.msg =
												"invalid code -- missing end-of-block"),
												(a.mode = ot);
											break;
										}
										if (
											((a.lenbits = 9),
											(zt = { bits: a.lenbits }),
											(xt = m(
												p,
												a.lens,
												0,
												a.nlen,
												a.lencode,
												0,
												a.work,
												zt
											)),
											(a.lenbits = zt.bits),
											xt)
										) {
											(t.msg =
												"invalid literal/lengths set"),
												(a.mode = ot);
											break;
										}
										if (
											((a.distbits = 6),
											(a.distcode = a.distdyn),
											(zt = { bits: a.distbits }),
											(xt = m(
												v,
												a.lens,
												a.nlen,
												a.ndist,
												a.distcode,
												0,
												a.work,
												zt
											)),
											(a.distbits = zt.bits),
											xt)
										) {
											(t.msg = "invalid distances set"),
												(a.mode = ot);
											break;
										}
										if (((a.mode = Q), e === x)) break t;
									case Q:
										a.mode = V;
									case V:
										if (l >= 6 && f >= 258) {
											(t.next_out = o),
												(t.avail_out = f),
												(t.next_in = s),
												(t.avail_in = l),
												(a.hold = _),
												(a.bits = dt),
												g(t, _t),
												(o = t.next_out),
												(r = t.output),
												(f = t.avail_out),
												(s = t.next_in),
												(n = t.input),
												(l = t.avail_in),
												(_ = a.hold),
												(dt = a.bits),
												a.mode === M && (a.back = -1);
											break;
										}
										for (
											a.back = 0;
											(St =
												a.lencode[
													_ & ((1 << a.lenbits) - 1)
												]),
												(gt = St >>> 24),
												(mt = (St >>> 16) & 255),
												(wt = 65535 & St),
												!(gt <= dt);

										) {
											if (0 === l) break t;
											l--, (_ += n[s++] << dt), (dt += 8);
										}
										if (mt && 0 == (240 & mt)) {
											for (
												pt = gt, vt = mt, kt = wt;
												(St =
													a.lencode[
														kt +
															((_ &
																((1 <<
																	(pt + vt)) -
																	1)) >>
																pt)
													]),
													(gt = St >>> 24),
													(mt = (St >>> 16) & 255),
													(wt = 65535 & St),
													!(pt + gt <= dt);

											) {
												if (0 === l) break t;
												l--,
													(_ += n[s++] << dt),
													(dt += 8);
											}
											(_ >>>= pt),
												(dt -= pt),
												(a.back += pt);
										}
										if (
											((_ >>>= gt),
											(dt -= gt),
											(a.back += gt),
											(a.length = wt),
											0 === mt)
										) {
											a.mode = it;
											break;
										}
										if (32 & mt) {
											(a.back = -1), (a.mode = M);
											break;
										}
										if (64 & mt) {
											(t.msg =
												"invalid literal/length code"),
												(a.mode = ot);
											break;
										}
										(a.extra = 15 & mt), (a.mode = $);
									case $:
										if (a.extra) {
											for (Bt = a.extra; dt < Bt; ) {
												if (0 === l) break t;
												l--,
													(_ += n[s++] << dt),
													(dt += 8);
											}
											(a.length +=
												_ & ((1 << a.extra) - 1)),
												(_ >>>= a.extra),
												(dt -= a.extra),
												(a.back += a.extra);
										}
										(a.was = a.length), (a.mode = tt);
									case tt:
										for (
											;
											(St =
												a.distcode[
													_ & ((1 << a.distbits) - 1)
												]),
												(gt = St >>> 24),
												(mt = (St >>> 16) & 255),
												(wt = 65535 & St),
												!(gt <= dt);

										) {
											if (0 === l) break t;
											l--, (_ += n[s++] << dt), (dt += 8);
										}
										if (0 == (240 & mt)) {
											for (
												pt = gt, vt = mt, kt = wt;
												(St =
													a.distcode[
														kt +
															((_ &
																((1 <<
																	(pt + vt)) -
																	1)) >>
																pt)
													]),
													(gt = St >>> 24),
													(mt = (St >>> 16) & 255),
													(wt = 65535 & St),
													!(pt + gt <= dt);

											) {
												if (0 === l) break t;
												l--,
													(_ += n[s++] << dt),
													(dt += 8);
											}
											(_ >>>= pt),
												(dt -= pt),
												(a.back += pt);
										}
										if (
											((_ >>>= gt),
											(dt -= gt),
											(a.back += gt),
											64 & mt)
										) {
											(t.msg = "invalid distance code"),
												(a.mode = ot);
											break;
										}
										(a.offset = wt),
											(a.extra = 15 & mt),
											(a.mode = et);
									case et:
										if (a.extra) {
											for (Bt = a.extra; dt < Bt; ) {
												if (0 === l) break t;
												l--,
													(_ += n[s++] << dt),
													(dt += 8);
											}
											(a.offset +=
												_ & ((1 << a.extra) - 1)),
												(_ >>>= a.extra),
												(dt -= a.extra),
												(a.back += a.extra);
										}
										if (a.offset > a.dmax) {
											(t.msg =
												"invalid distance too far back"),
												(a.mode = ot);
											break;
										}
										a.mode = at;
									case at:
										if (0 === f) break t;
										if (((ut = _t - f), a.offset > ut)) {
											if (
												(ut = a.offset - ut) >
													a.whave &&
												a.sane
											) {
												(t.msg =
													"invalid distance too far back"),
													(a.mode = ot);
												break;
											}
											ut > a.wnext
												? ((ut -= a.wnext),
												  (ct = a.wsize - ut))
												: (ct = a.wnext - ut),
												ut > a.length &&
													(ut = a.length),
												(bt = a.window);
										} else
											(bt = r),
												(ct = o - a.offset),
												(ut = a.length);
										ut > f && (ut = f),
											(f -= ut),
											(a.length -= ut);
										do {
											r[o++] = bt[ct++];
										} while (--ut);
										0 === a.length && (a.mode = V);
										break;
									case it:
										if (0 === f) break t;
										(r[o++] = a.length), f--, (a.mode = V);
										break;
									case nt:
										if (a.wrap) {
											for (; dt < 32; ) {
												if (0 === l) break t;
												l--,
													(_ |= n[s++] << dt),
													(dt += 8);
											}
											if (
												((_t -= f),
												(t.total_out += _t),
												(a.total += _t),
												_t &&
													(t.adler = a.check = a.flags
														? b(
																a.check,
																r,
																_t,
																o - _t
														  )
														: c(
																a.check,
																r,
																_t,
																o - _t
														  )),
												(_t = f),
												(a.flags ? _ : i(_)) !==
													a.check)
											) {
												(t.msg =
													"incorrect data check"),
													(a.mode = ot);
												break;
											}
											(_ = 0), (dt = 0);
										}
										a.mode = rt;
									case rt:
										if (a.wrap && a.flags) {
											for (; dt < 32; ) {
												if (0 === l) break t;
												l--,
													(_ += n[s++] << dt),
													(dt += 8);
											}
											if (_ !== (4294967295 & a.total)) {
												(t.msg =
													"incorrect length check"),
													(a.mode = ot);
												break;
											}
											(_ = 0), (dt = 0);
										}
										a.mode = st;
									case st:
										xt = B;
										break t;
									case ot:
										xt = A;
										break t;
									case lt:
										return Z;
									case ht:
									default:
										return E;
								}
							return (
								(t.next_out = o),
								(t.avail_out = f),
								(t.next_in = s),
								(t.avail_in = l),
								(a.hold = _),
								(a.bits = dt),
								(a.wsize ||
									(_t !== t.avail_out &&
										a.mode < ot &&
										(a.mode < nt || e !== k))) &&
								d(t, t.output, t.next_out, _t - t.avail_out)
									? ((a.mode = lt), Z)
									: ((ft -= t.avail_in),
									  (_t -= t.avail_out),
									  (t.total_in += ft),
									  (t.total_out += _t),
									  (a.total += _t),
									  a.wrap &&
											_t &&
											(t.adler = a.check = a.flags
												? b(
														a.check,
														r,
														_t,
														t.next_out - _t
												  )
												: c(
														a.check,
														r,
														_t,
														t.next_out - _t
												  )),
									  (t.data_type =
											a.bits +
											(a.last ? 64 : 0) +
											(a.mode === M ? 128 : 0) +
											(a.mode === Q || a.mode === q
												? 256
												: 0)),
									  ((0 === ft && 0 === _t) || e === k) &&
											xt === z &&
											(xt = R),
									  xt)
							);
						}),
						(a.inflateEnd = function(t) {
							if (!t || !t.state) return E;
							var e = t.state;
							return (
								e.window && (e.window = null),
								(t.state = null),
								z
							);
						}),
						(a.inflateGetHeader = function(t, e) {
							var a;
							return t && t.state
								? 0 == (2 & (a = t.state).wrap)
									? E
									: ((a.head = e), (e.done = !1), z)
								: E;
						}),
						(a.inflateSetDictionary = function(t, e) {
							var a,
								i,
								n = e.length;
							return t && t.state
								? 0 !== (a = t.state).wrap && a.mode !== K
									? E
									: a.mode === K &&
									  ((i = 1), (i = c(i, e, n, 0)) !== a.check)
									? A
									: d(t, e, n, n)
									? ((a.mode = lt), Z)
									: ((a.havedict = 1), z)
								: E;
						}),
						(a.inflateInfo = "pako inflate (from Nodeca project)");
				},
				{
					"../utils/common": 3,
					"./adler32": 5,
					"./crc32": 7,
					"./inffast": 10,
					"./inftrees": 12
				}
			],
			12: [
				function(t, e, a) {
					"use strict";
					var i = t("../utils/common"),
						n = [
							3,
							4,
							5,
							6,
							7,
							8,
							9,
							10,
							11,
							13,
							15,
							17,
							19,
							23,
							27,
							31,
							35,
							43,
							51,
							59,
							67,
							83,
							99,
							115,
							131,
							163,
							195,
							227,
							258,
							0,
							0
						],
						r = [
							16,
							16,
							16,
							16,
							16,
							16,
							16,
							16,
							17,
							17,
							17,
							17,
							18,
							18,
							18,
							18,
							19,
							19,
							19,
							19,
							20,
							20,
							20,
							20,
							21,
							21,
							21,
							21,
							16,
							72,
							78
						],
						s = [
							1,
							2,
							3,
							4,
							5,
							7,
							9,
							13,
							17,
							25,
							33,
							49,
							65,
							97,
							129,
							193,
							257,
							385,
							513,
							769,
							1025,
							1537,
							2049,
							3073,
							4097,
							6145,
							8193,
							12289,
							16385,
							24577,
							0,
							0
						],
						o = [
							16,
							16,
							16,
							16,
							17,
							17,
							18,
							18,
							19,
							19,
							20,
							20,
							21,
							21,
							22,
							22,
							23,
							23,
							24,
							24,
							25,
							25,
							26,
							26,
							27,
							27,
							28,
							28,
							29,
							29,
							64,
							64
						];
					e.exports = function(t, e, a, l, h, d, f, _) {
						var u,
							c,
							b,
							g,
							m,
							w,
							p,
							v,
							k,
							y = _.bits,
							x = 0,
							z = 0,
							B = 0,
							S = 0,
							E = 0,
							A = 0,
							Z = 0,
							R = 0,
							C = 0,
							N = 0,
							O = null,
							D = 0,
							I = new i.Buf16(16),
							U = new i.Buf16(16),
							T = null,
							F = 0;
						for (x = 0; x <= 15; x++) I[x] = 0;
						for (z = 0; z < l; z++) I[e[a + z]]++;
						for (E = y, S = 15; S >= 1 && 0 === I[S]; S--);
						if ((E > S && (E = S), 0 === S))
							return (
								(h[d++] = 20971520),
								(h[d++] = 20971520),
								(_.bits = 1),
								0
							);
						for (B = 1; B < S && 0 === I[B]; B++);
						for (E < B && (E = B), R = 1, x = 1; x <= 15; x++)
							if (((R <<= 1), (R -= I[x]) < 0)) return -1;
						if (R > 0 && (0 === t || 1 !== S)) return -1;
						for (U[1] = 0, x = 1; x < 15; x++)
							U[x + 1] = U[x] + I[x];
						for (z = 0; z < l; z++)
							0 !== e[a + z] && (f[U[e[a + z]]++] = z);
						if (
							(0 === t
								? ((O = T = f), (w = 19))
								: 1 === t
								? ((O = n),
								  (D -= 257),
								  (T = r),
								  (F -= 257),
								  (w = 256))
								: ((O = s), (T = o), (w = -1)),
							(N = 0),
							(z = 0),
							(x = B),
							(m = d),
							(A = E),
							(Z = 0),
							(b = -1),
							(C = 1 << E),
							(g = C - 1),
							(1 === t && C > 852) || (2 === t && C > 592))
						)
							return 1;
						for (;;) {
							(p = x - Z),
								f[z] < w
									? ((v = 0), (k = f[z]))
									: f[z] > w
									? ((v = T[F + f[z]]), (k = O[D + f[z]]))
									: ((v = 96), (k = 0)),
								(u = 1 << (x - Z)),
								(B = c = 1 << A);
							do {
								h[m + (N >> Z) + (c -= u)] =
									(p << 24) | (v << 16) | k | 0;
							} while (0 !== c);
							for (u = 1 << (x - 1); N & u; ) u >>= 1;
							if (
								(0 !== u ? ((N &= u - 1), (N += u)) : (N = 0),
								z++,
								0 == --I[x])
							) {
								if (x === S) break;
								x = e[a + f[z]];
							}
							if (x > E && (N & g) !== b) {
								for (
									0 === Z && (Z = E),
										m += B,
										R = 1 << (A = x - Z);
									A + Z < S && !((R -= I[A + Z]) <= 0);

								)
									A++, (R <<= 1);
								if (
									((C += 1 << A),
									(1 === t && C > 852) ||
										(2 === t && C > 592))
								)
									return 1;
								h[(b = N & g)] =
									(E << 24) | (A << 16) | (m - d) | 0;
							}
						}
						return (
							0 !== N &&
								(h[m + N] = ((x - Z) << 24) | (64 << 16) | 0),
							(_.bits = E),
							0
						);
					};
				},
				{ "../utils/common": 3 }
			],
			13: [
				function(t, e, a) {
					"use strict";
					e.exports = {
						2: "need dictionary",
						1: "stream end",
						0: "",
						"-1": "file error",
						"-2": "stream error",
						"-3": "data error",
						"-4": "insufficient memory",
						"-5": "buffer error",
						"-6": "incompatible version"
					};
				},
				{}
			],
			14: [
				function(t, e, a) {
					"use strict";
					function i(t) {
						for (var e = t.length; --e >= 0; ) t[e] = 0;
					}
					function n(t, e, a, i, n) {
						(this.static_tree = t),
							(this.extra_bits = e),
							(this.extra_base = a),
							(this.elems = i),
							(this.max_length = n),
							(this.has_stree = t && t.length);
					}
					function r(t, e) {
						(this.dyn_tree = t),
							(this.max_code = 0),
							(this.stat_desc = e);
					}
					function s(t) {
						return t < 256 ? et[t] : et[256 + (t >>> 7)];
					}
					function o(t, e) {
						(t.pending_buf[t.pending++] = 255 & e),
							(t.pending_buf[t.pending++] = (e >>> 8) & 255);
					}
					function l(t, e, a) {
						t.bi_valid > M - a
							? ((t.bi_buf |= (e << t.bi_valid) & 65535),
							  o(t, t.bi_buf),
							  (t.bi_buf = e >> (M - t.bi_valid)),
							  (t.bi_valid += a - M))
							: ((t.bi_buf |= (e << t.bi_valid) & 65535),
							  (t.bi_valid += a));
					}
					function h(t, e, a) {
						l(t, a[2 * e], a[2 * e + 1]);
					}
					function d(t, e) {
						var a = 0;
						do {
							(a |= 1 & t), (t >>>= 1), (a <<= 1);
						} while (--e > 0);
						return a >>> 1;
					}
					function f(t) {
						16 === t.bi_valid
							? (o(t, t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0))
							: t.bi_valid >= 8 &&
							  ((t.pending_buf[t.pending++] = 255 & t.bi_buf),
							  (t.bi_buf >>= 8),
							  (t.bi_valid -= 8));
					}
					function _(t, e) {
						var a,
							i,
							n,
							r,
							s,
							o,
							l = e.dyn_tree,
							h = e.max_code,
							d = e.stat_desc.static_tree,
							f = e.stat_desc.has_stree,
							_ = e.stat_desc.extra_bits,
							u = e.stat_desc.extra_base,
							c = e.stat_desc.max_length,
							b = 0;
						for (r = 0; r <= K; r++) t.bl_count[r] = 0;
						for (
							l[2 * t.heap[t.heap_max] + 1] = 0,
								a = t.heap_max + 1;
							a < j;
							a++
						)
							(r = l[2 * l[2 * (i = t.heap[a]) + 1] + 1] + 1) >
								c && ((r = c), b++),
								(l[2 * i + 1] = r),
								i > h ||
									(t.bl_count[r]++,
									(s = 0),
									i >= u && (s = _[i - u]),
									(o = l[2 * i]),
									(t.opt_len += o * (r + s)),
									f &&
										(t.static_len +=
											o * (d[2 * i + 1] + s)));
						if (0 !== b) {
							do {
								for (r = c - 1; 0 === t.bl_count[r]; ) r--;
								t.bl_count[r]--,
									(t.bl_count[r + 1] += 2),
									t.bl_count[c]--,
									(b -= 2);
							} while (b > 0);
							for (r = c; 0 !== r; r--)
								for (i = t.bl_count[r]; 0 !== i; )
									(n = t.heap[--a]) > h ||
										(l[2 * n + 1] !== r &&
											((t.opt_len +=
												(r - l[2 * n + 1]) * l[2 * n]),
											(l[2 * n + 1] = r)),
										i--);
						}
					}
					function u(t, e, a) {
						var i,
							n,
							r = new Array(K + 1),
							s = 0;
						for (i = 1; i <= K; i++) r[i] = s = (s + a[i - 1]) << 1;
						for (n = 0; n <= e; n++) {
							var o = t[2 * n + 1];
							0 !== o && (t[2 * n] = d(r[o]++, o));
						}
					}
					function c() {
						var t,
							e,
							a,
							i,
							r,
							s = new Array(K + 1);
						for (a = 0, i = 0; i < U - 1; i++)
							for (it[i] = a, t = 0; t < 1 << W[i]; t++)
								at[a++] = i;
						for (at[a - 1] = i, r = 0, i = 0; i < 16; i++)
							for (nt[i] = r, t = 0; t < 1 << J[i]; t++)
								et[r++] = i;
						for (r >>= 7; i < L; i++)
							for (
								nt[i] = r << 7, t = 0;
								t < 1 << (J[i] - 7);
								t++
							)
								et[256 + r++] = i;
						for (e = 0; e <= K; e++) s[e] = 0;
						for (t = 0; t <= 143; ) ($[2 * t + 1] = 8), t++, s[8]++;
						for (; t <= 255; ) ($[2 * t + 1] = 9), t++, s[9]++;
						for (; t <= 279; ) ($[2 * t + 1] = 7), t++, s[7]++;
						for (; t <= 287; ) ($[2 * t + 1] = 8), t++, s[8]++;
						for (u($, F + 1, s), t = 0; t < L; t++)
							(tt[2 * t + 1] = 5), (tt[2 * t] = d(t, 5));
						(rt = new n($, W, T + 1, F, K)),
							(st = new n(tt, J, 0, L, K)),
							(ot = new n(new Array(0), Q, 0, H, P));
					}
					function b(t) {
						var e;
						for (e = 0; e < F; e++) t.dyn_ltree[2 * e] = 0;
						for (e = 0; e < L; e++) t.dyn_dtree[2 * e] = 0;
						for (e = 0; e < H; e++) t.bl_tree[2 * e] = 0;
						(t.dyn_ltree[2 * Y] = 1),
							(t.opt_len = t.static_len = 0),
							(t.last_lit = t.matches = 0);
					}
					function g(t) {
						t.bi_valid > 8
							? o(t, t.bi_buf)
							: t.bi_valid > 0 &&
							  (t.pending_buf[t.pending++] = t.bi_buf),
							(t.bi_buf = 0),
							(t.bi_valid = 0);
					}
					function m(t, e, a, i) {
						g(t),
							i && (o(t, a), o(t, ~a)),
							A.arraySet(
								t.pending_buf,
								t.window,
								e,
								a,
								t.pending
							),
							(t.pending += a);
					}
					function w(t, e, a, i) {
						var n = 2 * e,
							r = 2 * a;
						return t[n] < t[r] || (t[n] === t[r] && i[e] <= i[a]);
					}
					function p(t, e, a) {
						for (
							var i = t.heap[a], n = a << 1;
							n <= t.heap_len &&
							(n < t.heap_len &&
								w(e, t.heap[n + 1], t.heap[n], t.depth) &&
								n++,
							!w(e, i, t.heap[n], t.depth));

						)
							(t.heap[a] = t.heap[n]), (a = n), (n <<= 1);
						t.heap[a] = i;
					}
					function v(t, e, a) {
						var i,
							n,
							r,
							o,
							d = 0;
						if (0 !== t.last_lit)
							do {
								(i =
									(t.pending_buf[t.d_buf + 2 * d] << 8) |
									t.pending_buf[t.d_buf + 2 * d + 1]),
									(n = t.pending_buf[t.l_buf + d]),
									d++,
									0 === i
										? h(t, n, e)
										: (h(t, (r = at[n]) + T + 1, e),
										  0 !== (o = W[r]) &&
												l(t, (n -= it[r]), o),
										  h(t, (r = s(--i)), a),
										  0 !== (o = J[r]) &&
												l(t, (i -= nt[r]), o));
							} while (d < t.last_lit);
						h(t, Y, e);
					}
					function k(t, e) {
						var a,
							i,
							n,
							r = e.dyn_tree,
							s = e.stat_desc.static_tree,
							o = e.stat_desc.has_stree,
							l = e.stat_desc.elems,
							h = -1;
						for (t.heap_len = 0, t.heap_max = j, a = 0; a < l; a++)
							0 !== r[2 * a]
								? ((t.heap[++t.heap_len] = h = a),
								  (t.depth[a] = 0))
								: (r[2 * a + 1] = 0);
						for (; t.heap_len < 2; )
							(r[
								2 * (n = t.heap[++t.heap_len] = h < 2 ? ++h : 0)
							] = 1),
								(t.depth[n] = 0),
								t.opt_len--,
								o && (t.static_len -= s[2 * n + 1]);
						for (e.max_code = h, a = t.heap_len >> 1; a >= 1; a--)
							p(t, r, a);
						n = l;
						do {
							(a = t.heap[1]),
								(t.heap[1] = t.heap[t.heap_len--]),
								p(t, r, 1),
								(i = t.heap[1]),
								(t.heap[--t.heap_max] = a),
								(t.heap[--t.heap_max] = i),
								(r[2 * n] = r[2 * a] + r[2 * i]),
								(t.depth[n] =
									(t.depth[a] >= t.depth[i]
										? t.depth[a]
										: t.depth[i]) + 1),
								(r[2 * a + 1] = r[2 * i + 1] = n),
								(t.heap[1] = n++),
								p(t, r, 1);
						} while (t.heap_len >= 2);
						(t.heap[--t.heap_max] = t.heap[1]),
							_(t, e),
							u(r, h, t.bl_count);
					}
					function y(t, e, a) {
						var i,
							n,
							r = -1,
							s = e[1],
							o = 0,
							l = 7,
							h = 4;
						for (
							0 === s && ((l = 138), (h = 3)),
								e[2 * (a + 1) + 1] = 65535,
								i = 0;
							i <= a;
							i++
						)
							(n = s),
								(s = e[2 * (i + 1) + 1]),
								(++o < l && n === s) ||
									(o < h
										? (t.bl_tree[2 * n] += o)
										: 0 !== n
										? (n !== r && t.bl_tree[2 * n]++,
										  t.bl_tree[2 * q]++)
										: o <= 10
										? t.bl_tree[2 * G]++
										: t.bl_tree[2 * X]++,
									(o = 0),
									(r = n),
									0 === s
										? ((l = 138), (h = 3))
										: n === s
										? ((l = 6), (h = 3))
										: ((l = 7), (h = 4)));
					}
					function x(t, e, a) {
						var i,
							n,
							r = -1,
							s = e[1],
							o = 0,
							d = 7,
							f = 4;
						for (
							0 === s && ((d = 138), (f = 3)), i = 0;
							i <= a;
							i++
						)
							if (
								((n = s),
								(s = e[2 * (i + 1) + 1]),
								!(++o < d && n === s))
							) {
								if (o < f)
									do {
										h(t, n, t.bl_tree);
									} while (0 != --o);
								else
									0 !== n
										? (n !== r && (h(t, n, t.bl_tree), o--),
										  h(t, q, t.bl_tree),
										  l(t, o - 3, 2))
										: o <= 10
										? (h(t, G, t.bl_tree), l(t, o - 3, 3))
										: (h(t, X, t.bl_tree), l(t, o - 11, 7));
								(o = 0),
									(r = n),
									0 === s
										? ((d = 138), (f = 3))
										: n === s
										? ((d = 6), (f = 3))
										: ((d = 7), (f = 4));
							}
					}
					function z(t) {
						var e;
						for (
							y(t, t.dyn_ltree, t.l_desc.max_code),
								y(t, t.dyn_dtree, t.d_desc.max_code),
								k(t, t.bl_desc),
								e = H - 1;
							e >= 3 && 0 === t.bl_tree[2 * V[e] + 1];
							e--
						);
						return (t.opt_len += 3 * (e + 1) + 5 + 5 + 4), e;
					}
					function B(t, e, a, i) {
						var n;
						for (
							l(t, e - 257, 5),
								l(t, a - 1, 5),
								l(t, i - 4, 4),
								n = 0;
							n < i;
							n++
						)
							l(t, t.bl_tree[2 * V[n] + 1], 3);
						x(t, t.dyn_ltree, e - 1), x(t, t.dyn_dtree, a - 1);
					}
					function S(t) {
						var e,
							a = 4093624447;
						for (e = 0; e <= 31; e++, a >>>= 1)
							if (1 & a && 0 !== t.dyn_ltree[2 * e]) return R;
						if (
							0 !== t.dyn_ltree[18] ||
							0 !== t.dyn_ltree[20] ||
							0 !== t.dyn_ltree[26]
						)
							return C;
						for (e = 32; e < T; e++)
							if (0 !== t.dyn_ltree[2 * e]) return C;
						return R;
					}
					function E(t, e, a, i) {
						l(t, (O << 1) + (i ? 1 : 0), 3), m(t, e, a, !0);
					}
					var A = t("../utils/common"),
						Z = 4,
						R = 0,
						C = 1,
						N = 2,
						O = 0,
						D = 1,
						I = 2,
						U = 29,
						T = 256,
						F = T + 1 + U,
						L = 30,
						H = 19,
						j = 2 * F + 1,
						K = 15,
						M = 16,
						P = 7,
						Y = 256,
						q = 16,
						G = 17,
						X = 18,
						W = [
							0,
							0,
							0,
							0,
							0,
							0,
							0,
							0,
							1,
							1,
							1,
							1,
							2,
							2,
							2,
							2,
							3,
							3,
							3,
							3,
							4,
							4,
							4,
							4,
							5,
							5,
							5,
							5,
							0
						],
						J = [
							0,
							0,
							0,
							0,
							1,
							1,
							2,
							2,
							3,
							3,
							4,
							4,
							5,
							5,
							6,
							6,
							7,
							7,
							8,
							8,
							9,
							9,
							10,
							10,
							11,
							11,
							12,
							12,
							13,
							13
						],
						Q = [
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
							0,
							0,
							2,
							3,
							7
						],
						V = [
							16,
							17,
							18,
							0,
							8,
							7,
							9,
							6,
							10,
							5,
							11,
							4,
							12,
							3,
							13,
							2,
							14,
							1,
							15
						],
						$ = new Array(2 * (F + 2));
					i($);
					var tt = new Array(2 * L);
					i(tt);
					var et = new Array(512);
					i(et);
					var at = new Array(256);
					i(at);
					var it = new Array(U);
					i(it);
					var nt = new Array(L);
					i(nt);
					var rt,
						st,
						ot,
						lt = !1;
					(a._tr_init = function(t) {
						lt || (c(), (lt = !0)),
							(t.l_desc = new r(t.dyn_ltree, rt)),
							(t.d_desc = new r(t.dyn_dtree, st)),
							(t.bl_desc = new r(t.bl_tree, ot)),
							(t.bi_buf = 0),
							(t.bi_valid = 0),
							b(t);
					}),
						(a._tr_stored_block = E),
						(a._tr_flush_block = function(t, e, a, i) {
							var n,
								r,
								s = 0;
							t.level > 0
								? (t.strm.data_type === N &&
										(t.strm.data_type = S(t)),
								  k(t, t.l_desc),
								  k(t, t.d_desc),
								  (s = z(t)),
								  (n = (t.opt_len + 3 + 7) >>> 3),
								  (r = (t.static_len + 3 + 7) >>> 3) <= n &&
										(n = r))
								: (n = r = a + 5),
								a + 4 <= n && -1 !== e
									? E(t, e, a, i)
									: t.strategy === Z || r === n
									? (l(t, (D << 1) + (i ? 1 : 0), 3),
									  v(t, $, tt))
									: (l(t, (I << 1) + (i ? 1 : 0), 3),
									  B(
											t,
											t.l_desc.max_code + 1,
											t.d_desc.max_code + 1,
											s + 1
									  ),
									  v(t, t.dyn_ltree, t.dyn_dtree)),
								b(t),
								i && g(t);
						}),
						(a._tr_tally = function(t, e, a) {
							return (
								(t.pending_buf[t.d_buf + 2 * t.last_lit] =
									(e >>> 8) & 255),
								(t.pending_buf[t.d_buf + 2 * t.last_lit + 1] =
									255 & e),
								(t.pending_buf[t.l_buf + t.last_lit] = 255 & a),
								t.last_lit++,
								0 === e
									? t.dyn_ltree[2 * a]++
									: (t.matches++,
									  e--,
									  t.dyn_ltree[2 * (at[a] + T + 1)]++,
									  t.dyn_dtree[2 * s(e)]++),
								t.last_lit === t.lit_bufsize - 1
							);
						}),
						(a._tr_align = function(t) {
							l(t, D << 1, 3), h(t, Y, $), f(t);
						});
				},
				{ "../utils/common": 3 }
			],
			15: [
				function(t, e, a) {
					"use strict";
					e.exports = function() {
						(this.input = null),
							(this.next_in = 0),
							(this.avail_in = 0),
							(this.total_in = 0),
							(this.output = null),
							(this.next_out = 0),
							(this.avail_out = 0),
							(this.total_out = 0),
							(this.msg = ""),
							(this.state = null),
							(this.data_type = 2),
							(this.adler = 0);
					};
				},
				{}
			],
			"/": [
				function(t, e, a) {
					"use strict";
					var i = {};
					(0, t("./lib/utils/common").assign)(
						i,
						t("./lib/deflate"),
						t("./lib/inflate"),
						t("./lib/zlib/constants")
					),
						(e.exports = i);
				},
				{
					"./lib/deflate": 1,
					"./lib/inflate": 2,
					"./lib/utils/common": 3,
					"./lib/zlib/constants": 6
				}
			]
		},
		{},
		[]
	)("/");
});
var minipdf = (function() {
	"use strict";
	var Name = function(name) {
		this.name = name;
	};
	function isName(obj) {
		return obj instanceof Name;
	}
	var Dict = function(map) {
		this.map = map;
	};
	function isDict(obj) {
		return obj instanceof Dict;
	}
	var Stream = function(map, content) {
		this.map = map;
		this.content = content;
		this.dict = new Dict(map);
	};
	Stream.prototype.getBytes = function() {
		return this.content;
	};
	function newStream(map, content) {
		assert(
			content instanceof Uint8Array,
			"stream content must be an Uint8Array"
		);
		return new Stream(map, content);
	}
	function isStream(obj) {
		return obj instanceof Stream;
	}
	var Ref = function(num, gen) {
		this.num = num;
		this.gen = gen;
	};
	function isRef(obj) {
		return obj instanceof Ref;
	}
	function isBool(obj) {
		return typeof obj == "boolean";
	}
	function isNull(obj) {
		return obj === null;
	}
	function isString(obj) {
		return typeof obj == "string";
	}
	function isNum(obj) {
		return typeof obj == "number";
	}
	function isArray(obj) {
		return obj instanceof Array;
	}
	function assert(x, msg) {
		if (x) {
			return;
		}
		if (!msg) {
			msg = "Assertion failed";
		}
		throw new Error(msg);
	}
	function str2buf(s) {
		var uint = new Uint8Array(s.length);
		for (var i = 0, slen = s.length; i < slen; i++) {
			uint[i] = s.charCodeAt(i);
		}
		return uint;
	}
	function png_filter(content, columns) {
		var cols = columns + 1;
		var rows = content.length / cols;
		assert(
			rows % 1 === 0,
			"Invalid column value " +
				cols +
				" for image width " +
				content.length
		);
		var res = new Uint8Array(columns * rows);
		for (var y = 0; y < rows; y++) {
			var x;
			var filter = content[y * cols];
			if (filter === 0) {
				for (x = 0; x < columns; x++) {
					res[y * columns + x] = content[y * cols + 1 + x];
				}
			} else if (filter === 2) {
				for (x = 0; x < columns; x++) {
					var prev = y === 0 ? 0 : res[(y - 1) * columns + x];
					res[y * columns + x] =
						(prev + content[y * cols + 1 + x]) & 255;
				}
			} else {
				throw new Error("Unsupported PNG filter " + filter);
			}
		}
		return res;
	}
	function _merge_xrefs(xref_table, prev) {
		var len = Math.max(xref_table.length, prev.length);
		for (var i = 1; i < len; i++) {
			if (!prev[i]) {
				continue;
			}
			if (!xref_table[i]) {
				xref_table[i] = prev[i];
			}
		}
	}
	function inflate(content, params_map) {
		var columns;
		var predictor = 1;
		if (params_map) {
			predictor = params_map.Predictor;
			columns = params_map.Columns;
			if (params_map.Colors) {
				if (params_map.Colors != 1) {
					throw new Error(
						"Unsupported predictor Colors value: " +
							params_map.Colors
					);
				}
			}
			if (params_map.BitsPerComponent) {
				if (params_map.BitsPerComponent != 8) {
					throw new Error(
						"Unsupported predictor BitsPerComponent value: " +
							params_map.BitsPerComponent
					);
				}
			}
		}
		var res = pako.inflate(content);
		if (predictor == 1) {
			return res;
		}
		assert(columns > 0, "columns must be set for PNG predictors");
		if (predictor >= 10 && predictor <= 15) {
			res = png_filter(res, columns);
		} else {
			throw new Error("Unsupported predictor " + predictor);
		}
		return res;
	}
	function parse(buf) {
		return new PDFDocument(buf);
	}
	var PDFDocument = function(buf) {
		this._cached_object_streams = {};
		this.buf = buf;
		this.reader = new PDFReader(buf);
		check_header(buf);
		this.startxref = find_startxref(buf);
		this.reader.pos = this.startxref;
		var xref_res = this.reader.parse_xref();
		this.xref = xref_res.xref;
		assert(isArray(this.xref));
		this.meta = xref_res.meta;
		assert(this.meta.Root, "meta.Root missing");
		assert(isRef(this.meta.Root), "meta.root should be Ref");
		this.root = this.fetch(this.meta.Root);
		this.xref_type = this.reader.xref_type;
		var af_node = this.get_acroform_ref();
		if (isRef(af_node)) {
			this.acroForm = this.fetch(af_node);
		} else {
			this.acroForm = af_node;
		}
	};
	PDFDocument.prototype.get_root_id = function() {
		return this.meta.Root.num;
	};
	PDFDocument.prototype.get_xref_entries = function() {
		return this.xref;
	};
	PDFDocument.prototype.get_acroform_ref = function() {
		return this.root.map.AcroForm;
	};
	PDFDocument.prototype.fetch = function(ref, recursive) {
		assert(ref instanceof Ref);
		var xref_entry = this.xref[ref.num];
		if (!xref_entry) {
			throw new Error("Cannot find object " + ref.num + " in xref table");
		}
		if (xref_entry.type === 0) {
			throw new Error("Cannot fetch a free object");
		}
		if (xref_entry.type == 2) {
			if (recursive) {
				throw new Error(
					"Cannot fetch object stream inside object stream"
				);
			}
			if (ref.gen !== 0) {
				throw new Error(
					"Object with reference " +
						ref.gen +
						" cannot be found in object stream"
				);
			}
			var object_stream = this._cached_object_streams[xref_entry.offset];
			if (!object_stream) {
				var object_stream_obj = this.fetch(
					new Ref(xref_entry.offset, 0),
					true
				);
				object_stream = parse_object_stream(object_stream_obj);
				this._cached_object_streams[xref_entry.offset] = object_stream;
			}
			if (!(ref.num in object_stream)) {
				throw new Error(
					"Could not find object " +
						ref.num +
						" in object stream with entries " +
						JSON.stringify(Object.keys(object_stream))
				);
			}
			var res = object_stream[ref.num];
			return res;
		}
		if (ref.gen != xref_entry.gen) {
			throw new Error(
				"Invalid generation: Asked for " +
					ref.gen +
					", table has " +
					xref_entry.gen
			);
		}
		this.reader.pos = xref_entry.offset;
		var obj = this.reader.parse_object();
		if (obj.num !== ref.num) {
			throw new Error(
				"Expected to read object with ID " +
					ref.num +
					", but found " +
					obj.num
			);
		}
		if (obj.gen !== ref.gen) {
			throw new Error(
				"Expected to read object with gen " +
					ref.gen +
					", but found " +
					obj.gen
			);
		}
		return obj.obj;
	};
	var PDFReader = function(buf) {
		assert(
			buf instanceof Uint8Array,
			"Expected a buffer of type Uint8Array"
		);
		assert(buf.BYTES_PER_ELEMENT === 1, "not a Uint8Array!");
		this.buf = buf;
		this.pos = 0;
	};
	PDFReader.prototype = {
		skip_space: function() {
			while (this.pos < this.buf.length) {
				var c = this.buf[this.pos];
				if (c == 9 || c == 10 || c == 13 || c == 32) {
					this.pos++;
				} else {
					break;
				}
			}
		},
		skip_start: function(str) {
			if (startswith(this.buf, this.pos, str)) {
				this.pos += str.length;
				return true;
			}
			return false;
		},
		read_uint: function(len) {
			var res = 0;
			while (len > 0) {
				assert(
					this.buf[this.pos] !== undefined,
					"reading uint at position " +
						this.pos +
						" of " +
						this.buf.length
				);
				res = ((res << 8) | (this.buf[this.pos] & 255)) >>> 0;
				this.pos++;
				len--;
			}
			return res;
		},
		parse_string: function() {
			var res = "";
			var parens = 1;
			while (this.pos < this.buf.length) {
				var c = String.fromCharCode(this.buf[this.pos]);
				this.pos++;
				if (c == ")") {
					parens--;
					if (parens === 0) {
						break;
					}
					res += c;
				} else if (c == "(") {
					parens++;
					res += c;
				} else if (c == "\\") {
					c = String.fromCharCode(this.buf[this.pos]);
					this.pos++;
					switch (c) {
						case "n":
							res += "\n";
							break;
						case "r":
							res += "\r";
							break;
						case "t":
							res += "\t";
							break;
						case "\r":
						case "\n":
							break;
						case "\\":
						case "(":
						case ")":
							res += c;
							break;
						default:
							throw new Error('Unsupported escape "' + c + '"');
					}
				} else {
					res += c;
				}
			}
			return res;
		},
		parse_hex_string: function() {
			var start_pos = this.pos;
			while (this.pos < this.buf.length) {
				if (this.buf[this.pos] == ">".charCodeAt(0)) {
					break;
				}
				this.pos++;
			}
			var hex_str = buf2str(this.buf, start_pos, this.pos);
			this.pos++;
			if (hex_str.length % 2 == 1) {
				hex_str += "0";
			}
			if (!/^[0-9A-Fa-f]*$/.test(hex_str)) {
				throw new Error("Invalid hex string " + hex_str);
			}
			return hex_str.replace(/([0-9A-Fa-f]{2})/g, function() {
				return String.fromCharCode(parseInt(arguments[1], 16));
			});
		},
		parse_num: function() {
			var res = 0;
			var first_pos = this.pos;
			while (this.pos < this.buf.length) {
				var by = this.buf[this.pos];
				if (48 <= by && by <= 57) {
					res = res * 10 + by - 48;
				} else {
					break;
				}
				this.pos++;
			}
			if (first_pos === this.pos) {
				throw new Error(
					"Not an ASCII number byte: " + this.buf[this.pos]
				);
			}
			return res;
		},
		parse_name: function() {
			var start_pos = this.pos;
			var DELIM_CHARS = [
				0,
				9,
				13,
				10,
				32,
				40,
				41,
				60,
				62,
				91,
				93,
				123,
				125,
				47,
				37
			];
			while (this.pos < this.buf.length) {
				if (DELIM_CHARS.indexOf(this.buf[this.pos]) >= 0) {
					break;
				}
				this.pos++;
			}
			var name = buf2str(this.buf, start_pos, this.pos);
			name = name.replace(/#([0-9a-fA-F]{2})/g, function(_, hex) {
				return String.fromCharCode(parseInt(hex, 16));
			});
			return new Name(name);
		},
		parse_array: function() {
			var res = [];
			for (;;) {
				this.skip_space();
				if (this.buf[this.pos] == 93) {
					break;
				}
				var el = this.parse();
				res.push(el);
			}
			this.pos++;
			return res;
		},
		parse_dict: function() {
			var map = {};
			while (this.pos < this.buf.length) {
				this.skip_space();
				if (this.skip_start(">>")) {
					break;
				}
				if (!this.skip_start("/")) {
					throw new Error("Key is not a name in dict");
				}
				var k = this.parse_name();
				var v = this.parse();
				map[k.name] = v;
			}
			var sav_pos = this.pos;
			this.skip_space();
			if (
				this.skip_start("stream\r\n") ||
				this.skip_start("stream\n") ||
				this.skip_start("stream")
			) {
				return this.parse_stream_content(map);
			} else {
				this.pos = sav_pos;
				return new Dict(map);
			}
		},
		parse_stream_content: function(map) {
			if (typeof map.Length != "number") {
				throw new Error(
					"Stream Length field missing or invalid: " +
						JSON.stringify(map.Length)
				);
			}
			if (this.pos + map.Length > this.buf.length) {
				throw new Error("Stream Length too large");
			}
			var content = this.buf.subarray(this.pos, this.pos + map.Length);
			this.pos += map.Length;
			this.skip_space();
			if (!this.skip_start("endstream")) {
				throw new Error("Missing endstream");
			}
			if (map.Filter) {
				var filters =
					map.Filter instanceof Array ? map.Filter : [map.Filter];
				var params =
					map.DecodeParms instanceof Array
						? map.DecodeParms
						: [map.DecodeParms];
				for (var i = 0; i < filters.length; i++) {
					var filter_params = params[i];
					switch (filters[i].name) {
						case "FlateDecode":
							content = inflate(
								content,
								filter_params
									? filter_params.map
									: filter_params
							);
							break;
						default:
							throw new Error(
								"Unsupported filter: " +
									JSON.stringify(filters[i].name)
							);
					}
				}
			}
			return new Stream(map, content);
		},
		parse: function() {
			this.skip_space();
			if (this.skip_start("<<")) {
				return this.parse_dict();
			}
			if (this.skip_start("[")) {
				return this.parse_array();
			}
			if (this.skip_start("(")) {
				return this.parse_string();
			}
			if (this.skip_start("<")) {
				return this.parse_hex_string();
			}
			if (this.skip_start("/")) {
				return this.parse_name();
			}
			if (this.skip_start("true")) {
				return true;
			}
			if (this.skip_start("false")) {
				return false;
			}
			if (this.skip_start("null")) {
				return null;
			}
			var s = buf2str(this.buf, this.pos, this.pos + 32);
			var m = /^([0-9]+)\s+([0-9]+)\s+R/.exec(s);
			if (m) {
				this.pos += m[0].length;
				return new Ref(parseInt(m[1], 10), parseInt(m[2], 10));
			}
			m = /^[+-]?(?:[0-9]*\.[0-9]*|[0-9]+)/.exec(s);
			if (m) {
				this.pos += m[0].length;
				return parseFloat(m[0]);
			}
			throw new Error(
				"Unable to parse " + buf2str(this.buf, this.pos, this.pos + 40)
			);
		},
		parse_xref: function() {
			if (startswith(this.buf, this.pos, "xref")) {
				this.xref_type = "table";
				return this.parse_xref_table();
			}
			this.xref_type = "stream";
			var obj = this.parse_object().obj;
			var xref = [];
			if ("Prev" in obj.map) {
				var sav_pos = this.pos;
				this.pos = obj.map.Prev;
				xref = this.parse_xref().xref;
				this.pos = sav_pos;
			}
			assert(
				obj instanceof Stream,
				"XRefs should be a stream, got " +
					JSON.stringify(obj) +
					" instead"
			);
			assert(
				obj.map.Type.name === "XRef",
				"XRef table should be of Type XRef"
			);
			assert(obj.map.W.length == 3);
			var type_length = obj.map.W[0];
			assert(type_length <= 4);
			var offset_length = obj.map.W[1];
			assert(offset_length >= 1 && offset_length <= 4);
			var gen_length = obj.map.W[2];
			assert(gen_length >= 1 && gen_length <= 4);
			assert(
				obj.content.length %
					(type_length + offset_length + gen_length) ===
					0,
				"content is " +
					obj.content.length +
					" bytes long, each entry is " +
					JSON.stringify(obj.map.W)
			);
			var first_index = 0;
			if (obj.map.Index) {
				first_index = obj.map.Index[0];
				assert(typeof first_index == "number");
			}
			var count =
				obj.content.length / (type_length + offset_length + gen_length);
			if (obj.map.Index) {
				assert(
					obj.map.Index[1] == count,
					"Invalid xref stream index: index says " +
						obj.map.Index[1] +
						" objects, but space for " +
						count
				);
			}
			var reader = new PDFReader(obj.content);
			for (var i = 0; i < count; i++) {
				var type = 1;
				if (type_length) {
					type = reader.read_uint(type_length);
				}
				var offset = reader.read_uint(offset_length);
				var gen = reader.read_uint(gen_length);
				xref[first_index + i] = {
					uncompressed: type != 2,
					type: type,
					offset: offset,
					gen: gen
				};
			}
			assert(reader.at_eof());
			return { meta: obj.map, xref: xref };
		},
		parse_object: function() {
			var s = buf2str(this.buf, this.pos, this.pos + 32);
			var m = /^([0-9]+)\s+([0-9]+)\s+obj/.exec(s);
			if (!m) {
				throw new Error("Missing object ID: " + s);
			}
			var real_num = parseInt(m[1], 10);
			var real_gen = parseInt(m[2], 10);
			this.pos += m[0].length;
			var obj = this.parse();
			this.skip_space();
			if (!this.skip_start("endobj")) {
				throw new Error(
					"endobj missing, current str: " +
						JSON.stringify(
							buf2str(this.buf, this.pos, this.pos + 32)
						)
				);
			}
			return { obj: obj, num: real_num, gen: real_gen };
		},
		parse_xref_table: function() {
			if (!this.skip_start("xref")) {
				throw new Error("xref table does not start with xref!");
			}
			this.skip_space();
			var start_num = this.parse_num();
			var xref = [];
			for (var j = 0; j < start_num; j++) {
				xref.push(undefined);
			}
			this.skip_space();
			this.parse_num();
			for (;;) {
				this.skip_space();
				if (this.skip_start("trailer")) {
					break;
				}
				var offset = this.parse_num();
				this.skip_space();
				var gen = this.parse_num();
				this.skip_space();
				var usage = this.buf[this.pos];
				if (usage == 102 || usage == 110) {
					this.pos++;
				} else {
					while (xref.length < offset) {
						xref.push(undefined);
					}
					continue;
				}
				xref.push({ offset: offset, gen: gen, is_free: usage === 102 });
			}
			var meta = this.parse();
			if (meta.map.Prev) {
				this.pos = meta.map.Prev;
				var old = this.parse_xref_table();
				_merge_xrefs(xref, old.xref);
			}
			return { xref: xref, meta: meta.map };
		},
		at_eof: function() {
			return this.pos == this.buf.length;
		}
	};
	function startswith(buf, pos, str) {
		for (var i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) != buf[pos + i]) {
				return false;
			}
		}
		return true;
	}
	function buf2str(buf, from, to) {
		if (from === undefined) {
			from = 0;
		}
		if (to === undefined) {
			to = buf.length;
		}
		var max = Math.min(to, buf.length);
		var res = "";
		for (var i = from; i < max; i++) {
			res += String.fromCharCode(buf[i]);
		}
		return res;
	}
	function check_header(buf) {
		if (!startswith(buf, 0, "%PDF-")) {
			throw new Error("Does not look like a PDF file!");
		}
	}
	function find_startxref(buf) {
		var s = buf2str(buf, buf.length - 40, buf.length);
		var m = /startxref\s*([0-9]+)/.exec(s);
		if (!m) {
			throw new Error("Cannot find startxref!");
		}
		return parseInt(m[1]);
	}
	function parse_object_stream(os_obj) {
		assert(
			os_obj.map.Type.name === "ObjStm",
			"Strange Type for an object stream: " +
				JSON.stringify(os_obj.map.Type.name)
		);
		var s = buf2str(os_obj.content, 0, os_obj.map.First);
		var rex = /\s*([0-9]+)\s+([0-9]+)/g;
		var res = [];
		var r = new PDFReader(os_obj.content);
		for (var i = 0; i < os_obj.map.N; i++) {
			var m = rex.exec(s);
			if (!m) {
				throw new Error(
					"Expected " +
						os_obj.map.N +
						" objects in this object stream, failed to read number " +
						i
				);
			}
			var num = parseInt(m[1], 10);
			var offset = parseInt(m[2], 10);
			r.pos = offset + os_obj.map.First;
			res[num] = r.parse();
		}
		return res;
	}
	return {
		parse: parse,
		PDFDocument: PDFDocument,
		isName: isName,
		isStream: isStream,
		isDict: isDict,
		isRef: isRef,
		isNum: isNum,
		isArray: isArray,
		isString: isString,
		isBool: isBool,
		isNull: isNull,
		newStream: newStream,
		assert: assert,
		buf2str: buf2str,
		str2buf: str2buf,
		PDFReader: PDFReader,
		Name: Name,
		Dict: Dict,
		Ref: Ref,
		Stream: Stream
	};
})();
if (typeof module != "undefined" && typeof require != "undefined") {
	var pako = require("pako");
	module.exports = minipdf;
}
("use strict");
if (typeof window == "undefined") {
	var DOMParser = require("xmldom").DOMParser;
	var XMLSerializer = require("xmldom").XMLSerializer;
	var text_encoding = require("text-encoding");
	var TextEncoder = text_encoding.TextEncoder;
	var TextDecoder = text_encoding.TextDecoder;
	var pako = require("pako");
}
function pdfform(minipdf_lib) {
	if (minipdf_lib === "pdf.js") {
		minipdf_lib = require("./minipdf_js.js");
	}
	if (!minipdf_lib) {
		if (typeof minipdf_js != "undefined") {
			minipdf_lib = minipdf_js;
		} else if (typeof minipdf != "undefined") {
			minipdf_lib = minipdf;
		} else {
			minipdf_lib = require("./minipdf.js");
		}
	}
	var assert = minipdf_lib.assert;
	function BytesIO() {
		this.length = 0;
		this.entries = [];
	}
	BytesIO.prototype = {
		write_str: function(s) {
			this.length += s.length;
			assert(typeof s == "string");
			this.entries.push(s);
		},
		write_buf: function(buf) {
			this.length += buf.length;
			assert(
				buf instanceof Uint8Array,
				"Expected a Uint8Array, but got " + buf
			);
			this.entries.push(buf);
		},
		get_uint8array: function() {
			var res = new Uint8Array(this.length);
			var pos = 0;
			this.entries.forEach(function(e) {
				if (typeof e == "string") {
					for (var i = 0, slen = e.length; i < slen; i++, pos++) {
						res[pos] = e.charCodeAt(i);
					}
				} else {
					res.set(e, pos);
					pos += e.length;
				}
			});
			assert(pos === this.length);
			return res;
		},
		position: function() {
			return this.length;
		}
	};
	function pad(num, length) {
		var ret = num + "";
		while (ret.length < length) {
			ret = "0" + ret;
		}
		return ret;
	}
	function serialize_str(str) {
		var ret, i;
		if (/^[-_/. a-zA-Z0-9]+$/.test(str)) {
			return "(" + str + ")";
		}
		if (/^[\x00-\x7F\xe4\xf6\xfc\xc4\xd6\xdc\xdf]*$/.test(str)) {
			ret = "(";
			for (i = 0; i < str.length; i++) {
				var c = str[i];
				if (c === "\\" || c === "(" || c === ")") {
					ret += "\\";
				}
				ret += c;
			}
			ret += ")";
			return ret;
		}
		ret = "(";
		ret += "\xfe\xff";
		for (i = 0; i < str.length; i++) {
			var cu = str.charCodeAt(i);
			var c1 = String.fromCharCode(cu >> 8);
			if (c1 === "\\" || c1 === "(" || c1 === ")") {
				ret += "\\";
			}
			ret += c1;
			var c2 = String.fromCharCode(cu & 255);
			if (c2 === "\\" || c2 === "(" || c2 === ")") {
				ret += "\\";
			}
			ret += c2;
		}
		ret += ")";
		return ret;
	}
	function serialize(node, uncompressed) {
		var i, ret;
		if (minipdf_lib.isRef(node)) {
			return node.num + " " + node.gen + " R";
		} else if (minipdf_lib.isNum(node)) {
			return node;
		} else if (minipdf_lib.isBool(node)) {
			return node;
		} else if (minipdf_lib.isNull(node)) {
			return "null";
		} else if (minipdf_lib.isName(node)) {
			assert(node.name);
			return "/" + node.name;
		} else if (minipdf_lib.isString(node)) {
			return serialize_str(node);
		} else if (minipdf_lib.isArray(node)) {
			ret = ["["];
			for (i = 0; i < node.length; i++) {
				ret.push(serialize(node[i], uncompressed));
			}
			ret.push("]");
			return ret.join(" ");
		} else if (minipdf_lib.isDict(node)) {
			var map = node.map;
			ret = ["<<"];
			for (var key in map) {
				ret.push("/" + key + " " + serialize(map[key], uncompressed));
			}
			ret.push(">>");
			return ret.join("\n");
		} else if (minipdf_lib.isStream(node)) {
			ret = "";
			delete node.dict.map.DecodeParms;
			delete node.dict.map.Filter;
			var content = node.getBytes();
			assert(
				content,
				"expecting byte content from " + JSON.stringify(node)
			);
			var out;
			if (uncompressed) {
				out = minipdf_lib.buf2str(content);
				node.dict.map.Length = out.length;
			} else {
				out = minipdf_lib.buf2str(pako.deflate(content));
				node.dict.map.Length = out.length;
				node.dict.map.Filter = [new minipdf_lib.Name("FlateDecode")];
			}
			assert(minipdf_lib.isDict(node.dict));
			ret += serialize(node.dict, uncompressed);
			ret += "\nstream\n";
			ret += out;
			ret += "\nendstream\n";
			return ret;
		} else {
			throw new Error("Unknown node type " + JSON.stringify(node));
		}
	}
	function PDFObjects(doc) {
		this.entries = doc.get_xref_entries();
		assert(
			minipdf_lib.isArray(this.entries),
			"xref entries should be an Array"
		);
	}
	PDFObjects.prototype = {
		add: function(obj, gen) {
			var e = {
				obj: obj,
				gen: gen,
				num: this.entries.length,
				uncompressed: "added"
			};
			this.entries.push(e);
			return e;
		},
		update: function(ref, obj) {
			assert(ref.num !== undefined);
			assert(ref.gen !== undefined);
			var e = {
				obj: obj,
				gen: ref.gen,
				num: ref.num,
				uncompressed: "added"
			};
			this.entries[e.num] = e;
			return e;
		},
		write_object: function(out, e, uncompressed) {
			e.offset = out.position();
			assert(e.num !== undefined);
			var bs = serialize(e.obj, uncompressed);
			out.write_str(e.num + " " + e.gen + " obj\n");
			out.write_str(bs);
			out.write_str("\nendobj\n");
		},
		write_xref_stream: function(out, prev, root_ref) {
			var map = {
				Type: new minipdf_lib.Name("XRef"),
				Size: this.entries.length + 1,
				Length: 6 * (this.entries.length + 1),
				Root: root_ref,
				W: [1, 4, 1]
			};
			if (prev !== undefined) {
				map.Prev = prev;
			}
			var bio = new BytesIO();
			var entry = this.add("__xref_stream__", 0);
			entry.offset = out.position();
			this.entries.forEach(function(e) {
				assert(e.offset !== undefined, "entry should have an offset");
				bio.write_buf(
					new Uint8Array([
						e.uncompressed ? 1 : 2,
						e.offset >> 24,
						(e.offset >> 16) & 255,
						(e.offset >> 8) & 255,
						e.offset & 255,
						e.gen
					])
				);
			});
			var ui8ar = bio.get_uint8array();
			var stream = minipdf_lib.newStream(map, ui8ar);
			entry.obj = stream;
			this.write_object(out, entry, true);
		},
		write_xref_table: function(out, prev, root_ref) {
			var entries = this.entries.filter(function(e) {
				return !e.is_free;
			});
			var size = 1 + entries.length;
			out.write_str("xref\n");
			out.write_str("0 " + size + "\n");
			out.write_str("0000000000 65535 f\r\n");
			entries.forEach(function(e) {
				assert(e.offset !== undefined, "entry should have an offset");
				out.write_str(
					pad(e.offset, 10) + " " + pad(e.gen, 5) + " n\r\n"
				);
			});
			out.write_str("trailer\n");
			var trailer = new minipdf_lib.Dict({ Size: size, Root: root_ref });
			out.write_str(serialize(trailer, true));
		}
	};
	function visit_acroform_fields(doc, callback) {
		if (doc.acroForm) {
			var to_visit = doc.acroForm.map.Fields.slice();
			while (to_visit.length > 0) {
				var n = to_visit.shift();
				if (minipdf_lib.isRef(n)) {
					var ref = n;
					n = doc.fetch(n);
					n._pdfform_ref = ref;
				}
				if (n.map && n.map.Kids) {
					to_visit.push.apply(to_visit, n.map.Kids);
				} else if (
					n.map &&
					n.map.Type &&
					n.map.Type.name == "Annot" &&
					n.map.T
				) {
					callback(n);
				}
			}
		} else {
			var pages = doc.fetch(doc.root.map.Pages);
			pages.map.Kids.forEach(function(page_ref) {
				var page = doc.fetch(page_ref);
				var annots_ref = page.map.Annots;
				var annots = doc.fetch(annots_ref);
				annots.forEach(function(annot_ref) {
					var n = doc.fetch(annot_ref);
					n._pdfform_ref = annot_ref;
					n._inpage_annot = true;
					if (
						n.map &&
						n.map.Type &&
						n.map.Type.name == "Annot" &&
						n.map.T
					) {
						callback(n);
					}
				});
			});
		}
	}
	function pdf_decode_str(str) {
		if (!str.startsWith("\xfe\xff")) {
			return str;
		}
		var res = "";
		for (var i = 2; i < str.length; i += 2) {
			res += String.fromCharCode(
				(str.charCodeAt(i) << 8) | str.charCodeAt(i + 1)
			);
		}
		return res;
	}
	function acroform_match_spec(n, fields) {
		var t = pdf_decode_str(n.map.T);
		if (t in fields) {
			return fields[t][0];
		} else {
			var m = /^(.*)\[([0-9]+)\]$/.exec(t);
			if (m && m[1] in fields) {
				return fields[m[1]][m[2]];
			}
		}
		return undefined;
	}
	function modify_xfa(doc, objects, out, index, callback) {
		if (!doc.acroForm) {
			return;
		}
		var xfa = doc.acroForm.map.XFA;
		if (!xfa) {
			return;
		}
		var section_idx = xfa.indexOf(index);
		assert(section_idx >= 0);
		var section_ref = xfa[section_idx + 1];
		var section_node = doc.fetch(section_ref);
		assert(
			minipdf_lib.isStream(section_node),
			"XFA section node should be a stream"
		);
		var bs = section_node.getBytes();
		assert(bs);
		var prev_str = new TextDecoder("utf-8").decode(bs);
		var str = callback(prev_str);
		var out_bs = new TextEncoder("utf-8").encode(str);
		var out_node = minipdf_lib.newStream(section_node.dict.map, out_bs);
		assert(minipdf_lib.isStream(out_node));
		var e = objects.update(section_ref, out_node);
		objects.write_object(out, e);
	}
	function transform(buf, fields) {
		var doc = minipdf_lib.parse(new Uint8Array(buf));
		var objects = new PDFObjects(doc);
		var root_id = doc.get_root_id();
		var root_ref = new minipdf_lib.Ref(root_id, 0);
		var out = new BytesIO();
		out.write_buf(new Uint8Array(buf));
		visit_acroform_fields(doc, function(n) {
			var spec = acroform_match_spec(n, fields);
			if (spec === undefined) {
				return;
			}
			var ft_name = n.map.FT.name;
			if (ft_name == "Tx") {
				n.map.V = "" + spec;
			} else if (ft_name == "Btn") {
				n.map.AS = n.map.V = n.map.DV = spec
					? new minipdf_lib.Name("Yes")
					: new minipdf_lib.Name("Off");
			} else if (ft_name == "Ch") {
				n.map.V = "" + spec;
			} else if (ft_name == "Sig") {
				return;
			} else {
				throw new Error("Unsupported input type " + n.map.FT.name);
			}
			var ref = n._pdfform_ref;
			var e = objects.update(ref, n);
			objects.write_object(out, e);
		});
		var acroform_ref = doc.get_acroform_ref();
		if (acroform_ref) {
			doc.acroForm.map.NeedAppearances = true;
			if (minipdf_lib.isRef(acroform_ref)) {
				var e = objects.update(acroform_ref, doc.acroForm);
				objects.write_object(out, e);
			} else {
				doc.root.map.AcroForm = doc.acroForm;
				var root = objects.update(root_ref, doc.root);
				objects.write_object(out, root);
			}
		}
		modify_xfa(doc, objects, out, "datasets", function(str) {
			str = str.replace(/\n(\/?>)/g, "$1\n");
			var ds_doc = new DOMParser().parseFromString(
				str,
				"application/xml"
			);
			for (var f in fields) {
				var els = ds_doc.getElementsByTagName(f);
				for (var i = 0; i < els.length; i++) {
					var val = fields[f][i];
					if (val === undefined) {
						continue;
					}
					var el = els[i];
					while (el.firstChild) {
						el.removeChild(el.firstChild);
					}
					if (typeof val == "boolean") {
						val = val ? 1 : 0;
					}
					el.appendChild(ds_doc.createTextNode(val));
				}
			}
			str = new XMLSerializer().serializeToString(ds_doc);
			return str;
		});
		var startxref = out.position();
		if (doc.xref_type === "table") {
			objects.write_xref_table(out, doc.startXRef, root_ref);
		} else {
			objects.write_xref_stream(out, doc.startXRef, root_ref);
		}
		out.write_str("\nstartxref\n");
		out.write_str(startxref + "\n");
		out.write_str("%%EOF");
		return out.get_uint8array();
	}
	function list_fields(data) {
		var doc = minipdf_lib.parse(new Uint8Array(data));
		var res = {};
		visit_acroform_fields(doc, function(n) {
			var raw_name = pdf_decode_str(n.map.T);
			var name = raw_name;
			var index = 0;
			var m = /^(.+?)\[([0-9]+)\]$/.exec(raw_name);
			if (m) {
				name = m[1];
				index = parseInt(m[2], 10);
			}
			var spec;
			var ft_name = n.map.FT.name;
			if (ft_name === "Tx") {
				spec = { type: "string" };
			} else if (ft_name === "Btn") {
				spec = { type: "boolean" };
			} else if (ft_name === "Ch") {
				spec = { type: "select", options: n.map.Opt.slice() };
			} else if (ft_name === "Sig") {
				return;
			} else {
				throw new Error("Unsupported input type" + ft_name);
			}
			if (!res[name]) {
				res[name] = [];
			}
			res[name][index] = spec;
		});
		return res;
	}
	return {
		transform: transform,
		list_fields: list_fields,
		_serialize_str: serialize_str,
		_decode_str: pdf_decode_str
	};
}
pdfform.transform = function(buf, fields) {
	return pdfform().transform(buf, fields);
};
if (typeof module != "undefined") {
	module.exports = pdfform;
}
