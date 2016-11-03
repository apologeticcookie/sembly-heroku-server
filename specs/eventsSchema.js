var chai = require('chai');
var expect = chai.expect;
var Event = require('../server/schemas/eventsSchema.js');
var mongoose = require('mongoose');

describe('Event Schema', function () {
  it('schema should have properties id, name, location, startTime, endTime, tags, invitedUsers, checkedInUsers, image, visibility and savedUsers', function() {
    expect(Event.schema.obj).to.have.all.keys(['id', 'name', 'location', 'startTime', 'endTime', 'tags','image', 'invitedUsers', 'checkedInUsers', 'visibility', 'savedUsers']);
  });
});

describe('Event Model', function () {
  it('should set an endTime if one is specified', function(done) {
    var newStartTime = new Date();
    var newEndTime = new Date(newStartTime);
    newEndTime.setHours(newEndTime.getHours() + 2);
    var eventDataWithTime = {name:'Basketball', location: [82.894, 47.7749], tags:['fun', 'sports'], startTime: newStartTime, endTime: newEndTime};
    var event = new Event(eventDataWithTime);
    event.save()
      .then(function (newEvent) {
        expect(newEvent.endTime.getDate()).to.equal(newEndTime.getDate());
        done();
      })
  });
  it('should set an endTime 6 hours after startTime, if no endTime is set', function(done) {
    var eventDataWithoutTime = {name:'Basketball', location: [82.894, 47.7749], tags:['fun', 'sports']};
    var event = new Event(eventDataWithoutTime);
    event.save()
      .then(function (newEvent) {
        var newEndTime = newEvent.endTime.getHours();
        var newStartTime = newEvent.startTime.getHours();
        if (newEndTime < newStartTime){
          newEndTime+=24;
        }
        var timeDifference = newEndTime - newStartTime;
        expect(timeDifference).to.equal(6);
        done();
      })
  });
});
