const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const app = express();
const https = require("https");
//Initialize Express App for XSA UAA and HDBEXT Middleware
const xsenv = require("@sap/xsenv");
const passport = require("passport");
const JWTStrategy = require('@sap/xssec').JWTStrategy;
const xsHDBConn = require("@sap/hdbext");
var routes = require('./routes/api/v1/indexRouter');
const path = require('path');

const port = process.env.PORT || 3000;


// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//load environment variables
xsenv.loadEnv(path.join(__dirname, '../default-env.json'));

//Apply JWT startegy
passport.use(
	new JWTStrategy(
		xsenv.getServices({
			uaa: {
				tag: 'xsuaa',
			},
		}).uaa
	)
);


//Add Passport JWT processing
app.use(passport.initialize());


app.use(
  //xsHDBConn.middleware(hanaOptions.hana),
  passport.authenticate("JWT", {
  session: false
  })
  );

/*
app.post('/test',  (req, res) => {
  res.send('Authenticated');
});

*/

app.use('/', routes);


// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    console.log("received request body===: ",req.body);
    console.log({status:404,message:`NO ROUTE IS MATCHED: ${req.originalUrl} ,method ${req.method}`});
    res.status(404).end({status:404,message:`NO ROUTE IS MATCHED: ${req.originalUrl} ,method ${req.method}`});

	//next(err);
});
app.listen(port, () => {
  console.log('Server started on: ' , port);
});
