function discrete(x, splits){
    let idx = 0;
    for(const split of splits){
        if(x >= split) idx++;
        else break;
    }
    return idx;
}

function range_check([x, min, max]){
    if(isNaN(min)) min = 0;
    if(isNaN(max)) max = min;
    return x >= min && x <= max;
}
function range_checks(rcs){
    for(const rc of rcs){
        if(!range_check(rc)) return false;
    }
    return true;
}

function biome(T, H, C, E, W, D){
    // peaks and valleys
    const PV = 1 - Math.abs(3*Math.abs(W) - 2)
    const dT = discrete(T, [-0.45, -0.15, 0.2, 0.55]);
    const dH = discrete(H, [-0.35, -0.1, 0.1, 0.3]);
    // Mushroom Fields, Deep ocean, Ocean, Coast, Near-inland, Mid-inland, Far-inland
    const dC = discrete(C, [-1.05, -0.455, -0.19, -0.11, 0.03, 0.3]);
    const dE = discrete(E, [-0.78, -0.375, -0.2225, 0.05, 0.45, 0.55]);
    const dPV = discrete(PV, [-0.85, -0.2, 0.2, 0.7]);
    // Surface biomes, Cave biomes, Surface biomes, Deep Dark
    const dD = discrete(D, [0.2, 0.9, 1.1]);
    
    // cave biomes
    if(dD === 1){
        if(range_checks([C, 0.8, 1.0])) return "Dripstone Caves";
        if(range_checks([H, 0.7, 1.0])) return "Lush Caves";
        if(range_checks([W, -1.1, -0.85], [C, -0.19, 0.55], [E, 0.45, 1])) return "Sulfur Caves";
        if(range_checks([T, -1.0, -0.8], [C, -1.05, -0.19], [H, -1.0, 0.7], [W, 0.5, 1.1])) return "Ice Caves";
    }
    if(dD === 3){
        if(range_checks([E, -1.0, -0.375])) return "Deep Dark";
    }
    
    // oceans
    if(dC === 0) return "Mushroom Fields";
    if(dC === 1) return ["Frozen Ocean", "Cold Ocean", "Ocean", "Lukewarm Ocean", "Warm Ocean"][dT];
    if(dC === 2) return ["Deep Frozen Ocean", "Deep Cold Ocean", "Deep Ocean", "Deep Lukewarm Ocean", "Warm Ocean"][dT];
    /*
0 other
1 Middle biomes
2 Middle/Badland biomes
3 Plateau biomes
4 Beach biomes
5 Middle/Beach biomes
6 Shattered biomes
This is based on me just looking at the items in the table on the wiki that don't have specific biomes.
0022
0200
0000
1000
0000
0022
0200
0000
1000
0000
0000
0122
0123
1133
1133
0000
4122
1122
1123
1123
0000
4111
5111
1111
1111
0000
0011
0066
0066
0066
0000
4400
5500
1111
1111
    */
    const quick_inland = "00220200000010000000002202000000100000000000012201231133113300004122112211231123000041115111111111110000001100660066006600004400550011111111"[E*20 + PV*4 + (C-3)];
    let inland = "";
    if(quick_inland === "1") inland = "Middle biomes";
    if(quick_inland === "2") inland = T === 4 ? "Badland biomes" : "Middle biomes";
    if(quick_inland === "3") inland = "Plateau biomes";
    if(quick_inland === "4") inland = "Beach biomes";
    if(quick_inland === "5") inland = W < 0 ? "Beach biomes" : "Middle biomes";
    if(quick_inland === "6") inland = "Shattered biomes";
    if(inland === ""){
    if(E === 0)
        if(PV === 0) inland = T === 0 ? "Frozen River" : "River";
        else if(PV < 3 && C === 3) inland = "Stony Shore";
        else if(PV === 1) inland = T === 4 ? "Badland biomes" : T > 0 ? "Middle biomes" : H < 2 ? "Snowy Slopes" : "Grove";
        else if(PV === 2 || PV === 3 && C === 4) inland = T > 2 ? "Plateau biomes" : H < 2 ? "Snowy Slopes" : "Grove";
        else inland = T === 4 ? "Badland biomes" : T === 3 ? "Stony Peaks" : W < 0 ? "Jagged Peaks" : "Frozen Peaks";
    }
    if(E === 1){
        
    }
}
