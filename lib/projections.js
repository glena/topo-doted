module.exports = function (projection) {
    
    var d3 = require('d3');

    var projection = d3.geo[projection];

    if (typeof(projection) == 'function') {
        return projection();
    }

    throw "Invalid projection.";

};
