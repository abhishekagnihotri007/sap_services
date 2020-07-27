'use strict';
const express = require('express');
const app = express();
const logging = require('@sap/logging');
var  prepareResponseObj = require('../resources/response');
//const fs = require("fs");



  module.exports = {

  async  postLogData(req,res) {
      try{
       
      
        let servityLevel;
        var appContext = logging.createAppContext({req:req});
        app.use(logging.middleware({ appContext: appContext,logNetwork:true}));
        var tracer = appContext.createLogContext().getTracer(__filename);
       
     /*   var access = fs.createWriteStream('traceLog.txt',{flags:'a'});
        process.stdout.write = process.stderr.write = access.write.bind(access);
        process.stdout.pipe(access);
        
        */

        switch(req.body.severtiLevel){
           case 0:
             servityLevel = 'debug';
             var infostring =  await tracer.debug(req.body.message);
             break;
           case 1:
             servityLevel = 'path';
             var infostring =  await tracer.path(req.body.message);
             break; 
           case 2:
              servityLevel = 'info';
              var infostring =  await tracer.info(req.body.message);
              break;        
           case  3 :
            servityLevel = 'warning';
            var infostring =  await tracer.warning(req.body.message);
            break;
          case  4 :
            servityLevel = 'error';
            var infostring =  await tracer.error(req.body.message);
            break;
          case  5 :
            servityLevel = 'fatal';  
            var infostring =  await tracer.fatal(req.body.message);  
            break;
          default : 
           servityLevel = 'debug';
           var infostring =  await tracer.debug(req.body.message);
           break;

         }

        return true;
      }catch (err){
       console.log('error  in tracing request ',err);
       prepareResponseObj.success = false;
       prepareResponseObj.message = message.exception;
       prepareResponseObj.ExceptionMessage = JSON.stringify(err);
       prepareResponseObj.status = "502";
       res.status(502).json(prepareResponseObj);

      }
    
  }


}


