const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Admin = require('../models/admin.model');

// local strategy 
passport.use("authentication", new localStrategy({
    usernameField: "email",
}, async (email, password, done) => {
    console.log("Email : ", email);
    console.log("Password : ", password);
    const admin = await Admin.findOne({ email });

    if (!email) {
        console.log("Admin not found...");
        return done(null, false);
    }

    console.log("Admin original password : ", admin.password);
    if (password !== admin.password) {
        console.log("Password not matched...");
        return done(null, false);
    }

    return done(null, admin);
}));

passport.serializeUser((admin, done) => {
    return done(null, admin.id);
});

passport.deserializeUser(async (adminId, done) => {
    const currentAdmin = await Admin.findById(adminId);

    return done(null, currentAdmin);
});

passport.checkAuthIsDone = (req, res, next) => {
    console.log("Is Authenticated : ", req.isAuthenticated());

    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/');
}

passport.checkAuthIsNotDone = (req, res, next) => {
    console.log("Is Authenticated : ", req.isAuthenticated());

    if (!req.isAuthenticated) {
        return res.next();
    }

    return res.redirect('/dashboardPage');
}