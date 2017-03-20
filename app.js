var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var csp_report = require('./routes/csp-report');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.pretty = true;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({type: ["application/json", "application/csp-report"]}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header('Content-Security-Policy-Report-Only',
        "default-src 'none'; " +
        "style-src 'self' maxcdn.bootstrapcdn.com; " +
        "script-src 'self' ajax.googleapis.com maxcdn.bootstrapcdn.com; " +
        "font-src 'self' maxcdn.bootstrapcdn.com; " +
        "img-src 'self'; " +
        "report-uri /csp_report");
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/csp_report', csp_report);

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
  res.render('error');
});

module.exports = app;
