// ----------------------------- evento click de registro ------------------------------ //

export const signup = () => {
  const name = document.querySelector('#signup-name').value;
  let email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;
  const message = document.getElementById('message');

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      email = result.user.email;
      console.log(email);

      result.user.updateProfile({
        displayName: name,
      });
      const configuration = {
        url: 'http://localhost:5000',
      };
      result.user.sendEmailVerification(configuration)
        .catch((error) => {
          console.log(error);
        });
      firebase.auth().signOut();
      document.querySelector('#signup-form').reset();
      const modal = document.querySelector('.modal-container');
      modal.style.display = 'inline';
      message.textContent = `Bienvenido ${name}, revisa tu correo para poder verificar tu cuenta`;
    })
    .catch((error) => {
      const errorMessage = document.querySelector('#error-message');
      errorMessage.style.display = 'flex';
      document.querySelector('#signup-form').reset();

      console.log(error);
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        errorMessage.textContent = ' Por favor, completa los campos ';
        document.querySelector('#signup-form').reset();
      }
      if (errorCode === 'auth/email-already-in-use') {
        errorMessage.textContent = 'El correo ingresado ya está siendo utilizado, por favor, ingresa un correo válido';
        document.querySelector('#signup-form').reset();
      }
      if (errorCode === 'auth/weak-password') {
        errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres';
      }
    });
};

// ------------------- Obtener y guardar datos del usuario ---------------------------- //
export const getUserInfo = () => {
  const currentUser = firebase.auth().currentUser;

  // Obtener la info del usuario
  const uid = currentUser.uid;
  const name = currentUser.displayName;
  const email = currentUser.email;
  const photo = currentUser.photoURL;

  // Guardar la info en localStorage
  localStorage.setItem('uid', uid);
  localStorage.setItem('name', name);
  localStorage.setItem('email', email);
  localStorage.setItem('photo', photo);

  console.log(photo, name, email);
};
// ----------------------------- Inicio de sesión ------------------------------ //

export const loginIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      const hash = '#/mainPage';
      // Si el correo está verificado ingresa a la página(mainPage)
      if (result.user.emailVerified) {
        window.location.hash = hash;
        console.log('verificado');
        getUserInfo();
      } else {
        // De lo contrario su sesión se mantiene cerrado
        firebase.auth().signOut();
        const errorMessage = document.querySelector('#error-message');
        errorMessage.style.display = 'inline';
        errorMessage.textContent = `${result.user.displayName} por favor, realiza la verificación`;
      }
    })
    .catch((error) => {
      const errorMessage = document.querySelector('#error-message');
      errorMessage.style.display = 'inline';
      console.log(error);
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        errorMessage.textContent = 'Por favor ingrese su usuario y contraseña';
        document.querySelector('#login-form').reset();
      }
      if (errorCode === 'auth/wrong-password') {
        errorMessage.textContent = 'Contraseña incorrecta, inténtelo de nuevo';
        document.querySelector('#login-form').reset();
      }
      if (errorCode === 'auth/user-not-found') {
        errorMessage.textContent = 'El correo que ingresó no está registrado, por favor, regístrece';
        document.querySelector('#login-form').reset();
      }
    });
};

// ----------------------------- Inicio de sesión Google ------------------------------ //
export const signInGoogle = () => {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(() => {
      getUserInfo();
      const hash = '#/mainPage';
      window.location.hash = hash;
    })
    .catch((error) => {
      console.log(error);
      console.log('no funciona');
    });
};

// --------------------------- Inicio de sesión Facebook --------------------------- //
export const signInFacebook = () => {
  firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(() => {
      getUserInfo();
      const hash = '#/mainPage';
      window.location.hash = hash;
    })
    .catch((error) => {
      console.log(error);
    });
};

// --------------------------- seccion header// cerrar sesión --------------------------- //
export const signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      console.log('cerraste sesión');
      const hash = '#/login';
      window.location.hash = hash;
      localStorage.clear(); // PRUEBA
    })
    .catch((error) => {
      console.log(error);
      const hash = '#/mainPage';
      window.location.hash = hash;
    });
};
// ------seccion mainpage-------//
// -----Envia valores de los inputs a Firebase ---- //
export const publishPost = (objPublicacion) => new Promise((resolver, rechazar) => {
  firebase.firestore().collection('posts').add(objPublicacion)
    .then((docRef) => {
      console.log('Documento escrito con el ID: ', docRef.id);
      resolver('documeto registrado');
    })
    .catch((error) => {
      console.log(error);
      // eslint-disable-next-line prefer-promise-reject-errors
      rechazar('documeto no registrado');
    });
});

// -------------------- Likes de usuarios ---------------------- //
export const likepublish = (idPost) => {
  const post = firebase.firestore().collection('posts').doc(idPost);
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
};

// ------------------------------- Eliminar posts ----------------------------- //
export const deletePost = (idPost) => {
  const post = firebase.firestore().collection('posts').doc(idPost);
  post.delete().then(() => {
    console.log('Document successfully deleted!');
  })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

// ------mostrar los like de los usuarios-------//
export const showlike = (idPost) => {
  const post = firebase.firestore().collection('posts').doc(idPost);
  post.get().then((res) => {
    if (res.exists) {
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
      console.log(error);
    });
};

// -----------funciones postrealtime---------//

// ----Función para editar post----//
export const editar = (idPost, newText) => {
  const post = firebase.firestore().collection('posts').doc(idPost);

  // ------promesa para traer el post---------//
  post.get().then((res) => {
    if (res.exists) { // Aquí se valida si existe el doc
      post.update({ // Aquí se actualiza
        description: newText,
      });
    }
  })
    .catch((error) => {
      console.log(error);
    });
};
