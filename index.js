const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const qs = require('qs')
app.use(cors('*'))
const swaggerUi = require('swagger-ui-express');
const {login,register} = require('./controllers/user.controllers')
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./files/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port =  process.env.PORT || 8080
const route = require('./routes/user.routes')
const authen  =require('./middleware/jwt.middleware')
const {createJob,startJob} = require('./controllers/corn_job.controllers')
app.use(bodyParser.json())
app.post('/user/login',login)
app.post('/user/register',register)

app.post('/scb/payment/confirm', async (req, res) => {

  const Header={
    Authorization: 'Bearer U7t5ettCkKvO5Tr9BXpS8uyaFPJ8iDAYbjlQViaQRXC',
    'Content-Type': "application/x-www-form-urlencoded"
  }
  await axios.post("https://notify-api.line.me/api/notify",qs.stringify({message:JSON.stringify(req.body)}), {headers:Header}).then((result) => {
   // console.log("payment:",result);

  }).catch((err) => {
    console.log(err);
  });
  res.send('')
})
app.get("/cjob",createJob)
app.get("/sjob",startJob)
app.use(authen)
app.use(route)


app.listen(port, () => console.log(`Example app listening on port port!`))
