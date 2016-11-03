var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var request = require('supertest');
var userController = require('../server/controllers/userController');
var userModels = require('../server/models/userModels');
var User = require('../server/schemas/userSchema');
var app = require('../server/server');

var testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: 'password'
}

describe('User Controller', function() {
  describe('signUp', function() {
    before(function(done){
      sinon.spy(userModels, 'addUser');
      User.remove({}).exec()
      .then(function(){
        done();
      })
    })
    after(function(){
      userModels.addUser.restore();
    })
    it('should send a 201 with a success', function(done) {
      request(app)
          .post('/api/users/signup')
          .send(testUser)
          .expect(201)
          .end(done);
    });
    it('should call userModel.addUser', function() {
      expect(userModels.addUser.calledOnce).to.equal(true);
    });
    it('should send a 400 when email already exists', function(done) {
      request(app)
          .post('/api/users/signup')
          .send(testUser)
          .expect(400)
          .end(done);
    });
  });

  describe('LogIn Controller', function(){
    it('should send a 400 when password is incorrect', function(done) {
      request(app)
          .post('/api/users/login')
          .send({email: testUser.email, password: 'LETSBOGOTOCHIPOGO'})
          .expect(400)
          .end(done);
    });
    it('should send a 400 when user does not exist', function(done) {
      request(app)
          .post('/api/users/login')
          .send({email: 'PIZZAAAA', password: 'LETSBOGOTOCHIPOGO'})
          .expect(400)
          .end(done);
    });
    it('should send the user when the password is correct', function(done) {
      request(app)
          .post('/api/users/login')
          .send({email: testUser.email, password: testUser.password})
          .expect(200)
          .expect(function(res){
            expect(res.body.firstName).to.equal('Test');
            expect(res.body.lastName).to.equal('User');
          })
          .end(done);
    });
  });

  describe('get Users', function() {
    before(function(done){
      sinon.spy(userModels, 'userSearch');
      done();
    })
    after(function(){
      userModels.userSearch.restore();
    })
    it('should get friends with a success', function(done) {
      request(app)
          .get('/api/users/test')
          .expect(200)
          .expect(function(res){
            expect(res.body.length).to.equal(1);
          })
          .end(done);
    });
    it('should call userModels.getUsers', function() {
      expect(userModels.userSearch.calledOnce).to.equal(true);
    });
  });
});