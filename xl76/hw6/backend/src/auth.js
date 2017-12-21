const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const md5 = require('md5');
const cookieKey = 'sid';
const model = require('./model.js');
const mySecretMessage = "ins: xakesushi";
const sessionUser = {};

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
            model.Profile.create({
                username: username,
                headline: "init",
                following: [],
                email: email,
                dob: dob,
                zipcode: zipcode,
                avatar: "http://www.behindthevoiceactors.com/_img/chars/hanzo-overwatch-43.6.jpg"
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

module.exports.auth = app => {
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.post('/login', login);
    app.put('/logout', isLoggedIn, logout);
    app.post('/register', register);
    app.put('/password', isLoggedIn, changePassword);
};

module.exports.isLoggedIn = isLoggedIn;
module.exports.sessionUser = sessionUser;