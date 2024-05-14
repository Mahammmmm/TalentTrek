import { initializeApp } from "firebase/app";
// import VITE_API_KEY from "../env"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAJef0lonr2ZRzGEFnUGUiTDuLbjdWTfIU",
    authDomain: "chatapp-tt.firebaseapp.com",
    projectId: "chatapp-tt",
    storageBucket: "chatapp-tt.appspot.com",
    messagingSenderId: "824579346827",
    appId: "1:824579346827:web:b192b14a1e7f75d8c79f8e"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore()