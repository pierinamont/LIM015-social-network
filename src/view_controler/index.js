import { items } from "../lib/index.js"


const changesView = (routes) => {

    const home = document.getElementById("main-page");


    switch (routes){
        case '#Home':
            { return home.appendChild(changesView.home())}

    }
console.log(routes);
}

export { changesView }