const firebase = require("firebase");
const admin = require("firebase-admin");
const firebaseConfig = {
  apiKey: "AIzaSyBjtK1QOewLrdkPnQ-0szDFWQ4ouFNuURY",
  authDomain: "reactest-6d528.firebaseapp.com",
  databaseURL: "https://reactest-6d528.firebaseio.com",
  projectId: "reactest-6d528",
  storageBucket: "reactest-6d528.appspot.com",
  messagingSenderId: "556625009111",
  appId: "1:556625009111:web:0aad4c28a9ed382407d392"
};

const serviceAccount = require("./reactest-6d528-firebase-adminsdk-lttc6-820577d3d1.json");

const FB = firebase.initializeApp(firebaseConfig);
const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://reactest-6d528.firebaseio.com"
});

module.exports = {
  FBAuthen: FB.auth(),
  FBFirestore: FB.firestore(),
  FBAdmin: firebaseAdmin.auth()
};
