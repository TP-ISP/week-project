var express = require('express');
var router = express.Router();
const passport = require('passport');
const model = require('../model/model');
const moment = require('moment');
const userlist = require('../model/user');
const nodemailer = require('nodemailer');
// const restc = require('restc');


// router.use(restc.express());

//setup email data with unicode symbols
let transporter = nodemailer.createTransport({
  host: 'smtp.tp-link.com.cn',
  port: 587,
  secure: false,
  auth: {
    user: 'zhangwei_w8284@tp-link.com.cn',
    pass: 'Zz19921221'
  }
});

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
  if(req.isAuthenticated()){
    Project.find(function (err, projects) {
    if (err) {
      req.flash('error', 'something wrong with database.');
      res.redirect('/');
    }

    if(req.user.username == 'admin') {
      return res.render('project', {
        projects: projects,
        username: req.user.username,
        adminuser: true
      })
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

router.get('/projectDetail', function (req,res){
  var id = req.query.id;
  var username = req.user?req.user.username:"anonymous";
  var Project = model.Project;
  Project.find({_id: id}, function(err, project){
    if(err) {
      return res.redirect('/error');
    }
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
        username: req.user.username,
        userlist: userlist.userlist,
        leaderlist: userlist.leaderlist,
        pmlist: userlist.pmlist,
        fmlist: userlist.fmlist
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
      finished: [{time: moment().format('l'), text:"还没有完成任何计划"}],
      plan: {time:moment().format('l'),text:req.body.plan},
      description: req.body.description,
      updated: moment().format('l')
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
    var Plan = {time: moment().format('l'), text: req.body.plan};
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
    var wherestr ={};
    if(username === 'admin'){
      wherestr = {}; 
    }else{
      wherestr = {
        name: username
      }
    }

    Weekly.find(wherestr)
    .sort({'_id':-1})
    .exec(
    function (err, weeklys) {
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
    }
    );
  } else {
    return res.redirect('/');
  }
})

router.post('/weekly', function (req, res) {
  if(req.isAuthenticated()){
    var name = req.user.username;
    var week = moment().year().toString()+moment().week().toString();
    var involve = req.body.involve;
    var done = req.body.done;
    var plan = req.body.plan;
    var description = req.body.description;
    var updated = moment().format('l');
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

    //sending email
    let mailOptions = {
      from: '"周报管理系统" <zhangwei_w8284@tp-link.com.cn>',
      to: 'wangjiawei@tp-link.com.cn',
      subject: '【工作汇报】第'+week+'周工作汇报',
      text: done+'\n'+plan,
      html: '<p>'+done+'</p><br><p>'+plan+'</p>'
    }

    // send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
  }

  return res.redirect('/weekly');
})

router.get('/device', function (req, res) {
  var Device = model.Device;
  if(req.isAuthenticated()){
    Device.find(function (err, devices) {
    if (err) {
      req.flash('error', 'something wrong with database.');
      res.redirect('/');
    }

    if(req.user.username == 'cuihuani') {
      return res.render('device', {
        devices: devices,
        username: req.user.username,
        adminuser: true,
        userlist: userlist.userlist,
        devicelist: userlist.devicelist
      })
    }

    return res.render('device', {
      devices: devices,
      username: req.user.username
    })
  })
  }else{
    res.redirect('/');
  }
})

router.post('/device', function(req, res){
  if(req.isAuthenticated()){
    var serial = req.body.serial;
    var rectime = moment().format('l');
    var backtime = req.body.backtime;
    var description = req.body.description;
    var keeper = req.body.keeper;
    var updated = moment().format('l');
    var insertData = {
      serial: serial,
      owner: "cuihuani",
      keeper: keeper,
      rectime:rectime,
      backtime:backtime,
      description: description,
      updated: String
    };
    console.log(insertData);
    var Device = model.Device;
    var thisDeviceEntity = new Device(insertData);
    thisDeviceEntity.save();
  }

  return res.redirect('/device');  
})

router.get('/delDevice', function(req, res) {
  var serial = req.query.serial;
  console.log(req.query);
  var Device = model.Device;
  Device.remove({serial: serial},
  (err)=>{
    console.log('Device removed.');
  })
  res.redirect('/device');
})

router.get('/addWeekly', function (req, res) {
  if(req.isAuthenticated()){
    console.log(req.user);
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

})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('You need to login!')
  res.redirect('/login');
}

module.exports = router;