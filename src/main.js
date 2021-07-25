// Este es el punto de entrada de tu aplicacion
//import * as all from './lib/index.js';
//import * as all from 'firebase-admin';

import * as all from "./firebase/firebase-login.js";


const loginSection = document.getElementById('login-section')

// CREAR ESTRUCTURA DEL LOGIN

    const loginDiv = document.createElement('div');
    loginDiv.className = 'login-div';
    loginDiv.innerHTML = `

    <!--SECCION PRINCIPAL DEL LOGIN-->

    <div class="content-container">
        <img class="illustration" src="../images/dog-walking.svg" alt="">
        <form id="login-form">
                <img class="logo" src="../images/petPlace.svg" alt="">
                <p>¡Bienvenid@ Pet Lover!</p>
                <input type="email" placeholder="Coloca tu correo" id="email" required>
                <input type="password" placeholder="Coloca tu contraseña" name="" id="password" required>
                <button id="signin-btn">Iniciar Sesión</button>
                <p>O bien ingresa por...</p>
                <div class="options">
                    <img class="img" id="facebook-btn" src="../images/facebook.svg" alt="">
                    <img class="img" id="gmail-btn" src="../images/google.svg" alt="">
                </div>
                <p>¿No tienes cuenta? <strong id="sign-up">Regístrate</strong></p>
         </form>
    </div>

    <!--SECCION PARA REGISTRARSE-->

    <div id="signup-container" style= "display: none">
        <form id="signup-form">
                <img class="logo" src="../images/petPlace.svg" alt="">
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

    `
    loginSection.appendChild(loginDiv);


// FUNCIÓN PARA MOSTRAR CONTENEDOR DE REGISTRO
const contentContainer = document.querySelector('.content-container'); // Llama contenedor del login
const signUpForm = document.querySelector('#sign-up'); // Llama a registrarse
const signUpContainer = document.getElementById('signup-container'); // Llama contenedor de registro


signUpForm.addEventListener('click', e => {
    e.preventDefault(); 

    contentContainer.style.display = 'none';
    signUpContainer.style.display = 'block';
    // Función para registrarse
    all.getInputValue();
});

// FUNCIÓN PARA MOSTRAR CONTENEDOR DE INICIAR SESIÓN
const signInForm = document.querySelector('#sign-in');
const illustration = document.querySelector('.illustration');
//const inputs = document.querySelectorAll('.input');
//const active = document.activeElement;

signInForm.addEventListener('click', e => {
    e.preventDefault(); 
    
    contentContainer.style.display = 'block';
    signUpContainer.style.display = 'none';
    illustration.style.display = 'none';

    // Sirve para resetear el registro cuando haces click en el texto Iniciar Sesión
    document.querySelector('#signup-form').reset();
    
})





