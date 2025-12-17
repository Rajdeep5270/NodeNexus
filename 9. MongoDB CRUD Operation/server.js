const express = require('express');
const bookModel = require('./model/book.model');
require('mongoose');
require('./config/db.config')

const PORT = 8080;

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", (req, res) => {
    bookModel.find()
        .then((allBooks) => {
            res.render("view", { allBooks });
        })
        .catch(e => {
            console.log(e);
        });
})

app.get("/addBookPage", (req, res) => {
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

app.get("/deleteBook", (req, res) => {
    bookModel.findByIdAndDelete(req.query.bookId)
        .then(() => {
            console.log("Book deleted successfully...");
        })
        .catch(e => {
            console.log("Book not deleted", e);
        })

    res.redirect("/");
});

app.listen(PORT, (e) => {
    if (e)
        console.log("Server is not started...", e);

    console.log("Server is started...");
})