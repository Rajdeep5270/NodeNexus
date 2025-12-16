const express = require('express');
const { default: mongoose } = require('mongoose');
const bookModel = require('./model/book.model');
require('./config/db.config')
require('./model/book.model');

const PORT = 8080;

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.render("form"); 
})

app.post("/addBook", (req, res) => {

    bookModel.create(req.body).then(() => {
        console.log("Data added successfully...");
    }).catch((e) => {
        console.log("Data not added...", e);
    });

    res.redirect("/");
});

app.listen(PORT, (e) => {
    if (e)
        console.log("Server is not started...", e);

    console.log("Server is started...");
})