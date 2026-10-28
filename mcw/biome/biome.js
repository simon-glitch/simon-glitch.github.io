
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
    // 0-4
    const dT = discrete(T, discrete_T);
    // 0-4
    const dH = discrete(H, discrete_H);
    // 0-6; Mushroom Fields, Deep ocean, Ocean, Coast, Near-inland, Mid-inland, Far-inland
    const dC = discrete(C, discrete_C);
    // 0-6
    const dE = discrete(E, discrete_E);
    // 0-4
    const dPV = discrete(PV, discrete_PV);
    // 0-3; Surface biomes, Cave biomes, Surface biomes, Deep Dark
    const dD = discrete(D, discrete_D);
    
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
    const quick_inland = "00220200000010000000002202000000100000000000012201231133113300004122112211231123000041115111111111110000001100660066006600004400550011111111"[E*20 + PV*4 + (dC-3)];
    let inland = "";
    if(quick_inland === "1") inland = "Middle biomes";
    if(quick_inland === "2") inland = dT === 4 ? "Badland biomes" : "Middle biomes";
    if(quick_inland === "3") inland = "Plateau biomes";
    if(quick_inland === "4") inland = "Beach biomes";
    if(quick_inland === "5") inland = W < 0 ? "Beach biomes" : "Middle biomes";
    if(quick_inland === "6") inland = "Shattered biomes";
    if(inland === ""){
    const river = dT === 0 ? "Frozen River" : "River";
    const slopes = dH < 2 ? "Snowy Slopes" : "Grove";
    const slopes2 = dT === 4 ? "Badland biomes" : dT > 0 ? "Middle biomes" : slopes;
    const slopes3 = dT >= 3 ? "Plateau biomes" : slopes;
    const peaks = dT === 4 ? "Badland biomes" : dT === 3 ? "Stony Peaks" : W < 0 ? "Jagged Peaks" : "Frozen Peaks";
    const savanna = W < 0 || dT < 2 || dH === 4 ? (dPV === 4 ? "Shattered biomes" : "Middle biomes") : "Windswept Savanna";
    inland = [
      [
        [river, river, "", ""],
        ["Stony Shore", "", slopes2, slopes2],
        ["Stony Shore", slopes3, slopes3, slopes3],
        ["", slopes3, peaks, peaks],
        [peaks, peaks, peaks, peaks],
      ],
      [
        [river, river, "", ""],
        ["Stony Shore", "", slopes2, slopes2],
        ["Stony Shore", slopes2, dT>0 ? "Plateau biomes" : slopes, dT>0 ? "Plateau biomes" : slopes],
        ["", slopes2, slopes3, slopes3],
        [slopes2, slopes2, peaks, peaks],
      ],
      [
        [river, river, river, river],
        ["Stony Shore", "", "", ""],
        ["Stony Shore", "", "", ""],
        [""],
        [""],
      ],
      [
        [river, river, river, river],
        [""],
        [""],
        [""],
        [""],
      ],
      [
        [river, river, river, river],
        [""],
        [""],
        [""],
        [""],
      ],
      [
        [river, river, river, river],
        [W<0 ? "Beach biomes" : savanna, savanna, "", ""],
        [W<0 ? "Beach biomes" : savanna, savanna, "", ""],
        [savanna, savanna, "", ""],
        [savanna, savanna, "", ""],
      ],
      [
        [river, dT === 0 ? "Frozen River" : dT < 3 ? "Swamp" : "Mangrove Swamp"],
        ["", dT === 0 ? "Middle biomes" : dT < 3 ? "Swamp" : "Mangrove Swamp"],
        ["", dT === 0 ? "Middle biomes" : dT < 3 ? "Swamp" : "Mangrove Swamp"],
        [""],
        [""],
      ],
    ][dE][dPV][dC-3] || inland;
    }
    if(inland === "Beach biomes") inland = ["Snowy Beach", "Beach", "Beach", "Beach", "Desert"][dT];
    if(inland === "Badland biomes") inland = [W<0 ? "Badlands" : "Eroded Badlands", W<0 ? "Badlands" : "Eroded Badlands", "Badlands", "Wooded Badlands", "Wooded Badlands"][dH];
    if(inland === "Middle biomes") inland = [
        [W<0 ? "Snowy Plains" : "Ice Spikes", W<0 ? "Plains" : "Dappled Forest", W<0 ? "Flower Forest" : "Sunflower Plains", "Savanna", "Desert"],
        ["Snowy Plains", "Plains", "Plains", "Savanna", "Desert"],
        [W<0 ? "Snowy Plains" : "Snowy Taiga", "Forest", "Forest", W<0 ? "Forest" : "Plains", "Desert"],
        ["Snowy Taiga", "Taiga", W<0 ? "Birch Forest" : "Old Growth Birch Forest", W<0 ? "Jungle" : "Sparse Jungle", "Desert"],
        ["Taiga", W<0 ? "Old Growth Spruce Taiga" : "Old Growth Pine Taiga", "Dark Forest", W<0 ? "Jungle" : "Bamboo Jungle", "Desert"],
    ][dH][dT];
    if(inland === "Plateau biomes") inland = [
        [W<0 ? "Snowy Plains" : "Ice Spikes", W<0 ? "Meadow" : "Cherry Grove", W<0 ? "Meadow" : "Cherry Grove", "Savanna Plateau", W<0 ? "Badlands" : "Eroded Badlands"],
        ["Snowy Plains", "Meadow", W<0 ? "Meadow" : "Cherry Grove", "Savanna Plateau", W<0 ? "Badlands" : "Eroded Badlands"],
        ["Snowy Plains", W<0 ? "Meadow" : "Forest", "Forest", "Badlands"],
        ["Snowy Taiga", W<0 ? "Taiga" : "Meadow", W<0 ? "Meadow" : "Birch Forest", "Forest", "Eroded Badlands"],
        ["Snowy Taiga", W<0 ? "Old Growth Spruce Taiga" : "Old Growth Pine Taiga", "Pale Garden", "Jungle", "Eroded Badlands"],
    ][dH][dT];
    if(inland === "Shattered biomes") inland = [
        ["Windswept Gravelly Hills", "Windswept Gravelly Hills", "Windswept Hills", "Savanna", "Desert"],
        ["Windswept Gravelly Hills", "Windswept Gravelly Hills", "Windswept Hills", "Savanna", "Desert"],
        ["Windswept Hills", "Windswept Hills", "Windswept Hills", W<0 ? "Forest" : "Plains", "Desert"],
        ["Windswept Forest", "Windswept Forest", "Windswept Forest", W<0 ? "Jungle" : "Sparse Jungle", "Desert"],
        ["Windswept Forest", "Windswept Forest", "Windswept Forest", W<0 ? "Jungle" : "Bamboo Jungle", "Desert"],
    ][dH][dT];
    
    return inland;
}
window.biome = biome;
