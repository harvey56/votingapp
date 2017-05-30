import express from 'express';
import path from 'path';

import users from './routes/userAuth';
import poll from './routes/poll';
//import validationLogin from './validation/login';
//import validationSignup from './validation/signup';
import bodyParser from 'body-parser';

import devConfig from './config/dev';
import prodConfig from './config/prod';
import fallback from 'express-history-api-fallback'
import compression from 'compression';

let app = express();
app.use(compression());

var PORT = +process.env.PORT || 8000;
var NODE_ENV = process.env.NODE_ENV || 'production';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable CORS
//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});


//app.use(helmet.contentSecurityPolicy({
//	directives: {
//		defaultSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
//		styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
//	}
//}));

app.use(users);
app.use(poll);
//app.use(validationLogin);
//app.use(validationSignup);

if (NODE_ENV === 'development'){	
	devConfig(app);
}
else{
	prodConfig(app);
}

if (NODE_ENV === 'production'){
	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname, "../client/index.html"));
	});

	app.use(express.static(path.join(__dirname, '../client')));
	//app.use(express.static(path.join(__dirname, './')));
}
else{
	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname, "/index.html"));
	});

	app.use(express.static(path.join(__dirname, '../client')));
}


app.listen(PORT, function(err){
	if (err) throw err;
	console.log(`Server is Listening on port ${PORT} in ${NODE_ENV} mode`);
});

export default app;