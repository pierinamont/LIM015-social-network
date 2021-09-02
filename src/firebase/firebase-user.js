// ------------------- Obtener y guardar datos del usuario ---------------------------- //
export const getUserInfo = () => {
  const currentUser = firebase.auth().currentUser;

  // Obtener la info del usuario
  const uid = currentUser.uid;
  const name = currentUser.displayName;
  const email = currentUser.email;
  const photo = currentUser.photoURL;

  // Guardar la info en localStorage
  localStorage.setItem('uid', uid);
  localStorage.setItem('name', name);
  localStorage.setItem('email', email);
  localStorage.setItem('photo', photo);

    console.log(photo, name, email); // eslint-disable-line
};
