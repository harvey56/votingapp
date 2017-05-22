export default (app) => {

	const webpack = require('webpack');
	const webpackMiddleware = require( 'webpack-dev-middleware');
	const webpackHotMiddleware = require( 'webpack-hot-middleware');
	const webpackConfig = require( '../../webpack.config.js');


	const compiler = webpack(webpackConfig);	

	app.use(webpackMiddleware(compiler, {
		hot: true,
		publicPath: webpackConfig.output.publicPath,
		noinfo: true
	}));

	app.use(webpackHotMiddleware(compiler));

}