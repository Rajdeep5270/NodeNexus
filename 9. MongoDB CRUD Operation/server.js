const express = require('express');
const bookModel = require('./model/book.model');
require('mongoose');
require('./config/db.config')

const PORT = 8080;

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded());

// ("/") page route 
app.get("/", (req, res) => {
    bookModel.find()
        .then((allBooks) => {
            if (allBooks.length == 0) {
                return res.render("form");
            }
            res.render("view", { allBooks });
        })
        .catch(e => {
            console.log(e);
        });
})

// form page route 
app.get("/addBookPage", (req, res) => {
    res.render("form");
})

// add book logic and route to ("/")
app.post("/addBook", (req, res) => {

    bookModel.create(req.body).then(() => {
        console.log("Data added successfully...");
    }).catch((e) => {
        console.log("Data not added...", e);
    });

    res.redirect("/");
});

// to edit and fill edit form logic 
app.get("/editBook/:id", async (req, res) => {

    // this is a long process 

    // bookModel.find()
    //     .then((allBooks) => {
    //         console.log("Books fetched...");
    //         // console.log(allBooks);
    //         const findBook = allBooks.find(book => req.params.id == book.id);
    //         // console.log(findBook);

    //         res.render("edit", { findBook });
    //     })
    //     .catch(e => {
    //         console.log("Books not fetched...");
    //     });

    // this is short and easy way using mongoose built-it methods findById is a built in method

    const findBook = await bookModel.findById(req.params.id);

    res.render("edit", { findBook });
});

// to update filled edit form 
app.post("/updateBook", async (req, res) => {
    // console.log(req.body.book_id);

    const updatedBook = await bookModel.findByIdAndUpdate(req.body.book_id, req.body, { new: true });

    // console.log(updatedBook);

    res.redirect("/");
});

// delete book logic and route to("/")
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

// listen to port number 8080 
app.listen(PORT, (e) => {
    if (e)
        console.log("Server is not started...", e);

    console.log("Server is started...");
})