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
// CORS
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3003');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//>> ROUTES
router.use('/auth', require('./routes/auth'));
router.use('/notes', require('./routes/notes'));


router.get('*', function(req, res) {
  res.json({
    status: false,
    message: "https://github.com/xhad/codetodo.git"
  })
});
