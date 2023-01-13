import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyATfhYxhZGBm91jMdSguZJHbjzqs5ce05k",
    authDomain: "inmemerkezihts-a2b02.firebaseapp.com",
    projectId: "inmemerkezihts-a2b02",
    storageBucket: "inmemerkezihts-a2b02.appspot.com",
    messagingSenderId: "142144663030",
    appId: "1:142144663030:web:2dc1819f5c315f70cb6bd7",
    measurementId: "G-PJN1LEXVEJ"
};



let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const database = firebase.database()

export { database }