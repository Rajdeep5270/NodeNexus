const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    book_name: {
        type: String,
        required: true,
    },
    book_author: {
        type: String,
        required: true,
    },
    book_price: {
        type: String,
        required: true,
    },
    book_lang: {
        type: String,
        required: true,
    },
    book_image: {
        type: String,
        required: true,
    }
});

const bookModel = mongoose.model("Book", bookSchema, "Books")

module.exports = bookModel;