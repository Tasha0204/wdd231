
document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.getElementById('currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

   
    fetchWeather();
    fetchSpotlights();
});


const apiKey = 'b64e907f6334d705f0ed6432b0f1cdf8'; 
const lat = '-12.0464';      
const lon = '-77.0428';      
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error('Error al obtener datos meteorológicos');
        const data = await response.json();
        
        displayCurrentWeather(data);
        displayForecast(data);
    } catch (error) {
        console.error(error);
        const currentContainer = document.getElementById('weather-current');
        if (currentContainer) {
            currentContainer.innerHTML = `<p>No se pudo cargar el clima.</p>`;
        }
    }
}

function displayCurrentWeather(data) {
    const container = document.getElementById('weather-current');
    if (!container) return;

    const current = data.list[0];
    const temp = Math.round(current.main.temp);
    const desc = current.weather[0].description;
    
    const icon = desc.includes('nube') ? '☁️' : '☀️';

    container.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <span style="font-size: 3rem;">${icon}</span>
            <div>
                <h2 style="font-size: 2rem; margin: 0;">${temp}°C</h2>
                <p style="margin: 0; color: #666;">${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
                <p style="margin: 0; font-size: 0.9rem;">Humedad: ${current.main.humidity}%</p>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    const container = document.getElementById('weather-forecast');
    if (!container) return;
    
    container.innerHTML = ''; 
    

    [data.list[8], data.list[16], data.list[24]].forEach(day => {
       
        const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(day.main.temp);
        
  
        const emoji = temp > 20 ? '☀️' : '☁️'; 
        
        container.innerHTML += `
            <div class="forecast-day">
                <p><strong>${date}</strong></p> <p class="forecast-icon">${emoji}</p>
                <p>${temp}°C</p>
            </div>`;
    });
}