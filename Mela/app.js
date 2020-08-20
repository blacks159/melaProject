var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var backendRouter = require('./routes/backend');
var shopRouter = require('./routes/shop');
var compRouter = require('./routes/comp');
// var userLogin = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  // 新用戶沒有使用到 session 物件時不會建立 session 和發送 cookie
  saveUninitialized: true,
  resave: false, // 沒變更內容是否強制回存
  secret: 'anyrandomstring',
  cookie: {
    maxAge: 1200000, // session存活時間，20分鐘，單位毫秒 // 不設定就是瀏覽器關掉才過期
  }
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(function (req, res, next) {
  if (req.session.user === "undefined" || !req.session.user) {
    req.session.user = "Guest";
    // console.log("logout:" + req.session.user);
   } 
  //  else
  //   console.log("sesseion:" + req.session.user);
  next();
});
app.use('/backend',backendRouter);
app.use('/comp', compRouter);
app.use('/shop', shopRouter);
// app.use('/login', userLogin);



app.use(function (req, res, next) {
  if (typeof req.session.userName === "undefined") {
    // if(!req.session.userName){
    req.session.userName = "Guest";
  }
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
