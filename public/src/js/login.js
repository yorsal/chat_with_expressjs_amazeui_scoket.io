/**
 * [_loginObj description]
 * @type {Object}
 */
var _loginObj = {

  loginValidateOptions: {
    rules: {
      username: {
          required: true
        },
        password: {
          required: true
        }
    },
    messages: {
      username: {
          required: "请输入手机号"
        },
        password: {
          required: '请输入密码'
        }
    }
  },

  registerValidateOptions: {
    rules: {
      username: {
          required: true,
          isMobile: true
        },
        password: {
          required: true,
          isPassword: true
        },
        repassword:{
          equalTo: '#reg_password'
        }

    },
    messages: {
      username: {
          required: '请输入手机号',
          isMobile: "手机号格式不正确"
        },
        password: {
          required: '请输入密码',
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
    
    _mainObj.ajaxFormSubmit($('#login_form'), self.loginValidateOptions, function(res, form){
        var info = res.info;
        if (info.code === '1')
        {
            location.href = '/homes';
        }
        else
        {
          $('#login_error_tips > p', form).html(info.message);
          $('#login_error_tips', form).removeClass('am-hide');
          $('input[name="password"]', form).val('');
        }
    });

    _mainObj.ajaxFormSubmit($('#register_form'), self.registerValidateOptions, function(res, form){
        var info = res.info;
        if (info.code === '1')
        {
            _mainObj.showTips('注册成功，请返回登录！', 'success');
            setTimeout(function(){
              location.href = '/';
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

  _loginObj.init();

})(jQuery);
