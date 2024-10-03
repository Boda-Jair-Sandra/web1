document.addEventListener('DOMContentLoaded', () => {
  // Selecciona el offcanvas
  const offcanvasElement = document.getElementById('staticBackdrop');

  // Inicializa el offcanvas de Bootstrap
  const offcanvas = new bootstrap.Offcanvas(offcanvasElement);

  // Agregar evento al botón de abrir
  document.querySelector('.header__boton-abrir').addEventListener('click', () => {
    offcanvas.show();
  });

  // El cierre del offcanvas se maneja automáticamente con el botón de cerrar y el backdrop de Bootstrap
});