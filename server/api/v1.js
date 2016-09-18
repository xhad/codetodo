const express = require('express');
const bodyParser = require('body-parser');
const debug = require("debug")("api");
const morgan = require('morgan');
const router = module.exports = express.Router();
const safe = require('sanitizer');


//>> API version
router.use(function(req, res, next) {
  res._json = res.json;
  res.json = function json(obj) {
    obj.CodeTodoAPI = 1;
    res._json(obj);
  };
  next();
});

//>> MIDDLEWARE
//logging
router.use(morgan('combined'));
// Parse JSON (uniform resource locators)
router.use(bodyParser.json());
// Parse forms (signup/login)
router.use(bodyParser.urlencoded({
  extended: true
}));

//>> ROUTES
router.use('/auth', require('./routes/auth'));
router.use('/notes', require('./routes/notes'));


router.get('*', function(req, res) {
  res.json({
    status: false,
    message: "https://github.com/xhad/codetodo.git"
  })
});
