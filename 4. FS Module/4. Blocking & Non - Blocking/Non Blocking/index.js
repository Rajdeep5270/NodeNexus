const fs = require("fs");

// Asynchronous Programing / Non - Blocking Programing 

// in thsi the request i have first send but it will print at last 

// becoz in async if any request uses less time to respond it will go first randomly so our server will fast 

fs.readFile("../Sync Program/test.txt", "utf-8", (err, data) => {
    if (err)
        console.log(err);
    else
        console.log(data);
})

console.log("1");

console.log("2");