const express = require('express');
require('./config/db.config');

const app = express();

const PORT = 8080;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname));

// routes required here 
app.use('/', require('./routes/admin.route'))

// server created 
app.listen(PORT, e => {
    if (e) {
        console.log("Server is not started...", e);
        return;
    }

    console.log("Server is started...");
});  