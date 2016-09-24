const Promise = require('bluebird');
const safe = require('sanitizer');
const moment = require('moment');
const UserService = require("../services/UserService");
const userService = new UserService();
const NotesCtrl = require('./notesCtrl');
const notesCtrl = new NotesCtrl();
const Token = require('./tokens');
const starterNote = require('../util/starterNote');

//Users class constructor function
var UsersCtrl = function() {};

var makeToken = function(userId) {
  var payload = {};
  payload.date = new Date();
  payload.userId = userId;
  return Token.generate(payload);
}

UsersCtrl.prototype.signUp = function(email, password) {
  return new Promise(function(resolve, reject) {
    if (email && password) {
      let e = safe.sanitize(email);
      let p = safe.sanitize(password);
      userService.checkEmail(e).then((taken) => {
        if (taken)
          reject({
            status: false,
            message: 'This email address is already in the database.'
          });
        else
          userService.new(e, p).then((user) => {
            if (user.email) {
              notesCtrl.saveNote(user.userId, starterNote);
              resolve({
                status: true,
                userId: user.userId,
                token: makeToken(user.userId)
              });
           } else
              reject({
                status: false,
                message: 'An error occoured creating new user.'
              });
          })
      })
    } else
      reject({
        status: false,
        message: 'Incorrect email address or password'
      })
  }).catch((err) => {
    return err;
  })
}

// user signin: returns jwt
UsersCtrl.prototype.signIn = function(email, password) {
  return new Promise((resolve, reject) => {
    if (email && password) {
      let e = safe.sanitize(email);
      let p = safe.sanitize(password);
      userService.verify(e, p).then((user) => {
        if (user.auth)
          resolve({
            auth: true,
            userId: user.data.userId,
            token: makeToken(user.data.userId)
          });
        else
          reject({
            auth: false,
            message: 'Login Failed'
          });
      })
    } else
      reject({
        auth: false,
        message: 'Incorrect email address or password'
      })
  }).catch(() => {
    return {
      auth: false,
      message: 'Check email address and password'
    }
  })
}

UsersCtrl.prototype.addUserName = function(email, password, userName) {
  return new Promise((resolve, reject) => {
    if (email && password) {
      let e = safe.sanitize(email);
      let p = safe.sanitize(password);
      userService.verify(e, p).then((auth) => {
        if (auth)
          userService.addUserName(email, userName)
          .then((result) => {
            if (result.n === 1)
              resolve(true);
            else
              reject(false);
          })
        else
          reject(false);
      })
    } else
      reject(false);
  }).catch((err) => {
    return err;
  })
}

UsersCtrl.prototype.deleteAccount = function(email, password) {
  return new Promise((resolve, reject) => {
    userService.verify(email, password).then((auth) => {
      if (auth)
        userService.delete(email).then((result) => {
          if (result === true)
            resolve(true)
          else
            reject(false);
        })
      else
        reject(false);
    })
  }).catch((err) => {
    return err
  })
}



module.exports = UsersCtrl;
