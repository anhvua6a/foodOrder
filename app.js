let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let fileUpload = require('express-fileupload');
let socket  = require('./socket/scoket');

let db = require('./dtb/mongosee')

let indexRouter = require('./routes/indexRoutes');
let usersRouter = require('./routes/userRoutes');
let foodRoutes = require('./routes/foodRoutes');

let foodApiRoutes = require('./api/foodApi')

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(fileUpload({
  createParentPath: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'socket')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/food', foodRoutes);
app.use('/api', foodApiRoutes);





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
