module.exports = function () {
    var program = require('commander');

    program
        .version('1.0.0')
        .usage('[options] <topojson file>')
        .option('-H, --height <height>', 'Set the graph height in pixels (default 500)', function(a){return parseInt(a);}, 500)
        .option('-W, --width <width>', 'Set the graph width in pixels (default 500)', function(a){return parseInt(a);}, 500)
        .option('-G, --grid-size <gridSize>', 'Set the grid size in pixels (default 5)', function(a){return parseInt(a);}, 5)
        .option('-P, --projection <projection>', 'Is the projection used to map geo points to catersian points. Check D3 docs for the full list.', 'mercator')
        .option('-O, --output-directory <outputDirectory>', 'Directory where it will write the files.', '.')
        .option('-N, --nocode', 'Avoid generating the projection code', false)
        .parse(process.argv);

    return {
        height: program.height,
        width: program.width,
        gridSize: program.gridSize,
        filename: program.args[0],
        projection: program.projection,
        outputDirectory: program.outputDirectory,
        noProjection: program.nocode
    };
};
