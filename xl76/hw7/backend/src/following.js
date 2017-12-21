const model = require('./model.js');
const isLoggedIn = require('./auth.js').isLoggedIn;
const sessionUser = require('./auth.js').sessionUser;
const cookieKey = 'sid';

function getFollower(req, res) {
    let username = req.body.username ? req.body.username : sessionUser[req.cookies[cookieKey]].username;
    username = req.params.users ? req.params.users : username;
    model.Profile.findOne({username: username}, function (err, usr) {
        if (err === null && usr !== null) {
            res.send({username: usr.username, following: usr.following})
        }
        else {
            res.status(204).send({})
        }
    })
}

function addFollower(req, res) {
    if (req.params.user) {
        model.Profile.findOne({username: sessionUser[req.cookies[cookieKey]].username}, function (err, profile) {
            if (err === null && profile !== null) {
                profile.following.push(req.params.user);
                profile.save(() => {
                    res.send({username: profile.username, following: profile.following})
                })
            }
            else {
                res.status(204).send({})
            }
        })
    } else {
        res.status(400).send("please provide the user's name")
    }
}

function deleteFollower(req, res) {
    if (!req.params.user) {
        res.status(400).send("please specify a username");
        return
    }
    model.Profile.findOne({username: sessionUser[req.cookies[cookieKey]].username}, function (err, usr) {
        if (err === null && usr !== null) {
            const index = usr.following.indexOf(req.params.user);
            if (index === -1) {
                res.send({username: usr.username, following: usr.following})
            }
            else {
                usr.following.splice(index, index + 1);
                usr.save((err) => {
                    if (!err) {
                        console.log("follower deleted!");
                        res.send({username: usr.username, following: usr.following})
                    }
                })
            }
        }
    })
}

module.exports = app => {
    app.get('/following/:user?', isLoggedIn, getFollower);
    app.put('/following/:user', isLoggedIn, addFollower);
    app.delete('/following/:user', isLoggedIn, deleteFollower)
};