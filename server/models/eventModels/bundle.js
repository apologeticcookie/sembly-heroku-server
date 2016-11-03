// bundle.js
var Promise = require('bluebird');

var Event = require('../../schemas/eventsSchema');
var User = require('../../schemas/userSchema');
var getEvents = require('./getEvents');

module.exports = (userId, location) => {
  var invited;
  var saved;
  return User.findOne({'_id': userId})
  .populate('invitedTo')
  .populate('saved')
  .exec()
  .then( user => {
  	invited = user.invitedTo;
  	saved = user.saved;
  	return getEvents(location);
  })
  .then( events => {
  	return new Promise((resolve, reject) => {
  	  //Filter out repeats
  	  var unique = {};
  	  events.forEach(event => {
  	  	event.marking = 'public';
  	  	unique[event._id] = event;
  	  });
  	  invited.forEach( event => {
  	  	event.marking = 'invited';
  	  	unique[event._id] = event;
  	  });
  	  saved.forEach( event => {
  	  	event.marking = 'saved';
  	  	unique[event._id] = event;
  	  });
  	  var results = [];
  	  for (var i in unique) {
  	  	results.push(unique[i]);
  	  }
  	  resolve(results);
  	})
  })
}