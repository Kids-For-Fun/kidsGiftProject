import {
    // firebaseConfig,
    collection,
    addDoc,
    db
} from "./firebaseConfig.js"

let btn = document.getElementById("dataForm");
btn.addEventListener('submit', async (event) => {
    event.preventDefault();
    let namee = document.getElementById("FullName").value;
    let emaill = document.getElementById("Email").value;
    let msgg = document.getElementById("msg").value;
    try {
        const docRef = await addDoc(collection(db, "comments"), {
            name: namee,
            email: emaill,
            msg: msgg
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})