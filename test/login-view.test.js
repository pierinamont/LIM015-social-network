// import * as mocks from '../src/view/mocks.js';
// import {} from '../src/firebase/prueba.js';
// import { loginIn } from '../src/view/login-view.js';

// eslint-disable-next-line import/no-unresolved
import firebasemock from 'firebase-mock';
import { signup } from '../src/view/funciones/funciones-firebase';
// configurando firebase mock
// const firebasemock = require('firebase-mock'); // eslint-disable-line
// CONFIGURA FIREBASE MOCK
const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();

// simula los mét y prop de firebase auth
global.firebase = new firebasemock.MockFirebaseSdk(
  null,
  () => mockauth,
);

describe('signup', () => {
  it('Debería poder registrarse con correo y contraseña', () => signup('net@gmail.com', '12345678')
    .then((user) => {
      expect(user.email).toBe('net@gmail.com');
    }));
});
