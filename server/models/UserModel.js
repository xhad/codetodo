const db = require('../util/db');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: String,
  userName: String,
  first: String,
  last: String,
  email: String,
  hash: String,
  created: Date,
  laston: Date
});

module.exports = mongoose.model('User', UserSchema, 'users');
