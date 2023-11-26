let changeColor = document.querySelector('.cc').addEventListener('click', abc)

function abc(){
    let window = document.querySelector('.body').classList.toggle('color')
    let border = document.querySelector('.cc').classList.toggle('border')
    let ul = document.querySelector('.ul').classList.toggle('change')
    let border2 = document.querySelector('.logout').classList.toggle('border')
    
// window.classList.toggle('color')
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

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
  const ids = [];

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        window.location = 'index.html'
    }
});


const logout = document.querySelector('#logout-btn');

logout.addEventListener('click' , ()=>{
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'index.html'
      }).catch((error) => {
        console.log(error);
      });
      
})



window.addtodo = async function () {
    let getinp = document.querySelector('#getinp')
    const docRef = await addDoc(collection(db, "todos"), {
        name: getinp.value,
        time: new Date().toLocaleString()
    });
    console.log("Document written with ID: ", docRef.id);

}

function getData() {
    let ul = document.querySelector('.ul')
    onSnapshot(collection(db, 'todos'), (data) => {
        data.docChanges().forEach((newData) => {
ids.push(newData.doc.id)

            if (newData.type == 'removed') {
                let del = document.getElementById(newData.doc.id)
                del.remove()
            }
            else if(newData.type == 'added') {
                // console.log(newData)
                ul.innerHTML += `
                            <li id=${newData.doc.id}>${newData.doc.data().name} <br> ${newData.doc.data().time} <button onclick="delTodo('${newData.doc.id}')">Delete</button> <button onclick="edit(this,'${newData.doc.id}')">Edit</button></li>
                            `

            }
           

        })
    })
}

getData()

async function delTodo(id) {
    await deleteDoc(doc(db, "todos", id));
}


async function edit(e,id) {
    let editval = prompt('Enter Edit value')

    e.parentNode.firstChild.nodeValue = editval

    await updateDoc(doc(db, "todos", id), {
        name: editval,
        time: new Date().toLocaleString()
    });
}


async function deleteall(){
    var ul = document.querySelector('.ul');
    ul.innerHTML = ''
    for (var i = 0; i<ids.length; i++){
        await deleteDoc(doc(db , 'todos' , ids[i]))
    }
}


window.getData = getData
window.delTodo = delTodo
window.edit = edit
window.deleteall = deleteall;