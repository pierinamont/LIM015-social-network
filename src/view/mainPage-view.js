import {
  publishPost, likepublish, deletePost, showlike, editar,
} from './funciones/funciones-firebase.js';

export const viewMainPage = () => {
  const mainPageSection = `
  <div class="popup-wrapper" style="display:none;">
    <div class="popup">
        <div class="popup-close">X</div>
        <div id="div-contenido-likes" class="popup-content">
        </div>
    </div>
  </div>
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
          <img class="imgpicture" src='../images/picture.svg'>
          <input id="publish-btn" type=button value='Publicar'>
        </div>
      </div>
    </div>
    <!----------- publicaciones---------->
    <div class="posts-container">
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

const db = firebase.firestore();
// -------------------- Likes de usuarios ---------------------- //

const likePost = document.getElementsByClassName('like-post');

const addEventLike = () => {
  for (let i = 0; i < likePost.length; i += 1) {
    likePost[i].addEventListener('click', (e) => {
      const idPost = e.target.closest('.post-body').getAttribute('data-idpost');
      likepublish(idPost);
    });
  }
};

// ------------------------------- Eliminar posts ----------------------------- //
const removePost = document.getElementsByClassName('close-img');
document.addEventListener('click', (e) => {
  if (e.target.className === 'delete-btn') {
    const idPost = e.target.closest('.post-body').getAttribute('data-idpost');
    deletePost(idPost);
  }
});

// -----------evento para cancelar, cuando ya no se quiere eliminar el post----//
document.addEventListener('click', (e) => {
  if (e.target.className === 'cancel-btn') {
    const idPost = e.target.closest('.post-body').getAttribute('data-idpost');
    const divConfir = document.getElementById(`deletePost-${idPost}`);
    divConfir.style.display = 'none';
  }
});

// ------mostrar los like de los usuarios-------//
document.addEventListener('click', (e) => {
  if (e.target.className === 'mostrar-likes') {
    const popup = document.querySelector('.popup-wrapper');
    popup.style.display = 'block';
    const idPost = e.target.closest('.post-body').getAttribute('data-idpost');
    showlike(idPost).then((res) => {
      if (res != null) {
        const arrayLikes = res.data().likesUser;
        const divLikes = document.getElementById('div-contenido-likes');
        // obtener la division donde va a pintar todos los likes
        divLikes.innerHTML = '';
        arrayLikes.forEach((elemento) => {
          divLikes.innerHTML += `<h1>${elemento.userName}</h1> <br>`;
        });
      }
    })
      .catch((error) => {
        console.log(error); // eslint-disable-line
      });
  }
});

// ------evento para cerrar el popup de  los likes-------//
document.addEventListener('click', (e) => {
  if (e.target.className === 'popup-close') {
    const popup = document.querySelector('.popup-wrapper');
    popup.style.display = 'none';
  }
});

// ----- funcion para editar post-----//
const editPost = document.getElementsByClassName('edit-img');
const addEventEdit = () => {
  for (let i = 0; i < editPost.length; i += 1) {
    editPost[i].addEventListener('click', (e) => {
      const idPost = e.target.closest('.post-body').getAttribute('data-idpost');
      document.getElementById(`txteditPost-${idPost}`).style.display = 'block';
      document.getElementById(`btn-container-${idPost}`).style.display = 'block';
      document.getElementById(`txtDescription-${idPost}`).style.display = 'none';
    });
  }
};

const addEventDeletePOst = () => {
  for (let i = 0; i < removePost.length; i += 1) {
    removePost[i].addEventListener('click', (e) => {
      const idPost = e.target.closest('.post-body').getAttribute('data-idpost');
      const divConfir = document.getElementById(`deletePost-${idPost}`); // obtenemos el div confirmacion eliminacion del post
      divConfir.style.display = 'flex';
    });
  }
};

// -------------------- Trae colección de datos en tiempo real ---------------------- //
const postInRealTime = (callback) => db.collection('posts').orderBy('day', 'desc').onSnapshot(callback);

export const getPublish = () => {
  postInRealTime((querySnapshot) => {
    const post = document.getElementById('post');
    post.innerHTML = '';
    querySnapshot.forEach((doc) => {
      const uidUser = localStorage.getItem('uid');
      const arrayLikesPost = doc.data().likesUser;
      let likeMe = false;
      let htmlOpDeleteUpdate = '';
      let htmlCorazon;
      if (uidUser != null) {
        // userLikes: likes del usuario en sección
        const userLikes = arrayLikesPost.filter((a) => a.user === uidUser);
        if (userLikes.length >= 1) {
          likeMe = true;
        }
        if (uidUser === doc.data().user) {
          htmlOpDeleteUpdate = `
          <i>
            <img class="edit-img" src='../images/edit3.svg'>
            <img class="close-img" src='../images/close-1.svg'>
          </i>`;
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
          ${htmlOpDeleteUpdate}
        </div>
        <div class="description-div">
          <p id='txtDescription-${doc.id}'>${doc.data().description}</p>
          <input id='txteditPost-${doc.id}' class= 'editar' type='text' value = '${doc.data().description}' style="display: none"></input>
          <div class="btn-container" id="btn-container-${doc.id}" style="display: none">
            <button id='btneditPost-${doc.id}'class="save-edit-btn">Guardar</button>
            <button id='btnCancelEdit-${doc.id}'class="cancel-edit-btn">Cancelar</button>
          </div>
        </div>
        <div class="date-likes">
         <div class="likes-container">
         ${htmlCorazon}
          <img class="send-post" src='../images/send.svg' >
         </div>
          <div class="likes-counter">
             <span></span><a id="p-likes" class="mostrar-likes" style="cursor:pointer;">${arrayLikesPost.length} Likes</a>
          </div>
        </div>
        <!----------- Modal para eliminar---------->
      <div  style="display: none" id='deletePost-${doc.id}' class="delete-post">
        <div class = 'delete'>
          <p id='question-delete'>¿Eliminar post?</p>
          <p id='message-delete'>Una vez ya eliminado no podras recuperar el post</p>
          <button class='delete-btn'>Borrar</button>
          <button class='cancel-btn'>Cancelar</button>
        </div>
      </div>
    </div>
      `;
    });
    addEventDeletePOst();
    addEventLike();
    addEventEdit();
  });
};

