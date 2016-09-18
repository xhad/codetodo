const chai = require('chai');
const expect = chai.expect;

const NoteService = require('../../services/NoteService');
const noteService = new NoteService();

describe('Note Service Tests:', function() {
  let userId = 'asdf-asdf-asdf-asd-fasdf';
  describe('noteService.create({userId, note})', function() {
    it('Should create a new note and save it to db', (done) => {
      let note = {
        userId: userId,
        category: 'productivity',
        tags: ['code', 'javascript'],
        title: 'use pomodoro clock',
        body: 'there have been studies....',
        color: 'yellow',
        created: new Date(),
        archived: false
      };

      noteService.create(userId, note).then((result) => {
        return result._id;
      }).then((id) => {
        expect(id).to.be.a.string;
        done()
      }).catch(done);
    })
  })

  describe('noteService.read(userId)', function() {
    it('Should get all notes associated with a userId', (done) => {
      noteService.read({
          userId: userId
        })
        .then((result) => {
          expect(result.title).to.be.string;
          done()

        }).catch(done);
    })

  })

  describe('noteService.update(note)', function() {
    it('Should update note', (done) => {
      noteService.read({
        userId: userId
      }).then((result) => {
        let newNote = {
          userId: result[0].userId,
          _id: result[0]._id,
          body: 'well this is surely going to test'
        };
        noteService.update(newNote)
          .then((result) => {
            expect(result.n).to.equal(1);
            done()
          }).catch(done);
      })
    })

  })

  describe('noteService.delete(_id)', function() {
    it('Should delete a note with a specfic _id', (done) => {
      noteService.read({
          userId: 'asdf-asdf-asdf-asd-fasdf'
        })
        .then((result) => {
          noteService.delete({
              _id: result._id
            })
            .then(() => {
              done()
            })
        }).catch(done);
    })
  })
})
