const zlib = require('zlib');

module.exports = (data) => new Promise((resolve, reject) => {
    zlib.gunzip(data, (err, res) => {
        if (err) return reject(err);
        resolve(res);
    });
});
