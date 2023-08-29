import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqh8abvHWdBQQVHz8RR9dZG80trqefsjo",
  authDomain: "challenge-89723.firebaseapp.com",
  projectId: "challenge-89723",
  storageBucket: "challenge-89723.appspot.com",
  messagingSenderId: "469217779700",
  appId: "1:469217779700:web:394506869b21de8dc3e3a1",
  measurementId: "G-BF54Q2H5BX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
