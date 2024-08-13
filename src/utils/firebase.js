// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQ3Ny8HOJefnXeB9mCd25dcQlYF26-REY",
    authDomain: "netflixgpt-f75f4.firebaseapp.com",
    projectId: "netflixgpt-f75f4",
    storageBucket: "netflixgpt-f75f4.appspot.com",
    messagingSenderId: "51852073305",
    appId: "1:51852073305:web:658be334a64dba76c45448",
    measurementId: "G-0ZHNG40E9C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
