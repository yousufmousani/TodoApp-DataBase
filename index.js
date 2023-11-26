import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

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
const auth = getAuth(app);
const db = getFirestore(app);


const form = document.querySelector('#form');
// const user = document.getElementById('username');

const email = document.querySelector('#email');
const password = document.querySelector('#password');
let name = document.getElementById('username')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth,email.value, password.value) 

        .then(async (userCredential) => {

            const user = userCredential.user;
            console.log(user);
  
            try {
              const docRef = await addDoc(collection(db, "users"), {
                Name : name.value,
                SingUp_Email: email.value,
                SignUp_Password: password.value,
                
              });
              console.log("Document written with ID: ", docRef.id);
            } catch (e) {
              console.error("Error adding document: ", e);
              window.location = 'login.html'
            }
            window.location = 'login.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });

    })
    

