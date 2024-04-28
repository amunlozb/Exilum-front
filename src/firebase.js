// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDV2QQ0oVhKlSghEhT5vm-k1UdajgBsSPU",
  authDomain: "exilum-2b7d4.web.app",
  projectId: "exilum-2b7d4",
  storageBucket: "XXXXXXXXXXXXXXXXXX",
  messagingSenderId: "975293492549",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app