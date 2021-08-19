import { components, metodosPublicos } from './components.js';

const changeView = (route) => {
  const loginSection = document.getElementById('login-section');
  const headerBarNav = document.getElementById('header-bar-nav');
  const mainPage = document.getElementById('main-page');

  loginSection.innerHTML = '';
  headerBarNav.innerHTML = '';
  mainPage.innerHTML = '';

  switch (route) {
    case '#/login':
    { return loginSection.appendChild(components.login()); }
    case '#/signup':
    { return loginSection.appendChild(components.signup()); }
    case '#/mainPage':
    { metodosPublicos.mGetPublish();
       return headerBarNav.appendChild(components.header()) && mainPage.appendChild(components.mainPage()); }
    default:
      break;
  }
  console.log(route);
};

export { changeView };
