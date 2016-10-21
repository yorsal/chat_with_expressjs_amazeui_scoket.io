var express = require('express');
var router = express.Router();
var cUsers = require('../controllers/users');


router.route('/')
.get(function(req, res, next) {
	
	global.config.menuSelected = 'users';
	//res.render('./users/index');
	cUsers.renderProfile(req, res, next);

})
.post(function(req, res) {

	cUsers.actionUpdateProfile(req, res);
    
});

router.post('/changePassword', function(req, res){
	cUsers.actionChangePassword(req, res);
});

module.exports = router;
