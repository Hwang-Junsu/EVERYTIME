// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBmeYXqmWGm-L0HQvkJc7ZvnzcV8TwjSU",
  authDomain: "everytime-chat.firebaseapp.com",
  projectId: "everytime-chat",
  storageBucket: "everytime-chat.appspot.com",
  messagingSenderId: "618877064082",
  appId: "1:618877064082:web:1ef2d002da4f1ac875274b",
  measurementId: "G-RBK9ZBWK1D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
