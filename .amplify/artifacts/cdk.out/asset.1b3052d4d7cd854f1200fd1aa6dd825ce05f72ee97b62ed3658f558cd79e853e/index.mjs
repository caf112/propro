/** * Reads SSM environment context from a known Amplify environment variable, * fetches values from SSM and places those values in the corresponding environment variables */ export const internalAmplifyFunctionResolveSsmParams =
  async (client) => {
    const envPathObject = JSON.parse(process.env.AMPLIFY_SSM_ENV_CONFIG ?? '{}')
    const paths = Object.keys(envPathObject)
    if (paths.length === 0) {
      return
    }
    let actualSsmClient
    if (client) {
      actualSsmClient = client
    } else {
      const ssmSdk = await import('@aws-sdk/client-ssm')
      actualSsmClient = new ssmSdk.SSM()
    }
    const resolveSecrets = async (paths) => {
      const response = await actualSsmClient.getParameters({ Names: paths, WithDecryption: true })
      if (response.Parameters && response.Parameters.length > 0) {
        for (const parameter of response.Parameters) {
          if (parameter.Name) {
            const envKey = Object.keys(envPathObject).find(
              (key) => envPathObject[key].sharedPath === parameter.Name,
            )
            const envName = envKey
              ? envPathObject[envKey].name
              : envPathObject[parameter.Name]?.name
            process.env[envName] = parameter.Value
          }
        }
      }
      return response
    }
    const response = await resolveSecrets(paths)
    const sharedPaths = (response?.InvalidParameters || [])
      .map((invalidParam) => envPathObject[invalidParam].sharedPath)
      .filter((sharedParam) => !!sharedParam)
    if (sharedPaths.length > 0) {
      await resolveSecrets(sharedPaths)
    }
  }
await internalAmplifyFunctionResolveSsmParams()
const SSM_PARAMETER_REFRESH_MS = 1000 * 60
setInterval(() => {
  void internalAmplifyFunctionResolveSsmParams()
}, SSM_PARAMETER_REFRESH_MS)
export {}
var We = Object.create
var ue = Object.defineProperty
var Ye = Object.getOwnPropertyDescriptor
var qe = Object.getOwnPropertyNames
var He = Object.getPrototypeOf,
  Xe = Object.prototype.hasOwnProperty
