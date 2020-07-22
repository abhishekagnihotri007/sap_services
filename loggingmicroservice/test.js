var logging = require('@sap/logging');
var express = require('express');
 
var app = express();
 
var appContext = logging.createAppContext();
 
app.use(logging.middleware({ appContext: appContext, logNetwork: false }));
 
app.post('/demo', function (req, res) {
  var logger = req.loggingContext.getLogger('/Application/Network');
  var tracer = req.loggingContext.getTracer(__filename);
 console.log("filename------------",__filename);
  //logger.info('Retrieving demo greeting ...');
  tracer.info('Processing GET request to /demo');
 
  res.send('Hello World!');
});
 
app.listen(3000, function() {
  console.log('Server started 3000');
});