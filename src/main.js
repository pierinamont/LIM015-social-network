// Este es el punto de entrada de tu aplicacion
// import * as all from './lib/index.js';
// import * as all from 'firebase-admin';

import * as all from './firebase/firebase-login.js';
import * as todo from './firebase/firebase-config.js';

;// Crear estructura del login
const loginSection = document.getElementById('login-section');
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


// Función para mostrar contenedor de registro
const contentContainer = document.querySelector('.content-container'); 
const signUpForm = document.querySelector('#sign-up'); 
const signUpContainer = document.getElementById('signup-container'); 
signUpForm.addEventListener('click', (e) => {
  e.preventDefault();
  contentContainer.style.display = 'none';
  signUpContainer.style.display = 'block';
});

// Función para mostrar contenedor de iniciar sesión
const signInForm = document.querySelector('#sign-in');
signInForm.addEventListener('click', (e) => {
  e.preventDefault();
  contentContainer.style.display = 'flex';
  signUpContainer.style.display = 'none';

  document.querySelector('#signup-form').reset();
  document.querySelector('#login-form').reset();
});

// Función para registrarse
const checkIn = (email, password, name) => {
  all.userSignUp(email, password, name)
.then((result) => {
  const email = result.user.email;
    console.log(email);
    console.log('registro exitoso');
    result.user.updateProfile({
      displayName: name
    })
    const configuration = {
      url: 'http://localhost:5000/'
    }
    result.user.sendEmailVerification(configuration).catch(error => {
      console.log(error)
    })
    all.signOut
    alert(`Bienvenido ${name}, debes realizar el proceso de verificación`)
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
}

// Función para gestionar el estado del usuario
const headerBarNav = document.querySelector('#header-bar-nav');
const mainPage = document.querySelector('#main-page');

const authStateChange = () => {
  all.authStateChange(user => {
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
}

// Función para iniciar sesión
const login = (email, password) =>{
  all.userSignIn(email, password)
  .then((result) => {
    if(result.user.emailVerified) {
      alert(`Bienvenido ${result.user.displayName}`)
      authStateChange();
    } else {
      all.signOut
      alert(`${result.user.displayName} por favor, realiza la verificación`)
    }
  })
  .catch((error) => {
    console.log(error);
    const errorCode = error.code;
    if (errorCode === 'auth/invalid-email') {
      alert('Por favor ingrese su usuario y contraseña');
    }
    if (errorCode === 'auth/wrong-password') {
      alert('Contraseña incorrecta, inténtelo de nuevo');
    }
    if (errorCode === 'auth/user-not-found') {
      alert('El correo que ingresó no está registrado, por favor, regístrece');
    }
  })
}

// Función de Google login
const loginGoogle = () => {
  all.googleLogIn()
  .then((result) => {
    console.log(result);
    alert(`Bienvenido ${result.user.displayName}`);
  })
  .catch((error) => {
    console.log(error);
    console.log('no funciona');
  })
}

// Función de Facebook login
const loginFacebook = () => {
  all.facebookLogin()
  .then((result) => {
    alert(`Bienvenido ${result.user.displayName}`);
  })
  .catch((error) => {
    console.log(error);
  })
}

// Función currentUser
// const currentUser = all.currentUser
// if(currentUser) {

// }



// Eventos

// Evento para registrarse
const signUpBtn = document.querySelector('#signup-btn'); 
signUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.querySelector('#signup-name').value;
  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;
  checkIn(email, password, name)
  document.querySelector('#signup-form').reset();
});

// Evento de inciar sección 
const signInBtn = document.querySelector('#signin-btn'); 
signInBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  document.querySelector('#login-form').reset();
  login(email,password);
});

// Evento de cerrar sesión
const signOutBtn = document.querySelector('#sign-out');
const mainPage = document.getElementById('main-page');

signOutBtn.addEventListener('click', (e) => {
  todo.signOut
    .then(function() {
    console.log('cerraste sesión')
    headerBarNav.style.display = 'none';
    loginSection.style.display = 'inline';
    mainPage.style.display = 'none';
  })
  .catch((error) => {
    console.log(error);
    headerBarNav.style.display = 'inline';
    loginSection.style.display = 'none';

    mainPage.style.display = 'flex';
  })

})

// Evento de google login
const google = document.querySelector('#gmail-btn');
google.addEventListener('click', (e) => {
  loginGoogle();
  authStateChange(); /*PIERINA */
});

// Evento de facebook login
const facebook = document.querySelector('#facebook-btn');
facebook.addEventListener('click', (e) => {
  loginFacebook();
  authStateChange(); /*PIERINA */
});
