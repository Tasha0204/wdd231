document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú desplegable hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            // Cambiar accesibilidad ARIA
            const isExpanded = navMenu.classList.contains('show');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // 2. Autocompletar año en el footer
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        const date = new Date();
        currentYearSpan.textContent = date.getFullYear();
    }

    // 3. Autocompletar fecha de última modificación
    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
});