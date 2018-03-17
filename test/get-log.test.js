const assert = require('assert');
const co = require('co-tchar');
const fs = require('fs');
const zlib = require('zlib');
const proxyquire = require('proxyquire');
const path = require('path');
const filePath = path.resolve(__dirname, './hadoop-hdfs-datanode-ip-10-132-16-122.log.2017-12-12-17.gz');
console.log('filePath ', filePath);
const body = zlib.gzipSync(fs.readFileSync(filePath).toString());
const stub = {
    './s3-client': {
        getObject: ({ Bucket, Key }) => {
            assert(Bucket === 'Bucket');
            assert(Key === '/cluster//instance/Key');
            return { promise:() => Promise.resolve({ Body:body }) };
        }
    },
    './parse-file':(_body, cluster, instance) => {
        assert(cluster);
        assert(instance);
        assert(_body, body.toString());
        return [];
    }
};

const getLog = proxyquire('../lib/get-log.js', stub);

describe('test to get data', () => {
    it('should pass the correct params', () => co(getLog({
        Records:[
            {
                s3:{
                    object:{
                        key:'/cluster//instance/Key'
                    },
                    bucket:{
                        name:'Bucket'
                    }
                }
            }
        ]
    })));
});
