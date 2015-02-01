var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');
var login = require('./routes/login');
var signup = require('./routes/signup');
var askquestion = require('./routes/askquestion');
var retrievequestion = require('./routes/retrievequestion');
var updatequestion = require('./routes/updatequestion');
var pastquestions = require('./routes/pastquestions');
var pastanswers = require('./routes/pastanswers');
var mongoose = require('mongoose');
// var hbs = require('hbs');

mongoose.connect('mongodb://localhost/wizdo'); //Connect to local mongodb instance
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function (callback) {
  // yay!
});

var app = express(); //set up app

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'web/views'));
//app.set('view engine', 'jade');
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);
app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/api/askquestion', askquestion);
app.use('/api/pastquestions', pastquestions);
app.use('/api/pastanswers', pastanswers);
app.use('/api/retrievequestion', retrievequestion);
app.use('/api/updatequestion', updatequestion);

var auth = undefined;
app.get('/', function(req, res) {
    if (auth) {
        res.render('main')
    } else {
        res.redirect('/login');
    }
});
app.get('/login', function(req, res) {
    res.render('login');
});
<<<<<<< HEAD
app.get('/signup', function(req, res) {
    res.render('signup');
=======
app.get('/main', function(req, res) {
    res.render('main');
});
app.post('/auth', function(req, res) {
    auth = res.body.auth;
    res.end("done");
>>>>>>> 6b876abfbcd80d042dc6b2e6385f0d8c47a4438a
});
app.get('/ask', function(req, res) {
    res.render('ask');
});
app.get('/answer', function(req, res) {
    res.render('answer');
});
app.get('/askhist', function(req, res) {
    res.render('askhistory');
});
app.get('/answerhist', function(req, res) {
    res.render('answerhistory');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
