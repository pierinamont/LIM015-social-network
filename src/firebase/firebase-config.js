// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDMttVOUCqIenDzQS8Gzdt-D4bjUqxyfIU',
  authDomain: 'pet-place-b2611.firebaseapp.com',
  projectId: 'pet-place-b2611',
  storageBucket: 'pet-place-b2611.appspot.com',
  messagingSenderId: '530373394488',
  appId: '1:530373394488:web:9244c18bf0bf31c10926cd',
};



export const firebaseInit = firebase.initializeApp(firebaseConfig);

// Se agrega el auth => Nos ayuda a enviar los datos a Firebase
export const auth = firebase.auth();

// Nos sirve para guardar los datos de cada usuario
export const firestore = firebase.firestore();

// Nos permite conectar con google 
export const providerG = new firebase.auth.GoogleAuthProvider();

//Nos permite conectar con facebook
export const providerF = new firebase.auth.FacebookAuthProvider();