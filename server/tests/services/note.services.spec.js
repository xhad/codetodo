const chai = require('chai');
const expect = chai.expect;

const NoteService = require('../../services/NoteService');
const noteService = new NoteService();

describe('Note Service Tests:', function() {
  describe('noteService.new(note)', function() {
    it('Should create a new note and save it to db', (done) => {
      let note = {
        userId: 'asdf-asdf-asdf-asd-fasdf',
        category: 'productivity',
        tags: ['code', 'javascript'],
        title: 'use pomodoro clock',
        body: 'there have been studies....',
        color: 'yellow',
        created: new Date(),
        archived: false
      };

      noteService.create(note).then((result) => {
        return result._id;
      }).then((id) => {
        expect(id).to.be.a.string;
        return id;
      }).then((id) => {
        noteService.delete({
          _id: id
        }).then((result) => {
          done();
        }).catch(done);
      })
    })
  })

  // describe('noteService.retrieve()')
})
