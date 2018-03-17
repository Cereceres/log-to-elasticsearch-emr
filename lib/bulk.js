const client = require('./client');


module.exports = (body) => client.bulk({
    body,
    _source:true,
    refresh:'wait_for'
});
