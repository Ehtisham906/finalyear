import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:  process.env.FIREBASE_API_KEY,
  authDomain: "householdservices-pw-bc-fyp.firebaseapp.com",
  projectId: "householdservices-pw-bc-fyp",
  storageBucket: "householdservices-pw-bc-fyp.appspot.com",
  messagingSenderId: "870530396896",
  appId: "1:870530396896:web:6bedb1dced0a45c7035685",
};

export const app = initializeApp(firebaseConfig);