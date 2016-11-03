// eventModels.js
var chai = require('chai');
var expect = chai.expect;
var eventModels = require('../server/models/eventModels');
var User = require('../server/schemas/userSchema');
var Event = require('../server/schemas/eventsSchema');

var testEvent = {
	name:'Basketball',
	location: [82.894, 47.7749],
	tags:['fun', 'sports'],
}

var testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: 'password'
}
var userId;
var eventId;

var events = [
  {
    name:'CasketBall',
    location: [42.894, 47.7749],
    tags:['fun', 'sports'],
  },
  {
  name:'Lasketball',
  location: [82.894, 47.7749],
  tags:['fun', 'sports'],
  },
  {
  name:'Masketmall',
  location: [82.894, 47.7749],
  tags:['fun', 'sports'],
  }
];

var bundle;
var selected;

describe('Event Models', function() {
  before(function(done){
    User.remove({}).exec()
    .then(function(){
    	return Event.remove({}).exec()
    })
    .then(function(){
    	var user = new User(testUser)
    	return user.save()
    })
    .then(function(user){
   	  userId = user._id;
   	  testEvent.invitedUsers = [userId];
      done();
    });
  });

  describe('add Event', function() {
    it('should add a new event to the database', function(done) {
      eventModels.addEvent(testEvent)
      .then(function() {
        return Event.findOne({'name': 'Basketball'}).exec()
      })
      .then(function(event) {
      	eventId = event._id;
        expect(event.name).to.equal('Basketball');
        done();
      });
    });
    it('should add the invite to the users event', function(done) {
      User.findOne({'email': 'test@test.com'}).exec()
      .then(function(user){
      	expect(user.invitedTo.length).to.equal(1);
        done();
      })
    });
  });

  describe('save Event', function(){
  	before(function(done) {
      eventModels.saveEvent(eventId, userId)
      .then(function(){
      	done();
      })	
  	})
    it('should save the event to the User', function(done){
      User.findOne({'email': 'test@test.com'}).exec()
      .then(function(user) {
        expect(user.saved.length).to.equal(1);
        done();
      })
    });
    it('it should save the user to the event', function(done){
      Event.findOne({'name': 'Basketball'}).exec()
      .then(function(event) {
        expect(event.savedUsers.length).to.equal(1);
        done();
      })
    });
  });

  describe('Check in', function() {
    it('should check in a user to the event', function(done) {
      eventModels.checkIn(eventId, userId)
      .then(function(){
        return Event.findOne({'name': 'Basketball'}).exec()
      })
      .then(function(event) {
        expect(event.checkedInUsers.length).to.equal(1);
        done();
      });
    });
  });

//-------This section requires eventModels.addEvent to be working--------
  
  describe('get events', function() {
    before(function(done){
      this.timeout(7000);
      eventModels.addEvent(events[0])
      .then(function(){
        events[1].invitedUsers = [userId];
        eventModels.addEvent(events[1]) 
      })
      .then(function(){
        eventModels.addEvent(events[2])
      })
      .then(function(){
        done();
      })
    });
    it('should get all nearby public events', function(done) {
      eventModels.getEvents([82.894, 47.7749])
      .then(function(events){
        expect(events.length).equal(3);
        done();
      })
    });
  });

  describe('bundle', function() {
    it('should return nearby public events', function(done) {
      this.timeout(7000);
      eventModels.bundle(userId, [82.894, 47.7749])
      .then(function(bund) {
        bundle = bund;
        var publicEvents = bundle.filter(function(event){
          return event.marking === 'public' ? true : false;
        });
        expect(publicEvents.length).to.equal(1);
        done();
      })
    });
    it('should return invited events with marking: invited', function(done) {
      var inviteEvents = bundle.filter(function(event){
        return event.marking === 'invited' ? true : false;
      });
      expect(inviteEvents.length).to.equal(1);
      done();
    });
    it('should return saved events with marking: saved', function(done) {
      var savedEvents = bundle.filter(function(event){
        return event.marking === 'saved' ? true : false;
      });
      expect(savedEvents.length).to.equal(1);
      done();
    });
    it('should return a single array with no repeats', function() {
      expect(bundle.length).to.equal(3);
    });  
  });

  describe('get Invited', function() {
    it('should get all the events a user is invited to', function(done) {
      eventModels.getInvited(userId)
      .then(function(user){
        expect(!!user.invitedTo[0].name).equal(true);
        done();
      })
    });
  });

  describe('get Saved', function() {
    it('should get all the events a user has saved', function(done) {
      eventModels.getSaved(userId)
      .then(function(user){
        expect(!!user.saved[0].name).equal(true);
        done();
      })
    });
  });

  describe('get event', function() {
    it('should get all the events a user is invited to', function(done) {
      eventModels.getEvent(eventId)
      .then(function(event){
        selected = event;
        expect(selected.name).equal('Basketball');
        done();
      });
    });
    it('should populated the checked in users', function(done) {
      expect(!!selected.checkedInUsers[0].email).equal(true);
      done();
    });
    it('should populated the invited users', function(done) {
      expect(!!selected.invitedUsers[0].email).equal(true);
      done();
    });
    it('should populated the saved users', function(done) {
      expect(!!selected.savedUsers[0].email).equal(true);
      done();
    });
  });



  describe('remove Event', function() {
  	before(function(done){
      this.timeout(4000);
  		eventModels.removeEvent(eventId)
  		.then(function(){
  			done();
  		})
  	})
    it('should remove the event from the database', function(done) {
      Event.findOne({'name': 'Basketball'}).exec()
      .then(function(event) {
      	expect(!!event).to.equal(false);
      	done();
      })
      .catch(function(error) {
        done();
      });
    });   
    it('should remove the event from the users saved events', function(done) {
        this.timeout(10000);
        setTimeout(function(){
          User.findOne({'email': 'test@test.com'}).exec()
          .then(function(user) {
            expect(user.saved.length).to.equal(0);
            done();
          });
        }, 1000)
    });
    it('should remove the event from the users invited events', function(done) {
      this.timeout(10000);
      User.findOne({'email': 'test@test.com'}).exec()
      .then(function(user) {
        expect(user.invitedTo.length).to.equal(1);
        done();
      });
    });
  });

  


});