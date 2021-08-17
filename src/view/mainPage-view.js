// import * as firebase from "../firebase/firebase-login.js";
import * as todo from '../firebase/firebase-config.js';

export const viewMainPage = () => {
    const mainPageSection = `
    <!----------------perfil---------------->
    <div class = 'profile-container'> 
      <div class="profile">
        <img class="profile-user-img" src=''>
        <p id='name-profile'></p>
        <p id='email-profile'></p>
        <img class="line-decor" src="../images/line.svg"></img>
      </div>
    </div>
    <!----------------muro---------------->
    <div class = 'timeline-container'>
      <div class= 'timeline'>
        <input class='input-timeline' type='text' placeholder='Comparte algo'><br>
        <div class= 'container-btn'>
          <img src='../images/picture.svg'>
          <input id="publish-btn" type=button value='Publicar'>
        </div>
      </div>
    </div>
    <!----------- publicaciones---------->
    <div class = 'posts-container'>
      <div id="post"></div>
    </div>
    <!----------- Campañas ----------->
    <div class="campaign-container">
      <div class="campaign-content">
        <h3>Campañas 📢</h3>
        <div id="campaign-img"></div>
        <button>Información</button>
      </div>
    </div>
    <!----------- github ----------->
    <div class="github-container style="display: none">
      <div class="github-content">
      <p class="copyright">Pet Place ® 2021</p>
        <a href="https://github.com/yesireth">
          <img src="../images/github-white.svg"></img><p>Y. Suárez</p>
        </a>
        <a href="https://github.com/makemile">
          <img src="../images/github-white.svg"></img><p>K. Moncada</p>
        </a>
        <a href="https://github.com/pierinamont">
          <img src="../images/github-white.svg"></img><p>P. Montalva</p>
        </a>
      </div>
    </div>
    `;
  
    const container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = mainPageSection;
    return container;
} 
 

const uid = localStorage.getItem('uid');
const name = localStorage.getItem('name');
const photo = localStorage.getItem('photo');
const email = localStorage.getItem('email');


// const showProfile = () => {
//   const profileUserImg = document.querySelector('.profile-user-img');
//   const nameProfile = document.querySelector('#name-profile');
//   const emailProfile = document.querySelector('#email-profile');

// console.log(profileUserImg);
//   if(uid) {
//     console.log(name);
//      nameProfile.innerHTML = `${name}`;
//      emailProfile.innerHTML = `${email}`;
      
//       if (photo === null) {
//         // debugger
//         profileUserImg.setAttribute("src","https://i.postimg.cc/6pRsrH91/user-2.png");
//       } else {
//         // debugger
//         profileUserImg.setAttribute("src", `${photo}`);
//       }
//     } else {
//       // ningun usuario conectado
//     }
// }

// showProfile();


// const showProfile = () => {
//   const currentUser = todo.currentUser();
//   console.log(currentUser);
// }

// showProfile();

// const showProfile = () => {
//   todo.auth.onAuthStateChanged
// }

// showProfile();





// const showProfileImg = () => {

//   todo.auth.onAuthStateChanged((user) => {
  
//     const profileUserImg = document.querySelector('.profile-user-img');
//     const nameProfile = document.querySelector('#name-profile');
//     const emailProfile = document.querySelector('#email-profile');
//     // console.log(user);
//     // console.log(profileUserImg);
//     // console.log(emailProfile);
    
//     if (user) {
//       // console.log(user);
//       // console.log(user.uid);
//       // console.log(nameProfile);
//       nameProfile.innerHTML = `${user.displayName}`;
//       emailProfile.innerHTML = `${user.email}`;
//       console.log(user.photoURL);
//       if (user.photoURL === null) {
//         debugger
//         profileUserImg.setAttribute("src","https://i.postimg.cc/6pRsrH91/user-2.png");
//       } else {
//         debugger
//         profileUserImg.setAttribute("src", `${user.photoURL}`);
//       }
//     } else {
//       // ningun usuario conectado
//     }
//   })
  
  
// };
// showProfileImg();

