/**
 * [_chatObj description]
 * @type {Object}
 */
var _chatObj = {

	store: $.AMUI.store,

	init: function()
	{
		var self = this;

		self.initChatRecordsHandler();

		var socket = io();

		socket.on('connect', function () {
		    socket.emit('join', { roomID: _chatConfig.roomID, mobile: _chatConfig.mobile });
		});

		socket.on('disconnect', function () {

		    var $modal = $('#full-modal');
		    $modal.modal({
		    	closeViaDimmer: false
		    });
		    
		});

		//listen new user join
		socket.on('join user', function(data){ 
		    //console.log('join' + data.mobile);
		    self.sameAccountHandler(data);

		    self.addUserHandler(data);


		});

		socket.on('leave user', function(data){
			//console.log('leave' + data.mobile);
		    self.removeUserHandler(data);
		});

		socket.on('msg', function(data){
			
			if (data && data.mobile && $.trim(data.msg))
			{

				if (self.store.enabled) //local store 
				{
					self.store.set(_chatConfig.roomID + data.time, { mobile: data.mobile, msg: data.msg, time: data.time });
				}

				self.renderChatRecordsHandler(data);
			}
			


		});

		$('#btn_submit').on('click', function(){
			
			var msg = $('#message_textarea').val();
			$('#message_textarea').val('');

			socket.send({ mobile: _chatConfig.mobile, msg: msg });

			return false;
		});
	},

	initChatRecordsHandler: function()
	{
		var self = this;

		self.store.forEach(function(key, val) {
			if (key.charAt(0) == _chatConfig.roomID)
			{
				self.renderChatRecordsHandler(val, false);
			}
		});

		$('#chat_box').smoothScroll({position: $('#chat_box')[0].scrollHeight, speed: 100});
	},
	sameAccountHandler: function(data)
	{
		if (data.mobile == _chatConfig.mobile)
		{
			location.href = '/homes?sameAccount='+_chatConfig.roomID;
		}
	},

	addUserHandler: function(data)
	{
		var userListObj = $('#chat_userlist'),
			hasMobile = false;
		userListObj.children('li').each(function(){
			
			if ($.trim($(this).text()) == $.trim(data.mobile))
			{
				hasMobile = true;
				return;
			}
		});

		if (!hasMobile)
		{
			$('#chat_userlist').append('<li><a href="#"><span class="am-icon-user"></span> '+ data.mobile +'</a></li>');
		}	
	},

	removeUserHandler: function(data)
	{
		var userListObj = $('#chat_userlist');
		userListObj.children('li').each(function(){
			
			if ($.trim($(this).text()) == $.trim(data.mobile))
			{
				$(this).remove();
				return;
			}
		});
		
	},

	renderChatRecordsHandler: function(data, isScroll)
	{
		var style = 'fl', 
			textStyle = '',
			isScroll = isScroll || true;

			if (data.mobile == _chatConfig.mobile)
			{
				style = 'fr';
				textStyle = 'am-text-right';
			}
			var tpl = '<div class="am-nbfc am-margin-bottom">'+
			    	'<div class="am-'+ style +' chat-item">'+
						'<strong class="am-block '+ textStyle +'">'+ data.mobile +' <small>'+ data.time +'</small></strong>'+
						'<p class="am-margin-0">'+ data.msg +'</p>'+
			    	'</div>'+
		    	'</div>';

		    if ($('.chat-item').length)
		    {
		    	$('.chat-item:last').parent().after(tpl);
		    	if (isScroll)
		    	{
		    		$('#chat_box').smoothScroll({position: $('#chat_box')[0].scrollHeight});
		    	}
		    	

		    	
		    }
		    else
		    {
		    	$('#chat_box').html(tpl);
		    }
	}

}

;(function($){

  _chatObj.init();

})(jQuery);