
const TraceController = require('../../../controller/TraceController');
var  prepareResponseObj = require('../../../resources/response');
//const postLogData 
module.exports = {
     postLogData:  async function (req,res){
                    try{

                   // const tracectrlrObj = new TraceController(req,res);
                    let postLogResult = await TraceController.postLogData(req,res);

                    
                    prepareResponseObj.success = true;
                    prepareResponseObj.message = 'request traces successfully';
                    prepareResponseObj.status = "200";
                    res.status(200).json(prepareResponseObj);  
                    }catch(err){
                        console.log(`error occured in tracesing message...: ${JSON.stringify(err)}`);
                        prepareResponseObj.success = false;
                        prepareResponseObj.message = 'error occured in tracing message';
                        prepareResponseObj.ExceptionMessage = JSON.stringify(err);
                        prepareResponseObj.status = "502";
                        res.status(502).json(prepareResponseObj);    
                   }
                
                
        }
}



