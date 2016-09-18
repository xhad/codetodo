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

router.post('/new', privateApi, function(req, res) {
  notesCtrl.saveNote(req.userId, req.body)
  .then((result) => {
    res.json({
      status: 200,
      data: result
    })
  })
})
router.get('/get', privateApi, function(req, res) {
  console.log(req.userId);
  notesCtrl.getNotes(req.userId)
  .then((result) => {
    console.log(result);
    res.json({
      status: 200,
      note: result
    })
  }).catch((err) => {
    res.json({
      status: 401,
      message: 'something went wrong, no notes got'
    })
  })
});
