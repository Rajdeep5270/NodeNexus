const fs = require("fs");

// sync write file 
fs.writeFileSync('./writeSync.txt', "This is a file make using write sync.");

// this text will override the older one 
fs.writeFileSync('./writeSync.txt', "This text will override the older one.")

// async write files 
// in async we have to make call back function in every async module 
fs.writeFile("./writeAsync.txt", "This is a file make using write async.", (err) => {
    if (err) {
        console.log('This is an error');
        console.log(err);
    }
})

// async write file will override the older text 
fs.writeFile("./writeAsync.txt", "This text will override the async text.", (err) => {
    if (err) {
        console.log(err);
    }
})

// by mistakely a file created name writeAsync so i deleted using this module function
fs.unlinkSync("./writeAsync");