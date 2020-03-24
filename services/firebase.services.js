const { FBAuthen, FBFirestore,FBAdmin } = require("../functions/config/firebase.init");
let resultFB;

//  login with firebase authentication
const FBlogin = async (email, password) => {
  await FBAuthen.signInWithEmailAndPassword(email, password)
    .then(res => {
      //   console.dir(`res:${ JSON.stringify(res)}`);
      return  resultFB = res
    })
    .catch(err => {
      console.error(err);
      resultFB = { Error: err };
    });
  return resultFB;
};

// register with firebase authentication
const FBRegister = async (email, password) => {
  await FBAuthen.createUserWithEmailAndPassword(email, password)
    .then(resultRegis => {
      console.dir(`resultRegis:${JSON.stringify(resultRegis)}`);
      return  resultFB = resultRegis;
    })
    .catch(err => {
      console.error(`err:${err}`);
      resultFB = { Error: err };
    });
  return resultFB;
};

// add data by firebase firestore
const FBAddData = async (COLName, data) => {
  resultSize = await FBGetSizeData(COLName);
  if (resultSize !== 0 && resultSize.length>1) {
    docIndex = 0;
  }else{
    
    docIndex=parseInt(resultSize)+1
  }
    console.log(`resultSize:${resultSize}`);
    data.id=docIndex
    FBFirestore.collection(COLName).doc(`${docIndex}`).set(data)
      .then(() => {
        console.log("saved user");
        return resultFB = "saved user"
      })
      .catch(err => {
        console.error(err);
        resultFB = { Error: err };
      });
  

  return resultFB;
};

// get size of collection in firebase firestore
const FBGetSizeData = async ColName => {
 await FBFirestore.collection(ColName)
    .get()
    .then(result => {
      result.forEach(doc=>{
      resultFB = doc.id
    })
    console.log(`result.size:${JSON.stringify(resultFB)}`);
    return resultFB
      
      
    })
    .catch(err => {
      resultFB = { Error: err };
    });
  return resultFB;
};

// get data with firebase firestore
const FBGetData = async (COLName) => {
  let dataFromFirebase = Array()
  await FBFirestore.collection(COLName).get()
    .then(resultData => {
      resultData.forEach(data=>{
        dataFromFirebase.push(data.data())
        console.log(`FBGetData:${JSON.stringify(dataFromFirebase) }`);
      })
      return resultFB = dataFromFirebase
    })
    .catch(err => {
      console.error(err);
      resultFB = { Error: err };
    });
  return resultFB;
};

// get data with firebase firestore
const FBGetDataByID = async (COLName, id) => {
  console.log('FBGetDataByID='+id);
  
  await FBFirestore.collection(COLName).where('id','==',id).get()
    .then(resultData => {
      resultData.forEach(doc=>{
      resultFB=doc.data()
        console.log(`FBGetDataByID:${resultFB}`);
      })
      return resultFB
     
    })
    .catch(err => {
      console.error(err);
      resultFB = { Error: err };
    });
  return resultFB;
};

// modify data with firebase firestore
const FBModifyData = async (ColName,docIndex, data ) => {
  await FBFirestore.collection(ColName).doc(`${docIndex}`).set(data,{merge:true})
    .then(() => {
      console.log("updated");
      resultFB = 'updated'
      return resultFB
    })
    .catch(err => {
      resultFB = { Error: err };
    });
  return resultFB;
};

// delete data with firebase firestore
const FBDestroyData = async (ColName, docIndex,email,password) => {
   resultUid= await FBlogin(email,password)
 await FBAdmin.deleteUser(resultUid.user.uid)
 await FBFirestore.collection(ColName).doc(docIndex).delete()
    .then(() => {
      console.log("deleted");
      resultFB = 'deleted user'
      return resultFB
    })
    .catch(err => {
      resultFB = { Error: err };
    });
  return resultFB;
};
module.exports = {FBlogin,FBRegister,FBAddData,FBGetData,FBGetDataByID,FBModifyData,FBDestroyData};
