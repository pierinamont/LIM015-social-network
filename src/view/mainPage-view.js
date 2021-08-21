// import * as firebase from "../firebase/firebase-login.js";
import * as todo from '../firebase/firebase-config.js';

const db = todo.firestore;

export const viewMainPage = () => {
  const mainPageSection = `
    <!----------------perfil---------------->
    <div class = 'profile-container'> 
      <div class="profile">
        <img class="profile-user-img" src=${localStorage.getItem('photo')}>
        <p id='name-profile'>${localStorage.getItem('name')}</p>
        <p id='email-profile'>${localStorage.getItem('email')}</p>
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
};

// Función que obtiene el valor del input y lo envía a Firestore
const getValues = () => {
  const inputTimeline = document.querySelector('.input-timeline');
  const day = Date.now();
  const objectoAccion = new Date(day);

  let imgBase64=obtenerBase64()


  if (inputTimeline.value !== 0) {
    return db.collection('posts').add({
      photo: localStorage.getItem('photo'),
      name: localStorage.getItem('name'),
      description: inputTimeline.value,
      day: objectoAccion.toLocaleString(),
      user: localStorage.getItem('uid'),
      likesUser: [],

    })
      .then((docRef) => {
        console.log(docRef);
        console.log('Documento escrito con el ID: ', docRef.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  alert('Por favor, llena los campos');
};
// ****************LIKE*************//
const likePost = document.getElementsByClassName('like-post');
const addEventLike = () => {
  for (let i = 0; i < likePost.length; i++) {
    likePost[i].addEventListener('click', (e) => {
      const idPost = e.target.closest('.post-body').getAttribute('data-idpost');
      const post = db.collection('posts').doc(idPost);
      post.get().then((res) => {
        if (res.exists) {
          const arrayLikes = res.data().likesUser;
          const userLikes = arrayLikes.filter((a) => a.user === localStorage.getItem('uid'));
          // si el usuario dio like, ELIMINAMOS DICHO REGISTRO DEL ARRAY
          if (userLikes.length !== 0) {
            post.update({
              likesUser: arrayLikes.filter((a) => a.user !== localStorage.getItem('uid')),
            });
          } else { // no existe like para ese usuario, entonces añadir al array
            const newLike = {
              userName: localStorage.getItem('name'),
              user: localStorage.getItem('uid'),
            };
            arrayLikes.push(newLike);
            // actualizar arrayLikes a la coleccion en firestore
            post.update({
              likesUser: arrayLikes,
            });
          }
        }
      })
        .catch((error) => {
          console.log(error);
        });
    });
  }
};
// eliminar los post publicados// pendiente!
const removePost = document.getElementsByClassName('close-img');

const addEventDeletePOst = () => {
  for (let i = 0; i < removePost.length; i++) {
    removePost[i].addEventListener('click', (e) => {
      const idPost = e.target.closest('.post-body').getAttribute('data-idpost');
      const post = db.collection('posts').doc(idPost);
      post.delete().then(() => {
        console.log('Document successfully deleted!');
      })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    });
  }
};

//* input class= 'editar' type='text' value = '${doc.data().description}'></input>

const editImg = document.getElementsByClassName('edit-img');
const editPost = () => {
  for (let i = 0; i < editImg.length; i++) {
    editImg[i].addEventListener('click', (e) => {
      const idPost = e.target.closest('.post-body').getAttribute('data-idpost');
    });
  }
};

// Función que trae la colección de datos para las publicaciones

// const getPost = () => db.collection('posts').get();
const postInRealTime = (callback) => db.collection('posts').orderBy('day', 'desc').onSnapshot(callback);

export const getPublish = () => {
  postInRealTime((querySnapshot) => {
    const post = document.getElementById('post');
    post.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const uidUser = localStorage.getItem('uid');
      const arrayLikesPost = doc.data().likesUser;
      let likeMe = false;
      let htmlCorazon;
      if (uidUser != null) {
        // userLikes: likes del usuario en sección
        const userLikes = arrayLikesPost.filter((a) => a.user === uidUser);
        if (userLikes.length >= 1) {
          likeMe = true;
        }
      }
      if (likeMe === true) {
        htmlCorazon = '<img class="dislike like-post" src="../images/like2.svg">';
      } else {
        htmlCorazon = '<img class="like-post" src="../images/like1.svg">';
      }

      post.innerHTML += `
      <div class='post-body' data-idpost='${doc.id}'>
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
         <div class="likes-container">
         ${htmlCorazon}
          <img class="send-post" src='../images/send.svg' >
         </div>
          <div class="likes-counter">
             <span></span><p id="p-likes">${arrayLikesPost.length} Likes</p>
          </div>
        </div>
      </div>

      
      <!-------modal editar y guardar publicacion------!>
      <div>
      <input class= 'editar' type='text' value = '${doc.data().description}'></input>
      <button class = 'guardar'> Guardar </button>
      </div>
      `;
    });
    addEventDeletePOst();
    addEventLike();
    editPost();
  });
};

// ------------------------------------------- Eventos  ----------------------------------------- //
// Evento del botón "Publicar"
document.addEventListener('click', (e) => {
  if (e.target.id === 'publish-btn') {
    const inputTimeline = document.querySelector('.input-timeline');
    getValues().then(() => {
      postInRealTime();
    })
      .catch((error) => {
        console.log(error);
      });
    inputTimeline.value = '';
  }
});
