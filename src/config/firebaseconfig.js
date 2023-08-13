// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCthTCM6YQfZ9-gXrleDG3uULkwDETWVw0",
  authDomain: "quran-mobile-f550a.firebaseapp.com",
  projectId: "quran-mobile-f550a",
  storageBucket: "quran-mobile-f550a.appspot.com",
  messagingSenderId: "826527125871",
  appId: "1:826527125871:web:67e21b519e3aab5581989a"
};

// Initialize Firebase

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase}