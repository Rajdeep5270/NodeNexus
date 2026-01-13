const express = require('express');
require('./config/db.config');

const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

// requiring route 
app.use('/', require('./routes/admin.route'));

app.listen(PORT, err => {
    if (err) {
        console.log("Server is not started...");
    }

    console.log("Server is started...");
})