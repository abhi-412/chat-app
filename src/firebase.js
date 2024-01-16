// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCDyegGiwD7Avps9CGjuIDYMbAoHbIOSb8",
  authDomain: "abhi-chat-app-412.firebaseapp.com",
  projectId: "abhi-chat-app-412",
  storageBucket: "abhi-chat-app-412.appspot.com",
  messagingSenderId: "644344250776",
  appId: "1:644344250776:web:1192029f3b1eacf160abed",
  measurementId: "G-Y68YF1XKXD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);