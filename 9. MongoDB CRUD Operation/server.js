const express = require('express');
require('./config/db.config')

const PORT = 8080;

const app = express();

app.get("/", (req, res) => {
    res.send("Server is on...");
})

app.listen(PORT, (e) => {
    if (e)
        console.log("Server is not started...", e);

    console.log("Server is started...");
})