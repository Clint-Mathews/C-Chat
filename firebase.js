import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

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
const db = getFirestore();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
