'use strict';
const express = require('express');
const app = express();
const logging = require('@sap/logging');
const AppUtility = require('../util/AppUtility');
const fs = require("fs");

const apputilObj = new AppUtility();

class TraceController {
 
  constructor(reqdata) {
     this.request = reqdata;
     this.appContext = logging.createAppContext({req:reqdata});
     app.use(logging.middleware({ appContext: this.appContext,logNetwork:false}));
  }

  async  postLogData() {
      try{
         
        let servityLevel;
     
        var tracer = this.appContext.createLogContext().getTracer(__filename);
       // console.log('tracer--------',tracer);
        tracer.info('Processing GET request to /demo');
      var access = fs.createWriteStream('traceLog.txt');
      process.stdout.write = process.stderr.write = access.write.bind(access);
      process.stdout.pipe(access);
      
         switch(this.request.body.severtiLevel){
           case 0:
             servityLevel = 'info';
             var infostring =  await tracer.info(this.request.body.message);
             break;
           case  1 :
            servityLevel = 'warning';
            var infostring =  await tracer.warning(this.request.body.message);
            break;
          case  2 :
            servityLevel = 'error';
            var infostring =  await tracer.error(this.request.body.message);
            break;
          case  3 :
            servityLevel = 'fatal';  
            var infostring =  await tracer.fatal(this.request.body.message);  
            break;
          default : 
           servityLevel = 'info';
           var infostring =  await tracer.info(this.request.body.message);
           break;

         }
       
       // await apputilObj.writeData(logPacket);
        return true;
      }catch (err){
       console.log('error  in tracing request ',err);

      }
    
  }


}




module.exports = TraceController;
