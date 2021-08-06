import * as firebase from '../firebase/firebase-login.js';
import * as config from '../firebase/firebase-config.js';




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
toggleButton.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// Estructura del perfil
const mainPage = document.getElementById('main-page');

const container = document.createElement('div');
container.className = 'container';
container.innerHTML = `
<!----------------perfil---------------->
<div class = 'profile-container'> 
  <div class="profile">
     <img class="profile-user-img" src=''>
     <p id='name-profile'></p>
  </div>
</div>

<!----------------muro---------------->
<div class = 'timeline-container'>
  <div class= 'timeline'>
   <input class='input-timeline' type=text placeholder='Crear publicación'><br>
   <div class= 'container-btn'>
   <img src='../images/picture.svg'>
   <input id="publish-btn" type=button value='Publicar'>
   </div>
  </div>
</div>

<!--------publicaciones---------->
<div class = 'posts-container'>

</div>


`;
mainPage.appendChild(container);

// Función para motrar la imagen
const profileUserImg = document.querySelector('.profile-user-img');
const nameProfile = document.querySelector('#name-profile');

const showProfileImg = () => {
  firebase.authStateChange((user) => {
    if (user) {
      nameProfile.innerHTML = `${user.displayName}`;
      if (user.photoURL === null) {
        profileUserImg.setAttribute('src', 'https://i.postimg.cc/6pRsrH91/user-2.png');
      } else {
        profileUserImg.setAttribute('src', `${user.photoURL}`);
      }
    } else {
    // ningun usuario conectado
    }
  });
};

showProfileImg();




const database = config.db;
const inputTimeline = document.querySelector('.input-timeline');
const publishBtn = document.querySelector('#publish-btn');


const postDatabase = () => {
  let description = value('desc');
}


// Evento de botón publicar
publishBtn.addEventListener('click', () => {

});