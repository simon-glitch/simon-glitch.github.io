
(( () => {
    var F, E, p = {
        0x4fda: (H, y, d) => {
            'use strict';
            d(0x11c87),
            d(0xe70),
            d(0x11ac),
            d(0xe961),
            d(0xc7b),
            d(0x29c0),
            d(0x748b),
            d(0xdc9),
            d(0xbd95),
            d(0x172d2);
        }
        ,
        0x11c87: (H, y, d) => {
            'use strict';
            d.d(y, {
                'iu': () => Q,
                'r1': () => P
            }),
            (d(0x13294),
            d(0x172d2));
            function P(B, M, X) {
                return !B || !X && B.constructor === M ? B : 'number' == typeof M.BYTES_PER_ELEMENT ? new M(B) : Array.prototype.slice.call(B);
            }
            function Q(B) {
                return ArrayBuffer.isView(B) && !(B instanceof DataView);
            }
        }
        ,
        0x7530: (H, y, d) => {
            'use strict';
            var P = '\x5c[\x5c]\x5c.:\x5c/'
              , Q = new RegExp('[' + P + ']','g')
              , B = '[^' + P + ']'
              , M = '[^' + P.replace('\x5c.', '') + ']'
              , X = new RegExp('^' + /((?:WC+[\/:])*)/.source.replace('WC', B) + /(WCOD+)?/.source.replace('WCOD', M) + /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace('WC', B) + /\.(WC+)(?:\[(.+)\])?/.source.replace('WC', B) + '$')
              , m = ['material', 'materials', 'bones', 'map']
              , w = (function() {
                function N(h, U, T) {
                    var V = T || C.parseTrackName(U);
                    this._targetGroup = h,
                    this._bindings = h.subscribe_(U, V);
                }
                var Z = N.prototype;
                return Z.getValue = function(h, U) {
                    this.bind();
                    var T = this._targetGroup.nCachedObjects_
                      , V = this._bindings[T];
                    void 0x0 !== V && V.getValue(h, U);
                }
                ,
                Z.setValue = function(h, U) {
                    for (var T = this._bindings, V = this._targetGroup.nCachedObjects_, G = T.length; V !== G; ++V)
                        T[V].setValue(h, U);
                }
                ,
                Z.bind = function() {
                    for (var h = this._bindings, U = this._targetGroup.nCachedObjects_, T = h.length; U !== T; ++U)
                        h[U].bind();
                }
                ,
                Z.unbind = function() {
                    for (var h = this._bindings, U = this._targetGroup.nCachedObjects_, T = h.length; U !== T; ++U)
                        h[U].unbind();
                }
                ,
                N;
            }())
              , C = (function() {
                function N(h, U, T) {
                    this.path = U,
                    this.parsedPath = T || N.parseTrackName(U),
                    this.node = N.findNode(h, this.parsedPath.nodeName),
                    this.rootNode = h,
                    this.getValue = this._getValue_unbound,
                    this.setValue = this._setValue_unbound;
                }
                N.create = function(h, U, T) {
                    return h && h.isAnimationObjectGroup ? new N.Composite(h,U,T) : new N(h,U,T);
                }
                ,
                N.sanitizeNodeName = function(h) {
                    return h.replace(/\s/g, '_').replace(Q, '');
                }
                ,
                N.parseTrackName = function(h) {
                    var U = X.exec(h);
                    if (null === U)
                        throw new Error('PropertyBinding:\x20Cannot\x20parse\x20trackName:\x20' + h);
                    var T = {
                        'nodeName': U[0x2],
                        'objectName': U[0x3],
                        'objectIndex': U[0x4],
                        'propertyName': U[0x5],
                        'propertyIndex': U[0x6]
                    }
                      , V = T.nodeName && T.nodeName.lastIndexOf('.');
                    if (void 0x0 !== V && -0x1 !== V) {
                        var G = T.nodeName.substring(V + 0x1);
                        -0x1 !== m.indexOf(G) && (T.nodeName = T.nodeName.substring(0x0, V),
                        T.objectName = G);
                    }
                    if (null === T.propertyName || 0x0 === T.propertyName.length)
                        throw new Error('PropertyBinding:\x20can\x20not\x20parse\x20propertyName\x20from\x20trackName:\x20' + h);
                    return T;
                }
                ,
                N.findNode = function(h, U) {
                    if (void 0x0 === U || '' === U || '.' === U || -0x1 === U || U === h.name || U === h.uuid)
                        return h;
                    if (h.skeleton) {
                        var T = h.skeleton.getBoneByName(U);
                        if (void 0x0 !== T)
                            return T;
                    }
                    if (h.children) {
                        var V = function G(k) {
                            for (var W = 0x0; W < k.length; W++) {
                                var x = k[W];
                                if (x.name === U || x.uuid === U)
                                    return x;
                                var I = G(x.children);
                                if (I)
                                    return I;
                            }
                            return null;
                        }(h.children);
                        if (V)
                            return V;
                    }
                    return null;
                }
                ;
                var Z = N.prototype;
                return Z._getValue_unavailable = function() {}
                ,
                Z._setValue_unavailable = function() {}
                ,
                Z._getValue_direct = function(h, U) {
                    h[U] = this.targetObject[this.propertyName];
                }
                ,
                Z._getValue_array = function(h, U) {
                    for (var T = this.resolvedProperty, V = 0x0, G = T.length; V !== G; ++V)
                        h[U++] = T[V];
                }
                ,
                Z._getValue_arrayElement = function(h, U) {
                    h[U] = this.resolvedProperty[this.propertyIndex];
                }
                ,
                Z._getValue_toArray = function(h, U) {
                    this.resolvedProperty.toArray(h, U);
                }
                ,
                Z._setValue_direct = function(h, U) {
                    this.targetObject[this.propertyName] = h[U];
                }
                ,
                Z._setValue_direct_setNeedsUpdate = function(h, U) {
                    this.targetObject[this.propertyName] = h[U],
                    this.targetObject.needsUpdate = !0x0;
                }
                ,
                Z._setValue_direct_setMatrixWorldNeedsUpdate = function(h, U) {
                    this.targetObject[this.propertyName] = h[U],
                    this.targetObject.matrixWorldNeedsUpdate = !0x0;
                }
                ,
                Z._setValue_array = function(h, U) {
                    for (var T = this.resolvedProperty, V = 0x0, G = T.length; V !== G; ++V)
                        T[V] = h[U++];
                }
                ,
                Z._setValue_array_setNeedsUpdate = function(h, U) {
                    for (var T = this.resolvedProperty, V = 0x0, G = T.length; V !== G; ++V)
                        T[V] = h[U++];
                    this.targetObject.needsUpdate = !0x0;
                }
                ,
                Z._setValue_array_setMatrixWorldNeedsUpdate = function(h, U) {
                    for (var T = this.resolvedProperty, V = 0x0, G = T.length; V !== G; ++V)
                        T[V] = h[U++];
                    this.targetObject.matrixWorldNeedsUpdate = !0x0;
                }
                ,
                Z._setValue_arrayElement = function(h, U) {
                    this.resolvedProperty[this.propertyIndex] = h[U];
                }
                ,
                Z._setValue_arrayElement_setNeedsUpdate = function(h, U) {
                    this.resolvedProperty[this.propertyIndex] = h[U],
                    this.targetObject.needsUpdate = !0x0;
                }
                ,
                Z._setValue_arrayElement_setMatrixWorldNeedsUpdate = function(h, U) {
                    this.resolvedProperty[this.propertyIndex] = h[U],
                    this.targetObject.matrixWorldNeedsUpdate = !0x0;
                }
                ,
                Z._setValue_fromArray = function(h, U) {
                    this.resolvedProperty.fromArray(h, U);
                }
                ,
                Z._setValue_fromArray_setNeedsUpdate = function(h, U) {
                    this.resolvedProperty.fromArray(h, U),
                    this.targetObject.needsUpdate = !0x0;
                }
                ,
                Z._setValue_fromArray_setMatrixWorldNeedsUpdate = function(h, U) {
                    this.resolvedProperty.fromArray(h, U),
                    this.targetObject.matrixWorldNeedsUpdate = !0x0;
                }
                ,
                Z._getValue_unbound = function(h, U) {
                    this.bind(),
                    this.getValue(h, U);
                }
                ,
                Z._setValue_unbound = function(h, U) {
                    this.bind(),
                    this.setValue(h, U);
                }
                ,
                Z.bind = function() {
                    var h = this.node
                      , U = this.parsedPath
                      , T = U.objectName
                      , V = U.propertyName
                      , G = U.propertyIndex;
                    if (h || (h = N.findNode(this.rootNode, U.nodeName),
                    this.node = h),
                    this.getValue = this._getValue_unavailable,
                    this.setValue = this._setValue_unavailable,
                    h) {
                        if (T) {
                            var k = U.objectIndex;
                            switch (T) {
                            case 'materials':
                                if (!h.material)
                                    return void console.error('THREE.PropertyBinding:\x20Can\x20not\x20bind\x20to\x20material\x20as\x20node\x20does\x20not\x20have\x20a\x20material.', this);
                                if (!h.material.materials)
                                    return void console.error('THREE.PropertyBinding:\x20Can\x20not\x20bind\x20to\x20material.materials\x20as\x20node.material\x20does\x20not\x20have\x20a\x20materials\x20array.', this);
                                h = h.material.materials;
                                break;
                            case 'bones':
                                if (!h.skeleton)
                                    return void console.error('THREE.PropertyBinding:\x20Can\x20not\x20bind\x20to\x20bones\x20as\x20node\x20does\x20not\x20have\x20a\x20skeleton.', this);
                                h = h.skeleton.bones;
                                for (var W = 0x0; W < h.length; W++)
                                    if (h[W].name === k) {
                                        k = W;
                                        break;
                                    }
                                break;
                            case 'map':
                                if ('map'in h) {
                                    h = h.map;
                                    break;
                                }
                                if (!h.material)
                                    return void console.error('THREE.PropertyBinding:\x20Can\x20not\x20bind\x20to\x20material\x20as\x20node\x20does\x20not\x20have\x20a\x20material.', this);
                                if (!h.material.map)
                                    return void console.error('THREE.PropertyBinding:\x20Can\x20not\x20bind\x20to\x20material.map\x20as\x20node.material\x20does\x20not\x20have\x20a\x20map.', this);
                                h = h.material.map;
                                break;
                            default:
                                if (void 0x0 === h[T])
                                    return void console.error('THREE.PropertyBinding:\x20Can\x20not\x20bind\x20to\x20objectName\x20of\x20node\x20undefined.', this);
                                h = h[T];
                            }
                            if (void 0x0 !== k) {
                                if (void 0x0 === h[k])
                                    return void console.error('THREE.PropertyBinding:\x20Trying\x20to\x20bind\x20to\x20objectIndex\x20of\x20objectName,\x20but\x20is\x20undefined.', this, h);
                                h = h[k];
                            }
                        }
                        var x = h[V];
                        if (void 0x0 !== x) {
                            var I = this.Versioning.None;
                            this.targetObject = h,
                            void 0x0 !== h.needsUpdate ? I = this.Versioning.NeedsUpdate : void 0x0 !== h.matrixWorldNeedsUpdate && (I = this.Versioning.MatrixWorldNeedsUpdate);
                            var g = this.BindingType.Direct;
                            if (void 0x0 !== G) {
                                if ('morphTargetInfluences' === V) {
                                    if (!h.geometry)
                                        return void console.error('THREE.PropertyBinding:\x20Can\x20not\x20bind\x20to\x20morphTargetInfluences\x20because\x20node\x20does\x20not\x20have\x20a\x20geometry.', this);
                                    if (!h.geometry.morphAttributes)
                                        return void console.error('THREE.PropertyBinding:\x20Can\x20not\x20bind\x20to\x20morphTargetInfluences\x20because\x20node\x20does\x20not\x20have\x20a\x20geometry.morphAttributes.', this);
                                    void 0x0 !== h.morphTargetDictionary[G] && (G = h.morphTargetDictionary[G]);
                                }
                                g = this.BindingType.ArrayElement,
                                this.resolvedProperty = x,
                                this.propertyIndex = G;
                            } else
                                void 0x0 !== x.fromArray && void 0x0 !== x.toArray ? (g = this.BindingType.HasFromToArray,
                                this.resolvedProperty = x) : Array.isArray(x) ? (g = this.BindingType.EntireArray,
                                this.resolvedProperty = x) : this.propertyName = V;
                            this.getValue = this.GetterByBindingType[g],
                            this.setValue = this.SetterByBindingTypeAndVersioning[g][I];
                        } else {
                            var L = U.nodeName;
                            console.error('THREE.PropertyBinding:\x20Trying\x20to\x20update\x20property\x20for\x20track:\x20' + L + '.' + V + '\x20but\x20it\x20wasn\x27t\x20found.', h);
                        }
                    } else
                        console.warn('THREE.PropertyBinding:\x20No\x20target\x20node\x20found\x20for\x20track:\x20' + this.path + '.');
                }
                ,
                Z.unbind = function() {
                    this.node = null,
                    this.getValue = this._getValue_unbound,
                    this.setValue = this._setValue_unbound;
                }
                ,
                N;
            }());
            C.Composite = w,
            C.prototype.BindingType = {
                'Direct': 0x0,
                'EntireArray': 0x1,
                'ArrayElement': 0x2,
                'HasFromToArray': 0x3
            },
            C.prototype.Versioning = {
                'None': 0x0,
                'NeedsUpdate': 0x1,
                'MatrixWorldNeedsUpdate': 0x2
            },
            C.prototype.GetterByBindingType = [C.prototype._getValue_direct, C.prototype._getValue_array, C.prototype._getValue_arrayElement, C.prototype._getValue_toArray],
            C.prototype.SetterByBindingTypeAndVersioning = [[C.prototype._setValue_direct, C.prototype._setValue_direct_setNeedsUpdate, C.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [C.prototype._setValue_array, C.prototype._setValue_array_setNeedsUpdate, C.prototype._setValue_array_setMatrixWorldNeedsUpdate], [C.prototype._setValue_arrayElement, C.prototype._setValue_arrayElement_setNeedsUpdate, C.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [C.prototype._setValue_fromArray, C.prototype._setValue_fromArray_setNeedsUpdate, C.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];
        }
        ,
        0x11ac: (H, y, d) => {
            'use strict';
            var P = d(0x12e4b)
              , Q = d(0x172d2)
              , B = function(M) {
                function X() {
                    return M.apply(this, arguments) || this;
                }
                return (0x0,
                P.A)(X, M),
                X;
            }(d(0xe70).U);
            B.prototype.ValueTypeName = 'bool',
            B.prototype.ValueBufferType = Array,
            B.prototype.DefaultInterpolation = Q.ljd,
            B.prototype.InterpolantFactoryMethodLinear = void 0x0,
            B.prototype.InterpolantFactoryMethodSmooth = void 0x0;
        }
        ,
        0xe961: (H, y, d) => {
            'use strict';
            var P = d(0x12e4b);
            (function(Q) {
                function B() {
                    return Q.apply(this, arguments) || this;
                }
                return (0x0,
                P.A)(B, Q),
                B;
            }(d(0xe70).U).prototype.ValueTypeName = 'color');
        }
        ,
        0xc7b: (H, y, d) => {
            'use strict';
            var P = d(0x12e4b);
            (function(Q) {
                function B() {
                    return Q.apply(this, arguments) || this;
                }
                return (0x0,
                P.A)(B, Q),
                B;
            }(d(0xe70).U).prototype.ValueTypeName = 'number');
        }
        ,
        0x29c0: (H, y, d) => {
            'use strict';
            var P = d(0x12e4b)
              , Q = d(0x172d2)
              , B = d(0xe70)
              , M = d(0x131b5)
              , X = function(m) {
                function w() {
                    return m.apply(this, arguments) || this;
                }
                return (0x0,
                P.A)(w, m),
                w.prototype.InterpolantFactoryMethodLinear = function(l) {
                    return new M.G(this.times,this.values,this.getValueSize(),l);
                }
                ,
                w;
            }(B.U);
            X.prototype.ValueTypeName = 'quaternion',
            X.prototype.DefaultInterpolation = Q.PJ3,
            X.prototype.InterpolantFactoryMethodSmooth = void 0x0;
        }
        ,
        0x748b: (H, y, d) => {
            'use strict';
            var P = d(0x12e4b)
              , Q = d(0x172d2)
              , B = function(M) {
                function X() {
                    return M.apply(this, arguments) || this;
                }
                return (0x0,
                P.A)(X, M),
                X;
            }(d(0xe70).U);
            B.prototype.ValueTypeName = 'string',
            B.prototype.ValueBufferType = Array,
            B.prototype.DefaultInterpolation = Q.ljd,
            B.prototype.InterpolantFactoryMethodLinear = void 0x0,
            B.prototype.InterpolantFactoryMethodSmooth = void 0x0;
        }
        ,
        0xdc9: (H, y, d) => {
            'use strict';
            var P = d(0x12e4b);
            (function(Q) {
                function B() {
                    return Q.apply(this, arguments) || this;
                }
                return (0x0,
                P.A)(B, Q),
                B;
            }(d(0xe70).U).prototype.ValueTypeName = 'vector');
        }
        ,
        0x172d2: (r0, r1, r2) => {
            'use strict';
            r2.d(r1, {
                '$EB': () => rE,
                '$Yl': () => rs,
                '$_I': () => Fr,
                '$ei': () => rX,
                'BXX': () => Fs,
                'B_h': () => Fc,
                'CMB': () => Fw,
                'CVz': () => Fa,
                'CWW': () => E4,
                'Cfg': () => F7,
                'DAe': () => EF,
                'EQC': () => E7,
                'EZo': () => rR,
                'EdD': () => ry,
                'FFZ': () => Es,
                'FV': () => rJ,
                'FXf': () => rQ,
                'Fn': () => FD,
                'GJx': () => F2,
                'GWd': () => FX,
                'Gwm': () => rL,
                'H23': () => Fu,
                'HO_': () => E3,
                'HXV': () => FW,
                'IE4': () => Fi,
                'Jnc': () => r6,
                'K52': () => rc,
                'KDk': () => Fg,
                'KLL': () => Em,
                'KRh': () => rK,
                'Kef': () => E1,
                'Kwu': () => rH,
                'Kzv': () => Fm,
                'LiQ': () => rC,
                'Mjd': () => rj,
                'N5j': () => ER,
                'NTi': () => rS,
                'Nt7': () => ro,
                'Nz6': () => FT,
                'OUM': () => FF,
                'Om': () => F1,
                'OuU': () => rZ,
                'PJ3': () => E6,
                'QP0': () => r7,
                'Qrf': () => FK,
                'RQf': () => Fy,
                'Riy': () => FI,
                'Rkk': () => ES,
                'RrE': () => rV,
                'RyA': () => r9,
                'S$4': () => Fb,
                'S2Q': () => Ep,
                'TdN': () => Ex,
                'TiK': () => EU,
                'TkQ': () => Fo,
                'U3G': () => rg,
                'UTZ': () => rn,
                'Ua6': () => EW,
                'V3x': () => FB,
                'V5c': () => EB,
                'VT0': () => FN,
                'VVr': () => EC,
                'Vb5': () => r5,
                'VxR': () => EX,
                'W9U': () => E0,
                'WNZ': () => r4,
                'Wdf': () => Ek,
                'Wew': () => FP,
                'Wk7': () => r8,
                'XG_': () => E2,
                'XIg': () => rp,
                'XrR': () => rY,
                'Yuy': () => FR,
                'ZQM': () => FZ,
                'Zr2': () => EQ,
                '_QJ': () => FA,
                'a5J': () => Fz,
                'aEY': () => ri,
                'agE': () => EG,
                'amv': () => EZ,
                'bC7': () => FJ,
                'bCz': () => rd,
                'bI3': () => EH,
                'bkx': () => FH,
                'brA': () => ra,
                'bw0': () => rq,
                'c90': () => FU,
                'cHt': () => FS,
                'caT': () => rf,
                'czI': () => Fq,
                'dcC': () => FC,
                'dhZ': () => Er,
                'e0p': () => rG,
                'eHc': () => rW,
                'eoi': () => Ei,
                'er$': () => EP,
                'f4X': () => rl,
                'fBL': () => Fp,
                'g7M': () => rv,
                'gJ2': () => FQ,
                'gO9': () => rP,
                'gWB': () => EV,
                'ghU': () => F3,
                'h2z': () => E9,
                'hB5': () => rr,
                'hdd': () => rh,
                'hgQ': () => rT,
                'hsX': () => rF,
                'hxR': () => F5,
                'hy7': () => rb,
                'i7u': () => Ea,
                'ie2': () => rN,
                'ix0': () => Fd,
                'jR7': () => FV,
                'jf0': () => Ed,
                'jzd': () => ET,
                'k6Q': () => FG,
                'k6q': () => F8,
                'kO0': () => Eo,
                'kRr': () => F9,
                'kTW': () => F4,
                'kTp': () => Fk,
                'kyO': () => rA,
                'lGu': () => rx,
                'ljd': () => E5,
                'lyL': () => FO,
                'nNL': () => rO,
                'nST': () => rB,
                'ojh': () => rm,
                'ojs': () => Fn,
                'ov9': () => rk,
                'pBf': () => Fx,
                'pHI': () => F6,
                'paN': () => Fh,
                'psI': () => FY,
                'qIQ': () => EM,
                'qa3': () => FL,
                'qad': () => rw,
                'rQf': () => E8,
                'rSH': () => Ff,
                'sKt': () => EN,
                'sPf': () => r3,
                'tJf': () => FE,
                'tgE': () => EE,
                'uB5': () => Fj,
                'uV5': () => F0,
                'vim': () => Eh,
                'vyJ': () => Ey,
                'wfO': () => ru,
                'wn6': () => rU,
                'wqq': () => El,
                'wrO': () => FM,
                'xFO': () => rD,
                'xSv': () => rI,
                'y3Z': () => Fv,
                'y_p': () => rz,
                'z5': () => Ew,
                'zdS': () => Fl,
                'znC': () => rM
            });
            var r3 = '159'
              , r4 = 0x0
              , r5 = 0x1
              , r6 = 0x2
              , r7 = 0x1
              , r8 = 0x2
              , r9 = 0x3
              , rr = 0x0
              , rF = 0x1
              , rE = 0x2
              , rp = 0x0
              , rS = 0x1
              , rR = 0x2
              , rH = 0x3
              , ry = 0x4
              , rd = 0x5
              , rP = 0x64
              , rQ = 0x65
              , rB = 0x66
              , rM = 0x67
              , rX = 0x68
              , rm = 0xc8
              , rw = 0xc9
              , rl = 0xca
              , rC = 0xcb
              , rN = 0xcc
              , rZ = 0xcd
              , rh = 0xce
              , ro = 0xcf
              , rU = 0xd0
              , ri = 0xd1
              , rT = 0xd2
              , rV = 0xd3
              , rs = 0xd4
              , rG = 0xd5
              , rk = 0xd6
              , rW = 0x0
              , rx = 0x1
              , ra = 0x2
              , rI = 0x3
              , rg = 0x4
              , rL = 0x5
              , rc = 0x6
              , rq = 0x7
              , rf = 0x0
              , rK = 0x1
              , rY = 0x2
              , rz = 0x0
              , rA = 0x1
              , rj = 0x2
              , rO = 0x3
              , rJ = 0x4
              , rv = 0x5
              , rn = 0x12c
              , rb = 0x12d
              , rD = 0x12e
              , ru = 0x12f
              , F0 = 0x130
              , F1 = 0x132
              , F2 = 0x3e8
              , F3 = 0x3e9
              , F4 = 0x3ea
              , F5 = 0x3eb
              , F6 = 0x3ec
              , F7 = 0x3ed
              , F8 = 0x3ee
              , F9 = 0x3ef
              , Fr = 0x3f0
              , FF = 0x3f1
              , FE = 0x3f2
              , Fp = 0x3f3
              , FS = 0x3f4
              , FR = 0x3f5
              , FH = 0x3f6
              , Fy = 0x3f7
              , Fd = 0x3f8
              , FP = 0x3f9
              , FQ = 0x3fa
              , FB = 0x3fc
              , FM = 0x3fd
              , FX = 0x3ff
              , Fm = 0x400
              , Fw = 0x401
              , Fl = 0x402
              , FC = 0x403
              , FN = 0x404
              , FZ = 0x405
              , Fh = 0x406
              , Fo = 0x407
              , FU = 0x409
              , Fi = 0x83f0
              , FT = 0x83f1
              , FV = 0x83f2
              , Fs = 0x83f3
              , FG = 0x8c00
              , Fk = 0x8c01
              , FW = 0x8c02
              , Fx = 0x8c03
              , Fa = 0x8d64
              , FI = 0x9274
              , Fg = 0x9278
              , FL = 0x93b0
              , Fc = 0x93b1
              , Fq = 0x93b2
              , Ff = 0x93b3
              , FK = 0x93b4
              , FY = 0x93b5
              , Fz = 0x93b6
              , FA = 0x93b7
              , Fj = 0x93b8
              , FO = 0x93b9
              , FJ = 0x93ba
              , Fv = 0x93bb
              , Fn = 0x93bc
              , Fb = 0x93bd
              , FD = 0x8e8c
              , Fu = 0x8e8e
              , E0 = 0x8e8f
              , E1 = 0x8dbb
              , E2 = 0x8dbc
              , E3 = 0x8dbd
              , E4 = 0x8dbe
              , E5 = 0x8fc
              , E6 = 0x8fd
              , E7 = 0x8fe
              , E8 = 0x960
              , E9 = 0x961
              , Er = 0x962
              , EF = 0x9c5
              , EE = 0xbb8
              , Ep = 0xbb9
              , ES = 0xc80
              , ER = 0xc81
              , EH = 0x0
              , Ey = 0x1
              , Ed = ''
              , EP = 'srgb'
              , EQ = 'srgb-linear'
              , EB = 'display-p3'
              , EM = 'display-p3-linear'
              , EX = 'linear'
              , Em = 'srgb'
              , Ew = 'rec709'
              , El = 'p3'
              , EC = 0x1e00
              , EN = 0x207
              , EZ = 0x200
              , Eh = 0x201
              , Eo = 0x202
              , EU = 0x203
              , Ei = 0x204
              , ET = 0x205
              , EV = 0x206
              , Es = 0x207
              , EG = 0x88e4
              , Ek = '300\x20es'
              , EW = 0x40b
              , Ex = 0x7d0
              , Ea = 0x7d1;
        }
        ,
        0x17dfd: (H, y, P) => {
            'use strict';
            P.d(y, {
                'A$': () => U,
                'MW': () => T,
                'TH': () => Z,
                'qt': () => V
            });
            var Q = P(0x12e4b)
              , B = P(0x14124)
              , M = P(0x1008e)
              , X = P(0x1264d)
              , m = P(0xbd95)
              , w = P(0x172d2)
              , C = (P(0x4e82),
            new M.P())
              , N = new X.I()
              , Z = (function() {
                function G(W, x, I) {
                    if (void 0x0 === I && (I = !0x1),
                    Array.isArray(W))
                        throw new TypeError('THREE.BufferAttribute:\x20array\x20should\x20be\x20a\x20Typed\x20Array.');
                    this.isBufferAttribute = !0x0,
                    this.name = '',
                    this.array = W,
                    this.itemSize = x,
                    this.count = void 0x0 !== W ? W.length / x : 0x0,
                    this.normalized = I,
                    this.usage = w.agE,
                    this._updateRange = {
                        'offset': 0x0,
                        'count': -0x1
                    },
                    this.updateRanges = [],
                    this.gpuType = w.RQf,
                    this.version = 0x0;
                }
                var k = G.prototype;
                return k.onUploadCallback = function() {}
                ,
                k.setUsage = function(W) {
                    return this.usage = W,
                    this;
                }
                ,
                k.addUpdateRange = function(W, x) {
                    this.updateRanges.push({
                        'start': W,
                        'count': x
                    });
                }
                ,
                k.clearUpdateRanges = function() {
                    this.updateRanges.length = 0x0;
                }
                ,
                k.copy = function(W) {
                    return this.name = W.name,
                    this.array = new W.array.constructor(W.array),
                    this.itemSize = W.itemSize,
                    this.count = W.count,
                    this.normalized = W.normalized,
                    this.usage = W.usage,
                    this.gpuType = W.gpuType,
                    this;
                }
                ,
                k.copyAt = function(W, x, I) {
                    W *= this.itemSize,
                    I *= x.itemSize;
                    for (var g = 0x0, L = this.itemSize; g < L; g++)
                        this.array[W + g] = x.array[I + g];
                    return this;
                }
                ,
                k.copyArray = function(W) {
                    return this.array.set(W),
                    this;
                }
                ,
                k.applyMatrix3 = function(W) {
                    if (0x2 === this.itemSize) {
                        for (var x = 0x0, I = this.count; x < I; x++)
                            N.fromBufferAttribute(this, x),
                            N.applyMatrix3(W),
                            this.setXY(x, N.x, N.y);
                    } else {
                        if (0x3 === this.itemSize) {
                            for (var g = 0x0, L = this.count; g < L; g++)
                                C.fromBufferAttribute(this, g),
                                C.applyMatrix3(W),
                                this.setXYZ(g, C.x, C.y, C.z);
                        }
                    }
                    return this;
                }
                ,
                k.applyMatrix4 = function(W) {
                    for (var x = 0x0, I = this.count; x < I; x++)
                        C.fromBufferAttribute(this, x),
                        C.applyMatrix4(W),
                        this.setXYZ(x, C.x, C.y, C.z);
                    return this;
                }
                ,
                k.applyNormalMatrix = function(W) {
                    for (var x = 0x0, I = this.count; x < I; x++)
                        C.fromBufferAttribute(this, x),
                        C.applyNormalMatrix(W),
                        this.setXYZ(x, C.x, C.y, C.z);
                    return this;
                }
                ,
                k.transformDirection = function(W) {
                    for (var x = 0x0, I = this.count; x < I; x++)
                        C.fromBufferAttribute(this, x),
                        C.transformDirection(W),
                        this.setXYZ(x, C.x, C.y, C.z);
                    return this;
                }
                ,
                k.set = function(W, x) {
                    return void 0x0 === x && (x = 0x0),
                    this.array.set(W, x),
                    this;
                }
                ,
                k.getComponent = function(W, x) {
                    var I = this.array[W * this.itemSize + x];
                    return this.normalized && (I = (0x0,
                    m.NU)(I, this.array)),
                    I;
                }
                ,
                k.setComponent = function(W, x, I) {
                    return this.normalized && (I = (0x0,
                    m.S8)(I, this.array)),
                    this.array[W * this.itemSize + x] = I,
                    this;
                }
                ,
                k.getX = function(W) {
                    var x = this.array[W * this.itemSize];
                    return this.normalized && (x = (0x0,
                    m.NU)(x, this.array)),
                    x;
                }
                ,
                k.setX = function(W, x) {
                    return this.normalized && (x = (0x0,
                    m.S8)(x, this.array)),
                    this.array[W * this.itemSize] = x,
                    this;
                }
                ,
                k.getY = function(W) {
                    var x = this.array[W * this.itemSize + 0x1];
                    return this.normalized && (x = (0x0,
                    m.NU)(x, this.array)),
                    x;
                }
                ,
                k.setY = function(W, x) {
                    return this.normalized && (x = (0x0,
                    m.S8)(x, this.array)),
                    this.array[W * this.itemSize + 0x1] = x,
                    this;
                }
                ,
                k.getZ = function(W) {
                    var x = this.array[W * this.itemSize + 0x2];
                    return this.normalized && (x = (0x0,
                    m.NU)(x, this.array)),
                    x;
                }
                ,
                k.setZ = function(W, x) {
                    return this.normalized && (x = (0x0,
                    m.S8)(x, this.array)),
                    this.array[W * this.itemSize + 0x2] = x,
                    this;
                }
                ,
                k.getW = function(W) {
                    var x = this.array[W * this.itemSize + 0x3];
                    return this.normalized && (x = (0x0,
                    m.NU)(x, this.array)),
                    x;
                }
                ,
                k.setW = function(W, x) {
                    return this.normalized && (x = (0x0,
                    m.S8)(x, this.array)),
                    this.array[W * this.itemSize + 0x3] = x,
                    this;
                }
                ,
                k.setXY = function(W, x, I) {
                    return W *= this.itemSize,
                    this.normalized && (x = (0x0,
                    m.S8)(x, this.array),
                    I = (0x0,
                    m.S8)(I, this.array)),
                    this.array[W + 0x0] = x,
                    this.array[W + 0x1] = I,
                    this;
                }
                ,
                k.setXYZ = function(W, x, I, g) {
                    return W *= this.itemSize,
                    this.normalized && (x = (0x0,
                    m.S8)(x, this.array),
                    I = (0x0,
                    m.S8)(I, this.array),
                    g = (0x0,
                    m.S8)(g, this.array)),
                    this.array[W + 0x0] = x,
                    this.array[W + 0x1] = I,
                    this.array[W + 0x2] = g,
                    this;
                }
                ,
                k.setXYZW = function(W, x, I, g, L) {
                    return W *= this.itemSize,
                    this.normalized && (x = (0x0,
                    m.S8)(x, this.array),
                    I = (0x0,
                    m.S8)(I, this.array),
                    g = (0x0,
                    m.S8)(g, this.array),
                    L = (0x0,
                    m.S8)(L, this.array)),
                    this.array[W + 0x0] = x,
                    this.array[W + 0x1] = I,
                    this.array[W + 0x2] = g,
                    this.array[W + 0x3] = L,
                    this;
                }
                ,
                k.onUpload = function(W) {
                    return this.onUploadCallback = W,
                    this;
                }
                ,
                k.clone = function() {
                    return new this.constructor(this.array,this.itemSize).copy(this);
                }
                ,
                k.toJSON = function() {
                    var W = {
                        'itemSize': this.itemSize,
                        'type': this.array.constructor.name,
                        'array': Array.from(this.array),
                        'normalized': this.normalized
                    };
                    return '' !== this.name && (W.name = this.name),
                    this.usage !== w.agE && (W.usage = this.usage),
                    W;
                }
                ,
                (0x0,
                B.A)(G, [{
                    'key': 'needsUpdate',
                    'set': function(W) {
                        !0x0 === W && this.version++;
                    }
                }, {
                    'key': 'updateRange',
                    'get': function() {
                        return console.warn('THREE.BufferAttribute:\x20\x22updateRange\x22\x20is\x20deprecated\x20and\x20removed\x20in\x20r169.\x20Use\x20\x22addUpdateRange()\x22\x20instead.'),
                        this._updateRange;
                    }
                }]);
            }())
              , U = function(G) {
                function k(W, x, I) {
                    return G.call(this, new Uint16Array(W), x, I) || this;
                }
                return (0x0,
                Q.A)(k, G),
                k;
            }(Z)
              , T = function(G) {
                function k(W, x, I) {
                    return G.call(this, new Uint32Array(W), x, I) || this;
                }
                return (0x0,
                Q.A)(k, G),
                k;
            }(Z)
              , V = function(G) {
                function k(W, x, I) {
                    return G.call(this, new Float32Array(W), x, I) || this;
                }
                return (0x0,
                Q.A)(k, G),
                k;
            }(Z);
        }
        ,
        0x76e: (H, y, d) => {
            'use strict';
            d(0x17dfd);
        }
        ,
        0x8222: (H, y, d) => {
            'use strict';
            d(0xbd95),
            d(0x172d2);
        }
        ,
        0xd3e8: (H, y, d) => {
            'use strict';
            d(0x1008e),
            d(0x17dfd),
            d(0xbd95);
        }
        ,
        0x22e6: (H, y, d) => {
            'use strict';
            d(0x131a1),
            d(0x39e3),
            d(0xd666),
            d(0x16f21),
            d(0xf824),
            d(0x3450),
            d(0x16eca),
            d(0x3071),
            d(0xf151),
            d(0x13a3a),
            d(0xbccb),
            d(0x101aa),
            d(0xc538),
            d(0x12bd8),
            d(0xe96d),
            d(0x11397),
            d(0x9a9c),
            d(0x143d1),
            d(0x82fb),
            d(0x844c),
            d(0x99ea);
        }
        ,
        0x101aa: (H, y, d) => {
            'use strict';
            d.d(y, {
                'b': () => M
            });
            var P = d(0x12e4b)
              , Q = d(0x16835)
              , B = d(0x17dfd)
              , M = function(X) {
                function m(C, N, Z, U) {
                    var V;
                    void 0x0 === C && (C = 0x1),
                    void 0x0 === N && (N = 0x1),
                    void 0x0 === Z && (Z = 0x1),
                    void 0x0 === U && (U = 0x1),
                    (V = X.call(this) || this).type = 'PlaneGeometry',
                    V.parameters = {
                        'width': C,
                        'height': N,
                        'widthSegments': Z,
                        'heightSegments': U
                    };
                    for (var G = C / 0x2, k = N / 0x2, W = Math.floor(Z), I = Math.floor(U), L = W + 0x1, q = I + 0x1, K = C / W, Y = N / I, z = [], j = [], O = [], J = [], D = 0x0; D < q; D++)
                        for (var r0 = D * Y - k, r1 = 0x0; r1 < L; r1++) {
                            var r2 = r1 * K - G;
                            j.push(r2, -r0, 0x0),
                            O.push(0x0, 0x0, 0x1),
                            J.push(r1 / W),
                            J.push(0x1 - D / I);
                        }
                    for (var r3 = 0x0; r3 < I; r3++)
                        for (var r4 = 0x0; r4 < W; r4++) {
                            var r5 = r4 + L * r3
                              , r6 = r4 + L * (r3 + 0x1)
                              , r7 = r4 + 0x1 + L * (r3 + 0x1)
                              , r8 = r4 + 0x1 + L * r3;
                            z.push(r5, r6, r8),
                            z.push(r6, r7, r8);
                        }
                    return V.setIndex(z),
                    V.setAttribute('position', new B.qt(j,0x3)),
                    V.setAttribute('normal', new B.qt(O,0x3)),
                    V.setAttribute('uv', new B.qt(J,0x2)),
                    V;
                }
                return (0x0,
                P.A)(m, X),
                m.prototype.copy = function(w) {
                    return X.prototype.copy.call(this, w),
                    this.parameters = Object.assign({}, w.parameters),
                    this;
                }
                ,
                m.fromJSON = function(w) {
                    return new m(w.width,w.height,w.widthSegments,w.heightSegments);
                }
                ,
                m;
            }(Q.L);
        }
        ,
        0x1348d: (H, y, d) => {
            'use strict';
            d(0xb8f1);
        }
        ,
        0x1535f: (H, y, d) => {
            'use strict';
            d(0xb8f1),
            d(0x10c49),
            d(0x17743),
            d(0x16f53);
        }
        ,
        0xb8f1: (H, y, d) => {
            'use strict';
            d(0x16f53),
            d(0x169b1);
        }
        ,
        0x10c49: (H, y, d) => {
            'use strict';
            d(0x11ded),
            d(0x1264d),
            d(0x1008e),
            d(0xb3ef),
            d(0x6a24);
        }
        ,
        0x12c97: (H, y, d) => {
            'use strict';
            d(0xb8f1),
            d(0x178fb);
        }
        ,
        0x178fb: (H, y, d) => {
            'use strict';
            d(0x10c49),
            d(0x152d9),
            d(0x11ded),
            d(0x1264d),
            d(0x1008e),
            d(0xb3ef);
        }
        ,
        0x10c9e: (H, y, d) => {
            'use strict';
            d(0xb8f1),
            d(0x10c49),
            d(0xbd95),
            d(0x152d9),
            d(0x16f53);
        }
        ,
        0xd192: (H, y, d) => {
            'use strict';
        }
        ,
        0x16e3b: (H, y, d) => {
            'use strict';
            d(0xd192),
            d(0x1191);
        }
        ,
        0x14b92: (H, y, d) => {
            'use strict';
            d(0xd192),
            d(0x1191),
            d(0x1078a);
        }
        ,
        0x1191: (H, y, d) => {
            'use strict';
            var P = d(0x6235);
            (function() {
                function Q(M) {
                    this.manager = void 0x0 !== M ? M : P.h,
                    this.crossOrigin = 'anonymous',
                    this.withCredentials = !0x1,
                    this.path = '',
                    this.resourcePath = '',
                    this.requestHeader = {};
                }
                var B = Q.prototype;
                return B.load = function() {}
                ,
                B.loadAsync = function(M, X) {
                    var m = this;
                    return new Promise(function(w, l) {
                        m.load(M, w, X, l);
                    }
                    );
                }
                ,
                B.parse = function() {}
                ,
                B.setCrossOrigin = function(M) {
                    return this.crossOrigin = M,
                    this;
                }
                ,
                B.setWithCredentials = function(M) {
                    return this.withCredentials = M,
                    this;
                }
                ,
                B.setPath = function(M) {
                    return this.path = M,
                    this;
                }
                ,
                B.setResourcePath = function(M) {
                    return this.resourcePath = M,
                    this;
                }
                ,
                B.setRequestHeader = function(M) {
                    return this.requestHeader = M,
                    this;
                }
                ,
                Q;
            }().DEFAULT_MATERIAL_NAME = '__DEFAULT');
        }
        ,
        0x617: (H, y, d) => {
            'use strict';
            d(0x10849),
            d(0x169b1);
        }
        ,
        0x13eec: (H, y, d) => {
            'use strict';
            d(0x259),
            d(0xe9e8),
            d(0x5d74),
            d(0x7026),
            d(0x14916),
            d(0x72b1),
            d(0xf135),
            d(0x10c4e),
            d(0x14d0c),
            d(0x8ab),
            d(0x10b7d),
            d(0x1bfd),
            d(0x11833),
            d(0x14baa),
            d(0x2ef2),
            d(0x11396),
            d(0x617),
            d(0x10849);
        }
        ,
        0x72b1: (H, y, d) => {
            'use strict';
            d(0x1264d),
            d(0xf135),
            d(0x169b1),
            d(0xbd95);
        }
        ,
        0xf135: (H, y, d) => {
            'use strict';
            d(0x172d2),
            d(0x10849),
            d(0x1264d),
            d(0x169b1);
        }
        ,
        0x14916: (H, y, d) => {
            'use strict';
            d(0x10849),
            d(0x169b1);
        }
        ,
        0x147e3: (H, y, d) => {
            'use strict';
            d.d(y, {
                'O': () => N
            });
            var P = d(0x14124)
              , Q = d(0xd5e4)
              , B = d.n(Q)
              , M = d(0x13294)
              , X = d(0x11ded)
              , m = d(0xbd95)
              , w = new X.k()
              , C = new M.P()
              , N = (function() {
                function Z(U, T, V, G) {
                    void 0x0 === U && (U = 0x0),
                    void 0x0 === T && (T = 0x0),
                    void 0x0 === V && (V = 0x0),
                    void 0x0 === G && (G = Z.DEFAULT_ORDER),
                    this.isEuler = !0x0,
                    this._x = U,
                    this._y = T,
                    this._z = V,
                    this._order = G;
                }
                var h = Z.prototype;
                return h.set = function(U, T, V, G) {
                    return void 0x0 === G && (G = this._order),
                    this._x = U,
                    this._y = T,
                    this._z = V,
                    this._order = G,
                    this._onChangeCallback(),
                    this;
                }
                ,
                h.clone = function() {
                    return new this.constructor(this._x,this._y,this._z,this._order);
                }
                ,
                h.copy = function(U) {
                    return this._x = U._x,
                    this._y = U._y,
                    this._z = U._z,
                    this._order = U._order,
                    this._onChangeCallback(),
                    this;
                }
                ,
                h.setFromRotationMatrix = function(U, T, V) {
                    void 0x0 === T && (T = this._order),
                    void 0x0 === V && (V = !0x0);
                    var G = U.elements
                      , k = G[0x0]
                      , W = G[0x4]
                      , x = G[0x8]
                      , I = G[0x1]
                      , g = G[0x5]
                      , L = G[0x9]
                      , q = G[0x2]
                      , f = G[0x6]
                      , K = G[0xa];
                    switch (T) {
                    case 'XYZ':
                        this._y = Math.asin((0x0,
                        m.qE)(x, -0x1, 0x1)),
                        Math.abs(x) < 0.9999999 ? (this._x = Math.atan2(-L, K),
                        this._z = Math.atan2(-W, k)) : (this._x = Math.atan2(f, g),
                        this._z = 0x0);
                        break;
                    case 'YXZ':
                        this._x = Math.asin(-(0x0,
                        m.qE)(L, -0x1, 0x1)),
                        Math.abs(L) < 0.9999999 ? (this._y = Math.atan2(x, K),
                        this._z = Math.atan2(I, g)) : (this._y = Math.atan2(-q, k),
                        this._z = 0x0);
                        break;
                    case 'ZXY':
                        this._x = Math.asin((0x0,
                        m.qE)(f, -0x1, 0x1)),
                        Math.abs(f) < 0.9999999 ? (this._y = Math.atan2(-q, K),
                        this._z = Math.atan2(-W, g)) : (this._y = 0x0,
                        this._z = Math.atan2(I, k));
                        break;
                    case 'ZYX':
                        this._y = Math.asin(-(0x0,
                        m.qE)(q, -0x1, 0x1)),
                        Math.abs(q) < 0.9999999 ? (this._x = Math.atan2(f, K),
                        this._z = Math.atan2(I, k)) : (this._x = 0x0,
                        this._z = Math.atan2(-W, g));
                        break;
                    case 'YZX':
                        this._z = Math.asin((0x0,
                        m.qE)(I, -0x1, 0x1)),
                        Math.abs(I) < 0.9999999 ? (this._x = Math.atan2(-L, g),
                        this._y = Math.atan2(-q, k)) : (this._x = 0x0,
                        this._y = Math.atan2(x, K));
                        break;
                    case 'XZY':
                        this._z = Math.asin(-(0x0,
                        m.qE)(W, -0x1, 0x1)),
                        Math.abs(W) < 0.9999999 ? (this._x = Math.atan2(f, g),
                        this._y = Math.atan2(x, k)) : (this._x = Math.atan2(-L, K),
                        this._y = 0x0);
                        break;
                    default:
                        console.warn('THREE.Euler:\x20.setFromRotationMatrix()\x20encountered\x20an\x20unknown\x20order:\x20' + T);
                    }
                    return this._order = T,
                    !0x0 === V && this._onChangeCallback(),
                    this;
                }
                ,
                h.setFromQuaternion = function(U, T, V) {
                    return w.makeRotationFromQuaternion(U),
                    this.setFromRotationMatrix(w, T, V);
                }
                ,
                h.setFromVector3 = function(U, T) {
                    return void 0x0 === T && (T = this._order),
                    this.set(U.x, U.y, U.z, T);
                }
                ,
                h.reorder = function(U) {
                    return C.setFromEuler(this),
                    this.setFromQuaternion(C, U);
                }
                ,
                h.equals = function(U) {
                    return U._x === this._x && U._y === this._y && U._z === this._z && U._order === this._order;
                }
                ,
                h.fromArray = function(U) {
                    return this._x = U[0x0],
                    this._y = U[0x1],
                    this._z = U[0x2],
                    void 0x0 !== U[0x3] && (this._order = U[0x3]),
                    this._onChangeCallback(),
                    this;
                }
                ,
                h.toArray = function(U, T) {
                    return void 0x0 === U && (U = []),
                    void 0x0 === T && (T = 0x0),
                    U[T] = this._x,
                    U[T + 0x1] = this._y,
                    U[T + 0x2] = this._z,
                    U[T + 0x3] = this._order,
                    U;
                }
                ,
                h._onChange = function(U) {
                    return this._onChangeCallback = U,
                    this;
                }
                ,
                h._onChangeCallback = function() {}
                ,
                h[Symbol.iterator] = B().mark(function U() {
                    return B().wrap(function(T) {
                        for (; ; )
                            switch (T.prev = T.next) {
                            case 0x0:
                                return T.next = 0x2,
                                this._x;
                            case 0x2:
                                return T.next = 0x4,
                                this._y;
                            case 0x4:
                                return T.next = 0x6,
                                this._z;
                            case 0x6:
                                return T.next = 0x8,
                                this._order;
                            case 0x8:
                            case 'end':
                                return T.stop();
                            }
                    }, U, this);
                }),
                (0x0,
                P.A)(Z, [{
                    'key': 'x',
                    'get': function() {
                        return this._x;
                    },
                    'set': function(T) {
                        this._x = T,
                        this._onChangeCallback();
                    }
                }, {
                    'key': 'y',
                    'get': function() {
                        return this._y;
                    },
                    'set': function(T) {
                        this._y = T,
                        this._onChangeCallback();
                    }
                }, {
                    'key': 'z',
                    'get': function() {
                        return this._z;
                    },
                    'set': function(T) {
                        this._z = T,
                        this._onChangeCallback();
                    }
                }, {
                    'key': 'order',
                    'get': function() {
                        return this._order;
                    },
                    'set': function(T) {
                        this._order = T,
                        this._onChangeCallback();
                    }
                }]);
            }());
            N.DEFAULT_ORDER = 'XYZ';
        }
        ,
        0xbd95: (H, y, P) => {
            'use strict';
            P.d(y, {
                'Cc': () => C,
                'NU': () => U,
                'Nf': () => Z,
                'S8': () => T,
                'a5': () => M,
                'lk': () => X,
                'qE': () => m,
                'r6': () => N,
                'rl': () => w,
                'up': () => B
            });
            var Q = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '0a', '0b', '0c', '0d', '0e', '0f', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1a', '1b', '1c', '1d', '1e', '1f', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '2a', '2b', '2c', '2d', '2e', '2f', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '3a', '3b', '3c', '3d', '3e', '3f', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '4a', '4b', '4c', '4d', '4e', '4f', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '5a', '5b', '5c', '5d', '5e', '5f', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '6a', '6b', '6c', '6d', '6e', '6f', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '7a', '7b', '7c', '7d', '7e', '7f', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '8a', '8b', '8c', '8d', '8e', '8f', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '9a', '9b', '9c', '9d', '9e', '9f', 'a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'ba', 'bb', 'bc', 'bd', 'be', 'bf', 'c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'ca', 'cb', 'cc', 'cd', 'ce', 'cf', 'd0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'da', 'db', 'dc', 'dd', 'de', 'df', 'e0', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'ea', 'eb', 'ec', 'ed', 'ee', 'ef', 'f0', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'fa', 'fb', 'fc', 'fd', 'fe', 'ff']
              , B = Math.PI / 0xb4
              , M = 0xb4 / Math.PI;
            function X() {
                var V = 0xffffffff * Math.random() | 0x0
                  , G = 0xffffffff * Math.random() | 0x0
                  , k = 0xffffffff * Math.random() | 0x0
                  , W = 0xffffffff * Math.random() | 0x0;
                return (Q[0xff & V] + Q[V >> 0x8 & 0xff] + Q[V >> 0x10 & 0xff] + Q[V >> 0x18 & 0xff] + '-' + Q[0xff & G] + Q[G >> 0x8 & 0xff] + '-' + Q[G >> 0x10 & 0xf | 0x40] + Q[G >> 0x18 & 0xff] + '-' + Q[0x3f & k | 0x80] + Q[k >> 0x8 & 0xff] + '-' + Q[k >> 0x10 & 0xff] + Q[k >> 0x18 & 0xff] + Q[0xff & W] + Q[W >> 0x8 & 0xff] + Q[W >> 0x10 & 0xff] + Q[W >> 0x18 & 0xff]).toLowerCase();
            }
            function m(V, G, k) {
                return Math.max(G, Math.min(k, V));
            }
            function w(V, G) {
                return (V % G + G) % G;
            }
            function C(V, G, k) {
                return (0x1 - k) * V + k * G;
            }
            function N(V) {
                return !(V & V - 0x1) && 0x0 !== V;
            }
            function Z(V) {
                return Math.pow(0x2, Math.floor(Math.log(V) / Math.LN2));
            }
            function U(V, G) {
                switch (G.constructor) {
                case Float32Array:
                    return V;
                case Uint32Array:
                    return V / 0xffffffff;
                case Uint16Array:
                    return V / 0xffff;
                case Uint8Array:
                    return V / 0xff;
                case Int32Array:
                    return Math.max(V / 0x7fffffff, -0x1);
                case Int16Array:
                    return Math.max(V / 0x7fff, -0x1);
                case Int8Array:
                    return Math.max(V / 0x7f, -0x1);
                default:
                    throw new Error('Invalid\x20component\x20type.');
                }
            }
            function T(V, G) {
                switch (G.constructor) {
                case Float32Array:
                    return V;
                case Uint32Array:
                    return Math.round(0xffffffff * V);
                case Uint16Array:
                    return Math.round(0xffff * V);
                case Uint8Array:
                    return Math.round(0xff * V);
                case Int32Array:
                    return Math.round(0x7fffffff * V);
                case Int16Array:
                    return Math.round(0x7fff * V);
                case Int8Array:
                    return Math.round(0x7f * V);
                default:
                    throw new Error('Invalid\x20component\x20type.');
                }
            }
        }
        ,
        0xad2c: (H, y, d) => {
            'use strict';
            d(0x16f53);
        }
        ,
        0x4bd8: (H, y, d) => {
            'use strict';
            d(0x76e),
            d(0x1152b),
            d(0x7002),
            d(0x11ded),
            d(0x79b5);
        }
        ,
        0x7404: (H, y, d) => {
            'use strict';
            d(0x79b5),
            d(0xbf9a),
            d(0x11ded),
            d(0x16f53),
            d(0x1008e),
            d(0x617),
            d(0x16835),
            d(0x17dfd);
        }
        ,
        0x11f76: (H, y, d) => {
            'use strict';
            d(0x7404);
        }
        ,
        0x1499a: (H, y, d) => {
            'use strict';
            d(0x7404),
            d(0x1008e),
            d(0x17dfd);
        }
        ,
        0xf5e1: (H, y, d) => {
            'use strict';
            d(0x79b5),
            d(0xbf9a),
            d(0x11ded),
            d(0x16f53),
            d(0x1008e),
            d(0x14916),
            d(0x16835);
        }
        ,
        0x8fb1: (H, y, d) => {
            'use strict';
            d(0x172d2),
            d(0xad2c),
            d(0x11ded),
            d(0x2277),
            d(0xbd95);
        }
        ,
        0x162d1: (H, y, d) => {
            'use strict';
            d(0x1152b),
            d(0x7002),
            d(0x11ded),
            d(0x79b5),
            d(0x1008e),
            d(0xb3ef),
            d(0xbf9a),
            d(0x172d2);
        }
        ,
        0x178c5: (r0, r1, r2) => {
            'use strict';
            r2.d(r1, {
                'J': () => Eg
            });
            var r3 = r2(0x14124)
              , r4 = r2(0x172d2)
              , r5 = r2(0x169b1)
              , r6 = r2(0x6a24)
              , r7 = r2(0x11ded)
              , r8 = r2(0x1264d)
              , r9 = r2(0x1008e)
              , rr = r2(0xb3ef)
              , rF = r2(0xbd95)
              , rE = r2(0x4d15)
              , rp = r2(0xc1e)
              , rS = r2(0x131a1)
              , rR = r2(0x101aa)
              , rH = r2(0x7026)
              , ry = r2(0x4efe)
              , rd = r2(0x1152b)
              , rP = r2(0x9c0d)
              , rQ = r2(0x41ef)
              , rB = {
                'r': 0x0,
                'b': 0x0,
                'g': 0x0
            };
            function rM(EL, Ec, Eq, Ef, EK, EY, Ez) {
                var EA, Ej, EO = new r5.Q(0x0), EJ = !0x0 === EY ? 0x0 : 0x1, Ev = null, En = 0x0, Eb = null;
                function ED(Eu, p0) {
                    Eu.getRGB(rB, (0x0,
                    rQ._U)(EL)),
                    Ef.buffers.color.setClear(rB.r, rB.g, rB.b, p0, Ez);
                }
                return {
                    'getClearColor': function() {
                        return EO;
                    },
                    'setClearColor': function(Eu, p0) {
                        void 0x0 === p0 && (p0 = 0x1),
                        EO.set(Eu),
                        ED(EO, EJ = p0);
                    },
                    'getClearAlpha': function() {
                        return EJ;
                    },
                    'setClearAlpha': function(Eu) {
                        ED(EO, EJ = Eu);
                    },
                    'render': function(Eu, p0) {
                        var p1 = !0x1
                          , p2 = !0x0 === p0.isScene ? p0.background : null;
                        p2 && p2.isTexture && (p2 = (p0.backgroundBlurriness > 0x0 ? Eq : Ec).get(p2)),
                        null === p2 ? ED(EO, EJ) : p2 && p2.isColor && (ED(p2, 0x1),
                        p1 = !0x0);
                        var p3 = EL.xr.getEnvironmentBlendMode();
                        'additive' === p3 ? Ef.buffers.color.setClear(0x0, 0x0, 0x0, 0x1, Ez) : 'alpha-blend' === p3 && Ef.buffers.color.setClear(0x0, 0x0, 0x0, 0x0, Ez),
                        (EL.autoClear || p1) && EL.clear(EL.autoClearColor, EL.autoClearDepth, EL.autoClearStencil),
                        p2 && (p2.isCubeTexture || p2.mapping === r4.Om) ? (void 0x0 === Ej && ((Ej = new rd.e(new rS.i(0x1,0x1,0x1),new rH.B({
                            'name': 'BackgroundCubeMaterial',
                            'uniforms': (0x0,
                            rQ.lx)(rP.z.backgroundCube.uniforms),
                            'vertexShader': rP.z.backgroundCube.vertexShader,
                            'fragmentShader': rP.z.backgroundCube.fragmentShader,
                            'side': r4.hsX,
                            'depthTest': !0x1,
                            'depthWrite': !0x1,
                            'fog': !0x1
                        }))).geometry.deleteAttribute('normal'),
                        Ej.geometry.deleteAttribute('uv'),
                        Ej.onBeforeRender = function(p4, p5, p6) {
                            this.matrixWorld.copyPosition(p6.matrixWorld);
                        }
                        ,
                        Object.defineProperty(Ej.material, 'envMap', {
                            'get': function() {
                                return this.uniforms.envMap.value;
                            }
                        }),
                        EK.update(Ej)),
                        Ej.material.uniforms.envMap.value = p2,
                        Ej.material.uniforms.flipEnvMap.value = p2.isCubeTexture && !0x1 === p2.isRenderTargetTexture ? -0x1 : 0x1,
                        Ej.material.uniforms.backgroundBlurriness.value = p0.backgroundBlurriness,
                        Ej.material.uniforms.backgroundIntensity.value = p0.backgroundIntensity,
                        Ej.material.toneMapped = ry.pp.getTransfer(p2.colorSpace) !== r4.KLL,
                        Ev === p2 && En === p2.version && Eb === EL.toneMapping || (Ej.material.needsUpdate = !0x0,
                        Ev = p2,
                        En = p2.version,
                        Eb = EL.toneMapping),
                        Ej.layers.enableAll(),
                        Eu.unshift(Ej, Ej.geometry, Ej.material, 0x0, 0x0, null)) : p2 && p2.isTexture && (void 0x0 === EA && ((EA = new rd.e(new rR.b(0x2,0x2),new rH.B({
                            'name': 'BackgroundMaterial',
                            'uniforms': (0x0,
                            rQ.lx)(rP.z.background.uniforms),
                            'vertexShader': rP.z.background.vertexShader,
                            'fragmentShader': rP.z.background.fragmentShader,
                            'side': r4.hB5,
                            'depthTest': !0x1,
                            'depthWrite': !0x1,
                            'fog': !0x1
                        }))).geometry.deleteAttribute('normal'),
                        Object.defineProperty(EA.material, 'map', {
                            'get': function() {
                                return this.uniforms.t2D.value;
                            }
                        }),
                        EK.update(EA)),
                        EA.material.uniforms.t2D.value = p2,
                        EA.material.uniforms.backgroundIntensity.value = p0.backgroundIntensity,
                        EA.material.toneMapped = ry.pp.getTransfer(p2.colorSpace) !== r4.KLL,
                        !0x0 === p2.matrixAutoUpdate && p2.updateMatrix(),
                        EA.material.uniforms.uvTransform.value.copy(p2.matrix),
                        Ev === p2 && En === p2.version && Eb === EL.toneMapping || (EA.material.needsUpdate = !0x0,
                        Ev = p2,
                        En = p2.version,
                        Eb = EL.toneMapping),
                        EA.layers.enableAll(),
                        Eu.unshift(EA, EA.geometry, EA.material, 0x0, 0x0, null));
                    }
                };
            }
            function rX(EL, Ec, Eq, Ef) {
                var EK = EL.getParameter(EL.MAX_VERTEX_ATTRIBS)
                  , EY = Ef.isWebGL2 ? null : Ec.get('OES_vertex_array_object')
                  , Ez = Ef.isWebGL2 || null !== EY
                  , EA = {}
                  , Ej = Eb(null)
                  , EO = Ej
                  , EJ = !0x1;
                function Ev(p5) {
                    return Ef.isWebGL2 ? EL.bindVertexArray(p5) : EY.bindVertexArrayOES(p5);
                }
                function En(p5) {
                    return Ef.isWebGL2 ? EL.deleteVertexArray(p5) : EY.deleteVertexArrayOES(p5);
                }
                function Eb(p5) {
                    for (var p6 = [], p7 = [], p8 = [], p9 = 0x0; p9 < EK; p9++)
                        p6[p9] = 0x0,
                        p7[p9] = 0x0,
                        p8[p9] = 0x0;
                    return {
                        'geometry': null,
                        'program': null,
                        'wireframe': !0x1,
                        'newAttributes': p6,
                        'enabledAttributes': p7,
                        'attributeDivisors': p8,
                        'object': p5,
                        'attributes': {},
                        'index': null
                    };
                }
                function ED() {
                    for (var p5 = EO.newAttributes, p6 = 0x0, p7 = p5.length; p6 < p7; p6++)
                        p5[p6] = 0x0;
                }
                function Eu(p5) {
                    p0(p5, 0x0);
                }
                function p0(p5, p6) {
                    var p7 = EO.newAttributes
                      , p8 = EO.enabledAttributes
                      , p9 = EO.attributeDivisors;
                    (p7[p5] = 0x1,
                    0x0 === p8[p5] && (EL.enableVertexAttribArray(p5),
                    p8[p5] = 0x1),
                    p9[p5] !== p6) && ((Ef.isWebGL2 ? EL : Ec.get('ANGLE_instanced_arrays'))[Ef.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE'](p5, p6),
                    p9[p5] = p6);
                }
                function p1() {
                    for (var p5 = EO.newAttributes, p6 = EO.enabledAttributes, p7 = 0x0, p8 = p6.length; p7 < p8; p7++)
                        p6[p7] !== p5[p7] && (EL.disableVertexAttribArray(p7),
                        p6[p7] = 0x0);
                }
                function p2(p5, p6, p7, p8, p9, pr, pF) {
                    !0x0 === pF ? EL.vertexAttribIPointer(p5, p6, p7, p9, pr) : EL.vertexAttribPointer(p5, p6, p7, p8, p9, pr);
                }
                function p3() {
                    p4(),
                    EJ = !0x0,
                    EO !== Ej && Ev((EO = Ej).object);
                }
                function p4() {
                    Ej.geometry = null,
                    Ej.program = null,
                    Ej.wireframe = !0x1;
                }
                return {
                    'setup': function(p5, p6, p7, p8, p9) {
                        var pr = !0x1;
                        if (Ez) {
                            var pF = function(pp, pS, pR) {
                                var pH = !0x0 === pR.wireframe
                                  , py = EA[pp.id];
                                void 0x0 === py && (py = {},
                                EA[pp.id] = py);
                                var pd = py[pS.id];
                                void 0x0 === pd && (pd = {},
                                py[pS.id] = pd);
                                var pP = pd[pH];
                                return void 0x0 === pP && (pP = Eb(Ef.isWebGL2 ? EL.createVertexArray() : EY.createVertexArrayOES()),
                                pd[pH] = pP),
                                pP;
                            }(p8, p7, p6);
                            EO !== pF && Ev((EO = pF).object),
                            pr = function(pp, pS, pR, pH) {
                                var py = EO.attributes
                                  , pd = pS.attributes
                                  , pP = 0x0
                                  , pQ = pR.getAttributes();
                                for (var pB in pQ) {
                                    if (pQ[pB].location >= 0x0) {
                                        var pM = py[pB]
                                          , pX = pd[pB];
                                        if (void 0x0 === pX && ('instanceMatrix' === pB && pp.instanceMatrix && (pX = pp.instanceMatrix),
                                        'instanceColor' === pB && pp.instanceColor && (pX = pp.instanceColor)),
                                        void 0x0 === pM)
                                            return !0x0;
                                        if (pM.attribute !== pX)
                                            return !0x0;
                                        if (pX && pM.data !== pX.data)
                                            return !0x0;
                                        pP++;
                                    }
                                }
                                return EO.attributesNum !== pP || EO.index !== pH;
                            }(p5, p8, p7, p9),
                            pr && function(pp, pS, pR, pH) {
                                var py = {}
                                  , pd = pS.attributes
                                  , pP = 0x0
                                  , pQ = pR.getAttributes();
                                for (var pB in pQ) {
                                    if (pQ[pB].location >= 0x0) {
                                        var pM = pd[pB];
                                        void 0x0 === pM && ('instanceMatrix' === pB && pp.instanceMatrix && (pM = pp.instanceMatrix),
                                        'instanceColor' === pB && pp.instanceColor && (pM = pp.instanceColor));
                                        var pX = {};
                                        pX.attribute = pM,
                                        pM && pM.data && (pX.data = pM.data),
                                        py[pB] = pX,
                                        pP++;
                                    }
                                }
                                EO.attributes = py,
                                EO.attributesNum = pP,
                                EO.index = pH;
                            }(p5, p8, p7, p9);
                        } else {
                            var pE = !0x0 === p6.wireframe;
                            EO.geometry === p8.id && EO.program === p7.id && EO.wireframe === pE || (EO.geometry = p8.id,
                            EO.program = p7.id,
                            EO.wireframe = pE,
                            pr = !0x0);
                        }
                        null !== p9 && Eq.update(p9, EL.ELEMENT_ARRAY_BUFFER),
                        (pr || EJ) && (EJ = !0x1,
                        function(pp, pS, pR, pH) {
                            if (!0x1 === Ef.isWebGL2 && (pp.isInstancedMesh || pH.isInstancedBufferGeometry) && null === Ec.get('ANGLE_instanced_arrays'))
                                return;
                            ED();
                            var py = pH.attributes
                              , pd = pR.getAttributes()
                              , pP = pS.defaultAttributeValues;
                            for (var pQ in pd) {
                                var pB = pd[pQ];
                                if (pB.location >= 0x0) {
                                    var pM = py[pQ];
                                    if (void 0x0 === pM && ('instanceMatrix' === pQ && pp.instanceMatrix && (pM = pp.instanceMatrix),
                                    'instanceColor' === pQ && pp.instanceColor && (pM = pp.instanceColor)),
                                    void 0x0 !== pM) {
                                        var pX = pM.normalized
                                          , pm = pM.itemSize
                                          , pw = Eq.get(pM);
                                        if (void 0x0 === pw)
                                            continue;
                                        var pl = pw.buffer
                                          , pC = pw.type
                                          , pN = pw.bytesPerElement
                                          , pZ = !0x0 === Ef.isWebGL2 && (pC === EL.INT || pC === EL.UNSIGNED_INT || pM.gpuType === r4.Yuy);
                                        if (pM.isInterleavedBufferAttribute) {
                                            var ph = pM.data
                                              , po = ph.stride
                                              , pU = pM.offset;
                                            if (ph.isInstancedInterleavedBuffer) {
                                                for (var pi = 0x0; pi < pB.locationSize; pi++)
                                                    p0(pB.location + pi, ph.meshPerAttribute);
                                                !0x0 !== pp.isInstancedMesh && void 0x0 === pH._maxInstanceCount && (pH._maxInstanceCount = ph.meshPerAttribute * ph.count);
                                            } else {
                                                for (var pT = 0x0; pT < pB.locationSize; pT++)
                                                    Eu(pB.location + pT);
                                            }
                                            EL.bindBuffer(EL.ARRAY_BUFFER, pl);
                                            for (var pV = 0x0; pV < pB.locationSize; pV++)
                                                p2(pB.location + pV, pm / pB.locationSize, pC, pX, po * pN, (pU + pm / pB.locationSize * pV) * pN, pZ);
                                        } else {
                                            if (pM.isInstancedBufferAttribute) {
                                                for (var ps = 0x0; ps < pB.locationSize; ps++)
                                                    p0(pB.location + ps, pM.meshPerAttribute);
                                                !0x0 !== pp.isInstancedMesh && void 0x0 === pH._maxInstanceCount && (pH._maxInstanceCount = pM.meshPerAttribute * pM.count);
                                            } else {
                                                for (var pG = 0x0; pG < pB.locationSize; pG++)
                                                    Eu(pB.location + pG);
                                            }
                                            EL.bindBuffer(EL.ARRAY_BUFFER, pl);
                                            for (var pk = 0x0; pk < pB.locationSize; pk++)
                                                p2(pB.location + pk, pm / pB.locationSize, pC, pX, pm * pN, pm / pB.locationSize * pk * pN, pZ);
                                        }
                                    } else {
                                        if (void 0x0 !== pP) {
                                            var pW = pP[pQ];
                                            if (void 0x0 !== pW)
                                                switch (pW.length) {
                                                case 0x2:
                                                    EL.vertexAttrib2fv(pB.location, pW);
                                                    break;
                                                case 0x3:
                                                    EL.vertexAttrib3fv(pB.location, pW);
                                                    break;
                                                case 0x4:
                                                    EL.vertexAttrib4fv(pB.location, pW);
                                                    break;
                                                default:
                                                    EL.vertexAttrib1fv(pB.location, pW);
                                                }
                                        }
                                    }
                                }
                            }
                            p1();
                        }(p5, p6, p7, p8),
                        null !== p9 && EL.bindBuffer(EL.ELEMENT_ARRAY_BUFFER, Eq.get(p9).buffer));
                    },
                    'reset': p3,
                    'resetDefaultState': p4,
                    'dispose': function() {
                        for (var p5 in (p3(),
                        EA)) {
                            var p6 = EA[p5];
                            for (var p7 in p6) {
                                var p8 = p6[p7];
                                for (var p9 in p8)
                                    En(p8[p9].object),
                                    delete p8[p9];
                                delete p6[p7];
                            }
                            delete EA[p5];
                        }
                    },
                    'releaseStatesOfGeometry': function(p5) {
                        if (void 0x0 !== EA[p5.id]) {
                            var p6 = EA[p5.id];
                            for (var p7 in p6) {
                                var p8 = p6[p7];
                                for (var p9 in p8)
                                    En(p8[p9].object),
                                    delete p8[p9];
                                delete p6[p7];
                            }
                            delete EA[p5.id];
                        }
                    },
                    'releaseStatesOfProgram': function(p5) {
                        for (var p6 in EA) {
                            var p7 = EA[p6];
                            if (void 0x0 !== p7[p5.id]) {
                                var p8 = p7[p5.id];
                                for (var p9 in p8)
                                    En(p8[p9].object),
                                    delete p8[p9];
                                delete p7[p5.id];
                            }
                        }
                    },
                    'initAttributes': ED,
                    'enableAttribute': Eu,
                    'disableUnusedAttributes': p1
                };
            }
            var rm = r2(0x7b4e)
              , rw = r2(0xcf4d)
              , rl = r2(0x3e78)
              , rC = r2(0xa3bc);
            function rN(EL) {
                var Ec = this
                  , Eq = null
                  , Ef = 0x0
                  , EK = !0x1
                  , EY = !0x1
                  , Ez = new rC.Z()
                  , EA = new rl.d()
                  , Ej = {
                    'value': null,
                    'needsUpdate': !0x1
                };
                function EO(EJ, Ev, En, Eb) {
                    var ED = null !== EJ ? EJ.length : 0x0
                      , Eu = null;
                    if (0x0 !== ED) {
                        if (Eu = Ej.value,
                        !0x0 !== Eb || null === Eu) {
                            var p0 = En + 0x4 * ED
                              , p1 = Ev.matrixWorldInverse;
                            EA.getNormalMatrix(p1),
                            (null === Eu || Eu.length < p0) && (Eu = new Float32Array(p0));
                            for (var p2 = 0x0, p3 = En; p2 !== ED; ++p2,
                            p3 += 0x4)
                                Ez.copy(EJ[p2]).applyMatrix4(p1, EA),
                                Ez.normal.toArray(Eu, p3),
                                Eu[p3 + 0x3] = Ez.constant;
                        }
                        Ej.value = Eu,
                        Ej.needsUpdate = !0x0;
                    }
                    return Ec.numPlanes = ED,
                    Ec.numIntersection = 0x0,
                    Eu;
                }
                this.uniform = Ej,
                this.numPlanes = 0x0,
                this.numIntersection = 0x0,
                this.init = function(EJ, Ev) {
                    var En = 0x0 !== EJ.length || Ev || 0x0 !== Ef || EK;
                    return EK = Ev,
                    Ef = EJ.length,
                    En;
                }
                ,
                this.beginShadows = function() {
                    EY = !0x0,
                    EO(null);
                }
                ,
                this.endShadows = function() {
                    EY = !0x1;
                }
                ,
                this.setGlobalState = function(EJ, Ev) {
                    Eq = EO(EJ, Ev, 0x0);
                }
                ,
                this.setState = function(EJ, Ev, En) {
                    var Eb = EJ.clippingPlanes
                      , ED = EJ.clipIntersection
                      , Eu = EJ.clipShadows
                      , p0 = EL.get(EJ);
                    if (!EK || null === Eb || 0x0 === Eb.length || EY && !Eu)
                        EY ? EO(null) : (function() {
                            Ej.value !== Eq && (Ej.value = Eq,
                            Ej.needsUpdate = Ef > 0x0),
                            (Ec.numPlanes = Ef,
                            Ec.numIntersection = 0x0);
                        }());
                    else {
                        var p1 = EY ? 0x0 : Ef
                          , p2 = 0x4 * p1
                          , p3 = p0.clippingState || null;
                        Ej.value = p3,
                        p3 = EO(Eb, Ev, p2, En);
                        for (var p4 = 0x0; p4 !== p2; ++p4)
                            p3[p4] = Eq[p4];
                        p0.clippingState = p3,
                        this.numIntersection = ED ? this.numPlanes : 0x0,
                        this.numPlanes += p1;
                    }
                }
                ;
            }
            var rZ = r2(0x101b9);
            function rh(EL) {
                var Ec = new WeakMap();
                function Eq(EK, EY) {
                    return EY === r4.wfO ? EK.mapping = r4.hy7 : EY === r4.uV5 && (EK.mapping = r4.xFO),
                    EK;
                }
                function Ef(EK) {
                    var EY = EK.target;
                    EY.removeEventListener('dispose', Ef);
                    var Ez = Ec.get(EY);
                    void 0x0 !== Ez && (Ec.delete(EY),
                    Ez.dispose());
                }
                return {
                    'get': function(EK) {
                        if (EK && EK.isTexture) {
                            var EY = EK.mapping;
                            if (EY === r4.wfO || EY === r4.uV5) {
                                if (Ec.has(EK))
                                    return Eq(Ec.get(EK).texture, EK.mapping);
                                var Ez = EK.image;
                                if (Ez && Ez.height > 0x0) {
                                    var EA = new rZ.o(Ez.height / 0x2);
                                    return EA.fromEquirectangularTexture(EL, EK),
                                    Ec.set(EK, EA),
                                    EK.addEventListener('dispose', Ef),
                                    Eq(EA.texture, EK.mapping);
                                }
                                return null;
                            }
                        }
                        return EK;
                    },
                    'dispose': function() {
                        Ec = new WeakMap();
                    }
                };
            }
            var ro = r2(0x10fc5);
            function rU(EL) {
                var Ec = new WeakMap()
                  , Eq = null;
                function Ef(EK) {
                    var EY = EK.target;
                    EY.removeEventListener('dispose', Ef);
                    var Ez = Ec.get(EY);
                    void 0x0 !== Ez && (Ec.delete(EY),
                    Ez.dispose());
                }
                return {
                    'get': function(EK) {
                        if (EK && EK.isTexture) {
                            var EY = EK.mapping
                              , Ez = EY === r4.wfO || EY === r4.uV5
                              , EA = EY === r4.hy7 || EY === r4.xFO;
                            if (Ez || EA) {
                                if (EK.isRenderTargetTexture && !0x0 === EK.needsPMREMUpdate) {
                                    EK.needsPMREMUpdate = !0x1;
                                    var Ej = Ec.get(EK);
                                    return null === Eq && (Eq = new ro.B(EL)),
                                    Ej = Ez ? Eq.fromEquirectangular(EK, Ej) : Eq.fromCubemap(EK, Ej),
                                    Ec.set(EK, Ej),
                                    Ej.texture;
                                }
                                if (Ec.has(EK))
                                    return Ec.get(EK).texture;
                                var EO = EK.image;
                                if (Ez && EO && EO.height > 0x0 || EA && EO && function(Ev) {
                                    for (var En = 0x0, Eb = 0x6, ED = 0x0; ED < Eb; ED++)
                                        void 0x0 !== Ev[ED] && En++;
                                    return En === Eb;
                                }(EO)) {
                                    null === Eq && (Eq = new ro.B(EL));
                                    var EJ = Ez ? Eq.fromEquirectangular(EK) : Eq.fromCubemap(EK);
                                    return Ec.set(EK, EJ),
                                    EK.addEventListener('dispose', Ef),
                                    EJ.texture;
                                }
                                return null;
                            }
                        }
                        return EK;
                    },
                    'dispose': function() {
                        Ec = new WeakMap(),
                        null !== Eq && (Eq.dispose(),
                        Eq = null);
                    }
                };
            }
            var ri = r2(0xddf9)
              , rT = r2(0x17dfd)
              , rV = r2(0x1078a);
            function rs(EL, Ec, Eq, Ef) {
                var EK = {}
                  , EY = new WeakMap();
                function Ez(Ej) {
                    var EO = Ej.target;
                    for (var EJ in (null !== EO.index && Ec.remove(EO.index),
                    EO.attributes))
                        Ec.remove(EO.attributes[EJ]);
                    for (var Ev in EO.morphAttributes)
                        for (var En = EO.morphAttributes[Ev], Eb = 0x0, ED = En.length; Eb < ED; Eb++)
                            Ec.remove(En[Eb]);
                    EO.removeEventListener('dispose', Ez),
                    delete EK[EO.id];
                    var Eu = EY.get(EO);
                    Eu && (Ec.remove(Eu),
                    EY.delete(EO)),
                    Ef.releaseStatesOfGeometry(EO),
                    !0x0 === EO.isInstancedBufferGeometry && delete EO._maxInstanceCount,
                    Eq.memory.geometries--;
                }
                function EA(Ej) {
                    var EO = []
                      , EJ = Ej.index
                      , Ev = Ej.attributes.position
                      , En = 0x0;
                    if (null !== EJ) {
                        var Eb = EJ.array;
                        En = EJ.version;
                        for (var ED = 0x0, Eu = Eb.length; ED < Eu; ED += 0x3) {
                            var p0 = Eb[ED + 0x0]
                              , p1 = Eb[ED + 0x1]
                              , p2 = Eb[ED + 0x2];
                            EO.push(p0, p1, p1, p2, p2, p0);
                        }
                    } else {
                        if (void 0x0 === Ev)
                            return;
                        var p3 = Ev.array;
                        En = Ev.version;
                        for (var p4 = 0x0, p5 = p3.length / 0x3 - 0x1; p4 < p5; p4 += 0x3) {
                            var p6 = p4 + 0x0
                              , p7 = p4 + 0x1
                              , p8 = p4 + 0x2;
                            EO.push(p6, p7, p7, p8, p8, p6);
                        }
                    }
                    var p9 = new (((0x0,
                    rV.AQ)(EO)) ? rT.MW : rT.A$)(EO,0x1);
                    p9.version = En;
                    var pr = EY.get(Ej);
                    pr && Ec.remove(pr),
                    EY.set(Ej, p9);
                }
                return {
                    'get': function(Ej, EO) {
                        return !0x0 === EK[EO.id] || (EO.addEventListener('dispose', Ez),
                        EK[EO.id] = !0x0,
                        Eq.memory.geometries++),
                        EO;
                    },
                    'update': function(Ej) {
                        var EO = Ej.attributes;
                        for (var EJ in EO)
                            Ec.update(EO[EJ], EL.ARRAY_BUFFER);
                        var Ev = Ej.morphAttributes;
                        for (var En in Ev)
                            for (var Eb = Ev[En], ED = 0x0, Eu = Eb.length; ED < Eu; ED++)
                                Ec.update(Eb[ED], EL.ARRAY_BUFFER);
                    },
                    'getWireframeAttribute': function(Ej) {
                        var EO = EY.get(Ej);
                        if (EO) {
                            var EJ = Ej.index;
                            null !== EJ && EO.version < EJ.version && EA(Ej);
                        } else
                            EA(Ej);
                        return EY.get(Ej);
                    }
                };
            }
            var rG = r2(0xcff)
              , rk = r2(0xfa3f)
              , rW = r2(0xc71e);
            function rx(EL, Ec) {
                return EL[0x0] - Ec[0x0];
            }
            function ra(EL, Ec) {
                return Math.abs(Ec[0x1]) - Math.abs(EL[0x1]);
            }
            function rI(EL, Ec, Eq) {
                for (var Ef = {}, EK = new Float32Array(0x8), EY = new WeakMap(), Ez = new rr.I(), EA = [], Ej = 0x0; Ej < 0x8; Ej++)
                    EA[Ej] = [Ej, 0x0];
                return {
                    'update': function(EO, EJ, Ev) {
                        var En = EO.morphTargetInfluences;
                        if (!0x0 === Ec.isWebGL2) {
                            var Eb = EJ.morphAttributes.position || EJ.morphAttributes.normal || EJ.morphAttributes.color
                              , ED = void 0x0 !== Eb ? Eb.length : 0x0
                              , Eu = EY.get(EJ);
                            if (void 0x0 === Eu || Eu.count !== ED) {
                                void 0x0 !== Eu && Eu.texture.dispose();
                                var p0 = void 0x0 !== EJ.morphAttributes.position
                                  , p1 = void 0x0 !== EJ.morphAttributes.normal
                                  , p2 = void 0x0 !== EJ.morphAttributes.color
                                  , p3 = EJ.morphAttributes.position || []
                                  , p4 = EJ.morphAttributes.normal || []
                                  , p5 = EJ.morphAttributes.color || []
                                  , p6 = 0x0;
                                !0x0 === p0 && (p6 = 0x1),
                                !0x0 === p1 && (p6 = 0x2),
                                !0x0 === p2 && (p6 = 0x3);
                                var p7 = EJ.attributes.position.count * p6
                                  , p8 = 0x1;
                                p7 > Ec.maxTextureSize && (p8 = Math.ceil(p7 / Ec.maxTextureSize),
                                p7 = Ec.maxTextureSize);
                                var p9 = new Float32Array(p7 * p8 * 0x4 * ED)
                                  , pr = new rW.r(p9,p7,p8,ED);
                                pr.type = r4.RQf,
                                pr.needsUpdate = !0x0;
                                for (var pF = 0x4 * p6, pE = 0x0; pE < ED; pE++)
                                    for (var pp = p3[pE], pS = p4[pE], pR = p5[pE], pH = p7 * p8 * 0x4 * pE, py = 0x0; py < pp.count; py++) {
                                        var pd = py * pF;
                                        !0x0 === p0 && (Ez.fromBufferAttribute(pp, py),
                                        p9[pH + pd + 0x0] = Ez.x,
                                        p9[pH + pd + 0x1] = Ez.y,
                                        p9[pH + pd + 0x2] = Ez.z,
                                        p9[pH + pd + 0x3] = 0x0),
                                        !0x0 === p1 && (Ez.fromBufferAttribute(pS, py),
                                        p9[pH + pd + 0x4] = Ez.x,
                                        p9[pH + pd + 0x5] = Ez.y,
                                        p9[pH + pd + 0x6] = Ez.z,
                                        p9[pH + pd + 0x7] = 0x0),
                                        !0x0 === p2 && (Ez.fromBufferAttribute(pR, py),
                                        p9[pH + pd + 0x8] = Ez.x,
                                        p9[pH + pd + 0x9] = Ez.y,
                                        p9[pH + pd + 0xa] = Ez.z,
                                        p9[pH + pd + 0xb] = 0x4 === pR.itemSize ? Ez.w : 0x1);
                                    }
                                Eu = {
                                    'count': ED,
                                    'texture': pr,
                                    'size': new r8.I(p7,p8)
                                },
                                EY.set(EJ, Eu),
                                EJ.addEventListener('dispose', function ps() {
                                    pr.dispose(),
                                    EY.delete(EJ),
                                    EJ.removeEventListener('dispose', ps);
                                });
                            }
                            for (var pP = 0x0, pQ = 0x0; pQ < En.length; pQ++)
                                pP += En[pQ];
                            var pB = EJ.morphTargetsRelative ? 0x1 : 0x1 - pP;
                            Ev.getUniforms().setValue(EL, 'morphTargetBaseInfluence', pB),
                            Ev.getUniforms().setValue(EL, 'morphTargetInfluences', En),
                            Ev.getUniforms().setValue(EL, 'morphTargetsTexture', Eu.texture, Eq),
                            Ev.getUniforms().setValue(EL, 'morphTargetsTextureSize', Eu.size);
                        } else {
                            var pM = void 0x0 === En ? 0x0 : En.length
                              , pX = Ef[EJ.id];
                            if (void 0x0 === pX || pX.length !== pM) {
                                pX = [];
                                for (var pm = 0x0; pm < pM; pm++)
                                    pX[pm] = [pm, 0x0];
                                Ef[EJ.id] = pX;
                            }
                            for (var pw = 0x0; pw < pM; pw++) {
                                var pl = pX[pw];
                                pl[0x0] = pw,
                                pl[0x1] = En[pw];
                            }
                            pX.sort(ra);
                            for (var pC = 0x0; pC < 0x8; pC++)
                                pC < pM && pX[pC][0x1] ? (EA[pC][0x0] = pX[pC][0x0],
                                EA[pC][0x1] = pX[pC][0x1]) : (EA[pC][0x0] = Number.MAX_SAFE_INTEGER,
                                EA[pC][0x1] = 0x0);
                            EA.sort(rx);
                            for (var pN = EJ.morphAttributes.position, pZ = EJ.morphAttributes.normal, ph = 0x0, po = 0x0; po < 0x8; po++) {
                                var pU = EA[po]
                                  , pi = pU[0x0]
                                  , pT = pU[0x1];
                                pi !== Number.MAX_SAFE_INTEGER && pT ? (pN && EJ.getAttribute('morphTarget' + po) !== pN[pi] && EJ.setAttribute('morphTarget' + po, pN[pi]),
                                pZ && EJ.getAttribute('morphNormal' + po) !== pZ[pi] && EJ.setAttribute('morphNormal' + po, pZ[pi]),
                                EK[po] = pT,
                                ph += pT) : (pN && !0x0 === EJ.hasAttribute('morphTarget' + po) && EJ.deleteAttribute('morphTarget' + po),
                                pZ && !0x0 === EJ.hasAttribute('morphNormal' + po) && EJ.deleteAttribute('morphNormal' + po),
                                EK[po] = 0x0);
                            }
                            var pV = EJ.morphTargetsRelative ? 0x1 : 0x1 - ph;
                            Ev.getUniforms().setValue(EL, 'morphTargetBaseInfluence', pV),
                            Ev.getUniforms().setValue(EL, 'morphTargetInfluences', EK);
                        }
                    }
                };
            }
            var rg = r2(0x11c2f)
              , rL = r2(0xc7b1)
              , rc = r2(0xb12c)
              , rq = r2(0x17417)
              , rf = r2(0x10762)
              , rK = r2(0xac1a)
              , rY = new rq.g()
              , rz = new rK.V(0x1,0x1);
            rz.compareFunction = r4.TiK;
            var rA = new rW.r()
              , rj = new rf.d()
              , rO = new rc.b()
              , rJ = []
              , rv = []
              , rn = new Float32Array(0x10)
              , rb = new Float32Array(0x9)
              , rD = new Float32Array(0x4);
            function ru(EL, Ec, Eq) {
                var Ef = EL[0x0];
                if (Ef <= 0x0 || Ef > 0x0)
                    return EL;
                var EK = Ec * Eq
                  , EY = rJ[EK];
                if (void 0x0 === EY && (EY = new Float32Array(EK),
                rJ[EK] = EY),
                0x0 !== Ec) {
                    Ef.toArray(EY, 0x0);
                    for (var Ez = 0x1, EA = 0x0; Ez !== Ec; ++Ez)
                        EA += Eq,
                        EL[Ez].toArray(EY, EA);
                }
                return EY;
            }
            function F0(EL, Ec) {
                if (EL.length !== Ec.length)
                    return !0x1;
                for (var Eq = 0x0, Ef = EL.length; Eq < Ef; Eq++)
                    if (EL[Eq] !== Ec[Eq])
                        return !0x1;
                return !0x0;
            }
            function F1(EL, Ec) {
                for (var Eq = 0x0, Ef = Ec.length; Eq < Ef; Eq++)
                    EL[Eq] = Ec[Eq];
            }
            function F2(EL, Ec) {
                var Eq = rv[Ec];
                void 0x0 === Eq && (Eq = new Int32Array(Ec),
                rv[Ec] = Eq);
                for (var Ef = 0x0; Ef !== Ec; ++Ef)
                    Eq[Ef] = EL.allocateTextureUnit();
                return Eq;
            }
            function F3(EL, Ec) {
                var Eq = this.cache;
                Eq[0x0] !== Ec && (EL.uniform1f(this.addr, Ec),
                Eq[0x0] = Ec);
            }
            function F4(EL, Ec) {
                var Eq = this.cache;
                if (void 0x0 !== Ec.x)
                    Eq[0x0] === Ec.x && Eq[0x1] === Ec.y || (EL.uniform2f(this.addr, Ec.x, Ec.y),
                    Eq[0x0] = Ec.x,
                    Eq[0x1] = Ec.y);
                else {
                    if (F0(Eq, Ec))
                        return;
                    EL.uniform2fv(this.addr, Ec),
                    F1(Eq, Ec);
                }
            }
            function F5(EL, Ec) {
                var Eq = this.cache;
                if (void 0x0 !== Ec.x)
                    Eq[0x0] === Ec.x && Eq[0x1] === Ec.y && Eq[0x2] === Ec.z || (EL.uniform3f(this.addr, Ec.x, Ec.y, Ec.z),
                    Eq[0x0] = Ec.x,
                    Eq[0x1] = Ec.y,
                    Eq[0x2] = Ec.z);
                else {
                    if (void 0x0 !== Ec.r)
                        Eq[0x0] === Ec.r && Eq[0x1] === Ec.g && Eq[0x2] === Ec.b || (EL.uniform3f(this.addr, Ec.r, Ec.g, Ec.b),
                        Eq[0x0] = Ec.r,
                        Eq[0x1] = Ec.g,
                        Eq[0x2] = Ec.b);
                    else {
                        if (F0(Eq, Ec))
                            return;
                        EL.uniform3fv(this.addr, Ec),
                        F1(Eq, Ec);
                    }
                }
            }
            function F6(EL, Ec) {
                var Eq = this.cache;
                if (void 0x0 !== Ec.x)
                    Eq[0x0] === Ec.x && Eq[0x1] === Ec.y && Eq[0x2] === Ec.z && Eq[0x3] === Ec.w || (EL.uniform4f(this.addr, Ec.x, Ec.y, Ec.z, Ec.w),
                    Eq[0x0] = Ec.x,
                    Eq[0x1] = Ec.y,
                    Eq[0x2] = Ec.z,
                    Eq[0x3] = Ec.w);
                else {
                    if (F0(Eq, Ec))
                        return;
                    EL.uniform4fv(this.addr, Ec),
                    F1(Eq, Ec);
                }
            }
            function F7(EL, Ec) {
                var Eq = this.cache
                  , Ef = Ec.elements;
                if (void 0x0 === Ef) {
                    if (F0(Eq, Ec))
                        return;
                    EL.uniformMatrix2fv(this.addr, !0x1, Ec),
                    F1(Eq, Ec);
                } else {
                    if (F0(Eq, Ef))
                        return;
                    rD.set(Ef),
                    EL.uniformMatrix2fv(this.addr, !0x1, rD),
                    F1(Eq, Ef);
                }
            }
            function F8(EL, Ec) {
                var Eq = this.cache
                  , Ef = Ec.elements;
                if (void 0x0 === Ef) {
                    if (F0(Eq, Ec))
                        return;
                    EL.uniformMatrix3fv(this.addr, !0x1, Ec),
                    F1(Eq, Ec);
                } else {
                    if (F0(Eq, Ef))
                        return;
                    rb.set(Ef),
                    EL.uniformMatrix3fv(this.addr, !0x1, rb),
                    F1(Eq, Ef);
                }
            }
            function F9(EL, Ec) {
                var Eq = this.cache
                  , Ef = Ec.elements;
                if (void 0x0 === Ef) {
                    if (F0(Eq, Ec))
                        return;
                    EL.uniformMatrix4fv(this.addr, !0x1, Ec),
                    F1(Eq, Ec);
                } else {
                    if (F0(Eq, Ef))
                        return;
                    rn.set(Ef),
                    EL.uniformMatrix4fv(this.addr, !0x1, rn),
                    F1(Eq, Ef);
                }
            }
            function Fr(EL, Ec) {
                var Eq = this.cache;
                Eq[0x0] !== Ec && (EL.uniform1i(this.addr, Ec),
                Eq[0x0] = Ec);
            }
            function FF(EL, Ec) {
                var Eq = this.cache;
                if (void 0x0 !== Ec.x)
                    Eq[0x0] === Ec.x && Eq[0x1] === Ec.y || (EL.uniform2i(this.addr, Ec.x, Ec.y),
                    Eq[0x0] = Ec.x,
                    Eq[0x1] = Ec.y);
                else {
                    if (F0(Eq, Ec))
                        return;
                    EL.uniform2iv(this.addr, Ec),
                    F1(Eq, Ec);
                }
            }
            function FE(EL, Ec) {
                var Eq = this.cache;
                if (void 0x0 !== Ec.x)
                    Eq[0x0] === Ec.x && Eq[0x1] === Ec.y && Eq[0x2] === Ec.z || (EL.uniform3i(this.addr, Ec.x, Ec.y, Ec.z),
                    Eq[0x0] = Ec.x,
                    Eq[0x1] = Ec.y,
                    Eq[0x2] = Ec.z);
                else {
                    if (F0(Eq, Ec))
                        return;
                    EL.uniform3iv(this.addr, Ec),
                    F1(Eq, Ec);
                }
            }
            function Fp(EL, Ec) {
                var Eq = this.cache;
                if (void 0x0 !== Ec.x)
                    Eq[0x0] === Ec.x && Eq[0x1] === Ec.y && Eq[0x2] === Ec.z && Eq[0x3] === Ec.w || (EL.uniform4i(this.addr, Ec.x, Ec.y, Ec.z, Ec.w),
                    Eq[0x0] = Ec.x,
                    Eq[0x1] = Ec.y,
                    Eq[0x2] = Ec.z,
                    Eq[0x3] = Ec.w);
                else {
                    if (F0(Eq, Ec))
                        return;
                    EL.uniform4iv(this.addr, Ec),
                    F1(Eq, Ec);
                }
            }
            function FS(EL, Ec) {
                var Eq = this.cache;
                Eq[0x0] !== Ec && (EL.uniform1ui(this.addr, Ec),
                Eq[0x0] = Ec);
            }
            function FR(EL, Ec) {
                var Eq = this.cache;
                if (void 0x0 !== Ec.x)
                    Eq[0x0] === Ec.x && Eq[0x1] === Ec.y || (EL.uniform2ui(this.addr, Ec.x, Ec.y),
                    Eq[0x0] = Ec.x,
                    Eq[0x1] = Ec.y);
                else {
                    if (F0(Eq, Ec))
                        return;
                    EL.uniform2uiv(this.addr, Ec),
                    F1(Eq, Ec);
                }
            }
            function FH(EL, Ec) {
                var Eq = this.cache;
                if (void 0x0 !== Ec.x)
                    Eq[0x0] === Ec.x && Eq[0x1] === Ec.y && Eq[0x2] === Ec.z || (EL.uniform3ui(this.addr, Ec.x, Ec.y, Ec.z),
                    Eq[0x0] = Ec.x,
                    Eq[0x1] = Ec.y,
                    Eq[0x2] = Ec.z);
                else {
                    if (F0(Eq, Ec))
                        return;
                    EL.uniform3uiv(this.addr, Ec),
                    F1(Eq, Ec);
                }
            }
            function Fy(EL, Ec) {
                var Eq = this.cache;
                if (void 0x0 !== Ec.x)
                    Eq[0x0] === Ec.x && Eq[0x1] === Ec.y && Eq[0x2] === Ec.z && Eq[0x3] === Ec.w || (EL.uniform4ui(this.addr, Ec.x, Ec.y, Ec.z, Ec.w),
                    Eq[0x0] = Ec.x,
                    Eq[0x1] = Ec.y,
                    Eq[0x2] = Ec.z,
                    Eq[0x3] = Ec.w);
                else {
                    if (F0(Eq, Ec))
                        return;
                    EL.uniform4uiv(this.addr, Ec),
                    F1(Eq, Ec);
                }
            }
            function Fd(EL, Ec, Eq) {
                var Ef = this.cache
                  , EK = Eq.allocateTextureUnit();
                Ef[0x0] !== EK && (EL.uniform1i(this.addr, EK),
                Ef[0x0] = EK);
                var EY = this.type === EL.SAMPLER_2D_SHADOW ? rz : rY;
                Eq.setTexture2D(Ec || EY, EK);
            }
            function FP(EL, Ec, Eq) {
                var Ef = this.cache
                  , EK = Eq.allocateTextureUnit();
                Ef[0x0] !== EK && (EL.uniform1i(this.addr, EK),
                Ef[0x0] = EK),
                Eq.setTexture3D(Ec || rj, EK);
            }
            function FQ(EL, Ec, Eq) {
                var Ef = this.cache
                  , EK = Eq.allocateTextureUnit();
                Ef[0x0] !== EK && (EL.uniform1i(this.addr, EK),
                Ef[0x0] = EK),
                Eq.setTextureCube(Ec || rO, EK);
            }
            function FB(EL, Ec, Eq) {
                var Ef = this.cache
                  , EK = Eq.allocateTextureUnit();
                Ef[0x0] !== EK && (EL.uniform1i(this.addr, EK),
                Ef[0x0] = EK),
                Eq.setTexture2DArray(Ec || rA, EK);
            }
            function FM(EL, Ec) {
                EL.uniform1fv(this.addr, Ec);
            }
            function FX(EL, Ec) {
                var Eq = ru(Ec, this.size, 0x2);
                EL.uniform2fv(this.addr, Eq);
            }
            function Fm(EL, Ec) {
                var Eq = ru(Ec, this.size, 0x3);
                EL.uniform3fv(this.addr, Eq);
            }
            function Fw(EL, Ec) {
                var Eq = ru(Ec, this.size, 0x4);
                EL.uniform4fv(this.addr, Eq);
            }
            function Fl(EL, Ec) {
                var Eq = ru(Ec, this.size, 0x4);
                EL.uniformMatrix2fv(this.addr, !0x1, Eq);
            }
            function FC(EL, Ec) {
                var Eq = ru(Ec, this.size, 0x9);
                EL.uniformMatrix3fv(this.addr, !0x1, Eq);
            }
            function FN(EL, Ec) {
                var Eq = ru(Ec, this.size, 0x10);
                EL.uniformMatrix4fv(this.addr, !0x1, Eq);
            }
            function FZ(EL, Ec) {
                EL.uniform1iv(this.addr, Ec);
            }
            function Fh(EL, Ec) {
                EL.uniform2iv(this.addr, Ec);
            }
            function Fo(EL, Ec) {
                EL.uniform3iv(this.addr, Ec);
            }
            function FU(EL, Ec) {
                EL.uniform4iv(this.addr, Ec);
            }
            function Fi(EL, Ec) {
                EL.uniform1uiv(this.addr, Ec);
            }
            function FT(EL, Ec) {
                EL.uniform2uiv(this.addr, Ec);
            }
            function FV(EL, Ec) {
                EL.uniform3uiv(this.addr, Ec);
            }
            function Fs(EL, Ec) {
                EL.uniform4uiv(this.addr, Ec);
            }
            function FG(EL, Ec, Eq) {
                var Ef = this.cache
                  , EK = Ec.length
                  , EY = F2(Eq, EK);
                F0(Ef, EY) || (EL.uniform1iv(this.addr, EY),
                F1(Ef, EY));
                for (var Ez = 0x0; Ez !== EK; ++Ez)
                    Eq.setTexture2D(Ec[Ez] || rY, EY[Ez]);
            }
            function Fk(EL, Ec, Eq) {
                var Ef = this.cache
                  , EK = Ec.length
                  , EY = F2(Eq, EK);
                F0(Ef, EY) || (EL.uniform1iv(this.addr, EY),
                F1(Ef, EY));
                for (var Ez = 0x0; Ez !== EK; ++Ez)
                    Eq.setTexture3D(Ec[Ez] || rj, EY[Ez]);
            }
            function FW(EL, Ec, Eq) {
                var Ef = this.cache
                  , EK = Ec.length
                  , EY = F2(Eq, EK);
                F0(Ef, EY) || (EL.uniform1iv(this.addr, EY),
                F1(Ef, EY));
                for (var Ez = 0x0; Ez !== EK; ++Ez)
                    Eq.setTextureCube(Ec[Ez] || rO, EY[Ez]);
            }
            function Fx(EL, Ec, Eq) {
                var Ef = this.cache
                  , EK = Ec.length
                  , EY = F2(Eq, EK);
                F0(Ef, EY) || (EL.uniform1iv(this.addr, EY),
                F1(Ef, EY));
                for (var Ez = 0x0; Ez !== EK; ++Ez)
                    Eq.setTexture2DArray(Ec[Ez] || rA, EY[Ez]);
            }
            var Fa = function(EL, Ec, Eq) {
                this.id = EL,
                this.addr = Eq,
                this.cache = [],
                this.type = Ec.type,
                this.setValue = function(Ef) {
                    switch (Ef) {
                    case 0x1406:
                        return F3;
                    case 0x8b50:
                        return F4;
                    case 0x8b51:
                        return F5;
                    case 0x8b52:
                        return F6;
                    case 0x8b5a:
                        return F7;
                    case 0x8b5b:
                        return F8;
                    case 0x8b5c:
                        return F9;
                    case 0x1404:
                    case 0x8b56:
                        return Fr;
                    case 0x8b53:
                    case 0x8b57:
                        return FF;
                    case 0x8b54:
                    case 0x8b58:
                        return FE;
                    case 0x8b55:
                    case 0x8b59:
                        return Fp;
                    case 0x1405:
                        return FS;
                    case 0x8dc6:
                        return FR;
                    case 0x8dc7:
                        return FH;
                    case 0x8dc8:
                        return Fy;
                    case 0x8b5e:
                    case 0x8d66:
                    case 0x8dca:
                    case 0x8dd2:
                    case 0x8b62:
                        return Fd;
                    case 0x8b5f:
                    case 0x8dcb:
                    case 0x8dd3:
                        return FP;
                    case 0x8b60:
                    case 0x8dcc:
                    case 0x8dd4:
                    case 0x8dc5:
                        return FQ;
                    case 0x8dc1:
                    case 0x8dcf:
                    case 0x8dd7:
                    case 0x8dc4:
                        return FB;
                    }
                }(Ec.type);
            }
              , FI = function(EL, Ec, Eq) {
                this.id = EL,
                this.addr = Eq,
                this.cache = [],
                this.type = Ec.type,
                this.size = Ec.size,
                this.setValue = function(Ef) {
                    switch (Ef) {
                    case 0x1406:
                        return FM;
                    case 0x8b50:
                        return FX;
                    case 0x8b51:
                        return Fm;
                    case 0x8b52:
                        return Fw;
                    case 0x8b5a:
                        return Fl;
                    case 0x8b5b:
                        return FC;
                    case 0x8b5c:
                        return FN;
                    case 0x1404:
                    case 0x8b56:
                        return FZ;
                    case 0x8b53:
                    case 0x8b57:
                        return Fh;
                    case 0x8b54:
                    case 0x8b58:
                        return Fo;
                    case 0x8b55:
                    case 0x8b59:
                        return FU;
                    case 0x1405:
                        return Fi;
                    case 0x8dc6:
                        return FT;
                    case 0x8dc7:
                        return FV;
                    case 0x8dc8:
                        return Fs;
                    case 0x8b5e:
                    case 0x8d66:
                    case 0x8dca:
                    case 0x8dd2:
                    case 0x8b62:
                        return FG;
                    case 0x8b5f:
                    case 0x8dcb:
                    case 0x8dd3:
                        return Fk;
                    case 0x8b60:
                    case 0x8dcc:
                    case 0x8dd4:
                    case 0x8dc5:
                        return FW;
                    case 0x8dc1:
                    case 0x8dcf:
                    case 0x8dd7:
                    case 0x8dc4:
                        return Fx;
                    }
                }(Ec.type);
            }
              , Fg = (function() {
                function EL(Ec) {
                    this.id = Ec,
                    this.seq = [],
                    this.map = {};
                }
                return EL.prototype.setValue = function(Ec, Eq, Ef) {
                    for (var EK = this.seq, EY = 0x0, Ez = EK.length; EY !== Ez; ++EY) {
                        var EA = EK[EY];
                        EA.setValue(Ec, Eq[EA.id], Ef);
                    }
                }
                ,
                EL;
            }())
              , FL = /(\w+)(\])?(\[|\.)?/g;
            function Fc(EL, Ec) {
                EL.seq.push(Ec),
                EL.map[Ec.id] = Ec;
            }
            function Fq(EL, Ec, Eq) {
                var Ef = EL.name
                  , EK = Ef.length;
                for (FL.lastIndex = 0x0; ; ) {
                    var EY = FL.exec(Ef)
                      , Ez = FL.lastIndex
                      , EA = EY[0x1]
                      , Ej = ']' === EY[0x2]
                      , EO = EY[0x3];
                    if (Ej && (EA |= 0x0),
                    void 0x0 === EO || '[' === EO && Ez + 0x2 === EK) {
                        Fc(Eq, void 0x0 === EO ? new Fa(EA,EL,Ec) : new FI(EA,EL,Ec));
                        break;
                    }
                    var EJ = Eq.map[EA];
                    void 0x0 === EJ && Fc(Eq, EJ = new Fg(EA)),
                    Eq = EJ;
                }
            }
            var Ff = (function() {
                function EL(Eq, Ef) {
                    this.seq = [],
                    this.map = {};
                    for (var EK = Eq.getProgramParameter(Ef, Eq.ACTIVE_UNIFORMS), EY = 0x0; EY < EK; ++EY) {
                        var Ez = Eq.getActiveUniform(Ef, EY);
                        Fq(Ez, Eq.getUniformLocation(Ef, Ez.name), this);
                    }
                }
                var Ec = EL.prototype;
                return Ec.setValue = function(Eq, Ef, EK, EY) {
                    var Ez = this.map[Ef];
                    void 0x0 !== Ez && Ez.setValue(Eq, EK, EY);
                }
                ,
                Ec.setOptional = function(Eq, Ef, EK) {
                    var EY = Ef[EK];
                    void 0x0 !== EY && this.setValue(Eq, EK, EY);
                }
                ,
                EL.upload = function(Eq, Ef, EK, EY) {
                    for (var Ez = 0x0, EA = Ef.length; Ez !== EA; ++Ez) {
                        var Ej = Ef[Ez]
                          , EO = EK[Ej.id];
                        !0x1 !== EO.needsUpdate && Ej.setValue(Eq, EO.value, EY);
                    }
                }
                ,
                EL.seqWithValue = function(Eq, Ef) {
                    for (var EK = [], EY = 0x0, Ez = Eq.length; EY !== Ez; ++EY) {
                        var EA = Eq[EY];
                        EA.id in Ef && EK.push(EA);
                    }
                    return EK;
                }
                ,
                EL;
            }())
              , FK = r2(0x16f96)
              , FY = r2(0xfdaa)
              , Fz = 0x91b1
              , FA = 0x0;
            function Fj(EL, Ec, Eq) {
                var Ef = EL.getShaderParameter(Ec, EL.COMPILE_STATUS)
                  , EK = EL.getShaderInfoLog(Ec).trim();
                if (Ef && '' === EK)
                    return '';
                var EY = /ERROR: 0:(\d+)/.exec(EK);
                if (EY) {
                    var Ez = parseInt(EY[0x1]);
                    return Eq.toUpperCase() + '\x0a\x0a' + EK + '\x0a\x0a' + function(EA, Ej) {
                        for (var EO = EA.split('\x0a'), EJ = [], Ev = Math.max(Ej - 0x6, 0x0), En = Math.min(Ej + 0x6, EO.length), Eb = Ev; Eb < En; Eb++) {
                            var ED = Eb + 0x1;
                            EJ.push((ED === Ej ? '>' : '\x20') + '\x20' + ED + ':\x20' + EO[Eb]);
                        }
                        return EJ.join('\x0a');
                    }(EL.getShaderSource(Ec), Ez);
                }
                return EK;
            }
            function FO(EL, Ec) {
                var Eq = function(Ef) {
                    var EK, EY = ry.pp.getPrimaries(ry.pp.workingColorSpace), Ez = ry.pp.getPrimaries(Ef);
                    switch (EY === Ez ? EK = '' : EY === r4.wqq && Ez === r4.z5 ? EK = 'LinearDisplayP3ToLinearSRGB' : EY === r4.z5 && Ez === r4.wqq && (EK = 'LinearSRGBToLinearDisplayP3'),
                    Ef) {
                    case r4.Zr2:
                    case r4.qIQ:
                        return [EK, 'LinearTransferOETF'];
                    case r4.er$:
                    case r4.V5c:
                        return [EK, 'sRGBTransferOETF'];
                    default:
                        return console.warn('THREE.WebGLProgram:\x20Unsupported\x20color\x20space:', Ef),
                        [EK, 'LinearTransferOETF'];
                    }
                }(Ec);
                return 'vec4\x20' + EL + '(\x20vec4\x20value\x20)\x20{\x20return\x20' + Eq[0x0] + '(\x20' + Eq[0x1] + '(\x20value\x20)\x20);\x20}';
            }
            function FJ(EL, Ec) {
                var Eq;
                switch (Ec) {
                case r4.kyO:
                    Eq = 'Linear';
                    break;
                case r4.Mjd:
                    Eq = 'Reinhard';
                    break;
                case r4.nNL:
                    Eq = 'OptimizedCineon';
                    break;
                case r4.FV:
                    Eq = 'ACESFilmic';
                    break;
                case r4.g7M:
                    Eq = 'Custom';
                    break;
                default:
                    console.warn('THREE.WebGLProgram:\x20Unsupported\x20toneMapping:', Ec),
                    Eq = 'Linear';
                }
                return 'vec3\x20' + EL + '(\x20vec3\x20color\x20)\x20{\x20return\x20' + Eq + 'ToneMapping(\x20color\x20);\x20}';
            }
            function Fv(EL) {
                return '' !== EL;
            }
            function Fn(EL, Ec) {
                var Eq = Ec.numSpotLightShadows + Ec.numSpotLightMaps - Ec.numSpotLightShadowsWithMaps;
                return EL.replace(/NUM_DIR_LIGHTS/g, Ec.numDirLights).replace(/NUM_SPOT_LIGHTS/g, Ec.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, Ec.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, Eq).replace(/NUM_RECT_AREA_LIGHTS/g, Ec.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, Ec.numPointLights).replace(/NUM_HEMI_LIGHTS/g, Ec.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, Ec.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, Ec.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, Ec.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, Ec.numPointLightShadows);
            }
            function Fb(EL, Ec) {
                return EL.replace(/NUM_CLIPPING_PLANES/g, Ec.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, Ec.numClippingPlanes - Ec.numClipIntersection);
            }
            var FD = /^[ \t]*#include +<([\w\d./]+)>/gm;
            function Fu(EL) {
                return EL.replace(FD, E1);
            }
            var E0 = new Map([['encodings_fragment', 'colorspace_fragment'], ['encodings_pars_fragment', 'colorspace_pars_fragment'], ['output_fragment', 'opaque_fragment']]);
            function E1(EL, Ec) {
                var Eq = FY.v[Ec];
                if (void 0x0 === Eq) {
                    var Ef = E0.get(Ec);
                    if (void 0x0 === Ef)
                        throw new Error('Can\x20not\x20resolve\x20#include\x20<' + Ec + '>');
                    Eq = FY.v[Ef],
                    console.warn('THREE.WebGLRenderer:\x20Shader\x20chunk\x20\x22%s\x22\x20has\x20been\x20deprecated.\x20Use\x20\x22%s\x22\x20instead.', Ec, Ef);
                }
                return Fu(Eq);
            }
            var E2 = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
            function E3(EL) {
                return EL.replace(E2, E4);
            }
            function E4(EL, Ec, Eq, Ef) {
                for (var EK = '', EY = parseInt(Ec); EY < parseInt(Eq); EY++)
                    EK += Ef.replace(/\[\s*i\s*\]/g, '[\x20' + EY + '\x20]').replace(/UNROLLED_LOOP_INDEX/g, EY);
                return EK;
            }
            function E5(EL) {
                var Ec = 'precision\x20' + EL.precision + '\x20float;\x0aprecision\x20' + EL.precision + '\x20int;';
                return 'highp' === EL.precision ? Ec += '\x0a#define\x20HIGH_PRECISION' : 'mediump' === EL.precision ? Ec += '\x0a#define\x20MEDIUM_PRECISION' : 'lowp' === EL.precision && (Ec += '\x0a#define\x20LOW_PRECISION'),
                Ec;
            }
            function E6(EL, Ec, Eq, Ef) {
                var EK, EY, Ez = EL.getContext(), EA = Eq.defines, Ej = Eq.vertexShader, EO = Eq.fragmentShader, EJ = function(pF) {
                    var pE = 'SHADOWMAP_TYPE_BASIC';
                    return pF.shadowMapType === r4.QP0 ? pE = 'SHADOWMAP_TYPE_PCF' : pF.shadowMapType === r4.Wk7 ? pE = 'SHADOWMAP_TYPE_PCF_SOFT' : pF.shadowMapType === r4.RyA && (pE = 'SHADOWMAP_TYPE_VSM'),
                    pE;
                }(Eq), Ev = function(pF) {
                    var pE = 'ENVMAP_TYPE_CUBE';
                    if (pF.envMap)
                        switch (pF.envMapMode) {
                        case r4.hy7:
                        case r4.xFO:
                            pE = 'ENVMAP_TYPE_CUBE';
                            break;
                        case r4.Om:
                            pE = 'ENVMAP_TYPE_CUBE_UV';
                        }
                    return pE;
                }(Eq), En = function(pF) {
                    var pE = 'ENVMAP_MODE_REFLECTION';
                    return pF.envMap && pF.envMapMode === r4.xFO && (pE = 'ENVMAP_MODE_REFRACTION'),
                    pE;
                }(Eq), Eb = function(pF) {
                    var pE = 'ENVMAP_BLENDING_NONE';
                    if (pF.envMap)
                        switch (pF.combine) {
                        case r4.caT:
                            pE = 'ENVMAP_BLENDING_MULTIPLY';
                            break;
                        case r4.KRh:
                            pE = 'ENVMAP_BLENDING_MIX';
                            break;
                        case r4.XrR:
                            pE = 'ENVMAP_BLENDING_ADD';
                        }
                    return pE;
                }(Eq), ED = function(pF) {
                    var pE = pF.envMapCubeUVHeight;
                    if (null === pE)
                        return null;
                    var pp = Math.log2(pE) - 0x2
                      , pS = 0x1 / pE;
                    return {
                        'texelWidth': 0x1 / (0x3 * Math.max(Math.pow(0x2, pp), 0x70)),
                        'texelHeight': pS,
                        'maxMip': pp
                    };
                }(Eq), Eu = Eq.isWebGL2 ? '' : function(pF) {
                    return [pF.extensionDerivatives || pF.envMapCubeUVHeight || pF.bumpMap || pF.normalMapTangentSpace || pF.clearcoatNormalMap || pF.flatShading || 'physical' === pF.shaderID ? '#extension\x20GL_OES_standard_derivatives\x20:\x20enable' : '', (pF.extensionFragDepth || pF.logarithmicDepthBuffer) && pF.rendererExtensionFragDepth ? '#extension\x20GL_EXT_frag_depth\x20:\x20enable' : '', pF.extensionDrawBuffers && pF.rendererExtensionDrawBuffers ? '#extension\x20GL_EXT_draw_buffers\x20:\x20require' : '', (pF.extensionShaderTextureLOD || pF.envMap || pF.transmission) && pF.rendererExtensionShaderTextureLod ? '#extension\x20GL_EXT_shader_texture_lod\x20:\x20enable' : ''].filter(Fv).join('\x0a');
                }(Eq), p0 = function(pF) {
                    var pE = [];
                    for (var pp in pF) {
                        var pS = pF[pp];
                        !0x1 !== pS && pE.push('#define\x20' + pp + '\x20' + pS);
                    }
                    return pE.join('\x0a');
                }(EA), p1 = Ez.createProgram(), p2 = Eq.glslVersion ? '#version\x20' + Eq.glslVersion + '\x0a' : '';
                Eq.isRawShaderMaterial ? ((EK = ['#define\x20SHADER_TYPE\x20' + Eq.shaderType, '#define\x20SHADER_NAME\x20' + Eq.shaderName, p0].filter(Fv).join('\x0a')).length > 0x0 && (EK += '\x0a'),
                (EY = [Eu, '#define\x20SHADER_TYPE\x20' + Eq.shaderType, '#define\x20SHADER_NAME\x20' + Eq.shaderName, p0].filter(Fv).join('\x0a')).length > 0x0 && (EY += '\x0a')) : (EK = [E5(Eq), '#define\x20SHADER_TYPE\x20' + Eq.shaderType, '#define\x20SHADER_NAME\x20' + Eq.shaderName, p0, Eq.batching ? '#define\x20USE_BATCHING' : '', Eq.instancing ? '#define\x20USE_INSTANCING' : '', Eq.instancingColor ? '#define\x20USE_INSTANCING_COLOR' : '', Eq.useFog && Eq.fog ? '#define\x20USE_FOG' : '', Eq.useFog && Eq.fogExp2 ? '#define\x20FOG_EXP2' : '', Eq.map ? '#define\x20USE_MAP' : '', Eq.envMap ? '#define\x20USE_ENVMAP' : '', Eq.envMap ? '#define\x20' + En : '', Eq.lightMap ? '#define\x20USE_LIGHTMAP' : '', Eq.aoMap ? '#define\x20USE_AOMAP' : '', Eq.bumpMap ? '#define\x20USE_BUMPMAP' : '', Eq.normalMap ? '#define\x20USE_NORMALMAP' : '', Eq.normalMapObjectSpace ? '#define\x20USE_NORMALMAP_OBJECTSPACE' : '', Eq.normalMapTangentSpace ? '#define\x20USE_NORMALMAP_TANGENTSPACE' : '', Eq.displacementMap ? '#define\x20USE_DISPLACEMENTMAP' : '', Eq.emissiveMap ? '#define\x20USE_EMISSIVEMAP' : '', Eq.anisotropy ? '#define\x20USE_ANISOTROPY' : '', Eq.anisotropyMap ? '#define\x20USE_ANISOTROPYMAP' : '', Eq.clearcoatMap ? '#define\x20USE_CLEARCOATMAP' : '', Eq.clearcoatRoughnessMap ? '#define\x20USE_CLEARCOAT_ROUGHNESSMAP' : '', Eq.clearcoatNormalMap ? '#define\x20USE_CLEARCOAT_NORMALMAP' : '', Eq.iridescenceMap ? '#define\x20USE_IRIDESCENCEMAP' : '', Eq.iridescenceThicknessMap ? '#define\x20USE_IRIDESCENCE_THICKNESSMAP' : '', Eq.specularMap ? '#define\x20USE_SPECULARMAP' : '', Eq.specularColorMap ? '#define\x20USE_SPECULAR_COLORMAP' : '', Eq.specularIntensityMap ? '#define\x20USE_SPECULAR_INTENSITYMAP' : '', Eq.roughnessMap ? '#define\x20USE_ROUGHNESSMAP' : '', Eq.metalnessMap ? '#define\x20USE_METALNESSMAP' : '', Eq.alphaMap ? '#define\x20USE_ALPHAMAP' : '', Eq.alphaHash ? '#define\x20USE_ALPHAHASH' : '', Eq.transmission ? '#define\x20USE_TRANSMISSION' : '', Eq.transmissionMap ? '#define\x20USE_TRANSMISSIONMAP' : '', Eq.thicknessMap ? '#define\x20USE_THICKNESSMAP' : '', Eq.sheenColorMap ? '#define\x20USE_SHEEN_COLORMAP' : '', Eq.sheenRoughnessMap ? '#define\x20USE_SHEEN_ROUGHNESSMAP' : '', Eq.mapUv ? '#define\x20MAP_UV\x20' + Eq.mapUv : '', Eq.alphaMapUv ? '#define\x20ALPHAMAP_UV\x20' + Eq.alphaMapUv : '', Eq.lightMapUv ? '#define\x20LIGHTMAP_UV\x20' + Eq.lightMapUv : '', Eq.aoMapUv ? '#define\x20AOMAP_UV\x20' + Eq.aoMapUv : '', Eq.emissiveMapUv ? '#define\x20EMISSIVEMAP_UV\x20' + Eq.emissiveMapUv : '', Eq.bumpMapUv ? '#define\x20BUMPMAP_UV\x20' + Eq.bumpMapUv : '', Eq.normalMapUv ? '#define\x20NORMALMAP_UV\x20' + Eq.normalMapUv : '', Eq.displacementMapUv ? '#define\x20DISPLACEMENTMAP_UV\x20' + Eq.displacementMapUv : '', Eq.metalnessMapUv ? '#define\x20METALNESSMAP_UV\x20' + Eq.metalnessMapUv : '', Eq.roughnessMapUv ? '#define\x20ROUGHNESSMAP_UV\x20' + Eq.roughnessMapUv : '', Eq.anisotropyMapUv ? '#define\x20ANISOTROPYMAP_UV\x20' + Eq.anisotropyMapUv : '', Eq.clearcoatMapUv ? '#define\x20CLEARCOATMAP_UV\x20' + Eq.clearcoatMapUv : '', Eq.clearcoatNormalMapUv ? '#define\x20CLEARCOAT_NORMALMAP_UV\x20' + Eq.clearcoatNormalMapUv : '', Eq.clearcoatRoughnessMapUv ? '#define\x20CLEARCOAT_ROUGHNESSMAP_UV\x20' + Eq.clearcoatRoughnessMapUv : '', Eq.iridescenceMapUv ? '#define\x20IRIDESCENCEMAP_UV\x20' + Eq.iridescenceMapUv : '', Eq.iridescenceThicknessMapUv ? '#define\x20IRIDESCENCE_THICKNESSMAP_UV\x20' + Eq.iridescenceThicknessMapUv : '', Eq.sheenColorMapUv ? '#define\x20SHEEN_COLORMAP_UV\x20' + Eq.sheenColorMapUv : '', Eq.sheenRoughnessMapUv ? '#define\x20SHEEN_ROUGHNESSMAP_UV\x20' + Eq.sheenRoughnessMapUv : '', Eq.specularMapUv ? '#define\x20SPECULARMAP_UV\x20' + Eq.specularMapUv : '', Eq.specularColorMapUv ? '#define\x20SPECULAR_COLORMAP_UV\x20' + Eq.specularColorMapUv : '', Eq.specularIntensityMapUv ? '#define\x20SPECULAR_INTENSITYMAP_UV\x20' + Eq.specularIntensityMapUv : '', Eq.transmissionMapUv ? '#define\x20TRANSMISSIONMAP_UV\x20' + Eq.transmissionMapUv : '', Eq.thicknessMapUv ? '#define\x20THICKNESSMAP_UV\x20' + Eq.thicknessMapUv : '', Eq.vertexTangents && !0x1 === Eq.flatShading ? '#define\x20USE_TANGENT' : '', Eq.vertexColors ? '#define\x20USE_COLOR' : '', Eq.vertexAlphas ? '#define\x20USE_COLOR_ALPHA' : '', Eq.vertexUv1s ? '#define\x20USE_UV1' : '', Eq.vertexUv2s ? '#define\x20USE_UV2' : '', Eq.vertexUv3s ? '#define\x20USE_UV3' : '', Eq.pointsUvs ? '#define\x20USE_POINTS_UV' : '', Eq.flatShading ? '#define\x20FLAT_SHADED' : '', Eq.skinning ? '#define\x20USE_SKINNING' : '', Eq.morphTargets ? '#define\x20USE_MORPHTARGETS' : '', Eq.morphNormals && !0x1 === Eq.flatShading ? '#define\x20USE_MORPHNORMALS' : '', Eq.morphColors && Eq.isWebGL2 ? '#define\x20USE_MORPHCOLORS' : '', Eq.morphTargetsCount > 0x0 && Eq.isWebGL2 ? '#define\x20MORPHTARGETS_TEXTURE' : '', Eq.morphTargetsCount > 0x0 && Eq.isWebGL2 ? '#define\x20MORPHTARGETS_TEXTURE_STRIDE\x20' + Eq.morphTextureStride : '', Eq.morphTargetsCount > 0x0 && Eq.isWebGL2 ? '#define\x20MORPHTARGETS_COUNT\x20' + Eq.morphTargetsCount : '', Eq.doubleSided ? '#define\x20DOUBLE_SIDED' : '', Eq.flipSided ? '#define\x20FLIP_SIDED' : '', Eq.shadowMapEnabled ? '#define\x20USE_SHADOWMAP' : '', Eq.shadowMapEnabled ? '#define\x20' + EJ : '', Eq.sizeAttenuation ? '#define\x20USE_SIZEATTENUATION' : '', Eq.numLightProbes > 0x0 ? '#define\x20USE_LIGHT_PROBES' : '', Eq.useLegacyLights ? '#define\x20LEGACY_LIGHTS' : '', Eq.logarithmicDepthBuffer ? '#define\x20USE_LOGDEPTHBUF' : '', Eq.logarithmicDepthBuffer && Eq.rendererExtensionFragDepth ? '#define\x20USE_LOGDEPTHBUF_EXT' : '', 'uniform\x20mat4\x20modelMatrix;', 'uniform\x20mat4\x20modelViewMatrix;', 'uniform\x20mat4\x20projectionMatrix;', 'uniform\x20mat4\x20viewMatrix;', 'uniform\x20mat3\x20normalMatrix;', 'uniform\x20vec3\x20cameraPosition;', 'uniform\x20bool\x20isOrthographic;', '#ifdef\x20USE_INSTANCING', '\x09attribute\x20mat4\x20instanceMatrix;', '#endif', '#ifdef\x20USE_INSTANCING_COLOR', '\x09attribute\x20vec3\x20instanceColor;', '#endif', 'attribute\x20vec3\x20position;', 'attribute\x20vec3\x20normal;', 'attribute\x20vec2\x20uv;', '#ifdef\x20USE_UV1', '\x09attribute\x20vec2\x20uv1;', '#endif', '#ifdef\x20USE_UV2', '\x09attribute\x20vec2\x20uv2;', '#endif', '#ifdef\x20USE_UV3', '\x09attribute\x20vec2\x20uv3;', '#endif', '#ifdef\x20USE_TANGENT', '\x09attribute\x20vec4\x20tangent;', '#endif', '#if\x20defined(\x20USE_COLOR_ALPHA\x20)', '\x09attribute\x20vec4\x20color;', '#elif\x20defined(\x20USE_COLOR\x20)', '\x09attribute\x20vec3\x20color;', '#endif', '#if\x20(\x20defined(\x20USE_MORPHTARGETS\x20)\x20&&\x20!\x20defined(\x20MORPHTARGETS_TEXTURE\x20)\x20)', '\x09attribute\x20vec3\x20morphTarget0;', '\x09attribute\x20vec3\x20morphTarget1;', '\x09attribute\x20vec3\x20morphTarget2;', '\x09attribute\x20vec3\x20morphTarget3;', '\x09#ifdef\x20USE_MORPHNORMALS', '\x09\x09attribute\x20vec3\x20morphNormal0;', '\x09\x09attribute\x20vec3\x20morphNormal1;', '\x09\x09attribute\x20vec3\x20morphNormal2;', '\x09\x09attribute\x20vec3\x20morphNormal3;', '\x09#else', '\x09\x09attribute\x20vec3\x20morphTarget4;', '\x09\x09attribute\x20vec3\x20morphTarget5;', '\x09\x09attribute\x20vec3\x20morphTarget6;', '\x09\x09attribute\x20vec3\x20morphTarget7;', '\x09#endif', '#endif', '#ifdef\x20USE_SKINNING', '\x09attribute\x20vec4\x20skinIndex;', '\x09attribute\x20vec4\x20skinWeight;', '#endif', '\x0a'].filter(Fv).join('\x0a'),
                EY = [Eu, E5(Eq), '#define\x20SHADER_TYPE\x20' + Eq.shaderType, '#define\x20SHADER_NAME\x20' + Eq.shaderName, p0, Eq.useFog && Eq.fog ? '#define\x20USE_FOG' : '', Eq.useFog && Eq.fogExp2 ? '#define\x20FOG_EXP2' : '', Eq.map ? '#define\x20USE_MAP' : '', Eq.matcap ? '#define\x20USE_MATCAP' : '', Eq.envMap ? '#define\x20USE_ENVMAP' : '', Eq.envMap ? '#define\x20' + Ev : '', Eq.envMap ? '#define\x20' + En : '', Eq.envMap ? '#define\x20' + Eb : '', ED ? '#define\x20CUBEUV_TEXEL_WIDTH\x20' + ED.texelWidth : '', ED ? '#define\x20CUBEUV_TEXEL_HEIGHT\x20' + ED.texelHeight : '', ED ? '#define\x20CUBEUV_MAX_MIP\x20' + ED.maxMip + '.0' : '', Eq.lightMap ? '#define\x20USE_LIGHTMAP' : '', Eq.aoMap ? '#define\x20USE_AOMAP' : '', Eq.bumpMap ? '#define\x20USE_BUMPMAP' : '', Eq.normalMap ? '#define\x20USE_NORMALMAP' : '', Eq.normalMapObjectSpace ? '#define\x20USE_NORMALMAP_OBJECTSPACE' : '', Eq.normalMapTangentSpace ? '#define\x20USE_NORMALMAP_TANGENTSPACE' : '', Eq.emissiveMap ? '#define\x20USE_EMISSIVEMAP' : '', Eq.anisotropy ? '#define\x20USE_ANISOTROPY' : '', Eq.anisotropyMap ? '#define\x20USE_ANISOTROPYMAP' : '', Eq.clearcoat ? '#define\x20USE_CLEARCOAT' : '', Eq.clearcoatMap ? '#define\x20USE_CLEARCOATMAP' : '', Eq.clearcoatRoughnessMap ? '#define\x20USE_CLEARCOAT_ROUGHNESSMAP' : '', Eq.clearcoatNormalMap ? '#define\x20USE_CLEARCOAT_NORMALMAP' : '', Eq.iridescence ? '#define\x20USE_IRIDESCENCE' : '', Eq.iridescenceMap ? '#define\x20USE_IRIDESCENCEMAP' : '', Eq.iridescenceThicknessMap ? '#define\x20USE_IRIDESCENCE_THICKNESSMAP' : '', Eq.specularMap ? '#define\x20USE_SPECULARMAP' : '', Eq.specularColorMap ? '#define\x20USE_SPECULAR_COLORMAP' : '', Eq.specularIntensityMap ? '#define\x20USE_SPECULAR_INTENSITYMAP' : '', Eq.roughnessMap ? '#define\x20USE_ROUGHNESSMAP' : '', Eq.metalnessMap ? '#define\x20USE_METALNESSMAP' : '', Eq.alphaMap ? '#define\x20USE_ALPHAMAP' : '', Eq.alphaTest ? '#define\x20USE_ALPHATEST' : '', Eq.alphaHash ? '#define\x20USE_ALPHAHASH' : '', Eq.sheen ? '#define\x20USE_SHEEN' : '', Eq.sheenColorMap ? '#define\x20USE_SHEEN_COLORMAP' : '', Eq.sheenRoughnessMap ? '#define\x20USE_SHEEN_ROUGHNESSMAP' : '', Eq.transmission ? '#define\x20USE_TRANSMISSION' : '', Eq.transmissionMap ? '#define\x20USE_TRANSMISSIONMAP' : '', Eq.thicknessMap ? '#define\x20USE_THICKNESSMAP' : '', Eq.vertexTangents && !0x1 === Eq.flatShading ? '#define\x20USE_TANGENT' : '', Eq.vertexColors || Eq.instancingColor ? '#define\x20USE_COLOR' : '', Eq.vertexAlphas ? '#define\x20USE_COLOR_ALPHA' : '', Eq.vertexUv1s ? '#define\x20USE_UV1' : '', Eq.vertexUv2s ? '#define\x20USE_UV2' : '', Eq.vertexUv3s ? '#define\x20USE_UV3' : '', Eq.pointsUvs ? '#define\x20USE_POINTS_UV' : '', Eq.gradientMap ? '#define\x20USE_GRADIENTMAP' : '', Eq.flatShading ? '#define\x20FLAT_SHADED' : '', Eq.doubleSided ? '#define\x20DOUBLE_SIDED' : '', Eq.flipSided ? '#define\x20FLIP_SIDED' : '', Eq.shadowMapEnabled ? '#define\x20USE_SHADOWMAP' : '', Eq.shadowMapEnabled ? '#define\x20' + EJ : '', Eq.premultipliedAlpha ? '#define\x20PREMULTIPLIED_ALPHA' : '', Eq.numLightProbes > 0x0 ? '#define\x20USE_LIGHT_PROBES' : '', Eq.useLegacyLights ? '#define\x20LEGACY_LIGHTS' : '', Eq.decodeVideoTexture ? '#define\x20DECODE_VIDEO_TEXTURE' : '', Eq.logarithmicDepthBuffer ? '#define\x20USE_LOGDEPTHBUF' : '', Eq.logarithmicDepthBuffer && Eq.rendererExtensionFragDepth ? '#define\x20USE_LOGDEPTHBUF_EXT' : '', 'uniform\x20mat4\x20viewMatrix;', 'uniform\x20vec3\x20cameraPosition;', 'uniform\x20bool\x20isOrthographic;', Eq.toneMapping !== r4.y_p ? '#define\x20TONE_MAPPING' : '', Eq.toneMapping !== r4.y_p ? FY.v.tonemapping_pars_fragment : '', Eq.toneMapping !== r4.y_p ? FJ('toneMapping', Eq.toneMapping) : '', Eq.dithering ? '#define\x20DITHERING' : '', Eq.opaque ? '#define\x20OPAQUE' : '', FY.v.colorspace_pars_fragment, FO('linearToOutputTexel', Eq.outputColorSpace), Eq.useDepthPacking ? '#define\x20DEPTH_PACKING\x20' + Eq.depthPacking : '', '\x0a'].filter(Fv).join('\x0a')),
                Ej = Fb(Ej = Fn(Ej = Fu(Ej), Eq), Eq),
                EO = Fb(EO = Fn(EO = Fu(EO), Eq), Eq),
                Ej = E3(Ej),
                EO = E3(EO),
                Eq.isWebGL2 && !0x0 !== Eq.isRawShaderMaterial && (p2 = '#version\x20300\x20es\x0a',
                EK = ['precision\x20mediump\x20sampler2DArray;', '#define\x20attribute\x20in', '#define\x20varying\x20out', '#define\x20texture2D\x20texture'].join('\x0a') + '\x0a' + EK,
                EY = ['precision\x20mediump\x20sampler2DArray;', '#define\x20varying\x20in', Eq.glslVersion === r4.Wdf ? '' : 'layout(location\x20=\x200)\x20out\x20highp\x20vec4\x20pc_fragColor;', Eq.glslVersion === r4.Wdf ? '' : '#define\x20gl_FragColor\x20pc_fragColor', '#define\x20gl_FragDepthEXT\x20gl_FragDepth', '#define\x20texture2D\x20texture', '#define\x20textureCube\x20texture', '#define\x20texture2DProj\x20textureProj', '#define\x20texture2DLodEXT\x20textureLod', '#define\x20texture2DProjLodEXT\x20textureProjLod', '#define\x20textureCubeLodEXT\x20textureLod', '#define\x20texture2DGradEXT\x20textureGrad', '#define\x20texture2DProjGradEXT\x20textureProjGrad', '#define\x20textureCubeGradEXT\x20textureGrad'].join('\x0a') + '\x0a' + EY);
                var p3, p4, p5 = p2 + EK + Ej, p6 = p2 + EY + EO, p7 = (0x0,
                FK.n)(Ez, Ez.VERTEX_SHADER, p5), p8 = (0x0,
                FK.n)(Ez, Ez.FRAGMENT_SHADER, p6);
                function p9(pF) {
                    if (EL.debug.checkShaderErrors) {
                        var pE = Ez.getProgramInfoLog(p1).trim()
                          , pp = Ez.getShaderInfoLog(p7).trim()
                          , pS = Ez.getShaderInfoLog(p8).trim()
                          , pR = !0x0
                          , pH = !0x0;
                        if (!0x1 === Ez.getProgramParameter(p1, Ez.LINK_STATUS)) {
                            if (pR = !0x1,
                            'function' == typeof EL.debug.onShaderError)
                                EL.debug.onShaderError(Ez, p1, p7, p8);
                            else {
                                var py = Fj(Ez, p7, 'vertex')
                                  , pd = Fj(Ez, p8, 'fragment');
                                console.error('THREE.WebGLProgram:\x20Shader\x20Error\x20' + Ez.getError() + '\x20-\x20VALIDATE_STATUS\x20' + Ez.getProgramParameter(p1, Ez.VALIDATE_STATUS) + '\x0a\x0aProgram\x20Info\x20Log:\x20' + pE + '\x0a' + py + '\x0a' + pd);
                            }
                        } else
                            '' !== pE ? console.warn('THREE.WebGLProgram:\x20Program\x20Info\x20Log:', pE) : '' !== pp && '' !== pS || (pH = !0x1);
                        pH && (pF.diagnostics = {
                            'runnable': pR,
                            'programLog': pE,
                            'vertexShader': {
                                'log': pp,
                                'prefix': EK
                            },
                            'fragmentShader': {
                                'log': pS,
                                'prefix': EY
                            }
                        });
                    }
                    Ez.deleteShader(p7),
                    Ez.deleteShader(p8),
                    p3 = new Ff(Ez,p1),
                    p4 = function(pP, pQ) {
                        for (var pB = {}, pM = pP.getProgramParameter(pQ, pP.ACTIVE_ATTRIBUTES), pX = 0x0; pX < pM; pX++) {
                            var pm = pP.getActiveAttrib(pQ, pX)
                              , pw = pm.name
                              , pl = 0x1;
                            pm.type === pP.FLOAT_MAT2 && (pl = 0x2),
                            pm.type === pP.FLOAT_MAT3 && (pl = 0x3),
                            pm.type === pP.FLOAT_MAT4 && (pl = 0x4),
                            pB[pw] = {
                                'type': pm.type,
                                'location': pP.getAttribLocation(pQ, pw),
                                'locationSize': pl
                            };
                        }
                        return pB;
                    }(Ez, p1);
                }
                Ez.attachShader(p1, p7),
                Ez.attachShader(p1, p8),
                void 0x0 !== Eq.index0AttributeName ? Ez.bindAttribLocation(p1, 0x0, Eq.index0AttributeName) : !0x0 === Eq.morphTargets && Ez.bindAttribLocation(p1, 0x0, 'position'),
                Ez.linkProgram(p1),
                this.getUniforms = function() {
                    return void 0x0 === p3 && p9(this),
                    p3;
                }
                ,
                this.getAttributes = function() {
                    return void 0x0 === p4 && p9(this),
                    p4;
                }
                ;
                var pr = !0x1 === Eq.rendererExtensionParallelShaderCompile;
                return this.isReady = function() {
                    return !0x1 === pr && (pr = Ez.getProgramParameter(p1, Fz)),
                    pr;
                }
                ,
                this.destroy = function() {
                    Ef.releaseStatesOfProgram(this),
                    Ez.deleteProgram(p1),
                    this.program = void 0x0;
                }
                ,
                this.type = Eq.shaderType,
                this.name = Eq.shaderName,
                this.id = FA++,
                this.cacheKey = Ec,
                this.usedTimes = 0x1,
                this.program = p1,
                this.vertexShader = p7,
                this.fragmentShader = p8,
                this;
            }
            var E7 = r2(0x2106);
            function E8(EL, Ec, Eq, Ef, EK, EY, Ez) {
                var EA = new rL.z()
                  , Ej = new E7.j()
                  , EO = []
                  , EJ = EK.isWebGL2
                  , Ev = EK.logarithmicDepthBuffer
                  , En = EK.vertexTextures
                  , Eb = EK.precision
                  , ED = {
                    'MeshDepthMaterial': 'depth',
                    'MeshDistanceMaterial': 'distanceRGBA',
                    'MeshNormalMaterial': 'normal',
                    'MeshBasicMaterial': 'basic',
                    'MeshLambertMaterial': 'lambert',
                    'MeshPhongMaterial': 'phong',
                    'MeshToonMaterial': 'toon',
                    'MeshStandardMaterial': 'physical',
                    'MeshPhysicalMaterial': 'physical',
                    'MeshMatcapMaterial': 'matcap',
                    'LineBasicMaterial': 'basic',
                    'LineDashedMaterial': 'dashed',
                    'PointsMaterial': 'points',
                    'ShadowMaterial': 'shadow',
                    'SpriteMaterial': 'sprite'
                };
                function Eu(p0) {
                    return 0x0 === p0 ? 'uv' : 'uv' + p0;
                }
                return {
                    'getParameters': function(p0, p1, p2, p3, p4) {
                        var p5 = p3.fog
                          , p6 = p4.geometry
                          , p7 = p0.isMeshStandardMaterial ? p3.environment : null
                          , p8 = (p0.isMeshStandardMaterial ? Eq : Ec).get(p0.envMap || p7)
                          , p9 = p8 && p8.mapping === r4.Om ? p8.image.height : null
                          , pr = ED[p0.type];
                        null !== p0.precision && (Eb = EK.getMaxPrecision(p0.precision)) !== p0.precision && console.warn('THREE.WebGLProgram.getParameters:', p0.precision, 'not\x20supported,\x20using', Eb, 'instead.');
                        var pF, pE, pp, pS, pR = p6.morphAttributes.position || p6.morphAttributes.normal || p6.morphAttributes.color, pH = void 0x0 !== pR ? pR.length : 0x0, py = 0x0;
                        if (void 0x0 !== p6.morphAttributes.position && (py = 0x1),
                        void 0x0 !== p6.morphAttributes.normal && (py = 0x2),
                        void 0x0 !== p6.morphAttributes.color && (py = 0x3),
                        pr) {
                            var pd = rP.z[pr];
                            pF = pd.vertexShader,
                            pE = pd.fragmentShader;
                        } else
                            pF = p0.vertexShader,
                            pE = p0.fragmentShader,
                            Ej.update(p0),
                            pp = Ej.getVertexShaderID(p0),
                            pS = Ej.getFragmentShaderID(p0);
                        var pP = EL.getRenderTarget()
                          , pQ = !0x0 === p4.isInstancedMesh
                          , pB = !0x0 === p4.isBatchedMesh
                          , pM = !!p0.map
                          , pX = !!p0.matcap
                          , pm = !!p8
                          , pw = !!p0.aoMap
                          , pl = !!p0.lightMap
                          , pC = !!p0.bumpMap
                          , pN = !!p0.normalMap
                          , pZ = !!p0.displacementMap
                          , ph = !!p0.emissiveMap
                          , po = !!p0.metalnessMap
                          , pU = !!p0.roughnessMap
                          , pi = p0.anisotropy > 0x0
                          , pT = p0.clearcoat > 0x0
                          , pV = p0.iridescence > 0x0
                          , ps = p0.sheen > 0x0
                          , pG = p0.transmission > 0x0
                          , pk = pi && !!p0.anisotropyMap
                          , pW = pT && !!p0.clearcoatMap
                          , px = pT && !!p0.clearcoatNormalMap
                          , pa = pT && !!p0.clearcoatRoughnessMap
                          , pI = pV && !!p0.iridescenceMap
                          , pg = pV && !!p0.iridescenceThicknessMap
                          , pL = ps && !!p0.sheenColorMap
                          , pc = ps && !!p0.sheenRoughnessMap
                          , pq = !!p0.specularMap
                          , pf = !!p0.specularColorMap
                          , pK = !!p0.specularIntensityMap
                          , pY = pG && !!p0.transmissionMap
                          , pz = pG && !!p0.thicknessMap
                          , pA = !!p0.gradientMap
                          , pj = !!p0.alphaMap
                          , pO = p0.alphaTest > 0x0
                          , pJ = !!p0.alphaHash
                          , pv = !!p0.extensions
                          , pn = !!p6.attributes.uv1
                          , pb = !!p6.attributes.uv2
                          , pD = !!p6.attributes.uv3
                          , pu = r4.y_p;
                        return p0.toneMapped && (null !== pP && !0x0 !== pP.isXRRenderTarget || (pu = EL.toneMapping)),
                        {
                            'isWebGL2': EJ,
                            'shaderID': pr,
                            'shaderType': p0.type,
                            'shaderName': p0.name,
                            'vertexShader': pF,
                            'fragmentShader': pE,
                            'defines': p0.defines,
                            'customVertexShaderID': pp,
                            'customFragmentShaderID': pS,
                            'isRawShaderMaterial': !0x0 === p0.isRawShaderMaterial,
                            'glslVersion': p0.glslVersion,
                            'precision': Eb,
                            'batching': pB,
                            'instancing': pQ,
                            'instancingColor': pQ && null !== p4.instanceColor,
                            'supportsVertexTextures': En,
                            'outputColorSpace': null === pP ? EL.outputColorSpace : !0x0 === pP.isXRRenderTarget ? pP.texture.colorSpace : r4.Zr2,
                            'map': pM,
                            'matcap': pX,
                            'envMap': pm,
                            'envMapMode': pm && p8.mapping,
                            'envMapCubeUVHeight': p9,
                            'aoMap': pw,
                            'lightMap': pl,
                            'bumpMap': pC,
                            'normalMap': pN,
                            'displacementMap': En && pZ,
                            'emissiveMap': ph,
                            'normalMapObjectSpace': pN && p0.normalMapType === r4.vyJ,
                            'normalMapTangentSpace': pN && p0.normalMapType === r4.bI3,
                            'metalnessMap': po,
                            'roughnessMap': pU,
                            'anisotropy': pi,
                            'anisotropyMap': pk,
                            'clearcoat': pT,
                            'clearcoatMap': pW,
                            'clearcoatNormalMap': px,
                            'clearcoatRoughnessMap': pa,
                            'iridescence': pV,
                            'iridescenceMap': pI,
                            'iridescenceThicknessMap': pg,
                            'sheen': ps,
                            'sheenColorMap': pL,
                            'sheenRoughnessMap': pc,
                            'specularMap': pq,
                            'specularColorMap': pf,
                            'specularIntensityMap': pK,
                            'transmission': pG,
                            'transmissionMap': pY,
                            'thicknessMap': pz,
                            'gradientMap': pA,
                            'opaque': !0x1 === p0.transparent && p0.blending === r4.NTi,
                            'alphaMap': pj,
                            'alphaTest': pO,
                            'alphaHash': pJ,
                            'combine': p0.combine,
                            'mapUv': pM && Eu(p0.map.channel),
                            'aoMapUv': pw && Eu(p0.aoMap.channel),
                            'lightMapUv': pl && Eu(p0.lightMap.channel),
                            'bumpMapUv': pC && Eu(p0.bumpMap.channel),
                            'normalMapUv': pN && Eu(p0.normalMap.channel),
                            'displacementMapUv': pZ && Eu(p0.displacementMap.channel),
                            'emissiveMapUv': ph && Eu(p0.emissiveMap.channel),
                            'metalnessMapUv': po && Eu(p0.metalnessMap.channel),
                            'roughnessMapUv': pU && Eu(p0.roughnessMap.channel),
                            'anisotropyMapUv': pk && Eu(p0.anisotropyMap.channel),
                            'clearcoatMapUv': pW && Eu(p0.clearcoatMap.channel),
                            'clearcoatNormalMapUv': px && Eu(p0.clearcoatNormalMap.channel),
                            'clearcoatRoughnessMapUv': pa && Eu(p0.clearcoatRoughnessMap.channel),
                            'iridescenceMapUv': pI && Eu(p0.iridescenceMap.channel),
                            'iridescenceThicknessMapUv': pg && Eu(p0.iridescenceThicknessMap.channel),
                            'sheenColorMapUv': pL && Eu(p0.sheenColorMap.channel),
                            'sheenRoughnessMapUv': pc && Eu(p0.sheenRoughnessMap.channel),
                            'specularMapUv': pq && Eu(p0.specularMap.channel),
                            'specularColorMapUv': pf && Eu(p0.specularColorMap.channel),
                            'specularIntensityMapUv': pK && Eu(p0.specularIntensityMap.channel),
                            'transmissionMapUv': pY && Eu(p0.transmissionMap.channel),
                            'thicknessMapUv': pz && Eu(p0.thicknessMap.channel),
                            'alphaMapUv': pj && Eu(p0.alphaMap.channel),
                            'vertexTangents': !!p6.attributes.tangent && (pN || pi),
                            'vertexColors': p0.vertexColors,
                            'vertexAlphas': !0x0 === p0.vertexColors && !!p6.attributes.color && 0x4 === p6.attributes.color.itemSize,
                            'vertexUv1s': pn,
                            'vertexUv2s': pb,
                            'vertexUv3s': pD,
                            'pointsUvs': !0x0 === p4.isPoints && !!p6.attributes.uv && (pM || pj),
                            'fog': !!p5,
                            'useFog': !0x0 === p0.fog,
                            'fogExp2': p5 && p5.isFogExp2,
                            'flatShading': !0x0 === p0.flatShading,
                            'sizeAttenuation': !0x0 === p0.sizeAttenuation,
                            'logarithmicDepthBuffer': Ev,
                            'skinning': !0x0 === p4.isSkinnedMesh,
                            'morphTargets': void 0x0 !== p6.morphAttributes.position,
                            'morphNormals': void 0x0 !== p6.morphAttributes.normal,
                            'morphColors': void 0x0 !== p6.morphAttributes.color,
                            'morphTargetsCount': pH,
                            'morphTextureStride': py,
                            'numDirLights': p1.directional.length,
                            'numPointLights': p1.point.length,
                            'numSpotLights': p1.spot.length,
                            'numSpotLightMaps': p1.spotLightMap.length,
                            'numRectAreaLights': p1.rectArea.length,
                            'numHemiLights': p1.hemi.length,
                            'numDirLightShadows': p1.directionalShadowMap.length,
                            'numPointLightShadows': p1.pointShadowMap.length,
                            'numSpotLightShadows': p1.spotShadowMap.length,
                            'numSpotLightShadowsWithMaps': p1.numSpotLightShadowsWithMaps,
                            'numLightProbes': p1.numLightProbes,
                            'numClippingPlanes': Ez.numPlanes,
                            'numClipIntersection': Ez.numIntersection,
                            'dithering': p0.dithering,
                            'shadowMapEnabled': EL.shadowMap.enabled && p2.length > 0x0,
                            'shadowMapType': EL.shadowMap.type,
                            'toneMapping': pu,
                            'useLegacyLights': EL._useLegacyLights,
                            'decodeVideoTexture': pM && !0x0 === p0.map.isVideoTexture && ry.pp.getTransfer(p0.map.colorSpace) === r4.KLL,
                            'premultipliedAlpha': p0.premultipliedAlpha,
                            'doubleSided': p0.side === r4.$EB,
                            'flipSided': p0.side === r4.hsX,
                            'useDepthPacking': p0.depthPacking >= 0x0,
                            'depthPacking': p0.depthPacking || 0x0,
                            'index0AttributeName': p0.index0AttributeName,
                            'extensionDerivatives': pv && !0x0 === p0.extensions.derivatives,
                            'extensionFragDepth': pv && !0x0 === p0.extensions.fragDepth,
                            'extensionDrawBuffers': pv && !0x0 === p0.extensions.drawBuffers,
                            'extensionShaderTextureLOD': pv && !0x0 === p0.extensions.shaderTextureLOD,
                            'rendererExtensionFragDepth': EJ || Ef.has('EXT_frag_depth'),
                            'rendererExtensionDrawBuffers': EJ || Ef.has('WEBGL_draw_buffers'),
                            'rendererExtensionShaderTextureLod': EJ || Ef.has('EXT_shader_texture_lod'),
                            'rendererExtensionParallelShaderCompile': Ef.has('KHR_parallel_shader_compile'),
                            'customProgramCacheKey': p0.customProgramCacheKey()
                        };
                    },
                    'getProgramCacheKey': function(p0) {
                        var p1 = [];
                        if (p0.shaderID ? p1.push(p0.shaderID) : (p1.push(p0.customVertexShaderID),
                        p1.push(p0.customFragmentShaderID)),
                        void 0x0 !== p0.defines) {
                            for (var p2 in p0.defines)
                                p1.push(p2),
                                p1.push(p0.defines[p2]);
                        }
                        return !0x1 === p0.isRawShaderMaterial && (!function(p3, p4) {
                            p3.push(p4.precision),
                            p3.push(p4.outputColorSpace),
                            p3.push(p4.envMapMode),
                            p3.push(p4.envMapCubeUVHeight),
                            p3.push(p4.mapUv),
                            p3.push(p4.alphaMapUv),
                            p3.push(p4.lightMapUv),
                            p3.push(p4.aoMapUv),
                            p3.push(p4.bumpMapUv),
                            p3.push(p4.normalMapUv),
                            p3.push(p4.displacementMapUv),
                            p3.push(p4.emissiveMapUv),
                            p3.push(p4.metalnessMapUv),
                            p3.push(p4.roughnessMapUv),
                            p3.push(p4.anisotropyMapUv),
                            p3.push(p4.clearcoatMapUv),
                            p3.push(p4.clearcoatNormalMapUv),
                            p3.push(p4.clearcoatRoughnessMapUv),
                            p3.push(p4.iridescenceMapUv),
                            p3.push(p4.iridescenceThicknessMapUv),
                            p3.push(p4.sheenColorMapUv),
                            p3.push(p4.sheenRoughnessMapUv),
                            p3.push(p4.specularMapUv),
                            p3.push(p4.specularColorMapUv),
                            p3.push(p4.specularIntensityMapUv),
                            p3.push(p4.transmissionMapUv),
                            p3.push(p4.thicknessMapUv),
                            p3.push(p4.combine),
                            p3.push(p4.fogExp2),
                            p3.push(p4.sizeAttenuation),
                            p3.push(p4.morphTargetsCount),
                            p3.push(p4.morphAttributeCount),
                            p3.push(p4.numDirLights),
                            p3.push(p4.numPointLights),
                            p3.push(p4.numSpotLights),
                            p3.push(p4.numSpotLightMaps),
                            p3.push(p4.numHemiLights),
                            p3.push(p4.numRectAreaLights),
                            p3.push(p4.numDirLightShadows),
                            p3.push(p4.numPointLightShadows),
                            p3.push(p4.numSpotLightShadows),
                            p3.push(p4.numSpotLightShadowsWithMaps),
                            p3.push(p4.numLightProbes),
                            p3.push(p4.shadowMapType),
                            p3.push(p4.toneMapping),
                            p3.push(p4.numClippingPlanes),
                            p3.push(p4.numClipIntersection),
                            p3.push(p4.depthPacking);
                        }(p1, p0),
                        function(p3, p4) {
                            EA.disableAll(),
                            p4.isWebGL2 && EA.enable(0x0),
                            p4.supportsVertexTextures && EA.enable(0x1),
                            p4.instancing && EA.enable(0x2),
                            p4.instancingColor && EA.enable(0x3),
                            p4.matcap && EA.enable(0x4),
                            p4.envMap && EA.enable(0x5),
                            p4.normalMapObjectSpace && EA.enable(0x6),
                            p4.normalMapTangentSpace && EA.enable(0x7),
                            p4.clearcoat && EA.enable(0x8),
                            p4.iridescence && EA.enable(0x9),
                            p4.alphaTest && EA.enable(0xa),
                            p4.vertexColors && EA.enable(0xb),
                            p4.vertexAlphas && EA.enable(0xc),
                            p4.vertexUv1s && EA.enable(0xd),
                            p4.vertexUv2s && EA.enable(0xe),
                            p4.vertexUv3s && EA.enable(0xf),
                            p4.vertexTangents && EA.enable(0x10),
                            p4.anisotropy && EA.enable(0x11),
                            p4.alphaHash && EA.enable(0x12),
                            p4.batching && EA.enable(0x13),
                            (p3.push(EA.mask),
                            EA.disableAll(),
                            p4.fog && EA.enable(0x0)),
                            p4.useFog && EA.enable(0x1),
                            p4.flatShading && EA.enable(0x2),
                            p4.logarithmicDepthBuffer && EA.enable(0x3),
                            p4.skinning && EA.enable(0x4),
                            p4.morphTargets && EA.enable(0x5),
                            p4.morphNormals && EA.enable(0x6),
                            p4.morphColors && EA.enable(0x7),
                            p4.premultipliedAlpha && EA.enable(0x8),
                            p4.shadowMapEnabled && EA.enable(0x9),
                            p4.useLegacyLights && EA.enable(0xa),
                            p4.doubleSided && EA.enable(0xb),
                            p4.flipSided && EA.enable(0xc),
                            p4.useDepthPacking && EA.enable(0xd),
                            p4.dithering && EA.enable(0xe),
                            p4.transmission && EA.enable(0xf),
                            p4.sheen && EA.enable(0x10),
                            p4.opaque && EA.enable(0x11),
                            p4.pointsUvs && EA.enable(0x12),
                            p4.decodeVideoTexture && EA.enable(0x13),
                            p3.push(EA.mask);
                        }(p1, p0),
                        p1.push(EL.outputColorSpace)),
                        p1.push(p0.customProgramCacheKey),
                        p1.join();
                    },
                    'getUniforms': function(p0) {
                        var p1, p2 = ED[p0.type];
                        if (p2) {
                            var p3 = rP.z[p2];
                            p1 = rQ.Ll.clone(p3.uniforms);
                        } else
                            p1 = p0.uniforms;
                        return p1;
                    },
                    'acquireProgram': function(p0, p1) {
                        for (var p2, p3 = 0x0, p4 = EO.length; p3 < p4; p3++) {
                            var p5 = EO[p3];
                            if (p5.cacheKey === p1) {
                                ++(p2 = p5).usedTimes;
                                break;
                            }
                        }
                        return void 0x0 === p2 && (p2 = new E6(EL,p1,p0,EY),
                        EO.push(p2)),
                        p2;
                    },
                    'releaseProgram': function(p0) {
                        if (0x0 == --p0.usedTimes) {
                            var p1 = EO.indexOf(p0);
                            EO[p1] = EO[EO.length - 0x1],
                            EO.pop(),
                            p0.destroy();
                        }
                    },
                    'releaseShaderCache': function(p0) {
                        Ej.remove(p0);
                    },
                    'programs': EO,
                    'dispose': function() {
                        Ej.dispose();
                    }
                };
            }
            var E9 = r2(0xbaa2)
              , Er = r2(0xac6)
              , EF = r2(0x58c9);
            function EE() {
                var EL = {};
                return {
                    'get': function(Ec) {
                        if (void 0x0 !== EL[Ec.id])
                            return EL[Ec.id];
                        var Eq;
                        switch (Ec.type) {
                        case 'DirectionalLight':
                            Eq = {
                                'direction': new r9.P(),
                                'color': new r5.Q()
                            };
                            break;
                        case 'SpotLight':
                            Eq = {
                                'position': new r9.P(),
                                'direction': new r9.P(),
                                'color': new r5.Q(),
                                'distance': 0x0,
                                'coneCos': 0x0,
                                'penumbraCos': 0x0,
                                'decay': 0x0
                            };
                            break;
                        case 'PointLight':
                            Eq = {
                                'position': new r9.P(),
                                'color': new r5.Q(),
                                'distance': 0x0,
                                'decay': 0x0
                            };
                            break;
                        case 'HemisphereLight':
                            Eq = {
                                'direction': new r9.P(),
                                'skyColor': new r5.Q(),
                                'groundColor': new r5.Q()
                            };
                            break;
                        case 'RectAreaLight':
                            Eq = {
                                'color': new r5.Q(),
                                'position': new r9.P(),
                                'halfWidth': new r9.P(),
                                'halfHeight': new r9.P()
                            };
                        }
                        return EL[Ec.id] = Eq,
                        Eq;
                    }
                };
            }
            var Ep = 0x0;
            function ES(EL, Ec) {
                return (Ec.castShadow ? 0x2 : 0x0) - (EL.castShadow ? 0x2 : 0x0) + (Ec.map ? 0x1 : 0x0) - (EL.map ? 0x1 : 0x0);
            }
            function ER(EL, Ec) {
                for (var Eq, Ef = new EE(), EK = (Eq = {},
                {
                    'get': function(EJ) {
                        if (void 0x0 !== Eq[EJ.id])
                            return Eq[EJ.id];
                        var Ev;
                        switch (EJ.type) {
                        case 'DirectionalLight':
                        case 'SpotLight':
                            Ev = {
                                'shadowBias': 0x0,
                                'shadowNormalBias': 0x0,
                                'shadowRadius': 0x1,
                                'shadowMapSize': new r8.I()
                            };
                            break;
                        case 'PointLight':
                            Ev = {
                                'shadowBias': 0x0,
                                'shadowNormalBias': 0x0,
                                'shadowRadius': 0x1,
                                'shadowMapSize': new r8.I(),
                                'shadowCameraNear': 0x1,
                                'shadowCameraFar': 0x3e8
                            };
                        }
                        return Eq[EJ.id] = Ev,
                        Ev;
                    }
                }), EY = {
                    'version': 0x0,
                    'hash': {
                        'directionalLength': -0x1,
                        'pointLength': -0x1,
                        'spotLength': -0x1,
                        'rectAreaLength': -0x1,
                        'hemiLength': -0x1,
                        'numDirectionalShadows': -0x1,
                        'numPointShadows': -0x1,
                        'numSpotShadows': -0x1,
                        'numSpotMaps': -0x1,
                        'numLightProbes': -0x1
                    },
                    'ambient': [0x0, 0x0, 0x0],
                    'probe': [],
                    'directional': [],
                    'directionalShadow': [],
                    'directionalShadowMap': [],
                    'directionalShadowMatrix': [],
                    'spot': [],
                    'spotLightMap': [],
                    'spotShadow': [],
                    'spotShadowMap': [],
                    'spotLightMatrix': [],
                    'rectArea': [],
                    'rectAreaLTC1': null,
                    'rectAreaLTC2': null,
                    'point': [],
                    'pointShadow': [],
                    'pointShadowMap': [],
                    'pointShadowMatrix': [],
                    'hemi': [],
                    'numSpotLightShadowsWithMaps': 0x0,
                    'numLightProbes': 0x0
                }, Ez = 0x0; Ez < 0x9; Ez++)
                    EY.probe.push(new r9.P());
                var EA = new r9.P()
                  , Ej = new r7.k()
                  , EO = new r7.k();
                return {
                    'setup': function(EJ, Ev) {
                        for (var En = 0x0, Eb = 0x0, ED = 0x0, Eu = 0x0; Eu < 0x9; Eu++)
                            EY.probe[Eu].set(0x0, 0x0, 0x0);
                        var p0 = 0x0
                          , p1 = 0x0
                          , p2 = 0x0
                          , p3 = 0x0
                          , p4 = 0x0
                          , p5 = 0x0
                          , p6 = 0x0
                          , p7 = 0x0
                          , p8 = 0x0
                          , p9 = 0x0
                          , pr = 0x0;
                        EJ.sort(ES);
                        for (var pF = !0x0 === Ev ? Math.PI : 0x1, pE = 0x0, pp = EJ.length; pE < pp; pE++) {
                            var pS = EJ[pE]
                              , pR = pS.color
                              , pH = pS.intensity
                              , py = pS.distance
                              , pd = pS.shadow && pS.shadow.map ? pS.shadow.map.texture : null;
                            if (pS.isAmbientLight)
                                En += pR.r * pH * pF,
                                Eb += pR.g * pH * pF,
                                ED += pR.b * pH * pF;
                            else {
                                if (pS.isLightProbe) {
                                    for (var pP = 0x0; pP < 0x9; pP++)
                                        EY.probe[pP].addScaledVector(pS.sh.coefficients[pP], pH);
                                    pr++;
                                } else {
                                    if (pS.isDirectionalLight) {
                                        var pQ = Ef.get(pS);
                                        if (pQ.color.copy(pS.color).multiplyScalar(pS.intensity * pF),
                                        pS.castShadow) {
                                            var pB = pS.shadow
                                              , pM = EK.get(pS);
                                            pM.shadowBias = pB.bias,
                                            pM.shadowNormalBias = pB.normalBias,
                                            pM.shadowRadius = pB.radius,
                                            pM.shadowMapSize = pB.mapSize,
                                            EY.directionalShadow[p0] = pM,
                                            EY.directionalShadowMap[p0] = pd,
                                            EY.directionalShadowMatrix[p0] = pS.shadow.matrix,
                                            p5++;
                                        }
                                        EY.directional[p0] = pQ,
                                        p0++;
                                    } else {
                                        if (pS.isSpotLight) {
                                            var pX = Ef.get(pS);
                                            pX.position.setFromMatrixPosition(pS.matrixWorld),
                                            pX.color.copy(pR).multiplyScalar(pH * pF),
                                            pX.distance = py,
                                            pX.coneCos = Math.cos(pS.angle),
                                            pX.penumbraCos = Math.cos(pS.angle * (0x1 - pS.penumbra)),
                                            pX.decay = pS.decay,
                                            EY.spot[p2] = pX;
                                            var pm = pS.shadow;
                                            if (pS.map && (EY.spotLightMap[p8] = pS.map,
                                            p8++,
                                            pm.updateMatrices(pS),
                                            pS.castShadow && p9++),
                                            EY.spotLightMatrix[p2] = pm.matrix,
                                            pS.castShadow) {
                                                var pw = EK.get(pS);
                                                pw.shadowBias = pm.bias,
                                                pw.shadowNormalBias = pm.normalBias,
                                                pw.shadowRadius = pm.radius,
                                                pw.shadowMapSize = pm.mapSize,
                                                EY.spotShadow[p2] = pw,
                                                EY.spotShadowMap[p2] = pd,
                                                p7++;
                                            }
                                            p2++;
                                        } else {
                                            if (pS.isRectAreaLight) {
                                                var pl = Ef.get(pS);
                                                pl.color.copy(pR).multiplyScalar(pH),
                                                pl.halfWidth.set(0.5 * pS.width, 0x0, 0x0),
                                                pl.halfHeight.set(0x0, 0.5 * pS.height, 0x0),
                                                EY.rectArea[p3] = pl,
                                                p3++;
                                            } else {
                                                if (pS.isPointLight) {
                                                    var pC = Ef.get(pS);
                                                    if (pC.color.copy(pS.color).multiplyScalar(pS.intensity * pF),
                                                    pC.distance = pS.distance,
                                                    pC.decay = pS.decay,
                                                    pS.castShadow) {
                                                        var pN = pS.shadow
                                                          , pZ = EK.get(pS);
                                                        pZ.shadowBias = pN.bias,
                                                        pZ.shadowNormalBias = pN.normalBias,
                                                        pZ.shadowRadius = pN.radius,
                                                        pZ.shadowMapSize = pN.mapSize,
                                                        pZ.shadowCameraNear = pN.camera.near,
                                                        pZ.shadowCameraFar = pN.camera.far,
                                                        EY.pointShadow[p1] = pZ,
                                                        EY.pointShadowMap[p1] = pd,
                                                        EY.pointShadowMatrix[p1] = pS.shadow.matrix,
                                                        p6++;
                                                    }
                                                    EY.point[p1] = pC,
                                                    p1++;
                                                } else {
                                                    if (pS.isHemisphereLight) {
                                                        var ph = Ef.get(pS);
                                                        ph.skyColor.copy(pS.color).multiplyScalar(pH * pF),
                                                        ph.groundColor.copy(pS.groundColor).multiplyScalar(pH * pF),
                                                        EY.hemi[p4] = ph,
                                                        p4++;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        p3 > 0x0 && (Ec.isWebGL2 || !0x0 === EL.has('OES_texture_float_linear') ? (EY.rectAreaLTC1 = EF.f.LTC_FLOAT_1,
                        EY.rectAreaLTC2 = EF.f.LTC_FLOAT_2) : !0x0 === EL.has('OES_texture_half_float_linear') ? (EY.rectAreaLTC1 = EF.f.LTC_HALF_1,
                        EY.rectAreaLTC2 = EF.f.LTC_HALF_2) : console.error('THREE.WebGLRenderer:\x20Unable\x20to\x20use\x20RectAreaLight.\x20Missing\x20WebGL\x20extensions.')),
                        EY.ambient[0x0] = En,
                        EY.ambient[0x1] = Eb,
                        EY.ambient[0x2] = ED;
                        var po = EY.hash;
                        po.directionalLength === p0 && po.pointLength === p1 && po.spotLength === p2 && po.rectAreaLength === p3 && po.hemiLength === p4 && po.numDirectionalShadows === p5 && po.numPointShadows === p6 && po.numSpotShadows === p7 && po.numSpotMaps === p8 && po.numLightProbes === pr || (EY.directional.length = p0,
                        EY.spot.length = p2,
                        EY.rectArea.length = p3,
                        EY.point.length = p1,
                        EY.hemi.length = p4,
                        EY.directionalShadow.length = p5,
                        EY.directionalShadowMap.length = p5,
                        EY.pointShadow.length = p6,
                        EY.pointShadowMap.length = p6,
                        EY.spotShadow.length = p7,
                        EY.spotShadowMap.length = p7,
                        EY.directionalShadowMatrix.length = p5,
                        EY.pointShadowMatrix.length = p6,
                        EY.spotLightMatrix.length = p7 + p8 - p9,
                        EY.spotLightMap.length = p8,
                        EY.numSpotLightShadowsWithMaps = p9,
                        EY.numLightProbes = pr,
                        po.directionalLength = p0,
                        po.pointLength = p1,
                        po.spotLength = p2,
                        po.rectAreaLength = p3,
                        po.hemiLength = p4,
                        po.numDirectionalShadows = p5,
                        po.numPointShadows = p6,
                        po.numSpotShadows = p7,
                        po.numSpotMaps = p8,
                        po.numLightProbes = pr,
                        EY.version = Ep++);
                    },
                    'setupView': function(EJ, Ev) {
                        for (var En = 0x0, Eb = 0x0, ED = 0x0, Eu = 0x0, p0 = 0x0, p1 = Ev.matrixWorldInverse, p2 = 0x0, p3 = EJ.length; p2 < p3; p2++) {
                            var p4 = EJ[p2];
                            if (p4.isDirectionalLight) {
                                var p5 = EY.directional[En];
                                p5.direction.setFromMatrixPosition(p4.matrixWorld),
                                EA.setFromMatrixPosition(p4.target.matrixWorld),
                                p5.direction.sub(EA),
                                p5.direction.transformDirection(p1),
                                En++;
                            } else {
                                if (p4.isSpotLight) {
                                    var p6 = EY.spot[ED];
                                    p6.position.setFromMatrixPosition(p4.matrixWorld),
                                    p6.position.applyMatrix4(p1),
                                    p6.direction.setFromMatrixPosition(p4.matrixWorld),
                                    EA.setFromMatrixPosition(p4.target.matrixWorld),
                                    p6.direction.sub(EA),
                                    p6.direction.transformDirection(p1),
                                    ED++;
                                } else {
                                    if (p4.isRectAreaLight) {
                                        var p7 = EY.rectArea[Eu];
                                        p7.position.setFromMatrixPosition(p4.matrixWorld),
                                        p7.position.applyMatrix4(p1),
                                        EO.identity(),
                                        Ej.copy(p4.matrixWorld),
                                        Ej.premultiply(p1),
                                        EO.extractRotation(Ej),
                                        p7.halfWidth.set(0.5 * p4.width, 0x0, 0x0),
                                        p7.halfHeight.set(0x0, 0.5 * p4.height, 0x0),
                                        p7.halfWidth.applyMatrix4(EO),
                                        p7.halfHeight.applyMatrix4(EO),
                                        Eu++;
                                    } else {
                                        if (p4.isPointLight) {
                                            var p8 = EY.point[Eb];
                                            p8.position.setFromMatrixPosition(p4.matrixWorld),
                                            p8.position.applyMatrix4(p1),
                                            Eb++;
                                        } else {
                                            if (p4.isHemisphereLight) {
                                                var p9 = EY.hemi[p0];
                                                p9.direction.setFromMatrixPosition(p4.matrixWorld),
                                                p9.direction.transformDirection(p1),
                                                p0++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'state': EY
                };
            }
            function EH(EL, Ec) {
                var Eq = new ER(EL,Ec)
                  , Ef = []
                  , EK = [];
                return {
                    'init': function() {
                        Ef.length = 0x0,
                        EK.length = 0x0;
                    },
                    'state': {
                        'lightsArray': Ef,
                        'shadowsArray': EK,
                        'lights': Eq
                    },
                    'setupLights': function(EY) {
                        Eq.setup(Ef, EY);
                    },
                    'setupLightsView': function(EY) {
                        Eq.setupView(Ef, EY);
                    },
                    'pushLight': function(EY) {
                        Ef.push(EY);
                    },
                    'pushShadow': function(EY) {
                        EK.push(EY);
                    }
                };
            }
            function Ey(EL, Ec) {
                var Eq = new WeakMap();
                return {
                    'get': function(Ef, EK) {
                        void 0x0 === EK && (EK = 0x0);
                        var EY, Ez = Eq.get(Ef);
                        return void 0x0 === Ez ? (EY = new EH(EL,Ec),
                        Eq.set(Ef, [EY])) : EK >= Ez.length ? (EY = new EH(EL,Ec),
                        Ez.push(EY)) : EY = Ez[EK],
                        EY;
                    },
                    'dispose': function() {
                        Eq = new WeakMap();
                    }
                };
            }
            var Ed = r2(0xc42c)
              , EP = r2(0x1bfd)
              , EQ = r2(0x11833)
              , EB = r2(0x16835)
              , EM = r2(0x971c);
            function EX(EL, Ec, Eq) {
                var Ef, EK = new r6.P(), EY = new r8.I(), Ez = new r8.I(), EA = new rr.I(), Ej = new EP.C({
                    'depthPacking': r4.N5j
                }), EO = new EQ.a(), EJ = {}, Ev = Eq.maxTextureSize, En = ((Ef = {})[r4.hB5] = r4.hsX,
                Ef[r4.hsX] = r4.hB5,
                Ef[r4.$EB] = r4.$EB,
                Ef), Eb = new rH.B({
                    'defines': {
                        'VSM_SAMPLES': 0x8
                    },
                    'uniforms': {
                        'shadow_pass': {
                            'value': null
                        },
                        'resolution': {
                            'value': new r8.I()
                        },
                        'radius': {
                            'value': 0x4
                        }
                    },
                    'vertexShader': EM.H,
                    'fragmentShader': EM.J
                }), ED = Eb.clone();
                ED.defines.HORIZONTAL_PASS = 0x1;
                var Eu = new EB.L();
                Eu.setAttribute('position', new rT.TH(new Float32Array([-0x1, -0x1, 0.5, 0x3, -0x1, 0.5, -0x1, 0x3, 0.5]),0x3));
                var p0 = new rd.e(Eu,Eb)
                  , p1 = this;
                this.enabled = !0x1,
                this.autoUpdate = !0x0,
                this.needsUpdate = !0x1,
                this.type = r4.QP0;
                var p2 = this.type;
                function p3(p6, p7) {
                    var p8 = Ec.update(p0);
                    Eb.defines.VSM_SAMPLES !== p6.blurSamples && (Eb.defines.VSM_SAMPLES = p6.blurSamples,
                    ED.defines.VSM_SAMPLES = p6.blurSamples,
                    Eb.needsUpdate = !0x0,
                    ED.needsUpdate = !0x0),
                    null === p6.mapPass && (p6.mapPass = new Ed.n(EY.x,EY.y)),
                    Eb.uniforms.shadow_pass.value = p6.map.texture,
                    Eb.uniforms.resolution.value = p6.mapSize,
                    Eb.uniforms.radius.value = p6.radius,
                    EL.setRenderTarget(p6.mapPass),
                    EL.clear(),
                    EL.renderBufferDirect(p7, null, p8, Eb, p0, null),
                    ED.uniforms.shadow_pass.value = p6.mapPass.texture,
                    ED.uniforms.resolution.value = p6.mapSize,
                    ED.uniforms.radius.value = p6.radius,
                    EL.setRenderTarget(p6.map),
                    EL.clear(),
                    EL.renderBufferDirect(p7, null, p8, ED, p0, null);
                }
                function p4(p6, p7, p8, p9) {
                    var pr = null
                      , pF = !0x0 === p8.isPointLight ? p6.customDistanceMaterial : p6.customDepthMaterial;
                    if (void 0x0 !== pF)
                        pr = pF;
                    else {
                        if (pr = !0x0 === p8.isPointLight ? EO : Ej,
                        EL.localClippingEnabled && !0x0 === p7.clipShadows && Array.isArray(p7.clippingPlanes) && 0x0 !== p7.clippingPlanes.length || p7.displacementMap && 0x0 !== p7.displacementScale || p7.alphaMap && p7.alphaTest > 0x0 || p7.map && p7.alphaTest > 0x0) {
                            var pE = pr.uuid
                              , pp = p7.uuid
                              , pS = EJ[pE];
                            void 0x0 === pS && (pS = {},
                            EJ[pE] = pS);
                            var pR = pS[pp];
                            void 0x0 === pR && (pR = pr.clone(),
                            pS[pp] = pR),
                            pr = pR;
                        }
                    }
                    return (pr.visible = p7.visible,
                    pr.wireframe = p7.wireframe,
                    p9 === r4.RyA ? pr.side = null !== p7.shadowSide ? p7.shadowSide : p7.side : pr.side = null !== p7.shadowSide ? p7.shadowSide : En[p7.side],
                    pr.alphaMap = p7.alphaMap,
                    pr.alphaTest = p7.alphaTest,
                    pr.map = p7.map,
                    pr.clipShadows = p7.clipShadows,
                    pr.clippingPlanes = p7.clippingPlanes,
                    pr.clipIntersection = p7.clipIntersection,
                    pr.displacementMap = p7.displacementMap,
                    pr.displacementScale = p7.displacementScale,
                    pr.displacementBias = p7.displacementBias,
                    pr.wireframeLinewidth = p7.wireframeLinewidth,
                    pr.linewidth = p7.linewidth,
                    !0x0 === p8.isPointLight && !0x0 === pr.isMeshDistanceMaterial) && (EL.properties.get(pr).light = p8),
                    pr;
                }
                function p5(p6, p7, p8, p9, pr) {
                    if (!0x1 !== p6.visible) {
                        if (p6.layers.test(p7.layers) && (p6.isMesh || p6.isLine || p6.isPoints) && (p6.castShadow || p6.receiveShadow && pr === r4.RyA) && (!p6.frustumCulled || EK.intersectsObject(p6))) {
                            p6.modelViewMatrix.multiplyMatrices(p8.matrixWorldInverse, p6.matrixWorld);
                            var pF = Ec.update(p6)
                              , pE = p6.material;
                            if (Array.isArray(pE))
                                for (var pp = pF.groups, pS = 0x0, pR = pp.length; pS < pR; pS++) {
                                    var pH = pp[pS]
                                      , py = pE[pH.materialIndex];
                                    if (py && py.visible) {
                                        var pd = p4(p6, py, p9, pr);
                                        p6.onBeforeShadow(EL, p6, p7, p8, pF, pd, pH),
                                        EL.renderBufferDirect(p8, null, pF, pd, p6, pH),
                                        p6.onAfterShadow(EL, p6, p7, p8, pF, pd, pH);
                                    }
                                }
                            else {
                                if (pE.visible) {
                                    var pP = p4(p6, pE, p9, pr);
                                    p6.onBeforeShadow(EL, p6, p7, p8, pF, pP, null),
                                    EL.renderBufferDirect(p8, null, pF, pP, p6, null),
                                    p6.onAfterShadow(EL, p6, p7, p8, pF, pP, null);
                                }
                            }
                        }
                        for (var pQ = p6.children, pB = 0x0, pM = pQ.length; pB < pM; pB++)
                            p5(pQ[pB], p7, p8, p9, pr);
                    }
                }
                this.render = function(p6, p7, p8) {
                    if (!0x1 !== p1.enabled && (!0x1 !== p1.autoUpdate || !0x1 !== p1.needsUpdate) && 0x0 !== p6.length) {
                        var p9 = EL.getRenderTarget()
                          , pr = EL.getActiveCubeFace()
                          , pF = EL.getActiveMipmapLevel()
                          , pE = EL.state;
                        pE.setBlending(r4.XIg),
                        pE.buffers.color.setClear(0x1, 0x1, 0x1, 0x1),
                        pE.buffers.depth.setTest(!0x0),
                        pE.setScissorTest(!0x1);
                        for (var pp = p2 !== r4.RyA && this.type === r4.RyA, pS = p2 === r4.RyA && this.type !== r4.RyA, pR = 0x0, pH = p6.length; pR < pH; pR++) {
                            var py = p6[pR]
                              , pd = py.shadow;
                            if (void 0x0 !== pd) {
                                if (!0x1 !== pd.autoUpdate || !0x1 !== pd.needsUpdate) {
                                    EY.copy(pd.mapSize);
                                    var pP = pd.getFrameExtents();
                                    if (EY.multiply(pP),
                                    Ez.copy(pd.mapSize),
                                    (EY.x > Ev || EY.y > Ev) && (EY.x > Ev && (Ez.x = Math.floor(Ev / pP.x),
                                    EY.x = Ez.x * pP.x,
                                    pd.mapSize.x = Ez.x),
                                    EY.y > Ev && (Ez.y = Math.floor(Ev / pP.y),
                                    EY.y = Ez.y * pP.y,
                                    pd.mapSize.y = Ez.y)),
                                    null === pd.map || !0x0 === pp || !0x0 === pS) {
                                        var pQ = this.type !== r4.RyA ? {
                                            'minFilter': r4.hxR,
                                            'magFilter': r4.hxR
                                        } : {};
                                        null !== pd.map && pd.map.dispose(),
                                        pd.map = new Ed.n(EY.x,EY.y,pQ),
                                        pd.map.texture.name = py.name + '.shadowMap',
                                        pd.camera.updateProjectionMatrix();
                                    }
                                    EL.setRenderTarget(pd.map),
                                    EL.clear();
                                    for (var pB = pd.getViewportCount(), pM = 0x0; pM < pB; pM++) {
                                        var pX = pd.getViewport(pM);
                                        EA.set(Ez.x * pX.x, Ez.y * pX.y, Ez.x * pX.z, Ez.y * pX.w),
                                        pE.viewport(EA),
                                        pd.updateMatrices(py, pM),
                                        EK = pd.getFrustum(),
                                        p5(p7, p8, pd.camera, py, this.type);
                                    }
                                    !0x0 !== pd.isPointLightShadow && this.type === r4.RyA && p3(pd, p8),
                                    pd.needsUpdate = !0x1;
                                }
                            } else
                                console.warn('THREE.WebGLShadowMap:', py, 'has\x20no\x20shadow.');
                        }
                        p2 = this.type,
                        p1.needsUpdate = !0x1,
                        EL.setRenderTarget(p9, pr, pF);
                    }
                }
                ;
            }
            function Em(EL, Ec, Eq) {
                var Ef, EK, EY = Eq.isWebGL2, Ez = new function() {
                    var pG = !0x1
                      , pk = new rr.I()
                      , pW = null
                      , px = new rr.I(0x0,0x0,0x0,0x0);
                    return {
                        'setMask': function(pa) {
                            pW === pa || pG || (EL.colorMask(pa, pa, pa, pa),
                            pW = pa);
                        },
                        'setLocked': function(pa) {
                            pG = pa;
                        },
                        'setClear': function(pa, pI, pg, pL, pc) {
                            !0x0 === pc && (pa *= pL,
                            pI *= pL,
                            pg *= pL),
                            pk.set(pa, pI, pg, pL),
                            !0x1 === px.equals(pk) && (EL.clearColor(pa, pI, pg, pL),
                            px.copy(pk));
                        },
                        'reset': function() {
                            pG = !0x1,
                            pW = null,
                            px.set(-0x1, 0x0, 0x0, 0x0);
                        }
                    };
                }
                (), EA = new function() {
                    var pG = !0x1
                      , pk = null
                      , pW = null
                      , px = null;
                    return {
                        'setTest': function(pa) {
                            pa ? pN(EL.DEPTH_TEST) : pZ(EL.DEPTH_TEST);
                        },
                        'setMask': function(pa) {
                            pk === pa || pG || (EL.depthMask(pa),
                            pk = pa);
                        },
                        'setFunc': function(pa) {
                            if (pW !== pa) {
                                switch (pa) {
                                case r4.eHc:
                                    EL.depthFunc(EL.NEVER);
                                    break;
                                case r4.lGu:
                                    EL.depthFunc(EL.ALWAYS);
                                    break;
                                case r4.brA:
                                    EL.depthFunc(EL.LESS);
                                    break;
                                case r4.xSv:
                                    EL.depthFunc(EL.LEQUAL);
                                    break;
                                case r4.U3G:
                                    EL.depthFunc(EL.EQUAL);
                                    break;
                                case r4.Gwm:
                                    EL.depthFunc(EL.GEQUAL);
                                    break;
                                case r4.K52:
                                    EL.depthFunc(EL.GREATER);
                                    break;
                                case r4.bw0:
                                    EL.depthFunc(EL.NOTEQUAL);
                                    break;
                                default:
                                    EL.depthFunc(EL.LEQUAL);
                                }
                                pW = pa;
                            }
                        },
                        'setLocked': function(pa) {
                            pG = pa;
                        },
                        'setClear': function(pa) {
                            px !== pa && (EL.clearDepth(pa),
                            px = pa);
                        },
                        'reset': function() {
                            pG = !0x1,
                            pk = null,
                            pW = null,
                            px = null;
                        }
                    };
                }
                (), Ej = new function() {
                    var pG = !0x1
                      , pk = null
                      , pW = null
                      , px = null
                      , pa = null
                      , pI = null
                      , pg = null
                      , pL = null
                      , pc = null;
                    return {
                        'setTest': function(pq) {
                            pG || (pq ? pN(EL.STENCIL_TEST) : pZ(EL.STENCIL_TEST));
                        },
                        'setMask': function(pq) {
                            pk === pq || pG || (EL.stencilMask(pq),
                            pk = pq);
                        },
                        'setFunc': function(pq, pf, pK) {
                            pW === pq && px === pf && pa === pK || (EL.stencilFunc(pq, pf, pK),
                            pW = pq,
                            px = pf,
                            pa = pK);
                        },
                        'setOp': function(pq, pf, pK) {
                            pI === pq && pg === pf && pL === pK || (EL.stencilOp(pq, pf, pK),
                            pI = pq,
                            pg = pf,
                            pL = pK);
                        },
                        'setLocked': function(pq) {
                            pG = pq;
                        },
                        'setClear': function(pq) {
                            pc !== pq && (EL.clearStencil(pq),
                            pc = pq);
                        },
                        'reset': function() {
                            pG = !0x1,
                            pk = null,
                            pW = null,
                            px = null,
                            pa = null,
                            pI = null,
                            pg = null,
                            pL = null,
                            pc = null;
                        }
                    };
                }
                (), EO = new WeakMap(), EJ = new WeakMap(), Ev = {}, En = {}, Eb = new WeakMap(), ED = [], Eu = null, p0 = !0x1, p1 = null, p2 = null, p3 = null, p4 = null, p5 = null, p6 = null, p7 = null, p8 = new r5.Q(0x0,0x0,0x0), p9 = 0x0, pr = !0x1, pF = null, pE = null, pp = null, pS = null, pR = null, pH = EL.getParameter(EL.MAX_COMBINED_TEXTURE_IMAGE_UNITS), py = !0x1, pd = 0x0, pP = EL.getParameter(EL.VERSION);
                -0x1 !== pP.indexOf('WebGL') ? (pd = parseFloat(/^WebGL (\d)/.exec(pP)[0x1]),
                py = pd >= 0x1) : -0x1 !== pP.indexOf('OpenGL\x20ES') && (pd = parseFloat(/^OpenGL ES (\d)/.exec(pP)[0x1]),
                py = pd >= 0x2);
                var pQ = null
                  , pB = {}
                  , pM = EL.getParameter(EL.SCISSOR_BOX)
                  , pX = EL.getParameter(EL.VIEWPORT)
                  , pm = new rr.I().fromArray(pM)
                  , pw = new rr.I().fromArray(pX);
                function pl(pG, pk, pW, px) {
                    var pa = new Uint8Array(0x4)
                      , pI = EL.createTexture();
                    EL.bindTexture(pG, pI),
                    EL.texParameteri(pG, EL.TEXTURE_MIN_FILTER, EL.NEAREST),
                    EL.texParameteri(pG, EL.TEXTURE_MAG_FILTER, EL.NEAREST);
                    for (var pg = 0x0; pg < pW; pg++)
                        !EY || pG !== EL.TEXTURE_3D && pG !== EL.TEXTURE_2D_ARRAY ? EL.texImage2D(pk + pg, 0x0, EL.RGBA, 0x1, 0x1, 0x0, EL.RGBA, EL.UNSIGNED_BYTE, pa) : EL.texImage3D(pk, 0x0, EL.RGBA, 0x1, 0x1, px, 0x0, EL.RGBA, EL.UNSIGNED_BYTE, pa);
                    return pI;
                }
                var pC = {};
                function pN(pG) {
                    !0x0 !== Ev[pG] && (EL.enable(pG),
                    Ev[pG] = !0x0);
                }
                function pZ(pG) {
                    !0x1 !== Ev[pG] && (EL.disable(pG),
                    Ev[pG] = !0x1);
                }
                pC[EL.TEXTURE_2D] = pl(EL.TEXTURE_2D, EL.TEXTURE_2D, 0x1),
                pC[EL.TEXTURE_CUBE_MAP] = pl(EL.TEXTURE_CUBE_MAP, EL.TEXTURE_CUBE_MAP_POSITIVE_X, 0x6),
                EY && (pC[EL.TEXTURE_2D_ARRAY] = pl(EL.TEXTURE_2D_ARRAY, EL.TEXTURE_2D_ARRAY, 0x1, 0x1),
                pC[EL.TEXTURE_3D] = pl(EL.TEXTURE_3D, EL.TEXTURE_3D, 0x1, 0x1)),
                Ez.setClear(0x0, 0x0, 0x0, 0x1),
                EA.setClear(0x1),
                Ej.setClear(0x0),
                pN(EL.DEPTH_TEST),
                EA.setFunc(r4.xSv),
                pT(!0x1),
                pV(r4.Vb5),
                pN(EL.CULL_FACE),
                pi(r4.XIg);
                var ph = ((Ef = {})[r4.gO9] = EL.FUNC_ADD,
                Ef[r4.FXf] = EL.FUNC_SUBTRACT,
                Ef[r4.nST] = EL.FUNC_REVERSE_SUBTRACT,
                Ef);
                if (EY)
                    ph[r4.znC] = EL.MIN,
                    ph[r4.$ei] = EL.MAX;
                else {
                    var po = Ec.get('EXT_blend_minmax');
                    null !== po && (ph[r4.znC] = po.MIN_EXT,
                    ph[r4.$ei] = po.MAX_EXT);
                }
                var pU = ((EK = {})[r4.ojh] = EL.ZERO,
                EK[r4.qad] = EL.ONE,
                EK[r4.f4X] = EL.SRC_COLOR,
                EK[r4.ie2] = EL.SRC_ALPHA,
                EK[r4.hgQ] = EL.SRC_ALPHA_SATURATE,
                EK[r4.wn6] = EL.DST_COLOR,
                EK[r4.hdd] = EL.DST_ALPHA,
                EK[r4.LiQ] = EL.ONE_MINUS_SRC_COLOR,
                EK[r4.OuU] = EL.ONE_MINUS_SRC_ALPHA,
                EK[r4.aEY] = EL.ONE_MINUS_DST_COLOR,
                EK[r4.Nt7] = EL.ONE_MINUS_DST_ALPHA,
                EK[r4.RrE] = EL.CONSTANT_COLOR,
                EK[r4.$Yl] = EL.ONE_MINUS_CONSTANT_COLOR,
                EK[r4.e0p] = EL.CONSTANT_ALPHA,
                EK[r4.ov9] = EL.ONE_MINUS_CONSTANT_ALPHA,
                EK);
                function pi(pG, pk, pW, px, pa, pI, pg, pL, pc, pq) {
                    if (pG !== r4.XIg) {
                        if (!0x1 === p0 && (pN(EL.BLEND),
                        p0 = !0x0),
                        pG === r4.bCz)
                            pa = pa || pk,
                            pI = pI || pW,
                            pg = pg || px,
                            pk === p2 && pa === p5 || (EL.blendEquationSeparate(ph[pk], ph[pa]),
                            p2 = pk,
                            p5 = pa),
                            pW === p3 && px === p4 && pI === p6 && pg === p7 || (EL.blendFuncSeparate(pU[pW], pU[px], pU[pI], pU[pg]),
                            p3 = pW,
                            p4 = px,
                            p6 = pI,
                            p7 = pg),
                            !0x1 !== pL.equals(p8) && pc === p9 || (EL.blendColor(pL.r, pL.g, pL.b, pc),
                            p8.copy(pL),
                            p9 = pc),
                            p1 = pG,
                            pr = !0x1;
                        else {
                            if (pG !== p1 || pq !== pr) {
                                if (p2 === r4.gO9 && p5 === r4.gO9 || (EL.blendEquation(EL.FUNC_ADD),
                                p2 = r4.gO9,
                                p5 = r4.gO9),
                                pq)
                                    switch (pG) {
                                    case r4.NTi:
                                        EL.blendFuncSeparate(EL.ONE, EL.ONE_MINUS_SRC_ALPHA, EL.ONE, EL.ONE_MINUS_SRC_ALPHA);
                                        break;
                                    case r4.EZo:
                                        EL.blendFunc(EL.ONE, EL.ONE);
                                        break;
                                    case r4.Kwu:
                                        EL.blendFuncSeparate(EL.ZERO, EL.ONE_MINUS_SRC_COLOR, EL.ZERO, EL.ONE);
                                        break;
                                    case r4.EdD:
                                        EL.blendFuncSeparate(EL.ZERO, EL.SRC_COLOR, EL.ZERO, EL.SRC_ALPHA);
                                        break;
                                    default:
                                        console.error('THREE.WebGLState:\x20Invalid\x20blending:\x20', pG);
                                    }
                                else
                                    switch (pG) {
                                    case r4.NTi:
                                        EL.blendFuncSeparate(EL.SRC_ALPHA, EL.ONE_MINUS_SRC_ALPHA, EL.ONE, EL.ONE_MINUS_SRC_ALPHA);
                                        break;
                                    case r4.EZo:
                                        EL.blendFunc(EL.SRC_ALPHA, EL.ONE);
                                        break;
                                    case r4.Kwu:
                                        EL.blendFuncSeparate(EL.ZERO, EL.ONE_MINUS_SRC_COLOR, EL.ZERO, EL.ONE);
                                        break;
                                    case r4.EdD:
                                        EL.blendFunc(EL.ZERO, EL.SRC_COLOR);
                                        break;
                                    default:
                                        console.error('THREE.WebGLState:\x20Invalid\x20blending:\x20', pG);
                                    }
                                p3 = null,
                                p4 = null,
                                p6 = null,
                                p7 = null,
                                p8.set(0x0, 0x0, 0x0),
                                p9 = 0x0,
                                p1 = pG,
                                pr = pq;
                            }
                        }
                    } else
                        !0x0 === p0 && (pZ(EL.BLEND),
                        p0 = !0x1);
                }
                function pT(pG) {
                    pF !== pG && (pG ? EL.frontFace(EL.CW) : EL.frontFace(EL.CCW),
                    pF = pG);
                }
                function pV(pG) {
                    pG !== r4.WNZ ? (pN(EL.CULL_FACE),
                    pG !== pE && (pG === r4.Vb5 ? EL.cullFace(EL.BACK) : pG === r4.Jnc ? EL.cullFace(EL.FRONT) : EL.cullFace(EL.FRONT_AND_BACK))) : pZ(EL.CULL_FACE),
                    pE = pG;
                }
                function ps(pG, pk, pW) {
                    pG ? (pN(EL.POLYGON_OFFSET_FILL),
                    pS === pk && pR === pW || (EL.polygonOffset(pk, pW),
                    pS = pk,
                    pR = pW)) : pZ(EL.POLYGON_OFFSET_FILL);
                }
                return {
                    'buffers': {
                        'color': Ez,
                        'depth': EA,
                        'stencil': Ej
                    },
                    'enable': pN,
                    'disable': pZ,
                    'bindFramebuffer': function(pG, pk) {
                        return En[pG] !== pk && (EL.bindFramebuffer(pG, pk),
                        En[pG] = pk,
                        EY && (pG === EL.DRAW_FRAMEBUFFER && (En[EL.FRAMEBUFFER] = pk),
                        pG === EL.FRAMEBUFFER && (En[EL.DRAW_FRAMEBUFFER] = pk)),
                        !0x0);
                    },
                    'drawBuffers': function(pG, pk) {
                        var pW = ED
                          , px = !0x1;
                        if (pG) {
                            if (void 0x0 === (pW = Eb.get(pk)) && (pW = [],
                            Eb.set(pk, pW)),
                            pG.isWebGLMultipleRenderTargets) {
                                var pa = pG.texture;
                                if (pW.length !== pa.length || pW[0x0] !== EL.COLOR_ATTACHMENT0) {
                                    for (var pI = 0x0, pg = pa.length; pI < pg; pI++)
                                        pW[pI] = EL.COLOR_ATTACHMENT0 + pI;
                                    pW.length = pa.length,
                                    px = !0x0;
                                }
                            } else
                                pW[0x0] !== EL.COLOR_ATTACHMENT0 && (pW[0x0] = EL.COLOR_ATTACHMENT0,
                                px = !0x0);
                        } else
                            pW[0x0] !== EL.BACK && (pW[0x0] = EL.BACK,
                            px = !0x0);
                        px && (Eq.isWebGL2 ? EL.drawBuffers(pW) : Ec.get('WEBGL_draw_buffers').drawBuffersWEBGL(pW));
                    },
                    'useProgram': function(pG) {
                        return Eu !== pG && (EL.useProgram(pG),
                        Eu = pG,
                        !0x0);
                    },
                    'setBlending': pi,
                    'setMaterial': function(pG, pk) {
                        pG.side === r4.$EB ? pZ(EL.CULL_FACE) : pN(EL.CULL_FACE);
                        var pW = pG.side === r4.hsX;
                        pk && (pW = !pW),
                        pT(pW),
                        pG.blending === r4.NTi && !0x1 === pG.transparent ? pi(r4.XIg) : pi(pG.blending, pG.blendEquation, pG.blendSrc, pG.blendDst, pG.blendEquationAlpha, pG.blendSrcAlpha, pG.blendDstAlpha, pG.blendColor, pG.blendAlpha, pG.premultipliedAlpha),
                        EA.setFunc(pG.depthFunc),
                        EA.setTest(pG.depthTest),
                        EA.setMask(pG.depthWrite),
                        Ez.setMask(pG.colorWrite);
                        var px = pG.stencilWrite;
                        Ej.setTest(px),
                        px && (Ej.setMask(pG.stencilWriteMask),
                        Ej.setFunc(pG.stencilFunc, pG.stencilRef, pG.stencilFuncMask),
                        Ej.setOp(pG.stencilFail, pG.stencilZFail, pG.stencilZPass)),
                        ps(pG.polygonOffset, pG.polygonOffsetFactor, pG.polygonOffsetUnits),
                        !0x0 === pG.alphaToCoverage ? pN(EL.SAMPLE_ALPHA_TO_COVERAGE) : pZ(EL.SAMPLE_ALPHA_TO_COVERAGE);
                    },
                    'setFlipSided': pT,
                    'setCullFace': pV,
                    'setLineWidth': function(pG) {
                        pG !== pp && (py && EL.lineWidth(pG),
                        pp = pG);
                    },
                    'setPolygonOffset': ps,
                    'setScissorTest': function(pG) {
                        pG ? pN(EL.SCISSOR_TEST) : pZ(EL.SCISSOR_TEST);
                    },
                    'activeTexture': function(pG) {
                        void 0x0 === pG && (pG = EL.TEXTURE0 + pH - 0x1),
                        pQ !== pG && (EL.activeTexture(pG),
                        pQ = pG);
                    },
                    'bindTexture': function(pG, pk, pW) {
                        void 0x0 === pW && (pW = null === pQ ? EL.TEXTURE0 + pH - 0x1 : pQ);
                        var px = pB[pW];
                        void 0x0 === px && (px = {
                            'type': void 0x0,
                            'texture': void 0x0
                        },
                        pB[pW] = px),
                        px.type === pG && px.texture === pk || (pQ !== pW && (EL.activeTexture(pW),
                        pQ = pW),
                        EL.bindTexture(pG, pk || pC[pG]),
                        px.type = pG,
                        px.texture = pk);
                    },
                    'unbindTexture': function() {
                        var pG = pB[pQ];
                        void 0x0 !== pG && void 0x0 !== pG.type && (EL.bindTexture(pG.type, null),
                        pG.type = void 0x0,
                        pG.texture = void 0x0);
                    },
                    'compressedTexImage2D': function() {
                        try {
                            EL.compressedTexImage2D.apply(EL, arguments);
                        } catch (pG) {
                            console.error('THREE.WebGLState:', pG);
                        }
                    },
                    'compressedTexImage3D': function() {
                        try {
                            EL.compressedTexImage3D.apply(EL, arguments);
                        } catch (pG) {
                            console.error('THREE.WebGLState:', pG);
                        }
                    },
                    'texImage2D': function() {
                        try {
                            EL.texImage2D.apply(EL, arguments);
                        } catch (pG) {
                            console.error('THREE.WebGLState:', pG);
                        }
                    },
                    'texImage3D': function() {
                        try {
                            EL.texImage3D.apply(EL, arguments);
                        } catch (pG) {
                            console.error('THREE.WebGLState:', pG);
                        }
                    },
                    'updateUBOMapping': function(pG, pk) {
                        var pW = EJ.get(pk);
                        void 0x0 === pW && (pW = new WeakMap(),
                        EJ.set(pk, pW));
                        var px = pW.get(pG);
                        void 0x0 === px && (px = EL.getUniformBlockIndex(pk, pG.name),
                        pW.set(pG, px));
                    },
                    'uniformBlockBinding': function(pG, pk) {
                        var pW = EJ.get(pk).get(pG);
                        EO.get(pk) !== pW && (EL.uniformBlockBinding(pk, pW, pG.__bindingPointIndex),
                        EO.set(pk, pW));
                    },
                    'texStorage2D': function() {
                        try {
                            EL.texStorage2D.apply(EL, arguments);
                        } catch (pG) {
                            console.error('THREE.WebGLState:', pG);
                        }
                    },
                    'texStorage3D': function() {
                        try {
                            EL.texStorage3D.apply(EL, arguments);
                        } catch (pG) {
                            console.error('THREE.WebGLState:', pG);
                        }
                    },
                    'texSubImage2D': function() {
                        try {
                            EL.texSubImage2D.apply(EL, arguments);
                        } catch (pG) {
                            console.error('THREE.WebGLState:', pG);
                        }
                    },
                    'texSubImage3D': function() {
                        try {
                            EL.texSubImage3D.apply(EL, arguments);
                        } catch (pG) {
                            console.error('THREE.WebGLState:', pG);
                        }
                    },
                    'compressedTexSubImage2D': function() {
                        try {
                            EL.compressedTexSubImage2D.apply(EL, arguments);
                        } catch (pG) {
                            console.error('THREE.WebGLState:', pG);
                        }
                    },
                    'compressedTexSubImage3D': function() {
                        try {
                            EL.compressedTexSubImage3D.apply(EL, arguments);
                        } catch (pG) {
                            console.error('THREE.WebGLState:', pG);
                        }
                    },
                    'scissor': function(pG) {
                        !0x1 === pm.equals(pG) && (EL.scissor(pG.x, pG.y, pG.z, pG.w),
                        pm.copy(pG));
                    },
                    'viewport': function(pG) {
                        !0x1 === pw.equals(pG) && (EL.viewport(pG.x, pG.y, pG.z, pG.w),
                        pw.copy(pG));
                    },
                    'reset': function() {
                        EL.disable(EL.BLEND),
                        EL.disable(EL.CULL_FACE),
                        EL.disable(EL.DEPTH_TEST),
                        EL.disable(EL.POLYGON_OFFSET_FILL),
                        EL.disable(EL.SCISSOR_TEST),
                        EL.disable(EL.STENCIL_TEST),
                        EL.disable(EL.SAMPLE_ALPHA_TO_COVERAGE),
                        EL.blendEquation(EL.FUNC_ADD),
                        EL.blendFunc(EL.ONE, EL.ZERO),
                        EL.blendFuncSeparate(EL.ONE, EL.ZERO, EL.ONE, EL.ZERO),
                        EL.blendColor(0x0, 0x0, 0x0, 0x0),
                        EL.colorMask(!0x0, !0x0, !0x0, !0x0),
                        EL.clearColor(0x0, 0x0, 0x0, 0x0),
                        EL.depthMask(!0x0),
                        EL.depthFunc(EL.LESS),
                        EL.clearDepth(0x1),
                        EL.stencilMask(0xffffffff),
                        EL.stencilFunc(EL.ALWAYS, 0x0, 0xffffffff),
                        EL.stencilOp(EL.KEEP, EL.KEEP, EL.KEEP),
                        EL.clearStencil(0x0),
                        EL.cullFace(EL.BACK),
                        EL.frontFace(EL.CCW),
                        EL.polygonOffset(0x0, 0x0),
                        EL.activeTexture(EL.TEXTURE0),
                        EL.bindFramebuffer(EL.FRAMEBUFFER, null),
                        !0x0 === EY && (EL.bindFramebuffer(EL.DRAW_FRAMEBUFFER, null),
                        EL.bindFramebuffer(EL.READ_FRAMEBUFFER, null)),
                        EL.useProgram(null),
                        EL.lineWidth(0x1),
                        EL.scissor(0x0, 0x0, EL.canvas.width, EL.canvas.height),
                        EL.viewport(0x0, 0x0, EL.canvas.width, EL.canvas.height),
                        Ev = {},
                        pQ = null,
                        pB = {},
                        En = {},
                        Eb = new WeakMap(),
                        ED = [],
                        Eu = null,
                        p0 = !0x1,
                        p1 = null,
                        p2 = null,
                        p3 = null,
                        p4 = null,
                        p5 = null,
                        p6 = null,
                        p7 = null,
                        p8 = new r5.Q(0x0,0x0,0x0),
                        p9 = 0x0,
                        pr = !0x1,
                        pF = null,
                        pE = null,
                        pp = null,
                        pS = null,
                        pR = null,
                        pm.set(0x0, 0x0, EL.canvas.width, EL.canvas.height),
                        pw.set(0x0, 0x0, EL.canvas.width, EL.canvas.height),
                        Ez.reset(),
                        EA.reset(),
                        Ej.reset();
                    }
                };
            }
            var Ew = r2(0x10d2d);
            function El(EL, Ec, Eq, Ef, EK, EY, Ez) {
                var EA, Ej, EO, EJ, Ev = EK.isWebGL2, En = EK.maxTextures, Eb = EK.maxCubemapSize, ED = EK.maxTextureSize, Eu = EK.maxSamples, p0 = Ec.has('WEBGL_multisampled_render_to_texture') ? Ec.get('WEBGL_multisampled_render_to_texture') : null, p1 = 'undefined' != typeof navigator && /OculusBrowser/g.test(navigator.userAgent), p2 = new WeakMap(), p3 = new WeakMap(), p4 = !0x1;
                try {
                    p4 = 'undefined' != typeof OffscreenCanvas && null !== new OffscreenCanvas(0x1,0x1).getContext('2d');
                } catch (ph) {}
                function p5(po, pU) {
                    return p4 ? new OffscreenCanvas(po,pU) : (0x0,
                    rV.qq)('canvas');
                }
                function p6(po, pU, pi, pT) {
                    var pV = 0x1;
                    if ((po.width > pT || po.height > pT) && (pV = pT / Math.max(po.width, po.height)),
                    pV < 0x1 || !0x0 === pU) {
                        if ('undefined' != typeof HTMLImageElement && po instanceof HTMLImageElement || 'undefined' != typeof HTMLCanvasElement && po instanceof HTMLCanvasElement || 'undefined' != typeof ImageBitmap && po instanceof ImageBitmap) {
                            var ps = pU ? rF.Nf : Math.floor
                              , pG = ps(pV * po.width)
                              , pk = ps(pV * po.height);
                            void 0x0 === EJ && (EJ = p5(pG, pk));
                            var pW = pi ? p5(pG, pk) : EJ;
                            return pW.width = pG,
                            pW.height = pk,
                            pW.getContext('2d').drawImage(po, 0x0, 0x0, pG, pk),
                            console.warn('THREE.WebGLRenderer:\x20Texture\x20has\x20been\x20resized\x20from\x20(' + po.width + 'x' + po.height + ')\x20to\x20(' + pG + 'x' + pk + ').'),
                            pW;
                        }
                        return 'data'in po && console.warn('THREE.WebGLRenderer:\x20Image\x20in\x20DataTexture\x20is\x20too\x20big\x20(' + po.width + 'x' + po.height + ').'),
                        po;
                    }
                    return po;
                }
                function p7(po) {
                    return rF.r6(po.width) && rF.r6(po.height);
                }
                function p8(po, pU) {
                    return po.generateMipmaps && pU && po.minFilter !== r4.hxR && po.minFilter !== r4.k6q;
                }
                function p9(po) {
                    EL.generateMipmap(po);
                }
                function pr(po, pU, pi, pT, pV) {
                    if (void 0x0 === pV && (pV = !0x1),
                    !0x1 === Ev)
                        return pU;
                    if (null !== po) {
                        if (void 0x0 !== EL[po])
                            return EL[po];
                        console.warn('THREE.WebGLRenderer:\x20Attempt\x20to\x20use\x20non-existing\x20WebGL\x20internal\x20format\x20\x27' + po + '\x27');
                    }
                    var ps = pU;
                    if (pU === EL.RED && (pi === EL.FLOAT && (ps = EL.R32F),
                    pi === EL.HALF_FLOAT && (ps = EL.R16F),
                    pi === EL.UNSIGNED_BYTE && (ps = EL.R8)),
                    pU === EL.RED_INTEGER && (pi === EL.UNSIGNED_BYTE && (ps = EL.R8UI),
                    pi === EL.UNSIGNED_SHORT && (ps = EL.R16UI),
                    pi === EL.UNSIGNED_INT && (ps = EL.R32UI),
                    pi === EL.BYTE && (ps = EL.R8I),
                    pi === EL.SHORT && (ps = EL.R16I),
                    pi === EL.INT && (ps = EL.R32I)),
                    pU === EL.RG && (pi === EL.FLOAT && (ps = EL.RG32F),
                    pi === EL.HALF_FLOAT && (ps = EL.RG16F),
                    pi === EL.UNSIGNED_BYTE && (ps = EL.RG8)),
                    pU === EL.RGBA) {
                        var pG = pV ? r4.VxR : ry.pp.getTransfer(pT);
                        pi === EL.FLOAT && (ps = EL.RGBA32F),
                        pi === EL.HALF_FLOAT && (ps = EL.RGBA16F),
                        pi === EL.UNSIGNED_BYTE && (ps = pG === r4.KLL ? EL.SRGB8_ALPHA8 : EL.RGBA8),
                        pi === EL.UNSIGNED_SHORT_4_4_4_4 && (ps = EL.RGBA4),
                        pi === EL.UNSIGNED_SHORT_5_5_5_1 && (ps = EL.RGB5_A1);
                    }
                    return ps !== EL.R16F && ps !== EL.R32F && ps !== EL.RG16F && ps !== EL.RG32F && ps !== EL.RGBA16F && ps !== EL.RGBA32F || Ec.get('EXT_color_buffer_float'),
                    ps;
                }
                function pF(po, pU, pi) {
                    return !0x0 === p8(po, pi) || po.isFramebufferTexture && po.minFilter !== r4.hxR && po.minFilter !== r4.k6q ? Math.log2(Math.max(pU.width, pU.height)) + 0x1 : void 0x0 !== po.mipmaps && po.mipmaps.length > 0x0 ? po.mipmaps.length : po.isCompressedTexture && Array.isArray(po.image) ? pU.mipmaps.length : 0x1;
                }
                function pE(po) {
                    return po === r4.hxR || po === r4.pHI || po === r4.Cfg ? EL.NEAREST : EL.LINEAR;
                }
                function pp(po) {
                    var pU = po.target;
                    pU.removeEventListener('dispose', pp),
                    function(pi) {
                        var pT = Ef.get(pi);
                        if (void 0x0 === pT.__webglInit)
                            return;
                        var pV = pi.source
                          , ps = p3.get(pV);
                        if (ps) {
                            var pG = ps[pT.__cacheKey];
                            pG.usedTimes--,
                            0x0 === pG.usedTimes && pR(pi),
                            0x0 === Object.keys(ps).length && p3.delete(pV);
                        }
                        Ef.remove(pi);
                    }(pU),
                    pU.isVideoTexture && p2.delete(pU);
                }
                function pS(po) {
                    var pU = po.target;
                    pU.removeEventListener('dispose', pS),
                    function(pi) {
                        var pT = pi.texture
                          , pV = Ef.get(pi)
                          , ps = Ef.get(pT);
                        void 0x0 !== ps.__webglTexture && (EL.deleteTexture(ps.__webglTexture),
                        Ez.memory.textures--),
                        pi.depthTexture && pi.depthTexture.dispose();
                        if (pi.isWebGLCubeRenderTarget)
                            for (var pG = 0x0; pG < 0x6; pG++) {
                                if (Array.isArray(pV.__webglFramebuffer[pG])) {
                                    for (var pk = 0x0; pk < pV.__webglFramebuffer[pG].length; pk++)
                                        EL.deleteFramebuffer(pV.__webglFramebuffer[pG][pk]);
                                } else
                                    EL.deleteFramebuffer(pV.__webglFramebuffer[pG]);
                                pV.__webglDepthbuffer && EL.deleteRenderbuffer(pV.__webglDepthbuffer[pG]);
                            }
                        else {
                            if (Array.isArray(pV.__webglFramebuffer)) {
                                for (var pW = 0x0; pW < pV.__webglFramebuffer.length; pW++)
                                    EL.deleteFramebuffer(pV.__webglFramebuffer[pW]);
                            } else
                                EL.deleteFramebuffer(pV.__webglFramebuffer);
                            if (pV.__webglDepthbuffer && EL.deleteRenderbuffer(pV.__webglDepthbuffer),
                            pV.__webglMultisampledFramebuffer && EL.deleteFramebuffer(pV.__webglMultisampledFramebuffer),
                            pV.__webglColorRenderbuffer) {
                                for (var px = 0x0; px < pV.__webglColorRenderbuffer.length; px++)
                                    pV.__webglColorRenderbuffer[px] && EL.deleteRenderbuffer(pV.__webglColorRenderbuffer[px]);
                            }
                            pV.__webglDepthRenderbuffer && EL.deleteRenderbuffer(pV.__webglDepthRenderbuffer);
                        }
                        if (pi.isWebGLMultipleRenderTargets)
                            for (var pa = 0x0, pI = pT.length; pa < pI; pa++) {
                                var pg = Ef.get(pT[pa]);
                                pg.__webglTexture && (EL.deleteTexture(pg.__webglTexture),
                                Ez.memory.textures--),
                                Ef.remove(pT[pa]);
                            }
                        Ef.remove(pT),
                        Ef.remove(pi);
                    }(pU);
                }
                function pR(po) {
                    var pU = Ef.get(po);
                    EL.deleteTexture(pU.__webglTexture);
                    var pi = po.source;
                    delete p3.get(pi)[pU.__cacheKey],
                    Ez.memory.textures--;
                }
                var pH = 0x0;
                function py(po, pU) {
                    var pi = Ef.get(po);
                    if (po.isVideoTexture && function(pV) {
                        var ps = Ez.render.frame;
                        p2.get(pV) !== ps && (p2.set(pV, ps),
                        pV.update());
                    }(po),
                    !0x1 === po.isRenderTargetTexture && po.version > 0x0 && pi.__version !== po.version) {
                        var pT = po.image;
                        if (null === pT)
                            console.warn('THREE.WebGLRenderer:\x20Texture\x20marked\x20for\x20update\x20but\x20no\x20image\x20data\x20found.');
                        else {
                            if (!0x1 !== pT.complete)
                                return void pX(pi, po, pU);
                            console.warn('THREE.WebGLRenderer:\x20Texture\x20marked\x20for\x20update\x20but\x20image\x20is\x20incomplete');
                        }
                    }
                    Eq.bindTexture(EL.TEXTURE_2D, pi.__webglTexture, EL.TEXTURE0 + pU);
                }
                var pd = ((EA = {})[r4.GJx] = EL.REPEAT,
                EA[r4.ghU] = EL.CLAMP_TO_EDGE,
                EA[r4.kTW] = EL.MIRRORED_REPEAT,
                EA)
                  , pP = ((Ej = {})[r4.hxR] = EL.NEAREST,
                Ej[r4.pHI] = EL.NEAREST_MIPMAP_NEAREST,
                Ej[r4.Cfg] = EL.NEAREST_MIPMAP_LINEAR,
                Ej[r4.k6q] = EL.LINEAR,
                Ej[r4.kRr] = EL.LINEAR_MIPMAP_NEAREST,
                Ej[r4.$_I] = EL.LINEAR_MIPMAP_LINEAR,
                Ej)
                  , pQ = ((EO = {})[r4.amv] = EL.NEVER,
                EO[r4.FFZ] = EL.ALWAYS,
                EO[r4.vim] = EL.LESS,
                EO[r4.TiK] = EL.LEQUAL,
                EO[r4.kO0] = EL.EQUAL,
                EO[r4.gWB] = EL.GEQUAL,
                EO[r4.eoi] = EL.GREATER,
                EO[r4.jzd] = EL.NOTEQUAL,
                EO);
                function pB(po, pU, pi) {
                    if (pi ? (EL.texParameteri(po, EL.TEXTURE_WRAP_S, pd[pU.wrapS]),
                    EL.texParameteri(po, EL.TEXTURE_WRAP_T, pd[pU.wrapT]),
                    po !== EL.TEXTURE_3D && po !== EL.TEXTURE_2D_ARRAY || EL.texParameteri(po, EL.TEXTURE_WRAP_R, pd[pU.wrapR]),
                    EL.texParameteri(po, EL.TEXTURE_MAG_FILTER, pP[pU.magFilter]),
                    EL.texParameteri(po, EL.TEXTURE_MIN_FILTER, pP[pU.minFilter])) : (EL.texParameteri(po, EL.TEXTURE_WRAP_S, EL.CLAMP_TO_EDGE),
                    EL.texParameteri(po, EL.TEXTURE_WRAP_T, EL.CLAMP_TO_EDGE),
                    po !== EL.TEXTURE_3D && po !== EL.TEXTURE_2D_ARRAY || EL.texParameteri(po, EL.TEXTURE_WRAP_R, EL.CLAMP_TO_EDGE),
                    pU.wrapS === r4.ghU && pU.wrapT === r4.ghU || console.warn('THREE.WebGLRenderer:\x20Texture\x20is\x20not\x20power\x20of\x20two.\x20Texture.wrapS\x20and\x20Texture.wrapT\x20should\x20be\x20set\x20to\x20THREE.ClampToEdgeWrapping.'),
                    EL.texParameteri(po, EL.TEXTURE_MAG_FILTER, pE(pU.magFilter)),
                    EL.texParameteri(po, EL.TEXTURE_MIN_FILTER, pE(pU.minFilter)),
                    pU.minFilter !== r4.hxR && pU.minFilter !== r4.k6q && console.warn('THREE.WebGLRenderer:\x20Texture\x20is\x20not\x20power\x20of\x20two.\x20Texture.minFilter\x20should\x20be\x20set\x20to\x20THREE.NearestFilter\x20or\x20THREE.LinearFilter.')),
                    pU.compareFunction && (EL.texParameteri(po, EL.TEXTURE_COMPARE_MODE, EL.COMPARE_REF_TO_TEXTURE),
                    EL.texParameteri(po, EL.TEXTURE_COMPARE_FUNC, pQ[pU.compareFunction])),
                    !0x0 === Ec.has('EXT_texture_filter_anisotropic')) {
                        var pT = Ec.get('EXT_texture_filter_anisotropic');
                        if (pU.magFilter === r4.hxR)
                            return;
                        if (pU.minFilter !== r4.Cfg && pU.minFilter !== r4.$_I)
                            return;
                        if (pU.type === r4.RQf && !0x1 === Ec.has('OES_texture_float_linear'))
                            return;
                        if (!0x1 === Ev && pU.type === r4.ix0 && !0x1 === Ec.has('OES_texture_half_float_linear'))
                            return;
                        (pU.anisotropy > 0x1 || Ef.get(pU).__currentAnisotropy) && (EL.texParameterf(po, pT.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(pU.anisotropy, EK.getMaxAnisotropy())),
                        Ef.get(pU).__currentAnisotropy = pU.anisotropy);
                    }
                }
                function pM(po, pU) {
                    var pi = !0x1;
                    void 0x0 === po.__webglInit && (po.__webglInit = !0x0,
                    pU.addEventListener('dispose', pp));
                    var pT = pU.source
                      , pV = p3.get(pT);
                    void 0x0 === pV && (pV = {},
                    p3.set(pT, pV));
                    var ps = function(pk) {
                        var pW = [];
                        return pW.push(pk.wrapS),
                        pW.push(pk.wrapT),
                        pW.push(pk.wrapR || 0x0),
                        pW.push(pk.magFilter),
                        pW.push(pk.minFilter),
                        pW.push(pk.anisotropy),
                        pW.push(pk.internalFormat),
                        pW.push(pk.format),
                        pW.push(pk.type),
                        pW.push(pk.generateMipmaps),
                        pW.push(pk.premultiplyAlpha),
                        pW.push(pk.flipY),
                        pW.push(pk.unpackAlignment),
                        pW.push(pk.colorSpace),
                        pW.join();
                    }(pU);
                    if (ps !== po.__cacheKey) {
                        void 0x0 === pV[ps] && (pV[ps] = {
                            'texture': EL.createTexture(),
                            'usedTimes': 0x0
                        },
                        Ez.memory.textures++,
                        pi = !0x0),
                        pV[ps].usedTimes++;
                        var pG = pV[po.__cacheKey];
                        void 0x0 !== pG && (pV[po.__cacheKey].usedTimes--,
                        0x0 === pG.usedTimes && pR(pU)),
                        po.__cacheKey = ps,
                        po.__webglTexture = pV[ps].texture;
                    }
                    return pi;
                }
                function pX(po, pU, pi) {
                    var pT = EL.TEXTURE_2D;
                    (pU.isDataArrayTexture || pU.isCompressedArrayTexture) && (pT = EL.TEXTURE_2D_ARRAY),
                    pU.isData3DTexture && (pT = EL.TEXTURE_3D);
                    var pV = pM(po, pU)
                      , ps = pU.source;
                    Eq.bindTexture(pT, po.__webglTexture, EL.TEXTURE0 + pi);
                    var pG = Ef.get(ps);
                    if (ps.version !== pG.__version || !0x0 === pV) {
                        Eq.activeTexture(EL.TEXTURE0 + pi);
                        var pk = ry.pp.getPrimaries(ry.pp.workingColorSpace)
                          , pW = pU.colorSpace === r4.jf0 ? null : ry.pp.getPrimaries(pU.colorSpace)
                          , px = pU.colorSpace === r4.jf0 || pk === pW ? EL.NONE : EL.BROWSER_DEFAULT_WEBGL;
                        EL.pixelStorei(EL.UNPACK_FLIP_Y_WEBGL, pU.flipY),
                        EL.pixelStorei(EL.UNPACK_PREMULTIPLY_ALPHA_WEBGL, pU.premultiplyAlpha),
                        EL.pixelStorei(EL.UNPACK_ALIGNMENT, pU.unpackAlignment),
                        EL.pixelStorei(EL.UNPACK_COLORSPACE_CONVERSION_WEBGL, px);
                        var pa, pI = function(S3) {
                            return !Ev && (S3.wrapS !== r4.ghU || S3.wrapT !== r4.ghU || S3.minFilter !== r4.hxR && S3.minFilter !== r4.k6q);
                        }(pU) && !0x1 === p7(pU.image), pg = p6(pU.image, pI, !0x1, ED), pL = p7(pg = pZ(pU, pg)) || Ev, pc = EY.convert(pU.format, pU.colorSpace), pq = EY.convert(pU.type), pf = pr(pU.internalFormat, pc, pq, pU.colorSpace, pU.isVideoTexture);
                        pB(pT, pU, pL);
                        var pK = pU.mipmaps
                          , pY = Ev && !0x0 !== pU.isVideoTexture && pf !== r4.CVz
                          , pz = void 0x0 === pG.__version || !0x0 === pV
                          , pA = pF(pU, pg, pL);
                        if (pU.isDepthTexture)
                            pf = EL.DEPTH_COMPONENT,
                            Ev ? pf = pU.type === r4.RQf ? EL.DEPTH_COMPONENT32F : pU.type === r4.bkx ? EL.DEPTH_COMPONENT24 : pU.type === r4.V3x ? EL.DEPTH24_STENCIL8 : EL.DEPTH_COMPONENT16 : pU.type === r4.RQf && console.error('WebGLRenderer:\x20Floating\x20point\x20depth\x20texture\x20requires\x20WebGL2.'),
                            pU.format === r4.zdS && pf === EL.DEPTH_COMPONENT && pU.type !== r4.cHt && pU.type !== r4.bkx && (console.warn('THREE.WebGLRenderer:\x20Use\x20UnsignedShortType\x20or\x20UnsignedIntType\x20for\x20DepthFormat\x20DepthTexture.'),
                            pU.type = r4.bkx,
                            pq = EY.convert(pU.type)),
                            pU.format === r4.dcC && pf === EL.DEPTH_COMPONENT && (pf = EL.DEPTH_STENCIL,
                            pU.type !== r4.V3x && (console.warn('THREE.WebGLRenderer:\x20Use\x20UnsignedInt248Type\x20for\x20DepthStencilFormat\x20DepthTexture.'),
                            pU.type = r4.V3x,
                            pq = EY.convert(pU.type))),
                            pz && (pY ? Eq.texStorage2D(EL.TEXTURE_2D, 0x1, pf, pg.width, pg.height) : Eq.texImage2D(EL.TEXTURE_2D, 0x0, pf, pg.width, pg.height, 0x0, pc, pq, null));
                        else {
                            if (pU.isDataTexture) {
                                if (pK.length > 0x0 && pL) {
                                    pY && pz && Eq.texStorage2D(EL.TEXTURE_2D, pA, pf, pK[0x0].width, pK[0x0].height);
                                    for (var pj = 0x0, pO = pK.length; pj < pO; pj++)
                                        pa = pK[pj],
                                        pY ? Eq.texSubImage2D(EL.TEXTURE_2D, pj, 0x0, 0x0, pa.width, pa.height, pc, pq, pa.data) : Eq.texImage2D(EL.TEXTURE_2D, pj, pf, pa.width, pa.height, 0x0, pc, pq, pa.data);
                                    pU.generateMipmaps = !0x1;
                                } else
                                    pY ? (pz && Eq.texStorage2D(EL.TEXTURE_2D, pA, pf, pg.width, pg.height),
                                    Eq.texSubImage2D(EL.TEXTURE_2D, 0x0, 0x0, 0x0, pg.width, pg.height, pc, pq, pg.data)) : Eq.texImage2D(EL.TEXTURE_2D, 0x0, pf, pg.width, pg.height, 0x0, pc, pq, pg.data);
                            } else {
                                if (pU.isCompressedTexture) {
                                    if (pU.isCompressedArrayTexture) {
                                        pY && pz && Eq.texStorage3D(EL.TEXTURE_2D_ARRAY, pA, pf, pK[0x0].width, pK[0x0].height, pg.depth);
                                        for (var pJ = 0x0, pv = pK.length; pJ < pv; pJ++)
                                            pa = pK[pJ],
                                            pU.format !== r4.GWd ? null !== pc ? pY ? Eq.compressedTexSubImage3D(EL.TEXTURE_2D_ARRAY, pJ, 0x0, 0x0, 0x0, pa.width, pa.height, pg.depth, pc, pa.data, 0x0, 0x0) : Eq.compressedTexImage3D(EL.TEXTURE_2D_ARRAY, pJ, pf, pa.width, pa.height, pg.depth, 0x0, pa.data, 0x0, 0x0) : console.warn('THREE.WebGLRenderer:\x20Attempt\x20to\x20load\x20unsupported\x20compressed\x20texture\x20format\x20in\x20.uploadTexture()') : pY ? Eq.texSubImage3D(EL.TEXTURE_2D_ARRAY, pJ, 0x0, 0x0, 0x0, pa.width, pa.height, pg.depth, pc, pq, pa.data) : Eq.texImage3D(EL.TEXTURE_2D_ARRAY, pJ, pf, pa.width, pa.height, pg.depth, 0x0, pc, pq, pa.data);
                                    } else {
                                        pY && pz && Eq.texStorage2D(EL.TEXTURE_2D, pA, pf, pK[0x0].width, pK[0x0].height);
                                        for (var pn = 0x0, pb = pK.length; pn < pb; pn++)
                                            pa = pK[pn],
                                            pU.format !== r4.GWd ? null !== pc ? pY ? Eq.compressedTexSubImage2D(EL.TEXTURE_2D, pn, 0x0, 0x0, pa.width, pa.height, pc, pa.data) : Eq.compressedTexImage2D(EL.TEXTURE_2D, pn, pf, pa.width, pa.height, 0x0, pa.data) : console.warn('THREE.WebGLRenderer:\x20Attempt\x20to\x20load\x20unsupported\x20compressed\x20texture\x20format\x20in\x20.uploadTexture()') : pY ? Eq.texSubImage2D(EL.TEXTURE_2D, pn, 0x0, 0x0, pa.width, pa.height, pc, pq, pa.data) : Eq.texImage2D(EL.TEXTURE_2D, pn, pf, pa.width, pa.height, 0x0, pc, pq, pa.data);
                                    }
                                } else {
                                    if (pU.isDataArrayTexture)
                                        pY ? (pz && Eq.texStorage3D(EL.TEXTURE_2D_ARRAY, pA, pf, pg.width, pg.height, pg.depth),
                                        Eq.texSubImage3D(EL.TEXTURE_2D_ARRAY, 0x0, 0x0, 0x0, 0x0, pg.width, pg.height, pg.depth, pc, pq, pg.data)) : Eq.texImage3D(EL.TEXTURE_2D_ARRAY, 0x0, pf, pg.width, pg.height, pg.depth, 0x0, pc, pq, pg.data);
                                    else {
                                        if (pU.isData3DTexture)
                                            pY ? (pz && Eq.texStorage3D(EL.TEXTURE_3D, pA, pf, pg.width, pg.height, pg.depth),
                                            Eq.texSubImage3D(EL.TEXTURE_3D, 0x0, 0x0, 0x0, 0x0, pg.width, pg.height, pg.depth, pc, pq, pg.data)) : Eq.texImage3D(EL.TEXTURE_3D, 0x0, pf, pg.width, pg.height, pg.depth, 0x0, pc, pq, pg.data);
                                        else {
                                            if (pU.isFramebufferTexture) {
                                                if (pz) {
                                                    if (pY)
                                                        Eq.texStorage2D(EL.TEXTURE_2D, pA, pf, pg.width, pg.height);
                                                    else {
                                                        for (var pD = pg.width, pu = pg.height, S0 = 0x0; S0 < pA; S0++)
                                                            Eq.texImage2D(EL.TEXTURE_2D, S0, pf, pD, pu, 0x0, pc, pq, null),
                                                            pD >>= 0x1,
                                                            pu >>= 0x1;
                                                    }
                                                }
                                            } else {
                                                if (pK.length > 0x0 && pL) {
                                                    pY && pz && Eq.texStorage2D(EL.TEXTURE_2D, pA, pf, pK[0x0].width, pK[0x0].height);
                                                    for (var S1 = 0x0, S2 = pK.length; S1 < S2; S1++)
                                                        pa = pK[S1],
                                                        pY ? Eq.texSubImage2D(EL.TEXTURE_2D, S1, 0x0, 0x0, pc, pq, pa) : Eq.texImage2D(EL.TEXTURE_2D, S1, pf, pc, pq, pa);
                                                    pU.generateMipmaps = !0x1;
                                                } else
                                                    pY ? (pz && Eq.texStorage2D(EL.TEXTURE_2D, pA, pf, pg.width, pg.height),
                                                    Eq.texSubImage2D(EL.TEXTURE_2D, 0x0, 0x0, 0x0, pc, pq, pg)) : Eq.texImage2D(EL.TEXTURE_2D, 0x0, pf, pc, pq, pg);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        p8(pU, pL) && p9(pT),
                        pG.__version = ps.version,
                        pU.onUpdate && pU.onUpdate(pU);
                    }
                    po.__version = pU.version;
                }
                function pm(po, pU, pi, pT, pV, ps) {
                    var pG = EY.convert(pi.format, pi.colorSpace)
                      , pk = EY.convert(pi.type)
                      , pW = pr(pi.internalFormat, pG, pk, pi.colorSpace);
                    if (!Ef.get(pU).__hasExternalTextures) {
                        var px = Math.max(0x1, pU.width >> ps)
                          , pa = Math.max(0x1, pU.height >> ps);
                        pV === EL.TEXTURE_3D || pV === EL.TEXTURE_2D_ARRAY ? Eq.texImage3D(pV, ps, pW, px, pa, pU.depth, 0x0, pG, pk, null) : Eq.texImage2D(pV, ps, pW, px, pa, 0x0, pG, pk, null);
                    }
                    Eq.bindFramebuffer(EL.FRAMEBUFFER, po),
                    pN(pU) ? p0.framebufferTexture2DMultisampleEXT(EL.FRAMEBUFFER, pT, pV, Ef.get(pi).__webglTexture, 0x0, pC(pU)) : (pV === EL.TEXTURE_2D || pV >= EL.TEXTURE_CUBE_MAP_POSITIVE_X && pV <= EL.TEXTURE_CUBE_MAP_NEGATIVE_Z) && EL.framebufferTexture2D(EL.FRAMEBUFFER, pT, pV, Ef.get(pi).__webglTexture, ps),
                    Eq.bindFramebuffer(EL.FRAMEBUFFER, null);
                }
                function pw(po, pU, pi) {
                    if (EL.bindRenderbuffer(EL.RENDERBUFFER, po),
                    pU.depthBuffer && !pU.stencilBuffer) {
                        var pT = !0x0 === Ev ? EL.DEPTH_COMPONENT24 : EL.DEPTH_COMPONENT16;
                        if (pi || pN(pU)) {
                            var pV = pU.depthTexture;
                            pV && pV.isDepthTexture && (pV.type === r4.RQf ? pT = EL.DEPTH_COMPONENT32F : pV.type === r4.bkx && (pT = EL.DEPTH_COMPONENT24));
                            var ps = pC(pU);
                            pN(pU) ? p0.renderbufferStorageMultisampleEXT(EL.RENDERBUFFER, ps, pT, pU.width, pU.height) : EL.renderbufferStorageMultisample(EL.RENDERBUFFER, ps, pT, pU.width, pU.height);
                        } else
                            EL.renderbufferStorage(EL.RENDERBUFFER, pT, pU.width, pU.height);
                        EL.framebufferRenderbuffer(EL.FRAMEBUFFER, EL.DEPTH_ATTACHMENT, EL.RENDERBUFFER, po);
                    } else {
                        if (pU.depthBuffer && pU.stencilBuffer) {
                            var pG = pC(pU);
                            pi && !0x1 === pN(pU) ? EL.renderbufferStorageMultisample(EL.RENDERBUFFER, pG, EL.DEPTH24_STENCIL8, pU.width, pU.height) : pN(pU) ? p0.renderbufferStorageMultisampleEXT(EL.RENDERBUFFER, pG, EL.DEPTH24_STENCIL8, pU.width, pU.height) : EL.renderbufferStorage(EL.RENDERBUFFER, EL.DEPTH_STENCIL, pU.width, pU.height),
                            EL.framebufferRenderbuffer(EL.FRAMEBUFFER, EL.DEPTH_STENCIL_ATTACHMENT, EL.RENDERBUFFER, po);
                        } else
                            for (var pk = !0x0 === pU.isWebGLMultipleRenderTargets ? pU.texture : [pU.texture], pW = 0x0; pW < pk.length; pW++) {
                                var px = pk[pW]
                                  , pa = EY.convert(px.format, px.colorSpace)
                                  , pI = EY.convert(px.type)
                                  , pg = pr(px.internalFormat, pa, pI, px.colorSpace)
                                  , pL = pC(pU);
                                pi && !0x1 === pN(pU) ? EL.renderbufferStorageMultisample(EL.RENDERBUFFER, pL, pg, pU.width, pU.height) : pN(pU) ? p0.renderbufferStorageMultisampleEXT(EL.RENDERBUFFER, pL, pg, pU.width, pU.height) : EL.renderbufferStorage(EL.RENDERBUFFER, pg, pU.width, pU.height);
                            }
                    }
                    EL.bindRenderbuffer(EL.RENDERBUFFER, null);
                }
                function pl(po) {
                    var pU = Ef.get(po)
                      , pi = !0x0 === po.isWebGLCubeRenderTarget;
                    if (po.depthTexture && !pU.__autoAllocateDepthBuffer) {
                        if (pi)
                            throw new Error('target.depthTexture\x20not\x20supported\x20in\x20Cube\x20render\x20targets');
                        !function(pV, ps) {
                            if (ps && ps.isWebGLCubeRenderTarget)
                                throw new Error('Depth\x20Texture\x20with\x20cube\x20render\x20targets\x20is\x20not\x20supported');
                            if (Eq.bindFramebuffer(EL.FRAMEBUFFER, pV),
                            !ps.depthTexture || !ps.depthTexture.isDepthTexture)
                                throw new Error('renderTarget.depthTexture\x20must\x20be\x20an\x20instance\x20of\x20THREE.DepthTexture');
                            Ef.get(ps.depthTexture).__webglTexture && ps.depthTexture.image.width === ps.width && ps.depthTexture.image.height === ps.height || (ps.depthTexture.image.width = ps.width,
                            ps.depthTexture.image.height = ps.height,
                            ps.depthTexture.needsUpdate = !0x0),
                            py(ps.depthTexture, 0x0);
                            var pG = Ef.get(ps.depthTexture).__webglTexture
                              , pk = pC(ps);
                            if (ps.depthTexture.format === r4.zdS)
                                pN(ps) ? p0.framebufferTexture2DMultisampleEXT(EL.FRAMEBUFFER, EL.DEPTH_ATTACHMENT, EL.TEXTURE_2D, pG, 0x0, pk) : EL.framebufferTexture2D(EL.FRAMEBUFFER, EL.DEPTH_ATTACHMENT, EL.TEXTURE_2D, pG, 0x0);
                            else {
                                if (ps.depthTexture.format !== r4.dcC)
                                    throw new Error('Unknown\x20depthTexture\x20format');
                                pN(ps) ? p0.framebufferTexture2DMultisampleEXT(EL.FRAMEBUFFER, EL.DEPTH_STENCIL_ATTACHMENT, EL.TEXTURE_2D, pG, 0x0, pk) : EL.framebufferTexture2D(EL.FRAMEBUFFER, EL.DEPTH_STENCIL_ATTACHMENT, EL.TEXTURE_2D, pG, 0x0);
                            }
                        }(pU.__webglFramebuffer, po);
                    } else {
                        if (pi) {
                            pU.__webglDepthbuffer = [];
                            for (var pT = 0x0; pT < 0x6; pT++)
                                Eq.bindFramebuffer(EL.FRAMEBUFFER, pU.__webglFramebuffer[pT]),
                                pU.__webglDepthbuffer[pT] = EL.createRenderbuffer(),
                                pw(pU.__webglDepthbuffer[pT], po, !0x1);
                        } else
                            Eq.bindFramebuffer(EL.FRAMEBUFFER, pU.__webglFramebuffer),
                            pU.__webglDepthbuffer = EL.createRenderbuffer(),
                            pw(pU.__webglDepthbuffer, po, !0x1);
                    }
                    Eq.bindFramebuffer(EL.FRAMEBUFFER, null);
                }
                function pC(po) {
                    return Math.min(Eu, po.samples);
                }
                function pN(po) {
                    var pU = Ef.get(po);
                    return Ev && po.samples > 0x0 && !0x0 === Ec.has('WEBGL_multisampled_render_to_texture') && !0x1 !== pU.__useRenderToTexture;
                }
                function pZ(po, pU) {
                    var pi = po.colorSpace
                      , pT = po.format
                      , pV = po.type;
                    return !0x0 === po.isCompressedTexture || !0x0 === po.isVideoTexture || po.format === r4.Ua6 || pi !== r4.Zr2 && pi !== r4.jf0 && (ry.pp.getTransfer(pi) === r4.KLL ? !0x1 === Ev ? !0x0 === Ec.has('EXT_sRGB') && pT === r4.GWd ? (po.format = r4.Ua6,
                    po.minFilter = r4.k6q,
                    po.generateMipmaps = !0x1) : pU = Ew.H.sRGBToLinear(pU) : pT === r4.GWd && pV === r4.OUM || console.warn('THREE.WebGLTextures:\x20sRGB\x20encoded\x20textures\x20have\x20to\x20use\x20RGBAFormat\x20and\x20UnsignedByteType.') : console.error('THREE.WebGLTextures:\x20Unsupported\x20texture\x20color\x20space:', pi)),
                    pU;
                }
                this.allocateTextureUnit = function() {
                    var po = pH;
                    return po >= En && console.warn('THREE.WebGLTextures:\x20Trying\x20to\x20use\x20' + po + '\x20texture\x20units\x20while\x20this\x20GPU\x20supports\x20only\x20' + En),
                    pH += 0x1,
                    po;
                }
                ,
                this.resetTextureUnits = function() {
                    pH = 0x0;
                }
                ,
                this.setTexture2D = py,
                this.setTexture2DArray = function(po, pU) {
                    var pi = Ef.get(po);
                    po.version > 0x0 && pi.__version !== po.version ? pX(pi, po, pU) : Eq.bindTexture(EL.TEXTURE_2D_ARRAY, pi.__webglTexture, EL.TEXTURE0 + pU);
                }
                ,
                this.setTexture3D = function(po, pU) {
                    var pi = Ef.get(po);
                    po.version > 0x0 && pi.__version !== po.version ? pX(pi, po, pU) : Eq.bindTexture(EL.TEXTURE_3D, pi.__webglTexture, EL.TEXTURE0 + pU);
                }
                ,
                this.setTextureCube = function(po, pU) {
                    var pi = Ef.get(po);
                    po.version > 0x0 && pi.__version !== po.version ? function(pT, pV, ps) {
                        if (0x6 !== pV.image.length)
                            return;
                        var pG = pM(pT, pV)
                          , pk = pV.source;
                        Eq.bindTexture(EL.TEXTURE_CUBE_MAP, pT.__webglTexture, EL.TEXTURE0 + ps);
                        var pW = Ef.get(pk);
                        if (pk.version !== pW.__version || !0x0 === pG) {
                            Eq.activeTexture(EL.TEXTURE0 + ps);
                            var px = ry.pp.getPrimaries(ry.pp.workingColorSpace)
                              , pa = pV.colorSpace === r4.jf0 ? null : ry.pp.getPrimaries(pV.colorSpace)
                              , pI = pV.colorSpace === r4.jf0 || px === pa ? EL.NONE : EL.BROWSER_DEFAULT_WEBGL;
                            EL.pixelStorei(EL.UNPACK_FLIP_Y_WEBGL, pV.flipY),
                            EL.pixelStorei(EL.UNPACK_PREMULTIPLY_ALPHA_WEBGL, pV.premultiplyAlpha),
                            EL.pixelStorei(EL.UNPACK_ALIGNMENT, pV.unpackAlignment),
                            EL.pixelStorei(EL.UNPACK_COLORSPACE_CONVERSION_WEBGL, pI);
                            for (var pg = pV.isCompressedTexture || pV.image[0x0].isCompressedTexture, pL = pV.image[0x0] && pV.image[0x0].isDataTexture, pc = [], pq = 0x0; pq < 0x6; pq++)
                                pc[pq] = pg || pL ? pL ? pV.image[pq].image : pV.image[pq] : p6(pV.image[pq], !0x1, !0x0, Eb),
                                pc[pq] = pZ(pV, pc[pq]);
                            var pf, pK = pc[0x0], pY = p7(pK) || Ev, pz = EY.convert(pV.format, pV.colorSpace), pA = EY.convert(pV.type), pj = pr(pV.internalFormat, pz, pA, pV.colorSpace), pO = Ev && !0x0 !== pV.isVideoTexture, pJ = void 0x0 === pW.__version || !0x0 === pG, pv = pF(pV, pK, pY);
                            if (pB(EL.TEXTURE_CUBE_MAP, pV, pY),
                            pg) {
                                pO && pJ && Eq.texStorage2D(EL.TEXTURE_CUBE_MAP, pv, pj, pK.width, pK.height);
                                for (var pn = 0x0; pn < 0x6; pn++) {
                                    pf = pc[pn].mipmaps;
                                    for (var pb = 0x0; pb < pf.length; pb++) {
                                        var pD = pf[pb];
                                        pV.format !== r4.GWd ? null !== pz ? pO ? Eq.compressedTexSubImage2D(EL.TEXTURE_CUBE_MAP_POSITIVE_X + pn, pb, 0x0, 0x0, pD.width, pD.height, pz, pD.data) : Eq.compressedTexImage2D(EL.TEXTURE_CUBE_MAP_POSITIVE_X + pn, pb, pj, pD.width, pD.height, 0x0, pD.data) : console.warn('THREE.WebGLRenderer:\x20Attempt\x20to\x20load\x20unsupported\x20compressed\x20texture\x20format\x20in\x20.setTextureCube()') : pO ? Eq.texSubImage2D(EL.TEXTURE_CUBE_MAP_POSITIVE_X + pn, pb, 0x0, 0x0, pD.width, pD.height, pz, pA, pD.data) : Eq.texImage2D(EL.TEXTURE_CUBE_MAP_POSITIVE_X + pn, pb, pj, pD.width, pD.height, 0x0, pz, pA, pD.data);
                                    }
                                }
                            } else {
                                pf = pV.mipmaps,
                                pO && pJ && (pf.length > 0x0 && pv++,
                                Eq.texStorage2D(EL.TEXTURE_CUBE_MAP, pv, pj, pc[0x0].width, pc[0x0].height));
                                for (var pu = 0x0; pu < 0x6; pu++)
                                    if (pL) {
                                        pO ? Eq.texSubImage2D(EL.TEXTURE_CUBE_MAP_POSITIVE_X + pu, 0x0, 0x0, 0x0, pc[pu].width, pc[pu].height, pz, pA, pc[pu].data) : Eq.texImage2D(EL.TEXTURE_CUBE_MAP_POSITIVE_X + pu, 0x0, pj, pc[pu].width, pc[pu].height, 0x0, pz, pA, pc[pu].data);
                                        for (var S0 = 0x0; S0 < pf.length; S0++) {
                                            var S1 = pf[S0].image[pu].image;
                                            pO ? Eq.texSubImage2D(EL.TEXTURE_CUBE_MAP_POSITIVE_X + pu, S0 + 0x1, 0x0, 0x0, S1.width, S1.height, pz, pA, S1.data) : Eq.texImage2D(EL.TEXTURE_CUBE_MAP_POSITIVE_X + pu, S0 + 0x1, pj, S1.width, S1.height, 0x0, pz, pA, S1.data);
                                        }
                                    } else {
                                        pO ? Eq.texSubImage2D(EL.TEXTURE_CUBE_MAP_POSITIVE_X + pu, 0x0, 0x0, 0x0, pz, pA, pc[pu]) : Eq.texImage2D(EL.TEXTURE_CUBE_MAP_POSITIVE_X + pu, 0x0, pj, pz, pA, pc[pu]);
                                        for (var S2 = 0x0; S2 < pf.length; S2++) {
                                            var S3 = pf[S2];
                                            pO ? Eq.texSubImage2D(EL.TEXTURE_CUBE_MAP_POSITIVE_X + pu, S2 + 0x1, 0x0, 0x0, pz, pA, S3.image[pu]) : Eq.texImage2D(EL.TEXTURE_CUBE_MAP_POSITIVE_X + pu, S2 + 0x1, pj, pz, pA, S3.image[pu]);
                                        }
                                    }
                            }
                            p8(pV, pY) && p9(EL.TEXTURE_CUBE_MAP),
                            pW.__version = pk.version,
                            pV.onUpdate && pV.onUpdate(pV);
                        }
                        pT.__version = pV.version;
                    }(pi, po, pU) : Eq.bindTexture(EL.TEXTURE_CUBE_MAP, pi.__webglTexture, EL.TEXTURE0 + pU);
                }
                ,
                this.rebindTextures = function(po, pU, pi) {
                    var pT = Ef.get(po);
                    void 0x0 !== pU && pm(pT.__webglFramebuffer, po, po.texture, EL.COLOR_ATTACHMENT0, EL.TEXTURE_2D, 0x0),
                    void 0x0 !== pi && pl(po);
                }
                ,
                this.setupRenderTarget = function(po) {
                    var pU = po.texture
                      , pi = Ef.get(po)
                      , pT = Ef.get(pU);
                    po.addEventListener('dispose', pS),
                    !0x0 !== po.isWebGLMultipleRenderTargets && (void 0x0 === pT.__webglTexture && (pT.__webglTexture = EL.createTexture()),
                    pT.__version = pU.version,
                    Ez.memory.textures++);
                    var pV = !0x0 === po.isWebGLCubeRenderTarget
                      , ps = !0x0 === po.isWebGLMultipleRenderTargets
                      , pG = p7(po) || Ev;
                    if (pV) {
                        pi.__webglFramebuffer = [];
                        for (var pk = 0x0; pk < 0x6; pk++)
                            if (Ev && pU.mipmaps && pU.mipmaps.length > 0x0) {
                                pi.__webglFramebuffer[pk] = [];
                                for (var pW = 0x0; pW < pU.mipmaps.length; pW++)
                                    pi.__webglFramebuffer[pk][pW] = EL.createFramebuffer();
                            } else
                                pi.__webglFramebuffer[pk] = EL.createFramebuffer();
                    } else {
                        if (Ev && pU.mipmaps && pU.mipmaps.length > 0x0) {
                            pi.__webglFramebuffer = [];
                            for (var px = 0x0; px < pU.mipmaps.length; px++)
                                pi.__webglFramebuffer[px] = EL.createFramebuffer();
                        } else
                            pi.__webglFramebuffer = EL.createFramebuffer();
                        if (ps) {
                            if (EK.drawBuffers)
                                for (var pa = po.texture, pI = 0x0, pg = pa.length; pI < pg; pI++) {
                                    var pL = Ef.get(pa[pI]);
                                    void 0x0 === pL.__webglTexture && (pL.__webglTexture = EL.createTexture(),
                                    Ez.memory.textures++);
                                }
                            else
                                console.warn('THREE.WebGLRenderer:\x20WebGLMultipleRenderTargets\x20can\x20only\x20be\x20used\x20with\x20WebGL2\x20or\x20WEBGL_draw_buffers\x20extension.');
                        }
                        if (Ev && po.samples > 0x0 && !0x1 === pN(po)) {
                            var pc = ps ? pU : [pU];
                            pi.__webglMultisampledFramebuffer = EL.createFramebuffer(),
                            pi.__webglColorRenderbuffer = [],
                            Eq.bindFramebuffer(EL.FRAMEBUFFER, pi.__webglMultisampledFramebuffer);
                            for (var pq = 0x0; pq < pc.length; pq++) {
                                var pf = pc[pq];
                                pi.__webglColorRenderbuffer[pq] = EL.createRenderbuffer(),
                                EL.bindRenderbuffer(EL.RENDERBUFFER, pi.__webglColorRenderbuffer[pq]);
                                var pK = EY.convert(pf.format, pf.colorSpace)
                                  , pY = EY.convert(pf.type)
                                  , pz = pr(pf.internalFormat, pK, pY, pf.colorSpace, !0x0 === po.isXRRenderTarget)
                                  , pA = pC(po);
                                EL.renderbufferStorageMultisample(EL.RENDERBUFFER, pA, pz, po.width, po.height),
                                EL.framebufferRenderbuffer(EL.FRAMEBUFFER, EL.COLOR_ATTACHMENT0 + pq, EL.RENDERBUFFER, pi.__webglColorRenderbuffer[pq]);
                            }
                            EL.bindRenderbuffer(EL.RENDERBUFFER, null),
                            po.depthBuffer && (pi.__webglDepthRenderbuffer = EL.createRenderbuffer(),
                            pw(pi.__webglDepthRenderbuffer, po, !0x0)),
                            Eq.bindFramebuffer(EL.FRAMEBUFFER, null);
                        }
                    }
                    if (pV) {
                        Eq.bindTexture(EL.TEXTURE_CUBE_MAP, pT.__webglTexture),
                        pB(EL.TEXTURE_CUBE_MAP, pU, pG);
                        for (var pj = 0x0; pj < 0x6; pj++)
                            if (Ev && pU.mipmaps && pU.mipmaps.length > 0x0) {
                                for (var pO = 0x0; pO < pU.mipmaps.length; pO++)
                                    pm(pi.__webglFramebuffer[pj][pO], po, pU, EL.COLOR_ATTACHMENT0, EL.TEXTURE_CUBE_MAP_POSITIVE_X + pj, pO);
                            } else
                                pm(pi.__webglFramebuffer[pj], po, pU, EL.COLOR_ATTACHMENT0, EL.TEXTURE_CUBE_MAP_POSITIVE_X + pj, 0x0);
                        p8(pU, pG) && p9(EL.TEXTURE_CUBE_MAP),
                        Eq.unbindTexture();
                    } else {
                        if (ps) {
                            for (var pJ = po.texture, pv = 0x0, pn = pJ.length; pv < pn; pv++) {
                                var pb = pJ[pv]
                                  , pD = Ef.get(pb);
                                Eq.bindTexture(EL.TEXTURE_2D, pD.__webglTexture),
                                pB(EL.TEXTURE_2D, pb, pG),
                                pm(pi.__webglFramebuffer, po, pb, EL.COLOR_ATTACHMENT0 + pv, EL.TEXTURE_2D, 0x0),
                                p8(pb, pG) && p9(EL.TEXTURE_2D);
                            }
                            Eq.unbindTexture();
                        } else {
                            var pu = EL.TEXTURE_2D;
                            if ((po.isWebGL3DRenderTarget || po.isWebGLArrayRenderTarget) && (Ev ? pu = po.isWebGL3DRenderTarget ? EL.TEXTURE_3D : EL.TEXTURE_2D_ARRAY : console.error('THREE.WebGLTextures:\x20THREE.Data3DTexture\x20and\x20THREE.DataArrayTexture\x20only\x20supported\x20with\x20WebGL2.')),
                            Eq.bindTexture(pu, pT.__webglTexture),
                            pB(pu, pU, pG),
                            Ev && pU.mipmaps && pU.mipmaps.length > 0x0) {
                                for (var S0 = 0x0; S0 < pU.mipmaps.length; S0++)
                                    pm(pi.__webglFramebuffer[S0], po, pU, EL.COLOR_ATTACHMENT0, pu, S0);
                            } else
                                pm(pi.__webglFramebuffer, po, pU, EL.COLOR_ATTACHMENT0, pu, 0x0);
                            p8(pU, pG) && p9(pu),
                            Eq.unbindTexture();
                        }
                    }
                    po.depthBuffer && pl(po);
                }
                ,
                this.updateRenderTargetMipmap = function(po) {
                    for (var pU = p7(po) || Ev, pi = !0x0 === po.isWebGLMultipleRenderTargets ? po.texture : [po.texture], pT = 0x0, pV = pi.length; pT < pV; pT++) {
                        var ps = pi[pT];
                        if (p8(ps, pU)) {
                            var pG = po.isWebGLCubeRenderTarget ? EL.TEXTURE_CUBE_MAP : EL.TEXTURE_2D
                              , pk = Ef.get(ps).__webglTexture;
                            Eq.bindTexture(pG, pk),
                            p9(pG),
                            Eq.unbindTexture();
                        }
                    }
                }
                ,
                this.updateMultisampleRenderTarget = function(po) {
                    if (Ev && po.samples > 0x0 && !0x1 === pN(po)) {
                        var pU = po.isWebGLMultipleRenderTargets ? po.texture : [po.texture]
                          , pi = po.width
                          , pT = po.height
                          , pV = EL.COLOR_BUFFER_BIT
                          , ps = []
                          , pG = po.stencilBuffer ? EL.DEPTH_STENCIL_ATTACHMENT : EL.DEPTH_ATTACHMENT
                          , pk = Ef.get(po)
                          , pW = !0x0 === po.isWebGLMultipleRenderTargets;
                        if (pW) {
                            for (var px = 0x0; px < pU.length; px++)
                                Eq.bindFramebuffer(EL.FRAMEBUFFER, pk.__webglMultisampledFramebuffer),
                                EL.framebufferRenderbuffer(EL.FRAMEBUFFER, EL.COLOR_ATTACHMENT0 + px, EL.RENDERBUFFER, null),
                                Eq.bindFramebuffer(EL.FRAMEBUFFER, pk.__webglFramebuffer),
                                EL.framebufferTexture2D(EL.DRAW_FRAMEBUFFER, EL.COLOR_ATTACHMENT0 + px, EL.TEXTURE_2D, null, 0x0);
                        }
                        Eq.bindFramebuffer(EL.READ_FRAMEBUFFER, pk.__webglMultisampledFramebuffer),
                        Eq.bindFramebuffer(EL.DRAW_FRAMEBUFFER, pk.__webglFramebuffer);
                        for (var pa = 0x0; pa < pU.length; pa++) {
                            ps.push(EL.COLOR_ATTACHMENT0 + pa),
                            po.depthBuffer && ps.push(pG);
                            var pI = void 0x0 !== pk.__ignoreDepthValues && pk.__ignoreDepthValues;
                            if (!0x1 === pI && (po.depthBuffer && (pV |= EL.DEPTH_BUFFER_BIT),
                            po.stencilBuffer && (pV |= EL.STENCIL_BUFFER_BIT)),
                            pW && EL.framebufferRenderbuffer(EL.READ_FRAMEBUFFER, EL.COLOR_ATTACHMENT0, EL.RENDERBUFFER, pk.__webglColorRenderbuffer[pa]),
                            !0x0 === pI && (EL.invalidateFramebuffer(EL.READ_FRAMEBUFFER, [pG]),
                            EL.invalidateFramebuffer(EL.DRAW_FRAMEBUFFER, [pG])),
                            pW) {
                                var pg = Ef.get(pU[pa]).__webglTexture;
                                EL.framebufferTexture2D(EL.DRAW_FRAMEBUFFER, EL.COLOR_ATTACHMENT0, EL.TEXTURE_2D, pg, 0x0);
                            }
                            EL.blitFramebuffer(0x0, 0x0, pi, pT, 0x0, 0x0, pi, pT, pV, EL.NEAREST),
                            p1 && EL.invalidateFramebuffer(EL.READ_FRAMEBUFFER, ps);
                        }
                        if (Eq.bindFramebuffer(EL.READ_FRAMEBUFFER, null),
                        Eq.bindFramebuffer(EL.DRAW_FRAMEBUFFER, null),
                        pW)
                            for (var pL = 0x0; pL < pU.length; pL++) {
                                Eq.bindFramebuffer(EL.FRAMEBUFFER, pk.__webglMultisampledFramebuffer),
                                EL.framebufferRenderbuffer(EL.FRAMEBUFFER, EL.COLOR_ATTACHMENT0 + pL, EL.RENDERBUFFER, pk.__webglColorRenderbuffer[pL]);
                                var pc = Ef.get(pU[pL]).__webglTexture;
                                Eq.bindFramebuffer(EL.FRAMEBUFFER, pk.__webglFramebuffer),
                                EL.framebufferTexture2D(EL.DRAW_FRAMEBUFFER, EL.COLOR_ATTACHMENT0 + pL, EL.TEXTURE_2D, pc, 0x0);
                            }
                        Eq.bindFramebuffer(EL.DRAW_FRAMEBUFFER, pk.__webglMultisampledFramebuffer);
                    }
                }
                ,
                this.setupDepthRenderbuffer = pl,
                this.setupFrameBufferTexture = pm,
                this.useMultisampledRTT = pN;
            }
            var EC = r2(0xc3ba)
              , EN = r2(0x28e3)
              , EZ = r2(0x12e4b)
              , Eh = r2(0xd5e4)
              , Eo = r2.n(Eh)
              , EU = r2(0x152de)
              , Ei = r2(0x161ea)
              , ET = r2(0x152d9)
              , EV = r2(0x658b);
            function Es(EL, Ec) {
                var Eq = 'undefined' != typeof Symbol && EL[Symbol.iterator] || EL['@@iterator'];
                if (Eq)
                    return (Eq = Eq.call(EL)).next.bind(Eq);
                if (Array.isArray(EL) || (Eq = function(EK, EY) {
                    if (!EK)
                        return;
                    if ('string' == typeof EK)
                        return EG(EK, EY);
                    var Ez = Object.prototype.toString.call(EK).slice(0x8, -0x1);
                    'Object' === Ez && EK.constructor && (Ez = EK.constructor.name);
                    if ('Map' === Ez || 'Set' === Ez)
                        return Array.from(EK);
                    if ('Arguments' === Ez || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(Ez))
                        return EG(EK, EY);
                }(EL)) || Ec && EL && 'number' == typeof EL.length) {
                    Eq && (EL = Eq);
                    var Ef = 0x0;
                    return function() {
                        return Ef >= EL.length ? {
                            'done': !0x0
                        } : {
                            'done': !0x1,
                            'value': EL[Ef++]
                        };
                    }
                    ;
                }
                throw new TypeError('Invalid\x20attempt\x20to\x20iterate\x20non-iterable\x20instance.\x0aIn\x20order\x20to\x20be\x20iterable,\x20non-array\x20objects\x20must\x20have\x20a\x20[Symbol.iterator]()\x20method.');
            }
            function EG(EL, Ec) {
                (null == Ec || Ec > EL.length) && (Ec = EL.length);
                for (var Eq = 0x0, Ef = new Array(Ec); Eq < Ec; Eq++)
                    Ef[Eq] = EL[Eq];
                return Ef;
            }
            var Ek = {
                'type': 'move'
            }
              , EW = (function() {
                function EL() {
                    this._targetRay = null,
                    this._grip = null,
                    this._hand = null;
                }
                var Ec = EL.prototype;
                return Ec.getHandSpace = function() {
                    return null === this._hand && (this._hand = new EV.Y(),
                    this._hand.matrixAutoUpdate = !0x1,
                    this._hand.visible = !0x1,
                    this._hand.joints = {},
                    this._hand.inputState = {
                        'pinching': !0x1
                    }),
                    this._hand;
                }
                ,
                Ec.getTargetRaySpace = function() {
                    return null === this._targetRay && (this._targetRay = new EV.Y(),
                    this._targetRay.matrixAutoUpdate = !0x1,
                    this._targetRay.visible = !0x1,
                    this._targetRay.hasLinearVelocity = !0x1,
                    this._targetRay.linearVelocity = new r9.P(),
                    this._targetRay.hasAngularVelocity = !0x1,
                    this._targetRay.angularVelocity = new r9.P()),
                    this._targetRay;
                }
                ,
                Ec.getGripSpace = function() {
                    return null === this._grip && (this._grip = new EV.Y(),
                    this._grip.matrixAutoUpdate = !0x1,
                    this._grip.visible = !0x1,
                    this._grip.hasLinearVelocity = !0x1,
                    this._grip.linearVelocity = new r9.P(),
                    this._grip.hasAngularVelocity = !0x1,
                    this._grip.angularVelocity = new r9.P()),
                    this._grip;
                }
                ,
                Ec.dispatchEvent = function(Eq) {
                    return null !== this._targetRay && this._targetRay.dispatchEvent(Eq),
                    null !== this._grip && this._grip.dispatchEvent(Eq),
                    null !== this._hand && this._hand.dispatchEvent(Eq),
                    this;
                }
                ,
                Ec.connect = function(Eq) {
                    if (Eq && Eq.hand) {
                        var Ef = this._hand;
                        if (Ef)
                            for (var EK, EY = Es(Eq.hand.values()); !(EK = EY()).done; ) {
                                var Ez = EK.value;
                                this._getHandJoint(Ef, Ez);
                            }
                    }
                    return this.dispatchEvent({
                        'type': 'connected',
                        'data': Eq
                    }),
                    this;
                }
                ,
                Ec.disconnect = function(Eq) {
                    return this.dispatchEvent({
                        'type': 'disconnected',
                        'data': Eq
                    }),
                    null !== this._targetRay && (this._targetRay.visible = !0x1),
                    null !== this._grip && (this._grip.visible = !0x1),
                    null !== this._hand && (this._hand.visible = !0x1),
                    this;
                }
                ,
                Ec.update = function(Eq, Ef, EK) {
                    var EY = null
                      , Ez = null
                      , EA = null
                      , Ej = this._targetRay
                      , EO = this._grip
                      , EJ = this._hand;
                    if (Eq && 'visible-blurred' !== Ef.session.visibilityState) {
                        if (EJ && Eq.hand) {
                            EA = !0x0;
                            for (var Ev, En = Es(Eq.hand.values()); !(Ev = En()).done; ) {
                                var Eb = Ev.value
                                  , ED = Ef.getJointPose(Eb, EK)
                                  , Eu = this._getHandJoint(EJ, Eb);
                                null !== ED && (Eu.matrix.fromArray(ED.transform.matrix),
                                Eu.matrix.decompose(Eu.position, Eu.rotation, Eu.scale),
                                Eu.matrixWorldNeedsUpdate = !0x0,
                                Eu.jointRadius = ED.radius),
                                Eu.visible = null !== ED;
                            }
                            var p0 = EJ.joints['index-finger-tip']
                              , p1 = EJ.joints['thumb-tip']
                              , p2 = p0.position.distanceTo(p1.position);
                            EJ.inputState.pinching && p2 > 0.025 ? (EJ.inputState.pinching = !0x1,
                            this.dispatchEvent({
                                'type': 'pinchend',
                                'handedness': Eq.handedness,
                                'target': this
                            })) : !EJ.inputState.pinching && p2 <= 0.015 && (EJ.inputState.pinching = !0x0,
                            this.dispatchEvent({
                                'type': 'pinchstart',
                                'handedness': Eq.handedness,
                                'target': this
                            }));
                        } else
                            null !== EO && Eq.gripSpace && null !== (Ez = Ef.getPose(Eq.gripSpace, EK)) && (EO.matrix.fromArray(Ez.transform.matrix),
                            EO.matrix.decompose(EO.position, EO.rotation, EO.scale),
                            EO.matrixWorldNeedsUpdate = !0x0,
                            Ez.linearVelocity ? (EO.hasLinearVelocity = !0x0,
                            EO.linearVelocity.copy(Ez.linearVelocity)) : EO.hasLinearVelocity = !0x1,
                            Ez.angularVelocity ? (EO.hasAngularVelocity = !0x0,
                            EO.angularVelocity.copy(Ez.angularVelocity)) : EO.hasAngularVelocity = !0x1);
                        null !== Ej && (null === (EY = Ef.getPose(Eq.targetRaySpace, EK)) && null !== Ez && (EY = Ez),
                        null !== EY && (Ej.matrix.fromArray(EY.transform.matrix),
                        Ej.matrix.decompose(Ej.position, Ej.rotation, Ej.scale),
                        Ej.matrixWorldNeedsUpdate = !0x0,
                        EY.linearVelocity ? (Ej.hasLinearVelocity = !0x0,
                        Ej.linearVelocity.copy(EY.linearVelocity)) : Ej.hasLinearVelocity = !0x1,
                        EY.angularVelocity ? (Ej.hasAngularVelocity = !0x0,
                        Ej.angularVelocity.copy(EY.angularVelocity)) : Ej.hasAngularVelocity = !0x1,
                        this.dispatchEvent(Ek)));
                    }
                    return null !== Ej && (Ej.visible = null !== EY),
                    null !== EO && (EO.visible = null !== Ez),
                    null !== EJ && (EJ.visible = null !== EA),
                    this;
                }
                ,
                Ec._getHandJoint = function(Eq, Ef) {
                    if (void 0x0 === Eq.joints[Ef.jointName]) {
                        var EK = new EV.Y();
                        EK.matrixAutoUpdate = !0x1,
                        EK.visible = !0x1,
                        Eq.joints[Ef.jointName] = EK,
                        Eq.add(EK);
                    }
                    return Eq.joints[Ef.jointName];
                }
                ,
                EL;
            }())
              , Ex = function(EL) {
                function Ec(Eq, Ef) {
                    var EK, EY = EK = EL.call(this) || this, Ez = null, EA = 0x1, Ej = null, EO = 'local-floor', EJ = 0x1, Ev = null, En = null, Eb = null, ED = null, Eu = null, p0 = null, p1 = Ef.getContextAttributes(), p2 = null, p3 = null, p4 = [], p5 = [], p6 = new r8.I(), p7 = null, p8 = new ET.u();
                    p8.layers.enable(0x1),
                    p8.viewport = new rr.I();
                    var p9 = new ET.u();
                    p9.layers.enable(0x2),
                    p9.viewport = new rr.I();
                    var pr = [p8, p9]
                      , pF = new EU.n();
                    pF.layers.enable(0x1),
                    pF.layers.enable(0x2);
                    var pE = null
                      , pp = null;
                    function pS(pM) {
                        var pX = p5.indexOf(pM.inputSource);
                        if (-0x1 !== pX) {
                            var pm = p4[pX];
                            void 0x0 !== pm && (pm.update(pM.inputSource, pM.frame, Ev || Ej),
                            pm.dispatchEvent({
                                'type': pM.type,
                                'data': pM.inputSource
                            }));
                        }
                    }
                    function pR() {
                        Ez.removeEventListener('select', pS),
                        Ez.removeEventListener('selectstart', pS),
                        Ez.removeEventListener('selectend', pS),
                        Ez.removeEventListener('squeeze', pS),
                        Ez.removeEventListener('squeezestart', pS),
                        Ez.removeEventListener('squeezeend', pS),
                        Ez.removeEventListener('end', pR),
                        Ez.removeEventListener('inputsourceschange', pH);
                        for (var pM = 0x0; pM < p4.length; pM++) {
                            var pX = p5[pM];
                            null !== pX && (p5[pM] = null,
                            p4[pM].disconnect(pX));
                        }
                        pE = null,
                        pp = null,
                        Eq.setRenderTarget(p2),
                        Eu = null,
                        ED = null,
                        Eb = null,
                        Ez = null,
                        p3 = null,
                        pB.stop(),
                        EY.isPresenting = !0x1,
                        Eq.setPixelRatio(p7),
                        Eq.setSize(p6.width, p6.height, !0x1),
                        EY.dispatchEvent({
                            'type': 'sessionend'
                        });
                    }
                    function pH(pM) {
                        for (var pX = 0x0; pX < pM.removed.length; pX++) {
                            var pm = pM.removed[pX]
                              , pw = p5.indexOf(pm);
                            pw >= 0x0 && (p5[pw] = null,
                            p4[pw].disconnect(pm));
                        }
                        for (var pl = 0x0; pl < pM.added.length; pl++) {
                            var pC = pM.added[pl]
                              , pN = p5.indexOf(pC);
                            if (-0x1 === pN) {
                                for (var pZ = 0x0; pZ < p4.length; pZ++) {
                                    if (pZ >= p5.length) {
                                        p5.push(pC),
                                        pN = pZ;
                                        break;
                                    }
                                    if (null === p5[pZ]) {
                                        p5[pZ] = pC,
                                        pN = pZ;
                                        break;
                                    }
                                }
                                if (-0x1 === pN)
                                    break;
                            }
                            var ph = p4[pN];
                            ph && ph.connect(pC);
                        }
                    }
                    EK.cameraAutoUpdate = !0x0,
                    EK.enabled = !0x1,
                    EK.isPresenting = !0x1,
                    EK.getController = function(pM) {
                        var pX = p4[pM];
                        return void 0x0 === pX && (pX = new EW(),
                        p4[pM] = pX),
                        pX.getTargetRaySpace();
                    }
                    ,
                    EK.getControllerGrip = function(pM) {
                        var pX = p4[pM];
                        return void 0x0 === pX && (pX = new EW(),
                        p4[pM] = pX),
                        pX.getGripSpace();
                    }
                    ,
                    EK.getHand = function(pM) {
                        var pX = p4[pM];
                        return void 0x0 === pX && (pX = new EW(),
                        p4[pM] = pX),
                        pX.getHandSpace();
                    }
                    ,
                    EK.setFramebufferScaleFactor = function(pM) {
                        EA = pM,
                        !0x0 === EY.isPresenting && console.warn('THREE.WebXRManager:\x20Cannot\x20change\x20framebuffer\x20scale\x20while\x20presenting.');
                    }
                    ,
                    EK.setReferenceSpaceType = function(pM) {
                        EO = pM,
                        !0x0 === EY.isPresenting && console.warn('THREE.WebXRManager:\x20Cannot\x20change\x20reference\x20space\x20type\x20while\x20presenting.');
                    }
                    ,
                    EK.getReferenceSpace = function() {
                        return Ev || Ej;
                    }
                    ,
                    EK.setReferenceSpace = function(pM) {
                        Ev = pM;
                    }
                    ,
                    EK.getBaseLayer = function() {
                        return null !== ED ? ED : Eu;
                    }
                    ,
                    EK.getBinding = function() {
                        return Eb;
                    }
                    ,
                    EK.getFrame = function() {
                        return p0;
                    }
                    ,
                    EK.getSession = function() {
                        return Ez;
                    }
                    ,
                    EK.setSession = (function() {
                        var pM = (0x0,
                        EN.A)(Eo().mark(function pX(pm) {
                            var pw, pl, pC, pN, pZ;
                            return Eo().wrap(function(ph) {
                                for (; ; )
                                    switch (ph.prev = ph.next) {
                                    case 0x0:
                                        if (null === (Ez = pm)) {
                                            ph.next = 0x1b;
                                            break;
                                        }
                                        if (p2 = Eq.getRenderTarget(),
                                        Ez.addEventListener('select', pS),
                                        Ez.addEventListener('selectstart', pS),
                                        Ez.addEventListener('selectend', pS),
                                        Ez.addEventListener('squeeze', pS),
                                        Ez.addEventListener('squeezestart', pS),
                                        Ez.addEventListener('squeezeend', pS),
                                        Ez.addEventListener('end', pR),
                                        Ez.addEventListener('inputsourceschange', pH),
                                        !0x0 === p1.xrCompatible) {
                                            ph.next = 0xe;
                                            break;
                                        }
                                        return ph.next = 0xe,
                                        Ef.makeXRCompatible();
                                    case 0xe:
                                        return p7 = Eq.getPixelRatio(),
                                        Eq.getSize(p6),
                                        void 0x0 === Ez.renderState.layers || !0x1 === Eq.capabilities.isWebGL2 ? (pw = {
                                            'antialias': void 0x0 !== Ez.renderState.layers || p1.antialias,
                                            'alpha': !0x0,
                                            'depth': p1.depth,
                                            'stencil': p1.stencil,
                                            'framebufferScaleFactor': EA
                                        },
                                        Eu = new XRWebGLLayer(Ez,Ef,pw),
                                        Ez.updateRenderState({
                                            'baseLayer': Eu
                                        }),
                                        Eq.setPixelRatio(0x1),
                                        Eq.setSize(Eu.framebufferWidth, Eu.framebufferHeight, !0x1),
                                        p3 = new Ed.n(Eu.framebufferWidth,Eu.framebufferHeight,{
                                            'format': r4.GWd,
                                            'type': r4.OUM,
                                            'colorSpace': Eq.outputColorSpace,
                                            'stencilBuffer': p1.stencil
                                        })) : (pl = null,
                                        pC = null,
                                        pN = null,
                                        p1.depth && (pN = p1.stencil ? Ef.DEPTH24_STENCIL8 : Ef.DEPTH_COMPONENT24,
                                        pl = p1.stencil ? r4.dcC : r4.zdS,
                                        pC = p1.stencil ? r4.V3x : r4.bkx),
                                        pZ = {
                                            'colorFormat': Ef.RGBA8,
                                            'depthFormat': pN,
                                            'scaleFactor': EA
                                        },
                                        Eb = new XRWebGLBinding(Ez,Ef),
                                        ED = Eb.createProjectionLayer(pZ),
                                        Ez.updateRenderState({
                                            'layers': [ED]
                                        }),
                                        Eq.setPixelRatio(0x1),
                                        Eq.setSize(ED.textureWidth, ED.textureHeight, !0x1),
                                        p3 = new Ed.n(ED.textureWidth,ED.textureHeight,{
                                            'format': r4.GWd,
                                            'type': r4.OUM,
                                            'depthTexture': new rK.V(ED.textureWidth,ED.textureHeight,pC,void 0x0,void 0x0,void 0x0,void 0x0,void 0x0,void 0x0,pl),
                                            'stencilBuffer': p1.stencil,
                                            'colorSpace': Eq.outputColorSpace,
                                            'samples': p1.antialias ? 0x4 : 0x0
                                        }),
                                        Eq.properties.get(p3).__ignoreDepthValues = ED.ignoreDepthValues),
                                        p3.isXRRenderTarget = !0x0,
                                        this.setFoveation(EJ),
                                        Ev = null,
                                        ph.next = 0x16,
                                        Ez.requestReferenceSpace(EO);
                                    case 0x16:
                                        Ej = ph.sent,
                                        pB.setContext(Ez),
                                        pB.start(),
                                        EY.isPresenting = !0x0,
                                        EY.dispatchEvent({
                                            'type': 'sessionstart'
                                        });
                                    case 0x1b:
                                    case 'end':
                                        return ph.stop();
                                    }
                            }, pX, this);
                        }));
                        return function(pm) {
                            return pM.apply(this, arguments);
                        }
                        ;
                    }()),
                    EK.getEnvironmentBlendMode = function() {
                        if (null !== Ez)
                            return Ez.environmentBlendMode;
                    }
                    ;
                    var py = new r9.P()
                      , pd = new r9.P();
                    function pP(pM, pX) {
                        null === pX ? pM.matrixWorld.copy(pM.matrix) : pM.matrixWorld.multiplyMatrices(pX.matrixWorld, pM.matrix),
                        pM.matrixWorldInverse.copy(pM.matrixWorld).invert();
                    }
                    EK.updateCamera = function(pM) {
                        if (null !== Ez) {
                            pF.near = p9.near = p8.near = pM.near,
                            pF.far = p9.far = p8.far = pM.far,
                            pE === pF.near && pp === pF.far || (Ez.updateRenderState({
                                'depthNear': pF.near,
                                'depthFar': pF.far
                            }),
                            pE = pF.near,
                            pp = pF.far);
                            var pX = pM.parent
                              , pm = pF.cameras;
                            pP(pF, pX);
                            for (var pw = 0x0; pw < pm.length; pw++)
                                pP(pm[pw], pX);
                            0x2 === pm.length ? function(pl, pC, pN) {
                                py.setFromMatrixPosition(pC.matrixWorld),
                                pd.setFromMatrixPosition(pN.matrixWorld);
                                var pZ = py.distanceTo(pd)
                                  , ph = pC.projectionMatrix.elements
                                  , po = pN.projectionMatrix.elements
                                  , pU = ph[0xe] / (ph[0xa] - 0x1)
                                  , pi = ph[0xe] / (ph[0xa] + 0x1)
                                  , pT = (ph[0x9] + 0x1) / ph[0x5]
                                  , pV = (ph[0x9] - 0x1) / ph[0x5]
                                  , ps = (ph[0x8] - 0x1) / ph[0x0]
                                  , pG = (po[0x8] + 0x1) / po[0x0]
                                  , pk = pU * ps
                                  , pW = pU * pG
                                  , px = pZ / (-ps + pG)
                                  , pa = px * -ps;
                                pC.matrixWorld.decompose(pl.position, pl.quaternion, pl.scale),
                                pl.translateX(pa),
                                pl.translateZ(px),
                                pl.matrixWorld.compose(pl.position, pl.quaternion, pl.scale),
                                pl.matrixWorldInverse.copy(pl.matrixWorld).invert();
                                var pI = pU + px
                                  , pg = pi + px
                                  , pL = pk - pa
                                  , pc = pW + (pZ - pa)
                                  , pq = pT * pi / pg * pI
                                  , pf = pV * pi / pg * pI;
                                pl.projectionMatrix.makePerspective(pL, pc, pq, pf, pI, pg),
                                pl.projectionMatrixInverse.copy(pl.projectionMatrix).invert();
                            }(pF, p8, p9) : pF.projectionMatrix.copy(p8.projectionMatrix),
                            function(pl, pC, pN) {
                                null === pN ? pl.matrix.copy(pC.matrixWorld) : (pl.matrix.copy(pN.matrixWorld),
                                pl.matrix.invert(),
                                pl.matrix.multiply(pC.matrixWorld)),
                                (pl.matrix.decompose(pl.position, pl.quaternion, pl.scale),
                                pl.updateMatrixWorld(!0x0),
                                pl.projectionMatrix.copy(pC.projectionMatrix),
                                pl.projectionMatrixInverse.copy(pC.projectionMatrixInverse),
                                pl.isPerspectiveCamera && (pl.fov = 0x2 * rF.a5 * Math.atan(0x1 / pl.projectionMatrix.elements[0x5]),
                                pl.zoom = 0x1));
                            }(pM, pF, pX);
                        }
                    }
                    ,
                    EK.getCamera = function() {
                        return pF;
                    }
                    ,
                    EK.getFoveation = function() {
                        if (null !== ED || null !== Eu)
                            return EJ;
                    }
                    ,
                    EK.setFoveation = function(pM) {
                        EJ = pM,
                        null !== ED && (ED.fixedFoveation = pM),
                        null !== Eu && void 0x0 !== Eu.fixedFoveation && (Eu.fixedFoveation = pM);
                    }
                    ;
                    var pQ = null
                      , pB = new rE.O();
                    return pB.setAnimationLoop(function(pM, pX) {
                        if (En = pX.getViewerPose(Ev || Ej),
                        p0 = pX,
                        null !== En) {
                            var pm = En.views;
                            null !== Eu && (Eq.setRenderTargetFramebuffer(p3, Eu.framebuffer),
                            Eq.setRenderTarget(p3));
                            var pw = !0x1;
                            pm.length !== pF.cameras.length && (pF.cameras.length = 0x0,
                            pw = !0x0);
                            for (var pl = 0x0; pl < pm.length; pl++) {
                                var pC = pm[pl]
                                  , pN = null;
                                if (null !== Eu)
                                    pN = Eu.getViewport(pC);
                                else {
                                    var pZ = Eb.getViewSubImage(ED, pC);
                                    pN = pZ.viewport,
                                    0x0 === pl && (Eq.setRenderTargetTextures(p3, pZ.colorTexture, ED.ignoreDepthValues ? void 0x0 : pZ.depthStencilTexture),
                                    Eq.setRenderTarget(p3));
                                }
                                var ph = pr[pl];
                                void 0x0 === ph && ((ph = new ET.u()).layers.enable(pl),
                                ph.viewport = new rr.I(),
                                pr[pl] = ph),
                                ph.matrix.fromArray(pC.transform.matrix),
                                ph.matrix.decompose(ph.position, ph.quaternion, ph.scale),
                                ph.projectionMatrix.fromArray(pC.projectionMatrix),
                                ph.projectionMatrixInverse.copy(ph.projectionMatrix).invert(),
                                ph.viewport.set(pN.x, pN.y, pN.width, pN.height),
                                0x0 === pl && (pF.matrix.copy(ph.matrix),
                                pF.matrix.decompose(pF.position, pF.quaternion, pF.scale)),
                                !0x0 === pw && pF.cameras.push(ph);
                            }
                        }
                        for (var po = 0x0; po < p4.length; po++) {
                            var pU = p5[po]
                              , pi = p4[po];
                            null !== pU && void 0x0 !== pi && pi.update(pU, pX, Ev || Ej);
                        }
                        pQ && pQ(pM, pX),
                        pX.detectedPlanes && EY.dispatchEvent({
                            'type': 'planesdetected',
                            'data': pX
                        }),
                        p0 = null;
                    }),
                    EK.setAnimationLoop = function(pM) {
                        pQ = pM;
                    }
                    ,
                    EK.dispose = function() {}
                    ,
                    EK;
                }
                return (0x0,
                EZ.A)(Ec, EL),
                Ec;
            }(Ei.Q);
            function Ea(EL, Ec) {
                function Eq(EK, EY) {
                    !0x0 === EK.matrixAutoUpdate && EK.updateMatrix(),
                    EY.value.copy(EK.matrix);
                }
                function Ef(EK, EY) {
                    EK.opacity.value = EY.opacity,
                    EY.color && EK.diffuse.value.copy(EY.color),
                    EY.emissive && EK.emissive.value.copy(EY.emissive).multiplyScalar(EY.emissiveIntensity),
                    EY.map && (EK.map.value = EY.map,
                    Eq(EY.map, EK.mapTransform)),
                    EY.alphaMap && (EK.alphaMap.value = EY.alphaMap,
                    Eq(EY.alphaMap, EK.alphaMapTransform)),
                    EY.bumpMap && (EK.bumpMap.value = EY.bumpMap,
                    Eq(EY.bumpMap, EK.bumpMapTransform),
                    EK.bumpScale.value = EY.bumpScale,
                    EY.side === r4.hsX && (EK.bumpScale.value *= -0x1)),
                    EY.normalMap && (EK.normalMap.value = EY.normalMap,
                    Eq(EY.normalMap, EK.normalMapTransform),
                    EK.normalScale.value.copy(EY.normalScale),
                    EY.side === r4.hsX && EK.normalScale.value.negate()),
                    EY.displacementMap && (EK.displacementMap.value = EY.displacementMap,
                    Eq(EY.displacementMap, EK.displacementMapTransform),
                    EK.displacementScale.value = EY.displacementScale,
                    EK.displacementBias.value = EY.displacementBias),
                    EY.emissiveMap && (EK.emissiveMap.value = EY.emissiveMap,
                    Eq(EY.emissiveMap, EK.emissiveMapTransform)),
                    EY.specularMap && (EK.specularMap.value = EY.specularMap,
                    Eq(EY.specularMap, EK.specularMapTransform)),
                    EY.alphaTest > 0x0 && (EK.alphaTest.value = EY.alphaTest);
                    var Ez = Ec.get(EY).envMap;
                    if (Ez && (EK.envMap.value = Ez,
                    EK.flipEnvMap.value = Ez.isCubeTexture && !0x1 === Ez.isRenderTargetTexture ? -0x1 : 0x1,
                    EK.reflectivity.value = EY.reflectivity,
                    EK.ior.value = EY.ior,
                    EK.refractionRatio.value = EY.refractionRatio),
                    EY.lightMap) {
                        EK.lightMap.value = EY.lightMap;
                        var EA = !0x0 === EL._useLegacyLights ? Math.PI : 0x1;
                        EK.lightMapIntensity.value = EY.lightMapIntensity * EA,
                        Eq(EY.lightMap, EK.lightMapTransform);
                    }
                    EY.aoMap && (EK.aoMap.value = EY.aoMap,
                    EK.aoMapIntensity.value = EY.aoMapIntensity,
                    Eq(EY.aoMap, EK.aoMapTransform));
                }
                return {
                    'refreshFogUniforms': function(EK, EY) {
                        EY.color.getRGB(EK.fogColor.value, (0x0,
                        rQ._U)(EL)),
                        EY.isFog ? (EK.fogNear.value = EY.near,
                        EK.fogFar.value = EY.far) : EY.isFogExp2 && (EK.fogDensity.value = EY.density);
                    },
                    'refreshMaterialUniforms': function(EK, EY, Ez, EA, Ej) {
                        EY.isMeshBasicMaterial || EY.isMeshLambertMaterial ? Ef(EK, EY) : EY.isMeshToonMaterial ? (Ef(EK, EY),
                        function(EO, EJ) {
                            EJ.gradientMap && (EO.gradientMap.value = EJ.gradientMap);
                        }(EK, EY)) : EY.isMeshPhongMaterial ? (Ef(EK, EY),
                        function(EO, EJ) {
                            EO.specular.value.copy(EJ.specular),
                            EO.shininess.value = Math.max(EJ.shininess, 0.0001);
                        }(EK, EY)) : EY.isMeshStandardMaterial ? (Ef(EK, EY),
                        function(EO, EJ) {
                            EO.metalness.value = EJ.metalness,
                            EJ.metalnessMap && (EO.metalnessMap.value = EJ.metalnessMap,
                            Eq(EJ.metalnessMap, EO.metalnessMapTransform)),
                            (EO.roughness.value = EJ.roughness,
                            EJ.roughnessMap && (EO.roughnessMap.value = EJ.roughnessMap,
                            Eq(EJ.roughnessMap, EO.roughnessMapTransform)));
                            var Ev = Ec.get(EJ).envMap;
                            Ev && (EO.envMapIntensity.value = EJ.envMapIntensity);
                        }(EK, EY),
                        EY.isMeshPhysicalMaterial && function(EO, EJ, Ev) {
                            EO.ior.value = EJ.ior,
                            EJ.sheen > 0x0 && (EO.sheenColor.value.copy(EJ.sheenColor).multiplyScalar(EJ.sheen),
                            EO.sheenRoughness.value = EJ.sheenRoughness,
                            EJ.sheenColorMap && (EO.sheenColorMap.value = EJ.sheenColorMap,
                            Eq(EJ.sheenColorMap, EO.sheenColorMapTransform)),
                            EJ.sheenRoughnessMap && (EO.sheenRoughnessMap.value = EJ.sheenRoughnessMap,
                            Eq(EJ.sheenRoughnessMap, EO.sheenRoughnessMapTransform))),
                            EJ.clearcoat > 0x0 && (EO.clearcoat.value = EJ.clearcoat,
                            EO.clearcoatRoughness.value = EJ.clearcoatRoughness,
                            EJ.clearcoatMap && (EO.clearcoatMap.value = EJ.clearcoatMap,
                            Eq(EJ.clearcoatMap, EO.clearcoatMapTransform)),
                            EJ.clearcoatRoughnessMap && (EO.clearcoatRoughnessMap.value = EJ.clearcoatRoughnessMap,
                            Eq(EJ.clearcoatRoughnessMap, EO.clearcoatRoughnessMapTransform)),
                            EJ.clearcoatNormalMap && (EO.clearcoatNormalMap.value = EJ.clearcoatNormalMap,
                            Eq(EJ.clearcoatNormalMap, EO.clearcoatNormalMapTransform),
                            EO.clearcoatNormalScale.value.copy(EJ.clearcoatNormalScale),
                            EJ.side === r4.hsX && EO.clearcoatNormalScale.value.negate())),
                            EJ.iridescence > 0x0 && (EO.iridescence.value = EJ.iridescence,
                            EO.iridescenceIOR.value = EJ.iridescenceIOR,
                            EO.iridescenceThicknessMinimum.value = EJ.iridescenceThicknessRange[0x0],
                            EO.iridescenceThicknessMaximum.value = EJ.iridescenceThicknessRange[0x1],
                            EJ.iridescenceMap && (EO.iridescenceMap.value = EJ.iridescenceMap,
                            Eq(EJ.iridescenceMap, EO.iridescenceMapTransform)),
                            EJ.iridescenceThicknessMap && (EO.iridescenceThicknessMap.value = EJ.iridescenceThicknessMap,
                            Eq(EJ.iridescenceThicknessMap, EO.iridescenceThicknessMapTransform))),
                            EJ.transmission > 0x0 && (EO.transmission.value = EJ.transmission,
                            EO.transmissionSamplerMap.value = Ev.texture,
                            EO.transmissionSamplerSize.value.set(Ev.width, Ev.height),
                            EJ.transmissionMap && (EO.transmissionMap.value = EJ.transmissionMap,
                            Eq(EJ.transmissionMap, EO.transmissionMapTransform)),
                            EO.thickness.value = EJ.thickness,
                            EJ.thicknessMap && (EO.thicknessMap.value = EJ.thicknessMap,
                            Eq(EJ.thicknessMap, EO.thicknessMapTransform)),
                            EO.attenuationDistance.value = EJ.attenuationDistance,
                            EO.attenuationColor.value.copy(EJ.attenuationColor)),
                            EJ.anisotropy > 0x0 && (EO.anisotropyVector.value.set(EJ.anisotropy * Math.cos(EJ.anisotropyRotation), EJ.anisotropy * Math.sin(EJ.anisotropyRotation)),
                            EJ.anisotropyMap && (EO.anisotropyMap.value = EJ.anisotropyMap,
                            Eq(EJ.anisotropyMap, EO.anisotropyMapTransform))),
                            (EO.specularIntensity.value = EJ.specularIntensity,
                            EO.specularColor.value.copy(EJ.specularColor),
                            EJ.specularColorMap && (EO.specularColorMap.value = EJ.specularColorMap,
                            Eq(EJ.specularColorMap, EO.specularColorMapTransform))),
                            EJ.specularIntensityMap && (EO.specularIntensityMap.value = EJ.specularIntensityMap,
                            Eq(EJ.specularIntensityMap, EO.specularIntensityMapTransform));
                        }(EK, EY, Ej)) : EY.isMeshMatcapMaterial ? (Ef(EK, EY),
                        function(EO, EJ) {
                            EJ.matcap && (EO.matcap.value = EJ.matcap);
                        }(EK, EY)) : EY.isMeshDepthMaterial ? Ef(EK, EY) : EY.isMeshDistanceMaterial ? (Ef(EK, EY),
                        function(EO, EJ) {
                            var Ev = Ec.get(EJ).light;
                            EO.referencePosition.value.setFromMatrixPosition(Ev.matrixWorld),
                            EO.nearDistance.value = Ev.shadow.camera.near,
                            EO.farDistance.value = Ev.shadow.camera.far;
                        }(EK, EY)) : EY.isMeshNormalMaterial ? Ef(EK, EY) : EY.isLineBasicMaterial ? (function(EO, EJ) {
                            EO.diffuse.value.copy(EJ.color),
                            EO.opacity.value = EJ.opacity,
                            EJ.map && (EO.map.value = EJ.map,
                            Eq(EJ.map, EO.mapTransform));
                        }(EK, EY),
                        EY.isLineDashedMaterial && function(EO, EJ) {
                            EO.dashSize.value = EJ.dashSize,
                            EO.totalSize.value = EJ.dashSize + EJ.gapSize,
                            EO.scale.value = EJ.scale;
                        }(EK, EY)) : EY.isPointsMaterial ? function(EO, EJ, Ev, En) {
                            EO.diffuse.value.copy(EJ.color),
                            EO.opacity.value = EJ.opacity,
                            EO.size.value = EJ.size * Ev,
                            EO.scale.value = 0.5 * En,
                            EJ.map && (EO.map.value = EJ.map,
                            Eq(EJ.map, EO.uvTransform)),
                            EJ.alphaMap && (EO.alphaMap.value = EJ.alphaMap,
                            Eq(EJ.alphaMap, EO.alphaMapTransform)),
                            EJ.alphaTest > 0x0 && (EO.alphaTest.value = EJ.alphaTest);
                        }(EK, EY, Ez, EA) : EY.isSpriteMaterial ? function(EO, EJ) {
                            EO.diffuse.value.copy(EJ.color),
                            EO.opacity.value = EJ.opacity,
                            EO.rotation.value = EJ.rotation,
                            EJ.map && (EO.map.value = EJ.map,
                            Eq(EJ.map, EO.mapTransform)),
                            EJ.alphaMap && (EO.alphaMap.value = EJ.alphaMap,
                            Eq(EJ.alphaMap, EO.alphaMapTransform)),
                            EJ.alphaTest > 0x0 && (EO.alphaTest.value = EJ.alphaTest);
                        }(EK, EY) : EY.isShadowMaterial ? (EK.color.value.copy(EY.color),
                        EK.opacity.value = EY.opacity) : EY.isShaderMaterial && (EY.uniformsNeedUpdate = !0x1);
                    }
                };
            }
            var EI = r2(0x9176)
              , Eg = (function() {
                return (0x0,
                r3.A)(function(EL) {
                    void 0x0 === EL && (EL = {});
                    var Ec, Eq = EL, Ef = Eq.canvas, EK = void 0x0 === Ef ? (0x0,
                    rV.lP)() : Ef, EY = Eq.context, Ez = void 0x0 === EY ? null : EY, EA = Eq.depth, Ej = void 0x0 === EA || EA, EO = Eq.stencil, EJ = void 0x0 === EO || EO, Ev = Eq.alpha, En = void 0x0 !== Ev && Ev, Eb = Eq.antialias, ED = void 0x0 !== Eb && Eb, Eu = Eq.premultipliedAlpha, p0 = void 0x0 === Eu || Eu, p1 = Eq.preserveDrawingBuffer, p2 = void 0x0 !== p1 && p1, p3 = Eq.powerPreference, p4 = void 0x0 === p3 ? 'default' : p3, p5 = Eq.failIfMajorPerformanceCaveat, p6 = void 0x0 !== p5 && p5;
                    this.isWebGLRenderer = !0x0,
                    Ec = null !== Ez ? Ez.getContextAttributes().alpha : En;
                    var p7 = new Uint32Array(0x4)
                      , p8 = new Int32Array(0x4)
                      , p9 = null
                      , pr = null
                      , pF = []
                      , pE = [];
                    this.domElement = EK,
                    this.debug = {
                        'checkShaderErrors': !0x0,
                        'onShaderError': null
                    },
                    this.autoClear = !0x0,
                    this.autoClearColor = !0x0,
                    this.autoClearDepth = !0x0,
                    this.autoClearStencil = !0x0,
                    this.sortObjects = !0x0,
                    this.clippingPlanes = [],
                    this.localClippingEnabled = !0x1,
                    this._outputColorSpace = r4.er$,
                    this._useLegacyLights = !0x1,
                    this.toneMapping = r4.y_p,
                    this.toneMappingExposure = 0x1;
                    var pp = this
                      , pS = !0x1
                      , pR = 0x0
                      , pH = 0x0
                      , py = null
                      , pd = -0x1
                      , pP = null
                      , pQ = new rr.I()
                      , pB = new rr.I()
                      , pM = null
                      , pX = new r5.Q(0x0)
                      , pm = 0x0
                      , pw = EK.width
                      , pl = EK.height
                      , pC = 0x1
                      , pN = null
                      , pZ = null
                      , ph = new rr.I(0x0,0x0,pw,pl)
                      , po = new rr.I(0x0,0x0,pw,pl)
                      , pU = !0x1
                      , pi = new r6.P()
                      , pT = !0x1
                      , pV = !0x1
                      , ps = null
                      , pG = new r7.k()
                      , pk = new r8.I()
                      , pW = new r9.P()
                      , px = {
                        'background': null,
                        'fog': null,
                        'environment': null,
                        'overrideMaterial': null,
                        'isScene': !0x0
                    };
                    function pa() {
                        return null === py ? pC : 0x1;
                    }
                    var pI, pg, pL, pc, pq, pf, pK, pY, pz, pA, pj, pO, pJ, pv, pn, pb, pD, pu, S0, S1, S2, S3, S4, S5, S6 = Ez;
                    function S7(SN, SZ) {
                        for (var Sh = 0x0; Sh < SN.length; Sh++) {
                            var So = SN[Sh]
                              , SU = EK.getContext(So, SZ);
                            if (null !== SU)
                                return SU;
                        }
                        return null;
                    }
                    try {
                        var S8 = {
                            'alpha': !0x0,
                            'depth': Ej,
                            'stencil': EJ,
                            'antialias': ED,
                            'premultipliedAlpha': p0,
                            'preserveDrawingBuffer': p2,
                            'powerPreference': p4,
                            'failIfMajorPerformanceCaveat': p6
                        };
                        if ('setAttribute'in EK && EK.setAttribute('data-engine', 'three.js\x20r' + r4.sPf),
                        EK.addEventListener('webglcontextlost', SE, !0x1),
                        EK.addEventListener('webglcontextrestored', Sp, !0x1),
                        EK.addEventListener('webglcontextcreationerror', SS, !0x1),
                        null === S6) {
                            var S9 = ['webgl2', 'webgl', 'experimental-webgl'];
                            if (!0x0 === pp.isWebGL1Renderer && S9.shift(),
                            null === (S6 = S7(S9, S8)))
                                throw S7(S9) ? new Error('Error\x20creating\x20WebGL\x20context\x20with\x20your\x20selected\x20attributes.') : new Error('Error\x20creating\x20WebGL\x20context.');
                        }
                        'undefined' != typeof WebGLRenderingContext && S6 instanceof WebGLRenderingContext && console.warn('THREE.WebGLRenderer:\x20WebGL\x201\x20support\x20was\x20deprecated\x20in\x20r153\x20and\x20will\x20be\x20removed\x20in\x20r163.'),
                        void 0x0 === S6.getShaderPrecisionFormat && (S6.getShaderPrecisionFormat = function() {
                            return {
                                'rangeMin': 0x1,
                                'rangeMax': 0x1,
                                'precision': 0x1
                            };
                        }
                        );
                    } catch (SN) {
                        throw console.error('THREE.WebGLRenderer:\x20' + SN.message),
                        SN;
                    }
                    function Sr() {
                        pI = new ri.C(S6),
                        pg = new rw.E(S6,pI,EL),
                        pI.init(pg),
                        S3 = new EC.h(S6,pI,pg),
                        pL = new Em(S6,pI,pg),
                        pc = new rk.i(S6),
                        pq = new E9.R(),
                        pf = new El(S6,pI,pL,pq,pg,S3,pc),
                        pK = new rh(pp),
                        pY = new rU(pp),
                        pz = new rp.B(S6,pg),
                        S4 = new rX(S6,pI,pz,pg),
                        pA = new rs(S6,pz,pc,S4),
                        pj = new rg.C(S6,pA,pz,pc),
                        S0 = new rI(S6,pg,pf),
                        pb = new rN(pq),
                        pO = new E8(pp,pK,pY,pI,pg,S4,pb),
                        pJ = new Ea(pp,pq),
                        pv = new Er.$(),
                        pn = new Ey(pI,pg),
                        pu = new rM(pp,pK,pY,pL,pj,Ec,p0),
                        pD = new EX(pp,pj,pg),
                        S5 = new EI.p(S6,pc,pg,pL),
                        S1 = new rm.b(S6,pI,pc,pg),
                        S2 = new rG.W(S6,pI,pc,pg),
                        pc.programs = pO.programs,
                        pp.capabilities = pg,
                        pp.extensions = pI,
                        pp.properties = pq,
                        pp.renderLists = pv,
                        pp.shadowMap = pD,
                        pp.state = pL,
                        pp.info = pc;
                    }
                    Sr();
                    var SF = new Ex(pp,S6);
                    function SE(SZ) {
                        SZ.preventDefault(),
                        console.log('THREE.WebGLRenderer:\x20Context\x20Lost.'),
                        pS = !0x0;
                    }
                    function Sp() {
                        console.log('THREE.WebGLRenderer:\x20Context\x20Restored.'),
                        pS = !0x1;
                        var SZ = pc.autoReset
                          , Sh = pD.enabled
                          , So = pD.autoUpdate
                          , SU = pD.needsUpdate
                          , Si = pD.type;
                        Sr(),
                        pc.autoReset = SZ,
                        pD.enabled = Sh,
                        pD.autoUpdate = So,
                        pD.needsUpdate = SU,
                        pD.type = Si;
                    }
                    function SS(SZ) {
                        console.error('THREE.WebGLRenderer:\x20A\x20WebGL\x20context\x20could\x20not\x20be\x20created.\x20Reason:\x20', SZ.statusMessage);
                    }
                    function SR(SZ) {
                        var Sh = SZ.target;
                        Sh.removeEventListener('dispose', SR),
                        function(So) {
                            (function(SU) {
                                var Si = pq.get(SU).programs;
                                void 0x0 !== Si && (Si.forEach(function(ST) {
                                    pO.releaseProgram(ST);
                                }),
                                SU.isShaderMaterial && pO.releaseShaderCache(SU));
                            }(So),
                            pq.remove(So));
                        }(Sh);
                    }
                    function SH(SZ, Sh, So) {
                        !0x0 === SZ.transparent && SZ.side === r4.$EB && !0x1 === SZ.forceSinglePass ? (SZ.side = r4.hsX,
                        SZ.needsUpdate = !0x0,
                        Sw(SZ, Sh, So),
                        SZ.side = r4.hB5,
                        SZ.needsUpdate = !0x0,
                        Sw(SZ, Sh, So),
                        SZ.side = r4.$EB) : Sw(SZ, Sh, So);
                    }
                    this.xr = SF,
                    this.getContext = function() {
                        return S6;
                    }
                    ,
                    this.getContextAttributes = function() {
                        return S6.getContextAttributes();
                    }
                    ,
                    this.forceContextLoss = function() {
                        var SZ = pI.get('WEBGL_lose_context');
                        SZ && SZ.loseContext();
                    }
                    ,
                    this.forceContextRestore = function() {
                        var SZ = pI.get('WEBGL_lose_context');
                        SZ && SZ.restoreContext();
                    }
                    ,
                    this.getPixelRatio = function() {
                        return pC;
                    }
                    ,
                    this.setPixelRatio = function(SZ) {
                        void 0x0 !== SZ && (pC = SZ,
                        this.setSize(pw, pl, !0x1));
                    }
                    ,
                    this.getSize = function(SZ) {
                        return SZ.set(pw, pl);
                    }
                    ,
                    this.setSize = function(SZ, Sh, So) {
                        void 0x0 === So && (So = !0x0),
                        SF.isPresenting ? console.warn('THREE.WebGLRenderer:\x20Can\x27t\x20change\x20size\x20while\x20VR\x20device\x20is\x20presenting.') : (pw = SZ,
                        pl = Sh,
                        EK.width = Math.floor(SZ * pC),
                        EK.height = Math.floor(Sh * pC),
                        !0x0 === So && (EK.style.width = SZ + 'px',
                        EK.style.height = Sh + 'px'),
                        this.setViewport(0x0, 0x0, SZ, Sh));
                    }
                    ,
                    this.getDrawingBufferSize = function(SZ) {
                        return SZ.set(pw * pC, pl * pC).floor();
                    }
                    ,
                    this.setDrawingBufferSize = function(SZ, Sh, So) {
                        pw = SZ,
                        pl = Sh,
                        pC = So,
                        EK.width = Math.floor(SZ * So),
                        EK.height = Math.floor(Sh * So),
                        this.setViewport(0x0, 0x0, SZ, Sh);
                    }
                    ,
                    this.getCurrentViewport = function(SZ) {
                        return SZ.copy(pQ);
                    }
                    ,
                    this.getViewport = function(SZ) {
                        return SZ.copy(ph);
                    }
                    ,
                    this.setViewport = function(SZ, Sh, So, SU) {
                        SZ.isVector4 ? ph.set(SZ.x, SZ.y, SZ.z, SZ.w) : ph.set(SZ, Sh, So, SU),
                        pL.viewport(pQ.copy(ph).multiplyScalar(pC).floor());
                    }
                    ,
                    this.getScissor = function(SZ) {
                        return SZ.copy(po);
                    }
                    ,
                    this.setScissor = function(SZ, Sh, So, SU) {
                        SZ.isVector4 ? po.set(SZ.x, SZ.y, SZ.z, SZ.w) : po.set(SZ, Sh, So, SU),
                        pL.scissor(pB.copy(po).multiplyScalar(pC).floor());
                    }
                    ,
                    this.getScissorTest = function() {
                        return pU;
                    }
                    ,
                    this.setScissorTest = function(SZ) {
                        pL.setScissorTest(pU = SZ);
                    }
                    ,
                    this.setOpaqueSort = function(SZ) {
                        pN = SZ;
                    }
                    ,
                    this.setTransparentSort = function(SZ) {
                        pZ = SZ;
                    }
                    ,
                    this.getClearColor = function(SZ) {
                        return SZ.copy(pu.getClearColor());
                    }
                    ,
                    this.setClearColor = function() {
                        pu.setClearColor.apply(pu, arguments);
                    }
                    ,
                    this.getClearAlpha = function() {
                        return pu.getClearAlpha();
                    }
                    ,
                    this.setClearAlpha = function() {
                        pu.setClearAlpha.apply(pu, arguments);
                    }
                    ,
                    this.clear = function(SZ, Sh, So) {
                        void 0x0 === SZ && (SZ = !0x0),
                        void 0x0 === Sh && (Sh = !0x0),
                        void 0x0 === So && (So = !0x0);
                        var SU = 0x0;
                        if (SZ) {
                            var Si = !0x1;
                            if (null !== py) {
                                var ST = py.texture.format;
                                Si = ST === r4.c90 || ST === r4.TkQ || ST === r4.ZQM;
                            }
                            if (Si) {
                                var SV = py.texture.type
                                  , Ss = SV === r4.OUM || SV === r4.bkx || SV === r4.cHt || SV === r4.V3x || SV === r4.Wew || SV === r4.gJ2
                                  , SG = pu.getClearColor()
                                  , Sk = pu.getClearAlpha()
                                  , SW = SG.r
                                  , Sx = SG.g
                                  , Sa = SG.b;
                                Ss ? (p7[0x0] = SW,
                                p7[0x1] = Sx,
                                p7[0x2] = Sa,
                                p7[0x3] = Sk,
                                S6.clearBufferuiv(S6.COLOR, 0x0, p7)) : (p8[0x0] = SW,
                                p8[0x1] = Sx,
                                p8[0x2] = Sa,
                                p8[0x3] = Sk,
                                S6.clearBufferiv(S6.COLOR, 0x0, p8));
                            } else
                                SU |= S6.COLOR_BUFFER_BIT;
                        }
                        Sh && (SU |= S6.DEPTH_BUFFER_BIT),
                        So && (SU |= S6.STENCIL_BUFFER_BIT,
                        this.state.buffers.stencil.setMask(0xffffffff)),
                        S6.clear(SU);
                    }
                    ,
                    this.clearColor = function() {
                        this.clear(!0x0, !0x1, !0x1);
                    }
                    ,
                    this.clearDepth = function() {
                        this.clear(!0x1, !0x0, !0x1);
                    }
                    ,
                    this.clearStencil = function() {
                        this.clear(!0x1, !0x1, !0x0);
                    }
                    ,
                    this.dispose = function() {
                        EK.removeEventListener('webglcontextlost', SE, !0x1),
                        EK.removeEventListener('webglcontextrestored', Sp, !0x1),
                        EK.removeEventListener('webglcontextcreationerror', SS, !0x1),
                        pv.dispose(),
                        pn.dispose(),
                        pq.dispose(),
                        pK.dispose(),
                        pY.dispose(),
                        pj.dispose(),
                        S4.dispose(),
                        S5.dispose(),
                        pO.dispose(),
                        SF.dispose(),
                        SF.removeEventListener('sessionstart', Sd),
                        SF.removeEventListener('sessionend', SP),
                        ps && (ps.dispose(),
                        ps = null),
                        SQ.stop();
                    }
                    ,
                    this.renderBufferDirect = function(SZ, Sh, So, SU, Si, ST) {
                        null === Sh && (Sh = px);
                        var SV = Si.isMesh && Si.matrixWorld.determinant() < 0x0
                          , Ss = function(SY, Sz, SA, Sj, SO) {
                            !0x0 !== Sz.isScene && (Sz = px),
                            pf.resetTextureUnits();
                            var SJ = Sz.fog
                              , Sv = Sj.isMeshStandardMaterial ? Sz.environment : null
                              , Sn = null === py ? pp.outputColorSpace : !0x0 === py.isXRRenderTarget ? py.texture.colorSpace : r4.Zr2
                              , Sb = (Sj.isMeshStandardMaterial ? pY : pK).get(Sj.envMap || Sv)
                              , SD = !0x0 === Sj.vertexColors && !!SA.attributes.color && 0x4 === SA.attributes.color.itemSize
                              , Su = !!SA.attributes.tangent && (!!Sj.normalMap || Sj.anisotropy > 0x0)
                              , e0 = !!SA.morphAttributes.position
                              , e1 = !!SA.morphAttributes.normal
                              , e2 = !!SA.morphAttributes.color
                              , e3 = r4.y_p;
                            Sj.toneMapped && (null !== py && !0x0 !== py.isXRRenderTarget || (e3 = pp.toneMapping));
                            var e4 = SA.morphAttributes.position || SA.morphAttributes.normal || SA.morphAttributes.color
                              , e5 = void 0x0 !== e4 ? e4.length : 0x0
                              , e6 = pq.get(Sj)
                              , e7 = pr.state.lights;
                            if (!0x0 === pT && (!0x0 === pV || SY !== pP)) {
                                var e8 = SY === pP && Sj.id === pd;
                                pb.setState(Sj, SY, e8);
                            }
                            var e9 = !0x1;
                            Sj.version === e6.__version ? e6.needsLights && e6.lightsStateVersion !== e7.state.version || e6.outputColorSpace !== Sn || SO.isBatchedMesh && !0x1 === e6.batching ? e9 = !0x0 : SO.isBatchedMesh || !0x0 !== e6.batching ? SO.isInstancedMesh && !0x1 === e6.instancing ? e9 = !0x0 : SO.isInstancedMesh || !0x0 !== e6.instancing ? SO.isSkinnedMesh && !0x1 === e6.skinning ? e9 = !0x0 : SO.isSkinnedMesh || !0x0 !== e6.skinning ? SO.isInstancedMesh && !0x0 === e6.instancingColor && null === SO.instanceColor || SO.isInstancedMesh && !0x1 === e6.instancingColor && null !== SO.instanceColor || e6.envMap !== Sb || !0x0 === Sj.fog && e6.fog !== SJ ? e9 = !0x0 : void 0x0 === e6.numClippingPlanes || e6.numClippingPlanes === pb.numPlanes && e6.numIntersection === pb.numIntersection ? (e6.vertexAlphas !== SD || e6.vertexTangents !== Su || e6.morphTargets !== e0 || e6.morphNormals !== e1 || e6.morphColors !== e2 || e6.toneMapping !== e3 || !0x0 === pg.isWebGL2 && e6.morphTargetsCount !== e5) && (e9 = !0x0) : e9 = !0x0 : e9 = !0x0 : e9 = !0x0 : e9 = !0x0 : (e9 = !0x0,
                            e6.__version = Sj.version);
                            var eF = e6.currentProgram;
                            !0x0 === e9 && (eF = Sw(Sj, Sz, SO));
                            var eE = !0x1
                              , ep = !0x1
                              , eS = !0x1
                              , eR = eF.getUniforms()
                              , eH = e6.uniforms;
                            pL.useProgram(eF.program) && (eE = !0x0,
                            ep = !0x0,
                            eS = !0x0),
                            Sj.id !== pd && (pd = Sj.id,
                            ep = !0x0);
                            if (eE || pP !== SY) {
                                eR.setValue(S6, 'projectionMatrix', SY.projectionMatrix),
                                eR.setValue(S6, 'viewMatrix', SY.matrixWorldInverse);
                                var ey = eR.map.cameraPosition;
                                void 0x0 !== ey && ey.setValue(S6, pW.setFromMatrixPosition(SY.matrixWorld)),
                                pg.logarithmicDepthBuffer && eR.setValue(S6, 'logDepthBufFC', 0x2 / (Math.log(SY.far + 0x1) / Math.LN2)),
                                (Sj.isMeshPhongMaterial || Sj.isMeshToonMaterial || Sj.isMeshLambertMaterial || Sj.isMeshBasicMaterial || Sj.isMeshStandardMaterial || Sj.isShaderMaterial) && eR.setValue(S6, 'isOrthographic', !0x0 === SY.isOrthographicCamera),
                                pP !== SY && (pP = SY,
                                ep = !0x0,
                                eS = !0x0);
                            }
                            if (SO.isSkinnedMesh) {
                                eR.setOptional(S6, SO, 'bindMatrix'),
                                eR.setOptional(S6, SO, 'bindMatrixInverse');
                                var ed = SO.skeleton;
                                ed && (pg.floatVertexTextures ? (null === ed.boneTexture && ed.computeBoneTexture(),
                                eR.setValue(S6, 'boneTexture', ed.boneTexture, pf)) : console.warn('THREE.WebGLRenderer:\x20SkinnedMesh\x20can\x20only\x20be\x20used\x20with\x20WebGL\x202.\x20With\x20WebGL\x201\x20OES_texture_float\x20and\x20vertex\x20textures\x20support\x20is\x20required.'));
                            }
                            SO.isBatchedMesh && (eR.setOptional(S6, SO, 'batchingTexture'),
                            eR.setValue(S6, 'batchingTexture', SO._matricesTexture, pf));
                            var eP = SA.morphAttributes;
                            (void 0x0 !== eP.position || void 0x0 !== eP.normal || void 0x0 !== eP.color && !0x0 === pg.isWebGL2) && S0.update(SO, SA, eF),
                            (ep || e6.receiveShadow !== SO.receiveShadow) && (e6.receiveShadow = SO.receiveShadow,
                            eR.setValue(S6, 'receiveShadow', SO.receiveShadow)),
                            Sj.isMeshGouraudMaterial && null !== Sj.envMap && (eH.envMap.value = Sb,
                            eH.flipEnvMap.value = Sb.isCubeTexture && !0x1 === Sb.isRenderTargetTexture ? -0x1 : 0x1),
                            ep && (eR.setValue(S6, 'toneMappingExposure', pp.toneMappingExposure),
                            e6.needsLights && (eB = eS,
                            (eQ = eH).ambientLightColor.needsUpdate = eB,
                            eQ.lightProbe.needsUpdate = eB,
                            eQ.directionalLights.needsUpdate = eB,
                            eQ.directionalLightShadows.needsUpdate = eB,
                            eQ.pointLights.needsUpdate = eB,
                            eQ.pointLightShadows.needsUpdate = eB,
                            eQ.spotLights.needsUpdate = eB,
                            eQ.spotLightShadows.needsUpdate = eB,
                            eQ.rectAreaLights.needsUpdate = eB,
                            eQ.hemisphereLights.needsUpdate = eB),
                            SJ && !0x0 === Sj.fog && pJ.refreshFogUniforms(eH, SJ),
                            pJ.refreshMaterialUniforms(eH, Sj, pC, pl, ps),
                            Ff.upload(S6, Sl(e6), eH, pf));
                            var eQ, eB;
                            Sj.isShaderMaterial && !0x0 === Sj.uniformsNeedUpdate && (Ff.upload(S6, Sl(e6), eH, pf),
                            Sj.uniformsNeedUpdate = !0x1),
                            Sj.isSpriteMaterial && eR.setValue(S6, 'center', SO.center);
                            if (eR.setValue(S6, 'modelViewMatrix', SO.modelViewMatrix),
                            eR.setValue(S6, 'normalMatrix', SO.normalMatrix),
                            eR.setValue(S6, 'modelMatrix', SO.matrixWorld),
                            Sj.isShaderMaterial || Sj.isRawShaderMaterial) {
                                for (var eM = Sj.uniformsGroups, eX = 0x0, em = eM.length; eX < em; eX++)
                                    if (pg.isWebGL2) {
                                        var ew = eM[eX];
                                        S5.update(ew, eF),
                                        S5.bind(ew, eF);
                                    } else
                                        console.warn('THREE.WebGLRenderer:\x20Uniform\x20Buffer\x20Objects\x20can\x20only\x20be\x20used\x20with\x20WebGL\x202.');
                            }
                            return eF;
                        }(SZ, Sh, So, SU, Si);
                        pL.setMaterial(SU, SV);
                        var SG = So.index
                          , Sk = 0x1;
                        if (!0x0 === SU.wireframe) {
                            if (void 0x0 === (SG = pA.getWireframeAttribute(So)))
                                return;
                            Sk = 0x2;
                        }
                        var SW = So.drawRange
                          , Sx = So.attributes.position
                          , Sa = SW.start * Sk
                          , SI = (SW.start + SW.count) * Sk;
                        null !== ST && (Sa = Math.max(Sa, ST.start * Sk),
                        SI = Math.min(SI, (ST.start + ST.count) * Sk)),
                        null !== SG ? (Sa = Math.max(Sa, 0x0),
                        SI = Math.min(SI, SG.count)) : null != Sx && (Sa = Math.max(Sa, 0x0),
                        SI = Math.min(SI, Sx.count));
                        var Sg = SI - Sa;
                        if (!(Sg < 0x0 || Sg === 0x1 / 0x0)) {
                            var SL;
                            S4.setup(Si, SU, Ss, So, SG);
                            var Sc = S1;
                            if (null !== SG && (SL = pz.get(SG),
                            (Sc = S2).setIndex(SL)),
                            Si.isMesh)
                                !0x0 === SU.wireframe ? (pL.setLineWidth(SU.wireframeLinewidth * pa()),
                                Sc.setMode(S6.LINES)) : Sc.setMode(S6.TRIANGLES);
                            else {
                                if (Si.isLine) {
                                    var Sq = SU.linewidth;
                                    void 0x0 === Sq && (Sq = 0x1),
                                    pL.setLineWidth(Sq * pa()),
                                    Si.isLineSegments ? Sc.setMode(S6.LINES) : Si.isLineLoop ? Sc.setMode(S6.LINE_LOOP) : Sc.setMode(S6.LINE_STRIP);
                                } else
                                    Si.isPoints ? Sc.setMode(S6.POINTS) : Si.isSprite && Sc.setMode(S6.TRIANGLES);
                            }
                            if (Si.isBatchedMesh)
                                Sc.renderMultiDraw(Si._multiDrawStarts, Si._multiDrawCounts, Si._multiDrawCount);
                            else {
                                if (Si.isInstancedMesh)
                                    Sc.renderInstances(Sa, Sg, Si.count);
                                else {
                                    if (So.isInstancedBufferGeometry) {
                                        var Sf = void 0x0 !== So._maxInstanceCount ? So._maxInstanceCount : 0x1 / 0x0
                                          , SK = Math.min(So.instanceCount, Sf);
                                        Sc.renderInstances(Sa, Sg, SK);
                                    } else
                                        Sc.render(Sa, Sg);
                                }
                            }
                        }
                    }
                    ,
                    this.compile = function(SZ, Sh, So) {
                        void 0x0 === So && (So = null),
                        null === So && (So = SZ),
                        (pr = pn.get(So)).init(),
                        pE.push(pr),
                        So.traverseVisible(function(Si) {
                            Si.isLight && Si.layers.test(Sh.layers) && (pr.pushLight(Si),
                            Si.castShadow && pr.pushShadow(Si));
                        }),
                        SZ !== So && SZ.traverseVisible(function(Si) {
                            Si.isLight && Si.layers.test(Sh.layers) && (pr.pushLight(Si),
                            Si.castShadow && pr.pushShadow(Si));
                        }),
                        pr.setupLights(pp._useLegacyLights);
                        var SU = new Set();
                        return SZ.traverse(function(Si) {
                            var ST = Si.material;
                            if (ST) {
                                if (Array.isArray(ST))
                                    for (var SV = 0x0; SV < ST.length; SV++) {
                                        var Ss = ST[SV];
                                        SH(Ss, So, Si),
                                        SU.add(Ss);
                                    }
                                else
                                    SH(ST, So, Si),
                                    SU.add(ST);
                            }
                        }),
                        pE.pop(),
                        pr = null,
                        SU;
                    }
                    ,
                    this.compileAsync = function(SZ, Sh, So) {
                        void 0x0 === So && (So = null);
                        var SU = this.compile(SZ, Sh, So);
                        return new Promise(function(Si) {
                            function ST() {
                                SU.forEach(function(SV) {
                                    pq.get(SV).currentProgram.isReady() && SU.delete(SV);
                                }),
                                0x0 !== SU.size ? setTimeout(ST, 0xa) : Si(SZ);
                            }
                            null !== pI.get('KHR_parallel_shader_compile') ? ST() : setTimeout(ST, 0xa);
                        }
                        );
                    }
                    ;
                    var Sy = null;
                    function Sd() {
                        SQ.stop();
                    }
                    function SP() {
                        SQ.start();
                    }
                    var SQ = new rE.O();
                    function SB(SZ, Sh, So, SU) {
                        if (!0x1 !== SZ.visible) {
                            if (SZ.layers.test(Sh.layers)) {
                                if (SZ.isGroup)
                                    So = SZ.renderOrder;
                                else {
                                    if (SZ.isLOD)
                                        !0x0 === SZ.autoUpdate && SZ.update(Sh);
                                    else {
                                        if (SZ.isLight)
                                            pr.pushLight(SZ),
                                            SZ.castShadow && pr.pushShadow(SZ);
                                        else {
                                            if (SZ.isSprite) {
                                                if (!SZ.frustumCulled || pi.intersectsSprite(SZ)) {
                                                    SU && pW.setFromMatrixPosition(SZ.matrixWorld).applyMatrix4(pG);
                                                    var Si = pj.update(SZ)
                                                      , ST = SZ.material;
                                                    ST.visible && p9.push(SZ, Si, ST, So, pW.z, null);
                                                }
                                            } else {
                                                if ((SZ.isMesh || SZ.isLine || SZ.isPoints) && (!SZ.frustumCulled || pi.intersectsObject(SZ))) {
                                                    var SV = pj.update(SZ)
                                                      , Ss = SZ.material;
                                                    if (SU && (void 0x0 !== SZ.boundingSphere ? (null === SZ.boundingSphere && SZ.computeBoundingSphere(),
                                                    pW.copy(SZ.boundingSphere.center)) : (null === SV.boundingSphere && SV.computeBoundingSphere(),
                                                    pW.copy(SV.boundingSphere.center)),
                                                    pW.applyMatrix4(SZ.matrixWorld).applyMatrix4(pG)),
                                                    Array.isArray(Ss))
                                                        for (var SG = SV.groups, Sk = 0x0, SW = SG.length; Sk < SW; Sk++) {
                                                            var Sx = SG[Sk]
                                                              , Sa = Ss[Sx.materialIndex];
                                                            Sa && Sa.visible && p9.push(SZ, SV, Sa, So, pW.z, Sx);
                                                        }
                                                    else
                                                        Ss.visible && p9.push(SZ, SV, Ss, So, pW.z, null);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            for (var SI = SZ.children, Sg = 0x0, SL = SI.length; Sg < SL; Sg++)
                                SB(SI[Sg], Sh, So, SU);
                        }
                    }
                    function SM(SZ, Sh, So, SU) {
                        var Si = SZ.opaque
                          , ST = SZ.transmissive
                          , SV = SZ.transparent;
                        pr.setupLightsView(So),
                        !0x0 === pT && pb.setGlobalState(pp.clippingPlanes, So),
                        ST.length > 0x0 && function(Ss, SG, Sk, SW) {
                            var Sx = !0x0 === Sk.isScene ? Sk.overrideMaterial : null;
                            if (null !== Sx)
                                return;
                            var Sa = pg.isWebGL2;
                            null === ps && (ps = new Ed.n(0x1,0x1,{
                                'generateMipmaps': !0x0,
                                'type': pI.has('EXT_color_buffer_half_float') ? r4.ix0 : r4.OUM,
                                'minFilter': r4.$_I,
                                'samples': Sa ? 0x4 : 0x0
                            })),
                            (pp.getDrawingBufferSize(pk),
                            Sa ? ps.setSize(pk.x, pk.y) : ps.setSize((0x0,
                            rF.Nf)(pk.x), (0x0,
                            rF.Nf)(pk.y)));
                            var SI = pp.getRenderTarget();
                            pp.setRenderTarget(ps),
                            pp.getClearColor(pX),
                            (pm = pp.getClearAlpha()) < 0x1 && pp.setClearColor(0xffffff, 0.5),
                            pp.clear();
                            var Sg = pp.toneMapping;
                            pp.toneMapping = r4.y_p,
                            SX(Ss, Sk, SW),
                            pf.updateMultisampleRenderTarget(ps),
                            pf.updateRenderTargetMipmap(ps);
                            for (var SL = !0x1, Sc = 0x0, Sq = SG.length; Sc < Sq; Sc++) {
                                var Sf = SG[Sc]
                                  , SK = Sf.object
                                  , SY = Sf.geometry
                                  , Sz = Sf.material
                                  , SA = Sf.group;
                                if (Sz.side === r4.$EB && SK.layers.test(SW.layers)) {
                                    var Sj = Sz.side;
                                    Sz.side = r4.hsX,
                                    Sz.needsUpdate = !0x0,
                                    Sm(SK, Sk, SW, SY, Sz, SA),
                                    Sz.side = Sj,
                                    Sz.needsUpdate = !0x0,
                                    SL = !0x0;
                                }
                            }
                            !0x0 === SL && (pf.updateMultisampleRenderTarget(ps),
                            pf.updateRenderTargetMipmap(ps)),
                            (pp.setRenderTarget(SI),
                            pp.setClearColor(pX, pm),
                            pp.toneMapping = Sg);
                        }(Si, ST, Sh, So),
                        SU && pL.viewport(pQ.copy(SU)),
                        Si.length > 0x0 && SX(Si, Sh, So),
                        ST.length > 0x0 && SX(ST, Sh, So),
                        SV.length > 0x0 && SX(SV, Sh, So),
                        pL.buffers.depth.setTest(!0x0),
                        pL.buffers.depth.setMask(!0x0),
                        pL.buffers.color.setMask(!0x0),
                        pL.setPolygonOffset(!0x1);
                    }
                    function SX(SZ, Sh, So) {
                        for (var SU = !0x0 === Sh.isScene ? Sh.overrideMaterial : null, Si = 0x0, ST = SZ.length; Si < ST; Si++) {
                            var SV = SZ[Si]
                              , Ss = SV.object
                              , SG = SV.geometry
                              , Sk = null === SU ? SV.material : SU
                              , SW = SV.group;
                            Ss.layers.test(So.layers) && Sm(Ss, Sh, So, SG, Sk, SW);
                        }
                    }
                    function Sm(SZ, Sh, So, SU, Si, ST) {
                        SZ.onBeforeRender(pp, Sh, So, SU, Si, ST),
                        SZ.modelViewMatrix.multiplyMatrices(So.matrixWorldInverse, SZ.matrixWorld),
                        SZ.normalMatrix.getNormalMatrix(SZ.modelViewMatrix),
                        Si.onBeforeRender(pp, Sh, So, SU, SZ, ST),
                        !0x0 === Si.transparent && Si.side === r4.$EB && !0x1 === Si.forceSinglePass ? (Si.side = r4.hsX,
                        Si.needsUpdate = !0x0,
                        pp.renderBufferDirect(So, Sh, SU, Si, SZ, ST),
                        Si.side = r4.hB5,
                        Si.needsUpdate = !0x0,
                        pp.renderBufferDirect(So, Sh, SU, Si, SZ, ST),
                        Si.side = r4.$EB) : pp.renderBufferDirect(So, Sh, SU, Si, SZ, ST),
                        SZ.onAfterRender(pp, Sh, So, SU, Si, ST);
                    }
                    function Sw(SZ, Sh, So) {
                        !0x0 !== Sh.isScene && (Sh = px);
                        var SU = pq.get(SZ)
                          , Si = pr.state.lights
                          , ST = pr.state.shadowsArray
                          , SV = Si.state.version
                          , Ss = pO.getParameters(SZ, Si.state, ST, Sh, So)
                          , SG = pO.getProgramCacheKey(Ss)
                          , Sk = SU.programs;
                        SU.environment = SZ.isMeshStandardMaterial ? Sh.environment : null,
                        SU.fog = Sh.fog,
                        SU.envMap = (SZ.isMeshStandardMaterial ? pY : pK).get(SZ.envMap || SU.environment),
                        void 0x0 === Sk && (SZ.addEventListener('dispose', SR),
                        Sk = new Map(),
                        SU.programs = Sk);
                        var SW = Sk.get(SG);
                        if (void 0x0 !== SW) {
                            if (SU.currentProgram === SW && SU.lightsStateVersion === SV)
                                return SC(SZ, Ss),
                                SW;
                        } else
                            Ss.uniforms = pO.getUniforms(SZ),
                            SZ.onBuild(So, Ss, pp),
                            SZ.onBeforeCompile(Ss, pp),
                            SW = pO.acquireProgram(Ss, SG),
                            Sk.set(SG, SW),
                            SU.uniforms = Ss.uniforms;
                        var Sx = SU.uniforms;
                        return (SZ.isShaderMaterial || SZ.isRawShaderMaterial) && !0x0 !== SZ.clipping || (Sx.clippingPlanes = pb.uniform),
                        SC(SZ, Ss),
                        SU.needsLights = function(Sa) {
                            return Sa.isMeshLambertMaterial || Sa.isMeshToonMaterial || Sa.isMeshPhongMaterial || Sa.isMeshStandardMaterial || Sa.isShadowMaterial || Sa.isShaderMaterial && !0x0 === Sa.lights;
                        }(SZ),
                        SU.lightsStateVersion = SV,
                        SU.needsLights && (Sx.ambientLightColor.value = Si.state.ambient,
                        Sx.lightProbe.value = Si.state.probe,
                        Sx.directionalLights.value = Si.state.directional,
                        Sx.directionalLightShadows.value = Si.state.directionalShadow,
                        Sx.spotLights.value = Si.state.spot,
                        Sx.spotLightShadows.value = Si.state.spotShadow,
                        Sx.rectAreaLights.value = Si.state.rectArea,
                        Sx.ltc_1.value = Si.state.rectAreaLTC1,
                        Sx.ltc_2.value = Si.state.rectAreaLTC2,
                        Sx.pointLights.value = Si.state.point,
                        Sx.pointLightShadows.value = Si.state.pointShadow,
                        Sx.hemisphereLights.value = Si.state.hemi,
                        Sx.directionalShadowMap.value = Si.state.directionalShadowMap,
                        Sx.directionalShadowMatrix.value = Si.state.directionalShadowMatrix,
                        Sx.spotShadowMap.value = Si.state.spotShadowMap,
                        Sx.spotLightMatrix.value = Si.state.spotLightMatrix,
                        Sx.spotLightMap.value = Si.state.spotLightMap,
                        Sx.pointShadowMap.value = Si.state.pointShadowMap,
                        Sx.pointShadowMatrix.value = Si.state.pointShadowMatrix),
                        SU.currentProgram = SW,
                        SU.uniformsList = null,
                        SW;
                    }
                    function Sl(SZ) {
                        if (null === SZ.uniformsList) {
                            var Sh = SZ.currentProgram.getUniforms();
                            SZ.uniformsList = Ff.seqWithValue(Sh.seq, SZ.uniforms);
                        }
                        return SZ.uniformsList;
                    }
                    function SC(SZ, Sh) {
                        var So = pq.get(SZ);
                        So.outputColorSpace = Sh.outputColorSpace,
                        So.batching = Sh.batching,
                        So.instancing = Sh.instancing,
                        So.instancingColor = Sh.instancingColor,
                        So.skinning = Sh.skinning,
                        So.morphTargets = Sh.morphTargets,
                        So.morphNormals = Sh.morphNormals,
                        So.morphColors = Sh.morphColors,
                        So.morphTargetsCount = Sh.morphTargetsCount,
                        So.numClippingPlanes = Sh.numClippingPlanes,
                        So.numIntersection = Sh.numClipIntersection,
                        So.vertexAlphas = Sh.vertexAlphas,
                        So.vertexTangents = Sh.vertexTangents,
                        So.toneMapping = Sh.toneMapping;
                    }
                    SQ.setAnimationLoop(function(SZ) {
                        Sy && Sy(SZ);
                    }),
                    'undefined' != typeof self && SQ.setContext(self),
                    this.setAnimationLoop = function(SZ) {
                        Sy = SZ,
                        SF.setAnimationLoop(SZ),
                        null === SZ ? SQ.stop() : SQ.start();
                    }
                    ,
                    SF.addEventListener('sessionstart', Sd),
                    SF.addEventListener('sessionend', SP),
                    this.render = function(SZ, Sh) {
                        if (void 0x0 === Sh || !0x0 === Sh.isCamera) {
                            if (!0x0 !== pS) {
                                !0x0 === SZ.matrixWorldAutoUpdate && SZ.updateMatrixWorld(),
                                null === Sh.parent && !0x0 === Sh.matrixWorldAutoUpdate && Sh.updateMatrixWorld(),
                                !0x0 === SF.enabled && !0x0 === SF.isPresenting && (!0x0 === SF.cameraAutoUpdate && SF.updateCamera(Sh),
                                Sh = SF.getCamera()),
                                !0x0 === SZ.isScene && SZ.onBeforeRender(pp, SZ, Sh, py),
                                (pr = pn.get(SZ, pE.length)).init(),
                                pE.push(pr),
                                pG.multiplyMatrices(Sh.projectionMatrix, Sh.matrixWorldInverse),
                                pi.setFromProjectionMatrix(pG),
                                pV = this.localClippingEnabled,
                                pT = pb.init(this.clippingPlanes, pV),
                                (p9 = pv.get(SZ, pF.length)).init(),
                                pF.push(p9),
                                SB(SZ, Sh, 0x0, pp.sortObjects),
                                p9.finish(),
                                !0x0 === pp.sortObjects && p9.sort(pN, pZ),
                                this.info.render.frame++,
                                !0x0 === pT && pb.beginShadows();
                                var So = pr.state.shadowsArray;
                                if (pD.render(So, SZ, Sh),
                                !0x0 === pT && pb.endShadows(),
                                !0x0 === this.info.autoReset && this.info.reset(),
                                pu.render(p9, SZ),
                                pr.setupLights(pp._useLegacyLights),
                                Sh.isArrayCamera)
                                    for (var SU = Sh.cameras, Si = 0x0, ST = SU.length; Si < ST; Si++) {
                                        var SV = SU[Si];
                                        SM(p9, SZ, SV, SV.viewport);
                                    }
                                else
                                    SM(p9, SZ, Sh);
                                null !== py && (pf.updateMultisampleRenderTarget(py),
                                pf.updateRenderTargetMipmap(py)),
                                !0x0 === SZ.isScene && SZ.onAfterRender(pp, SZ, Sh),
                                S4.resetDefaultState(),
                                pd = -0x1,
                                pP = null,
                                pE.pop(),
                                pr = pE.length > 0x0 ? pE[pE.length - 0x1] : null,
                                pF.pop(),
                                p9 = pF.length > 0x0 ? pF[pF.length - 0x1] : null;
                            }
                        } else
                            console.error('THREE.WebGLRenderer.render:\x20camera\x20is\x20not\x20an\x20instance\x20of\x20THREE.Camera.');
                    }
                    ,
                    this.getActiveCubeFace = function() {
                        return pR;
                    }
                    ,
                    this.getActiveMipmapLevel = function() {
                        return pH;
                    }
                    ,
                    this.getRenderTarget = function() {
                        return py;
                    }
                    ,
                    this.setRenderTargetTextures = function(SZ, Sh, So) {
                        pq.get(SZ.texture).__webglTexture = Sh,
                        pq.get(SZ.depthTexture).__webglTexture = So;
                        var SU = pq.get(SZ);
                        SU.__hasExternalTextures = !0x0,
                        SU.__hasExternalTextures && (SU.__autoAllocateDepthBuffer = void 0x0 === So,
                        SU.__autoAllocateDepthBuffer || !0x0 === pI.has('WEBGL_multisampled_render_to_texture') && (console.warn('THREE.WebGLRenderer:\x20Render-to-texture\x20extension\x20was\x20disabled\x20because\x20an\x20external\x20texture\x20was\x20provided'),
                        SU.__useRenderToTexture = !0x1));
                    }
                    ,
                    this.setRenderTargetFramebuffer = function(SZ, Sh) {
                        var So = pq.get(SZ);
                        So.__webglFramebuffer = Sh,
                        So.__useDefaultFramebuffer = void 0x0 === Sh;
                    }
                    ,
                    this.setRenderTarget = function(SZ, Sh, So) {
                        void 0x0 === Sh && (Sh = 0x0),
                        void 0x0 === So && (So = 0x0),
                        py = SZ,
                        pR = Sh,
                        pH = So;
                        var SU = !0x0
                          , Si = null
                          , ST = !0x1
                          , SV = !0x1;
                        if (SZ) {
                            var Ss = pq.get(SZ);
                            void 0x0 !== Ss.__useDefaultFramebuffer ? (pL.bindFramebuffer(S6.FRAMEBUFFER, null),
                            SU = !0x1) : void 0x0 === Ss.__webglFramebuffer ? pf.setupRenderTarget(SZ) : Ss.__hasExternalTextures && pf.rebindTextures(SZ, pq.get(SZ.texture).__webglTexture, pq.get(SZ.depthTexture).__webglTexture);
                            var SG = SZ.texture;
                            (SG.isData3DTexture || SG.isDataArrayTexture || SG.isCompressedArrayTexture) && (SV = !0x0);
                            var Sk = pq.get(SZ).__webglFramebuffer;
                            SZ.isWebGLCubeRenderTarget ? (Si = Array.isArray(Sk[Sh]) ? Sk[Sh][So] : Sk[Sh],
                            ST = !0x0) : Si = pg.isWebGL2 && SZ.samples > 0x0 && !0x1 === pf.useMultisampledRTT(SZ) ? pq.get(SZ).__webglMultisampledFramebuffer : Array.isArray(Sk) ? Sk[So] : Sk,
                            pQ.copy(SZ.viewport),
                            pB.copy(SZ.scissor),
                            pM = SZ.scissorTest;
                        } else
                            pQ.copy(ph).multiplyScalar(pC).floor(),
                            pB.copy(po).multiplyScalar(pC).floor(),
                            pM = pU;
                        if (pL.bindFramebuffer(S6.FRAMEBUFFER, Si) && pg.drawBuffers && SU && pL.drawBuffers(SZ, Si),
                        pL.viewport(pQ),
                        pL.scissor(pB),
                        pL.setScissorTest(pM),
                        ST) {
                            var SW = pq.get(SZ.texture);
                            S6.framebufferTexture2D(S6.FRAMEBUFFER, S6.COLOR_ATTACHMENT0, S6.TEXTURE_CUBE_MAP_POSITIVE_X + Sh, SW.__webglTexture, So);
                        } else {
                            if (SV) {
                                var Sx = pq.get(SZ.texture)
                                  , Sa = Sh || 0x0;
                                S6.framebufferTextureLayer(S6.FRAMEBUFFER, S6.COLOR_ATTACHMENT0, Sx.__webglTexture, So || 0x0, Sa);
                            }
                        }
                        pd = -0x1;
                    }
                    ,
                    this.readRenderTargetPixels = function(SZ, Sh, So, SU, Si, ST, SV) {
                        if (SZ && SZ.isWebGLRenderTarget) {
                            var Ss = pq.get(SZ).__webglFramebuffer;
                            if (SZ.isWebGLCubeRenderTarget && void 0x0 !== SV && (Ss = Ss[SV]),
                            Ss) {
                                pL.bindFramebuffer(S6.FRAMEBUFFER, Ss);
                                try {
                                    var SG = SZ.texture
                                      , Sk = SG.format
                                      , SW = SG.type;
                                    if (Sk !== r4.GWd && S3.convert(Sk) !== S6.getParameter(S6.IMPLEMENTATION_COLOR_READ_FORMAT))
                                        return void console.error('THREE.WebGLRenderer.readRenderTargetPixels:\x20renderTarget\x20is\x20not\x20in\x20RGBA\x20or\x20implementation\x20defined\x20format.');
                                    var Sx = SW === r4.ix0 && (pI.has('EXT_color_buffer_half_float') || pg.isWebGL2 && pI.has('EXT_color_buffer_float'));
                                    if (!(SW === r4.OUM || S3.convert(SW) === S6.getParameter(S6.IMPLEMENTATION_COLOR_READ_TYPE) || SW === r4.RQf && (pg.isWebGL2 || pI.has('OES_texture_float') || pI.has('WEBGL_color_buffer_float')) || Sx))
                                        return void console.error('THREE.WebGLRenderer.readRenderTargetPixels:\x20renderTarget\x20is\x20not\x20in\x20UnsignedByteType\x20or\x20implementation\x20defined\x20type.');
                                    Sh >= 0x0 && Sh <= SZ.width - SU && So >= 0x0 && So <= SZ.height - Si && S6.readPixels(Sh, So, SU, Si, S3.convert(Sk), S3.convert(SW), ST);
                                } finally {
                                    var Sa = null !== py ? pq.get(py).__webglFramebuffer : null;
                                    pL.bindFramebuffer(S6.FRAMEBUFFER, Sa);
                                }
                            }
                        } else
                            console.error('THREE.WebGLRenderer.readRenderTargetPixels:\x20renderTarget\x20is\x20not\x20THREE.WebGLRenderTarget.');
                    }
                    ,
                    this.copyFramebufferToTexture = function(SZ, Sh, So) {
                        void 0x0 === So && (So = 0x0);
                        var SU = Math.pow(0x2, -So)
                          , Si = Math.floor(Sh.image.width * SU)
                          , ST = Math.floor(Sh.image.height * SU);
                        pf.setTexture2D(Sh, 0x0),
                        S6.copyTexSubImage2D(S6.TEXTURE_2D, So, 0x0, 0x0, SZ.x, SZ.y, Si, ST),
                        pL.unbindTexture();
                    }
                    ,
                    this.copyTextureToTexture = function(SZ, Sh, So, SU) {
                        void 0x0 === SU && (SU = 0x0);
                        var Si = Sh.image.width
                          , ST = Sh.image.height
                          , SV = S3.convert(So.format)
                          , Ss = S3.convert(So.type);
                        pf.setTexture2D(So, 0x0),
                        S6.pixelStorei(S6.UNPACK_FLIP_Y_WEBGL, So.flipY),
                        S6.pixelStorei(S6.UNPACK_PREMULTIPLY_ALPHA_WEBGL, So.premultiplyAlpha),
                        S6.pixelStorei(S6.UNPACK_ALIGNMENT, So.unpackAlignment),
                        Sh.isDataTexture ? S6.texSubImage2D(S6.TEXTURE_2D, SU, SZ.x, SZ.y, Si, ST, SV, Ss, Sh.image.data) : Sh.isCompressedTexture ? S6.compressedTexSubImage2D(S6.TEXTURE_2D, SU, SZ.x, SZ.y, Sh.mipmaps[0x0].width, Sh.mipmaps[0x0].height, SV, Sh.mipmaps[0x0].data) : S6.texSubImage2D(S6.TEXTURE_2D, SU, SZ.x, SZ.y, SV, Ss, Sh.image),
                        0x0 === SU && So.generateMipmaps && S6.generateMipmap(S6.TEXTURE_2D),
                        pL.unbindTexture();
                    }
                    ,
                    this.copyTextureToTexture3D = function(SZ, Sh, So, SU, Si) {
                        if (void 0x0 === Si && (Si = 0x0),
                        pp.isWebGL1Renderer)
                            console.warn('THREE.WebGLRenderer.copyTextureToTexture3D:\x20can\x20only\x20be\x20used\x20with\x20WebGL2.');
                        else {
                            var ST, SV = SZ.max.x - SZ.min.x + 0x1, Ss = SZ.max.y - SZ.min.y + 0x1, SG = SZ.max.z - SZ.min.z + 0x1, Sk = S3.convert(SU.format), SW = S3.convert(SU.type);
                            if (SU.isData3DTexture)
                                pf.setTexture3D(SU, 0x0),
                                ST = S6.TEXTURE_3D;
                            else {
                                if (!SU.isDataArrayTexture)
                                    return void console.warn('THREE.WebGLRenderer.copyTextureToTexture3D:\x20only\x20supports\x20THREE.DataTexture3D\x20and\x20THREE.DataTexture2DArray.');
                                pf.setTexture2DArray(SU, 0x0),
                                ST = S6.TEXTURE_2D_ARRAY;
                            }
                            S6.pixelStorei(S6.UNPACK_FLIP_Y_WEBGL, SU.flipY),
                            S6.pixelStorei(S6.UNPACK_PREMULTIPLY_ALPHA_WEBGL, SU.premultiplyAlpha),
                            S6.pixelStorei(S6.UNPACK_ALIGNMENT, SU.unpackAlignment);
                            var Sx = S6.getParameter(S6.UNPACK_ROW_LENGTH)
                              , Sa = S6.getParameter(S6.UNPACK_IMAGE_HEIGHT)
                              , SI = S6.getParameter(S6.UNPACK_SKIP_PIXELS)
                              , Sg = S6.getParameter(S6.UNPACK_SKIP_ROWS)
                              , SL = S6.getParameter(S6.UNPACK_SKIP_IMAGES)
                              , Sc = So.isCompressedTexture ? So.mipmaps[0x0] : So.image;
                            S6.pixelStorei(S6.UNPACK_ROW_LENGTH, Sc.width),
                            S6.pixelStorei(S6.UNPACK_IMAGE_HEIGHT, Sc.height),
                            S6.pixelStorei(S6.UNPACK_SKIP_PIXELS, SZ.min.x),
                            S6.pixelStorei(S6.UNPACK_SKIP_ROWS, SZ.min.y),
                            S6.pixelStorei(S6.UNPACK_SKIP_IMAGES, SZ.min.z),
                            So.isDataTexture || So.isData3DTexture ? S6.texSubImage3D(ST, Si, Sh.x, Sh.y, Sh.z, SV, Ss, SG, Sk, SW, Sc.data) : So.isCompressedArrayTexture ? (console.warn('THREE.WebGLRenderer.copyTextureToTexture3D:\x20untested\x20support\x20for\x20compressed\x20srcTexture.'),
                            S6.compressedTexSubImage3D(ST, Si, Sh.x, Sh.y, Sh.z, SV, Ss, SG, Sk, Sc.data)) : S6.texSubImage3D(ST, Si, Sh.x, Sh.y, Sh.z, SV, Ss, SG, Sk, SW, Sc),
                            S6.pixelStorei(S6.UNPACK_ROW_LENGTH, Sx),
                            S6.pixelStorei(S6.UNPACK_IMAGE_HEIGHT, Sa),
                            S6.pixelStorei(S6.UNPACK_SKIP_PIXELS, SI),
                            S6.pixelStorei(S6.UNPACK_SKIP_ROWS, Sg),
                            S6.pixelStorei(S6.UNPACK_SKIP_IMAGES, SL),
                            0x0 === Si && SU.generateMipmaps && S6.generateMipmap(ST),
                            pL.unbindTexture();
                        }
                    }
                    ,
                    this.initTexture = function(SZ) {
                        SZ.isCubeTexture ? pf.setTextureCube(SZ, 0x0) : SZ.isData3DTexture ? pf.setTexture3D(SZ, 0x0) : SZ.isDataArrayTexture || SZ.isCompressedArrayTexture ? pf.setTexture2DArray(SZ, 0x0) : pf.setTexture2D(SZ, 0x0),
                        pL.unbindTexture();
                    }
                    ,
                    this.resetState = function() {
                        pR = 0x0,
                        pH = 0x0,
                        py = null,
                        pL.reset(),
                        S4.reset();
                    }
                    ,
                    'undefined' != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe',{
                        'detail': this
                    }));
                }, [{
                    'key': 'coordinateSystem',
                    'get': function() {
                        return r4.TdN;
                    }
                }, {
                    'key': 'outputColorSpace',
                    'get': function() {
                        return this._outputColorSpace;
                    },
                    'set': function(EL) {
                        this._outputColorSpace = EL;
                        var Ec = this.getContext();
                        Ec.drawingBufferColorSpace = EL === r4.V5c ? 'display-p3' : 'srgb',
                        Ec.unpackColorSpace = ry.pp.workingColorSpace === r4.qIQ ? 'display-p3' : 'srgb';
                    }
                }, {
                    'key': 'physicallyCorrectLights',
                    'get': function() {
                        return console.warn('THREE.WebGLRenderer:\x20The\x20property\x20.physicallyCorrectLights\x20has\x20been\x20removed.\x20Set\x20renderer.useLegacyLights\x20instead.'),
                        !this.useLegacyLights;
                    },
                    'set': function(EL) {
                        console.warn('THREE.WebGLRenderer:\x20The\x20property\x20.physicallyCorrectLights\x20has\x20been\x20removed.\x20Set\x20renderer.useLegacyLights\x20instead.'),
                        this.useLegacyLights = !EL;
                    }
                }, {
                    'key': 'outputEncoding',
                    'get': function() {
                        return console.warn('THREE.WebGLRenderer:\x20Property\x20.outputEncoding\x20has\x20been\x20removed.\x20Use\x20.outputColorSpace\x20instead.'),
                        this.outputColorSpace === r4.er$ ? r4.S2Q : r4.tgE;
                    },
                    'set': function(EL) {
                        console.warn('THREE.WebGLRenderer:\x20Property\x20.outputEncoding\x20has\x20been\x20removed.\x20Use\x20.outputColorSpace\x20instead.'),
                        this.outputColorSpace = EL === r4.S2Q ? r4.er$ : r4.Zr2;
                    }
                }, {
                    'key': 'useLegacyLights',
                    'get': function() {
                        return console.warn('THREE.WebGLRenderer:\x20The\x20property\x20.useLegacyLights\x20has\x20been\x20deprecated.\x20Migrate\x20your\x20lighting\x20according\x20to\x20the\x20following\x20guide:\x20https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.'),
                        this._useLegacyLights;
                    },
                    'set': function(EL) {
                        console.warn('THREE.WebGLRenderer:\x20The\x20property\x20.useLegacyLights\x20has\x20been\x20deprecated.\x20Migrate\x20your\x20lighting\x20according\x20to\x20the\x20following\x20guide:\x20https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.'),
                        this._useLegacyLights = EL;
                    }
                }]);
            }());
        }
        ,
        0x58c9: (H, y, d) => {
            'use strict';
            d.d(y, {
                'f': () => M
            });
            var P = d(0x169b1)
              , Q = d(0x1264d)
              , B = d(0x3e78)
              , M = {
                'common': {
                    'diffuse': {
                        'value': new P.Q(0xffffff)
                    },
                    'opacity': {
                        'value': 0x1
                    },
                    'map': {
                        'value': null
                    },
                    'mapTransform': {
                        'value': new B.d()
                    },
                    'alphaMap': {
                        'value': null
                    },
                    'alphaMapTransform': {
                        'value': new B.d()
                    },
                    'alphaTest': {
                        'value': 0x0
                    }
                },
                'specularmap': {
                    'specularMap': {
                        'value': null
                    },
                    'specularMapTransform': {
                        'value': new B.d()
                    }
                },
                'envmap': {
                    'envMap': {
                        'value': null
                    },
                    'flipEnvMap': {
                        'value': -0x1
                    },
                    'reflectivity': {
                        'value': 0x1
                    },
                    'ior': {
                        'value': 1.5
                    },
                    'refractionRatio': {
                        'value': 0.98
                    }
                },
                'aomap': {
                    'aoMap': {
                        'value': null
                    },
                    'aoMapIntensity': {
                        'value': 0x1
                    },
                    'aoMapTransform': {
                        'value': new B.d()
                    }
                },
                'lightmap': {
                    'lightMap': {
                        'value': null
                    },
                    'lightMapIntensity': {
                        'value': 0x1
                    },
                    'lightMapTransform': {
                        'value': new B.d()
                    }
                },
                'bumpmap': {
                    'bumpMap': {
                        'value': null
                    },
                    'bumpMapTransform': {
                        'value': new B.d()
                    },
                    'bumpScale': {
                        'value': 0x1
                    }
                },
                'normalmap': {
                    'normalMap': {
                        'value': null
                    },
                    'normalMapTransform': {
                        'value': new B.d()
                    },
                    'normalScale': {
                        'value': new Q.I(0x1,0x1)
                    }
                },
                'displacementmap': {
                    'displacementMap': {
                        'value': null
                    },
                    'displacementMapTransform': {
                        'value': new B.d()
                    },
                    'displacementScale': {
                        'value': 0x1
                    },
                    'displacementBias': {
                        'value': 0x0
                    }
                },
                'emissivemap': {
                    'emissiveMap': {
                        'value': null
                    },
                    'emissiveMapTransform': {
                        'value': new B.d()
                    }
                },
                'metalnessmap': {
                    'metalnessMap': {
                        'value': null
                    },
                    'metalnessMapTransform': {
                        'value': new B.d()
                    }
                },
                'roughnessmap': {
                    'roughnessMap': {
                        'value': null
                    },
                    'roughnessMapTransform': {
                        'value': new B.d()
                    }
                },
                'gradientmap': {
                    'gradientMap': {
                        'value': null
                    }
                },
                'fog': {
                    'fogDensity': {
                        'value': 0.00025
                    },
                    'fogNear': {
                        'value': 0x1
                    },
                    'fogFar': {
                        'value': 0x7d0
                    },
                    'fogColor': {
                        'value': new P.Q(0xffffff)
                    }
                },
                'lights': {
                    'ambientLightColor': {
                        'value': []
                    },
                    'lightProbe': {
                        'value': []
                    },
                    'directionalLights': {
                        'value': [],
                        'properties': {
                            'direction': {},
                            'color': {}
                        }
                    },
                    'directionalLightShadows': {
                        'value': [],
                        'properties': {
                            'shadowBias': {},
                            'shadowNormalBias': {},
                            'shadowRadius': {},
                            'shadowMapSize': {}
                        }
                    },
                    'directionalShadowMap': {
                        'value': []
                    },
                    'directionalShadowMatrix': {
                        'value': []
                    },
                    'spotLights': {
                        'value': [],
                        'properties': {
                            'color': {},
                            'position': {},
                            'direction': {},
                            'distance': {},
                            'coneCos': {},
                            'penumbraCos': {},
                            'decay': {}
                        }
                    },
                    'spotLightShadows': {
                        'value': [],
                        'properties': {
                            'shadowBias': {},
                            'shadowNormalBias': {},
                            'shadowRadius': {},
                            'shadowMapSize': {}
                        }
                    },
                    'spotLightMap': {
                        'value': []
                    },
                    'spotShadowMap': {
                        'value': []
                    },
                    'spotLightMatrix': {
                        'value': []
                    },
                    'pointLights': {
                        'value': [],
                        'properties': {
                            'color': {},
                            'position': {},
                            'decay': {},
                            'distance': {}
                        }
                    },
                    'pointLightShadows': {
                        'value': [],
                        'properties': {
                            'shadowBias': {},
                            'shadowNormalBias': {},
                            'shadowRadius': {},
                            'shadowMapSize': {},
                            'shadowCameraNear': {},
                            'shadowCameraFar': {}
                        }
                    },
                    'pointShadowMap': {
                        'value': []
                    },
                    'pointShadowMatrix': {
                        'value': []
                    },
                    'hemisphereLights': {
                        'value': [],
                        'properties': {
                            'direction': {},
                            'skyColor': {},
                            'groundColor': {}
                        }
                    },
                    'rectAreaLights': {
                        'value': [],
                        'properties': {
                            'color': {},
                            'position': {},
                            'width': {},
                            'height': {}
                        }
                    },
                    'ltc_1': {
                        'value': null
                    },
                    'ltc_2': {
                        'value': null
                    }
                },
                'points': {
                    'diffuse': {
                        'value': new P.Q(0xffffff)
                    },
                    'opacity': {
                        'value': 0x1
                    },
                    'size': {
                        'value': 0x1
                    },
                    'scale': {
                        'value': 0x1
                    },
                    'map': {
                        'value': null
                    },
                    'alphaMap': {
                        'value': null
                    },
                    'alphaMapTransform': {
                        'value': new B.d()
                    },
                    'alphaTest': {
                        'value': 0x0
                    },
                    'uvTransform': {
                        'value': new B.d()
                    }
                },
                'sprite': {
                    'diffuse': {
                        'value': new P.Q(0xffffff)
                    },
                    'opacity': {
                        'value': 0x1
                    },
                    'center': {
                        'value': new Q.I(0.5,0.5)
                    },
                    'rotation': {
                        'value': 0x0
                    },
                    'map': {
                        'value': null
                    },
                    'mapTransform': {
                        'value': new B.d()
                    },
                    'alphaMap': {
                        'value': null
                    },
                    'alphaMapTransform': {
                        'value': new B.d()
                    },
                    'alphaTest': {
                        'value': 0x0
                    }
                }
            };
        }
        ,
        0x1ea9: (H, y, d) => {
            'use strict';
            d(0x16f53);
        }
        ,
        0x2277: (H, y, d) => {
            'use strict';
            d(0x17417),
            d(0x172d2);
        }
        ,
        0x1ca: (H, Q, B) => {
            'use strict';
            var X, Z = B(0x172d2), V = (B(0x1653d),
            B(0x50af),
            B(0xbd7f),
            B(0x101b9),
            B(0xc42c),
            B(0x178c5),
            B(0x5d85),
            B(0x9c0d),
            B(0x58c9),
            B(0x41ef),
            B(0xfdaa),
            B(0xb9f2),
            B(0x12331),
            B(0x1ea9),
            B(0x137fb),
            B(0x138bf),
            B(0x162d1),
            B(0x8fb1),
            B(0xad2c),
            B(0x1152b),
            B(0x4bd8),
            B(0xad70),
            B(0x1499a),
            B(0x11f76),
            B(0x7404),
            B(0xf5e1),
            B(0x658b),
            B(0x14b20),
            B(0x6dbc),
            B(0x14f63),
            B(0x2277),
            B(0xc71e),
            B(0x10762),
            B(0x308),
            B(0xdc03),
            B(0x11073),
            B(0xb12c),
            B(0x24cb),
            B(0xac1a),
            B(0x17417),
            B(0x22e6),
            B(0x13eec),
            B(0xd109),
            B(0x350f),
            B(0x16d53),
            B(0x8558),
            B(0x14b92),
            B(0x1191),
            B(0x16d92),
            B(0x1036c),
            B(0x1708b),
            B(0x6235),
            B(0xd192),
            B(0x16e3b),
            B(0x10c9e),
            B(0x12c97),
            B(0x5eb0),
            B(0x31f1),
            B(0x1535f),
            B(0x1348d),
            B(0xb8f1),
            B(0x1503f),
            B(0x20d1),
            B(0x152d9),
            B(0x17743),
            B(0x306c),
            B(0x152de),
            B(0xab79),
            B(0x130b4),
            B(0x9232),
            B(0xcc0c),
            B(0xdc9),
            B(0x748b),
            B(0x29c0),
            B(0xc7b),
            B(0xe961),
            B(0x11ac),
            B(0xd314),
            B(0x7530),
            B(0xe70),
            B(0x11c87),
            B(0xbd44),
            B(0xe233),
            B(0x4fda),
            B(0x143ce),
            B(0xfbe),
            B(0x18a3),
            B(0x12e6c),
            B(0x16835),
            B(0xd3e8),
            B(0x4eb9),
            B(0x8222),
            B(0x76e),
            B(0x17dfd),
            B(0x16f53),
            B(0xd973),
            B(0x131b5),
            B(0x3696),
            B(0x37c8),
            B(0xbd95),
            B(0x2755),
            B(0xa3bc),
            B(0x6a24),
            B(0x79b5),
            B(0xbf9a),
            B(0x11ded),
            B(0x3e78),
            B(0x7002),
            B(0xb7f1),
            B(0x14b45),
            B(0x147e3),
            B(0xb3ef),
            B(0x1008e),
            B(0x1264d),
            B(0x13294),
            B(0x169b1));
            B(0x4efe),
            B(0xe3ac),
            B(0x15281),
            B(0x7396),
            B(0x17c23),
            B(0x71a1),
            B(0x14b85),
            B(0x7ebd),
            B(0x8d79),
            B(0xb396),
            B(0x1461c),
            B(0x17e6f),
            B(0x1a2f),
            B(0x16ac),
            B(0xcde0),
            B(0x144de),
            B(0x11562),
            B(0xf750),
            B(0x1819d),
            B(0x6bf),
            B(0x52dc),
            B(0x4e82),
            B(0x10d2d),
            B(0xf066),
            B(0x10fc5),
            B(0xc3ba),
            B(0x1078a),
            ('undefined' != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('register',{
                'detail': {
                    'revision': Z.sPf
                }
            })),
            'undefined' != typeof window && (window.__THREE__ ? console.warn('WARNING:\x20Multiple\x20instances\x20of\x20Three.js\x20being\x20imported.') : window.__THREE__ = Z.sPf));
            var G = 0x1
              , k = 0x2
              , W = 0x3
              , q = 0x4
              , K = 0x5
              , Y = 0x6
              , z = 0x7
              , j = 0x8
              , O = 0x9
              , J = 0xa
              , D = 0xb
              , r0 = 0xc
              , r1 = 0xd
              , r2 = 0xe
              , r3 = 0xf
              , r4 = 0x10
              , r5 = 0x11
              , r6 = 0x12
              , r7 = 0x13
              , r8 = 0x14
              , r9 = 0x15
              , rr = 0x16
              , rF = 0x17;
            (X = {})[0x0] = B(0x5e66),
            X[G] = B(0x14533),
            X[k] = B(0xb663),
            X[W] = B(0x71cc),
            X[q] = B(0x654e),
            X[K] = B(0xbef9),
            X[Y] = B(0x3fa2),
            X[z] = B(0x32d6),
            X[j] = B(0x9c12),
            X[O] = B(0x5bef),
            X[J] = B(0xdd70),
            X[D] = B(0x8cc4),
            X[r0] = B(0x5507),
            X[r1] = B(0xe6b1),
            X[r2] = B(0x4494),
            X[r3] = B(0x11d1d),
            X[r4] = B(0x3d98),
            X[r5] = B(0x16a51),
            X[r6] = B(0x5fcb),
            X[r7] = B(0x5ba),
            X[r8] = B(0x26d3),
            X[r9] = B(0xbc1c),
            X[rr] = B(0xc666),
            X[rF] = B(0x50ef);
            var rE = function(rd, rP, rQ) {
                return {
                    'bbZ': rd,
                    'bbB': rP,
                    'bbd': rQ
                };
            };
            'undefined' != typeof window && 'test.cuberealm.io' === window.location.hostname ? 'https://test-api.cuberealm.io/v1' : 'undefined' != typeof window && 'cuberealm.io' === window.location.hostname && 'https://api.cuberealm.io/v1',
            ('undefined' == typeof navigator || void 0x0 === navigator.hardwareConcurrency || navigator.hardwareConcurrency,
            rE(0.6, 1.8, 0.6),
            rE(0.55, 1.3, 0.55));
            const rp = 0.05;
            new V.Q(0.4,0xac / 0xff,0x1).convertSRGBToLinear(),
            new V.Q(0x6e / 0xff,0x16 / 0xff,0x1d / 0xff).convertSRGBToLinear(),
            new V.Q(0x1e / 0xff,0x1e / 0xff,0x1e / 0xff).convertSRGBToLinear(),
            new V.Q(0x1e / 0xff,0x1e / 0xff,0x1e / 0xff).convertSRGBToLinear(),
            new V.Q(0x3c / 0xff,0x3c / 0xff,0x3c / 0xff).convertSRGBToLinear(),
            new V.Q(0x3c / 0xff,0x3c / 0xff,0x3c / 0xff).convertSRGBToLinear(),
            new V.Q(0x5a / 0xff,0x5a / 0xff,0x5a / 0xff).convertSRGBToLinear(),
            new V.Q(0x5a / 0xff,0x5a / 0xff,0x5a / 0xff).convertSRGBToLinear(),
            new V.Q(0.4,0xac / 0xff,0x1).convertSRGBToLinear(),
            new V.Q(0.4,0xac / 0xff,0x1).convertSRGBToLinear(),
            new V.Q(0xc4 / 0xff,0xc0 / 0xff,0x1).convertSRGBToLinear(),
            new V.Q(0xc4 / 0xff,0xc0 / 0xff,0x1).convertSRGBToLinear(),
            new V.Q(0x28 / 0xff,0x1e / 0xff,0x28 / 0xff).convertSRGBToLinear();
            var rS, re = 0x0, rR = 0x1, rH = 0x2, ry = function rd() {
                rS = setTimeout(rd, 0x3e8 * rp),
                postMessage([rH]);
            };
            onmessage = function(rP) {
                switch (rP.data) {
                case re:
                    ry();
                    break;
                case rR:
                    clearTimeout(rS);
                }
            }
            ;
        }
        ,
        0x1219: (H, y, d) => {
            var P = d(0x1200a).default;
            function Q() {
                'use strict';
                H.exports = Q = function() {
                    return X;
                }
                ,
                H.exports.__esModule = !0x0,
                H.exports.default = H.exports;
                var B, X = {}, Z = Object.prototype, V = Z.hasOwnProperty, G = Object.defineProperty || function(rH, ry, rd) {
                    rH[ry] = rd.value;
                }
                , k = 'function' == typeof Symbol ? Symbol : {}, W = k.iterator || '@@iterator', q = k.asyncIterator || '@@asyncIterator', K = k.toStringTag || '@@toStringTag';
                function Y(rH, ry, rd) {
                    return Object.defineProperty(rH, ry, {
                        'value': rd,
                        'enumerable': !0x0,
                        'configurable': !0x0,
                        'writable': !0x0
                    }),
                    rH[ry];
                }
                try {
                    Y({}, '');
                } catch (rH) {
                    Y = function(ry, rd, rP) {
                        return ry[rd] = rP;
                    }
                    ;
                }
                function z(ry, rd, rP, rQ) {
                    var rB = rd && rd.prototype instanceof r2 ? rd : r2
                      , rM = Object.create(rB.prototype)
                      , rX = new re(rQ || []);
                    return G(rM, '_invoke', {
                        'value': rF(ry, rP, rX)
                    }),
                    rM;
                }
                function j(ry, rd, rP) {
                    try {
                        return {
                            'type': 'normal',
                            'arg': ry.call(rd, rP)
                        };
                    } catch (rQ) {
                        return {
                            'type': 'throw',
                            'arg': rQ
                        };
                    }
                }
                X.wrap = z;
                var O = 'suspendedStart'
                  , J = 'suspendedYield'
                  , D = 'executing'
                  , r0 = 'completed'
                  , r1 = {};
                function r2() {}
                function r3() {}
                function r4() {}
                var r5 = {};
                Y(r5, W, function() {
                    return this;
                });
                var r6 = Object.getPrototypeOf
                  , r7 = r6 && r6(r6(rR([])));
                r7 && r7 !== Z && V.call(r7, W) && (r5 = r7);
                var r8 = r4.prototype = r2.prototype = Object.create(r5);
                function r9(ry) {
                    ['next', 'throw', 'return'].forEach(function(rd) {
                        Y(ry, rd, function(rP) {
                            return this._invoke(rd, rP);
                        });
                    });
                }
                function rr(ry, rd) {
                    function rP(rB, rM, rX, rt) {
                        var rm = j(ry[rB], ry, rM);
                        if ('throw' !== rm.type) {
                            var rw = rm.arg
                              , rl = rw.value;
                            return rl && 'object' == P(rl) && V.call(rl, '__await') ? rd.resolve(rl.__await).then(function(rC) {
                                rP('next', rC, rX, rt);
                            }, function(rC) {
                                rP('throw', rC, rX, rt);
                            }) : rd.resolve(rl).then(function(rC) {
                                rw.value = rC,
                                rX(rw);
                            }, function(rC) {
                                return rP('throw', rC, rX, rt);
                            });
                        }
                        rt(rm.arg);
                    }
                    var rQ;
                    G(this, '_invoke', {
                        'value': function(rB, rM) {
                            function rX() {
                                return new rd(function(rt, rm) {
                                    rP(rB, rM, rt, rm);
                                }
                                );
                            }
                            return rQ = rQ ? rQ.then(rX, rX) : rX();
                        }
                    });
                }
                function rF(ry, rd, rP) {
                    var rQ = O;
                    return function(rB, rM) {
                        if (rQ === D)
                            throw Error('Generator\x20is\x20already\x20running');
                        if (rQ === r0) {
                            if ('throw' === rB)
                                throw rM;
                            return {
                                'value': B,
                                'done': !0x0
                            };
                        }
                        for (rP.method = rB,
                        rP.arg = rM; ; ) {
                            var rX = rP.delegate;
                            if (rX) {
                                var rt = rE(rX, rP);
                                if (rt) {
                                    if (rt === r1)
                                        continue;
                                    return rt;
                                }
                            }
                            if ('next' === rP.method)
                                rP.sent = rP._sent = rP.arg;
                            else {
                                if ('throw' === rP.method) {
                                    if (rQ === O)
                                        throw rQ = r0,
                                        rP.arg;
                                    rP.dispatchException(rP.arg);
                                } else
                                    'return' === rP.method && rP.abrupt('return', rP.arg);
                            }
                            rQ = D;
                            var rm = j(ry, rd, rP);
                            if ('normal' === rm.type) {
                                if (rQ = rP.done ? r0 : J,
                                rm.arg === r1)
                                    continue;
                                return {
                                    'value': rm.arg,
                                    'done': rP.done
                                };
                            }
                            'throw' === rm.type && (rQ = r0,
                            rP.method = 'throw',
                            rP.arg = rm.arg);
                        }
                    }
                    ;
                }
                function rE(ry, rd) {
                    var rP = rd.method
                      , rQ = ry.iterator[rP];
                    if (rQ === B)
                        return rd.delegate = null,
                        'throw' === rP && ry.iterator.return && (rd.method = 'return',
                        rd.arg = B,
                        rE(ry, rd),
                        'throw' === rd.method) || 'return' !== rP && (rd.method = 'throw',
                        rd.arg = new TypeError('The\x20iterator\x20does\x20not\x20provide\x20a\x20\x27' + rP + '\x27\x20method')),
                        r1;
                    var rB = j(rQ, ry.iterator, rd.arg);
                    if ('throw' === rB.type)
                        return rd.method = 'throw',
                        rd.arg = rB.arg,
                        rd.delegate = null,
                        r1;
                    var rM = rB.arg;
                    return rM ? rM.done ? (rd[ry.resultName] = rM.value,
                    rd.next = ry.nextLoc,
                    'return' !== rd.method && (rd.method = 'next',
                    rd.arg = B),
                    rd.delegate = null,
                    r1) : rM : (rd.method = 'throw',
                    rd.arg = new TypeError('iterator\x20result\x20is\x20not\x20an\x20object'),
                    rd.delegate = null,
                    r1);
                }
                function rp(ry) {
                    var rd = {
                        'tryLoc': ry[0x0]
                    };
                    0x1 in ry && (rd.catchLoc = ry[0x1]),
                    0x2 in ry && (rd.finallyLoc = ry[0x2],
                    rd.afterLoc = ry[0x3]),
                    this.tryEntries.push(rd);
                }
                function rS(ry) {
                    var rd = ry.completion || {};
                    rd.type = 'normal',
                    delete rd.arg,
                    ry.completion = rd;
                }
                function re(ry) {
                    this.tryEntries = [{
                        'tryLoc': 'root'
                    }],
                    ry.forEach(rp, this),
                    this.reset(!0x0);
                }
                function rR(ry) {
                    if (ry || '' === ry) {
                        var rd = ry[W];
                        if (rd)
                            return rd.call(ry);
                        if ('function' == typeof ry.next)
                            return ry;
                        if (!isNaN(ry.length)) {
                            var rP = -0x1
                              , rQ = function rB() {
                                for (; ++rP < ry.length; )
                                    if (V.call(ry, rP))
                                        return rB.value = ry[rP],
                                        rB.done = !0x1,
                                        rB;
                                return rB.value = B,
                                rB.done = !0x0,
                                rB;
                            };
                            return rQ.next = rQ;
                        }
                    }
                    throw new TypeError(P(ry) + '\x20is\x20not\x20iterable');
                }
                return r3.prototype = r4,
                G(r8, 'constructor', {
                    'value': r4,
                    'configurable': !0x0
                }),
                G(r4, 'constructor', {
                    'value': r3,
                    'configurable': !0x0
                }),
                r3.displayName = Y(r4, K, 'GeneratorFunction'),
                X.isGeneratorFunction = function(ry) {
                    var rd = 'function' == typeof ry && ry.constructor;
                    return !!rd && (rd === r3 || 'GeneratorFunction' === (rd.displayName || rd.name));
                }
                ,
                X.mark = function(ry) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(ry, r4) : (ry.__proto__ = r4,
                    Y(ry, K, 'GeneratorFunction')),
                    ry.prototype = Object.create(r8),
                    ry;
                }
                ,
                X.awrap = function(ry) {
                    return {
                        '__await': ry
                    };
                }
                ,
                r9(rr.prototype),
                Y(rr.prototype, q, function() {
                    return this;
                }),
                X.AsyncIterator = rr,
                X.async = function(ry, rd, rP, rQ, rB) {
                    void 0x0 === rB && (rB = Promise);
                    var rM = new rr(z(ry, rd, rP, rQ),rB);
                    return X.isGeneratorFunction(rd) ? rM : rM.next().then(function(rX) {
                        return rX.done ? rX.value : rM.next();
                    });
                }
                ,
                r9(r8),
                Y(r8, K, 'Generator'),
                Y(r8, W, function() {
                    return this;
                }),
                Y(r8, 'toString', function() {
                    return '[object\x20Generator]';
                }),
                X.keys = function(ry) {
                    var rd = Object(ry)
                      , rP = [];
                    for (var rQ in rd)
                        rP.push(rQ);
                    return rP.reverse(),
                    function rB() {
                        for (; rP.length; ) {
                            var rM = rP.pop();
                            if (rM in rd)
                                return rB.value = rM,
                                rB.done = !0x1,
                                rB;
                        }
                        return rB.done = !0x0,
                        rB;
                    }
                    ;
                }
                ,
                X.values = rR,
                re.prototype = {
                    'constructor': re,
                    'reset': function(ry) {
                        if (this.prev = 0x0,
                        this.next = 0x0,
                        this.sent = this._sent = B,
                        this.done = !0x1,
                        this.delegate = null,
                        this.method = 'next',
                        this.arg = B,
                        this.tryEntries.forEach(rS),
                        !ry) {
                            for (var rd in this)
                                't' === rd.charAt(0x0) && V.call(this, rd) && !isNaN(+rd.slice(0x1)) && (this[rd] = B);
                        }
                    },
                    'stop': function() {
                        this.done = !0x0;
                        var ry = this.tryEntries[0x0].completion;
                        if ('throw' === ry.type)
                            throw ry.arg;
                        return this.rval;
                    },
                    'dispatchException': function(ry) {
                        if (this.done)
                            throw ry;
                        var rd = this;
                        function rP(rm, rw) {
                            return rM.type = 'throw',
                            rM.arg = ry,
                            rd.next = rm,
                            rw && (rd.method = 'next',
                            rd.arg = B),
                            !!rw;
                        }
                        for (var rQ = this.tryEntries.length - 0x1; rQ >= 0x0; --rQ) {
                            var rB = this.tryEntries[rQ]
                              , rM = rB.completion;
                            if ('root' === rB.tryLoc)
                                return rP('end');
                            if (rB.tryLoc <= this.prev) {
                                var rX = V.call(rB, 'catchLoc')
                                  , rt = V.call(rB, 'finallyLoc');
                                if (rX && rt) {
                                    if (this.prev < rB.catchLoc)
                                        return rP(rB.catchLoc, !0x0);
                                    if (this.prev < rB.finallyLoc)
                                        return rP(rB.finallyLoc);
                                } else {
                                    if (rX) {
                                        if (this.prev < rB.catchLoc)
                                            return rP(rB.catchLoc, !0x0);
                                    } else {
                                        if (!rt)
                                            throw Error('try\x20statement\x20without\x20catch\x20or\x20finally');
                                        if (this.prev < rB.finallyLoc)
                                            return rP(rB.finallyLoc);
                                    }
                                }
                            }
                        }
                    },
                    'abrupt': function(ry, rd) {
                        for (var rP = this.tryEntries.length - 0x1; rP >= 0x0; --rP) {
                            var rQ = this.tryEntries[rP];
                            if (rQ.tryLoc <= this.prev && V.call(rQ, 'finallyLoc') && this.prev < rQ.finallyLoc) {
                                var rB = rQ;
                                break;
                            }
                        }
                        rB && ('break' === ry || 'continue' === ry) && rB.tryLoc <= rd && rd <= rB.finallyLoc && (rB = null);
                        var rM = rB ? rB.completion : {};
                        return rM.type = ry,
                        rM.arg = rd,
                        rB ? (this.method = 'next',
                        this.next = rB.finallyLoc,
                        r1) : this.complete(rM);
                    },
                    'complete': function(ry, rd) {
                        if ('throw' === ry.type)
                            throw ry.arg;
                        return 'break' === ry.type || 'continue' === ry.type ? this.next = ry.arg : 'return' === ry.type ? (this.rval = this.arg = ry.arg,
                        this.method = 'return',
                        this.next = 'end') : 'normal' === ry.type && rd && (this.next = rd),
                        r1;
                    },
                    'finish': function(ry) {
                        for (var rd = this.tryEntries.length - 0x1; rd >= 0x0; --rd) {
                            var rP = this.tryEntries[rd];
                            if (rP.finallyLoc === ry)
                                return this.complete(rP.completion, rP.afterLoc),
                                rS(rP),
                                r1;
                        }
                    },
                    'catch': function(ry) {
                        for (var rd = this.tryEntries.length - 0x1; rd >= 0x0; --rd) {
                            var rP = this.tryEntries[rd];
                            if (rP.tryLoc === ry) {
                                var rQ = rP.completion;
                                if ('throw' === rQ.type) {
                                    var rB = rQ.arg;
                                    rS(rP);
                                }
                                return rB;
                            }
                        }
                        throw Error('illegal\x20catch\x20attempt');
                    },
                    'delegateYield': function(ry, rd, rP) {
                        return this.delegate = {
                            'iterator': rR(ry),
                            'resultName': rd,
                            'nextLoc': rP
                        },
                        'next' === this.method && (this.arg = B),
                        r1;
                    }
                },
                X;
            }
            H.exports = Q,
            H.exports.__esModule = !0x0,
            H.exports.default = H.exports;
        }
        ,
        0x1200a: H => {
            function y(d) {
                return H.exports = y = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(P) {
                    return typeof P;
                }
                : function(P) {
                    return P && 'function' == typeof Symbol && P.constructor === Symbol && P !== Symbol.prototype ? 'symbol' : typeof P;
                }
                ,
                H.exports.__esModule = !0x0,
                H.exports.default = H.exports,
                y(d);
            }
            H.exports = y,
            H.exports.__esModule = !0x0,
            H.exports.default = H.exports;
        }
        ,
        0xd5e4: (H, y, d) => {
            var P = d(0x1219)();
            H.exports = P;
            try {
                regeneratorRuntime = P;
            } catch (Q) {
                'object' == typeof globalThis ? globalThis.regeneratorRuntime = P : Function('r', 'regeneratorRuntime\x20=\x20r')(P);
            }
        }
        ,
        0x28e3: (H, y, d) => {
            'use strict';
            function P(B, M, X, m, w, l, C) {
                try {
                    var N = B[l](C)
                      , Z = N.value;
                } catch (h) {
                    return void X(h);
                }
                N.done ? M(Z) : Promise.resolve(Z).then(m, w);
            }
            function Q(B) {
                return function() {
                    var M = this
                      , X = arguments;
                    return new Promise(function(m, w) {
                        var l = B.apply(M, X);
                        function C(Z) {
                            P(l, m, w, C, N, 'next', Z);
                        }
                        function N(Z) {
                            P(l, m, w, C, N, 'throw', Z);
                        }
                        C(void 0x0);
                    }
                    );
                }
                ;
            }
            d.d(y, {
                'A': () => Q
            });
        }
        ,
        0x14124: (H, y, d) => {
            'use strict';
            function P(X) {
                return P = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(m) {
                    return typeof m;
                }
                : function(m) {
                    return m && 'function' == typeof Symbol && m.constructor === Symbol && m !== Symbol.prototype ? 'symbol' : typeof m;
                }
                ,
                P(X);
            }
            function Q(X) {
                var m = function(w, l) {
                    if ('object' != P(w) || !w)
                        return w;
                    var C = w[Symbol.toPrimitive];
                    if (void 0x0 !== C) {
                        var N = C.call(w, l || 'default');
                        if ('object' != P(N))
                            return N;
                        throw new TypeError('@@toPrimitive\x20must\x20return\x20a\x20primitive\x20value.');
                    }
                    return ('string' === l ? String : Number)(w);
                }(X, 'string');
                return 'symbol' == P(m) ? m : m + '';
            }
            function B(X, m) {
                for (var w = 0x0; w < m.length; w++) {
                    var l = m[w];
                    l.enumerable = l.enumerable || !0x1,
                    l.configurable = !0x0,
                    'value'in l && (l.writable = !0x0),
                    Object.defineProperty(X, Q(l.key), l);
                }
            }
            function M(X, m, w) {
                return m && B(X.prototype, m),
                w && B(X, w),
                Object.defineProperty(X, 'prototype', {
                    'writable': !0x1
                }),
                X;
            }
            d.d(y, {
                'A': () => M
            });
        }
        ,
        0x12e4b: (H, y, d) => {
            'use strict';
            d.d(y, {
                'A': () => Q
            });
            var P = d(0xf8ae);
            function Q(B, M) {
                B.prototype = Object.create(M.prototype),
                B.prototype.constructor = B,
                (0x0,
                P.A)(B, M);
            }
        }
        ,
        0xf8ae: (H, y, d) => {
            'use strict';
            function P(Q, B) {
                return P = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(M, X) {
                    return M.__proto__ = X,
                    M;
                }
                ,
                P(Q, B);
            }
            d.d(y, {
                'A': () => P
            });
        }
    }, S = {};
    function R(H) {
        var y = S[H];
        if (void 0x0 !== y)
            return y.exports;
        var d = S[H] = {
            'exports': {}
        };
        return p[H](d, d.exports, R),
        d.exports;
    }
    R.m = p,
    R.x = () => {
        var H = R.O(void 0x0, [0x12d, 0xf4], () => R(0x1ca));
        return H = R.O(H);
    }
    ,
    F = [],
    R.O = (H, y, d, P) => {
        if (!y) {
            var Q = 0x1 / 0x0;
            for (m = 0x0; m < F.length; m++) {
                for (var [y,d,P] = F[m], B = !0x0, M = 0x0; M < y.length; M++)
                    (!0x1 & P || Q >= P) && Object.keys(R.O).every(w => R.O[w](y[M])) ? y.splice(M--, 0x1) : (B = !0x1,
                    P < Q && (Q = P));
                if (B) {
                    F.splice(m--, 0x1);
                    var X = d();
                    void 0x0 !== X && (H = X);
                }
            }
            return H;
        }
        P = P || 0x0;
        for (var m = F.length; m > 0x0 && F[m - 0x1][0x2] > P; m--)
            F[m] = F[m - 0x1];
        F[m] = [y, d, P];
    }
    ,
    R.n = H => {
        var y = H && H.__esModule ? () => H.default : () => H;
        return R.d(y, {
            'a': y
        }),
        y;
    }
    ,
    R.d = (H, y) => {
        for (var d in y)
            R.o(y, d) && !R.o(H, d) && Object.defineProperty(H, d, {
                'enumerable': !0x0,
                'get': y[d]
            });
    }
    ,
    R.f = {},
    R.e = H => Promise.all(Object.keys(R.f).reduce( (y, d) => (R.f[d](H, y),
    y), [])),
    R.u = H => './package/' + {
        0xf4: '26ebc497838bb808d7bf',
        0x12d: 'c03e852cb02e1fec4ed5'
    }[H] + '.js',
    R.miniCssF = H => {}
    ,
    R.o = (H, y) => Object.prototype.hasOwnProperty.call(H, y),
    R.p = '/',
    (( () => {
        var H = {
            0x1ca: 0x1
        };
        R.f.i = (P, Q) => {
            H[P] || importScripts(R.p + R.u(P));
        }
        ;
        var y = self.webpackChunkcuberealm_client = self.webpackChunkcuberealm_client || []
          , d = y.push.bind(y);
        y.push = P => {
            var [Q,B,M] = P;
            for (var X in B)
                R.o(B, X) && (R.m[X] = B[X]);
            for (M && M(R); Q.length; )
                H[Q.pop()] = 0x1;
            d(P);
        }
        ;
    }
    )()),
    E = R.x,
    R.x = () => Promise.all([R.e(0x12d), R.e(0xf4)]).then(E),
    R.x();
}
)());
