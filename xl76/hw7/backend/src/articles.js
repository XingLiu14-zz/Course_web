const model = require('./model.js');
const isLoggedIn = require('./auth.js').isLoggedIn;
const md5 = require('md5');
const sessionUser = require('./auth.js').sessionUser;
const cookieKey = 'sid';

function addArticle(req, res) {
    const newArticle = {
        author: sessionUser[req.cookies[cookieKey]].username,
        img: req.body.img || "",
        text: req.body.text || 'empty article',
        date: new Date(),
        comments: []
    };
    model.Article.create(newArticle, function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.send({
        articles: [newArticle]
    });
}

function getArticle(req, res) {
    if (req.params.id) {
        // console.log(req.params.id);
        model.Article.find({author: req.params.id}, function (err, article) {
            if (article !== null && err === null) {
                article.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date)
                });
                res.send({articles: article});
            }
        })
    }
    else {
        model.Article.find({}, (err, article) => {
            if (article !== null && err === null) {
                article.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date)
                });
                res.send({articles: article});
            }
        })
    }
}

function putArticle(res, req) {
    const commentId = req.body.commentId;
    if (!req.params.id) {
        res.status(401).send("You didn't provide the article id");
    }
    else {
        model.Article.findById({_id: req.params.id}, function (err, article) {
            if (!article) {
                res.status(400).send("Can't find this article")
            } else if (commentId) {
                if (commentId === '-1') {// now need add new comment
                    const randomId = md5(req.body.username + Math.random().toString(36).substring(7));
                    const commentObj = new Comment({
                        commentId: randomId,
                        author: sessionUser[req.cookies[cookieKey]].username,
                        date: new Date(),
                        text: req.body.text
                    });
                    model.Article.findOne({_id: req.params.id}, function (err, article) {
                        if (err === null && article !== null) {
                            article.comments.push(commentObj);
                            article.save((err) => {
                                //console.log(article);
                                res.send({articles: [article]})
                            })
                        }
                    })
                }
                else {// update the comment
                    model.Article.findOne({_id: req.params.id}, function (err, article) {
                        if (err === null && article !== null) {
                            article.comments.forEach((comm) => {
                                if (comm.commentId === commentId && comm.author === sessionUser[req.cookies[cookieKey]].username) {
                                    comm.text = req.body.text;
                                    comm.date = new Date();
                                    article.save((err) => {
                                        //console.log("comment updated!");
                                        res.send({articles: [article]})
                                    })
                                }
                            })
                        }
                    })
                }
            }
            else {// update the article
                if (article.author === sessionUser[req.cookies[cookieKey]].username) {
                    model.Article.findOne({}, function (err, articles) {
                        if (articles !== null && err === null) {
                            articles.forEach((article) => {
                                if (article._id === req.params.id) {
                                    if (article.author !== sessionUser[req.cookies[cookieKey]].username) {
                                        res.sendStatus(403)
                                    } else {
                                        article.text = req.body.text;
                                        articles.save(() => {
                                            console.log("article:" + article._id + " updated!")
                                            res.send({articles: [article]})
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
            }
        })
    }
}

module.exports = (app) => {
    app.post('/article', isLoggedIn, addArticle);
    app.get('/articles/:id*?', isLoggedIn, getArticle);
    app.put('/articles/:id', isLoggedIn, putArticle);
};