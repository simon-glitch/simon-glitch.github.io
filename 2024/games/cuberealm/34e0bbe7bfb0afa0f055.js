(self.webpackChunkcuberealm_client = self.webpackChunkcuberealm_client || []).push([[0x261], {
    0x908f: m => {
        'use strict';
        var H, O = 'object' == typeof Reflect ? Reflect : null, N = O && 'function' == typeof O.apply ? O.apply : function (X, C, T) {
            return Function.prototype.apply.call(X, C, T);
        };
        H = O && 'function' == typeof O.ownKeys ? O.ownKeys : Object.getOwnPropertySymbols ? function (X) {
            return Object.getOwnPropertyNames(X).concat(Object.getOwnPropertySymbols(X));
        } : function (X) {
            return Object.getOwnPropertyNames(X);
        };
        var J = Number.isNaN || function (X) {
            return X != X;
        };
        function A() {
            A.init.call(this);
        }
        m.exports = A, m.exports.once = function (X, C) {
            return new Promise(function (T, E) {
                function D(w) {
                    X.removeListener(C, K), E(w);
                } function K() {
                    'function' == typeof X.removeListener && X.removeListener('error', D), T([].slice.call(arguments));
                } y(X, C, K, { once: true }), 'error' !== C && function (w, Q, U) {
                    'function' == typeof w.on && y(w, 'error', Q, U);
                }(X, D, { once: true });
            });
        }, A.EventEmitter = A, A.prototype._events = void 0, A.prototype._eventsCount = 0, A.prototype._maxListeners = void 0;
        var F = 0xa;
        function G(X) {
            if ('function' != typeof X) throw new TypeError('The \x22listener\x22 argument must be of type Function. Received type ' + typeof X);
        }
        function R(X) {
            return void 0 === X._maxListeners ? A.defaultMaxListeners : X._maxListeners;
        }
        function j(X, C, T, E) {
            var D, K, w, Q;
            if (G(T), void 0 === (K = X._events) ? (K = X._events = Object.create(null), X._eventsCount = 0) : (void 0 !== K.newListener && (X.emit('newListener', C, T.listener ? T.listener : T), K = X._events), w = K[C]), void 0 === w) w = K[C] = T, ++X._eventsCount;
            else {
                if ('function' == typeof w ? w = K[C] = E ? [T, w] : [w, T] : E ? w.unshift(T) : w.push(T), (D = R(X)) > 0 && w.length > D && !w.warned) {
                    w.warned = true;
                    var U = new Error('Possible EventEmitter memory leak detected. ' + w.length + ' ' + String(C) + ' listeners added. Use emitter.setMaxListeners() to increase limit');
                    U.name = 'MaxListenersExceededWarning', U.emitter = X, U.type = C, U.count = w.length, Q = U, console && console.warn && console.warn(Q);
                }
            } return X;
        }
        function B() {
            if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
        }
        function z(X, C, T) {
            var E = { fired: false, wrapFn: void 0, target: X, type: C, listener: T }, D = B.bind(E);
            return D.listener = T, E.wrapFn = D, D;
        }
        function q(X, C, T) {
            var E = X._events;
            if (void 0 === E) return [];
            var D = E[C];
            return void 0 === D ? [] : 'function' == typeof D ? T ? [D.listener || D] : [D] : T ? function (K) {
                for (var w = new Array(K.length), Q = 0;
                    Q < w.length;
                    ++Q)w[Q] = K[Q].listener || K[Q];
                return w;
            }(D) : L(D, D.length);
        }
        function b(X) {
            var C = this._events;
            if (void 0 !== C) {
                var T = C[X];
                if ('function' == typeof T) return 1;
                if (void 0 !== T) return T.length;
            } return 0;
        }
        function L(X, C) {
            for (var T = new Array(C), E = 0;
                E < C;
                ++E)T[E] = X[E];
            return T;
        }
        function y(X, C, T, E) {
            if ('function' == typeof X.on) E.once ? X.once(C, T) : X.on(C, T);
            else {
                if ('function' != typeof X.addEventListener) throw new TypeError('The \x22emitter\x22 argument must be of type EventEmitter. Received type ' + typeof X);
                X.addEventListener(C, function D(K) {
                    E.once && X.removeEventListener(C, D), T(K);
                });
            }
        }
        Object.defineProperty(A, 'defaultMaxListeners', {
            enumerable: true, get: function () {
                return F;
            }, set: function (X) {
                if ('number' != typeof X || X < 0 || J(X)) throw new RangeError('The value of \x22defaultMaxListeners\x22 is out of range. It must be a non-negative number. Received ' + X + '.');
                F = X;
            }
        });
        A.init = function () {
            void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
        };
        A.prototype.setMaxListeners = function (X) {
            if ('number' != typeof X || X < 0 || J(X)) throw new RangeError('The value of \x22n\x22 is out of range. It must be a non-negative number. Received ' + X + '.');
            return this._maxListeners = X, this;
        };
        A.prototype.getMaxListeners = function () {
            return R(this);
        };
        A.prototype.emit = function (X) {
            for (var C = [], T = 1;
                T < arguments.length;
                T++)C.push(arguments[T]);
            var E = 'error' === X, D = this._events;
            if (void 0 !== D) E = E && void 0 === D.error;
            else {
                if (!E) return false;
            } if (E) {
                var K;
                if (C.length > 0 && (K = C[0]), K instanceof Error) throw K;
                var w = new Error('Unhandled error.' + (K ? ' (' + K.message + ')' : ''));
                throw w.context = K, w;
            } var Q = D[X];
            if (void 0 === Q) return false;
            if ('function' == typeof Q) N(Q, this, C);
            else {
                var U = Q.length, M = L(Q, U);
                for (T = 0;
                    T < U;
                    ++T)N(M[T], this, C);
            } return true;
        };
        A.prototype.addListener = function (X, C) {
            return j(this, X, C, false);
        };
        A.prototype.on = A.prototype.addListener, A.prototype.prependListener = function (X, C) {
            return j(this, X, C, true);
        };
        A.prototype.once = function (X, C) {
            return G(C), this.on(X, z(this, X, C)), this;
        };
        A.prototype.prependOnceListener = function (X, C) {
            return G(C), this.prependListener(X, z(this, X, C)), this;
        };
        A.prototype.removeListener = function (X, C) {
            var T, E, D, K, w;
            if (G(C), void 0 === (E = this._events)) return this;
            if (void 0 === (T = E[X])) return this;
            if (T === C || T.listener === C) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete E[X], E.removeListener && this.emit('removeListener', X, T.listener || C));
            else {
                if ('function' != typeof T) {
                    for (D = -1, K = T.length - 1;
                        K >= 0;
                        K--)if (T[K] === C || T[K].listener === C) {
                            w = T[K].listener, D = K;
                            break;
                        } if (D < 0) return this;
                    0 === D ? T.shift() : function (Q, U) {
                        for (;
                            U + 1 < Q.length;
                            U++)Q[U] = Q[U + 1];
                        Q.pop();
                    }(T, D), 1 === T.length && (E[X] = T[0]), void 0 !== E.removeListener && this.emit('removeListener', X, w || C);
                }
            } return this;
        };
        A.prototype.off = A.prototype.removeListener, A.prototype.removeAllListeners = function (X) {
            var C, T, E;
            if (void 0 === (T = this._events)) return this;
            if (void 0 === T.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== T[X] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete T[X]), this;
            if (0 === arguments.length) {
                var D, K = Object.keys(T);
                for (E = 0;
                    E < K.length;
                    ++E)'removeListener' !== (D = K[E]) && this.removeAllListeners(D);
                return this.removeAllListeners('removeListener'), this._events = Object.create(null), this._eventsCount = 0, this;
            } if ('function' == typeof (C = T[X])) this.removeListener(X, C);
            else {
                if (void 0 !== C) {
                    for (E = C.length - 1;
                        E >= 0;
                        E--)this.removeListener(X, C[E]);
                }
            } return this;
        };
        A.prototype.listeners = function (X) {
            return q(this, X, true);
        };
        A.prototype.rawListeners = function (X) {
            return q(this, X, false);
        };
        A.listenerCount = function (X, C) {
            return 'function' == typeof X.listenerCount ? X.listenerCount(C) : b.call(X, C);
        };
        A.prototype.listenerCount = b, A.prototype.eventNames = function () {
            return this._eventsCount > 0 ? H(this._events) : [];
        };
    },
    0x56cb: m => {
        'use strict';
        m.exports = function (H) {
            for (var O = new Array(H), u = 0;
                u < H;
                ++u)O[u] = u;
            return O;
        };
    },
    0x154a6: m => {
        function H(O) {
            return !!O.constructor && 'function' == typeof O.constructor.isBuffer && O.constructor.isBuffer(O);
        } m.exports = function (O) {
            return null != O && (H(O) || function (u) {
                return 'function' == typeof u.readFloatLE && 'function' == typeof u.slice && H(u.slice(0, 0));
            }(O) || !!O._isBuffer);
        };
    },
    0x96ff: (m, H, O) => {
        var N = O(0x56cb), J = O(0x154a6), A = 'undefined' != typeof Float64Array;
        function v(j, B) {
            return j[0] - B[0];
        } function F() {
            var j, B = this.stride, z = new Array(B.length);
            for (j = 0;
                j < z.length;
                ++j)z[j] = [Math.abs(B[j]), j];
            z.sort(v);
            var q = new Array(z.length);
            for (j = 0;
                j < q.length;
                ++j)q[j] = z[j][1];
            return q;
        } function G(j, B) {
            var z = ['View', B, 'd', j].join('');
            B < 0 && (z = 'View_Nil' + j);
            var q = 'generic' === j;
            if (-1 === B) {
                var b = 'function ' + z + '(a){this.data=a;};var proto=' + z + '.prototype;proto.dtype=\x27' + j + '\x27;proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new ' + z + '(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_' + z + '(a){return new ' + z + '(a);}';
                return new Function(b)();
            }
            if (0 === B) {
                b = 'function ' + z + '(a,d) {this.data = a;this.offset = d};var proto=' + z + '.prototype;proto.dtype=\x27' + j + '\x27;proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function ' + z + '_copy() {return new ' + z + '(this.data,this.offset)};proto.pick=function ' + z + '_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function ' + z + '_get(){return ' + (q ? 'this.data.get(this.offset)' : 'this.data[this.offset]') + '};proto.set=function ' + z + '_set(v){return ' + (q ? 'this.data.set(this.offset,v)' : 'this.data[this.offset]=v') + '};return function construct_' + z + '(a,b,c,d){return new ' + z + '(a,d)}', new Function('TrivialArray', b)(R[j][0]);
                return b;
            }
            b = ['\x27use strict\x27'];
            var L = N(B);
            var X = L.map(function (M) {
                return 'i' + M;
            }), C = 'this.offset+' + L.map(function (M) {
                return 'this.stride[' + M + ']*i' + M;
            }).join('+'), T = L.map(function (M) {
                return 'b' + M;
            }).join(','), E = L.map(function (M) {
                return 'c' + M;
            }).join(',');
            b.push(
                'function ' + z + '(a,' + T + ',' + E + ',d){this.data=a', 'this.shape=[' + T + ']', 'this.stride=[' + E + ']', 'this.offset=d|0}', 'var proto=' + z + '.prototype', 'proto.dtype=\x27' + j + '\x27', 'proto.dimension=' + B
            );
            b.push(
                'Object.defineProperty(proto,\x27size\x27,{get:function ' + z + '_size(){return ' + L.map(function (M) {
                return 'this.shape[' + M + ']';
            }).join('*'), '}})');
            1 === B ? b.push(
                'proto.order=[0]'
            ) : (
                b.push('Object.defineProperty(proto,\x27order\x27,{get:'), B < 0x4 ? (b.push('function ' + z + '_order(){'), 0x2 === B ? b.push('return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})') : 0x3 === B && b.push('var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})')) : b.push('ORDER})')
            );
            b.push('proto.set=function ' + z + '_set(' + X.join(',') + ',v){'), q ? b.push('return this.data.set(' + C + ',v)}') : b.push('return this.data[' + C + ']=v}'), b.push('proto.get=function ' + z + '_get(' + X.join(',') + '){'), q ? b.push('return this.data.get(' + C + ')}') : b.push('return this.data[' + C + ']}'), b.push('proto.index=function ' + z + '_index(', X.join(), '){return ' + C + '}'), b.push('proto.hi=function ' + z + '_hi(' + X.join(',') + '){return new ' + z + '(this.data,' + L.map(function (M) {
                return ['(typeof i', M, '!==\x27number\x27||i', M, '<0)?this.shape[', M, ']:i', M, '|0'].join('');
            }).join(',') + ',' + L.map(function (M) {
                return 'this.stride[' + M + ']';
            }).join(',') + ',this.offset)}');
            var D = L.map(function (M) {
                return 'a' + M + '=this.shape[' + M + ']';
            }), K = L.map(function (M) {
                return 'c' + M + '=this.stride[' + M + ']';
            });
            b.push('proto.lo=function ' + z + '_lo(' + X.join(',') + '){var b=this.offset,d=0,' + D.join(',') + ',' + K.join(','));
            for (var w = 0;
                w < B;
                ++w)b.push('if(typeof i' + w + '===\x27number\x27&&i' + w + '>=0){d=i' + w + '|0;b+=c' + w + '*d;a' + w + '-=d}');
            b.push('return new ' + z + '(this.data,' + L.map(function (M) {
                return 'a' + M;
            }).join(',') + ',' + L.map(function (M) {
                return 'c' + M;
            }).join(',') + ',b)}'), b.push('proto.step=function ' + z + '_step(' + X.join(',') + '){var ' + L.map(function (M) {
                return 'a' + M + '=this.shape[' + M + ']';
            }).join(',') + ',' + L.map(function (M) {
                return 'b' + M + '=this.stride[' + M + ']';
            }).join(',') + ',c=this.offset,d=0,ceil=Math.ceil');
            for (w = 0;
                w < B;
                ++w)b.push('if(typeof i' + w + '===\x27number\x27){d=i' + w + '|0;if(d<0){c+=b' + w + '*(a' + w + '-1);a' + w + '=ceil(-a' + w + '/d)}else{a' + w + '=ceil(a' + w + '/d)}b' + w + '*=d}');
            b.push('return new ' + z + '(this.data,' + L.map(function (M) {
                return 'a' + M;
            }).join(',') + ',' + L.map(function (M) {
                return 'b' + M;
            }).join(',') + ',c)}');
            var Q = new Array(B), U = new Array(B);
            for (w = 0;
                w < B;
                ++w)Q[w] = 'a[i' + w + ']', U[w] = 'b[i' + w + ']';
            b.push('proto.transpose=function ' + z + '_transpose(' + X + '){' + X.map(function (M, g) {
                return M + '=(' + M + '===undefined?' + g + ':' + M + '|0)';
            }).join(';'), 'var a=this.shape,b=this.stride;return new ' + z + '(this.data,' + Q.join(',') + ',' + U.join(',') + ',this.offset)}'), b.push('proto.pick=function ' + z + '_pick(' + X + '){var a=[],b=[],c=this.offset');
            for (w = 0;
                w < B;
                ++w)b.push('if(typeof i' + w + '===\x27number\x27&&i' + w + '>=0){c=(c+this.stride[' + w + ']*i' + w + ')|0}else{a.push(this.shape[' + w + ']);b.push(this.stride[' + w + '])}');
            return b.push('var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}'), b.push('return function construct_' + z + '(data,shape,stride,offset){return new ' + z + '(data,' + L.map(function (M) {
                return 'shape[' + M + ']';
            }).join(',') + ',' + L.map(function (M) {
                return 'stride[' + M + ']';
            }).join(',') + ',offset)}'), new Function('CTOR_LIST', 'ORDER', b.join('\x0a'))(R[j], F);
        } var R = { float32: [], float64: [], int8: [], int16: [], int32: [], uint8: [], uint16: [], uint32: [], array: [], uint8_clamped: [], bigint64: [], biguint64: [], buffer: [], generic: [] };
        m.exports = function (j, B, z, q) {
            if (void 0 === j) return (0, R.array[0])([]);
            'number' == typeof j && (j = [j]), void 0 === B && (B = [j.length]);
            var b = B.length;
            if (void 0 === z) {
                z = new Array(b);
                for (var L = b - 1, y = 1;
                    L >= 0;
                    --L)z[L] = y, y *= B[L];
            } if (void 0 === q) {
                q = 0;
                for (L = 0;
                    L < b;
                    ++L)z[L] < 0 && (q -= (B[L] - 1) * z[L]);
            }
            function Y(C) {
                if (J(C)) return 'buffer';
                if (A) switch (Object.prototype.toString.call(C)) {
                    case '[object Float64Array]': return 'float64';
                    case '[object Float32Array]': return 'float32';
                    case '[object Int8Array]': return 'int8';
                    case '[object Int16Array]': return 'int16';
                    case '[object Int32Array]': return 'int32';
                    case '[object Uint8Array]': return 'uint8';
                    case '[object Uint16Array]': return 'uint16';
                    case '[object Uint32Array]': return 'uint32';
                    case '[object Uint8ClampedArray]': return 'uint8_clamped';
                    case '[object BigInt64Array]': return 'bigint64';
                    case '[object BigUint64Array]': return 'biguint64';
                }
                return Array.isArray(C) ? 'array' : 'generic';
            };
            for (
                var h = Y(j), X = R[h];
                X.length <= b + 1;)X.push(G(h, X.length - 1));
            return (0, X[b + 1])(j, B, z, q);
        };
    }, 0x427: (m, H, O) => {
        'use strict';
        var N = O(0x1791c), J = 'function' == typeof Object.is ? Object.is : function (B, z) {
            return B === z && (0 !== B || 1 / B == 1 / z) || B != B && z != z;
        }, A = N.useState, v = N.useEffect, F = N.useLayoutEffect, G = N.useDebugValue;
        function R(B) {
            var z = B.getSnapshot;
            B = B.value;
            try {
                var q = z();
                return !J(B, q);
            } catch (b) {
                return true;
            }
        } var j = 'undefined' == typeof window || void 0 === window.document || void 0 === window.document.createElement ? function (B, z) {
            return z();
        } : function (B, z) {
            var q = z(), b = A({ inst: { value: q, getSnapshot: z } }), L = b[0].inst, y = b[1];
            return F(function () {
                L.value = q, L.getSnapshot = z, R(L) && y({ inst: L });
            }, [B, q, z]), v(function () {
                return R(L) && y({ inst: L }), B(function () {
                    R(L) && y({ inst: L });
                });
            }, [B]), G(q), q;
        };
        H.useSyncExternalStore = void 0 !== N.useSyncExternalStore ? N.useSyncExternalStore : j;
    }, 0x15b6c: (m, H, O) => {
        'use strict';
        var N = O(0x1791c);
        var J = O(0x4db0);
        var A = 'function' == typeof Object.is ? Object.is : function (B, z) {
            return B === z && (0 !== B || 1 / B == 1 / z) || B != B && z != z;
        };
        var v = J.useSyncExternalStore;
        var F = N.useRef;
        var G = N.useEffect;
        var R = N.useMemo;
        var j = N.useDebugValue;
        H.useSyncExternalStoreWithSelector = function (B, z, q, b, L) {
            var y = F(null);
            if (null === y.current) {
                var X = { hasValue: false, value: null };
                y.current = X;
            } else X = y.current;
            y = R(function () {
                function T(w) {
                    if (!D) {
                        if (D = true, E = w, w = b(w), void 0 !== L && X.hasValue) {
                            var Q = X.value;
                            if (L(Q, w)){
                                d = Q;
                                return d;
                            }
                        }
                        d = w;
                        return d;
                    }
                    Q = d;
                    if (A(E, w)) return Q;
                    var U = b(w);
                    var C = L(Q, U);
                    var F = (void 0 !== L && C);
                    if(F) return Q;
                    else {
                        E = w;
                        d = U;
                        return d;
                    }
                }
                var E;
                var d;
                var D = false;
                var K = (void 0 === q ? null : q);
                var C = function () {
                    return T(z());
                };
                var F;
                if(null === K) F = void 0;
                else F = function () {
                    return T(K());
                };
                return [C, F];
            }, [z, q, b, L]);
            var C = v(B, y[0], y[1]);
            G(function () {
                X.hasValue = true, X.value = C;
            }, [C]);
            j(C);
            return C;
        };
    },
    0x4db0: (m, H, O) => {
        'use strict';
        m.exports = O(0x427);
    },
    0x10e7a: (m, H, O) => {
        'use strict';
        m.exports = O(0x15b6c);
    },
    0x1219: (m, H, O) => {
        var u = O(0x1200a).default;
        function N() {
            'use strict';
            N = function () {
                return G;
            };
            m.exports = N;
            m.exports.__esModule = true;
            m.exports.default = m.exports;
            var J;
            var G = {};
            var B = Object.prototype;
            var z = B.hasOwnProperty;
            var q = Object.defineProperty || function (mJ, mA, mv) {
                mJ[mA] = mv.value;
            };
            var X = 'function' == typeof Symbol ? Symbol : {};
            var C = X.iterator || '@@iterator';
            var D = X.asyncIterator || '@@asyncIterator';
            var K = X.toStringTag || '@@toStringTag';
            function Q(mJ, mA, mv) {
                Object.defineProperty(
                    mJ,
                    mA,
                    {
                        value: mv,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    });
                return mJ[mA];
            }
            try {
                Q({}, '');
            } catch (mJ) {
                Q = function (mA, mv, mF) {
                    return mA[mv] = mF;
                };
            }
            function U(mA, mv, mF, ma) {
                var mG = mv && mv.prototype instanceof m1 ? mv : m1, mc = Object.create(mG.prototype), mR = new mu(ma || []);
                return q(mc, '_invoke', { value: mm(mA, mF, mR) }), mc;
            }
            function M(mA, mv, mF) {
                try {
                    return { type: 'normal', arg: mA.call(mv, mF) };
                } catch (ma) {
                    return { type: 'throw', arg: ma };
                }
            } G.wrap = U;
            var Y = 'suspendedStart', W = 'suspendedYield', Z = 'executing', V = 'completed', m0 = {};
            function m1() { } function m2() { } function m3() { } var m4 = {};
            Q(m4, C, function () {
                return this;
            });
            var m5 = Object.getPrototypeOf, m6 = m5 && m5(m5(mN([])));
            m6 && m6 !== B && z.call(m6, C) && (m4 = m6);
            var m7 = m3.prototype = m1.prototype = Object.create(m4);
            function m8(mA) {
                ['next', 'throw', 'return'].forEach(function (mv) {
                    Q(mA, mv, function (mF) {
                        return this._invoke(mv, mF);
                    });
                });
            } function m9(mA, mv) {
                function mF(mG, mc, mR, mj) {
                    var mB = M(mA[mG], mA, mc);
                    if ('throw' !== mB.type) {
                        var mz = mB.arg, mq = mz.value;
                        return mq && 'object' == u(mq) && z.call(mq, '__await') ? mv.resolve(mq.__await).then(function (mb) {
                            mF('next', mb, mR, mj);
                        }, function (mb) {
                            mF('throw', mb, mR, mj);
                        }) : mv.resolve(mq).then(function (mb) {
                            mz.value = mb, mR(mz);
                        }, function (mb) {
                            return mF('throw', mb, mR, mj);
                        });
                    } mj(mB.arg);
                } var ma;
                q(this, '_invoke', {
                    value: function (mG, mc) {
                        function mR() {
                            return new mv(function (mj, mB) {
                                mF(mG, mc, mj, mB);
                            });
                        } return ma = ma ? ma.then(mR, mR) : mR();
                    }
                });
            } function mm(mA, mv, mF) {
                var ma = Y;
                return function (mG, mc) {
                    if (ma === Z) throw Error('Generator is already running');
                    if (ma === V) {
                        if ('throw' === mG) throw mc;
                        return { value: J, done: true };
                    }
                    for (
                        mF.method = mG, mF.arg = mc;
                        ;
                    ) {
                        var mR = mF.delegate;
                        if (mR) {
                            var mj = me(mR, mF);
                            if (mj) {
                                if (mj === m0) continue;
                                return mj;
                            }
                        }
                        if ('next' === mF.method){
                            mF._sent = mF.arg;
                            mF.sent = mF._sent;
                        }
                        else {
                            if ('throw' === mF.method) {
                                if (ma === Y) throw ma = V, mF.arg;
                                mF.dispatchException(mF.arg);
                            }
                            else if ('return' === mF.method){
                                mF.abrupt('return', mF.arg);
                            }
                        }
                        ma = Z;
                        var mB = M(mA, mv, mF);
                        if ('normal' === mB.type) {
                            if (ma = mF.done ? V : W, mB.arg === m0) continue;
                            return { value: mB.arg, done: mF.done };
                        }
                        if('throw' === mB.type){
                            ma = V;
                            mF.method = 'throw';
                            mF.arg = mB.arg;
                        }
                    }
                };
            }
            function me(mA, mv) {
                var mF = mv.method, ma = mA.iterator[mF];
                if (ma === J) return mv.delegate = null, 'throw' === mF && mA.iterator.return && (mv.method = 'return', mv.arg = J, me(mA, mv), 'throw' === mv.method) || 'return' !== mF && (mv.method = 'throw', mv.arg = new TypeError('The iterator does not provide a \x27' + mF + '\x27 method')), m0;
                var mG = M(ma, mA.iterator, mv.arg);
                if ('throw' === mG.type) return mv.method = 'throw', mv.arg = mG.arg, mv.delegate = null, m0;
                var mc = mG.arg;
                return mc ? mc.done ? (mv[mA.resultName] = mc.value, mv.next = mA.nextLoc, 'return' !== mv.method && (mv.method = 'next', mv.arg = J), mv.delegate = null, m0) : mc : (mv.method = 'throw', mv.arg = new TypeError('iterator result is not an object'), mv.delegate = null, m0);
            }
            function mH(mA) {
                var mv = { tryLoc: mA[0] };
                1 in mA && (mv.catchLoc = mA[1]), 0x2 in mA && (mv.finallyLoc = mA[0x2], mv.afterLoc = mA[0x3]), this.tryEntries.push(mv);
            }
            function mO(mA) {
                var mv = mA.completion || {};
                mv.type = 'normal', delete mv.arg, mA.completion = mv;
            }
            function mu(mA) {
                this.tryEntries = [{ tryLoc: 'root' }], mA.forEach(mH, this), this.reset(true);
            }
            function mN(mA) {
                if (mA || '' === mA) {
                    var mv = mA[C];
                    if (mv) return mv.call(mA);
                    if ('function' == typeof mA.next) return mA;
                    if (!isNaN(mA.length)) {
                        var mF = -1;
                        var ma = function mG() {
                            for (
                                ;
                                (++mF) < mA.length;
                            ){
                                if (z.call(mA, mF)){
                                    mG.value = mA[mF];
                                    mG.done = false;
                                    return mG;
                                }
                            }
                            mG.value = J;
                            mG.done = true;
                            return mG;
                        };
                        return ma.next = ma;
                    }
                }
                throw new TypeError(u(mA) + ' is not iterable');
            }
            m2.prototype = m3;
            q(m7, 'constructor', { value: m3, configurable: true });
            q(m3, 'constructor', { value: m2, configurable: true });
            m2.displayName = Q(m3, K, 'GeneratorFunction');
            G.isGeneratorFunction = function (mA) {
                var mv = 'function' == typeof mA && mA.constructor;
                return !!mv && (mv === m2 || 'GeneratorFunction' === (mv.displayName || mv.name));
            };
            G.mark = function (mA) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(mA, m3) : (mA.__proto__ = m3, Q(mA, K, 'GeneratorFunction')), mA.prototype = Object.create(m7), mA;
            };
            G.awrap = function (mA) {
                return { __await: mA };
            };
            m8(m9.prototype);
            Q(m9.prototype, D, function () {
                return this;
            });
            G.AsyncIterator = m9, G.async = function (mA, mv, mF, ma, mG) {
                void 0 === mG && (mG = Promise);
                var mc = new m9(U(mA, mv, mF, ma), mG);
                return G.isGeneratorFunction(mv) ? mc : mc.next().then(function (mR) {
                    return mR.done ? mR.value : mc.next();
                });
            };
            m8(m7), Q(m7, K, 'Generator');
            Q(m7, C, function () {
                return this;
            });
            Q(m7, 'toString', function () {
                return '[object Generator]';
            });
            G.keys = function (mA) {
                var mv = Object(mA), mF = [];
                for (var ma in mv) mF.push(ma);
                return mF.reverse(), function mG() {
                    for (;
                        mF.length;) {
                            var mc = mF.pop();
                        if (mc in mv) return mG.value = mc, mG.done = false, mG;
                    } return mG.done = true, mG;
                };
            };
            G.values = mN, mu.prototype = {
                constructor: mu, reset: function (mA) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = J, this.done = false, this.delegate = null, this.method = 'next', this.arg = J, this.tryEntries.forEach(mO), !mA) {
                        for (var mv in this) 't' === mv.charAt(0) && z.call(this, mv) && !isNaN(+mv.slice(1)) && (this[mv] = J);
                    }
                }, stop: function () {
                    this.done = true;
                    var mA = this.tryEntries[0].completion;
                    if ('throw' === mA.type) throw mA.arg;
                    return this.rval;
                }, dispatchException: function (mA) {
                    if (this.done) throw mA;
                    var mv = this;
                    function mF(mB, mz) {
                        return mc.type = 'throw', mc.arg = mA, mv.next = mB, mz && (mv.method = 'next', mv.arg = J), !!mz;
                    } for (var ma = this.tryEntries.length - 1;
                        ma >= 0;
                        --ma) {
                            var mG = this.tryEntries[ma], mc = mG.completion;
                        if ('root' === mG.tryLoc) return mF('end');
                        if (mG.tryLoc <= this.prev) {
                            var mR = z.call(mG, 'catchLoc'), mj = z.call(mG, 'finallyLoc');
                            if (mR && mj) {
                                if (this.prev < mG.catchLoc) return mF(mG.catchLoc, true);
                                if (this.prev < mG.finallyLoc) return mF(mG.finallyLoc);
                            } else {
                                if (mR) {
                                    if (this.prev < mG.catchLoc) return mF(mG.catchLoc, true);
                                } else {
                                    if (!mj) throw Error('try statement without catch or finally');
                                    if (this.prev < mG.finallyLoc) return mF(mG.finallyLoc);
                                }
                            }
                        }
                    }
                }, abrupt: function (mA, mv) {
                    for (var mF = this.tryEntries.length - 1;
                        mF >= 0;
                        --mF) {
                            var ma = this.tryEntries[mF];
                        if (ma.tryLoc <= this.prev && z.call(ma, 'finallyLoc') && this.prev < ma.finallyLoc) {
                            var mG = ma;
                            break;
                        }
                    } mG && ('break' === mA || 'continue' === mA) && mG.tryLoc <= mv && mv <= mG.finallyLoc && (mG = null);
                    var mc = mG ? mG.completion : {};
                    return mc.type = mA, mc.arg = mv, mG ? (this.method = 'next', this.next = mG.finallyLoc, m0) : this.complete(mc);
                }, complete: function (mA, mv) {
                    if ('throw' === mA.type) throw mA.arg;
                    return 'break' === mA.type || 'continue' === mA.type ? this.next = mA.arg : 'return' === mA.type ? (this.rval = this.arg = mA.arg, this.method = 'return', this.next = 'end') : 'normal' === mA.type && mv && (this.next = mv), m0;
                }, finish: function (mA) {
                    for (var mv = this.tryEntries.length - 1;
                        mv >= 0;
                        --mv) {
                            var mF = this.tryEntries[mv];
                        if (mF.finallyLoc === mA) return this.complete(mF.completion, mF.afterLoc), mO(mF), m0;
                    }
                }, catch: function (mA) {
                    for (var mv = this.tryEntries.length - 1;
                        mv >= 0;
                        --mv) {
                            var mF = this.tryEntries[mv];
                        if (mF.tryLoc === mA) {
                            var ma = mF.completion;
                            if ('throw' === ma.type) {
                                var mG = ma.arg;
                                mO(mF);
                            } return mG;
                        }
                    } throw Error('illegal catch attempt');
                }, delegateYield: function (mA, mv, mF) {
                    return this.delegate = { iterator: mN(mA), resultName: mv, nextLoc: mF }, 'next' === this.method && (this.arg = J), m0;
                }
            };
            return G;
        }
        m.exports = N;
        m.exports.__esModule = true;
        m.exports.default = m.exports;
    },
    0x1200a: m => {
        function H(O) {
            return m.exports = H = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (u) {
                return typeof u;
            } : function (u) {
                return u && 'function' == typeof Symbol && u.constructor === Symbol && u !== Symbol.prototype ? 'symbol' : typeof u;
            }, m.exports.__esModule = true, m.exports.default = m.exports, H(O);
        } m.exports = H, m.exports.__esModule = true, m.exports.default = m.exports;
    },
    0xd5e4: (m, H, O) => {
        var u = O(0x1219)();
        m.exports = u;
        try {
            regeneratorRuntime = u;
        } catch (N) {
            'object' == typeof globalThis ? globalThis.regeneratorRuntime = u : Function('r', 'regeneratorRuntime = r')(u);
        }
    },
    0x28e3: (m, H, O) => {
        'use strict';
        function u(J, A, v, F, G, c, R) {
            try {
                var j = J[c](R), B = j.value;
            } catch (z) {
                return void v(z);
            } j.done ? A(B) : Promise.resolve(B).then(F, G);
        } function N(J) {
            return function () {
                var A = this, v = arguments;
                return new Promise(function (F, G) {
                    var c = J.apply(A, v);
                    function R(B) {
                        u(c, F, G, R, j, 'next', B);
                    } function j(B) {
                        u(c, F, G, R, j, 'throw', B);
                    } R(void 0);
                });
            };
        } O.d(H, { A: () => N });
    },
    0x14124: (m, H, O) => {
        'use strict';
        function u(v) {
            u = (
                (('function' == typeof Symbol) && ('symbol' == typeof Symbol.iterator))
                ? (function (F) {
                    return typeof F;
                })
                : (function (F) {
                    return F && 'function' == typeof Symbol && F.constructor === Symbol && F !== Symbol.prototype ? 'symbol' : typeof F;
                })
            );
            return u(v);
        }
        function N(v) {
            var F = function (a, G) {
                if ('object' != u(a) || !a) return a;
                var c = a[Symbol.toPrimitive];
                if (void 0 !== c) {
                    var R = c.call(a, G || 'default');
                    if ('object' != u(R)) return R;
                    throw new TypeError('@@toPrimitive must return a primitive value.');
                } return ('string' === G ? String : Number)(a);
            }(v, 'string');
            return 'symbol' == u(F) ? F : F + '';
        }
        function J(v, F) {
            for (var a = 0;
                a < F.length;
                a++) {
                    var G = F[a];
                G.enumerable = G.enumerable || false, G.configurable = true, 'value' in G && (G.writable = true), Object.defineProperty(v, N(G.key), G);
            }
        }
        function A(v, F, a) {
            if(F) J(v.prototype, F);
            if(a) J(v, a);
            Object.defineProperty(v, 'prototype', { writable: false });
            return v;
        } O.d(H, { A: () => A });
    },
    0xe338: (m, H, O) => {
        'use strict';
        function u() {
            return u = Object.assign ? Object.assign.bind() : function (N) {
                for (var J = 1;
                    J < arguments.length;
                    J++) {
                        var A = arguments[J];
                    for (var v in A) Object.prototype.hasOwnProperty.call(A, v) && (N[v] = A[v]);
                } return N;
            }, u.apply(this, arguments);
        } O.d(H, { A: () => u });
    },
    0x12e4b: (m, H, O) => {
        'use strict';
        O.d(H, { A: () => N });
        var u = O(0xf8ae);
        function N(J, A) {
            J.prototype = Object.create(A.prototype), J.prototype.constructor = J, (0, u.A)(J, A);
        }
    },
    0xf8ae: (m, H, O) => {
        'use strict';
        function u(N, J) {
            return u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (A, v) {
                return A.__proto__ = v, A;
            }, u(N, J);
        } O.d(H, { A: () => u });
    },
    0x15a11: (m, H, O) => {
        'use strict';
        function u(v) {
            return u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (F) {
                return F.__proto__ || Object.getPrototypeOf(F);
            }, u(v);
        }
        O.d(H, { A: () => A });
        var N = O(0xf8ae);
        function J() {
            try {
                var v = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () { }));
            } catch (F) { } return (J = function () {
                return !!v;
            })();
        }
        function A(v) {
            var F = 'function' == typeof Map ? new Map() : void 0;
            A = function (a) {
                function C(c) {
                    try {
                        return -1 !== Function.toString.call(c).indexOf('[native code]');
                    } catch (R) {
                        return 'function' == typeof c;
                    }
                };
                if (null === a || !C(a)) return a;
                if ('function' != typeof a) throw new TypeError('Super expression must either be null or a function');
                if (void 0 !== F) {
                    if (F.has(a)) return F.get(a);
                    F.set(a, G);
                }
                function G() {
                    function D(c, R, j) {
                        if (J()) return Reflect.construct.apply(null, arguments);
                        var B = [null];
                        B.push.apply(B, R);
                        var z = new (c.bind.apply(c, B))();
                        return j && (0, N.A)(z, j.prototype), z;
                    }
                    return D(a, arguments, u(this).constructor);
                }
                G.prototype = Object.create(a.prototype, {
                    constructor: {
                        value: G,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                return N.A(G, a);
            };
            return A(v);
        }
    },
    0x13ed5: (m, H, O) => {
        'use strict';
        O.d(H, { vt: () => z });
        const N = q => {
            let b;
            const L = new Set();
            const y = (T, E) => {
                const d = 'function' == typeof T ? T(b) : T;
                if (!Object.is(d, b)) {
                    const D = b;
                    b = (null != E ? E : 'object' != typeof d || null === d) ? d : Object.assign({}, b, d), L.forEach(K => K(b, D));
                }
            };
            const h = (() => b);
            const X = {
                setState: y, getState: h, getInitialState: () => C, subscribe: T => (L.add(T), () => L.delete(T)), destroy: () => {
                    console.warn('[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.'), L.clear();
                }
            };
            b = q(y, h, X);
            const C = b;
            return X;
        }, J = q => q ? N(q) : N;
        var A = O(0x1791c), v = O(0x10e7a);
        const { useDebugValue: F } = A, { useSyncExternalStoreWithSelector: G } = v;
        let R = false;
        const j = q => q, B = q => {
            'function' != typeof q && console.warn('[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from \x27zustand\x27`.');
            const b = 'function' == typeof q ? J(q) : q, L = (y, h) => function (X, C = j, T) {
                T && !R && (console.warn('[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from \x27zustand/traditional\x27. https://github.com/pmndrs/zustand/discussions/1937'), R = true);
                const E = G(X.subscribe, X.getState, X.getServerState || X.getInitialState, C, T);
                return F(E), E;
            }(b, y, h);
            return Object.assign(L, b), L;
        }, z = q => q ? B(q) : B;
    }, 0x1545e: (m, H, O) => {
        'use strict';
        O.d(H, { Zr: () => J });
        function u(A, v) {
            let F;
            try {
                F = A();
            } catch (a) {
                return;
            } return {
                getItem: G => {
                    var c;
                    const R = B => null === B ? null : JSON.parse(B, null == v ? void 0 : v.reviver), j = null != (c = F.getItem(G)) ? c : null;
                    return j instanceof Promise ? j.then(R) : R(j);
                }, setItem: (G, c) => F.setItem(G, JSON.stringify(c, null == v ? void 0 : v.replacer)), removeItem: G => F.removeItem(G)
            };
        } const N = A => v => {
            try {
                const F = A(v);
                return F instanceof Promise ? F : {
                    then: a => N(a)(F), 'catch'(a) {
                        return this;
                    }
                };
            } catch (a) {
                return {
                    'then'(G) {
                        return this;
                    }, catch: G => N(G)(a)
                };
            }
        }, J = (A, v) => 'getStorage' in v || 'serialize' in v || 'deserialize' in v ? (console.warn('[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead.'), ((F, a) => (G, R, j) => {
            let B = { getStorage: () => localStorage, serialize: JSON.stringify, deserialize: JSON.parse, partialize: w => w, version: 0, merge: (w, Q) => ({ ...Q, ...w }), ...a }, z = false;
            const q = new Set(), b = new Set();
            let L;
            try {
                L = B.getStorage();
            } catch (w) { } if (!L) return F((...Q) => {
                console.warn('[zustand persist middleware] Unable to update item \x27' + B.name + '\x27, the given storage is currently unavailable.'), G(...Q);
            }, R, j);
            const X = N(B.serialize), C = () => {
                const Q = B.partialize({ ...R() });
                let U;
                const M = X({ state: Q, version: B.version }).then(g => L.setItem(B.name, g)).catch(g => {
                    U = g;
                });
                if (U) throw U;
                return M;
            }, T = j.setState;
            j.setState = (Q, U) => {
                T(Q, U), C();
            };
            const E = F((...Q) => {
                G(...Q), C();
            }, R, j);
            let D;
            const K = () => {
                var Q;
                if (!L) return;
                z = false;
                q.forEach(M => M(R()));
                const U = (null == (Q = B.onRehydrateStorage) ? void 0 : Q.call(B, R())) || void 0;
                return N(L.getItem.bind(L))(B.name).then(M => {
                    if (M) return B.deserialize(M);
                }).then(M => {
                    if (M) {
                        if ('number' != typeof M.version || M.version === B.version) return M.state;
                        if (B.migrate) return B.migrate(M.state, M.version);
                        console.error('State loaded from storage couldn\x27t be migrated since no migrate function was provided');
                    }
                }).then(M => {
                    var g;
                    return D = B.merge(M, null != (g = R()) ? g : E), G(D, true), C();
                }).then(() => {
                    null == U || U(D, void 0), z = true, b.forEach(M => M(D));
                }).catch(M => {
                    null == U || U(void 0, M);
                });
            };
            return j.persist = {
                setOptions: Q => {
                    B = { ...B, ...Q }, Q.getStorage && (L = Q.getStorage());
                }, clearStorage: () => {
                    null == L || L.removeItem(B.name);
                }, getOptions: () => B, rehydrate: () => K(), hasHydrated: () => z, onHydrate: Q => (q.add(Q), () => {
                    q.delete(Q);
                }), onFinishHydration: Q => (b.add(Q), () => {
                    b.delete(Q);
                })
            }, K(), D || E;
        })(A, v)) : ((F, a) => (G, R, j) => {
            let B = { storage: u(() => localStorage), partialize: K => K, version: 0, merge: (K, w) => ({ ...w, ...K }), ...a }, z = false;
            const q = new Set(), b = new Set();
            let L = B.storage;
            if (!L) return F((...K) => {
                console.warn('[zustand persist middleware] Unable to update item \x27' + B.name + '\x27, the given storage is currently unavailable.'), G(...K);
            }, R, j);
            const X = () => {
                const K = B.partialize({ ...R() });
                return L.setItem(B.name, { state: K, version: B.version });
            };
            const C = j.setState;
            j.setState = (K, w) => {
                C(K, w), X();
            };
            const T = F((...K) => {
                G(...K), X();
            }, R, j);
            let E;
            j.getInitialState = () => T;
            const D = () => {
                var K, w;
                if (!L) return;
                z = false;
                q.forEach(U => {
                    var M;
                    return U(null != (M = R()) ? M : T);
                });
                const Q = (null == (w = B.onRehydrateStorage) ? void 0 : w.call(B, null != (K = R()) ? K : T)) || void 0;
                return N(L.getItem.bind(L))(B.name).then(U => {
                    if (U) {
                        if ('number' != typeof U.version || U.version === B.version) return U.state;
                        if (B.migrate) return B.migrate(U.state, U.version);
                        console.error('State loaded from storage couldn\x27t be migrated since no migrate function was provided');
                    }
                }).then(U => {
                    var M;
                    return E = B.merge(U, null != (M = R()) ? M : T), G(E, true), X();
                }).then(() => {
                    null == Q || Q(E, void 0), E = R(), z = true, b.forEach(U => U(E));
                }).catch(U => {
                    null == Q || Q(void 0, U);
                });
            };
            j.persist = {
                setOptions: K => {
                    B = { ...B, ...K }, K.storage && (L = K.storage);
                }, clearStorage: () => {
                    null == L || L.removeItem(B.name);
                }, getOptions: () => B, rehydrate: () => D(), hasHydrated: () => z, onHydrate: K => (q.add(K), () => {
                    q.delete(K);
                }), onFinishHydration: K => (b.add(K), () => {
                    b.delete(K);
                })
            };
            B.skipHydration || D();
            return (E || T);
        })(A, v);
    }
}]);