'use strict';
const express = require('express');
const app = express();
const logging = require('@sap/logging');
var  prepareResponseObj = require('../resources/response');
const path = require('path');
//const fs = require("fs");
let TextBundle = require("@sap/textbundle").TextBundle;

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
        let mid = req.headers['mid'];
        console.log("get locale data======",mid);
        let bundle = new TextBundle("../i18n/messages", getLocale(req));
        let data = bundle.getText(mid, ["333","log info from hana db"]);
        return data;
      }catch(err){
        console.log("err in catch block of getLogData in controller--------------",err);
        prepareResponseObj.success = false;
        prepareResponseObj.message = message.exception;
        prepareResponseObj.ExceptionMessage = JSON.stringify(err);
        prepareResponseObj.status = "502";
        res.status(502).json(prepareResponseObj);
    }
  }

}
function getLocale(req) {
  let langparser = require("accept-language-parser");
  let lang = req.headers["accepted-locale"];
  if (!lang) {
    return null;
  }
  let arr = langparser.parse(lang);
  if (!arr || arr.length < 1) {
    return null;
  }
  let locale = arr[0].code;
  if (arr[0].region) {
    locale += "_" + arr[0].region;
  }
 // console.log(JSON.stringify(req.headers)+"----------------"+locale+"----"+lang);
  return locale;
}

