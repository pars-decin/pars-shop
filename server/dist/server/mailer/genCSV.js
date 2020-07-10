"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function genCSV(input, filename) {
    // create header for csv file from keys
    var content = Object.keys(input[0]).join(';') + '\n';
    input.forEach(function (item) {
        content += Object.values(item).join(';') + '\n';
    });
    return {
        filename: filename,
        content: content,
        contentType: 'text/csv',
    };
}
exports.genCSV = genCSV;
