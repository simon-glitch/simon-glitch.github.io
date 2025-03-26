
function size(x = 0n){
    let ss1 = 2n;
    let ss2 = 1n;
    let too_small = ss1 <= x;
    if(!too_small) return 0n;
    
    while(too_small){
        ss1 <<= ss2;
        ss2 <<= 1n;
        too_small = ss1 <= x;
    }
    
    let s = 0n;
    for(;
        ss2 > 0n;
        ss2 >>= 1n
    ){
        let y = x >> ss2;
        if(y > 0n){
            x = y;
            s += ss2;
        }
    }
    return s;
};

