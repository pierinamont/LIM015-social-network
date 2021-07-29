// Este es el punto de entrada de tu aplicacion
// import * as all from './lib/index.js';
// import * as all from 'firebase-admin';

import * as all from './firebase/firebase-login.js';

const loginSection = document.getElementById('login-section');

// CREAR ESTRUCTURA DEL LOGIN

const loginDiv = document.createElement('div');
loginDiv.className = 'login-div';
loginDiv.innerHTML = `

    <!--SECCION PRINCIPAL DEL LOGIN-->

    <div class="content-container">
        <img class="illustration" src="./images/dog-walking.svg" alt="">
        <form id="login-form">
                <img class="logo" src="./images/petPlace.svg" alt="">
                <p>¡Bienvenid@ Pet Lover!</p>
                <input type="email" placeholder="Coloca tu correo" id="email" required>
                <input type="password" placeholder="Coloca tu contraseña" name="" id="password" required>
                <button id="signin-btn">Iniciar Sesión</button>
                <p>O bien ingresa por...</p>
                <div class="options">
                    <img class="img" id="facebook-btn" src="./images/facebook.svg" alt="">
                    <img class="img" id="gmail-btn" src="./images/google.svg" alt="">
                </div>
                <p>¿No tienes cuenta? <strong id="sign-up">Regístrate</strong></p>
         </form>
    </div>

    <!--SECCION PARA REGISTRARSE-->

    <div id="signup-container" style= "display: none">
        <form id="signup-form">
                <img class="logo" src="./images/petPlace.svg" alt="">
                <h2>Regístrate gratis</h2>
                <div class="labels-container">
                    <label for="signup-name">Coloca tu nombre:</label>
                    <input class="input" type="text" placeholder="Coloca tu nombre" id="signup-name" required>

                    <label for="signup-email">Coloca tu correo:</label>
                    <input class="input" type="email" placeholder="Coloca tu correo" id="signup-email" required>

                    <label for="signup-password">Crea tu contraseña:</label>
                    <input class="input" type="password" placeholder="Coloca tu contraseña" name="" id="signup-password" required>
                </div>
                <button id="signup-btn">Resgistrarse</button>
                <p>¿Ya tienes cuenta? <strong id="sign-in">Inicia Sesión</strong></p>
            </form>
    </div>

    `;
loginSection.appendChild(loginDiv);

// FUNCIÓN PARA MOSTRAR CONTENEDOR DE REGISTRO
const contentContainer = document.querySelector('.content-container'); // Llama contenedor del login
const signUpForm = document.querySelector('#sign-up'); // Llama a registrarse
const signUpContainer = document.getElementById('signup-container'); // Llama contenedor de registro
signUpForm.addEventListener('click', (e) => {
  e.preventDefault();
  contentContainer.style.display = 'none';
  signUpContainer.style.display = 'block';
});

// FUNCIÓN PARA MOSTRAR CONTENEDOR DE INICIAR SESIÓN
const signInForm = document.querySelector('#sign-in');
signInForm.addEventListener('click', (e) => {
  e.preventDefault();
  contentContainer.style.display = 'flex';
  signUpContainer.style.display = 'none';

  // Sirve para resetear el registro cuando haces click en el texto Iniciar Sesión
  document.querySelector('#signup-form').reset();
});

// FUNCION PARA REGISTRARSE
const signUpBtn = document.querySelector('#signup-btn'); // Llama a registrarse
signUpBtn.addEventListener('click', (e) => {
  // Evita que la página vuelva a cargar//
  e.preventDefault();

  // Llamando el valor de los inputs
  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;

  // Llama la función de error y éxito
  all.userSignUp(email, password)
    .then(() => {
      alert('exito');
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        alert('Por favor, completa los campos');
      }
      if (errorCode === 'auth/email-already-in-use') {
        alert('El correo ingresado ya está siendo utilizado, por favor, ingresa un correo válido');
      }
      if (errorCode === 'auth/weak-password') {
        alert('La contraseña debe tener al menos 6 caracteres');
      }
    });
});

// FUNCION PARA INICIAR SESION
const signInBtn = document.querySelector('#signin-btn'); // Llama boton de iniciar sesión

signInBtn.addEventListener('click', (e) => {
  /* Evento al pulsar */
  // Evita que la página vuelva a cargar//
  e.preventDefault();

  // Llamando el valor de los inputs
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  all.userSignIn(email, password)
    .then(() => {
      alert('iniciaste sesion');
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;

      if (errorCode === 'auth/invalid-email') {
        alert('Por favor ingrese su usuario y contraseña');
      }
      // error contraseña incorrecta
      if (errorCode === 'auth/wrong-password') {
        alert('Contraseña incorrecta, inténtelo de nuevo');
      }
      // error usuario no encontrado
      if (errorCode === 'auth/user-not-found') {
        alert('El correo que ingresó no está registrado, por favor, regístrece');
      }
    });
});

// FUNCIÓN DE GOOGLE LOGIN
const google = document.querySelector('#gmail-btn');

google.addEventListener('click', (e) => {
  all.googleLogIn()
  .then(() => {
    console.log('funciona');
  })
  .catch((error) => {
    console.log(error);
    console.log('no funciona');
  })
});

//Funcion de facebook login

const facebook = document.querySelector('#facebook-btn');

facebook.addEventListener('click', (e) => {

  all.FacebookLogin()
  .then((result) => {
    // console.log('funciona');
    let token = result.credential.accessToken;
    let user = result.user;
    console.log(user.display);
    updateUser(user);
  })

  .catch((error) => {
    console.log(error);
    // alert('no funciona');
  })
});















// const auth = getAuth();
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });