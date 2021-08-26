// import * as mocks from '../src/view/mocks.js';
import { loginIn } from '../src/view/login-view.js';

const firebaseMock = require('firebase-mock');

const mockauth = new firebaseMock.MockFirebase();
mockauth.autoFlush();

global.firebase = firebaseMock.MockFirebaseSdk(
  () => null,
  () => mockauth,
);

describe('Inicio de sesión user password', () => {
  it('deberí iniciar sesió con email password', () => loginIn('user@gmail.com', '123456')
    .then((result) => {
      expect(result.email).toBe('user@gmail.com');
    }));
});

// const MockFirebase = require('mockfirebase').MockFirebase;

// console.log(MockFirebase);
