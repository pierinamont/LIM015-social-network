import firebasemock from 'firebase-mock';
<<<<<<< HEAD
import { signup, signInGoogle, signInFacebook } from '../src/view/funciones/funciones-firebase.js';
=======
import {
  signup, signInGoogle, signInFacebook, signOut,
} from '../src/view/funciones/funciones-firebase.js';
>>>>>>> 61f5ac702e35b9b50d64c3e55416585cbc292408

const mockauth = new firebasemock.MockAuthentication();

mockauth.autoFlush();

global.firebase = new firebasemock.MockFirebaseSdk(
  null,
  () => mockauth,
);

// ----------------------- Registro -----------------------//
describe('signup', () => {
  it('deberia ser una funcion', () => { expect(typeof signup).toBe('function'); });
  it('Debería poder registrarse con correo y contraseña', () => signup('net@gmail.com', '12345678')
    .then((user) => {
      expect(user.email).toBe('net@gmail.com');
    }));
});

// ----------------------- Iniciar con google -----------------------//
describe('signInGoogle', () => {
  it('deberia ser una funcion', () => { expect(typeof signInGoogle).toBe('function'); });

  it('debería iniciar sesión con Google', () => {
    signInGoogle().then((google) => {
      expect(google.providerData[0].providerId).toBe('google.com');
    });
  });
});

// ----------------------- Inicio con Facebook -----------------------//
describe('signInFacebook', () => {
  it('deberia ser una funcion', () => { expect(typeof signInFacebook).toBe('function'); });

  it('debería iniciar sesión con Facebook', () => {
    signInFacebook().then((facebook) => {
      expect(facebook.providerData[0].providerId).toBe('facebook.com');
    });
  });
});

// ----------------------- cerrar sesion -----------------------//
describe('cerrar sesion', () => {
  it('deberia cerrar sesion', () => signOut()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});
