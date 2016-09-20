const express = require('express');
const router = module.exports = express.Router();
const safe = require('sanitizer');
const User = require('../../controllers/usersCtrl');
const user = new User();

//middleware to restrict access to api to authenticated users
var privateApi = require("../../controllers/tokens").decode;

router.get("/test", function(req, res) {
  res.json({
    status: true,
    message: "test passed"
  })
})

router.post('/signup', function(req, res) {
  if (req.body.email && req.body.password) {
    let e = safe.sanitize(req.body.email);
    let p = safe.sanitize(req.body.password);
    user.signUp(e, p)
      .then((result) => {
        if (result.status)
          res.json(result);
        else
          res.json({
            status: 400,
            message: result.message
          })
      }).catch((err) => {
        res.json({
          status: 400,
          message: err
        })
      })
  } else {
    res.send({
      status: 400,
      message: 'Please enter your email and Password.'
    })
  }
})

router.post('/signin', function(req, res) {
  if (req.body.email && req.body.password) {
    let e = safe.sanitize(req.body.email);
    let p = safe.sanitize(req.body.password);
    user.signIn(e, p)
      .then((result) => {
        if (result.auth)
          res.json(result);
        else
          res.json({
            status: false,
            message: result.message
          })
      }).catch((err) => {
        res.json({
          status: false,
          message: 'Unkown error'
        })
      })
  } else {
    res.send({
      status: false,
      message: 'Please enter your email and Password.'
    })
  }
})

router.post('/', privateApi, function(res, res) {
  res.send(200);
})

router.get('/whoami', privateApi, function(req, res) {
  res.json({
    status: true,
    userId: req.userId
  });
});


router.get('*', function(req, res) {
  res.status = 404;
  res.json({
    status: false,
    message: "This endpoint is not available"
  })
});
