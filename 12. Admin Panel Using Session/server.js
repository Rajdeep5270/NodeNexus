const express = require('express');
require('./config/db.config');

const cookieparser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

require('./middleware/passport.local.middleware');

const app = express();

const PORT = 8080;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname));

app.use(cookieparser());

// set up session 
app.use(session({
    name: "AdminSession",
    secret: "AdminPanel12@22",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

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