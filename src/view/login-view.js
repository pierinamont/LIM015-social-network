import * as todo from '../firebase/firebase-config.js';
import * as all from '../firebase/firebase-login.js';

export const viewLogin = () => {
  const loginSection = `
    <!--SECCION PRINCIPAL DEL LOGIN-->
    <div class="content-container">
        <img class="illustration" src="./images/dog-walking.svg" alt="">
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

// console.log(viewLogin());

// ------------------- Obtener y guardar datos del usuario ---------------------------- //
const getUserInfo = () => {
  const currentUser = todo.currentUser();

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
document.addEventListener('click', (e) => {
  if (e.target.id === 'signin-btn') {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const login = (email, password) => {
      all
        .userSignIn(email, password)
        .then((result) => {
          const hash = '#/mainPage';
          if (result.user.emailVerified) {
            window.location.hash = hash;
            console.log('verificado');
            getUserInfo();
          } else {
            all.signOut;
            const errorMessage = document.querySelector('#error-message');
            errorMessage.style.display = 'inline';
            errorMessage.textContent = `${result.user.displayName} por favor, realiza la verificación`;
            // alert(`${result.user.displayName} por favor, realiza la verificación`);
          }
        })
        .catch((error) => {
          const errorMessage = document.querySelector('#error-message');
          errorMessage.style.display = 'inline';
          console.log(error);
          const errorCode = error.code;
          if (errorCode === 'auth/invalid-email') {
            errorMessage.textContent = 'Por favor ingrese su usuario y contraseña';
          }
          if (errorCode === 'auth/wrong-password') {
            errorMessage.textContent = 'Contraseña incorrecta, inténtelo de nuevo';
          }
          if (errorCode === 'auth/user-not-found') {
            errorMessage.textContent = 'El correo que ingresó no está registrado, por favor, regístrece';
          }
        });
    };
    login(email, password);
  }
});

// ----------------------------- Inicio de sesión Google ------------------------------ //
document.addEventListener('click', (e) => {
  if (e.target.id === 'signin-btn') {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const login = (email, password) => {
      all.userSignIn(email, password)
        .then((result) => {
          const hash = '#/mainPage';
          if (result.user.emailVerified) {
            window.location.hash = hash;
            console.log('verificado');
            getUserInfo();
          } else {
            all.signOut;
            alert(`${result.user.displayName} por favor, realiza la verificación`);
          }
        })
        .catch((error) => {
          console.log(error);
          // const errorCode = error.code;
          // if (errorCode === 'auth/invalid-email') {
          //   alert('Por favor ingrese su usuario y contraseña');
          // }
          // if (errorCode === 'auth/wrong-password') {
          //   alert('Contraseña incorrecta, inténtelo de nuevo');
          // }
          // if (errorCode === 'auth/user-not-found') {
          //   alert('El correo que ingresó no está registrado, por favor, regístrece');
          // }
        });
    };
    login(email, password);
  }
});

// ----------------------------- Inicio de sesión Google ------------------------------ //
document.addEventListener('click', (e) => {
  if (e.target.id === 'gmail-btn') {
    all
      .googleLogIn()
      .then((result) => {
        // console.log(result);
        getUserInfo();
        const hash = '#/mainPage';
        window.location.hash = hash;
      })
      .catch((error) => {
        console.log(error);
        console.log('no funciona');
      });
  }
});

// --------------------------- Inicio de sesión Facebook --------------------------- //
document.addEventListener('click', (e) => {
  if (e.target.id === 'facebook-btn') {
    all.facebookLogin()
      .then(() => {
        getUserInfo();
        const hash = '#/mainPage';
        window.location.hash = hash;
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
