// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "",
  authDomain: "sharpeaiassignment-d915d.firebaseapp.com",
  projectId: "sharpeaiassignment-d915d",
  storageBucket: "sharpeaiassignment-d915d.appspot.com",
  messagingSenderId: "787943896924",
  appId: "1:787943896924:web:61b01ea32a2b9f9572b399",
  measurementId: "G-RQ37D0REHF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
