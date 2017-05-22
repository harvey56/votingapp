import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.js';

export default (app) => {
	const compiler = webpack(webpackConfig);	

	app.use(webpackMiddleware(compiler, {
		hot: true,
		publicPath: webpackConfig.output.publicPath,
		noinfo: true
	}));

	app.use(webpackHotMiddleware(compiler));

}