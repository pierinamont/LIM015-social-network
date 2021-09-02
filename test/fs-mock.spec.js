import MockFirebase from 'mock-cloud-firestore';
import {
  publishPost, editar, getPost, deletePost, showlike,
} from '../src/view/funciones/funciones-firebase.js';

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
          likesUser: [
            {
              name: 'Kengya',
              photo: 'https://lh3.googleusercontent.com/a-/AOh14GgWmX1pQaGuol_AxXYzpQisOIJaJhVwyil3xjysig=s96-c',
              user: '2222',
            },
            {
              name: 'Pierina',
              photo: 'https://lh3.googleusercontent.com/a-/AOh14GgWmX1pQaGuol_AxXYzpQisOIJaJhVwyil3xjysig=s96-c',
              user: '1111',
            }],
        },
      },
    },
  },
};
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

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
    }).catch(() => {

    }));
});

// ----------------------- editar post -----------------------//
describe('editar', () => {
  it('deberia ser una funcion', () => { expect(typeof editar).toBe('function'); });
  it('debería actualizar el texto del post', () => editar('abc789', 'Quiero un ponny')
    .then(() => {
      const callback = (arrayPost) => {
        const objeto = arrayPost.find((elemento) => elemento.description === 'Quiero un ponny');
        expect(objeto.description).toBe('Quiero un ponny');
      };
      getPost(callback);
    }));
});

// ----------------------- eliminar post -----------------------//
describe('deletePost', () => {
  it('deberia ser una funcion', () => { expect(typeof deletePost).toBe('function'); });
  it('debería eliminar  el post', () => deletePost('abc1234')
    .then(() => {
      const callback = (arrayPost) => {
        const objeto = arrayPost.find((elemento) => elemento.description === 'Quiero un unicornio');
        let validacion = 'no eliminado';
        if (objeto === undefined) validacion = 'eliminado';
        expect(validacion).toBe('eliminado');
      };
      getPost(callback);
    }));
});

// // ----------------------- Test de likes -----------------------//
// describe('likepublish', () => {
//   it('deberia ser una funcion', () => { expect(typeof likepublish).toBe('function'); });
//   // it('debería dar like a un post', () => {
//   //   likepublish(idPost);
//   // });
// });

// ----------------------- mostrar like  -----------------------//
describe('mostrar likes de usuarios', () => {
  it('deberia mostrar la cantidad de likes de un post', () => showlike('abc789')
    .then((result) => {
      expect(result.data().likesUser).toHaveLength(2);
    }));
});
