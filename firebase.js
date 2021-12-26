// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvrow8P9NecfwEArQw6LrFVSmXrVo7gJA",
  authDomain: "c-chat-18508.firebaseapp.com",
  projectId: "c-chat-18508",
  storageBucket: "c-chat-18508.appspot.com",
  messagingSenderId: "17097302451",
  appId: "1:17097302451:web:29581d4e50bfe4ac12abc6",
  measurementId: "G-YBGYTH6PN4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const analytics = getAnalytics(app);
const db = getFirestore();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
