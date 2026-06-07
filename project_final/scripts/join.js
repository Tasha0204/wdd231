document.addEventListener('DOMContentLoaded', () => {
    // Menú hamburguesa responsivo universal
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => navMenu.classList.toggle('show'));
    }

    // Fechas automáticas del Footer
    if (document.getElementById('currentyear')) document.getElementById('currentyear').textContent = new Date().getFullYear();
    if (document.getElementById('lastModified')) document.getElementById('lastModified').textContent = document.lastModified;

    // Graba la fecha/hora actual en el input hidden antes de enviar
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }
});