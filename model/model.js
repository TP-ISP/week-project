const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserSchema = new Schema({
  serial: {type: Number, default: ''},
  name: {type: String, default: ''},
  email: {type: String, default:''},
  leader: {type: String, default: ''},
  password: {type: String, default: ''}
});

const ProjectSchema = new Schema({
  name: {type: String, required: true},
  status: {type: Number},
  area: {type: String},
  client: {type: String},
  process: {type: Number},
  leader: {type: Number},
  maintainer:{type: String},
  frontling: {type: String},
  product: {type: String},
  description: {type: String, required: true}
});

const WeeklySchema = new Schema({
  week: {type: Number, required:true},
  name: {type: String, required: true},
  involve: {type: String},
  done: {type: String, required:true},
  plan: {type: String},
  description: {type: String}
});

const DeviceSchema = new Schema({
  name: {type: String, required: true},
  owner: {type: String},
  keeper: {type: String},
  platform: {type: String},
  description: {type: String}
});

var User = mongoose.model('User', UserSchema);
var Project = mongoose.model('Project', ProjectSchema);
var Weekly = mongoose.model('Weekly', WeeklySchema);
var Device = mongoose.model('Device', DeviceSchema);


// var TestProject = new Project({ name: 'WR3005N3V1 Project', status: 0, area: 'South America', client: 'Columbia',process: 3 , leader: 1, maintainer: 'wangjiawei', frontling: 'eric', product: 'jefrey', description: '中文显示测试'});


// TestProject.save(function (err) {
//   if (err) {
//     console.log(err);
//     return 0;
//   }
//   console.log('data save finished');
// });

module.exports = {User: User, Project: Project, Weekly: Weekly, Device: Device};