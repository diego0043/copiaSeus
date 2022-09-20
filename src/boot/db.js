// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgaAk7xofN6IumuTnavGFLyshF9wffW8E",
  authDomain: "seus-sistemavotaciones.firebaseapp.com",
  projectId: "seus-sistemavotaciones",
  storageBucket: "seus-sistemavotaciones.appspot.com",
  messagingSenderId: "1045990915562",
  appId: "1:1045990915562:web:9e8d91119ca5135ee10693",
  measurementId: "G-7L74SHNNQE",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = app.firestore();

//export const db = firebase
//.initializeApp({ projectId: "quasar-project1-4017b" })
//.firestore();

//Inicialize Cloud Storage
export const storage = app.storage();


// Export types that exists in Firestore - Uncomment if you need them in your app
const { Timestamp, GeoPoint, FieldValue } = firebase.firestore;
export { Timestamp, GeoPoint, FieldValue };

//const analytics = getAnalytics(app);

//firebase autenticacion
export const auth = firebase.auth()
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider
