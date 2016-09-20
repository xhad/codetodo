const NoteModel = require('../models/NoteModel');
const Promise = require('bluebird');

var NoteService = function() {};

NoteService.prototype.create = function(userId, note) {
  return new Promise((resolve, reject) => {

    function makeNote() {
      let newNote = new NoteModel();
      newNote.userId = userId;

      for (let key in note) {
        newNote[key] = note[key];
      }

      save(newNote);
    }

    function save(newNote) {
      newNote.save()
        .then((result) => {
          resolve(result);
        }).error((err) => {
          reject(err);
        })
    }

    makeNote();

  }).catch((err) => {
    return err;
  })
};

NoteService.prototype.read = function(object) {
  return new Promise((resolve, reject) => {
    NoteModel.find({
        userId: object.userId,
        completed: false
      })
      .then((notes) => {
        resolve(notes);
      }).error((err) => {
        reject(err);
      })
  }).catch((err) => {
    return err;
  })
};

NoteService.prototype.update = function(note) {
  return new Promise((resolve, reject) => {
    // Model.update({ _id: id }, { $set: { size: 'large' }}
    function makeSet() {
      let set = {};

      for (let key in note) {
        if (key != '_id')
          set[key] = note[key];
      }

      update(set)
    }

    function update(set) {
      NoteModel.update({
        _id: note._id
      }, {
        $set: set
      }).then((result) => {
        resolve(result);
      }).error((err) => {
        reject(err);
      })
    }

    makeSet();




  }).catch((err) => {
    return err;
  })
};

NoteService.prototype.delete = function(object) {
  return new Promise((resolve, reject) => {
    for (let key in object) {
      NoteModel.remove({
        key: object['key']
      }).then((result) => {
        resolve(result)
      }).error((err) => {
        reject(err);
      })
    }
  }).catch((err) => {
    return err;
  })
}

module.exports = NoteService;
