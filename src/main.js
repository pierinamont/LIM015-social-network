// Este es el punto de entrada de tu aplicacion

// import { myFunction, otrafuncion, otrafuncion } from './lib/index.js';
// myFunction();
//import * as all from './lib/index.js';
//import * as all from 'firebase-admin';

import * as all from "./firebase/firebase-login.js";

const loginSection = document.getElementById('login-section')

// Crear estructura del login

    const loginDiv = document.createElement('div');
    loginDiv.className = 'login-div';
    loginDiv.innerHTML = `

    <!--SECCION PRINCIPAL DEL LOGIN-->

    <div class="content-container">
        <img class="illustration" src="../images/dog-walking.svg" alt="">
        <form id="login-form">
                <img src="../images/Pet-Place.svg" alt="">
                <p>¡Bienvenid@ Pet Lover!</p>
                <input type="email" placeholder="Coloca tu correo" id="email" required>
                <input type="password" placeholder="Coloca tu contraseña" name="" id="password" required>
                <button id="signin-btn">Iniciar Sesión</button>
                <p>O bien ingresa por...</p>
                <div class="options">
                    <span id="facebook-btn"></span>
                    <span id="gmail-btn"></span>
                </div>
                <p>¿No tienes cuenta? <strong id="sign-up">Regístrate</strong></p>
            </form>
    </div>

    <!--SECCION PARA REGISTRARSE-->

    <div id="signup-container" style= "display: none">
        <form id="signup-form">
                <img src="../images/Pet-Place.svg" alt="">
                <h2>Regístrate gratis</h2>
                <div class="labels-container">
                    <label for="signup-name">Coloca tu nombre:</label>
                    <input type="text" placeholder="Coloca tu nombre" id="signup-name" required>

                    <label for="signup-email">Coloca tu correo:</label>
                    <input type="email" placeholder="Coloca tu correo" id="signup-email" required>

                    <label for="signup-password">Crea tu contraseña:</label>
                    <input type="password" placeholder="Coloca tu contraseña" name="" id="signup-password" required>
                </div>
                <button id="signup-btn">Resgistrarse</button>
                <p>¿Ya tienes cuenta? <strong id="sign-in">Inicia Sesión</strong></p>
            </form>
    </div>

    `
    loginSection.appendChild(loginDiv);


// FUNCIÓN PARA MOSTRAR CONTENEDOR
const contentContainer = document.querySelector('.content-container'); // Llama contenedor del login
const signUpForm = document.querySelector('#sign-up'); // Llama a registrarse
const signUpContainer = document.getElementById('signup-container'); // Llama contenedor de registro

signUpForm.addEventListener('click', e => {
    contentContainer.style.display = 'none';
    signUpContainer.style.display = 'block';

    all.getInputValue();

});






// Llama función para obtener datos de correo y password








