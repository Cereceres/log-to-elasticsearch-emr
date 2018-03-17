
const assert = require('assert');
const getData = require('../lib/get-data');

describe('test to get data', () => {
    it('should pass the correct params', () => {
        const data = getData([ {
            eventTime: new Date('2018.01.06').toISOString(),
            otherKey:'otherValue'
        } ]);
        assert.deepStrictEqual(data[0], {
            index: {
                _index: 'emr-2018.01.06',
                _type: 'emr-logs'
            }
        });
        assert.deepStrictEqual(data[1], {
            eventTime: '2018-01-06T06:00:00.000Z',
            otherKey: 'otherValue'
        });
    });
});
