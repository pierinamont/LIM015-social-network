import * as firebase from "../firebase/firebase-login.js";
import * as config from "../firebase/firebase-config.js";
import '../view/login-view.js';
import '../view/signup-view.js';
import '../view/mainPage-view.js';
import '../view/header-view.js';
// ---------------------------------- Constantes  ------------------------------------ //
const db = config.firestore;

// ----------------------------------- Estructura del header ------------------------------------ //

// headerNav.className = 'headerNav';
// headerNav.innerHTML = `
//     <div class="menu-hamburger" id="toggle-button">
//         <div class="menu-line"></div>
//         <div class="menu-line"></div>
//         <div class="menu-line"></div>
//     </div>     
//     <img class="logo-nav" src="../images/logo-horizontal(2).svg"></img>
//     <ul class="ul-nav" id="nav-list">
//         <li class="li-nav">
//             <a>Inicio</a>
//         </li>
//         <li class="li-nav">
//             <a>Mi perfil</a>
//         </li>
//         <li class="li-nav" id="sign-out">
//         <img src="../images/sign-out.svg"></img><a>Cerrar Sesión</a>
//         </li>
//     </ul>
// `;
// const headerBarNav = document.getElementById('header-bar-nav');
// const headerNav = document.createElement('nav');
// headerBarNav.appendChild(headerNav);

// ------------------------------------ Header ------------------------------------------- //
// const toggleButton = document.getElementById('toggle-button');
// const navList = document.getElementById('nav-list');

// Evento para el menu de hamburguesa
// toggleButton.addEventListener('click', () => {
//   navList.classList.toggle('active');
// });

// ----------------------------------- Página principal ----------------------------------------- //
// Estructura de la página principal
// container.className = 'container';
// container.innerHTML = `
//   <!----------------perfil---------------->
//   <div class = 'profile-container'> 
//     <div class="profile">
//       <img class="profile-user-img" src=''>
//       <p id='name-profile'></p>
//       <p id='email-profile'></p>
//       <img class="line-decor" src="../images/line.svg"></img>
//     </div>
//   </div>
//   <!----------------muro---------------->
//   <div class = 'timeline-container'>
//     <div class= 'timeline'>
//       <input class='input-timeline' type='text' placeholder='Comparte algo'><br>
//       <div class= 'container-btn'>
//         <img src='../images/picture.svg'>
//         <input id="publish-btn" type=button value='Publicar'>
//       </div>
//     </div>
//   </div>
//   <!----------- publicaciones---------->
//   <div class = 'posts-container'>
//     <div id="post"></div>
//   </div>
//   <!----------- Campañas ----------->
//   <div class="campaign-container">
//     <div class="campaign-content">
//       <h3>Campañas 📢</h3>
//       <div id="campaign-img"></div>
//       <button>Información</button>
//     </div>
//   </div>
//   <!----------- github ----------->
//   <div class="github-container style="display: none">
//     <div class="github-content">
//     <p class="copyright">Pet Place ® 2021</p>
//       <a href="https://github.com/yesireth">
//         <img src="../images/github-white.svg"></img><p>Y. Suárez</p>
//       </a>
//       <a href="https://github.com/makemile">
//         <img src="../images/github-white.svg"></img><p>K. Moncada</p>
//       </a>
//       <a href="https://github.com/pierinamont">
//         <img src="../images/github-white.svg"></img><p>P. Montalva</p>
//       </a>
//     </div>
//   </div>
//   `;
// const mainPage = document.getElementById('main-page');
// const container = document.createElement('div');
// mainPage.appendChild(container);

// ----------------------------------------- Perfil ------------------------------------------- //
// const profileUserImg = document.querySelector('.profile-user-img');
// const nameProfile = document.querySelector('#name-profile');
// const emailProfile = document.querySelector('#email-profile');

// Función para motrar la imagen de perfil y su nombre
// const showProfileImg = () => {
//   firebase.authStateChange((user) => {
//     if (user) {
//       nameProfile.innerHTML = `${user.displayName}`;
//       emailProfile.innerHTML = `${user.email}`;
//       if (user.photoURL === null) {
//         profileUserImg.setAttribute(
//           "src",
//           "https://i.postimg.cc/6pRsrH91/user-2.png"
//         );
//       } else {
//         profileUserImg.setAttribute("src", `${user.photoURL}`);
//       }
//     } else {
//       // ningun usuario conectado
//     }
//   });
// };
// showProfileImg();

// ----------------------------------------- Muro ------------------------------------------- //
const publishBtn = document.querySelector('#publish-btn'); 
const inputTimeline = document.querySelector('.input-timeline');


