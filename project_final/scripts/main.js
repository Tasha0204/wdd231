document.addEventListener('DOMContentLoaded', () => {
    // Footer
    const currentYearElement = document.getElementById('currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }

    // Menú hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // Solo cargamos el clima aquí
    fetchWeather();
});

// ==================== CLIMA ====================

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
        if (currentContainer) currentContainer.innerHTML = '<p>No se pudo cargar el clima.</p>';
    }
}

function displayCurrentWeather(data) {
    const currentContainer = document.getElementById('weather-current');
    if (!currentContainer) return;

    const current = data.list[0];
    const temp = Math.round(current.main.temp);
    const desc = current.weather[0].description;

    currentContainer.innerHTML = `
        <p><strong>Actual:</strong> ${temp}°C - ${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        <p>Humedad: ${current.main.humidity}%</p>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('weather-forecast');
    if (!forecastContainer) return;
    forecastContainer.innerHTML = '';

    const dailyData = [data.list[8], data.list[16], data.list[24]];

    dailyData.forEach(day => {
        if (!day) return;
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' });
        const temp = Math.round(day.main.temp);
        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');
        dayElement.innerHTML = `
            <p><strong>${dayName.charAt(0).toUpperCase() + dayName.slice(1)}</strong></p>
            <p>${temp}°C</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}