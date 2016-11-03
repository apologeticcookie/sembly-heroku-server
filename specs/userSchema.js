var chai = require('chai');
var expect = chai.expect;
var User = require('../server/schemas/userSchema.js');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.Promise = bluebird;


describe('User Schema', function() {

  describe('User Schema', function() {
    it('schema should have properties id, firstName, lastName, email, password, salt, friends, requests, saved, hosting, invitedTo photoUrl', function() {
      expect(User.schema.obj).to.have.all.keys(['id', 'firstName', 'lastName', 'email', 'password', 'salt', 'friends', 'requests','invitedTo', 'saved', 'hosting', 'photoUrl']);
    });
  });

  describe('Password Encryption', function(){
    
    var currentUser = null;

    afterEach(function(done){
    //clear the user database
    User.remove({}, function(err){
      done();
    });

    });

    it('should make sure that the password in the database does not equal the string ', function(done){
      var stringPassword = 'dropItLikeItsHot';
      var newTestUser = new User({
        firstName: 'Snoop',
        lastName: 'Dogg',
        email: 'foshizzle@dogg.com',
        password: 'dropItLikeItsHot',
      });

      newTestUser.save()
      .then(function(newUser){
        expect(newUser.password).to.not.equal(stringPassword);
        done();
      });
    });

    it('should makes sure that compare password matches the hashed password with the String Version', function(done){
      var stringPassword = 'dropItLikeItsHot';
      var newTestUser = new User({
        firstName: 'Snoop',
        lastName: 'Dogg',
        email: 'foshizzle@dogg.com',
        password: 'dropItLikeItsHot',
      });


      newTestUser.save()
      .then(function(newUser){
        return newUser.comparePasswords(stringPassword); 
      })
      .then(function(match){
        expect(match).to.equal(true);
        done();
      });
    });
  });
});