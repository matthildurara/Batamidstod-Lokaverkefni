//import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByDWSa5wvZfmhhaKqKyCcWC9zh7v5X93U",
  authDomain: "batamidstodin.firebaseapp.com",
  projectId: "batamidstodin",
  storageBucket: "batamidstodin.appspot.com",
  messagingSenderId: "753800579123",
  appId: "1:753800579123:web:4670e9d33b87b616bd7b46",
  measurementId: "G-8HNJ6RD1CP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);

//export default app;
