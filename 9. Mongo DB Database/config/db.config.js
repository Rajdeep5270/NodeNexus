const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/try"

mongoose.connect(URI)
    .then(() => {
        console.log("Mongoose is connected...");
    })
    .catch(e => {
        console.log("Mongoose is not connected...", e);
    })
    .finally(() => {
        console.log("Finally...");

    });