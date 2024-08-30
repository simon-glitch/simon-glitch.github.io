
'use strict';
(self['webpackChunkcuberealm_client'] = self['webpackChunkcuberealm_client'] || [])['push']([[0x12d], {
    0xbd44: (r, F, E) => {
        E(0x7530),
        E(0xbd95);
    }
    ,
    0xe70: (F, E, p) => {
        p['d'](E, {
            'U': () => Q
        });
        var S = p(0x172d2)
          , R = p(0x3696)
          , H = p(0x17b5d)
          , y = p(0x12e4b)
          , d = function(B) {
            function M(X, m, w, C) {
                return B['call'](this, X, m, w, C) || this;
            }
            return (0x0,
            y['A'])(M, B),
            M['prototype']['interpolate_'] = function(X) {
                return this['copySampleValue_'](X - 0x1);
            }
            ,
            M;
        }(p(0x28f4)['l'])
          , P = p(0x11c87)
          , Q = (function() {
            function B(X, m, w, C) {
                if (void 0x0 === X)
                    throw new Error('THREE.KeyframeTrack:\x20track\x20name\x20is\x20undefined');
                if (void 0x0 === m || 0x0 === m['length'])
                    throw new Error('THREE.KeyframeTrack:\x20no\x20keyframes\x20in\x20track\x20named\x20' + X);
                this['name'] = X,
                this['times'] = P['r1'](m, this['TimeBufferType']),
                this['values'] = P['r1'](w, this['ValueBufferType']),
                this['setInterpolation'](C || this['DefaultInterpolation']);
            }
            B['toJSON'] = function(X) {
                var m, w = X['constructor'];
                if (w['toJSON'] !== this['toJSON'])
                    m = w['toJSON'](X);
                else {
                    m = {
                        'name': X['name'],
                        'times': P['r1'](X['times'], Array),
                        'values': P['r1'](X['values'], Array)
                    };
                    var C = X['getInterpolation']();
                    C !== X['DefaultInterpolation'] && (m['interpolation'] = C);
                }
                return m['type'] = X['ValueTypeName'],
                m;
            }
            ;
            var M = B['prototype'];
            return M['InterpolantFactoryMethodDiscrete'] = function(X) {
                return new d(this['times'],this['values'],this['getValueSize'](),X);
            }
            ,
            M['InterpolantFactoryMethodLinear'] = function(X) {
                return new H['e'](this['times'],this['values'],this['getValueSize'](),X);
            }
            ,
            M['InterpolantFactoryMethodSmooth'] = function(X) {
                return new R['P'](this['times'],this['values'],this['getValueSize'](),X);
            }
            ,
            M['setInterpolation'] = function(X) {
                var m;
                switch (X) {
                case S['ljd']:
                    m = this['InterpolantFactoryMethodDiscrete'];
                    break;
                case S['PJ3']:
                    m = this['InterpolantFactoryMethodLinear'];
                    break;
                case S['EQC']:
                    m = this['InterpolantFactoryMethodSmooth'];
                }
                if (void 0x0 === m) {
                    var w = 'unsupported\x20interpolation\x20for\x20' + this['ValueTypeName'] + '\x20keyframe\x20track\x20named\x20' + this['name'];
                    if (void 0x0 === this['createInterpolant']) {
                        if (X === this['DefaultInterpolation'])
                            throw new Error(w);
                        this['setInterpolation'](this['DefaultInterpolation']);
                    }
                    return console['warn']('THREE.KeyframeTrack:', w),
                    this;
                }
                return this['createInterpolant'] = m,
                this;
            }
            ,
            M['getInterpolation'] = function() {
                switch (this['createInterpolant']) {
                case this['InterpolantFactoryMethodDiscrete']:
                    return S['ljd'];
                case this['InterpolantFactoryMethodLinear']:
                    return S['PJ3'];
                case this['InterpolantFactoryMethodSmooth']:
                    return S['EQC'];
                }
            }
            ,
            M['getValueSize'] = function() {
                return this['values']['length'] / this['times']['length'];
            }
            ,
            M['shift'] = function(X) {
                if (0x0 !== X) {
                    for (var m = this['times'], w = 0x0, C = m['length']; w !== C; ++w)
                        m[w] += X;
                }
                return this;
            }
            ,
            M['scale'] = function(X) {
                if (0x1 !== X) {
                    for (var m = this['times'], w = 0x0, C = m['length']; w !== C; ++w)
                        m[w] *= X;
                }
                return this;
            }
            ,
            M['trim'] = function(X, m) {
                for (var w = this['times'], C = w['length'], N = 0x0, Z = C - 0x1; N !== C && w[N] < X; )
                    ++N;
                for (; -0x1 !== Z && w[Z] > m; )
                    --Z;
                if (++Z,
                0x0 !== N || Z !== C) {
                    N >= Z && (N = (Z = Math['max'](Z, 0x1)) - 0x1);
                    var h = this['getValueSize']();
                    this['times'] = w['slice'](N, Z),
                    this['values'] = this['values']['slice'](N * h, Z * h);
                }
                return this;
            }
            ,
            M['validate'] = function() {
                var X = !0x0
                  , m = this['getValueSize']();
                m - Math['floor'](m) != 0x0 && (console['error']('THREE.KeyframeTrack:\x20Invalid\x20value\x20size\x20in\x20track.', this),
                X = !0x1);
                var w = this['times']
                  , C = this['values']
                  , N = w['length'];
                0x0 === N && (console['error']('THREE.KeyframeTrack:\x20Track\x20is\x20empty.', this),
                X = !0x1);
                for (var Z = null, U = 0x0; U !== N; U++) {
                    var T = w[U];
                    if ('number' == typeof T && isNaN(T)) {
                        console['error']('THREE.KeyframeTrack:\x20Time\x20is\x20not\x20a\x20valid\x20number.', this, U, T),
                        X = !0x1;
                        break;
                    }
                    if (null !== Z && Z > T) {
                        console['error']('THREE.KeyframeTrack:\x20Out\x20of\x20order\x20keys.', this, U, T, Z),
                        X = !0x1;
                        break;
                    }
                    Z = T;
                }
                if (void 0x0 !== C && P['iu'](C))
                    for (var V = 0x0, G = C['length']; V !== G; ++V) {
                        var k = C[V];
                        if (isNaN(k)) {
                            console['error']('THREE.KeyframeTrack:\x20Value\x20is\x20not\x20a\x20valid\x20number.', this, V, k),
                            X = !0x1;
                            break;
                        }
                    }
                return X;
            }
            ,
            M['optimize'] = function() {
                for (var X = this['times']['slice'](), w = this['values']['slice'](), C = this['getValueSize'](), N = this['getInterpolation']() === S['EQC'], Z = X['length'] - 0x1, U = 0x1, T = 0x1; T < Z; ++T) {
                    var V = !0x1
                      , G = X[T];
                    if (G !== X[T + 0x1] && (0x1 !== T || G !== X[0x0])) {
                        if (N)
                            V = !0x0;
                        else
                            for (var k = T * C, W = k - C, I = k + C, L = 0x0; L !== C; ++L) {
                                var q = w[k + L];
                                if (q !== w[W + L] || q !== w[I + L]) {
                                    V = !0x0;
                                    break;
                                }
                            }
                    }
                    if (V) {
                        if (T !== U) {
                            X[U] = X[T];
                            for (var K = T * C, Y = U * C, z = 0x0; z !== C; ++z)
                                w[Y + z] = w[K + z];
                        }
                        ++U;
                    }
                }
                if (Z > 0x0) {
                    X[U] = X[Z];
                    for (var A = Z * C, j = U * C, O = 0x0; O !== C; ++O)
                        w[j + O] = w[A + O];
                    ++U;
                }
                return U !== X['length'] ? (this['times'] = X['slice'](0x0, U),
                this['values'] = w['slice'](0x0, U * C)) : (this['times'] = X,
                this['values'] = w),
                this;
            }
            ,
            M['clone'] = function() {
                var X = this['times']['slice']()
                  , m = this['values']['slice']()
                  , w = new (0x0,
                this['constructor'])(this['name'],X,m);
                return w['createInterpolant'] = this['createInterpolant'],
                w;
            }
            ,
            B;
        }());
        Q['prototype']['TimeBufferType'] = Float32Array,
        Q['prototype']['ValueBufferType'] = Float32Array,
        Q['prototype']['DefaultInterpolation'] = S['PJ3'];
    }
    ,
    0x152de: (F, E, p) => {
        p['d'](E, {
            'n': () => R
        });
        var S = p(0x12e4b)
          , R = function(H) {
            function y(d) {
                var P;
                return void 0x0 === d && (d = []),
                (P = H['call'](this) || this)['isArrayCamera'] = !0x0,
                P['cameras'] = d,
                P;
            }
            return (0x0,
            S['A'])(y, H),
            y;
        }(p(0x152d9)['u']);
    }
    ,
    0xab79: (F, E, p) => {
        p['d'](E, {
            'i': () => y
        });
        var S = p(0x12e4b)
          , R = p(0x172d2)
          , H = p(0x11ded)
          , y = function(d) {
            function P() {
                var B;
                return (B = d['call'](this) || this)['isCamera'] = !0x0,
                B['type'] = 'Camera',
                B['matrixWorldInverse'] = new H['k'](),
                B['projectionMatrix'] = new H['k'](),
                B['projectionMatrixInverse'] = new H['k'](),
                B['coordinateSystem'] = R['TdN'],
                B;
            }
            (0x0,
            S['A'])(P, d);
            var Q = P['prototype'];
            return Q['copy'] = function(B, M) {
                return d['prototype']['copy']['call'](this, B, M),
                this['matrixWorldInverse']['copy'](B['matrixWorldInverse']),
                this['projectionMatrix']['copy'](B['projectionMatrix']),
                this['projectionMatrixInverse']['copy'](B['projectionMatrixInverse']),
                this['coordinateSystem'] = B['coordinateSystem'],
                this;
            }
            ,
            Q['getWorldDirection'] = function(B) {
                return d['prototype']['getWorldDirection']['call'](this, B)['negate']();
            }
            ,
            Q['updateMatrixWorld'] = function(B) {
                d['prototype']['updateMatrixWorld']['call'](this, B),
                this['matrixWorldInverse']['copy'](this['matrixWorld'])['invert']();
            }
            ,
            Q['updateWorldMatrix'] = function(B, M) {
                d['prototype']['updateWorldMatrix']['call'](this, B, M),
                this['matrixWorldInverse']['copy'](this['matrixWorld'])['invert']();
            }
            ,
            Q['clone'] = function() {
                return new this['constructor']()['copy'](this);
            }
            ,
            P;
        }(p(0x16f53)['B']);
    }
    ,
    0x306c: (F, E, p) => {
        p['d'](E, {
            'F': () => B
        });
        var S = p(0x12e4b)
          , R = p(0x172d2)
          , H = p(0x16f53)
          , y = p(0x152d9);
        function d(M, X) {
            var m = 'undefined' != typeof Symbol && M[Symbol['iterator']] || M['@@iterator'];
            if (m)
                return (m = m['call'](M))['next']['bind'](m);
            if (Array['isArray'](M) || (m = function(C, N) {
                if (!C)
                    return;
                if ('string' == typeof C)
                    return P(C, N);
                var Z = Object['prototype']['toString']['call'](C)['slice'](0x8, -0x1);
                'Object' === Z && C['constructor'] && (Z = C['constructor']['name']);
                if ('Map' === Z || 'Set' === Z)
                    return Array['from'](C);
                if ('Arguments' === Z || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/['test'](Z))
                    return P(C, N);
            }(M)) || X && M && 'number' == typeof M['length']) {
                m && (M = m);
                var w = 0x0;
                return function() {
                    return w >= M['length'] ? {
                        'done': !0x0
                    } : {
                        'done': !0x1,
                        'value': M[w++]
                    };
                }
                ;
            }
            throw new TypeError('Invalid\x20attempt\x20to\x20iterate\x20non-iterable\x20instance.\x0aIn\x20order\x20to\x20be\x20iterable,\x20non-array\x20objects\x20must\x20have\x20a\x20[Symbol.iterator]()\x20method.');
        }
        function P(M, X) {
            (null == X || X > M['length']) && (X = M['length']);
            for (var m = 0x0, w = new Array(X); m < X; m++)
                w[m] = M[m];
            return w;
        }
        var Q = -0x5a
          , B = function(M) {
            function X(w, C, N) {
                var Z;
                (Z = M['call'](this) || this)['type'] = 'CubeCamera',
                Z['renderTarget'] = N,
                Z['coordinateSystem'] = null,
                Z['activeMipmapLevel'] = 0x0;
                var U = new y['u'](Q,0x1,w,C);
                U['layers'] = Z['layers'],
                Z['add'](U);
                var T = new y['u'](Q,0x1,w,C);
                T['layers'] = Z['layers'],
                Z['add'](T);
                var V = new y['u'](Q,0x1,w,C);
                V['layers'] = Z['layers'],
                Z['add'](V);
                var G = new y['u'](Q,0x1,w,C);
                G['layers'] = Z['layers'],
                Z['add'](G);
                var k = new y['u'](Q,0x1,w,C);
                k['layers'] = Z['layers'],
                Z['add'](k);
                var W = new y['u'](Q,0x1,w,C);
                return W['layers'] = Z['layers'],
                Z['add'](W),
                Z;
            }
            (0x0,
            S['A'])(X, M);
            var m = X['prototype'];
            return m['updateCoordinateSystem'] = function() {
                for (var w, C = this['coordinateSystem'], N = this['children']['concat'](), Z = N[0x0], U = N[0x1], T = N[0x2], V = N[0x3], G = N[0x4], k = N[0x5], W = d(N); !(w = W())['done']; ) {
                    var x = w['value'];
                    this['remove'](x);
                }
                if (C === R['TdN'])
                    Z['up']['set'](0x0, 0x1, 0x0),
                    Z['lookAt'](0x1, 0x0, 0x0),
                    U['up']['set'](0x0, 0x1, 0x0),
                    U['lookAt'](-0x1, 0x0, 0x0),
                    T['up']['set'](0x0, 0x0, -0x1),
                    T['lookAt'](0x0, 0x1, 0x0),
                    V['up']['set'](0x0, 0x0, 0x1),
                    V['lookAt'](0x0, -0x1, 0x0),
                    G['up']['set'](0x0, 0x1, 0x0),
                    G['lookAt'](0x0, 0x0, 0x1),
                    k['up']['set'](0x0, 0x1, 0x0),
                    k['lookAt'](0x0, 0x0, -0x1);
                else {
                    if (C !== R['i7u'])
                        throw new Error('THREE.CubeCamera.updateCoordinateSystem():\x20Invalid\x20coordinate\x20system:\x20' + C);
                    Z['up']['set'](0x0, -0x1, 0x0),
                    Z['lookAt'](-0x1, 0x0, 0x0),
                    U['up']['set'](0x0, -0x1, 0x0),
                    U['lookAt'](0x1, 0x0, 0x0),
                    T['up']['set'](0x0, 0x0, 0x1),
                    T['lookAt'](0x0, 0x1, 0x0),
                    V['up']['set'](0x0, 0x0, -0x1),
                    V['lookAt'](0x0, -0x1, 0x0),
                    G['up']['set'](0x0, -0x1, 0x0),
                    G['lookAt'](0x0, 0x0, 0x1),
                    k['up']['set'](0x0, -0x1, 0x0),
                    k['lookAt'](0x0, 0x0, -0x1);
                }
                for (var I, g = d(N); !(I = g())['done']; ) {
                    var L = I['value'];
                    this['add'](L),
                    L['updateMatrixWorld']();
                }
            }
            ,
            m['update'] = function(w, C) {
                null === this['parent'] && this['updateMatrixWorld']();
                var N = this['renderTarget']
                  , Z = this['activeMipmapLevel'];
                this['coordinateSystem'] !== w['coordinateSystem'] && (this['coordinateSystem'] = w['coordinateSystem'],
                this['updateCoordinateSystem']());
                var U = this['children']
                  , T = U[0x0]
                  , V = U[0x1]
                  , G = U[0x2]
                  , k = U[0x3]
                  , W = U[0x4]
                  , x = U[0x5]
                  , I = w['getRenderTarget']()
                  , g = w['getActiveCubeFace']()
                  , L = w['getActiveMipmapLevel']()
                  , q = w['xr']['enabled'];
                w['xr']['enabled'] = !0x1;
                var K = N['texture']['generateMipmaps'];
                N['texture']['generateMipmaps'] = !0x1,
                w['setRenderTarget'](N, 0x0, Z),
                w['render'](C, T),
                w['setRenderTarget'](N, 0x1, Z),
                w['render'](C, V),
                w['setRenderTarget'](N, 0x2, Z),
                w['render'](C, G),
                w['setRenderTarget'](N, 0x3, Z),
                w['render'](C, k),
                w['setRenderTarget'](N, 0x4, Z),
                w['render'](C, W),
                N['texture']['generateMipmaps'] = K,
                w['setRenderTarget'](N, 0x5, Z),
                w['render'](C, x),
                w['setRenderTarget'](I, g, L),
                w['xr']['enabled'] = q,
                N['texture']['needsPMREMUpdate'] = !0x0;
            }
            ,
            X;
        }(H['B']);
    }
    ,
    0x17743: (F, E, p) => {
        p['d'](E, {
            'q': () => R
        });
        var S = p(0x12e4b)
          , R = function(H) {
            function y(P, Q, B, M, X, m) {
                var w;
                return void 0x0 === P && (P = -0x1),
                void 0x0 === Q && (Q = 0x1),
                void 0x0 === B && (B = 0x1),
                void 0x0 === M && (M = -0x1),
                void 0x0 === X && (X = 0.1),
                void 0x0 === m && (m = 0x7d0),
                (w = H['call'](this) || this)['isOrthographicCamera'] = !0x0,
                w['type'] = 'OrthographicCamera',
                w['zoom'] = 0x1,
                w['view'] = null,
                w['left'] = P,
                w['right'] = Q,
                w['top'] = B,
                w['bottom'] = M,
                w['near'] = X,
                w['far'] = m,
                w['updateProjectionMatrix'](),
                w;
            }
            (0x0,
            S['A'])(y, H);
            var d = y['prototype'];
            return d['copy'] = function(P, Q) {
                return H['prototype']['copy']['call'](this, P, Q),
                this['left'] = P['left'],
                this['right'] = P['right'],
                this['top'] = P['top'],
                this['bottom'] = P['bottom'],
                this['near'] = P['near'],
                this['far'] = P['far'],
                this['zoom'] = P['zoom'],
                this['view'] = null === P['view'] ? null : Object['assign']({}, P['view']),
                this;
            }
            ,
            d['setViewOffset'] = function(P, Q, B, M, X, m) {
                null === this['view'] && (this['view'] = {
                    'enabled': !0x0,
                    'fullWidth': 0x1,
                    'fullHeight': 0x1,
                    'offsetX': 0x0,
                    'offsetY': 0x0,
                    'width': 0x1,
                    'height': 0x1
                }),
                this['view']['enabled'] = !0x0,
                this['view']['fullWidth'] = P,
                this['view']['fullHeight'] = Q,
                this['view']['offsetX'] = B,
                this['view']['offsetY'] = M,
                this['view']['width'] = X,
                this['view']['height'] = m,
                this['updateProjectionMatrix']();
            }
            ,
            d['clearViewOffset'] = function() {
                null !== this['view'] && (this['view']['enabled'] = !0x1),
                this['updateProjectionMatrix']();
            }
            ,
            d['updateProjectionMatrix'] = function() {
                var P = (this['right'] - this['left']) / (0x2 * this['zoom'])
                  , Q = (this['top'] - this['bottom']) / (0x2 * this['zoom'])
                  , B = (this['right'] + this['left']) / 0x2
                  , M = (this['top'] + this['bottom']) / 0x2
                  , X = B - P
                  , m = B + P
                  , w = M + Q
                  , C = M - Q;
                if (null !== this['view'] && this['view']['enabled']) {
                    var N = (this['right'] - this['left']) / this['view']['fullWidth'] / this['zoom']
                      , Z = (this['top'] - this['bottom']) / this['view']['fullHeight'] / this['zoom'];
                    m = (X += N * this['view']['offsetX']) + N * this['view']['width'],
                    C = (w -= Z * this['view']['offsetY']) - Z * this['view']['height'];
                }
                this['projectionMatrix']['makeOrthographic'](X, m, w, C, this['near'], this['far'], this['coordinateSystem']),
                this['projectionMatrixInverse']['copy'](this['projectionMatrix'])['invert']();
            }
            ,
            d['toJSON'] = function(P) {
                var Q = H['prototype']['toJSON']['call'](this, P);
                return Q['object']['zoom'] = this['zoom'],
                Q['object']['left'] = this['left'],
                Q['object']['right'] = this['right'],
                Q['object']['top'] = this['top'],
                Q['object']['bottom'] = this['bottom'],
                Q['object']['near'] = this['near'],
                Q['object']['far'] = this['far'],
                null !== this['view'] && (Q['object']['view'] = Object['assign']({}, this['view'])),
                Q;
            }
            ,
            y;
        }(p(0xab79)['i']);
    }
    ,
    0x152d9: (F, E, p) => {
        p['d'](E, {
            'u': () => y
        });
        var S = p(0x12e4b)
          , R = p(0xab79)
          , H = p(0xbd95)
          , y = function(d) {
            function P(B, M, X, m) {
                var w;
                return void 0x0 === B && (B = 0x32),
                void 0x0 === M && (M = 0x1),
                void 0x0 === X && (X = 0.1),
                void 0x0 === m && (m = 0x7d0),
                (w = d['call'](this) || this)['isPerspectiveCamera'] = !0x0,
                w['type'] = 'PerspectiveCamera',
                w['fov'] = B,
                w['zoom'] = 0x1,
                w['near'] = X,
                w['far'] = m,
                w['focus'] = 0xa,
                w['aspect'] = M,
                w['view'] = null,
                w['filmGauge'] = 0x23,
                w['filmOffset'] = 0x0,
                w['updateProjectionMatrix'](),
                w;
            }
            (0x0,
            S['A'])(P, d);
            var Q = P['prototype'];
            return Q['copy'] = function(B, M) {
                return d['prototype']['copy']['call'](this, B, M),
                this['fov'] = B['fov'],
                this['zoom'] = B['zoom'],
                this['near'] = B['near'],
                this['far'] = B['far'],
                this['focus'] = B['focus'],
                this['aspect'] = B['aspect'],
                this['view'] = null === B['view'] ? null : Object['assign']({}, B['view']),
                this['filmGauge'] = B['filmGauge'],
                this['filmOffset'] = B['filmOffset'],
                this;
            }
            ,
            Q['setFocalLength'] = function(B) {
                var M = 0.5 * this['getFilmHeight']() / B;
                this['fov'] = 0x2 * H['a5'] * Math['atan'](M),
                this['updateProjectionMatrix']();
            }
            ,
            Q['getFocalLength'] = function() {
                var B = Math['tan'](0.5 * H['up'] * this['fov']);
                return 0.5 * this['getFilmHeight']() / B;
            }
            ,
            Q['getEffectiveFOV'] = function() {
                return 0x2 * H['a5'] * Math['atan'](Math['tan'](0.5 * H['up'] * this['fov']) / this['zoom']);
            }
            ,
            Q['getFilmWidth'] = function() {
                return this['filmGauge'] * Math['min'](this['aspect'], 0x1);
            }
            ,
            Q['getFilmHeight'] = function() {
                return this['filmGauge'] / Math['max'](this['aspect'], 0x1);
            }
            ,
            Q['setViewOffset'] = function(B, M, X, m, w, l) {
                this['aspect'] = B / M,
                null === this['view'] && (this['view'] = {
                    'enabled': !0x0,
                    'fullWidth': 0x1,
                    'fullHeight': 0x1,
                    'offsetX': 0x0,
                    'offsetY': 0x0,
                    'width': 0x1,
                    'height': 0x1
                }),
                this['view']['enabled'] = !0x0,
                this['view']['fullWidth'] = B,
                this['view']['fullHeight'] = M,
                this['view']['offsetX'] = X,
                this['view']['offsetY'] = m,
                this['view']['width'] = w,
                this['view']['height'] = l,
                this['updateProjectionMatrix']();
            }
            ,
            Q['clearViewOffset'] = function() {
                null !== this['view'] && (this['view']['enabled'] = !0x1),
                this['updateProjectionMatrix']();
            }
            ,
            Q['updateProjectionMatrix'] = function() {
                var B = this['near']
                  , M = B * Math['tan'](0.5 * H['up'] * this['fov']) / this['zoom']
                  , X = 0x2 * M
                  , m = this['aspect'] * X
                  , w = -0.5 * m
                  , C = this['view'];
                if (null !== this['view'] && this['view']['enabled']) {
                    var N = C['fullWidth']
                      , Z = C['fullHeight'];
                    w += C['offsetX'] * m / N,
                    M -= C['offsetY'] * X / Z,
                    m *= C['width'] / N,
                    X *= C['height'] / Z;
                }
                var h = this['filmOffset'];
                0x0 !== h && (w += B * h / this['getFilmWidth']()),
                this['projectionMatrix']['makePerspective'](w, w + m, M, M - X, B, this['far'], this['coordinateSystem']),
                this['projectionMatrixInverse']['copy'](this['projectionMatrix'])['invert']();
            }
            ,
            Q['toJSON'] = function(B) {
                var M = d['prototype']['toJSON']['call'](this, B);
                return M['object']['fov'] = this['fov'],
                M['object']['zoom'] = this['zoom'],
                M['object']['near'] = this['near'],
                M['object']['far'] = this['far'],
                M['object']['focus'] = this['focus'],
                M['object']['aspect'] = this['aspect'],
                null !== this['view'] && (M['object']['view'] = Object['assign']({}, this['view'])),
                M['object']['filmGauge'] = this['filmGauge'],
                M['object']['filmOffset'] = this['filmOffset'],
                M;
            }
            ,
            P;
        }(R['i']);
    }
    ,
    0x20d1: (r, F, E) => {
        E(0x11ded),
        E(0xbd95),
        E(0x152d9);
    }
    ,
    0x16835: (F, E, R) => {
        R['d'](E, {
            'L': () => Y
        });
        var H = R(0x12e4b)
          , P = R(0x1008e)
          , Q = R(0x1264d)
          , B = R(0x7002)
          , X = R(0x161ea)
          , w = R(0x17dfd)
          , C = R(0x79b5)
          , N = R(0x16f53)
          , Z = R(0x11ded)
          , U = R(0x3e78)
          , T = R(0xbd95)
          , V = R(0x1078a)
          , G = 0x0
          , k = new Z['k']()
          , W = new N['B']()
          , I = new P['P']()
          , L = new B['N']()
          , q = new B['N']()
          , K = new P['P']()
          , Y = function(z) {
            function A() {
                var O;
                return (O = z['call'](this) || this)['isBufferGeometry'] = !0x0,
                Object['defineProperty'](O, 'id', {
                    'value': G++
                }),
                O['uuid'] = T['lk'](),
                O['name'] = '',
                O['type'] = 'BufferGeometry',
                O['index'] = null,
                O['attributes'] = {},
                O['morphAttributes'] = {},
                O['morphTargetsRelative'] = !0x1,
                O['groups'] = [],
                O['boundingBox'] = null,
                O['boundingSphere'] = null,
                O['drawRange'] = {
                    'start': 0x0,
                    'count': 0x1 / 0x0
                },
                O['userData'] = {},
                O;
            }
            (0x0,
            H['A'])(A, z);
            var j = A['prototype'];
            return j['getIndex'] = function() {
                return this['index'];
            }
            ,
            j['setIndex'] = function(O) {
                return Array['isArray'](O) ? this['index'] = new (((0x0,
                V['AQ'])(O)) ? w['MW'] : w['A$'])(O,0x1) : this['index'] = O,
                this;
            }
            ,
            j['getAttribute'] = function(O) {
                return this['attributes'][O];
            }
            ,
            j['setAttribute'] = function(O, J) {
                return this['attributes'][O] = J,
                this;
            }
            ,
            j['deleteAttribute'] = function(O) {
                return delete this['attributes'][O],
                this;
            }
            ,
            j['hasAttribute'] = function(O) {
                return void 0x0 !== this['attributes'][O];
            }
            ,
            j['addGroup'] = function(O, J, b) {
                void 0x0 === b && (b = 0x0),
                this['groups']['push']({
                    'start': O,
                    'count': J,
                    'materialIndex': b
                });
            }
            ,
            j['clearGroups'] = function() {
                this['groups'] = [];
            }
            ,
            j['setDrawRange'] = function(O, J) {
                this['drawRange']['start'] = O,
                this['drawRange']['count'] = J;
            }
            ,
            j['applyMatrix4'] = function(O) {
                var J = this['attributes']['position'];
                void 0x0 !== J && (J['applyMatrix4'](O),
                J['needsUpdate'] = !0x0);
                var b = this['attributes']['normal'];
                if (void 0x0 !== b) {
                    var D = new U['d']()['getNormalMatrix'](O);
                    b['applyNormalMatrix'](D),
                    b['needsUpdate'] = !0x0;
                }
                var r0 = this['attributes']['tangent'];
                return void 0x0 !== r0 && (r0['transformDirection'](O),
                r0['needsUpdate'] = !0x0),
                null !== this['boundingBox'] && this['computeBoundingBox'](),
                null !== this['boundingSphere'] && this['computeBoundingSphere'](),
                this;
            }
            ,
            j['applyQuaternion'] = function(O) {
                return k['makeRotationFromQuaternion'](O),
                this['applyMatrix4'](k),
                this;
            }
            ,
            j['rotateX'] = function(O) {
                return k['makeRotationX'](O),
                this['applyMatrix4'](k),
                this;
            }
            ,
            j['rotateY'] = function(O) {
                return k['makeRotationY'](O),
                this['applyMatrix4'](k),
                this;
            }
            ,
            j['rotateZ'] = function(O) {
                return k['makeRotationZ'](O),
                this['applyMatrix4'](k),
                this;
            }
            ,
            j['translate'] = function(O, J, b) {
                return k['makeTranslation'](O, J, b),
                this['applyMatrix4'](k),
                this;
            }
            ,
            j['scale'] = function(O, J, b) {
                return k['makeScale'](O, J, b),
                this['applyMatrix4'](k),
                this;
            }
            ,
            j['lookAt'] = function(O) {
                return W['lookAt'](O),
                W['updateMatrix'](),
                this['applyMatrix4'](W['matrix']),
                this;
            }
            ,
            j['center'] = function() {
                return this['computeBoundingBox'](),
                this['boundingBox']['getCenter'](I)['negate'](),
                this['translate'](I['x'], I['y'], I['z']),
                this;
            }
            ,
            j['setFromPoints'] = function(O) {
                for (var J = [], b = 0x0, D = O['length']; b < D; b++) {
                    var r0 = O[b];
                    J['push'](r0['x'], r0['y'], r0['z'] || 0x0);
                }
                return this['setAttribute']('position', new w['qt'](J,0x3)),
                this;
            }
            ,
            j['computeBoundingBox'] = function() {
                null === this['boundingBox'] && (this['boundingBox'] = new B['N']());
                var O = this['attributes']['position']
                  , J = this['morphAttributes']['position'];
                if (O && O['isGLBufferAttribute'])
                    return console['error']('THREE.BufferGeometry.computeBoundingBox():\x20GLBufferAttribute\x20requires\x20a\x20manual\x20bounding\x20box.\x20Alternatively\x20set\x20\x22mesh.frustumCulled\x22\x20to\x20\x22false\x22.', this),
                    void this['boundingBox']['set'](new P['P'](-0x1 / 0x0,-0x1 / 0x0,-0x1 / 0x0), new P['P'](0x1 / 0x0,0x1 / 0x0,0x1 / 0x0));
                if (void 0x0 !== O) {
                    if (this['boundingBox']['setFromBufferAttribute'](O),
                    J)
                        for (var b = 0x0, D = J['length']; b < D; b++) {
                            var r0 = J[b];
                            L['setFromBufferAttribute'](r0),
                            this['morphTargetsRelative'] ? (K['addVectors'](this['boundingBox']['min'], L['min']),
                            this['boundingBox']['expandByPoint'](K),
                            K['addVectors'](this['boundingBox']['max'], L['max']),
                            this['boundingBox']['expandByPoint'](K)) : (this['boundingBox']['expandByPoint'](L['min']),
                            this['boundingBox']['expandByPoint'](L['max']));
                        }
                } else
                    this['boundingBox']['makeEmpty']();
                (isNaN(this['boundingBox']['min']['x']) || isNaN(this['boundingBox']['min']['y']) || isNaN(this['boundingBox']['min']['z'])) && console['error']('THREE.BufferGeometry.computeBoundingBox():\x20Computed\x20min/max\x20have\x20NaN\x20values.\x20The\x20\x22position\x22\x20attribute\x20is\x20likely\x20to\x20have\x20NaN\x20values.', this);
            }
            ,
            j['computeBoundingSphere'] = function() {
                null === this['boundingSphere'] && (this['boundingSphere'] = new C['i']());
                var O = this['attributes']['position']
                  , J = this['morphAttributes']['position'];
                if (O && O['isGLBufferAttribute'])
                    return console['error']('THREE.BufferGeometry.computeBoundingSphere():\x20GLBufferAttribute\x20requires\x20a\x20manual\x20bounding\x20sphere.\x20Alternatively\x20set\x20\x22mesh.frustumCulled\x22\x20to\x20\x22false\x22.', this),
                    void this['boundingSphere']['set'](new P['P'](), 0x1 / 0x0);
                if (O) {
                    var b = this['boundingSphere']['center'];
                    if (L['setFromBufferAttribute'](O),
                    J)
                        for (var D = 0x0, r0 = J['length']; D < r0; D++) {
                            var r1 = J[D];
                            q['setFromBufferAttribute'](r1),
                            this['morphTargetsRelative'] ? (K['addVectors'](L['min'], q['min']),
                            L['expandByPoint'](K),
                            K['addVectors'](L['max'], q['max']),
                            L['expandByPoint'](K)) : (L['expandByPoint'](q['min']),
                            L['expandByPoint'](q['max']));
                        }
                    L['getCenter'](b);
                    for (var r2 = 0x0, r3 = 0x0, r4 = O['count']; r3 < r4; r3++)
                        K['fromBufferAttribute'](O, r3),
                        r2 = Math['max'](r2, b['distanceToSquared'](K));
                    if (J) {
                        for (var r5 = 0x0, r6 = J['length']; r5 < r6; r5++)
                            for (var r7 = J[r5], r8 = this['morphTargetsRelative'], r9 = 0x0, rr = r7['count']; r9 < rr; r9++)
                                K['fromBufferAttribute'](r7, r9),
                                r8 && (I['fromBufferAttribute'](O, r9),
                                K['add'](I)),
                                r2 = Math['max'](r2, b['distanceToSquared'](K));
                    }
                    this['boundingSphere']['radius'] = Math['sqrt'](r2),
                    isNaN(this['boundingSphere']['radius']) && console['error']('THREE.BufferGeometry.computeBoundingSphere():\x20Computed\x20radius\x20is\x20NaN.\x20The\x20\x22position\x22\x20attribute\x20is\x20likely\x20to\x20have\x20NaN\x20values.', this);
                }
            }
            ,
            j['computeTangents'] = function() {
                var J = this['index']
                  , r0 = this['attributes'];
                if (null !== J && void 0x0 !== r0['position'] && void 0x0 !== r0['normal'] && void 0x0 !== r0['uv']) {
                    var r1 = J['array']
                      , r2 = r0['position']['array']
                      , r3 = r0['normal']['array']
                      , r4 = r0['uv']['array']
                      , r5 = r2['length'] / 0x3;
                    !0x1 === this['hasAttribute']('tangent') && this['setAttribute']('tangent', new w['TH'](new Float32Array(0x4 * r5),0x4));
                    for (var r6 = this['getAttribute']('tangent')['array'], r7 = [], r8 = [], r9 = 0x0; r9 < r5; r9++)
                        r7[r9] = new P['P'](),
                        r8[r9] = new P['P']();
                    var rr = new P['P']()
                      , rF = new P['P']()
                      , rE = new P['P']()
                      , rp = new Q['I']()
                      , rS = new Q['I']()
                      , re = new Q['I']()
                      , rR = new P['P']()
                      , rH = new P['P']()
                      , ry = this['groups'];
                    0x0 === ry['length'] && (ry = [{
                        'start': 0x0,
                        'count': r1['length']
                    }]);
                    for (var rd = 0x0, rP = ry['length']; rd < rP; ++rd)
                        for (var rQ = ry[rd], rB = rQ['start'], rM = rB, rX = rB + rQ['count']; rM < rX; rM += 0x3)
                            ri(r1[rM + 0x0], r1[rM + 0x1], r1[rM + 0x2]);
                    for (var rt = new P['P'](), rm = new P['P'](), rw = new P['P'](), rl = new P['P'](), rC = 0x0, rN = ry['length']; rC < rN; ++rC)
                        for (var rZ = ry[rC], rh = rZ['start'], ro = rh, rU = rh + rZ['count']; ro < rU; ro += 0x3)
                            rT(r1[ro + 0x0]),
                            rT(r1[ro + 0x1]),
                            rT(r1[ro + 0x2]);
                } else
                    console['error']('THREE.BufferGeometry:\x20.computeTangents()\x20failed.\x20Missing\x20required\x20attributes\x20(index,\x20position,\x20normal\x20or\x20uv)');
                function ri(rV, rs, rG) {
                    rr['fromArray'](r2, 0x3 * rV),
                    rF['fromArray'](r2, 0x3 * rs),
                    rE['fromArray'](r2, 0x3 * rG),
                    rp['fromArray'](r4, 0x2 * rV),
                    rS['fromArray'](r4, 0x2 * rs),
                    re['fromArray'](r4, 0x2 * rG),
                    rF['sub'](rr),
                    rE['sub'](rr),
                    rS['sub'](rp),
                    re['sub'](rp);
                    var rk = 0x1 / (rS['x'] * re['y'] - re['x'] * rS['y']);
                    isFinite(rk) && (rR['copy'](rF)['multiplyScalar'](re['y'])['addScaledVector'](rE, -rS['y'])['multiplyScalar'](rk),
                    rH['copy'](rE)['multiplyScalar'](rS['x'])['addScaledVector'](rF, -re['x'])['multiplyScalar'](rk),
                    r7[rV]['add'](rR),
                    r7[rs]['add'](rR),
                    r7[rG]['add'](rR),
                    r8[rV]['add'](rH),
                    r8[rs]['add'](rH),
                    r8[rG]['add'](rH));
                }
                function rT(rV) {
                    rw['fromArray'](r3, 0x3 * rV),
                    rl['copy'](rw);
                    var rs = r7[rV];
                    rt['copy'](rs),
                    rt['sub'](rw['multiplyScalar'](rw['dot'](rs)))['normalize'](),
                    rm['crossVectors'](rl, rs);
                    var rG = rm['dot'](r8[rV]) < 0x0 ? -0x1 : 0x1;
                    r6[0x4 * rV] = rt['x'],
                    r6[0x4 * rV + 0x1] = rt['y'],
                    r6[0x4 * rV + 0x2] = rt['z'],
                    r6[0x4 * rV + 0x3] = rG;
                }
            }
            ,
            j['computeVertexNormals'] = function() {
                var O = this['index']
                  , J = this['getAttribute']('position');
                if (void 0x0 !== J) {
                    var b = this['getAttribute']('normal');
                    if (void 0x0 === b)
                        b = new w['TH'](new Float32Array(0x3 * J['count']),0x3),
                        this['setAttribute']('normal', b);
                    else {
                        for (var D = 0x0, r0 = b['count']; D < r0; D++)
                            b['setXYZ'](D, 0x0, 0x0, 0x0);
                    }
                    var r1 = new P['P']()
                      , r2 = new P['P']()
                      , r3 = new P['P']()
                      , r4 = new P['P']()
                      , r5 = new P['P']()
                      , r6 = new P['P']()
                      , r7 = new P['P']()
                      , r8 = new P['P']();
                    if (O)
                        for (var r9 = 0x0, rr = O['count']; r9 < rr; r9 += 0x3) {
                            var rF = O['getX'](r9 + 0x0)
                              , rE = O['getX'](r9 + 0x1)
                              , rp = O['getX'](r9 + 0x2);
                            r1['fromBufferAttribute'](J, rF),
                            r2['fromBufferAttribute'](J, rE),
                            r3['fromBufferAttribute'](J, rp),
                            r7['subVectors'](r3, r2),
                            r8['subVectors'](r1, r2),
                            r7['cross'](r8),
                            r4['fromBufferAttribute'](b, rF),
                            r5['fromBufferAttribute'](b, rE),
                            r6['fromBufferAttribute'](b, rp),
                            r4['add'](r7),
                            r5['add'](r7),
                            r6['add'](r7),
                            b['setXYZ'](rF, r4['x'], r4['y'], r4['z']),
                            b['setXYZ'](rE, r5['x'], r5['y'], r5['z']),
                            b['setXYZ'](rp, r6['x'], r6['y'], r6['z']);
                        }
                    else {
                        for (var rS = 0x0, re = J['count']; rS < re; rS += 0x3)
                            r1['fromBufferAttribute'](J, rS + 0x0),
                            r2['fromBufferAttribute'](J, rS + 0x1),
                            r3['fromBufferAttribute'](J, rS + 0x2),
                            r7['subVectors'](r3, r2),
                            r8['subVectors'](r1, r2),
                            r7['cross'](r8),
                            b['setXYZ'](rS + 0x0, r7['x'], r7['y'], r7['z']),
                            b['setXYZ'](rS + 0x1, r7['x'], r7['y'], r7['z']),
                            b['setXYZ'](rS + 0x2, r7['x'], r7['y'], r7['z']);
                    }
                    this['normalizeNormals'](),
                    b['needsUpdate'] = !0x0;
                }
            }
            ,
            j['normalizeNormals'] = function() {
                for (var O = this['attributes']['normal'], J = 0x0, b = O['count']; J < b; J++)
                    K['fromBufferAttribute'](O, J),
                    K['normalize'](),
                    O['setXYZ'](J, K['x'], K['y'], K['z']);
            }
            ,
            j['toNonIndexed'] = function() {
                function O(rp, rS) {
                    for (var re = rp['array'], rR = rp['itemSize'], rH = rp['normalized'], ry = new re['constructor'](rS['length'] * rR), rd = 0x0, rP = 0x0, rQ = 0x0, rB = rS['length']; rQ < rB; rQ++) {
                        rd = rp['isInterleavedBufferAttribute'] ? rS[rQ] * rp['data']['stride'] + rp['offset'] : rS[rQ] * rR;
                        for (var rM = 0x0; rM < rR; rM++)
                            ry[rP++] = re[rd++];
                    }
                    return new w['TH'](ry,rR,rH);
                }
                if (null === this['index'])
                    return console['warn']('THREE.BufferGeometry.toNonIndexed():\x20BufferGeometry\x20is\x20already\x20non-indexed.'),
                    this;
                var J = new A()
                  , b = this['index']['array']
                  , D = this['attributes'];
                for (var r0 in D) {
                    var r1 = O(D[r0], b);
                    J['setAttribute'](r0, r1);
                }
                var r2 = this['morphAttributes'];
                for (var r3 in r2) {
                    for (var r4 = [], r5 = r2[r3], r6 = 0x0, r7 = r5['length']; r6 < r7; r6++) {
                        var r8 = O(r5[r6], b);
                        r4['push'](r8);
                    }
                    J['morphAttributes'][r3] = r4;
                }
                J['morphTargetsRelative'] = this['morphTargetsRelative'];
                for (var r9 = this['groups'], rr = 0x0, rF = r9['length']; rr < rF; rr++) {
                    var rE = r9[rr];
                    J['addGroup'](rE['start'], rE['count'], rE['materialIndex']);
                }
                return J;
            }
            ,
            j['toJSON'] = function() {
                var O = {
                    'metadata': {
                        'version': 4.6,
                        'type': 'BufferGeometry',
                        'generator': 'BufferGeometry.toJSON'
                    }
                };
                if (O['uuid'] = this['uuid'],
                O['type'] = this['type'],
                '' !== this['name'] && (O['name'] = this['name']),
                Object['keys'](this['userData'])['length'] > 0x0 && (O['userData'] = this['userData']),
                void 0x0 !== this['parameters']) {
                    var J = this['parameters'];
                    for (var b in J)
                        void 0x0 !== J[b] && (O[b] = J[b]);
                    return O;
                }
                O['data'] = {
                    'attributes': {}
                };
                var D = this['index'];
                null !== D && (O['data']['index'] = {
                    'type': D['array']['constructor']['name'],
                    'array': Array['prototype']['slice']['call'](D['array'])
                });
                var r0 = this['attributes'];
                for (var r1 in r0) {
                    var r2 = r0[r1];
                    O['data']['attributes'][r1] = r2['toJSON'](O['data']);
                }
                var r3 = {}
                  , r4 = !0x1;
                for (var r5 in this['morphAttributes']) {
                    for (var r6 = this['morphAttributes'][r5], r7 = [], r8 = 0x0, r9 = r6['length']; r8 < r9; r8++) {
                        var rr = r6[r8];
                        r7['push'](rr['toJSON'](O['data']));
                    }
                    r7['length'] > 0x0 && (r3[r5] = r7,
                    r4 = !0x0);
                }
                r4 && (O['data']['morphAttributes'] = r3,
                O['data']['morphTargetsRelative'] = this['morphTargetsRelative']);
                var rF = this['groups'];
                rF['length'] > 0x0 && (O['data']['groups'] = JSON['parse'](JSON['stringify'](rF)));
                var rE = this['boundingSphere'];
                return null !== rE && (O['data']['boundingSphere'] = {
                    'center': rE['center']['toArray'](),
                    'radius': rE['radius']
                }),
                O;
            }
            ,
            j['clone'] = function() {
                return new this['constructor']()['copy'](this);
            }
            ,
            j['copy'] = function(O) {
                this['index'] = null,
                this['attributes'] = {},
                this['morphAttributes'] = {},
                this['groups'] = [],
                this['boundingBox'] = null,
                this['boundingSphere'] = null;
                var J = {};
                this['name'] = O['name'];
                var b = O['index'];
                null !== b && this['setIndex'](b['clone'](J));
                var D = O['attributes'];
                for (var r0 in D) {
                    var r1 = D[r0];
                    this['setAttribute'](r0, r1['clone'](J));
                }
                var r2 = O['morphAttributes'];
                for (var r3 in r2) {
                    for (var r4 = [], r5 = r2[r3], r6 = 0x0, r7 = r5['length']; r6 < r7; r6++)
                        r4['push'](r5[r6]['clone'](J));
                    this['morphAttributes'][r3] = r4;
                }
                this['morphTargetsRelative'] = O['morphTargetsRelative'];
                for (var r8 = O['groups'], r9 = 0x0, rr = r8['length']; r9 < rr; r9++) {
                    var rF = r8[r9];
                    this['addGroup'](rF['start'], rF['count'], rF['materialIndex']);
                }
                var rE = O['boundingBox'];
                null !== rE && (this['boundingBox'] = rE['clone']());
                var rp = O['boundingSphere'];
                return null !== rp && (this['boundingSphere'] = rp['clone']()),
                this['drawRange']['start'] = O['drawRange']['start'],
                this['drawRange']['count'] = O['drawRange']['count'],
                this['userData'] = O['userData'],
                this;
            }
            ,
            j['dispose'] = function() {
                this['dispatchEvent']({
                    'type': 'dispose'
                });
            }
            ,
            A;
        }(X['Q']);
    }
    ,
    0x161ea: (r, F, E) => {
        E['d'](F, {
            'Q': () => p
        });
        var p = (function() {
            function S() {}
            var R = S['prototype'];
            return R['addEventListener'] = function(H, y) {
                void 0x0 === this['_listeners'] && (this['_listeners'] = {});
                var d = this['_listeners'];
                void 0x0 === d[H] && (d[H] = []),
                -0x1 === d[H]['indexOf'](y) && d[H]['push'](y);
            }
            ,
            R['hasEventListener'] = function(H, y) {
                if (void 0x0 === this['_listeners'])
                    return !0x1;
                var d = this['_listeners'];
                return void 0x0 !== d[H] && -0x1 !== d[H]['indexOf'](y);
            }
            ,
            R['removeEventListener'] = function(H, y) {
                if (void 0x0 !== this['_listeners']) {
                    var d = this['_listeners'][H];
                    if (void 0x0 !== d) {
                        var P = d['indexOf'](y);
                        -0x1 !== P && d['splice'](P, 0x1);
                    }
                }
            }
            ,
            R['dispatchEvent'] = function(H) {
                if (void 0x0 !== this['_listeners']) {
                    var y = this['_listeners'][H['type']];
                    if (void 0x0 !== y) {
                        H['target'] = this;
                        for (var d = y['slice'](0x0), P = 0x0, Q = d['length']; P < Q; P++)
                            d[P]['call'](this, H);
                        H['target'] = null;
                    }
                }
            }
            ,
            S;
        }());
    }
    ,
    0xc7b1: (r, F, E) => {
        E['d'](F, {
            'z': () => p
        });
        var p = (function() {
            function S() {
                this['mask'] = 0x1;
            }
            var R = S['prototype'];
            return R['set'] = function(H) {
                this['mask'] = 0x1 << H >>> 0x0;
            }
            ,
            R['enable'] = function(H) {
                this['mask'] |= 0x1 << H;
            }
            ,
            R['enableAll'] = function() {
                this['mask'] = -0x1;
            }
            ,
            R['toggle'] = function(H) {
                this['mask'] ^= 0x1 << H;
            }
            ,
            R['disable'] = function(H) {
                this['mask'] &= ~(0x1 << H);
            }
            ,
            R['disableAll'] = function() {
                this['mask'] = 0x0;
            }
            ,
            R['test'] = function(H) {
                return !!(this['mask'] & H['mask']);
            }
            ,
            R['isEnabled'] = function(H) {
                return !!(this['mask'] & 0x1 << H);
            }
            ,
            S;
        }());
    }
    ,
    0x16f53: (F, R, H) => {
        H['d'](R, {
            'B': () => J
        });
        var P = H(0x12e4b)
          , Q = H(0x13294)
          , B = H(0x1008e)
          , X = H(0x11ded)
          , w = H(0x161ea)
          , C = H(0x147e3)
          , N = H(0xc7b1)
          , Z = H(0x3e78)
          , U = H(0xbd95)
          , V = 0x0
          , G = new B['P']()
          , k = new Q['P']()
          , W = new X['k']()
          , I = new B['P']()
          , L = new B['P']()
          , q = new B['P']()
          , K = new Q['P']()
          , Y = new B['P'](0x1,0x0,0x0)
          , z = new B['P'](0x0,0x1,0x0)
          , A = new B['P'](0x0,0x0,0x1)
          , j = {
            'type': 'added'
        }
          , O = {
            'type': 'removed'
        }
          , J = function(D) {
            function r0() {
                var r2;
                (r2 = D['call'](this) || this)['isObject3D'] = !0x0,
                Object['defineProperty'](r2, 'id', {
                    'value': V++
                }),
                r2['uuid'] = U['lk'](),
                r2['name'] = '',
                r2['type'] = 'Object3D',
                r2['parent'] = null,
                r2['children'] = [],
                r2['up'] = r0['DEFAULT_UP']['clone']();
                var r3 = new B['P']()
                  , r4 = new C['O']()
                  , r5 = new Q['P']()
                  , r6 = new B['P'](0x1,0x1,0x1);
                return r4['_onChange'](function() {
                    r5['setFromEuler'](r4, !0x1);
                }),
                r5['_onChange'](function() {
                    r4['setFromQuaternion'](r5, void 0x0, !0x1);
                }),
                Object['defineProperties'](r2, {
                    'position': {
                        'configurable': !0x0,
                        'enumerable': !0x0,
                        'value': r3
                    },
                    'rotation': {
                        'configurable': !0x0,
                        'enumerable': !0x0,
                        'value': r4
                    },
                    'quaternion': {
                        'configurable': !0x0,
                        'enumerable': !0x0,
                        'value': r5
                    },
                    'scale': {
                        'configurable': !0x0,
                        'enumerable': !0x0,
                        'value': r6
                    },
                    'modelViewMatrix': {
                        'value': new X['k']()
                    },
                    'normalMatrix': {
                        'value': new Z['d']()
                    }
                }),
                r2['matrix'] = new X['k'](),
                r2['matrixWorld'] = new X['k'](),
                r2['matrixAutoUpdate'] = r0['DEFAULT_MATRIX_AUTO_UPDATE'],
                r2['matrixWorldAutoUpdate'] = r0['DEFAULT_MATRIX_WORLD_AUTO_UPDATE'],
                r2['matrixWorldNeedsUpdate'] = !0x1,
                r2['layers'] = new N['z'](),
                r2['visible'] = !0x0,
                r2['castShadow'] = !0x1,
                r2['receiveShadow'] = !0x1,
                r2['frustumCulled'] = !0x0,
                r2['renderOrder'] = 0x0,
                r2['animations'] = [],
                r2['userData'] = {},
                r2;
            }
            (0x0,
            P['A'])(r0, D);
            var r1 = r0['prototype'];
            return r1['onBeforeShadow'] = function() {}
            ,
            r1['onAfterShadow'] = function() {}
            ,
            r1['onBeforeRender'] = function() {}
            ,
            r1['onAfterRender'] = function() {}
            ,
            r1['applyMatrix4'] = function(r2) {
                this['matrixAutoUpdate'] && this['updateMatrix'](),
                this['matrix']['premultiply'](r2),
                this['matrix']['decompose'](this['position'], this['quaternion'], this['scale']);
            }
            ,
            r1['applyQuaternion'] = function(r2) {
                return this['quaternion']['premultiply'](r2),
                this;
            }
            ,
            r1['setRotationFromAxisAngle'] = function(r2, r3) {
                this['quaternion']['setFromAxisAngle'](r2, r3);
            }
            ,
            r1['setRotationFromEuler'] = function(r2) {
                this['quaternion']['setFromEuler'](r2, !0x0);
            }
            ,
            r1['setRotationFromMatrix'] = function(r2) {
                this['quaternion']['setFromRotationMatrix'](r2);
            }
            ,
            r1['setRotationFromQuaternion'] = function(r2) {
                this['quaternion']['copy'](r2);
            }
            ,
            r1['rotateOnAxis'] = function(r2, r3) {
                return k['setFromAxisAngle'](r2, r3),
                this['quaternion']['multiply'](k),
                this;
            }
            ,
            r1['rotateOnWorldAxis'] = function(r2, r3) {
                return k['setFromAxisAngle'](r2, r3),
                this['quaternion']['premultiply'](k),
                this;
            }
            ,
            r1['rotateX'] = function(r2) {
                return this['rotateOnAxis'](Y, r2);
            }
            ,
            r1['rotateY'] = function(r2) {
                return this['rotateOnAxis'](z, r2);
            }
            ,
            r1['rotateZ'] = function(r2) {
                return this['rotateOnAxis'](A, r2);
            }
            ,
            r1['translateOnAxis'] = function(r2, r3) {
                return G['copy'](r2)['applyQuaternion'](this['quaternion']),
                this['position']['add'](G['multiplyScalar'](r3)),
                this;
            }
            ,
            r1['translateX'] = function(r2) {
                return this['translateOnAxis'](Y, r2);
            }
            ,
            r1['translateY'] = function(r2) {
                return this['translateOnAxis'](z, r2);
            }
            ,
            r1['translateZ'] = function(r2) {
                return this['translateOnAxis'](A, r2);
            }
            ,
            r1['localToWorld'] = function(r2) {
                return this['updateWorldMatrix'](!0x0, !0x1),
                r2['applyMatrix4'](this['matrixWorld']);
            }
            ,
            r1['worldToLocal'] = function(r2) {
                return this['updateWorldMatrix'](!0x0, !0x1),
                r2['applyMatrix4'](W['copy'](this['matrixWorld'])['invert']());
            }
            ,
            r1['lookAt'] = function(r2, r3, r4) {
                r2['isVector3'] ? I['copy'](r2) : I['set'](r2, r3, r4);
                var r5 = this['parent'];
                this['updateWorldMatrix'](!0x0, !0x1),
                L['setFromMatrixPosition'](this['matrixWorld']),
                this['isCamera'] || this['isLight'] ? W['lookAt'](L, I, this['up']) : W['lookAt'](I, L, this['up']),
                this['quaternion']['setFromRotationMatrix'](W),
                r5 && (W['extractRotation'](r5['matrixWorld']),
                k['setFromRotationMatrix'](W),
                this['quaternion']['premultiply'](k['invert']()));
            }
            ,
            r1['add'] = function(r2) {
                if (arguments['length'] > 0x1) {
                    for (var r3 = 0x0; r3 < arguments['length']; r3++)
                        this['add'](arguments[r3]);
                    return this;
                }
                return r2 === this ? (console['error']('THREE.Object3D.add:\x20object\x20can\x27t\x20be\x20added\x20as\x20a\x20child\x20of\x20itself.', r2),
                this) : (r2 && r2['isObject3D'] ? (null !== r2['parent'] && r2['parent']['remove'](r2),
                r2['parent'] = this,
                this['children']['push'](r2),
                r2['dispatchEvent'](j)) : console['error']('THREE.Object3D.add:\x20object\x20not\x20an\x20instance\x20of\x20THREE.Object3D.', r2),
                this);
            }
            ,
            r1['remove'] = function(r2) {
                if (arguments['length'] > 0x1) {
                    for (var r3 = 0x0; r3 < arguments['length']; r3++)
                        this['remove'](arguments[r3]);
                    return this;
                }
                var r4 = this['children']['indexOf'](r2);
                return -0x1 !== r4 && (r2['parent'] = null,
                this['children']['splice'](r4, 0x1),
                r2['dispatchEvent'](O)),
                this;
            }
            ,
            r1['removeFromParent'] = function() {
                var r2 = this['parent'];
                return null !== r2 && r2['remove'](this),
                this;
            }
            ,
            r1['clear'] = function() {
                return this['remove']['apply'](this, this['children']);
            }
            ,
            r1['attach'] = function(r2) {
                return this['updateWorldMatrix'](!0x0, !0x1),
                W['copy'](this['matrixWorld'])['invert'](),
                null !== r2['parent'] && (r2['parent']['updateWorldMatrix'](!0x0, !0x1),
                W['multiply'](r2['parent']['matrixWorld'])),
                r2['applyMatrix4'](W),
                this['add'](r2),
                r2['updateWorldMatrix'](!0x1, !0x0),
                this;
            }
            ,
            r1['getObjectById'] = function(r2) {
                return this['getObjectByProperty']('id', r2);
            }
            ,
            r1['getObjectByName'] = function(r2) {
                return this['getObjectByProperty']('name', r2);
            }
            ,
            r1['getObjectByProperty'] = function(r2, r3) {
                if (this[r2] === r3)
                    return this;
                for (var r4 = 0x0, r5 = this['children']['length']; r4 < r5; r4++) {
                    var r6 = this['children'][r4]['getObjectByProperty'](r2, r3);
                    if (void 0x0 !== r6)
                        return r6;
                }
            }
            ,
            r1['getObjectsByProperty'] = function(r2, r3, r4) {
                void 0x0 === r4 && (r4 = []),
                this[r2] === r3 && r4['push'](this);
                for (var r5 = this['children'], r6 = 0x0, r7 = r5['length']; r6 < r7; r6++)
                    r5[r6]['getObjectsByProperty'](r2, r3, r4);
                return r4;
            }
            ,
            r1['getWorldPosition'] = function(r2) {
                return this['updateWorldMatrix'](!0x0, !0x1),
                r2['setFromMatrixPosition'](this['matrixWorld']);
            }
            ,
            r1['getWorldQuaternion'] = function(r2) {
                return this['updateWorldMatrix'](!0x0, !0x1),
                this['matrixWorld']['decompose'](L, r2, q),
                r2;
            }
            ,
            r1['getWorldScale'] = function(r2) {
                return this['updateWorldMatrix'](!0x0, !0x1),
                this['matrixWorld']['decompose'](L, K, r2),
                r2;
            }
            ,
            r1['getWorldDirection'] = function(r2) {
                this['updateWorldMatrix'](!0x0, !0x1);
                var r3 = this['matrixWorld']['elements'];
                return r2['set'](r3[0x8], r3[0x9], r3[0xa])['normalize']();
            }
            ,
            r1['raycast'] = function() {}
            ,
            r1['traverse'] = function(r2) {
                r2(this);
                for (var r3 = this['children'], r4 = 0x0, r5 = r3['length']; r4 < r5; r4++)
                    r3[r4]['traverse'](r2);
            }
            ,
            r1['traverseVisible'] = function(r2) {
                if (!0x1 !== this['visible']) {
                    r2(this);
                    for (var r3 = this['children'], r4 = 0x0, r5 = r3['length']; r4 < r5; r4++)
                        r3[r4]['traverseVisible'](r2);
                }
            }
            ,
            r1['traverseAncestors'] = function(r2) {
                var r3 = this['parent'];
                null !== r3 && (r2(r3),
                r3['traverseAncestors'](r2));
            }
            ,
            r1['updateMatrix'] = function() {
                this['matrix']['compose'](this['position'], this['quaternion'], this['scale']),
                this['matrixWorldNeedsUpdate'] = !0x0;
            }
            ,
            r1['updateMatrixWorld'] = function(r2) {
                this['matrixAutoUpdate'] && this['updateMatrix'](),
                (this['matrixWorldNeedsUpdate'] || r2) && (null === this['parent'] ? this['matrixWorld']['copy'](this['matrix']) : this['matrixWorld']['multiplyMatrices'](this['parent']['matrixWorld'], this['matrix']),
                this['matrixWorldNeedsUpdate'] = !0x1,
                r2 = !0x0);
                for (var r3 = this['children'], r4 = 0x0, r5 = r3['length']; r4 < r5; r4++) {
                    var r6 = r3[r4];
                    !0x0 !== r6['matrixWorldAutoUpdate'] && !0x0 !== r2 || r6['updateMatrixWorld'](r2);
                }
            }
            ,
            r1['updateWorldMatrix'] = function(r2, r3) {
                var r4 = this['parent'];
                if (!0x0 === r2 && null !== r4 && !0x0 === r4['matrixWorldAutoUpdate'] && r4['updateWorldMatrix'](!0x0, !0x1),
                this['matrixAutoUpdate'] && this['updateMatrix'](),
                null === this['parent'] ? this['matrixWorld']['copy'](this['matrix']) : this['matrixWorld']['multiplyMatrices'](this['parent']['matrixWorld'], this['matrix']),
                !0x0 === r3)
                    for (var r5 = this['children'], r6 = 0x0, r7 = r5['length']; r6 < r7; r6++) {
                        var r8 = r5[r6];
                        !0x0 === r8['matrixWorldAutoUpdate'] && r8['updateWorldMatrix'](!0x1, !0x0);
                    }
            }
            ,
            r1['toJSON'] = function(r2) {
                var r3 = void 0x0 === r2 || 'string' == typeof r2
                  , r4 = {};
                r3 && (r2 = {
                    'geometries': {},
                    'materials': {},
                    'textures': {},
                    'images': {},
                    'shapes': {},
                    'skeletons': {},
                    'animations': {},
                    'nodes': {}
                },
                r4['metadata'] = {
                    'version': 4.6,
                    'type': 'Object',
                    'generator': 'Object3D.toJSON'
                });
                var r5 = {};
                function r6(rw, rl) {
                    return void 0x0 === rw[rl['uuid']] && (rw[rl['uuid']] = rl['toJSON'](r2)),
                    rl['uuid'];
                }
                if (r5['uuid'] = this['uuid'],
                r5['type'] = this['type'],
                '' !== this['name'] && (r5['name'] = this['name']),
                !0x0 === this['castShadow'] && (r5['castShadow'] = !0x0),
                !0x0 === this['receiveShadow'] && (r5['receiveShadow'] = !0x0),
                !0x1 === this['visible'] && (r5['visible'] = !0x1),
                !0x1 === this['frustumCulled'] && (r5['frustumCulled'] = !0x1),
                0x0 !== this['renderOrder'] && (r5['renderOrder'] = this['renderOrder']),
                Object['keys'](this['userData'])['length'] > 0x0 && (r5['userData'] = this['userData']),
                r5['layers'] = this['layers']['mask'],
                r5['matrix'] = this['matrix']['toArray'](),
                r5['up'] = this['up']['toArray'](),
                !0x1 === this['matrixAutoUpdate'] && (r5['matrixAutoUpdate'] = !0x1),
                this['isInstancedMesh'] && (r5['type'] = 'InstancedMesh',
                r5['count'] = this['count'],
                r5['instanceMatrix'] = this['instanceMatrix']['toJSON'](),
                null !== this['instanceColor'] && (r5['instanceColor'] = this['instanceColor']['toJSON']())),
                this['isBatchedMesh'] && (r5['type'] = 'BatchedMesh',
                r5['perObjectFrustumCulled'] = this['perObjectFrustumCulled'],
                r5['sortObjects'] = this['sortObjects'],
                r5['drawRanges'] = this['_drawRanges'],
                r5['reservedRanges'] = this['_reservedRanges'],
                r5['visibility'] = this['_visibility'],
                r5['active'] = this['_active'],
                r5['bounds'] = this['_bounds']['map'](function(rw) {
                    return {
                        'boxInitialized': rw['boxInitialized'],
                        'boxMin': rw['box']['min']['toArray'](),
                        'boxMax': rw['box']['max']['toArray'](),
                        'sphereInitialized': rw['sphereInitialized'],
                        'sphereRadius': rw['sphere']['radius'],
                        'sphereCenter': rw['sphere']['center']['toArray']()
                    };
                }),
                r5['maxGeometryCount'] = this['_maxGeometryCount'],
                r5['maxVertexCount'] = this['_maxVertexCount'],
                r5['maxIndexCount'] = this['_maxIndexCount'],
                r5['geometryInitialized'] = this['_geometryInitialized'],
                r5['geometryCount'] = this['_geometryCount'],
                r5['matricesTexture'] = this['_matricesTexture']['toJSON'](r2),
                null !== this['boundingSphere'] && (r5['boundingSphere'] = {
                    'center': r5['boundingSphere']['center']['toArray'](),
                    'radius': r5['boundingSphere']['radius']
                }),
                null !== this['boundingBox'] && (r5['boundingBox'] = {
                    'min': r5['boundingBox']['min']['toArray'](),
                    'max': r5['boundingBox']['max']['toArray']()
                })),
                this['isScene'])
                    this['background'] && (this['background']['isColor'] ? r5['background'] = this['background']['toJSON']() : this['background']['isTexture'] && (r5['background'] = this['background']['toJSON'](r2)['uuid'])),
                    this['environment'] && this['environment']['isTexture'] && !0x0 !== this['environment']['isRenderTargetTexture'] && (r5['environment'] = this['environment']['toJSON'](r2)['uuid']);
                else {
                    if (this['isMesh'] || this['isLine'] || this['isPoints']) {
                        r5['geometry'] = r6(r2['geometries'], this['geometry']);
                        var r7 = this['geometry']['parameters'];
                        if (void 0x0 !== r7 && void 0x0 !== r7['shapes']) {
                            var r8 = r7['shapes'];
                            if (Array['isArray'](r8))
                                for (var r9 = 0x0, rr = r8['length']; r9 < rr; r9++) {
                                    var rF = r8[r9];
                                    r6(r2['shapes'], rF);
                                }
                            else
                                r6(r2['shapes'], r8);
                        }
                    }
                }
                if (this['isSkinnedMesh'] && (r5['bindMode'] = this['bindMode'],
                r5['bindMatrix'] = this['bindMatrix']['toArray'](),
                void 0x0 !== this['skeleton'] && (r6(r2['skeletons'], this['skeleton']),
                r5['skeleton'] = this['skeleton']['uuid'])),
                void 0x0 !== this['material']) {
                    if (Array['isArray'](this['material'])) {
                        for (var rE = [], rp = 0x0, rS = this['material']['length']; rp < rS; rp++)
                            rE['push'](r6(r2['materials'], this['material'][rp]));
                        r5['material'] = rE;
                    } else
                        r5['material'] = r6(r2['materials'], this['material']);
                }
                if (this['children']['length'] > 0x0) {
                    r5['children'] = [];
                    for (var re = 0x0; re < this['children']['length']; re++)
                        r5['children']['push'](this['children'][re]['toJSON'](r2)['object']);
                }
                if (this['animations']['length'] > 0x0) {
                    r5['animations'] = [];
                    for (var rR = 0x0; rR < this['animations']['length']; rR++) {
                        var rH = this['animations'][rR];
                        r5['animations']['push'](r6(r2['animations'], rH));
                    }
                }
                if (r3) {
                    var ry = rm(r2['geometries'])
                      , rd = rm(r2['materials'])
                      , rP = rm(r2['textures'])
                      , rQ = rm(r2['images'])
                      , rB = rm(r2['shapes'])
                      , rM = rm(r2['skeletons'])
                      , rX = rm(r2['animations'])
                      , rt = rm(r2['nodes']);
                    ry['length'] > 0x0 && (r4['geometries'] = ry),
                    rd['length'] > 0x0 && (r4['materials'] = rd),
                    rP['length'] > 0x0 && (r4['textures'] = rP),
                    rQ['length'] > 0x0 && (r4['images'] = rQ),
                    rB['length'] > 0x0 && (r4['shapes'] = rB),
                    rM['length'] > 0x0 && (r4['skeletons'] = rM),
                    rX['length'] > 0x0 && (r4['animations'] = rX),
                    rt['length'] > 0x0 && (r4['nodes'] = rt);
                }
                return r4['object'] = r5,
                r4;
                function rm(rw) {
                    var rl = [];
                    for (var rC in rw) {
                        var rN = rw[rC];
                        delete rN['metadata'],
                        rl['push'](rN);
                    }
                    return rl;
                }
            }
            ,
            r1['clone'] = function(r2) {
                return new this['constructor']()['copy'](this, r2);
            }
            ,
            r1['copy'] = function(r2, r3) {
                if (void 0x0 === r3 && (r3 = !0x0),
                this['name'] = r2['name'],
                this['up']['copy'](r2['up']),
                this['position']['copy'](r2['position']),
                this['rotation']['order'] = r2['rotation']['order'],
                this['quaternion']['copy'](r2['quaternion']),
                this['scale']['copy'](r2['scale']),
                this['matrix']['copy'](r2['matrix']),
                this['matrixWorld']['copy'](r2['matrixWorld']),
                this['matrixAutoUpdate'] = r2['matrixAutoUpdate'],
                this['matrixWorldAutoUpdate'] = r2['matrixWorldAutoUpdate'],
                this['matrixWorldNeedsUpdate'] = r2['matrixWorldNeedsUpdate'],
                this['layers']['mask'] = r2['layers']['mask'],
                this['visible'] = r2['visible'],
                this['castShadow'] = r2['castShadow'],
                this['receiveShadow'] = r2['receiveShadow'],
                this['frustumCulled'] = r2['frustumCulled'],
                this['renderOrder'] = r2['renderOrder'],
                this['animations'] = r2['animations']['slice'](),
                this['userData'] = JSON['parse'](JSON['stringify'](r2['userData'])),
                !0x0 === r3)
                    for (var r4 = 0x0; r4 < r2['children']['length']; r4++) {
                        var r5 = r2['children'][r4];
                        this['add'](r5['clone']());
                    }
                return this;
            }
            ,
            r0;
        }(w['Q']);
        J['DEFAULT_UP'] = new B['P'](0x0,0x1,0x0),
        J['DEFAULT_MATRIX_AUTO_UPDATE'] = !0x0,
        J['DEFAULT_MATRIX_WORLD_AUTO_UPDATE'] = !0x0;
    }
    ,
    0xd973: (r, F, E) => {
        E(0xbf9a);
    }
    ,
    0xfbe: (F, E, p) => {
        p['d'](E, {
            'O': () => B
        });
        var S = p(0x12e4b)
          , R = p(0x161ea)
          , H = p(0x17417)
          , y = p(0x172d2)
          , d = p(0xb3ef)
          , P = p(0x14f63)
          , Q = p(0x1078a)
          , B = function(M) {
            function X(w, C, N) {
                var Z;
                void 0x0 === w && (w = 0x1),
                void 0x0 === C && (C = 0x1),
                void 0x0 === N && (N = {}),
                (Z = M['call'](this) || this)['isRenderTarget'] = !0x0,
                Z['width'] = w,
                Z['height'] = C,
                Z['depth'] = 0x1,
                Z['scissor'] = new d['I'](0x0,0x0,w,C),
                Z['scissorTest'] = !0x1,
                Z['viewport'] = new d['I'](0x0,0x0,w,C);
                var h = {
                    'width': w,
                    'height': C,
                    'depth': 0x1
                };
                return void 0x0 !== N['encoding'] && ((0x0,
                Q['mc'])('THREE.WebGLRenderTarget:\x20option.encoding\x20has\x20been\x20replaced\x20by\x20option.colorSpace.'),
                N['colorSpace'] = N['encoding'] === y['S2Q'] ? y['er$'] : y['jf0']),
                N = Object['assign']({
                    'generateMipmaps': !0x1,
                    'internalFormat': null,
                    'minFilter': y['k6q'],
                    'depthBuffer': !0x0,
                    'stencilBuffer': !0x1,
                    'depthTexture': null,
                    'samples': 0x0
                }, N),
                Z['texture'] = new H['g'](h,N['mapping'],N['wrapS'],N['wrapT'],N['magFilter'],N['minFilter'],N['format'],N['type'],N['anisotropy'],N['colorSpace']),
                Z['texture']['isRenderTargetTexture'] = !0x0,
                Z['texture']['flipY'] = !0x1,
                Z['texture']['generateMipmaps'] = N['generateMipmaps'],
                Z['texture']['internalFormat'] = N['internalFormat'],
                Z['depthBuffer'] = N['depthBuffer'],
                Z['stencilBuffer'] = N['stencilBuffer'],
                Z['depthTexture'] = N['depthTexture'],
                Z['samples'] = N['samples'],
                Z;
            }
            (0x0,
            S['A'])(X, M);
            var m = X['prototype'];
            return m['setSize'] = function(w, C, N) {
                void 0x0 === N && (N = 0x1),
                this['width'] === w && this['height'] === C && this['depth'] === N || (this['width'] = w,
                this['height'] = C,
                this['depth'] = N,
                this['texture']['image']['width'] = w,
                this['texture']['image']['height'] = C,
                this['texture']['image']['depth'] = N,
                this['dispose']()),
                this['viewport']['set'](0x0, 0x0, w, C),
                this['scissor']['set'](0x0, 0x0, w, C);
            }
            ,
            m['clone'] = function() {
                return new this['constructor']()['copy'](this);
            }
            ,
            m['copy'] = function(w) {
                this['width'] = w['width'],
                this['height'] = w['height'],
                this['depth'] = w['depth'],
                this['scissor']['copy'](w['scissor']),
                this['scissorTest'] = w['scissorTest'],
                this['viewport']['copy'](w['viewport']),
                this['texture'] = w['texture']['clone'](),
                this['texture']['isRenderTargetTexture'] = !0x0;
                var C = Object['assign']({}, w['texture']['image']);
                return this['texture']['source'] = new P['k'](C),
                this['depthBuffer'] = w['depthBuffer'],
                this['stencilBuffer'] = w['stencilBuffer'],
                null !== w['depthTexture'] && (this['depthTexture'] = w['depthTexture']['clone']()),
                this['samples'] = w['samples'],
                this;
            }
            ,
            m['dispose'] = function() {
                this['dispatchEvent']({
                    'type': 'dispose'
                });
            }
            ,
            X;
        }(R['Q']);
    }
    ,
    0x18a3: (r, F, E) => {
        E(0x172d2);
    }
    ,
    0x4e82: (r, F, E) => {
        E(0xbd95);
    }
    ,
    0x10d2d: (F, E, p) => {
        p['d'](E, {
            'H': () => y
        });
        var S, R = p(0x1078a), H = p(0x4efe), y = (function() {
            function d() {}
            return d['getDataURL'] = function(P) {
                if (/^data:/i['test'](P['src']))
                    return P['src'];
                if ('undefined' == typeof HTMLCanvasElement)
                    return P['src'];
                var Q;
                if (P instanceof HTMLCanvasElement)
                    Q = P;
                else {
                    void 0x0 === S && (S = (0x0,
                    R['qq'])('canvas')),
                    S['width'] = P['width'],
                    S['height'] = P['height'];
                    var B = S['getContext']('2d');
                    P instanceof ImageData ? B['putImageData'](P, 0x0, 0x0) : B['drawImage'](P, 0x0, 0x0, P['width'], P['height']),
                    Q = S;
                }
                return Q['width'] > 0x800 || Q['height'] > 0x800 ? (console['warn']('THREE.ImageUtils.getDataURL:\x20Image\x20converted\x20to\x20jpg\x20for\x20performance\x20reasons', P),
                Q['toDataURL']('image/jpeg', 0.6)) : Q['toDataURL']('image/png');
            }
            ,
            d['sRGBToLinear'] = function(P) {
                if ('undefined' != typeof HTMLImageElement && P instanceof HTMLImageElement || 'undefined' != typeof HTMLCanvasElement && P instanceof HTMLCanvasElement || 'undefined' != typeof ImageBitmap && P instanceof ImageBitmap) {
                    var Q = (0x0,
                    R['qq'])('canvas');
                    Q['width'] = P['width'],
                    Q['height'] = P['height'];
                    var B = Q['getContext']('2d');
                    B['drawImage'](P, 0x0, 0x0, P['width'], P['height']);
                    for (var M = B['getImageData'](0x0, 0x0, P['width'], P['height']), X = M['data'], m = 0x0; m < X['length']; m++)
                        X[m] = 0xff * (0x0,
                        H['dk'])(X[m] / 0xff);
                    return B['putImageData'](M, 0x0, 0x0),
                    Q;
                }
                if (P['data']) {
                    for (var w = P['data']['slice'](0x0), C = 0x0; C < w['length']; C++)
                        w instanceof Uint8Array || w instanceof Uint8ClampedArray ? w[C] = Math['floor'](0xff * (0x0,
                        H['dk'])(w[C] / 0xff)) : w[C] = (0x0,
                        H['dk'])(w[C]);
                    return {
                        'data': w,
                        'width': P['width'],
                        'height': P['height']
                    };
                }
                return console['warn']('THREE.ImageUtils.sRGBToLinear():\x20Unsupported\x20image\x20type.\x20No\x20color\x20space\x20conversion\x20applied.'),
                P;
            }
            ,
            d;
        }());
    }
    ,
    0x10fc5: (F, R, H) => {
        H['d'](R, {
            'B': () => r2
        });
        var Q = H(0x172d2)
          , B = H(0x17dfd)
          , X = H(0x16835)
          , N = H(0x1152b)
          , Z = H(0x17743)
          , U = H(0x152d9)
          , V = H(0x7026)
          , G = H(0x1008e)
          , k = H(0x169b1)
          , W = H(0xc42c)
          , I = H(0x14baa)
          , L = H(0x131a1)
          , q = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582]
          , K = 0x14
          , Y = new Z['q']()
          , z = new k['Q']()
          , j = null
          , O = 0x0
          , J = 0x0
          , D = (0x1 + Math['sqrt'](0x5)) / 0x2
          , r0 = 0x1 / D
          , r1 = [new G['P'](0x1,0x1,0x1), new G['P'](-0x1,0x1,0x1), new G['P'](0x1,0x1,-0x1), new G['P'](-0x1,0x1,-0x1), new G['P'](0x0,D,r0), new G['P'](0x0,D,-r0), new G['P'](r0,0x0,D), new G['P'](-r0,0x0,D), new G['P'](D,r0,0x0), new G['P'](-D,r0,0x0)]
          , r2 = (function() {
            function r7(r9) {
                this['_renderer'] = r9,
                this['_pingPongRenderTarget'] = null,
                this['_lodMax'] = 0x0,
                this['_cubeSize'] = 0x0,
                this['_lodPlanes'] = [],
                this['_sizeLods'] = [],
                this['_sigmas'] = [],
                this['_blurMaterial'] = null,
                this['_cubemapMaterial'] = null,
                this['_equirectMaterial'] = null,
                this['_compileMaterial'](this['_blurMaterial']);
            }
            var r8 = r7['prototype'];
            return r8['fromScene'] = function(r9, rr, rF, rE) {
                void 0x0 === rr && (rr = 0x0),
                void 0x0 === rF && (rF = 0.1),
                void 0x0 === rE && (rE = 0x64),
                j = this['_renderer']['getRenderTarget'](),
                O = this['_renderer']['getActiveCubeFace'](),
                J = this['_renderer']['getActiveMipmapLevel'](),
                this['_setSize'](0x100);
                var rp = this['_allocateTargets']();
                return rp['depthBuffer'] = !0x0,
                this['_sceneToCubeUV'](r9, rF, rE, rp),
                rr > 0x0 && this['_blur'](rp, 0x0, 0x0, rr),
                this['_applyPMREM'](rp),
                this['_cleanup'](rp),
                rp;
            }
            ,
            r8['fromEquirectangular'] = function(r9, rr) {
                return void 0x0 === rr && (rr = null),
                this['_fromTexture'](r9, rr);
            }
            ,
            r8['fromCubemap'] = function(r9, rr) {
                return void 0x0 === rr && (rr = null),
                this['_fromTexture'](r9, rr);
            }
            ,
            r8['compileCubemapShader'] = function() {
                null === this['_cubemapMaterial'] && (this['_cubemapMaterial'] = r6(),
                this['_compileMaterial'](this['_cubemapMaterial']));
            }
            ,
            r8['compileEquirectangularShader'] = function() {
                null === this['_equirectMaterial'] && (this['_equirectMaterial'] = r5(),
                this['_compileMaterial'](this['_equirectMaterial']));
            }
            ,
            r8['dispose'] = function() {
                this['_dispose'](),
                null !== this['_cubemapMaterial'] && this['_cubemapMaterial']['dispose'](),
                null !== this['_equirectMaterial'] && this['_equirectMaterial']['dispose']();
            }
            ,
            r8['_setSize'] = function(r9) {
                this['_lodMax'] = Math['floor'](Math['log2'](r9)),
                this['_cubeSize'] = Math['pow'](0x2, this['_lodMax']);
            }
            ,
            r8['_dispose'] = function() {
                null !== this['_blurMaterial'] && this['_blurMaterial']['dispose'](),
                null !== this['_pingPongRenderTarget'] && this['_pingPongRenderTarget']['dispose']();
                for (var r9 = 0x0; r9 < this['_lodPlanes']['length']; r9++)
                    this['_lodPlanes'][r9]['dispose']();
            }
            ,
            r8['_cleanup'] = function(r9) {
                this['_renderer']['setRenderTarget'](j, O, J),
                r9['scissorTest'] = !0x1,
                r4(r9, 0x0, 0x0, r9['width'], r9['height']);
            }
            ,
            r8['_fromTexture'] = function(r9, rr) {
                r9['mapping'] === Q['hy7'] || r9['mapping'] === Q['xFO'] ? this['_setSize'](0x0 === r9['image']['length'] ? 0x10 : r9['image'][0x0]['width'] || r9['image'][0x0]['image']['width']) : this['_setSize'](r9['image']['width'] / 0x4),
                j = this['_renderer']['getRenderTarget'](),
                O = this['_renderer']['getActiveCubeFace'](),
                J = this['_renderer']['getActiveMipmapLevel']();
                var rF = rr || this['_allocateTargets']();
                return this['_textureToCubeUV'](r9, rF),
                this['_applyPMREM'](rF),
                this['_cleanup'](rF),
                rF;
            }
            ,
            r8['_allocateTargets'] = function() {
                var r9 = 0x3 * Math['max'](this['_cubeSize'], 0x70)
                  , rr = 0x4 * this['_cubeSize']
                  , rF = {
                    'magFilter': Q['k6q'],
                    'minFilter': Q['k6q'],
                    'generateMipmaps': !0x1,
                    'type': Q['ix0'],
                    'format': Q['GWd'],
                    'colorSpace': Q['Zr2'],
                    'depthBuffer': !0x1
                }
                  , rE = r3(r9, rr, rF);
                if (null === this['_pingPongRenderTarget'] || this['_pingPongRenderTarget']['width'] !== r9 || this['_pingPongRenderTarget']['height'] !== rr) {
                    null !== this['_pingPongRenderTarget'] && this['_dispose'](),
                    this['_pingPongRenderTarget'] = r3(r9, rr, rF);
                    var rp = this['_lodMax']
                      , rS = function(re) {
                        for (var rR = [], rH = [], ry = [], rd = re, rP = re - 0x4 + 0x1 + q['length'], rQ = 0x0; rQ < rP; rQ++) {
                            var rB = Math['pow'](0x2, rd);
                            rH['push'](rB);
                            var rM = 0x1 / rB;
                            rQ > re - 0x4 ? rM = q[rQ - re + 0x4 - 0x1] : 0x0 === rQ && (rM = 0x0),
                            ry['push'](rM);
                            for (var rX = 0x1 / (rB - 0x2), rt = -rX, rm = 0x1 + rX, rw = [rt, rt, rm, rt, rm, rm, rt, rt, rm, rm, rt, rm], rl = 0x6, rC = 0x6, rN = 0x3, rZ = 0x2, rh = 0x1, ro = new Float32Array(rN * rC * rl), rU = new Float32Array(rZ * rC * rl), ri = new Float32Array(rh * rC * rl), rT = 0x0; rT < rl; rT++) {
                                var rV = rT % 0x3 * 0x2 / 0x3 - 0x1
                                  , rs = rT > 0x2 ? 0x0 : -0x1
                                  , rG = [rV, rs, 0x0, rV + 0x2 / 0x3, rs, 0x0, rV + 0x2 / 0x3, rs + 0x1, 0x0, rV, rs, 0x0, rV + 0x2 / 0x3, rs + 0x1, 0x0, rV, rs + 0x1, 0x0];
                                ro['set'](rG, rN * rC * rT),
                                rU['set'](rw, rZ * rC * rT);
                                var rk = [rT, rT, rT, rT, rT, rT];
                                ri['set'](rk, rh * rC * rT);
                            }
                            var rW = new X['L']();
                            rW['setAttribute']('position', new B['TH'](ro,rN)),
                            rW['setAttribute']('uv', new B['TH'](rU,rZ)),
                            rW['setAttribute']('faceIndex', new B['TH'](ri,rh)),
                            rR['push'](rW),
                            rd > 0x4 && rd--;
                        }
                        return {
                            'lodPlanes': rR,
                            'sizeLods': rH,
                            'sigmas': ry
                        };
                    }(rp);
                    this['_sizeLods'] = rS['sizeLods'],
                    this['_lodPlanes'] = rS['lodPlanes'],
                    this['_sigmas'] = rS['sigmas'],
                    this['_blurMaterial'] = function(re, rR, rH) {
                        var ry = new Float32Array(K)
                          , rd = new G['P'](0x0,0x1,0x0)
                          , rP = new V['B']({
                            'name': 'SphericalGaussianBlur',
                            'defines': {
                                'n': K,
                                'CUBEUV_TEXEL_WIDTH': 0x1 / rR,
                                'CUBEUV_TEXEL_HEIGHT': 0x1 / rH,
                                'CUBEUV_MAX_MIP': re + '.0'
                            },
                            'uniforms': {
                                'envMap': {
                                    'value': null
                                },
                                'samples': {
                                    'value': 0x1
                                },
                                'weights': {
                                    'value': ry
                                },
                                'latitudinal': {
                                    'value': !0x1
                                },
                                'dTheta': {
                                    'value': 0x0
                                },
                                'mipInt': {
                                    'value': 0x0
                                },
                                'poleAxis': {
                                    'value': rd
                                }
                            },
                            'vertexShader': '\x0a\x0a\x09\x09precision\x20mediump\x20float;\x0a\x09\x09precision\x20mediump\x20int;\x0a\x0a\x09\x09attribute\x20float\x20faceIndex;\x0a\x0a\x09\x09varying\x20vec3\x20vOutputDirection;\x0a\x0a\x09\x09//\x20RH\x20coordinate\x20system;\x20PMREM\x20face-indexing\x20convention\x0a\x09\x09vec3\x20getDirection(\x20vec2\x20uv,\x20float\x20face\x20)\x20{\x0a\x0a\x09\x09\x09uv\x20=\x202.0\x20*\x20uv\x20-\x201.0;\x0a\x0a\x09\x09\x09vec3\x20direction\x20=\x20vec3(\x20uv,\x201.0\x20);\x0a\x0a\x09\x09\x09if\x20(\x20face\x20==\x200.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction\x20=\x20direction.zyx;\x20//\x20(\x201,\x20v,\x20u\x20)\x20pos\x20x\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x201.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction\x20=\x20direction.xzy;\x0a\x09\x09\x09\x09direction.xz\x20*=\x20-1.0;\x20//\x20(\x20-u,\x201,\x20-v\x20)\x20pos\x20y\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x202.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction.x\x20*=\x20-1.0;\x20//\x20(\x20-u,\x20v,\x201\x20)\x20pos\x20z\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x203.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction\x20=\x20direction.zyx;\x0a\x09\x09\x09\x09direction.xz\x20*=\x20-1.0;\x20//\x20(\x20-1,\x20v,\x20-u\x20)\x20neg\x20x\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x204.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction\x20=\x20direction.xzy;\x0a\x09\x09\x09\x09direction.xy\x20*=\x20-1.0;\x20//\x20(\x20-u,\x20-1,\x20v\x20)\x20neg\x20y\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x205.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction.z\x20*=\x20-1.0;\x20//\x20(\x20u,\x20v,\x20-1\x20)\x20neg\x20z\x0a\x0a\x09\x09\x09}\x0a\x0a\x09\x09\x09return\x20direction;\x0a\x0a\x09\x09}\x0a\x0a\x09\x09void\x20main()\x20{\x0a\x0a\x09\x09\x09vOutputDirection\x20=\x20getDirection(\x20uv,\x20faceIndex\x20);\x0a\x09\x09\x09gl_Position\x20=\x20vec4(\x20position,\x201.0\x20);\x0a\x0a\x09\x09}\x0a\x09',
                            'fragmentShader': '\x0a\x0a\x09\x09\x09precision\x20mediump\x20float;\x0a\x09\x09\x09precision\x20mediump\x20int;\x0a\x0a\x09\x09\x09varying\x20vec3\x20vOutputDirection;\x0a\x0a\x09\x09\x09uniform\x20sampler2D\x20envMap;\x0a\x09\x09\x09uniform\x20int\x20samples;\x0a\x09\x09\x09uniform\x20float\x20weights[\x20n\x20];\x0a\x09\x09\x09uniform\x20bool\x20latitudinal;\x0a\x09\x09\x09uniform\x20float\x20dTheta;\x0a\x09\x09\x09uniform\x20float\x20mipInt;\x0a\x09\x09\x09uniform\x20vec3\x20poleAxis;\x0a\x0a\x09\x09\x09#define\x20ENVMAP_TYPE_CUBE_UV\x0a\x09\x09\x09#include\x20<cube_uv_reflection_fragment>\x0a\x0a\x09\x09\x09vec3\x20getSample(\x20float\x20theta,\x20vec3\x20axis\x20)\x20{\x0a\x0a\x09\x09\x09\x09float\x20cosTheta\x20=\x20cos(\x20theta\x20);\x0a\x09\x09\x09\x09//\x20Rodrigues\x27\x20axis-angle\x20rotation\x0a\x09\x09\x09\x09vec3\x20sampleDirection\x20=\x20vOutputDirection\x20*\x20cosTheta\x0a\x09\x09\x09\x09\x09+\x20cross(\x20axis,\x20vOutputDirection\x20)\x20*\x20sin(\x20theta\x20)\x0a\x09\x09\x09\x09\x09+\x20axis\x20*\x20dot(\x20axis,\x20vOutputDirection\x20)\x20*\x20(\x201.0\x20-\x20cosTheta\x20);\x0a\x0a\x09\x09\x09\x09return\x20bilinearCubeUV(\x20envMap,\x20sampleDirection,\x20mipInt\x20);\x0a\x0a\x09\x09\x09}\x0a\x0a\x09\x09\x09void\x20main()\x20{\x0a\x0a\x09\x09\x09\x09vec3\x20axis\x20=\x20latitudinal\x20?\x20poleAxis\x20:\x20cross(\x20poleAxis,\x20vOutputDirection\x20);\x0a\x0a\x09\x09\x09\x09if\x20(\x20all(\x20equal(\x20axis,\x20vec3(\x200.0\x20)\x20)\x20)\x20)\x20{\x0a\x0a\x09\x09\x09\x09\x09axis\x20=\x20vec3(\x20vOutputDirection.z,\x200.0,\x20-\x20vOutputDirection.x\x20);\x0a\x0a\x09\x09\x09\x09}\x0a\x0a\x09\x09\x09\x09axis\x20=\x20normalize(\x20axis\x20);\x0a\x0a\x09\x09\x09\x09gl_FragColor\x20=\x20vec4(\x200.0,\x200.0,\x200.0,\x201.0\x20);\x0a\x09\x09\x09\x09gl_FragColor.rgb\x20+=\x20weights[\x200\x20]\x20*\x20getSample(\x200.0,\x20axis\x20);\x0a\x0a\x09\x09\x09\x09for\x20(\x20int\x20i\x20=\x201;\x20i\x20<\x20n;\x20i++\x20)\x20{\x0a\x0a\x09\x09\x09\x09\x09if\x20(\x20i\x20>=\x20samples\x20)\x20{\x0a\x0a\x09\x09\x09\x09\x09\x09break;\x0a\x0a\x09\x09\x09\x09\x09}\x0a\x0a\x09\x09\x09\x09\x09float\x20theta\x20=\x20dTheta\x20*\x20float(\x20i\x20);\x0a\x09\x09\x09\x09\x09gl_FragColor.rgb\x20+=\x20weights[\x20i\x20]\x20*\x20getSample(\x20-1.0\x20*\x20theta,\x20axis\x20);\x0a\x09\x09\x09\x09\x09gl_FragColor.rgb\x20+=\x20weights[\x20i\x20]\x20*\x20getSample(\x20theta,\x20axis\x20);\x0a\x0a\x09\x09\x09\x09}\x0a\x0a\x09\x09\x09}\x0a\x09\x09',
                            'blending': Q['XIg'],
                            'depthTest': !0x1,
                            'depthWrite': !0x1
                        });
                        return rP;
                    }(rp, r9, rr);
                }
                return rE;
            }
            ,
            r8['_compileMaterial'] = function(r9) {
                var rr = new N['e'](this['_lodPlanes'][0x0],r9);
                this['_renderer']['compile'](rr, Y);
            }
            ,
            r8['_sceneToCubeUV'] = function(r9, rr, rF, rE) {
                var rp = new U['u'](0x5a,0x1,rr,rF)
                  , rS = [0x1, -0x1, 0x1, 0x1, 0x1, 0x1]
                  , re = [0x1, 0x1, 0x1, -0x1, -0x1, -0x1]
                  , rR = this['_renderer']
                  , rH = rR['autoClear']
                  , ry = rR['toneMapping'];
                rR['getClearColor'](z),
                rR['toneMapping'] = Q['y_p'],
                rR['autoClear'] = !0x1;
                var rd = new I['V']({
                    'name': 'PMREM.Background',
                    'side': Q['hsX'],
                    'depthWrite': !0x1,
                    'depthTest': !0x1
                })
                  , rP = new N['e'](new L['i'](),rd)
                  , rQ = !0x1
                  , rB = r9['background'];
                rB ? rB['isColor'] && (rd['color']['copy'](rB),
                r9['background'] = null,
                rQ = !0x0) : (rd['color']['copy'](z),
                rQ = !0x0);
                for (var rM = 0x0; rM < 0x6; rM++) {
                    var rX = rM % 0x3;
                    0x0 === rX ? (rp['up']['set'](0x0, rS[rM], 0x0),
                    rp['lookAt'](re[rM], 0x0, 0x0)) : 0x1 === rX ? (rp['up']['set'](0x0, 0x0, rS[rM]),
                    rp['lookAt'](0x0, re[rM], 0x0)) : (rp['up']['set'](0x0, rS[rM], 0x0),
                    rp['lookAt'](0x0, 0x0, re[rM]));
                    var rt = this['_cubeSize'];
                    r4(rE, rX * rt, rM > 0x2 ? rt : 0x0, rt, rt),
                    rR['setRenderTarget'](rE),
                    rQ && rR['render'](rP, rp),
                    rR['render'](r9, rp);
                }
                rP['geometry']['dispose'](),
                rP['material']['dispose'](),
                rR['toneMapping'] = ry,
                rR['autoClear'] = rH,
                r9['background'] = rB;
            }
            ,
            r8['_textureToCubeUV'] = function(r9, rr) {
                var rF = this['_renderer']
                  , rE = r9['mapping'] === Q['hy7'] || r9['mapping'] === Q['xFO'];
                rE ? (null === this['_cubemapMaterial'] && (this['_cubemapMaterial'] = r6()),
                this['_cubemapMaterial']['uniforms']['flipEnvMap']['value'] = !0x1 === r9['isRenderTargetTexture'] ? -0x1 : 0x1) : null === this['_equirectMaterial'] && (this['_equirectMaterial'] = r5());
                var rp = rE ? this['_cubemapMaterial'] : this['_equirectMaterial']
                  , rS = new N['e'](this['_lodPlanes'][0x0],rp);
                rp['uniforms']['envMap']['value'] = r9;
                var re = this['_cubeSize'];
                r4(rr, 0x0, 0x0, 0x3 * re, 0x2 * re),
                rF['setRenderTarget'](rr),
                rF['render'](rS, Y);
            }
            ,
            r8['_applyPMREM'] = function(r9) {
                var rr = this['_renderer']
                  , rF = rr['autoClear'];
                rr['autoClear'] = !0x1;
                for (var rE = 0x1; rE < this['_lodPlanes']['length']; rE++) {
                    var rp = Math['sqrt'](this['_sigmas'][rE] * this['_sigmas'][rE] - this['_sigmas'][rE - 0x1] * this['_sigmas'][rE - 0x1])
                      , rS = r1[(rE - 0x1) % r1['length']];
                    this['_blur'](r9, rE - 0x1, rE, rp, rS);
                }
                rr['autoClear'] = rF;
            }
            ,
            r8['_blur'] = function(r9, rr, rF, rE, rp) {
                var rS = this['_pingPongRenderTarget'];
                this['_halfBlur'](r9, rS, rr, rF, rE, 'latitudinal', rp),
                this['_halfBlur'](rS, r9, rF, rF, rE, 'longitudinal', rp);
            }
            ,
            r8['_halfBlur'] = function(r9, rr, rF, rE, rp, rS, re) {
                var rR = this['_renderer']
                  , rH = this['_blurMaterial'];
                'latitudinal' !== rS && 'longitudinal' !== rS && console['error']('blur\x20direction\x20must\x20be\x20either\x20latitudinal\x20or\x20longitudinal!');
                var ry = new N['e'](this['_lodPlanes'][rE],rH)
                  , rd = rH['uniforms']
                  , rP = this['_sizeLods'][rF] - 0x1
                  , rQ = isFinite(rp) ? Math['PI'] / (0x2 * rP) : 0x2 * Math['PI'] / 0x27
                  , rB = rp / rQ
                  , rM = isFinite(rp) ? 0x1 + Math['floor'](0x3 * rB) : K;
                rM > K && console['warn']('sigmaRadians,\x20' + rp + ',\x20is\x20too\x20large\x20and\x20will\x20clip,\x20as\x20it\x20requested\x20' + rM + '\x20samples\x20when\x20the\x20maximum\x20is\x20set\x20to\x20' + K);
                for (var rX = [], rt = 0x0, rm = 0x0; rm < K; ++rm) {
                    var rw = rm / rB
                      , rl = Math['exp'](-rw * rw / 0x2);
                    rX['push'](rl),
                    0x0 === rm ? rt += rl : rm < rM && (rt += 0x2 * rl);
                }
                for (var rC = 0x0; rC < rX['length']; rC++)
                    rX[rC] = rX[rC] / rt;
                rd['envMap']['value'] = r9['texture'],
                rd['samples']['value'] = rM,
                rd['weights']['value'] = rX,
                rd['latitudinal']['value'] = 'latitudinal' === rS,
                re && (rd['poleAxis']['value'] = re);
                var rN = this['_lodMax'];
                rd['dTheta']['value'] = rQ,
                rd['mipInt']['value'] = rN - rF;
                var rZ = this['_sizeLods'][rE];
                r4(rr, 0x3 * rZ * (rE > rN - 0x4 ? rE - rN + 0x4 : 0x0), 0x4 * (this['_cubeSize'] - rZ), 0x3 * rZ, 0x2 * rZ),
                rR['setRenderTarget'](rr),
                rR['render'](ry, Y);
            }
            ,
            r7;
        }());
        function r3(r7, r8, r9) {
            var rr = new W['n'](r7,r8,r9);
            return rr['texture']['mapping'] = Q['Om'],
            rr['texture']['name'] = 'PMREM.cubeUv',
            rr['scissorTest'] = !0x0,
            rr;
        }
        function r4(r7, r8, r9, rr, rF) {
            r7['viewport']['set'](r8, r9, rr, rF),
            r7['scissor']['set'](r8, r9, rr, rF);
        }
        function r5() {
            return new V['B']({
                'name': 'EquirectangularToCubeUV',
                'uniforms': {
                    'envMap': {
                        'value': null
                    }
                },
                'vertexShader': '\x0a\x0a\x09\x09precision\x20mediump\x20float;\x0a\x09\x09precision\x20mediump\x20int;\x0a\x0a\x09\x09attribute\x20float\x20faceIndex;\x0a\x0a\x09\x09varying\x20vec3\x20vOutputDirection;\x0a\x0a\x09\x09//\x20RH\x20coordinate\x20system;\x20PMREM\x20face-indexing\x20convention\x0a\x09\x09vec3\x20getDirection(\x20vec2\x20uv,\x20float\x20face\x20)\x20{\x0a\x0a\x09\x09\x09uv\x20=\x202.0\x20*\x20uv\x20-\x201.0;\x0a\x0a\x09\x09\x09vec3\x20direction\x20=\x20vec3(\x20uv,\x201.0\x20);\x0a\x0a\x09\x09\x09if\x20(\x20face\x20==\x200.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction\x20=\x20direction.zyx;\x20//\x20(\x201,\x20v,\x20u\x20)\x20pos\x20x\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x201.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction\x20=\x20direction.xzy;\x0a\x09\x09\x09\x09direction.xz\x20*=\x20-1.0;\x20//\x20(\x20-u,\x201,\x20-v\x20)\x20pos\x20y\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x202.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction.x\x20*=\x20-1.0;\x20//\x20(\x20-u,\x20v,\x201\x20)\x20pos\x20z\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x203.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction\x20=\x20direction.zyx;\x0a\x09\x09\x09\x09direction.xz\x20*=\x20-1.0;\x20//\x20(\x20-1,\x20v,\x20-u\x20)\x20neg\x20x\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x204.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction\x20=\x20direction.xzy;\x0a\x09\x09\x09\x09direction.xy\x20*=\x20-1.0;\x20//\x20(\x20-u,\x20-1,\x20v\x20)\x20neg\x20y\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x205.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction.z\x20*=\x20-1.0;\x20//\x20(\x20u,\x20v,\x20-1\x20)\x20neg\x20z\x0a\x0a\x09\x09\x09}\x0a\x0a\x09\x09\x09return\x20direction;\x0a\x0a\x09\x09}\x0a\x0a\x09\x09void\x20main()\x20{\x0a\x0a\x09\x09\x09vOutputDirection\x20=\x20getDirection(\x20uv,\x20faceIndex\x20);\x0a\x09\x09\x09gl_Position\x20=\x20vec4(\x20position,\x201.0\x20);\x0a\x0a\x09\x09}\x0a\x09',
                'fragmentShader': '\x0a\x0a\x09\x09\x09precision\x20mediump\x20float;\x0a\x09\x09\x09precision\x20mediump\x20int;\x0a\x0a\x09\x09\x09varying\x20vec3\x20vOutputDirection;\x0a\x0a\x09\x09\x09uniform\x20sampler2D\x20envMap;\x0a\x0a\x09\x09\x09#include\x20<common>\x0a\x0a\x09\x09\x09void\x20main()\x20{\x0a\x0a\x09\x09\x09\x09vec3\x20outputDirection\x20=\x20normalize(\x20vOutputDirection\x20);\x0a\x09\x09\x09\x09vec2\x20uv\x20=\x20equirectUv(\x20outputDirection\x20);\x0a\x0a\x09\x09\x09\x09gl_FragColor\x20=\x20vec4(\x20texture2D\x20(\x20envMap,\x20uv\x20).rgb,\x201.0\x20);\x0a\x0a\x09\x09\x09}\x0a\x09\x09',
                'blending': Q['XIg'],
                'depthTest': !0x1,
                'depthWrite': !0x1
            });
        }
        function r6() {
            return new V['B']({
                'name': 'CubemapToCubeUV',
                'uniforms': {
                    'envMap': {
                        'value': null
                    },
                    'flipEnvMap': {
                        'value': -0x1
                    }
                },
                'vertexShader': '\x0a\x0a\x09\x09precision\x20mediump\x20float;\x0a\x09\x09precision\x20mediump\x20int;\x0a\x0a\x09\x09attribute\x20float\x20faceIndex;\x0a\x0a\x09\x09varying\x20vec3\x20vOutputDirection;\x0a\x0a\x09\x09//\x20RH\x20coordinate\x20system;\x20PMREM\x20face-indexing\x20convention\x0a\x09\x09vec3\x20getDirection(\x20vec2\x20uv,\x20float\x20face\x20)\x20{\x0a\x0a\x09\x09\x09uv\x20=\x202.0\x20*\x20uv\x20-\x201.0;\x0a\x0a\x09\x09\x09vec3\x20direction\x20=\x20vec3(\x20uv,\x201.0\x20);\x0a\x0a\x09\x09\x09if\x20(\x20face\x20==\x200.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction\x20=\x20direction.zyx;\x20//\x20(\x201,\x20v,\x20u\x20)\x20pos\x20x\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x201.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction\x20=\x20direction.xzy;\x0a\x09\x09\x09\x09direction.xz\x20*=\x20-1.0;\x20//\x20(\x20-u,\x201,\x20-v\x20)\x20pos\x20y\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x202.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction.x\x20*=\x20-1.0;\x20//\x20(\x20-u,\x20v,\x201\x20)\x20pos\x20z\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x203.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction\x20=\x20direction.zyx;\x0a\x09\x09\x09\x09direction.xz\x20*=\x20-1.0;\x20//\x20(\x20-1,\x20v,\x20-u\x20)\x20neg\x20x\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x204.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction\x20=\x20direction.xzy;\x0a\x09\x09\x09\x09direction.xy\x20*=\x20-1.0;\x20//\x20(\x20-u,\x20-1,\x20v\x20)\x20neg\x20y\x0a\x0a\x09\x09\x09}\x20else\x20if\x20(\x20face\x20==\x205.0\x20)\x20{\x0a\x0a\x09\x09\x09\x09direction.z\x20*=\x20-1.0;\x20//\x20(\x20u,\x20v,\x20-1\x20)\x20neg\x20z\x0a\x0a\x09\x09\x09}\x0a\x0a\x09\x09\x09return\x20direction;\x0a\x0a\x09\x09}\x0a\x0a\x09\x09void\x20main()\x20{\x0a\x0a\x09\x09\x09vOutputDirection\x20=\x20getDirection(\x20uv,\x20faceIndex\x20);\x0a\x09\x09\x09gl_Position\x20=\x20vec4(\x20position,\x201.0\x20);\x0a\x0a\x09\x09}\x0a\x09',
                'fragmentShader': '\x0a\x0a\x09\x09\x09precision\x20mediump\x20float;\x0a\x09\x09\x09precision\x20mediump\x20int;\x0a\x0a\x09\x09\x09uniform\x20float\x20flipEnvMap;\x0a\x0a\x09\x09\x09varying\x20vec3\x20vOutputDirection;\x0a\x0a\x09\x09\x09uniform\x20samplerCube\x20envMap;\x0a\x0a\x09\x09\x09void\x20main()\x20{\x0a\x0a\x09\x09\x09\x09gl_FragColor\x20=\x20textureCube(\x20envMap,\x20vec3(\x20flipEnvMap\x20*\x20vOutputDirection.x,\x20vOutputDirection.yz\x20)\x20);\x0a\x0a\x09\x09\x09}\x0a\x09\x09',
                'blending': Q['XIg'],
                'depthTest': !0x1,
                'depthWrite': !0x1
            });
        }
    }
    ,
    0xf066: () => {}
    ,
    0x52dc: (r, F, E) => {
        E(0xbd95),
        E(0x1264d),
        E(0x1008e),
        E(0x11ded);
    }
    ,
    0x6bf: (r, F, E) => {
        E(0x52dc),
        E(0x144de);
    }
    ,
    0xf750: (r, F, E) => {
        E(0x1264d),
        E(0x6bf),
        E(0x134b),
        E(0x14890),
        E(0x1d6e),
        E(0x9a92),
        E(0x3c6d);
    }
    ,
    0x11562: (r, F, E) => {
        E(0xf750),
        E(0xbd95);
    }
    ,
    0x1819d: (r, F, E) => {
        E(0x169b1),
        E(0xf750),
        E(0x11562),
        E(0xf066);
    }
    ,
    0x1d6e: (r, F, E) => {
        E(0x52dc),
        E(0x1264d);
    }
    ,
    0x144de: (r, F, E) => {
        E(0x134b),
        E(0x1008e),
        E(0x52dc),
        (E(0x1d6e),
        E(0x3c6d),
        E(0x9a92),
        E(0x14890));
    }
    ,
    0x134b: (r, F, E) => {
        E(0x52dc),
        E(0x1264d);
    }
    ,
    0x3c6d: (r, F, E) => {
        E(0x1264d),
        E(0x52dc);
    }
    ,
    0x9a92: (r, F, E) => {
        E(0x52dc),
        E(0x1264d);
    }
    ,
    0x14890: (r, F, E) => {
        E(0x52dc),
        E(0x1264d);
    }
    ,
    0x131a1: (F, E, p) => {
        p['d'](E, {
            'i': () => d
        });
        var S = p(0x12e4b)
          , R = p(0x16835)
          , H = p(0x17dfd)
          , y = p(0x1008e)
          , d = function(P) {
            function Q(B, M, X, w, C, N) {
                var Z;
                void 0x0 === B && (B = 0x1),
                void 0x0 === M && (M = 0x1),
                void 0x0 === X && (X = 0x1),
                void 0x0 === w && (w = 0x1),
                void 0x0 === C && (C = 0x1),
                void 0x0 === N && (N = 0x1),
                (Z = P['call'](this) || this)['type'] = 'BoxGeometry',
                Z['parameters'] = {
                    'width': B,
                    'height': M,
                    'depth': X,
                    'widthSegments': w,
                    'heightSegments': C,
                    'depthSegments': N
                };
                var U = Z;
                w = Math['floor'](w),
                C = Math['floor'](C),
                N = Math['floor'](N);
                var T = []
                  , V = []
                  , G = []
                  , k = []
                  , W = 0x0
                  , x = 0x0;
                function I(q, K, Y, j, J, r0, r1, r2, r3, r4, r5) {
                    for (var r6 = r0 / r3, r7 = r1 / r4, r8 = r0 / 0x2, r9 = r1 / 0x2, rr = r2 / 0x2, rF = r3 + 0x1, rE = r4 + 0x1, rp = 0x0, rS = 0x0, re = new y['P'](), rR = 0x0; rR < rE; rR++)
                        for (var rH = rR * r7 - r9, ry = 0x0; ry < rF; ry++) {
                            var rd = ry * r6 - r8;
                            re[q] = rd * j,
                            re[K] = rH * J,
                            re[Y] = rr,
                            V['push'](re['x'], re['y'], re['z']),
                            re[q] = 0x0,
                            re[K] = 0x0,
                            re[Y] = r2 > 0x0 ? 0x1 : -0x1,
                            G['push'](re['x'], re['y'], re['z']),
                            k['push'](ry / r3),
                            k['push'](0x1 - rR / r4),
                            rp += 0x1;
                        }
                    for (var rP = 0x0; rP < r4; rP++)
                        for (var rQ = 0x0; rQ < r3; rQ++) {
                            var rB = W + rQ + rF * rP
                              , rM = W + rQ + rF * (rP + 0x1)
                              , rX = W + (rQ + 0x1) + rF * (rP + 0x1)
                              , rt = W + (rQ + 0x1) + rF * rP;
                            T['push'](rB, rM, rt),
                            T['push'](rM, rX, rt),
                            rS += 0x6;
                        }
                    U['addGroup'](x, rS, r5),
                    x += rS,
                    W += rp;
                }
                return I('z', 'y', 'x', -0x1, -0x1, X, M, B, N, C, 0x0),
                I('z', 'y', 'x', 0x1, -0x1, X, M, -B, N, C, 0x1),
                I('x', 'z', 'y', 0x1, 0x1, B, X, M, w, N, 0x2),
                I('x', 'z', 'y', 0x1, -0x1, B, X, -M, w, N, 0x3),
                I('x', 'y', 'z', 0x1, -0x1, B, M, X, w, C, 0x4),
                I('x', 'y', 'z', -0x1, -0x1, B, M, -X, w, C, 0x5),
                Z['setIndex'](T),
                Z['setAttribute']('position', new H['qt'](V,0x3)),
                Z['setAttribute']('normal', new H['qt'](G,0x3)),
                Z['setAttribute']('uv', new H['qt'](k,0x2)),
                Z;
            }
            return (0x0,
            S['A'])(Q, P),
            Q['prototype']['copy'] = function(B) {
                return P['prototype']['copy']['call'](this, B),
                this['parameters'] = Object['assign']({}, B['parameters']),
                this;
            }
            ,
            Q['fromJSON'] = function(B) {
                return new Q(B['width'],B['height'],B['depth'],B['widthSegments'],B['heightSegments'],B['depthSegments']);
            }
            ,
            Q;
        }(R['L']);
    }
    ,
    0x39e3: (r, F, E) => {
        E(0xf750),
        E(0x13a3a);
    }
    ,
    0xd666: (r, F, E) => {
        E(0x16835),
        E(0x17dfd),
        E(0x1008e),
        E(0x1264d);
    }
    ,
    0x16f21: (r, F, E) => {
        E(0xf824);
    }
    ,
    0x3450: (r, F, E) => {
        E(0xc538);
    }
    ,
    0x16eca: (r, F, E) => {
        E(0x16835),
        E(0x17dfd),
        E(0xbd95),
        E(0x37c8),
        E(0x1008e);
    }
    ,
    0x3071: (r, F, E) => {
        E(0x16835),
        E(0x17dfd),
        E(0x144de),
        E(0x1264d),
        E(0x1008e),
        E(0x11562),
        E(0xf066);
    }
    ,
    0xf151: (r, F, E) => {
        E(0xc538);
    }
    ,
    0x13a3a: (r, F, E) => {
        E(0x17dfd),
        E(0x16835),
        E(0x1008e),
        E(0x1264d),
        E(0xbd95);
    }
    ,
    0xbccb: (r, F, E) => {
        E(0xc538);
    }
    ,
    0xc538: (r, F, E) => {
        E(0x16835),
        E(0x17dfd),
        E(0x1008e),
        E(0x1264d);
    }
    ,
    0x12bd8: (r, F, E) => {
        E(0x16835),
        E(0x17dfd),
        E(0x1264d),
        E(0x1008e);
    }
    ,
    0xe96d: (r, F, E) => {
        E(0x16835),
        E(0x17dfd),
        E(0x11562),
        E(0xf066),
        E(0x1264d);
    }
    ,
    0x9a9c: (r, F, E) => {
        E(0xc538);
    }
    ,
    0x143d1: (r, F, E) => {
        E(0x16835),
        E(0x17dfd),
        E(0x1008e);
    }
    ,
    0x82fb: (r, F, E) => {
        E(0x16835),
        E(0x17dfd),
        E(0x1008e);
    }
    ,
    0x844c: (r, F, E) => {
        E(0x16835),
        E(0x17dfd),
        E(0x144de),
        E(0x1264d),
        E(0x1008e);
    }
    ,
    0xcde0: (r, F, E) => {
        E(0x1499a),
        E(0x617),
        E(0x17dfd),
        E(0x16835),
        E(0x169b1);
    }
    ,
    0x17e6f: (r, F, E) => {
        E(0x1499a),
        E(0x617),
        E(0x17dfd),
        E(0x16835);
    }
    ,
    0x1461c: (r, F, E) => {
        E(0x7002),
        E(0x1499a),
        E(0x617),
        E(0x17dfd),
        E(0x16835);
    }
    ,
    0xb396: (r, F, E) => {
        E(0xab79),
        E(0x1008e),
        E(0x1499a),
        E(0x169b1),
        E(0x617),
        E(0x16835),
        E(0x17dfd);
    }
    ,
    0x8d79: (r, F, E) => {
        E(0x1008e),
        E(0x16f53),
        E(0x7404),
        E(0x17dfd),
        E(0x16835),
        E(0x617);
    }
    ,
    0x14b85: (r, F, E) => {
        E(0x1499a),
        E(0x617),
        E(0x17dfd),
        E(0x16835),
        E(0x169b1);
    }
    ,
    0x71a1: (r, F, E) => {
        E(0x1008e),
        E(0x169b1),
        E(0x16f53),
        E(0x1152b),
        E(0x14baa),
        E(0xbccb),
        E(0x17dfd);
    }
    ,
    0x1a2f: (r, F, E) => {
        E(0x7404),
        E(0x1152b),
        E(0x617),
        E(0x14baa),
        E(0x17dfd),
        E(0x16835);
    }
    ,
    0x17c23: (r, F, E) => {
        E(0x1152b),
        E(0x14baa),
        E(0x11397);
    }
    ,
    0x7ebd: (r, F, E) => {
        E(0x1499a),
        E(0x617),
        E(0x17dfd),
        E(0x16835),
        E(0x169b1);
    }
    ,
    0x7396: (r, F, E) => {
        E(0x1499a),
        E(0x11ded),
        E(0x617),
        E(0x169b1),
        E(0x1008e),
        E(0x16835),
        E(0x17dfd);
    }
    ,
    0x15281: (r, F, E) => {
        E(0x1008e),
        E(0x16f53),
        E(0x1499a),
        E(0x617),
        E(0x17dfd),
        E(0x16835);
    }
    ,
    0x1503f: (r, F, E) => {
        E(0xe3ac),
        E(0xb8f1);
    }
    ,
    0x5eb0: (r, F, E) => {
        E(0xb8f1);
    }
    ,
    0xd109: (r, F, E) => {
        E(0x4fda),
        E(0x16e3b),
        E(0x1191);
    }
    ,
    0x1708b: (r, F, E) => {
        E(0x79b5),
        E(0x1008e),
        E(0x17dfd),
        E(0x16835),
        E(0x16e3b),
        E(0x1191),
        E(0x12e6c),
        E(0x76e),
        E(0xd3e8),
        E(0x8222),
        E(0x1078a);
    }
    ,
    0x350f: (r, F, E) => {
        E(0x172d2),
        E(0x16e3b),
        E(0x308),
        E(0x1191);
    }
    ,
    0x8558: (r, F, E) => {
        E(0x172d2),
        E(0x16e3b),
        E(0x2277),
        E(0x1191);
    }
    ,
    0x6235: (r, F, E) => {
        E['d'](F, {
            'h': () => p
        });
        var p = new function(S, R, H) {
            var y = this
              , d = !0x1
              , P = 0x0
              , Q = 0x0
              , B = void 0x0
              , M = [];
            this['onStart'] = void 0x0,
            this['onLoad'] = S,
            this['onProgress'] = R,
            this['onError'] = H,
            this['itemStart'] = function(X) {
                Q++,
                !0x1 === d && void 0x0 !== y['onStart'] && y['onStart'](X, P, Q),
                d = !0x0;
            }
            ,
            this['itemEnd'] = function(X) {
                P++,
                void 0x0 !== y['onProgress'] && y['onProgress'](X, P, Q),
                P === Q && (d = !0x1,
                void 0x0 !== y['onLoad'] && y['onLoad']());
            }
            ,
            this['itemError'] = function(X) {
                void 0x0 !== y['onError'] && y['onError'](X);
            }
            ,
            this['resolveURL'] = function(X) {
                return B ? B(X) : X;
            }
            ,
            this['setURLModifier'] = function(X) {
                return B = X,
                this;
            }
            ,
            this['addHandler'] = function(X, m) {
                return M['push'](X, m),
                this;
            }
            ,
            this['removeHandler'] = function(X) {
                var m = M['indexOf'](X);
                return -0x1 !== m && M['splice'](m, 0x2),
                this;
            }
            ,
            this['getHandler'] = function(X) {
                for (var m = 0x0, w = M['length']; m < w; m += 0x2) {
                    var l = M[m]
                      , C = M[m + 0x1];
                    if (l['global'] && (l['lastIndex'] = 0x0),
                    l['test'](X))
                        return C;
                }
                return null;
            }
            ;
        }
        ();
    }
    ,
    0x1036c: (r, F, E) => {
        E(0x169b1),
        E(0x1264d),
        E(0x1008e),
        E(0xb3ef),
        E(0x3e78),
        E(0x11ded),
        E(0x16e3b),
        E(0x1191),
        E(0x13eec);
    }
    ,
    0x16d92: (r, F, E) => {
        E(0xd5e4);
        var p = E(0x172d2);
        E(0x76e),
        E(0x169b1),
        E(0x16f53),
        E(0x658b),
        E(0x4bd8),
        E(0xad70),
        E(0x137fb),
        E(0xf5e1),
        E(0x7404),
        E(0x11f76),
        E(0x1499a),
        E(0x138bf),
        E(0x1152b),
        E(0x162d1),
        E(0xad2c),
        E(0x8fb1),
        E(0x11562),
        E(0x12331),
        E(0xb9f2),
        E(0x31f1),
        E(0x10c9e),
        E(0x12c97),
        E(0x1535f),
        E(0x1348d),
        E(0x5eb0),
        E(0x1503f),
        E(0x17743),
        E(0x152d9),
        E(0x1ea9),
        E(0xb12c),
        E(0x17417),
        E(0x14f63),
        E(0x2277),
        E(0x14b92),
        E(0x6235),
        E(0x4fda),
        E(0x1036c),
        E(0x1708b),
        E(0x1191),
        E(0x16e3b),
        E(0x22e6),
        E(0x1078a),
        E(0x7002),
        E(0x79b5),
        p['UTZ'],
        p['hy7'],
        p['xFO'],
        p['wfO'],
        p['uV5'],
        p['Om'],
        p['GJx'],
        p['ghU'],
        p['kTW'],
        p['hxR'],
        p['pHI'],
        p['Cfg'],
        p['k6q'],
        p['kRr'],
        p['$_I'];
    }
    ,
    0x11396: (r, F, E) => {
        E(0x617);
    }
    ,
    0x10849: (F, E, p) => {
        p['d'](E, {
            'i': () => B
        });
        var S = p(0x14124)
          , R = p(0x12e4b)
          , H = p(0x169b1)
          , y = p(0x161ea)
          , d = p(0x172d2)
          , P = p(0xbd95)
          , Q = 0x0
          , B = function(M) {
            function X() {
                var w;
                return (w = M['call'](this) || this)['isMaterial'] = !0x0,
                Object['defineProperty'](w, 'id', {
                    'value': Q++
                }),
                w['uuid'] = P['lk'](),
                w['name'] = '',
                w['type'] = 'Material',
                w['blending'] = d['NTi'],
                w['side'] = d['hB5'],
                w['vertexColors'] = !0x1,
                w['opacity'] = 0x1,
                w['transparent'] = !0x1,
                w['alphaHash'] = !0x1,
                w['blendSrc'] = d['ie2'],
                w['blendDst'] = d['OuU'],
                w['blendEquation'] = d['gO9'],
                w['blendSrcAlpha'] = null,
                w['blendDstAlpha'] = null,
                w['blendEquationAlpha'] = null,
                w['blendColor'] = new H['Q'](0x0,0x0,0x0),
                w['blendAlpha'] = 0x0,
                w['depthFunc'] = d['xSv'],
                w['depthTest'] = !0x0,
                w['depthWrite'] = !0x0,
                w['stencilWriteMask'] = 0xff,
                w['stencilFunc'] = d['sKt'],
                w['stencilRef'] = 0x0,
                w['stencilFuncMask'] = 0xff,
                w['stencilFail'] = d['VVr'],
                w['stencilZFail'] = d['VVr'],
                w['stencilZPass'] = d['VVr'],
                w['stencilWrite'] = !0x1,
                w['clippingPlanes'] = null,
                w['clipIntersection'] = !0x1,
                w['clipShadows'] = !0x1,
                w['shadowSide'] = null,
                w['colorWrite'] = !0x0,
                w['precision'] = null,
                w['polygonOffset'] = !0x1,
                w['polygonOffsetFactor'] = 0x0,
                w['polygonOffsetUnits'] = 0x0,
                w['dithering'] = !0x1,
                w['alphaToCoverage'] = !0x1,
                w['premultipliedAlpha'] = !0x1,
                w['forceSinglePass'] = !0x1,
                w['visible'] = !0x0,
                w['toneMapped'] = !0x0,
                w['userData'] = {},
                w['version'] = 0x0,
                w['_alphaTest'] = 0x0,
                w;
            }
            (0x0,
            R['A'])(X, M);
            var m = X['prototype'];
            return m['onBuild'] = function() {}
            ,
            m['onBeforeRender'] = function() {}
            ,
            m['onBeforeCompile'] = function() {}
            ,
            m['customProgramCacheKey'] = function() {
                return this['onBeforeCompile']['toString']();
            }
            ,
            m['setValues'] = function(w) {
                if (void 0x0 !== w)
                    for (var C in w) {
                        var N = w[C];
                        if (void 0x0 !== N) {
                            var Z = this[C];
                            void 0x0 !== Z ? Z && Z['isColor'] ? Z['set'](N) : Z && Z['isVector3'] && N && N['isVector3'] ? Z['copy'](N) : this[C] = N : console['warn']('THREE.Material:\x20\x27' + C + '\x27\x20is\x20not\x20a\x20property\x20of\x20THREE.' + this['type'] + '.');
                        } else
                            console['warn']('THREE.Material:\x20parameter\x20\x27' + C + '\x27\x20has\x20value\x20of\x20undefined.');
                    }
            }
            ,
            m['toJSON'] = function(w) {
                var C = void 0x0 === w || 'string' == typeof w;
                C && (w = {
                    'textures': {},
                    'images': {}
                });
                var N = {
                    'metadata': {
                        'version': 4.6,
                        'type': 'Material',
                        'generator': 'Material.toJSON'
                    }
                };
                function Z(T) {
                    var V = [];
                    for (var G in T) {
                        var k = T[G];
                        delete k['metadata'],
                        V['push'](k);
                    }
                    return V;
                }
                if (N['uuid'] = this['uuid'],
                N['type'] = this['type'],
                '' !== this['name'] && (N['name'] = this['name']),
                this['color'] && this['color']['isColor'] && (N['color'] = this['color']['getHex']()),
                void 0x0 !== this['roughness'] && (N['roughness'] = this['roughness']),
                void 0x0 !== this['metalness'] && (N['metalness'] = this['metalness']),
                void 0x0 !== this['sheen'] && (N['sheen'] = this['sheen']),
                this['sheenColor'] && this['sheenColor']['isColor'] && (N['sheenColor'] = this['sheenColor']['getHex']()),
                void 0x0 !== this['sheenRoughness'] && (N['sheenRoughness'] = this['sheenRoughness']),
                this['emissive'] && this['emissive']['isColor'] && (N['emissive'] = this['emissive']['getHex']()),
                this['emissiveIntensity'] && 0x1 !== this['emissiveIntensity'] && (N['emissiveIntensity'] = this['emissiveIntensity']),
                this['specular'] && this['specular']['isColor'] && (N['specular'] = this['specular']['getHex']()),
                void 0x0 !== this['specularIntensity'] && (N['specularIntensity'] = this['specularIntensity']),
                this['specularColor'] && this['specularColor']['isColor'] && (N['specularColor'] = this['specularColor']['getHex']()),
                void 0x0 !== this['shininess'] && (N['shininess'] = this['shininess']),
                void 0x0 !== this['clearcoat'] && (N['clearcoat'] = this['clearcoat']),
                void 0x0 !== this['clearcoatRoughness'] && (N['clearcoatRoughness'] = this['clearcoatRoughness']),
                this['clearcoatMap'] && this['clearcoatMap']['isTexture'] && (N['clearcoatMap'] = this['clearcoatMap']['toJSON'](w)['uuid']),
                this['clearcoatRoughnessMap'] && this['clearcoatRoughnessMap']['isTexture'] && (N['clearcoatRoughnessMap'] = this['clearcoatRoughnessMap']['toJSON'](w)['uuid']),
                this['clearcoatNormalMap'] && this['clearcoatNormalMap']['isTexture'] && (N['clearcoatNormalMap'] = this['clearcoatNormalMap']['toJSON'](w)['uuid'],
                N['clearcoatNormalScale'] = this['clearcoatNormalScale']['toArray']()),
                void 0x0 !== this['iridescence'] && (N['iridescence'] = this['iridescence']),
                void 0x0 !== this['iridescenceIOR'] && (N['iridescenceIOR'] = this['iridescenceIOR']),
                void 0x0 !== this['iridescenceThicknessRange'] && (N['iridescenceThicknessRange'] = this['iridescenceThicknessRange']),
                this['iridescenceMap'] && this['iridescenceMap']['isTexture'] && (N['iridescenceMap'] = this['iridescenceMap']['toJSON'](w)['uuid']),
                this['iridescenceThicknessMap'] && this['iridescenceThicknessMap']['isTexture'] && (N['iridescenceThicknessMap'] = this['iridescenceThicknessMap']['toJSON'](w)['uuid']),
                void 0x0 !== this['anisotropy'] && (N['anisotropy'] = this['anisotropy']),
                void 0x0 !== this['anisotropyRotation'] && (N['anisotropyRotation'] = this['anisotropyRotation']),
                this['anisotropyMap'] && this['anisotropyMap']['isTexture'] && (N['anisotropyMap'] = this['anisotropyMap']['toJSON'](w)['uuid']),
                this['map'] && this['map']['isTexture'] && (N['map'] = this['map']['toJSON'](w)['uuid']),
                this['matcap'] && this['matcap']['isTexture'] && (N['matcap'] = this['matcap']['toJSON'](w)['uuid']),
                this['alphaMap'] && this['alphaMap']['isTexture'] && (N['alphaMap'] = this['alphaMap']['toJSON'](w)['uuid']),
                this['lightMap'] && this['lightMap']['isTexture'] && (N['lightMap'] = this['lightMap']['toJSON'](w)['uuid'],
                N['lightMapIntensity'] = this['lightMapIntensity']),
                this['aoMap'] && this['aoMap']['isTexture'] && (N['aoMap'] = this['aoMap']['toJSON'](w)['uuid'],
                N['aoMapIntensity'] = this['aoMapIntensity']),
                this['bumpMap'] && this['bumpMap']['isTexture'] && (N['bumpMap'] = this['bumpMap']['toJSON'](w)['uuid'],
                N['bumpScale'] = this['bumpScale']),
                this['normalMap'] && this['normalMap']['isTexture'] && (N['normalMap'] = this['normalMap']['toJSON'](w)['uuid'],
                N['normalMapType'] = this['normalMapType'],
                N['normalScale'] = this['normalScale']['toArray']()),
                this['displacementMap'] && this['displacementMap']['isTexture'] && (N['displacementMap'] = this['displacementMap']['toJSON'](w)['uuid'],
                N['displacementScale'] = this['displacementScale'],
                N['displacementBias'] = this['displacementBias']),
                this['roughnessMap'] && this['roughnessMap']['isTexture'] && (N['roughnessMap'] = this['roughnessMap']['toJSON'](w)['uuid']),
                this['metalnessMap'] && this['metalnessMap']['isTexture'] && (N['metalnessMap'] = this['metalnessMap']['toJSON'](w)['uuid']),
                this['emissiveMap'] && this['emissiveMap']['isTexture'] && (N['emissiveMap'] = this['emissiveMap']['toJSON'](w)['uuid']),
                this['specularMap'] && this['specularMap']['isTexture'] && (N['specularMap'] = this['specularMap']['toJSON'](w)['uuid']),
                this['specularIntensityMap'] && this['specularIntensityMap']['isTexture'] && (N['specularIntensityMap'] = this['specularIntensityMap']['toJSON'](w)['uuid']),
                this['specularColorMap'] && this['specularColorMap']['isTexture'] && (N['specularColorMap'] = this['specularColorMap']['toJSON'](w)['uuid']),
                this['envMap'] && this['envMap']['isTexture'] && (N['envMap'] = this['envMap']['toJSON'](w)['uuid'],
                void 0x0 !== this['combine'] && (N['combine'] = this['combine'])),
                void 0x0 !== this['envMapIntensity'] && (N['envMapIntensity'] = this['envMapIntensity']),
                void 0x0 !== this['reflectivity'] && (N['reflectivity'] = this['reflectivity']),
                void 0x0 !== this['refractionRatio'] && (N['refractionRatio'] = this['refractionRatio']),
                this['gradientMap'] && this['gradientMap']['isTexture'] && (N['gradientMap'] = this['gradientMap']['toJSON'](w)['uuid']),
                void 0x0 !== this['transmission'] && (N['transmission'] = this['transmission']),
                this['transmissionMap'] && this['transmissionMap']['isTexture'] && (N['transmissionMap'] = this['transmissionMap']['toJSON'](w)['uuid']),
                void 0x0 !== this['thickness'] && (N['thickness'] = this['thickness']),
                this['thicknessMap'] && this['thicknessMap']['isTexture'] && (N['thicknessMap'] = this['thicknessMap']['toJSON'](w)['uuid']),
                void 0x0 !== this['attenuationDistance'] && this['attenuationDistance'] !== 0x1 / 0x0 && (N['attenuationDistance'] = this['attenuationDistance']),
                void 0x0 !== this['attenuationColor'] && (N['attenuationColor'] = this['attenuationColor']['getHex']()),
                void 0x0 !== this['size'] && (N['size'] = this['size']),
                null !== this['shadowSide'] && (N['shadowSide'] = this['shadowSide']),
                void 0x0 !== this['sizeAttenuation'] && (N['sizeAttenuation'] = this['sizeAttenuation']),
                this['blending'] !== d['NTi'] && (N['blending'] = this['blending']),
                this['side'] !== d['hB5'] && (N['side'] = this['side']),
                !0x0 === this['vertexColors'] && (N['vertexColors'] = !0x0),
                this['opacity'] < 0x1 && (N['opacity'] = this['opacity']),
                !0x0 === this['transparent'] && (N['transparent'] = !0x0),
                this['blendSrc'] !== d['ie2'] && (N['blendSrc'] = this['blendSrc']),
                this['blendDst'] !== d['OuU'] && (N['blendDst'] = this['blendDst']),
                this['blendEquation'] !== d['gO9'] && (N['blendEquation'] = this['blendEquation']),
                null !== this['blendSrcAlpha'] && (N['blendSrcAlpha'] = this['blendSrcAlpha']),
                null !== this['blendDstAlpha'] && (N['blendDstAlpha'] = this['blendDstAlpha']),
                null !== this['blendEquationAlpha'] && (N['blendEquationAlpha'] = this['blendEquationAlpha']),
                this['blendColor'] && this['blendColor']['isColor'] && (N['blendColor'] = this['blendColor']['getHex']()),
                0x0 !== this['blendAlpha'] && (N['blendAlpha'] = this['blendAlpha']),
                this['depthFunc'] !== d['xSv'] && (N['depthFunc'] = this['depthFunc']),
                !0x1 === this['depthTest'] && (N['depthTest'] = this['depthTest']),
                !0x1 === this['depthWrite'] && (N['depthWrite'] = this['depthWrite']),
                !0x1 === this['colorWrite'] && (N['colorWrite'] = this['colorWrite']),
                0xff !== this['stencilWriteMask'] && (N['stencilWriteMask'] = this['stencilWriteMask']),
                this['stencilFunc'] !== d['sKt'] && (N['stencilFunc'] = this['stencilFunc']),
                0x0 !== this['stencilRef'] && (N['stencilRef'] = this['stencilRef']),
                0xff !== this['stencilFuncMask'] && (N['stencilFuncMask'] = this['stencilFuncMask']),
                this['stencilFail'] !== d['VVr'] && (N['stencilFail'] = this['stencilFail']),
                this['stencilZFail'] !== d['VVr'] && (N['stencilZFail'] = this['stencilZFail']),
                this['stencilZPass'] !== d['VVr'] && (N['stencilZPass'] = this['stencilZPass']),
                !0x0 === this['stencilWrite'] && (N['stencilWrite'] = this['stencilWrite']),
                void 0x0 !== this['rotation'] && 0x0 !== this['rotation'] && (N['rotation'] = this['rotation']),
                !0x0 === this['polygonOffset'] && (N['polygonOffset'] = !0x0),
                0x0 !== this['polygonOffsetFactor'] && (N['polygonOffsetFactor'] = this['polygonOffsetFactor']),
                0x0 !== this['polygonOffsetUnits'] && (N['polygonOffsetUnits'] = this['polygonOffsetUnits']),
                void 0x0 !== this['linewidth'] && 0x1 !== this['linewidth'] && (N['linewidth'] = this['linewidth']),
                void 0x0 !== this['dashSize'] && (N['dashSize'] = this['dashSize']),
                void 0x0 !== this['gapSize'] && (N['gapSize'] = this['gapSize']),
                void 0x0 !== this['scale'] && (N['scale'] = this['scale']),
                !0x0 === this['dithering'] && (N['dithering'] = !0x0),
                this['alphaTest'] > 0x0 && (N['alphaTest'] = this['alphaTest']),
                !0x0 === this['alphaHash'] && (N['alphaHash'] = !0x0),
                !0x0 === this['alphaToCoverage'] && (N['alphaToCoverage'] = !0x0),
                !0x0 === this['premultipliedAlpha'] && (N['premultipliedAlpha'] = !0x0),
                !0x0 === this['forceSinglePass'] && (N['forceSinglePass'] = !0x0),
                !0x0 === this['wireframe'] && (N['wireframe'] = !0x0),
                this['wireframeLinewidth'] > 0x1 && (N['wireframeLinewidth'] = this['wireframeLinewidth']),
                'round' !== this['wireframeLinecap'] && (N['wireframeLinecap'] = this['wireframeLinecap']),
                'round' !== this['wireframeLinejoin'] && (N['wireframeLinejoin'] = this['wireframeLinejoin']),
                !0x0 === this['flatShading'] && (N['flatShading'] = !0x0),
                !0x1 === this['visible'] && (N['visible'] = !0x1),
                !0x1 === this['toneMapped'] && (N['toneMapped'] = !0x1),
                !0x1 === this['fog'] && (N['fog'] = !0x1),
                Object['keys'](this['userData'])['length'] > 0x0 && (N['userData'] = this['userData']),
                C) {
                    var h = Z(w['textures'])
                      , U = Z(w['images']);
                    h['length'] > 0x0 && (N['textures'] = h),
                    U['length'] > 0x0 && (N['images'] = U);
                }
                return N;
            }
            ,
            m['clone'] = function() {
                return new this['constructor']()['copy'](this);
            }
            ,
            m['copy'] = function(w) {
                this['name'] = w['name'],
                this['blending'] = w['blending'],
                this['side'] = w['side'],
                this['vertexColors'] = w['vertexColors'],
                this['opacity'] = w['opacity'],
                this['transparent'] = w['transparent'],
                this['blendSrc'] = w['blendSrc'],
                this['blendDst'] = w['blendDst'],
                this['blendEquation'] = w['blendEquation'],
                this['blendSrcAlpha'] = w['blendSrcAlpha'],
                this['blendDstAlpha'] = w['blendDstAlpha'],
                this['blendEquationAlpha'] = w['blendEquationAlpha'],
                this['blendColor']['copy'](w['blendColor']),
                this['blendAlpha'] = w['blendAlpha'],
                this['depthFunc'] = w['depthFunc'],
                this['depthTest'] = w['depthTest'],
                this['depthWrite'] = w['depthWrite'],
                this['stencilWriteMask'] = w['stencilWriteMask'],
                this['stencilFunc'] = w['stencilFunc'],
                this['stencilRef'] = w['stencilRef'],
                this['stencilFuncMask'] = w['stencilFuncMask'],
                this['stencilFail'] = w['stencilFail'],
                this['stencilZFail'] = w['stencilZFail'],
                this['stencilZPass'] = w['stencilZPass'],
                this['stencilWrite'] = w['stencilWrite'];
                var C = w['clippingPlanes']
                  , N = null;
                if (null !== C) {
                    var Z = C['length'];
                    N = new Array(Z);
                    for (var h = 0x0; h !== Z; ++h)
                        N[h] = C[h]['clone']();
                }
                return this['clippingPlanes'] = N,
                this['clipIntersection'] = w['clipIntersection'],
                this['clipShadows'] = w['clipShadows'],
                this['shadowSide'] = w['shadowSide'],
                this['colorWrite'] = w['colorWrite'],
                this['precision'] = w['precision'],
                this['polygonOffset'] = w['polygonOffset'],
                this['polygonOffsetFactor'] = w['polygonOffsetFactor'],
                this['polygonOffsetUnits'] = w['polygonOffsetUnits'],
                this['dithering'] = w['dithering'],
                this['alphaTest'] = w['alphaTest'],
                this['alphaHash'] = w['alphaHash'],
                this['alphaToCoverage'] = w['alphaToCoverage'],
                this['premultipliedAlpha'] = w['premultipliedAlpha'],
                this['forceSinglePass'] = w['forceSinglePass'],
                this['visible'] = w['visible'],
                this['toneMapped'] = w['toneMapped'],
                this['userData'] = JSON['parse'](JSON['stringify'](w['userData'])),
                this;
            }
            ,
            m['dispose'] = function() {
                this['dispatchEvent']({
                    'type': 'dispose'
                });
            }
            ,
            (0x0,
            S['A'])(X, [{
                'key': 'alphaTest',
                'get': function() {
                    return this['_alphaTest'];
                },
                'set': function(w) {
                    this['_alphaTest'] > 0x0 != w > 0x0 && this['version']++,
                    this['_alphaTest'] = w;
                }
            }, {
                'key': 'needsUpdate',
                'set': function(w) {
                    !0x0 === w && this['version']++;
                }
            }]);
        }(y['Q']);
    }
    ,
    0x14baa: (F, E, p) => {
        p['d'](E, {
            'V': () => d
        });
        var S = p(0x12e4b)
          , R = p(0x10849)
          , H = p(0x172d2)
          , y = p(0x169b1)
          , d = function(P) {
            function Q(B) {
                var M;
                return (M = P['call'](this) || this)['isMeshBasicMaterial'] = !0x0,
                M['type'] = 'MeshBasicMaterial',
                M['color'] = new y['Q'](0xffffff),
                M['map'] = null,
                M['lightMap'] = null,
                M['lightMapIntensity'] = 0x1,
                M['aoMap'] = null,
                M['aoMapIntensity'] = 0x1,
                M['specularMap'] = null,
                M['alphaMap'] = null,
                M['envMap'] = null,
                M['combine'] = H['caT'],
                M['reflectivity'] = 0x1,
                M['refractionRatio'] = 0.98,
                M['wireframe'] = !0x1,
                M['wireframeLinewidth'] = 0x1,
                M['wireframeLinecap'] = 'round',
                M['wireframeLinejoin'] = 'round',
                M['fog'] = !0x0,
                M['setValues'](B),
                M;
            }
            return (0x0,
            S['A'])(Q, P),
            Q['prototype']['copy'] = function(B) {
                return P['prototype']['copy']['call'](this, B),
                this['color']['copy'](B['color']),
                this['map'] = B['map'],
                this['lightMap'] = B['lightMap'],
                this['lightMapIntensity'] = B['lightMapIntensity'],
                this['aoMap'] = B['aoMap'],
                this['aoMapIntensity'] = B['aoMapIntensity'],
                this['specularMap'] = B['specularMap'],
                this['alphaMap'] = B['alphaMap'],
                this['envMap'] = B['envMap'],
                this['combine'] = B['combine'],
                this['reflectivity'] = B['reflectivity'],
                this['refractionRatio'] = B['refractionRatio'],
                this['wireframe'] = B['wireframe'],
                this['wireframeLinewidth'] = B['wireframeLinewidth'],
                this['wireframeLinecap'] = B['wireframeLinecap'],
                this['wireframeLinejoin'] = B['wireframeLinejoin'],
                this['fog'] = B['fog'],
                this;
            }
            ,
            Q;
        }(R['i']);
    }
    ,
    0x1bfd: (F, E, p) => {
        p['d'](E, {
            'C': () => y
        });
        var S = p(0x12e4b)
          , R = p(0x10849)
          , H = p(0x172d2)
          , y = function(d) {
            function P(Q) {
                var B;
                return (B = d['call'](this) || this)['isMeshDepthMaterial'] = !0x0,
                B['type'] = 'MeshDepthMaterial',
                B['depthPacking'] = H['Rkk'],
                B['map'] = null,
                B['alphaMap'] = null,
                B['displacementMap'] = null,
                B['displacementScale'] = 0x1,
                B['displacementBias'] = 0x0,
                B['wireframe'] = !0x1,
                B['wireframeLinewidth'] = 0x1,
                B['setValues'](Q),
                B;
            }
            return (0x0,
            S['A'])(P, d),
            P['prototype']['copy'] = function(Q) {
                return d['prototype']['copy']['call'](this, Q),
                this['depthPacking'] = Q['depthPacking'],
                this['map'] = Q['map'],
                this['alphaMap'] = Q['alphaMap'],
                this['displacementMap'] = Q['displacementMap'],
                this['displacementScale'] = Q['displacementScale'],
                this['displacementBias'] = Q['displacementBias'],
                this['wireframe'] = Q['wireframe'],
                this['wireframeLinewidth'] = Q['wireframeLinewidth'],
                this;
            }
            ,
            P;
        }(R['i']);
    }
    ,
    0x11833: (F, E, p) => {
        p['d'](E, {
            'a': () => R
        });
        var S = p(0x12e4b)
          , R = function(H) {
            function y(d) {
                var P;
                return (P = H['call'](this) || this)['isMeshDistanceMaterial'] = !0x0,
                P['type'] = 'MeshDistanceMaterial',
                P['map'] = null,
                P['alphaMap'] = null,
                P['displacementMap'] = null,
                P['displacementScale'] = 0x1,
                P['displacementBias'] = 0x0,
                P['setValues'](d),
                P;
            }
            return (0x0,
            S['A'])(y, H),
            y['prototype']['copy'] = function(d) {
                return H['prototype']['copy']['call'](this, d),
                this['map'] = d['map'],
                this['alphaMap'] = d['alphaMap'],
                this['displacementMap'] = d['displacementMap'],
                this['displacementScale'] = d['displacementScale'],
                this['displacementBias'] = d['displacementBias'],
                this;
            }
            ,
            y;
        }(p(0x10849)['i']);
    }
    ,
    0x10b7d: (r, F, E) => {
        E(0x172d2),
        E(0x10849),
        E(0x1264d),
        E(0x169b1);
    }
    ,
    0x2ef2: (r, F, E) => {
        E(0x172d2),
        E(0x10849),
        E(0x1264d),
        E(0x169b1);
    }
    ,
    0x8ab: (r, F, E) => {
        E(0x172d2),
        E(0x10849),
        E(0x1264d);
    }
    ,
    0x10c4e: (r, F, E) => {
        E(0x172d2),
        E(0x10849),
        E(0x1264d),
        E(0x169b1);
    }
    ,
    0x14d0c: (r, F, E) => {
        E(0x172d2),
        E(0x10849),
        E(0x1264d),
        E(0x169b1);
    }
    ,
    0x5d74: (r, F, E) => {
        E(0x7026);
    }
    ,
    0x7026: (F, E, p) => {
        p['d'](E, {
            'B': () => y
        });
        var S = p(0x12e4b)
          , R = p(0x10849)
          , H = p(0x41ef)
          , y = function(d) {
            function P(B) {
                var M;
                return (M = d['call'](this) || this)['isShaderMaterial'] = !0x0,
                M['type'] = 'ShaderMaterial',
                M['defines'] = {},
                M['uniforms'] = {},
                M['uniformsGroups'] = [],
                M['vertexShader'] = '\x0avoid\x20main()\x20{\x0a\x09gl_Position\x20=\x20projectionMatrix\x20*\x20modelViewMatrix\x20*\x20vec4(\x20position,\x201.0\x20);\x0a}\x0a',
                M['fragmentShader'] = '\x0avoid\x20main()\x20{\x0a\x09gl_FragColor\x20=\x20vec4(\x201.0,\x200.0,\x200.0,\x201.0\x20);\x0a}\x0a',
                M['linewidth'] = 0x1,
                M['wireframe'] = !0x1,
                M['wireframeLinewidth'] = 0x1,
                M['fog'] = !0x1,
                M['lights'] = !0x1,
                M['clipping'] = !0x1,
                M['forceSinglePass'] = !0x0,
                M['extensions'] = {
                    'derivatives': !0x1,
                    'fragDepth': !0x1,
                    'drawBuffers': !0x1,
                    'shaderTextureLOD': !0x1
                },
                M['defaultAttributeValues'] = {
                    'color': [0x1, 0x1, 0x1],
                    'uv': [0x0, 0x0],
                    'uv1': [0x0, 0x0]
                },
                M['index0AttributeName'] = void 0x0,
                M['uniformsNeedUpdate'] = !0x1,
                M['glslVersion'] = null,
                void 0x0 !== B && M['setValues'](B),
                M;
            }
            (0x0,
            S['A'])(P, d);
            var Q = P['prototype'];
            return Q['copy'] = function(B) {
                return d['prototype']['copy']['call'](this, B),
                this['fragmentShader'] = B['fragmentShader'],
                this['vertexShader'] = B['vertexShader'],
                this['uniforms'] = (0x0,
                H['lx'])(B['uniforms']),
                this['uniformsGroups'] = (0x0,
                H['Jd'])(B['uniformsGroups']),
                this['defines'] = Object['assign']({}, B['defines']),
                this['wireframe'] = B['wireframe'],
                this['wireframeLinewidth'] = B['wireframeLinewidth'],
                this['fog'] = B['fog'],
                this['lights'] = B['lights'],
                this['clipping'] = B['clipping'],
                this['extensions'] = Object['assign']({}, B['extensions']),
                this['glslVersion'] = B['glslVersion'],
                this;
            }
            ,
            Q['toJSON'] = function(B) {
                var M = d['prototype']['toJSON']['call'](this, B);
                for (var X in (M['glslVersion'] = this['glslVersion'],
                M['uniforms'] = {},
                this['uniforms'])) {
                    var m = this['uniforms'][X]['value'];
                    m && m['isTexture'] ? M['uniforms'][X] = {
                        'type': 't',
                        'value': m['toJSON'](B)['uuid']
                    } : m && m['isColor'] ? M['uniforms'][X] = {
                        'type': 'c',
                        'value': m['getHex']()
                    } : m && m['isVector2'] ? M['uniforms'][X] = {
                        'type': 'v2',
                        'value': m['toArray']()
                    } : m && m['isVector3'] ? M['uniforms'][X] = {
                        'type': 'v3',
                        'value': m['toArray']()
                    } : m && m['isVector4'] ? M['uniforms'][X] = {
                        'type': 'v4',
                        'value': m['toArray']()
                    } : m && m['isMatrix3'] ? M['uniforms'][X] = {
                        'type': 'm3',
                        'value': m['toArray']()
                    } : m && m['isMatrix4'] ? M['uniforms'][X] = {
                        'type': 'm4',
                        'value': m['toArray']()
                    } : M['uniforms'][X] = {
                        'value': m
                    };
                }
                Object['keys'](this['defines'])['length'] > 0x0 && (M['defines'] = this['defines']),
                M['vertexShader'] = this['vertexShader'],
                M['fragmentShader'] = this['fragmentShader'],
                M['lights'] = this['lights'],
                M['clipping'] = this['clipping'];
                var w = {};
                for (var l in this['extensions'])
                    !0x0 === this['extensions'][l] && (w[l] = !0x0);
                return Object['keys'](w)['length'] > 0x0 && (M['extensions'] = w),
                M;
            }
            ,
            P;
        }(R['i']);
    }
    ,
    0x259: (r, F, E) => {
        E(0x10849),
        E(0x169b1);
    }
    ,
    0xb7f1: (r, F, E) => {}
    ,
    0x7002: (F, E, S) => {
        S['d'](E, {
            'N': () => H
        });
        var R = S(0x1008e)
          , H = (function() {
            function k(x, I) {
                void 0x0 === x && (x = new R['P'](0x1 / 0x0,0x1 / 0x0,0x1 / 0x0)),
                void 0x0 === I && (I = new R['P'](-0x1 / 0x0,-0x1 / 0x0,-0x1 / 0x0)),
                this['isBox3'] = !0x0,
                this['min'] = x,
                this['max'] = I;
            }
            var W = k['prototype'];
            return W['set'] = function(x, I) {
                return this['min']['copy'](x),
                this['max']['copy'](I),
                this;
            }
            ,
            W['setFromArray'] = function(x) {
                this['makeEmpty']();
                for (var I = 0x0, L = x['length']; I < L; I += 0x3)
                    this['expandByPoint'](P['fromArray'](x, I));
                return this;
            }
            ,
            W['setFromBufferAttribute'] = function(x) {
                this['makeEmpty']();
                for (var I = 0x0, L = x['count']; I < L; I++)
                    this['expandByPoint'](P['fromBufferAttribute'](x, I));
                return this;
            }
            ,
            W['setFromPoints'] = function(x) {
                this['makeEmpty']();
                for (var I = 0x0, L = x['length']; I < L; I++)
                    this['expandByPoint'](x[I]);
                return this;
            }
            ,
            W['setFromCenterAndSize'] = function(x, I) {
                var L = P['copy'](I)['multiplyScalar'](0.5);
                return this['min']['copy'](x)['sub'](L),
                this['max']['copy'](x)['add'](L),
                this;
            }
            ,
            W['setFromObject'] = function(x, I) {
                return void 0x0 === I && (I = !0x1),
                this['makeEmpty'](),
                this['expandByObject'](x, I);
            }
            ,
            W['clone'] = function() {
                return new this['constructor']()['copy'](this);
            }
            ,
            W['copy'] = function(x) {
                return this['min']['copy'](x['min']),
                this['max']['copy'](x['max']),
                this;
            }
            ,
            W['makeEmpty'] = function() {
                return this['min']['x'] = this['min']['y'] = this['min']['z'] = 0x1 / 0x0,
                this['max']['x'] = this['max']['y'] = this['max']['z'] = -0x1 / 0x0,
                this;
            }
            ,
            W['isEmpty'] = function() {
                return this['max']['x'] < this['min']['x'] || this['max']['y'] < this['min']['y'] || this['max']['z'] < this['min']['z'];
            }
            ,
            W['getCenter'] = function(x) {
                return this['isEmpty']() ? x['set'](0x0, 0x0, 0x0) : x['addVectors'](this['min'], this['max'])['multiplyScalar'](0.5);
            }
            ,
            W['getSize'] = function(x) {
                return this['isEmpty']() ? x['set'](0x0, 0x0, 0x0) : x['subVectors'](this['max'], this['min']);
            }
            ,
            W['expandByPoint'] = function(x) {
                return this['min']['min'](x),
                this['max']['max'](x),
                this;
            }
            ,
            W['expandByVector'] = function(x) {
                return this['min']['sub'](x),
                this['max']['add'](x),
                this;
            }
            ,
            W['expandByScalar'] = function(x) {
                return this['min']['addScalar'](-x),
                this['max']['addScalar'](x),
                this;
            }
            ,
            W['expandByObject'] = function(x, I) {
                void 0x0 === I && (I = !0x1),
                x['updateWorldMatrix'](!0x1, !0x1);
                var L = x['geometry'];
                if (void 0x0 !== L) {
                    var q = L['getAttribute']('position');
                    if (!0x0 === I && void 0x0 !== q && !0x0 !== x['isInstancedMesh']) {
                        for (var K = 0x0, Y = q['count']; K < Y; K++)
                            !0x0 === x['isMesh'] ? x['getVertexPosition'](K, P) : P['fromBufferAttribute'](q, K),
                            P['applyMatrix4'](x['matrixWorld']),
                            this['expandByPoint'](P);
                    } else
                        void 0x0 !== x['boundingBox'] ? (null === x['boundingBox'] && x['computeBoundingBox'](),
                        Q['copy'](x['boundingBox'])) : (null === L['boundingBox'] && L['computeBoundingBox'](),
                        Q['copy'](L['boundingBox'])),
                        Q['applyMatrix4'](x['matrixWorld']),
                        this['union'](Q);
                }
                for (var z = x['children'], A = 0x0, j = z['length']; A < j; A++)
                    this['expandByObject'](z[A], I);
                return this;
            }
            ,
            W['containsPoint'] = function(x) {
                return !(x['x'] < this['min']['x'] || x['x'] > this['max']['x'] || x['y'] < this['min']['y'] || x['y'] > this['max']['y'] || x['z'] < this['min']['z'] || x['z'] > this['max']['z']);
            }
            ,
            W['containsBox'] = function(x) {
                return this['min']['x'] <= x['min']['x'] && x['max']['x'] <= this['max']['x'] && this['min']['y'] <= x['min']['y'] && x['max']['y'] <= this['max']['y'] && this['min']['z'] <= x['min']['z'] && x['max']['z'] <= this['max']['z'];
            }
            ,
            W['getParameter'] = function(x, I) {
                return I['set']((x['x'] - this['min']['x']) / (this['max']['x'] - this['min']['x']), (x['y'] - this['min']['y']) / (this['max']['y'] - this['min']['y']), (x['z'] - this['min']['z']) / (this['max']['z'] - this['min']['z']));
            }
            ,
            W['intersectsBox'] = function(x) {
                return !(x['max']['x'] < this['min']['x'] || x['min']['x'] > this['max']['x'] || x['max']['y'] < this['min']['y'] || x['min']['y'] > this['max']['y'] || x['max']['z'] < this['min']['z'] || x['min']['z'] > this['max']['z']);
            }
            ,
            W['intersectsSphere'] = function(x) {
                return this['clampPoint'](x['center'], P),
                P['distanceToSquared'](x['center']) <= x['radius'] * x['radius'];
            }
            ,
            W['intersectsPlane'] = function(x) {
                var I, L;
                return x['normal']['x'] > 0x0 ? (I = x['normal']['x'] * this['min']['x'],
                L = x['normal']['x'] * this['max']['x']) : (I = x['normal']['x'] * this['max']['x'],
                L = x['normal']['x'] * this['min']['x']),
                x['normal']['y'] > 0x0 ? (I += x['normal']['y'] * this['min']['y'],
                L += x['normal']['y'] * this['max']['y']) : (I += x['normal']['y'] * this['max']['y'],
                L += x['normal']['y'] * this['min']['y']),
                x['normal']['z'] > 0x0 ? (I += x['normal']['z'] * this['min']['z'],
                L += x['normal']['z'] * this['max']['z']) : (I += x['normal']['z'] * this['max']['z'],
                L += x['normal']['z'] * this['min']['z']),
                I <= -x['constant'] && L >= -x['constant'];
            }
            ,
            W['intersectsTriangle'] = function(x) {
                if (this['isEmpty']())
                    return !0x1;
                this['getCenter'](Z),
                U['subVectors'](this['max'], Z),
                B['subVectors'](x['a'], Z),
                M['subVectors'](x['b'], Z),
                X['subVectors'](x['c'], Z),
                w['subVectors'](M, B),
                C['subVectors'](X, M),
                N['subVectors'](B, X);
                var I = [0x0, -w['z'], w['y'], 0x0, -C['z'], C['y'], 0x0, -N['z'], N['y'], w['z'], 0x0, -w['x'], C['z'], 0x0, -C['x'], N['z'], 0x0, -N['x'], -w['y'], w['x'], 0x0, -C['y'], C['x'], 0x0, -N['y'], N['x'], 0x0];
                return !!G(I, B, M, X, U) && (!!G(I = [0x1, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x1], B, M, X, U) && (T['crossVectors'](w, C),
                G(I = [T['x'], T['y'], T['z']], B, M, X, U)));
            }
            ,
            W['clampPoint'] = function(x, I) {
                return I['copy'](x)['clamp'](this['min'], this['max']);
            }
            ,
            W['distanceToPoint'] = function(x) {
                return this['clampPoint'](x, P)['distanceTo'](x);
            }
            ,
            W['getBoundingSphere'] = function(x) {
                return this['isEmpty']() ? x['makeEmpty']() : (this['getCenter'](x['center']),
                x['radius'] = 0.5 * this['getSize'](P)['length']()),
                x;
            }
            ,
            W['intersect'] = function(x) {
                return this['min']['max'](x['min']),
                this['max']['min'](x['max']),
                this['isEmpty']() && this['makeEmpty'](),
                this;
            }
            ,
            W['union'] = function(x) {
                return this['min']['min'](x['min']),
                this['max']['max'](x['max']),
                this;
            }
            ,
            W['applyMatrix4'] = function(x) {
                return this['isEmpty']() || (y[0x0]['set'](this['min']['x'], this['min']['y'], this['min']['z'])['applyMatrix4'](x),
                y[0x1]['set'](this['min']['x'], this['min']['y'], this['max']['z'])['applyMatrix4'](x),
                y[0x2]['set'](this['min']['x'], this['max']['y'], this['min']['z'])['applyMatrix4'](x),
                y[0x3]['set'](this['min']['x'], this['max']['y'], this['max']['z'])['applyMatrix4'](x),
                y[0x4]['set'](this['max']['x'], this['min']['y'], this['min']['z'])['applyMatrix4'](x),
                y[0x5]['set'](this['max']['x'], this['min']['y'], this['max']['z'])['applyMatrix4'](x),
                y[0x6]['set'](this['max']['x'], this['max']['y'], this['min']['z'])['applyMatrix4'](x),
                y[0x7]['set'](this['max']['x'], this['max']['y'], this['max']['z'])['applyMatrix4'](x),
                this['setFromPoints'](y)),
                this;
            }
            ,
            W['translate'] = function(x) {
                return this['min']['add'](x),
                this['max']['add'](x),
                this;
            }
            ,
            W['equals'] = function(x) {
                return x['min']['equals'](this['min']) && x['max']['equals'](this['max']);
            }
            ,
            k;
        }())
          , y = [new R['P'](), new R['P'](), new R['P'](), new R['P'](), new R['P'](), new R['P'](), new R['P'](), new R['P']()]
          , P = new R['P']()
          , Q = new H()
          , B = new R['P']()
          , M = new R['P']()
          , X = new R['P']()
          , w = new R['P']()
          , C = new R['P']()
          , N = new R['P']()
          , Z = new R['P']()
          , U = new R['P']()
          , T = new R['P']()
          , V = new R['P']();
        function G(k, W, x, I, L) {
            for (var q = 0x0, K = k['length'] - 0x3; q <= K; q += 0x3) {
                V['fromArray'](k, q);
                var Y = L['x'] * Math['abs'](V['x']) + L['y'] * Math['abs'](V['y']) + L['z'] * Math['abs'](V['z'])
                  , z = W['dot'](V)
                  , A = x['dot'](V)
                  , j = I['dot'](V);
                if (Math['max'](-Math['max'](z, A, j), Math['min'](z, A, j)) > Y)
                    return !0x1;
            }
            return !0x0;
        }
    }
    ,
    0x169b1: (F, E, p) => {
        p['d'](E, {
            'Q': () => m
        });
        var S = p(0xd5e4)
          , R = p['n'](S)
          , H = p(0xbd95)
          , y = p(0x4efe)
          , P = p(0x172d2)
          , Q = {
            'aliceblue': 0xf0f8ff,
            'antiquewhite': 0xfaebd7,
            'aqua': 0xffff,
            'aquamarine': 0x7fffd4,
            'azure': 0xf0ffff,
            'beige': 0xf5f5dc,
            'bisque': 0xffe4c4,
            'black': 0x0,
            'blanchedalmond': 0xffebcd,
            'blue': 0xff,
            'blueviolet': 0x8a2be2,
            'brown': 0xa52a2a,
            'burlywood': 0xdeb887,
            'cadetblue': 0x5f9ea0,
            'chartreuse': 0x7fff00,
            'chocolate': 0xd2691e,
            'coral': 0xff7f50,
            'cornflowerblue': 0x6495ed,
            'cornsilk': 0xfff8dc,
            'crimson': 0xdc143c,
            'cyan': 0xffff,
            'darkblue': 0x8b,
            'darkcyan': 0x8b8b,
            'darkgoldenrod': 0xb8860b,
            'darkgray': 0xa9a9a9,
            'darkgreen': 0x6400,
            'darkgrey': 0xa9a9a9,
            'darkkhaki': 0xbdb76b,
            'darkmagenta': 0x8b008b,
            'darkolivegreen': 0x556b2f,
            'darkorange': 0xff8c00,
            'darkorchid': 0x9932cc,
            'darkred': 0x8b0000,
            'darksalmon': 0xe9967a,
            'darkseagreen': 0x8fbc8f,
            'darkslateblue': 0x483d8b,
            'darkslategray': 0x2f4f4f,
            'darkslategrey': 0x2f4f4f,
            'darkturquoise': 0xced1,
            'darkviolet': 0x9400d3,
            'deeppink': 0xff1493,
            'deepskyblue': 0xbfff,
            'dimgray': 0x696969,
            'dimgrey': 0x696969,
            'dodgerblue': 0x1e90ff,
            'firebrick': 0xb22222,
            'floralwhite': 0xfffaf0,
            'forestgreen': 0x228b22,
            'fuchsia': 0xff00ff,
            'gainsboro': 0xdcdcdc,
            'ghostwhite': 0xf8f8ff,
            'gold': 0xffd700,
            'goldenrod': 0xdaa520,
            'gray': 0x808080,
            'green': 0x8000,
            'greenyellow': 0xadff2f,
            'grey': 0x808080,
            'honeydew': 0xf0fff0,
            'hotpink': 0xff69b4,
            'indianred': 0xcd5c5c,
            'indigo': 0x4b0082,
            'ivory': 0xfffff0,
            'khaki': 0xf0e68c,
            'lavender': 0xe6e6fa,
            'lavenderblush': 0xfff0f5,
            'lawngreen': 0x7cfc00,
            'lemonchiffon': 0xfffacd,
            'lightblue': 0xadd8e6,
            'lightcoral': 0xf08080,
            'lightcyan': 0xe0ffff,
            'lightgoldenrodyellow': 0xfafad2,
            'lightgray': 0xd3d3d3,
            'lightgreen': 0x90ee90,
            'lightgrey': 0xd3d3d3,
            'lightpink': 0xffb6c1,
            'lightsalmon': 0xffa07a,
            'lightseagreen': 0x20b2aa,
            'lightskyblue': 0x87cefa,
            'lightslategray': 0x778899,
            'lightslategrey': 0x778899,
            'lightsteelblue': 0xb0c4de,
            'lightyellow': 0xffffe0,
            'lime': 0xff00,
            'limegreen': 0x32cd32,
            'linen': 0xfaf0e6,
            'magenta': 0xff00ff,
            'maroon': 0x800000,
            'mediumaquamarine': 0x66cdaa,
            'mediumblue': 0xcd,
            'mediumorchid': 0xba55d3,
            'mediumpurple': 0x9370db,
            'mediumseagreen': 0x3cb371,
            'mediumslateblue': 0x7b68ee,
            'mediumspringgreen': 0xfa9a,
            'mediumturquoise': 0x48d1cc,
            'mediumvioletred': 0xc71585,
            'midnightblue': 0x191970,
            'mintcream': 0xf5fffa,
            'mistyrose': 0xffe4e1,
            'moccasin': 0xffe4b5,
            'navajowhite': 0xffdead,
            'navy': 0x80,
            'oldlace': 0xfdf5e6,
            'olive': 0x808000,
            'olivedrab': 0x6b8e23,
            'orange': 0xffa500,
            'orangered': 0xff4500,
            'orchid': 0xda70d6,
            'palegoldenrod': 0xeee8aa,
            'palegreen': 0x98fb98,
            'paleturquoise': 0xafeeee,
            'palevioletred': 0xdb7093,
            'papayawhip': 0xffefd5,
            'peachpuff': 0xffdab9,
            'peru': 0xcd853f,
            'pink': 0xffc0cb,
            'plum': 0xdda0dd,
            'powderblue': 0xb0e0e6,
            'purple': 0x800080,
            'rebeccapurple': 0x663399,
            'red': 0xff0000,
            'rosybrown': 0xbc8f8f,
            'royalblue': 0x4169e1,
            'saddlebrown': 0x8b4513,
            'salmon': 0xfa8072,
            'sandybrown': 0xf4a460,
            'seagreen': 0x2e8b57,
            'seashell': 0xfff5ee,
            'sienna': 0xa0522d,
            'silver': 0xc0c0c0,
            'skyblue': 0x87ceeb,
            'slateblue': 0x6a5acd,
            'slategray': 0x708090,
            'slategrey': 0x708090,
            'snow': 0xfffafa,
            'springgreen': 0xff7f,
            'steelblue': 0x4682b4,
            'tan': 0xd2b48c,
            'teal': 0x8080,
            'thistle': 0xd8bfd8,
            'tomato': 0xff6347,
            'turquoise': 0x40e0d0,
            'violet': 0xee82ee,
            'wheat': 0xf5deb3,
            'white': 0xffffff,
            'whitesmoke': 0xf5f5f5,
            'yellow': 0xffff00,
            'yellowgreen': 0x9acd32
        }
          , B = {
            'h': 0x0,
            's': 0x0,
            'l': 0x0
        }
          , M = {
            'h': 0x0,
            's': 0x0,
            'l': 0x0
        };
        function X(C, N, Z) {
            return Z < 0x0 && (Z += 0x1),
            Z > 0x1 && (Z -= 0x1),
            Z < 0x1 / 0x6 ? C + 0x6 * (N - C) * Z : Z < 0.5 ? N : Z < 0x2 / 0x3 ? C + 0x6 * (N - C) * (0x2 / 0x3 - Z) : C;
        }
        var m = (function() {
            function C(Z, U, T) {
                return this['isColor'] = !0x0,
                this['r'] = 0x1,
                this['g'] = 0x1,
                this['b'] = 0x1,
                this['set'](Z, U, T);
            }
            var N = C['prototype'];
            return N['set'] = function(Z, U, T) {
                if (void 0x0 === U && void 0x0 === T) {
                    var V = Z;
                    V && V['isColor'] ? this['copy'](V) : 'number' == typeof V ? this['setHex'](V) : 'string' == typeof V && this['setStyle'](V);
                } else
                    this['setRGB'](Z, U, T);
                return this;
            }
            ,
            N['setScalar'] = function(Z) {
                return this['r'] = Z,
                this['g'] = Z,
                this['b'] = Z,
                this;
            }
            ,
            N['setHex'] = function(Z, U) {
                return void 0x0 === U && (U = P['er$']),
                Z = Math['floor'](Z),
                this['r'] = (Z >> 0x10 & 0xff) / 0xff,
                this['g'] = (Z >> 0x8 & 0xff) / 0xff,
                this['b'] = (0xff & Z) / 0xff,
                y['pp']['toWorkingColorSpace'](this, U),
                this;
            }
            ,
            N['setRGB'] = function(Z, U, T, V) {
                return void 0x0 === V && (V = y['pp']['workingColorSpace']),
                this['r'] = Z,
                this['g'] = U,
                this['b'] = T,
                y['pp']['toWorkingColorSpace'](this, V),
                this;
            }
            ,
            N['setHSL'] = function(Z, U, T, V) {
                if (void 0x0 === V && (V = y['pp']['workingColorSpace']),
                Z = (0x0,
                H['rl'])(Z, 0x1),
                U = (0x0,
                H['qE'])(U, 0x0, 0x1),
                T = (0x0,
                H['qE'])(T, 0x0, 0x1),
                0x0 === U)
                    this['r'] = this['g'] = this['b'] = T;
                else {
                    var G = T <= 0.5 ? T * (0x1 + U) : T + U - T * U
                      , k = 0x2 * T - G;
                    this['r'] = X(k, G, Z + 0x1 / 0x3),
                    this['g'] = X(k, G, Z),
                    this['b'] = X(k, G, Z - 0x1 / 0x3);
                }
                return y['pp']['toWorkingColorSpace'](this, V),
                this;
            }
            ,
            N['setStyle'] = function(Z, U) {
                function T(g) {
                    void 0x0 !== g && parseFloat(g) < 0x1 && console['warn']('THREE.Color:\x20Alpha\x20component\x20of\x20' + Z + '\x20will\x20be\x20ignored.');
                }
                var V;
                if (void 0x0 === U && (U = P['er$']),
                V = /^(\w+)\(([^\)]*)\)/['exec'](Z)) {
                    var G, k = V[0x1], W = V[0x2];
                    switch (k) {
                    case 'rgb':
                    case 'rgba':
                        if (G = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/['exec'](W))
                            return T(G[0x4]),
                            this['setRGB'](Math['min'](0xff, parseInt(G[0x1], 0xa)) / 0xff, Math['min'](0xff, parseInt(G[0x2], 0xa)) / 0xff, Math['min'](0xff, parseInt(G[0x3], 0xa)) / 0xff, U);
                        if (G = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/['exec'](W))
                            return T(G[0x4]),
                            this['setRGB'](Math['min'](0x64, parseInt(G[0x1], 0xa)) / 0x64, Math['min'](0x64, parseInt(G[0x2], 0xa)) / 0x64, Math['min'](0x64, parseInt(G[0x3], 0xa)) / 0x64, U);
                        break;
                    case 'hsl':
                    case 'hsla':
                        if (G = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/['exec'](W))
                            return T(G[0x4]),
                            this['setHSL'](parseFloat(G[0x1]) / 0x168, parseFloat(G[0x2]) / 0x64, parseFloat(G[0x3]) / 0x64, U);
                        break;
                    default:
                        console['warn']('THREE.Color:\x20Unknown\x20color\x20model\x20' + Z);
                    }
                } else {
                    if (V = /^\#([A-Fa-f\d]+)$/['exec'](Z)) {
                        var x = V[0x1]
                          , I = x['length'];
                        if (0x3 === I)
                            return this['setRGB'](parseInt(x['charAt'](0x0), 0x10) / 0xf, parseInt(x['charAt'](0x1), 0x10) / 0xf, parseInt(x['charAt'](0x2), 0x10) / 0xf, U);
                        if (0x6 === I)
                            return this['setHex'](parseInt(x, 0x10), U);
                        console['warn']('THREE.Color:\x20Invalid\x20hex\x20color\x20' + Z);
                    } else {
                        if (Z && Z['length'] > 0x0)
                            return this['setColorName'](Z, U);
                    }
                }
                return this;
            }
            ,
            N['setColorName'] = function(Z, U) {
                void 0x0 === U && (U = P['er$']);
                var T = Q[Z['toLowerCase']()];
                return void 0x0 !== T ? this['setHex'](T, U) : console['warn']('THREE.Color:\x20Unknown\x20color\x20' + Z),
                this;
            }
            ,
            N['clone'] = function() {
                return new this['constructor'](this['r'],this['g'],this['b']);
            }
            ,
            N['copy'] = function(Z) {
                return this['r'] = Z['r'],
                this['g'] = Z['g'],
                this['b'] = Z['b'],
                this;
            }
            ,
            N['copySRGBToLinear'] = function(Z) {
                return this['r'] = (0x0,
                y['dk'])(Z['r']),
                this['g'] = (0x0,
                y['dk'])(Z['g']),
                this['b'] = (0x0,
                y['dk'])(Z['b']),
                this;
            }
            ,
            N['copyLinearToSRGB'] = function(Z) {
                return this['r'] = (0x0,
                y['rd'])(Z['r']),
                this['g'] = (0x0,
                y['rd'])(Z['g']),
                this['b'] = (0x0,
                y['rd'])(Z['b']),
                this;
            }
            ,
            N['convertSRGBToLinear'] = function() {
                return this['copySRGBToLinear'](this),
                this;
            }
            ,
            N['convertLinearToSRGB'] = function() {
                return this['copyLinearToSRGB'](this),
                this;
            }
            ,
            N['getHex'] = function(Z) {
                return void 0x0 === Z && (Z = P['er$']),
                y['pp']['fromWorkingColorSpace'](w['copy'](this), Z),
                0x10000 * Math['round']((0x0,
                H['qE'])(0xff * w['r'], 0x0, 0xff)) + 0x100 * Math['round']((0x0,
                H['qE'])(0xff * w['g'], 0x0, 0xff)) + Math['round']((0x0,
                H['qE'])(0xff * w['b'], 0x0, 0xff));
            }
            ,
            N['getHexString'] = function(Z) {
                return void 0x0 === Z && (Z = P['er$']),
                ('000000' + this['getHex'](Z)['toString'](0x10))['slice'](-0x6);
            }
            ,
            N['getHSL'] = function(Z, U) {
                void 0x0 === U && (U = y['pp']['workingColorSpace']),
                y['pp']['fromWorkingColorSpace'](w['copy'](this), U);
                var T, V, G = w['r'], k = w['g'], W = w['b'], x = Math['max'](G, k, W), I = Math['min'](G, k, W), g = (I + x) / 0x2;
                if (I === x)
                    T = 0x0,
                    V = 0x0;
                else {
                    var L = x - I;
                    switch (V = g <= 0.5 ? L / (x + I) : L / (0x2 - x - I),
                    x) {
                    case G:
                        T = (k - W) / L + (k < W ? 0x6 : 0x0);
                        break;
                    case k:
                        T = (W - G) / L + 0x2;
                        break;
                    case W:
                        T = (G - k) / L + 0x4;
                    }
                    T /= 0x6;
                }
                return Z['h'] = T,
                Z['s'] = V,
                Z['l'] = g,
                Z;
            }
            ,
            N['getRGB'] = function(Z, U) {
                return void 0x0 === U && (U = y['pp']['workingColorSpace']),
                y['pp']['fromWorkingColorSpace'](w['copy'](this), U),
                Z['r'] = w['r'],
                Z['g'] = w['g'],
                Z['b'] = w['b'],
                Z;
            }
            ,
            N['getStyle'] = function(Z) {
                void 0x0 === Z && (Z = P['er$']),
                y['pp']['fromWorkingColorSpace'](w['copy'](this), Z);
                var U = w['r']
                  , T = w['g']
                  , V = w['b'];
                return Z !== P['er$'] ? 'color(' + Z + '\x20' + U['toFixed'](0x3) + '\x20' + T['toFixed'](0x3) + '\x20' + V['toFixed'](0x3) + ')' : 'rgb(' + Math['round'](0xff * U) + ',' + Math['round'](0xff * T) + ',' + Math['round'](0xff * V) + ')';
            }
            ,
            N['offsetHSL'] = function(Z, U, T) {
                return this['getHSL'](B),
                this['setHSL'](B['h'] + Z, B['s'] + U, B['l'] + T);
            }
            ,
            N['add'] = function(Z) {
                return this['r'] += Z['r'],
                this['g'] += Z['g'],
                this['b'] += Z['b'],
                this;
            }
            ,
            N['addColors'] = function(Z, U) {
                return this['r'] = Z['r'] + U['r'],
                this['g'] = Z['g'] + U['g'],
                this['b'] = Z['b'] + U['b'],
                this;
            }
            ,
            N['addScalar'] = function(Z) {
                return this['r'] += Z,
                this['g'] += Z,
                this['b'] += Z,
                this;
            }
            ,
            N['sub'] = function(Z) {
                return this['r'] = Math['max'](0x0, this['r'] - Z['r']),
                this['g'] = Math['max'](0x0, this['g'] - Z['g']),
                this['b'] = Math['max'](0x0, this['b'] - Z['b']),
                this;
            }
            ,
            N['multiply'] = function(Z) {
                return this['r'] *= Z['r'],
                this['g'] *= Z['g'],
                this['b'] *= Z['b'],
                this;
            }
            ,
            N['multiplyScalar'] = function(Z) {
                return this['r'] *= Z,
                this['g'] *= Z,
                this['b'] *= Z,
                this;
            }
            ,
            N['lerp'] = function(Z, U) {
                return this['r'] += (Z['r'] - this['r']) * U,
                this['g'] += (Z['g'] - this['g']) * U,
                this['b'] += (Z['b'] - this['b']) * U,
                this;
            }
            ,
            N['lerpColors'] = function(Z, U, T) {
                return this['r'] = Z['r'] + (U['r'] - Z['r']) * T,
                this['g'] = Z['g'] + (U['g'] - Z['g']) * T,
                this['b'] = Z['b'] + (U['b'] - Z['b']) * T,
                this;
            }
            ,
            N['lerpHSL'] = function(Z, U) {
                this['getHSL'](B),
                Z['getHSL'](M);
                var T = (0x0,
                H['Cc'])(B['h'], M['h'], U)
                  , V = (0x0,
                H['Cc'])(B['s'], M['s'], U)
                  , G = (0x0,
                H['Cc'])(B['l'], M['l'], U);
                return this['setHSL'](T, V, G),
                this;
            }
            ,
            N['setFromVector3'] = function(Z) {
                return this['r'] = Z['x'],
                this['g'] = Z['y'],
                this['b'] = Z['z'],
                this;
            }
            ,
            N['applyMatrix3'] = function(Z) {
                var U = this['r']
                  , T = this['g']
                  , V = this['b']
                  , G = Z['elements'];
                return this['r'] = G[0x0] * U + G[0x3] * T + G[0x6] * V,
                this['g'] = G[0x1] * U + G[0x4] * T + G[0x7] * V,
                this['b'] = G[0x2] * U + G[0x5] * T + G[0x8] * V,
                this;
            }
            ,
            N['equals'] = function(Z) {
                return Z['r'] === this['r'] && Z['g'] === this['g'] && Z['b'] === this['b'];
            }
            ,
            N['fromArray'] = function(Z, U) {
                return void 0x0 === U && (U = 0x0),
                this['r'] = Z[U],
                this['g'] = Z[U + 0x1],
                this['b'] = Z[U + 0x2],
                this;
            }
            ,
            N['toArray'] = function(Z, U) {
                return void 0x0 === Z && (Z = []),
                void 0x0 === U && (U = 0x0),
                Z[U] = this['r'],
                Z[U + 0x1] = this['g'],
                Z[U + 0x2] = this['b'],
                Z;
            }
            ,
            N['fromBufferAttribute'] = function(Z, U) {
                return this['r'] = Z['getX'](U),
                this['g'] = Z['getY'](U),
                this['b'] = Z['getZ'](U),
                this;
            }
            ,
            N['toJSON'] = function() {
                return this['getHex']();
            }
            ,
            N[Symbol['iterator']] = R()['mark'](function Z() {
                return R()['wrap'](function(U) {
                    for (; ; )
                        switch (U['prev'] = U['next']) {
                        case 0x0:
                            return U['next'] = 0x2,
                            this['r'];
                        case 0x2:
                            return U['next'] = 0x4,
                            this['g'];
                        case 0x4:
                            return U['next'] = 0x6,
                            this['b'];
                        case 0x6:
                        case 'end':
                            return U['stop']();
                        }
                }, Z, this);
            }),
            C;
        }())
          , w = new m();
        m['NAMES'] = Q;
    }
    ,
    0x4efe: (F, E, p) => {
        p['d'](E, {
            'dk': () => X,
            'pp': () => M,
            'rd': () => m
        });
        var S, R = p(0x172d2), H = p(0x3e78), y = new H['d']()['set'](0.8224621, 0.177538, 0x0, 0.0331941, 0.9668058, 0x0, 0.0170827, 0.0723974, 0.9105199), P = new H['d']()['set'](1.2249401, -0.2249404, 0x0, -0.0420569, 1.0420571, 0x0, -0.0196376, -0.0786361, 1.0982735), Q = ((S = {})[R['Zr2']] = {
            'transfer': R['VxR'],
            'primaries': R['z5'],
            'toReference': function(w) {
                return w;
            },
            'fromReference': function(w) {
                return w;
            }
        },
        S[R['er$']] = {
            'transfer': R['KLL'],
            'primaries': R['z5'],
            'toReference': function(w) {
                return w['convertSRGBToLinear']();
            },
            'fromReference': function(w) {
                return w['convertLinearToSRGB']();
            }
        },
        S[R['qIQ']] = {
            'transfer': R['VxR'],
            'primaries': R['wqq'],
            'toReference': function(w) {
                return w['applyMatrix3'](P);
            },
            'fromReference': function(w) {
                return w['applyMatrix3'](y);
            }
        },
        S[R['V5c']] = {
            'transfer': R['KLL'],
            'primaries': R['wqq'],
            'toReference': function(w) {
                return w['convertSRGBToLinear']()['applyMatrix3'](P);
            },
            'fromReference': function(w) {
                return w['applyMatrix3'](y)['convertLinearToSRGB']();
            }
        },
        S), B = new Set([R['Zr2'], R['qIQ']]), M = {
            'enabled': !0x0,
            '_workingColorSpace': R['Zr2'],
            get 'legacyMode'() {
                return console['warn']('THREE.ColorManagement:\x20.legacyMode=false\x20renamed\x20to\x20.enabled=true\x20in\x20r150.'),
                !this['enabled'];
            },
            set 'legacyMode'(w) {
                console['warn']('THREE.ColorManagement:\x20.legacyMode=false\x20renamed\x20to\x20.enabled=true\x20in\x20r150.'),
                this['enabled'] = !w;
            },
            get 'workingColorSpace'() {
                return this['_workingColorSpace'];
            },
            set 'workingColorSpace'(w) {
                if (!B['has'](w))
                    throw new Error('Unsupported\x20working\x20color\x20space,\x20\x22' + w + '\x22.');
                this['_workingColorSpace'] = w;
            },
            'convert': function(w, C, N) {
                if (!0x1 === this['enabled'] || C === N || !C || !N)
                    return w;
                var Z = Q[C]['toReference'];
                return (0x0,
                Q[N]['fromReference'])(Z(w));
            },
            'fromWorkingColorSpace': function(w, C) {
                return this['convert'](w, this['_workingColorSpace'], C);
            },
            'toWorkingColorSpace': function(w, C) {
                return this['convert'](w, C, this['_workingColorSpace']);
            },
            'getPrimaries': function(w) {
                return Q[w]['primaries'];
            },
            'getTransfer': function(w) {
                return w === R['jf0'] ? R['VxR'] : Q[w]['transfer'];
            }
        };
        function X(w) {
            return w < 0.04045 ? 0.0773993808 * w : Math['pow'](0.9478672986 * w + 0.0521327014, 2.4);
        }
        function m(w) {
            return w < 0.0031308 ? 12.92 * w : 1.055 * Math['pow'](w, 0.41666) - 0.055;
        }
    }
    ,
    0x6a24: (F, E, p) => {
        p['d'](E, {
            'P': () => Q
        });
        var S = p(0x172d2)
          , R = p(0x1008e)
          , H = p(0x79b5)
          , y = p(0xa3bc)
          , d = new H['i']()
          , P = new R['P']()
          , Q = (function() {
            function B(X, m, w, C, N, Z) {
                void 0x0 === X && (X = new y['Z']()),
                void 0x0 === m && (m = new y['Z']()),
                void 0x0 === w && (w = new y['Z']()),
                void 0x0 === C && (C = new y['Z']()),
                void 0x0 === N && (N = new y['Z']()),
                void 0x0 === Z && (Z = new y['Z']()),
                this['planes'] = [X, m, w, C, N, Z];
            }
            var M = B['prototype'];
            return M['set'] = function(X, m, w, C, N, Z) {
                var h = this['planes'];
                return h[0x0]['copy'](X),
                h[0x1]['copy'](m),
                h[0x2]['copy'](w),
                h[0x3]['copy'](C),
                h[0x4]['copy'](N),
                h[0x5]['copy'](Z),
                this;
            }
            ,
            M['copy'] = function(X) {
                for (var m = this['planes'], w = 0x0; w < 0x6; w++)
                    m[w]['copy'](X['planes'][w]);
                return this;
            }
            ,
            M['setFromProjectionMatrix'] = function(X, w) {
                void 0x0 === w && (w = S['TdN']);
                var C = this['planes']
                  , N = X['elements']
                  , Z = N[0x0]
                  , U = N[0x1]
                  , T = N[0x2]
                  , V = N[0x3]
                  , G = N[0x4]
                  , k = N[0x5]
                  , W = N[0x6]
                  , I = N[0x7]
                  , L = N[0x8]
                  , q = N[0x9]
                  , K = N[0xa]
                  , Y = N[0xb]
                  , z = N[0xc]
                  , A = N[0xd]
                  , j = N[0xe]
                  , O = N[0xf];
                if (C[0x0]['setComponents'](V - Z, I - G, Y - L, O - z)['normalize'](),
                C[0x1]['setComponents'](V + Z, I + G, Y + L, O + z)['normalize'](),
                C[0x2]['setComponents'](V + U, I + k, Y + q, O + A)['normalize'](),
                C[0x3]['setComponents'](V - U, I - k, Y - q, O - A)['normalize'](),
                C[0x4]['setComponents'](V - T, I - W, Y - K, O - j)['normalize'](),
                w === S['TdN'])
                    C[0x5]['setComponents'](V + T, I + W, Y + K, O + j)['normalize']();
                else {
                    if (w !== S['i7u'])
                        throw new Error('THREE.Frustum.setFromProjectionMatrix():\x20Invalid\x20coordinate\x20system:\x20' + w);
                    C[0x5]['setComponents'](T, W, K, j)['normalize']();
                }
                return this;
            }
            ,
            M['intersectsObject'] = function(X) {
                if (void 0x0 !== X['boundingSphere'])
                    null === X['boundingSphere'] && X['computeBoundingSphere'](),
                    d['copy'](X['boundingSphere'])['applyMatrix4'](X['matrixWorld']);
                else {
                    var m = X['geometry'];
                    null === m['boundingSphere'] && m['computeBoundingSphere'](),
                    d['copy'](m['boundingSphere'])['applyMatrix4'](X['matrixWorld']);
                }
                return this['intersectsSphere'](d);
            }
            ,
            M['intersectsSprite'] = function(X) {
                return d['center']['set'](0x0, 0x0, 0x0),
                d['radius'] = 0.7071067811865476,
                d['applyMatrix4'](X['matrixWorld']),
                this['intersectsSphere'](d);
            }
            ,
            M['intersectsSphere'] = function(X) {
                for (var m = this['planes'], w = X['center'], C = -X['radius'], N = 0x0; N < 0x6; N++) {
                    if (m[N]['distanceToPoint'](w) < C)
                        return !0x1;
                }
                return !0x0;
            }
            ,
            M['intersectsBox'] = function(X) {
                for (var m = this['planes'], w = 0x0; w < 0x6; w++) {
                    var C = m[w];
                    if (P['x'] = C['normal']['x'] > 0x0 ? X['max']['x'] : X['min']['x'],
                    P['y'] = C['normal']['y'] > 0x0 ? X['max']['y'] : X['min']['y'],
                    P['z'] = C['normal']['z'] > 0x0 ? X['max']['z'] : X['min']['z'],
                    C['distanceToPoint'](P) < 0x0)
                        return !0x1;
                }
                return !0x0;
            }
            ,
            M['containsPoint'] = function(X) {
                for (var m = this['planes'], w = 0x0; w < 0x6; w++)
                    if (m[w]['distanceToPoint'](X) < 0x0)
                        return !0x1;
                return !0x0;
            }
            ,
            M['clone'] = function() {
                return new this['constructor']()['copy'](this);
            }
            ,
            B;
        }());
    }
    ,
    0x28f4: (r, F, E) => {
        E['d'](F, {
            'l': () => p
        });
        var p = (function() {
            function S(H, y, d, P) {
                this['parameterPositions'] = H,
                this['_cachedIndex'] = 0x0,
                this['resultBuffer'] = void 0x0 !== P ? P : new y['constructor'](d),
                this['sampleValues'] = y,
                this['valueSize'] = d,
                this['settings'] = null,
                this['DefaultSettings_'] = {};
            }
            var R = S['prototype'];
            return R['evaluate'] = function(H) {
                var y = this['parameterPositions']
                  , d = this['_cachedIndex']
                  , P = y[d]
                  , Q = y[d - 0x1];
                C: {
                    N: {
                        var B;
                        Z: {
                            h: if (!(H < P)) {
                                for (var M = d + 0x2; ; ) {
                                    if (void 0x0 === P) {
                                        if (H < Q)
                                            break h;
                                        return d = y['length'],
                                        this['_cachedIndex'] = d,
                                        this['copySampleValue_'](d - 0x1);
                                    }
                                    if (d === M)
                                        break;
                                    if (Q = P,
                                    H < (P = y[++d]))
                                        break N;
                                }
                                B = y['length'];
                                break Z;
                            }
                            if (H >= Q)
                                break C;
                            var X = y[0x1];
                            H < X && (d = 0x2,
                            Q = X);
                            for (var m = d - 0x2; ; ) {
                                if (void 0x0 === Q)
                                    return this['_cachedIndex'] = 0x0,
                                    this['copySampleValue_'](0x0);
                                if (d === m)
                                    break;
                                if (P = Q,
                                H >= (Q = y[--d - 0x1]))
                                    break N;
                            }
                            B = d,
                            d = 0x0;
                        }
                        for (; d < B; ) {
                            var w = d + B >>> 0x1;
                            H < y[w] ? B = w : d = w + 0x1;
                        }
                        if (P = y[d],
                        void 0x0 === (Q = y[d - 0x1]))
                            return this['_cachedIndex'] = 0x0,
                            this['copySampleValue_'](0x0);
                        if (void 0x0 === P)
                            return d = y['length'],
                            this['_cachedIndex'] = d,
                            this['copySampleValue_'](d - 0x1);
                    }
                    this['_cachedIndex'] = d,
                    this['intervalChanged_'](d, Q, P);
                }
                return this['interpolate_'](d, Q, H, P);
            }
            ,
            R['getSettings_'] = function() {
                return this['settings'] || this['DefaultSettings_'];
            }
            ,
            R['copySampleValue_'] = function(H) {
                for (var y = this['resultBuffer'], d = this['sampleValues'], P = this['valueSize'], Q = H * P, B = 0x0; B !== P; ++B)
                    y[B] = d[Q + B];
                return y;
            }
            ,
            R['interpolate_'] = function() {
                throw new Error('call\x20to\x20abstract\x20method');
            }
            ,
            R['intervalChanged_'] = function() {}
            ,
            S;
        }());
    }
    ,
    0x3e78: (F, E, p) => {
        p['d'](E, {
            'd': () => S
        });
        var S = (function() {
            function H(d, P, Q, B, M, X, m, w, C) {
                H['prototype']['isMatrix3'] = !0x0,
                this['elements'] = [0x1, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x1],
                void 0x0 !== d && this['set'](d, P, Q, B, M, X, m, w, C);
            }
            var y = H['prototype'];
            return y['set'] = function(d, P, Q, B, M, X, m, w, C) {
                var N = this['elements'];
                return N[0x0] = d,
                N[0x1] = B,
                N[0x2] = m,
                N[0x3] = P,
                N[0x4] = M,
                N[0x5] = w,
                N[0x6] = Q,
                N[0x7] = X,
                N[0x8] = C,
                this;
            }
            ,
            y['identity'] = function() {
                return this['set'](0x1, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x1),
                this;
            }
            ,
            y['copy'] = function(d) {
                var P = this['elements']
                  , Q = d['elements'];
                return P[0x0] = Q[0x0],
                P[0x1] = Q[0x1],
                P[0x2] = Q[0x2],
                P[0x3] = Q[0x3],
                P[0x4] = Q[0x4],
                P[0x5] = Q[0x5],
                P[0x6] = Q[0x6],
                P[0x7] = Q[0x7],
                P[0x8] = Q[0x8],
                this;
            }
            ,
            y['extractBasis'] = function(d, P, Q) {
                return d['setFromMatrix3Column'](this, 0x0),
                P['setFromMatrix3Column'](this, 0x1),
                Q['setFromMatrix3Column'](this, 0x2),
                this;
            }
            ,
            y['setFromMatrix4'] = function(d) {
                var P = d['elements'];
                return this['set'](P[0x0], P[0x4], P[0x8], P[0x1], P[0x5], P[0x9], P[0x2], P[0x6], P[0xa]),
                this;
            }
            ,
            y['multiply'] = function(d) {
                return this['multiplyMatrices'](this, d);
            }
            ,
            y['premultiply'] = function(d) {
                return this['multiplyMatrices'](d, this);
            }
            ,
            y['multiplyMatrices'] = function(P, Q) {
                var B = P['elements']
                  , X = Q['elements']
                  , w = this['elements']
                  , C = B[0x0]
                  , N = B[0x3]
                  , Z = B[0x6]
                  , U = B[0x1]
                  , T = B[0x4]
                  , V = B[0x7]
                  , G = B[0x2]
                  , k = B[0x5]
                  , W = B[0x8]
                  , I = X[0x0]
                  , L = X[0x3]
                  , q = X[0x6]
                  , K = X[0x1]
                  , Y = X[0x4]
                  , z = X[0x7]
                  , A = X[0x2]
                  , j = X[0x5]
                  , O = X[0x8];
                return w[0x0] = C * I + N * K + Z * A,
                w[0x3] = C * L + N * Y + Z * j,
                w[0x6] = C * q + N * z + Z * O,
                w[0x1] = U * I + T * K + V * A,
                w[0x4] = U * L + T * Y + V * j,
                w[0x7] = U * q + T * z + V * O,
                w[0x2] = G * I + k * K + W * A,
                w[0x5] = G * L + k * Y + W * j,
                w[0x8] = G * q + k * z + W * O,
                this;
            }
            ,
            y['multiplyScalar'] = function(d) {
                var P = this['elements'];
                return P[0x0] *= d,
                P[0x3] *= d,
                P[0x6] *= d,
                P[0x1] *= d,
                P[0x4] *= d,
                P[0x7] *= d,
                P[0x2] *= d,
                P[0x5] *= d,
                P[0x8] *= d,
                this;
            }
            ,
            y['determinant'] = function() {
                var d = this['elements']
                  , P = d[0x0]
                  , Q = d[0x1]
                  , B = d[0x2]
                  , M = d[0x3]
                  , X = d[0x4]
                  , m = d[0x5]
                  , w = d[0x6]
                  , C = d[0x7]
                  , N = d[0x8];
                return P * X * N - P * m * C - Q * M * N + Q * m * w + B * M * C - B * X * w;
            }
            ,
            y['invert'] = function() {
                var P = this['elements']
                  , Q = P[0x0]
                  , B = P[0x1]
                  , M = P[0x2]
                  , X = P[0x3]
                  , m = P[0x4]
                  , w = P[0x5]
                  , C = P[0x6]
                  , N = P[0x7]
                  , Z = P[0x8]
                  , U = Z * m - w * N
                  , T = w * C - Z * X
                  , V = N * X - m * C
                  , G = Q * U + B * T + M * V;
                if (0x0 === G)
                    return this['set'](0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0);
                var k = 0x1 / G;
                return P[0x0] = U * k,
                P[0x1] = (M * N - Z * B) * k,
                P[0x2] = (w * B - M * m) * k,
                P[0x3] = T * k,
                P[0x4] = (Z * Q - M * C) * k,
                P[0x5] = (M * X - w * Q) * k,
                P[0x6] = V * k,
                P[0x7] = (B * C - N * Q) * k,
                P[0x8] = (m * Q - B * X) * k,
                this;
            }
            ,
            y['transpose'] = function() {
                var d, P = this['elements'];
                return d = P[0x1],
                P[0x1] = P[0x3],
                P[0x3] = d,
                d = P[0x2],
                P[0x2] = P[0x6],
                P[0x6] = d,
                d = P[0x5],
                P[0x5] = P[0x7],
                P[0x7] = d,
                this;
            }
            ,
            y['getNormalMatrix'] = function(d) {
                return this['setFromMatrix4'](d)['invert']()['transpose']();
            }
            ,
            y['transposeIntoArray'] = function(d) {
                var P = this['elements'];
                return d[0x0] = P[0x0],
                d[0x1] = P[0x3],
                d[0x2] = P[0x6],
                d[0x3] = P[0x1],
                d[0x4] = P[0x4],
                d[0x5] = P[0x7],
                d[0x6] = P[0x2],
                d[0x7] = P[0x5],
                d[0x8] = P[0x8],
                this;
            }
            ,
            y['setUvTransform'] = function(d, P, Q, B, M, X, m) {
                var w = Math['cos'](M)
                  , l = Math['sin'](M);
                return this['set'](Q * w, Q * l, -Q * (w * X + l * m) + X + d, -B * l, B * w, -B * (-l * X + w * m) + m + P, 0x0, 0x0, 0x1),
                this;
            }
            ,
            y['scale'] = function(d, P) {
                return this['premultiply'](R['makeScale'](d, P)),
                this;
            }
            ,
            y['rotate'] = function(d) {
                return this['premultiply'](R['makeRotation'](-d)),
                this;
            }
            ,
            y['translate'] = function(d, P) {
                return this['premultiply'](R['makeTranslation'](d, P)),
                this;
            }
            ,
            y['makeTranslation'] = function(d, P) {
                return d['isVector2'] ? this['set'](0x1, 0x0, d['x'], 0x0, 0x1, d['y'], 0x0, 0x0, 0x1) : this['set'](0x1, 0x0, d, 0x0, 0x1, P, 0x0, 0x0, 0x1),
                this;
            }
            ,
            y['makeRotation'] = function(d) {
                var P = Math['cos'](d)
                  , Q = Math['sin'](d);
                return this['set'](P, -Q, 0x0, Q, P, 0x0, 0x0, 0x0, 0x1),
                this;
            }
            ,
            y['makeScale'] = function(d, P) {
                return this['set'](d, 0x0, 0x0, 0x0, P, 0x0, 0x0, 0x0, 0x1),
                this;
            }
            ,
            y['equals'] = function(d) {
                for (var P = this['elements'], Q = d['elements'], B = 0x0; B < 0x9; B++)
                    if (P[B] !== Q[B])
                        return !0x1;
                return !0x0;
            }
            ,
            y['fromArray'] = function(d, P) {
                void 0x0 === P && (P = 0x0);
                for (var Q = 0x0; Q < 0x9; Q++)
                    this['elements'][Q] = d[Q + P];
                return this;
            }
            ,
            y['toArray'] = function(d, P) {
                void 0x0 === d && (d = []),
                void 0x0 === P && (P = 0x0);
                var Q = this['elements'];
                return d[P] = Q[0x0],
                d[P + 0x1] = Q[0x1],
                d[P + 0x2] = Q[0x2],
                d[P + 0x3] = Q[0x3],
                d[P + 0x4] = Q[0x4],
                d[P + 0x5] = Q[0x5],
                d[P + 0x6] = Q[0x6],
                d[P + 0x7] = Q[0x7],
                d[P + 0x8] = Q[0x8],
                d;
            }
            ,
            y['clone'] = function() {
                return new this['constructor']()['fromArray'](this['elements']);
            }
            ,
            H;
        }())
          , R = new S();
    }
    ,
    0x11ded: (F, E, p) => {
        p['d'](E, {
            'k': () => H
        });
        var S = p(0x172d2)
          , R = p(0x1008e)
          , H = (function() {
            function w(N, Z, U, T, V, G, k, W, x, I, g, L, q, K, Y, z) {
                w['prototype']['isMatrix4'] = !0x0,
                this['elements'] = [0x1, 0x0, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0, 0x1],
                void 0x0 !== N && this['set'](N, Z, U, T, V, G, k, W, x, I, g, L, q, K, Y, z);
            }
            var C = w['prototype'];
            return C['set'] = function(N, Z, U, T, V, G, k, W, x, I, g, L, q, K, Y, z) {
                var A = this['elements'];
                return A[0x0] = N,
                A[0x4] = Z,
                A[0x8] = U,
                A[0xc] = T,
                A[0x1] = V,
                A[0x5] = G,
                A[0x9] = k,
                A[0xd] = W,
                A[0x2] = x,
                A[0x6] = I,
                A[0xa] = g,
                A[0xe] = L,
                A[0x3] = q,
                A[0x7] = K,
                A[0xb] = Y,
                A[0xf] = z,
                this;
            }
            ,
            C['identity'] = function() {
                return this['set'](0x1, 0x0, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0, 0x1),
                this;
            }
            ,
            C['clone'] = function() {
                return new w()['fromArray'](this['elements']);
            }
            ,
            C['copy'] = function(N) {
                var Z = this['elements']
                  , U = N['elements'];
                return Z[0x0] = U[0x0],
                Z[0x1] = U[0x1],
                Z[0x2] = U[0x2],
                Z[0x3] = U[0x3],
                Z[0x4] = U[0x4],
                Z[0x5] = U[0x5],
                Z[0x6] = U[0x6],
                Z[0x7] = U[0x7],
                Z[0x8] = U[0x8],
                Z[0x9] = U[0x9],
                Z[0xa] = U[0xa],
                Z[0xb] = U[0xb],
                Z[0xc] = U[0xc],
                Z[0xd] = U[0xd],
                Z[0xe] = U[0xe],
                Z[0xf] = U[0xf],
                this;
            }
            ,
            C['copyPosition'] = function(N) {
                var Z = this['elements']
                  , U = N['elements'];
                return Z[0xc] = U[0xc],
                Z[0xd] = U[0xd],
                Z[0xe] = U[0xe],
                this;
            }
            ,
            C['setFromMatrix3'] = function(N) {
                var Z = N['elements'];
                return this['set'](Z[0x0], Z[0x3], Z[0x6], 0x0, Z[0x1], Z[0x4], Z[0x7], 0x0, Z[0x2], Z[0x5], Z[0x8], 0x0, 0x0, 0x0, 0x0, 0x1),
                this;
            }
            ,
            C['extractBasis'] = function(N, Z, U) {
                return N['setFromMatrixColumn'](this, 0x0),
                Z['setFromMatrixColumn'](this, 0x1),
                U['setFromMatrixColumn'](this, 0x2),
                this;
            }
            ,
            C['makeBasis'] = function(N, Z, U) {
                return this['set'](N['x'], Z['x'], U['x'], 0x0, N['y'], Z['y'], U['y'], 0x0, N['z'], Z['z'], U['z'], 0x0, 0x0, 0x0, 0x0, 0x1),
                this;
            }
            ,
            C['extractRotation'] = function(N) {
                var Z = this['elements']
                  , U = N['elements']
                  , T = 0x1 / y['setFromMatrixColumn'](N, 0x0)['length']()
                  , V = 0x1 / y['setFromMatrixColumn'](N, 0x1)['length']()
                  , G = 0x1 / y['setFromMatrixColumn'](N, 0x2)['length']();
                return Z[0x0] = U[0x0] * T,
                Z[0x1] = U[0x1] * T,
                Z[0x2] = U[0x2] * T,
                Z[0x3] = 0x0,
                Z[0x4] = U[0x4] * V,
                Z[0x5] = U[0x5] * V,
                Z[0x6] = U[0x6] * V,
                Z[0x7] = 0x0,
                Z[0x8] = U[0x8] * G,
                Z[0x9] = U[0x9] * G,
                Z[0xa] = U[0xa] * G,
                Z[0xb] = 0x0,
                Z[0xc] = 0x0,
                Z[0xd] = 0x0,
                Z[0xe] = 0x0,
                Z[0xf] = 0x1,
                this;
            }
            ,
            C['makeRotationFromEuler'] = function(Z) {
                var U = this['elements']
                  , V = Z['x']
                  , G = Z['y']
                  , k = Z['z']
                  , W = Math['cos'](V)
                  , q = Math['sin'](V)
                  , K = Math['cos'](G)
                  , Y = Math['sin'](G)
                  , z = Math['cos'](k)
                  , j = Math['sin'](k);
                if ('XYZ' === Z['order']) {
                    var O = W * z
                      , J = W * j
                      , r0 = q * z
                      , r1 = q * j;
                    U[0x0] = K * z,
                    U[0x4] = -K * j,
                    U[0x8] = Y,
                    U[0x1] = J + r0 * Y,
                    U[0x5] = O - r1 * Y,
                    U[0x9] = -q * K,
                    U[0x2] = r1 - O * Y,
                    U[0x6] = r0 + J * Y,
                    U[0xa] = W * K;
                } else {
                    if ('YXZ' === Z['order']) {
                        var r2 = K * z
                          , r3 = K * j
                          , r4 = Y * z
                          , r5 = Y * j;
                        U[0x0] = r2 + r5 * q,
                        U[0x4] = r4 * q - r3,
                        U[0x8] = W * Y,
                        U[0x1] = W * j,
                        U[0x5] = W * z,
                        U[0x9] = -q,
                        U[0x2] = r3 * q - r4,
                        U[0x6] = r5 + r2 * q,
                        U[0xa] = W * K;
                    } else {
                        if ('ZXY' === Z['order']) {
                            var r6 = K * z
                              , r7 = K * j
                              , r8 = Y * z
                              , r9 = Y * j;
                            U[0x0] = r6 - r9 * q,
                            U[0x4] = -W * j,
                            U[0x8] = r8 + r7 * q,
                            U[0x1] = r7 + r8 * q,
                            U[0x5] = W * z,
                            U[0x9] = r9 - r6 * q,
                            U[0x2] = -W * Y,
                            U[0x6] = q,
                            U[0xa] = W * K;
                        } else {
                            if ('ZYX' === Z['order']) {
                                var rr = W * z
                                  , rF = W * j
                                  , rE = q * z
                                  , rp = q * j;
                                U[0x0] = K * z,
                                U[0x4] = rE * Y - rF,
                                U[0x8] = rr * Y + rp,
                                U[0x1] = K * j,
                                U[0x5] = rp * Y + rr,
                                U[0x9] = rF * Y - rE,
                                U[0x2] = -Y,
                                U[0x6] = q * K,
                                U[0xa] = W * K;
                            } else {
                                if ('YZX' === Z['order']) {
                                    var rS = W * K
                                      , re = W * Y
                                      , rR = q * K
                                      , rH = q * Y;
                                    U[0x0] = K * z,
                                    U[0x4] = rH - rS * j,
                                    U[0x8] = rR * j + re,
                                    U[0x1] = j,
                                    U[0x5] = W * z,
                                    U[0x9] = -q * z,
                                    U[0x2] = -Y * z,
                                    U[0x6] = re * j + rR,
                                    U[0xa] = rS - rH * j;
                                } else {
                                    if ('XZY' === Z['order']) {
                                        var ry = W * K
                                          , rd = W * Y
                                          , rP = q * K
                                          , rQ = q * Y;
                                        U[0x0] = K * z,
                                        U[0x4] = -j,
                                        U[0x8] = Y * z,
                                        U[0x1] = ry * j + rQ,
                                        U[0x5] = W * z,
                                        U[0x9] = rd * j - rP,
                                        U[0x2] = rP * j - rd,
                                        U[0x6] = q * z,
                                        U[0xa] = rQ * j + ry;
                                    }
                                }
                            }
                        }
                    }
                }
                return U[0x3] = 0x0,
                U[0x7] = 0x0,
                U[0xb] = 0x0,
                U[0xc] = 0x0,
                U[0xd] = 0x0,
                U[0xe] = 0x0,
                U[0xf] = 0x1,
                this;
            }
            ,
            C['makeRotationFromQuaternion'] = function(N) {
                return this['compose'](Q, N, B);
            }
            ,
            C['lookAt'] = function(N, Z, U) {
                var T = this['elements'];
                return m['subVectors'](N, Z),
                0x0 === m['lengthSq']() && (m['z'] = 0x1),
                m['normalize'](),
                M['crossVectors'](U, m),
                0x0 === M['lengthSq']() && (0x1 === Math['abs'](U['z']) ? m['x'] += 0.0001 : m['z'] += 0.0001,
                m['normalize'](),
                M['crossVectors'](U, m)),
                M['normalize'](),
                X['crossVectors'](m, M),
                T[0x0] = M['x'],
                T[0x4] = X['x'],
                T[0x8] = m['x'],
                T[0x1] = M['y'],
                T[0x5] = X['y'],
                T[0x9] = m['y'],
                T[0x2] = M['z'],
                T[0x6] = X['z'],
                T[0xa] = m['z'],
                this;
            }
            ,
            C['multiply'] = function(N) {
                return this['multiplyMatrices'](this, N);
            }
            ,
            C['premultiply'] = function(N) {
                return this['multiplyMatrices'](N, this);
            }
            ,
            C['multiplyMatrices'] = function(Z, V) {
                var G = Z['elements']
                  , k = V['elements']
                  , W = this['elements']
                  , q = G[0x0]
                  , K = G[0x4]
                  , Y = G[0x8]
                  , z = G[0xc]
                  , j = G[0x1]
                  , J = G[0x5]
                  , r0 = G[0x9]
                  , r1 = G[0xd]
                  , r2 = G[0x2]
                  , r3 = G[0x6]
                  , r4 = G[0xa]
                  , r5 = G[0xe]
                  , r6 = G[0x3]
                  , r7 = G[0x7]
                  , r8 = G[0xb]
                  , r9 = G[0xf]
                  , rr = k[0x0]
                  , rF = k[0x4]
                  , rE = k[0x8]
                  , rp = k[0xc]
                  , rS = k[0x1]
                  , re = k[0x5]
                  , rR = k[0x9]
                  , rH = k[0xd]
                  , ry = k[0x2]
                  , rd = k[0x6]
                  , rP = k[0xa]
                  , rQ = k[0xe]
                  , rB = k[0x3]
                  , rM = k[0x7]
                  , rX = k[0xb]
                  , rt = k[0xf];
                return W[0x0] = q * rr + K * rS + Y * ry + z * rB,
                W[0x4] = q * rF + K * re + Y * rd + z * rM,
                W[0x8] = q * rE + K * rR + Y * rP + z * rX,
                W[0xc] = q * rp + K * rH + Y * rQ + z * rt,
                W[0x1] = j * rr + J * rS + r0 * ry + r1 * rB,
                W[0x5] = j * rF + J * re + r0 * rd + r1 * rM,
                W[0x9] = j * rE + J * rR + r0 * rP + r1 * rX,
                W[0xd] = j * rp + J * rH + r0 * rQ + r1 * rt,
                W[0x2] = r2 * rr + r3 * rS + r4 * ry + r5 * rB,
                W[0x6] = r2 * rF + r3 * re + r4 * rd + r5 * rM,
                W[0xa] = r2 * rE + r3 * rR + r4 * rP + r5 * rX,
                W[0xe] = r2 * rp + r3 * rH + r4 * rQ + r5 * rt,
                W[0x3] = r6 * rr + r7 * rS + r8 * ry + r9 * rB,
                W[0x7] = r6 * rF + r7 * re + r8 * rd + r9 * rM,
                W[0xb] = r6 * rE + r7 * rR + r8 * rP + r9 * rX,
                W[0xf] = r6 * rp + r7 * rH + r8 * rQ + r9 * rt,
                this;
            }
            ,
            C['multiplyScalar'] = function(N) {
                var Z = this['elements'];
                return Z[0x0] *= N,
                Z[0x4] *= N,
                Z[0x8] *= N,
                Z[0xc] *= N,
                Z[0x1] *= N,
                Z[0x5] *= N,
                Z[0x9] *= N,
                Z[0xd] *= N,
                Z[0x2] *= N,
                Z[0x6] *= N,
                Z[0xa] *= N,
                Z[0xe] *= N,
                Z[0x3] *= N,
                Z[0x7] *= N,
                Z[0xb] *= N,
                Z[0xf] *= N,
                this;
            }
            ,
            C['determinant'] = function() {
                var N = this['elements']
                  , Z = N[0x0]
                  , U = N[0x4]
                  , T = N[0x8]
                  , V = N[0xc]
                  , G = N[0x1]
                  , k = N[0x5]
                  , W = N[0x9]
                  , x = N[0xd]
                  , I = N[0x2]
                  , g = N[0x6]
                  , L = N[0xa]
                  , q = N[0xe];
                return N[0x3] * (+V * W * g - T * x * g - V * k * L + U * x * L + T * k * q - U * W * q) + N[0x7] * (+Z * W * q - Z * x * L + V * G * L - T * G * q + T * x * I - V * W * I) + N[0xb] * (+Z * x * g - Z * k * q - V * G * g + U * G * q + V * k * I - U * x * I) + N[0xf] * (-T * k * I - Z * W * g + Z * k * L + T * G * g - U * G * L + U * W * I);
            }
            ,
            C['transpose'] = function() {
                var N, Z = this['elements'];
                return N = Z[0x1],
                Z[0x1] = Z[0x4],
                Z[0x4] = N,
                N = Z[0x2],
                Z[0x2] = Z[0x8],
                Z[0x8] = N,
                N = Z[0x6],
                Z[0x6] = Z[0x9],
                Z[0x9] = N,
                N = Z[0x3],
                Z[0x3] = Z[0xc],
                Z[0xc] = N,
                N = Z[0x7],
                Z[0x7] = Z[0xd],
                Z[0xd] = N,
                N = Z[0xb],
                Z[0xb] = Z[0xe],
                Z[0xe] = N,
                this;
            }
            ,
            C['setPosition'] = function(N, Z, U) {
                var T = this['elements'];
                return N['isVector3'] ? (T[0xc] = N['x'],
                T[0xd] = N['y'],
                T[0xe] = N['z']) : (T[0xc] = N,
                T[0xd] = Z,
                T[0xe] = U),
                this;
            }
            ,
            C['invert'] = function() {
                var N = this['elements']
                  , Z = N[0x0]
                  , U = N[0x1]
                  , T = N[0x2]
                  , V = N[0x3]
                  , G = N[0x4]
                  , k = N[0x5]
                  , W = N[0x6]
                  , I = N[0x7]
                  , L = N[0x8]
                  , q = N[0x9]
                  , K = N[0xa]
                  , Y = N[0xb]
                  , z = N[0xc]
                  , A = N[0xd]
                  , j = N[0xe]
                  , O = N[0xf]
                  , J = q * j * I - A * K * I + A * W * Y - k * j * Y - q * W * O + k * K * O
                  , b = z * K * I - L * j * I - z * W * Y + G * j * Y + L * W * O - G * K * O
                  , D = L * A * I - z * q * I + z * k * Y - G * A * Y - L * k * O + G * q * O
                  , r0 = z * q * W - L * A * W - z * k * K + G * A * K + L * k * j - G * q * j
                  , r1 = Z * J + U * b + T * D + V * r0;
                if (0x0 === r1)
                    return this['set'](0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0);
                var r2 = 0x1 / r1;
                return N[0x0] = J * r2,
                N[0x1] = (A * K * V - q * j * V - A * T * Y + U * j * Y + q * T * O - U * K * O) * r2,
                N[0x2] = (k * j * V - A * W * V + A * T * I - U * j * I - k * T * O + U * W * O) * r2,
                N[0x3] = (q * W * V - k * K * V - q * T * I + U * K * I + k * T * Y - U * W * Y) * r2,
                N[0x4] = b * r2,
                N[0x5] = (L * j * V - z * K * V + z * T * Y - Z * j * Y - L * T * O + Z * K * O) * r2,
                N[0x6] = (z * W * V - G * j * V - z * T * I + Z * j * I + G * T * O - Z * W * O) * r2,
                N[0x7] = (G * K * V - L * W * V + L * T * I - Z * K * I - G * T * Y + Z * W * Y) * r2,
                N[0x8] = D * r2,
                N[0x9] = (z * q * V - L * A * V - z * U * Y + Z * A * Y + L * U * O - Z * q * O) * r2,
                N[0xa] = (G * A * V - z * k * V + z * U * I - Z * A * I - G * U * O + Z * k * O) * r2,
                N[0xb] = (L * k * V - G * q * V - L * U * I + Z * q * I + G * U * Y - Z * k * Y) * r2,
                N[0xc] = r0 * r2,
                N[0xd] = (L * A * T - z * q * T + z * U * K - Z * A * K - L * U * j + Z * q * j) * r2,
                N[0xe] = (z * k * T - G * A * T - z * U * W + Z * A * W + G * U * j - Z * k * j) * r2,
                N[0xf] = (G * q * T - L * k * T + L * U * W - Z * q * W - G * U * K + Z * k * K) * r2,
                this;
            }
            ,
            C['scale'] = function(N) {
                var Z = this['elements']
                  , U = N['x']
                  , T = N['y']
                  , V = N['z'];
                return Z[0x0] *= U,
                Z[0x4] *= T,
                Z[0x8] *= V,
                Z[0x1] *= U,
                Z[0x5] *= T,
                Z[0x9] *= V,
                Z[0x2] *= U,
                Z[0x6] *= T,
                Z[0xa] *= V,
                Z[0x3] *= U,
                Z[0x7] *= T,
                Z[0xb] *= V,
                this;
            }
            ,
            C['getMaxScaleOnAxis'] = function() {
                var N = this['elements']
                  , Z = N[0x0] * N[0x0] + N[0x1] * N[0x1] + N[0x2] * N[0x2]
                  , U = N[0x4] * N[0x4] + N[0x5] * N[0x5] + N[0x6] * N[0x6]
                  , T = N[0x8] * N[0x8] + N[0x9] * N[0x9] + N[0xa] * N[0xa];
                return Math['sqrt'](Math['max'](Z, U, T));
            }
            ,
            C['makeTranslation'] = function(N, Z, U) {
                return N['isVector3'] ? this['set'](0x1, 0x0, 0x0, N['x'], 0x0, 0x1, 0x0, N['y'], 0x0, 0x0, 0x1, N['z'], 0x0, 0x0, 0x0, 0x1) : this['set'](0x1, 0x0, 0x0, N, 0x0, 0x1, 0x0, Z, 0x0, 0x0, 0x1, U, 0x0, 0x0, 0x0, 0x1),
                this;
            }
            ,
            C['makeRotationX'] = function(N) {
                var Z = Math['cos'](N)
                  , U = Math['sin'](N);
                return this['set'](0x1, 0x0, 0x0, 0x0, 0x0, Z, -U, 0x0, 0x0, U, Z, 0x0, 0x0, 0x0, 0x0, 0x1),
                this;
            }
            ,
            C['makeRotationY'] = function(N) {
                var Z = Math['cos'](N)
                  , U = Math['sin'](N);
                return this['set'](Z, 0x0, U, 0x0, 0x0, 0x1, 0x0, 0x0, -U, 0x0, Z, 0x0, 0x0, 0x0, 0x0, 0x1),
                this;
            }
            ,
            C['makeRotationZ'] = function(N) {
                var Z = Math['cos'](N)
                  , U = Math['sin'](N);
                return this['set'](Z, -U, 0x0, 0x0, U, Z, 0x0, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0, 0x1),
                this;
            }
            ,
            C['makeRotationAxis'] = function(N, Z) {
                var U = Math['cos'](Z)
                  , T = Math['sin'](Z)
                  , V = 0x1 - U
                  , G = N['x']
                  , k = N['y']
                  , W = N['z']
                  , x = V * G
                  , I = V * k;
                return this['set'](x * G + U, x * k - T * W, x * W + T * k, 0x0, x * k + T * W, I * k + U, I * W - T * G, 0x0, x * W - T * k, I * W + T * G, V * W * W + U, 0x0, 0x0, 0x0, 0x0, 0x1),
                this;
            }
            ,
            C['makeScale'] = function(N, Z, U) {
                return this['set'](N, 0x0, 0x0, 0x0, 0x0, Z, 0x0, 0x0, 0x0, 0x0, U, 0x0, 0x0, 0x0, 0x0, 0x1),
                this;
            }
            ,
            C['makeShear'] = function(N, Z, U, T, V, G) {
                return this['set'](0x1, U, V, 0x0, N, 0x1, G, 0x0, Z, T, 0x1, 0x0, 0x0, 0x0, 0x0, 0x1),
                this;
            }
            ,
            C['compose'] = function(N, Z, U) {
                var T = this['elements']
                  , V = Z['_x']
                  , G = Z['_y']
                  , k = Z['_z']
                  , W = Z['_w']
                  , I = V + V
                  , L = G + G
                  , q = k + k
                  , K = V * I
                  , Y = V * L
                  , z = V * q
                  , A = G * L
                  , j = G * q
                  , O = k * q
                  , J = W * I
                  , b = W * L
                  , D = W * q
                  , r0 = U['x']
                  , r1 = U['y']
                  , r2 = U['z'];
                return T[0x0] = (0x1 - (A + O)) * r0,
                T[0x1] = (Y + D) * r0,
                T[0x2] = (z - b) * r0,
                T[0x3] = 0x0,
                T[0x4] = (Y - D) * r1,
                T[0x5] = (0x1 - (K + O)) * r1,
                T[0x6] = (j + J) * r1,
                T[0x7] = 0x0,
                T[0x8] = (z + b) * r2,
                T[0x9] = (j - J) * r2,
                T[0xa] = (0x1 - (K + A)) * r2,
                T[0xb] = 0x0,
                T[0xc] = N['x'],
                T[0xd] = N['y'],
                T[0xe] = N['z'],
                T[0xf] = 0x1,
                this;
            }
            ,
            C['decompose'] = function(N, Z, U) {
                var T = this['elements']
                  , V = y['set'](T[0x0], T[0x1], T[0x2])['length']()
                  , G = y['set'](T[0x4], T[0x5], T[0x6])['length']()
                  , k = y['set'](T[0x8], T[0x9], T[0xa])['length']();
                this['determinant']() < 0x0 && (V = -V),
                N['x'] = T[0xc],
                N['y'] = T[0xd],
                N['z'] = T[0xe],
                P['copy'](this);
                var W = 0x1 / V
                  , x = 0x1 / G
                  , I = 0x1 / k;
                return P['elements'][0x0] *= W,
                P['elements'][0x1] *= W,
                P['elements'][0x2] *= W,
                P['elements'][0x4] *= x,
                P['elements'][0x5] *= x,
                P['elements'][0x6] *= x,
                P['elements'][0x8] *= I,
                P['elements'][0x9] *= I,
                P['elements'][0xa] *= I,
                Z['setFromRotationMatrix'](P),
                U['x'] = V,
                U['y'] = G,
                U['z'] = k,
                this;
            }
            ,
            C['makePerspective'] = function(N, Z, U, T, V, G, k) {
                void 0x0 === k && (k = S['TdN']);
                var W, x, I = this['elements'], g = 0x2 * V / (Z - N), L = 0x2 * V / (U - T), q = (Z + N) / (Z - N), K = (U + T) / (U - T);
                if (k === S['TdN'])
                    W = -(G + V) / (G - V),
                    x = -0x2 * G * V / (G - V);
                else {
                    if (k !== S['i7u'])
                        throw new Error('THREE.Matrix4.makePerspective():\x20Invalid\x20coordinate\x20system:\x20' + k);
                    W = -G / (G - V),
                    x = -G * V / (G - V);
                }
                return I[0x0] = g,
                I[0x4] = 0x0,
                I[0x8] = q,
                I[0xc] = 0x0,
                I[0x1] = 0x0,
                I[0x5] = L,
                I[0x9] = K,
                I[0xd] = 0x0,
                I[0x2] = 0x0,
                I[0x6] = 0x0,
                I[0xa] = W,
                I[0xe] = x,
                I[0x3] = 0x0,
                I[0x7] = 0x0,
                I[0xb] = -0x1,
                I[0xf] = 0x0,
                this;
            }
            ,
            C['makeOrthographic'] = function(N, Z, U, T, V, G, k) {
                void 0x0 === k && (k = S['TdN']);
                var W, x, I = this['elements'], g = 0x1 / (Z - N), L = 0x1 / (U - T), q = 0x1 / (G - V), K = (Z + N) * g, Y = (U + T) * L;
                if (k === S['TdN'])
                    W = (G + V) * q,
                    x = -0x2 * q;
                else {
                    if (k !== S['i7u'])
                        throw new Error('THREE.Matrix4.makeOrthographic():\x20Invalid\x20coordinate\x20system:\x20' + k);
                    W = V * q,
                    x = -0x1 * q;
                }
                return I[0x0] = 0x2 * g,
                I[0x4] = 0x0,
                I[0x8] = 0x0,
                I[0xc] = -K,
                I[0x1] = 0x0,
                I[0x5] = 0x2 * L,
                I[0x9] = 0x0,
                I[0xd] = -Y,
                I[0x2] = 0x0,
                I[0x6] = 0x0,
                I[0xa] = x,
                I[0xe] = -W,
                I[0x3] = 0x0,
                I[0x7] = 0x0,
                I[0xb] = 0x0,
                I[0xf] = 0x1,
                this;
            }
            ,
            C['equals'] = function(N) {
                for (var Z = this['elements'], U = N['elements'], T = 0x0; T < 0x10; T++)
                    if (Z[T] !== U[T])
                        return !0x1;
                return !0x0;
            }
            ,
            C['fromArray'] = function(N, Z) {
                void 0x0 === Z && (Z = 0x0);
                for (var U = 0x0; U < 0x10; U++)
                    this['elements'][U] = N[U + Z];
                return this;
            }
            ,
            C['toArray'] = function(N, Z) {
                void 0x0 === N && (N = []),
                void 0x0 === Z && (Z = 0x0);
                var U = this['elements'];
                return N[Z] = U[0x0],
                N[Z + 0x1] = U[0x1],
                N[Z + 0x2] = U[0x2],
                N[Z + 0x3] = U[0x3],
                N[Z + 0x4] = U[0x4],
                N[Z + 0x5] = U[0x5],
                N[Z + 0x6] = U[0x6],
                N[Z + 0x7] = U[0x7],
                N[Z + 0x8] = U[0x8],
                N[Z + 0x9] = U[0x9],
                N[Z + 0xa] = U[0xa],
                N[Z + 0xb] = U[0xb],
                N[Z + 0xc] = U[0xc],
                N[Z + 0xd] = U[0xd],
                N[Z + 0xe] = U[0xe],
                N[Z + 0xf] = U[0xf],
                N;
            }
            ,
            w;
        }())
          , y = new R['P']()
          , P = new H()
          , Q = new R['P'](0x0,0x0,0x0)
          , B = new R['P'](0x1,0x1,0x1)
          , M = new R['P']()
          , X = new R['P']()
          , m = new R['P']();
    }
    ,
    0xa3bc: (F, E, p) => {
        p['d'](E, {
            'Z': () => P
        });
        var S = p(0x3e78)
          , R = p(0x1008e)
          , H = new R['P']()
          , y = new R['P']()
          , d = new S['d']()
          , P = (function() {
            function Q(M, X) {
                void 0x0 === M && (M = new R['P'](0x1,0x0,0x0)),
                void 0x0 === X && (X = 0x0),
                this['isPlane'] = !0x0,
                this['normal'] = M,
                this['constant'] = X;
            }
            var B = Q['prototype'];
            return B['set'] = function(M, X) {
                return this['normal']['copy'](M),
                this['constant'] = X,
                this;
            }
            ,
            B['setComponents'] = function(M, X, m, w) {
                return this['normal']['set'](M, X, m),
                this['constant'] = w,
                this;
            }
            ,
            B['setFromNormalAndCoplanarPoint'] = function(M, X) {
                return this['normal']['copy'](M),
                this['constant'] = -X['dot'](this['normal']),
                this;
            }
            ,
            B['setFromCoplanarPoints'] = function(M, X, m) {
                var w = H['subVectors'](m, X)['cross'](y['subVectors'](M, X))['normalize']();
                return this['setFromNormalAndCoplanarPoint'](w, M),
                this;
            }
            ,
            B['copy'] = function(M) {
                return this['normal']['copy'](M['normal']),
                this['constant'] = M['constant'],
                this;
            }
            ,
            B['normalize'] = function() {
                var M = 0x1 / this['normal']['length']();
                return this['normal']['multiplyScalar'](M),
                this['constant'] *= M,
                this;
            }
            ,
            B['negate'] = function() {
                return this['constant'] *= -0x1,
                this['normal']['negate'](),
                this;
            }
            ,
            B['distanceToPoint'] = function(M) {
                return this['normal']['dot'](M) + this['constant'];
            }
            ,
            B['distanceToSphere'] = function(M) {
                return this['distanceToPoint'](M['center']) - M['radius'];
            }
            ,
            B['projectPoint'] = function(M, X) {
                return X['copy'](M)['addScaledVector'](this['normal'], -this['distanceToPoint'](M));
            }
            ,
            B['intersectLine'] = function(M, X) {
                var m = M['delta'](H)
                  , w = this['normal']['dot'](m);
                if (0x0 === w)
                    return 0x0 === this['distanceToPoint'](M['start']) ? X['copy'](M['start']) : null;
                var l = -(M['start']['dot'](this['normal']) + this['constant']) / w;
                return l < 0x0 || l > 0x1 ? null : X['copy'](M['start'])['addScaledVector'](m, l);
            }
            ,
            B['intersectsLine'] = function(M) {
                var X = this['distanceToPoint'](M['start'])
                  , m = this['distanceToPoint'](M['end']);
                return X < 0x0 && m > 0x0 || m < 0x0 && X > 0x0;
            }
            ,
            B['intersectsBox'] = function(M) {
                return M['intersectsPlane'](this);
            }
            ,
            B['intersectsSphere'] = function(M) {
                return M['intersectsPlane'](this);
            }
            ,
            B['coplanarPoint'] = function(M) {
                return M['copy'](this['normal'])['multiplyScalar'](-this['constant']);
            }
            ,
            B['applyMatrix4'] = function(M, X) {
                var m = X || d['getNormalMatrix'](M)
                  , w = this['coplanarPoint'](H)['applyMatrix4'](M)
                  , l = this['normal']['applyMatrix3'](m)['normalize']();
                return this['constant'] = -w['dot'](l),
                this;
            }
            ,
            B['translate'] = function(M) {
                return this['constant'] -= M['dot'](this['normal']),
                this;
            }
            ,
            B['equals'] = function(M) {
                return M['normal']['equals'](this['normal']) && M['constant'] === this['constant'];
            }
            ,
            B['clone'] = function() {
                return new this['constructor']()['copy'](this);
            }
            ,
            Q;
        }());
    }
    ,
    0x13294: (F, E, p) => {
        p['d'](E, {
            'P': () => d
        });
        var S = p(0x14124)
          , R = p(0xd5e4)
          , H = p['n'](R)
          , y = p(0xbd95)
          , d = (function() {
            function P(B, M, X, m) {
                void 0x0 === B && (B = 0x0),
                void 0x0 === M && (M = 0x0),
                void 0x0 === X && (X = 0x0),
                void 0x0 === m && (m = 0x1),
                this['isQuaternion'] = !0x0,
                this['_x'] = B,
                this['_y'] = M,
                this['_z'] = X,
                this['_w'] = m;
            }
            P['slerpFlat'] = function(B, X, w, C, N, Z, U) {
                var T = w[C + 0x0]
                  , V = w[C + 0x1]
                  , G = w[C + 0x2]
                  , k = w[C + 0x3]
                  , W = N[Z + 0x0]
                  , I = N[Z + 0x1]
                  , L = N[Z + 0x2]
                  , q = N[Z + 0x3];
                if (0x0 === U)
                    return B[X + 0x0] = T,
                    B[X + 0x1] = V,
                    B[X + 0x2] = G,
                    void (B[X + 0x3] = k);
                if (0x1 === U)
                    return B[X + 0x0] = W,
                    B[X + 0x1] = I,
                    B[X + 0x2] = L,
                    void (B[X + 0x3] = q);
                if (k !== q || T !== W || V !== I || G !== L) {
                    var K = 0x1 - U
                      , Y = T * W + V * I + G * L + k * q
                      , z = Y >= 0x0 ? 0x1 : -0x1
                      , A = 0x1 - Y * Y;
                    if (A > Number['EPSILON']) {
                        var j = Math['sqrt'](A)
                          , O = Math['atan2'](j, Y * z);
                        K = Math['sin'](K * O) / j,
                        U = Math['sin'](U * O) / j;
                    }
                    var J = U * z;
                    if (T = T * K + W * J,
                    V = V * K + I * J,
                    G = G * K + L * J,
                    k = k * K + q * J,
                    K === 0x1 - U) {
                        var b = 0x1 / Math['sqrt'](T * T + V * V + G * G + k * k);
                        T *= b,
                        V *= b,
                        G *= b,
                        k *= b;
                    }
                }
                B[X] = T,
                B[X + 0x1] = V,
                B[X + 0x2] = G,
                B[X + 0x3] = k;
            }
            ,
            P['multiplyQuaternionsFlat'] = function(B, M, X, m, w, C) {
                var N = X[m]
                  , Z = X[m + 0x1]
                  , U = X[m + 0x2]
                  , T = X[m + 0x3]
                  , V = w[C]
                  , G = w[C + 0x1]
                  , k = w[C + 0x2]
                  , W = w[C + 0x3];
                return B[M] = N * W + T * V + Z * k - U * G,
                B[M + 0x1] = Z * W + T * G + U * V - N * k,
                B[M + 0x2] = U * W + T * k + N * G - Z * V,
                B[M + 0x3] = T * W - N * V - Z * G - U * k,
                B;
            }
            ;
            var Q = P['prototype'];
            return Q['set'] = function(B, M, X, m) {
                return this['_x'] = B,
                this['_y'] = M,
                this['_z'] = X,
                this['_w'] = m,
                this['_onChangeCallback'](),
                this;
            }
            ,
            Q['clone'] = function() {
                return new this['constructor'](this['_x'],this['_y'],this['_z'],this['_w']);
            }
            ,
            Q['copy'] = function(B) {
                return this['_x'] = B['x'],
                this['_y'] = B['y'],
                this['_z'] = B['z'],
                this['_w'] = B['w'],
                this['_onChangeCallback'](),
                this;
            }
            ,
            Q['setFromEuler'] = function(B, M) {
                var X = B['_x']
                  , m = B['_y']
                  , w = B['_z']
                  , C = B['_order']
                  , N = Math['cos']
                  , Z = Math['sin']
                  , U = N(X / 0x2)
                  , T = N(m / 0x2)
                  , V = N(w / 0x2)
                  , G = Z(X / 0x2)
                  , k = Z(m / 0x2)
                  , W = Z(w / 0x2);
                switch (C) {
                case 'XYZ':
                    this['_x'] = G * T * V + U * k * W,
                    this['_y'] = U * k * V - G * T * W,
                    this['_z'] = U * T * W + G * k * V,
                    this['_w'] = U * T * V - G * k * W;
                    break;
                case 'YXZ':
                    this['_x'] = G * T * V + U * k * W,
                    this['_y'] = U * k * V - G * T * W,
                    this['_z'] = U * T * W - G * k * V,
                    this['_w'] = U * T * V + G * k * W;
                    break;
                case 'ZXY':
                    this['_x'] = G * T * V - U * k * W,
                    this['_y'] = U * k * V + G * T * W,
                    this['_z'] = U * T * W + G * k * V,
                    this['_w'] = U * T * V - G * k * W;
                    break;
                case 'ZYX':
                    this['_x'] = G * T * V - U * k * W,
                    this['_y'] = U * k * V + G * T * W,
                    this['_z'] = U * T * W - G * k * V,
                    this['_w'] = U * T * V + G * k * W;
                    break;
                case 'YZX':
                    this['_x'] = G * T * V + U * k * W,
                    this['_y'] = U * k * V + G * T * W,
                    this['_z'] = U * T * W - G * k * V,
                    this['_w'] = U * T * V - G * k * W;
                    break;
                case 'XZY':
                    this['_x'] = G * T * V - U * k * W,
                    this['_y'] = U * k * V - G * T * W,
                    this['_z'] = U * T * W + G * k * V,
                    this['_w'] = U * T * V + G * k * W;
                    break;
                default:
                    console['warn']('THREE.Quaternion:\x20.setFromEuler()\x20encountered\x20an\x20unknown\x20order:\x20' + C);
                }
                return !0x1 !== M && this['_onChangeCallback'](),
                this;
            }
            ,
            Q['setFromAxisAngle'] = function(B, M) {
                var X = M / 0x2
                  , m = Math['sin'](X);
                return this['_x'] = B['x'] * m,
                this['_y'] = B['y'] * m,
                this['_z'] = B['z'] * m,
                this['_w'] = Math['cos'](X),
                this['_onChangeCallback'](),
                this;
            }
            ,
            Q['setFromRotationMatrix'] = function(B) {
                var M = B['elements']
                  , X = M[0x0]
                  , w = M[0x4]
                  , C = M[0x8]
                  , N = M[0x1]
                  , Z = M[0x5]
                  , U = M[0x9]
                  , T = M[0x2]
                  , V = M[0x6]
                  , G = M[0xa]
                  , k = X + Z + G;
                if (k > 0x0) {
                    var W = 0.5 / Math['sqrt'](k + 0x1);
                    this['_w'] = 0.25 / W,
                    this['_x'] = (V - U) * W,
                    this['_y'] = (C - T) * W,
                    this['_z'] = (N - w) * W;
                } else {
                    if (X > Z && X > G) {
                        var x = 0x2 * Math['sqrt'](0x1 + X - Z - G);
                        this['_w'] = (V - U) / x,
                        this['_x'] = 0.25 * x,
                        this['_y'] = (w + N) / x,
                        this['_z'] = (C + T) / x;
                    } else {
                        if (Z > G) {
                            var I = 0x2 * Math['sqrt'](0x1 + Z - X - G);
                            this['_w'] = (C - T) / I,
                            this['_x'] = (w + N) / I,
                            this['_y'] = 0.25 * I,
                            this['_z'] = (U + V) / I;
                        } else {
                            var g = 0x2 * Math['sqrt'](0x1 + G - X - Z);
                            this['_w'] = (N - w) / g,
                            this['_x'] = (C + T) / g,
                            this['_y'] = (U + V) / g,
                            this['_z'] = 0.25 * g;
                        }
                    }
                }
                return this['_onChangeCallback'](),
                this;
            }
            ,
            Q['setFromUnitVectors'] = function(B, M) {
                var X = B['dot'](M) + 0x1;
                return X < Number['EPSILON'] ? (X = 0x0,
                Math['abs'](B['x']) > Math['abs'](B['z']) ? (this['_x'] = -B['y'],
                this['_y'] = B['x'],
                this['_z'] = 0x0,
                this['_w'] = X) : (this['_x'] = 0x0,
                this['_y'] = -B['z'],
                this['_z'] = B['y'],
                this['_w'] = X)) : (this['_x'] = B['y'] * M['z'] - B['z'] * M['y'],
                this['_y'] = B['z'] * M['x'] - B['x'] * M['z'],
                this['_z'] = B['x'] * M['y'] - B['y'] * M['x'],
                this['_w'] = X),
                this['normalize']();
            }
            ,
            Q['angleTo'] = function(B) {
                return 0x2 * Math['acos'](Math['abs'](y['qE'](this['dot'](B), -0x1, 0x1)));
            }
            ,
            Q['rotateTowards'] = function(B, M) {
                var X = this['angleTo'](B);
                if (0x0 === X)
                    return this;
                var m = Math['min'](0x1, M / X);
                return this['slerp'](B, m),
                this;
            }
            ,
            Q['identity'] = function() {
                return this['set'](0x0, 0x0, 0x0, 0x1);
            }
            ,
            Q['invert'] = function() {
                return this['conjugate']();
            }
            ,
            Q['conjugate'] = function() {
                return this['_x'] *= -0x1,
                this['_y'] *= -0x1,
                this['_z'] *= -0x1,
                this['_onChangeCallback'](),
                this;
            }
            ,
            Q['dot'] = function(B) {
                return this['_x'] * B['_x'] + this['_y'] * B['_y'] + this['_z'] * B['_z'] + this['_w'] * B['_w'];
            }
            ,
            Q['lengthSq'] = function() {
                return this['_x'] * this['_x'] + this['_y'] * this['_y'] + this['_z'] * this['_z'] + this['_w'] * this['_w'];
            }
            ,
            Q['length'] = function() {
                return Math['sqrt'](this['_x'] * this['_x'] + this['_y'] * this['_y'] + this['_z'] * this['_z'] + this['_w'] * this['_w']);
            }
            ,
            Q['normalize'] = function() {
                var B = this['length']();
                return 0x0 === B ? (this['_x'] = 0x0,
                this['_y'] = 0x0,
                this['_z'] = 0x0,
                this['_w'] = 0x1) : (B = 0x1 / B,
                this['_x'] = this['_x'] * B,
                this['_y'] = this['_y'] * B,
                this['_z'] = this['_z'] * B,
                this['_w'] = this['_w'] * B),
                this['_onChangeCallback'](),
                this;
            }
            ,
            Q['multiply'] = function(B) {
                return this['multiplyQuaternions'](this, B);
            }
            ,
            Q['premultiply'] = function(B) {
                return this['multiplyQuaternions'](B, this);
            }
            ,
            Q['multiplyQuaternions'] = function(B, M) {
                var X = B['_x']
                  , m = B['_y']
                  , w = B['_z']
                  , C = B['_w']
                  , N = M['_x']
                  , Z = M['_y']
                  , h = M['_z']
                  , U = M['_w'];
                return this['_x'] = X * U + C * N + m * h - w * Z,
                this['_y'] = m * U + C * Z + w * N - X * h,
                this['_z'] = w * U + C * h + X * Z - m * N,
                this['_w'] = C * U - X * N - m * Z - w * h,
                this['_onChangeCallback'](),
                this;
            }
            ,
            Q['slerp'] = function(B, M) {
                if (0x0 === M)
                    return this;
                if (0x1 === M)
                    return this['copy'](B);
                var X = this['_x']
                  , m = this['_y']
                  , w = this['_z']
                  , C = this['_w']
                  , N = C * B['_w'] + X * B['_x'] + m * B['_y'] + w * B['_z'];
                if (N < 0x0 ? (this['_w'] = -B['_w'],
                this['_x'] = -B['_x'],
                this['_y'] = -B['_y'],
                this['_z'] = -B['_z'],
                N = -N) : this['copy'](B),
                N >= 0x1)
                    return this['_w'] = C,
                    this['_x'] = X,
                    this['_y'] = m,
                    this['_z'] = w,
                    this;
                var Z = 0x1 - N * N;
                if (Z <= Number['EPSILON']) {
                    var U = 0x1 - M;
                    return this['_w'] = U * C + M * this['_w'],
                    this['_x'] = U * X + M * this['_x'],
                    this['_y'] = U * m + M * this['_y'],
                    this['_z'] = U * w + M * this['_z'],
                    this['normalize'](),
                    this['_onChangeCallback'](),
                    this;
                }
                var T = Math['sqrt'](Z)
                  , V = Math['atan2'](T, N)
                  , G = Math['sin']((0x1 - M) * V) / T
                  , k = Math['sin'](M * V) / T;
                return this['_w'] = C * G + this['_w'] * k,
                this['_x'] = X * G + this['_x'] * k,
                this['_y'] = m * G + this['_y'] * k,
                this['_z'] = w * G + this['_z'] * k,
                this['_onChangeCallback'](),
                this;
            }
            ,
            Q['slerpQuaternions'] = function(B, M, X) {
                return this['copy'](B)['slerp'](M, X);
            }
            ,
            Q['random'] = function() {
                var B = Math['random']()
                  , M = Math['sqrt'](0x1 - B)
                  , X = Math['sqrt'](B)
                  , m = 0x2 * Math['PI'] * Math['random']()
                  , w = 0x2 * Math['PI'] * Math['random']();
                return this['set'](M * Math['cos'](m), X * Math['sin'](w), X * Math['cos'](w), M * Math['sin'](m));
            }
            ,
            Q['equals'] = function(B) {
                return B['_x'] === this['_x'] && B['_y'] === this['_y'] && B['_z'] === this['_z'] && B['_w'] === this['_w'];
            }
            ,
            Q['fromArray'] = function(B, M) {
                return void 0x0 === M && (M = 0x0),
                this['_x'] = B[M],
                this['_y'] = B[M + 0x1],
                this['_z'] = B[M + 0x2],
                this['_w'] = B[M + 0x3],
                this['_onChangeCallback'](),
                this;
            }
            ,
            Q['toArray'] = function(B, M) {
                return void 0x0 === B && (B = []),
                void 0x0 === M && (M = 0x0),
                B[M] = this['_x'],
                B[M + 0x1] = this['_y'],
                B[M + 0x2] = this['_z'],
                B[M + 0x3] = this['_w'],
                B;
            }
            ,
            Q['fromBufferAttribute'] = function(B, M) {
                return this['_x'] = B['getX'](M),
                this['_y'] = B['getY'](M),
                this['_z'] = B['getZ'](M),
                this['_w'] = B['getW'](M),
                this;
            }
            ,
            Q['toJSON'] = function() {
                return this['toArray']();
            }
            ,
            Q['_onChange'] = function(B) {
                return this['_onChangeCallback'] = B,
                this;
            }
            ,
            Q['_onChangeCallback'] = function() {}
            ,
            Q[Symbol['iterator']] = H()['mark'](function B() {
                return H()['wrap'](function(M) {
                    for (; ; )
                        switch (M['prev'] = M['next']) {
                        case 0x0:
                            return M['next'] = 0x2,
                            this['_x'];
                        case 0x2:
                            return M['next'] = 0x4,
                            this['_y'];
                        case 0x4:
                            return M['next'] = 0x6,
                            this['_z'];
                        case 0x6:
                            return M['next'] = 0x8,
                            this['_w'];
                        case 0x8:
                        case 'end':
                            return M['stop']();
                        }
                }, B, this);
            }),
            (0x0,
            S['A'])(P, [{
                'key': 'x',
                'get': function() {
                    return this['_x'];
                },
                'set': function(M) {
                    this['_x'] = M,
                    this['_onChangeCallback']();
                }
            }, {
                'key': 'y',
                'get': function() {
                    return this['_y'];
                },
                'set': function(M) {
                    this['_y'] = M,
                    this['_onChangeCallback']();
                }
            }, {
                'key': 'z',
                'get': function() {
                    return this['_z'];
                },
                'set': function(M) {
                    this['_z'] = M,
                    this['_onChangeCallback']();
                }
            }, {
                'key': 'w',
                'get': function() {
                    return this['_w'];
                },
                'set': function(M) {
                    this['_w'] = M,
                    this['_onChangeCallback']();
                }
            }]);
        }());
    }
    ,
    0xbf9a: (F, E, p) => {
        p['d'](E, {
            'R': () => M
        });
        var S = p(0x1008e)
          , R = new S['P']()
          , H = new S['P']()
          , y = new S['P']()
          , d = new S['P']()
          , P = new S['P']()
          , Q = new S['P']()
          , B = new S['P']()
          , M = (function() {
            function X(w, C) {
                void 0x0 === w && (w = new S['P']()),
                void 0x0 === C && (C = new S['P'](0x0,0x0,-0x1)),
                this['origin'] = w,
                this['direction'] = C;
            }
            var m = X['prototype'];
            return m['set'] = function(w, C) {
                return this['origin']['copy'](w),
                this['direction']['copy'](C),
                this;
            }
            ,
            m['copy'] = function(w) {
                return this['origin']['copy'](w['origin']),
                this['direction']['copy'](w['direction']),
                this;
            }
            ,
            m['at'] = function(w, C) {
                return C['copy'](this['origin'])['addScaledVector'](this['direction'], w);
            }
            ,
            m['lookAt'] = function(w) {
                return this['direction']['copy'](w)['sub'](this['origin'])['normalize'](),
                this;
            }
            ,
            m['recast'] = function(w) {
                return this['origin']['copy'](this['at'](w, R)),
                this;
            }
            ,
            m['closestPointToPoint'] = function(w, C) {
                C['subVectors'](w, this['origin']);
                var N = C['dot'](this['direction']);
                return N < 0x0 ? C['copy'](this['origin']) : C['copy'](this['origin'])['addScaledVector'](this['direction'], N);
            }
            ,
            m['distanceToPoint'] = function(w) {
                return Math['sqrt'](this['distanceSqToPoint'](w));
            }
            ,
            m['distanceSqToPoint'] = function(w) {
                var C = R['subVectors'](w, this['origin'])['dot'](this['direction']);
                return C < 0x0 ? this['origin']['distanceToSquared'](w) : (R['copy'](this['origin'])['addScaledVector'](this['direction'], C),
                R['distanceToSquared'](w));
            }
            ,
            m['distanceSqToSegment'] = function(w, C, N, Z) {
                H['copy'](w)['add'](C)['multiplyScalar'](0.5),
                y['copy'](C)['sub'](w)['normalize'](),
                d['copy'](this['origin'])['sub'](H);
                var U, T, V, G, k = 0.5 * w['distanceTo'](C), W = -this['direction']['dot'](y), x = d['dot'](this['direction']), I = -d['dot'](y), L = d['lengthSq'](), q = Math['abs'](0x1 - W * W);
                if (q > 0x0) {
                    if (T = W * x - I,
                    G = k * q,
                    (U = W * I - x) >= 0x0) {
                        if (T >= -G) {
                            if (T <= G) {
                                var K = 0x1 / q;
                                V = (U *= K) * (U + W * (T *= K) + 0x2 * x) + T * (W * U + T + 0x2 * I) + L;
                            } else
                                T = k,
                                V = -(U = Math['max'](0x0, -(W * T + x))) * U + T * (T + 0x2 * I) + L;
                        } else
                            T = -k,
                            V = -(U = Math['max'](0x0, -(W * T + x))) * U + T * (T + 0x2 * I) + L;
                    } else
                        T <= -G ? V = -(U = Math['max'](0x0, -(-W * k + x))) * U + (T = U > 0x0 ? -k : Math['min'](Math['max'](-k, -I), k)) * (T + 0x2 * I) + L : T <= G ? (U = 0x0,
                        V = (T = Math['min'](Math['max'](-k, -I), k)) * (T + 0x2 * I) + L) : V = -(U = Math['max'](0x0, -(W * k + x))) * U + (T = U > 0x0 ? k : Math['min'](Math['max'](-k, -I), k)) * (T + 0x2 * I) + L;
                } else
                    T = W > 0x0 ? -k : k,
                    V = -(U = Math['max'](0x0, -(W * T + x))) * U + T * (T + 0x2 * I) + L;
                return N && N['copy'](this['origin'])['addScaledVector'](this['direction'], U),
                Z && Z['copy'](H)['addScaledVector'](y, T),
                V;
            }
            ,
            m['intersectSphere'] = function(w, C) {
                R['subVectors'](w['center'], this['origin']);
                var N = R['dot'](this['direction'])
                  , Z = R['dot'](R) - N * N
                  , U = w['radius'] * w['radius'];
                if (Z > U)
                    return null;
                var T = Math['sqrt'](U - Z)
                  , V = N - T
                  , G = N + T;
                return G < 0x0 ? null : V < 0x0 ? this['at'](G, C) : this['at'](V, C);
            }
            ,
            m['intersectsSphere'] = function(w) {
                return this['distanceSqToPoint'](w['center']) <= w['radius'] * w['radius'];
            }
            ,
            m['distanceToPlane'] = function(w) {
                var C = w['normal']['dot'](this['direction']);
                if (0x0 === C)
                    return 0x0 === w['distanceToPoint'](this['origin']) ? 0x0 : null;
                var N = -(this['origin']['dot'](w['normal']) + w['constant']) / C;
                return N >= 0x0 ? N : null;
            }
            ,
            m['intersectPlane'] = function(w, C) {
                var N = this['distanceToPlane'](w);
                return null === N ? null : this['at'](N, C);
            }
            ,
            m['intersectsPlane'] = function(w) {
                var C = w['distanceToPoint'](this['origin']);
                return 0x0 === C || w['normal']['dot'](this['direction']) * C < 0x0;
            }
            ,
            m['intersectBox'] = function(w, C) {
                var N, Z, U, T, V, G, k = 0x1 / this['direction']['x'], W = 0x1 / this['direction']['y'], x = 0x1 / this['direction']['z'], I = this['origin'];
                return k >= 0x0 ? (N = (w['min']['x'] - I['x']) * k,
                Z = (w['max']['x'] - I['x']) * k) : (N = (w['max']['x'] - I['x']) * k,
                Z = (w['min']['x'] - I['x']) * k),
                W >= 0x0 ? (U = (w['min']['y'] - I['y']) * W,
                T = (w['max']['y'] - I['y']) * W) : (U = (w['max']['y'] - I['y']) * W,
                T = (w['min']['y'] - I['y']) * W),
                N > T || U > Z ? null : ((U > N || isNaN(N)) && (N = U),
                (T < Z || isNaN(Z)) && (Z = T),
                x >= 0x0 ? (V = (w['min']['z'] - I['z']) * x,
                G = (w['max']['z'] - I['z']) * x) : (V = (w['max']['z'] - I['z']) * x,
                G = (w['min']['z'] - I['z']) * x),
                N > G || V > Z ? null : ((V > N || N != N) && (N = V),
                (G < Z || Z != Z) && (Z = G),
                Z < 0x0 ? null : this['at'](N >= 0x0 ? N : Z, C)));
            }
            ,
            m['intersectsBox'] = function(w) {
                return null !== this['intersectBox'](w, R);
            }
            ,
            m['intersectTriangle'] = function(w, C, N, Z, U) {
                P['subVectors'](C, w),
                Q['subVectors'](N, w),
                B['crossVectors'](P, Q);
                var T, V = this['direction']['dot'](B);
                if (V > 0x0) {
                    if (Z)
                        return null;
                    T = 0x1;
                } else {
                    if (!(V < 0x0))
                        return null;
                    T = -0x1,
                    V = -V;
                }
                d['subVectors'](this['origin'], w);
                var G = T * this['direction']['dot'](Q['crossVectors'](d, Q));
                if (G < 0x0)
                    return null;
                var k = T * this['direction']['dot'](P['cross'](d));
                if (k < 0x0)
                    return null;
                if (G + k > V)
                    return null;
                var W = -T * d['dot'](B);
                return W < 0x0 ? null : this['at'](W / V, U);
            }
            ,
            m['applyMatrix4'] = function(w) {
                return this['origin']['applyMatrix4'](w),
                this['direction']['transformDirection'](w),
                this;
            }
            ,
            m['equals'] = function(w) {
                return w['origin']['equals'](this['origin']) && w['direction']['equals'](this['direction']);
            }
            ,
            m['clone'] = function() {
                return new this['constructor']()['copy'](this);
            }
            ,
            X;
        }());
    }
    ,
    0x79b5: (F, E, p) => {
        p['d'](E, {
            'i': () => P
        });
        var S = p(0x7002)
          , R = p(0x1008e)
          , H = new S['N']()
          , y = new R['P']()
          , d = new R['P']()
          , P = (function() {
            function Q(M, X) {
                void 0x0 === M && (M = new R['P']()),
                void 0x0 === X && (X = -0x1),
                this['center'] = M,
                this['radius'] = X;
            }
            var B = Q['prototype'];
            return B['set'] = function(M, X) {
                return this['center']['copy'](M),
                this['radius'] = X,
                this;
            }
            ,
            B['setFromPoints'] = function(M, X) {
                var m = this['center'];
                void 0x0 !== X ? m['copy'](X) : H['setFromPoints'](M)['getCenter'](m);
                for (var w = 0x0, l = 0x0, C = M['length']; l < C; l++)
                    w = Math['max'](w, m['distanceToSquared'](M[l]));
                return this['radius'] = Math['sqrt'](w),
                this;
            }
            ,
            B['copy'] = function(M) {
                return this['center']['copy'](M['center']),
                this['radius'] = M['radius'],
                this;
            }
            ,
            B['isEmpty'] = function() {
                return this['radius'] < 0x0;
            }
            ,
            B['makeEmpty'] = function() {
                return this['center']['set'](0x0, 0x0, 0x0),
                this['radius'] = -0x1,
                this;
            }
            ,
            B['containsPoint'] = function(M) {
                return M['distanceToSquared'](this['center']) <= this['radius'] * this['radius'];
            }
            ,
            B['distanceToPoint'] = function(M) {
                return M['distanceTo'](this['center']) - this['radius'];
            }
            ,
            B['intersectsSphere'] = function(M) {
                var X = this['radius'] + M['radius'];
                return M['center']['distanceToSquared'](this['center']) <= X * X;
            }
            ,
            B['intersectsBox'] = function(M) {
                return M['intersectsSphere'](this);
            }
            ,
            B['intersectsPlane'] = function(M) {
                return Math['abs'](M['distanceToPoint'](this['center'])) <= this['radius'];
            }
            ,
            B['clampPoint'] = function(M, X) {
                var m = this['center']['distanceToSquared'](M);
                return X['copy'](M),
                m > this['radius'] * this['radius'] && (X['sub'](this['center'])['normalize'](),
                X['multiplyScalar'](this['radius'])['add'](this['center'])),
                X;
            }
            ,
            B['getBoundingBox'] = function(M) {
                return this['isEmpty']() ? (M['makeEmpty'](),
                M) : (M['set'](this['center'], this['center']),
                M['expandByScalar'](this['radius']),
                M);
            }
            ,
            B['applyMatrix4'] = function(M) {
                return this['center']['applyMatrix4'](M),
                this['radius'] = this['radius'] * M['getMaxScaleOnAxis'](),
                this;
            }
            ,
            B['translate'] = function(M) {
                return this['center']['add'](M),
                this;
            }
            ,
            B['expandByPoint'] = function(M) {
                if (this['isEmpty']())
                    return this['center']['copy'](M),
                    this['radius'] = 0x0,
                    this;
                y['subVectors'](M, this['center']);
                var X = y['lengthSq']();
                if (X > this['radius'] * this['radius']) {
                    var m = Math['sqrt'](X)
                      , w = 0.5 * (m - this['radius']);
                    this['center']['addScaledVector'](y, w / m),
                    this['radius'] += w;
                }
                return this;
            }
            ,
            B['union'] = function(M) {
                return M['isEmpty']() ? this : this['isEmpty']() ? (this['copy'](M),
                this) : (!0x0 === this['center']['equals'](M['center']) ? this['radius'] = Math['max'](this['radius'], M['radius']) : (d['subVectors'](M['center'], this['center'])['setLength'](M['radius']),
                this['expandByPoint'](y['copy'](M['center'])['add'](d)),
                this['expandByPoint'](y['copy'](M['center'])['sub'](d))),
                this);
            }
            ,
            B['equals'] = function(M) {
                return M['center']['equals'](this['center']) && M['radius'] === this['radius'];
            }
            ,
            B['clone'] = function() {
                return new this['constructor']()['copy'](this);
            }
            ,
            Q;
        }());
    }
    ,
    0x2755: (r, F, E) => {
        E(0xbd95);
    }
    ,
    0xe3ac: (r, F, E) => {
        E(0x1008e);
    }
    ,
    0x37c8: (F, E, S) => {
        S['d'](E, {
            'l': () => U
        });
        var R = S(0x1008e)
          , H = new R['P']()
          , y = new R['P']()
          , P = new R['P']()
          , Q = new R['P']()
          , B = new R['P']()
          , M = new R['P']()
          , X = new R['P']()
          , w = new R['P']()
          , C = new R['P']()
          , N = new R['P']()
          , Z = !0x1
          , U = (function() {
            function T(G, k, W) {
                void 0x0 === G && (G = new R['P']()),
                void 0x0 === k && (k = new R['P']()),
                void 0x0 === W && (W = new R['P']()),
                this['a'] = G,
                this['b'] = k,
                this['c'] = W;
            }
            T['getNormal'] = function(G, k, W, x) {
                x['subVectors'](W, k),
                H['subVectors'](G, k),
                x['cross'](H);
                var I = x['lengthSq']();
                return I > 0x0 ? x['multiplyScalar'](0x1 / Math['sqrt'](I)) : x['set'](0x0, 0x0, 0x0);
            }
            ,
            T['getBarycoord'] = function(G, k, W, x, I) {
                H['subVectors'](x, k),
                y['subVectors'](W, k),
                P['subVectors'](G, k);
                var g = H['dot'](H)
                  , L = H['dot'](y)
                  , q = H['dot'](P)
                  , K = y['dot'](y)
                  , Y = y['dot'](P)
                  , z = g * K - L * L;
                if (0x0 === z)
                    return I['set'](-0x2, -0x1, -0x1);
                var A = 0x1 / z
                  , j = (K * q - L * Y) * A
                  , O = (g * Y - L * q) * A;
                return I['set'](0x1 - j - O, O, j);
            }
            ,
            T['containsPoint'] = function(G, k, W, x) {
                return this['getBarycoord'](G, k, W, x, Q),
                Q['x'] >= 0x0 && Q['y'] >= 0x0 && Q['x'] + Q['y'] <= 0x1;
            }
            ,
            T['getUV'] = function(G, k, W, x, I, g, L, q) {
                return !0x1 === Z && (console['warn']('THREE.Triangle.getUV()\x20has\x20been\x20renamed\x20to\x20THREE.Triangle.getInterpolation().'),
                Z = !0x0),
                this['getInterpolation'](G, k, W, x, I, g, L, q);
            }
            ,
            T['getInterpolation'] = function(G, k, W, x, I, g, L, q) {
                return this['getBarycoord'](G, k, W, x, Q),
                q['setScalar'](0x0),
                q['addScaledVector'](I, Q['x']),
                q['addScaledVector'](g, Q['y']),
                q['addScaledVector'](L, Q['z']),
                q;
            }
            ,
            T['isFrontFacing'] = function(G, k, W, x) {
                return H['subVectors'](W, k),
                y['subVectors'](G, k),
                H['cross'](y)['dot'](x) < 0x0;
            }
            ;
            var V = T['prototype'];
            return V['set'] = function(G, k, W) {
                return this['a']['copy'](G),
                this['b']['copy'](k),
                this['c']['copy'](W),
                this;
            }
            ,
            V['setFromPointsAndIndices'] = function(G, k, W, x) {
                return this['a']['copy'](G[k]),
                this['b']['copy'](G[W]),
                this['c']['copy'](G[x]),
                this;
            }
            ,
            V['setFromAttributeAndIndices'] = function(G, k, W, x) {
                return this['a']['fromBufferAttribute'](G, k),
                this['b']['fromBufferAttribute'](G, W),
                this['c']['fromBufferAttribute'](G, x),
                this;
            }
            ,
            V['clone'] = function() {
                return new this['constructor']()['copy'](this);
            }
            ,
            V['copy'] = function(G) {
                return this['a']['copy'](G['a']),
                this['b']['copy'](G['b']),
                this['c']['copy'](G['c']),
                this;
            }
            ,
            V['getArea'] = function() {
                return H['subVectors'](this['c'], this['b']),
                y['subVectors'](this['a'], this['b']),
                0.5 * H['cross'](y)['length']();
            }
            ,
            V['getMidpoint'] = function(G) {
                return G['addVectors'](this['a'], this['b'])['add'](this['c'])['multiplyScalar'](0x1 / 0x3);
            }
            ,
            V['getNormal'] = function(G) {
                return T['getNormal'](this['a'], this['b'], this['c'], G);
            }
            ,
            V['getPlane'] = function(G) {
                return G['setFromCoplanarPoints'](this['a'], this['b'], this['c']);
            }
            ,
            V['getBarycoord'] = function(G, k) {
                return T['getBarycoord'](G, this['a'], this['b'], this['c'], k);
            }
            ,
            V['getUV'] = function(G, k, W, x, I) {
                return !0x1 === Z && (console['warn']('THREE.Triangle.getUV()\x20has\x20been\x20renamed\x20to\x20THREE.Triangle.getInterpolation().'),
                Z = !0x0),
                T['getInterpolation'](G, this['a'], this['b'], this['c'], k, W, x, I);
            }
            ,
            V['getInterpolation'] = function(G, k, W, x, I) {
                return T['getInterpolation'](G, this['a'], this['b'], this['c'], k, W, x, I);
            }
            ,
            V['containsPoint'] = function(G) {
                return T['containsPoint'](G, this['a'], this['b'], this['c']);
            }
            ,
            V['isFrontFacing'] = function(G) {
                return T['isFrontFacing'](this['a'], this['b'], this['c'], G);
            }
            ,
            V['intersectsBox'] = function(G) {
                return G['intersectsTriangle'](this);
            }
            ,
            V['closestPointToPoint'] = function(G, k) {
                var W, I, L = this['a'], q = this['b'], K = this['c'];
                B['subVectors'](q, L),
                M['subVectors'](K, L),
                w['subVectors'](G, L);
                var Y = B['dot'](w)
                  , z = M['dot'](w);
                if (Y <= 0x0 && z <= 0x0)
                    return k['copy'](L);
                C['subVectors'](G, q);
                var A = B['dot'](C)
                  , j = M['dot'](C);
                if (A >= 0x0 && j <= A)
                    return k['copy'](q);
                var O = Y * j - A * z;
                if (O <= 0x0 && Y >= 0x0 && A <= 0x0)
                    return W = Y / (Y - A),
                    k['copy'](L)['addScaledVector'](B, W);
                N['subVectors'](G, K);
                var J = B['dot'](N)
                  , b = M['dot'](N);
                if (b >= 0x0 && J <= b)
                    return k['copy'](K);
                var D = J * z - Y * b;
                if (D <= 0x0 && z >= 0x0 && b <= 0x0)
                    return I = z / (z - b),
                    k['copy'](L)['addScaledVector'](M, I);
                var r0 = A * b - J * j;
                if (r0 <= 0x0 && j - A >= 0x0 && J - b >= 0x0)
                    return X['subVectors'](K, q),
                    I = (j - A) / (j - A + (J - b)),
                    k['copy'](q)['addScaledVector'](X, I);
                var r1 = 0x1 / (r0 + D + O);
                return W = D * r1,
                I = O * r1,
                k['copy'](L)['addScaledVector'](B, W)['addScaledVector'](M, I);
            }
            ,
            V['equals'] = function(G) {
                return G['a']['equals'](this['a']) && G['b']['equals'](this['b']) && G['c']['equals'](this['c']);
            }
            ,
            T;
        }());
    }
    ,
    0x1264d: (F, E, p) => {
        p['d'](E, {
            'I': () => d
        });
        var S = p(0x14124)
          , R = p(0xd5e4)
          , H = p['n'](R)
          , y = p(0xbd95)
          , d = (function() {
            function P(B, M) {
                void 0x0 === B && (B = 0x0),
                void 0x0 === M && (M = 0x0),
                P['prototype']['isVector2'] = !0x0,
                this['x'] = B,
                this['y'] = M;
            }
            var Q = P['prototype'];
            return Q['set'] = function(B, M) {
                return this['x'] = B,
                this['y'] = M,
                this;
            }
            ,
            Q['setScalar'] = function(B) {
                return this['x'] = B,
                this['y'] = B,
                this;
            }
            ,
            Q['setX'] = function(B) {
                return this['x'] = B,
                this;
            }
            ,
            Q['setY'] = function(B) {
                return this['y'] = B,
                this;
            }
            ,
            Q['setComponent'] = function(B, M) {
                switch (B) {
                case 0x0:
                    this['x'] = M;
                    break;
                case 0x1:
                    this['y'] = M;
                    break;
                default:
                    throw new Error('index\x20is\x20out\x20of\x20range:\x20' + B);
                }
                return this;
            }
            ,
            Q['getComponent'] = function(B) {
                switch (B) {
                case 0x0:
                    return this['x'];
                case 0x1:
                    return this['y'];
                default:
                    throw new Error('index\x20is\x20out\x20of\x20range:\x20' + B);
                }
            }
            ,
            Q['clone'] = function() {
                return new this['constructor'](this['x'],this['y']);
            }
            ,
            Q['copy'] = function(B) {
                return this['x'] = B['x'],
                this['y'] = B['y'],
                this;
            }
            ,
            Q['add'] = function(B) {
                return this['x'] += B['x'],
                this['y'] += B['y'],
                this;
            }
            ,
            Q['addScalar'] = function(B) {
                return this['x'] += B,
                this['y'] += B,
                this;
            }
            ,
            Q['addVectors'] = function(B, M) {
                return this['x'] = B['x'] + M['x'],
                this['y'] = B['y'] + M['y'],
                this;
            }
            ,
            Q['addScaledVector'] = function(B, M) {
                return this['x'] += B['x'] * M,
                this['y'] += B['y'] * M,
                this;
            }
            ,
            Q['sub'] = function(B) {
                return this['x'] -= B['x'],
                this['y'] -= B['y'],
                this;
            }
            ,
            Q['subScalar'] = function(B) {
                return this['x'] -= B,
                this['y'] -= B,
                this;
            }
            ,
            Q['subVectors'] = function(B, M) {
                return this['x'] = B['x'] - M['x'],
                this['y'] = B['y'] - M['y'],
                this;
            }
            ,
            Q['multiply'] = function(B) {
                return this['x'] *= B['x'],
                this['y'] *= B['y'],
                this;
            }
            ,
            Q['multiplyScalar'] = function(B) {
                return this['x'] *= B,
                this['y'] *= B,
                this;
            }
            ,
            Q['divide'] = function(B) {
                return this['x'] /= B['x'],
                this['y'] /= B['y'],
                this;
            }
            ,
            Q['divideScalar'] = function(B) {
                return this['multiplyScalar'](0x1 / B);
            }
            ,
            Q['applyMatrix3'] = function(B) {
                var M = this['x']
                  , X = this['y']
                  , m = B['elements'];
                return this['x'] = m[0x0] * M + m[0x3] * X + m[0x6],
                this['y'] = m[0x1] * M + m[0x4] * X + m[0x7],
                this;
            }
            ,
            Q['min'] = function(B) {
                return this['x'] = Math['min'](this['x'], B['x']),
                this['y'] = Math['min'](this['y'], B['y']),
                this;
            }
            ,
            Q['max'] = function(B) {
                return this['x'] = Math['max'](this['x'], B['x']),
                this['y'] = Math['max'](this['y'], B['y']),
                this;
            }
            ,
            Q['clamp'] = function(B, M) {
                return this['x'] = Math['max'](B['x'], Math['min'](M['x'], this['x'])),
                this['y'] = Math['max'](B['y'], Math['min'](M['y'], this['y'])),
                this;
            }
            ,
            Q['clampScalar'] = function(B, M) {
                return this['x'] = Math['max'](B, Math['min'](M, this['x'])),
                this['y'] = Math['max'](B, Math['min'](M, this['y'])),
                this;
            }
            ,
            Q['clampLength'] = function(B, M) {
                var X = this['length']();
                return this['divideScalar'](X || 0x1)['multiplyScalar'](Math['max'](B, Math['min'](M, X)));
            }
            ,
            Q['floor'] = function() {
                return this['x'] = Math['floor'](this['x']),
                this['y'] = Math['floor'](this['y']),
                this;
            }
            ,
            Q['ceil'] = function() {
                return this['x'] = Math['ceil'](this['x']),
                this['y'] = Math['ceil'](this['y']),
                this;
            }
            ,
            Q['round'] = function() {
                return this['x'] = Math['round'](this['x']),
                this['y'] = Math['round'](this['y']),
                this;
            }
            ,
            Q['roundToZero'] = function() {
                return this['x'] = Math['trunc'](this['x']),
                this['y'] = Math['trunc'](this['y']),
                this;
            }
            ,
            Q['negate'] = function() {
                return this['x'] = -this['x'],
                this['y'] = -this['y'],
                this;
            }
            ,
            Q['dot'] = function(B) {
                return this['x'] * B['x'] + this['y'] * B['y'];
            }
            ,
            Q['cross'] = function(B) {
                return this['x'] * B['y'] - this['y'] * B['x'];
            }
            ,
            Q['lengthSq'] = function() {
                return this['x'] * this['x'] + this['y'] * this['y'];
            }
            ,
            Q['length'] = function() {
                return Math['sqrt'](this['x'] * this['x'] + this['y'] * this['y']);
            }
            ,
            Q['manhattanLength'] = function() {
                return Math['abs'](this['x']) + Math['abs'](this['y']);
            }
            ,
            Q['normalize'] = function() {
                return this['divideScalar'](this['length']() || 0x1);
            }
            ,
            Q['angle'] = function() {
                var B = Math['atan2'](-this['y'], -this['x']) + Math['PI'];
                return B;
            }
            ,
            Q['angleTo'] = function(B) {
                var M = Math['sqrt'](this['lengthSq']() * B['lengthSq']());
                if (0x0 === M)
                    return Math['PI'] / 0x2;
                var X = this['dot'](B) / M;
                return Math['acos'](y['qE'](X, -0x1, 0x1));
            }
            ,
            Q['distanceTo'] = function(B) {
                return Math['sqrt'](this['distanceToSquared'](B));
            }
            ,
            Q['distanceToSquared'] = function(B) {
                var M = this['x'] - B['x']
                  , X = this['y'] - B['y'];
                return M * M + X * X;
            }
            ,
            Q['manhattanDistanceTo'] = function(B) {
                return Math['abs'](this['x'] - B['x']) + Math['abs'](this['y'] - B['y']);
            }
            ,
            Q['setLength'] = function(B) {
                return this['normalize']()['multiplyScalar'](B);
            }
            ,
            Q['lerp'] = function(B, M) {
                return this['x'] += (B['x'] - this['x']) * M,
                this['y'] += (B['y'] - this['y']) * M,
                this;
            }
            ,
            Q['lerpVectors'] = function(B, M, X) {
                return this['x'] = B['x'] + (M['x'] - B['x']) * X,
                this['y'] = B['y'] + (M['y'] - B['y']) * X,
                this;
            }
            ,
            Q['equals'] = function(B) {
                return B['x'] === this['x'] && B['y'] === this['y'];
            }
            ,
            Q['fromArray'] = function(B, M) {
                return void 0x0 === M && (M = 0x0),
                this['x'] = B[M],
                this['y'] = B[M + 0x1],
                this;
            }
            ,
            Q['toArray'] = function(B, M) {
                return void 0x0 === B && (B = []),
                void 0x0 === M && (M = 0x0),
                B[M] = this['x'],
                B[M + 0x1] = this['y'],
                B;
            }
            ,
            Q['fromBufferAttribute'] = function(B, M) {
                return this['x'] = B['getX'](M),
                this['y'] = B['getY'](M),
                this;
            }
            ,
            Q['rotateAround'] = function(B, M) {
                var X = Math['cos'](M)
                  , m = Math['sin'](M)
                  , w = this['x'] - B['x']
                  , l = this['y'] - B['y'];
                return this['x'] = w * X - l * m + B['x'],
                this['y'] = w * m + l * X + B['y'],
                this;
            }
            ,
            Q['random'] = function() {
                return this['x'] = Math['random'](),
                this['y'] = Math['random'](),
                this;
            }
            ,
            Q[Symbol['iterator']] = H()['mark'](function B() {
                return H()['wrap'](function(M) {
                    for (; ; )
                        switch (M['prev'] = M['next']) {
                        case 0x0:
                            return M['next'] = 0x2,
                            this['x'];
                        case 0x2:
                            return M['next'] = 0x4,
                            this['y'];
                        case 0x4:
                        case 'end':
                            return M['stop']();
                        }
                }, B, this);
            }),
            (0x0,
            S['A'])(P, [{
                'key': 'width',
                'get': function() {
                    return this['x'];
                },
                'set': function(M) {
                    this['x'] = M;
                }
            }, {
                'key': 'height',
                'get': function() {
                    return this['y'];
                },
                'set': function(M) {
                    this['y'] = M;
                }
            }]);
        }());
    }
    ,
    0x1008e: (F, E, p) => {
        p['d'](E, {
            'P': () => d
        });
        var S = p(0xd5e4)
          , R = p['n'](S)
          , H = p(0xbd95)
          , y = p(0x13294)
          , d = (function() {
            function B(X, m, w) {
                void 0x0 === X && (X = 0x0),
                void 0x0 === m && (m = 0x0),
                void 0x0 === w && (w = 0x0),
                B['prototype']['isVector3'] = !0x0,
                this['x'] = X,
                this['y'] = m,
                this['z'] = w;
            }
            var M = B['prototype'];
            return M['set'] = function(X, m, w) {
                return void 0x0 === w && (w = this['z']),
                this['x'] = X,
                this['y'] = m,
                this['z'] = w,
                this;
            }
            ,
            M['setScalar'] = function(X) {
                return this['x'] = X,
                this['y'] = X,
                this['z'] = X,
                this;
            }
            ,
            M['setX'] = function(X) {
                return this['x'] = X,
                this;
            }
            ,
            M['setY'] = function(X) {
                return this['y'] = X,
                this;
            }
            ,
            M['setZ'] = function(X) {
                return this['z'] = X,
                this;
            }
            ,
            M['setComponent'] = function(X, m) {
                switch (X) {
                case 0x0:
                    this['x'] = m;
                    break;
                case 0x1:
                    this['y'] = m;
                    break;
                case 0x2:
                    this['z'] = m;
                    break;
                default:
                    throw new Error('index\x20is\x20out\x20of\x20range:\x20' + X);
                }
                return this;
            }
            ,
            M['getComponent'] = function(X) {
                switch (X) {
                case 0x0:
                    return this['x'];
                case 0x1:
                    return this['y'];
                case 0x2:
                    return this['z'];
                default:
                    throw new Error('index\x20is\x20out\x20of\x20range:\x20' + X);
                }
            }
            ,
            M['clone'] = function() {
                return new this['constructor'](this['x'],this['y'],this['z']);
            }
            ,
            M['copy'] = function(X) {
                return this['x'] = X['x'],
                this['y'] = X['y'],
                this['z'] = X['z'],
                this;
            }
            ,
            M['add'] = function(X) {
                return this['x'] += X['x'],
                this['y'] += X['y'],
                this['z'] += X['z'],
                this;
            }
            ,
            M['addScalar'] = function(X) {
                return this['x'] += X,
                this['y'] += X,
                this['z'] += X,
                this;
            }
            ,
            M['addVectors'] = function(X, m) {
                return this['x'] = X['x'] + m['x'],
                this['y'] = X['y'] + m['y'],
                this['z'] = X['z'] + m['z'],
                this;
            }
            ,
            M['addScaledVector'] = function(X, m) {
                return this['x'] += X['x'] * m,
                this['y'] += X['y'] * m,
                this['z'] += X['z'] * m,
                this;
            }
            ,
            M['sub'] = function(X) {
                return this['x'] -= X['x'],
                this['y'] -= X['y'],
                this['z'] -= X['z'],
                this;
            }
            ,
            M['subScalar'] = function(X) {
                return this['x'] -= X,
                this['y'] -= X,
                this['z'] -= X,
                this;
            }
            ,
            M['subVectors'] = function(X, m) {
                return this['x'] = X['x'] - m['x'],
                this['y'] = X['y'] - m['y'],
                this['z'] = X['z'] - m['z'],
                this;
            }
            ,
            M['multiply'] = function(X) {
                return this['x'] *= X['x'],
                this['y'] *= X['y'],
                this['z'] *= X['z'],
                this;
            }
            ,
            M['multiplyScalar'] = function(X) {
                return this['x'] *= X,
                this['y'] *= X,
                this['z'] *= X,
                this;
            }
            ,
            M['multiplyVectors'] = function(X, m) {
                return this['x'] = X['x'] * m['x'],
                this['y'] = X['y'] * m['y'],
                this['z'] = X['z'] * m['z'],
                this;
            }
            ,
            M['applyEuler'] = function(X) {
                return this['applyQuaternion'](Q['setFromEuler'](X));
            }
            ,
            M['applyAxisAngle'] = function(X, m) {
                return this['applyQuaternion'](Q['setFromAxisAngle'](X, m));
            }
            ,
            M['applyMatrix3'] = function(X) {
                var m = this['x']
                  , w = this['y']
                  , C = this['z']
                  , N = X['elements'];
                return this['x'] = N[0x0] * m + N[0x3] * w + N[0x6] * C,
                this['y'] = N[0x1] * m + N[0x4] * w + N[0x7] * C,
                this['z'] = N[0x2] * m + N[0x5] * w + N[0x8] * C,
                this;
            }
            ,
            M['applyNormalMatrix'] = function(X) {
                return this['applyMatrix3'](X)['normalize']();
            }
            ,
            M['applyMatrix4'] = function(X) {
                var m = this['x']
                  , w = this['y']
                  , C = this['z']
                  , N = X['elements']
                  , Z = 0x1 / (N[0x3] * m + N[0x7] * w + N[0xb] * C + N[0xf]);
                return this['x'] = (N[0x0] * m + N[0x4] * w + N[0x8] * C + N[0xc]) * Z,
                this['y'] = (N[0x1] * m + N[0x5] * w + N[0x9] * C + N[0xd]) * Z,
                this['z'] = (N[0x2] * m + N[0x6] * w + N[0xa] * C + N[0xe]) * Z,
                this;
            }
            ,
            M['applyQuaternion'] = function(X) {
                var m = this['x']
                  , w = this['y']
                  , C = this['z']
                  , N = X['x']
                  , Z = X['y']
                  , h = X['z']
                  , U = X['w']
                  , T = 0x2 * (Z * C - h * w)
                  , V = 0x2 * (h * m - N * C)
                  , G = 0x2 * (N * w - Z * m);
                return this['x'] = m + U * T + Z * G - h * V,
                this['y'] = w + U * V + h * T - N * G,
                this['z'] = C + U * G + N * V - Z * T,
                this;
            }
            ,
            M['project'] = function(X) {
                return this['applyMatrix4'](X['matrixWorldInverse'])['applyMatrix4'](X['projectionMatrix']);
            }
            ,
            M['unproject'] = function(X) {
                return this['applyMatrix4'](X['projectionMatrixInverse'])['applyMatrix4'](X['matrixWorld']);
            }
            ,
            M['transformDirection'] = function(X) {
                var m = this['x']
                  , w = this['y']
                  , C = this['z']
                  , N = X['elements'];
                return this['x'] = N[0x0] * m + N[0x4] * w + N[0x8] * C,
                this['y'] = N[0x1] * m + N[0x5] * w + N[0x9] * C,
                this['z'] = N[0x2] * m + N[0x6] * w + N[0xa] * C,
                this['normalize']();
            }
            ,
            M['divide'] = function(X) {
                return this['x'] /= X['x'],
                this['y'] /= X['y'],
                this['z'] /= X['z'],
                this;
            }
            ,
            M['divideScalar'] = function(X) {
                return this['multiplyScalar'](0x1 / X);
            }
            ,
            M['min'] = function(X) {
                return this['x'] = Math['min'](this['x'], X['x']),
                this['y'] = Math['min'](this['y'], X['y']),
                this['z'] = Math['min'](this['z'], X['z']),
                this;
            }
            ,
            M['max'] = function(X) {
                return this['x'] = Math['max'](this['x'], X['x']),
                this['y'] = Math['max'](this['y'], X['y']),
                this['z'] = Math['max'](this['z'], X['z']),
                this;
            }
            ,
            M['clamp'] = function(X, m) {
                return this['x'] = Math['max'](X['x'], Math['min'](m['x'], this['x'])),
                this['y'] = Math['max'](X['y'], Math['min'](m['y'], this['y'])),
                this['z'] = Math['max'](X['z'], Math['min'](m['z'], this['z'])),
                this;
            }
            ,
            M['clampScalar'] = function(X, m) {
                return this['x'] = Math['max'](X, Math['min'](m, this['x'])),
                this['y'] = Math['max'](X, Math['min'](m, this['y'])),
                this['z'] = Math['max'](X, Math['min'](m, this['z'])),
                this;
            }
            ,
            M['clampLength'] = function(X, m) {
                var w = this['length']();
                return this['divideScalar'](w || 0x1)['multiplyScalar'](Math['max'](X, Math['min'](m, w)));
            }
            ,
            M['floor'] = function() {
                return this['x'] = Math['floor'](this['x']),
                this['y'] = Math['floor'](this['y']),
                this['z'] = Math['floor'](this['z']),
                this;
            }
            ,
            M['ceil'] = function() {
                return this['x'] = Math['ceil'](this['x']),
                this['y'] = Math['ceil'](this['y']),
                this['z'] = Math['ceil'](this['z']),
                this;
            }
            ,
            M['round'] = function() {
                return this['x'] = Math['round'](this['x']),
                this['y'] = Math['round'](this['y']),
                this['z'] = Math['round'](this['z']),
                this;
            }
            ,
            M['roundToZero'] = function() {
                return this['x'] = Math['trunc'](this['x']),
                this['y'] = Math['trunc'](this['y']),
                this['z'] = Math['trunc'](this['z']),
                this;
            }
            ,
            M['negate'] = function() {
                return this['x'] = -this['x'],
                this['y'] = -this['y'],
                this['z'] = -this['z'],
                this;
            }
            ,
            M['dot'] = function(X) {
                return this['x'] * X['x'] + this['y'] * X['y'] + this['z'] * X['z'];
            }
            ,
            M['lengthSq'] = function() {
                return this['x'] * this['x'] + this['y'] * this['y'] + this['z'] * this['z'];
            }
            ,
            M['length'] = function() {
                return Math['sqrt'](this['x'] * this['x'] + this['y'] * this['y'] + this['z'] * this['z']);
            }
            ,
            M['manhattanLength'] = function() {
                return Math['abs'](this['x']) + Math['abs'](this['y']) + Math['abs'](this['z']);
            }
            ,
            M['normalize'] = function() {
                return this['divideScalar'](this['length']() || 0x1);
            }
            ,
            M['setLength'] = function(X) {
                return this['normalize']()['multiplyScalar'](X);
            }
            ,
            M['lerp'] = function(X, m) {
                return this['x'] += (X['x'] - this['x']) * m,
                this['y'] += (X['y'] - this['y']) * m,
                this['z'] += (X['z'] - this['z']) * m,
                this;
            }
            ,
            M['lerpVectors'] = function(X, m, w) {
                return this['x'] = X['x'] + (m['x'] - X['x']) * w,
                this['y'] = X['y'] + (m['y'] - X['y']) * w,
                this['z'] = X['z'] + (m['z'] - X['z']) * w,
                this;
            }
            ,
            M['cross'] = function(X) {
                return this['crossVectors'](this, X);
            }
            ,
            M['crossVectors'] = function(X, m) {
                var w = X['x']
                  , C = X['y']
                  , N = X['z']
                  , Z = m['x']
                  , h = m['y']
                  , U = m['z'];
                return this['x'] = C * U - N * h,
                this['y'] = N * Z - w * U,
                this['z'] = w * h - C * Z,
                this;
            }
            ,
            M['projectOnVector'] = function(X) {
                var m = X['lengthSq']();
                if (0x0 === m)
                    return this['set'](0x0, 0x0, 0x0);
                var w = X['dot'](this) / m;
                return this['copy'](X)['multiplyScalar'](w);
            }
            ,
            M['projectOnPlane'] = function(X) {
                return P['copy'](this)['projectOnVector'](X),
                this['sub'](P);
            }
            ,
            M['reflect'] = function(X) {
                return this['sub'](P['copy'](X)['multiplyScalar'](0x2 * this['dot'](X)));
            }
            ,
            M['angleTo'] = function(X) {
                var m = Math['sqrt'](this['lengthSq']() * X['lengthSq']());
                if (0x0 === m)
                    return Math['PI'] / 0x2;
                var w = this['dot'](X) / m;
                return Math['acos'](H['qE'](w, -0x1, 0x1));
            }
            ,
            M['distanceTo'] = function(X) {
                return Math['sqrt'](this['distanceToSquared'](X));
            }
            ,
            M['distanceToSquared'] = function(X) {
                var m = this['x'] - X['x']
                  , w = this['y'] - X['y']
                  , C = this['z'] - X['z'];
                return m * m + w * w + C * C;
            }
            ,
            M['manhattanDistanceTo'] = function(X) {
                return Math['abs'](this['x'] - X['x']) + Math['abs'](this['y'] - X['y']) + Math['abs'](this['z'] - X['z']);
            }
            ,
            M['setFromSpherical'] = function(X) {
                return this['setFromSphericalCoords'](X['radius'], X['phi'], X['theta']);
            }
            ,
            M['setFromSphericalCoords'] = function(X, m, w) {
                var C = Math['sin'](m) * X;
                return this['x'] = C * Math['sin'](w),
                this['y'] = Math['cos'](m) * X,
                this['z'] = C * Math['cos'](w),
                this;
            }
            ,
            M['setFromCylindrical'] = function(X) {
                return this['setFromCylindricalCoords'](X['radius'], X['theta'], X['y']);
            }
            ,
            M['setFromCylindricalCoords'] = function(X, m, w) {
                return this['x'] = X * Math['sin'](m),
                this['y'] = w,
                this['z'] = X * Math['cos'](m),
                this;
            }
            ,
            M['setFromMatrixPosition'] = function(X) {
                var m = X['elements'];
                return this['x'] = m[0xc],
                this['y'] = m[0xd],
                this['z'] = m[0xe],
                this;
            }
            ,
            M['setFromMatrixScale'] = function(X) {
                var m = this['setFromMatrixColumn'](X, 0x0)['length']()
                  , w = this['setFromMatrixColumn'](X, 0x1)['length']()
                  , C = this['setFromMatrixColumn'](X, 0x2)['length']();
                return this['x'] = m,
                this['y'] = w,
                this['z'] = C,
                this;
            }
            ,
            M['setFromMatrixColumn'] = function(X, m) {
                return this['fromArray'](X['elements'], 0x4 * m);
            }
            ,
            M['setFromMatrix3Column'] = function(X, m) {
                return this['fromArray'](X['elements'], 0x3 * m);
            }
            ,
            M['setFromEuler'] = function(X) {
                return this['x'] = X['_x'],
                this['y'] = X['_y'],
                this['z'] = X['_z'],
                this;
            }
            ,
            M['setFromColor'] = function(X) {
                return this['x'] = X['r'],
                this['y'] = X['g'],
                this['z'] = X['b'],
                this;
            }
            ,
            M['equals'] = function(X) {
                return X['x'] === this['x'] && X['y'] === this['y'] && X['z'] === this['z'];
            }
            ,
            M['fromArray'] = function(X, m) {
                return void 0x0 === m && (m = 0x0),
                this['x'] = X[m],
                this['y'] = X[m + 0x1],
                this['z'] = X[m + 0x2],
                this;
            }
            ,
            M['toArray'] = function(X, m) {
                return void 0x0 === X && (X = []),
                void 0x0 === m && (m = 0x0),
                X[m] = this['x'],
                X[m + 0x1] = this['y'],
                X[m + 0x2] = this['z'],
                X;
            }
            ,
            M['fromBufferAttribute'] = function(X, m) {
                return this['x'] = X['getX'](m),
                this['y'] = X['getY'](m),
                this['z'] = X['getZ'](m),
                this;
            }
            ,
            M['random'] = function() {
                return this['x'] = Math['random'](),
                this['y'] = Math['random'](),
                this['z'] = Math['random'](),
                this;
            }
            ,
            M['randomDirection'] = function() {
                var X = 0x2 * (Math['random']() - 0.5)
                  , m = Math['random']() * Math['PI'] * 0x2
                  , w = Math['sqrt'](0x1 - Math['pow'](X, 0x2));
                return this['x'] = w * Math['cos'](m),
                this['y'] = w * Math['sin'](m),
                this['z'] = X,
                this;
            }
            ,
            M[Symbol['iterator']] = R()['mark'](function X() {
                return R()['wrap'](function(m) {
                    for (; ; )
                        switch (m['prev'] = m['next']) {
                        case 0x0:
                            return m['next'] = 0x2,
                            this['x'];
                        case 0x2:
                            return m['next'] = 0x4,
                            this['y'];
                        case 0x4:
                            return m['next'] = 0x6,
                            this['z'];
                        case 0x6:
                        case 'end':
                            return m['stop']();
                        }
                }, X, this);
            }),
            B;
        }())
          , P = new d()
          , Q = new y['P']();
    }
    ,
    0xb3ef: (F, E, p) => {
        p['d'](E, {
            'I': () => y
        });
        var S = p(0x14124)
          , R = p(0xd5e4)
          , H = p['n'](R)
          , y = (function() {
            function d(Q, B, M, X) {
                void 0x0 === Q && (Q = 0x0),
                void 0x0 === B && (B = 0x0),
                void 0x0 === M && (M = 0x0),
                void 0x0 === X && (X = 0x1),
                d['prototype']['isVector4'] = !0x0,
                this['x'] = Q,
                this['y'] = B,
                this['z'] = M,
                this['w'] = X;
            }
            var P = d['prototype'];
            return P['set'] = function(Q, B, M, X) {
                return this['x'] = Q,
                this['y'] = B,
                this['z'] = M,
                this['w'] = X,
                this;
            }
            ,
            P['setScalar'] = function(Q) {
                return this['x'] = Q,
                this['y'] = Q,
                this['z'] = Q,
                this['w'] = Q,
                this;
            }
            ,
            P['setX'] = function(Q) {
                return this['x'] = Q,
                this;
            }
            ,
            P['setY'] = function(Q) {
                return this['y'] = Q,
                this;
            }
            ,
            P['setZ'] = function(Q) {
                return this['z'] = Q,
                this;
            }
            ,
            P['setW'] = function(Q) {
                return this['w'] = Q,
                this;
            }
            ,
            P['setComponent'] = function(Q, B) {
                switch (Q) {
                case 0x0:
                    this['x'] = B;
                    break;
                case 0x1:
                    this['y'] = B;
                    break;
                case 0x2:
                    this['z'] = B;
                    break;
                case 0x3:
                    this['w'] = B;
                    break;
                default:
                    throw new Error('index\x20is\x20out\x20of\x20range:\x20' + Q);
                }
                return this;
            }
            ,
            P['getComponent'] = function(Q) {
                switch (Q) {
                case 0x0:
                    return this['x'];
                case 0x1:
                    return this['y'];
                case 0x2:
                    return this['z'];
                case 0x3:
                    return this['w'];
                default:
                    throw new Error('index\x20is\x20out\x20of\x20range:\x20' + Q);
                }
            }
            ,
            P['clone'] = function() {
                return new this['constructor'](this['x'],this['y'],this['z'],this['w']);
            }
            ,
            P['copy'] = function(Q) {
                return this['x'] = Q['x'],
                this['y'] = Q['y'],
                this['z'] = Q['z'],
                this['w'] = void 0x0 !== Q['w'] ? Q['w'] : 0x1,
                this;
            }
            ,
            P['add'] = function(Q) {
                return this['x'] += Q['x'],
                this['y'] += Q['y'],
                this['z'] += Q['z'],
                this['w'] += Q['w'],
                this;
            }
            ,
            P['addScalar'] = function(Q) {
                return this['x'] += Q,
                this['y'] += Q,
                this['z'] += Q,
                this['w'] += Q,
                this;
            }
            ,
            P['addVectors'] = function(Q, B) {
                return this['x'] = Q['x'] + B['x'],
                this['y'] = Q['y'] + B['y'],
                this['z'] = Q['z'] + B['z'],
                this['w'] = Q['w'] + B['w'],
                this;
            }
            ,
            P['addScaledVector'] = function(Q, B) {
                return this['x'] += Q['x'] * B,
                this['y'] += Q['y'] * B,
                this['z'] += Q['z'] * B,
                this['w'] += Q['w'] * B,
                this;
            }
            ,
            P['sub'] = function(Q) {
                return this['x'] -= Q['x'],
                this['y'] -= Q['y'],
                this['z'] -= Q['z'],
                this['w'] -= Q['w'],
                this;
            }
            ,
            P['subScalar'] = function(Q) {
                return this['x'] -= Q,
                this['y'] -= Q,
                this['z'] -= Q,
                this['w'] -= Q,
                this;
            }
            ,
            P['subVectors'] = function(Q, B) {
                return this['x'] = Q['x'] - B['x'],
                this['y'] = Q['y'] - B['y'],
                this['z'] = Q['z'] - B['z'],
                this['w'] = Q['w'] - B['w'],
                this;
            }
            ,
            P['multiply'] = function(Q) {
                return this['x'] *= Q['x'],
                this['y'] *= Q['y'],
                this['z'] *= Q['z'],
                this['w'] *= Q['w'],
                this;
            }
            ,
            P['multiplyScalar'] = function(Q) {
                return this['x'] *= Q,
                this['y'] *= Q,
                this['z'] *= Q,
                this['w'] *= Q,
                this;
            }
            ,
            P['applyMatrix4'] = function(Q) {
                var B = this['x']
                  , M = this['y']
                  , X = this['z']
                  , m = this['w']
                  , w = Q['elements'];
                return this['x'] = w[0x0] * B + w[0x4] * M + w[0x8] * X + w[0xc] * m,
                this['y'] = w[0x1] * B + w[0x5] * M + w[0x9] * X + w[0xd] * m,
                this['z'] = w[0x2] * B + w[0x6] * M + w[0xa] * X + w[0xe] * m,
                this['w'] = w[0x3] * B + w[0x7] * M + w[0xb] * X + w[0xf] * m,
                this;
            }
            ,
            P['divideScalar'] = function(Q) {
                return this['multiplyScalar'](0x1 / Q);
            }
            ,
            P['setAxisAngleFromQuaternion'] = function(Q) {
                this['w'] = 0x2 * Math['acos'](Q['w']);
                var B = Math['sqrt'](0x1 - Q['w'] * Q['w']);
                return B < 0.0001 ? (this['x'] = 0x1,
                this['y'] = 0x0,
                this['z'] = 0x0) : (this['x'] = Q['x'] / B,
                this['y'] = Q['y'] / B,
                this['z'] = Q['z'] / B),
                this;
            }
            ,
            P['setAxisAngleFromRotationMatrix'] = function(Q) {
                var B, X, w, C, N = 0.01, Z = 0.1, U = Q['elements'], T = U[0x0], V = U[0x4], G = U[0x8], k = U[0x1], W = U[0x5], I = U[0x9], L = U[0x2], q = U[0x6], K = U[0xa];
                if (Math['abs'](V - k) < N && Math['abs'](G - L) < N && Math['abs'](I - q) < N) {
                    if (Math['abs'](V + k) < Z && Math['abs'](G + L) < Z && Math['abs'](I + q) < Z && Math['abs'](T + W + K - 0x3) < Z)
                        return this['set'](0x1, 0x0, 0x0, 0x0),
                        this;
                    B = Math['PI'];
                    var Y = (T + 0x1) / 0x2
                      , z = (W + 0x1) / 0x2
                      , A = (K + 0x1) / 0x2
                      , j = (V + k) / 0x4
                      , O = (G + L) / 0x4
                      , J = (I + q) / 0x4;
                    return Y > z && Y > A ? Y < N ? (X = 0x0,
                    w = 0.707106781,
                    C = 0.707106781) : (w = j / (X = Math['sqrt'](Y)),
                    C = O / X) : z > A ? z < N ? (X = 0.707106781,
                    w = 0x0,
                    C = 0.707106781) : (X = j / (w = Math['sqrt'](z)),
                    C = J / w) : A < N ? (X = 0.707106781,
                    w = 0.707106781,
                    C = 0x0) : (X = O / (C = Math['sqrt'](A)),
                    w = J / C),
                    this['set'](X, w, C, B),
                    this;
                }
                var D = Math['sqrt']((q - I) * (q - I) + (G - L) * (G - L) + (k - V) * (k - V));
                return Math['abs'](D) < 0.001 && (D = 0x1),
                this['x'] = (q - I) / D,
                this['y'] = (G - L) / D,
                this['z'] = (k - V) / D,
                this['w'] = Math['acos']((T + W + K - 0x1) / 0x2),
                this;
            }
            ,
            P['min'] = function(Q) {
                return this['x'] = Math['min'](this['x'], Q['x']),
                this['y'] = Math['min'](this['y'], Q['y']),
                this['z'] = Math['min'](this['z'], Q['z']),
                this['w'] = Math['min'](this['w'], Q['w']),
                this;
            }
            ,
            P['max'] = function(Q) {
                return this['x'] = Math['max'](this['x'], Q['x']),
                this['y'] = Math['max'](this['y'], Q['y']),
                this['z'] = Math['max'](this['z'], Q['z']),
                this['w'] = Math['max'](this['w'], Q['w']),
                this;
            }
            ,
            P['clamp'] = function(Q, B) {
                return this['x'] = Math['max'](Q['x'], Math['min'](B['x'], this['x'])),
                this['y'] = Math['max'](Q['y'], Math['min'](B['y'], this['y'])),
                this['z'] = Math['max'](Q['z'], Math['min'](B['z'], this['z'])),
                this['w'] = Math['max'](Q['w'], Math['min'](B['w'], this['w'])),
                this;
            }
            ,
            P['clampScalar'] = function(Q, B) {
                return this['x'] = Math['max'](Q, Math['min'](B, this['x'])),
                this['y'] = Math['max'](Q, Math['min'](B, this['y'])),
                this['z'] = Math['max'](Q, Math['min'](B, this['z'])),
                this['w'] = Math['max'](Q, Math['min'](B, this['w'])),
                this;
            }
            ,
            P['clampLength'] = function(Q, B) {
                var M = this['length']();
                return this['divideScalar'](M || 0x1)['multiplyScalar'](Math['max'](Q, Math['min'](B, M)));
            }
            ,
            P['floor'] = function() {
                return this['x'] = Math['floor'](this['x']),
                this['y'] = Math['floor'](this['y']),
                this['z'] = Math['floor'](this['z']),
                this['w'] = Math['floor'](this['w']),
                this;
            }
            ,
            P['ceil'] = function() {
                return this['x'] = Math['ceil'](this['x']),
                this['y'] = Math['ceil'](this['y']),
                this['z'] = Math['ceil'](this['z']),
                this['w'] = Math['ceil'](this['w']),
                this;
            }
            ,
            P['round'] = function() {
                return this['x'] = Math['round'](this['x']),
                this['y'] = Math['round'](this['y']),
                this['z'] = Math['round'](this['z']),
                this['w'] = Math['round'](this['w']),
                this;
            }
            ,
            P['roundToZero'] = function() {
                return this['x'] = Math['trunc'](this['x']),
                this['y'] = Math['trunc'](this['y']),
                this['z'] = Math['trunc'](this['z']),
                this['w'] = Math['trunc'](this['w']),
                this;
            }
            ,
            P['negate'] = function() {
                return this['x'] = -this['x'],
                this['y'] = -this['y'],
                this['z'] = -this['z'],
                this['w'] = -this['w'],
                this;
            }
            ,
            P['dot'] = function(Q) {
                return this['x'] * Q['x'] + this['y'] * Q['y'] + this['z'] * Q['z'] + this['w'] * Q['w'];
            }
            ,
            P['lengthSq'] = function() {
                return this['x'] * this['x'] + this['y'] * this['y'] + this['z'] * this['z'] + this['w'] * this['w'];
            }
            ,
            P['length'] = function() {
                return Math['sqrt'](this['x'] * this['x'] + this['y'] * this['y'] + this['z'] * this['z'] + this['w'] * this['w']);
            }
            ,
            P['manhattanLength'] = function() {
                return Math['abs'](this['x']) + Math['abs'](this['y']) + Math['abs'](this['z']) + Math['abs'](this['w']);
            }
            ,
            P['normalize'] = function() {
                return this['divideScalar'](this['length']() || 0x1);
            }
            ,
            P['setLength'] = function(Q) {
                return this['normalize']()['multiplyScalar'](Q);
            }
            ,
            P['lerp'] = function(Q, B) {
                return this['x'] += (Q['x'] - this['x']) * B,
                this['y'] += (Q['y'] - this['y']) * B,
                this['z'] += (Q['z'] - this['z']) * B,
                this['w'] += (Q['w'] - this['w']) * B,
                this;
            }
            ,
            P['lerpVectors'] = function(Q, B, M) {
                return this['x'] = Q['x'] + (B['x'] - Q['x']) * M,
                this['y'] = Q['y'] + (B['y'] - Q['y']) * M,
                this['z'] = Q['z'] + (B['z'] - Q['z']) * M,
                this['w'] = Q['w'] + (B['w'] - Q['w']) * M,
                this;
            }
            ,
            P['equals'] = function(Q) {
                return Q['x'] === this['x'] && Q['y'] === this['y'] && Q['z'] === this['z'] && Q['w'] === this['w'];
            }
            ,
            P['fromArray'] = function(Q, B) {
                return void 0x0 === B && (B = 0x0),
                this['x'] = Q[B],
                this['y'] = Q[B + 0x1],
                this['z'] = Q[B + 0x2],
                this['w'] = Q[B + 0x3],
                this;
            }
            ,
            P['toArray'] = function(Q, B) {
                return void 0x0 === Q && (Q = []),
                void 0x0 === B && (B = 0x0),
                Q[B] = this['x'],
                Q[B + 0x1] = this['y'],
                Q[B + 0x2] = this['z'],
                Q[B + 0x3] = this['w'],
                Q;
            }
            ,
            P['fromBufferAttribute'] = function(Q, B) {
                return this['x'] = Q['getX'](B),
                this['y'] = Q['getY'](B),
                this['z'] = Q['getZ'](B),
                this['w'] = Q['getW'](B),
                this;
            }
            ,
            P['random'] = function() {
                return this['x'] = Math['random'](),
                this['y'] = Math['random'](),
                this['z'] = Math['random'](),
                this['w'] = Math['random'](),
                this;
            }
            ,
            P[Symbol['iterator']] = H()['mark'](function Q() {
                return H()['wrap'](function(B) {
                    for (; ; )
                        switch (B['prev'] = B['next']) {
                        case 0x0:
                            return B['next'] = 0x2,
                            this['x'];
                        case 0x2:
                            return B['next'] = 0x4,
                            this['y'];
                        case 0x4:
                            return B['next'] = 0x6,
                            this['z'];
                        case 0x6:
                            return B['next'] = 0x8,
                            this['w'];
                        case 0x8:
                        case 'end':
                            return B['stop']();
                        }
                }, Q, this);
            }),
            (0x0,
            S['A'])(d, [{
                'key': 'width',
                'get': function() {
                    return this['z'];
                },
                'set': function(B) {
                    this['z'] = B;
                }
            }, {
                'key': 'height',
                'get': function() {
                    return this['w'];
                },
                'set': function(B) {
                    this['w'] = B;
                }
            }]);
        }());
    }
    ,
    0x3696: (F, E, p) => {
        p['d'](E, {
            'P': () => H
        });
        var S = p(0x12e4b)
          , R = p(0x172d2)
          , H = function(y) {
            function d(Q, B, M, X) {
                var m;
                return (m = y['call'](this, Q, B, M, X) || this)['_weightPrev'] = -0x0,
                m['_offsetPrev'] = -0x0,
                m['_weightNext'] = -0x0,
                m['_offsetNext'] = -0x0,
                m['DefaultSettings_'] = {
                    'endingStart': R['rQf'],
                    'endingEnd': R['rQf']
                },
                m;
            }
            (0x0,
            S['A'])(d, y);
            var P = d['prototype'];
            return P['intervalChanged_'] = function(Q, B, M) {
                var X = this['parameterPositions']
                  , m = Q - 0x2
                  , w = Q + 0x1
                  , C = X[m]
                  , N = X[w];
                if (void 0x0 === C)
                    switch (this['getSettings_']()['endingStart']) {
                    case R['h2z']:
                        m = Q,
                        C = 0x2 * B - M;
                        break;
                    case R['dhZ']:
                        C = B + X[m = X['length'] - 0x2] - X[m + 0x1];
                        break;
                    default:
                        m = Q,
                        C = M;
                    }
                if (void 0x0 === N)
                    switch (this['getSettings_']()['endingEnd']) {
                    case R['h2z']:
                        w = Q,
                        N = 0x2 * M - B;
                        break;
                    case R['dhZ']:
                        w = 0x1,
                        N = M + X[0x1] - X[0x0];
                        break;
                    default:
                        w = Q - 0x1,
                        N = B;
                    }
                var Z = 0.5 * (M - B)
                  , h = this['valueSize'];
                this['_weightPrev'] = Z / (B - C),
                this['_weightNext'] = Z / (N - M),
                this['_offsetPrev'] = m * h,
                this['_offsetNext'] = w * h;
            }
            ,
            P['interpolate_'] = function(Q, B, M, X) {
                for (var w = this['resultBuffer'], C = this['sampleValues'], N = this['valueSize'], Z = Q * N, U = Z - N, T = this['_offsetPrev'], V = this['_offsetNext'], G = this['_weightPrev'], k = this['_weightNext'], W = (M - B) / (X - B), I = W * W, L = I * W, q = -G * L + 0x2 * G * I - G * W, K = (0x1 + G) * L + (-1.5 - 0x2 * G) * I + (-0.5 + G) * W + 0x1, Y = (-0x1 - k) * L + (1.5 + k) * I + 0.5 * W, z = k * L - k * I, A = 0x0; A !== N; ++A)
                    w[A] = q * C[T + A] + K * C[U + A] + Y * C[Z + A] + z * C[V + A];
                return w;
            }
            ,
            d;
        }(p(0x28f4)['l']);
    }
    ,
    0x17b5d: (F, E, p) => {
        p['d'](E, {
            'e': () => R
        });
        var S = p(0x12e4b)
          , R = function(H) {
            function y(d, P, Q, B) {
                return H['call'](this, d, P, Q, B) || this;
            }
            return (0x0,
            S['A'])(y, H),
            y['prototype']['interpolate_'] = function(d, P, Q, B) {
                for (var M = this['resultBuffer'], X = this['sampleValues'], m = this['valueSize'], w = d * m, C = w - m, N = (Q - P) / (B - P), Z = 0x1 - N, U = 0x0; U !== m; ++U)
                    M[U] = X[C + U] * Z + X[w + U] * N;
                return M;
            }
            ,
            y;
        }(p(0x28f4)['l']);
    }
    ,
    0x131b5: (F, E, p) => {
        p['d'](E, {
            'G': () => y
        });
        var S = p(0x12e4b)
          , R = p(0x28f4)
          , H = p(0x13294)
          , y = function(d) {
            function P(Q, B, M, X) {
                return d['call'](this, Q, B, M, X) || this;
            }
            return (0x0,
            S['A'])(P, d),
            P['prototype']['interpolate_'] = function(Q, B, M, X) {
                for (var m = this['resultBuffer'], w = this['sampleValues'], C = this['valueSize'], N = (M - B) / (X - B), Z = Q * C, h = Z + C; Z !== h; Z += 0x4)
                    H['P']['slerpFlat'](m, 0x0, w, Z - C, w, Z, N);
                return m;
            }
            ,
            P;
        }(R['l']);
    }
    ,
    0xad70: (r, F, E) => {
        E(0x17dfd),
        E(0x16835),
        E(0x2277),
        E(0x172d2),
        E(0x11ded),
        E(0x1152b),
        E(0x7002),
        E(0x79b5),
        E(0x6a24),
        E(0x1008e);
    }
    ,
    0x658b: (F, E, p) => {
        p['d'](E, {
            'Y': () => R
        });
        var S = p(0x12e4b)
          , R = function(H) {
            function y() {
                var d;
                return (d = H['call'](this) || this)['isGroup'] = !0x0,
                d['type'] = 'Group',
                d;
            }
            return (0x0,
            S['A'])(y, H),
            y;
        }(p(0x16f53)['B']);
    }
    ,
    0x138bf: (r, F, E) => {
        E(0x1008e),
        E(0x16f53);
    }
    ,
    0x1152b: (F, H, Q) => {
        Q['d'](H, {
            'e': () => rF
        });
        var B = Q(0x12e4b)
          , X = Q(0x1008e)
          , N = Q(0x1264d)
          , Z = Q(0x79b5)
          , U = Q(0xbf9a)
          , V = Q(0x11ded)
          , G = Q(0x16f53)
          , k = Q(0x37c8)
          , W = Q(0x172d2)
          , I = Q(0x14baa)
          , q = Q(0x16835)
          , K = new V['k']()
          , Y = new U['R']()
          , z = new Z['i']()
          , j = new X['P']()
          , O = new X['P']()
          , J = new X['P']()
          , r0 = new X['P']()
          , r1 = new X['P']()
          , r2 = new X['P']()
          , r3 = new N['I']()
          , r4 = new N['I']()
          , r5 = new N['I']()
          , r6 = new X['P']()
          , r7 = new X['P']()
          , r8 = new X['P']()
          , r9 = new X['P']()
          , rr = new X['P']()
          , rF = function(rp) {
            function rS(rR, rH) {
                var ry;
                return void 0x0 === rR && (rR = new q['L']()),
                void 0x0 === rH && (rH = new I['V']()),
                (ry = rp['call'](this) || this)['isMesh'] = !0x0,
                ry['type'] = 'Mesh',
                ry['geometry'] = rR,
                ry['material'] = rH,
                ry['updateMorphTargets'](),
                ry;
            }
            (0x0,
            B['A'])(rS, rp);
            var re = rS['prototype'];
            return re['copy'] = function(rR, rH) {
                return rp['prototype']['copy']['call'](this, rR, rH),
                void 0x0 !== rR['morphTargetInfluences'] && (this['morphTargetInfluences'] = rR['morphTargetInfluences']['slice']()),
                void 0x0 !== rR['morphTargetDictionary'] && (this['morphTargetDictionary'] = Object['assign']({}, rR['morphTargetDictionary'])),
                this['material'] = Array['isArray'](rR['material']) ? rR['material']['slice']() : rR['material'],
                this['geometry'] = rR['geometry'],
                this;
            }
            ,
            re['updateMorphTargets'] = function() {
                var rR = this['geometry']['morphAttributes']
                  , rH = Object['keys'](rR);
                if (rH['length'] > 0x0) {
                    var ry = rR[rH[0x0]];
                    if (void 0x0 !== ry) {
                        this['morphTargetInfluences'] = [],
                        this['morphTargetDictionary'] = {};
                        for (var rd = 0x0, rP = ry['length']; rd < rP; rd++) {
                            var rQ = ry[rd]['name'] || String(rd);
                            this['morphTargetInfluences']['push'](0x0),
                            this['morphTargetDictionary'][rQ] = rd;
                        }
                    }
                }
            }
            ,
            re['getVertexPosition'] = function(rR, rH) {
                var ry = this['geometry']
                  , rd = ry['attributes']['position']
                  , rP = ry['morphAttributes']['position']
                  , rQ = ry['morphTargetsRelative'];
                rH['fromBufferAttribute'](rd, rR);
                var rB = this['morphTargetInfluences'];
                if (rP && rB) {
                    r2['set'](0x0, 0x0, 0x0);
                    for (var rM = 0x0, rX = rP['length']; rM < rX; rM++) {
                        var rt = rB[rM]
                          , rm = rP[rM];
                        0x0 !== rt && (r1['fromBufferAttribute'](rm, rR),
                        rQ ? r2['addScaledVector'](r1, rt) : r2['addScaledVector'](r1['sub'](rH), rt));
                    }
                    rH['add'](r2);
                }
                return rH;
            }
            ,
            re['raycast'] = function(rR, rH) {
                var ry = this['geometry']
                  , rd = this['material']
                  , rP = this['matrixWorld'];
                if (void 0x0 !== rd) {
                    if (null === ry['boundingSphere'] && ry['computeBoundingSphere'](),
                    z['copy'](ry['boundingSphere']),
                    z['applyMatrix4'](rP),
                    Y['copy'](rR['ray'])['recast'](rR['near']),
                    !0x1 === z['containsPoint'](Y['origin'])) {
                        if (null === Y['intersectSphere'](z, j))
                            return;
                        if (Y['origin']['distanceToSquared'](j) > Math['pow'](rR['far'] - rR['near'], 0x2))
                            return;
                    }
                    K['copy'](rP)['invert'](),
                    Y['copy'](rR['ray'])['applyMatrix4'](K),
                    null !== ry['boundingBox'] && !0x1 === Y['intersectsBox'](ry['boundingBox']) || this['_computeIntersections'](rR, rH, Y);
                }
            }
            ,
            re['_computeIntersections'] = function(rR, rH, ry) {
                var rd, rP = this['geometry'], rQ = this['material'], rB = rP['index'], rM = rP['attributes']['position'], rX = rP['attributes']['uv'], rt = rP['attributes']['uv1'], rm = rP['attributes']['normal'], rw = rP['groups'], rl = rP['drawRange'];
                if (null !== rB) {
                    if (Array['isArray'](rQ)) {
                        for (var rC = 0x0, rN = rw['length']; rC < rN; rC++)
                            for (var rZ = rw[rC], rh = rQ[rZ['materialIndex']], ro = Math['max'](rZ['start'], rl['start']), rU = Math['min'](rB['count'], Math['min'](rZ['start'] + rZ['count'], rl['start'] + rl['count'])); ro < rU; ro += 0x3) {
                                (rd = rE(this, rh, rR, ry, rX, rt, rm, rB['getX'](ro), rB['getX'](ro + 0x1), rB['getX'](ro + 0x2))) && (rd['faceIndex'] = Math['floor'](ro / 0x3),
                                rd['face']['materialIndex'] = rZ['materialIndex'],
                                rH['push'](rd));
                            }
                    } else
                        for (var ri = Math['max'](0x0, rl['start']), rT = Math['min'](rB['count'], rl['start'] + rl['count']); ri < rT; ri += 0x3) {
                            (rd = rE(this, rQ, rR, ry, rX, rt, rm, rB['getX'](ri), rB['getX'](ri + 0x1), rB['getX'](ri + 0x2))) && (rd['faceIndex'] = Math['floor'](ri / 0x3),
                            rH['push'](rd));
                        }
                } else {
                    if (void 0x0 !== rM) {
                        if (Array['isArray'](rQ)) {
                            for (var rV = 0x0, rs = rw['length']; rV < rs; rV++)
                                for (var rG = rw[rV], rk = rQ[rG['materialIndex']], rW = Math['max'](rG['start'], rl['start']), rx = Math['min'](rM['count'], Math['min'](rG['start'] + rG['count'], rl['start'] + rl['count'])); rW < rx; rW += 0x3) {
                                    (rd = rE(this, rk, rR, ry, rX, rt, rm, rW, rW + 0x1, rW + 0x2)) && (rd['faceIndex'] = Math['floor'](rW / 0x3),
                                    rd['face']['materialIndex'] = rG['materialIndex'],
                                    rH['push'](rd));
                                }
                        } else
                            for (var ra = Math['max'](0x0, rl['start']), rI = Math['min'](rM['count'], rl['start'] + rl['count']); ra < rI; ra += 0x3) {
                                (rd = rE(this, rQ, rR, ry, rX, rt, rm, ra, ra + 0x1, ra + 0x2)) && (rd['faceIndex'] = Math['floor'](ra / 0x3),
                                rH['push'](rd));
                            }
                    }
                }
            }
            ,
            rS;
        }(G['B']);
        function rE(rp, rS, re, rR, rH, ry, rd, rP, rQ, rB) {
            rp['getVertexPosition'](rP, O),
            rp['getVertexPosition'](rQ, J),
            rp['getVertexPosition'](rB, r0);
            var rM = function(rt, rm, rw, rl, rC, rN, rZ, rh) {
                if (null === (rm['side'] === W['hsX'] ? rl['intersectTriangle'](rZ, rN, rC, !0x0, rh) : rl['intersectTriangle'](rC, rN, rZ, rm['side'] === W['hB5'], rh)))
                    return null;
                rr['copy'](rh),
                rr['applyMatrix4'](rt['matrixWorld']);
                var ro = rw['ray']['origin']['distanceTo'](rr);
                return ro < rw['near'] || ro > rw['far'] ? null : {
                    'distance': ro,
                    'point': rr['clone'](),
                    'object': rt
                };
            }(rp, rS, re, rR, O, J, r0, r9);
            if (rM) {
                rH && (r3['fromBufferAttribute'](rH, rP),
                r4['fromBufferAttribute'](rH, rQ),
                r5['fromBufferAttribute'](rH, rB),
                rM['uv'] = k['l']['getInterpolation'](r9, O, J, r0, r3, r4, r5, new N['I']())),
                ry && (r3['fromBufferAttribute'](ry, rP),
                r4['fromBufferAttribute'](ry, rQ),
                r5['fromBufferAttribute'](ry, rB),
                rM['uv1'] = k['l']['getInterpolation'](r9, O, J, r0, r3, r4, r5, new N['I']()),
                rM['uv2'] = rM['uv1']),
                rd && (r6['fromBufferAttribute'](rd, rP),
                r7['fromBufferAttribute'](rd, rQ),
                r8['fromBufferAttribute'](rd, rB),
                rM['normal'] = k['l']['getInterpolation'](r9, O, J, r0, r6, r7, r8, new X['P']()),
                rM['normal']['dot'](rR['direction']) > 0x0 && rM['normal']['multiplyScalar'](-0x1));
                var rX = {
                    'a': rP,
                    'b': rQ,
                    'c': rB,
                    'normal': new X['P'](),
                    'materialIndex': 0x0
                };
                k['l']['getNormal'](O, J, r0, rX['normal']),
                rM['face'] = rX;
            }
            return rM;
        }
    }
    ,
    0x5d85: (r, F, E) => {
        var p = E(0x12e4b);
        (function(S) {
            function R() {
                return S['apply'](this, arguments) || this;
            }
            return (0x0,
            p['A'])(R, S),
            R;
        }(E(0x178c5)['J'])['prototype']['isWebGL1Renderer'] = !0x0);
    }
    ,
    0x50af: (r, F, E) => {
        E(0xc42c),
        E(0x10762);
    }
    ,
    0x1653d: (r, F, E) => {
        E(0xc42c),
        E(0xc71e);
    }
    ,
    0x101b9: (F, E, p) => {
        p['d'](E, {
            'o': () => w
        });
        var S = p(0x12e4b)
          , R = p(0x172d2)
          , H = p(0x1152b)
          , y = p(0x131a1)
          , P = p(0x7026)
          , Q = p(0x41ef)
          , B = p(0xc42c)
          , M = p(0x306c)
          , X = p(0xb12c)
          , m = p(0x1078a)
          , w = function(C) {
            function N(U, T) {
                var V;
                void 0x0 === U && (U = 0x1),
                void 0x0 === T && (T = {}),
                (V = C['call'](this, U, U, T) || this)['isWebGLCubeRenderTarget'] = !0x0;
                var G = {
                    'width': U,
                    'height': U,
                    'depth': 0x1
                }
                  , k = [G, G, G, G, G, G];
                return void 0x0 !== T['encoding'] && ((0x0,
                m['mc'])('THREE.WebGLCubeRenderTarget:\x20option.encoding\x20has\x20been\x20replaced\x20by\x20option.colorSpace.'),
                T['colorSpace'] = T['encoding'] === R['S2Q'] ? R['er$'] : R['jf0']),
                V['texture'] = new X['b'](k,T['mapping'],T['wrapS'],T['wrapT'],T['magFilter'],T['minFilter'],T['format'],T['type'],T['anisotropy'],T['colorSpace']),
                V['texture']['isRenderTargetTexture'] = !0x0,
                V['texture']['generateMipmaps'] = void 0x0 !== T['generateMipmaps'] && T['generateMipmaps'],
                V['texture']['minFilter'] = void 0x0 !== T['minFilter'] ? T['minFilter'] : R['k6q'],
                V;
            }
            (0x0,
            S['A'])(N, C);
            var Z = N['prototype'];
            return Z['fromEquirectangularTexture'] = function(U, T) {
                this['texture']['type'] = T['type'],
                this['texture']['colorSpace'] = T['colorSpace'],
                this['texture']['generateMipmaps'] = T['generateMipmaps'],
                this['texture']['minFilter'] = T['minFilter'],
                this['texture']['magFilter'] = T['magFilter'];
                var V = {
                    'tEquirect': {
                        'value': null
                    }
                }
                  , G = '\x0a\x0a\x09\x09\x09\x09varying\x20vec3\x20vWorldDirection;\x0a\x0a\x09\x09\x09\x09vec3\x20transformDirection(\x20in\x20vec3\x20dir,\x20in\x20mat4\x20matrix\x20)\x20{\x0a\x0a\x09\x09\x09\x09\x09return\x20normalize(\x20(\x20matrix\x20*\x20vec4(\x20dir,\x200.0\x20)\x20).xyz\x20);\x0a\x0a\x09\x09\x09\x09}\x0a\x0a\x09\x09\x09\x09void\x20main()\x20{\x0a\x0a\x09\x09\x09\x09\x09vWorldDirection\x20=\x20transformDirection(\x20position,\x20modelMatrix\x20);\x0a\x0a\x09\x09\x09\x09\x09#include\x20<begin_vertex>\x0a\x09\x09\x09\x09\x09#include\x20<project_vertex>\x0a\x0a\x09\x09\x09\x09}\x0a\x09\x09\x09'
                  , k = '\x0a\x0a\x09\x09\x09\x09uniform\x20sampler2D\x20tEquirect;\x0a\x0a\x09\x09\x09\x09varying\x20vec3\x20vWorldDirection;\x0a\x0a\x09\x09\x09\x09#include\x20<common>\x0a\x0a\x09\x09\x09\x09void\x20main()\x20{\x0a\x0a\x09\x09\x09\x09\x09vec3\x20direction\x20=\x20normalize(\x20vWorldDirection\x20);\x0a\x0a\x09\x09\x09\x09\x09vec2\x20sampleUV\x20=\x20equirectUv(\x20direction\x20);\x0a\x0a\x09\x09\x09\x09\x09gl_FragColor\x20=\x20texture2D(\x20tEquirect,\x20sampleUV\x20);\x0a\x0a\x09\x09\x09\x09}\x0a\x09\x09\x09'
                  , W = new y['i'](0x5,0x5,0x5)
                  , x = new P['B']({
                    'name': 'CubemapFromEquirect',
                    'uniforms': (0x0,
                    Q['lx'])(V),
                    'vertexShader': G,
                    'fragmentShader': k,
                    'side': R['hsX'],
                    'blending': R['XIg']
                });
                x['uniforms']['tEquirect']['value'] = T;
                var I = new H['e'](W,x)
                  , g = T['minFilter'];
                return T['minFilter'] === R['$_I'] && (T['minFilter'] = R['k6q']),
                new M['F'](0x1,0xa,this)['update'](U, I),
                T['minFilter'] = g,
                I['geometry']['dispose'](),
                I['material']['dispose'](),
                this;
            }
            ,
            Z['clear'] = function(U, T, V, G) {
                for (var k = U['getRenderTarget'](), W = 0x0; W < 0x6; W++)
                    U['setRenderTarget'](this, W),
                    U['clear'](T, V, G);
                U['setRenderTarget'](k);
            }
            ,
            N;
        }(B['n']);
    }
    ,
    0xbd7f: (r, F, E) => {
        E(0xc42c);
    }
    ,
    0xc42c: (F, E, p) => {
        p['d'](E, {
            'n': () => R
        });
        var S = p(0x12e4b)
          , R = function(H) {
            function y(d, P, Q) {
                var B;
                return void 0x0 === d && (d = 0x1),
                void 0x0 === P && (P = 0x1),
                void 0x0 === Q && (Q = {}),
                (B = H['call'](this, d, P, Q) || this)['isWebGLRenderTarget'] = !0x0,
                B;
            }
            return (0x0,
            S['A'])(y, H),
            y;
        }(p(0xfbe)['O']);
    }
    ,
    0xfdaa: (r, F, E) => {
        E['d'](F, {
            'v': () => p
        });
        var p = {
            'alphahash_fragment': '\x0a#ifdef\x20USE_ALPHAHASH\x0a\x0a\x09if\x20(\x20diffuseColor.a\x20<\x20getAlphaHashThreshold(\x20vPosition\x20)\x20)\x20discard;\x0a\x0a#endif\x0a',
            'alphahash_pars_fragment': '\x0a#ifdef\x20USE_ALPHAHASH\x0a\x0a\x09/**\x0a\x09\x20*\x20See:\x20https://casual-effects.com/research/Wyman2017Hashed/index.html\x0a\x09\x20*/\x0a\x0a\x09const\x20float\x20ALPHA_HASH_SCALE\x20=\x200.05;\x20//\x20Derived\x20from\x20trials\x20only,\x20and\x20may\x20be\x20changed.\x0a\x0a\x09float\x20hash2D(\x20vec2\x20value\x20)\x20{\x0a\x0a\x09\x09return\x20fract(\x201.0e4\x20*\x20sin(\x2017.0\x20*\x20value.x\x20+\x200.1\x20*\x20value.y\x20)\x20*\x20(\x200.1\x20+\x20abs(\x20sin(\x2013.0\x20*\x20value.y\x20+\x20value.x\x20)\x20)\x20)\x20);\x0a\x0a\x09}\x0a\x0a\x09float\x20hash3D(\x20vec3\x20value\x20)\x20{\x0a\x0a\x09\x09return\x20hash2D(\x20vec2(\x20hash2D(\x20value.xy\x20),\x20value.z\x20)\x20);\x0a\x0a\x09}\x0a\x0a\x09float\x20getAlphaHashThreshold(\x20vec3\x20position\x20)\x20{\x0a\x0a\x09\x09//\x20Find\x20the\x20discretized\x20derivatives\x20of\x20our\x20coordinates\x0a\x09\x09float\x20maxDeriv\x20=\x20max(\x0a\x09\x09\x09length(\x20dFdx(\x20position.xyz\x20)\x20),\x0a\x09\x09\x09length(\x20dFdy(\x20position.xyz\x20)\x20)\x0a\x09\x09);\x0a\x09\x09float\x20pixScale\x20=\x201.0\x20/\x20(\x20ALPHA_HASH_SCALE\x20*\x20maxDeriv\x20);\x0a\x0a\x09\x09//\x20Find\x20two\x20nearest\x20log-discretized\x20noise\x20scales\x0a\x09\x09vec2\x20pixScales\x20=\x20vec2(\x0a\x09\x09\x09exp2(\x20floor(\x20log2(\x20pixScale\x20)\x20)\x20),\x0a\x09\x09\x09exp2(\x20ceil(\x20log2(\x20pixScale\x20)\x20)\x20)\x0a\x09\x09);\x0a\x0a\x09\x09//\x20Compute\x20alpha\x20thresholds\x20at\x20our\x20two\x20noise\x20scales\x0a\x09\x09vec2\x20alpha\x20=\x20vec2(\x0a\x09\x09\x09hash3D(\x20floor(\x20pixScales.x\x20*\x20position.xyz\x20)\x20),\x0a\x09\x09\x09hash3D(\x20floor(\x20pixScales.y\x20*\x20position.xyz\x20)\x20)\x0a\x09\x09);\x0a\x0a\x09\x09//\x20Factor\x20to\x20interpolate\x20lerp\x20with\x0a\x09\x09float\x20lerpFactor\x20=\x20fract(\x20log2(\x20pixScale\x20)\x20);\x0a\x0a\x09\x09//\x20Interpolate\x20alpha\x20threshold\x20from\x20noise\x20at\x20two\x20scales\x0a\x09\x09float\x20x\x20=\x20(\x201.0\x20-\x20lerpFactor\x20)\x20*\x20alpha.x\x20+\x20lerpFactor\x20*\x20alpha.y;\x0a\x0a\x09\x09//\x20Pass\x20into\x20CDF\x20to\x20compute\x20uniformly\x20distrib\x20threshold\x0a\x09\x09float\x20a\x20=\x20min(\x20lerpFactor,\x201.0\x20-\x20lerpFactor\x20);\x0a\x09\x09vec3\x20cases\x20=\x20vec3(\x0a\x09\x09\x09x\x20*\x20x\x20/\x20(\x202.0\x20*\x20a\x20*\x20(\x201.0\x20-\x20a\x20)\x20),\x0a\x09\x09\x09(\x20x\x20-\x200.5\x20*\x20a\x20)\x20/\x20(\x201.0\x20-\x20a\x20),\x0a\x09\x09\x091.0\x20-\x20(\x20(\x201.0\x20-\x20x\x20)\x20*\x20(\x201.0\x20-\x20x\x20)\x20/\x20(\x202.0\x20*\x20a\x20*\x20(\x201.0\x20-\x20a\x20)\x20)\x20)\x0a\x09\x09);\x0a\x0a\x09\x09//\x20Find\x20our\x20final,\x20uniformly\x20distributed\x20alpha\x20threshold\x20(ατ)\x0a\x09\x09float\x20threshold\x20=\x20(\x20x\x20<\x20(\x201.0\x20-\x20a\x20)\x20)\x0a\x09\x09\x09?\x20(\x20(\x20x\x20<\x20a\x20)\x20?\x20cases.x\x20:\x20cases.y\x20)\x0a\x09\x09\x09:\x20cases.z;\x0a\x0a\x09\x09//\x20Avoids\x20ατ\x20==\x200.\x20Could\x20also\x20do\x20ατ\x20=1-ατ\x0a\x09\x09return\x20clamp(\x20threshold\x20,\x201.0e-6,\x201.0\x20);\x0a\x0a\x09}\x0a\x0a#endif\x0a',
            'alphamap_fragment': '\x0a#ifdef\x20USE_ALPHAMAP\x0a\x0a\x09diffuseColor.a\x20*=\x20texture2D(\x20alphaMap,\x20vAlphaMapUv\x20).g;\x0a\x0a#endif\x0a',
            'alphamap_pars_fragment': '\x0a#ifdef\x20USE_ALPHAMAP\x0a\x0a\x09uniform\x20sampler2D\x20alphaMap;\x0a\x0a#endif\x0a',
            'alphatest_fragment': '\x0a#ifdef\x20USE_ALPHATEST\x0a\x0a\x09if\x20(\x20diffuseColor.a\x20<\x20alphaTest\x20)\x20discard;\x0a\x0a#endif\x0a',
            'alphatest_pars_fragment': '\x0a#ifdef\x20USE_ALPHATEST\x0a\x09uniform\x20float\x20alphaTest;\x0a#endif\x0a',
            'aomap_fragment': '\x0a#ifdef\x20USE_AOMAP\x0a\x0a\x09//\x20reads\x20channel\x20R,\x20compatible\x20with\x20a\x20combined\x20OcclusionRoughnessMetallic\x20(RGB)\x20texture\x0a\x09float\x20ambientOcclusion\x20=\x20(\x20texture2D(\x20aoMap,\x20vAoMapUv\x20).r\x20-\x201.0\x20)\x20*\x20aoMapIntensity\x20+\x201.0;\x0a\x0a\x09reflectedLight.indirectDiffuse\x20*=\x20ambientOcclusion;\x0a\x0a\x09#if\x20defined(\x20USE_CLEARCOAT\x20)\x20\x0a\x09\x09clearcoatSpecularIndirect\x20*=\x20ambientOcclusion;\x0a\x09#endif\x0a\x0a\x09#if\x20defined(\x20USE_SHEEN\x20)\x20\x0a\x09\x09sheenSpecularIndirect\x20*=\x20ambientOcclusion;\x0a\x09#endif\x0a\x0a\x09#if\x20defined(\x20USE_ENVMAP\x20)\x20&&\x20defined(\x20STANDARD\x20)\x0a\x0a\x09\x09float\x20dotNV\x20=\x20saturate(\x20dot(\x20geometryNormal,\x20geometryViewDir\x20)\x20);\x0a\x0a\x09\x09reflectedLight.indirectSpecular\x20*=\x20computeSpecularOcclusion(\x20dotNV,\x20ambientOcclusion,\x20material.roughness\x20);\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'aomap_pars_fragment': '\x0a#ifdef\x20USE_AOMAP\x0a\x0a\x09uniform\x20sampler2D\x20aoMap;\x0a\x09uniform\x20float\x20aoMapIntensity;\x0a\x0a#endif\x0a',
            'batching_pars_vertex': '\x0a#ifdef\x20USE_BATCHING\x0a\x09attribute\x20float\x20batchId;\x0a\x09uniform\x20highp\x20sampler2D\x20batchingTexture;\x0a\x09mat4\x20getBatchingMatrix(\x20const\x20in\x20float\x20i\x20)\x20{\x0a\x0a\x09\x09int\x20size\x20=\x20textureSize(\x20batchingTexture,\x200\x20).x;\x0a\x09\x09int\x20j\x20=\x20int(\x20i\x20)\x20*\x204;\x0a\x09\x09int\x20x\x20=\x20j\x20%\x20size;\x0a\x09\x09int\x20y\x20=\x20j\x20/\x20size;\x0a\x09\x09vec4\x20v1\x20=\x20texelFetch(\x20batchingTexture,\x20ivec2(\x20x,\x20y\x20),\x200\x20);\x0a\x09\x09vec4\x20v2\x20=\x20texelFetch(\x20batchingTexture,\x20ivec2(\x20x\x20+\x201,\x20y\x20),\x200\x20);\x0a\x09\x09vec4\x20v3\x20=\x20texelFetch(\x20batchingTexture,\x20ivec2(\x20x\x20+\x202,\x20y\x20),\x200\x20);\x0a\x09\x09vec4\x20v4\x20=\x20texelFetch(\x20batchingTexture,\x20ivec2(\x20x\x20+\x203,\x20y\x20),\x200\x20);\x0a\x09\x09return\x20mat4(\x20v1,\x20v2,\x20v3,\x20v4\x20);\x0a\x0a\x09}\x0a#endif\x0a',
            'batching_vertex': '\x0a#ifdef\x20USE_BATCHING\x0a\x09mat4\x20batchingMatrix\x20=\x20getBatchingMatrix(\x20batchId\x20);\x0a#endif\x0a',
            'begin_vertex': '\x0avec3\x20transformed\x20=\x20vec3(\x20position\x20);\x0a\x0a#ifdef\x20USE_ALPHAHASH\x0a\x0a\x09vPosition\x20=\x20vec3(\x20position\x20);\x0a\x0a#endif\x0a',
            'beginnormal_vertex': '\x0avec3\x20objectNormal\x20=\x20vec3(\x20normal\x20);\x0a\x0a#ifdef\x20USE_TANGENT\x0a\x0a\x09vec3\x20objectTangent\x20=\x20vec3(\x20tangent.xyz\x20);\x0a\x0a#endif\x0a',
            'bsdfs': '\x0a\x0afloat\x20G_BlinnPhong_Implicit(\x20/*\x20const\x20in\x20float\x20dotNL,\x20const\x20in\x20float\x20dotNV\x20*/\x20)\x20{\x0a\x0a\x09//\x20geometry\x20term\x20is\x20(n\x20dot\x20l)(n\x20dot\x20v)\x20/\x204(n\x20dot\x20l)(n\x20dot\x20v)\x0a\x09return\x200.25;\x0a\x0a}\x0a\x0afloat\x20D_BlinnPhong(\x20const\x20in\x20float\x20shininess,\x20const\x20in\x20float\x20dotNH\x20)\x20{\x0a\x0a\x09return\x20RECIPROCAL_PI\x20*\x20(\x20shininess\x20*\x200.5\x20+\x201.0\x20)\x20*\x20pow(\x20dotNH,\x20shininess\x20);\x0a\x0a}\x0a\x0avec3\x20BRDF_BlinnPhong(\x20const\x20in\x20vec3\x20lightDir,\x20const\x20in\x20vec3\x20viewDir,\x20const\x20in\x20vec3\x20normal,\x20const\x20in\x20vec3\x20specularColor,\x20const\x20in\x20float\x20shininess\x20)\x20{\x0a\x0a\x09vec3\x20halfDir\x20=\x20normalize(\x20lightDir\x20+\x20viewDir\x20);\x0a\x0a\x09float\x20dotNH\x20=\x20saturate(\x20dot(\x20normal,\x20halfDir\x20)\x20);\x0a\x09float\x20dotVH\x20=\x20saturate(\x20dot(\x20viewDir,\x20halfDir\x20)\x20);\x0a\x0a\x09vec3\x20F\x20=\x20F_Schlick(\x20specularColor,\x201.0,\x20dotVH\x20);\x0a\x0a\x09float\x20G\x20=\x20G_BlinnPhong_Implicit(\x20/*\x20dotNL,\x20dotNV\x20*/\x20);\x0a\x0a\x09float\x20D\x20=\x20D_BlinnPhong(\x20shininess,\x20dotNH\x20);\x0a\x0a\x09return\x20F\x20*\x20(\x20G\x20*\x20D\x20);\x0a\x0a}\x20//\x20validated\x0a\x0a',
            'iridescence_fragment': '\x0a\x0a#ifdef\x20USE_IRIDESCENCE\x0a\x0a\x09//\x20XYZ\x20to\x20linear-sRGB\x20color\x20space\x0a\x09const\x20mat3\x20XYZ_TO_REC709\x20=\x20mat3(\x0a\x09\x09\x203.2404542,\x20-0.9692660,\x20\x200.0556434,\x0a\x09\x09-1.5371385,\x20\x201.8760108,\x20-0.2040259,\x0a\x09\x09-0.4985314,\x20\x200.0415560,\x20\x201.0572252\x0a\x09);\x0a\x0a\x09//\x20Assume\x20air\x20interface\x20for\x20top\x0a\x09//\x20Note:\x20We\x20don\x27t\x20handle\x20the\x20case\x20fresnel0\x20==\x201\x0a\x09vec3\x20Fresnel0ToIor(\x20vec3\x20fresnel0\x20)\x20{\x0a\x0a\x09\x09vec3\x20sqrtF0\x20=\x20sqrt(\x20fresnel0\x20);\x0a\x09\x09return\x20(\x20vec3(\x201.0\x20)\x20+\x20sqrtF0\x20)\x20/\x20(\x20vec3(\x201.0\x20)\x20-\x20sqrtF0\x20);\x0a\x0a\x09}\x0a\x0a\x09//\x20Conversion\x20FO/IOR\x0a\x09vec3\x20IorToFresnel0(\x20vec3\x20transmittedIor,\x20float\x20incidentIor\x20)\x20{\x0a\x0a\x09\x09return\x20pow2(\x20(\x20transmittedIor\x20-\x20vec3(\x20incidentIor\x20)\x20)\x20/\x20(\x20transmittedIor\x20+\x20vec3(\x20incidentIor\x20)\x20)\x20);\x0a\x0a\x09}\x0a\x0a\x09//\x20ior\x20is\x20a\x20value\x20between\x201.0\x20and\x203.0.\x201.0\x20is\x20air\x20interface\x0a\x09float\x20IorToFresnel0(\x20float\x20transmittedIor,\x20float\x20incidentIor\x20)\x20{\x0a\x0a\x09\x09return\x20pow2(\x20(\x20transmittedIor\x20-\x20incidentIor\x20)\x20/\x20(\x20transmittedIor\x20+\x20incidentIor\x20));\x0a\x0a\x09}\x0a\x0a\x09//\x20Fresnel\x20equations\x20for\x20dielectric/dielectric\x20interfaces.\x0a\x09//\x20Ref:\x20https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html\x0a\x09//\x20Evaluation\x20XYZ\x20sensitivity\x20curves\x20in\x20Fourier\x20space\x0a\x09vec3\x20evalSensitivity(\x20float\x20OPD,\x20vec3\x20shift\x20)\x20{\x0a\x0a\x09\x09float\x20phase\x20=\x202.0\x20*\x20PI\x20*\x20OPD\x20*\x201.0e-9;\x0a\x09\x09vec3\x20val\x20=\x20vec3(\x205.4856e-13,\x204.4201e-13,\x205.2481e-13\x20);\x0a\x09\x09vec3\x20pos\x20=\x20vec3(\x201.6810e+06,\x201.7953e+06,\x202.2084e+06\x20);\x0a\x09\x09vec3\x20var\x20=\x20vec3(\x204.3278e+09,\x209.3046e+09,\x206.6121e+09\x20);\x0a\x0a\x09\x09vec3\x20xyz\x20=\x20val\x20*\x20sqrt(\x202.0\x20*\x20PI\x20*\x20var\x20)\x20*\x20cos(\x20pos\x20*\x20phase\x20+\x20shift\x20)\x20*\x20exp(\x20-\x20pow2(\x20phase\x20)\x20*\x20var\x20);\x0a\x09\x09xyz.x\x20+=\x209.7470e-14\x20*\x20sqrt(\x202.0\x20*\x20PI\x20*\x204.5282e+09\x20)\x20*\x20cos(\x202.2399e+06\x20*\x20phase\x20+\x20shift[\x200\x20]\x20)\x20*\x20exp(\x20-\x204.5282e+09\x20*\x20pow2(\x20phase\x20)\x20);\x0a\x09\x09xyz\x20/=\x201.0685e-7;\x0a\x0a\x09\x09vec3\x20rgb\x20=\x20XYZ_TO_REC709\x20*\x20xyz;\x0a\x09\x09return\x20rgb;\x0a\x0a\x09}\x0a\x0a\x09vec3\x20evalIridescence(\x20float\x20outsideIOR,\x20float\x20eta2,\x20float\x20cosTheta1,\x20float\x20thinFilmThickness,\x20vec3\x20baseF0\x20)\x20{\x0a\x0a\x09\x09vec3\x20I;\x0a\x0a\x09\x09//\x20Force\x20iridescenceIOR\x20->\x20outsideIOR\x20when\x20thinFilmThickness\x20->\x200.0\x0a\x09\x09float\x20iridescenceIOR\x20=\x20mix(\x20outsideIOR,\x20eta2,\x20smoothstep(\x200.0,\x200.03,\x20thinFilmThickness\x20)\x20);\x0a\x09\x09//\x20Evaluate\x20the\x20cosTheta\x20on\x20the\x20base\x20layer\x20(Snell\x20law)\x0a\x09\x09float\x20sinTheta2Sq\x20=\x20pow2(\x20outsideIOR\x20/\x20iridescenceIOR\x20)\x20*\x20(\x201.0\x20-\x20pow2(\x20cosTheta1\x20)\x20);\x0a\x0a\x09\x09//\x20Handle\x20TIR:\x0a\x09\x09float\x20cosTheta2Sq\x20=\x201.0\x20-\x20sinTheta2Sq;\x0a\x09\x09if\x20(\x20cosTheta2Sq\x20<\x200.0\x20)\x20{\x0a\x0a\x09\x09\x09return\x20vec3(\x201.0\x20);\x0a\x0a\x09\x09}\x0a\x0a\x09\x09float\x20cosTheta2\x20=\x20sqrt(\x20cosTheta2Sq\x20);\x0a\x0a\x09\x09//\x20First\x20interface\x0a\x09\x09float\x20R0\x20=\x20IorToFresnel0(\x20iridescenceIOR,\x20outsideIOR\x20);\x0a\x09\x09float\x20R12\x20=\x20F_Schlick(\x20R0,\x201.0,\x20cosTheta1\x20);\x0a\x09\x09float\x20T121\x20=\x201.0\x20-\x20R12;\x0a\x09\x09float\x20phi12\x20=\x200.0;\x0a\x09\x09if\x20(\x20iridescenceIOR\x20<\x20outsideIOR\x20)\x20phi12\x20=\x20PI;\x0a\x09\x09float\x20phi21\x20=\x20PI\x20-\x20phi12;\x0a\x0a\x09\x09//\x20Second\x20interface\x0a\x09\x09vec3\x20baseIOR\x20=\x20Fresnel0ToIor(\x20clamp(\x20baseF0,\x200.0,\x200.9999\x20)\x20);\x20//\x20guard\x20against\x201.0\x0a\x09\x09vec3\x20R1\x20=\x20IorToFresnel0(\x20baseIOR,\x20iridescenceIOR\x20);\x0a\x09\x09vec3\x20R23\x20=\x20F_Schlick(\x20R1,\x201.0,\x20cosTheta2\x20);\x0a\x09\x09vec3\x20phi23\x20=\x20vec3(\x200.0\x20);\x0a\x09\x09if\x20(\x20baseIOR[\x200\x20]\x20<\x20iridescenceIOR\x20)\x20phi23[\x200\x20]\x20=\x20PI;\x0a\x09\x09if\x20(\x20baseIOR[\x201\x20]\x20<\x20iridescenceIOR\x20)\x20phi23[\x201\x20]\x20=\x20PI;\x0a\x09\x09if\x20(\x20baseIOR[\x202\x20]\x20<\x20iridescenceIOR\x20)\x20phi23[\x202\x20]\x20=\x20PI;\x0a\x0a\x09\x09//\x20Phase\x20shift\x0a\x09\x09float\x20OPD\x20=\x202.0\x20*\x20iridescenceIOR\x20*\x20thinFilmThickness\x20*\x20cosTheta2;\x0a\x09\x09vec3\x20phi\x20=\x20vec3(\x20phi21\x20)\x20+\x20phi23;\x0a\x0a\x09\x09//\x20Compound\x20terms\x0a\x09\x09vec3\x20R123\x20=\x20clamp(\x20R12\x20*\x20R23,\x201e-5,\x200.9999\x20);\x0a\x09\x09vec3\x20r123\x20=\x20sqrt(\x20R123\x20);\x0a\x09\x09vec3\x20Rs\x20=\x20pow2(\x20T121\x20)\x20*\x20R23\x20/\x20(\x20vec3(\x201.0\x20)\x20-\x20R123\x20);\x0a\x0a\x09\x09//\x20Reflectance\x20term\x20for\x20m\x20=\x200\x20(DC\x20term\x20amplitude)\x0a\x09\x09vec3\x20C0\x20=\x20R12\x20+\x20Rs;\x0a\x09\x09I\x20=\x20C0;\x0a\x0a\x09\x09//\x20Reflectance\x20term\x20for\x20m\x20>\x200\x20(pairs\x20of\x20diracs)\x0a\x09\x09vec3\x20Cm\x20=\x20Rs\x20-\x20T121;\x0a\x09\x09for\x20(\x20int\x20m\x20=\x201;\x20m\x20<=\x202;\x20++\x20m\x20)\x20{\x0a\x0a\x09\x09\x09Cm\x20*=\x20r123;\x0a\x09\x09\x09vec3\x20Sm\x20=\x202.0\x20*\x20evalSensitivity(\x20float(\x20m\x20)\x20*\x20OPD,\x20float(\x20m\x20)\x20*\x20phi\x20);\x0a\x09\x09\x09I\x20+=\x20Cm\x20*\x20Sm;\x0a\x0a\x09\x09}\x0a\x0a\x09\x09//\x20Since\x20out\x20of\x20gamut\x20colors\x20might\x20be\x20produced,\x20negative\x20color\x20values\x20are\x20clamped\x20to\x200.\x0a\x09\x09return\x20max(\x20I,\x20vec3(\x200.0\x20)\x20);\x0a\x0a\x09}\x0a\x0a#endif\x0a\x0a',
            'bumpmap_pars_fragment': '\x0a#ifdef\x20USE_BUMPMAP\x0a\x0a\x09uniform\x20sampler2D\x20bumpMap;\x0a\x09uniform\x20float\x20bumpScale;\x0a\x0a\x09//\x20Bump\x20Mapping\x20Unparametrized\x20Surfaces\x20on\x20the\x20GPU\x20by\x20Morten\x20S.\x20Mikkelsen\x0a\x09//\x20https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf\x0a\x0a\x09//\x20Evaluate\x20the\x20derivative\x20of\x20the\x20height\x20w.r.t.\x20screen-space\x20using\x20forward\x20differencing\x20(listing\x202)\x0a\x0a\x09vec2\x20dHdxy_fwd()\x20{\x0a\x0a\x09\x09vec2\x20dSTdx\x20=\x20dFdx(\x20vBumpMapUv\x20);\x0a\x09\x09vec2\x20dSTdy\x20=\x20dFdy(\x20vBumpMapUv\x20);\x0a\x0a\x09\x09float\x20Hll\x20=\x20bumpScale\x20*\x20texture2D(\x20bumpMap,\x20vBumpMapUv\x20).x;\x0a\x09\x09float\x20dBx\x20=\x20bumpScale\x20*\x20texture2D(\x20bumpMap,\x20vBumpMapUv\x20+\x20dSTdx\x20).x\x20-\x20Hll;\x0a\x09\x09float\x20dBy\x20=\x20bumpScale\x20*\x20texture2D(\x20bumpMap,\x20vBumpMapUv\x20+\x20dSTdy\x20).x\x20-\x20Hll;\x0a\x0a\x09\x09return\x20vec2(\x20dBx,\x20dBy\x20);\x0a\x0a\x09}\x0a\x0a\x09vec3\x20perturbNormalArb(\x20vec3\x20surf_pos,\x20vec3\x20surf_norm,\x20vec2\x20dHdxy,\x20float\x20faceDirection\x20)\x20{\x0a\x0a\x09\x09//\x20normalize\x20is\x20done\x20to\x20ensure\x20that\x20the\x20bump\x20map\x20looks\x20the\x20same\x20regardless\x20of\x20the\x20texture\x27s\x20scale\x0a\x09\x09vec3\x20vSigmaX\x20=\x20normalize(\x20dFdx(\x20surf_pos.xyz\x20)\x20);\x0a\x09\x09vec3\x20vSigmaY\x20=\x20normalize(\x20dFdy(\x20surf_pos.xyz\x20)\x20);\x0a\x09\x09vec3\x20vN\x20=\x20surf_norm;\x20//\x20normalized\x0a\x0a\x09\x09vec3\x20R1\x20=\x20cross(\x20vSigmaY,\x20vN\x20);\x0a\x09\x09vec3\x20R2\x20=\x20cross(\x20vN,\x20vSigmaX\x20);\x0a\x0a\x09\x09float\x20fDet\x20=\x20dot(\x20vSigmaX,\x20R1\x20)\x20*\x20faceDirection;\x0a\x0a\x09\x09vec3\x20vGrad\x20=\x20sign(\x20fDet\x20)\x20*\x20(\x20dHdxy.x\x20*\x20R1\x20+\x20dHdxy.y\x20*\x20R2\x20);\x0a\x09\x09return\x20normalize(\x20abs(\x20fDet\x20)\x20*\x20surf_norm\x20-\x20vGrad\x20);\x0a\x0a\x09}\x0a\x0a#endif\x0a',
            'clipping_planes_fragment': '\x0a#if\x20NUM_CLIPPING_PLANES\x20>\x200\x0a\x0a\x09vec4\x20plane;\x0a\x0a\x09#pragma\x20unroll_loop_start\x0a\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20UNION_CLIPPING_PLANES;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09plane\x20=\x20clippingPlanes[\x20i\x20];\x0a\x09\x09if\x20(\x20dot(\x20vClipPosition,\x20plane.xyz\x20)\x20>\x20plane.w\x20)\x20discard;\x0a\x0a\x09}\x0a\x09#pragma\x20unroll_loop_end\x0a\x0a\x09#if\x20UNION_CLIPPING_PLANES\x20<\x20NUM_CLIPPING_PLANES\x0a\x0a\x09\x09bool\x20clipped\x20=\x20true;\x0a\x0a\x09\x09#pragma\x20unroll_loop_start\x0a\x09\x09for\x20(\x20int\x20i\x20=\x20UNION_CLIPPING_PLANES;\x20i\x20<\x20NUM_CLIPPING_PLANES;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09\x09plane\x20=\x20clippingPlanes[\x20i\x20];\x0a\x09\x09\x09clipped\x20=\x20(\x20dot(\x20vClipPosition,\x20plane.xyz\x20)\x20>\x20plane.w\x20)\x20&&\x20clipped;\x0a\x0a\x09\x09}\x0a\x09\x09#pragma\x20unroll_loop_end\x0a\x0a\x09\x09if\x20(\x20clipped\x20)\x20discard;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'clipping_planes_pars_fragment': '\x0a#if\x20NUM_CLIPPING_PLANES\x20>\x200\x0a\x0a\x09varying\x20vec3\x20vClipPosition;\x0a\x0a\x09uniform\x20vec4\x20clippingPlanes[\x20NUM_CLIPPING_PLANES\x20];\x0a\x0a#endif\x0a',
            'clipping_planes_pars_vertex': '\x0a#if\x20NUM_CLIPPING_PLANES\x20>\x200\x0a\x0a\x09varying\x20vec3\x20vClipPosition;\x0a\x0a#endif\x0a',
            'clipping_planes_vertex': '\x0a#if\x20NUM_CLIPPING_PLANES\x20>\x200\x0a\x0a\x09vClipPosition\x20=\x20-\x20mvPosition.xyz;\x0a\x0a#endif\x0a',
            'color_fragment': '\x0a#if\x20defined(\x20USE_COLOR_ALPHA\x20)\x0a\x0a\x09diffuseColor\x20*=\x20vColor;\x0a\x0a#elif\x20defined(\x20USE_COLOR\x20)\x0a\x0a\x09diffuseColor.rgb\x20*=\x20vColor;\x0a\x0a#endif\x0a',
            'color_pars_fragment': '\x0a#if\x20defined(\x20USE_COLOR_ALPHA\x20)\x0a\x0a\x09varying\x20vec4\x20vColor;\x0a\x0a#elif\x20defined(\x20USE_COLOR\x20)\x0a\x0a\x09varying\x20vec3\x20vColor;\x0a\x0a#endif\x0a',
            'color_pars_vertex': '\x0a#if\x20defined(\x20USE_COLOR_ALPHA\x20)\x0a\x0a\x09varying\x20vec4\x20vColor;\x0a\x0a#elif\x20defined(\x20USE_COLOR\x20)\x20||\x20defined(\x20USE_INSTANCING_COLOR\x20)\x0a\x0a\x09varying\x20vec3\x20vColor;\x0a\x0a#endif\x0a',
            'color_vertex': '\x0a#if\x20defined(\x20USE_COLOR_ALPHA\x20)\x0a\x0a\x09vColor\x20=\x20vec4(\x201.0\x20);\x0a\x0a#elif\x20defined(\x20USE_COLOR\x20)\x20||\x20defined(\x20USE_INSTANCING_COLOR\x20)\x0a\x0a\x09vColor\x20=\x20vec3(\x201.0\x20);\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_COLOR\x0a\x0a\x09vColor\x20*=\x20color;\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_INSTANCING_COLOR\x0a\x0a\x09vColor.xyz\x20*=\x20instanceColor.xyz;\x0a\x0a#endif\x0a',
            'common': '\x0a#define\x20PI\x203.141592653589793\x0a#define\x20PI2\x206.283185307179586\x0a#define\x20PI_HALF\x201.5707963267948966\x0a#define\x20RECIPROCAL_PI\x200.3183098861837907\x0a#define\x20RECIPROCAL_PI2\x200.15915494309189535\x0a#define\x20EPSILON\x201e-6\x0a\x0a#ifndef\x20saturate\x0a//\x20<tonemapping_pars_fragment>\x20may\x20have\x20defined\x20saturate()\x20already\x0a#define\x20saturate(\x20a\x20)\x20clamp(\x20a,\x200.0,\x201.0\x20)\x0a#endif\x0a#define\x20whiteComplement(\x20a\x20)\x20(\x201.0\x20-\x20saturate(\x20a\x20)\x20)\x0a\x0afloat\x20pow2(\x20const\x20in\x20float\x20x\x20)\x20{\x20return\x20x*x;\x20}\x0avec3\x20pow2(\x20const\x20in\x20vec3\x20x\x20)\x20{\x20return\x20x*x;\x20}\x0afloat\x20pow3(\x20const\x20in\x20float\x20x\x20)\x20{\x20return\x20x*x*x;\x20}\x0afloat\x20pow4(\x20const\x20in\x20float\x20x\x20)\x20{\x20float\x20x2\x20=\x20x*x;\x20return\x20x2*x2;\x20}\x0afloat\x20max3(\x20const\x20in\x20vec3\x20v\x20)\x20{\x20return\x20max(\x20max(\x20v.x,\x20v.y\x20),\x20v.z\x20);\x20}\x0afloat\x20average(\x20const\x20in\x20vec3\x20v\x20)\x20{\x20return\x20dot(\x20v,\x20vec3(\x200.3333333\x20)\x20);\x20}\x0a\x0a//\x20expects\x20values\x20in\x20the\x20range\x20of\x20[0,1]x[0,1],\x20returns\x20values\x20in\x20the\x20[0,1]\x20range.\x0a//\x20do\x20not\x20collapse\x20into\x20a\x20single\x20function\x20per:\x20http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\x0ahighp\x20float\x20rand(\x20const\x20in\x20vec2\x20uv\x20)\x20{\x0a\x0a\x09const\x20highp\x20float\x20a\x20=\x2012.9898,\x20b\x20=\x2078.233,\x20c\x20=\x2043758.5453;\x0a\x09highp\x20float\x20dt\x20=\x20dot(\x20uv.xy,\x20vec2(\x20a,b\x20)\x20),\x20sn\x20=\x20mod(\x20dt,\x20PI\x20);\x0a\x0a\x09return\x20fract(\x20sin(\x20sn\x20)\x20*\x20c\x20);\x0a\x0a}\x0a\x0a#ifdef\x20HIGH_PRECISION\x0a\x09float\x20precisionSafeLength(\x20vec3\x20v\x20)\x20{\x20return\x20length(\x20v\x20);\x20}\x0a#else\x0a\x09float\x20precisionSafeLength(\x20vec3\x20v\x20)\x20{\x0a\x09\x09float\x20maxComponent\x20=\x20max3(\x20abs(\x20v\x20)\x20);\x0a\x09\x09return\x20length(\x20v\x20/\x20maxComponent\x20)\x20*\x20maxComponent;\x0a\x09}\x0a#endif\x0a\x0astruct\x20IncidentLight\x20{\x0a\x09vec3\x20color;\x0a\x09vec3\x20direction;\x0a\x09bool\x20visible;\x0a};\x0a\x0astruct\x20ReflectedLight\x20{\x0a\x09vec3\x20directDiffuse;\x0a\x09vec3\x20directSpecular;\x0a\x09vec3\x20indirectDiffuse;\x0a\x09vec3\x20indirectSpecular;\x0a};\x0a\x0a#ifdef\x20USE_ALPHAHASH\x0a\x0a\x09varying\x20vec3\x20vPosition;\x0a\x0a#endif\x0a\x0avec3\x20transformDirection(\x20in\x20vec3\x20dir,\x20in\x20mat4\x20matrix\x20)\x20{\x0a\x0a\x09return\x20normalize(\x20(\x20matrix\x20*\x20vec4(\x20dir,\x200.0\x20)\x20).xyz\x20);\x0a\x0a}\x0a\x0avec3\x20inverseTransformDirection(\x20in\x20vec3\x20dir,\x20in\x20mat4\x20matrix\x20)\x20{\x0a\x0a\x09//\x20dir\x20can\x20be\x20either\x20a\x20direction\x20vector\x20or\x20a\x20normal\x20vector\x0a\x09//\x20upper-left\x203x3\x20of\x20matrix\x20is\x20assumed\x20to\x20be\x20orthogonal\x0a\x0a\x09return\x20normalize(\x20(\x20vec4(\x20dir,\x200.0\x20)\x20*\x20matrix\x20).xyz\x20);\x0a\x0a}\x0a\x0amat3\x20transposeMat3(\x20const\x20in\x20mat3\x20m\x20)\x20{\x0a\x0a\x09mat3\x20tmp;\x0a\x0a\x09tmp[\x200\x20]\x20=\x20vec3(\x20m[\x200\x20].x,\x20m[\x201\x20].x,\x20m[\x202\x20].x\x20);\x0a\x09tmp[\x201\x20]\x20=\x20vec3(\x20m[\x200\x20].y,\x20m[\x201\x20].y,\x20m[\x202\x20].y\x20);\x0a\x09tmp[\x202\x20]\x20=\x20vec3(\x20m[\x200\x20].z,\x20m[\x201\x20].z,\x20m[\x202\x20].z\x20);\x0a\x0a\x09return\x20tmp;\x0a\x0a}\x0a\x0afloat\x20luminance(\x20const\x20in\x20vec3\x20rgb\x20)\x20{\x0a\x0a\x09//\x20assumes\x20rgb\x20is\x20in\x20linear\x20color\x20space\x20with\x20sRGB\x20primaries\x20and\x20D65\x20white\x20point\x0a\x0a\x09const\x20vec3\x20weights\x20=\x20vec3(\x200.2126729,\x200.7151522,\x200.0721750\x20);\x0a\x0a\x09return\x20dot(\x20weights,\x20rgb\x20);\x0a\x0a}\x0a\x0abool\x20isPerspectiveMatrix(\x20mat4\x20m\x20)\x20{\x0a\x0a\x09return\x20m[\x202\x20][\x203\x20]\x20==\x20-\x201.0;\x0a\x0a}\x0a\x0avec2\x20equirectUv(\x20in\x20vec3\x20dir\x20)\x20{\x0a\x0a\x09//\x20dir\x20is\x20assumed\x20to\x20be\x20unit\x20length\x0a\x0a\x09float\x20u\x20=\x20atan(\x20dir.z,\x20dir.x\x20)\x20*\x20RECIPROCAL_PI2\x20+\x200.5;\x0a\x0a\x09float\x20v\x20=\x20asin(\x20clamp(\x20dir.y,\x20-\x201.0,\x201.0\x20)\x20)\x20*\x20RECIPROCAL_PI\x20+\x200.5;\x0a\x0a\x09return\x20vec2(\x20u,\x20v\x20);\x0a\x0a}\x0a\x0avec3\x20BRDF_Lambert(\x20const\x20in\x20vec3\x20diffuseColor\x20)\x20{\x0a\x0a\x09return\x20RECIPROCAL_PI\x20*\x20diffuseColor;\x0a\x0a}\x20//\x20validated\x0a\x0avec3\x20F_Schlick(\x20const\x20in\x20vec3\x20f0,\x20const\x20in\x20float\x20f90,\x20const\x20in\x20float\x20dotVH\x20)\x20{\x0a\x0a\x09//\x20Original\x20approximation\x20by\x20Christophe\x20Schlick\x20\x2794\x0a\x09//\x20float\x20fresnel\x20=\x20pow(\x201.0\x20-\x20dotVH,\x205.0\x20);\x0a\x0a\x09//\x20Optimized\x20variant\x20(presented\x20by\x20Epic\x20at\x20SIGGRAPH\x20\x2713)\x0a\x09//\x20https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf\x0a\x09float\x20fresnel\x20=\x20exp2(\x20(\x20-\x205.55473\x20*\x20dotVH\x20-\x206.98316\x20)\x20*\x20dotVH\x20);\x0a\x0a\x09return\x20f0\x20*\x20(\x201.0\x20-\x20fresnel\x20)\x20+\x20(\x20f90\x20*\x20fresnel\x20);\x0a\x0a}\x20//\x20validated\x0a\x0afloat\x20F_Schlick(\x20const\x20in\x20float\x20f0,\x20const\x20in\x20float\x20f90,\x20const\x20in\x20float\x20dotVH\x20)\x20{\x0a\x0a\x09//\x20Original\x20approximation\x20by\x20Christophe\x20Schlick\x20\x2794\x0a\x09//\x20float\x20fresnel\x20=\x20pow(\x201.0\x20-\x20dotVH,\x205.0\x20);\x0a\x0a\x09//\x20Optimized\x20variant\x20(presented\x20by\x20Epic\x20at\x20SIGGRAPH\x20\x2713)\x0a\x09//\x20https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf\x0a\x09float\x20fresnel\x20=\x20exp2(\x20(\x20-\x205.55473\x20*\x20dotVH\x20-\x206.98316\x20)\x20*\x20dotVH\x20);\x0a\x0a\x09return\x20f0\x20*\x20(\x201.0\x20-\x20fresnel\x20)\x20+\x20(\x20f90\x20*\x20fresnel\x20);\x0a\x0a}\x20//\x20validated\x0a',
            'cube_uv_reflection_fragment': '\x0a#ifdef\x20ENVMAP_TYPE_CUBE_UV\x0a\x0a\x09#define\x20cubeUV_minMipLevel\x204.0\x0a\x09#define\x20cubeUV_minTileSize\x2016.0\x0a\x0a\x09//\x20These\x20shader\x20functions\x20convert\x20between\x20the\x20UV\x20coordinates\x20of\x20a\x20single\x20face\x20of\x0a\x09//\x20a\x20cubemap,\x20the\x200-5\x20integer\x20index\x20of\x20a\x20cube\x20face,\x20and\x20the\x20direction\x20vector\x20for\x0a\x09//\x20sampling\x20a\x20textureCube\x20(not\x20generally\x20normalized\x20).\x0a\x0a\x09float\x20getFace(\x20vec3\x20direction\x20)\x20{\x0a\x0a\x09\x09vec3\x20absDirection\x20=\x20abs(\x20direction\x20);\x0a\x0a\x09\x09float\x20face\x20=\x20-\x201.0;\x0a\x0a\x09\x09if\x20(\x20absDirection.x\x20>\x20absDirection.z\x20)\x20{\x0a\x0a\x09\x09\x09if\x20(\x20absDirection.x\x20>\x20absDirection.y\x20)\x0a\x0a\x09\x09\x09\x09face\x20=\x20direction.x\x20>\x200.0\x20?\x200.0\x20:\x203.0;\x0a\x0a\x09\x09\x09else\x0a\x0a\x09\x09\x09\x09face\x20=\x20direction.y\x20>\x200.0\x20?\x201.0\x20:\x204.0;\x0a\x0a\x09\x09}\x20else\x20{\x0a\x0a\x09\x09\x09if\x20(\x20absDirection.z\x20>\x20absDirection.y\x20)\x0a\x0a\x09\x09\x09\x09face\x20=\x20direction.z\x20>\x200.0\x20?\x202.0\x20:\x205.0;\x0a\x0a\x09\x09\x09else\x0a\x0a\x09\x09\x09\x09face\x20=\x20direction.y\x20>\x200.0\x20?\x201.0\x20:\x204.0;\x0a\x0a\x09\x09}\x0a\x0a\x09\x09return\x20face;\x0a\x0a\x09}\x0a\x0a\x09//\x20RH\x20coordinate\x20system;\x20PMREM\x20face-indexing\x20convention\x0a\x09vec2\x20getUV(\x20vec3\x20direction,\x20float\x20face\x20)\x20{\x0a\x0a\x09\x09vec2\x20uv;\x0a\x0a\x09\x09if\x20(\x20face\x20==\x200.0\x20)\x20{\x0a\x0a\x09\x09\x09uv\x20=\x20vec2(\x20direction.z,\x20direction.y\x20)\x20/\x20abs(\x20direction.x\x20);\x20//\x20pos\x20x\x0a\x0a\x09\x09}\x20else\x20if\x20(\x20face\x20==\x201.0\x20)\x20{\x0a\x0a\x09\x09\x09uv\x20=\x20vec2(\x20-\x20direction.x,\x20-\x20direction.z\x20)\x20/\x20abs(\x20direction.y\x20);\x20//\x20pos\x20y\x0a\x0a\x09\x09}\x20else\x20if\x20(\x20face\x20==\x202.0\x20)\x20{\x0a\x0a\x09\x09\x09uv\x20=\x20vec2(\x20-\x20direction.x,\x20direction.y\x20)\x20/\x20abs(\x20direction.z\x20);\x20//\x20pos\x20z\x0a\x0a\x09\x09}\x20else\x20if\x20(\x20face\x20==\x203.0\x20)\x20{\x0a\x0a\x09\x09\x09uv\x20=\x20vec2(\x20-\x20direction.z,\x20direction.y\x20)\x20/\x20abs(\x20direction.x\x20);\x20//\x20neg\x20x\x0a\x0a\x09\x09}\x20else\x20if\x20(\x20face\x20==\x204.0\x20)\x20{\x0a\x0a\x09\x09\x09uv\x20=\x20vec2(\x20-\x20direction.x,\x20direction.z\x20)\x20/\x20abs(\x20direction.y\x20);\x20//\x20neg\x20y\x0a\x0a\x09\x09}\x20else\x20{\x0a\x0a\x09\x09\x09uv\x20=\x20vec2(\x20direction.x,\x20direction.y\x20)\x20/\x20abs(\x20direction.z\x20);\x20//\x20neg\x20z\x0a\x0a\x09\x09}\x0a\x0a\x09\x09return\x200.5\x20*\x20(\x20uv\x20+\x201.0\x20);\x0a\x0a\x09}\x0a\x0a\x09vec3\x20bilinearCubeUV(\x20sampler2D\x20envMap,\x20vec3\x20direction,\x20float\x20mipInt\x20)\x20{\x0a\x0a\x09\x09float\x20face\x20=\x20getFace(\x20direction\x20);\x0a\x0a\x09\x09float\x20filterInt\x20=\x20max(\x20cubeUV_minMipLevel\x20-\x20mipInt,\x200.0\x20);\x0a\x0a\x09\x09mipInt\x20=\x20max(\x20mipInt,\x20cubeUV_minMipLevel\x20);\x0a\x0a\x09\x09float\x20faceSize\x20=\x20exp2(\x20mipInt\x20);\x0a\x0a\x09\x09highp\x20vec2\x20uv\x20=\x20getUV(\x20direction,\x20face\x20)\x20*\x20(\x20faceSize\x20-\x202.0\x20)\x20+\x201.0;\x20//\x20#25071\x0a\x0a\x09\x09if\x20(\x20face\x20>\x202.0\x20)\x20{\x0a\x0a\x09\x09\x09uv.y\x20+=\x20faceSize;\x0a\x0a\x09\x09\x09face\x20-=\x203.0;\x0a\x0a\x09\x09}\x0a\x0a\x09\x09uv.x\x20+=\x20face\x20*\x20faceSize;\x0a\x0a\x09\x09uv.x\x20+=\x20filterInt\x20*\x203.0\x20*\x20cubeUV_minTileSize;\x0a\x0a\x09\x09uv.y\x20+=\x204.0\x20*\x20(\x20exp2(\x20CUBEUV_MAX_MIP\x20)\x20-\x20faceSize\x20);\x0a\x0a\x09\x09uv.x\x20*=\x20CUBEUV_TEXEL_WIDTH;\x0a\x09\x09uv.y\x20*=\x20CUBEUV_TEXEL_HEIGHT;\x0a\x0a\x09\x09#ifdef\x20texture2DGradEXT\x0a\x0a\x09\x09\x09return\x20texture2DGradEXT(\x20envMap,\x20uv,\x20vec2(\x200.0\x20),\x20vec2(\x200.0\x20)\x20).rgb;\x20//\x20disable\x20anisotropic\x20filtering\x0a\x0a\x09\x09#else\x0a\x0a\x09\x09\x09return\x20texture2D(\x20envMap,\x20uv\x20).rgb;\x0a\x0a\x09\x09#endif\x0a\x0a\x09}\x0a\x0a\x09//\x20These\x20defines\x20must\x20match\x20with\x20PMREMGenerator\x0a\x0a\x09#define\x20cubeUV_r0\x201.0\x0a\x09#define\x20cubeUV_v0\x200.339\x0a\x09#define\x20cubeUV_m0\x20-\x202.0\x0a\x09#define\x20cubeUV_r1\x200.8\x0a\x09#define\x20cubeUV_v1\x200.276\x0a\x09#define\x20cubeUV_m1\x20-\x201.0\x0a\x09#define\x20cubeUV_r4\x200.4\x0a\x09#define\x20cubeUV_v4\x200.046\x0a\x09#define\x20cubeUV_m4\x202.0\x0a\x09#define\x20cubeUV_r5\x200.305\x0a\x09#define\x20cubeUV_v5\x200.016\x0a\x09#define\x20cubeUV_m5\x203.0\x0a\x09#define\x20cubeUV_r6\x200.21\x0a\x09#define\x20cubeUV_v6\x200.0038\x0a\x09#define\x20cubeUV_m6\x204.0\x0a\x0a\x09float\x20roughnessToMip(\x20float\x20roughness\x20)\x20{\x0a\x0a\x09\x09float\x20mip\x20=\x200.0;\x0a\x0a\x09\x09if\x20(\x20roughness\x20>=\x20cubeUV_r1\x20)\x20{\x0a\x0a\x09\x09\x09mip\x20=\x20(\x20cubeUV_r0\x20-\x20roughness\x20)\x20*\x20(\x20cubeUV_m1\x20-\x20cubeUV_m0\x20)\x20/\x20(\x20cubeUV_r0\x20-\x20cubeUV_r1\x20)\x20+\x20cubeUV_m0;\x0a\x0a\x09\x09}\x20else\x20if\x20(\x20roughness\x20>=\x20cubeUV_r4\x20)\x20{\x0a\x0a\x09\x09\x09mip\x20=\x20(\x20cubeUV_r1\x20-\x20roughness\x20)\x20*\x20(\x20cubeUV_m4\x20-\x20cubeUV_m1\x20)\x20/\x20(\x20cubeUV_r1\x20-\x20cubeUV_r4\x20)\x20+\x20cubeUV_m1;\x0a\x0a\x09\x09}\x20else\x20if\x20(\x20roughness\x20>=\x20cubeUV_r5\x20)\x20{\x0a\x0a\x09\x09\x09mip\x20=\x20(\x20cubeUV_r4\x20-\x20roughness\x20)\x20*\x20(\x20cubeUV_m5\x20-\x20cubeUV_m4\x20)\x20/\x20(\x20cubeUV_r4\x20-\x20cubeUV_r5\x20)\x20+\x20cubeUV_m4;\x0a\x0a\x09\x09}\x20else\x20if\x20(\x20roughness\x20>=\x20cubeUV_r6\x20)\x20{\x0a\x0a\x09\x09\x09mip\x20=\x20(\x20cubeUV_r5\x20-\x20roughness\x20)\x20*\x20(\x20cubeUV_m6\x20-\x20cubeUV_m5\x20)\x20/\x20(\x20cubeUV_r5\x20-\x20cubeUV_r6\x20)\x20+\x20cubeUV_m5;\x0a\x0a\x09\x09}\x20else\x20{\x0a\x0a\x09\x09\x09mip\x20=\x20-\x202.0\x20*\x20log2(\x201.16\x20*\x20roughness\x20);\x20//\x201.16\x20=\x201.79^0.25\x0a\x09\x09}\x0a\x0a\x09\x09return\x20mip;\x0a\x0a\x09}\x0a\x0a\x09vec4\x20textureCubeUV(\x20sampler2D\x20envMap,\x20vec3\x20sampleDir,\x20float\x20roughness\x20)\x20{\x0a\x0a\x09\x09float\x20mip\x20=\x20clamp(\x20roughnessToMip(\x20roughness\x20),\x20cubeUV_m0,\x20CUBEUV_MAX_MIP\x20);\x0a\x0a\x09\x09float\x20mipF\x20=\x20fract(\x20mip\x20);\x0a\x0a\x09\x09float\x20mipInt\x20=\x20floor(\x20mip\x20);\x0a\x0a\x09\x09vec3\x20color0\x20=\x20bilinearCubeUV(\x20envMap,\x20sampleDir,\x20mipInt\x20);\x0a\x0a\x09\x09if\x20(\x20mipF\x20==\x200.0\x20)\x20{\x0a\x0a\x09\x09\x09return\x20vec4(\x20color0,\x201.0\x20);\x0a\x0a\x09\x09}\x20else\x20{\x0a\x0a\x09\x09\x09vec3\x20color1\x20=\x20bilinearCubeUV(\x20envMap,\x20sampleDir,\x20mipInt\x20+\x201.0\x20);\x0a\x0a\x09\x09\x09return\x20vec4(\x20mix(\x20color0,\x20color1,\x20mipF\x20),\x201.0\x20);\x0a\x0a\x09\x09}\x0a\x0a\x09}\x0a\x0a#endif\x0a',
            'defaultnormal_vertex': '\x0a\x0avec3\x20transformedNormal\x20=\x20objectNormal;\x0a#ifdef\x20USE_TANGENT\x0a\x0a\x09vec3\x20transformedTangent\x20=\x20objectTangent;\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_BATCHING\x0a\x0a\x09//\x20this\x20is\x20in\x20lieu\x20of\x20a\x20per-instance\x20normal-matrix\x0a\x09//\x20shear\x20transforms\x20in\x20the\x20instance\x20matrix\x20are\x20not\x20supported\x0a\x0a\x09mat3\x20bm\x20=\x20mat3(\x20batchingMatrix\x20);\x0a\x09transformedNormal\x20/=\x20vec3(\x20dot(\x20bm[\x200\x20],\x20bm[\x200\x20]\x20),\x20dot(\x20bm[\x201\x20],\x20bm[\x201\x20]\x20),\x20dot(\x20bm[\x202\x20],\x20bm[\x202\x20]\x20)\x20);\x0a\x09transformedNormal\x20=\x20bm\x20*\x20transformedNormal;\x0a\x0a\x09#ifdef\x20USE_TANGENT\x0a\x0a\x09\x09transformedTangent\x20=\x20bm\x20*\x20transformedTangent;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_INSTANCING\x0a\x0a\x09//\x20this\x20is\x20in\x20lieu\x20of\x20a\x20per-instance\x20normal-matrix\x0a\x09//\x20shear\x20transforms\x20in\x20the\x20instance\x20matrix\x20are\x20not\x20supported\x0a\x0a\x09mat3\x20im\x20=\x20mat3(\x20instanceMatrix\x20);\x0a\x09transformedNormal\x20/=\x20vec3(\x20dot(\x20im[\x200\x20],\x20im[\x200\x20]\x20),\x20dot(\x20im[\x201\x20],\x20im[\x201\x20]\x20),\x20dot(\x20im[\x202\x20],\x20im[\x202\x20]\x20)\x20);\x0a\x09transformedNormal\x20=\x20im\x20*\x20transformedNormal;\x0a\x0a\x09#ifdef\x20USE_TANGENT\x0a\x0a\x09\x09transformedTangent\x20=\x20im\x20*\x20transformedTangent;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a\x0atransformedNormal\x20=\x20normalMatrix\x20*\x20transformedNormal;\x0a\x0a#ifdef\x20FLIP_SIDED\x0a\x0a\x09transformedNormal\x20=\x20-\x20transformedNormal;\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_TANGENT\x0a\x0a\x09transformedTangent\x20=\x20(\x20modelViewMatrix\x20*\x20vec4(\x20transformedTangent,\x200.0\x20)\x20).xyz;\x0a\x0a\x09#ifdef\x20FLIP_SIDED\x0a\x0a\x09\x09transformedTangent\x20=\x20-\x20transformedTangent;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'displacementmap_pars_vertex': '\x0a#ifdef\x20USE_DISPLACEMENTMAP\x0a\x0a\x09uniform\x20sampler2D\x20displacementMap;\x0a\x09uniform\x20float\x20displacementScale;\x0a\x09uniform\x20float\x20displacementBias;\x0a\x0a#endif\x0a',
            'displacementmap_vertex': '\x0a#ifdef\x20USE_DISPLACEMENTMAP\x0a\x0a\x09transformed\x20+=\x20normalize(\x20objectNormal\x20)\x20*\x20(\x20texture2D(\x20displacementMap,\x20vDisplacementMapUv\x20).x\x20*\x20displacementScale\x20+\x20displacementBias\x20);\x0a\x0a#endif\x0a',
            'emissivemap_fragment': '\x0a#ifdef\x20USE_EMISSIVEMAP\x0a\x0a\x09vec4\x20emissiveColor\x20=\x20texture2D(\x20emissiveMap,\x20vEmissiveMapUv\x20);\x0a\x0a\x09totalEmissiveRadiance\x20*=\x20emissiveColor.rgb;\x0a\x0a#endif\x0a',
            'emissivemap_pars_fragment': '\x0a#ifdef\x20USE_EMISSIVEMAP\x0a\x0a\x09uniform\x20sampler2D\x20emissiveMap;\x0a\x0a#endif\x0a',
            'colorspace_fragment': '\x0agl_FragColor\x20=\x20linearToOutputTexel(\x20gl_FragColor\x20);\x0a',
            'colorspace_pars_fragment': '\x0a\x0a//\x20http://www.russellcottrell.com/photo/matrixCalculator.htm\x0a\x0a//\x20Linear\x20sRGB\x20=>\x20XYZ\x20=>\x20Linear\x20Display\x20P3\x0aconst\x20mat3\x20LINEAR_SRGB_TO_LINEAR_DISPLAY_P3\x20=\x20mat3(\x0a\x09vec3(\x200.8224621,\x200.177538,\x200.0\x20),\x0a\x09vec3(\x200.0331941,\x200.9668058,\x200.0\x20),\x0a\x09vec3(\x200.0170827,\x200.0723974,\x200.9105199\x20)\x0a);\x0a\x0a//\x20Linear\x20Display\x20P3\x20=>\x20XYZ\x20=>\x20Linear\x20sRGB\x0aconst\x20mat3\x20LINEAR_DISPLAY_P3_TO_LINEAR_SRGB\x20=\x20mat3(\x0a\x09vec3(\x201.2249401,\x20-\x200.2249404,\x200.0\x20),\x0a\x09vec3(\x20-\x200.0420569,\x201.0420571,\x200.0\x20),\x0a\x09vec3(\x20-\x200.0196376,\x20-\x200.0786361,\x201.0982735\x20)\x0a);\x0a\x0avec4\x20LinearSRGBToLinearDisplayP3(\x20in\x20vec4\x20value\x20)\x20{\x0a\x09return\x20vec4(\x20value.rgb\x20*\x20LINEAR_SRGB_TO_LINEAR_DISPLAY_P3,\x20value.a\x20);\x0a}\x0a\x0avec4\x20LinearDisplayP3ToLinearSRGB(\x20in\x20vec4\x20value\x20)\x20{\x0a\x09return\x20vec4(\x20value.rgb\x20*\x20LINEAR_DISPLAY_P3_TO_LINEAR_SRGB,\x20value.a\x20);\x0a}\x0a\x0avec4\x20LinearTransferOETF(\x20in\x20vec4\x20value\x20)\x20{\x0a\x09return\x20value;\x0a}\x0a\x0avec4\x20sRGBTransferOETF(\x20in\x20vec4\x20value\x20)\x20{\x0a\x09return\x20vec4(\x20mix(\x20pow(\x20value.rgb,\x20vec3(\x200.41666\x20)\x20)\x20*\x201.055\x20-\x20vec3(\x200.055\x20),\x20value.rgb\x20*\x2012.92,\x20vec3(\x20lessThanEqual(\x20value.rgb,\x20vec3(\x200.0031308\x20)\x20)\x20)\x20),\x20value.a\x20);\x0a}\x0a\x0a//\x20@deprecated,\x20r156\x0avec4\x20LinearToLinear(\x20in\x20vec4\x20value\x20)\x20{\x0a\x09return\x20value;\x0a}\x0a\x0a//\x20@deprecated,\x20r156\x0avec4\x20LinearTosRGB(\x20in\x20vec4\x20value\x20)\x20{\x0a\x09return\x20sRGBTransferOETF(\x20value\x20);\x0a}\x0a',
            'envmap_fragment': '\x0a#ifdef\x20USE_ENVMAP\x0a\x0a\x09#ifdef\x20ENV_WORLDPOS\x0a\x0a\x09\x09vec3\x20cameraToFrag;\x0a\x0a\x09\x09if\x20(\x20isOrthographic\x20)\x20{\x0a\x0a\x09\x09\x09cameraToFrag\x20=\x20normalize(\x20vec3(\x20-\x20viewMatrix[\x200\x20][\x202\x20],\x20-\x20viewMatrix[\x201\x20][\x202\x20],\x20-\x20viewMatrix[\x202\x20][\x202\x20]\x20)\x20);\x0a\x0a\x09\x09}\x20else\x20{\x0a\x0a\x09\x09\x09cameraToFrag\x20=\x20normalize(\x20vWorldPosition\x20-\x20cameraPosition\x20);\x0a\x0a\x09\x09}\x0a\x0a\x09\x09//\x20Transforming\x20Normal\x20Vectors\x20with\x20the\x20Inverse\x20Transformation\x0a\x09\x09vec3\x20worldNormal\x20=\x20inverseTransformDirection(\x20normal,\x20viewMatrix\x20);\x0a\x0a\x09\x09#ifdef\x20ENVMAP_MODE_REFLECTION\x0a\x0a\x09\x09\x09vec3\x20reflectVec\x20=\x20reflect(\x20cameraToFrag,\x20worldNormal\x20);\x0a\x0a\x09\x09#else\x0a\x0a\x09\x09\x09vec3\x20reflectVec\x20=\x20refract(\x20cameraToFrag,\x20worldNormal,\x20refractionRatio\x20);\x0a\x0a\x09\x09#endif\x0a\x0a\x09#else\x0a\x0a\x09\x09vec3\x20reflectVec\x20=\x20vReflect;\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20ENVMAP_TYPE_CUBE\x0a\x0a\x09\x09vec4\x20envColor\x20=\x20textureCube(\x20envMap,\x20vec3(\x20flipEnvMap\x20*\x20reflectVec.x,\x20reflectVec.yz\x20)\x20);\x0a\x0a\x09#else\x0a\x0a\x09\x09vec4\x20envColor\x20=\x20vec4(\x200.0\x20);\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20ENVMAP_BLENDING_MULTIPLY\x0a\x0a\x09\x09outgoingLight\x20=\x20mix(\x20outgoingLight,\x20outgoingLight\x20*\x20envColor.xyz,\x20specularStrength\x20*\x20reflectivity\x20);\x0a\x0a\x09#elif\x20defined(\x20ENVMAP_BLENDING_MIX\x20)\x0a\x0a\x09\x09outgoingLight\x20=\x20mix(\x20outgoingLight,\x20envColor.xyz,\x20specularStrength\x20*\x20reflectivity\x20);\x0a\x0a\x09#elif\x20defined(\x20ENVMAP_BLENDING_ADD\x20)\x0a\x0a\x09\x09outgoingLight\x20+=\x20envColor.xyz\x20*\x20specularStrength\x20*\x20reflectivity;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'envmap_common_pars_fragment': '\x0a#ifdef\x20USE_ENVMAP\x0a\x0a\x09uniform\x20float\x20envMapIntensity;\x0a\x09uniform\x20float\x20flipEnvMap;\x0a\x0a\x09#ifdef\x20ENVMAP_TYPE_CUBE\x0a\x09\x09uniform\x20samplerCube\x20envMap;\x0a\x09#else\x0a\x09\x09uniform\x20sampler2D\x20envMap;\x0a\x09#endif\x0a\x09\x0a#endif\x0a',
            'envmap_pars_fragment': '\x0a#ifdef\x20USE_ENVMAP\x0a\x0a\x09uniform\x20float\x20reflectivity;\x0a\x0a\x09#if\x20defined(\x20USE_BUMPMAP\x20)\x20||\x20defined(\x20USE_NORMALMAP\x20)\x20||\x20defined(\x20PHONG\x20)\x20||\x20defined(\x20LAMBERT\x20)\x0a\x0a\x09\x09#define\x20ENV_WORLDPOS\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20ENV_WORLDPOS\x0a\x0a\x09\x09varying\x20vec3\x20vWorldPosition;\x0a\x09\x09uniform\x20float\x20refractionRatio;\x0a\x09#else\x0a\x09\x09varying\x20vec3\x20vReflect;\x0a\x09#endif\x0a\x0a#endif\x0a',
            'envmap_pars_vertex': '\x0a#ifdef\x20USE_ENVMAP\x0a\x0a\x09#if\x20defined(\x20USE_BUMPMAP\x20)\x20||\x20defined(\x20USE_NORMALMAP\x20)\x20||\x20defined(\x20PHONG\x20)\x20||\x20defined(\x20LAMBERT\x20)\x0a\x0a\x09\x09#define\x20ENV_WORLDPOS\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20ENV_WORLDPOS\x0a\x09\x09\x0a\x09\x09varying\x20vec3\x20vWorldPosition;\x0a\x0a\x09#else\x0a\x0a\x09\x09varying\x20vec3\x20vReflect;\x0a\x09\x09uniform\x20float\x20refractionRatio;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'envmap_physical_pars_fragment': '\x0a#ifdef\x20USE_ENVMAP\x0a\x0a\x09vec3\x20getIBLIrradiance(\x20const\x20in\x20vec3\x20normal\x20)\x20{\x0a\x0a\x09\x09#ifdef\x20ENVMAP_TYPE_CUBE_UV\x0a\x0a\x09\x09\x09vec3\x20worldNormal\x20=\x20inverseTransformDirection(\x20normal,\x20viewMatrix\x20);\x0a\x0a\x09\x09\x09vec4\x20envMapColor\x20=\x20textureCubeUV(\x20envMap,\x20worldNormal,\x201.0\x20);\x0a\x0a\x09\x09\x09return\x20PI\x20*\x20envMapColor.rgb\x20*\x20envMapIntensity;\x0a\x0a\x09\x09#else\x0a\x0a\x09\x09\x09return\x20vec3(\x200.0\x20);\x0a\x0a\x09\x09#endif\x0a\x0a\x09}\x0a\x0a\x09vec3\x20getIBLRadiance(\x20const\x20in\x20vec3\x20viewDir,\x20const\x20in\x20vec3\x20normal,\x20const\x20in\x20float\x20roughness\x20)\x20{\x0a\x0a\x09\x09#ifdef\x20ENVMAP_TYPE_CUBE_UV\x0a\x0a\x09\x09\x09vec3\x20reflectVec\x20=\x20reflect(\x20-\x20viewDir,\x20normal\x20);\x0a\x0a\x09\x09\x09//\x20Mixing\x20the\x20reflection\x20with\x20the\x20normal\x20is\x20more\x20accurate\x20and\x20keeps\x20rough\x20objects\x20from\x20gathering\x20light\x20from\x20behind\x20their\x20tangent\x20plane.\x0a\x09\x09\x09reflectVec\x20=\x20normalize(\x20mix(\x20reflectVec,\x20normal,\x20roughness\x20*\x20roughness)\x20);\x0a\x0a\x09\x09\x09reflectVec\x20=\x20inverseTransformDirection(\x20reflectVec,\x20viewMatrix\x20);\x0a\x0a\x09\x09\x09vec4\x20envMapColor\x20=\x20textureCubeUV(\x20envMap,\x20reflectVec,\x20roughness\x20);\x0a\x0a\x09\x09\x09return\x20envMapColor.rgb\x20*\x20envMapIntensity;\x0a\x0a\x09\x09#else\x0a\x0a\x09\x09\x09return\x20vec3(\x200.0\x20);\x0a\x0a\x09\x09#endif\x0a\x0a\x09}\x0a\x0a\x09#ifdef\x20USE_ANISOTROPY\x0a\x0a\x09\x09vec3\x20getIBLAnisotropyRadiance(\x20const\x20in\x20vec3\x20viewDir,\x20const\x20in\x20vec3\x20normal,\x20const\x20in\x20float\x20roughness,\x20const\x20in\x20vec3\x20bitangent,\x20const\x20in\x20float\x20anisotropy\x20)\x20{\x0a\x0a\x09\x09\x09#ifdef\x20ENVMAP_TYPE_CUBE_UV\x0a\x0a\x09\x09\x09\x20\x20//\x20https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy\x0a\x09\x09\x09\x09vec3\x20bentNormal\x20=\x20cross(\x20bitangent,\x20viewDir\x20);\x0a\x09\x09\x09\x09bentNormal\x20=\x20normalize(\x20cross(\x20bentNormal,\x20bitangent\x20)\x20);\x0a\x09\x09\x09\x09bentNormal\x20=\x20normalize(\x20mix(\x20bentNormal,\x20normal,\x20pow2(\x20pow2(\x201.0\x20-\x20anisotropy\x20*\x20(\x201.0\x20-\x20roughness\x20)\x20)\x20)\x20)\x20);\x0a\x0a\x09\x09\x09\x09return\x20getIBLRadiance(\x20viewDir,\x20bentNormal,\x20roughness\x20);\x0a\x0a\x09\x09\x09#else\x0a\x0a\x09\x09\x09\x09return\x20vec3(\x200.0\x20);\x0a\x0a\x09\x09\x09#endif\x0a\x0a\x09\x09}\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'envmap_vertex': '\x0a#ifdef\x20USE_ENVMAP\x0a\x0a\x09#ifdef\x20ENV_WORLDPOS\x0a\x0a\x09\x09vWorldPosition\x20=\x20worldPosition.xyz;\x0a\x0a\x09#else\x0a\x0a\x09\x09vec3\x20cameraToVertex;\x0a\x0a\x09\x09if\x20(\x20isOrthographic\x20)\x20{\x0a\x0a\x09\x09\x09cameraToVertex\x20=\x20normalize(\x20vec3(\x20-\x20viewMatrix[\x200\x20][\x202\x20],\x20-\x20viewMatrix[\x201\x20][\x202\x20],\x20-\x20viewMatrix[\x202\x20][\x202\x20]\x20)\x20);\x0a\x0a\x09\x09}\x20else\x20{\x0a\x0a\x09\x09\x09cameraToVertex\x20=\x20normalize(\x20worldPosition.xyz\x20-\x20cameraPosition\x20);\x0a\x0a\x09\x09}\x0a\x0a\x09\x09vec3\x20worldNormal\x20=\x20inverseTransformDirection(\x20transformedNormal,\x20viewMatrix\x20);\x0a\x0a\x09\x09#ifdef\x20ENVMAP_MODE_REFLECTION\x0a\x0a\x09\x09\x09vReflect\x20=\x20reflect(\x20cameraToVertex,\x20worldNormal\x20);\x0a\x0a\x09\x09#else\x0a\x0a\x09\x09\x09vReflect\x20=\x20refract(\x20cameraToVertex,\x20worldNormal,\x20refractionRatio\x20);\x0a\x0a\x09\x09#endif\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'fog_vertex': '\x0a#ifdef\x20USE_FOG\x0a\x0a\x09//\x20vFogDepth\x20=\x20-\x20mvPosition.z;\x0a\x0a\x09//\x20distance\x20to\x20camera\x0a\x09vFogDepth\x20=\x20length(mvPosition.xyz);\x0a\x0a#endif\x0a',
            'fog_pars_vertex': '\x0a#ifdef\x20USE_FOG\x0a\x0a\x09varying\x20float\x20vFogDepth;\x0a\x0a#endif\x0a',
            'fog_fragment': '\x0a#ifdef\x20USE_FOG\x0a\x0a\x09#ifdef\x20FOG_EXP2\x0a\x0a\x09\x09float\x20fogFactor\x20=\x201.0\x20-\x20exp(\x20-\x20fogDensity\x20*\x20fogDensity\x20*\x20vFogDepth\x20*\x20vFogDepth\x20);\x0a\x0a\x09#else\x0a\x0a\x09\x09float\x20fogFactor\x20=\x20smoothstep(\x20fogNear,\x20fogFar,\x20vFogDepth\x20);\x0a\x0a\x09#endif\x0a\x0a\x09gl_FragColor.rgb\x20=\x20mix(\x20gl_FragColor.rgb,\x20fogColor,\x20fogFactor\x20);\x0a\x0a#endif\x0a',
            'fog_pars_fragment': '\x0a#ifdef\x20USE_FOG\x0a\x0a\x09uniform\x20vec3\x20fogColor;\x0a\x09varying\x20float\x20vFogDepth;\x0a\x0a\x09#ifdef\x20FOG_EXP2\x0a\x0a\x09\x09uniform\x20float\x20fogDensity;\x0a\x0a\x09#else\x0a\x0a\x09\x09uniform\x20float\x20fogNear;\x0a\x09\x09uniform\x20float\x20fogFar;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'gradientmap_pars_fragment': '\x0a\x0a#ifdef\x20USE_GRADIENTMAP\x0a\x0a\x09uniform\x20sampler2D\x20gradientMap;\x0a\x0a#endif\x0a\x0avec3\x20getGradientIrradiance(\x20vec3\x20normal,\x20vec3\x20lightDirection\x20)\x20{\x0a\x0a\x09//\x20dotNL\x20will\x20be\x20from\x20-1.0\x20to\x201.0\x0a\x09float\x20dotNL\x20=\x20dot(\x20normal,\x20lightDirection\x20);\x0a\x09vec2\x20coord\x20=\x20vec2(\x20dotNL\x20*\x200.5\x20+\x200.5,\x200.0\x20);\x0a\x0a\x09#ifdef\x20USE_GRADIENTMAP\x0a\x0a\x09\x09return\x20vec3(\x20texture2D(\x20gradientMap,\x20coord\x20).r\x20);\x0a\x0a\x09#else\x0a\x0a\x09\x09vec2\x20fw\x20=\x20fwidth(\x20coord\x20)\x20*\x200.5;\x0a\x09\x09return\x20mix(\x20vec3(\x200.7\x20),\x20vec3(\x201.0\x20),\x20smoothstep(\x200.7\x20-\x20fw.x,\x200.7\x20+\x20fw.x,\x20coord.x\x20)\x20);\x0a\x0a\x09#endif\x0a\x0a}\x0a',
            'lightmap_fragment': '\x0a#ifdef\x20USE_LIGHTMAP\x0a\x0a\x09vec4\x20lightMapTexel\x20=\x20texture2D(\x20lightMap,\x20vLightMapUv\x20);\x0a\x09vec3\x20lightMapIrradiance\x20=\x20lightMapTexel.rgb\x20*\x20lightMapIntensity;\x0a\x0a\x09reflectedLight.indirectDiffuse\x20+=\x20lightMapIrradiance;\x0a\x0a#endif\x0a',
            'lightmap_pars_fragment': '\x0a#ifdef\x20USE_LIGHTMAP\x0a\x0a\x09uniform\x20sampler2D\x20lightMap;\x0a\x09uniform\x20float\x20lightMapIntensity;\x0a\x0a#endif\x0a',
            'lights_lambert_fragment': '\x0aLambertMaterial\x20material;\x0amaterial.diffuseColor\x20=\x20diffuseColor.rgb;\x0amaterial.specularStrength\x20=\x20specularStrength;\x0a',
            'lights_lambert_pars_fragment': '\x0avarying\x20vec3\x20vViewPosition;\x0a\x0astruct\x20LambertMaterial\x20{\x0a\x0a\x09vec3\x20diffuseColor;\x0a\x09float\x20specularStrength;\x0a\x0a};\x0a\x0avoid\x20RE_Direct_Lambert(\x20const\x20in\x20IncidentLight\x20directLight,\x20const\x20in\x20vec3\x20geometryPosition,\x20const\x20in\x20vec3\x20geometryNormal,\x20const\x20in\x20vec3\x20geometryViewDir,\x20const\x20in\x20vec3\x20geometryClearcoatNormal,\x20const\x20in\x20LambertMaterial\x20material,\x20inout\x20ReflectedLight\x20reflectedLight\x20)\x20{\x0a\x0a\x09float\x20dotNL\x20=\x20saturate(\x20dot(\x20geometryNormal,\x20directLight.direction\x20)\x20);\x0a\x09vec3\x20irradiance\x20=\x20dotNL\x20*\x20directLight.color;\x0a\x0a\x09reflectedLight.directDiffuse\x20+=\x20irradiance\x20*\x20BRDF_Lambert(\x20material.diffuseColor\x20);\x0a\x0a}\x0a\x0avoid\x20RE_IndirectDiffuse_Lambert(\x20const\x20in\x20vec3\x20irradiance,\x20const\x20in\x20vec3\x20geometryPosition,\x20const\x20in\x20vec3\x20geometryNormal,\x20const\x20in\x20vec3\x20geometryViewDir,\x20const\x20in\x20vec3\x20geometryClearcoatNormal,\x20const\x20in\x20LambertMaterial\x20material,\x20inout\x20ReflectedLight\x20reflectedLight\x20)\x20{\x0a\x0a\x09reflectedLight.indirectDiffuse\x20+=\x20irradiance\x20*\x20BRDF_Lambert(\x20material.diffuseColor\x20);\x0a\x0a}\x0a\x0a#define\x20RE_Direct\x09\x09\x09\x09RE_Direct_Lambert\x0a#define\x20RE_IndirectDiffuse\x09\x09RE_IndirectDiffuse_Lambert\x0a',
            'lights_pars_begin': '\x0auniform\x20bool\x20receiveShadow;\x0auniform\x20vec3\x20ambientLightColor;\x0a\x0a#if\x20defined(\x20USE_LIGHT_PROBES\x20)\x0a\x0a\x09uniform\x20vec3\x20lightProbe[\x209\x20];\x0a\x0a#endif\x0a\x0a//\x20get\x20the\x20irradiance\x20(radiance\x20convolved\x20with\x20cosine\x20lobe)\x20at\x20the\x20point\x20\x27normal\x27\x20on\x20the\x20unit\x20sphere\x0a//\x20source:\x20https://graphics.stanford.edu/papers/envmap/envmap.pdf\x0avec3\x20shGetIrradianceAt(\x20in\x20vec3\x20normal,\x20in\x20vec3\x20shCoefficients[\x209\x20]\x20)\x20{\x0a\x0a\x09//\x20normal\x20is\x20assumed\x20to\x20have\x20unit\x20length\x0a\x0a\x09float\x20x\x20=\x20normal.x,\x20y\x20=\x20normal.y,\x20z\x20=\x20normal.z;\x0a\x0a\x09//\x20band\x200\x0a\x09vec3\x20result\x20=\x20shCoefficients[\x200\x20]\x20*\x200.886227;\x0a\x0a\x09//\x20band\x201\x0a\x09result\x20+=\x20shCoefficients[\x201\x20]\x20*\x202.0\x20*\x200.511664\x20*\x20y;\x0a\x09result\x20+=\x20shCoefficients[\x202\x20]\x20*\x202.0\x20*\x200.511664\x20*\x20z;\x0a\x09result\x20+=\x20shCoefficients[\x203\x20]\x20*\x202.0\x20*\x200.511664\x20*\x20x;\x0a\x0a\x09//\x20band\x202\x0a\x09result\x20+=\x20shCoefficients[\x204\x20]\x20*\x202.0\x20*\x200.429043\x20*\x20x\x20*\x20y;\x0a\x09result\x20+=\x20shCoefficients[\x205\x20]\x20*\x202.0\x20*\x200.429043\x20*\x20y\x20*\x20z;\x0a\x09result\x20+=\x20shCoefficients[\x206\x20]\x20*\x20(\x200.743125\x20*\x20z\x20*\x20z\x20-\x200.247708\x20);\x0a\x09result\x20+=\x20shCoefficients[\x207\x20]\x20*\x202.0\x20*\x200.429043\x20*\x20x\x20*\x20z;\x0a\x09result\x20+=\x20shCoefficients[\x208\x20]\x20*\x200.429043\x20*\x20(\x20x\x20*\x20x\x20-\x20y\x20*\x20y\x20);\x0a\x0a\x09return\x20result;\x0a\x0a}\x0a\x0avec3\x20getLightProbeIrradiance(\x20const\x20in\x20vec3\x20lightProbe[\x209\x20],\x20const\x20in\x20vec3\x20normal\x20)\x20{\x0a\x0a\x09vec3\x20worldNormal\x20=\x20inverseTransformDirection(\x20normal,\x20viewMatrix\x20);\x0a\x0a\x09vec3\x20irradiance\x20=\x20shGetIrradianceAt(\x20worldNormal,\x20lightProbe\x20);\x0a\x0a\x09return\x20irradiance;\x0a\x0a}\x0a\x0avec3\x20getAmbientLightIrradiance(\x20const\x20in\x20vec3\x20ambientLightColor\x20)\x20{\x0a\x0a\x09vec3\x20irradiance\x20=\x20ambientLightColor;\x0a\x0a\x09return\x20irradiance;\x0a\x0a}\x0a\x0afloat\x20getDistanceAttenuation(\x20const\x20in\x20float\x20lightDistance,\x20const\x20in\x20float\x20cutoffDistance,\x20const\x20in\x20float\x20decayExponent\x20)\x20{\x0a\x0a\x09#if\x20defined\x20(\x20LEGACY_LIGHTS\x20)\x0a\x0a\x09\x09if\x20(\x20cutoffDistance\x20>\x200.0\x20&&\x20decayExponent\x20>\x200.0\x20)\x20{\x0a\x0a\x09\x09\x09return\x20pow(\x20saturate(\x20-\x20lightDistance\x20/\x20cutoffDistance\x20+\x201.0\x20),\x20decayExponent\x20);\x0a\x0a\x09\x09}\x0a\x0a\x09\x09return\x201.0;\x0a\x0a\x09#else\x0a\x0a\x09\x09//\x20based\x20upon\x20Frostbite\x203\x20Moving\x20to\x20Physically-based\x20Rendering\x0a\x09\x09//\x20page\x2032,\x20equation\x2026:\x20E[window1]\x0a\x09\x09//\x20https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\x0a\x09\x09float\x20distanceFalloff\x20=\x201.0\x20/\x20max(\x20pow(\x20lightDistance,\x20decayExponent\x20),\x200.01\x20);\x0a\x0a\x09\x09if\x20(\x20cutoffDistance\x20>\x200.0\x20)\x20{\x0a\x0a\x09\x09\x09distanceFalloff\x20*=\x20pow2(\x20saturate(\x201.0\x20-\x20pow4(\x20lightDistance\x20/\x20cutoffDistance\x20)\x20)\x20);\x0a\x0a\x09\x09}\x0a\x0a\x09\x09return\x20distanceFalloff;\x0a\x0a\x09#endif\x0a\x0a}\x0a\x0afloat\x20getSpotAttenuation(\x20const\x20in\x20float\x20coneCosine,\x20const\x20in\x20float\x20penumbraCosine,\x20const\x20in\x20float\x20angleCosine\x20)\x20{\x0a\x0a\x09return\x20smoothstep(\x20coneCosine,\x20penumbraCosine,\x20angleCosine\x20);\x0a\x0a}\x0a\x0a#if\x20NUM_DIR_LIGHTS\x20>\x200\x0a\x0a\x09struct\x20DirectionalLight\x20{\x0a\x09\x09vec3\x20direction;\x0a\x09\x09vec3\x20color;\x0a\x09};\x0a\x0a\x09uniform\x20DirectionalLight\x20directionalLights[\x20NUM_DIR_LIGHTS\x20];\x0a\x0a\x09void\x20getDirectionalLightInfo(\x20const\x20in\x20DirectionalLight\x20directionalLight,\x20out\x20IncidentLight\x20light\x20)\x20{\x0a\x0a\x09\x09light.color\x20=\x20directionalLight.color;\x0a\x09\x09light.direction\x20=\x20directionalLight.direction;\x0a\x09\x09light.visible\x20=\x20true;\x0a\x0a\x09}\x0a\x0a#endif\x0a\x0a\x0a#if\x20NUM_POINT_LIGHTS\x20>\x200\x0a\x0a\x09struct\x20PointLight\x20{\x0a\x09\x09vec3\x20position;\x0a\x09\x09vec3\x20color;\x0a\x09\x09float\x20distance;\x0a\x09\x09float\x20decay;\x0a\x09};\x0a\x0a\x09uniform\x20PointLight\x20pointLights[\x20NUM_POINT_LIGHTS\x20];\x0a\x0a\x09//\x20light\x20is\x20an\x20out\x20parameter\x20as\x20having\x20it\x20as\x20a\x20return\x20value\x20caused\x20compiler\x20errors\x20on\x20some\x20devices\x0a\x09void\x20getPointLightInfo(\x20const\x20in\x20PointLight\x20pointLight,\x20const\x20in\x20vec3\x20geometryPosition,\x20out\x20IncidentLight\x20light\x20)\x20{\x0a\x0a\x09\x09vec3\x20lVector\x20=\x20pointLight.position\x20-\x20geometryPosition;\x0a\x0a\x09\x09light.direction\x20=\x20normalize(\x20lVector\x20);\x0a\x0a\x09\x09float\x20lightDistance\x20=\x20length(\x20lVector\x20);\x0a\x0a\x09\x09light.color\x20=\x20pointLight.color;\x0a\x09\x09light.color\x20*=\x20getDistanceAttenuation(\x20lightDistance,\x20pointLight.distance,\x20pointLight.decay\x20);\x0a\x09\x09light.visible\x20=\x20(\x20light.color\x20!=\x20vec3(\x200.0\x20)\x20);\x0a\x0a\x09}\x0a\x0a#endif\x0a\x0a\x0a#if\x20NUM_SPOT_LIGHTS\x20>\x200\x0a\x0a\x09struct\x20SpotLight\x20{\x0a\x09\x09vec3\x20position;\x0a\x09\x09vec3\x20direction;\x0a\x09\x09vec3\x20color;\x0a\x09\x09float\x20distance;\x0a\x09\x09float\x20decay;\x0a\x09\x09float\x20coneCos;\x0a\x09\x09float\x20penumbraCos;\x0a\x09};\x0a\x0a\x09uniform\x20SpotLight\x20spotLights[\x20NUM_SPOT_LIGHTS\x20];\x0a\x0a\x09//\x20light\x20is\x20an\x20out\x20parameter\x20as\x20having\x20it\x20as\x20a\x20return\x20value\x20caused\x20compiler\x20errors\x20on\x20some\x20devices\x0a\x09void\x20getSpotLightInfo(\x20const\x20in\x20SpotLight\x20spotLight,\x20const\x20in\x20vec3\x20geometryPosition,\x20out\x20IncidentLight\x20light\x20)\x20{\x0a\x0a\x09\x09vec3\x20lVector\x20=\x20spotLight.position\x20-\x20geometryPosition;\x0a\x0a\x09\x09light.direction\x20=\x20normalize(\x20lVector\x20);\x0a\x0a\x09\x09float\x20angleCos\x20=\x20dot(\x20light.direction,\x20spotLight.direction\x20);\x0a\x0a\x09\x09float\x20spotAttenuation\x20=\x20getSpotAttenuation(\x20spotLight.coneCos,\x20spotLight.penumbraCos,\x20angleCos\x20);\x0a\x0a\x09\x09if\x20(\x20spotAttenuation\x20>\x200.0\x20)\x20{\x0a\x0a\x09\x09\x09float\x20lightDistance\x20=\x20length(\x20lVector\x20);\x0a\x0a\x09\x09\x09light.color\x20=\x20spotLight.color\x20*\x20spotAttenuation;\x0a\x09\x09\x09light.color\x20*=\x20getDistanceAttenuation(\x20lightDistance,\x20spotLight.distance,\x20spotLight.decay\x20);\x0a\x09\x09\x09light.visible\x20=\x20(\x20light.color\x20!=\x20vec3(\x200.0\x20)\x20);\x0a\x0a\x09\x09}\x20else\x20{\x0a\x0a\x09\x09\x09light.color\x20=\x20vec3(\x200.0\x20);\x0a\x09\x09\x09light.visible\x20=\x20false;\x0a\x0a\x09\x09}\x0a\x0a\x09}\x0a\x0a#endif\x0a\x0a\x0a#if\x20NUM_RECT_AREA_LIGHTS\x20>\x200\x0a\x0a\x09struct\x20RectAreaLight\x20{\x0a\x09\x09vec3\x20color;\x0a\x09\x09vec3\x20position;\x0a\x09\x09vec3\x20halfWidth;\x0a\x09\x09vec3\x20halfHeight;\x0a\x09};\x0a\x0a\x09//\x20Pre-computed\x20values\x20of\x20LinearTransformedCosine\x20approximation\x20of\x20BRDF\x0a\x09//\x20BRDF\x20approximation\x20Texture\x20is\x2064x64\x0a\x09uniform\x20sampler2D\x20ltc_1;\x20//\x20RGBA\x20Float\x0a\x09uniform\x20sampler2D\x20ltc_2;\x20//\x20RGBA\x20Float\x0a\x0a\x09uniform\x20RectAreaLight\x20rectAreaLights[\x20NUM_RECT_AREA_LIGHTS\x20];\x0a\x0a#endif\x0a\x0a\x0a#if\x20NUM_HEMI_LIGHTS\x20>\x200\x0a\x0a\x09struct\x20HemisphereLight\x20{\x0a\x09\x09vec3\x20direction;\x0a\x09\x09vec3\x20skyColor;\x0a\x09\x09vec3\x20groundColor;\x0a\x09};\x0a\x0a\x09uniform\x20HemisphereLight\x20hemisphereLights[\x20NUM_HEMI_LIGHTS\x20];\x0a\x0a\x09vec3\x20getHemisphereLightIrradiance(\x20const\x20in\x20HemisphereLight\x20hemiLight,\x20const\x20in\x20vec3\x20normal\x20)\x20{\x0a\x0a\x09\x09float\x20dotNL\x20=\x20dot(\x20normal,\x20hemiLight.direction\x20);\x0a\x09\x09float\x20hemiDiffuseWeight\x20=\x200.5\x20*\x20dotNL\x20+\x200.5;\x0a\x0a\x09\x09vec3\x20irradiance\x20=\x20mix(\x20hemiLight.groundColor,\x20hemiLight.skyColor,\x20hemiDiffuseWeight\x20);\x0a\x0a\x09\x09return\x20irradiance;\x0a\x0a\x09}\x0a\x0a#endif\x0a',
            'lights_toon_fragment': '\x0aToonMaterial\x20material;\x0amaterial.diffuseColor\x20=\x20diffuseColor.rgb;\x0a',
            'lights_toon_pars_fragment': '\x0avarying\x20vec3\x20vViewPosition;\x0a\x0astruct\x20ToonMaterial\x20{\x0a\x0a\x09vec3\x20diffuseColor;\x0a\x0a};\x0a\x0avoid\x20RE_Direct_Toon(\x20const\x20in\x20IncidentLight\x20directLight,\x20const\x20in\x20vec3\x20geometryPosition,\x20const\x20in\x20vec3\x20geometryNormal,\x20const\x20in\x20vec3\x20geometryViewDir,\x20const\x20in\x20vec3\x20geometryClearcoatNormal,\x20const\x20in\x20ToonMaterial\x20material,\x20inout\x20ReflectedLight\x20reflectedLight\x20)\x20{\x0a\x0a\x09vec3\x20irradiance\x20=\x20getGradientIrradiance(\x20geometryNormal,\x20directLight.direction\x20)\x20*\x20directLight.color;\x0a\x0a\x09reflectedLight.directDiffuse\x20+=\x20irradiance\x20*\x20BRDF_Lambert(\x20material.diffuseColor\x20);\x0a\x0a}\x0a\x0avoid\x20RE_IndirectDiffuse_Toon(\x20const\x20in\x20vec3\x20irradiance,\x20const\x20in\x20vec3\x20geometryPosition,\x20const\x20in\x20vec3\x20geometryNormal,\x20const\x20in\x20vec3\x20geometryViewDir,\x20const\x20in\x20vec3\x20geometryClearcoatNormal,\x20const\x20in\x20ToonMaterial\x20material,\x20inout\x20ReflectedLight\x20reflectedLight\x20)\x20{\x0a\x0a\x09reflectedLight.indirectDiffuse\x20+=\x20irradiance\x20*\x20BRDF_Lambert(\x20material.diffuseColor\x20);\x0a\x0a}\x0a\x0a#define\x20RE_Direct\x09\x09\x09\x09RE_Direct_Toon\x0a#define\x20RE_IndirectDiffuse\x09\x09RE_IndirectDiffuse_Toon\x0a',
            'lights_phong_fragment': '\x0aBlinnPhongMaterial\x20material;\x0amaterial.diffuseColor\x20=\x20diffuseColor.rgb;\x0amaterial.specularColor\x20=\x20specular;\x0amaterial.specularShininess\x20=\x20shininess;\x0amaterial.specularStrength\x20=\x20specularStrength;\x0a',
            'lights_phong_pars_fragment': '\x0avarying\x20vec3\x20vViewPosition;\x0a\x0astruct\x20BlinnPhongMaterial\x20{\x0a\x0a\x09vec3\x20diffuseColor;\x0a\x09vec3\x20specularColor;\x0a\x09float\x20specularShininess;\x0a\x09float\x20specularStrength;\x0a\x0a};\x0a\x0avoid\x20RE_Direct_BlinnPhong(\x20const\x20in\x20IncidentLight\x20directLight,\x20const\x20in\x20vec3\x20geometryPosition,\x20const\x20in\x20vec3\x20geometryNormal,\x20const\x20in\x20vec3\x20geometryViewDir,\x20const\x20in\x20vec3\x20geometryClearcoatNormal,\x20const\x20in\x20BlinnPhongMaterial\x20material,\x20inout\x20ReflectedLight\x20reflectedLight\x20)\x20{\x0a\x0a\x09float\x20dotNL\x20=\x20saturate(\x20dot(\x20geometryNormal,\x20directLight.direction\x20)\x20);\x0a\x09vec3\x20irradiance\x20=\x20dotNL\x20*\x20directLight.color;\x0a\x0a\x09reflectedLight.directDiffuse\x20+=\x20irradiance\x20*\x20BRDF_Lambert(\x20material.diffuseColor\x20);\x0a\x0a\x09reflectedLight.directSpecular\x20+=\x20irradiance\x20*\x20BRDF_BlinnPhong(\x20directLight.direction,\x20geometryViewDir,\x20geometryNormal,\x20material.specularColor,\x20material.specularShininess\x20)\x20*\x20material.specularStrength;\x0a\x0a}\x0a\x0avoid\x20RE_IndirectDiffuse_BlinnPhong(\x20const\x20in\x20vec3\x20irradiance,\x20const\x20in\x20vec3\x20geometryPosition,\x20const\x20in\x20vec3\x20geometryNormal,\x20const\x20in\x20vec3\x20geometryViewDir,\x20const\x20in\x20vec3\x20geometryClearcoatNormal,\x20const\x20in\x20BlinnPhongMaterial\x20material,\x20inout\x20ReflectedLight\x20reflectedLight\x20)\x20{\x0a\x0a\x09reflectedLight.indirectDiffuse\x20+=\x20irradiance\x20*\x20BRDF_Lambert(\x20material.diffuseColor\x20);\x0a\x0a}\x0a\x0a#define\x20RE_Direct\x09\x09\x09\x09RE_Direct_BlinnPhong\x0a#define\x20RE_IndirectDiffuse\x09\x09RE_IndirectDiffuse_BlinnPhong\x0a',
            'lights_physical_fragment': '\x0aPhysicalMaterial\x20material;\x0amaterial.diffuseColor\x20=\x20diffuseColor.rgb\x20*\x20(\x201.0\x20-\x20metalnessFactor\x20);\x0a\x0avec3\x20dxy\x20=\x20max(\x20abs(\x20dFdx(\x20nonPerturbedNormal\x20)\x20),\x20abs(\x20dFdy(\x20nonPerturbedNormal\x20)\x20)\x20);\x0afloat\x20geometryRoughness\x20=\x20max(\x20max(\x20dxy.x,\x20dxy.y\x20),\x20dxy.z\x20);\x0a\x0amaterial.roughness\x20=\x20max(\x20roughnessFactor,\x200.0525\x20);//\x200.0525\x20corresponds\x20to\x20the\x20base\x20mip\x20of\x20a\x20256\x20cubemap.\x0amaterial.roughness\x20+=\x20geometryRoughness;\x0amaterial.roughness\x20=\x20min(\x20material.roughness,\x201.0\x20);\x0a\x0a#ifdef\x20IOR\x0a\x0a\x09material.ior\x20=\x20ior;\x0a\x0a\x09#ifdef\x20USE_SPECULAR\x0a\x0a\x09\x09float\x20specularIntensityFactor\x20=\x20specularIntensity;\x0a\x09\x09vec3\x20specularColorFactor\x20=\x20specularColor;\x0a\x0a\x09\x09#ifdef\x20USE_SPECULAR_COLORMAP\x0a\x0a\x09\x09\x09specularColorFactor\x20*=\x20texture2D(\x20specularColorMap,\x20vSpecularColorMapUv\x20).rgb;\x0a\x0a\x09\x09#endif\x0a\x0a\x09\x09#ifdef\x20USE_SPECULAR_INTENSITYMAP\x0a\x0a\x09\x09\x09specularIntensityFactor\x20*=\x20texture2D(\x20specularIntensityMap,\x20vSpecularIntensityMapUv\x20).a;\x0a\x0a\x09\x09#endif\x0a\x0a\x09\x09material.specularF90\x20=\x20mix(\x20specularIntensityFactor,\x201.0,\x20metalnessFactor\x20);\x0a\x0a\x09#else\x0a\x0a\x09\x09float\x20specularIntensityFactor\x20=\x201.0;\x0a\x09\x09vec3\x20specularColorFactor\x20=\x20vec3(\x201.0\x20);\x0a\x09\x09material.specularF90\x20=\x201.0;\x0a\x0a\x09#endif\x0a\x0a\x09material.specularColor\x20=\x20mix(\x20min(\x20pow2(\x20(\x20material.ior\x20-\x201.0\x20)\x20/\x20(\x20material.ior\x20+\x201.0\x20)\x20)\x20*\x20specularColorFactor,\x20vec3(\x201.0\x20)\x20)\x20*\x20specularIntensityFactor,\x20diffuseColor.rgb,\x20metalnessFactor\x20);\x0a\x0a#else\x0a\x0a\x09material.specularColor\x20=\x20mix(\x20vec3(\x200.04\x20),\x20diffuseColor.rgb,\x20metalnessFactor\x20);\x0a\x09material.specularF90\x20=\x201.0;\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_CLEARCOAT\x0a\x0a\x09material.clearcoat\x20=\x20clearcoat;\x0a\x09material.clearcoatRoughness\x20=\x20clearcoatRoughness;\x0a\x09material.clearcoatF0\x20=\x20vec3(\x200.04\x20);\x0a\x09material.clearcoatF90\x20=\x201.0;\x0a\x0a\x09#ifdef\x20USE_CLEARCOATMAP\x0a\x0a\x09\x09material.clearcoat\x20*=\x20texture2D(\x20clearcoatMap,\x20vClearcoatMapUv\x20).x;\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_CLEARCOAT_ROUGHNESSMAP\x0a\x0a\x09\x09material.clearcoatRoughness\x20*=\x20texture2D(\x20clearcoatRoughnessMap,\x20vClearcoatRoughnessMapUv\x20).y;\x0a\x0a\x09#endif\x0a\x0a\x09material.clearcoat\x20=\x20saturate(\x20material.clearcoat\x20);\x20//\x20Burley\x20clearcoat\x20model\x0a\x09material.clearcoatRoughness\x20=\x20max(\x20material.clearcoatRoughness,\x200.0525\x20);\x0a\x09material.clearcoatRoughness\x20+=\x20geometryRoughness;\x0a\x09material.clearcoatRoughness\x20=\x20min(\x20material.clearcoatRoughness,\x201.0\x20);\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_IRIDESCENCE\x0a\x0a\x09material.iridescence\x20=\x20iridescence;\x0a\x09material.iridescenceIOR\x20=\x20iridescenceIOR;\x0a\x0a\x09#ifdef\x20USE_IRIDESCENCEMAP\x0a\x0a\x09\x09material.iridescence\x20*=\x20texture2D(\x20iridescenceMap,\x20vIridescenceMapUv\x20).r;\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_IRIDESCENCE_THICKNESSMAP\x0a\x0a\x09\x09material.iridescenceThickness\x20=\x20(iridescenceThicknessMaximum\x20-\x20iridescenceThicknessMinimum)\x20*\x20texture2D(\x20iridescenceThicknessMap,\x20vIridescenceThicknessMapUv\x20).g\x20+\x20iridescenceThicknessMinimum;\x0a\x0a\x09#else\x0a\x0a\x09\x09material.iridescenceThickness\x20=\x20iridescenceThicknessMaximum;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_SHEEN\x0a\x0a\x09material.sheenColor\x20=\x20sheenColor;\x0a\x0a\x09#ifdef\x20USE_SHEEN_COLORMAP\x0a\x0a\x09\x09material.sheenColor\x20*=\x20texture2D(\x20sheenColorMap,\x20vSheenColorMapUv\x20).rgb;\x0a\x0a\x09#endif\x0a\x0a\x09material.sheenRoughness\x20=\x20clamp(\x20sheenRoughness,\x200.07,\x201.0\x20);\x0a\x0a\x09#ifdef\x20USE_SHEEN_ROUGHNESSMAP\x0a\x0a\x09\x09material.sheenRoughness\x20*=\x20texture2D(\x20sheenRoughnessMap,\x20vSheenRoughnessMapUv\x20).a;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_ANISOTROPY\x0a\x0a\x09#ifdef\x20USE_ANISOTROPYMAP\x0a\x0a\x09\x09mat2\x20anisotropyMat\x20=\x20mat2(\x20anisotropyVector.x,\x20anisotropyVector.y,\x20-\x20anisotropyVector.y,\x20anisotropyVector.x\x20);\x0a\x09\x09vec3\x20anisotropyPolar\x20=\x20texture2D(\x20anisotropyMap,\x20vAnisotropyMapUv\x20).rgb;\x0a\x09\x09vec2\x20anisotropyV\x20=\x20anisotropyMat\x20*\x20normalize(\x202.0\x20*\x20anisotropyPolar.rg\x20-\x20vec2(\x201.0\x20)\x20)\x20*\x20anisotropyPolar.b;\x0a\x0a\x09#else\x0a\x0a\x09\x09vec2\x20anisotropyV\x20=\x20anisotropyVector;\x0a\x0a\x09#endif\x0a\x0a\x09material.anisotropy\x20=\x20length(\x20anisotropyV\x20);\x0a\x0a\x09if(\x20material.anisotropy\x20==\x200.0\x20)\x20{\x0a\x09\x09anisotropyV\x20=\x20vec2(\x201.0,\x200.0\x20);\x0a\x09}\x20else\x20{\x0a\x09\x09anisotropyV\x20/=\x20material.anisotropy;\x0a\x09\x09material.anisotropy\x20=\x20saturate(\x20material.anisotropy\x20);\x0a\x09}\x0a\x0a\x09//\x20Roughness\x20along\x20the\x20anisotropy\x20bitangent\x20is\x20the\x20material\x20roughness,\x20while\x20the\x20tangent\x20roughness\x20increases\x20with\x20anisotropy.\x0a\x09material.alphaT\x20=\x20mix(\x20pow2(\x20material.roughness\x20),\x201.0,\x20pow2(\x20material.anisotropy\x20)\x20);\x0a\x0a\x09material.anisotropyT\x20=\x20tbn[\x200\x20]\x20*\x20anisotropyV.x\x20+\x20tbn[\x201\x20]\x20*\x20anisotropyV.y;\x0a\x09material.anisotropyB\x20=\x20tbn[\x201\x20]\x20*\x20anisotropyV.x\x20-\x20tbn[\x200\x20]\x20*\x20anisotropyV.y;\x0a\x0a#endif\x0a',
            'lights_physical_pars_fragment': '\x0a\x0astruct\x20PhysicalMaterial\x20{\x0a\x0a\x09vec3\x20diffuseColor;\x0a\x09float\x20roughness;\x0a\x09vec3\x20specularColor;\x0a\x09float\x20specularF90;\x0a\x0a\x09#ifdef\x20USE_CLEARCOAT\x0a\x09\x09float\x20clearcoat;\x0a\x09\x09float\x20clearcoatRoughness;\x0a\x09\x09vec3\x20clearcoatF0;\x0a\x09\x09float\x20clearcoatF90;\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_IRIDESCENCE\x0a\x09\x09float\x20iridescence;\x0a\x09\x09float\x20iridescenceIOR;\x0a\x09\x09float\x20iridescenceThickness;\x0a\x09\x09vec3\x20iridescenceFresnel;\x0a\x09\x09vec3\x20iridescenceF0;\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_SHEEN\x0a\x09\x09vec3\x20sheenColor;\x0a\x09\x09float\x20sheenRoughness;\x0a\x09#endif\x0a\x0a\x09#ifdef\x20IOR\x0a\x09\x09float\x20ior;\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_TRANSMISSION\x0a\x09\x09float\x20transmission;\x0a\x09\x09float\x20transmissionAlpha;\x0a\x09\x09float\x20thickness;\x0a\x09\x09float\x20attenuationDistance;\x0a\x09\x09vec3\x20attenuationColor;\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_ANISOTROPY\x0a\x09\x09float\x20anisotropy;\x0a\x09\x09float\x20alphaT;\x0a\x09\x09vec3\x20anisotropyT;\x0a\x09\x09vec3\x20anisotropyB;\x0a\x09#endif\x0a\x0a};\x0a\x0a//\x20temporary\x0avec3\x20clearcoatSpecularDirect\x20=\x20vec3(\x200.0\x20);\x0avec3\x20clearcoatSpecularIndirect\x20=\x20vec3(\x200.0\x20);\x0avec3\x20sheenSpecularDirect\x20=\x20vec3(\x200.0\x20);\x0avec3\x20sheenSpecularIndirect\x20=\x20vec3(0.0\x20);\x0a\x0avec3\x20Schlick_to_F0(\x20const\x20in\x20vec3\x20f,\x20const\x20in\x20float\x20f90,\x20const\x20in\x20float\x20dotVH\x20)\x20{\x0a\x20\x20\x20\x20float\x20x\x20=\x20clamp(\x201.0\x20-\x20dotVH,\x200.0,\x201.0\x20);\x0a\x20\x20\x20\x20float\x20x2\x20=\x20x\x20*\x20x;\x0a\x20\x20\x20\x20float\x20x5\x20=\x20clamp(\x20x\x20*\x20x2\x20*\x20x2,\x200.0,\x200.9999\x20);\x0a\x0a\x20\x20\x20\x20return\x20(\x20f\x20-\x20vec3(\x20f90\x20)\x20*\x20x5\x20)\x20/\x20(\x201.0\x20-\x20x5\x20);\x0a}\x0a\x0a//\x20Moving\x20Frostbite\x20to\x20Physically\x20Based\x20Rendering\x203.0\x20-\x20page\x2012,\x20listing\x202\x0a//\x20https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\x0afloat\x20V_GGX_SmithCorrelated(\x20const\x20in\x20float\x20alpha,\x20const\x20in\x20float\x20dotNL,\x20const\x20in\x20float\x20dotNV\x20)\x20{\x0a\x0a\x09float\x20a2\x20=\x20pow2(\x20alpha\x20);\x0a\x0a\x09float\x20gv\x20=\x20dotNL\x20*\x20sqrt(\x20a2\x20+\x20(\x201.0\x20-\x20a2\x20)\x20*\x20pow2(\x20dotNV\x20)\x20);\x0a\x09float\x20gl\x20=\x20dotNV\x20*\x20sqrt(\x20a2\x20+\x20(\x201.0\x20-\x20a2\x20)\x20*\x20pow2(\x20dotNL\x20)\x20);\x0a\x0a\x09return\x200.5\x20/\x20max(\x20gv\x20+\x20gl,\x20EPSILON\x20);\x0a\x0a}\x0a\x0a//\x20Microfacet\x20Models\x20for\x20Refraction\x20through\x20Rough\x20Surfaces\x20-\x20equation\x20(33)\x0a//\x20http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\x0a//\x20alpha\x20is\x20\x22roughness\x20squared\x22\x20in\x20Disney’s\x20reparameterization\x0afloat\x20D_GGX(\x20const\x20in\x20float\x20alpha,\x20const\x20in\x20float\x20dotNH\x20)\x20{\x0a\x0a\x09float\x20a2\x20=\x20pow2(\x20alpha\x20);\x0a\x0a\x09float\x20denom\x20=\x20pow2(\x20dotNH\x20)\x20*\x20(\x20a2\x20-\x201.0\x20)\x20+\x201.0;\x20//\x20avoid\x20alpha\x20=\x200\x20with\x20dotNH\x20=\x201\x0a\x0a\x09return\x20RECIPROCAL_PI\x20*\x20a2\x20/\x20pow2(\x20denom\x20);\x0a\x0a}\x0a\x0a//\x20https://google.github.io/filament/Filament.md.html#materialsystem/anisotropicmodel/anisotropicspecularbrdf\x0a#ifdef\x20USE_ANISOTROPY\x0a\x0a\x09float\x20V_GGX_SmithCorrelated_Anisotropic(\x20const\x20in\x20float\x20alphaT,\x20const\x20in\x20float\x20alphaB,\x20const\x20in\x20float\x20dotTV,\x20const\x20in\x20float\x20dotBV,\x20const\x20in\x20float\x20dotTL,\x20const\x20in\x20float\x20dotBL,\x20const\x20in\x20float\x20dotNV,\x20const\x20in\x20float\x20dotNL\x20)\x20{\x0a\x0a\x09\x09float\x20gv\x20=\x20dotNL\x20*\x20length(\x20vec3(\x20alphaT\x20*\x20dotTV,\x20alphaB\x20*\x20dotBV,\x20dotNV\x20)\x20);\x0a\x09\x09float\x20gl\x20=\x20dotNV\x20*\x20length(\x20vec3(\x20alphaT\x20*\x20dotTL,\x20alphaB\x20*\x20dotBL,\x20dotNL\x20)\x20);\x0a\x09\x09float\x20v\x20=\x200.5\x20/\x20(\x20gv\x20+\x20gl\x20);\x0a\x0a\x09\x09return\x20saturate(v);\x0a\x0a\x09}\x0a\x0a\x09float\x20D_GGX_Anisotropic(\x20const\x20in\x20float\x20alphaT,\x20const\x20in\x20float\x20alphaB,\x20const\x20in\x20float\x20dotNH,\x20const\x20in\x20float\x20dotTH,\x20const\x20in\x20float\x20dotBH\x20)\x20{\x0a\x0a\x09\x09float\x20a2\x20=\x20alphaT\x20*\x20alphaB;\x0a\x09\x09highp\x20vec3\x20v\x20=\x20vec3(\x20alphaB\x20*\x20dotTH,\x20alphaT\x20*\x20dotBH,\x20a2\x20*\x20dotNH\x20);\x0a\x09\x09highp\x20float\x20v2\x20=\x20dot(\x20v,\x20v\x20);\x0a\x09\x09float\x20w2\x20=\x20a2\x20/\x20v2;\x0a\x0a\x09\x09return\x20RECIPROCAL_PI\x20*\x20a2\x20*\x20pow2\x20(\x20w2\x20);\x0a\x0a\x09}\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_CLEARCOAT\x0a\x0a\x09//\x20GGX\x20Distribution,\x20Schlick\x20Fresnel,\x20GGX_SmithCorrelated\x20Visibility\x0a\x09vec3\x20BRDF_GGX_Clearcoat(\x20const\x20in\x20vec3\x20lightDir,\x20const\x20in\x20vec3\x20viewDir,\x20const\x20in\x20vec3\x20normal,\x20const\x20in\x20PhysicalMaterial\x20material)\x20{\x0a\x0a\x09\x09vec3\x20f0\x20=\x20material.clearcoatF0;\x0a\x09\x09float\x20f90\x20=\x20material.clearcoatF90;\x0a\x09\x09float\x20roughness\x20=\x20material.clearcoatRoughness;\x0a\x0a\x09\x09float\x20alpha\x20=\x20pow2(\x20roughness\x20);\x20//\x20UE4\x27s\x20roughness\x0a\x0a\x09\x09vec3\x20halfDir\x20=\x20normalize(\x20lightDir\x20+\x20viewDir\x20);\x0a\x0a\x09\x09float\x20dotNL\x20=\x20saturate(\x20dot(\x20normal,\x20lightDir\x20)\x20);\x0a\x09\x09float\x20dotNV\x20=\x20saturate(\x20dot(\x20normal,\x20viewDir\x20)\x20);\x0a\x09\x09float\x20dotNH\x20=\x20saturate(\x20dot(\x20normal,\x20halfDir\x20)\x20);\x0a\x09\x09float\x20dotVH\x20=\x20saturate(\x20dot(\x20viewDir,\x20halfDir\x20)\x20);\x0a\x0a\x09\x09vec3\x20F\x20=\x20F_Schlick(\x20f0,\x20f90,\x20dotVH\x20);\x0a\x0a\x09\x09float\x20V\x20=\x20V_GGX_SmithCorrelated(\x20alpha,\x20dotNL,\x20dotNV\x20);\x0a\x0a\x09\x09float\x20D\x20=\x20D_GGX(\x20alpha,\x20dotNH\x20);\x0a\x0a\x09\x09return\x20F\x20*\x20(\x20V\x20*\x20D\x20);\x0a\x0a\x09}\x0a\x0a#endif\x0a\x0avec3\x20BRDF_GGX(\x20const\x20in\x20vec3\x20lightDir,\x20const\x20in\x20vec3\x20viewDir,\x20const\x20in\x20vec3\x20normal,\x20const\x20in\x20PhysicalMaterial\x20material\x20)\x20{\x0a\x0a\x09vec3\x20f0\x20=\x20material.specularColor;\x0a\x09float\x20f90\x20=\x20material.specularF90;\x0a\x09float\x20roughness\x20=\x20material.roughness;\x0a\x0a\x09float\x20alpha\x20=\x20pow2(\x20roughness\x20);\x20//\x20UE4\x27s\x20roughness\x0a\x0a\x09vec3\x20halfDir\x20=\x20normalize(\x20lightDir\x20+\x20viewDir\x20);\x0a\x0a\x09float\x20dotNL\x20=\x20saturate(\x20dot(\x20normal,\x20lightDir\x20)\x20);\x0a\x09float\x20dotNV\x20=\x20saturate(\x20dot(\x20normal,\x20viewDir\x20)\x20);\x0a\x09float\x20dotNH\x20=\x20saturate(\x20dot(\x20normal,\x20halfDir\x20)\x20);\x0a\x09float\x20dotVH\x20=\x20saturate(\x20dot(\x20viewDir,\x20halfDir\x20)\x20);\x0a\x0a\x09vec3\x20F\x20=\x20F_Schlick(\x20f0,\x20f90,\x20dotVH\x20);\x0a\x0a\x09#ifdef\x20USE_IRIDESCENCE\x0a\x0a\x09\x09F\x20=\x20mix(\x20F,\x20material.iridescenceFresnel,\x20material.iridescence\x20);\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_ANISOTROPY\x0a\x0a\x09\x09float\x20dotTL\x20=\x20dot(\x20material.anisotropyT,\x20lightDir\x20);\x0a\x09\x09float\x20dotTV\x20=\x20dot(\x20material.anisotropyT,\x20viewDir\x20);\x0a\x09\x09float\x20dotTH\x20=\x20dot(\x20material.anisotropyT,\x20halfDir\x20);\x0a\x09\x09float\x20dotBL\x20=\x20dot(\x20material.anisotropyB,\x20lightDir\x20);\x0a\x09\x09float\x20dotBV\x20=\x20dot(\x20material.anisotropyB,\x20viewDir\x20);\x0a\x09\x09float\x20dotBH\x20=\x20dot(\x20material.anisotropyB,\x20halfDir\x20);\x0a\x0a\x09\x09float\x20V\x20=\x20V_GGX_SmithCorrelated_Anisotropic(\x20material.alphaT,\x20alpha,\x20dotTV,\x20dotBV,\x20dotTL,\x20dotBL,\x20dotNV,\x20dotNL\x20);\x0a\x0a\x09\x09float\x20D\x20=\x20D_GGX_Anisotropic(\x20material.alphaT,\x20alpha,\x20dotNH,\x20dotTH,\x20dotBH\x20);\x0a\x0a\x09#else\x0a\x0a\x09\x09float\x20V\x20=\x20V_GGX_SmithCorrelated(\x20alpha,\x20dotNL,\x20dotNV\x20);\x0a\x0a\x09\x09float\x20D\x20=\x20D_GGX(\x20alpha,\x20dotNH\x20);\x0a\x0a\x09#endif\x0a\x0a\x09return\x20F\x20*\x20(\x20V\x20*\x20D\x20);\x0a\x0a}\x0a\x0a//\x20Rect\x20Area\x20Light\x0a\x0a//\x20Real-Time\x20Polygonal-Light\x20Shading\x20with\x20Linearly\x20Transformed\x20Cosines\x0a//\x20by\x20Eric\x20Heitz,\x20Jonathan\x20Dupuy,\x20Stephen\x20Hill\x20and\x20David\x20Neubelt\x0a//\x20code:\x20https://github.com/selfshadow/ltc_code/\x0a\x0avec2\x20LTC_Uv(\x20const\x20in\x20vec3\x20N,\x20const\x20in\x20vec3\x20V,\x20const\x20in\x20float\x20roughness\x20)\x20{\x0a\x0a\x09const\x20float\x20LUT_SIZE\x20=\x2064.0;\x0a\x09const\x20float\x20LUT_SCALE\x20=\x20(\x20LUT_SIZE\x20-\x201.0\x20)\x20/\x20LUT_SIZE;\x0a\x09const\x20float\x20LUT_BIAS\x20=\x200.5\x20/\x20LUT_SIZE;\x0a\x0a\x09float\x20dotNV\x20=\x20saturate(\x20dot(\x20N,\x20V\x20)\x20);\x0a\x0a\x09//\x20texture\x20parameterized\x20by\x20sqrt(\x20GGX\x20alpha\x20)\x20and\x20sqrt(\x201\x20-\x20cos(\x20theta\x20)\x20)\x0a\x09vec2\x20uv\x20=\x20vec2(\x20roughness,\x20sqrt(\x201.0\x20-\x20dotNV\x20)\x20);\x0a\x0a\x09uv\x20=\x20uv\x20*\x20LUT_SCALE\x20+\x20LUT_BIAS;\x0a\x0a\x09return\x20uv;\x0a\x0a}\x0a\x0afloat\x20LTC_ClippedSphereFormFactor(\x20const\x20in\x20vec3\x20f\x20)\x20{\x0a\x0a\x09//\x20Real-Time\x20Area\x20Lighting:\x20a\x20Journey\x20from\x20Research\x20to\x20Production\x20(p.102)\x0a\x09//\x20An\x20approximation\x20of\x20the\x20form\x20factor\x20of\x20a\x20horizon-clipped\x20rectangle.\x0a\x0a\x09float\x20l\x20=\x20length(\x20f\x20);\x0a\x0a\x09return\x20max(\x20(\x20l\x20*\x20l\x20+\x20f.z\x20)\x20/\x20(\x20l\x20+\x201.0\x20),\x200.0\x20);\x0a\x0a}\x0a\x0avec3\x20LTC_EdgeVectorFormFactor(\x20const\x20in\x20vec3\x20v1,\x20const\x20in\x20vec3\x20v2\x20)\x20{\x0a\x0a\x09float\x20x\x20=\x20dot(\x20v1,\x20v2\x20);\x0a\x0a\x09float\x20y\x20=\x20abs(\x20x\x20);\x0a\x0a\x09//\x20rational\x20polynomial\x20approximation\x20to\x20theta\x20/\x20sin(\x20theta\x20)\x20/\x202PI\x0a\x09float\x20a\x20=\x200.8543985\x20+\x20(\x200.4965155\x20+\x200.0145206\x20*\x20y\x20)\x20*\x20y;\x0a\x09float\x20b\x20=\x203.4175940\x20+\x20(\x204.1616724\x20+\x20y\x20)\x20*\x20y;\x0a\x09float\x20v\x20=\x20a\x20/\x20b;\x0a\x0a\x09float\x20theta_sintheta\x20=\x20(\x20x\x20>\x200.0\x20)\x20?\x20v\x20:\x200.5\x20*\x20inversesqrt(\x20max(\x201.0\x20-\x20x\x20*\x20x,\x201e-7\x20)\x20)\x20-\x20v;\x0a\x0a\x09return\x20cross(\x20v1,\x20v2\x20)\x20*\x20theta_sintheta;\x0a\x0a}\x0a\x0avec3\x20LTC_Evaluate(\x20const\x20in\x20vec3\x20N,\x20const\x20in\x20vec3\x20V,\x20const\x20in\x20vec3\x20P,\x20const\x20in\x20mat3\x20mInv,\x20const\x20in\x20vec3\x20rectCoords[\x204\x20]\x20)\x20{\x0a\x0a\x09//\x20bail\x20if\x20point\x20is\x20on\x20back\x20side\x20of\x20plane\x20of\x20light\x0a\x09//\x20assumes\x20ccw\x20winding\x20order\x20of\x20light\x20vertices\x0a\x09vec3\x20v1\x20=\x20rectCoords[\x201\x20]\x20-\x20rectCoords[\x200\x20];\x0a\x09vec3\x20v2\x20=\x20rectCoords[\x203\x20]\x20-\x20rectCoords[\x200\x20];\x0a\x09vec3\x20lightNormal\x20=\x20cross(\x20v1,\x20v2\x20);\x0a\x0a\x09if(\x20dot(\x20lightNormal,\x20P\x20-\x20rectCoords[\x200\x20]\x20)\x20<\x200.0\x20)\x20return\x20vec3(\x200.0\x20);\x0a\x0a\x09//\x20construct\x20orthonormal\x20basis\x20around\x20N\x0a\x09vec3\x20T1,\x20T2;\x0a\x09T1\x20=\x20normalize(\x20V\x20-\x20N\x20*\x20dot(\x20V,\x20N\x20)\x20);\x0a\x09T2\x20=\x20-\x20cross(\x20N,\x20T1\x20);\x20//\x20negated\x20from\x20paper;\x20possibly\x20due\x20to\x20a\x20different\x20handedness\x20of\x20world\x20coordinate\x20system\x0a\x0a\x09//\x20compute\x20transform\x0a\x09mat3\x20mat\x20=\x20mInv\x20*\x20transposeMat3(\x20mat3(\x20T1,\x20T2,\x20N\x20)\x20);\x0a\x0a\x09//\x20transform\x20rect\x0a\x09vec3\x20coords[\x204\x20];\x0a\x09coords[\x200\x20]\x20=\x20mat\x20*\x20(\x20rectCoords[\x200\x20]\x20-\x20P\x20);\x0a\x09coords[\x201\x20]\x20=\x20mat\x20*\x20(\x20rectCoords[\x201\x20]\x20-\x20P\x20);\x0a\x09coords[\x202\x20]\x20=\x20mat\x20*\x20(\x20rectCoords[\x202\x20]\x20-\x20P\x20);\x0a\x09coords[\x203\x20]\x20=\x20mat\x20*\x20(\x20rectCoords[\x203\x20]\x20-\x20P\x20);\x0a\x0a\x09//\x20project\x20rect\x20onto\x20sphere\x0a\x09coords[\x200\x20]\x20=\x20normalize(\x20coords[\x200\x20]\x20);\x0a\x09coords[\x201\x20]\x20=\x20normalize(\x20coords[\x201\x20]\x20);\x0a\x09coords[\x202\x20]\x20=\x20normalize(\x20coords[\x202\x20]\x20);\x0a\x09coords[\x203\x20]\x20=\x20normalize(\x20coords[\x203\x20]\x20);\x0a\x0a\x09//\x20calculate\x20vector\x20form\x20factor\x0a\x09vec3\x20vectorFormFactor\x20=\x20vec3(\x200.0\x20);\x0a\x09vectorFormFactor\x20+=\x20LTC_EdgeVectorFormFactor(\x20coords[\x200\x20],\x20coords[\x201\x20]\x20);\x0a\x09vectorFormFactor\x20+=\x20LTC_EdgeVectorFormFactor(\x20coords[\x201\x20],\x20coords[\x202\x20]\x20);\x0a\x09vectorFormFactor\x20+=\x20LTC_EdgeVectorFormFactor(\x20coords[\x202\x20],\x20coords[\x203\x20]\x20);\x0a\x09vectorFormFactor\x20+=\x20LTC_EdgeVectorFormFactor(\x20coords[\x203\x20],\x20coords[\x200\x20]\x20);\x0a\x0a\x09//\x20adjust\x20for\x20horizon\x20clipping\x0a\x09float\x20result\x20=\x20LTC_ClippedSphereFormFactor(\x20vectorFormFactor\x20);\x0a\x0a/*\x0a\x09//\x20alternate\x20method\x20of\x20adjusting\x20for\x20horizon\x20clipping\x20(see\x20referece)\x0a\x09//\x20refactoring\x20required\x0a\x09float\x20len\x20=\x20length(\x20vectorFormFactor\x20);\x0a\x09float\x20z\x20=\x20vectorFormFactor.z\x20/\x20len;\x0a\x0a\x09const\x20float\x20LUT_SIZE\x20=\x2064.0;\x0a\x09const\x20float\x20LUT_SCALE\x20=\x20(\x20LUT_SIZE\x20-\x201.0\x20)\x20/\x20LUT_SIZE;\x0a\x09const\x20float\x20LUT_BIAS\x20=\x200.5\x20/\x20LUT_SIZE;\x0a\x0a\x09//\x20tabulated\x20horizon-clipped\x20sphere,\x20apparently...\x0a\x09vec2\x20uv\x20=\x20vec2(\x20z\x20*\x200.5\x20+\x200.5,\x20len\x20);\x0a\x09uv\x20=\x20uv\x20*\x20LUT_SCALE\x20+\x20LUT_BIAS;\x0a\x0a\x09float\x20scale\x20=\x20texture2D(\x20ltc_2,\x20uv\x20).w;\x0a\x0a\x09float\x20result\x20=\x20len\x20*\x20scale;\x0a*/\x0a\x0a\x09return\x20vec3(\x20result\x20);\x0a\x0a}\x0a\x0a//\x20End\x20Rect\x20Area\x20Light\x0a\x0a#if\x20defined(\x20USE_SHEEN\x20)\x0a\x0a//\x20https://github.com/google/filament/blob/master/shaders/src/brdf.fs\x0afloat\x20D_Charlie(\x20float\x20roughness,\x20float\x20dotNH\x20)\x20{\x0a\x0a\x09float\x20alpha\x20=\x20pow2(\x20roughness\x20);\x0a\x0a\x09//\x20Estevez\x20and\x20Kulla\x202017,\x20\x22Production\x20Friendly\x20Microfacet\x20Sheen\x20BRDF\x22\x0a\x09float\x20invAlpha\x20=\x201.0\x20/\x20alpha;\x0a\x09float\x20cos2h\x20=\x20dotNH\x20*\x20dotNH;\x0a\x09float\x20sin2h\x20=\x20max(\x201.0\x20-\x20cos2h,\x200.0078125\x20);\x20//\x202^(-14/2),\x20so\x20sin2h^2\x20>\x200\x20in\x20fp16\x0a\x0a\x09return\x20(\x202.0\x20+\x20invAlpha\x20)\x20*\x20pow(\x20sin2h,\x20invAlpha\x20*\x200.5\x20)\x20/\x20(\x202.0\x20*\x20PI\x20);\x0a\x0a}\x0a\x0a//\x20https://github.com/google/filament/blob/master/shaders/src/brdf.fs\x0afloat\x20V_Neubelt(\x20float\x20dotNV,\x20float\x20dotNL\x20)\x20{\x0a\x0a\x09//\x20Neubelt\x20and\x20Pettineo\x202013,\x20\x22Crafting\x20a\x20Next-gen\x20Material\x20Pipeline\x20for\x20The\x20Order:\x201886\x22\x0a\x09return\x20saturate(\x201.0\x20/\x20(\x204.0\x20*\x20(\x20dotNL\x20+\x20dotNV\x20-\x20dotNL\x20*\x20dotNV\x20)\x20)\x20);\x0a\x0a}\x0a\x0avec3\x20BRDF_Sheen(\x20const\x20in\x20vec3\x20lightDir,\x20const\x20in\x20vec3\x20viewDir,\x20const\x20in\x20vec3\x20normal,\x20vec3\x20sheenColor,\x20const\x20in\x20float\x20sheenRoughness\x20)\x20{\x0a\x0a\x09vec3\x20halfDir\x20=\x20normalize(\x20lightDir\x20+\x20viewDir\x20);\x0a\x0a\x09float\x20dotNL\x20=\x20saturate(\x20dot(\x20normal,\x20lightDir\x20)\x20);\x0a\x09float\x20dotNV\x20=\x20saturate(\x20dot(\x20normal,\x20viewDir\x20)\x20);\x0a\x09float\x20dotNH\x20=\x20saturate(\x20dot(\x20normal,\x20halfDir\x20)\x20);\x0a\x0a\x09float\x20D\x20=\x20D_Charlie(\x20sheenRoughness,\x20dotNH\x20);\x0a\x09float\x20V\x20=\x20V_Neubelt(\x20dotNV,\x20dotNL\x20);\x0a\x0a\x09return\x20sheenColor\x20*\x20(\x20D\x20*\x20V\x20);\x0a\x0a}\x0a\x0a#endif\x0a\x0a//\x20This\x20is\x20a\x20curve-fit\x20approxmation\x20to\x20the\x20\x22Charlie\x20sheen\x22\x20BRDF\x20integrated\x20over\x20the\x20hemisphere\x20from\x20\x0a//\x20Estevez\x20and\x20Kulla\x202017,\x20\x22Production\x20Friendly\x20Microfacet\x20Sheen\x20BRDF\x22.\x20The\x20analysis\x20can\x20be\x20found\x0a//\x20in\x20the\x20Sheen\x20section\x20of\x20https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing\x0afloat\x20IBLSheenBRDF(\x20const\x20in\x20vec3\x20normal,\x20const\x20in\x20vec3\x20viewDir,\x20const\x20in\x20float\x20roughness\x20)\x20{\x0a\x0a\x09float\x20dotNV\x20=\x20saturate(\x20dot(\x20normal,\x20viewDir\x20)\x20);\x0a\x0a\x09float\x20r2\x20=\x20roughness\x20*\x20roughness;\x0a\x0a\x09float\x20a\x20=\x20roughness\x20<\x200.25\x20?\x20-339.2\x20*\x20r2\x20+\x20161.4\x20*\x20roughness\x20-\x2025.9\x20:\x20-8.48\x20*\x20r2\x20+\x2014.3\x20*\x20roughness\x20-\x209.95;\x0a\x0a\x09float\x20b\x20=\x20roughness\x20<\x200.25\x20?\x2044.0\x20*\x20r2\x20-\x2023.7\x20*\x20roughness\x20+\x203.26\x20:\x201.97\x20*\x20r2\x20-\x203.27\x20*\x20roughness\x20+\x200.72;\x0a\x0a\x09float\x20DG\x20=\x20exp(\x20a\x20*\x20dotNV\x20+\x20b\x20)\x20+\x20(\x20roughness\x20<\x200.25\x20?\x200.0\x20:\x200.1\x20*\x20(\x20roughness\x20-\x200.25\x20)\x20);\x0a\x0a\x09return\x20saturate(\x20DG\x20*\x20RECIPROCAL_PI\x20);\x0a\x0a}\x0a\x0a//\x20Analytical\x20approximation\x20of\x20the\x20DFG\x20LUT,\x20one\x20half\x20of\x20the\x0a//\x20split-sum\x20approximation\x20used\x20in\x20indirect\x20specular\x20lighting.\x0a//\x20via\x20\x27environmentBRDF\x27\x20from\x20\x22Physically\x20Based\x20Shading\x20on\x20Mobile\x22\x0a//\x20https://www.unrealengine.com/blog/physically-based-shading-on-mobile\x0avec2\x20DFGApprox(\x20const\x20in\x20vec3\x20normal,\x20const\x20in\x20vec3\x20viewDir,\x20const\x20in\x20float\x20roughness\x20)\x20{\x0a\x0a\x09float\x20dotNV\x20=\x20saturate(\x20dot(\x20normal,\x20viewDir\x20)\x20);\x0a\x0a\x09const\x20vec4\x20c0\x20=\x20vec4(\x20-\x201,\x20-\x200.0275,\x20-\x200.572,\x200.022\x20);\x0a\x0a\x09const\x20vec4\x20c1\x20=\x20vec4(\x201,\x200.0425,\x201.04,\x20-\x200.04\x20);\x0a\x0a\x09vec4\x20r\x20=\x20roughness\x20*\x20c0\x20+\x20c1;\x0a\x0a\x09float\x20a004\x20=\x20min(\x20r.x\x20*\x20r.x,\x20exp2(\x20-\x209.28\x20*\x20dotNV\x20)\x20)\x20*\x20r.x\x20+\x20r.y;\x0a\x0a\x09vec2\x20fab\x20=\x20vec2(\x20-\x201.04,\x201.04\x20)\x20*\x20a004\x20+\x20r.zw;\x0a\x0a\x09return\x20fab;\x0a\x0a}\x0a\x0avec3\x20EnvironmentBRDF(\x20const\x20in\x20vec3\x20normal,\x20const\x20in\x20vec3\x20viewDir,\x20const\x20in\x20vec3\x20specularColor,\x20const\x20in\x20float\x20specularF90,\x20const\x20in\x20float\x20roughness\x20)\x20{\x0a\x0a\x09vec2\x20fab\x20=\x20DFGApprox(\x20normal,\x20viewDir,\x20roughness\x20);\x0a\x0a\x09return\x20specularColor\x20*\x20fab.x\x20+\x20specularF90\x20*\x20fab.y;\x0a\x0a}\x0a\x0a//\x20Fdez-Agüera\x27s\x20\x22Multiple-Scattering\x20Microfacet\x20Model\x20for\x20Real-Time\x20Image\x20Based\x20Lighting\x22\x0a//\x20Approximates\x20multiscattering\x20in\x20order\x20to\x20preserve\x20energy.\x0a//\x20http://www.jcgt.org/published/0008/01/03/\x0a#ifdef\x20USE_IRIDESCENCE\x0avoid\x20computeMultiscatteringIridescence(\x20const\x20in\x20vec3\x20normal,\x20const\x20in\x20vec3\x20viewDir,\x20const\x20in\x20vec3\x20specularColor,\x20const\x20in\x20float\x20specularF90,\x20const\x20in\x20float\x20iridescence,\x20const\x20in\x20vec3\x20iridescenceF0,\x20const\x20in\x20float\x20roughness,\x20inout\x20vec3\x20singleScatter,\x20inout\x20vec3\x20multiScatter\x20)\x20{\x0a#else\x0avoid\x20computeMultiscattering(\x20const\x20in\x20vec3\x20normal,\x20const\x20in\x20vec3\x20viewDir,\x20const\x20in\x20vec3\x20specularColor,\x20const\x20in\x20float\x20specularF90,\x20const\x20in\x20float\x20roughness,\x20inout\x20vec3\x20singleScatter,\x20inout\x20vec3\x20multiScatter\x20)\x20{\x0a#endif\x0a\x0a\x09vec2\x20fab\x20=\x20DFGApprox(\x20normal,\x20viewDir,\x20roughness\x20);\x0a\x0a\x09#ifdef\x20USE_IRIDESCENCE\x0a\x0a\x09\x09vec3\x20Fr\x20=\x20mix(\x20specularColor,\x20iridescenceF0,\x20iridescence\x20);\x0a\x0a\x09#else\x0a\x0a\x09\x09vec3\x20Fr\x20=\x20specularColor;\x0a\x0a\x09#endif\x0a\x0a\x09vec3\x20FssEss\x20=\x20Fr\x20*\x20fab.x\x20+\x20specularF90\x20*\x20fab.y;\x0a\x0a\x09float\x20Ess\x20=\x20fab.x\x20+\x20fab.y;\x0a\x09float\x20Ems\x20=\x201.0\x20-\x20Ess;\x0a\x0a\x09vec3\x20Favg\x20=\x20Fr\x20+\x20(\x201.0\x20-\x20Fr\x20)\x20*\x200.047619;\x20//\x201/21\x0a\x09vec3\x20Fms\x20=\x20FssEss\x20*\x20Favg\x20/\x20(\x201.0\x20-\x20Ems\x20*\x20Favg\x20);\x0a\x0a\x09singleScatter\x20+=\x20FssEss;\x0a\x09multiScatter\x20+=\x20Fms\x20*\x20Ems;\x0a\x0a}\x0a\x0a#if\x20NUM_RECT_AREA_LIGHTS\x20>\x200\x0a\x0a\x09void\x20RE_Direct_RectArea_Physical(\x20const\x20in\x20RectAreaLight\x20rectAreaLight,\x20const\x20in\x20vec3\x20geometryPosition,\x20const\x20in\x20vec3\x20geometryNormal,\x20const\x20in\x20vec3\x20geometryViewDir,\x20const\x20in\x20vec3\x20geometryClearcoatNormal,\x20const\x20in\x20PhysicalMaterial\x20material,\x20inout\x20ReflectedLight\x20reflectedLight\x20)\x20{\x0a\x0a\x09\x09vec3\x20normal\x20=\x20geometryNormal;\x0a\x09\x09vec3\x20viewDir\x20=\x20geometryViewDir;\x0a\x09\x09vec3\x20position\x20=\x20geometryPosition;\x0a\x09\x09vec3\x20lightPos\x20=\x20rectAreaLight.position;\x0a\x09\x09vec3\x20halfWidth\x20=\x20rectAreaLight.halfWidth;\x0a\x09\x09vec3\x20halfHeight\x20=\x20rectAreaLight.halfHeight;\x0a\x09\x09vec3\x20lightColor\x20=\x20rectAreaLight.color;\x0a\x09\x09float\x20roughness\x20=\x20material.roughness;\x0a\x0a\x09\x09vec3\x20rectCoords[\x204\x20];\x0a\x09\x09rectCoords[\x200\x20]\x20=\x20lightPos\x20+\x20halfWidth\x20-\x20halfHeight;\x20//\x20counterclockwise;\x20light\x20shines\x20in\x20local\x20neg\x20z\x20direction\x0a\x09\x09rectCoords[\x201\x20]\x20=\x20lightPos\x20-\x20halfWidth\x20-\x20halfHeight;\x0a\x09\x09rectCoords[\x202\x20]\x20=\x20lightPos\x20-\x20halfWidth\x20+\x20halfHeight;\x0a\x09\x09rectCoords[\x203\x20]\x20=\x20lightPos\x20+\x20halfWidth\x20+\x20halfHeight;\x0a\x0a\x09\x09vec2\x20uv\x20=\x20LTC_Uv(\x20normal,\x20viewDir,\x20roughness\x20);\x0a\x0a\x09\x09vec4\x20t1\x20=\x20texture2D(\x20ltc_1,\x20uv\x20);\x0a\x09\x09vec4\x20t2\x20=\x20texture2D(\x20ltc_2,\x20uv\x20);\x0a\x0a\x09\x09mat3\x20mInv\x20=\x20mat3(\x0a\x09\x09\x09vec3(\x20t1.x,\x200,\x20t1.y\x20),\x0a\x09\x09\x09vec3(\x20\x20\x20\x200,\x201,\x20\x20\x20\x200\x20),\x0a\x09\x09\x09vec3(\x20t1.z,\x200,\x20t1.w\x20)\x0a\x09\x09);\x0a\x0a\x09\x09//\x20LTC\x20Fresnel\x20Approximation\x20by\x20Stephen\x20Hill\x0a\x09\x09//\x20http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf\x0a\x09\x09vec3\x20fresnel\x20=\x20(\x20material.specularColor\x20*\x20t2.x\x20+\x20(\x20vec3(\x201.0\x20)\x20-\x20material.specularColor\x20)\x20*\x20t2.y\x20);\x0a\x0a\x09\x09reflectedLight.directSpecular\x20+=\x20lightColor\x20*\x20fresnel\x20*\x20LTC_Evaluate(\x20normal,\x20viewDir,\x20position,\x20mInv,\x20rectCoords\x20);\x0a\x0a\x09\x09reflectedLight.directDiffuse\x20+=\x20lightColor\x20*\x20material.diffuseColor\x20*\x20LTC_Evaluate(\x20normal,\x20viewDir,\x20position,\x20mat3(\x201.0\x20),\x20rectCoords\x20);\x0a\x0a\x09}\x0a\x0a#endif\x0a\x0avoid\x20RE_Direct_Physical(\x20const\x20in\x20IncidentLight\x20directLight,\x20const\x20in\x20vec3\x20geometryPosition,\x20const\x20in\x20vec3\x20geometryNormal,\x20const\x20in\x20vec3\x20geometryViewDir,\x20const\x20in\x20vec3\x20geometryClearcoatNormal,\x20const\x20in\x20PhysicalMaterial\x20material,\x20inout\x20ReflectedLight\x20reflectedLight\x20)\x20{\x0a\x0a\x09float\x20dotNL\x20=\x20saturate(\x20dot(\x20geometryNormal,\x20directLight.direction\x20)\x20);\x0a\x0a\x09vec3\x20irradiance\x20=\x20dotNL\x20*\x20directLight.color;\x0a\x0a\x09#ifdef\x20USE_CLEARCOAT\x0a\x0a\x09\x09float\x20dotNLcc\x20=\x20saturate(\x20dot(\x20geometryClearcoatNormal,\x20directLight.direction\x20)\x20);\x0a\x0a\x09\x09vec3\x20ccIrradiance\x20=\x20dotNLcc\x20*\x20directLight.color;\x0a\x0a\x09\x09clearcoatSpecularDirect\x20+=\x20ccIrradiance\x20*\x20BRDF_GGX_Clearcoat(\x20directLight.direction,\x20geometryViewDir,\x20geometryClearcoatNormal,\x20material\x20);\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_SHEEN\x0a\x0a\x09\x09sheenSpecularDirect\x20+=\x20irradiance\x20*\x20BRDF_Sheen(\x20directLight.direction,\x20geometryViewDir,\x20geometryNormal,\x20material.sheenColor,\x20material.sheenRoughness\x20);\x0a\x0a\x09#endif\x0a\x0a\x09reflectedLight.directSpecular\x20+=\x20irradiance\x20*\x20BRDF_GGX(\x20directLight.direction,\x20geometryViewDir,\x20geometryNormal,\x20material\x20);\x0a\x0a\x09reflectedLight.directDiffuse\x20+=\x20irradiance\x20*\x20BRDF_Lambert(\x20material.diffuseColor\x20);\x0a}\x0a\x0avoid\x20RE_IndirectDiffuse_Physical(\x20const\x20in\x20vec3\x20irradiance,\x20const\x20in\x20vec3\x20geometryPosition,\x20const\x20in\x20vec3\x20geometryNormal,\x20const\x20in\x20vec3\x20geometryViewDir,\x20const\x20in\x20vec3\x20geometryClearcoatNormal,\x20const\x20in\x20PhysicalMaterial\x20material,\x20inout\x20ReflectedLight\x20reflectedLight\x20)\x20{\x0a\x0a\x09reflectedLight.indirectDiffuse\x20+=\x20irradiance\x20*\x20BRDF_Lambert(\x20material.diffuseColor\x20);\x0a\x0a}\x0a\x0avoid\x20RE_IndirectSpecular_Physical(\x20const\x20in\x20vec3\x20radiance,\x20const\x20in\x20vec3\x20irradiance,\x20const\x20in\x20vec3\x20clearcoatRadiance,\x20const\x20in\x20vec3\x20geometryPosition,\x20const\x20in\x20vec3\x20geometryNormal,\x20const\x20in\x20vec3\x20geometryViewDir,\x20const\x20in\x20vec3\x20geometryClearcoatNormal,\x20const\x20in\x20PhysicalMaterial\x20material,\x20inout\x20ReflectedLight\x20reflectedLight)\x20{\x0a\x0a\x09#ifdef\x20USE_CLEARCOAT\x0a\x0a\x09\x09clearcoatSpecularIndirect\x20+=\x20clearcoatRadiance\x20*\x20EnvironmentBRDF(\x20geometryClearcoatNormal,\x20geometryViewDir,\x20material.clearcoatF0,\x20material.clearcoatF90,\x20material.clearcoatRoughness\x20);\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_SHEEN\x0a\x0a\x09\x09sheenSpecularIndirect\x20+=\x20irradiance\x20*\x20material.sheenColor\x20*\x20IBLSheenBRDF(\x20geometryNormal,\x20geometryViewDir,\x20material.sheenRoughness\x20);\x0a\x0a\x09#endif\x0a\x0a\x09//\x20Both\x20indirect\x20specular\x20and\x20indirect\x20diffuse\x20light\x20accumulate\x20here\x0a\x0a\x09vec3\x20singleScattering\x20=\x20vec3(\x200.0\x20);\x0a\x09vec3\x20multiScattering\x20=\x20vec3(\x200.0\x20);\x0a\x09vec3\x20cosineWeightedIrradiance\x20=\x20irradiance\x20*\x20RECIPROCAL_PI;\x0a\x0a\x09#ifdef\x20USE_IRIDESCENCE\x0a\x0a\x09\x09computeMultiscatteringIridescence(\x20geometryNormal,\x20geometryViewDir,\x20material.specularColor,\x20material.specularF90,\x20material.iridescence,\x20material.iridescenceFresnel,\x20material.roughness,\x20singleScattering,\x20multiScattering\x20);\x0a\x0a\x09#else\x0a\x0a\x09\x09computeMultiscattering(\x20geometryNormal,\x20geometryViewDir,\x20material.specularColor,\x20material.specularF90,\x20material.roughness,\x20singleScattering,\x20multiScattering\x20);\x0a\x0a\x09#endif\x0a\x0a\x09vec3\x20totalScattering\x20=\x20singleScattering\x20+\x20multiScattering;\x0a\x09vec3\x20diffuse\x20=\x20material.diffuseColor\x20*\x20(\x201.0\x20-\x20max(\x20max(\x20totalScattering.r,\x20totalScattering.g\x20),\x20totalScattering.b\x20)\x20);\x0a\x0a\x09reflectedLight.indirectSpecular\x20+=\x20radiance\x20*\x20singleScattering;\x0a\x09reflectedLight.indirectSpecular\x20+=\x20multiScattering\x20*\x20cosineWeightedIrradiance;\x0a\x0a\x09reflectedLight.indirectDiffuse\x20+=\x20diffuse\x20*\x20cosineWeightedIrradiance;\x0a\x0a}\x0a\x0a#define\x20RE_Direct\x09\x09\x09\x09RE_Direct_Physical\x0a#define\x20RE_Direct_RectArea\x09\x09RE_Direct_RectArea_Physical\x0a#define\x20RE_IndirectDiffuse\x09\x09RE_IndirectDiffuse_Physical\x0a#define\x20RE_IndirectSpecular\x09\x09RE_IndirectSpecular_Physical\x0a\x0a//\x20ref:\x20https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\x0afloat\x20computeSpecularOcclusion(\x20const\x20in\x20float\x20dotNV,\x20const\x20in\x20float\x20ambientOcclusion,\x20const\x20in\x20float\x20roughness\x20)\x20{\x0a\x0a\x09return\x20saturate(\x20pow(\x20dotNV\x20+\x20ambientOcclusion,\x20exp2(\x20-\x2016.0\x20*\x20roughness\x20-\x201.0\x20)\x20)\x20-\x201.0\x20+\x20ambientOcclusion\x20);\x0a\x0a}\x0a',
            'lights_fragment_begin': '\x0a/**\x0a\x20*\x20This\x20is\x20a\x20template\x20that\x20can\x20be\x20used\x20to\x20light\x20a\x20material,\x20it\x20uses\x20pluggable\x0a\x20*\x20RenderEquations\x20(RE)for\x20specific\x20lighting\x20scenarios.\x0a\x20*\x0a\x20*\x20Instructions\x20for\x20use:\x0a\x20*\x20-\x20Ensure\x20that\x20both\x20RE_Direct,\x20RE_IndirectDiffuse\x20and\x20RE_IndirectSpecular\x20are\x20defined\x0a\x20*\x20-\x20Create\x20a\x20material\x20parameter\x20that\x20is\x20to\x20be\x20passed\x20as\x20the\x20third\x20parameter\x20to\x20your\x20lighting\x20functions.\x0a\x20*\x0a\x20*\x20TODO:\x0a\x20*\x20-\x20Add\x20area\x20light\x20support.\x0a\x20*\x20-\x20Add\x20sphere\x20light\x20support.\x0a\x20*\x20-\x20Add\x20diffuse\x20light\x20probe\x20(irradiance\x20cubemap)\x20support.\x0a\x20*/\x0a\x0avec3\x20geometryPosition\x20=\x20-\x20vViewPosition;\x0avec3\x20geometryNormal\x20=\x20normal;\x0avec3\x20geometryViewDir\x20=\x20(\x20isOrthographic\x20)\x20?\x20vec3(\x200,\x200,\x201\x20)\x20:\x20normalize(\x20vViewPosition\x20);\x0a\x0avec3\x20geometryClearcoatNormal\x20=\x20vec3(\x200.0\x20);\x0a\x0a#ifdef\x20USE_CLEARCOAT\x0a\x0a\x09geometryClearcoatNormal\x20=\x20clearcoatNormal;\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_IRIDESCENCE\x0a\x0a\x09float\x20dotNVi\x20=\x20saturate(\x20dot(\x20normal,\x20geometryViewDir\x20)\x20);\x0a\x0a\x09if\x20(\x20material.iridescenceThickness\x20==\x200.0\x20)\x20{\x0a\x0a\x09\x09material.iridescence\x20=\x200.0;\x0a\x0a\x09}\x20else\x20{\x0a\x0a\x09\x09material.iridescence\x20=\x20saturate(\x20material.iridescence\x20);\x0a\x0a\x09}\x0a\x0a\x09if\x20(\x20material.iridescence\x20>\x200.0\x20)\x20{\x0a\x0a\x09\x09material.iridescenceFresnel\x20=\x20evalIridescence(\x201.0,\x20material.iridescenceIOR,\x20dotNVi,\x20material.iridescenceThickness,\x20material.specularColor\x20);\x0a\x0a\x09\x09//\x20Iridescence\x20F0\x20approximation\x0a\x09\x09material.iridescenceF0\x20=\x20Schlick_to_F0(\x20material.iridescenceFresnel,\x201.0,\x20dotNVi\x20);\x0a\x0a\x09}\x0a\x0a#endif\x0a\x0aIncidentLight\x20directLight;\x0a\x0a#if\x20(\x20NUM_POINT_LIGHTS\x20>\x200\x20)\x20&&\x20defined(\x20RE_Direct\x20)\x0a\x0a\x09PointLight\x20pointLight;\x0a\x09#if\x20defined(\x20USE_SHADOWMAP\x20)\x20&&\x20NUM_POINT_LIGHT_SHADOWS\x20>\x200\x0a\x09PointLightShadow\x20pointLightShadow;\x0a\x09#endif\x0a\x0a\x09#pragma\x20unroll_loop_start\x0a\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20NUM_POINT_LIGHTS;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09pointLight\x20=\x20pointLights[\x20i\x20];\x0a\x0a\x09\x09getPointLightInfo(\x20pointLight,\x20geometryPosition,\x20directLight\x20);\x0a\x0a\x09\x09#if\x20defined(\x20USE_SHADOWMAP\x20)\x20&&\x20(\x20UNROLLED_LOOP_INDEX\x20<\x20NUM_POINT_LIGHT_SHADOWS\x20)\x0a\x09\x09pointLightShadow\x20=\x20pointLightShadows[\x20i\x20];\x0a\x09\x09directLight.color\x20*=\x20(\x20directLight.visible\x20&&\x20receiveShadow\x20)\x20?\x20getPointShadow(\x20pointShadowMap[\x20i\x20],\x20pointLightShadow.shadowMapSize,\x20pointLightShadow.shadowBias,\x20pointLightShadow.shadowRadius,\x20vPointShadowCoord[\x20i\x20],\x20pointLightShadow.shadowCameraNear,\x20pointLightShadow.shadowCameraFar\x20)\x20:\x201.0;\x0a\x09\x09#endif\x0a\x0a\x09\x09RE_Direct(\x20directLight,\x20geometryPosition,\x20geometryNormal,\x20geometryViewDir,\x20geometryClearcoatNormal,\x20material,\x20reflectedLight\x20);\x0a\x0a\x09}\x0a\x09#pragma\x20unroll_loop_end\x0a\x0a#endif\x0a\x0a#if\x20(\x20NUM_SPOT_LIGHTS\x20>\x200\x20)\x20&&\x20defined(\x20RE_Direct\x20)\x0a\x0a\x09SpotLight\x20spotLight;\x0a\x09vec4\x20spotColor;\x0a\x09vec3\x20spotLightCoord;\x0a\x09bool\x20inSpotLightMap;\x0a\x0a\x09#if\x20defined(\x20USE_SHADOWMAP\x20)\x20&&\x20NUM_SPOT_LIGHT_SHADOWS\x20>\x200\x0a\x09SpotLightShadow\x20spotLightShadow;\x0a\x09#endif\x0a\x0a\x09#pragma\x20unroll_loop_start\x0a\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20NUM_SPOT_LIGHTS;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09spotLight\x20=\x20spotLights[\x20i\x20];\x0a\x0a\x09\x09getSpotLightInfo(\x20spotLight,\x20geometryPosition,\x20directLight\x20);\x0a\x0a\x09\x09//\x20spot\x20lights\x20are\x20ordered\x20[shadows\x20with\x20maps,\x20shadows\x20without\x20maps,\x20maps\x20without\x20shadows,\x20none]\x0a\x09\x09#if\x20(\x20UNROLLED_LOOP_INDEX\x20<\x20NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS\x20)\x0a\x09\x09#define\x20SPOT_LIGHT_MAP_INDEX\x20UNROLLED_LOOP_INDEX\x0a\x09\x09#elif\x20(\x20UNROLLED_LOOP_INDEX\x20<\x20NUM_SPOT_LIGHT_SHADOWS\x20)\x0a\x09\x09#define\x20SPOT_LIGHT_MAP_INDEX\x20NUM_SPOT_LIGHT_MAPS\x0a\x09\x09#else\x0a\x09\x09#define\x20SPOT_LIGHT_MAP_INDEX\x20(\x20UNROLLED_LOOP_INDEX\x20-\x20NUM_SPOT_LIGHT_SHADOWS\x20+\x20NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS\x20)\x0a\x09\x09#endif\x0a\x0a\x09\x09#if\x20(\x20SPOT_LIGHT_MAP_INDEX\x20<\x20NUM_SPOT_LIGHT_MAPS\x20)\x0a\x09\x09\x09spotLightCoord\x20=\x20vSpotLightCoord[\x20i\x20].xyz\x20/\x20vSpotLightCoord[\x20i\x20].w;\x0a\x09\x09\x09inSpotLightMap\x20=\x20all(\x20lessThan(\x20abs(\x20spotLightCoord\x20*\x202.\x20-\x201.\x20),\x20vec3(\x201.0\x20)\x20)\x20);\x0a\x09\x09\x09spotColor\x20=\x20texture2D(\x20spotLightMap[\x20SPOT_LIGHT_MAP_INDEX\x20],\x20spotLightCoord.xy\x20);\x0a\x09\x09\x09directLight.color\x20=\x20inSpotLightMap\x20?\x20directLight.color\x20*\x20spotColor.rgb\x20:\x20directLight.color;\x0a\x09\x09#endif\x0a\x0a\x09\x09#undef\x20SPOT_LIGHT_MAP_INDEX\x0a\x0a\x09\x09#if\x20defined(\x20USE_SHADOWMAP\x20)\x20&&\x20(\x20UNROLLED_LOOP_INDEX\x20<\x20NUM_SPOT_LIGHT_SHADOWS\x20)\x0a\x09\x09spotLightShadow\x20=\x20spotLightShadows[\x20i\x20];\x0a\x09\x09directLight.color\x20*=\x20(\x20directLight.visible\x20&&\x20receiveShadow\x20)\x20?\x20getShadow(\x20spotShadowMap[\x20i\x20],\x20spotLightShadow.shadowMapSize,\x20spotLightShadow.shadowBias,\x20spotLightShadow.shadowRadius,\x20vSpotLightCoord[\x20i\x20]\x20)\x20:\x201.0;\x0a\x09\x09#endif\x0a\x0a\x09\x09RE_Direct(\x20directLight,\x20geometryPosition,\x20geometryNormal,\x20geometryViewDir,\x20geometryClearcoatNormal,\x20material,\x20reflectedLight\x20);\x0a\x0a\x09}\x0a\x09#pragma\x20unroll_loop_end\x0a\x0a#endif\x0a\x0a#if\x20(\x20NUM_DIR_LIGHTS\x20>\x200\x20)\x20&&\x20defined(\x20RE_Direct\x20)\x0a\x0a\x09DirectionalLight\x20directionalLight;\x0a\x09#if\x20defined(\x20USE_SHADOWMAP\x20)\x20&&\x20NUM_DIR_LIGHT_SHADOWS\x20>\x200\x0a\x09DirectionalLightShadow\x20directionalLightShadow;\x0a\x09#endif\x0a\x0a\x09#pragma\x20unroll_loop_start\x0a\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20NUM_DIR_LIGHTS;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09directionalLight\x20=\x20directionalLights[\x20i\x20];\x0a\x0a\x09\x09getDirectionalLightInfo(\x20directionalLight,\x20directLight\x20);\x0a\x0a\x09\x09#if\x20defined(\x20USE_SHADOWMAP\x20)\x20&&\x20(\x20UNROLLED_LOOP_INDEX\x20<\x20NUM_DIR_LIGHT_SHADOWS\x20)\x0a\x09\x09directionalLightShadow\x20=\x20directionalLightShadows[\x20i\x20];\x0a\x09\x09directLight.color\x20*=\x20(\x20directLight.visible\x20&&\x20receiveShadow\x20)\x20?\x20getShadow(\x20directionalShadowMap[\x20i\x20],\x20directionalLightShadow.shadowMapSize,\x20directionalLightShadow.shadowBias,\x20directionalLightShadow.shadowRadius,\x20vDirectionalShadowCoord[\x20i\x20]\x20)\x20:\x201.0;\x0a\x09\x09#endif\x0a\x0a\x09\x09RE_Direct(\x20directLight,\x20geometryPosition,\x20geometryNormal,\x20geometryViewDir,\x20geometryClearcoatNormal,\x20material,\x20reflectedLight\x20);\x0a\x0a\x09}\x0a\x09#pragma\x20unroll_loop_end\x0a\x0a#endif\x0a\x0a#if\x20(\x20NUM_RECT_AREA_LIGHTS\x20>\x200\x20)\x20&&\x20defined(\x20RE_Direct_RectArea\x20)\x0a\x0a\x09RectAreaLight\x20rectAreaLight;\x0a\x0a\x09#pragma\x20unroll_loop_start\x0a\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20NUM_RECT_AREA_LIGHTS;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09rectAreaLight\x20=\x20rectAreaLights[\x20i\x20];\x0a\x09\x09RE_Direct_RectArea(\x20rectAreaLight,\x20geometryPosition,\x20geometryNormal,\x20geometryViewDir,\x20geometryClearcoatNormal,\x20material,\x20reflectedLight\x20);\x0a\x0a\x09}\x0a\x09#pragma\x20unroll_loop_end\x0a\x0a#endif\x0a\x0a#if\x20defined(\x20RE_IndirectDiffuse\x20)\x0a\x0a\x09vec3\x20iblIrradiance\x20=\x20vec3(\x200.0\x20);\x0a\x0a\x09vec3\x20irradiance\x20=\x20getAmbientLightIrradiance(\x20ambientLightColor\x20);\x0a\x0a\x09#if\x20defined(\x20USE_LIGHT_PROBES\x20)\x0a\x0a\x09\x09irradiance\x20+=\x20getLightProbeIrradiance(\x20lightProbe,\x20geometryNormal\x20);\x0a\x0a\x09#endif\x0a\x0a\x09#if\x20(\x20NUM_HEMI_LIGHTS\x20>\x200\x20)\x0a\x0a\x09\x09#pragma\x20unroll_loop_start\x0a\x09\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20NUM_HEMI_LIGHTS;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09\x09irradiance\x20+=\x20getHemisphereLightIrradiance(\x20hemisphereLights[\x20i\x20],\x20geometryNormal\x20);\x0a\x0a\x09\x09}\x0a\x09\x09#pragma\x20unroll_loop_end\x0a\x0a\x09#endif\x0a\x0a#endif\x0a\x0a#if\x20defined(\x20RE_IndirectSpecular\x20)\x0a\x0a\x09vec3\x20radiance\x20=\x20vec3(\x200.0\x20);\x0a\x09vec3\x20clearcoatRadiance\x20=\x20vec3(\x200.0\x20);\x0a\x0a#endif\x0a',
            'lights_fragment_maps': '\x0a#if\x20defined(\x20RE_IndirectDiffuse\x20)\x0a\x0a\x09#ifdef\x20USE_LIGHTMAP\x0a\x0a\x09\x09vec4\x20lightMapTexel\x20=\x20texture2D(\x20lightMap,\x20vLightMapUv\x20);\x0a\x09\x09vec3\x20lightMapIrradiance\x20=\x20lightMapTexel.rgb\x20*\x20lightMapIntensity;\x0a\x0a\x09\x09irradiance\x20+=\x20lightMapIrradiance;\x0a\x0a\x09#endif\x0a\x0a\x09#if\x20defined(\x20USE_ENVMAP\x20)\x20&&\x20defined(\x20STANDARD\x20)\x20&&\x20defined(\x20ENVMAP_TYPE_CUBE_UV\x20)\x0a\x0a\x09\x09iblIrradiance\x20+=\x20getIBLIrradiance(\x20geometryNormal\x20);\x0a\x0a\x09#endif\x0a\x0a#endif\x0a\x0a#if\x20defined(\x20USE_ENVMAP\x20)\x20&&\x20defined(\x20RE_IndirectSpecular\x20)\x0a\x0a\x09#ifdef\x20USE_ANISOTROPY\x0a\x0a\x09\x09radiance\x20+=\x20getIBLAnisotropyRadiance(\x20geometryViewDir,\x20geometryNormal,\x20material.roughness,\x20material.anisotropyB,\x20material.anisotropy\x20);\x0a\x0a\x09#else\x0a\x0a\x09\x09radiance\x20+=\x20getIBLRadiance(\x20geometryViewDir,\x20geometryNormal,\x20material.roughness\x20);\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_CLEARCOAT\x0a\x0a\x09\x09clearcoatRadiance\x20+=\x20getIBLRadiance(\x20geometryViewDir,\x20geometryClearcoatNormal,\x20material.clearcoatRoughness\x20);\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'lights_fragment_end': '\x0a#if\x20defined(\x20RE_IndirectDiffuse\x20)\x0a\x0a\x09RE_IndirectDiffuse(\x20irradiance,\x20geometryPosition,\x20geometryNormal,\x20geometryViewDir,\x20geometryClearcoatNormal,\x20material,\x20reflectedLight\x20);\x0a\x0a#endif\x0a\x0a#if\x20defined(\x20RE_IndirectSpecular\x20)\x0a\x0a\x09RE_IndirectSpecular(\x20radiance,\x20iblIrradiance,\x20clearcoatRadiance,\x20geometryPosition,\x20geometryNormal,\x20geometryViewDir,\x20geometryClearcoatNormal,\x20material,\x20reflectedLight\x20);\x0a\x0a#endif\x0a',
            'logdepthbuf_fragment': '\x0a#if\x20defined(\x20USE_LOGDEPTHBUF\x20)\x20&&\x20defined(\x20USE_LOGDEPTHBUF_EXT\x20)\x0a\x0a\x09//\x20Doing\x20a\x20strict\x20comparison\x20with\x20==\x201.0\x20can\x20cause\x20noise\x20artifacts\x0a\x09//\x20on\x20some\x20platforms.\x20See\x20issue\x20#17623.\x0a\x09gl_FragDepthEXT\x20=\x20vIsPerspective\x20==\x200.0\x20?\x20gl_FragCoord.z\x20:\x20log2(\x20vFragDepth\x20)\x20*\x20logDepthBufFC\x20*\x200.5;\x0a\x0a#endif\x0a',
            'logdepthbuf_pars_fragment': '\x0a#if\x20defined(\x20USE_LOGDEPTHBUF\x20)\x20&&\x20defined(\x20USE_LOGDEPTHBUF_EXT\x20)\x0a\x0a\x09uniform\x20float\x20logDepthBufFC;\x0a\x09varying\x20float\x20vFragDepth;\x0a\x09varying\x20float\x20vIsPerspective;\x0a\x0a#endif\x0a',
            'logdepthbuf_pars_vertex': '\x0a#ifdef\x20USE_LOGDEPTHBUF\x0a\x0a\x09#ifdef\x20USE_LOGDEPTHBUF_EXT\x0a\x0a\x09\x09varying\x20float\x20vFragDepth;\x0a\x09\x09varying\x20float\x20vIsPerspective;\x0a\x0a\x09#else\x0a\x0a\x09\x09uniform\x20float\x20logDepthBufFC;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'logdepthbuf_vertex': '\x0a#ifdef\x20USE_LOGDEPTHBUF\x0a\x0a\x09#ifdef\x20USE_LOGDEPTHBUF_EXT\x0a\x0a\x09\x09vFragDepth\x20=\x201.0\x20+\x20gl_Position.w;\x0a\x09\x09vIsPerspective\x20=\x20float(\x20isPerspectiveMatrix(\x20projectionMatrix\x20)\x20);\x0a\x0a\x09#else\x0a\x0a\x09\x09if\x20(\x20isPerspectiveMatrix(\x20projectionMatrix\x20)\x20)\x20{\x0a\x0a\x09\x09\x09gl_Position.z\x20=\x20log2(\x20max(\x20EPSILON,\x20gl_Position.w\x20+\x201.0\x20)\x20)\x20*\x20logDepthBufFC\x20-\x201.0;\x0a\x0a\x09\x09\x09gl_Position.z\x20*=\x20gl_Position.w;\x0a\x0a\x09\x09}\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'map_fragment': '\x0a#ifdef\x20USE_MAP\x0a\x0a\x09vec4\x20sampledDiffuseColor\x20=\x20texture2D(\x20map,\x20vMapUv\x20);\x0a\x0a\x09#ifdef\x20DECODE_VIDEO_TEXTURE\x0a\x0a\x09\x09//\x20use\x20inline\x20sRGB\x20decode\x20until\x20browsers\x20properly\x20support\x20SRGB8_APLHA8\x20with\x20video\x20textures\x0a\x0a\x09\x09sampledDiffuseColor\x20=\x20vec4(\x20mix(\x20pow(\x20sampledDiffuseColor.rgb\x20*\x200.9478672986\x20+\x20vec3(\x200.0521327014\x20),\x20vec3(\x202.4\x20)\x20),\x20sampledDiffuseColor.rgb\x20*\x200.0773993808,\x20vec3(\x20lessThanEqual(\x20sampledDiffuseColor.rgb,\x20vec3(\x200.04045\x20)\x20)\x20)\x20),\x20sampledDiffuseColor.w\x20);\x0a\x09\x0a\x09#endif\x0a\x0a\x09diffuseColor\x20*=\x20sampledDiffuseColor;\x0a\x0a#endif\x0a',
            'map_pars_fragment': '\x0a#ifdef\x20USE_MAP\x0a\x0a\x09uniform\x20sampler2D\x20map;\x0a\x0a#endif\x0a',
            'map_particle_fragment': '\x0a#if\x20defined(\x20USE_MAP\x20)\x20||\x20defined(\x20USE_ALPHAMAP\x20)\x0a\x0a\x09#if\x20defined(\x20USE_POINTS_UV\x20)\x0a\x0a\x09\x09vec2\x20uv\x20=\x20vUv;\x0a\x0a\x09#else\x0a\x0a\x09\x09vec2\x20uv\x20=\x20(\x20uvTransform\x20*\x20vec3(\x20gl_PointCoord.x,\x201.0\x20-\x20gl_PointCoord.y,\x201\x20)\x20).xy;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_MAP\x0a\x0a\x09diffuseColor\x20*=\x20texture2D(\x20map,\x20uv\x20);\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_ALPHAMAP\x0a\x0a\x09diffuseColor.a\x20*=\x20texture2D(\x20alphaMap,\x20uv\x20).g;\x0a\x0a#endif\x0a',
            'map_particle_pars_fragment': '\x0a#if\x20defined(\x20USE_POINTS_UV\x20)\x0a\x0a\x09varying\x20vec2\x20vUv;\x0a\x0a#else\x0a\x0a\x09#if\x20defined(\x20USE_MAP\x20)\x20||\x20defined(\x20USE_ALPHAMAP\x20)\x0a\x0a\x09\x09uniform\x20mat3\x20uvTransform;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_MAP\x0a\x0a\x09uniform\x20sampler2D\x20map;\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_ALPHAMAP\x0a\x0a\x09uniform\x20sampler2D\x20alphaMap;\x0a\x0a#endif\x0a',
            'metalnessmap_fragment': '\x0afloat\x20metalnessFactor\x20=\x20metalness;\x0a\x0a#ifdef\x20USE_METALNESSMAP\x0a\x0a\x09vec4\x20texelMetalness\x20=\x20texture2D(\x20metalnessMap,\x20vMetalnessMapUv\x20);\x0a\x0a\x09//\x20reads\x20channel\x20B,\x20compatible\x20with\x20a\x20combined\x20OcclusionRoughnessMetallic\x20(RGB)\x20texture\x0a\x09metalnessFactor\x20*=\x20texelMetalness.b;\x0a\x0a#endif\x0a',
            'metalnessmap_pars_fragment': '\x0a#ifdef\x20USE_METALNESSMAP\x0a\x0a\x09uniform\x20sampler2D\x20metalnessMap;\x0a\x0a#endif\x0a',
            'morphcolor_vertex': '\x0a#if\x20defined(\x20USE_MORPHCOLORS\x20)\x20&&\x20defined(\x20MORPHTARGETS_TEXTURE\x20)\x0a\x0a\x09//\x20morphTargetBaseInfluence\x20is\x20set\x20based\x20on\x20BufferGeometry.morphTargetsRelative\x20value:\x0a\x09//\x20When\x20morphTargetsRelative\x20is\x20false,\x20this\x20is\x20set\x20to\x201\x20-\x20sum(influences);\x20this\x20results\x20in\x20normal\x20=\x20sum((target\x20-\x20base)\x20*\x20influence)\x0a\x09//\x20When\x20morphTargetsRelative\x20is\x20true,\x20this\x20is\x20set\x20to\x201;\x20as\x20a\x20result,\x20all\x20morph\x20targets\x20are\x20simply\x20added\x20to\x20the\x20base\x20after\x20weighting\x0a\x09vColor\x20*=\x20morphTargetBaseInfluence;\x0a\x0a\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20MORPHTARGETS_COUNT;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09#if\x20defined(\x20USE_COLOR_ALPHA\x20)\x0a\x0a\x09\x09\x09if\x20(\x20morphTargetInfluences[\x20i\x20]\x20!=\x200.0\x20)\x20vColor\x20+=\x20getMorph(\x20gl_VertexID,\x20i,\x202\x20)\x20*\x20morphTargetInfluences[\x20i\x20];\x0a\x0a\x09\x09#elif\x20defined(\x20USE_COLOR\x20)\x0a\x0a\x09\x09\x09if\x20(\x20morphTargetInfluences[\x20i\x20]\x20!=\x200.0\x20)\x20vColor\x20+=\x20getMorph(\x20gl_VertexID,\x20i,\x202\x20).rgb\x20*\x20morphTargetInfluences[\x20i\x20];\x0a\x0a\x09\x09#endif\x0a\x0a\x09}\x0a\x0a#endif\x0a',
            'morphnormal_vertex': '\x0a#ifdef\x20USE_MORPHNORMALS\x0a\x0a\x09//\x20morphTargetBaseInfluence\x20is\x20set\x20based\x20on\x20BufferGeometry.morphTargetsRelative\x20value:\x0a\x09//\x20When\x20morphTargetsRelative\x20is\x20false,\x20this\x20is\x20set\x20to\x201\x20-\x20sum(influences);\x20this\x20results\x20in\x20normal\x20=\x20sum((target\x20-\x20base)\x20*\x20influence)\x0a\x09//\x20When\x20morphTargetsRelative\x20is\x20true,\x20this\x20is\x20set\x20to\x201;\x20as\x20a\x20result,\x20all\x20morph\x20targets\x20are\x20simply\x20added\x20to\x20the\x20base\x20after\x20weighting\x0a\x09objectNormal\x20*=\x20morphTargetBaseInfluence;\x0a\x0a\x09#ifdef\x20MORPHTARGETS_TEXTURE\x0a\x0a\x09\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20MORPHTARGETS_COUNT;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09\x09if\x20(\x20morphTargetInfluences[\x20i\x20]\x20!=\x200.0\x20)\x20objectNormal\x20+=\x20getMorph(\x20gl_VertexID,\x20i,\x201\x20).xyz\x20*\x20morphTargetInfluences[\x20i\x20];\x0a\x0a\x09\x09}\x0a\x0a\x09#else\x0a\x0a\x09\x09objectNormal\x20+=\x20morphNormal0\x20*\x20morphTargetInfluences[\x200\x20];\x0a\x09\x09objectNormal\x20+=\x20morphNormal1\x20*\x20morphTargetInfluences[\x201\x20];\x0a\x09\x09objectNormal\x20+=\x20morphNormal2\x20*\x20morphTargetInfluences[\x202\x20];\x0a\x09\x09objectNormal\x20+=\x20morphNormal3\x20*\x20morphTargetInfluences[\x203\x20];\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'morphtarget_pars_vertex': '\x0a#ifdef\x20USE_MORPHTARGETS\x0a\x0a\x09uniform\x20float\x20morphTargetBaseInfluence;\x0a\x0a\x09#ifdef\x20MORPHTARGETS_TEXTURE\x0a\x0a\x09\x09uniform\x20float\x20morphTargetInfluences[\x20MORPHTARGETS_COUNT\x20];\x0a\x09\x09uniform\x20sampler2DArray\x20morphTargetsTexture;\x0a\x09\x09uniform\x20ivec2\x20morphTargetsTextureSize;\x0a\x0a\x09\x09vec4\x20getMorph(\x20const\x20in\x20int\x20vertexIndex,\x20const\x20in\x20int\x20morphTargetIndex,\x20const\x20in\x20int\x20offset\x20)\x20{\x0a\x0a\x09\x09\x09int\x20texelIndex\x20=\x20vertexIndex\x20*\x20MORPHTARGETS_TEXTURE_STRIDE\x20+\x20offset;\x0a\x09\x09\x09int\x20y\x20=\x20texelIndex\x20/\x20morphTargetsTextureSize.x;\x0a\x09\x09\x09int\x20x\x20=\x20texelIndex\x20-\x20y\x20*\x20morphTargetsTextureSize.x;\x0a\x0a\x09\x09\x09ivec3\x20morphUV\x20=\x20ivec3(\x20x,\x20y,\x20morphTargetIndex\x20);\x0a\x09\x09\x09return\x20texelFetch(\x20morphTargetsTexture,\x20morphUV,\x200\x20);\x0a\x0a\x09\x09}\x0a\x0a\x09#else\x0a\x0a\x09\x09#ifndef\x20USE_MORPHNORMALS\x0a\x0a\x09\x09\x09uniform\x20float\x20morphTargetInfluences[\x208\x20];\x0a\x0a\x09\x09#else\x0a\x0a\x09\x09\x09uniform\x20float\x20morphTargetInfluences[\x204\x20];\x0a\x0a\x09\x09#endif\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'morphtarget_vertex': '\x0a#ifdef\x20USE_MORPHTARGETS\x0a\x0a\x09//\x20morphTargetBaseInfluence\x20is\x20set\x20based\x20on\x20BufferGeometry.morphTargetsRelative\x20value:\x0a\x09//\x20When\x20morphTargetsRelative\x20is\x20false,\x20this\x20is\x20set\x20to\x201\x20-\x20sum(influences);\x20this\x20results\x20in\x20position\x20=\x20sum((target\x20-\x20base)\x20*\x20influence)\x0a\x09//\x20When\x20morphTargetsRelative\x20is\x20true,\x20this\x20is\x20set\x20to\x201;\x20as\x20a\x20result,\x20all\x20morph\x20targets\x20are\x20simply\x20added\x20to\x20the\x20base\x20after\x20weighting\x0a\x09transformed\x20*=\x20morphTargetBaseInfluence;\x0a\x0a\x09#ifdef\x20MORPHTARGETS_TEXTURE\x0a\x0a\x09\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20MORPHTARGETS_COUNT;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09\x09if\x20(\x20morphTargetInfluences[\x20i\x20]\x20!=\x200.0\x20)\x20transformed\x20+=\x20getMorph(\x20gl_VertexID,\x20i,\x200\x20).xyz\x20*\x20morphTargetInfluences[\x20i\x20];\x0a\x0a\x09\x09}\x0a\x0a\x09#else\x0a\x0a\x09\x09transformed\x20+=\x20morphTarget0\x20*\x20morphTargetInfluences[\x200\x20];\x0a\x09\x09transformed\x20+=\x20morphTarget1\x20*\x20morphTargetInfluences[\x201\x20];\x0a\x09\x09transformed\x20+=\x20morphTarget2\x20*\x20morphTargetInfluences[\x202\x20];\x0a\x09\x09transformed\x20+=\x20morphTarget3\x20*\x20morphTargetInfluences[\x203\x20];\x0a\x0a\x09\x09#ifndef\x20USE_MORPHNORMALS\x0a\x0a\x09\x09\x09transformed\x20+=\x20morphTarget4\x20*\x20morphTargetInfluences[\x204\x20];\x0a\x09\x09\x09transformed\x20+=\x20morphTarget5\x20*\x20morphTargetInfluences[\x205\x20];\x0a\x09\x09\x09transformed\x20+=\x20morphTarget6\x20*\x20morphTargetInfluences[\x206\x20];\x0a\x09\x09\x09transformed\x20+=\x20morphTarget7\x20*\x20morphTargetInfluences[\x207\x20];\x0a\x0a\x09\x09#endif\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'normal_fragment_begin': '\x0afloat\x20faceDirection\x20=\x20gl_FrontFacing\x20?\x201.0\x20:\x20-\x201.0;\x0a\x0a#ifdef\x20FLAT_SHADED\x0a\x0a\x09vec3\x20fdx\x20=\x20dFdx(\x20vViewPosition\x20);\x0a\x09vec3\x20fdy\x20=\x20dFdy(\x20vViewPosition\x20);\x0a\x09vec3\x20normal\x20=\x20normalize(\x20cross(\x20fdx,\x20fdy\x20)\x20);\x0a\x0a#else\x0a\x0a\x09vec3\x20normal\x20=\x20normalize(\x20vNormal\x20);\x0a\x0a\x09#ifdef\x20DOUBLE_SIDED\x0a\x0a\x09\x09normal\x20*=\x20faceDirection;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a\x0a#if\x20defined(\x20USE_NORMALMAP_TANGENTSPACE\x20)\x20||\x20defined(\x20USE_CLEARCOAT_NORMALMAP\x20)\x20||\x20defined(\x20USE_ANISOTROPY\x20)\x0a\x0a\x09#ifdef\x20USE_TANGENT\x0a\x0a\x09\x09mat3\x20tbn\x20=\x20mat3(\x20normalize(\x20vTangent\x20),\x20normalize(\x20vBitangent\x20),\x20normal\x20);\x0a\x0a\x09#else\x0a\x0a\x09\x09mat3\x20tbn\x20=\x20getTangentFrame(\x20-\x20vViewPosition,\x20normal,\x0a\x09\x09#if\x20defined(\x20USE_NORMALMAP\x20)\x0a\x09\x09\x09vNormalMapUv\x0a\x09\x09#elif\x20defined(\x20USE_CLEARCOAT_NORMALMAP\x20)\x0a\x09\x09\x09vClearcoatNormalMapUv\x0a\x09\x09#else\x0a\x09\x09\x09vUv\x0a\x09\x09#endif\x0a\x09\x09);\x0a\x0a\x09#endif\x0a\x0a\x09#if\x20defined(\x20DOUBLE_SIDED\x20)\x20&&\x20!\x20defined(\x20FLAT_SHADED\x20)\x0a\x0a\x09\x09tbn[0]\x20*=\x20faceDirection;\x0a\x09\x09tbn[1]\x20*=\x20faceDirection;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_CLEARCOAT_NORMALMAP\x0a\x0a\x09#ifdef\x20USE_TANGENT\x0a\x0a\x09\x09mat3\x20tbn2\x20=\x20mat3(\x20normalize(\x20vTangent\x20),\x20normalize(\x20vBitangent\x20),\x20normal\x20);\x0a\x0a\x09#else\x0a\x0a\x09\x09mat3\x20tbn2\x20=\x20getTangentFrame(\x20-\x20vViewPosition,\x20normal,\x20vClearcoatNormalMapUv\x20);\x0a\x0a\x09#endif\x0a\x0a\x09#if\x20defined(\x20DOUBLE_SIDED\x20)\x20&&\x20!\x20defined(\x20FLAT_SHADED\x20)\x0a\x0a\x09\x09tbn2[0]\x20*=\x20faceDirection;\x0a\x09\x09tbn2[1]\x20*=\x20faceDirection;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a\x0a//\x20non\x20perturbed\x20normal\x20for\x20clearcoat\x20among\x20others\x0a\x0avec3\x20nonPerturbedNormal\x20=\x20normal;\x0a\x0a',
            'normal_fragment_maps': '\x0a\x0a#ifdef\x20USE_NORMALMAP_OBJECTSPACE\x0a\x0a\x09normal\x20=\x20texture2D(\x20normalMap,\x20vNormalMapUv\x20).xyz\x20*\x202.0\x20-\x201.0;\x20//\x20overrides\x20both\x20flatShading\x20and\x20attribute\x20normals\x0a\x0a\x09#ifdef\x20FLIP_SIDED\x0a\x0a\x09\x09normal\x20=\x20-\x20normal;\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20DOUBLE_SIDED\x0a\x0a\x09\x09normal\x20=\x20normal\x20*\x20faceDirection;\x0a\x0a\x09#endif\x0a\x0a\x09normal\x20=\x20normalize(\x20normalMatrix\x20*\x20normal\x20);\x0a\x0a#elif\x20defined(\x20USE_NORMALMAP_TANGENTSPACE\x20)\x0a\x0a\x09vec3\x20mapN\x20=\x20texture2D(\x20normalMap,\x20vNormalMapUv\x20).xyz\x20*\x202.0\x20-\x201.0;\x0a\x09mapN.xy\x20*=\x20normalScale;\x0a\x0a\x09normal\x20=\x20normalize(\x20tbn\x20*\x20mapN\x20);\x0a\x0a#elif\x20defined(\x20USE_BUMPMAP\x20)\x0a\x0a\x09normal\x20=\x20perturbNormalArb(\x20-\x20vViewPosition,\x20normal,\x20dHdxy_fwd(),\x20faceDirection\x20);\x0a\x0a#endif\x0a',
            'normal_pars_fragment': '\x0a#ifndef\x20FLAT_SHADED\x0a\x0a\x09varying\x20vec3\x20vNormal;\x0a\x0a\x09#ifdef\x20USE_TANGENT\x0a\x0a\x09\x09varying\x20vec3\x20vTangent;\x0a\x09\x09varying\x20vec3\x20vBitangent;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'normal_pars_vertex': '\x0a#ifndef\x20FLAT_SHADED\x0a\x0a\x09varying\x20vec3\x20vNormal;\x0a\x0a\x09#ifdef\x20USE_TANGENT\x0a\x0a\x09\x09varying\x20vec3\x20vTangent;\x0a\x09\x09varying\x20vec3\x20vBitangent;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'normal_vertex': '\x0a#ifndef\x20FLAT_SHADED\x20//\x20normal\x20is\x20computed\x20with\x20derivatives\x20when\x20FLAT_SHADED\x0a\x0a\x09vNormal\x20=\x20normalize(\x20transformedNormal\x20);\x0a\x0a\x09#ifdef\x20USE_TANGENT\x0a\x0a\x09\x09vTangent\x20=\x20normalize(\x20transformedTangent\x20);\x0a\x09\x09vBitangent\x20=\x20normalize(\x20cross(\x20vNormal,\x20vTangent\x20)\x20*\x20tangent.w\x20);\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'normalmap_pars_fragment': '\x0a#ifdef\x20USE_NORMALMAP\x0a\x0a\x09uniform\x20sampler2D\x20normalMap;\x0a\x09uniform\x20vec2\x20normalScale;\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_NORMALMAP_OBJECTSPACE\x0a\x0a\x09uniform\x20mat3\x20normalMatrix;\x0a\x0a#endif\x0a\x0a#if\x20!\x20defined\x20(\x20USE_TANGENT\x20)\x20&&\x20(\x20defined\x20(\x20USE_NORMALMAP_TANGENTSPACE\x20)\x20||\x20defined\x20(\x20USE_CLEARCOAT_NORMALMAP\x20)\x20||\x20defined(\x20USE_ANISOTROPY\x20)\x20)\x0a\x0a\x09//\x20Normal\x20Mapping\x20Without\x20Precomputed\x20Tangents\x0a\x09//\x20http://www.thetenthplanet.de/archives/1180\x0a\x0a\x09mat3\x20getTangentFrame(\x20vec3\x20eye_pos,\x20vec3\x20surf_norm,\x20vec2\x20uv\x20)\x20{\x0a\x0a\x09\x09vec3\x20q0\x20=\x20dFdx(\x20eye_pos.xyz\x20);\x0a\x09\x09vec3\x20q1\x20=\x20dFdy(\x20eye_pos.xyz\x20);\x0a\x09\x09vec2\x20st0\x20=\x20dFdx(\x20uv.st\x20);\x0a\x09\x09vec2\x20st1\x20=\x20dFdy(\x20uv.st\x20);\x0a\x0a\x09\x09vec3\x20N\x20=\x20surf_norm;\x20//\x20normalized\x0a\x0a\x09\x09vec3\x20q1perp\x20=\x20cross(\x20q1,\x20N\x20);\x0a\x09\x09vec3\x20q0perp\x20=\x20cross(\x20N,\x20q0\x20);\x0a\x0a\x09\x09vec3\x20T\x20=\x20q1perp\x20*\x20st0.x\x20+\x20q0perp\x20*\x20st1.x;\x0a\x09\x09vec3\x20B\x20=\x20q1perp\x20*\x20st0.y\x20+\x20q0perp\x20*\x20st1.y;\x0a\x0a\x09\x09float\x20det\x20=\x20max(\x20dot(\x20T,\x20T\x20),\x20dot(\x20B,\x20B\x20)\x20);\x0a\x09\x09float\x20scale\x20=\x20(\x20det\x20==\x200.0\x20)\x20?\x200.0\x20:\x20inversesqrt(\x20det\x20);\x0a\x0a\x09\x09return\x20mat3(\x20T\x20*\x20scale,\x20B\x20*\x20scale,\x20N\x20);\x0a\x0a\x09}\x0a\x0a#endif\x0a',
            'clearcoat_normal_fragment_begin': '\x0a#ifdef\x20USE_CLEARCOAT\x0a\x0a\x09vec3\x20clearcoatNormal\x20=\x20nonPerturbedNormal;\x0a\x0a#endif\x0a',
            'clearcoat_normal_fragment_maps': '\x0a#ifdef\x20USE_CLEARCOAT_NORMALMAP\x0a\x0a\x09vec3\x20clearcoatMapN\x20=\x20texture2D(\x20clearcoatNormalMap,\x20vClearcoatNormalMapUv\x20).xyz\x20*\x202.0\x20-\x201.0;\x0a\x09clearcoatMapN.xy\x20*=\x20clearcoatNormalScale;\x0a\x0a\x09clearcoatNormal\x20=\x20normalize(\x20tbn2\x20*\x20clearcoatMapN\x20);\x0a\x0a#endif\x0a',
            'clearcoat_pars_fragment': '\x0a\x0a#ifdef\x20USE_CLEARCOATMAP\x0a\x0a\x09uniform\x20sampler2D\x20clearcoatMap;\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_CLEARCOAT_NORMALMAP\x0a\x0a\x09uniform\x20sampler2D\x20clearcoatNormalMap;\x0a\x09uniform\x20vec2\x20clearcoatNormalScale;\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_CLEARCOAT_ROUGHNESSMAP\x0a\x0a\x09uniform\x20sampler2D\x20clearcoatRoughnessMap;\x0a\x0a#endif\x0a',
            'iridescence_pars_fragment': '\x0a\x0a#ifdef\x20USE_IRIDESCENCEMAP\x0a\x0a\x09uniform\x20sampler2D\x20iridescenceMap;\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_IRIDESCENCE_THICKNESSMAP\x0a\x0a\x09uniform\x20sampler2D\x20iridescenceThicknessMap;\x0a\x0a#endif\x0a',
            'opaque_fragment': '\x0a#ifdef\x20OPAQUE\x0adiffuseColor.a\x20=\x201.0;\x0a#endif\x0a\x0a#ifdef\x20USE_TRANSMISSION\x0adiffuseColor.a\x20*=\x20material.transmissionAlpha;\x0a#endif\x0a\x0agl_FragColor\x20=\x20vec4(\x20outgoingLight,\x20diffuseColor.a\x20);\x0a',
            'packing': '\x0avec3\x20packNormalToRGB(\x20const\x20in\x20vec3\x20normal\x20)\x20{\x0a\x09return\x20normalize(\x20normal\x20)\x20*\x200.5\x20+\x200.5;\x0a}\x0a\x0avec3\x20unpackRGBToNormal(\x20const\x20in\x20vec3\x20rgb\x20)\x20{\x0a\x09return\x202.0\x20*\x20rgb.xyz\x20-\x201.0;\x0a}\x0a\x0aconst\x20float\x20PackUpscale\x20=\x20256.\x20/\x20255.;\x20//\x20fraction\x20->\x200..1\x20(including\x201)\x0aconst\x20float\x20UnpackDownscale\x20=\x20255.\x20/\x20256.;\x20//\x200..1\x20->\x20fraction\x20(excluding\x201)\x0a\x0aconst\x20vec3\x20PackFactors\x20=\x20vec3(\x20256.\x20*\x20256.\x20*\x20256.,\x20256.\x20*\x20256.,\x20256.\x20);\x0aconst\x20vec4\x20UnpackFactors\x20=\x20UnpackDownscale\x20/\x20vec4(\x20PackFactors,\x201.\x20);\x0a\x0aconst\x20float\x20ShiftRight8\x20=\x201.\x20/\x20256.;\x0a\x0avec4\x20packDepthToRGBA(\x20const\x20in\x20float\x20v\x20)\x20{\x0a\x09vec4\x20r\x20=\x20vec4(\x20fract(\x20v\x20*\x20PackFactors\x20),\x20v\x20);\x0a\x09r.yzw\x20-=\x20r.xyz\x20*\x20ShiftRight8;\x20//\x20tidy\x20overflow\x0a\x09return\x20r\x20*\x20PackUpscale;\x0a}\x0a\x0afloat\x20unpackRGBAToDepth(\x20const\x20in\x20vec4\x20v\x20)\x20{\x0a\x09return\x20dot(\x20v,\x20UnpackFactors\x20);\x0a}\x0a\x0avec2\x20packDepthToRG(\x20in\x20highp\x20float\x20v\x20)\x20{\x0a\x09return\x20packDepthToRGBA(\x20v\x20).yx;\x0a}\x0a\x0afloat\x20unpackRGToDepth(\x20const\x20in\x20highp\x20vec2\x20v\x20)\x20{\x0a\x09return\x20unpackRGBAToDepth(\x20vec4(\x20v.xy,\x200.0,\x200.0\x20)\x20);\x0a}\x0a\x0avec4\x20pack2HalfToRGBA(\x20vec2\x20v\x20)\x20{\x0a\x09vec4\x20r\x20=\x20vec4(\x20v.x,\x20fract(\x20v.x\x20*\x20255.0\x20),\x20v.y,\x20fract(\x20v.y\x20*\x20255.0\x20)\x20);\x0a\x09return\x20vec4(\x20r.x\x20-\x20r.y\x20/\x20255.0,\x20r.y,\x20r.z\x20-\x20r.w\x20/\x20255.0,\x20r.w\x20);\x0a}\x0a\x0avec2\x20unpackRGBATo2Half(\x20vec4\x20v\x20)\x20{\x0a\x09return\x20vec2(\x20v.x\x20+\x20(\x20v.y\x20/\x20255.0\x20),\x20v.z\x20+\x20(\x20v.w\x20/\x20255.0\x20)\x20);\x0a}\x0a\x0a//\x20NOTE:\x20viewZ,\x20the\x20z-coordinate\x20in\x20camera\x20space,\x20is\x20negative\x20for\x20points\x20in\x20front\x20of\x20the\x20camera\x0a\x0afloat\x20viewZToOrthographicDepth(\x20const\x20in\x20float\x20viewZ,\x20const\x20in\x20float\x20near,\x20const\x20in\x20float\x20far\x20)\x20{\x0a\x09//\x20-near\x20maps\x20to\x200;\x20-far\x20maps\x20to\x201\x0a\x09return\x20(\x20viewZ\x20+\x20near\x20)\x20/\x20(\x20near\x20-\x20far\x20);\x0a}\x0a\x0afloat\x20orthographicDepthToViewZ(\x20const\x20in\x20float\x20depth,\x20const\x20in\x20float\x20near,\x20const\x20in\x20float\x20far\x20)\x20{\x0a\x09//\x20maps\x20orthographic\x20depth\x20in\x20[\x200,\x201\x20]\x20to\x20viewZ\x0a\x09return\x20depth\x20*\x20(\x20near\x20-\x20far\x20)\x20-\x20near;\x0a}\x0a\x0a//\x20NOTE:\x20https://twitter.com/gonnavis/status/1377183786949959682\x0a\x0afloat\x20viewZToPerspectiveDepth(\x20const\x20in\x20float\x20viewZ,\x20const\x20in\x20float\x20near,\x20const\x20in\x20float\x20far\x20)\x20{\x0a\x09//\x20-near\x20maps\x20to\x200;\x20-far\x20maps\x20to\x201\x0a\x09return\x20(\x20(\x20near\x20+\x20viewZ\x20)\x20*\x20far\x20)\x20/\x20(\x20(\x20far\x20-\x20near\x20)\x20*\x20viewZ\x20);\x0a}\x0a\x0afloat\x20perspectiveDepthToViewZ(\x20const\x20in\x20float\x20depth,\x20const\x20in\x20float\x20near,\x20const\x20in\x20float\x20far\x20)\x20{\x0a\x09//\x20maps\x20perspective\x20depth\x20in\x20[\x200,\x201\x20]\x20to\x20viewZ\x0a\x09return\x20(\x20near\x20*\x20far\x20)\x20/\x20(\x20(\x20far\x20-\x20near\x20)\x20*\x20depth\x20-\x20far\x20);\x0a}\x0a',
            'premultiplied_alpha_fragment': '\x0a#ifdef\x20PREMULTIPLIED_ALPHA\x0a\x0a\x09//\x20Get\x20get\x20normal\x20blending\x20with\x20premultipled,\x20use\x20with\x20CustomBlending,\x20OneFactor,\x20OneMinusSrcAlphaFactor,\x20AddEquation.\x0a\x09gl_FragColor.rgb\x20*=\x20gl_FragColor.a;\x0a\x0a#endif\x0a',
            'project_vertex': '\x0avec4\x20mvPosition\x20=\x20vec4(\x20transformed,\x201.0\x20);\x0a\x0a#ifdef\x20USE_BATCHING\x0a\x0a\x09mvPosition\x20=\x20batchingMatrix\x20*\x20mvPosition;\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_INSTANCING\x0a\x0a\x09mvPosition\x20=\x20instanceMatrix\x20*\x20mvPosition;\x0a\x0a#endif\x0a\x0amvPosition\x20=\x20modelViewMatrix\x20*\x20mvPosition;\x0a\x0agl_Position\x20=\x20projectionMatrix\x20*\x20mvPosition;\x0a',
            'dithering_fragment': '\x0a#ifdef\x20DITHERING\x0a\x0a\x09gl_FragColor.rgb\x20=\x20dithering(\x20gl_FragColor.rgb\x20);\x0a\x0a#endif\x0a',
            'dithering_pars_fragment': '\x0a#ifdef\x20DITHERING\x0a\x0a\x09//\x20based\x20on\x20https://www.shadertoy.com/view/MslGR8\x0a\x09vec3\x20dithering(\x20vec3\x20color\x20)\x20{\x0a\x09\x09//Calculate\x20grid\x20position\x0a\x09\x09float\x20grid_position\x20=\x20rand(\x20gl_FragCoord.xy\x20);\x0a\x0a\x09\x09//Shift\x20the\x20individual\x20colors\x20differently,\x20thus\x20making\x20it\x20even\x20harder\x20to\x20see\x20the\x20dithering\x20pattern\x0a\x09\x09vec3\x20dither_shift_RGB\x20=\x20vec3(\x200.25\x20/\x20255.0,\x20-0.25\x20/\x20255.0,\x200.25\x20/\x20255.0\x20);\x0a\x0a\x09\x09//modify\x20shift\x20according\x20to\x20grid\x20position.\x0a\x09\x09dither_shift_RGB\x20=\x20mix(\x202.0\x20*\x20dither_shift_RGB,\x20-2.0\x20*\x20dither_shift_RGB,\x20grid_position\x20);\x0a\x0a\x09\x09//shift\x20the\x20color\x20by\x20dither_shift\x0a\x09\x09return\x20color\x20+\x20dither_shift_RGB;\x0a\x09}\x0a\x0a#endif\x0a',
            'roughnessmap_fragment': '\x0afloat\x20roughnessFactor\x20=\x20roughness;\x0a\x0a#ifdef\x20USE_ROUGHNESSMAP\x0a\x0a\x09vec4\x20texelRoughness\x20=\x20texture2D(\x20roughnessMap,\x20vRoughnessMapUv\x20);\x0a\x0a\x09//\x20reads\x20channel\x20G,\x20compatible\x20with\x20a\x20combined\x20OcclusionRoughnessMetallic\x20(RGB)\x20texture\x0a\x09roughnessFactor\x20*=\x20texelRoughness.g;\x0a\x0a#endif\x0a',
            'roughnessmap_pars_fragment': '\x0a#ifdef\x20USE_ROUGHNESSMAP\x0a\x0a\x09uniform\x20sampler2D\x20roughnessMap;\x0a\x0a#endif\x0a',
            'shadowmap_pars_fragment': '\x0a#if\x20NUM_SPOT_LIGHT_COORDS\x20>\x200\x0a\x0a\x09varying\x20vec4\x20vSpotLightCoord[\x20NUM_SPOT_LIGHT_COORDS\x20];\x0a\x0a#endif\x0a\x0a#if\x20NUM_SPOT_LIGHT_MAPS\x20>\x200\x0a\x0a\x09uniform\x20sampler2D\x20spotLightMap[\x20NUM_SPOT_LIGHT_MAPS\x20];\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_SHADOWMAP\x0a\x0a\x09#if\x20NUM_DIR_LIGHT_SHADOWS\x20>\x200\x0a\x0a\x09\x09uniform\x20sampler2D\x20directionalShadowMap[\x20NUM_DIR_LIGHT_SHADOWS\x20];\x0a\x09\x09varying\x20vec4\x20vDirectionalShadowCoord[\x20NUM_DIR_LIGHT_SHADOWS\x20];\x0a\x0a\x09\x09struct\x20DirectionalLightShadow\x20{\x0a\x09\x09\x09float\x20shadowBias;\x0a\x09\x09\x09float\x20shadowNormalBias;\x0a\x09\x09\x09float\x20shadowRadius;\x0a\x09\x09\x09vec2\x20shadowMapSize;\x0a\x09\x09};\x0a\x0a\x09\x09uniform\x20DirectionalLightShadow\x20directionalLightShadows[\x20NUM_DIR_LIGHT_SHADOWS\x20];\x0a\x0a\x09#endif\x0a\x0a\x09#if\x20NUM_SPOT_LIGHT_SHADOWS\x20>\x200\x0a\x0a\x09\x09uniform\x20sampler2D\x20spotShadowMap[\x20NUM_SPOT_LIGHT_SHADOWS\x20];\x0a\x0a\x09\x09struct\x20SpotLightShadow\x20{\x0a\x09\x09\x09float\x20shadowBias;\x0a\x09\x09\x09float\x20shadowNormalBias;\x0a\x09\x09\x09float\x20shadowRadius;\x0a\x09\x09\x09vec2\x20shadowMapSize;\x0a\x09\x09};\x0a\x0a\x09\x09uniform\x20SpotLightShadow\x20spotLightShadows[\x20NUM_SPOT_LIGHT_SHADOWS\x20];\x0a\x0a\x09#endif\x0a\x0a\x09#if\x20NUM_POINT_LIGHT_SHADOWS\x20>\x200\x0a\x0a\x09\x09uniform\x20sampler2D\x20pointShadowMap[\x20NUM_POINT_LIGHT_SHADOWS\x20];\x0a\x09\x09varying\x20vec4\x20vPointShadowCoord[\x20NUM_POINT_LIGHT_SHADOWS\x20];\x0a\x0a\x09\x09struct\x20PointLightShadow\x20{\x0a\x09\x09\x09float\x20shadowBias;\x0a\x09\x09\x09float\x20shadowNormalBias;\x0a\x09\x09\x09float\x20shadowRadius;\x0a\x09\x09\x09vec2\x20shadowMapSize;\x0a\x09\x09\x09float\x20shadowCameraNear;\x0a\x09\x09\x09float\x20shadowCameraFar;\x0a\x09\x09};\x0a\x0a\x09\x09uniform\x20PointLightShadow\x20pointLightShadows[\x20NUM_POINT_LIGHT_SHADOWS\x20];\x0a\x0a\x09#endif\x0a\x0a\x09/*\x0a\x09#if\x20NUM_RECT_AREA_LIGHTS\x20>\x200\x0a\x0a\x09\x09//\x20TODO\x20(abelnation):\x20create\x20uniforms\x20for\x20area\x20light\x20shadows\x0a\x0a\x09#endif\x0a\x09*/\x0a\x0a\x09float\x20texture2DCompare(\x20sampler2D\x20depths,\x20vec2\x20uv,\x20float\x20compare\x20)\x20{\x0a\x0a\x09\x09return\x20step(\x20compare,\x20unpackRGBAToDepth(\x20texture2D(\x20depths,\x20uv\x20)\x20)\x20);\x0a\x0a\x09}\x0a\x0a\x09vec2\x20texture2DDistribution(\x20sampler2D\x20shadow,\x20vec2\x20uv\x20)\x20{\x0a\x0a\x09\x09return\x20unpackRGBATo2Half(\x20texture2D(\x20shadow,\x20uv\x20)\x20);\x0a\x0a\x09}\x0a\x0a\x09float\x20VSMShadow\x20(sampler2D\x20shadow,\x20vec2\x20uv,\x20float\x20compare\x20){\x0a\x0a\x09\x09float\x20occlusion\x20=\x201.0;\x0a\x0a\x09\x09vec2\x20distribution\x20=\x20texture2DDistribution(\x20shadow,\x20uv\x20);\x0a\x0a\x09\x09float\x20hard_shadow\x20=\x20step(\x20compare\x20,\x20distribution.x\x20);\x20//\x20Hard\x20Shadow\x0a\x0a\x09\x09if\x20(hard_shadow\x20!=\x201.0\x20)\x20{\x0a\x0a\x09\x09\x09float\x20distance\x20=\x20compare\x20-\x20distribution.x\x20;\x0a\x09\x09\x09float\x20variance\x20=\x20max(\x200.00000,\x20distribution.y\x20*\x20distribution.y\x20);\x0a\x09\x09\x09float\x20softness_probability\x20=\x20variance\x20/\x20(variance\x20+\x20distance\x20*\x20distance\x20);\x20//\x20Chebeyshevs\x20inequality\x0a\x09\x09\x09softness_probability\x20=\x20clamp(\x20(\x20softness_probability\x20-\x200.3\x20)\x20/\x20(\x200.95\x20-\x200.3\x20),\x200.0,\x201.0\x20);\x20//\x200.3\x20reduces\x20light\x20bleed\x0a\x09\x09\x09occlusion\x20=\x20clamp(\x20max(\x20hard_shadow,\x20softness_probability\x20),\x200.0,\x201.0\x20);\x0a\x0a\x09\x09}\x0a\x09\x09return\x20occlusion;\x0a\x0a\x09}\x0a\x0a\x09float\x20getShadow(\x20sampler2D\x20shadowMap,\x20vec2\x20shadowMapSize,\x20float\x20shadowBias,\x20float\x20shadowRadius,\x20vec4\x20shadowCoord\x20)\x20{\x0a\x0a\x09\x09float\x20shadow\x20=\x201.0;\x0a\x0a\x09\x09shadowCoord.xyz\x20/=\x20shadowCoord.w;\x0a\x09\x09shadowCoord.z\x20+=\x20shadowBias;\x0a\x0a\x09\x09bool\x20inFrustum\x20=\x20shadowCoord.x\x20>=\x200.0\x20&&\x20shadowCoord.x\x20<=\x201.0\x20&&\x20shadowCoord.y\x20>=\x200.0\x20&&\x20shadowCoord.y\x20<=\x201.0;\x0a\x09\x09bool\x20frustumTest\x20=\x20inFrustum\x20&&\x20shadowCoord.z\x20<=\x201.0;\x0a\x0a\x09\x09if\x20(\x20frustumTest\x20)\x20{\x0a\x0a\x09\x09#if\x20defined(\x20SHADOWMAP_TYPE_PCF\x20)\x0a\x0a\x09\x09\x09vec2\x20texelSize\x20=\x20vec2(\x201.0\x20)\x20/\x20shadowMapSize;\x0a\x0a\x09\x09\x09float\x20dx0\x20=\x20-\x20texelSize.x\x20*\x20shadowRadius;\x0a\x09\x09\x09float\x20dy0\x20=\x20-\x20texelSize.y\x20*\x20shadowRadius;\x0a\x09\x09\x09float\x20dx1\x20=\x20+\x20texelSize.x\x20*\x20shadowRadius;\x0a\x09\x09\x09float\x20dy1\x20=\x20+\x20texelSize.y\x20*\x20shadowRadius;\x0a\x09\x09\x09float\x20dx2\x20=\x20dx0\x20/\x202.0;\x0a\x09\x09\x09float\x20dy2\x20=\x20dy0\x20/\x202.0;\x0a\x09\x09\x09float\x20dx3\x20=\x20dx1\x20/\x202.0;\x0a\x09\x09\x09float\x20dy3\x20=\x20dy1\x20/\x202.0;\x0a\x0a\x09\x09\x09shadow\x20=\x20(\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x20dx0,\x20dy0\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x200.0,\x20dy0\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x20dx1,\x20dy0\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x20dx2,\x20dy2\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x200.0,\x20dy2\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x20dx3,\x20dy2\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x20dx0,\x200.0\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x20dx2,\x200.0\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy,\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x20dx3,\x200.0\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x20dx1,\x200.0\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x20dx2,\x20dy3\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x200.0,\x20dy3\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x20dx3,\x20dy3\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x20dx0,\x20dy1\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x200.0,\x20dy1\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20shadowCoord.xy\x20+\x20vec2(\x20dx1,\x20dy1\x20),\x20shadowCoord.z\x20)\x0a\x09\x09\x09)\x20*\x20(\x201.0\x20/\x2017.0\x20);\x0a\x0a\x09\x09#elif\x20defined(\x20SHADOWMAP_TYPE_PCF_SOFT\x20)\x0a\x0a\x09\x09\x09vec2\x20texelSize\x20=\x20vec2(\x201.0\x20)\x20/\x20shadowMapSize;\x0a\x09\x09\x09float\x20dx\x20=\x20texelSize.x;\x0a\x09\x09\x09float\x20dy\x20=\x20texelSize.y;\x0a\x0a\x09\x09\x09vec2\x20uv\x20=\x20shadowCoord.xy;\x0a\x09\x09\x09vec2\x20f\x20=\x20fract(\x20uv\x20*\x20shadowMapSize\x20+\x200.5\x20);\x0a\x09\x09\x09uv\x20-=\x20f\x20*\x20texelSize;\x0a\x0a\x09\x09\x09shadow\x20=\x20(\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20uv,\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20uv\x20+\x20vec2(\x20dx,\x200.0\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20uv\x20+\x20vec2(\x200.0,\x20dy\x20),\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20uv\x20+\x20texelSize,\x20shadowCoord.z\x20)\x20+\x0a\x09\x09\x09\x09mix(\x20texture2DCompare(\x20shadowMap,\x20uv\x20+\x20vec2(\x20-dx,\x200.0\x20),\x20shadowCoord.z\x20),\x0a\x09\x09\x09\x09\x09\x20texture2DCompare(\x20shadowMap,\x20uv\x20+\x20vec2(\x202.0\x20*\x20dx,\x200.0\x20),\x20shadowCoord.z\x20),\x0a\x09\x09\x09\x09\x09\x20f.x\x20)\x20+\x0a\x09\x09\x09\x09mix(\x20texture2DCompare(\x20shadowMap,\x20uv\x20+\x20vec2(\x20-dx,\x20dy\x20),\x20shadowCoord.z\x20),\x0a\x09\x09\x09\x09\x09\x20texture2DCompare(\x20shadowMap,\x20uv\x20+\x20vec2(\x202.0\x20*\x20dx,\x20dy\x20),\x20shadowCoord.z\x20),\x0a\x09\x09\x09\x09\x09\x20f.x\x20)\x20+\x0a\x09\x09\x09\x09mix(\x20texture2DCompare(\x20shadowMap,\x20uv\x20+\x20vec2(\x200.0,\x20-dy\x20),\x20shadowCoord.z\x20),\x0a\x09\x09\x09\x09\x09\x20texture2DCompare(\x20shadowMap,\x20uv\x20+\x20vec2(\x200.0,\x202.0\x20*\x20dy\x20),\x20shadowCoord.z\x20),\x0a\x09\x09\x09\x09\x09\x20f.y\x20)\x20+\x0a\x09\x09\x09\x09mix(\x20texture2DCompare(\x20shadowMap,\x20uv\x20+\x20vec2(\x20dx,\x20-dy\x20),\x20shadowCoord.z\x20),\x0a\x09\x09\x09\x09\x09\x20texture2DCompare(\x20shadowMap,\x20uv\x20+\x20vec2(\x20dx,\x202.0\x20*\x20dy\x20),\x20shadowCoord.z\x20),\x0a\x09\x09\x09\x09\x09\x20f.y\x20)\x20+\x0a\x09\x09\x09\x09mix(\x20mix(\x20texture2DCompare(\x20shadowMap,\x20uv\x20+\x20vec2(\x20-dx,\x20-dy\x20),\x20shadowCoord.z\x20),\x0a\x09\x09\x09\x09\x09\x09\x20\x20texture2DCompare(\x20shadowMap,\x20uv\x20+\x20vec2(\x202.0\x20*\x20dx,\x20-dy\x20),\x20shadowCoord.z\x20),\x0a\x09\x09\x09\x09\x09\x09\x20\x20f.x\x20),\x0a\x09\x09\x09\x09\x09\x20mix(\x20texture2DCompare(\x20shadowMap,\x20uv\x20+\x20vec2(\x20-dx,\x202.0\x20*\x20dy\x20),\x20shadowCoord.z\x20),\x0a\x09\x09\x09\x09\x09\x09\x20\x20texture2DCompare(\x20shadowMap,\x20uv\x20+\x20vec2(\x202.0\x20*\x20dx,\x202.0\x20*\x20dy\x20),\x20shadowCoord.z\x20),\x0a\x09\x09\x09\x09\x09\x09\x20\x20f.x\x20),\x0a\x09\x09\x09\x09\x09\x20f.y\x20)\x0a\x09\x09\x09)\x20*\x20(\x201.0\x20/\x209.0\x20);\x0a\x0a\x09\x09#elif\x20defined(\x20SHADOWMAP_TYPE_VSM\x20)\x0a\x0a\x09\x09\x09shadow\x20=\x20VSMShadow(\x20shadowMap,\x20shadowCoord.xy,\x20shadowCoord.z\x20);\x0a\x0a\x09\x09#else\x20//\x20no\x20percentage-closer\x20filtering:\x0a\x0a\x09\x09\x09shadow\x20=\x20texture2DCompare(\x20shadowMap,\x20shadowCoord.xy,\x20shadowCoord.z\x20);\x0a\x0a\x09\x09#endif\x0a\x0a\x09\x09}\x0a\x0a\x09\x09return\x20shadow;\x0a\x0a\x09}\x0a\x0a\x09//\x20cubeToUV()\x20maps\x20a\x203D\x20direction\x20vector\x20suitable\x20for\x20cube\x20texture\x20mapping\x20to\x20a\x202D\x0a\x09//\x20vector\x20suitable\x20for\x202D\x20texture\x20mapping.\x20This\x20code\x20uses\x20the\x20following\x20layout\x20for\x20the\x0a\x09//\x202D\x20texture:\x0a\x09//\x0a\x09//\x20xzXZ\x0a\x09//\x20\x20y\x20Y\x0a\x09//\x0a\x09//\x20Y\x20-\x20Positive\x20y\x20direction\x0a\x09//\x20y\x20-\x20Negative\x20y\x20direction\x0a\x09//\x20X\x20-\x20Positive\x20x\x20direction\x0a\x09//\x20x\x20-\x20Negative\x20x\x20direction\x0a\x09//\x20Z\x20-\x20Positive\x20z\x20direction\x0a\x09//\x20z\x20-\x20Negative\x20z\x20direction\x0a\x09//\x0a\x09//\x20Source\x20and\x20test\x20bed:\x0a\x09//\x20https://gist.github.com/tschw/da10c43c467ce8afd0c4\x0a\x0a\x09vec2\x20cubeToUV(\x20vec3\x20v,\x20float\x20texelSizeY\x20)\x20{\x0a\x0a\x09\x09//\x20Number\x20of\x20texels\x20to\x20avoid\x20at\x20the\x20edge\x20of\x20each\x20square\x0a\x0a\x09\x09vec3\x20absV\x20=\x20abs(\x20v\x20);\x0a\x0a\x09\x09//\x20Intersect\x20unit\x20cube\x0a\x0a\x09\x09float\x20scaleToCube\x20=\x201.0\x20/\x20max(\x20absV.x,\x20max(\x20absV.y,\x20absV.z\x20)\x20);\x0a\x09\x09absV\x20*=\x20scaleToCube;\x0a\x0a\x09\x09//\x20Apply\x20scale\x20to\x20avoid\x20seams\x0a\x0a\x09\x09//\x20two\x20texels\x20less\x20per\x20square\x20(one\x20texel\x20will\x20do\x20for\x20NEAREST)\x0a\x09\x09v\x20*=\x20scaleToCube\x20*\x20(\x201.0\x20-\x202.0\x20*\x20texelSizeY\x20);\x0a\x0a\x09\x09//\x20Unwrap\x0a\x0a\x09\x09//\x20space:\x20-1\x20...\x201\x20range\x20for\x20each\x20square\x0a\x09\x09//\x0a\x09\x09//\x20#X##\x09\x09dim\x20\x20\x20\x20:=\x20(\x204\x20,\x202\x20)\x0a\x09\x09//\x20\x20#\x20#\x09\x09center\x20:=\x20(\x201\x20,\x201\x20)\x0a\x0a\x09\x09vec2\x20planar\x20=\x20v.xy;\x0a\x0a\x09\x09float\x20almostATexel\x20=\x201.5\x20*\x20texelSizeY;\x0a\x09\x09float\x20almostOne\x20=\x201.0\x20-\x20almostATexel;\x0a\x0a\x09\x09if\x20(\x20absV.z\x20>=\x20almostOne\x20)\x20{\x0a\x0a\x09\x09\x09if\x20(\x20v.z\x20>\x200.0\x20)\x0a\x09\x09\x09\x09planar.x\x20=\x204.0\x20-\x20v.x;\x0a\x0a\x09\x09}\x20else\x20if\x20(\x20absV.x\x20>=\x20almostOne\x20)\x20{\x0a\x0a\x09\x09\x09float\x20signX\x20=\x20sign(\x20v.x\x20);\x0a\x09\x09\x09planar.x\x20=\x20v.z\x20*\x20signX\x20+\x202.0\x20*\x20signX;\x0a\x0a\x09\x09}\x20else\x20if\x20(\x20absV.y\x20>=\x20almostOne\x20)\x20{\x0a\x0a\x09\x09\x09float\x20signY\x20=\x20sign(\x20v.y\x20);\x0a\x09\x09\x09planar.x\x20=\x20v.x\x20+\x202.0\x20*\x20signY\x20+\x202.0;\x0a\x09\x09\x09planar.y\x20=\x20v.z\x20*\x20signY\x20-\x202.0;\x0a\x0a\x09\x09}\x0a\x0a\x09\x09//\x20Transform\x20to\x20UV\x20space\x0a\x0a\x09\x09//\x20scale\x20:=\x200.5\x20/\x20dim\x0a\x09\x09//\x20translate\x20:=\x20(\x20center\x20+\x200.5\x20)\x20/\x20dim\x0a\x09\x09return\x20vec2(\x200.125,\x200.25\x20)\x20*\x20planar\x20+\x20vec2(\x200.375,\x200.75\x20);\x0a\x0a\x09}\x0a\x0a\x09float\x20getPointShadow(\x20sampler2D\x20shadowMap,\x20vec2\x20shadowMapSize,\x20float\x20shadowBias,\x20float\x20shadowRadius,\x20vec4\x20shadowCoord,\x20float\x20shadowCameraNear,\x20float\x20shadowCameraFar\x20)\x20{\x0a\x0a\x09\x09vec2\x20texelSize\x20=\x20vec2(\x201.0\x20)\x20/\x20(\x20shadowMapSize\x20*\x20vec2(\x204.0,\x202.0\x20)\x20);\x0a\x0a\x09\x09//\x20for\x20point\x20lights,\x20the\x20uniform\x20@vShadowCoord\x20is\x20re-purposed\x20to\x20hold\x0a\x09\x09//\x20the\x20vector\x20from\x20the\x20light\x20to\x20the\x20world-space\x20position\x20of\x20the\x20fragment.\x0a\x09\x09vec3\x20lightToPosition\x20=\x20shadowCoord.xyz;\x0a\x0a\x09\x09//\x20dp\x20=\x20normalized\x20distance\x20from\x20light\x20to\x20fragment\x20position\x0a\x09\x09float\x20dp\x20=\x20(\x20length(\x20lightToPosition\x20)\x20-\x20shadowCameraNear\x20)\x20/\x20(\x20shadowCameraFar\x20-\x20shadowCameraNear\x20);\x20//\x20need\x20to\x20clamp?\x0a\x09\x09dp\x20+=\x20shadowBias;\x0a\x0a\x09\x09//\x20bd3D\x20=\x20base\x20direction\x203D\x0a\x09\x09vec3\x20bd3D\x20=\x20normalize(\x20lightToPosition\x20);\x0a\x0a\x09\x09#if\x20defined(\x20SHADOWMAP_TYPE_PCF\x20)\x20||\x20defined(\x20SHADOWMAP_TYPE_PCF_SOFT\x20)\x20||\x20defined(\x20SHADOWMAP_TYPE_VSM\x20)\x0a\x0a\x09\x09\x09vec2\x20offset\x20=\x20vec2(\x20-\x201,\x201\x20)\x20*\x20shadowRadius\x20*\x20texelSize.y;\x0a\x0a\x09\x09\x09return\x20(\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20cubeToUV(\x20bd3D\x20+\x20offset.xyy,\x20texelSize.y\x20),\x20dp\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20cubeToUV(\x20bd3D\x20+\x20offset.yyy,\x20texelSize.y\x20),\x20dp\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20cubeToUV(\x20bd3D\x20+\x20offset.xyx,\x20texelSize.y\x20),\x20dp\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20cubeToUV(\x20bd3D\x20+\x20offset.yyx,\x20texelSize.y\x20),\x20dp\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20cubeToUV(\x20bd3D,\x20texelSize.y\x20),\x20dp\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20cubeToUV(\x20bd3D\x20+\x20offset.xxy,\x20texelSize.y\x20),\x20dp\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20cubeToUV(\x20bd3D\x20+\x20offset.yxy,\x20texelSize.y\x20),\x20dp\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20cubeToUV(\x20bd3D\x20+\x20offset.xxx,\x20texelSize.y\x20),\x20dp\x20)\x20+\x0a\x09\x09\x09\x09texture2DCompare(\x20shadowMap,\x20cubeToUV(\x20bd3D\x20+\x20offset.yxx,\x20texelSize.y\x20),\x20dp\x20)\x0a\x09\x09\x09)\x20*\x20(\x201.0\x20/\x209.0\x20);\x0a\x0a\x09\x09#else\x20//\x20no\x20percentage-closer\x20filtering\x0a\x0a\x09\x09\x09return\x20texture2DCompare(\x20shadowMap,\x20cubeToUV(\x20bd3D,\x20texelSize.y\x20),\x20dp\x20);\x0a\x0a\x09\x09#endif\x0a\x0a\x09}\x0a\x0a#endif\x0a',
            'shadowmap_pars_vertex': '\x0a\x0a#if\x20NUM_SPOT_LIGHT_COORDS\x20>\x200\x0a\x0a\x09uniform\x20mat4\x20spotLightMatrix[\x20NUM_SPOT_LIGHT_COORDS\x20];\x0a\x09varying\x20vec4\x20vSpotLightCoord[\x20NUM_SPOT_LIGHT_COORDS\x20];\x0a\x0a#endif\x0a\x0a#ifdef\x20USE_SHADOWMAP\x0a\x0a\x09#if\x20NUM_DIR_LIGHT_SHADOWS\x20>\x200\x0a\x0a\x09\x09uniform\x20mat4\x20directionalShadowMatrix[\x20NUM_DIR_LIGHT_SHADOWS\x20];\x0a\x09\x09varying\x20vec4\x20vDirectionalShadowCoord[\x20NUM_DIR_LIGHT_SHADOWS\x20];\x0a\x0a\x09\x09struct\x20DirectionalLightShadow\x20{\x0a\x09\x09\x09float\x20shadowBias;\x0a\x09\x09\x09float\x20shadowNormalBias;\x0a\x09\x09\x09float\x20shadowRadius;\x0a\x09\x09\x09vec2\x20shadowMapSize;\x0a\x09\x09};\x0a\x0a\x09\x09uniform\x20DirectionalLightShadow\x20directionalLightShadows[\x20NUM_DIR_LIGHT_SHADOWS\x20];\x0a\x0a\x09#endif\x0a\x0a\x09#if\x20NUM_SPOT_LIGHT_SHADOWS\x20>\x200\x0a\x0a\x09\x09struct\x20SpotLightShadow\x20{\x0a\x09\x09\x09float\x20shadowBias;\x0a\x09\x09\x09float\x20shadowNormalBias;\x0a\x09\x09\x09float\x20shadowRadius;\x0a\x09\x09\x09vec2\x20shadowMapSize;\x0a\x09\x09};\x0a\x0a\x09\x09uniform\x20SpotLightShadow\x20spotLightShadows[\x20NUM_SPOT_LIGHT_SHADOWS\x20];\x0a\x0a\x09#endif\x0a\x0a\x09#if\x20NUM_POINT_LIGHT_SHADOWS\x20>\x200\x0a\x0a\x09\x09uniform\x20mat4\x20pointShadowMatrix[\x20NUM_POINT_LIGHT_SHADOWS\x20];\x0a\x09\x09varying\x20vec4\x20vPointShadowCoord[\x20NUM_POINT_LIGHT_SHADOWS\x20];\x0a\x0a\x09\x09struct\x20PointLightShadow\x20{\x0a\x09\x09\x09float\x20shadowBias;\x0a\x09\x09\x09float\x20shadowNormalBias;\x0a\x09\x09\x09float\x20shadowRadius;\x0a\x09\x09\x09vec2\x20shadowMapSize;\x0a\x09\x09\x09float\x20shadowCameraNear;\x0a\x09\x09\x09float\x20shadowCameraFar;\x0a\x09\x09};\x0a\x0a\x09\x09uniform\x20PointLightShadow\x20pointLightShadows[\x20NUM_POINT_LIGHT_SHADOWS\x20];\x0a\x0a\x09#endif\x0a\x0a\x09/*\x0a\x09#if\x20NUM_RECT_AREA_LIGHTS\x20>\x200\x0a\x0a\x09\x09//\x20TODO\x20(abelnation):\x20uniforms\x20for\x20area\x20light\x20shadows\x0a\x0a\x09#endif\x0a\x09*/\x0a\x0a#endif\x0a',
            'shadowmap_vertex': '\x0a\x0a#if\x20(\x20defined(\x20USE_SHADOWMAP\x20)\x20&&\x20(\x20NUM_DIR_LIGHT_SHADOWS\x20>\x200\x20||\x20NUM_POINT_LIGHT_SHADOWS\x20>\x200\x20)\x20)\x20||\x20(\x20NUM_SPOT_LIGHT_COORDS\x20>\x200\x20)\x0a\x0a\x09//\x20Offsetting\x20the\x20position\x20used\x20for\x20querying\x20occlusion\x20along\x20the\x20world\x20normal\x20can\x20be\x20used\x20to\x20reduce\x20shadow\x20acne.\x0a\x09vec3\x20shadowWorldNormal\x20=\x20inverseTransformDirection(\x20transformedNormal,\x20viewMatrix\x20);\x0a\x09vec4\x20shadowWorldPosition;\x0a\x0a#endif\x0a\x0a#if\x20defined(\x20USE_SHADOWMAP\x20)\x0a\x0a\x09#if\x20NUM_DIR_LIGHT_SHADOWS\x20>\x200\x0a\x0a\x09\x09#pragma\x20unroll_loop_start\x0a\x09\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20NUM_DIR_LIGHT_SHADOWS;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09\x09shadowWorldPosition\x20=\x20worldPosition\x20+\x20vec4(\x20shadowWorldNormal\x20*\x20directionalLightShadows[\x20i\x20].shadowNormalBias,\x200\x20);\x0a\x09\x09\x09vDirectionalShadowCoord[\x20i\x20]\x20=\x20directionalShadowMatrix[\x20i\x20]\x20*\x20shadowWorldPosition;\x0a\x0a\x09\x09}\x0a\x09\x09#pragma\x20unroll_loop_end\x0a\x0a\x09#endif\x0a\x0a\x09#if\x20NUM_POINT_LIGHT_SHADOWS\x20>\x200\x0a\x0a\x09\x09#pragma\x20unroll_loop_start\x0a\x09\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20NUM_POINT_LIGHT_SHADOWS;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09\x09shadowWorldPosition\x20=\x20worldPosition\x20+\x20vec4(\x20shadowWorldNormal\x20*\x20pointLightShadows[\x20i\x20].shadowNormalBias,\x200\x20);\x0a\x09\x09\x09vPointShadowCoord[\x20i\x20]\x20=\x20pointShadowMatrix[\x20i\x20]\x20*\x20shadowWorldPosition;\x0a\x0a\x09\x09}\x0a\x09\x09#pragma\x20unroll_loop_end\x0a\x0a\x09#endif\x0a\x0a\x09/*\x0a\x09#if\x20NUM_RECT_AREA_LIGHTS\x20>\x200\x0a\x0a\x09\x09//\x20TODO\x20(abelnation):\x20update\x20vAreaShadowCoord\x20with\x20area\x20light\x20info\x0a\x0a\x09#endif\x0a\x09*/\x0a\x0a#endif\x0a\x0a//\x20spot\x20lights\x20can\x20be\x20evaluated\x20without\x20active\x20shadow\x20mapping\x20(when\x20SpotLight.map\x20is\x20used)\x0a\x0a#if\x20NUM_SPOT_LIGHT_COORDS\x20>\x200\x0a\x0a\x09#pragma\x20unroll_loop_start\x0a\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20NUM_SPOT_LIGHT_COORDS;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09shadowWorldPosition\x20=\x20worldPosition;\x0a\x09\x09#if\x20(\x20defined(\x20USE_SHADOWMAP\x20)\x20&&\x20UNROLLED_LOOP_INDEX\x20<\x20NUM_SPOT_LIGHT_SHADOWS\x20)\x0a\x09\x09\x09shadowWorldPosition.xyz\x20+=\x20shadowWorldNormal\x20*\x20spotLightShadows[\x20i\x20].shadowNormalBias;\x0a\x09\x09#endif\x0a\x09\x09vSpotLightCoord[\x20i\x20]\x20=\x20spotLightMatrix[\x20i\x20]\x20*\x20shadowWorldPosition;\x0a\x0a\x09}\x0a\x09#pragma\x20unroll_loop_end\x0a\x0a#endif\x0a\x0a\x0a',
            'shadowmask_pars_fragment': '\x0afloat\x20getShadowMask()\x20{\x0a\x0a\x09float\x20shadow\x20=\x201.0;\x0a\x0a\x09#ifdef\x20USE_SHADOWMAP\x0a\x0a\x09#if\x20NUM_DIR_LIGHT_SHADOWS\x20>\x200\x0a\x0a\x09DirectionalLightShadow\x20directionalLight;\x0a\x0a\x09#pragma\x20unroll_loop_start\x0a\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20NUM_DIR_LIGHT_SHADOWS;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09directionalLight\x20=\x20directionalLightShadows[\x20i\x20];\x0a\x09\x09shadow\x20*=\x20receiveShadow\x20?\x20getShadow(\x20directionalShadowMap[\x20i\x20],\x20directionalLight.shadowMapSize,\x20directionalLight.shadowBias,\x20directionalLight.shadowRadius,\x20vDirectionalShadowCoord[\x20i\x20]\x20)\x20:\x201.0;\x0a\x0a\x09}\x0a\x09#pragma\x20unroll_loop_end\x0a\x0a\x09#endif\x0a\x0a\x09#if\x20NUM_SPOT_LIGHT_SHADOWS\x20>\x200\x0a\x0a\x09SpotLightShadow\x20spotLight;\x0a\x0a\x09#pragma\x20unroll_loop_start\x0a\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20NUM_SPOT_LIGHT_SHADOWS;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09spotLight\x20=\x20spotLightShadows[\x20i\x20];\x0a\x09\x09shadow\x20*=\x20receiveShadow\x20?\x20getShadow(\x20spotShadowMap[\x20i\x20],\x20spotLight.shadowMapSize,\x20spotLight.shadowBias,\x20spotLight.shadowRadius,\x20vSpotLightCoord[\x20i\x20]\x20)\x20:\x201.0;\x0a\x0a\x09}\x0a\x09#pragma\x20unroll_loop_end\x0a\x0a\x09#endif\x0a\x0a\x09#if\x20NUM_POINT_LIGHT_SHADOWS\x20>\x200\x0a\x0a\x09PointLightShadow\x20pointLight;\x0a\x0a\x09#pragma\x20unroll_loop_start\x0a\x09for\x20(\x20int\x20i\x20=\x200;\x20i\x20<\x20NUM_POINT_LIGHT_SHADOWS;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09pointLight\x20=\x20pointLightShadows[\x20i\x20];\x0a\x09\x09shadow\x20*=\x20receiveShadow\x20?\x20getPointShadow(\x20pointShadowMap[\x20i\x20],\x20pointLight.shadowMapSize,\x20pointLight.shadowBias,\x20pointLight.shadowRadius,\x20vPointShadowCoord[\x20i\x20],\x20pointLight.shadowCameraNear,\x20pointLight.shadowCameraFar\x20)\x20:\x201.0;\x0a\x0a\x09}\x0a\x09#pragma\x20unroll_loop_end\x0a\x0a\x09#endif\x0a\x0a\x09/*\x0a\x09#if\x20NUM_RECT_AREA_LIGHTS\x20>\x200\x0a\x0a\x09\x09//\x20TODO\x20(abelnation):\x20update\x20shadow\x20for\x20Area\x20light\x0a\x0a\x09#endif\x0a\x09*/\x0a\x0a\x09#endif\x0a\x0a\x09return\x20shadow;\x0a\x0a}\x0a',
            'skinbase_vertex': '\x0a#ifdef\x20USE_SKINNING\x0a\x0a\x09mat4\x20boneMatX\x20=\x20getBoneMatrix(\x20skinIndex.x\x20);\x0a\x09mat4\x20boneMatY\x20=\x20getBoneMatrix(\x20skinIndex.y\x20);\x0a\x09mat4\x20boneMatZ\x20=\x20getBoneMatrix(\x20skinIndex.z\x20);\x0a\x09mat4\x20boneMatW\x20=\x20getBoneMatrix(\x20skinIndex.w\x20);\x0a\x0a#endif\x0a',
            'skinning_pars_vertex': '\x0a#ifdef\x20USE_SKINNING\x0a\x0a\x09uniform\x20mat4\x20bindMatrix;\x0a\x09uniform\x20mat4\x20bindMatrixInverse;\x0a\x0a\x09uniform\x20highp\x20sampler2D\x20boneTexture;\x0a\x0a\x09mat4\x20getBoneMatrix(\x20const\x20in\x20float\x20i\x20)\x20{\x0a\x0a\x09\x09int\x20size\x20=\x20textureSize(\x20boneTexture,\x200\x20).x;\x0a\x09\x09int\x20j\x20=\x20int(\x20i\x20)\x20*\x204;\x0a\x09\x09int\x20x\x20=\x20j\x20%\x20size;\x0a\x09\x09int\x20y\x20=\x20j\x20/\x20size;\x0a\x09\x09vec4\x20v1\x20=\x20texelFetch(\x20boneTexture,\x20ivec2(\x20x,\x20y\x20),\x200\x20);\x0a\x09\x09vec4\x20v2\x20=\x20texelFetch(\x20boneTexture,\x20ivec2(\x20x\x20+\x201,\x20y\x20),\x200\x20);\x0a\x09\x09vec4\x20v3\x20=\x20texelFetch(\x20boneTexture,\x20ivec2(\x20x\x20+\x202,\x20y\x20),\x200\x20);\x0a\x09\x09vec4\x20v4\x20=\x20texelFetch(\x20boneTexture,\x20ivec2(\x20x\x20+\x203,\x20y\x20),\x200\x20);\x0a\x0a\x09\x09return\x20mat4(\x20v1,\x20v2,\x20v3,\x20v4\x20);\x0a\x0a\x09}\x0a\x0a#endif\x0a',
            'skinning_vertex': '\x0a#ifdef\x20USE_SKINNING\x0a\x0a\x09vec4\x20skinVertex\x20=\x20bindMatrix\x20*\x20vec4(\x20transformed,\x201.0\x20);\x0a\x0a\x09vec4\x20skinned\x20=\x20vec4(\x200.0\x20);\x0a\x09skinned\x20+=\x20boneMatX\x20*\x20skinVertex\x20*\x20skinWeight.x;\x0a\x09skinned\x20+=\x20boneMatY\x20*\x20skinVertex\x20*\x20skinWeight.y;\x0a\x09skinned\x20+=\x20boneMatZ\x20*\x20skinVertex\x20*\x20skinWeight.z;\x0a\x09skinned\x20+=\x20boneMatW\x20*\x20skinVertex\x20*\x20skinWeight.w;\x0a\x0a\x09transformed\x20=\x20(\x20bindMatrixInverse\x20*\x20skinned\x20).xyz;\x0a\x0a#endif\x0a',
            'skinnormal_vertex': '\x0a#ifdef\x20USE_SKINNING\x0a\x0a\x09mat4\x20skinMatrix\x20=\x20mat4(\x200.0\x20);\x0a\x09skinMatrix\x20+=\x20skinWeight.x\x20*\x20boneMatX;\x0a\x09skinMatrix\x20+=\x20skinWeight.y\x20*\x20boneMatY;\x0a\x09skinMatrix\x20+=\x20skinWeight.z\x20*\x20boneMatZ;\x0a\x09skinMatrix\x20+=\x20skinWeight.w\x20*\x20boneMatW;\x0a\x09skinMatrix\x20=\x20bindMatrixInverse\x20*\x20skinMatrix\x20*\x20bindMatrix;\x0a\x0a\x09objectNormal\x20=\x20vec4(\x20skinMatrix\x20*\x20vec4(\x20objectNormal,\x200.0\x20)\x20).xyz;\x0a\x0a\x09#ifdef\x20USE_TANGENT\x0a\x0a\x09\x09objectTangent\x20=\x20vec4(\x20skinMatrix\x20*\x20vec4(\x20objectTangent,\x200.0\x20)\x20).xyz;\x0a\x0a\x09#endif\x0a\x0a#endif\x0a',
            'specularmap_fragment': '\x0afloat\x20specularStrength;\x0a\x0a#ifdef\x20USE_SPECULARMAP\x0a\x0a\x09vec4\x20texelSpecular\x20=\x20texture2D(\x20specularMap,\x20vSpecularMapUv\x20);\x0a\x09specularStrength\x20=\x20texelSpecular.r;\x0a\x0a#else\x0a\x0a\x09specularStrength\x20=\x201.0;\x0a\x0a#endif\x0a',
            'specularmap_pars_fragment': '\x0a#ifdef\x20USE_SPECULARMAP\x0a\x0a\x09uniform\x20sampler2D\x20specularMap;\x0a\x0a#endif\x0a',
            'tonemapping_fragment': '\x0a#if\x20defined(\x20TONE_MAPPING\x20)\x0a\x0a\x09gl_FragColor.rgb\x20=\x20toneMapping(\x20gl_FragColor.rgb\x20);\x0a\x0a#endif\x0a',
            'tonemapping_pars_fragment': '\x0a#ifndef\x20saturate\x0a//\x20<common>\x20may\x20have\x20defined\x20saturate()\x20already\x0a#define\x20saturate(\x20a\x20)\x20clamp(\x20a,\x200.0,\x201.0\x20)\x0a#endif\x0a\x0auniform\x20float\x20toneMappingExposure;\x0a\x0a//\x20exposure\x20only\x0avec3\x20LinearToneMapping(\x20vec3\x20color\x20)\x20{\x0a\x0a\x09return\x20saturate(\x20toneMappingExposure\x20*\x20color\x20);\x0a\x0a}\x0a\x0a//\x20source:\x20https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf\x0avec3\x20ReinhardToneMapping(\x20vec3\x20color\x20)\x20{\x0a\x0a\x09color\x20*=\x20toneMappingExposure;\x0a\x09return\x20saturate(\x20color\x20/\x20(\x20vec3(\x201.0\x20)\x20+\x20color\x20)\x20);\x0a\x0a}\x0a\x0a//\x20source:\x20http://filmicworlds.com/blog/filmic-tonemapping-operators/\x0avec3\x20OptimizedCineonToneMapping(\x20vec3\x20color\x20)\x20{\x0a\x0a\x09//\x20optimized\x20filmic\x20operator\x20by\x20Jim\x20Hejl\x20and\x20Richard\x20Burgess-Dawson\x0a\x09color\x20*=\x20toneMappingExposure;\x0a\x09color\x20=\x20max(\x20vec3(\x200.0\x20),\x20color\x20-\x200.004\x20);\x0a\x09return\x20pow(\x20(\x20color\x20*\x20(\x206.2\x20*\x20color\x20+\x200.5\x20)\x20)\x20/\x20(\x20color\x20*\x20(\x206.2\x20*\x20color\x20+\x201.7\x20)\x20+\x200.06\x20),\x20vec3(\x202.2\x20)\x20);\x0a\x0a}\x0a\x0a//\x20source:\x20https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs\x0avec3\x20RRTAndODTFit(\x20vec3\x20v\x20)\x20{\x0a\x0a\x09vec3\x20a\x20=\x20v\x20*\x20(\x20v\x20+\x200.0245786\x20)\x20-\x200.000090537;\x0a\x09vec3\x20b\x20=\x20v\x20*\x20(\x200.983729\x20*\x20v\x20+\x200.4329510\x20)\x20+\x200.238081;\x0a\x09return\x20a\x20/\x20b;\x0a\x0a}\x0a\x0a//\x20this\x20implementation\x20of\x20ACES\x20is\x20modified\x20to\x20accommodate\x20a\x20brighter\x20viewing\x20environment.\x0a//\x20the\x20scale\x20factor\x20of\x201/0.6\x20is\x20subjective.\x20see\x20discussion\x20in\x20#19621.\x0a\x0avec3\x20ACESFilmicToneMapping(\x20vec3\x20color\x20)\x20{\x0a\x0a\x09//\x20sRGB\x20=>\x20XYZ\x20=>\x20D65_2_D60\x20=>\x20AP1\x20=>\x20RRT_SAT\x0a\x09const\x20mat3\x20ACESInputMat\x20=\x20mat3(\x0a\x09\x09vec3(\x200.59719,\x200.07600,\x200.02840\x20),\x20//\x20transposed\x20from\x20source\x0a\x09\x09vec3(\x200.35458,\x200.90834,\x200.13383\x20),\x0a\x09\x09vec3(\x200.04823,\x200.01566,\x200.83777\x20)\x0a\x09);\x0a\x0a\x09//\x20ODT_SAT\x20=>\x20XYZ\x20=>\x20D60_2_D65\x20=>\x20sRGB\x0a\x09const\x20mat3\x20ACESOutputMat\x20=\x20mat3(\x0a\x09\x09vec3(\x20\x201.60475,\x20-0.10208,\x20-0.00327\x20),\x20//\x20transposed\x20from\x20source\x0a\x09\x09vec3(\x20-0.53108,\x20\x201.10813,\x20-0.07276\x20),\x0a\x09\x09vec3(\x20-0.07367,\x20-0.00605,\x20\x201.07602\x20)\x0a\x09);\x0a\x0a\x09color\x20*=\x20toneMappingExposure\x20/\x200.6;\x0a\x0a\x09color\x20=\x20ACESInputMat\x20*\x20color;\x0a\x0a\x09//\x20Apply\x20RRT\x20and\x20ODT\x0a\x09color\x20=\x20RRTAndODTFit(\x20color\x20);\x0a\x0a\x09color\x20=\x20ACESOutputMat\x20*\x20color;\x0a\x0a\x09//\x20Clamp\x20to\x20[0,\x201]\x0a\x09return\x20saturate(\x20color\x20);\x0a\x0a}\x0a\x0avec3\x20CustomToneMapping(\x20vec3\x20color\x20)\x20{\x20return\x20color;\x20}\x0a',
            'transmission_fragment': '\x0a#ifdef\x20USE_TRANSMISSION\x0a\x0a\x09material.transmission\x20=\x20transmission;\x0a\x09material.transmissionAlpha\x20=\x201.0;\x0a\x09material.thickness\x20=\x20thickness;\x0a\x09material.attenuationDistance\x20=\x20attenuationDistance;\x0a\x09material.attenuationColor\x20=\x20attenuationColor;\x0a\x0a\x09#ifdef\x20USE_TRANSMISSIONMAP\x0a\x0a\x09\x09material.transmission\x20*=\x20texture2D(\x20transmissionMap,\x20vTransmissionMapUv\x20).r;\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_THICKNESSMAP\x0a\x0a\x09\x09material.thickness\x20*=\x20texture2D(\x20thicknessMap,\x20vThicknessMapUv\x20).g;\x0a\x0a\x09#endif\x0a\x0a\x09vec3\x20pos\x20=\x20vWorldPosition;\x0a\x09vec3\x20v\x20=\x20normalize(\x20cameraPosition\x20-\x20pos\x20);\x0a\x09vec3\x20n\x20=\x20inverseTransformDirection(\x20normal,\x20viewMatrix\x20);\x0a\x0a\x09vec4\x20transmitted\x20=\x20getIBLVolumeRefraction(\x0a\x09\x09n,\x20v,\x20material.roughness,\x20material.diffuseColor,\x20material.specularColor,\x20material.specularF90,\x0a\x09\x09pos,\x20modelMatrix,\x20viewMatrix,\x20projectionMatrix,\x20material.ior,\x20material.thickness,\x0a\x09\x09material.attenuationColor,\x20material.attenuationDistance\x20);\x0a\x0a\x09material.transmissionAlpha\x20=\x20mix(\x20material.transmissionAlpha,\x20transmitted.a,\x20material.transmission\x20);\x0a\x0a\x09totalDiffuse\x20=\x20mix(\x20totalDiffuse,\x20transmitted.rgb,\x20material.transmission\x20);\x0a\x0a#endif\x0a',
            'transmission_pars_fragment': '\x0a#ifdef\x20USE_TRANSMISSION\x0a\x0a\x09//\x20Transmission\x20code\x20is\x20based\x20on\x20glTF-Sampler-Viewer\x0a\x09//\x20https://github.com/KhronosGroup/glTF-Sample-Viewer\x0a\x0a\x09uniform\x20float\x20transmission;\x0a\x09uniform\x20float\x20thickness;\x0a\x09uniform\x20float\x20attenuationDistance;\x0a\x09uniform\x20vec3\x20attenuationColor;\x0a\x0a\x09#ifdef\x20USE_TRANSMISSIONMAP\x0a\x0a\x09\x09uniform\x20sampler2D\x20transmissionMap;\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_THICKNESSMAP\x0a\x0a\x09\x09uniform\x20sampler2D\x20thicknessMap;\x0a\x0a\x09#endif\x0a\x0a\x09uniform\x20vec2\x20transmissionSamplerSize;\x0a\x09uniform\x20sampler2D\x20transmissionSamplerMap;\x0a\x0a\x09uniform\x20mat4\x20modelMatrix;\x0a\x09uniform\x20mat4\x20projectionMatrix;\x0a\x0a\x09varying\x20vec3\x20vWorldPosition;\x0a\x0a\x09//\x20Mipped\x20Bicubic\x20Texture\x20Filtering\x20by\x20N8\x0a\x09//\x20https://www.shadertoy.com/view/Dl2SDW\x0a\x0a\x09float\x20w0(\x20float\x20a\x20)\x20{\x0a\x0a\x09\x09return\x20(\x201.0\x20/\x206.0\x20)\x20*\x20(\x20a\x20*\x20(\x20a\x20*\x20(\x20-\x20a\x20+\x203.0\x20)\x20-\x203.0\x20)\x20+\x201.0\x20);\x0a\x0a\x09}\x0a\x0a\x09float\x20w1(\x20float\x20a\x20)\x20{\x0a\x0a\x09\x09return\x20(\x201.0\x20/\x206.0\x20)\x20*\x20(\x20a\x20*\x20\x20a\x20*\x20(\x203.0\x20*\x20a\x20-\x206.0\x20)\x20+\x204.0\x20);\x0a\x0a\x09}\x0a\x0a\x09float\x20w2(\x20float\x20a\x20){\x0a\x0a\x09\x09return\x20(\x201.0\x20/\x206.0\x20)\x20*\x20(\x20a\x20*\x20(\x20a\x20*\x20(\x20-\x203.0\x20*\x20a\x20+\x203.0\x20)\x20+\x203.0\x20)\x20+\x201.0\x20);\x0a\x0a\x09}\x0a\x0a\x09float\x20w3(\x20float\x20a\x20)\x20{\x0a\x0a\x09\x09return\x20(\x201.0\x20/\x206.0\x20)\x20*\x20(\x20a\x20*\x20a\x20*\x20a\x20);\x0a\x0a\x09}\x0a\x0a\x09//\x20g0\x20and\x20g1\x20are\x20the\x20two\x20amplitude\x20functions\x0a\x09float\x20g0(\x20float\x20a\x20)\x20{\x0a\x0a\x09\x09return\x20w0(\x20a\x20)\x20+\x20w1(\x20a\x20);\x0a\x0a\x09}\x0a\x0a\x09float\x20g1(\x20float\x20a\x20)\x20{\x0a\x0a\x09\x09return\x20w2(\x20a\x20)\x20+\x20w3(\x20a\x20);\x0a\x0a\x09}\x0a\x0a\x09//\x20h0\x20and\x20h1\x20are\x20the\x20two\x20offset\x20functions\x0a\x09float\x20h0(\x20float\x20a\x20)\x20{\x0a\x0a\x09\x09return\x20-\x201.0\x20+\x20w1(\x20a\x20)\x20/\x20(\x20w0(\x20a\x20)\x20+\x20w1(\x20a\x20)\x20);\x0a\x0a\x09}\x0a\x0a\x09float\x20h1(\x20float\x20a\x20)\x20{\x0a\x0a\x09\x09return\x201.0\x20+\x20w3(\x20a\x20)\x20/\x20(\x20w2(\x20a\x20)\x20+\x20w3(\x20a\x20)\x20);\x0a\x0a\x09}\x0a\x0a\x09vec4\x20bicubic(\x20sampler2D\x20tex,\x20vec2\x20uv,\x20vec4\x20texelSize,\x20float\x20lod\x20)\x20{\x0a\x0a\x09\x09uv\x20=\x20uv\x20*\x20texelSize.zw\x20+\x200.5;\x0a\x0a\x09\x09vec2\x20iuv\x20=\x20floor(\x20uv\x20);\x0a\x09\x09vec2\x20fuv\x20=\x20fract(\x20uv\x20);\x0a\x0a\x09\x09float\x20g0x\x20=\x20g0(\x20fuv.x\x20);\x0a\x09\x09float\x20g1x\x20=\x20g1(\x20fuv.x\x20);\x0a\x09\x09float\x20h0x\x20=\x20h0(\x20fuv.x\x20);\x0a\x09\x09float\x20h1x\x20=\x20h1(\x20fuv.x\x20);\x0a\x09\x09float\x20h0y\x20=\x20h0(\x20fuv.y\x20);\x0a\x09\x09float\x20h1y\x20=\x20h1(\x20fuv.y\x20);\x0a\x0a\x09\x09vec2\x20p0\x20=\x20(\x20vec2(\x20iuv.x\x20+\x20h0x,\x20iuv.y\x20+\x20h0y\x20)\x20-\x200.5\x20)\x20*\x20texelSize.xy;\x0a\x09\x09vec2\x20p1\x20=\x20(\x20vec2(\x20iuv.x\x20+\x20h1x,\x20iuv.y\x20+\x20h0y\x20)\x20-\x200.5\x20)\x20*\x20texelSize.xy;\x0a\x09\x09vec2\x20p2\x20=\x20(\x20vec2(\x20iuv.x\x20+\x20h0x,\x20iuv.y\x20+\x20h1y\x20)\x20-\x200.5\x20)\x20*\x20texelSize.xy;\x0a\x09\x09vec2\x20p3\x20=\x20(\x20vec2(\x20iuv.x\x20+\x20h1x,\x20iuv.y\x20+\x20h1y\x20)\x20-\x200.5\x20)\x20*\x20texelSize.xy;\x0a\x0a\x09\x09return\x20g0(\x20fuv.y\x20)\x20*\x20(\x20g0x\x20*\x20textureLod(\x20tex,\x20p0,\x20lod\x20)\x20+\x20g1x\x20*\x20textureLod(\x20tex,\x20p1,\x20lod\x20)\x20)\x20+\x0a\x09\x09\x09g1(\x20fuv.y\x20)\x20*\x20(\x20g0x\x20*\x20textureLod(\x20tex,\x20p2,\x20lod\x20)\x20+\x20g1x\x20*\x20textureLod(\x20tex,\x20p3,\x20lod\x20)\x20);\x0a\x0a\x09}\x0a\x0a\x09vec4\x20textureBicubic(\x20sampler2D\x20sampler,\x20vec2\x20uv,\x20float\x20lod\x20)\x20{\x0a\x0a\x09\x09vec2\x20fLodSize\x20=\x20vec2(\x20textureSize(\x20sampler,\x20int(\x20lod\x20)\x20)\x20);\x0a\x09\x09vec2\x20cLodSize\x20=\x20vec2(\x20textureSize(\x20sampler,\x20int(\x20lod\x20+\x201.0\x20)\x20)\x20);\x0a\x09\x09vec2\x20fLodSizeInv\x20=\x201.0\x20/\x20fLodSize;\x0a\x09\x09vec2\x20cLodSizeInv\x20=\x201.0\x20/\x20cLodSize;\x0a\x09\x09vec4\x20fSample\x20=\x20bicubic(\x20sampler,\x20uv,\x20vec4(\x20fLodSizeInv,\x20fLodSize\x20),\x20floor(\x20lod\x20)\x20);\x0a\x09\x09vec4\x20cSample\x20=\x20bicubic(\x20sampler,\x20uv,\x20vec4(\x20cLodSizeInv,\x20cLodSize\x20),\x20ceil(\x20lod\x20)\x20);\x0a\x09\x09return\x20mix(\x20fSample,\x20cSample,\x20fract(\x20lod\x20)\x20);\x0a\x0a\x09}\x0a\x0a\x09vec3\x20getVolumeTransmissionRay(\x20const\x20in\x20vec3\x20n,\x20const\x20in\x20vec3\x20v,\x20const\x20in\x20float\x20thickness,\x20const\x20in\x20float\x20ior,\x20const\x20in\x20mat4\x20modelMatrix\x20)\x20{\x0a\x0a\x09\x09//\x20Direction\x20of\x20refracted\x20light.\x0a\x09\x09vec3\x20refractionVector\x20=\x20refract(\x20-\x20v,\x20normalize(\x20n\x20),\x201.0\x20/\x20ior\x20);\x0a\x0a\x09\x09//\x20Compute\x20rotation-independant\x20scaling\x20of\x20the\x20model\x20matrix.\x0a\x09\x09vec3\x20modelScale;\x0a\x09\x09modelScale.x\x20=\x20length(\x20vec3(\x20modelMatrix[\x200\x20].xyz\x20)\x20);\x0a\x09\x09modelScale.y\x20=\x20length(\x20vec3(\x20modelMatrix[\x201\x20].xyz\x20)\x20);\x0a\x09\x09modelScale.z\x20=\x20length(\x20vec3(\x20modelMatrix[\x202\x20].xyz\x20)\x20);\x0a\x0a\x09\x09//\x20The\x20thickness\x20is\x20specified\x20in\x20local\x20space.\x0a\x09\x09return\x20normalize(\x20refractionVector\x20)\x20*\x20thickness\x20*\x20modelScale;\x0a\x0a\x09}\x0a\x0a\x09float\x20applyIorToRoughness(\x20const\x20in\x20float\x20roughness,\x20const\x20in\x20float\x20ior\x20)\x20{\x0a\x0a\x09\x09//\x20Scale\x20roughness\x20with\x20IOR\x20so\x20that\x20an\x20IOR\x20of\x201.0\x20results\x20in\x20no\x20microfacet\x20refraction\x20and\x0a\x09\x09//\x20an\x20IOR\x20of\x201.5\x20results\x20in\x20the\x20default\x20amount\x20of\x20microfacet\x20refraction.\x0a\x09\x09return\x20roughness\x20*\x20clamp(\x20ior\x20*\x202.0\x20-\x202.0,\x200.0,\x201.0\x20);\x0a\x0a\x09}\x0a\x0a\x09vec4\x20getTransmissionSample(\x20const\x20in\x20vec2\x20fragCoord,\x20const\x20in\x20float\x20roughness,\x20const\x20in\x20float\x20ior\x20)\x20{\x0a\x0a\x09\x09float\x20lod\x20=\x20log2(\x20transmissionSamplerSize.x\x20)\x20*\x20applyIorToRoughness(\x20roughness,\x20ior\x20);\x0a\x09\x09return\x20textureBicubic(\x20transmissionSamplerMap,\x20fragCoord.xy,\x20lod\x20);\x0a\x0a\x09}\x0a\x0a\x09vec3\x20volumeAttenuation(\x20const\x20in\x20float\x20transmissionDistance,\x20const\x20in\x20vec3\x20attenuationColor,\x20const\x20in\x20float\x20attenuationDistance\x20)\x20{\x0a\x0a\x09\x09if\x20(\x20isinf(\x20attenuationDistance\x20)\x20)\x20{\x0a\x0a\x09\x09\x09//\x20Attenuation\x20distance\x20is\x20+∞,\x20i.e.\x20the\x20transmitted\x20color\x20is\x20not\x20attenuated\x20at\x20all.\x0a\x09\x09\x09return\x20vec3(\x201.0\x20);\x0a\x0a\x09\x09}\x20else\x20{\x0a\x0a\x09\x09\x09//\x20Compute\x20light\x20attenuation\x20using\x20Beer\x27s\x20law.\x0a\x09\x09\x09vec3\x20attenuationCoefficient\x20=\x20-log(\x20attenuationColor\x20)\x20/\x20attenuationDistance;\x0a\x09\x09\x09vec3\x20transmittance\x20=\x20exp(\x20-\x20attenuationCoefficient\x20*\x20transmissionDistance\x20);\x20//\x20Beer\x27s\x20law\x0a\x09\x09\x09return\x20transmittance;\x0a\x0a\x09\x09}\x0a\x0a\x09}\x0a\x0a\x09vec4\x20getIBLVolumeRefraction(\x20const\x20in\x20vec3\x20n,\x20const\x20in\x20vec3\x20v,\x20const\x20in\x20float\x20roughness,\x20const\x20in\x20vec3\x20diffuseColor,\x0a\x09\x09const\x20in\x20vec3\x20specularColor,\x20const\x20in\x20float\x20specularF90,\x20const\x20in\x20vec3\x20position,\x20const\x20in\x20mat4\x20modelMatrix,\x0a\x09\x09const\x20in\x20mat4\x20viewMatrix,\x20const\x20in\x20mat4\x20projMatrix,\x20const\x20in\x20float\x20ior,\x20const\x20in\x20float\x20thickness,\x0a\x09\x09const\x20in\x20vec3\x20attenuationColor,\x20const\x20in\x20float\x20attenuationDistance\x20)\x20{\x0a\x0a\x09\x09vec3\x20transmissionRay\x20=\x20getVolumeTransmissionRay(\x20n,\x20v,\x20thickness,\x20ior,\x20modelMatrix\x20);\x0a\x09\x09vec3\x20refractedRayExit\x20=\x20position\x20+\x20transmissionRay;\x0a\x0a\x09\x09//\x20Project\x20refracted\x20vector\x20on\x20the\x20framebuffer,\x20while\x20mapping\x20to\x20normalized\x20device\x20coordinates.\x0a\x09\x09vec4\x20ndcPos\x20=\x20projMatrix\x20*\x20viewMatrix\x20*\x20vec4(\x20refractedRayExit,\x201.0\x20);\x0a\x09\x09vec2\x20refractionCoords\x20=\x20ndcPos.xy\x20/\x20ndcPos.w;\x0a\x09\x09refractionCoords\x20+=\x201.0;\x0a\x09\x09refractionCoords\x20/=\x202.0;\x0a\x0a\x09\x09//\x20Sample\x20framebuffer\x20to\x20get\x20pixel\x20the\x20refracted\x20ray\x20hits.\x0a\x09\x09vec4\x20transmittedLight\x20=\x20getTransmissionSample(\x20refractionCoords,\x20roughness,\x20ior\x20);\x0a\x0a\x09\x09vec3\x20transmittance\x20=\x20diffuseColor\x20*\x20volumeAttenuation(\x20length(\x20transmissionRay\x20),\x20attenuationColor,\x20attenuationDistance\x20);\x0a\x09\x09vec3\x20attenuatedColor\x20=\x20transmittance\x20*\x20transmittedLight.rgb;\x0a\x0a\x09\x09//\x20Get\x20the\x20specular\x20component.\x0a\x09\x09vec3\x20F\x20=\x20EnvironmentBRDF(\x20n,\x20v,\x20specularColor,\x20specularF90,\x20roughness\x20);\x0a\x0a\x09\x09//\x20As\x20less\x20light\x20is\x20transmitted,\x20the\x20opacity\x20should\x20be\x20increased.\x20This\x20simple\x20approximation\x20does\x20a\x20decent\x20job\x20\x0a\x09\x09//\x20of\x20modulating\x20a\x20CSS\x20background,\x20and\x20has\x20no\x20effect\x20when\x20the\x20buffer\x20is\x20opaque,\x20due\x20to\x20a\x20solid\x20object\x20or\x20clear\x20color.\x0a\x09\x09float\x20transmittanceFactor\x20=\x20(\x20transmittance.r\x20+\x20transmittance.g\x20+\x20transmittance.b\x20)\x20/\x203.0;\x0a\x0a\x09\x09return\x20vec4(\x20(\x201.0\x20-\x20F\x20)\x20*\x20attenuatedColor,\x201.0\x20-\x20(\x201.0\x20-\x20transmittedLight.a\x20)\x20*\x20transmittanceFactor\x20);\x0a\x0a\x09}\x0a#endif\x0a',
            'uv_pars_fragment': '\x0a#if\x20defined(\x20USE_UV\x20)\x20||\x20defined(\x20USE_ANISOTROPY\x20)\x0a\x0a\x09varying\x20vec2\x20vUv;\x0a\x0a#endif\x0a#ifdef\x20USE_MAP\x0a\x0a\x09varying\x20vec2\x20vMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_ALPHAMAP\x0a\x0a\x09varying\x20vec2\x20vAlphaMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_LIGHTMAP\x0a\x0a\x09varying\x20vec2\x20vLightMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_AOMAP\x0a\x0a\x09varying\x20vec2\x20vAoMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_BUMPMAP\x0a\x0a\x09varying\x20vec2\x20vBumpMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_NORMALMAP\x0a\x0a\x09varying\x20vec2\x20vNormalMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_EMISSIVEMAP\x0a\x0a\x09varying\x20vec2\x20vEmissiveMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_METALNESSMAP\x0a\x0a\x09varying\x20vec2\x20vMetalnessMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_ROUGHNESSMAP\x0a\x0a\x09varying\x20vec2\x20vRoughnessMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_ANISOTROPYMAP\x0a\x0a\x09varying\x20vec2\x20vAnisotropyMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_CLEARCOATMAP\x0a\x0a\x09varying\x20vec2\x20vClearcoatMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_CLEARCOAT_NORMALMAP\x0a\x0a\x09varying\x20vec2\x20vClearcoatNormalMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_CLEARCOAT_ROUGHNESSMAP\x0a\x0a\x09varying\x20vec2\x20vClearcoatRoughnessMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_IRIDESCENCEMAP\x0a\x0a\x09varying\x20vec2\x20vIridescenceMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_IRIDESCENCE_THICKNESSMAP\x0a\x0a\x09varying\x20vec2\x20vIridescenceThicknessMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_SHEEN_COLORMAP\x0a\x0a\x09varying\x20vec2\x20vSheenColorMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_SHEEN_ROUGHNESSMAP\x0a\x0a\x09varying\x20vec2\x20vSheenRoughnessMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_SPECULARMAP\x0a\x0a\x09varying\x20vec2\x20vSpecularMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_SPECULAR_COLORMAP\x0a\x0a\x09varying\x20vec2\x20vSpecularColorMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_SPECULAR_INTENSITYMAP\x0a\x0a\x09varying\x20vec2\x20vSpecularIntensityMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_TRANSMISSIONMAP\x0a\x0a\x09uniform\x20mat3\x20transmissionMapTransform;\x0a\x09varying\x20vec2\x20vTransmissionMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_THICKNESSMAP\x0a\x0a\x09uniform\x20mat3\x20thicknessMapTransform;\x0a\x09varying\x20vec2\x20vThicknessMapUv;\x0a\x0a#endif\x0a',
            'uv_pars_vertex': '\x0a#if\x20defined(\x20USE_UV\x20)\x20||\x20defined(\x20USE_ANISOTROPY\x20)\x0a\x0a\x09varying\x20vec2\x20vUv;\x0a\x0a#endif\x0a#ifdef\x20USE_MAP\x0a\x0a\x09uniform\x20mat3\x20mapTransform;\x0a\x09varying\x20vec2\x20vMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_ALPHAMAP\x0a\x0a\x09uniform\x20mat3\x20alphaMapTransform;\x0a\x09varying\x20vec2\x20vAlphaMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_LIGHTMAP\x0a\x0a\x09uniform\x20mat3\x20lightMapTransform;\x0a\x09varying\x20vec2\x20vLightMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_AOMAP\x0a\x0a\x09uniform\x20mat3\x20aoMapTransform;\x0a\x09varying\x20vec2\x20vAoMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_BUMPMAP\x0a\x0a\x09uniform\x20mat3\x20bumpMapTransform;\x0a\x09varying\x20vec2\x20vBumpMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_NORMALMAP\x0a\x0a\x09uniform\x20mat3\x20normalMapTransform;\x0a\x09varying\x20vec2\x20vNormalMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_DISPLACEMENTMAP\x0a\x0a\x09uniform\x20mat3\x20displacementMapTransform;\x0a\x09varying\x20vec2\x20vDisplacementMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_EMISSIVEMAP\x0a\x0a\x09uniform\x20mat3\x20emissiveMapTransform;\x0a\x09varying\x20vec2\x20vEmissiveMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_METALNESSMAP\x0a\x0a\x09uniform\x20mat3\x20metalnessMapTransform;\x0a\x09varying\x20vec2\x20vMetalnessMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_ROUGHNESSMAP\x0a\x0a\x09uniform\x20mat3\x20roughnessMapTransform;\x0a\x09varying\x20vec2\x20vRoughnessMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_ANISOTROPYMAP\x0a\x0a\x09uniform\x20mat3\x20anisotropyMapTransform;\x0a\x09varying\x20vec2\x20vAnisotropyMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_CLEARCOATMAP\x0a\x0a\x09uniform\x20mat3\x20clearcoatMapTransform;\x0a\x09varying\x20vec2\x20vClearcoatMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_CLEARCOAT_NORMALMAP\x0a\x0a\x09uniform\x20mat3\x20clearcoatNormalMapTransform;\x0a\x09varying\x20vec2\x20vClearcoatNormalMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_CLEARCOAT_ROUGHNESSMAP\x0a\x0a\x09uniform\x20mat3\x20clearcoatRoughnessMapTransform;\x0a\x09varying\x20vec2\x20vClearcoatRoughnessMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_SHEEN_COLORMAP\x0a\x0a\x09uniform\x20mat3\x20sheenColorMapTransform;\x0a\x09varying\x20vec2\x20vSheenColorMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_SHEEN_ROUGHNESSMAP\x0a\x0a\x09uniform\x20mat3\x20sheenRoughnessMapTransform;\x0a\x09varying\x20vec2\x20vSheenRoughnessMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_IRIDESCENCEMAP\x0a\x0a\x09uniform\x20mat3\x20iridescenceMapTransform;\x0a\x09varying\x20vec2\x20vIridescenceMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_IRIDESCENCE_THICKNESSMAP\x0a\x0a\x09uniform\x20mat3\x20iridescenceThicknessMapTransform;\x0a\x09varying\x20vec2\x20vIridescenceThicknessMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_SPECULARMAP\x0a\x0a\x09uniform\x20mat3\x20specularMapTransform;\x0a\x09varying\x20vec2\x20vSpecularMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_SPECULAR_COLORMAP\x0a\x0a\x09uniform\x20mat3\x20specularColorMapTransform;\x0a\x09varying\x20vec2\x20vSpecularColorMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_SPECULAR_INTENSITYMAP\x0a\x0a\x09uniform\x20mat3\x20specularIntensityMapTransform;\x0a\x09varying\x20vec2\x20vSpecularIntensityMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_TRANSMISSIONMAP\x0a\x0a\x09uniform\x20mat3\x20transmissionMapTransform;\x0a\x09varying\x20vec2\x20vTransmissionMapUv;\x0a\x0a#endif\x0a#ifdef\x20USE_THICKNESSMAP\x0a\x0a\x09uniform\x20mat3\x20thicknessMapTransform;\x0a\x09varying\x20vec2\x20vThicknessMapUv;\x0a\x0a#endif\x0a',
            'uv_vertex': '\x0a#if\x20defined(\x20USE_UV\x20)\x20||\x20defined(\x20USE_ANISOTROPY\x20)\x0a\x0a\x09vUv\x20=\x20vec3(\x20uv,\x201\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_MAP\x0a\x0a\x09vMapUv\x20=\x20(\x20mapTransform\x20*\x20vec3(\x20MAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_ALPHAMAP\x0a\x0a\x09vAlphaMapUv\x20=\x20(\x20alphaMapTransform\x20*\x20vec3(\x20ALPHAMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_LIGHTMAP\x0a\x0a\x09vLightMapUv\x20=\x20(\x20lightMapTransform\x20*\x20vec3(\x20LIGHTMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_AOMAP\x0a\x0a\x09vAoMapUv\x20=\x20(\x20aoMapTransform\x20*\x20vec3(\x20AOMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_BUMPMAP\x0a\x0a\x09vBumpMapUv\x20=\x20(\x20bumpMapTransform\x20*\x20vec3(\x20BUMPMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_NORMALMAP\x0a\x0a\x09vNormalMapUv\x20=\x20(\x20normalMapTransform\x20*\x20vec3(\x20NORMALMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_DISPLACEMENTMAP\x0a\x0a\x09vDisplacementMapUv\x20=\x20(\x20displacementMapTransform\x20*\x20vec3(\x20DISPLACEMENTMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_EMISSIVEMAP\x0a\x0a\x09vEmissiveMapUv\x20=\x20(\x20emissiveMapTransform\x20*\x20vec3(\x20EMISSIVEMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_METALNESSMAP\x0a\x0a\x09vMetalnessMapUv\x20=\x20(\x20metalnessMapTransform\x20*\x20vec3(\x20METALNESSMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_ROUGHNESSMAP\x0a\x0a\x09vRoughnessMapUv\x20=\x20(\x20roughnessMapTransform\x20*\x20vec3(\x20ROUGHNESSMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_ANISOTROPYMAP\x0a\x0a\x09vAnisotropyMapUv\x20=\x20(\x20anisotropyMapTransform\x20*\x20vec3(\x20ANISOTROPYMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_CLEARCOATMAP\x0a\x0a\x09vClearcoatMapUv\x20=\x20(\x20clearcoatMapTransform\x20*\x20vec3(\x20CLEARCOATMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_CLEARCOAT_NORMALMAP\x0a\x0a\x09vClearcoatNormalMapUv\x20=\x20(\x20clearcoatNormalMapTransform\x20*\x20vec3(\x20CLEARCOAT_NORMALMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_CLEARCOAT_ROUGHNESSMAP\x0a\x0a\x09vClearcoatRoughnessMapUv\x20=\x20(\x20clearcoatRoughnessMapTransform\x20*\x20vec3(\x20CLEARCOAT_ROUGHNESSMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_IRIDESCENCEMAP\x0a\x0a\x09vIridescenceMapUv\x20=\x20(\x20iridescenceMapTransform\x20*\x20vec3(\x20IRIDESCENCEMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_IRIDESCENCE_THICKNESSMAP\x0a\x0a\x09vIridescenceThicknessMapUv\x20=\x20(\x20iridescenceThicknessMapTransform\x20*\x20vec3(\x20IRIDESCENCE_THICKNESSMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_SHEEN_COLORMAP\x0a\x0a\x09vSheenColorMapUv\x20=\x20(\x20sheenColorMapTransform\x20*\x20vec3(\x20SHEEN_COLORMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_SHEEN_ROUGHNESSMAP\x0a\x0a\x09vSheenRoughnessMapUv\x20=\x20(\x20sheenRoughnessMapTransform\x20*\x20vec3(\x20SHEEN_ROUGHNESSMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_SPECULARMAP\x0a\x0a\x09vSpecularMapUv\x20=\x20(\x20specularMapTransform\x20*\x20vec3(\x20SPECULARMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_SPECULAR_COLORMAP\x0a\x0a\x09vSpecularColorMapUv\x20=\x20(\x20specularColorMapTransform\x20*\x20vec3(\x20SPECULAR_COLORMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_SPECULAR_INTENSITYMAP\x0a\x0a\x09vSpecularIntensityMapUv\x20=\x20(\x20specularIntensityMapTransform\x20*\x20vec3(\x20SPECULAR_INTENSITYMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_TRANSMISSIONMAP\x0a\x0a\x09vTransmissionMapUv\x20=\x20(\x20transmissionMapTransform\x20*\x20vec3(\x20TRANSMISSIONMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a#ifdef\x20USE_THICKNESSMAP\x0a\x0a\x09vThicknessMapUv\x20=\x20(\x20thicknessMapTransform\x20*\x20vec3(\x20THICKNESSMAP_UV,\x201\x20)\x20).xy;\x0a\x0a#endif\x0a',
            'worldpos_vertex': '\x0a#if\x20defined(\x20USE_ENVMAP\x20)\x20||\x20defined(\x20DISTANCE\x20)\x20||\x20defined\x20(\x20USE_SHADOWMAP\x20)\x20||\x20defined\x20(\x20USE_TRANSMISSION\x20)\x20||\x20NUM_SPOT_LIGHT_COORDS\x20>\x200\x0a\x0a\x09vec4\x20worldPosition\x20=\x20vec4(\x20transformed,\x201.0\x20);\x0a\x0a\x09#ifdef\x20USE_BATCHING\x0a\x0a\x09\x09worldPosition\x20=\x20batchingMatrix\x20*\x20worldPosition;\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_INSTANCING\x0a\x0a\x09\x09worldPosition\x20=\x20instanceMatrix\x20*\x20worldPosition;\x0a\x0a\x09#endif\x0a\x0a\x09worldPosition\x20=\x20modelMatrix\x20*\x20worldPosition;\x0a\x0a#endif\x0a',
            'background_vert': '\x0avarying\x20vec2\x20vUv;\x0auniform\x20mat3\x20uvTransform;\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09vUv\x20=\x20(\x20uvTransform\x20*\x20vec3(\x20uv,\x201\x20)\x20).xy;\x0a\x0a\x09gl_Position\x20=\x20vec4(\x20position.xy,\x201.0,\x201.0\x20);\x0a\x0a}\x0a',
            'background_frag': '\x0auniform\x20sampler2D\x20t2D;\x0auniform\x20float\x20backgroundIntensity;\x0a\x0avarying\x20vec2\x20vUv;\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09vec4\x20texColor\x20=\x20texture2D(\x20t2D,\x20vUv\x20);\x0a\x0a\x09#ifdef\x20DECODE_VIDEO_TEXTURE\x0a\x0a\x09\x09//\x20use\x20inline\x20sRGB\x20decode\x20until\x20browsers\x20properly\x20support\x20SRGB8_APLHA8\x20with\x20video\x20textures\x0a\x0a\x09\x09texColor\x20=\x20vec4(\x20mix(\x20pow(\x20texColor.rgb\x20*\x200.9478672986\x20+\x20vec3(\x200.0521327014\x20),\x20vec3(\x202.4\x20)\x20),\x20texColor.rgb\x20*\x200.0773993808,\x20vec3(\x20lessThanEqual(\x20texColor.rgb,\x20vec3(\x200.04045\x20)\x20)\x20)\x20),\x20texColor.w\x20);\x0a\x0a\x09#endif\x0a\x0a\x09texColor.rgb\x20*=\x20backgroundIntensity;\x0a\x0a\x09gl_FragColor\x20=\x20texColor;\x0a\x0a\x09#include\x20<tonemapping_fragment>\x0a\x09#include\x20<colorspace_fragment>\x0a\x0a}\x0a',
            'backgroundCube_vert': '\x0avarying\x20vec3\x20vWorldDirection;\x0a\x0a#include\x20<common>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09vWorldDirection\x20=\x20transformDirection(\x20position,\x20modelMatrix\x20);\x0a\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x0a\x09gl_Position.z\x20=\x20gl_Position.w;\x20//\x20set\x20z\x20to\x20camera.far\x0a\x0a}\x0a',
            'backgroundCube_frag': '\x0a\x0a#ifdef\x20ENVMAP_TYPE_CUBE\x0a\x0a\x09uniform\x20samplerCube\x20envMap;\x0a\x0a#elif\x20defined(\x20ENVMAP_TYPE_CUBE_UV\x20)\x0a\x0a\x09uniform\x20sampler2D\x20envMap;\x0a\x0a#endif\x0a\x0auniform\x20float\x20flipEnvMap;\x0auniform\x20float\x20backgroundBlurriness;\x0auniform\x20float\x20backgroundIntensity;\x0a\x0avarying\x20vec3\x20vWorldDirection;\x0a\x0a#include\x20<cube_uv_reflection_fragment>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#ifdef\x20ENVMAP_TYPE_CUBE\x0a\x0a\x09\x09vec4\x20texColor\x20=\x20textureCube(\x20envMap,\x20vec3(\x20flipEnvMap\x20*\x20vWorldDirection.x,\x20vWorldDirection.yz\x20)\x20);\x0a\x0a\x09#elif\x20defined(\x20ENVMAP_TYPE_CUBE_UV\x20)\x0a\x0a\x09\x09vec4\x20texColor\x20=\x20textureCubeUV(\x20envMap,\x20vWorldDirection,\x20backgroundBlurriness\x20);\x0a\x0a\x09#else\x0a\x0a\x09\x09vec4\x20texColor\x20=\x20vec4(\x200.0,\x200.0,\x200.0,\x201.0\x20);\x0a\x0a\x09#endif\x0a\x0a\x09texColor.rgb\x20*=\x20backgroundIntensity;\x0a\x0a\x09gl_FragColor\x20=\x20texColor;\x0a\x0a\x09#include\x20<tonemapping_fragment>\x0a\x09#include\x20<colorspace_fragment>\x0a\x0a}\x0a',
            'cube_vert': '\x0avarying\x20vec3\x20vWorldDirection;\x0a\x0a#include\x20<common>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09vWorldDirection\x20=\x20transformDirection(\x20position,\x20modelMatrix\x20);\x0a\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x0a\x09gl_Position.z\x20=\x20gl_Position.w;\x20//\x20set\x20z\x20to\x20camera.far\x0a\x0a}\x0a',
            'cube_frag': '\x0auniform\x20samplerCube\x20tCube;\x0auniform\x20float\x20tFlip;\x0auniform\x20float\x20opacity;\x0a\x0avarying\x20vec3\x20vWorldDirection;\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09vec4\x20texColor\x20=\x20textureCube(\x20tCube,\x20vec3(\x20tFlip\x20*\x20vWorldDirection.x,\x20vWorldDirection.yz\x20)\x20);\x0a\x0a\x09gl_FragColor\x20=\x20texColor;\x0a\x09gl_FragColor.a\x20*=\x20opacity;\x0a\x0a\x09#include\x20<tonemapping_fragment>\x0a\x09#include\x20<colorspace_fragment>\x0a\x0a}\x0a',
            'depth_vert': '\x0a#include\x20<common>\x0a#include\x20<batching_pars_vertex>\x0a#include\x20<uv_pars_vertex>\x0a#include\x20<displacementmap_pars_vertex>\x0a#include\x20<morphtarget_pars_vertex>\x0a#include\x20<skinning_pars_vertex>\x0a#include\x20<logdepthbuf_pars_vertex>\x0a#include\x20<clipping_planes_pars_vertex>\x0a\x0a//\x20This\x20is\x20used\x20for\x20computing\x20an\x20equivalent\x20of\x20gl_FragCoord.z\x20that\x20is\x20as\x20high\x20precision\x20as\x20possible.\x0a//\x20Some\x20platforms\x20compute\x20gl_FragCoord\x20at\x20a\x20lower\x20precision\x20which\x20makes\x20the\x20manually\x20computed\x20value\x20better\x20for\x0a//\x20depth-based\x20postprocessing\x20effects.\x20Reproduced\x20on\x20iPad\x20with\x20A10\x20processor\x20/\x20iPadOS\x2013.3.1.\x0avarying\x20vec2\x20vHighPrecisionZW;\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<uv_vertex>\x0a\x0a\x09#include\x20<batching_vertex>\x0a\x09#include\x20<skinbase_vertex>\x0a\x0a\x09#ifdef\x20USE_DISPLACEMENTMAP\x0a\x0a\x09\x09#include\x20<beginnormal_vertex>\x0a\x09\x09#include\x20<morphnormal_vertex>\x0a\x09\x09#include\x20<skinnormal_vertex>\x0a\x0a\x09#endif\x0a\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<morphtarget_vertex>\x0a\x09#include\x20<skinning_vertex>\x0a\x09#include\x20<displacementmap_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x09#include\x20<logdepthbuf_vertex>\x0a\x09#include\x20<clipping_planes_vertex>\x0a\x0a\x09vHighPrecisionZW\x20=\x20gl_Position.zw;\x0a\x0a}\x0a',
            'depth_frag': '\x0a#if\x20DEPTH_PACKING\x20==\x203200\x0a\x0a\x09uniform\x20float\x20opacity;\x0a\x0a#endif\x0a\x0a#include\x20<common>\x0a#include\x20<packing>\x0a#include\x20<uv_pars_fragment>\x0a#include\x20<map_pars_fragment>\x0a#include\x20<alphamap_pars_fragment>\x0a#include\x20<alphatest_pars_fragment>\x0a#include\x20<alphahash_pars_fragment>\x0a#include\x20<logdepthbuf_pars_fragment>\x0a#include\x20<clipping_planes_pars_fragment>\x0a\x0avarying\x20vec2\x20vHighPrecisionZW;\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<clipping_planes_fragment>\x0a\x0a\x09vec4\x20diffuseColor\x20=\x20vec4(\x201.0\x20);\x0a\x0a\x09#if\x20DEPTH_PACKING\x20==\x203200\x0a\x0a\x09\x09diffuseColor.a\x20=\x20opacity;\x0a\x0a\x09#endif\x0a\x0a\x09#include\x20<map_fragment>\x0a\x09#include\x20<alphamap_fragment>\x0a\x09#include\x20<alphatest_fragment>\x0a\x09#include\x20<alphahash_fragment>\x0a\x0a\x09#include\x20<logdepthbuf_fragment>\x0a\x0a\x09//\x20Higher\x20precision\x20equivalent\x20of\x20gl_FragCoord.z.\x20This\x20assumes\x20depthRange\x20has\x20been\x20left\x20to\x20its\x20default\x20values.\x0a\x09float\x20fragCoordZ\x20=\x200.5\x20*\x20vHighPrecisionZW[0]\x20/\x20vHighPrecisionZW[1]\x20+\x200.5;\x0a\x0a\x09#if\x20DEPTH_PACKING\x20==\x203200\x0a\x0a\x09\x09gl_FragColor\x20=\x20vec4(\x20vec3(\x201.0\x20-\x20fragCoordZ\x20),\x20opacity\x20);\x0a\x0a\x09#elif\x20DEPTH_PACKING\x20==\x203201\x0a\x0a\x09\x09gl_FragColor\x20=\x20packDepthToRGBA(\x20fragCoordZ\x20);\x0a\x0a\x09#endif\x0a\x0a}\x0a',
            'distanceRGBA_vert': '\x0a#define\x20DISTANCE\x0a\x0avarying\x20vec3\x20vWorldPosition;\x0a\x0a#include\x20<common>\x0a#include\x20<batching_pars_vertex>\x0a#include\x20<uv_pars_vertex>\x0a#include\x20<displacementmap_pars_vertex>\x0a#include\x20<morphtarget_pars_vertex>\x0a#include\x20<skinning_pars_vertex>\x0a#include\x20<clipping_planes_pars_vertex>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<uv_vertex>\x0a\x0a\x09#include\x20<batching_vertex>\x0a\x09#include\x20<skinbase_vertex>\x0a\x0a\x09#ifdef\x20USE_DISPLACEMENTMAP\x0a\x0a\x09\x09#include\x20<beginnormal_vertex>\x0a\x09\x09#include\x20<morphnormal_vertex>\x0a\x09\x09#include\x20<skinnormal_vertex>\x0a\x0a\x09#endif\x0a\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<morphtarget_vertex>\x0a\x09#include\x20<skinning_vertex>\x0a\x09#include\x20<displacementmap_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x09#include\x20<worldpos_vertex>\x0a\x09#include\x20<clipping_planes_vertex>\x0a\x0a\x09vWorldPosition\x20=\x20worldPosition.xyz;\x0a\x0a}\x0a',
            'distanceRGBA_frag': '\x0a#define\x20DISTANCE\x0a\x0auniform\x20vec3\x20referencePosition;\x0auniform\x20float\x20nearDistance;\x0auniform\x20float\x20farDistance;\x0avarying\x20vec3\x20vWorldPosition;\x0a\x0a#include\x20<common>\x0a#include\x20<packing>\x0a#include\x20<uv_pars_fragment>\x0a#include\x20<map_pars_fragment>\x0a#include\x20<alphamap_pars_fragment>\x0a#include\x20<alphatest_pars_fragment>\x0a#include\x20<alphahash_pars_fragment>\x0a#include\x20<clipping_planes_pars_fragment>\x0a\x0avoid\x20main\x20()\x20{\x0a\x0a\x09#include\x20<clipping_planes_fragment>\x0a\x0a\x09vec4\x20diffuseColor\x20=\x20vec4(\x201.0\x20);\x0a\x0a\x09#include\x20<map_fragment>\x0a\x09#include\x20<alphamap_fragment>\x0a\x09#include\x20<alphatest_fragment>\x0a\x09#include\x20<alphahash_fragment>\x0a\x0a\x09float\x20dist\x20=\x20length(\x20vWorldPosition\x20-\x20referencePosition\x20);\x0a\x09dist\x20=\x20(\x20dist\x20-\x20nearDistance\x20)\x20/\x20(\x20farDistance\x20-\x20nearDistance\x20);\x0a\x09dist\x20=\x20saturate(\x20dist\x20);\x20//\x20clamp\x20to\x20[\x200,\x201\x20]\x0a\x0a\x09gl_FragColor\x20=\x20packDepthToRGBA(\x20dist\x20);\x0a\x0a}\x0a',
            'equirect_vert': '\x0avarying\x20vec3\x20vWorldDirection;\x0a\x0a#include\x20<common>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09vWorldDirection\x20=\x20transformDirection(\x20position,\x20modelMatrix\x20);\x0a\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x0a}\x0a',
            'equirect_frag': '\x0auniform\x20sampler2D\x20tEquirect;\x0a\x0avarying\x20vec3\x20vWorldDirection;\x0a\x0a#include\x20<common>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09vec3\x20direction\x20=\x20normalize(\x20vWorldDirection\x20);\x0a\x0a\x09vec2\x20sampleUV\x20=\x20equirectUv(\x20direction\x20);\x0a\x0a\x09gl_FragColor\x20=\x20texture2D(\x20tEquirect,\x20sampleUV\x20);\x0a\x0a\x09#include\x20<tonemapping_fragment>\x0a\x09#include\x20<colorspace_fragment>\x0a\x0a}\x0a',
            'linedashed_vert': '\x0auniform\x20float\x20scale;\x0aattribute\x20float\x20lineDistance;\x0a\x0avarying\x20float\x20vLineDistance;\x0a\x0a#include\x20<common>\x0a#include\x20<uv_pars_vertex>\x0a#include\x20<color_pars_vertex>\x0a#include\x20<fog_pars_vertex>\x0a#include\x20<morphtarget_pars_vertex>\x0a#include\x20<logdepthbuf_pars_vertex>\x0a#include\x20<clipping_planes_pars_vertex>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09vLineDistance\x20=\x20scale\x20*\x20lineDistance;\x0a\x0a\x09#include\x20<uv_vertex>\x0a\x09#include\x20<color_vertex>\x0a\x09#include\x20<morphcolor_vertex>\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<morphtarget_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x09#include\x20<logdepthbuf_vertex>\x0a\x09#include\x20<clipping_planes_vertex>\x0a\x09#include\x20<fog_vertex>\x0a\x0a}\x0a',
            'linedashed_frag': '\x0auniform\x20vec3\x20diffuse;\x0auniform\x20float\x20opacity;\x0a\x0auniform\x20float\x20dashSize;\x0auniform\x20float\x20totalSize;\x0a\x0avarying\x20float\x20vLineDistance;\x0a\x0a#include\x20<common>\x0a#include\x20<color_pars_fragment>\x0a#include\x20<uv_pars_fragment>\x0a#include\x20<map_pars_fragment>\x0a#include\x20<fog_pars_fragment>\x0a#include\x20<logdepthbuf_pars_fragment>\x0a#include\x20<clipping_planes_pars_fragment>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<clipping_planes_fragment>\x0a\x0a\x09if\x20(\x20mod(\x20vLineDistance,\x20totalSize\x20)\x20>\x20dashSize\x20)\x20{\x0a\x0a\x09\x09discard;\x0a\x0a\x09}\x0a\x0a\x09vec3\x20outgoingLight\x20=\x20vec3(\x200.0\x20);\x0a\x09vec4\x20diffuseColor\x20=\x20vec4(\x20diffuse,\x20opacity\x20);\x0a\x0a\x09#include\x20<logdepthbuf_fragment>\x0a\x09#include\x20<map_fragment>\x0a\x09#include\x20<color_fragment>\x0a\x0a\x09outgoingLight\x20=\x20diffuseColor.rgb;\x20//\x20simple\x20shader\x0a\x0a\x09#include\x20<opaque_fragment>\x0a\x09#include\x20<tonemapping_fragment>\x0a\x09#include\x20<colorspace_fragment>\x0a\x09#include\x20<fog_fragment>\x0a\x09#include\x20<premultiplied_alpha_fragment>\x0a\x0a}\x0a',
            'meshbasic_vert': '\x0a#include\x20<common>\x0a#include\x20<batching_pars_vertex>\x0a#include\x20<uv_pars_vertex>\x0a#include\x20<envmap_pars_vertex>\x0a#include\x20<color_pars_vertex>\x0a#include\x20<fog_pars_vertex>\x0a#include\x20<morphtarget_pars_vertex>\x0a#include\x20<skinning_pars_vertex>\x0a#include\x20<logdepthbuf_pars_vertex>\x0a#include\x20<clipping_planes_pars_vertex>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<uv_vertex>\x0a\x09#include\x20<color_vertex>\x0a\x09#include\x20<morphcolor_vertex>\x0a\x09#include\x20<batching_vertex>\x0a\x0a\x09#if\x20defined\x20(\x20USE_ENVMAP\x20)\x20||\x20defined\x20(\x20USE_SKINNING\x20)\x0a\x0a\x09\x09#include\x20<beginnormal_vertex>\x0a\x09\x09#include\x20<morphnormal_vertex>\x0a\x09\x09#include\x20<skinbase_vertex>\x0a\x09\x09#include\x20<skinnormal_vertex>\x0a\x09\x09#include\x20<defaultnormal_vertex>\x0a\x0a\x09#endif\x0a\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<morphtarget_vertex>\x0a\x09#include\x20<skinning_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x09#include\x20<logdepthbuf_vertex>\x0a\x09#include\x20<clipping_planes_vertex>\x0a\x0a\x09#include\x20<worldpos_vertex>\x0a\x09#include\x20<envmap_vertex>\x0a\x09#include\x20<fog_vertex>\x0a\x0a}\x0a',
            'meshbasic_frag': '\x0auniform\x20vec3\x20diffuse;\x0auniform\x20float\x20opacity;\x0a\x0a#ifndef\x20FLAT_SHADED\x0a\x0a\x09varying\x20vec3\x20vNormal;\x0a\x0a#endif\x0a\x0a#include\x20<common>\x0a#include\x20<dithering_pars_fragment>\x0a#include\x20<color_pars_fragment>\x0a#include\x20<uv_pars_fragment>\x0a#include\x20<map_pars_fragment>\x0a#include\x20<alphamap_pars_fragment>\x0a#include\x20<alphatest_pars_fragment>\x0a#include\x20<alphahash_pars_fragment>\x0a#include\x20<aomap_pars_fragment>\x0a#include\x20<lightmap_pars_fragment>\x0a#include\x20<envmap_common_pars_fragment>\x0a#include\x20<envmap_pars_fragment>\x0a#include\x20<fog_pars_fragment>\x0a#include\x20<specularmap_pars_fragment>\x0a#include\x20<logdepthbuf_pars_fragment>\x0a#include\x20<clipping_planes_pars_fragment>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<clipping_planes_fragment>\x0a\x0a\x09vec4\x20diffuseColor\x20=\x20vec4(\x20diffuse,\x20opacity\x20);\x0a\x0a\x09#include\x20<logdepthbuf_fragment>\x0a\x09#include\x20<map_fragment>\x0a\x09#include\x20<color_fragment>\x0a\x09#include\x20<alphamap_fragment>\x0a\x09#include\x20<alphatest_fragment>\x0a\x09#include\x20<alphahash_fragment>\x0a\x09#include\x20<specularmap_fragment>\x0a\x0a\x09ReflectedLight\x20reflectedLight\x20=\x20ReflectedLight(\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20)\x20);\x0a\x0a\x09//\x20accumulation\x20(baked\x20indirect\x20lighting\x20only)\x0a\x09#ifdef\x20USE_LIGHTMAP\x0a\x0a\x09\x09vec4\x20lightMapTexel\x20=\x20texture2D(\x20lightMap,\x20vLightMapUv\x20);\x0a\x09\x09reflectedLight.indirectDiffuse\x20+=\x20lightMapTexel.rgb\x20*\x20lightMapIntensity\x20*\x20RECIPROCAL_PI;\x0a\x0a\x09#else\x0a\x0a\x09\x09reflectedLight.indirectDiffuse\x20+=\x20vec3(\x201.0\x20);\x0a\x0a\x09#endif\x0a\x0a\x09//\x20modulation\x0a\x09#include\x20<aomap_fragment>\x0a\x0a\x09reflectedLight.indirectDiffuse\x20*=\x20diffuseColor.rgb;\x0a\x0a\x09vec3\x20outgoingLight\x20=\x20reflectedLight.indirectDiffuse;\x0a\x0a\x09#include\x20<envmap_fragment>\x0a\x0a\x09#include\x20<opaque_fragment>\x0a\x09#include\x20<tonemapping_fragment>\x0a\x09#include\x20<colorspace_fragment>\x0a\x09#include\x20<fog_fragment>\x0a\x09#include\x20<premultiplied_alpha_fragment>\x0a\x09#include\x20<dithering_fragment>\x0a\x0a}\x0a',
            'meshlambert_vert': '\x0a#define\x20LAMBERT\x0a\x0avarying\x20vec3\x20vViewPosition;\x0a\x0a#include\x20<common>\x0a#include\x20<batching_pars_vertex>\x0a#include\x20<uv_pars_vertex>\x0a#include\x20<displacementmap_pars_vertex>\x0a#include\x20<envmap_pars_vertex>\x0a#include\x20<color_pars_vertex>\x0a#include\x20<fog_pars_vertex>\x0a#include\x20<normal_pars_vertex>\x0a#include\x20<morphtarget_pars_vertex>\x0a#include\x20<skinning_pars_vertex>\x0a#include\x20<shadowmap_pars_vertex>\x0a#include\x20<logdepthbuf_pars_vertex>\x0a#include\x20<clipping_planes_pars_vertex>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<uv_vertex>\x0a\x09#include\x20<color_vertex>\x0a\x09#include\x20<morphcolor_vertex>\x0a\x09#include\x20<batching_vertex>\x0a\x0a\x09#include\x20<beginnormal_vertex>\x0a\x09#include\x20<morphnormal_vertex>\x0a\x09#include\x20<skinbase_vertex>\x0a\x09#include\x20<skinnormal_vertex>\x0a\x09#include\x20<defaultnormal_vertex>\x0a\x09#include\x20<normal_vertex>\x0a\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<morphtarget_vertex>\x0a\x09#include\x20<skinning_vertex>\x0a\x09#include\x20<displacementmap_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x09#include\x20<logdepthbuf_vertex>\x0a\x09#include\x20<clipping_planes_vertex>\x0a\x0a\x09vViewPosition\x20=\x20-\x20mvPosition.xyz;\x0a\x0a\x09#include\x20<worldpos_vertex>\x0a\x09#include\x20<envmap_vertex>\x0a\x09#include\x20<shadowmap_vertex>\x0a\x09#include\x20<fog_vertex>\x0a\x0a}\x0a',
            'meshlambert_frag': '\x0a#define\x20LAMBERT\x0a\x0auniform\x20vec3\x20diffuse;\x0auniform\x20vec3\x20emissive;\x0auniform\x20float\x20opacity;\x0a\x0a#include\x20<common>\x0a#include\x20<packing>\x0a#include\x20<dithering_pars_fragment>\x0a#include\x20<color_pars_fragment>\x0a#include\x20<uv_pars_fragment>\x0a#include\x20<map_pars_fragment>\x0a#include\x20<alphamap_pars_fragment>\x0a#include\x20<alphatest_pars_fragment>\x0a#include\x20<alphahash_pars_fragment>\x0a#include\x20<aomap_pars_fragment>\x0a#include\x20<lightmap_pars_fragment>\x0a#include\x20<emissivemap_pars_fragment>\x0a#include\x20<envmap_common_pars_fragment>\x0a#include\x20<envmap_pars_fragment>\x0a#include\x20<fog_pars_fragment>\x0a#include\x20<bsdfs>\x0a#include\x20<lights_pars_begin>\x0a#include\x20<normal_pars_fragment>\x0a#include\x20<lights_lambert_pars_fragment>\x0a#include\x20<shadowmap_pars_fragment>\x0a#include\x20<bumpmap_pars_fragment>\x0a#include\x20<normalmap_pars_fragment>\x0a#include\x20<specularmap_pars_fragment>\x0a#include\x20<logdepthbuf_pars_fragment>\x0a#include\x20<clipping_planes_pars_fragment>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<clipping_planes_fragment>\x0a\x0a\x09vec4\x20diffuseColor\x20=\x20vec4(\x20diffuse,\x20opacity\x20);\x0a\x09ReflectedLight\x20reflectedLight\x20=\x20ReflectedLight(\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20)\x20);\x0a\x09vec3\x20totalEmissiveRadiance\x20=\x20emissive;\x0a\x0a\x09#include\x20<logdepthbuf_fragment>\x0a\x09#include\x20<map_fragment>\x0a\x09#include\x20<color_fragment>\x0a\x09#include\x20<alphamap_fragment>\x0a\x09#include\x20<alphatest_fragment>\x0a\x09#include\x20<alphahash_fragment>\x0a\x09#include\x20<specularmap_fragment>\x0a\x09#include\x20<normal_fragment_begin>\x0a\x09#include\x20<normal_fragment_maps>\x0a\x09#include\x20<emissivemap_fragment>\x0a\x0a\x09//\x20accumulation\x0a\x09#include\x20<lights_lambert_fragment>\x0a\x09#include\x20<lights_fragment_begin>\x0a\x09#include\x20<lights_fragment_maps>\x0a\x09#include\x20<lights_fragment_end>\x0a\x0a\x09//\x20modulation\x0a\x09#include\x20<aomap_fragment>\x0a\x0a\x09vec3\x20outgoingLight\x20=\x20reflectedLight.directDiffuse\x20+\x20reflectedLight.indirectDiffuse\x20+\x20totalEmissiveRadiance;\x0a\x0a\x09#include\x20<envmap_fragment>\x0a\x09#include\x20<opaque_fragment>\x0a\x09#include\x20<tonemapping_fragment>\x0a\x09#include\x20<colorspace_fragment>\x0a\x09#include\x20<fog_fragment>\x0a\x09#include\x20<premultiplied_alpha_fragment>\x0a\x09#include\x20<dithering_fragment>\x0a\x0a}\x0a',
            'meshmatcap_vert': '\x0a#define\x20MATCAP\x0a\x0avarying\x20vec3\x20vViewPosition;\x0a\x0a#include\x20<common>\x0a#include\x20<batching_pars_vertex>\x0a#include\x20<uv_pars_vertex>\x0a#include\x20<color_pars_vertex>\x0a#include\x20<displacementmap_pars_vertex>\x0a#include\x20<fog_pars_vertex>\x0a#include\x20<normal_pars_vertex>\x0a#include\x20<morphtarget_pars_vertex>\x0a#include\x20<skinning_pars_vertex>\x0a\x0a#include\x20<logdepthbuf_pars_vertex>\x0a#include\x20<clipping_planes_pars_vertex>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<uv_vertex>\x0a\x09#include\x20<color_vertex>\x0a\x09#include\x20<morphcolor_vertex>\x0a\x09#include\x20<batching_vertex>\x0a\x0a\x09#include\x20<beginnormal_vertex>\x0a\x09#include\x20<morphnormal_vertex>\x0a\x09#include\x20<skinbase_vertex>\x0a\x09#include\x20<skinnormal_vertex>\x0a\x09#include\x20<defaultnormal_vertex>\x0a\x09#include\x20<normal_vertex>\x0a\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<morphtarget_vertex>\x0a\x09#include\x20<skinning_vertex>\x0a\x09#include\x20<displacementmap_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x0a\x09#include\x20<logdepthbuf_vertex>\x0a\x09#include\x20<clipping_planes_vertex>\x0a\x09#include\x20<fog_vertex>\x0a\x0a\x09vViewPosition\x20=\x20-\x20mvPosition.xyz;\x0a\x0a}\x0a',
            'meshmatcap_frag': '\x0a#define\x20MATCAP\x0a\x0auniform\x20vec3\x20diffuse;\x0auniform\x20float\x20opacity;\x0auniform\x20sampler2D\x20matcap;\x0a\x0avarying\x20vec3\x20vViewPosition;\x0a\x0a#include\x20<common>\x0a#include\x20<dithering_pars_fragment>\x0a#include\x20<color_pars_fragment>\x0a#include\x20<uv_pars_fragment>\x0a#include\x20<map_pars_fragment>\x0a#include\x20<alphamap_pars_fragment>\x0a#include\x20<alphatest_pars_fragment>\x0a#include\x20<alphahash_pars_fragment>\x0a#include\x20<fog_pars_fragment>\x0a#include\x20<normal_pars_fragment>\x0a#include\x20<bumpmap_pars_fragment>\x0a#include\x20<normalmap_pars_fragment>\x0a#include\x20<logdepthbuf_pars_fragment>\x0a#include\x20<clipping_planes_pars_fragment>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<clipping_planes_fragment>\x0a\x0a\x09vec4\x20diffuseColor\x20=\x20vec4(\x20diffuse,\x20opacity\x20);\x0a\x0a\x09#include\x20<logdepthbuf_fragment>\x0a\x09#include\x20<map_fragment>\x0a\x09#include\x20<color_fragment>\x0a\x09#include\x20<alphamap_fragment>\x0a\x09#include\x20<alphatest_fragment>\x0a\x09#include\x20<alphahash_fragment>\x0a\x09#include\x20<normal_fragment_begin>\x0a\x09#include\x20<normal_fragment_maps>\x0a\x0a\x09vec3\x20viewDir\x20=\x20normalize(\x20vViewPosition\x20);\x0a\x09vec3\x20x\x20=\x20normalize(\x20vec3(\x20viewDir.z,\x200.0,\x20-\x20viewDir.x\x20)\x20);\x0a\x09vec3\x20y\x20=\x20cross(\x20viewDir,\x20x\x20);\x0a\x09vec2\x20uv\x20=\x20vec2(\x20dot(\x20x,\x20normal\x20),\x20dot(\x20y,\x20normal\x20)\x20)\x20*\x200.495\x20+\x200.5;\x20//\x200.495\x20to\x20remove\x20artifacts\x20caused\x20by\x20undersized\x20matcap\x20disks\x0a\x0a\x09#ifdef\x20USE_MATCAP\x0a\x0a\x09\x09vec4\x20matcapColor\x20=\x20texture2D(\x20matcap,\x20uv\x20);\x0a\x0a\x09#else\x0a\x0a\x09\x09vec4\x20matcapColor\x20=\x20vec4(\x20vec3(\x20mix(\x200.2,\x200.8,\x20uv.y\x20)\x20),\x201.0\x20);\x20//\x20default\x20if\x20matcap\x20is\x20missing\x0a\x0a\x09#endif\x0a\x0a\x09vec3\x20outgoingLight\x20=\x20diffuseColor.rgb\x20*\x20matcapColor.rgb;\x0a\x0a\x09#include\x20<opaque_fragment>\x0a\x09#include\x20<tonemapping_fragment>\x0a\x09#include\x20<colorspace_fragment>\x0a\x09#include\x20<fog_fragment>\x0a\x09#include\x20<premultiplied_alpha_fragment>\x0a\x09#include\x20<dithering_fragment>\x0a\x0a}\x0a',
            'meshnormal_vert': '\x0a#define\x20NORMAL\x0a\x0a#if\x20defined(\x20FLAT_SHADED\x20)\x20||\x20defined(\x20USE_BUMPMAP\x20)\x20||\x20defined(\x20USE_NORMALMAP_TANGENTSPACE\x20)\x0a\x0a\x09varying\x20vec3\x20vViewPosition;\x0a\x0a#endif\x0a\x0a#include\x20<common>\x0a#include\x20<batching_pars_vertex>\x0a#include\x20<uv_pars_vertex>\x0a#include\x20<displacementmap_pars_vertex>\x0a#include\x20<normal_pars_vertex>\x0a#include\x20<morphtarget_pars_vertex>\x0a#include\x20<skinning_pars_vertex>\x0a#include\x20<logdepthbuf_pars_vertex>\x0a#include\x20<clipping_planes_pars_vertex>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<uv_vertex>\x0a\x09#include\x20<batching_vertex>\x0a\x0a\x09#include\x20<beginnormal_vertex>\x0a\x09#include\x20<morphnormal_vertex>\x0a\x09#include\x20<skinbase_vertex>\x0a\x09#include\x20<skinnormal_vertex>\x0a\x09#include\x20<defaultnormal_vertex>\x0a\x09#include\x20<normal_vertex>\x0a\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<morphtarget_vertex>\x0a\x09#include\x20<skinning_vertex>\x0a\x09#include\x20<displacementmap_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x09#include\x20<logdepthbuf_vertex>\x0a\x09#include\x20<clipping_planes_vertex>\x0a\x0a#if\x20defined(\x20FLAT_SHADED\x20)\x20||\x20defined(\x20USE_BUMPMAP\x20)\x20||\x20defined(\x20USE_NORMALMAP_TANGENTSPACE\x20)\x0a\x0a\x09vViewPosition\x20=\x20-\x20mvPosition.xyz;\x0a\x0a#endif\x0a\x0a}\x0a',
            'meshnormal_frag': '\x0a#define\x20NORMAL\x0a\x0auniform\x20float\x20opacity;\x0a\x0a#if\x20defined(\x20FLAT_SHADED\x20)\x20||\x20defined(\x20USE_BUMPMAP\x20)\x20||\x20defined(\x20USE_NORMALMAP_TANGENTSPACE\x20)\x0a\x0a\x09varying\x20vec3\x20vViewPosition;\x0a\x0a#endif\x0a\x0a#include\x20<packing>\x0a#include\x20<uv_pars_fragment>\x0a#include\x20<normal_pars_fragment>\x0a#include\x20<bumpmap_pars_fragment>\x0a#include\x20<normalmap_pars_fragment>\x0a#include\x20<logdepthbuf_pars_fragment>\x0a#include\x20<clipping_planes_pars_fragment>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<clipping_planes_fragment>\x0a\x09#include\x20<logdepthbuf_fragment>\x0a\x09#include\x20<normal_fragment_begin>\x0a\x09#include\x20<normal_fragment_maps>\x0a\x0a\x09gl_FragColor\x20=\x20vec4(\x20packNormalToRGB(\x20normal\x20),\x20opacity\x20);\x0a\x0a\x09#ifdef\x20OPAQUE\x0a\x0a\x09\x09gl_FragColor.a\x20=\x201.0;\x0a\x0a\x09#endif\x0a\x0a}\x0a',
            'meshphong_vert': '\x0a#define\x20PHONG\x0a\x0avarying\x20vec3\x20vViewPosition;\x0a\x0a#include\x20<common>\x0a#include\x20<batching_pars_vertex>\x0a#include\x20<uv_pars_vertex>\x0a#include\x20<displacementmap_pars_vertex>\x0a#include\x20<envmap_pars_vertex>\x0a#include\x20<color_pars_vertex>\x0a#include\x20<fog_pars_vertex>\x0a#include\x20<normal_pars_vertex>\x0a#include\x20<morphtarget_pars_vertex>\x0a#include\x20<skinning_pars_vertex>\x0a#include\x20<shadowmap_pars_vertex>\x0a#include\x20<logdepthbuf_pars_vertex>\x0a#include\x20<clipping_planes_pars_vertex>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<uv_vertex>\x0a\x09#include\x20<color_vertex>\x0a\x09#include\x20<morphcolor_vertex>\x0a\x09#include\x20<batching_vertex>\x0a\x0a\x09#include\x20<beginnormal_vertex>\x0a\x09#include\x20<morphnormal_vertex>\x0a\x09#include\x20<skinbase_vertex>\x0a\x09#include\x20<skinnormal_vertex>\x0a\x09#include\x20<defaultnormal_vertex>\x0a\x09#include\x20<normal_vertex>\x0a\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<morphtarget_vertex>\x0a\x09#include\x20<skinning_vertex>\x0a\x09#include\x20<displacementmap_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x09#include\x20<logdepthbuf_vertex>\x0a\x09#include\x20<clipping_planes_vertex>\x0a\x0a\x09vViewPosition\x20=\x20-\x20mvPosition.xyz;\x0a\x0a\x09#include\x20<worldpos_vertex>\x0a\x09#include\x20<envmap_vertex>\x0a\x09#include\x20<shadowmap_vertex>\x0a\x09#include\x20<fog_vertex>\x0a\x0a}\x0a',
            'meshphong_frag': '\x0a#define\x20PHONG\x0a\x0auniform\x20vec3\x20diffuse;\x0auniform\x20vec3\x20emissive;\x0auniform\x20vec3\x20specular;\x0auniform\x20float\x20shininess;\x0auniform\x20float\x20opacity;\x0a\x0a#include\x20<common>\x0a#include\x20<packing>\x0a#include\x20<dithering_pars_fragment>\x0a#include\x20<color_pars_fragment>\x0a#include\x20<uv_pars_fragment>\x0a#include\x20<map_pars_fragment>\x0a#include\x20<alphamap_pars_fragment>\x0a#include\x20<alphatest_pars_fragment>\x0a#include\x20<alphahash_pars_fragment>\x0a#include\x20<aomap_pars_fragment>\x0a#include\x20<lightmap_pars_fragment>\x0a#include\x20<emissivemap_pars_fragment>\x0a#include\x20<envmap_common_pars_fragment>\x0a#include\x20<envmap_pars_fragment>\x0a#include\x20<fog_pars_fragment>\x0a#include\x20<bsdfs>\x0a#include\x20<lights_pars_begin>\x0a#include\x20<normal_pars_fragment>\x0a#include\x20<lights_phong_pars_fragment>\x0a#include\x20<shadowmap_pars_fragment>\x0a#include\x20<bumpmap_pars_fragment>\x0a#include\x20<normalmap_pars_fragment>\x0a#include\x20<specularmap_pars_fragment>\x0a#include\x20<logdepthbuf_pars_fragment>\x0a#include\x20<clipping_planes_pars_fragment>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<clipping_planes_fragment>\x0a\x0a\x09vec4\x20diffuseColor\x20=\x20vec4(\x20diffuse,\x20opacity\x20);\x0a\x09ReflectedLight\x20reflectedLight\x20=\x20ReflectedLight(\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20)\x20);\x0a\x09vec3\x20totalEmissiveRadiance\x20=\x20emissive;\x0a\x0a\x09#include\x20<logdepthbuf_fragment>\x0a\x09#include\x20<map_fragment>\x0a\x09#include\x20<color_fragment>\x0a\x09#include\x20<alphamap_fragment>\x0a\x09#include\x20<alphatest_fragment>\x0a\x09#include\x20<alphahash_fragment>\x0a\x09#include\x20<specularmap_fragment>\x0a\x09#include\x20<normal_fragment_begin>\x0a\x09#include\x20<normal_fragment_maps>\x0a\x09#include\x20<emissivemap_fragment>\x0a\x0a\x09//\x20accumulation\x0a\x09#include\x20<lights_phong_fragment>\x0a\x09#include\x20<lights_fragment_begin>\x0a\x09#include\x20<lights_fragment_maps>\x0a\x09#include\x20<lights_fragment_end>\x0a\x0a\x09//\x20modulation\x0a\x09#include\x20<aomap_fragment>\x0a\x0a\x09vec3\x20outgoingLight\x20=\x20reflectedLight.directDiffuse\x20+\x20reflectedLight.indirectDiffuse\x20+\x20reflectedLight.directSpecular\x20+\x20reflectedLight.indirectSpecular\x20+\x20totalEmissiveRadiance;\x0a\x0a\x09#include\x20<envmap_fragment>\x0a\x09#include\x20<opaque_fragment>\x0a\x09#include\x20<tonemapping_fragment>\x0a\x09#include\x20<colorspace_fragment>\x0a\x09#include\x20<fog_fragment>\x0a\x09#include\x20<premultiplied_alpha_fragment>\x0a\x09#include\x20<dithering_fragment>\x0a\x0a}\x0a',
            'meshphysical_vert': '\x0a#define\x20STANDARD\x0a\x0avarying\x20vec3\x20vViewPosition;\x0a\x0a#ifdef\x20USE_TRANSMISSION\x0a\x0a\x09varying\x20vec3\x20vWorldPosition;\x0a\x0a#endif\x0a\x0a#include\x20<common>\x0a#include\x20<batching_pars_vertex>\x0a#include\x20<uv_pars_vertex>\x0a#include\x20<displacementmap_pars_vertex>\x0a#include\x20<color_pars_vertex>\x0a#include\x20<fog_pars_vertex>\x0a#include\x20<normal_pars_vertex>\x0a#include\x20<morphtarget_pars_vertex>\x0a#include\x20<skinning_pars_vertex>\x0a#include\x20<shadowmap_pars_vertex>\x0a#include\x20<logdepthbuf_pars_vertex>\x0a#include\x20<clipping_planes_pars_vertex>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<uv_vertex>\x0a\x09#include\x20<color_vertex>\x0a\x09#include\x20<morphcolor_vertex>\x0a\x09#include\x20<batching_vertex>\x0a\x0a\x09#include\x20<beginnormal_vertex>\x0a\x09#include\x20<morphnormal_vertex>\x0a\x09#include\x20<skinbase_vertex>\x0a\x09#include\x20<skinnormal_vertex>\x0a\x09#include\x20<defaultnormal_vertex>\x0a\x09#include\x20<normal_vertex>\x0a\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<morphtarget_vertex>\x0a\x09#include\x20<skinning_vertex>\x0a\x09#include\x20<displacementmap_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x09#include\x20<logdepthbuf_vertex>\x0a\x09#include\x20<clipping_planes_vertex>\x0a\x0a\x09vViewPosition\x20=\x20-\x20mvPosition.xyz;\x0a\x0a\x09#include\x20<worldpos_vertex>\x0a\x09#include\x20<shadowmap_vertex>\x0a\x09#include\x20<fog_vertex>\x0a\x0a#ifdef\x20USE_TRANSMISSION\x0a\x0a\x09vWorldPosition\x20=\x20worldPosition.xyz;\x0a\x0a#endif\x0a}\x0a',
            'meshphysical_frag': '\x0a#define\x20STANDARD\x0a\x0a#ifdef\x20PHYSICAL\x0a\x09#define\x20IOR\x0a\x09#define\x20USE_SPECULAR\x0a#endif\x0a\x0auniform\x20vec3\x20diffuse;\x0auniform\x20vec3\x20emissive;\x0auniform\x20float\x20roughness;\x0auniform\x20float\x20metalness;\x0auniform\x20float\x20opacity;\x0a\x0a#ifdef\x20IOR\x0a\x09uniform\x20float\x20ior;\x0a#endif\x0a\x0a#ifdef\x20USE_SPECULAR\x0a\x09uniform\x20float\x20specularIntensity;\x0a\x09uniform\x20vec3\x20specularColor;\x0a\x0a\x09#ifdef\x20USE_SPECULAR_COLORMAP\x0a\x09\x09uniform\x20sampler2D\x20specularColorMap;\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_SPECULAR_INTENSITYMAP\x0a\x09\x09uniform\x20sampler2D\x20specularIntensityMap;\x0a\x09#endif\x0a#endif\x0a\x0a#ifdef\x20USE_CLEARCOAT\x0a\x09uniform\x20float\x20clearcoat;\x0a\x09uniform\x20float\x20clearcoatRoughness;\x0a#endif\x0a\x0a#ifdef\x20USE_IRIDESCENCE\x0a\x09uniform\x20float\x20iridescence;\x0a\x09uniform\x20float\x20iridescenceIOR;\x0a\x09uniform\x20float\x20iridescenceThicknessMinimum;\x0a\x09uniform\x20float\x20iridescenceThicknessMaximum;\x0a#endif\x0a\x0a#ifdef\x20USE_SHEEN\x0a\x09uniform\x20vec3\x20sheenColor;\x0a\x09uniform\x20float\x20sheenRoughness;\x0a\x0a\x09#ifdef\x20USE_SHEEN_COLORMAP\x0a\x09\x09uniform\x20sampler2D\x20sheenColorMap;\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_SHEEN_ROUGHNESSMAP\x0a\x09\x09uniform\x20sampler2D\x20sheenRoughnessMap;\x0a\x09#endif\x0a#endif\x0a\x0a#ifdef\x20USE_ANISOTROPY\x0a\x09uniform\x20vec2\x20anisotropyVector;\x0a\x0a\x09#ifdef\x20USE_ANISOTROPYMAP\x0a\x09\x09uniform\x20sampler2D\x20anisotropyMap;\x0a\x09#endif\x0a#endif\x0a\x0avarying\x20vec3\x20vViewPosition;\x0a\x0a#include\x20<common>\x0a#include\x20<packing>\x0a#include\x20<dithering_pars_fragment>\x0a#include\x20<color_pars_fragment>\x0a#include\x20<uv_pars_fragment>\x0a#include\x20<map_pars_fragment>\x0a#include\x20<alphamap_pars_fragment>\x0a#include\x20<alphatest_pars_fragment>\x0a#include\x20<alphahash_pars_fragment>\x0a#include\x20<aomap_pars_fragment>\x0a#include\x20<lightmap_pars_fragment>\x0a#include\x20<emissivemap_pars_fragment>\x0a#include\x20<iridescence_fragment>\x0a#include\x20<cube_uv_reflection_fragment>\x0a#include\x20<envmap_common_pars_fragment>\x0a#include\x20<envmap_physical_pars_fragment>\x0a#include\x20<fog_pars_fragment>\x0a#include\x20<lights_pars_begin>\x0a#include\x20<normal_pars_fragment>\x0a#include\x20<lights_physical_pars_fragment>\x0a#include\x20<transmission_pars_fragment>\x0a#include\x20<shadowmap_pars_fragment>\x0a#include\x20<bumpmap_pars_fragment>\x0a#include\x20<normalmap_pars_fragment>\x0a#include\x20<clearcoat_pars_fragment>\x0a#include\x20<iridescence_pars_fragment>\x0a#include\x20<roughnessmap_pars_fragment>\x0a#include\x20<metalnessmap_pars_fragment>\x0a#include\x20<logdepthbuf_pars_fragment>\x0a#include\x20<clipping_planes_pars_fragment>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<clipping_planes_fragment>\x0a\x0a\x09vec4\x20diffuseColor\x20=\x20vec4(\x20diffuse,\x20opacity\x20);\x0a\x09ReflectedLight\x20reflectedLight\x20=\x20ReflectedLight(\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20)\x20);\x0a\x09vec3\x20totalEmissiveRadiance\x20=\x20emissive;\x0a\x0a\x09#include\x20<logdepthbuf_fragment>\x0a\x09#include\x20<map_fragment>\x0a\x09#include\x20<color_fragment>\x0a\x09#include\x20<alphamap_fragment>\x0a\x09#include\x20<alphatest_fragment>\x0a\x09#include\x20<alphahash_fragment>\x0a\x09#include\x20<roughnessmap_fragment>\x0a\x09#include\x20<metalnessmap_fragment>\x0a\x09#include\x20<normal_fragment_begin>\x0a\x09#include\x20<normal_fragment_maps>\x0a\x09#include\x20<clearcoat_normal_fragment_begin>\x0a\x09#include\x20<clearcoat_normal_fragment_maps>\x0a\x09#include\x20<emissivemap_fragment>\x0a\x0a\x09//\x20accumulation\x0a\x09#include\x20<lights_physical_fragment>\x0a\x09#include\x20<lights_fragment_begin>\x0a\x09#include\x20<lights_fragment_maps>\x0a\x09#include\x20<lights_fragment_end>\x0a\x0a\x09//\x20modulation\x0a\x09#include\x20<aomap_fragment>\x0a\x0a\x09vec3\x20totalDiffuse\x20=\x20reflectedLight.directDiffuse\x20+\x20reflectedLight.indirectDiffuse;\x0a\x09vec3\x20totalSpecular\x20=\x20reflectedLight.directSpecular\x20+\x20reflectedLight.indirectSpecular;\x0a\x0a\x09#include\x20<transmission_fragment>\x0a\x0a\x09vec3\x20outgoingLight\x20=\x20totalDiffuse\x20+\x20totalSpecular\x20+\x20totalEmissiveRadiance;\x0a\x0a\x09#ifdef\x20USE_SHEEN\x0a\x0a\x09\x09//\x20Sheen\x20energy\x20compensation\x20approximation\x20calculation\x20can\x20be\x20found\x20at\x20the\x20end\x20of\x0a\x09\x09//\x20https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing\x0a\x09\x09float\x20sheenEnergyComp\x20=\x201.0\x20-\x200.157\x20*\x20max3(\x20material.sheenColor\x20);\x0a\x0a\x09\x09outgoingLight\x20=\x20outgoingLight\x20*\x20sheenEnergyComp\x20+\x20sheenSpecularDirect\x20+\x20sheenSpecularIndirect;\x0a\x0a\x09#endif\x0a\x0a\x09#ifdef\x20USE_CLEARCOAT\x0a\x0a\x09\x09float\x20dotNVcc\x20=\x20saturate(\x20dot(\x20geometryClearcoatNormal,\x20geometryViewDir\x20)\x20);\x0a\x0a\x09\x09vec3\x20Fcc\x20=\x20F_Schlick(\x20material.clearcoatF0,\x20material.clearcoatF90,\x20dotNVcc\x20);\x0a\x0a\x09\x09outgoingLight\x20=\x20outgoingLight\x20*\x20(\x201.0\x20-\x20material.clearcoat\x20*\x20Fcc\x20)\x20+\x20(\x20clearcoatSpecularDirect\x20+\x20clearcoatSpecularIndirect\x20)\x20*\x20material.clearcoat;\x0a\x0a\x09#endif\x0a\x0a\x09#include\x20<opaque_fragment>\x0a\x09#include\x20<tonemapping_fragment>\x0a\x09#include\x20<colorspace_fragment>\x0a\x09#include\x20<fog_fragment>\x0a\x09#include\x20<premultiplied_alpha_fragment>\x0a\x09#include\x20<dithering_fragment>\x0a\x0a}\x0a',
            'meshtoon_vert': '\x0a#define\x20TOON\x0a\x0avarying\x20vec3\x20vViewPosition;\x0a\x0a#include\x20<common>\x0a#include\x20<batching_pars_vertex>\x0a#include\x20<uv_pars_vertex>\x0a#include\x20<displacementmap_pars_vertex>\x0a#include\x20<color_pars_vertex>\x0a#include\x20<fog_pars_vertex>\x0a#include\x20<normal_pars_vertex>\x0a#include\x20<morphtarget_pars_vertex>\x0a#include\x20<skinning_pars_vertex>\x0a#include\x20<shadowmap_pars_vertex>\x0a#include\x20<logdepthbuf_pars_vertex>\x0a#include\x20<clipping_planes_pars_vertex>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<uv_vertex>\x0a\x09#include\x20<color_vertex>\x0a\x09#include\x20<morphcolor_vertex>\x0a\x09#include\x20<batching_vertex>\x0a\x0a\x09#include\x20<beginnormal_vertex>\x0a\x09#include\x20<morphnormal_vertex>\x0a\x09#include\x20<skinbase_vertex>\x0a\x09#include\x20<skinnormal_vertex>\x0a\x09#include\x20<defaultnormal_vertex>\x0a\x09#include\x20<normal_vertex>\x0a\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<morphtarget_vertex>\x0a\x09#include\x20<skinning_vertex>\x0a\x09#include\x20<displacementmap_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x09#include\x20<logdepthbuf_vertex>\x0a\x09#include\x20<clipping_planes_vertex>\x0a\x0a\x09vViewPosition\x20=\x20-\x20mvPosition.xyz;\x0a\x0a\x09#include\x20<worldpos_vertex>\x0a\x09#include\x20<shadowmap_vertex>\x0a\x09#include\x20<fog_vertex>\x0a\x0a}\x0a',
            'meshtoon_frag': '\x0a#define\x20TOON\x0a\x0auniform\x20vec3\x20diffuse;\x0auniform\x20vec3\x20emissive;\x0auniform\x20float\x20opacity;\x0a\x0a#include\x20<common>\x0a#include\x20<packing>\x0a#include\x20<dithering_pars_fragment>\x0a#include\x20<color_pars_fragment>\x0a#include\x20<uv_pars_fragment>\x0a#include\x20<map_pars_fragment>\x0a#include\x20<alphamap_pars_fragment>\x0a#include\x20<alphatest_pars_fragment>\x0a#include\x20<alphahash_pars_fragment>\x0a#include\x20<aomap_pars_fragment>\x0a#include\x20<lightmap_pars_fragment>\x0a#include\x20<emissivemap_pars_fragment>\x0a#include\x20<gradientmap_pars_fragment>\x0a#include\x20<fog_pars_fragment>\x0a#include\x20<bsdfs>\x0a#include\x20<lights_pars_begin>\x0a#include\x20<normal_pars_fragment>\x0a#include\x20<lights_toon_pars_fragment>\x0a#include\x20<shadowmap_pars_fragment>\x0a#include\x20<bumpmap_pars_fragment>\x0a#include\x20<normalmap_pars_fragment>\x0a#include\x20<logdepthbuf_pars_fragment>\x0a#include\x20<clipping_planes_pars_fragment>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<clipping_planes_fragment>\x0a\x0a\x09vec4\x20diffuseColor\x20=\x20vec4(\x20diffuse,\x20opacity\x20);\x0a\x09ReflectedLight\x20reflectedLight\x20=\x20ReflectedLight(\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20),\x20vec3(\x200.0\x20)\x20);\x0a\x09vec3\x20totalEmissiveRadiance\x20=\x20emissive;\x0a\x0a\x09#include\x20<logdepthbuf_fragment>\x0a\x09#include\x20<map_fragment>\x0a\x09#include\x20<color_fragment>\x0a\x09#include\x20<alphamap_fragment>\x0a\x09#include\x20<alphatest_fragment>\x0a\x09#include\x20<alphahash_fragment>\x0a\x09#include\x20<normal_fragment_begin>\x0a\x09#include\x20<normal_fragment_maps>\x0a\x09#include\x20<emissivemap_fragment>\x0a\x0a\x09//\x20accumulation\x0a\x09#include\x20<lights_toon_fragment>\x0a\x09#include\x20<lights_fragment_begin>\x0a\x09#include\x20<lights_fragment_maps>\x0a\x09#include\x20<lights_fragment_end>\x0a\x0a\x09//\x20modulation\x0a\x09#include\x20<aomap_fragment>\x0a\x0a\x09vec3\x20outgoingLight\x20=\x20reflectedLight.directDiffuse\x20+\x20reflectedLight.indirectDiffuse\x20+\x20totalEmissiveRadiance;\x0a\x0a\x09#include\x20<opaque_fragment>\x0a\x09#include\x20<tonemapping_fragment>\x0a\x09#include\x20<colorspace_fragment>\x0a\x09#include\x20<fog_fragment>\x0a\x09#include\x20<premultiplied_alpha_fragment>\x0a\x09#include\x20<dithering_fragment>\x0a\x0a}\x0a',
            'points_vert': '\x0auniform\x20float\x20size;\x0auniform\x20float\x20scale;\x0a\x0a#include\x20<common>\x0a#include\x20<color_pars_vertex>\x0a#include\x20<fog_pars_vertex>\x0a#include\x20<morphtarget_pars_vertex>\x0a#include\x20<logdepthbuf_pars_vertex>\x0a#include\x20<clipping_planes_pars_vertex>\x0a\x0a#ifdef\x20USE_POINTS_UV\x0a\x0a\x09varying\x20vec2\x20vUv;\x0a\x09uniform\x20mat3\x20uvTransform;\x0a\x0a#endif\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#ifdef\x20USE_POINTS_UV\x0a\x0a\x09\x09vUv\x20=\x20(\x20uvTransform\x20*\x20vec3(\x20uv,\x201\x20)\x20).xy;\x0a\x0a\x09#endif\x0a\x0a\x09#include\x20<color_vertex>\x0a\x09#include\x20<morphcolor_vertex>\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<morphtarget_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x0a\x09gl_PointSize\x20=\x20size;\x0a\x0a\x09#ifdef\x20USE_SIZEATTENUATION\x0a\x0a\x09\x09bool\x20isPerspective\x20=\x20isPerspectiveMatrix(\x20projectionMatrix\x20);\x0a\x0a\x09\x09if\x20(\x20isPerspective\x20)\x20gl_PointSize\x20*=\x20(\x20scale\x20/\x20-\x20mvPosition.z\x20);\x0a\x0a\x09#endif\x0a\x0a\x09#include\x20<logdepthbuf_vertex>\x0a\x09#include\x20<clipping_planes_vertex>\x0a\x09#include\x20<worldpos_vertex>\x0a\x09#include\x20<fog_vertex>\x0a\x0a}\x0a',
            'points_frag': '\x0auniform\x20vec3\x20diffuse;\x0auniform\x20float\x20opacity;\x0a\x0a#include\x20<common>\x0a#include\x20<color_pars_fragment>\x0a#include\x20<map_particle_pars_fragment>\x0a#include\x20<alphatest_pars_fragment>\x0a#include\x20<alphahash_pars_fragment>\x0a#include\x20<fog_pars_fragment>\x0a#include\x20<logdepthbuf_pars_fragment>\x0a#include\x20<clipping_planes_pars_fragment>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<clipping_planes_fragment>\x0a\x0a\x09vec3\x20outgoingLight\x20=\x20vec3(\x200.0\x20);\x0a\x09vec4\x20diffuseColor\x20=\x20vec4(\x20diffuse,\x20opacity\x20);\x0a\x0a\x09#include\x20<logdepthbuf_fragment>\x0a\x09#include\x20<map_particle_fragment>\x0a\x09#include\x20<color_fragment>\x0a\x09#include\x20<alphatest_fragment>\x0a\x09#include\x20<alphahash_fragment>\x0a\x0a\x09outgoingLight\x20=\x20diffuseColor.rgb;\x0a\x0a\x09#include\x20<opaque_fragment>\x0a\x09#include\x20<tonemapping_fragment>\x0a\x09#include\x20<colorspace_fragment>\x0a\x09#include\x20<fog_fragment>\x0a\x09#include\x20<premultiplied_alpha_fragment>\x0a\x0a}\x0a',
            'shadow_vert': '\x0a#include\x20<common>\x0a#include\x20<batching_pars_vertex>\x0a#include\x20<fog_pars_vertex>\x0a#include\x20<morphtarget_pars_vertex>\x0a#include\x20<skinning_pars_vertex>\x0a#include\x20<logdepthbuf_pars_vertex>\x0a#include\x20<shadowmap_pars_vertex>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<batching_vertex>\x0a\x0a\x09#include\x20<beginnormal_vertex>\x0a\x09#include\x20<morphnormal_vertex>\x0a\x09#include\x20<skinbase_vertex>\x0a\x09#include\x20<skinnormal_vertex>\x0a\x09#include\x20<defaultnormal_vertex>\x0a\x0a\x09#include\x20<begin_vertex>\x0a\x09#include\x20<morphtarget_vertex>\x0a\x09#include\x20<skinning_vertex>\x0a\x09#include\x20<project_vertex>\x0a\x09#include\x20<logdepthbuf_vertex>\x0a\x0a\x09#include\x20<worldpos_vertex>\x0a\x09#include\x20<shadowmap_vertex>\x0a\x09#include\x20<fog_vertex>\x0a\x0a}\x0a',
            'shadow_frag': '\x0auniform\x20vec3\x20color;\x0auniform\x20float\x20opacity;\x0a\x0a#include\x20<common>\x0a#include\x20<packing>\x0a#include\x20<fog_pars_fragment>\x0a#include\x20<bsdfs>\x0a#include\x20<lights_pars_begin>\x0a#include\x20<logdepthbuf_pars_fragment>\x0a#include\x20<shadowmap_pars_fragment>\x0a#include\x20<shadowmask_pars_fragment>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<logdepthbuf_fragment>\x0a\x0a\x09gl_FragColor\x20=\x20vec4(\x20color,\x20opacity\x20*\x20(\x201.0\x20-\x20getShadowMask()\x20)\x20);\x0a\x0a\x09#include\x20<tonemapping_fragment>\x0a\x09#include\x20<colorspace_fragment>\x0a\x09#include\x20<fog_fragment>\x0a\x0a}\x0a',
            'sprite_vert': '\x0auniform\x20float\x20rotation;\x0auniform\x20vec2\x20center;\x0a\x0a#include\x20<common>\x0a#include\x20<uv_pars_vertex>\x0a#include\x20<fog_pars_vertex>\x0a#include\x20<logdepthbuf_pars_vertex>\x0a#include\x20<clipping_planes_pars_vertex>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<uv_vertex>\x0a\x0a\x09vec4\x20mvPosition\x20=\x20modelViewMatrix\x20*\x20vec4(\x200.0,\x200.0,\x200.0,\x201.0\x20);\x0a\x0a\x09vec2\x20scale;\x0a\x09scale.x\x20=\x20length(\x20vec3(\x20modelMatrix[\x200\x20].x,\x20modelMatrix[\x200\x20].y,\x20modelMatrix[\x200\x20].z\x20)\x20);\x0a\x09scale.y\x20=\x20length(\x20vec3(\x20modelMatrix[\x201\x20].x,\x20modelMatrix[\x201\x20].y,\x20modelMatrix[\x201\x20].z\x20)\x20);\x0a\x0a\x09#ifndef\x20USE_SIZEATTENUATION\x0a\x0a\x09\x09bool\x20isPerspective\x20=\x20isPerspectiveMatrix(\x20projectionMatrix\x20);\x0a\x0a\x09\x09if\x20(\x20isPerspective\x20)\x20scale\x20*=\x20-\x20mvPosition.z;\x0a\x0a\x09#endif\x0a\x0a\x09vec2\x20alignedPosition\x20=\x20(\x20position.xy\x20-\x20(\x20center\x20-\x20vec2(\x200.5\x20)\x20)\x20)\x20*\x20scale;\x0a\x0a\x09vec2\x20rotatedPosition;\x0a\x09rotatedPosition.x\x20=\x20cos(\x20rotation\x20)\x20*\x20alignedPosition.x\x20-\x20sin(\x20rotation\x20)\x20*\x20alignedPosition.y;\x0a\x09rotatedPosition.y\x20=\x20sin(\x20rotation\x20)\x20*\x20alignedPosition.x\x20+\x20cos(\x20rotation\x20)\x20*\x20alignedPosition.y;\x0a\x0a\x09mvPosition.xy\x20+=\x20rotatedPosition;\x0a\x0a\x09gl_Position\x20=\x20projectionMatrix\x20*\x20mvPosition;\x0a\x0a\x09#include\x20<logdepthbuf_vertex>\x0a\x09#include\x20<clipping_planes_vertex>\x0a\x09#include\x20<fog_vertex>\x0a\x0a}\x0a',
            'sprite_frag': '\x0auniform\x20vec3\x20diffuse;\x0auniform\x20float\x20opacity;\x0a\x0a#include\x20<common>\x0a#include\x20<uv_pars_fragment>\x0a#include\x20<map_pars_fragment>\x0a#include\x20<alphamap_pars_fragment>\x0a#include\x20<alphatest_pars_fragment>\x0a#include\x20<alphahash_pars_fragment>\x0a#include\x20<fog_pars_fragment>\x0a#include\x20<logdepthbuf_pars_fragment>\x0a#include\x20<clipping_planes_pars_fragment>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09#include\x20<clipping_planes_fragment>\x0a\x0a\x09vec3\x20outgoingLight\x20=\x20vec3(\x200.0\x20);\x0a\x09vec4\x20diffuseColor\x20=\x20vec4(\x20diffuse,\x20opacity\x20);\x0a\x0a\x09#include\x20<logdepthbuf_fragment>\x0a\x09#include\x20<map_fragment>\x0a\x09#include\x20<alphamap_fragment>\x0a\x09#include\x20<alphatest_fragment>\x0a\x09#include\x20<alphahash_fragment>\x0a\x0a\x09outgoingLight\x20=\x20diffuseColor.rgb;\x0a\x0a\x09#include\x20<opaque_fragment>\x0a\x09#include\x20<tonemapping_fragment>\x0a\x09#include\x20<colorspace_fragment>\x0a\x09#include\x20<fog_fragment>\x0a\x0a}\x0a'
        };
    }
    ,
    0x9c0d: (F, E, p) => {
        p['d'](E, {
            'z': () => B
        });
        var S = p(0xfdaa)
          , R = p(0x41ef)
          , H = p(0x1264d)
          , y = p(0x1008e)
          , d = p(0x58c9)
          , P = p(0x169b1)
          , Q = p(0x3e78)
          , B = {
            'basic': {
                'uniforms': (0x0,
                R['Ii'])([d['f']['common'], d['f']['specularmap'], d['f']['envmap'], d['f']['aomap'], d['f']['lightmap'], d['f']['fog']]),
                'vertexShader': S['v']['meshbasic_vert'],
                'fragmentShader': S['v']['meshbasic_frag']
            },
            'lambert': {
                'uniforms': (0x0,
                R['Ii'])([d['f']['common'], d['f']['specularmap'], d['f']['envmap'], d['f']['aomap'], d['f']['lightmap'], d['f']['emissivemap'], d['f']['bumpmap'], d['f']['normalmap'], d['f']['displacementmap'], d['f']['fog'], d['f']['lights'], {
                    'emissive': {
                        'value': new P['Q'](0x0)
                    }
                }]),
                'vertexShader': S['v']['meshlambert_vert'],
                'fragmentShader': S['v']['meshlambert_frag']
            },
            'phong': {
                'uniforms': (0x0,
                R['Ii'])([d['f']['common'], d['f']['specularmap'], d['f']['envmap'], d['f']['aomap'], d['f']['lightmap'], d['f']['emissivemap'], d['f']['bumpmap'], d['f']['normalmap'], d['f']['displacementmap'], d['f']['fog'], d['f']['lights'], {
                    'emissive': {
                        'value': new P['Q'](0x0)
                    },
                    'specular': {
                        'value': new P['Q'](0x111111)
                    },
                    'shininess': {
                        'value': 0x1e
                    }
                }]),
                'vertexShader': S['v']['meshphong_vert'],
                'fragmentShader': S['v']['meshphong_frag']
            },
            'standard': {
                'uniforms': (0x0,
                R['Ii'])([d['f']['common'], d['f']['envmap'], d['f']['aomap'], d['f']['lightmap'], d['f']['emissivemap'], d['f']['bumpmap'], d['f']['normalmap'], d['f']['displacementmap'], d['f']['roughnessmap'], d['f']['metalnessmap'], d['f']['fog'], d['f']['lights'], {
                    'emissive': {
                        'value': new P['Q'](0x0)
                    },
                    'roughness': {
                        'value': 0x1
                    },
                    'metalness': {
                        'value': 0x0
                    },
                    'envMapIntensity': {
                        'value': 0x1
                    }
                }]),
                'vertexShader': S['v']['meshphysical_vert'],
                'fragmentShader': S['v']['meshphysical_frag']
            },
            'toon': {
                'uniforms': (0x0,
                R['Ii'])([d['f']['common'], d['f']['aomap'], d['f']['lightmap'], d['f']['emissivemap'], d['f']['bumpmap'], d['f']['normalmap'], d['f']['displacementmap'], d['f']['gradientmap'], d['f']['fog'], d['f']['lights'], {
                    'emissive': {
                        'value': new P['Q'](0x0)
                    }
                }]),
                'vertexShader': S['v']['meshtoon_vert'],
                'fragmentShader': S['v']['meshtoon_frag']
            },
            'matcap': {
                'uniforms': (0x0,
                R['Ii'])([d['f']['common'], d['f']['bumpmap'], d['f']['normalmap'], d['f']['displacementmap'], d['f']['fog'], {
                    'matcap': {
                        'value': null
                    }
                }]),
                'vertexShader': S['v']['meshmatcap_vert'],
                'fragmentShader': S['v']['meshmatcap_frag']
            },
            'points': {
                'uniforms': (0x0,
                R['Ii'])([d['f']['points'], d['f']['fog']]),
                'vertexShader': S['v']['points_vert'],
                'fragmentShader': S['v']['points_frag']
            },
            'dashed': {
                'uniforms': (0x0,
                R['Ii'])([d['f']['common'], d['f']['fog'], {
                    'scale': {
                        'value': 0x1
                    },
                    'dashSize': {
                        'value': 0x1
                    },
                    'totalSize': {
                        'value': 0x2
                    }
                }]),
                'vertexShader': S['v']['linedashed_vert'],
                'fragmentShader': S['v']['linedashed_frag']
            },
            'depth': {
                'uniforms': (0x0,
                R['Ii'])([d['f']['common'], d['f']['displacementmap']]),
                'vertexShader': S['v']['depth_vert'],
                'fragmentShader': S['v']['depth_frag']
            },
            'normal': {
                'uniforms': (0x0,
                R['Ii'])([d['f']['common'], d['f']['bumpmap'], d['f']['normalmap'], d['f']['displacementmap'], {
                    'opacity': {
                        'value': 0x1
                    }
                }]),
                'vertexShader': S['v']['meshnormal_vert'],
                'fragmentShader': S['v']['meshnormal_frag']
            },
            'sprite': {
                'uniforms': (0x0,
                R['Ii'])([d['f']['sprite'], d['f']['fog']]),
                'vertexShader': S['v']['sprite_vert'],
                'fragmentShader': S['v']['sprite_frag']
            },
            'background': {
                'uniforms': {
                    'uvTransform': {
                        'value': new Q['d']()
                    },
                    't2D': {
                        'value': null
                    },
                    'backgroundIntensity': {
                        'value': 0x1
                    }
                },
                'vertexShader': S['v']['background_vert'],
                'fragmentShader': S['v']['background_frag']
            },
            'backgroundCube': {
                'uniforms': {
                    'envMap': {
                        'value': null
                    },
                    'flipEnvMap': {
                        'value': -0x1
                    },
                    'backgroundBlurriness': {
                        'value': 0x0
                    },
                    'backgroundIntensity': {
                        'value': 0x1
                    }
                },
                'vertexShader': S['v']['backgroundCube_vert'],
                'fragmentShader': S['v']['backgroundCube_frag']
            },
            'cube': {
                'uniforms': {
                    'tCube': {
                        'value': null
                    },
                    'tFlip': {
                        'value': -0x1
                    },
                    'opacity': {
                        'value': 0x1
                    }
                },
                'vertexShader': S['v']['cube_vert'],
                'fragmentShader': S['v']['cube_frag']
            },
            'equirect': {
                'uniforms': {
                    'tEquirect': {
                        'value': null
                    }
                },
                'vertexShader': S['v']['equirect_vert'],
                'fragmentShader': S['v']['equirect_frag']
            },
            'distanceRGBA': {
                'uniforms': (0x0,
                R['Ii'])([d['f']['common'], d['f']['displacementmap'], {
                    'referencePosition': {
                        'value': new y['P']()
                    },
                    'nearDistance': {
                        'value': 0x1
                    },
                    'farDistance': {
                        'value': 0x3e8
                    }
                }]),
                'vertexShader': S['v']['distanceRGBA_vert'],
                'fragmentShader': S['v']['distanceRGBA_frag']
            },
            'shadow': {
                'uniforms': (0x0,
                R['Ii'])([d['f']['lights'], d['f']['fog'], {
                    'color': {
                        'value': new P['Q'](0x0)
                    },
                    'opacity': {
                        'value': 0x1
                    }
                }]),
                'vertexShader': S['v']['shadow_vert'],
                'fragmentShader': S['v']['shadow_frag']
            }
        };
        B['physical'] = {
            'uniforms': (0x0,
            R['Ii'])([B['standard']['uniforms'], {
                'clearcoat': {
                    'value': 0x0
                },
                'clearcoatMap': {
                    'value': null
                },
                'clearcoatMapTransform': {
                    'value': new Q['d']()
                },
                'clearcoatNormalMap': {
                    'value': null
                },
                'clearcoatNormalMapTransform': {
                    'value': new Q['d']()
                },
                'clearcoatNormalScale': {
                    'value': new H['I'](0x1,0x1)
                },
                'clearcoatRoughness': {
                    'value': 0x0
                },
                'clearcoatRoughnessMap': {
                    'value': null
                },
                'clearcoatRoughnessMapTransform': {
                    'value': new Q['d']()
                },
                'iridescence': {
                    'value': 0x0
                },
                'iridescenceMap': {
                    'value': null
                },
                'iridescenceMapTransform': {
                    'value': new Q['d']()
                },
                'iridescenceIOR': {
                    'value': 1.3
                },
                'iridescenceThicknessMinimum': {
                    'value': 0x64
                },
                'iridescenceThicknessMaximum': {
                    'value': 0x190
                },
                'iridescenceThicknessMap': {
                    'value': null
                },
                'iridescenceThicknessMapTransform': {
                    'value': new Q['d']()
                },
                'sheen': {
                    'value': 0x0
                },
                'sheenColor': {
                    'value': new P['Q'](0x0)
                },
                'sheenColorMap': {
                    'value': null
                },
                'sheenColorMapTransform': {
                    'value': new Q['d']()
                },
                'sheenRoughness': {
                    'value': 0x1
                },
                'sheenRoughnessMap': {
                    'value': null
                },
                'sheenRoughnessMapTransform': {
                    'value': new Q['d']()
                },
                'transmission': {
                    'value': 0x0
                },
                'transmissionMap': {
                    'value': null
                },
                'transmissionMapTransform': {
                    'value': new Q['d']()
                },
                'transmissionSamplerSize': {
                    'value': new H['I']()
                },
                'transmissionSamplerMap': {
                    'value': null
                },
                'thickness': {
                    'value': 0x0
                },
                'thicknessMap': {
                    'value': null
                },
                'thicknessMapTransform': {
                    'value': new Q['d']()
                },
                'attenuationDistance': {
                    'value': 0x0
                },
                'attenuationColor': {
                    'value': new P['Q'](0x0)
                },
                'specularColor': {
                    'value': new P['Q'](0x1,0x1,0x1)
                },
                'specularColorMap': {
                    'value': null
                },
                'specularColorMapTransform': {
                    'value': new Q['d']()
                },
                'specularIntensity': {
                    'value': 0x1
                },
                'specularIntensityMap': {
                    'value': null
                },
                'specularIntensityMapTransform': {
                    'value': new Q['d']()
                },
                'anisotropyVector': {
                    'value': new H['I']()
                },
                'anisotropyMap': {
                    'value': null
                },
                'anisotropyMapTransform': {
                    'value': new Q['d']()
                }
            }]),
            'vertexShader': S['v']['meshphysical_vert'],
            'fragmentShader': S['v']['meshphysical_frag']
        };
    }
    ,
    0x971c: (F, E, p) => {
        p['d'](E, {
            'H': () => S,
            'J': () => R
        });
        var S = '\x0avoid\x20main()\x20{\x0a\x0a\x09gl_Position\x20=\x20vec4(\x20position,\x201.0\x20);\x0a\x0a}\x0a'
          , R = '\x0auniform\x20sampler2D\x20shadow_pass;\x0auniform\x20vec2\x20resolution;\x0auniform\x20float\x20radius;\x0a\x0a#include\x20<packing>\x0a\x0avoid\x20main()\x20{\x0a\x0a\x09const\x20float\x20samples\x20=\x20float(\x20VSM_SAMPLES\x20);\x0a\x0a\x09float\x20mean\x20=\x200.0;\x0a\x09float\x20squared_mean\x20=\x200.0;\x0a\x0a\x09float\x20uvStride\x20=\x20samples\x20<=\x201.0\x20?\x200.0\x20:\x202.0\x20/\x20(\x20samples\x20-\x201.0\x20);\x0a\x09float\x20uvStart\x20=\x20samples\x20<=\x201.0\x20?\x200.0\x20:\x20-\x201.0;\x0a\x09for\x20(\x20float\x20i\x20=\x200.0;\x20i\x20<\x20samples;\x20i\x20++\x20)\x20{\x0a\x0a\x09\x09float\x20uvOffset\x20=\x20uvStart\x20+\x20i\x20*\x20uvStride;\x0a\x0a\x09\x09#ifdef\x20HORIZONTAL_PASS\x0a\x0a\x09\x09\x09vec2\x20distribution\x20=\x20unpackRGBATo2Half(\x20texture2D(\x20shadow_pass,\x20(\x20gl_FragCoord.xy\x20+\x20vec2(\x20uvOffset,\x200.0\x20)\x20*\x20radius\x20)\x20/\x20resolution\x20)\x20);\x0a\x09\x09\x09mean\x20+=\x20distribution.x;\x0a\x09\x09\x09squared_mean\x20+=\x20distribution.y\x20*\x20distribution.y\x20+\x20distribution.x\x20*\x20distribution.x;\x0a\x0a\x09\x09#else\x0a\x0a\x09\x09\x09float\x20depth\x20=\x20unpackRGBAToDepth(\x20texture2D(\x20shadow_pass,\x20(\x20gl_FragCoord.xy\x20+\x20vec2(\x200.0,\x20uvOffset\x20)\x20*\x20radius\x20)\x20/\x20resolution\x20)\x20);\x0a\x09\x09\x09mean\x20+=\x20depth;\x0a\x09\x09\x09squared_mean\x20+=\x20depth\x20*\x20depth;\x0a\x0a\x09\x09#endif\x0a\x0a\x09}\x0a\x0a\x09mean\x20=\x20mean\x20/\x20samples;\x0a\x09squared_mean\x20=\x20squared_mean\x20/\x20samples;\x0a\x0a\x09float\x20std_dev\x20=\x20sqrt(\x20squared_mean\x20-\x20mean\x20*\x20mean\x20);\x0a\x0a\x09gl_FragColor\x20=\x20pack2HalfToRGBA(\x20vec2(\x20mean,\x20std_dev\x20)\x20);\x0a\x0a}\x0a';
    }
    ,
    0x41ef: (F, E, p) => {
        p['d'](E, {
            'Ii': () => H,
            'Jd': () => y,
            'Ll': () => P,
            '_U': () => d,
            'lx': () => R
        });
        var S = p(0x4efe);
        function R(Q) {
            var B = {};
            for (var M in Q)
                for (var X in (B[M] = {},
                Q[M])) {
                    var m = Q[M][X];
                    m && (m['isColor'] || m['isMatrix3'] || m['isMatrix4'] || m['isVector2'] || m['isVector3'] || m['isVector4'] || m['isTexture'] || m['isQuaternion']) ? m['isRenderTargetTexture'] ? (console['warn']('UniformsUtils:\x20Textures\x20of\x20render\x20targets\x20cannot\x20be\x20cloned\x20via\x20cloneUniforms()\x20or\x20mergeUniforms().'),
                    B[M][X] = null) : B[M][X] = m['clone']() : Array['isArray'](m) ? B[M][X] = m['slice']() : B[M][X] = m;
                }
            return B;
        }
        function H(Q) {
            for (var B = {}, M = 0x0; M < Q['length']; M++) {
                var X = R(Q[M]);
                for (var m in X)
                    B[m] = X[m];
            }
            return B;
        }
        function y(Q) {
            for (var B = [], M = 0x0; M < Q['length']; M++)
                B['push'](Q[M]['clone']());
            return B;
        }
        function d(Q) {
            return null === Q['getRenderTarget']() ? Q['outputColorSpace'] : S['pp']['workingColorSpace'];
        }
        var P = {
            'clone': R,
            'merge': H
        };
    }
    ,
    0x4d15: (r, F, E) => {
        function p() {
            var S = null
              , R = !0x1
              , H = null
              , y = null;
            function d(P, Q) {
                H(P, Q),
                y = S['requestAnimationFrame'](d);
            }
            return {
                'start': function() {
                    !0x0 !== R && null !== H && (y = S['requestAnimationFrame'](d),
                    R = !0x0);
                },
                'stop': function() {
                    S['cancelAnimationFrame'](y),
                    R = !0x1;
                },
                'setAnimationLoop': function(P) {
                    H = P;
                },
                'setContext': function(P) {
                    S = P;
                }
            };
        }
        E['d'](F, {
            'O': () => p
        });
    }
    ,
    0xc1e: (r, F, E) => {
        function p(S, R) {
            var H = R['isWebGL2']
              , y = new WeakMap();
            return {
                'get': function(d) {
                    return d['isInterleavedBufferAttribute'] && (d = d['data']),
                    y['get'](d);
                },
                'remove': function(d) {
                    d['isInterleavedBufferAttribute'] && (d = d['data']);
                    var P = y['get'](d);
                    P && (S['deleteBuffer'](P['buffer']),
                    y['delete'](d));
                },
                'update': function(d, P) {
                    if (d['isGLBufferAttribute']) {
                        var Q = y['get'](d);
                        (!Q || Q['version'] < d['version']) && y['set'](d, {
                            'buffer': d['buffer'],
                            'type': d['type'],
                            'bytesPerElement': d['elementSize'],
                            'version': d['version']
                        });
                    } else {
                        d['isInterleavedBufferAttribute'] && (d = d['data']);
                        var B = y['get'](d);
                        if (void 0x0 === B)
                            y['set'](d, function(M, X) {
                                var m, w = M['array'], l = M['usage'], C = w['byteLength'], N = S['createBuffer']();
                                if (S['bindBuffer'](X, N),
                                S['bufferData'](X, w, l),
                                M['onUploadCallback'](),
                                w instanceof Float32Array)
                                    m = S['FLOAT'];
                                else {
                                    if (w instanceof Uint16Array) {
                                        if (M['isFloat16BufferAttribute']) {
                                            if (!H)
                                                throw new Error('THREE.WebGLAttributes:\x20Usage\x20of\x20Float16BufferAttribute\x20requires\x20WebGL2.');
                                            m = S['HALF_FLOAT'];
                                        } else
                                            m = S['UNSIGNED_SHORT'];
                                    } else {
                                        if (w instanceof Int16Array)
                                            m = S['SHORT'];
                                        else {
                                            if (w instanceof Uint32Array)
                                                m = S['UNSIGNED_INT'];
                                            else {
                                                if (w instanceof Int32Array)
                                                    m = S['INT'];
                                                else {
                                                    if (w instanceof Int8Array)
                                                        m = S['BYTE'];
                                                    else {
                                                        if (w instanceof Uint8Array)
                                                            m = S['UNSIGNED_BYTE'];
                                                        else {
                                                            if (!(w instanceof Uint8ClampedArray))
                                                                throw new Error('THREE.WebGLAttributes:\x20Unsupported\x20buffer\x20data\x20format:\x20' + w);
                                                            m = S['UNSIGNED_BYTE'];
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                return {
                                    'buffer': N,
                                    'type': m,
                                    'bytesPerElement': w['BYTES_PER_ELEMENT'],
                                    'version': M['version'],
                                    'size': C
                                };
                            }(d, P));
                        else {
                            if (B['version'] < d['version']) {
                                if (B['size'] !== d['array']['byteLength'])
                                    throw new Error('THREE.WebGLAttributes:\x20The\x20size\x20of\x20the\x20buffer\x20attribute\x27s\x20array\x20buffer\x20does\x20not\x20match\x20the\x20original\x20size.\x20Resizing\x20buffer\x20attributes\x20is\x20not\x20supported.');
                                !function(M, X, m) {
                                    var w = X['array']
                                      , C = X['_updateRange']
                                      , N = X['updateRanges'];
                                    if (S['bindBuffer'](m, M),
                                    -0x1 === C['count'] && 0x0 === N['length'] && S['bufferSubData'](m, 0x0, w),
                                    0x0 !== N['length']) {
                                        for (var Z = 0x0, h = N['length']; Z < h; Z++) {
                                            var U = N[Z];
                                            H ? S['bufferSubData'](m, U['start'] * w['BYTES_PER_ELEMENT'], w, U['start'], U['count']) : S['bufferSubData'](m, U['start'] * w['BYTES_PER_ELEMENT'], w['subarray'](U['start'], U['start'] + U['count']));
                                        }
                                        X['clearUpdateRanges']();
                                    }
                                    -0x1 !== C['count'] && (H ? S['bufferSubData'](m, C['offset'] * w['BYTES_PER_ELEMENT'], w, C['offset'], C['count']) : S['bufferSubData'](m, C['offset'] * w['BYTES_PER_ELEMENT'], w['subarray'](C['offset'], C['offset'] + C['count'])),
                                    C['count'] = -0x1),
                                    X['onUploadCallback']();
                                }(B['buffer'], d, P),
                                B['version'] = d['version'];
                            }
                        }
                    }
                }
            };
        }
        E['d'](F, {
            'B': () => p
        });
    }
    ,
    0x7b4e: (r, F, E) => {
        function p(S, R, H, y) {
            var d, P = y['isWebGL2'];
            this['setMode'] = function(Q) {
                d = Q;
            }
            ,
            this['render'] = function(Q, B) {
                S['drawArrays'](d, Q, B),
                H['update'](B, d, 0x1);
            }
            ,
            this['renderInstances'] = function(Q, B, M) {
                if (0x0 !== M) {
                    var X, m;
                    if (P)
                        X = S,
                        m = 'drawArraysInstanced';
                    else {
                        if (m = 'drawArraysInstancedANGLE',
                        null === (X = R['get']('ANGLE_instanced_arrays')))
                            return void console['error']('THREE.WebGLBufferRenderer:\x20using\x20THREE.InstancedBufferGeometry\x20but\x20hardware\x20does\x20not\x20support\x20extension\x20ANGLE_instanced_arrays.');
                    }
                    X[m](d, Q, B, M),
                    H['update'](B, d, M);
                }
            }
            ,
            this['renderMultiDraw'] = function(Q, B, M) {
                if (0x0 !== M) {
                    var X = R['get']('WEBGL_multi_draw');
                    if (null === X) {
                        for (var m = 0x0; m < M; m++)
                            this['render'](Q[m], B[m]);
                    } else {
                        X['multiDrawArraysWEBGL'](d, Q, 0x0, B, 0x0, M);
                        for (var w = 0x0, C = 0x0; C < M; C++)
                            w += B[C];
                        H['update'](w, d, 0x1);
                    }
                }
            }
            ;
        }
        E['d'](F, {
            'b': () => p
        });
    }
    ,
    0xcf4d: (r, F, E) => {
        function p(S, R, H) {
            var y;
            function P(L) {
                if ('highp' === L) {
                    if (S['getShaderPrecisionFormat'](S['VERTEX_SHADER'], S['HIGH_FLOAT'])['precision'] > 0x0 && S['getShaderPrecisionFormat'](S['FRAGMENT_SHADER'], S['HIGH_FLOAT'])['precision'] > 0x0)
                        return 'highp';
                    L = 'mediump';
                }
                return 'mediump' === L && S['getShaderPrecisionFormat'](S['VERTEX_SHADER'], S['MEDIUM_FLOAT'])['precision'] > 0x0 && S['getShaderPrecisionFormat'](S['FRAGMENT_SHADER'], S['MEDIUM_FLOAT'])['precision'] > 0x0 ? 'mediump' : 'lowp';
            }
            var Q = 'undefined' != typeof WebGL2RenderingContext && 'WebGL2RenderingContext' === S['constructor']['name']
              , B = void 0x0 !== H['precision'] ? H['precision'] : 'highp'
              , M = P(B);
            M !== B && (console['warn']('THREE.WebGLRenderer:', B, 'not\x20supported,\x20using', M, 'instead.'),
            B = M);
            var X = Q || R['has']('WEBGL_draw_buffers')
              , w = !0x0 === H['logarithmicDepthBuffer']
              , C = S['getParameter'](S['MAX_TEXTURE_IMAGE_UNITS'])
              , N = S['getParameter'](S['MAX_VERTEX_TEXTURE_IMAGE_UNITS'])
              , Z = S['getParameter'](S['MAX_TEXTURE_SIZE'])
              , U = S['getParameter'](S['MAX_CUBE_MAP_TEXTURE_SIZE'])
              , T = S['getParameter'](S['MAX_VERTEX_ATTRIBS'])
              , V = S['getParameter'](S['MAX_VERTEX_UNIFORM_VECTORS'])
              , G = S['getParameter'](S['MAX_VARYING_VECTORS'])
              , k = S['getParameter'](S['MAX_FRAGMENT_UNIFORM_VECTORS'])
              , W = N > 0x0
              , I = Q || R['has']('OES_texture_float');
            return {
                'isWebGL2': Q,
                'drawBuffers': X,
                'getMaxAnisotropy': function() {
                    if (void 0x0 !== y)
                        return y;
                    if (!0x0 === R['has']('EXT_texture_filter_anisotropic')) {
                        var L = R['get']('EXT_texture_filter_anisotropic');
                        y = S['getParameter'](L['MAX_TEXTURE_MAX_ANISOTROPY_EXT']);
                    } else
                        y = 0x0;
                    return y;
                },
                'getMaxPrecision': P,
                'precision': B,
                'logarithmicDepthBuffer': w,
                'maxTextures': C,
                'maxVertexTextures': N,
                'maxTextureSize': Z,
                'maxCubemapSize': U,
                'maxAttributes': T,
                'maxVertexUniforms': V,
                'maxVaryings': G,
                'maxFragmentUniforms': k,
                'vertexTextures': W,
                'floatFragmentTextures': I,
                'floatVertexTextures': W && I,
                'maxSamples': Q ? S['getParameter'](S['MAX_SAMPLES']) : 0x0
            };
        }
        E['d'](F, {
            'E': () => p
        });
    }
    ,
    0xddf9: (r, F, E) => {
        function p(S) {
            var R = {};
            function H(y) {
                if (void 0x0 !== R[y])
                    return R[y];
                var d;
                switch (y) {
                case 'WEBGL_depth_texture':
                    d = S['getExtension']('WEBGL_depth_texture') || S['getExtension']('MOZ_WEBGL_depth_texture') || S['getExtension']('WEBKIT_WEBGL_depth_texture');
                    break;
                case 'EXT_texture_filter_anisotropic':
                    d = S['getExtension']('EXT_texture_filter_anisotropic') || S['getExtension']('MOZ_EXT_texture_filter_anisotropic') || S['getExtension']('WEBKIT_EXT_texture_filter_anisotropic');
                    break;
                case 'WEBGL_compressed_texture_s3tc':
                    d = S['getExtension']('WEBGL_compressed_texture_s3tc') || S['getExtension']('MOZ_WEBGL_compressed_texture_s3tc') || S['getExtension']('WEBKIT_WEBGL_compressed_texture_s3tc');
                    break;
                case 'WEBGL_compressed_texture_pvrtc':
                    d = S['getExtension']('WEBGL_compressed_texture_pvrtc') || S['getExtension']('WEBKIT_WEBGL_compressed_texture_pvrtc');
                    break;
                default:
                    d = S['getExtension'](y);
                }
                return R[y] = d,
                d;
            }
            return {
                'has': function(y) {
                    return null !== H(y);
                },
                'init': function(y) {
                    y['isWebGL2'] ? H('EXT_color_buffer_float') : (H('WEBGL_depth_texture'),
                    H('OES_texture_float'),
                    H('OES_texture_half_float'),
                    H('OES_texture_half_float_linear'),
                    H('OES_standard_derivatives'),
                    H('OES_element_index_uint'),
                    H('OES_vertex_array_object'),
                    H('ANGLE_instanced_arrays')),
                    H('OES_texture_float_linear'),
                    H('EXT_color_buffer_half_float'),
                    H('WEBGL_multisampled_render_to_texture');
                },
                'get': function(y) {
                    var d = H(y);
                    return null === d && console['warn']('THREE.WebGLRenderer:\x20' + y + '\x20extension\x20not\x20supported.'),
                    d;
                }
            };
        }
        E['d'](F, {
            'C': () => p
        });
    }
    ,
    0xcff: (r, F, E) => {
        function p(S, R, H, y) {
            var d, P, Q, B = y['isWebGL2'];
            this['setMode'] = function(M) {
                d = M;
            }
            ,
            this['setIndex'] = function(M) {
                P = M['type'],
                Q = M['bytesPerElement'];
            }
            ,
            this['render'] = function(M, X) {
                S['drawElements'](d, X, P, M * Q),
                H['update'](X, d, 0x1);
            }
            ,
            this['renderInstances'] = function(M, X, m) {
                if (0x0 !== m) {
                    var w, C;
                    if (B)
                        w = S,
                        C = 'drawElementsInstanced';
                    else {
                        if (C = 'drawElementsInstancedANGLE',
                        null === (w = R['get']('ANGLE_instanced_arrays')))
                            return void console['error']('THREE.WebGLIndexedBufferRenderer:\x20using\x20THREE.InstancedBufferGeometry\x20but\x20hardware\x20does\x20not\x20support\x20extension\x20ANGLE_instanced_arrays.');
                    }
                    w[C](d, X, P, M * Q, m),
                    H['update'](X, d, m);
                }
            }
            ,
            this['renderMultiDraw'] = function(M, X, m) {
                if (0x0 !== m) {
                    var w = R['get']('WEBGL_multi_draw');
                    if (null === w) {
                        for (var C = 0x0; C < m; C++)
                            this['render'](M[C] / Q, X[C]);
                    } else {
                        w['multiDrawElementsWEBGL'](d, X, 0x0, P, M, 0x0, m);
                        for (var N = 0x0, Z = 0x0; Z < m; Z++)
                            N += X[Z];
                        H['update'](N, d, 0x1);
                    }
                }
            }
            ;
        }
        E['d'](F, {
            'W': () => p
        });
    }
    ,
    0xfa3f: (r, F, E) => {
        function p(S) {
            var R = {
                'frame': 0x0,
                'calls': 0x0,
                'triangles': 0x0,
                'points': 0x0,
                'lines': 0x0
            };
            return {
                'memory': {
                    'geometries': 0x0,
                    'textures': 0x0
                },
                'render': R,
                'programs': null,
                'autoReset': !0x0,
                'reset': function() {
                    R['calls'] = 0x0,
                    R['triangles'] = 0x0,
                    R['points'] = 0x0,
                    R['lines'] = 0x0;
                },
                'update': function(H, y, d) {
                    switch (R['calls']++,
                    y) {
                    case S['TRIANGLES']:
                        R['triangles'] += d * (H / 0x3);
                        break;
                    case S['LINES']:
                        R['lines'] += d * (H / 0x2);
                        break;
                    case S['LINE_STRIP']:
                        R['lines'] += d * (H - 0x1);
                        break;
                    case S['LINE_LOOP']:
                        R['lines'] += d * H;
                        break;
                    case S['POINTS']:
                        R['points'] += d * H;
                        break;
                    default:
                        console['error']('THREE.WebGLInfo:\x20Unknown\x20draw\x20mode:', y);
                    }
                }
            };
        }
        E['d'](F, {
            'i': () => p
        });
    }
    ,
    0x11c2f: (r, F, E) => {
        function p(S, R, H, y) {
            var d = new WeakMap();
            function P(Q) {
                var B = Q['target'];
                B['removeEventListener']('dispose', P),
                H['remove'](B['instanceMatrix']),
                null !== B['instanceColor'] && H['remove'](B['instanceColor']);
            }
            return {
                'update': function(Q) {
                    var B = y['render']['frame']
                      , M = Q['geometry']
                      , X = R['get'](Q, M);
                    if (d['get'](X) !== B && (R['update'](X),
                    d['set'](X, B)),
                    Q['isInstancedMesh'] && (!0x1 === Q['hasEventListener']('dispose', P) && Q['addEventListener']('dispose', P),
                    d['get'](Q) !== B && (H['update'](Q['instanceMatrix'], S['ARRAY_BUFFER']),
                    null !== Q['instanceColor'] && H['update'](Q['instanceColor'], S['ARRAY_BUFFER']),
                    d['set'](Q, B))),
                    Q['isSkinnedMesh']) {
                        var m = Q['skeleton'];
                        d['get'](m) !== B && (m['update'](),
                        d['set'](m, B));
                    }
                    return X;
                },
                'dispose': function() {
                    d = new WeakMap();
                }
            };
        }
        E['d'](F, {
            'C': () => p
        });
    }
    ,
    0xbaa2: (r, F, E) => {
        function p() {
            var S = new WeakMap();
            return {
                'get': function(R) {
                    var H = S['get'](R);
                    return void 0x0 === H && (H = {},
                    S['set'](R, H)),
                    H;
                },
                'remove': function(R) {
                    S['delete'](R);
                },
                'update': function(R, H, y) {
                    S['get'](R)[H] = y;
                },
                'dispose': function() {
                    S = new WeakMap();
                }
            };
        }
        E['d'](F, {
            'R': () => p
        });
    }
    ,
    0xac6: (F, E, p) => {
        function S(d, P) {
            return d['groupOrder'] !== P['groupOrder'] ? d['groupOrder'] - P['groupOrder'] : d['renderOrder'] !== P['renderOrder'] ? d['renderOrder'] - P['renderOrder'] : d['material']['id'] !== P['material']['id'] ? d['material']['id'] - P['material']['id'] : d['z'] !== P['z'] ? d['z'] - P['z'] : d['id'] - P['id'];
        }
        function R(d, P) {
            return d['groupOrder'] !== P['groupOrder'] ? d['groupOrder'] - P['groupOrder'] : d['renderOrder'] !== P['renderOrder'] ? d['renderOrder'] - P['renderOrder'] : d['z'] !== P['z'] ? P['z'] - d['z'] : d['id'] - P['id'];
        }
        function H() {
            var d = []
              , P = 0x0
              , Q = []
              , B = []
              , M = [];
            function X(m, w, l, C, N, Z) {
                var h = d[P];
                return void 0x0 === h ? (h = {
                    'id': m['id'],
                    'object': m,
                    'geometry': w,
                    'material': l,
                    'groupOrder': C,
                    'renderOrder': m['renderOrder'],
                    'z': N,
                    'group': Z
                },
                d[P] = h) : (h['id'] = m['id'],
                h['object'] = m,
                h['geometry'] = w,
                h['material'] = l,
                h['groupOrder'] = C,
                h['renderOrder'] = m['renderOrder'],
                h['z'] = N,
                h['group'] = Z),
                P++,
                h;
            }
            return {
                'opaque': Q,
                'transmissive': B,
                'transparent': M,
                'init': function() {
                    P = 0x0,
                    Q['length'] = 0x0,
                    B['length'] = 0x0,
                    M['length'] = 0x0;
                },
                'push': function(m, w, C, N, Z, h) {
                    var U = X(m, w, C, N, Z, h);
                    C['transmission'] > 0x0 ? B['push'](U) : !0x0 === C['transparent'] ? M['push'](U) : Q['push'](U);
                },
                'unshift': function(m, w, C, N, Z, h) {
                    var U = X(m, w, C, N, Z, h);
                    C['transmission'] > 0x0 ? B['unshift'](U) : !0x0 === C['transparent'] ? M['unshift'](U) : Q['unshift'](U);
                },
                'finish': function() {
                    for (var m = P, w = d['length']; m < w; m++) {
                        var l = d[m];
                        if (null === l['id'])
                            break;
                        l['id'] = null,
                        l['object'] = null,
                        l['geometry'] = null,
                        l['material'] = null,
                        l['group'] = null;
                    }
                },
                'sort': function(m, w) {
                    Q['length'] > 0x1 && Q['sort'](m || S),
                    B['length'] > 0x1 && B['sort'](w || R),
                    M['length'] > 0x1 && M['sort'](w || R);
                }
            };
        }
        function y() {
            var d = new WeakMap();
            return {
                'get': function(P, Q) {
                    var B, M = d['get'](P);
                    return void 0x0 === M ? (B = new H(),
                    d['set'](P, [B])) : Q >= M['length'] ? (B = new H(),
                    M['push'](B)) : B = M[Q],
                    B;
                },
                'dispose': function() {
                    d = new WeakMap();
                }
            };
        }
        p['d'](E, {
            '$': () => y
        });
    }
    ,
    0x16f96: (r, F, E) => {
        function p(S, R, H) {
            var y = S['createShader'](R);
            return S['shaderSource'](y, H),
            S['compileShader'](y),
            y;
        }
        E['d'](F, {
            'n': () => p
        });
    }
    ,
    0x2106: (F, E, p) => {
        function S(P, Q) {
            var B = 'undefined' != typeof Symbol && P[Symbol['iterator']] || P['@@iterator'];
            if (B)
                return (B = B['call'](P))['next']['bind'](B);
            if (Array['isArray'](P) || (B = function(X, m) {
                if (!X)
                    return;
                if ('string' == typeof X)
                    return R(X, m);
                var w = Object['prototype']['toString']['call'](X)['slice'](0x8, -0x1);
                'Object' === w && X['constructor'] && (w = X['constructor']['name']);
                if ('Map' === w || 'Set' === w)
                    return Array['from'](X);
                if ('Arguments' === w || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/['test'](w))
                    return R(X, m);
            }(P)) || Q && P && 'number' == typeof P['length']) {
                B && (P = B);
                var M = 0x0;
                return function() {
                    return M >= P['length'] ? {
                        'done': !0x0
                    } : {
                        'done': !0x1,
                        'value': P[M++]
                    };
                }
                ;
            }
            throw new TypeError('Invalid\x20attempt\x20to\x20iterate\x20non-iterable\x20instance.\x0aIn\x20order\x20to\x20be\x20iterable,\x20non-array\x20objects\x20must\x20have\x20a\x20[Symbol.iterator]()\x20method.');
        }
        function R(P, Q) {
            (null == Q || Q > P['length']) && (Q = P['length']);
            for (var B = 0x0, M = new Array(Q); B < Q; B++)
                M[B] = P[B];
            return M;
        }
        p['d'](E, {
            'j': () => y
        });
        var H = 0x0
          , y = (function() {
            function P() {
                this['shaderCache'] = new Map(),
                this['materialCache'] = new Map();
            }
            var Q = P['prototype'];
            return Q['update'] = function(B) {
                var M = B['vertexShader']
                  , X = B['fragmentShader']
                  , m = this['_getShaderStage'](M)
                  , w = this['_getShaderStage'](X)
                  , l = this['_getShaderCacheForMaterial'](B);
                return !0x1 === l['has'](m) && (l['add'](m),
                m['usedTimes']++),
                !0x1 === l['has'](w) && (l['add'](w),
                w['usedTimes']++),
                this;
            }
            ,
            Q['remove'] = function(B) {
                for (var M, X = S(this['materialCache']['get'](B)); !(M = X())['done']; ) {
                    var m = M['value'];
                    m['usedTimes']--,
                    0x0 === m['usedTimes'] && this['shaderCache']['delete'](m['code']);
                }
                return this['materialCache']['delete'](B),
                this;
            }
            ,
            Q['getVertexShaderID'] = function(B) {
                return this['_getShaderStage'](B['vertexShader'])['id'];
            }
            ,
            Q['getFragmentShaderID'] = function(B) {
                return this['_getShaderStage'](B['fragmentShader'])['id'];
            }
            ,
            Q['dispose'] = function() {
                this['shaderCache']['clear'](),
                this['materialCache']['clear']();
            }
            ,
            Q['_getShaderCacheForMaterial'] = function(B) {
                var M = this['materialCache']
                  , X = M['get'](B);
                return void 0x0 === X && (X = new Set(),
                M['set'](B, X)),
                X;
            }
            ,
            Q['_getShaderStage'] = function(B) {
                var M = this['shaderCache']
                  , X = M['get'](B);
                return void 0x0 === X && (X = new d(B),
                M['set'](B, X)),
                X;
            }
            ,
            P;
        }())
          , d = function(P) {
            this['id'] = H++,
            this['code'] = P,
            this['usedTimes'] = 0x0;
        };
    }
    ,
    0x9176: (r, F, E) => {
        function p(S, R, H, y) {
            var d = {}
              , P = {}
              , Q = []
              , B = H['isWebGL2'] ? S['getParameter'](S['MAX_UNIFORM_BUFFER_BINDINGS']) : 0x0;
            function M(w, C, N) {
                var Z = w['value'];
                if (void 0x0 === N[C]) {
                    if ('number' == typeof Z)
                        N[C] = Z;
                    else {
                        for (var h = Array['isArray'](Z) ? Z : [Z], U = [], T = 0x0; T < h['length']; T++)
                            U['push'](h[T]['clone']());
                        N[C] = U;
                    }
                    return !0x0;
                }
                if ('number' == typeof Z) {
                    if (N[C] !== Z)
                        return N[C] = Z,
                        !0x0;
                } else
                    for (var V = Array['isArray'](N[C]) ? N[C] : [N[C]], G = Array['isArray'](Z) ? Z : [Z], k = 0x0; k < V['length']; k++) {
                        var W = V[k];
                        if (!0x1 === W['equals'](G[k]))
                            return W['copy'](G[k]),
                            !0x0;
                    }
                return !0x1;
            }
            function X(w) {
                var C = {
                    'boundary': 0x0,
                    'storage': 0x0
                };
                return 'number' == typeof w ? (C['boundary'] = 0x4,
                C['storage'] = 0x4) : w['isVector2'] ? (C['boundary'] = 0x8,
                C['storage'] = 0x8) : w['isVector3'] || w['isColor'] ? (C['boundary'] = 0x10,
                C['storage'] = 0xc) : w['isVector4'] ? (C['boundary'] = 0x10,
                C['storage'] = 0x10) : w['isMatrix3'] ? (C['boundary'] = 0x30,
                C['storage'] = 0x30) : w['isMatrix4'] ? (C['boundary'] = 0x40,
                C['storage'] = 0x40) : w['isTexture'] ? console['warn']('THREE.WebGLRenderer:\x20Texture\x20samplers\x20can\x20not\x20be\x20part\x20of\x20an\x20uniforms\x20group.') : console['warn']('THREE.WebGLRenderer:\x20Unsupported\x20uniform\x20value\x20type.', w),
                C;
            }
            function m(w) {
                var C = w['target'];
                C['removeEventListener']('dispose', m);
                var N = Q['indexOf'](C['__bindingPointIndex']);
                Q['splice'](N, 0x1),
                S['deleteBuffer'](d[C['id']]),
                delete d[C['id']],
                delete P[C['id']];
            }
            return {
                'bind': function(w, C) {
                    var N = C['program'];
                    y['uniformBlockBinding'](w, N);
                },
                'update': function(w, C) {
                    var N = d[w['id']];
                    void 0x0 === N && (!function(T) {
                        for (var V = T['uniforms'], G = 0x0, k = 0x10, W = 0x0, x = 0x0, I = V['length']; x < I; x++) {
                            for (var g = V[x], L = {
                                'boundary': 0x0,
                                'storage': 0x0
                            }, q = Array['isArray'](g['value']) ? g['value'] : [g['value']], K = 0x0, Y = q['length']; K < Y; K++) {
                                var z = X(q[K]);
                                L['boundary'] += z['boundary'],
                                L['storage'] += z['storage'];
                            }
                            if (g['__data'] = new Float32Array(L['storage'] / Float32Array['BYTES_PER_ELEMENT']),
                            g['__offset'] = G,
                            x > 0x0)
                                0x0 !== (W = G % k) && k - W - L['boundary'] < 0x0 && (G += k - W,
                                g['__offset'] = G);
                            G += L['storage'];
                        }
                        (W = G % k) > 0x0 && (G += k - W),
                        (T['__size'] = G,
                        T['__cache'] = {});
                    }(w),
                    N = function(T) {
                        var V = (function() {
                            for (var x = 0x0; x < B; x++)
                                if (-0x1 === Q['indexOf'](x))
                                    return Q['push'](x),
                                    x;
                            return console['error']('THREE.WebGLRenderer:\x20Maximum\x20number\x20of\x20simultaneously\x20usable\x20uniforms\x20groups\x20reached.'),
                            0x0;
                        }());
                        T['__bindingPointIndex'] = V;
                        var G = S['createBuffer']()
                          , k = T['__size']
                          , W = T['usage'];
                        return S['bindBuffer'](S['UNIFORM_BUFFER'], G),
                        S['bufferData'](S['UNIFORM_BUFFER'], k, W),
                        S['bindBuffer'](S['UNIFORM_BUFFER'], null),
                        S['bindBufferBase'](S['UNIFORM_BUFFER'], V, G),
                        G;
                    }(w),
                    d[w['id']] = N,
                    w['addEventListener']('dispose', m));
                    var Z = C['program'];
                    y['updateUBOMapping'](w, Z);
                    var U = R['render']['frame'];
                    P[w['id']] !== U && (!function(T) {
                        var V = d[T['id']]
                          , G = T['uniforms']
                          , k = T['__cache'];
                        S['bindBuffer'](S['UNIFORM_BUFFER'], V);
                        for (var W = 0x0, x = G['length']; W < x; W++) {
                            var I = G[W];
                            if (!0x0 === M(I, W, k)) {
                                for (var g = I['__offset'], L = Array['isArray'](I['value']) ? I['value'] : [I['value']], q = 0x0, K = 0x0; K < L['length']; K++) {
                                    var Y = L[K]
                                      , z = X(Y);
                                    'number' == typeof Y ? (I['__data'][0x0] = Y,
                                    S['bufferSubData'](S['UNIFORM_BUFFER'], g + q, I['__data'])) : Y['isMatrix3'] ? (I['__data'][0x0] = Y['elements'][0x0],
                                    I['__data'][0x1] = Y['elements'][0x1],
                                    I['__data'][0x2] = Y['elements'][0x2],
                                    I['__data'][0x3] = Y['elements'][0x0],
                                    I['__data'][0x4] = Y['elements'][0x3],
                                    I['__data'][0x5] = Y['elements'][0x4],
                                    I['__data'][0x6] = Y['elements'][0x5],
                                    I['__data'][0x7] = Y['elements'][0x0],
                                    I['__data'][0x8] = Y['elements'][0x6],
                                    I['__data'][0x9] = Y['elements'][0x7],
                                    I['__data'][0xa] = Y['elements'][0x8],
                                    I['__data'][0xb] = Y['elements'][0x0]) : (Y['toArray'](I['__data'], q),
                                    q += z['storage'] / Float32Array['BYTES_PER_ELEMENT']);
                                }
                                S['bufferSubData'](S['UNIFORM_BUFFER'], g, I['__data']);
                            }
                        }
                        S['bindBuffer'](S['UNIFORM_BUFFER'], null);
                    }(w),
                    P[w['id']] = U);
                },
                'dispose': function() {
                    for (var w in d)
                        S['deleteBuffer'](d[w]);
                    Q = [],
                    d = {},
                    P = {};
                }
            };
        }
        E['d'](F, {
            'p': () => p
        });
    }
    ,
    0xc3ba: (F, E, p) => {
        p['d'](E, {
            'h': () => H
        });
        var S = p(0x172d2)
          , R = p(0x4efe);
        function H(y, d, P) {
            var Q = P['isWebGL2'];
            return {
                'convert': function(B, M) {
                    var X;
                    void 0x0 === M && (M = S['jf0']);
                    var m = R['pp']['getTransfer'](M);
                    if (B === S['OUM'])
                        return y['UNSIGNED_BYTE'];
                    if (B === S['Wew'])
                        return y['UNSIGNED_SHORT_4_4_4_4'];
                    if (B === S['gJ2'])
                        return y['UNSIGNED_SHORT_5_5_5_1'];
                    if (B === S['tJf'])
                        return y['BYTE'];
                    if (B === S['fBL'])
                        return y['SHORT'];
                    if (B === S['cHt'])
                        return y['UNSIGNED_SHORT'];
                    if (B === S['Yuy'])
                        return y['INT'];
                    if (B === S['bkx'])
                        return y['UNSIGNED_INT'];
                    if (B === S['RQf'])
                        return y['FLOAT'];
                    if (B === S['ix0'])
                        return Q ? y['HALF_FLOAT'] : null !== (X = d['get']('OES_texture_half_float')) ? X['HALF_FLOAT_OES'] : null;
                    if (B === S['wrO'])
                        return y['ALPHA'];
                    if (B === S['GWd'])
                        return y['RGBA'];
                    if (B === S['Kzv'])
                        return y['LUMINANCE'];
                    if (B === S['CMB'])
                        return y['LUMINANCE_ALPHA'];
                    if (B === S['zdS'])
                        return y['DEPTH_COMPONENT'];
                    if (B === S['dcC'])
                        return y['DEPTH_STENCIL'];
                    if (B === S['Ua6'])
                        return null !== (X = d['get']('EXT_sRGB')) ? X['SRGB_ALPHA_EXT'] : null;
                    if (B === S['VT0'])
                        return y['RED'];
                    if (B === S['ZQM'])
                        return y['RED_INTEGER'];
                    if (B === S['paN'])
                        return y['RG'];
                    if (B === S['TkQ'])
                        return y['RG_INTEGER'];
                    if (B === S['c90'])
                        return y['RGBA_INTEGER'];
                    if (B === S['IE4'] || B === S['Nz6'] || B === S['jR7'] || B === S['BXX']) {
                        if (m === S['KLL']) {
                            if (null === (X = d['get']('WEBGL_compressed_texture_s3tc_srgb')))
                                return null;
                            if (B === S['IE4'])
                                return X['COMPRESSED_SRGB_S3TC_DXT1_EXT'];
                            if (B === S['Nz6'])
                                return X['COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT'];
                            if (B === S['jR7'])
                                return X['COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT'];
                            if (B === S['BXX'])
                                return X['COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT'];
                        } else {
                            if (null === (X = d['get']('WEBGL_compressed_texture_s3tc')))
                                return null;
                            if (B === S['IE4'])
                                return X['COMPRESSED_RGB_S3TC_DXT1_EXT'];
                            if (B === S['Nz6'])
                                return X['COMPRESSED_RGBA_S3TC_DXT1_EXT'];
                            if (B === S['jR7'])
                                return X['COMPRESSED_RGBA_S3TC_DXT3_EXT'];
                            if (B === S['BXX'])
                                return X['COMPRESSED_RGBA_S3TC_DXT5_EXT'];
                        }
                    }
                    if (B === S['k6Q'] || B === S['kTp'] || B === S['HXV'] || B === S['pBf']) {
                        if (null === (X = d['get']('WEBGL_compressed_texture_pvrtc')))
                            return null;
                        if (B === S['k6Q'])
                            return X['COMPRESSED_RGB_PVRTC_4BPPV1_IMG'];
                        if (B === S['kTp'])
                            return X['COMPRESSED_RGB_PVRTC_2BPPV1_IMG'];
                        if (B === S['HXV'])
                            return X['COMPRESSED_RGBA_PVRTC_4BPPV1_IMG'];
                        if (B === S['pBf'])
                            return X['COMPRESSED_RGBA_PVRTC_2BPPV1_IMG'];
                    }
                    if (B === S['CVz'])
                        return null !== (X = d['get']('WEBGL_compressed_texture_etc1')) ? X['COMPRESSED_RGB_ETC1_WEBGL'] : null;
                    if (B === S['Riy'] || B === S['KDk']) {
                        if (null === (X = d['get']('WEBGL_compressed_texture_etc')))
                            return null;
                        if (B === S['Riy'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ETC2'] : X['COMPRESSED_RGB8_ETC2'];
                        if (B === S['KDk'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ETC2_EAC'] : X['COMPRESSED_RGBA8_ETC2_EAC'];
                    }
                    if (B === S['qa3'] || B === S['B_h'] || B === S['czI'] || B === S['rSH'] || B === S['Qrf'] || B === S['psI'] || B === S['a5J'] || B === S['_QJ'] || B === S['uB5'] || B === S['lyL'] || B === S['bC7'] || B === S['y3Z'] || B === S['ojs'] || B === S['S$4']) {
                        if (null === (X = d['get']('WEBGL_compressed_texture_astc')))
                            return null;
                        if (B === S['qa3'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR'] : X['COMPRESSED_RGBA_ASTC_4x4_KHR'];
                        if (B === S['B_h'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR'] : X['COMPRESSED_RGBA_ASTC_5x4_KHR'];
                        if (B === S['czI'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR'] : X['COMPRESSED_RGBA_ASTC_5x5_KHR'];
                        if (B === S['rSH'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR'] : X['COMPRESSED_RGBA_ASTC_6x5_KHR'];
                        if (B === S['Qrf'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR'] : X['COMPRESSED_RGBA_ASTC_6x6_KHR'];
                        if (B === S['psI'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR'] : X['COMPRESSED_RGBA_ASTC_8x5_KHR'];
                        if (B === S['a5J'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR'] : X['COMPRESSED_RGBA_ASTC_8x6_KHR'];
                        if (B === S['_QJ'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR'] : X['COMPRESSED_RGBA_ASTC_8x8_KHR'];
                        if (B === S['uB5'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR'] : X['COMPRESSED_RGBA_ASTC_10x5_KHR'];
                        if (B === S['lyL'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR'] : X['COMPRESSED_RGBA_ASTC_10x6_KHR'];
                        if (B === S['bC7'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR'] : X['COMPRESSED_RGBA_ASTC_10x8_KHR'];
                        if (B === S['y3Z'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR'] : X['COMPRESSED_RGBA_ASTC_10x10_KHR'];
                        if (B === S['ojs'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR'] : X['COMPRESSED_RGBA_ASTC_12x10_KHR'];
                        if (B === S['S$4'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR'] : X['COMPRESSED_RGBA_ASTC_12x12_KHR'];
                    }
                    if (B === S['Fn'] || B === S['H23'] || B === S['W9U']) {
                        if (null === (X = d['get']('EXT_texture_compression_bptc')))
                            return null;
                        if (B === S['Fn'])
                            return m === S['KLL'] ? X['COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT'] : X['COMPRESSED_RGBA_BPTC_UNORM_EXT'];
                        if (B === S['H23'])
                            return X['COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT'];
                        if (B === S['W9U'])
                            return X['COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT'];
                    }
                    if (B === S['Kef'] || B === S['XG_'] || B === S['HO_'] || B === S['CWW']) {
                        if (null === (X = d['get']('EXT_texture_compression_rgtc')))
                            return null;
                        if (B === S['Fn'])
                            return X['COMPRESSED_RED_RGTC1_EXT'];
                        if (B === S['XG_'])
                            return X['COMPRESSED_SIGNED_RED_RGTC1_EXT'];
                        if (B === S['HO_'])
                            return X['COMPRESSED_RED_GREEN_RGTC2_EXT'];
                        if (B === S['CWW'])
                            return X['COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT'];
                    }
                    return B === S['V3x'] ? Q ? y['UNSIGNED_INT_24_8'] : null !== (X = d['get']('WEBGL_depth_texture')) ? X['UNSIGNED_INT_24_8_WEBGL'] : null : void 0x0 !== y[B] ? y[B] : null;
                }
            };
        }
    }
    ,
    0x12331: (r, F, E) => {
        E(0x169b1);
    }
    ,
    0xb9f2: (r, F, E) => {
        E(0x169b1);
    }
    ,
    0x24cb: (r, F, E) => {
        E(0x17417);
    }
    ,
    0xdc03: (r, F, E) => {
        E(0x172d2),
        E(0x308);
    }
    ,
    0x11073: (r, F, E) => {
        E(0x172d2),
        E(0x308);
    }
    ,
    0x308: (r, F, E) => {
        E(0x17417);
    }
    ,
    0xb12c: (F, E, p) => {
        p['d'](E, {
            'b': () => d
        });
        var S = p(0x14124)
          , R = p(0x12e4b)
          , H = p(0x17417)
          , y = p(0x172d2)
          , d = function(P) {
            function Q(B, M, X, m, w, C, N, Z, U, T) {
                var V;
                return B = void 0x0 !== B ? B : [],
                M = void 0x0 !== M ? M : y['hy7'],
                (V = P['call'](this, B, M, X, m, w, C, N, Z, U, T) || this)['isCubeTexture'] = !0x0,
                V['flipY'] = !0x1,
                V;
            }
            return (0x0,
            R['A'])(Q, P),
            (0x0,
            S['A'])(Q, [{
                'key': 'images',
                'get': function() {
                    return this['image'];
                },
                'set': function(B) {
                    this['image'] = B;
                }
            }]);
        }(H['g']);
    }
    ,
    0x10762: (F, E, p) => {
        p['d'](E, {
            'd': () => y
        });
        var S = p(0x12e4b)
          , R = p(0x17417)
          , H = p(0x172d2)
          , y = function(d) {
            function P(Q, B, M, X) {
                var m;
                return void 0x0 === Q && (Q = null),
                void 0x0 === B && (B = 0x1),
                void 0x0 === M && (M = 0x1),
                void 0x0 === X && (X = 0x1),
                (m = d['call'](this, null) || this)['isData3DTexture'] = !0x0,
                m['image'] = {
                    'data': Q,
                    'width': B,
                    'height': M,
                    'depth': X
                },
                m['magFilter'] = H['hxR'],
                m['minFilter'] = H['hxR'],
                m['wrapR'] = H['ghU'],
                m['generateMipmaps'] = !0x1,
                m['flipY'] = !0x1,
                m['unpackAlignment'] = 0x1,
                m;
            }
            return (0x0,
            S['A'])(P, d),
            P;
        }(R['g']);
    }
    ,
    0xc71e: (F, E, p) => {
        p['d'](E, {
            'r': () => y
        });
        var S = p(0x12e4b)
          , R = p(0x17417)
          , H = p(0x172d2)
          , y = function(d) {
            function P(Q, B, M, X) {
                var m;
                return void 0x0 === Q && (Q = null),
                void 0x0 === B && (B = 0x1),
                void 0x0 === M && (M = 0x1),
                void 0x0 === X && (X = 0x1),
                (m = d['call'](this, null) || this)['isDataArrayTexture'] = !0x0,
                m['image'] = {
                    'data': Q,
                    'width': B,
                    'height': M,
                    'depth': X
                },
                m['magFilter'] = H['hxR'],
                m['minFilter'] = H['hxR'],
                m['wrapR'] = H['ghU'],
                m['generateMipmaps'] = !0x1,
                m['flipY'] = !0x1,
                m['unpackAlignment'] = 0x1,
                m;
            }
            return (0x0,
            S['A'])(P, d),
            P;
        }(R['g']);
    }
    ,
    0xac1a: (F, E, p) => {
        p['d'](E, {
            'V': () => y
        });
        var S = p(0x12e4b)
          , R = p(0x17417)
          , H = p(0x172d2)
          , y = function(d) {
            function P(B, M, X, m, w, C, N, Z, U, T) {
                var V;
                if ((T = void 0x0 !== T ? T : H['zdS']) !== H['zdS'] && T !== H['dcC'])
                    throw new Error('DepthTexture\x20format\x20must\x20be\x20either\x20THREE.DepthFormat\x20or\x20THREE.DepthStencilFormat');
                return void 0x0 === X && T === H['zdS'] && (X = H['bkx']),
                void 0x0 === X && T === H['dcC'] && (X = H['V3x']),
                (V = d['call'](this, null, m, w, C, N, Z, T, X, U) || this)['isDepthTexture'] = !0x0,
                V['image'] = {
                    'width': B,
                    'height': M
                },
                V['magFilter'] = void 0x0 !== N ? N : H['hxR'],
                V['minFilter'] = void 0x0 !== Z ? Z : H['hxR'],
                V['flipY'] = !0x1,
                V['generateMipmaps'] = !0x1,
                V['compareFunction'] = null,
                V;
            }
            (0x0,
            S['A'])(P, d);
            var Q = P['prototype'];
            return Q['copy'] = function(B) {
                return d['prototype']['copy']['call'](this, B),
                this['compareFunction'] = B['compareFunction'],
                this;
            }
            ,
            Q['toJSON'] = function(B) {
                var M = d['prototype']['toJSON']['call'](this, B);
                return null !== this['compareFunction'] && (M['compareFunction'] = this['compareFunction']),
                M;
            }
            ,
            P;
        }(R['g']);
    }
    ,
    0x6dbc: (r, F, E) => {
        E(0x17417),
        E(0x172d2);
    }
    ,
    0x14f63: (F, E, p) => {
        p['d'](E, {
            'k': () => d
        });
        var S = p(0x14124)
          , R = p(0x10d2d)
          , H = p(0xbd95)
          , y = 0x0
          , d = (function() {
            function Q(B) {
                void 0x0 === B && (B = null),
                this['isSource'] = !0x0,
                Object['defineProperty'](this, 'id', {
                    'value': y++
                }),
                this['uuid'] = H['lk'](),
                this['data'] = B,
                this['version'] = 0x0;
            }
            return Q['prototype']['toJSON'] = function(B) {
                var M = void 0x0 === B || 'string' == typeof B;
                if (!M && void 0x0 !== B['images'][this['uuid']])
                    return B['images'][this['uuid']];
                var X = {
                    'uuid': this['uuid'],
                    'url': ''
                }
                  , m = this['data'];
                if (null !== m) {
                    var w;
                    if (Array['isArray'](m)) {
                        w = [];
                        for (var l = 0x0, C = m['length']; l < C; l++)
                            m[l]['isDataTexture'] ? w['push'](P(m[l]['image'])) : w['push'](P(m[l]));
                    } else
                        w = P(m);
                    X['url'] = w;
                }
                return M || (B['images'][this['uuid']] = X),
                X;
            }
            ,
            (0x0,
            S['A'])(Q, [{
                'key': 'needsUpdate',
                'set': function(B) {
                    !0x0 === B && this['version']++;
                }
            }]);
        }());
        function P(Q) {
            return 'undefined' != typeof HTMLImageElement && Q instanceof HTMLImageElement || 'undefined' != typeof HTMLCanvasElement && Q instanceof HTMLCanvasElement || 'undefined' != typeof ImageBitmap && Q instanceof ImageBitmap ? R['H']['getDataURL'](Q) : Q['data'] ? {
                'data': Array['from'](Q['data']),
                'width': Q['width'],
                'height': Q['height'],
                'type': Q['data']['constructor']['name']
            } : (console['warn']('THREE.Texture:\x20Unable\x20to\x20serialize\x20Texture.'),
            {});
        }
    }
    ,
    0x17417: (F, E, p) => {
        p['d'](E, {
            'g': () => w
        });
        var S = p(0x14124)
          , R = p(0x12e4b)
          , H = p(0x161ea)
          , y = p(0x172d2)
          , P = p(0xbd95)
          , Q = p(0x1264d)
          , B = p(0x3e78)
          , M = p(0x14f63)
          , X = p(0x1078a)
          , m = 0x0
          , w = function(C) {
            function N(U, T, V, G, k, W, I, L, q, K) {
                var Y;
                return void 0x0 === U && (U = N['DEFAULT_IMAGE']),
                void 0x0 === T && (T = N['DEFAULT_MAPPING']),
                void 0x0 === V && (V = y['ghU']),
                void 0x0 === G && (G = y['ghU']),
                void 0x0 === k && (k = y['k6q']),
                void 0x0 === W && (W = y['$_I']),
                void 0x0 === I && (I = y['GWd']),
                void 0x0 === L && (L = y['OUM']),
                void 0x0 === q && (q = N['DEFAULT_ANISOTROPY']),
                void 0x0 === K && (K = y['jf0']),
                (Y = C['call'](this) || this)['isTexture'] = !0x0,
                Object['defineProperty'](Y, 'id', {
                    'value': m++
                }),
                Y['uuid'] = P['lk'](),
                Y['name'] = '',
                Y['source'] = new M['k'](U),
                Y['mipmaps'] = [],
                Y['mapping'] = T,
                Y['channel'] = 0x0,
                Y['wrapS'] = V,
                Y['wrapT'] = G,
                Y['magFilter'] = k,
                Y['minFilter'] = W,
                Y['anisotropy'] = q,
                Y['format'] = I,
                Y['internalFormat'] = null,
                Y['type'] = L,
                Y['offset'] = new Q['I'](0x0,0x0),
                Y['repeat'] = new Q['I'](0x1,0x1),
                Y['center'] = new Q['I'](0x0,0x0),
                Y['rotation'] = 0x0,
                Y['matrixAutoUpdate'] = !0x0,
                Y['matrix'] = new B['d'](),
                Y['generateMipmaps'] = !0x0,
                Y['premultiplyAlpha'] = !0x1,
                Y['flipY'] = !0x0,
                Y['unpackAlignment'] = 0x4,
                'string' == typeof K ? Y['colorSpace'] = K : ((0x0,
                X['mc'])('THREE.Texture:\x20Property\x20.encoding\x20has\x20been\x20replaced\x20by\x20.colorSpace.'),
                Y['colorSpace'] = K === y['S2Q'] ? y['er$'] : y['jf0']),
                Y['userData'] = {},
                Y['version'] = 0x0,
                Y['onUpdate'] = null,
                Y['isRenderTargetTexture'] = !0x1,
                Y['needsPMREMUpdate'] = !0x1,
                Y;
            }
            (0x0,
            R['A'])(N, C);
            var Z = N['prototype'];
            return Z['updateMatrix'] = function() {
                this['matrix']['setUvTransform'](this['offset']['x'], this['offset']['y'], this['repeat']['x'], this['repeat']['y'], this['rotation'], this['center']['x'], this['center']['y']);
            }
            ,
            Z['clone'] = function() {
                return new this['constructor']()['copy'](this);
            }
            ,
            Z['copy'] = function(U) {
                return this['name'] = U['name'],
                this['source'] = U['source'],
                this['mipmaps'] = U['mipmaps']['slice'](0x0),
                this['mapping'] = U['mapping'],
                this['channel'] = U['channel'],
                this['wrapS'] = U['wrapS'],
                this['wrapT'] = U['wrapT'],
                this['magFilter'] = U['magFilter'],
                this['minFilter'] = U['minFilter'],
                this['anisotropy'] = U['anisotropy'],
                this['format'] = U['format'],
                this['internalFormat'] = U['internalFormat'],
                this['type'] = U['type'],
                this['offset']['copy'](U['offset']),
                this['repeat']['copy'](U['repeat']),
                this['center']['copy'](U['center']),
                this['rotation'] = U['rotation'],
                this['matrixAutoUpdate'] = U['matrixAutoUpdate'],
                this['matrix']['copy'](U['matrix']),
                this['generateMipmaps'] = U['generateMipmaps'],
                this['premultiplyAlpha'] = U['premultiplyAlpha'],
                this['flipY'] = U['flipY'],
                this['unpackAlignment'] = U['unpackAlignment'],
                this['colorSpace'] = U['colorSpace'],
                this['userData'] = JSON['parse'](JSON['stringify'](U['userData'])),
                this['needsUpdate'] = !0x0,
                this;
            }
            ,
            Z['toJSON'] = function(U) {
                var T = void 0x0 === U || 'string' == typeof U;
                if (!T && void 0x0 !== U['textures'][this['uuid']])
                    return U['textures'][this['uuid']];
                var V = {
                    'metadata': {
                        'version': 4.6,
                        'type': 'Texture',
                        'generator': 'Texture.toJSON'
                    },
                    'uuid': this['uuid'],
                    'name': this['name'],
                    'image': this['source']['toJSON'](U)['uuid'],
                    'mapping': this['mapping'],
                    'channel': this['channel'],
                    'repeat': [this['repeat']['x'], this['repeat']['y']],
                    'offset': [this['offset']['x'], this['offset']['y']],
                    'center': [this['center']['x'], this['center']['y']],
                    'rotation': this['rotation'],
                    'wrap': [this['wrapS'], this['wrapT']],
                    'format': this['format'],
                    'internalFormat': this['internalFormat'],
                    'type': this['type'],
                    'colorSpace': this['colorSpace'],
                    'minFilter': this['minFilter'],
                    'magFilter': this['magFilter'],
                    'anisotropy': this['anisotropy'],
                    'flipY': this['flipY'],
                    'generateMipmaps': this['generateMipmaps'],
                    'premultiplyAlpha': this['premultiplyAlpha'],
                    'unpackAlignment': this['unpackAlignment']
                };
                return Object['keys'](this['userData'])['length'] > 0x0 && (V['userData'] = this['userData']),
                T || (U['textures'][this['uuid']] = V),
                V;
            }
            ,
            Z['dispose'] = function() {
                this['dispatchEvent']({
                    'type': 'dispose'
                });
            }
            ,
            Z['transformUv'] = function(U) {
                if (this['mapping'] !== y['UTZ'])
                    return U;
                if (U['applyMatrix3'](this['matrix']),
                U['x'] < 0x0 || U['x'] > 0x1)
                    switch (this['wrapS']) {
                    case y['GJx']:
                        U['x'] = U['x'] - Math['floor'](U['x']);
                        break;
                    case y['ghU']:
                        U['x'] = U['x'] < 0x0 ? 0x0 : 0x1;
                        break;
                    case y['kTW']:
                        0x1 === Math['abs'](Math['floor'](U['x']) % 0x2) ? U['x'] = Math['ceil'](U['x']) - U['x'] : U['x'] = U['x'] - Math['floor'](U['x']);
                    }
                if (U['y'] < 0x0 || U['y'] > 0x1)
                    switch (this['wrapT']) {
                    case y['GJx']:
                        U['y'] = U['y'] - Math['floor'](U['y']);
                        break;
                    case y['ghU']:
                        U['y'] = U['y'] < 0x0 ? 0x0 : 0x1;
                        break;
                    case y['kTW']:
                        0x1 === Math['abs'](Math['floor'](U['y']) % 0x2) ? U['y'] = Math['ceil'](U['y']) - U['y'] : U['y'] = U['y'] - Math['floor'](U['y']);
                    }
                return this['flipY'] && (U['y'] = 0x1 - U['y']),
                U;
            }
            ,
            (0x0,
            S['A'])(N, [{
                'key': 'image',
                'get': function() {
                    return this['source']['data'];
                },
                'set': function(U) {
                    void 0x0 === U && (U = null),
                    this['source']['data'] = U;
                }
            }, {
                'key': 'needsUpdate',
                'set': function(U) {
                    !0x0 === U && (this['version']++,
                    this['source']['needsUpdate'] = !0x0);
                }
            }, {
                'key': 'encoding',
                'get': function() {
                    return (0x0,
                    X['mc'])('THREE.Texture:\x20Property\x20.encoding\x20has\x20been\x20replaced\x20by\x20.colorSpace.'),
                    this['colorSpace'] === y['er$'] ? y['S2Q'] : y['tgE'];
                },
                'set': function(U) {
                    (0x0,
                    X['mc'])('THREE.Texture:\x20Property\x20.encoding\x20has\x20been\x20replaced\x20by\x20.colorSpace.'),
                    this['colorSpace'] = U === y['S2Q'] ? y['er$'] : y['jf0'];
                }
            }]);
        }(H['Q']);
        w['DEFAULT_IMAGE'] = null,
        w['DEFAULT_MAPPING'] = y['UTZ'],
        w['DEFAULT_ANISOTROPY'] = 0x1;
    }
    ,
    0x14b20: (r, F, E) => {
        E(0x172d2),
        E(0x17417);
    }
    ,
    0x1078a: (F, E, p) => {
        function S(P) {
            for (var Q = P['length'] - 0x1; Q >= 0x0; --Q)
                if (P[Q] >= 0xffff)
                    return !0x0;
            return !0x1;
        }
        p['d'](E, {
            'AQ': () => S,
            'lP': () => H,
            'mc': () => d,
            'qq': () => R
        }),
        (Int8Array,
        Uint8Array,
        Uint8ClampedArray,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array);
        function R(P) {
            return document['createElementNS']('http://www.w3.org/1999/xhtml', P);
        }
        function H() {
            var P = R('canvas');
            return P['style']['display'] = 'block',
            P;
        }
        var y = {};
        function d(P) {
            P in y || (y[P] = !0x0,
            console['warn'](P));
        }
    }
    ,
    0xc666: (r, F, E) => {
        r['exports'] = E['p'] + './package/4e8a512dac54131cbbb0.mp3';
    }
    ,
    0x50ef: (r, F, E) => {
        r['exports'] = E['p'] + './package/e99db4e6bd7fded791f1.mp3';
    }
    ,
    0xbc1c: (r, F, E) => {
        r['exports'] = E['p'] + './package/016928c19d30a9dde3a6.mp3';
    }
    ,
    0x4494: (r, F, E) => {
        r['exports'] = E['p'] + './package/0fd18333acc39a73982f.mp3';
    }
    ,
    0xdd70: (r, F, E) => {
        r['exports'] = E['p'] + './package/15afd22e3d194ea0c5f7.mp3';
    }
    ,
    0x14533: (r, F, E) => {
        r['exports'] = E['p'] + './package/8ec6c3e6c72d5148e959.mp3';
    }
    ,
    0x5507: (r, F, E) => {
        r['exports'] = E['p'] + './package/f78d568edd5221a37143.mp3';
    }
    ,
    0x32d6: (r, F, E) => {
        r['exports'] = E['p'] + './package/90b785ff2bbb6bbecc2a.mp3';
    }
    ,
    0x5bef: (r, F, E) => {
        r['exports'] = E['p'] + './package/ca16954f9bc0f316ffe6.mp3';
    }
    ,
    0x5e66: (r, F, E) => {
        r['exports'] = E['p'] + './package/7b17069332b4fbae3d28.mp3';
    }
    ,
    0x8cc4: (r, F, E) => {
        r['exports'] = E['p'] + './package/55dd09a3c49862787ac4.mp3';
    }
    ,
    0x11d1d: (r, F, E) => {
        r['exports'] = E['p'] + './package/c1d3e7c4459035af5314.mp3';
    }
    ,
    0x3fa2: (r, F, E) => {
        r['exports'] = E['p'] + './package/6936d0ccb9221c0c2587.mp3';
    }
    ,
    0x654e: (r, F, E) => {
        r['exports'] = E['p'] + './package/e3801eeb9f86871a55e4.mp3';
    }
    ,
    0xe6b1: (r, F, E) => {
        r['exports'] = E['p'] + './package/c6849ece22e0c631c268.mp3';
    }
    ,
    0xb663: (r, F, E) => {
        r['exports'] = E['p'] + './package/d6af5d6ce8d311baac43.mp3';
    }
    ,
    0x5ba: (r, F, E) => {
        r['exports'] = E['p'] + './package/63f3170f6a15f93e68a6.mp3';
    }
    ,
    0x16a51: (r, F, E) => {
        r['exports'] = E['p'] + './package/d0900792af4d2c6b0f7c.mp3';
    }
    ,
    0x26d3: (r, F, E) => {
        r['exports'] = E['p'] + './package/ddc8fe9b5b340fc5a625.mp3';
    }
    ,
    0x5fcb: (r, F, E) => {
        r['exports'] = E['p'] + './package/10684a207ae51686ff13.mp3';
    }
    ,
    0x3d98: (r, F, E) => {
        r['exports'] = E['p'] + './package/ce7c96647d550134575b.mp3';
    }
    ,
    0xbef9: (r, F, E) => {
        r['exports'] = E['p'] + './package/1a5af91d3d79b17ce75b.mp3';
    }
    ,
    0x9c12: (r, F, E) => {
        r['exports'] = E['p'] + './package/232dc3550c9600ba219c.mp3';
    }
    ,
    0x71cc: (r, F, E) => {
        r['exports'] = E['p'] + './package/9132a20e76c3e3d5e5ed.mp3';
    }
}]);
