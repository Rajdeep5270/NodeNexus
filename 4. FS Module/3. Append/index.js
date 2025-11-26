const fs = require("fs");

// append file sync 
fs.appendFileSync("./appendSync.txt", "\n" + new Date().toLocaleString() + "\n");

// append file sync another but this will not override the older text 
fs.appendFileSync("./appendSync.txt", "\nIn this append file sync function this will not override new text like write.\n")

// append file async 
fs.appendFile("./appendAsync.txt", new Date().toLocaleString() + "\n", (err) => {
    if (err)
        console.log(err);
});