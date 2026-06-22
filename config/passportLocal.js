const passport = require('passport');
const passportStrategy = require('passport-local').Strategy;
const User = require('../models/admin');
const bcrypt = require('bcrypt');

passport.use(new passportStrategy(
    {
    'usernameField': 'email',
    },
    async (email, password, done) => {
        try {
            const curUser = User.findOne({email});

            if (!curUser)
                return done(null, false, {'message': 'This email is not registered with mongoDB.'});

            const pasMatch = await bcrypt.compare(password, curUser.password);
            if (!pasMatch)
                return done(null, false, {'message': 'Password is incorrect'});

            done(null, curUser)
        } catch (err) {
            done(err, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
})
passport.deserializeUser((id, done) => {
    done(null, User.findById(id));
});


module.exports = passport;