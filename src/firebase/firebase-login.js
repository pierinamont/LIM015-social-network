// import { auth } from "firebase-admin"; 

// Función para obtener el valor del correo y contraseña
export const getInputValue = () => {
// Llamar el formulario del login
 const signUpForm = document.querySelector('#signup-form');
// Evento al pulsar 'iniciar sesión'
signUpForm.addEventListener('submit', (e) => {
// Evita que la página vuelva a cargare.preventDefault();
        console.log('enviando');
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        console.log(email, password);

//  Autentificación => Método de Firebase
// auth
// .createUserWithEmail(email, password)
// .then(userCredentials => {
// //.. min 24 del video
// })
});
};