const dayjs = require('dayjs');

module.exports = (timestamp) => {
    console.log("date from dayjs: " + timestamp)
    return `${dayjs(timestamp).format('MM/DD/YYYY')}`;
}
