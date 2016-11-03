// friendController.js

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var request = require('supertest');
var friendController = require('../server/controllers/friendController');
var friendModels = require('../server/models/friendModels');
var User = require('../server/schemas/userSchema');
var app = require('../server/server');

var testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: 'password'
}
var testId;

var friend = {
  firstName: 'friend',
  lastName: 'popasquatch',
  email: 'friend@test.com',
  password: 'password'
}
var friendId;

var loser = {
  firstName: 'yo',
  lastName: 'User',
  email: 'loser@test.com',
  password: 'password'
}
var loserId;

describe('Friend Controller', function() {
  before(function(done){
    this.timeout(4000);
    User.remove({}).exec()
    .then(function(){
      var users = [new User(testUser), new User(friend), new User(loser)];
      return User.create(users);
    })
    .then(function(users){
      testId = users[0]._id
      friendId = users[1]._id;
      loserId = users[2]._id;
      done();
    })
  });

  describe('friend Request', function() {
    before(function(done){
      sinon.spy(friendModels, 'addFriend');
      done();
    })
    after(function(){
      friendModels.addFriend.restore();
    })
    it('should send a 201 with a success', function(done) {
      request(app)
          .post('/api/friends/friendRequest')
          .send({userId: testId, friendId: friendId})
          .expect(201)
          .end(done);
    });
    it('should call friendModels.addFriend', function() {
      expect(friendModels.addFriend.calledOnce).to.equal(true);
    });
    it('should send a 400 with bad input', function(done) {
      request(app)
          .post('/api/friends/friendRequest')
          .send({'pizza': 'SQUERP SQUERRPP'})
          .expect(400)
          .end(done);
    });
  });

  describe('reject Request', function() {
    before(function(done){
      sinon.spy(friendModels, 'rejectFriend');
      friendModels.addFriend(loserId, testId)
      .then(function(){
      	done();
      })
    })
    after(function(){
      friendModels.rejectFriend.restore();
    })
    it('should send a 201 with a success', function(done) {
      request(app)
          .post('/api/friends/rejectRequest')
          .send({userId: testId, friendId: loserId})
          .expect(201)
          .end(done);
    });
    it('should call friendModels.rejectFriend', function() {
      expect(friendModels.rejectFriend.calledOnce).to.equal(true);
    });
    it('should send a 400 with bad input', function(done) {
      request(app)
          .post('/api/friends/rejectRequest')
          .send({'pizza': 'SQUERP SQUERRPP'})
          .expect(400)
          .end(done);
    });
  });

  describe('accept Request', function() {
    before(function(done){
      sinon.spy(friendModels, 'acceptFriend');
      done();
    })
    after(function(){
      friendModels.acceptFriend.restore();
    })
    it('should send a 201 with a success', function(done) {
      request(app)
          .post('/api/friends/acceptRequest')
          .send({userId: testId, friendId: friendId})
          .expect(201)
          .end(done);
    });
    it('should call friendModels.acceptFriend', function() {
      expect(friendModels.acceptFriend.calledOnce).to.equal(true);
    });
    it('should send a 400 with bad input', function(done) {
      request(app)
          .post('/api/friends/acceptRequest')
          .send({'pizza': 'SQUERP SQUERRPP'})
          .expect(400)
          .end(done);
    });
  });

  describe('get Friends', function() {
    before(function(done){
      sinon.spy(friendModels, 'getFriends');
      done();
    })
    after(function(){
      friendModels.getFriends.restore();
    })
    it('should with friends with a success', function(done) {
      request(app)
          .post('/api/friends/getFriends')
          .send({userId: testId, search: 'friend'})
          .expect(200)
          .expect(function(res){
          	expect(res.body.length).to.equal(1);
          })
          .end(done);
    });
    it('should call friendModels.getFriends', function() {
      expect(friendModels.getFriends.calledOnce).to.equal(true);
    });
  });

  describe('remove Friend', function() {
    before(function(done){
      sinon.spy(friendModels, 'removeFriend');
      done();
    })
    after(function(){
      friendModels.removeFriend.restore();
    })
    it('should send a 200 with a success', function(done) {
      request(app)
          .post('/api/friends/removeFriend')
          .send({userId: testId, friendId: friendId})
          .expect(200)
          .end(done);
    });
    it('should call friendModels.removeFriend', function() {
      expect(friendModels.removeFriend.calledOnce).to.equal(true);
    });
    it('should send a 400 with bad input', function(done) {
      request(app)
          .post('/api/friends/removeFriend')
          .send({'pizza': 'SQUERP SQUERRPP'})
          .expect(400)
          .end(done);
    });
  });

});