<<<<<<< HEAD:test/login-view.spec.js
import MockFirebase from 'mock-cloud-firestore';
import { publishPost } from '../src/view/funciones/funciones-firebase.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc1234: {
          photo: 'https://lh3.googleusercontent.com/a-/AOh14GgWmX1pQaGuol_AxXYzpQisOIJaJhVwyil3xjysig=s96-c',
          name: 'Pierina',
          description: 'Quiero un unicornio',
          day: '23/8/2021 18:48:20',
          user: '1111',
          likesUser: [],
        },
        abc456: {
          photo: 'https://lh3.googleusercontent.com/a-/AOh14GgWmX1pQaGuol_AxXYzpQisOIJaJhVwyil3xjysig=s96-c',
          name: 'Kengya',
          description: 'Quiero un dragon',
          day: '24/8/2021 18:48:20',
          user: '2222',
          likesUser: [],
        },
        abc789: {
          photo: 'https://lh3.googleusercontent.com/a-/AOh14GgzE8r5CtsNZ7-Spe4JCRuU7FR_aEYaBQbH2jlhaWA=s96-c',
          name: 'Yesireth',
          description: 'Quiero un dinosaurio',
          day: '24/8/2021 18:48:20',
          user: '3333',
          likesUser: [],
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData);

describe('addpost', () => {
  const date = new Date(Date.now());
  const objPublicacion = {
    photo: 'https://lh3.googleusercontent.com/a-/AOh14GgzE8r5CtsNZ7-Spe4JCRuU7FR_aEYaBQbH2jlhaWA=s96-c',
    name: 'Yesireth-test',
    description: 'descripcion test',
    day: date.toLocaleString(),
    user: '3333',
    likesUser: [],
  };

  it('debería insertar un nuevo post', () => publishPost(objPublicacion)
    .then((resolver) => {
      expect(resolver).toBe('documeto registrado');
    }).catch((reject) => {
      console.log(reject);
=======
// import * as mocks from '../src/view/mocks.js';
import {} from '../src/firebase/prueba.js';
// import { loginIn } from '../src/view/login-view.js';
import { signup } from '../src/view/funciones/funciones-firebase';

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
      expect(result.email.password).toBe('user@gmail.com');
>>>>>>> 1fa6a94467e6c7dba6f71765ffde45ee56d0cb40:test/login-view.test.js
    }));
});
