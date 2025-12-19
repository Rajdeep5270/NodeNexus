const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/movie-management";

mongoose.connect(URI)
    .then(() => {
        console.log("Database Connected Successfully...");
    })
    .catch(e => {
        console.log("Database not Connected...");
    });