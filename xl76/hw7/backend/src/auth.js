const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const md5 = require('md5');
const cookieKey = 'sid';
const model = require('./model.js');
const mySecretMessage = "ins: xakesushi";
const sessionUser = {};
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const FACEBOOK_APP_ID = "127415861268318";
const FACEBOOK_APP_SECRET = "5dfda9468443a40e1678592351df0dd3";
const FACEBOOK_CONFIG = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    passReqToCallback: true
};

passport.serializeUser(function (user, done) {
    done(null, user.id)
});

passport.deserializeUser(function (id, done) {
    User.findOne({authId: id}).exec(function (err, user) {
        done(null, user)
    })
});

function findUser(res, username, next) {
    model.User.findOne({username: username}, function (err, user) {
        if (user !== null) {
            // console.log('Finded' + username);
            next(user);
        } else
            res.status(401).send("This user doesn't exist!");
    })
}

function checkAuth(userObj, pswd) {
    const salt = userObj.salt;
    const hash = md5(salt + pswd);
    return (hash === userObj.hash);
}

function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.sendStatus(400);
        return;
    }
    findUser(res, username, (user) => {
            const userObj = user;
            if (userObj === null) {
                res.senStatus(401);
                return;
            }

            if (!checkAuth(userObj, password)) {
                res.status(401).send("Your password doesn't match!");
                return;
            }

            const sessionKey = md5(mySecretMessage + new Date().getTime() + username);
            sessionUser[sessionKey] = userObj;
            res.cookie(cookieKey, sessionKey, {maxAge: 3600 * 1000, httpOnly: true});
            // console.log(sessionKey);
            res.send({
                username: username,
                status: 'success'
            });
        }
    )
}

function logout(req, res) {
    const sid = req.cookies[cookieKey];
    sessionUser[sid] = undefined;
    res.clearCookie(cookieKey);
    res.status(200).send("logout success");
}

function isLoggedIn(req, res, next) {
    const sid = req.cookies[cookieKey];
    if (!sid) {
        res.sendStatus(401);
    }
    if (!sessionUser[sid]) {
        res.status(401).send("This user is not logged in");
    }
    else {
        req.body.username = sessionUser[sid].username;
        next();
    }
}

function register(req, res) {
    // console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.status(400).send("You should input your username and password")
    }
    model.User.find({username: username}, function (err, user) {
        if (user.length === 0) {
            const salt = Math.random().toString(36).substring(7);
            const hash = md5(salt + password);
            model.User.create({
                username: username,
                hash: hash,
                salt: salt
            }, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            const email = req.body.email ? req.body.email : "xl76@rice.edu";
            const dob = req.body.bday ? req.body.bday : new Date().getTime();
            const zipcode = req.body.zipcode ? req.body.zipcode : "77030";
            const phone = req.body.phone ? req.body.phone : "1234567890";
            const displayname = req.body.displayname;
            const avatar = req.body.avatar;
            model.Profile.create({
                username: username,
                headline: "init",
                following: [],
                email: email,
                dob: dob,
                zipcode: zipcode,
                phone: phone,
                displayname: displayname,
                avatar: avatar
            }, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            const msg = {result: 'success', username: username};
            res.send(msg);
        }
        else {
            // console.log(user);
            res.status(400).send('user has already existed!');
        }
    });
}

function changePassword(req, res) {
    const password = req.body.password;
    if (!password) {
        res.status(400).send("No password to be updated")
    }
    const username = req.body.username;
    const salt = Math.random().toString(36).substring(7);
    const hash = md5(salt + password);
    model.User.findOneAndUpdate({username: username}, {
        $set: {
            hash: hash,
            salt: salt
        }
    }, {new: true}, function (err, user) {
        if (err) {
            console.log(err);
        } else if (user) {
            res.status(200).send("Password updated!");
        } else {
            res.status(400).send("No password been found");
        }
    })
}

passport.use(new Strategy(FACEBOOK_CONFIG,
    function (req, token, refreshToken, profile, done) {
        const username = profile.displayName + "@" + profile.provider;
        const sid = req.cookies[cookieKey];
        if (!sid) {
            User.findOne({username: username}).exec(function (err, user) {
                if (!user || user.length === 0) {
                    const userObj = new User({username: username, authId: profile.id});
                    new User(userObj).save(function (err) {
                        if (err) return console.log(err)
                    });
                    const profileObj = new Profile({
                        username: username,
                        headline: "login by facebook",
                        following: [],
                        email: null,
                        zipcode: null,
                        dob: new Date().getTime(),
                        avatar: ""
                    });
                    new Profile(profileObj).save(function (err) {
                        if (err) return console.log(err)
                    })
                }

            });
            return done(null, profile)
        } else {
            redis.hgetall(sid, function (err, userObj) {
                const localUser = userObj.username;
                Article.update({author: username}, {$set: {'author': localUser}}, {
                    new: true,
                    multi: true
                }, function () {
                });
                Article.update({'comments.author': username}, {$set: {'comments.$.author': localUser}}, {
                    new: true,
                    multi: true
                }, function () {
                });
                Comment.update({author: username}, {$set: {'author': localUser}}, {
                    new: true,
                    multi: true
                }, function () {
                });
                Profile.findOne({username: username}).exec(function (err, profileData) {
                    if (profileData) {
                        const oldFollowingArr = profileData.following
                        Profile.findOne({username: localUser}).exec(function (err, newProfile) {
                            if (newProfile) {
                                const newFollowingArr = newProfile.following.concat(oldFollowingArr)
                                Profile.update({username: localUser}, {$set: {'following': newFollowingArr}}, function () {
                                })
                            }
                        });
                        Profile.update({username: username}, {$set: {'following': []}}, function () {
                        })
                    }
                });
                User.findOne({username: localUser}).exec(function (err, user) {
                    if (user) {
                        let authObj = {};
                        authObj[`${profile.provider}`] = profile.displayName;
                        User.update({username: localUser}, {$addToSet: {'auth': authObj}}, {new: true}, function () {
                        })
                    }
                })
            });
            console.log(profile);
            return done(null, profile)
        }
    }
));

module.exports.auth = app => {
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.post('/login', login);
    app.put('/logout', isLoggedIn, logout);
    app.post('/register', register);
    app.put('/password', isLoggedIn, changePassword);
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}));
    app.use('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect:'/login/facebook'}), success, error);
    app.use('/link/facebook', passport.authorize('facebook', {scope:'email'}));
};

module.exports.isLoggedIn = isLoggedIn;
module.exports.sessionUser = sessionUser;