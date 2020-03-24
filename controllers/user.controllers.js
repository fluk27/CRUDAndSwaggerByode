const {FBlogin, FBRegister, FBAddData,FBGetDataByID, FBModifyData, FBGetData,FBDestroyData} = require("../services/firebase.services");
const { generateJWT } = require("../services/generate.token.services");
let os = require("os");
const login = (req, res) => {
  
  // FBlogin is function login with firebaseAuthen
  FBlogin(req.body.email, req.body.password)
    .then(async result => {
      console.log(`userContollers:${result}`);
      access_token = await generateJWT(result.user.email);
      console.log(`access_token:${access_token}`);
      console.log(`${os.userInfo()}`);
     return res.status(200).json(access_token);
    })
    .catch(err => {
      console.error(err);
    });
};

const register = async (req, res) => {
  console.log(req.body.email);
  
  resRegister = await FBRegister(req.body.email, req.body.password);
  if (resRegister.Error) {
    res.status(409).json("user duplicate");
  } else {
    FBAddData("users", {
      email: req.body.email,
      password: req.body.password,
      Fname: req.body.Fname,
      Lname: req.body.Lname,
      nickName: req.body.nickName
    });
    res.status(201).json("registered");
  }
};

const modify = async (req, res) => {
  // console.log(`modify:${req.params.id}`);
  resModify = await FBModifyData("users", parseInt(req.params.id),req.body);
  
  if (resModify.Error) {
    res.status(403).json("user empty");
  } else {
    res.status(200).json(resModify);
  }
};

const findAll = async (req, res) => {
  resFindAll = await FBGetData("users");
  if (resFindAll.Error) {
    res.status(403).json("i don't have data of user");
  } else {
    res.status(200).json(resFindAll);
  }
};

const findByID = async (req, res) => {
  console.log(`form ID:${req.params.id}`);

  resFindByID = await FBGetDataByID("users", parseInt(req.params.id));
  if (resFindByID.Error) {
    res.status(403).json("data empty of user");
  } else {
    res.status(200).json(resFindByID);
  }
};

const deleteUser = async (req, res) => {

  resDeleteUser = await FBDestroyData("users",req.params.id,req.body.email,req.body.password);
  if (resFindByID.Error) {
    res.status(403).json("data empty of user");
  } else {
    res.status(204).json(resDeleteUser);
  }
};
module.exports = { login, register, modify, findAll, findByID, deleteUser };
