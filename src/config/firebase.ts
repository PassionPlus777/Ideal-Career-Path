import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnNrR3WArIZnrFlqf7kDzeMKmcUTfnWPg",
  authDomain: "authentication-66a07.firebaseapp.com",
  projectId: "authentication-66a07",
  storageBucket: "authentication-66a07.appspot.com",
  messagingSenderId: "427014431883",
  appId: "1:427014431883:web:15deb554d7784e909ae08e",
  measurementId: "G-1234567890",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
