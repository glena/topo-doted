
var width = 1000
, height = 1000
, data;

var svgEl = d3.select(".map svg");
var svg = svgEl.append('g');


var projection = d3.geo.mercator()
    .scale(135 * height / 847)
    .translate([width / 2, height / 2]);

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

            d.projection = [d.lng, d.lat];

        })

        svg.selectAll('circles').data(points).enter().append('circle')
        .attr("cx", function(d) { return d.projection[0]; })
        		.attr("cy", function(d) { return d.projection[1]; })
                .attr('fill', 'red')
        		.attr('r',2);
    });
}

loadPoints();

function highLightCities() {
    var cities = [
        [-58.381592,-34.603722], //Buenos Aires
        [-73.935242,40.730610], //New York
        [-3.707398,40.415363], //Madrid
        [-0.140634,51.501476], //Londres
        [151.209900,-33.865143], //Sydney
        [37.620407,55.754093] //Moscow
    ];

    cities.forEach(function(c){ c.projection = topoDotedProjection(c) });

    svg.selectAll('circles').data(cities).enter().append('circle')
        .attr("cx", function(d) { return d.projection[0]; })
                .attr("cy", function(d) { return d.projection[1]; })
                .attr('fill', 'blue')
                .attr('r',2);
    
}

setTimeout(highLightCities,2000);