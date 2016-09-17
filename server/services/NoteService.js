const NoteModel = require('../models/NoteModel');
const Promise = require('bluebird');

var NoteService = function() {};

NoteService.prototype.create = function(note) {
  return new Promise((resolve, reject) => {
    let newNote = new NoteModel({
      userId: note.userId,
      category: note.category,
      tags: note.tags,
      title: note.title,
      body: note.body,
      color: note.color,
      created: new Date(),
      archived: false
    });

    let save = newNote.save();

    save.then((result) => {
      resolve(result);
    }).error((err) => {
      reject(err);
    })
  }).catch((err) => {
    return err;
  })
};

NoteService.prototype.retrieve = function(object) {
  return new Promise((resolve, reject) => {
    NoteModel.find({userId: req.userId})
      .then((notes) => {
        resolve(notes);
      }).error((err) => {
        reject(err);
      })
  }).catch((err) => {
    return err;
  })
};

NoteService.prototype.update = function(object) {
  return new Promise((resolve, reject) => {
    for (let p in object) {
      console.log(p);
    }
  }).catch((err) => {
    return err;
  })
};

NoteService.prototype.delete = function(id) {
  return new Promise((resolve, reject) => {
      NoteModel.remove({_id: id})
      .then((result) => {
      resolve(true);
    }).error((err) => {
      reject(false);
    })
  }).catch((err) => {
    return err;
  })
}

module.exports = NoteService;
