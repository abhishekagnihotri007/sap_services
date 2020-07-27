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
        var logger = appContext.createLogContext().getLogger(`/Application/${req.body.csnComponent}`);
       
     /*   var access = fs.createWriteStream('traceLog.txt',{flags:'a'});
        process.stdout.write = process.stderr.write = access.write.bind(access);
        process.stdout.pipe(access);
        
        */

       switch(req.body.severtiLevel){
        case 0:
          servityLevel = 'info';
          var infostring =  await logger.info(req.body.message);
          break;
        case  1 :
         servityLevel = 'warning';
         var infostring =  await logger.warning(req.body.message);
         break;
       case  2 :
         servityLevel = 'error';
         var infostring =  await logger.error(req.body.message);
        // var infostring =  await logger.getLogString(req.body.message);  
        // console.log("info--------",infostring);
         break;
       case  3 :
         servityLevel = 'fatal';  
         var infostring =  await logger.fatal(req.body.message);  
         break;
       default : 
        servityLevel = 'info';
        var infostring =  await logger.info(req.body.message);
        break;

      }

        return true;
      }catch (err){
       console.log('error  in logging request ',err);
       prepareResponseObj.success = false;
       prepareResponseObj.message = message.exception;
       prepareResponseObj.ExceptionMessage = JSON.stringify(err);
       prepareResponseObj.status = "502";
       res.status(502).json(prepareResponseObj);

      }
    },

  async getLogData(req,res){

    try{

    //  var data =   await fs.readFileSync('./customLogs.txt', {encoding:'utf8', flag:'r'});
        var data  = JSON.stringify(req.query); 
        return data;
      }catch(err){
        prepareResponseObj.success = false;
        prepareResponseObj.message = message.exception;
        prepareResponseObj.ExceptionMessage = JSON.stringify(err);
        prepareResponseObj.status = "502";
        res.status(502).json(prepareResponseObj);
    }
  }


}


