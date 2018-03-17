const AWS = require('aws-sdk');
const ES = require('elasticsearch');
const connectionClass = require('http-aws-es');

const hosts = (process.env.ES_ENDPOINT || '').split(',');
const awsConfig = new AWS.Config({ region: process.env.REGION || 'us-east-1' });
if (!hosts || !hosts.length) throw new Error('host are required');

module.exports = ES.Client({
    hosts,
    connectionClass,
    awsConfig
});
