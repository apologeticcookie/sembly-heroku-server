// testData.js
var mongoose = require('mongoose');
var User = require('./server/schemas/userSchema');
var Event = require('./server/schemas/eventsSchema');
var eventModels = require('./server/models/eventModels');
var friendModels = require('./server/models/friendModels');
mongoose.Promise = require('bluebird');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/sembly');

var sampleUser =
{
  firstName: 'Riyaz',
  lastName: 'Ahmed',
  email: 'h.a.riyaz@gmail.com',
  password: 'test',
  photoUrl: 'http://www.metalinjection.net/wp-content/uploads/2015/06/metal-horn-emoji.jpg'
};


mongoose.connection.on('connected', function() {
  User.remove({}).exec()
  .then(() => {
    return Event.remove({}).exec();
  })
  .then(()=> {
    users = (user => new User(user));
    return User.create(users);
  })
})
