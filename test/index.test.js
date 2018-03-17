require('./load-env')();
const proxyquire = require('proxyquire');
const assert = require('assert');

const AwsTest = require('aws-lambda-testing');
const mock = require('./mock');
const logs = {};
const EVENT = {};
const data = {};
const stub = {
    './lib/bulk':(_data) => {
        assert.deepStrictEqual(data, _data);
        return Promise.resolve();
    },
    './lib/get-data':(_logs) => {
        assert.deepStrictEqual(_logs, logs);
        return data;
    },
    './lib/get-log':(_event) => {
        assert.deepStrictEqual(EVENT, _event);
        return Promise.resolve(logs);
    },
};
const { handler } = proxyquire('../index', stub);
const awsTest = new AwsTest();
awsTest.setHandler(handler);

describe('test to lambda', () => {
    it('should exec the lambda function', async() => {
        mock();
        await awsTest.exec(EVENT);
    });
});
