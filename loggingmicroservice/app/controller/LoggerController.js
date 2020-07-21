'use strict';
const express = require('express');
const app = express();
const logging = require('@sap/logging');
const AppUtility = require('../util/AppUtility');
const fs = require("fs");

const apputilObj = new AppUtility();

class LoggerController {
 
  constructor(reqdata) {
     this.request = reqdata;
     this.appContext = logging.createAppContext({req:reqdata});
     app.use(logging.middleware({ appContext: this.appContext,logNetwork:false}));
  }

  async  postLogData() {
      try{
         
        let servityLevel;
        //var logger = this.appContext.createLogContext({req:this.request});
// var logger = this.appContext.createLogContext().getLogger(`/Application/${this.request.body.componentName}`);
        var logger = this.appContext.createLogContext().getLogger(`/Application/Network`);
       console.log("logger obj after  creating log contex...",logger);
      //  var tracer = this.appContext.createLogContext().getTracer(__filename);
   
      var access = fs.createWriteStream('customLogs.txt');
      process.stdout.write = process.stderr.write = access.write.bind(access);
      process.stdout.pipe(access);
      
         switch(this.request.body.severtiLevel){
           case 0:
             servityLevel = 'info';
             var infostring =  await logger.info(this.request.body.message);
             break;
           case  1 :
            servityLevel = 'warning';
            var infostring =  await logger.warning(this.request.body.message);
            break;
          case  2 :
            servityLevel = 'error';
           // var infostring =  await logger.error(this.request.body.message);
            var infostring =  await logger.getLogString(this.request.body.message);  
           // console.log("info--------",infostring);
            break;
          case  3 :
            servityLevel = 'fatal';  
            var infostring =  await logger.fatal(this.request.body.message);  
            break;
           default : 
           servityLevel = 'info';
           var infostring =  await logger.info(this.request.body.message);
           break;

         }
       
       // await apputilObj.writeData(logPacket);
        return true;
      }catch (err){
       console.log('error  in postLog Data ',err);

      }
    
  }


}




module.exports = LoggerController;
