var express = require('express');
var app = express();
var settings = require('./config.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var path = require('path');


var User = require('./models/user.js');
var routes = require('./routes.js');

app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;
mongoose.connect(settings.url);

var db = mongoose.connection;
db.on('error', function(err){
  console.log('connection failed!', err);
});
db.once('open', function() {
  var user = new User({
    username: 'peter',
    password: 'aaaaaa'
  });
  user.save();
  console.log('success!')
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));

routes(app);

app.listen(settings.port, function() {
  console.log('express server is running on port ' + settings.port);
});
