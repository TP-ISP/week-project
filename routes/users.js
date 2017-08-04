var express = require('express');
var router = express.Router();
const passport = require('passport');
const model = require('../model/model');
const moment = require('moment');
const userlist = require('../model/user');

/* GET users listing. */
router.get('/project', function(req, res, next) {
  if(req.isAuthenticated()){
    console.log(req.user.chinese)
    var Project = model.Project;
    Project.find({maintainer:req.user.chinese}, function(err, projects){
      if (err) {
      req.flash('error', 'something wrong with database.');
      res.redirect('/');
    }
    return res.render('project', {
      projects: projects,
      username: userlist.toChinese(req.user.username)
      })
    })
  }else{
    res.redirect('/');
  }
});

router.get('/device', function(req, res, next) {
  if(req.isAuthenticated()){
    var Device = model.Device;
    Device.find({keeper: userlist.toChinese(req.user.username)}).
          sort({_id: -1}).
          exec(function(err, devices){
            if(err){
              res.redirect('/');
            }

            return res.render('device', {
              devices: devices,
              username:userlist.toChinese(req.user.username)
            })
          })
  }
})

module.exports = router;
