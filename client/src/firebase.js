// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-esate-e42cf.firebaseapp.com",
  projectId: "mern-esate-e42cf",
  storageBucket: "mern-esate-e42cf.appspot.com",
  messagingSenderId: "53668499437",
  appId: "1:53668499437:web:f9e0e5390801b2958761e4",
  measurementId: "G-H56TVC5RWF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);