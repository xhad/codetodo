const chai = require('chai');
const expect = chai.expect;

const UsersCtrl = require('../../controllers/usersCtrl.js');
const usersCtrl = new UsersCtrl();


describe('User Controller Test:', function() {
  describe('usersCtrl.signUp(email, password)', function() {
    it('Should add a new user to db', (done) => {
      usersCtrl.signUp('testg@test.com', 'bbb').then((result) => {
        expect(result.status).to.equal(true);
        done();
      }).catch(done);
    })

    it('Should fail with no email', (done) => {
      usersCtrl.signUp('', 'bbb').then((result) => {
        expect(result.status).to.be.false;
        done();
      }).catch(done);
    })

    it('Should fail with no password', (done) => {
      usersCtrl.signUp('testg@test.com', '').then((result) => {
        expect(result.status).to.be.false;
        done();
      }).catch(done);
    })
  })

  describe('usersCtrl.signIn(email, password)', function() {
    it('Should sign a new user in', (done) => {
      usersCtrl.signIn('testg@test.com', 'bbb').then((result) => {
        expect(result.auth).to.be.true;
        done();
      }).catch(done);
    })

    it('Should fail with unknown email', (done) => {
      usersCtrl.signIn('testg@tst.com', 'bbb').then((result) => {
        expect(result.auth).to.be.false;
        done();
      }).catch(done);
    })

    it('Should fail with wrong password error', (done) => {
      usersCtrl.signIn('testg@test.com', 'bb').then(function (result) {
        expect(result.auth).to.be.false;
        done();
      }).catch(done);
    })
  })

  describe('usersCtrl.addUserName(email, password, userName)', function() {
    it('Should add a username to the user\'s document', (done) => {
      usersCtrl.addUserName('testg@test.com', 'bbb', 'chad').then((result) => {
        expect(result).to.equal(true);
        done();
      }).catch(done);
    })

    it('Should fail without email address', (done) => {
      usersCtrl.addUserName('', 'bbb', 'chad').then((result) => {
        expect(result).to.be.false;
        done();
      }).catch(done);
    })
  })

  describe('usersCtrl.deleteAccount(email, password)', function() {
    it('Should delete the user account', (done) => {
      usersCtrl.deleteAccount('testg@test.com', "bbb").then((result) => {
        expect(result).to.equal(true);
        done();
      }).catch(done);
    })

    it('Should fail without email address', (done) => {
      usersCtrl.deleteAccount('', "bbb").then((result) => {
        expect(result).to.be.false;
        done();
      }).catch(done);
    })
  })
})
