import * as todo from "./firebase-config.js";

todo.firebaseConfig;

// FUNCIÓN PARA REGISTRARSE
export const getInputValue = () => {
    const signUpBtn = document.querySelector('#signup-btn');// Llama a registrarse
    signUpBtn.addEventListener('click', (e) => { // Evento al pulsar 
        
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
            console.log(userCredentials.operationType);
        })

        .catch((error) => {
            console.log(error);
            // error en contraseña
            if(error.code === 'auth/weak-password') {
                alert('La contraseña debe tener al menos, 6 caracteres');
            }
            // error en inputs vacíos
            if(error.code === 'auth/invalid-email') {
                alert('Por favor, completa los campos');
            }
            // error de correo ya registrado
            if(error.code === 'auth/email-already-in-use') {
                alert('El correo ingresado ya está siendo utilizado, por favor, ingresa un correo válido');
            }
            
        });
    });

};

