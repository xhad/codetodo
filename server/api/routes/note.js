const express = require('express');
const router = module.exports = express.Router();
const safe = require('sanitizer');

//middleware to restrict access to api to authenticated users
var privateApi = require("../../controllers/tokens").decode;

router.get("/test", function(req, res) {
  res.json({
    status: true,
    message: "test passed"
  })
})
