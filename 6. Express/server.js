const express = require("express");
const fs = require("fs");
const app = express();

console.log("hello");
console.log("world");



app.get("/", (req, res) => {
    fs.readFile('index.html', (err, d) => {
        res.end(d);
    });
});

app.get("/about", (req, res) => {
    fs.readFile('about.html', (err, d) => {
        res.end(d);
    });
});

app.get("/contact", (req, res) => {
    fs.readFile('contact.html', (err, d) => {
        res.end(d);
    });
});

app.listen(8000, (e) => {
    if (e) {
        console.log("Server is not started...", e);
    }

    console.log("Server is started...");
});
