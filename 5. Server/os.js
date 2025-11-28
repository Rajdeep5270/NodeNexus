const os = require("os");

let len = os.cpus().length;

console.log(`Your cpu has ${len} workers.`);