var fs = require('fs')
var topojson = require('topojson')
var _ = require('lodash')
var countries = []
var landPoints = []
var inside = require('point-in-polygon');

fs.readFile('world-original.json', processData);

function processData(err, data){

    var topo = JSON.parse(data)

    features = topojson.feature(topo, topo.objects.countries)

    processFeatures(features);

    countries.forEach(countryPoints);

    fs.writeFile("map/points.json", JSON.stringify(landPoints), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
}

function countryPoints(points) {

    var top = null, bottom = null, left = null, right = null;

    var lats = _.map(points, function(p){return p[0]})
    var lngs = _.map(points, function(p){return p[1]})

    top = _.max(lats)
    bottom = _.min(lats)

    right = _.max(lngs)
    left = _.min(lngs)


    for (var a = bottom; a <= top; a =a+ 2) {

        for (var b = left; b <= right; b = b+ 2) {

            if (inside([ a, b ], points)) {
                landPoints.push({
                    lat:b,
                    lng:a
                });
            }
        }
    }


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
