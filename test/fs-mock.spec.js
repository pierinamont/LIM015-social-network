import MockFirebase from 'mock-cloud-firestore';
import { publishPost, likepublish } from '../src/view/funciones/funciones-firebase.js';

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
  console.log('SEGUNDO VALOR FIREBASE');
  console.log(global.firebase);

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
      console.log(reject);
    }));
});

// ----------------------- Test de likes -----------------------//
describe('likepublish', () => {
  it('deberia ser una funcion', () => { expect(typeof likepublish).toBe('function'); });
  // it('debería dar like a un post', () => {
  //   likepublish(idPost);
  // });
});
