const config = require('../util/config');
const TOKEN_SECRET = process.env.TOKEN_SECRET || config.TOKEN_SECRET;
const jwt = require('jwt-simple');
const UserService = require('../services/UserService');
const userService = new UserService();

module.exports = {
  //use this as middleware for routes that need to be authenticated
  decode: function(req, res, next) {
    var token = req.headers['authorization'];
    if (!token) {
      // send 401 if a token is not provided
      res.send(401).json({
        message: "missing access token"
      })
    }

    try {
      // decode token and attach userId to the request
      var decoded = jwt.decode(token, TOKEN_SECRET);
      userService.getData(decoded.userId).then((user) => {
        if (user) {
          req.userId = user.userId
          next();
        } else {
          //user not in DB
          res.status(401).json({
            status: false,
            message: "invalid user"
          });
        }
      }).catch(function() {
        res.status(500).json({
          status: false,
          message: 'internal server error'

        });

      });
    } catch (err) {
      res.status(401).json({
        status: false,
        message: 'malformed token'
      });
    }
  },

  //store the user's id in the token
  generate: function(data) {
    return jwt.encode(data, TOKEN_SECRET);
  }

};
