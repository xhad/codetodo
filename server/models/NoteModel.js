const db = require('../util/db');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  userId: String,
  category: String,
  tags: String,
  title: String,
  body: String,
  color: String,
  created: Date,
  archived: Boolean
});

module.exports = mongoose.model('Note', NoteSchema, 'notes');
