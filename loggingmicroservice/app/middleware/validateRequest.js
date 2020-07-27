//const Joi = require('joi');
const SAPPassport = require('@sap/e2e-trace').Passport;
var  prepareResponseObj = require('../resources/response');

/*
 * Validate Incoming Request
 */ 
module.exports = {

    createLog: function(req, res, next) {
       
        try{
          /*  var encodedPassport = req.headers['sap-passport'];
            let passport;
            if (encodedPassport) {
                let passport = new SAPPassport(encodedPassport);
               // var identifiers = passport.readUniqueIdentifiers();
                //console.log("identifiers====="+JSON.stringify(identifiers));
            }*/
           /* const logSchema = Joi.object().keys({
                applicationName: Joi.string().required(),
                componentName:Joi.string().required(),
                severtiLevel:Joi.number(),
                message:Joi.string()
            });
            const result = Joi.validate(req.body, logSchema); 
            const { value, error } = result; 
            const valid = error == null; 
            */
          if ((req.body.applicationName=="" || req.body.applicationName===undefined)  ) {               
                prepareResponseObj.success = false;
                prepareResponseObj.message = 'Invalid request param recieved';
                prepareResponseObj.ExceptionMessage = JSON.stringify(req.body);
                prepareResponseObj.status = "422";
                res.status(422).json(prepareResponseObj);
            } else { 
               next();
            } 
            
        } catch (err) {
             
               prepareResponseObj.success = false;
               prepareResponseObj.message = message.exception;
               prepareResponseObj.ExceptionMessage = JSON.stringify(err);
               prepareResponseObj.status = "502";
               res.status(502).json(prepareResponseObj);
           }
},
getLog: function(req, res, next) {
       
    try{
       console.log("get log validate---",JSON.stringify(req.query))
       /* const logSchema = Joi.object().keys({
            applicationName: Joi.string().required(),
            componentName:Joi.string().required(),
            severtiLevel:Joi.number()
          
        });
        const result = Joi.validate(req.query, logSchema); 
        const { value, error } = result; 
        const valid = error == null; 
        */
       var valid = true;
        if (!valid) {               
            prepareResponseObj.success = false;
            prepareResponseObj.message = 'Invalid query param recieved';
            prepareResponseObj.ExceptionMessage = JSON.stringify(req.body);
            prepareResponseObj.status = "422";
            res.status(422).json(prepareResponseObj);
        } else { 
           next();
        } 
        
    } catch (err) {
         
           prepareResponseObj.success = false;
           prepareResponseObj.message = message.exception;
           prepareResponseObj.ExceptionMessage = JSON.stringify(err);
           prepareResponseObj.status = "502";
           res.status(502).json(prepareResponseObj);
       }
}

}
