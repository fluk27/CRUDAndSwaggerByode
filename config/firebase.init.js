const firebase = require("firebase");
const admin = require("firebase-admin");
const firebaseConfig = {
  apiKey: "AIzaSyAg9pxBbZfVqmPqntwdDwHJnew-MvIABx8",
  authDomain: "my-project-1505437860011.firebaseapp.com",
  databaseURL: "https://my-project-1505437860011.firebaseio.com",
  projectId: "my-project-1505437860011",
  storageBucket: "my-project-1505437860011.appspot.com",
  messagingSenderId: "682394484682",
  appId: "1:682394484682:web:aff6d2000fcc646ee09933"
};

const serviceAccount = require("./my-project-1505437860011-firebase-adminsdk-s18jw-006eabf807.json");

const FB = firebase.initializeApp(firebaseConfig);
const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-project-1505437860011.firebaseio.com"
});

module.exports = {
  FBAuthen: FB.auth(),
  FBFirestore: FB.firestore(),
  FBAdmin: firebaseAdmin.auth()
};
