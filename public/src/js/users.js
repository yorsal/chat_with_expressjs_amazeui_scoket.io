/**
 * [_usersObj description]
 * @type {Object}
 */
var _usersObj = {

  passwordValidateOptions: {
    rules: {
        old_password:{
          required: true
        },
        password: {
          required: true,   
          isPassword: true
        },
        repassword:{
          equalTo: '#new_password'
        }

    },
    messages: {
        old_password:{
          required: '请输入旧密码'
        },
        password: {
          required: '请输入新密码',
          isPassword: '密码应该是6-20个字符组成，不包含空格'
        },
        repassword:{
          equalTo: '两次输入密码不一致'
        }
    }
  },

  

  init: function()
  {
    var self = this;

    _mainObj.ajaxFormSubmit($('#profile_form'), self.passwordValidateOptions, function(res, form){
        var info = res.info;
        if (info.code === '1')
        {
            _mainObj.showTips('修改成功', 'success');
            setTimeout(function(){
              location.href = '/users';
            }, 2000);
        }
        else
        {
          _mainObj.showTips(info.message, 'warning');
        }
    });
    
    _mainObj.ajaxFormSubmit($('#password_form'), self.passwordValidateOptions, function(res, form){
        var info = res.info;
        if (info.code === '1')
        {
            _mainObj.showTips('修改成功', 'success');
            setTimeout(function(){
              location.href = '/users';
            }, 2000);
        }
        else
        {
          _mainObj.showTips(info.message, 'warning');
        }
    });

  }


}





;(function($){

  _usersObj.init();

})(jQuery);
