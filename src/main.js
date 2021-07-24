// Este es el punto de entrada de tu aplicacion

// import { myFunction, otrafuncion, otrafuncion } from './lib/index.js';
// myFunction();
//import * as all from './lib/index.js';
//import * as all from 'firebase-admin';

import * as all from './firebase/firebase-login.js';

const loginSection = document.getElementById('login-section');

// Crear estructura del login

    const loginDiv = document.createElement('div');
    loginDiv.className = 'login-div';
    loginDiv.innerHTML = `
    <img src="" class="logo"></img>
    <form id="signup-form">
        <input type="email" placeholder="Coloca tu correo" id="email" required>
        <input type="password" placeholder="Coloca tu contraseña" name="" id="password" required>
        <button type="submit" id="submit-btn">Iniciar Sesión</button>
    </form>
    `
    loginSection.appendChild(loginDiv);




// Llama función para obtener datos de correo y password
all.getInputValue();








