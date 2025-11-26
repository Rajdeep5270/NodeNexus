const fs = require("fs");


// this is a async file reading 
fs.readFile("../3. Append/appendAsync.txt", "utf-8", (err, data) => {
    if (err)
        console.log(err);
    else
        console.log(`This is Async Read File \n ${data}`);
});

// this is a file reading using sync  
const data = fs.readFileSync("../3. Append/appendSync.txt", "utf-8");

console.log(`Read File Sync Data \n ${data}`);
