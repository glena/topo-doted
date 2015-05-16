function topoDotedProjection(point) {
    var projection = d3.geo.mercator()
        .scale(135 * 1000 / 847)
        .translate([1000 / 2, 1000 / 2])
    var cp = projection(point);
    cp[0] = cp[0] - (cp[0] % 5);
    cp[1] = cp[1] - (cp[1] % 5);
    return cp;
}