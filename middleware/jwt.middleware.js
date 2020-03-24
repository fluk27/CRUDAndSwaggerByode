const {verifyJWT} = require('../services/generate.token.services')
const authen =  (req, res, next)=> {
  // console.log('logging')
  if (req.headers.authorization) {
    verifyJWT(req.headers.authorization[1].split())
   return next()
  } else {
   return res.status(401).json("unauthorized")
  }
 
}
module.exports=authen

