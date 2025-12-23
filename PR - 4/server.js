const express = require("express");
const PORT = 8080;

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname));

// rendered view page for first time website load 
app.get("/", (req, res) => {
    res.render("view");
})

// to start server 
app.listen(PORT, e => {
    if (e)
        console.log("Server is not started...");

    console.log("Server is started...");
})