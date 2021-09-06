export const viewNotFound = () => {
  const notFoundSection = `
    <div class="notFound-container">
        <div class="notFound-content">
        <h3>Página no encontrada</h3>
        <img class="not-found-img" src="../images/notFound .svg">
        <p class="txt-404">El archivo especificado, no se encontró en este sitio web. Por favor, compruebe que la URL sea correcta</p>
        </div>
    </div>     
`;
  const notFoundDiv = document.createElement('div');
  notFoundDiv.className = 'notFound-div';
  notFoundDiv.innerHTML = notFoundSection;
  return notFoundDiv;
};
