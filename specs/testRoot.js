var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.Promise = bluebird;


before(function(done) {
  mongoose.connect('mongodb://localhost/semblyTest');
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.on('connected', function callback () {
    console.log('Mongoose connection open on mongodb://localhost/semblyTest!');
    done();
  });
})


after(function(done){
  mongoose.connection.close();
  done();
});