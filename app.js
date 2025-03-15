// initialiser app
const express = require('express');
const app = express();
const bodyParser = require('body-parser') // important pour envoyer les donner au database 
const passport = require('passport')  //passport pour enregistrer login et signup des utilisateurs
const session = require('express-session');
const flash = require('connect-flash');
const db = require('./config/database')
const passportSetup = require('./config/passport-setup')

app.use(express.static('public'))
app.use(express.static('node_modules'))
app.use(express.static('uploads'))

app.set('view engine', 'ejs')

app.use(session({
    secret: 'abia',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 15 }
}))
app.use(flash())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//bring passport
app.use(passport.initialize())
app.use(passport.session())

// stor user object (enregister l'utilisateur)
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null
    next()
})


app.get('/', (req, res) => {
    res.redirect('/parfum')
});

// Ajauter le router
const parfumRouter = require('./routes/parfum-router');
app.use('/parfum', parfumRouter);

// Ajauter le router
const userRouter = require('./routes/user-router');
app.use('/users', userRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});