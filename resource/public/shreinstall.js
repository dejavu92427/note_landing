(window.ShareInstall = (function (win, doc, xhr) {
    var ENV = "";
    function excuteList() {
        this.arr = [];
    }
    (ENV = "production"),
        (excuteList.prototype = {
            constrator: excuteList,
            run: function (e) {
                this.arr ? (this.arr[this.arr.length] = e) : e();
            },
            isReady: function () {
                return null == this.arr;
            },
            ready: function () {
                if (null != this.arr) for (var e = 0; e < this.arr.length; e++) this.arr[e]();
                this.arr = null;
            },
        });
    var VERSION = "1.2.5",
        ua = win.navigator.userAgent,
        isIos = !!ua.match(/Mac OS X/),
        isAndroid = -1 < ua.indexOf("Android"),
        isWechat = -1 < ua.indexOf("MicroMessenger"),
        CryptoJS =
            CryptoJS ||
            (function (s) {
                var e = {},
                    t = (e.lib = {}),
                    n = (t.Base = {
                        extend: function (e) {
                            d.prototype = this;
                            var t = new d();
                            return e && t.mixIn(e), (t.$super = this), t;
                        },
                        create: function () {
                            var e = this.extend();
                            return e.init.apply(e, arguments), e;
                        },
                        init: function () { },
                        mixIn: function (e) {
                            for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                            e.hasOwnProperty("toString") && (this.toString = e.toString);
                        },
                        clone: function () {
                            return this.$super.extend(this);
                        },
                    }),
                    c = (t.WordArray = n.extend({
                        init: function (e, t) {
                            (e = this.words = e || []), (this.sigBytes = null != t ? t : 4 * e.length);
                        },
                        toString: function (e) {
                            return (e || i).stringify(this);
                        },
                        concat: function (e) {
                            var t = this.words,
                                n = e.words,
                                r = this.sigBytes,
                                e = e.sigBytes;
                            if ((this.clamp(), r % 4)) for (var i = 0; i < e; i++) t[(r + i) >>> 2] |= ((n[i >>> 2] >>> (24 - (i % 4) * 8)) & 255) << (24 - ((r + i) % 4) * 8);
                            else if (65535 < n.length) for (i = 0; i < e; i += 4) t[(r + i) >>> 2] = n[i >>> 2];
                            else t.push.apply(t, n);
                            return (this.sigBytes += e), this;
                        },
                        clamp: function () {
                            var e = this.words,
                                t = this.sigBytes;
                            (e[t >>> 2] &= 4294967295 << (32 - (t % 4) * 8)), (e.length = s.ceil(t / 4));
                        },
                        clone: function () {
                            var e = n.clone.call(this);
                            return (e.words = this.words.slice(0)), e;
                        },
                        random: function (e) {
                            for (var t = [], n = 0; n < e; n += 4) t.push((4294967296 * s.random()) | 0);
                            return c.create(t, e);
                        },
                    })),
                    r = (e.enc = {}),
                    i = (r.Hex = {
                        stringify: function (e) {
                            for (var t = e.words, e = e.sigBytes, n = [], r = 0; r < e; r++) {
                                var i = (t[r >>> 2] >>> (24 - (r % 4) * 8)) & 255;
                                n.push((i >>> 4).toString(16)), n.push((15 & i).toString(16));
                            }
                            return n.join("");
                        },
                        parse: function (e) {
                            for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << (24 - (r % 8) * 4);
                            return c.create(n, t / 2);
                        },
                    }),
                    o = (r.Latin1 = {
                        stringify: function (e) {
                            for (var t = e.words, e = e.sigBytes, n = [], r = 0; r < e; r++) n.push(String.fromCharCode((t[r >>> 2] >>> (24 - (r % 4) * 8)) & 255));
                            return n.join("");
                        },
                        parse: function (e) {
                            for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << (24 - (r % 4) * 8);
                            return c.create(n, t);
                        },
                    }),
                    a = (r.Utf8 = {
                        stringify: function (e) {
                            try {
                                return decodeURIComponent(escape(o.stringify(e)));
                            } catch (e) {
                                throw Error("Malformed UTF-8 data");
                            }
                        },
                        parse: function (e) {
                            return o.parse(unescape(encodeURIComponent(e)));
                        },
                    }),
                    l = (t.BufferedBlockAlgorithm = n.extend({
                        reset: function () {
                            (this._data = c.create()), (this._nDataBytes = 0);
                        },
                        _append: function (e) {
                            "string" == typeof e && (e = a.parse(e)), this._data.concat(e), (this._nDataBytes += e.sigBytes);
                        },
                        _process: function (e) {
                            var t = this._data,
                                n = t.words,
                                r = t.sigBytes,
                                i = this.blockSize,
                                o = r / (4 * i),
                                e = (o = e ? s.ceil(o) : s.max((0 | o) - this._minBufferSize, 0)) * i,
                                r = s.min(4 * e, r);
                            if (e) {
                                for (var a = 0; a < e; a += i) this._doProcessBlock(n, a);
                                (a = n.splice(0, e)), (t.sigBytes -= r);
                            }
                            return c.create(a, r);
                        },
                        clone: function () {
                            var e = n.clone.call(this);
                            return (e._data = this._data.clone()), e;
                        },
                        _minBufferSize: 0,
                    }));
                function d() { }
                t.Hasher = l.extend({
                    init: function () {
                        this.reset();
                    },
                    reset: function () {
                        l.reset.call(this), this._doReset();
                    },
                    update: function (e) {
                        return this._append(e), this._process(), this;
                    },
                    finalize: function (e) {
                        return e && this._append(e), this._doFinalize(), this._hash;
                    },
                    clone: function () {
                        var e = l.clone.call(this);
                        return (e._hash = this._hash.clone()), e;
                    },
                    blockSize: 16,
                    _createHelper: function (n) {
                        return function (e, t) {
                            return n.create(t).finalize(e);
                        };
                    },
                    _createHmacHelper: function (n) {
                        return function (e, t) {
                            return u.HMAC.create(n, t).finalize(e);
                        };
                    },
                });
                var u = (e.algo = {});
                return e;
            })(Math),
        h = CryptoJS,
        i = h.lib.WordArray;
    h.enc.Base64 = {
        stringify: function (e) {
            var t = e.words,
                n = e.sigBytes,
                r = this._map;
            e.clamp();
            for (var e = [], i = 0; i < n; i += 3)
                for (
                    var o = (((t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255) << 16) | (((t[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 255) << 8) | ((t[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 255), a = 0;
                    a < 4 && i + 0.75 * a < n;
                    a++
                )
                    e.push(r.charAt((o >>> (6 * (3 - a))) & 63));
            if ((t = r.charAt(64))) for (; e.length % 4;) e.push(t);
            return e.join("");
        },
        parse: function (e) {
            var t = (e = e.replace(/\s/g, "")).length,
                n = this._map;
            !(a = n.charAt(64)) || (-1 != (a = e.indexOf(a)) && (t = a));
            for (var r, o, a = [], s = 0, c = 0; c < t; c++) {
                c % 4 && ((r = n.indexOf(e.charAt(c - 1)) << ((c % 4) * 2)), (o = n.indexOf(e.charAt(c)) >>> (6 - (c % 4) * 2)), (a[s >>> 2] |= (r | o) << (24 - (s % 4) * 8)), s++);
            }
            return i.create(a, s);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    };
    var Utils = {
        ajax: function (e) {
            var t = e.type ? e.type.toUpperCase() : "POST",
                n = e.url || "",
                r = e.async || !0,
                i = e.data || null,
                o = e.contentType || "application/x-www-form-urlencoded;charset=utf-8",
                a = e.timeout || 3e3,
                s = e.withCredentials || !1,
                c = e.success || function () { },
                l = e.error || function () { },
                d = e.complete || function () { };
            if ("application/x-www-form-urlencoded;charset=utf-8" == o) {
                var u = [];
                for (var p in i) u.push(p + "=" + i[p]);
                i = u.join("&");
            } else "application/json;charset=utf-8" == o && i && "string" != typeof i && (i = MyJSON.stringify(i));
            i && "GET" == t && ((n = n + (-1 < n.indexOf("?") ? "&" : "?") + i), (i = null));
            var h = new xhr();
            (h.timeout = a),
                (h.withCredentials = s),
                h.open(t, n, r),
                h.setRequestHeader && h.setRequestHeader("Content-Type", o),
                (h.onreadystatechange = function () {
                    var e, t;
                    h.readyState == ("number" == typeof xhr.DONE ? xhr.DONE : 4) &&
                        ((200 <= (e = h.status) && e < 300) || 304 == e ? ((t = "string" == typeof (t = h.response || h.responseText || {}) ? MyJSON.parse(t) : t), c(t)) : l(h, h.statusText), d());
                }),
                (h.ontimeout = function () {
                    l(h, h.statusText);
                }),
                h.send(i);
        },
        getCtx: function () {
            var e = doc.createElement("canvas");
            if (e && "function" == typeof e.getContext)
                for (var t = ["webgl", "webgl2", "experimental-webgl2", "experimental-webgl"], n = 0; n < t.length; n++) {
                    var r = t[n],
                        i = e.getContext(r);
                    if (i) {
                        var o = {};
                        (o.context = r),
                            (o.version = i.getParameter(i.VERSION)),
                            (o.vendor = i.getParameter(i.VENDOR)),
                            (o.sl_version = i.getParameter(i.SHADING_LANGUAGE_VERSION)),
                            (o.max_texture_size = i.getParameter(i.MAX_TEXTURE_SIZE));
                        var a = i.getExtension("WEBGL_debug_renderer_info");
                        return a && ((o.vendor = i.getParameter(a.UNMASKED_VENDOR_WEBGL)), (o.renderer = i.getParameter(a.UNMASKED_RENDERER_WEBGL))), o;
                    }
                }
            return {};
        },
        delay: function (e, t) {
            var n, r;
            void 0 !== doc.hidden
                ? ((n = "hidden"), (r = "visibilitychange"))
                : void 0 !== doc.msHidden
                    ? ((n = "msHidden"), (r = "msvisibilitychange"))
                    : void 0 !== doc.webkitHidden && ((n = "webkitHidden"), (r = "webkitvisibilitychange"));
            function i(e) {
                return e && void 0 !== e.hidden ? e.hidden : doc[n];
            }
            var o = setTimeout(function () {
                null == o || i() || (e(), (o = null));
            }, t);
            r &&
                doc.addEventListener(
                    r,
                    function (e) {
                        null != o && i(e) && (clearTimeout(o), (o = null));
                    },
                    !1
                );
        },
        getOsType: function () {
            return isIos ? "ios" : "android";
        },
        getOsVersion: function () {
            var e = "",
                t = ua.toLowerCase();
            return (
                isAndroid
                    ? (e = (t.match(/android\s([0-9.]*)/) || t.match(/android\/([0-9.]*)/))[1])
                    : isIos && (-1 < t.indexOf("like mac os") ? (e = t.match(/os (.*?) like mac os/)[1].replace(/_/g, ".")) : -1 < t.indexOf("macintosh") && (e = t.match(/mac os x (.*?)\)/)[1].replace(/_/g, "."))),
                e
            );
        },
        isInteger: function (e) {
            return (e = +e) % 1 == 0;
        },
        isEmpty: function (e) {
            return !e || ("object" == typeof e && (e = MyJSON.stringify(e)), "{}" === e);
        },
        getSystemInfo: function (a) {
            getIp(function (e) {
                var t = Utils.getCtx(),
                    n = win.screen.width || "0",
                    r = win.screen.height || "0",
                    i = win.devicePixelRatio;
                Utils.isInteger(i) && (i = i.toFixed(1));
                var o = {
                    sw: Math.floor(n),
                    sh: Math.floor(r),
                    sp: i,
                    gv: t.version ? t.version.replace(/\s/g, "") : "",
                    gr: t.renderer ? t.renderer.replace(/\s/g, "") : "",
                    li: e.length ? e.join("-") : "",
                    os: Utils.getOsType(),
                    osver: Utils.getOsVersion(),
                };
                a(o);
            });
        },
        parse: function (e) {
            if (!e) return {};
            var t = {};
            return (
                e.split("&").forEach(function (e) {
                    t[decodeURIComponent(e.split("=")[0])] = decodeURIComponent(e.split("=")[1]) || "";
                }),
                t
            );
        },
        stringify: function (e) {
            if (Utils.isEmpty(e)) return "";
            var t = [];
            for (var n in e) {
                var r = e[n];
                n && r && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(r));
            }
            return t.join("&");
        },
        generateDiv: function (e) {
            var t = doc.createElement("div");
            t.innerHTML = e;
            function n() {
                doc.body.removeChild(t);
            }
            return (t = t.children[0]).addEventListener ? t.addEventListener("click", n) : (t.onclick = n), t;
        },
    },
        UrlUtils = {
            parseUrlParams: function (e) {
                var t = (e = e || win.location.href).indexOf("?") + 1,
                    n = (e || "?").substring(t).replace(/\+/g, "%20"),
                    r = n.indexOf("#");
                0 <= r && (n = n.substring(0, r));
                for (var i = n.split("&"), o = {}, a = 0; a < i.length; a++) {
                    var s = i[a].split("="),
                        c = decodeURIComponent(s[0] || ""),
                        l = decodeURIComponent(s[1] || "");
                    c && l && (void 0 === o[c] ? (o[c] = l) : "object" == typeof o[c] ? o[c].push(l) : (o[c] = [o[c], l]));
                }
                return o;
            },
            isAppstore: function (e) {
                if (!e) return !1;
                for (var t = !1, n = ["https://itunes.apple.com", "https://apps.apple.com"], r = 0; r < n.length; r++) -1 < e.indexOf(n[r]) && (t = !0);
                return t;
            },
            isIpa: function (e) {
                return -1 < e.indexOf(".ipa") || -1 < e.indexOf(".plist");
            },
            isGeneralUrl: function (e) {
                return -1 < e.indexOf("https://");
            },
            isYyb: function (e) {
                if (!e) return !1;
                for (var t = !1, n = ["https://a.app.qq.com", "https://sj.app.qq.com", "https://sj.qq.com"], r = 0; r < n.length; r++) -1 < e.indexOf(n[r]) && (t = !0);
                return t;
            },
        },
        CodeUtils = {
            characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
            encode: function (e) {
                for (var t, n, r, i = -1, o = e.length, a = [0, 0, 0, 0], s = []; ++i < o;)
                    (t = e[i]),
                        (n = e[++i]),
                        (a[0] = t >> 2),
                        (a[1] = ((3 & t) << 4) | ((n || 0) >> 4)),
                        o <= i ? (a[2] = a[3] = 64) : ((r = e[++i]), (a[2] = ((15 & n) << 2) | ((r || 0) >> 6)), (a[3] = o <= i ? 64 : 63 & r)),
                        s.push(this.characters.charAt(a[0]), this.characters.charAt(a[1]), this.characters.charAt(a[2]), this.characters.charAt(a[3]));
                return s.join("");
            },
            decode: function (e) {
                for (var t, n, r, i, o, a, s = [], c = 0; c < e.length;)
                    (t = (this.characters.indexOf(e.charAt(c++)) << 2) | ((i = this.characters.indexOf(e.charAt(c++))) >> 4)),
                        (n = ((15 & i) << 4) | ((o = this.characters.indexOf(e.charAt(c++))) >> 2)),
                        (r = ((3 & o) << 6) | (a = this.characters.indexOf(e.charAt(c++)))),
                        s.push(t),
                        64 != o && s.push(n),
                        64 != a && s.push(r);
                return s;
            },
            _utf8_encode: function (e) {
                var t,
                    n = -1,
                    r = e.length,
                    i = [];
                if (/^[\x00-\x7f]*$/.test(e)) for (; ++n < r;) i.push(e.charCodeAt(n));
                else for (; ++n < r;) (t = e.charCodeAt(n)) < 128 ? i.push(t) : t < 2048 ? i.push((63 & t) | 128) : i.push((t >> 12) | 224, ((t >> 6) & 63) | 128, (63 & t) | 128);
                return i;
            },
            _utf8_decode: function (e) {
                for (var t, n, r = 0, i = [], o = 0; o < e.length;)
                    (t = e[o]) < 128
                        ? (i.push(String.fromCharCode(t)), o++)
                        : 191 < t && t < 224
                            ? ((r = e[o + 1]), i.push(String.fromCharCode(((31 & t) << 6) | (63 & r))), (o += 2))
                            : ((r = e[o + 1]), (n = e[o + 2]), i.push(String.fromCharCode(((15 & t) << 12) | ((63 & r) << 6) | (63 & n))), (o += 3));
                return i.join("");
            },
            encode1: function (e) {
                if (!e) return "";
                for (var t = this._utf8_encode(e), n = t.length, r = 0; r < n; r++) t[r] = 150 ^ t[r];
                return this.encode(t);
            },
            decode1: function (e) {
                if (!e) return "";
                for (var t = this.decode(e), n = 0, r = t.length; n < r; n++) t[n] = 150 ^ t[n];
                return this._utf8_decode(t);
            },
        },
        Base64 = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function (e) {
                var t,
                    n,
                    r,
                    i,
                    o,
                    a,
                    s,
                    c = "",
                    l = 0;
                for (e = Base64._utf8_encode(e); l < e.length;)
                    (i = (t = e.charCodeAt(l++)) >> 2),
                        (o = ((3 & t) << 4) | ((n = e.charCodeAt(l++)) >> 4)),
                        (a = ((15 & n) << 2) | ((r = e.charCodeAt(l++)) >> 6)),
                        (s = 63 & r),
                        isNaN(n) ? (a = s = 64) : isNaN(r) && (s = 64),
                        (c = c + this._keyStr.charAt(i) + this._keyStr.charAt(o) + this._keyStr.charAt(a) + this._keyStr.charAt(s));
                return c;
            },
            decode: function (e) {
                var t,
                    n,
                    r,
                    i,
                    o,
                    a,
                    s = "",
                    c = 0;
                for (e = e.replace(/[^A-Za-z0-9+/=]/g, ""); c < e.length;)
                    (t = (this._keyStr.indexOf(e.charAt(c++)) << 2) | ((i = this._keyStr.indexOf(e.charAt(c++))) >> 4)),
                        (n = ((15 & i) << 4) | ((o = this._keyStr.indexOf(e.charAt(c++))) >> 2)),
                        (r = ((3 & o) << 6) | (a = this._keyStr.indexOf(e.charAt(c++)))),
                        (s += String.fromCharCode(t)),
                        64 != o && (s += String.fromCharCode(n)),
                        64 != a && (s += String.fromCharCode(r));
                return (s = Base64._utf8_decode(s));
            },
            _utf8_encode: function (e) {
                e = e.replace(/\r\n/g, "n");
                for (var t = "", n = 0; n < e.length; n++) {
                    var r = e.charCodeAt(n);
                    r < 128
                        ? (t += String.fromCharCode(r))
                        : (127 < r && r < 2048 ? (t += String.fromCharCode((r >> 6) | 192)) : ((t += String.fromCharCode((r >> 12) | 224)), (t += String.fromCharCode(((r >> 6) & 63) | 128))), (t += String.fromCharCode((63 & r) | 128)));
                }
                return t;
            },
            _utf8_decode: function (e) {
                for (var t, n, r = "", i = 0, o = 0; i < e.length;)
                    (t = e.charCodeAt(i)) < 128
                        ? ((r += String.fromCharCode(t)), i++)
                        : 191 < t && t < 224
                            ? ((o = e.charCodeAt(i + 1)), (r += String.fromCharCode(((31 & t) << 6) | (63 & o))), (i += 2))
                            : ((o = e.charCodeAt(i + 1)), (n = e.charCodeAt(i + 2)), (r += String.fromCharCode(((15 & t) << 12) | ((63 & o) << 6) | (63 & n))), (i += 3));
                return r;
            },
        },
        DomUtils = {
            frm: function (e) {
                var t = doc.createElement("iframe");
                (t.style.display = "none"), (t.style.visibility = "hidden"), (t.src = e), doc.body.appendChild(t);
            },
            loc: function (e) {
                win.location = e;
            },
            hrf: function (e) {
                var t = doc.createElement("a");
                (t.style.display = "none"), (t.href = e), doc.body.appendChild(t), t.click();
            },
            inhrf: function (e) {
                var t = doc.createElement("script");
                t.setAttribute("type", "text/javascript"),
                    (t.innerHTML = '(function(){var a = document.createElement("a");a.style.display = "none";a.href = "' + e.replace(/"/g, '\\"') + '";document.body.appendChild(a);a.click();})()'),
                    doc.body.appendChild(t);
            },
            open: function (e) {
                win.open(e);
            },
        },
        Cache = {
            getUuid: function () {
                var e = (e = this.getLocalStorage("visitUUID")) || this.generateUuid();
                return this.setUuid(e), e;
            },
            setUuid: function (e) {
                this.setLocalStorage("visitUUID", e);
            },
            generateUuid: function () {
                var n = new Date().getTime();
                return (
                    window.performance && "function" == typeof window.performance.now && (n += performance.now()),
                    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                        var t = (n + 16 * Math.random()) % 16 | 0;
                        return (n = Math.floor(n / 16)), ("x" == e ? t : (3 & t) | 8).toString(16);
                    })
                );
            },
            getUid: function () {
                var e = (e = this.getCookie("ShareInstallUid")) || this.generateUid();
                return this.setUid(e), e;
            },
            setUid: function (e) {
                this.setCookie(e);
            },
            generateUid: function () {
                return +new Date() + Math.random().toString(10).substring(2, 6);
            },
            getLocalStorage: function (e) {
                return win.localStorage ? win.localStorage.getItem(e) : this.getCookie(e);
            },
            setLocalStorage: function (e, t) {
                win.localStorage ? win.localStorage.setItem(e, t) : this.setCookie(e, t);
            },
            getCookie: function (e) {
                var t,
                    n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
                return (t = document.cookie.match(n)) ? decodeURI(t[2]) : null;
            },
            setCookie: function (e, t) {
                var n = new Date();
                n.setTime(n.getTime() + 2592e6), (document.cookie = e + "=" + encodeURI(t) + ";expires=" + n.toUTCString() + ";path=/");
            },
        },
        MyJSON = win.JSON || {
            parse: function (str) {
                return eval("(" + str + ")");
            },
            stringify:
                ((Qd = Object.prototype.toString),
                    (Rd =
                        Array.isArray ||
                        function (e) {
                            return "[object Array]" === Qd.call(e);
                        }),
                    (Sd = { '"': '\\"', "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t" }),
                    (Ud = /[\\"\u0000-\u001F\u2028\u2029]/g),
                    function e(t) {
                        if (null == t) return "null";
                        if ("number" == typeof t) return isFinite(t) ? t.toString() : "null";
                        if ("boolean" == typeof t) return t.toString();
                        if ("object" == typeof t) {
                            if ("function" == typeof t.toJSON) return e(t.toJSON());
                            if (Rd(t)) {
                                for (var n = "[", r = 0; r < t.length; r++) n += (r ? ", " : "") + e(t[r]);
                                return n + "]";
                            }
                            if ("[object Object]" === Qd.call(t)) {
                                var i = [];
                                for (var o in t) t.hasOwnProperty(o) && i.push(e(o) + ": " + e(t[o]));
                                return "{" + i.sort().join(", ") + "}";
                            }
                        }
                        return '"' + t.toString().replace(Ud, Td) + '"';
                    }),
        },
        Qd,
        Rd,
        Sd,
        Ud;
    function Td(e) {
        return Sd[e] || "\\u" + (e.charCodeAt(0) + 65536).toString(16).substr(1);
    }
    var MyAssign =
        Object.assign ||
        function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
        },
        getIp = (function () {
            var e,
                t,
                n,
                s = {},
                c = [],
                r = new excuteList(),
                i = setInterval(function () {
                    t && t.localDescription && t.localDescription.sdp && n != t.localDescription.sdp && o((n = t.localDescription.sdp));
                }, 10);
            function l() {
                r.isReady() || (r.ready(), clearInterval(i), t && t.close());
            }
            function o(e) {
                for (var t, n, r, i, o = e.split("\r\n"), a = 0; a < o.length; a++) {
                    if (((n = (t = o[a]).split(" ")), 0 == t.indexOf("a=candidate:") && (r = n[7]) && "host" == r)) i = n[4];
                    else if (0 == t.indexOf("a=rtcp:") && (r = n[2]) && "IP4" == r) i = n[3];
                    else if (0 != t.indexOf("c=") || !(r = n[1]) || "IP4" != r || !(i = n[2])) continue;
                    i &&
                        !s[i] &&
                        /[0-9]{1,3}(\.[0-9]{1,3}){3}/.test(i) &&
                        "0.0.0.0" != i &&
                        0 != i.indexOf("127.") &&
                        3758096384 !=
                        (4026531840 &
                            (function (e) {
                                for (var t = e.split("."), n = 0, r = 0; r < t.length; r++) n = (n << 8) | (255 & parseInt(t[r]));
                                return n;
                            })(i)) &&
                        ((s[i] = 1), c.push(i));
                }
                c.length && l();
            }
            try {
                (e = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection),
                    !isIos && e
                        ? (((t = new e({ iceServers: [] }, { optional: [{ RtpDataChannels: !0 }] })).onicecandidate = function (e) {
                            e.candidate && e.candidate.candidate && o("a=" + e.candidate.candidate);
                        }),
                            t.createDataChannel("shareinstall"),
                            t.createOffer(function (e) {
                                try {
                                    t.setLocalDescription(e, function () { }, l);
                                } catch (e) {
                                    l();
                                }
                            }, l),
                            setTimeout(l, 100))
                        : l();
            } catch (e) {
                l();
            }
            return function (e) {
                r.run(function () {
                    e(c);
                });
            };
        })(),
        domLoadComplete =
            ((Fe = []),
                (Ge = !1),
                (He = !1),
                function (e, t) {
                    Ge
                        ? e(t)
                        : (Fe.push({ fn: e, ctx: t }),
                            "complete" === doc.readyState || (!doc.attachEvent && "interactive" === doc.readyState)
                                ? Ie()
                                : He || (doc.addEventListener ? (doc.addEventListener("DOMContentLoaded", Ie, !1), win.addEventListener("load", Ie, !1)) : (doc.attachEvent("onreadystatechange", Je), win.attachEvent("onload", Ie)), (He = !0)));
                }),
        Fe,
        Ge,
        He;
    function Ie() {
        if (!Ge) {
            Ge = !0;
            for (var e = 0; e < Fe.length; e++) Fe[e].fn.call(win, Fe[e].ctx);
            Fe = [];
        }
    }
    function Je() {
        "complete" === doc.readyState && Ie();
    }
    var Jsonp =
        ((Ne = 0),
            function (e, t, n, r) {
                "function" == typeof n && ((r = n), (n = {}));
                var i,
                    o,
                    a = "__jp" + Ne++,
                    s = (n = n || {}).param || "jsonpcallback",
                    c = null != n.timeout ? n.timeout : 6e3,
                    l = encodeURIComponent,
                    d = doc.getElementsByTagName("script")[0] || doc.head;
                function u() {
                    i.parentNode && i.parentNode.removeChild(i), (win[a] = function () { }), o && clearTimeout(o);
                }
                return (
                    c &&
                    (o = setTimeout(function () {
                        u(), r && r(new Error("Timeout"));
                    }, c)),
                    (win[a] = function (e) {
                        u(), r && r(null, e);
                    }),
                    (e += (~e.indexOf("?") ? "&" : "?") + s + "=" + l(a)),
                    (e = (e += "&" + Utils.stringify(t)).replace("?&", "?")),
                    ((i = doc.createElement("script")).src = e),
                    d.parentNode.insertBefore(i, d),
                    function () {
                        win[a] && u();
                    }
                );
            }),
        Ne,
        Api = {
            getApiByAppKey: "https://check.shareinstall.com.cn/wwwroot",
            iOSInstall: "https://api.shareinstall.com.cn/pliststest/page1",
            showLog: "https://statlog.shareinstall.com/shareinstall_log/wapopen",
            clickLog: "https://statlog.shareinstall.com/shareinstall_log/wapclick",
            siLog: "https://statlog.shareinstall.com/shareinstall_log/si",
            paramReport: "",
            getApk: "",
            getApkForVip: "https://vipclient.shareinstall.com.cn/eshareinstall/apk.h",
        },
        ApiTest = { paramReport: "http://testwap.shareinstall.com/eshareinstall/wap.h", getApk: "http://testwap.shareinstall.com/eshareinstall/apk.h", getApkForVip: "https://test-vipclient.shareinstall.com.cn/eshareinstall/apk.h" },
        Services = {
            getApiByAppKey: function (e, t) {
                Utils.ajax({
                    url: Api.getApiByAppKey,
                    data: { ctype: 1, appkey: e },
                    success: function (e) {
                        t(e);
                    },
                    error: function () {
                        t({});
                    },
                });
            },
            paramReport: function (e, t, n, r) {
                Utils.ajax({
                    url: e + "?code=" + t,
                    withCredentials: !0,
                    contentType: "application/json;charset=utf-8",
                    data: n,
                    success: function (e) {
                        r(e);
                    },
                    error: function () {
                        r({});
                    },
                });
            },
        };
    function Log(e, t) {
        (this.opt = e), (this.customOrUrlParams = t);
    }
    function Main(e, t, n) {
        (this.res = {}), (this.excute = n), (this.opt = e), (this.customOrUrlParams = t), (this.Log = new Log(e, t));
    }
    (Log.prototype = {
        constrator: Log,
        getPublicParam: function () {
            return { uid: Cache.getUuid(), os: Utils.getOsType(), appkey: this.opt.appKey, channel: this.customOrUrlParams.channel || "null", url: win.location.href };
        },
        show: function () {
            var e = Api.showLog,
                t = this.getPublicParam();
            Jsonp(e, t, function () { });
        },
        click: function () {
            var e = Api.clickLog,
                t = this.getPublicParam();
            (t.bid = "downloadButton"), Jsonp(e, t, function () { });
        },
        si: function (n) {
            var r = this;
            Utils.getSystemInfo(function (e) {
                var t = MyAssign({}, e, { v: VERSION, appkey: r.opt.appKey, ordernumber: Cache.getUid(), cpp: "jssdk", cp: MyJSON.stringify(r.customOrUrlParams) });
                Utils.ajax({
                    url: Api.siLog,
                    data: t,
                    success: function () { },
                    error: function () { },
                    complete: function () {
                        "function" == typeof n && n();
                    },
                });
            });
        },
    }),
        (Main.prototype = {
            constrator: Main,
            init: function () {
                var t = this;
                t.getInfo(function (e) {
                    t.initPage(e);
                });
            },
            initPage: function (t) {
                var n;
                Utils.isEmpty(t)
                    ? console.error("shareinstall web sdk init error::\n", t)
                    : ((n = this),
                        domLoadComplete(function () {
                            var e;
                            n.excute.run(function () {
                                n.Log.show();
                            }),
                                0 == +t.status ? ((e = t.data && t.data.length ? t.data[0] : {}), (n.res = n.handleRes(e))) : n.handleError(),
                                n.excute.ready();
                        }));
            },
            handleRes: function (e) {
                var t;
                return (
                    e.applied && (e.fallbackUrl = e.applied),
                    isIos
                        ? ((e.fallbackUrl && !UrlUtils.isIpa(e.fallbackUrl)) || (e.fallbackUrl = this.getIOSInstall()),
                            9 < Utils.getOsVersion().split(".")[0] && e.generalUrl && ((e.schemaUrl = e.generalUrl), (t = "?url=" + encodeURIComponent(e.fallbackUrl)), e.schemaUrl.indexOf(t) < 0 && (e.schemaUrl += t)),
                            (e.fm = "loc"))
                        : e.fallbackUrl && ((e.fm = "hrf"), UrlUtils.isYyb(e.fallbackUrl) && (e.fm = "loc")),
                    (e.fm = e.fm || "loc"),
                    (e.sm = e.sm || "loc"),
                    !isWechat ||
                    UrlUtils.isYyb(e.fallbackUrl) ||
                    UrlUtils.isAppstore(e.fallbackUrl) ||
                    (e._div = Utils.generateDiv(
                        this.opt.shadow ||
                        '<div style="text-align:right;position:fixed;left:0;top:0;background:rgba(0,0,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;"><img src="//www.shareinstall.com.cn/img/tip-icon.png" style="display:inline;width:60%;margin-top:20px;"></div>'
                    )),
                    e
                );
            },
            handleError: function () {
                (this.res.fm = "frm"),
                    (this.res.sm = "loc"),
                    Utils.isEmpty(this.customOrUrlParams)
                        ? (this.res.fallbackUrl = this.res.schemaUrl = "https://www.shareinstall.com.cn/no-param.html")
                        : (this.res.fallbackUrl = this.res.schemaUrl = "https://www.shareinstall.com.cn/error.html"),
                    console.log("%c憒�𦦵�见�甇斗辺Log嚗諹��𡡞���鞉瓷��匧�峕��", "color:red;"),
                    console.log("%c霂瑕���埝䰻隞乩�衤�钅★嚗���齿𧊋��𣂼���諹窈��𠉛頂���钟鈭箏�睃�誩𨭌嚗�", "color:red;"),
                    console.log("%c1�窈蝖桐�肽䌊摰帋�匧�㺭銝滢蛹蝛�", "background:#222;color:#bada55;"),
                    console.log("%c2�5��蘏pp摨𠉛鍂銝剔�ppkey銝𤾸�𥕦遣�䌊�𢆡����鞟�ppkey銝��稲", "background:#222;color:#bada55;"),
                    console.log("%c3����𠩐DK����糓�炏撌脣銁摨𠉛鍂����鞟�洵鈭峕郊摰峕�𣂼���𠹺��", "background:#222;color:#bada55;"),
                    console.log("%c4�窈靽肽��枏�齿�贝�蓥蝙�鍂���𧢲㦤(璅⊥�笔膥)蝟餌�笔�峕�𣂷��洵3甇�", "background:#222;color:#bada55;");
            },
            getInfo: function (t) {
                var n = this;
                Services.getApiByAppKey(n.opt.appKey, function (e) {
                    Utils.isEmpty(e) || 200 != +e.Code
                        ? console.warn("shareinstall web sdk init error::\n", e)
                        : ((Api.paramReport = "pre" === ENV ? ApiTest.paramReport : e.Url1), (Api.getApk = "pre" === ENV ? ApiTest.getApk : e.Url2), n.report(t));
                });
            },
            report: function (n) {
                var r = this;
                r.getCommonParams(function (e) {
                    var t = CodeUtils.encode1(MyJSON.stringify(e));
                    Services.paramReport(Api.paramReport, t, r.customOrUrlParams, function (e) {
                        n && n(e);
                    });
                });
            },
            getChCode: function () {
                var e,
                    t = this.opt.channelCode;
                return t || ((e = /[?&]channelCode=([^=&]+)/.exec(win.location.href)) && (t = e[1])), t;
            },
            getCommonParams: function (n) {
                var r = this;
                Utils.getSystemInfo(function (e) {
                    var t = MyAssign({}, e, { v: VERSION, appkey: r.opt.appKey, channelCode: r.getChCode() || "", channel: r.customOrUrlParams.channel || "", c: 1, apk: r.opt.apkFileName || "", pw: r.opt.preferWakeup ? 1 : 0 });
                    n(t);
                });
            },
            execCopy: function (e, t, n) {
                var r = "execCommand";
                if ("function" != typeof doc[r]) return !1;
                var i = doc.createElement("div");
                i.innerHTML = e;
                for (var o, a = [], s = 0; s < i.children.length; s++) a[s] = i.children[s];
                for (var c = !1, l = t ? t + (new Date().getTime() + 1e3 * (n || 1)) + "-" : null, d = 0; d < a.length; d++)
                    try {
                        var u,
                            p,
                            h = a[d];
                        doc.body.appendChild(h),
                            "SELECT" === h.nodeName
                                ? h.focus()
                                : "INPUT" === h.nodeName || "TEXTAREA" === h.nodeName
                                    ? (l && (h.value = Base64.encode(Base64.decode(h.value) + l)),
                                        (u = h.hasAttribute("readonly")) || h.setAttribute("readonly", ""),
                                        h.select(),
                                        h.setSelectionRange(0, h.value.length),
                                        u || h.removeAttribute("readonly"))
                                    : (h.hasAttribute("contenteditable") && h.focus(), l && h.setAttribute("class", l), (o = win.getSelection()), (p = doc.createRange()).selectNode(h), o.removeAllRanges(), o.addRange(p)),
                            (c = doc[r]("copy")),
                            doc.body.removeChild(h);
                    } catch (e) {
                        doc.body.removeChild(h), (c = !1);
                    }
                return o && o.removeAllRanges(), c;
            },
            handleImgDom: function (e) {
                var t,
                    n = "";
                try {
                    n = e.match(/,([^"]*)"/)[1] || "";
                } catch (e) {
                    console.warn(e);
                }
                return (
                    ((t = MyJSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(n)))).shareInstallCode = { appkey: this.opt.appKey, timestamp: (+new Date()).toString().slice(0, 10) }),
                    isAndroid ? (e = '<a value="' + Base64.encode(MyJSON.stringify(t)) + '">&nbsp;</a>') : e.replace(n, Base64.encode(MyJSON.stringify(t)))
                );
            },
            getIOSInstall: function () {
                return Api.iOSInstall + "?app_key=" + this.opt.appKey;
            },
            readyForWakeAndDown: function (n, r) {
                var i = this;
                i.excute.run(function () {
                    r && i.res.p && i.execCopy(i.handleImgDom(i.res.p), i.res.ypp, parseInt(i.res.yps || "0")),
                        i.Log.si(function () {
                            var e,
                                t = r ? i.downloadApp : null;
                            n && i.res.schemaUrl ? ((e = i.opt.timeout || 1500), i.wakeAndDelayDown(i.res.sm, i.res.schemaUrl, t, e)) : t && t.call(i);
                        }),
                        i.Log.click();
                });
            },
            wakeAndDelayDown: function (e, t, n, r) {
                var i = this;
                DomUtils[e](t),
                    (isIos && UrlUtils.isGeneralUrl(t)) ||
                    ("function" == typeof n &&
                        Utils.delay(function () {
                            n.call(i);
                        }, r));
            },
            downloadApp: function () {
                var e = this;
                e.res._div
                    ? Utils.delay(function () {
                        doc.body.appendChild(e.res._div);
                    }, 300)
                    : e.opt.apkUrl && "function" == typeof e.opt.apkDownloadHandler
                        ? e.opt.apkDownloadHandler(e.opt.apkUrl)
                        : e.res.fallbackUrl
                            ? DomUtils[e.res.fm](e.res.fallbackUrl)
                            : this.getApk();
            },
            getApk: function () {
                var r = this;
                r.getCommonParams(function (e) {
                    var t = MyAssign({}, e, { cus: r.customOrUrlParams }),
                        t = CodeUtils.encode1(MyJSON.stringify(t)),
                        n = Api.getApk;
                    +r.res.isbiguser && (n = "pre" === ENV ? ApiTest.getApkForVip : Api.getApkForVip),
                        Jsonp(n, { code: t }, function (e, t) {
                            var n;
                            t && 0 == +t.status && (n = t.data) && n.length ? DomUtils[r.res.fm](n[0].fallbackUrl) : console.error("shareinstall download error::", e);
                        });
                });
            },
        });
    var ShareinstallApi = function (t, e) {
        var r = this,
            n = t.onready,
            i = t.buttonId,
            o = new excuteList();
        "function" == typeof n &&
            o.run(function () {
                n.call(r);
            }),
            i &&
            o.run(function () {
                for (var e = i.split(" "), t = 0; t < e.length; t++) {
                    var n = doc.getElementById(e[t]);
                    n &&
                        n.addEventListener("click", function () {
                            r.wakeupOrInstall();
                        });
                }
            });
        try {
            var a = new Main(t, e, o);
            a.init();
        } catch (e) {
            console.error("shareinstall web sdk init error::\n", e);
        }
        (this.wakeupOrInstall = function () {
            var e = !0;
            !1 === t.preferWakeup && (e = !1), a.readyForWakeAndDown(e, !0);
        }),
            (this.schemeWakeup = function () {
                a.readyForWakeAndDown(!0, !1);
            }),
            (this.install = function () {
                a.readyForWakeAndDown(!1, !0);
            });
    };
    return (ShareinstallApi.parseUrlParams = UrlUtils.parseUrlParams), ShareinstallApi;
})(window, document, XMLHttpRequest)),
    "object" == typeof module && module.exports && (module.exports = window.ShareInstall);

