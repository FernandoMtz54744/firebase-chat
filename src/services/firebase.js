import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore"

firebase.initializeApp({
    apiKey: "AIzaSyAZMRK2D30XAJqHv_ZmRWF4gQoZP5-qhX0",
    authDomain: "fir-chat-ca6c5.firebaseapp.com",
    projectId: "fir-chat-ca6c5",
    storageBucket: "fir-chat-ca6c5.appspot.com",
    messagingSenderId: "413800296394",
    appId: "1:413800296394:web:4024ce165ff691837ce933"
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export {auth, firestore, firebase, googleProvider};