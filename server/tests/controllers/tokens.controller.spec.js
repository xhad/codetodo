const chai = require('chai');
const expect = chai.expect;
const Token = require('../../controllers/tokens');
const UsersCtrl = require('../../controllers/usersCtrl');
const usersCtrl = new UsersCtrl();

let res = {};
res.status = function(error) {
  return {
    json: function() {}
  }
};

let next = {};
let req = {};

describe('Tokens Controller Test:', function() {

  describe('token.generate(payload)', function() {
    it('Should take new date() and userId and make JWT', (done) => {
      usersCtrl.signUp("testa@test.com", "bbb").then((result) => {
        // console.log(result.token);
        expect(result.token).to.be.a.String;

        done();
      }).then(() => {
        usersCtrl.deleteAccount("testa@test.com", "bbb");
      }).catch(done);
    })
  })

  describe('token.decode(payload)', function() {
    it('Should decrypt the token and return the date and userId', (done) => {
      usersCtrl.signUp("tests@test.com", "bbb").then((result) => {
        let payload = {
          headers: {
            'x-access-token': result.token
          },
          userId: result.userId
        }

        return Token.decode(payload, res)
      }).then((token) => {
        usersCtrl.deleteAccount("tests@test.com", "bbb");
        expect(token).to.be.undefined;
        done();
      }).catch(done);
    })
  })

  describe('token.decode(Bad Payload)', function() {
    it('Should fail and return error', (done) => {
      usersCtrl.signUp("testu@test.com", "bbb").then((result) => {
        let payload = {
          headers: {
            'x-access-token': 'asdfasdfasdfasdfasdfasdf'
          },
          userId: result.userId
        }
        let token = Token.decode(payload, res);
        usersCtrl.deleteAccount("testu@test.com", "bbb");
        return token;
      }).then((result) => {
        expect(result).to.equal(undefined);
        done();
      }).catch(done);
    })
  })
})
