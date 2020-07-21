
const LoggerController = require('../../../controller/LoggerController');
var  prepareResponseObj = require('../../../resources/response');
//const postLogData 
module.exports = {
     postLogData:  async function (req,res){
                    try{

                    const loogectrlrObj = new LoggerController(req,res);
                    let postLogResult = await loogectrlrObj.postLogData();

                    
                    prepareResponseObj.success = false;
                    prepareResponseObj.message = 'message log successfully';
                    prepareResponseObj.ExceptionMessage = JSON.stringify(err);
                    prepareResponseObj.status = "200";
                    res.status(200).json(prepareResponseObj);  
                    }catch(err){
                        console.log(`error occured in logging message...: ${JSON.stringify(err)}`);
                        prepareResponseObj.success = false;
                        prepareResponseObj.message = 'error occured in logging message';
                        prepareResponseObj.ExceptionMessage = JSON.stringify(err);
                        prepareResponseObj.status = "502";
                        res.status(502).json(prepareResponseObj);    
                   }
                
                
        }
}



