
import {changeView} from './view/change-view.js';

const init = () => {
    changeView(window.location.hash);
    window.addEventListener('hashchange', () => changeView(window.location.hash));
}

window.addEventListener('load', init);

    
