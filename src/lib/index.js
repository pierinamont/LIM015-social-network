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
   <input class='input-timeline' type='text' placeholder='Crear publicación'><br>
   <div class= 'container-btn'>
   <img src='../images/picture.svg'>
   <input id="publish-btn" type=button value='Publicar'>
   </div>
  </div>
</div>

<!--------publicaciones---------->
<div class = 'posts-container'>
  <p class="user-name"></p>
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
const userNameParagraph = document.querySelector('.user-name'); // p

// Nombre en contenedor de publicación (etiqueta p)
// const userName = () => {
//   firebase.authStateChange((user) => {
//     if (user) {
//       userNameParagraph.innerHTML = `${user.displayName}`;
//       // (user.displayName);
//     } else {
//       console.log('error');
//     }
  
//   });
// }
// userName();

// Mostrar nombre de usuario autentificado
const showName = () => {
  let nameP = '';
  firebase.authStateChange((user) => {
    if (user) {
      nameP = user.displayName;
      // console.log(nameP);
    }
  });
  // console.log(nameP);
  // return nameP;
};
showName();



// Obtiene el valor del input
const getValues = () => {
  firebase.authStateChange((user) => {
    if (user) {
      
   

      db.collection('posts').add({
      //  db.collection('users').doc(user.uid).set({
        // name: showName(),
        user: user.uid,
        description: inputTimeline.value
      })
      .then((docRef) => {
        console.log(docRef);
        console.log('Documento escrito con el ID: ', docRef.id);

        ////////////////quitarlo de aqui despues
        db.collection("posts").where("user", "==", user.uid)
        .get()
        .then(function(querySnapshot) {
          let posts = [];
         /// console.log(querySnapshot);
          querySnapshot.forEach(function(doc) {
            posts.push(doc.data());
          });
          
          console.log("tus posts: ", posts);
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });


        


      })
      .catch((error) => {
        console.log(error);
      })

      /*nameProfile.innerHTML = `${user.displayName}`;
      if (user.photoURL === null) {
        profileUserImg.setAttribute('src', 'https://i.postimg.cc/6pRsrH91/user-2.png');
      } else {
        profileUserImg.setAttribute('src', `${user.photoURL}`);
      }*/
    } else {
    // ningun usuario conectado
    }
  }); 



}



// Evento de botón publicar
publishBtn.addEventListener('click', () => {

  getValues();
});