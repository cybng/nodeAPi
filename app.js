var createError = require('http-errors');
var express = require('express');
var mongoose =require("mongoose");
var path = require('path');
var env = require("dotenv");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require("./routes/auth/Auth");

var app = express();
env.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Api......................
app.use("/api",authRouter); 

// mongoose.connect('mongodb://localhost:27017/tt',{ useNewUrlParser: true ,useUnifiedTopology: true}).then(()=>{
//   console.log("Database connected...");
// });

mongoose.connect('mongodb+srv://r4h:r4h@cluster0.6bg9f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology: true}).then(()=>{
  console.log("Database connected...");
});


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
