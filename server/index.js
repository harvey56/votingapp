import express from 'express';
import path from 'path';

import users from './routes/userAuth';
import poll from './routes/poll';
import bodyParser from 'body-parser';

import devConfig from './config/dev';
import prodConfig from './config/prod';


let app = express();

var port = +process.env.port || 8080;
var NODE_ENV = process.env.NODE_ENV || 'production';
console.log("NODE_ENV: ", NODE_ENV);

app.use(bodyParser.json());

// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('dist/client'));

app.use('/authuser', users);
app.use('/api', poll);

if (NODE_ENV === 'development'){	
	devConfig(app);
}
else{
	prodConfig(app);
}

//app.get("/*", (req, res) => {
//	res.sendFile(path.join(__dirname, "./index.html"));
//});

app.use(express.static(path.join(__dirname, '../dist/client/index.html')));

app.listen(port);