// Función que obtiene el valor del input y lo envía a Firestore
const getValues = () => {
  
  const user = config.currentUser();
  const day = Date.now();
  const objectoAccion = new Date(day);

  if(inputTimeline.value != 0) {
    return  db.collection('posts').add({
      photo: user.photoURL,
      name: user.displayName,
      description: inputTimeline.value,
      day: objectoAccion.toLocaleString(),
      user: user.uid,
      likesUser: [],
    })
    .then((docRef) => {
      console.log(docRef);
      console.log("Documento escrito con el ID: ", docRef.id);
    })
    .catch((error) => {
      console.log(error);
    });
  } else {
    alert('Por favor, llena los campos');
  }
  
};
// ---------------------------------- Publicaciones --------------------------------------- //

// -------------------LIKE--------------------//
// const dislike = document.querySelector('.dislike-post');
// // const counterLike = document.getElementById('"p-likes');
// const likePost = document.getElementsByClassName('like-post');
// const agregarEventoLike = () => {
//   for (let i = 0; i < likePost.length; i++) {
//     likePost[i].addEventListener('click', (e) => {
//       const currentUser = config.currentUser();
//       const idPost = e.target.parentElement.parentElement.getAttribute('data-idpost');
//       const post = db.collection('posts').doc(idPost);
//       post.get().then((res) => {
//         if (res.exists) {
//           console.log(res.data());
//           const arrayLikes = res.data().likesUser;
//           const userLikes = arrayLikes.filter((a) => a.user === currentUser.uid);
//           console.log(userLikes);
//           // si el usuario dio like, ELIMINAMOS DICHO REGISTRO DEL ARRAY
//           if (userLikes.length !== 0) {
//             console.log('DISLIKEEEE');

//             post.update({
//               likesUser: arrayLikes.filter((a) => a.user !== currentUser.uid),
//             });
//           } else { // no existe like para ese usuario, entonces añadir al array
//             console.log('LIKE!');
//             const newLike = {
//               userName: currentUser.displayName,
//               user: currentUser.uid,
//             };
//             arrayLikes.push(newLike);
//             // actualizar arrayLikes a la coleccion en firestore
//             post.update({
//               likesUser: arrayLikes,
//             });
//           }
//         }
//       })
//         .catch((error) => {
//           console.log(error);
//         });
//     });
//   }
// };
// eliminar
// const removePost = document.getElementsByClassName('.close-img');

// const delePOst = () => {
//   for (let i = 0; i < removePost.length; i++) {
//     removePost[i].addEventListener('click', () => {
//       alert('eliminaaa');
//       // const eliminar = ((user) => {
//       //   db.collection('post').delete().then(() => {
//       //     console.log('Document successfully deleted!');
//       //   })
//       //     .catch((error) => {
//       //       console.error('Error removing document: ', error);
//       //     });
//       // });
//     });
//   }
// };

// Función que trae la colección de datos para las publicaciones

// const getPost = () => db.collection('posts').get();
// const postInRealTime = (callback) => db.collection('posts').orderBy('day', 'desc').onSnapshot(callback);

// window.addEventListener('DOMContentLoaded', async () => {
//   // const arrayPosts = [];
//   /* const  = await getPost(); */
//   postInRealTime((querySnapshot) => {
//     const post = document.getElementById('post');
//     post.innerHTML = '';
//     querySnapshot.forEach((doc) => {

//       let likeMe = false;
//       let htmlCorazon;
//       if (config.currentUser() != null) {
//         const currentUser = config.currentUser();
//         const arrayLikesPost = doc.data().likesUser;
//         const userLikes = arrayLikesPost.filter((a) => a.user === currentUser.uid);
//         if (userLikes.length >= 1) {
//           likeMe = true;
//         }
//       }
//       if (likeMe === true) {
//         htmlCorazon = `<img class="dislike-post" src='../images/like2.svg' style="display: none">`;
//       } 
//       else {
//         htmlCorazon = `<img class="like-post" src='../images/like1.svg' ></img>`;
//       }

//       post.innerHTML += `
//       <div class='post-body' data-idpost='${doc.id}'>
//         <div class="img-name">
//           <img class="profile-user-img" src='${doc.data().photo}'>
//           <span>
//             <p class="name">${doc.data().name}</p>
//             <p class="date">${doc.data().day}</p>
//           </span>
          
//           <i>
//             <img class="edit-img" src='../images/edit3.svg'>
//             <img class="close-img" src='../images/close-1.svg'>
//           </i>
//         </div>
//         <div class="description-div">
//           <p>${doc.data().description}</p>
//         </div>
//         <div class="date-likes">
         
         
//          <div class="likes-container">
//          ${htmlCorazon}
//           <img class="send-post" src='../images/send.svg' >
//          </div>
         
//           <div class="likes-counter">
//              <span></span><p id="p-likes">Likes</p>
//           </div>
//         </div>
//       </div>
//       `;
//     });
//     agregarEventoLike();
//   });
// });
// ------------------------------------------- Eventos  ----------------------------------------- //
// Evento del botón "Publicar"
// publishBtn.addEventListener('click', () => {
//   getValues().then(() => {
//     postInRealTime();
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//   inputTimeline.value = '';
// });
