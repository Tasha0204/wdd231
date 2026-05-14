export { getDateTimeInfo, showHideHamburger, windowScroll };

function getDateTimeInfo() {
    // Get the year
    const todaysDate = new Date();
    const dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeFormat = todaysDate.toLocaleTimeString();
    const formattedDate = todaysDate.toLocaleDateString('en-US', dateFormat);
    const formattedDateTime = formattedDate + " " + timeFormat;

    const year = document.querySelector('#currentyear');
    year.innerHTML = `<span class="highlight">${todaysDate.getFullYear()}</span>`;


    const lastModified = document.querySelector('#lastModified');
    lastModified.innerHTML = `<span class="highlight">${formattedDateTime}</span>`;

}

let scrollTimeout;

function windowScroll() {

    const menuLinks = document.querySelector('.menuLinks');

    window.addEventListener('scroll', () => {

        if (menuLinks) {
            console.log('activated scrolling');
            menuLinks.classList.add('scroll');
        }

        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {

            console.log('User stopped scrolling');

            if (menuLinks) {
                menuLinks.classList.remove('scroll');
            }

        }, 500); // Adjust time as needed


    });
}


function showHideHamburger() {
    // Hamburger menu click event

    const hamburgerBtn = document.querySelector('#menu');
    const navigationBtn = document.querySelector('.menuLinks');


    hamburgerBtn.addEventListener('click', () => {

        hamburgerBtn.classList.toggle('open');
        navigationBtn.classList.toggle('open');

    });

    if (!hamburgerBtn) {
        console.error('Hamburger button not found!');
        return;
    }

    if (!navigationBtn) {
        console.error('Navigation button not found!');
        return;
    }

    console.log('Hamburger button classes: ', hamburgerBtn.classList);
    console.log('Navigation button classes: ', navigationBtn.classList);

}


document.addEventListener('DOMContentLoaded', () => {

    // showHideHamburger();  This one needs to be commented out or else hamburger menu won't be exportable
    windowScroll();
    getDateTimeInfo();
});