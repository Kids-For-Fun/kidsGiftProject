
   
   // Change the color dynamically on hover(style)
  const logo = document.querySelector('.logo');
        const icon = document.querySelector('.icon');

        logo.addEventListener('mouseover', () => {
            icon.style.color = '#EECAD5';
        });

        logo.addEventListener('mouseout', () => {
            icon.style.color = '#FF69B4';
        });


 // main image
  function changeImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = thumbnail.src;
  }

 
  // ===========================firebase=============================

  // // Import the functions you need from the SDKs you need
  // import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  // // TODO: Add SDKs for Firebase products that you want to use
  // // https://firebase.google.com/docs/web/setup#available-libraries
  const firebaseConfig = {
    apiKey: "AIzaSyAgyWGXCAIR6NiKfkzkWZbBeOMPRDNwMg4",
    authDomain: "contactus-a9d19.firebaseapp.com",
    databaseURL: "https://contactus-a9d19-default-rtdb.firebaseio.com",
    projectId: "contactus-a9d19",
    storageBucket: "contactus-a9d19.firebasestorage.app",
    messagingSenderId: "290565306453",
   appId: "1:290565306453:web:0995f78c2a17d582903cdc"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const storage = firebase.storage();



const review_form_submit=document.getElementById('review_form_submit');
 

review_form_submit.addEventListener("click",async(e)=>{
  e.preventDefault();

const username=document.getElementByI("productName").value;
const  file= document.getElementById('uploadPhoto').files[0];
const rating = document.querySelector('.stars .fa-star.active')?.getAttribute('data-value') || 0;
const Review=document.getElementByI("reviewText").value;

let image = null ;

if(file){
  try{
    const storageReferanc=storge.ref(`reviews/${file.name}`);
    await storageReferanc.put(file);
    image= await storageReferanc.getDownloadURL();

  }catch (error) {
    console.error('Error uploading image:', error);
}
}


const review ={
  username,
  Reviewt,
  rating,
  date: new Date().toLocaleDateString(),
  image
};

try{
    await database.ref('reviews').push(review);
}catch (error){
  console.error('Error sending review to Firebase:', error);
}
reviewForm.reset();

})

// card show the information 
database.ref('reviews').on('child_added', (snapshot) => {
  const review = snapshot.val();
  const reviewsList = document.getElementById('reviewsList');

  // إنشاء العنصر الأساسي للمراجعة
  const reviewCard = document.createElement('div');
  reviewCard.className = 'review-card';

  // إنشاء الرأس الخاص بالمراجعة
  const reviewHeader = document.createElement('div');
  reviewHeader.className = 'review-header';

  // صورة المستخدم
  const userImage = document.createElement('img');
  userImage.src = review.imageUrl || "https://img.freepik.com/free-photo/handsome-happy-hipster-guy-smiling_176420-20321.jpg";
  userImage.alt = "User Image";
  reviewHeader.appendChild(userImage);

  // معلومات المراجع
  const userInfo = document.createElement('div');

  const reviewerName = document.createElement('h5');
  reviewerName.className = 'reviewer-name';
  reviewerName.textContent = review.name;
  userInfo.appendChild(reviewerName);

  const reviewDate = document.createElement('small');
  reviewDate.className = 'review-date';
  reviewDate.textContent = review.date;
  userInfo.appendChild(reviewDate);

  reviewHeader.appendChild(userInfo);

  // التقييم
  const ratingSpan = document.createElement('span');
  ratingSpan.className = 'rating';
  ratingSpan.textContent = `⭐ ${review.rating}`;
  reviewHeader.appendChild(ratingSpan);

  reviewCard.appendChild(reviewHeader);

  // نص المراجعة
  const reviewText = document.createElement('p');
  reviewText.className = 'review-text';
  reviewText.textContent = review.reviewText;
  reviewCard.appendChild(reviewText);

  // إضافة المراجعة إلى القائمة
  reviewsList.appendChild(reviewCard);
});




// ===================================

  // انتظر حتى يتم تحميل الصفحة بالكامل
  document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.stars .fa-star');
    const ratingDisplay = document.getElementById('ratingDisplay');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = star.getAttribute('data-value'); // الحصول على قيمة النجمة
            
            // إزالة الفئة "active" من جميع النجوم
            stars.forEach(s => s.classList.remove('active'));
            
            // إضافة الفئة "active" للنجوم المحددة
            for (let i = 0; i < value; i++) {
                stars[i].classList.add('active');
            }
            
            // تحديث نص التقييم
            ratingDisplay.textContent = `Rating is: ${value}/5`;
        });
    });
});























// form add review 

const reviewText=document.getElementById("reviewText");
const uploadPhoto=document.getElementById("uploadPhoto");


// star rating
// const stars = document.querySelectorAll("#starRating i");
// const ratingValue = document.getElementById("ratingValue");

// function executeRating(stars) {
//     const starClassActive = "rating__star fas fa-star";
//     const starClassInactive = "rating__star far fa-star";
//     const starsLength = stars.length;
//     let i;
//     stars.map((star) => {
//       star.onclick = () => {
//         i = stars.indexOf(star);
  
//         if (star.className===starClassInactive) {
//           for (i; i >= 0; --i) stars[i].className = starClassActive;
//         } else {
//           for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
//         }
//       };
//     });
//   }
//   executeRating(ratingStars);