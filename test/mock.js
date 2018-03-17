const nock = require('nock');
const data = require('fs').readFileSync(`${__dirname }/hadoop-hdfs-datanode-ip-10-132-16-122.log.2017-12-12-17.gz`).toString();

module.exports = () => {
    nock('https://testing-emr-logs-lambda.s3.amazonaws.com:443', { encodedQueryParams:true })
        .get('/logs/j-39HWSXX78MOMV/node/i-0027b209667db87f6/applications/hadoop-hdfs/hadoop-hdfs-datanode-ip-10-132-16-122.log.2017-12-12-17.gz')
        .reply(200, data, [ 'x-amz-request-id',
            '784A56344FA787FD',
            'x-amz-id-2',
            'XNeWypZzHy3p/CDFLD3n8qIwm7lK2u/rWPsVKMvujCpI1MbZn45j3SnKBN4qkAhPKow1pZq82y8=',
            'Content-Type',
            'application/xml',
            'Transfer-Encoding',
            'chunked',
            'Date',
            'Wed, 20 Dec 2017 19:03:06 GMT',
            'Server',
            'AmazonS3' ]);
};
