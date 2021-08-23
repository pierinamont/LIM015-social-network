import * as todo from '../firebase/firebase-config.js';

export const viewHeader = () => {
  const headerSection = `
    <div class="menu-hamburger" id="toggle-button">
        <div class="menu-line"></div>
        <div class="menu-line"></div>
        <div class="menu-line"></div>
    </div>     
    <img class="logo-nav" src="../images/logo-horizontal(2).svg"></img>
    <ul class="ul-nav" id="navList">
        <li class="li-nav">
            <a href ='/#/mainPage' id="init">Inicio</a>
        </li>
        <li class="li-nav"><a id="profile">Mi perfil</a>
        </li>
        <li class="li-nav">
        <img src="../images/sign-out.svg"></img><a id="signOut">Cerrar Sesión</a>
        </li>
    </ul>
`;
  const headerNav = document.createElement('nav');
  headerNav.className = 'headerNav';
  headerNav.innerHTML = headerSection;
  return headerNav;
};

// --------------------------- menú hamburguesa --------------------------- //
document.addEventListener('click', (e) => {
  if (e.target.id === 'toggle-button') {
    const navList = document.getElementById('navList');
    navList.classList.toggle('active');
  }
});

// --------------------------- Cerrar sesión --------------------------- //
document.addEventListener('click', (e) => {
  if (e.target.id === 'signOut') {
    todo.signOut
      .then(() => {
        console.log('cerraste sesión');
        const hash = '#/login';
        window.location.hash = hash;
        localStorage.clear(); // PRUEBA
      })
      .catch((error) => {
        console.log(error);
        const hash = '#/mainPage';
        window.location.hash = hash;
      });
  }
});

// ingresando a la sesion de perfil//
document.addEventListener('click', (e) => {
  if (e.target.id === 'profile') {
    const hash = '#/profile';
    window.location.hash = hash;
  }
});
