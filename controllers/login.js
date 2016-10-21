var express = require('express');
var router = express.Router();
var db = require('../conf/sequelize.js');
var tbMember = require('../models/member.js')(db.sequelize, db.Sequelize);


var authKey = global.config.authKey,
  codeDefine = global.config.codeDefine;
  
module.exports = {

  /**
   * [actionRegister description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  actionRegister: function(req, res)
  {
    var data = req.body;

      var condition = {
        'mobile': data.username
      }

      tbMember.findOne({ 'where': condition}).then(function(memberData){  
        if (memberData) //exist mobile number 
        {
          res.send({
            info: codeDefine.errorRegister
          });
        }
        else
        {
          var saveData = {
            mobile: data.username,
            time: parseInt(new Date().getTime()/1000, 10)

          };
          //console.log(saveData);
          tbMember.create(saveData).then(function(memberData){

            //console.log(memberData.id);
              tbMember.update({
                  upassword: global.funcs.encryption(data.password + memberData.time, authKey)
                }, 
                { 
                  where: { id: memberData.id }

                }).then(function(){
                    res.send({
                      info: codeDefine.success,
                      data: memberData.id
                    });
                });
          });


        }
      });
  },

  /**
   * [actionLogin description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  actionLogin: function(req, res)
  {
      var data = req.body;

      var condition = {
        'mobile': data.username,
        'status': 1
      }

      tbMember.findOne({ 'where': condition}).then(function(memberData){  
        if (memberData) //找到该用户
        {
          if (global.funcs.encryption(data.password + memberData.time, authKey) == memberData.upassword)
          {
          
            tbMember.update({
              latest_login_time: parseInt(new Date().getTime()/1000, 10)
            }, 
            { 
              where: { id: memberData.id }

            }).then(function(){ //验证通过

              req.session.member_id = memberData.id;

              var member_cookie = {
                member_id: memberData.id,
                member_mobile: memberData.mobile
              }
              
              res.cookie('member_cookie', global.funcs.encryption(JSON.stringify(member_cookie), authKey), {});
              res.send({
                info: codeDefine.success,
                data: member_cookie
              });
              
            });
          }
          else
          {
            res.send({
              info: codeDefine.errorLogin
            });
          }
        }
        else
        {
          res.send({
            info: codeDefine.errorDatabase
          });
        }
      });

  },

  /**
   * [actionLogout description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  actionLogout: function(req, res)
  {
    res.clearCookie('member_cookie');
    res.redirect('/');
  }

}