var Je = (t, e) => () => (t && (e = t((t = 0))), e)
var Ze = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports)
var ke = (t, e, r, n) => {
  if ((e && typeof e == 'object') || typeof e == 'function')
    for (let o of qe(e))
      !Xe.call(t, o) &&
        o !== r &&
        ue(t, o, { get: () => e[o], enumerable: !(n = Ye(e, o)) || n.enumerable })
  return t
}
var ce = (t, e, r) => (
  (r = t != null ? We(He(t)) : {}),
  ke(e || !t || !t.__esModule ? ue(r, 'default', { value: t, enumerable: !0 }) : r, t)
)
import { createRequire as Qe } from 'node:module'
import et from 'node:path'
import tt from 'node:url'
var u = Je(() => {
  global.require = Qe(import.meta.url)
  global.__filename = tt.fileURLToPath(import.meta.url)
  global.__dirname = et.dirname(__filename)
})
var ie = Ze((I, _) => {
  u()
  var nt = 200,
    Te = '__lodash_hash_undefined__',
    ot = 800,
    it = 16,
    Ae = 9007199254740991,
    Ce = '[object Arguments]',
    st = '[object Array]',
    at = '[object AsyncFunction]',
    lt = '[object Boolean]',
    ut = '[object Date]',
    ct = '[object Error]',
    we = '[object Function]',
    ft = '[object GeneratorFunction]',
    gt = '[object Map]',
    dt = '[object Number]',
    ht = '[object Null]',
    Oe = '[object Object]',
    mt = '[object Proxy]',
    pt = '[object RegExp]',
    vt = '[object Set]',
    yt = '[object String]',
    Lt = '[object Undefined]',
    bt = '[object WeakMap]',
    _t = '[object ArrayBuffer]',
    Et = '[object DataView]',
    St = '[object Float32Array]',
    Tt = '[object Float64Array]',
    At = '[object Int8Array]',
    Ct = '[object Int16Array]',
    wt = '[object Int32Array]',
    Ot = '[object Uint8Array]',
    Rt = '[object Uint8ClampedArray]',
    It = '[object Uint16Array]',
    Nt = '[object Uint32Array]',
    Vt = /[\\^$.*+?()[\]{}|]/g,
    xt = /^\[object .+?Constructor\]$/,
    Pt = /^(?:0|[1-9]\d*)$/,
    c = {}
  c[St] = c[Tt] = c[At] = c[Ct] = c[wt] = c[Ot] = c[Rt] = c[It] = c[Nt] = !0
  c[Ce] =
    c[st] =
    c[_t] =
    c[lt] =
    c[Et] =
    c[ut] =
    c[ct] =
    c[we] =
    c[gt] =
    c[dt] =
    c[Oe] =
    c[pt] =
    c[vt] =
    c[yt] =
    c[bt] =
      !1
  var Re = typeof global == 'object' && global && global.Object === Object && global,
    Dt = typeof self == 'object' && self && self.Object === Object && self,
    x = Re || Dt || Function('return this')(),
    Ie = typeof I == 'object' && I && !I.nodeType && I,
    N = Ie && typeof _ == 'object' && _ && !_.nodeType && _,
    Ne = N && N.exports === Ie,
    X = Ne && Re.process,
    me = (function () {
      try {
        var t = N && N.require && N.require('util').types
        return t || (X && X.binding && X.binding('util'))
      } catch {}
    })(),
    pe = me && me.isTypedArray
  function Ft(t, e, r) {
    switch (r.length) {
      case 0:
        return t.call(e)
      case 1:
        return t.call(e, r[0])
      case 2:
        return t.call(e, r[0], r[1])
      case 3:
        return t.call(e, r[0], r[1], r[2])
    }
    return t.apply(e, r)
  }
  function Mt(t, e) {
    for (var r = -1, n = Array(t); ++r < t; ) n[r] = e(r)
    return n
  }
  function jt(t) {
    return function (e) {
      return t(e)
    }
  }
  function Ut(t, e) {
    return t?.[e]
  }
  function Kt(t, e) {
    return function (r) {
      return t(e(r))
    }
  }
  var $t = Array.prototype,
    Gt = Function.prototype,
    $ = Object.prototype,
    J = x['__core-js_shared__'],
    G = Gt.toString,
    h = $.hasOwnProperty,
    ve = (function () {
      var t = /[^.]+$/.exec((J && J.keys && J.keys.IE_PROTO) || '')
      return t ? 'Symbol(src)_1.' + t : ''
    })(),
    Ve = $.toString,
    Bt = G.call(Object),
    zt = RegExp(
      '^' +
        G.call(h)
          .replace(Vt, '\\$&')
          .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
        '$',
    ),
    U = Ne ? x.Buffer : void 0,
    ye = x.Symbol,
    Le = x.Uint8Array,
    be = U ? U.allocUnsafe : void 0,
    xe = Kt(Object.getPrototypeOf, Object),
    _e = Object.create,
    Wt = $.propertyIsEnumerable,
    Yt = $t.splice,
    v = ye ? ye.toStringTag : void 0,
    K = (function () {
      try {
        var t = re(Object, 'defineProperty')
        return t({}, '', {}), t
      } catch {}
    })(),
    qt = U ? U.isBuffer : void 0,
    Ee = Math.max,
    Ht = Date.now,
    Pe = re(x, 'Map'),
    V = re(Object, 'create'),
    Xt = (function () {
      function t() {}
      return function (e) {
        if (!L(e)) return {}
        if (_e) return _e(e)
        t.prototype = e
        var r = new t()
        return (t.prototype = void 0), r
      }
    })()
  function y(t) {
    var e = -1,
      r = t == null ? 0 : t.length
    for (this.clear(); ++e < r; ) {
      var n = t[e]
      this.set(n[0], n[1])
    }
  }
  function Jt() {
    ;(this.__data__ = V ? V(null) : {}), (this.size = 0)
  }
  function Zt(t) {
    var e = this.has(t) && delete this.__data__[t]
    return (this.size -= e ? 1 : 0), e
  }
  function kt(t) {
    var e = this.__data__
    if (V) {
      var r = e[t]
      return r === Te ? void 0 : r
    }
    return h.call(e, t) ? e[t] : void 0
  }
  function Qt(t) {
    var e = this.__data__
    return V ? e[t] !== void 0 : h.call(e, t)
  }
  function er(t, e) {
    var r = this.__data__
    return (this.size += this.has(t) ? 0 : 1), (r[t] = V && e === void 0 ? Te : e), this
  }
  y.prototype.clear = Jt
  y.prototype.delete = Zt
  y.prototype.get = kt
  y.prototype.has = Qt
  y.prototype.set = er
  function m(t) {
    var e = -1,
      r = t == null ? 0 : t.length
    for (this.clear(); ++e < r; ) {
      var n = t[e]
      this.set(n[0], n[1])
    }
  }
  function tr() {
    ;(this.__data__ = []), (this.size = 0)
  }
  function rr(t) {
    var e = this.__data__,
      r = B(e, t)
    if (r < 0) return !1
    var n = e.length - 1
    return r == n ? e.pop() : Yt.call(e, r, 1), --this.size, !0
  }
  function nr(t) {
    var e = this.__data__,
      r = B(e, t)
    return r < 0 ? void 0 : e[r][1]
  }
  function or(t) {
    return B(this.__data__, t) > -1
  }
  function ir(t, e) {
    var r = this.__data__,
      n = B(r, t)
    return n < 0 ? (++this.size, r.push([t, e])) : (r[n][1] = e), this
  }
  m.prototype.clear = tr
  m.prototype.delete = rr
  m.prototype.get = nr
  m.prototype.has = or
  m.prototype.set = ir
  function E(t) {
    var e = -1,
      r = t == null ? 0 : t.length
    for (this.clear(); ++e < r; ) {
      var n = t[e]
      this.set(n[0], n[1])
    }
  }
  function sr() {
    ;(this.size = 0), (this.__data__ = { hash: new y(), map: new (Pe || m)(), string: new y() })
  }
  function ar(t) {
    var e = W(this, t).delete(t)
    return (this.size -= e ? 1 : 0), e
  }
  function lr(t) {
    return W(this, t).get(t)
  }
  function ur(t) {
    return W(this, t).has(t)
  }
  function cr(t, e) {
    var r = W(this, t),
      n = r.size
    return r.set(t, e), (this.size += r.size == n ? 0 : 1), this
  }
  E.prototype.clear = sr
  E.prototype.delete = ar
  E.prototype.get = lr
  E.prototype.has = ur
  E.prototype.set = cr
  function S(t) {
    var e = (this.__data__ = new m(t))
    this.size = e.size
  }
  function fr() {
    ;(this.__data__ = new m()), (this.size = 0)
  }
  function gr(t) {
    var e = this.__data__,
      r = e.delete(t)
    return (this.size = e.size), r
  }
  function dr(t) {
    return this.__data__.get(t)
  }
  function hr(t) {
    return this.__data__.has(t)
  }
  function mr(t, e) {
    var r = this.__data__
    if (r instanceof m) {
      var n = r.__data__
      if (!Pe || n.length < nt - 1) return n.push([t, e]), (this.size = ++r.size), this
      r = this.__data__ = new E(n)
    }
    return r.set(t, e), (this.size = r.size), this
  }
  S.prototype.clear = fr
  S.prototype.delete = gr
  S.prototype.get = dr
  S.prototype.has = hr
  S.prototype.set = mr
  function pr(t, e) {
    var r = ee(t),
      n = !r && Q(t),
      o = !r && !n && je(t),
      i = !r && !n && !o && Ke(t),
      s = r || n || o || i,
      a = s ? Mt(t.length, String) : [],
      l = a.length
    for (var f in t)
      (e || h.call(t, f)) &&
        !(
          s &&
          (f == 'length' ||
            (o && (f == 'offset' || f == 'parent')) ||
            (i && (f == 'buffer' || f == 'byteLength' || f == 'byteOffset')) ||
            Fe(f, l))
        ) &&
        a.push(f)
    return a
  }
  function Z(t, e, r) {
    ;((r !== void 0 && !Y(t[e], r)) || (r === void 0 && !(e in t))) && te(t, e, r)
  }
  function vr(t, e, r) {
    var n = t[e]
    ;(!(h.call(t, e) && Y(n, r)) || (r === void 0 && !(e in t))) && te(t, e, r)
  }
  function B(t, e) {
    for (var r = t.length; r--; ) if (Y(t[r][0], e)) return r
    return -1
  }
  function te(t, e, r) {
    e == '__proto__' && K
      ? K(t, e, { configurable: !0, enumerable: !0, value: r, writable: !0 })
      : (t[e] = r)
  }
  var yr = Nr()
  function z(t) {
    return t == null ? (t === void 0 ? Lt : ht) : v && v in Object(t) ? Vr(t) : jr(t)
  }
  function Se(t) {
    return P(t) && z(t) == Ce
  }
  function Lr(t) {
    if (!L(t) || Fr(t)) return !1
    var e = oe(t) ? zt : xt
    return e.test(Gr(t))
  }
  function br(t) {
    return P(t) && Ue(t.length) && !!c[z(t)]
  }
  function _r(t) {
    if (!L(t)) return Mr(t)
    var e = Me(t),
      r = []
    for (var n in t) (n == 'constructor' && (e || !h.call(t, n))) || r.push(n)
    return r
  }
  function De(t, e, r, n, o) {
    t !== e &&
      yr(
        e,
        function (i, s) {
          if ((o || (o = new S()), L(i))) Er(t, e, s, r, De, n, o)
          else {
            var a = n ? n(k(t, s), i, s + '', t, e, o) : void 0
            a === void 0 && (a = i), Z(t, s, a)
          }
        },
        $e,
      )
  }
  function Er(t, e, r, n, o, i, s) {
    var a = k(t, r),
      l = k(e, r),
      f = s.get(l)
    if (f) {
      Z(t, r, f)
      return
    }
    var g = i ? i(a, l, r + '', t, e, s) : void 0,
      p = g === void 0
    if (p) {
      var C = ee(l),
        w = !C && je(l),
        M = !C && !w && Ke(l)
      ;(g = l),
        C || w || M
          ? ee(a)
            ? (g = a)
            : Br(a)
              ? (g = Or(a))
              : w
                ? ((p = !1), (g = Ar(l, !0)))
                : M
                  ? ((p = !1), (g = wr(l, !0)))
                  : (g = [])
          : zr(l) || Q(l)
            ? ((g = a), Q(a) ? (g = Wr(a)) : (!L(a) || oe(a)) && (g = xr(l)))
            : (p = !1)
    }
    p && (s.set(l, g), o(g, l, n, i, s), s.delete(l)), Z(t, r, g)
  }
  function Sr(t, e) {
    return Kr(Ur(t, e, Ge), t + '')
  }
  var Tr = K
    ? function (t, e) {
        return K(t, 'toString', { configurable: !0, enumerable: !1, value: qr(e), writable: !0 })
      }
    : Ge
  function Ar(t, e) {
    if (e) return t.slice()
    var r = t.length,
      n = be ? be(r) : new t.constructor(r)
    return t.copy(n), n
  }
  function Cr(t) {
    var e = new t.constructor(t.byteLength)
    return new Le(e).set(new Le(t)), e
  }
  function wr(t, e) {
    var r = e ? Cr(t.buffer) : t.buffer
    return new t.constructor(r, t.byteOffset, t.length)
  }
  function Or(t, e) {
    var r = -1,
      n = t.length
    for (e || (e = Array(n)); ++r < n; ) e[r] = t[r]
    return e
  }
  function Rr(t, e, r, n) {
    var o = !r
    r || (r = {})
    for (var i = -1, s = e.length; ++i < s; ) {
      var a = e[i],
        l = n ? n(r[a], t[a], a, r, t) : void 0
      l === void 0 && (l = t[a]), o ? te(r, a, l) : vr(r, a, l)
    }
    return r
  }
  function Ir(t) {
    return Sr(function (e, r) {
      var n = -1,
        o = r.length,
        i = o > 1 ? r[o - 1] : void 0,
        s = o > 2 ? r[2] : void 0
      for (
        i = t.length > 3 && typeof i == 'function' ? (o--, i) : void 0,
          s && Pr(r[0], r[1], s) && ((i = o < 3 ? void 0 : i), (o = 1)),
          e = Object(e);
        ++n < o;

      ) {
        var a = r[n]
        a && t(e, a, n, i)
      }
      return e
    })
  }
  function Nr(t) {
    return function (e, r, n) {
      for (var o = -1, i = Object(e), s = n(e), a = s.length; a--; ) {
        var l = s[t ? a : ++o]
        if (r(i[l], l, i) === !1) break
      }
      return e
    }
  }
  function W(t, e) {
    var r = t.__data__
    return Dr(e) ? r[typeof e == 'string' ? 'string' : 'hash'] : r.map
  }
  function re(t, e) {
    var r = Ut(t, e)
    return Lr(r) ? r : void 0
  }
  function Vr(t) {
    var e = h.call(t, v),
      r = t[v]
    try {
      t[v] = void 0
      var n = !0
    } catch {}
    var o = Ve.call(t)
    return n && (e ? (t[v] = r) : delete t[v]), o
  }
  function xr(t) {
    return typeof t.constructor == 'function' && !Me(t) ? Xt(xe(t)) : {}
  }
  function Fe(t, e) {
    var r = typeof t
    return (
      (e = e ?? Ae),
      !!e && (r == 'number' || (r != 'symbol' && Pt.test(t))) && t > -1 && t % 1 == 0 && t < e
    )
  }
  function Pr(t, e, r) {
    if (!L(r)) return !1
    var n = typeof e
    return (n == 'number' ? ne(r) && Fe(e, r.length) : n == 'string' && e in r) ? Y(r[e], t) : !1
  }
  function Dr(t) {
    var e = typeof t
    return e == 'string' || e == 'number' || e == 'symbol' || e == 'boolean'
      ? t !== '__proto__'
      : t === null
  }
  function Fr(t) {
    return !!ve && ve in t
  }
  function Me(t) {
    var e = t && t.constructor,
      r = (typeof e == 'function' && e.prototype) || $
    return t === r
  }
  function Mr(t) {
    var e = []
    if (t != null) for (var r in Object(t)) e.push(r)
    return e
  }
  function jr(t) {
    return Ve.call(t)
  }
  function Ur(t, e, r) {
    return (
      (e = Ee(e === void 0 ? t.length - 1 : e, 0)),
      function () {
        for (var n = arguments, o = -1, i = Ee(n.length - e, 0), s = Array(i); ++o < i; )
          s[o] = n[e + o]
        o = -1
        for (var a = Array(e + 1); ++o < e; ) a[o] = n[o]
        return (a[e] = r(s)), Ft(t, this, a)
      }
    )
  }
  function k(t, e) {
    if (!(e === 'constructor' && typeof t[e] == 'function') && e != '__proto__') return t[e]
  }
  var Kr = $r(Tr)
  function $r(t) {
    var e = 0,
      r = 0
    return function () {
      var n = Ht(),
        o = it - (n - r)
      if (((r = n), o > 0)) {
        if (++e >= ot) return arguments[0]
      } else e = 0
      return t.apply(void 0, arguments)
    }
  }
  function Gr(t) {
    if (t != null) {
      try {
        return G.call(t)
      } catch {}
      try {
        return t + ''
      } catch {}
    }
    return ''
  }
  function Y(t, e) {
    return t === e || (t !== t && e !== e)
  }
  var Q = Se(
      (function () {
        return arguments
      })(),
    )
      ? Se
      : function (t) {
          return P(t) && h.call(t, 'callee') && !Wt.call(t, 'callee')
        },
    ee = Array.isArray
  function ne(t) {
    return t != null && Ue(t.length) && !oe(t)
  }
  function Br(t) {
    return P(t) && ne(t)
  }
  var je = qt || Hr
  function oe(t) {
    if (!L(t)) return !1
    var e = z(t)
    return e == we || e == ft || e == at || e == mt
  }
  function Ue(t) {
    return typeof t == 'number' && t > -1 && t % 1 == 0 && t <= Ae
  }
  function L(t) {
    var e = typeof t
    return t != null && (e == 'object' || e == 'function')
  }
  function P(t) {
    return t != null && typeof t == 'object'
  }
  function zr(t) {
    if (!P(t) || z(t) != Oe) return !1
    var e = xe(t)
    if (e === null) return !0
    var r = h.call(e, 'constructor') && e.constructor
    return typeof r == 'function' && r instanceof r && G.call(r) == Bt
  }
  var Ke = pe ? jt(pe) : br
  function Wr(t) {
    return Rr(t, $e(t))
  }
  function $e(t) {
    return ne(t) ? pr(t, !0) : _r(t)
  }
  var Yr = Ir(function (t, e, r) {
    De(t, e, r)
  })
  function qr(t) {
    return function () {
      return t
    }
  }
  function Ge(t) {
    return t
  }
  function Hr() {
    return !1
  }
  _.exports = Yr
})
u()
u()
u()
import { Console as Xr } from 'node:console'
import { randomInt as Jr } from 'node:crypto'
u()
u()
u()
var O = class {
  coldStart = !0
  defaultServiceName = 'service_undefined'
  getColdStart() {
    return this.coldStart ? ((this.coldStart = !1), !0) : !1
  }
  isColdStart() {
    return this.getColdStart()
  }
  getDefaultServiceName() {
    return this.defaultServiceName
  }
  isValidServiceName(e) {
    return typeof e == 'string' && e.trim().length > 0
  }
}
u()
var R = class {
  devModeVariable = 'POWERTOOLS_DEV'
  serviceNameVariable = 'POWERTOOLS_SERVICE_NAME'
  xRayTraceIdVariable = '_X_AMZN_TRACE_ID'
  get(e) {
    return process.env[e]?.trim() || ''
  }
  getServiceName() {
    return this.get(this.serviceNameVariable)
  }
  getXrayTraceId() {
    return this.getXrayTraceData()?.Root
  }
  getXrayTraceSampled() {
    return this.getXrayTraceData()?.Sampled === '1'
  }
  isDevMode() {
    return this.isValueTrue(this.get(this.devModeVariable))
  }
  isValueTrue(e) {
    return ['1', 'y', 'yes', 't', 'true', 'on'].includes(e.toLowerCase())
  }
  isValueFalse(e) {
    return ['0', 'n', 'no', 'f', 'false', 'off'].includes(e.toLowerCase())
  }
  getXrayTraceData() {
    let e = this.get(this.xRayTraceIdVariable)
    if (e === '') return
    if (!e.includes('=')) return { Root: e }
    let r = {}
    for (let n of e.split(';')) {
      let [o, i] = n.split('=')
      r[o] = i
    }
    return r
  }
}
u()
u()
var gn = process.env.AWS_EXECUTION_ENV || 'NA'
u()
u()
var j = 'powertools-for-aws',
  fe = `${j}.tracer`,
  ge = `${j}.metrics`,
  de = `${j}.logger`,
  he = `${j}.idempotency`
