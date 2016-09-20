const express = require('express');
const router = module.exports = express.Router();
const NotesCtrl = require('../../controllers/notesCtrl');
const notesCtrl = new NotesCtrl();

//middleware to restrict access to api to authenticated users
var privateApi = require('../../controllers/tokens').decode;

router.get('/test', function(req, res) {
  res.json({
    status: true,
    message: 'test passed'
  })
});

router.post('/create', privateApi, function(req, res) {
  notesCtrl.saveNote(req.userId, req.body)
  .then((result) => {
    res.json({
      status: 200,
      data: result
    })
  })
})

//returns all notes for userId
router.get('/', privateApi, function(req, res) {
  notesCtrl.getNotes(req.userId)
  .then((result) => {
    res.json({
      status: 200,
      data: result
    })
  }).catch((err) => {
    res.json({
      status: 401,
      message: 'something went wrong, no notes got'
    })
  })
});

router.post('/complete')
