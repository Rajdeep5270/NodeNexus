const express = require('express');
require('./config/db.config');
const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", require('./router/index'));
app.use(express.static(__dirname));

// server logic 
app.listen(PORT, e => {
    if (e) {
        console.log("Server is not started...");
    }

    console.log("Server is started...");
})    