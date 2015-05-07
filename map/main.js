
var width = 500
, height = 500
, data;

var svgEl = d3.select(".map svg");
var svg = svgEl.append('g');


var projection = d3.geo.mercator()
    .scale(135 * height / 847)
    .translate([width / 2, height / 2]);
/*
var projection = d3.geo.equirectangular()
    .translate([width / 2, height / 2])
    .scale(135 * height / 847)
    .precision(.1);
*/
var path = d3.geo.path().projection(projection);

svgEl.attr("width", width).attr("height", height);

d3.json("world.json", function(error, world) {
	data = world;
	svg.append("path")
		.classed('world', true)
		.datum( topojson.feature(world, world.objects.countries) )
		.attr("d", path);

    loadPoints();
});

function loadPoints() {

    d3.json("points.json", function(error, points) {
        points.forEach(function(d){

        d.projection = projection([d.lng, d.lat])

        })

        svg.selectAll('circles').data(points).enter().append('circle')
        .attr("cx", function(d) { return d.projection[0]; })
        		.attr("cy", function(d) { return d.projection[1]; })
                .attr('fill', 'red')
        		.attr('r',2);
    });
}
