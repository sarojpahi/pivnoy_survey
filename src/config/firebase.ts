import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeB2igz2n3MRhbITZ1-nyyovp8LDdDcF0",
  authDomain: "pivnoy-371e5.firebaseapp.com",
  projectId: "pivnoy-371e5",
  storageBucket: "pivnoy-371e5.appspot.com",
  messagingSenderId: "323862731430",
  appId: "1:323862731430:web:33c745b73f40e29cb37267",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
