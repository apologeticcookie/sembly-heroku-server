// getEvents.js
var Event = require('../../schemas/eventsSchema');

module.exports = (location, radius) => {
  var radius = radius || 2000;
  return Event.find({$and: [
  	{'visibility': 'public'},
  	{ location: {
  	  $near: 
  	    {
          $geometry: {
            type: "Point" ,
            coordinates: location
         },
         $maxDistance: radius
       }}}
  	]})
}