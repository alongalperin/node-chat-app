const moment = require('moment');

// let date = moment();


var createdAt = 1234;
var date = moment(createdAt);

console.log(date.format('kk:mm YYYY'));