var b = ce(ie(), 1)
u()
var q = class extends R {
  awsLogLevelVariable = 'AWS_LAMBDA_LOG_LEVEL'
  awsRegionVariable = 'AWS_REGION'
  currentEnvironmentVariable = 'ENVIRONMENT'
  functionNameVariable = 'AWS_LAMBDA_FUNCTION_NAME'
  functionVersionVariable = 'AWS_LAMBDA_FUNCTION_VERSION'
  logEventVariable = 'POWERTOOLS_LOGGER_LOG_EVENT'
  logLevelVariable = 'POWERTOOLS_LOG_LEVEL'
  logLevelVariableLegacy = 'LOG_LEVEL'
  memoryLimitInMBVariable = 'AWS_LAMBDA_FUNCTION_MEMORY_SIZE'
  sampleRateValueVariable = 'POWERTOOLS_LOGGER_SAMPLE_RATE'
  tzVariable = 'TZ'
  getAwsLogLevel() {
    let e = this.get(this.awsLogLevelVariable)
    return e === 'FATAL' ? 'CRITICAL' : e
  }
  getAwsRegion() {
    return this.get(this.awsRegionVariable)
  }
  getCurrentEnvironment() {
    return this.get(this.currentEnvironmentVariable)
  }
  getFunctionMemory() {
    let e = this.get(this.memoryLimitInMBVariable)
    return Number(e)
  }
  getFunctionName() {
    return this.get(this.functionNameVariable)
  }
  getFunctionVersion() {
    return this.get(this.functionVersionVariable)
  }
  getLogEvent() {
    let e = this.get(this.logEventVariable)
    return this.isValueTrue(e)
  }
  getLogLevel() {
    let e = this.get(this.logLevelVariable),
      r = this.get(this.logLevelVariableLegacy)
    return e !== '' ? e : r
  }
  getSampleRateValue() {
    let e = this.get(this.sampleRateValueVariable)
    return e && e.length > 0 ? Number(e) : void 0
  }
  getTimezone() {
    let e = this.get(this.tzVariable)
    return e.length > 0 ? e : 'UTC'
  }
}
u()
var se = { PRETTY: 4, COMPACT: 0 }
var d = { TRACE: 6, DEBUG: 8, INFO: 12, WARN: 16, ERROR: 20, CRITICAL: 24, SILENT: 28 }
u()
u()
var D = class {
  envVarsService
  constructor(e) {
    this.envVarsService = e?.envVarsService
  }
  formatError(e) {
    let { name: r, message: n, stack: o, cause: i, ...s } = e,
      a = {
        name: r,
        location: this.getCodeLocation(e.stack),
        message: n,
        stack: o,
        cause: e.cause instanceof Error ? this.formatError(e.cause) : e.cause,
      }
    for (let l in e)
      typeof l == 'string' && !['name', 'message', 'stack', 'cause'].includes(l) && (a[l] = s[l])
    return a
  }
  formatTimestamp(e) {
    let r = 'UTC',
      n = this.envVarsService?.getTimezone()
    return n && !n.includes(r) ? this.#r(e, n) : e.toISOString()
  }
  getCodeLocation(e) {
    if (!e) return ''
    let r = e.split(`
`),
      n = /\(([^)]*?):(\d+?):(\d+?)\)\\?$/
    for (let o of r) {
      let i = n.exec(o)
      if (Array.isArray(i)) return `${i[1]}:${Number(i[2])}`
    }
    return ''
  }
  #e = (e) => {
    let r = '2-digit',
      n = Intl.supportedValuesOf('timeZone').includes(e) ? e : 'UTC'
    return new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: r,
      day: r,
      hour: r,
      minute: r,
      second: r,
      hour12: !1,
      timeZone: n,
    })
  }
  #r(e, r) {
    let {
        year: n,
        month: o,
        day: i,
        hour: s,
        minute: a,
        second: l,
      } = this.#e(r)
        .formatToParts(e)
        .reduce((ae, le) => ((ae[le.type] = le.value), ae), {}),
      f = `${n}-${o}-${i}T${s}:${a}:${l}`,
      g = -e.getTimezoneOffset(),
      p = g >= 0 ? '+' : '-',
      C = Math.abs(Math.floor(g / 60))
        .toString()
        .padStart(2, '0'),
      w = Math.abs(g % 60)
        .toString()
        .padStart(2, '0'),
      M = e.getMilliseconds().toString().padStart(3, '0'),
      ze = `${p}${C}:${w}`
    return `${f}.${M}${ze}`
  }
}
u()
var Be = ce(ie(), 1),
  T = class {
    attributes = {}
    constructor(e) {
      this.addAttributes(e.attributes)
    }
    addAttributes(e) {
      return (0, Be.default)(this.attributes, e), this
    }
    getAttributes() {
      return this.attributes
    }
    prepareForPrint() {
      this.setAttributes(this.removeEmptyKeys(this.getAttributes()))
    }
    removeEmptyKeys(e) {
      let r = {}
      for (let n in e) e[n] !== void 0 && e[n] !== '' && e[n] !== null && (r[n] = e[n])
      return r
    }
    setAttributes(e) {
      this.attributes = e
    }
  }
