const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require('../models/User')
const session = require('express-session');
const multer = require("multer") 

//page login
router.get('/login', (req, res) => {
    res.render('users/authentification')
})

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true, // Activer les messages flash en cas d'échec
}));

router.post('/login', (req, res, next) => {
    passport.authenticate('local.login', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/users/login'); // Rediriger en cas d'erreur d'authentification
        }
        let redirectPath = '/';
        // Utiliser passport.authenticate avec les options successRedirect et failureRedirect
        passport.authenticate('local.login', {
            successRedirect: redirectPath,
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);

    })(req, res, next);
});

//logout
router.get('/logout', (req, res) => {
    try {
        req.logout((err) => {
            if (err) {
                console.error("Error during logout:", err);
                req.flash('error', 'An error occurred during logout.');
            } else {
                req.flash('success', 'You have been logged out successfully.');
            }
            res.redirect('/');
        });
    } catch (error) {
        console.error("Error during logout:", error);
        req.flash('error', 'An error occurred during logout.');
        res.redirect('/');
    }
});



module.exports = router