'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpackConfig = require('../../webpack.config.js');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
	var compiler = (0, _webpack2.default)(_webpackConfig2.default);

	app.use((0, _webpackDevMiddleware2.default)(compiler, {
		hot: true,
		publicPath: _webpackConfig2.default.output.publicPath,
		noinfo: true
	}));

	app.use((0, _webpackHotMiddleware2.default)(compiler));
};