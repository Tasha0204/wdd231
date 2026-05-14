import { getDateTimeInfo, showHideHamburger } from "./base.js";
// import { updateText } from "./windowsize.js";
import { fetchFeaturedMembers } from "./featured-members.js";


// // showHideHamburger
// const hamburgerBtn = document.querySelector('#menu');
// const navigationBtn = document.querySelector('.menuLinks');


// hamburgerBtn.addEventListener('click', () => {
//     hamburgerBtn.classList.toggle('open');
//     navigationBtn.classList.toggle('open');
// });

showHideHamburger();

// Show current temp and weather data for the city
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
// const lat = 0;
// const lon = 0;
const apiKey = `0778f1befc62393b4badae75707b09a5`;
const city = `Iloilo City`;

function getURL() {
    // API key: 0778f1befc62393b4badae75707b09a5
    // Iloilo City coordinates
    // const lat = 10.6918;
    // const lon = 122.5621;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // alert(`City: ${city} url: ${url}`);
    apiFetch(city, url);
    // return url;
}



async function apiFetch(city, url) {
    try {

        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('The network could not be reached', await response.text());
        }
        else {

            const data = await response.json();
            // console.table(data);
            // alert('hi there');
            displayResults(data, city);

        }


    }
    catch (error) {
        console.error('The error was: ', error);
    }
}


function displayResults(data, city) {
    const theCityName = document.querySelector('#city-name');

    theCityName.innerHTML = `${city}`;

    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = `${data.weather[0].description}`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', `${data.weather[0].description}`);
    captionDesc.textContent = `${desc}`;
    currentTemp.innerHTML = `${data.main.temp}&deg`;


    const tempInfo = document.createElement('span');

    tempInfo.textContent = `${data.main.temp}&deg`;


}

// Ensure DOM is loaded before activating the functions
document.addEventListener('DOMContentLoaded', () => {

    getDateTimeInfo();
    getURL();
    // updateText();
    fetchFeaturedMembers();

});