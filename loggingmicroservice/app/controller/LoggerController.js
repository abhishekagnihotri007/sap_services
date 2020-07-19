'use strict';
const express = require('express');
const app = express();
const logging = require('@sap/logging');
const AppUtility = require('../util/AppUtility');

const apputilObj = new AppUtility();

class LoggerController {
 
  constructor(reqdata) {
     this.request = reqdata;
     this.appContext = logging.createAppContext({req:reqdata});
     app.use(logging.middleware({ appContext: this.appContext , logNetwork: true }));
  }

  async  postLogData() {
      try{
        console.log("log req data from console.");
         
        let servityLevel;
        //var logger = this.appContext.createLogContext({req:this.request});
        var logger = this.appContext.createLogContext().getLogger('/Application/Network');
        // console.log("logger obj after  creating log contex...",logger);
      //  var tracer = this.appContext.createLogContext().getTracer(__filename);
      console.log("servity level chk     ",this.request.body.severtiLevel);
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
            var infostring =  await logger.error(this.request.body.message);
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
       
        //console.log("loggerinfo obj/str...",infostring);
       //  tracer.info('Processing GET request to /demo');
    
        let logPacket = `${new Date()}-${this.request.body.applicationName} - ${this.request.body.serviceName} - ${servityLevel}
                         -  ${this.request.body.message}`;
        await apputilObj.writeData(logPacket);
        return true;
      }catch (err){
       console.log('error  in postLog Data ',err);
      }
    
  }


}




module.exports = LoggerController;
