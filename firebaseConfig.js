import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // Import the database module
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAKJ02cd87nBWVWFBUXSn_GPCf_-qu7CjQ",
    authDomain: "kolmuzika.firebaseapp.com",
    databaseURL: "https://kolmuzika-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kolmuzika",
    storageBucket: "kolmuzika.appspot.com",
    messagingSenderId: "939382051199",
    appId: "1:939382051199:web:26e0c5875f94aa58188a4a",
    measurementId: "G-FKFHPWNFLH"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Get a reference to the database

export { app, database }; // Export both app and database