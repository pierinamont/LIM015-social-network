import * as todo from './firebase-config.js';

todo.firebaseInit;
todo.providerG;
const auth = todo.auth;
//const provider = todo.provider;

// FUNCIÓN PARA REGISTRARSE
export const userSignUp = (email, password) => auth.createUserWithEmailAndPassword(email, password);

// FUNCIÓN PARA INICIAR SESIÓN
export const userSignIn = (email, password) => auth.signInWithEmailAndPassword(email, password);

// FUNCIÓN CON GOOGLE
export const googleLogIn = () => auth.signInWithPopup(todo.providerG);

//Funcion con facebook
export const FacebookLogin = () => auth.signInWithPopup(todo.providerF);