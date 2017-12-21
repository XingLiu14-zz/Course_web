const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = "127415861268318";
const FACEBOOK_APP_SECRET = "5dfda9468443a40e1678592351df0dd3";

const app = express();

passport.use(new Strategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});


const enableCORS = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, X-Session-Id, Accept');
    res.header('Access-Control-Expose-Headers', 'Location, X-Session-Id');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    next()
};

app.use(enableCORS);
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: 'xakesushi',
    resave: true,
    saveUninitialized: true
}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/callback', passport.authenticate('facebook', {failureRedirect: '/auth'}),
    function (req, res) {
        res.redirect('/success');
    });

app.get('/success', (req, res) => {
    res.send({text: "login success"})
});