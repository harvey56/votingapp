'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpackConfig = require('../webpack.config.js');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _userAuth = require('./routes/userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

var _poll = require('./routes/poll');

var _poll2 = _interopRequireDefault(_poll);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = process.env.port || 8080;
var NODE_ENV = process.env.NODE_ENV || 'production';

var compiler = (0, _webpack2.default)(_webpackConfig2.default);

app.use(_bodyParser2.default.json());

// enable CORS
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('/authuser', _userAuth2.default);
app.use('/api', _poll2.default);

if (NODE_ENV === 'development') {

	app.use((0, _webpackDevMiddleware2.default)(compiler, {
		hot: true,
		publicPath: _webpackConfig2.default.output.publicPath,
		noinfo: true
	}));

	app.use((0, _webpackHotMiddleware2.default)(compiler));
} else {
	app.use((0, _compression2.default)());
}

app.get("/*", function (req, res) {
	res.sendFile(_path2.default.join(__dirname, "./index.html"));
});

app.listen(port);