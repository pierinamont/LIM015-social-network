import * as todo from '../firebase/firebase-config.js';
import * as all from '../firebase/firebase-login.js';

export const viewLogin = () => {
    const loginSection =  `
    <!--SECCION PRINCIPAL DEL LOGIN-->
    <div class="content-container">
        <img class="illustration" src="./images/dog-walking.svg" alt="">
        <form id="login-form">
                <img class="logo" src="./images/petPlace.svg" alt="">
                <p>¡Bienvenid@ Pet Lover!</p>
                <input class="login-email" type="email" placeholder="Coloca tu correo" id="email" required>
                <input class="login-password" type="password" placeholder="Coloca tu contraseña" name="" id="password" required>
                <a id="signin-btn">Iniciar Sesión</a>
                <p>O bien ingresa por...</p>
                <div class="options">
                    <img class="img" id="facebook-btn" src="./images/facebook.svg" alt="">
                    <img class="img" id="gmail-btn" src="./images/google.svg" alt="">
                </div>
                <p>¿No tienes cuenta?  <a href="#/signup" id="sign-up">Regístrate</a></p>
         </form>
    </div>
    <!----------MODAL-------------->
  
    <div class="modal-container" style="display: none">
      <div class="modal-content">
        <p id="error-message"></p>
        <button class="modal-btn">Aceptar</button>
      </div>
    </div>
    `;
  
    const loginDiv = document.createElement('div');
    loginDiv.className = 'login-div'
    loginDiv.innerHTML = loginSection;
    
    return loginDiv;
} 
 
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
}



// ----------------------------- Inicio de sesión ------------------------------ //
 document.addEventListener('click', (e) => {
  
    if(e.target.id === 'signin-btn') {
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
              getPostsFromFirebase(); //nuevo
            } else {
              all.signOut;
              alert(`${result.user.displayName} por favor, realiza la verificación`);
            }
          })
          .catch((error) => {
            console.log(error);
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-email') {
              // errorMessage.textContent = 'Por favor ingrese su usuario y contraseña';
              // modal.style.display = 'flex';
              // loginEmail.disabled = true;
              // loginPassword.disabled = true;
               alert('Por favor ingrese su usuario y contraseña');
            }
            if (errorCode === 'auth/wrong-password') {
              // errorMessage.textContent = 'Contraseña incorrecta, inténtelo de nuevo';
              // modal.style.display = 'flex';
              // loginEmail.disabled = true;
              // loginPassword.disabled = true;
              alert('Contraseña incorrecta, inténtelo de nuevo');
            }
            if (errorCode === 'auth/user-not-found') {
              // errorMessage.textContent = 'El correo que ingresó no está registrado, por favor, regístrece';
              // modal.style.display = 'flex';
              // loginEmail.disabled = true;
              // loginPassword.disabled = true;
               alert('El correo que ingresó no está registrado, por favor, regístrece');
            }
          });
      };
      login(email, password);
    };
 })

// ----------------------------- Inicio de sesión Google ------------------------------ //
document.addEventListener('click', (e) => {
  if(e.target.id === 'gmail-btn') {
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
})

// --------------------------- Inicio de sesión Facebook --------------------------- //
document.addEventListener('click', (e) => {
  if(e.target.id === 'facebook-btn') {
      all.facebookLogin()
        .then(() => {
          getUserInfo();
          const hash = '#/mainPage';
          window.location.hash = hash;
        })
        .catch((error) => {
          console.log(error);
        });
  };
})

// ----------- vistas de la ruta segun la autentificación del usuario ------------- //
// todo.auth.onAuthStateChanged((user) => {
//   if(user) {
//     // debugger
//     // const hash = '#/mainPage';
//     // window.location.hash = hash;
//     // console.log(user.displayName);
//     // localStorage.setItem('user', user.uid);
//     // localStorage.setItem('name', user.displayName);
//     // console.log(window.localStorage);
//     console.log(user)
//     getUserInfo();

//   } else {
//     // const hash = '#/';
//     // window.location.hash = hash;
//     // localStorage.removeItem('user');
//     // localStorage.removeItem('name');
//     console.log('Ningún usuario a iniciado sesión');
//   }
// })

// ---------------------- Obtener data del usuario ------------------- //





