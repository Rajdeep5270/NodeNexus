const express = require("express");

const app = express();

const PORT = 8080;

app.set("view engine", "ejs");
app.use('/css', express.static(__dirname + '/css'));

app.get("/", (req, res) => {
    res.render("login");
})

app.listen(PORT, (e) => {
    if (e) {
        console.log("Server is not started...", e);
        return;
    }

    console.log("Server is Started...");
})