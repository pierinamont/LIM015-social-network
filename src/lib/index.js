import * as firebase from '../firebase/firebase-login.js';
import * as config from '../firebase/firebase-config.js';

// ---------------------------------- Constantes  ------------------------------------ //
const headerBarNav = document.getElementById('header-bar-nav');
const headerNav = document.createElement('nav');
const mainPage = document.getElementById('main-page');
const container = document.createElement('div');
const db = config.firestore;

// ----------------------------------- Estructura del header ------------------------------------ //

headerNav.className = 'headerNav';
headerNav.innerHTML = `
    <div class="menu-hamburger" id="toggle-button">
        <div class="menu-line"></div>
        <div class="menu-line"></div>
        <div class="menu-line"></div>
    </div>     
    <img class="logo-nav" src="../images/logo-horizontal(2).svg"></img>
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

// ------------------------------------ Header ------------------------------------------- //
const toggleButton = document.getElementById('toggle-button');
const navList = document.getElementById('nav-list');

// Evento para el menu de hamburguesa
toggleButton.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// ----------------------------------- Página principal ----------------------------------------- //
// Estructura de la página principal
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
    <input class='input-timeline' type='text' placeholder='Crear publicación'><br>
    <div class= 'container-btn'>
    <img src='../images/picture.svg'>
    <input id="publish-btn" type=button value='Publicar'>
    </div>
    </div>
  </div>
  <!--------publicaciones---------->
  <div class = 'posts-container'>
    <div id="post"></div>
  </div>
  `;
mainPage.appendChild(container);

// ----------------------------------------- Perfil ------------------------------------------- //
const profileUserImg = document.querySelector('.profile-user-img');
const nameProfile = document.querySelector('#name-profile');

// Función para motrar la imagen de perfil y su nombre
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

// ----------------------------------------- Muro ------------------------------------------- //
const publishBtn = document.querySelector('#publish-btn'); // Botón para publicar
const inputTimeline = document.querySelector('.input-timeline');

// Función para el muro => vaciar el input
// const emptyInput = () => {
//   if (inputTimeline.value === '') {
//     alert('Rellenar espacios ');
//   }
// };

// Función que obtiene el valor del input y lo envía a Firestore
const getValues = () => {
  const user = config.currentUser();
  const day = Date.now();
  const objectoAccion = new Date(day);
  return db.collection('posts').add({
    photo: user.photoURL,
    name: user.displayName,
    description: inputTimeline.value,
    day: objectoAccion.toLocaleString(),
  })
    .then((docRef) => {
      console.log(docRef);
      console.log('Documento escrito con el ID: ', docRef.id);
    })
    .catch((error) => {
      console.log(error);
    });
};
// ---------------------------------- Publicaciones --------------------------------------- //

// Función que trae la colección de datos para las publicaciones

// const getPost = () => db.collection('posts').get();
const postInRealTime = (callback) => db.collection('posts').onSnapshot(callback);

window.addEventListener('DOMContentLoaded', async () => {
  const arrayPosts = [];
  /* const  = await getPost(); */
  postInRealTime((querySnapshot) => {
    const post = document.getElementById('post');
    post.innerHTML = '';
    querySnapshot.forEach((doc) => {
      post.innerHTML += `
      <div class='post-body'>

        <div class="img-name">
          <img class="profile-user-img" src='${doc.data().photo}'>

          <span>
          <p class="name">${doc.data().name}</p>
          <p class="date">${doc.data().day}</p>
          </span>

          <i>
          <img class="edit-img" src='../images/edit3.svg'>
          <img class="close-img" src='../images/close-1.svg'>
          </i>

        </div>

        <div class="description-div">
          <p>${doc.data().description}</p>
        </div>

        <div class="date-likes">
          <img class="like-post" src='../images/like1.svg' >
          <img class="dislike-post" src='../images/like2.svg' style="display: none">
          <p id="p-likes"></p>
        </div>
      </div>
      `;
      arrayPosts.push(doc.data());
    });
  });
});

// ------------------------------------------- Eventos  ----------------------------------------- //

// Evento del botón "Publicar"
publishBtn.addEventListener('click', () => {
  getValues().then(() => {
    postInRealTime();
  });
  inputTimeline.value = '';
});
