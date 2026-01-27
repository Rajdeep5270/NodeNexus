const passport = require('passport');
const { Strategy } = require('passport-local');

const admin = require('../models/admin.model');

passport.use(new Strategy({
    usernameField: "email",
    async function(email, password, done) {
        const Admin = await admin.findOne({ email });

        if (!Admin) {
            done(null, false);
        }

        return done(null, Admin);
    }
}));

// passport.serializeUser(())