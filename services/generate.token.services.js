const {promisify} = require('util')
const jwt = require("jsonwebtoken");
const secret = "MIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgBiOTQ2VXn+p1qi5abIb18h"+
"qHk7SKVRA5/otpsyXQSE+pba+8TQ/VZPaR/GtLUUZDfWd0FjW3WzETe3hKxr6Q3h"+
"C1setm6encSPMQ8q8lUB5Jp+F+txIAhgbHKpdg+M1K+pg7UPdprwgijqEA613evq"+
"/ra1B1xFZvuL5nTacSZ2RgTOhFVMyv/kNo8IIY2pzNPMlUIzVq4yfoUydxneQofT"+
"U2Bd9mClDgwwTFdFXq6NZON7Pcn2Fi40Yq813Mh2jdqC0Otk/wq27T7Vbtfg0mW/"+
"QeP3mCmKmdyCcFCuSdu9z2OStTIqj9JHZSlBPfSRT0SITkrjLIrRMbCwo8jETFDg"+
"jVYB/mezh7+HPtQdfGpET1p50rTaM2sRag7KzC56YB1HqF7cZRgSMbv6wDxAnG0z"+
"ys24rbNtQHFr2ZTqTSXRkD1aLHxjJE+1Yj9B81Ape0OMm2GT6/gqXLY6fuYsd3Qa"+
"SVBdCf3uw4I6M/UCWtYTwegyDf5buj678uVDY9KVPnFAj7UsVeQU7ceJT6Uem66D"+
"JO7X/a88YSZUqgQAwMgsuhyPviw/P9cBc6HCtEUfzm56uoPVhz9JEgITrt+RfY3Z"+
"/SEorrxm8eKrHLJKgrAF0XFR90s4m+v95SaJQ3Z5v4Vj4SdnVLyqoA7IKYbBH/Pq"+
"3AOAKJ18a2EOFIdLxsJpUQIDAQAB",exp='1d'
let resultJWT;

// create JWT use my resource
const generateJWT = async (data) => {
resultJWT= await jwt.sign({ data: data}, secret, { expiresIn:exp })
  return resultJWT
};

const verifyJWT = async (accessToken) => {
  //console.log(`accessToken${accessToken}`);
  
  resultJWT= await jwt.verify(accessToken,secret).then((decoded) => {
    //console.log(`decoded:${decoded}`);
    
  }).catch((err) => {
    resultJWT={Error:err}
  }); 
  return resultJWT
}

// genarateJWT("data",20)
module.exports = {  generateJWT,verifyJWT };
