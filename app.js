var express = require('express');
var path = require('path');
var config = require('config');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var exphbs  = require('express-handlebars');
var cookieSession = require('cookie-session');

//we do a global import, because we want asyncWrap and models to be
//available everywhere, as we use it in various routes
asyncWrap = require('./asyncWrap');
models = require('./models');

var app = express();
app.engine('handlebars', exphbs({
    defaultLayout: 'main',

    helpers: {
        inc: (number) => number + 1,
        withSeparator: (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),

        ifEmpty: (array, options) => ((array.length === 0) ? options.fn(this) : options.inverse(this)),
        ifNotEmpty: (array, options) => ((array && array.length > 0) ? options.fn(this) : options.inverse(this)),
        ifEqual: (v1, v2, options) => ((v1 === v2) ? options.fn(this) : options.inverse(this)),
        ifContains: (v1, v2, options) => ((v1 && v1.indexOf(v2) >= 0) ? options.fn(this) : options.inverse(this)),

        ifLargerThan: (v1, v2, options) => ((v1 > v2) ? options.fn(this) : options.inverse(this)),
        ifSmallerThan: (v1, v2, options) => ((v1 < v2) ? options.fn(this) : options.inverse(this))
    }
}));

app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
    name: 'app-session',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: false,

    keys: [ config.EXPRESS_SESSION_SECRET ]
}));


//setup routes
var index = require('./routes/index');
app.use('/', index);

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
