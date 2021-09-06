import { changeView } from './view/change-view.js';

const init = () => {
  if (window.location.hash === '') changeView('#/login');
  else changeView(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
  });
};

window.addEventListener('load', init);
