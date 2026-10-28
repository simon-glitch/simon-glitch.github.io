function discrete(x, splits){
    let idx = 0;
    for(const split of splits){
        if(x >= split) idx++;
        else break;
    }
    return idx;
}

window.discrete = discrete;
window.discrete_T  = [-0.45, -0.15, 0.2, 0.55];
window.discrete_H  = [-0.35, -0.1, 0.1, 0.3];
window.discrete_C  = [-1.05, -0.455, -0.19, -0.11, 0.03, 0.3];
window.discrete_E  = [-0.78, -0.375, -0.2225, 0.05, 0.45, 0.55];
window.discrete_PV = [-0.85, -0.2, 0.2, 0.7];
window.discrete_D  = [0.2, 0.9, 1.1];
/** The W values that trigger changes in the discrete PV value. I am being a bit pedantic with the decimals. */
window.discrete_W = [-0.5666666666666666518636930049979127943515777587890625, -0.4, -2.666666666666666518636930049979127943515777587890625, -0.05, 0.05, 2.666666666666666518636930049979127943515777587890625, 0.4, 0.5666666666666666518636930049979127943515777587890625];
