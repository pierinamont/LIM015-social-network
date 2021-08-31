import MockFirebase from 'mock-cloud-firestore';
import { publishPost, signup } from '../src/view/funciones/funciones-firebase.js';
import {} from '../src/firebase/prueba.js';

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

  it('debería insertar un nuevo post', () => publishPost(objPublicacion)
    .then((resolver) => {
      expect(resolver).toBe('documeto registrado');
    }).catch((reject) => {
      console.log(reject);
    }));
});

// ----------------------- Añadir post -----------------------//
describe('signup', () => {
  it('debería registrarse', () => signup('pepita', 'pepita@gmail.com', '123456')
    .then((result) => {
      expect(result.email).toBe('pepita@gmail.com');
    }));
});
