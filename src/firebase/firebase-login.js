import * as todo from "./firebase-config.js";
todo.firebaseConfig;

// FUNCIÓN PARA REGISTRARSE
export const getInputValue = () => {
    const signUpBtn = document.querySelector('#signup-btn');// Llama a registrarse
    signUpBtn.addEventListener('click', (e) => { // Evento al pulsar 'iniciar sesión'
        
        // Evita que la página vuelva a cargar
        e.preventDefault(); 
        
        // Llamando el valor de los inputs
        const email = document.querySelector('#signup-email').value;
        const password = document.querySelector('#signup-password').value;

        //  Autentificación => Método de Firebase
        todo.auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            console.log('sign up');

        })

        .catch((error) => {
            
            console.log(error);
            
        });
    });

};