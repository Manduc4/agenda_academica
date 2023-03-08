// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHkmKKGrb1Nv5W_o_EeWd7wAYLlGUpM3E",
  authDomain: "agenda-acad.firebaseapp.com",
  databaseURL: "https://agenda-acad-default-rtdb.firebaseio.com",
  projectId: "agenda-acad",
  storageBucket: "agenda-acad.appspot.com",
  messagingSenderId: "744340626699",
  appId: "1:744340626699:web:13633cb0e13c8fd052160e",
  measurementId: "G-405JSNMQWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);