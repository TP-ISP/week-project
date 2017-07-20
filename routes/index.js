var express = require('express');
var router = express.Router();
const passport = require('passport');
const model = require('../model/model');
const moment = require('moment');
// const restc = require('restc');


// router.use(restc.express());

/* GET home page. */
router.get('/', function (req, res, next) {
  req.flash('info', 'Welcome');
  res.render('index', {
    title: 'Express',
    username:"anonymous"
  });
});

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'Login',
    username: 'anonymous'
  })
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/',
  failureFlash: true
}));

router.all('/users', isLoggedIn);
router.get('/users', function (req, res, next) {
  res.render('user', {
    title: 'User List',
    username: req.user.username
  })
});

router.get('/logout', function (req, res) {
  res.logout();
  res.redirect('/');
});

router.get('/project', function (req, res) {
  var Project = model.Project;
  Project.find(function (err, projects) {
    if (err) {
      req.flash('error', 'something wrong with database.');
      res.redirect('/');
    }

    if (typeof (req.user) == "undefined") {
      return res.render('project', {
        projects: projects,
        username: "anonymous"
      })
    }
    return res.render('project', {
      projects: projects,
      username: req.user.username
    })
  })
});

router.get('/projectDetail', function (req,res){
  var id = req.query.id;
  // console.log(id);
  var username = req.user?req.user.username:"anonymous";
  var Project = model.Project;
  Project.find({_id: id}, function(err, project){
    if(err) {
      return res.redirect('/error');
    }
    // console.log("detail---"+project[0].finished);
    return res.render('projectDetail',{
      title: "project detail",
      project: project[0],
      username: username
    })
  })
});

router.get('/addProject', function(req, res){
  if(req.isAuthenticated()){
    if(req.user.username === "admin"){
      res.render('addProject',{
        title: 'add proejct',
        username: req.user.username
      })
    }else{
      res.redirect('/user')
    }
  }else{
    return res.redirect("/");
  }
});

router.post('/addProject', function(req, res){
  if(req.isAuthenticated()){
    var Project = model.Project;
    var newProject = {
      name: req.body.name,
      status: "正常",
      area: req.body.area,
      client: req.body.client,
      process: 0,
      period: "开始",
      leader: req.body.leader,
      maintainer: req.body.maintainer,
      frontling: req.body.frontling,
      product: req.body.product,
      finished: [{time: moment().month() + '-' + moment().date(), text:"还没有完成任何计划"}],
      plan: {time:moment().month() + '-' + moment().date(),text:req.body.plan},
      description: req.body.description,
      updated: moment().date()
    };
    // console.log(req.body.maintainer)
    var ProjectEntity = new Project(newProject);
    ProjectEntity.save();
    res.redirect('/project');
  }else{
    return res.redirect('/user');
  };
})

router.post('/modProject', function(req,res){
  if(req.isAuthenticated()){
    var Project = model.Project;
    var Plan = {time: moment().month() + '-' + moment().date(), text: req.body.plan};
    var id = req.body.id;
    // console.log("modProject---"+id);
    Project.find({_id:id}, function(err, project){
      if(err){
        console.log(err);
      }
      project[0].status = req.body.status;
      project[0].period = req.body.period;
      var finished = project[0].finished;
      var plan = project[0].plan;
      finished.push(plan);
      console.log("modProject---"+finished);
      project[0].finished = finished;
      project[0].plan = Plan;
      project[0].description = req.body.description;
      console.log(project[0]);
      project[0].save();
      console.log("modProject---"+project[0].finished);
    });
    res.redirect('/projectDetail?id='+req.body.id);
  }else{
  res.redirect('/project');
  }
})

router.get("/delProject", function(req, res){
  var Project = model.Project;
  var id = req.query.id;
  Project.findByIdAndRemove(id, function(err, project){
    if(err){
      console.log(err);
    }

    return res.redirect("/project");
  })
})

router.get('/weekly', function (req, res) {
  if (req.isAuthenticated()) {
    var Weekly = model.Weekly;
    // console.log(Weekly);
    var username = req.user.username;
    // console.log(username);
    var wherestr = {
      'name': username
    };
    Weekly.find(wherestr,function (err, weeklys) {
      if (err) {
        return res.redirect('/');
      } else {
        // console.log(weeklys);
        return res.render('weekly', {
          title: "weekly",
          weeklys: weeklys,
          username: username
        })
      }
    })
  } else {
    return res.redirect('/');
  }
})

router.post('/weekly', function (req, res) {
  if(req.isAuthenticated()){
    var name = req.user.username;
    var week = moment().week();
    var involve = req.body.involve;
    var done = req.body.done;
    var plan = req.body.plan;
    var description = req.body.description;
    var updated = moment().date();
    var insertData = {
      week: week,
      name: name,
      involve: involve,
      done: done,
      plan: plan,
      description: description,
      updated: updated
    };
    console.log(insertData);
    var Weekly = model.Weekly;
    var thisweekEntity = new Weekly(insertData);
    thisweekEntity.save();
  }

  return res.redirect('/weekly');
})

// router.get('/weeklyDetail', function(req, res) {
//   if(req.isAuthenticated()){
//     res.render('weeklyDetail',{
//       title: 'weeklyDetail',
//       username: req.user.username
//     })
//   }
// })

router.get('/device', function (req, res) {
  res.render('device');
})

router.get('/addWeekly', function (req, res) {
  if(req.isAuthenticated()){
    return res.render('addWeekly',{
      title: "addWeekly",
      username: req.user.username
    });
  }

  return res.redirect('/');
})

router.get('/delWeekly',function(req, res){
  var id = req.query.id;
  console.log(req.query);
  var Weekly = model.Weekly;
  Weekly.findByIdAndRemove(id, function(err, weekly){
    if(err){
      console.log(err);
    }
    console.log('weekly deleted:', weekly);
    return res.redirect('/weekly');
  });
  // return res.redirect('/weekly');
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('You need to login!')
  res.redirect('/login');
}

module.exports = router;