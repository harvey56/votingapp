'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _userAuth = require('./routes/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

var _poll = require('./routes/poll');

var _poll2 = _interopRequireDefault(_poll);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _prod = require('./config/prod');

var _prod2 = _interopRequireDefault(_prod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//import devConfig from './config/dev';


var port = process.env.port || 8080;
var NODE_ENV = process.env.NODE_ENV || 'production';
console.log("NODE_ENV: ", NODE_ENV);

app.use(_bodyParser2.default.json());

// enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/authuser', _userAuth2.default);
app.use('/api', _poll2.default);

//if (NODE_ENV === 'development'){	
//	devConfig(app);
//}
//else{
(0, _prod2.default)(app);
//}

app.get("/*", function (req, res) {
  res.sendFile(_path2.default.join(__dirname, "./index.html"));
});

app.listen(port);