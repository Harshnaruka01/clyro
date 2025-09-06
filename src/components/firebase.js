// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCxJ7JjIp9S3khFFUioLcxzEltMfuiSBsE",
  authDomain: "project1-4fa61.firebaseapp.com",
  databaseURL: "https://project1-4fa61-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project1-4fa61",
  storageBucket: "project1-4fa61.firebasestorage.app",
  messagingSenderId: "462359969921",
  appId: "1:462359969921:web:979df5eecfb2a6fc394d80",
  measurementId: "G-8WRCM93Y72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();
export default app;