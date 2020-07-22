var express = require('express');
var router = express.Router();
const app = express();
const loggerRouter = require('./loggerRouter');
const traceRouter = require('./traceRouter');
const validateRequest = require('../../../middleware/validateRequest');


router.post('/api/v1/logdata',validateRequest.createLog, loggerRouter.postLogData);
router.get('/api/v1/getlogdata',validateRequest.getLog, loggerRouter.getLogData);

router.post('/api/v1/tracedata',validateRequest.createLog, traceRouter.postLogData);



module.exports = router;


