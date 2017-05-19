import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

let plugins;
let entry;

	if (process.env.NODE_ENV === 'production'){
		plugins = [
		    new ExtractTextPlugin('bundle.css', { allChunks: true }),
		    new webpack.optimize.OccurenceOrderPlugin(),
		    new webpack.DefinePlugin({
		      'process.env.NODE_ENV': JSON.stringify('production'),
		    }),
		    new webpack.optimize.DedupePlugin(),
		    new webpack.optimize.UglifyJsPlugin(),
		],
		entry = [
			path.join(__dirname, '/client/index.js')
		]
	}

	else {
		plugins = [
			new webpack.NoEmitOnErrorsPlugin(),
			//new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin()
		],
		entry = [
			'webpack-hot-middleware/client?reload=true',
			path.join(__dirname, '/client/index.js')
		]
	}

module.exports = {

	plugins,
	entry,
	output: {
		filename: "bundle.js",
		path: "/",
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

/*import path from 'path';
import webpack from 'webpack';

export default {
	entry: [
		'webpack-hot-middleware/client?reload=true',
		path.join(__dirname, '/client/index.js')
	],
	output: {
		filename: "bundle.js",
		path: "/",
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
			}
		]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		//new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],

	resolve:{
		extensions: ['.js']
	}
}*/