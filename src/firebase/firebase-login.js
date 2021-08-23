// import * as todo from './firebase-config.js';
import { auth, providerG, providerF } from './firebase-config.js';

// FUNCIÓN PARA REGISTRARSE
export const userSignUp = (email, password) => auth.createUserWithEmailAndPassword(email, password);

// FUNCIÓN PARA INICIAR SESIÓN
export const userSignIn = (email, password) => auth.signInWithEmailAndPassword(email, password);

// FUNCIÓN CON GOOGLE
export const googleLogIn = () => auth.signInWithPopup(providerG);

// FUNCIÓN CON FACEBOOK
export const facebookLogin = () => auth.signInWithPopup(providerF);
