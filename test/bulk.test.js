const assert = require('assert');
const proxyquire = require('proxyquire');
const body = {};
const stub = {
    './client': {
        bulk: ({ body:_body, _source, refresh }) => {
            assert(_source);
            assert(refresh);
            assert.deepStrictEqual(body, _body);
        }
    }
};

const bulk = proxyquire('../lib/bulk', stub);

describe('test to bulk', () => {
    it('should pass the correct params', () => {
        bulk(body);
    });
});

