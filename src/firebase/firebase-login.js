
// Función para obtener datos de correo y contraseña
export const getInputValue = () => {
 
    document.getElementById('input-btn').addEventListener('submit', (e) => {
  
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
  
      console.log(email, password);
    })
};