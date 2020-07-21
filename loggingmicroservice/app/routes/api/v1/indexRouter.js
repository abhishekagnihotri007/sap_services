var express = require('express');
var router = express.Router();
const app = express();
const loggerRouter = require('./loggerRouter');
const validateRequest = require('../../../middleware/validateRequest');



router.post('/api/v1/logdata',validateRequest.createLog, loggerRouter.postLogData);



module.exports = router;


