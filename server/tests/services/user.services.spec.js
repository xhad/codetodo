const chai = require('chai');
const expect = chai.expect;

const UserService = require('../../services/UserService');
const userService = new UserService();

describe('User Service Tests:', function() {

  describe('userService.new(email)', function() {
    it('Should add new user to DB', (done) => {
      userService.new("test@test.com", "bbb").then((result) => {
        expect(result.get('email')).to.equal('test@test.com');
        done();
      }).catch(done);
    })
  })

  describe('userService.checkEmail(email)', function() {
    it('Should return true if email is exist in db', (done) => {
      userService.checkEmail("test@test.com")
        .then((result) => {
          expect(result).to.equal(true);
          done();
        }).catch(done);
    })
  })

  describe('userService.verify(email, password)', function() {
    it('Should return true for authentication', (done) => {
      userService.verify("test@test.com", "bbb")
        .then((result) => {
          expect(result.auth).to.equal(true);
          done();
        }).catch(done);
    })
  })

  describe('userService.addUserName(email, userName)', function() {
    it('Add username to user\'s document', (done) => {
      userService.addUserName("test@test.com", "chad")
        .then((result) => {
          expect(result.n).to.equal(1);
          done();
        }).catch(done);
    })
  })

  describe('userService.checkUserName(userName)', function() {
    it('Returns false for username not taken', (done) => {
      userService.checkUserName("chad")
        .then((result) => {
          expect(result).to.equal(true);
          done();
        }).catch(done);
    })
  })

  describe('userService.getData(userId)', function() {
    it('Should return user data', (done) => {
      userService.verify("test@test.com", "bbb").then((data) => {
        userService.getData(data.data.userId)
          .then((result) => {
            expect(result.userId).to.exist;
            done();
          }).catch(done);
      })
    })
  })

  describe('userService.delete(email)', function() {
    it('Should delete test@test.com', (done) => {
      userService.delete('test@test.com')
        .then((result) => {
          done()
        }).catch(done);
    })
  })


})
