import * as all from './firebase/firebase-login.js';
import * as todo from './firebase/firebase-config.js';
import './view/login-view.js';
import './view/signup-view.js';
import './view/mainPage-view.js';
import './view/header-view.js';
import './view/change-view.js'

// ------------------------------------ Estructura del login ------------------------------------ //

// const loginSection = document.getElementById('login-section');
// const loginDiv = document.createElement('div');
// loginDiv.className = 'login-div';
// loginDiv.innerHTML = `
//     <!--SECCION PRINCIPAL DEL LOGIN-->
//     <div class="content-container">
//         <img class="illustration" src="./images/dog-walking.svg" alt="">
//         <form id="login-form">
//                 <img class="logo" src="./images/petPlace.svg" alt="">
//                 <p>¡Bienvenid@ Pet Lover!</p>
//                 <input class="login-email" type="email" placeholder="Coloca tu correo" id="email" required>
//                 <input class="login-password" type="password" placeholder="Coloca tu contraseña" name="" id="password" required>
//                 <button id="signin-btn">Iniciar Sesión</button>
//                 <p>O bien ingresa por...</p>
//                 <div class="options">
//                     <img class="img" id="facebook-btn" src="./images/facebook.svg" alt="">
//                     <img class="img" id="gmail-btn" src="./images/google.svg" alt="">
//                 </div>
//                 <p>¿No tienes cuenta?  <a href="#/signup" id="sign-up">Regístrate</a></p>
//          </form>
//     </div>
//     <!----------MODAL-------------->

//     <div class="modal-container" style="display: none">
//       <div class="modal-content">
//         <p id="error-message"></p>
//         <p id="message" style="display:none"></p>
//         <button class="modal-btn">Aceptar</button>
//       </div>
//     </div>

//     <!--SECCION PARA REGISTRARSE-->
//     <div id="signup-container" style= "display: none">
//         <form id="signup-form">
//                 <img class="logo" src="./images/petPlace.svg" alt="">
//                 <h2>Regístrate gratis</h2>
//                 <div class="labels-container">
//                     <label for="signup-name">Coloca tu nombre:</label>
//                     <input class="input" type="text" placeholder="Coloca tu nombre" id="signup-name" required>
//                     <label for="signup-email">Coloca tu correo:</label>
//                     <input class="input" type="email" placeholder="Coloca tu correo" id="signup-email" required>
//                     <label for="signup-password">Crea tu contraseña:</label>
//                     <input class="input" type="password" placeholder="Coloca tu contraseña" name="" id="signup-password" required>
//                 </div>
//                 <button id="signup-btn">Resgistrarse</button>
//                 <p>¿Ya tienes cuenta? <a id="sign-in" href="#/">Inicia Sesión</a></p>
//             </form>
//     </div>
//     `;
// loginSection.appendChild(loginDiv);




// ------------------------------------ Variables / Constantes ---------------------------------- //
const contentContainer = document.querySelector('.content-container');
const signUpForm = document.querySelector('#sign-up');
const signUpContainer = document.getElementById('signup-container');
const signInForm = document.querySelector('#sign-in');
const signUpBtn = document.querySelector('#signup-btn');
const headerBarNav = document.querySelector('#header-bar-nav');
const mainPage = document.querySelector('#main-page');
const signOutBtn = document.querySelector('#sign-out');
const google = document.querySelector('#gmail-btn');
const facebook = document.querySelector('#facebook-btn');
const modal = document.querySelector('.modal-container');
const errorMessage = document.querySelector('#error-message');
const modalBtn = document.querySelector('.modal-btn');
const loginEmail = document.querySelector('.login-email');
const loginPassword = document.querySelector('.login-password');
const signupName = document.querySelector('#signup-name');
const signupEmail = document.querySelector('#signup-email');
const signupPassword = document.querySelector('#signup-password');

// ----------------------------------------- Registro ----------------------------------------- //

// Función para mostrar contenedor de registro
// signUpForm.addEventListener('click', (e) => {
//   e.preventDefault();
//   contentContainer.style.display = 'none';
//   signUpContainer.style.display = 'block';
// });

// Función para registrarse
const checkIn = (email, password, name) => {
  all.userSignUp(email, password, name).then((result) => {
    const email = result.user.email;
    console.log(email);
    console.log('registro exitoso');
    result.user.updateProfile({
      displayName: name,
    });
    const configuration = {
      url: 'http://localhost:5000/',
    };
    result.user.sendEmailVerification(configuration).catch((error) => {
      console.log(error);
    });
    all.signOut;
    modal.style.display = 'flex';
    modal.style.backgroundColor='#F8C908';
    message.style.display = 'inline';
    message.textContent=`Bienvenido ${name}, revisa tu correo para poder verificar tu cuenta`;
    // alert(`Bienvenido ${name}, revisa tu correo para poder verificar tu cuenta`);
  })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        errorMessage.textContent = 'Por favor, completa los campos';
        modal.style.display = 'flex';
        signupName.disabled = true;
        signupEmail.disabled = true;
        signupPassword.disabled = true;
        // alert('Por favor, completa los campos');
      }
      if (errorCode === 'auth/email-already-in-use') {
        errorMessage.textContent = 'El correo ingresado ya está siendo utilizado, por favor, ingresa un correo válido';
        modal.style.display = 'flex';
        signupName.disabled = true;
        signupEmail.disabled = true;
        signupPassword.disabled = true;
        // alert('El correo ingresado ya está siendo utilizado, por favor, ingresa un correo válido');
      }
      if (errorCode === 'auth/weak-password') {
        errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres';
        modal.style.display = 'flex';
        signupName.disabled = true;
        signupEmail.disabled = true;
        signupPassword.disabled = true;
        // alert('La contraseña debe tener al menos 6 caracteres');
      }
    });
};

