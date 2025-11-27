const fs = require("fs");



// sync program 
// all request and response here are line by line 
// we should never use this type of synchoronous programming 

console.log("1");

let result = fs.readFileSync("./test.txt", "utf-8");
console.log(result);

console.log("2");