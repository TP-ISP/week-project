const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserScehma = new Schema({
  serial: {type: Number, default: ''},
  name: {type: String, default: ''},
  email: {type: String, default:''},
  leader: {type: String, default: ''},
  ip: {type: String, default: ''}
});


var User = mongoose.model('User', UserScehma);


var TestUser = new User({ serial: 1,name: 'Zhangwei', email: 'zhangwei_w8284@tp-link.com.cn', leader: 'Wenzhenyu', ip: '172.29.88.14'});


TestUser.save(function (err) {
  if (err) {
    console.log(err);
  }
  console.log('data save finished');
});

module.exports = User;