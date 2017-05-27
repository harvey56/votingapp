'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _dev = require('./config/dev');

var _dev2 = _interopRequireDefault(_dev);

var _prod = require('./config/prod');

var _prod2 = _interopRequireDefault(_prod);

var _expressHistoryApiFallback = require('express-history-api-fallback');

var _expressHistoryApiFallback2 = _interopRequireDefault(_expressHistoryApiFallback);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _compression2.default)());

var PORT = +process.env.PORT || 8000;
var NODE_ENV = process.env.NODE_ENV || 'production';

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// enable CORS
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//app.use(helmet.contentSecurityPolicy({
//	directives: {
//		defaultSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
//		styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
//	}
//}));

//app.use('/authuser', users);
//app.use('/api', poll);
app.use(_userAuth2.default);
app.use(_poll2.default);

if (NODE_ENV === 'development') {
	(0, _dev2.default)(app);
} else {
	(0, _prod2.default)(app);
}

if (NODE_ENV === 'production') {
	app.get("/*", function (req, res) {
		res.sendFile(_path2.default.join(__dirname, "../client/index.html"));
	});

	app.use(_express2.default.static(_path2.default.join(__dirname, '../client')));
} else {
	app.get("/*", function (req, res) {
		res.sendFile(_path2.default.join(__dirname, "/index.html"));
	});

	app.use(_express2.default.static(_path2.default.join(__dirname, '../client')));
}

console.log("dirname: ", _path2.default.join(__dirname, '../client'));
//app.use(fallback(path.join(__dirname, '../dist/client/index.html')));
//app.use(express.static(__dirname + '../dist/client'));
//app.use(express.static(path.join(__dirname, '../client/')));

app.listen(PORT, function (err) {
	if (err) throw err;
	console.log('Server is Listening on port ' + PORT + ' in ' + NODE_ENV + ' mode');
});

exports.default = app;