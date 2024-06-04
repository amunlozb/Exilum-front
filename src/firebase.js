// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDV2QQ0oVhKlSghEhT5vm-k1UdajgBsSPU",
  authDomain: "exilum-2b7d4.firebaseapp.com",
  projectId: "exilum-2b7d4",
  storageBucket: "exilum-2b7d4.appspot.com",
  messagingSenderId: "975293492549",
  appId: "1:975293492549:web:9ad14adedbb992c610a22c",
  measurementId: "G-8RMRJ1YGTE"
};


// Initialize Firebase 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app