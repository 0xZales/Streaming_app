// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCECcVkz75xa5iIVuijKfehszGtlhXc2bw",
    authDomain: "yfxacademy-3bb7d.firebaseapp.com",
    projectId: "yfxacademy-3bb7d",
    storageBucket: "yfxacademy-3bb7d.appspot.com",
    messagingSenderId: "49507326201",
    appId: "1:49507326201:web:23b5792253ad33ab8faa28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)