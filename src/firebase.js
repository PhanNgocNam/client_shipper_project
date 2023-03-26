import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVxz-cqNmguyOnvg2Pd0GiuO2Y15QClM8",
  authDomain: "shipperproject-72574.firebaseapp.com",
  projectId: "shipperproject-72574",
  storageBucket: "shipperproject-72574.appspot.com",
  messagingSenderId: "39155173136",
  appId: "1:39155173136:web:5ca0b2076b802587690795",
};

const app = initializeApp(firebaseConfig);
export const fbstorage = getStorage(app);
export const auth = getAuth(app);
