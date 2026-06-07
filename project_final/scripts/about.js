document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menú Hamburguesa Responsivo
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // 2. Fechas automáticas del Footer
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

    // 3. Sistema de Control de Visitas con LocalStorage (Criterio 9 de la rúbrica)
    controlUserVisits();
});

function controlUserVisits() {
    const visitDisplay = document.getElementById('visit-message');
    if (!visitDisplay) return;

    const lastVisit = localStorage.getItem('lastAboutVisit');
    const now = Date.now();

    // Guardar la visita actual
    localStorage.setItem('lastAboutVisit', now);

    if (!lastVisit) {
        visitDisplay.textContent = "¡Bienvenido a nuestra página de historia! Gracias por visitarnos por primera vez.";
    } else {
        // Calcular la diferencia en días
        const differenceInTime = now - parseInt(lastVisit);
        const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

        if (differenceInDays < 1) {
            visitDisplay.textContent = "¡Qué bueno verte de regreso tan pronto! Disfruta explorando nuestra historia.";
        } else if (differenceInDays === 1) {
            visitDisplay.textContent = "Tu última visita fue ayer. ¡Gracias por mantenerte conectado!";
        } else {
            visitDisplay.textContent = `Tu última visita fue hace ${differenceInDays} días. ¡Bienvenido de vuelta!`;
        }
    }
}