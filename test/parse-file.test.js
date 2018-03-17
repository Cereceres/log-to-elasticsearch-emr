const assert = require('assert');
const parseFile = require('../lib/parse-file');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, './hadoop-hdfs-datanode-ip-10-132-16-122.log.2017-12-12-17.gz')).toString();
describe('test to bulk', () => {
    it('should pass the correct params', () => {
        const parsed = parseFile(data, 'test', 'test');
        parsed.forEach((element) => {
            assert(element.timestamp);
            assert(element.type);
            assert(element.source);
            assert(element.message);
            assert(element.cluster === 'test');
            assert(element.instance === 'test');
        });
    });
});

