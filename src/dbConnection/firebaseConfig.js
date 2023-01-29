// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBumQObQM6NVDLkT0x3DelPCb10n0CreoE",
  authDomain: "messenger-cit.firebaseapp.com",
  projectId: "messenger-cit",
  storageBucket: "messenger-cit.appspot.com",
  messagingSenderId: "833649566541",
  appId: "1:833649566541:web:5fd6dafffd130004048d04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;
