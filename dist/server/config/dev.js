'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (app) {

	var webpack = require('webpack');
	var webpackMiddleware = require('webpack-dev-middleware');
	var webpackHotMiddleware = require('webpack-hot-middleware');
	var webpackConfig = require('../../webpack.config.js');

	var compiler = webpack(webpackConfig);

	app.use(webpackMiddleware(compiler, {
		hot: true,
		publicPath: webpackConfig.output.publicPath,
		noinfo: true
	}));

	app.use(webpackHotMiddleware(compiler));
};