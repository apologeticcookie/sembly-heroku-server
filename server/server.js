var express = require('express');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.Promise = bluebird;

var app = express();

var port = process.env.PORT || 3000;
// connect to mongo database named "sembly"
if (process.env.PRODUCTION === 'true') {
  mongoose.connect(process.env.MONGODB_URI.toString());
} else if (process.argv[2] === 'production') {
  mongoose.connect('mongodb://localhost/sembly');
}

// configure our server with all the middleware and routing
require('./middleware.js')(app, express);
require('./routes.js')(app, express);

// start listening to requests on port 3000
mongoose.connection.on('connected', () => {
	if (process.env.MONGODB_URI) {
		require('../testData.js');
	}
	app.listen(port, () => {
    console.log('App is listening on port 3000');
  });
});

// export our app
module.exports = app;
