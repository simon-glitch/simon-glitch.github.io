
(( () => {
    'use strict';
    var F, E, p = {
        0xe796: (Q, B, X) => {
            X.d(B, {
                'Ay': () => r6,
                'dl': () => rP,
                'lk': () => r1,
            });
            var Z = X(0x3f83);
            var V = X(0x96ff);
            var G = X.n(V);
            var W = X(0xba46);
            var x = X(0x10bc4);
            var L = X(0x15c14);
            var q = X(0x2356);
            var K = X(0x9f07);
            var Y = X(0x7c38);
            var z = X(0x233);
            var j = X(0xe32b);
            var J = X(0x1394c);
            function D(rQ, rB) {
                var rM = 'undefined' != typeof Symbol && rQ[Symbol.iterator] || rQ['@@iterator'];
                if (rM)
                    return (rM = rM.call(rQ)).next.bind(rM);
                if (Array.isArray(rQ) || (rM = function(rt, rm) {
                    if (!rt)
                        return;
                    if ('string' == typeof rt)
                        return r0(rt, rm);
                    var rw = Object.prototype.toString.call(rt).slice(8, -1);
                    'Object' === rw && rt.constructor && (rw = rt.constructor.name);
                    if ('Map' === rw || 'Set' === rw)
                        return Array.from(rt);
                    if ('Arguments' === rw || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(rw))
                        return r0(rt, rm);
                }(rQ)) || rB && rQ && 'number' == typeof rQ.length) {
                    rM && (rQ = rM);
                    var rX = 0;
                    return function() {
                        return rX >= rQ.length ? {
                            'done': true
                        } : {
                            'done': false,
                            'value': rQ[rX++]
                        };
                    }
                    ;
                }
                throw new TypeError('Invalid attempt to iterate non-iterable instance.\x0aIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
            }
            function r0(rQ, rB) {
                (null == rB || rB > rQ.length) && (rB = rQ.length);
                for (var rM = 0, rX = new Array(rB); rM < rB; rM++)
                    rX[rM] = rQ[rM];
                return rX;
            }
            var r1 = function(rQ) {
                return rQ === x._.bII;
            };
            // TODO
            // wow, look at this beauty
            var r2 = function() {
                this.terrainID = 0;
                this.numFaces = 0;
                this.matIDs = [];
                this.dirs = [];
                this.is = [];
                this.js = [];
                this.ks = [];
                this.iOffsetAs = [];
                this.jOffsetAs = [];
                this.kOffsetAs = [];
                this.iOffsetBs = [];
                this.jOffsetBs = [];
                this.kOffsetBs = [];
                this.iOffsetCs = [];
                this.jOffsetCs = [];
                this.kOffsetCs = [];
                this.atlastOffsetXs = [];
                this.atlastOffsetYs = [];
                this.uvwids = [];
                this.uvhts = [];
                this.packedAO = [];
                this.AOAs = [];
                this.AOBs = [];
                this.AOCs = [];
                this.AODs = [];
            };
            var r3 = (function() {
                function rQ() {
                    this.bIF = [];
                    this.bIf = 0;
                }
                var rB = rQ.prototype;
                rB.bID = function() {
                    return this.bIf >= this.bIF.length && this.bIF.push(new r2()),
                    this.bIf++,
                    this.bIF[this.bIf - 1];
                };
                rB.bIh = function() {
                    this.bIf = 0;
                };
                return rQ;
            }());
            function r4(rQ, rB, rM, rX, rt) {
                return rM === rB[rQ] && rt === rX[rQ];
            }
            function r5(rQ, rB, rM, rX, rt) {
                return rM === rB[rQ];
            }
            var r6 = (function() {
                function rQ(rM, rX, rt, rm) {
                    var rw = this;
                    void 0 === rM && (rM = W.A.bIk),
                    void 0 === rX && (rX = true),
                    void 0 === rt && (rt = false),
                    void 0 === rm && (rm = W.A.bIy),
                    this.bIB = function(rl, rC, rN) {
                        var rZ = 9 * rw.bIZ[rl + 1] + 3 * rw.bIZ[rC + 1] + rw.bIZ[rN + 1]
                          , rh = rw.bIe[rZ]
                          , ro = rw.bIz[rZ];
                        if (2 === ro)
                            return !rw.bIH[rh.get(rl, rC, rN)];
                        var rU = [rw.bId, rw.bIR][ro]
                          , ri = rU[rl + 1]
                          , rT = rU[rC + 1]
                          , rV = rU[rN + 1];
                        return !rw.bIH[rh.get(ri, rT, rV)];
                    },
                    // TODO
                    // hmmm... this probably contains important data
                    // ahh... but i wonder which data...
                    // HMMMM!!!
                    this.bIn = rM,
                    this.bIt = rX,
                    this.bIA = rt,
                    this.bIN = rm,
                    this.bIW = new Uint16Array(this.bIn * this.bIn),
                    this.bIL = new Uint16Array(this.bIn * this.bIn),
                    this.bIX = new Int16Array(this.bIn * this.bIn),
                    this.bIm = new r3(),
                    this.bIe = Array(0x1b).fill(null),
                    this.bIz = Array(0x1b).fill(0),
                    this.bIZ = [],
                    this.bId = [],
                    this.bIR = [],
                    this.bIU = 0,
                    this.bIj = q.A.bIM.bIS.bIw.bIv,
                    this.bIQ = q.A.bIM.bIS.bIw.bIs,
                    this.bIC = q.A.bIM.bIS.bIw.bIO,
                    this.bIH = q.A.bIM.bIS.bIw.bIu,
                    this.bIK = q.A.bIM.bIS.bIw.bIc.bind(q.A.bIM.bIS.bIw),
                    this.bIY = q.A.bIM.bIS.bIw.bIx,
                    this.bIg = q.A.bIM.bIS.bIw.bIJ,
                    this.bIG = q.A.bIM.bIS.bIw.bIl,
                    this.bIq = q.A.bIM.bIS.bIw.bIi;
                }
                var rB = rQ.prototype;
                return rB.bIr = function(rM, rX, rt, rm, rw, rl) {
                    void 0 === rl && (rl = null);
                    for (var rC = rX.shape[1], rN = this.bIj, rZ = this.bIQ, rh = this.bIC, ro = this.bIK, rU = 2 * rM, ri = 0, rT = rX.index(rt, 0, 0), rV = rX.stride[1], rs = rX.stride[2], rG = rm.index(rw, 0, 0), rk = rm.stride[1], rW = rm.stride[2], rx = 0, ra = 0, rI = [], rg = [], rL = 0; rL < rC; ++rL) {
                        var rc = rT
                          , rq = rG;
                        if (rT += rs,
                        rG += rW,
                        rl && rl[rL] >= 0)
                            ri += rC;
                        else
                            for (var rf = 0; rf < rC; rf++,
                            ri++,
                            rc += rV,
                            rq += rk) {
                                var rK = rX.data[rc]
                                  , rY = rm.data[rq]
                                  , rz = ro(rK, rU)
                                  , rA = ro(rY, rU + 1)
                                  , rj = rN[rK]
                                  , rO = rN[rY]
                                  , rJ = rZ[rK]
                                  , rv = rZ[rY]
                                  , rn = rh[6 * rK + rU]
                                  , rb = rh[6 * rY + rU + 1];
                                0 === rM && rO && rv.bIo === K.R.bIP && rg.push({
                                    'bIa': (0,
                                    J.VB)(rw, rL, rf),
                                    'bIT': rY
                                }),
                                (0,
                                j.Lb)(rn, rb, rM) || rn === rb && rn === z.M.bIp && rK === rY || (rj ? rJ.bIo === K.R.bIV && rI.push({
                                    'bIE': (0,
                                    Y.LX)(rL, rf),
                                    'bbI': 1,
                                    'bbb': rK
                                }) : 0 !== rz && (this.bIW[ri] = rz,
                                this.bIt && (this.bIX[ri] = ry(this.bIB, rw, rf, rL)),
                                rx++)),
                                (0,
                                j.Lb)(rb, rn, rM) || rn === rb && rn === z.M.bIp && rK === rY || (rO ? rv.bIo === K.R.bIV && rI.push({
                                    'bIE': (0,
                                    Y.LX)(rL, rf),
                                    'bbI': -1,
                                    'bbb': rY
                                }) : 0 !== rA && (this.bIL[ri] = rA,
                                this.bIt && (this.bIX[ri] = ry(this.bIB, rt, rf, rL)),
                                ra++)),
                                rj && rJ.bIo === K.R.bIV && rI.push({
                                    'bIE': (0,
                                    Y.LX)(rL, rf),
                                    'bbI': 2,
                                    'bbb': rK
                                }),
                                rO && rv.bIo === K.R.bIV && rI.push({
                                    'bIE': (0,
                                    Y.LX)(rL, rf),
                                    'bbI': -2,
                                    'bbb': rY
                                });
                            }
                    }
                    return {
                        'bbF': rx,
                        'bbf': ra,
                        'bbD': rI,
                        'bbh': rg
                    };
                }
                ,
                // TODO
                // copy something? maybe this formats data?
                // it's using that BIIIG class from earlier
                rB.bbk = function(rM, rX, rt, rm, rw, rl, rC, rN, rZ, rh) {
                    var ro = 0
                      , rU = 2 * rm
                      , ri = [0, 0, 0];
                    ri[rm] = rt;
                    for (var rT = this.bIt ? r4 : r5, rV = 0; rV < rN; ++rV)
                        for (var rs = 1, rG = 1, rk = 0; rk < rC; rk += rs,
                        ro += rs) {
                            var rW = 0 | rM[ro];
                            if (rW) {
                                var rx = 0 | this.bIX[ro];
                                for (rs = 1; rs < rC - rk && rT(ro + rs, rM, rW, this.bIX, rx); ++rs)
                                    ;
                                rY: for (rG = 1; rG < rN - rV; ++rG)
                                    for (var ra = 0; ra < rs; ++ra) {
                                        if (!rT(ro + ra + rG * rC, rM, rW, this.bIX, rx))
                                            break rY;
                                    }
                                var rI = Math.abs(rW)
                                  , rg = this.bIq[rI];
                                if (!(rg in rh)) {
                                    var rL = this.bIm.bID();
                                    rL.numFaces = 0,
                                    rL.terrainID = rg,
                                    rh[rg] = rL;
                                }
                                // TODO
                                // oh, so we are just copying this thing??
                                var rc = rh[rg]
                                  , rq = rc.numFaces;
                                rc.numFaces++,
                                rc.matIDs[rq] = rI,
                                ri[rw] = rk,
                                ri[rl] = rV,
                                rc.is[rq] = ri[0],
                                rc.js[rq] = ri[1],
                                rc.ks[rq] = ri[2],
                                rc.iOffsetAs[rq] = 0,
                                rc.jOffsetAs[rq] = rs,
                                rc.kOffsetAs[rq] = 0,
                                rc.iOffsetBs[rq] = 0,
                                rc.jOffsetBs[rq] = rs,
                                rc.kOffsetBs[rq] = rG,
                                rc.iOffsetCs[rq] = 0,
                                rc.jOffsetCs[rq] = 0,
                                rc.kOffsetCs[rq] = rG,
                                rc.atlastOffsetXs[rq] = 0,
                                rc.atlastOffsetYs[rq] = 0,
                                rc.uvwids[rq] = rs,
                                rc.uvhts[rq] = rG,
                                rc.packedAO[rq] = rx,
                                rc.dirs[rq] = rX > 0 ? rU : rU + 1;
                                for (var rf = 0; rf < rG; ++rf)
                                    for (var rK = 0; rK < rs; ++rK)
                                        rM[ro + rK + rf * rC] = 0;
                                if (0 === (rZ -= rs * rG))
                                    return;
                            } else
                                rs = 1;
                        }
                }
                ,
                rB.bby = function(rM, rX, rt, rm, rw, rl) {
                    var rC = this
                      , rN = 2 * rt
                      , rZ = [0, 0, 0];
                    rZ[rt] = rX;
                    for (var rh, ro = function() {
                        var ri = rh.value
                          , rT = ri.bbI > 0 ? rN : rN + 1
                          , rV = 2 === ri.bbI || -2 === ri.bbI ? rT + 6 : rT
                          , rs = rC.bIQ[ri.bbb];
                        if (rs.bIo === K.R.bIV) {
                            rZ[rm] = ri.bIE.bbB,
                            rZ[rw] = ri.bIE.bbZ;
                            for (var rG, rk = D(rs.bbe[rV]); !(rG = rk()).done; ) {
                                var rW, rx, ra, rI, rg, rL, rc, rq, rf = rG.value, rK = rf.bbz, rY = Math.abs(rK), rz = rC.bIq[rY];
                                if (!(rz in rl)) {
                                    var rA = rC.bIm.bID();
                                    rA.numFaces = 0,
                                    rA.terrainID = rz,
                                    rl[rz] = rA;
                                }
                                var rj = rl[rz]
                                  , rO = rj.numFaces;
                                rj.numFaces++;
                                var rJ = [].concat(rZ);
                                rJ[rt] += rf.bbH.bbZ,
                                rJ[rm] += rf.bbH.bbB,
                                rJ[rw] += rf.bbH.bbd,
                                rj.matIDs[rO] = rY,
                                rj.is[rO] = rJ[0],
                                rj.js[rO] = rJ[1],
                                rj.ks[rO] = rJ[2],
                                rj.iOffsetAs[rO] = rf.bbR.bbZ,
                                rj.jOffsetAs[rO] = rf.bbR.bbB,
                                rj.kOffsetAs[rO] = rf.bbR.bbd,
                                rj.iOffsetBs[rO] = rf.bbn.bbZ,
                                rj.jOffsetBs[rO] = rf.bbn.bbB,
                                rj.kOffsetBs[rO] = rf.bbn.bbd,
                                rj.iOffsetCs[rO] = rf.bbt.bbZ,
                                rj.jOffsetCs[rO] = rf.bbt.bbB,
                                rj.kOffsetCs[rO] = rf.bbt.bbd,
                                rj.atlastOffsetXs[rO] = rf.bbA.bbZ,
                                rj.atlastOffsetYs[rO] = rf.bbA.bbB,
                                rj.uvwids[rO] = rf.bbN.bbZ,
                                rj.uvhts[rO] = rf.bbN.bbB;
                                var rv;
                                rv = null == rf.bbW ? void 0 : rf.bbW(function(rn, rb, rD) {
                                    var ru = rZ[rt] + rD
                                      , F0 = rZ[rm] + rn
                                      , F1 = rZ[rw] + rb;
                                    return 1 !== rT && 3 !== rT && 5 !== rT || (ru -= 1),
                                    rC.bIB(ru, F0, F1);
                                }),
                                rj.packedAO[rO] = -1,
                                rj.AOAs[rO] = null != (rW = null == (rx = rv) ? void 0 : rx.bbL) ? rW : 0,
                                rj.AOBs[rO] = null != (ra = null == (rI = rv) ? void 0 : rI.bbX) ? ra : 0,
                                rj.AOCs[rO] = null != (rg = null == (rL = rv) ? void 0 : rL.bbm) ? rg : 0,
                                rj.AODs[rO] = null != (rc = null == (rq = rv) ? void 0 : rq.bbU) ? rc : 0,
                                rj.dirs[rO] = rT;
                            }
                        }
                    }, rU = D(rM); !(rh = rU()).done; )
                        ro();
                }
                ,
                rB.bbj = function(rM) {
                    if (this.bIU !== this.bIn) {
                        this.bIU = this.bIn;
                        for (var rX = -1; rX < this.bIn + 1; rX++) {
                            var rt = rX < 0 ? 0 : rX < this.bIn ? 1 : 2;
                            this.bIZ[rX + 1] = [0, 1, 2][rt],
                            this.bId[rX + 1] = [this.bIn - 1, rX, 0][rt],
                            this.bIR[rX + 1] = [0, rX, this.bIn - 1][rt];
                        }
                    }
                    for (var rm = rM.get(0, 0, 0), rw = 0; rw < 3; rw++)
                        for (var rl = 0; rl < 3; rl++)
                            for (var rC = 0; rC < 3; rC++) {
                                var rN = 9 * rw + 3 * rl + rC
                                  , rZ = rM.get(rw - 1, rl - 1, rC - 1)
                                  , rh = 0;
                                rZ || (rh = 1),
                                rZ === rm && (rh = 2),
                                this.bIz[rN] = rh,
                                this.bIe[rN] = rZ || rm;
                            }
                }
                ,
                rB.bbM = function(rM, rX) {
                    var rt = this
                      , rm = rM[0xd].bbS
                      , rw = {};
                    this.bIm.bIh();
                    for (var rl, rC = [], rN = function(rh) {
                        var ro = 2 === rh ? 0 : 2
                          , rU = 1 === rh ? 0 : 1
                          , ri = rM.map(function(rO) {
                            return rO ? G()(rO.bbw, [rt.bIn, rt.bIn, rt.bIn]).transpose(1, 0, 2).transpose(rh, ro, rU) : void 0;
                        })
                          , rT = G()(ri, [3, 3, 3]).lo(1, 1, 1).transpose(rh, ro, rU);
                        rt.bbj(rT);
                        var rV = rT.get(-1, 0, 0)
                          , rs = rT.get(0, 0, 0);
                        if (rs) {
                            if (rV) {
                                var rG = rV.lo(rt.bIn, 0, 0)
                                  , rk = rt.bIr(rh, rG, -1, rs, 0)
                                  , rW = rk.bbF
                                  , rx = rk.bbf
                                  , ra = rk.bbD
                                  , rI = rk.bbh;
                                rC.push.apply(rC, rI),
                                rW > 0 && rt.bbk(rt.bIW, 1, 0, rh, ro, rU, rt.bIn, rt.bIn, rW, rw),
                                rx > 0 && rt.bbk(rt.bIL, -1, 0, rh, ro, rU, rt.bIn, rt.bIn, rx, rw),
                                ra.length > 0 && rt.bby(ra, 0, rh, ro, rU, rw);
                            } else {
                                if (0 === rh && rX) {
                                    for (var rg = 0; rg < W.A.bIk; rg++)
                                        for (var rL = 0; rL < W.A.bIk; rL++) {
                                            var rc = rs.data[rL * W.A.bIk * W.A.bIk + rg]
                                              , rq = rt.bIj[rc]
                                              , rf = rt.bIQ[rc].bIo;
                                            rq && rf === K.R.bIP && rC.push({
                                                'bIa': (0,
                                                J.VB)(0, rL, rg),
                                                'bIT': rc
                                            });
                                        }
                                }
                            }
                            if (rm)
                                return 1;
                            for (rl = 0; rl < rt.bIn - 1; rl++) {
                                var rK = rt.bIr(rh, rs, rl, rs, rl + 1)
                                  , rY = rK.bbF
                                  , rz = rK.bbf
                                  , rA = rK.bbD
                                  , rj = rK.bbh;
                                rC.push.apply(rC, rj),
                                rY > 0 && rt.bbk(rt.bIW, 1, rl + 1, rh, ro, rU, rt.bIn, rt.bIn, rY, rw),
                                rz > 0 && rt.bbk(rt.bIL, -1, rl + 1, rh, ro, rU, rt.bIn, rt.bIn, rz, rw),
                                rA.length > 0 && rt.bby(rA, rl + 1, rh, ro, rU, rw);
                            }
                        }
                    }, rZ = 0; rZ < 3; ++rZ)
                        rN(rZ);
                    return {
                        'bbv': rw,
                        'bbh': rC
                    };
                }
                ,
                rB.bbQ = function(rM) {
                    var rX = this.bIY
                      , rt = this.bIg
                      , rm = this.bIG
                      , rw = [1, 1, 1]
                      , rl = [];
                    for (var rC in rM) {
                        var rN = rM[rC]
                          , rZ = rN.terrainID
                          , rh = rX[rN.matIDs[0]].bbZ >= 0
                          , ro = rN.numFaces
                          , rU = new Uint32Array(6 * ro)
                          , ri = new Float32Array(0xc * ro)
                          , rT = this.bIA ? new Int8Array(0xc * ro) : void 0
                          , rV = void 0
                          , rs = void 0
                          , rG = void 0
                          , rk = void 0;
                        rh ? (rs = new Int16Array(8 * ro),
                        rG = new Uint16Array(2 * ro * 4),
                        this.bIt && (rk = new Uint8Array(4 * ro))) : rV = new Float32Array(0xc * ro);
                        for (var rW = 0; rW < rN.numFaces; rW++) {
                            var rx = rN.matIDs[rW]
                              , ra = rN.dirs[rW]
                              , rI = rN.is[rW]
                              , rg = rN.js[rW]
                              , rL = rN.ks[rW]
                              , rc = rN.iOffsetAs[rW]
                              , rq = rN.jOffsetAs[rW]
                              , rf = rN.kOffsetAs[rW]
                              , rK = rN.iOffsetBs[rW]
                              , rY = rN.jOffsetBs[rW]
                              , rz = rN.kOffsetBs[rW]
                              , rA = rN.iOffsetCs[rW]
                              , rj = rN.jOffsetCs[rW]
                              , rO = rN.kOffsetCs[rW]
                              , rJ = 0x10 * rN.uvwids[rW]
                              , rv = 0x10 * rN.uvhts[rW]
                              , rn = ra / 2 | 0
                              , rb = ra % 2 ? -1 : 1;
                            r7(ri, rW, rI, rg, rL, rn, rc, rq, rf, rK, rY, rz, rA, rj, rO);
                            var rD = rN.packedAO[rW]
                              , ru = rN.AOAs[rW]
                              , F0 = rN.AOBs[rW]
                              , F1 = rN.AOCs[rW]
                              , F2 = rN.AODs[rW];
                            if (-1 !== rD) {
                                var F3 = rd(rD);
                                ru = this.bIN[F3[0]],
                                F0 = this.bIN[F3[1]],
                                F1 = this.bIN[F3[2]],
                                F2 = this.bIN[F3[3]];
                            }
                            if (rr(rU, rW, rn, rb, rp(ru, F0, F1, F2)),
                            this.bIA && rT) {
                                var F4 = [0, 0, 0];
                                F4[rn] = rb,
                                r9(rT, rW, F4);
                            }
                            if (rh && rG && rs) {
                                var F5 = rN.atlastOffsetXs[rW]
                                  , F6 = rN.atlastOffsetYs[rW]
                                  , F7 = rX[rx]
                                  , F8 = rt[rx];
                                rE(rG, rW, F7, F5 + 1, F6 + 1),
                                r8(rs, rW, rn, rJ, rv, rb, F8),
                                this.bIt && rk && rH(rk, rW, ru, F0, F1, F2, ra);
                            } else {
                                if (rV) {
                                    var F9 = rm[rx] || rw;
                                    this.bIt ? re(rV, rW, F9, ru, F0, F1, F2) : rS(rV, rW, F9);
                                }
                            }
                        }
                        rl.push({
                            'bbs': rZ,
                            'bbC': ri,
                            'bbO': rU,
                            'bbu': rT,
                            'bbK': rV,
                            'bbc': rs,
                            'atlasIndices': rG,
                            'bbY': rk
                        });
                    }
                    return rl;
                }
                ,
                rQ;
            }());
            function r7(rQ, rB, rM, rX, rt, rm, rw, rl, rC, rN, rZ, rh, ro, rU, ri) {
                var rT = 0xc * rB
                  , rV = [rM, rX, rt]
                  , rs = rm
                  , rG = 2 === rs ? 0 : 2
                  , rk = 1 === rs ? 0 : 1
                  , rW = [0, 0, 0];
                rW[rs] = rw,
                rW[rG] = rl,
                rW[rk] = rC;
                var rx = [0, 0, 0];
                rx[rs] = rN,
                rx[rG] = rZ,
                rx[rk] = rh;
                var ra = [0, 0, 0];
                ra[rs] = ro,
                ra[rG] = rU,
                ra[rk] = ri,
                rQ[rT + 0] = rV[0],
                rQ[rT + 1] = rV[1],
                rQ[rT + 2] = rV[2],
                rQ[rT + 3 + 0] = rV[0] + rW[0],
                rQ[rT + 3 + 1] = rV[1] + rW[1],
                rQ[rT + 3 + 2] = rV[2] + rW[2],
                rQ[rT + 6 + 0] = rV[0] + rx[0],
                rQ[rT + 6 + 1] = rV[1] + rx[1],
                rQ[rT + 6 + 2] = rV[2] + rx[2],
                rQ[rT + 9 + 0] = rV[0] + ra[0],
                rQ[rT + 9 + 1] = rV[1] + ra[1],
                rQ[rT + 9 + 2] = rV[2] + ra[2];
            }
            function r8(rQ, rB, rM, rX, rt, rm, rw) {
                for (var rl = 8 * rB, rC = 0; rC < 8; rC++)
                    rQ[rl + rC] = 0;
                var rN = 1
                  , rZ = 3
                  , rh = 2
                  , ro = 4
                  , rU = 1 === (rw = (0,
                L.Wh)(rw, 4)) || 3 === rw
                  , ri = rt - 0
                  , rT = rm * rX;
                1 === rM ? (rN = 1,
                rZ = 7,
                rh = 4,
                ro = 6,
                ri = rX - 0,
                rT = rm * rt) : 2 == rM && (rN = 1,
                rZ = 3,
                rh = 2,
                ro = 4,
                ri = rt - 0,
                rT = -rm * rX),
                rN = (0,
                L.Wh)(rN + 2 * rw, 8),
                rZ = (0,
                L.Wh)(rZ + 2 * rw, 8),
                rh = (0,
                L.Wh)(rh + 2 * rw, 8),
                ro = (0,
                L.Wh)(ro + 2 * rw, 8),
                rQ[rl + rN] = rQ[rl + rZ] = rU ? rT : ri,
                rQ[rl + rh] = rQ[rl + ro] = rU ? ri : rT;
            }
            function r9(rQ, rB, rM) {
                for (var rX = 0xc * rB, rt = 0; rt < 0xc; rt++)
                    rQ[rX + rt] = rM[rt % 3];
            }
            function rr(rQ, rB, rM, rX, rt) {
                var rm = 6 * rB
                  , rw = 4 * rB;
                0 === rM && (rX = -rX);
                var rl = rX < 0 ? 0 : 1;
                rt || (rl += 2);
                for (var rC = rF[rl], rN = 0; rN < 6; rN++)
                    rQ[rm + rN] = rw + rC[rN];
            }
            var rF = [[0, 2, 1, 0, 3, 2], [0, 1, 2, 0, 2, 3], [1, 3, 2, 1, 0, 3], [1, 2, 3, 1, 3, 0]];
            function rE(rQ, rB, rM, rX, rt) {
                for (var rm = 8 * rB, rw = 0; rw < 8; rw += 2)
                    rQ[rm + rw] = 0x10 * (rM.bbZ + rX),
                    rQ[rm + rw + 1] = 0x10 * (rM.bbB + rt);
            }
            function rp(rQ, rB, rM, rX) {
                return rQ + rM >= rB + rX;
            }
            function rS(rQ, rB, rM) {
                for (var rX = 0xc * rB, rt = 0; rt < 0xc; rt += 3)
                    rQ[rX + rt] = rM[0],
                    rQ[rX + rt + 1] = rM[1],
                    rQ[rX + rt + 2] = rM[2];
            }
            function re(rQ, rB, rM, rX, rt, rm, rw) {
                var rl = 0xc * rB;
                rR(rQ, rl, rM, rX),
                rR(rQ, rl + 3, rM, rw),
                rR(rQ, rl + 6, rM, rm),
                rR(rQ, rl + 9, rM, rt);
            }
            function rR(rQ, rB, rM, rX) {
                rQ[rB] = rM[0] * rX,
                rQ[rB + 1] = rM[1] * rX,
                rQ[rB + 2] = rM[2] * rX;
            }
            function rH(rQ, rB, rM, rX, rt, rm, rw) {
                var rl = 1;
                0 === rw || 1 === rw ? rl = 0.9 : 4 === rw || 5 === rw ? rl = 0.825 : 3 === rw && (rl = 0.75);
                var rC = 4 * rB;
                rQ[rC] = rM * rl * 0xff,
                rQ[rC + 1] = rm * rl * 0xff,
                rQ[rC + 2] = rt * rl * 0xff,
                rQ[rC + 3] = rX * rl * 0xff;
            }
            function ry(rQ, rB, rM, rX) {
                var rt = [[rQ(rB, rM + 1, rX + 1), rQ(rB, rM + 1, rX), rQ(rB, rM + 1, rX - 1)], [rQ(rB, rM, rX + 1), false, rQ(rB, rM, rX - 1)], [rQ(rB, rM - 1, rX + 1), rQ(rB, rM - 1, rX), rQ(rB, rM - 1, rX - 1)]]
                  , rm = (0,
                j.Mc)(rt[1][0], rt[2][1], rt[2][0]);
                return (0,
                j.Mc)(rt[1][0], rt[0][1], rt[0][0]) << 6 | (0,
                j.Mc)(rt[0][1], rt[1][2], rt[0][2]) << 4 | rm << 2 | (0,
                j.Mc)(rt[1][2], rt[2][1], rt[2][2]);
            }
            function rd(rQ) {
                return [3 & rQ, rQ >> 2 & 3, rQ >> 6 & 3, rQ >> 4 & 3];
            }
            var rP = function(rQ) {
                for (var rB, rM = [], rX = D(rQ); !(rB = rX()).done; ) {
                    var rt = rB.value
                      , rm = new Z.BufferGeometry();
                    rm.setAttribute('position', new Z.Float32BufferAttribute(rt.bbC,3)),
                    rm.setIndex(new Z.Uint32BufferAttribute(rt.bbO,1)),
                    rt.bbK && rm.setAttribute('color', new Z.Float32BufferAttribute(rt.bbK,3)),
                    rt.bbu && rm.setAttribute('normal', new Z.Int8BufferAttribute(rt.bbu,3)),
                    rt.bbc && rm.setAttribute('uv', new Z.Int16BufferAttribute(rt.bbc,2)),
                    rt.bbY && rm.setAttribute('ao', new Z.Uint8BufferAttribute(rt.bbY,1,true)),
                    rt.atlasIndices && rm.setAttribute('atlasIndex', new Z.Uint16BufferAttribute(rt.atlasIndices,2));
                    var rw = new Z.Mesh(rm,q.A.bIM.bIS.bIw.bbx[rt.bbs]);
                    rM.push(rw);
                }
                return rM;
            };
        },
        0x4b3: (H, y, d) => {
            d.d(y, {
                'b': () => Q
            });
            var P = d(0x162af)
              , Q = {
                'FCn': 0,
                'FCt': 1,
                'FCA': 2,
                'FCN': 3,
                'FCk': 4
            };
            P.p.bAW,
            P.p.bAX,
            P.p.bHx,
            P.p.bAW,
            P.p.bAW;
        },
        0x3f83: (r0, r1, r2) => {
            r2.d(r1, {
                'AdditiveBlending': () => r3.EZo,
                'AmbientLight': () => ro.$,
                'AnimationClip': () => rk.t,
                'AudioLoader': () => rC.A,
                'Bone': () => rF.$,
                'Box3': () => rz.N,
                'BufferAttribute': () => rg.TH,
                'BufferGeometry': () => rW.L,
                'ClampToEdgeWrapping': () => r3.ghU,
                'Clock': () => rc.z,
                'Color': () => rv.Q,
                'ColorManagement': () => rn.pp,
                'CustomBlending': () => r3.bCz,
                'DataTexture': () => rP.G,
                'DirectionalLight': () => rh.Z,
                'DoubleSide': () => r3.$EB,
                'Euler': () => rA.O,
                'FileLoader': () => rm.Y,
                'Float32BufferAttribute': () => rg.qt,
                'FrontSide': () => r3.hB5,
                'Group': () => rd.Y,
                'HalfFloatType': () => r3.ix0,
                'ImageBitmapLoader': () => rt.K,
                'InstancedBufferAttribute': () => rI.u,
                'InstancedMesh': () => rp.Z,
                'Int16BufferAttribute': () => rg.Hr,
                'Int8BufferAttribute': () => rg.wv,
                'InterleavedBuffer': () => ra.e,
                'InterleavedBufferAttribute': () => rx.e,
                'Interpolant': () => rq.l,
                'InterpolateDiscrete': () => r3.ljd,
                'InterpolateLinear': () => r3.PJ3,
                'Line': () => rH.N,
                'LineBasicMaterial': () => rM.mr,
                'LineLoop': () => rR.F,
                'LineSegments': () => rS.D,
                'LinearFilter': () => r3.k6q,
                'LinearMipmapLinearFilter': () => r3.$_I,
                'LinearMipmapNearestFilter': () => r3.kRr,
                'LinearSRGBColorSpace': () => r3.Zr2,
                'Loader': () => rw.a,
                'LoaderUtils': () => rl.r,
                'Material': () => rM.im,
                'MathUtils': () => rf.cj,
                'Matrix4': () => rY.k,
                'Mesh': () => rE.e,
                'MeshBasicMaterial': () => rM.V9,
                'MeshDepthMaterial': () => rM.CS,
                'MeshPhysicalMaterial': () => rM.uS,
                'MeshStandardMaterial': () => rM._4,
                'MirroredRepeatWrapping': () => r3.kTW,
                'NearestFilter': () => r3.hxR,
                'NearestMipmapLinearFilter': () => r3.Cfg,
                'NearestMipmapNearestFilter': () => r3.pHI,
                'NoBlending': () => r3.XIg,
                'NumberKeyframeTrack': () => rs.H,
                'Object3D': () => rL.B,
                'OrthographicCamera': () => ri.q,
                'PerspectiveCamera': () => rU.u,
                'PlaneGeometry': () => rB.bd,
                'PointLight': () => rZ.H,
                'Points': () => ry.O,
                'PointsMaterial': () => rM.BH,
                'PropertyBinding': () => rG.N,
                'Quaternion': () => rJ.P,
                'QuaternionKeyframeTrack': () => rV.M,
                'RGBADepthPacking': () => r3.N5j,
                'RGBAFormat': () => r3.GWd,
                'RepeatWrapping': () => r3.GJx,
                'SRGBColorSpace': () => r3.er$,
                'Scene': () => r8.Z,
                'ShaderMaterial': () => rM.BK,
                'Skeleton': () => rr.E,
                'SkinnedMesh': () => r9.I,
                'Sphere': () => rK.i,
                'SpotLight': () => rN.n,
                'Texture': () => rQ.g,
                'TextureLoader': () => rX.T,
                'TriangleFanDrawMode': () => r3.rYR,
                'TriangleStripDrawMode': () => r3.O49,
                'TrianglesDrawMode': () => r3.RJ4,
                'UVMapping': () => r3.UTZ,
                'Uint16BufferAttribute': () => rg.A$,
                'Uint32BufferAttribute': () => rg.MW,
                'Uint8BufferAttribute': () => rg.b,
                'UniformsLib': () => r6.f,
                'UniformsUtils': () => r7.Ll,
                'UnsignedByteType': () => r3.OUM,
                'Vector2': () => rO.I,
                'Vector3': () => rj.P,
                'VectorKeyframeTrack': () => rT.R,
                'WebGLRenderTarget': () => r4.n,
                'WebGLRenderer': () => r5.J
            });
            var r3 = r2(0x172d2)
              , r4 = (r2(0x1653d),
            r2(0x50af),
            r2(0xbd7f),
            r2(0x101b9),
            r2(0xc42c))
              , r5 = r2(0x178c5)
              , r6 = (r2(0x5d85),
            r2(0x9c0d),
            r2(0x58c9))
              , r7 = r2(0x41ef)
              , r8 = (r2(0xfdaa),
            r2(0xb9f2),
            r2(0x12331),
            r2(0x1ea9))
              , r9 = (r2(0x137fb),
            r2(0x138bf),
            r2(0x162d1))
              , rr = r2(0x8fb1)
              , rF = r2(0xad2c)
              , rE = r2(0x1152b)
              , rp = r2(0x4bd8)
              , rS = (r2(0xad70),
            r2(0x1499a))
              , rR = r2(0x11f76)
              , rH = r2(0x7404)
              , ry = r2(0xf5e1)
              , rd = r2(0x658b)
              , rP = (r2(0x14b20),
            r2(0x6dbc),
            r2(0x14f63),
            r2(0x2277))
              , rQ = (r2(0xc71e),
            r2(0x10762),
            r2(0x308),
            r2(0xdc03),
            r2(0x11073),
            r2(0xb12c),
            r2(0x24cb),
            r2(0xac1a),
            r2(0x17417))
              , rB = r2(0x22e6)
              , rM = r2(0x13eec)
              , rX = (r2(0xd109),
            r2(0x350f),
            r2(0x16d53),
            r2(0x8558),
            r2(0x2478))
              , rt = (r2(0x16d92),
            r2(0x1036c),
            r2(0x1708b),
            r2(0x6235),
            r2(0x14b92),
            r2(0xc9f5))
              , rm = r2(0x16e3b)
              , rw = r2(0x1191)
              , rl = r2(0xdeb8)
              , rC = (r2(0xd192),
            r2(0x9fbd))
              , rN = r2(0x10c9e)
              , rZ = r2(0x12c97)
              , rh = (r2(0x5eb0),
            r2(0x31f1),
            r2(0x1535f))
              , ro = r2(0x1348d)
              , rU = (r2(0xb8f1),
            r2(0x1503f),
            r2(0x20d1),
            r2(0x152d9))
              , ri = r2(0x17743)
              , rT = (r2(0x306c),
            r2(0x152de),
            r2(0xab79),
            r2(0x130b4),
            r2(0x9232),
            r2(0xcc0c),
            r2(0xdc9))
              , rV = (r2(0x748b),
            r2(0x29c0))
              , rs = r2(0xc7b)
              , rG = (r2(0xe961),
            r2(0x11ac),
            r2(0xd314),
            r2(0x7530))
              , rk = (r2(0xe70),
            r2(0x11c87),
            r2(0xbd44),
            r2(0xe233),
            r2(0x4fda))
              , rW = (r2(0x143ce),
            r2(0xfbe),
            r2(0x18a3),
            r2(0x12e6c),
            r2(0x16835))
              , rx = r2(0xd3e8)
              , ra = (r2(0x4eb9),
            r2(0x8222))
              , rI = r2(0x76e)
              , rg = r2(0x17dfd)
              , rL = r2(0x16f53)
              , rc = (r2(0xd973),
            r2(0x1074d))
              , rq = (r2(0x131b5),
            r2(0x3696),
            r2(0x28f4))
              , rf = (r2(0x37c8),
            r2(0xbd95))
              , rK = (r2(0x2755),
            r2(0xa3bc),
            r2(0x6a24),
            r2(0x79b5))
              , rY = (r2(0xbf9a),
            r2(0x11ded))
              , rz = (r2(0x3e78),
            r2(0x7002))
              , rA = (r2(0xb7f1),
            r2(0x14b45),
            r2(0x147e3))
              , rj = (r2(0xb3ef),
            r2(0x1008e))
              , rO = r2(0x1264d)
              , rJ = r2(0x13294)
              , rv = r2(0x169b1)
              , rn = r2(0x4efe);
            r2(0xe3ac),
            r2(0x15281),
            r2(0x7396),
            r2(0x17c23),
            r2(0x71a1),
            r2(0x14b85),
            r2(0x7ebd),
            r2(0x8d79),
            r2(0xb396),
            r2(0x1461c),
            r2(0x17e6f),
            r2(0x1a2f),
            r2(0x16ac),
            r2(0xcde0),
            r2(0x144de),
            r2(0x11562),
            r2(0xf750),
            r2(0x1819d),
            r2(0x6bf),
            r2(0x52dc),
            r2(0x4e82),
            r2(0x10d2d),
            r2(0xf066),
            r2(0x10fc5),
            r2(0xc3ba),
            r2(0x1078a),
            ('undefined' != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('register',{
                'detail': {
                    'revision': r3.sPf
                }
            })),
            'undefined' != typeof window && (window.__THREE__ ? console.warn('WARNING: Multiple instances of Three.js being imported.') : window.__THREE__ = r3.sPf));
        },
        0x172d2: (r0, r1, r2) => {
            r2.d(r1, {
                '$EB': () => rp,
                '$Yl': () => rG,
                '$_I': () => Fp,
                '$ei': () => rm,
                'BER': () => rb,
                'BXX': () => FW,
                'B_h': () => FK,
                'CMB': () => FN,
                'CVz': () => FL,
                'CWW': () => E7,
                'Cfg': () => Fr,
                'DAe': () => ER,
                'EQC': () => Er,
                'EZo': () => rH,
                'EdD': () => rd,
                'FFZ': () => Eg,
                'FV': () => rv,
                'FXf': () => rB,
                'Fn': () => E1,
                'Fvi': () => rD,
                'GJx': () => F5,
                'GWd': () => Fl,
                'Gwm': () => rc,
                'H23': () => E2,
                'HO_': () => E6,
                'HXV': () => FI,
                'IE4': () => Fs,
                'Jnc': () => r6,
                'K52': () => rq,
                'KDk': () => Fq,
                'KLL': () => Eo,
                'KRh': () => rY,
                'Ke9': () => ES,
                'Kef': () => E4,
                'Kwu': () => ry,
                'Kzv': () => FC,
                'LiQ': () => rN,
                'Mjd': () => rO,
                'N5j': () => EM,
                'NTi': () => rR,
                'Nt7': () => rU,
                'Nz6': () => FG,
                'O49': () => Ey,
                'OUM': () => FS,
                'Om': () => F4,
                'OuU': () => rh,
                'PJ3': () => E9,
                'QP0': () => r7,
                'Qrf': () => FA,
                'RJ4': () => EH,
                'RQf': () => FQ,
                'Riy': () => Fc,
                'Rkk': () => EB,
                'RrE': () => rs,
                'RyA': () => r9,
                'S$4': () => E0,
                'S2Q': () => EQ,
                'TdN': () => Ef,
                'TiK': () => EW,
                'TkQ': () => FT,
                'U3G': () => rL,
                'UTZ': () => ru,
                'Ua6': () => Eq,
                'V3x': () => Fm,
                'V5c': () => EN,
                'VT0': () => Fo,
                'VVr': () => ET,
                'Vb5': () => r5,
                'VxR': () => Eh,
                'W9U': () => E3,
                'WNZ': () => r4,
                'Wdf': () => Ec,
                'Wew': () => FM,
                'Wk7': () => r8,
                'XG_': () => E5,
                'XIg': () => rS,
                'XrR': () => rz,
                'Yuy': () => Fd,
                'ZQM': () => FU,
                'Zr2': () => EC,
                '_QJ': () => FJ,
                'a5J': () => FO,
                'aEY': () => rT,
                'agE': () => EL,
                'amv': () => Es,
                'bC7': () => Fb,
                'bCz': () => rP,
                'bI3': () => EX,
                'bkx': () => FP,
                'brA': () => rI,
                'bw0': () => rf,
                'c90': () => FV,
                'cHt': () => Fy,
                'caT': () => rK,
                'czI': () => FY,
                'dcC': () => Fh,
                'dhZ': () => Ep,
                'e0p': () => rk,
                'eHc': () => rx,
                'eoi': () => Ex,
                'er$': () => El,
                'f4X': () => rC,
                'fBL': () => FH,
                'g7M': () => rn,
                'gJ2': () => FX,
                'gO9': () => rQ,
                'gWB': () => EI,
                'ghU': () => F6,
                'h2z': () => EE,
                'hB5': () => rF,
                'hdd': () => ro,
                'hgQ': () => rV,
                'hsX': () => rE,
                'hxR': () => F8,
                'hy7': () => F0,
                'i7u': () => EK,
                'ie2': () => rZ,
                'ix0': () => FB,
                'jR7': () => Fk,
                'jf0': () => Ew,
                'jzd': () => Ea,
                'k6Q': () => Fx,
                'k6q': () => FF,
                'kO0': () => Ek,
                'kRr': () => FE,
                'kTW': () => F7,
                'kTp': () => Fa,
                'kyO': () => rj,
                'lGu': () => ra,
                'ljd': () => E8,
                'lyL': () => Fn,
                'nNL': () => rJ,
                'nST': () => rM,
                'ojh': () => rw,
                'ojs': () => Fu,
                'ov9': () => rW,
                'pBf': () => Fg,
                'pHI': () => F9,
                'paN': () => Fi,
                'psI': () => Fj,
                'qIQ': () => EZ,
                'qa3': () => Ff,
                'qad': () => rl,
                'rQf': () => EF,
                'rSH': () => Fz,
                'rYR': () => Ed,
                'sKt': () => EV,
                'sPf': () => r3,
                'tJf': () => FR,
                'tgE': () => EP,
                'uB5': () => Fv,
                'uV5': () => F3,
                'vim': () => EG,
                'vyJ': () => Em,
                'wfO': () => F2,
                'wn6': () => ri,
                'wqq': () => Ei,
                'wrO': () => Fw,
                'xFO': () => F1,
                'xSv': () => rg,
                'y3Z': () => FD,
                'y_p': () => rA,
                'z5': () => EU,
                'zdS': () => FZ,
                'znC': () => rX
            });
            var r3 = '159'
              , r4 = 0
              , r5 = 1
              , r6 = 2
              , r7 = 1
              , r8 = 2
              , r9 = 3
              , rF = 0
              , rE = 1
              , rp = 2
              , rS = 0
              , rR = 1
              , rH = 2
              , ry = 3
              , rd = 4
              , rP = 5
              , rQ = 0x64
              , rB = 0x65
              , rM = 0x66
              , rX = 0x67
              , rm = 0x68
              , rw = 0xc8
              , rl = 0xc9
              , rC = 0xca
              , rN = 0xcb
              , rZ = 0xcc
              , rh = 0xcd
              , ro = 0xce
              , rU = 0xcf
              , ri = 0xd0
              , rT = 0xd1
              , rV = 0xd2
              , rs = 0xd3
              , rG = 0xd4
              , rk = 0xd5
              , rW = 0xd6
              , rx = 0
              , ra = 1
              , rI = 2
              , rg = 3
              , rL = 4
              , rc = 5
              , rq = 6
              , rf = 7
              , rK = 0
              , rY = 1
              , rz = 2
              , rA = 0
              , rj = 1
              , rO = 2
              , rJ = 3
              , rv = 4
              , rn = 5
              , rb = 'attached'
              , rD = 'detached'
              , ru = 0x12c
              , F0 = 0x12d
              , F1 = 0x12e
              , F2 = 0x12f
              , F3 = 0x130
              , F4 = 0x132
              , F5 = 0x3e8
              , F6 = 0x3e9
              , F7 = 0x3ea
              , F8 = 0x3eb
              , F9 = 0x3ec
              , Fr = 0x3ed
              , FF = 0x3ee
              , FE = 0x3ef
              , Fp = 0x3f0
              , FS = 0x3f1
              , FR = 0x3f2
              , FH = 0x3f3
              , Fy = 0x3f4
              , Fd = 0x3f5
              , FP = 0x3f6
              , FQ = 0x3f7
              , FB = 0x3f8
              , FM = 0x3f9
              , FX = 0x3fa
              , Fm = 0x3fc
              , Fw = 0x3fd
              , Fl = 0x3ff
              , FC = 0x400
              , FN = 0x401
              , FZ = 0x402
              , Fh = 0x403
              , Fo = 0x404
              , FU = 0x405
              , Fi = 0x406
              , FT = 0x407
              , FV = 0x409
              , Fs = 0x83f0
              , FG = 0x83f1
              , Fk = 0x83f2
              , FW = 0x83f3
              , Fx = 0x8c00
              , Fa = 0x8c01
              , FI = 0x8c02
              , Fg = 0x8c03
              , FL = 0x8d64
              , Fc = 0x9274
              , Fq = 0x9278
              , Ff = 0x93b0
              , FK = 0x93b1
              , FY = 0x93b2
              , Fz = 0x93b3
              , FA = 0x93b4
              , Fj = 0x93b5
              , FO = 0x93b6
              , FJ = 0x93b7
              , Fv = 0x93b8
              , Fn = 0x93b9
              , Fb = 0x93ba
              , FD = 0x93bb
              , Fu = 0x93bc
              , E0 = 0x93bd
              , E1 = 0x8e8c
              , E2 = 0x8e8e
              , E3 = 0x8e8f
              , E4 = 0x8dbb
              , E5 = 0x8dbc
              , E6 = 0x8dbd
              , E7 = 0x8dbe
              , E8 = 0x8fc
              , E9 = 0x8fd
              , Er = 0x8fe
              , EF = 0x960
              , EE = 0x961
              , Ep = 0x962
              , ES = 0x9c4
              , ER = 0x9c5
              , EH = 0
              , Ey = 1
              , Ed = 2
              , EP = 0xbb8
              , EQ = 0xbb9
              , EB = 0xc80
              , EM = 0xc81
              , EX = 0
              , Em = 1
              , Ew = ''
              , El = 'srgb'
              , EC = 'srgb-linear'
              , EN = 'display-p3'
              , EZ = 'display-p3-linear'
              , Eh = 'linear'
              , Eo = 'srgb'
              , EU = 'rec709'
              , Ei = 'p3'
              , ET = 0x1e00
              , EV = 0x207
              , Es = 0x200
              , EG = 0x201
              , Ek = 0x202
              , EW = 0x203
              , Ex = 0x204
              , Ea = 0x205
              , EI = 0x206
              , Eg = 0x207
              , EL = 0x88e4
              , Ec = '300 es'
              , Eq = 0x40b
              , Ef = 0x7d0
              , EK = 0x7d1;
        },
        0x22e6: (H, y, d) => {
            d.d(y, {
                'bd': () => P.b
            }),
            (d(0x131a1),
            d(0x39e3),
            d(0xd666),
            d(0x16f21),
            d(0xf824),
            d(0x3450),
            d(0x16eca),
            d(0x3071),
            d(0xf151),
            d(0x13a3a),
            d(0xbccb));
            var P = d(0x101aa);
            d(0xc538),
            d(0x12bd8),
            d(0xe96d),
            d(0x11397),
            d(0x9a9c),
            d(0x143d1),
            d(0x82fb),
            d(0x844c),
            d(0x99ea);
        },
        0x101aa: (H, y, d) => {
            d.d(y, {
                'b': () => M
            });
            var P = d(0x12e4b)
              , Q = d(0x16835)
              , B = d(0x17dfd)
              , M = function(X) {
                function m(w, C, Z, U) {
                    var V;
                    void 0 === w && (w = 1),
                    void 0 === C && (C = 1),
                    void 0 === Z && (Z = 1),
                    void 0 === U && (U = 1),
                    (V = X.call(this) || this).type = 'PlaneGeometry',
                    V.parameters = {
                        'width': w,
                        'height': C,
                        'widthSegments': Z,
                        'heightSegments': U
                    };
                    for (var G = w / 2, W = C / 2, x = Math.floor(Z), I = Math.floor(U), L = x + 1, q = I + 1, K = w / x, Y = C / I, z = [], j = [], J = [], D = [], r0 = 0; r0 < q; r0++)
                        for (var r1 = r0 * Y - W, r2 = 0; r2 < L; r2++) {
                            var r3 = r2 * K - G;
                            j.push(r3, -r1, 0),
                            J.push(0, 0, 1),
                            D.push(r2 / x),
                            D.push(1 - r0 / I);
                        }
                    for (var r4 = 0; r4 < I; r4++)
                        for (var r5 = 0; r5 < x; r5++) {
                            var r6 = r5 + L * r4
                              , r7 = r5 + L * (r4 + 1)
                              , r8 = r5 + 1 + L * (r4 + 1)
                              , r9 = r5 + 1 + L * r4;
                            z.push(r6, r7, r9),
                            z.push(r7, r8, r9);
                        }
                    return V.setIndex(z),
                    V.setAttribute('position', new B.qt(j,3)),
                    V.setAttribute('normal', new B.qt(J,3)),
                    V.setAttribute('uv', new B.qt(D,2)),
                    V;
                }
                return (0,
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
        },
        0x178fb: (H, y, d) => {
            d.d(y, {
                'j': () => h
            });
            var P = d(0x12e4b)
              , Q = d(0x10c49)
              , B = d(0x152d9)
              , M = d(0x11ded)
              , X = d(0x1264d)
              , m = d(0x1008e)
              , w = d(0xb3ef)
              , C = new M.k()
              , N = new m.P()
              , Z = new m.P()
              , h = function(U) {
                function T() {
                    var V;
                    return (V = U.call(this, new B.u(0x5a,1,0.5,0x1f4)) || this).isPointLightShadow = true,
                    V._frameExtents = new X.I(4,2),
                    V._viewportCount = 6,
                    V._viewports = [new w.I(2,1,1,1), new w.I(0,1,1,1), new w.I(3,1,1,1), new w.I(1,1,1,1), new w.I(3,0,1,1), new w.I(1,0,1,1)],
                    V._cubeDirections = [new m.P(1,0,0), new m.P(-1,0,0), new m.P(0,0,1), new m.P(0,0,-1), new m.P(0,1,0), new m.P(0,-1,0)],
                    V._cubeUps = [new m.P(0,1,0), new m.P(0,1,0), new m.P(0,1,0), new m.P(0,1,0), new m.P(0,0,1), new m.P(0,0,-1)],
                    V;
                }
                return (0,
                P.A)(T, U),
                T.prototype.updateMatrices = function(V, G) {
                    void 0 === G && (G = 0);
                    var k = this.camera
                      , W = this.matrix
                      , x = V.distance || k.far;
                    x !== k.far && (k.far = x,
                    k.updateProjectionMatrix()),
                    N.setFromMatrixPosition(V.matrixWorld),
                    k.position.copy(N),
                    Z.copy(k.position),
                    Z.add(this._cubeDirections[G]),
                    k.up.copy(this._cubeUps[G]),
                    k.lookAt(Z),
                    k.updateMatrixWorld(),
                    W.makeTranslation(-N.x, -N.y, -N.z),
                    C.multiplyMatrices(k.projectionMatrix, k.matrixWorldInverse),
                    this._frustum.setFromProjectionMatrix(C);
                }
                ,
                T;
            }(Q.X);
        },
        0x13eec: (H, y, d) => {
            d.d(y, {
                'BH': () => Q.B,
                'BK': () => P.B,
                'CS': () => X.C,
                'V9': () => m.V,
                '_4': () => M._,
                'im': () => C.i,
                'mr': () => w.m,
                'uS': () => B.u
            }),
            (d(0x259),
            d(0xe9e8),
            d(0x5d74));
            var P = d(0x7026)
              , Q = d(0x14916)
              , B = d(0x72b1)
              , M = d(0xf135)
              , X = (d(0x10c4e),
            d(0x14d0c),
            d(0x8ab),
            d(0x10b7d),
            d(0x1bfd))
              , m = (d(0x11833),
            d(0x14baa))
              , w = (d(0x2ef2),
            d(0x11396),
            d(0x617))
              , C = d(0x10849);
        },
        0x58c9: (H, y, d) => {
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
                        'value': 1
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
                        'value': 0
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
                        'value': -1
                    },
                    'reflectivity': {
                        'value': 1
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
                        'value': 1
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
                        'value': 1
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
                        'value': 1
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
                        'value': new Q.I(1,1)
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
                        'value': 1
                    },
                    'displacementBias': {
                        'value': 0
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
                        'value': 1
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
                        'value': 1
                    },
                    'size': {
                        'value': 1
                    },
                    'scale': {
                        'value': 1
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
                        'value': 0
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
                        'value': 1
                    },
                    'center': {
                        'value': new Q.I(0.5,0.5)
                    },
                    'rotation': {
                        'value': 0
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
                        'value': 0
                    }
                }
            };
        },
        0x33ea: (H, y, d) => {
            var P;
            function Q(U, T) {
                var V = 'undefined' != typeof Symbol && U[Symbol.iterator] || U['@@iterator'];
                if (V)
                    return (V = V.call(U)).next.bind(V);
                if (Array.isArray(U) || (V = function(k, W) {
                    if (!k)
                        return;
                    if ('string' == typeof k)
                        return B(k, W);
                    var x = Object.prototype.toString.call(k).slice(8, -1);
                    'Object' === x && k.constructor && (x = k.constructor.name);
                    if ('Map' === x || 'Set' === x)
                        return Array.from(k);
                    if ('Arguments' === x || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(x))
                        return B(k, W);
                }(U)) || T && U && 'number' == typeof U.length) {
                    V && (U = V);
                    var G = 0;
                    return function() {
                        return G >= U.length ? {
                            'done': true
                        } : {
                            'done': false,
                            'value': U[G++]
                        };
                    }
                    ;
                }
                throw new TypeError('Invalid attempt to iterate non-iterable instance.\x0aIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
            }
            function B(U, T) {
                (null == T || T > U.length) && (T = U.length);
                for (var V = 0, G = new Array(T); V < T; V++)
                    G[V] = U[V];
                return G;
            }
            d.d(y, {
                'Bf': () => C,
                'QJ': () => h,
                'T': () => m,
                'Vr': () => X,
                'ZY': () => w,
                'wz': () => M
            });
            var M = {
                'bfe': 'up_north',
                'bfz': 'up_east',
                'bfH': 'up_south',
                'bfd': 'up_west',
                'bfR': 'down_north',
                'bfn': 'down_east',
                'bft': 'down_south',
                'bfA': 'down_west',
                'bfN': 'north',
                'bfW': 'east',
                'bfL': 'south',
                'bfX': 'west'
            }
              , X = function(U) {
                switch (U) {
                case M.bfe:
                    return M.bfz;
                case M.bfz:
                    return M.bfH;
                case M.bfH:
                    return M.bfd;
                case M.bfd:
                    return M.bfe;
                case M.bfR:
                    return M.bfA;
                case M.bfn:
                    return M.bfR;
                case M.bft:
                    return M.bfn;
                case M.bfA:
                    return M.bft;
                case M.bfN:
                    return M.bfW;
                case M.bfW:
                    return M.bfL;
                case M.bfL:
                    return M.bfX;
                case M.bfX:
                    return M.bfN;
                }
            }
              , m = function(U) {
                switch (U) {
                case M.bfe:
                    return M.bft;
                case M.bfz:
                    return M.bfA;
                case M.bfH:
                    return M.bfR;
                case M.bfd:
                    return M.bfn;
                case M.bfR:
                    return M.bfH;
                case M.bfn:
                    return M.bfd;
                case M.bft:
                    return M.bfe;
                case M.bfA:
                    return M.bfz;
                case M.bfN:
                    return M.bfL;
                case M.bfW:
                    return M.bfX;
                case M.bfL:
                    return M.bfN;
                case M.bfX:
                    return M.bfW;
                }
            }
              , w = function(U) {
                return U.bbd > 0 ? M.bfL : U.bbd < 0 ? M.bfN : U.bbZ > 0 ? M.bfW : U.bbZ < 0 ? M.bfX : U.bbB > 0 ? M.bfe : U.bbB < 0 ? M.bfR : M.bfN;
            }
              , C = function(U, T, V) {
                return U.bfm(M.bfz) ? m(N(V)) : T.bbd > 0 ? M.bfL : T.bbd < 0 ? M.bfN : T.bbZ > 0 ? M.bfW : T.bbZ < 0 ? M.bfX : T.bbB > 0 ? M.bfe : T.bbB < 0 ? M.bfR : m(N(V));
            }
              , N = function(U) {
                var T = U.bbZ
                  , V = U.bbB
                  , G = Math.PI / 4;
                if (T < -G) {
                    if (V >= -G && V < G)
                        return M.bfR;
                    if (V >= G && V < 3 * G)
                        return M.bfA;
                    if (V >= 3 * G || V < -3 * G)
                        return M.bft;
                    if (V >= -3 * G && V < -G)
                        return M.bfn;
                } else {
                    if (T > G) {
                        if (V >= -G && V < G)
                            return M.bfe;
                        if (V >= G && V < 3 * G)
                            return M.bfd;
                        if (V >= 3 * G || V < -3 * G)
                            return M.bfH;
                        if (V >= -3 * G && V < -G)
                            return M.bfz;
                    }
                }
                return V >= -G && V < G ? M.bfN : V >= G && V < 3 * G ? M.bfX : V >= 3 * G || V < -3 * G ? M.bfL : V >= -3 * G && V < -G ? M.bfW : M.bfe;
            }
              , Z = ((P = {})[M.bfe] = [M.bfe, M.bfN, M.bfR],
            P[M.bfz] = [M.bfz, M.bfe, M.bfW, M.bfn],
            P[M.bfH] = [M.bfH, M.bfe, M.bfL, M.bft],
            P[M.bfd] = [M.bfd, M.bfe, M.bfX, M.bfA],
            P[M.bfN] = [M.bfN, M.bfe, M.bfR],
            P[M.bfW] = [M.bfW, M.bfz, M.bfe, M.bfn],
            P[M.bfL] = [M.bfL, M.bfH, M.bfe, M.bft],
            P[M.bfX] = [M.bfX, M.bfd, M.bfe, M.bfA],
            P[M.bfR] = [M.bfR, M.bfe, M.bfN],
            P[M.bfn] = [M.bfn, M.bfR, M.bfz, M.bfe, M.bfW],
            P[M.bft] = [M.bft, M.bfR, M.bfH, M.bfe, M.bfL],
            P[M.bfA] = [M.bfA, M.bfR, M.bfd, M.bfe, M.bfX],
            P)
              , h = function(U, T) {
                for (var V, G = Q(Z[U]); !(V = G()).done; ) {
                    var k = V.value;
                    if (T.bfm(k))
                        return k;
                }
                return M.bfe;
            };
        },
        0x15169: (H, y, d) => {
            d.d(y, {
                'u': () => P
            });
            var P = function(Q, B, M) {
                return Q + ',' + B + ',' + M;
            };
        },
        0x10355: (H, y, d) => {
            d.d(y, {
                'Mo': () => Q
            }),
            (d(0x15855),
            d(0xc179));
            var P = d(0x903f)
              , Q = function() {
                return P.x.getState().bfv;
            };
        },
        0x15c14: (H, y, d) => {
            d.d(y, {
                'Wh': () => X,
                'XU': () => Q,
                'ik': () => M,
                'zi': () => B
            });
            var P = d(0x1394c)
              , Q = (d(0x3f83),
            function(m, w) {
                return m = Math.ceil(m),
                w = Math.floor(w),
                Math.floor(Math.random() * (w - m + 1)) + m;
            }
            )
              , B = function(m, w) {
                return (m % w + w) % w;
            }
              , M = function(m) {
                return (0,
                P.VB)(-Math.cos(m.bbZ) * Math.sin(m.bbB), Math.sin(m.bbZ), -Math.cos(m.bbZ) * Math.cos(m.bbB));
            }
              , X = function(m, w) {
                return (m % w + w) % w;
            };
        },
        0xa3f: (H, y, d) => {
            d.d(y, {
                'u': () => m
            });
            var P = d(0x3f83)
              , Q = d(0x608)
              , B = d(0x1394c);
            function M(w, l) {
                var C = 'undefined' != typeof Symbol && w[Symbol.iterator] || w['@@iterator'];
                if (C)
                    return (C = C.call(w)).next.bind(C);
                if (Array.isArray(w) || (C = function(Z, h) {
                    if (!Z)
                        return;
                    if ('string' == typeof Z)
                        return X(Z, h);
                    var U = Object.prototype.toString.call(Z).slice(8, -1);
                    'Object' === U && Z.constructor && (U = Z.constructor.name);
                    if ('Map' === U || 'Set' === U)
                        return Array.from(Z);
                    if ('Arguments' === U || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(U))
                        return X(Z, h);
                }(w)) || l && w && 'number' == typeof w.length) {
                    C && (w = C);
                    var N = 0;
                    return function() {
                        return N >= w.length ? {
                            'done': true
                        } : {
                            'done': false,
                            'value': w[N++]
                        };
                    }
                    ;
                }
                throw new TypeError('Invalid attempt to iterate non-iterable instance.\x0aIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
            }
            function X(w, l) {
                (null == l || l > w.length) && (l = w.length);
                for (var C = 0, N = new Array(l); C < l; C++)
                    N[C] = w[C];
                return N;
            }
            var m = function(w, C, N, Z) {
                void 0 === N && (N = (0,
                B.VB)(0xff, 0xff, 0xff)),
                void 0 === Z && (Z = 2);
                var U = w.split('\x0a')
                  , V = U.map(function(r1) {
                    return (0,
                    Q.A)(r1, N);
                })
                  , G = V.map(function(r1) {
                    return r1.map(function(r2) {
                        return r2.message;
                    }).join('');
                })
                  , k = document.createElement('canvas').getContext('2d')
                  , W = C + 'px LanaPixel, Unifont, Lato, Helvetica, sans-serif';
                k.font = W;
                var x = 2 * Z
                  , I = G.map(function(r1) {
                    return k.measureText(r1).width;
                })
                  , g = Math.max.apply(Math, I)
                  , L = g + x
                  , q = C * U.length + x;
                k.canvas.width = L,
                k.canvas.height = q,
                k.font = W,
                k.textBaseline = 'top',
                k.textAlign = 'center',
                k.fillStyle = 'rgba(0, 0, 0, 0)',
                k.fillRect(0, 0, L, q);
                for (var K = 0; K < V.length; K++)
                    for (var Y, z = 0, j = M(V[K]); !(Y = j()).done; ) {
                        var J = Y.value;
                        k.fillStyle = 'rgb(' + J.color.bbZ + ', ' + J.color.bbB + ', ' + J.color.bbd + ')',
                        k.fillText(J.message, Z + z + g / 2, Z + C * K),
                        z += k.measureText(J.message).width;
                    }
                var D = k.getImageData(0, 0, k.canvas.width, k.canvas.height)
                  , r0 = new P.DataTexture(D.data,k.canvas.width,k.canvas.height,P.RGBAFormat);
                return r0.flipY = true,
                r0.colorSpace = P.SRGBColorSpace,
                r0.minFilter = P.NearestFilter,
                r0.magFilter = P.NearestFilter,
                r0.wrapS = P.ClampToEdgeWrapping,
                r0.wrapT = P.ClampToEdgeWrapping,
                r0.needsUpdate = true,
                k.canvas.remove(),
                r0;
            };
        },
        0xa0c5: (H, y, d) => {
            d.d(y, {
                'n0': () => Q
            });
            var P = d(0xba46)
              , Q = function(B) {
                return Math.round(B / P.A.bfi);
            };
        },
        0x7c38: (H, y, d) => {
            d.d(y, {
                'LX': () => P
            }),
            d(0x15c14);
            var P = function(Q, B) {
                return {
                    'bbZ': Q,
                    'bbB': B
                };
            };
        },
        0x1394c: (H, y, d) => {
            d.d(y, {
                'JA': () => C,
                'N3': () => B,
                'VB': () => Q,
                '_P': () => X,
                'b0': () => P,
                'j9': () => M
            }),
            d(0x15c14);
            var P = function(N, Z) {
                return N.bbZ === Z.bbZ && N.bbB === Z.bbB && N.bbd === Z.bbd;
            }
              , Q = function(N, Z, h) {
                return {
                    'bbZ': N,
                    'bbB': Z,
                    'bbd': h
                };
            }
              , B = function(N) {
                return Q(N.bbZ, N.bbB, N.bbd);
            }
              , M = function(N, Z) {
                N.bbZ += Z.bbZ,
                N.bbB += Z.bbB,
                N.bbd += Z.bbd;
            }
              , X = function(N, Z) {
                N.bbZ *= Z,
                N.bbB *= Z,
                N.bbd *= Z;
            }
              , m = function(N) {
                return N.bbZ * N.bbZ + N.bbB * N.bbB + N.bbd * N.bbd;
            }
              , w = function(N) {
                return Math.sqrt(m(N));
            }
              , C = function(N) {
                var Z = w(N);
                0 !== Z && (N.bbZ /= Z,
                N.bbB /= Z,
                N.bbd /= Z);
            };
        }
        ,
        0x5598: (H, y, d) => {
            d.d(y, {
                'i': () => Q
            });
            var P = d(0x162af)
              , Q = {
                'bGF': 0,
                'bGf': 1,
                'bGD': 2,
                'bGh': 3,
                'bzA': 4
            };
            P.p.bHx,
            P.p.bHx,
            P.p.bHx,
            P.p.bHx;
        }
        ,
        0xace9: (H, y, d) => {
            d.d(y, {
                'X4': () => Q,
                'z$': () => P
            }),
            (d(0x3ae6),
            d(0x110c3),
            d(0x75a1),
            d(0x12de),
            d(0x71aa));
            var P = {
                'bfr': 0,
                'bfo': 1,
                'bfP': 2
            }
              , Q = {
                'bfy': 0,
                'bfa': 1,
                'bfT': 2
            };
        }
        ,
        0x15855: (H, y, d) => {
            d.d(y, {
                'K': () => P
            }),
            (d(0x3ae6),
            d(0x110c3),
            d(0xba46),
            d(0xa9c3),
            d(0x75a1),
            d(0xf9d2),
            d(0x71aa),
            d(0x12de));
            var P = {
                'bfC': 0,
                'bzL': 1,
                'bDm': 2,
                'bDj': 3,
                'btQ': 4,
                'bts': 5,
                'btC': 6,
                'bDS': 7,
                'btO': 8,
                'btu': 9,
                'bDU': 0xa,
                'btK': 0xb,
                'btc': 0xc,
                'btY': 0xd,
                'bDw': 0xe,
                'btx': 0xf,
                'bDQ': 0x10,
                'btg': 0x11,
                'bzA': 0x12
            };
        }
        ,
        0x12de: (H, y, d) => {}
        ,
        0xf9d2: (H, y, d) => {
            d(0x3ae6),
            d(0x12de),
            d(0x71aa);
        }
        ,
        0x71aa: (H, y, d) => {}
        ,
        0xc179: (H, y, d) => {
            d.d(y, {
                'a': () => P
            });
            var P = {
                'bfy': 0,
                'bgO': 1,
                'bGW': 2
            };
        }
        ,
        0x903f: (H, y, d) => {
            d.d(y, {
                'x': () => m
            });
            var P = d(0xe338)
              , Q = d(0x13ed5)
              , B = d(0xad85)
              , M = d(0x12181)
              , X = d(0xaaa4)
              , m = (0,
            Q.vt)(function() {
                return (0,
                P.A)({}, B.t.apply(void 0, arguments), M.P.apply(void 0, arguments), X.w.apply(void 0, arguments));
            });
        }
        ,
        0x81e1: (H, y, d) => {
            var P = d(0x1161)
              , Q = d(0x7c3d)
              , B = d(0x2356)
              , M = d(0xe796);
            B.A.bFT(true),
            B.A.bJC();
            var X = new M.Ay();
            onmessage = function(m) {
                if (m.data.bSy === Q.A.CHUNK_MESH) {
                    var w = m.data
                      , l = X.bbM(w.bSB, w.bSZ)
                      , C = X.bbQ(l.bbv)
                      , N = {
                        'bSh': w.bSh,
                        'bLk': w.bLk,
                        'bSA': C,
                        'bSZ': w.bSZ,
                        'bbh': l.bbh
                    };
                    postMessage({
                        'event': P.I.bSn,
                        'data': N
                    });
                }
            }
            ,
            postMessage({
                'event': P.I.bGJ
            });
        }
        ,
        0x3bb7: (H, P) => {
            var Q = Symbol.for('react.element')
              , B = Symbol.for('react.portal')
              , X = Symbol.for('react.fragment')
              , Z = Symbol.for('react.strict_mode')
              , V = Symbol.for('react.profiler')
              , G = Symbol.for('react.provider')
              , W = Symbol.for('react.context')
              , x = Symbol.for('react.forward_ref')
              , L = Symbol.for('react.suspense')
              , q = Symbol.for('react.memo')
              , K = Symbol.for('react.lazy')
              , Y = Symbol.iterator
              , z = {
                'isMounted': function() {
                    return false;
                },
                'enqueueForceUpdate': function() {},
                'enqueueReplaceState': function() {},
                'enqueueSetState': function() {}
            }
              , j = Object.assign
              , J = {};
            function D(rH, ry, rd) {
                this.props = rH,
                this.context = ry,
                this.refs = J,
                this.updater = rd || z;
            }
            function r0() {}
            function r1(rH, ry, rd) {
                this.props = rH,
                this.context = ry,
                this.refs = J,
                this.updater = rd || z;
            }
            D.prototype.isReactComponent = {},
            D.prototype.setState = function(rH, ry) {
                if ('object' != typeof rH && 'function' != typeof rH && null != rH)
                    throw Error('setState(...): takes an object of state variables to update or a function which returns an object of state variables.');
                this.updater.enqueueSetState(this, rH, ry, 'setState');
            }
            ,
            D.prototype.forceUpdate = function(rH) {
                this.updater.enqueueForceUpdate(this, rH, 'forceUpdate');
            }
            ,
            r0.prototype = D.prototype;
            var r2 = r1.prototype = new r0();
            r2.constructor = r1,
            j(r2, D.prototype),
            r2.isPureReactComponent = true;
            var r3 = Array.isArray
              , r4 = Object.prototype.hasOwnProperty
              , r5 = {
                'current': null
            }
              , r6 = {
                'key': true,
                'ref': true,
                '__self': true,
                '__source': true
            };
            function r7(rH, ry, rd) {
                var rP, rQ = {}, rB = null, rM = null;
                if (null != ry) {
                    for (rP in (void 0 !== ry.ref && (rM = ry.ref),
                    void 0 !== ry.key && (rB = '' + ry.key),
                    ry))
                        r4.call(ry, rP) && !r6.hasOwnProperty(rP) && (rQ[rP] = ry[rP]);
                }
                var rX = arguments.length - 2;
                if (1 === rX)
                    rQ.children = rd;
                else {
                    if (1 < rX) {
                        for (var rt = Array(rX), rm = 0; rm < rX; rm++)
                            rt[rm] = arguments[rm + 2];
                        rQ.children = rt;
                    }
                }
                if (rH && rH.defaultProps) {
                    for (rP in rX = rH.defaultProps)
                        void 0 === rQ[rP] && (rQ[rP] = rX[rP]);
                }
                return {
                    '$$typeof': Q,
                    'type': rH,
                    'key': rB,
                    'ref': rM,
                    'props': rQ,
                    '_owner': r5.current
                };
            }
            function r8(rH) {
                return 'object' == typeof rH && null !== rH && rH.$$typeof === Q;
            }
            var r9 = /\/+/g;
            function rr(rH, ry) {
                return 'object' == typeof rH && null !== rH && null != rH.key ? function(rd) {
                    var rP = {
                        '=': '=0',
                        ':': '=2'
                    };
                    return '$' + rd.replace(/[=:]/g, function(rQ) {
                        return rP[rQ];
                    });
                }('' + rH.key) : ry.toString(0x24);
            }
            function rF(rH, ry, rd, rP, rQ) {
                var rB = typeof rH;
                'undefined' !== rB && 'boolean' !== rB || (rH = null);
                var rM = false;
                if (null === rH)
                    rM = true;
                else
                    switch (rB) {
                    case 'string':
                    case 'number':
                        rM = true;
                        break;
                    case 'object':
                        switch (rH.$$typeof) {
                        case Q:
                        case B:
                            rM = true;
                        }
                    }
                if (rM)
                    return rQ = rQ(rM = rH),
                    rH = '' === rP ? '.' + rr(rM, 0) : rP,
                    r3(rQ) ? (rd = '',
                    null != rH && (rd = rH.replace(r9, '$&/') + '/'),
                    rF(rQ, ry, rd, '', function(rm) {
                        return rm;
                    })) : null != rQ && (r8(rQ) && (rQ = function(rm, rw) {
                        return {
                            '$$typeof': Q,
                            'type': rm.type,
                            'key': rw,
                            'ref': rm.ref,
                            'props': rm.props,
                            '_owner': rm._owner
                        };
                    }(rQ, rd + (!rQ.key || rM && rM.key === rQ.key ? '' : ('' + rQ.key).replace(r9, '$&/') + '/') + rH)),
                    ry.push(rQ)),
                    1;
                if (rM = 0,
                rP = '' === rP ? '.' : rP + ':',
                r3(rH))
                    for (var rX = 0; rX < rH.length; rX++) {
                        var rt = rP + rr(rB = rH[rX], rX);
                        rM += rF(rB, ry, rd, rt, rQ);
                    }
                else {
                    if (rt = function(rm) {
                        return null === rm || 'object' != typeof rm ? null : 'function' == typeof (rm = Y && rm[Y] || rm['@@iterator']) ? rm : null;
                    }(rH),
                    'function' == typeof rt) {
                        for (rH = rt.call(rH),
                        rX = 0; !(rB = rH.next()).done; )
                            rM += rF(rB = rB.value, ry, rd, rt = rP + rr(rB, rX++), rQ);
                    } else {
                        if ('object' === rB)
                            throw ry = String(rH),
                            Error('Objects are not valid as a React child (found: ' + ('[object Object]' === ry ? 'object with keys {' + Object.keys(rH).join(', ') + '}' : ry) + '). If you meant to render a collection of children, use an array instead.');
                    }
                }
                return rM;
            }
            function rE(rH, ry, rd) {
                if (null == rH)
                    return rH;
                var rP = []
                  , rQ = 0;
                return rF(rH, rP, '', '', function(rB) {
                    return ry.call(rd, rB, rQ++);
                }),
                rP;
            }
            function rp(rH) {
                if (-1 === rH._status) {
                    var ry = rH._result;
                    (ry = ry()).then(function(rd) {
                        0 !== rH._status && -1 !== rH._status || (rH._status = 1,
                        rH._result = rd);
                    }, function(rd) {
                        0 !== rH._status && -1 !== rH._status || (rH._status = 2,
                        rH._result = rd);
                    }),
                    -1 === rH._status && (rH._status = 0,
                    rH._result = ry);
                }
                if (1 === rH._status)
                    return rH._result.default;
                throw rH._result;
            }
            var rS = {
                'current': null
            }
              , re = {
                'transition': null
            }
              , rR = {
                'ReactCurrentDispatcher': rS,
                'ReactCurrentBatchConfig': re,
                'ReactCurrentOwner': r5
            };
            P.Children = {
                'map': rE,
                'forEach': function(rH, ry, rd) {
                    rE(rH, function() {
                        ry.apply(this, arguments);
                    }, rd);
                },
                'count': function(rH) {
                    var ry = 0;
                    return rE(rH, function() {
                        ry++;
                    }),
                    ry;
                },
                'toArray': function(rH) {
                    return rE(rH, function(ry) {
                        return ry;
                    }) || [];
                },
                'only': function(rH) {
                    if (!r8(rH))
                        throw Error('React.Children.only expected to receive a single React element child.');
                    return rH;
                }
            },
            P.Component = D,
            P.Fragment = X,
            P.Profiler = V,
            P.PureComponent = r1,
            P.StrictMode = Z,
            P.Suspense = L,
            P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rR,
            P.cloneElement = function(rH, ry, rd) {
                if (null == rH)
                    throw Error('React.cloneElement(...): The argument must be a React element, but you passed ' + rH + '.');
                var rP = j({}, rH.props)
                  , rQ = rH.key
                  , rB = rH.ref
                  , rM = rH._owner;
                if (null != ry) {
                    if (void 0 !== ry.ref && (rB = ry.ref,
                    rM = r5.current),
                    void 0 !== ry.key && (rQ = '' + ry.key),
                    rH.type && rH.type.defaultProps)
                        var rX = rH.type.defaultProps;
                    for (rt in ry)
                        r4.call(ry, rt) && !r6.hasOwnProperty(rt) && (rP[rt] = void 0 === ry[rt] && void 0 !== rX ? rX[rt] : ry[rt]);
                }
                var rt = arguments.length - 2;
                if (1 === rt)
                    rP.children = rd;
                else {
                    if (1 < rt) {
                        rX = Array(rt);
                        for (var rm = 0; rm < rt; rm++)
                            rX[rm] = arguments[rm + 2];
                        rP.children = rX;
                    }
                }
                return {
                    '$$typeof': Q,
                    'type': rH.type,
                    'key': rQ,
                    'ref': rB,
                    'props': rP,
                    '_owner': rM
                };
            }
            ,
            P.createContext = function(rH) {
                return (rH = {
                    '$$typeof': W,
                    '_currentValue': rH,
                    '_currentValue2': rH,
                    '_threadCount': 0,
                    'Provider': null,
                    'Consumer': null,
                    '_defaultValue': null,
                    '_globalName': null
                }).Provider = {
                    '$$typeof': G,
                    '_context': rH
                },
                rH.Consumer = rH;
            }
            ,
            P.createElement = r7,
            P.createFactory = function(rH) {
                var ry = r7.bind(null, rH);
                return ry.type = rH,
                ry;
            }
            ,
            P.createRef = function() {
                return {
                    'current': null
                };
            }
            ,
            P.forwardRef = function(rH) {
                return {
                    '$$typeof': x,
                    'render': rH
                };
            }
            ,
            P.isValidElement = r8,
            P.lazy = function(rH) {
                return {
                    '$$typeof': K,
                    '_payload': {
                        '_status': -1,
                        '_result': rH
                    },
                    '_init': rp
                };
            }
            ,
            P.memo = function(rH, ry) {
                return {
                    '$$typeof': q,
                    'type': rH,
                    'compare': void 0 === ry ? null : ry
                };
            }
            ,
            P.startTransition = function(rH) {
                var ry = re.transition;
                re.transition = {};
                try {
                    rH();
                } finally {
                    re.transition = ry;
                }
            }
            ,
            P.unstable_act = function() {
                throw Error('act(...) is not supported in production builds of React.');
            }
            ,
            P.useCallback = function(rH, ry) {
                return rS.current.useCallback(rH, ry);
            }
            ,
            P.useContext = function(rH) {
                return rS.current.useContext(rH);
            }
            ,
            P.useDebugValue = function() {}
            ,
            P.useDeferredValue = function(rH) {
                return rS.current.useDeferredValue(rH);
            }
            ,
            P.useEffect = function(rH, ry) {
                return rS.current.useEffect(rH, ry);
            }
            ,
            P.useId = function() {
                return rS.current.useId();
            }
            ,
            P.useImperativeHandle = function(rH, ry, rd) {
                return rS.current.useImperativeHandle(rH, ry, rd);
            }
            ,
            P.useInsertionEffect = function(rH, ry) {
                return rS.current.useInsertionEffect(rH, ry);
            }
            ,
            P.useLayoutEffect = function(rH, ry) {
                return rS.current.useLayoutEffect(rH, ry);
            }
            ,
            P.useMemo = function(rH, ry) {
                return rS.current.useMemo(rH, ry);
            }
            ,
            P.useReducer = function(rH, ry, rd) {
                return rS.current.useReducer(rH, ry, rd);
            }
            ,
            P.useRef = function(rH) {
                return rS.current.useRef(rH);
            }
            ,
            P.useState = function(rH) {
                return rS.current.useState(rH);
            }
            ,
            P.useSyncExternalStore = function(rH, ry, rd) {
                return rS.current.useSyncExternalStore(rH, ry, rd);
            }
            ,
            P.useTransition = function() {
                return rS.current.useTransition();
            }
            ,
            P.version = '18.2.0';
        }
        ,
        0x1791c: (H, y, d) => {
            H.exports = d(0x3bb7);
        }
    }, S = {};
    function R(H) {
        var y = S[H];
        if (void 0 !== y)
            return y.exports;
        var d = S[H] = {
            'exports': {}
        };
        return p[H](d, d.exports, R),
        d.exports;
    }
    R.m = p,
    R.x = () => {
        var H = R.O(void 0, [0x229, 0x12d, 0x198, 0xf4], () => R(0x81e1));
        return H = R.O(H);
    }
    ,
    F = [],
    R.O = (H, y, d, P) => {
        if (!y) {
            var Q = 1 / 0;
            for (m = 0; m < F.length; m++) {
                for (var [y,d,P] = F[m], B = true, M = 0; M < y.length; M++)
                    (false & P || Q >= P) && Object.keys(R.O).every(w => R.O[w](y[M])) ? y.splice(M--, 1) : (B = false,
                    P < Q && (Q = P));
                if (B) {
                    F.splice(m--, 1);
                    var X = d();
                    void 0 !== X && (H = X);
                }
            }
            return H;
        }
        P = P || 0;
        for (var m = F.length; m > 0 && F[m - 1][2] > P; m--)
            F[m] = F[m - 1];
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
                'enumerable': true,
                'get': y[d]
            });
    }
    ,
    R.f = {},
    R.e = H => Promise.all(Object.keys(R.f).reduce( (y, d) => (R.f[d](H, y),
    y), [])),
    R.u = H => './package/' + {
        0xf4: '26ebc497838bb808d7bf',
        0x12d: 'c03e852cb02e1fec4ed5',
        0x198: 'c3e53f01e123ae74ed3b',
        0x229: '69cb7c029c2d7489712f'
    }[H] + '.js',
    R.miniCssF = H => {}
    ,
    R.o = (H, y) => Object.prototype.hasOwnProperty.call(H, y),
    R.p = '/',
    (( () => {
        var H = {
            0x32: 1
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
                H[Q.pop()] = 1;
            d(P);
        }
        ;
    }
    )()),
    E = R.x,
    R.x = () => Promise.all([0x229, 0x12d, 0x198, 0xf4].map(R.e, R)).then(E),
    R.x();
}
)());
