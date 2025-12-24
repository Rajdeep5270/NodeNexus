const express = require('express');
const bookModel = require('./model/book.model');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('mongoose');
require('./config/db.config')

const PORT = 8080;

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


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

// multer 
const storage = multer.diskStorage({
    destination: ((req, file, cb) => {
        cb(null, 'uploads/');
    }),
    filename: ((req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    })
});

const upload = multer({ storage });

// add book logic and route to ("/")
app.post("/addBook", upload.single('book_image'), (req, res) => {

    // console.log(req.body);
    // console.log(req.file);

    req.body.book_image = req.file.path;

    bookModel.create(req.body).then(() => {
        console.log("Data added successfully...");
        res.redirect("/");
    }).catch((e) => {
        console.log("Data not added...", e);
    });

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
app.post("/updateBook", upload.single('book_image'), async (req, res) => {
    // console.log(req.file);
    // console.log(req.body);

    if (req.file) {
        // old book find logic 
        const bookData = await bookModel.findById(req.body.book_id);

        // old book remove logic 
        fs.unlink(bookData.book_image, e => { })

        req.body.book_image = req.file.path;

        const updatedBook = await bookModel.findByIdAndUpdate(req.body.book_id, req.body, { new: true });

        console.log(`Updated Data : ${updatedBook}`);
    }
    else {
        const updatedBook = await bookModel.findByIdAndUpdate(req.body.book_id, req.body, { new: true });

        console.log(`Updated Data : ${updatedBook}`);
    }


    // for debugging 
    // console.log(updatedBook);

    res.redirect("/");
});

// delete book logic and route to("/")
app.get("/deleteBook", (req, res) => {
    console.log(req.query);

    // data delete logic 
    bookModel.findByIdAndDelete(req.query.bookId)
        .then(() => {
            console.log("Book deleted successfully...");
        })
        .catch(e => {
            console.log("Book not deleted", e);
        })

    // data image delete logic from upload folder 
    bookModel.findById(req.query.bookId)
        .then(book => {
            const bookPath = book.book_image;
            fs.unlink(bookPath, e => { });
            console.log("Book image deleted successfully...");
        })
        .catch(e => {
            console.log(e);
        })

    res.redirect("/");
});

// listen to port number 8080 
app.listen(PORT, (e) => {
    if (e)
        console.log("Server is not started...", e);

    console.log("Server is started...");
})