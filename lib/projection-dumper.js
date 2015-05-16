module.exports = function (config) {
    
    var fs = require('fs');

    var fileData = '';

    fileData += 'function topoDotedProjection(point) {\n';
    fileData += '    var projection = d3.geo.'+ config.projection +'()\n';
    fileData += '        .scale(135 * '+ config.height +' / 847)\n';
	fileData += '        .translate(['+ config.width +' / 2, '+ config.height +' / 2])\n';
	fileData += '    var cp = projection(point);\n';
	fileData += '    cp[0] = cp[0] - (cp[0] % '+ config.gridSize +');\n';
	fileData += '    cp[1] = cp[1] - (cp[1] % '+ config.gridSize +');\n';
	fileData += '    return cp;\n';
	fileData += '}';

	fs.writeFile("topo-doted-projection.js", fileData, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The projection was saved! - topo-doted-projection.js");
    });

};
