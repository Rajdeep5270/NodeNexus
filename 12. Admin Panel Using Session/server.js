const express = require('express');
require('./config/db.config');

const cookieparser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

require('./middleware/passport.local.middleware');

const app = express();

const PORT = 8080;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname));

app.use(cookieparser());

app.use(session({
    name: "AdminSession",
    secret: "Admin2200@12",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.currentAdmin);

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