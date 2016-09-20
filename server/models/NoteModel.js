const db = require('../util/db');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  userId: String,
  category: String,
  tags: String,
  title: String,
  value: String,
  color: String,
  created: Date,
  updated: Date,
  completed: Boolean
});

module.exports = mongoose.model('Note', NoteSchema, 'notes');
