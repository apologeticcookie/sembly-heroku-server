var eventsController = require('./controllers/eventsController');
var friendController = require('./controllers/friendController');
var userController = require('./controllers/userController');

module.exports = function (app, express) {
  //Handle Auth and login/signup
  app.post('/api/users/login', userController.logIn);
  app.post('/api/users/signup', userController.signUp);
  app.get('/api/users/signedin', userController.checkAuth);
  app.put('/api/users/update', userController.updateUser);
  app.get('/api/users/:search', userController.getUsers);

  //Handle Friend actions
  app.post('/api/friends/getFriends', friendController.getFriends);
  app.post('/api/friends/getRequests', friendController.getRequests);
  app.post('/api/friends/friendRequest', friendController.friendRequest);
  app.post('/api/friends/rejectRequest', friendController.rejectRequest);
  app.post('/api/friends/acceptRequest', friendController.acceptRequest);
  app.post('/api/friends/removeFriend', friendController.removeFriend);

  //Handle events requests
  app.get('/api/events/:eventId', eventsController.getEvent);
  app.post('/api/events', eventsController.addEvent);
  app.post('/api/events/saveEvent', eventsController.saveEvent);
  app.post('/api/events/checkIn', eventsController.checkIn);
  app.post('/api/events/bundle', eventsController.getBundle);
  app.post('/api/events/saved', eventsController.getSaved);
  app.post('/api/events/invited', eventsController.getInvited);
  app.post('/api/events/location', eventsController.getEvents);
  app.post('/api/events/endEvent', eventsController.endEvent);
};
