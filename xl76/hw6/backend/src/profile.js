const model = require('./model.js');
const isLoggedIn = require('./auth.js').isLoggedIn;
const sessionUser = require('./auth.js').sessionUser;
const cookieKey = 'sid';

function getHeadlines(req, res) {
    const username = req.body.username ? req.body.username : sessionUser[req.cookies[cookieKey]].username;
    const users = req.params.users ? req.params.users.split(',') : [username];
    let headlines = [];
    model.Profile.find({}, function (err, usr) {
        if (err === null && usr !== null) {
            usr.forEach((u) => {
                if (users.indexOf(u.username) !== -1) {
                    headlines.push({username: u.username, headline: u.headline})
                }
            });
            res.send({"headlines": headlines})
        }
        else {
            res.status(204).send({})
        }
    })
}

function updateHeadline(req, res) {
    const username = sessionUser[req.cookies[cookieKey]].username;
    model.Profile.findOne({username: username}, function (err, usr) {
        if (err === null && usr !== null) {
            usr.headline = req.body.headline;
            usr.save((err) => {
                console.log("headline updated");
                res.send({username: username, headline: usr.headline})
            })
        }
        else {
            res.status(204).send({})
        }
    })
}

function getEmail(req, res) {
    let username = req.body.username ? req.body.username : sessionUser[req.cookies[cookieKey]].username;
    username = req.params.users ? req.params.users : username;
    model.Profile.findOne({username: username}, function (err, usr) {
        if (err === null && usr !== null) {
            res.send({username: username, email: usr.email})
        }
        else {
            res.status(204).send({})
        }
    })
}

function updateEmail(req, res) {
    const username = sessionUser[req.cookies[cookieKey]].username;
    model.Profile.findOne({username: username}, function (err, usr) {
        if (err === null && usr !== null) {
            usr.email = req.body.email;
            usr.save((err) => {
                console.log("email updated");
                res.send({username: usr.username, email: usr.email})
            })
        }
        else {
            res.status(204).send({})
        }
    })
}

function getZipcode(req, res) {
    let username = req.body.username ? req.body.username : sessionUser[req.cookies[cookieKey]].username;
    username = req.params.user ? req.params.user : username;
    model.Profile.findOne({username: username}, function (err, usr) {
        if (err === null && usr !== null) {
            res.send({username: username, zipcode: usr.zipcode})
        }
        else {
            res.status(204).send({})
        }
    })
}

function updateZipcode(req, res) {
    const username = sessionUser[req.cookies[cookieKey]].username;
    model.Profile.findOne({username: username}, function (err, usr) {
        if (err === null && usr !== null) {
            usr.zipcode = req.body.zipcode;
            usr.save((err) => {
                console.log("zipcode updated");
                res.send({username: username, zipcode: usr.zipcode})
            })
        } else
            res.status(204).send({})
    })
}

function getDob(req, res) {
    let username = req.body.username ? req.body.username : sessionUser[req.cookies[cookieKey]].username;
    username = req.params.user ? req.params.user : username;
    model.Profile.findOne({username: username}, function (err, usr) {
        if (err === null && usr !== null) {
            res.send({username: username, dob: new Date(usr.date).getTime()})
        } else
            res.status(204).send({})
    })
}

function getAvatars(req, res) {
    const username = req.body.username ? req.body.username : sessionUser[req.cookies[cookieKey]].username;
    const users = req.params.users ? req.params.users.split(',') : [username];
    let avatars = [];
    model.Profile.find({}, function (err, usr) {
        if (err === null && usr !== null) {
            usr.forEach((u) => {
                if (users.indexOf(u.username) !== -1) {
                    avatars.push({username: u.username, avatar: u.avatar})
                }
            });
            res.send({"avatars": avatars})
        }
        else {
            res.status(204).send({})
        }
    })
}

function putAvatar(req, res) {
    const username = sessionUser[req.cookies[cookieKey]].username;
    model.Profile.findOne({username: username}, function (err, usr) {
        if (err === null && usr !== null) {
            usr.avatar = req.body.avatar;
            usr.save((err) => {
                console.log("avatar updated");
                res.send({username: username, avatar: usr.avatar})
            })
        } else
            res.status(204).send({})
    })
}


module.exports = (app) => {
    app.get('/headlines/:users?', isLoggedIn, getHeadlines);
    app.put('/headline', isLoggedIn, updateHeadline);
    app.get('/email/:user?', isLoggedIn, getEmail);
    app.put('/email', isLoggedIn, updateEmail);
    app.get('/zipcode/:user?', isLoggedIn, getZipcode);
    app.put('/zipcode', isLoggedIn, updateZipcode);
    app.get('/dob', isLoggedIn, getDob);
    app.get('/avatars/:users?', isLoggedIn, getAvatars);
    app.put('/avatar', isLoggedIn, putAvatar);
};