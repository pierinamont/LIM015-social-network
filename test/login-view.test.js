
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

/*import MockFirebase from 'mock-cloud-firestore';
import { publishPost, signup } from '../src/view/funciones/funciones-firebase.js';

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
const objData = {
  name: 'pepita',
  email: 'pepita@gmail.com',
  password: '123456',
};
global.firebase = new MockFirebase(fixtureData);

// ----------------------- Añadir post -----------------------//
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
  it('deberia ser una funcion', () => { expect(typeof publishPost).toBe('function'); });
  it('debería insertar un nuevo post', () => publishPost(objPublicacion)
    .then((resolver) => {
      expect(resolver).toBe('documeto registrado');
    }).catch((reject) => {
      console.log(reject);*/
    }));
});
// ----------------------- Añadir post -----------------------//
describe('signup', () => {
  it('deberia ser una funcion', () => { expect(typeof signup).toBe('function'); });
  it('deberia registrarse', () => signup(objData.name, objData.email, objData.pasword)
    .then((usuario) => { expect(usuario.email).tobe(objData.email); }));
});
