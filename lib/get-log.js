const s3 = require('./s3-client');
const gunzip = require('./gunzip');
const parseFile = require('./parse-file');


module.exports = function *({ Records }) {
    console.log('Records ', Records);
    const logs = [];
    for (let i = 0; i < Records.length; i++) {
        const { s3:{ object:{ key:Key }, bucket:{ name:Bucket } } } = Records[i];
        console.log('Key ', Key);
        console.log('Bucket ', Bucket);
        const [ , cluster, , instance ] = Key.split('/');
        console.log('cluster ', cluster);
        console.log('instance ', instance);
        const params = { Bucket, Key };
        const { Body, error } = yield s3.getObject(params).promise();
        const data = yield gunzip(Body);
        if (error) throw error;
        const fileParsed = parseFile(data.toString(), cluster, instance);
        logs.push(...fileParsed);
    }
    console.log('logs in getLogs : ', logs.length);
    return yield Promise.resolve(logs);
};
