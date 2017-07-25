var express = require('express');
var router = express.Router();
const passport = require('passport');
const model = require('../model/model');
const moment = require('moment');

/* GET users listing. */
router.get('/project', function(req, res, next) {
  if(req.isAuthenticated()){
    
  }else{
    res.redirect('/login');
  }
});

module.exports = router;
