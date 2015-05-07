var points = [ { lat: 31.31797135661357, lng: 62.52920529205292 },
  { lat: 33.31797135661357, lng: 62.52920529205292 },
  { lat: 35.31797135661357, lng: 62.52920529205292 },
  { lat: 31.31797135661357, lng: 64.52920529205292 },
  { lat: 33.31797135661357, lng: 64.52920529205292 },
  { lat: 35.31797135661357, lng: 64.52920529205292 },
  { lat: 31.31797135661357, lng: 66.52920529205292 },
  { lat: 33.31797135661357, lng: 66.52920529205292 },
  { lat: 35.31797135661357, lng: 66.52920529205292 },
  { lat: 37.31797135661357, lng: 66.52920529205292 },
  { lat: 33.31797135661357, lng: 68.52920529205292 },
  { lat: 35.31797135661357, lng: 68.52920529205292 },
  { lat: 35.31797135661357, lng: 70.52920529205292 },
  { lat: 37.31797135661357, lng: 70.52920529205292 },
  { lat: 37.31797135661357, lng: 74.52920529205292 } ]

points.forEach(function(d){

d.projection = projection([d.lng, d.lat])

})

svg.selectAll('circles').data(points).enter().append('circle')
.attr("cx", function(d) { return d.projection[0]; })
		.attr("cy", function(d) { return d.projection[1]; })
        .attr('fill', 'red')
		.attr('r',2);
