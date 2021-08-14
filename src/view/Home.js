export default () => {
    const viewHome = `
    <h2> hola </h2>
    `;

    const divElem = document.createElement('div')
    divElem.innerHTML = viewHome;
    return divElem;
}

