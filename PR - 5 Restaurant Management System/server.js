const express = require('express');

const PORT = 8080;

const app = express();

// view engine set to ejs to view design of website
app.set("view engine", "ejs");

// route for main dashboard
app.use('/', require('./routes/item.route'));
app.use(express.static(__dirname));

app.listen(PORT, e => {
    if (e) {
        console.log("Server is not started...");
        return;
    }

    console.log("Server is started...");
}); 