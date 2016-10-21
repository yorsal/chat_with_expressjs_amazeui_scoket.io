var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//定义全局变量
global.config = require('./conf/config');

//定义公共函数
global.funcs = require('./conf/functions');

//定义控制器模块
var cAuthUsers = require('./controllers/authUsers'); // auth users controller

//定义路由模块
var rIndex = require('./routes/index'); //index router
var rHomes = require('./routes/homes'); //homes router
var rUsers = require('./routes/users'); //users router

var app = express(); //create an express object

// view engine setup
/*if (global.config.debug) app.set('views', path.join(__dirname, 'views'));
else app.set('views', path.join(__dirname, 'views_dist'));*/

app.set('views', path.join(__dirname, 'views')); //define views path

app.engine('.html', require('ejs').__express); //define tempalte engine
app.set('view engine', 'html');

app.use(session({
  secret: 'keyboard cat',
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: 30000 }
}))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //define static path

//业务中间件 (验证是否登录)
app.use(['/users*', '/homes*'], cAuthUsers);

//业务中间件 (对应模块到相应url)
app.use('/', rIndex);
app.use('/index', rIndex);
app.use('/users', rUsers);
app.use('/homes', rHomes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
 
  global.funcs.pageNotFoundHandler(res, next);
  
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
