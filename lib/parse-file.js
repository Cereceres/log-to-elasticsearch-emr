const typeValidDefault = [ 'ALL', 'DEBUG', 'ERROR', 'FATAL', 'INFO', 'OFF', 'TRACE', 'TRACE_INT', 'WARN' ];
const _typeValid = process.env.EVENT_VALID || '';

const typeValid = new Set(_typeValid ? _typeValid.split(',') : typeValidDefault);
module.exports = (file, cluster, instance) => file.split('\n').map((line) => {
    if (!line) return line;
    const lineSplited = line.split(/ /g);
    const timestampString = (`${lineSplited[0]} ${lineSplited[1]}` || '').replace(/ /g, 'T').replace(/,/g, '.');
    const timestamp = new Date(timestampString);
    const type = lineSplited[2];
    const source = lineSplited[3];
    const message = lineSplited.slice(4).join('');
    if (!typeValid.has(type) || !type || !source || !message || !timestamp) return '';

    return {
        timestamp,
        type,
        source,
        message,
        cluster,
        instance
    };
})
    .filter((log) => log);
