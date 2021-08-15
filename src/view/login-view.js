
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
                <a id="signin-btn" href="#/mainPage">Iniciar Sesión</a>
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

