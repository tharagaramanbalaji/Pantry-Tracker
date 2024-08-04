// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7OV_A8M4Y7pZTM771I6wZa0cjOk7URGk",
  authDomain: "inventory-management-490b5.firebaseapp.com",
  projectId: "inventory-management-490b5",
  storageBucket: "inventory-management-490b5.appspot.com",
  messagingSenderId: "389309187482",
  appId: "1:389309187482:web:4939fc87578b9c8d8da623",
  measurementId: "G-NZ0P6VLW45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore };
