import *  as firebase from '../firebase/firebase-login.js'
// aqui exportaras las funciones que necesites
const headerBarNav = document.getElementById('header-bar-nav');

const headerNav = document.createElement('nav');
headerNav.className = 'headerNav';
// headerNav.classListAdd('headerNav');
headerNav.innerHTML = `
    <div class="menu-hamburger" id="toggle-button">
        <div class="menu-line"></div>
        <div class="menu-line"></div>
        <div class="menu-line"></div>
    </div>     
    <img class="logo-nav" src="../images/logo-horizontal.svg"></img>
    <ul class="ul-nav" id="nav-list">
        <li class="li-nav">
            <a>Inicio</a>
        </li>
        <li class="li-nav">
            <a>Mi perfil</a>
        </li>
        <li class="li-nav" id="sign-out">
        <img src="../images/sign-out.svg"></img><a>Cerrar Sesión</a>
        </li>
    </ul>
`;
headerBarNav.appendChild(headerNav);

// Evento para el menu de hamburguesa
const toggleButton = document.getElementById('toggle-button');
const navList = document.getElementById('nav-list');
toggleButton.addEventListener('click',() => {
<<<<<<< HEAD
  navList.classList.toggle('active');
});
=======
    navList.classList.toggle('active');
})

// Estructura del perfil
const mainPage = document.getElementById('main-page');

const profileContainer = document.createElement('div');
profileContainer.className = 'profile-container';
profileContainer.innerHTML = `
<div class="profile">
<img class="profile-user-img" src=''>
</div>
`
mainPage.appendChild(profileContainer);

//Función para motrar la imagen 
const profileUserImg = document.querySelector('.profile-user-img');

const showProfileImg = () => {
    firebase.authStateChange(user => {
        if (user) {
            console.log(user.photoURL);
           if(user.photoURL === null) {
            profileUserImg.setAttribute('src', 'https://i.postimg.cc/6pRsrH91/user-2.png');
            console.log('no tienes foto');
         } else {
            profileUserImg.setAttribute('src', `${user.photoURL}`);
            console.log('tienes foto');
          
        }

        } else {
          // ningun usuario conectado
        }
      });

}
showProfileImg();

>>>>>>> 96306839893a2f0a77a2da2b6e5557461b666aba
