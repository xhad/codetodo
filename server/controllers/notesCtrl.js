const Promise = require('bluebird');
const NoteService = require('../services/NoteService');
const noteService = new NoteService();

var NotesCtrl = function() {};

NotesCtrl.prototype.saveNote = function(userId, note) {
  return new Promise((resolve, reject) => {
    if (userId && note.title && note.value) {
      note.completed = false;
      noteService.create(userId, note)
        .then((result) => {
          resolve(result);
        }).error((err) => {
          reject(err);
        })

    } else
      reject({
        status: false,
        message: 'Please include a title and body'
      })
  }).catch((err) => {
    return err;
  })
};

NotesCtrl.prototype.getNotes = function(userId) {
  return new Promise((resolve, reject) => {
    if (userId) {
      noteService.read({
        userId: userId
      }).then((result) => {
        resolve(result);
      }).error((err) => {
        reject(false);
      })
    } else
      reject({
        status: false,
        message: 'No user sent'
      })
  })
}

NotesCtrl.prototype.completeNote = function(userId, note) {
  return new Promise((resolve, reject) => {
    if (userId && note._id) {
      note.completed = true;
      noteService.update(note)
        .then((result) => {
          resolve(result);
        }).error((err) => {
          reject(err);
        })
    } else 
      reject({
        status: false,
        message: 'unable to complete the note'
      })
  }).catch((err) => {
    return err;
  })
}

NotesCtrl.prototype.updateNote = function(userId, note) {
  return new Promise((resolve, reject) => {
    if (userId && note._id) {
      noteService.update(note)
        .then((result) => {
          resolve(result);
        }).error((err) => {
          reject(err);
        })
    } else
      reject({
        status: false,
        message: 'must include userId and note _id'
      })
  }).catch((err) => {
    return err;
  })
}


module.exports = NotesCtrl;
