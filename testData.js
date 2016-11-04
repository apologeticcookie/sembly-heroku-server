// testData.js
var mongoose = require('mongoose');
var User = require('./server/schemas/userSchema');
var Event = require('./server/schemas/eventsSchema');
var eventModels = require('./server/models/eventModels');
var friendModels = require('./server/models/friendModels');
mongoose.Promise = require('bluebird');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/sembly');

//DATA

var users = [
  {
    firstName: 'Spenjamin',
    lastName: 'Franklin',
    location: [-122.4066, 37.7786],
    email: 'spencer@test.com',
    password: 'test',
    photoUrl: 'http://www.cutestpaw.com/wp-content/uploads/2015/04/Doug-the-Pug.png'
  },
  {
    firstName: 'Omar',
    lastName: 'Mohamed',
    location: [-122.1066, 37.7712],
    email: 'omar@test.com',
    password: 'test',
    photoUrl: 'https://avatars0.githubusercontent.com/u/16041716?v=3&s=400'
  },
  {
    firstName: 'Carl',
    lastName: 'Flores',
    location: [-121.4266, 37.7386],
    email: 'carlos@test.com',
    password: 'test',
    photoUrl: 'https://avatars0.githubusercontent.com/u/18621668?v=3&s=400'
  },
  {
    firstName: 'Kanye',
    location: [-122.4066, 37.7996],
    lastName: 'West',
    email: 'god@god.com',
    password: 'test',
    photoUrl: 'http://thesource.com/wp-content/uploads/2016/08/kanye-west2.jpg'
  }
];

var userIds = [];

var events = [
  {
    name:'Basketball',
    location: [-122.4066, 37.7786],
    tags:['sports','basketball'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png'
  },
  {
    name:'Happy Hour',
    location: [-122.3980, 37.7794],
    tags:['drinks', 'entertainment'],
    image: 'http://images.r.cruisecritic.com/features/2016/06/bottoms-up-hero.jpg'
  },
  {
    name:'Street Dancing',
    location: [-122.4075, 37.7878],
    tags:['dancing', 'entertainment'],
    image: 'http://thedancecompanysaltlakecity.com/wp-content/uploads/2015/05/boys_street_dance_pp.png'
  },
  {
    name:'Yodel Off',
    location: [-122.4120, 37.7918],
    tags:['music', 'singing'],
    image: 'http://pad2.whstatic.com/images/thumb/a/a4/Yodel-Step-5.jpg/aid12588-728px-Yodel-Step-5.jpg'
  },
  {
    name:'Birthday Party',
    location: [-122.4020, 37.7877],
    tags:['party', 'entertainment'],
    image: 'https://media.giphy.com/media/xT0BKqhdlKCxCNsVTq/giphy.gif'
  },
  {
    name:'Concert',
    location: [-122.4101, 37.7825],
    tags:['concert', 'music'],
    image: 'http://www.ticketswest.com/media/1028/concert_Featured%20Event%20Tile.jpg'
  }

];

mongoose.connection.on('connected', () => {
  //Populate Database
  User.remove({}).exec()
  .then(() => {
    return Event.remove({}).exec();
  })
  .then(()=> {
    users = users.map(user => new User(user));
    return User.create(users);
  })
  .then(users => {
    console.log('Test User id = ', users[0]._id);
    users.forEach(user => {
      userIds.push(user._id);
    });
    events[0].invitedUsers = userIds;
    events[1].invitedUsers = userIds;
    events[4].invitedUsers = userIds;
    return Promise.all(events.map(event => eventModels.addEvent(event)));
  })
  .then(events => {
    return Event.findOne({'name': 'Basketball'});
  })
  .then(event => {
    return eventModels.saveEvent(event._id, users[0]._id);
  })
  .then(success => {
    return Promise.all([friendModels.addFriend(users[0]._id, users[2]._id), friendModels.addFriend(users[1]._id, users[0]._id), friendModels.addFriend(users[0]._id, users[3]._id)]);
  })
  .then(success => {
    return Promise.all([friendModels.acceptFriend(users[2]._id, users[0]._id), friendModels.acceptFriend(users[3]._id, users[0]._id)]);
  })
  .then(success => {
    console.log('Database populated');
    process.exit();
    if (!process.env.MONGODB_URI) {
      process.exit();
    }
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
});
