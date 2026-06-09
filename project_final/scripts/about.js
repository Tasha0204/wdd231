document.addEventListener('DOMContentLoaded', () => {
    

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }


    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

   
    controlUserVisits();
});

function controlUserVisits() {
    const visitDisplay = document.getElementById('visit-message');
    if (!visitDisplay) return;

    const lastVisit = localStorage.getItem('lastAboutVisit');
    const now = Date.now();

  
    localStorage.setItem('lastAboutVisit', now);

    if (!lastVisit) {
        visitDisplay.textContent = "Welcome to our story page! Thanks for visiting us for the first time.";
    } else {

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