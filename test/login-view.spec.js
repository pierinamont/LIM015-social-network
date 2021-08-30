import MockFirebase from 'mock-cloud-firestore';
import { loginIn } from '../src/view/login-view.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc1234: {
          photo: 'https://lh3.googleusercontent.com/a-/AOh14GgWmX1pQaGuol_AxXYzpQisOIJaJhVwyil3xjysig=s96-c',
          name: 'Pierina Montalva ',
          description: 'Quiero un gato',
          day: '23/8/2021 18:48:20',
          user: '123456',
          likesUser: [],
        },
        abc456: {
          photo: 'https://lh3.googleusercontent.com/a-/AOh14GgWmX1pQaGuol_AxXYzpQisOIJaJhVwyil3xjysig=s96-c',
          name: 'Kengya ',
          description: 'Quiero un perro',
          day: '24/8/2021 18:48:20',
          user: '789456',
          likesUser: [],
        },
      },
    },
  },

};

global.firebase = new MockFirebase(fixtureData);

describe('addpost', () => {
  it('debería insertar un nuevo post', () => loginIn('user@gmail.com', '123456')
    .then((result) => {
      console.log(result);
      expect(result.email).toBe('user@gmail.com');
    }));
});

// import * as mocks from '../src/view/mocks.js';
// import {} from '../src/firebase/prueba.js';
// import { loginIn } from '../src/view/login-view.js';

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

// describe('loginEnn', () => {
//   // beforeEach(() => {
//   //   global.firebase = {
//   //     auth: () => {},
//   //   };
//   // });

//   it('debería iniciar sesión con email password', () => loginIn('user@gmail.com', '123456')
//     .then((result) => {
//       expect(result.email).toBe('user@gmail.com');
//     }));
// });

// // describe('Inicio de sesión user password', () => {
// //   it('deberí iniciar sesió con email password', () => loginIn('user@gmail.com', '123456')
// //     .then((result) => {
// //       expect(result.email).toBe('user@gmail.com');
// //     }));
// // });

// // const MockFirebase = require('mockfirebase').MockFirebase;

// // console.log(MockFirebase);
