const co = require('co-tchar');
const bulk = require('./lib/bulk');
const getData = require('./lib/get-data');
const getLogs = require('./lib/get-log');

exports.handler = (event, ctx, cb) => co(function *() {
    const logs = yield getLogs(event);

    if (logs.error || !logs.length) return yield Promise.resolve('There is not logs');

    const body = getData(logs);

    if (body.error) return yield Promise.resolve('There is not data to push');

    const res = yield bulk(body);


    if (res.error) return yield Promise.resolve(res.error);
})
    .then((res) => {
        console.log('lambda finish : ', res);
        cb(null, res);
    })
    .catch((error) => {
        console.log('error in lambda : ', error);
        cb(error);
    });
