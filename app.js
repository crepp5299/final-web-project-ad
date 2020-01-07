var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const multer = require('multer');
const urlConnect = `mongodb+srv://brogrammers2527:brogrammers2527@cluster0-mwti3.mongodb.net/test?retryWrites=true&w=majority
`;
const compression = require('compression');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets/images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});
mongoose.connect(urlConnect, { useNewUrlParser: true }, err => {
  if (err) throw err;
  console.log('Connect successfully!!');
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var shopRouter = require('./routes/shop');
var app = express();
app.use(compression());
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(flash());
app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({ storage: fileStorage }).array('productImage'));

app.use('/', indexRouter);
app.use('//', indexRouter);
app.use('/users', usersRouter);
app.use('/shop', shopRouter);

require('./config/passport')(passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