// --------- Evento del botón "Publicar"-----------//
document.addEventListener('click', (e) => {
  if (e.target.id === 'publish-btn') {
    const inputPost = document.querySelector('.input-timeline');
    if (inputPost.value.trim().length > 0) {
      const date = new Date(Date.now());
      const objPublicacion = {
        photo: localStorage.getItem('photo'),
        name: localStorage.getItem('name'),
        description: inputPost.value,
        day: date.toLocaleString(),
        user: localStorage.getItem('uid'),
        likesUser: [],
      };
      publishPost(objPublicacion)
        .then((resolve) => {
          console.log(resolve);// eslint-disable-line
        })
        .catch((reject) => {
          console.log(reject);// eslint-disable-line
        });
    } else {
      alert('Por favor, llena los campos'); // eslint-disable-line
    }
    inputPost.value = '';
  }
});

// -------- Evento del botón guardar y cancelar-------- //

document.addEventListener('click', (e) => {
  // botón guardar//
  if (e.target.className === 'save-edit-btn') {
    const idPost = e.target.closest('.post-body').getAttribute('data-idpost');
    console.log(idPost); // eslint-disable-line
    const newValue = document.getElementById(`txteditPost-${idPost}`).value; // obtenemos el elemento//
    editar(idPost, newValue);
    document.getElementById(`btn-container-${idPost}`).style.display = 'none';
    document.getElementById(`txteditPost-${idPost}`).style.display = 'none';
    document.getElementById(`txtDescription-${idPost}`).style.display = 'inline';
  }

  // botón cancelar//
  if (e.target.className === 'cancel-edit-btn') {
    const idPost = e.target.closest('.post-body').getAttribute('data-idpost');
    document.getElementById(`txteditPost-${idPost}`).style.display = 'none';
    document.getElementById(`btn-container-${idPost}`).style.display = 'none';
    document.getElementById(`txtDescription-${idPost}`).style.display = 'inline';
  }
});
