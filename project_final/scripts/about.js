document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Responsive Hamburger Menu
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // 2. Automatic Footer Dates
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

    // 3. User Visit Tracking System with LocalStorage (Rubric Criterion 9)
    controlUserVisits();
});

function controlUserVisits() {
    const visitDisplay = document.getElementById('visit-message');
    if (!visitDisplay) return;

    const lastVisit = localStorage.getItem('lastAboutVisit');
    const now = Date.now();

    // Save the current visit
    localStorage.setItem('lastAboutVisit', now);

    if (!lastVisit) {
        visitDisplay.textContent = "Welcome to our story page! Thanks for visiting us for the first time.";
    } else {
        // Calculate the difference in days
        const differenceInTime = now - parseInt(lastVisit);
        const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

        if (differenceInDays < 1) {
            visitDisplay.textContent = "So good to see you back so soon! Enjoy exploring our history.";
        } else if (differenceInDays === 1) {
            visitDisplay.textContent = "Your last visit was yesterday. Thanks for staying connected!";
        } else {
            visitDisplay.textContent = `Your last visit was ${differenceInDays} days ago. Welcome back!`;
        }
    }
}