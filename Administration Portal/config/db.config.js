const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/Administration-Portal";

mongoose.connect(URI).then(() => {
    console.log("DB is connected...");
}).catch(e => {
    console.log("DB is not connected...");
});