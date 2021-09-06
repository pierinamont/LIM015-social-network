import MockFirebase from 'mock-cloud-firestore';
import {
  publishPost, editar, getPost, deletePost, showlike, likepublish,
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
        console.log(arrayPost);
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
// ----------------------- mostrar like  -----------------------//
// Modal con los usuarios que dieron like
describe('mostrar likes de usuarios', () => {
  it('deberia ser una funcion', () => { expect(typeof showlike).toBe('function'); });
  it('deberia mostrar la cantidad de likes de un post', () => showlike('abc789')
    .then((result) => {
      expect(result.data().likesUser).toHaveLength(2);
    }));
});

// Pintar y despintar corazón
// eslint-disable-next-line max-len
// declaramos los valores de local storage, los mocks de localstorage name y uid estan con los valores de Pierina
const getItemValue = (key) => {
  let result = '';
  if (key === 'name') {
    result = 'Pierina';
  }
  if (key === 'uid') {
    result = '1111';
  }
  return result;
};
global.localStorage = {
  getItem: getItemValue,
};

describe('Dislike Post', () => {
  it('deberia ser una funcion', () => { expect(typeof likepublish).toBe('function'); });
  it('deberia hacer dislike al post abc456', () => likepublish('abc456')
    .then(() => {
      const callback = (arrayPost) => {
        const objPost = arrayPost.find((elemento) => elemento.description === 'Quiero un dragon');
        // photo: 'https://lh3.googleusercontent.com/a-/AOh14GgWmX1pQaGuol_AxXYzpQisOIJaJhVwyil3xjysig=s96-c',
        // name: 'Kengya',
        // description: 'Quiero un dragon',
        // day: '24/8/2021 18:48:20',
        // user: '2222',
        // likesUser: [
        //   {
        //     name: 'Kengya',
        //     photo: 'https://lh3.googleusercontent.com/a-/AOh14GgWmX1pQaGuol_AxXYzpQisOIJaJhVwyil3xjysig=s96-c',
        //     user: '2222',
        //   },
        // OJOOOOO likePublish elimina el "me gusta" de Pierina
        // ],
        const objetoLike = objPost.likesUser.find((elemento) => elemento.user === localStorage.getItem('uid'));
        let accion = 'like';
        if (objetoLike === undefined) accion = 'dislike';
        expect(accion).toBe('dislike');
      };
      getPost(callback);
    }));
});

// describe('Like Post', () => {
//   it('deberia hacer like al post abc1234', () => likepublish('abc1234')
//     .then(() => {
//       const callback = (arrayPost) => {
//         console.log('=====================================================');
// eslint-disable-next-line max-len
//         const objPost = arrayPost.find((elemento) => elemento.description === 'Quiero un unicornio');
//         console.log(objPost);

//         // photo: 'https://lh3.googleusercontent.com/a-/AOh14GgWmX1pQaGuol_AxXYzpQisOIJaJhVwyil3xjysig=s96-c',
//         // name: 'Pierina',
//         // description: 'Quiero un unicornio',
//         // day: '24/8/2021 18:48:20',
//         // user: '1111',
//         // likesUser: [
//         //   {
//         //     name: 'Pierina',
//         //     photo: 'https://lh3.googleusercontent.com/a-/AOh14GgWmX1pQaGuol_AxXYzpQisOIJaJhVwyil3xjysig=s96-c',
//         //     user: '1111',
//         //   },
//         // OJOOOOO likePublish agrega el "me gusta" de Pierina
//         // ],
// eslint-disable-next-line max-len
// const objetoLike = objPost.likesUser.find((elemento) => elemento.user === localStorage.getItem('uid'));
//         let accion = 'like';
//         if (objetoLike === undefined) accion = 'dislike';
//         expect(accion).toBe('like');
//       };
//       getPost(callback);
//     }));
// });
