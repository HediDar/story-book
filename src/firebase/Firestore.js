import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAt3kwd3QidLE4ViFw52xKkG-VxE-vLa0I",
  projectId: "todoapp-b5eab",
  authDomain: "todoapp-b5eab.firebaseapp.com",
  databaseURL: "https://todoapp-b5eab.firebaseio.com",
  storageBucket: "todoapp-b5eab.appspot.com",
  messagingSenderId: "576498931683",
  appId: "1:576498931683:web:d1a159ec1ae18509ad72d6",
};

firebase.initializeApp(config);

export default firebase;
