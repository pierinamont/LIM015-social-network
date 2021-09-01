import firebasemock from 'firebase-mock';
// import { signup } from '../src/view/funciones/funciones-firebase.js';

const mockauth = new firebasemock.MockAuthentication();

mockauth.autoFlush();

global.firebase = new firebasemock.MockFirebaseSdk(
  null,
  () => mockauth,
);

// describe('signup', () => {
//   it('deberia ser una funcion', () => { expect(typeof signup).toBe('function'); });
// it('Debería poder registrarse con correo y contraseña', () => signup('net@gmail.com', '12345678')
//     .then((user) => {
//       expect(user.email).toBe('net@gmail.com');
//     }));
// });
