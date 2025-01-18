  // hover logo navbar
  const logo = document.querySelector('.logo');
        const icon = document.querySelector('.icon');

        logo.addEventListener('mouseover', () => {
            icon.style.color = '#EECAD5';
        });

        logo.addEventListener('mouseout', () => {
            icon.style.color = '#FF69B4';
        });


// firebase==================
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import firebase from 'firebase/app';
// import 'firebase/auth'; 
// import 'firebase/firestore'; 


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBDcxzNCPzEwXRdhvsHWiDS05s7NIxJRvQ",
//   authDomain: "myproject-bd31d.firebaseapp.com",
//   projectId: "myproject-bd31d",
//   storageBucket: "myproject-bd31d.firebasestorage.app",
//   messagingSenderId: "741804666337",
//   appId: "1:741804666337:web:b664185cba55c2ffc636a0",
//   measurementId: "G-92LD12HSF5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export { auth, 
//     firestore ,
//     app };





//main ======================

const edit_emailBtn = document.getElementById('edit_email');
const edit_nameBtn = document.getElementById('edit_name');
const edit_passwordBtn = document.getElementById('edit_password');

const editNameForm = document.getElementById('edit-box-name'); 
const editEmailForm = document.getElementById('edit-box-email'); 
const editPasswordForm = document.getElementById('edit-box-password'); 

const deleteNameBtn = document.querySelector('.delet_name_btn'); 
const deleteEmailBtn = document.querySelector('.delet_email_btn'); 

const showName = document.getElementById('showName');
showName.innerHTML = user.name


const showEmail = document.getElementById('showEmail'); 
showEmail.textContent = user.email
// ================= for editing ============
edit_nameBtn.addEventListener('click', () => {
    editEmailForm.style.display = 'none';
    editPasswordForm.style.display = 'none';
    editNameForm.style.display = editNameForm.style.display === 'none' ? 'block' : 'none';
});


edit_emailBtn.addEventListener('click', () => {
    editNameForm.style.display = 'none';
    editPasswordForm.style.display = 'none';
    editEmailForm.style.display = editEmailForm.style.display === 'none' ? 'block' : 'none';
});


edit_passwordBtn.addEventListener('click', () => {
    editNameForm.style.display = 'none';
    editEmailForm.style.display = 'none';
    editPasswordForm.style.display = editPasswordForm.style.display === 'none' ? 'block' : 'none';
});


//cheng name ===========================================================
const newNameInput=document.getElementById("newName") 
const editNameBtn=document.querySelector(".edit_name_btn")


editNameBtn.addEventListener("click" , async(e)=>{
    e.preventDefault();

const newName = newNameInput.value;
const user = firebase.auth().currentUser;
//currentUser    هاي اسم المستخدم الحالي الي موجود في داتا وانا بدي ابدلو
// Load user profile

if(user){
    
try{
    const userReferance = firestore.collection('users').doc(user.uid); 
 
    //هون كلمة يوزير هو المجموعه التي تحتوي المستخدمين 
    await userReferance.update({
        name: newName
    });
    await user.updateProfile({
        displayName: newName
    });
    console.log('Name updated successfully');
    showName.textContent = newName;
    // editNameForm.style.display = 'none'; // هذا السطر يقوم بإخفاء النموذج (form) بعد تحديث الاسم بنجاح.




}catch (error) {
    console.error('Error updating name:', message.error);
}
} else {
console.log('No user is signed in');
}
});


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        document.querySelector('.welcome-message span').textContent = user.displayName;
    }
});

//delet Name
 const user = firebase.auth().currentUser;
deleteNameBtn.addEventListener('click', async () => {
    if (user) {
        try {
            await user.updateProfile({
                displayName: ''  
            });

            console.log('Name deleted successfully');
            editNameForm.style.display = 'none'; 
        } catch (error) {
            console.error('Error deleting name:', error);
        }
    } else {
        console.log('No user is signed in');
    }
});



//cheng email ===========================================================
 const newEmailInput =document.getElementById("newEmail");
 const editEmailButton = document.querySelector('.edit_Email_btn');
 const oldPassword=document.getElementById("oldPassword");




 editEmailButton.addEventListener("click" , async(e)=>{
    e.preventDefault();

    const newEmail = newEmailInput.value;
    const oPassword=oldPassword.value;
    const user = firebase.auth().currentUser;
    
    if(user){
     try{

        const credential = firebase.auth.EmailAuthProvider.credential(
           user.oldPassword 
        );

        await user.reauthenticateWithCredential(credential); 
        await  user.updateEmail(newEmailInput)

        console.log('Email updated successfully');
        showEmail.textContent = newEmail;

        editEmailForm.style.display = 'none'; 

     }
     catch(error){
        console.log('Error updating email:', message.error);

     }
    }else{
console.log('No user is signed in');
    }
 })

 //delet
 deleteEmailBtn.addEventListener("click",async(e)=>{
const user =firebase.auth().currentUser;

if(user){
    try{
        await user.delete();
         console.log("User account deleted");
         window.location.href = 'logIn.html';
        }catch (error){
        console.error('Error deleting user account:', message.error);

    }
}else{
    console.log('No user is signed in.');
  
}

 })
//cheng password  ===========================================================

const editPasswordButton = document.querySelector('.edit_password_btn');
const old_Password = document.getElementById("oldPassword");
const newPasswordInput = document.querySelector('#newPassword');
const newPasswordConfirmInput = document.querySelector('#newPasswordConfirm');


editPasswordButton.addEventListener('click', async (e) => {
    e.preventDefault(); 
    const user = firebase.auth().currentUser; 
    const oldPassword =old_Password.value; 
    const newPassword = newPasswordInput.value.trim();  
    const confirmPassword = newPasswordConfirmInput.value.trim();

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        if (user) {
            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                oldPassword
            );

            await user.reauthenticateWithCredential(credential);
            console.log(' successful.');

            await user.updatePassword(newPassword);
            alert('Password updated successfully.');
       
            editPasswordForm.style.display = 'none';
        } else {
            alert('No user is signed in.');
        }
    } catch (error) {
        console.error('Error updating password:', error);

        // if (error.code === 'auth/requires-recent-login') {
        //     alert('You need to reauthenticate to update your password.');
        // } else {
        //     alert('An error occurred. Please try again.');
        // }
    }
});
