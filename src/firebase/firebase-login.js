import * as todo from './firebase-config.js';

todo.firebaseConfig;

// FUNCIÓN PARA REGISTRARSE


export const userSignUp = (email, password) => {
    let result = false;
    //  Autentificación => Método de Firebase
    todo.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        if (userCredentials.operationType == 'signIn') {
            alert('hola');
            result = true;
        }
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        // error en contraseña
        if (errorCode === 'auth/weak-password') {
          alert('La contraseña debe tener al menos 6 caracteres');
        }
        // error en inputs vacíos
        if (errorCode === 'auth/invalid-email') {
          alert('Por favor, completa los campos');
        }
        // error de correo ya registrado
        if (errorCode === 'auth/email-already-in-use') {
          alert('El correo ingresado ya está siendo utilizado, por favor, ingresa un correo válido');
        }
      });
    return result;
};


// FUNCIÓN PARA INICIAR SESIÓN
export const userSignIn = (email, password) => {
    //  Autentificación => Método de Firebase
    todo.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        console.log('iniciaste sesión');
      })
      .catch((error) => {
        // console.log(error);
        const errorCode = error.code;

        // error por campos vacíos
        if (errorCode === 'auth/invalid-email') {
            alert('Por favor, complete los campos');
        }
        // error contraseña incorrecta
        if (errorCode === 'auth/wrong-password') {
          alert('Contraseña incorrecta, inténtelo de nuevo');
        }
        // error usuario no encontrado
        if (errorCode === 'auth/user-not-found') {
            alert('El correo que ingresó no está registrado, por favor, regístrece');
        }
      });
};
