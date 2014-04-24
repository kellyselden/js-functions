function merge(x, y){
    var z = {};
    for (var p in x) { z[p] = x[p]; }
    for (var p in y) { z[p] = y[p]; }
    return z;
}