var H = class extends D {
  #e
  constructor(e) {
    super(e), (this.#e = e?.logRecordOrder)
  }
  formatAttributes(e, r) {
    let n = {
      cold_start: e.lambdaContext?.coldStart,
      function_arn: e.lambdaContext?.invokedFunctionArn,
      function_memory_size: e.lambdaContext?.memoryLimitInMB,
      function_name: e.lambdaContext?.functionName,
      function_request_id: e.lambdaContext?.awsRequestId,
      level: e.logLevel,
      message: e.message,
      sampling_rate: e.sampleRateValue,
      service: e.serviceName,
      timestamp: this.formatTimestamp(e.timestamp),
      xray_trace_id: e.xRayTraceId,
    }
    if (this.#e === void 0) return new T({ attributes: n }).addAttributes(r)
    let o = {}
    for (let s of this.#e)
      s in n && !(s in o) ? (o[s] = n[s]) : s in r && !(s in o) && (o[s] = r[s])
    for (let s in n) s in o || (o[s] = n[s])
    for (let s in r) s in o || (o[s] = r[s])
    return new T({ attributes: o })
  }
}
var F = class t extends O {
  console
  customConfigService
  envVarsService = new q()
  logEvent = !1
  logFormatter
  logIndentation = se.COMPACT
  logLevel = d.INFO
  persistentLogAttributes = {}
  powertoolsLogData = {}
  temporaryLogAttributes = {}
  #e = []
  #r = !1
  #t = new Map()
  #n = d.INFO
  #o
  get level() {
    return this.logLevel
  }
  constructor(e = {}) {
    super()
    let { customConfigService: r, ...n } = e
    this.setCustomConfigService(r), this.setOptions(n), (this.#r = !0)
    for (let [o, i] of this.#e) this.printLog(o, this.createAndPopulateLogItem(...i))
    this.#e = []
  }
  addContext(e) {
    this.addToPowertoolsLogData({
      lambdaContext: {
        invokedFunctionArn: e.invokedFunctionArn,
        coldStart: this.getColdStart(),
        awsRequestId: e.awsRequestId,
        memoryLimitInMB: e.memoryLimitInMB,
        functionName: e.functionName,
        functionVersion: e.functionVersion,
      },
    })
  }
  addPersistentLogAttributes(e) {
    this.appendPersistentKeys(e)
  }
  appendKeys(e) {
    for (let r of Object.keys(e)) this.#t.set(r, 'temp')
    ;(0, b.default)(this.temporaryLogAttributes, e)
  }
  appendPersistentKeys(e) {
    for (let r of Object.keys(e)) this.#t.set(r, 'persistent')
    ;(0, b.default)(this.persistentLogAttributes, e)
  }
  createChild(e = {}) {
    let r = this.createLogger(
      (0, b.default)(
        {},
        {
          logLevel: this.getLevelName(),
          serviceName: this.powertoolsLogData.serviceName,
          sampleRateValue: this.powertoolsLogData.sampleRateValue,
          logFormatter: this.getLogFormatter(),
          customConfigService: this.getCustomConfigService(),
          environment: this.powertoolsLogData.environment,
          persistentLogAttributes: this.persistentLogAttributes,
          temporaryLogAttributes: this.temporaryLogAttributes,
          jsonReplacerFn: this.#o,
        },
        e,
      ),
    )
    return (
      this.powertoolsLogData.lambdaContext && r.addContext(this.powertoolsLogData.lambdaContext), r
    )
  }
  critical(e, ...r) {
    this.processLogItem(d.CRITICAL, e, r)
  }
  debug(e, ...r) {
    this.processLogItem(d.DEBUG, e, r)
  }
  error(e, ...r) {
    this.processLogItem(d.ERROR, e, r)
  }
  getLevelName() {
    return this.getLogLevelNameFromNumber(this.logLevel)
  }
  getLogEvent() {
    return this.logEvent
  }
  getPersistentLogAttributes() {
    return this.persistentLogAttributes
  }
  info(e, ...r) {
    this.processLogItem(d.INFO, e, r)
  }
  injectLambdaContext(e) {
    return (r, n, o) => {
      let i = o.value,
        s = this
      o.value = async function (a, l, f) {
        t.injectLambdaContextBefore(s, a, l, e)
        let g
        try {
          g = await i.apply(this, [a, l, f])
        } finally {
          ;(e?.clearState || e?.resetKeys) && s.resetKeys()
        }
        return g
      }
    }
  }
  static injectLambdaContextAfterOrOnError(e, r, n) {
    n && (n.clearState || n?.resetKeys) && e.resetKeys()
  }
  static injectLambdaContextBefore(e, r, n, o) {
    e.addContext(n)
    let i
    o && Object.hasOwn(o, 'logEvent') && (i = o.logEvent), e.logEventIfEnabled(r, i)
  }
  logEventIfEnabled(e, r) {
    this.shouldLogEvent(r) && this.info('Lambda invocation event', { event: e })
  }
  refreshSampleRateCalculation() {
    this.setInitialSampleRate(this.powertoolsLogData.sampleRateValue)
  }
  removeKeys(e) {
    for (let r of e)
      (this.temporaryLogAttributes[r] = void 0),
        this.persistentLogAttributes[r] ? this.#t.set(r, 'persistent') : this.#t.delete(r)
  }
  removePersistentKeys(e) {
    for (let r of e)
      (this.persistentLogAttributes[r] = void 0),
        this.temporaryLogAttributes[r] ? this.#t.set(r, 'temp') : this.#t.delete(r)
  }
  removePersistentLogAttributes(e) {
    this.removePersistentKeys(e)
  }
  resetKeys() {
    for (let e of Object.keys(this.temporaryLogAttributes))
      this.persistentLogAttributes[e] ? this.#t.set(e, 'persistent') : this.#t.delete(e)
    this.temporaryLogAttributes = {}
  }
  setLogLevel(e) {
    if (!this.awsLogLevelShortCircuit(e))
      if (this.isValidLogLevel(e)) this.logLevel = d[e]
      else throw new Error(`Invalid log level: ${e}`)
  }
  setPersistentLogAttributes(e) {
    this.persistentLogAttributes = e
  }
  shouldLogEvent(e) {
    return typeof e == 'boolean' ? e : this.getLogEvent()
  }
  trace(e, ...r) {
    this.processLogItem(d.TRACE, e, r)
  }
  warn(e, ...r) {
    this.processLogItem(d.WARN, e, r)
  }
  createLogger(e) {
    return new t(e)
  }
  getJsonReplacer() {
    let e = new WeakSet()
    return (r, n) => {
      let o = n
      if (
        (this.#o && (o = this.#o?.(r, o)),
        o instanceof Error && (o = this.getLogFormatter().formatError(o)),
        typeof o == 'bigint')
      )
        return o.toString()
      if (typeof o == 'object' && o !== null) {
        if (e.has(o)) return
        e.add(o)
      }
      return o
    }
  }
  addToPowertoolsLogData(e) {
    ;(0, b.default)(this.powertoolsLogData, e)
  }
  awsLogLevelShortCircuit(e) {
    let r = this.getEnvVarsService().getAwsLogLevel()
    return this.isValidLogLevel(r)
      ? ((this.logLevel = d[r]),
        this.isValidLogLevel(e) &&
          this.logLevel > d[e] &&
          this.warn(
            `Current log level (${e}) does not match AWS Lambda Advanced Logging Controls minimum log level (${r}). This can lead to data loss, consider adjusting them.`,
          ),
        !0)
      : !1
  }
  createAndPopulateLogItem(e, r, n) {
    let o = '',
      i = {}
    if (typeof r == 'string') o = r
    else {
      let { message: l, ...f } = r
      ;(o = l), (i = f)
    }
    let s = {
        logLevel: this.getLogLevelNameFromNumber(e),
        timestamp: new Date(),
        message: o,
        xRayTraceId: this.envVarsService.getXrayTraceId(),
        ...this.getPowertoolsLogData(),
      },
      a = {}
    for (let [l, f] of this.#t)
      f === 'persistent'
        ? (a[l] = this.persistentLogAttributes[l])
        : (a[l] = this.temporaryLogAttributes[l])
    ;(0, b.default)(a, i)
    for (let l of n) {
      let f = l instanceof Error ? { error: l } : typeof l == 'string' ? { extra: l } : l
      ;(0, b.default)(a, f)
    }
    return this.getLogFormatter().formatAttributes(s, a)
  }
  getCustomConfigService() {
    return this.customConfigService
  }
  getEnvVarsService() {
    return this.envVarsService
  }
  getLogFormatter() {
    return this.logFormatter
  }
  getLogLevelNameFromNumber(e) {
    let r
    for (let [n, o] of Object.entries(d))
      if (o === e) {
        r = n
        break
      }
    return r
  }
  getPowertoolsLogData() {
    return this.powertoolsLogData
  }
  isValidLogLevel(e) {
    return typeof e == 'string' && e in d
  }
  isValidSampleRate(e) {
    return typeof e == 'number' && 0 <= e && e <= 1
  }
  printLog(e, r) {
    r.prepareForPrint()
    let n = e === d.CRITICAL ? 'error' : this.getLogLevelNameFromNumber(e).toLowerCase()
    this.console[n](JSON.stringify(r.getAttributes(), this.getJsonReplacer(), this.logIndentation))
  }
  processLogItem(e, r, n) {
    e >= this.logLevel &&
      (this.#r
        ? this.printLog(e, this.createAndPopulateLogItem(e, r, n))
        : this.#e.push([e, [e, r, n]]))
  }
  setConsole() {
    this.getEnvVarsService().isDevMode()
      ? (this.console = console)
      : (this.console = new Xr({ stdout: process.stdout, stderr: process.stderr })),
      (this.console.trace = (e, ...r) => {
        this.console.log(e, ...r)
      })
  }
  setCustomConfigService(e) {
    this.customConfigService = e || void 0
  }
  setInitialLogLevel(e) {
    let r = e?.toUpperCase()
    if (this.awsLogLevelShortCircuit(r)) return
    if (this.isValidLogLevel(r)) {
      ;(this.logLevel = d[r]), (this.#n = this.logLevel)
      return
    }
    let n = this.getCustomConfigService()?.getLogLevel()?.toUpperCase()
    if (this.isValidLogLevel(n)) {
      ;(this.logLevel = d[n]), (this.#n = this.logLevel)
      return
    }
    let o = this.getEnvVarsService()?.getLogLevel()?.toUpperCase()
    if (this.isValidLogLevel(o)) {
      ;(this.logLevel = d[o]), (this.#n = this.logLevel)
      return
    }
  }
  setInitialSampleRate(e) {
    this.powertoolsLogData.sampleRateValue = 0
    let r = e,
      n = this.getCustomConfigService()?.getSampleRateValue(),
      o = this.getEnvVarsService().getSampleRateValue()
    for (let i of [r, n, o])
      if (this.isValidSampleRate(i)) {
        ;(this.powertoolsLogData.sampleRateValue = i),
          this.logLevel > d.DEBUG && i && Jr(0, 100) / 100 <= i
            ? (this.setLogLevel('DEBUG'),
              this.debug('Setting log level to DEBUG due to sampling rate'))
            : this.setLogLevel(this.getLogLevelNameFromNumber(this.#n))
        return
      }
  }
  setLogEvent() {
    this.getEnvVarsService().getLogEvent() && (this.logEvent = !0)
  }
  setLogFormatter(e, r) {
    this.logFormatter = e ?? new H({ envVarsService: this.getEnvVarsService(), logRecordOrder: r })
  }
  setLogIndentation() {
    this.getEnvVarsService().isDevMode() && (this.logIndentation = se.PRETTY)
  }
  setOptions(e) {
    let {
      logLevel: r,
      serviceName: n,
      sampleRateValue: o,
      logFormatter: i,
      persistentKeys: s,
      persistentLogAttributes: a,
      environment: l,
      jsonReplacerFn: f,
      logRecordOrder: g,
    } = e
    return (
      a &&
        s &&
        this.warn(
          'Both persistentLogAttributes and persistentKeys options were provided. Using persistentKeys as persistentLogAttributes is deprecated and will be removed in future releases',
        ),
      this.setPowertoolsLogData(n, l, s || a),
      this.setLogEvent(),
      this.setInitialLogLevel(r),
      this.setInitialSampleRate(o),
      this.setLogFormatter(i, g),
      this.setConsole(),
      this.setLogIndentation(),
      (this.#o = f),
      this
    )
  }
  setPowertoolsLogData(e, r, n = {}) {
    this.addToPowertoolsLogData({
      awsRegion: this.getEnvVarsService().getAwsRegion(),
      environment:
        r ||
        this.getCustomConfigService()?.getCurrentEnvironment() ||
        this.getEnvVarsService().getCurrentEnvironment(),
      serviceName:
        e ||
        this.getCustomConfigService()?.getServiceName() ||
        this.getEnvVarsService().getServiceName() ||
        this.getDefaultServiceName(),
    }),
      this.appendPersistentKeys(n)
  }
}
var A = new F({ logLevel: 'INFO', serviceName: 'dynamodb-stream-handler' }),
  yo = async (t) => {
    for (let e of t.Records)
      if (
        (A.info(`Processing record: ${e.eventID}`),
        A.info(`Event Type: ${e.eventName}`),
        e.eventName === 'INSERT')
      ) {
        let r = e.dynamodb?.NewImage
        A.info(`New Room Data: ${JSON.stringify(r)}`), await Zr(r)
      }
    return A.info(`Successfully processed ${t.Records.length} records.`), { batchItemFailures: [] }
  },
  Zr = async (t) => {
    let e = process.env.API_ENDPOINT
    try {
      await fetch(e, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(t),
      }),
        A.info('Successfully sent data to API')
    } catch (r) {
      A.error('Failed to send data to API', r)
    }
  }
export { yo as handler }
//# sourceMappingURL=index.mjs.map