// ----------------- authStateChange para mostrar y ocultar contenedores ------------------------ //

// Función para gestionar el estado del usuario
const authStateChange = () => {
  all.authStateChange((user) => {
    if (user) {
      headerBarNav.style.display = 'inline';
      loginSection.style.display = 'none';
      mainPage.style.display = 'flex';
    } else {
      loginSection.style.display = 'inline';
      mainPage.style.display = 'none';
      headerBarNav.style.display = 'none';
    }
  });
};

// Guarda el uid del usuario en el localStorage
all.authStateChange((user) => {
  if(user) {
    localStorage.setItem('user', user.uid);
  } else {
    console.log('Ningún usuario a iniciado sesión');
  }
})

// ------------------------------------- Inicio de sesión --------------------------------------- //

// Función para mostrar contenedor de iniciar sesión
// signInForm.addEventListener('click', (e) => {
//   e.preventDefault();
//   contentContainer.style.display = 'flex';
//   signUpContainer.style.display = 'none';

//   document.querySelector('#signup-form').reset();
//   document.querySelector('#login-form').reset();
// });

// Función para iniciar sesión
const login = (email, password) => {
  all
    .userSignIn(email, password)
    .then((result) => {
      if (result.user.emailVerified) {
        authStateChange();
      } else {
        all.signOut;
        alert(`${result.user.displayName} por favor, realiza la verificación`);
      }
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        errorMessage.textContent = 'Por favor ingrese su usuario y contraseña';
        modal.style.display = 'flex';
        loginEmail.disabled = true;
        loginPassword.disabled = true;
        // alert('Por favor ingrese su usuario y contraseña');
      }
      if (errorCode === 'auth/wrong-password') {
        errorMessage.textContent = 'Contraseña incorrecta, inténtelo de nuevo';
        modal.style.display = 'flex';
        loginEmail.disabled = true;
        loginPassword.disabled = true;
        // alert('Contraseña incorrecta, inténtelo de nuevo');
      }
      if (errorCode === 'auth/user-not-found') {
        errorMessage.textContent = 'El correo que ingresó no está registrado, por favor, regístrece';
        modal.style.display = 'flex';
        loginEmail.disabled = true;
        loginPassword.disabled = true;
        // alert('El correo que ingresó no está registrado, por favor, regístrece');
      }
    });
};

// Función de inicio con Google
const loginGoogle = () => {
  all
    .googleLogIn()
    .then((result) => {
      console.log(result);
      authStateChange();
    })
    .catch((error) => {
      console.log(error);
      console.log('no funciona');
    });
};

// Función de  inicio con Facebook
const loginFacebook = () => {
  all.facebookLogin()
    .then(() => {
      authStateChange();
    })
    .catch((error) => {
      console.log(error);
    });
};

// ------------------------------------------- Eventos  ----------------------------------------- //

//Evento para registrarse
// signUpBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   const name = document.querySelector('#signup-name').value;
//   const email = document.querySelector('#signup-email').value;
//   const password = document.querySelector('#signup-password').value;
//   checkIn(email, password, name);
//   document.querySelector('#signup-form').reset();
// });

// Evento para inciar sección
const signInBtn = document.querySelector('#signin-btn');
signInBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  document.querySelector('#login-form').reset();
  login(email, password);
});

// Evento para cerrar sesión
signOutBtn.addEventListener('click', () => {
  todo.signOut
    .then(() => {
      console.log('cerraste sesión');
      headerBarNav.style.display = 'none';
      loginSection.style.display = 'inline';
      mainPage.style.display = 'none';
    })
    .catch((error) => {
      console.log(error);
      headerBarNav.style.display = 'inline';
      loginSection.style.display = 'none';
      mainPage.style.display = 'flex';
    });
});

// Evento de google login
google.addEventListener('click', () => {
  loginGoogle();
});

// Evento de facebook login
facebook.addEventListener('click', () => {
  loginFacebook();
});

// Evento para cerrar modal
modalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  loginEmail.disabled = false;
  loginPassword.disabled = false;
  signupName.disabled = false;
  signupEmail.disabled = false;
  signupPassword.disabled = false;
})