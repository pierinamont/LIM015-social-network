import * as todo from './firebase-config.js';

todo.firebaseInit;
todo.providerG;
const auth = todo.auth;
todo.getAuth;
const user = todo.user;

// FUNCIÓN PARA REGISTRARSE
export const userSignUp = (email, password) => auth.createUserWithEmailAndPassword(email, password);

// FUNCIÓN PARA INICIAR SESIÓN
export const userSignIn = (email, password) => auth.signInWithEmailAndPassword(email, password);

// FUNCIÓN CON GOOGLE
export const googleLogIn = () => auth.signInWithPopup(todo.providerG);

// FUNCIÓN CON FACEBOOK
export const FacebookLogin = () => auth.signInWithPopup(todo.providerF);

// FUNCIÓN PARA ENVIAR MENSAJE DE VERIFICACIÓN
export const sendEmailV = (useremail) => user.updateEmail(useremail);

