export default () => {
    const viewprofile = `
  <!----------------perfil---------------->
  <div class = 'profile-container'> 
    <div class="profile">
      <img class="profile-user-img" src=''>
      <p id='name-profile'></p>
    </div>
  </div>
  <!----------------muro---------------->
  <div class = 'timeline-container'>
    <div class= 'timeline'>
    <input class='input-timeline' type='text' placeholder='Crear publicación'><br>
    <div class= 'container-btn'>
    <img src='../images/picture.svg'>
    <input id="publish-btn" type=button value='Publicar'>
    </div>
    </div>
  </div>
  <!--------publicaciones---------->
  <div class = 'posts-container'>
    <div id="post"></div>
  </div>
  `;

    const divElement = document.createElement('div')
    divElement.innerHTML = viewprofile;
}

return divElement;