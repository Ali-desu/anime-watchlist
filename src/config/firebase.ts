// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2NJaQ9tbRFeXK_D0nfTOdgrHia7gJ8Ow",
  authDomain: "animelist-b2474.firebaseapp.com",
  projectId: "animelist-b2474",
  storageBucket: "animelist-b2474.firebasestorage.app",
  messagingSenderId: "462169267680",
  appId: "1:462169267680:web:cd9a6cb525abc9111f5f85",
  measurementId: "G-57KKYL3BG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export {auth , googleProvider , db};