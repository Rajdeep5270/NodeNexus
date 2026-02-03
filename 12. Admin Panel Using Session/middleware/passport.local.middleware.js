const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Admin = require('../models/admin.model');

passport.use('localAuth', new localStrategy({
    usernameField: "email",
}, async (email, password, done) => {
    const admin = await Admin.findOne({ email });

    if (!admin) {
        console.log("Admin does not exist...");
        return done(null, false);
    }

    if (password !== admin.password) {
        console.log("Password does not matched...");
        return done(null, false);
    }

    console.log("Admin login successfully...");
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
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/');
};

passport.checkAuthIsNotDone = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/dashboardPage');
}

passport.currentAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.findAdmin = req.user;
    }

    return next();
}