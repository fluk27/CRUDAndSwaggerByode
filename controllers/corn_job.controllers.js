const Job = require("node-cron")
const axios = require('axios')
const qs = require('qs')
let task =null
const createJob= async (req,res)=>{
    task=await Job.schedule('00 52 10 * * *', () => {
        sendLine()
    }, null, true, "Asia/Bangkok")
res.send("create now.")
}

const startJob = async (req,res) => {
    await task.start()
    res.send("start now.")
}

const sendLine = async () => {
    
  const Header={
    Authorization: 'Bearer s5ZFwpC3BPdrTMF9VtM7qCYDvmerUCGznXOrBiEaScA',
    'Content-Type': "application/x-www-form-urlencoded"
  }
  await axios.post("https://notify-api.line.me/api/notify",qs.stringify({message:"job start now."}), {headers:Header}).then((result) => {
   // console.log("payment:",result);

  }).catch((err) => {
    console.log(err);
  });
}

module.exports={createJob,startJob}