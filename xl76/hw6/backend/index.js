const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');

const app = express();

// const index = require('./src/index.js');
// const auth = require('./src/auth.js').auth;
// const profile = require('./src/profile.js');
// const articles = require('./src/articles.js');
// const following = require('./src/following.js');
require('./src/auth').auth(app);
require('./src/profile')(app);
require('./src/articles')(app);
require('./src/following')(app);

const uri = "mongodb://xingliu:xl76xl76@cluster4-shard-00-00-inum9.mongodb.net:27017,cluster4-shard-00-01-inum9.mongodb.net:27017,cluster4-shard-00-02-inum9.mongodb.net:27017/test?ssl=true&replicaSet=Cluster4-shard-0&authSource=admin";
const mongoose = require('mongoose');

/* mongoose config */
mongoose.connect(uri, {useMongoClient: true});
mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));

const enableCORS = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next()
};
app.use(enableCORS);

// app.use('/', index);
// app.use('/articles', articles);
// app.use('/auth', auth);
// app.use('/profile', profile);
// app.use('/following', following);

app.use(function (req, res, next) {
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else next();
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    const addr = server.address();
    console.log(`Server listening at http://${addr.address}:${addr.port}`)
});

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
//
// // error handler
// app.use(function (err, req, res, next) {
// // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
// // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app;