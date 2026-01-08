const express = require('express');

const app = express();

const PORT = 8080;
app.set('view engine', 'ejs');
app.use('/', require('./routes/route'));


// server started 
app.listen(PORT, e => {
    if (e) {
        console.log("Server is not started...");
        console.log("Error : ", e)
        return;
    }

    console.log("Server is started...");
})