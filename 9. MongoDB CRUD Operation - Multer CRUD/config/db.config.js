const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/Book_Management";

mongoose.connect(URI)
    .then(() => {
        console.log("Database is Connected...");
    })
    .catch(e => {
        console.log("Database is not Connected...", e);
    });