const {verifyJWT} = require('../services/generate.token.services')
const authen = (req, res, next)=> {
  // console.log('logging')
  if (req.headers.authorization) {
    // console.log(req.headers.authorization.split(" ")[1]);
    
   resultJWT= verifyJWT(req.headers.authorization.split(" ")[1])
  if (resultJWT.err) {
    return res.status(401).json("unauthorized")
  } else {
    return next()
  }
  
  } else {
   return res.status(401).json("unauthorized")
  }
 
}
module.exports=authen

