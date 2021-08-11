import * as firebase from '../firebase/firebase-login.js';
import * as config from '../firebase/firebase-config.js';

// aqui exportaras las funciones que necesites
const headerBarNav = document.getElementById('header-bar-nav');

const headerNav = document.createElement('nav');
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
   <input class='input-timeline' type='text' placeholder='Crear publicación'><br>
   <div class= 'container-btn'>
   <img src='../images/picture.svg'>
   <input id="publish-btn" type=button value='Publicar'>
   </div>
  </div>
</div>
<!--------publicaciones---------->
<div class = 'posts-container'>
  <!-- <img class="post-user-img" src='' display="style: none">
  // <p class="user-name"></p>-->
  <div id="post"></div>
</div>
`;
mainPage.appendChild(container);

// Función para motrar la imagen de perfil y su nombre
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

const db = config.firestore;
const inputTimeline = document.querySelector('.input-timeline');
const publishBtn = document.querySelector('#publish-btn'); // Botón para publicar
// const userNameParagraph = document.querySelector('.user-name'); // p
// const postUserImg = document.querySelector('.post-user-img');
const inputPost = document.querySelector('input-post');

// Nombre en contenedor de publicación (etiqueta p)
// const userName = () => {
//   firebase.authStateChange((user) => {
//     if (user) {
//       userNameParagraph.innerHTML = `${user.displayName}`;
//       if (user.photoURL === null) {
//         postUserImg.setAttribute('src', 'https://i.postimg.cc/6pRsrH91/user-2.png');
//       } else {
//         postUserImg.setAttribute('src', `${user.photoURL}`);
//       }
//     } else {
//       console.log('error');
//     }
//   });
// };
// Mostrar publicacion
const publishPost = () => {
  const inputTimelineV = inputTimeline.value;
  let inputPostV = inputPost;
  inputPostV = inputTimelineV;

  console.log(inputPostV);

  if (inputTimeline.value === '') {
    alert('Rellenar espacios ');
  } else {
    inputPost.style.display = 'block';
  }
};
// Mostrar nombre de usuario autentificado

// Obtiene el valor del input

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

/* const getPost = () => db.collection('posts').get(); */
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
          <span>
        </div>

        <div class="description-div">
          <p>${doc.data().description}</p>
        </div>

        <div class="date-likes">
         
        </div>
      </div>
      `;
      arrayPosts.push(doc.data());
    });
  });
});

// Evento de botón publicar
publishBtn.addEventListener('click', () => {
  getValues().then(() => {
    postInRealTime();
  });
  inputTimeline.value = '';
});
