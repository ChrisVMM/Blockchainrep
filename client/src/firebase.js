// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blockchain-estate.firebaseapp.com",
  projectId: "blockchain-estate",
  storageBucket: "blockchain-estate.appspot.com",
  messagingSenderId: "507757456084",
  appId: "1:507757456084:web:4f67d16df04e75627d6941",
  measurementId: "G-0VYS5MYDC3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);