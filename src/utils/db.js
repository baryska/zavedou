import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    //Database named zavedou
    apiKey: "AIzaSyCc9s03HnL3WKFiA5GVb-nWpaZg1eSFBAY",
    authDomain: "zavedou.firebaseapp.com",
    databaseURL: "https://zavedou.firebaseio.com",
    projectId: "zavedou",
    storageBucket: "zavedou.appspot.com",
    messagingSenderId: "597628758386",
    appId: "1:597628758386:web:7e51f4377ba0a11bca15eb",

    // Database named zavedou2
    // apiKey: "AIzaSyCo2kL5OHFxCP5WR3iY8RlfdiGqurvaU2g",
    // authDomain: "zavedou2.firebaseapp.com",
    // databaseURL: "https://zavedou2.firebaseio.com",
    // projectId: "zavedou2",
    // storageBucket: "zavedou2.appspot.com",
    // messagingSenderId: "190327281700",
    // appId: "1:190327281700:web:c836510c1dfe6a401aa0b1"
  })
  .firestore()