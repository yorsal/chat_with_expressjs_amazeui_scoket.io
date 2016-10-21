var express = require('express');
var router = express.Router();

var db = require('../conf/sequelize.js');
var tb_member = require('../models/member.js')(db.sequelize, db.Sequelize);

router.get('/', function(req, res, next) {
  
	global.config.menuSelected = 'homes';

	var query = req.query,
		passData = {
			_query: query, 
			_chatRooms: global.config.chatRooms,
			_arrCount: global.funcs.getCurrentUser()
		}

	
	res.render('./homes/index', passData);

});

router.get('/chatRoom/:id?', function(req, res, next) {
 	
 	global.config.menuSelected = 'homes';

 	var chatRooms = global.config.chatRooms,
 		chatUserList = global.config.chatUserList;
 	

 	var params = req.params,
 		id = params.id,
 		query = req.query,
 		password = query.password;

 	if (id >= 0 && id < chatRooms.length)
 	{
 		var passData = {
	 		_id: id,
	 		_password: password,
	 		_chatRoom: chatRooms[id],
	 		_chatUserList: chatUserList
	 	};

	 	res.render('./homes/chatRoom', passData);

 	}
 	else
 	{
 		global.funcs.pageNotFoundHandler(res, next);
 	}
 	
  

});


module.exports = router;
