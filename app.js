var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

var LocalStrategy = require('passport-local');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('weekproject'));
app.use(express.static(path.join(__dirname, 'public')));

//login策略
app.use(session({resave: false, saveUninitialized: true, secret: 'weekproject', cookie: {maxAge: 2000000}}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use('local', new LocalStrategy(
  function(username, password, done){
    var user = {
      id: '1',
      username: 'admin',
      password: 'admin',
      email: 'zhangwei_w8284@tp-link.con.cn'
    };

    if (username !== user.username) {
      return done(null, false, {message: 'Wrong name'});
    }

    if(password !== password){
      return done(null, false, {message: 'Wrong password'})
    }

    return done(null, user);
  }
));

passport.serializeUser(function (user, done){
  done(null, user);
});

passport.deserializeUser(function (user, done){
  done(null, user);
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
    message: err
  });
});

module.exports = app;
