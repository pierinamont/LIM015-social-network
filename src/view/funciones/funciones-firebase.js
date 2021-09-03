/* eslint-disable prefer-promise-reject-errors */
// import { reject } from 'async';
// ----------------------------- evento click de registro ------------------------------ //
export const signup = (email, password) => firebase.auth()
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

//       result.user.sendEmailVerification(configuration)
//         .catch((error) => {
//         console.log(error); // eslint-disable-line
//         });
//       firebase.auth().signOut();
//       resolve();
//     })
//     .catch((error) => {
//       reject(error);
//     });
// });

// ----------------------------- Inicio de sesión ------------------------------ //

export const loginIn = (email, password) => firebase
  .auth()
  .signInWithEmailAndPassword(email, password);

// --------------------------- Inicio de sesión google --------------------------- //
export const signInGoogle = () => {
  const providerGoogle = new firebase.auth.GoogleAuthProvider();
  const loginWithGoogle = firebase.auth().signInWithPopup(providerGoogle);
  return loginWithGoogle;
};

// --------------------------- Inicio de sesión Facebook --------------------------- //
export const signInFacebook = () => {
  const providerFacebook = new firebase.auth.FacebookAuthProvider();
  const loginWithFacebook = firebase.auth().signInWithPopup(providerFacebook);
  return loginWithFacebook;
};

// --------------------------- seccion header// cerrar sesión --------------------------- //
export const signOut = () => firebase.auth().signOut();

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
      rechazar('documeto no registrado');
    });
});

// -------------------- Likes de usuarios ---------------------- //

export const likepublish = (idPost) => new Promise((resolve, reject) => {
  const post = firebase.firestore().collection('posts').doc(idPost);
  post.get()
    .then((res) => {
      if (res.exists) {
        resolve(res);
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
      reject(error);
      console.log(error);
    });
});

// ------------------------------- Eliminar posts ----------------------------- //
export const deletePost = (idPost) => new Promise((resolver, rechazar) => {
  const post = firebase.firestore().collection('posts').doc(idPost);
  post.delete().then(() => {
    resolver('eliminado');
  })
    .catch((error) => {
      console.error('Error removing document: ', error);
      rechazar('no se pudo eliminar');
    });
});

// ------mostrar los like de los usuarios-------//
export const showlike = (idPost) => new Promise((resolver, reject) => {
  const showPostLike = firebase.firestore().collection('posts').doc(idPost);
  showPostLike.get().then((res) => {
    if (res.exists) resolver(res);
    else {
      reject(null);
    }
  })
    .catch(() => {
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
        photo: doc.data().photo,
        name: doc.data().name,
        description: doc.data().description,
        day: doc.data().day,
        user: doc.data().user,
        likesUser: doc.data().likesUser,
      });
    });
    callback(arrayPost);
  });
