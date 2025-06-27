// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHiPaQjcyE000MTS325dVQ7-Y9iYpRd60",
  authDomain: "personalized-reader.firebaseapp.com",
  projectId: "personalized-reader",
  storageBucket: "personalized-reader.firebasestorage.app",
  messagingSenderId: "310366730773",
  appId: "1:310366730773:web:daa3520bf0eb3c33e3ec1c",
  measurementId: "G-S73RTNWQEV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}
export default app;
