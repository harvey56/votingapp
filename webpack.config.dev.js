import path from 'path';
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
}