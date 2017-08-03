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
  status: {type: String},
  area: {type: String},
  client: {type: String},
  process: {type: Number},
  period: {type: String, default:'标案评估'},
  leader: {type: String},
  maintainer:{type: String},
  frontling: {type: String},
  product: {type: String},
  finished: [{time: String, text: String}],
  plan: {time:String, text: String},
  description: {type: String, default:''},
  updated: String
});

const WeeklySchema = new Schema({
  week: {type: Number, required:true},
  name: {type: String, required: true},
  involve: {type: String},
  done: {type: String, required:true},
  plan: {type: String},
  description: {type: String},
  updated: String
});

const DeviceSchema = new Schema({
  serial: {type: String, required: true},
  owner: {type: String},
  keeper: {type: String},
  rectime:{type: String},
  backtime:{type:String},
  description: {type: String},
  updated: String
});

var User = mongoose.model('User', UserSchema);
var Project = mongoose.model('Project', ProjectSchema);
var Weekly = mongoose.model('Weekly', WeeklySchema);
var Device = mongoose.model('Device', DeviceSchema);


module.exports = {User: User, Project: Project, Weekly: Weekly, Device: Device};