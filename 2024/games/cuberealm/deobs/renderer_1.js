
/*
the 3rd parameter of all of the functions is probably an export function

i think its defined in imports.js
*/

'use strict';
(self.webpackChunkcuberealm_client = self.webpackChunkcuberealm_client || []).push([[0x12d], {
    0xbd44: (r, F, E) => {
        E(0x7530),
        E(0xbd95);
    }
    ,
    0xe70: (F, E, p) => {
        p.d(E, {
            'U': () => Q
        });
        var S = p(0x172d2)
          , R = p(0x3696)
          , H = p(0x17b5d)
          , y = p(0x12e4b)
          , d = function(B) {
            function M(X, m, w, C) {
                return B.call(this, X, m, w, C) || this;
            }
            return (0,
            y.A)(M, B),
            M.prototype.interpolate_ = function(X) {
                return this.copySampleValue_(X - 1);
            }
            ,
            M;
        }(p(0x28f4).l)
          , P = p(0x11c87)
          , Q = (function() {
            function B(X, m, w, C) {
                if (undefined === X)
                    throw new Error('THREE.KeyframeTrack: track name is undefined');
                if (undefined === m || 0 === m.length)
                    throw new Error('THREE.KeyframeTrack: no keyframes in track named ' + X);
                this.name = X,
                this.times = P.r1(m, this.TimeBufferType),
                this.values = P.r1(w, this.ValueBufferType),
                this.setInterpolation(C || this.DefaultInterpolation);
            }
            B.toJSON = function(X) {
                var m, w = X.constructor;
                if (w.toJSON !== this.toJSON)
                    m = w.toJSON(X);
                else {
                    m = {
                        'name': X.name,
                        'times': P.r1(X.times, Array),
                        'values': P.r1(X.values, Array)
                    };
                    var C = X.getInterpolation();
                    C !== X.DefaultInterpolation && (m.interpolation = C);
                }
                return m.type = X.ValueTypeName,
                m;
            }
            ;
            var M = B.prototype;
            return M.InterpolantFactoryMethodDiscrete = function(X) {
                return new d(this.times,this.values,this.getValueSize(),X);
            }
            ,
            M.InterpolantFactoryMethodLinear = function(X) {
                return new H.e(this.times,this.values,this.getValueSize(),X);
            }
            ,
            M.InterpolantFactoryMethodSmooth = function(X) {
                return new R.P(this.times,this.values,this.getValueSize(),X);
            }
            ,
            M.setInterpolation = function(X) {
                var m;
                switch (X) {
                case S.ljd:
                    m = this.InterpolantFactoryMethodDiscrete;
                    break;
                case S.PJ3:
                    m = this.InterpolantFactoryMethodLinear;
                    break;
                case S.EQC:
                    m = this.InterpolantFactoryMethodSmooth;
                }
                if (undefined === m) {
                    var w = 'unsupported interpolation for ' + this.ValueTypeName + ' keyframe track named ' + this.name;
                    if (undefined === this.createInterpolant) {
                        if (X === this.DefaultInterpolation)
                            throw new Error(w);
                        this.setInterpolation(this.DefaultInterpolation);
                    }
                    return console.warn('THREE.KeyframeTrack:', w),
                    this;
                }
                return this.createInterpolant = m,
                this;
            }
            ,
            M.getInterpolation = function() {
                switch (this.createInterpolant) {
                case this.InterpolantFactoryMethodDiscrete:
                    return S.ljd;
                case this.InterpolantFactoryMethodLinear:
                    return S.PJ3;
                case this.InterpolantFactoryMethodSmooth:
                    return S.EQC;
                }
            }
            ,
            M.getValueSize = function() {
                return this.values.length / this.times.length;
            }
            ,
            M.shift = function(X) {
                if (0 !== X) {
                    for (var m = this.times, w = 0, C = m.length; w !== C; ++w)
                        m[w] += X;
                }
                return this;
            }
            ,
            M.scale = function(X) {
                if (1 !== X) {
                    for (var m = this.times, w = 0, C = m.length; w !== C; ++w)
                        m[w] *= X;
                }
                return this;
            }
            ,
            M.trim = function(X, m) {
                for (var w = this.times, C = w.length, N = 0, Z = C - 1; N !== C && w[N] < X; )
                    ++N;
                for (; -1 !== Z && w[Z] > m; )
                    --Z;
                if (++Z,
                0 !== N || Z !== C) {
                    N >= Z && (N = (Z = Math.max(Z, 1)) - 1);
                    var h = this.getValueSize();
                    this.times = w.slice(N, Z),
                    this.values = this.values.slice(N * h, Z * h);
                }
                return this;
            }
            ,
            M.validate = function() {
                var X = true
                  , m = this.getValueSize();
                m - Math.floor(m) != 0 && (console.error('THREE.KeyframeTrack: Invalid value size in track.', this),
                X = false);
                var w = this.times
                  , C = this.values
                  , N = w.length;
                0 === N && (console.error('THREE.KeyframeTrack: Track is empty.', this),
                X = false);
                for (var Z = null, U = 0; U !== N; U++) {
                    var T = w[U];
                    if ('number' == typeof T && isNaN(T)) {
                        console.error('THREE.KeyframeTrack: Time is not a valid number.', this, U, T),
                        X = false;
                        break;
                    }
                    if (null !== Z && Z > T) {
                        console.error('THREE.KeyframeTrack: Out of order keys.', this, U, T, Z),
                        X = false;
                        break;
                    }
                    Z = T;
                }
                if (undefined !== C && P.iu(C))
                    for (var V = 0, G = C.length; V !== G; ++V) {
                        var k = C[V];
                        if (isNaN(k)) {
                            console.error('THREE.KeyframeTrack: Value is not a valid number.', this, V, k),
                            X = false;
                            break;
                        }
                    }
                return X;
            }
            ,
            M.optimize = function() {
                for (var X = this.times.slice(), w = this.values.slice(), C = this.getValueSize(), N = this.getInterpolation() === S.EQC, Z = X.length - 1, U = 1, T = 1; T < Z; ++T) {
                    var V = false
                      , G = X[T];
                    if (G !== X[T + 1] && (1 !== T || G !== X[0])) {
                        if (N)
                            V = true;
                        else
                            for (var k = T * C, W = k - C, I = k + C, L = 0; L !== C; ++L) {
                                var q = w[k + L];
                                if (q !== w[W + L] || q !== w[I + L]) {
                                    V = true;
                                    break;
                                }
                            }
                    }
                    if (V) {
                        if (T !== U) {
                            X[U] = X[T];
                            for (var K = T * C, Y = U * C, z = 0; z !== C; ++z)
                                w[Y + z] = w[K + z];
                        }
                        ++U;
                    }
                }
                if (Z > 0) {
                    X[U] = X[Z];
                    for (var A = Z * C, j = U * C, O = 0; O !== C; ++O)
                        w[j + O] = w[A + O];
                    ++U;
                }
                return U !== X.length ? (this.times = X.slice(0, U),
                this.values = w.slice(0, U * C)) : (this.times = X,
                this.values = w),
                this;
            }
            ,
            M.clone = function() {
                var X = this.times.slice()
                  , m = this.values.slice()
                  , w = new (0,
                this.constructor)(this.name,X,m);
                return w.createInterpolant = this.createInterpolant,
                w;
            }
            ,
            B;
        }());
        Q.prototype.TimeBufferType = Float32Array,
        Q.prototype.ValueBufferType = Float32Array,
        Q.prototype.DefaultInterpolation = S.PJ3;
    }
    ,
    0x152de: (F, E, p) => {
        p.d(E, {
            'n': () => R
        });
        var S = p(0x12e4b)
          , R = function(H) {
            function y(d) {
                var P;
                return undefined === d && (d = []),
                (P = H.call(this) || this).isArrayCamera = true,
                P.cameras = d,
                P;
            }
            return (0,
            S.A)(y, H),
            y;
        }(p(0x152d9).u);
    },
    0xab79: (F, E, p) => {
        /** @type {new () => camera_controller}; camera class? (see below) after it has been attached to whatever p(0x16f53).B is */
        var y;
        p.d(E, {
            i: () => y
        });
        var S = p(0x12e4b);
        var R = p(0x172d2);
        var H = p(0x11ded);
        // TODO
        y =
        /**
          * camera constroller factory?
          * @param {() => camera_controller_proxy?} d its the parent type of the camera controller; return value is treated as the camera controller for some reason???
        **/
        function(d) {
            /** camera class? or something related to it; maybe it's a camera controller */
            const P = function() {
                var B = d.call(this) || this;
                B.isCamera = true;
                B.type = 'Camera';
                B.matrixWorldInverse = new H.k();
                B.projectionMatrix = new H.k();
                B.projectionMatrixInverse = new H.k();
                B.coordinateSystem = R.TdN;
                return B;
            };
            P.prototype.copy = function(B, M) {
                return d.prototype.copy.call(this, B, M),
                    this.matrixWorldInverse.copy(B.matrixWorldInverse),
                    this.projectionMatrix.copy(B.projectionMatrix),
                    this.projectionMatrixInverse.copy(B.projectionMatrixInverse),
                    this.coordinateSystem = B.coordinateSystem,
                    this;
            };
            P.prototype.getWorldDirection = function(B) {
                return d.prototype.getWorldDirection.call(this, B).negate();
            };
            P.prototype.updateMatrixWorld = function(B) {
                d.prototype.updateMatrixWorld.call(this, B),
                    this.matrixWorldInverse.copy(this.matrixWorld).invert();
            };
            P.prototype.updateWorldMatrix = function(B, M) {
                d.prototype.updateWorldMatrix.call(this, B, M),
                    this.matrixWorldInverse.copy(this.matrixWorld).invert();
            };
            P.prototype.clone = function() {
                return new this.constructor().copy(this);
            };
            S.A(P, d);
            return P;
        }(p(0x16f53).B);
    },
    0x306c: (F, E, p) => {
        p.d(E, {
            'F': () => B
        });
        var S = p(0x12e4b)
          , R = p(0x172d2)
          , H = p(0x16f53)
          , y = p(0x152d9);
        function d(M, X) {
            var m = 'undefined' != typeof Symbol && M[Symbol.iterator] || M['@@iterator'];
            if (m)
                return (m = m.call(M)).next.bind(m);
            if (Array.isArray(M) || (m = function(C, N) {
                if (!C)
                    return;
                if ('string' == typeof C)
                    return P(C, N);
                var Z = Object.prototype.toString.call(C).slice(8, -1);
                'Object' === Z && C.constructor && (Z = C.constructor.name);
                if ('Map' === Z || 'Set' === Z)
                    return Array.from(C);
                if ('Arguments' === Z || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(Z))
                    return P(C, N);
            }(M)) || X && M && 'number' == typeof M.length) {
                m && (M = m);
                var w = 0;
                return function() {
                    return w >= M.length ? {
                        'done': true
                    } : {
                        'done': false,
                        'value': M[w++]
                    };
                }
                ;
            }
            throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
        }
        function P(M, X) {
            (null == X || X > M.length) && (X = M.length);
            for (var m = 0, w = new Array(X); m < X; m++)
                w[m] = M[m];
            return w;
        }
        var Q = -0x5a
          , B = function(M) {
            function X(w, C, N) {
                var Z;
                (Z = M.call(this) || this).type = 'CubeCamera',
                Z.renderTarget = N,
                Z.coordinateSystem = null,
                Z.activeMipmapLevel = 0;
                var U = new y.u(Q,1,w,C);
                U.layers = Z.layers,
                Z.add(U);
                var T = new y.u(Q,1,w,C);
                T.layers = Z.layers,
                Z.add(T);
                var V = new y.u(Q,1,w,C);
                V.layers = Z.layers,
                Z.add(V);
                var G = new y.u(Q,1,w,C);
                G.layers = Z.layers,
                Z.add(G);
                var k = new y.u(Q,1,w,C);
                k.layers = Z.layers,
                Z.add(k);
                var W = new y.u(Q,1,w,C);
                return W.layers = Z.layers,
                Z.add(W),
                Z;
            }
            (0,
            S.A)(X, M);
            var m = X.prototype;
            return m.updateCoordinateSystem = function() {
                for (var w, C = this.coordinateSystem, N = this.children.concat(), Z = N[0], U = N[1], T = N[2], V = N[3], G = N[4], k = N[5], W = d(N); !(w = W()).done; ) {
                    var x = w.value;
                    this.remove(x);
                }
                if (C === R.TdN)
                    Z.up.set(0, 1, 0),
                    Z.lookAt(1, 0, 0),
                    U.up.set(0, 1, 0),
                    U.lookAt(-1, 0, 0),
                    T.up.set(0, 0, -1),
                    T.lookAt(0, 1, 0),
                    V.up.set(0, 0, 1),
                    V.lookAt(0, -1, 0),
                    G.up.set(0, 1, 0),
                    G.lookAt(0, 0, 1),
                    k.up.set(0, 1, 0),
                    k.lookAt(0, 0, -1);
                else {
                    if (C !== R.i7u)
                        throw new Error('THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: ' + C);
                    Z.up.set(0, -1, 0),
                    Z.lookAt(-1, 0, 0),
                    U.up.set(0, -1, 0),
                    U.lookAt(1, 0, 0),
                    T.up.set(0, 0, 1),
                    T.lookAt(0, 1, 0),
                    V.up.set(0, 0, -1),
                    V.lookAt(0, -1, 0),
                    G.up.set(0, -1, 0),
                    G.lookAt(0, 0, 1),
                    k.up.set(0, -1, 0),
                    k.lookAt(0, 0, -1);
                }
                for (var I, g = d(N); !(I = g()).done; ) {
                    var L = I.value;
                    this.add(L),
                    L.updateMatrixWorld();
                }
            }
            ,
            m.update = function(w, C) {
                null === this.parent && this.updateMatrixWorld();
                var N = this.renderTarget
                  , Z = this.activeMipmapLevel;
                this.coordinateSystem !== w.coordinateSystem && (this.coordinateSystem = w.coordinateSystem,
                this.updateCoordinateSystem());
                var U = this.children
                  , T = U[0]
                  , V = U[1]
                  , G = U[2]
                  , k = U[3]
                  , W = U[4]
                  , x = U[5]
                  , I = w.getRenderTarget()
                  , g = w.getActiveCubeFace()
                  , L = w.getActiveMipmapLevel()
                  , q = w.xr.enabled;
                w.xr.enabled = false;
                var K = N.texture.generateMipmaps;
                N.texture.generateMipmaps = false,
                w.setRenderTarget(N, 0, Z),
                w.render(C, T),
                w.setRenderTarget(N, 1, Z),
                w.render(C, V),
                w.setRenderTarget(N, 2, Z),
                w.render(C, G),
                w.setRenderTarget(N, 3, Z),
                w.render(C, k),
                w.setRenderTarget(N, 4, Z),
                w.render(C, W),
                N.texture.generateMipmaps = K,
                w.setRenderTarget(N, 5, Z),
                w.render(C, x),
                w.setRenderTarget(I, g, L),
                w.xr.enabled = q,
                N.texture.needsPMREMUpdate = true;
            }
            ,
            X;
        }(H.B);
    },
    0x17743: (F, E, p) => {
        p.d(E, {
            'q': () => R
        });
        var S = p(0x12e4b)
          , R = function(H) {
            function y(P, Q, B, M, X, m) {
                var w;
                return undefined === P && (P = -1),
                undefined === Q && (Q = 1),
                undefined === B && (B = 1),
                undefined === M && (M = -1),
                undefined === X && (X = 0.1),
                undefined === m && (m = 0x7d0),
                (w = H.call(this) || this).isOrthographicCamera = true,
                w.type = 'OrthographicCamera',
                w.zoom = 1,
                w.view = null,
                w.left = P,
                w.right = Q,
                w.top = B,
                w.bottom = M,
                w.near = X,
                w.far = m,
                w.updateProjectionMatrix(),
                w;
            }
            (0,
            S.A)(y, H);
            var d = y.prototype;
            return d.copy = function(P, Q) {
                return H.prototype.copy.call(this, P, Q),
                this.left = P.left,
                this.right = P.right,
                this.top = P.top,
                this.bottom = P.bottom,
                this.near = P.near,
                this.far = P.far,
                this.zoom = P.zoom,
                this.view = null === P.view ? null : Object.assign({}, P.view),
                this;
            }
            ,
            d.setViewOffset = function(P, Q, B, M, X, m) {
                null === this.view && (this.view = {
                    'enabled': true,
                    'fullWidth': 1,
                    'fullHeight': 1,
                    'offsetX': 0,
                    'offsetY': 0,
                    'width': 1,
                    'height': 1
                }),
                this.view.enabled = true,
                this.view.fullWidth = P,
                this.view.fullHeight = Q,
                this.view.offsetX = B,
                this.view.offsetY = M,
                this.view.width = X,
                this.view.height = m,
                this.updateProjectionMatrix();
            }
            ,
            d.clearViewOffset = function() {
                null !== this.view && (this.view.enabled = false),
                this.updateProjectionMatrix();
            }
            ,
            d.updateProjectionMatrix = function() {
                var P = (this.right - this.left) / (2 * this.zoom)
                  , Q = (this.top - this.bottom) / (2 * this.zoom)
                  , B = (this.right + this.left) / 2
                  , M = (this.top + this.bottom) / 2
                  , X = B - P
                  , m = B + P
                  , w = M + Q
                  , C = M - Q;
                if (null !== this.view && this.view.enabled) {
                    var N = (this.right - this.left) / this.view.fullWidth / this.zoom
                      , Z = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
                    m = (X += N * this.view.offsetX) + N * this.view.width,
                    C = (w -= Z * this.view.offsetY) - Z * this.view.height;
                }
                this.projectionMatrix.makeOrthographic(X, m, w, C, this.near, this.far, this.coordinateSystem),
                this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
            }
            ,
            d.toJSON = function(P) {
                var Q = H.prototype.toJSON.call(this, P);
                return Q.object.zoom = this.zoom,
                Q.object.left = this.left,
                Q.object.right = this.right,
                Q.object.top = this.top,
                Q.object.bottom = this.bottom,
                Q.object.near = this.near,
                Q.object.far = this.far,
                null !== this.view && (Q.object.view = Object.assign({}, this.view)),
                Q;
            }
            ,
            y;
        }(p(0xab79).i);
    },
    0x152d9: (F, E, p) => {
        p.d(E, {
            'u': () => y
        });
        var S = p(0x12e4b)
          , R = p(0xab79)
          , H = p(0xbd95)
          , y = function(d) {
            function P(B, M, X, m) {
                var w;
                return undefined === B && (B = 0x32),
                undefined === M && (M = 1),
                undefined === X && (X = 0.1),
                undefined === m && (m = 0x7d0),
                (w = d.call(this) || this).isPerspectiveCamera = true,
                w.type = 'PerspectiveCamera',
                w.fov = B,
                w.zoom = 1,
                w.near = X,
                w.far = m,
                w.focus = 10,
                w.aspect = M,
                w.view = null,
                w.filmGauge = 0x23,
                w.filmOffset = 0,
                w.updateProjectionMatrix(),
                w;
            }
            (0,
            S.A)(P, d);
            var Q = P.prototype;
            return Q.copy = function(B, M) {
                return d.prototype.copy.call(this, B, M),
                this.fov = B.fov,
                this.zoom = B.zoom,
                this.near = B.near,
                this.far = B.far,
                this.focus = B.focus,
                this.aspect = B.aspect,
                this.view = null === B.view ? null : Object.assign({}, B.view),
                this.filmGauge = B.filmGauge,
                this.filmOffset = B.filmOffset,
                this;
            }
            ,
            Q.setFocalLength = function(B) {
                var M = 0.5 * this.getFilmHeight() / B;
                this.fov = 2 * H.a5 * Math.atan(M),
                this.updateProjectionMatrix();
            }
            ,
            Q.getFocalLength = function() {
                var B = Math.tan(0.5 * H.up * this.fov);
                return 0.5 * this.getFilmHeight() / B;
            }
            ,
            Q.getEffectiveFOV = function() {
                return 2 * H.a5 * Math.atan(Math.tan(0.5 * H.up * this.fov) / this.zoom);
            }
            ,
            Q.getFilmWidth = function() {
                return this.filmGauge * Math.min(this.aspect, 1);
            }
            ,
            Q.getFilmHeight = function() {
                return this.filmGauge / Math.max(this.aspect, 1);
            }
            ,
            Q.setViewOffset = function(B, M, X, m, w, l) {
                this.aspect = B / M,
                null === this.view && (this.view = {
                    'enabled': true,
                    'fullWidth': 1,
                    'fullHeight': 1,
                    'offsetX': 0,
                    'offsetY': 0,
                    'width': 1,
                    'height': 1
                }),
                this.view.enabled = true,
                this.view.fullWidth = B,
                this.view.fullHeight = M,
                this.view.offsetX = X,
                this.view.offsetY = m,
                this.view.width = w,
                this.view.height = l,
                this.updateProjectionMatrix();
            }
            ,
            Q.clearViewOffset = function() {
                null !== this.view && (this.view.enabled = false),
                this.updateProjectionMatrix();
            }
            ,
            Q.updateProjectionMatrix = function() {
                var B = this.near
                  , M = B * Math.tan(0.5 * H.up * this.fov) / this.zoom
                  , X = 2 * M
                  , m = this.aspect * X
                  , w = -0.5 * m
                  , C = this.view;
                if (null !== this.view && this.view.enabled) {
                    var N = C.fullWidth
                      , Z = C.fullHeight;
                    w += C.offsetX * m / N,
                    M -= C.offsetY * X / Z,
                    m *= C.width / N,
                    X *= C.height / Z;
                }
                var h = this.filmOffset;
                0 !== h && (w += B * h / this.getFilmWidth()),
                this.projectionMatrix.makePerspective(w, w + m, M, M - X, B, this.far, this.coordinateSystem),
                this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
            }
            ,
            Q.toJSON = function(B) {
                var M = d.prototype.toJSON.call(this, B);
                return M.object.fov = this.fov,
                M.object.zoom = this.zoom,
                M.object.near = this.near,
                M.object.far = this.far,
                M.object.focus = this.focus,
                M.object.aspect = this.aspect,
                null !== this.view && (M.object.view = Object.assign({}, this.view)),
                M.object.filmGauge = this.filmGauge,
                M.object.filmOffset = this.filmOffset,
                M;
            }
            ,
            P;
        }(R.i);
    },
    0x20d1: (r, F, E) => {
        E(0x11ded),
        E(0xbd95),
        E(0x152d9);
    },
    0x16835: (F, E, R) => {
        R.d(E, {
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
          , G = 0
          , k = new Z.k()
          , W = new N.B()
          , I = new P.P()
          , L = new B.N()
          , q = new B.N()
          , K = new P.P()
          , Y = function(z) {
            function A() {
                var O;
                return (O = z.call(this) || this).isBufferGeometry = true,
                Object.defineProperty(O, 'id', {
                    'value': G++
                }),
                O.uuid = T.lk(),
                O.name = '',
                O.type = 'BufferGeometry',
                O.index = null,
                O.attributes = {},
                O.morphAttributes = {},
                O.morphTargetsRelative = false,
                O.groups = [],
                O.boundingBox = null,
                O.boundingSphere = null,
                O.drawRange = {
                    'start': 0,
                    'count': 1 / 0
                },
                O.userData = {},
                O;
            }
            (0,
            H.A)(A, z);
            var j = A.prototype;
            return j.getIndex = function() {
                return this.index;
            }
            ,
            j.setIndex = function(O) {
                return Array.isArray(O) ? this.index = new (((0,
                V.AQ)(O)) ? w.MW : w['A$'])(O,1) : this.index = O,
                this;
            }
            ,
            j.getAttribute = function(O) {
                return this.attributes[O];
            }
            ,
            j.setAttribute = function(O, J) {
                return this.attributes[O] = J,
                this;
            }
            ,
            j.deleteAttribute = function(O) {
                return delete this.attributes[O],
                this;
            }
            ,
            j.hasAttribute = function(O) {
                return undefined !== this.attributes[O];
            }
            ,
            j.addGroup = function(O, J, b) {
                undefined === b && (b = 0),
                this.groups.push({
                    'start': O,
                    'count': J,
                    'materialIndex': b
                });
            }
            ,
            j.clearGroups = function() {
                this.groups = [];
            }
            ,
            j.setDrawRange = function(O, J) {
                this.drawRange.start = O,
                this.drawRange.count = J;
            }
            ,
            j.applyMatrix4 = function(O) {
                var J = this.attributes.position;
                undefined !== J && (J.applyMatrix4(O),
                J.needsUpdate = true);
                var b = this.attributes.normal;
                if (undefined !== b) {
                    var D = new U.d().getNormalMatrix(O);
                    b.applyNormalMatrix(D),
                    b.needsUpdate = true;
                }
                var r0 = this.attributes.tangent;
                return undefined !== r0 && (r0.transformDirection(O),
                r0.needsUpdate = true),
                null !== this.boundingBox && this.computeBoundingBox(),
                null !== this.boundingSphere && this.computeBoundingSphere(),
                this;
            }
            ,
            j.applyQuaternion = function(O) {
                return k.makeRotationFromQuaternion(O),
                this.applyMatrix4(k),
                this;
            }
            ,
            j.rotateX = function(O) {
                return k.makeRotationX(O),
                this.applyMatrix4(k),
                this;
            }
            ,
            j.rotateY = function(O) {
                return k.makeRotationY(O),
                this.applyMatrix4(k),
                this;
            }
            ,
            j.rotateZ = function(O) {
                return k.makeRotationZ(O),
                this.applyMatrix4(k),
                this;
            }
            ,
            j.translate = function(O, J, b) {
                return k.makeTranslation(O, J, b),
                this.applyMatrix4(k),
                this;
            }
            ,
            j.scale = function(O, J, b) {
                return k.makeScale(O, J, b),
                this.applyMatrix4(k),
                this;
            }
            ,
            j.lookAt = function(O) {
                return W.lookAt(O),
                W.updateMatrix(),
                this.applyMatrix4(W.matrix),
                this;
            }
            ,
            j.center = function() {
                return this.computeBoundingBox(),
                this.boundingBox.getCenter(I).negate(),
                this.translate(I.x, I.y, I.z),
                this;
            }
            ,
            j.setFromPoints = function(O) {
                for (var J = [], b = 0, D = O.length; b < D; b++) {
                    var r0 = O[b];
                    J.push(r0.x, r0.y, r0.z || 0);
                }
                return this.setAttribute('position', new w.qt(J,3)),
                this;
            }
            ,
            j.computeBoundingBox = function() {
                null === this.boundingBox && (this.boundingBox = new B.N());
                var O = this.attributes.position
                  , J = this.morphAttributes.position;
                if (O && O.isGLBufferAttribute)
                    return console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set \x22mesh.frustumCulled\x22 to \x22false\x22.', this),
                    void this.boundingBox.set(new P.P(-1 / 0,-1 / 0,-1 / 0), new P.P(1 / 0,1 / 0,1 / 0));
                if (undefined !== O) {
                    if (this.boundingBox.setFromBufferAttribute(O),
                    J)
                        for (var b = 0, D = J.length; b < D; b++) {
                            var r0 = J[b];
                            L.setFromBufferAttribute(r0),
                            this.morphTargetsRelative ? (K.addVectors(this.boundingBox.min, L.min),
                            this.boundingBox.expandByPoint(K),
                            K.addVectors(this.boundingBox.max, L.max),
                            this.boundingBox.expandByPoint(K)) : (this.boundingBox.expandByPoint(L.min),
                            this.boundingBox.expandByPoint(L.max));
                        }
                } else
                    this.boundingBox.makeEmpty();
                (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The \x22position\x22 attribute is likely to have NaN values.', this);
            }
            ,
            j.computeBoundingSphere = function() {
                null === this.boundingSphere && (this.boundingSphere = new C.i());
                var O = this.attributes.position
                  , J = this.morphAttributes.position;
                if (O && O.isGLBufferAttribute)
                    return console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set \x22mesh.frustumCulled\x22 to \x22false\x22.', this),
                    void this.boundingSphere.set(new P.P(), 1 / 0);
                if (O) {
                    var b = this.boundingSphere.center;
                    if (L.setFromBufferAttribute(O),
                    J)
                        for (var D = 0, r0 = J.length; D < r0; D++) {
                            var r1 = J[D];
                            q.setFromBufferAttribute(r1),
                            this.morphTargetsRelative ? (K.addVectors(L.min, q.min),
                            L.expandByPoint(K),
                            K.addVectors(L.max, q.max),
                            L.expandByPoint(K)) : (L.expandByPoint(q.min),
                            L.expandByPoint(q.max));
                        }
                    L.getCenter(b);
                    for (var r2 = 0, r3 = 0, r4 = O.count; r3 < r4; r3++)
                        K.fromBufferAttribute(O, r3),
                        r2 = Math.max(r2, b.distanceToSquared(K));
                    if (J) {
                        for (var r5 = 0, r6 = J.length; r5 < r6; r5++)
                            for (var r7 = J[r5], r8 = this.morphTargetsRelative, r9 = 0, rr = r7.count; r9 < rr; r9++)
                                K.fromBufferAttribute(r7, r9),
                                r8 && (I.fromBufferAttribute(O, r9),
                                K.add(I)),
                                r2 = Math.max(r2, b.distanceToSquared(K));
                    }
                    this.boundingSphere.radius = Math.sqrt(r2),
                    isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The \x22position\x22 attribute is likely to have NaN values.', this);
                }
            }
            ,
            j.computeTangents = function() {
                var J = this.index
                  , r0 = this.attributes;
                if (null !== J && undefined !== r0.position && undefined !== r0.normal && undefined !== r0.uv) {
                    var r1 = J.array
                      , r2 = r0.position.array
                      , r3 = r0.normal.array
                      , r4 = r0.uv.array
                      , r5 = r2.length / 3;
                    false === this.hasAttribute('tangent') && this.setAttribute('tangent', new w.TH(new Float32Array(4 * r5),4));
                    for (var r6 = this.getAttribute('tangent').array, r7 = [], r8 = [], r9 = 0; r9 < r5; r9++)
                        r7[r9] = new P.P(),
                        r8[r9] = new P.P();
                    var rr = new P.P()
                      , rF = new P.P()
                      , rE = new P.P()
                      , rp = new Q.I()
                      , rS = new Q.I()
                      , re = new Q.I()
                      , rR = new P.P()
                      , rH = new P.P()
                      , ry = this.groups;
                    0 === ry.length && (ry = [{
                        'start': 0,
                        'count': r1.length
                    }]);
                    for (var rd = 0, rP = ry.length; rd < rP; ++rd)
                        for (var rQ = ry[rd], rB = rQ.start, rM = rB, rX = rB + rQ.count; rM < rX; rM += 3)
                            ri(r1[rM + 0], r1[rM + 1], r1[rM + 2]);
                    for (var rt = new P.P(), rm = new P.P(), rw = new P.P(), rl = new P.P(), rC = 0, rN = ry.length; rC < rN; ++rC)
                        for (var rZ = ry[rC], rh = rZ.start, ro = rh, rU = rh + rZ.count; ro < rU; ro += 3)
                            rT(r1[ro + 0]),
                            rT(r1[ro + 1]),
                            rT(r1[ro + 2]);
                } else
                    console.error('THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)');
                function ri(rV, rs, rG) {
                    rr.fromArray(r2, 3 * rV),
                    rF.fromArray(r2, 3 * rs),
                    rE.fromArray(r2, 3 * rG),
                    rp.fromArray(r4, 2 * rV),
                    rS.fromArray(r4, 2 * rs),
                    re.fromArray(r4, 2 * rG),
                    rF.sub(rr),
                    rE.sub(rr),
                    rS.sub(rp),
                    re.sub(rp);
                    var rk = 1 / (rS.x * re.y - re.x * rS.y);
                    isFinite(rk) && (rR.copy(rF).multiplyScalar(re.y).addScaledVector(rE, -rS.y).multiplyScalar(rk),
                    rH.copy(rE).multiplyScalar(rS.x).addScaledVector(rF, -re.x).multiplyScalar(rk),
                    r7[rV].add(rR),
                    r7[rs].add(rR),
                    r7[rG].add(rR),
                    r8[rV].add(rH),
                    r8[rs].add(rH),
                    r8[rG].add(rH));
                }
                function rT(rV) {
                    rw.fromArray(r3, 3 * rV),
                    rl.copy(rw);
                    var rs = r7[rV];
                    rt.copy(rs),
                    rt.sub(rw.multiplyScalar(rw.dot(rs))).normalize(),
                    rm.crossVectors(rl, rs);
                    var rG = rm.dot(r8[rV]) < 0 ? -1 : 1;
                    r6[4 * rV] = rt.x,
                    r6[4 * rV + 1] = rt.y,
                    r6[4 * rV + 2] = rt.z,
                    r6[4 * rV + 3] = rG;
                }
            }
            ,
            j.computeVertexNormals = function() {
                var O = this.index
                  , J = this.getAttribute('position');
                if (undefined !== J) {
                    var b = this.getAttribute('normal');
                    if (undefined === b)
                        b = new w.TH(new Float32Array(3 * J.count),3),
                        this.setAttribute('normal', b);
                    else {
                        for (var D = 0, r0 = b.count; D < r0; D++)
                            b.setXYZ(D, 0, 0, 0);
                    }
                    var r1 = new P.P()
                      , r2 = new P.P()
                      , r3 = new P.P()
                      , r4 = new P.P()
                      , r5 = new P.P()
                      , r6 = new P.P()
                      , r7 = new P.P()
                      , r8 = new P.P();
                    if (O)
                        for (var r9 = 0, rr = O.count; r9 < rr; r9 += 3) {
                            var rF = O.getX(r9 + 0)
                              , rE = O.getX(r9 + 1)
                              , rp = O.getX(r9 + 2);
                            r1.fromBufferAttribute(J, rF),
                            r2.fromBufferAttribute(J, rE),
                            r3.fromBufferAttribute(J, rp),
                            r7.subVectors(r3, r2),
                            r8.subVectors(r1, r2),
                            r7.cross(r8),
                            r4.fromBufferAttribute(b, rF),
                            r5.fromBufferAttribute(b, rE),
                            r6.fromBufferAttribute(b, rp),
                            r4.add(r7),
                            r5.add(r7),
                            r6.add(r7),
                            b.setXYZ(rF, r4.x, r4.y, r4.z),
                            b.setXYZ(rE, r5.x, r5.y, r5.z),
                            b.setXYZ(rp, r6.x, r6.y, r6.z);
                        }
                    else {
                        for (var rS = 0, re = J.count; rS < re; rS += 3)
                            r1.fromBufferAttribute(J, rS + 0),
                            r2.fromBufferAttribute(J, rS + 1),
                            r3.fromBufferAttribute(J, rS + 2),
                            r7.subVectors(r3, r2),
                            r8.subVectors(r1, r2),
                            r7.cross(r8),
                            b.setXYZ(rS + 0, r7.x, r7.y, r7.z),
                            b.setXYZ(rS + 1, r7.x, r7.y, r7.z),
                            b.setXYZ(rS + 2, r7.x, r7.y, r7.z);
                    }
                    this.normalizeNormals(),
                    b.needsUpdate = true;
                }
            }
            ,
            j.normalizeNormals = function() {
                for (var O = this.attributes.normal, J = 0, b = O.count; J < b; J++)
                    K.fromBufferAttribute(O, J),
                    K.normalize(),
                    O.setXYZ(J, K.x, K.y, K.z);
            }
            ,
            j.toNonIndexed = function() {
                function O(rp, rS) {
                    for (var re = rp.array, rR = rp.itemSize, rH = rp.normalized, ry = new re.constructor(rS.length * rR), rd = 0, rP = 0, rQ = 0, rB = rS.length; rQ < rB; rQ++) {
                        rd = rp.isInterleavedBufferAttribute ? rS[rQ] * rp.data.stride + rp.offset : rS[rQ] * rR;
                        for (var rM = 0; rM < rR; rM++)
                            ry[rP++] = re[rd++];
                    }
                    return new w.TH(ry,rR,rH);
                }
                if (null === this.index)
                    return console.warn('THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.'),
                    this;
                var J = new A()
                  , b = this.index.array
                  , D = this.attributes;
                for (var r0 in D) {
                    var r1 = O(D[r0], b);
                    J.setAttribute(r0, r1);
                }
                var r2 = this.morphAttributes;
                for (var r3 in r2) {
                    for (var r4 = [], r5 = r2[r3], r6 = 0, r7 = r5.length; r6 < r7; r6++) {
                        var r8 = O(r5[r6], b);
                        r4.push(r8);
                    }
                    J.morphAttributes[r3] = r4;
                }
                J.morphTargetsRelative = this.morphTargetsRelative;
                for (var r9 = this.groups, rr = 0, rF = r9.length; rr < rF; rr++) {
                    var rE = r9[rr];
                    J.addGroup(rE.start, rE.count, rE.materialIndex);
                }
                return J;
            }
            ,
            j.toJSON = function() {
                var O = {
                    'metadata': {
                        'version': 4.6,
                        'type': 'BufferGeometry',
                        'generator': 'BufferGeometry.toJSON'
                    }
                };
                if (O.uuid = this.uuid,
                O.type = this.type,
                '' !== this.name && (O.name = this.name),
                Object.keys(this.userData).length > 0 && (O.userData = this.userData),
                undefined !== this.parameters) {
                    var J = this.parameters;
                    for (var b in J)
                        undefined !== J[b] && (O[b] = J[b]);
                    return O;
                }
                O.data = {
                    'attributes': {}
                };
                var D = this.index;
                null !== D && (O.data.index = {
                    'type': D.array.constructor.name,
                    'array': Array.prototype.slice.call(D.array)
                });
                var r0 = this.attributes;
                for (var r1 in r0) {
                    var r2 = r0[r1];
                    O.data.attributes[r1] = r2.toJSON(O.data);
                }
                var r3 = {}
                  , r4 = false;
                for (var r5 in this.morphAttributes) {
                    for (var r6 = this.morphAttributes[r5], r7 = [], r8 = 0, r9 = r6.length; r8 < r9; r8++) {
                        var rr = r6[r8];
                        r7.push(rr.toJSON(O.data));
                    }
                    r7.length > 0 && (r3[r5] = r7,
                    r4 = true);
                }
                r4 && (O.data.morphAttributes = r3,
                O.data.morphTargetsRelative = this.morphTargetsRelative);
                var rF = this.groups;
                rF.length > 0 && (O.data.groups = JSON.parse(JSON.stringify(rF)));
                var rE = this.boundingSphere;
                return null !== rE && (O.data.boundingSphere = {
                    'center': rE.center.toArray(),
                    'radius': rE.radius
                }),
                O;
            }
            ,
            j.clone = function() {
                return new this.constructor().copy(this);
            }
            ,
            j.copy = function(O) {
                this.index = null,
                this.attributes = {},
                this.morphAttributes = {},
                this.groups = [],
                this.boundingBox = null,
                this.boundingSphere = null;
                var J = {};
                this.name = O.name;
                var b = O.index;
                null !== b && this.setIndex(b.clone(J));
                var D = O.attributes;
                for (var r0 in D) {
                    var r1 = D[r0];
                    this.setAttribute(r0, r1.clone(J));
                }
                var r2 = O.morphAttributes;
                for (var r3 in r2) {
                    for (var r4 = [], r5 = r2[r3], r6 = 0, r7 = r5.length; r6 < r7; r6++)
                        r4.push(r5[r6].clone(J));
                    this.morphAttributes[r3] = r4;
                }
                this.morphTargetsRelative = O.morphTargetsRelative;
                for (var r8 = O.groups, r9 = 0, rr = r8.length; r9 < rr; r9++) {
                    var rF = r8[r9];
                    this.addGroup(rF.start, rF.count, rF.materialIndex);
                }
                var rE = O.boundingBox;
                null !== rE && (this.boundingBox = rE.clone());
                var rp = O.boundingSphere;
                return null !== rp && (this.boundingSphere = rp.clone()),
                this.drawRange.start = O.drawRange.start,
                this.drawRange.count = O.drawRange.count,
                this.userData = O.userData,
                this;
            }
            ,
            j.dispose = function() {
                this.dispatchEvent({
                    'type': 'dispose'
                });
            }
            ,
            A;
        }(X.Q);
    },
    0x161ea: (r, F, E) => {
        E.d(F, {
            'Q': () => p
        });
        var p = (function() {
            function S() {}
            var R = S.prototype;
            return R.addEventListener = function(H, y) {
                undefined === this._listeners && (this._listeners = {});
                var d = this._listeners;
                undefined === d[H] && (d[H] = []),
                -1 === d[H].indexOf(y) && d[H].push(y);
            }
            ,
            R.hasEventListener = function(H, y) {
                if (undefined === this._listeners)
                    return false;
                var d = this._listeners;
                return undefined !== d[H] && -1 !== d[H].indexOf(y);
            }
            ,
            R.removeEventListener = function(H, y) {
                if (undefined !== this._listeners) {
                    var d = this._listeners[H];
                    if (undefined !== d) {
                        var P = d.indexOf(y);
                        -1 !== P && d.splice(P, 1);
                    }
                }
            }
            ,
            R.dispatchEvent = function(H) {
                if (undefined !== this._listeners) {
                    var y = this._listeners[H.type];
                    if (undefined !== y) {
                        H.target = this;
                        for (var d = y.slice(0), P = 0, Q = d.length; P < Q; P++)
                            d[P].call(this, H);
                        H.target = null;
                    }
                }
            }
            ,
            S;
        }());
    },
    0xc7b1: (r, F, E) => {
        E.d(F, {
            'z': () => p
        });
        var p = (function() {
            function S() {
                this.mask = 1;
            }
            var R = S.prototype;
            return R.set = function(H) {
                this.mask = 1 << H >>> 0;
            }
            ,
            R.enable = function(H) {
                this.mask |= 1 << H;
            }
            ,
            R.enableAll = function() {
                this.mask = -1;
            }
            ,
            R.toggle = function(H) {
                this.mask ^= 1 << H;
            }
            ,
            R.disable = function(H) {
                this.mask &= ~(1 << H);
            }
            ,
            R.disableAll = function() {
                this.mask = 0;
            }
            ,
            R.test = function(H) {
                return !!(this.mask & H.mask);
            }
            ,
            R.isEnabled = function(H) {
                return !!(this.mask & 1 << H);
            }
            ,
            S;
        }());
    },
    0x16f53: (F, R, H) => {
        H.d(R, {
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
          , V = 0
          , G = new B.P()
          , k = new Q.P()
          , W = new X.k()
          , I = new B.P()
          , L = new B.P()
          , q = new B.P()
          , K = new Q.P()
          , Y = new B.P(1,0,0)
          , z = new B.P(0,1,0)
          , A = new B.P(0,0,1)
          , j = {
            'type': 'added'
        }
          , O = {
            'type': 'removed'
        }
          , J = function(D) {
            function r0() {
                var r2;
                (r2 = D.call(this) || this).isObject3D = true,
                Object.defineProperty(r2, 'id', {
                    'value': V++
                }),
                r2.uuid = U.lk(),
                r2.name = '',
                r2.type = 'Object3D',
                r2.parent = null,
                r2.children = [],
                r2.up = r0.DEFAULT_UP.clone();
                var r3 = new B.P()
                  , r4 = new C.O()
                  , r5 = new Q.P()
                  , r6 = new B.P(1,1,1);
                return r4._onChange(function() {
                    r5.setFromEuler(r4, false);
                }),
                r5._onChange(function() {
                    r4.setFromQuaternion(r5, undefined, false);
                }),
                Object.defineProperties(r2, {
                    'position': {
                        'configurable': true,
                        'enumerable': true,
                        'value': r3
                    },
                    'rotation': {
                        'configurable': true,
                        'enumerable': true,
                        'value': r4
                    },
                    'quaternion': {
                        'configurable': true,
                        'enumerable': true,
                        'value': r5
                    },
                    'scale': {
                        'configurable': true,
                        'enumerable': true,
                        'value': r6
                    },
                    'modelViewMatrix': {
                        'value': new X.k()
                    },
                    'normalMatrix': {
                        'value': new Z.d()
                    }
                }),
                r2.matrix = new X.k(),
                r2.matrixWorld = new X.k(),
                r2.matrixAutoUpdate = r0.DEFAULT_MATRIX_AUTO_UPDATE,
                r2.matrixWorldAutoUpdate = r0.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,
                r2.matrixWorldNeedsUpdate = false,
                r2.layers = new N.z(),
                r2.visible = true,
                r2.castShadow = false,
                r2.receiveShadow = false,
                r2.frustumCulled = true,
                r2.renderOrder = 0,
                r2.animations = [],
                r2.userData = {},
                r2;
            }
            (0,
            P.A)(r0, D);
            var r1 = r0.prototype;
            return r1.onBeforeShadow = function() {}
            ,
            r1.onAfterShadow = function() {}
            ,
            r1.onBeforeRender = function() {}
            ,
            r1.onAfterRender = function() {}
            ,
            r1.applyMatrix4 = function(r2) {
                this.matrixAutoUpdate && this.updateMatrix(),
                this.matrix.premultiply(r2),
                this.matrix.decompose(this.position, this.quaternion, this.scale);
            }
            ,
            r1.applyQuaternion = function(r2) {
                return this.quaternion.premultiply(r2),
                this;
            }
            ,
            r1.setRotationFromAxisAngle = function(r2, r3) {
                this.quaternion.setFromAxisAngle(r2, r3);
            }
            ,
            r1.setRotationFromEuler = function(r2) {
                this.quaternion.setFromEuler(r2, true);
            }
            ,
            r1.setRotationFromMatrix = function(r2) {
                this.quaternion.setFromRotationMatrix(r2);
            }
            ,
            r1.setRotationFromQuaternion = function(r2) {
                this.quaternion.copy(r2);
            }
            ,
            r1.rotateOnAxis = function(r2, r3) {
                return k.setFromAxisAngle(r2, r3),
                this.quaternion.multiply(k),
                this;
            }
            ,
            r1.rotateOnWorldAxis = function(r2, r3) {
                return k.setFromAxisAngle(r2, r3),
                this.quaternion.premultiply(k),
                this;
            }
            ,
            r1.rotateX = function(r2) {
                return this.rotateOnAxis(Y, r2);
            }
            ,
            r1.rotateY = function(r2) {
                return this.rotateOnAxis(z, r2);
            }
            ,
            r1.rotateZ = function(r2) {
                return this.rotateOnAxis(A, r2);
            }
            ,
            r1.translateOnAxis = function(r2, r3) {
                return G.copy(r2).applyQuaternion(this.quaternion),
                this.position.add(G.multiplyScalar(r3)),
                this;
            }
            ,
            r1.translateX = function(r2) {
                return this.translateOnAxis(Y, r2);
            }
            ,
            r1.translateY = function(r2) {
                return this.translateOnAxis(z, r2);
            }
            ,
            r1.translateZ = function(r2) {
                return this.translateOnAxis(A, r2);
            }
            ,
            r1.localToWorld = function(r2) {
                return this.updateWorldMatrix(true, false),
                r2.applyMatrix4(this.matrixWorld);
            }
            ,
            r1.worldToLocal = function(r2) {
                return this.updateWorldMatrix(true, false),
                r2.applyMatrix4(W.copy(this.matrixWorld).invert());
            }
            ,
            r1.lookAt = function(r2, r3, r4) {
                r2.isVector3 ? I.copy(r2) : I.set(r2, r3, r4);
                var r5 = this.parent;
                this.updateWorldMatrix(true, false),
                L.setFromMatrixPosition(this.matrixWorld),
                this.isCamera || this.isLight ? W.lookAt(L, I, this.up) : W.lookAt(I, L, this.up),
                this.quaternion.setFromRotationMatrix(W),
                r5 && (W.extractRotation(r5.matrixWorld),
                k.setFromRotationMatrix(W),
                this.quaternion.premultiply(k.invert()));
            }
            ,
            r1.add = function(r2) {
                if (arguments.length > 1) {
                    for (var r3 = 0; r3 < arguments.length; r3++)
                        this.add(arguments[r3]);
                    return this;
                }
                return r2 === this ? (console.error('THREE.Object3D.add: object can\x27t be added as a child of itself.', r2),
                this) : (r2 && r2.isObject3D ? (null !== r2.parent && r2.parent.remove(r2),
                r2.parent = this,
                this.children.push(r2),
                r2.dispatchEvent(j)) : console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', r2),
                this);
            }
            ,
            r1.remove = function(r2) {
                if (arguments.length > 1) {
                    for (var r3 = 0; r3 < arguments.length; r3++)
                        this.remove(arguments[r3]);
                    return this;
                }
                var r4 = this.children.indexOf(r2);
                return -1 !== r4 && (r2.parent = null,
                this.children.splice(r4, 1),
                r2.dispatchEvent(O)),
                this;
            }
            ,
            r1.removeFromParent = function() {
                var r2 = this.parent;
                return null !== r2 && r2.remove(this),
                this;
            }
            ,
            r1.clear = function() {
                return this.remove.apply(this, this.children);
            }
            ,
            r1.attach = function(r2) {
                return this.updateWorldMatrix(true, false),
                W.copy(this.matrixWorld).invert(),
                null !== r2.parent && (r2.parent.updateWorldMatrix(true, false),
                W.multiply(r2.parent.matrixWorld)),
                r2.applyMatrix4(W),
                this.add(r2),
                r2.updateWorldMatrix(false, true),
                this;
            }
            ,
            r1.getObjectById = function(r2) {
                return this.getObjectByProperty('id', r2);
            }
            ,
            r1.getObjectByName = function(r2) {
                return this.getObjectByProperty('name', r2);
            }
            ,
            r1.getObjectByProperty = function(r2, r3) {
                if (this[r2] === r3)
                    return this;
                for (var r4 = 0, r5 = this.children.length; r4 < r5; r4++) {
                    var r6 = this.children[r4].getObjectByProperty(r2, r3);
                    if (undefined !== r6)
                        return r6;
                }
            }
            ,
            r1.getObjectsByProperty = function(r2, r3, r4) {
                undefined === r4 && (r4 = []),
                this[r2] === r3 && r4.push(this);
                for (var r5 = this.children, r6 = 0, r7 = r5.length; r6 < r7; r6++)
                    r5[r6].getObjectsByProperty(r2, r3, r4);
                return r4;
            }
            ,
            r1.getWorldPosition = function(r2) {
                return this.updateWorldMatrix(true, false),
                r2.setFromMatrixPosition(this.matrixWorld);
            }
            ,
            r1.getWorldQuaternion = function(r2) {
                return this.updateWorldMatrix(true, false),
                this.matrixWorld.decompose(L, r2, q),
                r2;
            }
            ,
            r1.getWorldScale = function(r2) {
                return this.updateWorldMatrix(true, false),
                this.matrixWorld.decompose(L, K, r2),
                r2;
            }
            ,
            r1.getWorldDirection = function(r2) {
                this.updateWorldMatrix(true, false);
                var r3 = this.matrixWorld.elements;
                return r2.set(r3[8], r3[9], r3[10]).normalize();
            }
            ,
            r1.raycast = function() {}
            ,
            r1.traverse = function(r2) {
                r2(this);
                for (var r3 = this.children, r4 = 0, r5 = r3.length; r4 < r5; r4++)
                    r3[r4].traverse(r2);
            }
            ,
            r1.traverseVisible = function(r2) {
                if (false !== this.visible) {
                    r2(this);
                    for (var r3 = this.children, r4 = 0, r5 = r3.length; r4 < r5; r4++)
                        r3[r4].traverseVisible(r2);
                }
            }
            ,
            r1.traverseAncestors = function(r2) {
                var r3 = this.parent;
                null !== r3 && (r2(r3),
                r3.traverseAncestors(r2));
            }
            ,
            r1.updateMatrix = function() {
                this.matrix.compose(this.position, this.quaternion, this.scale),
                this.matrixWorldNeedsUpdate = true;
            }
            ,
            r1.updateMatrixWorld = function(r2) {
                this.matrixAutoUpdate && this.updateMatrix(),
                (this.matrixWorldNeedsUpdate || r2) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
                this.matrixWorldNeedsUpdate = false,
                r2 = true);
                for (var r3 = this.children, r4 = 0, r5 = r3.length; r4 < r5; r4++) {
                    var r6 = r3[r4];
                    true !== r6.matrixWorldAutoUpdate && true !== r2 || r6.updateMatrixWorld(r2);
                }
            }
            ,
            r1.updateWorldMatrix = function(r2, r3) {
                var r4 = this.parent;
                if (true === r2 && null !== r4 && true === r4.matrixWorldAutoUpdate && r4.updateWorldMatrix(true, false),
                this.matrixAutoUpdate && this.updateMatrix(),
                null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
                true === r3)
                    for (var r5 = this.children, r6 = 0, r7 = r5.length; r6 < r7; r6++) {
                        var r8 = r5[r6];
                        true === r8.matrixWorldAutoUpdate && r8.updateWorldMatrix(false, true);
                    }
            }
            ,
            r1.toJSON = function(r2) {
                var r3 = undefined === r2 || 'string' == typeof r2
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
                r4.metadata = {
                    'version': 4.6,
                    'type': 'Object',
                    'generator': 'Object3D.toJSON'
                });
                var r5 = {};
                function r6(rw, rl) {
                    return undefined === rw[rl.uuid] && (rw[rl.uuid] = rl.toJSON(r2)),
                    rl.uuid;
                }
                if (r5.uuid = this.uuid,
                r5.type = this.type,
                '' !== this.name && (r5.name = this.name),
                true === this.castShadow && (r5.castShadow = true),
                true === this.receiveShadow && (r5.receiveShadow = true),
                false === this.visible && (r5.visible = false),
                false === this.frustumCulled && (r5.frustumCulled = false),
                0 !== this.renderOrder && (r5.renderOrder = this.renderOrder),
                Object.keys(this.userData).length > 0 && (r5.userData = this.userData),
                r5.layers = this.layers.mask,
                r5.matrix = this.matrix.toArray(),
                r5.up = this.up.toArray(),
                false === this.matrixAutoUpdate && (r5.matrixAutoUpdate = false),
                this.isInstancedMesh && (r5.type = 'InstancedMesh',
                r5.count = this.count,
                r5.instanceMatrix = this.instanceMatrix.toJSON(),
                null !== this.instanceColor && (r5.instanceColor = this.instanceColor.toJSON())),
                this.isBatchedMesh && (r5.type = 'BatchedMesh',
                r5.perObjectFrustumCulled = this.perObjectFrustumCulled,
                r5.sortObjects = this.sortObjects,
                r5.drawRanges = this._drawRanges,
                r5.reservedRanges = this._reservedRanges,
                r5.visibility = this._visibility,
                r5.active = this._active,
                r5.bounds = this._bounds.map(function(rw) {
                    return {
                        'boxInitialized': rw.boxInitialized,
                        'boxMin': rw.box.min.toArray(),
                        'boxMax': rw.box.max.toArray(),
                        'sphereInitialized': rw.sphereInitialized,
                        'sphereRadius': rw.sphere.radius,
                        'sphereCenter': rw.sphere.center.toArray()
                    };
                }),
                r5.maxGeometryCount = this._maxGeometryCount,
                r5.maxVertexCount = this._maxVertexCount,
                r5.maxIndexCount = this._maxIndexCount,
                r5.geometryInitialized = this._geometryInitialized,
                r5.geometryCount = this._geometryCount,
                r5.matricesTexture = this._matricesTexture.toJSON(r2),
                null !== this.boundingSphere && (r5.boundingSphere = {
                    'center': r5.boundingSphere.center.toArray(),
                    'radius': r5.boundingSphere.radius
                }),
                null !== this.boundingBox && (r5.boundingBox = {
                    'min': r5.boundingBox.min.toArray(),
                    'max': r5.boundingBox.max.toArray()
                })),
                this.isScene)
                    this.background && (this.background.isColor ? r5.background = this.background.toJSON() : this.background.isTexture && (r5.background = this.background.toJSON(r2).uuid)),
                    this.environment && this.environment.isTexture && true !== this.environment.isRenderTargetTexture && (r5.environment = this.environment.toJSON(r2).uuid);
                else {
                    if (this.isMesh || this.isLine || this.isPoints) {
                        r5.geometry = r6(r2.geometries, this.geometry);
                        var r7 = this.geometry.parameters;
                        if (undefined !== r7 && undefined !== r7.shapes) {
                            var r8 = r7.shapes;
                            if (Array.isArray(r8))
                                for (var r9 = 0, rr = r8.length; r9 < rr; r9++) {
                                    var rF = r8[r9];
                                    r6(r2.shapes, rF);
                                }
                            else
                                r6(r2.shapes, r8);
                        }
                    }
                }
                if (this.isSkinnedMesh && (r5.bindMode = this.bindMode,
                r5.bindMatrix = this.bindMatrix.toArray(),
                undefined !== this.skeleton && (r6(r2.skeletons, this.skeleton),
                r5.skeleton = this.skeleton.uuid)),
                undefined !== this.material) {
                    if (Array.isArray(this.material)) {
                        for (var rE = [], rp = 0, rS = this.material.length; rp < rS; rp++)
                            rE.push(r6(r2.materials, this.material[rp]));
                        r5.material = rE;
                    } else
                        r5.material = r6(r2.materials, this.material);
                }
                if (this.children.length > 0) {
                    r5.children = [];
                    for (var re = 0; re < this.children.length; re++)
                        r5.children.push(this.children[re].toJSON(r2).object);
                }
                if (this.animations.length > 0) {
                    r5.animations = [];
                    for (var rR = 0; rR < this.animations.length; rR++) {
                        var rH = this.animations[rR];
                        r5.animations.push(r6(r2.animations, rH));
                    }
                }
                if (r3) {
                    var ry = rm(r2.geometries)
                      , rd = rm(r2.materials)
                      , rP = rm(r2.textures)
                      , rQ = rm(r2.images)
                      , rB = rm(r2.shapes)
                      , rM = rm(r2.skeletons)
                      , rX = rm(r2.animations)
                      , rt = rm(r2.nodes);
                    ry.length > 0 && (r4.geometries = ry),
                    rd.length > 0 && (r4.materials = rd),
                    rP.length > 0 && (r4.textures = rP),
                    rQ.length > 0 && (r4.images = rQ),
                    rB.length > 0 && (r4.shapes = rB),
                    rM.length > 0 && (r4.skeletons = rM),
                    rX.length > 0 && (r4.animations = rX),
                    rt.length > 0 && (r4.nodes = rt);
                }
                return r4.object = r5,
                r4;
                function rm(rw) {
                    var rl = [];
                    for (var rC in rw) {
                        var rN = rw[rC];
                        delete rN.metadata,
                        rl.push(rN);
                    }
                    return rl;
                }
            }
            ,
            r1.clone = function(r2) {
                return new this.constructor().copy(this, r2);
            }
            ,
            r1.copy = function(r2, r3) {
                if (undefined === r3 && (r3 = true),
                this.name = r2.name,
                this.up.copy(r2.up),
                this.position.copy(r2.position),
                this.rotation.order = r2.rotation.order,
                this.quaternion.copy(r2.quaternion),
                this.scale.copy(r2.scale),
                this.matrix.copy(r2.matrix),
                this.matrixWorld.copy(r2.matrixWorld),
                this.matrixAutoUpdate = r2.matrixAutoUpdate,
                this.matrixWorldAutoUpdate = r2.matrixWorldAutoUpdate,
                this.matrixWorldNeedsUpdate = r2.matrixWorldNeedsUpdate,
                this.layers.mask = r2.layers.mask,
                this.visible = r2.visible,
                this.castShadow = r2.castShadow,
                this.receiveShadow = r2.receiveShadow,
                this.frustumCulled = r2.frustumCulled,
                this.renderOrder = r2.renderOrder,
                this.animations = r2.animations.slice(),
                this.userData = JSON.parse(JSON.stringify(r2.userData)),
                true === r3)
                    for (var r4 = 0; r4 < r2.children.length; r4++) {
                        var r5 = r2.children[r4];
                        this.add(r5.clone());
                    }
                return this;
            }
            ,
            r0;
        }(w.Q);
        J.DEFAULT_UP = new B.P(0,1,0),
        J.DEFAULT_MATRIX_AUTO_UPDATE = true,
        J.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
    },
    0xd973: (r, F, E) => {
        E(0xbf9a);
    },
    0xfbe: (F, E, p) => {
        p.d(E, {
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
                undefined === w && (w = 1),
                undefined === C && (C = 1),
                undefined === N && (N = {}),
                (Z = M.call(this) || this).isRenderTarget = true,
                Z.width = w,
                Z.height = C,
                Z.depth = 1,
                Z.scissor = new d.I(0,0,w,C),
                Z.scissorTest = false,
                Z.viewport = new d.I(0,0,w,C);
                var h = {
                    'width': w,
                    'height': C,
                    'depth': 1
                };
                return undefined !== N.encoding && ((0,
                Q.mc)('THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace.'),
                N.colorSpace = N.encoding === y.S2Q ? y['er$'] : y.jf0),
                N = Object.assign({
                    'generateMipmaps': false,
                    'internalFormat': null,
                    'minFilter': y.k6q,
                    'depthBuffer': true,
                    'stencilBuffer': false,
                    'depthTexture': null,
                    'samples': 0
                }, N),
                Z.texture = new H.g(h,N.mapping,N.wrapS,N.wrapT,N.magFilter,N.minFilter,N.format,N.type,N.anisotropy,N.colorSpace),
                Z.texture.isRenderTargetTexture = true,
                Z.texture.flipY = false,
                Z.texture.generateMipmaps = N.generateMipmaps,
                Z.texture.internalFormat = N.internalFormat,
                Z.depthBuffer = N.depthBuffer,
                Z.stencilBuffer = N.stencilBuffer,
                Z.depthTexture = N.depthTexture,
                Z.samples = N.samples,
                Z;
            }
            (0,
            S.A)(X, M);
            var m = X.prototype;
            return m.setSize = function(w, C, N) {
                undefined === N && (N = 1),
                this.width === w && this.height === C && this.depth === N || (this.width = w,
                this.height = C,
                this.depth = N,
                this.texture.image.width = w,
                this.texture.image.height = C,
                this.texture.image.depth = N,
                this.dispose()),
                this.viewport.set(0, 0, w, C),
                this.scissor.set(0, 0, w, C);
            }
            ,
            m.clone = function() {
                return new this.constructor().copy(this);
            }
            ,
            m.copy = function(w) {
                this.width = w.width,
                this.height = w.height,
                this.depth = w.depth,
                this.scissor.copy(w.scissor),
                this.scissorTest = w.scissorTest,
                this.viewport.copy(w.viewport),
                this.texture = w.texture.clone(),
                this.texture.isRenderTargetTexture = true;
                var C = Object.assign({}, w.texture.image);
                return this.texture.source = new P.k(C),
                this.depthBuffer = w.depthBuffer,
                this.stencilBuffer = w.stencilBuffer,
                null !== w.depthTexture && (this.depthTexture = w.depthTexture.clone()),
                this.samples = w.samples,
                this;
            }
            ,
            m.dispose = function() {
                this.dispatchEvent({
                    'type': 'dispose'
                });
            }
            ,
            X;
        }(R.Q);
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
        p.d(E, {
            'H': () => y
        });
        var S, R = p(0x1078a), H = p(0x4efe), y = (function() {
            function d() {}
            return d.getDataURL = function(P) {
                if (/^data:/i.test(P.src))
                    return P.src;
                if ('undefined' == typeof HTMLCanvasElement)
                    return P.src;
                var Q;
                if (P instanceof HTMLCanvasElement)
                    Q = P;
                else {
                    undefined === S && (S = (0,
                    R.qq)('canvas')),
                    S.width = P.width,
                    S.height = P.height;
                    var B = S.getContext('2d');
                    P instanceof ImageData ? B.putImageData(P, 0, 0) : B.drawImage(P, 0, 0, P.width, P.height),
                    Q = S;
                }
                return Q.width > 0x800 || Q.height > 0x800 ? (console.warn('THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons', P),
                Q.toDataURL('image/jpeg', 0.6)) : Q.toDataURL('image/png');
            }
            ,
            d.sRGBToLinear = function(P) {
                if ('undefined' != typeof HTMLImageElement && P instanceof HTMLImageElement || 'undefined' != typeof HTMLCanvasElement && P instanceof HTMLCanvasElement || 'undefined' != typeof ImageBitmap && P instanceof ImageBitmap) {
                    var Q = (0,
                    R.qq)('canvas');
                    Q.width = P.width,
                    Q.height = P.height;
                    var B = Q.getContext('2d');
                    B.drawImage(P, 0, 0, P.width, P.height);
                    for (var M = B.getImageData(0, 0, P.width, P.height), X = M.data, m = 0; m < X.length; m++)
                        X[m] = 0xff * (0,
                        H.dk)(X[m] / 0xff);
                    return B.putImageData(M, 0, 0),
                    Q;
                }
                if (P.data) {
                    for (var w = P.data.slice(0), C = 0; C < w.length; C++)
                        w instanceof Uint8Array || w instanceof Uint8ClampedArray ? w[C] = Math.floor(0xff * (0,
                        H.dk)(w[C] / 0xff)) : w[C] = (0,
                        H.dk)(w[C]);
                    return {
                        'data': w,
                        'width': P.width,
                        'height': P.height
                    };
                }
                return console.warn('THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.'),
                P;
            }
            ,
            d;
        }());
    }
    ,
    0x10fc5: (F, R, H) => {
        H.d(R, {
            'B': () => r2
        });
        var Q = H(0x172d2);
        var B = H(0x17dfd);
        var X = H(0x16835);
        var N = H(0x1152b);
        var Z = H(0x17743);
        var U = H(0x152d9);
        var V = H(0x7026);
        var G = H(0x1008e);
        var k = H(0x169b1);
        var W = H(0xc42c);
        var I = H(0x14baa);
        var L = H(0x131a1);
        // TODO
        /** what is this? */
        var q = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582];
        var K = 0x14;
        var Y = new Z.q();
        var z = new k.Q();
        var j = null;
        var O = 0;
        var J = 0;
        var D = (1 + Math.sqrt(5)) / 2;
        var r0 = 1 / D;
        var r1 = [new G.P(1,1,1), new G.P(-1,1,1), new G.P(1,1,-1), new G.P(-1,1,-1), new G.P(0,D,r0), new G.P(0,D,-r0), new G.P(r0,0,D), new G.P(-r0,0,D), new G.P(D,r0,0), new G.P(-D,r0,0)];
        var r2 = (function() {
            function r7(r9) {
                this._renderer = r9,
                this._pingPongRenderTarget = null,
                this._lodMax = 0,
                this._cubeSize = 0,
                this._lodPlanes = [],
                this._sizeLods = [],
                this._sigmas = [],
                this._blurMaterial = null,
                this._cubemapMaterial = null,
                this._equirectMaterial = null,
                this._compileMaterial(this._blurMaterial);
            }
            var r8 = r7.prototype;
            return r8.fromScene = function(r9, rr, rF, rE) {
                undefined === rr && (rr = 0),
                undefined === rF && (rF = 0.1),
                undefined === rE && (rE = 0x64),
                j = this._renderer.getRenderTarget(),
                O = this._renderer.getActiveCubeFace(),
                J = this._renderer.getActiveMipmapLevel(),
                this._setSize(0x100);
                var rp = this._allocateTargets();
                return rp.depthBuffer = true,
                this._sceneToCubeUV(r9, rF, rE, rp),
                rr > 0 && this._blur(rp, 0, 0, rr),
                this._applyPMREM(rp),
                this._cleanup(rp),
                rp;
            }
            ,
            r8.fromEquirectangular = function(r9, rr) {
                return undefined === rr && (rr = null),
                this._fromTexture(r9, rr);
            }
            ,
            r8.fromCubemap = function(r9, rr) {
                return undefined === rr && (rr = null),
                this._fromTexture(r9, rr);
            }
            ,
            r8.compileCubemapShader = function() {
                null === this._cubemapMaterial && (this._cubemapMaterial = r6(),
                this._compileMaterial(this._cubemapMaterial));
            }
            ,
            r8.compileEquirectangularShader = function() {
                null === this._equirectMaterial && (this._equirectMaterial = r5(),
                this._compileMaterial(this._equirectMaterial));
            }
            ,
            r8.dispose = function() {
                this._dispose(),
                null !== this._cubemapMaterial && this._cubemapMaterial.dispose(),
                null !== this._equirectMaterial && this._equirectMaterial.dispose();
            }
            ,
            r8._setSize = function(r9) {
                this._lodMax = Math.floor(Math.log2(r9)),
                this._cubeSize = Math.pow(2, this._lodMax);
            }
            ,
            r8._dispose = function() {
                null !== this._blurMaterial && this._blurMaterial.dispose(),
                null !== this._pingPongRenderTarget && this._pingPongRenderTarget.dispose();
                for (var r9 = 0; r9 < this._lodPlanes.length; r9++)
                    this._lodPlanes[r9].dispose();
            }
            ,
            r8._cleanup = function(r9) {
                this._renderer.setRenderTarget(j, O, J),
                r9.scissorTest = false,
                r4(r9, 0, 0, r9.width, r9.height);
            }
            ,
            r8._fromTexture = function(r9, rr) {
                r9.mapping === Q.hy7 || r9.mapping === Q.xFO ? this._setSize(0 === r9.image.length ? 0x10 : r9.image[0].width || r9.image[0].image.width) : this._setSize(r9.image.width / 4),
                j = this._renderer.getRenderTarget(),
                O = this._renderer.getActiveCubeFace(),
                J = this._renderer.getActiveMipmapLevel();
                var rF = rr || this._allocateTargets();
                return this._textureToCubeUV(r9, rF),
                this._applyPMREM(rF),
                this._cleanup(rF),
                rF;
            }
            ,
            r8._allocateTargets = function() {
                var r9 = 3 * Math.max(this._cubeSize, 0x70)
                  , rr = 4 * this._cubeSize
                  , rF = {
                    'magFilter': Q.k6q,
                    'minFilter': Q.k6q,
                    'generateMipmaps': false,
                    'type': Q.ix0,
                    'format': Q.GWd,
                    'colorSpace': Q.Zr2,
                    'depthBuffer': false
                }
                  , rE = r3(r9, rr, rF);
                if (null === this._pingPongRenderTarget || this._pingPongRenderTarget.width !== r9 || this._pingPongRenderTarget.height !== rr) {
                    null !== this._pingPongRenderTarget && this._dispose(),
                    this._pingPongRenderTarget = r3(r9, rr, rF);
                    var rp = this._lodMax
                      , rS = function(re) {
                        for (var rR = [], rH = [], ry = [], rd = re, rP = re - 4 + 1 + q.length, rQ = 0; rQ < rP; rQ++) {
                            var rB = Math.pow(2, rd);
                            rH.push(rB);
                            var rM = 1 / rB;
                            rQ > re - 4 ? rM = q[rQ - re + 4 - 1] : 0 === rQ && (rM = 0),
                            ry.push(rM);
                            for (var rX = 1 / (rB - 2), rt = -rX, rm = 1 + rX, rw = [rt, rt, rm, rt, rm, rm, rt, rt, rm, rm, rt, rm], rl = 6, rC = 6, rN = 3, rZ = 2, rh = 1, ro = new Float32Array(rN * rC * rl), rU = new Float32Array(rZ * rC * rl), ri = new Float32Array(rh * rC * rl), rT = 0; rT < rl; rT++) {
                                var rV = rT % 3 * 2 / 3 - 1
                                  , rs = rT > 2 ? 0 : -1
                                  , rG = [rV, rs, 0, rV + 2 / 3, rs, 0, rV + 2 / 3, rs + 1, 0, rV, rs, 0, rV + 2 / 3, rs + 1, 0, rV, rs + 1, 0];
                                ro.set(rG, rN * rC * rT),
                                rU.set(rw, rZ * rC * rT);
                                var rk = [rT, rT, rT, rT, rT, rT];
                                ri.set(rk, rh * rC * rT);
                            }
                            var rW = new X.L();
                            rW.setAttribute('position', new B.TH(ro,rN)),
                            rW.setAttribute('uv', new B.TH(rU,rZ)),
                            rW.setAttribute('faceIndex', new B.TH(ri,rh)),
                            rR.push(rW),
                            rd > 4 && rd--;
                        }
                        return {
                            'lodPlanes': rR,
                            'sizeLods': rH,
                            'sigmas': ry
                        };
                    }(rp);
                    this._sizeLods = rS.sizeLods,
                    this._lodPlanes = rS.lodPlanes,
                    this._sigmas = rS.sigmas,
                    this._blurMaterial = function(re, rR, rH) {
                        var ry = new Float32Array(K)
                          , rd = new G.P(0,1,0)
                          , rP = new V.B({
                            'name': 'SphericalGaussianBlur',
                            'defines': {
                                'n': K,
                                'CUBEUV_TEXEL_WIDTH': 1 / rR,
                                'CUBEUV_TEXEL_HEIGHT': 1 / rH,
                                'CUBEUV_MAX_MIP': re + '.0'
                            },
                            'uniforms': {
                                'envMap': {
                                    'value': null
                                },
                                'samples': {
                                    'value': 1
                                },
                                'weights': {
                                    'value': ry
                                },
                                'latitudinal': {
                                    'value': false
                                },
                                'dTheta': {
                                    'value': 0
                                },
                                'mipInt': {
                                    'value': 0
                                },
                                'poleAxis': {
                                    'value': rd
                                }
                            },
                            'vertexShader': (
'\n\n' +
'\t\t' + 'precision mediump float;\n' +
'\t\t' + 'precision mediump int;\n\n' +
'\t\t' + 'attribute float faceIndex;\n\n' +
'\t\t' + 'varying vec3 vOutputDirection;\n\n' +
'\t\t' + '// RH coordinate system; PMREM face-indexing convention\n' +
'\t\t' + 'vec3 getDirection( vec2 uv, float face ) {\n\n' +
'\t\t\t' + 'uv = 2.0 * uv - 1.0;\n\n' +
'\t\t\t' + 'vec3 direction = vec3( uv, 1.0 );\n\n' +
'\t\t\t' + 'if ( face == 0.0 ) {\n\n' +
'\t\t\t\t' + 'direction = direction.zyx; // ( 1, v, u ) pos x\n\n' +
'\t\t\t' + '} else if ( face == 1.0 ) {\n\n' +
'\t\t\t\t' + 'direction = direction.xzy;\n' +
'\t\t\t\t' + 'direction.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n' +
'\t\t\t' + '} else if ( face == 2.0 ) {\n\n' +
'\t\t\t\t' + 'direction.x *= -1.0; // ( -u, v, 1 ) pos z\n\n' +
'\t\t\t' + '} else if ( face == 3.0 ) {\n\n' +
'\t\t\t\t' + 'direction = direction.zyx;\n' +
'\t\t\t\t' + 'direction.xz *= -1.0; // ( -1, v, -u ) neg x\n\n' +
'\t\t\t' + '} else if ( face == 4.0 ) {\n\n' +
'\t\t\t\t' + 'direction = direction.xzy;\n' +
'\t\t\t\t' + 'direction.xy *= -1.0; // ( -u, -1, v ) neg y\n\n' +
'\t\t\t' + '} else if ( face == 5.0 ) {\n\n' +
'\t\t\t\t' + 'direction.z *= -1.0; // ( u, v, -1 ) neg z\n\n' +
'\t\t\t' + '}\n\n' +
'\t\t\t' + 'return direction;\n\n' +
'\t\t' + '}\n\n' +
'\t\t' + 'void main() {\n\n' +
'\t\t\t' + 'vOutputDirection = getDirection( uv, faceIndex );\n' +
'\t\t\t' + 'gl_Position = vec4( position, 1.0 );\n\n' +
'\t\t' + '}\n' +
'\t' + ''
                            ),
                            'fragmentShader': (
'\n\n' +
'\t\t\t' + 'precision mediump float;\n' +
'\t\t\t' + 'precision mediump int;\n\n' +
'\t\t\t' + 'varying vec3 vOutputDirection;\n\n' +
'\t\t\t' + 'uniform sampler2D envMap;\n' +
'\t\t\t' + 'uniform int samples;\n' +
'\t\t\t' + 'uniform float weights[ n ];\n' +
'\t\t\t' + 'uniform bool latitudinal;\n' +
'\t\t\t' + 'uniform float dTheta;\n' +
'\t\t\t' + 'uniform float mipInt;\n' +
'\t\t\t' + 'uniform vec3 poleAxis;\n\n' +
'\t\t\t' + '#define ENVMAP_TYPE_CUBE_UV\n' +
'\t\t\t' + '#include <cube_uv_reflection_fragment>\n\n' +
'\t\t\t' + 'vec3 getSample( float theta, vec3 axis ) {\n\n' +
'\t\t\t\t' + 'float cosTheta = cos( theta );\n' +
'\t\t\t\t' + '// Rodrigues\x27 axis-angle rotation\n' +
'\t\t\t\t' + 'vec3 sampleDirection = vOutputDirection * cosTheta\n' +
'\t\t\t\t\t' + '+ cross( axis, vOutputDirection ) * sin( theta )\n' +
'\t\t\t\t\t' + '+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );\n\n' +
'\t\t\t\t' + 'return bilinearCubeUV( envMap, sampleDirection, mipInt );\n\n' +
'\t\t\t' + '}\n\n' +
'\t\t\t' + 'void main() {\n\n' +
'\t\t\t\t' + 'vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );\n\n' +
'\t\t\t\t' + 'if ( all( equal( axis, vec3( 0.0 ) ) ) ) {\n\n' +
'\t\t\t\t\t' + 'axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );\n\n' +
'\t\t\t\t' + '}\n\n' +
'\t\t\t\t' + 'axis = normalize( axis );\n\n' +
'\t\t\t\t' + 'gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n' +
'\t\t\t\t' + 'gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );\n\n' +
'\t\t\t\t' + 'for ( int i = 1; i < n; i++ ) {\n\n' +
'\t\t\t\t\t' + 'if ( i >= samples ) {\n\n' +
'\t\t\t\t\t\t' + 'break;\n\n' +
'\t\t\t\t\t' + '}\n\n' +
'\t\t\t\t\t' + 'float theta = dTheta * float( i );\n' +
'\t\t\t\t\t' + 'gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );\n' +
'\t\t\t\t\t' + 'gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );\n\n' +
'\t\t\t\t' + '}\n\n' +
'\t\t\t' + '}\n' +
'\t\t' + ''
                            ),
                            'blending': Q.XIg,
                            'depthTest': false,
                            'depthWrite': false
                        });
                        return rP;
                    }(rp, r9, rr);
                }
                return rE;
            }
            ,
            r8._compileMaterial = function(r9) {
                var rr = new N.e(this._lodPlanes[0],r9);
                this._renderer.compile(rr, Y);
            }
            ,
            r8._sceneToCubeUV = function(r9, rr, rF, rE) {
                var rp = new U.u(0x5a,1,rr,rF)
                  , rS = [1, -1, 1, 1, 1, 1]
                  , re = [1, 1, 1, -1, -1, -1]
                  , rR = this._renderer
                  , rH = rR.autoClear
                  , ry = rR.toneMapping;
                rR.getClearColor(z),
                rR.toneMapping = Q.y_p,
                rR.autoClear = false;
                var rd = new I.V({
                    'name': 'PMREM.Background',
                    'side': Q.hsX,
                    'depthWrite': false,
                    'depthTest': false,
                })
                  , rP = new N.e(new L.i(),rd)
                  , rQ = false
                  , rB = r9.background;
                rB ? rB.isColor && (rd.color.copy(rB),
                r9.background = null,
                rQ = true) : (rd.color.copy(z),
                rQ = true);
                for (var rM = 0; rM < 6; rM++) {
                    var rX = rM % 3;
                    0 === rX ? (rp.up.set(0, rS[rM], 0),
                    rp.lookAt(re[rM], 0, 0)) : 1 === rX ? (rp.up.set(0, 0, rS[rM]),
                    rp.lookAt(0, re[rM], 0)) : (rp.up.set(0, rS[rM], 0),
                    rp.lookAt(0, 0, re[rM]));
                    var rt = this._cubeSize;
                    r4(rE, rX * rt, rM > 2 ? rt : 0, rt, rt),
                    rR.setRenderTarget(rE),
                    rQ && rR.render(rP, rp),
                    rR.render(r9, rp);
                }
                rP.geometry.dispose(),
                rP.material.dispose(),
                rR.toneMapping = ry,
                rR.autoClear = rH,
                r9.background = rB;
            }
            ,
            r8._textureToCubeUV = function(r9, rr) {
                var rF = this._renderer
                  , rE = r9.mapping === Q.hy7 || r9.mapping === Q.xFO;
                rE ? (null === this._cubemapMaterial && (this._cubemapMaterial = r6()),
                this._cubemapMaterial.uniforms.flipEnvMap.value = false === r9.isRenderTargetTexture ? -1 : 1) : null === this._equirectMaterial && (this._equirectMaterial = r5());
                var rp = rE ? this._cubemapMaterial : this._equirectMaterial
                  , rS = new N.e(this._lodPlanes[0],rp);
                rp.uniforms.envMap.value = r9;
                var re = this._cubeSize;
                r4(rr, 0, 0, 3 * re, 2 * re),
                rF.setRenderTarget(rr),
                rF.render(rS, Y);
            }
            ,
            r8._applyPMREM = function(r9) {
                var rr = this._renderer
                  , rF = rr.autoClear;
                rr.autoClear = false;
                for (var rE = 1; rE < this._lodPlanes.length; rE++) {
                    var rp = Math.sqrt(this._sigmas[rE] * this._sigmas[rE] - this._sigmas[rE - 1] * this._sigmas[rE - 1])
                      , rS = r1[(rE - 1) % r1.length];
                    this._blur(r9, rE - 1, rE, rp, rS);
                }
                rr.autoClear = rF;
            }
            ,
            r8._blur = function(r9, rr, rF, rE, rp) {
                var rS = this._pingPongRenderTarget;
                this._halfBlur(r9, rS, rr, rF, rE, 'latitudinal', rp),
                this._halfBlur(rS, r9, rF, rF, rE, 'longitudinal', rp);
            }
            ,
            r8._halfBlur = function(r9, rr, rF, rE, rp, rS, re) {
                var rR = this._renderer
                  , rH = this._blurMaterial;
                'latitudinal' !== rS && 'longitudinal' !== rS && console.error('blur direction must be either latitudinal or longitudinal!');
                var ry = new N.e(this._lodPlanes[rE],rH)
                  , rd = rH.uniforms
                  , rP = this._sizeLods[rF] - 1
                  , rQ = isFinite(rp) ? Math.PI / (2 * rP) : 2 * Math.PI / 0x27
                  , rB = rp / rQ
                  , rM = isFinite(rp) ? 1 + Math.floor(3 * rB) : K;
                rM > K && console.warn('sigmaRadians, ' + rp + ', is too large and will clip, as it requested ' + rM + ' samples when the maximum is set to ' + K);
                for (var rX = [], rt = 0, rm = 0; rm < K; ++rm) {
                    var rw = rm / rB
                      , rl = Math.exp(-rw * rw / 2);
                    rX.push(rl),
                    0 === rm ? rt += rl : rm < rM && (rt += 2 * rl);
                }
                for (var rC = 0; rC < rX.length; rC++)
                    rX[rC] = rX[rC] / rt;
                rd.envMap.value = r9.texture,
                rd.samples.value = rM,
                rd.weights.value = rX,
                rd.latitudinal.value = 'latitudinal' === rS,
                re && (rd.poleAxis.value = re);
                var rN = this._lodMax;
                rd.dTheta.value = rQ,
                rd.mipInt.value = rN - rF;
                var rZ = this._sizeLods[rE];
                r4(rr, 3 * rZ * (rE > rN - 4 ? rE - rN + 4 : 0), 4 * (this._cubeSize - rZ), 3 * rZ, 2 * rZ),
                rR.setRenderTarget(rr),
                rR.render(ry, Y);
            }
            ,
            r7;
        }());
        function r3(r7, r8, r9) {
            var rr = new W.n(r7,r8,r9);
            return rr.texture.mapping = Q.Om,
            rr.texture.name = 'PMREM.cubeUv',
            rr.scissorTest = true,
            rr;
        }
        function r4(r7, r8, r9, rr, rF) {
            r7.viewport.set(r8, r9, rr, rF),
            r7.scissor.set(r8, r9, rr, rF);
        }
        function r5() {
            return new V.B({
                'name': 'EquirectangularToCubeUV',
                'uniforms': {
                    'envMap': {
                        'value': null
                    }
                },
                'vertexShader': '\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t',
                'fragmentShader': '\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\n\t\t\t#include <common>\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 outputDirection = normalize( vOutputDirection );\n\t\t\t\tvec2 uv = equirectUv( outputDirection );\n\n\t\t\t\tgl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );\n\n\t\t\t}\n\t\t',
                'blending': Q.XIg,
                'depthTest': false,
                'depthWrite': false
            });
        }
        function r6() {
            return new V.B({
                'name': 'CubemapToCubeUV',
                'uniforms': {
                    'envMap': {
                        'value': null
                    },
                    'flipEnvMap': {
                        'value': -1
                    }
                },
                'vertexShader': '\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t',
                'fragmentShader': '\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tuniform float flipEnvMap;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform samplerCube envMap;\n\n\t\t\tvoid main() {\n\n\t\t\t\tgl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );\n\n\t\t\t}\n\t\t',
                'blending': Q.XIg,
                'depthTest': false,
                'depthWrite': false
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
        p.d(E, {
            'i': () => d
        });
        var S = p(0x12e4b)
          , R = p(0x16835)
          , H = p(0x17dfd)
          , y = p(0x1008e)
          , d = function(P) {
            function Q(B, M, X, w, C, N) {
                var Z;
                undefined === B && (B = 1),
                undefined === M && (M = 1),
                undefined === X && (X = 1),
                undefined === w && (w = 1),
                undefined === C && (C = 1),
                undefined === N && (N = 1),
                (Z = P.call(this) || this).type = 'BoxGeometry',
                Z.parameters = {
                    'width': B,
                    'height': M,
                    'depth': X,
                    'widthSegments': w,
                    'heightSegments': C,
                    'depthSegments': N
                };
                var U = Z;
                w = Math.floor(w),
                C = Math.floor(C),
                N = Math.floor(N);
                var T = []
                  , V = []
                  , G = []
                  , k = []
                  , W = 0
                  , x = 0;
                function I(q, K, Y, j, J, r0, r1, r2, r3, r4, r5) {
                    for (var r6 = r0 / r3, r7 = r1 / r4, r8 = r0 / 2, r9 = r1 / 2, rr = r2 / 2, rF = r3 + 1, rE = r4 + 1, rp = 0, rS = 0, re = new y.P(), rR = 0; rR < rE; rR++)
                        for (var rH = rR * r7 - r9, ry = 0; ry < rF; ry++) {
                            var rd = ry * r6 - r8;
                            re[q] = rd * j,
                            re[K] = rH * J,
                            re[Y] = rr,
                            V.push(re.x, re.y, re.z),
                            re[q] = 0,
                            re[K] = 0,
                            re[Y] = r2 > 0 ? 1 : -1,
                            G.push(re.x, re.y, re.z),
                            k.push(ry / r3),
                            k.push(1 - rR / r4),
                            rp += 1;
                        }
                    for (var rP = 0; rP < r4; rP++)
                        for (var rQ = 0; rQ < r3; rQ++) {
                            var rB = W + rQ + rF * rP
                              , rM = W + rQ + rF * (rP + 1)
                              , rX = W + (rQ + 1) + rF * (rP + 1)
                              , rt = W + (rQ + 1) + rF * rP;
                            T.push(rB, rM, rt),
                            T.push(rM, rX, rt),
                            rS += 6;
                        }
                    U.addGroup(x, rS, r5),
                    x += rS,
                    W += rp;
                }
                return I('z', 'y', 'x', -1, -1, X, M, B, N, C, 0),
                I('z', 'y', 'x', 1, -1, X, M, -B, N, C, 1),
                I('x', 'z', 'y', 1, 1, B, X, M, w, N, 2),
                I('x', 'z', 'y', 1, -1, B, X, -M, w, N, 3),
                I('x', 'y', 'z', 1, -1, B, M, X, w, C, 4),
                I('x', 'y', 'z', -1, -1, B, M, -X, w, C, 5),
                Z.setIndex(T),
                Z.setAttribute('position', new H.qt(V,3)),
                Z.setAttribute('normal', new H.qt(G,3)),
                Z.setAttribute('uv', new H.qt(k,2)),
                Z;
            }
            return (0,
            S.A)(Q, P),
            Q.prototype.copy = function(B) {
                return P.prototype.copy.call(this, B),
                this.parameters = Object.assign({}, B.parameters),
                this;
            }
            ,
            Q.fromJSON = function(B) {
                return new Q(B.width,B.height,B.depth,B.widthSegments,B.heightSegments,B.depthSegments);
            }
            ,
            Q;
        }(R.L);
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
        E.d(F, {
            'h': () => p
        });
        var p = new function(S, R, H) {
            var y = this
              , d = false
              , P = 0
              , Q = 0
              , B = undefined
              , M = [];
            this.onStart = undefined,
            this.onLoad = S,
            this.onProgress = R,
            this.onError = H,
            this.itemStart = function(X) {
                Q++,
                false === d && undefined !== y.onStart && y.onStart(X, P, Q),
                d = true;
            }
            ,
            this.itemEnd = function(X) {
                P++,
                undefined !== y.onProgress && y.onProgress(X, P, Q),
                P === Q && (d = false,
                undefined !== y.onLoad && y.onLoad());
            }
            ,
            this.itemError = function(X) {
                undefined !== y.onError && y.onError(X);
            }
            ,
            this.resolveURL = function(X) {
                return B ? B(X) : X;
            }
            ,
            this.setURLModifier = function(X) {
                return B = X,
                this;
            }
            ,
            this.addHandler = function(X, m) {
                return M.push(X, m),
                this;
            }
            ,
            this.removeHandler = function(X) {
                var m = M.indexOf(X);
                return -1 !== m && M.splice(m, 2),
                this;
            }
            ,
            this.getHandler = function(X) {
                for (var m = 0, w = M.length; m < w; m += 2) {
                    var l = M[m]
                      , C = M[m + 1];
                    if (l.global && (l.lastIndex = 0),
                    l.test(X))
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
        p.UTZ,
        p.hy7,
        p.xFO,
        p.wfO,
        p.uV5,
        p.Om,
        p.GJx,
        p.ghU,
        p.kTW,
        p.hxR,
        p.pHI,
        p.Cfg,
        p.k6q,
        p.kRr,
        p['$_I'];
    }
    ,
    0x11396: (r, F, E) => {
        E(0x617);
    }
    ,
    0x10849: (F, E, p) => {
        p.d(E, {
            'i': () => B
        });
        var S = p(0x14124)
          , R = p(0x12e4b)
          , H = p(0x169b1)
          , y = p(0x161ea)
          , d = p(0x172d2)
          , P = p(0xbd95)
          , Q = 0
          , B = function(M) {
            function X() {
                var w;
                return (w = M.call(this) || this).isMaterial = true,
                Object.defineProperty(w, 'id', {
                    'value': Q++
                }),
                w.uuid = P.lk(),
                w.name = '',
                w.type = 'Material',
                w.blending = d.NTi,
                w.side = d.hB5,
                w.vertexColors = false,
                w.opacity = 1,
                w.transparent = false,
                w.alphaHash = false,
                w.blendSrc = d.ie2,
                w.blendDst = d.OuU,
                w.blendEquation = d.gO9,
                w.blendSrcAlpha = null,
                w.blendDstAlpha = null,
                w.blendEquationAlpha = null,
                w.blendColor = new H.Q(0,0,0),
                w.blendAlpha = 0,
                w.depthFunc = d.xSv,
                w.depthTest = true,
                w.depthWrite = true,
                w.stencilWriteMask = 0xff,
                w.stencilFunc = d.sKt,
                w.stencilRef = 0,
                w.stencilFuncMask = 0xff,
                w.stencilFail = d.VVr,
                w.stencilZFail = d.VVr,
                w.stencilZPass = d.VVr,
                w.stencilWrite = false,
                w.clippingPlanes = null,
                w.clipIntersection = false,
                w.clipShadows = false,
                w.shadowSide = null,
                w.colorWrite = true,
                w.precision = null,
                w.polygonOffset = false,
                w.polygonOffsetFactor = 0,
                w.polygonOffsetUnits = 0,
                w.dithering = false,
                w.alphaToCoverage = false,
                w.premultipliedAlpha = false,
                w.forceSinglePass = false,
                w.visible = true,
                w.toneMapped = true,
                w.userData = {},
                w.version = 0,
                w._alphaTest = 0,
                w;
            }
            (0,
            R.A)(X, M);
            var m = X.prototype;
            return m.onBuild = function() {}
            ,
            m.onBeforeRender = function() {}
            ,
            m.onBeforeCompile = function() {}
            ,
            m.customProgramCacheKey = function() {
                return this.onBeforeCompile.toString();
            }
            ,
            m.setValues = function(w) {
                if (undefined !== w)
                    for (var C in w) {
                        var N = w[C];
                        if (undefined !== N) {
                            var Z = this[C];
                            undefined !== Z ? Z && Z.isColor ? Z.set(N) : Z && Z.isVector3 && N && N.isVector3 ? Z.copy(N) : this[C] = N : console.warn('THREE.Material: \x27' + C + '\x27 is not a property of THREE.' + this.type + '.');
                        } else
                            console.warn('THREE.Material: parameter \x27' + C + '\x27 has value of undefined.');
                    }
            }
            ,
            m.toJSON = function(w) {
                var C = undefined === w || 'string' == typeof w;
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
                        delete k.metadata,
                        V.push(k);
                    }
                    return V;
                }
                if (N.uuid = this.uuid,
                N.type = this.type,
                '' !== this.name && (N.name = this.name),
                this.color && this.color.isColor && (N.color = this.color.getHex()),
                undefined !== this.roughness && (N.roughness = this.roughness),
                undefined !== this.metalness && (N.metalness = this.metalness),
                undefined !== this.sheen && (N.sheen = this.sheen),
                this.sheenColor && this.sheenColor.isColor && (N.sheenColor = this.sheenColor.getHex()),
                undefined !== this.sheenRoughness && (N.sheenRoughness = this.sheenRoughness),
                this.emissive && this.emissive.isColor && (N.emissive = this.emissive.getHex()),
                this.emissiveIntensity && 1 !== this.emissiveIntensity && (N.emissiveIntensity = this.emissiveIntensity),
                this.specular && this.specular.isColor && (N.specular = this.specular.getHex()),
                undefined !== this.specularIntensity && (N.specularIntensity = this.specularIntensity),
                this.specularColor && this.specularColor.isColor && (N.specularColor = this.specularColor.getHex()),
                undefined !== this.shininess && (N.shininess = this.shininess),
                undefined !== this.clearcoat && (N.clearcoat = this.clearcoat),
                undefined !== this.clearcoatRoughness && (N.clearcoatRoughness = this.clearcoatRoughness),
                this.clearcoatMap && this.clearcoatMap.isTexture && (N.clearcoatMap = this.clearcoatMap.toJSON(w).uuid),
                this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (N.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(w).uuid),
                this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (N.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(w).uuid,
                N.clearcoatNormalScale = this.clearcoatNormalScale.toArray()),
                undefined !== this.iridescence && (N.iridescence = this.iridescence),
                undefined !== this.iridescenceIOR && (N.iridescenceIOR = this.iridescenceIOR),
                undefined !== this.iridescenceThicknessRange && (N.iridescenceThicknessRange = this.iridescenceThicknessRange),
                this.iridescenceMap && this.iridescenceMap.isTexture && (N.iridescenceMap = this.iridescenceMap.toJSON(w).uuid),
                this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (N.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(w).uuid),
                undefined !== this.anisotropy && (N.anisotropy = this.anisotropy),
                undefined !== this.anisotropyRotation && (N.anisotropyRotation = this.anisotropyRotation),
                this.anisotropyMap && this.anisotropyMap.isTexture && (N.anisotropyMap = this.anisotropyMap.toJSON(w).uuid),
                this.map && this.map.isTexture && (N.map = this.map.toJSON(w).uuid),
                this.matcap && this.matcap.isTexture && (N.matcap = this.matcap.toJSON(w).uuid),
                this.alphaMap && this.alphaMap.isTexture && (N.alphaMap = this.alphaMap.toJSON(w).uuid),
                this.lightMap && this.lightMap.isTexture && (N.lightMap = this.lightMap.toJSON(w).uuid,
                N.lightMapIntensity = this.lightMapIntensity),
                this.aoMap && this.aoMap.isTexture && (N.aoMap = this.aoMap.toJSON(w).uuid,
                N.aoMapIntensity = this.aoMapIntensity),
                this.bumpMap && this.bumpMap.isTexture && (N.bumpMap = this.bumpMap.toJSON(w).uuid,
                N.bumpScale = this.bumpScale),
                this.normalMap && this.normalMap.isTexture && (N.normalMap = this.normalMap.toJSON(w).uuid,
                N.normalMapType = this.normalMapType,
                N.normalScale = this.normalScale.toArray()),
                this.displacementMap && this.displacementMap.isTexture && (N.displacementMap = this.displacementMap.toJSON(w).uuid,
                N.displacementScale = this.displacementScale,
                N.displacementBias = this.displacementBias),
                this.roughnessMap && this.roughnessMap.isTexture && (N.roughnessMap = this.roughnessMap.toJSON(w).uuid),
                this.metalnessMap && this.metalnessMap.isTexture && (N.metalnessMap = this.metalnessMap.toJSON(w).uuid),
                this.emissiveMap && this.emissiveMap.isTexture && (N.emissiveMap = this.emissiveMap.toJSON(w).uuid),
                this.specularMap && this.specularMap.isTexture && (N.specularMap = this.specularMap.toJSON(w).uuid),
                this.specularIntensityMap && this.specularIntensityMap.isTexture && (N.specularIntensityMap = this.specularIntensityMap.toJSON(w).uuid),
                this.specularColorMap && this.specularColorMap.isTexture && (N.specularColorMap = this.specularColorMap.toJSON(w).uuid),
                this.envMap && this.envMap.isTexture && (N.envMap = this.envMap.toJSON(w).uuid,
                undefined !== this.combine && (N.combine = this.combine)),
                undefined !== this.envMapIntensity && (N.envMapIntensity = this.envMapIntensity),
                undefined !== this.reflectivity && (N.reflectivity = this.reflectivity),
                undefined !== this.refractionRatio && (N.refractionRatio = this.refractionRatio),
                this.gradientMap && this.gradientMap.isTexture && (N.gradientMap = this.gradientMap.toJSON(w).uuid),
                undefined !== this.transmission && (N.transmission = this.transmission),
                this.transmissionMap && this.transmissionMap.isTexture && (N.transmissionMap = this.transmissionMap.toJSON(w).uuid),
                undefined !== this.thickness && (N.thickness = this.thickness),
                this.thicknessMap && this.thicknessMap.isTexture && (N.thicknessMap = this.thicknessMap.toJSON(w).uuid),
                undefined !== this.attenuationDistance && this.attenuationDistance !== 1 / 0 && (N.attenuationDistance = this.attenuationDistance),
                undefined !== this.attenuationColor && (N.attenuationColor = this.attenuationColor.getHex()),
                undefined !== this.size && (N.size = this.size),
                null !== this.shadowSide && (N.shadowSide = this.shadowSide),
                undefined !== this.sizeAttenuation && (N.sizeAttenuation = this.sizeAttenuation),
                this.blending !== d.NTi && (N.blending = this.blending),
                this.side !== d.hB5 && (N.side = this.side),
                true === this.vertexColors && (N.vertexColors = true),
                this.opacity < 1 && (N.opacity = this.opacity),
                true === this.transparent && (N.transparent = true),
                this.blendSrc !== d.ie2 && (N.blendSrc = this.blendSrc),
                this.blendDst !== d.OuU && (N.blendDst = this.blendDst),
                this.blendEquation !== d.gO9 && (N.blendEquation = this.blendEquation),
                null !== this.blendSrcAlpha && (N.blendSrcAlpha = this.blendSrcAlpha),
                null !== this.blendDstAlpha && (N.blendDstAlpha = this.blendDstAlpha),
                null !== this.blendEquationAlpha && (N.blendEquationAlpha = this.blendEquationAlpha),
                this.blendColor && this.blendColor.isColor && (N.blendColor = this.blendColor.getHex()),
                0 !== this.blendAlpha && (N.blendAlpha = this.blendAlpha),
                this.depthFunc !== d.xSv && (N.depthFunc = this.depthFunc),
                false === this.depthTest && (N.depthTest = this.depthTest),
                false === this.depthWrite && (N.depthWrite = this.depthWrite),
                false === this.colorWrite && (N.colorWrite = this.colorWrite),
                0xff !== this.stencilWriteMask && (N.stencilWriteMask = this.stencilWriteMask),
                this.stencilFunc !== d.sKt && (N.stencilFunc = this.stencilFunc),
                0 !== this.stencilRef && (N.stencilRef = this.stencilRef),
                0xff !== this.stencilFuncMask && (N.stencilFuncMask = this.stencilFuncMask),
                this.stencilFail !== d.VVr && (N.stencilFail = this.stencilFail),
                this.stencilZFail !== d.VVr && (N.stencilZFail = this.stencilZFail),
                this.stencilZPass !== d.VVr && (N.stencilZPass = this.stencilZPass),
                true === this.stencilWrite && (N.stencilWrite = this.stencilWrite),
                undefined !== this.rotation && 0 !== this.rotation && (N.rotation = this.rotation),
                true === this.polygonOffset && (N.polygonOffset = true),
                0 !== this.polygonOffsetFactor && (N.polygonOffsetFactor = this.polygonOffsetFactor),
                0 !== this.polygonOffsetUnits && (N.polygonOffsetUnits = this.polygonOffsetUnits),
                undefined !== this.linewidth && 1 !== this.linewidth && (N.linewidth = this.linewidth),
                undefined !== this.dashSize && (N.dashSize = this.dashSize),
                undefined !== this.gapSize && (N.gapSize = this.gapSize),
                undefined !== this.scale && (N.scale = this.scale),
                true === this.dithering && (N.dithering = true),
                this.alphaTest > 0 && (N.alphaTest = this.alphaTest),
                true === this.alphaHash && (N.alphaHash = true),
                true === this.alphaToCoverage && (N.alphaToCoverage = true),
                true === this.premultipliedAlpha && (N.premultipliedAlpha = true),
                true === this.forceSinglePass && (N.forceSinglePass = true),
                true === this.wireframe && (N.wireframe = true),
                this.wireframeLinewidth > 1 && (N.wireframeLinewidth = this.wireframeLinewidth),
                'round' !== this.wireframeLinecap && (N.wireframeLinecap = this.wireframeLinecap),
                'round' !== this.wireframeLinejoin && (N.wireframeLinejoin = this.wireframeLinejoin),
                true === this.flatShading && (N.flatShading = true),
                false === this.visible && (N.visible = false),
                false === this.toneMapped && (N.toneMapped = false),
                false === this.fog && (N.fog = false),
                Object.keys(this.userData).length > 0 && (N.userData = this.userData),
                C) {
                    var h = Z(w.textures)
                      , U = Z(w.images);
                    h.length > 0 && (N.textures = h),
                    U.length > 0 && (N.images = U);
                }
                return N;
            }
            ,
            m.clone = function() {
                return new this.constructor().copy(this);
            }
            ,
            m.copy = function(w) {
                this.name = w.name,
                this.blending = w.blending,
                this.side = w.side,
                this.vertexColors = w.vertexColors,
                this.opacity = w.opacity,
                this.transparent = w.transparent,
                this.blendSrc = w.blendSrc,
                this.blendDst = w.blendDst,
                this.blendEquation = w.blendEquation,
                this.blendSrcAlpha = w.blendSrcAlpha,
                this.blendDstAlpha = w.blendDstAlpha,
                this.blendEquationAlpha = w.blendEquationAlpha,
                this.blendColor.copy(w.blendColor),
                this.blendAlpha = w.blendAlpha,
                this.depthFunc = w.depthFunc,
                this.depthTest = w.depthTest,
                this.depthWrite = w.depthWrite,
                this.stencilWriteMask = w.stencilWriteMask,
                this.stencilFunc = w.stencilFunc,
                this.stencilRef = w.stencilRef,
                this.stencilFuncMask = w.stencilFuncMask,
                this.stencilFail = w.stencilFail,
                this.stencilZFail = w.stencilZFail,
                this.stencilZPass = w.stencilZPass,
                this.stencilWrite = w.stencilWrite;
                var C = w.clippingPlanes
                  , N = null;
                if (null !== C) {
                    var Z = C.length;
                    N = new Array(Z);
                    for (var h = 0; h !== Z; ++h)
                        N[h] = C[h].clone();
                }
                return this.clippingPlanes = N,
                this.clipIntersection = w.clipIntersection,
                this.clipShadows = w.clipShadows,
                this.shadowSide = w.shadowSide,
                this.colorWrite = w.colorWrite,
                this.precision = w.precision,
                this.polygonOffset = w.polygonOffset,
                this.polygonOffsetFactor = w.polygonOffsetFactor,
                this.polygonOffsetUnits = w.polygonOffsetUnits,
                this.dithering = w.dithering,
                this.alphaTest = w.alphaTest,
                this.alphaHash = w.alphaHash,
                this.alphaToCoverage = w.alphaToCoverage,
                this.premultipliedAlpha = w.premultipliedAlpha,
                this.forceSinglePass = w.forceSinglePass,
                this.visible = w.visible,
                this.toneMapped = w.toneMapped,
                this.userData = JSON.parse(JSON.stringify(w.userData)),
                this;
            }
            ,
            m.dispose = function() {
                this.dispatchEvent({
                    'type': 'dispose'
                });
            }
            ,
            (0,
            S.A)(X, [{
                'key': 'alphaTest',
                'get': function() {
                    return this._alphaTest;
                },
                'set': function(w) {
                    this._alphaTest > 0 != w > 0 && this.version++,
                    this._alphaTest = w;
                }
            }, {
                'key': 'needsUpdate',
                'set': function(w) {
                    true === w && this.version++;
                }
            }]);
        }(y.Q);
    }
    ,
    0x14baa: (F, E, p) => {
        p.d(E, {
            'V': () => d
        });
        var S = p(0x12e4b)
          , R = p(0x10849)
          , H = p(0x172d2)
          , y = p(0x169b1)
          , d = function(P) {
            function Q(B) {
                var M;
                return (M = P.call(this) || this).isMeshBasicMaterial = true,
                M.type = 'MeshBasicMaterial',
                M.color = new y.Q(0xffffff),
                M.map = null,
                M.lightMap = null,
                M.lightMapIntensity = 1,
                M.aoMap = null,
                M.aoMapIntensity = 1,
                M.specularMap = null,
                M.alphaMap = null,
                M.envMap = null,
                M.combine = H.caT,
                M.reflectivity = 1,
                M.refractionRatio = 0.98,
                M.wireframe = false,
                M.wireframeLinewidth = 1,
                M.wireframeLinecap = 'round',
                M.wireframeLinejoin = 'round',
                M.fog = true,
                M.setValues(B),
                M;
            }
            return (0,
            S.A)(Q, P),
            Q.prototype.copy = function(B) {
                return P.prototype.copy.call(this, B),
                this.color.copy(B.color),
                this.map = B.map,
                this.lightMap = B.lightMap,
                this.lightMapIntensity = B.lightMapIntensity,
                this.aoMap = B.aoMap,
                this.aoMapIntensity = B.aoMapIntensity,
                this.specularMap = B.specularMap,
                this.alphaMap = B.alphaMap,
                this.envMap = B.envMap,
                this.combine = B.combine,
                this.reflectivity = B.reflectivity,
                this.refractionRatio = B.refractionRatio,
                this.wireframe = B.wireframe,
                this.wireframeLinewidth = B.wireframeLinewidth,
                this.wireframeLinecap = B.wireframeLinecap,
                this.wireframeLinejoin = B.wireframeLinejoin,
                this.fog = B.fog,
                this;
            }
            ,
            Q;
        }(R.i);
    }
    ,
    0x1bfd: (F, E, p) => {
        p.d(E, {
            'C': () => y
        });
        var S = p(0x12e4b)
          , R = p(0x10849)
          , H = p(0x172d2)
          , y = function(d) {
            function P(Q) {
                var B;
                return (B = d.call(this) || this).isMeshDepthMaterial = true,
                B.type = 'MeshDepthMaterial',
                B.depthPacking = H.Rkk,
                B.map = null,
                B.alphaMap = null,
                B.displacementMap = null,
                B.displacementScale = 1,
                B.displacementBias = 0,
                B.wireframe = false,
                B.wireframeLinewidth = 1,
                B.setValues(Q),
                B;
            }
            return (0,
            S.A)(P, d),
            P.prototype.copy = function(Q) {
                return d.prototype.copy.call(this, Q),
                this.depthPacking = Q.depthPacking,
                this.map = Q.map,
                this.alphaMap = Q.alphaMap,
                this.displacementMap = Q.displacementMap,
                this.displacementScale = Q.displacementScale,
                this.displacementBias = Q.displacementBias,
                this.wireframe = Q.wireframe,
                this.wireframeLinewidth = Q.wireframeLinewidth,
                this;
            }
            ,
            P;
        }(R.i);
    }
    ,
    0x11833: (F, E, p) => {
        p.d(E, {
            'a': () => R
        });
        var S = p(0x12e4b)
          , R = function(H) {
            function y(d) {
                var P;
                return (P = H.call(this) || this).isMeshDistanceMaterial = true,
                P.type = 'MeshDistanceMaterial',
                P.map = null,
                P.alphaMap = null,
                P.displacementMap = null,
                P.displacementScale = 1,
                P.displacementBias = 0,
                P.setValues(d),
                P;
            }
            return (0,
            S.A)(y, H),
            y.prototype.copy = function(d) {
                return H.prototype.copy.call(this, d),
                this.map = d.map,
                this.alphaMap = d.alphaMap,
                this.displacementMap = d.displacementMap,
                this.displacementScale = d.displacementScale,
                this.displacementBias = d.displacementBias,
                this;
            }
            ,
            y;
        }(p(0x10849).i);
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
        p.d(E, {
            'B': () => y
        });
        var S = p(0x12e4b)
          , R = p(0x10849)
          , H = p(0x41ef)
          , y = function(d) {
            function P(B) {
                var M;
                return (M = d.call(this) || this).isShaderMaterial = true,
                M.type = 'ShaderMaterial',
                M.defines = {},
                M.uniforms = {},
                M.uniformsGroups = [],
                M.vertexShader = '\nvoid main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n',
                M.fragmentShader = '\nvoid main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}\n',
                M.linewidth = 1,
                M.wireframe = false,
                M.wireframeLinewidth = 1,
                M.fog = false,
                M.lights = false,
                M.clipping = false,
                M.forceSinglePass = true,
                M.extensions = {
                    'derivatives': false,
                    'fragDepth': false,
                    'drawBuffers': false,
                    'shaderTextureLOD': false
                },
                M.defaultAttributeValues = {
                    'color': [1, 1, 1],
                    'uv': [0, 0],
                    'uv1': [0, 0]
                },
                M.index0AttributeName = undefined,
                M.uniformsNeedUpdate = false,
                M.glslVersion = null,
                undefined !== B && M.setValues(B),
                M;
            }
            (0,
            S.A)(P, d);
            var Q = P.prototype;
            return Q.copy = function(B) {
                return d.prototype.copy.call(this, B),
                this.fragmentShader = B.fragmentShader,
                this.vertexShader = B.vertexShader,
                this.uniforms = (0,
                H.lx)(B.uniforms),
                this.uniformsGroups = (0,
                H.Jd)(B.uniformsGroups),
                this.defines = Object.assign({}, B.defines),
                this.wireframe = B.wireframe,
                this.wireframeLinewidth = B.wireframeLinewidth,
                this.fog = B.fog,
                this.lights = B.lights,
                this.clipping = B.clipping,
                this.extensions = Object.assign({}, B.extensions),
                this.glslVersion = B.glslVersion,
                this;
            }
            ,
            Q.toJSON = function(B) {
                var M = d.prototype.toJSON.call(this, B);
                for (var X in (M.glslVersion = this.glslVersion,
                M.uniforms = {},
                this.uniforms)) {
                    var m = this.uniforms[X].value;
                    m && m.isTexture ? M.uniforms[X] = {
                        'type': 't',
                        'value': m.toJSON(B).uuid
                    } : m && m.isColor ? M.uniforms[X] = {
                        'type': 'c',
                        'value': m.getHex()
                    } : m && m.isVector2 ? M.uniforms[X] = {
                        'type': 'v2',
                        'value': m.toArray()
                    } : m && m.isVector3 ? M.uniforms[X] = {
                        'type': 'v3',
                        'value': m.toArray()
                    } : m && m.isVector4 ? M.uniforms[X] = {
                        'type': 'v4',
                        'value': m.toArray()
                    } : m && m.isMatrix3 ? M.uniforms[X] = {
                        'type': 'm3',
                        'value': m.toArray()
                    } : m && m.isMatrix4 ? M.uniforms[X] = {
                        'type': 'm4',
                        'value': m.toArray()
                    } : M.uniforms[X] = {
                        'value': m
                    };
                }
                Object.keys(this.defines).length > 0 && (M.defines = this.defines),
                M.vertexShader = this.vertexShader,
                M.fragmentShader = this.fragmentShader,
                M.lights = this.lights,
                M.clipping = this.clipping;
                var w = {};
                for (var l in this.extensions)
                    true === this.extensions[l] && (w[l] = true);
                return Object.keys(w).length > 0 && (M.extensions = w),
                M;
            }
            ,
            P;
        }(R.i);
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
        S.d(E, {
            'N': () => H
        });
        var R = S(0x1008e)
          , H = (function() {
            function k(x, I) {
                undefined === x && (x = new R.P(1 / 0,1 / 0,1 / 0)),
                undefined === I && (I = new R.P(-1 / 0,-1 / 0,-1 / 0)),
                this.isBox3 = true,
                this.min = x,
                this.max = I;
            }
            var W = k.prototype;
            return W.set = function(x, I) {
                return this.min.copy(x),
                this.max.copy(I),
                this;
            }
            ,
            W.setFromArray = function(x) {
                this.makeEmpty();
                for (var I = 0, L = x.length; I < L; I += 3)
                    this.expandByPoint(P.fromArray(x, I));
                return this;
            }
            ,
            W.setFromBufferAttribute = function(x) {
                this.makeEmpty();
                for (var I = 0, L = x.count; I < L; I++)
                    this.expandByPoint(P.fromBufferAttribute(x, I));
                return this;
            }
            ,
            W.setFromPoints = function(x) {
                this.makeEmpty();
                for (var I = 0, L = x.length; I < L; I++)
                    this.expandByPoint(x[I]);
                return this;
            }
            ,
            W.setFromCenterAndSize = function(x, I) {
                var L = P.copy(I).multiplyScalar(0.5);
                return this.min.copy(x).sub(L),
                this.max.copy(x).add(L),
                this;
            }
            ,
            W.setFromObject = function(x, I) {
                return undefined === I && (I = false),
                this.makeEmpty(),
                this.expandByObject(x, I);
            }
            ,
            W.clone = function() {
                return new this.constructor().copy(this);
            }
            ,
            W.copy = function(x) {
                return this.min.copy(x.min),
                this.max.copy(x.max),
                this;
            }
            ,
            W.makeEmpty = function() {
                return this.min.x = this.min.y = this.min.z = 1 / 0,
                this.max.x = this.max.y = this.max.z = -1 / 0,
                this;
            }
            ,
            W.isEmpty = function() {
                return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
            }
            ,
            W.getCenter = function(x) {
                return this.isEmpty() ? x.set(0, 0, 0) : x.addVectors(this.min, this.max).multiplyScalar(0.5);
            }
            ,
            W.getSize = function(x) {
                return this.isEmpty() ? x.set(0, 0, 0) : x.subVectors(this.max, this.min);
            }
            ,
            W.expandByPoint = function(x) {
                return this.min.min(x),
                this.max.max(x),
                this;
            }
            ,
            W.expandByVector = function(x) {
                return this.min.sub(x),
                this.max.add(x),
                this;
            }
            ,
            W.expandByScalar = function(x) {
                return this.min.addScalar(-x),
                this.max.addScalar(x),
                this;
            }
            ,
            W.expandByObject = function(x, I) {
                undefined === I && (I = false),
                x.updateWorldMatrix(false, false);
                var L = x.geometry;
                if (undefined !== L) {
                    var q = L.getAttribute('position');
                    if (true === I && undefined !== q && true !== x.isInstancedMesh) {
                        for (var K = 0, Y = q.count; K < Y; K++)
                            true === x.isMesh ? x.getVertexPosition(K, P) : P.fromBufferAttribute(q, K),
                            P.applyMatrix4(x.matrixWorld),
                            this.expandByPoint(P);
                    } else
                        undefined !== x.boundingBox ? (null === x.boundingBox && x.computeBoundingBox(),
                        Q.copy(x.boundingBox)) : (null === L.boundingBox && L.computeBoundingBox(),
                        Q.copy(L.boundingBox)),
                        Q.applyMatrix4(x.matrixWorld),
                        this.union(Q);
                }
                for (var z = x.children, A = 0, j = z.length; A < j; A++)
                    this.expandByObject(z[A], I);
                return this;
            }
            ,
            W.containsPoint = function(x) {
                return !(x.x < this.min.x || x.x > this.max.x || x.y < this.min.y || x.y > this.max.y || x.z < this.min.z || x.z > this.max.z);
            }
            ,
            W.containsBox = function(x) {
                return this.min.x <= x.min.x && x.max.x <= this.max.x && this.min.y <= x.min.y && x.max.y <= this.max.y && this.min.z <= x.min.z && x.max.z <= this.max.z;
            }
            ,
            W.getParameter = function(x, I) {
                return I.set((x.x - this.min.x) / (this.max.x - this.min.x), (x.y - this.min.y) / (this.max.y - this.min.y), (x.z - this.min.z) / (this.max.z - this.min.z));
            }
            ,
            W.intersectsBox = function(x) {
                return !(x.max.x < this.min.x || x.min.x > this.max.x || x.max.y < this.min.y || x.min.y > this.max.y || x.max.z < this.min.z || x.min.z > this.max.z);
            }
            ,
            W.intersectsSphere = function(x) {
                return this.clampPoint(x.center, P),
                P.distanceToSquared(x.center) <= x.radius * x.radius;
            }
            ,
            W.intersectsPlane = function(x) {
                var I, L;
                return x.normal.x > 0 ? (I = x.normal.x * this.min.x,
                L = x.normal.x * this.max.x) : (I = x.normal.x * this.max.x,
                L = x.normal.x * this.min.x),
                x.normal.y > 0 ? (I += x.normal.y * this.min.y,
                L += x.normal.y * this.max.y) : (I += x.normal.y * this.max.y,
                L += x.normal.y * this.min.y),
                x.normal.z > 0 ? (I += x.normal.z * this.min.z,
                L += x.normal.z * this.max.z) : (I += x.normal.z * this.max.z,
                L += x.normal.z * this.min.z),
                I <= -x.constant && L >= -x.constant;
            }
            ,
            W.intersectsTriangle = function(x) {
                if (this.isEmpty())
                    return false;
                this.getCenter(Z),
                U.subVectors(this.max, Z),
                B.subVectors(x.a, Z),
                M.subVectors(x.b, Z),
                X.subVectors(x.c, Z),
                w.subVectors(M, B),
                C.subVectors(X, M),
                N.subVectors(B, X);
                var I = [0, -w.z, w.y, 0, -C.z, C.y, 0, -N.z, N.y, w.z, 0, -w.x, C.z, 0, -C.x, N.z, 0, -N.x, -w.y, w.x, 0, -C.y, C.x, 0, -N.y, N.x, 0];
                return !!G(I, B, M, X, U) && (!!G(I = [1, 0, 0, 0, 1, 0, 0, 0, 1], B, M, X, U) && (T.crossVectors(w, C),
                G(I = [T.x, T.y, T.z], B, M, X, U)));
            }
            ,
            W.clampPoint = function(x, I) {
                return I.copy(x).clamp(this.min, this.max);
            }
            ,
            W.distanceToPoint = function(x) {
                return this.clampPoint(x, P).distanceTo(x);
            }
            ,
            W.getBoundingSphere = function(x) {
                return this.isEmpty() ? x.makeEmpty() : (this.getCenter(x.center),
                x.radius = 0.5 * this.getSize(P).length()),
                x;
            }
            ,
            W.intersect = function(x) {
                return this.min.max(x.min),
                this.max.min(x.max),
                this.isEmpty() && this.makeEmpty(),
                this;
            }
            ,
            W.union = function(x) {
                return this.min.min(x.min),
                this.max.max(x.max),
                this;
            }
            ,
            W.applyMatrix4 = function(x) {
                return this.isEmpty() || (y[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(x),
                y[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(x),
                y[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(x),
                y[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(x),
                y[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(x),
                y[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(x),
                y[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(x),
                y[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(x),
                this.setFromPoints(y)),
                this;
            }
            ,
            W.translate = function(x) {
                return this.min.add(x),
                this.max.add(x),
                this;
            }
            ,
            W.equals = function(x) {
                return x.min.equals(this.min) && x.max.equals(this.max);
            }
            ,
            k;
        }())
          , y = [new R.P(), new R.P(), new R.P(), new R.P(), new R.P(), new R.P(), new R.P(), new R.P()]
          , P = new R.P()
          , Q = new H()
          , B = new R.P()
          , M = new R.P()
          , X = new R.P()
          , w = new R.P()
          , C = new R.P()
          , N = new R.P()
          , Z = new R.P()
          , U = new R.P()
          , T = new R.P()
          , V = new R.P();
        function G(k, W, x, I, L) {
            for (var q = 0, K = k.length - 3; q <= K; q += 3) {
                V.fromArray(k, q);
                var Y = L.x * Math.abs(V.x) + L.y * Math.abs(V.y) + L.z * Math.abs(V.z)
                  , z = W.dot(V)
                  , A = x.dot(V)
                  , j = I.dot(V);
                if (Math.max(-Math.max(z, A, j), Math.min(z, A, j)) > Y)
                    return false;
            }
            return true;
        }
    }
    ,
    0x169b1: (F, E, p) => {
        p.d(E, {
            'Q': () => m
        });
        var S = p(0xd5e4)
          , R = p.n(S)
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
            'black': 0,
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
            'h': 0,
            's': 0,
            'l': 0
        }
          , M = {
            'h': 0,
            's': 0,
            'l': 0
        };
        function X(C, N, Z) {
            return Z < 0 && (Z += 1),
            Z > 1 && (Z -= 1),
            Z < 1 / 6 ? C + 6 * (N - C) * Z : Z < 0.5 ? N : Z < 2 / 3 ? C + 6 * (N - C) * (2 / 3 - Z) : C;
        }
        var m = (function() {
            function C(Z, U, T) {
                return this.isColor = true,
                this.r = 1,
                this.g = 1,
                this.b = 1,
                this.set(Z, U, T);
            }
            var N = C.prototype;
            return N.set = function(Z, U, T) {
                if (undefined === U && undefined === T) {
                    var V = Z;
                    V && V.isColor ? this.copy(V) : 'number' == typeof V ? this.setHex(V) : 'string' == typeof V && this.setStyle(V);
                } else
                    this.setRGB(Z, U, T);
                return this;
            }
            ,
            N.setScalar = function(Z) {
                return this.r = Z,
                this.g = Z,
                this.b = Z,
                this;
            }
            ,
            N.setHex = function(Z, U) {
                return undefined === U && (U = P['er$']),
                Z = Math.floor(Z),
                this.r = (Z >> 0x10 & 0xff) / 0xff,
                this.g = (Z >> 8 & 0xff) / 0xff,
                this.b = (0xff & Z) / 0xff,
                y.pp.toWorkingColorSpace(this, U),
                this;
            }
            ,
            N.setRGB = function(Z, U, T, V) {
                return undefined === V && (V = y.pp.workingColorSpace),
                this.r = Z,
                this.g = U,
                this.b = T,
                y.pp.toWorkingColorSpace(this, V),
                this;
            }
            ,
            N.setHSL = function(Z, U, T, V) {
                if (undefined === V && (V = y.pp.workingColorSpace),
                Z = (0,
                H.rl)(Z, 1),
                U = (0,
                H.qE)(U, 0, 1),
                T = (0,
                H.qE)(T, 0, 1),
                0 === U)
                    this.r = this.g = this.b = T;
                else {
                    var G = T <= 0.5 ? T * (1 + U) : T + U - T * U
                      , k = 2 * T - G;
                    this.r = X(k, G, Z + 1 / 3),
                    this.g = X(k, G, Z),
                    this.b = X(k, G, Z - 1 / 3);
                }
                return y.pp.toWorkingColorSpace(this, V),
                this;
            }
            ,
            N.setStyle = function(Z, U) {
                function T(g) {
                    undefined !== g && parseFloat(g) < 1 && console.warn('THREE.Color: Alpha component of ' + Z + ' will be ignored.');
                }
                var V;
                if (undefined === U && (U = P['er$']),
                V = /^(\w+)\(([^\)]*)\)/.exec(Z)) {
                    var G, k = V[1], W = V[2];
                    switch (k) {
                    case 'rgb':
                    case 'rgba':
                        if (G = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(W))
                            return T(G[4]),
                            this.setRGB(Math.min(0xff, parseInt(G[1], 10)) / 0xff, Math.min(0xff, parseInt(G[2], 10)) / 0xff, Math.min(0xff, parseInt(G[3], 10)) / 0xff, U);
                        if (G = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(W))
                            return T(G[4]),
                            this.setRGB(Math.min(0x64, parseInt(G[1], 10)) / 0x64, Math.min(0x64, parseInt(G[2], 10)) / 0x64, Math.min(0x64, parseInt(G[3], 10)) / 0x64, U);
                        break;
                    case 'hsl':
                    case 'hsla':
                        if (G = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(W))
                            return T(G[4]),
                            this.setHSL(parseFloat(G[1]) / 0x168, parseFloat(G[2]) / 0x64, parseFloat(G[3]) / 0x64, U);
                        break;
                    default:
                        console.warn('THREE.Color: Unknown color model ' + Z);
                    }
                } else {
                    if (V = /^\#([A-Fa-f\d]+)$/.exec(Z)) {
                        var x = V[1]
                          , I = x.length;
                        if (3 === I)
                            return this.setRGB(parseInt(x.charAt(0), 0x10) / 15, parseInt(x.charAt(1), 0x10) / 15, parseInt(x.charAt(2), 0x10) / 15, U);
                        if (6 === I)
                            return this.setHex(parseInt(x, 0x10), U);
                        console.warn('THREE.Color: Invalid hex color ' + Z);
                    } else {
                        if (Z && Z.length > 0)
                            return this.setColorName(Z, U);
                    }
                }
                return this;
            }
            ,
            N.setColorName = function(Z, U) {
                undefined === U && (U = P['er$']);
                var T = Q[Z.toLowerCase()];
                return undefined !== T ? this.setHex(T, U) : console.warn('THREE.Color: Unknown color ' + Z),
                this;
            }
            ,
            N.clone = function() {
                return new this.constructor(this.r,this.g,this.b);
            }
            ,
            N.copy = function(Z) {
                return this.r = Z.r,
                this.g = Z.g,
                this.b = Z.b,
                this;
            }
            ,
            N.copySRGBToLinear = function(Z) {
                return this.r = (0,
                y.dk)(Z.r),
                this.g = (0,
                y.dk)(Z.g),
                this.b = (0,
                y.dk)(Z.b),
                this;
            }
            ,
            N.copyLinearToSRGB = function(Z) {
                return this.r = (0,
                y.rd)(Z.r),
                this.g = (0,
                y.rd)(Z.g),
                this.b = (0,
                y.rd)(Z.b),
                this;
            }
            ,
            N.convertSRGBToLinear = function() {
                return this.copySRGBToLinear(this),
                this;
            }
            ,
            N.convertLinearToSRGB = function() {
                return this.copyLinearToSRGB(this),
                this;
            }
            ,
            N.getHex = function(Z) {
                return undefined === Z && (Z = P['er$']),
                y.pp.fromWorkingColorSpace(w.copy(this), Z),
                0x10000 * Math.round((0,
                H.qE)(0xff * w.r, 0, 0xff)) + 0x100 * Math.round((0,
                H.qE)(0xff * w.g, 0, 0xff)) + Math.round((0,
                H.qE)(0xff * w.b, 0, 0xff));
            }
            ,
            N.getHexString = function(Z) {
                return undefined === Z && (Z = P['er$']),
                ('000000' + this.getHex(Z).toString(0x10)).slice(-6);
            }
            ,
            N.getHSL = function(Z, U) {
                undefined === U && (U = y.pp.workingColorSpace),
                y.pp.fromWorkingColorSpace(w.copy(this), U);
                var T, V, G = w.r, k = w.g, W = w.b, x = Math.max(G, k, W), I = Math.min(G, k, W), g = (I + x) / 2;
                if (I === x)
                    T = 0,
                    V = 0;
                else {
                    var L = x - I;
                    switch (V = g <= 0.5 ? L / (x + I) : L / (2 - x - I),
                    x) {
                    case G:
                        T = (k - W) / L + (k < W ? 6 : 0);
                        break;
                    case k:
                        T = (W - G) / L + 2;
                        break;
                    case W:
                        T = (G - k) / L + 4;
                    }
                    T /= 6;
                }
                return Z.h = T,
                Z.s = V,
                Z.l = g,
                Z;
            }
            ,
            N.getRGB = function(Z, U) {
                return undefined === U && (U = y.pp.workingColorSpace),
                y.pp.fromWorkingColorSpace(w.copy(this), U),
                Z.r = w.r,
                Z.g = w.g,
                Z.b = w.b,
                Z;
            }
            ,
            N.getStyle = function(Z) {
                undefined === Z && (Z = P['er$']),
                y.pp.fromWorkingColorSpace(w.copy(this), Z);
                var U = w.r
                  , T = w.g
                  , V = w.b;
                return Z !== P['er$'] ? 'color(' + Z + ' ' + U.toFixed(3) + ' ' + T.toFixed(3) + ' ' + V.toFixed(3) + ')' : 'rgb(' + Math.round(0xff * U) + ',' + Math.round(0xff * T) + ',' + Math.round(0xff * V) + ')';
            }
            ,
            N.offsetHSL = function(Z, U, T) {
                return this.getHSL(B),
                this.setHSL(B.h + Z, B.s + U, B.l + T);
            }
            ,
            N.add = function(Z) {
                return this.r += Z.r,
                this.g += Z.g,
                this.b += Z.b,
                this;
            }
            ,
            N.addColors = function(Z, U) {
                return this.r = Z.r + U.r,
                this.g = Z.g + U.g,
                this.b = Z.b + U.b,
                this;
            }
            ,
            N.addScalar = function(Z) {
                return this.r += Z,
                this.g += Z,
                this.b += Z,
                this;
            }
            ,
            N.sub = function(Z) {
                return this.r = Math.max(0, this.r - Z.r),
                this.g = Math.max(0, this.g - Z.g),
                this.b = Math.max(0, this.b - Z.b),
                this;
            }
            ,
            N.multiply = function(Z) {
                return this.r *= Z.r,
                this.g *= Z.g,
                this.b *= Z.b,
                this;
            }
            ,
            N.multiplyScalar = function(Z) {
                return this.r *= Z,
                this.g *= Z,
                this.b *= Z,
                this;
            }
            ,
            N.lerp = function(Z, U) {
                return this.r += (Z.r - this.r) * U,
                this.g += (Z.g - this.g) * U,
                this.b += (Z.b - this.b) * U,
                this;
            }
            ,
            N.lerpColors = function(Z, U, T) {
                return this.r = Z.r + (U.r - Z.r) * T,
                this.g = Z.g + (U.g - Z.g) * T,
                this.b = Z.b + (U.b - Z.b) * T,
                this;
            }
            ,
            N.lerpHSL = function(Z, U) {
                this.getHSL(B),
                Z.getHSL(M);
                var T = (0,
                H.Cc)(B.h, M.h, U)
                  , V = (0,
                H.Cc)(B.s, M.s, U)
                  , G = (0,
                H.Cc)(B.l, M.l, U);
                return this.setHSL(T, V, G),
                this;
            }
            ,
            N.setFromVector3 = function(Z) {
                return this.r = Z.x,
                this.g = Z.y,
                this.b = Z.z,
                this;
            }
            ,
            N.applyMatrix3 = function(Z) {
                var U = this.r
                  , T = this.g
                  , V = this.b
                  , G = Z.elements;
                return this.r = G[0] * U + G[3] * T + G[6] * V,
                this.g = G[1] * U + G[4] * T + G[7] * V,
                this.b = G[2] * U + G[5] * T + G[8] * V,
                this;
            }
            ,
            N.equals = function(Z) {
                return Z.r === this.r && Z.g === this.g && Z.b === this.b;
            }
            ,
            N.fromArray = function(Z, U) {
                return undefined === U && (U = 0),
                this.r = Z[U],
                this.g = Z[U + 1],
                this.b = Z[U + 2],
                this;
            }
            ,
            N.toArray = function(Z, U) {
                return undefined === Z && (Z = []),
                undefined === U && (U = 0),
                Z[U] = this.r,
                Z[U + 1] = this.g,
                Z[U + 2] = this.b,
                Z;
            }
            ,
            N.fromBufferAttribute = function(Z, U) {
                return this.r = Z.getX(U),
                this.g = Z.getY(U),
                this.b = Z.getZ(U),
                this;
            }
            ,
            N.toJSON = function() {
                return this.getHex();
            }
            ,
            N[Symbol.iterator] = R().mark(function Z() {
                return R().wrap(function(U) {
                    for (; ; )
                        switch (U.prev = U.next) {
                        case 0:
                            return U.next = 2,
                            this.r;
                        case 2:
                            return U.next = 4,
                            this.g;
                        case 4:
                            return U.next = 6,
                            this.b;
                        case 6:
                        case 'end':
                            return U.stop();
                        }
                }, Z, this);
            }),
            C;
        }())
          , w = new m();
        m.NAMES = Q;
    }
    ,
    0x4efe: (F, E, p) => {
        p.d(E, {
            'dk': () => X,
            'pp': () => M,
            'rd': () => m
        });
        var S, R = p(0x172d2), H = p(0x3e78), y = new H.d().set(0.8224621, 0.177538, 0, 0.0331941, 0.9668058, 0, 0.0170827, 0.0723974, 0.9105199), P = new H.d().set(1.2249401, -0.2249404, 0, -0.0420569, 1.0420571, 0, -0.0196376, -0.0786361, 1.0982735), Q = ((S = {})[R.Zr2] = {
            'transfer': R.VxR,
            'primaries': R.z5,
            'toReference': function(w) {
                return w;
            },
            'fromReference': function(w) {
                return w;
            }
        },
        S[R['er$']] = {
            'transfer': R.KLL,
            'primaries': R.z5,
            'toReference': function(w) {
                return w.convertSRGBToLinear();
            },
            'fromReference': function(w) {
                return w.convertLinearToSRGB();
            }
        },
        S[R.qIQ] = {
            'transfer': R.VxR,
            'primaries': R.wqq,
            'toReference': function(w) {
                return w.applyMatrix3(P);
            },
            'fromReference': function(w) {
                return w.applyMatrix3(y);
            }
        },
        S[R.V5c] = {
            'transfer': R.KLL,
            'primaries': R.wqq,
            'toReference': function(w) {
                return w.convertSRGBToLinear().applyMatrix3(P);
            },
            'fromReference': function(w) {
                return w.applyMatrix3(y).convertLinearToSRGB();
            }
        },
        S), B = new Set([R.Zr2, R.qIQ]), M = {
            'enabled': true,
            '_workingColorSpace': R.Zr2,
            get 'legacyMode'() {
                return console.warn('THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150.'),
                !this.enabled;
            },
            set 'legacyMode'(w) {
                console.warn('THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150.'),
                this.enabled = !w;
            },
            get 'workingColorSpace'() {
                return this._workingColorSpace;
            },
            set 'workingColorSpace'(w) {
                if (!B.has(w))
                    throw new Error('Unsupported working color space, \x22' + w + '\x22.');
                this._workingColorSpace = w;
            },
            'convert': function(w, C, N) {
                if (false === this.enabled || C === N || !C || !N)
                    return w;
                var Z = Q[C].toReference;
                return (0,
                Q[N].fromReference)(Z(w));
            },
            'fromWorkingColorSpace': function(w, C) {
                return this.convert(w, this._workingColorSpace, C);
            },
            'toWorkingColorSpace': function(w, C) {
                return this.convert(w, C, this._workingColorSpace);
            },
            'getPrimaries': function(w) {
                return Q[w].primaries;
            },
            'getTransfer': function(w) {
                return w === R.jf0 ? R.VxR : Q[w].transfer;
            }
        };
        function X(w) {
            return w < 0.04045 ? 0.0773993808 * w : Math.pow(0.9478672986 * w + 0.0521327014, 2.4);
        }
        function m(w) {
            return w < 0.0031308 ? 12.92 * w : 1.055 * Math.pow(w, 0.41666) - 0.055;
        }
    }
    ,
    0x6a24: (F, E, p) => {
        p.d(E, {
            'P': () => Q
        });
        var S = p(0x172d2)
          , R = p(0x1008e)
          , H = p(0x79b5)
          , y = p(0xa3bc)
          , d = new H.i()
          , P = new R.P()
          , Q = (function() {
            function B(X, m, w, C, N, Z) {
                undefined === X && (X = new y.Z()),
                undefined === m && (m = new y.Z()),
                undefined === w && (w = new y.Z()),
                undefined === C && (C = new y.Z()),
                undefined === N && (N = new y.Z()),
                undefined === Z && (Z = new y.Z()),
                this.planes = [X, m, w, C, N, Z];
            }
            var M = B.prototype;
            return M.set = function(X, m, w, C, N, Z) {
                var h = this.planes;
                return h[0].copy(X),
                h[1].copy(m),
                h[2].copy(w),
                h[3].copy(C),
                h[4].copy(N),
                h[5].copy(Z),
                this;
            }
            ,
            M.copy = function(X) {
                for (var m = this.planes, w = 0; w < 6; w++)
                    m[w].copy(X.planes[w]);
                return this;
            }
            ,
            M.setFromProjectionMatrix = function(X, w) {
                undefined === w && (w = S.TdN);
                var C = this.planes
                  , N = X.elements
                  , Z = N[0]
                  , U = N[1]
                  , T = N[2]
                  , V = N[3]
                  , G = N[4]
                  , k = N[5]
                  , W = N[6]
                  , I = N[7]
                  , L = N[8]
                  , q = N[9]
                  , K = N[10]
                  , Y = N[11]
                  , z = N[12]
                  , A = N[13]
                  , j = N[14]
                  , O = N[15];
                if (C[0].setComponents(V - Z, I - G, Y - L, O - z).normalize(),
                C[1].setComponents(V + Z, I + G, Y + L, O + z).normalize(),
                C[2].setComponents(V + U, I + k, Y + q, O + A).normalize(),
                C[3].setComponents(V - U, I - k, Y - q, O - A).normalize(),
                C[4].setComponents(V - T, I - W, Y - K, O - j).normalize(),
                w === S.TdN)
                    C[5].setComponents(V + T, I + W, Y + K, O + j).normalize();
                else {
                    if (w !== S.i7u)
                        throw new Error('THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: ' + w);
                    C[5].setComponents(T, W, K, j).normalize();
                }
                return this;
            }
            ,
            M.intersectsObject = function(X) {
                if (undefined !== X.boundingSphere)
                    null === X.boundingSphere && X.computeBoundingSphere(),
                    d.copy(X.boundingSphere).applyMatrix4(X.matrixWorld);
                else {
                    var m = X.geometry;
                    null === m.boundingSphere && m.computeBoundingSphere(),
                    d.copy(m.boundingSphere).applyMatrix4(X.matrixWorld);
                }
                return this.intersectsSphere(d);
            }
            ,
            M.intersectsSprite = function(X) {
                return d.center.set(0, 0, 0),
                d.radius = 0.7071067811865476,
                d.applyMatrix4(X.matrixWorld),
                this.intersectsSphere(d);
            }
            ,
            M.intersectsSphere = function(X) {
                for (var m = this.planes, w = X.center, C = -X.radius, N = 0; N < 6; N++) {
                    if (m[N].distanceToPoint(w) < C)
                        return false;
                }
                return true;
            }
            ,
            M.intersectsBox = function(X) {
                for (var m = this.planes, w = 0; w < 6; w++) {
                    var C = m[w];
                    if (P.x = C.normal.x > 0 ? X.max.x : X.min.x,
                    P.y = C.normal.y > 0 ? X.max.y : X.min.y,
                    P.z = C.normal.z > 0 ? X.max.z : X.min.z,
                    C.distanceToPoint(P) < 0)
                        return false;
                }
                return true;
            }
            ,
            M.containsPoint = function(X) {
                for (var m = this.planes, w = 0; w < 6; w++)
                    if (m[w].distanceToPoint(X) < 0)
                        return false;
                return true;
            }
            ,
            M.clone = function() {
                return new this.constructor().copy(this);
            }
            ,
            B;
        }());
    }
    ,
    0x28f4: (r, F, E) => {
        E.d(F, {
            'l': () => p
        });
        var p = (function() {
            function S(H, y, d, P) {
                this.parameterPositions = H,
                this._cachedIndex = 0,
                this.resultBuffer = undefined !== P ? P : new y.constructor(d),
                this.sampleValues = y,
                this.valueSize = d,
                this.settings = null,
                this.DefaultSettings_ = {};
            }
            var R = S.prototype;
            return R.evaluate = function(H) {
                var y = this.parameterPositions
                  , d = this._cachedIndex
                  , P = y[d]
                  , Q = y[d - 1];
                C: {
                    N: {
                        var B;
                        Z: {
                            h: if (!(H < P)) {
                                for (var M = d + 2; ; ) {
                                    if (undefined === P) {
                                        if (H < Q)
                                            break h;
                                        return d = y.length,
                                        this._cachedIndex = d,
                                        this.copySampleValue_(d - 1);
                                    }
                                    if (d === M)
                                        break;
                                    if (Q = P,
                                    H < (P = y[++d]))
                                        break N;
                                }
                                B = y.length;
                                break Z;
                            }
                            if (H >= Q)
                                break C;
                            var X = y[1];
                            H < X && (d = 2,
                            Q = X);
                            for (var m = d - 2; ; ) {
                                if (undefined === Q)
                                    return this._cachedIndex = 0,
                                    this.copySampleValue_(0);
                                if (d === m)
                                    break;
                                if (P = Q,
                                H >= (Q = y[--d - 1]))
                                    break N;
                            }
                            B = d,
                            d = 0;
                        }
                        for (; d < B; ) {
                            var w = d + B >>> 1;
                            H < y[w] ? B = w : d = w + 1;
                        }
                        if (P = y[d],
                        undefined === (Q = y[d - 1]))
                            return this._cachedIndex = 0,
                            this.copySampleValue_(0);
                        if (undefined === P)
                            return d = y.length,
                            this._cachedIndex = d,
                            this.copySampleValue_(d - 1);
                    }
                    this._cachedIndex = d,
                    this.intervalChanged_(d, Q, P);
                }
                return this.interpolate_(d, Q, H, P);
            }
            ,
            R.getSettings_ = function() {
                return this.settings || this.DefaultSettings_;
            }
            ,
            R.copySampleValue_ = function(H) {
                for (var y = this.resultBuffer, d = this.sampleValues, P = this.valueSize, Q = H * P, B = 0; B !== P; ++B)
                    y[B] = d[Q + B];
                return y;
            }
            ,
            R.interpolate_ = function() {
                throw new Error('call to abstract method');
            }
            ,
            R.intervalChanged_ = function() {}
            ,
            S;
        }());
    }
    ,
    0x3e78: (F, E, p) => {
        p.d(E, {
            'd': () => S
        });
        var S = (function() {
            function H(d, P, Q, B, M, X, m, w, C) {
                H.prototype.isMatrix3 = true,
                this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1],
                undefined !== d && this.set(d, P, Q, B, M, X, m, w, C);
            }
            var y = H.prototype;
            return y.set = function(d, P, Q, B, M, X, m, w, C) {
                var N = this.elements;
                return N[0] = d,
                N[1] = B,
                N[2] = m,
                N[3] = P,
                N[4] = M,
                N[5] = w,
                N[6] = Q,
                N[7] = X,
                N[8] = C,
                this;
            }
            ,
            y.identity = function() {
                return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1),
                this;
            }
            ,
            y.copy = function(d) {
                var P = this.elements
                  , Q = d.elements;
                return P[0] = Q[0],
                P[1] = Q[1],
                P[2] = Q[2],
                P[3] = Q[3],
                P[4] = Q[4],
                P[5] = Q[5],
                P[6] = Q[6],
                P[7] = Q[7],
                P[8] = Q[8],
                this;
            }
            ,
            y.extractBasis = function(d, P, Q) {
                return d.setFromMatrix3Column(this, 0),
                P.setFromMatrix3Column(this, 1),
                Q.setFromMatrix3Column(this, 2),
                this;
            }
            ,
            y.setFromMatrix4 = function(d) {
                var P = d.elements;
                return this.set(P[0], P[4], P[8], P[1], P[5], P[9], P[2], P[6], P[10]),
                this;
            }
            ,
            y.multiply = function(d) {
                return this.multiplyMatrices(this, d);
            }
            ,
            y.premultiply = function(d) {
                return this.multiplyMatrices(d, this);
            }
            ,
            y.multiplyMatrices = function(P, Q) {
                var B = P.elements
                  , X = Q.elements
                  , w = this.elements
                  , C = B[0]
                  , N = B[3]
                  , Z = B[6]
                  , U = B[1]
                  , T = B[4]
                  , V = B[7]
                  , G = B[2]
                  , k = B[5]
                  , W = B[8]
                  , I = X[0]
                  , L = X[3]
                  , q = X[6]
                  , K = X[1]
                  , Y = X[4]
                  , z = X[7]
                  , A = X[2]
                  , j = X[5]
                  , O = X[8];
                return w[0] = C * I + N * K + Z * A,
                w[3] = C * L + N * Y + Z * j,
                w[6] = C * q + N * z + Z * O,
                w[1] = U * I + T * K + V * A,
                w[4] = U * L + T * Y + V * j,
                w[7] = U * q + T * z + V * O,
                w[2] = G * I + k * K + W * A,
                w[5] = G * L + k * Y + W * j,
                w[8] = G * q + k * z + W * O,
                this;
            }
            ,
            y.multiplyScalar = function(d) {
                var P = this.elements;
                return P[0] *= d,
                P[3] *= d,
                P[6] *= d,
                P[1] *= d,
                P[4] *= d,
                P[7] *= d,
                P[2] *= d,
                P[5] *= d,
                P[8] *= d,
                this;
            }
            ,
            y.determinant = function() {
                var d = this.elements
                  , P = d[0]
                  , Q = d[1]
                  , B = d[2]
                  , M = d[3]
                  , X = d[4]
                  , m = d[5]
                  , w = d[6]
                  , C = d[7]
                  , N = d[8];
                return P * X * N - P * m * C - Q * M * N + Q * m * w + B * M * C - B * X * w;
            }
            ,
            y.invert = function() {
                var P = this.elements
                  , Q = P[0]
                  , B = P[1]
                  , M = P[2]
                  , X = P[3]
                  , m = P[4]
                  , w = P[5]
                  , C = P[6]
                  , N = P[7]
                  , Z = P[8]
                  , U = Z * m - w * N
                  , T = w * C - Z * X
                  , V = N * X - m * C
                  , G = Q * U + B * T + M * V;
                if (0 === G)
                    return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
                var k = 1 / G;
                return P[0] = U * k,
                P[1] = (M * N - Z * B) * k,
                P[2] = (w * B - M * m) * k,
                P[3] = T * k,
                P[4] = (Z * Q - M * C) * k,
                P[5] = (M * X - w * Q) * k,
                P[6] = V * k,
                P[7] = (B * C - N * Q) * k,
                P[8] = (m * Q - B * X) * k,
                this;
            }
            ,
            y.transpose = function() {
                var d, P = this.elements;
                return d = P[1],
                P[1] = P[3],
                P[3] = d,
                d = P[2],
                P[2] = P[6],
                P[6] = d,
                d = P[5],
                P[5] = P[7],
                P[7] = d,
                this;
            }
            ,
            y.getNormalMatrix = function(d) {
                return this.setFromMatrix4(d).invert().transpose();
            }
            ,
            y.transposeIntoArray = function(d) {
                var P = this.elements;
                return d[0] = P[0],
                d[1] = P[3],
                d[2] = P[6],
                d[3] = P[1],
                d[4] = P[4],
                d[5] = P[7],
                d[6] = P[2],
                d[7] = P[5],
                d[8] = P[8],
                this;
            }
            ,
            y.setUvTransform = function(d, P, Q, B, M, X, m) {
                var w = Math.cos(M)
                  , l = Math.sin(M);
                return this.set(Q * w, Q * l, -Q * (w * X + l * m) + X + d, -B * l, B * w, -B * (-l * X + w * m) + m + P, 0, 0, 1),
                this;
            }
            ,
            y.scale = function(d, P) {
                return this.premultiply(R.makeScale(d, P)),
                this;
            }
            ,
            y.rotate = function(d) {
                return this.premultiply(R.makeRotation(-d)),
                this;
            }
            ,
            y.translate = function(d, P) {
                return this.premultiply(R.makeTranslation(d, P)),
                this;
            }
            ,
            y.makeTranslation = function(d, P) {
                return d.isVector2 ? this.set(1, 0, d.x, 0, 1, d.y, 0, 0, 1) : this.set(1, 0, d, 0, 1, P, 0, 0, 1),
                this;
            }
            ,
            y.makeRotation = function(d) {
                var P = Math.cos(d)
                  , Q = Math.sin(d);
                return this.set(P, -Q, 0, Q, P, 0, 0, 0, 1),
                this;
            }
            ,
            y.makeScale = function(d, P) {
                return this.set(d, 0, 0, 0, P, 0, 0, 0, 1),
                this;
            }
            ,
            y.equals = function(d) {
                for (var P = this.elements, Q = d.elements, B = 0; B < 9; B++)
                    if (P[B] !== Q[B])
                        return false;
                return true;
            }
            ,
            y.fromArray = function(d, P) {
                undefined === P && (P = 0);
                for (var Q = 0; Q < 9; Q++)
                    this.elements[Q] = d[Q + P];
                return this;
            }
            ,
            y.toArray = function(d, P) {
                undefined === d && (d = []),
                undefined === P && (P = 0);
                var Q = this.elements;
                return d[P] = Q[0],
                d[P + 1] = Q[1],
                d[P + 2] = Q[2],
                d[P + 3] = Q[3],
                d[P + 4] = Q[4],
                d[P + 5] = Q[5],
                d[P + 6] = Q[6],
                d[P + 7] = Q[7],
                d[P + 8] = Q[8],
                d;
            }
            ,
            y.clone = function() {
                return new this.constructor().fromArray(this.elements);
            }
            ,
            H;
        }())
          , R = new S();
    }
    ,
    0x11ded: (F, E, p) => {
        p.d(E, {
            'k': () => H
        });
        var S = p(0x172d2)
          , R = p(0x1008e)
          , H = (function() {
            function w(N, Z, U, T, V, G, k, W, x, I, g, L, q, K, Y, z) {
                w.prototype.isMatrix4 = true,
                this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                undefined !== N && this.set(N, Z, U, T, V, G, k, W, x, I, g, L, q, K, Y, z);
            }
            var C = w.prototype;
            return C.set = function(N, Z, U, T, V, G, k, W, x, I, g, L, q, K, Y, z) {
                var A = this.elements;
                return A[0] = N,
                A[4] = Z,
                A[8] = U,
                A[12] = T,
                A[1] = V,
                A[5] = G,
                A[9] = k,
                A[13] = W,
                A[2] = x,
                A[6] = I,
                A[10] = g,
                A[14] = L,
                A[3] = q,
                A[7] = K,
                A[11] = Y,
                A[15] = z,
                this;
            }
            ,
            C.identity = function() {
                return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
                this;
            }
            ,
            C.clone = function() {
                return new w().fromArray(this.elements);
            }
            ,
            C.copy = function(N) {
                var Z = this.elements
                  , U = N.elements;
                return Z[0] = U[0],
                Z[1] = U[1],
                Z[2] = U[2],
                Z[3] = U[3],
                Z[4] = U[4],
                Z[5] = U[5],
                Z[6] = U[6],
                Z[7] = U[7],
                Z[8] = U[8],
                Z[9] = U[9],
                Z[10] = U[10],
                Z[11] = U[11],
                Z[12] = U[12],
                Z[13] = U[13],
                Z[14] = U[14],
                Z[15] = U[15],
                this;
            }
            ,
            C.copyPosition = function(N) {
                var Z = this.elements
                  , U = N.elements;
                return Z[12] = U[12],
                Z[13] = U[13],
                Z[14] = U[14],
                this;
            }
            ,
            C.setFromMatrix3 = function(N) {
                var Z = N.elements;
                return this.set(Z[0], Z[3], Z[6], 0, Z[1], Z[4], Z[7], 0, Z[2], Z[5], Z[8], 0, 0, 0, 0, 1),
                this;
            }
            ,
            C.extractBasis = function(N, Z, U) {
                return N.setFromMatrixColumn(this, 0),
                Z.setFromMatrixColumn(this, 1),
                U.setFromMatrixColumn(this, 2),
                this;
            }
            ,
            C.makeBasis = function(N, Z, U) {
                return this.set(N.x, Z.x, U.x, 0, N.y, Z.y, U.y, 0, N.z, Z.z, U.z, 0, 0, 0, 0, 1),
                this;
            }
            ,
            C.extractRotation = function(N) {
                var Z = this.elements
                  , U = N.elements
                  , T = 1 / y.setFromMatrixColumn(N, 0).length()
                  , V = 1 / y.setFromMatrixColumn(N, 1).length()
                  , G = 1 / y.setFromMatrixColumn(N, 2).length();
                return Z[0] = U[0] * T,
                Z[1] = U[1] * T,
                Z[2] = U[2] * T,
                Z[3] = 0,
                Z[4] = U[4] * V,
                Z[5] = U[5] * V,
                Z[6] = U[6] * V,
                Z[7] = 0,
                Z[8] = U[8] * G,
                Z[9] = U[9] * G,
                Z[10] = U[10] * G,
                Z[11] = 0,
                Z[12] = 0,
                Z[13] = 0,
                Z[14] = 0,
                Z[15] = 1,
                this;
            }
            ,
            C.makeRotationFromEuler = function(Z) {
                var U = this.elements
                  , V = Z.x
                  , G = Z.y
                  , k = Z.z
                  , W = Math.cos(V)
                  , q = Math.sin(V)
                  , K = Math.cos(G)
                  , Y = Math.sin(G)
                  , z = Math.cos(k)
                  , j = Math.sin(k);
                if ('XYZ' === Z.order) {
                    var O = W * z
                      , J = W * j
                      , r0 = q * z
                      , r1 = q * j;
                    U[0] = K * z,
                    U[4] = -K * j,
                    U[8] = Y,
                    U[1] = J + r0 * Y,
                    U[5] = O - r1 * Y,
                    U[9] = -q * K,
                    U[2] = r1 - O * Y,
                    U[6] = r0 + J * Y,
                    U[10] = W * K;
                } else {
                    if ('YXZ' === Z.order) {
                        var r2 = K * z
                          , r3 = K * j
                          , r4 = Y * z
                          , r5 = Y * j;
                        U[0] = r2 + r5 * q,
                        U[4] = r4 * q - r3,
                        U[8] = W * Y,
                        U[1] = W * j,
                        U[5] = W * z,
                        U[9] = -q,
                        U[2] = r3 * q - r4,
                        U[6] = r5 + r2 * q,
                        U[10] = W * K;
                    } else {
                        if ('ZXY' === Z.order) {
                            var r6 = K * z
                              , r7 = K * j
                              , r8 = Y * z
                              , r9 = Y * j;
                            U[0] = r6 - r9 * q,
                            U[4] = -W * j,
                            U[8] = r8 + r7 * q,
                            U[1] = r7 + r8 * q,
                            U[5] = W * z,
                            U[9] = r9 - r6 * q,
                            U[2] = -W * Y,
                            U[6] = q,
                            U[10] = W * K;
                        } else {
                            if ('ZYX' === Z.order) {
                                var rr = W * z
                                  , rF = W * j
                                  , rE = q * z
                                  , rp = q * j;
                                U[0] = K * z,
                                U[4] = rE * Y - rF,
                                U[8] = rr * Y + rp,
                                U[1] = K * j,
                                U[5] = rp * Y + rr,
                                U[9] = rF * Y - rE,
                                U[2] = -Y,
                                U[6] = q * K,
                                U[10] = W * K;
                            } else {
                                if ('YZX' === Z.order) {
                                    var rS = W * K
                                      , re = W * Y
                                      , rR = q * K
                                      , rH = q * Y;
                                    U[0] = K * z,
                                    U[4] = rH - rS * j,
                                    U[8] = rR * j + re,
                                    U[1] = j,
                                    U[5] = W * z,
                                    U[9] = -q * z,
                                    U[2] = -Y * z,
                                    U[6] = re * j + rR,
                                    U[10] = rS - rH * j;
                                } else {
                                    if ('XZY' === Z.order) {
                                        var ry = W * K
                                          , rd = W * Y
                                          , rP = q * K
                                          , rQ = q * Y;
                                        U[0] = K * z,
                                        U[4] = -j,
                                        U[8] = Y * z,
                                        U[1] = ry * j + rQ,
                                        U[5] = W * z,
                                        U[9] = rd * j - rP,
                                        U[2] = rP * j - rd,
                                        U[6] = q * z,
                                        U[10] = rQ * j + ry;
                                    }
                                }
                            }
                        }
                    }
                }
                return U[3] = 0,
                U[7] = 0,
                U[11] = 0,
                U[12] = 0,
                U[13] = 0,
                U[14] = 0,
                U[15] = 1,
                this;
            }
            ,
            C.makeRotationFromQuaternion = function(N) {
                return this.compose(Q, N, B);
            }
            ,
            C.lookAt = function(N, Z, U) {
                var T = this.elements;
                return m.subVectors(N, Z),
                0 === m.lengthSq() && (m.z = 1),
                m.normalize(),
                M.crossVectors(U, m),
                0 === M.lengthSq() && (1 === Math.abs(U.z) ? m.x += 0.0001 : m.z += 0.0001,
                m.normalize(),
                M.crossVectors(U, m)),
                M.normalize(),
                X.crossVectors(m, M),
                T[0] = M.x,
                T[4] = X.x,
                T[8] = m.x,
                T[1] = M.y,
                T[5] = X.y,
                T[9] = m.y,
                T[2] = M.z,
                T[6] = X.z,
                T[10] = m.z,
                this;
            }
            ,
            C.multiply = function(N) {
                return this.multiplyMatrices(this, N);
            }
            ,
            C.premultiply = function(N) {
                return this.multiplyMatrices(N, this);
            }
            ,
            C.multiplyMatrices = function(Z, V) {
                var G = Z.elements
                  , k = V.elements
                  , W = this.elements
                  , q = G[0]
                  , K = G[4]
                  , Y = G[8]
                  , z = G[12]
                  , j = G[1]
                  , J = G[5]
                  , r0 = G[9]
                  , r1 = G[13]
                  , r2 = G[2]
                  , r3 = G[6]
                  , r4 = G[10]
                  , r5 = G[14]
                  , r6 = G[3]
                  , r7 = G[7]
                  , r8 = G[11]
                  , r9 = G[15]
                  , rr = k[0]
                  , rF = k[4]
                  , rE = k[8]
                  , rp = k[12]
                  , rS = k[1]
                  , re = k[5]
                  , rR = k[9]
                  , rH = k[13]
                  , ry = k[2]
                  , rd = k[6]
                  , rP = k[10]
                  , rQ = k[14]
                  , rB = k[3]
                  , rM = k[7]
                  , rX = k[11]
                  , rt = k[15];
                return W[0] = q * rr + K * rS + Y * ry + z * rB,
                W[4] = q * rF + K * re + Y * rd + z * rM,
                W[8] = q * rE + K * rR + Y * rP + z * rX,
                W[12] = q * rp + K * rH + Y * rQ + z * rt,
                W[1] = j * rr + J * rS + r0 * ry + r1 * rB,
                W[5] = j * rF + J * re + r0 * rd + r1 * rM,
                W[9] = j * rE + J * rR + r0 * rP + r1 * rX,
                W[13] = j * rp + J * rH + r0 * rQ + r1 * rt,
                W[2] = r2 * rr + r3 * rS + r4 * ry + r5 * rB,
                W[6] = r2 * rF + r3 * re + r4 * rd + r5 * rM,
                W[10] = r2 * rE + r3 * rR + r4 * rP + r5 * rX,
                W[14] = r2 * rp + r3 * rH + r4 * rQ + r5 * rt,
                W[3] = r6 * rr + r7 * rS + r8 * ry + r9 * rB,
                W[7] = r6 * rF + r7 * re + r8 * rd + r9 * rM,
                W[11] = r6 * rE + r7 * rR + r8 * rP + r9 * rX,
                W[15] = r6 * rp + r7 * rH + r8 * rQ + r9 * rt,
                this;
            }
            ,
            C.multiplyScalar = function(N) {
                var Z = this.elements;
                return Z[0] *= N,
                Z[4] *= N,
                Z[8] *= N,
                Z[12] *= N,
                Z[1] *= N,
                Z[5] *= N,
                Z[9] *= N,
                Z[13] *= N,
                Z[2] *= N,
                Z[6] *= N,
                Z[10] *= N,
                Z[14] *= N,
                Z[3] *= N,
                Z[7] *= N,
                Z[11] *= N,
                Z[15] *= N,
                this;
            }
            ,
            C.determinant = function() {
                var N = this.elements
                  , Z = N[0]
                  , U = N[4]
                  , T = N[8]
                  , V = N[12]
                  , G = N[1]
                  , k = N[5]
                  , W = N[9]
                  , x = N[13]
                  , I = N[2]
                  , g = N[6]
                  , L = N[10]
                  , q = N[14];
                return N[3] * (+V * W * g - T * x * g - V * k * L + U * x * L + T * k * q - U * W * q) + N[7] * (+Z * W * q - Z * x * L + V * G * L - T * G * q + T * x * I - V * W * I) + N[11] * (+Z * x * g - Z * k * q - V * G * g + U * G * q + V * k * I - U * x * I) + N[15] * (-T * k * I - Z * W * g + Z * k * L + T * G * g - U * G * L + U * W * I);
            }
            ,
            C.transpose = function() {
                var N, Z = this.elements;
                return N = Z[1],
                Z[1] = Z[4],
                Z[4] = N,
                N = Z[2],
                Z[2] = Z[8],
                Z[8] = N,
                N = Z[6],
                Z[6] = Z[9],
                Z[9] = N,
                N = Z[3],
                Z[3] = Z[12],
                Z[12] = N,
                N = Z[7],
                Z[7] = Z[13],
                Z[13] = N,
                N = Z[11],
                Z[11] = Z[14],
                Z[14] = N,
                this;
            }
            ,
            C.setPosition = function(N, Z, U) {
                var T = this.elements;
                return N.isVector3 ? (T[12] = N.x,
                T[13] = N.y,
                T[14] = N.z) : (T[12] = N,
                T[13] = Z,
                T[14] = U),
                this;
            }
            ,
            C.invert = function() {
                var N = this.elements
                  , Z = N[0]
                  , U = N[1]
                  , T = N[2]
                  , V = N[3]
                  , G = N[4]
                  , k = N[5]
                  , W = N[6]
                  , I = N[7]
                  , L = N[8]
                  , q = N[9]
                  , K = N[10]
                  , Y = N[11]
                  , z = N[12]
                  , A = N[13]
                  , j = N[14]
                  , O = N[15]
                  , J = q * j * I - A * K * I + A * W * Y - k * j * Y - q * W * O + k * K * O
                  , b = z * K * I - L * j * I - z * W * Y + G * j * Y + L * W * O - G * K * O
                  , D = L * A * I - z * q * I + z * k * Y - G * A * Y - L * k * O + G * q * O
                  , r0 = z * q * W - L * A * W - z * k * K + G * A * K + L * k * j - G * q * j
                  , r1 = Z * J + U * b + T * D + V * r0;
                if (0 === r1)
                    return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                var r2 = 1 / r1;
                return N[0] = J * r2,
                N[1] = (A * K * V - q * j * V - A * T * Y + U * j * Y + q * T * O - U * K * O) * r2,
                N[2] = (k * j * V - A * W * V + A * T * I - U * j * I - k * T * O + U * W * O) * r2,
                N[3] = (q * W * V - k * K * V - q * T * I + U * K * I + k * T * Y - U * W * Y) * r2,
                N[4] = b * r2,
                N[5] = (L * j * V - z * K * V + z * T * Y - Z * j * Y - L * T * O + Z * K * O) * r2,
                N[6] = (z * W * V - G * j * V - z * T * I + Z * j * I + G * T * O - Z * W * O) * r2,
                N[7] = (G * K * V - L * W * V + L * T * I - Z * K * I - G * T * Y + Z * W * Y) * r2,
                N[8] = D * r2,
                N[9] = (z * q * V - L * A * V - z * U * Y + Z * A * Y + L * U * O - Z * q * O) * r2,
                N[10] = (G * A * V - z * k * V + z * U * I - Z * A * I - G * U * O + Z * k * O) * r2,
                N[11] = (L * k * V - G * q * V - L * U * I + Z * q * I + G * U * Y - Z * k * Y) * r2,
                N[12] = r0 * r2,
                N[13] = (L * A * T - z * q * T + z * U * K - Z * A * K - L * U * j + Z * q * j) * r2,
                N[14] = (z * k * T - G * A * T - z * U * W + Z * A * W + G * U * j - Z * k * j) * r2,
                N[15] = (G * q * T - L * k * T + L * U * W - Z * q * W - G * U * K + Z * k * K) * r2,
                this;
            }
            ,
            C.scale = function(N) {
                var Z = this.elements
                  , U = N.x
                  , T = N.y
                  , V = N.z;
                return Z[0] *= U,
                Z[4] *= T,
                Z[8] *= V,
                Z[1] *= U,
                Z[5] *= T,
                Z[9] *= V,
                Z[2] *= U,
                Z[6] *= T,
                Z[10] *= V,
                Z[3] *= U,
                Z[7] *= T,
                Z[11] *= V,
                this;
            }
            ,
            C.getMaxScaleOnAxis = function() {
                var N = this.elements
                  , Z = N[0] * N[0] + N[1] * N[1] + N[2] * N[2]
                  , U = N[4] * N[4] + N[5] * N[5] + N[6] * N[6]
                  , T = N[8] * N[8] + N[9] * N[9] + N[10] * N[10];
                return Math.sqrt(Math.max(Z, U, T));
            }
            ,
            C.makeTranslation = function(N, Z, U) {
                return N.isVector3 ? this.set(1, 0, 0, N.x, 0, 1, 0, N.y, 0, 0, 1, N.z, 0, 0, 0, 1) : this.set(1, 0, 0, N, 0, 1, 0, Z, 0, 0, 1, U, 0, 0, 0, 1),
                this;
            }
            ,
            C.makeRotationX = function(N) {
                var Z = Math.cos(N)
                  , U = Math.sin(N);
                return this.set(1, 0, 0, 0, 0, Z, -U, 0, 0, U, Z, 0, 0, 0, 0, 1),
                this;
            }
            ,
            C.makeRotationY = function(N) {
                var Z = Math.cos(N)
                  , U = Math.sin(N);
                return this.set(Z, 0, U, 0, 0, 1, 0, 0, -U, 0, Z, 0, 0, 0, 0, 1),
                this;
            }
            ,
            C.makeRotationZ = function(N) {
                var Z = Math.cos(N)
                  , U = Math.sin(N);
                return this.set(Z, -U, 0, 0, U, Z, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
                this;
            }
            ,
            C.makeRotationAxis = function(N, Z) {
                var U = Math.cos(Z)
                  , T = Math.sin(Z)
                  , V = 1 - U
                  , G = N.x
                  , k = N.y
                  , W = N.z
                  , x = V * G
                  , I = V * k;
                return this.set(x * G + U, x * k - T * W, x * W + T * k, 0, x * k + T * W, I * k + U, I * W - T * G, 0, x * W - T * k, I * W + T * G, V * W * W + U, 0, 0, 0, 0, 1),
                this;
            }
            ,
            C.makeScale = function(N, Z, U) {
                return this.set(N, 0, 0, 0, 0, Z, 0, 0, 0, 0, U, 0, 0, 0, 0, 1),
                this;
            }
            ,
            C.makeShear = function(N, Z, U, T, V, G) {
                return this.set(1, U, V, 0, N, 1, G, 0, Z, T, 1, 0, 0, 0, 0, 1),
                this;
            }
            ,
            C.compose = function(N, Z, U) {
                var T = this.elements
                  , V = Z._x
                  , G = Z._y
                  , k = Z._z
                  , W = Z._w
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
                  , r0 = U.x
                  , r1 = U.y
                  , r2 = U.z;
                return T[0] = (1 - (A + O)) * r0,
                T[1] = (Y + D) * r0,
                T[2] = (z - b) * r0,
                T[3] = 0,
                T[4] = (Y - D) * r1,
                T[5] = (1 - (K + O)) * r1,
                T[6] = (j + J) * r1,
                T[7] = 0,
                T[8] = (z + b) * r2,
                T[9] = (j - J) * r2,
                T[10] = (1 - (K + A)) * r2,
                T[11] = 0,
                T[12] = N.x,
                T[13] = N.y,
                T[14] = N.z,
                T[15] = 1,
                this;
            }
            ,
            C.decompose = function(N, Z, U) {
                var T = this.elements
                  , V = y.set(T[0], T[1], T[2]).length()
                  , G = y.set(T[4], T[5], T[6]).length()
                  , k = y.set(T[8], T[9], T[10]).length();
                this.determinant() < 0 && (V = -V),
                N.x = T[12],
                N.y = T[13],
                N.z = T[14],
                P.copy(this);
                var W = 1 / V
                  , x = 1 / G
                  , I = 1 / k;
                return P.elements[0] *= W,
                P.elements[1] *= W,
                P.elements[2] *= W,
                P.elements[4] *= x,
                P.elements[5] *= x,
                P.elements[6] *= x,
                P.elements[8] *= I,
                P.elements[9] *= I,
                P.elements[10] *= I,
                Z.setFromRotationMatrix(P),
                U.x = V,
                U.y = G,
                U.z = k,
                this;
            }
            ,
            C.makePerspective = function(N, Z, U, T, V, G, k) {
                undefined === k && (k = S.TdN);
                var W, x, I = this.elements, g = 2 * V / (Z - N), L = 2 * V / (U - T), q = (Z + N) / (Z - N), K = (U + T) / (U - T);
                if (k === S.TdN)
                    W = -(G + V) / (G - V),
                    x = -2 * G * V / (G - V);
                else {
                    if (k !== S.i7u)
                        throw new Error('THREE.Matrix4.makePerspective(): Invalid coordinate system: ' + k);
                    W = -G / (G - V),
                    x = -G * V / (G - V);
                }
                return I[0] = g,
                I[4] = 0,
                I[8] = q,
                I[12] = 0,
                I[1] = 0,
                I[5] = L,
                I[9] = K,
                I[13] = 0,
                I[2] = 0,
                I[6] = 0,
                I[10] = W,
                I[14] = x,
                I[3] = 0,
                I[7] = 0,
                I[11] = -1,
                I[15] = 0,
                this;
            }
            ,
            C.makeOrthographic = function(N, Z, U, T, V, G, k) {
                undefined === k && (k = S.TdN);
                var W, x, I = this.elements, g = 1 / (Z - N), L = 1 / (U - T), q = 1 / (G - V), K = (Z + N) * g, Y = (U + T) * L;
                if (k === S.TdN)
                    W = (G + V) * q,
                    x = -2 * q;
                else {
                    if (k !== S.i7u)
                        throw new Error('THREE.Matrix4.makeOrthographic(): Invalid coordinate system: ' + k);
                    W = V * q,
                    x = -1 * q;
                }
                return I[0] = 2 * g,
                I[4] = 0,
                I[8] = 0,
                I[12] = -K,
                I[1] = 0,
                I[5] = 2 * L,
                I[9] = 0,
                I[13] = -Y,
                I[2] = 0,
                I[6] = 0,
                I[10] = x,
                I[14] = -W,
                I[3] = 0,
                I[7] = 0,
                I[11] = 0,
                I[15] = 1,
                this;
            }
            ,
            C.equals = function(N) {
                for (var Z = this.elements, U = N.elements, T = 0; T < 0x10; T++)
                    if (Z[T] !== U[T])
                        return false;
                return true;
            }
            ,
            C.fromArray = function(N, Z) {
                undefined === Z && (Z = 0);
                for (var U = 0; U < 0x10; U++)
                    this.elements[U] = N[U + Z];
                return this;
            }
            ,
            C.toArray = function(N, Z) {
                undefined === N && (N = []),
                undefined === Z && (Z = 0);
                var U = this.elements;
                return N[Z] = U[0],
                N[Z + 1] = U[1],
                N[Z + 2] = U[2],
                N[Z + 3] = U[3],
                N[Z + 4] = U[4],
                N[Z + 5] = U[5],
                N[Z + 6] = U[6],
                N[Z + 7] = U[7],
                N[Z + 8] = U[8],
                N[Z + 9] = U[9],
                N[Z + 10] = U[10],
                N[Z + 11] = U[11],
                N[Z + 12] = U[12],
                N[Z + 13] = U[13],
                N[Z + 14] = U[14],
                N[Z + 15] = U[15],
                N;
            }
            ,
            w;
        }())
          , y = new R.P()
          , P = new H()
          , Q = new R.P(0,0,0)
          , B = new R.P(1,1,1)
          , M = new R.P()
          , X = new R.P()
          , m = new R.P();
    }
    ,
    0xa3bc: (F, E, p) => {
        p.d(E, {
            'Z': () => P
        });
        var S = p(0x3e78)
          , R = p(0x1008e)
          , H = new R.P()
          , y = new R.P()
          , d = new S.d()
          , P = (function() {
            function Q(M, X) {
                undefined === M && (M = new R.P(1,0,0)),
                undefined === X && (X = 0),
                this.isPlane = true,
                this.normal = M,
                this.constant = X;
            }
            var B = Q.prototype;
            return B.set = function(M, X) {
                return this.normal.copy(M),
                this.constant = X,
                this;
            }
            ,
            B.setComponents = function(M, X, m, w) {
                return this.normal.set(M, X, m),
                this.constant = w,
                this;
            }
            ,
            B.setFromNormalAndCoplanarPoint = function(M, X) {
                return this.normal.copy(M),
                this.constant = -X.dot(this.normal),
                this;
            }
            ,
            B.setFromCoplanarPoints = function(M, X, m) {
                var w = H.subVectors(m, X).cross(y.subVectors(M, X)).normalize();
                return this.setFromNormalAndCoplanarPoint(w, M),
                this;
            }
            ,
            B.copy = function(M) {
                return this.normal.copy(M.normal),
                this.constant = M.constant,
                this;
            }
            ,
            B.normalize = function() {
                var M = 1 / this.normal.length();
                return this.normal.multiplyScalar(M),
                this.constant *= M,
                this;
            }
            ,
            B.negate = function() {
                return this.constant *= -1,
                this.normal.negate(),
                this;
            }
            ,
            B.distanceToPoint = function(M) {
                return this.normal.dot(M) + this.constant;
            }
            ,
            B.distanceToSphere = function(M) {
                return this.distanceToPoint(M.center) - M.radius;
            }
            ,
            B.projectPoint = function(M, X) {
                return X.copy(M).addScaledVector(this.normal, -this.distanceToPoint(M));
            }
            ,
            B.intersectLine = function(M, X) {
                var m = M.delta(H)
                  , w = this.normal.dot(m);
                if (0 === w)
                    return 0 === this.distanceToPoint(M.start) ? X.copy(M.start) : null;
                var l = -(M.start.dot(this.normal) + this.constant) / w;
                return l < 0 || l > 1 ? null : X.copy(M.start).addScaledVector(m, l);
            }
            ,
            B.intersectsLine = function(M) {
                var X = this.distanceToPoint(M.start)
                  , m = this.distanceToPoint(M.end);
                return X < 0 && m > 0 || m < 0 && X > 0;
            }
            ,
            B.intersectsBox = function(M) {
                return M.intersectsPlane(this);
            }
            ,
            B.intersectsSphere = function(M) {
                return M.intersectsPlane(this);
            }
            ,
            B.coplanarPoint = function(M) {
                return M.copy(this.normal).multiplyScalar(-this.constant);
            }
            ,
            B.applyMatrix4 = function(M, X) {
                var m = X || d.getNormalMatrix(M)
                  , w = this.coplanarPoint(H).applyMatrix4(M)
                  , l = this.normal.applyMatrix3(m).normalize();
                return this.constant = -w.dot(l),
                this;
            }
            ,
            B.translate = function(M) {
                return this.constant -= M.dot(this.normal),
                this;
            }
            ,
            B.equals = function(M) {
                return M.normal.equals(this.normal) && M.constant === this.constant;
            }
            ,
            B.clone = function() {
                return new this.constructor().copy(this);
            }
            ,
            Q;
        }());
    }
    ,
    0x13294: (F, E, p) => {
        p.d(E, {
            'P': () => d
        });
        var S = p(0x14124)
          , R = p(0xd5e4)
          , H = p.n(R)
          , y = p(0xbd95)
          , d = (function() {
            function P(B, M, X, m) {
                undefined === B && (B = 0),
                undefined === M && (M = 0),
                undefined === X && (X = 0),
                undefined === m && (m = 1),
                this.isQuaternion = true,
                this._x = B,
                this._y = M,
                this._z = X,
                this._w = m;
            }
            P.slerpFlat = function(B, X, w, C, N, Z, U) {
                var T = w[C + 0]
                  , V = w[C + 1]
                  , G = w[C + 2]
                  , k = w[C + 3]
                  , W = N[Z + 0]
                  , I = N[Z + 1]
                  , L = N[Z + 2]
                  , q = N[Z + 3];
                if (0 === U)
                    return B[X + 0] = T,
                    B[X + 1] = V,
                    B[X + 2] = G,
                    void (B[X + 3] = k);
                if (1 === U)
                    return B[X + 0] = W,
                    B[X + 1] = I,
                    B[X + 2] = L,
                    void (B[X + 3] = q);
                if (k !== q || T !== W || V !== I || G !== L) {
                    var K = 1 - U
                      , Y = T * W + V * I + G * L + k * q
                      , z = Y >= 0 ? 1 : -1
                      , A = 1 - Y * Y;
                    if (A > Number.EPSILON) {
                        var j = Math.sqrt(A)
                          , O = Math.atan2(j, Y * z);
                        K = Math.sin(K * O) / j,
                        U = Math.sin(U * O) / j;
                    }
                    var J = U * z;
                    if (T = T * K + W * J,
                    V = V * K + I * J,
                    G = G * K + L * J,
                    k = k * K + q * J,
                    K === 1 - U) {
                        var b = 1 / Math.sqrt(T * T + V * V + G * G + k * k);
                        T *= b,
                        V *= b,
                        G *= b,
                        k *= b;
                    }
                }
                B[X] = T,
                B[X + 1] = V,
                B[X + 2] = G,
                B[X + 3] = k;
            }
            ,
            P.multiplyQuaternionsFlat = function(B, M, X, m, w, C) {
                var N = X[m]
                  , Z = X[m + 1]
                  , U = X[m + 2]
                  , T = X[m + 3]
                  , V = w[C]
                  , G = w[C + 1]
                  , k = w[C + 2]
                  , W = w[C + 3];
                return B[M] = N * W + T * V + Z * k - U * G,
                B[M + 1] = Z * W + T * G + U * V - N * k,
                B[M + 2] = U * W + T * k + N * G - Z * V,
                B[M + 3] = T * W - N * V - Z * G - U * k,
                B;
            }
            ;
            var Q = P.prototype;
            return Q.set = function(B, M, X, m) {
                return this._x = B,
                this._y = M,
                this._z = X,
                this._w = m,
                this._onChangeCallback(),
                this;
            }
            ,
            Q.clone = function() {
                return new this.constructor(this._x,this._y,this._z,this._w);
            }
            ,
            Q.copy = function(B) {
                return this._x = B.x,
                this._y = B.y,
                this._z = B.z,
                this._w = B.w,
                this._onChangeCallback(),
                this;
            }
            ,
            Q.setFromEuler = function(B, M) {
                var X = B._x
                  , m = B._y
                  , w = B._z
                  , C = B._order
                  , N = Math.cos
                  , Z = Math.sin
                  , U = N(X / 2)
                  , T = N(m / 2)
                  , V = N(w / 2)
                  , G = Z(X / 2)
                  , k = Z(m / 2)
                  , W = Z(w / 2);
                switch (C) {
                case 'XYZ':
                    this._x = G * T * V + U * k * W,
                    this._y = U * k * V - G * T * W,
                    this._z = U * T * W + G * k * V,
                    this._w = U * T * V - G * k * W;
                    break;
                case 'YXZ':
                    this._x = G * T * V + U * k * W,
                    this._y = U * k * V - G * T * W,
                    this._z = U * T * W - G * k * V,
                    this._w = U * T * V + G * k * W;
                    break;
                case 'ZXY':
                    this._x = G * T * V - U * k * W,
                    this._y = U * k * V + G * T * W,
                    this._z = U * T * W + G * k * V,
                    this._w = U * T * V - G * k * W;
                    break;
                case 'ZYX':
                    this._x = G * T * V - U * k * W,
                    this._y = U * k * V + G * T * W,
                    this._z = U * T * W - G * k * V,
                    this._w = U * T * V + G * k * W;
                    break;
                case 'YZX':
                    this._x = G * T * V + U * k * W,
                    this._y = U * k * V + G * T * W,
                    this._z = U * T * W - G * k * V,
                    this._w = U * T * V - G * k * W;
                    break;
                case 'XZY':
                    this._x = G * T * V - U * k * W,
                    this._y = U * k * V - G * T * W,
                    this._z = U * T * W + G * k * V,
                    this._w = U * T * V + G * k * W;
                    break;
                default:
                    console.warn('THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + C);
                }
                return false !== M && this._onChangeCallback(),
                this;
            }
            ,
            Q.setFromAxisAngle = function(B, M) {
                var X = M / 2
                  , m = Math.sin(X);
                return this._x = B.x * m,
                this._y = B.y * m,
                this._z = B.z * m,
                this._w = Math.cos(X),
                this._onChangeCallback(),
                this;
            }
            ,
            Q.setFromRotationMatrix = function(B) {
                var M = B.elements
                  , X = M[0]
                  , w = M[4]
                  , C = M[8]
                  , N = M[1]
                  , Z = M[5]
                  , U = M[9]
                  , T = M[2]
                  , V = M[6]
                  , G = M[10]
                  , k = X + Z + G;
                if (k > 0) {
                    var W = 0.5 / Math.sqrt(k + 1);
                    this._w = 0.25 / W,
                    this._x = (V - U) * W,
                    this._y = (C - T) * W,
                    this._z = (N - w) * W;
                } else {
                    if (X > Z && X > G) {
                        var x = 2 * Math.sqrt(1 + X - Z - G);
                        this._w = (V - U) / x,
                        this._x = 0.25 * x,
                        this._y = (w + N) / x,
                        this._z = (C + T) / x;
                    } else {
                        if (Z > G) {
                            var I = 2 * Math.sqrt(1 + Z - X - G);
                            this._w = (C - T) / I,
                            this._x = (w + N) / I,
                            this._y = 0.25 * I,
                            this._z = (U + V) / I;
                        } else {
                            var g = 2 * Math.sqrt(1 + G - X - Z);
                            this._w = (N - w) / g,
                            this._x = (C + T) / g,
                            this._y = (U + V) / g,
                            this._z = 0.25 * g;
                        }
                    }
                }
                return this._onChangeCallback(),
                this;
            }
            ,
            Q.setFromUnitVectors = function(B, M) {
                var X = B.dot(M) + 1;
                return X < Number.EPSILON ? (X = 0,
                Math.abs(B.x) > Math.abs(B.z) ? (this._x = -B.y,
                this._y = B.x,
                this._z = 0,
                this._w = X) : (this._x = 0,
                this._y = -B.z,
                this._z = B.y,
                this._w = X)) : (this._x = B.y * M.z - B.z * M.y,
                this._y = B.z * M.x - B.x * M.z,
                this._z = B.x * M.y - B.y * M.x,
                this._w = X),
                this.normalize();
            }
            ,
            Q.angleTo = function(B) {
                return 2 * Math.acos(Math.abs(y.qE(this.dot(B), -1, 1)));
            }
            ,
            Q.rotateTowards = function(B, M) {
                var X = this.angleTo(B);
                if (0 === X)
                    return this;
                var m = Math.min(1, M / X);
                return this.slerp(B, m),
                this;
            }
            ,
            Q.identity = function() {
                return this.set(0, 0, 0, 1);
            }
            ,
            Q.invert = function() {
                return this.conjugate();
            }
            ,
            Q.conjugate = function() {
                return this._x *= -1,
                this._y *= -1,
                this._z *= -1,
                this._onChangeCallback(),
                this;
            }
            ,
            Q.dot = function(B) {
                return this._x * B._x + this._y * B._y + this._z * B._z + this._w * B._w;
            }
            ,
            Q.lengthSq = function() {
                return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
            }
            ,
            Q.length = function() {
                return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
            }
            ,
            Q.normalize = function() {
                var B = this.length();
                return 0 === B ? (this._x = 0,
                this._y = 0,
                this._z = 0,
                this._w = 1) : (B = 1 / B,
                this._x = this._x * B,
                this._y = this._y * B,
                this._z = this._z * B,
                this._w = this._w * B),
                this._onChangeCallback(),
                this;
            }
            ,
            Q.multiply = function(B) {
                return this.multiplyQuaternions(this, B);
            }
            ,
            Q.premultiply = function(B) {
                return this.multiplyQuaternions(B, this);
            }
            ,
            Q.multiplyQuaternions = function(B, M) {
                var X = B._x
                  , m = B._y
                  , w = B._z
                  , C = B._w
                  , N = M._x
                  , Z = M._y
                  , h = M._z
                  , U = M._w;
                return this._x = X * U + C * N + m * h - w * Z,
                this._y = m * U + C * Z + w * N - X * h,
                this._z = w * U + C * h + X * Z - m * N,
                this._w = C * U - X * N - m * Z - w * h,
                this._onChangeCallback(),
                this;
            }
            ,
            Q.slerp = function(B, M) {
                if (0 === M)
                    return this;
                if (1 === M)
                    return this.copy(B);
                var X = this._x
                  , m = this._y
                  , w = this._z
                  , C = this._w
                  , N = C * B._w + X * B._x + m * B._y + w * B._z;
                if (N < 0 ? (this._w = -B._w,
                this._x = -B._x,
                this._y = -B._y,
                this._z = -B._z,
                N = -N) : this.copy(B),
                N >= 1)
                    return this._w = C,
                    this._x = X,
                    this._y = m,
                    this._z = w,
                    this;
                var Z = 1 - N * N;
                if (Z <= Number.EPSILON) {
                    var U = 1 - M;
                    return this._w = U * C + M * this._w,
                    this._x = U * X + M * this._x,
                    this._y = U * m + M * this._y,
                    this._z = U * w + M * this._z,
                    this.normalize(),
                    this._onChangeCallback(),
                    this;
                }
                var T = Math.sqrt(Z)
                  , V = Math.atan2(T, N)
                  , G = Math.sin((1 - M) * V) / T
                  , k = Math.sin(M * V) / T;
                return this._w = C * G + this._w * k,
                this._x = X * G + this._x * k,
                this._y = m * G + this._y * k,
                this._z = w * G + this._z * k,
                this._onChangeCallback(),
                this;
            }
            ,
            Q.slerpQuaternions = function(B, M, X) {
                return this.copy(B).slerp(M, X);
            }
            ,
            Q.random = function() {
                var B = Math.random()
                  , M = Math.sqrt(1 - B)
                  , X = Math.sqrt(B)
                  , m = 2 * Math.PI * Math.random()
                  , w = 2 * Math.PI * Math.random();
                return this.set(M * Math.cos(m), X * Math.sin(w), X * Math.cos(w), M * Math.sin(m));
            }
            ,
            Q.equals = function(B) {
                return B._x === this._x && B._y === this._y && B._z === this._z && B._w === this._w;
            }
            ,
            Q.fromArray = function(B, M) {
                return undefined === M && (M = 0),
                this._x = B[M],
                this._y = B[M + 1],
                this._z = B[M + 2],
                this._w = B[M + 3],
                this._onChangeCallback(),
                this;
            }
            ,
            Q.toArray = function(B, M) {
                return undefined === B && (B = []),
                undefined === M && (M = 0),
                B[M] = this._x,
                B[M + 1] = this._y,
                B[M + 2] = this._z,
                B[M + 3] = this._w,
                B;
            }
            ,
            Q.fromBufferAttribute = function(B, M) {
                return this._x = B.getX(M),
                this._y = B.getY(M),
                this._z = B.getZ(M),
                this._w = B.getW(M),
                this;
            }
            ,
            Q.toJSON = function() {
                return this.toArray();
            }
            ,
            Q._onChange = function(B) {
                return this._onChangeCallback = B,
                this;
            }
            ,
            Q._onChangeCallback = function() {}
            ,
            Q[Symbol.iterator] = H().mark(function B() {
                return H().wrap(function(M) {
                    for (; ; )
                        switch (M.prev = M.next) {
                        case 0:
                            return M.next = 2,
                            this._x;
                        case 2:
                            return M.next = 4,
                            this._y;
                        case 4:
                            return M.next = 6,
                            this._z;
                        case 6:
                            return M.next = 8,
                            this._w;
                        case 8:
                        case 'end':
                            return M.stop();
                        }
                }, B, this);
            }),
            (0,
            S.A)(P, [{
                'key': 'x',
                'get': function() {
                    return this._x;
                },
                'set': function(M) {
                    this._x = M,
                    this._onChangeCallback();
                }
            }, {
                'key': 'y',
                'get': function() {
                    return this._y;
                },
                'set': function(M) {
                    this._y = M,
                    this._onChangeCallback();
                }
            }, {
                'key': 'z',
                'get': function() {
                    return this._z;
                },
                'set': function(M) {
                    this._z = M,
                    this._onChangeCallback();
                }
            }, {
                'key': 'w',
                'get': function() {
                    return this._w;
                },
                'set': function(M) {
                    this._w = M,
                    this._onChangeCallback();
                }
            }]);
        }());
    }
    ,
    0xbf9a: (F, E, p) => {
        p.d(E, {
            'R': () => M
        });
        var S = p(0x1008e)
          , R = new S.P()
          , H = new S.P()
          , y = new S.P()
          , d = new S.P()
          , P = new S.P()
          , Q = new S.P()
          , B = new S.P()
          , M = (function() {
            function X(w, C) {
                undefined === w && (w = new S.P()),
                undefined === C && (C = new S.P(0,0,-1)),
                this.origin = w,
                this.direction = C;
            }
            var m = X.prototype;
            return m.set = function(w, C) {
                return this.origin.copy(w),
                this.direction.copy(C),
                this;
            }
            ,
            m.copy = function(w) {
                return this.origin.copy(w.origin),
                this.direction.copy(w.direction),
                this;
            }
            ,
            m.at = function(w, C) {
                return C.copy(this.origin).addScaledVector(this.direction, w);
            }
            ,
            m.lookAt = function(w) {
                return this.direction.copy(w).sub(this.origin).normalize(),
                this;
            }
            ,
            m.recast = function(w) {
                return this.origin.copy(this.at(w, R)),
                this;
            }
            ,
            m.closestPointToPoint = function(w, C) {
                C.subVectors(w, this.origin);
                var N = C.dot(this.direction);
                return N < 0 ? C.copy(this.origin) : C.copy(this.origin).addScaledVector(this.direction, N);
            }
            ,
            m.distanceToPoint = function(w) {
                return Math.sqrt(this.distanceSqToPoint(w));
            }
            ,
            m.distanceSqToPoint = function(w) {
                var C = R.subVectors(w, this.origin).dot(this.direction);
                return C < 0 ? this.origin.distanceToSquared(w) : (R.copy(this.origin).addScaledVector(this.direction, C),
                R.distanceToSquared(w));
            }
            ,
            m.distanceSqToSegment = function(w, C, N, Z) {
                H.copy(w).add(C).multiplyScalar(0.5),
                y.copy(C).sub(w).normalize(),
                d.copy(this.origin).sub(H);
                var U, T, V, G, k = 0.5 * w.distanceTo(C), W = -this.direction.dot(y), x = d.dot(this.direction), I = -d.dot(y), L = d.lengthSq(), q = Math.abs(1 - W * W);
                if (q > 0) {
                    if (T = W * x - I,
                    G = k * q,
                    (U = W * I - x) >= 0) {
                        if (T >= -G) {
                            if (T <= G) {
                                var K = 1 / q;
                                V = (U *= K) * (U + W * (T *= K) + 2 * x) + T * (W * U + T + 2 * I) + L;
                            } else
                                T = k,
                                V = -(U = Math.max(0, -(W * T + x))) * U + T * (T + 2 * I) + L;
                        } else
                            T = -k,
                            V = -(U = Math.max(0, -(W * T + x))) * U + T * (T + 2 * I) + L;
                    } else
                        T <= -G ? V = -(U = Math.max(0, -(-W * k + x))) * U + (T = U > 0 ? -k : Math.min(Math.max(-k, -I), k)) * (T + 2 * I) + L : T <= G ? (U = 0,
                        V = (T = Math.min(Math.max(-k, -I), k)) * (T + 2 * I) + L) : V = -(U = Math.max(0, -(W * k + x))) * U + (T = U > 0 ? k : Math.min(Math.max(-k, -I), k)) * (T + 2 * I) + L;
                } else
                    T = W > 0 ? -k : k,
                    V = -(U = Math.max(0, -(W * T + x))) * U + T * (T + 2 * I) + L;
                return N && N.copy(this.origin).addScaledVector(this.direction, U),
                Z && Z.copy(H).addScaledVector(y, T),
                V;
            }
            ,
            m.intersectSphere = function(w, C) {
                R.subVectors(w.center, this.origin);
                var N = R.dot(this.direction)
                  , Z = R.dot(R) - N * N
                  , U = w.radius * w.radius;
                if (Z > U)
                    return null;
                var T = Math.sqrt(U - Z)
                  , V = N - T
                  , G = N + T;
                return G < 0 ? null : V < 0 ? this.at(G, C) : this.at(V, C);
            }
            ,
            m.intersectsSphere = function(w) {
                return this.distanceSqToPoint(w.center) <= w.radius * w.radius;
            }
            ,
            m.distanceToPlane = function(w) {
                var C = w.normal.dot(this.direction);
                if (0 === C)
                    return 0 === w.distanceToPoint(this.origin) ? 0 : null;
                var N = -(this.origin.dot(w.normal) + w.constant) / C;
                return N >= 0 ? N : null;
            }
            ,
            m.intersectPlane = function(w, C) {
                var N = this.distanceToPlane(w);
                return null === N ? null : this.at(N, C);
            }
            ,
            m.intersectsPlane = function(w) {
                var C = w.distanceToPoint(this.origin);
                return 0 === C || w.normal.dot(this.direction) * C < 0;
            }
            ,
            m.intersectBox = function(w, C) {
                var N, Z, U, T, V, G, k = 1 / this.direction.x, W = 1 / this.direction.y, x = 1 / this.direction.z, I = this.origin;
                return k >= 0 ? (N = (w.min.x - I.x) * k,
                Z = (w.max.x - I.x) * k) : (N = (w.max.x - I.x) * k,
                Z = (w.min.x - I.x) * k),
                W >= 0 ? (U = (w.min.y - I.y) * W,
                T = (w.max.y - I.y) * W) : (U = (w.max.y - I.y) * W,
                T = (w.min.y - I.y) * W),
                N > T || U > Z ? null : ((U > N || isNaN(N)) && (N = U),
                (T < Z || isNaN(Z)) && (Z = T),
                x >= 0 ? (V = (w.min.z - I.z) * x,
                G = (w.max.z - I.z) * x) : (V = (w.max.z - I.z) * x,
                G = (w.min.z - I.z) * x),
                N > G || V > Z ? null : ((V > N || N != N) && (N = V),
                (G < Z || Z != Z) && (Z = G),
                Z < 0 ? null : this.at(N >= 0 ? N : Z, C)));
            }
            ,
            m.intersectsBox = function(w) {
                return null !== this.intersectBox(w, R);
            }
            ,
            m.intersectTriangle = function(w, C, N, Z, U) {
                P.subVectors(C, w),
                Q.subVectors(N, w),
                B.crossVectors(P, Q);
                var T, V = this.direction.dot(B);
                if (V > 0) {
                    if (Z)
                        return null;
                    T = 1;
                } else {
                    if (!(V < 0))
                        return null;
                    T = -1,
                    V = -V;
                }
                d.subVectors(this.origin, w);
                var G = T * this.direction.dot(Q.crossVectors(d, Q));
                if (G < 0)
                    return null;
                var k = T * this.direction.dot(P.cross(d));
                if (k < 0)
                    return null;
                if (G + k > V)
                    return null;
                var W = -T * d.dot(B);
                return W < 0 ? null : this.at(W / V, U);
            }
            ,
            m.applyMatrix4 = function(w) {
                return this.origin.applyMatrix4(w),
                this.direction.transformDirection(w),
                this;
            }
            ,
            m.equals = function(w) {
                return w.origin.equals(this.origin) && w.direction.equals(this.direction);
            }
            ,
            m.clone = function() {
                return new this.constructor().copy(this);
            }
            ,
            X;
        }());
    }
    ,
    0x79b5: (F, E, p) => {
        p.d(E, {
            'i': () => P
        });
        var S = p(0x7002)
          , R = p(0x1008e)
          , H = new S.N()
          , y = new R.P()
          , d = new R.P()
          , P = (function() {
            function Q(M, X) {
                undefined === M && (M = new R.P()),
                undefined === X && (X = -1),
                this.center = M,
                this.radius = X;
            }
            var B = Q.prototype;
            return B.set = function(M, X) {
                return this.center.copy(M),
                this.radius = X,
                this;
            }
            ,
            B.setFromPoints = function(M, X) {
                var m = this.center;
                undefined !== X ? m.copy(X) : H.setFromPoints(M).getCenter(m);
                for (var w = 0, l = 0, C = M.length; l < C; l++)
                    w = Math.max(w, m.distanceToSquared(M[l]));
                return this.radius = Math.sqrt(w),
                this;
            }
            ,
            B.copy = function(M) {
                return this.center.copy(M.center),
                this.radius = M.radius,
                this;
            }
            ,
            B.isEmpty = function() {
                return this.radius < 0;
            }
            ,
            B.makeEmpty = function() {
                return this.center.set(0, 0, 0),
                this.radius = -1,
                this;
            }
            ,
            B.containsPoint = function(M) {
                return M.distanceToSquared(this.center) <= this.radius * this.radius;
            }
            ,
            B.distanceToPoint = function(M) {
                return M.distanceTo(this.center) - this.radius;
            }
            ,
            B.intersectsSphere = function(M) {
                var X = this.radius + M.radius;
                return M.center.distanceToSquared(this.center) <= X * X;
            }
            ,
            B.intersectsBox = function(M) {
                return M.intersectsSphere(this);
            }
            ,
            B.intersectsPlane = function(M) {
                return Math.abs(M.distanceToPoint(this.center)) <= this.radius;
            }
            ,
            B.clampPoint = function(M, X) {
                var m = this.center.distanceToSquared(M);
                return X.copy(M),
                m > this.radius * this.radius && (X.sub(this.center).normalize(),
                X.multiplyScalar(this.radius).add(this.center)),
                X;
            }
            ,
            B.getBoundingBox = function(M) {
                return this.isEmpty() ? (M.makeEmpty(),
                M) : (M.set(this.center, this.center),
                M.expandByScalar(this.radius),
                M);
            }
            ,
            B.applyMatrix4 = function(M) {
                return this.center.applyMatrix4(M),
                this.radius = this.radius * M.getMaxScaleOnAxis(),
                this;
            }
            ,
            B.translate = function(M) {
                return this.center.add(M),
                this;
            }
            ,
            B.expandByPoint = function(M) {
                if (this.isEmpty())
                    return this.center.copy(M),
                    this.radius = 0,
                    this;
                y.subVectors(M, this.center);
                var X = y.lengthSq();
                if (X > this.radius * this.radius) {
                    var m = Math.sqrt(X)
                      , w = 0.5 * (m - this.radius);
                    this.center.addScaledVector(y, w / m),
                    this.radius += w;
                }
                return this;
            }
            ,
            B.union = function(M) {
                return M.isEmpty() ? this : this.isEmpty() ? (this.copy(M),
                this) : (true === this.center.equals(M.center) ? this.radius = Math.max(this.radius, M.radius) : (d.subVectors(M.center, this.center).setLength(M.radius),
                this.expandByPoint(y.copy(M.center).add(d)),
                this.expandByPoint(y.copy(M.center).sub(d))),
                this);
            }
            ,
            B.equals = function(M) {
                return M.center.equals(this.center) && M.radius === this.radius;
            }
            ,
            B.clone = function() {
                return new this.constructor().copy(this);
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
        S.d(E, {
            'l': () => U
        });
        var R = S(0x1008e)
          , H = new R.P()
          , y = new R.P()
          , P = new R.P()
          , Q = new R.P()
          , B = new R.P()
          , M = new R.P()
          , X = new R.P()
          , w = new R.P()
          , C = new R.P()
          , N = new R.P()
          , Z = false
          , U = (function() {
            function T(G, k, W) {
                undefined === G && (G = new R.P()),
                undefined === k && (k = new R.P()),
                undefined === W && (W = new R.P()),
                this.a = G,
                this.b = k,
                this.c = W;
            }
            T.getNormal = function(G, k, W, x) {
                x.subVectors(W, k),
                H.subVectors(G, k),
                x.cross(H);
                var I = x.lengthSq();
                return I > 0 ? x.multiplyScalar(1 / Math.sqrt(I)) : x.set(0, 0, 0);
            }
            ,
            T.getBarycoord = function(G, k, W, x, I) {
                H.subVectors(x, k),
                y.subVectors(W, k),
                P.subVectors(G, k);
                var g = H.dot(H)
                  , L = H.dot(y)
                  , q = H.dot(P)
                  , K = y.dot(y)
                  , Y = y.dot(P)
                  , z = g * K - L * L;
                if (0 === z)
                    return I.set(-2, -1, -1);
                var A = 1 / z
                  , j = (K * q - L * Y) * A
                  , O = (g * Y - L * q) * A;
                return I.set(1 - j - O, O, j);
            }
            ,
            T.containsPoint = function(G, k, W, x) {
                return this.getBarycoord(G, k, W, x, Q),
                Q.x >= 0 && Q.y >= 0 && Q.x + Q.y <= 1;
            }
            ,
            T.getUV = function(G, k, W, x, I, g, L, q) {
                return false === Z && (console.warn('THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().'),
                Z = true),
                this.getInterpolation(G, k, W, x, I, g, L, q);
            }
            ,
            T.getInterpolation = function(G, k, W, x, I, g, L, q) {
                return this.getBarycoord(G, k, W, x, Q),
                q.setScalar(0),
                q.addScaledVector(I, Q.x),
                q.addScaledVector(g, Q.y),
                q.addScaledVector(L, Q.z),
                q;
            }
            ,
            T.isFrontFacing = function(G, k, W, x) {
                return H.subVectors(W, k),
                y.subVectors(G, k),
                H.cross(y).dot(x) < 0;
            }
            ;
            var V = T.prototype;
            return V.set = function(G, k, W) {
                return this.a.copy(G),
                this.b.copy(k),
                this.c.copy(W),
                this;
            }
            ,
            V.setFromPointsAndIndices = function(G, k, W, x) {
                return this.a.copy(G[k]),
                this.b.copy(G[W]),
                this.c.copy(G[x]),
                this;
            }
            ,
            V.setFromAttributeAndIndices = function(G, k, W, x) {
                return this.a.fromBufferAttribute(G, k),
                this.b.fromBufferAttribute(G, W),
                this.c.fromBufferAttribute(G, x),
                this;
            }
            ,
            V.clone = function() {
                return new this.constructor().copy(this);
            }
            ,
            V.copy = function(G) {
                return this.a.copy(G.a),
                this.b.copy(G.b),
                this.c.copy(G.c),
                this;
            }
            ,
            V.getArea = function() {
                return H.subVectors(this.c, this.b),
                y.subVectors(this.a, this.b),
                0.5 * H.cross(y).length();
            }
            ,
            V.getMidpoint = function(G) {
                return G.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
            }
            ,
            V.getNormal = function(G) {
                return T.getNormal(this.a, this.b, this.c, G);
            }
            ,
            V.getPlane = function(G) {
                return G.setFromCoplanarPoints(this.a, this.b, this.c);
            }
            ,
            V.getBarycoord = function(G, k) {
                return T.getBarycoord(G, this.a, this.b, this.c, k);
            }
            ,
            V.getUV = function(G, k, W, x, I) {
                return false === Z && (console.warn('THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().'),
                Z = true),
                T.getInterpolation(G, this.a, this.b, this.c, k, W, x, I);
            }
            ,
            V.getInterpolation = function(G, k, W, x, I) {
                return T.getInterpolation(G, this.a, this.b, this.c, k, W, x, I);
            }
            ,
            V.containsPoint = function(G) {
                return T.containsPoint(G, this.a, this.b, this.c);
            }
            ,
            V.isFrontFacing = function(G) {
                return T.isFrontFacing(this.a, this.b, this.c, G);
            }
            ,
            V.intersectsBox = function(G) {
                return G.intersectsTriangle(this);
            }
            ,
            V.closestPointToPoint = function(G, k) {
                var W, I, L = this.a, q = this.b, K = this.c;
                B.subVectors(q, L),
                M.subVectors(K, L),
                w.subVectors(G, L);
                var Y = B.dot(w)
                  , z = M.dot(w);
                if (Y <= 0 && z <= 0)
                    return k.copy(L);
                C.subVectors(G, q);
                var A = B.dot(C)
                  , j = M.dot(C);
                if (A >= 0 && j <= A)
                    return k.copy(q);
                var O = Y * j - A * z;
                if (O <= 0 && Y >= 0 && A <= 0)
                    return W = Y / (Y - A),
                    k.copy(L).addScaledVector(B, W);
                N.subVectors(G, K);
                var J = B.dot(N)
                  , b = M.dot(N);
                if (b >= 0 && J <= b)
                    return k.copy(K);
                var D = J * z - Y * b;
                if (D <= 0 && z >= 0 && b <= 0)
                    return I = z / (z - b),
                    k.copy(L).addScaledVector(M, I);
                var r0 = A * b - J * j;
                if (r0 <= 0 && j - A >= 0 && J - b >= 0)
                    return X.subVectors(K, q),
                    I = (j - A) / (j - A + (J - b)),
                    k.copy(q).addScaledVector(X, I);
                var r1 = 1 / (r0 + D + O);
                return W = D * r1,
                I = O * r1,
                k.copy(L).addScaledVector(B, W).addScaledVector(M, I);
            }
            ,
            V.equals = function(G) {
                return G.a.equals(this.a) && G.b.equals(this.b) && G.c.equals(this.c);
            }
            ,
            T;
        }());
    }
    ,
    0x1264d: (F, E, p) => {
        p.d(E, {
            'I': () => d
        });
        var S = p(0x14124)
          , R = p(0xd5e4)
          , H = p.n(R)
          , y = p(0xbd95)
          , d = (function() {
            function P(B, M) {
                undefined === B && (B = 0),
                undefined === M && (M = 0),
                P.prototype.isVector2 = true,
                this.x = B,
                this.y = M;
            }
            var Q = P.prototype;
            return Q.set = function(B, M) {
                return this.x = B,
                this.y = M,
                this;
            }
            ,
            Q.setScalar = function(B) {
                return this.x = B,
                this.y = B,
                this;
            }
            ,
            Q.setX = function(B) {
                return this.x = B,
                this;
            }
            ,
            Q.setY = function(B) {
                return this.y = B,
                this;
            }
            ,
            Q.setComponent = function(B, M) {
                switch (B) {
                case 0:
                    this.x = M;
                    break;
                case 1:
                    this.y = M;
                    break;
                default:
                    throw new Error('index is out of range: ' + B);
                }
                return this;
            }
            ,
            Q.getComponent = function(B) {
                switch (B) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                default:
                    throw new Error('index is out of range: ' + B);
                }
            }
            ,
            Q.clone = function() {
                return new this.constructor(this.x,this.y);
            }
            ,
            Q.copy = function(B) {
                return this.x = B.x,
                this.y = B.y,
                this;
            }
            ,
            Q.add = function(B) {
                return this.x += B.x,
                this.y += B.y,
                this;
            }
            ,
            Q.addScalar = function(B) {
                return this.x += B,
                this.y += B,
                this;
            }
            ,
            Q.addVectors = function(B, M) {
                return this.x = B.x + M.x,
                this.y = B.y + M.y,
                this;
            }
            ,
            Q.addScaledVector = function(B, M) {
                return this.x += B.x * M,
                this.y += B.y * M,
                this;
            }
            ,
            Q.sub = function(B) {
                return this.x -= B.x,
                this.y -= B.y,
                this;
            }
            ,
            Q.subScalar = function(B) {
                return this.x -= B,
                this.y -= B,
                this;
            }
            ,
            Q.subVectors = function(B, M) {
                return this.x = B.x - M.x,
                this.y = B.y - M.y,
                this;
            }
            ,
            Q.multiply = function(B) {
                return this.x *= B.x,
                this.y *= B.y,
                this;
            }
            ,
            Q.multiplyScalar = function(B) {
                return this.x *= B,
                this.y *= B,
                this;
            }
            ,
            Q.divide = function(B) {
                return this.x /= B.x,
                this.y /= B.y,
                this;
            }
            ,
            Q.divideScalar = function(B) {
                return this.multiplyScalar(1 / B);
            }
            ,
            Q.applyMatrix3 = function(B) {
                var M = this.x
                  , X = this.y
                  , m = B.elements;
                return this.x = m[0] * M + m[3] * X + m[6],
                this.y = m[1] * M + m[4] * X + m[7],
                this;
            }
            ,
            Q.min = function(B) {
                return this.x = Math.min(this.x, B.x),
                this.y = Math.min(this.y, B.y),
                this;
            }
            ,
            Q.max = function(B) {
                return this.x = Math.max(this.x, B.x),
                this.y = Math.max(this.y, B.y),
                this;
            }
            ,
            Q.clamp = function(B, M) {
                return this.x = Math.max(B.x, Math.min(M.x, this.x)),
                this.y = Math.max(B.y, Math.min(M.y, this.y)),
                this;
            }
            ,
            Q.clampScalar = function(B, M) {
                return this.x = Math.max(B, Math.min(M, this.x)),
                this.y = Math.max(B, Math.min(M, this.y)),
                this;
            }
            ,
            Q.clampLength = function(B, M) {
                var X = this.length();
                return this.divideScalar(X || 1).multiplyScalar(Math.max(B, Math.min(M, X)));
            }
            ,
            Q.floor = function() {
                return this.x = Math.floor(this.x),
                this.y = Math.floor(this.y),
                this;
            }
            ,
            Q.ceil = function() {
                return this.x = Math.ceil(this.x),
                this.y = Math.ceil(this.y),
                this;
            }
            ,
            Q.round = function() {
                return this.x = Math.round(this.x),
                this.y = Math.round(this.y),
                this;
            }
            ,
            Q.roundToZero = function() {
                return this.x = Math.trunc(this.x),
                this.y = Math.trunc(this.y),
                this;
            }
            ,
            Q.negate = function() {
                return this.x = -this.x,
                this.y = -this.y,
                this;
            }
            ,
            Q.dot = function(B) {
                return this.x * B.x + this.y * B.y;
            }
            ,
            Q.cross = function(B) {
                return this.x * B.y - this.y * B.x;
            }
            ,
            Q.lengthSq = function() {
                return this.x * this.x + this.y * this.y;
            }
            ,
            Q.length = function() {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            }
            ,
            Q.manhattanLength = function() {
                return Math.abs(this.x) + Math.abs(this.y);
            }
            ,
            Q.normalize = function() {
                return this.divideScalar(this.length() || 1);
            }
            ,
            Q.angle = function() {
                var B = Math.atan2(-this.y, -this.x) + Math.PI;
                return B;
            }
            ,
            Q.angleTo = function(B) {
                var M = Math.sqrt(this.lengthSq() * B.lengthSq());
                if (0 === M)
                    return Math.PI / 2;
                var X = this.dot(B) / M;
                return Math.acos(y.qE(X, -1, 1));
            }
            ,
            Q.distanceTo = function(B) {
                return Math.sqrt(this.distanceToSquared(B));
            }
            ,
            Q.distanceToSquared = function(B) {
                var M = this.x - B.x
                  , X = this.y - B.y;
                return M * M + X * X;
            }
            ,
            Q.manhattanDistanceTo = function(B) {
                return Math.abs(this.x - B.x) + Math.abs(this.y - B.y);
            }
            ,
            Q.setLength = function(B) {
                return this.normalize().multiplyScalar(B);
            }
            ,
            Q.lerp = function(B, M) {
                return this.x += (B.x - this.x) * M,
                this.y += (B.y - this.y) * M,
                this;
            }
            ,
            Q.lerpVectors = function(B, M, X) {
                return this.x = B.x + (M.x - B.x) * X,
                this.y = B.y + (M.y - B.y) * X,
                this;
            }
            ,
            Q.equals = function(B) {
                return B.x === this.x && B.y === this.y;
            }
            ,
            Q.fromArray = function(B, M) {
                return undefined === M && (M = 0),
                this.x = B[M],
                this.y = B[M + 1],
                this;
            }
            ,
            Q.toArray = function(B, M) {
                return undefined === B && (B = []),
                undefined === M && (M = 0),
                B[M] = this.x,
                B[M + 1] = this.y,
                B;
            }
            ,
            Q.fromBufferAttribute = function(B, M) {
                return this.x = B.getX(M),
                this.y = B.getY(M),
                this;
            }
            ,
            Q.rotateAround = function(B, M) {
                var X = Math.cos(M)
                  , m = Math.sin(M)
                  , w = this.x - B.x
                  , l = this.y - B.y;
                return this.x = w * X - l * m + B.x,
                this.y = w * m + l * X + B.y,
                this;
            }
            ,
            Q.random = function() {
                return this.x = Math.random(),
                this.y = Math.random(),
                this;
            }
            ,
            Q[Symbol.iterator] = H().mark(function B() {
                return H().wrap(function(M) {
                    for (; ; )
                        switch (M.prev = M.next) {
                        case 0:
                            return M.next = 2,
                            this.x;
                        case 2:
                            return M.next = 4,
                            this.y;
                        case 4:
                        case 'end':
                            return M.stop();
                        }
                }, B, this);
            }),
            (0,
            S.A)(P, [{
                'key': 'width',
                'get': function() {
                    return this.x;
                },
                'set': function(M) {
                    this.x = M;
                }
            }, {
                'key': 'height',
                'get': function() {
                    return this.y;
                },
                'set': function(M) {
                    this.y = M;
                }
            }]);
        }());
    }
    ,
    0x1008e: (F, E, p) => {
        p.d(E, {
            'P': () => d
        });
        var S = p(0xd5e4)
          , R = p.n(S)
          , H = p(0xbd95)
          , y = p(0x13294)
          , d = (function() {
            function B(X, m, w) {
                undefined === X && (X = 0),
                undefined === m && (m = 0),
                undefined === w && (w = 0),
                B.prototype.isVector3 = true,
                this.x = X,
                this.y = m,
                this.z = w;
            }
            var M = B.prototype;
            return M.set = function(X, m, w) {
                return undefined === w && (w = this.z),
                this.x = X,
                this.y = m,
                this.z = w,
                this;
            }
            ,
            M.setScalar = function(X) {
                return this.x = X,
                this.y = X,
                this.z = X,
                this;
            }
            ,
            M.setX = function(X) {
                return this.x = X,
                this;
            }
            ,
            M.setY = function(X) {
                return this.y = X,
                this;
            }
            ,
            M.setZ = function(X) {
                return this.z = X,
                this;
            }
            ,
            M.setComponent = function(X, m) {
                switch (X) {
                case 0:
                    this.x = m;
                    break;
                case 1:
                    this.y = m;
                    break;
                case 2:
                    this.z = m;
                    break;
                default:
                    throw new Error('index is out of range: ' + X);
                }
                return this;
            }
            ,
            M.getComponent = function(X) {
                switch (X) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                default:
                    throw new Error('index is out of range: ' + X);
                }
            }
            ,
            M.clone = function() {
                return new this.constructor(this.x,this.y,this.z);
            }
            ,
            M.copy = function(X) {
                return this.x = X.x,
                this.y = X.y,
                this.z = X.z,
                this;
            }
            ,
            M.add = function(X) {
                return this.x += X.x,
                this.y += X.y,
                this.z += X.z,
                this;
            }
            ,
            M.addScalar = function(X) {
                return this.x += X,
                this.y += X,
                this.z += X,
                this;
            }
            ,
            M.addVectors = function(X, m) {
                return this.x = X.x + m.x,
                this.y = X.y + m.y,
                this.z = X.z + m.z,
                this;
            }
            ,
            M.addScaledVector = function(X, m) {
                return this.x += X.x * m,
                this.y += X.y * m,
                this.z += X.z * m,
                this;
            }
            ,
            M.sub = function(X) {
                return this.x -= X.x,
                this.y -= X.y,
                this.z -= X.z,
                this;
            }
            ,
            M.subScalar = function(X) {
                return this.x -= X,
                this.y -= X,
                this.z -= X,
                this;
            }
            ,
            M.subVectors = function(X, m) {
                return this.x = X.x - m.x,
                this.y = X.y - m.y,
                this.z = X.z - m.z,
                this;
            }
            ,
            M.multiply = function(X) {
                return this.x *= X.x,
                this.y *= X.y,
                this.z *= X.z,
                this;
            }
            ,
            M.multiplyScalar = function(X) {
                return this.x *= X,
                this.y *= X,
                this.z *= X,
                this;
            }
            ,
            M.multiplyVectors = function(X, m) {
                return this.x = X.x * m.x,
                this.y = X.y * m.y,
                this.z = X.z * m.z,
                this;
            }
            ,
            M.applyEuler = function(X) {
                return this.applyQuaternion(Q.setFromEuler(X));
            }
            ,
            M.applyAxisAngle = function(X, m) {
                return this.applyQuaternion(Q.setFromAxisAngle(X, m));
            }
            ,
            M.applyMatrix3 = function(X) {
                var m = this.x
                  , w = this.y
                  , C = this.z
                  , N = X.elements;
                return this.x = N[0] * m + N[3] * w + N[6] * C,
                this.y = N[1] * m + N[4] * w + N[7] * C,
                this.z = N[2] * m + N[5] * w + N[8] * C,
                this;
            }
            ,
            M.applyNormalMatrix = function(X) {
                return this.applyMatrix3(X).normalize();
            }
            ,
            M.applyMatrix4 = function(X) {
                var m = this.x
                  , w = this.y
                  , C = this.z
                  , N = X.elements
                  , Z = 1 / (N[3] * m + N[7] * w + N[11] * C + N[15]);
                return this.x = (N[0] * m + N[4] * w + N[8] * C + N[12]) * Z,
                this.y = (N[1] * m + N[5] * w + N[9] * C + N[13]) * Z,
                this.z = (N[2] * m + N[6] * w + N[10] * C + N[14]) * Z,
                this;
            }
            ,
            M.applyQuaternion = function(X) {
                var m = this.x
                  , w = this.y
                  , C = this.z
                  , N = X.x
                  , Z = X.y
                  , h = X.z
                  , U = X.w
                  , T = 2 * (Z * C - h * w)
                  , V = 2 * (h * m - N * C)
                  , G = 2 * (N * w - Z * m);
                return this.x = m + U * T + Z * G - h * V,
                this.y = w + U * V + h * T - N * G,
                this.z = C + U * G + N * V - Z * T,
                this;
            }
            ,
            M.project = function(X) {
                return this.applyMatrix4(X.matrixWorldInverse).applyMatrix4(X.projectionMatrix);
            }
            ,
            M.unproject = function(X) {
                return this.applyMatrix4(X.projectionMatrixInverse).applyMatrix4(X.matrixWorld);
            }
            ,
            M.transformDirection = function(X) {
                var m = this.x
                  , w = this.y
                  , C = this.z
                  , N = X.elements;
                return this.x = N[0] * m + N[4] * w + N[8] * C,
                this.y = N[1] * m + N[5] * w + N[9] * C,
                this.z = N[2] * m + N[6] * w + N[10] * C,
                this.normalize();
            }
            ,
            M.divide = function(X) {
                return this.x /= X.x,
                this.y /= X.y,
                this.z /= X.z,
                this;
            }
            ,
            M.divideScalar = function(X) {
                return this.multiplyScalar(1 / X);
            }
            ,
            M.min = function(X) {
                return this.x = Math.min(this.x, X.x),
                this.y = Math.min(this.y, X.y),
                this.z = Math.min(this.z, X.z),
                this;
            }
            ,
            M.max = function(X) {
                return this.x = Math.max(this.x, X.x),
                this.y = Math.max(this.y, X.y),
                this.z = Math.max(this.z, X.z),
                this;
            }
            ,
            M.clamp = function(X, m) {
                return this.x = Math.max(X.x, Math.min(m.x, this.x)),
                this.y = Math.max(X.y, Math.min(m.y, this.y)),
                this.z = Math.max(X.z, Math.min(m.z, this.z)),
                this;
            }
            ,
            M.clampScalar = function(X, m) {
                return this.x = Math.max(X, Math.min(m, this.x)),
                this.y = Math.max(X, Math.min(m, this.y)),
                this.z = Math.max(X, Math.min(m, this.z)),
                this;
            }
            ,
            M.clampLength = function(X, m) {
                var w = this.length();
                return this.divideScalar(w || 1).multiplyScalar(Math.max(X, Math.min(m, w)));
            }
            ,
            M.floor = function() {
                return this.x = Math.floor(this.x),
                this.y = Math.floor(this.y),
                this.z = Math.floor(this.z),
                this;
            }
            ,
            M.ceil = function() {
                return this.x = Math.ceil(this.x),
                this.y = Math.ceil(this.y),
                this.z = Math.ceil(this.z),
                this;
            }
            ,
            M.round = function() {
                return this.x = Math.round(this.x),
                this.y = Math.round(this.y),
                this.z = Math.round(this.z),
                this;
            }
            ,
            M.roundToZero = function() {
                return this.x = Math.trunc(this.x),
                this.y = Math.trunc(this.y),
                this.z = Math.trunc(this.z),
                this;
            }
            ,
            M.negate = function() {
                return this.x = -this.x,
                this.y = -this.y,
                this.z = -this.z,
                this;
            }
            ,
            M.dot = function(X) {
                return this.x * X.x + this.y * X.y + this.z * X.z;
            }
            ,
            M.lengthSq = function() {
                return this.x * this.x + this.y * this.y + this.z * this.z;
            }
            ,
            M.length = function() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            }
            ,
            M.manhattanLength = function() {
                return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
            }
            ,
            M.normalize = function() {
                return this.divideScalar(this.length() || 1);
            }
            ,
            M.setLength = function(X) {
                return this.normalize().multiplyScalar(X);
            }
            ,
            M.lerp = function(X, m) {
                return this.x += (X.x - this.x) * m,
                this.y += (X.y - this.y) * m,
                this.z += (X.z - this.z) * m,
                this;
            }
            ,
            M.lerpVectors = function(X, m, w) {
                return this.x = X.x + (m.x - X.x) * w,
                this.y = X.y + (m.y - X.y) * w,
                this.z = X.z + (m.z - X.z) * w,
                this;
            }
            ,
            M.cross = function(X) {
                return this.crossVectors(this, X);
            }
            ,
            M.crossVectors = function(X, m) {
                var w = X.x
                  , C = X.y
                  , N = X.z
                  , Z = m.x
                  , h = m.y
                  , U = m.z;
                return this.x = C * U - N * h,
                this.y = N * Z - w * U,
                this.z = w * h - C * Z,
                this;
            }
            ,
            M.projectOnVector = function(X) {
                var m = X.lengthSq();
                if (0 === m)
                    return this.set(0, 0, 0);
                var w = X.dot(this) / m;
                return this.copy(X).multiplyScalar(w);
            }
            ,
            M.projectOnPlane = function(X) {
                return P.copy(this).projectOnVector(X),
                this.sub(P);
            }
            ,
            M.reflect = function(X) {
                return this.sub(P.copy(X).multiplyScalar(2 * this.dot(X)));
            }
            ,
            M.angleTo = function(X) {
                var m = Math.sqrt(this.lengthSq() * X.lengthSq());
                if (0 === m)
                    return Math.PI / 2;
                var w = this.dot(X) / m;
                return Math.acos(H.qE(w, -1, 1));
            }
            ,
            M.distanceTo = function(X) {
                return Math.sqrt(this.distanceToSquared(X));
            }
            ,
            M.distanceToSquared = function(X) {
                var m = this.x - X.x
                  , w = this.y - X.y
                  , C = this.z - X.z;
                return m * m + w * w + C * C;
            }
            ,
            M.manhattanDistanceTo = function(X) {
                return Math.abs(this.x - X.x) + Math.abs(this.y - X.y) + Math.abs(this.z - X.z);
            }
            ,
            M.setFromSpherical = function(X) {
                return this.setFromSphericalCoords(X.radius, X.phi, X.theta);
            }
            ,
            M.setFromSphericalCoords = function(X, m, w) {
                var C = Math.sin(m) * X;
                return this.x = C * Math.sin(w),
                this.y = Math.cos(m) * X,
                this.z = C * Math.cos(w),
                this;
            }
            ,
            M.setFromCylindrical = function(X) {
                return this.setFromCylindricalCoords(X.radius, X.theta, X.y);
            }
            ,
            M.setFromCylindricalCoords = function(X, m, w) {
                return this.x = X * Math.sin(m),
                this.y = w,
                this.z = X * Math.cos(m),
                this;
            }
            ,
            M.setFromMatrixPosition = function(X) {
                var m = X.elements;
                return this.x = m[12],
                this.y = m[13],
                this.z = m[14],
                this;
            }
            ,
            M.setFromMatrixScale = function(X) {
                var m = this.setFromMatrixColumn(X, 0).length()
                  , w = this.setFromMatrixColumn(X, 1).length()
                  , C = this.setFromMatrixColumn(X, 2).length();
                return this.x = m,
                this.y = w,
                this.z = C,
                this;
            }
            ,
            M.setFromMatrixColumn = function(X, m) {
                return this.fromArray(X.elements, 4 * m);
            }
            ,
            M.setFromMatrix3Column = function(X, m) {
                return this.fromArray(X.elements, 3 * m);
            }
            ,
            M.setFromEuler = function(X) {
                return this.x = X._x,
                this.y = X._y,
                this.z = X._z,
                this;
            }
            ,
            M.setFromColor = function(X) {
                return this.x = X.r,
                this.y = X.g,
                this.z = X.b,
                this;
            }
            ,
            M.equals = function(X) {
                return X.x === this.x && X.y === this.y && X.z === this.z;
            }
            ,
            M.fromArray = function(X, m) {
                return undefined === m && (m = 0),
                this.x = X[m],
                this.y = X[m + 1],
                this.z = X[m + 2],
                this;
            }
            ,
            M.toArray = function(X, m) {
                return undefined === X && (X = []),
                undefined === m && (m = 0),
                X[m] = this.x,
                X[m + 1] = this.y,
                X[m + 2] = this.z,
                X;
            }
            ,
            M.fromBufferAttribute = function(X, m) {
                return this.x = X.getX(m),
                this.y = X.getY(m),
                this.z = X.getZ(m),
                this;
            }
            ,
            M.random = function() {
                return this.x = Math.random(),
                this.y = Math.random(),
                this.z = Math.random(),
                this;
            }
            ,
            M.randomDirection = function() {
                var X = 2 * (Math.random() - 0.5)
                  , m = Math.random() * Math.PI * 2
                  , w = Math.sqrt(1 - Math.pow(X, 2));
                return this.x = w * Math.cos(m),
                this.y = w * Math.sin(m),
                this.z = X,
                this;
            }
            ,
            M[Symbol.iterator] = R().mark(function X() {
                return R().wrap(function(m) {
                    for (; ; )
                        switch (m.prev = m.next) {
                        case 0:
                            return m.next = 2,
                            this.x;
                        case 2:
                            return m.next = 4,
                            this.y;
                        case 4:
                            return m.next = 6,
                            this.z;
                        case 6:
                        case 'end':
                            return m.stop();
                        }
                }, X, this);
            }),
            B;
        }())
          , P = new d()
          , Q = new y.P();
    }
    ,
    0xb3ef: (F, E, p) => {
        p.d(E, {
            'I': () => y
        });
        var S = p(0x14124)
          , R = p(0xd5e4)
          , H = p.n(R)
          , y = (function() {
            function d(Q, B, M, X) {
                undefined === Q && (Q = 0),
                undefined === B && (B = 0),
                undefined === M && (M = 0),
                undefined === X && (X = 1),
                d.prototype.isVector4 = true,
                this.x = Q,
                this.y = B,
                this.z = M,
                this.w = X;
            }
            var P = d.prototype;
            return P.set = function(Q, B, M, X) {
                return this.x = Q,
                this.y = B,
                this.z = M,
                this.w = X,
                this;
            }
            ,
            P.setScalar = function(Q) {
                return this.x = Q,
                this.y = Q,
                this.z = Q,
                this.w = Q,
                this;
            }
            ,
            P.setX = function(Q) {
                return this.x = Q,
                this;
            }
            ,
            P.setY = function(Q) {
                return this.y = Q,
                this;
            }
            ,
            P.setZ = function(Q) {
                return this.z = Q,
                this;
            }
            ,
            P.setW = function(Q) {
                return this.w = Q,
                this;
            }
            ,
            P.setComponent = function(Q, B) {
                switch (Q) {
                case 0:
                    this.x = B;
                    break;
                case 1:
                    this.y = B;
                    break;
                case 2:
                    this.z = B;
                    break;
                case 3:
                    this.w = B;
                    break;
                default:
                    throw new Error('index is out of range: ' + Q);
                }
                return this;
            }
            ,
            P.getComponent = function(Q) {
                switch (Q) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                case 3:
                    return this.w;
                default:
                    throw new Error('index is out of range: ' + Q);
                }
            }
            ,
            P.clone = function() {
                return new this.constructor(this.x,this.y,this.z,this.w);
            }
            ,
            P.copy = function(Q) {
                return this.x = Q.x,
                this.y = Q.y,
                this.z = Q.z,
                this.w = undefined !== Q.w ? Q.w : 1,
                this;
            }
            ,
            P.add = function(Q) {
                return this.x += Q.x,
                this.y += Q.y,
                this.z += Q.z,
                this.w += Q.w,
                this;
            }
            ,
            P.addScalar = function(Q) {
                return this.x += Q,
                this.y += Q,
                this.z += Q,
                this.w += Q,
                this;
            }
            ,
            P.addVectors = function(Q, B) {
                return this.x = Q.x + B.x,
                this.y = Q.y + B.y,
                this.z = Q.z + B.z,
                this.w = Q.w + B.w,
                this;
            }
            ,
            P.addScaledVector = function(Q, B) {
                return this.x += Q.x * B,
                this.y += Q.y * B,
                this.z += Q.z * B,
                this.w += Q.w * B,
                this;
            }
            ,
            P.sub = function(Q) {
                return this.x -= Q.x,
                this.y -= Q.y,
                this.z -= Q.z,
                this.w -= Q.w,
                this;
            }
            ,
            P.subScalar = function(Q) {
                return this.x -= Q,
                this.y -= Q,
                this.z -= Q,
                this.w -= Q,
                this;
            }
            ,
            P.subVectors = function(Q, B) {
                return this.x = Q.x - B.x,
                this.y = Q.y - B.y,
                this.z = Q.z - B.z,
                this.w = Q.w - B.w,
                this;
            }
            ,
            P.multiply = function(Q) {
                return this.x *= Q.x,
                this.y *= Q.y,
                this.z *= Q.z,
                this.w *= Q.w,
                this;
            }
            ,
            P.multiplyScalar = function(Q) {
                return this.x *= Q,
                this.y *= Q,
                this.z *= Q,
                this.w *= Q,
                this;
            }
            ,
            P.applyMatrix4 = function(Q) {
                var B = this.x
                  , M = this.y
                  , X = this.z
                  , m = this.w
                  , w = Q.elements;
                return this.x = w[0] * B + w[4] * M + w[8] * X + w[12] * m,
                this.y = w[1] * B + w[5] * M + w[9] * X + w[13] * m,
                this.z = w[2] * B + w[6] * M + w[10] * X + w[14] * m,
                this.w = w[3] * B + w[7] * M + w[11] * X + w[15] * m,
                this;
            }
            ,
            P.divideScalar = function(Q) {
                return this.multiplyScalar(1 / Q);
            }
            ,
            P.setAxisAngleFromQuaternion = function(Q) {
                this.w = 2 * Math.acos(Q.w);
                var B = Math.sqrt(1 - Q.w * Q.w);
                return B < 0.0001 ? (this.x = 1,
                this.y = 0,
                this.z = 0) : (this.x = Q.x / B,
                this.y = Q.y / B,
                this.z = Q.z / B),
                this;
            }
            ,
            P.setAxisAngleFromRotationMatrix = function(Q) {
                var B, X, w, C, N = 0.01, Z = 0.1, U = Q.elements, T = U[0], V = U[4], G = U[8], k = U[1], W = U[5], I = U[9], L = U[2], q = U[6], K = U[10];
                if (Math.abs(V - k) < N && Math.abs(G - L) < N && Math.abs(I - q) < N) {
                    if (Math.abs(V + k) < Z && Math.abs(G + L) < Z && Math.abs(I + q) < Z && Math.abs(T + W + K - 3) < Z)
                        return this.set(1, 0, 0, 0),
                        this;
                    B = Math.PI;
                    var Y = (T + 1) / 2
                      , z = (W + 1) / 2
                      , A = (K + 1) / 2
                      , j = (V + k) / 4
                      , O = (G + L) / 4
                      , J = (I + q) / 4;
                    return Y > z && Y > A ? Y < N ? (X = 0,
                    w = 0.707106781,
                    C = 0.707106781) : (w = j / (X = Math.sqrt(Y)),
                    C = O / X) : z > A ? z < N ? (X = 0.707106781,
                    w = 0,
                    C = 0.707106781) : (X = j / (w = Math.sqrt(z)),
                    C = J / w) : A < N ? (X = 0.707106781,
                    w = 0.707106781,
                    C = 0) : (X = O / (C = Math.sqrt(A)),
                    w = J / C),
                    this.set(X, w, C, B),
                    this;
                }
                var D = Math.sqrt((q - I) * (q - I) + (G - L) * (G - L) + (k - V) * (k - V));
                return Math.abs(D) < 0.001 && (D = 1),
                this.x = (q - I) / D,
                this.y = (G - L) / D,
                this.z = (k - V) / D,
                this.w = Math.acos((T + W + K - 1) / 2),
                this;
            }
            ,
            P.min = function(Q) {
                return this.x = Math.min(this.x, Q.x),
                this.y = Math.min(this.y, Q.y),
                this.z = Math.min(this.z, Q.z),
                this.w = Math.min(this.w, Q.w),
                this;
            }
            ,
            P.max = function(Q) {
                return this.x = Math.max(this.x, Q.x),
                this.y = Math.max(this.y, Q.y),
                this.z = Math.max(this.z, Q.z),
                this.w = Math.max(this.w, Q.w),
                this;
            }
            ,
            P.clamp = function(Q, B) {
                return this.x = Math.max(Q.x, Math.min(B.x, this.x)),
                this.y = Math.max(Q.y, Math.min(B.y, this.y)),
                this.z = Math.max(Q.z, Math.min(B.z, this.z)),
                this.w = Math.max(Q.w, Math.min(B.w, this.w)),
                this;
            }
            ,
            P.clampScalar = function(Q, B) {
                return this.x = Math.max(Q, Math.min(B, this.x)),
                this.y = Math.max(Q, Math.min(B, this.y)),
                this.z = Math.max(Q, Math.min(B, this.z)),
                this.w = Math.max(Q, Math.min(B, this.w)),
                this;
            }
            ,
            P.clampLength = function(Q, B) {
                var M = this.length();
                return this.divideScalar(M || 1).multiplyScalar(Math.max(Q, Math.min(B, M)));
            }
            ,
            P.floor = function() {
                return this.x = Math.floor(this.x),
                this.y = Math.floor(this.y),
                this.z = Math.floor(this.z),
                this.w = Math.floor(this.w),
                this;
            }
            ,
            P.ceil = function() {
                return this.x = Math.ceil(this.x),
                this.y = Math.ceil(this.y),
                this.z = Math.ceil(this.z),
                this.w = Math.ceil(this.w),
                this;
            }
            ,
            P.round = function() {
                return this.x = Math.round(this.x),
                this.y = Math.round(this.y),
                this.z = Math.round(this.z),
                this.w = Math.round(this.w),
                this;
            }
            ,
            P.roundToZero = function() {
                return this.x = Math.trunc(this.x),
                this.y = Math.trunc(this.y),
                this.z = Math.trunc(this.z),
                this.w = Math.trunc(this.w),
                this;
            }
            ,
            P.negate = function() {
                return this.x = -this.x,
                this.y = -this.y,
                this.z = -this.z,
                this.w = -this.w,
                this;
            }
            ,
            P.dot = function(Q) {
                return this.x * Q.x + this.y * Q.y + this.z * Q.z + this.w * Q.w;
            }
            ,
            P.lengthSq = function() {
                return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
            }
            ,
            P.length = function() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
            }
            ,
            P.manhattanLength = function() {
                return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
            }
            ,
            P.normalize = function() {
                return this.divideScalar(this.length() || 1);
            }
            ,
            P.setLength = function(Q) {
                return this.normalize().multiplyScalar(Q);
            }
            ,
            P.lerp = function(Q, B) {
                return this.x += (Q.x - this.x) * B,
                this.y += (Q.y - this.y) * B,
                this.z += (Q.z - this.z) * B,
                this.w += (Q.w - this.w) * B,
                this;
            }
            ,
            P.lerpVectors = function(Q, B, M) {
                return this.x = Q.x + (B.x - Q.x) * M,
                this.y = Q.y + (B.y - Q.y) * M,
                this.z = Q.z + (B.z - Q.z) * M,
                this.w = Q.w + (B.w - Q.w) * M,
                this;
            }
            ,
            P.equals = function(Q) {
                return Q.x === this.x && Q.y === this.y && Q.z === this.z && Q.w === this.w;
            }
            ,
            P.fromArray = function(Q, B) {
                return undefined === B && (B = 0),
                this.x = Q[B],
                this.y = Q[B + 1],
                this.z = Q[B + 2],
                this.w = Q[B + 3],
                this;
            }
            ,
            P.toArray = function(Q, B) {
                return undefined === Q && (Q = []),
                undefined === B && (B = 0),
                Q[B] = this.x,
                Q[B + 1] = this.y,
                Q[B + 2] = this.z,
                Q[B + 3] = this.w,
                Q;
            }
            ,
            P.fromBufferAttribute = function(Q, B) {
                return this.x = Q.getX(B),
                this.y = Q.getY(B),
                this.z = Q.getZ(B),
                this.w = Q.getW(B),
                this;
            }
            ,
            P.random = function() {
                return this.x = Math.random(),
                this.y = Math.random(),
                this.z = Math.random(),
                this.w = Math.random(),
                this;
            }
            ,
            P[Symbol.iterator] = H().mark(function Q() {
                return H().wrap(function(B) {
                    for (; ; )
                        switch (B.prev = B.next) {
                        case 0:
                            return B.next = 2,
                            this.x;
                        case 2:
                            return B.next = 4,
                            this.y;
                        case 4:
                            return B.next = 6,
                            this.z;
                        case 6:
                            return B.next = 8,
                            this.w;
                        case 8:
                        case 'end':
                            return B.stop();
                        }
                }, Q, this);
            }),
            (0,
            S.A)(d, [{
                'key': 'width',
                'get': function() {
                    return this.z;
                },
                'set': function(B) {
                    this.z = B;
                }
            }, {
                'key': 'height',
                'get': function() {
                    return this.w;
                },
                'set': function(B) {
                    this.w = B;
                }
            }]);
        }());
    }
    ,
    0x3696: (F, E, p) => {
        p.d(E, {
            'P': () => H
        });
        var S = p(0x12e4b)
          , R = p(0x172d2)
          , H = function(y) {
            function d(Q, B, M, X) {
                var m;
                return (m = y.call(this, Q, B, M, X) || this)._weightPrev = -0,
                m._offsetPrev = -0,
                m._weightNext = -0,
                m._offsetNext = -0,
                m.DefaultSettings_ = {
                    'endingStart': R.rQf,
                    'endingEnd': R.rQf
                },
                m;
            }
            (0,
            S.A)(d, y);
            var P = d.prototype;
            return P.intervalChanged_ = function(Q, B, M) {
                var X = this.parameterPositions
                  , m = Q - 2
                  , w = Q + 1
                  , C = X[m]
                  , N = X[w];
                if (undefined === C)
                    switch (this.getSettings_().endingStart) {
                    case R.h2z:
                        m = Q,
                        C = 2 * B - M;
                        break;
                    case R.dhZ:
                        C = B + X[m = X.length - 2] - X[m + 1];
                        break;
                    default:
                        m = Q,
                        C = M;
                    }
                if (undefined === N)
                    switch (this.getSettings_().endingEnd) {
                    case R.h2z:
                        w = Q,
                        N = 2 * M - B;
                        break;
                    case R.dhZ:
                        w = 1,
                        N = M + X[1] - X[0];
                        break;
                    default:
                        w = Q - 1,
                        N = B;
                    }
                var Z = 0.5 * (M - B)
                  , h = this.valueSize;
                this._weightPrev = Z / (B - C),
                this._weightNext = Z / (N - M),
                this._offsetPrev = m * h,
                this._offsetNext = w * h;
            }
            ,
            P.interpolate_ = function(Q, B, M, X) {
                for (var w = this.resultBuffer, C = this.sampleValues, N = this.valueSize, Z = Q * N, U = Z - N, T = this._offsetPrev, V = this._offsetNext, G = this._weightPrev, k = this._weightNext, W = (M - B) / (X - B), I = W * W, L = I * W, q = -G * L + 2 * G * I - G * W, K = (1 + G) * L + (-1.5 - 2 * G) * I + (-0.5 + G) * W + 1, Y = (-1 - k) * L + (1.5 + k) * I + 0.5 * W, z = k * L - k * I, A = 0; A !== N; ++A)
                    w[A] = q * C[T + A] + K * C[U + A] + Y * C[Z + A] + z * C[V + A];
                return w;
            }
            ,
            d;
        }(p(0x28f4).l);
    }
    ,
    0x17b5d: (F, E, p) => {
        p.d(E, {
            'e': () => R
        });
        var S = p(0x12e4b)
          , R = function(H) {
            function y(d, P, Q, B) {
                return H.call(this, d, P, Q, B) || this;
            }
            return (0,
            S.A)(y, H),
            y.prototype.interpolate_ = function(d, P, Q, B) {
                for (var M = this.resultBuffer, X = this.sampleValues, m = this.valueSize, w = d * m, C = w - m, N = (Q - P) / (B - P), Z = 1 - N, U = 0; U !== m; ++U)
                    M[U] = X[C + U] * Z + X[w + U] * N;
                return M;
            }
            ,
            y;
        }(p(0x28f4).l);
    }
    ,
    0x131b5: (F, E, p) => {
        p.d(E, {
            'G': () => y
        });
        var S = p(0x12e4b)
          , R = p(0x28f4)
          , H = p(0x13294)
          , y = function(d) {
            function P(Q, B, M, X) {
                return d.call(this, Q, B, M, X) || this;
            }
            return (0,
            S.A)(P, d),
            P.prototype.interpolate_ = function(Q, B, M, X) {
                for (var m = this.resultBuffer, w = this.sampleValues, C = this.valueSize, N = (M - B) / (X - B), Z = Q * C, h = Z + C; Z !== h; Z += 4)
                    H.P.slerpFlat(m, 0, w, Z - C, w, Z, N);
                return m;
            }
            ,
            P;
        }(R.l);
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
        p.d(E, {
            'Y': () => R
        });
        var S = p(0x12e4b)
          , R = function(H) {
            function y() {
                var d;
                return (d = H.call(this) || this).isGroup = true,
                d.type = 'Group',
                d;
            }
            return (0,
            S.A)(y, H),
            y;
        }(p(0x16f53).B);
    }
    ,
    0x138bf: (r, F, E) => {
        E(0x1008e),
        E(0x16f53);
    }
    ,
    0x1152b: (F, H, Q) => {
        Q.d(H, {
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
          , K = new V.k()
          , Y = new U.R()
          , z = new Z.i()
          , j = new X.P()
          , O = new X.P()
          , J = new X.P()
          , r0 = new X.P()
          , r1 = new X.P()
          , r2 = new X.P()
          , r3 = new N.I()
          , r4 = new N.I()
          , r5 = new N.I()
          , r6 = new X.P()
          , r7 = new X.P()
          , r8 = new X.P()
          , r9 = new X.P()
          , rr = new X.P()
          , rF = function(rp) {
            function rS(rR, rH) {
                var ry;
                return undefined === rR && (rR = new q.L()),
                undefined === rH && (rH = new I.V()),
                (ry = rp.call(this) || this).isMesh = true,
                ry.type = 'Mesh',
                ry.geometry = rR,
                ry.material = rH,
                ry.updateMorphTargets(),
                ry;
            }
            (0,
            B.A)(rS, rp);
            var re = rS.prototype;
            return re.copy = function(rR, rH) {
                return rp.prototype.copy.call(this, rR, rH),
                undefined !== rR.morphTargetInfluences && (this.morphTargetInfluences = rR.morphTargetInfluences.slice()),
                undefined !== rR.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, rR.morphTargetDictionary)),
                this.material = Array.isArray(rR.material) ? rR.material.slice() : rR.material,
                this.geometry = rR.geometry,
                this;
            }
            ,
            re.updateMorphTargets = function() {
                var rR = this.geometry.morphAttributes
                  , rH = Object.keys(rR);
                if (rH.length > 0) {
                    var ry = rR[rH[0]];
                    if (undefined !== ry) {
                        this.morphTargetInfluences = [],
                        this.morphTargetDictionary = {};
                        for (var rd = 0, rP = ry.length; rd < rP; rd++) {
                            var rQ = ry[rd].name || String(rd);
                            this.morphTargetInfluences.push(0),
                            this.morphTargetDictionary[rQ] = rd;
                        }
                    }
                }
            }
            ,
            re.getVertexPosition = function(rR, rH) {
                var ry = this.geometry
                  , rd = ry.attributes.position
                  , rP = ry.morphAttributes.position
                  , rQ = ry.morphTargetsRelative;
                rH.fromBufferAttribute(rd, rR);
                var rB = this.morphTargetInfluences;
                if (rP && rB) {
                    r2.set(0, 0, 0);
                    for (var rM = 0, rX = rP.length; rM < rX; rM++) {
                        var rt = rB[rM]
                          , rm = rP[rM];
                        0 !== rt && (r1.fromBufferAttribute(rm, rR),
                        rQ ? r2.addScaledVector(r1, rt) : r2.addScaledVector(r1.sub(rH), rt));
                    }
                    rH.add(r2);
                }
                return rH;
            }
            ,
            re.raycast = function(rR, rH) {
                var ry = this.geometry
                  , rd = this.material
                  , rP = this.matrixWorld;
                if (undefined !== rd) {
                    if (null === ry.boundingSphere && ry.computeBoundingSphere(),
                    z.copy(ry.boundingSphere),
                    z.applyMatrix4(rP),
                    Y.copy(rR.ray).recast(rR.near),
                    false === z.containsPoint(Y.origin)) {
                        if (null === Y.intersectSphere(z, j))
                            return;
                        if (Y.origin.distanceToSquared(j) > Math.pow(rR.far - rR.near, 2))
                            return;
                    }
                    K.copy(rP).invert(),
                    Y.copy(rR.ray).applyMatrix4(K),
                    null !== ry.boundingBox && false === Y.intersectsBox(ry.boundingBox) || this._computeIntersections(rR, rH, Y);
                }
            }
            ,
            re._computeIntersections = function(rR, rH, ry) {
                var rd, rP = this.geometry, rQ = this.material, rB = rP.index, rM = rP.attributes.position, rX = rP.attributes.uv, rt = rP.attributes.uv1, rm = rP.attributes.normal, rw = rP.groups, rl = rP.drawRange;
                if (null !== rB) {
                    if (Array.isArray(rQ)) {
                        for (var rC = 0, rN = rw.length; rC < rN; rC++)
                            for (var rZ = rw[rC], rh = rQ[rZ.materialIndex], ro = Math.max(rZ.start, rl.start), rU = Math.min(rB.count, Math.min(rZ.start + rZ.count, rl.start + rl.count)); ro < rU; ro += 3) {
                                (rd = rE(this, rh, rR, ry, rX, rt, rm, rB.getX(ro), rB.getX(ro + 1), rB.getX(ro + 2))) && (rd.faceIndex = Math.floor(ro / 3),
                                rd.face.materialIndex = rZ.materialIndex,
                                rH.push(rd));
                            }
                    } else
                        for (var ri = Math.max(0, rl.start), rT = Math.min(rB.count, rl.start + rl.count); ri < rT; ri += 3) {
                            (rd = rE(this, rQ, rR, ry, rX, rt, rm, rB.getX(ri), rB.getX(ri + 1), rB.getX(ri + 2))) && (rd.faceIndex = Math.floor(ri / 3),
                            rH.push(rd));
                        }
                } else {
                    if (undefined !== rM) {
                        if (Array.isArray(rQ)) {
                            for (var rV = 0, rs = rw.length; rV < rs; rV++)
                                for (var rG = rw[rV], rk = rQ[rG.materialIndex], rW = Math.max(rG.start, rl.start), rx = Math.min(rM.count, Math.min(rG.start + rG.count, rl.start + rl.count)); rW < rx; rW += 3) {
                                    (rd = rE(this, rk, rR, ry, rX, rt, rm, rW, rW + 1, rW + 2)) && (rd.faceIndex = Math.floor(rW / 3),
                                    rd.face.materialIndex = rG.materialIndex,
                                    rH.push(rd));
                                }
                        } else
                            for (var ra = Math.max(0, rl.start), rI = Math.min(rM.count, rl.start + rl.count); ra < rI; ra += 3) {
                                (rd = rE(this, rQ, rR, ry, rX, rt, rm, ra, ra + 1, ra + 2)) && (rd.faceIndex = Math.floor(ra / 3),
                                rH.push(rd));
                            }
                    }
                }
            }
            ,
            rS;
        }(G.B);
        function rE(rp, rS, re, rR, rH, ry, rd, rP, rQ, rB) {
            rp.getVertexPosition(rP, O),
            rp.getVertexPosition(rQ, J),
            rp.getVertexPosition(rB, r0);
            var rM = function(rt, rm, rw, rl, rC, rN, rZ, rh) {
                if (null === (rm.side === W.hsX ? rl.intersectTriangle(rZ, rN, rC, true, rh) : rl.intersectTriangle(rC, rN, rZ, rm.side === W.hB5, rh)))
                    return null;
                rr.copy(rh),
                rr.applyMatrix4(rt.matrixWorld);
                var ro = rw.ray.origin.distanceTo(rr);
                return ro < rw.near || ro > rw.far ? null : {
                    'distance': ro,
                    'point': rr.clone(),
                    'object': rt
                };
            }(rp, rS, re, rR, O, J, r0, r9);
            if (rM) {
                rH && (r3.fromBufferAttribute(rH, rP),
                r4.fromBufferAttribute(rH, rQ),
                r5.fromBufferAttribute(rH, rB),
                rM.uv = k.l.getInterpolation(r9, O, J, r0, r3, r4, r5, new N.I())),
                ry && (r3.fromBufferAttribute(ry, rP),
                r4.fromBufferAttribute(ry, rQ),
                r5.fromBufferAttribute(ry, rB),
                rM.uv1 = k.l.getInterpolation(r9, O, J, r0, r3, r4, r5, new N.I()),
                rM.uv2 = rM.uv1),
                rd && (r6.fromBufferAttribute(rd, rP),
                r7.fromBufferAttribute(rd, rQ),
                r8.fromBufferAttribute(rd, rB),
                rM.normal = k.l.getInterpolation(r9, O, J, r0, r6, r7, r8, new X.P()),
                rM.normal.dot(rR.direction) > 0 && rM.normal.multiplyScalar(-1));
                var rX = {
                    'a': rP,
                    'b': rQ,
                    'c': rB,
                    'normal': new X.P(),
                    'materialIndex': 0
                };
                k.l.getNormal(O, J, r0, rX.normal),
                rM.face = rX;
            }
            return rM;
        }
    }
    ,
    0x5d85: (r, F, E) => {
        var p = E(0x12e4b);
        (function(S) {
            function R() {
                return S.apply(this, arguments) || this;
            }
            return (0,
            p.A)(R, S),
            R;
        }(E(0x178c5).J).prototype.isWebGL1Renderer = true);
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
        p.d(E, {
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
                undefined === U && (U = 1),
                undefined === T && (T = {}),
                (V = C.call(this, U, U, T) || this).isWebGLCubeRenderTarget = true;
                var G = {
                    'width': U,
                    'height': U,
                    'depth': 1
                }
                  , k = [G, G, G, G, G, G];
                return undefined !== T.encoding && ((0,
                m.mc)('THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace.'),
                T.colorSpace = T.encoding === R.S2Q ? R['er$'] : R.jf0),
                V.texture = new X.b(k,T.mapping,T.wrapS,T.wrapT,T.magFilter,T.minFilter,T.format,T.type,T.anisotropy,T.colorSpace),
                V.texture.isRenderTargetTexture = true,
                V.texture.generateMipmaps = undefined !== T.generateMipmaps && T.generateMipmaps,
                V.texture.minFilter = undefined !== T.minFilter ? T.minFilter : R.k6q,
                V;
            }
            (0,
            S.A)(N, C);
            var Z = N.prototype;
            return Z.fromEquirectangularTexture = function(U, T) {
                this.texture.type = T.type,
                this.texture.colorSpace = T.colorSpace,
                this.texture.generateMipmaps = T.generateMipmaps,
                this.texture.minFilter = T.minFilter,
                this.texture.magFilter = T.magFilter;
                var V = {
                    'tEquirect': {
                        'value': null
                    }
                }
                  , G = '\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t#include <project_vertex>\n\n\t\t\t\t}\n\t\t\t'
                  , k = '\n\n\t\t\t\tuniform sampler2D tEquirect;\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\t#include <common>\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t\t}\n\t\t\t'
                  , W = new y.i(5,5,5)
                  , x = new P.B({
                    'name': 'CubemapFromEquirect',
                    'uniforms': (0,
                    Q.lx)(V),
                    'vertexShader': G,
                    'fragmentShader': k,
                    'side': R.hsX,
                    'blending': R.XIg
                });
                x.uniforms.tEquirect.value = T;
                var I = new H.e(W,x)
                  , g = T.minFilter;
                return T.minFilter === R['$_I'] && (T.minFilter = R.k6q),
                new M.F(1,10,this).update(U, I),
                T.minFilter = g,
                I.geometry.dispose(),
                I.material.dispose(),
                this;
            }
            ,
            Z.clear = function(U, T, V, G) {
                for (var k = U.getRenderTarget(), W = 0; W < 6; W++)
                    U.setRenderTarget(this, W),
                    U.clear(T, V, G);
                U.setRenderTarget(k);
            }
            ,
            N;
        }(B.n);
    }
    ,
    0xbd7f: (r, F, E) => {
        E(0xc42c);
    }
    ,
    0xc42c: (F, E, p) => {
        p.d(E, {
            'n': () => R
        });
        var S = p(0x12e4b)
          , R = function(H) {
            function y(d, P, Q) {
                var B;
                return undefined === d && (d = 1),
                undefined === P && (P = 1),
                undefined === Q && (Q = {}),
                (B = H.call(this, d, P, Q) || this).isWebGLRenderTarget = true,
                B;
            }
            return (0,
            S.A)(y, H),
            y;
        }(p(0xfbe).O);
    }
    ,
    0xfdaa: (r, F, E) => {
        E.d(F, {
            'v': () => p
        });
        var p = {
            'alphahash_fragment': '\n#ifdef USE_ALPHAHASH\n\n\tif ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n\n#endif\n',
            'alphahash_pars_fragment': '\n#ifdef USE_ALPHAHASH\n\n\t/**\n\t * See: https://casual-effects.com/research/Wyman2017Hashed/index.html\n\t */\n\n\tconst float ALPHA_HASH_SCALE = 0.05; // Derived from trials only, and may be changed.\n\n\tfloat hash2D( vec2 value ) {\n\n\t\treturn fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n\n\t}\n\n\tfloat hash3D( vec3 value ) {\n\n\t\treturn hash2D( vec2( hash2D( value.xy ), value.z ) );\n\n\t}\n\n\tfloat getAlphaHashThreshold( vec3 position ) {\n\n\t\t// Find the discretized derivatives of our coordinates\n\t\tfloat maxDeriv = max(\n\t\t\tlength( dFdx( position.xyz ) ),\n\t\t\tlength( dFdy( position.xyz ) )\n\t\t);\n\t\tfloat pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n\n\t\t// Find two nearest log-discretized noise scales\n\t\tvec2 pixScales = vec2(\n\t\t\texp2( floor( log2( pixScale ) ) ),\n\t\t\texp2( ceil( log2( pixScale ) ) )\n\t\t);\n\n\t\t// Compute alpha thresholds at our two noise scales\n\t\tvec2 alpha = vec2(\n\t\t\thash3D( floor( pixScales.x * position.xyz ) ),\n\t\t\thash3D( floor( pixScales.y * position.xyz ) )\n\t\t);\n\n\t\t// Factor to interpolate lerp with\n\t\tfloat lerpFactor = fract( log2( pixScale ) );\n\n\t\t// Interpolate alpha threshold from noise at two scales\n\t\tfloat x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n\n\t\t// Pass into CDF to compute uniformly distrib threshold\n\t\tfloat a = min( lerpFactor, 1.0 - lerpFactor );\n\t\tvec3 cases = vec3(\n\t\t\tx * x / ( 2.0 * a * ( 1.0 - a ) ),\n\t\t\t( x - 0.5 * a ) / ( 1.0 - a ),\n\t\t\t1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n\t\t);\n\n\t\t// Find our final, uniformly distributed alpha threshold (ατ)\n\t\tfloat threshold = ( x < ( 1.0 - a ) )\n\t\t\t? ( ( x < a ) ? cases.x : cases.y )\n\t\t\t: cases.z;\n\n\t\t// Avoids ατ == 0. Could also do ατ =1-ατ\n\t\treturn clamp( threshold , 1.0e-6, 1.0 );\n\n\t}\n\n#endif\n',
            'alphamap_fragment': '\n#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n\n#endif\n',
            'alphamap_pars_fragment': '\n#ifdef USE_ALPHAMAP\n\n\tuniform sampler2D alphaMap;\n\n#endif\n',
            'alphatest_fragment': '\n#ifdef USE_ALPHATEST\n\n\tif ( diffuseColor.a < alphaTest ) discard;\n\n#endif\n',
            'alphatest_pars_fragment': '\n#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif\n',
            'aomap_fragment': '\n#ifdef USE_AOMAP\n\n\t// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\tfloat ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\n\t#if defined( USE_CLEARCOAT ) \n\t\tclearcoatSpecularIndirect *= ambientOcclusion;\n\t#endif\n\n\t#if defined( USE_SHEEN ) \n\t\tsheenSpecularIndirect *= ambientOcclusion;\n\t#endif\n\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\n\t\tfloat dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\n\t#endif\n\n#endif\n',
            'aomap_pars_fragment': '\n#ifdef USE_AOMAP\n\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n\n#endif\n',
            'batching_pars_vertex': '\n#ifdef USE_BATCHING\n\tattribute float batchId;\n\tuniform highp sampler2D batchingTexture;\n\tmat4 getBatchingMatrix( const in float i ) {\n\n\t\tint size = textureSize( batchingTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n\t\treturn mat4( v1, v2, v3, v4 );\n\n\t}\n#endif\n',
            'batching_vertex': '\n#ifdef USE_BATCHING\n\tmat4 batchingMatrix = getBatchingMatrix( batchId );\n#endif\n',
            'begin_vertex': '\nvec3 transformed = vec3( position );\n\n#ifdef USE_ALPHAHASH\n\n\tvPosition = vec3( position );\n\n#endif\n',
            'beginnormal_vertex': '\nvec3 objectNormal = vec3( normal );\n\n#ifdef USE_TANGENT\n\n\tvec3 objectTangent = vec3( tangent.xyz );\n\n#endif\n',
            'bsdfs': '\n\nfloat G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {\n\n\t// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)\n\treturn 0.25;\n\n}\n\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n\n}\n\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\n\tfloat G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );\n\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\n\treturn F * ( G * D );\n\n} // validated\n\n',
            'iridescence_fragment': '\n\n#ifdef USE_IRIDESCENCE\n\n\t// XYZ to linear-sRGB color space\n\tconst mat3 XYZ_TO_REC709 = mat3(\n\t\t 3.2404542, -0.9692660,  0.0556434,\n\t\t-1.5371385,  1.8760108, -0.2040259,\n\t\t-0.4985314,  0.0415560,  1.0572252\n\t);\n\n\t// Assume air interface for top\n\t// Note: We don\x27t handle the case fresnel0 == 1\n\tvec3 Fresnel0ToIor( vec3 fresnel0 ) {\n\n\t\tvec3 sqrtF0 = sqrt( fresnel0 );\n\t\treturn ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n\n\t}\n\n\t// Conversion FO/IOR\n\tvec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n\n\t\treturn pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n\n\t}\n\n\t// ior is a value between 1.0 and 3.0. 1.0 is air interface\n\tfloat IorToFresnel0( float transmittedIor, float incidentIor ) {\n\n\t\treturn pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n\n\t}\n\n\t// Fresnel equations for dielectric/dielectric interfaces.\n\t// Ref: https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html\n\t// Evaluation XYZ sensitivity curves in Fourier space\n\tvec3 evalSensitivity( float OPD, vec3 shift ) {\n\n\t\tfloat phase = 2.0 * PI * OPD * 1.0e-9;\n\t\tvec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n\t\tvec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n\t\tvec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n\n\t\tvec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n\t\txyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n\t\txyz /= 1.0685e-7;\n\n\t\tvec3 rgb = XYZ_TO_REC709 * xyz;\n\t\treturn rgb;\n\n\t}\n\n\tvec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n\n\t\tvec3 I;\n\n\t\t// Force iridescenceIOR -> outsideIOR when thinFilmThickness -> 0.0\n\t\tfloat iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n\t\t// Evaluate the cosTheta on the base layer (Snell law)\n\t\tfloat sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n\n\t\t// Handle TIR:\n\t\tfloat cosTheta2Sq = 1.0 - sinTheta2Sq;\n\t\tif ( cosTheta2Sq < 0.0 ) {\n\n\t\t\treturn vec3( 1.0 );\n\n\t\t}\n\n\t\tfloat cosTheta2 = sqrt( cosTheta2Sq );\n\n\t\t// First interface\n\t\tfloat R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n\t\tfloat R12 = F_Schlick( R0, 1.0, cosTheta1 );\n\t\tfloat T121 = 1.0 - R12;\n\t\tfloat phi12 = 0.0;\n\t\tif ( iridescenceIOR < outsideIOR ) phi12 = PI;\n\t\tfloat phi21 = PI - phi12;\n\n\t\t// Second interface\n\t\tvec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0\n\t\tvec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n\t\tvec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n\t\tvec3 phi23 = vec3( 0.0 );\n\t\tif ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n\t\tif ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n\t\tif ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n\n\t\t// Phase shift\n\t\tfloat OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n\t\tvec3 phi = vec3( phi21 ) + phi23;\n\n\t\t// Compound terms\n\t\tvec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n\t\tvec3 r123 = sqrt( R123 );\n\t\tvec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n\n\t\t// Reflectance term for m = 0 (DC term amplitude)\n\t\tvec3 C0 = R12 + Rs;\n\t\tI = C0;\n\n\t\t// Reflectance term for m > 0 (pairs of diracs)\n\t\tvec3 Cm = Rs - T121;\n\t\tfor ( int m = 1; m <= 2; ++ m ) {\n\n\t\t\tCm *= r123;\n\t\t\tvec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n\t\t\tI += Cm * Sm;\n\n\t\t}\n\n\t\t// Since out of gamut colors might be produced, negative color values are clamped to 0.\n\t\treturn max( I, vec3( 0.0 ) );\n\n\t}\n\n#endif\n\n',
            'bumpmap_pars_fragment': '\n#ifdef USE_BUMPMAP\n\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\n\t// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen\n\t// https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf\n\n\t// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n\tvec2 dHdxy_fwd() {\n\n\t\tvec2 dSTdx = dFdx( vBumpMapUv );\n\t\tvec2 dSTdy = dFdy( vBumpMapUv );\n\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n\n\t\treturn vec2( dBx, dBy );\n\n\t}\n\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\n\t\t// normalize is done to ensure that the bump map looks the same regardless of the texture\x27s scale\n\t\tvec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n\t\tvec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n\t\tvec3 vN = surf_norm; // normalized\n\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\n\t}\n\n#endif\n',
            'clipping_planes_fragment': '\n#if NUM_CLIPPING_PLANES > 0\n\n\tvec4 plane;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\n\t\tbool clipped = true;\n\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\n\t\t}\n\t\t#pragma unroll_loop_end\n\n\t\tif ( clipped ) discard;\n\n\t#endif\n\n#endif\n',
            'clipping_planes_pars_fragment': '\n#if NUM_CLIPPING_PLANES > 0\n\n\tvarying vec3 vClipPosition;\n\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n\n#endif\n',
            'clipping_planes_pars_vertex': '\n#if NUM_CLIPPING_PLANES > 0\n\n\tvarying vec3 vClipPosition;\n\n#endif\n',
            'clipping_planes_vertex': '\n#if NUM_CLIPPING_PLANES > 0\n\n\tvClipPosition = - mvPosition.xyz;\n\n#endif\n',
            'color_fragment': '\n#if defined( USE_COLOR_ALPHA )\n\n\tdiffuseColor *= vColor;\n\n#elif defined( USE_COLOR )\n\n\tdiffuseColor.rgb *= vColor;\n\n#endif\n',
            'color_pars_fragment': '\n#if defined( USE_COLOR_ALPHA )\n\n\tvarying vec4 vColor;\n\n#elif defined( USE_COLOR )\n\n\tvarying vec3 vColor;\n\n#endif\n',
            'color_pars_vertex': '\n#if defined( USE_COLOR_ALPHA )\n\n\tvarying vec4 vColor;\n\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\n\tvarying vec3 vColor;\n\n#endif\n',
            'color_vertex': '\n#if defined( USE_COLOR_ALPHA )\n\n\tvColor = vec4( 1.0 );\n\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\n\tvColor = vec3( 1.0 );\n\n#endif\n\n#ifdef USE_COLOR\n\n\tvColor *= color;\n\n#endif\n\n#ifdef USE_INSTANCING_COLOR\n\n\tvColor.xyz *= instanceColor.xyz;\n\n#endif\n',
            'common': '\n#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n\n#ifndef saturate\n// <tonemapping_pars_fragment> may have defined saturate() already\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\n\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\n\n// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.\n// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand( const in vec2 uv ) {\n\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\n\treturn fract( sin( sn ) * c );\n\n}\n\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\n\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\n\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\n\n#ifdef USE_ALPHAHASH\n\n\tvarying vec3 vPosition;\n\n#endif\n\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n}\n\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t// dir can be either a direction vector or a normal vector\n\t// upper-left 3x3 of matrix is assumed to be orthogonal\n\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n\n}\n\nmat3 transposeMat3( const in mat3 m ) {\n\n\tmat3 tmp;\n\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\n\treturn tmp;\n\n}\n\nfloat luminance( const in vec3 rgb ) {\n\n\t// assumes rgb is in linear color space with sRGB primaries and D65 white point\n\n\tconst vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );\n\n\treturn dot( weights, rgb );\n\n}\n\nbool isPerspectiveMatrix( mat4 m ) {\n\n\treturn m[ 2 ][ 3 ] == - 1.0;\n\n}\n\nvec2 equirectUv( in vec3 dir ) {\n\n\t// dir is assumed to be unit length\n\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\n\treturn vec2( u, v );\n\n}\n\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\n\treturn RECIPROCAL_PI * diffuseColor;\n\n} // validated\n\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\n\t// Original approximation by Christophe Schlick \x2794\n\t// float fresnel = pow( 1.0 - dotVH, 5.0 );\n\n\t// Optimized variant (presented by Epic at SIGGRAPH \x2713)\n\t// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n\n} // validated\n\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n\n\t// Original approximation by Christophe Schlick \x2794\n\t// float fresnel = pow( 1.0 - dotVH, 5.0 );\n\n\t// Optimized variant (presented by Epic at SIGGRAPH \x2713)\n\t// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n\n} // validated\n',
            'cube_uv_reflection_fragment': '\n#ifdef ENVMAP_TYPE_CUBE_UV\n\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_minTileSize 16.0\n\n\t// These shader functions convert between the UV coordinates of a single face of\n\t// a cubemap, the 0-5 integer index of a cube face, and the direction vector for\n\t// sampling a textureCube (not generally normalized ).\n\n\tfloat getFace( vec3 direction ) {\n\n\t\tvec3 absDirection = abs( direction );\n\n\t\tfloat face = - 1.0;\n\n\t\tif ( absDirection.x > absDirection.z ) {\n\n\t\t\tif ( absDirection.x > absDirection.y )\n\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\n\t\t\telse\n\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\n\t\t} else {\n\n\t\t\tif ( absDirection.z > absDirection.y )\n\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\n\t\t\telse\n\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\n\t\t}\n\n\t\treturn face;\n\n\t}\n\n\t// RH coordinate system; PMREM face-indexing convention\n\tvec2 getUV( vec3 direction, float face ) {\n\n\t\tvec2 uv;\n\n\t\tif ( face == 0.0 ) {\n\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x\n\n\t\t} else if ( face == 1.0 ) {\n\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y\n\n\t\t} else if ( face == 2.0 ) {\n\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z\n\n\t\t} else if ( face == 3.0 ) {\n\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x\n\n\t\t} else if ( face == 4.0 ) {\n\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y\n\n\t\t} else {\n\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z\n\n\t\t}\n\n\t\treturn 0.5 * ( uv + 1.0 );\n\n\t}\n\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\n\t\tfloat face = getFace( direction );\n\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\n\t\tfloat faceSize = exp2( mipInt );\n\n\t\thighp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0; // #25071\n\n\t\tif ( face > 2.0 ) {\n\n\t\t\tuv.y += faceSize;\n\n\t\t\tface -= 3.0;\n\n\t\t}\n\n\t\tuv.x += face * faceSize;\n\n\t\tuv.x += filterInt * 3.0 * cubeUV_minTileSize;\n\n\t\tuv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n\n\t\tuv.x *= CUBEUV_TEXEL_WIDTH;\n\t\tuv.y *= CUBEUV_TEXEL_HEIGHT;\n\n\t\t#ifdef texture2DGradEXT\n\n\t\t\treturn texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb; // disable anisotropic filtering\n\n\t\t#else\n\n\t\t\treturn texture2D( envMap, uv ).rgb;\n\n\t\t#endif\n\n\t}\n\n\t// These defines must match with PMREMGenerator\n\n\t#define cubeUV_r0 1.0\n\t#define cubeUV_v0 0.339\n\t#define cubeUV_m0 - 2.0\n\t#define cubeUV_r1 0.8\n\t#define cubeUV_v1 0.276\n\t#define cubeUV_m1 - 1.0\n\t#define cubeUV_r4 0.4\n\t#define cubeUV_v4 0.046\n\t#define cubeUV_m4 2.0\n\t#define cubeUV_r5 0.305\n\t#define cubeUV_v5 0.016\n\t#define cubeUV_m5 3.0\n\t#define cubeUV_r6 0.21\n\t#define cubeUV_v6 0.0038\n\t#define cubeUV_m6 4.0\n\n\tfloat roughnessToMip( float roughness ) {\n\n\t\tfloat mip = 0.0;\n\n\t\tif ( roughness >= cubeUV_r1 ) {\n\n\t\t\tmip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n\n\t\t} else if ( roughness >= cubeUV_r4 ) {\n\n\t\t\tmip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n\n\t\t} else if ( roughness >= cubeUV_r5 ) {\n\n\t\t\tmip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n\n\t\t} else if ( roughness >= cubeUV_r6 ) {\n\n\t\t\tmip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n\n\t\t} else {\n\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25\n\t\t}\n\n\t\treturn mip;\n\n\t}\n\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\n\t\tfloat mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n\n\t\tfloat mipF = fract( mip );\n\n\t\tfloat mipInt = floor( mip );\n\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\n\t\tif ( mipF == 0.0 ) {\n\n\t\t\treturn vec4( color0, 1.0 );\n\n\t\t} else {\n\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\n\t\t}\n\n\t}\n\n#endif\n',
            'defaultnormal_vertex': '\n\nvec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n\n\tvec3 transformedTangent = objectTangent;\n\n#endif\n\n#ifdef USE_BATCHING\n\n\t// this is in lieu of a per-instance normal-matrix\n\t// shear transforms in the instance matrix are not supported\n\n\tmat3 bm = mat3( batchingMatrix );\n\ttransformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n\ttransformedNormal = bm * transformedNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\ttransformedTangent = bm * transformedTangent;\n\n\t#endif\n\n#endif\n\n#ifdef USE_INSTANCING\n\n\t// this is in lieu of a per-instance normal-matrix\n\t// shear transforms in the instance matrix are not supported\n\n\tmat3 im = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n\ttransformedNormal = im * transformedNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\ttransformedTangent = im * transformedTangent;\n\n\t#endif\n\n#endif\n\ntransformedNormal = normalMatrix * transformedNormal;\n\n#ifdef FLIP_SIDED\n\n\ttransformedNormal = - transformedNormal;\n\n#endif\n\n#ifdef USE_TANGENT\n\n\ttransformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n\n\t#ifdef FLIP_SIDED\n\n\t\ttransformedTangent = - transformedTangent;\n\n\t#endif\n\n#endif\n',
            'displacementmap_pars_vertex': '\n#ifdef USE_DISPLACEMENTMAP\n\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n\n#endif\n',
            'displacementmap_vertex': '\n#ifdef USE_DISPLACEMENTMAP\n\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n\n#endif\n',
            'emissivemap_fragment': '\n#ifdef USE_EMISSIVEMAP\n\n\tvec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n\n#endif\n',
            'emissivemap_pars_fragment': '\n#ifdef USE_EMISSIVEMAP\n\n\tuniform sampler2D emissiveMap;\n\n#endif\n',
            'colorspace_fragment': '\ngl_FragColor = linearToOutputTexel( gl_FragColor );\n',
            'colorspace_pars_fragment': '\n\n// http://www.russellcottrell.com/photo/matrixCalculator.htm\n\n// Linear sRGB => XYZ => Linear Display P3\nconst mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(\n\tvec3( 0.8224621, 0.177538, 0.0 ),\n\tvec3( 0.0331941, 0.9668058, 0.0 ),\n\tvec3( 0.0170827, 0.0723974, 0.9105199 )\n);\n\n// Linear Display P3 => XYZ => Linear sRGB\nconst mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(\n\tvec3( 1.2249401, - 0.2249404, 0.0 ),\n\tvec3( - 0.0420569, 1.0420571, 0.0 ),\n\tvec3( - 0.0196376, - 0.0786361, 1.0982735 )\n);\n\nvec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {\n\treturn vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );\n}\n\nvec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {\n\treturn vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );\n}\n\nvec4 LinearTransferOETF( in vec4 value ) {\n\treturn value;\n}\n\nvec4 sRGBTransferOETF( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\n\n// @deprecated, r156\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\n\n// @deprecated, r156\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn sRGBTransferOETF( value );\n}\n',
            'envmap_fragment': '\n#ifdef USE_ENVMAP\n\n\t#ifdef ENV_WORLDPOS\n\n\t\tvec3 cameraToFrag;\n\n\t\tif ( isOrthographic ) {\n\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\n\t\t} else {\n\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\n\t\t}\n\n\t\t// Transforming Normal Vectors with the Inverse Transformation\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\n\t\t#else\n\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#else\n\n\t\tvec3 reflectVec = vReflect;\n\n\t#endif\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n\t#else\n\n\t\tvec4 envColor = vec4( 0.0 );\n\n\t#endif\n\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n\t#endif\n\n#endif\n',
            'envmap_common_pars_fragment': '\n#ifdef USE_ENVMAP\n\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif\n',
            'envmap_pars_fragment': '\n#ifdef USE_ENVMAP\n\n\tuniform float reflectivity;\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\n\t\t#define ENV_WORLDPOS\n\n\t#endif\n\n\t#ifdef ENV_WORLDPOS\n\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n\n#endif\n',
            'envmap_pars_vertex': '\n#ifdef USE_ENVMAP\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\n\t\t#define ENV_WORLDPOS\n\n\t#endif\n\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\n\t#else\n\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\n\t#endif\n\n#endif\n',
            'envmap_physical_pars_fragment': '\n#ifdef USE_ENVMAP\n\n\tvec3 getIBLIrradiance( const in vec3 normal ) {\n\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\n\t\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\n\t\t#else\n\n\t\t\treturn vec3( 0.0 );\n\n\t\t#endif\n\n\t}\n\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\n\t\t\tvec3 reflectVec = reflect( - viewDir, normal );\n\n\t\t\t// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\n\t\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\n\t\t#else\n\n\t\t\treturn vec3( 0.0 );\n\n\t\t#endif\n\n\t}\n\n\t#ifdef USE_ANISOTROPY\n\n\t\tvec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n\n\t\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\n\t\t\t  // https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy\n\t\t\t\tvec3 bentNormal = cross( bitangent, viewDir );\n\t\t\t\tbentNormal = normalize( cross( bentNormal, bitangent ) );\n\t\t\t\tbentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n\n\t\t\t\treturn getIBLRadiance( viewDir, bentNormal, roughness );\n\n\t\t\t#else\n\n\t\t\t\treturn vec3( 0.0 );\n\n\t\t\t#endif\n\n\t\t}\n\n\t#endif\n\n#endif\n',
            'envmap_vertex': '\n#ifdef USE_ENVMAP\n\n\t#ifdef ENV_WORLDPOS\n\n\t\tvWorldPosition = worldPosition.xyz;\n\n\t#else\n\n\t\tvec3 cameraToVertex;\n\n\t\tif ( isOrthographic ) {\n\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\n\t\t} else {\n\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n\t\t}\n\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\n\t\t#else\n\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#endif\n\n#endif\n',
            'fog_vertex': '\n#ifdef USE_FOG\n\n\t// vFogDepth = - mvPosition.z;\n\n\t// distance to camera\n\tvFogDepth = length(mvPosition.xyz);\n\n#endif\n',
            'fog_pars_vertex': '\n#ifdef USE_FOG\n\n\tvarying float vFogDepth;\n\n#endif\n',
            'fog_fragment': '\n#ifdef USE_FOG\n\n\t#ifdef FOG_EXP2\n\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\n\t#else\n\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\n\t#endif\n\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n\n#endif\n',
            'fog_pars_fragment': '\n#ifdef USE_FOG\n\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\n\t#ifdef FOG_EXP2\n\n\t\tuniform float fogDensity;\n\n\t#else\n\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\n\t#endif\n\n#endif\n',
            'gradientmap_pars_fragment': '\n\n#ifdef USE_GRADIENTMAP\n\n\tuniform sampler2D gradientMap;\n\n#endif\n\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\n\t// dotNL will be from -1.0 to 1.0\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\n\t#ifdef USE_GRADIENTMAP\n\n\t\treturn vec3( texture2D( gradientMap, coord ).r );\n\n\t#else\n\n\t\tvec2 fw = fwidth( coord ) * 0.5;\n\t\treturn mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n\n\t#endif\n\n}\n',
            'lightmap_fragment': '\n#ifdef USE_LIGHTMAP\n\n\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\n\treflectedLight.indirectDiffuse += lightMapIrradiance;\n\n#endif\n',
            'lightmap_pars_fragment': '\n#ifdef USE_LIGHTMAP\n\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n\n#endif\n',
            'lights_lambert_fragment': '\nLambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;\n',
            'lights_lambert_pars_fragment': '\nvarying vec3 vViewPosition;\n\nstruct LambertMaterial {\n\n\tvec3 diffuseColor;\n\tfloat specularStrength;\n\n};\n\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_Lambert\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Lambert\n',
            'lights_pars_begin': '\nuniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n\n#if defined( USE_LIGHT_PROBES )\n\n\tuniform vec3 lightProbe[ 9 ];\n\n#endif\n\n// get the irradiance (radiance convolved with cosine lobe) at the point \x27normal\x27 on the unit sphere\n// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\n\t// normal is assumed to have unit length\n\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\n\t// band 0\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\n\t// band 1\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\n\t// band 2\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\n\treturn result;\n\n}\n\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n\n\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\n\treturn irradiance;\n\n}\n\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\n\tvec3 irradiance = ambientLightColor;\n\n\treturn irradiance;\n\n}\n\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\n\t#if defined ( LEGACY_LIGHTS )\n\n\t\tif ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\n\t\t\treturn pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\n\t\t}\n\n\t\treturn 1.0;\n\n\t#else\n\n\t\t// based upon Frostbite 3 Moving to Physically-based Rendering\n\t\t// page 32, equation 26: E[window1]\n\t\t// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\n\t\tif ( cutoffDistance > 0.0 ) {\n\n\t\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\n\t\t}\n\n\t\treturn distanceFalloff;\n\n\t#endif\n\n}\n\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n\n}\n\n#if NUM_DIR_LIGHTS > 0\n\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\n\t}\n\n#endif\n\n\n#if NUM_POINT_LIGHTS > 0\n\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\n\t// light is an out parameter as having it as a return value caused compiler errors on some devices\n\tvoid getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\n\t\tvec3 lVector = pointLight.position - geometryPosition;\n\n\t\tlight.direction = normalize( lVector );\n\n\t\tfloat lightDistance = length( lVector );\n\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\n\t}\n\n#endif\n\n\n#if NUM_SPOT_LIGHTS > 0\n\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\n\t// light is an out parameter as having it as a return value caused compiler errors on some devices\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\n\t\tvec3 lVector = spotLight.position - geometryPosition;\n\n\t\tlight.direction = normalize( lVector );\n\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\n\t\tif ( spotAttenuation > 0.0 ) {\n\n\t\t\tfloat lightDistance = length( lVector );\n\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\n\t\t} else {\n\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\n\t\t}\n\n\t}\n\n#endif\n\n\n#if NUM_RECT_AREA_LIGHTS > 0\n\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\n\t// Pre-computed values of LinearTransformedCosine approximation of BRDF\n\t// BRDF approximation Texture is 64x64\n\tuniform sampler2D ltc_1; // RGBA Float\n\tuniform sampler2D ltc_2; // RGBA Float\n\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n\n#endif\n\n\n#if NUM_HEMI_LIGHTS > 0\n\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n\n\t\tfloat dotNL = dot( normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\n\t\treturn irradiance;\n\n\t}\n\n#endif\n',
            'lights_toon_fragment': '\nToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\n',
            'lights_toon_pars_fragment': '\nvarying vec3 vViewPosition;\n\nstruct ToonMaterial {\n\n\tvec3 diffuseColor;\n\n};\n\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tvec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n',
            'lights_phong_fragment': '\nBlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n',
            'lights_phong_pars_fragment': '\nvarying vec3 vViewPosition;\n\nstruct BlinnPhongMaterial {\n\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n\n};\n\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n\n}\n\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n',
            'lights_physical_fragment': '\nPhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\n\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\n\nmaterial.roughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.\nmaterial.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n\n#ifdef IOR\n\n\tmaterial.ior = ior;\n\n\t#ifdef USE_SPECULAR\n\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularColorFactor = specularColor;\n\n\t\t#ifdef USE_SPECULAR_COLORMAP\n\n\t\t\tspecularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n\n\t\t#endif\n\n\t\t#ifdef USE_SPECULAR_INTENSITYMAP\n\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n\n\t\t#endif\n\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\n\t#else\n\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularColorFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\n\t#endif\n\n\tmaterial.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n\n#else\n\n\tmaterial.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n\n#endif\n\n#ifdef USE_CLEARCOAT\n\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\n\t#ifdef USE_CLEARCOATMAP\n\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n\n\t#endif\n\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n\n\t#endif\n\n\tmaterial.clearcoat = saturate( material.clearcoat ); // Burley clearcoat model\n\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n\n#endif\n\n#ifdef USE_IRIDESCENCE\n\n\tmaterial.iridescence = iridescence;\n\tmaterial.iridescenceIOR = iridescenceIOR;\n\n\t#ifdef USE_IRIDESCENCEMAP\n\n\t\tmaterial.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n\n\t#endif\n\n\t#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\n\t\tmaterial.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n\n\t#else\n\n\t\tmaterial.iridescenceThickness = iridescenceThicknessMaximum;\n\n\t#endif\n\n#endif\n\n#ifdef USE_SHEEN\n\n\tmaterial.sheenColor = sheenColor;\n\n\t#ifdef USE_SHEEN_COLORMAP\n\n\t\tmaterial.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n\n\t#endif\n\n\tmaterial.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\n\t\tmaterial.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n\n\t#endif\n\n#endif\n\n#ifdef USE_ANISOTROPY\n\n\t#ifdef USE_ANISOTROPYMAP\n\n\t\tmat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n\t\tvec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n\t\tvec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n\n\t#else\n\n\t\tvec2 anisotropyV = anisotropyVector;\n\n\t#endif\n\n\tmaterial.anisotropy = length( anisotropyV );\n\n\tif( material.anisotropy == 0.0 ) {\n\t\tanisotropyV = vec2( 1.0, 0.0 );\n\t} else {\n\t\tanisotropyV /= material.anisotropy;\n\t\tmaterial.anisotropy = saturate( material.anisotropy );\n\t}\n\n\t// Roughness along the anisotropy bitangent is the material roughness, while the tangent roughness increases with anisotropy.\n\tmaterial.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n\n\tmaterial.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n\tmaterial.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n\n#endif\n',
            'lights_physical_pars_fragment': '\n\nstruct PhysicalMaterial {\n\n\tvec3 diffuseColor;\n\tfloat roughness;\n\tvec3 specularColor;\n\tfloat specularF90;\n\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\n\t#ifdef USE_IRIDESCENCE\n\t\tfloat iridescence;\n\t\tfloat iridescenceIOR;\n\t\tfloat iridescenceThickness;\n\t\tvec3 iridescenceFresnel;\n\t\tvec3 iridescenceF0;\n\t#endif\n\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenColor;\n\t\tfloat sheenRoughness;\n\t#endif\n\n\t#ifdef IOR\n\t\tfloat ior;\n\t#endif\n\n\t#ifdef USE_TRANSMISSION\n\t\tfloat transmission;\n\t\tfloat transmissionAlpha;\n\t\tfloat thickness;\n\t\tfloat attenuationDistance;\n\t\tvec3 attenuationColor;\n\t#endif\n\n\t#ifdef USE_ANISOTROPY\n\t\tfloat anisotropy;\n\t\tfloat alphaT;\n\t\tvec3 anisotropyT;\n\t\tvec3 anisotropyB;\n\t#endif\n\n};\n\n// temporary\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\n\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\n\n// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2\n// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\n\tfloat a2 = pow2( alpha );\n\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\n\treturn 0.5 / max( gv + gl, EPSILON );\n\n}\n\n// Microfacet Models for Refraction through Rough Surfaces - equation (33)\n// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\n// alpha is \x22roughness squared\x22 in Disney’s reparameterization\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\n\tfloat a2 = pow2( alpha );\n\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1\n\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n\n}\n\n// https://google.github.io/filament/Filament.md.html#materialsystem/anisotropicmodel/anisotropicspecularbrdf\n#ifdef USE_ANISOTROPY\n\n\tfloat V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n\n\t\tfloat gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n\t\tfloat gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n\t\tfloat v = 0.5 / ( gv + gl );\n\n\t\treturn saturate(v);\n\n\t}\n\n\tfloat D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n\n\t\tfloat a2 = alphaT * alphaB;\n\t\thighp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n\t\thighp float v2 = dot( v, v );\n\t\tfloat w2 = a2 / v2;\n\n\t\treturn RECIPROCAL_PI * a2 * pow2 ( w2 );\n\n\t}\n\n#endif\n\n#ifdef USE_CLEARCOAT\n\n\t// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility\n\tvec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n\n\t\tvec3 f0 = material.clearcoatF0;\n\t\tfloat f90 = material.clearcoatF90;\n\t\tfloat roughness = material.clearcoatRoughness;\n\n\t\tfloat alpha = pow2( roughness ); // UE4\x27s roughness\n\n\t\tvec3 halfDir = normalize( lightDir + viewDir );\n\n\t\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\t\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\t\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\t\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\n\t\tvec3 F = F_Schlick( f0, f90, dotVH );\n\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\n\t\tfloat D = D_GGX( alpha, dotNH );\n\n\t\treturn F * ( V * D );\n\n\t}\n\n#endif\n\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n\n\tvec3 f0 = material.specularColor;\n\tfloat f90 = material.specularF90;\n\tfloat roughness = material.roughness;\n\n\tfloat alpha = pow2( roughness ); // UE4\x27s roughness\n\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\n\t#ifdef USE_IRIDESCENCE\n\n\t\tF = mix( F, material.iridescenceFresnel, material.iridescence );\n\n\t#endif\n\n\t#ifdef USE_ANISOTROPY\n\n\t\tfloat dotTL = dot( material.anisotropyT, lightDir );\n\t\tfloat dotTV = dot( material.anisotropyT, viewDir );\n\t\tfloat dotTH = dot( material.anisotropyT, halfDir );\n\t\tfloat dotBL = dot( material.anisotropyB, lightDir );\n\t\tfloat dotBV = dot( material.anisotropyB, viewDir );\n\t\tfloat dotBH = dot( material.anisotropyB, halfDir );\n\n\t\tfloat V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n\n\t\tfloat D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n\n\t#else\n\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\n\t\tfloat D = D_GGX( alpha, dotNH );\n\n\t#endif\n\n\treturn F * ( V * D );\n\n}\n\n// Rect Area Light\n\n// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines\n// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt\n// code: https://github.com/selfshadow/ltc_code/\n\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\n\tfloat dotNV = saturate( dot( N, V ) );\n\n\t// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\n\treturn uv;\n\n}\n\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\n\t// Real-Time Area Lighting: a Journey from Research to Production (p.102)\n\t// An approximation of the form factor of a horizon-clipped rectangle.\n\n\tfloat l = length( f );\n\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n\n}\n\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\n\tfloat x = dot( v1, v2 );\n\n\tfloat y = abs( x );\n\n\t// rational polynomial approximation to theta / sin( theta ) / 2PI\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\n\treturn cross( v1, v2 ) * theta_sintheta;\n\n}\n\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\n\t// bail if point is on back side of plane of light\n\t// assumes ccw winding order of light vertices\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\n\t// construct orthonormal basis around N\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system\n\n\t// compute transform\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\n\t// transform rect\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\n\t// project rect onto sphere\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\n\t// calculate vector form factor\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\n\t// adjust for horizon clipping\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\n/*\n\t// alternate method of adjusting for horizon clipping (see referece)\n\t// refactoring required\n\tfloat len = length( vectorFormFactor );\n\tfloat z = vectorFormFactor.z / len;\n\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\n\t// tabulated horizon-clipped sphere, apparently...\n\tvec2 uv = vec2( z * 0.5 + 0.5, len );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\n\tfloat scale = texture2D( ltc_2, uv ).w;\n\n\tfloat result = len * scale;\n*/\n\n\treturn vec3( result );\n\n}\n\n// End Rect Area Light\n\n#if defined( USE_SHEEN )\n\n// https://github.com/google/filament/blob/master/shaders/src/brdf.fs\nfloat D_Charlie( float roughness, float dotNH ) {\n\n\tfloat alpha = pow2( roughness );\n\n\t// Estevez and Kulla 2017, \x22Production Friendly Microfacet Sheen BRDF\x22\n\tfloat invAlpha = 1.0 / alpha;\n\tfloat cos2h = dotNH * dotNH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 ); // 2^(-14/2), so sin2h^2 > 0 in fp16\n\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n\n}\n\n// https://github.com/google/filament/blob/master/shaders/src/brdf.fs\nfloat V_Neubelt( float dotNV, float dotNL ) {\n\n\t// Neubelt and Pettineo 2013, \x22Crafting a Next-gen Material Pipeline for The Order: 1886\x22\n\treturn saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n\n}\n\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\n\tfloat D = D_Charlie( sheenRoughness, dotNH );\n\tfloat V = V_Neubelt( dotNV, dotNL );\n\n\treturn sheenColor * ( D * V );\n\n}\n\n#endif\n\n// This is a curve-fit approxmation to the \x22Charlie sheen\x22 BRDF integrated over the hemisphere from \n// Estevez and Kulla 2017, \x22Production Friendly Microfacet Sheen BRDF\x22. The analysis can be found\n// in the Sheen section of https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\n\tfloat r2 = roughness * roughness;\n\n\tfloat a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n\n\tfloat b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n\n\tfloat DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n\n\treturn saturate( DG * RECIPROCAL_PI );\n\n}\n\n// Analytical approximation of the DFG LUT, one half of the\n// split-sum approximation used in indirect specular lighting.\n// via \x27environmentBRDF\x27 from \x22Physically Based Shading on Mobile\x22\n// https://www.unrealengine.com/blog/physically-based-shading-on-mobile\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\n\tvec4 r = roughness * c0 + c1;\n\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\n\tvec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n\n\treturn fab;\n\n}\n\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\n\treturn specularColor * fab.x + specularF90 * fab.y;\n\n}\n\n// Fdez-Agüera\x27s \x22Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting\x22\n// Approximates multiscattering in order to preserve energy.\n// http://www.jcgt.org/published/0008/01/03/\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\n\t#ifdef USE_IRIDESCENCE\n\n\t\tvec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n\n\t#else\n\n\t\tvec3 Fr = specularColor;\n\n\t#endif\n\n\tvec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\n\tvec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619; // 1/21\n\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n\n}\n\n#if NUM_RECT_AREA_LIGHTS > 0\n\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\t\tvec3 normal = geometryNormal;\n\t\tvec3 viewDir = geometryViewDir;\n\t\tvec3 position = geometryPosition;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction\n\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\n\t\t// LTC Fresnel Approximation by Stephen Hill\n\t\t// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\n\t}\n\n#endif\n\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\n\tvec3 irradiance = dotNL * directLight.color;\n\n\t#ifdef USE_CLEARCOAT\n\n\t\tfloat dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\n\t\tclearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n\n\t#endif\n\n\t#ifdef USE_SHEEN\n\n\t\tsheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n\n\t#endif\n\n\treflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\n\t#ifdef USE_CLEARCOAT\n\n\t\tclearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\n\t#endif\n\n\t#ifdef USE_SHEEN\n\n\t\tsheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n\n\t#endif\n\n\t// Both indirect specular and indirect diffuse light accumulate here\n\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\n\t#ifdef USE_IRIDESCENCE\n\n\t\tcomputeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );\n\n\t#else\n\n\t\tcomputeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n\n\t#endif\n\n\tvec3 totalScattering = singleScattering + multiScattering;\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );\n\n\treflectedLight.indirectSpecular += radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n\n// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n\n}\n',
            'lights_fragment_begin': '\n/**\n * This is a template that can be used to light a material, it uses pluggable\n * RenderEquations (RE)for specific lighting scenarios.\n *\n * Instructions for use:\n * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined\n * - Create a material parameter that is to be passed as the third parameter to your lighting functions.\n *\n * TODO:\n * - Add area light support.\n * - Add sphere light support.\n * - Add diffuse light probe (irradiance cubemap) support.\n */\n\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n\n#ifdef USE_CLEARCOAT\n\n\tgeometryClearcoatNormal = clearcoatNormal;\n\n#endif\n\n#ifdef USE_IRIDESCENCE\n\n\tfloat dotNVi = saturate( dot( normal, geometryViewDir ) );\n\n\tif ( material.iridescenceThickness == 0.0 ) {\n\n\t\tmaterial.iridescence = 0.0;\n\n\t} else {\n\n\t\tmaterial.iridescence = saturate( material.iridescence );\n\n\t}\n\n\tif ( material.iridescence > 0.0 ) {\n\n\t\tmaterial.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n\n\t\t// Iridescence F0 approximation\n\t\tmaterial.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n\n\t}\n\n#endif\n\nIncidentLight directLight;\n\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n\t\tpointLight = pointLights[ i ];\n\n\t\tgetPointLightInfo( pointLight, geometryPosition, directLight );\n\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tSpotLight spotLight;\n\tvec4 spotColor;\n\tvec3 spotLightCoord;\n\tbool inSpotLightMap;\n\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n\t\tspotLight = spotLights[ i ];\n\n\t\tgetSpotLightInfo( spotLight, geometryPosition, directLight );\n\n\t\t// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]\n\t\t#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n\t\t#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n\t\t#else\n\t\t#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#endif\n\n\t\t#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n\t\t\tspotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n\t\t\tinSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n\t\t\tspotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n\t\t\tdirectLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n\t\t#endif\n\n\t\t#undef SPOT_LIGHT_MAP_INDEX\n\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n\t\tdirectionalLight = directionalLights[ i ];\n\n\t\tgetDirectionalLightInfo( directionalLight, directLight );\n\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\n\tRectAreaLight rectAreaLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if defined( RE_IndirectDiffuse )\n\n\tvec3 iblIrradiance = vec3( 0.0 );\n\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n\t#if defined( USE_LIGHT_PROBES )\n\n\t\tirradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n\n\t#endif\n\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n\n\t\t}\n\t\t#pragma unroll_loop_end\n\n\t#endif\n\n#endif\n\n#if defined( RE_IndirectSpecular )\n\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n\n#endif\n',
            'lights_fragment_maps': '\n#if defined( RE_IndirectDiffuse )\n\n\t#ifdef USE_LIGHTMAP\n\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\n\t\tirradiance += lightMapIrradiance;\n\n\t#endif\n\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\tiblIrradiance += getIBLIrradiance( geometryNormal );\n\n\t#endif\n\n#endif\n\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\n\t#ifdef USE_ANISOTROPY\n\n\t\tradiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n\n\t#else\n\n\t\tradiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n\n\t#endif\n\n\t#ifdef USE_CLEARCOAT\n\n\t\tclearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n\n\t#endif\n\n#endif\n',
            'lights_fragment_end': '\n#if defined( RE_IndirectDiffuse )\n\n\tRE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\n#endif\n\n#if defined( RE_IndirectSpecular )\n\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\n#endif\n',
            'logdepthbuf_fragment': '\n#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\n\t// Doing a strict comparison with == 1.0 can cause noise artifacts\n\t// on some platforms. See issue #17623.\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n\n#endif\n',
            'logdepthbuf_pars_fragment': '\n#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n\n#endif\n',
            'logdepthbuf_pars_vertex': '\n#ifdef USE_LOGDEPTHBUF\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\n\t#else\n\n\t\tuniform float logDepthBufFC;\n\n\t#endif\n\n#endif\n',
            'logdepthbuf_vertex': '\n#ifdef USE_LOGDEPTHBUF\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\n\t#else\n\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\n\t\t\tgl_Position.z *= gl_Position.w;\n\n\t\t}\n\n\t#endif\n\n#endif\n',
            'map_fragment': '\n#ifdef USE_MAP\n\n\tvec4 sampledDiffuseColor = texture2D( map, vMapUv );\n\n\t#ifdef DECODE_VIDEO_TEXTURE\n\n\t\t// use inline sRGB decode until browsers properly support SRGB8_APLHA8 with video textures\n\n\t\tsampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );\n\t\n\t#endif\n\n\tdiffuseColor *= sampledDiffuseColor;\n\n#endif\n',
            'map_pars_fragment': '\n#ifdef USE_MAP\n\n\tuniform sampler2D map;\n\n#endif\n',
            'map_particle_fragment': '\n#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\n\t#if defined( USE_POINTS_UV )\n\n\t\tvec2 uv = vUv;\n\n\t#else\n\n\t\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\n\t#endif\n\n#endif\n\n#ifdef USE_MAP\n\n\tdiffuseColor *= texture2D( map, uv );\n\n#endif\n\n#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n\n#endif\n',
            'map_particle_pars_fragment': '\n#if defined( USE_POINTS_UV )\n\n\tvarying vec2 vUv;\n\n#else\n\n\t#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\n\t\tuniform mat3 uvTransform;\n\n\t#endif\n\n#endif\n\n#ifdef USE_MAP\n\n\tuniform sampler2D map;\n\n#endif\n\n#ifdef USE_ALPHAMAP\n\n\tuniform sampler2D alphaMap;\n\n#endif\n',
            'metalnessmap_fragment': '\nfloat metalnessFactor = metalness;\n\n#ifdef USE_METALNESSMAP\n\n\tvec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n\n\t// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\tmetalnessFactor *= texelMetalness.b;\n\n#endif\n',
            'metalnessmap_pars_fragment': '\n#ifdef USE_METALNESSMAP\n\n\tuniform sampler2D metalnessMap;\n\n#endif\n',
            'morphcolor_vertex': '\n#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )\n\n\t// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:\n\t// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)\n\t// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting\n\tvColor *= morphTargetBaseInfluence;\n\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\n\t\t#if defined( USE_COLOR_ALPHA )\n\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n\n\t\t#elif defined( USE_COLOR )\n\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n\n\t\t#endif\n\n\t}\n\n#endif\n',
            'morphnormal_vertex': '\n#ifdef USE_MORPHNORMALS\n\n\t// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:\n\t// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)\n\t// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting\n\tobjectNormal *= morphTargetBaseInfluence;\n\n\t#ifdef MORPHTARGETS_TEXTURE\n\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n\n\t\t}\n\n\t#else\n\n\t\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\t\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\t\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\t\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n\n\t#endif\n\n#endif\n',
            'morphtarget_pars_vertex': '\n#ifdef USE_MORPHTARGETS\n\n\tuniform float morphTargetBaseInfluence;\n\n\t#ifdef MORPHTARGETS_TEXTURE\n\n\t\tuniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\t\tuniform sampler2DArray morphTargetsTexture;\n\t\tuniform ivec2 morphTargetsTextureSize;\n\n\t\tvec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n\n\t\t\tint texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n\t\t\tint y = texelIndex / morphTargetsTextureSize.x;\n\t\t\tint x = texelIndex - y * morphTargetsTextureSize.x;\n\n\t\t\tivec3 morphUV = ivec3( x, y, morphTargetIndex );\n\t\t\treturn texelFetch( morphTargetsTexture, morphUV, 0 );\n\n\t\t}\n\n\t#else\n\n\t\t#ifndef USE_MORPHNORMALS\n\n\t\t\tuniform float morphTargetInfluences[ 8 ];\n\n\t\t#else\n\n\t\t\tuniform float morphTargetInfluences[ 4 ];\n\n\t\t#endif\n\n\t#endif\n\n#endif\n',
            'morphtarget_vertex': '\n#ifdef USE_MORPHTARGETS\n\n\t// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:\n\t// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)\n\t// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting\n\ttransformed *= morphTargetBaseInfluence;\n\n\t#ifdef MORPHTARGETS_TEXTURE\n\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n\n\t\t}\n\n\t#else\n\n\t\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\t\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\t\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\t\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\n\t\t#ifndef USE_MORPHNORMALS\n\n\t\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\n\t\t#endif\n\n\t#endif\n\n#endif\n',
            'normal_fragment_begin': '\nfloat faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n\n#ifdef FLAT_SHADED\n\n\tvec3 fdx = dFdx( vViewPosition );\n\tvec3 fdy = dFdy( vViewPosition );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n\n#else\n\n\tvec3 normal = normalize( vNormal );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tnormal *= faceDirection;\n\n\t#endif\n\n#endif\n\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n\n\t#ifdef USE_TANGENT\n\n\t\tmat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\n\t#else\n\n\t\tmat3 tbn = getTangentFrame( - vViewPosition, normal,\n\t\t#if defined( USE_NORMALMAP )\n\t\t\tvNormalMapUv\n\t\t#elif defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tvClearcoatNormalMapUv\n\t\t#else\n\t\t\tvUv\n\t\t#endif\n\t\t);\n\n\t#endif\n\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\n\t\ttbn[0] *= faceDirection;\n\t\ttbn[1] *= faceDirection;\n\n\t#endif\n\n#endif\n\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\t#ifdef USE_TANGENT\n\n\t\tmat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\n\t#else\n\n\t\tmat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n\n\t#endif\n\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\n\t\ttbn2[0] *= faceDirection;\n\t\ttbn2[1] *= faceDirection;\n\n\t#endif\n\n#endif\n\n// non perturbed normal for clearcoat among others\n\nvec3 nonPerturbedNormal = normal;\n\n',
            'normal_fragment_maps': '\n\n#ifdef USE_NORMALMAP_OBJECTSPACE\n\n\tnormal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals\n\n\t#ifdef FLIP_SIDED\n\n\t\tnormal = - normal;\n\n\t#endif\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tnormal = normal * faceDirection;\n\n\t#endif\n\n\tnormal = normalize( normalMatrix * normal );\n\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n\n\tvec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\n\tnormal = normalize( tbn * mapN );\n\n#elif defined( USE_BUMPMAP )\n\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n\n#endif\n',
            'normal_pars_fragment': '\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\n\t#endif\n\n#endif\n',
            'normal_pars_vertex': '\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\n\t#endif\n\n#endif\n',
            'normal_vertex': '\n#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED\n\n\tvNormal = normalize( transformedNormal );\n\n\t#ifdef USE_TANGENT\n\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\n\t#endif\n\n#endif\n',
            'normalmap_pars_fragment': '\n#ifdef USE_NORMALMAP\n\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\n#endif\n\n#ifdef USE_NORMALMAP_OBJECTSPACE\n\n\tuniform mat3 normalMatrix;\n\n#endif\n\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n\n\t// Normal Mapping Without Precomputed Tangents\n\t// http://www.thetenthplanet.de/archives/1180\n\n\tmat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( uv.st );\n\t\tvec2 st1 = dFdy( uv.st );\n\n\t\tvec3 N = surf_norm; // normalized\n\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n\n\t\treturn mat3( T * scale, B * scale, N );\n\n\t}\n\n#endif\n',
            'clearcoat_normal_fragment_begin': '\n#ifdef USE_CLEARCOAT\n\n\tvec3 clearcoatNormal = nonPerturbedNormal;\n\n#endif\n',
            'clearcoat_normal_fragment_maps': '\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\n\tclearcoatNormal = normalize( tbn2 * clearcoatMapN );\n\n#endif\n',
            'clearcoat_pars_fragment': '\n\n#ifdef USE_CLEARCOATMAP\n\n\tuniform sampler2D clearcoatMap;\n\n#endif\n\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n\n#endif\n\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n\tuniform sampler2D clearcoatRoughnessMap;\n\n#endif\n',
            'iridescence_pars_fragment': '\n\n#ifdef USE_IRIDESCENCEMAP\n\n\tuniform sampler2D iridescenceMap;\n\n#endif\n\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\n\tuniform sampler2D iridescenceThicknessMap;\n\n#endif\n',
            'opaque_fragment': '\n#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\n\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );\n',
            'packing': '\nvec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\n\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\n\nconst float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)\nconst float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)\n\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\n\nconst float ShiftRight8 = 1. / 256.;\n\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8; // tidy overflow\n\treturn r * PackUpscale;\n}\n\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\n\nvec2 packDepthToRG( in highp float v ) {\n\treturn packDepthToRGBA( v ).yx;\n}\n\nfloat unpackRGToDepth( const in highp vec2 v ) {\n\treturn unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );\n}\n\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\n\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\n\n// NOTE: viewZ, the z-coordinate in camera space, is negative for points in front of the camera\n\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\t// -near maps to 0; -far maps to 1\n\treturn ( viewZ + near ) / ( near - far );\n}\n\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\t// maps orthographic depth in [ 0, 1 ] to viewZ\n\treturn depth * ( near - far ) - near;\n}\n\n// NOTE: https://twitter.com/gonnavis/status/1377183786949959682\n\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\t// -near maps to 0; -far maps to 1\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\n\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\t// maps perspective depth in [ 0, 1 ] to viewZ\n\treturn ( near * far ) / ( ( far - near ) * depth - far );\n}\n',
            'premultiplied_alpha_fragment': '\n#ifdef PREMULTIPLIED_ALPHA\n\n\t// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.\n\tgl_FragColor.rgb *= gl_FragColor.a;\n\n#endif\n',
            'project_vertex': '\nvec4 mvPosition = vec4( transformed, 1.0 );\n\n#ifdef USE_BATCHING\n\n\tmvPosition = batchingMatrix * mvPosition;\n\n#endif\n\n#ifdef USE_INSTANCING\n\n\tmvPosition = instanceMatrix * mvPosition;\n\n#endif\n\nmvPosition = modelViewMatrix * mvPosition;\n\ngl_Position = projectionMatrix * mvPosition;\n',
            'dithering_fragment': '\n#ifdef DITHERING\n\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n\n#endif\n',
            'dithering_pars_fragment': '\n#ifdef DITHERING\n\n\t// based on https://www.shadertoy.com/view/MslGR8\n\tvec3 dithering( vec3 color ) {\n\t\t//Calculate grid position\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\n\t\t//Shift the individual colors differently, thus making it even harder to see the dithering pattern\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\n\t\t//modify shift according to grid position.\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\n\t\t//shift the color by dither_shift\n\t\treturn color + dither_shift_RGB;\n\t}\n\n#endif\n',
            'roughnessmap_fragment': '\nfloat roughnessFactor = roughness;\n\n#ifdef USE_ROUGHNESSMAP\n\n\tvec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n\n\t// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\troughnessFactor *= texelRoughness.g;\n\n#endif\n',
            'roughnessmap_pars_fragment': '\n#ifdef USE_ROUGHNESSMAP\n\n\tuniform sampler2D roughnessMap;\n\n#endif\n',
            'shadowmap_pars_fragment': '\n#if NUM_SPOT_LIGHT_COORDS > 0\n\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n\n#endif\n\n#if NUM_SPOT_LIGHT_MAPS > 0\n\n\tuniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n\n#endif\n\n#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): create uniforms for area light shadows\n\n\t#endif\n\t*/\n\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\n\t}\n\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\n\t}\n\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\n\t\tfloat occlusion = 1.0;\n\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\n\t\tfloat hard_shadow = step( compare , distribution.x ); // Hard Shadow\n\n\t\tif (hard_shadow != 1.0 ) {\n\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance ); // Chebeyshevs inequality\n\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 ); // 0.3 reduces light bleed\n\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\n\t\t}\n\t\treturn occlusion;\n\n\t}\n\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\n\t\tfloat shadow = 1.0;\n\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\n\t\tbool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n\t\tbool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n\n\t\tif ( frustumTest ) {\n\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\n\t\t#else // no percentage-closer filtering:\n\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\n\t\t#endif\n\n\t\t}\n\n\t\treturn shadow;\n\n\t}\n\n\t// cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D\n\t// vector suitable for 2D texture mapping. This code uses the following layout for the\n\t// 2D texture:\n\t//\n\t// xzXZ\n\t//  y Y\n\t//\n\t// Y - Positive y direction\n\t// y - Negative y direction\n\t// X - Positive x direction\n\t// x - Negative x direction\n\t// Z - Positive z direction\n\t// z - Negative z direction\n\t//\n\t// Source and test bed:\n\t// https://gist.github.com/tschw/da10c43c467ce8afd0c4\n\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\n\t\t// Number of texels to avoid at the edge of each square\n\n\t\tvec3 absV = abs( v );\n\n\t\t// Intersect unit cube\n\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\n\t\t// Apply scale to avoid seams\n\n\t\t// two texels less per square (one texel will do for NEAREST)\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\n\t\t// Unwrap\n\n\t\t// space: -1 ... 1 range for each square\n\t\t//\n\t\t// #X##\t\tdim    := ( 4 , 2 )\n\t\t//  # #\t\tcenter := ( 1 , 1 )\n\n\t\tvec2 planar = v.xy;\n\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\n\t\tif ( absV.z >= almostOne ) {\n\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\n\t\t} else if ( absV.x >= almostOne ) {\n\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\n\t\t} else if ( absV.y >= almostOne ) {\n\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\n\t\t}\n\n\t\t// Transform to UV space\n\n\t\t// scale := 0.5 / dim\n\t\t// translate := ( center + 0.5 ) / dim\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\n\t}\n\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\n\t\t// for point lights, the uniform @vShadowCoord is re-purposed to hold\n\t\t// the vector from the light to the world-space position of the fragment.\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\n\t\t// dp = normalized distance from light to fragment position\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?\n\t\tdp += shadowBias;\n\n\t\t// bd3D = base direction 3D\n\t\tvec3 bd3D = normalize( lightToPosition );\n\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\n\t\t#else // no percentage-closer filtering\n\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\n\t\t#endif\n\n\t}\n\n#endif\n',
            'shadowmap_pars_vertex': '\n\n#if NUM_SPOT_LIGHT_COORDS > 0\n\n\tuniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n\n#endif\n\n#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): uniforms for area light shadows\n\n\t#endif\n\t*/\n\n#endif\n',
            'shadowmap_vertex': '\n\n#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n\n\t// Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.\n\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\tvec4 shadowWorldPosition;\n\n#endif\n\n#if defined( USE_SHADOWMAP )\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\n\t\t}\n\t\t#pragma unroll_loop_end\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\n\t\t}\n\t\t#pragma unroll_loop_end\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): update vAreaShadowCoord with area light info\n\n\t#endif\n\t*/\n\n#endif\n\n// spot lights can be evaluated without active shadow mapping (when SpotLight.map is used)\n\n#if NUM_SPOT_LIGHT_COORDS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n\n\t\tshadowWorldPosition = worldPosition;\n\t\t#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t\tshadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n\t\t#endif\n\t\tvSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n\n',
            'shadowmask_pars_fragment': '\nfloat getShadowMask() {\n\n\tfloat shadow = 1.0;\n\n\t#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\tDirectionalLightShadow directionalLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\n\tSpotLightShadow spotLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\tPointLightShadow pointLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): update shadow for Area light\n\n\t#endif\n\t*/\n\n\t#endif\n\n\treturn shadow;\n\n}\n',
            'skinbase_vertex': '\n#ifdef USE_SKINNING\n\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif\n',
            'skinning_pars_vertex': '\n#ifdef USE_SKINNING\n\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\n\tuniform highp sampler2D boneTexture;\n\n\tmat4 getBoneMatrix( const in float i ) {\n\n\t\tint size = textureSize( boneTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n\n\t\treturn mat4( v1, v2, v3, v4 );\n\n\t}\n\n#endif\n',
            'skinning_vertex': '\n#ifdef USE_SKINNING\n\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n\n#endif\n',
            'skinnormal_vertex': '\n#ifdef USE_SKINNING\n\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\n\t#ifdef USE_TANGENT\n\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\n\t#endif\n\n#endif\n',
            'specularmap_fragment': '\nfloat specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n\tvec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n\tspecularStrength = texelSpecular.r;\n\n#else\n\n\tspecularStrength = 1.0;\n\n#endif\n',
            'specularmap_pars_fragment': '\n#ifdef USE_SPECULARMAP\n\n\tuniform sampler2D specularMap;\n\n#endif\n',
            'tonemapping_fragment': '\n#if defined( TONE_MAPPING )\n\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n\n#endif\n',
            'tonemapping_pars_fragment': '\n#ifndef saturate\n// <common> may have defined saturate() already\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n\nuniform float toneMappingExposure;\n\n// exposure only\nvec3 LinearToneMapping( vec3 color ) {\n\n\treturn saturate( toneMappingExposure * color );\n\n}\n\n// source: https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf\nvec3 ReinhardToneMapping( vec3 color ) {\n\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n\n}\n\n// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\n\t// optimized filmic operator by Jim Hejl and Richard Burgess-Dawson\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n\n}\n\n// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs\nvec3 RRTAndODTFit( vec3 v ) {\n\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n\n}\n\n// this implementation of ACES is modified to accommodate a brighter viewing environment.\n// the scale factor of 1/0.6 is subjective. see discussion in #19621.\n\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\n\t// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ), // transposed from source\n\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\n\t// ODT_SAT => XYZ => D60_2_D65 => sRGB\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ), // transposed from source\n\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\n\tcolor *= toneMappingExposure / 0.6;\n\n\tcolor = ACESInputMat * color;\n\n\t// Apply RRT and ODT\n\tcolor = RRTAndODTFit( color );\n\n\tcolor = ACESOutputMat * color;\n\n\t// Clamp to [0, 1]\n\treturn saturate( color );\n\n}\n\nvec3 CustomToneMapping( vec3 color ) { return color; }\n',
            'transmission_fragment': '\n#ifdef USE_TRANSMISSION\n\n\tmaterial.transmission = transmission;\n\tmaterial.transmissionAlpha = 1.0;\n\tmaterial.thickness = thickness;\n\tmaterial.attenuationDistance = attenuationDistance;\n\tmaterial.attenuationColor = attenuationColor;\n\n\t#ifdef USE_TRANSMISSIONMAP\n\n\t\tmaterial.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n\n\t#endif\n\n\t#ifdef USE_THICKNESSMAP\n\n\t\tmaterial.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n\n\t#endif\n\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = inverseTransformDirection( normal, viewMatrix );\n\n\tvec4 transmitted = getIBLVolumeRefraction(\n\t\tn, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,\n\t\tmaterial.attenuationColor, material.attenuationDistance );\n\n\tmaterial.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n\n\ttotalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n\n#endif\n',
            'transmission_pars_fragment': '\n#ifdef USE_TRANSMISSION\n\n\t// Transmission code is based on glTF-Sampler-Viewer\n\t// https://github.com/KhronosGroup/glTF-Sample-Viewer\n\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationColor;\n\n\t#ifdef USE_TRANSMISSIONMAP\n\n\t\tuniform sampler2D transmissionMap;\n\n\t#endif\n\n\t#ifdef USE_THICKNESSMAP\n\n\t\tuniform sampler2D thicknessMap;\n\n\t#endif\n\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\n\tvarying vec3 vWorldPosition;\n\n\t// Mipped Bicubic Texture Filtering by N8\n\t// https://www.shadertoy.com/view/Dl2SDW\n\n\tfloat w0( float a ) {\n\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n\n\t}\n\n\tfloat w1( float a ) {\n\n\t\treturn ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n\n\t}\n\n\tfloat w2( float a ){\n\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n\n\t}\n\n\tfloat w3( float a ) {\n\n\t\treturn ( 1.0 / 6.0 ) * ( a * a * a );\n\n\t}\n\n\t// g0 and g1 are the two amplitude functions\n\tfloat g0( float a ) {\n\n\t\treturn w0( a ) + w1( a );\n\n\t}\n\n\tfloat g1( float a ) {\n\n\t\treturn w2( a ) + w3( a );\n\n\t}\n\n\t// h0 and h1 are the two offset functions\n\tfloat h0( float a ) {\n\n\t\treturn - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n\n\t}\n\n\tfloat h1( float a ) {\n\n\t\treturn 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n\n\t}\n\n\tvec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n\n\t\tuv = uv * texelSize.zw + 0.5;\n\n\t\tvec2 iuv = floor( uv );\n\t\tvec2 fuv = fract( uv );\n\n\t\tfloat g0x = g0( fuv.x );\n\t\tfloat g1x = g1( fuv.x );\n\t\tfloat h0x = h0( fuv.x );\n\t\tfloat h1x = h1( fuv.x );\n\t\tfloat h0y = h0( fuv.y );\n\t\tfloat h1y = h1( fuv.y );\n\n\t\tvec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\n\t\treturn g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n\t\t\tg1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n\n\t}\n\n\tvec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n\n\t\tvec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n\t\tvec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n\t\tvec2 fLodSizeInv = 1.0 / fLodSize;\n\t\tvec2 cLodSizeInv = 1.0 / cLodSize;\n\t\tvec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n\t\tvec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n\t\treturn mix( fSample, cSample, fract( lod ) );\n\n\t}\n\n\tvec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n\n\t\t// Direction of refracted light.\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\n\t\t// Compute rotation-independant scaling of the model matrix.\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\n\t\t// The thickness is specified in local space.\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\n\t}\n\n\tfloat applyIorToRoughness( const in float roughness, const in float ior ) {\n\n\t\t// Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and\n\t\t// an IOR of 1.5 results in the default amount of microfacet refraction.\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\n\t}\n\n\tvec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n\n\t\tfloat lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\t\treturn textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n\n\t}\n\n\tvec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n\n\t\tif ( isinf( attenuationDistance ) ) {\n\n\t\t\t// Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.\n\t\t\treturn vec3( 1.0 );\n\n\t\t} else {\n\n\t\t\t// Compute light attenuation using Beer\x27s law.\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer\x27s law\n\t\t\treturn transmittance;\n\n\t\t}\n\n\t}\n\n\tvec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n\t\tconst in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n\t\tconst in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,\n\t\tconst in vec3 attenuationColor, const in float attenuationDistance ) {\n\n\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\tvec3 refractedRayExit = position + transmissionRay;\n\n\t\t// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.\n\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\trefractionCoords += 1.0;\n\t\trefractionCoords /= 2.0;\n\n\t\t// Sample framebuffer to get pixel the refracted ray hits.\n\t\tvec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\n\t\tvec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n\t\tvec3 attenuatedColor = transmittance * transmittedLight.rgb;\n\n\t\t// Get the specular component.\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\n\t\t// As less light is transmitted, the opacity should be increased. This simple approximation does a decent job \n\t\t// of modulating a CSS background, and has no effect when the buffer is opaque, due to a solid object or clear color.\n\t\tfloat transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n\n\t}\n#endif\n',
            'uv_pars_fragment': '\n#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\n\tvarying vec2 vUv;\n\n#endif\n#ifdef USE_MAP\n\n\tvarying vec2 vMapUv;\n\n#endif\n#ifdef USE_ALPHAMAP\n\n\tvarying vec2 vAlphaMapUv;\n\n#endif\n#ifdef USE_LIGHTMAP\n\n\tvarying vec2 vLightMapUv;\n\n#endif\n#ifdef USE_AOMAP\n\n\tvarying vec2 vAoMapUv;\n\n#endif\n#ifdef USE_BUMPMAP\n\n\tvarying vec2 vBumpMapUv;\n\n#endif\n#ifdef USE_NORMALMAP\n\n\tvarying vec2 vNormalMapUv;\n\n#endif\n#ifdef USE_EMISSIVEMAP\n\n\tvarying vec2 vEmissiveMapUv;\n\n#endif\n#ifdef USE_METALNESSMAP\n\n\tvarying vec2 vMetalnessMapUv;\n\n#endif\n#ifdef USE_ROUGHNESSMAP\n\n\tvarying vec2 vRoughnessMapUv;\n\n#endif\n#ifdef USE_ANISOTROPYMAP\n\n\tvarying vec2 vAnisotropyMapUv;\n\n#endif\n#ifdef USE_CLEARCOATMAP\n\n\tvarying vec2 vClearcoatMapUv;\n\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tvarying vec2 vClearcoatNormalMapUv;\n\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n\tvarying vec2 vClearcoatRoughnessMapUv;\n\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\n\tvarying vec2 vIridescenceMapUv;\n\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\n\tvarying vec2 vIridescenceThicknessMapUv;\n\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\n\tvarying vec2 vSheenColorMapUv;\n\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\n\tvarying vec2 vSheenRoughnessMapUv;\n\n#endif\n#ifdef USE_SPECULARMAP\n\n\tvarying vec2 vSpecularMapUv;\n\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\n\tvarying vec2 vSpecularColorMapUv;\n\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\n\tvarying vec2 vSpecularIntensityMapUv;\n\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n\n#endif\n#ifdef USE_THICKNESSMAP\n\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n\n#endif\n',
            'uv_pars_vertex': '\n#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\n\tvarying vec2 vUv;\n\n#endif\n#ifdef USE_MAP\n\n\tuniform mat3 mapTransform;\n\tvarying vec2 vMapUv;\n\n#endif\n#ifdef USE_ALPHAMAP\n\n\tuniform mat3 alphaMapTransform;\n\tvarying vec2 vAlphaMapUv;\n\n#endif\n#ifdef USE_LIGHTMAP\n\n\tuniform mat3 lightMapTransform;\n\tvarying vec2 vLightMapUv;\n\n#endif\n#ifdef USE_AOMAP\n\n\tuniform mat3 aoMapTransform;\n\tvarying vec2 vAoMapUv;\n\n#endif\n#ifdef USE_BUMPMAP\n\n\tuniform mat3 bumpMapTransform;\n\tvarying vec2 vBumpMapUv;\n\n#endif\n#ifdef USE_NORMALMAP\n\n\tuniform mat3 normalMapTransform;\n\tvarying vec2 vNormalMapUv;\n\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\n\tuniform mat3 displacementMapTransform;\n\tvarying vec2 vDisplacementMapUv;\n\n#endif\n#ifdef USE_EMISSIVEMAP\n\n\tuniform mat3 emissiveMapTransform;\n\tvarying vec2 vEmissiveMapUv;\n\n#endif\n#ifdef USE_METALNESSMAP\n\n\tuniform mat3 metalnessMapTransform;\n\tvarying vec2 vMetalnessMapUv;\n\n#endif\n#ifdef USE_ROUGHNESSMAP\n\n\tuniform mat3 roughnessMapTransform;\n\tvarying vec2 vRoughnessMapUv;\n\n#endif\n#ifdef USE_ANISOTROPYMAP\n\n\tuniform mat3 anisotropyMapTransform;\n\tvarying vec2 vAnisotropyMapUv;\n\n#endif\n#ifdef USE_CLEARCOATMAP\n\n\tuniform mat3 clearcoatMapTransform;\n\tvarying vec2 vClearcoatMapUv;\n\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tuniform mat3 clearcoatNormalMapTransform;\n\tvarying vec2 vClearcoatNormalMapUv;\n\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n\tuniform mat3 clearcoatRoughnessMapTransform;\n\tvarying vec2 vClearcoatRoughnessMapUv;\n\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\n\tuniform mat3 sheenColorMapTransform;\n\tvarying vec2 vSheenColorMapUv;\n\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\n\tuniform mat3 sheenRoughnessMapTransform;\n\tvarying vec2 vSheenRoughnessMapUv;\n\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\n\tuniform mat3 iridescenceMapTransform;\n\tvarying vec2 vIridescenceMapUv;\n\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\n\tuniform mat3 iridescenceThicknessMapTransform;\n\tvarying vec2 vIridescenceThicknessMapUv;\n\n#endif\n#ifdef USE_SPECULARMAP\n\n\tuniform mat3 specularMapTransform;\n\tvarying vec2 vSpecularMapUv;\n\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\n\tuniform mat3 specularColorMapTransform;\n\tvarying vec2 vSpecularColorMapUv;\n\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\n\tuniform mat3 specularIntensityMapTransform;\n\tvarying vec2 vSpecularIntensityMapUv;\n\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n\n#endif\n#ifdef USE_THICKNESSMAP\n\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n\n#endif\n',
            'uv_vertex': '\n#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\n\tvUv = vec3( uv, 1 ).xy;\n\n#endif\n#ifdef USE_MAP\n\n\tvMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_ALPHAMAP\n\n\tvAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_LIGHTMAP\n\n\tvLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_AOMAP\n\n\tvAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_BUMPMAP\n\n\tvBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_NORMALMAP\n\n\tvNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\n\tvDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_EMISSIVEMAP\n\n\tvEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_METALNESSMAP\n\n\tvMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_ROUGHNESSMAP\n\n\tvRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_ANISOTROPYMAP\n\n\tvAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_CLEARCOATMAP\n\n\tvClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tvClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n\tvClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\n\tvIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\n\tvIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\n\tvSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\n\tvSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SPECULARMAP\n\n\tvSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\n\tvSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\n\tvSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\n\tvTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_THICKNESSMAP\n\n\tvThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n\n#endif\n',
            'worldpos_vertex': '\n#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\n\t#ifdef USE_BATCHING\n\n\t\tworldPosition = batchingMatrix * worldPosition;\n\n\t#endif\n\n\t#ifdef USE_INSTANCING\n\n\t\tworldPosition = instanceMatrix * worldPosition;\n\n\t#endif\n\n\tworldPosition = modelMatrix * worldPosition;\n\n#endif\n',
            'background_vert': '\nvarying vec2 vUv;\nuniform mat3 uvTransform;\n\nvoid main() {\n\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n\n}\n',
            'background_frag': '\nuniform sampler2D t2D;\nuniform float backgroundIntensity;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n\tvec4 texColor = texture2D( t2D, vUv );\n\n\t#ifdef DECODE_VIDEO_TEXTURE\n\n\t\t// use inline sRGB decode until browsers properly support SRGB8_APLHA8 with video textures\n\n\t\ttexColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n\n\t#endif\n\n\ttexColor.rgb *= backgroundIntensity;\n\n\tgl_FragColor = texColor;\n\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\n}\n',
            'backgroundCube_vert': '\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n\tgl_Position.z = gl_Position.w; // set z to camera.far\n\n}\n',
            'backgroundCube_frag': '\n\n#ifdef ENVMAP_TYPE_CUBE\n\n\tuniform samplerCube envMap;\n\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n\n\tuniform sampler2D envMap;\n\n#endif\n\nuniform float flipEnvMap;\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\n\nvarying vec3 vWorldDirection;\n\n#include <cube_uv_reflection_fragment>\n\nvoid main() {\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\n\t\tvec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );\n\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\tvec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );\n\n\t#else\n\n\t\tvec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\n\t#endif\n\n\ttexColor.rgb *= backgroundIntensity;\n\n\tgl_FragColor = texColor;\n\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\n}\n',
            'cube_vert': '\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n\tgl_Position.z = gl_Position.w; // set z to camera.far\n\n}\n',
            'cube_frag': '\nuniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\n\nvarying vec3 vWorldDirection;\n\nvoid main() {\n\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\n\tgl_FragColor = texColor;\n\tgl_FragColor.a *= opacity;\n\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\n}\n',
            'depth_vert': '\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.\n// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for\n// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\n\t#ifdef USE_DISPLACEMENTMAP\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvHighPrecisionZW = gl_Position.zw;\n\n}\n',
            'depth_frag': '\n#if DEPTH_PACKING == 3200\n\n\tuniform float opacity;\n\n#endif\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tdiffuseColor.a = opacity;\n\n\t#endif\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\n\t#include <logdepthbuf_fragment>\n\n\t// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\n\t#elif DEPTH_PACKING == 3201\n\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\n\t#endif\n\n}\n',
            'distanceRGBA_vert': '\n#define DISTANCE\n\nvarying vec3 vWorldPosition;\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\n\t#ifdef USE_DISPLACEMENTMAP\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvWorldPosition = worldPosition.xyz;\n\n}\n',
            'distanceRGBA_frag': '\n#define DISTANCE\n\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main () {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist ); // clamp to [ 0, 1 ]\n\n\tgl_FragColor = packDepthToRGBA( dist );\n\n}\n',
            'equirect_vert': '\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n}\n',
            'equirect_frag': '\nuniform sampler2D tEquirect;\n\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvec3 direction = normalize( vWorldDirection );\n\n\tvec2 sampleUV = equirectUv( direction );\n\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\n}\n',
            'linedashed_vert': '\nuniform float scale;\nattribute float lineDistance;\n\nvarying float vLineDistance;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\tvLineDistance = scale * lineDistance;\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n}\n',
            'linedashed_frag': '\nuniform vec3 diffuse;\nuniform float opacity;\n\nuniform float dashSize;\nuniform float totalSize;\n\nvarying float vLineDistance;\n\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\n\t\tdiscard;\n\n\t}\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\n\toutgoingLight = diffuseColor.rgb; // simple shader\n\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\n}\n',
            'meshbasic_vert': '\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n\n}\n',
            'meshbasic_frag': '\nuniform vec3 diffuse;\nuniform float opacity;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\n\t// accumulation (baked indirect lighting only)\n\t#ifdef USE_LIGHTMAP\n\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\treflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n\n\t#else\n\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\n\t#endif\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\n\t#include <envmap_fragment>\n\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n',
            'meshlambert_vert': '\n#define LAMBERT\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n',
            'meshlambert_frag': '\n#define LAMBERT\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_lambert_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n',
            'meshmatcap_vert': '\n#define MATCAP\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n}\n',
            'meshmatcap_frag': '\n#define MATCAP\n\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks\n\n\t#ifdef USE_MATCAP\n\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\n\t#else\n\n\t\tvec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 ); // default if matcap is missing\n\n\t#endif\n\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n',
            'meshnormal_vert': '\n#define NORMAL\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\n\tvarying vec3 vViewPosition;\n\n#endif\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\n\tvViewPosition = - mvPosition.xyz;\n\n#endif\n\n}\n',
            'meshnormal_frag': '\n#define NORMAL\n\nuniform float opacity;\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\n\tvarying vec3 vViewPosition;\n\n#endif\n\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n\n\t#ifdef OPAQUE\n\n\t\tgl_FragColor.a = 1.0;\n\n\t#endif\n\n}\n',
            'meshphong_vert': '\n#define PHONG\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n',
            'meshphong_frag': '\n#define PHONG\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n',
            'meshphysical_vert': '\n#define STANDARD\n\nvarying vec3 vViewPosition;\n\n#ifdef USE_TRANSMISSION\n\n\tvarying vec3 vWorldPosition;\n\n#endif\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n#ifdef USE_TRANSMISSION\n\n\tvWorldPosition = worldPosition.xyz;\n\n#endif\n}\n',
            'meshphysical_frag': '\n#define STANDARD\n\n#ifdef PHYSICAL\n\t#define IOR\n\t#define USE_SPECULAR\n#endif\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n#ifdef IOR\n\tuniform float ior;\n#endif\n\n#ifdef USE_SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularColor;\n\n\t#ifdef USE_SPECULAR_COLORMAP\n\t\tuniform sampler2D specularColorMap;\n\t#endif\n\n\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n#endif\n\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n\n#ifdef USE_IRIDESCENCE\n\tuniform float iridescence;\n\tuniform float iridescenceIOR;\n\tuniform float iridescenceThicknessMinimum;\n\tuniform float iridescenceThicknessMaximum;\n#endif\n\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\n\tuniform float sheenRoughness;\n\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tuniform sampler2D sheenColorMap;\n\t#endif\n\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n\t#endif\n#endif\n\n#ifdef USE_ANISOTROPY\n\tuniform vec2 anisotropyVector;\n\n\t#ifdef USE_ANISOTROPYMAP\n\t\tuniform sampler2D anisotropyMap;\n\t#endif\n#endif\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\n\t#include <transmission_fragment>\n\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\n\t#ifdef USE_SHEEN\n\n\t\t// Sheen energy compensation approximation calculation can be found at the end of\n\t\t// https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing\n\t\tfloat sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n\n\t\toutgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;\n\n\t#endif\n\n\t#ifdef USE_CLEARCOAT\n\n\t\tfloat dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\n\t\toutgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n\n\t#endif\n\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n',
            'meshtoon_vert': '\n#define TOON\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n',
            'meshtoon_frag': '\n#define TOON\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n',
            'points_vert': '\nuniform float size;\nuniform float scale;\n\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n#ifdef USE_POINTS_UV\n\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n\n#endif\n\nvoid main() {\n\n\t#ifdef USE_POINTS_UV\n\n\t\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\n\t#endif\n\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\n\tgl_PointSize = size;\n\n\t#ifdef USE_SIZEATTENUATION\n\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\n\t#endif\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n\n}\n',
            'points_frag': '\nuniform vec3 diffuse;\nuniform float opacity;\n\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\n\toutgoingLight = diffuseColor.rgb;\n\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\n}\n',
            'shadow_vert': '\n#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\n\nvoid main() {\n\n\t#include <batching_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n',
            'shadow_frag': '\nuniform vec3 color;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n\nvoid main() {\n\n\t#include <logdepthbuf_fragment>\n\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\n}\n',
            'sprite_vert': '\nuniform float rotation;\nuniform vec2 center;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\n\t#ifndef USE_SIZEATTENUATION\n\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\n\t#endif\n\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\n\tmvPosition.xy += rotatedPosition;\n\n\tgl_Position = projectionMatrix * mvPosition;\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n}\n',
            'sprite_frag': '\nuniform vec3 diffuse;\nuniform float opacity;\n\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\n\toutgoingLight = diffuseColor.rgb;\n\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\n}\n'
        };
    }
    ,
    0x9c0d: (F, E, p) => {
        p.d(E, {
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
                'uniforms': (0,
                R.Ii)([d.f.common, d.f.specularmap, d.f.envmap, d.f.aomap, d.f.lightmap, d.f.fog]),
                'vertexShader': S.v.meshbasic_vert,
                'fragmentShader': S.v.meshbasic_frag
            },
            'lambert': {
                'uniforms': (0,
                R.Ii)([d.f.common, d.f.specularmap, d.f.envmap, d.f.aomap, d.f.lightmap, d.f.emissivemap, d.f.bumpmap, d.f.normalmap, d.f.displacementmap, d.f.fog, d.f.lights, {
                    'emissive': {
                        'value': new P.Q(0)
                    }
                }]),
                'vertexShader': S.v.meshlambert_vert,
                'fragmentShader': S.v.meshlambert_frag
            },
            'phong': {
                'uniforms': (0,
                R.Ii)([d.f.common, d.f.specularmap, d.f.envmap, d.f.aomap, d.f.lightmap, d.f.emissivemap, d.f.bumpmap, d.f.normalmap, d.f.displacementmap, d.f.fog, d.f.lights, {
                    'emissive': {
                        'value': new P.Q(0)
                    },
                    'specular': {
                        'value': new P.Q(0x111111)
                    },
                    'shininess': {
                        'value': 0x1e
                    }
                }]),
                'vertexShader': S.v.meshphong_vert,
                'fragmentShader': S.v.meshphong_frag
            },
            'standard': {
                'uniforms': (0,
                R.Ii)([d.f.common, d.f.envmap, d.f.aomap, d.f.lightmap, d.f.emissivemap, d.f.bumpmap, d.f.normalmap, d.f.displacementmap, d.f.roughnessmap, d.f.metalnessmap, d.f.fog, d.f.lights, {
                    'emissive': {
                        'value': new P.Q(0)
                    },
                    'roughness': {
                        'value': 1
                    },
                    'metalness': {
                        'value': 0
                    },
                    'envMapIntensity': {
                        'value': 1
                    }
                }]),
                'vertexShader': S.v.meshphysical_vert,
                'fragmentShader': S.v.meshphysical_frag
            },
            'toon': {
                'uniforms': (0,
                R.Ii)([d.f.common, d.f.aomap, d.f.lightmap, d.f.emissivemap, d.f.bumpmap, d.f.normalmap, d.f.displacementmap, d.f.gradientmap, d.f.fog, d.f.lights, {
                    'emissive': {
                        'value': new P.Q(0)
                    }
                }]),
                'vertexShader': S.v.meshtoon_vert,
                'fragmentShader': S.v.meshtoon_frag
            },
            'matcap': {
                'uniforms': (0,
                R.Ii)([d.f.common, d.f.bumpmap, d.f.normalmap, d.f.displacementmap, d.f.fog, {
                    'matcap': {
                        'value': null
                    }
                }]),
                'vertexShader': S.v.meshmatcap_vert,
                'fragmentShader': S.v.meshmatcap_frag
            },
            'points': {
                'uniforms': (0,
                R.Ii)([d.f.points, d.f.fog]),
                'vertexShader': S.v.points_vert,
                'fragmentShader': S.v.points_frag
            },
            'dashed': {
                'uniforms': (0,
                R.Ii)([d.f.common, d.f.fog, {
                    'scale': {
                        'value': 1
                    },
                    'dashSize': {
                        'value': 1
                    },
                    'totalSize': {
                        'value': 2
                    }
                }]),
                'vertexShader': S.v.linedashed_vert,
                'fragmentShader': S.v.linedashed_frag
            },
            'depth': {
                'uniforms': (0,
                R.Ii)([d.f.common, d.f.displacementmap]),
                'vertexShader': S.v.depth_vert,
                'fragmentShader': S.v.depth_frag
            },
            'normal': {
                'uniforms': (0,
                R.Ii)([d.f.common, d.f.bumpmap, d.f.normalmap, d.f.displacementmap, {
                    'opacity': {
                        'value': 1
                    }
                }]),
                'vertexShader': S.v.meshnormal_vert,
                'fragmentShader': S.v.meshnormal_frag
            },
            'sprite': {
                'uniforms': (0,
                R.Ii)([d.f.sprite, d.f.fog]),
                'vertexShader': S.v.sprite_vert,
                'fragmentShader': S.v.sprite_frag
            },
            'background': {
                'uniforms': {
                    'uvTransform': {
                        'value': new Q.d()
                    },
                    't2D': {
                        'value': null
                    },
                    'backgroundIntensity': {
                        'value': 1
                    }
                },
                'vertexShader': S.v.background_vert,
                'fragmentShader': S.v.background_frag
            },
            'backgroundCube': {
                'uniforms': {
                    'envMap': {
                        'value': null
                    },
                    'flipEnvMap': {
                        'value': -1
                    },
                    'backgroundBlurriness': {
                        'value': 0
                    },
                    'backgroundIntensity': {
                        'value': 1
                    }
                },
                'vertexShader': S.v.backgroundCube_vert,
                'fragmentShader': S.v.backgroundCube_frag
            },
            'cube': {
                'uniforms': {
                    'tCube': {
                        'value': null
                    },
                    'tFlip': {
                        'value': -1
                    },
                    'opacity': {
                        'value': 1
                    }
                },
                'vertexShader': S.v.cube_vert,
                'fragmentShader': S.v.cube_frag
            },
            'equirect': {
                'uniforms': {
                    'tEquirect': {
                        'value': null
                    }
                },
                'vertexShader': S.v.equirect_vert,
                'fragmentShader': S.v.equirect_frag
            },
            'distanceRGBA': {
                'uniforms': (0,
                R.Ii)([d.f.common, d.f.displacementmap, {
                    'referencePosition': {
                        'value': new y.P()
                    },
                    'nearDistance': {
                        'value': 1
                    },
                    'farDistance': {
                        'value': 0x3e8
                    }
                }]),
                'vertexShader': S.v.distanceRGBA_vert,
                'fragmentShader': S.v.distanceRGBA_frag
            },
            'shadow': {
                'uniforms': (0,
                R.Ii)([d.f.lights, d.f.fog, {
                    'color': {
                        'value': new P.Q(0)
                    },
                    'opacity': {
                        'value': 1
                    }
                }]),
                'vertexShader': S.v.shadow_vert,
                'fragmentShader': S.v.shadow_frag
            }
        };
        B.physical = {
            'uniforms': (0,
            R.Ii)([B.standard.uniforms, {
                'clearcoat': {
                    'value': 0
                },
                'clearcoatMap': {
                    'value': null
                },
                'clearcoatMapTransform': {
                    'value': new Q.d()
                },
                'clearcoatNormalMap': {
                    'value': null
                },
                'clearcoatNormalMapTransform': {
                    'value': new Q.d()
                },
                'clearcoatNormalScale': {
                    'value': new H.I(1,1)
                },
                'clearcoatRoughness': {
                    'value': 0
                },
                'clearcoatRoughnessMap': {
                    'value': null
                },
                'clearcoatRoughnessMapTransform': {
                    'value': new Q.d()
                },
                'iridescence': {
                    'value': 0
                },
                'iridescenceMap': {
                    'value': null
                },
                'iridescenceMapTransform': {
                    'value': new Q.d()
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
                    'value': new Q.d()
                },
                'sheen': {
                    'value': 0
                },
                'sheenColor': {
                    'value': new P.Q(0)
                },
                'sheenColorMap': {
                    'value': null
                },
                'sheenColorMapTransform': {
                    'value': new Q.d()
                },
                'sheenRoughness': {
                    'value': 1
                },
                'sheenRoughnessMap': {
                    'value': null
                },
                'sheenRoughnessMapTransform': {
                    'value': new Q.d()
                },
                'transmission': {
                    'value': 0
                },
                'transmissionMap': {
                    'value': null
                },
                'transmissionMapTransform': {
                    'value': new Q.d()
                },
                'transmissionSamplerSize': {
                    'value': new H.I()
                },
                'transmissionSamplerMap': {
                    'value': null
                },
                'thickness': {
                    'value': 0
                },
                'thicknessMap': {
                    'value': null
                },
                'thicknessMapTransform': {
                    'value': new Q.d()
                },
                'attenuationDistance': {
                    'value': 0
                },
                'attenuationColor': {
                    'value': new P.Q(0)
                },
                'specularColor': {
                    'value': new P.Q(1,1,1)
                },
                'specularColorMap': {
                    'value': null
                },
                'specularColorMapTransform': {
                    'value': new Q.d()
                },
                'specularIntensity': {
                    'value': 1
                },
                'specularIntensityMap': {
                    'value': null
                },
                'specularIntensityMapTransform': {
                    'value': new Q.d()
                },
                'anisotropyVector': {
                    'value': new H.I()
                },
                'anisotropyMap': {
                    'value': null
                },
                'anisotropyMapTransform': {
                    'value': new Q.d()
                }
            }]),
            'vertexShader': S.v.meshphysical_vert,
            'fragmentShader': S.v.meshphysical_frag
        };
    }
    ,
    0x971c: (F, E, p) => {
        p.d(E, {
            'H': () => S,
            'J': () => R
        });
        var S = '\nvoid main() {\n\n\tgl_Position = vec4( position, 1.0 );\n\n}\n'
          , R = '\nuniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n\n#include <packing>\n\nvoid main() {\n\n\tconst float samples = float( VSM_SAMPLES );\n\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\n\tfloat uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n\tfloat uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n\tfor ( float i = 0.0; i < samples; i ++ ) {\n\n\t\tfloat uvOffset = uvStart + i * uvStride;\n\n\t\t#ifdef HORIZONTAL_PASS\n\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\n\t\t#else\n\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\n\t\t#endif\n\n\t}\n\n\tmean = mean / samples;\n\tsquared_mean = squared_mean / samples;\n\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n\n}\n';
    }
    ,
    0x41ef: (F, E, p) => {
        p.d(E, {
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
                    m && (m.isColor || m.isMatrix3 || m.isMatrix4 || m.isVector2 || m.isVector3 || m.isVector4 || m.isTexture || m.isQuaternion) ? m.isRenderTargetTexture ? (console.warn('UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().'),
                    B[M][X] = null) : B[M][X] = m.clone() : Array.isArray(m) ? B[M][X] = m.slice() : B[M][X] = m;
                }
            return B;
        }
        function H(Q) {
            for (var B = {}, M = 0; M < Q.length; M++) {
                var X = R(Q[M]);
                for (var m in X)
                    B[m] = X[m];
            }
            return B;
        }
        function y(Q) {
            for (var B = [], M = 0; M < Q.length; M++)
                B.push(Q[M].clone());
            return B;
        }
        function d(Q) {
            return null === Q.getRenderTarget() ? Q.outputColorSpace : S.pp.workingColorSpace;
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
              , R = false
              , H = null
              , y = null;
            function d(P, Q) {
                H(P, Q),
                y = S.requestAnimationFrame(d);
            }
            return {
                'start': function() {
                    true !== R && null !== H && (y = S.requestAnimationFrame(d),
                    R = true);
                },
                'stop': function() {
                    S.cancelAnimationFrame(y),
                    R = false;
                },
                'setAnimationLoop': function(P) {
                    H = P;
                },
                'setContext': function(P) {
                    S = P;
                }
            };
        }
        E.d(F, {
            'O': () => p
        });
    }
    ,
    0xc1e: (r, F, E) => {
        function p(S, R) {
            var H = R.isWebGL2
              , y = new WeakMap();
            return {
                'get': function(d) {
                    return d.isInterleavedBufferAttribute && (d = d.data),
                    y.get(d);
                },
                'remove': function(d) {
                    d.isInterleavedBufferAttribute && (d = d.data);
                    var P = y.get(d);
                    P && (S.deleteBuffer(P.buffer),
                    y.delete(d));
                },
                'update': function(d, P) {
                    if (d.isGLBufferAttribute) {
                        var Q = y.get(d);
                        (!Q || Q.version < d.version) && y.set(d, {
                            'buffer': d.buffer,
                            'type': d.type,
                            'bytesPerElement': d.elementSize,
                            'version': d.version
                        });
                    } else {
                        d.isInterleavedBufferAttribute && (d = d.data);
                        var B = y.get(d);
                        if (undefined === B)
                            y.set(d, function(M, X) {
                                var m, w = M.array, l = M.usage, C = w.byteLength, N = S.createBuffer();
                                if (S.bindBuffer(X, N),
                                S.bufferData(X, w, l),
                                M.onUploadCallback(),
                                w instanceof Float32Array)
                                    m = S.FLOAT;
                                else {
                                    if (w instanceof Uint16Array) {
                                        if (M.isFloat16BufferAttribute) {
                                            if (!H)
                                                throw new Error('THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.');
                                            m = S.HALF_FLOAT;
                                        } else
                                            m = S.UNSIGNED_SHORT;
                                    } else {
                                        if (w instanceof Int16Array)
                                            m = S.SHORT;
                                        else {
                                            if (w instanceof Uint32Array)
                                                m = S.UNSIGNED_INT;
                                            else {
                                                if (w instanceof Int32Array)
                                                    m = S.INT;
                                                else {
                                                    if (w instanceof Int8Array)
                                                        m = S.BYTE;
                                                    else {
                                                        if (w instanceof Uint8Array)
                                                            m = S.UNSIGNED_BYTE;
                                                        else {
                                                            if (!(w instanceof Uint8ClampedArray))
                                                                throw new Error('THREE.WebGLAttributes: Unsupported buffer data format: ' + w);
                                                            m = S.UNSIGNED_BYTE;
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
                                    'bytesPerElement': w.BYTES_PER_ELEMENT,
                                    'version': M.version,
                                    'size': C
                                };
                            }(d, P));
                        else {
                            if (B.version < d.version) {
                                if (B.size !== d.array.byteLength)
                                    throw new Error('THREE.WebGLAttributes: The size of the buffer attribute\x27s array buffer does not match the original size. Resizing buffer attributes is not supported.');
                                !function(M, X, m) {
                                    var w = X.array
                                      , C = X._updateRange
                                      , N = X.updateRanges;
                                    if (S.bindBuffer(m, M),
                                    -1 === C.count && 0 === N.length && S.bufferSubData(m, 0, w),
                                    0 !== N.length) {
                                        for (var Z = 0, h = N.length; Z < h; Z++) {
                                            var U = N[Z];
                                            H ? S.bufferSubData(m, U.start * w.BYTES_PER_ELEMENT, w, U.start, U.count) : S.bufferSubData(m, U.start * w.BYTES_PER_ELEMENT, w.subarray(U.start, U.start + U.count));
                                        }
                                        X.clearUpdateRanges();
                                    }
                                    -1 !== C.count && (H ? S.bufferSubData(m, C.offset * w.BYTES_PER_ELEMENT, w, C.offset, C.count) : S.bufferSubData(m, C.offset * w.BYTES_PER_ELEMENT, w.subarray(C.offset, C.offset + C.count)),
                                    C.count = -1),
                                    X.onUploadCallback();
                                }(B.buffer, d, P),
                                B.version = d.version;
                            }
                        }
                    }
                }
            };
        }
        E.d(F, {
            'B': () => p
        });
    }
    ,
    0x7b4e: (r, F, E) => {
        function p(S, R, H, y) {
            var d, P = y.isWebGL2;
            this.setMode = function(Q) {
                d = Q;
            }
            ,
            this.render = function(Q, B) {
                S.drawArrays(d, Q, B),
                H.update(B, d, 1);
            }
            ,
            this.renderInstances = function(Q, B, M) {
                if (0 !== M) {
                    var X, m;
                    if (P)
                        X = S,
                        m = 'drawArraysInstanced';
                    else {
                        if (m = 'drawArraysInstancedANGLE',
                        null === (X = R.get('ANGLE_instanced_arrays')))
                            return void console.error('THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
                    }
                    X[m](d, Q, B, M),
                    H.update(B, d, M);
                }
            }
            ,
            this.renderMultiDraw = function(Q, B, M) {
                if (0 !== M) {
                    var X = R.get('WEBGL_multi_draw');
                    if (null === X) {
                        for (var m = 0; m < M; m++)
                            this.render(Q[m], B[m]);
                    } else {
                        X.multiDrawArraysWEBGL(d, Q, 0, B, 0, M);
                        for (var w = 0, C = 0; C < M; C++)
                            w += B[C];
                        H.update(w, d, 1);
                    }
                }
            }
            ;
        }
        E.d(F, {
            'b': () => p
        });
    }
    ,
    0xcf4d: (r, F, E) => {
        function p(S, R, H) {
            var y;
            function P(L) {
                if ('highp' === L) {
                    if (S.getShaderPrecisionFormat(S.VERTEX_SHADER, S.HIGH_FLOAT).precision > 0 && S.getShaderPrecisionFormat(S.FRAGMENT_SHADER, S.HIGH_FLOAT).precision > 0)
                        return 'highp';
                    L = 'mediump';
                }
                return 'mediump' === L && S.getShaderPrecisionFormat(S.VERTEX_SHADER, S.MEDIUM_FLOAT).precision > 0 && S.getShaderPrecisionFormat(S.FRAGMENT_SHADER, S.MEDIUM_FLOAT).precision > 0 ? 'mediump' : 'lowp';
            }
            var Q = 'undefined' != typeof WebGL2RenderingContext && 'WebGL2RenderingContext' === S.constructor.name
              , B = undefined !== H.precision ? H.precision : 'highp'
              , M = P(B);
            M !== B && (console.warn('THREE.WebGLRenderer:', B, 'not supported, using', M, 'instead.'),
            B = M);
            var X = Q || R.has('WEBGL_draw_buffers')
              , w = true === H.logarithmicDepthBuffer
              , C = S.getParameter(S.MAX_TEXTURE_IMAGE_UNITS)
              , N = S.getParameter(S.MAX_VERTEX_TEXTURE_IMAGE_UNITS)
              , Z = S.getParameter(S.MAX_TEXTURE_SIZE)
              , U = S.getParameter(S.MAX_CUBE_MAP_TEXTURE_SIZE)
              , T = S.getParameter(S.MAX_VERTEX_ATTRIBS)
              , V = S.getParameter(S.MAX_VERTEX_UNIFORM_VECTORS)
              , G = S.getParameter(S.MAX_VARYING_VECTORS)
              , k = S.getParameter(S.MAX_FRAGMENT_UNIFORM_VECTORS)
              , W = N > 0
              , I = Q || R.has('OES_texture_float');
            return {
                'isWebGL2': Q,
                'drawBuffers': X,
                'getMaxAnisotropy': function() {
                    if (undefined !== y)
                        return y;
                    if (true === R.has('EXT_texture_filter_anisotropic')) {
                        var L = R.get('EXT_texture_filter_anisotropic');
                        y = S.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
                    } else
                        y = 0;
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
                'maxSamples': Q ? S.getParameter(S.MAX_SAMPLES) : 0
            };
        }
        E.d(F, {
            'E': () => p
        });
    }
    ,
    0xddf9: (r, F, E) => {
        function p(S) {
            var R = {};
            function H(y) {
                if (undefined !== R[y])
                    return R[y];
                var d;
                switch (y) {
                case 'WEBGL_depth_texture':
                    d = S.getExtension('WEBGL_depth_texture') || S.getExtension('MOZ_WEBGL_depth_texture') || S.getExtension('WEBKIT_WEBGL_depth_texture');
                    break;
                case 'EXT_texture_filter_anisotropic':
                    d = S.getExtension('EXT_texture_filter_anisotropic') || S.getExtension('MOZ_EXT_texture_filter_anisotropic') || S.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
                    break;
                case 'WEBGL_compressed_texture_s3tc':
                    d = S.getExtension('WEBGL_compressed_texture_s3tc') || S.getExtension('MOZ_WEBGL_compressed_texture_s3tc') || S.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
                    break;
                case 'WEBGL_compressed_texture_pvrtc':
                    d = S.getExtension('WEBGL_compressed_texture_pvrtc') || S.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');
                    break;
                default:
                    d = S.getExtension(y);
                }
                return R[y] = d,
                d;
            }
            return {
                'has': function(y) {
                    return null !== H(y);
                },
                'init': function(y) {
                    y.isWebGL2 ? H('EXT_color_buffer_float') : (H('WEBGL_depth_texture'),
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
                    return null === d && console.warn('THREE.WebGLRenderer: ' + y + ' extension not supported.'),
                    d;
                }
            };
        }
        E.d(F, {
            'C': () => p
        });
    }
    ,
    0xcff: (r, F, E) => {
        function p(S, R, H, y) {
            var d, P, Q, B = y.isWebGL2;
            this.setMode = function(M) {
                d = M;
            }
            ,
            this.setIndex = function(M) {
                P = M.type,
                Q = M.bytesPerElement;
            }
            ,
            this.render = function(M, X) {
                S.drawElements(d, X, P, M * Q),
                H.update(X, d, 1);
            }
            ,
            this.renderInstances = function(M, X, m) {
                if (0 !== m) {
                    var w, C;
                    if (B)
                        w = S,
                        C = 'drawElementsInstanced';
                    else {
                        if (C = 'drawElementsInstancedANGLE',
                        null === (w = R.get('ANGLE_instanced_arrays')))
                            return void console.error('THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
                    }
                    w[C](d, X, P, M * Q, m),
                    H.update(X, d, m);
                }
            }
            ,
            this.renderMultiDraw = function(M, X, m) {
                if (0 !== m) {
                    var w = R.get('WEBGL_multi_draw');
                    if (null === w) {
                        for (var C = 0; C < m; C++)
                            this.render(M[C] / Q, X[C]);
                    } else {
                        w.multiDrawElementsWEBGL(d, X, 0, P, M, 0, m);
                        for (var N = 0, Z = 0; Z < m; Z++)
                            N += X[Z];
                        H.update(N, d, 1);
                    }
                }
            }
            ;
        }
        E.d(F, {
            'W': () => p
        });
    }
    ,
    0xfa3f: (r, F, E) => {
        function p(S) {
            var R = {
                'frame': 0,
                'calls': 0,
                'triangles': 0,
                'points': 0,
                'lines': 0
            };
            return {
                'memory': {
                    'geometries': 0,
                    'textures': 0
                },
                'render': R,
                'programs': null,
                'autoReset': true,
                'reset': function() {
                    R.calls = 0,
                    R.triangles = 0,
                    R.points = 0,
                    R.lines = 0;
                },
                'update': function(H, y, d) {
                    switch (R.calls++,
                    y) {
                    case S.TRIANGLES:
                        R.triangles += d * (H / 3);
                        break;
                    case S.LINES:
                        R.lines += d * (H / 2);
                        break;
                    case S.LINE_STRIP:
                        R.lines += d * (H - 1);
                        break;
                    case S.LINE_LOOP:
                        R.lines += d * H;
                        break;
                    case S.POINTS:
                        R.points += d * H;
                        break;
                    default:
                        console.error('THREE.WebGLInfo: Unknown draw mode:', y);
                    }
                }
            };
        }
        E.d(F, {
            'i': () => p
        });
    }
    ,
    0x11c2f: (r, F, E) => {
        function p(S, R, H, y) {
            var d = new WeakMap();
            function P(Q) {
                var B = Q.target;
                B.removeEventListener('dispose', P),
                H.remove(B.instanceMatrix),
                null !== B.instanceColor && H.remove(B.instanceColor);
            }
            return {
                'update': function(Q) {
                    var B = y.render.frame
                      , M = Q.geometry
                      , X = R.get(Q, M);
                    if (d.get(X) !== B && (R.update(X),
                    d.set(X, B)),
                    Q.isInstancedMesh && (false === Q.hasEventListener('dispose', P) && Q.addEventListener('dispose', P),
                    d.get(Q) !== B && (H.update(Q.instanceMatrix, S.ARRAY_BUFFER),
                    null !== Q.instanceColor && H.update(Q.instanceColor, S.ARRAY_BUFFER),
                    d.set(Q, B))),
                    Q.isSkinnedMesh) {
                        var m = Q.skeleton;
                        d.get(m) !== B && (m.update(),
                        d.set(m, B));
                    }
                    return X;
                },
                'dispose': function() {
                    d = new WeakMap();
                }
            };
        }
        E.d(F, {
            'C': () => p
        });
    }
    ,
    0xbaa2: (r, F, E) => {
        function p() {
            var S = new WeakMap();
            return {
                'get': function(R) {
                    var H = S.get(R);
                    return undefined === H && (H = {},
                    S.set(R, H)),
                    H;
                },
                'remove': function(R) {
                    S.delete(R);
                },
                'update': function(R, H, y) {
                    S.get(R)[H] = y;
                },
                'dispose': function() {
                    S = new WeakMap();
                }
            };
        }
        E.d(F, {
            'R': () => p
        });
    }
    ,
    0xac6: (F, E, p) => {
        function S(d, P) {
            return d.groupOrder !== P.groupOrder ? d.groupOrder - P.groupOrder : d.renderOrder !== P.renderOrder ? d.renderOrder - P.renderOrder : d.material.id !== P.material.id ? d.material.id - P.material.id : d.z !== P.z ? d.z - P.z : d.id - P.id;
        }
        function R(d, P) {
            return d.groupOrder !== P.groupOrder ? d.groupOrder - P.groupOrder : d.renderOrder !== P.renderOrder ? d.renderOrder - P.renderOrder : d.z !== P.z ? P.z - d.z : d.id - P.id;
        }
        function H() {
            var d = []
              , P = 0
              , Q = []
              , B = []
              , M = [];
            function X(m, w, l, C, N, Z) {
                var h = d[P];
                return undefined === h ? (h = {
                    'id': m.id,
                    'object': m,
                    'geometry': w,
                    'material': l,
                    'groupOrder': C,
                    'renderOrder': m.renderOrder,
                    'z': N,
                    'group': Z
                },
                d[P] = h) : (h.id = m.id,
                h.object = m,
                h.geometry = w,
                h.material = l,
                h.groupOrder = C,
                h.renderOrder = m.renderOrder,
                h.z = N,
                h.group = Z),
                P++,
                h;
            }
            return {
                'opaque': Q,
                'transmissive': B,
                'transparent': M,
                'init': function() {
                    P = 0,
                    Q.length = 0,
                    B.length = 0,
                    M.length = 0;
                },
                'push': function(m, w, C, N, Z, h) {
                    var U = X(m, w, C, N, Z, h);
                    C.transmission > 0 ? B.push(U) : true === C.transparent ? M.push(U) : Q.push(U);
                },
                'unshift': function(m, w, C, N, Z, h) {
                    var U = X(m, w, C, N, Z, h);
                    C.transmission > 0 ? B.unshift(U) : true === C.transparent ? M.unshift(U) : Q.unshift(U);
                },
                'finish': function() {
                    for (var m = P, w = d.length; m < w; m++) {
                        var l = d[m];
                        if (null === l.id)
                            break;
                        l.id = null,
                        l.object = null,
                        l.geometry = null,
                        l.material = null,
                        l.group = null;
                    }
                },
                'sort': function(m, w) {
                    Q.length > 1 && Q.sort(m || S),
                    B.length > 1 && B.sort(w || R),
                    M.length > 1 && M.sort(w || R);
                }
            };
        }
        function y() {
            var d = new WeakMap();
            return {
                'get': function(P, Q) {
                    var B, M = d.get(P);
                    return undefined === M ? (B = new H(),
                    d.set(P, [B])) : Q >= M.length ? (B = new H(),
                    M.push(B)) : B = M[Q],
                    B;
                },
                'dispose': function() {
                    d = new WeakMap();
                }
            };
        }
        p.d(E, {
            '$': () => y
        });
    }
    ,
    0x16f96: (r, F, E) => {
        function p(S, R, H) {
            var y = S.createShader(R);
            return S.shaderSource(y, H),
            S.compileShader(y),
            y;
        }
        E.d(F, {
            'n': () => p
        });
    }
    ,
    0x2106: (F, E, p) => {
        function S(P, Q) {
            var B = 'undefined' != typeof Symbol && P[Symbol.iterator] || P['@@iterator'];
            if (B)
                return (B = B.call(P)).next.bind(B);
            if (Array.isArray(P) || (B = function(X, m) {
                if (!X)
                    return;
                if ('string' == typeof X)
                    return R(X, m);
                var w = Object.prototype.toString.call(X).slice(8, -1);
                'Object' === w && X.constructor && (w = X.constructor.name);
                if ('Map' === w || 'Set' === w)
                    return Array.from(X);
                if ('Arguments' === w || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(w))
                    return R(X, m);
            }(P)) || Q && P && 'number' == typeof P.length) {
                B && (P = B);
                var M = 0;
                return function() {
                    return M >= P.length ? {
                        'done': true
                    } : {
                        'done': false,
                        'value': P[M++]
                    };
                }
                ;
            }
            throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
        }
        function R(P, Q) {
            (null == Q || Q > P.length) && (Q = P.length);
            for (var B = 0, M = new Array(Q); B < Q; B++)
                M[B] = P[B];
            return M;
        }
        p.d(E, {
            'j': () => y
        });
        var H = 0
          , y = (function() {
            function P() {
                this.shaderCache = new Map(),
                this.materialCache = new Map();
            }
            var Q = P.prototype;
            return Q.update = function(B) {
                var M = B.vertexShader
                  , X = B.fragmentShader
                  , m = this._getShaderStage(M)
                  , w = this._getShaderStage(X)
                  , l = this._getShaderCacheForMaterial(B);
                return false === l.has(m) && (l.add(m),
                m.usedTimes++),
                false === l.has(w) && (l.add(w),
                w.usedTimes++),
                this;
            }
            ,
            Q.remove = function(B) {
                for (var M, X = S(this.materialCache.get(B)); !(M = X()).done; ) {
                    var m = M.value;
                    m.usedTimes--,
                    0 === m.usedTimes && this.shaderCache.delete(m.code);
                }
                return this.materialCache.delete(B),
                this;
            }
            ,
            Q.getVertexShaderID = function(B) {
                return this._getShaderStage(B.vertexShader).id;
            }
            ,
            Q.getFragmentShaderID = function(B) {
                return this._getShaderStage(B.fragmentShader).id;
            }
            ,
            Q.dispose = function() {
                this.shaderCache.clear(),
                this.materialCache.clear();
            }
            ,
            Q._getShaderCacheForMaterial = function(B) {
                var M = this.materialCache
                  , X = M.get(B);
                return undefined === X && (X = new Set(),
                M.set(B, X)),
                X;
            }
            ,
            Q._getShaderStage = function(B) {
                var M = this.shaderCache
                  , X = M.get(B);
                return undefined === X && (X = new d(B),
                M.set(B, X)),
                X;
            }
            ,
            P;
        }())
          , d = function(P) {
            this.id = H++,
            this.code = P,
            this.usedTimes = 0;
        };
    }
    ,
    0x9176: (r, F, E) => {
        function p(S, R, H, y) {
            var d = {}
              , P = {}
              , Q = []
              , B = H.isWebGL2 ? S.getParameter(S.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
            function M(w, C, N) {
                var Z = w.value;
                if (undefined === N[C]) {
                    if ('number' == typeof Z)
                        N[C] = Z;
                    else {
                        for (var h = Array.isArray(Z) ? Z : [Z], U = [], T = 0; T < h.length; T++)
                            U.push(h[T].clone());
                        N[C] = U;
                    }
                    return true;
                }
                if ('number' == typeof Z) {
                    if (N[C] !== Z)
                        return N[C] = Z,
                        true;
                } else
                    for (var V = Array.isArray(N[C]) ? N[C] : [N[C]], G = Array.isArray(Z) ? Z : [Z], k = 0; k < V.length; k++) {
                        var W = V[k];
                        if (false === W.equals(G[k]))
                            return W.copy(G[k]),
                            true;
                    }
                return false;
            }
            function X(w) {
                var C = {
                    'boundary': 0,
                    'storage': 0
                };
                return 'number' == typeof w ? (C.boundary = 4,
                C.storage = 4) : w.isVector2 ? (C.boundary = 8,
                C.storage = 8) : w.isVector3 || w.isColor ? (C.boundary = 0x10,
                C.storage = 12) : w.isVector4 ? (C.boundary = 0x10,
                C.storage = 0x10) : w.isMatrix3 ? (C.boundary = 0x30,
                C.storage = 0x30) : w.isMatrix4 ? (C.boundary = 0x40,
                C.storage = 0x40) : w.isTexture ? console.warn('THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.') : console.warn('THREE.WebGLRenderer: Unsupported uniform value type.', w),
                C;
            }
            function m(w) {
                var C = w.target;
                C.removeEventListener('dispose', m);
                var N = Q.indexOf(C.__bindingPointIndex);
                Q.splice(N, 1),
                S.deleteBuffer(d[C.id]),
                delete d[C.id],
                delete P[C.id];
            }
            return {
                'bind': function(w, C) {
                    var N = C.program;
                    y.uniformBlockBinding(w, N);
                },
                'update': function(w, C) {
                    var N = d[w.id];
                    undefined === N && (!function(T) {
                        for (var V = T.uniforms, G = 0, k = 0x10, W = 0, x = 0, I = V.length; x < I; x++) {
                            for (var g = V[x], L = {
                                'boundary': 0,
                                'storage': 0
                            }, q = Array.isArray(g.value) ? g.value : [g.value], K = 0, Y = q.length; K < Y; K++) {
                                var z = X(q[K]);
                                L.boundary += z.boundary,
                                L.storage += z.storage;
                            }
                            if (g.__data = new Float32Array(L.storage / Float32Array.BYTES_PER_ELEMENT),
                            g.__offset = G,
                            x > 0)
                                0 !== (W = G % k) && k - W - L.boundary < 0 && (G += k - W,
                                g.__offset = G);
                            G += L.storage;
                        }
                        (W = G % k) > 0 && (G += k - W),
                        (T.__size = G,
                        T.__cache = {});
                    }(w),
                    N = function(T) {
                        var V = (function() {
                            for (var x = 0; x < B; x++)
                                if (-1 === Q.indexOf(x))
                                    return Q.push(x),
                                    x;
                            return console.error('THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.'),
                            0;
                        }());
                        T.__bindingPointIndex = V;
                        var G = S.createBuffer()
                          , k = T.__size
                          , W = T.usage;
                        return S.bindBuffer(S.UNIFORM_BUFFER, G),
                        S.bufferData(S.UNIFORM_BUFFER, k, W),
                        S.bindBuffer(S.UNIFORM_BUFFER, null),
                        S.bindBufferBase(S.UNIFORM_BUFFER, V, G),
                        G;
                    }(w),
                    d[w.id] = N,
                    w.addEventListener('dispose', m));
                    var Z = C.program;
                    y.updateUBOMapping(w, Z);
                    var U = R.render.frame;
                    P[w.id] !== U && (!function(T) {
                        var V = d[T.id]
                          , G = T.uniforms
                          , k = T.__cache;
                        S.bindBuffer(S.UNIFORM_BUFFER, V);
                        for (var W = 0, x = G.length; W < x; W++) {
                            var I = G[W];
                            if (true === M(I, W, k)) {
                                for (var g = I.__offset, L = Array.isArray(I.value) ? I.value : [I.value], q = 0, K = 0; K < L.length; K++) {
                                    var Y = L[K]
                                      , z = X(Y);
                                    'number' == typeof Y ? (I.__data[0] = Y,
                                    S.bufferSubData(S.UNIFORM_BUFFER, g + q, I.__data)) : Y.isMatrix3 ? (I.__data[0] = Y.elements[0],
                                    I.__data[1] = Y.elements[1],
                                    I.__data[2] = Y.elements[2],
                                    I.__data[3] = Y.elements[0],
                                    I.__data[4] = Y.elements[3],
                                    I.__data[5] = Y.elements[4],
                                    I.__data[6] = Y.elements[5],
                                    I.__data[7] = Y.elements[0],
                                    I.__data[8] = Y.elements[6],
                                    I.__data[9] = Y.elements[7],
                                    I.__data[10] = Y.elements[8],
                                    I.__data[11] = Y.elements[0]) : (Y.toArray(I.__data, q),
                                    q += z.storage / Float32Array.BYTES_PER_ELEMENT);
                                }
                                S.bufferSubData(S.UNIFORM_BUFFER, g, I.__data);
                            }
                        }
                        S.bindBuffer(S.UNIFORM_BUFFER, null);
                    }(w),
                    P[w.id] = U);
                },
                'dispose': function() {
                    for (var w in d)
                        S.deleteBuffer(d[w]);
                    Q = [],
                    d = {},
                    P = {};
                }
            };
        }
        E.d(F, {
            'p': () => p
        });
    }
    ,
    0xc3ba: (F, E, p) => {
        p.d(E, {
            'h': () => H
        });
        var S = p(0x172d2)
          , R = p(0x4efe);
        function H(y, d, P) {
            var Q = P.isWebGL2;
            return {
                'convert': function(B, M) {
                    var X;
                    undefined === M && (M = S.jf0);
                    var m = R.pp.getTransfer(M);
                    if (B === S.OUM)
                        return y.UNSIGNED_BYTE;
                    if (B === S.Wew)
                        return y.UNSIGNED_SHORT_4_4_4_4;
                    if (B === S.gJ2)
                        return y.UNSIGNED_SHORT_5_5_5_1;
                    if (B === S.tJf)
                        return y.BYTE;
                    if (B === S.fBL)
                        return y.SHORT;
                    if (B === S.cHt)
                        return y.UNSIGNED_SHORT;
                    if (B === S.Yuy)
                        return y.INT;
                    if (B === S.bkx)
                        return y.UNSIGNED_INT;
                    if (B === S.RQf)
                        return y.FLOAT;
                    if (B === S.ix0)
                        return Q ? y.HALF_FLOAT : null !== (X = d.get('OES_texture_half_float')) ? X.HALF_FLOAT_OES : null;
                    if (B === S.wrO)
                        return y.ALPHA;
                    if (B === S.GWd)
                        return y.RGBA;
                    if (B === S.Kzv)
                        return y.LUMINANCE;
                    if (B === S.CMB)
                        return y.LUMINANCE_ALPHA;
                    if (B === S.zdS)
                        return y.DEPTH_COMPONENT;
                    if (B === S.dcC)
                        return y.DEPTH_STENCIL;
                    if (B === S.Ua6)
                        return null !== (X = d.get('EXT_sRGB')) ? X.SRGB_ALPHA_EXT : null;
                    if (B === S.VT0)
                        return y.RED;
                    if (B === S.ZQM)
                        return y.RED_INTEGER;
                    if (B === S.paN)
                        return y.RG;
                    if (B === S.TkQ)
                        return y.RG_INTEGER;
                    if (B === S.c90)
                        return y.RGBA_INTEGER;
                    if (B === S.IE4 || B === S.Nz6 || B === S.jR7 || B === S.BXX) {
                        if (m === S.KLL) {
                            if (null === (X = d.get('WEBGL_compressed_texture_s3tc_srgb')))
                                return null;
                            if (B === S.IE4)
                                return X.COMPRESSED_SRGB_S3TC_DXT1_EXT;
                            if (B === S.Nz6)
                                return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
                            if (B === S.jR7)
                                return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
                            if (B === S.BXX)
                                return X.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
                        } else {
                            if (null === (X = d.get('WEBGL_compressed_texture_s3tc')))
                                return null;
                            if (B === S.IE4)
                                return X.COMPRESSED_RGB_S3TC_DXT1_EXT;
                            if (B === S.Nz6)
                                return X.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                            if (B === S.jR7)
                                return X.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                            if (B === S.BXX)
                                return X.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                        }
                    }
                    if (B === S.k6Q || B === S.kTp || B === S.HXV || B === S.pBf) {
                        if (null === (X = d.get('WEBGL_compressed_texture_pvrtc')))
                            return null;
                        if (B === S.k6Q)
                            return X.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                        if (B === S.kTp)
                            return X.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                        if (B === S.HXV)
                            return X.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                        if (B === S.pBf)
                            return X.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
                    }
                    if (B === S.CVz)
                        return null !== (X = d.get('WEBGL_compressed_texture_etc1')) ? X.COMPRESSED_RGB_ETC1_WEBGL : null;
                    if (B === S.Riy || B === S.KDk) {
                        if (null === (X = d.get('WEBGL_compressed_texture_etc')))
                            return null;
                        if (B === S.Riy)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ETC2 : X.COMPRESSED_RGB8_ETC2;
                        if (B === S.KDk)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : X.COMPRESSED_RGBA8_ETC2_EAC;
                    }
                    if (B === S.qa3 || B === S.B_h || B === S.czI || B === S.rSH || B === S.Qrf || B === S.psI || B === S.a5J || B === S._QJ || B === S.uB5 || B === S.lyL || B === S.bC7 || B === S.y3Z || B === S.ojs || B === S['S$4']) {
                        if (null === (X = d.get('WEBGL_compressed_texture_astc')))
                            return null;
                        if (B === S.qa3)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : X.COMPRESSED_RGBA_ASTC_4x4_KHR;
                        if (B === S.B_h)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : X.COMPRESSED_RGBA_ASTC_5x4_KHR;
                        if (B === S.czI)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : X.COMPRESSED_RGBA_ASTC_5x5_KHR;
                        if (B === S.rSH)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : X.COMPRESSED_RGBA_ASTC_6x5_KHR;
                        if (B === S.Qrf)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : X.COMPRESSED_RGBA_ASTC_6x6_KHR;
                        if (B === S.psI)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : X.COMPRESSED_RGBA_ASTC_8x5_KHR;
                        if (B === S.a5J)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : X.COMPRESSED_RGBA_ASTC_8x6_KHR;
                        if (B === S._QJ)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : X.COMPRESSED_RGBA_ASTC_8x8_KHR;
                        if (B === S.uB5)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : X.COMPRESSED_RGBA_ASTC_10x5_KHR;
                        if (B === S.lyL)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : X.COMPRESSED_RGBA_ASTC_10x6_KHR;
                        if (B === S.bC7)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : X.COMPRESSED_RGBA_ASTC_10x8_KHR;
                        if (B === S.y3Z)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : X.COMPRESSED_RGBA_ASTC_10x10_KHR;
                        if (B === S.ojs)
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : X.COMPRESSED_RGBA_ASTC_12x10_KHR;
                        if (B === S['S$4'])
                            return m === S.KLL ? X.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : X.COMPRESSED_RGBA_ASTC_12x12_KHR;
                    }
                    if (B === S.Fn || B === S.H23 || B === S.W9U) {
                        if (null === (X = d.get('EXT_texture_compression_bptc')))
                            return null;
                        if (B === S.Fn)
                            return m === S.KLL ? X.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : X.COMPRESSED_RGBA_BPTC_UNORM_EXT;
                        if (B === S.H23)
                            return X.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
                        if (B === S.W9U)
                            return X.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
                    }
                    if (B === S.Kef || B === S.XG_ || B === S.HO_ || B === S.CWW) {
                        if (null === (X = d.get('EXT_texture_compression_rgtc')))
                            return null;
                        if (B === S.Fn)
                            return X.COMPRESSED_RED_RGTC1_EXT;
                        if (B === S.XG_)
                            return X.COMPRESSED_SIGNED_RED_RGTC1_EXT;
                        if (B === S.HO_)
                            return X.COMPRESSED_RED_GREEN_RGTC2_EXT;
                        if (B === S.CWW)
                            return X.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
                    }
                    return B === S.V3x ? Q ? y.UNSIGNED_INT_24_8 : null !== (X = d.get('WEBGL_depth_texture')) ? X.UNSIGNED_INT_24_8_WEBGL : null : undefined !== y[B] ? y[B] : null;
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
        p.d(E, {
            'b': () => d
        });
        var S = p(0x14124)
          , R = p(0x12e4b)
          , H = p(0x17417)
          , y = p(0x172d2)
          , d = function(P) {
            function Q(B, M, X, m, w, C, N, Z, U, T) {
                var V;
                return B = undefined !== B ? B : [],
                M = undefined !== M ? M : y.hy7,
                (V = P.call(this, B, M, X, m, w, C, N, Z, U, T) || this).isCubeTexture = true,
                V.flipY = false,
                V;
            }
            return (0,
            R.A)(Q, P),
            (0,
            S.A)(Q, [{
                'key': 'images',
                'get': function() {
                    return this.image;
                },
                'set': function(B) {
                    this.image = B;
                }
            }]);
        }(H.g);
    }
    ,
    0x10762: (F, E, p) => {
        p.d(E, {
            'd': () => y
        });
        var S = p(0x12e4b)
          , R = p(0x17417)
          , H = p(0x172d2)
          , y = function(d) {
            function P(Q, B, M, X) {
                var m;
                return undefined === Q && (Q = null),
                undefined === B && (B = 1),
                undefined === M && (M = 1),
                undefined === X && (X = 1),
                (m = d.call(this, null) || this).isData3DTexture = true,
                m.image = {
                    'data': Q,
                    'width': B,
                    'height': M,
                    'depth': X
                },
                m.magFilter = H.hxR,
                m.minFilter = H.hxR,
                m.wrapR = H.ghU,
                m.generateMipmaps = false,
                m.flipY = false,
                m.unpackAlignment = 1,
                m;
            }
            return (0,
            S.A)(P, d),
            P;
        }(R.g);
    }
    ,
    0xc71e: (F, E, p) => {
        p.d(E, {
            'r': () => y
        });
        var S = p(0x12e4b)
          , R = p(0x17417)
          , H = p(0x172d2)
          , y = function(d) {
            function P(Q, B, M, X) {
                var m;
                return undefined === Q && (Q = null),
                undefined === B && (B = 1),
                undefined === M && (M = 1),
                undefined === X && (X = 1),
                (m = d.call(this, null) || this).isDataArrayTexture = true,
                m.image = {
                    'data': Q,
                    'width': B,
                    'height': M,
                    'depth': X
                },
                m.magFilter = H.hxR,
                m.minFilter = H.hxR,
                m.wrapR = H.ghU,
                m.generateMipmaps = false,
                m.flipY = false,
                m.unpackAlignment = 1,
                m;
            }
            return (0,
            S.A)(P, d),
            P;
        }(R.g);
    }
    ,
    0xac1a: (F, E, p) => {
        p.d(E, {
            'V': () => y
        });
        var S = p(0x12e4b)
          , R = p(0x17417)
          , H = p(0x172d2)
          , y = function(d) {
            function P(B, M, X, m, w, C, N, Z, U, T) {
                var V;
                if ((T = undefined !== T ? T : H.zdS) !== H.zdS && T !== H.dcC)
                    throw new Error('DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat');
                return undefined === X && T === H.zdS && (X = H.bkx),
                undefined === X && T === H.dcC && (X = H.V3x),
                (V = d.call(this, null, m, w, C, N, Z, T, X, U) || this).isDepthTexture = true,
                V.image = {
                    'width': B,
                    'height': M
                },
                V.magFilter = undefined !== N ? N : H.hxR,
                V.minFilter = undefined !== Z ? Z : H.hxR,
                V.flipY = false,
                V.generateMipmaps = false,
                V.compareFunction = null,
                V;
            }
            (0,
            S.A)(P, d);
            var Q = P.prototype;
            return Q.copy = function(B) {
                return d.prototype.copy.call(this, B),
                this.compareFunction = B.compareFunction,
                this;
            }
            ,
            Q.toJSON = function(B) {
                var M = d.prototype.toJSON.call(this, B);
                return null !== this.compareFunction && (M.compareFunction = this.compareFunction),
                M;
            }
            ,
            P;
        }(R.g);
    }
    ,
    0x6dbc: (r, F, E) => {
        E(0x17417),
        E(0x172d2);
    }
    ,
    0x14f63: (F, E, p) => {
        p.d(E, {
            'k': () => d
        });
        var S = p(0x14124)
          , R = p(0x10d2d)
          , H = p(0xbd95)
          , y = 0
          , d = (function() {
            function Q(B) {
                undefined === B && (B = null),
                this.isSource = true,
                Object.defineProperty(this, 'id', {
                    'value': y++
                }),
                this.uuid = H.lk(),
                this.data = B,
                this.version = 0;
            }
            return Q.prototype.toJSON = function(B) {
                var M = undefined === B || 'string' == typeof B;
                if (!M && undefined !== B.images[this.uuid])
                    return B.images[this.uuid];
                var X = {
                    'uuid': this.uuid,
                    'url': ''
                }
                  , m = this.data;
                if (null !== m) {
                    var w;
                    if (Array.isArray(m)) {
                        w = [];
                        for (var l = 0, C = m.length; l < C; l++)
                            m[l].isDataTexture ? w.push(P(m[l].image)) : w.push(P(m[l]));
                    } else
                        w = P(m);
                    X.url = w;
                }
                return M || (B.images[this.uuid] = X),
                X;
            }
            ,
            (0,
            S.A)(Q, [{
                'key': 'needsUpdate',
                'set': function(B) {
                    true === B && this.version++;
                }
            }]);
        }());
        function P(Q) {
            return 'undefined' != typeof HTMLImageElement && Q instanceof HTMLImageElement || 'undefined' != typeof HTMLCanvasElement && Q instanceof HTMLCanvasElement || 'undefined' != typeof ImageBitmap && Q instanceof ImageBitmap ? R.H.getDataURL(Q) : Q.data ? {
                'data': Array.from(Q.data),
                'width': Q.width,
                'height': Q.height,
                'type': Q.data.constructor.name
            } : (console.warn('THREE.Texture: Unable to serialize Texture.'),
            {});
        }
    }
    ,
    0x17417: (F, E, p) => {
        p.d(E, {
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
          , m = 0
          , w = function(C) {
            function N(U, T, V, G, k, W, I, L, q, K) {
                var Y;
                return undefined === U && (U = N.DEFAULT_IMAGE),
                undefined === T && (T = N.DEFAULT_MAPPING),
                undefined === V && (V = y.ghU),
                undefined === G && (G = y.ghU),
                undefined === k && (k = y.k6q),
                undefined === W && (W = y['$_I']),
                undefined === I && (I = y.GWd),
                undefined === L && (L = y.OUM),
                undefined === q && (q = N.DEFAULT_ANISOTROPY),
                undefined === K && (K = y.jf0),
                (Y = C.call(this) || this).isTexture = true,
                Object.defineProperty(Y, 'id', {
                    'value': m++
                }),
                Y.uuid = P.lk(),
                Y.name = '',
                Y.source = new M.k(U),
                Y.mipmaps = [],
                Y.mapping = T,
                Y.channel = 0,
                Y.wrapS = V,
                Y.wrapT = G,
                Y.magFilter = k,
                Y.minFilter = W,
                Y.anisotropy = q,
                Y.format = I,
                Y.internalFormat = null,
                Y.type = L,
                Y.offset = new Q.I(0,0),
                Y.repeat = new Q.I(1,1),
                Y.center = new Q.I(0,0),
                Y.rotation = 0,
                Y.matrixAutoUpdate = true,
                Y.matrix = new B.d(),
                Y.generateMipmaps = true,
                Y.premultiplyAlpha = false,
                Y.flipY = true,
                Y.unpackAlignment = 4,
                'string' == typeof K ? Y.colorSpace = K : ((0,
                X.mc)('THREE.Texture: Property .encoding has been replaced by .colorSpace.'),
                Y.colorSpace = K === y.S2Q ? y['er$'] : y.jf0),
                Y.userData = {},
                Y.version = 0,
                Y.onUpdate = null,
                Y.isRenderTargetTexture = false,
                Y.needsPMREMUpdate = false,
                Y;
            }
            (0,
            R.A)(N, C);
            var Z = N.prototype;
            return Z.updateMatrix = function() {
                this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
            }
            ,
            Z.clone = function() {
                return new this.constructor().copy(this);
            }
            ,
            Z.copy = function(U) {
                return this.name = U.name,
                this.source = U.source,
                this.mipmaps = U.mipmaps.slice(0),
                this.mapping = U.mapping,
                this.channel = U.channel,
                this.wrapS = U.wrapS,
                this.wrapT = U.wrapT,
                this.magFilter = U.magFilter,
                this.minFilter = U.minFilter,
                this.anisotropy = U.anisotropy,
                this.format = U.format,
                this.internalFormat = U.internalFormat,
                this.type = U.type,
                this.offset.copy(U.offset),
                this.repeat.copy(U.repeat),
                this.center.copy(U.center),
                this.rotation = U.rotation,
                this.matrixAutoUpdate = U.matrixAutoUpdate,
                this.matrix.copy(U.matrix),
                this.generateMipmaps = U.generateMipmaps,
                this.premultiplyAlpha = U.premultiplyAlpha,
                this.flipY = U.flipY,
                this.unpackAlignment = U.unpackAlignment,
                this.colorSpace = U.colorSpace,
                this.userData = JSON.parse(JSON.stringify(U.userData)),
                this.needsUpdate = true,
                this;
            }
            ,
            Z.toJSON = function(U) {
                var T = undefined === U || 'string' == typeof U;
                if (!T && undefined !== U.textures[this.uuid])
                    return U.textures[this.uuid];
                var V = {
                    'metadata': {
                        'version': 4.6,
                        'type': 'Texture',
                        'generator': 'Texture.toJSON'
                    },
                    'uuid': this.uuid,
                    'name': this.name,
                    'image': this.source.toJSON(U).uuid,
                    'mapping': this.mapping,
                    'channel': this.channel,
                    'repeat': [this.repeat.x, this.repeat.y],
                    'offset': [this.offset.x, this.offset.y],
                    'center': [this.center.x, this.center.y],
                    'rotation': this.rotation,
                    'wrap': [this.wrapS, this.wrapT],
                    'format': this.format,
                    'internalFormat': this.internalFormat,
                    'type': this.type,
                    'colorSpace': this.colorSpace,
                    'minFilter': this.minFilter,
                    'magFilter': this.magFilter,
                    'anisotropy': this.anisotropy,
                    'flipY': this.flipY,
                    'generateMipmaps': this.generateMipmaps,
                    'premultiplyAlpha': this.premultiplyAlpha,
                    'unpackAlignment': this.unpackAlignment
                };
                return Object.keys(this.userData).length > 0 && (V.userData = this.userData),
                T || (U.textures[this.uuid] = V),
                V;
            }
            ,
            Z.dispose = function() {
                this.dispatchEvent({
                    'type': 'dispose'
                });
            }
            ,
            Z.transformUv = function(U) {
                if (this.mapping !== y.UTZ)
                    return U;
                if (U.applyMatrix3(this.matrix),
                U.x < 0 || U.x > 1)
                    switch (this.wrapS) {
                    case y.GJx:
                        U.x = U.x - Math.floor(U.x);
                        break;
                    case y.ghU:
                        U.x = U.x < 0 ? 0 : 1;
                        break;
                    case y.kTW:
                        1 === Math.abs(Math.floor(U.x) % 2) ? U.x = Math.ceil(U.x) - U.x : U.x = U.x - Math.floor(U.x);
                    }
                if (U.y < 0 || U.y > 1)
                    switch (this.wrapT) {
                    case y.GJx:
                        U.y = U.y - Math.floor(U.y);
                        break;
                    case y.ghU:
                        U.y = U.y < 0 ? 0 : 1;
                        break;
                    case y.kTW:
                        1 === Math.abs(Math.floor(U.y) % 2) ? U.y = Math.ceil(U.y) - U.y : U.y = U.y - Math.floor(U.y);
                    }
                return this.flipY && (U.y = 1 - U.y),
                U;
            }
            ,
            (0,
            S.A)(N, [{
                'key': 'image',
                'get': function() {
                    return this.source.data;
                },
                'set': function(U) {
                    undefined === U && (U = null),
                    this.source.data = U;
                }
            }, {
                'key': 'needsUpdate',
                'set': function(U) {
                    true === U && (this.version++,
                    this.source.needsUpdate = true);
                }
            }, {
                'key': 'encoding',
                'get': function() {
                    return (0,
                    X.mc)('THREE.Texture: Property .encoding has been replaced by .colorSpace.'),
                    this.colorSpace === y['er$'] ? y.S2Q : y.tgE;
                },
                'set': function(U) {
                    (0,
                    X.mc)('THREE.Texture: Property .encoding has been replaced by .colorSpace.'),
                    this.colorSpace = U === y.S2Q ? y['er$'] : y.jf0;
                }
            }]);
        }(H.Q);
        w.DEFAULT_IMAGE = null,
        w.DEFAULT_MAPPING = y.UTZ,
        w.DEFAULT_ANISOTROPY = 1;
    }
    ,
    0x14b20: (r, F, E) => {
        E(0x172d2),
        E(0x17417);
    }
    ,
    0x1078a: (F, E, p) => {
        function S(P) {
            for (var Q = P.length - 1; Q >= 0; --Q)
                if (P[Q] >= 0xffff)
                    return true;
            return false;
        }
        p.d(E, {
            'AQ': () => S,
            'lP': () => H,
            'mc': () => d,
            'qq': () => R
        });
        // just verify that all TypedArrays exist
        /** @type {new (length: number) => TypedArray} */
        const Typed_Array = Object.getPrototypeOf(Uint8Array.prototype).constructor;
        if(!(
            Int8Array.prototype
            instanceof Typed_Array
        )) throw new TypeError("Int8Array is not a child type of TypedArray");
        if(!(
            Uint8Array.prototype
            instanceof Typed_Array
        )) throw new TypeError("Uint8Array is not a child type of TypedArray");
        if(!(
            Uint8ClampedArray.prototype
            instanceof Typed_Array
        )) throw new TypeError("Uint8ClampedArray is not a child type of TypedArray");
        if(!(
            Int16Array.prototype
            instanceof Typed_Array
        )) throw new TypeError("Int16Array is not a child type of TypedArray");
        if(!(
            Uint16Array.prototype
            instanceof Typed_Array
        )) throw new TypeError("Uint16Array is not a child type of TypedArray");
        if(!(
            Int32Array.prototype
            instanceof Typed_Array
        )) throw new TypeError("Int32Array is not a child type of TypedArray");
        if(!(
            Uint32Array.prototype
            instanceof Typed_Array
        )) throw new TypeError("Uint32Array is not a child type of TypedArray");
        if(!(
            Float32Array.prototype
            instanceof Typed_Array
        )) throw new TypeError("Float32Array is not a child type of TypedArray");
        if(!(
            Float64Array.prototype
            instanceof Typed_Array
        )) throw new TypeError("Float64Array is not a child type of TypedArray");
        function R(P) {
            return document.createElementNS('http://www.w3.org/1999/xhtml', P);
        }
        function H() {
            /** @type HTMLCanvasElement */
            var P = R('canvas');
            P.style.display = 'block';
            return P;
        }
        var y = {};
        function d(P) {
            if(!(P in y)){
                y[P] = true;
                console.warn(P);
            };
        }
    },
    0xc666: (r, F, E) => {
        r.exports = E.p + './package/4e8a512dac54131cbbb0.mp3';
    },
    0x50ef: (r, F, E) => {
        r.exports = E.p + './package/e99db4e6bd7fded791f1.mp3';
    },
    0xbc1c: (r, F, E) => {
        r.exports = E.p + './package/016928c19d30a9dde3a6.mp3';
    },
    0x4494: (r, F, E) => {
        r.exports = E.p + './package/0fd18333acc39a73982f.mp3';
    },
    0xdd70: (r, F, E) => {
        r.exports = E.p + './package/15afd22e3d194ea0c5f7.mp3';
    },
    0x14533: (r, F, E) => {
        r.exports = E.p + './package/8ec6c3e6c72d5148e959.mp3';
    },
    0x5507: (r, F, E) => {
        r.exports = E.p + './package/f78d568edd5221a37143.mp3';
    },
    0x32d6: (r, F, E) => {
        r.exports = E.p + './package/90b785ff2bbb6bbecc2a.mp3';
    },
    0x5bef: (r, F, E) => {
        r.exports = E.p + './package/ca16954f9bc0f316ffe6.mp3';
    },
    0x5e66: (r, F, E) => {
        r.exports = E.p + './package/7b17069332b4fbae3d28.mp3';
    },
    0x8cc4: (r, F, E) => {
        r.exports = E.p + './package/55dd09a3c49862787ac4.mp3';
    },
    0x11d1d: (r, F, E) => {
        r.exports = E.p + './package/c1d3e7c4459035af5314.mp3';
    },
    0x3fa2: (r, F, E) => {
        r.exports = E.p + './package/6936d0ccb9221c0c2587.mp3';
    },
    0x654e: (r, F, E) => {
        r.exports = E.p + './package/e3801eeb9f86871a55e4.mp3';
    },
    0xe6b1: (r, F, E) => {
        r.exports = E.p + './package/c6849ece22e0c631c268.mp3';
    },
    0xb663: (r, F, E) => {
        r.exports = E.p + './package/d6af5d6ce8d311baac43.mp3';
    },
    0x5ba: (r, F, E) => {
        r.exports = E.p + './package/63f3170f6a15f93e68a6.mp3';
    },
    0x16a51: (r, F, E) => {
        r.exports = E.p + './package/d0900792af4d2c6b0f7c.mp3';
    },
    0x26d3: (r, F, E) => {
        r.exports = E.p + './package/ddc8fe9b5b340fc5a625.mp3';
    },
    0x5fcb: (r, F, E) => {
        r.exports = E.p + './package/10684a207ae51686ff13.mp3';
    },
    0x3d98: (r, F, E) => {
        r.exports = E.p + './package/ce7c96647d550134575b.mp3';
    },
    0xbef9: (r, F, E) => {
        r.exports = E.p + './package/1a5af91d3d79b17ce75b.mp3';
    },
    0x9c12: (r, F, E) => {
        r.exports = E.p + './package/232dc3550c9600ba219c.mp3';
    },
    0x71cc: (r, F, E) => {
        r.exports = E.p + './package/9132a20e76c3e3d5e5ed.mp3';
    }
}]);
