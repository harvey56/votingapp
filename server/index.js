import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev.js';

import users from './routes/userAuth';
import poll from './routes/poll';
import bodyParser from 'body-parser';


let app = express();

var port = process.env.port || 8000;

const compiler = webpack(webpackConfig);

app.use(bodyParser.json());

// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/authuser', users);
app.use('/api', poll);

app.use(webpackMiddleware(compiler, {
	hot: true,
	publicPath: webpackConfig.output.publicPath,
	noinfo: true
}));

app.use(webpackHotMiddleware(compiler));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(port);