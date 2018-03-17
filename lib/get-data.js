const _type = 'emr-logs';
const action = (_index) => ({ index:  { _index, _type } });

module.exports = (logs) => logs.reduce((init, doc) => {
    const timestamp = new Date(doc.eventTime || Date.now());
    const _index = [
        `emr-${ timestamp.getUTCFullYear()}`,
        `0${ timestamp.getUTCMonth() + 1}`.slice(-2),
        `0${ timestamp.getUTCDate()}`.slice(-2)
    ].join('.');
    init.push(action(_index), doc);
    return init;
}, []);
