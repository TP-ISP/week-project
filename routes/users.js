var express = require('express');
var router = express.Router();
const passport = require('passport');
const model = require('../model/model');
const moment = require('moment');

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
      username: req.user.username
      })
    })
  }else{
    res.redirect('/');
  }
});

module.exports = router;
