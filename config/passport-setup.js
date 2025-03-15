const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        if (req.body.password !== req.body.confirm_password) {
            return done(null, false, req.flash('error', 'Passwords do not match'));
        }

        const existingUser = await User.findOne({ email: username });
        if (existingUser) {
            return done(null, false, req.flash('error', 'Email already used'));
        }

        const newUser = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
            avatar: "https://www.psyenligne.org/wp-content/uploads/2013/01/inconnu.jpg", // default avatar
            username: "", // default value
            nationallite: "", // default value
            tele: "", // default value
            sex: "" // default value
        });

        await newUser.save();
        return done(null, newUser, req.flash('success', 'User Added'));
    } catch (error) {
        console.log(error);
        return done(error);
    }
}));

passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        const user = await User.findOne({ email: username });

        if (!user) {
            return done(null, false, req.flash('error', 'User not found'));
        }

        if (bcrypt.compareSync(password, user.password)) {
            return done(null, user, req.flash('success', 'Welcome back'));
        } else {
            return done(null, false, req.flash('error', 'Password is wrong'));
        }
    } catch (error) {
        console.log(error);
        return done(error);
    }
}));

module.exports = passport;
