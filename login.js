import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

// import { getFirestore,collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSFZoRtI3nVJbD3uEpb6liKxNXDuiYXmY",
  authDomain: "socialapp-96e89.firebaseapp.com",
  projectId: "socialapp-96e89",
  storageBucket: "socialapp-96e89.appspot.com",
  messagingSenderId: "492786938715",
  appId: "1:492786938715:web:3c40bcb98981fc24a2607e",
  measurementId: "G-94S7SKY0RK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);



const form = document.querySelector('#form');
const user = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            window.location = 'home.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
        
})





// forgotBtn.addEventListener('click' , ()=>{
//     const user = auth.currentUser;
//     const newPassword = prompt('enter new password');
//     updatePassword(user, newPassword).then(() => {
//         // Update successful.
//       }).catch((error) => {
//         // An error ocurred
//         // ...
//       });
// })