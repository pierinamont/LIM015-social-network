import * as todo from './firebase-config.js';

todo.firebaseConfig;
const auth = todo.auth;

// FUNCIÓN PARA REGISTRARSE
export const userSignUp = (email, password) => auth.createUserWithEmailAndPassword(email, password);

// FUNCIÓN PARA INICIAR SESIÓN
export const userSignIn = (email, password) => auth.signInWithEmailAndPassword(email, password);
