const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors('*'))
const swaggerUi = require('swagger-ui-express');
const {login,register} = require('./controllers/user.controllers')
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./files/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port =  process.env.PORT || 8080 
const route = require('./routes/user.routes')
const authen  =require('./middleware/jwt.middleware')
app.use(bodyParser.json())
app.post('/user/login',login)
app.post('/user/register',register)
app.use(authen)
app.use(route)

app.get('/mockData', (req, res) => {
  const mockData ={
    payeeProxyId : "612698448287644",
payeeProxyType : "BILLERID" ,
payeeAccountNumber : "0987654321",
payeeName: "Artani Bill Payment",
payerProxyId: "6380760001",
payerProxyType: "ACCOUNT" ,
payerAccountNumber: "6380760001",
payerName: "Sutunpan Jumcom",
sendingBankCode: "014",
receivingBankCode: "014" ,
amount: "750.45" ,
channelCode: "PMH",
transactionId: "202107127J00F00bKTPBpeh",
transactionDateandTime: "2021-07-12T15:14:42+07:00",
billPaymentRef1: "PORTALSANDBOXREF1",
billPaymentRef2: "PORTALSANDBOXREF1",
billPaymentRef3: "SCB",
currencyCode: "764" ,
transactionType : "Domestic Transfer"
  }
  res.status(200).json(mockData)
})

app.listen(port, () => console.log(`Example app listening on port port!`))
