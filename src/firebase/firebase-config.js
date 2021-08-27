// Se agrega el auth => Nos ayuda a enviar los datos a Firebase
export const auth = firebase.auth();

// Nos sirve para guardar los datos de cada usuario
export const firestore = firebase.firestore();

// Método para cerrar sesión
export const signOut = () => firebase.auth().signOut();

// Método de para obtener el usuario actual autenticado
export const currentUser = () => firebase.auth().currentUser;

// Nos permite conectar con google
// export const providerG = new firebase.auth.GoogleAuthProvider();

// Nos permite conectar con facebook
// export const providerF = new firebase.auth.FacebookAuthProvider();
