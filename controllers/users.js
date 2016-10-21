var express = require('express');
var router = express.Router();
var db = require('../conf/sequelize.js');
var tbMember = require('../models/member.js')(db.sequelize, db.Sequelize);


var authKey = global.config.authKey,
  codeDefine = global.config.codeDefine;
  
module.exports = {

  actionUpdateProfile: function(req, res)
  {
    var data = req.body;

      var condition = {
        'mobile': global.config.member_mobile
      }

      tbMember.findOne({ 'where': condition}).then(function(memberData){  
        if (memberData) //exist mobile number
        {
          var saveData = {
            gender: data.gender,
            latest_edit_time: parseInt(new Date().getTime()/1000, 10)

          };
          tbMember.update(saveData, 
            { 
              where: { id: memberData.id }

            }).then(function(){
                res.send({
                  info: codeDefine.success,
                  data: memberData.id
                });
            });
         
        }
        else
        {
          res.send({
            info: codeDefine.errorDatabase
          });
          


        }
      });
  },

  actionChangePassword: function(req, res)
  {
      var data = req.body;

      var condition = {
        'mobile': global.config.member_mobile
        
      }

      tbMember.findOne({ 'where': condition}).then(function(memberData){  
        if (memberData) //exist mobile number
        {
          if (f.encryption(data.old_password + memberData.time, authKey) == memberData.upassword)
          {
            var saveData = {
              upassword: f.encryption(data.password + memberData.time, authKey),
              latest_edit_time: parseInt(new Date().getTime()/1000, 10)

            };
            tbMember.update(saveData, 
              { 
                where: { id: memberData.id }

              }).then(function(){
                  res.send({
                    info: codeDefine.success,
                    data: memberData.id
                  });
              });

          }
          else
          {
            res.send({
              info: codeDefine.errorUsers
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

  
  renderProfile: function(req, res, next)
  {
      var data = req.body;

      var condition = {
        'mobile': global.config.member_mobile,
        'status': 1
      }

      

      tbMember.findOne({ 'where': condition}).then(function(memberData){  
        if (memberData) //找到该用户
        {
          res.render('./users/index', { _memberData: memberData});
        }
        else
        {
          global.funcs.pageNotFoundHandler(res, next);
        }
      });

  }

 
}




