import * as all from '../firebase/firebase-login.js';

export const viewSignup = () => {
  const signupSection = `
    <div class="modal-container" style="display: none">
         <div class="modal-content">
           <p id="message"></p>
           <button class="modal-btn">Aceptar</button>
          </div>
    </div>

    <!--SECCION PARA REGISTRARSE-->
    <div id="signup-container">
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
                    <p id="error-message" style="display:none"></p>
                </div>
                <button id="signup-btn">Resgistrarse</button>
                <p>¿Ya tienes cuenta? <a id="sign-in" href="#/login">Inicia Sesión</a></p>
            </form>
    </div>
    
    `;
  const loginDiv = document.createElement('div');
  loginDiv.className = 'login-div';
  loginDiv.innerHTML = signupSection;
  return loginDiv;
};

// ----------------------------- Botón de registro ------------------------------ //
document.addEventListener('click', (e) => {
  if (e.target.id === 'signup-btn') {
    const name = document.querySelector('#signup-name').value;
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;

    all.userSignUp(email, password, name).then((result) => {
      const email = result.user.email;
      console.log(email);
      console.log('registro exitoso');

      result.user.updateProfile({
        displayName: name,
      });
      const configuration = {
        url: 'http://localhost:5000/#/login',
      };
      result.user.sendEmailVerification(configuration).catch((error) => {
        console.log(error);
      });
      all.signOut;
      document.querySelector('#signup-form').reset();
      const modal = document.querySelector('.modal-container');
      modal.style.display = 'flex';
      message.textContent = `Bienvenido ${name}, revisa tu correo para poder verificar tu cuenta`;
      // alert(`Bienvenido ${name}, revisa tu correo para poder verificar tu cuenta`);
    })
      .catch((error) => {
        const errorMessage = document.querySelector('#error-message');
        errorMessage.style.display = 'flex';

        console.log(error);
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          errorMessage.textContent = 'Por favor, completa los campos';
          document.querySelector('#signup-form').reset();
          
        }
        if (errorCode === 'auth/email-already-in-use') {
          errorMessage.textContent = 'El correo ingresado ya está siendo utilizado, por favor, ingresa un correo válido';
          document.querySelector('#signup-form').reset();
         
        }
        if (errorCode === 'auth/weak-password') {
          errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres';
        }
      });
  }
});

//-------- Botón de Aceptar ----------//
document.addEventListener('click', (e) => {
  if(e.target.className === 'modal-btn') {
    const modal = document.querySelector('.modal-container');
    modal.style.display = 'none';
  }
})