export const viewLogin = () => {
  const loginSection = `
    <!--SECCION PRINCIPAL DEL LOGIN-->
    <div class="content-container">
        <div class="div-h3-img">
          <h2>Únete y forma parte de la <span style="font-weight: bold">comunidad</span> para <span  style="font-weight: bold">buscar</span>, <span  style="font-weight: bold">encontrar</span> y <span  style="font-weight: bold">adoptar</span> mascotas.</h2>
          <img class="illustration" src="./images/dog-walking.svg" alt="">
        </div>
        <form id="login-form">
                <img class="logo" src="./images/petPlace.svg" alt="">
                <p>¡Bienvenid@ Pet Lover!</p>
                <input class="login-email" type="email" placeholder="Coloca tu correo" id="email" required>
                <input class="login-password" type="password" placeholder="Coloca tu contraseña" name="" id="password" required>
                <p id="error-message" style="display:none"></p>
                <a id="signin-btn">Iniciar Sesión</a>
                <p>O bien ingresa por...</p>
                <div class="options">
                    <img class="img" id="facebook-btn" src="./images/facebook.svg" alt="">
                    <img class="img" id="gmail-btn" src="./images/google.svg" alt="">
                </div>
                <p>¿No tienes cuenta?  <a href="#/signup" id="sign-up">Regístrate</a></p>
         </form>
    </div>
    `;

  const loginDiv = document.createElement('div');
  loginDiv.className = 'login-div';
  loginDiv.innerHTML = loginSection;

  return loginDiv;
};

// ------------------- Obtener y guardar datos del usuario ---------------------------- //
const getUserInfo = () => {
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

// document.addEventListener('click', (e) => {
//   if (e.target.id === 'signin-btn') {
//     const email = document.querySelector('#email').value;
//     const password = document.querySelector('#password').value;
//     loginIn(email, password);
//   }
// });

// ----------------------------- Inicio de sesión Google ------------------------------ //
// const signInGoogle = () => {
//   firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
//     .then(() => {
//       getUserInfo();
//       const hash = '#/mainPage';
//       window.location.hash = hash;
//     })
//     .catch((error) => {
//       console.log(error);
//       console.log('no funciona');
//     });
// };

// document.addEventListener('click', (e) => {
//   if (e.target.id === 'gmail-btn') {
//     signInGoogle();
//   }
// });

// --------------------------- Inicio de sesión Facebook --------------------------- //

// const signInFacebook = () => {
//   firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
//     .then(() => {
//       getUserInfo();
//       const hash = '#/mainPage';
//       window.location.hash = hash;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
// document.addEventListener('click', (e) => {
//   if (e.target.id === 'facebook-btn') {
//     signInFacebook();
//   }
// });
