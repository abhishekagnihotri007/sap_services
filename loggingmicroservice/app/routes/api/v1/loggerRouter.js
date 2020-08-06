
const LoggerController = require('../../../controller/LoggerController');
var  prepareResponseObj = require('../../../resources/response');
//const postLogData 
module.exports = {
     postLogData:  async function (req,res){
                    try{
                    let postLogResult = await LoggerController.postLogData(req,res);
                    prepareResponseObj.success = true;
                    prepareResponseObj.message = 'message log successfully';
                    prepareResponseObj.status = "200";
                    prepareResponseObj.data = 'message log successfully';
                    res.status(200).json(prepareResponseObj);  
                    }catch(err){
                        console.log(`error occured in logging message...: ${JSON.stringify(err)}`);
                        prepareResponseObj.success = false;
                        prepareResponseObj.message = 'error occured in logging message';
                        prepareResponseObj.ExceptionMessage = JSON.stringify(err);
                        prepareResponseObj.status = "502";
                        res.status(502).json(prepareResponseObj);    
                   }
                
                
        },
        getLogData:  async function (req,res){
          try{

         console.log("inside getLogData---");
          let postLogResult = await LoggerController.getLogData(req,res);

          
          prepareResponseObj.success = true;
          prepareResponseObj.message = 'log retrive successfully';
          prepareResponseObj.data = postLogResult;
          prepareResponseObj.status = "200";
          res.status(200).json(prepareResponseObj);  
          }catch(err){
              console.log(`error occured in retriving logg message...: ${JSON.stringify(err)}`);
              prepareResponseObj.success = false;
              prepareResponseObj.message = 'error occured in  retriving log message';
              prepareResponseObj.ExceptionMessage = JSON.stringify(err);
              prepareResponseObj.status = "502";
              res.status(502).json(prepareResponseObj);    
         }
      
      
}
}



