const express = require("express");
const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
    res.send("Server is live...");
})

app.listen(PORT, (e) => {
    if (e)
        return console.log("Server is not started...");

    console.log("Server is Started...");
})