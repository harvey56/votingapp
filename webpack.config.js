const path = require('path');
const webpack = require ('webpack');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');

let plugins;
let entry;
let devServer;
let devtool;

	if (process.env.NODE_ENV === 'production'){
		plugins = [
		    new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true }),
		    new webpack.DefinePlugin({
		      'process.env.NODE_ENV': JSON.stringify('production'),
		    }),
		    new webpack.optimize.UglifyJsPlugin(),
		];
		entry = [
			path.join(__dirname, '/client/index.js')
		];
		devServer = {
    		contentBase: './dist/client',
		};
		devtool = 'source-map';
	}

	else {
		plugins = [
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.HotModuleReplacementPlugin()
		];
		entry = [
			'webpack-hot-middleware/client?reload=true',
			path.join(__dirname, '/client/index.js')
		];
		devServer = {
    		contentBase: './client',
		},
		devtool = 'cheap-module-eval-source-map';
	}

module.exports = {

	plugins,
	entry,
	devServer,
	devtool,
	target: 'web',
	output: {
		filename: "bundle.js",
		path: path.join(__dirname, '/dist/client'),
		publicPath: "/"
	},
	module: {
		loaders:[
			{
				test: /\.js$/,		
				include: [
					path.join(__dirname, "client"),
					path.join(__dirname, "server/validation")
				],
				loaders: ['babel-loader']
			},
			{
                test: /\.css$/,
                loader: 'style-loader!css-loader!sass-loader'
			},
			{
				test: /\.(png|jpg)$/, 
				loader: 'url-loader?'
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?(\?.*$|$)/, 
				loader: 'url-loader?limit=10000&mimetype=application/font-woff',
			}
		]
	},


	resolve:{
		extensions: ['.js']
	}
}
