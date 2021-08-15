
export const viewSignup = () => {
    const signupSection = `
    <div class="modal-container" style="display: none">
         <div class="modal-content">
           <p id="error-message"></p>
           <p id="message" style="display:none"></p>
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
                </div>
                <button id="signup-btn">Resgistrarse</button>
                <p>¿Ya tienes cuenta? <a id="sign-in" href="#/">Inicia Sesión</a></p>
            </form>
    </div>
    
    `;
    const loginDiv = document.createElement('div');
    loginDiv.className = 'login-div'
    loginDiv.innerHTML = signupSection;
    return loginDiv;
    
} 

//console.log(viewSignup());


