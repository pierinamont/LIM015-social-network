import * as todo from './firebase-config.js';
todo.firebaseInit;
const auth = todo.auth;

// FUNCIÓN PARA REGISTRARSE
export const userSignUp = (email, password) => auth.createUserWithEmailAndPassword(email, password);

// FUNCIÓN PARA INICIAR SESIÓN
export const userSignIn = (email, password) => auth.signInWithEmailAndPassword(email, password);

// FUNCIÓN CON GOOGLE
export const googleLogIn = () => auth.signInWithPopup(todo.providerG);

// FUNCIÓN CON FACEBOOK
export const facebookLogin = () => auth.signInWithPopup(todo.providerF);

// FUCIÓN PARA DETECTAR CAMBIOS EN LA AUTENTIFICACIÓN
// export const authStateChange = (user) => auth.onAuthStateChanged(user);

