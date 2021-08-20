import { changeView } from './view/change-view.js';

const init = () => {
//  console.log(localStorage.getItem('uid'));
  if (window.location.hash === '') changeView('#/login');
  else changeView(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
  });
};

window.addEventListener('load', init);
