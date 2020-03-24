const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const {login,register} = require('./controllers/user.controllers')
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./files/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port =  process.env.PORT || 8080 
const route = require('./routes/user.routes')
const authen  =require('./middleware/jwt.middleware')
app.use(bodyParser.json())
app.use(cors('*'))
app.post('/user/login',login)
app.post('/user/register',register)
app.use(authen)
app.use(route)
app.listen(port, () => console.log(`Example app listening on port port!`))
