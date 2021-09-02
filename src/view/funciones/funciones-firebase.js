// ----------------------------- evento click de registro ------------------------------ //
export const signup = (email, password) => firebase
  .auth()
  .createUserWithEmailAndPassword(email, password);

// export const signup = (name, email, password) => new Promise((resolve, reject) => {
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then((result) => {
//       result.user.updateProfile({
//         displayName: name,
//       });

//       const configuration = {
//         url: 'http://localhost:5000',
//       };

//       result.user.sendEmailVerification(configuration).catch((error) => {
//         console.log(error); // eslint-disable-line
//       });
//       firebase.auth().signOut();
//       resolve();
//     })
//     .catch((error) => {
//       reject(error);
//     });
// });

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

  console.log(photo, name, email); // eslint-disable-line
};
// ----------------------------- Inicio de sesión ------------------------------ //

export const loginIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      const hash = '#/mainPage';
      // Si el correo está verificado ingresa a la página(mainPage)
      if (result.user.emailVerified) {
        window.location.hash = hash;
        console.log('verificado'); // eslint-disable-line
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
      console.log(error); // eslint-disable-line
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

export const signInGoogle = () => {
  const providerGoogle = new firebase.auth.GoogleAuthProvider();
  const loginWithGoogle = firebase.auth().signInWithPopup(providerGoogle);
  return loginWithGoogle;
};

export const googlePromise = () => {
  signInGoogle()
    .then(() => {
      getUserInfo();
      const hash = '#/mainPage';
      window.location.hash = hash;
    })
    .catch((error) => {
      console.log(error); // eslint-disable-line
      console.log('no funciona'); // eslint-disable-line
    });
};
// --------------------------- Inicio de sesión Facebook --------------------------- //
export const signInFacebook = () => {
  const providerFacebook = new firebase.auth.FacebookAuthProvider();
  const loginWithFacebook = firebase.auth().signInWithPopup(providerFacebook);
  return loginWithFacebook;
};

export const facebookPromise = () => {
  signInFacebook()
    .then(() => {
      getUserInfo();
      const hash = '#/mainPage';
      window.location.hash = hash;
    })
    .catch((error) => {
  console.log(error); // eslint-disable-line
    });
};

// --------------------------- seccion header// cerrar sesión --------------------------- //
export const signOut = () => firebase.auth().signOut();

export const signOutPromise = () => {
  signOut()
    .then(() => {
    console.log('cerraste sesión'); // eslint-disable-line
      const hash = '#/login';
      window.location.hash = hash;
      localStorage.clear(); // PRUEBA
    })
    .catch((error) => {
    console.log(error); // eslint-disable-line
      const hash = '#/mainPage';
      window.location.hash = hash;
    });
};

// ------seccion mainpage-------//
// -----Envia valores de los inputs a Firebase ---- //
export const publishPost = (objPublicacion) => new Promise((resolver, rechazar) => {
  firebase.firestore().collection('posts').add(objPublicacion)
    .then((docRef) => {
      console.log('Documento escrito con el ID: ', docRef.id); // eslint-disable-line
      resolver('documeto registrado');
    })
    .catch((error) => {
      console.log(error); // eslint-disable-line
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
  console.log(error); // eslint-disable-line

    });
};

// ------------------------------- Eliminar posts ----------------------------- //
export const deletePost = (idPost) => new Promise((resolver, rechazar) => {
  const post = firebase.firestore().collection('posts').doc(idPost);
  post.delete().then(() => {
    console.log('Document successfully deleted!'); // eslint-disable-line
    resolver('eliminado');
  })
    .catch((error) => {
      console.error('Error removing document: ', error); // eslint-disable-line
      // eslint-disable-next-line prefer-promise-reject-errors
      rechazar('no se pudo eliminar');
    });
});

// ------mostrar los like de los usuarios-------//
export const showlike = (idPost) => new Promise((resolver, reject) => {
  const showPostLike = firebase.firestore().collection('posts').doc(idPost);
  // showlike(idPost).get().then((res)
  showPostLike.get().then((res) => {
    if (res.exists) resolver(res);
    else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(null);
    }
  })
    .catch(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(null);
    });
});

// ----Función para editar post----//
export const editar = (idPost, newText) => new Promise((resolver, rechazar) => {
  const post = firebase.firestore().collection('posts').doc(idPost);

  // ------promesa para traer el post---------//
  post
    .get()
    .then((res) => {
      if (res.exists) {
        // Aquí se valida si existe el doc
        post.update({
          // Aquí se actualiza
          description: newText,
        });
        resolver('editado');
      }
    })
    .catch((error) => {
      console.log(error); // eslint-disable-line
      // eslint-disable-next-line prefer-promise-reject-errors
      rechazar('edicion rechazada');
    });
});
export const getPost = (callback) => firebase.firestore().collection('posts')
  .onSnapshot((querySnapshot) => {
    const arrayPost = [];
    querySnapshot.forEach((doc) => {
      arrayPost.push({
        photo: doc.photo,
        name: doc.name,
        description: doc.description,
        day: doc.day,
        user: doc.user,
        likesUser: doc.likesUser,
      });
    });
    callback(arrayPost);
  });
