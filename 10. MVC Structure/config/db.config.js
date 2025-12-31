const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/EMP-Management";

mongoose.connect(URI).then(() => {
    console.log("Database is connected...");
}).catch(e => {
    console.log("Database is not connected...");
});