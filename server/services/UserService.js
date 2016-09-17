const moment = require('moment');
const passwordHash = require('password-hash');
const Promise = require('bluebird');
const UserModel = require('../models/UserModel');
const uuid = require('node-uuid');


var UserService = function() {};

// add new user to db collections users
UserService.prototype.new = function(email, password) {
  return new Promise((resolve, reject) => {
    let hash = passwordHash.generate(password);
    let newUser = new UserModel({
      userId: uuid.v4(),
      email: email,
      hash: hash,
      created: moment().format()
    })

    let save = newUser.save();

    save.then((result) => {
      resolve(result);
    }).error((err) => {
      reject(err);
    })
  }).catch((err) => {
    return err;
  })
};

//check if email is used by another user
UserService.prototype.checkEmail = function(email) {
  return new Promise((resolve, reject) => {
    UserModel.find({
      email: email
    }).then((result) => {
      if (result[0])
        resolve(true);
      else
        reject(false);
    }).error((err) => {
      reject(err);
    })
  }).catch((err) => {
    return false;
  })
}

//add userName to user's account
UserService.prototype.addUserName = function(email, userName) {
  return new Promise((resolve, reject) => {
    if (email)
      UserModel.update({
        userName: userName
      }).where({
        email: email
      }).then((result) => {
        resolve(result);
      })
    else reject({
      status: false,
      message: 'Unkown Username'
    })
  }).catch((err) => {
    return err;
  })
}

//check if username has been taken by another user
UserService.prototype.checkUserName = function(userName) {
  return new Promise((resolve, reject) => {
    UserModel.find({
      userName: userName
    }).then((result) => {
      if (result[0])
        resolve(true);
      else
        resolve(false);
    })
  }).catch((err) => {
    return err;
  })
}

//verify auth
UserService.prototype.verify = function(email, password) {
  return new Promise((resolve, reject) => {
    if (email)
      UserModel.find({
        email: email
      }).then((user) => {
        if (user[0])
          resolve({
            auth: passwordHash.verify(password, user[0].hash),
            data: user[0]
          })
        else
          reject({
            auth: false,
            message: 'User Not found'
          })
      })
    else
      reject({
        auth: false,
        message: 'No email address given'
      })
  }).catch((err) => {
    return err;
  })
}

UserService.prototype.getData = function(userId) {
  return new Promise((resolve, reject) => {
    UserModel.find({
      userId: userId
    }).then((user) => {
      if (user[0])
        resolve(user[0]);
      else
        reject(false);
    })
  }).catch((err) => {
    return err;
  })
}

// remove a user
UserService.prototype.delete = function(email) {
  return new Promise((resolve, reject) => {
    if (email)
      UserModel.remove({
        email: email
      }).then((result) => {
        resolve(true);
      }).error((err) => {
        reject(false);
      })
    else
      reject({
        status: false,
        message: 'No email address given'
      })
  }).catch((err) => {
    return err;
  })
}

module.exports = UserService;
