//import * as all from './firebase-config.js';

 

// Función para obtener el valor de lo
export const getInputValue = () => {

    // Llama a registrarse
    const signUpBtn = document.querySelector('#signup-btn');
    

    // Evento al pulsar 'iniciar sesión'
    signUpBtn.addEventListener('click', (e) => {
        
        // Evita que la página vuelva a cargar
        // e.preventDefault(); 
        
        // Llamando el valor de los inputs
        // const name = document.querySelector('#signup-name').value;
        const email = document.querySelector('#signup-email').value;
        const password = document.querySelector('#signup-password').value;
    
        // console.log(name, email, password);

        //  Autentificación => Método de Firebase

        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            console.log('sign up');
        })
    });

};