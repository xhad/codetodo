const chai = require('chai');
const expect = chai.expect;
const NotesCtrl = require('../../controllers/notesCtrl');
const notesCtrl = new NotesCtrl();

describe('Notes Controller tests:', function() {
  let userId = 'asdf-asdf-asdf';
  describe('notesCtrl.saveNote(note)', function() {
    it('Should fail without note body', (done) => {
      let newNote = {
        userId: userId,
        title: 'clean up'
      };

      notesCtrl.saveNote(userId, newNote)
      .then((result) => {
        expect(result.status).to.be.false;
        done();
      }).catch(done);
    })

    it('Should save to db', (done) => {
      notesCtrl.saveNote(userId, {
        title: 'clean up',
        body: 'asap'
      })
      .then((result) => {
        expect(result._id).to.be.string;
        done();
      }).catch(done);
    })
  })

  describe('notesCtrl.getNotes(userId)', function() {
    it('Should return all notes for userId', (done) => {
      notesCtrl.getNotes(userId)
      .then((result) => {
        expect(result._id).to.be.string;
        done();
      }).catch(done);
    })
  })

  describe('notesCtrl.updateNote(note)', function() {
    it('Should update note', (done) => {
      notesCtrl.getNotes(userId)
      .then((result) => {
        let newNote = {
          userId: result[0].userId,
          _id: result[0]._id,
          body: 'well this is surely going to test'
        };

        notesCtrl.updateNote(userId, newNote)
        .then((result) => {
          expect(result.n).to.equal(1);
          done();
        }).catch(done);
      })
    })
  })
})
