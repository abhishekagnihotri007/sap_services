# sap_services
sap  logging microservice

service :
1)  for logging log message in to file and xs envirment
url: http://localhost:3000/api/v1/logdata
method:POST

Req.body:  {
    "applicationName":"TRP4.0",
    "csnComponent":"Network",
    "severtiLevel":3,
    "message": "logging supply & demad service"
}
req.header:   

Content-Type:application/json


2) for reading log message from log file
url: http://localhost:3000/api/v1/getlogdata?applicationName=TRP&componentName=supplyDemand&severtiLevel=2


Deployment url: 
https://gcl0139.wdf.sap.corp:51371/api/v1/