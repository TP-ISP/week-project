var express = require('express');
var router = express.Router();
var User = require('../model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/info/:id', function(req, res, next) {
  var serial = req.params.id?req.params.id:0;
  User.find({'serial':serial}, function(err, result){
    if(err){
      console.log('ERROR');
    }
  })
});

module.exports = router;
