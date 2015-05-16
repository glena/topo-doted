var fs = require('fs')
var d3 = require('d3')
var topojson = require('topojson')
var _ = require('lodash')
var countries = []
var landPoints = []
var inside = require('point-in-polygon');
var gridSize = 5;

var height = 1000, width = 1000;

var projection = d3.geo.mercator()
    .scale(135 * height / 847)
    .translate([width / 2, height / 2]);

fs.readFile('russia.json', processData);

function processData(err, data){

    var topo = JSON.parse(data);

    features = topojson.feature(topo, topo.objects.countries);

    processFeatures(features);

    countries.forEach(countryPoints);  

    fs.writeFile("map/points.json", JSON.stringify(landPoints), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

function getLat(point){
    
}
function getLng(point){
    
}

function countryPoints(geoPoints) {

    var top = null, bottom = null, left = null, right = null;

    geoPoints = _.filter(geoPoints, function(p){
        return (Math.abs(p[0]) != 180) //we need to avoid edge cases
    })

    console.log(geoPoints)

    var points = _.map(geoPoints, function(p){
        return projection(p) 
    });

    var lats = _.map(points, function(p){return p[0]});
    var lngs = _.map(points, function(p){return p[1]});

    top = Math.ceil(_.max(lats));
    bottom = Math.floor(_.min(lats));

    right = Math.ceil(_.max(lngs));
    left = Math.floor(_.min(lngs));

    top = top + (top % gridSize)
    bottom = bottom - (bottom % gridSize)

    right = right + (right % gridSize)
    left = left - (left % gridSize)


    for (var a = bottom; a <= top; a =a + gridSize) {

        for (var b = left; b <= right; b = b + gridSize) {

            if (inside([ a, b ], points)) {
                landPoints.push({
                    lat:b,
                    lng:a
                });
            }
        }
    }

    // points.forEach(function(p){
    //     landPoints.push({
    //                 lat:p[1],
    //                 lng:p[0]
    //             });
    // })

    // if (inside([ 650,254.5023430763393 ], points)) {
    //     console.log('si');
    // }
    // else
    // {
    //     console.log('no')
    // }


}

function processFeatures(features) {

    features.features.forEach(function(feature){

        switch(feature.geometry.type) {

            case "Polygon": processPolygon(feature.geometry.coordinates); break;
            case "MultiPolygon": processMultiPolygon(feature.geometry.coordinates); break;

        }

    });

}

function processMultiPolygon(coordinates) {

    coordinates.forEach(function(coordinate){
        processPolygon(coordinate);
    });

}

function processPolygon(coordinates) {

    var country = []

    coordinates.forEach(function(coordinate){

        coordinate.forEach(function(collection){

            country.push(collection)

        });

    });

    countries.push(country)
}
