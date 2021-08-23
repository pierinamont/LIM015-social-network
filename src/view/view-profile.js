/* import * as todo from '../firebase/firebase-config.js'; */

// const db = todo.firestore;

export const viewProfile = () => {
  const profile = `
<!-----------------perfil----------------->
<div class = 'container-profile'>
  <div class = 'profile-date'>
    <img class='profile-user-image' src=''>
      <p id='profile-user-name'></p>
        <p id='profile-user-email'></p>
     </div>
    </div>

<!-----------muro------------------>
<div class = 'container-muro'>
  <div class= 'muro'>
    <input class= 'input-muro' type= 'texto' placeholder='Crear Publicación><br>
      <div class= 'container-publish-img'>
        <img src= '../images/picture.svg'>
          <input id='publish-btn2' type= button value='Publicar'>
          </div>
        </div>
        </div>
`;
  const containerProfile = document.createElement('div');
  containerProfile.className = 'contentProfile';
  containerProfile.innerHTML = profile;
  return containerProfile;
};
