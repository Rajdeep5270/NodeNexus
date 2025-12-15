require('./config/db.config')
const express = require('express');

const PORT = 8080;
const app = express();

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    return res.render("home");
});

app.listen(PORT, e => {
    if (e)
        console.log("Server is not started...", e);

    console.log("Server is started...");
});