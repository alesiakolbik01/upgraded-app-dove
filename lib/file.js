const fs = require('fs');
const UPLOAD_FOLDER = 'uploads/';

exports.toBase64 = function(filename) {
    const fullPath = `${UPLOAD_FOLDER}${filename}`;
    const bitmap = fs.readFileSync(fullPath);
    const base64 = new Buffer(bitmap).toString('base64');

    return `data:image/jpeg;base64, ${base64}`;
};