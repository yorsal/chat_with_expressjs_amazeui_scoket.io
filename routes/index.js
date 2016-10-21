var express = require('express');
var router = express.Router();

var cLogin = require('../controllers/login');

global.config.menuSelected = 'index';

//----index
router.get('/', function(req, res, next) {
 
  res.render('index');

});


//----login
router.route('/login')
.get(function(req, res) {
    
    res.render('index');
})
.post(function(req, res) {

	cLogin.actionLogin(req, res);
    
});

//----register
router.route('/register')
.post(function(req, res) {

	cLogin.actionRegister(req, res);
    
});




//----logout
router.get('/logout', function(req, res) {
    cLogin.actionLogout(req, res);
});

module.exports = router;



