/**
 * [_mainObj description]
 * @type {Object}
 */
var _mainObj = {

	init: function()
	{

	},
	
	showTips: function(str, flag, duration)
	{
		var tpl = '<div id="main_tips" style="z-index:99999;" class="am-text-center am-margin-top-0 am-topbar-fixed-top am-alert am-alert-'+ flag +'"> '+ str +'</div>';

		if ($('#main_tips').length)
		{
			$('#main_tips').html(str);
		}
		else
		{
			$('body').append(tpl);
		}

		setTimeout(function(){

			$('#main_tips').animate({opacity: 0, top: '-35px'}, 1000, function(){
				$(this).remove();
			});
		}, (duration || 1200));
	},

	ajaxFormSubmit: function(form_obj, options, callback, beforeSubmitCallback)
	{
		var options = $.extend({
			'rules':{},
			'messages':{},
			'ajax_url': ''
		}, options);

		if (form_obj.length)
		{
			form_obj.each(function(){
				$(this).validate({
					errorElement: 'div',
					errorClass: 'am-form-help',
					focusInvalid: true,
					rules: options.rules,
					messages: options.messages,

					highlight: function (e) {
						$(e).closest('.am-form-group').addClass('am-form-warning');
					},
			
					success: function (e) {
						$(e).closest('.am-form-group').removeClass('am-form-warning');
						$(e).remove();
					},


					submitHandler: function (form) {
						
						var flag = true;
						if ($.isFunction(beforeSubmitCallback))
						{
							flag = beforeSubmitCallback(form);
						}

						if (flag)
						{
							$('[type="submit"]', form).prop('disabled', true);
							
							var form_options = {
								dataType: 'json',
								url: (options.ajax_url || $(form).attr('data-url')),
								success: function(res){
									callback(res, form);
									$('button[type="submit"]', form).prop('disabled', false);
								},
								error: function(){
									
									$('button[type="submit"]', form).prop('disabled', false);
								}
							}
							
							$(form).ajaxSubmit(form_options);

						}
						
						
						return false;
					},
					invalidHandler: function (form) {
					}
				});
			})
			
		}
		
	}
}






;(function($){

	//_mainObj.init();

})(jQuery);

