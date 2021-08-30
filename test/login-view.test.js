// import * as mocks from '../src/view/mocks.js';
import {} from '../src/firebase/prueba.js';
// import { loginIn } from '../src/view/login-view.js';
<<<<<<< HEAD:test/login-view.spec.js
// import { signup } from '../src/view/signup-view.js';
import { signup } from '../src/view/funciones/funciones-firebase.js';
=======
import { signup } from '../src/view/funciones/funciones-firebase';
>>>>>>> 1fa6a94467e6c7dba6f71765ffde45ee56d0cb40:test/login-view.test.js

// MockFirebase.override();
// const firebaseMock = require('firebase-mock');

// const mockauth = new firebasemock.MockAuthentication();
// const mockdatabase = new firebasemock.MockFirebase();
// const mockfirestore = new firebasemock.MockFirestore();
// const mockstorage = new firebasemock.MockStorage();
// const mockmessaging = new firebasemock.MockMessaging();

// const mocksdk = new firebasemock.MockFirebaseSdk(
//   // use null if your code does not use RTDB
//   (path) => (path ? mockdatabase.child(path) : mockdatabase),
//   // use null if your code does not use AUTHENTICATION
//   () => mockauth,
//   // use null if your code does not use FIRESTORE
//   () => mockfirestore,
//   // use null if your code does not use STORAGE
//   () => mockstorage,
//   // use null if your code does not use MESSAGING
//   () => null,
// );

// mocksdk.database().flush();
// global.firebase = firebaseMock.MockFirebaseSdk(
//   () => null,
//   // () => mockauth,
// );

// const mockauth = new firebaseMock.MockFirebase();
// mockauth.autoFlush();

describe('signup', () => {
  // beforeEach(() => {
  //   global.firebase = {
  //     auth: () => {},
  //   };
  // });
  it('debería registrarse', () => signup('pepita', 'pepita@gmail.com', '123456')
    .then((result) => {
      expect(result.email).toBe('pepita@gmail.com');
    }));
});

// describe('Inicio de sesión user password', () => {
//   it('deberí iniciar sesió con email password', () => loginIn('user@gmail.com', '123456')
//     .then((result) => {
//       expect(result.email).toBe('user@gmail.com');
//     }));
// });

// const MockFirebase = require('mockfirebase').MockFirebase;

// console.log(MockFirebase);
