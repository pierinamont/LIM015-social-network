import { loginIn, signInGoogle, signInFacebook } from './funciones/funciones-firebase.js';

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

// ----------------------------- Inicio de sesión ------------------------------ //
document.addEventListener('click', (e) => {
  if (e.target.id === 'signin-btn') {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    loginIn(email, password);
  }
});

// ----------------------------- Inicio de sesión Google ------------------------------ //

document.addEventListener('click', (e) => {
  if (e.target.id === 'gmail-btn') {
    signInGoogle();
  }
});

// --------------------------- Inicio de sesión Facebook --------------------------- //

document.addEventListener('click', (e) => {
  if (e.target.id === 'facebook-btn') {
    signInFacebook();
  }
});
