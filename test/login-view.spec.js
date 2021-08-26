// import * as mocks from '../src/view/mocks.js';
import { loginIn } from '../src/view/login-view.js';

// MockFirebase.override();
const firebaseMock = require('firebase-mock');

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
global.firebase = firebaseMock.MockFirebaseSdk(
  () => null,
  // () => mockauth,
);

// const mockauth = new firebaseMock.MockFirebase();
// mockauth.autoFlush();

describe('Inicio de sesión user password', () => {
  it('deberí iniciar sesió con email password', () => loginIn('user@gmail.com', '123456')
    .then((result) => {
      expect(result.email).toBe('user@gmail.com');
    }));
});

// const MockFirebase = require('mockfirebase').MockFirebase;

// console.log(MockFirebase);
