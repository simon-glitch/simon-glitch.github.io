
'use strict';
(self['webpackChunkcuberealm_client'] = self['webpackChunkcuberealm_client'] || [])['push']([[0xb], {
    0xea6b: (r0, r1, r2) => {
        r2['r'](r1),
        r2['d'](r1, {
            'default': () => F9
        });
        var r3 = r2(0xaeab)
          , r4 = r2(0x903f)
          , r5 = r2(0xc179)
          , r6 = r2(0x1e01)
          , r7 = r2(0x5610)
          , r8 = r2(0x75c1)
          , r9 = r2(0x12460)
          , rr = r3['Ay']['div'](['padding:20px\x2060px;color:black;pointer-events:auto;display:flex;flex-direction:column;width:300px;text-align:center;pointer-events:auto;'])
          , rF = r3['Ay']['div'](['color:white;margin-bottom:10px;font-size:50px;text-shadow:3px\x203px\x200\x20#3b3b3b;']);
        const rE = function() {
            var Fr = (0x0,
            r4['x'])(function(FF) {
                return FF['bgQ'];
            });
            return (0x0,
            r9['jsxs'])(rr, {
                'children': [(0x0,
                r9['jsx'])(rF, {
                    'children': 'Game\x20Paused'
                }), (0x0,
                r9['jsx'])(r8['A'], {
                    'marginTop': 0xf,
                    'onClick': function(FF) {
                        r6['A']['emit'](r7['r']['bvn']);
                    },
                    'children': 'Resume'
                }), (0x0,
                r9['jsx'])(r8['A'], {
                    'marginTop': 0xf,
                    'onClick': function(FF) {
                        Fr(r5['a']['bGW']);
                    },
                    'children': 'Settings'
                }), (0x0,
                r9['jsx'])(r8['A'], {
                    'marginTop': 0xf,
                    'onClick': function(FF) {
                        r6['A']['emit'](r7['r']['bGL']);
                    },
                    'children': 'Leave'
                })]
            });
        };
        var rp = r2(0x1791c)
          , rS = 0x0
          , rR = 0x1
          , rH = 0x2
          , ry = 0x3
          , rd = r2(0x28e3)
          , rP = r2(0xd5e4)
          , rQ = r2['n'](rP)
          , rB = r2(0x15c14)
          , rM = r2(0x7c13)
          , rX = r2(0xde3d)
          , rt = r3['Ay']['div'](['display:flex;width:100%;justify-content:space-between;align-items:center;margin-bottom:20px;'])
          , rm = r3['Ay']['div'](['font-size:25px;'])
          , rw = r3['Ay']['div'](['display:flex;align-items:center;'])
          , rl = r3['Ay']['input'](['margin-right:40px;']);
        const rC = function(Fr) {
            return (0x0,
            r9['jsxs'])(rt, {
                'children': [(0x0,
                r9['jsx'])(rm, {
                    'children': Fr['name']
                }), (0x0,
                r9['jsxs'])(rw, {
                    'children': [(0x0,
                    r9['jsx'])(rl, {
                        'type': 'range',
                        'min': Fr['min'],
                        'max': Fr['max'],
                        'step': Fr['step'],
                        'value': Fr['value'],
                        'onChange': (function() {
                            var FF = (0x0,
                            rd['A'])(rQ()['mark'](function FE(Fp) {
                                var FS;
                                return rQ()['wrap'](function(Fe) {
                                    for (; ; )
                                        switch (Fe['prev'] = Fe['next']) {
                                        case 0x0:
                                            FS = parseFloat(Fp['target']['value']),
                                            Fr['setValue'](FS);
                                        case 0x2:
                                        case 'end':
                                            return Fe['stop']();
                                        }
                                }, FE);
                            }));
                            return function(Fp) {
                                return FF['apply'](this, arguments);
                            }
                            ;
                        }()),
                        'onMouseDown': function() {
                            (0x0,
                            rM['bK'])();
                        },
                        'onMouseUp': function() {
                            (0x0,
                            rM['bK'])();
                        }
                    }), (0x0,
                    r9['jsx'])(rX['u'], {
                        'type': 'number',
                        'min': Fr['min'],
                        'max': Fr['max'],
                        'step': Fr['step'],
                        'value': Fr['value'],
                        'onChange': function(FF) {
                            var FE = (0x0,
                            rB['qE'])(parseFloat(FF['target']['value']), Fr['min'], Fr['max']);
                            isNaN(FE) || Fr['setValue'](FE),
                            (0x0,
                            rM['bK'])();
                        },
                        'onFocus': function() {
                            (0x0,
                            rM['bK'])();
                        }
                    })]
                })]
            });
        };
        var rN = r2(0xba46)
          , rZ = r2(0x1190e)
          , rh = r3['Ay']['div'](['display:flex;width:100%;justify-content:space-between;align-items:center;margin-bottom:20px;'])
          , ro = r3['Ay']['div'](['font-size:25px;'])
          , rU = r3['Ay']['div'](['display:flex;align-items:center;'])
          , ri = r3['Ay']['input'](['padding:4px;']);
        const rT = function(Fr) {
            return (0x0,
            r9['jsxs'])(rh, {
                'children': [(0x0,
                r9['jsx'])(ro, {
                    'children': Fr['name']
                }), (0x0,
                r9['jsx'])(rU, {
                    'children': (0x0,
                    r9['jsx'])(ri, {
                        'type': 'checkbox',
                        'checked': Fr['value'],
                        'onChange': function(FF) {
                            var FE = FF['target']['checked'];
                            Fr['setValue'](FE),
                            (0x0,
                            rM['bK'])();
                        }
                    })
                })]
            });
        };
        var rV = r3['Ay']['div'](['display:flex;flex-direction:column;justify-content:space-between;height:100%;'])
          , rs = r3['Ay']['div']([''])
          , rG = r3['Ay']['div'](['']);
        const rk = function() {
            var Fr = (0x0,
            rZ['C$'])(function(FP) {
                return FP['sensitivity'];
            })
              , FF = (0x0,
            rZ['C$'])(function(FP) {
                return FP['bGX'];
            })
              , FE = (0x0,
            rZ['C$'])(function(FP) {
                return FP['soundVolume'];
            })
              , Fp = (0x0,
            rZ['C$'])(function(FP) {
                return FP['bGm'];
            })
              , FS = (0x0,
            rZ['C$'])(function(FP) {
                return FP['invertYAxis'];
            })
              , Fe = (0x0,
            rZ['C$'])(function(FP) {
                return FP['bGU'];
            })
              , FR = (0x0,
            rZ['C$'])(function(FP) {
                return FP['invertMouseWheel'];
            })
              , FH = (0x0,
            rZ['C$'])(function(FP) {
                return FP['bGj'];
            })
              , Fy = (0x0,
            rZ['C$'])(function(FP) {
                return FP['chatVisible'];
            })
              , Fd = (0x0,
            rZ['C$'])(function(FP) {
                return FP['bGM'];
            });
            return (0x0,
            r9['jsxs'])(rV, {
                'children': [(0x0,
                r9['jsxs'])(rs, {
                    'children': [(0x0,
                    r9['jsx'])(rC, {
                        'name': 'Sensitivity',
                        'min': rN['A']['bxT']['bxp'],
                        'max': rN['A']['bxT']['bxV'],
                        'step': rN['A']['bxT']['bGS'],
                        'value': Fr,
                        'setValue': FF
                    }), (0x0,
                    r9['jsx'])(rC, {
                        'name': 'Sound\x20Volume',
                        'min': rN['A']['bxE']['bxp'],
                        'max': rN['A']['bxE']['bxV'],
                        'step': rN['A']['bxE']['bGS'],
                        'value': FE,
                        'setValue': Fp
                    }), (0x0,
                    r9['jsx'])(rT, {
                        'name': 'Invert\x20Y\x20Axis',
                        'value': FS,
                        'setValue': Fe
                    }), (0x0,
                    r9['jsx'])(rT, {
                        'name': 'Invert\x20Mouse\x20Wheel',
                        'value': FR,
                        'setValue': FH
                    }), (0x0,
                    r9['jsx'])(rT, {
                        'name': 'Enable\x20Chat',
                        'value': Fy,
                        'setValue': Fd
                    })]
                }), (0x0,
                r9['jsx'])(rG, {
                    'children': (0x0,
                    r9['jsx'])(r8['A'], {
                        'marginTop': 0xf,
                        'onClick': function() {
                            FF(rZ['ji']['sensitivity']),
                            Fp(rZ['ji']['soundVolume']),
                            Fe(rZ['ji']['invertYAxis']),
                            FH(rZ['ji']['invertMouseWheel']),
                            Fd(rZ['ji']['chatVisible']);
                        },
                        'children': 'Restore\x20Defaults'
                    })
                })]
            });
        };
        var rW = r2(0xf357)
          , rx = r3['Ay']['div'](['display:flex;flex-direction:column;padding-right:20px;']);
        const ra = function() {
            var Fr = (0x0,
            rZ['C$'])(function(FQ) {
                return FQ['renderScale'];
            })
              , FF = (0x0,
            rZ['C$'])(function(FQ) {
                return FQ['bGw'];
            })
              , FE = (0x0,
            rZ['C$'])(function(FQ) {
                return FQ['viewDistanceX'];
            })
              , Fp = (0x0,
            rZ['C$'])(function(FQ) {
                return FQ['bGv'];
            })
              , FS = (0x0,
            rZ['C$'])(function(FQ) {
                return FQ['viewDistanceY'];
            })
              , Fe = (0x0,
            rZ['C$'])(function(FQ) {
                return FQ['bGQ'];
            })
              , FR = (0x0,
            rZ['C$'])(function(FQ) {
                return FQ['generalFOV'];
            })
              , FH = (0x0,
            rZ['C$'])(function(FQ) {
                return FQ['bGs'];
            })
              , Fy = (0x0,
            rZ['C$'])(function(FQ) {
                return FQ['bGC'];
            })
              , Fd = (0x0,
            rZ['C$'])(function(FQ) {
                return FQ['runningFOVMultiplier'];
            })
              , FP = (0x0,
            rZ['C$'])(function(FQ) {
                return FQ['bGO'];
            });
            return (0x0,
            r9['jsxs'])(r9['Fragment'], {
                'children': [(0x0,
                r9['jsx'])(rW['Ay'], {
                    'style': {
                        'padding': 0xa
                    },
                    'children': (0x0,
                    r9['jsxs'])(rx, {
                        'children': [(0x0,
                        r9['jsx'])(rC, {
                            'name': 'Render\x20Scale',
                            'min': rN['A']['bgI']['bxp'],
                            'max': rN['A']['bgI']['bxV'],
                            'step': rN['A']['bgI']['bGS'],
                            'value': Fr,
                            'setValue': FF
                        }), (0x0,
                        r9['jsx'])(rC, {
                            'name': 'Horizontal\x20View\x20Distance',
                            'min': rN['A']['bGu']['bxp'],
                            'max': rN['A']['bGu']['bxV'],
                            'step': rN['A']['bGu']['bGS'],
                            'value': FE,
                            'setValue': Fp
                        }), (0x0,
                        r9['jsx'])(rC, {
                            'name': 'Vertical\x20View\x20Distance',
                            'min': rN['A']['bGK']['bxp'],
                            'max': rN['A']['bGK']['bxV'],
                            'step': rN['A']['bGK']['bGS'],
                            'value': FS,
                            'setValue': Fe
                        }), (0x0,
                        r9['jsx'])(rC, {
                            'name': 'General\x20FOV',
                            'min': rN['A']['bgf']['bxp'],
                            'max': rN['A']['bgf']['bxV'],
                            'step': rN['A']['bgf']['bGS'],
                            'value': FR,
                            'setValue': FH
                        }), (0x0,
                        r9['jsx'])(rC, {
                            'name': 'Sprint\x20FOV\x20Multiplier',
                            'min': rN['A']['bgk']['bxp'],
                            'max': rN['A']['bgk']['bxV'],
                            'step': rN['A']['bgk']['bGS'],
                            'value': Fd,
                            'setValue': FP
                        })]
                    })
                }), (0x0,
                r9['jsx'])(r8['A'], {
                    'marginTop': 0xf,
                    'onClick': function() {
                        FF(rZ['ji']['renderScale']),
                        Fp(rZ['ji']['viewDistanceX']),
                        Fe(rZ['ji']['viewDistanceY']),
                        FH(rZ['ji']['generalFOV']),
                        Fy(rZ['ji']['firstPersonModelFOV']),
                        FP(rZ['ji']['runningFOVMultiplier']);
                    },
                    'children': 'Restore\x20Defaults'
                })]
            });
        };
        var rI = (function() {
            var Fr = (0x0,
            rd['A'])(rQ()['mark'](function FF(FE) {
                return rQ()['wrap'](function(Fp) {
                    for (; ; )
                        switch (Fp['prev'] = Fp['next']) {
                        case 0x0:
                            return Fp['abrupt']('return', new Promise(function(FS, Fe) {
                                var FR = document['createElement']('img');
                                function FH() {
                                    FR['removeEventListener']('load', FH, !0x1),
                                    FR['removeEventListener']('error', Fy, !0x1),
                                    FR['width'] < rN['A']['bwI'] || FR['height'] < rN['A']['bwI'] || FR['width'] !== FR['height'] || !(0x0,
                                    rB['r6'])(FR['width']) ? FS(!0x1) : FS(!0x0);
                                }
                                function Fy(Fd) {
                                    FR['removeEventListener']('load', FH, !0x1),
                                    FR['removeEventListener']('error', Fy, !0x1),
                                    FS(!0x1);
                                }
                                FR['addEventListener']('load', FH, !0x1),
                                FR['addEventListener']('error', Fy, !0x1),
                                FR['crossOrigin'] = 'anonymous',
                                FR['src'] = FE;
                            }
                            ));
                        case 0x1:
                        case 'end':
                            return Fp['stop']();
                        }
                }, FF);
            }));
            return function(FE) {
                return Fr['apply'](this, arguments);
            }
            ;
        }())
          , rg = r3['Ay']['div'](['display:flex;width:100%;justify-content:space-between;align-items:center;margin-bottom:20px;'])
          , rL = r3['Ay']['div'](['font-size:25px;'])
          , rc = r3['Ay']['div'](['display:flex;align-items:center;'])
          , rq = r3['Ay']['input'](['padding:4px;font-family:\x27LanaPixel\x27,\x27Unifont\x27,\x27Lato\x27,Helvetica,sans-serif;&::placeholder{font-family:\x27LanaPixel\x27,\x27Unifont\x27,\x27Lato\x27,Helvetica,sans-serif;}']);
        const rf = function(Fr) {
            var FF = (0x0,
            rp['useState'])(!0x1)
              , FE = FF[0x0]
              , Fp = FF[0x1]
              , FS = (0x0,
            rp['useState'])(Fr['value'])
              , Fe = FS[0x0]
              , FR = FS[0x1];
            (0x0,
            rp['useEffect'])(function() {
                FR(Fr['value']);
            }, [Fr['value']]);
            var FH = (function() {
                var Fd = (0x0,
                rd['A'])(rQ()['mark'](function FP(FQ) {
                    return rQ()['wrap'](function(FB) {
                        for (; ; )
                            switch (FB['prev'] = FB['next']) {
                            case 0x0:
                                if (Fr['validate']) {
                                    FB['next'] = 0x5;
                                    break;
                                }
                                Fr['setValue'](FQ),
                                null == Fr['onValidationSuccess'] || Fr['onValidationSuccess'](),
                                FB['next'] = 0x10;
                                break;
                            case 0x5:
                                return Fp(!0x0),
                                FB['next'] = 0x8,
                                Fr['validate'](FQ);
                            case 0x8:
                                if (!FB['sent']) {
                                    FB['next'] = 0xd;
                                    break;
                                }
                                Fr['setValue'](FQ),
                                null == Fr['onValidationSuccess'] || Fr['onValidationSuccess'](),
                                FB['next'] = 0xf;
                                break;
                            case 0xd:
                                FR(Fr['value']),
                                null == Fr['onValidationFail'] || Fr['onValidationFail']();
                            case 0xf:
                                Fp(!0x1);
                            case 0x10:
                            case 'end':
                                return FB['stop']();
                            }
                    }, FP);
                }));
                return function(FQ) {
                    return Fd['apply'](this, arguments);
                }
                ;
            }())
              , Fy = Fr['imageSupport'] ? function(Fd) {
                var FP = Fd['dataTransfer']['files'];
                if (FP['length'] > 0x0) {
                    var FQ = FP[0x0];
                    if ('image/png' === FQ['type']) {
                        var FB = new FileReader();
                        FB['onload'] = (function() {
                            var FM = (0x0,
                            rd['A'])(rQ()['mark'](function FX(Ft) {
                                var Fm, Fw;
                                return rQ()['wrap'](function(Fl) {
                                    for (; ; )
                                        switch (Fl['prev'] = Fl['next']) {
                                        case 0x0:
                                            return Fw = null == (Fm = Ft['target']) ? void 0x0 : Fm['result'],
                                            FR(Fw),
                                            Fl['next'] = 0x4,
                                            FH(Fw);
                                        case 0x4:
                                        case 'end':
                                            return Fl['stop']();
                                        }
                                }, FX);
                            }));
                            return function(Ft) {
                                return FM['apply'](this, arguments);
                            }
                            ;
                        }()),
                        FB['readAsDataURL'](FQ);
                    } else
                        alert('Please\x20use\x20a\x20PNG\x20file.');
                }
            }
            : void 0x0;
            return (0x0,
            r9['jsxs'])(rg, {
                'children': [(0x0,
                r9['jsx'])(rL, {
                    'children': Fr['name']
                }), (0x0,
                r9['jsx'])(rc, {
                    'children': (0x0,
                    r9['jsx'])(rq, {
                        'type': 'text',
                        'placeholder': Fr['placeholder'],
                        'disabled': FE,
                        'value': Fe,
                        'onChange': (function() {
                            var Fd = (0x0,
                            rd['A'])(rQ()['mark'](function FP(FQ) {
                                var FB;
                                return rQ()['wrap'](function(FM) {
                                    for (; ; )
                                        switch (FM['prev'] = FM['next']) {
                                        case 0x0:
                                            FB = FQ['target']['value'],
                                            FR(FB),
                                            (0x0,
                                            rM['bK'])();
                                        case 0x3:
                                        case 'end':
                                            return FM['stop']();
                                        }
                                }, FP);
                            }));
                            return function(FQ) {
                                return Fd['apply'](this, arguments);
                            }
                            ;
                        }()),
                        'onFocus': function() {
                            (0x0,
                            rM['bK'])();
                        },
                        'onBlur': (function() {
                            var Fd = (0x0,
                            rd['A'])(rQ()['mark'](function FP(FQ) {
                                var FB;
                                return rQ()['wrap'](function(FM) {
                                    for (; ; )
                                        switch (FM['prev'] = FM['next']) {
                                        case 0x0:
                                            return FB = FQ['target']['value'],
                                            FM['next'] = 0x3,
                                            FH(FB);
                                        case 0x3:
                                        case 'end':
                                            return FM['stop']();
                                        }
                                }, FP);
                            }));
                            return function(FQ) {
                                return Fd['apply'](this, arguments);
                            }
                            ;
                        }()),
                        'onDrop': Fy
                    })
                })]
            });
        };
        var rK = r3['Ay']['div'](['display:flex;flex-direction:column;justify-content:space-between;height:100%;'])
          , rY = r3['Ay']['div']([''])
          , rz = r3['Ay']['div'](['']);
        const rA = function() {
            var Fr = (0x0,
            rZ['C$'])(function(FE) {
                return FE['terrainTextureURL'];
            })
              , FF = (0x0,
            rZ['C$'])(function(FE) {
                return FE['bGc'];
            });
            return (0x0,
            r9['jsxs'])(rK, {
                'children': [(0x0,
                r9['jsx'])(rY, {
                    'children': (0x0,
                    r9['jsx'])(rf, {
                        'name': 'Terrain\x20Texture\x20URL',
                        'placeholder': 'Use\x20Default',
                        'value': Fr,
                        'setValue': FF,
                        'validate': (function() {
                            var FE = (0x0,
                            rd['A'])(rQ()['mark'](function Fp(FS) {
                                return rQ()['wrap'](function(Fe) {
                                    for (; ; )
                                        switch (Fe['prev'] = Fe['next']) {
                                        case 0x0:
                                            if (Fe['t0'] = '' === FS,
                                            Fe['t0']) {
                                                Fe['next'] = 0x5;
                                                break;
                                            }
                                            return Fe['next'] = 0x4,
                                            rI(FS);
                                        case 0x4:
                                            Fe['t0'] = Fe['sent'];
                                        case 0x5:
                                            return Fe['abrupt']('return', Fe['t0']);
                                        case 0x6:
                                        case 'end':
                                            return Fe['stop']();
                                        }
                                }, Fp);
                            }));
                            return function(FS) {
                                return FE['apply'](this, arguments);
                            }
                            ;
                        }()),
                        'onValidationFail': function() {
                            alert('Sorry,\x20the\x20terrain\x20texture\x20you\x20entered\x20is\x20invalid!\x20Ensure\x20that\x20the\x20dimensions\x20are\x20at\x20least\x2016x16,\x20with\x20equal\x20width\x20and\x20height,\x20and\x20that\x20both\x20dimensions\x20are\x20powers\x20of\x202.');
                        },
                        'onValidationSuccess': function() {
                            alert('Successfully\x20updated\x20terrain\x20texture\x20URL!\x20Please\x20refresh\x20the\x20page!');
                        },
                        'imageSupport': !0x0
                    })
                }), (0x0,
                r9['jsx'])(rz, {
                    'children': (0x0,
                    r9['jsx'])(r8['A'], {
                        'marginTop': 0xf,
                        'onClick': function() {
                            Fr !== rZ['ji']['terrainTextureURL'] && (FF(rZ['ji']['terrainTextureURL']),
                            alert('Successfully\x20updated\x20terrain\x20texture\x20URL!\x20Please\x20refresh\x20the\x20page!'));
                        },
                        'children': 'Restore\x20Defaults'
                    })
                })]
            });
        };
        var rj = r2(0x95b8)
          , rO = r3['Ay']['div'](['display:flex;width:100%;justify-content:space-between;align-items:center;margin-bottom:20px;'])
          , rJ = r3['Ay']['div'](['font-size:25px;'])
          , rv = r3['Ay']['div'](['display:flex;align-items:center;'])
          , rn = r3['Ay']['div'](['background-color:rgba(150,150,150,0.4);padding:4px\x2010px;font-size:24px;margin-left:8px;&:hover{cursor:pointer;background-color:rgba(150,150,150,0.8);}']);
        const rb = function(Fr) {
            var FF = (0x0,
            rZ['C$'])(function(Fe) {
                return Fe['keys'];
            })
              , FE = (0x0,
            r4['x'])(function(Fe) {
                return Fe['bJk'];
            })
              , Fp = (0x0,
            rZ['C$'])(function(Fe) {
                return Fe['bGY'];
            })
              , FS = (0x0,
            r4['x'])(function(Fe) {
                return Fe['bGx'];
            });
            return (0x0,
            r9['jsxs'])(rO, {
                'children': [(0x0,
                r9['jsx'])(rJ, {
                    'children': Fr['name']
                }), (0x0,
                r9['jsx'])(rv, {
                    'children': Fr['gameKeyTypes']['map'](function(Fe, FR) {
                        return (0x0,
                        r9['jsx'])(rn, {
                            'onClick': function(FH) {
                                (0x0,
                                rM['bK'])(),
                                FS(Fe);
                                var Fy = (function() {
                                    var FP = (0x0,
                                    rd['A'])(rQ()['mark'](function FQ(FB) {
                                        return rQ()['wrap'](function(FM) {
                                            for (; ; )
                                                switch (FM['prev'] = FM['next']) {
                                                case 0x0:
                                                    Fp(Fe, FB['code']),
                                                    FS(void 0x0),
                                                    (0x0,
                                                    rM['bK'])(),
                                                    document['removeEventListener']('keydown', Fy),
                                                    document['removeEventListener']('mousedown', Fd);
                                                case 0x5:
                                                case 'end':
                                                    return FM['stop']();
                                                }
                                        }, FQ);
                                    }));
                                    return function(FB) {
                                        return FP['apply'](this, arguments);
                                    }
                                    ;
                                }())
                                  , Fd = (function() {
                                    var FP = (0x0,
                                    rd['A'])(rQ()['mark'](function FQ(FB) {
                                        var FM;
                                        return rQ()['wrap'](function(FX) {
                                            for (; ; )
                                                switch (FX['prev'] = FX['next']) {
                                                case 0x0:
                                                    FM = rj['A']['bQZ'](FB['button']),
                                                    0x0 === FB['button'] ? FM = rj['A']['bQy'] : 0x2 === FB['button'] && (FM = rj['A']['bQB']),
                                                    Fp(Fe, FM),
                                                    FS(void 0x0),
                                                    (0x0,
                                                    rM['bK'])(),
                                                    document['removeEventListener']('keydown', Fy),
                                                    document['removeEventListener']('mousedown', Fd);
                                                case 0x7:
                                                case 'end':
                                                    return FX['stop']();
                                                }
                                        }, FQ);
                                    }));
                                    return function(FB) {
                                        return FP['apply'](this, arguments);
                                    }
                                    ;
                                }());
                                document['addEventListener']('keydown', Fy),
                                document['addEventListener']('mousedown', Fd);
                            },
                            'children': FE === Fe ? 'Press\x20Any\x20Key' : FF[Fe]
                        }, FR);
                    })
                })]
            });
        };
        var rD = r3['Ay']['div'](['display:flex;flex-direction:column;padding-right:20px;']);
        const ru = function() {
            var Fr = (0x0,
            rZ['C$'])(function(FF) {
                return FF['bGg'];
            });
            return (0x0,
            r9['jsxs'])(r9['Fragment'], {
                'children': [(0x0,
                r9['jsx'])(rW['Ay'], {
                    'style': {
                        'padding': 0xa
                    },
                    'children': (0x0,
                    r9['jsxs'])(rD, {
                        'children': [(0x0,
                        r9['jsx'])(rb, {
                            'name': 'Move\x20Left',
                            'gameKeyTypes': [rZ['IS']['MOVE_LEFT']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Move\x20Right',
                            'gameKeyTypes': [rZ['IS']['MOVE_RIGHT']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Move\x20Forward',
                            'gameKeyTypes': [rZ['IS']['MOVE_FORWARD']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Move\x20Backward',
                            'gameKeyTypes': [rZ['IS']['MOVE_BACKWARD']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Jump',
                            'gameKeyTypes': [rZ['IS']['JUMP']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Sprint',
                            'gameKeyTypes': [rZ['IS']['SPRINT']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Crouch',
                            'gameKeyTypes': [rZ['IS']['CROUCH'], rZ['IS']['CROUCH_2']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Drop\x20Active\x20Item',
                            'gameKeyTypes': [rZ['IS']['DROP_CURRENT_ITEM']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Backpack',
                            'gameKeyTypes': [rZ['IS']['TOGGLE_INVENTORY']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Inventory\x20Helper\x20Key',
                            'gameKeyTypes': [rZ['IS']['INVENTORY_HELPER_KEY']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Primary\x20Action',
                            'gameKeyTypes': [rZ['IS']['PRIMARY_ACTION']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Secondary\x20Action',
                            'gameKeyTypes': [rZ['IS']['SECONDARY_ACTION'], rZ['IS']['SECONDARY_ACTION_2']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Toggle\x20Debug',
                            'gameKeyTypes': [rZ['IS']['TOGGLE_DEBUG']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Screenshot',
                            'gameKeyTypes': [rZ['IS']['SCREENSHOT']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Toggle\x20Perspective',
                            'gameKeyTypes': [rZ['IS']['SWITCH_VIEW']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Buy/Commands\x20Menu',
                            'gameKeyTypes': [rZ['IS']['TOGGLE_INTERACTIVE_MENU']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Chat',
                            'gameKeyTypes': [rZ['IS']['CHAT']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Select\x20Slot\x201',
                            'gameKeyTypes': [rZ['IS']['SELECT_SLOT_1']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Select\x20Slot\x202',
                            'gameKeyTypes': [rZ['IS']['SELECT_SLOT_2']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Select\x20Slot\x203',
                            'gameKeyTypes': [rZ['IS']['SELECT_SLOT_3']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Select\x20Slot\x204',
                            'gameKeyTypes': [rZ['IS']['SELECT_SLOT_4']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Select\x20Slot\x205',
                            'gameKeyTypes': [rZ['IS']['SELECT_SLOT_5']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Select\x20Slot\x206',
                            'gameKeyTypes': [rZ['IS']['SELECT_SLOT_6']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Select\x20Slot\x207',
                            'gameKeyTypes': [rZ['IS']['SELECT_SLOT_7']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Select\x20Slot\x208',
                            'gameKeyTypes': [rZ['IS']['SELECT_SLOT_8']]
                        }), (0x0,
                        r9['jsx'])(rb, {
                            'name': 'Select\x20Slot\x209',
                            'gameKeyTypes': [rZ['IS']['SELECT_SLOT_9']]
                        })]
                    })
                }), (0x0,
                r9['jsx'])(r8['A'], {
                    'marginTop': 0xf,
                    'onClick': function() {
                        Fr();
                    },
                    'children': 'Restore\x20Defaults'
                })]
            });
        };
        var F0 = r2(0x29ef)
          , F1 = r2(0x15ce6)
          , F2 = r3['Ay']['div'](['width:800px;height:600px;'])
          , F3 = r3['Ay']['div'](['display:flex;font-size:30px;margin-top:8px;'])
          , F4 = r3['Ay']['div'](['margin-right:20px;'])
          , F5 = r3['Ay']['div'](['background-color:', ';padding:12px;margin-bottom:20px;&:hover{cursor:pointer;}'], function(Fr) {
            return Fr['$active'] ? 'rgba(150,\x20150,\x20150,\x200.8)' : 'rgba(150,\x20150,\x20150,\x200.3)';
        })
          , F6 = r3['Ay']['div'](['display:flex;flex-direction:column;background-color:rgba(150,150,150,0.3);padding:20px;flex:1;height:500px;']);
        const F7 = function() {
            var Fr = (0x0,
            r4['x'])(function(Fe) {
                return Fe['bgQ'];
            })
              , FF = (0x0,
            rp['useState'])(rS)
              , FE = FF[0x0]
              , Fp = FF[0x1]
              , FS = (0x0,
            r9['jsx'])(rk, {});
            switch (FE) {
            case rS:
                FS = (0x0,
                r9['jsx'])(rk, {});
                break;
            case rR:
                FS = (0x0,
                r9['jsx'])(ra, {});
                break;
            case rH:
                FS = (0x0,
                r9['jsx'])(ru, {});
                break;
            case ry:
                FS = (0x0,
                r9['jsx'])(rA, {});
            }
            return (0x0,
            r9['jsx'])(F0['Ay'], {
                'onClose': function() {
                    Fr(r5['a']['bgO']);
                },
                'children': (0x0,
                r9['jsx'])(F2, {
                    'children': (0x0,
                    r9['jsxs'])(F0['wn'], {
                        'children': [(0x0,
                        r9['jsx'])(F0['X3'], {
                            '$fontSize': 0x24,
                            'children': 'Settings'
                        }), (0x0,
                        r9['jsxs'])(F3, {
                            'children': [(0x0,
                            r9['jsxs'])(F4, {
                                'children': [(0x0,
                                r9['jsx'])(F5, {
                                    '$active': FE === rS,
                                    'onClick': function() {
                                        (0x0,
                                        rM['bK'])(),
                                        Fp(rS);
                                    },
                                    'children': 'General'
                                }), (0x0,
                                r9['jsx'])(F5, {
                                    '$active': FE === rR,
                                    'onClick': function() {
                                        (0x0,
                                        rM['bK'])(),
                                        Fp(rR);
                                    },
                                    'children': 'Video'
                                }), !F1['A'] && (0x0,
                                r9['jsx'])(F5, {
                                    '$active': FE === rH,
                                    'onClick': function() {
                                        (0x0,
                                        rM['bK'])(),
                                        Fp(rH);
                                    },
                                    'children': 'Keybinds'
                                }), !0x1]
                            }), (0x0,
                            r9['jsx'])(F6, {
                                'children': FS
                            })]
                        })]
                    })
                })
            });
        };
        var F8 = r3['Ay']['div'](['position:absolute;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;pointer-events:auto;z-index:100003;pointer-events:none;background-color:rgba(0,0,0,0.6);']);
        const F9 = function() {
            var Fr = (0x0,
            r4['x'])(function(FE) {
                return FE['bfQ'];
            })
              , FF = null;
            switch (Fr) {
            case r5['a']['bgO']:
                FF = (0x0,
                r9['jsx'])(rE, {});
                break;
            case r5['a']['bGW']:
                FF = (0x0,
                r9['jsx'])(F7, {});
            }
            return Fr === r5['a']['bfy'] ? null : (0x0,
            r9['jsx'])(F8, {
                'children': FF
            });
        };
    }
}]);
